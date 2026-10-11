'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { bootstrapAdmin } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import {
  toRegisterFieldErrors,
  type RegisterFieldErrors,
} from '@/modules/auth/register-form-error';

type BootstrapAdminFormProps = {
  readonly onBackToLogin: () => void;
};

export function BootstrapAdminForm({ onBackToLogin }: BootstrapAdminFormProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
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
      const user = await bootstrapAdmin({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      setFieldErrors(toRegisterFieldErrors(reason));
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          Pierwsza instalacja. To konto zostanie administratorem.
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="bootstrap-admin-email" error={fieldErrors.email}>
            <Input
              id="bootstrap-admin-email"
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
            htmlFor="bootstrap-admin-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={fieldErrors.password ?? localHint}
          >
            <Input
              id="bootstrap-admin-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Powtórz hasło" htmlFor="bootstrap-admin-confirm">
            <Input
              id="bootstrap-admin-confirm"
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
            {pending ? 'Zapisywanie…' : 'Utwórz administratora'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Wróć do logowania
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
