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

type BootstrapAdminFormState = {
  readonly email: string;
  readonly password: string;
  readonly confirm: string;
  readonly pending: boolean;
  readonly fieldErrors: RegisterFieldErrors;
  readonly localHint: string | undefined;
};

const INITIAL_STATE: BootstrapAdminFormState = {
  email: '',
  password: '',
  confirm: '',
  pending: false,
  fieldErrors: {},
  localHint: undefined,
};

export function BootstrapAdminForm({ onBackToLogin }: BootstrapAdminFormProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [bootstrapState, setBootstrapState] = useState<BootstrapAdminFormState>(INITIAL_STATE);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setBootstrapState((current) => ({
      ...current,
      fieldErrors: {},
      localHint: undefined,
    }));

    if (bootstrapState.password !== bootstrapState.confirm) {
      setBootstrapState((current) => ({
        ...current,
        localHint: 'Hasła muszą być identyczne.',
      }));
      return;
    }
    if (!passwordMeetsPolicy(bootstrapState.password)) {
      setBootstrapState((current) => ({
        ...current,
        localHint: 'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).',
      }));
      return;
    }

    setBootstrapState((current) => ({ ...current, pending: true }));
    try {
      const user = await bootstrapAdmin({
        email: bootstrapState.email,
        password: bootstrapState.password,
      });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      setBootstrapState((current) => ({
        ...current,
        fieldErrors: toRegisterFieldErrors(reason),
      }));
    } finally {
      setBootstrapState((current) => ({ ...current, pending: false }));
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
          <FormField label="E-mail" htmlFor="bootstrap-admin-email" error={bootstrapState.fieldErrors.email}>
            <Input
              id="bootstrap-admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={bootstrapState.email}
              onChange={(event) =>
                setBootstrapState((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </FormField>
          <FormField
            label="Hasło"
            htmlFor="bootstrap-admin-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={bootstrapState.fieldErrors.password ?? bootstrapState.localHint}
          >
            <Input
              id="bootstrap-admin-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={bootstrapState.password}
              onChange={(event) =>
                setBootstrapState((current) => ({ ...current, password: event.target.value }))
              }
              required
            />
          </FormField>
          <FormField label="Powtórz hasło" htmlFor="bootstrap-admin-confirm">
            <Input
              id="bootstrap-admin-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={bootstrapState.confirm}
              onChange={(event) =>
                setBootstrapState((current) => ({ ...current, confirm: event.target.value }))
              }
              required
            />
          </FormField>
          {bootstrapState.fieldErrors.form ? (
            <EnvelopeError
              code={bootstrapState.fieldErrors.form.code}
              message={bootstrapState.fieldErrors.form.message}
            />
          ) : null}
          <Button type="submit" disabled={bootstrapState.pending} className="w-full">
            {bootstrapState.pending ? 'Zapisywanie…' : 'Utwórz administratora'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Wróć do logowania
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
