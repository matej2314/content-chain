import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { makeSocialRun } from '../run-record.test-helpers';
import { assertRunReviewable } from './assert-run-reviewable';
import type { RunSnapshot } from './run.port';

const ACTOR = createUserId('usr_11111111-1111-4111-8111-111111111111');
const OTHER = createUserId('usr_22222222-2222-4222-8222-222222222222');

function snapshot(overrides: Partial<RunSnapshot> = {}): RunSnapshot {
  return {
    ...makeSocialRun({
      status: 'completed',
      startedByUserId: ACTOR,
    }),
    startedBy: { id: ACTOR, email: 'user@example.com' },
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    ...overrides,
  };
}

function expectDomain(
  fn: () => void,
  code: string,
  httpStatus: number,
): void {
  try {
    fn();
    fail('expected DomainException');
  } catch (error) {
    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({ code, httpStatus });
  }
}

describe('assertRunReviewable', () => {
  it('passes for own completed run with open review', () => {
    expect(() => assertRunReviewable(snapshot(), ACTOR)).not.toThrow();
  });

  it('passes for own failed run with open review', () => {
    expect(() =>
      assertRunReviewable(snapshot({ status: 'failed' }), ACTOR),
    ).not.toThrow();
  });

  it('throws 404 RUN_NOT_FOUND when run is missing', () => {
    expectDomain(() => assertRunReviewable(null, ACTOR), 'RUN_NOT_FOUND', 404);
  });

  it.each(['queued', 'running', 'awaiting_hitl', 'interrupted'] as const)(
    'throws 409 RUN_NOT_REVIEWABLE for status %s',
    (status) => {
      expectDomain(
        () => assertRunReviewable(snapshot({ status }), ACTOR),
        'RUN_NOT_REVIEWABLE',
        409,
      );
    },
  );

  it('throws 403 FORBIDDEN when actor is not startedBy', () => {
    expectDomain(() => assertRunReviewable(snapshot(), OTHER), 'FORBIDDEN', 403);
  });

  it('throws 403 FORBIDDEN when startedByUserId is null', () => {
    expectDomain(
      () =>
        assertRunReviewable(
          snapshot({ startedByUserId: null, startedBy: null }),
          ACTOR,
        ),
      'FORBIDDEN',
      403,
    );
  });

  it('throws 409 REVIEW_LOCKED when review is finalized', () => {
    expectDomain(
      () =>
        assertRunReviewable(
          snapshot({
            reviewFinalizedAt: new Date('2026-09-10T12:00:00.000Z'),
          }),
          ACTOR,
        ),
      'REVIEW_LOCKED',
      409,
    );
  });
});
