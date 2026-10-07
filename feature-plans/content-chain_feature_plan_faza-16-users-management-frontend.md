# Content Chain — feature plan: Faza 16 FE (Users toggle / Usuń+purge + Cancel admin→guest)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Lista **Konta**: kolumna **Akcje** — toggle soft `user` (`DELETE` / `PATCH` `{ isActive: true }`) + **Usuń** hard `guest` (+ flow **409** → `?purge=true`); **szczegóły** runu: Stop gdy owner **lub** (`session.role=admin` ∧ `startedBy.role=guest`); błędy Users = `message` envelope w dialogu (nie toast) |
| Major | `content-chain-frontend_major_plan.md` — **Faza 16** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 16. **Nie** mylić z historycznym `wykonane/content-chain_feature_plan_faza-16-register-email-activation.md` ani z backend Fazą 16 (register/activate) |
| Ten plik | `content-chain_feature_plan_faza-21-users-management-frontend.md` — slug `faza-21-…-frontend` = para z BE `…_faza-21-users-management.md`; **kotwica major FE = Faza 16** (numer FE ≠ 21) |
| `FAZA` / `KROK` | Jedna `FAZA 1` (porządkowa = cała major Faza 16). Kolejność `KROK` ≠ numeracja major (major nie ma 16.1…) |
| Źródła | `docs/ux_dashboard.md`, `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/security.md`, `SPEC-FRONTEND.md` F-8 / F-5b, `SPEC-AUTH.md` A-10 / A-10a, `SPEC-RUNY.md` R-11, `SPEC-KOMUNIKACJA.md`, `users-management-plan.md`, major FE Faza 16 |
| Zależność api | Kontrakt z docs/SPEC; implementacja Nest = backend **Faza 21** / `feature-plans/content-chain_feature_plan_faza-21-users-management.md`. FE **nie** implementuje soft/hard w domain, Redis, abort, JWT `isActive`. Runtime wymaga api: `DELETE` (+`purge`), `PATCH` reaktywacja, `startedBy.role` na `GET /runs/:id`, cancel admin→guest |
| Refaktor względem | Faza 6 / Krok 6.1 (`WYKONANY`) — Users **bez** akcji na koncie; Faza 8 (`WYKONANY`) — Stop wyłącznie owner. MILESTONE 6 / Faza 6 / 8 = historia. Kanon = aktualne docs/SPEC — **nie** treść „Users bez soft / cancel tylko owner” |
| Poza zakresem | Kod Nest/Prisma; Playwright; Soft+Hard na `user`; soft/toggle na `guest`; Cancel admin→guest na archiwum; Stop w floating box; chip demo; awans roli; reset/bulk; edycja major/docs/SPEC; nowa paleta |
| Po implementacji (informacyjnie) | Major FE: Faza 16 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 16. **Edycja major poza tym skillem.** |

**Pass rozwojowy — przesunięcia:** względem HOW majoru (Users UI przed Cancel): **KROK 2** (`startedBy.role` + helper cancel) **przed** UI Users i detail — żeby KROK 4 nie wisiał na typach. API mutacji Users (KROK 1) przed dialogami (KROK 3). **Bez** przenosin między fazami major.

1. **KROK 1** — `deleteUser` / `reactivateUser`.
2. **KROK 2** — `StartedBy.role` + `canCancelRunSnapshot`.
3. **KROK 3** — kolumna Akcje + dialogi (w tym 409→purge).
4. **KROK 4** — `run-details-view` Stop admin→guest.

**HOW:** egzekucja semantyki delete/cancel = API; FE odzwierciedla. Locki guest (Faza 14) **bez zmian**. Skill `content-chain-product-ui` = dziedziczenie locku Fazy 1 na Akcje / Dialogach / Stop.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 — **bez** nowej palety.

**Typy:** granice propsów `readonly`; unia dyskryminowana stanu dialogu Akcji; `unknown` + parser na body `{ ok: true }` / `startedBy`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy; `UserId` branded. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych.

---

## Założenia

