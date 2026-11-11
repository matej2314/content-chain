import { isComplete } from '../company-context/domain/is-complete';
import {
  companyContextFixtureSchema,
  loadCompanyContextFixture,
} from './load-company-context-fixture';

describe('loadCompanyContextFixture', () => {
  it('loads Mostek fixture that passes the write gate', () => {
    const context = loadCompanyContextFixture();
    expect(context.identity.name).toBe('Mostek');
    expect(isComplete(context)).toEqual({ complete: true, missing: [] });
    expect(companyContextFixtureSchema.safeParse(context).success).toBe(true);
  });

  it('rejects unknown extras keys (strict)', () => {
    const result = companyContextFixtureSchema.safeParse({
      identity: { name: 'X', description: 'Y' },
      offer: {
        items: [{ name: 'A', benefit: ['b'], description: 'd' }],
      },
      voice: { weDo: 'a', weDont: 'b' },
      cta: { items: [{ label: 'L' }] },
      audience: { profiles: [{ name: 'P', description: 'D' }] },
      extras: { unknownBag: true },
    });
    expect(result.success).toBe(false);
  });
});
