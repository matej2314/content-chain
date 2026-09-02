---
wersja: 9
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-02
---

# SPEC — Social

## Cel / zakres względem dokumentacji

Norma bounded contextu **Social** w `apps/api`: pipeline post ideas / post content **oraz** reel ideas / reel script, weryfikacja spójności, refine, HITL vs full-auto.

Uszczegóławia wyjątek orchestracji z `docs/architektura.md`, przepływy z `docs/data_flow.md` oraz taski/platformy z `docs/dokumentacja_komunikacji.md`. Social jest **jednym bounded contextem** pipeline’u SM w monoliticie — nie uniwersalnym orkiestratorem firmowym i **nie** orkiestratorem cyklu życia runu (to Runs). Blog / page copy **nie** należą do tego SPEC (`SPEC-CONTENT.md`).

Zmiana względem wersji 5: **zakaz** „rolki w tym SPEC” unieważniony — rolki **są** w Social (MVP). YouTube i blog nadal nie w tym pliku.

## Powiązanie ze stylem z docs / wyjątek

Wiążące:

- controllery i application jak w innych BC (cienkie HTTP → use-case);
- **wyjątek:** pipeline SM = **LangGraph** w `social/infrastructure/graph/`, ukryty za fasadą application service;
- LLM wyłącznie przez port → gateway (`SPEC-KOMUNIKACJA.md`);
- bramka kontekstu przed startem (`SPEC-KONTEKST-FIRMY.md`); cykl życia runu / logi / SSE — BC Runs (`SPEC-RUNY.md`), Social dopina węzły i wyniki SM;
- Social zależy od **portu** lifecycle Runs (token, nie klasa serwisu) oraz implementuje `RunExecutorPort`; binding tokenu executora — klej procesu (`docs/architektura.md`).

**Wyjątek względem stylu globalnego:** tak — wyłącznie orchestracja grafem za fasadą; **nie** wolno przenosić grafu do controllera ani reguł SM do FE/gateway.

## Taski MVP (twarde)

| `taskType` | Zachowanie |
|------------|------------|
| `post_ideas` | full-auto → lista pomysłów |
| `post_content` | full-auto → treść (z podanymi / wybranymi ideas) |
| `post_ideas_then_content` | ideas → **HITL** → content |
| `reel_ideas` | full-auto → lista pomysłów na rolki (`result.reelIdeas`) |
| `reel_script` | full-auto → scenariusz (`result.reelScript`) |
| `reel_ideas_then_scripts` | reel ideas → **HITL** (`selectedIdeaIds` z `reelIdeas`) → scenariusz |

Platformy: `linkedin` \| `facebook` \| `instagram` (katalog **nie** zwężamy dla rolek). Język: `pl` \| `en`.

**Poza tym SPEC:** YouTube, publikacja, `Reels_performance` jako produkt, osobny `LanguageQualityVerifier`, page copy (`SPEC-CONTENT.md`).

## Wymagania (egzekwowalne)

S-1. Start / wznowienie pipeline’u wyłącznie przez **application service** (fasada). `SocialModule` **nie** rejestruje controllera HTTP. Wejście produktowe to trasy Runs (`POST /runs`, `POST .../hitl`). Żaden controller nie woła LangGraph ani nie ładuje promptów.

Zmiana względem wersji 4 / S-1: wcześniejsza norma zakładała cienki `social.controller.ts` bez nowych tras. W kodzie plik i `controllers[]` nie istnieją — HTTP zostaje w Runs.

S-2. Graf i węzły żyją w `apps/api/src/social/infrastructure/graph/`. Szablony promptów w `.../infrastructure/prompts/` — **wymagane** jako pliki szablonów (nie stringi hardcoded w controllerze).

S-3. Każdy węzeł LLM produkuje **structured output** walidowany schemą (Zod lub równoważny JSON Schema → parse) przed dalszym krokiem. Porażka parse = błąd kroku / refine / `failed` wg polityki — nie „cichy” tekst do UI. Dla verifiera domena `contextIssues` / `languageIssues` pozostaje **`string[]`**. Parser **może** spłaszczyć element `{ itemId | item, quote?, issue }` do jednego stringa; liczba, pusta `{}` i obiekt bez tych pól nadal są nieważne.

