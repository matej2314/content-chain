import { emptyCompanyContext } from '../domain/company-context.types';
import type { CompanyContextRepository } from '../domain/company-context.port';
import { PatchCompanyContextUseCase } from './patch-company-context.use-case';

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
  extras: { hashtags: ['#acme'] },
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

describe('PatchCompanyContextUseCase', () => {
  it('merges then puts when the result stays complete', async () => {
    const put = jest.fn(async (context: typeof complete) => context);
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => complete,
        put,
      }),
    );
    const result = await uc.execute({ identity: { name: 'Nowa' } });
    expect(put).toHaveBeenCalledWith({
      ...complete,
      identity: { name: 'Nowa', description: complete.identity.description },
    });
    expect(result.identity.name).toBe('Nowa');
  });

  it('rejects a patch that clears identity.name and does not call put', async () => {
    const put = jest.fn();
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => complete,
        put,
      }),
    );
    await expect(uc.execute({ identity: { name: '' } })).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(put).not.toHaveBeenCalled();
  });

  it('does not persist when get returns empty and patch is partial', async () => {
    const put = jest.fn();
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => emptyCompanyContext(),
        put,
      }),
    );
    await expect(
      uc.execute({ identity: { name: 'Acme' } }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    expect(put).not.toHaveBeenCalled();
  });
});
