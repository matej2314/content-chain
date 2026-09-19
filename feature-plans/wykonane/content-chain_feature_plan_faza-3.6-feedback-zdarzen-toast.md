# Content Chain — feature plan: Faza 3.6 (feedback zdarzeń / toast)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-3.6-feedback-zdarzen-toast.md`  
**Kotwica major:** Faza 3.6 (cała) — kroki **3.6.1** / **3.6.2** / **3.6.3** w `content-chain-frontend_major_plan.md`. **To nie jest Krok 3.5** (Lista Runy / archiwum) **ani Faza 3.5** (twardy PUT kontekstu).  
**Refaktor względem:** Faza 1 / Krok 1.4.3 + Faza 3 / Krok 3.1 i 3.4 (`WYKONANY`) — sloty chrome, start na Koncie i live (Moje runy / floating box / SSE) są; brak kanału „wydarzyło się”. `close()` boxa po `completed`/`failed` **bez zmiany sensu** Kroku 3.4: toast **zastępuje ciszę**, nie pozycję boxa.  
**Źródła:** `docs/ux_dashboard.md` (Feedback zdarzeń / trzy kanały), `docs/anty_patterny.md` (toast ≠ live, toast ≠ envelope, toast ≠ store GET), `docs/dokumentacja_komunikacji.md` (konsumpcja terminalu), `docs/dictionary.md` (Toast dashboard MVP), `spec/SPEC-FRONTEND.md` F-5a / F-7 / F-8, `spec/SPEC-KOMUNIKACJA.md` K-3 / K-3a, `spec/SPEC-TESTY.md` T-7, skill `content-chain-product-ui`.  
**Zależność api:** brak. Payload SSE, kody HTTP i Prisma **bez zmian**. Ta faza **nie** jest `content-chain-backend_major_plan.md` Fazą 11.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

**Design Read (dziedziczenie locku):** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 3.6 majoru FE: Toaster po sesji, wrapper produktowy, toast po PUT 200 / POST 202, toast terminalu SSE poza szczegółami tego runu |
| Major | Faza 3.6 / 3.6.1–3.6.3; start po Fazach 1, 2, 2.1, 3, 3.5 (`WYKONANY`) i MILESTONE 1, 2, 2.1, 3, 3.5 (`OSIĄGNIĘTY`) |
| Bramka ścieżki wstecz | Spełniona |
| Poza zakresem | HITL / opinia / `PATCH /auth/me` / zaproszenia (Fazy 4–6 reuse **tego samego** modułu); drugi Toaster; typy toasta w `@content-chain/shared`; Browser Notification API; mail przy `failed`; `toast.promise` na pending formularzy; store/Context toasta jako kopia GET; Toaster na login / first-run / accept-invite; zmiana HTTP/SSE/Prisma; testy automatyczne FE; nowa paleta; `next-themes` |
| Po implementacji (informacyjnie) | Major FE: Faza 3.6 i kroki 3.6.1–3.6.3 → `WYKONANY`; MILESTONE 3.6 → `OSIĄGNIĘTY`. Faza 3 / 3.5 i ich milestone’y **bez zmian** (historia). Faza 4 nadal `NIE_ROZPOCZĘTY` do czasu **obu** Milestone 3.5 i 3.6. **Edycja major poza tym skillem.** |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 3.6.1 | KROK 1 | Paczka `sonner`, kit `Toaster` (lock, `--z-toast`, `top-right`), unia `ProductToast`, `notifyProduct` / `notifyRunTerminal`, `viewingRunId` z pathname, mount wyłącznie w authenticated `DashboardShell` |
| 3.6.2 | KROK 2 | PUT kontekstu 200 → „Kontekst zapisany”; POST startu 202 → „Run wystartował”; gałęzie 400/409 / predykat 3.5 / GET bloku **nietknięte** |
| 3.6.3 | KROK 3 | `OwnRunsProvider` woła `notifyRunTerminal` przy evencie terminalnym; dedup `run-terminal:${runId}`; no-op na `/runs/:runId` tego runu; `close()` / `refresh` bez zmiany sensu 3.4 |

