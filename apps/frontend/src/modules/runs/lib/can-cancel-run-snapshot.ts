import { isCancelableRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';
import type { UserId, UserRole } from '@content-chain/shared';

type CancelSnapshotSlice = Pick<RunSnapshot, 'status' | 'startedBy'>;

export function canCancelRunSnapshot(args: {
  readonly snapshot: CancelSnapshotSlice;
  readonly sessionUserId: UserId;
  readonly sessionRole: UserRole;
}): boolean {
  if (!isCancelableRunStatus(args.snapshot.status)) {
    return false;
  }
  const startedBy = args.snapshot.startedBy;
  if (startedBy === null) return false;
  if (startedBy.id === args.sessionUserId) return true;
  return args.sessionRole === 'admin' && startedBy.role === 'guest';
}
