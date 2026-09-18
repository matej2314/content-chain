import { DomainException } from '../../shared/exceptions/domain.exception';
import { emptyCompanyContext } from './company-context.types';
import { assertCompanyContextWritable } from './assert-company-context-writable';

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

describe('assertCompanyContextWritable', () => {
  it('passes for a complete gate including extras null', () => {
    expect(() =>
      assertCompanyContextWritable({ ...complete, extras: null }),
    ).not.toThrow();
  });

  it('throws 400 VALIDATION_FAILED with section and offer path', () => {
    try {
      assertCompanyContextWritable({
        ...complete,
        offer: {
          items: [
            complete.offer.items[0],
            { name: 'Druga', benefit: ['x'], description: '' },
          ],
        },
      });
      fail('expected DomainException');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect(error).toMatchObject({
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
      });
      expect((error as DomainException).details).toEqual(
        expect.arrayContaining([
          { section: 'offer' },
          { path: 'offer.items.1.description' },
        ]),
      );
    }
  });

  it('throws for empty context without item paths', () => {
    try {
      assertCompanyContextWritable(emptyCompanyContext());
      fail('expected DomainException');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect((error as DomainException).code).not.toBe('CONTEXT_INCOMPLETE');
      expect((error as DomainException).httpStatus).toBe(400);
      expect((error as DomainException).details).toEqual([
        { section: 'identity' },
        { section: 'offer' },
        { section: 'voice' },
        { section: 'cta' },
        { section: 'audience' },
      ]);
    }
  });
});
