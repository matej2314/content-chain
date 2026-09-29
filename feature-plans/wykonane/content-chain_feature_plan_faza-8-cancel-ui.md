# Content Chain — feature plan: Faza 8 (Anulowanie runu w UI)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Stop + modal, `POST .../cancel`, toast „Run anulowany”, archiwum `cancelled`, box „Anulowany”→200 ms, select opinii z `cancelled`+wynik |
| Major | `content-chain-frontend_major_plan.md` — **Faza 8** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 8 |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 8) |
| Kolejność KROK ≠ major | Major nie ma 8.1/8.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md`, `spec/SPEC-FRONTEND.md` F-5 / F-5a / F-5b / F-8 / F-9, `SPEC-FEEDBACK.md` Fbk-3a, `SPEC-RUNY.md` R-11 (kontrakt), skill `content-chain-product-ui` |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-12-cancel.md`. Shared `cancelled` — jeśli BE KROK 1 już wylądował, nie dubluj; w przeciwnym razie ten plan dopina enum |
| Poza zakresem | Kod BE / abort gateway; Stop w floating boxie; cancel bez modala; admin-cancel; Playwright; nowa paleta; `tsconfig` |
| Po implementacji (informacyjnie) | Major FE: Faza 8 → `WYKONANY` (DoD gate + ten HOW wdrożony). Brak `MILESTONE` 8. **Edycja major poza tym skillem.** |

**Pass rozwojowy (zatwierdzony):** (1) rozdzielić `isReviewableRunStatus` vs terminal SSE/`cancelled` **przed** rozszerzeniem `isTerminalRunStatus`; (2) `cancelRun` + wspólny `runTerminalToastId` przed Stopem i toastem SSE; (3) grace 200 ms boxa jako lokalny stan po `cancelled` (dziś `inProgress` = tylko live). Brak przesunięć między fazami major.

**HOW:** reuse `Dialog` (wzorzec `LogoutDialog`); Stop tylko Moje runy + szczegóły; floating box **bez** Stop; dedup toast mutacja/SSE per `runId`; HITL znika sam gdy status ≠ `awaiting_hitl`; przegląd/Edytuj tylko `completed`\|`failed`. Copy bez em-dash. Testy FE poza MVP (T-7).

**Design Read:** self-host dashboard, calm B2B, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1.

**Typy:** granice propsów `readonly`; unie dyskryminowane; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy; branded `RunId`. `tsconfig` **bez zmian**.

---

## Założenia

- Fazy 1–7 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 3 / 3.6 / 4 / 5 / 7.
- Pisownia statusu: wyłącznie `cancelled`. Etykieta przycisku: **Stop**. Modal: **„Czy na pewno?”** (Tak = API; Nie = close, zero API).
- Toast sukcesu mutacji: **„Run anulowany”**; SSE `run.cancelled` → ten sam copy + Szczegóły gdy nie na `/runs/:runId` tego runu; dedup `run-terminal:${runId}`.
- Authz UI: Stop tylko gdy `startedBy.id === session.user.id` i status nieterminalny (`queued`\|`running`\|`awaiting_hitl`\|`interrupted`).
- Envelope 403 / 409 z cancel → przy formularzu / wierszu (as-is), **zero** toasta sukcesu.
- Skill UI: bez drugiej palety; motion = istniejący Dialog + pulse statusu (nie dla `cancelled`).

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| Sonner (`^2.0.8`) | Context7 `/websites/sonner_emilkowal_ski` — `toast(title, { id, description })` | Ten sam `id` co `runTerminalToastId` → dedup mutacja/SSE; **bez** `toast.success` / `richColors` (lock Fazy 3.6) |
| Dialog | istniejący kit + wzorzec `LogoutDialog` | Kontrolowany `open` / `onOpenChange`; Tak/Nie w `DialogFooter` |
| EventSource | istniejący rejestr + `useRunEventSource` | Listener `run.cancelled` + `isTerminalRunStatus` obejmuje `cancelled` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Anulowanie runu w UI (`cancelled`)

Odpowiada major **Faza 8**.

---

### KROK 1 — Kontrakt FE: enum, typy, cancel API, SSE terminal, toast

**Status:** `WYKONANY`

**Cel:** FE rozpoznaje `cancelled` end-to-end (shared → parsery → SSE close → toast), bez Stop UI. Major Faza 8 + `SPEC-FRONTEND.md` F-5 / F-5a / F-5b (fundament). `SPEC-RUNY.md` R-11 (kształt HTTP/SSE).

