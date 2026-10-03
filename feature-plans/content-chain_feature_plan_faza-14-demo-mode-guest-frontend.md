# Content Chain — feature plan: Faza 14 (DEMO MODE i rola `guest` w UI)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Publiczny `GET /config` → `{ demoMode }`; `DemoChip` **nad** CompletenessChip tylko na dashboardzie gdy `demoMode === true`; locki UI wyłącznie `role === guest` ∧ `demoMode`; `GuestLimitModal` **po** 403 quota `POST /runs`; 429 rating; archiwum — lista OK, **brak** nawigacji do cudzego detail; signup Fazy 12 **bez** `if (!demoMode) hide` |
| Major | `content-chain-frontend_major_plan.md` — **Faza 14** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 14. **Nie** mylić z backend Fazą 14 (auto-close przeglądu) ani z `content-chain_feature_plan_faza-18-demo-guest.md` (HOW **api**) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 14) |
| Kolejność KROK ≠ major | Major nie ma 14.1/14.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md`, `docs/dictionary.md`, `docs/security.md`, `docs/brand_types.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-10 / F-4b / F-8, `SPEC-AUTH.md` (rola `guest`), `SPEC-KOMUNIKACJA.md` K-11 / K-12, major FE Faza 14 |
| Zależność api | Kontrakt z docs/SPEC; implementacja Nest = backend Faza 18 / `feature-plans/content-chain_feature_plan_faza-18-demo-guest.md`. FE **nie** implementuje GuestGuard / Redis / `DEMO_MODE` env. Runtime chipa wymaga `GET /api/v1/config`; runtime sesji `guest` wymaga api, które zwraca `role` w unii z `guest` |
| Refaktor względem | Faza 1 chrome / `GuestView` (`WYKONANY`) — `GuestView` = anonim, **nie** rola `guest`; Faza 2 / 2.2 CompletenessChipSlot; Faza 3 / 3.5 archiwum (Link w każdym wierszu); Faza 12 signup (`WYKONANY`, **bez zmian** flow). MILESTONE 1 / 2 / 3 = historia. Kanon = aktualne docs/SPEC, **nie** treść tych kroków |
| Poza zakresem | Kod Nest/Prisma; switch demo w UI; awans `guest`→`user`/`admin`; bramkowanie signup/thank-you/activate przez `demoMode`; preemptive modal limitu; Playwright; nowa paleta; edycja major/docs/SPEC; FE→gateway |
| Po implementacji (informacyjnie) | Major FE: Faza 14 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 14. **Edycja major poza tym skillem.** |

**Pass rozwojowy — przesunięcia:** brak przesunięć.

1. **KROK 1** — `UserRole` += `guest` + klient `/config` + kody quota + allowlista (zanim provider / locki / modal).
2. **KROK 2** — `DemoModeProvider` + `DemoChip` (zanim locki czytają `demoMode`).
3. **KROK 3** — predykat `guestLocked` + powierzchnie locków.
4. **KROK 4** — archiwum: brak Link do cudzego detail.
5. **KROK 5** — modal po odpowiedzi API + 429 rating.

**HOW:** egzekucja limitów = API; FE odzwierciedla. Completeness / `agentsActive` (Faza 13) **bez zmian**. Skill `content-chain-product-ui` = dziedziczenie locku Fazy 1 na chipie i modalu.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 — **bez** nowej palety na `DemoChip` / `GuestLimitModal`.

**Typy:** granice propsów `readonly`; unie dyskryminowane stanu providera; `unknown` + parser na body `/config`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych. `demo-mode-guest-role-plan.md` (wzmianka w majorze) **nie** jest w repo — kanon jest w `docs/` + `spec/`.

---

## Założenia

