import { companyContextExtrasInputSchema } from './company-context.schemas';

describe('companyContextExtrasInputSchema', () => {
  it('accepts known shape', () => {
    const out = companyContextExtrasInputSchema.parse({
      caseStudies: [{ title: 'Acme', summary: 'Wynik', metrics: ['+20%'] }],
      objections: [{ label: 'Cena', response: 'ROI w 3 mies.' }],
      hashtags: ['#acme'],
      catalogNotes: 'Pakiet Pro',
      performanceNotes: 'LI > IG',
    });
    expect(out?.caseStudies?.[0]?.title).toBe('Acme');
  });

  it('accepts null', () => {
    expect(companyContextExtrasInputSchema.parse(null)).toBeNull();
  });

  it('rejects unknown key', () => {
    const result = companyContextExtrasInputSchema.safeParse({
      hashtags: ['#x'],
      unknownBag: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects unknown key inside case study', () => {
    const result = companyContextExtrasInputSchema.safeParse({
      caseStudies: [{ title: 'A', summary: 'B', extra: 1 }],
    });
    expect(result.success).toBe(false);
  });
});
