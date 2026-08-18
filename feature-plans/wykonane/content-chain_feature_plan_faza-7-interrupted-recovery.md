# Content Chain — feature plan: `interrupted` i cap recovery

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-7-interrupted-recovery.md`  
**Kotwica major:** Faza 7 (cała) — kroki 7.1, 7.2, 7.3. Refaktor względem Fazy 3 / Kroku 3.2 (`WYKONANY`) oraz Fazy 1 / Kroku 1.2 (`WYKONANY`).  
**Źródła:** `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `docs/brand_types.md`, `SPEC-RUNY.md` (v4, R-6 / R-9), `SPEC-TESTY.md` (D-9 / D-9b / D-10), `SPEC-PERSISTENCE.md` (P-7).  
**Kolejność `KROK` w tym pliku = numeracja major 7.1 → 7.2 → 7.3** (pass rozwojowy bez przesunięć).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 7 majoru: status `interrupted`, claim pod `MAX_CONCURRENT_RUNS`, recovery bez burstu |
| Major | Faza 7 / kroki 7.1–7.3; start **po Milestone 3**, **przed Fazą 4** |
| Poza zakresem | Faza 4 (pipeline Social / LangGraph), zmiana capu HITL, UI dashboardu, checkpointer, migracja silnika DB, Milestone 7 (nie istnieje) |
| Po implementacji (informacyjnie) | Major: Faza 7 i kroki 7.1–7.3 → `WYKONANY`. Brak `MILESTONE` do oznaczenia. Edycja major **poza** tym skillem |

---

## Założenia

- Stack bez zmian: NestJS 11 (`OnModuleInit`), Prisma 6 + SQLite, Jest. `Run.status` w schema to `String` — **nowa wartość enumu nie wymaga migracji** (`SPEC-PERSISTENCE.md` P-7).
- Lista `GET /runs?status=` i metryki `runsByStatus` biorą `RUN_STATUSES` z `@content-chain/shared` — po KROK 1 filtr i gauge dostają `interrupted` bez osobnej listy.
- `POST /runs` nadal tworzy wyłącznie `queued`; odpowiedź to `queued` \| `running` po claimie. `interrupted` **nie** powstaje z HTTP.
- HITL (`ResumeHitlUseCase` → `notifyHitlResumed` → `scheduleExistingRunning`) **zostaje** poza capem claimu (R-6). Istniejące testy burstu HITL nie są przepisywane na recovery.
- Claim atomowy: ten sam wzorzec co `claimNextQueued` — `findFirst` + `updateMany` z wartownikiem statusu + retry gdy `count !== 1`. Prisma Client: `updateMany({ where, data })` zwraca `{ count }` (Context7 `/prisma/prisma`, Prisma 6).
- `onModuleInit`: recovery **zanim** pump cokolwiek claimuje; brak `scheduleExistingRunning` dla leftover (NestJS 11 — hook po inicjalizacji modułu, analogicznie do obecnego workera).

---

## FAZA 1 — Refaktor cyklu runu: `interrupted` i cap recovery

Odpowiada major **Faza 7**. Jedna faza w tym zestawie.

---

### KROK 1 — Kontrakt `RunStatus` i maszyna przejść

**Status:** `WYKONANY`

**Cel:** `@content-chain/shared` eksportuje `interrupted`; domain odrzuca nielegalne krawędzie (w tym `interrupted → queued`, `awaiting_hitl → interrupted`). Filtr listy akceptuje nowy status. Major 7.1; `SPEC-RUNY.md` (graf statusów); `docs/brand_types.md` / `docs/dictionary.md`.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/api/src/runs/domain/status-transitions.ts`
- Zmiana: `apps/api/src/runs/domain/status-transitions.spec.ts`
- Zmiana: `apps/api/test/runs-list.e2e-spec.ts` (filtr `status=interrupted`)
- Bez zmiany: `apps/api/prisma/schema.prisma` (`status String`), `list-runs-query.dto.ts` (`@IsIn([...RUN_STATUSES])`), `metrics.service.ts` (pętla `RUN_STATUSES`)

**Kolejność:** enum shared → maszyna przejść → testy domain → e2e filtra.

#### Implementacja — `packages/shared/src/branded/enums.ts`

**teraz:**

```typescript
export type RunStatus = 'queued' | 'running' | 'awaiting_hitl' | 'completed' | 'failed';
```

```typescript
export const RUN_STATUSES = ['queued', 'running', 'awaiting_hitl', 'completed', 'failed'] as const satisfies readonly RunStatus[];
```

**zamień na:**

```typescript
export type RunStatus =
  | 'queued'
  | 'running'
  | 'interrupted'
  | 'awaiting_hitl'
  | 'completed'
  | 'failed';
