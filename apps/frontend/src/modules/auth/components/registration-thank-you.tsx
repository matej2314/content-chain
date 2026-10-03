'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { EnvelopeError } from '@/shared/ui/form-field';
import { resendActivation } from '@/modules/auth/api/auth.api';
import { ApiError } from '@/shared/api/envelope';

type RegistrationThankYouProps = {
  readonly email: string;
  readonly onBackToLogin: () => void;
};

export function RegistrationThankYou({ email, onBackToLogin }: RegistrationThankYouProps) {
  const [pending, setPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<{ readonly code: string; readonly message: string } | null>(
    null,
  );

  async function onResend(): Promise<void> {
    setPending(true);
    setError(null);
    setStatusMessage(null);
    try {
      await resendActivation(email);
      // API zawsze 200 + stały message — FE pokazuje kanoniczny copy (bez enumeracji).
      setStatusMessage('Wiadomość wysłana ponownie');
    } catch (reason: unknown) {
      // Teoretycznie nie powinno; sieć / 5xx poza kontraktem resend.
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
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
        <Button type="button" variant="outline" className="w-full" disabled={pending} onClick={onResend}>
          {pending ? 'Wysyłanie…' : 'Wyślij ponownie'}
        </Button>
        {statusMessage ? (
          <p className="text-sm text-muted-foreground" role="status">
            {statusMessage}
          </p>
        ) : null}
        {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
        <Button type="button" className="w-full" onClick={onBackToLogin}>
          Wróć do logowania
        </Button>
      </CardContent>
    </Card>
  );
}
