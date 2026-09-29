# Content Chain — feature plan: anulowanie runu (`cancelled`) (Faza 12)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-12-cancel.md`  
**Kotwica major:** Faza 12 (cała) — gate normy w `content-chain-backend_major_plan.md`; ten plik = **HOW implementacji BE** odblokowanej przez gate.  
**Refaktor względem:** Faza 3 / cykl runu (`WYKONANY`); Faza 7 / `interrupted` + recovery (`WYKONANY`); Faza 8 / SSE complete (`WYKONANY`); Faza 6 / przegląd + feedback (`WYKONANY`).  
**Źródła:** `SPEC-RUNY.md` R-4a / R-9 / R-10 / R-11, `SPEC-KOMUNIKACJA.md`, `SPEC-FEEDBACK.md` Fbk-3a, `SPEC-TESTY.md` D-11 / D-12 / D-14 / D-28 / D-30…D-34, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md` §6a, `docs/observability.md`, major Faza 12.  
**Kolejność** `KROK`**:** enum/DB/CAS → abort/recovery/SSE → HTTP + reguły opinii/przeglądu → testy (pass rozwojowy poniżej).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---



## Meta


| Pole                             | Wartość                                                                                                                                                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wycinek                          | Implementacja BE anulowania runu (`cancelled`) zgodnie z normą po Fazach A–C `cancel-run-state-changes-plan.md`                                                                                                                          |
| Major                            | Faza 12 (gate, **bez** kroków kodu w majorze); start po Fazach 1–11 (`WYKONANY`); **bez** MILESTONE 12                                                                                                                                   |
| Poza zakresem                    | Abort gateway/provider poza sygnałem HTTP z api; admin-cancel; resume / retry na tym samym `runId`; rollback wyniku; UI FE (major FE Faza 8); usuwanie plików roboczych `cancel-run-state*.md` (Faza F planu zmian)                      |
| Po implementacji (informacyjnie) | Major: Faza 12 (gate) → `WYKONANY` gdy DoD gate spełnione (docs/SPEC + ten feature-plan). **Nie** oznacza to „kod cancel w produkcji” — postęp kodu = statusy `KROK` w tym pliku. Brak `MILESTONE` 12. Edycja major **poza** tym skillem |


**Mapa major → ten plik**


| Major          | Feature  | Zakres                                                              |
| -------------- | -------- | ------------------------------------------------------------------- |
| Faza 12 (gate) | FAZA 1–3 | Całe HOW BE: enum/DB/CAS → abort/recovery/SSE → HTTP/reguły → testy |


**Pass rozwojowy (sesja planu):** typy + krawędzie `cancelled` + kolumny DB **przed** CAS; registry abort **przed** `CancelRunUseCase`; gałęzie recovery **przed** D-33; event `run.cancelled` w porcie SSE **przed** lifecycle i D-30/D-14; okno Fbk-3a / `assertRunReviewable` **przed** regresjami D-11/D-12. **Brak przesunięć między fazami major.**

---



## Założenia

- Stack bez zmian: NestJS 11, Prisma 6, Zod 4.4.x w api, monorepo `packages/shared`.
- Pisownia statusu: wyłącznie `cancelled` (nie `canceled`).
- Wejścia do `cancelled`: `queued`  `running`  `awaiting_hitl`  `interrupted`. Terminal bez wyjść.
- Authz cancel: wyłącznie `startedBy` (sesja = `startedByUserId`). Obcy → **403** `FORBIDDEN`.
- HTTP: `POST /api/v1/runs/:runId/cancel`, body puste; **200** + snapshot; **nie** awaituje `execute`.
- Idempotencja: już `cancelled` → **200** (bez ponownego abortu / logu cancel).
- Wyścig z `completed`/`failed` → **409** `RUN_NOT_CANCELABLE`.
- Durable: `cancelRequested` przed CAS; zerowanie przy wygranej `attemptCancel`; leftover z flagą → `cancelled` bez `recoveryAttempts++`.
- Abort v1: in-process `AbortController` per `runId`; `RunExecutorPort.execute(run, { signal })`; `fetch` do gateway z `signal`; **bez** abortu procesu gateway.
- Slot `MAX_CONCURRENT_RUNS`: HTTP cancel **nie** dekrementuje; zwalnia `finally` workera.
- Przegląd (rate / edit / finalize): **bez** `cancelled` → **409** `RUN_NOT_REVIEWABLE`.
- Opinia `targetType=run`: `completed`  `failed`  (`cancelled` **z** wynikiem).
- Zakaz `any` / nieuzasadnionych asercji; `tsconfig` bez zmian.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---



## Biblioteki (research)

**Źródło:** Context7 MCP `/prisma/web` (Prisma Client `updateMany` + `BatchPayload.count` jako CAS). Wersje: `@prisma/client@^6`, `@nestjs/common@^11`. AbortSignal / `fetch(signal)` — Web API Node 22 (projektowy `@types/node@^22`); bez nowej zależności npm.


| Temat       | Ustalenie                                                                  | Decyzja w wycinku                                                       |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| CAS statusu | `updateMany({ where: { id, status: { in: […] } }, data })` → `count === 1` | `attemptCancel` jak istniejące `claimNextQueued` / `saveRating`         |
| Abort HTTP  | `fetch(url, { signal })`                                                   | Opcjonalne `signal?` na `LlmChatCommand`; adapter przekazuje do `fetch` |
| Nest        | Bez zmiany filtra wyjątków                                                 | `DomainException` + istniejący filter / envelope K-1                    |


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

**1.** `RunRow` **+** `toSnapshot`**:** dodaj `cancelRequested: boolean`, `cancelledAt: Date | null` do typu wiersza i mapowania (`base.cancelRequested`, snapshot `cancelledAt: row.cancelledAt`).

**2.** `create`**:** przy create ustaw `cancelRequested: false` (default DB wystarczy; nie ustawaj `cancelledAt`).

**3.** `claimNextInterrupted` **where:**

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

**Status:** `WYKONANY`

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

**Status:** `WYKONANY`

**Cel:** Boot R-9 (`SPEC-RUNY.md`, `docs/data_flow.md` §6): leftover `running`  `interrupted` z `cancelRequested` → `cancelled` **bez** `recoveryAttempts++` i **bez** `transition(..., 'interrupted')`; flaga na już-terminalnym ignorowana (R-9.7). Cancel **nie** jest retryable.

**Stan kodu (kotwica):**

- `RecoverInterruptedRunsUseCase.execute` dziś: wyłącznie `findInterruptedRunning()` → cap/`isRetryable` → `failed` **albo** `saveRecoveryAttempt` + `lifeCycle.transition(..., 'interrupted')`. **Brak** gałęzi flagi.
- Port ma już `setCancelRequested` / `attemptCancel` (FAZA 1 KROK 2); **brak** `findCancelRequestedLeftovers`.
- `findInterruptedRunning` w adapterze: `where: { status: 'running' }` (także wiersze z flagą — obsłużone wcześniej pętlą cancel).
- `claimNextInterrupted` już filtruje `cancelRequested: false` (FAZA 1) — leftover z flagą nie wraca do execute.
- Worker `onModuleInit`: `await this.recover.execute()` **przed** pumpą — kolejność R-9.1 zachowana; rozszerzamy tylko treść `execute`.
- `RunAbortRegistry` + guard workera `latest?.status !== 'running'` (FAZA 2 KROK 1) — po CAS `cancelled` abort nie kończy się `failed`.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts` — `findCancelRequestedLeftovers`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.ts`
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.spec.ts` (`unusedRepo` + nowe case’y)
- Zależność: `RunLifecycleService.publishCancelled` (FAZA 2 KROK 3) — w jednym PR fazy: **najpierw** helper SSE, **potem** ta gałąź recovery



