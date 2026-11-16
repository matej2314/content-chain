import {
  Inject,
  Injectable,
  Logger,
  Module,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'pg';
import { ContentPipelineFacade } from '../content/application/content-pipeline.facade';
import { ContentRunExecutor } from '../content/application/content-run.executor';
import { CONTENT_RESULT_STORE } from '../content/domain/content-result.port';
import { PrismaContentResultAdapter } from '../content/infrastructure/persistence/prisma-content-result.adapter';
import { CompanyContextModule } from '../company-context/company-context.module';
import { LlmModule } from '../llm/llm.module';
import { SocialPipelineFacade } from '../social/application/social-pipeline.facade';
import { SocialRunExecutor } from '../social/application/social-run.executor';
import { SOCIAL_RESULT_STORE } from '../social/domain/social-result.port';
import { PrismaSocialResultAdapter } from '../social/infrastructure/persistence/prisma-social-result.adapter';
import { WorkerEnvModule } from '../shared/config/worker-env.module';
import { ENV, type Env } from '../shared/config/env';
import { LlmHopService } from '../shared/llm/llm-hop';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { AutoFinalizeExpiredReviewsUseCase } from './application/auto-finalize-expired-reviews.use-case';
import { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
import { RunAbortRegistry } from './application/lifecycle/run-abort.registry';
import { RunDispatchExecutor } from './application/lifecycle/run-dispatch.executor';
import { RunExecutePump } from './application/lifecycle/run-execute.pump';
import { RunLifecycleService } from './application/lifecycle/run-lifecycle.service';
import {
  AFTER_RECOVER_WAKE,
  WorkerRecoverySweepBoot,
} from './application/lifecycle/worker-recovery-sweep.boot';
import { RUN_EXECUTOR } from './domain/run-executor.port';
import { RUN_LIFECYCLE } from './domain/run-lifecycle.port';
import { RUN_REPOSITORY } from './domain/run.port';
import { RUN_SSE_HUB } from './domain/run-sse.port';
import { PgBossRunWorker } from './infrastructure/dispatch/pg-boss-run.worker';
import {
  loadPgBoss,
  PG_BOSS,
  PG_NOTIFY_POOL,
  type PgBossWorkerClient,
} from './infrastructure/dispatch/pg-boss.tokens';
import { RunAbortNotifyListener } from './infrastructure/dispatch/run-abort-notify.listener';
import {
  RUN_EXECUTE_QUEUE,
  RUN_WAKE_QUEUE,
} from './infrastructure/dispatch/run-job.constants';
import { PrismaRunAdapter } from './infrastructure/persistence/prisma-run.adapter';
import { NotifyRunSseHub } from './infrastructure/sse/notify-run-sse.hub';

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
 * Runtime DI workera: abort LISTEN, recovery, review sweep, execute pump, pg-boss work.
 * Pipeline providers are registered here (not via SocialModule/ContentModule) so
 * RUN_LIFECYCLE / RUN_SSE_HUB resolve to NotifyRunSseHub — not Local hub + api LISTEN.
 * Wired from apps/worker (not HTTP AppModule).
 */
@Module({
  imports: [WorkerEnvModule, PrismaModule, LlmModule, CompanyContextModule],
  providers: [
    PrismaRunAdapter,
    { provide: RUN_REPOSITORY, useExisting: PrismaRunAdapter },
    RunAbortRegistry,
    {
      provide: PG_NOTIFY_POOL,
      useFactory: (env: Env): Pool =>
        new Pool({ connectionString: env.DATABASE_URL }),
      inject: [ENV],
    },
    { provide: RUN_SSE_HUB, useClass: NotifyRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    LlmHopService,
    SocialPipelineFacade,
    SocialRunExecutor,
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
    ContentPipelineFacade,
    ContentRunExecutor,
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
      useFactory: async (env: Env): Promise<PgBossWorkerClient> => {
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
