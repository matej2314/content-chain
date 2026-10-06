import {
  Module,
  type DynamicModule,
  type InjectionToken,
  type ModuleMetadata,
  type OptionalFactoryDependency,
} from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { GuestQuotaModule } from './guest-quota.module';
import { InProcessRunWorker } from './application/in-process-run.worker';
import { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { GuestRunPolicyService } from './application/guest-run-policy.service';
import { StartRunUseCase } from './application/start-run.use-case';
import { ListRunsUseCase } from './application/list-runs.use-case';
import { RunAbortRegistry } from './application/run-abort.registry';
import { ListRunsUserUseCase } from './application/list-runs-user.use-case';
import { RUN_EXECUTOR, type RunExecutorPort } from './domain/run-executor.port';
import {
  RUN_RESULT_READER,
  type RunResultReader,
} from './domain/run-result-reader.port';
import { RunLifecycleModule } from './run-lifecycle.module';
import { RunsController } from './runs.controller';
import { RateRunUseCase } from './application/rate-run.use-case';
import { SaveOutputEditedUseCase } from './application/save-output-edited.use-case';
import { FinalizeReviewUseCase } from './application/finalize-review.use-case';
import { AutoFinalizeExpiredReviewsUseCase } from './application/auto-finalize-expired-reviews.use-case';
import { CancelRunUseCase } from './application/cancel-run.use-case';

export type RunsModuleAsyncOptions = {
  imports?: ModuleMetadata['imports'];
  inject: Array<InjectionToken | OptionalFactoryDependency>;
  useFactory: (...args: never[]) => RunExecutorPort | Promise<RunExecutorPort>;
  resultReader: {
    inject: Array<InjectionToken | OptionalFactoryDependency>;
    useFactory: (
      ...args: never[]
    ) => RunResultReader | Promise<RunResultReader>;
  };
};

@Module({
  imports: [CompanyContextModule, RunLifecycleModule, GuestQuotaModule],
  controllers: [RunsController],
  providers: [
    RunAbortRegistry,
    RecoverInterruptedRunsUseCase,
    AutoFinalizeExpiredReviewsUseCase,
    InProcessRunWorker,
    GuestRunPolicyService,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
    ListRunsUserUseCase,
    RateRunUseCase,
    SaveOutputEditedUseCase,
    FinalizeReviewUseCase,
    CancelRunUseCase,
  ],
  exports: [RunLifecycleModule, RunAbortRegistry],
})
export class RunsModule {
  static registerAsync(options: RunsModuleAsyncOptions): DynamicModule {
    return {
      module: RunsModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: RUN_EXECUTOR,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        {
          provide: RUN_RESULT_READER,
          useFactory: options.resultReader.useFactory,
          inject: options.resultReader.inject,
        },
      ],
    };
  }
}
