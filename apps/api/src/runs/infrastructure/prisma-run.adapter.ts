import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  createConversationId,
  createRunId,
  createUserId,
  isContentKind,
  isRunPlatform,
  isRunTaskType,
  isUserId,
  type ContentLanguage,
  type RunId,
  type RunStatus,
} from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { assertTransition } from '../domain/status-transitions';
import { toInputJson } from '../../shared/persistence/to-input-json';
import {
  PAGE_SIZE,
  type ListRunsQuery,
  type ListRunsResult,
  type RunRepository,
  type RunSnapshot,
} from '../domain/run.port';
import type { RunLogEntry, RunRecord } from '../domain/run.types';

type RunRow = {
  id: string;
  conversationId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  brief: unknown;
  selectedIdeaIds: unknown;
  startedByUserId: string | null;
  contentKind: string | null;
  pipelinePhase: string | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  outlineRefineCount: number;
  copyRefineCount: number;
  recoveryAttempts: number;
  createdAt: Date;
  startedBy: { id: string; email: string } | null;
};

type RunLogRow = {
  runId: string;
  conversationId: string | null;
  at: Date;
  level: string;
  message: string;
  step: string | null;
  requestId: string | null;
};

function toPipelinePhase(value: string | null): RunRecord['pipelinePhase'] {
  if (
    value === 'ideas' ||
    value === 'content' ||
    value === 'outline' ||
    value === 'copy'
  ) {
    return value;
  }
  return null;
}

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
      where: { status: 'interrupted' },
      orderBy: { createdAt: 'asc' },
    });
    if (!next) return null;
    assertTransition(next.status as RunStatus, 'running');
    const claimed = await this.prisma.run.updateMany({
      where: { id: next.id, status: 'interrupted' },
      data: { status: 'running' },
    });
    if (claimed.count !== 1) {
      return this.claimNextInterrupted();
    }
    return this.toSnapshot({ ...next, status: 'running', startedBy: null });
  }

  async findInterruptedRunning(): Promise<RunRecord[]> {
    const rows = await this.prisma.run.findMany({
      where: { status: 'running' },
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
      ...(query.status ? { status: query.status } : {}),
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

  async saveRecoveryAttempt(id: RunId, attempts: number): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { recoveryAttempts: attempts },
    });
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
    if (!isRunTaskType(row.taskType)) {
      throw new Error(`Run.taskType is not a RunTaskType: ${row.taskType}`);
    }
    if (!isRunPlatform(row.platform)) {
      throw new Error(`Run.platform is not a RunPlatform: ${row.platform}`);
    }
    const contentKind =
      row.contentKind == null || row.contentKind === ''
        ? null
        : isContentKind(row.contentKind)
          ? row.contentKind
          : (() => {
              throw new Error(
                `Run.contentKind is not a ContentKind: ${row.contentKind}`,
              );
            })();

    return {
      id: createRunId(row.id),
      conversationId: createConversationId(row.conversationId),
      taskType: row.taskType,
      platform: row.platform,
      language: row.language as ContentLanguage,
      status: row.status as RunStatus,
      brief: row.brief as RunRecord['brief'],
      selectedIdeaIds: (row.selectedIdeaIds as string[] | null) ?? null,
      startedByUserId:
        row.startedByUserId && isUserId(row.startedByUserId)
          ? createUserId(row.startedByUserId)
          : null,
      contentKind,
      pipelinePhase: toPipelinePhase(row.pipelinePhase),
      ideasRefineCount: row.ideasRefineCount,
      contentRefineCount: row.contentRefineCount,
      outlineRefineCount: row.outlineRefineCount,
      copyRefineCount: row.copyRefineCount,
      recoveryAttempts: row.recoveryAttempts,
      createdAt: row.createdAt,
      startedBy: row.startedBy,
    };
  }
}
