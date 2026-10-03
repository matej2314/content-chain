# Content Chain — feature plan: Faza 13 (bramka „Agenci aktywni” z liveness gateway)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Chip + disable CTA startu = `agentsActive` ⇔ `contextComplete` ∧ `gatewayAlive`; `gatewayAlive` z publicznego `GET /api/v1/health/ready` → `checks.gateway`; copy nieaktywnego kanoniczne; remedacja `missing` tylko gdy kontekst niekompletny; refetch mount + przy okazji (po PUT kontekstu); **bez** interval i FE→gateway |
| Major | `content-chain-frontend_major_plan.md` — **Faza 13** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 13. **Nie** mylić z backend Fazą 13 (re-auth email) ani z `content-chain_feature_plan_faza-17-health-ready.md` (HOW **api**) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 13) |
| Kolejność KROK ≠ major | Major nie ma 13.1/13.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md`, `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `docs/anty_patterny.md`, `SPEC-FRONTEND.md` F-6 / F-8, `SPEC-KOMUNIKACJA.md` (ready api), major FE Faza 13 |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-17-health-ready.md`. FE **nie** implementuje Nest. Runtime FE wymaga wdrożonego `GET /api/v1/health/ready` (backend Faza 17) |
| Refaktor względem | Faza 2 / Krok 2.2 (`WYKONANY`) — chip tylko z completeness; Faza 3 / 3.1 oraz Faza 7 / 7.2 (`WYKONANY`) — `useStartRunGate` tylko z completeness. MILESTONE 2 / 3 = historia. Kanon = aktualne docs/SPEC, **nie** treść Kroku 2.2 / 3.1 / 7.2 |
| Poza zakresem | Kod BE; FE→gateway; interval polling; reject `POST /runs` za gateway down; gateway w kropkach zakładek; zmiana `isComplete` / BC company-context; Playwright; nowa paleta; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major FE: Faza 13 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 13. **Edycja major poza tym skillem.** |

**Pass rozwojowy — przesunięcia:** brak przesunięć.

1. **KROK 1** — typy + klient `/health/ready` (zanim provider / UI).
2. **KROK 2** — `GatewayAliveProvider` + kompozycja `agentsActive` + mount w shellu + refetch po PUT (zanim chip/gate czyta stan).
3. **KROK 3** — chip + `useStartRunGate` konsumują kompozycję.

**HOW:** osobny sygnał sieciowy `gatewayAlive` **obok** `CompletenessProvider` — **bez** wpinania sieci do `completeness` / `isComplete`. Skill `content-chain-product-ui` = dziedziczenie locku Fazy 1 na chipie / tooltipach.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`) — **bez** nowej palety na chip / tooltip / CTA.

**Typy:** granice propsów `readonly`; unie dyskryminowane stanu providera; `unknown` + parser na body `/health/ready`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych. `ready-state-fix-plan.md` (wzmianka w majorze) **nie** jest w repo — kanon jest w `docs/` + `spec/`.

---

## Założenia

- Fazy 1–12 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 2 / 2.2 / 3 / 3.1 / 7 / 7.2 / MILESTONE 2 / 3.
- Predykat: `agentsActive` ⇔ (`completeness.status === 'ready'` ∧ `completeness.complete === true`) ∧ (`gateway.status === 'ready'` ∧ `gatewayAlive === true`).
- `gatewayAlive` ⇔ `checks.gateway.status === "healthy"` z body api `/health/ready` (nie agregat `status` jako jedyne źródło; nie `checks.api`).
- Endpoint publiczny (jak liveness): `apiFetch` z `skipAuthRefresh: true`; **bez** sesji; wyłącznie BFF same-origin `/api/v1/health/ready`.
- HTTP api: **200** przy żywym procesie api; werdykt w body (`ready` \| `not_ready`). FE **nie** interpretuje 503 jako jedyny sygnał „nieaktywny”.
- Odświeżanie: mount providera + `refetch` po udanym PUT kontekstu (obok `useCompleteness().refetch`) — **zakaz** `setInterval` / polling.
- Kropki zakładek kontekstu: **bez zmian** — wyłącznie `completeness.missing`.
- Lokalny `isComplete` (C-1): **bez zmian** — bez sieci / gateway.
- Twarda bramka `POST /runs`: nadal tylko `409` `CONTEXT_INCOMPLETE` z api — UI disable CTA przy `!agentsActive`; **bez** nowego kodu HTTP „gateway down” po stronie FE.
- Copy nieaktywnego (chip body / tooltip CTA): **„Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.”**
- Gdy `complete === false`: wolno **dodatkowo** lista `missing` + link „Uzupełnij kontekst”.
- Gdy `complete === true` a `!gatewayAlive`: **bez** linku „Uzupełnij kontekst” jako jedynej remedacji.
- Loading / error jednego z sygnałów ⇒ `agentsActive === false` (CTA disabled).

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `apiFetch` / `ApiError` | Istniejący `@/shared/api/*` | `GET /health/ready` z `skipAuthRefresh: true`; body przez parser `unknown` |
| React Context + `useEffect` | Context7 `/reactjs/react.dev` (useEffect race: ignore / request id) | Wzorzec jak `CompletenessProvider` (`requestIdRef`); cleanup inkrementuje id |
| Visual | `content-chain-product-ui` | Chip: `data-slot`, `border-border`, Iconify `lucide:check` / `lucide:octagon-pause`, gęstość jak dziś; **bez** nowej palety / glow / pill cluster |
| Tooltip / Button | Istniejący kit (`AgentsGateTooltip`) | Ten sam `Tooltip` + disable CTA |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (F-6).

