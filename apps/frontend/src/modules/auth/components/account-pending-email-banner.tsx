'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { ApiError } from '@/shared/api/envelope';
import { resendEmailChangeConfirm } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';
import { notifyProduct } from '@/modules/notifications/notify-product';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';

type AccountPendingEmailBannerProps = {
  readonly deliveryAlert?: string | null;
  readonly onClearDeliveryAlert?: () => void;
};

export function AccountPendingEmailBanner({
  deliveryAlert = null,
  onClearDeliveryAlert,
}: AccountPendingEmailBannerProps) {
  const { state, setAuthenticated } = useSession();
  const [resendPending, setResendPending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  if (state.status !== 'authenticated') return null;
  if (state.user.pendingEmail === null) return null;

  const { email, pendingEmail } = state.user;

  async function onResendConfirm(): Promise<void> {
    onClearDeliveryAlert?.();
    setResendPending(true);
    setResendError(null);
    try {
      const user = await resendEmailChangeConfirm();
      setAuthenticated(user);
      notifyProduct({
        kind: 'success',
        title: 'Wysłaliśmy ponownie link potwierdzający.',
        id: 'email-change-resend',
      });
    } catch (reason: unknown) {
      const message =
        reason instanceof ApiError ? reason.envelope.message : FALLBACK_MESSAGE;
      setResendError(message);
    } finally {
      setResendPending(false);
    }
  }

  return (
    <div className="flex max-w-xl flex-col gap-2 rounded-lg border border-border px-3 py-3">
      <p className="text-sm">
        Email: <span className="font-medium">{email}</span>
      </p>
      <p className="text-sm text-muted-foreground">
        Czekamy na potwierdzenie adresu{' '}
        <span className="font-medium">{pendingEmail}</span>. Sprawdź skrzynkę i
        kliknij link z wiadomości.
      </p>
      {deliveryAlert ? (
        <p className="text-sm text-destructive" role="alert">
          {deliveryAlert}
        </p>
      ) : null}
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        disabled={resendPending}
        onClick={() => void onResendConfirm()}
      >
        Wyślij ponownie
      </Button>
      {resendError ? (
        <p className="text-sm text-destructive" role="alert">
          {resendError}
        </p>
      ) : null}
    </div>
  );
}
