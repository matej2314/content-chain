import { computeReviewExpiresAt, isReviewWindowOpen } from './review-window';

const ANCHOR = new Date('2026-09-30T10:00:00.000Z');
const TTL_2H = 2 * 60 * 60 * 1000;

describe('review-window', () => {
  it('is open before deadline when not finalized', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        null,
        new Date('2026-09-30T11:59:59.000Z'),
        TTL_2H,
      ),
    ).toBe(true);
  });

  it('is closed at/after deadline without finalize', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        null,
        new Date('2026-09-30T12:00:00.000Z'),
        TTL_2H,
      ),
    ).toBe(false);
  });

  it('is closed when finalized even before deadline', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        new Date('2026-09-30T10:30:00.000Z'),
        new Date('2026-09-30T10:31:00.000Z'),
        TTL_2H,
      ),
    ).toBe(false);
  });

  it('computeReviewExpiresAt null when finalized or missing anchor', () => {
    expect(computeReviewExpiresAt(null, null, TTL_2H)).toBeNull();
    expect(
      computeReviewExpiresAt(
        ANCHOR,
        new Date('2026-09-30T10:05:00.000Z'),
        TTL_2H,
      ),
    ).toBeNull();
  });

  it('computeReviewExpiresAt returns ISO after TTL window start+ttl', () => {
    expect(computeReviewExpiresAt(ANCHOR, null, TTL_2H)).toBe(
      '2026-09-30T12:00:00.000Z',
    );
  });
});
