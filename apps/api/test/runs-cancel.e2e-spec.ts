import { execFileSync } from 'child_process';
import type { IncomingMessage } from 'http';
import { join } from 'path';
import { randomUUID } from 'node:crypto';
import { hash as bcryptHash } from 'bcrypt';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { ENV, type Env } from '../src/shared/config/env';
import { validateEnv } from '../src/shared/config/env.schema';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import { RecoverInterruptedRunsUseCase } from '../src/runs/application/recover-interrupted-runs.use-case';
import {
  RUN_EXECUTOR,
  type RunExecuteOptions,
  type RunExecutorPort,
} from '../src/runs/domain/run-executor.port';
import type { RunRecord } from '../src/runs/domain/run.types';
import {
  createAuthenticatedAgent,
  type E2eAgent,
} from './authenticated-agent';
import { FakeLlmGateway } from './fake-llm-gateway';

const OTHER_USER_EMAIL = 'e2e-cancel-other@content-chain.test';
const OTHER_USER_PASSWORD = 'E2eOtherPass12!';

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
  brief: { topic: 'Q3-cancel' },
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
  await prisma.contentDocument.deleteMany();
  await prisma.contentOutline.deleteMany();
  await prisma.socialReelScript.deleteMany();
  await prisma.socialReelIdea.deleteMany();
  await prisma.socialContent.deleteMany();
  await prisma.socialIdea.deleteMany();
  await prisma.feedback.deleteMany();
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
  cancelledAt?: string | null;
  result?: unknown;
};

