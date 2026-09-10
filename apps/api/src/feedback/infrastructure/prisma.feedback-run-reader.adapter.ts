import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, isUserId, type RunId } from '@content-chain/shared';
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
      select: { startedByUserId: true },
    });
    if (!row) return { kind: 'missing' };
    if (!row.startedByUserId || !isUserId(row.startedByUserId)) {
      return { kind: 'found', startedBy: null };
    }
    return { kind: 'found', startedBy: createUserId(row.startedByUserId) };
  }
}
