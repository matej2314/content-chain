---
wersja: 3
data_utworzenia: 2026-08-31
data_modyfikacji: 2026-09-01
---

# SPEC — Content (BC)

## Cel / zakres względem dokumentacji

Norma bounded contextu **Content** w `apps/api`: generowanie copy stron / long-form w **podstawowej formie** (`page_copy`, `page_outline_then_copy`), weryfikacja spójności, refine, HITL vs full-auto.

Uszczegóławia BC Content z `docs/architektura.md`, przepływy z `docs/data_flow.md` (§4d / §4e) oraz unię startu z `docs/dokumentacja_komunikacji.md`. **Nie** mylić z nazwą produktu Content Chain (`docs/dictionary.md`).

Content jest **jednym bounded contextem** pipeline’u stron w monoliticie — nie orkiestratorem cyklu życia runu (to Runs) i **nie** częścią Social.

## Powiązanie ze stylem z docs / wyjątek

Wiążące:

- controllery i application jak w innych BC (cienkie HTTP → use-case);
- **wyjątek:** pipeline Content = **LangGraph** w `content/infrastructure/graph/`, ukryty za fasadą application service — ten sam wyjątek stylu co Social (`docs/architektura.md`);
- LLM wyłącznie przez port → gateway (`SPEC-KOMUNIKACJA.md`);
- bramka kontekstu przed **każdym** `POST /runs` (`SPEC-KONTEKST-FIRMY.md` C-5); cykl życia runu / logi / SSE — BC Runs (`SPEC-RUNY.md`);
- Content zależy od **portu** lifecycle Runs oraz implementuje `RunExecutorPort`; binding tokenu — klej procesu (composite).

**Wyjątek względem stylu globalnego:** tak — wyłącznie orchestracja grafem za fasadą; **nie** wolno przenosić grafu do controllera ani reguł Content do FE/gateway. Brak wyjątku względem Social: ten sam wzorzec warstw.

## Taski MVP (podstawowa forma)

| `taskType` | Zachowanie |
|------------|------------|
| `page_copy` | full-auto → dokument (wg `contentKind`) |
| `page_outline_then_copy` | outline → **HITL** (akceptacja całego outline’u; `POST .../hitl`, `selectedIdeaIds` = dokładnie `[outline.id]`) → pełny dokument |

`ContentKind`: `blog` \| `service_page` \| `landing`. Język: `pl` \| `en`.

`platform` HTTP **zakazane**. Kolumna `Run.platform` = sentinel `'web'` (`RunPlatform`; **nie** `SocialPlatform`).

## Wymagania (egzekwowalne)

Ctn-1. Start / wznowienie pipeline’u wyłącznie przez **application service** (fasada). `ContentModule` **nie** rejestruje controllera HTTP. Wejście produktowe to trasy Runs (`POST /runs`, `POST .../hitl`). Żaden controller nie woła LangGraph ani nie ładuje promptów.

Ctn-2. Graf i węzły żyją w `apps/api/src/content/infrastructure/graph/`. Szablony promptów w `.../infrastructure/prompts/` — **wymagane** jako pliki szablonów.

Ctn-3. Każdy węzeł LLM produkuje **structured output** walidowany schemą Zod przed dalszym krokiem. Porażka parse = błąd kroku / refine / `failed` — nie cichy tekst do UI. Semantyka jak S-3 w `SPEC-SOCIAL.md`.

Ctn-4. `ConsistencyVerifier` — **jeden** węzeł, dwa obszary: (1) fakty firmy z kontekstu, (2) język (`pl`/`en`). Osobny `LanguageQualityVerifier` — **poza** tym SPEC. Refine* z twardym limitem **`max N=2`**, potem `failed`.

Ctn-5. HITL (**model B**):

