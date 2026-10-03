# Content Chain — feature plan: Faza 12 (rejestracja i aktywacja konta w UI)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Aktywny signup gdy bootstrap niedostępny; formularz register; thank-you + resend (prod / 503); poza prod → login; deep link `/?activationToken=` → login + activate w tle + toast; **409** na kolizji przy polu email; **bez** Set-Cookie z register/activate/resend |
| Major | `content-chain-frontend_major_plan.md` — **Faza 12** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 12. **Nie** mylić z backend Fazą 12 (anulowanie runu) ani z `content-chain_feature_plan_faza-16-register-email-activation.md` (HOW **api**) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 12) |
| Kolejność KROK ≠ major | Major nie ma 12.1/12.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `docs/security.md`, `SPEC-FRONTEND.md` F-4a / F-4b / F-8, `SPEC-AUTH.md` A-5 / A-11…A-13, `SPEC-KOMUNIKACJA.md` (register / activate / resend), `SPEC-BEZPIECZENSTWO.md` |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-16-register-email-activation.md`. FE **nie** implementuje Nest/Prisma. Runtime FE wymaga wdrożonego API (backend Faza 16) |
| Refaktor względem | Faza 1 / Krok 1.1–1.2 (`WYKONANY`) — nieaktywne „Zarejestruj się!”; first-run bez otwartego signup. MILESTONE 1 = historia. Kanon = aktualne docs/SPEC, **nie** treść Kroku 1.1–1.2 |
| Poza zakresem | Kod BE; DEMO chip / `guest`; osobny trwały ekran „Aktywacja…”; Playwright; zmiana BFF / modelu cookie; confirm e-mail przy `PATCH /auth/me/email` (V1); nowa paleta; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major FE: Faza 12 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 12. **Edycja major poza tym skillem.** |

**Pass rozwojowy — przesunięcia:**

1. **KROK 1** przed 2–4 — formularz / thank-you / activate konsumują klienty `auth.api` + parser `verifiedAt`.
2. **KROK 2** kończy się na formularzu + CTA + lokalnej walidacji; orkiestracja **201** / **503** / poza-prod → **KROK 3** (żeby thank-you nie powstawał „później niż użycie”).
3. Montaż `Toaster` na gościnnym `/` w **KROK 4** **przed** `notifyProduct` po activate (nie w `DashboardShell`).

**HOW:** tryby widoku na `/` (`login` \| `register` \| `thank_you`) — bez osobnych tras; spójne z `/?activationToken=` i first-run. Skill `content-chain-product-ui` = dziedziczenie locku Fazy 1.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`) — **bez** nowej palety na register / thank-you / login po deep linku.

**Typy:** granice propsów `readonly`; unie dyskryminowane widoku gościa; `unknown` + parser na body API; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych.

---

## Założenia