- Fazy 1–15 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** zmienia invite/resend/revoke ani Fazy 14 locków.
- Semantyka akcji **po `role` wiersza**, nie po `DEMO_MODE`: przy demo on gość nadal **Usuń** (nigdy toggle).
- `role=admin` na liście: **brak** przycisku Akcje.
- `role=user`: jeden przycisk — aktywny → **Dezaktywuj** (`DELETE` soft); nieaktywny → **Aktywuj** (`PATCH`); **każda** akcja z modalem przed API.
- `role=guest`: **Usuń** → modal trwałe → `DELETE` bez `purge` → przy **409** `GUEST_HAS_ACTIVE_RUN` drugi dialog z `envelope.message` (bez listy runów) → `DELETE ?purge=true` → `reload` listy.
- Błędy Users (Akcje): `EnvelopeError` **w dialogu** (jak revoke invite) — **nie** toast Sonner.
- Copy: dezaktywacja/aktywacja ≠ aktywacja e-mail (`verifiedAt`).
- Cancel: **tylko** szczegóły runu w tym wycinku dla ścieżki admin→guest. **Moje runy** zostają owner-only (F-5b / Konto — bez zmian w tym planie). Archiwum **bez** Stop admin→guest.
- Live SSE detail: nadal tylko **własny** run — admin oglądający cudzy guest run **bez** SSE (historia Fazy 3); Stop i tak przez POST cancel + refresh snapshot.
- Query `purge=true` tylko po confirm drugiego dialogu (po 409). FE **nie** wysyła `purge` „na zapas” przy pierwszym Usuń.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `ApiError` | Istniejący `@/shared/api/*` | `DELETE` / `PATCH` jak `revokeInvitation` — body `{ ok: true }`; 409 → `ApiError` z `envelope.code` |
| React `useState` | Context7 `/reactjs/react.dev` (`useState` setter / null vs value) | Stan dialogu: `AccountAction \| null`; `open={action !== null}` jak revoke |
| Dialog | Istniejący `@/shared/ui/dialog` | Wzorzec `CancelRunDialog` / revoke — `z-(--z-modal)`, Esc zamyka gdy `!pending` |
| Visual | `content-chain-product-ui` | Tabela gęsta; przyciski `size="sm"`; destructive tylko Usuń/purge; **bez** pill cluster / glow / nowej palety |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (F-8 / F-5b).

---

## FAZA 1 — Users Akcje + Cancel admin→guest (detail)

Odpowiada major **Faza 16**.

---

### KROK 1 — Klienci API: `deleteUser` / `reactivateUser`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Cienki klient BFF pod A-10 / A-10a istnieje **zanim** UI wywoła mutacje. Major Faza 16 HOW #1–2; `SPEC-FRONTEND.md` F-8; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/users/api/users.api.ts`
- (opcjonalnie stała kodu) ten sam plik lub `users.types.ts` — `GUEST_HAS_ACTIVE_RUN`

Kolejność w kroku: parser `{ ok: true }` → `deleteUser` → `reactivateUser` → eksport stałej kodu 409.

**Implementacja**

#### `users.api.ts` — `teraz`

```typescript
import { apiFetch } from '@/shared/api/api-fetch';
import { parseUserList, type UserListItem } from '@/modules/users/api/users.types';

export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}
```

#### `users.api.ts` — `zamień na`

