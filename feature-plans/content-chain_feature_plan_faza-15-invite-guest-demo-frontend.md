# Content Chain — feature plan: Faza 15 (Invite w DEMO → guest + regresja locków, FE)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Po accept-invite + login na instancji demo zaproszony ma `role=guest` → **te same** locki F-10 / Faza 14 co po register; formularz accept **role-agnostyczny**; Users „Gość”; **bez** pickera roli; opcjonalne copy demo na karcie accept (publiczny `GET /config`) |
| Major | `content-chain-frontend_major_plan.md` — **Faza 15** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 15. **Nie** mylić z backend Fazą 15 (anti-enumeration) ani z `content-chain_feature_plan_faza-19-accept-invite-demo-role.md` (HOW **api**) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 15) |
| Kolejność KROK ≠ major | Major nie ma 15.1/15.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md` (DEMO MODE / accept-invite), `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-10 / F-8 / F-4b, `SPEC-AUTH.md` A-7b / A-11, major FE Faza 15 |
| Zależność api | Kontrakt: `POST /auth/accept-invite` przy `DEMO_MODE=true` → `user.role=guest` w **201**; po loginie te same 403/429/quota co self-register guest. Implementacja Nest = backend **Faza 19** / `feature-plans/content-chain_feature_plan_faza-19-accept-invite-demo-role.md`. FE **nie** implementuje api. Smoke invite→guest wymaga wdrożonego api (gate BE już dopisany). |
| Refaktor względem | **Faza 14** (`WYKONANY`) — locki/chip zakładają `guest` (głównie ścieżka register); **Faza 1 / Krok 1.3** (`WYKONANY`) — accept bez świadomości roli vs demo; **Faza 11** (`WYKONANY`) — copy błędów 401 **bez** zmiany kanału. MILESTONE 1 / Faza 11 / Faza 14 = historia. Kanon = aktualne docs/SPEC, **nie** „invite = pełny user”. |
| Poza zakresem | Kod Nest/Prisma / mail `user_invited`; nowy chip; zmiana predykatu `guestLocked`; bramkowanie signup/thank-you/activate przez `demoMode`; picker roli; UI awansu; montowanie `DemoModeProvider` poza dashboardem; Playwright; migracja kont; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major FE: Faza 15 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 15. **Edycja major poza tym skillem.** |

**Pass rozwojowy:** brak przesunięć.

1. **KROK 1** — audyt + mikro-hardening `acceptInvite` (parsowanie `guest` w 201, flow bez sesji) **zanim** copy czyta `/config`.
2. **KROK 2** — copy demo na karcie accept (reuse `fetchAppConfig` z Fazy 14).

**HOW:** predykat F-10 **bez zmian**; accept flow (hasło → `/` → login, bez cookie) **bez zmian**; egzekucja roli = api; FE odzwierciedla po sesji. Skill `content-chain-product-ui` = dziedziczenie locku na copy accept.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 na `/invite/accept` — **bez** nowej palety.

**Typy:** granice propsów `readonly`; `acceptInvite` → `Promise<void>` (walidacja body bez udawania sesji); stan lokalny demo hint jako unia dyskryminowana / boolean; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych. `change_invited_user_role-plan.md` (wzmianka w majorze) **nie** jest w repo — kanon jest w `docs/` + `spec/`.

---

## Założenia