**Pass rozwojowy (sesja planu):** brak przesunięć. KROK 2 i 3 wołają wrapper z KROK 1; Toaster musi wisieć zanim mutacja albo SSE wyemituje toast. `onTerminal(status: 'completed' \| 'failed')` **już** jest w `useRunEventSource` (Faza 3) — KROK 3 tylko podpina status, którego `OwnRunsProvider` dziś ignoruje. **Brak przesunięć między fazami major.**

**HOW zablokowane (SPEC wygrywa):**

- Trzy kanały rozłączne: live (SSE / box / Moje runy) ≠ toast „wydarzyło się” ≠ envelope przy polu (`docs/ux_dashboard.md`).
- Widoki **nie** importują `toast` z `sonner`. Jedyna rura: `notifyProduct` / `notifyRunTerminal`.
- `richColors` Sonnera **wyłączone**. Sukces = `toast()` (typ normal / tokeny `--normal-*` z locku), nie tęczowe `--success-*`.
- `next-themes` **nie** wchodzi (MVP motyw jasny; dual-mode = V1). Registry shadcn listuje tę zależność — **odrzucić**.
- `toast.promise` zakazane na formularzach z `pending`.
- Typy / logika toasta **nie** w `@content-chain/shared`.
- Testy automatyczne `apps/frontend` poza MVP (`SPEC-TESTY.md` T-7). DoD = zachowanie obserwowalne.
- Em-dash w copy UI zakazany (skill product-ui). Tytuły: „Kontekst zapisany”, „Run wystartował”, „Run zakończony”, „Run nieudany”.

---

## Założenia

- Stack bez zmian: Next.js **16.3.0** App Router, React **19.2.8**, Tailwind v4, shadcn (style `radix-nova`), `@iconify/react`, `@content-chain/shared`. Nowa zależność wyłącznie **`sonner`** w `apps/frontend`.
- `tsconfig` `strict: true`; **nie** włączamy `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess`.
- Token `--z-toast: 40` już jest w `globals.css` (skala: baza 0 · chrome 10 · overlay 20 · modal 30 · toast 40). Header `h-12` + `z-(--z-chrome)`; floating box `z-(--z-overlay)` + `bottom-4 right-4`.
- Layout zalogowany = `app/(app)/layout.tsx` → `DashboardShell`. Login / first-run / `/invite/accept` są **poza** `(app)` — brak Toastera, jeśli mount jest tylko w gałęzi `authenticated`.
- Rejestr SSE i `OwnRunsProvider` już subskrybują własne runy live. Toast terminalu **nie** otwiera socketa.
- `RunId` = brand `run_<uuid>` (`isRunId` / `createRunId` z shared). Pathname szczegółów: `/runs/${runId}` (jak `Link` w boxie i liście).
- Prettier jak sąsiedzi w `modules/` (single quote, semi, `trailingComma: all`). Kit w `shared/ui/sonner.tsx` jak `dialog.tsx` (single quote).
- Copy UI: polski. Envelope w toaście błędu (gdy `kind: 'error'`): `code` + `message` as-is, bez mapy PL. MVP mutacji **nie** woła `kind: 'error'` — gałąź istnieje pod Fazy 4–6.
- Zakaz `any`, nieuzasadnionych `as` / `!`. `import type` dla samych typów. Unia dyskryminowana + `never` przy switchu.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/emilkowalski/sonner` (README + `_autodocs`). Wersja w projekcie: **brak** — dodać `sonner` przy KROK 1 (`pnpm --filter frontend add sonner`). shadcn MCP: `npx shadcn@latest add @shadcn/sonner` (zależności registry: `sonner`, **`next-themes`**).

| Temat | Ustalenie Context7 / shadcn | Decyzja w wycinku |
|-------|-----------------------------|-------------------|
| Mount | `<Toaster />` z `sonner`; `toast()` z dowolnego miejsca po mount | Wrapper w `DashboardShell` (gałąź authenticated). Nie root layout. |
| Dedup | to samo `id` zastępuje toast (`toast.message(..., { id })` / `toast(..., { id })`) | Terminal: `` `run-terminal:${runId}` ``. Mutacje bez wymuszonego id. |
| `toast.promise` | loading → success/error na Promise | **Zakaz** (SPEC). Formularze mają `pending`. |
| `richColors` / `--success-*` | tęczowe tła success/error/info/warning | `richColors={false}`; wołamy `toast()` nie `toast.success`, żeby zostać przy `--normal-bg/border/text` zmapowanych na `--card` / `--border` / `--foreground`. |
| Motyw | CSS `[data-sonner-toaster][data-sonner-theme='light']` | `theme="light"`. **Bez** `next-themes` / `useTheme`. |
| Akcja | `action: { label, onClick }` na przycisku Sonnera | Kanon „Szczegóły” = **link** App Router. `onClick` + `window.location` = pełny reload (zakaz). `description` = `<Link href={/runs/:id}>` (ten sam wzorzec co box). |
| Offset | `--offset-top` z propa `offset` (domyślnie 24px) | `offset={{ top: '4.5rem', right: '1rem' }}` — header sticky `h-12` zostaje odsłonięty; box zostaje `bottom-right`. |
| z-index | Sonner ustawia wysoki z-index inline | `style={{ zIndex: 'var(--z-toast)' }}` **oraz** `!important` w `globals.css` na `[data-sonner-toaster]`, gdy inline kitu wygra. |
| Kit shadcn | registry ciągnie `next-themes` | **Nie** `shadcn add sonner` w ciemno. Ręczny `shared/ui/sonner.tsx` + `pnpm --filter frontend add sonner`. |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

`usePathname` / `Link`: już w chrome (`chrome-slots.tsx`, `floating-runs-box.tsx`). Bez osobnego researchu Next 16.

---

## FAZA 1 — Feedback zdarzeń (toast)

Odpowiada major **Faza 3.6**. Jedna faza w tym zestawie.

---

### KROK 1 — Toaster i kontrakt

**Status:** `WYKONANY`

**Cel:** Po sesji wisi jeden Toaster locku; produkt woła wyłącznie `notifyProduct` / `notifyRunTerminal`; `viewingRunId` z pathname. Major 3.6.1, `SPEC-FRONTEND.md` F-8 / Wolno (wrapper, `--z-toast`), `docs/ux_dashboard.md` (Toaster top-right).

**Artefakty:**

- Zmiana: `apps/frontend/package.json` (zależność `sonner`; lockfile pnpm).
- Nowy: `apps/frontend/src/shared/ui/sonner.tsx`
- Nowy: `apps/frontend/src/modules/notifications/product-toast.ts`
- Nowy: `apps/frontend/src/modules/notifications/notify-product.tsx`
- Nowy: `apps/frontend/src/modules/notifications/use-viewing-run-id.ts`
- Zmiana: `apps/frontend/src/app/globals.css` (override z-index + tokeny `--normal-*` Sonnera)
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx` (mount `Toaster`)

