import { apiFetch } from '@/shared/api/api-fetch';
import {
  parseCompanyContextPayload,
  parseCompleteness,
  companyContextForPut,
  type CompanyContext,
  type CompanyContextPayload,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';

export async function fetchCompleteness(): Promise<Completeness> {
  const body = await apiFetch('/company-context/completeness');
  return parseCompleteness(body);
}

export async function fetchCompanyContext(): Promise<CompanyContextPayload> {
  const body = await apiFetch('/company-context');
  return parseCompanyContextPayload(body);
}

export async function putCompanyContext(context: CompanyContext): Promise<CompanyContextPayload> {
  const body = await apiFetch('/company-context', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(companyContextForPut(context)),
  });
  return parseCompanyContextPayload(body);
}
