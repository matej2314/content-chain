import { Module } from '@nestjs/common';
import { CompanyContextController } from './company-context.controller';

@Module({
  controllers: [CompanyContextController]
})
export class CompanyContextModule {}
