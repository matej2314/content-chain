# Content Chain — feature plan: Faza 9 (Modal re-auth przy zmianie emaila)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Konto: „Zapisz email” → Dialog re-auth → `PATCH /auth/me/email` `{ email, currentPassword }`; `INVALID_PASSWORD` bez F-4a; recovery **409**; sukces bez toastu |
| Major | `content-chain-frontend_major_plan.md` — **Faza 9** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 9 |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 9) |
| Kolejność KROK ≠ major | Major nie ma 9.1/9.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md` (Konto / Email), `docs/dokumentacja_komunikacji.md` (`PATCH /auth/me/email`), `SPEC-FRONTEND.md` F-4a / F-7 / F-8, `SPEC-AUTH.md` A-3b, `SPEC-KOMUNIKACJA.md` K-2d |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-13-reauth-email.md`. FE **nie** implementuje Nest/Prisma |
| Refaktor względem | Faza 5 / Podkrok 5.3.1 (`WYKONANY`) — `PATCH /auth/me` `{ email }` bez modala. MILESTONE 5 = historia. Kanon = aktualne docs/SPEC, **nie** treść 5.3.1 |
| Poza zakresem | Kod BE; toast sukcesu / 409; confirm e-mail (V1); zmiana hasła; Playwright; nowa paleta; `tsconfig`; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major FE: Faza 9 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 9. **Edycja major poza tym skillem.** |

**Pass rozwojowy:** brak przesunięć — UI (KROK 2) używa wyłącznie `apiFetch` + `patchOwnEmail` z KROK 1.

**HOW:** reuse `Dialog` (wzorzec `CancelRunDialog` / `LogoutDialog`); envelope `code` + `message` as-is pod polami; **bez** `notifyProduct` przy emailu.

**Design Read:** self-host dashboard, calm B2B, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`).

**Typy:** granice propsów `readonly`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

---

## Założenia

- Fazy 1–8 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 5 / MILESTONE 5.
- „Zapisz email” **zawsze** otwiera modal (także gdy draft = obecny email). CTA **nie** jest `disabled` wyłącznie dlatego, że `email === current`.
- Każdy Potwierdź → `PATCH /api/v1/auth/me/email` z **obu** pól; brak stanu „już zweryfikowany”.
- **401** `INVALID_PASSWORD` / **400** `VALIDATION_FAILED` (hasło) → envelope **pod polem hasła**; stan `disabled` emaila w modalu **bez zmian**; **bez** refresh / `unauthorizedHandler` / wylogowania.
- **409** `CONFLICT` → modal **otwarty**; clear email + hasło w modalu; **odblokowanie** inputu email; envelope **pod emailem**; kolejny Potwierdź znowu z hasłem.
- Sukces → close modal, `GET /auth/me` → `setAuthenticated`, aktualizacja draftu na Koncie, **bez** toastu i bez lokalnego „Zapisano…”.
- Anuluj / zamknięcie bez Potwierdź → **zero** API; draft formularza Konta = wartość z momentu otwarcia modala (edycja w modalu po 409 **nie** wraca na formularz).
- Skill UI: bez drugiej palety; overlay = istniejący kit `Dialog`.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| Dialog (kontrolowany `open` / `onOpenChange`) | Context7 `/websites/radix-ui_primitives` — Dialog Root controlled; close po async submit przez `setOpen(false)` | Istniejący `@/shared/ui/dialog`; wzorzec `CancelRunDialog` (blokada close przy `pending`) |
| `fetch` + body 401 | Wiedza Fetch + istniejący `parseBody` / `parseApiErrorEnvelope` | Na **401** najpierw body → gdy `code === 'INVALID_PASSWORD'` throw **bez** refresh i **bez** `unauthorizedHandler`; inaczej cykl F-4a jak dziś |
| Toast / Sonner | — | **Nie** wołać przy `PATCH /auth/me/email` (F-7 / mapa UX) |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Modal re-auth przy zmianie emaila na Koncie

Odpowiada major **Faza 9**.

---

### KROK 1 — Kontrakt klienta: `apiFetch` + `patchOwnEmail`

**Status:** `WYKONANY`

**Cel:** Klient rozróżnia **401** `INVALID_PASSWORD` od wygaśnięcia sesji (`UNAUTHORIZED` / F-4a) oraz woła nową trasę A-3b. Major Faza 9; `SPEC-FRONTEND.md` F-4a; `SPEC-AUTH.md` A-3b; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/shared/api/api-fetch.ts`
- Zmiana: `apps/frontend/src/modules/auth/api/auth.api.ts`