1. Faza outline kończy **invoke** grafu po persist outline.
2. Application ustawia run `awaiting_hitl` i zapisuje stan w DB (`ContentOutline`, `conversationId`, metadane fazy) — **nie** checkpointer LangGraph.
3. `POST .../hitl` waliduje `awaiting_hitl` **oraz** selekcję: `selectedIdeaIds.length === 1` i `selectedIdeaIds[0] ===` id zapisanego `PageOutline`. Sukces: zapis selekcji, nowy invoke fazy `'copy'`. Porażka: **400** `HITL_INVALID_SELECTION`, bez zapisu, status zostaje `awaiting_hitl`. Brak outline w store → **409** `CONFLICT`. `POST /runs` dla `page_*` **nie** przyjmuje `selectedIdeaIds` (Zod / `.strict()`).
4. Idempotencja HITL jak `SPEC-SOCIAL.md` S-6.4.
5. Crash podczas execute → Runs `interrupted`; po `interrupted → running` Content re-invoke **fazy** z DB. Pauza HITL nie przechodzi w `interrupted`.

Zmiana względem wersji 1–2 / pkt 3: wcześniej „zapisuje `selectedIdeaIds`” bez sprawdzenia id; `docs/data_flow.md` §4e dopuszczał id sekcji. Od tej wersji kanon = wyłącznie `[outline.id]` (`docs/data_flow.md`, `docs/dokumentacja_komunikacji.md`).

Ctn-6. Task `page_copy` — bez pauzy HITL. `pipelinePhase` w kolumnie `Run`: `'outline'` \| `'copy'` (tylko `page_*`; **nie** reuse `'ideas'`).

Ctn-7. Każdy hop LLM: ten sam `ConversationId` runu; `requestId` z odpowiedzi gateway → log kroku (`SPEC-KOMUNIKACJA.md`).

Ctn-8. W MVP **zakaz** checkpoinetera LangGraph jako store pauzy.

Ctn-9. Port `ContentResultStore` jest **osobny** od Social. Tabele kanoniczne: `ContentOutline`, `ContentDocument` (`runId`, payload JSON, index `runId`). Snapshot HTTP: `result.pageOutline` / `result.pageDocument` (addytywne; nie łamać pól Social).

Ctn-10. Liczniki refine Content na `Run`: kolumny `outlineRefineCount` i `copyRefineCount` (`Int`, default `0`). `savePipelineState` / `getPipelineState` mapują domain **1:1** na te kolumny (update tylko `pipelinePhase` + te dwa pola — bez zapisu `ideasRefineCount` / `contentRefineCount`). Analogia do Ctn-6: osobny słownik stanu, bez reuse etykiet Social.

Zmiana względem wersji 1: SPEC milczał o kolumnach refine; szkic feature planu 4.2 zakładał reuse `ideasRefineCount` = outline i `contentRefineCount` = copy. Ta norma to unieważnia (`SPEC-PERSISTENCE.md` P-5 od v4).

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/content/
├── content.module.ts                 # bez controllers[]
├── application/                     # fasada, ContentRunExecutor
├── domain/                           # PageOutline, PageDocument, refine, port store
└── infrastructure/
    ├── graph/                        # LangGraph, węzły
    ├── prompts/                      # page-outline, page-writer, refine-*, verifier
    └── persistence/                  # Prisma adapter
```

| Element | Norma |
|---------|--------|
| Orchestracja | LangGraph.js za fasadą |
| LLM w węzłach | przez port `LlmGateway` (nie SDK vendora) |
| Structured output | Zod na wyjściach agentów |
| HITL | granica między invoke; stan w DB (B) |
| Węzły bazowe | `LoadContext`, `NormalizeBrief`, `OutlineAgent`, `PageWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`, `FailRun` |
| `compile()` | bez checkpoinetera |
| Domain | `PageOutline`; `PageDocument` (np. `title`, `lead`, `body`, `metaTitle?`, `metaDescription?`); faza `'outline'` \| `'copy'` |

Odwołanie: [LangGraph Persistence](https://docs.langchain.com/oss/javascript/langgraph/persistence) (świadomie **niewykorzystane**); structured output: [LangChain structured output](https://docs.langchain.com/oss/javascript/langchain/structured-output) — transport LLM przez gateway.

### Fazy invoke (model B)

```text
page_outline_then_copy:
  invoke A (outline + verifier + persist) → awaiting_hitl
  HITL HTTP
  invoke B (copy + verifier + persist) → completed | failed

page_copy:
  pojedynczy invoke (faza copy) → completed | failed