**Kolejność w kroku:** (1) `pnpm --filter frontend add sonner` (2) `globals.css` (3) `sonner.tsx` (4) moduł `notifications` (5) mount w `DashboardShell`.

#### Instalacja

Z katalogu repo:

```bash
pnpm --filter frontend add sonner
```

**Nie** instalować `next-themes`. **Nie** `pnpm exec shadcn add sonner`, jeśli CLI dociągnie `next-themes` albo `useTheme`.

#### Nowy plik — kit Toaster

`apps/frontend/src/shared/ui/sonner.tsx`:

```tsx
'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="top-right"
      richColors={false}
      closeButton={false}
      offset={{ top: '4.5rem', right: '1rem' }}
      style={{ zIndex: 'var(--z-toast)' }}
      className="toaster"
      toastOptions={{
        classNames: {
          toast: 'border-border bg-card text-foreground shadow-none',
          title: 'text-sm font-medium',
          description: 'text-sm text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
```

Jeśli typy `ToasterProps['offset']` w zainstalowanej `sonner` nie przyjmują obiektu, zamień na `offset="4.5rem"` (string z Context7) - **nie** zgaduj union; odczyt `node_modules/sonner` przy implementacji. Pozycja zostaje `top-right`.

Ten plik = adapter kitu. **Zero** copy produktowego, **zero** `ProductToast`.

#### Nowy plik — kontrakt

`apps/frontend/src/modules/notifications/product-toast.ts`:

