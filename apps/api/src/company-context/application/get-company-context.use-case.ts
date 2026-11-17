import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '@content-chain/run-pipelines';
import { isComplete } from '../domain/is-complete';

@Injectable()
export class GetCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute() {
    const context = await this.repository.get();
    const completeness = isComplete(context);
    return { ...context, completeness };
  }
}
