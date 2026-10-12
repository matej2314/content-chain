'use client';

import { useState, type FormEvent } from 'react';
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
import { fetchUserSession, patchOwnEmail } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';

type AccountEmailFormState = {
  email: string;
  open: boolean;
  modalEmail: string;
  modalPassword: string;
  emailLocked: boolean;
  pending: boolean;
  emailError: string | null;
  passwordError: string | null;
  openedDraft: string;
};

export function AccountEmailForm() {
  const { state, setAuthenticated } = useSession();
  const guestLocked = useGuestLocked();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [form, setForm] = useState<AccountEmailFormState>({
    email: current,
    open: false,
    modalEmail: '',
    modalPassword: '',
    emailLocked: true,
    pending: false,
    emailError: null,
    passwordError: null,
    openedDraft: current,
  });

  if (state.status !== 'authenticated') return null;

  if (guestLocked) {
    return (
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm">
          Email: <span className="font-medium">{current}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Zmiana adresu niedostępna dla konta demonstracyjnego.
        </p>
      </div>
    );
  }

  function openReauthModal(draft: string): void {
    setForm((prev) => ({
      ...prev,
      openedDraft: draft,
      modalEmail: draft,
      modalPassword: '',
      emailLocked: true,
      emailError: null,
      passwordError: null,
      open: true,
    }));
  }

  function closeWithoutApi(): void {
    setForm((prev) => ({
      ...prev,
      open: false,
      modalPassword: '',
      emailError: null,
      passwordError: null,
      email: prev.openedDraft,
    }));
  }

  function onAccountSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    openReauthModal(form.email.trim());
  }

  function onModalSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (form.pending) return;
    void onConfirm();
  }

  async function onConfirm(): Promise<void> {
    setForm((prev) => ({
      ...prev,
      pending: true,
      emailError: null,
      passwordError: null,
    }));
    try {
      await patchOwnEmail({
        email: form.modalEmail.trim(),
        currentPassword: form.modalPassword,
      });
      const user = await fetchUserSession();
      setAuthenticated(user);
      setForm((prev) => ({
        ...prev,
        email: user.email,
        open: false,
        modalPassword: '',
      }));
    } catch (reason: unknown) {
      if (!(reason instanceof ApiError)) {
        setForm((prev) => ({ ...prev, passwordError: FALLBACK_MESSAGE }));
        return;
      }
      const { code, message } = reason.envelope;
      if (reason.status === 409 || code === 'CONFLICT') {
        setForm((prev) => ({
          ...prev,
          modalEmail: '',
          modalPassword: '',
          emailLocked: false,
          emailError: message,
          passwordError: null,
        }));
        return;
      }
      if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
        setForm((prev) => ({ ...prev, passwordError: message }));
        return;
      }
      setForm((prev) => ({ ...prev, passwordError: message }));
    } finally {
      setForm((prev) => ({ ...prev, pending: false }));
    }
  }

  return (
    <>
      <form className="flex max-w-xl flex-col gap-3" onSubmit={onAccountSubmit}>
        <FormField label="Email" htmlFor="account-email">
          <Input
            id="account-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </FormField>
        <Button type="submit">Zapisz email</Button>
      </form>

      <Dialog
        open={form.open}
        onOpenChange={(next) => {
          if (form.pending) return;
          if (!next) closeWithoutApi();
          else setForm((prev) => ({ ...prev, open: true }));
        }}
      >
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          <form className="flex flex-col gap-4" onSubmit={onModalSubmit}>
            <DialogHeader>
              <DialogTitle>Potwierdź zmianę emaila</DialogTitle>
              <DialogDescription>
                Podaj aktualne hasło, żeby zapisać adres. Sesja pozostanie aktywna.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <FormField label="Email" htmlFor="reauth-email">
                <Input
                  id="reauth-email"
                  type="email"
                  autoComplete="email"
                  value={form.modalEmail}
                  disabled={form.emailLocked || form.pending}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      modalEmail: event.target.value,
                    }))
                  }
                  required
                />
              </FormField>
              {form.emailError ? (
                <p className="text-sm text-destructive" role="alert">
                  {form.emailError}
                </p>
              ) : null}

              <FormField label="Aktualne hasło" htmlFor="reauth-password">
                <Input
                  id="reauth-password"
                  type="password"
                  autoComplete="current-password"
                  value={form.modalPassword}
                  disabled={form.pending}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      modalPassword: event.target.value,
                    }))
                  }
                  required
                />
              </FormField>
              {form.passwordError ? (
                <p className="text-sm text-destructive" role="alert">
                  {form.passwordError}
                </p>
              ) : null}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={form.pending}
                onClick={() => closeWithoutApi()}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={form.pending}>
                Potwierdź
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
