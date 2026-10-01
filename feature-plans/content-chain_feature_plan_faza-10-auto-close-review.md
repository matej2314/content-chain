# Content Chain — feature plan: Faza 10 (Auto-close przeglądu / `reviewExpiresAt`)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Szczegóły Run: disable Edytuj / gwiazdek / „Zamknij przegląd” gdy `reviewFinalizedAt !== null` **albo** minął serwerowy `reviewExpiresAt`; copy **„Przegląd zamknięty”**; lekki timer od pola API; **bez** countdown / „dostępne do…” |
| Major | `content-chain-frontend_major_plan.md` — **Faza 10** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 10. **Nie** mylić z backend Fazą 10 (Edytuj / email / filtr) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 10) |
| Kolejność KROK ≠ major | Major nie ma 10.1/10.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md` (Edytuj / ocena / Zamknij przegląd), `docs/dictionary.md` (`reviewExpiresAt`, `REVIEW_LOCKED`), `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-9, `SPEC-RUNY.md` R-10, `SPEC-KOMUNIKACJA.md` |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-14-auto-finalize-review.md`. FE **nie** implementuje Nest/Prisma / sweepera |
| Refaktor względem | Faza 5 / Krok 5.1 (`WYKONANY`) — przegląd otwarty do ręcznego finalize bez TTL. MILESTONE 5 = historia. Kanon = aktualne docs/SPEC, **nie** treść Kroku 5.1 |
| Poza zakresem | Kod BE; widoczny deadline / countdown / wiersz „dostępne do…”; copy auto vs ręczne; HITL TTL; polling / SSE „dla TTL”; lokalny math `pipelineFinishedAt + REVIEW_TTL`; Playwright; nowa paleta; `tsconfig`; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major FE: Faza 10 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 10. **Edycja major poza tym skillem.** |

**Pass rozwojowy:** brak przesunięć — KROK 2/3 używają pól i helperów z KROK 1; timer (KROK 3) nie wylicza TTL lokalnie.

**HOW:** parser snapshotu + predykat okna + disable jak po ręcznym finalize; sukces mutacji nadal kończy się `onReload` → świeży GET (nie trzeba osobno mapować nowych pól w body rating/edit/finalize, o ile GET je niesie).

**Design Read:** self-host dashboard, calm B2B, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`) — **bez** nowego chrome deadline.

**Typy:** granice propsów `readonly`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

---

## Założenia

- Fazy 1–9 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 5 / MILESTONE 5.
- Deadline wyłącznie z **`reviewExpiresAt`** (ISO lub `null`) z API. **Zakaz** `Date.parse(pipelineFinishedAt) + lokalnaStała`.
- Semantyka `reviewExpiresAt` (docs): `null` gdy brak `pipelineFinishedAt` **albo** `reviewFinalizedAt !== null`; inaczej ISO deadline — także **po** TTL, zanim sweeper zapisze lock.
- Okno otwarte (UI): `reviewFinalizedAt === null` **oraz** `!(reviewExpiresAt !== null && now >= Date.parse(reviewExpiresAt))`.
- Po lokalnym expiry (timer): UI jak zamknięty — copy **„Przegląd zamknięty”** (ew. ocena jeśli jest); kontrolki disabled; **bez** rozróżnienia auto vs ręczne.
- FE-only disable **nie** zastępuje API — mutacja po TTL → **409** `REVIEW_LOCKED` (`EnvelopeError` as-is). Reload odświeża `reviewFinalizedAt` gdy sweeper zapisał — **nie** wymagane do disable.
- `pipelineFinishedAt` parsujemy i trzymamy na snapshotcie (kontrakt GET / sukcesy mutacji), ale UI **nie** używa go do bramki ani copy.
- Lista `GET /runs/user/:userId` **bez** tych pól — bez zmian parsera listy.
- Skill UI: wyłącznie dziedziczenie; **zakaz** badge / chip / countdown przy panelu.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `useEffect` + `setTimeout` / cleanup | Context7 `/react/react` v19.2.8 — effect synchronizuje z timerem przeglądarki; `setState` w callbacku timeoutu; cleanup `clearTimeout` | Hook `useReviewExpiryTick`: jeden timeout do ISO z API; re-render po expiry |
| React 19 w projekcie | `apps/frontend/package.json` → `react@19.2.8` | Bez nowych zależności |
| Sonner / toast | — | **Nie** dodawać toastu przy auto-close / expiry |
| Visual | `content-chain-product-ui` | Dziedziczenie locku; copy w `text-muted-foreground` jak dziś |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Auto-close przeglądu w UI (`reviewExpiresAt`)

Odpowiada major **Faza 10**.

---

