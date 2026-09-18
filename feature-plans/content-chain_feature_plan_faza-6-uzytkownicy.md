# Content Chain — feature plan: Faza 6 (Użytkownicy i domknięcie)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Widok Użytkownicy (admin): lista kont, zaproszenie emailem, pending (w tym wygasłe), resend/revoke; spójność z `/invite/accept?token=`; audyt ról w chrome |
| Major | `content-chain-frontend_major_plan.md` — Faza 6 (kroki 6.1–6.3) + MILESTONE 6 |
| Ten plik zestawu | `FAZA 3` (porządkowa). Pliki 1–2 = major 4–5 |
| Bramka ścieżki wstecz | Założenie: admin edytuje kontekst wg major FE **Faza 3.5** (twardy PUT) i api **Faza 11**. Ten plik **nie** implementuje `/context`. |
| Źródła | `docs/ux_dashboard.md` (Widok: Użytkownicy), `docs/dokumentacja_komunikacji.md` (invitations), `docs/security.md` (polityka hasła na accept), `spec/SPEC-AUTH.md` A-7/A-7a–d, `spec/SPEC-FRONTEND.md` F-4a/F-8, skill `content-chain-product-ui` |
| Poza zakresem | Soft-delete / edycja / drugi admin w UI; `/context` i twardy PUT bramki (FE Faza 3.5, api Faza 11); raw token w JSON; zmiana hasła zalogowanego; panel opinii; nowa paleta; implementacja api / mailera |
| Po implementacji (informacyjnie) | Major FE: Faza 6 i kroki 6.1–6.3 → `WYKONANY`; MILESTONE 6 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność: KROK 1 ← 6.1 (klient + widok); KROK 2 ← 6.2 (audyt accept z Fazy 1); KROK 3 ← 6.3 (chrome ról).

**Pass rozwojowy:** typy/`users.api` + `invitations.api` przed widokiem; `fetchInitiatorOptions` w archiwum przechodzi na parser listy users (bez drugiego kształtu). Accept-invite **zostaje** z Fazy 1; KROK 2 nie buduje drugiego ekranu.

**HOW:** tabele `divide-y` jak archiwum / Moje runy. Native email + `Dialog` na revoke (wzorzec wylogowania). Bez pola hasła na zaproszeniu. Raw token **nigdy** w UI admina. Daty w kolumnach (`createdAt`, `expiresAt`) wyłącznie przez `IsoDateTime` — **zakaz** surowego ISO w JSX.

**Design Read:** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Admin edytuje kontekst firmy wg Fazy **3.5** (twardy PUT, kompletna bramka; api **Faza 11**). Ten plik **nie** implementuje `/context` i **nie** każe zapisywać pustej / kalekiej bramki. Audyt ról (KROK 3) **bez zmiany semantyki** — `admin` edytuje, `user` tylko odczyt.
- `/invite/accept?token=` i `AcceptInviteForm` istnieją (Faza 1): pierwsze hasło, `POST /auth/accept-invite` z `skipAuthRefresh`, `router.replace('/')`, **bez** `setAuthenticated`. Layout poza `(app)`.
- Mailer api: `{APP_PUBLIC_URL}/invite/accept?token={raw}` (`SPEC-AUTH.md` A-7a). FE nie składa tego URL-a w widoku admina.
- `GET /users` już woła archiwum (filtr inicjatora, tylko admin). Ten plik **jedna** parse’owana lista w `modules/users`.
- `navItemsForRole`: Użytkownicy `adminOnly: true` (Faza 1). Deep link `/users` dla `user` = „Brak dostępu”, nie pozycja sidebara.
- `API_BASE_URL` server-only (`shared/config/env.ts` + `server-only`). Brak `NEXT_PUBLIC_*` w `apps/frontend`.
- Envelope as-is (`409 CONFLICT`, `503 MAIL_DELIVERY_FAILED`, `403`). Copy bez em-dash. Testy FE poza MVP.
- Prezentacja chwil: `apps/frontend/src/shared/datetime/` (`formatIsoDateTime` / `IsoDateTime`, locale `pl-PL`, `kind: 'list'`). Parsery nadal trzymają ISO `string`. `isInvitationExpired` zostaje na `Date.parse` (werdykt, nie label). Moduł datetime **musi** istnieć przed implementacją tego kroku.

### Biblioteki / API

- Ten sam kit: `Button`, `Input`, `FormField`, `Dialog`, `EnvelopeError`, tabele HTML, plus istniejący `IsoDateTime` (nie nowy prymityw shadcn). **Bez** Context7 poza stackiem już ustalonym w plikach 1–2. **Bez** `date-fns` / `dayjs`.
- `InvitationId` / `UserId` z `@content-chain/shared` (`createInvitationId` / `isInvitationId`).

