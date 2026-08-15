import { emptyCompanyContext } from './company-context.types';
import { isComplete } from './is-complete';

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

describe('isComplete', () => {
  it('returns all gate keys missing for an empty context', () => {
    expect(isComplete(emptyCompanyContext())).toEqual({
      complete: false,
      missing: ['identity', 'offer', 'voice', 'cta', 'audience'],
    });
  });

  it('returns complete: true and empty missing when all sections are filled', () => {
    expect(isComplete(complete)).toEqual({ complete: true, missing: [] });
  });

  it('ignores extras for the gate', () => {
    expect(isComplete({ ...complete, extras: null }).complete).toBe(true);
  });

  it('treats whitespace-only identity as incomplete', () => {
    const result = isComplete({
      ...complete,
      identity: { name: '  ', description: 'ok' },
    });
    expect(result.complete).toBe(false);
    expect(result.missing).toContain('identity');
  });

  it('requires an offer item with non-empty name and at least one non-empty benefit', () => {
    const withoutBenefit = isComplete({
      ...complete,
      offer: {
        items: [{ name: 'Audyt', benefit: ['  '], description: 'ok' }],
      },
    });
    expect(withoutBenefit.complete).toBe(false);
    expect(withoutBenefit.missing).toContain('offer');

    const withoutName = isComplete({
      ...complete,
      offer: {
        items: [{ name: '  ', benefit: ['Oszczędność'], description: 'ok' }],
      },
    });
    expect(withoutName.complete).toBe(false);
    expect(withoutName.missing).toContain('offer');
  });
});
