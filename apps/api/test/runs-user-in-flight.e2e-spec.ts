import { execFileSync } from 'child_process';
import { join } from 'path';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { ENV, type Env } from '../src/shared/config/env';
import { validateEnv } from '../src/shared/config/env.schema';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  RUN_EXECUTOR,
  type RunExecuteOptions,
  type RunExecutorPort,
} from '../src/runs/domain/run-executor.port';
import type { RunRecord } from '../src/runs/domain/run.types';
import { createAuthenticatedAgent, type E2eAgent } from './authenticated-agent';
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
  audience: {
    profiles: [{ name: 'Founder SaaS', description: 'Founder SaaS B2B' }],
  },
  extras: { hashtags: ['#acme'] },
};

const startRunBody = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  language: 'pl',
  brief: { topic: 'Q3-in-flight' },
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

/** Parks execute until release() or AbortSignal — R-6 slot + cancel abort. */
class HoldingRunExecutor implements RunExecutorPort {
  private readonly hold = deferred();
  readonly startedIds: string[] = [];
  lastSignal: AbortSignal | undefined;

  async execute(run: RunRecord, options?: RunExecuteOptions): Promise<void> {
    this.startedIds.push(String(run.id));
    this.lastSignal = options?.signal;
    await Promise.race([this.hold.promise, abortReject(options?.signal)]);
  }

  release(): void {
    this.hold.resolve();
  }
}

describe('Runs per-user in-flight limit (e2e)', () => {
  describe('R-6a 409 at MAX_USER_IN_FLIGHT_RUNS', () => {
    let app: INestApplication;
    let agent: E2eAgent;
    let prisma: PrismaService;
    let holding: HoldingRunExecutor;
    let previousMaxUser: string | undefined;
    let previousMaxConcurrent: string | undefined;

    beforeAll(async () => {
      deployTestDb();

      const standalone = new PrismaClient();
      try {
        await standalone.$connect();
        await wipeRuns(standalone);
      } finally {
        await standalone.$disconnect();
      }

      previousMaxUser = process.env.MAX_USER_IN_FLIGHT_RUNS;
      previousMaxConcurrent = process.env.MAX_CONCURRENT_RUNS;
      process.env.MAX_USER_IN_FLIGHT_RUNS = '1';
      process.env.MAX_CONCURRENT_RUNS = '3';
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
      await putCompleteContext(agent);
    }, 30_000);

    beforeEach(async () => {
      await wipeRuns(prisma);
      holding.startedIds.length = 0;
      holding.lastSignal = undefined;
    });

    afterAll(async () => {
      try {
        holding?.release();
        if (prisma) {
          await wipeRuns(prisma);
        }
        await app?.close();
      } finally {
        if (previousMaxUser === undefined) {
          delete process.env.MAX_USER_IN_FLIGHT_RUNS;
        } else {
          process.env.MAX_USER_IN_FLIGHT_RUNS = previousMaxUser;
        }
        if (previousMaxConcurrent === undefined) {
          delete process.env.MAX_CONCURRENT_RUNS;
        } else {
          process.env.MAX_CONCURRENT_RUNS = previousMaxConcurrent;
        }
      }
    }, 15_000);

    it('rejects POST /runs with 409 USER_IN_FLIGHT_LIMIT_EXCEEDED when at cap', async () => {
      const first = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const firstId = first.body.runId as string;
      await waitForRunStatus(agent, firstId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(firstId),
        'first execute parked at cap',
      );

      const beforeCount = await prisma.run.count();

      const rejected = await agent
        .post('/api/v1/runs')
        .send({ ...startRunBody, brief: { topic: 'over-cap' } })
        .expect(409);

      expect(rejected.body.code).toBe('USER_IN_FLIGHT_LIMIT_EXCEEDED');
      expect(await prisma.run.count()).toBe(beforeCount);

      await agent.post(`/api/v1/runs/${firstId}/cancel`).expect(200);
      expect(holding.lastSignal?.aborted).toBe(true);
    });
  });

  describe('R-6 global cap still queues when user under per-user limit', () => {
    let app: INestApplication;
    let agent: E2eAgent;
    let prisma: PrismaService;
    let holding: HoldingRunExecutor;
    let previousMaxUser: string | undefined;
    let previousMaxConcurrent: string | undefined;

    beforeAll(async () => {
      deployTestDb();

      const standalone = new PrismaClient();
      try {
        await standalone.$connect();
        await wipeRuns(standalone);
      } finally {
        await standalone.$disconnect();
      }

      previousMaxUser = process.env.MAX_USER_IN_FLIGHT_RUNS;
      previousMaxConcurrent = process.env.MAX_CONCURRENT_RUNS;
      process.env.MAX_USER_IN_FLIGHT_RUNS = '5';
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
      await putCompleteContext(agent);
    }, 30_000);

    beforeEach(async () => {
      await wipeRuns(prisma);
      holding.startedIds.length = 0;
      holding.lastSignal = undefined;
    });

    afterAll(async () => {
      try {
        holding?.release();
        if (prisma) {
          await wipeRuns(prisma);
        }
        await app?.close();
      } finally {
        if (previousMaxUser === undefined) {
          delete process.env.MAX_USER_IN_FLIGHT_RUNS;
        } else {
          process.env.MAX_USER_IN_FLIGHT_RUNS = previousMaxUser;
        }
        if (previousMaxConcurrent === undefined) {
          delete process.env.MAX_CONCURRENT_RUNS;
        } else {
          process.env.MAX_CONCURRENT_RUNS = previousMaxConcurrent;
        }
      }
    }, 15_000);

    it('keeps second run queued (202) when only MAX_CONCURRENT_RUNS is saturated', async () => {
      const first = await agent
        .post('/api/v1/runs')
        .send(startRunBody)
        .expect(202);
      const firstId = first.body.runId as string;
      await waitForRunStatus(agent, firstId, 'running');
      await waitUntil(
        () => holding.startedIds.includes(firstId),
        'first execute parked',
      );

      const second = await agent
        .post('/api/v1/runs')
        .send({ ...startRunBody, brief: { topic: 'Q3-queued' } })
        .expect(202);
      const secondId = second.body.runId as string;

      await sleep(150);
      const secondWhileHeld = await agent
        .get(`/api/v1/runs/${secondId}`)
        .expect(200);

      expect(secondWhileHeld.body.status).toBe('queued');
      expect(secondWhileHeld.body.code).toBeUndefined();
      expect(holding.startedIds).toEqual([firstId]);

      await agent.post(`/api/v1/runs/${firstId}/cancel`).expect(200);
      expect(holding.lastSignal?.aborted).toBe(true);
    });
  });
});
