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
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';
import { fetchAppConfig } from '@/modules/demo/api/config.api';

export type DemoModeState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly demoMode: boolean };

type DemoModeContextValue = {
  readonly state: DemoModeState;
  readonly refetch: () => Promise<void>;
};

const DemoModeContext = createContext<DemoModeContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function DemoModeProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<DemoModeState>({ status: 'loading' });
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      const config = await fetchAppConfig();
      if (requestId !== requestIdRef.current) return;
      setState({ status: 'ready', demoMode: config.demoMode });
    } catch (reason: unknown) {
      if (requestId !== requestIdRef.current) return;
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK_ENVELOPE });
    }
  }, []);

  useEffect(() => {
    void refetch();
    return () => {
      requestIdRef.current += 1;
    };
  }, [refetch]);

  const value = useMemo(() => ({ state, refetch }), [state, refetch]);

  return <DemoModeContext.Provider value={value}>{children}</DemoModeContext.Provider>;
}

export function useDemoMode(): DemoModeContextValue {
  const value = useContext(DemoModeContext);
  if (!value) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return value;
}
