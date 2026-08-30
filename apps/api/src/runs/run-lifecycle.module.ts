import { Module } from '@nestjs/common';
import { RunLifecycleService } from './application/run-lifecycle.service';
import { RUN_LIFECYCLE } from './domain/run-lifecycle.port';
import { RUN_REPOSITORY } from './domain/run.port';
import { RUN_SSE_HUB } from './domain/run-sse.port';
import { PrismaRunAdapter } from './infrastructure/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/run-sse.hub';

@Module({
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
  ],
  exports: [RUN_REPOSITORY, RUN_SSE_HUB, RUN_LIFECYCLE, RunLifecycleService],
})
export class RunLifecycleModule {}