```

```typescript
export const RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
  'completed',
  'failed',
] as const satisfies readonly RunStatus[];
```

`isRunStatus` bez zmian — czyta `RUN_STATUSES`.

#### Implementacja — `apps/api/src/runs/domain/status-transitions.ts`

**teraz** (`ALLOWED`):

```typescript
const ALLOWED: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running'],
  running: ['awaiting_hitl', 'completed', 'failed'],
  awaiting_hitl: ['running'],
  completed: [],
  failed: [],
};
```

**zamień na:**

```typescript
const ALLOWED: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running'],
  running: ['awaiting_hitl', 'completed', 'failed', 'interrupted'],
  interrupted: ['running', 'failed'],
  awaiting_hitl: ['running'],
  completed: [],
  failed: [],
};
```

`assertTransition` / `canTransition` bez zmian sygnatur. Po dopisaniu klucza `interrupted` `Record<RunStatus, …>` się kompiluje.

#### Implementacja — `apps/api/src/runs/domain/status-transitions.spec.ts`

Dopisz na końcu `describe` (istniejące case’y zostają):

```typescript
  it('exports interrupted in RUN_STATUSES', () => {
    expect(isRunStatus('interrupted')).toBe(true);
    expect(RUN_STATUSES).toContain('interrupted');
  });

  it('allows running => interrupted and interrupted => running | failed', () => {
    expect(canTransition('running', 'interrupted')).toBe(true);
    expect(canTransition('interrupted', 'running')).toBe(true);
    expect(canTransition('interrupted', 'failed')).toBe(true);
    expect(() => assertTransition('running', 'interrupted')).not.toThrow();
  });

  it('rejects interrupted => queued and awaiting_hitl => interrupted', () => {
    expect(canTransition('interrupted', 'queued')).toBe(false);
    expect(canTransition('awaiting_hitl', 'interrupted')).toBe(false);
    expect(() => assertTransition('interrupted', 'queued')).toThrow(
      DomainException,
    );
    expect(() =>
      assertTransition('awaiting_hitl', 'interrupted'),
    ).toThrow(DomainException);
  });
```

Na górze pliku dopisz import:

**teraz:**

```typescript
import { assertTransition, canTransition } from './status-transitions';
import { DomainException } from '../../shared/exceptions/domain.exception';
```

**zamień na:**

```typescript
import { RUN_STATUSES, isRunStatus } from '@content-chain/shared';
import { assertTransition, canTransition } from './status-transitions';
import { DomainException } from '../../shared/exceptions/domain.exception';
```

#### Implementacja — filtr listy (e2e)

W `apps/api/test/runs-list.e2e-spec.ts` dopisz `it` w tym samym `describe` (po `app.init` worker nie dowie się o ręcznie wstawionym wierszu — brak `notifyQueued`, drain nie wstaje sam):

```typescript
  it('accepts status=interrupted on GET /api/v1/runs and returns the seeded row', async () => {
    const interruptedId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: interruptedId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'interrupted',
        brief: { topic: 'recovery-filter' },
        recoveryAttempts: 1,
      },
    });

    const listed = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ page: 1, status: 'interrupted' })
      .expect(200);

    expect(
      (listed.body.items as ListRunItem[]).some(
        (item) => item.runId === interruptedId && item.status === 'interrupted',
      ),
    ).toBe(true);

    const rejected = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ status: 'not-a-status' })
      .expect(400);
    expect(rejected.body.code).toBe('VALIDATION_FAILED');
  });
