import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  createUserId,
  isRunStatus,
  isUserId,
  type RunId,
} from '@content-chain/shared';
import type {
  FeedbackRunLookup,
  FeedbackRunReader,
} from '../domain/feedback-run.reader.port';

@Injectable()
export class PrismaFeedbackRunReaderAdapter implements FeedbackRunReader {
  constructor(private readonly prisma: PrismaService) {}

  async getStartedBy(runId: RunId): Promise<FeedbackRunLookup> {
    const row = await this.prisma.run.findUnique({
      where: { id: runId },
      select: { startedByUserId: true, status: true },
    });
    if (!row) return { kind: 'missing' };
    if (!isRunStatus(row.status)) {
      throw new Error(`Run.status is not a RunStatus: ${row.status}`);
    }

    const hasResult = await this.hasAnyRunResult(runId);
    const startedBy =
      row.startedByUserId && isUserId(row.startedByUserId)
        ? createUserId(row.startedByUserId)
        : null;

    return { kind: 'found', startedBy, status: row.status, hasResult };
  }

  /** Fbk-3a: any persisted result row for the run (without assembling a Runs snapshot). */
  private async hasAnyRunResult(runId: RunId): Promise<boolean> {
    const counts = await Promise.all([
      this.prisma.socialIdea.count({ where: { runId } }),
      this.prisma.socialContent.count({ where: { runId } }),
      this.prisma.socialReelIdea.count({ where: { runId } }),
      this.prisma.socialReelScript.count({ where: { runId } }),
      this.prisma.contentOutline.count({ where: { runId } }),
      this.prisma.contentDocument.count({ where: { runId } }),
    ]);
    return counts.some((n) => n > 0);
  }
}
