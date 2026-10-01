# Content Chain — feature plan: auto-finalize przeglądu (`REVIEW_TTL`) (Faza 14)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-14-auto-finalize-review.md`  
**Kotwica major:** Faza 14 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 6 / Krok 6.3 (`WYKONANY`) oraz Faza 10 / Krok 10.1 (`WYKONANY`) — przegląd bez limitu czasu / Edytuj do ręcznego finalize.  
**Źródła kanonu (nie treść 6.3 / 10.1):** `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `docs/deployment.md`, `docs/anty_patterny.md`, `docs/testy.md`, `SPEC-RUNY.md` R-10 / R-3b, `SPEC-PERSISTENCE.md` P-5, `SPEC-KOMUNIKACJA.md`, `SPEC-TESTY.md` D-12 / D-35…D-40, major Faza 14.  
**Pass rozwojowy:** env wcześniej niż w numeracji HOW majoru; `reviewExpiresAt` przed testami GET; reszta bez przesunięć między fazami major.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Auto-finalize przeglądu: `pipelineFinishedAt` + `REVIEW_TTL` + sweeper + `REVIEW_LOCKED` bez CAS po TTL + `reviewExpiresAt` wyliczane |
| Major | Faza 14 (gate, **bez** kroków kodu w majorze); start po Fazach 1–13 (`WYKONANY`); **bez** MILESTONE 14 |
| Poza zakresem | FE / UX (major FE Faza 10); HITL TTL; DELETE runów / wyników; finalize / UPDATE przy GET; `reviewFinalizedBy`; multi-instance api / distributed lock; blokada `POST /feedback` po TTL; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major: Faza 14 → `WYKONANY` (gate + ścieżka HOW). Postęp kodu = statusy `KROK` w tym pliku. Brak `MILESTONE` 14. MILESTONE 6 / Faza 6.3 / 10.1 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 14 (gate) | FAZA 1–3 | Persistence/env/kotwica → bramka TTL + snapshot + sweeper → testy/Postman |

**Pass rozwojowy (sesja planu):**

1. Env (`REVIEW_TTL` / `REVIEW_SWEEP_INTERVAL`) **przed** bramką mutacji, `reviewExpiresAt` i sweeperem (w majorze HOW było #5).
2. Helper `computeReviewExpiresAt` + pola odpowiedzi **przed** e2e GET / D-38.
3. **Brak** innych przesunięć; **brak** przenoszenia prac spoza Fazy 14.

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma 6, Zod 4.4.x w api, monorepo `packages/shared`.
- Parser TTL: istniejący `parseTtlMs` z `auth.helpers.ts` (jak `INVITE_TTL` / JWT TTL). **Bez** `@nestjs/schedule` — boot + `setInterval` / `clearInterval` w procesie api (MVP single-process — `docs/deployment.md`).
- `pipelineFinishedAt` na **`RunSnapshot`** (jak `cancelledAt` / pola przeglądu), **nie** na `RunRecord` bazowym.
- `reviewExpiresAt` **wyłącznie** w warstwie odpowiedzi (nie kolumna, nie pole snapshotu domenowego trwałego).
- Okno otwarte iff `reviewFinalizedAt === null` **oraz** `now < pipelineFinishedAt + REVIEW_TTL`.
- Po TTL, gdy `reviewFinalizedAt` jeszcze `null`: mutacje → **409** `REVIEW_LOCKED` **bez** `saveFinalizedAt` / bez zmiany `userRating` / `outputEdited` / `result`.
- Trwały lock w DB poza ręcznym finalize = **tylko sweeper** (`reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL`).
- Transition → `completed` \| `failed` ustawia kotwicę **raz** (`setPipelineFinishedAtIfAbsent`); `cancelled` i nieterminale → `null`.
- GET snapshot **bez** side-effectów (zakaz finalize przy odczycie).
- Lista `GET /runs/user/:userId` **bez** `pipelineFinishedAt` / `reviewExpiresAt`.
- `POST /feedback` **nie** jest blokowane przez TTL przeglądu (D-40).
- Defaults env: `REVIEW_TTL=2h`, `REVIEW_SWEEP_INTERVAL=5m`.
- Zakaz `any` / nieuzasadnionych asercji; `tsconfig` bez zmian.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

**Źródło:** Context7 MCP `/prisma/web` (`updateMany` → `BatchPayload.count`; backfill SQL w migracji; `@@index` złożony). Nest lifecycle (`OnModuleInit` / `OnModuleDestroy`) — wzorzec już w `InProcessRunWorker`; **bez** nowej zależności `@nestjs/schedule` (poza zakresem MVP / SPEC nie wymaga). Wersje projektu: `@prisma/client@^6`, `@nestjs/common@^11`.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|------------------|
| CAS / batch | `updateMany` + `count` | Jak `saveFinalizedAt` / `attemptCancel`; sweeper: find + per-row `updateMany` (różne `reviewFinalizedAt = pipelineFinishedAt + TTL`) |
| Migracja SQLite | RedefineTables + SQL backfill | Jak migracja cancel; backfill B w SQL migracji |
| Indeks | `@@index([...])` | `@@index([reviewFinalizedAt, pipelineFinishedAt])` — wspiera filtr sweepera |
| Harmonogram | `setInterval` + cleanup | Boot raz w `onModuleInit` (po recovery); interval z `REVIEW_SWEEP_INTERVAL` |

---

## FAZA 1 — Persistence, env, kotwica lifecycle

Odpowiada HOW majoru pkt 1–2 + 5 (env przesunięty wcześniej).

---

### KROK 1 — Prisma: `pipelineFinishedAt` + migracja backfill B + indeks

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kolumna kotwicy TTL, jednorazowy backfill B (`updatedAt` else `createdAt` dla `completed`/`failed`), indeks pod sweeper. `SPEC-PERSISTENCE.md` P-5, major Faza 14 HOW #1. Migracja **nie** ustawia `reviewFinalizedAt`.

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma`
- Nowy: `apps/api/prisma/migrations/20260930210000_run_pipeline_finished_at/migration.sql` (timestamp nazwy dopasuj przy `prisma migrate`)

