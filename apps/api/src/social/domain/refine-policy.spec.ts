import { MAX_REFINE, canRefine, nextRefineCount } from './refine-policy';

describe('refine-policy', () => {
  it('allows two refine attempts then blocks', () => {
    expect(canRefine(0)).toBe(true);
    expect(nextRefineCount(0)).toBe(1);
    expect(nextRefineCount(1)).toBe(2);
    expect(canRefine(MAX_REFINE)).toBe(false);
    expect(() => nextRefineCount(MAX_REFINE)).toThrow('REFINE_EXHAUSTED');
  });
});