```typescript
import type { UserId } from '@content-chain/shared';
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import { parseUserList, type UserListItem } from '@/modules/users/api/users.types';

/** Kod envelope przy hard `guest` + live bez `purge` — F-8 / K-8. */
export const GUEST_HAS_ACTIVE_RUN = 'GUEST_HAS_ACTIVE_RUN' as const;

function parseOkBody(body: unknown): void {
  if (!isRecord(body) || body.ok !== true) {
    throw new Error('Invalid users mutation payload');
  }
}

export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}

export async function deleteUser(
  id: UserId,
  options?: { readonly purge?: boolean },
): Promise<void> {
  const purge = options?.purge === true;
  const path = purge ? `/users/${id}?purge=true` : `/users/${id}`;
  const body = await apiFetch(path, { method: 'DELETE' });
  parseOkBody(body);
}

export async function reactivateUser(id: UserId): Promise<void> {
  const body = await apiFetch(`/users/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ isActive: true }),
  });
  parseOkBody(body);
}
```

**Biblioteki / API:** wzorzec jak `revokeInvitation` (`invitations.api.ts`). Query string ręczny — bez URLSearchParams „dla sztuki”.

**Testy:** brak nowych plików testowych FE w wycinku (Playwright poza zakresem). Smoke manual: soft 200, hard 200, 409 bez purge, 200 z purge (gdy api Faza 21 gotowe).

**DoD kroku:**

- `deleteUser(id)` → `DELETE /api/v1/users/:id` (BFF), body `{ ok: true }`.
- `deleteUser(id, { purge: true })` → `?purge=true`.
- `reactivateUser(id)` → `PATCH` z `{ isActive: true }`.
- `GUEST_HAS_ACTIVE_RUN` wyeksportowane; brak toastów w warstwie API.

---

### KROK 2 — `StartedBy.role` + `canCancelRunSnapshot`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Parser detail akceptuje `startedBy.role`; helper cancel egzekwuje F-5b **zanim** UI detail go użyje. Lista archiwum **bez** wymogu `role` (pole opcjonalne). Major HOW #5; `SPEC-FRONTEND.md` F-5b / F-8; `SPEC-RUNY.md` R-11.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/api/runs.types.ts`
- Nowy: `apps/frontend/src/modules/runs/lib/can-cancel-run-snapshot.ts`

Kolejność: typ `StartedBy` → `parseStartedBy` → helper.

**Implementacja**

#### `StartedBy` — `teraz`

```typescript
export type StartedBy = {
  readonly id: UserId;
  readonly email: string;
};
```

#### `StartedBy` — `zamień na`

```typescript
import type { UserRole } from '@content-chain/shared';

export type StartedBy = {
  readonly id: UserId;
  readonly email: string;
  /** Obecne na `GET /runs/:id` (detail) po api Faza 21; lista archiwum może pominąć. */
  readonly role?: UserRole;
};
```

(Import `UserRole` / `isUserRole` dodać do istniejącego bloku importów z `@content-chain/shared` — **nie** duplikować importa.)

#### `parseStartedBy` — `teraz`

```typescript
export function parseStartedBy(value: unknown): StartedBy | null {
  if (value === null) return null;
  if (!isRecord(value) || typeof value.id !== 'string' || !isUserId(value.id)) {
    throw new Error('Invalid startedBy');
  }
  if (typeof value.email !== 'string' || value.email.length === 0) {
    throw new Error('Invalid startedBy.email');
  }
  return { id: createUserId(value.id), email: value.email };
}
```

#### `parseStartedBy` — `zamień na`

```typescript
export function parseStartedBy(value: unknown): StartedBy | null {
  if (value === null) return null;
  if (!isRecord(value) || typeof value.id !== 'string' || !isUserId(value.id)) {
    throw new Error('Invalid startedBy');
  }
  if (typeof value.email !== 'string' || value.email.length === 0) {
    throw new Error('Invalid startedBy.email');
  }
  const base = { id: createUserId(value.id), email: value.email };
  if (value.role === undefined) {
    return base;
  }
  if (typeof value.role !== 'string' || !isUserRole(value.role)) {
    throw new Error('Invalid startedBy.role');
  }
  return { ...base, role: value.role };
}
```

#### Nowy plik — pełny kod: `can-cancel-run-snapshot.ts`

```typescript
import type { UserId, UserRole } from '@content-chain/shared';
import {
  isCancelableRunStatus,
  type RunSnapshot,
} from '@/modules/runs/api/runs.types';

type CancelSnapshotSlice = Pick<RunSnapshot, 'status' | 'startedBy'>;

/**
 * F-5b: Stop gdy nieterminalny oraz owner **lub** (admin ∧ startedBy.role=guest).
 * Bez `role` na startedBy admin **nie** dostaje Cancel (fail-closed).
 */
export function canCancelRunSnapshot(args: {
  readonly snapshot: CancelSnapshotSlice;
  readonly sessionUserId: UserId;
  readonly sessionRole: UserRole;
}): boolean {
  if (!isCancelableRunStatus(args.snapshot.status)) return false;
  const startedBy = args.snapshot.startedBy;
  if (startedBy === null) return false;
  if (startedBy.id === args.sessionUserId) return true;
  return args.sessionRole === 'admin' && startedBy.role === 'guest';
}
```

