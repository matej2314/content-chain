# Content Chain — feature plan: koniec strumienia SSE i evikcja huba

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-8-sse-complete.md`  
**Kotwica major:** Faza 8 (cała) — kroki 8.1, 8.2, 8.3. Refaktor względem Fazy 3 / Kroku 3.2 (`WYKONANY`) — `InMemoryRunSseHub`, `RunsController.events`, `RunLifecycleService.publish`; oraz Fazy 7 / Kroku 7.2 (`WYKONANY`) — SSE `run.status` przy `interrupted` **zostaje** (stream nie kończy się na `interrupted` / `awaiting_hitl`).  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`, `docs/anty_patterny.md`, `SPEC-KOMUNIKACJA.md` K-3a, `SPEC-RUNY.md` R-4a, `SPEC-FRONTEND.md` F-5a (tylko norma serwera; UI poza wycinkiem), `SPEC-TESTY.md` D-14.  
**Kolejność `KROK` w tym pliku = numeracja major 8.1 → 8.2 → 8.3** (pass rozwojowy bez przesunięć).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 8 majoru: `complete` subjectu SSE + evikcja mapy po `completed`/`failed`; late-join na skończonym runie zamyka stream |
| Major | Faza 8 / kroki 8.1–8.3; start **po Fazie 7** (`WYKONANY`), **przed Fazą 4** |
| Poza zakresem | UI `EventSource` (F-5a / major FE), Faza 4 (pipeline Social), auth cookie na SSE (Faza 5), Redis/bus SSE, tombstone Set wszystkich skończonych `runId` |
| Po implementacji (informacyjnie) | Major: Faza 8 i kroki 8.1–8.3 → `WYKONANY`. Brak `MILESTONE` 8. Edycja major **poza** tym skillem |

**Pliki (8):** cztery produkcyjne + cztery testowe (dwa nowe). Worker, `runs.module.ts` i mocki `in-process-run.worker.spec.ts` bez zmian — `complete` idzie wyłącznie przez lifecycle.

---

## Założenia

- Stack bez zmian: NestJS 11 `@Sse()`, RxJS 7 (`Subject`, `of`, `startWith`), Jest 30, supertest 7. Kontrakt eventów SSE bez zmian.
- Terminal runu = wyłącznie `completed` \| `failed`. `awaiting_hitl` i `interrupted` są żywe — hub zostaje (Faza 7 / R-4a / K-3a).
- Disconnect klienta (Nest unsubscribe przy zerwaniu HTTP) **nie** woła `complete` i **nie** usuwa subjectu żyjącego runu. RxJS `Subject` nie kończy się, gdy ostatni subscriber zniknie — to zachowanie zostaje.
- Brak tombstone `Set<RunId>`: też rósłby z procesem. Strażnikiem late-join jest warstwa HTTP (`of(snapshot)` bez `subscribe`) — `SPEC-KOMUNIKACJA.md` K-3a.
- `publish` **nie** alokuje subjectu: `next` tylko gdy wpis już jest (po `subscribe`). Po `complete` mapa pusta → `publish` = no-op („nie ożywia wiecznego subjectu”, major 8.1).
- Kolejność w `transition`: logi i `run.status` / `run.completed`\|`run.failed` **przed** `complete(runId)`. Worker i `appendLog` bez zmiany semantyki.
- UI F-5a (`EventSource.close()`, brak otwarcia SSE przy terminalnym GET) — major frontendowy; tu tylko serwer, żeby pętla reconnect przeglądarki nie miała wiecznego socketa.

**Biblioteki (Context7 `/nestjs/docs.nestjs.com`, NestJS 11):** handler `@Sse()` zwraca `Observable<MessageEvent>`. Complete Observable → Nest zamyka response HTTP. Disconnect klienta → Nest unsubscribe (teardown `finalize` / abort) — to **nie** jest sygnał do `subject.complete()` na hubie żyjącego runu.

---

## FAZA 1 — Refaktor SSE: koniec strumienia i evikcja huba

Odpowiada major **Faza 8**. Jedna faza w tym zestawie.

---

### KROK 1 — Port i `InMemoryRunSseHub`: `complete` + evikcja