- Fazy 1–13 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 12 (signup zawsze dostępny gdy bootstrap nie jest first-run).
- `demoMode` wyłącznie z publicznego `GET /api/v1/config` (BFF same-origin). V1: **jedno** pole boolean. **Zakaz** czytać capów / Redis / env w FE.
- Chip: **tylko** layout po sesji, gdy `demoMode === true` (także dla `admin` na instancji demo). Przy `false` / loading / error fetcha — chip **niewidoczny** (bez ostrzeżeń ops).
- Locki: `guestLocked` ⇔ `session.status === 'authenticated'` ∧ `session.user.role === 'guest'` ∧ `demo.status === 'ready'` ∧ `demo.demoMode === true`. Admin na demo **bez** locków. `user` na demo **bez** locków gościa.
- Gdy `demoMode` nie jest `ready` — locki **wyłączone** (UI fail-open); API i tak 403/401.
- Allowlista startu guest: `post_ideas` \| `page_copy` \| `page_outline_then_copy`. Disable opcji poza listą **tylko** przy `guestLocked`. `useStartRunGate` / `agentsActive` **zostaje**.
- Kontekst: `readOnly` już dla `role !== 'admin'` — po dodaniu `guest` do unii gość jest read-only **bez** osobnej gałęzi. Users: `navItemsForRole` już `adminOnly`; `UsersView` już `role !== 'admin'` → „Brak dostępu”.
- Email: brak `PATCH /auth/me/email` z UI przy `guestLocked`.
- Edytuj wynik / „Zamknij przegląd”: ukryte/disabled przy `guestLocked`. **Ocena gwiazdkowa** zostaje (429 → envelope, nie toast).
- HITL / Stop / Moje runy / feedback `application`\|`agent` oraz `run` z `useOwnRuns` — **bez** nowych zakazów (lista własnych już filtruje `run`).
- `GuestView` w `home-entry.tsx` **nie** zmienia nazwy ani semantyki (anonim).
- Kontakty modalu (hardcoded FE, sesja):

| `iconName` | `contactData` |
|------------|----------------|
| `lucide:mail` | `mailto:mateo2314@msliwowski.net` |
| `lucide:linkedin` | `https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/` |
| `lucide:github` | `https://github.com/matej2314` |

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `ApiError` | Istniejący `@/shared/api/*` | `GET /config` z `skipAuthRefresh: true`; 403/429 jak inne mutacje — `throw ApiError` |
| React Context + Effect | Context7 `/reactjs/react.dev` (ignore / request id na fetch) | Wzorzec jak `GatewayAliveProvider` (`requestIdRef`); cleanup inkrementuje id |
| Dialog | Istniejący `@/shared/ui/dialog` | Jak `CancelRunDialog` — `z-(--z-modal)`, Esc zamyka, **bez** toastu na quota |
| Visual | `content-chain-product-ui` | Chip: `data-slot`, `border-border`, Iconify `lucide:flask-conical`; modal: karta, CTA linków jako `Button variant="outline"` + ikona; **bez** pill cluster / glow |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (F-10).

---

## FAZA 1 — DEMO MODE i locki `guest`

Odpowiada major **Faza 14**.

---

### KROK 1 — Kontrakt: `UserRole` += `guest`, `GET /config`, quota, allowlista

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Parser sesji/register akceptuje `guest`; cienki klient BFF pod F-10 czyta wyłącznie `demoMode`; stałe quota + allowlista istnieją **zanim** UI ich użyje. Major Faza 14 HOW #1; `SPEC-FRONTEND.md` F-10; `docs/brand_types.md`; `SPEC-KOMUNIKACJA.md` K-11 / K-12.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/frontend/src/modules/users/api/users-labels.ts`
- Nowy: `apps/frontend/src/modules/demo/api/config.types.ts`
- Nowy: `apps/frontend/src/modules/demo/api/config.api.ts`
- Nowy: `apps/frontend/src/modules/demo/lib/guest-policy.ts`

Kolejność w kroku: shared `UserRole` → etykieta Users → typy/parser config → fetch → stałe quota/allowlista.

**Implementacja**

#### Shared — `teraz`

```typescript
export type UserRole = 'admin' | 'user';
```

```typescript
export const USER_ROLES = ['admin', 'user'] as const satisfies readonly UserRole[];
```

#### Shared — `zamień na`

```typescript
export type UserRole = 'admin' | 'user' | 'guest';
```

```typescript
export const USER_ROLES = ['admin', 'user', 'guest'] as const satisfies readonly UserRole[];
```