#### Refaktor — `schema.prisma` (model `Run`)

**teraz:**

```prisma
  userRating         Int?
  outputEdited       Boolean            @default(false)
  reviewFinalizedAt  DateTime?
  cancelRequested    Boolean            @default(false)
  cancelledAt        DateTime?
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  // ... relations ...

  @@index([createdAt])
  @@index([status])
  @@index([taskType])
  @@index([platform])
  @@index([startedByUserId])
}
```

**zamień na:**

```prisma
  userRating         Int?
  outputEdited       Boolean            @default(false)
  reviewFinalizedAt  DateTime?
  pipelineFinishedAt DateTime?
  cancelRequested    Boolean            @default(false)
  cancelledAt        DateTime?
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  // ... relations ...

  @@index([createdAt])
  @@index([status])
  @@index([taskType])
  @@index([platform])
  @@index([startedByUserId])
  @@index([reviewFinalizedAt, pipelineFinishedAt])
}
```

#### Nowy plik — migracja (kształt SQL; przy generacji Prisma dopuszczalny RedefineTables jak cancel)

```sql
-- AlterTable (SQLite: Prisma zwykle emituje RedefineTables — zachowaj semantykę poniżej)
-- 1) ADD pipelineFinishedAt DATETIME NULL
-- 2) Backfill B:
UPDATE "Run"
SET "pipelineFinishedAt" = COALESCE("updatedAt", "createdAt")
WHERE "status" IN ('completed', 'failed')
  AND "pipelineFinishedAt" IS NULL;
-- 3) CREATE INDEX "Run_reviewFinalizedAt_pipelineFinishedAt_idx"
--    ON "Run"("reviewFinalizedAt", "pipelineFinishedAt");
-- UWAGA: migracja NIE ustawia reviewFinalizedAt.
```

Jeśli `prisma migrate dev` wygeneruje pełny RedefineTables: wklej `pipelineFinishedAt` do `CREATE TABLE "new_Run"`, w `INSERT … SELECT` ustaw `NULL` dla nowej kolumny, **po** `ALTER … RENAME` wykonaj `UPDATE` backfill B + `CREATE INDEX`.

**DoD kroku:**

- Schema ma `pipelineFinishedAt DateTime?` + indeks złożony.
- Migracja backfilluje wyłącznie kotwicę dla `completed`/`failed`; `reviewFinalizedAt` nietknięte w SQL.
- `prisma migrate` / `generate` przechodzi lokalnie.

---

