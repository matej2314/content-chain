import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  createConversationId,
  createRunId,
  isContentKind,
  isContentTaskType,
  isSocialPlatform,
  isSocialTaskType,
  UserId,
  type RunId,
  type RunStatus,
} from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { assertTransition } from '../domain/status-transitions';
import { toInputJson } from '../../shared/persistence/to-input-json';
import {
  LightRunItem,
  PAGE_SIZE,
  type ListRunsQuery,
  type ListRunsResult,
  type RunRepository,
  type RunSnapshot,
} from '../domain/run.port';
import {
  contentBriefSchema,
  socialBriefSchema,
} from '../application/run.schemas';
import { CANCELABLE_RUN_STATUSES } from '../domain/status-transitions';
import { toRunSnapshotBase } from './to-run-snapshot-base';
import type {
  ContentRunRecord,
  RunLogEntry,
  RunRecord,
  SocialRunRecord,
} from '../domain/run.types';
import type {
  RunLogRow,
  RunRow,
  RunReviewFields,
} from './prisma-run-row.types';
import { toLightRunItem } from './to-light-run-item';

@Injectable()
export class PrismaRunAdapter implements RunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(run: RunRecord): Promise<void> {
    await this.prisma.run.create({
      data: {
        id: run.id,
        conversationId: run.conversationId,
        taskType: run.taskType,
        platform: run.platform,
        language: run.language,
        status: run.status,
        brief: toInputJson(run.brief),
        selectedIdeaIds:
          run.selectedIdeaIds == null
            ? undefined
            : toInputJson(run.selectedIdeaIds),
        startedByUserId: run.startedByUserId,
        contentKind: run.contentKind,
        pipelinePhase: run.pipelinePhase,
        ideasRefineCount: run.ideasRefineCount,
        contentRefineCount: run.contentRefineCount,
        outlineRefineCount: run.outlineRefineCount,
        copyRefineCount: run.copyRefineCount,
        recoveryAttempts: run.recoveryAttempts,
        createdAt: run.createdAt,
      },
    });
  }

  async getById(id: RunId): Promise<RunSnapshot | null> {
    const row = await this.prisma.run.findUnique({
      where: { id },
      include: { startedBy: { select: { id: true, email: true } } },
    });
    return row ? this.toSnapshot(row) : null;
  }

  async saveStatus(id: RunId, status: RunStatus): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { status },
    });
  }

  async claimNextQueued(): Promise<RunRecord | null> {
    const next = await this.prisma.run.findFirst({
      where: { status: 'queued' },
      orderBy: { createdAt: 'asc' },
    });
    if (!next) return null;
    assertTransition(next.status as RunStatus, 'running');
    const claimed = await this.prisma.run.updateMany({
      where: { id: next.id, status: 'queued' },
      data: { status: 'running' },
    });
    if (claimed.count !== 1) {
      return this.claimNextQueued();
    }
    return this.toSnapshot({ ...next, status: 'running', startedBy: null });
  }

  async claimNextInterrupted(): Promise<RunRecord | null> {
    const next = await this.prisma.run.findFirst({
      where: { status: 'interrupted', cancelRequested: false },
      orderBy: { createdAt: 'asc' },
    });
    if (!next) return null;
    assertTransition(next.status as RunStatus, 'running');
    const claimed = await this.prisma.run.updateMany({
      where: {
        id: next.id,
        status: 'interrupted',
        cancelRequested: false,
      },
      data: { status: 'running' },
    });
    if (claimed.count !== 1) {
      return this.claimNextInterrupted();
    }
    return this.toSnapshot({ ...next, status: 'running', startedBy: null });
  }

  async findInterruptedRunning(): Promise<RunRecord[]> {
    const rows = await this.prisma.run.findMany({
      where: { status: 'running', cancelRequested: false },
    });
    return rows.map((row) => this.toSnapshot({ ...row, startedBy: null }));
  }

  async findCancelRequestedLeftovers(): Promise<RunRecord[]> {
    const rows = await this.prisma.run.findMany({
      where: {
        cancelRequested: true,
        status: { in: ['running', 'interrupted'] },
      },
    });
    return rows.map((row) => this.toSnapshot({ ...row, startedBy: null }));
  }

  async appendLog(entry: RunLogEntry): Promise<RunLogEntry> {
    const saved = await this.prisma.runLog.create({
      data: {
        id: `log_${uuidv4()}`,
        runId: entry.runId,
        conversationId: entry.conversationId,
        at: entry.at,
        level: entry.level,
        message: entry.message,
        step: entry.step,
        requestId: entry.requestId,
      },
    });
    return this.toLog(saved);
  }

  async listLogs(id: RunId): Promise<RunLogEntry[]> {
    const rows = await this.prisma.runLog.findMany({
      where: { runId: id },
      orderBy: { at: 'asc' },
    });
    return rows.map((row) => this.toLog(row));
  }

  async list(query: ListRunsQuery): Promise<ListRunsResult> {
    const page = query.page ?? 1;
    const where = {
      ...(query.status && query.status.length > 0
        ? { status: { in: query.status } }
        : {}),
      ...(query.taskType ? { taskType: query.taskType } : {}),
      ...(query.platform ? { platform: query.platform } : {}),
      ...(query.userId ? { startedByUserId: query.userId } : {}),
    };
    const [total, rows] = await this.prisma.$transaction([
      this.prisma.run.count({ where }),
      this.prisma.run.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { startedBy: { select: { id: true, email: true } } },
      }),
    ]);
    return {
      items: rows.map((row) => this.toSnapshot(row)),
      page,
      pageSize: PAGE_SIZE,
      total,
    };
  }

  async saveSelectedIdeaIds(
    id: RunId,
    selectedIdeaIds: string[],
  ): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { selectedIdeaIds: toInputJson(selectedIdeaIds) },
    });
  }

  async listByUser(userId: UserId): Promise<LightRunItem[]> {
    const rows = await this.prisma.run.findMany({
      where: { startedByUserId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        taskType: true,
        platform: true,
        language: true,
        status: true,
        createdAt: true,
      },
    });
    return rows.map((row) => toLightRunItem(row));
  }

  async saveRating(id: RunId, rating: number | null): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { userRating: rating },
    });
    return result.count === 1;
  }

  async saveOutputEdited(id: RunId): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { outputEdited: true },
    });
    return result.count === 1;
  }

  async saveFinalizedAt(id: RunId, at: Date): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { reviewFinalizedAt: at },
    });
    return result.count === 1;
  }

  async saveRecoveryAttempt(id: RunId, attempts: number): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { recoveryAttempts: attempts },
    });
  }

  async setCancelRequested(id: RunId): Promise<void> {
    await this.prisma.run.updateMany({
      where: {
        id,
        status: { in: [...CANCELABLE_RUN_STATUSES] },
      },
      data: { cancelRequested: true },
    });
  }

  async finalizeExpiredReviews(
    now: Date,
    reviewTtlMs: number,
  ): Promise<number> {
    const cutoff = new Date(now.getTime() - reviewTtlMs);
    const rows = await this.prisma.run.findMany({
      where: {
        reviewFinalizedAt: null,
        pipelineFinishedAt: { not: null, lte: cutoff },
      },
      select: { id: true, pipelineFinishedAt: true },
    });
    let locked = 0;
    for (const row of rows) {
      if (row.pipelineFinishedAt === null) continue;
      const finalizedAt = new Date(
        row.pipelineFinishedAt.getTime() + reviewTtlMs,
      );
      const result = await this.prisma.run.updateMany({
        where: { id: row.id, reviewFinalizedAt: null },
        data: { reviewFinalizedAt: finalizedAt },
      });
      locked += result.count;
    }
    return locked;
  }

  async countByUserAndType(
    userId: UserId,
    taskType: RunRecord['taskType'],
  ): Promise<number> {
    return this.prisma.run.count({
      where: { startedByUserId: userId, taskType },
    });
  }

  async setPipelineFinishedAt(id: RunId, at: Date): Promise<void> {
    await this.prisma.run.updateMany({
      where: { id, pipelineFinishedAt: null },
      data: { pipelineFinishedAt: at },
    });
  }

  async attemptCancel(id: RunId, cancelledAt: Date): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: {
        id,
        status: { in: [...CANCELABLE_RUN_STATUSES] },
      },
      data: {
        status: 'cancelled',
        cancelledAt,
        cancelRequested: false,
      },
    });
    return result.count === 1;
  }

  private toLog(saved: RunLogRow): RunLogEntry {
    return {
      runId: createRunId(saved.runId),
      conversationId: saved.conversationId
        ? createConversationId(saved.conversationId)
        : null,
      at: saved.at,
      level: saved.level as RunLogEntry['level'],
      message: saved.message,
      step: saved.step ?? undefined,
      requestId: saved.requestId ?? undefined,
    };
  }

  private toSnapshot(row: RunRow): RunSnapshot {
    const base = toRunSnapshotBase(row);

    if (isSocialTaskType(row.taskType)) {
      if (!isSocialPlatform(row.platform)) {
        throw new Error(
          `Run.platform is not a SocialPlatform: ${row.platform}`,
        );
      }
      const briefParsed = socialBriefSchema.safeParse(row.brief);
      if (!briefParsed.success) {
        throw new Error(`Run.brief is not a SocialBrief: ${row.taskType}`);
      }
      const snapshot: SocialRunRecord & RunReviewFields = {
        ...base,
        taskType: row.taskType,
        platform: row.platform,
        contentKind: null,
        brief: briefParsed.data,
        cancelledAt: row.cancelledAt,
      };
      return snapshot;
    }

    if (isContentTaskType(row.taskType)) {
      if (row.platform !== 'web') {
        throw new Error(
          `Run.platform is not web for content task: ${row.platform}`,
        );
      }
      if (row.contentKind == null || !isContentKind(row.contentKind)) {
        throw new Error(
          `Run.contentKind is not a ContentKind: ${row.contentKind}`,
        );
      }
      const briefParsed = contentBriefSchema.safeParse(row.brief);
      if (!briefParsed.success) {
        throw new Error(`Run.brief is not a ContentBrief: ${row.taskType}`);
      }
      const snapshot: ContentRunRecord & RunReviewFields = {
        ...base,
        taskType: row.taskType,
        platform: 'web',
        contentKind: row.contentKind,
        brief: briefParsed.data,
        cancelledAt: row.cancelledAt,
      };
      return snapshot;
    }

    throw new Error(
      `Run.taskType is not a RunTaskType: ${String(row.taskType)}`,
    );
  }
}
