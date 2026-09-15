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

export function LoginCard() {
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
      const user = await loginWithPassword({ email, password });
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
        <CardTitle className="text-center text-lg font-semibold">Content Chain</CardTitle>
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Hasło" htmlFor="login-password">
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Logowanie…' : 'Zaloguj się'}
          </Button>
          <Button type="button" variant="outline" disabled className="w-full" title="Rejestracja jest niedostępna">
            Nie masz konta? Zarejestruj się!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
