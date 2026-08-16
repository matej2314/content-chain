import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type PartialCompanyContext,
  type CompanyContextRepository,
} from '../domain/company-context.port';
import { isComplete } from '../domain/is-complete';
import { toPublicCompanyContext } from './company-context.mapper';

@Injectable()
export class PatchCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute(partial: PartialCompanyContext) {
    const saved = await this.repository.patch(partial);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
}