Zmiana względem wersji 4 / S-3: dotychczas wyłącznie `z.array(z.string())` — żywy model często zwraca obiekty zarzutów; preprocess nie zmienia kontraktu domeny.

S-4. `ConsistencyVerifier` — **jeden** węzeł, dwa obszary: (1) spójność z kontekstem firmy, (2) język (gramatyka, interpunkcja, składnia dla `pl`/`en`). Osobny `LanguageQualityVerifier` — **poza MVP**. Na (1): oceniaj **znaczenie** (ten sam claim / ta sama akcja / ta sama grupa / ten sam ton), nie cytat 1:1. Fakty i **liczby wyłącznie z JSON kontekstu** — parafraza sformułowania wolna; nowa liczba, nowy case jako wynik firmy albo odwrócony sens metryki → odrzut. CTA: ta sama akcja co `cta.items[].label` (dowolny case, odmiana, parafraza tej akcji); odrzut gdy to inna akcja albo dwie sprzeczne. Fakty z `audience.profiles` wolno wpleść w hook / title / angle (liczba wewnątrz zakresu profilu jest OK); odrzut dopiero przy sprzeczności z profilem albo gdy treść opisuje inną grupę. Na (2): brak kropki na końcu haczyka / tytułu, pytanie retoryczne, pauza albo wielokropek oraz wielkość liter w CTA **nie** są same w sobie podstawą odrzutu; interpunkcja w `languageIssues` tylko gdy utrudnia odczyt.

Zmiana względem wersji 7 / S-4: dotychczas obszar (1) nie rozstrzygał CTA vs exact string — żywy sędzia odrzucał case i parafrazę tej samej akcji. Teraz: ten sam claim, nie 1:1; liczby nadal tylko z kontekstu. Treść copy promptu nadal poza tym SPEC (`verifier.prompt.md`). Zmiana względem wersji 4 / S-4 (dwa obszary, audience.profiles, interpunkcja SM) zostaje w mocy.

S-5. Po fail verifiera: Refine* z twardym limitem **`max N=2`**, potem `failed`. Zakaz nieskończonej pętli.

S-6. HITL (**model B** — samodzielne zarządzanie pauzą):

1. Faza ideas kończy **invoke** grafu po `PersistIdeasDraft`.
2. Application ustawia run `awaiting_hitl` i zapisuje w DB stan potrzebny do resume (draft pomysłów, `conversationId`, metadane fazy, liczniki refine itd.) — **kanonicznie w Run / powiązanych tabelach Prisma**, nie w pliku JSON i nie w checkpointerze LangGraph.
3. `POST .../hitl` waliduje stan `awaiting_hitl`, zapisuje wybór, uruchamia **nowy invoke** fazy content (osobny graf lub ten sam z jawnym entry fazy).
4. Idempotencja: ponowny HITL gdy run nie jest w `awaiting_hitl` → `409` `HITL_REQUIRED` / `CONFLICT`.
5. Crash procesu podczas **execute** (nie pauzy HITL) należy do Runs: leftover `running` → `interrupted` (`SPEC-RUNY.md` R-9). Po `interrupted → running` Social re-invoke **fazy** z trwałego stanu w DB (model B). Pauza HITL **nie** przechodzi w `interrupted`.

Zmiana względem wersji 2 / S-6: recovery procesu było milcząco poza Social; tu jawny podział — `interrupted` = Runs, re-invoke fazy po powrocie do `running` = Social.

S-7. Taski jednoetapowe (`post_ideas`, `post_content`, `reel_ideas`, `reel_script`) — bez pauzy HITL.

S-7a. Fazy invoke — **bez** nowej wartości `pipelinePhase` w DB. Unia zostaje `'ideas' \| 'content'`: dla rolek `'content'` **znaczy** fazę scenariusza. `resolvePhase`: `reel_script` → `'content'`; `reel_ideas_then_scripts` + niepuste `selectedIdeaIds` → `'content'`; analogia 1:1 do postów. `storedPhase` z DB zostaje pierwszym fallbackiem.

