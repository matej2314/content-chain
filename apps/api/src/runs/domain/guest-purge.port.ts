import type { Prisma } from '@prisma/client';
import type { RunId, UserId } from '@content-chain/shared';

export const GUEST_PURGE = Symbol('GUEST_PURGE');

export type GuestPurgeDeleteStats = {
  readonly runIds: readonly string[];
  readonly deletedRuns: number;
};

export interface GuestPurgePort {
  hasLiveRuns(userId: UserId): Promise<boolean>;
  listLiveRunIds(userId: UserId): Promise<RunId[]>;
  deleteRunTree(
    userId: UserId,
    tx: Prisma.TransactionClient,
  ): Promise<GuestPurgeDeleteStats>;
}

export const LIVE_RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
] as const;