- Fazy 1–11 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 1 / 1.1–1.2 / MILESTONE 1.
- Register **zawsze** publiczny w API; UI pokazuje CTA tylko gdy `bootstrap-status.available === false` (przy first-run CTA **ukryty / disabled**).
- Body register: `{ email, password }` — pole **powtórz hasło** tylko UI. Polityka hasła: istniejący `passwordMeetsPolicy` (jak accept-invite / bootstrap).
- Kolizja email → **409** `CONFLICT`, `message`: `Email already in use` → błąd **przy polu email**; **bez** thank-you.
- Thank-you po **201** z `user.verifiedAt === null` **lub** **503** `MAIL_DELIVERY_FAILED` (pending utworzony). Email do resend = **stan klienta**, nie body 201.
- Poza `production` (API zwraca `verifiedAt` ISO): krótki sukces → widok logowania (**bez** obligatoryjnego thank-you).
- Activate / register / resend: `skipAuthRefresh: true`; **bez** `setAuthenticated` / Set-Cookie z tych tras.
- Toast po sukcesie activate: **wyjątek** F-4b / F-8 — `notifyProduct` + `Toaster` na niezalogowanym `/`. Login / register / thank-you / accept-invite: **bez** toasta na błędy (envelope na karcie).
- Deep link: wyłącznie `/?activationToken=` — natychmiast karta logowania; activate w tle; błąd → ogólny komunikat na karcie (stała PL); strip query po starcie (uniknięcie ponownego activate przy reload).
- BFF / `apiFetch` / cookie: **bez zmian** modelu.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `ApiError` | Istniejący `@/shared/api/*` | Publiczne POST z `skipAuthRefresh: true`; **409** / **503** / **401** jako `ApiError` |
| Next.js `useSearchParams` | Context7 `/vercel/next.js/v16.2.9` | Client Component + `<Suspense>` na `page.tsx` (prerender); `router.replace('/')` po odczycie tokenu |
| Sonner / `notifyProduct` | Istniejący kit Fazy 3.6 | Ten sam `Toaster` + `notifyProduct({ kind: 'success', title: '…' })`; **bez** `richColors` |
| React form state | Wzorzec `LoginCard` / `AcceptInviteForm` | `useState` + `FormEvent`; bez nowych zależności |
| Visual | `content-chain-product-ui` | Karta `max-w-md`, `shadow-none`, `FormField` / `EnvelopeError`, gęstość jak login |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Rejestracja i aktywacja konta w UI

Odpowiada major **Faza 12**.

---

### KROK 1 — Klienty API: register / activate / resend + parser `verifiedAt`

**Status:** `WYKONANY`

**Cel:** Cienki klient HTTP pod F-4b / A-11…A-13 — parsowanie odpowiedzi register (z `verifiedAt`) oraz publiczne `activate` / `resend-activation` **bez** sesji. Major Faza 12 HOW #5; `SPEC-FRONTEND.md` F-4b; `SPEC-AUTH.md` A-11…A-13.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/api/session.types.ts`
- Zmiana: `apps/frontend/src/modules/auth/api/auth.api.ts`

Kolejność w kroku: typy/parser → funkcje API.

#### Refaktor — `session.types.ts` (dopisek typów register)

**teraz (koniec pliku po `parseAuthUserWrapper`):**

```typescript
export function parseAuthUserWrapper(value: unknown): SessionUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid auth user wrapper');
  }
  return parseSessionUser(value.user);
}
```

**zamień na:**

```typescript
export function parseAuthUserWrapper(value: unknown): SessionUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid auth user wrapper');
  }
  return parseSessionUser(value.user);
}

/** Odpowiedź `POST /auth/register` — `verifiedAt: null` = thank-you (prod). */
export type RegisteredUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  readonly verifiedAt: string | null;
};

export function parseRegisteredUser(value: unknown): RegisteredUser {
  if (!isRecord(value)) {
    throw new Error('Invalid registered user payload');
  }
  const { id, email, role, verifiedAt } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid registered user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid registered user email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid registered user role');
  }
  if (!(verifiedAt === null || typeof verifiedAt === 'string')) {
    throw new Error('Invalid registered user verifiedAt');
  }
  return {
    id: createUserId(id),
    email,
    role,
    verifiedAt,
  };
}

export function parseRegisteredUserWrapper(value: unknown): RegisteredUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid register user wrapper');
  }
  return parseRegisteredUser(value.user);
}
```

#### Refaktor — `auth.api.ts` (dopisek importów + trzy funkcje)

**teraz (importy):**

```typescript
import {
  parseAuthUserWrapper,
  parseSessionUser,
  type SessionUser,
} from '@/modules/auth/api/session.types';
```

**zamień na:**

```typescript
import {
  parseAuthUserWrapper,
  parseRegisteredUserWrapper,
  parseSessionUser,
  type RegisteredUser,
  type SessionUser,
} from '@/modules/auth/api/session.types';
```

**teraz (koniec pliku po `acceptInvite`):**

```typescript
export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}
```

**zamień na:**