#### Port — dopisek w `RunRepository`

**teraz:** metody kończą się m.in. na `findInterruptedRunning` / `setCancelRequested` / `attemptCancel` (bez odczytu leftover z flagą).

**dopisz:**

```typescript
  /** Boot R-9: running | interrupted z cancelRequested === true. */
  findCancelRequestedLeftovers(): Promise<RunRecord[]>;
```



#### Adapter — `findCancelRequestedLeftovers` (+ obrona `findInterruptedRunning`)

Wzorzec jak istniejące `findInterruptedRunning` (`toSnapshot({ ...row, startedBy: null })`):

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

`findInterruptedRunning` **— zawężenie (spójne z** `claimNextInterrupted`**):**

**teraz:** `where: { status: 'running' }`  
**zamień na:** `where: { status: 'running', cancelRequested: false }`

Dzięki temu druga pętla recovery nie widzi wierszy z flagą nawet przy wyścigu w ramach jednego boota.

#### `RecoverInterruptedRunsUseCase` — `execute`

**teraz (szkielet):**

```typescript
  async execute(): Promise<void> {
    const leftoverRunning = await this.runs.findInterruptedRunning();
    for (const run of leftoverRunning) {
      if (
        run.recoveryAttempts >= RECOVERY_CAP ||
        !isRetryable({ kind: 'process_crash' })
      ) {
        await this.lifeCycle.appendLog(/* … recovery exhausted … */);
        await this.lifeCycle.transition(run, 'failed', { /* … */ });
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      await this.lifeCycle.transition(run, 'interrupted');
    }
  }
```

**zamień na:**

