# Content Chain — feature plan: Konto auth self-service V1 (Faza 31 FE)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-31-auth-self-service-frontend.md`  
**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 31** (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 31) — widok **Konto**: confirm e-mail (`pendingEmail` + resend + deep link `/?emailChangeToken=`), zmiana hasła (`PATCH /auth/me/password` → landing), usuwanie własnego konta (`DELETE /auth/me` + purge guest jak Users; **admin** bez CTA).  
**Źródła:** `docs/ux_dashboard.md` (Konto — Email / Hasło / Usuń konto), `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `SPEC-FRONTEND.md` F-8, `SPEC-AUTH.md` A-3a…A-3e, `SPEC-KOMUNIKACJA.md` K-2d / K-8, `SPEC-BEZPIECZENSTWO.md` B-8a, major FE Faza 31.  
**Skill UI:** `content-chain-product-ui` — Design Read: *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; sekcje Konto + Dialogi jak istniejący re-auth email; bez nowej palety / dual-mode / next-intl.*  
**Numer FE 31 ≠ BE 32** — kontrakt api = `content-chain-backend_major_plan.md` Faza 32 (w repo api trasy V1 już istnieją — FE konsumuje kontrakt).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 31 majoru FE (kroki 31.1–31.3) |
| Major | Faza 31 (gate); HOW: KROK 1–4 poniżej |
| Poza zakresem | Implementacja api / env mailer; dual-mode / next-intl; forgot-password; self-delete `admin`; panel admin; self-service przez Users; przepisywanie Fazy 5 / 9 / 12 / 14 / 16 (`WYKONANY`); MILESTONE 31; Playwright jako suite |
| Zależność BE | `content-chain-backend_major_plan.md` **Faza 32** — `pendingEmail`, `POST /auth/confirm-email-change`, `POST /auth/me/email/resend-confirm`, `PATCH /auth/me/password`, `DELETE /auth/me`. **Przed** merge FE na produkcję: api musi spełniać A-3a…A-3e |
| Pass rozwojowy | typy/klienci → confirm UI + deep link → hasło → delete + regresja; **brak** przesunięć między fazami major |
| Po implementacji (informacyjnie) | Major FE: Faza 31 → `WYKONANY`; kroki 31.1–31.3 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 31) |

**Refaktor względem (historia, bez edycji `WYKONANY`):** Faza 5 / Krok 5.3.1 oraz Faza 9 (email + re-auth **bez** confirm / bez hasła / bez delete); Faza 12 (`activationToken` ≠ `emailChangeToken`); Faza 14 (guest lock email); Faza 16 (purge guest na Users ≠ self-service).

**Mapa major → ten plik**

| Major (gate) | Feature | Zakres |
|--------------|---------|--------|
| 31.1 Confirm e-mail | FAZA 1 / KROK 1–2 | parser + klienci + `AccountEmailForm` + deep link |
| 31.2 Hasło | FAZA 1 / KROK 1 + 3 | klient + sekcja/modal hasła |
| 31.3 Usuń konto | FAZA 1 / KROK 1 + 4 | klient + CTA/modale + regresja |

**Pass rozwojowy (sesja planu):**

1. `SessionUser.pendingEmail` + klienci HTTP **przed** UI confirm / hasło / delete.
2. Pending + resend + deep link **przed** hasłem/delete (współdzielą sesję / `setAuthenticated`).
3. Hasło i delete niezależne od siebie — po wspólnych klientach.
4. Regresja (9 / 12 / 14 / 16) w DoD KROK 4.
5. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack FE: Next.js **16.3.0**, React **19.2.8** — istniejący `apiFetch` / `ApiError` / `Dialog` / `FormField` / `notifyProduct` / `passwordMeetsPolicy` / `useSession` — **bez** nowych paczek.
- `GET /auth/me` i odpowiedzi mutacji email/resend niosą **`pendingEmail`**: `string` \| `null`. Confirm publiczny zwraca `{ id, email, role }` **bez** pola — parser ustawia `pendingEmail: null` gdy brak.
- Re-auth modal Fazy 9 **zostaje** przed `PATCH /auth/me/email`; V1 zmienia tylko skutek sukcesu (pending + copy/toast).
- Deep link confirm: **`/?emailChangeToken=`** — **nie** `activationToken` (Faza 12). Sesja cookie **zostaje**; po sukcesie toast + odświeżenie `/me` gdy zalogowany.
- Sukces hasła / delete: Clear-Cookie po stronie api → FE `clear()` + `router.replace('/')` (wzorzec `LogoutDialog`; **bez** wymogu `logoutSession` — cookies już wyczyszczone).
- `INVALID_PASSWORD` → `message` pod polem aktualnego hasła; **bez** cyklu F-4a / wylogowania.
- Admin: CTA „Usuń konto” **ukryte**; API i tak **403**.
- Guest: email lock (Faza 14) **bez zmian**; hasło i delete **dozwolone** (demo on).
- Typy: `import type`; brak `any` / `@ts-ignore`; unie dyskryminowane stanów formularzy.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.
- Visual: dziedziczenie locku Fazy 22–23; **bez** nowej palety.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| `useSearchParams` + `router.replace` | Context7 `/vercel/next.js` v16.3.x (`useSearchParams`, App Router) | Client Component: `searchParams.get('…')`; `router.replace` z `next/navigation` czyści query bez historii | Deep link `emailChangeToken` w `home-entry.tsx` (obok `activationToken`); capture raw **przed** `replace` |
| Form submit / Dialog | lokalny `account-email-form.tsx`, `logout-dialog.tsx` | Re-auth = Dialog + `FormField`; sukces sesji = `setAuthenticated` / `clear` | Reuse wzorca; hasło i delete = nowe komponenty sekcji |
| Polityka haseł FE | lokalny `password-policy.ts` + register/bootstrap | `passwordMeetsPolicy` przed submitem; confirm tylko UI | To samo na `newPassword` |
| Envelope | lokalny `ApiError` / F-7 | UI = `message`; `code` do gałęzi (`INVALID_PASSWORD`, `GUEST_HAS_ACTIVE_RUN`, `MAIL_DELIVERY_FAILED`) | Bez mapy tłumaczeń |

---

## FAZA 1 — Konto: auth self-service V1

Odpowiada major FE Faza 31 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Typy `/me` (`pendingEmail`) + klienci API

**Status:** `WYKONANY`

**Cel:** FE rozumie `pendingEmail` i woła trasy V1 confirm / resend / password / delete. Major 31 HOW pkt 1; `SPEC-AUTH.md` A-3a…A-3e; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/api/session.types.ts`
- Zmiana: `apps/frontend/src/modules/auth/api/auth.api.ts`