**Biblioteki / API:** brak nowych paczek. `isUserRole` już w `packages/shared`.

**Testy:** brak unit FE obowiązkowych; przy ręcznym smoke: archive item bez `role` nadal się parsuje; detail z `role: 'guest'` → helper true dla admina.

**DoD kroku:**

- `StartedBy.role?` opcjonalne; obecność złego `role` → throw parsera.
- Archiwum bez `role` działa jak dziś.
- `canCancelRunSnapshot`: owner OK; admin+guest OK; admin+user/undefined → false; guest cudzy → false.

---

### KROK 3 — `UsersView`: kolumna Akcje + dialogi (toggle / Usuń / purge)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Na liście **Konta** jeden slot Akcje / wiersz wg F-8; flow 409→purge; envelope w dialogu; reload po sukcesie. Major HOW #3–4 / #6; `docs/ux_dashboard.md` „Widok: Użytkownicy”; skill product-ui (dziedziczenie).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/users/components/account-action-dialog.tsx`
- Zmiana: `apps/frontend/src/modules/users/components/users-view.tsx`

Kolejność: typ `AccountAction` + dialog → tabela Akcje + wiring w `UsersAdminView`.

**Implementacja**

#### Nowy plik — pełny kod: `account-action-dialog.tsx`

```typescript
'use client';

import { useState } from 'react';
import type { UserListItem } from '@/modules/users/api/users.types';
import {
  deleteUser,
  GUEST_HAS_ACTIVE_RUN,
  reactivateUser,
} from '@/modules/users/api/users.api';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

export type AccountAction =
  | { readonly kind: 'deactivate'; readonly user: UserListItem }
  | { readonly kind: 'activate'; readonly user: UserListItem }
  | { readonly kind: 'delete-guest'; readonly user: UserListItem }
  | {
      readonly kind: 'purge-guest';
      readonly user: UserListItem;
      readonly message: string;
    };

type AccountActionDialogProps = {
  readonly action: AccountAction | null;
  readonly onOpenChange: (open: boolean) => void;
  /** Po sukcesie API — parent robi `reload()` listy. */
  readonly onSuccess: () => Promise<void>;
  /** Po 409 na Usuń — parent ustawia akcję `purge-guest`. */
  readonly onNeedsPurge: (user: UserListItem, message: string) => void;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function titleFor(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return 'Dezaktywować konto?';
    case 'activate':
      return 'Aktywować konto?';
    case 'delete-guest':
      return 'Usunąć konto gościa?';
    case 'purge-guest':
      return 'Usunąć mimo aktywnego runu?';
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function descriptionFor(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return `Konto ${action.user.email} zostanie dezaktywowane. Runy i opinie zostaną. To nie jest aktywacja e-mail.`;
    case 'activate':
      return `Konto ${action.user.email} zostanie ponownie aktywne. To nie jest aktywacja e-mail.`;
    case 'delete-guest':
      return `Trwałe usunięcie konta gościa ${action.user.email} wraz z treściami. Tej decyzji nie da się cofnąć.`;
    case 'purge-guest':
      return action.message;
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function confirmLabel(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return 'Dezaktywuj';
    case 'activate':
      return 'Aktywuj';
    case 'delete-guest':
    case 'purge-guest':
      return 'Usuń';
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function AccountActionDialog({
  action,
  onOpenChange,
  onSuccess,
  onNeedsPurge,
}: AccountActionDialogProps) {
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  async function confirm(): Promise<void> {
    if (action === null) return;
    setPending(true);
    setEnvelope(null);
    try {
      if (action.kind === 'deactivate') {
        await deleteUser(action.user.id);
      } else if (action.kind === 'activate') {
        await reactivateUser(action.user.id);
      } else if (action.kind === 'delete-guest') {
        await deleteUser(action.user.id);
      } else {
        await deleteUser(action.user.id, { purge: true });
      }
      onOpenChange(false);
      await onSuccess();
    } catch (reason: unknown) {
      if (
        action.kind === 'delete-guest' &&
        reason instanceof ApiError &&
        reason.status === 409 &&
        reason.envelope.code === GUEST_HAS_ACTIVE_RUN
      ) {
        onNeedsPurge(action.user, reason.envelope.message);
        return;
      }
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={action !== null}
      onOpenChange={(next) => {
        if (pending) return;
        if (!next) setEnvelope(null);
        onOpenChange(next);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        {action ? (
          <>
            <DialogHeader>
              <DialogTitle>{titleFor(action)}</DialogTitle>
              <DialogDescription>{descriptionFor(action)}</DialogDescription>
            </DialogHeader>
            {envelope ? (
              <EnvelopeError code={envelope.code} message={envelope.message} />
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => onOpenChange(false)}
              >
                Nie
              </Button>
              <Button
                type="button"
                variant={
                  action.kind === 'delete-guest' || action.kind === 'purge-guest'
                    ? 'destructive'
                    : 'default'
                }
                disabled={pending}
                onClick={() => void confirm()}
              >
                {confirmLabel(action)}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
```