### KROK 2 — Env: `REVIEW_TTL` + `REVIEW_SWEEP_INTERVAL`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Fail-fast walidacja env jak pozostałe TTL-stringi; defaulty `2h` / `5m`. `docs/deployment.md`, `SPEC-RUNY.md` R-10.

**Artefakty:**

- Zmiana: `apps/api/src/shared/config/env.schema.ts`
- Zmiana: `apps/api/src/shared/config/env.schema.spec.ts`
- Zmiana: `apps/api/.env.example`

#### Refaktor — `env.schema.ts`

**teraz:**

```typescript
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
    INVITE_TTL: z.string().min(1).default('7d'),
    MAIL_FROM: z.string().min(1).optional(),
```

**zamień na:**

```typescript
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
    INVITE_TTL: z.string().min(1).default('7d'),
    REVIEW_TTL: z.string().min(1).default('2h'),
    REVIEW_SWEEP_INTERVAL: z.string().min(1).default('5m'),
    MAIL_FROM: z.string().min(1).optional(),
```

#### Refaktor — `.env.example`

Dopisz po `INVITE_TTL`:

```bash
REVIEW_TTL="2h"
REVIEW_SWEEP_INTERVAL="5m"
```

#### Testy `env.schema.spec.ts` (dopisek)

```typescript
  it('defaults REVIEW_TTL to 2h and REVIEW_SWEEP_INTERVAL to 5m', () => {
    const env = validateEnv(valid);
    expect(env.REVIEW_TTL).toBe('2h');
    expect(env.REVIEW_SWEEP_INTERVAL).toBe('5m');
  });
```

**DoD kroku:**

- Brak zmiennych → defaulty `2h` / `5m`.
- `Env` typuje nowe pola; mocki env w testach use-case’ów muszą je dostać (kolejne kroki).

---

### KROK 3 — Snapshot / port / lifecycle: kotwica raz przy `completed` \| `failed`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Odczyt `pipelineFinishedAt` w snapshotcie; transition ustawia kotwicę **raz**; `cancelled` bez kotwicy. `SPEC-RUNY.md` R-10 pkt 4.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.ts`
- Zmiana: `apps/api/src/runs/run-record.test-helpers.ts`
- Zmiana: testy używające `RunSnapshot` / mocków `RunRepository` (dopisz `pipelineFinishedAt` + nową metodę portu)

#### Refaktor — `run.port.ts`

**teraz:**

```typescript
export type RunSnapshot = RunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
  cancelledAt: Date | null;
};
```

**zamień na:**

```typescript
export type RunSnapshot = RunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
  pipelineFinishedAt: Date | null;
  cancelledAt: Date | null;
};
```

Na interfejsie `RunRepository` dopisz:

```typescript
  /**
   * Sets pipelineFinishedAt once (WHERE pipelineFinishedAt IS NULL).
   * No-op if already set. Used on transition → completed | failed.
   */
  setPipelineFinishedAtIfAbsent(id: RunId, at: Date): Promise<void>;
```

#### Refaktor — `prisma-run.adapter.ts` (fragmenty)

1. `RunRow` + `RunReviewFields`: dodaj `pipelineFinishedAt: Date | null`.
2. `toSnapshot` / `base`: `pipelineFinishedAt: row.pipelineFinishedAt`.
3. Nowa metoda:

```typescript
  async setPipelineFinishedAtIfAbsent(id: RunId, at: Date): Promise<void> {
    await this.prisma.run.updateMany({
      where: { id, pipelineFinishedAt: null },
      data: { pipelineFinishedAt: at },
    });
  }
```

`saveStatus` **bez** ustawiania kotwicy (jedna odpowiedzialność — lifecycle woła osobno).

#### Refaktor — `run-lifecycle.service.ts`

**teraz:**

```typescript
    assertTransition(run.status, to);
    await this.runs.saveStatus(run.id, to);
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: to },
    });
    // ... hitl / completed / failed SSE ...
    return { ...run, status: to };
```

**zamień na:** (po `saveStatus`, przed SSE terminalnymi)

```typescript
    assertTransition(run.status, to);
    await this.runs.saveStatus(run.id, to);
    if (to === 'completed' || to === 'failed') {
      await this.runs.setPipelineFinishedAtIfAbsent(run.id, new Date());
    }
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: to },
    });
    // ... bez zmian hitl / completed / failed / return ...
    return { ...run, status: to };
```

`publishCancelled` **bez** ustawiania `pipelineFinishedAt`.

