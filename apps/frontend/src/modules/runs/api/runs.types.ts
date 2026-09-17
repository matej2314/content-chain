import {
  createRunId,
  createUserId,
  isContentKind,
  isContentLanguage,
  isContentTaskType,
  isRunId,
  isRunPlatform,
  isRunStatus,
  isRunTaskType,
  isSocialTaskType,
  isUserId,
  type ContentKind,
  type ContentLanguage,
  type ContentTaskType,
  type RunId,
  type RunPlatform,
  type RunStatus,
  type RunTaskType,
  type SocialPlatform,
  type SocialTaskType,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const LIVE_RUN_STATUSES = ['running', 'awaiting_hitl', 'interrupted'] as const;
export type LiveRunStatus = (typeof LIVE_RUN_STATUSES)[number];

export function isLiveRunStatus(status: RunStatus): status is LiveRunStatus {
  return (LIVE_RUN_STATUSES as readonly RunStatus[]).includes(status);
}

export function isTerminalRunStatus(
  status: RunStatus,
): status is 'completed' | 'failed' {
  return status === 'completed' || status === 'failed';
}

export type SocialBrief = {
  readonly topic: string;
  readonly audience?: string;
  readonly goal?: string;
  readonly ideaCount?: number;
};

export type ContentBrief = {
  readonly topic: string;
  readonly audience?: string;
  readonly goal?: string;
  readonly angle?: string;
  readonly targetLength?: number;
};

export type RunBrief = SocialBrief | ContentBrief;

export type StartedBy = {
  readonly id: UserId;
  readonly email: string;
};

export type UserRunItem = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly language: ContentLanguage;
  readonly status: RunStatus;
  readonly createdAt: string;
};

export type ArchiveRunItem = UserRunItem & {
  readonly contentKind: ContentKind | null;
  readonly startedBy: StartedBy | null;
};

export type ArchiveRunsPage = {
  readonly items: readonly ArchiveRunItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
};

export type RunLogLevel = 'info' | 'warn' | 'error';

export type RunLogItem = {
  readonly at: string;
  readonly level: RunLogLevel;
  readonly message: string;
  readonly step?: string;
};

export type RunSnapshot = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly contentKind: ContentKind | null;
  readonly language: ContentLanguage;
  readonly brief: RunBrief;
  readonly status: RunStatus;
  readonly createdAt: string;
  readonly startedBy: StartedBy | null;
};

export type StartRunInput =
  | {
      readonly taskType: SocialTaskType;
      readonly platform: SocialPlatform;
      readonly language: ContentLanguage;
      readonly brief: SocialBrief;
    }
  | {
      readonly taskType: ContentTaskType;
      readonly contentKind: ContentKind;
      readonly language: ContentLanguage;
      readonly brief: ContentBrief;
    };

export type StartRunAccepted = {
  readonly runId: RunId;
  readonly status: 'queued' | 'running';
};

function parseOptionalString(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new Error('Invalid optional string');
  return value;
}

function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new Error('Invalid optional int');
  }
  return value;
}

export function parseStartedBy(value: unknown): StartedBy | null {
  if (value === null) return null;
  if (!isRecord(value) || typeof value.id !== 'string' || !isUserId(value.id)) {
    throw new Error('Invalid startedBy');
  }
  if (typeof value.email !== 'string' || value.email.length === 0) {
    throw new Error('Invalid startedBy.email');
  }
  return { id: createUserId(value.id), email: value.email };
}

export function parseSocialBrief(value: unknown): SocialBrief {
  if (!isRecord(value) || typeof value.topic !== 'string') {
    throw new Error('Invalid SocialBrief');
  }
  if (value.angle !== undefined || value.targetLength !== undefined) {
    throw new Error('Invalid SocialBrief');
  }
  const brief: SocialBrief = { topic: value.topic };
  const audience = parseOptionalString(value.audience);
  const goal = parseOptionalString(value.goal);
  const ideaCount = parseOptionalInt(value.ideaCount);
  return {
    ...brief,
    ...(audience !== undefined ? { audience } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(ideaCount !== undefined ? { ideaCount } : {}),
  };
}

export function parseContentBrief(value: unknown): ContentBrief {
  if (!isRecord(value) || typeof value.topic !== 'string') {
    throw new Error('Invalid ContentBrief');
  }
  if (value.ideaCount !== undefined) {
    throw new Error('Invalid ContentBrief');
  }
  const audience = parseOptionalString(value.audience);
  const goal = parseOptionalString(value.goal);
  const angle = parseOptionalString(value.angle);
  const targetLength = parseOptionalInt(value.targetLength);
  return {
    topic: value.topic,
    ...(audience !== undefined ? { audience } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(angle !== undefined ? { angle } : {}),
    ...(targetLength !== undefined ? { targetLength } : {}),
  };
}

function parseBrief(taskType: RunTaskType, value: unknown): RunBrief {
  return isContentTaskType(taskType) ? parseContentBrief(value) : parseSocialBrief(value);
}

function parseRunCore(value: unknown): UserRunItem {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    typeof value.taskType !== 'string' ||
    !isRunTaskType(value.taskType) ||
    typeof value.platform !== 'string' ||
    !isRunPlatform(value.platform) ||
    typeof value.language !== 'string' ||
    !isContentLanguage(value.language) ||
    typeof value.status !== 'string' ||
    !isRunStatus(value.status) ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid run item');
  }
  return {
    runId: createRunId(value.runId),
    taskType: value.taskType,
    platform: value.platform,
    language: value.language,
    status: value.status,
    createdAt: value.createdAt,
  };
}

export function parseUserRunItem(value: unknown): UserRunItem {
  return parseRunCore(value);
}

export function parseUserRunList(value: unknown): readonly UserRunItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid user runs payload');
  }
  return value.items.map(parseUserRunItem);
}