**Artefakty:**

- Zmiana (gdy brak): `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.types.ts`
- Zmiana: `apps/frontend/src/modules/runs/api/run-labels.ts`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.api.ts`
- Zmiana: `apps/frontend/src/modules/notifications/product-toast.ts`
- Zmiana: `apps/frontend/src/modules/notifications/notify-product.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/use-run-event-source.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/own-runs-provider.tsx` (typy `onTerminal` + toast `cancelled`; **bez** grace boxa — KROK 3)
- Zmiana: `apps/frontend/src/modules/runs/components/run-edit-access.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/run-review-access.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/run-status.tsx` (styl `cancelled` ≠ `failed`)

Kolejność w kroku: shared → helpers statusów → labels/`cancelledAt` → `cancelRun` → toast → SSE → OwnRuns `onTerminal` → reviewable gate.

#### Shared — `enums.ts` (tylko jeśli BE jeszcze nie dodał)

**teraz:**

```typescript
export type RunStatus =
  'queued' | 'running' | 'interrupted' | 'awaiting_hitl' | 'completed' | 'failed';
// …
export const RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
  'completed',
  'failed',
] as const satisfies readonly RunStatus[];
```

**zamień na:**

```typescript
export type RunStatus =
  | 'queued'
  | 'running'
  | 'interrupted'
  | 'awaiting_hitl'
  | 'completed'
  | 'failed'
  | 'cancelled';
// …
export const RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
  'completed',
  'failed',
  'cancelled',
] as const satisfies readonly RunStatus[];
```

#### `runs.types.ts` — semantyka statusów

**teraz:**

```typescript
export function isTerminalRunStatus(
  status: RunStatus,
): status is 'completed' | 'failed' {
  return status === 'completed' || status === 'failed';
}
```

**zamień na:**

```typescript
export const SSE_TERMINAL_STATUSES = ['completed', 'failed', 'cancelled'] as const;
export type SseTerminalRunStatus = (typeof SSE_TERMINAL_STATUSES)[number];

export const REVIEWABLE_STATUSES = ['completed', 'failed'] as const;
export type ReviewableRunStatus = (typeof REVIEWABLE_STATUSES)[number];

export const CANCELABLE_STATUSES = [
  'queued',
  'running',
  'awaiting_hitl',
  'interrupted',
] as const;
export type CancelableRunStatus = (typeof CANCELABLE_STATUSES)[number];

/** Terminal SSE / archiwum / close EventSource — obejmuje `cancelled`. */
export function isTerminalRunStatus(
  status: RunStatus,
): status is SseTerminalRunStatus {
  return (SSE_TERMINAL_STATUSES as readonly RunStatus[]).includes(status);
}

/** Przegląd (gwiazdki / Edytuj / finalize) — bez `cancelled`. */
export function isReviewableRunStatus(
  status: RunStatus,
): status is ReviewableRunStatus {
  return (REVIEWABLE_STATUSES as readonly RunStatus[]).includes(status);
}

export function isCancelableRunStatus(
  status: RunStatus,
): status is CancelableRunStatus {
  return (CANCELABLE_STATUSES as readonly RunStatus[]).includes(status);
}
```

#### Snapshot — `cancelledAt`

Na `RunSnapshot` dodaj:

```typescript
readonly cancelledAt: string | null;
```

W `parseRunSnapshot` po `parseRunCore` / review:

```typescript
const cancelledAt =
  value.cancelledAt === null
    ? null
    : typeof value.cancelledAt === 'string'
      ? value.cancelledAt
      : (() => {
          throw new Error('Invalid cancelledAt');
        })();
// … do return: cancelledAt,
```

(Backend po Faza 12 zawsze wysyła `cancelledAt`; do czasu wdrożenia BE — parser może być przygotowany równolegle z BE KROK 1.)

#### Labels

W `RUN_STATUS_LABELS` / `RUN_STATUS_SHORT_LABELS` dodaj:

```typescript
cancelled: 'Anulowany',
```

Short w boxie = ta sama etykieta **„Anulowany”** (UX).

#### `runs.api.ts` — `cancelRun`

```typescript
export async function cancelRun(runId: RunId): Promise<RunSnapshot> {
  const body = await apiFetch(`/runs/${runId}/cancel`, {
    method: 'POST',
  });
  return parseRunSnapshot(body);
}
```

Body **puste**. Rozszerz `ArchiveRunsQuery.status` do `readonly ('completed' | 'failed' | 'cancelled')[]` (użycie w KROK 3).

#### Toast — `product-toast.ts` / `notify-product.tsx`

**teraz (`product-toast.ts`):**

```typescript
export type RunTerminalOutcome = 'completed' | 'failed';
```

**zamień na:**

```typescript
export type RunTerminalOutcome = 'completed' | 'failed' | 'cancelled';
```

**teraz (`notify-product.tsx` `notifyRunTerminal`):**

```typescript
  const title = input.outcome === 'completed' ? 'Run zakończony' : 'Run nieudany';