S-7b. Snapshot addytywny: posty — `result.ideas` / `result.content` **bez zmian** (`SocialIdea`, `SocialContent`). Rolki — `result.reelIdeas` / `result.reelScript` (nie wpychać scenariusza w `SocialContent`). `hitl.options` przy `reel_ideas_then_scripts` = `reelIdeas`. `ReelIdea`: `id`, `title`, `description`, `hook`, `durationSeconds` (`15` \| `30` \| `90`). `ReelScript`: `segments` (`startSeconds`, `endSeconds`, `onScreen`, `voiceover`), `cta`, `notes?`. Id pomysłu rolki: `idea_<uuid>` (bez nowego brandu w shared).

S-7c. Persistence rolek: **nie** reuse tabeli `SocialContent` na skrypt. Modele Prisma `SocialReelIdea`, `SocialReelScript` (payload JSON + `runId`). Port `SocialResultStore` rozszerzony (`listReelIdeas`, `getReelScript`). Prompty: `reel-ideas.prompt.md`, `reel-script.prompt.md`, `refine-reel-ideas.prompt.md`, `refine-reel-script.prompt.md`. Ten sam skompilowany graf; routing po `taskType` + `phase`. Katalog `FeedbackAgentKey` **bez** nowych kluczy w 4.1.

S-8. Każdy hop LLM: ten sam `ConversationId` runu w body gateway; `requestId` z odpowiedzi gateway → log kroku (`SPEC-KOMUNIKACJA.md`).

S-9. W MVP **zakaz** checkpoinetera LangGraph (`SqliteSaver` / MemorySaver jako store HITL). Persistence pauzy = model B powyżej. (Natywny checkpointer = świadoma decyzja później, poza tym SPEC.)

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/social/
├── social.module.ts                  # bez controllers[] — HTTP w Runs
├── application/                      # fasada invoke fazy, SocialRunExecutor (adapter RunExecutorPort)
├── domain/                           # typy ideas/content, polityki limitu refine, port store
└── infrastructure/
    ├── graph/                        # LangGraph: definicje faz / węzłów
    ├── prompts/                      # szablony postów **i** rolek
    └── persistence/                  # zapis wyników SM via porty/Prisma (w tym SocialReelIdea / SocialReelScript)
```

Zmiana względem wersji 3: drzewo `application/` sugerowało `StartSocialRun` / `ResumeAfterHitl` — te use-case’y HTTP zostają w Runs; Social = fasada grafu + executor.

Zmiana względem wersji 4: usunięto `social.controller.ts` z drzewa (plik i rejestracja Nest nie istnieją — zgodnie z kodem i `docs/architektura_katalogi_pliki.md`).

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
post_ideas_then_content / reel_ideas_then_scripts:
  invoke A (ideas + verifier + persist draft) → awaiting_hitl
  HITL HTTP
  invoke B (content lub scenariusz + verifier + persist) → completed | failed

post_ideas / post_content / reel_ideas / reel_script:
  pojedynczy invoke → completed | failed
```

Application odpowiada za wybór fazy, złożenie inputu z DB i zakaz ponownego odpalenia fazy ideas przy resume content.

### Wolno

- Jeden skompilowany graf z jawnym parametrem fazy **albo** dwa grafy (ideas / content) — byle norma B i S-6 były spełnione.
- Współdzielić węzeł `ConsistencyVerifier` między ideas i content.
- Logować w `run.log` rozróżnienie faila verifiera: kontekst vs język.
- Importować kernel / token lifecycle Runs (jednokierunkowo) oraz eksportować `SocialRunExecutor` do kleju procesu.
- Importować `SocialBrief` z `runs/domain`; po `isSocialTaskType` traktować run jako `SocialRunRecord` (narrowing). Domain / graf: `brief: SocialBrief` — **nie** płaski `RunBrief`, **nie** `ContentBrief`.
- Implementować `RunExecutorPort` klasą w `social/application/` — bez rejestracji tokenu `RUN_EXECUTOR` **w** `RunsModule` przez import Social.

### Nie wolno

