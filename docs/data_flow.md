# Przepływy danych — Content Chain

Opis orkiestracji i ruchu danych w MVP. Kontrakty HTTP/SSE: `dokumentacja_komunikacji.md`. Identyfikatory: `brand_types.md`, `dictionary.md`.

## Zasady wspólne

- **DB kanoniczna** (Prisma/SQLite): kontekst firmy, użytkownicy, runy, wyniki, logi runu, **opinie tekstowe**, metadane oceny/edycji runu.
- **LLM wyłącznie** przez `apps/ai-provider-gateway`.
- **Korelacja runu agentowego:** jeden `RunId` + jeden `ConversationId`; `RequestId` HTTP z odpowiedzi `apps/api`; `RequestId` hopu LLM z odpowiedzi gateway (zapisywany w `run.log`).
- **Live UI:** SSE; snapshot logów i health/metrics — GET (patrz komunikacja).
- **Verifier:** węzeł `ConsistencyVerifier` — obowiązkowy; checklista: (1) kontekst firmy, (2) język (gramatyka, interpunkcja, składnia). Fail → Refine* z **`max N=2`**, potem z powrotem do **tego samego** `ConsistencyVerifier` (ocena poprawionego materiału). Nie wraca do `IdeationAgent` / `ContentWriterAgent`.

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
  API-->>FE: Set-Cookie cc_access + cc_refresh + body user/expiresIn + requestId
  FE->>API: kolejne wywołania (credentials / cookie jar)
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
  Gate -->|tak| Allow[POST /runs dozwolony — Social i Content]
```

Sekcje bramki: tożsamość, oferta, głos SM, CTA/kanały, odbiorca (`dokumentacja_koncepcyjna.md`).  
`user` tylko czyta / korzysta; edycja wyłącznie `admin`. **Jedna** bramka na cały `POST /runs` (C-5), także dla `page_*` i rolek.

---

## 3. Run jednoetapowy — `post_ideas` (full-auto)

Wejście: **`SocialBrief`** + platforma + język (`docs/dokumentacja_komunikacji.md`, `dictionary.md`). Brak HITL.

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
  Ref --> Ver
  Ver -->|fail i n equals max N| Fail[status failed + SSE]
  Ver -->|ok| Pers[PersistIdeas]
  Pers --> Done[status completed + SSE]
```

| Węzeł | Dane in | Dane out | LLM |
|-------|---------|----------|-----|
| `LoadContext` | — | kontekst z DB | nie |
| `NormalizeBrief` | `SocialBrief` z HTTP | brief znormalizowany (`topic.trim()`, `ideaCount` default 5 gdy puste) | nie / lekko |
| `IdeationAgent` | kontekst + brief | lista pomysłów | tak → gateway |
| `ConsistencyVerifier` | pomysły + kontekst | ok / lista poprawek (kontekst **i** język) | tak → gateway |
| `RefineIdeas` | pomysły + feedback | poprawione pomysły | tak → gateway |
| `PersistIdeas` | pomysły OK | rekord wyniku + logi | nie |

Każdy hop LLM: body `conversationId` = run; po odpowiedzi gateway → wpis `run.log` z `requestId` gateway.

Analogicznie **`post_content` (full-auto):** zamiast `IdeationAgent` / `RefineIdeas` → `ContentWriterAgent` / `RefineContent`; pętla refine tak samo wraca do `ConsistencyVerifier`. Wejście zawiera wybrane / podane idea(e).

Zmiana względem: wcześniejszy mermaid `Ref --> Idea` (oraz analogicznie powrót `RefineContent` do `ContentWriterAgent`). Powód: węzły generatora piszą nowy output z briefu i nadpisywałyby wynik Refine*; verifier ma ocenić poprawiony materiał.

---

## 4. Run dwuetapowy — `post_ideas_then_content` (HITL)

