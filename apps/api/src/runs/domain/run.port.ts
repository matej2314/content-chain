import type {
  ContentLanguage,
  RunPlatform,
  RunTaskType,
} from '@content-chain/shared';
import type { RunId, RunStatus, UserId } from '@content-chain/shared';
import type { RunLogEntry, RunRecord } from './run.types';

export const RUN_REPOSITORY = Symbol('RUN_REPOSITORY');

export const PAGE_SIZE = 10;

export type ListRunsQuery = {
  page: number;
  status?: RunStatus;
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};

export type RunStartedBy = { id: string; email: string };

export type RunSnapshot = RunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
};

export type LightRunItem = {
  runId: RunId;
  taskType: RunTaskType;
  platform: RunPlatform;
  language: ContentLanguage;
  status: RunStatus;
  createdAt: Date;
};

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

export interface RunRepository {
  create(run: RunRecord): Promise<void>;
  getById(id: RunId): Promise<RunSnapshot | null>;
  saveStatus(id: RunId, status: RunStatus): Promise<void>;
  saveRecoveryAttempt(id: RunId, attempts: number): Promise<void>;
  claimNextQueued(): Promise<RunRecord | null>;
  claimNextInterrupted(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
  appendLog(entry: RunLogEntry): Promise<RunLogEntry>;
  listLogs(id: RunId): Promise<RunLogEntry[]>;
  list(query: ListRunsQuery): Promise<ListRunsResult>;
  saveSelectedIdeaIds(id: RunId, selectedIdeaIds: string[]): Promise<void>;
  listByUser(userId: UserId): Promise<LightRunItem[]>;
  saveRating(id: RunId, rating: number | null): Promise<boolean>;
  saveOutputEdited(id: RunId): Promise<boolean>;
  saveFinalizedAt(id: RunId, at: Date): Promise<boolean>;
}