Kolejność w kroku: `apiFetch` → `patchOwnEmail` (UI w KROK 2).

#### Refaktor — `api-fetch.ts`

**teraz:**

```typescript
export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const { skipAuthRefresh = false, headers, ...rest } = options;
  const url = path.startsWith('/api/v1') ? path : `/api/v1${path}`;

  const execute = async (): Promise<Response> =>
    fetch(url, {
      ...rest,
      headers,
      credentials: 'same-origin',
      cache: 'no-store',
    });

  let response = await execute();

  if (response.status === 401 && !skipAuthRefresh) {
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await execute();
    }
  }

  if (response.status === 401) {
    if (!skipAuthRefresh) unauthorizedHandler?.();
    const body = await parseBody(response);
    throw toApiError(response.status, body);
  }

  const body = await parseBody(response);
  if (!response.ok) {
    throw toApiError(response.status, body);
  }

  return body;
}
```

**zamień na:**

```typescript
export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const { skipAuthRefresh = false, headers, ...rest } = options;
  const url = path.startsWith('/api/v1') ? path : `/api/v1${path}`;

  const execute = async (): Promise<Response> =>
    fetch(url, {
      ...rest,
      headers,
      credentials: 'same-origin',
      cache: 'no-store',
    });

  let response = await execute();

  if (response.status === 401) {
    const firstBody = await parseBody(response);
    const firstEnvelope = parseApiErrorEnvelope(firstBody);

    // Re-auth (A-3b): nie jest wygaśnięciem sesji — F-4a nie dotyczy.
    if (firstEnvelope?.code === 'INVALID_PASSWORD') {
      throw toApiError(401, firstBody);
    }

    if (!skipAuthRefresh) {
      const refreshed = await refreshSession();
      if (refreshed) {
        response = await execute();
        if (response.status === 401) {
          unauthorizedHandler?.();
          const retryBody = await parseBody(response);
          throw toApiError(401, retryBody);
        }
        const retryBody = await parseBody(response);
        if (!response.ok) {
          throw toApiError(response.status, retryBody);
        }
        return retryBody;
      }
      unauthorizedHandler?.();
      throw toApiError(401, firstBody);
    }

    throw toApiError(401, firstBody);
  }

  const body = await parseBody(response);
  if (!response.ok) {
    throw toApiError(response.status, body);
  }

  return body;
}
```

**Uwaga:** `parseApiErrorEnvelope` jest już importowany z `@/shared/api/envelope` w tym pliku (przez `toApiError`). Dopisz jawny import symbolu, jeśli po refaktorze TypeScript tego wymaga:

```typescript
import { ApiError, parseApiErrorEnvelope } from '@/shared/api/envelope';
```

(obecny plik już tak importuje — bez zmiany importów, o ile `parseApiErrorEnvelope` jest użyte w `toApiError` ścieżce; upewnij się, że symbol jest w scope przy gałęzi `INVALID_PASSWORD`).

#### Refaktor — `auth.api.ts` (`patchOwnEmail`)

**teraz:**

```typescript
export async function patchOwnEmail(email: string): Promise<SessionUser> {
  const body = await apiFetch('/auth/me', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return parseSessionUser(body);
}
```

**zamień na:**

```typescript
export async function patchOwnEmail(input: {
  readonly email: string;
  readonly currentPassword: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/me/email', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: input.email,
      currentPassword: input.currentPassword,
    }),
  });
  return parseSessionUser(body);
}
```

**Testy:** poza MVP FE (`SPEC-TESTY.md` T-7). Regresja ręczna: złe hasło na Koncie **nie** wyrzuca na kartę logowania; wygasły access (inny endpoint) nadal refresh → retry.