#### Refaktor — `SessionUser` + parser

**teraz:**

```typescript
export type SessionUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
};

export function parseSessionUser(value: unknown): SessionUser {
  if (!isRecord(value)) {
    throw new Error('Invalid session payload');
  }
  const { id, email, role } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid session user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid session email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid session role');
  }
  return { id: createUserId(id), email, role };
}
```

**zamień na:**

```typescript
export type SessionUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  /** Pending address after PATCH /auth/me/email (V1); null when none. */
  readonly pendingEmail: string | null;
};

export function parseSessionUser(value: unknown): SessionUser {
  if (!isRecord(value)) {
    throw new Error('Invalid session payload');
  }
  const { id, email, role, pendingEmail } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid session user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid session email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid session role');
  }
  // /me + resend: string | null; public confirm may omit → null
  if (
    !(
      pendingEmail === undefined ||
      pendingEmail === null ||
      typeof pendingEmail === 'string'
    )
  ) {
    throw new Error('Invalid session pendingEmail');
  }
  return {
    id: createUserId(id),
    email,
    role,
    pendingEmail: pendingEmail === undefined ? null : pendingEmail,
  };
}
```

#### Refaktor — dopiski w `auth.api.ts` (po `patchOwnEmail`)

**Dodaj** (pełne nowe funkcje):

