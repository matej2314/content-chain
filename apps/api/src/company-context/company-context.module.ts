import { Module } from '@nestjs/common';
import { GetCompanyContextUseCase } from './application/get-company-context.use-case';
import { GetCompletenessUseCase } from './application/get-completeness.use-case';
import { PatchCompanyContextUseCase } from './application/patch-company-context.use-case';
import { PutCompanyContextUseCase } from './application/put-company-context.use-case';
import { CompanyContextController } from './company-context.controller';
import { COMPANY_CONTEXT_REPOSITORY } from './domain/company-context.port';
import { PrismaCompanyContextAdapter } from './infrastructure/prisma-company-context.adapter';

@Module({
  controllers: [CompanyContextController],
  providers: [
    {
      provide: COMPANY_CONTEXT_REPOSITORY,
      useClass: PrismaCompanyContextAdapter,
    },
    GetCompanyContextUseCase,
    PutCompanyContextUseCase,
    PatchCompanyContextUseCase,
    GetCompletenessUseCase,
  ],
  exports: [GetCompletenessUseCase, COMPANY_CONTEXT_REPOSITORY],
})
export class CompanyContextModule {}