**Status:** `WYKONANY`

**Cel:** Port eksportuje `complete(runId)`; hub kończy subject, usuwa wpis, drugi `complete` = no-op; `publish` po evikcji nie tworzy subjectu. Major 8.1; `SPEC-RUNY.md` R-4a; `docs/anty_patterny.md` (mapa Subject bez evikcji).

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run-sse.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/run-sse.hub.ts`
- Nowy: `apps/api/src/runs/infrastructure/run-sse.hub.spec.ts`
- Bez zmiany: `runs.module.ts` (nadal `useClass: InMemoryRunSseHub`)

**Kolejność:** port → hub → unit huba (bez HTTP).

#### Implementacja — `apps/api/src/runs/domain/run-sse.port.ts`

**teraz:**

```typescript
export interface RunSseHub {
  subscribe(runId: RunId): Observable<RunSseEvent>;
  publish(event: RunSseEvent): void;
}
```

**zamień na:**

```typescript
export interface RunSseHub {
  subscribe(runId: RunId): Observable<RunSseEvent>;
  publish(event: RunSseEvent): void;
  complete(runId: RunId): void;
}
```

Typ `RunSseEvent` i token `RUN_SSE_HUB` bez zmian.

#### Implementacja — `apps/api/src/runs/infrastructure/run-sse.hub.ts`

**teraz** (`publish` + `subjectFor`):

```typescript
  publish(event: RunSseEvent): void {
    this.subjectFor(event.data.runId).next(event);
  }

  private subjectFor(runId: RunId): Subject<RunSseEvent> {
    const key = createRunId(runId);
    let subject = this.subjects.get(key);
    if (!subject) {
      subject = new Subject<RunSseEvent>();
      this.subjects.set(key, subject);
    }
    return subject;
  }
```

**zamień na** (cały plik po zmianie):

```typescript
import { Injectable } from '@nestjs/common';
import { Subject, type Observable } from 'rxjs';
import { createRunId, type RunId } from '@content-chain/shared';
import type { RunSseEvent, RunSseHub } from '../domain/run-sse.port';

@Injectable()
export class InMemoryRunSseHub implements RunSseHub {
  private readonly subjects = new Map<RunId, Subject<RunSseEvent>>();

  subscribe(runId: RunId): Observable<RunSseEvent> {
    return this.subjectFor(runId).asObservable();
  }

  publish(event: RunSseEvent): void {
    const subject = this.subjects.get(createRunId(event.data.runId));
    if (!subject) {
      return;
    }
    subject.next(event);
  }

  complete(runId: RunId): void {
    const key = createRunId(runId);
    const subject = this.subjects.get(key);
    if (!subject) {
      return;
    }
    this.subjects.delete(key);
    subject.complete();
  }

  /** Test / diagnostyka evikcji — nie część portu HTTP. */
  has(runId: RunId): boolean {
    return this.subjects.has(createRunId(runId));
  }

  private subjectFor(runId: RunId): Subject<RunSseEvent> {
    const key = createRunId(runId);
    let subject = this.subjects.get(key);
    if (!subject) {
      subject = new Subject<RunSseEvent>();
      this.subjects.set(key, subject);
    }
    return subject;
  }
}
```

`subscribe` nadal alokuje (żywy run / live SSE). `publish` i `complete` nie alokują.

#### Implementacja — nowy `apps/api/src/runs/infrastructure/run-sse.hub.spec.ts`

```typescript
import { firstValueFrom, toArray } from 'rxjs';
import { newRunId } from '../../shared/http/new-ids';
import { InMemoryRunSseHub } from './run-sse.hub';

