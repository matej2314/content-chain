'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { RunId, RunStatus } from '@content-chain/shared';
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchUserRuns } from '@/modules/runs/api/runs.api';
import {
  isLiveRunStatus,
  type SseTerminalRunStatus,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
import { notifyRunTerminal } from '@/modules/notifications/notify-product';
import { useViewingRunId } from '@/modules/notifications/use-viewing-run-id';

const CANCEL_GRACE_MS = 200;

type OwnRunsState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly items: readonly UserRunItem[] };

type OwnRunsContextValue = {
  readonly state: OwnRunsState;
  readonly inProgress: readonly UserRunItem[];
  readonly boxItems: readonly UserRunItem[];
  readonly refresh: () => Promise<void>;
  readonly patchStatus: (runId: RunId, status: RunStatus) => void;
};

const OwnRunsContext = createContext<OwnRunsContextValue | null>(null);
const FALLBACK: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

function LiveItemSubscription({
  runId,
  onStatus,
  onTerminal,
}: {
  readonly runId: RunId;
  readonly onStatus: (runId: RunId, status: RunStatus) => void;
  readonly onTerminal: (runId: RunId, status: SseTerminalRunStatus) => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
    onTerminal: (status) => {
      onTerminal(runId, status);
    },
  });
  return null;
}

export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const viewingRunId = useViewingRunId();
  const [state, setState] = useState<OwnRunsState>({ status: 'loading' });
  const [cancelGrace, setCancelGrace] = useState<readonly UserRunItem[]>([]);
  const requestIdRef = useRef(0);
  const itemsSnapshotRef = useRef<readonly UserRunItem[]>([]);
  const graceTimersRef = useRef<Map<RunId, number>>(new Map());

  if (state.status === 'ready') {
    itemsSnapshotRef.current = state.items;
  }

  const refresh = useCallback(async () => {
    if (!userId) return;
    const requestId = ++requestIdRef.current;
    try {
      const items = await fetchUserRuns(userId);
      if (requestId !== requestIdRef.current) return;
      setState({ status: 'ready', items });
    } catch (reason: unknown) {
      if (requestId !== requestIdRef.current) return;
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK });
    }
  }, [userId]);

  useEffect(() => {
    async function load(): Promise<void> {
      await refresh();
    }
    void load();
  }, [refresh]);

  useEffect(() => {
    function onFocus(): void {
      void refresh();
    }
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  useEffect(() => {
    const timers = graceTimersRef.current;
    return () => {
      for (const timer of timers.values()) {
        window.clearTimeout(timer);
      }
      timers.clear();
    };
  }, []);

  const scheduleGraceRemoval = useCallback((runId: RunId) => {
    const existing = graceTimersRef.current.get(runId);
    if (existing !== undefined) {
      window.clearTimeout(existing);
    }
    const timer = window.setTimeout(() => {
      graceTimersRef.current.delete(runId);
      setCancelGrace((current) => current.filter((item) => item.runId !== runId));
    }, CANCEL_GRACE_MS);
    graceTimersRef.current.set(runId, timer);
  }, []);

  const enqueueCancelGrace = useCallback(
    (runId: RunId) => {
      const found = itemsSnapshotRef.current.find((item) => item.runId === runId);
      if (!found) return;
      const cancelledItem: UserRunItem = { ...found, status: 'cancelled' };
      setCancelGrace((current) => [
        ...current.filter((item) => item.runId !== runId),
        cancelledItem,
      ]);
      scheduleGraceRemoval(runId);
    },
    [scheduleGraceRemoval],
  );

  const patchStatus = useCallback(
    (runId: RunId, status: RunStatus) => {
      if (status === 'cancelled') {
        enqueueCancelGrace(runId);
      }
      setState((current) => {
        if (current.status !== 'ready') return current;
        return {
          status: 'ready',
          items: current.items.map((item) => (item.runId === runId ? { ...item, status } : item)),
        };
      });
    },
    [enqueueCancelGrace],
  );

  const inProgress = useMemo(() => {
    if (state.status !== 'ready') return [];
    return state.items.filter((item) => isLiveRunStatus(item.status));
  }, [state]);

  const boxItems = useMemo(() => {
    const graceIds = new Set(cancelGrace.map((item) => item.runId));
    const liveWithoutGrace = inProgress.filter((item) => !graceIds.has(item.runId));
    return [...liveWithoutGrace, ...cancelGrace];
  }, [cancelGrace, inProgress]);

  const value = useMemo(
    () => ({ state, inProgress, boxItems, refresh, patchStatus }),
    [boxItems, inProgress, patchStatus, refresh, state],
  );

  return (
    <OwnRunsContext.Provider value={value}>
      {inProgress.map((item) => (
        <LiveItemSubscription
          key={item.runId}
          runId={item.runId}
          onStatus={patchStatus}
          onTerminal={(terminalRunId, status) => {
            if (status === 'cancelled') {
              enqueueCancelGrace(terminalRunId);
            }
            notifyRunTerminal({
              runId: terminalRunId,
              outcome: status,
              viewingRunId,
            });
            void refresh();
          }}
        />
      ))}
      {children}
    </OwnRunsContext.Provider>
  );
}

export function useOwnRuns(): OwnRunsContextValue {
  const value = useContext(OwnRunsContext);
  if (!value) {
    throw new Error('useOwnRuns must be used within OwnRunsProvider');
  }
  return value;
}
