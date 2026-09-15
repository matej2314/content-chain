'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { acceptInvite } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';

type AcceptInviteFormProps = {
  readonly token: string;
};

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    if (!passwordMeetsPolicy(password)) {
      setLocalHint('Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).');
      return;
    }
    setLocalHint(undefined);
    setPending(true);
    try {
      await acceptInvite({ token, password });
      router.replace('/');
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

  if (token.length === 0) {
    return (
      <Card className="w-full max-w-md border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Zaproszenie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Brak tokenu zaproszenia w adresie.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Ustaw pierwsze hasło</CardTitle>
        <p className="text-sm text-muted-foreground">
          Po zapisaniu wrócisz na kartę logowania. Dashboard otworzy się dopiero po zalogowaniu.
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField
            label="Hasło"
            htmlFor="invite-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={localHint}
          >
            <Input
              id="invite-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zapisz hasło'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
