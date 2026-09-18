import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type PartialCompanyContext,
  type CompanyContextRepository,
} from '../domain/company-context.port';
import { assertCompanyContextWritable } from '../domain/assert-company-context-writable';
import { isComplete } from '../domain/is-complete';
import { mergeCompanyContext } from '../domain/merge-company-context';
import { toPublicCompanyContext } from './company-context.mapper';

@Injectable()
export class PatchCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute(partial: PartialCompanyContext) {
    const current = await this.repository.get();
    const merged = mergeCompanyContext(current, partial);
    assertCompanyContextWritable(merged);
    const saved = await this.repository.put(merged);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
}
