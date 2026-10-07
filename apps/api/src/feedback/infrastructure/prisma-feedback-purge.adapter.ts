import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { UserId } from '@content-chain/shared';
import type { FeedbackPurgePort } from '../domain/feedback-purge.port';

@Injectable()
export class PrismaFeedbackPurgeAdapter implements FeedbackPurgePort {
  async deleteForGuest(
    guestUserId: UserId,
    runIds: readonly string[],
    tx: Prisma.TransactionClient,
  ): Promise<number> {
    const result = await tx.feedback.deleteMany({
      where: {
        OR: [
          { authorId: guestUserId },
          ...(runIds.length > 0 ? [{ runId: { in: [...runIds] } }] : []),
        ],
      },
    });
    return result.count;
  }
}
