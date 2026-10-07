import { Module } from '@nestjs/common';
import { RunLifecycleService } from './application/lifecycle/run-lifecycle.service';
import { RUN_LIFECYCLE } from './domain/run-lifecycle.port';
import { OUTPUT_EDITED_WRITER } from './domain/output-edited-writer.port';
import { RUN_REPOSITORY } from './domain/run.port';
import { RUN_SSE_HUB } from './domain/run-sse.port';
import { PrismaOutputEditedAdapter } from './infrastructure/persistence/prisma-output-edited.adapter';
import { PrismaRunAdapter } from './infrastructure/persistence/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/sse/run-sse.hub';
import { RunAbortRegistry } from './application/lifecycle/run-abort.registry';

@Module({
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: OUTPUT_EDITED_WRITER, useClass: PrismaOutputEditedAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    RunAbortRegistry,
  ],
  exports: [
    RUN_REPOSITORY,
    OUTPUT_EDITED_WRITER,
    RUN_SSE_HUB,
    RUN_LIFECYCLE,
    RunLifecycleService,
    RunAbortRegistry,
  ],
})
export class RunLifecycleModule {}