```

Import `randomUUID` z `node:crypto` na górze pliku (obok istniejących importów).

**Biblioteki / API:** brak nowego API Nest/Prisma w tym kroku. `class-validator` `@IsIn([...RUN_STATUSES])` już jest na DTO.

**Testy:** domain jak wyżej; e2e filtra; suite shared nie istnieje — nie dodawać Jest do `packages/shared`.

**DoD kroku:**

- `isRunStatus('interrupted') === true`; `RUN_STATUSES` zawiera `interrupted`.
- `assertTransition('interrupted', 'queued')` oraz `assertTransition('awaiting_hitl', 'interrupted')` → `DomainException` `CONFLICT` 409.
- `GET /api/v1/runs?status=interrupted` → 200 z wierszem; `status=not-a-status` → 400 `VALIDATION_FAILED`.
- Brak migracji Prisma.

---

### KROK 2 — Recovery boot, claim i drain pod capem

**Status:** `WYKONANY`

**Cel:** Recovery ustawia stan (`running → interrupted` / `failed`), worker **nie** startuje leftover execute naraz. Claim `interrupted → running` analogicznie do `queued`, pod `MAX_CONCURRENT_RUNS`, z priorytetem w drain. SSE `run.status` przy przejściach do/z `interrupted`. Major 7.2; `SPEC-RUNY.md` R-6 / R-9; `docs/data_flow.md`.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.ts`
- Zmiana: `apps/api/src/runs/application/in-process-run.worker.ts`
- Zmiana (kompilacja fake’ów portu): `unusedRepo` w `start-run.use-case.spec.ts`, `in-process-run.worker.spec.ts`, `recover-interrupted-runs.use-case.spec.ts`
- Zmiana: `recover-interrupted-runs.use-case.spec.ts` — scenariusze, które po zmianie zachowania stałyby się czerwone
- Zmiana: istniejące testy drain w `in-process-run.worker.spec.ts` — mock `claimNextInterrupted` → `null` (inaczej drain rzuci zanim zawoła `claimNextQueued`)
- Bez zmiany zachowania: `resume-hitl.use-case.ts`, `notifyHitlResumed` / `scheduleExistingRunning`

**Kolejność:** port → adapter → `unusedRepo` (TS) → recovery use-case + jego spec → worker + poprawki mocków drain.

#### Implementacja — port `RunRepository`

W `apps/api/src/runs/domain/run.port.ts`, w interfejsie, obok `claimNextQueued`:

**teraz:**

```typescript
  claimNextQueued(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
```

**zamień na:**

```typescript
  claimNextQueued(): Promise<RunRecord | null>;
  claimNextInterrupted(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
```

`findInterruptedRunning` **zostaje** (leftover `status = running` na bootcie). Nie rozszerzać go o wiersze już `interrupted` — te wracają do pompy bez inkrementu (R-9 pkt 2).

We **wszystkich** `unusedRepo` dopisz linię (to samo miejsce co `claimNextQueued`):

```typescript
    claimNextInterrupted: unexpected,
```

#### Implementacja — `PrismaRunAdapter.claimNextInterrupted`

W `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` wstaw **zaraz po** `claimNextQueued` (kopia wzorca, inny status źródłowy):

```typescript
  async claimNextInterrupted(): Promise<RunRecord | null> {
    const next = await this.prisma.run.findFirst({
      where: { status: 'interrupted' },
      orderBy: { createdAt: 'asc' },
    });
    if (!next) return null;
    assertTransition(next.status as RunStatus, 'running');
    const claimed = await this.prisma.run.updateMany({
      where: { id: next.id, status: 'interrupted' },
      data: { status: 'running' },
    });
    if (claimed.count !== 1) {
      return this.claimNextInterrupted();
    }
    return this.toSnapshot({ ...next, status: 'running', startedBy: null });
  }
```

`findInterruptedRunning` bez zmian (`where: { status: 'running' }`).

SSE przy claimie: jak przy `queued` — **nie** w adapterze; `executeClaimed` workera publikuje `run.status` / `running`.

#### Implementacja — `RecoverInterruptedRunsUseCase`

Plik jest krótki — zastąp ciało `execute` i sygnaturę zwrotki (`Promise<void>`: worker nie dostaje listy do burstu).

**teraz** (cała klasa poza importami / stałą):

