# Content Chain — feature plan: Faza 17 (osobny formularz bootstrap admina)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Trzy tryby na `/`: `login` \| `register` \| `bootstrap_admin` (+ `thank_you` z Fazy 12); submit logowania **zawsze** `POST /auth/login`; CTA **„Zarejestruj admina”** iff `available === true` → osobny formularz → `POST /auth/bootstrap-admin` → sesja → `/account`; CTA register **bez zmian** (`available === false`); **bez** osobnej trasy first-run; **zakaz** mode-hijack login→bootstrap |
| Major | `content-chain-frontend_major_plan.md` — **Faza 17** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 17. **Nie** mylić z backend Fazą 17 (health-ready) ani z `content-chain_feature_plan_faza-17-health-ready.md` (HOW **api**) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 17) |
| Kolejność KROK ≠ major | Major nie ma 17.1/17.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md`, `docs/security.md`, `SPEC-FRONTEND.md` F-4a / F-8, `SPEC-AUTH.md` A-1 / A-1a / A-5, `SPEC-BEZPIECZENSTWO.md` |
| Zależność api | Istniejące `GET /auth/bootstrap-status` + `POST /auth/bootstrap-admin` (backend Faza 5, `WYKONANY`). FE **nie** zmienia semantyki ani nie dodaje fazy BE |
| Refaktor względem | Faza 1 / Krok 1.2 (`WYKONANY`) — first-run = submit tej samej karty; Faza 12 (`WYKONANY`) — tryby bez `bootstrap_admin`. MILESTONE 1 / Faza 1 / 1.2 / Faza 12 = historia. Kanon = aktualne docs/SPEC, **nie** treść Kroku 1.2 / Fazy 12 |
| Poza zakresem | Kod BE; zmiana bramki register; drugi admin / reset instancji; Playwright; nowa paleta; edycja major/docs/SPEC; zmiana BFF / cookie |
| Po implementacji (informacyjnie) | Major FE: Faza 17 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 17. **Edycja major poza tym skillem.** |

**Pass rozwojowy — przesunięcia:**

1. **KROK 1 przed 3** — CTA admin + zakaz hijacku w `LoginCard` przed montażem w `home-entry`.
2. **KROK 2 przed 3** — `BootstrapAdminForm` gotowy przed gałęzią `view.mode === 'bootstrap_admin'`.
3. Brak przenosin między fazami major.

**HOW:** tryby widoku na `/` (`login` \| `register` \| `bootstrap_admin` \| `thank_you`) — bez osobnych tras. Rejestracja (Faza 12) **zostaje**. Skill `content-chain-product-ui` = dziedziczenie locku Fazy 1.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`) — **bez** nowej palety na formularzu bootstrap / CTA.

**Typy:** granice propsów `readonly`; unia dyskryminowana `GuestView`; `unknown` + istniejące parsery na body API; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych.

---

## Założenia

- Fazy 1–16 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 1 / 1.2 / Fazy 12 / MILESTONE 1.
- `GET /auth/bootstrap-status` → `available` steruje **wyłącznie widocznością CTA** „Zarejestruj admina” (UX). Egzekucja bootstrapu nadal serwerowa (A-1: `admin count === 0`).
- Submit karty logowania → **zawsze** `loginWithPassword` / `POST /auth/login` — także gdy `available === true`.
- Formularz admina: `{ email, password }` w body; pole **powtórz hasło** tylko UI (jak register). Polityka: istniejący `passwordMeetsPolicy` (A-5).
- Po sukcesie bootstrap: `setAuthenticated(user)` + `router.replace('/account')` (sesja cookie jak dziś).
- Błędy na login / bootstrap / register: envelope na karcie (`EnvelopeError` / pola) — **bez** Toastera (Toaster na `/` zostaje wyłącznie dla wyjątku activate z Fazy 12).
- CTA „Nie masz konta? Zarejestruj się!”: aktywne / widoczne gdy `available === false` — **bez zmian** względem Fazy 12.
- `GuestView` w home-entry = stan **anonimowy** — **nie** mylić z rolą `guest`.
- BFF / `apiFetch` / cookie: **bez zmian** modelu. Klienty `fetchBootstrapStatus` / `bootstrapAdmin` już istnieją.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `ApiError` / `bootstrapAdmin` | Istniejący `@/modules/auth/api/auth.api` | Publiczny POST z `skipAuthRefresh: true`; body przez `parseAuthUserWrapper` |
| Next.js `useRouter` | Context7 `/vercel/next.js/v16.2.9` (`useRouter` / `router.replace`) | Client Component; po sukcesie bootstrap `router.replace('/account')` bez wpisu historii |
| React form state | Wzorzec `RegisterForm` / `LoginCard` | `useState` + `FormEvent`; bez nowych zależności |
| Polityka hasła | `passwordMeetsPolicy` | Ta sama co register / accept-invite |
| Mapowanie błędów | `toRegisterFieldErrors` | Ten sam kształt envelope (409 / VALIDATION_FAILED / form) — bez nowego modułu |
| Visual | `content-chain-product-ui` | Karta `max-w-md`, `shadow-none`, `FormField` / `EnvelopeError`, gęstość jak login / register |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Osobny formularz bootstrap admina na `/`