---

## FAZA 1 — Bramka „Agenci aktywni” z liveness gateway

Odpowiada major **Faza 13**.

---

### KROK 1 — Typy + klient `GET /api/v1/health/ready`

**Status:** `WYKONANY`

**Cel:** Cienki klient BFF pod F-6 — parsowanie body readiness i odczyt `checks.gateway` bez sekretów. Major Faza 13 HOW #1; `SPEC-FRONTEND.md` F-6; `docs/dokumentacja_komunikacji.md` (`GET /api/v1/health/ready`).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/health/api/health.types.ts`
- Nowy: `apps/frontend/src/modules/health/api/health.api.ts`

Kolejność w kroku: typy/parser → funkcja API.

#### Nowy plik — `health.types.ts`

```typescript
export type HealthCheckStatus = 'healthy' | 'unhealthy';

export type HealthReadyAggregate = 'ready' | 'not_ready';

export type HealthCheck = {
  readonly status: HealthCheckStatus;
  readonly message: string;
};

export type HealthReadyResponse = {
  readonly status: HealthReadyAggregate;
  readonly timestamp: string;
  readonly checks: {
    readonly api: HealthCheck;
    readonly gateway: HealthCheck;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseHealthCheck(value: unknown, label: string): HealthCheck {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${label}`);
  }
  if (value.status !== 'healthy' && value.status !== 'unhealthy') {
    throw new Error(`Invalid ${label}.status`);
  }
  if (typeof value.message !== 'string') {
    throw new Error(`Invalid ${label}.message`);
  }
  return { status: value.status, message: value.message };
}

export function parseHealthReadyResponse(value: unknown): HealthReadyResponse {
  if (!isRecord(value)) {
    throw new Error('Invalid health/ready payload');
  }
  if (value.status !== 'ready' && value.status !== 'not_ready') {
    throw new Error('Invalid health/ready.status');
  }
  if (typeof value.timestamp !== 'string' || value.timestamp.trim().length === 0) {
    throw new Error('Invalid health/ready.timestamp');
  }
  if (!isRecord(value.checks)) {
    throw new Error('Invalid health/ready.checks');
  }
  return {
    status: value.status,
    timestamp: value.timestamp,
    checks: {
      api: parseHealthCheck(value.checks.api, 'checks.api'),
      gateway: parseHealthCheck(value.checks.gateway, 'checks.gateway'),
    },
  };
}

/** F-6: gatewayAlive ⇔ checks.gateway.status === "healthy". */
export function isGatewayAlive(response: HealthReadyResponse): boolean {
  return response.checks.gateway.status === 'healthy';
}
```

#### Nowy plik — `health.api.ts`

```typescript
import { apiFetch } from '@/shared/api/api-fetch';
import {
  isGatewayAlive,
  parseHealthReadyResponse,
  type HealthReadyResponse,
} from '@/modules/health/api/health.types';

export async function fetchHealthReady(): Promise<HealthReadyResponse> {
  const body = await apiFetch('/health/ready', { skipAuthRefresh: true });
  return parseHealthReadyResponse(body);
}

