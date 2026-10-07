import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { createRunId, type RunId, type UserId } from '@content-chain/shared';
import {
  LIVE_RUN_STATUSES,
  type GuestPurgeDeleteStats,
  type GuestPurgePort,
} from '../../domain/guest-purge.port';
import type { Prisma } from '@prisma/client';

@Injectable()
export class PrismaGuestPurgeAdapter implements GuestPurgePort {
  constructor(private readonly prisma: PrismaService) {}

  async hasLiveRuns(userId: UserId): Promise<boolean> {
    const count = await this.prisma.run.count({
      where: {
        startedByUserId: userId,
        status: { in: [...LIVE_RUN_STATUSES] },
      },
    });
    return count > 0;
  }

  async listLiveRunIds(userId: UserId): Promise<RunId[]> {
    const runIds = await this.prisma.run.findMany({
      where: {
        startedByUserId: userId,
        status: { in: [...LIVE_RUN_STATUSES] },
      },
      select: { id: true },
    });
    return runIds.map((run) => createRunId(run.id));
  }

  async deleteRunTree(
    userId: UserId,
    tx: Prisma.TransactionClient,
  ): Promise<GuestPurgeDeleteStats> {
    const runs = await tx.run.findMany({
      where: { startedByUserId: userId },
      select: { id: true },
    });
    const runIds = runs.map((run) => createRunId(run.id));
    if (runIds.length === 0) {
      return { runIds: [], deletedRuns: 0 };
    }
    await tx.runLog.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialIdea.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialContent.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialReelIdea.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialReelScript.deleteMany({ where: { runId: { in: runIds } } });
    await tx.contentOutline.deleteMany({ where: { runId: { in: runIds } } });
    await tx.contentDocument.deleteMany({ where: { runId: { in: runIds } } });

    const deleted = await tx.run.deleteMany({
      where: { startedByUserId: userId },
    });
    return { runIds, deletedRuns: deleted.count };
  }
}
