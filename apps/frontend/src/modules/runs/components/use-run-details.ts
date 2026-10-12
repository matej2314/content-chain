'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { RunId, RunStatus } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchRunLogs, fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import { isLiveRunStatus, type RunLogItem, type RunSnapshot } from '@/modules/runs/api/runs.types';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';

export type RunDetailsState =
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

export type UseRunDetailsResult = {
  readonly view: RunDetailsState;
  readonly reloadDetails: (requestedId: RunId) => Promise<RunSnapshot | undefined>;
  readonly applySnapshot: (next: RunSnapshot) => void;
  readonly patchStatus: (runId: RunId, status: RunStatus) => void;
  readonly refresh: () => Promise<void>;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function runLogKey(item: RunLogItem): string {
  return `${item.at}|${item.level}|${item.message}|${item.step ?? ''}`;
}

function envelopeFromUnknown(reason: unknown): { code: string; message: string } {
  if (reason instanceof ApiError) return reason.envelope;
  return FALLBACK;
}

export function useRunDetails(runId: RunId | null): UseRunDetailsResult {
  const { state: session } = useSession();
  const { patchStatus, refresh } = useOwnRuns();
  const [view, setView] = useState<RunDetailsState>({ status: 'loading' });

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
    async function load(): Promise<void> {
      await reloadDetails(requestedId, () => cancelled);
    }
    void load();
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
        if (current.logs.some((existing) => runLogKey(existing) === runLogKey(item))) {
          return current;
        }
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

  const applySnapshot = useCallback((next: RunSnapshot): void => {
    setView((current) => {
      if (current.status !== 'ready') return current;
      if (current.snapshot.runId !== next.runId) return current;
      return { ...current, snapshot: next };
    });
  }, []);

  return {
    view,
    reloadDetails,
    applySnapshot,
    patchStatus,
    refresh,
  };
}
