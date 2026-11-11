import { emptyCompanyContext } from '../company-context/domain/company-context.types';
import { SeedService } from './seed.service';
import * as loadFixture from './load-company-context-fixture';
import type { CompanyContextRepository } from '../company-context/domain/company-context.port';
import type { PutCompanyContextUseCase } from '../company-context/application/put-company-context.use-case';
import type { Env } from '../shared/config/env';

const completeFixture = {
  identity: { name: 'Mostek', description: 'Opis.' },
  offer: {
    items: [
      {
        name: 'Integracja',
        benefit: ['A'],
        description: 'Opis oferty.',
      },
    ],
  },
  voice: { weDo: 'konkret', weDont: 'żargon' },
  cta: { items: [{ label: 'Kontakt', target: '/x' }] },
  audience: {
    profiles: [{ name: 'Ops', description: 'Dyrektor ops' }],
  },
  extras: null,
};

function repo(
  overrides: Partial<CompanyContextRepository> = {},
): CompanyContextRepository {
  return {
    get: async () => emptyCompanyContext(),
    put: async (context) => context,
    ...overrides,
  };
}

function env(demoMode: boolean): Env {
  return { DEMO_MODE: demoMode } as Env;
}

describe('SeedService', () => {
  let loadSpy: jest.SpyInstance;

  beforeEach(() => {
    loadSpy = jest
      .spyOn(loadFixture, 'loadCompanyContextFixture')
      .mockReturnValue(completeFixture);
  });

  afterEach(() => {
    loadSpy.mockRestore();
  });

  it('seeds when context is empty (D-86 path)', async () => {
    const put = { execute: jest.fn(async (c: typeof completeFixture) => c) };
    const service = new SeedService(
      env(false),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await expect(service.seedCompanyContext()).resolves.toEqual({
      status: 'seeded',
    });
    expect(put.execute).toHaveBeenCalledWith(completeFixture);
  });

  it('no-ops when context is not empty (D-87)', async () => {
    const put = { execute: jest.fn() };
    const filled = {
      ...emptyCompanyContext(),
      identity: { name: 'X', description: 'Y' },
    };
    const service = new SeedService(
      env(true),
      repo({ get: async () => filled }),
      put as unknown as PutCompanyContextUseCase,
    );
    await expect(service.seedCompanyContext()).resolves.toEqual({
      status: 'skipped',
      reason: 'not-empty',
    });
    expect(put.execute).not.toHaveBeenCalled();
    expect(loadSpy).not.toHaveBeenCalled();
  });

  it('onModuleInit seeds only when DEMO_MODE is true', async () => {
    const put = { execute: jest.fn(async (c: typeof completeFixture) => c) };
    const off = new SeedService(
      env(false),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await off.onModuleInit();
    expect(put.execute).not.toHaveBeenCalled();

    const on = new SeedService(
      env(true),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await on.onModuleInit();
    expect(put.execute).toHaveBeenCalledTimes(1);
  });
});
