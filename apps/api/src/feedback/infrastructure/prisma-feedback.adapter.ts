import { Injectable } from '@nestjs/common';
import { PrismaService } from '@content-chain/runs-kernel';
import type {
  FeedbackEntry,
  FeedbackRepository,
} from '../domain/feedback.types';

@Injectable()
export class PrismaFeedbackAdapter implements FeedbackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(entry: FeedbackEntry): Promise<void> {
    await this.prisma.feedback.create({
      data: {
        id: entry.id,
        targetType: entry.targetType,
        agentKey: entry.agentKey,
        runId: entry.runId,
        body: entry.body,
        authorId: entry.authorId,
        createdAt: entry.createdAt,
      },
    });
  }
}
