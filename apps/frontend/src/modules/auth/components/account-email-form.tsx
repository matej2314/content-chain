'use client';

import { useEffect, useState, type FormEvent } from 'react';
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
import { notifyProduct } from '@/modules/notifications/notify-product';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';

type AccountEmailFormProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onMailDeliveryFailed?: (message: string) => void;
};

type ModalState = {
  modalEmail: string;
  modalPassword: string;
  emailLocked: boolean;
  pending: boolean;
  emailError: string | null;
  passwordError: string | null;
};

export function AccountEmailForm({
  open,
  onOpenChange,
  onMailDeliveryFailed,
}: AccountEmailFormProps) {
  const { state, setAuthenticated } = useSession();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [form, setForm] = useState<ModalState>({
    modalEmail: current,
    modalPassword: '',
    emailLocked: false,
    pending: false,
    emailError: null,
    passwordError: null,
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      modalEmail: current,
      modalPassword: '',
      emailLocked: false,
      pending: false,
      emailError: null,
      passwordError: null,
    });
  }, [open, current]);

  if (state.status !== 'authenticated') return null;

  function closeWithoutApi(): void {
    if (form.pending) return;
    onOpenChange(false);
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
      onOpenChange(false);
      if (user.pendingEmail !== null) {
        notifyProduct({
          kind: 'success',
          title: `Wysłaliśmy link potwierdzający na ${user.pendingEmail}.`,
          id: 'email-change-pending',
        });
      }
    } catch (reason: unknown) {
      if (!(reason instanceof ApiError)) {
        setForm((prev) => ({
          ...prev,
          passwordError: FALLBACK_MESSAGE,
          pending: false,
        }));
        return;
      }
      const { code, message } = reason.envelope;
      // shortcut: 503 po PATCH traktuj jak pending + message, bez osobnego flow recovery poza resend
      if (reason.status === 503 || code === 'MAIL_DELIVERY_FAILED') {
        try {
          const user = await fetchUserSession();
          setAuthenticated(user);
        } catch {
          // keep session as-is; message still surfaces on banner
        }
        onMailDeliveryFailed?.(message);
        onOpenChange(false);
        setForm((prev) => ({ ...prev, pending: false }));
        return;
      }
      if (reason.status === 409 || code === 'CONFLICT') {
        setForm((prev) => ({
          ...prev,
          modalEmail: '',
          modalPassword: '',
          emailLocked: false,
          emailError: message,
          passwordError: null,
          pending: false,
        }));
        return;
      }
      if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
        setForm((prev) => ({
          ...prev,
          passwordError: message,
          pending: false,
        }));
        return;
      }
      setForm((prev) => ({
        ...prev,
        passwordError: message,
        pending: false,
      }));
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (form.pending) return;
        if (!next) closeWithoutApi();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        <form className="flex flex-col gap-4" onSubmit={onModalSubmit}>
          <DialogHeader>
            <DialogTitle>Zmiana adresu e-mail</DialogTitle>
            <DialogDescription>
              Podaj nowy adres i aktualne hasło. Sesja pozostanie aktywna.
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
  );
}