**Uwaga flow 409:** `onNeedsPurge` w parentcie ustawia `action` na `{ kind: 'purge-guest', user, message }` **bez** zamykania na toast — dialog przechodzi na drugi krok (ten sam komponent, inny `kind`). Przy `onNeedsPurge` **nie** czyść `pending` zanim parent podmieni akcję (finally i tak zwolni pending).

#### `users-view.tsx` — fragment: importy + stan — dopisz

```typescript
import {
  AccountActionDialog,
  type AccountAction,
} from '@/modules/users/components/account-action-dialog';
```

W `UsersAdminView`:

```typescript
const [accountAction, setAccountAction] = useState<AccountAction | null>(null);
```

#### Tabela Konta — nagłówek — `teraz`

```tsx
<tr className="border-b text-xs text-muted-foreground">
  <th className="py-2 pr-3 font-medium">Email</th>
  <th className="py-2 pr-3 font-medium">Rola</th>
  <th className="py-2 pr-3 font-medium">Aktywne</th>
  <th className="py-2 font-medium">Utworzono</th>
</tr>
```

#### Tabela Konta — nagłówek — `zamień na`

```tsx
<tr className="border-b text-xs text-muted-foreground">
  <th className="py-2 pr-3 font-medium">Email</th>
  <th className="py-2 pr-3 font-medium">Rola</th>
  <th className="py-2 pr-3 font-medium">Aktywne</th>
  <th className="py-2 pr-3 font-medium">Utworzono</th>
  <th className="py-2 font-medium">Akcje</th>
</tr>
```

#### Wiersz konta — `teraz`

```tsx
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
```

#### Wiersz konta — `zamień na`

```tsx
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
```

#### Po Dialog revoke — dopisz `AccountActionDialog`

```tsx
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
```

**Biblioteki / API:** Dialog jak revoke / `CancelRunDialog`. Context7: stan `null | AccountAction` = controlled open.

**Visual:** dziedziczenie tokenów; gęsta tabela; destructive tylko hard/purge.

**Testy:** smoke manual — admin: brak przycisku; user Dezaktywuj→Aktywuj; guest Usuń; live guest 409→drugi dialog→purge; błąd 403 → `message` w dialogu.

**DoD kroku:**

- Kolumna Akcje wg roli; admin bez przycisku; guest nigdy toggle.
- Modal przed każdą mutacją; 409→purge bez listy runów; sukces → reload.
- Błędy w dialogu, nie toast. Invite/resend/revoke **bez regresji**.

---

