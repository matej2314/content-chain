---
wersja: 8
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-19
---

# SPEC — Komunikacja (HTTP / SSE / gateway)

## Cel / zakres względem dokumentacji

Norma **implementacji obu powierzchni I/O** Content Chain:

1. HTTP API + SSE `apps/api` (konsumenci: `apps/frontend`, Postman),
2. klient `apps/api` → `apps/ai-provider-gateway` (natywny chat).

Uszczegóławia `docs/dokumentacja_komunikacji.md` oraz korelację ID z `docs/brand_types.md` / `docs/dictionary.md`. **Nie** redefiniuje listy endpointów ani payloadów — odwołuje się do docs; tu obowiązują wzorce warstw, walidacja, envelope, SSE i adapter LLM.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`):

- cienkie controllery Nest (walidacja wejścia, mapowanie HTTP, authz) → application / use-case → domain + porty;
- async run: HTTP **nie** blokuje na cały pipeline LLM;
- live status wyłącznie **SSE**; GET = snapshot / health / metrics;
- LLM wyłącznie przez **port** + adapter HTTP do gateway.

**Wyjątek względem stylu globalnego:** brak.

## Powierzchnie (skrót)

| Powierzchnia | Prefiks / ścieżka | Format |
|--------------|-------------------|--------|
| Publiczne API CC | `/api/v1` | JSON |
| Lista runów | `GET /api/v1/runs` | JSON (paginacja stała 10) |
| Runy użytkownika (select opinii) | `GET /api/v1/runs/user/:userId` | JSON (wszystkie, bez pageSize=10) |
| Live run | `GET /api/v1/runs/:runId/events` | SSE (`text/event-stream`) |
| Opinia tekstowa | `POST /api/v1/feedback` | JSON (zapis MVP) |
| Ops metrics | `GET /metrics` (poza `/api/v1`) | Prometheus text |
| DX OpenAPI (Swagger UI) | `GET /docs` (poza `/api/v1`) | HTML / OpenAPI JSON |
| Health | `GET /api/v1/health` | JSON |
| Auth probe / bootstrap status | `GET /api/v1/auth/me`, `GET /api/v1/auth/bootstrap-status` | JSON |
| Gateway (z api) | upstream `/api/v1/chat` (+ opcjonalnie stream) | JSON / SSE gateway |

MVP: **wyłącznie** `/api/v1` jako prefiks produktowy — bez `/api/v2`. Swagger **nie** pod `/api` (kolizja z `/api/v1`) — norma: `/docs` (`docs/dokumentacja_komunikacji.md`).

Szczegóły metod, pól i kodów: `docs/dokumentacja_komunikacji.md`.

## Wymagania (egzekwowalne)

K-1. Każda odpowiedź błędu HTTP z `apps/api` ma envelope:

```json
{
  "code": "CONTEXT_INCOMPLETE",
  "message": "…",
  "requestId": "req_<uuid>",
  "details": []
}
```

`requestId` nadaje **`apps/api`** w ramach obsługi tego żądania (middleware / interceptor) i zwraca w envelope oraz (zalecane) nagłówku `x-request-id`. Klient **nie musi** przysyłać `RequestId`.

K-2. Start runu (`POST /api/v1/runs`) zwraca **202** z `runId`, `conversationId` i statusem `queued` | `running` — bez synchronicznego czekania na wynik LLM. `interrupted` **nie** jest statusem odpowiedzi POST.

K-2a. `GET /api/v1/runs` realizuje listing kolekcji wg docs (instancja, `pageSize=10`, filtry, `startedBy`) — norma dziedzinowa w `SPEC-RUNY.md`. Filtr `status` obejmuje pełny `RunStatus` (w tym `interrupted`).

K-2b. `GET /api/v1/runs/user/:userId` — lista wszystkich runów autora pod select opinii (`SPEC-RUNY.md` R-3c). `POST /api/v1/feedback` — zapis opinii (`SPEC-FEEDBACK.md`). Ocena / flaga edycji / finalize — `SPEC-RUNY.md` R-10. Payloady w `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 4: dopisano fundament zapisu feedbacku (wcześniej tylko listing dashboardu).

Zmiana względem wersji 2: dopisano obowiązek listingu kolekcji runów pod FE (wcześniej tylko POST + GET by id / SSE).