- Wołać LangGraph / ładować prompty z controllera.
- Rejestrować controller HTTP w `SocialModule`.
- Pomijać `ConsistencyVerifier`.
- Refine bez limitu `max N=2`.
- Synchronicznie blokować HTTP na cały pipeline LLM.
- Trzymać stan HITL w pliku JSON ani wyłącznie w pamięci procesu.
- Używać checkpoinetera LangGraph jako store pauzy w MVP.
- Mikroserwisów per agent w MVP.
- Reguł SM / bramki w FE lub w gateway.
- Wołania vendorów LLM z pominięciem gateway.
- Rozszerzania tego SPEC o YouTube / blog / pipeline builder / WordPress. **Zmiana względem** wersji 5: rolki **są** w tym SPEC (nie „poza MVP”).
- Re-invoke grafu ani zmiany węzłów z powodu oceny gwiazdkowej, flagi edycji outputu lub opinii tekstowej (to Runs / Feedback po `completed`/`failed`).
- `forwardRef(() => RunsModule)` ani importu pełnego `RunsModule` (HTTP + worker + stub executor) z `SocialModule`.
- Importu `ContentModule` z `SocialModule` (i odwrotnie — `SPEC-CONTENT.md`).
- Importu `ContentBrief` / `ContentRunRecord` w węzłach grafu Social (wyjątek: test guarda executora na obcym `taskType` — fixture `makeContentRun`).
- Pola `brief: RunBrief` (jeden kształt SM bez unii) w `social.types.ts` / `SocialGraphState`.
- Eksportu `{ provide: RUN_EXECUTOR }` z Social **jako** powodu, by `RunsModule` robił `imports: [SocialModule]`.
- Zależności węzłów / hopu / fasady od klasy `RunLifecycleService` zamiast portu (`SPEC-RUNY.md`).

Zmiana względem wersji 8 / domain: import `RunBrief` z `runs/domain` w Social był legalnym skrótem przy jednym briefie. Od tej wersji obowiązuje `SocialBrief` i unia `RunRecord` (`SPEC-RUNY.md` R-3d).
Zmiana względem wersji 3: dopisano zakaz cyklu Nest z Runs (wcześniej tylko zakaz re-invoke z powodu oceny / edycji / opinii).
Zmiana względem wersji 6: dopisano zakaz importu `ContentModule` (rolki są w Social; page copy pozostaje w `SPEC-CONTENT.md`).

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| **LangGraph.js** + **LangChain.js** | obowiązkowe (wersje major przy scaffoldzie; bez pinu w SPEC) |
| Prompty jako pliki w `infrastructure/prompts/` | obowiązkowe |
| Structured output (Zod) na wyjściach LLM | obowiązkowe |
| HITL model **B** (stan w Run/DB, bez checkpoinetera) | obowiązkowe |
| ConsistencyVerifier (1 węzeł, 2 obszary) | obowiązkowe |
| Executor SM jako adapter `RunExecutorPort`; Social → port lifecycle (bez cyklu Nest) | obowiązkowe |
| LanguageQualityVerifier / checkpointer LangGraph / uniwersalny orkiestrator / self-register grafów | poza MVP |

## Kryteria akceptacji

- [ ] `post_ideas` full-auto: completed + ideas w DB + logi z `conversationId` / `requestId` hopów.
- [ ] `reel_ideas` full-auto: completed + `reelIdeas` w DB; `reel_ideas_then_scripts`: HITL na `reelIdeas`, potem `reelScript`.
- [ ] `post_ideas_then_content`: po ideas status `awaiting_hitl` + draft w DB; po HITL content → completed; restart procesu api nie gubi draftu HITL (stan w DB; status zostaje `awaiting_hitl`, nie `interrupted`).
- [ ] Verifier fail → refine ≤ 2, potem `failed` z czytelnym powodem (kontekst i/lub język).
- [ ] Węzły LLM zwracają dane po walidacji Zod (lub równoważnej); złamany kształt nie trafia do wyniku „sukces”.
- [ ] Brak checkpoinetera LangGraph i brak JSON-pliku jako store HITL.
- [ ] `SocialModule` bez `forwardRef(RunsModule)` i bez `controllers[]`; `RunsModule` bez importu Social.

## Poza zakresem

- Cykl życia statusów runu, emisja SSE, kanoniczny model logów → `SPEC-RUNY.md`.
- Treść merytoryczna promptów (copy szablonów).
- LanguageQualityVerifier jako osobny węzeł.
- Checkpointer LangGraph / B+C.
- Uniwersalny orkiestrator agentowy firmy, pipeline builder, YouTube, blog (page copy → `SPEC-CONTENT.md`).
- UI HITL / animacje → `SPEC-FRONTEND.md`.
- Ocena gwiazdkowa, flaga edycji outputu, opinie tekstowe → `SPEC-RUNY.md` / `SPEC-FEEDBACK.md`.