```typescript
export const GUEST_HAS_ACTIVE_RUN = 'GUEST_HAS_ACTIVE_RUN' as const;

export async function confirmEmailChange(token: string): Promise<SessionUser> {
  const body = await apiFetch('/auth/confirm-email-change', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
    skipAuthRefresh: true,
  });
  return parseSessionUser(body);
}

export async function resendEmailChangeConfirm(): Promise<SessionUser> {
  const body = await apiFetch('/auth/me/email/resend-confirm', {
    method: 'POST',
  });
  return parseSessionUser(body);
}

export async function patchOwnPassword(input: {
  readonly currentPassword: string;
  readonly newPassword: string;
}): Promise<void> {
  await apiFetch('/auth/me/password', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
    }),
  });
}

export async function deleteOwnAccount(input: {
  readonly currentPassword: string;
  readonly purge?: boolean;
}): Promise<void> {
  const path =
    input.purge === true ? '/auth/me?purge=true' : '/auth/me';
  await apiFetch(path, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ currentPassword: input.currentPassword }),
  });
}
```

**Uwagi:**

- `patchOwnEmail` / `fetchUserSession` zostają — już wołają `parseSessionUser` (po refaktorze dostaną `pendingEmail`).
- `GUEST_HAS_ACTIVE_RUN` w `auth.api.ts` (ta sama literałowa wartość co Users / A-3e; **bez** importu z `users.api`).

**DoD kroku:**

- `SessionUser` ma `pendingEmail`; parser akceptuje `string` \| `null` \| brak.
- Cztery nowe funkcje API jak wyżej; `tsc` / typy bez `any`.
- Istniejące wywołania `parseSessionUser` / `parseAuthUserWrapper` nadal kompilują (wrapper login **bez** `pendingEmail` → `null`).

---

### KROK 2 — Confirm e-mail: pending + resend + deep link

**Status:** `WYKONANY`

**Cel:** Po sukcesie `PATCH /auth/me/email` UI pokazuje pending; resend; deep link `emailChangeToken` → toast + `/me`. Bez regresji re-auth Fazy 9 / 409 / guest lock. Major 31.1; `SPEC-FRONTEND.md` F-8; `docs/ux_dashboard.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/account-email-form.tsx`
- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx`

#### Refaktor — sukces `onConfirm` w `AccountEmailForm`

**teraz** (sukces):

```typescript
      await patchOwnEmail({
        email: form.modalEmail.trim(),
        currentPassword: form.modalPassword,
      });
      const user = await fetchUserSession();
      setAuthenticated(user);
      setForm((prev) => ({
        ...prev,
        email: user.email,
        open: false,
        modalPassword: '',
      }));
```

**zamień na:**

```typescript
      await patchOwnEmail({
        email: form.modalEmail.trim(),
        currentPassword: form.modalPassword,
      });
      const user = await fetchUserSession();
      setAuthenticated(user);
      setForm((prev) => ({
        ...prev,
        email: user.email,
        open: false,
        modalPassword: '',
      }));
      if (user.pendingEmail !== null) {
        notifyProduct({
          kind: 'success',
          title: `Wysłaliśmy link potwierdzający na ${user.pendingEmail}.`,
          id: 'email-change-pending',
        });
      }
```

(import `notifyProduct` z `@/modules/notifications/notify-product`).

#### Refaktor — UI pending + resend (pod formularzem email / zamiast go gdy pending)

Po bloku guest-locked, **przed** formularzem „Zapisz email”, gdy `state.user.pendingEmail !== null`:

```tsx
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm">
          Email: <span className="font-medium">{current}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Czekamy na potwierdzenie adresu{' '}
          <span className="font-medium">{state.user.pendingEmail}</span>.
          Sprawdź skrzynkę i kliknij link z wiadomości.
        </p>
        <Button
          type="button"
          variant="outline"
          disabled={resendPending}
          onClick={() => void onResendConfirm()}
        >
          Wyślij ponownie
        </Button>
        {resendError ? (
          <p className="text-sm text-destructive" role="alert">
            {resendError}
          </p>
        ) : null}
      </div>