`isUserRole` **bez zmian** (czyta `USER_ROLES`). To **nie** jest implementacja GuestGuard / register vs `DEMO_MODE` w Nest — wyłącznie unia kontraktu. Backend Faza 18 korzysta z tej samej unii.

#### `users-labels.ts` — `teraz`

```typescript
export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
} as const satisfies Record<UserRole, string>;
```

#### `users-labels.ts` — `zamień na`

```typescript
export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
  guest: 'Gość',
} as const satisfies Record<UserRole, string>;
```

#### Nowy plik — `apps/frontend/src/modules/demo/api/config.types.ts`

```typescript
import { isRecord } from '@/shared/api/envelope';

export type AppConfig = {
  readonly demoMode: boolean;
};

export function parseAppConfig(value: unknown): AppConfig {
  if (!isRecord(value)) {
    throw new Error('Invalid /config payload');
  }
  if (typeof value.demoMode !== 'boolean') {
    throw new Error('Invalid /config.demoMode');
  }
  const keys = Object.keys(value);
  if (keys.length !== 1 || keys[0] !== 'demoMode') {
    throw new Error('Invalid /config extra fields');
  }
  return { demoMode: value.demoMode };
}
```

Parser odrzuca body z polami poza `demoMode` (K-11 V1).

#### Nowy plik — `apps/frontend/src/modules/demo/api/config.api.ts`

```typescript
import { apiFetch } from '@/shared/api/api-fetch';
import { parseAppConfig, type AppConfig } from '@/modules/demo/api/config.types';

export async function fetchAppConfig(): Promise<AppConfig> {
  const body = await apiFetch('/config', { skipAuthRefresh: true });
  return parseAppConfig(body);
}
```

#### Nowy plik — `apps/frontend/src/modules/demo/lib/guest-policy.ts`

```typescript
import type { RunTaskType } from '@content-chain/shared';

export const GUEST_ALLOWED_TASK_TYPES = [
  'post_ideas',
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly RunTaskType[];

export type GuestAllowedTaskType = (typeof GUEST_ALLOWED_TASK_TYPES)[number];

export function isGuestAllowedTaskType(value: RunTaskType): value is GuestAllowedTaskType {
  return (GUEST_ALLOWED_TASK_TYPES as readonly RunTaskType[]).includes(value);
}

export const GUEST_QUOTA_CODES = [
  'GUEST_TYPE_NOT_ALLOWED',
  'GUEST_TYPE_QUOTA_EXCEEDED',
  'GUEST_GLOBAL_QUOTA_EXCEEDED',
] as const;

export type GuestQuotaCode = (typeof GUEST_QUOTA_CODES)[number];

export function isGuestQuotaCode(code: string): code is GuestQuotaCode {
  return (GUEST_QUOTA_CODES as readonly string[]).includes(code);
}

export type GuestContact = {
  readonly iconName: string;
  readonly contactData: string;
  readonly label: string;
};

export const GUEST_CONTACTS: readonly GuestContact[] = [
  {
    iconName: 'lucide:mail',
    contactData: 'mailto:mateo2314@msliwowski.net',
    label: 'E-mail',
  },
  {
    iconName: 'lucide:linkedin',
    contactData: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
    label: 'LinkedIn',
  },
  {
    iconName: 'lucide:github',
    contactData: 'https://github.com/matej2314',
    label: 'GitHub',
  },
] as const;
```

**Biblioteki / API:** `apiFetch` jak `/health/ready`. Parser `unknown` — bez Zod w FE (`SPEC-FRONTEND`).

**Testy:** Playwright poza MVP. Brak nowych testów FE. Shared: `isUserRole('guest') === true` po zmianie unii — bez osobnego pliku testu, o ile repo nie ma suite na `enums.ts`.

**DoD kroku:**

- `isUserRole('guest')` przechodzi; `parseSessionUser` / `parseRegisteredUser` nie rzucają na `role: 'guest'`.
- `parseAppConfig({ demoMode: true })` OK; `{ demoMode: true, cap: 1 }` rzuca; `fetchAppConfig` woła `/api/v1/config`.
- `isGuestQuotaCode('GUEST_TYPE_QUOTA_EXCEEDED')`; `isGuestAllowedTaskType('post_content') === false`.

