# Content Chain — feature plan: anulowanie runu (`cancelled`) (Faza 12)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-12-cancel.md`  
**Kotwica major:** Faza 12 (cała) — gate normy w `content-chain-backend_major_plan.md`; ten plik = **HOW implementacji BE** odblokowanej przez gate.  
**Refaktor względem:** Faza 3 / cykl runu (`WYKONANY`); Faza 7 / `interrupted` + recovery (`WYKONANY`); Faza 8 / SSE complete (`WYKONANY`); Faza 6 / przegląd + feedback (`WYKONANY`).  
**Źródła:** `SPEC-RUNY.md` R-4a / R-9 / R-10 / R-11, `SPEC-KOMUNIKACJA.md`, `SPEC-FEEDBACK.md` Fbk-3a, `SPEC-TESTY.md` D-11 / D-12 / D-14 / D-28 / D-30…D-34, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md` §6a, `docs/observability.md`, major Faza 12.  
**Kolejność `KROK`:** enum/DB/CAS → abort/recovery/SSE → HTTP + reguły opinii/przeglądu → testy (pass rozwojowy poniżej).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Implementacja BE anulowania runu (`cancelled`) zgodnie z normą po Fazach A–C `cancel-run-state-changes-plan.md` |
| Major | Faza 12 (gate, **bez** kroków kodu w majorze); start po Fazach 1–11 (`WYKONANY`); **bez** MILESTONE 12 |
| Poza zakresem | Abort gateway/provider poza sygnałem HTTP z api; admin-cancel; resume / retry na tym samym `runId`; rollback wyniku; UI FE (major FE Faza 8); usuwanie plików roboczych `cancel-run-state*.md` (Faza F planu zmian) |
| Po implementacji (informacyjnie) | Major: Faza 12 (gate) → `WYKONANY` gdy DoD gate spełnione (docs/SPEC + ten feature-plan). **Nie** oznacza to „kod cancel w produkcji” — postęp kodu = statusy `KROK` w tym pliku. Brak `MILESTONE` 12. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 12 (gate) | FAZA 1–3 | Całe HOW BE: enum/DB/CAS → abort/recovery/SSE → HTTP/reguły → testy |

**Pass rozwojowy (sesja planu):** typy + krawędzie `cancelled` + kolumny DB **przed** CAS; registry abort **przed** `CancelRunUseCase`; gałęzie recovery **przed** D-33; event `run.cancelled` w porcie SSE **przed** lifecycle i D-30/D-14; okno Fbk-3a / `assertRunReviewable` **przed** regresjami D-11/D-12. **Brak przesunięć między fazami major.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma 6, Zod 4.4.x w api, monorepo `packages/shared`.
- Pisownia statusu: wyłącznie `cancelled` (nie `canceled`).
- Wejścia do `cancelled`: `queued` \| `running` \| `awaiting_hitl` \| `interrupted`. Terminal bez wyjść.
- Authz cancel: wyłącznie `startedBy` (sesja = `startedByUserId`). Obcy → **403** `FORBIDDEN`.
- HTTP: `POST /api/v1/runs/:runId/cancel`, body puste; **200** + snapshot; **nie** awaituje `execute`.
- Idempotencja: już `cancelled` → **200** (bez ponownego abortu / logu cancel).
- Wyścig z `completed`/`failed` → **409** `RUN_NOT_CANCELABLE`.
- Durable: `cancelRequested` przed CAS; zerowanie przy wygranej `attemptCancel`; leftover z flagą → `cancelled` bez `recoveryAttempts++`.
- Abort v1: in-process `AbortController` per `runId`; `RunExecutorPort.execute(run, { signal })`; `fetch` do gateway z `signal`; **bez** abortu procesu gateway.
- Slot `MAX_CONCURRENT_RUNS`: HTTP cancel **nie** dekrementuje; zwalnia `finally` workera.
- Przegląd (rate / edit / finalize): **bez** `cancelled` → **409** `RUN_NOT_REVIEWABLE`.
- Opinia `targetType=run`: `completed` \| `failed` \| (`cancelled` **z** wynikiem).
- Zakaz `any` / nieuzasadnionych asercji; `tsconfig` bez zmian.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

**Źródło:** Context7 MCP `/prisma/web` (Prisma Client `updateMany` + `BatchPayload.count` jako CAS). Wersje: `@prisma/client@^6`, `@nestjs/common@^11`. AbortSignal / `fetch(signal)` — Web API Node 22 (projektowy `@types/node@^22`); bez nowej zależności npm.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| CAS statusu | `updateMany({ where: { id, status: { in: […] } }, data })` → `count === 1` | `attemptCancel` jak istniejące `claimNextQueued` / `saveRating` |
| Abort HTTP | `fetch(url, { signal })` | Opcjonalne `signal?` na `LlmChatCommand`; adapter przekazuje do `fetch` |
| Nest | Bez zmiany filtra wyjątków | `DomainException` + istniejący filter / envelope K-1 |

---

## FAZA 1 — Kontrakt statusu i persistence (enum / DB / CAS)

Odpowiada części „enum/DB → CAS” z opisu Fazy 12 majoru.

---

### KROK 1 — Shared `cancelled`, maszyna przejść, pola runu i SSE

**Status:** `WYKONANY`

**Cel:** `RunStatus` i `RUN_STATUSES` zawierają `cancelled`; legalne krawędzie do `cancelled`; `RunRecord` / snapshot / port SSE gotowe pod CAS i HTTP. Major Faza 12 + `SPEC-RUNY.md` Statusy / R-4a / R-11. Metrics auto-zbierze nowy status przez pętlę `RUN_STATUSES`.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/api/src/runs/domain/status-transitions.ts`
- Zmiana: `apps/api/src/runs/domain/status-transitions.spec.ts`
- Zmiana: `apps/api/src/runs/domain/run.types.ts`
- Zmiana: `apps/api/src/runs/domain/run.port.ts` (`RunSnapshot`: `cancelledAt`)
- Zmiana: `apps/api/src/runs/domain/run-sse.port.ts`
- Zmiana: `apps/api/src/runs/run-record.test-helpers.ts`
- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts` (`cancelledAt` w `GetRunOutput`)

#### Shared — `enums.ts`

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

#### Domain — `status-transitions.ts` (kompletny plik)

```typescript
import type { RunStatus } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';