```typescript
  async execute(): Promise<void> {
    const cancelLeftovers = await this.runs.findCancelRequestedLeftovers();
    for (const run of cancelLeftovers) {
      const won = await this.runs.attemptCancel(run.id, new Date());
      if (won) {
        await this.lifeCycle.publishCancelled(run.id);
      }
      // false: już terminal / wyścig — flaga leftover ignorowana (R-9.7); bez logu user-cancel
    }

    const leftoverRunning = await this.runs.findInterruptedRunning();
    for (const run of leftoverRunning) {
      // … dotychczasowa ścieżka cap → failed / interrupted + recoveryAttempts++ (bez zmian)
    }
  }
```

Uwagi:

- **Bez** `appendLog` „cancelled by user” na ścieżce boot — R-11.7 dotyczy HTTP cancel; boot tylko finalizuje status + SSE (R-9 / R-4a).
- **Bez** `saveRecoveryAttempt` i **bez** `transition(..., 'interrupted')` dla leftover z flagą.
- `lifeCycle` już jest `RunLifecycleService` (klasa), nie token `RUN_LIFECYCLE` — `publishCancelled` tylko na serwisie (port grafów bez zmian).
- Konstruktor: nadal 2 zależności (`runs`, `lifeCycle`); `RecoverInterruptedRunsUseCase.length === 2` w spec zostaje.



#### Unit — dopiski w `recover-interrupted-runs.use-case.spec.ts`

1. `unusedRepo`: dopisz `findCancelRequestedLeftovers: unexpected` (jak pozostałe metody).
2. Leftover `running` + `cancelRequested: true` → `attemptCancel` wywołane; `saveRecoveryAttempt` **nie**; przy `won=true` → `publishCancelled(run.id)`.
3. Leftover `interrupted` + flaga → to samo (status wejściowy `interrupted`).
4. `attemptCancel` → `false` → zero `publishCancelled`, zero `saveRecoveryAttempt`.
5. Regresja: leftover `running` **bez** flagi → jak dziś inkrement + `transition(..., 'interrupted')`; `findCancelRequestedLeftovers` zwraca `[]`.
6. Regresja: `awaiting_hitl` nadal nietknięty (repo nie zwraca go z żadnej listy leftover).

**DoD kroku:**

- Spec: leftover z flagą → `cancelled` via CAS + SSE; **bez** `recoveryAttempts++`.
- Leftover `running` bez flagi → dotychczasowe `interrupted` (+ inkrement) / `failed` przy capie.
- Flaga na już `completed`/`failed`/`cancelled`: `findCancelRequestedLeftovers` ich nie zwraca; gdyby CAS dostał terminal — `false`, brak nadpisu.
- Boot nadal przed claimem `queued` (worker nietknięty w tym kroku poza zależnością od recovery).

---



### KROK 3 — Lifecycle / hub: `run.cancelled` + complete

**Status:** `WYKONANY`

**Cel:** Po legalnym `cancelled` (CAS już zapisany) hub emituje `run.status` → `run.cancelled` → `complete` (R-4a / K-3a). Late-join HTTP traktuje `cancelled` jak `completed`/`failed`. Event `run.cancelled` jest już w unii `RunSseEvent` (FAZA 1 KROK 1).

**Stan kodu (kotwica):**

- `RunLifecycleService.transition`: po `saveStatus` emituje `run.status`; dla `completed`/`failed` dodatkowy event + `sseHub.complete`; **brak** gałęzi `cancelled`.
- `RunLifecyclePort` = `Pick<RunLifecycleService, 'appendLog' | 'transition'>` — grafy Social/Content **nie** potrzebują cancel; **nie** rozszerzaj portu.
- `runs.controller.ts` `isTerminalStatus`: tylko `completed`  `failed` → late-join `of(run.status)` bez hub subject.
- Worker po abortcie: status już `cancelled` → nie woła `transition(..., 'failed')` (guard `!== 'running'`).

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.ts` — `publishCancelled`
- **Bez** zmiany: `run-lifecycle.port.ts` (zostaje `appendLog`  `transition`)
- Zmiana: `apps/api/src/runs/runs.controller.ts` — `isTerminalStatus`
- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts` (jeśli istnieje late-join; inaczej e2e D-14 w FAZA 3 KROK 3)

> **Zakres treści poniżej:** komplet zmian PRZED/PO dla każdego artefaktu tego kroku. Fragmenty `teraz:` odzwierciedlają **aktualny** stan plików w repo (import gałęzi FAZA 1). `run.cancelled` jest już w unii `RunSseEvent` (`run-sse.port.ts`) — **tu bez zmian**.

---



##### Artefakt 1 — `apps/api/src/runs/application/run-lifecycle.service.ts`