---

### KROK 2 — `DemoModeProvider` + `DemoChip` nad CompletenessChip

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Boot dashboardu zna `demoMode`; chip widoczny tylko gdy true. Major HOW #1–#3; F-10 pkt 1–2; `docs/ux_dashboard.md` tabela DEMO MODE.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/demo/components/demo-mode-provider.tsx`
- Nowy: `apps/frontend/src/modules/demo/components/demo-chip.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/chrome-slots.tsx`

Kolejność: provider → mount w shellu → chip + slot.

**Implementacja**

#### Nowy plik — `demo-mode-provider.tsx`

```tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';
import { fetchAppConfig } from '@/modules/demo/api/config.api';

export type DemoModeState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly demoMode: boolean };

type DemoModeContextValue = {
  readonly state: DemoModeState;
  readonly refetch: () => Promise<void>;
};

const DemoModeContext = createContext<DemoModeContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function DemoModeProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<DemoModeState>({ status: 'loading' });
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      const config = await fetchAppConfig();
      if (requestId !== requestIdRef.current) return;
      setState({ status: 'ready', demoMode: config.demoMode });
    } catch (reason: unknown) {
      if (requestId !== requestIdRef.current) return;
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK_ENVELOPE });
    }
  }, []);

  useEffect(() => {
    void refetch();
    return () => {
      requestIdRef.current += 1;
    };
  }, [refetch]);

  const value = useMemo(() => ({ state, refetch }), [state, refetch]);

  return <DemoModeContext.Provider value={value}>{children}</DemoModeContext.Provider>;
}

export function useDemoMode(): DemoModeContextValue {
  const value = useContext(DemoModeContext);
  if (!value) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return value;
}
```

Race: request id + cleanup inkrement (jak `GatewayAliveProvider`). Context7 React: ignore stale result — tu id zamiast `ignore` boolean, ten sam efekt.

**Zakaz** `setInterval` / pollingu `demoMode`.

#### Nowy plik — `demo-chip.tsx`

```tsx
'use client';

import { Icon } from '@iconify/react';
import { useDemoMode } from '@/modules/demo/components/demo-mode-provider';

export function DemoChip() {
  const { state } = useDemoMode();
  if (state.status !== 'ready' || !state.demoMode) return null;

  return (
    <div
      data-slot="demo-chip"
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
    >
      <Icon icon="lucide:flask-conical" className="mt-0.5 size-3.5 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <p className="font-medium">Tryb demo aktywny</p>
        <p className="text-muted-foreground">Wybrane funkcje ograniczone.</p>
      </div>
    </div>
  );
}
```

Copy kanoniczne (F-10): „Tryb demo aktywny” / „Wybrane funkcje ograniczone.” Gęstość jak `CompletenessChip`. **Bez** nowej palety, **bez** emoji, **bez** em-dash.

#### `chrome-slots.tsx` — `teraz`

```tsx
export function CompletenessChipSlot() {
  return <CompletenessChip />;
}
```

#### `chrome-slots.tsx` — `zamień na`

```tsx
import { DemoChip } from '@/modules/demo/components/demo-chip';
import { CompletenessChip } from '@/modules/company-context/components/completeness-chip';

export function CompletenessChipSlot() {
  return (
    <div className="flex flex-col gap-2">
      <DemoChip />
      <CompletenessChip />
    </div>
  );
}
```

Chip demo **nad** CompletenessChip. Przy `demoMode === false` `DemoChip` zwraca `null` — slot completeness bez dziury layoutu poza naturalnym `gap`.

#### `dashboard-shell.tsx` — `teraz` (wewnątrz `authenticated`)

```tsx
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <GatewayAliveProvider>
```

#### `dashboard-shell.tsx` — `zamień na`

```tsx
    <EventSourceRegistryProvider>
      <DemoModeProvider>
        <CompletenessProvider>
          <GatewayAliveProvider>
```

Import `DemoModeProvider`. Zamknięcie JSX: dodać `</DemoModeProvider>` tuż wewnątrz `EventSourceRegistryProvider` (po `CompletenessProvider`). Provider **tylko** w dashboardzie — karta logowania / register **bez** chipa (F-10: tylko dashboard).

