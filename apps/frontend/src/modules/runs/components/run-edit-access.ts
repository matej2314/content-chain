import type { UserId } from '@content-chain/shared';
import { canEditResult } from '@/modules/runs/api/result-edit-payload';
import { isTerminalRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';

export function canEditSnapshot(snapshot: RunSnapshot, userId: UserId): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isTerminalRunStatus(snapshot.status) &&
    snapshot.reviewFinalizedAt === null &&
    canEditResult(snapshot.taskType, snapshot.result)
  );
}
