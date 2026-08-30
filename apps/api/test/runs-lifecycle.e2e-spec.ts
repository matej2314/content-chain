import { execFileSync } from 'child_process';
import type { IncomingMessage } from 'http';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { GATE_SECTIONS } from '../src/company-context/domain/company-context.constants';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { ENV, type Env } from '../src/shared/config/env';
import { validateEnv } from '../src/shared/config/env.schema';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  RUN_EXECUTOR,
  type RunExecutorPort,
} from '../src/runs/domain/run-executor.port';
import type { RunRecord } from '../src/runs/domain/run.types';
import { FakeLlmGateway } from './fake-llm-gateway';

const completeContextBody = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

const startRunBody = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  language: 'pl',
  brief: { topic: 'Q3' },
};

function deployTestDb(): void {
  execFileSync(
    process.execPath,
    [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
    {
      cwd: join(__dirname, '..'),
      env: {
        ...process.env,
        DATABASE_URL: 'file:./test.db',
        CHECKPOINT_DISABLE: '1',
        PRISMA_HIDE_UPDATE_MESSAGE: '1',
      },
      stdio: 'pipe',
    },
  );
}

async function wipeRuns(prisma: PrismaClient): Promise<void> {
  await prisma.socialContent.deleteMany();
  await prisma.socialIdea.deleteMany();
  await prisma.runLog.deleteMany();
  await prisma.run.deleteMany();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(
  predicate: () => boolean,
  label: string,
  timeoutMs = 5_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await sleep(25);
  }
  throw new Error(`timed out waiting for ${label}`);
}

type RunSnapshotBody = {
  status: string;
  result?: { ideas?: Array<{ id: string; title: string }> };
};

async function waitForRunStatus(
  app: INestApplication,
  runId: string,
  expected: string,
  timeoutMs = 5_000,
): Promise<RunSnapshotBody> {
  const deadline = Date.now() + timeoutMs;
  let lastStatus: string | undefined;
  while (Date.now() < deadline) {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/runs/${runId}`)
      .expect(200);
    const body = response.body as RunSnapshotBody;
    lastStatus = body.status;
    if (lastStatus === expected) {
      return body;
    }
    await sleep(25);
  }
  throw new Error(
    `timed out waiting for run ${runId} to become ${expected} (last: ${lastStatus})`,
  );
}

async function putCompleteContext(app: INestApplication): Promise<void> {
  await request(app.getHttpServer())
    .put('/api/v1/company-context')
    .send(completeContextBody)
    .expect(200);
}

async function postRun(app: INestApplication) {
  return request(app.getHttpServer())
    .post('/api/v1/runs')
    .send(startRunBody)
    .expect(202);
}

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

/**
 * Test-only fake for D-9 (queue). Parks `execute` on a deferred Promise so the
 * worker keeps the claimed slot (`running`) until `release()`. Production binds
 * SocialRunExecutor in AppModule glue — this must not be registered in RunsModule.
 */
class HoldingRunExecutor implements RunExecutorPort {
  private readonly hold = deferred();
  readonly startedIds: string[] = [];

  async execute(run: RunRecord): Promise<void> {
    this.startedIds.push(String(run.id));
    await this.hold.promise;
  }

  release(): void {
    this.hold.resolve();
  }
}

async function collectSseUntilStatusEvent(
  app: INestApplication,
  runId: string,
  timeoutMs = 4_000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    let settled = false;

    const finish = (error?: Error): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      incoming?.destroy();
      if (error) reject(error);
      else resolve(buffer);
    };

    const timer = setTimeout(() => {
      finish(
        new Error(
          `SSE timed out waiting for event: run.status. received: ${buffer}`,
        ),
      );
    }, timeoutMs);

    let incoming: IncomingMessage | undefined;

    request(app.getHttpServer())
      .get(`/api/v1/runs/${runId}/events`)
      .set('Accept', 'text/event-stream')
      .buffer(false)
      .parse((res, callback) => {
        incoming = res as unknown as IncomingMessage;
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          buffer += chunk;
          if (buffer.includes('event: run.status')) {
            callback(null, buffer);
            finish();
          }
        });
        res.on('end', () => callback(null, buffer));
        res.on('error', (err: Error) => {
          if (buffer.includes('event: run.status')) {
            callback(null, buffer);
            finish();
            return;
          }
          callback(err, buffer);
        });
      })
      .end((err) => {
        if (settled) return;
        if (buffer.includes('event: run.status')) {
          finish();
          return;
        }
        finish(err ?? new Error(`SSE ended without run.status: ${buffer}`));
      });
  });
}

async function collectSseUntilServerCloses(
  app: INestApplication,
  runId: string,
  timeoutMs = 4_000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    let settled = false;

    const finish = (error?: Error): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      incoming?.destroy();
      if (error) reject(error);
      else resolve(buffer);
    };

    const timer = setTimeout(() => {
      finish(
        new Error(
          `SSE timed out waiting for stream end. received: ${buffer}`,
        ),
      );
    }, timeoutMs);

    let incoming: IncomingMessage | undefined;

    request(app.getHttpServer())
      .get(`/api/v1/runs/${runId}/events`)
      .set('Accept', 'text/event-stream')
      .buffer(false)
      .parse((res, callback) => {
        incoming = res as unknown as IncomingMessage;
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          buffer += chunk;
        });
        res.on('end', () => {
          callback(null, buffer);
          finish();
        });
        res.on('error', (err: Error) => {
          callback(err, buffer);
          finish(err);
        });
      })
      .end((err) => {
        if (settled) return;
        if (err) {
          finish(err);
          return;
        }
        finish();
      });
  });
}

describe('Runs lifecycle (e2e)', () => {
  describe('pipeline (fake LLM)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let fakeLlm: FakeLlmGateway;

    beforeAll(async () => {
      deployTestDb();
      fakeLlm = new FakeLlmGateway();

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(LLM_GATEWAY_PORT)
        .useValue(fakeLlm)
        .compile();
      app = moduleRef.createNestApplication();
      configureHttpApp(app);
      await app.init();
      prisma = app.get(PrismaService);
      await wipeRuns(prisma);
    }, 30_000);

    beforeEach(async () => {
      fakeLlm.reset();
      const deadline = Date.now() + 15_000;
      while (Date.now() < deadline) {
        const active = await prisma.run.count({
          where: { status: { in: ['queued', 'running'] } },
        });
        if (active === 0) break;
        await sleep(25);
      }
      await wipeRuns(prisma);
    });

    afterAll(async () => {
      if (prisma) {
        await wipeRuns(prisma);
      }
      await app?.close();
    }, 15_000);

    it('POST /api/v1/runs without complete context returns 409 CONTEXT_INCOMPLETE and does not persist a run', async () => {
      await prisma.companyContext.deleteMany();
      await wipeRuns(prisma);

      const response = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(409);

      expect(response.body.code).toBe('CONTEXT_INCOMPLETE');
      expect(response.body.details).toEqual(
        expect.arrayContaining(GATE_SECTIONS.map((section) => ({ section }))),
      );
      expect(response.body.details).toHaveLength(GATE_SECTIONS.length);
      expect(await prisma.run.count()).toBe(0);
    });

    it('PUT complete context then POST /api/v1/runs returns 202 before the pipeline finishes', async () => {
      await putCompleteContext(app);

      const startedAt = Date.now();
      const response = await postRun(app);
      const elapsedMs = Date.now() - startedAt;

      expect(response.body.runId).toMatch(/^run_/);
      expect(response.body.conversationId).toMatch(/^conv_/);
      expect(['queued', 'running']).toContain(response.body.status);
      expect(elapsedMs).toBeLessThan(2_000);

      const row = await prisma.run.findUnique({
        where: { id: response.body.runId },
      });
      expect(row).not.toBeNull();
    });

    it('GET snapshot reaches completed with ideas and hop logs without GATEWAY_KEY', async () => {
      await putCompleteContext(app);
      const created = await postRun(app);
      const runId = created.body.runId as string;

      const snapshot = await waitForRunStatus(app, runId, 'completed', 15_000);
      expect(snapshot.status).toBe('completed');
      expect(snapshot.result?.ideas).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 'idea_1', title: 'T1' }),
        ]),
      );

      const logs = await request(app.getHttpServer())
        .get(`/api/v1/runs/${runId}/logs`)
        .expect(200);

      const serialized = JSON.stringify(logs.body);
      expect(logs.body.items.length).toBeGreaterThan(0);
      expect(
        logs.body.items.some(
          (entry: { step?: string; message?: string }) =>
            entry.step === 'IdeationAgent' ||
            String(entry.message).includes('LLM hop IdeationAgent'),
        ),
      ).toBe(true);
      expect(serialized).not.toMatch(/X-Gateway-Key/i);
      expect(serialized).not.toMatch(/GATEWAY_KEY/i);
      expect(serialized).not.toContain(process.env.GATEWAY_KEY);
    });

    it('GET /api/v1/runs/:runId/events emits run.status over SSE', async () => {
      await putCompleteContext(app);
      const created = await postRun(app);
      const runId = created.body.runId as string;

      const payload = await collectSseUntilStatusEvent(app, runId);

      expect(payload).toContain('event: run.status');
      expect(payload).toContain(runId);
    });

    it('GET /api/v1/runs/:runId/events on a completed run emits run.status and ends (D-14)', async () => {
      await putCompleteContext(app);
      const created = await postRun(app);
      const runId = created.body.runId as string;
      await waitForRunStatus(app, runId, 'completed', 15_000);

      const payload = await collectSseUntilServerCloses(app, runId);

      expect(payload).toContain('event: run.status');
      expect(payload).toContain(runId);
      expect(payload).toContain('completed');
    });

    it('POST HITL on a completed run returns 409 HITL_REQUIRED', async () => {
      await putCompleteContext(app);
      const created = await postRun(app);
      const runId = created.body.runId as string;
      await waitForRunStatus(app, runId, 'completed', 15_000);

      const response = await request(app.getHttpServer())
        .post(`/api/v1/runs/${runId}/hitl`)
        .send({ selectedIdeaIds: ['idea-1'] })
        .expect(409);

      expect(response.body.code).toBe('HITL_REQUIRED');
    });
  });

  describe('queue (D-9) with holding fake executor', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    let holding: HoldingRunExecutor;
    let previousMax: string | undefined;

    beforeAll(async () => {
      deployTestDb();

      const standalone = new PrismaClient();
      try {
        await standalone.$connect();
        await wipeRuns(standalone);
      } finally {
        await standalone.$disconnect();
      }

      previousMax = process.env.MAX_CONCURRENT_RUNS;
      process.env.MAX_CONCURRENT_RUNS = '1';
      const env: Env = validateEnv(process.env as Record<string, unknown>);
      holding = new HoldingRunExecutor();

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(ENV)
        .useValue(env)
        .overrideProvider(RUN_EXECUTOR)
        .useValue(holding)
        .compile();

      app = moduleRef.createNestApplication();
      configureHttpApp(app);
      await app.init();
      prisma = app.get(PrismaService);
    }, 30_000);

    afterAll(async () => {
      try {
        holding?.release();
        if (prisma) {
          await wipeRuns(prisma);
        }
        await app?.close();
      } finally {
        process.env.MAX_CONCURRENT_RUNS = previousMax;
      }
    }, 15_000);

    it('keeps the second run queued while MAX_CONCURRENT_RUNS=1 is occupied, then starts it after release', async () => {
      await putCompleteContext(app);

      const first = await postRun(app);
      const firstId = first.body.runId as string;
      await waitForRunStatus(app, firstId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(firstId),
        'first execute parked on the fake',
      );

      const second = await postRun(app);
      const secondId = second.body.runId as string;
      expect(['queued', 'running']).toContain(second.body.status);

      await sleep(150);
      const secondWhileHeld = await request(app.getHttpServer())
        .get(`/api/v1/runs/${secondId}`)
        .expect(200);
      const firstWhileHeld = await request(app.getHttpServer())
        .get(`/api/v1/runs/${firstId}`)
        .expect(200);

      expect(firstWhileHeld.body.status).toBe('running');
      expect(secondWhileHeld.body.status).toBe('queued');
      expect(holding.startedIds).toEqual([firstId]);
      expect(await prisma.run.count({ where: { status: 'queued' } })).toBe(1);

      holding.release();

      await waitForRunStatus(app, secondId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(secondId),
        'second execute after the slot frees',
      );
    });
  });
});
