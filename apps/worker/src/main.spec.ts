import { Test } from '@nestjs/testing';
import {
  ENV,
  PG_BOSS,
  PG_NOTIFY_POOL,
  PrismaService,
  PgBossRunWorker,
  RUN_EXECUTOR,
  RunAbortNotifyListener,
  RunExecutePump,
  WorkerRecoverySweepBoot,
} from '@content-chain/runs-kernel';
import { WorkerAppModule } from './worker-app.module';

const testEnv = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
  GATEWAY_BASE_URL: 'http://127.0.0.1:9',
  GATEWAY_KEY: 'test-key',
  GATEWAY_MODEL_ALIAS: 'chat-default',
  REVIEW_TTL: '2h',
  REVIEW_SWEEP_INTERVAL: '5m',
  MAX_CONCURRENT_RUNS: 3,
} as const;

describe('WorkerAppModule', () => {
  it('boots an application context without HTTP server', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WorkerAppModule],
    })
      .overrideProvider(ENV)
      .useValue(testEnv)
      .overrideProvider(PG_NOTIFY_POOL)
      .useValue({
        query: async () => ({ rows: [] }),
        end: async () => undefined,
      })
      .overrideProvider(PG_BOSS)
      .useValue({
        send: async () => null,
        start: async () => undefined,
        stop: async () => undefined,
        createQueue: async () => undefined,
        work: async () => 'mock-worker',
      })
      .overrideProvider(PrismaService)
      .useValue({
        onModuleInit: async () => undefined,
        onModuleDestroy: async () => undefined,
        $connect: async () => undefined,
        $disconnect: async () => undefined,
      })
      .overrideProvider(RUN_EXECUTOR)
      .useValue({ execute: async () => undefined })
      .overrideProvider(RunExecutePump)
      .useValue({
        notifyQueued: () => undefined,
        scheduleExistingRunning: () => undefined,
      })
      .overrideProvider(PgBossRunWorker)
      .useValue({
        onModuleInit: async () => undefined,
        onModuleDestroy: async () => undefined,
      })
      .overrideProvider(WorkerRecoverySweepBoot)
      .useValue({
        onModuleInit: async () => undefined,
        onModuleDestroy: () => undefined,
      })
      .overrideProvider(RunAbortNotifyListener)
      .useValue({
        onModuleInit: async () => undefined,
        onModuleDestroy: async () => undefined,
      })
      .compile();
    await moduleRef.init();
    expect(moduleRef).toBeDefined();
    await moduleRef.close();
  });
});
