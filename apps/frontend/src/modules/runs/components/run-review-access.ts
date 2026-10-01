import type { UserId } from '@content-chain/shared';
import { isReviewableRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';
import { isReviewWindowOpen } from './run-review-window';

export function canReviewSnapshot(
  snapshot: RunSnapshot,
  userId: UserId,
  nowMs: number = Date.now(),
): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isReviewableRunStatus(snapshot.status) &&
    isReviewWindowOpen(snapshot, nowMs)
  );
}