#### Refaktor — `run-record.test-helpers.ts`

W `SocialRunSnapshot` i `makeSocialSnapshot` dodaj `pipelineFinishedAt: Date | null` (default `null`). Snapshoty `completed`/`failed` w testach przeglądu: ustaw jawnie kotwicę (np. `new Date('2026-09-30T10:00:00.000Z')`).

#### Unit — `run-lifecycle.service.spec.ts` (dopisek)

- Przy `transition → completed` / `failed`: `setPipelineFinishedAtIfAbsent` wywołane raz.
- Przy `awaiting_hitl` / `interrupted` / (jeśli testuje) ścieżkach nieterminalnych: **nie** wołane.
- Drugie transition na ten sam id w teście adaptera: `updateMany` z `pipelineFinishedAt: null` → `count` 0 (idempotencja).

**DoD kroku:**

- Snapshot GET (później) może odczytać `pipelineFinishedAt`.
- Po `completed`/`failed` kotwica ustawiona; ponowny zapis statusu nie nadpisuje (CAS `IfAbsent`).
- `cancelled` → kotwica pozostaje `null`.

---

#### Propozycja commit message

```text
feat(runs): add pipelineFinishedAt anchor and review TTL env

Persist the review window start once on completed/failed and configure
REVIEW_TTL / REVIEW_SWEEP_INTERVAL for the upcoming sweeper.
```

---

## FAZA 2 — Bramka TTL, kontrakt odpowiedzi, sweeper

Odpowiada HOW majoru pkt 3–4 + 6.

---

### KROK 1 — Expiry w `assertRunReviewable` → `REVIEW_LOCKED` bez UPDATE

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Mutacje rating / output-edited / finalize po TTL rzucają `REVIEW_LOCKED` **zanim** dojdzie do CAS / `writer.commit` / `saveFinalizedAt`. `SPEC-RUNY.md` R-10 pkt 5–8, D-35.

**Artefakty:**

- Nowy: `apps/api/src/runs/domain/review-window.ts`
- Nowy: `apps/api/src/runs/domain/review-window.spec.ts`
- Zmiana: `apps/api/src/runs/domain/assert-run-reviewable.ts`
- Zmiana: `apps/api/src/runs/domain/assert-run-reviewable.spec.ts`
- Zmiana: `apps/api/src/runs/application/rate-run.use-case.ts`
- Zmiana: `apps/api/src/runs/application/finalize-review.use-case.ts`
- Zmiana: `apps/api/src/runs/application/save-output-edited.use-case.ts`
- Zmiana: odpowiadające `*.spec.ts` (wstrzyknięcie `ENV` + `pipelineFinishedAt` na snapshotach)

#### Nowy plik — `review-window.ts`

```typescript
export function isReviewWindowOpen(
  pipelineFinishedAt: Date | null,
  reviewFinalizedAt: Date | null,
  now: Date,
  reviewTtlMs: number,
): boolean {
  if (reviewFinalizedAt !== null) return false;
  if (pipelineFinishedAt === null) return false;
  return now.getTime() < pipelineFinishedAt.getTime() + reviewTtlMs;
}

/** ISO deadline or null — SPEC-RUNY R-10 pkt 10 / dictionary. */
export function computeReviewExpiresAt(
  pipelineFinishedAt: Date | null,
  reviewFinalizedAt: Date | null,
  reviewTtlMs: number,
): string | null {
  if (pipelineFinishedAt === null || reviewFinalizedAt !== null) {
    return null;
  }
  return new Date(pipelineFinishedAt.getTime() + reviewTtlMs).toISOString();
}
```

#### Nowy plik — `review-window.spec.ts` (szkic)