const ALLOWED_RUN_STATES: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running', 'cancelled'],
  running: ['awaiting_hitl', 'completed', 'failed', 'interrupted', 'cancelled'],
  interrupted: ['running', 'failed', 'cancelled'],
  awaiting_hitl: ['running', 'cancelled'],
  completed: [],
  failed: [],
  cancelled: [],
};

export function assertTransition(from: RunStatus, to: RunStatus): void {
  if (!ALLOWED_RUN_STATES[from].includes(to)) {
    throw new DomainException(
      'CONFLICT',
      `Illegal run status transition: ${from} -> ${to}`,
      409,
      [{ from, to }],
    );
  }
}

export function canTransition(from: RunStatus, to: RunStatus): boolean {
  return ALLOWED_RUN_STATES[from].includes(to);
}

/** Statusy, z których CAS cancel może wygrać. */
export const CANCELABLE_RUN_STATUSES = [
  'queued',
  'running',
  'awaiting_hitl',
  'interrupted',
] as const satisfies readonly RunStatus[];
```

#### Unit — dopiski w `status-transitions.spec.ts`

- `queued|running|awaiting_hitl|interrupted → cancelled` — `not.toThrow`
- `completed|failed|cancelled → cancelled` — throw
- `cancelled → running` — throw
- `isRunStatus('cancelled') === true`

#### `run.types.ts` — pola na bazie rekordu

W `RunRecordBase` dopisz:

```typescript
  cancelRequested: boolean;