```

`onResendConfirm`: `resendEmailChangeConfirm()` → `setAuthenticated` → toast sukcesu (`Wysłaliśmy ponownie link potwierdzający.`, id `email-change-resend`); **503** `MAIL_DELIVERY_FAILED` / **409** → `message` pod przyciskiem (**bez** wylogowania).

Gdy `pendingEmail !== null` — **ukryj** formularz zmiany emaila (pending jest jedynym stanem do domknięcia; kolejna zmiana = po confirm albo gdy pending wygaśnie / zostanie wyczyszczony po stronie api). Gdy `pendingEmail === null` — dotychczasowy formularz + modal re-auth **bez zmian** (409 / `INVALID_PASSWORD` jak Faza 9).

Gałąź **503** na `patchOwnEmail` (pending zapisany, mail padł): envelope `message` pod hasłem lub alert w modalu; modal może zostać otwarty — potem `fetchUserSession` i tak może pokazać pending; minimalnie: pokaż `message`, zamknij lub zostaw modal; **preferuj**: po 503 wywołaj `fetchUserSession` + `setAuthenticated` (pending w DB) + pokaż `message` poza modalem / pod resend. Shortcut: `shortcut: 503 po PATCH traktuj jak pending + message, bez osobnego flow recovery poza resend`.

#### Refaktor — `home-entry.tsx`: deep link `emailChangeToken`

1. **Nie** przekierowuj zalogowanego na `/account`, dopóki w URL jest `emailChangeToken` (race z efektem confirm).

**teraz:**

```typescript
  useEffect(() => {
    if (state.status === 'authenticated') {
      router.replace('/account');
    }
  }, [router, state.status]);
```

**zamień na:**

```typescript
  useEffect(() => {
    if (state.status !== 'authenticated') return;
    if (searchParams.get('emailChangeToken')) return;
    router.replace('/account');
  }, [router, searchParams, state.status]);
```

2. **Nowy** efekt (obok activation; osobny `useRef` `emailChangeStarted`):

```typescript
  useEffect(() => {
    if (state.status === 'loading') return;
    if (emailChangeStarted.current) return;
    const raw = searchParams.get('emailChangeToken');
    if (raw === null || raw.length === 0) return;

    emailChangeStarted.current = true;
    const wasAuthenticated = state.status === 'authenticated';
    router.replace(wasAuthenticated ? '/account' : '/');

    void confirmEmailChange(raw)
      .then(async (user) => {
        notifyProduct({
          kind: 'success',
          title: 'Adres e-mail potwierdzony.',
          id: 'email-change-confirmed',
        });
        if (wasAuthenticated) {
          const fresh = await fetchUserSession();
          setAuthenticated(fresh);
          return;
        }
        // anonymous: confirm applied; no Set-Cookie — leave landing
        void user;
      })
      .catch((reason: unknown) => {
        const message =
          reason instanceof ApiError
            ? reason.envelope.message
            : 'Nie udało się potwierdzić adresu e-mail.';
        notifyProduct({
          kind: 'error',
          envelope: {
            code:
              reason instanceof ApiError
                ? reason.envelope.code
                : 'INTERNAL_ERROR',
            message,
          },
          id: 'email-change-confirm-failed',
        });
      });
  }, [router, searchParams, state.status, setAuthenticated]);
```

Wymaga `setAuthenticated` z `useSession` w `HomeEntryInner` (dziś tylko `state`).

**Zakaz:** mylenia z `activationToken` / `activateAccount` / toastu „Konto aktywowane…”.

**DoD kroku:**

- Pending widoczny z `pendingEmail`; resend działa; deep link → toast + świeże `/me` gdy sesja.
- Faza 9: re-auth, `INVALID_PASSWORD`, **409** — bez regresji.
- Faza 12: `activationToken` nietknięty semantycznie.
- Guest lock email (Faza 14) nietknięty.

---

### KROK 3 — Zmiana hasła na Koncie

**Status:** `WYKONANY`

**Cel:** Sekcja Hasło → modal (aktualne + nowe + confirm UI) → `PATCH /auth/me/password` → landing. Major 31.2; F-8; A-3d.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/account-password-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx` (montaż sekcji)

#### Nowy plik — pełny kod

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { patchOwnPassword } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';
const POLICY_HINT =
  'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).';

type PasswordFormState = {
  open: boolean;
  currentPassword: string;
  newPassword: string;
  confirm: string;
  pending: boolean;
  currentError: string | null;
  newError: string | null;
};