```mermaid
flowchart TB
  Start[POST /runs] --> Gate{Kompletność}
  Gate -->|tak| Load[LoadContext]
  Load --> Norm[NormalizeBrief]
  Norm --> Idea[IdeationAgent]
  Idea --> VerI[ConsistencyVerifier ideas]
  VerI -->|fail i n less than max N| RefI[RefineIdeas]
  RefI --> VerI
  VerI -->|fail i n equals max N| FailI[status failed + SSE]
  VerI -->|ok| Draft[PersistIdeasDraft]
  Draft --> Hitl[status awaiting_hitl + SSE run.hitl]
  Hitl --> User[POST .../hitl selectedIdeaIds]
  User --> Write[ContentWriterAgent]
  Write --> VerC[ConsistencyVerifier content]
  VerC -->|fail i n less than max N| RefC[RefineContent]
  RefC --> VerC
  VerC -->|fail i n equals max N| FailC[status failed + SSE]
  VerC -->|ok| Pers[PersistContent]
  Pers --> Done[completed + SSE]
```

Zmiana względem: wcześniejszy mermaid skracał pętlę do `VerI -->|fail refine max 2| Idea` oraz `VerC -->|fail refine max 2| Write` (powrót do generatora, bez węzła Refine*). Teraz jak §3 i graf: Refine* → ten sam ConsistencyVerifier.

HITL nie woła LLM; nowe `RequestId` pojawia się w odpowiedzi HTTP `.../hitl`. Po resume kolejne hopy LLM nadal z tym samym `ConversationId`.

---

## 4b. Run jednoetapowy — `reel_ideas` (full-auto)

Ten sam graf Social, **routing po `taskType` + `phase`**: `IdeationAgent` ładuje `reel-ideas.prompt.md`. Faza DB: `'ideas'`. Wynik: `result.reelIdeas` (nie `result.ideas`).

Przepływ jak §3 (`LoadContext` → `NormalizeBrief` → `IdeationAgent` → `ConsistencyVerifier` → `Refine*` `max N=2` → `PersistReelIdeas` → `completed`). Platforma: `linkedin` \| `facebook` \| `instagram`. Język: `pl` \| `en`.

`ReelIdea`: `id` (`idea_<uuid>`), `title`, `description`, `hook`, `durationSeconds` (`15` \| `30` \| `90`).

Analogicznie **`reel_script` (full-auto):** faza `'content'` **znaczy** fazę scenariusza (`SocialRunExecutor.resolvePhase`: `reel_script` → `'content'`). `ContentWriterAgent` ładuje `reel-script.prompt.md`. Wynik: `result.reelScript` (nie `SocialContent`). Persist: `SocialReelScript`.

`ReelScript`: `segments` (`startSeconds`, `endSeconds`, `onScreen`, `voiceover`), `cta`, `notes?`.

---

## 4c. Run dwuetapowy — `reel_ideas_then_scripts` (HITL)

Jak §4, z polami rolek:

```text
invoke A (reel ideas + verifier + persist) → awaiting_hitl
  hitl.options = reelIdeas (nie post-ideas)
POST .../hitl  { selectedIdeaIds }   # id z reelIdeas
invoke B (phase 'content' = scenariusz + verifier + persist) → completed | failed
```

`resolvePhase`: `reel_ideas_then_scripts` + niepuste `selectedIdeaIds` → `'content'`. `storedPhase` z DB zostaje pierwszym fallbackiem.

---

## 4d. Run jednoetapowy — `page_copy` (full-auto)

BC **Content** (`apps/api/src/content/`). Wejście: **`ContentBrief`** + `contentKind` (`blog` \| `service_page` \| `landing`); **bez** `platform` (kolumna DB = sentinel `'web'`). Faza: `'copy'`. Wynik: `result.pageDocument`.

`NormalizeBrief` (Content): `topic.trim()` oraz ewent. trim `angle` — **bez** defaultu `ideaCount` (to pole nie należy do `ContentBrief`). CTA z kontekstu firmy, nie z briefu.

Zmiana względem: wcześniejsze „brief + `contentKind`” bez rozróżnienia kształtu od `SocialBrief` (jeden obiekt SM z `ideaCount`).

```text
LoadContext → NormalizeBrief → PageWriterAgent → ConsistencyVerifier
  → Refine* (max N=2, z powrotem do verifiera) → PersistDocument → completed | failed
```