```

`cancelledAt` **nie** na `RunRecord` — tylko na snapshot HTTP (jak `userRating`).

#### `run.port.ts` — snapshot

```typescript
export type RunSnapshot = RunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
  cancelledAt: Date | null;
};
```

#### `run-sse.port.ts` — event

Dopisz wariant unii:

```typescript
  | { event: 'run.cancelled'; data: { runId: RunId } };
```

#### Test helpers

W `makeSocialRun` / `makeContentRun` / `makeSocialSnapshot` domyślnie:

```typescript
cancelRequested: false,
// w snapshot:
cancelledAt: null,
```

#### `GetRunOutput`

Dodaj `cancelledAt: string | null` (ISO albo `null`); mapowanie w `execute` z `run.cancelledAt?.toISOString() ?? null`.

**DoD kroku:**

- `isRunStatus('cancelled')`; metrics iteruje 7 statusów.
- Unit przejść jak powyżej.
- Kompilacja typów: brak `RunStatus` bez `cancelled`; snapshot wymaga `cancelledAt`.

---

### KROK 2 — Prisma + adapter: kolumny, mapowanie, `setCancelRequested` / `attemptCancel`

**Status:** `WYKONANY`

**Cel:** Trwałe `cancelRequested` + `cancelledAt`; CAS `attemptCancel` (R-11); claim interrupted **bez** flagi. `SPEC-RUNY.md` R-11 / R-9; Context7: `updateMany` + `count`.

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma`
- Nowa migracja: `apps/api/prisma/migrations/<timestamp>_run_cancel/migration.sql`
- Zmiana: `apps/api/src/runs/domain/run.port.ts` (metody portu)
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Unit: dopisek / nowy spec adaptera CAS (opcjonalnie lekki mock Prisma) — minimum: pokrycie w use-case spec KROK FAZA 3

#### Schema — dopisek w `model Run`

```prisma
  cancelRequested    Boolean            @default(false)
  cancelledAt        DateTime?
```

#### Migracja SQL (szkic)

```sql
-- AlterTable
ALTER TABLE "Run" ADD COLUMN "cancelRequested" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Run" ADD COLUMN "cancelledAt" DATETIME;
```

(Wygeneruj przez `prisma migrate dev` w implementacji; SQL musi być równoważny.)

#### Port — nowe metody

```typescript
  setCancelRequested(id: RunId): Promise<void>;
  /**
   * CAS: status ∈ cancelable → cancelled, cancelledAt, cancelRequested=false.
   * @returns true gdy count === 1
   */
  attemptCancel(id: RunId, cancelledAt: Date): Promise<boolean>;
```

#### Adapter — `teraz → zamień na` (fragmenty)

**1. `RunRow` + `toSnapshot`:** dodaj `cancelRequested: boolean`, `cancelledAt: Date | null` do typu wiersza i mapowania (`base.cancelRequested`, snapshot `cancelledAt: row.cancelledAt`).

**2. `create`:** przy create ustaw `cancelRequested: false` (default DB wystarczy; nie ustawaj `cancelledAt`).

**3. `claimNextInterrupted` where:**

**teraz:** `where: { status: 'interrupted' }`  
**zamień na:** `where: { status: 'interrupted', cancelRequested: false }`

**4. Nowe metody (kompletne):**

```typescript
  async setCancelRequested(id: RunId): Promise<void> {
    await this.prisma.run.updateMany({
      where: {
        id,
        status: { in: [...CANCELABLE_RUN_STATUSES] },
      },
      data: { cancelRequested: true },
    });
  }

  async attemptCancel(id: RunId, cancelledAt: Date): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: {
        id,
        status: { in: [...CANCELABLE_RUN_STATUSES] },
      },
      data: {
        status: 'cancelled',
        cancelledAt,
        cancelRequested: false,
      },
    });
    return result.count === 1;
  }
```

Import `CANCELABLE_RUN_STATUSES` z `status-transitions.ts`.

**DoD kroku:**

- Migracja aplikuje się na `file:./dev.db` / `test.db`.
- `attemptCancel` na `running` → `true` + status `cancelled` + `cancelledAt` + `cancelRequested=false`.
- Drugi `attemptCancel` → `false`.
- `claimNextInterrupted` pomija wiersze z `cancelRequested: true`.

