import { normalizeAudienceProfilesFromJson } from './normalize-audience-profiles-from-json';

describe('normalizeAudienceProfilesFromJson', () => {
  it('maps legacy profiles without name to empty name', () => {
    expect(normalizeAudienceProfilesFromJson([{ description: 'Founder SaaS' }])).toEqual([
      { name: '', description: 'Founder SaaS' },
    ]);
  });

  it('keeps valid name and description', () => {
    expect(
      normalizeAudienceProfilesFromJson([
        { name: 'Founder SaaS', description: 'B2B founders' },
      ]),
    ).toEqual([{ name: 'Founder SaaS', description: 'B2B founders' }]);
  });

  it('coerces null / non-string name and description to empty string', () => {
    expect(
      normalizeAudienceProfilesFromJson([
        { name: null, description: 'x' },
        { name: 'A', description: 1 },
        { name: undefined, description: undefined },
      ]),
    ).toEqual([
      { name: '', description: 'x' },
      { name: 'A', description: '' },
      { name: '', description: '' },
    ]);
  });

  it('returns empty array for non-array JSON', () => {
    expect(normalizeAudienceProfilesFromJson(null)).toEqual([]);
    expect(normalizeAudienceProfilesFromJson({ profiles: [] })).toEqual([]);
    expect(normalizeAudienceProfilesFromJson('oops')).toEqual([]);
  });

  it('skips non-object elements', () => {
    expect(
      normalizeAudienceProfilesFromJson([
        'skip',
        null,
        42,
        { name: 'Keep', description: 'ok' },
        [{ name: 'nested' }],
      ]),
    ).toEqual([{ name: 'Keep', description: 'ok' }]);
  });
});
