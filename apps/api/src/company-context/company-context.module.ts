import { Module } from '@nestjs/common';
import { GetCompanyContextUseCase } from './application/get-company-context.use-case';
import { GetCompletenessUseCase } from './application/get-completeness.use-case';
import { PatchCompanyContextUseCase } from './application/patch-company-context.use-case';
import { PutCompanyContextUseCase } from './application/put-company-context.use-case';
import { CompanyContextCoreModule } from '@content-chain/run-pipelines';
import { CompanyContextController } from './company-context.controller';

@Module({
  imports: [CompanyContextCoreModule],
  controllers: [CompanyContextController],
  providers: [
    GetCompanyContextUseCase,
    PutCompanyContextUseCase,
    PatchCompanyContextUseCase,
    GetCompletenessUseCase,
  ],
  exports: [
    CompanyContextCoreModule,
    GetCompletenessUseCase,
    PutCompanyContextUseCase,
  ],
})
export class CompanyContextModule {}
