import { Test } from '@nestjs/testing';
import { RunExecutePump } from '../../api/src/runs/application/lifecycle/run-execute.pump';
import { WorkerRecoverySweepBoot } from '../../api/src/runs/application/lifecycle/worker-recovery-sweep.boot';
import { RUN_EXECUTOR } from '../../api/src/runs/domain/run-executor.port';
import { PgBossRunWorker } from '../../api/src/runs/infrastructure/dispatch/pg-boss-run.worker';
import {
  PG_BOSS,
  PG_NOTIFY_POOL,
} from '../../api/src/runs/infrastructure/dispatch/pg-boss.tokens';
import { RunAbortNotifyListener } from '../../api/src/runs/infrastructure/dispatch/run-abort-notify.listener';
import { ENV } from '../../api/src/shared/config/env';
import { PrismaService } from '../../api/src/shared/persistence/prisma.service';
import { WorkerAppModule } from './worker-app.module';

const testEnv = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
  GATEWAY_BASE_URL: 'http://127.0.0.1:9',
  GATEWAY_KEY: 'test-key',
  GATEWAY_MODEL_ALIAS: 'chat-default',
  JWT_SECRET: 'test-secret',
  CORS_ORIGIN: 'http://127.0.0.1:3000',
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