K-3. Live postęp runu (status, logi przyrostowe, HITL, completed/failed) idzie wyłącznie przez **SSE** `GET /api/v1/runs/:runId/events`. Zdarzenia i statusy jak w docs komunikacji — `run.status` może nieść `interrupted`.

Zmiana względem wersji 5: zbiór statusów SSE / filtra listy rozszerzony o `interrupted`; K-2 (POST `queued` \| `running`) **bez** zmiany statusów startowych.

K-3a. Koniec strumienia SSE: po wyemitowaniu `run.completed` albo `run.failed` handler **kończy** `Observable` (Nest zamyka response). Subskrypcja przy snapshotcie już `completed` \| `failed`: `run.status` z **najnowszego** odczytu z DB (drugi `getRun.execute` przed `subscribe`), potem complete — bez zostawiania subjectu na zawsze. Stream **nie** kończy się na `awaiting_hitl` ani `interrupted`. Reconnect klienta tylko po nieoczekiwanym zerwaniu przy statusie nieterminalnym — kontrakt w `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 6 / K-3: K-3 wymieniało eventy completed/failed jako treść live, bez normy zamknięcia połączenia HTTP ani late-join na skończonym runie.

K-3b. Heartbeat keep-alive i TTL Subject:

1. Handler `@Sse()` **merguje** live Observable ze strumieniem `interval(SSE_HEARTBEAT_MS)` emitującym `{ type: 'heartbeat', data: '' }`. Klient **ignoruje** tę wartość. Heartbeat **nie** jest emitowany w ścieżce `of(snapshot)` (terminal late-join) — wyłącznie przy otwartym połączeniu live.
2. Subject w `InMemoryRunSseHub` otworzony przez `subscribe()` jest domykany z błędem i usuwany z mapy po `RUN_SSE_SUBJECT_TTL_MS`. Timer musi mieć `timer.unref()`.
3. Wartości `SSE_HEARTBEAT_MS` (default `25_000`) i `RUN_SSE_SUBJECT_TTL_MS` (default `600_000`) są walidowane przez Zod w `env.schema.ts`. Zakaz hardkodowania.

Zmiana względem wersji 7: dopisano K-3b (heartbeat + TTL Subject — ochrona przed zombie Subject przy hung runie i przed ciszą TCP przy długich runach).

K-4. Auth SSE = ta sama sesja co API: cookie httpOnly **`cc_access`** / **`cc_refresh`** (`SPEC-AUTH.md`). **Zakaz** tokenu w query string oraz **`Authorization: Bearer`** jako modelu MVP (FE, Postman, integracje — cookie jar / `credentials: 'include'`).

Zmiana względem wersji 1 tego SPEC: usunięto Bearer jako równorzędny transport; access nie wraca w body JSON.

K-5. Wywołania LLM z Content Chain idą wyłącznie przez adapter portu LLM → natywne `POST {GATEWAY}/api/v1/chat` (opcjonalnie `.../chat/stream` gdy krok tego wymaga). Nagłówek `X-Gateway-Key` tylko po stronie `apps/api` / env. **Zakaz** ustawiania `x-request-id` przez CC przy chat/stream.

K-6. Na wszystkich hopach LLM w jednym runie body niesie **ten sam** `conversationId` utworzony przy starcie runu. Po każdej odpowiedzi gateway `requestId` hopu trafia do `run.log` (gdy odpowiedź nadeszła).

K-7. Błędy gateway mapowane na logi runu i ewentualnie `run.failed` / retry wg **polityki api** — zawsze z czytelnym logiem; **bez** wycieku `X-Gateway-Key` do frontendu ani logów produktowych.

K-8. Kody domenowe z docs (`UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_FAILED`, `CONTEXT_INCOMPLETE`, `HITL_REQUIRED`, `RUN_NOT_FOUND`, `REVIEW_LOCKED`, `RUN_NOT_REVIEWABLE`, `CONFLICT`, `INTERNAL_ERROR`, …) mapowane spójnie przez wspólny filter — bez ad hoc `res.status` w controllerach.

## Norma implementacji

### Wzorce / struktura

| Warstwa | Norma |
|---------|--------|
| Controller | DTO + **class-validator** + globalny `ValidationPipe` (whitelist); mapowanie HTTP ↔ komendy use-case; bez ORM, bez promptów, bez klienta gateway |
| Application | use-case’y; walidacja / parsing wewnętrzny **Zod**; orkiestracja startu/wznowienia runu, odczyt snapshotów |
| Błędy HTTP | jeden wspólny **exception filter** (ew. interceptor korelacji) → envelope K-1 |
| SSE | oficjalny mechanizm Nest: dekorator `@Sse()`, handler zwraca `Observable<MessageEvent>` ([NestJS SSE](https://docs.nestjs.com/techniques/server-sent-events)); Observable **kończy się** po terminalu runu; teardown (`complete` / `finalize`) przy disconnect i po `completed`/`failed` |
| LLM | port (np. `LlmGatewayPort`) w domain/application + **osobny adapter HTTP** w `infrastructure` |
| Typy kontraktu | brand / enumy z `@content-chain/shared` (`docs/brand_types.md`); bez magicznych stringów ID w feature kodzie |

Walidacja na granicy HTTP: **class-validator** + `ValidationPipe` ([NestJS Validation](https://docs.nestjs.com/techniques/validation)).  
Walidacja w aplikacji (komendy, wyniki pośrednie, branded create*): **Zod**.  
(Docs brand types dopuszczają „Zod / równoważne” na granicach — tu HTTP = class-validator jako równoważnik granicy; Zod w application. Runtime Zod **nie** trafia do `packages/shared` — zgodnie z `SPEC-MONOREPO.md`.)

### Korelacja ID (norma kodu)

| ID | Kto tworzy | Gdzie widać |
|----|------------|-------------|
| `RequestId` (HTTP) | `apps/api` przy żądaniu | envelope / nagłówek odpowiedzi |
| `RunId` | `apps/api` przy `POST /runs` | odpowiedź + logi + SSE |
| `ConversationId` | `apps/api` przy starcie runu | odpowiedź + body chat + logi |
| `RequestId` (LLM) | **gateway** w odpowiedzi | wyłącznie zapis w `run.log` / SSE log |

Zakaz: FE generuje `RequestId` „na zapas”; zakaz nowego `ConversationId` per agent w tym samym runie.

### Wolno

- Globalny `ValidationPipe` z `whitelist` / `forbidNonWhitelisted` / `transform`.
- Wspólny filter mapujący wyjątki domenowe i walidację na envelope + właściwy status HTTP.
- `@Sse()` na `GET .../events` z auth guardem jak pozostałe chronione trasy.
- Kończyć `Observable` po `run.completed` / `run.failed` oraz na late-join, gdy snapshot jest już terminalny (K-3a).
- Adapter gateway używający natywnego chat; zapis `requestId` z odpowiedzi do logu kroku.
- Opcjonalnie `POST .../chat/stream` gateway, gdy konkretny węzeł pipeline’u tego wymaga (finalizacja węzła po domknięciu streamu).
- Polityka retry/timeout po stronie api przy `RATE_LIMITED` / `PROVIDER_TIMEOUT` / `PROVIDER_UNAVAILABLE` — byle zakończenie było obserwowalne w logu/SSE.

### Nie wolno

- Pollingu statusu runu jako kanału **live** (zamiast SSE).
- Zostawiania otwartego SSE po evencie terminalnym albo na runie już `completed` \| `failed`.
- Unbounded mapy Subject per `runId` bez evikcji po terminalu (cykl życia huba — `SPEC-RUNY.md`).
- Subjectu bez TTL automatu ewikcji — zombie Subject przy hung runie powoduje memory leak (K-3b).
- Braku heartbeat przy live SSE — cisza TCP >60 s grozi zamknięciem połączenia przez proxy i reconnectem klienta (K-3b).
- Hardkodowania `SSE_HEARTBEAT_MS` / `RUN_SSE_SUBJECT_TTL_MS` w kodzie zamiast env z walidacją Zod.
- Ustawiania `x-request-id` przez Content Chain przy wywołaniach chat/stream gateway.
- Tokenu JWT / access w query string SSE.
- `Authorization: Bearer` oraz zwracania `accessToken` w body jako modelu auth MVP (norma: dwa cookie httpOnly — `SPEC-AUTH.md`).
- Fasady `/api/v1/openai/...` ani `/api/v1/anthropic/...` jako **domyślnej** ścieżki z CC.
- Generowania `RequestId` po stronie frontendu przed `POST /runs`.
- Synchronicznego blokowania HTTP na cały długi run LLM.
- Wołania SDK vendorów LLM z `apps/api` z pominięciem gateway.
- Wyciekania `X-Gateway-Key`, haseł, JWT do envelope, SSE lub `run.log`.
- Rozwijania publicznego API pod `/api/v2` w MVP.
- Montowania Swagger UI pod ścieżką `/api` (kolizja z prefiksem produktowym `/api/v1` — norma: `/docs`).

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS controllers + `ValidationPipe` + **class-validator** / class-transformer | obowiązkowe |
| **Zod** (warstwa application) | obowiązkowe |
| NestJS **`@Sse()`** + RxJS `Observable<MessageEvent>` + `merge` z heartbeat `interval` | obowiązkowe |
| `SSE_HEARTBEAT_MS` (env, default `25_000`) + `RUN_SSE_SUBJECT_TTL_MS` (env, default `600_000`) — walidowane Zod | obowiązkowe |
| Port LLM + adapter HTTP (natywny chat gateway) | obowiązkowe |
| Brand types / enumy z `@content-chain/shared` | obowiązkowe |
| **`@nestjs/swagger`** + Swagger UI pod **`/docs`** (DX powierzchni api) | obowiązkowe w MVP |
| OpenAPI gateway jako źródło kontraktu upstream | odwołanie; bez kopiowania pełnego specu do tego SPEC |
| `/api/v2` | poza MVP |

Zmiana względem wersji 3: dopisano obowiązkowy DX Swagger pod `/docs` (wcześniej brak normy ścieżki OpenAPI dla `apps/api`; domyślne montowanie pod `/api` jest zakazane ze względu na kolizję z `/api/v1`).

Źródła weryfikacji: [NestJS Server-Sent Events](https://docs.nestjs.com/techniques/server-sent-events), [NestJS Validation](https://docs.nestjs.com/techniques/validation), [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction); kontrakt endpointów — `docs/dokumentacja_komunikacji.md`.

## Kryteria akceptacji

- [ ] Błędy HTTP mają envelope z `code`, `message`, `requestId` (format `req_<uuid>`).
- [ ] `POST /api/v1/runs` kończy się 202 z `runId` + `conversationId` bez czekania na LLM.
- [ ] `GET /api/v1/runs` listuje runy instancji zgodnie z docs (paginacja 10, filtry, `startedBy`).
- [ ] `GET /api/v1/runs/user/:userId` i `POST /feedback` oraz rating/edit/finalize istnieją w kontrakcie docs; kody `REVIEW_LOCKED` / `RUN_NOT_REVIEWABLE` w envelope.
- [ ] Klient otrzymuje live status wyłącznie przez SSE; GET run/logs = snapshot.
- [ ] SSE na skończonym runie (`completed` \| `failed`) emituje snapshot statusu i **kończy** strumień; po `run.completed` / `run.failed` serwer zamyka połączenie. `awaiting_hitl` / `interrupted` nie kończą SSE.
- [ ] SSE wymaga sesji cookie jak API; brak tokenu w query i brak wymogu Bearer.
- [ ] Adapter gateway woła natywny chat z `X-Gateway-Key`, bez `x-request-id` z CC; `conversationId` stały w runie; `requestId` z odpowiedzi w logu kroku.
- [ ] DTO HTTP walidowane class-validator; use-case’y używają Zod tam, gdzie parsują / walidują dane aplikacji.
- [ ] Brak ścieżki FE/api → vendor LLM z pominięciem gateway.
- [ ] Publiczne API MVP wyłącznie pod `/api/v1`.
- [ ] Swagger UI api dostępne pod `/docs` (nie pod `/api`).

## Poza zakresem

- Pełne skopiowanie OpenAPI `ai-provider-gateway`.
- Traktowanie `/docs` jako kontraktu produktowego FE (to DX / ops lokalne).
- Definicja grafu Social, refine `max N`, treść promptów → `SPEC-SOCIAL.md`.
- Polityka przejść statusów runu, przegląd (ocena/edycja) i kanoniczny model logów DB → `SPEC-RUNY.md`.
- Opinie tekstowe → `SPEC-FEEDBACK.md`.
- Implementacja UI EventSource / animacji statusu → `SPEC-FRONTEND.md`.
- Szczegółowy zestaw metryk Prometheus i dashboardy → docs observability / `SPEC-BEZPIECZENSTWO.md` (tu tylko istnienie ścieżki `/metrics`).
- Sztywna liczba retry gateway (pozostaje „polityka api + czytelny log”).
