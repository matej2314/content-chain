import { Module } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { InProcessRunWorker } from './application/in-process-run.worker';
import { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { StartRunUseCase } from './application/start-run.use-case';
import { ListRunsUseCase } from './application/list-runs.use-case';
import { RunLifecycleService } from './application/run-lifecycle.service';
import { RUN_EXECUTOR } from './domain/run-executor.port';
import { RUN_REPOSITORY } from './domain/run.port';
import { RUN_SSE_HUB } from './domain/run-sse.port';
import { RUN_LIFECYCLE } from './domain/run-lifecycle.port';
import { RUN_RESULT_READER } from './domain/run-result-reader.port';
import { EmptyRunResultReader } from './infrastructure/empty-run-result.reader';
import { PrismaRunAdapter } from './infrastructure/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/run-sse.hub';
import { StubRunExecutor } from './infrastructure/stub-run.executor';
import { RunsController } from './runs.controller';

@Module({
  imports: [CompanyContextModule],
  controllers: [RunsController],
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    { provide: RUN_EXECUTOR, useClass: StubRunExecutor },
    { provide: RUN_RESULT_READER, useClass: EmptyRunResultReader },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
  ],
  exports: [RUN_REPOSITORY, RUN_SSE_HUB, RUN_LIFECYCLE],
})
export class RunsModule {}
