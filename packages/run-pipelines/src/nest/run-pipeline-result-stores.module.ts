import { Module } from '@nestjs/common';
import { CONTENT_RESULT_STORE } from '../content/domain/content-result.port';
import { PrismaContentResultAdapter } from '../content/infrastructure/persistence/prisma-content-result.adapter';
import { SOCIAL_RESULT_STORE } from '../social/domain/social-result.port';
import { PrismaSocialResultAdapter } from '../social/infrastructure/persistence/prisma-social-result.adapter';

@Module({
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
  ],
  exports: [SOCIAL_RESULT_STORE, CONTENT_RESULT_STORE],
})
export class RunPipelineResultStoresModule {}