---

## FAZA 3 — Użytkownicy i domknięcie UX

Odpowiada major **Faza 6**.

### KROK 1 — Widok Użytkownicy (admin)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 6.1. Lista kont + zaproszenia. `docs/ux_dashboard.md`, `SPEC-AUTH.md` A-7.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/users/api/users.types.ts`
- Nowy: `apps/frontend/src/modules/users/api/users.api.ts`
- Nowy: `apps/frontend/src/modules/users/api/invitations.types.ts`
- Nowy: `apps/frontend/src/modules/users/api/invitations.api.ts`
- Nowy: `apps/frontend/src/modules/users/api/users-labels.ts`
- Nowy: `apps/frontend/src/modules/users/components/users-view.tsx`
- Istniejący (wymagany import): `apps/frontend/src/shared/datetime/iso-date-time.tsx`
- Zmiana: `apps/frontend/src/app/(app)/users/page.tsx`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.api.ts` (`fetchInitiatorOptions`)

#### Nowy plik — `apps/frontend/src/modules/users/api/users.types.ts`

```ts
import {
  createUserId,
  isUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type UserListItem = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
};

export function parseUserListItem(value: unknown): UserListItem {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isUserId(value.id) ||
    typeof value.email !== 'string' ||
    value.email.length === 0 ||
    typeof value.role !== 'string' ||
    !isUserRole(value.role) ||
    typeof value.isActive !== 'boolean' ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid user item');
  }
  return {
    id: createUserId(value.id),
    email: value.email,
    role: value.role,
    isActive: value.isActive,
    createdAt: value.createdAt,
  };
}

export function parseUserList(value: unknown): readonly UserListItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid users payload');
  }
  return value.items.map(parseUserListItem);
}
```

#### Nowy plik — `apps/frontend/src/modules/users/api/users.api.ts`

```ts
import { apiFetch } from '@/shared/api/api-fetch';
import { parseUserList, type UserListItem } from '@/modules/users/api/users.types';

export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}
```

#### Nowy plik — `apps/frontend/src/modules/users/api/invitations.types.ts`

```ts
import {
  createInvitationId,
  createUserId,
  isInvitationId,
  isUserId,
  type InvitationId,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type InvitationListItem = {
  readonly id: InvitationId;
  readonly email: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly invitedBy: { readonly id: UserId; readonly email: string };
};

export type InviteCreated = {
  readonly id: InvitationId;
  readonly email: string;
  readonly expiresAt: string;
};

export function isInvitationExpired(expiresAt: string, nowMs: number = Date.now()): boolean {
  const expiresMs = Date.parse(expiresAt);
  if (Number.isNaN(expiresMs)) throw new Error('Invalid expiresAt');
  return expiresMs < nowMs;
}

export function parseInvitationListItem(value: unknown): InvitationListItem {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isInvitationId(value.id) ||
    typeof value.email !== 'string' ||
    value.email.length === 0 ||
    typeof value.createdAt !== 'string' ||
    typeof value.expiresAt !== 'string' ||
    !isRecord(value.invitedBy) ||
    typeof value.invitedBy.id !== 'string' ||
    !isUserId(value.invitedBy.id) ||
    typeof value.invitedBy.email !== 'string'
  ) {
    throw new Error('Invalid invitation item');
  }
  return {
    id: createInvitationId(value.id),
    email: value.email,
    createdAt: value.createdAt,
    expiresAt: value.expiresAt,
    invitedBy: {
      id: createUserId(value.invitedBy.id),
      email: value.invitedBy.email,
    },
  };
}

export function parseInvitationList(value: unknown): readonly InvitationListItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid invitations payload');
  }
  return value.items.map(parseInvitationListItem);
}

export function parseInviteCreated(value: unknown): InviteCreated {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isInvitationId(value.id) ||
    typeof value.email !== 'string' ||
    typeof value.expiresAt !== 'string'
  ) {
    throw new Error('Invalid invite payload');
  }
  if ('token' in value || 'rawToken' in value || 'tokenHash' in value) {
    throw new Error('Invite payload must not include token');
  }
  return {
    id: createInvitationId(value.id),
    email: value.email,
    expiresAt: value.expiresAt,
  };
}
```

Parser **odrzuca** payload z `token` / `rawToken` / `tokenHash` (twarda bramka UI: raw nie wchodzi do stanu).

#### Nowy plik — `apps/frontend/src/modules/users/api/invitations.api.ts`

```ts
import type { InvitationId } from '@content-chain/shared';
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseInvitationList,
  parseInviteCreated,
  type InvitationListItem,
  type InviteCreated,
} from '@/modules/users/api/invitations.types';