```ts
import { createRunId, isRunId, type RunId } from '@content-chain/shared';

export type EnvelopeRef = {
  readonly code: string;
  readonly message: string;
};

export type ProductToast =
  | {
      readonly kind: 'success';
      readonly title: string;
      readonly id?: string;
    }
  | {
      readonly kind: 'error';
      readonly envelope: EnvelopeRef;
      readonly id?: string;
    };

export type RunTerminalOutcome = 'completed' | 'failed';

export type RunTerminalInput = {
  readonly runId: RunId;
  readonly outcome: RunTerminalOutcome;
  readonly viewingRunId: RunId | null;
};

const DETAILS_PATH = /^\/runs\/([^/]+)$/;

export function viewingRunIdFromPathname(pathname: string): RunId | null {
  const match = DETAILS_PATH.exec(pathname);
  const raw = match?.[1];
  if (raw === undefined || !isRunId(raw)) return null;
  return createRunId(raw);
}

export function runTerminalToastId(runId: RunId): string {
  return `run-terminal:${runId}`;
}
```

`/runs` (archiwum) **nie** matchuje - `viewingRunId === null` (toast terminalu **wolno**). Tylko `/runs/run_<uuid>` to szczegóły.

#### Nowy plik — adapter Sonner

`apps/frontend/src/modules/notifications/notify-product.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import {
  runTerminalToastId,
  type ProductToast,
  type RunTerminalInput,
} from '@/modules/notifications/product-toast';

function assertNever(value: never): never {
  throw new Error(`Unexpected toast: ${String(value)}`);
}

export function notifyProduct(input: ProductToast): void {
  switch (input.kind) {
    case 'success':
      toast(input.title, input.id === undefined ? undefined : { id: input.id });
      return;
    case 'error':
      toast(`${input.envelope.code}: ${input.envelope.message}`, {
        ...(input.id === undefined ? {} : { id: input.id }),
      });
      return;
    default:
      assertNever(input);
  }
}

export function notifyRunTerminal(input: RunTerminalInput): void {
  if (input.viewingRunId === input.runId) return;

  const title = input.outcome === 'completed' ? 'Run zakończony' : 'Run nieudany';

  toast(title, {
    id: runTerminalToastId(input.runId),
    description: (
      <Link href={`/runs/${input.runId}`} className="underline-offset-4 hover:underline">
        Szczegóły
      </Link>
    ),
  });
}
```

Powód `description` + `Link` zamiast `action.onClick`: nawigacja App Router bez pełnego reloadu, bez `router` w module i bez `window.location`. `toast.success` / `toast.error` / `toast.promise` **nie** używamy.

Spread `id` przy success: gdy `id` nie ma, nie przekazujemy pustego obiektu z `id: undefined` jeśli to psuje overload Sonnera - przy implementacji sprawdź sygnaturę `toast(message, data?)`; w razie potrzeby zawsze podawaj drugi argument `{}`.

#### Nowy plik — hook pathname

`apps/frontend/src/modules/notifications/use-viewing-run-id.ts`:

```ts
'use client';

import { usePathname } from 'next/navigation';
import type { RunId } from '@content-chain/shared';
import { viewingRunIdFromPathname } from '@/modules/notifications/product-toast';

export function useViewingRunId(): RunId | null {
  const pathname = usePathname();
  return viewingRunIdFromPathname(pathname);
}
```

Źródło `viewingRunId` = `usePathname()`, nie draft, nie snapshot, nie query string.

#### Refaktor — `globals.css`

**Ścieżka:** `apps/frontend/src/app/globals.css`  
**Kontekst:** po bloku `:root` / `.dark` (na końcu pliku, po `@media (prefers-reduced-motion)`).

**teraz:** (koniec pliku to wyłącznie reduced-motion; brak reguł Sonnera)

**zamień na:** dopisz **na końcu pliku**:

```css
/* Sonner: warstwa toast locku; nie richColors */
[data-sonner-toaster] {
  z-index: var(--z-toast) !important;
}

[data-sonner-toaster][data-sonner-theme='light'] {
  --normal-bg: var(--card);
  --normal-border: var(--border);
  --normal-text: var(--foreground);
  --border-radius: var(--radius);
}
```

Komentarz przy tokenach z-index (linia „toast 40”) **zostaje** - już opisuje warstwę.

#### Refaktor — `DashboardShell`

**Ścieżka:** `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`  
**Symbol:** `DashboardShell`

**teraz:**

