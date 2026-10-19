'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { Toaster } from '@/shared/ui/sonner';
import { activateAccount, fetchBootstrapStatus } from '@/modules/auth/api/auth.api';
import { ACTIVATION_FAILED_HINT } from '@/modules/auth/activation-error';
import { AuthModal, type AuthMode } from '@/modules/auth/components/auth-modal';
import { RegistrationThankYou } from '@/modules/auth/components/registration-thank-you';
import { useSession } from '@/modules/auth/components/session-provider';
import { LandingView } from '@/modules/landing';
import { notifyProduct } from '@/modules/notifications/notify-product';

type GuestSurface =
  { readonly kind: 'landing' } | { readonly kind: 'thank_you'; readonly email: string };

type AuthUi = {
  readonly open: boolean;
  readonly mode: AuthMode;
  readonly successHint: string | null;
  readonly activationError: string | null;
};

const initialAuth: AuthUi = {
  open: false,
  mode: 'login',
  successHint: null,
  activationError: null,
};

function HomeEntrySkeleton() {
  return (
    <div className="flex min-h-dvh flex-col gap-4 bg-background p-6">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-8 w-full max-w-xl" />
      <Skeleton className="h-8 w-2/3 max-w-md" />
      <Skeleton className="mt-6 h-64 w-full max-w-4xl" />
    </div>
  );
}

function HomeEntryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activationStarted = useRef(false);
  const { state } = useSession();
  const [surface, setSurface] = useState<GuestSurface>({ kind: 'landing' });
  const [auth, setAuth] = useState<AuthUi>(initialAuth);
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
        setAuth({
          open: true,
          mode: 'login',
          successHint: null,
          activationError: ACTIVATION_FAILED_HINT,
        });
      });
  }, [router, searchParams, state.status]);

  if (state.status === 'loading' || state.status === 'authenticated') {
    return <HomeEntrySkeleton />;
  }

  return (
    <>
      <Toaster />
      <LandingView
        surface={surface.kind === 'thank_you' ? 'thank_you' : 'marketing'}
        onOpenLogin={() =>
          setAuth({ open: true, mode: 'login', successHint: null, activationError: null })
        }
        onOpenRegister={() =>
          setAuth({ open: true, mode: 'register', successHint: null, activationError: null })
        }
        thankYou={
          surface.kind === 'thank_you' ? (
            <RegistrationThankYou
              email={surface.email}
              onBackToLogin={() => {
                setSurface({ kind: 'landing' });
                setAuth({
                  open: true,
                  mode: 'login',
                  successHint: null,
                  activationError: null,
                });
              }}
            />
          ) : undefined
        }
      />
      <AuthModal
        open={auth.open}
        mode={auth.mode}
        onOpenChange={(open) => setAuth((prev) => ({ ...prev, open }))}
        onModeChange={(mode) =>
          setAuth((prev) => ({
            ...prev,
            mode,
            successHint: null,
            activationError: null,
          }))
        }
        bootstrapAvailable={bootstrapAvailable}
        successHint={auth.successHint}
        activationError={auth.activationError}
        onRegisterSuccess={(result) => {
          if (result.kind === 'pending') {
            setAuth((prev) => ({ ...prev, open: false }));
            setSurface({ kind: 'thank_you', email: result.email });
            return;
          }
          setSurface({ kind: 'landing' });
          setAuth({
            open: true,
            mode: 'login',
            successHint: 'Konto utworzone. Możesz się zalogować.',
            activationError: null,
          });
        }}
      />
    </>
  );
}

export function HomeEntry() {
  return (
    <Suspense fallback={<HomeEntrySkeleton />}>
      <HomeEntryInner />
    </Suspense>
  );
}