```typescript
  async execute(): Promise<RunRecord[]> {
    const interrupted = await this.runs.findInterruptedRunning();
    const resume: RunRecord[] = [];
    for (const run of interrupted) {
      if (
        run.recoveryAttempts >= RECOVERY_CAP ||
        !isRetryable({ kind: 'process_crash' })
      ) {
        await this.lifeCycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: 'recovery exhausted after process interrupt',
          step: 'recovery',
        });
        await this.lifeCycle.transition(run, 'failed', {
          failedMessage: 'recovery exhauster after process interrupt',
        });
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      resume.push({ ...run, recoveryAttempts: run.recoveryAttempts + 1 });
    }
    return resume;
  }
```

**zamień na:**

```typescript
  async execute(): Promise<void> {
    const leftoverRunning = await this.runs.findInterruptedRunning();
    for (const run of leftoverRunning) {
      if (
        run.recoveryAttempts >= RECOVERY_CAP ||
        !isRetryable({ kind: 'process_crash' })
      ) {
        await this.lifeCycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: 'recovery exhausted after process interrupt',
          step: 'recovery',
        });
        await this.lifeCycle.transition(run, 'failed', {
          failedMessage: 'recovery exhausted after process interrupt',
        });
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      await this.lifeCycle.transition(run, 'interrupted');
    }
  }
```

Usuń nieużywany import typu `RunRecord`, jeśli nic innego w pliku go nie używa.

Semantyka capu **bez zmian względem obecnych testów:** `recoveryAttempts >= 3` na leftover `running` → `failed` + log, bez inkrementu i bez execute. Poniżej capu: `recoveryAttempts++`, potem `running → interrupted` (SSE przez `RunLifecycleService.transition`). Leftover już `interrupted` nie wchodzi do tej pętli.

Kolejność zapisów: inkrement, potem `transition`. Dwa round-tripy Prisma; boot jest sekwencyjny w jednym procesie MVP — bez nowej metody atomowej.

#### Implementacja — recovery spec (żeby suite nie padł po zmianie zwrotki)

`RecoverInterruptedRunsUseCase.length === 2` zostaje.

**teraz** (cap 3): `const resume = await useCase.execute(); expect(resume).toEqual([]);`

**zamień na:** `await useCase.execute();` + te same asercje `appendLog` / `transition(..., 'failed', ...)`. Popraw `failedMessage` w evencie na `'recovery exhausted after process interrupt'` (albo zostaw `expect.any(String)` jak dziś).

**teraz** (under cap — „returns the run … status running”):

```typescript
    const resume = await useCase.execute();

    expect(saveRecoveryAttempt).toHaveBeenCalledTimes(1);
    expect(saveRecoveryAttempt).toHaveBeenCalledWith(interrupted.id, 1);
    expect(resume).toEqual([
      expect.objectContaining({
        id: interrupted.id,
        status: 'running',
        recoveryAttempts: 1,
      }),
    ]);
    expect(appendLog).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
```

**zamień na:**

```typescript
    await useCase.execute();

    expect(saveRecoveryAttempt).toHaveBeenCalledTimes(1);
    expect(saveRecoveryAttempt).toHaveBeenCalledWith(interrupted.id, 1);
    expect(transition).toHaveBeenCalledWith(interrupted, 'interrupted');
    expect(appendLog).not.toHaveBeenCalled();
```

Case `awaiting_hitl`: `expect(resume).toHaveLength(1)` → `await useCase.execute()` i asercja `transition` tylko dla leftover `running` (`to: 'interrupted'`), HITL nietknięty.

#### Implementacja — `InProcessRunWorker`

**teraz** (`onModuleInit`):

```typescript
  async onModuleInit() {
    const resume = await this.recover.execute();
    for (const run of resume) {
      this.scheduleExistingRunning(run);
    }
    this.enqueuePump();
  }
```

**zamień na:**

```typescript
  async onModuleInit() {
    await this.recover.execute();
    this.enqueuePump();
  }
```

**teraz** (`drain`):

