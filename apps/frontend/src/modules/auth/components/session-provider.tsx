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
import { useRouter } from 'next/navigation';
import { ApiError } from '@/shared/api/envelope';
import { setApiFetchUnauthorizedHandler } from '@/shared/api/api-fetch';
import { fetchUserSession } from '@/modules/auth/api/auth.api';
import type { SessionUser } from '@/modules/auth/api/session.types';

export type SessionState =
  | { status: 'loading' }
  | { status: 'anonymous' }
  | { status: 'authenticated'; user: SessionUser };

type SessionContextValue = {
  readonly state: SessionState;
  readonly setAuthenticated: (user: SessionUser) => void;
  readonly clear: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<SessionState>({ status: 'loading' });

  const clear = useCallback(() => {
    setState({ status: 'anonymous' });
  }, []);

  const setAuthenticated = useCallback((user: SessionUser) => {
    setState({ status: 'authenticated', user });
  }, []);

  useEffect(() => {
    setApiFetchUnauthorizedHandler(() => {
      setState({ status: 'anonymous' });
    });
    return () => setApiFetchUnauthorizedHandler(undefined);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const user = await fetchUserSession();
        if (!cancelled) setState({ status: 'authenticated', user });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError && reason.status === 401) {
          setState({ status: 'anonymous' });
          return;
        }
        setState({ status: 'anonymous' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ state, setAuthenticated, clear }),
    [state, setAuthenticated, clear],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return value;
}
