---
wersja: 2
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-15
---

# SPEC — Social

## Cel / zakres względem dokumentacji

Norma bounded contextu **Social** w `apps/api`: pipeline post ideas / post content, weryfikacja spójności, refine, HITL vs full-auto.

Uszczegóławia wyjątek orchestracji z `docs/architektura.md`, przepływy z `docs/data_flow.md` oraz taski/platformy z `docs/dokumentacja_komunikacji.md`. Social jest **jednym modułem** monolit — nie uniwersalnym orkiestratorem firmowym.

## Powiązanie ze stylem z docs / wyjątek

Wiążące:

- controllery i application jak w innych BC (cienkie HTTP → use-case);
- **wyjątek:** pipeline SM = **LangGraph** w `social/infrastructure/graph/`, ukryty za fasadą application service;
- LLM wyłącznie przez port → gateway (`SPEC-KOMUNIKACJA.md`);
- bramka kontekstu przed startem (`SPEC-KONTEKST-FIRMY.md`); cykl życia runu / logi / SSE — BC Runs (`SPEC-RUNY.md`), Social dopina węzły i wyniki SM.

**Wyjątek względem stylu globalnego:** tak — wyłącznie orchestracja grafem za fasadą; **nie** wolno przenosić grafu do controllera ani reguł SM do FE/gateway.

## Taski MVP (twarde)

| `taskType` | Zachowanie |
|------------|------------|
| `post_ideas` | full-auto → lista pomysłów |
| `post_content` | full-auto → treść (z podanymi / wybranymi ideas) |
| `post_ideas_then_content` | ideas → **HITL** → content |

Platformy: `linkedin` \| `facebook` \| `instagram`. Język: `pl` \| `en`.

## Wymagania (egzekwowalne)

S-1. Start / wznowienie pipeline’u wyłącznie przez **application service** (fasada). Controller nie woła LangGraph ani nie ładuje promptów.

S-2. Graf i węzły żyją w `apps/api/src/social/infrastructure/graph/`. Szablony promptów w `.../infrastructure/prompts/` — **wymagane** jako pliki szablonów (nie stringi hardcoded w controllerze).

S-3. Każdy węzeł LLM produkuje **structured output** walidowany schemą (Zod lub równoważny JSON Schema → parse) przed dalszym krokiem. Porażka parse = błąd kroku / refine / `failed` wg polityki — nie „cichy” tekst do UI.

S-4. `ConsistencyVerifier` — **jeden** węzeł, dwa obszary: (1) spójność z kontekstem firmy, (2) język (gramatyka, interpunkcja, składnia dla `pl`/`en`). Osobny `LanguageQualityVerifier` — **poza MVP**.

S-5. Po fail verifiera: Refine* z twardym limitem **`max N=2`**, potem `failed`. Zakaz nieskończonej pętli.

S-6. HITL (**model B** — samodzielne zarządzanie pauzą):

1. Faza ideas kończy **invoke** grafu po `PersistIdeasDraft`.
2. Application ustawia run `awaiting_hitl` i zapisuje w DB stan potrzebny do resume (draft pomysłów, `conversationId`, metadane fazy, liczniki refine itd.) — **kanonicznie w Run / powiązanych tabelach Prisma**, nie w pliku JSON i nie w checkpointerze LangGraph.
3. `POST .../hitl` waliduje stan `awaiting_hitl`, zapisuje wybór, uruchamia **nowy invoke** fazy content (osobny graf lub ten sam z jawnym entry fazy).
4. Idempotencja: ponowny HITL gdy run nie jest w `awaiting_hitl` → `409` `HITL_REQUIRED` / `CONFLICT`.

S-7. Taski jednoetapowe (`post_ideas`, `post_content`) — bez pauzy HITL.

S-8. Każdy hop LLM: ten sam `ConversationId` runu w body gateway; `requestId` z odpowiedzi gateway → log kroku (`SPEC-KOMUNIKACJA.md`).

S-9. W MVP **zakaz** checkpoinetera LangGraph (`SqliteSaver` / MemorySaver jako store HITL). Persistence pauzy = model B powyżej. (Natywny checkpointer = świadoma decyzja później, poza tym SPEC.)

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/social/
├── social.module.ts
├── social.controller.ts              # cienkie HTTP (jeśli wydzielone; albo Runs jako wejście)
├── application/                      # StartSocialRun, ResumeAfterHitl, …
├── domain/                           # typy ideas/content, polityki limitu refine, porty
└── infrastructure/
    ├── graph/                        # LangGraph: definicje faz / węzłów
    ├── prompts/                      # szablony
    └── persistence/                  # zapis wyników SM via porty/Prisma
