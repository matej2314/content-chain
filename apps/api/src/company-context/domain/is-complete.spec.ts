import { emptyCompanyContext } from './company-context.types';
import {
  collectGateItemPaths,
  isComplete,
  isCompleteOfferItem,
} from './is-complete';

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

describe('isCompleteOfferItem', () => {
  it('rejects whitespace name, empty description, empty benefit entries', () => {
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: ['Oszczędność'],
      }),
    ).toBe(true);
    expect(
      isCompleteOfferItem({
        name: '  ',
        description: 'ok',
        benefit: ['Oszczędność'],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: '  ',
        benefit: ['Oszczędność'],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: [],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: ['ok', '  '],
      }),
    ).toBe(false);
  });
});

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

  it('rejects a kaleka offer sibling, empty description, and whitespace benefit', () => {
    const noDescription = isComplete({
      ...complete,
      offer: {
        items: [{ name: 'Audyt', benefit: ['Oszczędność'], description: '' }],
      },
    });
    expect(noDescription.complete).toBe(false);
    expect(noDescription.missing).toContain('offer');

    const secondKaleka = isComplete({
      ...complete,
      offer: {
        items: [
          complete.offer.items[0],
          { name: 'Druga', benefit: ['x'], description: '' },
        ],
      },
    });
    expect(secondKaleka.complete).toBe(false);
    expect(secondKaleka.missing).toContain('offer');

    const whitespaceBenefit = isComplete({
      ...complete,
      offer: {
        items: [{ name: 'Audyt', benefit: ['  '], description: 'ok' }],
      },
    });
    expect(whitespaceBenefit.complete).toBe(false);
    expect(whitespaceBenefit.missing).toContain('offer');
  });

  it('rejects a kaleka CTA or audience sibling', () => {
    const kalekaCta = isComplete({
      ...complete,
      cta: {
        items: [
          { label: 'Napisz do nas', target: '/kontakt' },
          { label: '  ' },
        ],
      },
    });
    expect(kalekaCta.complete).toBe(false);
    expect(kalekaCta.missing).toContain('cta');

    const kalekaAudience = isComplete({
      ...complete,
      audience: {
        profiles: [{ description: 'Founder SaaS B2B' }, { description: '   ' }],
      },
    });
    expect(kalekaAudience.complete).toBe(false);
    expect(kalekaAudience.missing).toContain('audience');
  });
});

describe('collectGateItemPaths', () => {
  it('points at the kaleka offer description with a 0-based index', () => {
    expect(
      collectGateItemPaths({
        ...complete,
        offer: {
          items: [
            complete.offer.items[0],
            { name: 'Druga', benefit: ['x'], description: '' },
          ],
        },
      }),
    ).toEqual([{ path: 'offer.items.1.description' }]);
  });

  it('returns no item paths for an empty offer list', () => {
    expect(collectGateItemPaths({ ...complete, offer: { items: [] } })).toEqual(
      [],
    );
  });
});