**Testy:** brak Playwright. Weryfikacja ręczna: `demoMode true` → chip w sidebarze; `false` → brak chipa; strona `/` bez chipa.

**DoD kroku:**

- Mount dashboardu = jeden `GET /config` (BFF).
- Chip wyłącznie gdy `ready && demoMode`; loading/error = brak chipa i **brak** envelope w chrome (nie blokuje CompletenessChip).
- Chip nie renderuje się poza `(app)` shell.

---

### KROK 3 — Predykat `guestLocked` i locki powierzchni

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** UI gościa na instancji demo nie udaje uprawnień admin/`user`. Major HOW #4; F-10 pkt 3; F-8. Egzekucja nadal w API.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/demo/lib/use-guest-locked.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Zmiana: `apps/frontend/src/modules/auth/components/account-email-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-result-section.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-review-panel.tsx`

**Bez zmian wymaganych** (potwierdzić przy implementacji): `nav.ts` (`adminOnly`), `UsersView` (`role !== 'admin'`), `CompanyContextView` (`readOnly` gdy `role !== 'admin'`).

Kolejność: hook → start (allowlista) → email → Edytuj/finalize.

**Implementacja**

#### Nowy plik — `use-guest-locked.ts`

```typescript
'use client';

import { useSession } from '@/modules/auth/components/session-provider';
import { useDemoMode } from '@/modules/demo/components/demo-mode-provider';

export function useGuestLocked(): boolean {
  const { state: session } = useSession();
  const { state: demo } = useDemoMode();
  return (
    session.status === 'authenticated' &&
    session.user.role === 'guest' &&
    demo.status === 'ready' &&
    demo.demoMode
  );
}
```

#### `start-run-form.tsx`

- Import `useGuestLocked`, `isGuestAllowedTaskType`.
- `const guestLocked = useGuestLocked();`
- Na `<option>`: `disabled={guestLocked && !isGuestAllowedTaskType(taskType)}`.
- Submit: `if (guestLocked && !isGuestAllowedTaskType(draft.taskType)) return;` — **bez** otwierania modalu limitu (to KROK 5, tylko po API).
- Pod selectem typów, gdy `guestLocked`:

```tsx
{guestLocked ? (
  <p className="text-xs text-muted-foreground">
    Konto demonstracyjne: dostępne typy to pomysły postów oraz copy / outline strony.
  </p>
) : null}
```

`agentsActive` / `AgentsGateTooltip` **bez zmian**.

#### `account-email-form.tsx` — na początku po `if (state.status !== 'authenticated') return null;`

```tsx
  const guestLocked = useGuestLocked();

  if (guestLocked) {
    return (
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm">
          Email: <span className="font-medium">{current}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Zmiana adresu niedostępna dla konta demonstracyjnego.
        </p>
      </div>
    );
  }
```

**Zakaz** wołać `patchOwnEmail` w tej gałęzi.

#### `run-result-section.tsx`

```tsx
  const guestLocked = useGuestLocked();
  const canEdit = userId !== null && !guestLocked && canEditSnapshot(snapshot, userId, nowMs);
```

#### `run-review-panel.tsx`

Rozszerz props:

```tsx
type RunReviewPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId;
  readonly finalizeDisabled: boolean;
  readonly guestLocked: boolean;
  readonly onReload: () => Promise<void>;
};
```

Gwiazdki / „Bez oceny”: nadal `reviewable` (guest **może** oceniać własne).

Przycisk „Zamknij przegląd”:

```tsx
      {reviewable && !guestLocked ? (
        <Button
          type="button"
          disabled={pending || finalizeDisabled}
          title={finalizeDisabled ? 'Najpierw zapisz albo anuluj edycję wyniku.' : undefined}
          onClick={() => {
            void runAction(async () => {
              await finalizeRunReview(snapshot.runId);
            });
          }}
        >
          Zamknij przegląd
        </Button>
      ) : null}
```

W `run-details-view.tsx` przekaż `guestLocked={useGuestLocked()}` (hook na górze komponentu, nie warunkowo).

**Testy:** brak automatycznych FE.