### KROK 4 — `run-details-view`: Stop owner **lub** admin→guest

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Przycisk Stop na szczegółach zgodny z F-5b po api z `startedBy.role`. **Bez** zmian archiwum i **bez** Stop admina na Moich runach cudzych (Moje runy = tylko własne). Major HOW #5–6.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx`

**Implementacja**

#### Import — dopisz

```typescript
import { canCancelRunSnapshot } from '@/modules/runs/lib/can-cancel-run-snapshot';
```

(Usuń nieużywany `isCancelableRunStatus` z importu, jeśli po zmianie nie jest używany w pliku.)

#### `canCancel` — `teraz`

```typescript
const own =
  view.status === 'ready' &&
  session.status === 'authenticated' &&
  view.snapshot.startedBy !== null &&
  view.snapshot.startedBy.id === session.user.id;
// ...
const canCancel = own && isCancelableRunStatus(snapshot.status);
```

#### `canCancel` — `zamień na`

Zachowaj `own` (SSE / live). Oblicz `canCancel` **po** gotowym `snapshot`:

```typescript
const canCancel =
  session.status === 'authenticated' &&
  canCancelRunSnapshot({
    snapshot,
    sessionUserId: session.user.id,
    sessionRole: session.user.role,
  });
```

Reszta JSX Stop + `CancelRunDialog` **bez zmian** (ten sam modal „Czy na pewno?”; toast cancel jak dziś przez dialog).

**Uwaga:** `live` / SSE nadal zależą od `own` — admin na cudzym guest runie widzi Stop, ale **nie** stream SSE (zgodnie z historią Fazy 3). Po cancel: `onCancelled` + `reloadDetails` jak dziś.

**Testy:** smoke — owner Stop; admin na detail guest Stop; admin na detail user **bez** Stop; archiwum bez nowego Stop.

**DoD kroku:**

- Warunek F-5b na detail.
- Brak Cancel admin→guest na archiwum / floating box.
- Moje runy: bez zmian (owner-only).

---

#### Propozycja commit message

```text
feat(frontend): allow admin user toggle, guest purge, and cancel guest runs

Surface account actions on Users and extend run-detail Stop for admin when
startedBy is guest, matching the users-management API contract.
```

---

## Weryfikacja wycinka

| Kryterium | Spełnienie |
|-----------|------------|
| Kotwica major FE Faza 16 | Cała FAZA 1 = HOW tej fazy |
| docs / SPEC | F-8 Akcje; F-5b Cancel detail; A-10/A-10a tylko przez API |
| Kompletny kod nowych plików | `account-action-dialog.tsx`, `can-cancel-run-snapshot.ts` |
| Refaktory | Fragmenty `teraz` → `zamień na` |
| Pass rozwojowy | Typy/API przed UI; `role` przed Cancel UI |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, koniec FAZA 1 |
| Statusy | `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC | Nietknięte w tej sesji |
| Sekrety | Brak |
| Product UI | Dziedziczenie locku; bez nowej palety |

**Checklist DoD (po implementacji, poza tą sesją):**

- [ ] Toggle `user` + Usuń/purge `guest` na Kontach
- [ ] 409 → drugi dialog → `purge=true` → reload
- [ ] Envelope `message` w dialogu Users
- [ ] Parse `startedBy.role`; Stop admin→guest tylko detail
- [ ] Brak Soft+Hard na `user`; brak toggle na `guest`; brak Cancel na archiwum
- [ ] Faza 14 locki guest bez regresji

---

## Ślad do major (informacyjnie — po implementacji)

| Artefakt | Po implementacji tego HOW |
|----------|---------------------------|
| `content-chain-frontend_major_plan.md` **Faza 16** | `WYKONANY` (DoD gate + ten plan) |
| MILESTONE 16 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 6 / 6.1 / Faza 8 / MILESTONE 6 | Historia — **bez** edycji |
| Backend Faza 21 | Osobny ślad (api); FE zakłada kontrakt z docs/SPEC / feature-plan BE |

Edycja statusów major = **poza** tym skillem (ręcznie lub w sesji `/feature-implementation` na życzenie użytkownika).
