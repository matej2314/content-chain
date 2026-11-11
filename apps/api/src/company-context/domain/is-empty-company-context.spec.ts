import { emptyCompanyContext } from './company-context.types';
import { isEmptyCompanyContext } from './is-empty-company-context';

describe('isEmptyCompanyContext', () => {
  it('returns true for emptyCompanyContext()', () => {
    expect(isEmptyCompanyContext(emptyCompanyContext())).toBe(true);
  });

  it('returns false when any gate field is filled', () => {
    const context = emptyCompanyContext();
    context.identity.name = 'Mostek';
    expect(isEmptyCompanyContext(context)).toBe(false);
  });

  it('returns false when extras is a non-null object', () => {
    const context = emptyCompanyContext();
    context.extras = { hashtags: ['mostek'] };
    expect(isEmptyCompanyContext(context)).toBe(false);
  });
});
