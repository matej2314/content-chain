import {
  Inject,
  Injectable,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'pg';
import {
  AFTER_RECOVER_WAKE,
  AutoFinalizeExpiredReviewsUseCase,
  ENV,
  NotifyRunSseHub,
  PG_BOSS,
  PG_NOTIFY_POOL,
  PrismaModule,
  PrismaRunAdapter,
  RecoverInterruptedRunsUseCase,
  RUN_EXECUTOR,
  RUN_EXECUTE_QUEUE,
  RUN_LIFECYCLE,
  RUN_REPOSITORY,
  RUN_SSE_HUB,
  RUN_WAKE_QUEUE,
  RunAbortNotifyListener,
  RunAbortRegistry,
  RunExecutePump,
  RunLifecycleService,
  UnsupportedRunExecutor,
  WorkerEnvModule,
  WorkerRecoverySweepBoot,
  PgBossRunWorker,
  loadPgBoss,
  type PgBossWorkerClient,
  type RuntimeEnv,
} from '@content-chain/runs-kernel';

/** Stop pg-boss + notify pool on worker context close (e2e / process shutdown). */
@Injectable()
class WorkerDispatchShutdown implements OnModuleDestroy {
  private readonly logger = new Logger(WorkerDispatchShutdown.name);

  constructor(
    @Inject(PG_BOSS) private readonly boss: PgBossWorkerClient,
    @Inject(PG_NOTIFY_POOL) private readonly pool: Pool,
  ) {}

  async onModuleDestroy(): Promise<void> {
    try {
      await this.boss.stop({ graceful: true });
    } catch (err) {
      this.logger.warn({ err }, 'worker pg-boss stop failed');
    }
    try {
      await this.pool.end();
    } catch (err) {
      this.logger.warn({ err }, 'worker notify pool end failed');
    }
  }
}

/**
 * FAZA 2 composition root: kernel providers only.
 * RUN_EXECUTOR = UnsupportedRunExecutor until FAZA 3 wires RunPipelinesModule.
 */
@Module({
  imports: [WorkerEnvModule, PrismaModule],
  providers: [
    PrismaRunAdapter,
    { provide: RUN_REPOSITORY, useExisting: PrismaRunAdapter },
    RunAbortRegistry,
    {
      provide: PG_NOTIFY_POOL,
      useFactory: (env: RuntimeEnv): Pool =>
        new Pool({ connectionString: env.DATABASE_URL }),
      inject: [ENV],
    },
    { provide: RUN_SSE_HUB, useClass: NotifyRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    { provide: RUN_EXECUTOR, useClass: UnsupportedRunExecutor },
    RecoverInterruptedRunsUseCase,
    AutoFinalizeExpiredReviewsUseCase,
    RunAbortNotifyListener,
    RunExecutePump,
    {
      provide: AFTER_RECOVER_WAKE,
      useExisting: RunExecutePump,
    },
    {
      provide: PG_BOSS,
      useFactory: async (env: RuntimeEnv): Promise<PgBossWorkerClient> => {
        const PgBoss = await loadPgBoss();
        const boss = new PgBoss({ connectionString: env.DATABASE_URL });
        await boss.start();
        await boss.createQueue(RUN_WAKE_QUEUE);
        await boss.createQueue(RUN_EXECUTE_QUEUE);
        return boss;
      },
      inject: [ENV],
    },
    PgBossRunWorker,
    WorkerRecoverySweepBoot,
    WorkerDispatchShutdown,
  ],
})
export class WorkerRuntimeModule {}