```

**zamień na:**

```typescript
  const title =
    input.outcome === 'completed'
      ? 'Run zakończony'
      : input.outcome === 'failed'
        ? 'Run nieudany'
        : 'Run anulowany';
```

Dodaj helper mutacji (ten sam `id` → dedup ze SSE):

```typescript
export function notifyRunCancelled(input: {
  readonly runId: RunId;
  readonly viewingRunId: RunId | null;
}): void {
  if (input.viewingRunId === input.runId) {
    notifyProduct({
      kind: 'success',
      title: 'Run anulowany',
      id: runTerminalToastId(input.runId),
    });
    return;
  }
  notifyRunTerminal({
    runId: input.runId,
    outcome: 'cancelled',
    viewingRunId: input.viewingRunId,
  });
}
```

#### `use-run-event-source.ts`

- `onTerminal?: (status: SseTerminalRunStatus) => void` (zamiast `'completed' | 'failed'`).
- `onTerminalLive` — ten sam typ.
- Listener:

```typescript
    const onCancelled = (): void => {
      onStatusLive('cancelled');
      onTerminalLive('cancelled');
      releaseOnce();
    };
    // …
    source.addEventListener('run.cancelled', onCancelled);
    // cleanup: removeEventListener('run.cancelled', onCancelled);
```

`run.status` z `status: cancelled` już przechodzi przez `isTerminalRunStatus` po rozszerzeniu — `releaseOnce` OK. Event `run.cancelled` = jawny komplet jak `completed`/`failed`.

#### OwnRuns — typ `onTerminal`

W `LiveItemSubscription`: `onTerminal: (runId, status: SseTerminalRunStatus) => void`. `notifyRunTerminal` dostaje `outcome: status` także dla `cancelled`.

#### Review / Edytuj — **obowiązkowa** zamiana przed użyciem nowego `isTerminalRunStatus`

**`run-review-access.ts` / `run-edit-access.ts` — teraz:** `isTerminalRunStatus(snapshot.status)`  
**zamień na:** `isReviewableRunStatus(snapshot.status)`

#### `run-status.tsx`

Dla `cancelled`: **bez** `text-destructive` (to nie `failed`); opcjonalnie `text-muted-foreground`. **Bez** `animate-pulse`.

**DoD kroku:**

- `isRunStatus('cancelled')` true (shared).
- `isTerminalRunStatus('cancelled')` true; `isReviewableRunStatus('cancelled')` false; `canReview`/`canEdit` na `cancelled` false.
- `cancelRun` woła `POST .../cancel` i parsuje snapshot z `cancelledAt`.
- SSE: `run.cancelled` zamyka rejestr; toast „Run anulowany” poza szczegółami tego runu; na szczegółach — no-op SSE toast (`viewingRunId`).
- Labely PL: „Anulowany”.

---

### KROK 2 — Stop + modal na Moich runach i szczegółach

**Status:** `WYKONANY`

**Cel:** Operator anuluje własny nieterminalny run przez **Stop** → modal → API. Major Faza 8 + F-5b / F-8. `docs/ux_dashboard.md` (Moje runy / szczegóły).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/cancel-run-dialog.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/use-cancel-run.ts` (opcjonalnie — jeśli logika wspólna; wolno też inline w dialogu)
- Zmiana: `apps/frontend/src/modules/runs/components/my-runs-list.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx`

#### Nowy plik — `cancel-run-dialog.tsx`

Kompletny komponent (wzorzec `LogoutDialog`):

