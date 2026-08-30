import {
  Module,
  type DynamicModule,
  type InjectionToken,
  type ModuleMetadata,
  type OptionalFactoryDependency,
} from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { InProcessRunWorker } from './application/in-process-run.worker';
import { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { StartRunUseCase } from './application/start-run.use-case';
import { ListRunsUseCase } from './application/list-runs.use-case';
import { RUN_EXECUTOR, type RunExecutorPort } from './domain/run-executor.port';
import {
  RUN_RESULT_READER,
  type RunResultReader,
} from './domain/run-result-reader.port';
import { RunLifecycleModule } from './run-lifecycle.module';
import { RunsController } from './runs.controller';

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
  imports: [CompanyContextModule, RunLifecycleModule],
  controllers: [RunsController],
  providers: [
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
  ],
  exports: [RunLifecycleModule],
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
