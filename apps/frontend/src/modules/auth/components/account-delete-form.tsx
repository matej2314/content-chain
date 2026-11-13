'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import {
  deleteOwnAccount,
  GUEST_HAS_ACTIVE_RUN,
} from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';
const CONFIRM_COPY =
  'Operacja usuwania konta. Czy jesteś pewny, że chcesz usunąć swoje konto?';

type AccountDeleteFormProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

type DeletePhase =
  | { readonly kind: 'confirm' }
  | {
      readonly kind: 'reauth';
      readonly currentPassword: string;
      readonly pending: boolean;
      readonly passwordError: string | null;
    }
  | {
      readonly kind: 'purge';
      readonly currentPassword: string;
      readonly message: string;
      readonly pending: boolean;
      readonly passwordError: string | null;
    };

export function AccountDeleteForm({ open, onOpenChange }: AccountDeleteFormProps) {
  const router = useRouter();
  const { state, clear } = useSession();
  const [phase, setPhase] = useState<DeletePhase>({ kind: 'confirm' });

  useEffect(() => {
    if (!open) return;
    setPhase({ kind: 'confirm' });
  }, [open]);

  if (state.status !== 'authenticated') return null;
  if (state.user.role === 'admin') return null;

  const isGuest = state.user.role === 'guest';

  function close(): void {
    if (phase.kind !== 'confirm' && phase.pending) return;
    onOpenChange(false);
  }

  async function runDelete(purge: boolean, currentPassword: string): Promise<void> {
    setPhase((prev) =>
      prev.kind === 'confirm' ? prev : { ...prev, pending: true, passwordError: null },
    );
    try {
      await deleteOwnAccount({ currentPassword, purge });
      clear();
      onOpenChange(false);
      router.replace('/');
    } catch (reason: unknown) {
      if (
        !purge &&
        isGuest &&
        reason instanceof ApiError &&
        reason.status === 409 &&
        reason.envelope.code === GUEST_HAS_ACTIVE_RUN
      ) {
        setPhase({
          kind: 'purge',
          currentPassword,
          message: reason.envelope.message,
          pending: false,
          passwordError: null,
        });
        return;
      }
      const message =
        reason instanceof ApiError ? reason.envelope.message : FALLBACK_MESSAGE;
      setPhase((prev) =>
        prev.kind === 'confirm'
          ? prev
          : { ...prev, pending: false, passwordError: message },
      );
    }
  }

  function onReauthSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (phase.kind !== 'reauth' || phase.pending) return;
    void runDelete(false, phase.currentPassword);
  }

  function onPurgeConfirm(): void {
    if (phase.kind !== 'purge' || phase.pending) return;
    void runDelete(true, phase.currentPassword);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        {phase.kind === 'confirm' ? (
          <>
            <DialogHeader>
              <DialogTitle>Usunąć konto?</DialogTitle>
              <DialogDescription>{CONFIRM_COPY}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                Nie
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() =>
                  setPhase({
                    kind: 'reauth',
                    currentPassword: '',
                    pending: false,
                    passwordError: null,
                  })
                }
              >
                Tak
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {phase.kind === 'reauth' ? (
          <form className="flex flex-col gap-4" onSubmit={onReauthSubmit}>
            <DialogHeader>
              <DialogTitle>Potwierdź hasłem</DialogTitle>
              <DialogDescription>
                {isGuest
                  ? 'Trwale usuniesz konto demonstracyjne i powiązane treści. Podaj aktualne hasło.'
                  : 'Konto zostanie dezaktywowane. Runy i opinie zostaną. Podaj aktualne hasło.'}
              </DialogDescription>
            </DialogHeader>
            <FormField label="Aktualne hasło" htmlFor="account-delete-password">
              <Input
                id="account-delete-password"
                type="password"
                autoComplete="current-password"
                value={phase.currentPassword}
                disabled={phase.pending}
                onChange={(event) =>
                  setPhase({
                    ...phase,
                    currentPassword: event.target.value,
                  })
                }
                required
              />
            </FormField>
            {phase.passwordError ? (
              <p className="text-sm text-destructive" role="alert">
                {phase.passwordError}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={phase.pending}
                onClick={close}
              >
                Anuluj
              </Button>
              <Button type="submit" variant="destructive" disabled={phase.pending}>
                Usuń
              </Button>
            </DialogFooter>
          </form>
        ) : null}

        {phase.kind === 'purge' ? (
          <>
            <DialogHeader>
              <DialogTitle>Usunąć mimo aktywnego runu?</DialogTitle>
              <DialogDescription>{phase.message}</DialogDescription>
            </DialogHeader>
            {phase.passwordError ? (
              <p className="text-sm text-destructive" role="alert">
                {phase.passwordError}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={phase.pending}
                onClick={close}
              >
                Nie
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={phase.pending}
                onClick={onPurgeConfirm}
              >
                Usuń
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