```tsx
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';
```

**zamień na:**

```tsx
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';
import { Toaster } from '@/shared/ui/sonner';
```

**teraz:** (gałąź `state.status !== 'authenticated'` - skeleton **bez** Toastera; nie ruszaj)

**teraz:**

```tsx
          </div>
        </OwnRunsProvider>
      </CompletenessProvider>
    </EventSourceRegistryProvider>
```

**zamień na:**

```tsx
          </div>
          <Toaster />
        </OwnRunsProvider>
      </CompletenessProvider>
    </EventSourceRegistryProvider>
```

`Toaster` **wewnątrz** `OwnRunsProvider` (i gałęzi authenticated), jako rodzeństwo layoutu - nie w skelecie, nie w `app/layout.tsx`.

**Biblioteki / API:** tabela wyżej (Sonner Context7; kit bez `next-themes`).

**Testy:** brak automatycznych FE (`SPEC-TESTY.md` T-7).

**DoD kroku:**

- `sonner` w zależnościach `apps/frontend`; brak `next-themes`.
- Na `/` (karta logowania) i `/invite/accept` w DOM **nie** ma `[data-sonner-toaster]`.
- Po sesji (np. `/account`) Toaster jest; `position` top-right; `z-index` liczy się z `--z-toast`; box nadal `bottom-right` / `--z-overlay`.
- `notifyProduct({ kind: 'success', title: 'x' })` pokazuje toast (tymczasowo z konsoli / wywołanie w KROK 2).
- Widoki nie importują `sonner`.
- `viewingRunIdFromPathname('/runs') === null`; `viewingRunIdFromPathname('/runs/run_<valid>')` zwraca brand; śmieć w segmencie → `null` (bez throw).

---

### KROK 2 — Mutacje (kontekst, start)

**Status:** `WYKONANY`

**Cel:** Cisza po udanym PUT/POST znika; błędy formularza zostają przy polu. Major 3.6.2, `SPEC-FRONTEND.md` F-7 / F-8, `docs/ux_dashboard.md` mapa MVP.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-view.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`

Nie ruszamy: `company-context-form.tsx` (envelope / predykat 3.5), `apiFetch`, gałęzi `catch`, GET completeness / listy / snapshot.

#### Refaktor — zapis kontekstu (tylko 200)

**Ścieżka:** `apps/frontend/src/modules/company-context/components/company-context-view.tsx`  
**Symbol:** `CompanyContextView` / `onSubmit`

**teraz:**

```tsx
import { isComplete } from '@/modules/company-context/lib/is-complete';
```

**zamień na:**

```tsx
import { isComplete } from '@/modules/company-context/lib/is-complete';
import { notifyProduct } from '@/modules/notifications/notify-product';
```

**teraz:**

```tsx
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
```

**zamień na:**

```tsx
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
      notifyProduct({ kind: 'success', title: 'Kontekst zapisany' });
```

`catch` (envelope `submitError`) **bez zmian**. Early return przy `!isComplete(...)` **bez** toasta. Błąd GET widoku (`view.status === 'error'` + `EnvelopeError`) **bez** toasta.

#### Refaktor — start runu (tylko 202)

**Ścieżka:** `apps/frontend/src/modules/runs/components/start-run-form.tsx`  
**Symbol:** `StartRunForm` / `onSubmit`

**teraz:**

```tsx
import { startRun } from '@/modules/runs/api/runs.api';
```

**zamień na:**

```tsx
import { startRun } from '@/modules/runs/api/runs.api';
import { notifyProduct } from '@/modules/notifications/notify-product';
```

**teraz:**

```tsx
      await startRun(input);
      await refresh();
```

**zamień na:**

```tsx
      await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
