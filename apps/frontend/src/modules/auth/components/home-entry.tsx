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
import { BootstrapAdminForm } from '@/modules/auth/components/bootstrap-admin-form';
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
  | { readonly mode: 'bootstrap_admin' }
  | { readonly mode: 'thank_you'; readonly email: string };

function GuestBrandPanel() {
  return (
    <aside
      data-slot="guest-brand-panel"
      className="relative hidden w-[min(42%,28rem)] shrink-0 flex-col justify-between overflow-hidden bg-primary px-8 py-10 text-primary-foreground lg:flex"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/80"
      />
      <div className="relative z-10 flex flex-col gap-6">
        <p className="text-xl font-semibold tracking-tight">Content Chain</p>
        <div className="flex max-w-sm flex-col gap-3 text-sm leading-relaxed text-primary-foreground/90">
          <p>
            Self-hostowy dashboard do uruchamiania agentów contentowych — od briefu po przegląd
            wyniku.
          </p>
          <p>Jedna sesja, ciemny obszar roboczy i kontrola HITL tam, gdzie decyzja należy do Ciebie.</p>
        </div>
      </div>
      <p className="relative z-10 text-sm font-medium text-primary-foreground/95">
        Zaloguj się, aby wejść do panelu operatora.
      </p>
    </aside>
  );
}

function GuestFormSkeleton() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

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
      <div className="flex min-h-dvh bg-background">
        <GuestBrandPanel />
        <div className="flex flex-1 items-center justify-center p-4">
          <GuestFormSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <GuestBrandPanel />
      <div className="flex flex-1 items-center justify-center p-4">
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
        ) : view.mode === 'bootstrap_admin' ? (
          <BootstrapAdminForm onBackToLogin={() => setView({ mode: 'login' })} />
        ) : (
          <LoginCard
            bootstrapAvailable={bootstrapAvailable}
            onGoRegister={() => setView({ mode: 'register' })}
            onGoBootstrapAdmin={() => setView({ mode: 'bootstrap_admin' })}
            successHint={view.successHint ?? null}
            activationError={view.activationError ?? null}
          />
        )}
      </div>
    </div>
  );
}

export function HomeEntry() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh bg-background">
          <GuestBrandPanel />
          <div className="flex flex-1 items-center justify-center p-4">
            <GuestFormSkeleton />
          </div>
        </div>
      }
    >
      <HomeEntryInner />
    </Suspense>
  );
}
