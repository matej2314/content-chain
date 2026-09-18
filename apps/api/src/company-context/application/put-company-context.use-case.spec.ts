import { emptyCompanyContext } from '../domain/company-context.types';
import type { CompanyContextRepository } from '../domain/company-context.port';
import { PutCompanyContextUseCase } from './put-company-context.use-case';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: null,
};

function unusedRepo(
  overrides: Partial<CompanyContextRepository> = {},
): CompanyContextRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    get: unexpected,
    put: unexpected,
    ...overrides,
  };
}

describe('PutCompanyContextUseCase', () => {
  it('persists a complete context including extras null', async () => {
    const put = jest.fn(async (context: typeof complete) => context);
    const uc = new PutCompanyContextUseCase(unusedRepo({ put }));
    const result = await uc.execute(complete);
    expect(put).toHaveBeenCalledTimes(1);
    expect(result.completeness).toEqual({ complete: true, missing: [] });
    expect(result.extras).toBeNull();
  });

  it('rejects an incomplete body and does not call put', async () => {
    const put = jest.fn();
    const uc = new PutCompanyContextUseCase(unusedRepo({ put }));
    await expect(uc.execute(emptyCompanyContext())).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(put).not.toHaveBeenCalled();
  });
});