```typescript
import {
  computeReviewExpiresAt,
  isReviewWindowOpen,
} from './review-window';

const ANCHOR = new Date('2026-09-30T10:00:00.000Z');
const TTL_2H = 2 * 60 * 60 * 1000;

describe('review-window', () => {
  it('is open before deadline when not finalized', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        null,
        new Date('2026-09-30T11:59:59.000Z'),
        TTL_2H,
      ),
    ).toBe(true);
  });

  it('is closed at/after deadline without finalize', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        null,
        new Date('2026-09-30T12:00:00.000Z'),
        TTL_2H,
      ),
    ).toBe(false);
  });

  it('is closed when finalized even before deadline', () => {
    expect(
      isReviewWindowOpen(
        ANCHOR,
        new Date('2026-09-30T10:30:00.000Z'),
        new Date('2026-09-30T10:31:00.000Z'),
        TTL_2H,
      ),
    ).toBe(false);
  });

  it('computeReviewExpiresAt null when finalized or missing anchor', () => {
    expect(computeReviewExpiresAt(null, null, TTL_2H)).toBeNull();
    expect(
      computeReviewExpiresAt(ANCHOR, new Date('2026-09-30T10:05:00.000Z'), TTL_2H),
    ).toBeNull();
  });

  it('computeReviewExpiresAt returns ISO after TTL window start+ttl', () => {
    expect(computeReviewExpiresAt(ANCHOR, null, TTL_2H)).toBe(
      '2026-09-30T12:00:00.000Z',
    );
  });
});
```

#### Refaktor — `assert-run-reviewable.ts`

**teraz:**

```typescript
export function assertRunReviewable(
  run: RunSnapshot | null,
  actorId: UserId,
): asserts run is RunSnapshot {
  // ... RUN_NOT_FOUND / RUN_NOT_REVIEWABLE / FORBIDDEN ...
  if (run.reviewFinalizedAt !== null) {
    throw new DomainException(
      'REVIEW_LOCKED',
      'Review is already finalized',
      409,
    );
  }
}
```

**zamień na:**

```typescript
import type { UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { RunSnapshot } from './run.port';
import { isReviewWindowOpen } from './review-window';

export type ReviewWindowParams = {
  now: Date;
  reviewTtlMs: number;
};

export function assertRunReviewable(
  run: RunSnapshot | null,
  actorId: UserId,
  window: ReviewWindowParams,
): asserts run is RunSnapshot {
  if (!run) {
    throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
  }
  if (run.status !== 'completed' && run.status !== 'failed') {
    throw new DomainException(
      'RUN_NOT_REVIEWABLE',
      'Run is not in a reviewable state',
      409,
    );
  }
  if (run.startedByUserId !== actorId) {
    throw new DomainException('FORBIDDEN', 'Access denied', 403);
  }
  if (
    !isReviewWindowOpen(
      run.pipelineFinishedAt,
      run.reviewFinalizedAt,
      window.now,
      window.reviewTtlMs,
    )
  ) {
    throw new DomainException(
      'REVIEW_LOCKED',
      'Review is already finalized',
      409,
    );
  }
}
```

Uwaga: jedna gałąź `REVIEW_LOCKED` obejmuje zarówno `reviewFinalizedAt !== null`, jak i minięty TTL / brak kotwicy — **bez** UPDATE.

#### Refaktor — use-case’y mutacji (wzorzec)

Wstrzyknij `@Inject(ENV) private readonly env: Env` oraz:

```typescript
import { parseTtlMs } from '../../auth/application/auth.helpers';

// w execute, po getById:
assertRunReviewable(run, actor.id, {
  now: new Date(),
  reviewTtlMs: parseTtlMs(this.env.REVIEW_TTL),
});
```

Dotyczy: `RateRunUseCase`, `FinalizeReviewUseCase`, `SaveOutputEditedUseCase`.

Sukcesy mutacji **jeszcze bez** pól TTL w tym kroku — dopisze KROK 2.

**DoD kroku:**

- Unit: po TTL, `reviewFinalizedAt === null` → `REVIEW_LOCKED`; mock repo `saveRating` / `saveFinalizedAt` / `commit` **nie** wołane gdy assert rzuca wcześniej (test use-case z `jest.fn` niespodziewanym).
- Unit: w oknie nadal przechodzi jak dotąd.
- Komunikat / kod HTTP bez zmian kontraktu envelope (`REVIEW_LOCKED` / 409).

---

### KROK 2 — `reviewExpiresAt` na snapshotcie i sukcesach mutacji

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `GET /runs/:id` + 200 z rating / output-edited / finalize niosą `pipelineFinishedAt` + wyliczone `reviewExpiresAt`. Lista usera bez tych pól. GET bez side-effect. `SPEC-RUNY.md` R-3b / R-10 pkt 10, `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/application/rate-run.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/application/finalize-review.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/application/save-output-edited.use-case.ts` (+ spec)

#### Refaktor — `GetRunOutput` + `execute`

Dodaj do typu:

```typescript
  pipelineFinishedAt: string | null;
  reviewExpiresAt: string | null;
```

