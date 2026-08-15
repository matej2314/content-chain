import type { CompanyContext } from './company-context.types';

export const COMPANY_CONTEXT_REPOSITORY = Symbol('COMPANY_CONTEXT_REPOSITORY');

export interface CompanyContextRepository {
  get(): Promise<CompanyContext>;
  put(context: CompanyContext): Promise<CompanyContext>;
  patch(partial: PartialCompanyContext): Promise<CompanyContext>;
}

export type PartialCompanyContext = {
  identity?: Partial<CompanyContext['identity']>;
  offer?: Partial<CompanyContext['offer']>;
  voice?: Partial<CompanyContext['voice']>;
  cta?: Partial<CompanyContext['cta']>;
  audience?: Partial<CompanyContext['audience']>;
  extras?: CompanyContext['extras'];
};
