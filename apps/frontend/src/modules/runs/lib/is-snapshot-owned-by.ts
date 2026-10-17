import type { UserId } from '@content-chain/shared';

type StartedBySlice = {
  readonly startedBy: { readonly id: UserId } | null;
};

/** True gdy `startedBy.id` === zalogowany użytkownik (cudzy / brak inicjatora → false). */
export function isSnapshotOwnedBy(
  snapshot: StartedBySlice,
  userId: UserId,
): boolean {
  return snapshot.startedBy !== null && snapshot.startedBy.id === userId;
}