```typescript
export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function registerAccount(credentials: Credentials): Promise<RegisteredUser> {
  const body = await apiFetch('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseRegisteredUserWrapper(body);
}

export async function activateAccount(token: string): Promise<SessionUser> {
  const body = await apiFetch('/auth/activate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token }),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function resendActivation(email: string): Promise<void> {
  await apiFetch('/auth/resend-activation', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
    skipAuthRefresh: true,
  });
}
```

**Biblioteki / API:** istniejący `apiFetch` — bez Context7. **503** / **409** / **401** lecą jako `ApiError` do callerów (KROK 2–4).

**Testy:** brak nowych plików testowych FE (Playwright poza MVP). Ręcznie: register 201 (mock/API) → parser `verifiedAt`; 409 → throw.

**DoD kroku:**

- `registerAccount` / `activateAccount` / `resendActivation` eksportowane; `skipAuthRefresh: true`.
- `parseRegisteredUser` wymaga `verifiedAt: string | null` (ISO albo `null`).
- `SessionUser` / login / me **bez** wymogu `verifiedAt` (probe bez pola — bez regresji).
- Brak `setAuthenticated` w tych trzech funkcjach.

---

### KROK 2 — Formularz register + aktywny CTA na `LoginCard`

**Status:** `WYKONANY`

**Cel:** Aktywny „Nie masz konta? Zarejestruj się!” gdy bootstrap niedostępny; formularz email / hasło / confirm; lokalna polityka + mapowanie **409** na pole email. Major Faza 12 HOW #1 / #4; `SPEC-FRONTEND.md` F-4a / F-4b; `docs/ux_dashboard.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/register-form-error.ts`
- Nowy: `apps/frontend/src/modules/auth/components/register-form.tsx`
- Zmiana: `apps/frontend/src/modules/auth/components/login-card.tsx`
- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx` (tryb `login` \| `register` + wire submit → callback sukcesu; pełna orkiestracja 201/503 w KROK 3)

Kolejność: helper błędu → `RegisterForm` → CTA `LoginCard` → przełączanie trybu w `HomeEntry`.

#### Nowy plik — `register-form-error.ts`

```typescript
import { ApiError } from '@/shared/api/envelope';

export type RegisterFieldErrors = {
  readonly email?: string;
  readonly password?: string;
  readonly form?: { readonly code: string; readonly message: string };
};

/**
 * Mapuje błąd register na pola formularza.
 * Kolizja email (409 CONFLICT) → wyłącznie pole email (F-4b).
 * 400 VALIDATION_FAILED → envelope przy haśle / formie (as-is).
 */
export function toRegisterFieldErrors(reason: unknown): RegisterFieldErrors {
  if (reason instanceof ApiError) {
    if (reason.status === 409 || reason.envelope.code === 'CONFLICT') {
      return { email: reason.envelope.message };
    }
    if (reason.envelope.code === 'VALIDATION_FAILED') {
      return {
        password: reason.envelope.message,
        form: { code: reason.envelope.code, message: reason.envelope.message },
      };
    }
    return {
      form: { code: reason.envelope.code, message: reason.envelope.message },
    };
  }
  return {
    form: {
      code: 'INTERNAL_ERROR',
      message: 'Nie udało się odczytać odpowiedzi.',
    },
  };
}
```

#### Nowy plik — `register-form.tsx`

```typescript
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { registerAccount } from '@/modules/auth/api/auth.api';
import type { RegisteredUser } from '@/modules/auth/api/session.types';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import {
  toRegisterFieldErrors,
  type RegisterFieldErrors,
} from '@/modules/auth/register-form-error';
import { ApiError } from '@/shared/api/envelope';

export type RegisterSuccess =
  | { readonly kind: 'pending'; readonly email: string }
  | { readonly kind: 'ready'; readonly email: string };

type RegisterFormProps = {
  readonly onSuccess: (result: RegisterSuccess) => void;
  readonly onBackToLogin: () => void;
};

