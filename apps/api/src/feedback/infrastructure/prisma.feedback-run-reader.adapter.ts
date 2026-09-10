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
    if (!row.startedByUserId || !isUserId(row.startedByUserId)) {
      return { kind: 'found', startedBy: null, status: row.status };
    }
    return {
      kind: 'found',
      startedBy: createUserId(row.startedByUserId),
      status: row.status,
    };
  }
}
