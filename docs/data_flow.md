# Przepływy danych — Content Chain

Opis orkiestracji i ruchu danych w MVP. Kontrakty HTTP/SSE: `dokumentacja_komunikacji.md`. Identyfikatory: `brand_types.md`, `dictionary.md`.

## Zasady wspólne

- **DB kanoniczna** (Prisma/SQLite): kontekst firmy, użytkownicy, runy, wyniki, logi runu.
- **LLM wyłącznie** przez `apps/ai-provider-gateway`.
- **Korelacja runu agentowego:** jeden `RunId` + jeden `ConversationId`; `RequestId` HTTP z odpowiedzi `apps/api`; `RequestId` hopu LLM z odpowiedzi gateway (zapisywany w `run.log`).
- **Live UI:** SSE; snapshot logów i health/metrics — GET (patrz komunikacja).
- **Verifier:** węzeł `ConsistencyVerifier` — obowiązkowy; checklista: (1) kontekst firmy, (2) język (gramatyka, interpunkcja, składnia). Fail → Refine* z **`max N=2`**.

---

## 1. Bootstrap / auth

```mermaid
sequenceDiagram
  participant Op as Operator
  participant FE as apps/frontend
  participant API as apps/api
  participant DB as SQLite

  Op->>API: POST /api/v1/auth/bootstrap-admin
  API->>DB: zapis User(admin)
  API-->>Op: 201 + requestId (HTTP)

  FE->>API: POST /api/v1/auth/login
  API->>DB: weryfikacja credentials
  API-->>FE: accessToken + Set-Cookie refresh + requestId
  FE->>API: kolejne wywołania (Bearer / cookie)
```

Dane: hasła tylko po stronie api (hash w DB); sekrety LLM nigdy we frontendzie.

---

## 2. Kontekst firmy i bramka

```mermaid
flowchart LR
  Admin[admin] -->|PUT/PATCH company-context| API[apps/api]
  API --> DB[(DB)]
  API -->|GET completeness| Admin
  DB -->|complete?| Gate{Bramka}
  Gate -->|nie| Block[Start runu 409 CONTEXT_INCOMPLETE]
  Gate -->|tak| Allow[POST /runs dozwolony]
```

Sekcje bramki: tożsamość, oferta, głos SM, CTA/kanały, odbiorca (`dokumentacja_koncepcyjna.md`).  
`user` tylko czyta / korzysta; edycja wyłącznie `admin`.

---

## 3. Run jednoetapowy — `post_ideas` (full-auto)

Wejście: brief + platforma + język. Brak HITL.

```mermaid
flowchart TB
  Start[POST /runs] --> Gate{Kompletność kontekstu}
  Gate -->|nie| E409[409 CONTEXT_INCOMPLETE]
  Gate -->|tak| Q[status queued / running]
  Q --> Load[LoadContext]
  Load --> Norm[NormalizeBrief]
  Norm --> Idea[IdeationAgent]
  Idea --> Ver[ConsistencyVerifier]
  Ver -->|fail i n less than max N| Ref[RefineIdeas]
  Ref --> Idea
  Ver -->|fail i n equals max N| Fail[status failed + SSE]
  Ver -->|ok| Pers[PersistIdeas]
  Pers --> Done[status completed + SSE]
```

| Węzeł | Dane in | Dane out | LLM |
|-------|---------|----------|-----|
| `LoadContext` | — | kontekst z DB | nie |
| `NormalizeBrief` | brief HTTP | brief znormalizowany | nie / lekko |
| `IdeationAgent` | kontekst + brief | lista pomysłów | tak → gateway |
| `ConsistencyVerifier` | pomysły + kontekst | ok / lista poprawek (kontekst **i** język) | tak → gateway |
| `RefineIdeas` | pomysły + feedback | poprawione pomysły | tak → gateway |
| `PersistIdeas` | pomysły OK | rekord wyniku + logi | nie |

Każdy hop LLM: body `conversationId` = run; po odpowiedzi gateway → wpis `run.log` z `requestId` gateway.

Analogicznie **`post_content` (full-auto):** zamiast `IdeationAgent` / `RefineIdeas` → `ContentWriterAgent` / `RefineContent`; wejście zawiera wybrane / podane idea(e).

