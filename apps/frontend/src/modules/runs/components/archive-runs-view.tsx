'use client';

import { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import {
  RUN_PLATFORMS,
  RUN_TASK_TYPES,
  createUserId,
  isRunPlatform,
  isRunTaskType,
  isUserId,
  type RunPlatform,
  type RunTaskType,
  type UserId,
} from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { NativeSelect } from '@/shared/ui/native-select';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';
import {
  fetchArchiveRuns,
  fetchInitiatorOptions,
  type InitiatorOption,
} from '@/modules/runs/api/runs.api';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { StartAgentDialog } from '@/modules/runs/components/start-agent-dialog';
import type { ArchiveRunsPage } from '@/modules/runs/api/runs.types';

const REFRESH_MS = 15 * 60 * 1000;

type StatusFilter = 'all' | 'completed' | 'failed' | 'cancelled';

type ArchiveQueryState = {
  page: number;
  statusFilter: StatusFilter;
  taskType: RunTaskType | '';
  platform: RunPlatform | '';
  userId: UserId | '';
};

type ArchiveQueryAction =
  | { type: 'setPage'; page: number }
  | { type: 'setStatusFilter'; statusFilter: StatusFilter }
  | { type: 'setTaskType'; taskType: RunTaskType | '' }
  | { type: 'setPlatform'; platform: RunPlatform | '' }
  | { type: 'setUserId'; userId: UserId | '' };

const INITIAL_ARCHIVE_QUERY: ArchiveQueryState = {
  page: 1,
  statusFilter: 'all',
  taskType: '',
  platform: '',
  userId: '',
};

function archiveQueryReducer(
  state: ArchiveQueryState,
  action: ArchiveQueryAction,
): ArchiveQueryState {
  switch (action.type) {
    case 'setPage':
      return { ...state, page: action.page };
    case 'setStatusFilter':
      return { ...state, statusFilter: action.statusFilter, page: 1 };
    case 'setTaskType':
      return { ...state, taskType: action.taskType, page: 1 };
    case 'setPlatform':
      return { ...state, platform: action.platform, page: 1 };
    case 'setUserId':
      return { ...state, userId: action.userId, page: 1 };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

type InitiatorsState = {
  options: readonly InitiatorOption[];
  error: { code: string; message: string } | null;
};

const INITIAL_INITIATORS: InitiatorsState = {
  options: [],
  error: null,
};

type ArchiveListState = {
  data: ArchiveRunsPage | null;
  error: { code: string; message: string } | null;
  loading: boolean;
};

const INITIAL_ARCHIVE_LIST: ArchiveListState = {
  data: null,
  error: null,
  loading: true,
};

export function ArchiveRunsView() {
  const { state: session } = useSession();
  const guestLocked = useGuestLocked();
  const isAdmin = session.status === 'authenticated' && session.user.role === 'admin';
  const [query, dispatchQuery] = useReducer(archiveQueryReducer, INITIAL_ARCHIVE_QUERY);
  const [initiators, setInitiators] = useState<InitiatorsState>(INITIAL_INITIATORS);
  const [list, setList] = useState<ArchiveListState>(INITIAL_ARCHIVE_LIST);

  const { page, statusFilter, taskType, platform, userId } = query;
  const { data: result, error, loading } = list;
  const visibleInitiators = isAdmin ? initiators : INITIAL_INITIATORS;

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    void fetchInitiatorOptions()
      .then((options) => {
        if (!cancelled) {
          setInitiators({ options, error: null });
        }
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        if (reason instanceof ApiError && reason.status === 403) {
          setInitiators(INITIAL_INITIATORS);
          return;
        }
        if (reason instanceof ApiError) {
          setInitiators({
            options: [],
            error: { code: reason.envelope.code, message: reason.envelope.message },
          });
          return;
        }
        setInitiators({
          options: [],
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Nie udało się odczytać odpowiedzi.',
          },
        });
      });
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  useEffect(() => {
    let cancelled = false;
    async function load(): Promise<void> {
      setList((current) => ({ ...current, loading: true, error: null }));
      try {
        const data = await fetchArchiveRuns({
          page,
          status:
            statusFilter === 'all'
              ? (['completed', 'failed', 'cancelled'] as const)
              : ([statusFilter] as const),
          ...(taskType === '' ? {} : { taskType }),
          ...(platform === '' ? {} : { platform }),
          ...(userId === '' ? {} : { userId }),
        });
        if (!cancelled) {
          setList({ data, error: null, loading: false });
        }
      } catch (reason: unknown) {
        if (cancelled) return;
        const nextError =
          reason instanceof ApiError
            ? { code: reason.envelope.code, message: reason.envelope.message }
            : { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };
        setList({ data: null, error: nextError, loading: false });
      }
    }
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [page, platform, statusFilter, taskType, userId]);

  const totalPages = result ? Math.max(1, Math.ceil(result.total / result.pageSize)) : 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Runy</h1>
          <p className="text-sm text-muted-foreground">
            Archiwum zakończonych, nieudanych i anulowanych runów instancji.
          </p>
        </div>
        <StartAgentDialog />
      </div>
      <div className="flex flex-wrap gap-3">
        <FormField label="Status" htmlFor="archive-status" className="min-w-36 flex-1 sm:flex-none">
          <NativeSelect
            id="archive-status"
            value={statusFilter}
            onChange={(event) => {
              const value = event.target.value;
              if (
                value === 'all' ||
                value === 'completed' ||
                value === 'failed' ||
                value === 'cancelled'
              ) {
                dispatchQuery({ type: 'setStatusFilter', statusFilter: value });
              }
            }}
          >
            <option value="all">Wszystkie</option>
            <option value="completed">Zakończone</option>
            <option value="failed">Nieudane</option>
            <option value="cancelled">Anulowane</option>
          </NativeSelect>
        </FormField>
        <FormField label="Typ" htmlFor="archive-task" className="min-w-36 flex-1 sm:flex-none">
          <NativeSelect
            id="archive-task"
            value={taskType}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                dispatchQuery({ type: 'setTaskType', taskType: '' });
                return;
              }
              if (isRunTaskType(value)) {
                dispatchQuery({ type: 'setTaskType', taskType: value });
              }
            }}
          >
            <option value="">Wszystkie</option>
            {RUN_TASK_TYPES.map((item) => (
              <option key={item} value={item}>
                {RUN_TASK_TYPE_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        <FormField label="Platforma" htmlFor="archive-platform" className="min-w-36 flex-1 sm:flex-none">
          <NativeSelect
            id="archive-platform"
            value={platform}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                dispatchQuery({ type: 'setPlatform', platform: '' });
                return;
              }
              if (isRunPlatform(value)) {
                dispatchQuery({ type: 'setPlatform', platform: value });
              }
            }}
          >
            <option value="">Wszystkie</option>
            {RUN_PLATFORMS.map((item) => (
              <option key={item} value={item}>
                {RUN_PLATFORM_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        {isAdmin && visibleInitiators.options.length > 0 ? (
          <FormField label="Inicjator" htmlFor="archive-user" className="min-w-36 flex-1 sm:flex-none">
            <NativeSelect
              id="archive-user"
              value={userId}
              onChange={(event) => {
                const value = event.target.value;
                if (value === '') {
                  dispatchQuery({ type: 'setUserId', userId: '' });
                  return;
                }
                if (isUserId(value)) {
                  dispatchQuery({ type: 'setUserId', userId: createUserId(value) });
                }
              }}
            >
              <option value="">Wszyscy</option>
              {visibleInitiators.options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.email}
                </option>
              ))}
            </NativeSelect>
          </FormField>
        ) : null}
      </div>
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {visibleInitiators.error ? (
        <EnvelopeError
          code={visibleInitiators.error.code}
          message={visibleInitiators.error.message}
        />
      ) : null}
      {loading && result === null ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : null}
      {result && result.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Brak runów w archiwum dla tych filtrów.</p>
      ) : null}
      {result && result.items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Typ</th>
                <th className="py-2 pr-3 font-medium">Platforma</th>
                <th className="py-2 pr-3 font-medium">Rodzaj</th>
                <th className="py-2 pr-3 font-medium">Język</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Utworzono</th>
                <th className="py-2 font-medium">Inicjator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {result.items.map((item) => (
                <tr key={item.runId}>
                  <td className="py-2 pr-3">
                    {guestLocked &&
                      (session.status !== 'authenticated' ||
                        item.startedBy === null ||
                        item.startedBy.id !== session.user.id) ? (
                      <span>{RUN_TASK_TYPE_LABELS[item.taskType]}</span>
                    ) : (
                      <Link
                        href={`/runs/${item.runId}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {RUN_TASK_TYPE_LABELS[item.taskType]}
                      </Link>
                    )}
                  </td>
                  <td className="py-2 pr-3">{RUN_PLATFORM_LABELS[item.platform]}</td>
                  <td className="py-2 pr-3">
                    {item.contentKind ? CONTENT_KIND_LABELS[item.contentKind] : 'brak'}
                  </td>
                  <td className="py-2 pr-3">{LANGUAGE_LABELS[item.language]}</td>
                  <td className="py-2 pr-3">
                    <RunStatusView status={item.status} compact />
                  </td>
                  <td className="py-2 pr-3">
                    <IsoDateTime iso={item.createdAt} />
                  </td>
                  <td className="py-2">{item.startedBy?.email ?? 'brak'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {result ? (
        <div className="flex items-center gap-2 text-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => dispatchQuery({ type: 'setPage', page: Math.max(1, page - 1) })}
          >
            Poprzednia
          </Button>
          <p className="tabular-nums text-muted-foreground">
            {result.page} / {totalPages} ({result.total})
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => dispatchQuery({ type: 'setPage', page: page + 1 })}
          >
            Następna
          </Button>
        </div>
      ) : null}
    </div>
  );
}
