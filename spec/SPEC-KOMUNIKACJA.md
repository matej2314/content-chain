---
wersja: 2
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-11
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
| Live run | `GET /api/v1/runs/:runId/events` | SSE (`text/event-stream`) |
| Ops metrics | `GET /metrics` (poza `/api/v1`) | Prometheus text |
| Health | `GET /api/v1/health` | JSON |
| Gateway (z api) | upstream `/api/v1/chat` (+ opcjonalnie stream) | JSON / SSE gateway |

MVP: **wyłącznie** `/api/v1` — bez `/api/v2`.

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

K-2. Start runu (`POST /api/v1/runs`) zwraca **202** z `runId`, `conversationId` i statusem `queued` | `running` — bez synchronicznego czekania na wynik LLM.

K-3. Live postęp runu (status, logi przyrostowe, HITL, completed/failed) idzie wyłącznie przez **SSE** `GET /api/v1/runs/:runId/events`. Zdarzenia i statusy jak w docs komunikacji.

K-4. Auth SSE = ta sama sesja co API: cookie httpOnly **`cc_access`** / **`cc_refresh`** (`SPEC-AUTH.md`). **Zakaz** tokenu w query string oraz **`Authorization: Bearer`** jako modelu MVP (FE, Postman, integracje — cookie jar / `credentials: 'include'`).

Zmiana względem wersji 1 tego SPEC: usunięto Bearer jako równorzędny transport; access nie wraca w body JSON.

K-5. Wywołania LLM z Content Chain idą wyłącznie przez adapter portu LLM → natywne `POST {GATEWAY}/api/v1/chat` (opcjonalnie `.../chat/stream` gdy krok tego wymaga). Nagłówek `X-Gateway-Key` tylko po stronie `apps/api` / env. **Zakaz** ustawiania `x-request-id` przez CC przy chat/stream.

K-6. Na wszystkich hopach LLM w jednym runie body niesie **ten sam** `conversationId` utworzony przy starcie runu. Po każdej odpowiedzi gateway `requestId` hopu trafia do `run.log` (gdy odpowiedź nadeszła).

K-7. Błędy gateway mapowane na logi runu i ewentualnie `run.failed` / retry wg **polityki api** — zawsze z czytelnym logiem; **bez** wycieku `X-Gateway-Key` do frontendu ani logów produktowych.

K-8. Kody domenowe z docs (`UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_FAILED`, `CONTEXT_INCOMPLETE`, `HITL_REQUIRED`, `RUN_NOT_FOUND`, `CONFLICT`, `INTERNAL_ERROR`, …) mapowane spójnie przez wspólny filter — bez ad hoc `res.status` w controllerach.

## Norma implementacji

### Wzorce / struktura

| Warstwa | Norma |
|---------|--------|
| Controller | DTO + **class-validator** + globalny `ValidationPipe` (whitelist); mapowanie HTTP ↔ komendy use-case; bez ORM, bez promptów, bez klienta gateway |
| Application | use-case’y; walidacja / parsing wewnętrzny **Zod**; orkiestracja startu/wznowienia runu, odczyt snapshotów |
| Błędy HTTP | jeden wspólny **exception filter** (ew. interceptor korelacji) → envelope K-1 |
| SSE | oficjalny mechanizm Nest: dekorator `@Sse()`, handler zwraca `Observable<MessageEvent>` ([NestJS SSE](https://docs.nestjs.com/techniques/server-sent-events)) |
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
- Adapter gateway używający natywnego chat; zapis `requestId` z odpowiedzi do logu kroku.
- Opcjonalnie `POST .../chat/stream` gateway, gdy konkretny węzeł pipeline’u tego wymaga (finalizacja węzła po domknięciu streamu).
- Polityka retry/timeout po stronie api przy `RATE_LIMITED` / `PROVIDER_TIMEOUT` / `PROVIDER_UNAVAILABLE` — byle zakończenie było obserwowalne w logu/SSE.

### Nie wolno

- Pollingu statusu runu jako kanału **live** (zamiast SSE).
- Ustawiania `x-request-id` przez Content Chain przy wywołaniach chat/stream gateway.
- Tokenu JWT / access w query string SSE.
- `Authorization: Bearer` oraz zwracania `accessToken` w body jako modelu auth MVP (norma: dwa cookie httpOnly — `SPEC-AUTH.md`).
- Fasady `/api/v1/openai/...` ani `/api/v1/anthropic/...` jako **domyślnej** ścieżki z CC.
- Generowania `RequestId` po stronie frontendu przed `POST /runs`.
- Synchronicznego blokowania HTTP na cały długi run LLM.
- Wołania SDK vendorów LLM z `apps/api` z pominięciem gateway.
- Wyciekania `X-Gateway-Key`, haseł, JWT do envelope, SSE lub `run.log`.
- Rozwijania publicznego API pod `/api/v2` w MVP.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS controllers + `ValidationPipe` + **class-validator** / class-transformer | obowiązkowe |
| **Zod** (warstwa application) | obowiązkowe |
| NestJS **`@Sse()`** + RxJS `Observable<MessageEvent>` | obowiązkowe |
| Port LLM + adapter HTTP (natywny chat gateway) | obowiązkowe |
| Brand types / enumy z `@content-chain/shared` | obowiązkowe |
| OpenAPI gateway jako źródło kontraktu upstream | odwołanie; bez kopiowania pełnego specu do tego SPEC |
| `/api/v2` | poza MVP |

Źródła weryfikacji: [NestJS Server-Sent Events](https://docs.nestjs.com/techniques/server-sent-events), [NestJS Validation](https://docs.nestjs.com/techniques/validation); kontrakt endpointów — `docs/dokumentacja_komunikacji.md`.

## Kryteria akceptacji

- [ ] Błędy HTTP mają envelope z `code`, `message`, `requestId` (format `req_<uuid>`).
- [ ] `POST /api/v1/runs` kończy się 202 z `runId` + `conversationId` bez czekania na LLM.
- [ ] Klient otrzymuje live status wyłącznie przez SSE; GET run/logs = snapshot.
- [ ] SSE wymaga sesji cookie jak API; brak tokenu w query i brak wymogu Bearer.
- [ ] Adapter gateway woła natywny chat z `X-Gateway-Key`, bez `x-request-id` z CC; `conversationId` stały w runie; `requestId` z odpowiedzi w logu kroku.
- [ ] DTO HTTP walidowane class-validator; use-case’y używają Zod tam, gdzie parsują / walidują dane aplikacji.
- [ ] Brak ścieżki FE/api → vendor LLM z pominięciem gateway.
- [ ] Publiczne API MVP wyłącznie pod `/api/v1`.

## Poza zakresem

- Pełne skopiowanie OpenAPI `ai-provider-gateway`.
- Definicja grafu Social, refine `max N`, treść promptów → `SPEC-SOCIAL.md`.
- Polityka przejść statusów runu i kanoniczny model logów DB → `SPEC-RUNY.md`.
- Implementacja UI EventSource / animacji statusu → `SPEC-FRONTEND.md`.
- Szczegółowy zestaw metryk Prometheus i dashboardy → docs observability / `SPEC-BEZPIECZENSTWO.md` (tu tylko istnienie ścieżki `/metrics`).
- Sztywna liczba retry gateway (pozostaje „polityka api + czytelny log”).
