'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { EnvelopeError } from '@/shared/ui/form-field';
import { resendActivation } from '@/modules/auth/api/auth.api';
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

  async function onResend(): Promise<void> {
    setState((prev) => ({ ...prev, pending: true, error: null, statusMessage: null }));
    try {
      await resendActivation(email);
      setState((prev) => ({ ...prev, statusMessage: 'Wiadomość wysłana ponownie' }));
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
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          Sprawdź skrzynkę e-mail. Wysłaliśmy link aktywacyjny na{' '}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Nie otrzymałeś wiadomości e-mail?</p>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={state.pending}
          onClick={onResend}
        >
          {state.pending ? 'Wysyłanie…' : 'Wyślij ponownie'}
        </Button>
        {state.statusMessage ? (
          <p className="text-sm text-muted-foreground" role="status">
            {state.statusMessage}
          </p>
        ) : null}
        {state.error ? (
          <EnvelopeError code={state.error.code} message={state.error.message} />
        ) : null}
        <Button type="button" className="w-full" onClick={onBackToLogin}>
          Wróć do logowania
        </Button>
      </CardContent>
    </Card>
  );
}
