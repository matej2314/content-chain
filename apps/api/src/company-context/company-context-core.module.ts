import { Module } from '@nestjs/common';
import { COMPANY_CONTEXT_REPOSITORY } from './domain/company-context.port';
import { PrismaCompanyContextAdapter } from './infrastructure/prisma-company-context.adapter';

/**
 * Repo-only slice for worker runtime (M-10): no HTTP controller / DTO / swagger.
 */
@Module({
  providers: [
    {
      provide: COMPANY_CONTEXT_REPOSITORY,
      useClass: PrismaCompanyContextAdapter,
    },
  ],
  exports: [COMPANY_CONTEXT_REPOSITORY],
})
export class CompanyContextCoreModule {}
