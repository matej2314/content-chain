import { emptyCompanyContext } from './company-context.types';
import { mergeCompanyContext } from './merge-company-context';

const current = {
  ...emptyCompanyContext(),
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Czas'],
        description: 'Przegląd.',
      },
    ],
  },
  extras: { hashtags: ['#old'] },
};

describe('mergeCompanyContext', () => {
  it('merges identity fields and keeps offer when omitted', () => {
    const merged = mergeCompanyContext(current, {
      identity: { name: 'Nowa' },
    });
    expect(merged.identity).toEqual({
      name: 'Nowa',
      description: 'Robimy X.',
    });
    expect(merged.offer).toEqual(current.offer);
  });

  it('keeps identity.description when the patch sets it to undefined', () => {
    const merged = mergeCompanyContext(current, {
      identity: { name: 'Nowa', description: undefined },
    });
    expect(merged.identity).toEqual({
      name: 'Nowa',
      description: 'Robimy X.',
    });
  });

  it('replaces extras with null when the patch sets null', () => {
    expect(mergeCompanyContext(current, { extras: null }).extras).toBeNull();
  });

  it('keeps extras when the patch omits extras', () => {
    expect(
      mergeCompanyContext(current, { identity: { name: 'X' } }).extras,
    ).toEqual({ hashtags: ['#old'] });
  });
});