### KROK 1 — Typy + parser: `pipelineFinishedAt`, `reviewExpiresAt`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Snapshot szczegółów niesie kotwicę i wyliczony deadline z API; FE umie je sparsować i ocenić expiry **bez** lokalnego TTL. Major Faza 10 HOW #1; `SPEC-FRONTEND.md` F-9; `SPEC-RUNY.md` R-10; `docs/dictionary.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/run-review-window.ts`
- Zmiana: `apps/frontend/src/modules/runs/api/runs-result.types.ts` (`RunReviewFields`, `parseReviewFields`)
- Zmiana: `apps/frontend/src/modules/runs/api/runs.types.ts` (`parseRunSnapshot` — propagacja nowych pól)

Kolejność w kroku: typ + parser → helper okna (użycie w KROK 2).

#### Refaktor — `RunReviewFields` + `parseReviewFields`

**teraz** (`runs-result.types.ts`):

```typescript
export type RunReviewFields = {
  readonly userRating: UserRating | null;
  readonly outputEdited: boolean;
  readonly reviewFinalizedAt: string | null;
};
```

**zamień na:**

```typescript
export type RunReviewFields = {
  readonly userRating: UserRating | null;
  readonly outputEdited: boolean;
  readonly reviewFinalizedAt: string | null;
  readonly pipelineFinishedAt: string | null;
  readonly reviewExpiresAt: string | null;
};
```

**teraz** (koniec `parseReviewFields` — gałęzie `reviewFinalizedAt`):

```typescript
  if (value.reviewFinalizedAt === null) {
    return {
      userRating,
      outputEdited: value.outputEdited,
      reviewFinalizedAt: null,
    };
  }
  if (typeof value.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid reviewFinalizedAt');
  }
  return {
    userRating,
    outputEdited: value.outputEdited,
    reviewFinalizedAt: value.reviewFinalizedAt,
  };
}
```

**zamień na:**

```typescript
  const pipelineFinishedAt = parseNullableIso(value.pipelineFinishedAt, 'pipelineFinishedAt');
  const reviewExpiresAt = parseNullableIso(value.reviewExpiresAt, 'reviewExpiresAt');

  if (value.reviewFinalizedAt === null) {
    return {
      userRating,
      outputEdited: value.outputEdited,
      reviewFinalizedAt: null,
      pipelineFinishedAt,
      reviewExpiresAt,
    };
  }
  if (typeof value.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid reviewFinalizedAt');
  }
  return {
    userRating,
    outputEdited: value.outputEdited,
    reviewFinalizedAt: value.reviewFinalizedAt,
    pipelineFinishedAt,
    reviewExpiresAt,
  };
}
```

Dodaj lokalny helper w tym samym pliku (obok `parseReviewFields`):

```typescript
function parseNullableIso(value: unknown, label: string): string | null {
  if (value === null) return null;
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Invalid ${label}`);
  }
  return value;
}
```

#### Refaktor — `parseRunSnapshot`

**teraz:**

```typescript
    userRating: review.userRating,
    outputEdited: review.outputEdited,
    reviewFinalizedAt: review.reviewFinalizedAt,
  };
}
```

**zamień na:**

```typescript
    userRating: review.userRating,
    outputEdited: review.outputEdited,
    reviewFinalizedAt: review.reviewFinalizedAt,
    pipelineFinishedAt: review.pipelineFinishedAt,
    reviewExpiresAt: review.reviewExpiresAt,
  };
}
```

(`RunSnapshot` już jest `& RunReviewFields` — nowe pola wchodzą automatycznie.)

#### Nowy plik — kompletny kod

`apps/frontend/src/modules/runs/components/run-review-window.ts`:

```typescript
export type ReviewWindowFields = {
  readonly reviewFinalizedAt: string | null;
  readonly reviewExpiresAt: string | null;
};

/** True gdy API podało deadline i lokalny zegar jest ≥ ISO (bez lokalnego TTL math). */
export function isReviewExpired(
  reviewExpiresAt: string | null,
  nowMs: number = Date.now(),
): boolean {
  if (reviewExpiresAt === null) return false;
  const expiresMs = Date.parse(reviewExpiresAt);
  if (Number.isNaN(expiresMs)) return false;
  return nowMs >= expiresMs;
}

