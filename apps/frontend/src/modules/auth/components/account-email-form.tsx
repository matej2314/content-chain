'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { patchOwnEmail } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function AccountEmailForm() {
  const { state, setAuthenticated } = useSession();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [email, setEmail] = useState(current);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  if (state.status !== 'authenticated') return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setEnvelope(null);
    setSaved(false);
    try {
      const user = await patchOwnEmail(email.trim());
      setAuthenticated(user);
      setEmail(user.email);
      setSaved(true);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-xl flex-col gap-3" onSubmit={(event) => void onSubmit(event)}>
      <FormField label="Email" htmlFor="account-email">
        <Input
          id="account-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormField>
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
      {saved ? <p className="text-xs text-muted-foreground">Zapisano adres email.</p> : null}
      <Button type="submit" disabled={pending || email.trim() === current}>
        Zapisz email
      </Button>
    </form>
  );
}
