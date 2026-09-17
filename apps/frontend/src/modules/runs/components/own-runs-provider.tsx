'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
}: {
  readonly runId: RunId;
  readonly onStatus: (runId: RunId, status: RunStatus) => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
  });
  return null;
}

export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const [state, setState] = useState<OwnRunsState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      const items = await fetchUserRuns(userId);
      setState({ status: 'ready', items });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK });
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
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

  const inProgress =
    state.status === 'ready' ? state.items.filter((item) => isLiveRunStatus(item.status)) : [];

  const value = useMemo(
    () => ({ state, inProgress, refresh, patchStatus }),
    [inProgress, patchStatus, refresh, state],
  );

  return (
    <OwnRunsContext.Provider value={value}>
      {inProgress.map((item) => (
        <LiveItemSubscription key={item.runId} runId={item.runId} onStatus={patchStatus} />
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