W `GetRunUseCase` wstrzyknij `ENV`. W `return`:

```typescript
      reviewFinalizedAt: run.reviewFinalizedAt?.toISOString() ?? null,
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: computeReviewExpiresAt(
        run.pipelineFinishedAt,
        run.reviewFinalizedAt,
        parseTtlMs(this.env.REVIEW_TTL),
      ),
      cancelledAt: run.cancelledAt?.toISOString() ?? null,
```

**Zakaz** wywołań `saveFinalizedAt` / sweepera w `GetRunUseCase`.

#### Refaktor — odpowiedzi mutacji

`RateRunUseCase` return:

```typescript
    return {
      runId: run.id,
      userRating: rating,
      reviewFinalizedAt: null,
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: computeReviewExpiresAt(
        run.pipelineFinishedAt,
        null,
        parseTtlMs(this.env.REVIEW_TTL),
      ),
    };
```

`SaveOutputEditedUseCase` return (rozszerz typ zwracany):

```typescript
    return {
      runId: run.id,
      outputEdited: true as const,
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: computeReviewExpiresAt(
        run.pipelineFinishedAt,
        null,
        parseTtlMs(this.env.REVIEW_TTL),
      ),
    };
```

`FinalizeReviewUseCase` return:

```typescript
    return {
      runId: run.id,
      userRating: run.userRating,
      outputEdited: run.outputEdited,
      reviewFinalizedAt: finalizedAt.toISOString(),
      pipelineFinishedAt: run.pipelineFinishedAt?.toISOString() ?? null,
      reviewExpiresAt: null, // reviewFinalizedAt ustawione → R-10
    };
```

**DoD kroku:**

- Snapshot po TTL, przed sweeperem: `reviewFinalizedAt === null`, `reviewExpiresAt` nadal ISO deadline.
- Po finalize: `reviewExpiresAt === null`.
- `ListRunsUserUseCase` / light item **bez** nowych pól.
- Unit GetRun: brak wywołań mutujących port przeglądu.

---

### KROK 3 — `AutoFinalizeExpiredReviewsUseCase` + boot + interval

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedyny auto-zapis locka; boot po recovery; okresowy tick. `SPEC-RUNY.md` R-10 pkt 9, major HOW #4.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts` — metoda batch
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Nowy: `apps/api/src/runs/application/auto-finalize-expired-reviews.use-case.ts`
- Nowy: `apps/api/src/runs/application/auto-finalize-expired-reviews.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/application/in-process-run.worker.ts` (+ spec boot)
- Zmiana: `apps/api/src/runs/runs.module.ts`

#### Port — dopisek

```typescript
  /**
   * Auto-finalize open reviews past pipelineFinishedAt + reviewTtlMs.
   * Sets reviewFinalizedAt = pipelineFinishedAt + reviewTtlMs per row.
   * Does not touch userRating / outputEdited / result.
   * @returns number of rows locked
   */
  finalizeExpiredReviews(now: Date, reviewTtlMs: number): Promise<number>;
```

#### Adapter — implementacja

```typescript
  async finalizeExpiredReviews(
    now: Date,
    reviewTtlMs: number,
  ): Promise<number> {
    const cutoff = new Date(now.getTime() - reviewTtlMs);
    const rows = await this.prisma.run.findMany({
      where: {
        reviewFinalizedAt: null,
        pipelineFinishedAt: { not: null, lte: cutoff },
      },
      select: { id: true, pipelineFinishedAt: true },
    });
    let locked = 0;
    for (const row of rows) {
      if (row.pipelineFinishedAt === null) continue;
      const finalizedAt = new Date(
        row.pipelineFinishedAt.getTime() + reviewTtlMs,
      );
      const result = await this.prisma.run.updateMany({
        where: { id: row.id, reviewFinalizedAt: null },
        data: { reviewFinalizedAt: finalizedAt },
      });
      locked += result.count;
    }
    return locked;
  }
```

**Zakaz** `delete` / zmiany `userRating` / `outputEdited` / payloadów wyniku.

#### Nowy plik — `auto-finalize-expired-reviews.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { parseTtlMs } from '../../auth/application/auth.helpers';
import { ENV, type Env } from '../../shared/config/env';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';