```

### Wolno

- Współdzielić wzorzec verifiera / refine `max N=2` ze Social (osobna instancja węzła w tym grafie).
- Importować kernel / token lifecycle Runs (jednokierunkowo) oraz eksportować `ContentRunExecutor` do kleju procesu.
- Implementować `RunExecutorPort` klasą w `content/application/` — bez rejestracji tokenu `RUN_EXECUTOR` **w** `RunsModule` przez import Content.

### Nie wolno

- Łańcucha 6 specjalistów (psychologia / sprzedaż / SEO jako osobne węzły-audytory) — V1.
- WordPress / eksportu `Jak_wrzucic_do_WordPressa.md`.
- Materiałów z folderu `Materiały/` jako produktu (wystarczą `brief.topic` + kontekst firmy).
- Reklamy (krótki copy) jako `ContentKind`.
- Importu `SocialModule` / `RunsModule` (pełnego HTTP+worker) z `ContentModule`.
- `forwardRef` Content ↔ Runs / Social.
- Rejestrować controller HTTP w `ContentModule`.
- Wołać LangGraph / ładować prompty z controllera.
- Pomijać `ConsistencyVerifier`.
- Refine bez limitu `max N=2`.
- Checkpoinetera LangGraph jako store HITL.
- Traktować `'web'` jako `SocialPlatform`.
- Re-invoke grafu z powodu oceny / flagi edycji / opinii (to Runs / Feedback).
- Zapisu refine fazy `'outline'` / `'copy'` do `Run.ideasRefineCount` / `Run.contentRefineCount` (Ctn-10).
- Invoke fazy `'copy'` przy `page_outline_then_copy`, gdy `selectedIdeaIds` nie jest dokładnie `[outline.id]` (Ctn-5).
- Przyjęcia `selectedIdeaIds` na `POST /runs` dla `page_*`.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| **LangGraph.js** + **LangChain.js** | obowiązkowe (jak Social; bez pinu major w SPEC) |
| Prompty jako pliki w `infrastructure/prompts/` | obowiązkowe |
| Structured output (Zod) na wyjściach LLM | obowiązkowe |
| HITL model **B** | obowiązkowe |
| ConsistencyVerifier (1 węzeł, 2 obszary) + refine `max N=2` | obowiązkowe |
| Executor Content jako adapter `RunExecutorPort`; Content → port lifecycle | obowiązkowe |
| Łańcuch audytorów / WordPress / checkpointer / self-register | poza MVP |

## Kryteria akceptacji

- [ ] `page_copy` full-auto: completed + `pageDocument` w DB + logi z `conversationId` / `requestId` hopów.
- [ ] `page_outline_then_copy`: po outline status `awaiting_hitl` + draft w `ContentOutline`; HITL z `[outline.id]` → dokument → completed; restart api nie gubi outline’u (stan w DB). HITL z obcym id → **400** `HITL_INVALID_SELECTION`, run zostaje `awaiting_hitl`.
- [ ] Verifier fail → refine ≤ 2, potem `failed` z czytelnym powodem.
- [ ] Węzły LLM zwracają dane po walidacji Zod; złamany kształt nie trafia do wyniku „sukces”.
- [ ] Recovery `interrupted` → re-invoke Content (właściwy BC po `taskType`).
- [ ] `ContentModule` bez `forwardRef(RunsModule)` i bez `controllers[]`; brak importu Social.
- [ ] Page run: DB `platform='web'`, `contentKind` ustawione.
- [ ] Refine page: kolumny `outlineRefineCount` / `copyRefineCount`; brak zapisu tych liczników do `ideasRefineCount` / `contentRefineCount`.

## Poza zakresem

- Cykl życia statusów runu, SSE, klej composite → `SPEC-RUNY.md`.
- Treść merytoryczna promptów (copy szablonów); źródło legacy `deprecated/` **nie** jest runtime.
- LanguageQualityVerifier jako osobny węzeł.
- YouTube, publikacja portali, WordPress, łańcuch 6 specjalistów.
- UI HITL / widok dokumentu → `SPEC-FRONTEND.md`.
- Ocena gwiazdkowa, flaga edycji, opinie → `SPEC-RUNY.md` / `SPEC-FEEDBACK.md`.
- Enum `PageWriterAgent` w `packages/shared` — kontrakt w docs/spec; implementacja shared = Faza 6.