- Fazy 1–14 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 12 (signup) ani Fazy 14 (chip/locki/modal).
- Accept: body wyłącznie `{ token, password }` — **zakaz** `role` w body / pickera. Po **201** → `router.replace('/')` — **bez** Set-Cookie; dashboard dopiero po `POST /auth/login`.
- Rola po loginie przy demo on = `guest` (api Faza 19). Locki = istniejący `useGuestLocked()` (`role === 'guest'` ∧ `demoMode`) — **bez** drugiej gałęzi „invite guest”.
- Users (admin): `USER_ROLE_LABELS.guest === 'Gość'` już jest — **bez** nowego API / etykiety.
- Create invite: `createInvitation(email)` → `{ email }` — **bez** pola roli.
- Copy na accept: **tylko** gdy publiczny `GET /config` zwróci `demoMode === true`. Przy loading / error / `false` — **brak** hintu (fail-silent; formularz działa).
- **Zakaz** `if (!demoMode) hide` na accept / signup. **Zakaz** Toastera na accept (Faza 11 / 3.6).
- Błędy accept: kanał Fazy 11 (`toAcceptInviteFormError` + stała PL dla 401) — **bez zmian**.
- Mail invite (copy o sandboxie) = warstwa api / mailer — **poza** tym plikiem.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `parseAppConfig` | Istniejący `@/shared/api/*`, `@/modules/demo/api/*` | `GET /config` z `skipAuthRefresh: true` (jak Faza 14) |
| React client fetch | Istniejący wzorzec `useEffect` + `requestIdRef` (DemoModeProvider) | Lokalny stan w `AcceptInviteForm` — **bez** montowania `DemoModeProvider` na trasie publicznej |
| Visual | `content-chain-product-ui` | Jedno zdanie `text-sm text-muted-foreground` w `CardHeader`; **bez** badge/chip/pill |
| Context7 | — | Brak nowych API bibliotek — research zbędny |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Invite w DEMO: konto `guest` po accept + regresja locków

Odpowiada major **Faza 15**.

---

### KROK 1 — Audyt kontraktu FE + hardening `acceptInvite` (role-agnostyczny)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Potwierdzić i domknąć, że FE **nie** zakłada `role=user` po accept; parser akceptuje `guest` w **201**; invite UI bez pickera; Users pokazuje „Gość”; locki Fazy 14 działają po loginie bez drugiego predykatu. Major Faza 15 HOW #1, #4, #5; `SPEC-FRONTEND.md` F-10; `SPEC-AUTH.md` A-7b.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/api/auth.api.ts` (`acceptInvite`)
- Zmiana: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx` (tylko jeśli trzeba dopasować wywołanie po zmianie sygnatury — zwykle `await acceptInvite(...)` bez użycia wyniku)
- Audyt bez diffu (o ile już spełnione): `session.types.ts` (`isUserRole` / `guest`), `users-labels.ts`, `invitations.api.ts` (`{ email }`), `use-guest-locked.ts`, `users-view.tsx` (brak selecta roli)

**Kolejność w kroku:** audyt checklist → hardening `acceptInvite` → smoke kompilacji typów formularza.

#### Audyt (stan wyjściowy — oczekiwane „już OK”)

| Check | Oczekiwanie |
|-------|-------------|
| Body accept | `{ token, password }` — bez `role` |
| Body invite (admin) | `{ email }` — bez `role` |
| Parser sesji / accept 201 | `isUserRole` obejmuje `'guest'` (Faza 14) |
| `USER_ROLE_LABELS.guest` | `'Gość'` |
| Predykat locków | wyłącznie `useGuestLocked()` — bez gałęzi „źródło konta” |
| Signup Faza 12 | **bez** `if (!demoMode)` |
| Accept | **bez** `if (!demoMode) hide` |

Jeśli któryś check padnie — **napraw w tym kroku** (mikro-fix). Jeśli wszystkie OK poza sygnaturą `acceptInvite` — jedyny obowiązkowy diff = hardening poniżej.

#### Refaktor — `acceptInvite`: waliduj 201, nie udawaj sesji

Plik: `apps/frontend/src/modules/auth/api/auth.api.ts`

**Teraz:**

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

**Zamień na:**

```typescript
/**
 * Publiczny accept-invite: **201** bez Set-Cookie.
 * Parsuje `user.role` (w tym `guest` przy demo on — api Faza 19), ale **nie**
 * ustanawia sesji FE — dashboard dopiero po `loginSession`.
 */
