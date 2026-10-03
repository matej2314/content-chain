'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { Toaster } from '@/shared/ui/sonner';
import {
  activateAccount,
  fetchBootstrapStatus,
} from '@/modules/auth/api/auth.api';
import { ACTIVATION_FAILED_HINT } from '@/modules/auth/activation-error';
import { LoginCard } from '@/modules/auth/components/login-card';
import {
  RegisterForm,
  type RegisterSuccess,
} from '@/modules/auth/components/register-form';
import { RegistrationThankYou } from '@/modules/auth/components/registration-thank-you';
import { useSession } from '@/modules/auth/components/session-provider';
import { notifyProduct } from '@/modules/notifications/notify-product';

export type GuestView =
  | {
      readonly mode: 'login';
      readonly successHint?: string | null;
      readonly activationError?: string | null;
    }
  | { readonly mode: 'register' }
  | { readonly mode: 'thank_you'; readonly email: string };

function HomeEntryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activationStarted = useRef(false);
  const { state } = useSession();
  const [view, setView] = useState<GuestView>({ mode: 'login' });
  const [bootstrapAvailable, setBootstrapAvailable] = useState(false);

  useEffect(() => {
    if (state.status === 'authenticated') {
      router.replace('/account');
    }
  }, [router, state.status]);

  useEffect(() => {
    let cancelled = false;
    void fetchBootstrapStatus()
      .then((available) => {
        if (!cancelled) setBootstrapAvailable(available);
      })
      .catch(() => {
        if (!cancelled) setBootstrapAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state.status !== 'anonymous') return;
    if (activationStarted.current) return;
    const raw = searchParams.get('activationToken');
    if (raw === null || raw.length === 0) return;

    activationStarted.current = true;
    // Natychmiast login + strip tokenu (F-4b); activate w tle.
    setView({ mode: 'login', activationError: null, successHint: null });
    router.replace('/');

    void activateAccount(raw)
      .then(() => {
        notifyProduct({
          kind: 'success',
          title: 'Konto aktywowane! Możesz się zalogować.',
          id: 'account-activated',
        });
      })
      .catch(() => {
        setView((current) =>
          current.mode === 'login'
            ? { ...current, activationError: ACTIVATION_FAILED_HINT }
            : {
                mode: 'login',
                activationError: ACTIVATION_FAILED_HINT,
                successHint: null,
              },
        );
      });
  }, [router, searchParams, state.status]);

  function handleRegisterSuccess(result: RegisterSuccess): void {
    if (result.kind === 'pending') {
      setView({ mode: 'thank_you', email: result.email });
      return;
    }
    setView({
      mode: 'login',
      successHint: 'Konto utworzone. Możesz się zalogować.',
      activationError: null,
    });
  }

  if (state.status === 'loading' || state.status === 'authenticated') {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-4">
        <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <Toaster />
      {view.mode === 'thank_you' ? (
        <RegistrationThankYou
          email={view.email}
          onBackToLogin={() => setView({ mode: 'login' })}
        />
      ) : view.mode === 'register' ? (
        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onBackToLogin={() => setView({ mode: 'login' })}
        />
      ) : (
        <LoginCard
          bootstrapAvailable={bootstrapAvailable}
          onGoRegister={() => setView({ mode: 'register' })}
          successHint={view.successHint ?? null}
          activationError={view.activationError ?? null}
        />
      )}
    </div>
  );
}

export function HomeEntry() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-background p-4">
          <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      }
    >
      <HomeEntryInner />
    </Suspense>
  );
}