**DoD kroku:**

- `apiFetch` przy **401** `INVALID_PASSWORD` rzuca `ApiError` **bez** `POST /auth/refresh` i **bez** `unauthorizedHandler`.
- Inne **401** (brak / nieważna sesja) zachowują F-4a (`UNAUTHORIZED` → refresh → retry → logout).
- `patchOwnEmail` woła `PATCH /auth/me/email` z `{ email, currentPassword }`; brak wywołań `PATCH /auth/me` z body email.
- Kompilacja / typy: jedyny caller dziś = `AccountEmailForm` (KROK 2 dopina signature).

---

### KROK 2 — `AccountEmailForm`: Dialog re-auth + recovery 409

**Status:** `WYKONANY`

**Cel:** Widok Konto spełnia kanon Email z `docs/ux_dashboard.md` i checklistę F-8 w `SPEC-FRONTEND.md`. Refaktor względem historii 5.3.1 — modal zawsze, nie bezpośredni PATCH z formularza.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/account-email-form.tsx`
- Bez zmian: `apps/frontend/src/modules/runs/components/account-view.tsx` (nadal `<AccountEmailForm />`)

#### Refaktor — pełny plik `account-email-form.tsx`

**teraz:** (skrót zachowania) formularz → `patchOwnEmail(email)` na `/auth/me`; CTA `disabled` gdy `email === current`; lokalny tekst „Zapisano adres email.”; jeden `EnvelopeError` pod formularzem; brak Dialoga.

**zamień na** (kompletny plik):

```tsx
'use client';

import { useState, type FormEvent } from 'react';
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
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { fetchUserSession, patchOwnEmail } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

type FieldEnvelope = { readonly code: string; readonly message: string };