export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<void> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  // Walidacja kształtu + roli (guest|user|admin) — wynik celowo odrzucony.
  parseAuthUserWrapper(body);
}
```

`AcceptInviteForm` już robi `await acceptInvite({ token, password })` bez użycia wyniku — **bez** dalszej zmiany, o ile typy się zgadzają.

**Biblioteki / API:** istniejący `parseAuthUserWrapper` / `isUserRole` (Faza 14). Po wdrożeniu api Faza 19 body z `role: 'guest'` przechodzi parser; historyczne `role: 'user'` też.

**Testy:** brak nowych unitów FE (kanon: Playwright poza zakresem). Ręcznie: po BE 19 — accept przy demo on → login → `GET /auth/me` z `role=guest` (checklist w weryfikacji wycinka).

**DoD kroku:**

- `acceptInvite` zwraca `Promise<void>`; nadal parsuje wrapper `{ user }` z rolą z unii `UserRole` (w tym `guest`).
- Formularz accept / create invite **bez** pola `role`.
- `USER_ROLE_LABELS.guest === 'Gość'`; `useGuestLocked` **bez** zmian treści predykatu.
- Brak diffu w Faza 12 (register/thank-you/activate) i **brak** `if (!demoMode)` na accept.
- Typecheck / istniejące testy FE zielone (jeśli są w CI dla tych plików).

---

### KROK 2 — Opcjonalne copy demo na karcie accept (`GET /config`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedno zdanie PL na `/invite/accept`, gdy `demoMode === true`: zaproszony na demo = gość sandboxu (ograniczenia), **bez** zmiany flow hasło→`/`→login. Major Faza 15 HOW #3; `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-10; dziedziczenie `content-chain-product-ui`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/accept-invite-demo-copy.ts`
- Zmiana: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`

**Kolejność w kroku:** stała copy → fetch lokalny w formularzu → render hintu.

#### Nowy plik — `accept-invite-demo-copy.ts`

```typescript
/** Hint na publicznej karcie accept — tylko gdy GET /config.demoMode === true. */
export const ACCEPT_INVITE_DEMO_HINT =
  'Na tej instalacji w trybie demo konto z zaproszenia ma ograniczenia gościa sandboxu. Pełne funkcje zespołu (m.in. zarządzanie użytkownikami) są niedostępne.';
```

#### Refaktor — `AcceptInviteForm`: lokalny odczyt `demoMode` + hint

Plik: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`

**Teraz** (fragment — importy + stan + `CardHeader`):

```typescript
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { acceptInvite } from '@/modules/auth/api/auth.api';
import {
  toAcceptInviteFormError,
  type AcceptInviteFormError,
} from '@/modules/auth/accept-invite-form-error';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';

