import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../domain/company-context.port';
import { isComplete } from '../domain/is-complete';
import { toPublicCompanyContext } from './company-context.mapper';
import type { CompanyContext } from '../domain/company-context.types';

@Injectable()
export class PutCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute(context: CompanyContext) {
    const saved = await this.repository.put(context);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
}