/** Okno przeglądu otwarte produktowo (finalize + serwerowy deadline). */
export function isReviewWindowOpen(
  fields: ReviewWindowFields,
  nowMs: number = Date.now(),
): boolean {
  return fields.reviewFinalizedAt === null && !isReviewExpired(fields.reviewExpiresAt, nowMs);
}
```

**Testy:** brak obowiązku Playwright (poza zakresem major). Opcjonalnie: ręczny smoke — snapshot z `reviewExpiresAt` w przeszłości → `isReviewWindowOpen === false`; `null` expires + `null` finalize → `true`.

**DoD kroku:**

- `parseRunSnapshot` wymaga `pipelineFinishedAt` i `reviewExpiresAt` (`string | null`); brak / zły typ → throw parsera.
- `isReviewExpired` / `isReviewWindowOpen` **nie** czytają `pipelineFinishedAt`.
- Lista user / archiwum bez zmian.

---

### KROK 2 — Bramki: `canReviewSnapshot` / `canEditSnapshot` + wyjście z edycji

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Edytuj, gwiazdki i finalize niedostępne po finalize **lub** po serwerowym expiry. Major Faza 10 HOW #2; `SPEC-FRONTEND.md` F-9; `docs/ux_dashboard.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/run-review-access.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/run-edit-access.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/use-run-result-edit.ts`

#### Refaktor — `canReviewSnapshot`

**teraz:**

```typescript
import type { UserId } from '@content-chain/shared';
import { isReviewableRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';

export function canReviewSnapshot(snapshot: RunSnapshot, userId: UserId): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isReviewableRunStatus(snapshot.status) &&
    snapshot.reviewFinalizedAt === null
  );
}
```

**zamień na:**

```typescript
import type { UserId } from '@content-chain/shared';
import { isReviewableRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';
import { isReviewWindowOpen } from '@/modules/runs/components/run-review-window';

export function canReviewSnapshot(
  snapshot: RunSnapshot,
  userId: UserId,
  nowMs: number = Date.now(),
): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isReviewableRunStatus(snapshot.status) &&
    isReviewWindowOpen(snapshot, nowMs)
  );
}
```

#### Refaktor — `canEditSnapshot`

**teraz:**

```typescript
export function canEditSnapshot(snapshot: RunSnapshot, userId: UserId): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isReviewableRunStatus(snapshot.status) &&
    snapshot.reviewFinalizedAt === null &&
    canEditResult(snapshot.taskType, snapshot.result)
  );
}
```

**zamień na:**

```typescript
import { isReviewWindowOpen } from '@/modules/runs/components/run-review-window';

