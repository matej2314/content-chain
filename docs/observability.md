# Observability — Content Chain

Co obserwujemy w MVP: **metryki procesu** vs **logi runu** (przebieg domenowy). Nie mylić ze sobą.

Powiązane: `dokumentacja_komunikacji.md`, `data_flow.md`, `deployment.md`, `brand_types.md`, `security.md`.

## Podział sygnałów

| Sygnał | Gdzie | Dla kogo | Źródło prawdy |
|--------|-------|----------|----------------|
| Logi runu | DB + SSE / GET logs | Operator treści, debug pipeline SM | Kanoniczne w DB |
| Stdout/stderr | Procesy / kontenery | Ops (crash, start) | Uzupełnienie |
| Metryki Prometheus | `GET /metrics` na `apps/api` | Ops / Grafana | Snapshot procesu |
| Metryki gateway | opcjonalnie `GET /metrics` gateway | Ops LLM | Upstream; scrape osobno |

## Metryki `apps/api` (MVP)

Endpoint: `GET /metrics` (poza `/api/v1`). Ekspozycja sieci: `security.md` / `deployment.md`.

Minimalny zestaw (nazwy przykładowe — implementacja może użyć prefiksu `content_chain_`):

| Obszar | Co mierzyć |
|--------|------------|
| HTTP | Licznik requestów: method, route, status |
| HTTP | Latencja (histogram / summary) per route |
| Process | Uptime / żywy proces (gauge) |
| Runy | Liczniki / gauge wg `RunStatus` (queued, running, awaiting_hitl, completed, failed) |
| Gateway (z perspektywy api) | Licznik błędów / timeoutów wywołań do gateway (nie mylić z logiem runu) |

Poza MVP metryk: pełny USE/RED, tracing OTel, biznesowe „jakość copy”.

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
| `step` | zalecane | nazwa węzła (np. `IdeationAgent`, `ConsistencyVerifier`) |
| `requestId` | gdy dotyczy | HTTP: z odpowiedzi api; LLM: z **odpowiedzi** gateway; brak przy timeoutie bez odpowiedzi |

Zakaz w `message`: sekrety (`X-Gateway-Key`, JWT, hasła, klucze vendorów), pełne prompty z danymi wrażliwymi ponad potrzebę debugu MVP.

### Korelacja (ops)

```text
RunId + ConversationId  →  cały przebieg SM
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

- Happy path runu: w UI/API widać czytelne logi kroków ze `step` i `conversationId`.
- Po każdym udanym hopie LLM w logu jest `requestId` z gateway.
- `/metrics` zwraca HTTP i run status counters bez auth w sieci ops.
- Brak sekretów w logach runu i w metrykach (labelach).

## Poza zakresem MVP

- OpenTelemetry traces jako wymóg  
- Centralny ELK/Loki w repo CC  
- Alerty YAML w tym dokumencie (mogą trafić do `deployment` później)  
- PII redaction policy ponad zakaz sekretów
