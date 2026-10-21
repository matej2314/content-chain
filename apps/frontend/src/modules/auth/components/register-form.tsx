'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { registerAccount } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import {
  toRegisterFieldErrors,
  type RegisterFieldErrors,
} from '@/modules/auth/register-form-error';
import { ApiError } from '@/shared/api/envelope';
import type { RegisteredUser } from '@/modules/auth/api/session.types';

export type RegisterSuccess =
  | { readonly kind: 'pending'; readonly email: string }
  | { readonly kind: 'ready'; readonly email: string };

type RegisterFormProps = {
  readonly onSuccess: (result: RegisterSuccess) => void;
  readonly onBackToLogin: () => void;
  readonly bootstrapAvailable?: boolean;
  readonly onGoBootstrapAdmin?: () => void;
};

type RegisterFormState = {
  readonly email: string;
  readonly password: string;
  readonly confirm: string;
  readonly pending: boolean;
  readonly fieldErrors: RegisterFieldErrors;
  readonly localHint: string | undefined;
};

const INITIAL_STATE: RegisterFormState = {
  email: '',
  password: '',
  confirm: '',
  pending: false,
  fieldErrors: {},
  localHint: undefined,
};

export function RegisterForm({
  onSuccess,
  onBackToLogin,
  bootstrapAvailable = false,
  onGoBootstrapAdmin,
}: RegisterFormProps) {
  const [registerState, setRegisterState] = useState<RegisterFormState>(INITIAL_STATE);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setRegisterState((current) => ({
      ...current,
      fieldErrors: {},
      localHint: undefined,
    }));

    if (registerState.password !== registerState.confirm) {
      setRegisterState((current) => ({
        ...current,
        localHint: 'Hasła muszą być identyczne.',
      }));
      return;
    }
    if (!passwordMeetsPolicy(registerState.password)) {
      setRegisterState((current) => ({
        ...current,
        localHint: 'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).',
      }));
      return;
    }

    setRegisterState((current) => ({ ...current, pending: true }));
    try {
      const user: RegisteredUser = await registerAccount({
        email: registerState.email,
        password: registerState.password,
      });
      if (user.verifiedAt === null) {
        onSuccess({ kind: 'pending', email: registerState.email });
        return;
      }
      onSuccess({ kind: 'ready', email: registerState.email });
    } catch (reason: unknown) {
      if (
        reason instanceof ApiError &&
        reason.status === 503 &&
        reason.envelope.code === 'MAIL_DELIVERY_FAILED'
      ) {
        onSuccess({ kind: 'pending', email: registerState.email });
        return;
      }
      setRegisterState((current) => ({
        ...current,
        fieldErrors: toRegisterFieldErrors(reason),
      }));
    } finally {
      setRegisterState((current) => ({ ...current, pending: false }));
    }
  }

  return (
    <form className="flex w-full max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <FormField label="E-mail" htmlFor="register-email" error={registerState.fieldErrors.email}>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="username"
          value={registerState.email}
          onChange={(event) =>
            setRegisterState((current) => ({ ...current, email: event.target.value }))
          }
          required
        />
      </FormField>
      <FormField
        label="Hasło"
        htmlFor="register-password"
        hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
        error={registerState.fieldErrors.password ?? registerState.localHint}
      >
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={registerState.password}
          onChange={(event) =>
            setRegisterState((current) => ({ ...current, password: event.target.value }))
          }
          required
        />
      </FormField>
      <FormField label="Powtórz hasło" htmlFor="register-confirm">
        <Input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={registerState.confirm}
          onChange={(event) =>
            setRegisterState((current) => ({ ...current, confirm: event.target.value }))
          }
          required
        />
      </FormField>
      {registerState.fieldErrors.form ? (
        <EnvelopeError
          code={registerState.fieldErrors.form.code}
          message={registerState.fieldErrors.form.message}
        />
      ) : null}
      <Button type="submit" disabled={registerState.pending} className="w-full">
        {registerState.pending ? 'Zapisywanie…' : 'Zarejestruj się'}
      </Button>
      <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
        Mam już konto - zaloguj się
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
  );
}