describe('InMemoryRunSseHub', () => {
  it('complete emits to subscriber, deletes the map entry, and is idempotent', async () => {
    const hub = new InMemoryRunSseHub();
    const runId = newRunId();
    const seen = firstValueFrom(hub.subscribe(runId).pipe(toArray()));

    hub.publish({
      event: 'run.status',
      data: { runId, status: 'running' },
    });
    expect(hub.has(runId)).toBe(true);

    hub.complete(runId);
    hub.complete(runId);

    await expect(seen).resolves.toEqual([
      { event: 'run.status', data: { runId, status: 'running' } },
    ]);
    expect(hub.has(runId)).toBe(false);
  });

  it('publish after complete does not recreate a subject', () => {
    const hub = new InMemoryRunSseHub();
    const runId = newRunId();
    hub.subscribe(runId).subscribe();
    hub.complete(runId);
    expect(hub.has(runId)).toBe(false);

    hub.publish({
      event: 'run.status',
      data: { runId, status: 'completed' },
    });
    expect(hub.has(runId)).toBe(false);
  });

  it('unsubscribe of a client does not evict a living subject', () => {
    const hub = new InMemoryRunSseHub();
    const runId = newRunId();
    const sub = hub.subscribe(runId).subscribe();
    expect(hub.has(runId)).toBe(true);
    sub.unsubscribe();
    expect(hub.has(runId)).toBe(true);
  });
});
```

**Biblioteki / API:** RxJS 7 `Subject.complete()` powiadamia subscriberów i ustawia `isStopped`; drugi `complete` na tym samym `Subject` jest no-op, ale hub i tak najpierw `delete` — drugi `complete(runId)` nie znajduje wpisu. NestJS nie jest używany w tym specu.

**Testy:** wyłącznie unit huba (powyższy plik). Bez HTTP.

**DoD kroku:**

- Interfejs `RunSseHub` eksportuje `complete(runId)`.
- Po `complete` `has(runId) === false`; drugi `complete` = no-op.
- `publish` po `complete` nie wstawia wpisu.
- Disconnect (`unsubscribe`) nie usuwa subjectu.
- `pnpm --filter api test -- run-sse.hub.spec` zielone.

---

### KROK 2 — Lifecycle i late-join HTTP

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Transition do `completed`/`failed` kończy hub **po** evencie terminalnym. `awaiting_hitl` / `interrupted` nie wołają `complete`. Late-join na skończonym runie: `of(run.status)` i complete Observable — **bez** `subscribe` (brak wiecznego subjectu). Major 8.2; `SPEC-KOMUNIKACJA.md` K-3a; `docs/dokumentacja_komunikacji.md` (koniec strumienia).

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.ts`
- Zmiana: `apps/api/src/runs/runs.controller.ts`
- Bez zmiany: `in-process-run.worker.ts` (`appendLog` + `transition('failed')` już idą przez lifecycle; `executeClaimed` nadal tylko `publish(run.status=running)`)
- Bez zmiany: `stub-run.executor.ts` (już `appendLog` potem `transition(..., 'completed')`)

**Kolejność:** lifecycle `complete` po terminalu → controller late-join (inaczej e2e D-14 w KROK 3 nie ma obu połówek).

#### Implementacja — `apps/api/src/runs/application/run-lifecycle.service.ts`

**teraz** (fragment `transition` po `saveStatus` / `run.status`):

```typescript
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: to },
    });
    if (to === 'completed') {
      this.sseHub.publish({
        event: 'run.completed',
        data: { runId: run.id, resultSummary: extras?.resultSummary },
      });
    }
    if (to === 'failed') {
      this.sseHub.publish({
        event: 'run.failed',
        data: {
          runId: run.id,
          code: extras?.failedCode,
          message: extras?.failedMessage ?? 'run failed',
        },
      });
    }
    return { ...run, status: to };
```

**zamień na:**

```typescript
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: to },
    });
    if (to === 'completed') {
      this.sseHub.publish({
        event: 'run.completed',
        data: { runId: run.id, resultSummary: extras?.resultSummary },
      });
      this.sseHub.complete(run.id);
    }
    if (to === 'failed') {
      this.sseHub.publish({
        event: 'run.failed',
        data: {
          runId: run.id,
          code: extras?.failedCode,
          message: extras?.failedMessage ?? 'run failed',
        },
      });
      this.sseHub.complete(run.id);
    }
    return { ...run, status: to };
```

`appendLog` bez zmian. Recovery cap → `failed` (Faza 7) automatycznie zamknie hub; `interrupted` nie wejdzie w te `if`.

#### Implementacja — `apps/api/src/runs/runs.controller.ts`

**teraz** (import + `events`):

```typescript
import { map, Observable, startWith } from 'rxjs';
```

