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

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';

export function AccountEmailForm() {
  const { state, setAuthenticated } = useSession();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [email, setEmail] = useState(current);
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [emailLocked, setEmailLocked] = useState(true);
  const [pending, setPending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  /** Draft Konta w momencie otwarcia — Anuluj / close bez Potwierdź wraca do niego. */
  const [openedDraft, setOpenedDraft] = useState(current);

  if (state.status !== 'authenticated') return null;

  function openReauthModal(draft: string): void {
    setOpenedDraft(draft);
    setModalEmail(draft);
    setModalPassword('');
    setEmailLocked(true);
    setEmailError(null);
    setPasswordError(null);
    setOpen(true);
  }

  function closeWithoutApi(): void {
    setOpen(false);
    setModalPassword('');
    setEmailError(null);
    setPasswordError(null);
    setEmail(openedDraft);
  }

  function onAccountSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    openReauthModal(email.trim());
  }

  function onModalSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (pending) return;
    void onConfirm();
  }

  async function onConfirm(): Promise<void> {
    setPending(true);
    setEmailError(null);
    setPasswordError(null);
    try {
      await patchOwnEmail({
        email: modalEmail.trim(),
        currentPassword: modalPassword,
      });
      const user = await fetchUserSession();
      setAuthenticated(user);
      setEmail(user.email);
      setOpen(false);
      setModalPassword('');
    } catch (reason: unknown) {
      if (!(reason instanceof ApiError)) {
        setPasswordError(FALLBACK_MESSAGE);
        return;
      }
      const { code, message } = reason.envelope;
      if (reason.status === 409 || code === 'CONFLICT') {
        setModalEmail('');
        setModalPassword('');
        setEmailLocked(false);
        setEmailError(message);
        setPasswordError(null);
        return;
      }
      if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
        setPasswordError(message);
        return;
      }
      setPasswordError(message);
    } finally {
      setPending(false);
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </FormField>
        <Button type="submit">Zapisz email</Button>
      </form>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (pending) return;
          if (!next) closeWithoutApi();
          else setOpen(true);
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
                  value={modalEmail}
                  disabled={emailLocked || pending}
                  onChange={(event) => setModalEmail(event.target.value)}
                  required
                />
              </FormField>
              {emailError ? (
                <p className="text-sm text-destructive" role="alert">
                  {emailError}
                </p>
              ) : null}

              <FormField label="Aktualne hasło" htmlFor="reauth-password">
                <Input
                  id="reauth-password"
                  type="password"
                  autoComplete="current-password"
                  value={modalPassword}
                  disabled={pending}
                  onChange={(event) => setModalPassword(event.target.value)}
                  required
                />
              </FormField>
              {passwordError ? (
                <p className="text-sm text-destructive" role="alert">
                  {passwordError}
                </p>
              ) : null}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => closeWithoutApi()}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={pending}>
                Potwierdź
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