---

#### Propozycja commit message

```text
feat(runs): add cancelled status, cancel columns, and attemptCancel CAS

Introduce the third terminal run status and durable cancelRequested so
recovery and HTTP cancel can race the in-process executor safely.
```

---

## FAZA 2 — Abort in-process, recovery, SSE terminal

---

### KROK 1 — Registry `AbortController` + sygnał w worker / `execute`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po wygranej CAS cancel worker abortuje hop in-process (R-11.5). `execute` przyjmuje `AbortSignal`; gateway `fetch` go honoruje.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/run-abort.registry.ts`
- Zmiana: `apps/api/src/runs/domain/run-executor.port.ts`
- Zmiana: `apps/api/src/runs/application/in-process-run.worker.ts`
- Zmiana: `apps/api/src/runs/application/run-dispatch.executor.ts`
- Zmiana: `apps/api/src/social/application/social-run.executor.ts` (+ content analogicznie)
- Zmiana: `apps/api/src/runs/infrastructure/stub-run.executor.ts`
- Zmiana: `apps/api/src/shared/llm/llm-hop.ts`
- Zmiana: `apps/api/src/llm/llm-gateway.types.ts`
- Zmiana: `apps/api/src/llm/llm-gateway.http.adapter.ts`
- Zmiana: testy executor / worker / hop / gateway (sygnatura + abort)
- Rejestracja providera w `RunLifecycleModule` lub `RunsModule` (export tokenu dla `CancelRunUseCase`)

#### Nowy plik — `run-abort.registry.ts`

```typescript
import { Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';

export const RUN_ABORT_REGISTRY = Symbol('RUN_ABORT_REGISTRY');

@Injectable()
export class RunAbortRegistry {
  private readonly controllers = new Map<string, AbortController>();

  /** Tworzy (lub zwraca istniejący) controller na czas execute. */
  begin(runId: RunId): AbortSignal {
    const key = String(runId);
    const existing = this.controllers.get(key);
    if (existing) return existing.signal;
    const controller = new AbortController();
    this.controllers.set(key, controller);
    return controller.signal;
  }

  requestCancel(runId: RunId): void {
    const controller = this.controllers.get(String(runId));
    controller?.abort();
  }

  end(runId: RunId): void {
    this.controllers.delete(String(runId));
  }
}
```

#### Port executor

```typescript
export type RunExecuteOptions = {
  signal?: AbortSignal;
};

export interface RunExecutorPort {
  execute(run: RunRecord, options?: RunExecuteOptions): Promise<void>;
}
```

#### Worker — `executeViaExecutor`

**teraz:** `await this.executor.execute(run);`  
**zamień na (szkic):**

```typescript
  private async executeViaExecutor(run: RunRecord): Promise<void> {
    const signal = this.abortRegistry.begin(run.id);
    try {
      await this.executor.execute(run, { signal });
    } catch {
      // jak dziś: log + mark failed tylko gdy status nadal running
      // …
    } finally {
      this.abortRegistry.end(run.id);
    }
  }
```

Wstrzyknij `RunAbortRegistry`. Istniejąca gałąź `latest?.status !== 'running'` **zostaje** — po CAS `cancelled` nie nadpisze `failed`.

#### Dispatch / Social / Content / Stub

Przekaż `options` do zagnieżdżonego `execute`. W Social/Content: przed `facade.invokePhase` / hopami:

```typescript
if (options?.signal?.aborted) {
  return; // status już cancelled albo zaraz będzie — worker nie markuje failed
}
```

Przekaż `signal` do `LlmHopService.chatJson` (rozszerz input o `signal?: AbortSignal`).

#### LLM + gateway

`LlmChatCommand`:

```typescript
  signal?: AbortSignal;
```

`chatJson`: na starcie pętli / przed `gateway.chat` — jeśli `signal?.aborted`, rzuć `DOMException`/`Error` z nazwą `AbortError` (bez retry: `isHopRetryable` → false dla abort).