Verifier: ten sam wzorzec `max N=2` (fakty firmy + język). Recovery `interrupted` → re-invoke Content.

---

## 4e. Run dwuetapowy — `page_outline_then_copy` (HITL)

HITL model B: outline w tabeli `ContentOutline`; po HITL faza `'copy'`. `pipelinePhase` na `Run`: `'outline'` \| `'copy'` (wartość `'copy'` / `'outline'` tylko `page_*`). Wejście startu: **`ContentBrief`** + `contentKind` (jak §4d).

Kanon payloadu HITL (MVP): `hitl.options` = tablica z **jednym** elementem (cały `pageOutline`); `selectedIdeaIds` = dokładnie `[outline.id]`. Id sekcji (`osec_…`) **nie** są legalnym wyborem. Niezgodność → **400** `HITL_INVALID_SELECTION`; status zostaje `awaiting_hitl`. `POST /runs` dla `page_*` **nie** przyjmuje `selectedIdeaIds` (selekcja tylko na HITL — inaczej dałoby się pominąć fazę outline).

Zmiana względem: wcześniejszy zapis dopuszczał „id sekcji/wariantu **albo** id całego outline’u”. Obowiązuje wyłącznie id całego outline’u, z walidacją.

```text
invoke A (OutlineAgent + verifier + persist outline) → awaiting_hitl
  hitl.options = [pageOutline]
POST .../hitl  { selectedIdeaIds: [outline.id] }
invoke B (PageWriterAgent + verifier + persist document) → completed | failed
```

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

## 6. Recovery po restarcie api

Crash / restart procesu zostawia rekord w DB (status `running`); semafor `inFlight` ginie z pamięcią. Use-case recovery na bootcie **zanim** worker claimuje `queued`:

```mermaid
flowchart TB
  Crash[Crash procesu przy running] --> Leftover[DB: leftover running]
  Leftover --> Boot[onModuleInit recovery]
  Boot -->|attempts >= 3| Fail[failed + log]
  Boot -->|attempts poniżej capu| Int[status interrupted + recoveryAttempts plus 1]
  Int --> Slot{Wolny slot MAX_CONCURRENT_RUNS?}
  Slot -->|nie| Wait[zostaje interrupted]
  Slot -->|tak| Claim[interrupted to running]
  Claim --> Pipe[re-invoke fazy z DB model B]
  Wait --> Slot
  Queued[queued z POST] --> SlotQ{Slot i brak starszego interrupted?}
  SlotQ -->|tak| QRun[queued to running]
  SlotQ -->|nie| Queued
```

| Reguła | Norma |
|--------|--------|
| Źródło `interrupted` | wyłącznie leftover `running` na bootcie; nigdy `POST /runs` ani HITL |
| Leftover już `interrupted` | bez `recoveryAttempts++`; wraca do pompy |
| Drain | najpierw `interrupted`, potem FIFO `queued` |
| Cap | ten sam `MAX_CONCURRENT_RUNS` co przy `queued → running` |
| `awaiting_hitl` | bez zmian; nie zużywa puli recovery |

Szczegóły: `dictionary.md` (hasła `interrupted`, Recovery runu), `SPEC-RUNY.md` R-6 / R-9.

---

## 7. Ścieżki błędu (skrót)

| Sytuacja | Przepływ danych |
|----------|-----------------|
| Kontekst niekompletny | Brak grafu; **409** `CONTEXT_INCOMPLETE`; brak `ConversationId` runu |
| Błąd / timeout gateway | Log kroku (bez `requestId` przy braku odpowiedzi); po polityce retry lub **`failed`** + SSE `run.failed` |
| Verifier fail po `max N=2` | **`failed`**; w logach czytelny powód (kontekst i/lub język) |
| HITL na runie nie w `awaiting_hitl` | **409** `HITL_REQUIRED` / `CONFLICT` |
| `taskType` spoza enumu HTTP | **400** `VALIDATION_FAILED` (composite nie wołany) |
| Nieznany `taskType` w composite (wewnętrznie) | status `failed` + `UNKNOWN_TASK_TYPE` |
| Crash procesu przy `running` | Boot: `interrupted` (lub `failed` przy capie); claim pod `MAX_CONCURRENT_RUNS`; SSE `run.status` |
| Ocena / Edytuj / finalize gdy nie `completed`/`failed` | **409** `RUN_NOT_REVIEWABLE` |
| Zmiana oceny lub flagi po finalize | **409** `REVIEW_LOCKED` |
| Ocena / edycja / opinia o runie obcej osoby | **403** `FORBIDDEN` |
| `GET /runs/user/:userId` z cudzym id | **403** `FORBIDDEN` |

