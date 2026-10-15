import type { CompanyContext } from './company-context.types';
import { withEffectiveAudience } from './with-effective-audience';

const company: CompanyContext = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność'],
        description: 'Przegląd.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz' }] },
  audience: {
    profiles: [
      { name: 'Founder SaaS', description: 'Founder 8–40' },
      { name: 'Ops Lead', description: 'Ops / CS' },
    ],
  },
  extras: null,
};

describe('withEffectiveAudience', () => {
  it('D-75 omit brief.audience → empty effective profiles', () => {
    const scoped = withEffectiveAudience(company, undefined);
    expect(scoped.audience.profiles).toEqual([]);
    expect(scoped.identity).toEqual(company.identity);
    expect(scoped.offer).toEqual(company.offer);
  });

  it('D-76 catalog name match (trim, case-insensitive) → one profile', () => {
    const scoped = withEffectiveAudience(company, '  founder saas ');
    expect(scoped.audience.profiles).toEqual([
      { name: 'Founder SaaS', description: 'Founder 8–40' },
    ]);
  });

  it('D-77 custom string → empty profiles despite catalog', () => {
    const scoped = withEffectiveAudience(
      company,
      'Właściciele lokalnych kawiarni w Warszawie',
    );
    expect(scoped.audience.profiles).toEqual([]);
  });
});
