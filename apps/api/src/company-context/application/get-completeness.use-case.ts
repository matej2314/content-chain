import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../domain/company-context.port';
import { isComplete } from '../domain/is-complete';

@Injectable()
export class GetCompletenessUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute() {
    return isComplete(await this.repository.get());
  }
}