export async function fetchGatewayAlive(): Promise<boolean> {
  const ready = await fetchHealthReady();
  return isGatewayAlive(ready);
}
```

**Testy:** brak nowych automatów FE (Playwright poza zakresem). Ręcznie: BFF zwraca body zgodne z docs; parser odrzuca brak `checks.gateway`.

**DoD kroku:**

- Istnieją `health.types.ts` + `health.api.ts` z parserem i `fetchGatewayAlive`.
- Wywołanie idzie przez BFF (`/api/v1/health/ready`), `skipAuthRefresh: true`.
- `gatewayAlive` liczone wyłącznie z `checks.gateway.status === "healthy"`.
- Zero importów z `Completeness` / `isComplete`.

---

### KROK 2 — `GatewayAliveProvider` + kompozycja `agentsActive` + refetch przy okazji

**Status:** `WYKONANY`

**Cel:** Osobny stan sieciowy `gatewayAlive` w layoutcie po sesji; wspólna kompozycja `agentsActive` **bez** zanieczyszczenia `CompletenessProvider`. Refetch: mount + po udanym PUT kontekstu. Major Faza 13 HOW #2 / #4; `SPEC-FRONTEND.md` F-6; `docs/ux_dashboard.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/health/lib/agents-active.ts`
- Nowy: `apps/frontend/src/modules/health/components/gateway-alive-provider.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`
- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-view.tsx` (refetch gateway po PUT)

Kolejność: helper kompozycji → provider → mount w shellu → wire refetch po PUT.

#### Nowy plik — `agents-active.ts`

```typescript
import type { CompletenessState } from '@/modules/company-context/api/company-context.types';
import type { GatewayAliveState } from '@/modules/health/components/gateway-alive-provider';

export const AGENTS_INACTIVE_COPY =
  'Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.' as const;

export function computeAgentsActive(
  completeness: CompletenessState,
  gateway: GatewayAliveState,
): boolean {
  return (
    completeness.status === 'ready' &&
    completeness.completeness.complete &&
    gateway.status === 'ready' &&
    gateway.gatewayAlive
  );
}

export function agentsActiveDisableReason(
  completeness: CompletenessState,
  gateway: GatewayAliveState,
): string | null {
  if (completeness.status === 'loading') {
    return 'Sprawdzanie kompletności kontekstu…';
  }
  if (completeness.status === 'error') {
    return 'Nie można potwierdzić bramki kontekstu.';
  }
  if (gateway.status === 'loading') {
    return 'Sprawdzanie stanu gatewaya…';
  }
  if (gateway.status === 'error') {
    return 'Nie można potwierdzić stanu gatewaya.';
  }
  if (!computeAgentsActive(completeness, gateway)) {
    return AGENTS_INACTIVE_COPY;
  }
  return null;
}
```

#### Nowy plik — `gateway-alive-provider.tsx`

```typescript
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
import { fetchGatewayAlive } from '@/modules/health/api/health.api';

export type GatewayAliveState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly gatewayAlive: boolean };

type GatewayAliveContextValue = {
  readonly state: GatewayAliveState;
  readonly refetch: () => Promise<void>;
};

const GatewayAliveContext = createContext<GatewayAliveContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function GatewayAliveProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<GatewayAliveState>({ status: 'loading' });
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    try {
      const gatewayAlive = await fetchGatewayAlive();
      if (requestId !== requestIdRef.current) return;
      setState({ status: 'ready', gatewayAlive });
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
    void (async () => {
      await refetch();
    })();
    return () => {
      requestIdRef.current += 1;
    };
  }, [refetch]);

  const value = useMemo(() => ({ state, refetch }), [state, refetch]);

  return (
    <GatewayAliveContext.Provider value={value}>{children}</GatewayAliveContext.Provider>
  );
}

export function useGatewayAlive(): GatewayAliveContextValue {
  const value = useContext(GatewayAliveContext);
  if (!value) {
    throw new Error('useGatewayAlive must be used within a GatewayAliveProvider');
  }
  return value;
}
```

#### Refaktor — `dashboard-shell.tsx` (mount providera)

**teraz** (fragment drzewa po sesji):

```tsx
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <OwnRunsProvider>
          <TooltipProvider>
```

**zamień na:**

```tsx
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <GatewayAliveProvider>
          <OwnRunsProvider>
            <TooltipProvider>
```

oraz domknięcie `</GatewayAliveProvider>` przed `</CompletenessProvider>`; import:

```tsx
import { GatewayAliveProvider } from '@/modules/health/components/gateway-alive-provider';
```

`CompletenessProvider` **bez** zmian wewnętrznych (nadal tylko completeness).

