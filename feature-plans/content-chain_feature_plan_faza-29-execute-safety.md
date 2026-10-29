# Content Chain — feature plan: execute / safety V1 (Faza 29)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-29-execute-safety.md`  
**Kotwica major:** Faza 29 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 29).  
**Numer BE 29 ≠ FE 29** (paginacja UX). UX limitu per-user = `content-chain-frontend_major_plan.md` **Faza 30** (poza tym wycinkiem).  
**Źródła:** `docs/dictionary.md`, `docs/data_flow.md`, `docs/architektura.md`, `docs/dokumentacja_komunikacji.md`, `docs/security.md`, `SPEC-RUNY.md` R-6 / R-6a / R-11 / R-12, `SPEC-KOMUNIKACJA.md` K-2e / K-8, `SPEC-BEZPIECZENSTWO.md` B-11, `SPEC-TESTY.md` (bez nowych D-* w tym wycinku — jak Fazy 25–27), major Faza 29 / kroki 29.1–29.3.  
**Kolejność** `KROK`**:** env → admit COUNT → gateway disconnect→signal → api registry/cancel E2E → kotwica parseWithZod (bez zmian) → testy.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 29 majoru backend: limit per-user (`MAX_USER_IN_FLIGHT_RUNS` / **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED`); abort V1 api→gateway **bez nowych endpointów** (E2E na istniejącym `AbortSignal`); kotwica `parseWithZod` bez zmiany I/O (i bez zmian kodu gdy helper już zgodny) |
| Major | Faza 29; start po Fazach 1–28 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE między 28 a 29; **bez** MILESTONE 29 |
| Poza zakresem | Nowe trasy HTTP gateway / api „abort”; abort u vendora LLM poza haczykiem `signal` w gateway; panel mutacji capu (P0 / paczka E); cutover PostgreSQL; hub SSE Redis; major FE Faza 30; przepisywanie Fazy 12 / 4.3 / R-6 historycznych; nowe D-* w `SPEC-TESTY.md` |
| Po implementacji (informacyjnie) | Major: Faza 29 → `WYKONANY` (DoD gate + kod). Kroki 29.1–29.3 → `WYKONANY`. Brak `MILESTONE` 29. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 29.1 Limit per-user | FAZA 1 / KROK 1–2 | env + COUNT + `StartRunUseCase` |
| 29.2 Abort api→gateway | FAZA 1 / KROK 3–4 | gateway disconnect→signal; registry pending; E2E cancel |
| 29.3 Kotwica `parseWithZod` | FAZA 1 / KROK 5 | **bez zmian kodu** (helper już zgodny z I/O) |
| DoD / regresja | FAZA 1 / KROK 6 | unit + e2e / Postman bez nowych D-* |

**Pass rozwojowy (sesja planu):**

1. Env `MAX_USER_IN_FLIGHT_RUNS` **przed** admit w `StartRunUseCase`.
2. Port COUNT in-flight **przed** create Run.
3. Haczyk disconnect→`AbortSignal` w gateway **przed** asercjami E2E abort (KROK 3 → 4).
4. Poprawka `RunAbortRegistry` (cancel przed `begin`) **przed** testami race cancel.
5. `parseWithZod` — **brak zmian pliku**; tylko weryfikacja regresji w KROK 6.
6. Testy na końcu.
7. **Brak przesunięć między fazami major.** **Brak nowych endpointów.**

**Decyzje HOW (wywiad):**

- Abort V1 = domknięcie istniejącej ścieżki `CancelRunUseCase` → `RunAbortRegistry` → `fetch(..., { signal })` → gateway honoruje **to samo** `AbortSignal` z disconnect klienta HTTP (bez `POST .../abort`).
- `parseWithZod` pozostaje w obecnej formie.

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma 6, Zod 4 (`apps/api` + gateway), Node 22 (`AbortSignal` / `fetch` signal).
- Kolejność admit `POST /runs` (R-6a / `docs/data_flow.md` §2a): kompletność kontekstu → `GuestRunPolicy` (gdy guest) → **COUNT per-user** → create / enqueue pod `MAX_CONCURRENT_RUNS` (R-6 **bez regresji**).
- Statusy in-flight = `CANCELABLE_RUN_STATUSES` = `queued` \| `running` \| `interrupted` \| `awaiting_hitl` (tożsame z R-6a).
- Przekroczenie limitu → **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED` (**nie** ciche `queued`); kod guest quota **osobny**.
- Cancel HTTP: **200** bez await execute; idempotencja; authz bez zmian (R-11).
- Abort vendora: wyłącznie przez istniejący `signal` w `providerCallService.completeOnce` / adapterach — **poza** paczką gdy brak haczyka SDK.
- `tsconfig` **bez** zmian. Typy jawne na granicach; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Client disconnect / `AbortSignal` | Context7 `/nestjs/docs.nestjs.com` (SSE `@SseSignal`) | Nest dokumentuje abort przy disconnect; dla zwykłego POST Express: `req` `aborted` / `close` → własny `AbortController` | Helper `abortSignalFromIncomingMessage(req)` w gateway; **bez** nowej trasy |
| `fetch` + `signal` | Web API (Node 22); już w `LlmGatewayHttpAdapter` | Abort klienta zamyka request do gateway | Zostaje; gateway musi przerwać hop na disconnect |
| Prisma `count` | konwencja `countByUserAndType` | `where: { startedByUserId, status: { in: [...] } }` | Nowy `countInFlightByUser` |
| Zod `safeParse` / path | istniejący `parse-with-zod.ts` + unit | `issue.path.join('.')` → envelope | **Zero zmian** helpera |

---

## FAZA 1 — Execute / safety V1

Odpowiada major Faza 29 (kroki 29.1–29.3). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Env `MAX_USER_IN_FLIGHT_RUNS`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Walidowany env limitu per-user (default **3**). Major 29.1; `SPEC-RUNY.md` R-6a pkt 1; `docs/dictionary.md`.

**Artefakty:**

- Zmiana: `apps/api/src/shared/config/env.schema.ts`
- Zmiana: `apps/api/src/shared/config/env.schema.spec.ts`
- Zmiana: `apps/api/.env.example`
- Zmiana: `apps/api/test/setup-env.ts`
- (opcjonalnie DX) root `.env.example` jeśli trzyma sumę kluczy api — dopisz tę samą nazwę

#### Refaktor — `env.schema.ts`

**teraz** (fragment obok `MAX_CONCURRENT_RUNS`):

```typescript
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
```

**zamień na:**

```typescript
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
    MAX_USER_IN_FLIGHT_RUNS: z.coerce.number().int().positive().default(3),
```

#### Refaktor — `.env.example` / `setup-env.ts`

Dopisz:

```text
MAX_USER_IN_FLIGHT_RUNS=3
```

```typescript
process.env.MAX_USER_IN_FLIGHT_RUNS ??= '3';
```

Unit `env.schema.spec.ts`: default `3`; wartość `0` / ujemna → throw.

**DoD kroku:**

- `validateEnv` bez klucza → `MAX_USER_IN_FLIGHT_RUNS === 3`.
- Fail-fast przy niepoprawnej wartości (jak pozostałe `positive()`).

---

### KROK 2 — COUNT in-flight + bramka w `StartRunUseCase`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Admit `POST /runs` egzekwuje R-6a **przed** create. Major 29.1; `SPEC-RUNY.md` R-6a; `SPEC-KOMUNIKACJA.md` K-8; `docs/data_flow.md` §2a.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/application/start-run.use-case.ts`
- Zmiana: `apps/api/src/runs/application/start-run.use-case.spec.ts`
- Zmiana: wszystkie mocki `unusedRepo` / `RunRepository` w specach (nowa metoda portu — jak przy wcześniejszych metodach)

#### Port — dopisek do `RunRepository`

```typescript
  /** R-6a: własne runy w queued | running | interrupted | awaiting_hitl. */
  countInFlightByUser(userId: UserId): Promise<number>;
```

#### Prisma — implementacja

```typescript
  async countInFlightByUser(userId: UserId): Promise<number> {
    return this.prisma.run.count({
      where: {
        startedByUserId: userId,
        status: { in: [...CANCELABLE_RUN_STATUSES] },
      },
    });
  }
```

(`CANCELABLE_RUN_STATUSES` już = zbiór R-6a — reuse, bez drugiej listy.)

#### `StartRunUseCase` — kolejność

Po `completeness` i `guestPolicy.admitStart`, **przed** budową / `create` rekordu:

```typescript
    if (actor !== null) {
      const inFlight = await this.runs.countInFlightByUser(actor.id);
      if (inFlight >= this.env.MAX_USER_IN_FLIGHT_RUNS) {
        if (guestAdmit !== null) {
          await guestAdmit.release();
        }
        throw new DomainException(
          'USER_IN_FLIGHT_LIMIT_EXCEEDED',
          'User in-flight run limit exceeded',
          409,
        );
      }
    }
```

Wstrzyknij `@Inject(ENV) private readonly env: Env` do konstruktora.

Uwagi:

- Guest: przy reject **po** udanym Redis admit — **DECR** przez `guestAdmit.release()` (jak przy fail create).
- `actor === null` (ścieżki testowe bez sesji): **bez** bramki per-user (HTTP zawsze podaje `CurrentUser`).
- Global `MAX_CONCURRENT_RUNS` / FIFO workera — **nietknięte**.

**DoD kroku:**

- Unit: przy `countInFlightByUser >= MAX` → `DomainException` code `USER_IN_FLIGHT_LIMIT_EXCEEDED`, **bez** `create`.
- Unit: `count < MAX` → `create` wołane; kolejność po guest admit.
- Guest reject per-user zwalnia Redis admit.

---

### KROK 3 — Gateway: disconnect klienta → istniejący `AbortSignal`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Gdy api abortuje `fetch` (cancel runu), gateway **przerywa** hop LLM przez ten sam kanał `signal`, który już istnieje w `ResilientExecutor` / `providerCallService.completeOnce`. **Bez nowych endpointów.** Major 29.2; `SPEC-RUNY.md` R-11 pkt 5b; `docs/architektura.md`.

**Artefakty:**

- Nowy: `apps/ai-provider-gateway/src/chat/helpers/abort-signal-from-request.ts`
- Nowy: `apps/ai-provider-gateway/src/chat/helpers/abort-signal-from-request.spec.ts`
- Zmiana: `apps/ai-provider-gateway/src/chat/chat.controller.ts`
- Zmiana: `apps/ai-provider-gateway/src/chat/chat.service.ts` (`executeChat` + `completeChatAndStore`)
- Zmiana: `apps/ai-provider-gateway/src/chat/resilience/resilience.types.ts`
- Zmiana: `apps/ai-provider-gateway/src/chat/resilience/resilient-executor.ts`
- Zmiana: `apps/ai-provider-gateway/src/chat/resilience/resilient-executor.spec.ts`
- Zmiana: `apps/ai-provider-gateway/src/chat/chat.controller.spec.ts` / `chat.service.spec.ts` (sygnatura + abort)

#### Nowy plik — pełny kod

`apps/ai-provider-gateway/src/chat/helpers/abort-signal-from-request.ts`:

```typescript
import type { IncomingMessage } from 'node:http';

/**
 * Mapuje disconnect / abort klienta HTTP na AbortSignal.
 * Używane przez POST /api/v1/chat (bez nowej trasy) — api cancel zamyka fetch.
 */
export function abortSignalFromIncomingMessage(
  req: IncomingMessage,
): AbortSignal {
  const controller = new AbortController();
  const abort = (): void => {
    if (!controller.signal.aborted) {
      controller.abort();
    }
  };

  if (req.aborted || req.destroyed) {
    abort();
    return controller.signal;
  }

  req.once('aborted', abort);
  req.once('close', () => {
    // close po sukcesie też pada — abort tylko gdy request nie dokończony normalnie
    if (!req.complete) {
      abort();
    }
  });

  return controller.signal;
}
```

#### `ChatController.chat` — przekaż signal

```typescript
  async chat(@Req() req: Request, @Body() requestBody: ChatRequestDto) {
    const gatewayKey = requireClientGatewayKey(req);
    const clientAbort = abortSignalFromIncomingMessage(req);
    const result = await this.chatService.executeChat(
      requestBody,
      req.clientId ? asClientId(req.clientId) : asClientId('unknown'),
      asRequestId(req.requestId),
      gatewayKey,
      'native',
      clientAbort,
    );
    // ... bez zmian mapowania odpowiedzi
  }
```

#### `executeChat` / `completeChatAndStore`

Dodaj opcjonalny / wymagany parametr `clientAbort?: AbortSignal` i przekaż do:

```typescript
      const result = await this.resilientExecutor.executeWithRetryAndFallback({
        primaryAlias: asModelAlias(requestBody.modelAlias),
        fallbackAlias: isToolingRequest(requestBody)
          ? undefined
          : primaryResolved.fallbackAlias,
        retry: buildRetryPolicyFromResolved(primaryResolved),
        runOnce,
        requestId,
        externalSignal: clientAbort,
      });
```

#### `ResilientExecutionOptions` + `runWithTimeout`

Dopisz `externalSignal?: AbortSignal`.

W `runWithTimeout` — **rozróżnij** timeout vs abort zewnętrzny (dziś każde `controller.abort()` → `PROVIDER_TIMEOUT`):

**teraz** (skrót): timeout ustawia `controller.abort()`; catch zawsze rzuca `timeoutHttpError` gdy `controller.signal.aborted`.

**zamień na** (logika):

1. Jeśli `externalSignal?.aborted` na starcie → `throw new DOMException('The operation was aborted', 'AbortError')`.
2. `externalSignal?.addEventListener('abort', () => controller.abort(), { once: true })`.
3. Timeout ustawia flagę `timedOut = true` przed `controller.abort()`.
4. W `catch`: jeśli `externalSignal?.aborted` → rethrow `AbortError` (nie mapuj na timeout); jeśli `timedOut` → `timeoutHttpError`; inaczej oryginalny błąd.
5. `finally`: `removeEventListener` + `clearTimeout`.

Gdy brak `timeoutMs`: i tak łącz z `externalSignal` (abort klienta przerywa `fn`).

**Poza zakresem kroku:** nowe kontrolery / ścieżki OpenAI–Anthropic proxy (api CC woła native `/api/v1/chat`); abort u vendora bez `signal` w SDK.

**DoD kroku:**

- Unit helper: `aborted` req → signal już aborted; `close` przy `!complete` → abort.
- Unit resilient: `externalSignal.abort()` → `runOnce` dostaje `signal.aborted` / rzuca AbortError; **nie** fałszywy `PROVIDER_TIMEOUT` gdy to abort klienta.
- Unit / controller: `executeChat` dostaje signal z requestu.
- **Brak** nowej trasy w OpenAPI gateway.

---

### KROK 4 — Api: registry pending cancel + E2E ścieżka abort

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Cancel nadal: CAS + **200** + `requestCancel` in-process; `fetch` z `signal` (już w adapterze). Domknięcie race: cancel **przed** `begin(runId)`. Major 29.2; refaktor względem Fazy 12 / `RunAbortRegistry`.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/lifecycle/run-abort.registry.ts`
- Zmiana: `apps/api/src/runs/application/lifecycle/run-abort.registry.spec.ts`
- Audyt (bez zmian jeśli OK): `cancel-run.use-case.ts`, `llm-gateway.http.adapter.ts` (`signal: command.signal`), executory Social/Content (`signal`), `LlmHopService`

#### Refaktor — `RunAbortRegistry`

**teraz:**

```typescript
@Injectable()
export class RunAbortRegistry {
  private readonly controllers = new Map<RunId, AbortController>();

  begin(runId: RunId): AbortSignal {
    const existing = this.controllers.get(runId);
    if (existing) return existing.signal;
    const controller = new AbortController();
    this.controllers.set(runId, controller);
    return controller.signal;
  }

  requestCancel(runId: RunId): void {
    const controller = this.controllers.get(runId);
    controller?.abort();
  }

  end(runId: RunId): void {
    this.controllers.delete(runId);
  }
}
```

**zamień na:**

```typescript
@Injectable()
export class RunAbortRegistry {
  private readonly controllers = new Map<RunId, AbortController>();
  private readonly pendingCancel = new Set<RunId>();

  begin(runId: RunId): AbortSignal {
    const existing = this.controllers.get(runId);
    if (existing) return existing.signal;
    const controller = new AbortController();
    this.controllers.set(runId, controller);
    if (this.pendingCancel.delete(runId)) {
      controller.abort();
    }
    return controller.signal;
  }

  requestCancel(runId: RunId): void {
    const controller = this.controllers.get(runId);
    if (controller) {
      controller.abort();
      return;
    }
    this.pendingCancel.add(runId);
  }

  end(runId: RunId): void {
    this.controllers.delete(runId);
    this.pendingCancel.delete(runId);
  }
}
```

#### Audyt (oczekiwany stan — nie zmieniać bez luki)

| Segment | Oczekiwanie |
|---------|-------------|
| `CancelRunUseCase` | po wygranej CAS → `abortRegistry.requestCancel(runId)`; **bez** await execute |
| `InProcessRunWorker` | `begin` → `execute(..., { signal })` → `end` w `finally` |
| `LlmGatewayHttpAdapter.chat` | `fetch(..., { signal: command.signal })` |
| Executor / hop | early exit przy `signal.aborted`; brak retry AbortError |

**DoD kroku:**

- Unit registry: `requestCancel` **przed** `begin` → `begin().aborted === true`.
- Unit: `begin` → `requestCancel` → aborted (regresja).
- `end` czyści controller **i** pending.
- Cancel use-case: bez regresji 200 / idempotencji / `requestCancel` po CAS.

---

### KROK 5 — Kotwica jakości `parseWithZod` (bez zmian kodu)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 29.3 / Faza 4.3 — helper w `apps/api/src/shared/parse-with-zod.ts` jest już zgodny z kanonem (`VALIDATION_FAILED`, `details[].path` = `issue.path.join('.')`). Decyzja HOW: **zero edycji** pliku i call sites.

**Artefakty:** brak zmian produkcyjnych.

**Weryfikacja (w KROK 6 / tu jako checklista):**

- Istniejący `parse-with-zod.spec.ts` pozostaje zielony (nested + array index path).
- Brak driftu separatora / kodu HTTP.

**DoD kroku:**

- Diff **nie** zawiera `parse-with-zod.ts`.
- Envelope walidacji bez zmian kontraktu I/O.

---

### KROK 6 — Testy limitu, abort E2E, regresja

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Obserwowalne pokrycie R-6a / R-11 V1 + regresja R-6 / R-12 / cancel D-30…D-34 / parseWithZod. **Bez** nowych identyfikatorów D-* w `SPEC-TESTY.md` (jak maile 25–27).

**Artefakty:**

- Unit: `start-run.use-case.spec.ts` (limit)
- Unit: `env.schema.spec.ts` (default)
- Unit: `run-abort.registry.spec.ts` (pending)
- Unit: gateway `abort-signal-from-request.spec.ts`, `resilient-executor.spec.ts`
- E2e / Postman (rozszerzenie istniejących kolekcji cancel / start):
  - `POST /runs` przy ≥ `MAX_USER_IN_FLIGHT_RUNS` własnych in-flight → **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED`, brak nowego wiersza
  - Regresja: ponad `MAX_CONCURRENT_RUNS` nadal `queued` (nie 409 per-user, gdy COUNT użytkownika < limitu)
  - Cancel running → **200**; hop przerwany (mock gateway / spy: signal aborted lub brak dalszego vendor call)
  - Regresja D-30…D-34 / guest admit

Szkic asercji e2e limitu (w istniejącym pliku start/runs e2e lub nowym `runs-user-in-flight.e2e-spec.ts`):

```typescript
  it('rejects POST /runs with 409 USER_IN_FLIGHT_LIMIT_EXCEEDED when at cap', async () => {
    process.env.MAX_USER_IN_FLIGHT_RUNS = '1';
    // ... boot app / login user / seed one queued|running run for same user
    const res = await request(app.getHttpServer())
      .post('/api/v1/runs')
      .set('Cookie', cookie)
      .send(validStartBody);
    expect(res.status).toBe(409);
    expect(res.body.code).toBe('USER_IN_FLIGHT_LIMIT_EXCEEDED');
  });
```

**DoD kroku:**

- Zielone unit + e2e w zakresie powyżej.
- Guest / DEMO i global cap **bez regresji**.
- Cancel **200** bez await; brak nowych tras gateway.
- `parse-with-zod.spec.ts` zielony.

---

#### Propozycja commit message

```text
feat(runs): enforce per-user in-flight cap and end-to-end cancel abort

Reject POST /runs at MAX_USER_IN_FLIGHT_RUNS with 409; wire gateway chat to
client disconnect AbortSignal so api cancel stops the hop without new routes.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| R-6a | env + COUNT + 409 przed create; nie ciche queued |
| R-6 | worker / claim bez zmian semantyki |
| R-12 | guest admit + per-user; release przy 409 |
| R-11 V1 | in-process + disconnect→signal na `/chat`; 200 bez await |
| Brak nowych endpointów | diff OpenAPI / kontrolerów bez nowych `@Post` abort |
| parseWithZod | brak zmian pliku; unit path `'.'` |
| SPEC / docs | kody K-8; bez cytowania planów pomocniczych w kodzie |
| FE | poza zakresem (Faza 30) |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 29 | `WYKONANY` |
| Krok 29.1 | `WYKONANY` |
| Krok 29.2 | `WYKONANY` |
| Krok 29.3 | `WYKONANY` (kotwica spełniona bez zmiany helpera) |
| MILESTONE 29 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 12 / 4.3 / MILESTONE 4.3 / 6 | bez edycji statusów |

Ten skill **nie** edytuje majoru.