`llm-gateway.http.adapter.ts` — `fetch(url, { …, signal: command.signal })`.

**DoD kroku:**

- Unit registry: `begin` → `requestCancel` → `signal.aborted === true`; `end` czyści mapę.
- Worker przekazuje signal; po abort executor kończy bez `failed`, gdy status `cancelled`.
- Gateway adapter: mock `fetch` otrzymuje `signal`.

---

### KROK 2 — Recovery: leftover + `cancelRequested` → `cancelled`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Boot R-9: leftover `running`/`interrupted` z flagą → `cancelled` bez `recoveryAttempts++`; flaga na terminalnym ignorowana.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts` — np. `findCancelRequestedLeftovers(): Promise<RunRecord[]>` **albo** rozszerzenie odczytów
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.ts`
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.spec.ts`
- Współdzielona emisja SSE cancel — użyta też w FAZA 2 KROK 3 / FAZA 3 (helper na lifecycle)

#### Port — odczyt leftover z flagą

```typescript
  /** running | interrupted z cancelRequested === true (boot cancel). */
  findCancelRequestedLeftovers(): Promise<RunRecord[]>;
```

Adapter:

```typescript
  async findCancelRequestedLeftovers(): Promise<RunRecord[]> {
    const rows = await this.prisma.run.findMany({
      where: {
        cancelRequested: true,
        status: { in: ['running', 'interrupted'] },
      },
    });
    return rows.map((row) => this.toSnapshot({ ...row, startedBy: null }));
  }
```

`findInterruptedRunning` **zostaje** (tylko `status: 'running'`) — recovery najpierw obsługuje flagę.

#### `RecoverInterruptedRunsUseCase` — zamień `execute`

```typescript
  async execute(): Promise<void> {
    const cancelLeftovers = await this.runs.findCancelRequestedLeftovers();
    for (const run of cancelLeftovers) {
      const cancelledAt = new Date();
      const won = await this.runs.attemptCancel(run.id, cancelledAt);
      if (won) {
        await this.lifeCycle.publishCancelled(run.id);
      }
      // false: już terminalny / wyścig — flaga na terminalnym ignorowana (R-9.7)
    }

    const leftoverRunning = await this.runs.findInterruptedRunning();
    for (const run of leftoverRunning) {
      if (run.cancelRequested) {
        // powinno być już obsłużone; defensywnie pomiń
        continue;
      }
      // … dotychczasowa ścieżka interrupted / failed / recoveryAttempts++
    }
  }
```

`publishCancelled` — dodane w KROK 3 (ten krok zależy od sygnatury; w implementacji **najpierw** dopisz helper na lifecycle, potem recovery — kolejność w jednym PR fazy: helper → recovery).

**DoD kroku:**

- Spec: leftover `running` + `cancelRequested` → `attemptCancel` + **bez** `saveRecoveryAttempt`.
- Leftover `interrupted` + flaga → `cancelled`.
- Leftover `running` bez flagi → jak dziś `interrupted` (+ inkrement).
- Flaga + już `completed` w DB: `attemptCancel` false, brak nadpisu.

---

### KROK 3 — Lifecycle / hub: `run.cancelled` + complete

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po legalnym `cancelled` hub emituje `run.status` → `run.cancelled` → `complete` (R-4a). Late-join HTTP traktuje `cancelled` jak inne terminale.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.ts`
- Zmiana: `apps/api/src/runs/domain/run-lifecycle.port.ts` (jeśli port eksponuje transition-only — dopisz `publishCancelled` albo trzymaj metodę tylko na serwisie używanym przez use-case/recovery)
- Zmiana: `apps/api/src/runs/runs.controller.ts` — `isTerminalStatus`
- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts` (late-join cancelled)

#### Lifecycle — nowa metoda

```typescript
  async publishCancelled(runId: RunId): Promise<void> {
    this.sseHub.publish({
      event: 'run.status',
      data: { runId, status: 'cancelled' },
    });
    this.sseHub.publish({
      event: 'run.cancelled',
      data: { runId },
    });
    this.sseHub.complete(runId);
  }
```

