import type {
  ConversationId,
  ContentKind,
  ContentLanguage,
  RunId,
  RunPlatform,
  RunStatus,
  RunTaskType,
  UserId,
} from '@content-chain/shared';

export type RunBrief = {
  topic: string;
  audience?: string;
  goal?: string;
  ideaCount?: number;
};

export type RunRecord = {
  id: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: RunPlatform;
  contentKind: ContentKind | null;
  language: ContentLanguage;
  pipelinePhase: 'ideas' | 'content' | 'outline' | 'copy' | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  outlineRefineCount: number;
  copyRefineCount: number;
  status: RunStatus;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  startedByUserId: UserId | null;
  recoveryAttempts: number;
  createdAt: Date;
};

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