```

`catch` (`ApiError` → `setError` envelope na formularzu) **bez zmian**. Early return gdy `!input || !agentsActive` **bez** toasta. Zostajemy na Koncie (brak `router.push` - już tak jest).

`startRun` parsujący 202 (`parseStartRunAccepted`) - toast **po** udanym `await`, nie przed `refresh()`. Kolejność: mutacja → odśwież Moje runy → toast (wiersz live + „wydarzyło się”).

**Biblioteki / API:** wyłącznie wrapper z KROK 1. Bez `toast.promise`.

**Testy:** brak automatycznych FE.

**DoD kroku:**

- Admin, kompletny kontekst, PUT 200: toast „Kontekst zapisany”; chip/kropki nadal z odpowiedzi (refetch jak dziś).
- PUT 400 albo predykat 3.5 (brak wywołania PUT): envelope / disable; **zero** toasta.
- Start 202 na Koncie: wiersz w Moje runy **oraz** toast „Run wystartował”; URL zostaje `/account`.
- Start 409 `CONTEXT_INCOMPLETE` / 400: envelope na formularzu startu; **zero** toasta.
- Błąd GET completeness / listy / snapshot: envelope w bloku; **zero** toasta.

---

### KROK 3 — Terminal poza szczegółami

**Status:** `WYKONANY`

**Cel:** Jeden toast per `runId` przy `run.completed` / `run.failed`, gdy operator nie stoi na szczegółach **tego** runu. Major 3.6.3, `SPEC-FRONTEND.md` F-5a, `SPEC-KOMUNIKACJA.md` K-3.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/own-runs-provider.tsx`

Nie ruszamy: `use-run-event-source.ts` (już woła `onTerminal(status)` i `release` / `close` rejestru); `floating-runs-box.tsx` (`inProgress` i tak znika po `refresh` + filtrze live); `run-details-view.tsx` (status + logi; **zero** `notifyRunTerminal` - no-op i tak jest w providerze, gdy pathname = ten `runId`).

**Zakaz:** `registry.acquire` / `EventSource` na runie już `completed`/`failed` „żeby pokazać toast”.

#### Refaktor — `OwnRunsProvider`

**Ścieżka:** `apps/frontend/src/modules/runs/components/own-runs-provider.tsx`  
**Symbol:** `LiveItemSubscription`, `OwnRunsProvider`

**teraz:**

```tsx
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
```

**zamień na:**

```tsx
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
import { notifyRunTerminal } from '@/modules/notifications/notify-product';
import { useViewingRunId } from '@/modules/notifications/use-viewing-run-id';
```

**teraz:**

```tsx
function LiveItemSubscription({
  runId,
  onStatus,
  onTerminal,
}: {
  readonly runId: RunId;
  readonly onStatus: (runId: RunId, status: RunStatus) => void;
  readonly onTerminal: () => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
    onTerminal: () => {
      onTerminal();
    }
  });
  return null;
}
```

**zamień na:**

```tsx
function LiveItemSubscription({
  runId,
  onStatus,
  onTerminal,
}: {
  readonly runId: RunId;
  readonly onStatus: (runId: RunId, status: RunStatus) => void;
  readonly onTerminal: (runId: RunId, status: 'completed' | 'failed') => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
    onTerminal: (status) => {
      onTerminal(runId, status);
    },
  });
  return null;
}
```

**teraz:** (początek `OwnRunsProvider`)

```tsx
export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
```

**zamień na:**

```tsx
export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const viewingRunId = useViewingRunId();
```

`useRunEventSource` trzyma handlery w `useEffectEvent` - `viewingRunId` w closure `onTerminal` z renderu providera jest **bieżący** w momencie eventu (nie z chwili `acquire`).

**teraz:**

```tsx
        <LiveItemSubscription 
        key={item.runId} 
        runId={item.runId} 
        onStatus={patchStatus}
        onTerminal={() => {
          void refresh();
        }} 
        />
```

**zamień na:**

```tsx
        <LiveItemSubscription
          key={item.runId}
          runId={item.runId}
          onStatus={patchStatus}
          onTerminal={(terminalRunId, status) => {
            notifyRunTerminal({
              runId: terminalRunId,
              outcome: status,
              viewingRunId,
            });
            void refresh();
          }}
        />
```

`refresh()` **zostaje** (box / Moje runy zrzucają terminal z `inProgress`). Toast **nie** dodaje pozycji do boxa. Pulse `onStatus` (`running` / `awaiting_hitl` / `interrupted`) **bez** `notifyProduct`. `run.log` nie przechodzi przez ten handler.

Podwójny event (`run.status` terminalny **oraz** `run.completed`/`run.failed` w tym samym hooku) → dwa wywołania `notifyRunTerminal` z tym samym `id` → Sonner **zastępuje** toast, nie dubluje. Nie dodajemy `Set` w Context (zakaz store toasta jako kopia GET).