```typescript
  @Sse(':runId/events')
  async events(
    @Param('runId', ParseRunIdPipe) runId: RunId,
  ): Promise<Observable<MessageEvent>> {
    const snapshot = await this.getRun.execute(runId);
    const snapshotEvent: RunSseEvent = {
      event: 'run.status',
      data: { runId, status: snapshot.status },
    };
    return this.sse.subscribe(runId).pipe(
      startWith(snapshotEvent),
      map((event) => ({ type: event.event, data: event.data })),
    );
  }
```

**zamień na:**

```typescript
import { map, Observable, of, startWith } from 'rxjs';
```

```typescript
  @Sse(':runId/events')
  async events(
    @Param('runId', ParseRunIdPipe) runId: RunId,
  ): Promise<Observable<MessageEvent>> {
    const snapshot = await this.getRun.execute(runId);
    const snapshotEvent: RunSseEvent = {
      event: 'run.status',
      data: { runId, status: snapshot.status },
    };
    const toMessage = (event: RunSseEvent): MessageEvent => ({
      type: event.event,
      data: event.data,
    });
    if (snapshot.status === 'completed' || snapshot.status === 'failed') {
      return of(toMessage(snapshotEvent));
    }
    return this.sse.subscribe(runId).pipe(
      startWith(snapshotEvent),
      map(toMessage),
    );
  }
```

Late-join emituje **co najmniej** `run.status` (K-3a) — bez syntetycznego `run.completed` / `run.failed`. `of(...)` kończy Observable → Nest zamyka HTTP.

**Biblioteki / API:** NestJS 11 `@Sse()` — complete streamu zamyka `text/event-stream`. `of` (RxJS 7) emituje jedną wartość i complete. Handler już jest `async` → `Promise<Observable<…>>` (jak dziś).

**Testy:** w KROK 3 (zależą od obu zmian).

**DoD kroku:**

- `transition` do `completed`/`failed` woła `complete` po evencie terminalnym.
- `transition` do `awaiting_hitl` / `interrupted` nie woła `complete`.
- Snapshot terminalny nie woła `sse.subscribe`.
- Worker / `appendLog`: ta sama kolejność (logi, potem terminal + `complete` przez `transition`).

---

### KROK 3 — Testy D-14

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pokrycie `SPEC-TESTY.md` D-14. Refaktor względem testów controllera SSE i e2e lifecycle z Fazy 3 / Kroku 3.2 (`WYKONANY`) — e2e zrywa połączenie po pierwszym `run.status` i nie asertuje końca streamu. Major 8.3.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/run-lifecycle.service.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts`
- Zmiana: `apps/api/test/runs-lifecycle.e2e-spec.ts`
- Bez zmiany asercji: istniejący e2e `GET .../events emits run.status over SSE` (helper nadal niszczy socket po pierwszym evencie — to disconnect klienta, nie DoD końca streamu)

**Kolejność:** unit lifecycle → unit controllera → e2e late-join `end`.

#### Implementacja — nowy `apps/api/src/runs/application/run-lifecycle.service.spec.ts`

```typescript
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunRepository } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import type { RunSseHub } from '../domain/run-sse.port';
import { RunLifecycleService } from './run-lifecycle.service';

function makeRun(status: RunRecord['status'] = 'running'): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status,
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    recoveryAttempts: 0,
    createdAt: new Date(),
  };
}

