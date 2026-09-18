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
import { isLiveRunStatus, type UserRunItem } from '@/modules/runs/api/runs.types';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';

type OwnRunsState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly items: readonly UserRunItem[] };

type OwnRunsContextValue = {
  readonly state: OwnRunsState;
  readonly inProgress: readonly UserRunItem[];
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
  readonly onTerminal: () => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
    onTerminal: () => {
      onTerminal();
    }
  });
  return null;
}

export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const [state, setState] = useState<OwnRunsState>({ status: 'loading' });
  const requestIdRef = useRef(0);

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

  const patchStatus = useCallback((runId: RunId, status: RunStatus) => {
    setState((current) => {
      if (current.status !== 'ready') return current;
      return {
        status: 'ready',
        items: current.items.map((item) => (item.runId === runId ? { ...item, status } : item)),
      };
    });
  }, []);

  const inProgress = useMemo(() => {
    if (state.status !== 'ready') return [];
    return state.items.filter((item) => isLiveRunStatus(item.status));
  }, [state])
    

  const value = useMemo(
    () => ({ state, inProgress, refresh, patchStatus }),
    [inProgress, patchStatus, refresh, state],
  );

  return (
    <OwnRunsContext.Provider value={value}>
      {inProgress.map((item) => (
        <LiveItemSubscription 
        key={item.runId} 
        runId={item.runId} 
        onStatus={patchStatus}
        onTerminal={() => {
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
