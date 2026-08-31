# Observability — Content Chain

Co obserwujemy w MVP: **metryki procesu** vs **logi runu** (przebieg domenowy). Nie mylić ze sobą.

Powiązane: `dokumentacja_komunikacji.md`, `data_flow.md`, `deployment.md`, `brand_types.md`, `security.md`.

## Podział sygnałów

| Sygnał | Gdzie | Dla kogo | Źródło prawdy |
|--------|-------|----------|----------------|
| Logi runu | DB + SSE / GET logs | Operator treści, debug pipeline SM | Kanoniczne w DB |
| Stdout/stderr (api) | Proces `apps/api` — **Pino** przez `nestjs-pino` | Ops (crash, start, request HTTP) | Uzupełnienie; **nie** zamiennik logów runu w DB |
| Stdout/stderr (pozostałe) | Procesy / kontenery | Ops | Uzupełnienie |
| Metryki Prometheus | `GET /metrics` na `apps/api` | Ops / Grafana | Snapshot procesu |
| Metryki gateway | opcjonalnie `GET /metrics` gateway | Ops LLM | Upstream; scrape osobno |

**Logi procesu vs logi runu:** Pino / `nestjs-pino` = strukturalne logi procesu i requestów HTTP na stdout. Przebieg domenowy (kroki agentów Social/Content, HITL) pozostaje w DB + SSE — jak niżej. Nie mylić tych kanałów.

### Dump hopu gateway (tylko `development`)

`LlmGatewayHttpAdapter` przy `NODE_ENV=development` zapisuje na stdout (Nest `Logger`) treść hopu `POST {GATEWAY}/api/v1/chat`: żądanie, odpowiedź **201** albo ciało błędu HTTP. Kształt pól: `apps/api/src/llm/llm-gateway-chat.log.ts`. W polach tekstowych wartość `GATEWAY_KEY` jest zastępowana `[REDACTED]`. To **nie** zastępuje `run.log` i **nie** jest włączane poza `development`. W `production` adapter nie emituje promptów ani `output.text`. Przy błędzie transportu (sieć, nie envelope gateway) — krótki `warn` bez ciała odpowiedzi.

W `run.log` kroku hopu: przy `LlmGatewayError` `message` może zawierać zmapowany komunikat adaptera (`Gateway chat failed (CODE)`), nadal bez sekretu.

## Metryki `apps/api` (MVP)

Endpoint: `GET /metrics` (poza `/api/v1`). Ekspozycja sieci: `security.md` / `deployment.md`.

Minimalny zestaw (nazwy przykładowe — implementacja może użyć prefiksu `content_chain_`):

| Obszar | Co mierzyć |
|--------|------------|
| HTTP | Licznik requestów: method, route, status |
| HTTP | Latencja (histogram / summary) per route |
| Process | Uptime / żywy proces (gauge) |
| Runy | Liczniki / gauge wg `RunStatus` (queued, running, interrupted, awaiting_hitl, completed, failed) |
| Gateway (z perspektywy api) | Licznik błędów / timeoutów wywołań do gateway (nie mylić z logiem runu) |

Poza MVP metryk: pełny USE/RED, tracing OTel, biznesowe „jakość copy”, **analityka ocen / opinii** (panel admina — V1 — rozbudowa).

### Scrape

- **Wymagane w ops production:** Prometheus (lub agent) → `apps/api` `/metrics`.
- **Opcjonalnie:** drugi job → `apps/ai-provider-gateway` `/metrics` (kontrakt upstream).
- Retention / storage metryk = odpowiedzialność instalacji Prometheus operatora (CC nie trzyma time-series w SQLite).

## Logi runu (domena)

Kanoniczny wpis w DB, emitowany też jako SSE `run.log`.

### Pola normy

| Pole | Wymagane | Opis |
|------|----------|------|
| `runId` | tak | `RunId` |
| `conversationId` | tak (po starcie runu) | wspólny na run agentowy |
| `at` | tak | timestamp ISO8601 |
| `level` | tak | np. `info` \| `warn` \| `error` |
| `message` | tak | **czytelny** opis kroku (ludzki język) |
| `step` | zalecane | nazwa węzła (np. `IdeationAgent`, `ContentWriterAgent`, `PageWriterAgent`, `ConsistencyVerifier`) |
| `requestId` | gdy dotyczy | HTTP: z odpowiedzi api; LLM: z **odpowiedzi** gateway; brak przy timeoutie bez odpowiedzi |

Zakaz w `message`: sekrety (`X-Gateway-Key`, JWT, hasła, klucze vendorów), pełne prompty z danymi wrażliwymi ponad potrzebę debugu MVP.

### Korelacja (ops)

```text
RunId + ConversationId  →  cały przebieg (Social lub Content)
requestId (gateway)     →  pojedynczy hop LLM w logach gateway / CC
requestId (HTTP api)    →  pojedyncze wywołanie REST (start, HITL, …)
```

Szczegóły: `brand_types.md`, `dictionary.md`.

## Retention

| Dane | MVP |
|------|-----|
| Logi runu w DB | **Bez TTL** — rosną z użytkowaniem; czyszczenie = procedura operatorska później |
| Metryki | Retention po stronie Prometheus operatora |
| Stdout | Polityka hosta / Docker logging driver |

## DoD obserwowalności (MVP)

- Happy path runu: w UI/API widać czytelne logi kroków ze `step` i `conversationId` (post, reel i page).
- Po każdym udanym hopie LLM w logu jest `requestId` z gateway.
- `/metrics` zwraca HTTP i run status counters bez auth w sieci ops.
- Brak sekretów w logach runu i w metrykach (labelach).
- Dump pełnej treści hopu chat na stdout wyłącznie w `development`, z `[REDACTED]` zamiast `GATEWAY_KEY`.

## Poza zakresem MVP

- OpenTelemetry traces jako wymóg  
- Centralny ELK/Loki w repo CC  
- Alerty YAML w tym dokumencie (mogą trafić do `deployment` później)  
- PII redaction policy ponad zakaz sekretów