describe('RunLifecycleService', () => {
  function setup() {
    const runs = {
      saveStatus: jest.fn().mockResolvedValue(undefined),
    } as unknown as RunRepository;
    const sseHub = {
      publish: jest.fn(),
      subscribe: jest.fn(),
      complete: jest.fn(),
    } as unknown as RunSseHub & {
      publish: jest.Mock;
      complete: jest.Mock;
    };
    const service = new RunLifecycleService(runs, sseHub);
    return { runs, sseHub, service };
  }

  it('calls complete only after completed or failed terminal events', async () => {
    const { sseHub, service } = setup();
    const run = makeRun('running');

    await service.transition(run, 'completed', { resultSummary: 'ok' });

    expect(sseHub.publish).toHaveBeenCalledWith({
      event: 'run.status',
      data: { runId: run.id, status: 'completed' },
    });
    expect(sseHub.publish).toHaveBeenCalledWith({
      event: 'run.completed',
      data: { runId: run.id, resultSummary: 'ok' },
    });
    expect(sseHub.complete).toHaveBeenCalledWith(run.id);
    const completeOrder = sseHub.complete.mock.invocationCallOrder[0];
    const failedOrCompletedOrder = sseHub.publish.mock.invocationCallOrder[1];
    expect(completeOrder).toBeGreaterThan(failedOrCompletedOrder);
  });

  it('calls complete after run.failed', async () => {
    const { sseHub, service } = setup();
    const run = makeRun('running');

    await service.transition(run, 'failed', { failedMessage: 'boom' });

    expect(sseHub.publish).toHaveBeenCalledWith(
      expect.objectContaining({ event: 'run.failed' }),
    );
    expect(sseHub.complete).toHaveBeenCalledWith(run.id);
  });

  it('does not complete on awaiting_hitl or interrupted', async () => {
    const hitl = setup();
    await hitl.service.transition(makeRun('running'), 'awaiting_hitl');
    expect(hitl.sseHub.complete).not.toHaveBeenCalled();

    const interrupted = setup();
    await interrupted.service.transition(makeRun('running'), 'interrupted');
    expect(interrupted.sseHub.complete).not.toHaveBeenCalled();
  });
});
```

#### Implementacja — `apps/api/src/runs/runs.controller.spec.ts`

Istniejący test `'emits current status then maps hub events to MessageEvent'` (snapshot `queued` + `subscribe`) **zostaje**.

Dopisz w tym samym `describe`:

```typescript
  it('on completed snapshot emits run.status and completes without subscribe', async () => {
    const runId = newRunId();
    getRun.execute.mockResolvedValue({
      runId,
      status: 'completed',
    });

    const stream = await controller.events(runId);
    const events = await firstValueFrom(stream.pipe(toArray()));

    expect(getRun.execute).toHaveBeenCalledWith(runId);
    expect(sse.subscribe).not.toHaveBeenCalled();
    expect(events).toEqual([
      { type: 'run.status', data: { runId, status: 'completed' } },
    ]);
  });

  it('on failed snapshot does not subscribe', async () => {
    const runId = newRunId();
    getRun.execute.mockResolvedValue({
      runId,
      status: 'failed',
    });

    const stream = await controller.events(runId);
    await firstValueFrom(stream.pipe(toArray()));

    expect(sse.subscribe).not.toHaveBeenCalled();
  });

  it('on interrupted snapshot still subscribes (stream stays live)', async () => {
    const runId = newRunId();
    getRun.execute.mockResolvedValue({
      runId,
      status: 'interrupted',
    });
    sse.subscribe.mockReturnValue(of());

    await controller.events(runId);

    expect(sse.subscribe).toHaveBeenCalledWith(runId);
  });
```

Import `toArray` już jest w pliku (`firstValueFrom, of, take, toArray`).

#### Implementacja — `apps/api/test/runs-lifecycle.e2e-spec.ts`

Obok `collectSseUntilStatusEvent` dopisz helper, który **nie** niszczy socketa po pierwszym evencie — czeka na naturalne `end`:

```typescript
async function collectSseUntilServerCloses(
  app: INestApplication,
  runId: string,
  timeoutMs = 4_000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = '';
    let settled = false;

    const finish = (error?: Error): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      incoming?.destroy();
      if (error) reject(error);
      else resolve(buffer);
    };

    const timer = setTimeout(() => {
      finish(
        new Error(
          `SSE timed out waiting for stream end. received: ${buffer}`,
        ),
      );
    }, timeoutMs);

    let incoming: IncomingMessage | undefined;

    request(app.getHttpServer())
      .get(`/api/v1/runs/${runId}/events`)
      .set('Accept', 'text/event-stream')
      .buffer(false)
      .parse((res, callback) => {
        incoming = res as unknown as IncomingMessage;
        res.setEncoding('utf8');
        res.on('data', (chunk: string) => {
          buffer += chunk;
        });
        res.on('end', () => {
          callback(null, buffer);
          finish();
        });
        res.on('error', (err: Error) => {
          callback(err, buffer);
          finish(err);
        });
      })
      .end((err) => {
        if (settled) return;
        if (err) {
          finish(err);
          return;
        }
        finish();
      });
  });
}
```

W `describe('stub executor')` dopisz **nowy** test (istniejący live `run.status` zostaje):

```typescript
    it('GET /api/v1/runs/:runId/events on a completed run emits run.status and ends (D-14)', async () => {
      await putCompleteContext(app);
      const created = await postRun(app);
      const runId = created.body.runId as string;
      await waitForRunStatus(app, runId, 'completed');

      const payload = await collectSseUntilServerCloses(app, runId);

      expect(payload).toContain('event: run.status');
      expect(payload).toContain(runId);
      expect(payload).toContain('completed');
    });
