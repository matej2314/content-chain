import type { RunSnapshot } from '../domain/run.port';

export type RunRow = {
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
  userRating: number | null;
  cancelRequested: boolean;
  cancelledAt: Date | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
  pipelineFinishedAt: Date | null;
  createdAt: Date;
  startedBy: { id: string; email: string } | null;
};

export type RunLogRow = {
  runId: string;
  conversationId: string | null;
  at: Date;
  level: string;
  message: string;
  step: string | null;
  requestId: string | null;
};

export type RunReviewFields = Pick<
  RunSnapshot,
  | 'startedBy'
  | 'userRating'
  | 'outputEdited'
  | 'reviewFinalizedAt'
  | 'pipelineFinishedAt'
  | 'cancelledAt'
>;
