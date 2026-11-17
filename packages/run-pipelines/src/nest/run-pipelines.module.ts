import { Module } from '@nestjs/common';
import { CompanyContextCoreModule } from '../company-context/company-context-core.module';
import { LlmModule } from '../llm-gateway/llm.module';
import { LlmHopService } from '../llm/llm-hop';
import { ContentPipelineFacade } from '../content/application/content-pipeline.facade';
import { ContentRunExecutor } from '../content/application/content-run.executor';
import { CONTENT_RESULT_STORE } from '../content/domain/content-result.port';
import { PrismaContentResultAdapter } from '../content/infrastructure/persistence/prisma-content-result.adapter';
import { SocialPipelineFacade } from '../social/application/social-pipeline.facade';
import { SocialRunExecutor } from '../social/application/social-run.executor';
import { SOCIAL_RESULT_STORE } from '../social/domain/social-result.port';
import { PrismaSocialResultAdapter } from '../social/infrastructure/persistence/prisma-social-result.adapter';

/**
 * Execute-side providers for worker composition root (model A).
 * Does not register RUN_EXECUTOR — host binds RunDispatchExecutor.
 */
@Module({
  imports: [LlmModule, CompanyContextCoreModule],
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
    LlmHopService,
    SocialPipelineFacade,
    SocialRunExecutor,
    ContentPipelineFacade,
    ContentRunExecutor,
  ],
  exports: [
    CompanyContextCoreModule,
    SOCIAL_RESULT_STORE,
    CONTENT_RESULT_STORE,
    SocialRunExecutor,
    ContentRunExecutor,
  ],
})
export class RunPipelinesModule {}