async function waitForRunStatus(
  agent: E2eAgent,
  runId: string,
  expected: string,
  timeoutMs = 5_000,
): Promise<RunSnapshotBody> {
  const deadline = Date.now() + timeoutMs;
  let lastStatus: string | undefined;
  while (Date.now() < deadline) {
    const response = await agent.get(`/api/v1/runs/${runId}`).expect(200);
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

async function putCompleteContext(agent: E2eAgent): Promise<void> {
  await agent
    .put('/api/v1/company-context')
    .send(completeContextBody)
    .expect(200);
}

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

function abortReject(signal?: AbortSignal): Promise<never> {
  if (!signal) {
    return new Promise(() => undefined);
  }
  if (signal.aborted) {
    return Promise.reject(
      new DOMException('The operation was aborted', 'AbortError'),
    );
  }
  return new Promise((_, reject) => {
    signal.addEventListener(
      'abort',
      () => {
        reject(new DOMException('The operation was aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

/**
 * Parks execute until release() or AbortSignal — D-30 live cancel while running.
 */
class HoldingRunExecutor implements RunExecutorPort {
  private readonly hold = deferred();
  readonly startedIds: string[] = [];

  async execute(
    run: RunRecord,
    options?: RunExecuteOptions,
  ): Promise<void> {
    this.startedIds.push(String(run.id));
    await Promise.race([this.hold.promise, abortReject(options?.signal)]);
  }

  release(): void {
    this.hold.resolve();
  }
}

async function collectSseUntilServerCloses(
  agent: E2eAgent,
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

    agent
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

function eventOrder(payload: string, eventName: string): number {
  const marker = `event: ${eventName}`;
  const index = payload.indexOf(marker);
  if (index < 0) {
    throw new Error(`missing SSE event ${eventName} in: ${payload}`);
  }
  return index;
}

describe('Runs cancel (e2e)', () => {
  describe('HTTP cancel + SSE (holding executor)', () => {
    let app: INestApplication;
    let agent: E2eAgent;
    let otherAgent: E2eAgent;
    let prisma: PrismaService;
    let holding: HoldingRunExecutor;
    let sessionUserId: string;
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
      const env: Env = validateEnv(process.env);
      holding = new HoldingRunExecutor();

      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(ENV)
        .useValue(env)
        .overrideProvider(RUN_EXECUTOR)
        .useValue(holding)
        .overrideProvider(LLM_GATEWAY_PORT)
        .useValue(new FakeLlmGateway())
        .compile();

      app = moduleRef.createNestApplication();
      configureHttpApp(app);
      await app.init();
      prisma = app.get(PrismaService);
      agent = await createAuthenticatedAgent(app);

      const me = await agent.get('/api/v1/auth/me').expect(200);
      sessionUserId = (me.body as { id: string }).id;

      const existingOther = await prisma.user.findUnique({
        where: { email: OTHER_USER_EMAIL },
      });
      if (existingOther) {
        await prisma.refreshSession.deleteMany({
          where: { userId: existingOther.id },
        });
        await prisma.run.updateMany({
          where: { startedByUserId: existingOther.id },
          data: { startedByUserId: null },
        });
        await prisma.user.delete({ where: { id: existingOther.id } });
      }
      await prisma.user.create({
        data: {
          id: `usr_${randomUUID()}`,
          email: OTHER_USER_EMAIL,
          passwordHash: await bcryptHash(OTHER_USER_PASSWORD, 4),
          role: 'user',
        },
      });
      otherAgent = request.agent(app.getHttpServer());
      await otherAgent
        .post('/api/v1/auth/login')
        .send({ email: OTHER_USER_EMAIL, password: OTHER_USER_PASSWORD })
        .expect(200);

      await putCompleteContext(agent);
    }, 30_000);

    beforeEach(async () => {
      await wipeRuns(prisma);
    });

    afterAll(async () => {
      try {
        holding?.release();
        if (prisma) {
          await wipeRuns(prisma);
          const other = await prisma.user.findUnique({
            where: { email: OTHER_USER_EMAIL },
          });
          if (other) {
            await prisma.refreshSession.deleteMany({
              where: { userId: other.id },
            });
            await prisma.user.delete({ where: { id: other.id } });
          }
        }
        await app?.close();
      } finally {
        process.env.MAX_CONCURRENT_RUNS = previousMax;
      }
    }, 15_000);

    it('D-30: POST cancel on running → 200 cancelled + log + SSE status→cancelled→end', async () => {
      const created = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const runId = created.body.runId as string;

      await waitForRunStatus(agent, runId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(runId),
        'execute parked on holding fake',
      );

      const ssePromise = collectSseUntilServerCloses(agent, runId, 8_000);
      await sleep(50);

      const cancelled = await agent
        .post(`/api/v1/runs/${runId}/cancel`)
        .expect(200);

      expect(cancelled.body.status).toBe('cancelled');
      expect(typeof cancelled.body.cancelledAt).toBe('string');
      expect(Date.parse(cancelled.body.cancelledAt as string)).not.toBeNaN();

      const logs = await agent.get(`/api/v1/runs/${runId}/logs`).expect(200);
      expect(
        (logs.body.items as Array<{ message?: string; level?: string }>).some(
          (entry) =>
            entry.level === 'info' &&
            entry.message === 'Run cancelled by user',
        ),
      ).toBe(true);

      const payload = await ssePromise;
      expect(payload).toContain('event: run.status');
      expect(payload).toContain('"status":"cancelled"');
      expect(payload).toContain('event: run.cancelled');
      expect(eventOrder(payload, 'run.status')).toBeLessThan(
        eventOrder(payload, 'run.cancelled'),
      );
    });

    it('D-31: second POST cancel on already cancelled → 200', async () => {
      const created = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const runId = created.body.runId as string;
      await waitForRunStatus(agent, runId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(runId),
        'execute parked',
      );

      await agent.post(`/api/v1/runs/${runId}/cancel`).expect(200);
      const again = await agent
        .post(`/api/v1/runs/${runId}/cancel`)
        .expect(200);

      expect(again.body.status).toBe('cancelled');
      expect(typeof again.body.cancelledAt).toBe('string');
    });

    it('D-32: cancel completed → 409 RUN_NOT_CANCELABLE; other user → 403', async () => {
      const completedId = `run_${randomUUID()}`;
      await prisma.run.create({
        data: {
          id: completedId,
          conversationId: `conv_${randomUUID()}`,
          taskType: 'post_ideas',
          platform: 'linkedin',
          language: 'pl',
          status: 'completed',
          brief: { topic: 'd32-completed' },
          startedByUserId: sessionUserId,
        },
      });

      const finished = await agent
        .post(`/api/v1/runs/${completedId}/cancel`)
        .expect(409);
      expect(finished.body.code).toBe('RUN_NOT_CANCELABLE');

      const created = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const runId = created.body.runId as string;
      await waitForRunStatus(agent, runId, 'running');

      const forbidden = await otherAgent
        .post(`/api/v1/runs/${runId}/cancel`)
        .expect(403);
      expect(forbidden.body.code).toBe('FORBIDDEN');

      await agent.post(`/api/v1/runs/${runId}/cancel`).expect(200);
    });

    it('D-14 late-join: GET events on cancelled emits run.status and ends', async () => {
      const created = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const runId = created.body.runId as string;
      await waitForRunStatus(agent, runId, 'running');
      await agent.post(`/api/v1/runs/${runId}/cancel`).expect(200);

      const payload = await collectSseUntilServerCloses(agent, runId);
      expect(payload).toContain('event: run.status');
      expect(payload).toContain(runId);
      expect(payload).toContain('cancelled');
      expect(payload).not.toContain('event: run.cancelled');
    });

    it('D-12: PATCH rating on cancelled → 409 RUN_NOT_REVIEWABLE', async () => {
      const created = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const runId = created.body.runId as string;
      await waitForRunStatus(agent, runId, 'running');
      await agent.post(`/api/v1/runs/${runId}/cancel`).expect(200);

      const rated = await agent
        .patch(`/api/v1/runs/${runId}/rating`)
        .send({ rating: 4 })
        .expect(409);
      expect(rated.body.code).toBe('RUN_NOT_REVIEWABLE');
    });

    it('D-34: POST hitl after cancel from awaiting_hitl → 409 HITL_REQUIRED', async () => {
      const runId = `run_${randomUUID()}`;
      await prisma.run.create({
        data: {
          id: runId,
          conversationId: `conv_${randomUUID()}`,
          taskType: 'post_ideas_then_content',
          platform: 'linkedin',
          language: 'pl',
          status: 'awaiting_hitl',
          brief: { topic: 'd34-hitl' },
          startedByUserId: sessionUserId,
        },
      });

      await agent.post(`/api/v1/runs/${runId}/cancel`).expect(200);

      const hitl = await agent
        .post(`/api/v1/runs/${runId}/hitl`)
        .send({ selectedIdeaIds: ['idea_1'] })
        .expect(409);
      expect(hitl.body.code).toBe('HITL_REQUIRED');

      const snapshot = await agent.get(`/api/v1/runs/${runId}`).expect(200);
      expect(snapshot.body.status).toBe('cancelled');
    });

    it('D-33: leftover running|interrupted with cancelRequested → cancelled without recoveryAttempts++', async () => {
      const runningId = `run_${randomUUID()}`;
      const interruptedId = `run_${randomUUID()}`;
      await prisma.run.create({
        data: {
          id: runningId,
          conversationId: `conv_${randomUUID()}`,
          taskType: 'post_ideas',
          platform: 'linkedin',
          language: 'pl',
          status: 'running',
          brief: { topic: 'd33-running' },
          cancelRequested: true,
          recoveryAttempts: 2,
        },
      });
      await prisma.run.create({
        data: {
          id: interruptedId,
          conversationId: `conv_${randomUUID()}`,
          taskType: 'post_ideas',
          platform: 'linkedin',
          language: 'pl',
          status: 'interrupted',
          brief: { topic: 'd33-interrupted' },
          cancelRequested: true,
          recoveryAttempts: 1,
        },
      });

      const recover = app.get(RecoverInterruptedRunsUseCase);
      await recover.execute();

      const running = await prisma.run.findUniqueOrThrow({
        where: { id: runningId },
      });
      const interrupted = await prisma.run.findUniqueOrThrow({
        where: { id: interruptedId },
      });

      expect(running.status).toBe('cancelled');
      expect(running.cancelRequested).toBe(false);
      expect(running.cancelledAt).not.toBeNull();
      expect(running.recoveryAttempts).toBe(2);

      expect(interrupted.status).toBe('cancelled');
      expect(interrupted.cancelRequested).toBe(false);
      expect(interrupted.cancelledAt).not.toBeNull();
      expect(interrupted.recoveryAttempts).toBe(1);
    });
  });
});