**Gdzie:** metoda instancyjna `RunLifecycleService`, dopisana **po** `appendLog(...)`, przed zamykającą klamrą klasy. Wykorzystuje istniejące `this.sseHub` (`@Inject(RUN_SSE_HUB)`) oraz typ `RunId` (już importowany: `import type { RunId, RunStatus } from '@content-chain/shared';`).

**teraz** (koniec klasy — ostatnia metoda to `appendLog`):

```typescript
  async appendLog(
    entry: Omit<RunLogEntry, 'at'> & { at?: Date },
  ): Promise<void> {
    const saved = await this.runs.appendLog({
      ...entry,
      at: entry.at ?? new Date(),
    });
    this.sseHub.publish({
      event: 'run.log',
      data: { ...saved, runId: saved.runId },
    });
  }
}
```

**zamień na** (dodany `publishCancelled` — reszta klasy bez zmian):

```typescript
  async appendLog(
    entry: Omit<RunLogEntry, 'at'> & { at?: Date },
  ): Promise<void> {
    const saved = await this.runs.appendLog({
      ...entry,
      at: entry.at ?? new Date(),
    });
    this.sseHub.publish({
      event: 'run.log',
      data: { ...saved, runId: saved.runId },
    });
  }

  /** SSE + hub complete after CAS `attemptCancel` already persisted `cancelled`. */
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
}
```

**Zakaz:** `transition(run, 'cancelled')` / `saveStatus(..., 'cancelled')` na ścieżce cancel — status ustawia **wyłącznie** `attemptCancel` (CAS, FAZA 1 KROK 2). `publishCancelled` = **tylko** SSE + `complete` huba (jak terminalne eventy `completed`/`failed`, po już zapisanym statusie). Metoda **nie** dotyka `this.runs` — nie ma zapisu do DB.

**Nie** dodawaj gałęzi `if (to === 'cancelled')` w `transition` w v1 — unikasz podwójnego zapisu (CAS + `saveStatus`) i ominięcia `attemptCancel`. `assertTransition` w `transition` nadal zna krawędzie do `cancelled` (FAZA 1 KROK 1), ale ścieżką cancel **nie** przechodzimy przez `transition`.

Kolejność emisji (DoD / D-14): `run.status` (`status: 'cancelled'`) → `run.cancelled` → `complete(runId)`.

---



##### Artefakt 2 — `apps/api/src/runs/domain/run-lifecycle.port.ts` (**BEZ ZMIAN**)

**Stan (zostaje):**

```typescript
export type RunLifecyclePort = Pick<
  RunLifecycleService,
  'appendLog' | 'transition'
>;
```

**Dlaczego bez zmian:** `publishCancelled` **nie** wchodzi do portu. Port `RunLifecyclePort` (token `RUN_LIFECYCLE`) jest kontraktem dla grafów Social/Content — potrzebują wyłącznie `appendLog` | `transition`. `publishCancelled` wołają **konkretną klasą** `RunLifecycleService` (wstrzykiwaną po typie, nie po tokenie):

- `RecoverInterruptedRunsUseCase` (FAZA 2 KROK 2),
- `CancelRunUseCase` (FAZA 3 KROK 1).

Rozszerzenie portu o `publishCancelled` byłoby wyciekiem odpowiedzialności terminala cancel do warstwy grafów — świadomie pomijamy.

---



##### Artefakt 3 — `apps/api/src/runs/runs.controller.ts`

**Gdzie:** wolna funkcja `isTerminalStatus` (nad klasą `RunsController`), używana w `events()` do decyzji late-join (early-return `of(...)` bez subskrypcji huba/heartbeat).

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

**Efekt:** przy `GET :runId/events` na runie już `cancelled` obie gałęzie (`snapshot` oraz `latest` po ponownym `getRun`) trafiają w `isTerminalStatus === true` → `return of(toMessage({ event: 'run.status', data: { runId, status } }))`. Observable kończy się po jednym evencie (Nest zamyka SSE) — **bez** `this.sse.subscribe(runId)`, **bez** heartbeat. Hub `complete` z `publishCancelled` obsługuje **live** subskrybentów obecnych w chwili cancelu; late-join HTTP **nie** czeka na hub. **Bez** innych zmian w `events()` — logika `subscribe/startWith/heartbeat/takeUntil` dla nie-terminali zostaje.

---



##### Artefakt 4 — `apps/api/src/runs/application/run-lifecycle.service.spec.ts`

**Gdzie:** nowy `it(...)` wewnątrz `describe('RunLifecycleService', ...)`, obok testów `completed` / `failed`. Helper `setup()` i `makeRun(...)` już istnieją; mock `sseHub` ma `publish` / `complete` jako `jest.Mock`. `publishCancelled` **nie** woła `runs`, więc mock repo (tylko `saveStatus`) wystarcza bez zmian.

**Dopisz** (nowy test):