export function parseArchiveRunItem(value: unknown): ArchiveRunItem {
  const core = parseRunCore(value);
  if (!isRecord(value)) throw new Error('Invalid archive item');
  const contentKind =
    value.contentKind === null
      ? null
      : typeof value.contentKind === 'string' && isContentKind(value.contentKind)
        ? value.contentKind
        : (() => {
            throw new Error('Invalid contentKind');
          })();
  return { ...core, contentKind, startedBy: parseStartedBy(value.startedBy) };
}

export function parseArchiveRunsPage(value: unknown): ArchiveRunsPage {
  if (
    !isRecord(value) ||
    !Array.isArray(value.items) ||
    typeof value.page !== 'number' ||
    typeof value.pageSize !== 'number' ||
    typeof value.total !== 'number'
  ) {
    throw new Error('Invalid archive payload');
  }
  return {
    items: value.items.map(parseArchiveRunItem),
    page: value.page,
    pageSize: value.pageSize,
    total: value.total,
  };
}

export function parseRunSnapshot(value: unknown): RunSnapshot {
  const core = parseRunCore(value);
  if (!isRecord(value)) throw new Error('Invalid snapshot');
  const contentKind =
    value.contentKind === null
      ? null
      : typeof value.contentKind === 'string' && isContentKind(value.contentKind)
        ? value.contentKind
        : (() => {
            throw new Error('Invalid contentKind');
          })();
  return {
    ...core,
    contentKind,
    brief: parseBrief(core.taskType, value.brief),
    startedBy: parseStartedBy(value.startedBy),
  };
}

const LOG_LEVELS = ['info', 'warn', 'error'] as const satisfies readonly RunLogLevel[];

function isRunLogLevel(value: string): value is RunLogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}

export function parseRunLogItem(value: unknown): RunLogItem {
  if (
    !isRecord(value) ||
    typeof value.at !== 'string' ||
    typeof value.level !== 'string' ||
    !isRunLogLevel(value.level) ||
    typeof value.message !== 'string'
  ) {
    throw new Error('Invalid log item');
  }
  const item: RunLogItem = {
    at: value.at,
    level: value.level,
    message: value.message,
  };
  if (value.step === undefined) return item;
  if (typeof value.step !== 'string') throw new Error('Invalid log.step');
  return { ...item, step: value.step };
}

export function parseRunLogs(value: unknown): readonly RunLogItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid logs payload');
  }
  return value.items.map(parseRunLogItem);
}

export function parseStartRunAccepted(value: unknown): StartRunAccepted {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    (value.status !== 'queued' && value.status !== 'running')
  ) {
    throw new Error('Invalid start run payload');
  }
  return { runId: createRunId(value.runId), status: value.status };
}

export function parseSseStatusData(value: unknown): { runId: RunId; status: RunStatus } {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    typeof value.status !== 'string' ||
    !isRunStatus(value.status)
  ) {
    throw new Error('Invalid SSE status');
  }
  return { runId: createRunId(value.runId), status: value.status };
}

export function omitEmptyBrief(brief: RunBrief): RunBrief {
  const topic = brief.topic.trim();
  const audience = brief.audience?.trim();
  const goal = brief.goal?.trim();
  if ('ideaCount' in brief) {
    return {
      topic,
      ...(audience ? { audience } : {}),
      ...(goal ? { goal } : {}),
      ...(brief.ideaCount !== undefined ? { ideaCount: brief.ideaCount } : {}),
    };
  }
  // Po wykluczeniu klucza ideaCount (parser Content Brief go odrzuca) odczyt angle/targetLength.
  const angle = 'angle' in brief ? brief.angle?.trim() : undefined;
  const targetLength = 'targetLength' in brief ? brief.targetLength : undefined;
  return {
    topic,
    ...(audience ? { audience } : {}),
    ...(goal ? { goal } : {}),
    ...(angle ? { angle } : {}),
    ...(targetLength !== undefined ? { targetLength } : {}),
  };
}

export function startRunBody(input: StartRunInput): Record<string, unknown> {
  // Discriminant przez klucz unii (isContentTaskType zawęża tylko taskType, nie cały input).
  if ('contentKind' in input) {
    return {
      taskType: input.taskType,
      contentKind: input.contentKind,
      language: input.language,
      brief: omitEmptyBrief(input.brief),
    };
  }
  if (!isSocialTaskType(input.taskType)) {
    throw new Error('Invalid start taskType');
  }
  return {
    taskType: input.taskType,
    platform: input.platform,
    language: input.language,
    brief: omitEmptyBrief(input.brief),
  };
}