---

## 4. Run dwuetapowy — `post_ideas_then_content` (HITL)

```mermaid
flowchart TB
  Start[POST /runs] --> Gate{Kompletność}
  Gate -->|tak| Load[LoadContext]
  Load --> Norm[NormalizeBrief]
  Norm --> Idea[IdeationAgent]
  Idea --> VerI[ConsistencyVerifier ideas]
  VerI -->|fail refine max 2| Idea
  VerI -->|ok| Draft[PersistIdeasDraft]
  Draft --> Hitl[status awaiting_hitl + SSE run.hitl]
  Hitl --> User[POST .../hitl selectedIdeaIds]
  User --> Write[ContentWriterAgent]
  Write --> VerC[ConsistencyVerifier content]
  VerC -->|fail refine max 2| Write
  VerC -->|ok| Pers[PersistContent]
  Pers --> Done[completed + SSE]
```

HITL nie woła LLM; nowe `RequestId` pojawia się w odpowiedzi HTTP `.../hitl`. Po resume kolejne hopy LLM nadal z tym samym `ConversationId`.

---

## 5. Korelacja ID (run agentowy)

```mermaid
flowchart TB
  HTTP[POST /runs] -->|odpowiedź api: requestId + runId + conversationId| Client
  subgraph run ["Jeden run"]
    CID[ConversationId stały]
    A1[IdeationAgent]
    A2[ConsistencyVerifier]
    A3[ContentWriter / Refine]
    CID --- A1
    CID --- A2
    CID --- A3
    A1 -->|requestId z odp. gateway| L1[run.log]
    A2 -->|requestId z odp. gateway| L2[run.log]
    A3 -->|requestId z odp. gateway| L3[run.log]
  end
```

| ID | Źródło | Rola |
|----|--------|------|
| `RunId` | `apps/api` przy starcie | cały run |
| `ConversationId` | `apps/api` przy starcie | oś wszystkich hopów LLM |
| `RequestId` (HTTP) | odpowiedź `apps/api` | debug pojedynczego HTTP |
| `RequestId` (LLM) | odpowiedź gateway | kotwica logów LLM per agent |

Szczegóły: `brand_types.md`.

---

## 6. Ścieżki błędu (skrót)

| Sytuacja | Przepływ danych |
|----------|-----------------|
| Kontekst niekompletny | Brak grafu; **409** `CONTEXT_INCOMPLETE`; brak `ConversationId` runu |
| Błąd / timeout gateway | Log kroku (bez `requestId` przy braku odpowiedzi); po polityce retry lub **`failed`** + SSE `run.failed` |
| Verifier fail po `max N=2` | **`failed`**; w logach czytelny powód (kontekst i/lub język) |
| HITL na runie nie w `awaiting_hitl` | **409** `HITL_REQUIRED` / `CONFLICT` |

---

## ConsistencyVerifier — checklista (norma)

Jeden węzeł, dwa obszary (opcja B — bez osobnego LanguageQualityVerifier w MVP):

1. **Kontekst firmy** — nazwy / oferta / ton / CTA / brak sprzeczności z DB.  
2. **Język** — gramatyka, interpunkcja, składnia (dla `pl` / `en` runu).

Werdykt: `ok` albo konkretne poprawki dla Refine*. W logu / SSE rozróżnialne powody faila (kontekst vs język), nawet gdy to jeden hop LLM.

---

## Logi vs metryki

| Kanał | Co niesie |
|-------|-----------|
| `run.log` + SSE | Przebieg domenowy jednego runu (kroki, ID, treść diagnostyczna) |
| `GET /metrics` | Ops procesu `apps/api` (Prometheus) — nie zamiennik logów runu |

---

## Poza zakresem tego dokumentu

- Osobny węzeł `LanguageQualityVerifier`
- Rolki, Web/blog, YouTube
- Pełne szablony promptów (treść plików w `social/infrastructure/prompts/`)
- OpenTelemetry jako wymóg MVP
- Szczegóły scrapowania Prometheus / alerty → `deployment.md`, `observability.md`
- Widoki UI → `ux_dashboard.md`