#### Refaktor — `company-context-view.tsx` (refetch przy okazji)

**teraz:**

```tsx
  const { refetch } = useCompleteness();
```

**zamień na:**

```tsx
  const { refetch: refetchCompleteness } = useCompleteness();
  const { refetch: refetchGatewayAlive } = useGatewayAlive();
```

**teraz** (po udanym PUT):

```tsx
      await refetch();
      notifyProduct({ kind: 'success', title: 'Kontekst zapisany' });
```

**zamień na:**

```tsx
      await Promise.all([refetchCompleteness(), refetchGatewayAlive()]);
      notifyProduct({ kind: 'success', title: 'Kontekst zapisany' });
```

Import: `useGatewayAlive` z `@/modules/health/components/gateway-alive-provider`.

**Uwaga:** brak `setInterval` / `setTimeout` do pollingu `/health/ready`.

**Testy:** brak automatów FE. Ręcznie: mount dashboardu woła `/api/v1/health/ready`; po zapisie kontekstu widać drugi request (obok completeness).

**DoD kroku:**

- `GatewayAliveProvider` w `DashboardShell` (tylko po sesji).
- `CompletenessProvider` / `isComplete` **bez** pola sieci / gateway.
- `computeAgentsActive` / `AGENTS_INACTIVE_COPY` wspólne dla chipa i gate (KROK 3).
- Po PUT 200: równoległy refetch completeness **i** gatewayAlive.
- Zero interval pollingu.

---

### KROK 3 — Chip chrome + `useStartRunGate` (Konto + „Uruchom agenta”)

**Status:** `WYKONANY`

**Cel:** Jedna kompozycja `agentsActive` na chipie i obu powierzchniach CTA; copy + remedacja wg F-6. Major Faza 13 HOW #3 / #5; `SPEC-FRONTEND.md` F-6; `docs/ux_dashboard.md`; `content-chain-product-ui` (dziedziczenie).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/start-run-gate.tsx`
- Zmiana: `apps/frontend/src/modules/company-context/components/completeness-chip.tsx`

`StartRunForm` / `StartAgentDialog` **bez** zmian kontraktu propsów — nadal czytają `useStartRunGate()` (zmiana wewnątrz hooka wystarczy).

#### Refaktor — `start-run-gate.tsx`

**teraz:**

```tsx
'use client';

import { useMemo, type ReactNode } from 'react';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

export function useStartRunGate(): {
  readonly agentsActive: boolean;
  readonly disableReason: string | null;
} {
  const { state: completeness } = useCompleteness();
  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);

  return { agentsActive, disableReason };
}
```

**zamień na:**

```tsx
'use client';

import { useMemo, type ReactNode } from 'react';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { useGatewayAlive } from '@/modules/health/components/gateway-alive-provider';
import {
  agentsActiveDisableReason,
  computeAgentsActive,
} from '@/modules/health/lib/agents-active';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

export function useStartRunGate(): {
  readonly agentsActive: boolean;
  readonly disableReason: string | null;
} {
  const { state: completeness } = useCompleteness();
  const { state: gateway } = useGatewayAlive();

  const agentsActive = useMemo(
    () => computeAgentsActive(completeness, gateway),
    [completeness, gateway],
  );

  const disableReason = useMemo(
    () => agentsActiveDisableReason(completeness, gateway),
    [completeness, gateway],
  );

  return { agentsActive, disableReason };
}
```

`AgentsGateTooltip` — **bez zmian** (pozostaje w tym pliku).

#### Refaktor — `completeness-chip.tsx`

**teraz → zamień na** (cały plik — logika chipa jest mała; zachowaj `data-slot` / gęstość / Iconify):

