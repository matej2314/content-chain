import { Module } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { LlmModule } from '../llm/llm.module';
import { RunLifecycleModule } from '../runs/run-lifecycle.module';
import { SOCIAL_RESULT_STORE } from './domain/social-result.port';
import { SocialPipelineFacade } from './application/social-pipeline.facade';
import { SocialRunExecutor } from './application/social-run.executor';
import { LlmHopService } from './infrastructure/graph/llm-hop';
import { PrismaSocialResultAdapter } from './infrastructure/persistence/prisma-social-result.adapter';

@Module({
  imports: [RunLifecycleModule, LlmModule, CompanyContextModule],
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    LlmHopService,
    SocialPipelineFacade,
    SocialRunExecutor,
  ],
  exports: [SocialRunExecutor, SOCIAL_RESULT_STORE],
})
export class SocialModule {}