```typescript
  private async drain(): Promise<void> {
    while (this.inFlight < this.env.MAX_CONCURRENT_RUNS) {
      const claimed = await this.runs.claimNextQueued();
      if (!claimed) return;
      this.inFlight += 1;
      void this.executeClaimed(claimed).finally(() => {
        this.inFlight -= 1;
        this.enqueuePump();
      });
    }
  }
```

**zamień na:**

```typescript
  private async drain(): Promise<void> {
    while (this.inFlight < this.env.MAX_CONCURRENT_RUNS) {
      const claimed =
        (await this.runs.claimNextInterrupted()) ??
        (await this.runs.claimNextQueued());
      if (!claimed) return;
      this.inFlight += 1;
      void this.executeClaimed(claimed).finally(() => {
        this.inFlight -= 1;
        this.enqueuePump();
      });
    }
  }
```

`scheduleExistingRunning` **zostaje** — wyłącznie HITL. `executeClaimed` już emituje SSE `running` (wyjście z `interrupted` i z `queued`).

#### Implementacja — istniejące testy drain workera

W trzech scenariuszach, które mockują `claimNextQueued` i oczekują claimu kolejki, dopisz w tym samym `unusedRepo({...})`:

```typescript
      claimNextInterrupted: async () => null,
```

Dotyczy m.in.:

- `serializes pump so two notifyQueued at MAX=1 …`
- `starts HITL resume execute even when inflight is already at MAX`
- `starts HITL execute while drain is blocked in claimNextQueued …`

Bez tego `drain` woła `claimNextInterrupted` → `unexpected` → `.catch(() => undefined)` na `enqueuePump` i **queued nigdy nie startuje**.

Testy HITL-only (`notifyHitlResumed` + `getById`) mogą zostawić `unexpected`: po `finally` drain znowu łyka błąd jak dziś przy `claimNextQueued`. Nie przepisywać ich na recovery.

**Biblioteki / API:**

- Prisma 6 `findFirst({ where, orderBy })` + `updateMany({ where: { id, status }, data: { status: 'running' } })`; wartownik = `count === 1` (istniejący wzorzec queued; Context7 `/prisma/prisma`).
- NestJS 11 `OnModuleInit.onModuleInit` — recovery, potem `enqueuePump`; bez pętli `scheduleExistingRunning`.

**Testy (w tym kroku):** poprawki kompilacji / zielonego suite po zmianie zwrotki recovery i mocków drain. Nowe D-9b / D-10 (no-burst, leftover już `interrupted`) → KROK 3.

**DoD kroku:**

- `onModuleInit`: `recover.execute()` przed pierwszym claimem; zero `scheduleExistingRunning` z wyniku recovery.
- Claim `interrupted → running`: `assertTransition` + `updateMany` ze statusem źródłowym `interrupted`.
- Drain przy wolnym slocie: najpierw `interrupted`, potem FIFO `queued`.
- `recoveryAttempts++` tylko ze ścieżki leftover `running`; cap 3 → `failed` + log, bez execute.
- SSE: `running → interrupted` przez `lifecycle.transition`; `interrupted → running` przez `executeClaimed`.
- HITL nadal omija cap.

---

### KROK 3 — Testy kolejki i recovery (D-9 / D-9b / D-10)

**Status:** `WYKONANY`

