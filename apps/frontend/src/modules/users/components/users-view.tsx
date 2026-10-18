'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ApiError } from '@/shared/api/envelope';
import { useSession } from '@/modules/auth/components/session-provider';
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
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
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
import {
  AccountActionDialog,
  type AccountAction,
} from '@/modules/users/components/account-action-dialog';
import type { UserListItem } from '@/modules/users/api/users.types';
import type { InvitationId } from '@content-chain/shared';

interface ErrorObject {
  code: string;
  message: string;
}

type AdminListsState = {
  users: readonly UserListItem[] | null;
  invites: readonly InvitationListItem[] | null;
  loadError: ErrorObject | null;
};

type InviteFormState = {
  email: string;
  formError: ErrorObject | null;
  pending: boolean;
  revokeId: InvitationId | null;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

const INITIAL_ADMIN_LISTS: AdminListsState = {
  users: null,
  invites: null,
  loadError: null,
};

const INITIAL_INVITE_FORM: InviteFormState = {
  email: '',
  formError: null,
  pending: false,
  revokeId: null,
};

export function UsersView() {
  const { state } = useSession();
  if (state.status !== 'authenticated') return null;
  if (state.user.role !== 'admin') {
    return (
      <section className="flex max-w-xl flex-col gap-2">
        <h1 className="text-lg font-medium">Użytkownicy</h1>
        <p className="text-sm text-muted-foreground">Brak dostępu.</p>
        <Link href="/account" className="text-sm text-primary underline-offset-4 hover:underline">
          Wróć na Konto
        </Link>
      </section>
    );
  }
  return <UsersAdminView />;
}

function UsersAdminView() {
  const [lists, setLists] = useState<AdminListsState>(INITIAL_ADMIN_LISTS);
  const [inviteForm, setInviteForm] = useState<InviteFormState>(INITIAL_INVITE_FORM);
  const [accountAction, setAccountAction] = useState<AccountAction | null>(null);

  const { users, invites, loadError } = lists;
  const { email, formError, pending, revokeId } = inviteForm;

  const reload = useCallback(async (): Promise<void> => {
    setLists((prev) => ({ ...prev, loadError: null }));
    try {
      const [nextUsers, nextInvites] = await Promise.all([fetchUsers(), fetchInvitations()]);
      setLists({ users: nextUsers, invites: nextInvites, loadError: null });
    } catch (reason: unknown) {
      const nextError = reason instanceof ApiError ? reason.envelope : FALLBACK;
      setLists((prev) => ({ ...prev, loadError: nextError }));
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
    setInviteForm((prev) => ({ ...prev, pending: true, formError: null }));
    try {
      await createInvitation(email.trim());
      setInviteForm((prev) => ({ ...prev, email: '' }));
      await reload();
    } catch (reason: unknown) {
      const nextError = reason instanceof ApiError ? reason.envelope : FALLBACK;
      setInviteForm((prev) => ({ ...prev, formError: nextError }));
      if (reason instanceof ApiError && reason.status === 503) await reload();
    } finally {
      setInviteForm((prev) => ({ ...prev, pending: false }));
    }
  }

  async function onResend(id: InvitationId): Promise<void> {
    setInviteForm((prev) => ({ ...prev, pending: true, formError: null }));
    try {
      await resendInvitation(id);
      await reload();
    } catch (reason: unknown) {
      const nextError = reason instanceof ApiError ? reason.envelope : FALLBACK;
      setInviteForm((prev) => ({ ...prev, formError: nextError }));
      if (reason instanceof ApiError && reason.status === 503) await reload();
    } finally {
      setInviteForm((prev) => ({ ...prev, pending: false }));
    }
  }

  async function onRevokeConfirm(): Promise<void> {
    if (revokeId === null) return;
    setInviteForm((prev) => ({ ...prev, pending: true, formError: null }));
    try {
      await revokeInvitation(revokeId);
      setInviteForm((prev) => ({ ...prev, revokeId: null }));
      await reload();
    } catch (reason: unknown) {
      const nextError = reason instanceof ApiError ? reason.envelope : FALLBACK;
      setInviteForm((prev) => ({ ...prev, formError: nextError }));
    } finally {
      setInviteForm((prev) => ({ ...prev, pending: false }));
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
        <p className="font-secondary text-sm text-muted-foreground">
          Zaproszenie wysyłane jest na podany adres e-mail.
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
              onChange={(event) =>
                setInviteForm((prev) => ({ ...prev, email: event.target.value }))
              }
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
                          onClick={() => setInviteForm((prev) => ({ ...prev, revokeId: item.id }))}
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
                  <th className="py-2 pr-3 font-medium">Utworzono</th>
                  <th className="py-2 font-medium">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 pr-3">{item.email}</td>
                    <td className="py-2 pr-3">{USER_ROLE_LABELS[item.role]}</td>
                    <td className="py-2 pr-3">{item.isActive ? 'Tak' : 'Nie'}</td>
                    <td className="py-2 pr-3">
                      <IsoDateTime iso={item.createdAt} className="text-xs tabular-nums" />
                    </td>
                    <td className="py-2">
                      {item.role === 'admin' ? null : item.role === 'guest' ? (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={pending}
                          onClick={() => setAccountAction({ kind: 'delete-guest', user: item })}
                        >
                          Usuń
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={pending}
                          onClick={() =>
                            setAccountAction({
                              kind: item.isActive ? 'deactivate' : 'activate',
                              user: item,
                            })
                          }
                        >
                          {item.isActive ? 'Dezaktywuj' : 'Aktywuj'}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog
        open={revokeId !== null}
        onOpenChange={(open) => !open && setInviteForm((prev) => ({ ...prev, revokeId: null }))}
      >
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unieważnić zaproszenie?</DialogTitle>
            <DialogDescription>
              Token z maila przestanie działać. Możesz potem wysłać nowe zaproszenie na ten sam
              adres, jeśli konto jeszcze nie istnieje.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setInviteForm((prev) => ({ ...prev, revokeId: null }))}
            >
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

      <AccountActionDialog
        action={accountAction}
        onOpenChange={(open) => {
          if (!open) setAccountAction(null);
        }}
        onSuccess={async () => {
          await reload();
        }}
        onNeedsPurge={(user, message) => {
          setAccountAction({ kind: 'purge-guest', user, message });
        }}
      />
    </div>
  );
}
