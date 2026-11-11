import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PutCompanyContextUseCase } from '../company-context/application/put-company-context.use-case';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../company-context/domain/company-context.port';
import { isEmptyCompanyContext } from '../company-context/domain/is-empty-company-context';
import { ENV, type Env } from '../shared/config/env';
import { loadCompanyContextFixture } from './load-company-context-fixture';

export type SeedCompanyContextResult =
  | { readonly status: 'seeded' }
  | { readonly status: 'skipped'; readonly reason: 'not-empty' };

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly contextRepository: CompanyContextRepository,
    private readonly putCompanyContext: PutCompanyContextUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.env.DEMO_MODE) {
      return;
    }
    const result = await this.seedCompanyContext();
    this.logger.log(`Company context seeded on boot. Status: ${result.status}`);
  }

  async seedCompanyContext(): Promise<SeedCompanyContextResult> {
    const current = await this.contextRepository.get();
    if (!isEmptyCompanyContext(current)) {
      return { status: 'skipped', reason: 'not-empty' };
    }
    const fixture = loadCompanyContextFixture();
    await this.putCompanyContext.execute(fixture);
    return { status: 'seeded' };
  }
}