const INITIAL: PasswordFormState = {
  open: false,
  currentPassword: '',
  newPassword: '',
  confirm: '',
  pending: false,
  currentError: null,
  newError: null,
};

export function AccountPasswordForm() {
  const router = useRouter();
  const { state, clear } = useSession();
  const [form, setForm] = useState<PasswordFormState>(INITIAL);

  if (state.status !== 'authenticated') return null;

  function openModal(): void {
    setForm({ ...INITIAL, open: true });
  }

  function closeWithoutApi(): void {
    if (form.pending) return;
    setForm(INITIAL);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (form.pending) return;

    if (form.newPassword !== form.confirm) {
      setForm((prev) => ({
        ...prev,
        newError: 'Hasła muszą być identyczne.',
        currentError: null,
      }));
      return;
    }
    if (!passwordMeetsPolicy(form.newPassword)) {
      setForm((prev) => ({
        ...prev,
        newError: POLICY_HINT,
        currentError: null,
      }));
      return;
    }

    void (async () => {
      setForm((prev) => ({
        ...prev,
        pending: true,
        currentError: null,
        newError: null,
      }));
      try {
        await patchOwnPassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        clear();
        setForm(INITIAL);
        router.replace('/');
      } catch (reason: unknown) {
        if (!(reason instanceof ApiError)) {
          setForm((prev) => ({
            ...prev,
            currentError: FALLBACK_MESSAGE,
            pending: false,
          }));
          return;
        }
        const { code, message } = reason.envelope;
        if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
          // INVALID_PASSWORD → current; VALIDATION_FAILED (policy) → new
          if (code === 'INVALID_PASSWORD') {
            setForm((prev) => ({
              ...prev,
              currentError: message,
              pending: false,
            }));
            return;
          }
          setForm((prev) => ({
            ...prev,
            newError: message,
            pending: false,
          }));
          return;
        }
        setForm((prev) => ({
          ...prev,
          currentError: message,
          pending: false,
        }));
      }
    })();
  }

  return (
    <>
      <div className="flex max-w-xl flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Po zmianie hasła wrócisz na stronę główną i zalogujesz się ponownie.
        </p>
        <Button type="button" variant="outline" onClick={openModal}>
          Zmień hasło
        </Button>
      </div>

      <Dialog
        open={form.open}
        onOpenChange={(next) => {
          if (form.pending) return;
          if (!next) closeWithoutApi();
          else setForm((prev) => ({ ...prev, open: true }));
        }}
      >
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Zmiana hasła</DialogTitle>
              <DialogDescription>
                Podaj aktualne hasło i nowe. Sesja zostanie zakończona po sukcesie.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3">
              <FormField label="Aktualne hasło" htmlFor="account-current-password">
                <Input
                  id="account-current-password"
                  type="password"
                  autoComplete="current-password"
                  value={form.currentPassword}
                  disabled={form.pending}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      currentPassword: event.target.value,
                    }))
                  }
                  required
                />
              </FormField>
              {form.currentError ? (
                <p className="text-sm text-destructive" role="alert">
                  {form.currentError}
                </p>
              ) : null}

              <FormField label="Nowe hasło" htmlFor="account-new-password">
                <Input
                  id="account-new-password"
                  type="password"
                  autoComplete="new-password"
                  value={form.newPassword}
                  disabled={form.pending}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      newPassword: event.target.value,
                    }))
                  }
                  required
                />
              </FormField>
              <FormField label="Powtórz nowe hasło" htmlFor="account-confirm-password">
                <Input
                  id="account-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={form.confirm}
                  disabled={form.pending}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      confirm: event.target.value,
                    }))
                  }
                  required
                />
              </FormField>
              {form.newError ? (
                <p className="text-sm text-destructive" role="alert">
                  {form.newError}
                </p>
              ) : null}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={form.pending}
                onClick={closeWithoutApi}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={form.pending}>
                Zapisz hasło
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

#### Refaktor — montaż w `account-view.tsx`

Po sekcji Email, **przed** Start runu:

```tsx
      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Hasło</h2>
        <AccountPasswordForm />
      </section>
```

(import `AccountPasswordForm`).

**DoD kroku:**

