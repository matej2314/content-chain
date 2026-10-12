'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { loginWithPassword } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';
import type { ApiErrorEnvelope } from '@/shared/api/envelope';

type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onGoRegister?: () => void;
  readonly onGoBootstrapAdmin?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};

type LoginCardState = {
  readonly email: string;
  readonly password: string;
  readonly pending: boolean;
  readonly error: ApiErrorEnvelope | null;
};

const INITIAL_LOGIN_CARD_STATE: LoginCardState = {
  email: '',
  password: '',
  pending: false,
  error: null,
};

export function LoginCard({
  bootstrapAvailable,
  onGoRegister,
  onGoBootstrapAdmin,
  successHint = null,
  activationError = null,
}: LoginCardProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [loginState, setLoginState] = useState<LoginCardState>(INITIAL_LOGIN_CARD_STATE);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoginState((prev) => ({ ...prev, pending: true, error: null }));
    try {
      const user = await loginWithPassword({ email: loginState.email, password: loginState.password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        const { envelope } = reason;
        setLoginState((prev) => ({
          ...prev,
          error: envelope,
        }));
      } else {
        setLoginState((prev) => ({
          ...prev,
          error: { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' },
        }));
      }
    } finally {
      setLoginState((prev) => ({ ...prev, pending: false }));
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">Zaloguj się w aplikacji.</p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="login-email">
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={loginState.email}
              onChange={(event) => setLoginState((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </FormField>
          <FormField label="Hasło" htmlFor="login-password">
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={loginState.password}
              onChange={(event) => setLoginState((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
          </FormField>
          {loginState.error ? (
            <EnvelopeError code={loginState.error.code} message={loginState.error.message} />
          ) : null}
          <Button type="submit" disabled={loginState.pending} className="w-full">
            {loginState.pending ? 'Logowanie…' : 'Zaloguj się'}
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
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={onGoRegister === undefined}
            onClick={onGoRegister}
          >
            Nie masz konta? Zarejestruj się!
          </Button>
          {bootstrapAvailable ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={onGoBootstrapAdmin === undefined}
              onClick={onGoBootstrapAdmin}
            >
              Zarejestruj admina
            </Button>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