```typescript
  it('publishCancelled emits run.status(cancelled) then run.cancelled, then completes', async () => {
    const { sseHub, service } = setup();
    const runId = makeRun('running').id;

    await service.publishCancelled(runId);

    expect(sseHub.publish).toHaveBeenNthCalledWith(1, {
      event: 'run.status',
      data: { runId, status: 'cancelled' },
    });
    expect(sseHub.publish).toHaveBeenNthCalledWith(2, {
      event: 'run.cancelled',
      data: { runId },
    });
    expect(sseHub.complete).toHaveBeenCalledWith(runId);

    const secondPublishOrder = sseHub.publish.mock.invocationCallOrder[1];
    const completeOrder = sseHub.complete.mock.invocationCallOrder[0];
    expect(completeOrder).toBeGreaterThan(secondPublishOrder);
  });
```

**Regresja (bez dopisywania — już zielone):** test `does not complete on awaiting_hitl or interrupted` nadal potwierdza, że `transition(..., 'awaiting_hitl' | 'interrupted')` **nie** woła `complete`. Nie modyfikuj go.

---



##### Artefakt 5 — `apps/api/src/runs/runs.controller.spec.ts`

**Gdzie:** nowy `it(...)` w `describe('RunsController', ...)`, obok `on completed snapshot emits run.status and completes without subscribe` / `on failed snapshot does not subscribe`. Bez zmian w `beforeEach` (mocki `getRun` / `sse` już są). Importy `newRunId`, `firstValueFrom`, `toArray` już obecne.

**Dopisz** (nowy test — late-join na terminalu `cancelled`):

```typescript
  it('on cancelled snapshot emits run.status and completes without subscribe', async () => {
    const runId = newRunId();
    getRun.execute.mockResolvedValue({
      runId,
      status: 'cancelled',
    });

    const stream = await controller.events(runId);
    const events = await firstValueFrom(stream.pipe(toArray()));

    expect(getRun.execute).toHaveBeenCalledTimes(1);
    expect(getRun.execute).toHaveBeenCalledWith(runId);
    expect(sse.subscribe).not.toHaveBeenCalled();
    expect(sse.complete).not.toHaveBeenCalled();
    expect(events).toEqual([
      { type: 'run.status', data: { runId, status: 'cancelled' } },
    ]);
  });
```

**Uwaga:** `getRun.execute` wołane **raz** (nie dwa) — pierwsza gałąź `isTerminalStatus(snapshot.status)` zwraca przed drugim `getRun`, dokładnie jak w teście `completed`. Testy kolejności tras / braku `@Public()` **bez zmian** — endpoint cancel dochodzi dopiero w FAZA 3 KROK 1.

**DoD kroku:**

- Unit lifecycle: kolejność status → cancelled → complete.
- Late-join `GET .../events` na `cancelled` → jeden `run.status`, stream kończy się (bez wiszącego połączenia).
- Port `RUN_LIFECYCLE` bez `publishCancelled` — recovery / `CancelRunUseCase` wołają klasę serwisu.

---



#### Propozycja commit message

```text
feat(runs): finalize cancelRequested leftovers and emit run.cancelled SSE

On boot, leftover running/interrupted rows with cancelRequested become
cancelled without consuming recoveryAttempts; hub closes like other terminals.
```

---



## FAZA 3 — HTTP cancel, reguły przeglądu/opinii, dowód

---



### KROK 1 — `CancelRunUseCase` + `POST .../cancel`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt HTTP R-11 / `docs/dokumentacja_komunikacji.md`: authz `startedBy`, durable flaga, CAS, abort in-process, log info, SSE, **200** + snapshot `GetRunOutput` **bez** await `execute`; idempotencja już-`cancelled`; **409** `RUN_NOT_CANCELABLE` vs `completed`/`failed`.

**Stan kodu (kotwica):**

- Brak `CancelRunUseCase` / brak `POST .../cancel` w `RunsController`.
- `RunsModule`: `RunAbortRegistry` już w `providers` + `exports`; brak `CancelRunUseCase`.
- `GetRunUseCase` / `GetRunOutput` już mają `cancelledAt: string | null` (FAZA 1).
- Kod envelope: `DomainException(code, message, httpStatus)` — `RUN_NOT_CANCELABLE` jak w docs (tabela błędów); brak osobnego enumu kodów.
- Worker: `requestCancel` → abort; po CAS status ≠ `running` → brak `failed` (FAZA 2 KROK 1).

**Artefakty:**

- Nowy: `apps/api/src/runs/application/cancel-run.use-case.ts`
- Nowy: `apps/api/src/runs/application/cancel-run.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.ts`
- Zmiana: `apps/api/src/runs/runs.module.ts` — `providers: […, CancelRunUseCase]`
- Odpowiedź = `GetRunUseCase.execute` (ten sam kształt co `GET :runId`)



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
    const won = await this.runs.attemptCancel(runId, new Date());

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

