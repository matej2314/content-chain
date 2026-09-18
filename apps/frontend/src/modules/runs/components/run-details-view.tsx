'use client';

import { useEffect, useRef, useState } from 'react';
import { createRunId, isRunId, type RunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchRunLogs, fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import { isLiveRunStatus, type RunLogItem, type RunSnapshot } from '@/modules/runs/api/runs.types';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';

type DetailsState =
  | { readonly status: 'loading' }
  | {
    readonly status: 'error';
    readonly envelope: { code: string; message: string };
    readonly forRunId: RunId;
  }
  | {
    readonly status: 'ready';
    readonly snapshot: RunSnapshot;
    readonly logs: readonly RunLogItem[];
  };

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function logKey(item: RunLogItem): string {
  return `${item.at}|${item.level}|${item.message}|${item.step ?? ''}`;
}

function envelopeFromUnknown(reason: unknown): { code: string; message: string } {
  if (reason instanceof ApiError) return reason.envelope;
  return FALLBACK;
}

export function RunDetailsView({ runIdParam }: { readonly runIdParam: string }) {
  const { state: session } = useSession();
  const { patchStatus, refresh } = useOwnRuns();
  const [view, setView] = useState<DetailsState>({ status: 'loading' });

  const runId = isRunId(runIdParam) ? createRunId(runIdParam) : null;
  const runIdRef = useRef(runId);

  useEffect(() => {
    runIdRef.current = runId;
    if (!runId) return;
    const requestedId = runId;
    let cancelled = false;
    void Promise.all([fetchRunSnapshot(requestedId), fetchRunLogs(requestedId)])
      .then(([snapshot, logs]) => {
        if (cancelled || runIdRef.current !== requestedId) return;
        setView({ status: 'ready', snapshot, logs });
      })
      .catch((reason: unknown) => {
        if (cancelled || runIdRef.current !== requestedId) return;
        setView({
          status: 'error',
          envelope: envelopeFromUnknown(reason),
          forRunId: requestedId,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [runId]);

  const own =
    view.status === 'ready' &&
    session.status === 'authenticated' &&
    view.snapshot.startedBy !== null &&
    view.snapshot.startedBy.id === session.user.id;
  const live =
    view.status === 'ready' &&
    own &&
    runId !== null &&
    view.snapshot.runId === runId &&
    isLiveRunStatus(view.snapshot.status);

  useRunEventSource(runId, live, {
    onStatus: (status) => {
      setView((current) => {
        if (current.status !== 'ready') return current;
        if (runId === null || current.snapshot.runId !== runId) return current;
        return { ...current, snapshot: { ...current.snapshot, status } };
      });
      if (runId) patchStatus(runId, status);
    },
    onLog: (item) => {
      setView((current) => {
        if (current.status !== 'ready') return current;
        if (runId === null || current.snapshot.runId !== runId) return current;
        if (current.logs.some((existing) => logKey(existing) === logKey(item))) return current;
        return { ...current, logs: [...current.logs, item] };
      });
    },
    onTerminal: () => {
      const requestedId = runId;
      if (!requestedId) return;
      void Promise.all([fetchRunSnapshot(requestedId), fetchRunLogs(requestedId)])
        .then(([snapshot, logs]) => {
          if (runIdRef.current !== requestedId) return;
          setView({ status: 'ready', snapshot, logs });
        })
        .catch((reason: unknown) => {
          if (runIdRef.current !== requestedId) return;
          setView({
            status: 'error',
            envelope: envelopeFromUnknown(reason),
            forRunId: requestedId,
          });
        });
      void refresh();
    },
  });

  if (runId === null) {
    return <EnvelopeError code="VALIDATION_FAILED" message="Invalid runId" />;
  }

  const waitingForSnapshot =
    view.status === 'loading' ||
    (view.status === 'ready' && view.snapshot.runId !== runId) ||
    (view.status === 'error' && view.forRunId !== runId);

  if (waitingForSnapshot) {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (view.status === 'error') {
    return <EnvelopeError code={view.envelope.code} message={view.envelope.message} />;
  }

  const { snapshot, logs } = view;
  return (
    <article className="flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{RUN_TASK_TYPE_LABELS[snapshot.taskType]}</h1>
        <p className="text-sm text-muted-foreground">
          {RUN_PLATFORM_LABELS[snapshot.platform]}
          {snapshot.contentKind ? ` · ${CONTENT_KIND_LABELS[snapshot.contentKind]}` : ''}
          {` · ${LANGUAGE_LABELS[snapshot.language]}`}
          {snapshot.startedBy ? ` · ${snapshot.startedBy.email}` : ''}
          <span className="ml-2">
            <IsoDateTime iso={snapshot.createdAt} />
          </span>
        </p>
        <RunStatusView status={snapshot.status} />
      </header>
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Logi</h2>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak wpisów logu.</p>
        ) : (
          <ol className="divide-y divide-border text-sm">
            {logs.map((item) => (
              <li key={logKey(item)} className="flex flex-col gap-0.5 py-2">
                <p className="text-muted-foreground">
                  <IsoDateTime iso={item.at} kind="log" />
                  {item.step ? ` · ${item.step}` : ''}
                  {` · ${item.level}`}
                </p>
                <p>{item.message}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
      <div data-slot="run-hitl" />
      <div data-slot="run-result" />
      <div data-slot="run-review" />
    </article>
  );
}