---

## 8. Przegląd runu i opinie (po pipeline)

Po `completed` albo `failed` (także gdy autor edytował output) — **poza grafem**:

```text
status completed | failed
  → autor: gwiazdki 1–5 albo zostaw null; opcjonalnie Edytuj → outputEdited=true
  → Zamknij/zapisz przegląd → reviewFinalizedAt; dalsze zmiany oceny/flagi zablokowane
```

Opinia tekstowa (`POST /feedback`) jest niezależna od finalize runu (append; target aplikacja / agent / run). Katalog agentów = stały enum, nie węzły `LoadContext` / `Persist*` / `Refine*`.

Nie mylić z HITL (wybór pomysłów w trakcie pipeline).

---

## ConsistencyVerifier — checklista (norma)

Jeden węzeł, dwa obszary (opcja B — bez osobnego LanguageQualityVerifier w MVP):

1. **Kontekst firmy** — nazwy / oferta / ton / CTA / brak sprzeczności z DB. Sędzia ocenia **znaczenie** (ten sam claim / ta sama akcja), nie cytat 1:1. Fakty i liczby wyłącznie z JSON kontekstu (parafraza sformułowania wolna; nowa liczba albo odwrócony sens metryki → odrzut). CTA: ta sama akcja co `cta.items[].label` (dowolny case, parafraza tej akcji); inna akcja → odrzut.  
2. **Język** — gramatyka, interpunkcja, składnia (dla `pl` / `en` runu). Wielkość liter w CTA to nie błąd językowy.

Werdykt: `ok` albo konkretne poprawki dla Refine*. W logu / SSE rozróżnialne powody faila (kontekst vs język), nawet gdy to jeden hop LLM.

Domena: `contextIssues` i `languageIssues` to **`string[]`**. Parser Zod (`verifierOutputSchema`) dodatkowo **spłaszcza** element w kształcie `{ itemId | item, quote?, issue }` do jednego stringa (`itemId — quote — issue`). Liczba, pusta `{}` albo obiekt bez tych pól → `STRUCTURED_OUTPUT_INVALID` (nie cichy tekst).

Na obszarze kontekstu: fakty z `audience.profiles` (np. seed, wielkość zespołu) **wolno** wpleść w hook / title / angle jako perspektywę czytelnika — to nie jest wymyślony case firmy. Liczba wewnątrz zakresu profilu jest OK. Odrzut, gdy treść **przeczy** profilowi albo opisuje inną grupę.

Na obszarze języka: **nie** odrzucać haczyka ani tytułu za brak kropki na końcu, pytanie retoryczne albo pauzę / wielokropek zamiast kropki. Interpunkcja w `languageIssues` tylko gdy **utrudnia odczyt**.

---

## Logi vs metryki

| Kanał | Co niesie |
|-------|-----------|
| `run.log` + SSE | Przebieg domenowy jednego runu (kroki, ID, treść diagnostyczna) |
| `GET /metrics` | Ops procesu `apps/api` (Prometheus) — nie zamiennik logów runu |

---

## Poza zakresem tego dokumentu

- Osobny węzeł `LanguageQualityVerifier`
- YouTube, WordPress, łańcuch 6 specjalistów Content, `Reels_performance`
- Pełne szablony promptów (treść plików w `social/infrastructure/prompts/` i `content/infrastructure/prompts/`)
- OpenTelemetry jako wymóg MVP
- Szczegóły scrapowania Prometheus / alerty → `deployment.md`, `observability.md`
- Widoki UI → `ux_dashboard.md`