export function canEditSnapshot(
  snapshot: RunSnapshot,
  userId: UserId,
  nowMs: number = Date.now(),
): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isReviewableRunStatus(snapshot.status) &&
    isReviewWindowOpen(snapshot, nowMs) &&
    canEditResult(snapshot.taskType, snapshot.result)
  );
}
```

(import `isReviewWindowOpen` obok istniejących importów; zachowaj `canEditResult` / `isReviewableRunStatus`.)

#### Refaktor — `useRunResultEdit` (wyjście z edycji po expiry)

**teraz:**

```typescript
export function useRunResultEdit(
  snapshot: RunSnapshot,
  onReload: () => Promise<void>,
): RunResultEditSession {
  // ...
  if (state.status === 'editing' && snapshot.reviewFinalizedAt !== null) {
    setState({ status: 'idle' });
    setEnvelope(null);
  }
```

**zamień na:**

```typescript
import { isReviewWindowOpen } from '@/modules/runs/components/run-review-window';

export function useRunResultEdit(
  snapshot: RunSnapshot,
  onReload: () => Promise<void>,
  nowMs: number = Date.now(),
): RunResultEditSession {
  // ... seenRunId bez zmian ...
  if (state.status === 'editing' && !isReviewWindowOpen(snapshot, nowMs)) {
    setState({ status: 'idle' });
    setEnvelope(null);
  }
```

**DoD kroku:**

- Po TTL (`reviewExpiresAt` w przeszłości, `reviewFinalizedAt === null`): `canReviewSnapshot` / `canEditSnapshot` → `false`.
- Otwarta edycja zamyka się (idle) gdy okno się zamyka (finalize **lub** expiry) przy re-renderze z aktualnym `nowMs`.
- Status `cancelled` nadal poza przeglądem (istniejące `isReviewableRunStatus`).

---

### KROK 3 — Panel + timer od `reviewExpiresAt` (bez countdown UI)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po expiry UI wygląda jak po ręcznym finalize; lekki timer wymusza disable bez SSE/pollingu; zero nowego chrome deadline. Major Faza 10 HOW #3–5; `SPEC-FRONTEND.md` F-9; skill `content-chain-product-ui`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/use-review-expiry-tick.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/run-review-panel.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-result-section.tsx`

#### Nowy plik — kompletny kod

`apps/frontend/src/modules/runs/components/use-review-expiry-tick.ts`:

```typescript
'use client';

import { useEffect, useState } from 'react';

/**
 * Re-render near/after server reviewExpiresAt so FE-only disable flips
 * without SSE/polling. Does not compute TTL from pipelineFinishedAt.
 */
export function useReviewExpiryTick(reviewExpiresAt: string | null): number {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (reviewExpiresAt === null) return;

    const expiresMs = Date.parse(reviewExpiresAt);
    if (Number.isNaN(expiresMs)) return;

    const delay = expiresMs - Date.now();
    if (delay <= 0) {
      setNowMs(Date.now());
      return;
    }

    const id = window.setTimeout(() => {
      setNowMs(Date.now());
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [reviewExpiresAt]);

  return nowMs;
}
```

#### Refaktor — `RunReviewPanel`

**teraz:**

```typescript
  const locked = snapshot.reviewFinalizedAt !== null;
  const author = snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId);
```

**zamień na:**

```typescript
import { isReviewWindowOpen } from '@/modules/runs/components/run-review-window';
import { useReviewExpiryTick } from '@/modules/runs/components/use-review-expiry-tick';

  const nowMs = useReviewExpiryTick(snapshot.reviewExpiresAt);
  const locked = !isReviewWindowOpen(snapshot, nowMs);
  const author = snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId, nowMs);
```

Reszta JSX **bez** nowego wiersza deadline / countdown. Istniejący blok:

```tsx
      {locked ? (
        <p className="text-sm text-muted-foreground">
          <span>Przegląd zamknięty.</span>
          {snapshot.userRating !== null ? <span> Ocena {snapshot.userRating} z 5.</span> : null}
        </p>
      ) : null}
```

zostaje — po expiry `locked === true` → ta sama copy (także gdy `reviewFinalizedAt` jeszcze `null`).

`EnvelopeError` na `REVIEW_LOCKED` (409) — bez zmian (as-is z API).

#### Refaktor — `RunResultSection`

**teraz:**

```typescript
  const edit = useRunResultEdit(snapshot, onReload);
  const editing = edit.state.status === 'editing';
  const canEdit = userId !== null && canEditSnapshot(snapshot, userId);
```

**zamień na:**

```typescript
import { useReviewExpiryTick } from '@/modules/runs/components/use-review-expiry-tick';

  const nowMs = useReviewExpiryTick(snapshot.reviewExpiresAt);
  const edit = useRunResultEdit(snapshot, onReload, nowMs);
  const editing = edit.state.status === 'editing';
  const canEdit = userId !== null && canEditSnapshot(snapshot, userId, nowMs);
```

**DoD kroku:**

- Po minięciu `reviewExpiresAt` (bez reloadu): gwiazdki / „Zamknij przegląd” / „Edytuj” disabled; widoczny tekst „Przegląd zamknięty.”; **brak** countdownu / „dostępne do…”.
- Po ręcznym finalize: zachowanie jak dziś (reload → `reviewFinalizedAt` + copy).
- Mutacja po TTL: envelope `REVIEW_LOCKED` widoczny; brak side-effect UI poza disable / błędem.
- Brak nowych tokenów / toastów / SSE pod TTL.

---

#### Propozycja commit message

```text
feat(runs): close review controls when server reviewExpiresAt passes

Match finalize UX after TTL without local TTL math or deadline chrome; rely on API reviewExpiresAt plus a light client timer.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major Faza 10 | Typy + bramki + panel/timer; bez implementacji BE |
| `docs/ux_dashboard.md` | Disable po finalize **lub** expiry; copy „Przegląd zamknięty”; bez countdown |
| `SPEC-FRONTEND.md` F-9 | Serwerowy `reviewExpiresAt`; zakaz lokalnego TTL math; lekki timer |
| `SPEC-RUNY.md` R-10 | FE respektuje `REVIEW_LOCKED`; nie ustawia finalize po stronie klienta |
| Pass rozwojowy | Brak przesunięć |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Commit message | Jedna propozycja EN na końcu FAZA 1 |
| Skill UI | Dziedziczenie; zero nowego chrome deadline |
| Major / docs / SPEC | **Nietknięte** w tej sesji |

**Checklist ręczny (po `/feature-implementation`):**

1. GET szczegółów completed w oknie: `pipelineFinishedAt` + `reviewExpiresAt` ISO; kontrolki aktywne dla autora.
2. Po ręcznym „Zamknij przegląd”: copy „Przegląd zamknięty”; kontrolki off.
3. Snapshot z `reviewExpiresAt` w przeszłości i `reviewFinalizedAt === null`: UI jak zamknięty **bez** czekania na sweeper.
4. Brak w UI tekstu deadline / countdown / „dostępne do…”.
5. (Gdy BE Faza 14 wdrożona) mutacja po TTL → 409 `REVIEW_LOCKED`.

---

## Ślad do major (informacyjnie)

Po realnej implementacji tego HOW (poza tą sesją):

| Pozycja | Docelowy status |
|---------|-----------------|
| `content-chain-frontend_major_plan.md` — **Faza 10** | `WYKONANY` |
| MILESTONE 10 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 5.1 / MILESTONE 5 | bez zmian (historia) |
| Backend Faza 14 | osobny ślad (`content-chain-backend_major_plan.md` / feature-plan BE) |

Ten skill **nie** edytuje majoru.
