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
import { patchOwnPassword } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import { useSession } from '@/modules/auth/components/session-provider';
import { notifyProduct } from '@/modules/notifications/notify-product';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';
const POLICY_HINT =
  'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).';

type AccountPasswordFormProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirm: string;
  pending: boolean;
  currentError: string | null;
  newError: string | null;
};

const INITIAL: PasswordFormState = {
  currentPassword: '',
  newPassword: '',
  confirm: '',
  pending: false,
  currentError: null,
  newError: null,
};

export function AccountPasswordForm({ open, onOpenChange }: AccountPasswordFormProps) {
  const { state } = useSession();
  const [form, setForm] = useState<PasswordFormState>(INITIAL);

  useEffect(() => {
    if (!open) return;
    setForm(INITIAL);
  }, [open]);

  if (state.status !== 'authenticated') return null;

  function closeWithoutApi(): void {
    if (form.pending) return;
    onOpenChange(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (form.pending) return;

    if (form.newPassword !== form.confirm) {
      setForm((prev) => ({
        ...prev,
        newError: 'Hasła muszą być identyczne.',
        currentError: null,
      }));
      return;
    }
    if (!passwordMeetsPolicy(form.newPassword)) {
      setForm((prev) => ({
        ...prev,
        newError: POLICY_HINT,
        currentError: null,
      }));
      return;
    }

    void (async () => {
      setForm((prev) => ({
        ...prev,
        pending: true,
        currentError: null,
        newError: null,
      }));
      try {
        await patchOwnPassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        onOpenChange(false);
        setForm(INITIAL);
        notifyProduct({
          kind: 'success',
          title: 'Hasło zostało zmienione.',
          id: 'account-password-changed',
        });
      } catch (reason: unknown) {
        if (!(reason instanceof ApiError)) {
          setForm((prev) => ({
            ...prev,
            currentError: FALLBACK_MESSAGE,
            pending: false,
          }));
          return;
        }
        const { code, message } = reason.envelope;
        if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
          if (code === 'INVALID_PASSWORD') {
            setForm((prev) => ({
              ...prev,
              currentError: message,
              pending: false,
            }));
            return;
          }
          setForm((prev) => ({
            ...prev,
            newError: message,
            pending: false,
          }));
          return;
        }
        setForm((prev) => ({
          ...prev,
          currentError: message,
          pending: false,
        }));
      }
    })();
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
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Zmiana hasła</DialogTitle>
            <DialogDescription>
              Podaj aktualne hasło i nowe. Po zapisaniu zostaniesz zalogowany na tym
              urządzeniu; inne sesje wylogują się.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <FormField label="Aktualne hasło" htmlFor="account-current-password">
              <Input
                id="account-current-password"
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            {form.currentError ? (
              <p className="text-sm text-destructive" role="alert">
                {form.currentError}
              </p>
            ) : null}

            <FormField label="Nowe hasło" htmlFor="account-new-password">
              <Input
                id="account-new-password"
                type="password"
                autoComplete="new-password"
                value={form.newPassword}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            <FormField label="Powtórz nowe hasło" htmlFor="account-confirm-password">
              <Input
                id="account-confirm-password"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    confirm: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            {form.newError ? (
              <p className="text-sm text-destructive" role="alert">
                {form.newError}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={form.pending}
              onClick={closeWithoutApi}
            >
              Anuluj
            </Button>
            <Button type="submit" disabled={form.pending}>
              Zapisz hasło
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