Opcjonalnie w `transition`: gałąź `to === 'cancelled'` wołająca to samo — **recovery/cancel HTTP preferują** `attemptCancel` + `publishCancelled` (bez `saveStatus` poza CAS).

#### Controller

**teraz:**

```typescript
function isTerminalStatus(status: RunStatus): boolean {
  return status === 'completed' || status === 'failed';
}
```

**zamień na:**

```typescript
function isTerminalStatus(status: RunStatus): boolean {
  return (
    status === 'completed' || status === 'failed' || status === 'cancelled'
  );
}
```

**DoD kroku:**

- Unit lifecycle: `publishCancelled` → 3 wywołania hub (status, cancelled, complete) w tej kolejności.
- Late-join `GET .../events` na `cancelled` → jeden `run.status` i complete (bez wiszącego streamu).

---

#### Propozycja commit message

```text
feat(runs): abort in-process execute and finalize cancel on recovery

Wire AbortSignal through the worker and LLM hop, and turn leftover
cancelRequested rows into cancelled without consuming recoveryAttempts.
```

---

## FAZA 3 — HTTP cancel, reguły przeglądu/opinii, dowód

---

### KROK 1 — `CancelRunUseCase` + `POST .../cancel`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt HTTP R-11: authz, flaga, CAS, abort, log, SSE, **200** bez await execute; idempotencja; **409** `RUN_NOT_CANCELABLE`.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/cancel-run.use-case.ts`
- Nowy: `apps/api/src/runs/application/cancel-run.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.ts`
- Zmiana: `apps/api/src/runs/runs.module.ts`
- Snapshot odpowiedzi = ten sam kształt co `GetRunUseCase` (reuse `getRun.execute` po cancel)

#### Nowy plik — `cancel-run.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunId, UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RunAbortRegistry } from './run-abort.registry';
import { RunLifecycleService } from './run-lifecycle.service';
import { GetRunUseCase, type GetRunOutput } from './get-run.use-case';

@Injectable()
export class CancelRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly abortRegistry: RunAbortRegistry,
    private readonly lifecycle: RunLifecycleService,
    private readonly getRun: GetRunUseCase,
  ) {}

  async execute(runId: RunId, actorId: UserId): Promise<GetRunOutput> {
    const snapshot = await this.runs.getById(runId);
    if (!snapshot) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    if (snapshot.startedByUserId !== actorId) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
    if (snapshot.status === 'cancelled') {
      return this.getRun.execute(runId);
    }
    if (snapshot.status === 'completed' || snapshot.status === 'failed') {
      throw new DomainException(
        'RUN_NOT_CANCELABLE',
        'Run is already finished',
        409,
      );
    }

    await this.runs.setCancelRequested(runId);
    const cancelledAt = new Date();
    const won = await this.runs.attemptCancel(runId, cancelledAt);

    if (!won) {
      const latest = await this.runs.getById(runId);
      if (latest?.status === 'cancelled') {
        return this.getRun.execute(runId);
      }
      throw new DomainException(
        'RUN_NOT_CANCELABLE',
        'Run is already finished',
        409,
      );
    }

    this.abortRegistry.requestCancel(runId);

    await this.lifecycle.appendLog({
      runId,
      conversationId: snapshot.conversationId,
      level: 'info',
      message: 'Run cancelled by user',
      step: 'CancelRunUseCase',
    });
    await this.lifecycle.publishCancelled(runId);

    return this.getRun.execute(runId);
  }
}
```

#### Controller — endpoint

```typescript
  @Post(':runId/cancel')
  @HttpCode(200)
  cancel(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.cancelRun.execute(runId, user.id);
  }