export function RegisterForm({ onSuccess, onBackToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setFieldErrors({});
    setLocalHint(undefined);

    if (password !== confirm) {
      setLocalHint('Hasła muszą być identyczne.');
      return;
    }
    if (!passwordMeetsPolicy(password)) {
      setLocalHint('Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).');
      return;
    }

    setPending(true);
    try {
      const user: RegisteredUser = await registerAccount({ email, password });
      if (user.verifiedAt === null) {
        onSuccess({ kind: 'pending', email });
        return;
      }
      onSuccess({ kind: 'ready', email });
    } catch (reason: unknown) {
      if (
        reason instanceof ApiError &&
        reason.status === 503 &&
        reason.envelope.code === 'MAIL_DELIVERY_FAILED'
      ) {
        onSuccess({ kind: 'pending', email });
        return;
      }
      setFieldErrors(toRegisterFieldErrors(reason));
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">Utwórz konto operatora.</p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="register-email" error={fieldErrors.email}>
            <Input
              id="register-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Hasło"
            htmlFor="register-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={fieldErrors.password ?? localHint}
          >
            <Input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Powtórz hasło" htmlFor="register-confirm">
            <Input
              id="register-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
            />
          </FormField>
          {fieldErrors.form ? (
            <EnvelopeError code={fieldErrors.form.code} message={fieldErrors.form.message} />
          ) : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zarejestruj się'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Mam już konto — zaloguj się
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Uwaga KROK 2 vs 3:** `onSuccess({ kind: 'pending' | 'ready' })` jest wywoływane już tutaj (mapowanie odpowiedzi register w formularzu). **KROK 3** dostarcza widok thank-you i podpięcie w `HomeEntry` (oraz krótki sukces na loginie). Do czasu KROK 3 `HomeEntry` może tymczasowo trzymać `pending`/`ready` jako powrót na login z `successHint` — **preferowane:** wdrażać KROK 2 i 3 w jednej sesji implementacji, żeby nie shipować CTA bez thank-you.

#### Refaktor — `login-card.tsx` (CTA + opcjonalny hint sukcesu / błąd activate)

**teraz (props — brak; komponent bez propsów):**

```typescript
export function LoginCard() {
```

**zamień na (sygnatura + użycie CTA):**

```typescript
type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onBootstrapAvailableChange?: (available: boolean) => void;
  readonly onGoRegister?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};

export function LoginCard({
  bootstrapAvailable,
  onBootstrapAvailableChange,
  onGoRegister,
  successHint = null,
  activationError = null,
}: LoginCardProps) {
```

**teraz (`useEffect` bootstrap + lokalny state `bootstrapAvailable`):**

```typescript
  const [bootstrapAvailable, setBootstrapAvailable] = useState(false);
  // ...
  useEffect(() => {
    let cancelled = false;
    void fetchBootstrapStatus()
      .then((available) => {
        if (!cancelled) setBootstrapAvailable(available);
      })
      .catch(() => {
        if (!cancelled) setBootstrapAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
```

**zamień na:** bootstrap pobierany w **`HomeEntry`** (jedno źródło dla CTA + first-run) **albo** zostaje w `LoginCard`, ale po resolve woła `onBootstrapAvailableChange?.(available)`. Preferowane w HOW: **fetch w `HomeEntry`**, `LoginCard` dostaje `bootstrapAvailable` propsem — usuń lokalny fetch z karty.

Fragment CTA:

**teraz:**

```tsx
          <Button
            type="button"
            variant="outline"
            disabled
            className="w-full"
            title="Rejestracja jest niedostępna"
          >
            Nie masz konta? Zarejestruj się!
          </Button>
```

**zamień na:**

```tsx
          {successHint ? (
            <p className="text-sm text-muted-foreground" role="status">
              {successHint}
            </p>
          ) : null}
          {activationError ? (
            <p className="text-sm text-destructive" role="alert">
              {activationError}
            </p>
          ) : null}
          {!bootstrapAvailable ? (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={onGoRegister === undefined}
              onClick={onGoRegister}
            >
              Nie masz konta? Zarejestruj się!
            </Button>
          ) : null}
```

Przy `bootstrapAvailable === true` CTA **nie renderować** (ukryty) — zgodne z docs „ukryty / disabled”.

#### Refaktor — `home-entry.tsx` (szkielet trybów; thank-you w KROK 3)

Unia widoku (w pliku lub osobnym `guest-view.ts`):

```typescript
export type GuestView =
  | { readonly mode: 'login'; readonly successHint?: string | null; readonly activationError?: string | null }
  | { readonly mode: 'register' }
  | { readonly mode: 'thank_you'; readonly email: string };
```

W `HomeEntry` (gość): `useState<GuestView>({ mode: 'login' })` + `bootstrapAvailable` z `fetchBootstrapStatus`; render `LoginCard` / `RegisterForm` wg `mode`. Handlery `onGoRegister` / `onBackToLogin` / `onSuccess` (pełne `pending` → thank_you w KROK 3).

**Biblioteki / API:** React + istniejący kit UI. Visual: dziedziczenie Card / FormField (skill product-ui).

**Testy:** ręcznie — first-run: brak CTA; po bootstrapie: CTA aktywny; 409 → błąd przy email; mismatch confirm → lokalny hint bez requestu.

**DoD kroku:**

- CTA aktywny wyłącznie gdy `available === false`.
- Confirm tylko UI; API dostaje `{ email, password }`.
- **409** → pole email; **bez** thank-you.
- Formularz dziedziczy lock Fazy 1 (`max-w-md`, `shadow-none`).

---

### KROK 3 — Thank-you + resend (prod / 503; poza prod → login)

**Status:** `WYKONANY`

**Cel:** Po **201** `verifiedAt === null` lub **503** `MAIL_DELIVERY_FAILED` — strona podziękowań z resend ze stanu klienta; zawsze traktuj odpowiedź resend jako sukces copy (API zawsze **200**). Poza prod (`ready`) — powrót na login z krótkim hintem. Major Faza 12 HOW #2; F-4b; `docs/ux_dashboard.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/registration-thank-you.tsx`
- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx` (dokoniczenie `onSuccess`)

#### Nowy plik — `registration-thank-you.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { EnvelopeError } from '@/shared/ui/form-field';
import { resendActivation } from '@/modules/auth/api/auth.api';
import { ApiError } from '@/shared/api/envelope';

type RegistrationThankYouProps = {
  readonly email: string;
  readonly onBackToLogin: () => void;
};

export function RegistrationThankYou({ email, onBackToLogin }: RegistrationThankYouProps) {
  const [pending, setPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<{ readonly code: string; readonly message: string } | null>(
    null,
  );

  async function onResend(): Promise<void> {
    setPending(true);
    setError(null);
    setStatusMessage(null);
    try {
      await resendActivation(email);
      // API zawsze 200 + stały message — FE pokazuje kanoniczny copy (bez enumeracji).
      setStatusMessage('Wiadomość wysłana ponownie');
    } catch (reason: unknown) {
      // Teoretycznie nie powinno; sieć / 5xx poza kontraktem resend.
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          Sprawdź skrzynkę e-mail. Wysłaliśmy link aktywacyjny na{' '}
          <span className="font-medium text-foreground">{email}</span>.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Nie otrzymałeś wiadomości e-mail?</p>
        <Button type="button" variant="outline" className="w-full" disabled={pending} onClick={onResend}>
          {pending ? 'Wysyłanie…' : 'Wyślij ponownie'}
        </Button>
        {statusMessage ? (
          <p className="text-sm text-muted-foreground" role="status">
            {statusMessage}
          </p>
        ) : null}
        {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
        <Button type="button" className="w-full" onClick={onBackToLogin}>
          Wróć do logowania
        </Button>
      </CardContent>
    </Card>
  );
}
```

#### Refaktor — `home-entry.tsx` (`onSuccess` z `RegisterForm`)

```typescript
function handleRegisterSuccess(result: RegisterSuccess): void {
  if (result.kind === 'pending') {
    setView({ mode: 'thank_you', email: result.email });
    return;
  }
  setView({
    mode: 'login',
    successHint: 'Konto utworzone. Możesz się zalogować.',
    activationError: null,
  });
}
```

Render:

```tsx
{view.mode === 'thank_you' ? (
  <RegistrationThankYou
    email={view.email}
    onBackToLogin={() => setView({ mode: 'login' })}
  />
) : view.mode === 'register' ? (
  <RegisterForm
    onSuccess={handleRegisterSuccess}
    onBackToLogin={() => setView({ mode: 'login' })}
  />
) : (
  <LoginCard
    bootstrapAvailable={bootstrapAvailable}
    onGoRegister={() => setView({ mode: 'register' })}
    successHint={view.successHint ?? null}
    activationError={view.activationError ?? null}
  />
)}
```

**Biblioteki / API:** `resendActivation` z KROK 1. **Bez** Toastera na thank-you (status inline).

**Testy:** ręcznie — po pending: thank-you; resend pokazuje „Wiadomość wysłana ponownie”; `ready` → login + hint; email resend = ten sam string co w formularzu.

**DoD kroku:**

- Thank-you po `verifiedAt === null` **lub** **503** `MAIL_DELIVERY_FAILED`.
- Resend body `{ email }` ze stanu klienta; copy sukcesu stałe.
- Poza prod → login + krótki hint; **bez** obligatoryjnego thank-you.
- **Bez** sesji po register / resend.

---

### KROK 4 — Deep link `/?activationToken=` + Toaster na `/` + toast sukcesu

**Status:** `WYKONANY`

**Cel:** Natychmiast widok logowania; w tle `POST /auth/activate`; sukces → toast „Konto aktywowane! Możesz się zalogować.”; błąd → ogólny komunikat na karcie; strip query; Suspense pod `useSearchParams`. Major Faza 12 HOW #3 / #4; F-4b (wyjątek Toastera); Context7 Next 16.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/activation-error.ts` (stała PL)
- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx`
- Zmiana: `apps/frontend/src/app/page.tsx` (`Suspense`)

#### Nowy plik — `activation-error.ts`

```typescript
/** Ogólny komunikat błędu activate — bez rozróżniania przyczyn (A-12 / F-4b). */
export const ACTIVATION_FAILED_HINT =
  'Nie udało się aktywować konta. Link mógł wygasnąć lub został już użyty.';
```

#### Refaktor — `home-entry.tsx` (activate + Toaster)

Dopisz importy: `useSearchParams`, `useRouter`, `activateAccount`, `notifyProduct`, `Toaster`, `ACTIVATION_FAILED_HINT`.

Efekt (jednorazowy na token):

```typescript
'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// ... istniejące + activateAccount, notifyProduct, Toaster, ACTIVATION_FAILED_HINT

function HomeEntryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activationStarted = useRef(false);
  // ... session, view, bootstrapAvailable ...

  useEffect(() => {
    if (state.status !== 'anonymous') return;
    if (activationStarted.current) return;
    const raw = searchParams.get('activationToken');
    if (raw === null || raw.length === 0) return;

    activationStarted.current = true;
    // Natychmiast login + strip tokenu (F-4b); activate w tle.
    setView({ mode: 'login', activationError: null, successHint: null });
    router.replace('/');

    void activateAccount(raw)
      .then(() => {
        notifyProduct({
          kind: 'success',
          title: 'Konto aktywowane! Możesz się zalogować.',
          id: 'account-activated',
        });
      })
      .catch(() => {
        setView((current) =>
          current.mode === 'login'
            ? { ...current, activationError: ACTIVATION_FAILED_HINT }
            : {
                mode: 'login',
                activationError: ACTIVATION_FAILED_HINT,
                successHint: null,
              },
        );
      });
  }, [router, searchParams, state.status]);

  // ... loading / authenticated jak dziś ...

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <Toaster />
      {/* render wg GuestView — KROK 2–3 */}
    </div>
  );
}

export function HomeEntry() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-background p-4">
          <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      }
    >
      <HomeEntryInner />
    </Suspense>
  );
}
```

**Zasady:**

- `Toaster` na gościnnym `/` **wyłącznie** dla wyjątku activate (ten sam kit / `--z-toast`).
- **Nie** wołać `notifyProduct` przy błędzie activate / register / login.
- **Nie** `setAuthenticated` po activate.
- Dedup: `id: 'account-activated'` + `activationStarted` ref.

#### Refaktor — `page.tsx` (opcjonalnie cienki)

Jeśli `Suspense` jest wewnątrz `HomeEntry`, `page.tsx` może zostać:

```typescript
import { HomeEntry } from '@/modules/auth/components/home-entry';

export default function HomePage() {
  return <HomeEntry />;
}
```

**Biblioteki / API:** Context7 Next 16 — `useSearchParams` + `Suspense`; Sonner przez istniejący `Toaster` / `notifyProduct`.

**Testy:** ręcznie — `/?activationToken=valid` → login + toast, URL bez query; zły token → ogólny komunikat na karcie, **bez** toasta błędu; reload bez tokenu nie powtarza activate.

**DoD kroku:**

- Deep link tylko `activationToken` na `/`.
- Sukces → toast z kanonicznym copy; błąd → stała PL na karcie.
- `Toaster` działa na niezalogowanym `/` (wyjątek F-4b); login/register nadal bez toastów błędów.
- Brak osobnego ekranu „Aktywacja…”.

---

#### Propozycja commit message

```text
feat(auth-ui): enable self-register, thank-you resend, and activation deep link

Replace the disabled signup CTA with register/thank-you flows and handle
/?activationToken= on the login card, including the allowed activation toast.
```

---

## Weryfikacja wycinka

| Kryterium | Spełnienie |
|-----------|------------|
| Kotwica major Faza 12 | FAZA 1 / KROK 1–4 pokrywa HOW #1–5 z majoru |
| docs / SPEC | F-4a/b, A-11…A-13, ux_dashboard — bez redefinicji |
| Kod nowych plików | Pełny w KROK 1–4 |
| Refaktory | Fragmenty `teraz → zamień na` |
| Pass rozwojowy | API → formularz/CTA → thank-you → activate+Toaster |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, koniec FAZY 1 |
| Major / docs / SPEC | nietknięte tą sesją |
| Statusy | `NIE_ROZPOCZĘTY` |
| Skill UI | dziedziczenie locku Fazy 1 |
| BE | poza zakresem; zależność od feature-planu faza-16 api |

**Checklist DoD techniczne (po implementacji):**

- [ ] CTA „Zarejestruj się!” aktywny gdy bootstrap niedostępny; ukryty przy first-run.
- [ ] Register: confirm UI-only; **409** → pole email; **201** `verifiedAt === null` lub **503** → thank-you + resend ze stanu klienta.
- [ ] **201** z `verifiedAt` → login + krótki hint.
- [ ] `/?activationToken=` → login + activate w tle + toast sukcesu; błąd → ogólny komunikat; bez dashboardu / bez sesji z activate.
- [ ] Register / activate / resend: `skipAuthRefresh`; brak `setAuthenticated` z tych tras.
- [ ] Toaster na `/` tylko dla wyjątku activate; dziedziczenie visual lock.

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego HOW |
|---------|---------------------------|
| FE Faza 12 | `WYKONANY` (DoD gate + ten plan) |
| MILESTONE 12 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| FE Faza 1 / 1.1–1.2 / MILESTONE 1 | bez zmian (historia) |
| Backend Faza 16 | osobny ślad (`content-chain_feature_plan_faza-16-…`); ten plan FE go nie oznacza |

Edycja statusów major = **poza** tą sesją `/create-feature-implementation-plan`.
