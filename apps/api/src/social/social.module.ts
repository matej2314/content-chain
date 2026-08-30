import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SOCIAL_RESULT_STORE } from './domain/social-result.port';
import { PrismaSocialResultAdapter } from './infrastructure/persistence/prisma-social-result.adapter';

@Module({
  controllers: [SocialController],
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
  ],
  exports: [SOCIAL_RESULT_STORE],
})
export class SocialModule {}