```

| Element | Norma |
|---------|--------|
| Orchestracja | LangGraph.js za fasadą |
| LLM w węzłach | przez port `LlmGateway` (nie SDK vendora) |
| Structured output | Zod (preferowane; spójne z application w `SPEC-KOMUNIKACJA.md`) na wyjściach agentów |
| HITL | granica między invoke; stan w DB (B) |
| Węzły bazowe (docs) | `LoadContext`, `NormalizeBrief`, `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `RefineIdeas` / `RefineContent`, `Persist*` |

Odwołanie do możliwości checkpoinetera LangGraph (świadomie **niewykorzystane** w MVP): [LangGraph Persistence](https://docs.langchain.com/oss/javascript/langgraph/persistence). Structured output: schematy Zod przy parse odpowiedzi modelu / [LangChain structured output](https://docs.langchain.com/oss/javascript/langchain/structured-output) — z uwzględnieniem, że transport LLM idzie przez gateway, nie bezpośrednio `ChatOpenAI`.

### Fazy invoke (model B)

```text
post_ideas_then_content:
  invoke A (ideas + verifier + persist draft) → awaiting_hitl
  HITL HTTP
  invoke B (content + verifier + persist) → completed | failed

post_ideas / post_content:
  pojedynczy invoke → completed | failed
```

Application odpowiada za wybór fazy, złożenie inputu z DB i zakaz ponownego odpalenia fazy ideas przy resume content.

### Wolno

- Jeden skompilowany graf z jawnym parametrem fazy **albo** dwa grafy (ideas / content) — byle norma B i S-6 były spełnione.
- Współdzielić węzeł `ConsistencyVerifier` między ideas i content.
- Logować w `run.log` rozróżnienie faila verifiera: kontekst vs język.

### Nie wolno

- Wołać LangGraph / ładować prompty z controllera.
- Pomijać `ConsistencyVerifier`.
- Refine bez limitu `max N=2`.
- Synchronicznie blokować HTTP na cały pipeline LLM.
- Trzymać stan HITL w pliku JSON ani wyłącznie w pamięci procesu.
- Używać checkpoinetera LangGraph jako store pauzy w MVP.
- Mikroserwisów per agent w MVP.
- Reguł SM / bramki w FE lub w gateway.
- Wołania vendorów LLM z pominięciem gateway.
- Rozszerzania MVP o rolki / YouTube / blog / pipeline builder w tym SPEC.
- Re-invoke grafu ani zmiany węzłów z powodu oceny gwiazdkowej, flagi edycji outputu lub opinii tekstowej (to Runs / Feedback po `completed`/`failed`).

Zmiana względem wersji 1: dopisano zakaz re-invoke grafu z powodu oceny / edycji / opinii (to Runs / Feedback).

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| **LangGraph.js** + **LangChain.js** | obowiązkowe (wersje major przy scaffoldzie; bez pinu w SPEC) |
| Prompty jako pliki w `infrastructure/prompts/` | obowiązkowe |
| Structured output (Zod) na wyjściach LLM | obowiązkowe |
| HITL model **B** (stan w Run/DB, bez checkpoinetera) | obowiązkowe |
| ConsistencyVerifier (1 węzeł, 2 obszary) | obowiązkowe |
| LanguageQualityVerifier / checkpointer LangGraph / uniwersalny orkiestrator | poza MVP |

## Kryteria akceptacji

- [ ] `post_ideas` full-auto: completed + ideas w DB + logi z `conversationId` / `requestId` hopów.
- [ ] `post_ideas_then_content`: po ideas status `awaiting_hitl` + draft w DB; po HITL content → completed; restart procesu api nie gubi draftu HITL (stan w DB).
- [ ] Verifier fail → refine ≤ 2, potem `failed` z czytelnym powodem (kontekst i/lub język).
- [ ] Węzły LLM zwracają dane po walidacji Zod (lub równoważnej); złamany kształt nie trafia do wyniku „sukces”.
- [ ] Brak checkpoinetera LangGraph i brak JSON-pliku jako store HITL.
- [ ] Controller bez promptów i bez bezpośredniego `graph.invoke`.

## Poza zakresem

- Cykl życia statusów runu, emisja SSE, kanoniczny model logów → `SPEC-RUNY.md`.
- Treść merytoryczna promptów (copy szablonów).
- LanguageQualityVerifier jako osobny węzeł.
- Checkpointer LangGraph / B+C.
- Uniwersalny orkiestrator agentowy firmy, pipeline builder, kolejne kanały contentowe.
- UI HITL / animacje → `SPEC-FRONTEND.md`.
- Ocena gwiazdkowa, flaga edycji outputu, opinie tekstowe → `SPEC-RUNY.md` / `SPEC-FEEDBACK.md`.