**Cel:** Pokrycie `SPEC-TESTY.md` D-9, D-9b, D-10 na warstwie unit (worker / recovery). Burst HITL **nie** jest przepisywany na recovery. Major 7.3.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/in-process-run.worker.spec.ts` (nowe `it`)
- Zmiana: `apps/api/src/runs/application/recover-interrupted-runs.use-case.spec.ts` (leftover już `interrupted`)
- Bez zmiany kodu produkcyjnego (chyba że test ujawni regresję KROK 2 — wtedy poprawka w KROK 2, nie „cichy” nowy mechanizm).
- Istniejący e2e D-9: `apps/api/test/runs-lifecycle.e2e-spec.ts` (`keeps the second run queued while MAX_CONCURRENT_RUNS=1 …`) — **zostaje**; po KROK 2 musi nadal przechodzić (dodać `claimNextInterrupted` nie dotyczy e2e — idzie przez prawdziwy adapter).

#### D-9

Nie dodawać drugiego e2e. Po KROK 2 odpal `runs-lifecycle.e2e-spec.ts` (cap `MAX=1`). Regeneracja: drugi POST zostaje `queued`, po zwolnieniu slotu `running`.

#### D-9b — drain: dwa `interrupted` + jeden `queued`, `MAX=1`

Dopisz w `in-process-run.worker.spec.ts` (te same helpery `makeRun` / `deferred` / `waitUntil` / `unusedRepo`):

```typescript
  it('D-9b: at MAX=1 executes two interrupted before one queued', async () => {
    const firstInterrupted = makeRun({ status: 'interrupted' });
    const secondInterrupted = makeRun({ status: 'interrupted' });
    const queued = makeRun({ status: 'queued' });
    const interruptedQueue = [firstInterrupted, secondInterrupted];
    const queuedQueue = [queued];
    const holdFirst = deferred();
    const started: string[] = [];

    const runs = unusedRepo({
      claimNextInterrupted: async () => {
        const next = interruptedQueue.shift();
        return next ? { ...next, status: 'running' } : null;
      },
      claimNextQueued: async () => {
        const next = queuedQueue.shift();
        return next ? { ...next, status: 'running' } : null;
      },
    });

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      {
        async execute(run) {
          started.push(run.id);
          if (started.length === 1) {
            await holdFirst.promise;
          }
        },
      },
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      { execute: async () => undefined } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    worker.notifyQueued();

    await waitUntil(() => started.length === 1, 'first interrupted execute');
    expect(started).toEqual([firstInterrupted.id]);

    holdFirst.resolve();
    await waitUntil(
      () => started.length === 3,
      'second interrupted then queued',
    );
    expect(started).toEqual([
      firstInterrupted.id,
      secondInterrupted.id,
      queued.id,
    ]);
  });
```

`RecoverInterruptedRunsUseCase.execute` w mocku workera: `async () => undefined` (zwrotka `void`). Istniejące casty `{ execute: async () => [] }` **zamień na** `{ execute: async () => undefined }` w całym pliku (zgodność z KROK 2).

#### D-10 — recovery: leftover `running` → `interrupted`; cap; leftover już `interrupted`; brak burstu

**1. Leftover już `interrupted` — bez inkrementu** (recovery spec):

```typescript
  it('does not increment recoveryAttempts for leftover already interrupted', async () => {
    const leftoverInterrupted = makeRun({
      status: 'interrupted',
      recoveryAttempts: 1,
    });
    const leftoverRunning = makeRun({
      status: 'running',
      recoveryAttempts: 0,
    });
    const saveRecoveryAttempt = jest.fn();
    const transition = jest.fn(
      async (run: RunRecord, to: RunRecord['status']) => ({
        ...run,
        status: to,
      }),
    );

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findInterruptedRunning: async () => [leftoverRunning],
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(saveRecoveryAttempt).toHaveBeenCalledWith(leftoverRunning.id, 1);
    expect(saveRecoveryAttempt).not.toHaveBeenCalledWith(
      leftoverInterrupted.id,
      expect.anything(),
    );
    expect(leftoverInterrupted.recoveryAttempts).toBe(1);
    expect(transition).toHaveBeenCalledWith(leftoverRunning, 'interrupted');
    expect(transition).not.toHaveBeenCalledWith(
      leftoverInterrupted,
      expect.anything(),
    );
  });
