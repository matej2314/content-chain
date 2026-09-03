import {
  isSocialTaskType,
  type ConversationId,
  type ContentKind,
  type ContentLanguage,
  type ContentTaskType,
  type RunId,
  type RunStatus,
  type SocialPlatform,
  type SocialTaskType,
  type UserId,
  isContentTaskType,
} from '@content-chain/shared';

export type SocialBrief = {
  topic: string;
  audience?: string;
  goal?: string;
  ideaCount?: number;
};

export type ContentBrief = {
  topic: string;
  audience?: string;
  goal?: string;
  angle?: string;
  targetLength?: number;
};

export type RunRecordBase = {
  id: RunId;
  conversationId: ConversationId;
  language: ContentLanguage;
  pipelinePhase: 'ideas' | 'content' | 'outline' | 'copy' | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  outlineRefineCount: number;
  copyRefineCount: number;
  status: RunStatus;
  selectedIdeaIds: string[] | null;
  startedByUserId: UserId | null;
  recoveryAttempts: number;
  createdAt: Date;
};

export type SocialRunRecord = RunRecordBase & {
  taskType: SocialTaskType;
  platform: SocialPlatform;
  contentKind: null;
  brief: SocialBrief;
};

export type ContentRunRecord = RunRecordBase & {
  taskType: ContentTaskType;
  platform: 'web';
  contentKind: ContentKind;
  brief: ContentBrief;
};

export type RunRecord = SocialRunRecord | ContentRunRecord;

export function isSocialRunRecord(run: RunRecord): run is SocialRunRecord {
  return isSocialTaskType(run.taskType);
}

export function isContentRunRecord(run: RunRecord): run is ContentRunRecord {
  return isContentTaskType(run.taskType);
}

export type RunLogLevel = 'info' | 'warn' | 'error';

export type RunLogEntry = {
  runId: RunId;
  conversationId: ConversationId | null;
  at: Date;
  level: RunLogLevel;
  message: string;
  step?: string;
  requestId?: string;
};
