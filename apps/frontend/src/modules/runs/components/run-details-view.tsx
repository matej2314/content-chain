'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
import { HitlPanel } from '@/modules/runs/components/hitl-panel';
import { RunResultView } from '@/modules/runs/components/run-result-view';
import { RunReviewPanel } from '@/modules/runs/components/run-review-panel';
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
  const [editingRunId, setEditingRunId] = useState<RunId | null>(null);

  const runId = isRunId(runIdParam) ? createRunId(runIdParam) : null;
  const runIdRef = useRef(runId);
  const hadHitlRef = useRef(false);
  const detailsEpochRef = useRef(0);

  const reloadDetails = useCallback(
    async (requestedId: RunId, isCancelled?: () => boolean): Promise<RunSnapshot | undefined> => {
      const epoch = ++detailsEpochRef.current;
      const isStale = (): boolean =>
        epoch !== detailsEpochRef.current ||
        Boolean(isCancelled?.()) ||
        runIdRef.current !== requestedId;
      try {
        const [snapshot, logs] = await Promise.all([
          fetchRunSnapshot(requestedId),
          fetchRunLogs(requestedId),
        ]);
        if (isStale()) return undefined;
        hadHitlRef.current = snapshot.hitl !== null;
        setView({ status: 'ready', snapshot, logs });
        return snapshot;
      } catch (reason: unknown) {
        if (isStale()) return undefined;
        hadHitlRef.current = false;
        setView({
          status: 'error',
          envelope: envelopeFromUnknown(reason),
          forRunId: requestedId,
        });
        return undefined;
      }
    },
    [],
  );

  useEffect(() => {
    runIdRef.current = runId;
    if (!runId) return;
    const requestedId = runId;
    let cancelled = false;
    const loadDetails = () => {
      void reloadDetails(requestedId, () => cancelled);
    };
    loadDetails();
    return () => {
      cancelled = true;
    };
  }, [reloadDetails, runId]);

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
      if (runId !== null && (status === 'awaiting_hitl' || hadHitlRef.current)) {
        void reloadDetails(runId);
      }
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
      void reloadDetails(requestedId);
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
  const editing = editingRunId === snapshot.runId;
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
      <HitlPanel
        key={snapshot.runId}
        snapshot={snapshot}
        onSubmitted={async () => {
          await reloadDetails(snapshot.runId);
          patchStatus(snapshot.runId, 'running');
          void refresh();
        }}
        onStaleStatus={async () => {
          const next = await reloadDetails(snapshot.runId);
          if (next !== undefined) {
            patchStatus(next.runId, next.status);
          }
          void refresh();
        }}
      />
      {editing ? null : <RunResultView snapshot={snapshot} />}
      {session.status === 'authenticated' ? (
        <RunReviewPanel
          snapshot={snapshot}
          userId={session.user.id}
          editing={editing}
          onEditingChange={(next) => setEditingRunId(next ? snapshot.runId : null)}
          onReload={async () => {
            await reloadDetails(snapshot.runId);
          }}
        />
      ) : null}
    </article>
  );
}