type AcceptInviteFormProps = {
  readonly token: string;
};

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<AcceptInviteFormError | null>(null);
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    // … bez zmian logiki submit …
  }

  // … gałąź token.length === 0 bez zmian …

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Ustaw pierwsze hasło</CardTitle>
        <p className="text-sm text-muted-foreground">
          Po zapisaniu wrócisz na kartę logowania. Dashboard otworzy się dopiero po zalogowaniu.
        </p>
      </CardHeader>
      {/* … form bez zmian … */}
    </Card>
  );
}
```

**Zamień na** (pełny plik po kroku — łącznie z KROK 1: `acceptInvite` → void):

```typescript
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

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<AcceptInviteFormError | null>(null);
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);
  const [showDemoHint, setShowDemoHint] = useState(false);
  const configRequestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++configRequestIdRef.current;
    void (async () => {
      try {
        const config = await fetchAppConfig();
        if (requestId !== configRequestIdRef.current) return;
        setShowDemoHint(config.demoMode);
      } catch {
        if (requestId !== configRequestIdRef.current) return;
        // Fail-silent: brak hintu; formularz accept działa bez /config.
        setShowDemoHint(false);
      }
    })();
    return () => {
      configRequestIdRef.current += 1;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    if (!passwordMeetsPolicy(password)) {
      setLocalHint('Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).');
      return;
    }
    setLocalHint(undefined);
    setPending(true);
    try {
      await acceptInvite({ token, password });
      router.replace('/');
    } catch (reason: unknown) {
      setError(toAcceptInviteFormError(reason));
    } finally {
      setPending(false);
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
        {showDemoHint ? (
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
            error={localHint}
          >
            <Input
              id="invite-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zapisz hasło'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Uwagi implementacyjne:**

- **Nie** owijać strony w `DemoModeProvider` (slot chipa = tylko dashboard).
- Hint **nie** blokuje submitu; **nie** zmienia CTA / trasy.
- Błędy Fazy 11 (`EnvelopeError`) **bez zmian**.
- Visual: ten sam `Card` / `shadow-none` / `text-muted-foreground` — bez Iconify „demo badge” na tej karcie.

**Biblioteki / API:** `fetchAppConfig` (Faza 14). Brak nowych zależności npm.

**Testy:** ręcznie — demo on: hint widoczny; demo off / padający `/config`: hint niewidoczny, accept działa.

**DoD kroku:**

- Przy `demoMode === true` karta pokazuje dokładnie `ACCEPT_INVITE_DEMO_HINT`.
- Przy `false` / loading→error: brak hintu; flow accept niezmieniony.
- Brak Toastera; brak nowego chipa; brak `DemoModeProvider` na `/invite/accept`.
- Dziedziczenie locku Fazy 1 (gęstość, kolory tokenów) — bez nowej palety.

---

#### Propozycja commit message

```text
feat(frontend): clarify invite accept for demo guest path

Keep accept role-agnostic and surface a short demo sandbox hint from public config so invited guests match F-10 locks after login.
```

---

## Weryfikacja wycinka

### DoD techniczne

- [ ] `acceptInvite`: `Promise<void>` + parse `{ user }` z `UserRole` (w tym `guest`); body tylko `token` + `password`.
- [ ] Po sukcesie: `router.replace('/')` — bez cookie / bez auto-dashboard.
- [ ] Copy demo: widoczny wyłącznie przy `demoMode === true` z `GET /config`.
- [ ] Predykat `useGuestLocked` **bez zmian**; brak drugiej ścieżki „invite guest”.
- [ ] Users: zaproszony z `role=guest` → etykieta „Gość” (`USER_ROLE_LABELS`).
- [ ] Create invite: nadal tylko email — **bez** pickera roli.
- [ ] Faza 12 (signup/thank-you/activate) **bez** diffu; accept **bez** `if (!demoMode) hide`.
- [ ] Faza 11 (401 / anti-enum copy) **bez regresji**.

### Smoke UX (po wdrożeniu api Faza 19)

1. `DEMO_MODE=true` → admin invite → accept (hint widoczny) → login → `DemoChip` + locki jak register guest (allowlista startu, brak Users, kontekst read-only, email lock, brak Edytuj/finalize).
2. `DEMO_MODE=false` → accept (brak hintu) → login → `role=user` → **bez** locków gościa.
3. Lista Users (admin, demo): konto zaproszone = „Gość”.

### Zgodność docs / SPEC

- `docs/ux_dashboard.md` — invite przy demo = gość sandboxu; F-10 ten sam predykat.
- `SPEC-FRONTEND.md` F-10 — locki po sesji `guest`; accept flow bez zmian.
- `SPEC-AUTH.md` A-7b — rola vs `DEMO_MODE` po stronie api; FE nie pinuje `user`.

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po implementacji tego HOW |
|---------|---------------------------|
| `content-chain-frontend_major_plan.md` — **Faza 15** | `WYKONANY` |
| MILESTONE 15 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1 / 1.3, Faza 11, Faza 14 | bez zmian statusów (historia) |
| `content-chain-backend_major_plan.md` — Faza 19 | osobny ślad (api); ten plik go **nie** oznacza |

Edycja major **poza** tą sesją feature planu (ręcznie lub w `/feature-implementation` na życzenie użytkownika).