```tsx
'use client';

import { useState } from 'react';
import type { RunId } from '@content-chain/shared';
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
import { ApiError } from '@/shared/api/envelope';
import { cancelRun } from '@/modules/runs/api/runs.api';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import { notifyRunCancelled } from '@/modules/notifications/notify-product';
import { useViewingRunId } from '@/modules/notifications/use-viewing-run-id';

type CancelRunDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly runId: RunId | null;
  readonly onCancelled: (snapshot: RunSnapshot) => void;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function CancelRunDialog({
  open,
  onOpenChange,
  runId,
  onCancelled,
}: CancelRunDialogProps) {
  const viewingRunId = useViewingRunId();
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  async function confirm(): Promise<void> {
    if (runId === null) return;
    setPending(true);
    setEnvelope(null);
    try {
      const snapshot = await cancelRun(runId);
      notifyRunCancelled({ runId, viewingRunId });
      onCancelled(snapshot);
      onOpenChange(false);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setEnvelope(reason.envelope);
      } else {
        setEnvelope(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        if (!next) setEnvelope(null);
        onOpenChange(next);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Czy na pewno?</DialogTitle>
          <DialogDescription>
            Anulujesz ten run. Tej decyzji nie da się cofnąć na tym samym przebiegu.
          </DialogDescription>
        </DialogHeader>
        {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
          >
            Nie
          </Button>
          <Button type="button" disabled={pending || runId === null} onClick={() => void confirm()}>
            Tak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**Zakaz:** wywołania `cancelRun` przy otwarciu / przy „Nie”.

#### `my-runs-list.tsx`

- Stan: `cancelTarget: RunId | null` (open = `cancelTarget !== null`).
- Przycisk **Stop** w kolumnie Akcje gdy `isCancelableRunStatus(item.status)` (wszystkie wiersze Moich runów = własne).
- Po sukcesie: `patchStatus(snapshot.runId, snapshot.status)` + `void refresh()` z `useOwnRuns`.
- Prefill „Nowy z tym briefem” **bez zmian**.

Fragment akcji (orientacyjny):

```tsx
{isCancelableRunStatus(item.status) ? (
  <Button
    type="button"
    variant="outline"
    size="sm"
    onClick={() => setCancelTarget(item.runId)}
  >
    Stop
  </Button>
) : null}
```

+ `<CancelRunDialog … />` na dole listy.

#### `run-details-view.tsx`

- Gdy `own && isCancelableRunStatus(snapshot.status)`: przycisk **Stop** w headerze (obok statusu).
- Ten sam `CancelRunDialog`.
- Po sukcesie: `setView` ze snapshotem z odpowiedzi (lub `reloadDetails`); `patchStatus`; `void refresh()`. HITL znika bo `status !== 'awaiting_hitl'`. Review/Edytuj zostają zamknięte przez `isReviewableRunStatus`.

**DoD kroku:**

- Stop widoczny tylko na Moich runach / szczegółach, własny + cancelable.
- Nie → zero `POST .../cancel`.
- Tak → 200 → toast „Run anulowany” (z Szczegóły poza detalami); wiersz/status `cancelled`; HITL/przegląd niedostępne.
- 409 / 403 → envelope w modalu, bez toastu sukcesu.
- Floating box **bez** przycisku Stop.

---

### KROK 3 — Archiwum, floating box (200 ms), select opinii

**Status:** `WYKONANY`

**Cel:** Domknięcie powierzchni kanonu po `cancelled`. F-5b pkt 5, F-8 archiwum, F-9 / Fbk-3a.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/own-runs-provider.tsx` (grace box)
- Zmiana: `apps/frontend/src/modules/runs/components/floating-runs-box.tsx`
- Zmiana: `apps/frontend/src/modules/feedback/components/feedback-form.tsx`
- Ewentualnie helper: `apps/frontend/src/modules/feedback/api/feedback-run-eligibility.ts`

#### Archiwum

**teraz:**

```typescript
type StatusFilter = 'both' | 'completed' | 'failed';
// …
status: statusFilter === 'both' ? ['completed', 'failed'] : [statusFilter],
// …
<option value="both">Zakończone i nieudane</option>
```

**zamień na:**

```typescript
type StatusFilter = 'all' | 'completed' | 'failed' | 'cancelled';
// …
status:
  statusFilter === 'all'
    ? (['completed', 'failed', 'cancelled'] as const)
    : ([statusFilter] as const),
```

Copy nagłówka: archiwum zakończonych, nieudanych **i anulowanych**. Opcje selecta: Wszystkie (trójkąt) / Zakończone / Nieudane / Anulowane. Domyślnie `all`.

Po starcie z modalu (Faza 7): lista nadal **bez** nowego wiersza, dopóki run nie jest w trójkącie terminalnym (w tym `cancelled`).

