import type {
  ConversationId,
  RunId,
  RunStatus,
  RunTaskType,
  SocialPlatform,
  ContentLanguage,
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
  platform: SocialPlatform;
  language: ContentLanguage;
  pipelinePhase: 'ideas' | 'content' | null;
  ideasRefineCount: number;
  contentRefineCount: number;
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
