import {
  Global,
  Inject,
  Injectable,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'pg';
import {
  ContentRunExecutor,
  RunPipelinesModule,
  SocialRunExecutor,
} from '@content-chain/run-pipelines';
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
  RunDispatchExecutor,
  RunExecutePump,
  RunLifecycleService,
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
 * Lifecycle + repo + NOTIFY hub for worker host.
 * @Global so RunPipelinesModule can inject RUN_LIFECYCLE (Nest encapsulation;
 * historical SocialModule imported RunLifecycleModule for the same reason).
 */
@Global()
@Module({
  providers: [
    PrismaRunAdapter,
    { provide: RUN_REPOSITORY, useExisting: PrismaRunAdapter },
    {
      provide: PG_NOTIFY_POOL,
      useFactory: (env: RuntimeEnv): Pool =>
        new Pool({ connectionString: env.DATABASE_URL }),
      inject: [ENV],
    },
    { provide: RUN_SSE_HUB, useClass: NotifyRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
  ],
  exports: [
    PrismaRunAdapter,
    RUN_REPOSITORY,
    PG_NOTIFY_POOL,
    RUN_SSE_HUB,
    RunLifecycleService,
    RUN_LIFECYCLE,
  ],
})
class WorkerLifecycleModule {}

/**
 * Composition root: kernel + run-pipelines; RUN_EXECUTOR = model A dispatch.
 */
@Module({
  imports: [
    WorkerEnvModule,
    PrismaModule,
    WorkerLifecycleModule,
    RunPipelinesModule,
  ],
  providers: [
    RunAbortRegistry,
    {
      provide: RUN_EXECUTOR,
      useFactory: (
        social: SocialRunExecutor,
        content: ContentRunExecutor,
        lifecycle: RunLifecycleService,
      ) => new RunDispatchExecutor(social, content, lifecycle),
      inject: [SocialRunExecutor, ContentRunExecutor, RunLifecycleService],
    },
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