Odpowiada major **Faza 17**.

---

### KROK 1 — LoginCard: zawsze `POST /auth/login` + CTA „Zarejestruj admina”

**Status:** `WYKONANY`

**Cel:** Usunąć mode-hijack (submit → `bootstrapAdmin` gdy `available`). Karta logowania zawsze loguje; przy `available === true` pokazuje CTA przejścia do formularza admina; CTA register bez zmian bramki. Major Faza 17 HOW #2 / #5; `SPEC-FRONTEND.md` F-4a; `docs/ux_dashboard.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/login-card.tsx`

Kolejność w kroku: props → submit → copy / CTA.

#### Refaktor — `login-card.tsx`

**teraz (props + submit hijack + copy first-run):**

```tsx
import { bootstrapAdmin, loginWithPassword } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onBootstrapAvailableChange?: (available: boolean) => void;
  readonly onGoRegister?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};

export function LoginCard({
  bootstrapAvailable,
  onGoRegister,
  successHint = null,
  activationError = null,
}: LoginCardProps) {
  // ...
  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const user = bootstrapAvailable
        ? await bootstrapAdmin({ email, password })
        : await loginWithPassword({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      // ...
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          {bootstrapAvailable
            ? 'Pierwsza instalacja. To konto zostanie administratorem.'
            : 'Zaloguj się w aplikacji.'}
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* pola email / hasło z hintem polityki gdy bootstrapAvailable */}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zaloguj się'}
          </Button>
          {/* successHint / activationError */}
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
        </form>
      </CardContent>
    </Card>
  );
}
```

**zamień na (pełny plik docelowy):**

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { loginWithPassword } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onGoRegister?: () => void;
  readonly onGoBootstrapAdmin?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};