```

Wstrzyknij `CancelRunUseCase`; dodaj do `providers` w `RunsModule`.

**Kolejność tras:** Nest dopasowuje statyczne segmenty — `cancel` pod `:runId/cancel` jest OK obok `:runId/logs` / `:runId/events`.

**DoD kroku:**

- Unit use-case: happy CAS → `setCancelRequested` + `attemptCancel` + `requestCancel` + log + `publishCancelled`; **nie** woła executor.
- Już `cancelled` → 200 path, **zero** `attemptCancel` / abort / log cancel.
- Obcy actor → `FORBIDDEN` przed persist.
- `completed` → `RUN_NOT_CANCELABLE` bez `setCancelRequested` (opcjonalnie: wolno ustawić flagę tylko na cancelable — obecna kolejność sprawdza terminal **przed** flagą).

---

### KROK 2 — Feedback / rate / edit / finalize pod `cancelled`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** R-10 bez zmian dla przeglądu; Fbk-3a: opinia na `cancelled` **z** wynikiem. Port feedback zwraca sygnał obecności wyniku.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/assert-run-reviewable.ts` (+ spec) — jawny komentarz / test że `cancelled` → 409 (już pokryte przez `!== completed && !== failed`)
- Zmiana: `apps/api/src/feedback/domain/feedback-run.reader.port.ts`
- Zmiana: `apps/api/src/feedback/infrastructure/prisma.feedback-run-reader.adapter.ts`
- Zmiana: `apps/api/src/feedback/application/create-feedback.use-case.ts` (+ spec D-11)
- Helper obecności wyniku (domain feedback lub shared runs helper użyty tylko z adaptera feedback)

#### `FeedbackRunLookup`

```typescript
export type FeedbackRunLookup =
  | { kind: 'missing' }
  | {
      kind: 'found';
      startedBy: UserId | null;
      status: RunStatus;
      hasResult: boolean;
    };
```

#### Adapter — `hasResult`

Po `findUnique` runu: `hasResult = true` gdy istnieje **dowolny** wiersz powiązany:

- `socialIdea` / `socialContent` / `socialReelIdea` / `socialReelScript` / `contentOutline` / `contentDocument` dla `runId`

(albo `Promise.all` countów `> 0`). **Bez** importu `RunsModule`.

#### `CreateFeedbackUseCase` — okno statusu

**teraz:**

```typescript
      if (lookup.status !== 'completed' && lookup.status !== 'failed') {
        throw new DomainException(
          'RUN_NOT_REVIEWABLE',
          …
        );
      }
```

**zamień na:**

```typescript
      const reviewable =
        lookup.status === 'completed' ||
        lookup.status === 'failed' ||
        (lookup.status === 'cancelled' && lookup.hasResult);
      if (!reviewable) {
        throw new DomainException(
          'RUN_NOT_REVIEWABLE',
          'Run is not in a reviewable state',
          409,
        );
      }
```

**DoD kroku:**

- Unit feedback: `cancelled` + `hasResult` → zapis; `cancelled` + `!hasResult` → 409; `running` → 409; cudzy → 403.
- Unit `assertRunReviewable('cancelled')` → 409.
- Rate / edit / finalize bez zmian kodu ścieżki (nadal tylko completed/failed) + regresja unit.

---

### KROK 3 — Testy D-30…D-34, regresje, Postman, metrics

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Dowód kontraktu wg `SPEC-TESTY.md`; archiwum filtr `cancelled`; SSE; recovery; HITL po cancel.

**Artefakty:**

- Zmiana / dopiski: `apps/api/test/runs-lifecycle.e2e-spec.ts` (lub nowy `runs-cancel.e2e-spec.ts`)
- Zmiana: `apps/api/src/runs/application/in-process-run.worker.spec.ts` (abort / cancelled nie → failed)
- Zmiana: feedback / review specs (D-11 / D-12)
- Zmiana: Postman — nowa mini-kolekcja lub folder w istniejącej `review` / lifecycle: `POST {{baseUrl}}/api/v1/runs/{{runId}}/cancel`
- Sanity: `GET /metrics` zawiera label `cancelled` (przez `RUN_STATUSES`)
- HITL e2e: `POST .../hitl` na `cancelled` → 409

#### Szkic e2e D-30 (happy)