**Nie** wołać `notifyRunTerminal` z `run-details-view.tsx`. Na `/runs/:runId` tego runu provider i tak zrobi no-op (`viewingRunId === runId`). Powód `failed` = logi / snapshot na szczegółach, nie payload toasta.

**Biblioteki / API:** `id` Sonnera (Context7: to samo `id` = replace). `Link` w `notifyRunTerminal` (KROK 1).

**Testy:** brak automatycznych FE.

**DoD kroku:**

- Operator na `/account` albo `/context` albo `/runs` (archiwum): terminal własnego runu → jeden toast „Run zakończony” albo „Run nieudany” + link Szczegóły (klikalny, App Router, bez reloadu).
- Operator na `/runs/:runId` **tego** runu: **zero** toasta terminalu; status + logi na szczegółach.
- Operator na `/runs/:otherId`: terminal runu A → toast (to nie są szczegóły A).
- Dedup: jeden toast per `runId` mimo podwójnego eventu SSE.
- Box pusty po `completed`/`failed` (jak 3.4); toast nie trzyma pozycji.
- `awaiting_hitl` / `run.log` / heartbeat / `running`: **bez** toasta.
- Brak nowego `EventSource` na runie terminalnym.

---

#### Propozycja commit message

```text
feat(frontend): toast successful saves and off-page run terminals

Replace silence after PUT 200, POST 202, and SSE completed/failed when the operator is not on that run's details, without making Sonner a live-status channel.
```

---

## Weryfikacja wycinka

**DoD techniczne (obserwowalne):**

- [ ] Toaster tylko po sesji; `top-right`; warstwa `--z-toast`; header `h-12` niezasłonięty (`offset` 4.5rem); box `bottom-right`.
- [ ] Brak Toastera na karcie logowania / first-run / accept-invite.
- [ ] PUT 200 → „Kontekst zapisany”; PUT 400 / predykat 3.5 → envelope, zero toasta.
- [ ] POST 202 → „Run wystartował” i `/account`; 409/400 startu → envelope, zero toasta.
- [ ] Terminal SSE poza `/runs/:id` tego runu: jeden toast + Szczegóły; na szczegółach tego runu zero toasta terminalu.
- [ ] `close()` / zniknięcie z boxa bez zmiany sensu Kroku 3.4.
- [ ] Widoki nie importują `sonner`; Faza 4 może reuse `notifyProduct` bez drugiego Toastera.
- [ ] Brak `next-themes`, `richColors`, `toast.promise`, typów toasta w shared, Browser Notification.

**Zgodność docs/SPEC:** trzy kanały (`ux_dashboard.md`); F-5a / F-7 / F-8; K-3 (konsumpcja, nie nowy event); anty-patterny toast≠live / ≠envelope / ≠store.

**Pre-flight product-ui (skrót):** dziedziczenie locku; copy PL bez em-dash i emoji; envelope as-is; motion toasta = default Sonner (`transform`/`opacity`); `prefers-reduced-motion` już globalnie w `globals.css`.

**Checklist skillu:** kotwica pokryta; kompletny kod nowych plików; refaktory fragmentami; pass rozwojowy = brak przesunięć; nagłówki `FAZA` / `KROK`; commit EN na końcu fazy; statusy z trójki; major nietknięty; brak sekretów.

---

## Ślad do major (informacyjnie, poza tą sesją)

Po implementacji DoD (ręcznie / w `/feature-implementation`, **nie** w tej sesji):

| Element major FE | Po implementacji |
|------------------|------------------|
| Faza 3.6 | `WYKONANY` |
| Krok 3.6.1, 3.6.2, 3.6.3 | `WYKONANY` |
| MILESTONE 3.6 | `OSIĄGNIĘTY` |
| Faza 3, MILESTONE 3, Krok 3.1, 3.4 | bez zmian (historia) |
| Faza 3.5, MILESTONE 3.5 | bez zmian (już `WYKONANY` / `OSIĄGNIĘTY`) |
| Faza 4 | nadal `NIE_ROZPOCZĘTY` do Milestone 3.5 **oraz** 3.6 |

Ten skill **nie** edytuje `content-chain-frontend_major_plan.md`.