```

Repozytorium na bootcie **nie** zwraca wierszy `interrupted` — kontrakt R-9 pkt 2. Test dokumentuje, że inkrement nie idzie „na ślepo” po wszystkich runach.

**2. 3× przerwany execute → `failed` + log:** istniejący test capu 3 w recovery spec (po KROK 2: `transition(..., 'failed')`, `appendLog`, bez `saveRecoveryAttempt`). Nie duplikować.

**3. Brak burstu na bootcie, `MAX=1`, dwa leftover `interrupted`** (worker spec) — D-10 cap claimu. Pierwszy `claimNextInterrupted` asercjuje, że recovery już się wykonało; przy trzymanym pierwszym execute `started.length === 1` = brak burstu:

```typescript
  it('D-10: onModuleInit recovers before drain and does not burst interrupted execute beyond MAX', async () => {
    const recoverExecute = jest.fn(async () => undefined);
    const first = makeRun({ status: 'interrupted' });
    const second = makeRun({ status: 'interrupted' });
    const pending = [first, second];
    const holdFirst = deferred();
    const started: string[] = [];

    const runs = unusedRepo({
      claimNextInterrupted: async () => {
        expect(recoverExecute).toHaveBeenCalled();
        const next = pending.shift();
        return next ? { ...next, status: 'running' } : null;
      },
      claimNextQueued: async () => null,
    });

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      {
        async execute(run) {
          started.push(run.id);
          if (started.length === 1) {
            await holdFirst.promise;
          }
        },
      },
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      { execute: recoverExecute } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    await worker.onModuleInit();
    await waitUntil(() => started.length === 1, 'first recovered execute');
    expect(started).toEqual([first.id]);

    holdFirst.resolve();
    await waitUntil(() => started.length === 2, 'second after slot frees');
    expect(started).toEqual([first.id, second.id]);
    expect(recoverExecute).toHaveBeenCalledTimes(1);
  });
```

**HITL:** trzy istniejące testy (`starts HITL resume execute even when inflight is already at MAX`, blocked `claimNextQueued`, serializacja pump) **zostają**. Zakaz: nie zmieniać ich asercji tak, by HITL czekał na slot recovery.

**Biblioteki / API:** Jest 30 (`apps/api/package.json`) — `waitUntil` + `deferred` jak w istniejącym specu workera. Bez live HTTP w D-9b / D-10 unit.

**DoD kroku:**

- D-9 e2e zielone.
- D-9b: kolejność execute `interrupted`, `interrupted`, `queued` przy `MAX=1`.
- D-10: leftover `running` → `interrupted` (KROK 2 spec); leftover już `interrupted` bez inkrementu; cap 3 → `failed` + log; boot nie burstuje ponad `MAX`.
- Testy HITL ponad cap **nie** są przepięte na recovery.

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica major 7.1–7.3 | Enum + graf; recovery/claim/drain; D-9 / D-9b / D-10 |
| `SPEC-RUNY.md` R-6 / R-9 | Claim obu źródeł pod capem; brak burstu leftover `running`; HITL poza capem |
| `SPEC-TESTY.md` | D-9 e2e; D-9b + D-10 unit |
| `SPEC-PERSISTENCE.md` P-7 | Brak migracji; `status` nadal `String` |
| `POST /runs` | Nadal tylko `queued` \| `running` (start-run bez zmian) |
| Kompletność HOW | Nowe metody z pełnym kodem; refaktory jako `teraz → zamień na` |
| Nagłówki | wyłącznie `FAZA 1` / `KROK 1|2|3` |
| Sekrety | brak |

**Świadomie poza wycinkiem:** implementacja węzłów Social (Faza 4) — model B re-invoke po powrocie do `running` zostaje na executorze stub / przyszłym grafie; Runs tylko wznawia `execute` po claimie.

---

## Ślad do major (informacyjnie, po implementacji)

Ten skill **nie** edytuje `content-chain-backend_major_plan.md`.

Po spełnieniu DoD Fazy 7 w kodzie i testach (osobna sesja, np. ręczne `/feature-implementation`):

| Element major | Docelowy status |
|---------------|-----------------|
| Faza 7 | `WYKONANY` |
| Krok 7.1 | `WYKONANY` |
| Krok 7.2 | `WYKONANY` |
| Krok 7.3 | `WYKONANY` |
| Milestone 7 | nie istnieje — nic nie oznaczać |
| Faza 4 | nadal `NIE_ROZPOCZĘTY` (odblokowana do startu dopiero gdy Faza 7 jest `WYKONANY`) |

---

## Pass rozwojowy (sesja planu)

Przegląd od końca: KROK 3 używa `claimNextInterrupted`, `recover.execute(): Promise<void>` i krawędzi `interrupted`. To powstaje w KROK 1–2. Mock `claimNextInterrupted` w istniejących testach drain jest w KROK 2 (inaczej suite czerwony przed D-9b).

**Brak przesunięć** względem major 7.1 → 7.2 → 7.3.
