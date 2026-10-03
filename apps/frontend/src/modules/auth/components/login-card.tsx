'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { bootstrapAdmin, loginWithPassword } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onBootstrapAvailableChange?: (available: boolean) => void;
  readonly onGoRegister?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};

export function LoginCard({
  bootstrapAvailable,
  onGoRegister,
  successHint = null,
  activationError = null,
}: LoginCardProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const user = bootstrapAvailable
        ? await bootstrapAdmin({ email, password })
        : await loginWithPassword({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
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
          {bootstrapAvailable
            ? 'Pierwsza instalacja. To konto zostanie administratorem.'
            : 'Zaloguj się w aplikacji.'}
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="login-email">
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Hasło"
            htmlFor="login-password"
            hint={
              bootstrapAvailable
                ? 'Min. 12 znaków, wielka litera, cyfra i znak specjalny.'
                : undefined
            }
          >
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete={bootstrapAvailable ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zaloguj się'}
          </Button>
          {successHint ? (
            <p className="text-sm text-muted-foreground" role="status">
              {successHint}
            </p>
          ) : null}
          {activationError ? (
            <p className="text-sm text-destructive" role="alert">
              {activationError}
            </p>
          ) : null}
          {!bootstrapAvailable ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={onGoRegister === undefined}
              onClick={onGoRegister}
            >
              Nie masz konta? Zarejestruj się!
            </Button>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