Kolejność sprawdzeń (R-11 / docs): 404 → 403 → idempotencja `cancelled` → 409 terminal → flaga → CAS → abort → log → SSE → snapshot. **Nie** awaituj `executor` / workera.

Slot `MAX_CONCURRENT_RUNS`: HTTP **nie** dekrementuje `inFlight` — zwalnia `finally` w `executeViaExecutor` (już w kodzie).

#### Controller — endpoint

Wstrzyknij `CancelRunUseCase` w konstruktorze `RunsController` (obok `startRun` / `getRun`).

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

**Kolejność tras:** `:runId/cancel` obok `:runId/logs` / `:runId/events` / `:runId/hitl` — Nest rozróżnia statyczny segment `cancel`.

`RunsModule.providers`: dodaj `CancelRunUseCase` (registry już jest).

#### Unit — `cancel-run.use-case.spec.ts`

Wzorce jak `rate-run` / `resume-hitl` (`unusedRepo` z `setCancelRequested` / `attemptCancel` / `findCancelRequestedLeftovers`).


| Case                            | Oczekiwanie                                                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Happy CAS                       | `setCancelRequested` → `attemptCancel(true)` → `requestCancel` → `appendLog` (info) → `publishCancelled` → `getRun`; **zero** wywołań executora |
| Już `cancelled`                 | 200 path / return snapshot; **zero** `setCancelRequested` / `attemptCancel` / `requestCancel` / log cancel                                      |
| Obcy `startedBy`                | `FORBIDDEN` 403 **przed** persist                                                                                                               |
| `completed` / `failed`          | `RUN_NOT_CANCELABLE` 409 **bez** `setCancelRequested`                                                                                           |
| CAS `false`, latest `cancelled` | idempotentny 200 (wyścig dwóch cancel)                                                                                                          |
| CAS `false`, latest `completed` | `RUN_NOT_CANCELABLE`                                                                                                                            |
| Brak runu                       | `RUN_NOT_FOUND` 404                                                                                                                             |


**DoD kroku:**

- Unit jak tabela powyżej.
- Ręczny smoke: `POST /api/v1/runs/:id/cancel` → 200, `status: cancelled`, `cancelledAt` ISO; drugi cancel → 200.
- Abort nie blokuje odpowiedzi HTTP.

---



### KROK 2 — Feedback / rate / edit / finalize pod `cancelled`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** R-10: przegląd (rate / edit / finalize) **bez** `cancelled` → 409 `RUN_NOT_REVIEWABLE`. Fbk-3a: opinia `targetType=run` na `cancelled` **tylko z** wynikiem; bez wyniku → 409. Port feedback zwraca sygnał obecności wyniku **bez** importu `RunsModule` / `assertRunReviewable`.

**Stan kodu (kotwica):**

- `assertRunReviewable`: `status !== 'completed' && !== 'failed'` → 409 — `cancelled` **już pada**; brak jawnego case’a w `it.each` (`queued|running|awaiting_hitl|interrupted`).
- `FeedbackRunLookup` found: `{ startedBy, status }` — **bez** `hasResult`.
- `PrismaFeedbackRunReaderAdapter`: `select: { startedByUserId, status }` tylko.
- `CreateFeedbackUseCase`: okno `completed`  `failed`; `NON_REVIEWABLE_STATUSES` w spec = cztery nieterminale (bez `cancelled`).
- Rate / `SaveOutputEdited` / `FinalizeReview` wołają `assertRunReviewable` — **bez** zmian ścieżki kodu w tym kroku (tylko regresja + jawny test `cancelled`).

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/assert-run-reviewable.spec.ts` — dopisz `'cancelled'` do `it.each`
- Zmiana: `apps/api/src/feedback/domain/feedback-run.reader.port.ts`
- Zmiana: `apps/api/src/feedback/infrastructure/prisma.feedback-run-reader.adapter.ts`
- Zmiana: `apps/api/src/feedback/application/create-feedback.use-case.ts` (+ spec D-11)
- Opcjonalnie: lekki helper `hasAnyRunResult(prisma, runId)` w infrastructure feedback (nie w domain Runs)



#### `FeedbackRunLookup` — `teraz → zamień na`

**teraz:**

```typescript
export type FeedbackRunLookup =
  | { kind: 'missing' }
  | { kind: 'found'; startedBy: UserId | null; status: RunStatus };