1. Auth + kompletny kontekst + `POST /runs` → `202`.
2. Poczekaj na `running` **albo** cancel od razu z `queued`.
3. `POST /runs/:id/cancel` → **200**, body `status === 'cancelled'`, `cancelledAt` ISO.
4. (Gdy był SSE subscribed) eventy: `run.status` cancelled, `run.cancelled`, koniec streamu.
5. Log zawiera wpis cancel.

#### D-31

Drugi `POST .../cancel` → **200**, ten sam status.

#### D-32

- Ustaw status `completed` (stub executor) → cancel → **409** `RUN_NOT_CANCELABLE`.
- Drugi user (invite/accept) → cancel cudzego → **403**.

#### D-33

Bez HTTP: w DB wstaw `running` + `cancelRequested=true`, zrestartuj app / wywołaj `RecoverInterruptedRunsUseCase` → status `cancelled`, `recoveryAttempts` bez inkrementu.

#### D-34

Cancel z `awaiting_hitl` → `POST .../hitl` → odrzucenie (nie `awaiting_hitl`).

#### Postman

Request: `POST /api/v1/runs/{{runId}}/cancel`, cookie auth, testy status 200 / 409 / 403 jak w e2e (happy + conflict). Opis w `apps/api/test/postman/README.md` — jedna linia o cancel.

**DoD kroku:**

- D-30…D-34 zielone w e2e/unit adekwatnie.
- Regresja D-14 (terminal + complete) obejmuje `cancelled`.
- D-28 akceptuje `status=completed,failed,cancelled`.
- `pnpm` test suite api (unit + e2e cancel) przechodzi lokalnie.

---

#### Propozycja commit message

```text
feat(runs): expose POST cancel and enforce review vs feedback windows

Let startedBy cancel non-terminal runs with immediate 200 + SSE, while
keeping star review off cancelled and allowing feedback only with partial
results.
```

---

## Weryfikacja wycinka

| Check | Kryterium |
|-------|-----------|
| Kotwica | Cała Faza 12 major (gate) → HOW BE cancel bez luk decyzyjnych |
| Docs/SPEC | Zgodność z R-11 / R-9 / R-4a / R-10 / Fbk-3a / D-30…D-34 |
| Kod nowych plików | `RunAbortRegistry`, `CancelRunUseCase` (+ spec) kompletne w planie |
| Refaktory | Fragmenty `teraz → zamień na` (enum, transitions, adapter CAS, worker, feedback, terminal SSE) |
| Pass rozwojowy | Typy/DB → abort → recovery/SSE → HTTP → reguły → testy; brak przenosin major |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN po każdej fazie |
| Poza zakresem | Gateway abort procesu, admin-cancel, FE, rollback |
| Statusy | Wszystkie kroki startują `NIE_ROZPOCZĘTY` |
| Major | Nietknięty w tej sesji |

---

## Ślad do major (informacyjnie, po implementacji / domknięciu gate)

| Element major | Po sesji feature-planu (gate) | Po implementacji kodu |
|---------------|------------------------------|------------------------|
| Faza 12 | `WYKONANY` (DoD gate: docs/SPEC + ścieżka HOW = ten plik) | bez dodatkowych kroków major — postęp w tym feature planie |
| MILESTONE 12 | brak | brak |
| MILESTONE 6 / 3 / … | bez zmian (`OSIĄGNIĘTY`) | bez zmian |

Edycja statusów major **poza** `/create-feature-implementation-plan`.

---

## Pass rozwojowy (sesja planu) — podsumowanie

1. `cancelled` w shared + transitions + pola rekordu/snapshot/SSE **przed** Prisma CAS.  
2. `attemptCancel` / `setCancelRequested` **przed** use-case i recovery.  
3. `RunAbortRegistry` + sygnatura `execute` **przed** `CancelRunUseCase.requestCancel`.  
4. `publishCancelled` **przed** recovery cancel i HTTP cancel.  
5. Fbk-3a `hasResult` **przed** e2e D-11 rozszerzonym.  
6. Testy na końcu FAZA 3.  

**Brak przesunięć między fazami major.**