**DoD kroku:**

- `guest` ∧ demo on: typy poza allowlistą `disabled`; brak formularza zmiany emaila; brak CTA Edytuj i „Zamknij przegląd”; Users nadal „Brak dostępu”; kontekst read-only.
- `admin` ∧ demo on: **brak** tych locków; chip demo **jest**.
- `user` ∧ demo on: **brak** locków gościa.
- `guest` ∧ `demoMode === false`: locki UI off (sesja i tak padnie 401 z api — poza tym wycinkiem).

---

### KROK 4 — Archiwum: lista OK, brak nawigacji do cudzego detail

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Gość widzi archiwum instancji; nie wchodzi w cudzy `/runs/:id` z listy. Major HOW #6; F-8 / F-10; `docs/ux_dashboard.md` (guest: tylko własne szczegóły). API 403 zostaje siatką na deep link.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`

**Implementacja**

W mapowaniu wiersza (`result.items.map`):

#### `teraz`

```tsx
                  <td className="py-2 pr-3">
                    <Link
                      href={`/runs/${item.runId}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {RUN_TASK_TYPE_LABELS[item.taskType]}
                    </Link>
                  </td>
```

#### `zamień na`

```tsx
                  <td className="py-2 pr-3">
                    {guestLocked &&
                    (session.status !== 'authenticated' ||
                      item.startedBy === null ||
                      item.startedBy.id !== session.user.id) ? (
                      <span>{RUN_TASK_TYPE_LABELS[item.taskType]}</span>
                    ) : (
                      <Link
                        href={`/runs/${item.runId}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {RUN_TASK_TYPE_LABELS[item.taskType]}
                      </Link>
                    )}
                  </td>
```

Na górze `ArchiveRunsView`: `const guestLocked = useGuestLocked();`

Własny wiersz gościa: Link zostaje. Admin/`user`: zachowanie jak dziś (Link zawsze).

Deep link `/runs/:id` cudzego runu: istniejący `EnvelopeError` z 403 — **bez** osobnego redirectu (F-10: API 403).

**DoD kroku:**

- Gość + demo: wiersz cudzy **bez** `href`; wiersz własny z `Link`.
- Lista nadal całe archiwum (paginacja / filtry bez wycięcia cudzych).
- Admin na demo: wszystkie wiersze z Link.

---

### KROK 5 — `GuestLimitModal` po quota `POST /runs` + 429 rating

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Limit slotu/capu nie jest zgadywany w UI; operator widzi modal **po** 403 z kodami `GUEST_*` i kontakty. Rating 429: `message` z envelope przy gwiazdkach, **nie** toast. Major HOW #5–#6; F-10 pkt 4–5; mapa toasta UX: quota **nie** toast.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/demo/components/guest-limit-modal.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx` (catch `POST /runs`)
- Zmiana: `apps/frontend/src/modules/runs/components/run-review-panel.tsx` (już ustawia envelope — doprecyzować 429)

**Zakaz:** otwierać modal na disable option / przed `startRun`.

**Implementacja**

#### Nowy plik — `guest-limit-modal.tsx`

```tsx
'use client';

import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { GUEST_CONTACTS } from '@/modules/demo/lib/guest-policy';

type GuestLimitModalProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly code: string | null;
  readonly message: string | null;
};

export function GuestLimitModal({ open, onOpenChange, code, message }: GuestLimitModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-(--z-modal) sm:max-w-md" data-slot="guest-limit-modal">
        <DialogHeader>
          <DialogTitle>Limit konta demonstracyjnego</DialogTitle>
          <DialogDescription>
            Ten start nie przeszedł limitu instancji. Skontaktuj się, jeśli chcesz pełny dostęp.
          </DialogDescription>
        </DialogHeader>
        {code !== null && message !== null ? (
          <EnvelopeError code={code} message={message} />
        ) : null}
        <ul className="flex flex-col gap-2">
          {GUEST_CONTACTS.map((contact) => (
            <li key={contact.contactData}>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a
                  href={contact.contactData}
                  target={contact.contactData.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    contact.contactData.startsWith('mailto:') ? undefined : 'noreferrer noopener'
                  }
                >
                  <Icon icon={contact.iconName} className="size-4 shrink-0" />
                  {contact.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Zamknij
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Jeśli `Button` w kitcie **nie** ma `asChild` — zamiennik: `<a className={buttonVariants({ variant: 'outline' })} …>` z istniejącym `buttonVariants` / klasami `Button`. **Nie** instalować nowej libki. Motion: tylko otwarcie dialogu z kitu (`opacity`/`transform`). Uzasadnienie: feedback stanu limitu, nie dekoracja.

#### `start-run-form.tsx` — stan + catch

```tsx
  const [quota, setQuota] = useState<{ code: string; message: string } | null>(null);

  // w onSubmit, przed startRun:
  setQuota(null);

  // w catch zamiast zawsze setError:
      if (reason instanceof ApiError) {
        if (isGuestQuotaCode(reason.envelope.code)) {
          setQuota({ code: reason.envelope.code, message: reason.envelope.message });
          setError(null);
          return;
        }
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
```

Na końcu JSX formularza:

```tsx
      <GuestLimitModal
        open={quota !== null}
        onOpenChange={(next) => {
          if (!next) setQuota(null);
        }}
        code={quota?.code ?? null}
        message={quota?.message ?? null}
      />
```

**403** inne niż `GUEST_*` (np. `FORBIDDEN`) zostają na `EnvelopeError` formularza. **409** `CONTEXT_INCOMPLETE` bez zmian. Toast sukcesu 202 bez zmian. Toast na quota: **zakaz**.

Obie powierzchnie startu (Konto + modal Runy) używają `StartRunForm` — jeden catch pokrywa obie.

#### Rating 429

W `runAction` recenzji: `ApiError` już → `setEnvelope(reason.envelope)`. 429 nie jest 401 → `apiFetch` **nie** wylogowuje. DoD: gwiazdka przy capie pokazuje `code` + `message` as-is pod panelem, **bez** `notifyProduct`.

Jeśli `reason.status === 429`, **nie** mapować na inny copy.

**DoD kroku:**

- `POST /runs` 403 `GUEST_TYPE_QUOTA_EXCEEDED` \| `GUEST_GLOBAL_QUOTA_EXCEEDED` \| `GUEST_TYPE_NOT_ALLOWED` → modal z envelope + 3 CTA kontaktów; **bez** toasta.
- Inny błąd startu → jak dziś, modal zamknięty.
- Disable typu **nie** otwiera modalu.
- `PATCH .../rating` 429 → envelope przy gwiazdkach.

---

#### Propozycja commit message

```text
feat(frontend): surface demo mode and guest limits on the dashboard

Show a chrome chip from GET /config and lock guest-only actions when demo is on, opening the quota modal only after the API rejects a start.
```

---

## Weryfikacja wycinka

| Check | Kryterium |
|-------|-----------|
| Kotwica | Major FE Faza 14 (nie BE 14 / 18) |
| F-10 | `GET /config`; chip tylko dashboard + `demoMode`; locki `guest` ∧ demo; modal po quota; 429 rating |
| F-4b | Signup / thank-you / activate **nietknięte** |
| F-6 | Completeness / `agentsActive` **nietknięte** |
| F-8 | `GuestView` ≠ rola `guest`; archiwum lista OK; brak Link cudzego detail |
| Kod | Nowe pliki kompletne; refaktory fragmentami |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit | jeden komunikat EN Conventional Commits na fazę |
| Statusy | `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC | nietknięte w tej sesji |
| Sekrety | brak tokenów; kontakty = publiczne URL / mailto z sesji |

**Pre-flight UI (`content-chain-product-ui`):** IA bez zmian; dziedziczenie tokenów; envelope as-is; modal `z-modal`; Iconify lucide spójne z chrome; zero hero/bento/emoji/em-dash.

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po wdrożeniu HOW |
|---------|------------------|
| FE Faza 14 | `WYKONANY` |
| MILESTONE 14 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1 / 2 / 3 / 12 / 13 | historia — **bez** przepisywania |
| Backend Faza 18 | osobny ślad (api) |

Edycja pliku major = **poza** tym skillem.