#### Floating box — grace 200 ms

W `OwnRunsProvider`:

1. Stan `cancelGrace: readonly UserRunItem[]` (pozycje ze `status: 'cancelled'` trzymane krótko).
2. Przy `patchStatus(runId, 'cancelled')` **oraz** przy `onTerminal(..., 'cancelled')`: dodaj/aktualizuj pozycję w `cancelGrace` (skopiuj item z listy z statusem `cancelled`).
3. `useEffect` / `setTimeout` **200 ms** → usuń `runId` z `cancelGrace`.
4. Eksport `boxItems = inProgress ∪ cancelGrace` (bez duplikatów; grace wygrywa label).
5. SSE subscriptions nadal tylko na `inProgress` (live) — **nie** na grace.
6. `FloatingRunsBox` czyta `boxItems` zamiast `inProgress`. **Bez** Stop.

Gdy `completed`/`failed`: **bez** grace — jak dziś (znikają z `inProgress` od razu).

#### Select opinii

**teraz:** `items.filter((item) => isTerminalRunStatus(item.status))` — po KROK 1 wciągnęłoby **każdy** `cancelled` (także bez wyniku) → **źle**.

**zamień na** asynchroniczny filtr Fbk-3a:

```typescript
// feedback-run-eligibility.ts
import type { UserRunItem } from '@/modules/runs/api/runs.types';
import { isReviewableRunStatus } from '@/modules/runs/api/runs.types';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import { runResultHasArtifacts } from '@/modules/runs/api/runs-result.types';

export async function filterFeedbackRunOptions(
  items: readonly UserRunItem[],
): Promise<readonly UserRunItem[]> {
  const reviewable = items.filter((item) => isReviewableRunStatus(item.status));
  const cancelled = items.filter((item) => item.status === 'cancelled');
  const withResult: UserRunItem[] = [];
  await Promise.all(
    cancelled.map(async (item) => {
      try {
        const snapshot = await fetchRunSnapshot(item.runId);
        if (runResultHasArtifacts(snapshot.result)) {
          withResult.push(item);
        }
      } catch {
        /* pomiń — API i tak odrzuci przy submit */
      }
    }),
  );
  return [...reviewable, ...withResult];
}
```

W `FeedbackForm`: gdy `targetType === 'run'` (lub przy mount / refresh own runs), wywołaj filtr; UI select = wynik. **Nie** używaj surowego `isTerminalRunStatus` do selecta.

**DoD kroku:**

- `GET /runs?status=completed,failed,cancelled` domyślnie; filtr pojedynczy działa.
- Box: po `cancelled` widać „Anulowany”, potem zniknięcie ≤ ~200 ms; bez Stop.
- Select opinii: `completed`\|`failed`\|(`cancelled` z artefaktem wyniku); `cancelled` z `queued` bez wyniku — poza listą.
- Regresja Fazy 7: start z archiwum bez wiersza w toku na liście.

---

#### Propozycja commit message

```text
feat(frontend): allow operators to cancel own runs from account and details

Stop opens a confirm dialog before POST cancel; archive, toast dedupe, and
floating box follow the cancelled terminal UX from the product canon.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major Faza 8 | HOW pokrywa DoD gate (Stop/modal, toast, archiwum, opinia, HITL/znikanie, box 200 ms) |
| SPEC F-5b / F-8 / F-9 | Zgodne; przegląd bez `cancelled`; select z wynikiem |
| docs UX | Modal „Czy na pewno?”; box bez Stop |
| Typy | `cancelledAt`, rozdzielone reviewable vs terminal SSE; brak `any` |
| Kod nowych plików | `cancel-run-dialog.tsx` (+ ewent. eligibility) kompletne w planie |
| Refaktory | Fragmenty `teraz → zamień na` |
| Pass rozwojowy | Wykonany przed zapisem; bez przesunięć między fazami major |
| Commit | Jedna propozycja EN Conventional Commits na końcu FAZA 1 |
| Major | **Nietknięty** w tej sesji |

---

## Ślad do major (informacyjnie, po implementacji)

| Element | Po wdrożeniu kodu |
|---------|-------------------|
| Faza 8 | `WYKONANY` |
| MILESTONE 8 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy 1–7 / M1–M6 | bez zmian (historia) |

Implementacja kodu = poza tą sesją (opcjonalnie ręczne `/feature-implementation`). Statusy major aktualizuje użytkownik / osobna sesja — **nie** ten skill.