- Admin / user / guest (demo): mogą zmienić hasło.
- `INVALID_PASSWORD` → sesja zostaje, modal otwarty, `message` pod aktualnym.
- Sukces → `/` + stan anonymous (Clear-Cookie api).
- Confirm tylko UI; polityka na `newPassword` jak register.

---

### KROK 4 — Usuń konto + regresja 9 / 12 / 14 / 16

**Status:** `WYKONANY`

**Cel:** CTA destrukcyjne + re-auth → `DELETE /auth/me`; guest live → drugi krok purge jak Faza 16; admin bez CTA; Users ≠ self-service. Major 31.3; F-8; A-3e.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/account-delete-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx`
- Audyt (zero lub minimalny diff): Users / activate / guest email — DoD regresji

#### Nowy plik — pełny kod

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import {
  deleteOwnAccount,
  GUEST_HAS_ACTIVE_RUN,
} from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';

type DeletePhase =
  | { readonly kind: 'closed' }
  | {
      readonly kind: 'reauth';
      readonly currentPassword: string;
      readonly pending: boolean;
      readonly passwordError: string | null;
    }
  | {
      readonly kind: 'purge';
      readonly currentPassword: string;
      readonly message: string;
      readonly pending: boolean;
      readonly passwordError: string | null;
    };

export function AccountDeleteForm() {
  const router = useRouter();
  const { state, clear } = useSession();
  const [phase, setPhase] = useState<DeletePhase>({ kind: 'closed' });

  if (state.status !== 'authenticated') return null;
  if (state.user.role === 'admin') return null;

  const isGuest = state.user.role === 'guest';

  function openReauth(): void {
    setPhase({
      kind: 'reauth',
      currentPassword: '',
      pending: false,
      passwordError: null,
    });
  }

  function close(): void {
    if (phase.kind !== 'closed' && phase.pending) return;
    setPhase({ kind: 'closed' });
  }

  async function runDelete(purge: boolean, currentPassword: string): Promise<void> {
    setPhase((prev) =>
      prev.kind === 'closed'
        ? prev
        : { ...prev, pending: true, passwordError: null },
    );
    try {
      await deleteOwnAccount({ currentPassword, purge });
      clear();
      setPhase({ kind: 'closed' });
      router.replace('/');
    } catch (reason: unknown) {
      if (
        !purge &&
        isGuest &&
        reason instanceof ApiError &&
        reason.status === 409 &&
        reason.envelope.code === GUEST_HAS_ACTIVE_RUN
      ) {
        setPhase({
          kind: 'purge',
          currentPassword,
          message: reason.envelope.message,
          pending: false,
          passwordError: null,
        });
        return;
      }
      const message =
        reason instanceof ApiError ? reason.envelope.message : FALLBACK_MESSAGE;
      setPhase((prev) =>
        prev.kind === 'closed'
          ? prev
          : { ...prev, pending: false, passwordError: message },
      );
    }
  }

  function onReauthSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (phase.kind !== 'reauth' || phase.pending) return;
    void runDelete(false, phase.currentPassword);
  }

  function onPurgeConfirm(): void {
    if (phase.kind !== 'purge' || phase.pending) return;
    void runDelete(true, phase.currentPassword);
  }

  const open = phase.kind !== 'closed';

  return (
    <section className="flex max-w-xl flex-col gap-3">
      <h2 className="text-base font-medium">Usuń konto</h2>
      <div className="flex max-w-xl flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          {isGuest
            ? 'Trwale usuniesz konto demonstracyjne i powiązane treści. Tej decyzji nie da się cofnąć.'
            : 'Konto zostanie dezaktywowane. Runy i opinie zostaną. Tej decyzji nie da się cofnąć z poziomu Konta.'}
        </p>
        <Button type="button" variant="destructive" onClick={openReauth}>
          Usuń konto
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) close();
        }}
      >
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          {phase.kind === 'reauth' ? (
            <form className="flex flex-col gap-4" onSubmit={onReauthSubmit}>
              <DialogHeader>
                <DialogTitle>Usunąć konto?</DialogTitle>
                <DialogDescription>
                  Podaj aktualne hasło, żeby potwierdzić usunięcie.
                </DialogDescription>
              </DialogHeader>
              <FormField label="Aktualne hasło" htmlFor="account-delete-password">
                <Input
                  id="account-delete-password"
                  type="password"
                  autoComplete="current-password"
                  value={phase.currentPassword}
                  disabled={phase.pending}
                  onChange={(event) =>
                    setPhase({
                      ...phase,
                      currentPassword: event.target.value,
                    })
                  }
                  required
                />
              </FormField>
              {phase.passwordError ? (
                <p className="text-sm text-destructive" role="alert">
                  {phase.passwordError}
                </p>
              ) : null}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={phase.pending}
                  onClick={close}
                >
                  Anuluj
                </Button>
                <Button type="submit" variant="destructive" disabled={phase.pending}>
                  Usuń
                </Button>
              </DialogFooter>
            </form>
          ) : null}

          {phase.kind === 'purge' ? (
            <>
              <DialogHeader>
                <DialogTitle>Usunąć mimo aktywnego runu?</DialogTitle>
                <DialogDescription>{phase.message}</DialogDescription>
              </DialogHeader>
              {phase.passwordError ? (
                <p className="text-sm text-destructive" role="alert">
                  {phase.passwordError}
                </p>
              ) : null}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={phase.pending}
                  onClick={close}
                >
                  Nie
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={phase.pending}
                  onClick={onPurgeConfirm}
                >
                  Usuń
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
```

