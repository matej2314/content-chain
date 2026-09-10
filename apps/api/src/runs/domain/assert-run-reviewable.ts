import { DomainException } from '../../shared/exceptions/domain.exception';
import type { UserId } from '@content-chain/shared';
import type { RunSnapshot } from './run.port';

export function assertRunReviewable(
  run: RunSnapshot | null,
  actorId: UserId,
): asserts run is RunSnapshot {
  if (!run) {
    throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
  }
  if (run.status !== 'completed' && run.status !== 'failed') {
    throw new DomainException(
      'RUN_NOT_REVIEWABLE',
      'Run is not in a reviewable state',
      409,
    );
  }
  if (run.startedByUserId !== actorId) {
    throw new DomainException('FORBIDDEN', 'Access denied', 403);
  }
  if (run.reviewFinalizedAt !== null) {
    throw new DomainException(
      'REVIEW_LOCKED',
      'Review is already finalized',
      409,
    );
  }
}
