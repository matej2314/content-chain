'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { InvitationId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { fetchUsers } from '@/modules/users/api/users.api';
import { USER_ROLE_LABELS } from '@/modules/users/api/users-labels';
import type { UserListItem } from '@/modules/users/api/users.types';
import {
  createInvitation,
  fetchInvitations,
  resendInvitation,
  revokeInvitation,
} from '@/modules/users/api/invitations.api';
import {
  isInvitationExpired,
  type InvitationListItem,
} from '@/modules/users/api/invitations.types';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function UsersView() {
  const [users, setUsers] = useState<readonly UserListItem[] | null>(null);
  const [invites, setInvites] = useState<readonly InvitationListItem[] | null>(null);
  const [loadError, setLoadError] = useState<{ code: string; message: string } | null>(null);
  const [formError, setFormError] = useState<{ code: string; message: string } | null>(null);
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [revokeId, setRevokeId] = useState<InvitationId | null>(null);

  const reload = useCallback(async (): Promise<void> => {
    setLoadError(null);
    try {
      const [nextUsers, nextInvites] = await Promise.all([fetchUsers(), fetchInvitations()]);
      setUsers(nextUsers);
      setInvites(nextInvites);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setLoadError(reason.envelope);
      else setLoadError(FALLBACK);
    }
  }, []);

  useEffect(() => {
    function reloadData() {
      void reload();
    }
    reloadData();
  }, [reload]);

  async function onInvite(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setFormError(null);
    try {
      await createInvitation(email.trim());
      setEmail('');
      await reload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setFormError(reason.envelope);
        if (reason.status === 503) await reload();
      } else {
        setFormError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  async function onResend(id: InvitationId): Promise<void> {
    setPending(true);
    setFormError(null);
    try {
      await resendInvitation(id);
      await reload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setFormError(reason.envelope);
        if (reason.status === 503) await reload();
      } else {
        setFormError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  async function onRevokeConfirm(): Promise<void> {
    if (revokeId === null) return;
    setPending(true);
    setFormError(null);
    try {
      await revokeInvitation(revokeId);
      setRevokeId(null);
      await reload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setFormError(reason.envelope);
      else setFormError(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  if (loadError && users === null) {
    return <EnvelopeError code={loadError.code} message={loadError.message} />;
  }

  if (users === null || invites === null) {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium">Użytkownicy</h1>
        <p className="text-sm text-muted-foreground">
          Zaproszenie idzie na email. Zaproszony ustawia hasło pod /invite/accept, potem loguje się
          na stronie głównej.
        </p>
      </div>

      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Zaproszenie</h2>
        <form className="flex flex-col gap-3" onSubmit={(event) => void onInvite(event)}>
          <FormField label="Email" htmlFor="invite-email">
            <Input
              id="invite-email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          {formError ? <EnvelopeError code={formError.code} message={formError.message} /> : null}
          {loadError ? <EnvelopeError code={loadError.code} message={loadError.message} /> : null}
          <Button type="submit" disabled={pending || email.trim().length === 0}>
            Wyślij zaproszenie
          </Button>
        </form>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Oczekujące zaproszenia</h2>
        {invites.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Brak oczekujących zaproszeń. Wyślij pierwsze z formularza powyżej.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-xl text-left text-sm">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Wygasa</th>
                  <th className="py-2 pr-3 font-medium">Stan</th>
                  <th className="py-2 pr-3 font-medium">Zaprosił</th>
                  <th className="py-2 font-medium">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invites.map((item) => {
                  const expired = isInvitationExpired(item.expiresAt);
                  return (
                    <tr key={item.id}>
                      <td className="py-2 pr-3">{item.email}</td>
                      <td className="py-2 pr-3">
                        <IsoDateTime iso={item.expiresAt} className="text-xs tabular-nums" />
                      </td>
                      <td className="py-2 pr-3">{expired ? 'Wygasłe' : 'Ważne'}</td>
                      <td className="py-2 pr-3">{item.invitedBy.email}</td>
                      <td className="flex flex-wrap gap-2 py-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={pending}
                          onClick={() => void onResend(item.id)}
                        >
                          Wyślij ponownie
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={pending}
                          onClick={() => setRevokeId(item.id)}
                        >
                          Unieważnij
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Konta</h2>
        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak kont do wyświetlenia.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-xl text-left text-sm">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Email</th>
                  <th className="py-2 pr-3 font-medium">Rola</th>
                  <th className="py-2 pr-3 font-medium">Aktywne</th>
                  <th className="py-2 font-medium">Utworzono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 pr-3">{item.email}</td>
                    <td className="py-2 pr-3">{USER_ROLE_LABELS[item.role]}</td>
                    <td className="py-2 pr-3">{item.isActive ? 'Tak' : 'Nie'}</td>
                    <td className="py-2">
                      <IsoDateTime iso={item.createdAt} className="text-xs tabular-nums" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={revokeId !== null} onOpenChange={(open) => !open && setRevokeId(null)}>
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unieważnić zaproszenie?</DialogTitle>
            <DialogDescription>
              Token z maila przestanie działać. Możesz potem wysłać nowe zaproszenie na ten sam
              adres, jeśli konto jeszcze nie istnieje.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setRevokeId(null)}>
              Nie
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={pending}
              onClick={() => void onRevokeConfirm()}
            >
              Unieważnij
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