@Injectable()
export class AutoFinalizeExpiredReviewsUseCase {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(now: Date = new Date()): Promise<number> {
    return this.runs.finalizeExpiredReviews(
      now,
      parseTtlMs(this.env.REVIEW_TTL),
    );
  }
}
```

#### Refaktor — `in-process-run.worker.ts`

Klasa: `implements OnModuleInit, OnModuleDestroy`.

Pola:

```typescript
  private reviewSweepTimer: ReturnType<typeof setInterval> | null = null;
```

Konstruktor: dopisz `private readonly autoFinalize: AutoFinalizeExpiredReviewsUseCase`.

```typescript
  async onModuleInit() {
    await this.recover.execute();
    await this.autoFinalize.execute();
    this.reviewSweepTimer = setInterval(() => {
      void this.autoFinalize.execute().catch((err: unknown) => {
        this.logger.error({ err }, 'review auto-finalize sweep failed');
      });
    }, parseTtlMs(this.env.REVIEW_SWEEP_INTERVAL));
    // unref optional in Node — nie wymagane w Nest testach
    this.enqueuePump();
  }

  onModuleDestroy(): void {
    if (this.reviewSweepTimer !== null) {
      clearInterval(this.reviewSweepTimer);
      this.reviewSweepTimer = null;
    }
  }
```

Import `parseTtlMs`, `OnModuleDestroy`.

`runs.module.ts`: dodaj `AutoFinalizeExpiredReviewsUseCase` do `providers`.

#### Unit sweeper

- Wiersz z kotwicą starszą niż TTL, `reviewFinalizedAt null` → po `execute` lock = `pipelineFinishedAt + TTL`; rating/flag nietknięte (mock / adapter spec).
- Wiersz w oknie → `count` 0.
- Worker `onModuleInit`: kolejność `recover` → `autoFinalize` → `setInterval` → pump (spy order).

**DoD kroku:**

- Boot zawsze raz odpala sweeper niezależnie od interwału.
- `REVIEW_SWEEP_INTERVAL` steruje tickiem; **nie** zmienia długości okna.
- Restart api (symulacja ponownego `execute`) nie odmraża wygasłego przeglądu.

---

#### Propozycja commit message

```text
feat(runs): enforce review TTL and auto-finalize via sweeper