export function AccountEmailForm() {
  const { state, setAuthenticated } = useSession();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [email, setEmail] = useState(current);
  const [open, setOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [emailLocked, setEmailLocked] = useState(true);
  const [pending, setPending] = useState(false);
  const [emailEnvelope, setEmailEnvelope] = useState<FieldEnvelope | null>(null);
  const [passwordEnvelope, setPasswordEnvelope] = useState<FieldEnvelope | null>(null);
  /** Draft Konta w momencie otwarcia — Anuluj / close bez Potwierdź wraca do niego. */
  const [openedDraft, setOpenedDraft] = useState(current);

  if (state.status !== 'authenticated') return null;

  function openReauthModal(draft: string): void {
    setOpenedDraft(draft);
    setModalEmail(draft);
    setModalPassword('');
    setEmailLocked(true);
    setEmailEnvelope(null);
    setPasswordEnvelope(null);
    setOpen(true);
  }

  function closeWithoutApi(): void {
    setOpen(false);
    setModalPassword('');
    setEmailEnvelope(null);
    setPasswordEnvelope(null);
    setEmail(openedDraft);
  }

  function onAccountSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    openReauthModal(email.trim());
  }

  async function onConfirm(): Promise<void> {
    setPending(true);
    setEmailEnvelope(null);
    setPasswordEnvelope(null);
    try {
      await patchOwnEmail({
        email: modalEmail.trim(),
        currentPassword: modalPassword,
      });
      const user = await fetchUserSession();
      setAuthenticated(user);
      setEmail(user.email);
      setOpen(false);
      setModalPassword('');
    } catch (reason: unknown) {
      if (!(reason instanceof ApiError)) {
        setPasswordEnvelope(FALLBACK);
        return;
      }
      const { code, message } = reason.envelope;
      if (reason.status === 409 || code === 'CONFLICT') {
        setModalEmail('');
        setModalPassword('');
        setEmailLocked(false);
        setEmailEnvelope({ code, message });
        setPasswordEnvelope(null);
        return;
      }
      if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
        setPasswordEnvelope({ code, message });
        return;
      }
      setPasswordEnvelope({ code, message });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form className="flex max-w-xl flex-col gap-3" onSubmit={onAccountSubmit}>
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
        <Button type="submit">Zapisz email</Button>
      </form>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (pending) return;
          if (!next) closeWithoutApi();
          else setOpen(true);
        }}
      >
        <DialogContent className="z-(--z-modal) sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Potwierdź zmianę emaila</DialogTitle>
            <DialogDescription>
              Podaj aktualne hasło, żeby zapisać adres. Sesja pozostanie aktywna.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <FormField label="Email" htmlFor="reauth-email">
              <Input
                id="reauth-email"
                type="email"
                autoComplete="email"
                value={modalEmail}
                disabled={emailLocked || pending}
                onChange={(event) => setModalEmail(event.target.value)}
                required
              />
            </FormField>
            {emailEnvelope ? (
              <EnvelopeError code={emailEnvelope.code} message={emailEnvelope.message} />
            ) : null}

            <FormField label="Aktualne hasło" htmlFor="reauth-password">
              <Input
                id="reauth-password"
                type="password"
                autoComplete="current-password"
                value={modalPassword}
                disabled={pending}
                onChange={(event) => setModalPassword(event.target.value)}
                required
              />
            </FormField>
            {passwordEnvelope ? (
              <EnvelopeError code={passwordEnvelope.code} message={passwordEnvelope.message} />
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => closeWithoutApi()}
            >
              Anuluj
            </Button>
            <Button type="button" disabled={pending} onClick={() => void onConfirm()}>
              Potwierdź
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

**Zachowanie (checklist implementacyjna):**

| Zdarzenie | Efekt |
|-----------|--------|
| Zapisz email | Modal open; email = draft; `disabled`; hasło puste; **zero** API |
| Potwierdź | `PATCH` + potem `GET /auth/me`; bez toastu |
| `INVALID_PASSWORD` / `VALIDATION_FAILED` | Envelope pod hasłem; email nadal `disabled` (jeśli był); sesja zostaje |
| **409** | Clear obu pól; `emailLocked = false`; envelope pod emailem |
| Sukces | Close; draft = nowy email z sesji |
| Anuluj / overlay close | Zero API; draft Konta = `openedDraft` |

**Testy:** poza MVP FE. Smoke ręczny: ten sam email + dobre hasło → 200, modal close; złe hasło → zostajesz na Koncie; zajęty email → 409 recovery w modalu.

**DoD kroku:**

- CTA „Zapisz email” nie jest `disabled` tylko dlatego, że adres = obecny.
- Modal zawsze przed mutacją; Potwierdź zawsze wysyła `email` + `currentPassword`.
- Envelope błędów hasła / 409 zgodnie z tabelą; brak toastu; brak cyklu F-4a przy `INVALID_PASSWORD`.
- Anuluj = zero API; draft Konta bez zmian względem otwarcia.
- Lock wizualny: ten sam `Dialog` / `FormField` / `Button` co chrome (bez nowej palety).

---

#### Propozycja commit message

```text
feat(auth): require password re-auth when changing account email

Gate F-4a so INVALID_PASSWORD stays on the Account modal instead of
logging the operator out; call PATCH /auth/me/email with currentPassword.
```

---

## Weryfikacja wycinka

| Kryterium | Spełnienie |
|-----------|------------|
| Kotwica major Faza 9 | FAZA 1 = HOW gate’u; bez MILESTONE 9 |
| docs / SPEC | Modal + `currentPassword` + `INVALID_PASSWORD` bez F-4a + 409 recovery + sukces bez toastu |
| Zależność BE | Osobny plan Faza 13; ten plik nie rusza `apps/api` |
| Kompletność HOW | Pełny `account-email-form.tsx`; fragmenty `api-fetch` / `auth.api` |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Commit | Jedna propozycja EN Conventional Commits na końcu FAZA 1 |
| Statusy | `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC | Nietknięte w tej sesji |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po wdrożeniu HOW |
|---------|------------------|
| Faza 9 | `WYKONANY` (DoD gate + ten plan) |
| MILESTONE 9 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 5.3.1 / MILESTONE 5 | bez zmian (historia) |
| Backend Faza 13 | osobny ślad w majorze BE / planie faza-13 |

Edycja statusów major = **poza** tym feature planem (ręcznie lub w sesji `/feature-implementation` na życzenie użytkownika).
