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
import { fetchGatewayAlive } from '@/modules/health/api/health.api';

export type GatewayAliveState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly gatewayAlive: boolean };

type GatewayAliveContextValue = {
  readonly state: GatewayAliveState;
  readonly refetch: () => Promise<void>;
};

const GatewayAliveContext = createContext<GatewayAliveContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function GatewayAliveProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<GatewayAliveState>({ status: 'loading' });
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      const gatewayAlive = await fetchGatewayAlive();
      if (requestId !== requestIdRef.current) return;
      setState({ status: 'ready', gatewayAlive });
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
    void (async () => {
      await refetch();
    })();
    return () => {
      requestIdRef.current += 1;
    };
  }, [refetch]);

  const value = useMemo(() => ({ state, refetch }), [state, refetch]);

  return (
    <GatewayAliveContext.Provider value={value}>{children}</GatewayAliveContext.Provider>
  );
}

export function useGatewayAlive(): GatewayAliveContextValue {
  const value = useContext(GatewayAliveContext);
  if (!value) {
    throw new Error('useGatewayAlive must be used within a GatewayAliveProvider');
  }
  return value;
}
