import { Module } from '@nestjs/common';
import { PrismaRunAdapter, RUN_LIFECYCLE, RUN_REPOSITORY, RUN_SSE_HUB, RUN_STATS_PORT, RunLifecycleService } from '@content-chain/runs-kernel';

import { OUTPUT_EDITED_WRITER } from './domain/output-edited-writer.port';

import { PrismaOutputEditedAdapter } from './infrastructure/persistence/prisma-output-edited.adapter';

import { LocalRunSseHub } from './infrastructure/sse/local-run-sse.hub';
import { RunSseNotifyListener } from './infrastructure/sse/run-sse-notify.listener';

@Module({
  providers: [
    PrismaRunAdapter,
    { provide: RUN_REPOSITORY, useExisting: PrismaRunAdapter },
    { provide: RUN_STATS_PORT, useExisting: PrismaRunAdapter },
    { provide: OUTPUT_EDITED_WRITER, useClass: PrismaOutputEditedAdapter },
    { provide: RUN_SSE_HUB, useClass: LocalRunSseHub },
    RunSseNotifyListener,
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
  ],
  exports: [
    RUN_REPOSITORY,
    RUN_STATS_PORT,
    OUTPUT_EDITED_WRITER,
    RUN_SSE_HUB,
    RUN_LIFECYCLE,
    RunLifecycleService,
  ],
})
export class RunLifecycleModule {}
