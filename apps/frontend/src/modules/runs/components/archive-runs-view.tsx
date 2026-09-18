'use client';

import { useEffect, useState } from 'react';
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
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
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
import type { ArchiveRunsPage } from '@/modules/runs/api/runs.types';

const REFRESH_MS = 15 * 60 * 1000;

type StatusFilter = 'both' | 'completed' | 'failed';

export function ArchiveRunsView() {
  const { state: session } = useSession();
  const isAdmin = session.status === 'authenticated' && session.user.role === 'admin';
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('both');
  const [taskType, setTaskType] = useState<RunTaskType | ''>('');
  const [platform, setPlatform] = useState<RunPlatform | ''>('');
  const [userId, setUserId] = useState<UserId | ''>('');
  const [initiators, setInitiators] = useState<readonly InitiatorOption[]>([]);
  const [initiatorsError, setInitiatorsError] = useState<{
    code: string;
    message: string;
  } | null>(null);
  const [result, setResult] = useState<ArchiveRunsPage | null>(null);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      setInitiators([]);
      setInitiatorsError(null);
      return;
    }
    void fetchInitiatorOptions()
      .then((options) => {
        setInitiators(options);
        setInitiatorsError(null);
      })
      .catch((reason: unknown) => {
        setInitiators([]);
        if (reason instanceof ApiError && reason.status === 403) {
          setInitiatorsError(null);
          return;
        }
        if (reason instanceof ApiError) {
          setInitiatorsError({ code: reason.envelope.code, message: reason.envelope.message });
          return;
        }
        setInitiatorsError({
          code: 'INTERNAL_ERROR',
          message: 'Nie udało się odczytać odpowiedzi.',
        });
      });
  }, [isAdmin]);

  useEffect(() => {
    let cancelled = false;
    async function load(): Promise<void> {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArchiveRuns({
          page,
          status: statusFilter === 'both' ? ['completed', 'failed'] : [statusFilter],
          ...(taskType === '' ? {} : { taskType }),
          ...(platform === '' ? {} : { platform }),
          ...(userId === '' ? {} : { userId }),
        });
        if (!cancelled) setResult(data);
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setError({ code: reason.envelope.code, message: reason.envelope.message });
        } else {
          setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
        }
        setResult(null);
      } finally {
        if (!cancelled) setLoading(false);
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
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium">Runy</h1>
        <p className="text-sm text-muted-foreground">
          Archiwum zakończonych i nieudanych runów instancji. Start jest na Koncie.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <FormField label="Status" htmlFor="archive-status">
          <NativeSelect
            id="archive-status"
            value={statusFilter}
            onChange={(event) => {
              const value = event.target.value;
              if (value === 'both' || value === 'completed' || value === 'failed') {
                setStatusFilter(value);
                setPage(1);
              }
            }}
          >
            <option value="both">Zakończone i nieudane</option>
            <option value="completed">Zakończone</option>
            <option value="failed">Nieudane</option>
          </NativeSelect>
        </FormField>
        <FormField label="Typ" htmlFor="archive-task">
          <NativeSelect
            id="archive-task"
            value={taskType}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                setTaskType('');
                setPage(1);
                return;
              }
              if (isRunTaskType(value)) {
                setTaskType(value);
                setPage(1);
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
        <FormField label="Platforma" htmlFor="archive-platform">
          <NativeSelect
            id="archive-platform"
            value={platform}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                setPlatform('');
                setPage(1);
                return;
              }
              if (isRunPlatform(value)) {
                setPlatform(value);
                setPage(1);
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
        {isAdmin && initiators.length > 0 ? (
          <FormField label="Inicjator" htmlFor="archive-user">
            <NativeSelect
              id="archive-user"
              value={userId}
              onChange={(event) => {
                const value = event.target.value;
                if (value === '') {
                  setUserId('');
                  setPage(1);
                  return;
                }
                if (isUserId(value)) {
                  setUserId(createUserId(value));
                  setPage(1);
                }
              }}
            >
              <option value="">Wszyscy</option>
              {initiators.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.email}
                </option>
              ))}
            </NativeSelect>
          </FormField>
        ) : null}
      </div>
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {initiatorsError ? (
        <EnvelopeError code={initiatorsError.code} message={initiatorsError.message} />
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
                    <Link
                      href={`/runs/${item.runId}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {RUN_TASK_TYPE_LABELS[item.taskType]}
                    </Link>
                  </td>
                  <td className="py-2 pr-3">{RUN_PLATFORM_LABELS[item.platform]}</td>
                  <td className="py-2 pr-3">
                    {item.contentKind ? CONTENT_KIND_LABELS[item.contentKind] : 'brak'}
                  </td>
                  <td className="py-2 pr-3">{LANGUAGE_LABELS[item.language]}</td>
                  <td className="py-2 pr-3">
                    <RunStatusView status={item.status} compact />
                  </td>
                  <td className="py-2 pr-3 font-mono text-xs tabular-nums">{item.createdAt}</td>
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
            onClick={() => setPage((current) => Math.max(1, current - 1))}
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
            onClick={() => setPage((current) => current + 1)}
          >
            Następna
          </Button>
        </div>
      ) : null}
    </div>
  );
}
