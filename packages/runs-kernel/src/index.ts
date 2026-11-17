/** @content-chain/runs-kernel — lifecycle / recovery / sweep / abort / pump-dispatch. */

export { ENV, type RuntimeEnv } from './config/env.token';
export {
  validateWorkerEnv,
  workerEnvSchema,
  type WorkerEnvInput,
} from './config/worker-env.schema';
export { WorkerEnvModule } from './config/worker-env.module';

export {
  RUN_EXECUTOR,
  type RunExecutorPort,
  type RunExecuteOptions,
} from './domain/run-executor.port';
export { RUN_LIFECYCLE, type RunLifecyclePort } from './domain/run-lifecycle.port';
export {
  RUN_REPOSITORY,
  PAGE_SIZE,
  type RunRepository,
  type ListRunsQuery,
  type ListRunsResult,
  type ListLightRunsResult,
  type PersistedRunLog,
  type RunSnapshot,
  type RunSummaryAggregate,
  type RunSummaryScope,
  type RunStartedBy,
  type LightRunItem,
} from './domain/run.port';
export { RUN_SSE_HUB, type RunSseHub, type RunSseEvent } from './domain/run-sse.port';
export { RUN_STATS_PORT, type RunStatsPort } from './domain/run-stats.port';
export { RUN_JOB_ENQUEUE, type RunJobEnqueuePort } from './domain/run-job-enqueue.port';
export { RUN_ABORT_SIGNAL, type RunAbortSignalPort } from './domain/run-abort-signal.port';
export type {
  RunRecord,
  RunLogEntry,
  SocialRunRecord,
  ContentRunRecord,
  RunRecordBase,
  SocialBrief,
  ContentBrief,
  RunLogLevel,
} from './domain/run.types';
export { isSocialRunRecord, isContentRunRecord } from './domain/run.types';
export { assertTransition, CANCELABLE_RUN_STATUSES } from './domain/status-transitions';
export { isRetryable } from './domain/is-retryable';
export { isReviewWindowOpen, computeReviewExpiresAt } from './domain/review-window';
export { assertRunReviewable, type ReviewWindowParams } from './domain/assert-run-reviewable';
export {
  socialBriefSchema,
  contentBriefSchema,
  type ParsedSocialBrief,
  type ParsedContentBrief,
} from './domain/brief.schemas';

export { RunLifecycleService } from './application/lifecycle/run-lifecycle.service';
export { RunAbortRegistry } from './application/lifecycle/run-abort.registry';
export { RunDispatchExecutor } from './application/lifecycle/run-dispatch.executor';
export { RunExecutePump } from './application/lifecycle/run-execute.pump';
export {
  WorkerRecoverySweepBoot,
  AFTER_RECOVER_WAKE,
  type AfterRecoverWake,
} from './application/lifecycle/worker-recovery-sweep.boot';
export { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
export { AutoFinalizeExpiredReviewsUseCase } from './application/auto-finalize-expired-reviews.use-case';
export { UnsupportedRunExecutor } from './application/unsupported-run.executor';

export { PgBossRunWorker } from './infrastructure/dispatch/pg-boss-run.worker';
export { PgBossRunJobEnqueue } from './infrastructure/dispatch/pg-boss.run-job.enqueue';
export { PgNotifyAbortSignal } from './infrastructure/dispatch/pg-notify-abort.signal';
export { RunAbortNotifyListener } from './infrastructure/dispatch/run-abort-notify.listener';
export { StubRunExecutor } from './infrastructure/dispatch/stub-run.executor';
export { createInProcessPgBossClient } from './infrastructure/dispatch/in-process-pg-boss.client';
export {
  loadPgBoss,
  PG_BOSS,
  PG_NOTIFY_POOL,
  type PgBossSendClient,
  type PgBossWorkerClient,
  type PgBossJob,
} from './infrastructure/dispatch/pg-boss.tokens';
export {
  RUN_WAKE_QUEUE,
  RUN_EXECUTE_QUEUE,
  RUN_ABORT_CHANNEL,
  RUN_SSE_CHANNEL,
} from './infrastructure/dispatch/run-job.constants';
export { runJobPayloadSchema } from './infrastructure/dispatch/run-job.schemas';

export { NotifyRunSseHub } from './infrastructure/sse/notify-run-sse.hub';
export {
  runSseNotifyEnvelopeSchema,
  parseRunSseNotifyPayload,
  encodePublish,
  encodePublishLog,
  encodeComplete,
} from './infrastructure/sse/run-sse-notify.envelope';

export { PrismaRunAdapter } from './infrastructure/persistence/prisma-run.adapter';

export {
  makeSocialRun,
  makeContentRun,
  makeSocialSnapshot,
  type SocialRunSnapshot,
} from './testing/run-record.test-helpers';