export function LoginCard({
  bootstrapAvailable,
  onGoRegister,
  onGoBootstrapAdmin,
  successHint = null,
  activationError = null,
}: LoginCardProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const user = await loginWithPassword({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
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
        <p className="text-sm text-muted-foreground">Zaloguj się w aplikacji.</p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="login-email">
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Hasło" htmlFor="login-password">
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Logowanie…' : 'Zaloguj się'}
          </Button>
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
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={onGoRegister === undefined}
              onClick={onGoRegister}
            >
              Nie masz konta? Zarejestruj się!
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
```

**Biblioteki / API:** `loginWithPassword` exclusively; Context7 Next.js `router.replace` po sukcesie (jak dziś).

**Testy:** brak automatycznych w wycinku (Playwright poza zakresem). Regresja ręczna: przy `available === true` submit loguje (błąd credentials), nie tworzy admina; CTA admin widoczne; przy `false` CTA register, bez CTA admin.

**DoD kroku:**

- `bootstrapAdmin` **nie** jest importowany ani wywoływany z `LoginCard`.
- Submit → wyłącznie `POST /auth/login`.
- CTA „Zarejestruj admina” renderowane iff `bootstrapAvailable === true`.
- CTA register iff `bootstrapAvailable === false`.
- Copy first-run / hint polityki hasła na karcie logowania usunięte.

---

### KROK 2 — Nowy `BootstrapAdminForm`

**Status:** `WYKONANY`

**Cel:** Osobny formularz trybu `bootstrap_admin` — email + hasło + powtórz hasło (tylko UI), polityka A-5, `POST /auth/bootstrap-admin`, sesja → `/account`, jawny powrót do logowania. Major Faza 17 HOW #3 / #4 / #6; `SPEC-AUTH.md` A-1 / A-5; `content-chain-product-ui`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/bootstrap-admin-form.tsx`

#### Nowy plik — `bootstrap-admin-form.tsx` (kompletny)

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { bootstrapAdmin } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import {
  toRegisterFieldErrors,
  type RegisterFieldErrors,
} from '@/modules/auth/register-form-error';

type BootstrapAdminFormProps = {
  readonly onBackToLogin: () => void;
};

export function BootstrapAdminForm({ onBackToLogin }: BootstrapAdminFormProps) {
  const router = useRouter();
  const { setAuthenticated } = useSession();
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
      setLocalHint(
        'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).',
      );
      return;
    }

    setPending(true);
    try {
      const user = await bootstrapAdmin({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      setFieldErrors(toRegisterFieldErrors(reason));
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-center text-2xl font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          Pierwsza instalacja. To konto zostanie administratorem.
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="bootstrap-admin-email" error={fieldErrors.email}>
            <Input
              id="bootstrap-admin-email"
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
            htmlFor="bootstrap-admin-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={fieldErrors.password ?? localHint}
          >
            <Input
              id="bootstrap-admin-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Powtórz hasło" htmlFor="bootstrap-admin-confirm">
            <Input
              id="bootstrap-admin-confirm"
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
            {pending ? 'Zapisywanie…' : 'Utwórz administratora'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin}>
            Wróć do logowania
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Biblioteki / API:** istniejący `bootstrapAdmin`; Context7 `router.replace('/account')`; visual lock dziedziczony.

**Testy:** brak automatycznych. Ręcznie: walidacja lokalna (mismatch / polityka) bez requestu; sukces → dashboard; błąd API na karcie.

**DoD kroku:**

- Nowy plik montowalny; body API **bez** `confirmPassword`.
- Sukces → sesja + `/account`.
- Powrót → callback `onBackToLogin` (bez API).
- Brak Toastera na błędach / sukcesie bootstrapu.

---

### KROK 3 — `home-entry`: `GuestView` += `bootstrap_admin` + montaż

**Status:** `WYKONANY`

**Cel:** Orkiestracja trzech trybów produktowych na `/` — przełączenie login ↔ bootstrap_admin ↔ register / thank_you; przekazanie CTA z `LoginCard`. Major Faza 17 HOW #1 / #5; `SPEC-FRONTEND.md` F-4a / F-8.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx`

#### Refaktor — `home-entry.tsx` (`GuestView` + render)

**teraz:**

```tsx
export type GuestView =
  | {
      readonly mode: 'login';
      readonly successHint?: string | null;
      readonly activationError?: string | null;
    }
  | { readonly mode: 'register' }
  | { readonly mode: 'thank_you'; readonly email: string };

// w return:
{view.mode === 'thank_you' ? (
  <RegistrationThankYou /* … */ />
) : view.mode === 'register' ? (
  <RegisterForm /* … */ />
) : (
  <LoginCard
    bootstrapAvailable={bootstrapAvailable}
    onGoRegister={() => setView({ mode: 'register' })}
    successHint={view.successHint ?? null}
    activationError={view.activationError ?? null}
  />
)}
```

**zamień na:**

```tsx
import { BootstrapAdminForm } from '@/modules/auth/components/bootstrap-admin-form';

export type GuestView =
  | {
      readonly mode: 'login';
      readonly successHint?: string | null;
      readonly activationError?: string | null;
    }
  | { readonly mode: 'register' }
  | { readonly mode: 'bootstrap_admin' }
  | { readonly mode: 'thank_you'; readonly email: string };

// w return (gałąź widoków gościa — reszta HomeEntryInner bez zmian: probe, activate, skeleton):
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
) : view.mode === 'bootstrap_admin' ? (
  <BootstrapAdminForm onBackToLogin={() => setView({ mode: 'login' })} />
) : (
  <LoginCard
    bootstrapAvailable={bootstrapAvailable}
    onGoRegister={() => setView({ mode: 'register' })}
    onGoBootstrapAdmin={() => setView({ mode: 'bootstrap_admin' })}
    successHint={view.successHint ?? null}
    activationError={view.activationError ?? null}
  />
)}
```

**Uwaga implementacyjna:** deep link activate (`/?activationToken=`) nadal wymusza `mode: 'login'` — **bez** auto-wejścia w bootstrap. `fetchBootstrapStatus` bez zmian.

**Biblioteki / API:** bez nowych klientaów HTTP.

**Testy:** brak automatycznych. Regresja: `available === true` → CTA admin → formularz → sukces → `/account`; powrót → login; register nadal tylko gdy `available === false`; activate toast bez regresji.

**DoD kroku:**

- `GuestView` zawiera `bootstrap_admin`.
- Montaż `BootstrapAdminForm` + `onGoBootstrapAdmin` na `LoginCard`.
- Rejestracja / thank-you / activate **nietknięte** w zachowaniu (tylko rozszerzenie unii i gałąź renderu).
- Brak nowej trasy App Router pod first-run.

---

#### Propozycja commit message

```text
feat(auth): split bootstrap admin into a dedicated home form

Stop mode-hijacking login submit when bootstrap is available so operators can
still sign in, and expose first-admin creation only via an explicit CTA.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major Faza 17 | Trzy tryby na `/`; login ≠ bootstrap submit; CTA admin iff `available`; register bramka bez zmian |
| docs / SPEC | `ux_dashboard.md`, F-4a / F-8, A-1a |
| API | Tylko istniejące bootstrap-status / bootstrap-admin — **bez** nowej fazy BE |
| Kod nowych plików | `bootstrap-admin-form.tsx` kompletny w planie |
| Refaktory | Fragmenty `LoginCard` + `home-entry` |
| Visual | Dziedziczenie locku Fazy 1 — bez nowej palety |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, na końcu FAZA 1 |
| Statusy | `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC | nietknięte w tej sesji |

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po wdrożeniu HOW |
|---------|------------------|
| Faza 17 | `WYKONANY` |
| MILESTONE 17 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1 / 1.2 / Faza 12 / MILESTONE 1 | bez zmian (historia) |

Edycja major **poza** tym skillem (opcjonalnie po `/feature-implementation`).