```

**zamień na:**

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



#### Adapter — `hasResult` (modele Prisma w `schema.prisma`)

Po `findUnique` runu (nadal `startedByUserId` + `status`) policz obecność **dowolnego** wiersza wyniku dla `runId`:


| Model Prisma       | Pole    |
| ------------------ | ------- |
| `SocialIdea`       | `runId` |
| `SocialContent`    | `runId` |
| `SocialReelIdea`   | `runId` |
| `SocialReelScript` | `runId` |
| `ContentOutline`   | `runId` |
| `ContentDocument`  | `runId` |


Szkic:

```typescript
const counts = await Promise.all([
  this.prisma.socialIdea.count({ where: { runId } }),
  this.prisma.socialContent.count({ where: { runId } }),
  this.prisma.socialReelIdea.count({ where: { runId } }),
  this.prisma.socialReelScript.count({ where: { runId } }),
  this.prisma.contentOutline.count({ where: { runId } }),
  this.prisma.contentDocument.count({ where: { runId } }),
]);
const hasResult = counts.some((n) => n > 0);
```

Równoważne Fbk-3a („dowolne nie-`null` pole wyniku w snapshotcie”) na poziomie persistence — **bez** składania pełnego snapshotu Runs. **Bez** `imports: [RunsModule]`.

Dla `kind: 'found'` zawsze ustawiaj `hasResult` (także przy `completed`/`failed` — use-case i tak nie wymaga go poza gałęzią `cancelled`).

#### `CreateFeedbackUseCase` — okno statusu

**teraz:**

```typescript
      if (lookup.status !== 'completed' && lookup.status !== 'failed') {
        throw new DomainException(
          'RUN_NOT_REVIEWABLE',
          'Run is not in a reviewable state',
          409,
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

Kolejność Fbk-3 → Fbk-3a **bez zmian**: najpierw własność (403), potem status/wynik (409).

#### Spec feedback / przegląd

- `foundRun` helper: dodaj `hasResult?: boolean` (domyślnie `true` dla `completed`/`failed` w istniejących testach).
- Nowe case’y: `cancelled` + `hasResult: true` → 201/zapis; `cancelled` + `hasResult: false` → 409, zero `save`.
- `NON_REVIEWABLE_STATUSES`: zostaw nieterminale; `cancelled` bez wyniku = osobny test (nie wrzucaj `cancelled` do tablicy bez wyniku jako „status only”).
- `assert-run-reviewable.spec.ts`: `it.each([…, 'cancelled'])` → 409.
- Rate / edit / finalize specs: jeden case `status: 'cancelled'` → `RUN_NOT_REVIEWABLE` (regresja D-12).

**DoD kroku:**

- Unit feedback: Fbk-3a zielone; cudzy nadal 403 przed 409.
- Unit `assertRunReviewable('cancelled')` → 409; rate/edit/finalize bez zmian logiki ścieżki.

---



### KROK 3 — Testy D-30…D-34, regresje, Postman, metrics

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Dowód kontraktu `SPEC-TESTY.md` D-30…D-34 (+ regresje D-11 / D-12 / D-14 / D-28); Postman; sanity metrics.

**Stan kodu (kotwica):**

- E2E: `apps/api/test/runs-lifecycle.e2e-spec.ts`, `runs-list.e2e-spec.ts` (D-28 dziś `completed,failed` — rozszerzyć o `cancelled`).
- Postman: `apps/api/test/postman/review.postman-collection.json` (+ README); tablice `RUN_STATUSES` w skryptach często **bez** `cancelled` — zaktualizować przy cancel / archiwum.
- HITL: `ResumeHitlUseCase` przy status ≠ `awaiting_hitl` → `HITL_REQUIRED` 409 — D-34 bez nowej gałęzi kodu.
- Metrics: pętla po `RUN_STATUSES` (shared) — label `cancelled` pojawia się po FAZA 1; sanity w tym kroku.

**Artefakty:**

- Nowy lub dopiski: `apps/api/test/runs-cancel.e2e-spec.ts` **albo** sekcja w `runs-lifecycle.e2e-spec.ts`
- Zmiana: `apps/api/test/runs-list.e2e-spec.ts` — D-28 → `completed,failed,cancelled`
- Zmiana: unit worker / cancel / recovery / lifecycle / feedback (uzupełnienia z KROKÓW powyżej, jeśli nie weszły wcześniej)
- Zmiana: `apps/api/test/postman/review.postman-collection.json` — folder Cancel (lub osobna mini-kolekcja)
- Zmiana: `apps/api/test/postman/README.md` — jedna linia o `POST .../cancel` + D-30…D-32
- Opcjonalnie: aktualizacja `RUN_STATUSES` w skryptach Postman Social/Content/Review (spójność z shared)



#### Szkic e2e


| Id   | Kroki                                                                                                    | Asercja                                                                                                                    |
| ---- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| D-30 | Auth + kontekst + `POST /runs` → 202; `POST .../cancel` (z `queued` lub po wejściu w `running`)          | **200**, `status=cancelled`, `cancelledAt` ISO; log info cancel; przy SSE: `run.status` → `run.cancelled` → koniec streamu |
| D-31 | Drugi `POST .../cancel`                                                                                  | **200**, status nadal `cancelled`                                                                                          |
| D-32 | Cancel na `completed`/`failed` (stub / dociągnij terminal); drugi user → cancel cudzego                  | **409** `RUN_NOT_CANCELABLE`; **403** `FORBIDDEN`                                                                          |
| D-33 | Unit lub e2e boot: DB `running`|`interrupted` + `cancelRequested=true` → `RecoverInterruptedRunsUseCase` | `cancelled`; `recoveryAttempts` bez inkrementu                                                                             |
| D-34 | Cancel z `awaiting_hitl` → `POST .../hitl`                                                               | **409** (nie wznowienie; status nie `awaiting_hitl`)                                                                       |


Dodatkowo:

- D-14: late-join / live complete obejmuje `cancelled` (hub + controller).
- D-11: feedback `cancelled`±wynik (unit wystarczy jeśli e2e feedback już pokrywa completed/failed).
- D-12: rate na `cancelled` → 409.
- D-28: `GET /runs?status=completed,failed,cancelled` — tylko te statusy.



#### Postman

- Request: `POST {{baseUrl}}/runs/{{runId}}/cancel`, cookie auth, body puste.
- Testy: 200 happy; 409 na terminalu; 403 druga sesja (folder Authz jak w Review).
- README: dopisz wiersz mapowania R-11 / D-30…D-32 → folder Cancel.



#### Worker (jeśli jeszcze nie w FAZA 2 KROK 1)

- Abort przy statusie już `cancelled` → **nie** `transition(..., 'failed')`; `abortRegistry.end` w `finally`.

**DoD kroku:**

- D-30…D-34 zielone (warstwa adekwatna).
- D-14 / D-28 / D-11 / D-12 regresje zielone.
- `pnpm` unit + e2e cancel w `apps/api` przechodzi lokalnie.
- Postman: request cancel + linia w README.

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


| Check             | Kryterium                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Kotwica           | Cała Faza 12 major (gate) → HOW BE cancel bez luk decyzyjnych                                          |
| Docs/SPEC         | Zgodność z R-11 / R-9 / R-4a / R-10 / Fbk-3a / D-30…D-34                                               |
| Kod nowych plików | `RunAbortRegistry` (`WYKONANY`), `CancelRunUseCase` (+ spec) w planie                                  |
| Refaktory         | Fragmenty `teraz → zamień na` względem **aktualnego** kodu (recovery, lifecycle, controller, feedback) |
| Pass rozwojowy    | Typy/DB → abort → recovery/SSE → HTTP → reguły → testy; brak przenosin major                           |
| Nagłówki          | Wyłącznie `FAZA` / `KROK`; commit message EN po każdej fazie                                           |
| Poza zakresem     | Gateway abort procesu, admin-cancel, FE, rollback                                                      |
| Statusy           | FAZA 1 + FAZA 2 KROK 1 = `WYKONANY`; od FAZA 2 KROK 2 = `NIE_ROZPOCZĘTY`                               |
| Major             | Nietknięty w tej sesji                                                                                 |


---



## Ślad do major (informacyjnie, po implementacji / domknięciu gate)


| Element major       | Po sesji feature-planu (gate)                             | Po implementacji kodu                                      |
| ------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| Faza 12             | `WYKONANY` (DoD gate: docs/SPEC + ścieżka HOW = ten plik) | bez dodatkowych kroków major — postęp w tym feature planie |
| MILESTONE 12        | brak                                                      | brak                                                       |
| MILESTONE 6 / 3 / … | bez zmian (`OSIĄGNIĘTY`)                                  | bez zmian                                                  |


Edycja statusów major **poza** `/create-feature-implementation-plan`.

---



## Pass rozwojowy (sesja planu) — podsumowanie

1. `cancelled` w shared + transitions + pola rekordu/snapshot/SSE **przed** Prisma CAS. *(FAZA 1 —* `WYKONANY`*)*
2. `attemptCancel` / `setCancelRequested` **przed** use-case i recovery. *(FAZA 1 —* `WYKONANY`*)*
3. `RunAbortRegistry` + sygnatura `execute` **przed** `CancelRunUseCase.requestCancel`. *(FAZA 2 KROK 1 —* `WYKONANY`*)*
4. `publishCancelled` **przed** recovery cancel i HTTP cancel. *(następne: FAZA 2 KROK 3 → KROK 2)*
5. Fbk-3a `hasResult` **przed** e2e/unit D-11 rozszerzonym.
6. Testy D-30…D-34 na końcu FAZA 3.

**Brak przesunięć między fazami major.**