import { Module } from '@nestjs/common';
import { RunLifecycleModule } from '../runs/run-lifecycle.module';
import { LlmModule } from '../llm/llm.module';
import { CompanyContextModule } from '../company-context/company-context.module';
import { CONTENT_RESULT_STORE } from './domain/content-result.port';
import { PrismaContentResultAdapter } from './infrastructure/persistence/prisma-content-result.adapter';
import { LlmHopService } from '../shared/llm/llm-hop';
import { ContentPipelineFacade } from './application/content-pipeline.facade';
import { ContentRunExecutor } from './application/content-run.executor';

@Module({
  imports: [RunLifecycleModule, LlmModule, CompanyContextModule],
  providers: [
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
    LlmHopService,
    ContentPipelineFacade,
    ContentRunExecutor,
  ],
  exports: [ContentRunExecutor, CONTENT_RESULT_STORE],
})
export class ContentModule {}