#### Refaktor — `account-view.tsx`

Po sekcji Hasło:

```tsx
      <AccountDeleteForm />
```


#### Regresja (checklist DoD — bez przepisywania historii)

| Historia | Oczekiwanie |
|----------|-------------|
| Faza 9 | Re-auth email + `INVALID_PASSWORD` / 409 bez zmian poza pending V1 |
| Faza 12 | `activationToken` / activate / thank-you — **osobny** flow |
| Faza 14 | Guest: email zablokowany; hasło/delete dostępne |
| Faza 16 | Users toggle/Usuń/purge **bez** self-service `DELETE /auth/me`; Konto **nie** woła `DELETE /users/:id` |

**DoD kroku:**

- `user` / `guest`: delete → landing; guest live → purge confirm z `message` envelope.
- `admin`: brak CTA.
- Users bez ścieżki self-delete z Konta.
- Regresja tabeli powyżej spełniona.

---

#### Propozycja commit message

```text
feat(account): add email confirm, password change, and self-delete

Close the V1 Konto self-service loop against pendingEmail and Clear-Cookie
auth routes without touching admin Users flows.
```

---

## Weryfikacja wycinka

| Kryterium | Sprawdzenie |
|-----------|-------------|
| Kotwica major 31.1–31.3 | KROK 2 / 3 / 4 |
| F-8 / A-3a…A-3e | pending + deep link; password landing; delete + admin hide |
| Nie mylić activate ↔ confirm | osobne query + klienci |
| Reuse | Dialog / FormField / passwordMeetsPolicy / notifyProduct / clear+replace |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit EN | Conventional Commits na końcu FAZA 1 |
| Major nietknięty | tylko ślad poniżej |
| Bez planów pomocniczych w rootcie | brak odwołań |

**DoD techniczne wycinka (obserwowalne):**

1. Zalogowany zmienia email → widzi pending + toast; resend działa; `/?emailChangeToken=` potwierdza i odświeża email.
2. Zmiana hasła → `/` + ponowny login; złe aktualne hasło → `message`, sesja zostaje.
3. Delete own (nie-admin) → `/`; guest z live → drugi krok purge; admin bez CTA.
4. `pnpm` typecheck / lint dotkniętych plików FE przechodzi.

---

## Ślad do major (informacyjnie, po implementacji)

Po ręcznym `/feature-implementation` (poza tą sesją) użytkownik może oznaczyć w `content-chain-frontend_major_plan.md`:

- Faza 31 → `WYKONANY`
- Krok 31.1 / 31.2 / 31.3 → `WYKONANY`
- **Bez** MILESTONE 31 / **bez** `OSIĄGNIĘTY`

Backend Faza 32 = osobny tor (ten plan jej **nie** oznacza).
)
