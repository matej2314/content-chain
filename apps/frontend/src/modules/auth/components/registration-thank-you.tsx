'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { resendActivation } from '@/modules/auth/api/auth.api';
import { LANDING_COPY } from '@/modules/auth/landing/landing-copy';
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';

type RegistrationThankYouProps = {
  readonly email: string;
  readonly onBackToLogin: () => void;
};

type RegistrationThankYouState = {
  readonly pending: boolean;
  readonly statusMessage: string | null;
  readonly error: ApiErrorEnvelope | null;
};

const initialState: RegistrationThankYouState = {
  pending: false,
  statusMessage: null,
  error: null,
};

export function RegistrationThankYou({ email, onBackToLogin }: RegistrationThankYouProps) {
  const [state, setState] = useState<RegistrationThankYouState>(initialState);
  const copy = LANDING_COPY.thankYou;

  async function onResend(): Promise<void> {
    setState((prev) => ({ ...prev, pending: true, error: null, statusMessage: null }));
    try {
      await resendActivation(email);
      setState((prev) => ({ ...prev, statusMessage: copy.resendOk }));
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        const { envelope } = reason;
        setState((prev) => ({
          ...prev,
          error: envelope,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' },
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.title}</h2>
        <p className="text-sm text-muted-foreground">
          {copy.bodyPrefix} <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">{copy.resendPrompt}</p>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={state.pending}
        onClick={onResend}
      >
        {state.pending ? copy.resendPending : copy.resend}
      </Button>
      {state.statusMessage ? (
        <p className="text-sm text-muted-foreground" role="status">
          {state.statusMessage}
        </p>
      ) : null}
      {state.error ? <EnvelopeError code={state.error.code} message={state.error.message} /> : null}
      <Button type="button" className="w-full" onClick={onBackToLogin}>
        {copy.backToLogin}
      </Button>
    </div>
  );
}
