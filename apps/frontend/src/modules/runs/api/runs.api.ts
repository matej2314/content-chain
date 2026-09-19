import { type RunId, type RunPlatform, type RunTaskType, type UserId } from '@content-chain/shared';
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
import {
  parseHitlAccepted,
  type HitlAccepted,
  type UserRating,
} from '@/modules/runs/api/runs-result.types';
import { fetchUsers } from '@/modules/users/api/users.api';

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
  const items = await fetchUsers();
  return items.map((item) => ({ id: item.id, email: item.email }));
}

export async function submitHitl(
  runId: RunId,
  selectedIdeaIds: readonly string[],
): Promise<HitlAccepted> {
  const body = await apiFetch(`/runs/${runId}/hitl`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ selectedIdeaIds: [...selectedIdeaIds] }),
  });
  return parseHitlAccepted(body);
}

function isUserRating(value: number): value is UserRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export async function patchRunRating(
  runId: RunId,
  rating: UserRating | null,
): Promise<{ readonly userRating: UserRating | null }> {
  const body = await apiFetch(`/runs/${runId}/rating`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  if (!isRecord(body)) {
    throw new Error('Invalid rating payload');
  }
  if (body.userRating === null) {
    return { userRating: null };
  }
  if (typeof body.userRating !== 'number' || !isUserRating(body.userRating)) {
    throw new Error('Invalid userRating');
  }
  return { userRating: body.userRating };
}

export async function saveOutputEdited(
  runId: RunId,
  payload: { readonly result: Record<string, unknown> },
): Promise<void> {
  const body = await apiFetch(`/runs/${runId}/output-edited`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!isRecord(body) || body.outputEdited !== true) {
    throw new Error('Invalid output-edited payload');
  }
}

export async function finalizeRunReview(
  runId: RunId,
): Promise<{ readonly reviewFinalizedAt: string }> {
  const body = await apiFetch(`/runs/${runId}/finalize-review`, {
    method: 'POST',
  });
  if (!isRecord(body) || typeof body.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid finalize payload');
  }
  return { reviewFinalizedAt: body.reviewFinalizedAt };
}
