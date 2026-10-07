import type { Prisma } from '@prisma/client';
import type { UserId } from '@content-chain/shared';

export const FEEDBACK_PURGE = Symbol('FEEDBACK_PURGE');

export interface FeedbackPurgePort {
  deleteForGuest(
    guestUserId: UserId,
    runIds: readonly string[],
    tx: Prisma.TransactionClient,
  ): Promise<number>;
}
