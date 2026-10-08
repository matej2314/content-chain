import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  makeSocialSnapshot,
  type SocialRunSnapshot,
} from '../run-record.test-helpers';
import { assertRunReviewable } from './assert-run-reviewable';

const ACTOR = createUserId('usr_11111111-1111-4111-8111-111111111111');
const OTHER = createUserId('usr_22222222-2222-4222-8222-222222222222');

const NOW = new Date('2026-09-30T11:00:00.000Z');
const ANCHOR_OPEN = new Date('2026-09-30T10:00:00.000Z');
const ANCHOR_EXPIRED = new Date('2026-09-30T08:00:00.000Z');
const TTL_2H = 2 * 60 * 60 * 1000;

const OPEN_WINDOW = { now: NOW, reviewTtlMs: TTL_2H };

function snapshot(
  overrides: Partial<SocialRunSnapshot> = {},
): SocialRunSnapshot {
  return makeSocialSnapshot({
    status: 'completed',
    startedByUserId: ACTOR,
    startedBy: { id: ACTOR, email: 'user@example.com', role: 'user' },
    pipelineFinishedAt: ANCHOR_OPEN,
    ...overrides,
  });
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
    expect(() =>
      assertRunReviewable(snapshot(), ACTOR, OPEN_WINDOW),
    ).not.toThrow();
  });

  it('passes for own failed run with open review', () => {
    expect(() =>
      assertRunReviewable(
        snapshot({ status: 'failed' }),
        ACTOR,
        OPEN_WINDOW,
      ),
    ).not.toThrow();
  });

  it('throws 404 RUN_NOT_FOUND when run is missing', () => {
    expectDomain(
      () => assertRunReviewable(null, ACTOR, OPEN_WINDOW),
      'RUN_NOT_FOUND',
      404,
    );
  });

  it.each([
    'queued',
    'running',
    'awaiting_hitl',
    'interrupted',
    'cancelled',
  ] as const)('throws 409 RUN_NOT_REVIEWABLE for status %s', (status) => {
    expectDomain(
      () => assertRunReviewable(snapshot({ status }), ACTOR, OPEN_WINDOW),
      'RUN_NOT_REVIEWABLE',
      409,
    );
  });

  it('throws 403 FORBIDDEN when actor is not startedBy', () => {
    expectDomain(
      () => assertRunReviewable(snapshot(), OTHER, OPEN_WINDOW),
      'FORBIDDEN',
      403,
    );
  });

  it('throws 403 FORBIDDEN when startedByUserId is null', () => {
    expectDomain(
      () =>
        assertRunReviewable(
          snapshot({ startedByUserId: null, startedBy: null }),
          ACTOR,
          OPEN_WINDOW,
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
            reviewFinalizedAt: new Date('2026-09-30T10:30:00.000Z'),
          }),
          ACTOR,
          OPEN_WINDOW,
        ),
      'REVIEW_LOCKED',
      409,
    );
  });

  it('throws 409 REVIEW_LOCKED after TTL with reviewFinalizedAt null', () => {
    expectDomain(
      () =>
        assertRunReviewable(
          snapshot({
            pipelineFinishedAt: ANCHOR_EXPIRED,
            reviewFinalizedAt: null,
          }),
          ACTOR,
          OPEN_WINDOW,
        ),
      'REVIEW_LOCKED',
      409,
    );
  });

  it('throws 409 REVIEW_LOCKED when pipelineFinishedAt is missing', () => {
    expectDomain(
      () =>
        assertRunReviewable(
          snapshot({ pipelineFinishedAt: null }),
          ACTOR,
          OPEN_WINDOW,
        ),
      'REVIEW_LOCKED',
      409,
    );
  });
});