export async function fetchInvitations(): Promise<readonly InvitationListItem[]> {
  const body = await apiFetch('/invitations');
  return parseInvitationList(body);
}

export async function createInvitation(email: string): Promise<InviteCreated> {
  const body = await apiFetch('/invitations', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return parseInviteCreated(body);
}

export async function resendInvitation(id: InvitationId): Promise<InviteCreated> {
  const body = await apiFetch(`/invitations/${id}/resend`, { method: 'POST' });
  return parseInviteCreated(body);
}

export async function revokeInvitation(id: InvitationId): Promise<void> {
  const body = await apiFetch(`/invitations/${id}`, { method: 'DELETE' });
  if (!isRecord(body) || body.ok !== true) {
    throw new Error('Invalid revoke payload');
  }
}
```

#### Nowy plik — `apps/frontend/src/modules/users/api/users-labels.ts`

```ts
import type { UserRole } from '@content-chain/shared';

export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
} as const satisfies Record<UserRole, string>;
```

#### Nowy plik — `apps/frontend/src/modules/users/components/users-view.tsx`

```tsx
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
    void reload();
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
      if (reason instanceof ApiError) setFormError(reason.envelope);
      else setFormError(FALLBACK);
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
      if (reason instanceof ApiError) setFormError(reason.envelope);
      else setFormError(FALLBACK);
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
            <Button type="button" variant="destructive" disabled={pending} onClick={() => void onRevokeConfirm()}>
              Unieważnij
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

Lead z `/invite/accept` jest ścieżką kanonu (nie token). **Zakaz** kolumny tokenu. Kolumna `isActive` jest odczytem; **brak** przycisków DELETE/PATCH user.

`503 MAIL_DELIVERY_FAILED`: envelope + `reload` i tak pokaże pending (wiersz zostaje). Retry `POST` przy pending → `409`.

#### Refaktor — `users/page.tsx`

**teraz:** placeholder „pojawią się później”.

**zamień na:**

```tsx
'use client';

import Link from 'next/link';
import { useSession } from '@/modules/auth/components/session-provider';
import { UsersView } from '@/modules/users/components/users-view';

export default function UsersPage() {
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
  return <UsersView />;
}
```

#### Refaktor — `fetchInitiatorOptions` (`runs.api.ts`)

**teraz:** ręczny parse `GET /users` → `{ id, email }`.

**zamień na:**

```ts
import { fetchUsers } from '@/modules/users/api/users.api';

export type InitiatorOption = {
  readonly id: UserId;
  readonly email: string;
};

export async function fetchInitiatorOptions(): Promise<readonly InitiatorOption[]> {
  const items = await fetchUsers();
  return items.map((item) => ({ id: item.id, email: item.email }));
}
```

Usuń lokalny parse `items` z tej funkcji (żeby nie było dwóch parserów listy users). `createUserId` / `isUserId` w tym pliku zostają, jeśli start/archiwum ich potrzebuje.

**Nie:** UI soft-delete; pole hasła; tworzenie admina; lista pending na `GET /users`.

**DoD kroku:**

- Admin: lista kont bez tokenów; zaproszenie tylko email; pending w tym wygasłe z resend/revoke.
- `user` na `/users`: Brak dostępu (jak dziś).
- Archiwum inicjatorów czyta ten sam `fetchUsers`.
- Parser invite rzuca, gdy api omyłkowo zwróci token.
- Kolumny `Utworzono` (konta) i `Wygasa` (pending) pokazują `pl-PL` przez `IsoDateTime` (`kind: 'list'`); w JSX **brak** surowego ISO. Porównanie wygasłości nadal `isInvitationExpired(item.expiresAt)`.

---

### KROK 2 — Spójność zaproszenia z wejściem

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 6.2. Ścieżka mail → Faza 1 → karta logowania. **Bez** nowego ekranu accept.

**Artefakty (warunkowo):**

- Odczyt (bez edycji, jeśli lista poniżej już prawdziwa):
  - `apps/frontend/src/app/invite/accept/page.tsx` (poza `(app)`, `searchParams.token`)
  - `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`
  - `acceptInvite` w `auth.api.ts` (`skipAuthRefresh: true`)

**Audyt (obowiązkowy przed zmianą kodu):**