Reject post-TTL review mutations without locking CAS side effects and
persist reviewFinalizedAt only through the boot/interval sweeper.
```

---

## FAZA 3 — Testy i regresja

Odpowiada HOW majoru pkt 7.

---

### KROK 1 — Unit / e2e: D-35…D-40 + regresja D-12

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pokrycie `SPEC-TESTY.md` D-35…D-40; regresja D-12 (meta TTL na sukcesach); feedback po TTL nadal 201. `docs/testy.md`.

**Artefakty:**

- Rozszerzenia unit z FAZY 1–2 (assert, window, lifecycle, use-case’y, sweeper).
- Nowy lub rozszerzony e2e: np. `apps/api/test/runs-review-ttl.e2e-spec.ts` (albo dopisek do istniejącego review/cancel e2e — preferuj **osobny** plik TTL, żeby nie puchnąć cancel).

#### Przypadki e2e (obserwowalne)

| Case | Układ | Oczekiwanie |
|------|--------|-------------|
| D-35 | `completed`, `pipelineFinishedAt` w przeszłości ≥ TTL, `reviewFinalizedAt` null | PATCH rating / POST output-edited / POST finalize → **409** `REVIEW_LOCKED`; GET: rating/result/finalize **bez zmian** |
| D-36 | Jak wyżej + wywołanie `AutoFinalizeExpiredReviewsUseCase` (lub restart boot path) | `reviewFinalizedAt === pipelineFinishedAt + REVIEW_TTL`; rating/outputEdited/result bez zmian |
| D-37 | Po D-36 (lub samym TTL) ponowna mutacja | nadal `REVIEW_LOCKED`; okno nie otwiera się na nowo |
| D-38 | Po TTL przed sweeperem: GET `:id` | `reviewFinalizedAt` null, `reviewExpiresAt` ISO; **brak** zmiany DB finalize |
| D-39 | Seed „legacy”: `completed` z kotwicą = stary `updatedAt` (po migracji / ręcznym INSERT) starszą niż TTL, finalize null; boot sweeper | locked jak D-36 |
| D-40 | Ręczne finalize przed TTL → kolejne mutacje `REVIEW_LOCKED`; `cancelled` → `RUN_NOT_REVIEWABLE` + `pipelineFinishedAt` null; po auto-close `POST /feedback` `targetType=run` → **201** | jak SPEC |
| D-12 regresja | Sukces rating / output-edited / finalize w oknie | body zawiera `pipelineFinishedAt` + `reviewExpiresAt` (finalize → expires null) |

**Technika czasu w e2e:** ustaw `REVIEW_TTL` krótki w env testowym (np. `1s` / `2s`) **albo** wstaw kotwicę w przeszłości przez Prisma w beforeEach — bez sleepów dłuższych niż konieczne.

**DoD kroku:**

- D-35…D-40 przechodzą na warstwie adekwatnej (unit + e2e).
- Regresja D-12 / cancel D-12 (`RUN_NOT_REVIEWABLE` na `cancelled`) zielona.

---

### KROK 2 — Postman: regresja przeglądu + TTL

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kolekcja review: asercje meta TTL na GET/sukcesach; negatyw po wygaśnięciu (jeśli da się ustawić krótkie `REVIEW_TTL` w środowisku runnera) **albo** dokumentacja w `test/postman/README.md`, że D-35+ = e2e, a Postman = happy path + pola meta. Preferuj **dopisek requestów** gdy runner może użyć `REVIEW_TTL=2s` lokalnie.

**Artefakty:**

- Zmiana: `apps/api/test/postman/review.postman-collection.json`
- Ewentualnie: `apps/api/test/postman/README.md`

#### Minimalny zakres Postman

1. Po `GET /runs/:completedRunId` (completed w oknie): `pipelineFinishedAt` string ISO; `reviewExpiresAt` string ISO > now.
2. Po udanym `PATCH .../rating`: te same meta w body.
3. Po `POST .../finalize-review`: `reviewFinalizedAt` ISO, `reviewExpiresAt === null`.
4. Folder opcjonalny „TTL locked” (gdy env krótkie): mutacja → 409 `REVIEW_LOCKED` bez zmiany body DB (weryfikacja kolejnym GET).

**DoD kroku:**

- Happy path review nie regresuje.
- Dokumentacja runnera wspomina `REVIEW_TTL` / `REVIEW_SWEEP_INTERVAL` jeśli folder TTL jest w kolekcji.

---

#### Propozycja commit message

```text
test(runs): cover review TTL lock, sweeper, and snapshot meta

Add D-35–D-40 automated cases and Postman assertions for
pipelineFinishedAt / reviewExpiresAt without GET side effects.
```

---

## Weryfikacja wycinka

| Kryterium | Źródło |
|-----------|--------|
| Kotwica raz przy `completed`/`failed` | R-10 / P-5 / FAZA 1 KROK 3 |
| Backfill B bez finalize w migracji | P-5 / FAZA 1 KROK 1 |
| Mutacja po TTL = 409 bez UPDATE locka | R-10 / D-35 / FAZA 2 KROK 1 |
| Sweeper boot + interval jedyny auto-lock | R-10 / D-36 / FAZA 2 KROK 3 |
| GET bez side-effect; `reviewExpiresAt` wyliczane | R-10 / D-38 / FAZA 2 KROK 2 |
| Feedback nie blokowany TTL | D-40 / poza zakresem blokady feedback |
| Env default `2h` / `5m` | deployment.md / FAZA 1 KROK 2 |
| Nagłówki wyłącznie `FAZA` / `KROK` | skill |
| Commit message EN Conventional Commits na końcu każdej FAZY | skill |

**Poza weryfikacją tego pliku:** UI FE, multi-instance lock, edycja major.

---

## Ślad do major (informacyjnie, po późniejszej implementacji)

| Element major | Po implementacji HOW |
|---------------|----------------------|
| Faza 14 | `WYKONANY` (gate: docs/SPEC już mają kanon; HOW w tym feature-planie + kod) |
| MILESTONE 14 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| MILESTONE 6 / Faza 6.3 / 10.1 | bez zmian (`OSIĄGNIĘTY` / `WYKONANY`) |

Ten skill **nie** edytuje majoru.

---

## Nota sesji (metadane)

- Grandfathering docs: `docs/README.md` (brak frontmatteru — potwierdzona stara dokumentacja).
- `auto-close-review-plan.md` nieobecny w repo; kanon egzekwowalny w `docs/` + `spec/` (DoD gate majoru spełnione treścią).
