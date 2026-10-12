'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ACCEPT_INVITE_DEMO_HINT } from '@/modules/auth/accept-invite-demo-copy';
import { acceptInvite } from '@/modules/auth/api/auth.api';
import {
  toAcceptInviteFormError,
  type AcceptInviteFormError,
} from '@/modules/auth/accept-invite-form-error';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import { fetchAppConfig } from '@/modules/demo/api/config.api';

type AcceptInviteFormProps = {
  readonly token: string;
};

type AcceptInviteFormState = {
  readonly password: string;
  readonly pending: boolean;
  readonly error: AcceptInviteFormError | null;
  readonly localHint: string | undefined;
  readonly showDemoHint: boolean;
};

const initialState: AcceptInviteFormState = {
  password: '',
  pending: false,
  error: null,
  localHint: undefined,
  showDemoHint: false,
};

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [state, setState] = useState<AcceptInviteFormState>(initialState);
  const configRequestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++configRequestIdRef.current;
    void (async () => {
      try {
        const config = await fetchAppConfig();
        if (requestId !== configRequestIdRef.current) return;
        setState((prev) => ({ ...prev, showDemoHint: config.demoMode }));
      } catch {
        if (requestId !== configRequestIdRef.current) return;
        setState((prev) => ({ ...prev, showDemoHint: false }));
      }
    })();
    return () => {
      configRequestIdRef.current += 1;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState((prev) => ({ ...prev, error: null }));
    if (!passwordMeetsPolicy(state.password)) {
      setState((prev) => ({
        ...prev,
        localHint: 'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).',
      }));
      return;
    }
    setState((prev) => ({ ...prev, localHint: undefined, pending: true }));
    try {
      await acceptInvite({ token, password: state.password });
      router.replace('/');
    } catch (reason: unknown) {
      setState((prev) => ({ ...prev, error: toAcceptInviteFormError(reason) }));
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
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
        {state.showDemoHint ? (
          <p className="text-sm text-muted-foreground" data-slot="accept-invite-demo-hint">
            {ACCEPT_INVITE_DEMO_HINT}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField
            label="Hasło"
            htmlFor="invite-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={state.localHint}
          >
            <Input
              id="invite-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={state.password}
              onChange={(event) => setState((prev) => ({ ...prev, password: event.target.value }))}
              required
            />
          </FormField>
          {state.error ? (
            <EnvelopeError code={state.error.code} message={state.error.message} />
          ) : null}
          <Button type="submit" disabled={state.pending} className="w-full">
            {state.pending ? 'Zapisywanie…' : 'Zapisz hasło'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