| Warunek | Stan Fazy 1 (oczekiwany) |
|---------|--------------------------|
| Trasa | `/invite/accept?token=` |
| Po sukcesie | `router.replace('/')`, nie dashboard |
| Sesja | brak `setAuthenticated`; api **nie** ustawia cookies (A-7b) |
| Token zły / wygasły / revoked | `ApiError` envelope `code` + `message` as-is |
| Brak `token` w URL | karta „Brak tokenu…”, nie crash |
| Hasło | `passwordMeetsPolicy` + hint; 400 z api as-is |
| Layout | `min-h-dvh` wyśrodkowany; **nie** `DashboardShell` |

Jeśli audyt **zgadza się** z tabelą: **zero zmian** w plikach accept. Widok Użytkownicy (KROK 1) już opisuje ścieżkę w leadzie.

Jeśli audyt znajdzie lukę (np. `setAuthenticated` po accept, inna ścieżka, wejście do `(app)`): **tylko** minimalny `teraz → zamień na` w tym kroku, bez nowego UI.

**Nie:** zmiana URL mailera (to api / `APP_PUBLIC_URL`); drugi ekran `/accept-invite`.

**DoD kroku:**

- Zaproszony nie omija karty logowania.
- Błędy tokenu / hasła = envelope as-is.
- Mail i UI używają tej samej ścieżki `/invite/accept?token=`.

---

### KROK 3 — Role w chrome i zamknięcie klienta

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 6.3. Zgodność sidebara/headera z rolami; brak sekretów w kliencie.

**Artefakty (audyt + ewentualna minimalna poprawka):**

- `apps/frontend/src/modules/shell/nav.ts`
- `apps/frontend/src/modules/shell/components/app-sidebar.tsx`
- `apps/frontend/src/modules/shell/components/app-header.tsx`
- `apps/frontend/src/modules/shell/components/chrome-slots.tsx` (box ukryty na `/account`)
- `apps/frontend/src/shared/config/env.ts`
- `apps/frontend/package.json` (brak `NEXT_PUBLIC_API_BASE_URL`)

**Audyt chrome:**

| Rola | Musi mieć | Nie wolno |
|------|-----------|-----------|
| `user` | Kontekst (odczyt), Runy, Konto, header login→wylogowanie, box poza Kontem, chip kompletności, CTA opinii | pozycja Użytkownicy w sidebarze; URL api; sekrety LLM |
| `admin` | to samo + Użytkownicy + edycja kontekstu | soft-delete w UI; raw invite token |

„Edycja kontekstu” = semantyka Fazy **3.5** (twardy PUT, kompletna bramka). Ten krok **nie** zmienia tej semantyki i **nie** implementuje `/context`.

`navItemsForRole` już filtruje `adminOnly`. Jeśli po KROK 1 `user` nadal nie widzi pozycji Użytkownicy: **brak zmian** w `nav.ts`.

Sprawdź `rg NEXT_PUBLIC_ apps/frontend`: oczekiwany brak URL-a api. Nie dodawaj publicznych env.

Deep link `/users` jako `user`: zostaje strona „Brak dostępu” (KROK 1), nie redirect milczący (czytelność).

**DoD kroku:**

- `user` bez pozycji Użytkownicy; admin z Użytkownikami.
- Klient bez sekretów LLM / bramy i bez `NEXT_PUBLIC_*` originu api.
- Dashboard MVP względem `docs/ux_dashboard.md` jest kompletny **w połączeniu z plikami 1–2** (Konto, archiwum, szczegóły, box, header, opinia, HITL/wynik/przegląd).

---

#### Propozycja commit message

```text
feat(users): let admins invite by email and manage pending invites

Keep accept-invite on the mail URL and the login card so invited users never skip the session gate.
```

---

## Weryfikacja wycinka (ten plik)

- Kotwica major 6 / 6.1–6.3. Milestone 6 po implementacji całego zestawu 4–6.
- Zgodność UX Users + A-7 + F-8.
- Nowe pliki kompletne; accept bez drugiego ekranu.
- Daty w widoku: `IsoDateTime`; zero surowego ISO w JSX.
- Nagłówki `FAZA` / `KROK`. Commit EN. Statusy `NIE_ROZPOCZĘTY`.
- Lock: tabele gęste, Dialog revoke, empty z następnym krokiem.

## Ślad do major (informacyjnie)

Po implementacji **tego** pliku: Faza 6, Kroki 6.1–6.3 → `WYKONANY`; MILESTONE 6 → `OSIĄGNIĘTY` (gdy Fazy 1–6 i 2.1 są `WYKONANY`). Ten skill **nie** edytuje majoru.
