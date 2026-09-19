import type { UserId } from '@content-chain/shared';
import { isTerminalRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';

export function canReviewSnapshot(snapshot: RunSnapshot, userId: UserId): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isTerminalRunStatus(snapshot.status) &&
    snapshot.reviewFinalizedAt === null
  );
}