```tsx
'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Skeleton } from '@/shared/ui/skeleton';
import { EnvelopeError } from '@/shared/ui/form-field';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { GATE_SECTION_LABELS } from '@/modules/company-context/api/company-context.types';
import { useGatewayAlive } from '@/modules/health/components/gateway-alive-provider';
import {
  AGENTS_INACTIVE_COPY,
  computeAgentsActive,
} from '@/modules/health/lib/agents-active';

export function CompletenessChip() {
  const { state: completeness } = useCompleteness();
  const { state: gateway } = useGatewayAlive();

  if (completeness.status === 'loading' || gateway.status === 'loading') {
    return <Skeleton className="h-16 w-full" />;
  }

  if (completeness.status === 'error') {
    return (
      <EnvelopeError
        code={completeness.envelope.code}
        message={completeness.envelope.message}
        className="text-xs"
      />
    );
  }

  if (gateway.status === 'error') {
    return (
      <EnvelopeError
        code={gateway.envelope.code}
        message={gateway.envelope.message}
        className="text-xs"
      />
    );
  }

  const agentsActive = computeAgentsActive(completeness, gateway);
  const contextComplete = completeness.completeness.complete;

  if (agentsActive) {
    return (
      <div
        data-slot="completeness-chip"
        className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
      >
        <Icon icon="lucide:check" className="mt-0.5 size-3.5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">Agenci aktywni</p>
          <p className="text-muted-foreground">Można uruchamiać zadania agentowe.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="completeness-chip"
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
    >
      <Icon icon="lucide:octagon-pause" className="mt-0.5 size-3.5 shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-medium">Agenci nieaktywni</p>
        <p className="text-muted-foreground">{AGENTS_INACTIVE_COPY}</p>
        {!contextComplete ? (
          <>
            <p className="text-muted-foreground">
              Brakuje:{' '}
              {completeness.completeness.missing
                .map((section) => GATE_SECTION_LABELS[section])
                .join(', ')}
            </p>
            <Link href="/context" className="text-foreground underline-offset-4 hover:underline">
              Uzupełnij kontekst
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
```

**Reguły UI (lock):**

- Bez nowej palety, bez `richColors`, bez pill cluster / glow.
- Ten sam border / typografia / Iconify co Faza 2 chip.
- Tooltip CTA = `disableReason` z kanonicznym copy przy `!agentsActive` (nie „Uzupełnij kontekst firmy.”).

**Testy (ręczne DoD):**

| Scenariusz | Oczekiwanie |
|------------|-------------|
| complete ∧ gateway healthy | Chip zielony „Agenci aktywni”; CTA Konto + „Uruchom agenta” enabled (przy gotowym briefie) |
| `complete === false` | Chip nieaktywny + copy kanoniczne + `missing` + link `/context`; CTA disabled |
| `complete === true`, gateway unhealthy / error | Chip nieaktywny + copy kanoniczne; **bez** linku „Uzupełnij kontekst”; CTA disabled |
| Loading jednego sygnału | Skeleton chip / tooltip loading; CTA disabled |
| Kropki zakładek `/context` | Nadal tylko z `completeness.missing` (gateway nie wpływa) |

**DoD kroku:**

- Chip i `useStartRunGate` używają tego samego `computeAgentsActive`.
- Copy nieaktywnego CTA/chip body = kanoniczne zdanie F-6.
- Link „Uzupełnij kontekst” **tylko** gdy `!contextComplete`.
- `StartRunForm` / `StartAgentDialog` działają bez osobnych zmian API (hook).
- Visual: dziedziczenie locku; brak nowej palety.

---

#### Propozycja commit message

```text
feat(frontend): gate agents-active on completeness and gateway liveness

Compose chip and start CTAs from company-context completeness AND api /health/ready
checks.gateway so a dead gateway no longer looks like a context gap.
```

---

## Weryfikacja wycinka

| Kryterium | Sprawdzenie |
|-----------|-------------|
| Pokrycie major Faza 13 HOW #1–5 | KROK 1–3 + product-ui w KROK 3 |
| docs / SPEC F-6 | `agentsActive` = AND; copy; remedacja; bez interval; bez FE→gateway |
| Completeness / `isComplete` nietknięte semantycznie | Provider completeness bez sieci; kropki bez gateway |
| Obie powierzchnie CTA | Hook wspólny → Konto + modal Runy |
| Kod nowych plików kompletny | `health.types`, `health.api`, `agents-active`, `gateway-alive-provider` |
| Refaktory = fragmenty | shell, company-context-view, start-run-gate; chip = pełna zamiana małego pliku |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, koniec FAZA 1 |
| Major / docs / SPEC | **nietknięte** w tej sesji |
| Sekrety | brak |

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po wdrożeniu HOW |
|---------|------------------|
| Faza 13 | `WYKONANY` (DoD gate + ten feature plan) |
| MILESTONE 13 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 2 / 2.2 / MILESTONE 2 | historia — bez przepisywania |
| Faza 3 / 3.1 / Faza 7 / 7.2 / MILESTONE 3 | historia — bez przepisywania |
| Backend Faza 17 | osobny ślad (api); ten plan FE jej nie zamyka |

Edycja major **poza** tym skillem / poza tą sesją.