```

Timeout helpera = fail (wiszący socket). Sukces wymaga `res.on('end')` od Nest po `of(...).complete`.

**Biblioteki / API:** Jest + supertest (już w e2e). Nest zamyka response, gdy Observable SSE kończy się (Context7: complete streamu / unsubscribe przy disconnect — tu asertujemy **complete serwera**, nie destroy klienta).

**DoD kroku:**

- Unit: lifecycle woła `complete` tylko po `completed`/`failed`, po evencie terminalnym.
- Unit: controller przy snapshotcie terminalnym nie woła `subscribe`; przy `interrupted` woła.
- E2E: `GET .../events` na skończonym runie emituje `run.status` i kończy response bez timeoutu.
- Istniejący e2e live `run.status` nadal przechodzi.
- `pnpm --filter api test` oraz `pnpm --filter api test:e2e -- runs-lifecycle` zielone dla D-14.

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica major 8.1–8.3 | Port `complete`; hub evikcja; lifecycle + late-join; D-14 |
| `SPEC-RUNY.md` R-4a | Complete + delete tylko po `completed`/`failed`; HITL/`interrupted` bez `complete`; disconnect ≠ evikcja |
| `SPEC-KOMUNIKACJA.md` K-3a | Observable kończy się po terminalu; late-join: `run.status` + complete, bez wiecznego subjectu |
| `SPEC-TESTY.md` D-14 | Unit huba/lifecycle/controllera + e2e `end` |
| `docs/anty_patterny.md` | Brak mapy Subject bez evikcji po terminalu |
| `SPEC-FRONTEND.md` F-5a | Świadomie nieimplementowane (UI) — serwer i tak zamyka stream |
| Worker | Brak zmiany semantyki; stub: logi → `transition(completed)` → `complete` |
| Nagłówki | wyłącznie `FAZA 1` / `KROK 1\|2\|3` |
| Sekrety | brak |

**Świadomie poza wycinkiem:** `EventSource.close()` na FE; auth SSE cookie (Faza 5); Social nie emituje SSE z węzłów grafu (R-4 — bez zmian).

---

## Ślad do major (informacyjnie, po implementacji)

Ten skill **nie** edytuje `content-chain-backend_major_plan.md`.

Po spełnieniu DoD Fazy 8 w kodzie i testach (osobna sesja, np. ręczne `/feature-implementation`):

| Element major | Docelowy status |
|---------------|-----------------|
| Faza 8 | `WYKONANY` |
| Krok 8.1 | `WYKONANY` |
| Krok 8.2 | `WYKONANY` |
| Krok 8.3 | `WYKONANY` |
| Milestone 8 | nie istnieje — nic nie oznaczać |
| Faza 4 | nadal `NIE_ROZPOCZĘTY` (odblokowana po Fazie 7 **i** Fazie 8) |

---

## Pass rozwojowy (sesja planu)

Przegląd od końca: KROK 3 asertuje `complete()` na porcie, brak `subscribe` na terminalnym snapshotcie oraz HTTP `end`. Port/`complete` powstaje w KROK 1; wywołanie z lifecycle i gałąź `of(...)` w controllerze — w KROK 2. Unit huba zostaje w KROK 1 (DoD 8.1), nie przesuwany do KROK 3.

**Brak przesunięć** względem major 8.1 → 8.2 → 8.3.
