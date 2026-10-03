'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { registerAccount } from '@/modules/auth/api/auth.api';
import type { RegisteredUser } from '@/modules/auth/api/session.types';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import {
  toRegisterFieldErrors,
  type RegisterFieldErrors,
} from '@/modules/auth/register-form-error';
import { ApiError } from '@/shared/api/envelope';

export type RegisterSuccess =
  | { readonly kind: 'pending'; readonly email: string }
  | { readonly kind: 'ready'; readonly email: string };

type RegisterFormProps = {
  readonly onSuccess: (result: RegisterSuccess) => void;
  readonly onBackToLogin: () => void;
};

export function RegisterForm({ onSuccess, onBackToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setFieldErrors({});
    setLocalHint(undefined);

    if (password !== confirm) {
      setLocalHint('Hasła muszą być identyczne.');
      return;
    }
    if (!passwordMeetsPolicy(password)) {
      setLocalHint(
        'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).',
      );
      return;
    }

    setPending(true);
    try {
      const user: RegisteredUser = await registerAccount({ email, password });
      if (user.verifiedAt === null) {
        onSuccess({ kind: 'pending', email });
        return;
      }
      onSuccess({ kind: 'ready', email });
    } catch (reason: unknown) {
      if (
        reason instanceof ApiError &&
        reason.status === 503 &&
        reason.envelope.code === 'MAIL_DELIVERY_FAILED'
      ) {
        onSuccess({ kind: 'pending', email });
        return;
      }
      setFieldErrors(toRegisterFieldErrors(reason));
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">Utwórz konto operatora.</p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="register-email" error={fieldErrors.email}>
            <Input
              id="register-email"
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
            htmlFor="register-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={fieldErrors.password ?? localHint}
          >
            <Input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Powtórz hasło" htmlFor="register-confirm">
            <Input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
            />
          </FormField>
          {fieldErrors.form ? (
            <EnvelopeError code={fieldErrors.form.code} message={fieldErrors.form.message} />
          ) : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zarejestruj się'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Mam już konto — zaloguj się
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
