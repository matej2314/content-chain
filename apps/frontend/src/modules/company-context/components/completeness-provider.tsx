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
import { fetchCompleteness } from '@/modules/company-context/api/company-context.api';
import type { CompletenessState } from '@/modules/company-context/api/company-context.types';

type CompletenessContextValue = {
  readonly state: CompletenessState;
  readonly refetch: () => Promise<void>;
};

const CompletenessContext = createContext<CompletenessContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function CompletenessProvider({ children }: { readonly children: ReactNode }) {
  const [completenessState, setCompletenessState] = useState<CompletenessState>({
    status: 'loading',
  });
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      const completeness = await fetchCompleteness();
      if (requestId !== requestIdRef.current) return;
      setCompletenessState({ status: 'ready', completeness });
    } catch (reason: unknown) {
      if (requestId !== requestIdRef.current) return;
      if (reason instanceof ApiError) {
        setCompletenessState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setCompletenessState({ status: 'error', envelope: FALLBACK_ENVELOPE });
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

  const value = useMemo(
    () => ({ state: completenessState, refetch }),
    [completenessState, refetch],
  );

  return <CompletenessContext.Provider value={value}>{children}</CompletenessContext.Provider>;
}

export function useCompleteness(): CompletenessContextValue {
  const value = useContext(CompletenessContext);
  if (!value) {
    throw new Error('useCompleteness must be used within a CompletenessProvider');
  }
  return value;
}
