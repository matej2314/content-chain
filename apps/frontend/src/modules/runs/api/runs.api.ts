import {
  createUserId,
  isUserId,
  type RunId,
  type RunPlatform,
  type RunTaskType,
  type UserId,
} from '@content-chain/shared';
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseArchiveRunsPage,
  parseRunLogs,
  parseRunSnapshot,
  parseStartRunAccepted,
  parseUserRunList,
  startRunBody,
  type ArchiveRunsPage,
  type RunLogItem,
  type RunSnapshot,
  type StartRunAccepted,
  type StartRunInput,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';

export async function fetchUserRuns(userId: UserId): Promise<readonly UserRunItem[]> {
  const body = await apiFetch(`/runs/user/${userId}`);
  return parseUserRunList(body);
}

export async function fetchRunSnapshot(runId: RunId): Promise<RunSnapshot> {
  const body = await apiFetch(`/runs/${runId}`);
  return parseRunSnapshot(body);
}

export async function fetchRunLogs(runId: RunId): Promise<readonly RunLogItem[]> {
  const body = await apiFetch(`/runs/${runId}/logs`);
  return parseRunLogs(body);
}

export async function startRun(input: StartRunInput): Promise<StartRunAccepted> {
  const body = await apiFetch('/runs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(startRunBody(input)),
  });
  return parseStartRunAccepted(body);
}

export type ArchiveRunsQuery = {
  readonly page: number;
  readonly status: readonly ('completed' | 'failed')[];
  readonly taskType?: RunTaskType;
  readonly platform?: RunPlatform;
  readonly userId?: UserId;
};

export async function fetchArchiveRuns(query: ArchiveRunsQuery): Promise<ArchiveRunsPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('status', query.status.join(','));
  if (query.taskType) params.set('taskType', query.taskType);
  if (query.platform) params.set('platform', query.platform);
  if (query.userId) params.set('userId', query.userId);
  const body = await apiFetch(`/runs?${params.toString()}`);
  return parseArchiveRunsPage(body);
}

export type InitiatorOption = {
  readonly id: UserId;
  readonly email: string;
};

export async function fetchInitiatorOptions(): Promise<readonly InitiatorOption[]> {
  const body = await apiFetch('/users');
  if (!isRecord(body) || !Array.isArray(body.items)) {
    throw new Error('Invalid users payload');
  }
  return body.items.map((item) => {
    if (!isRecord(item) || typeof item.id !== 'string' || !isUserId(item.id)) {
      throw new Error('Invalid user item');
    }
    if (typeof item.email !== 'string' || item.email.length === 0) {
      throw new Error('Invalid user email');
    }
    return { id: createUserId(item.id), email: item.email };
  });
}
