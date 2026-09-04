# Słownik — Content Chain

Kanoniczne definicje pojęć domenowych i technicznych. Identyfikatory typów, kodów i pól API w backtickach; opisy po polsku.

Powiązane: `dokumentacja_koncepcyjna.md`, `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `observability.md`.

Zmiana względem wcześniejszej wersji tego dokumentu: lista BC uzupełniona o **Feedback**; HITL uściślony do **modelu B** (stan pauzy w DB); port LLM zlokalizowany w `apps/api/src/llm/`; Health rozróżnia api vs gateway; `DB kanoniczna` obejmuje opinie i metadane przeglądu; dopisano hasła cross-cutting, workera, recovery, korelacji hopu LLM oraz przeglądu. `FeedbackId` / `FeedbackTargetType` / `FeedbackAgentKey` / `RunUserRating` = kontrakt MVP w docs/spec (w `packages/shared` przy implementacji BC Feedback / przeglądu).

Zmiana względem definicji **MVP** / **V1 — rozbudowa** oraz kanałów: MVP obejmuje **Social (posty i rolki)** oraz **Content (BC)** w podstawowej formie (auth, dashboard, gateway, SQLite, fundament feedbacku zostają). **V1 — rozbudowa** = cutover PostgreSQL + panel odczytu opinii + publikacja na portalach SM + łańcuch audytorów Content + YouTube — **nie** „kolejne workflowy / rolki / blog”. Źródło: `dokumentacja_koncepcyjna.md` (legalizacja 2026-08-31).

Zmiana względem poprzedniego zbioru `RunStatus` (pięć wartości, recovery jako ponowne execute na leftover `running`): dopisano status **`interrupted`**. `MAX_CONCURRENT_RUNS` tnie **każdy** claim do `running` z `queued` oraz z `interrupted` (priorytet recovery nad nowymi POST). Burst execute wszystkich leftover `running` ponad cap **unieważniony**. HITL (`awaiting_hitl`) pozostaje osobnym use-casem.

Zmiana względem jednego „Brief SM” na cały `POST /runs`: kanon to **`SocialBrief`** vs **`ContentBrief`**; `Run.brief` to JSON unii, nie jeden obiekt z `ideaCount` dla `page_*`.

Zmiana względem luźnej listy „poza bramką”: kanon **`CompanyContextExtras`** (typowane `extras`); HITL Social dwuetapowy = dokładnie 1 id; addytywne pola wyniku SM (`cta?`, `characterCount`) i opcjonalne `role` na sekcji outline.

---

## Produkt i domena

| Pojęcie | Definicja |
|---------|-----------|
| **Content Chain** | Publiczna, self-hostowalna aplikacja agentowa do generowania treści **Social** (posty i rolki) oraz **Content (BC)** (copy stron / long-form) z weryfikacją względem kontekstu firmy, zapisem wyników i obserwowalnymi runami. |
| **Kontekst firmy** (`Company Context`) | Kanoniczny zestaw informacji o organizacji w DB (jedna instancja = jedna firma); wejście do generowania i weryfikacji spójności. |
| **Bramka kontekstu** / kompletność | Programowy warunek: wymagane sekcje kontekstu uzupełnione → start **każdego** `POST /runs` odblokowany (Social i Content); inaczej start runu zablokowany (`CONTEXT_INCOMPLETE`). Werdykt: `isComplete`. Jedna bramka na cały produkt w MVP (w tym głos SM dla page_* — świadome). |
| **`isComplete`** | Czysta funkcja domeny kontekstu: `{ complete, missing }` (`missing` = klucze niespełnionych sekcji bramki). Jedyny werdykt programowy przed startem runu; unit-testowalna bez DB/HTTP. |
| **Sekcje bramki** | Tożsamość, oferta (≥1 usługa + korzyść), głos SM, CTA/kanały, odbiorca — patrz docs koncepcyjne. |
| **`CompanyContextExtras`** | Opcjonalny obiekt `extras` kontekstu firmy **poza bramką**: `caseStudies?`, `objections?`, `hashtags?`, `catalogNotes?`, `performanceNotes?`. Walidacja kształtu (Zod `.strict()`); **nie** wchodzi do `missing` / `isComplete`. Brak danych = `null` / omit całego `extras` (preferowane względem pustych tablic). |
| **Post ideas** | Lista pomysłów na posty SM (`result.ideas`; `SocialIdea`: `id`, `title`, `angle`, `hook`, **`cta?`** — sugerowane CTA). |
| **Post content** | Gotowe copy posta (`result.content`; `SocialContent`: `body`, `hashtags`, `cta?`, **`characterCount`** — integer ≥ 0; kanon: pipeline ustawia z `body.length` po sukcesie writer/refine; wartość z LLM ignorowana / nadpisywana). |
| **Reel ideas** | Lista pomysłów na rolki (`result.reelIdeas`; `ReelIdea`: `id`, `title`, `description`, `hook`, `durationSeconds`, **`cta?`**). |
| **Reel script** | Scenariusz rolki (`result.reelScript`; `ReelScript`: `segments`, `cta`, `notes?`). **Nie** jest `SocialContent`. |
| **Page outline** | Szkic dokumentu strony (`result.pageOutline`) — faza HITL tasku `page_outline_then_copy`. Sekcja (`PageOutlineSection`): `id`, `heading`, `summary`, opcjonalnie **`role?`** (`audience_world` \| `pain` \| `challenger` \| `insight` \| `proof` \| `objection` \| `cta` \| `other`). |
| **Page document** | Pełny dokument copy strony/artykułu (`result.pageDocument`). |
| **Content (BC)** | Bounded context generowania copy stron / long-form (`page_copy`, `page_outline_then_copy`). **Nie** mylić z nazwą produktu Content Chain. |
| **`ContentKind`** | Rodzaj dokumentu Content: `blog` \| `service_page` \| `landing`. Wymagane przy taskach `page_*`; **zakazane** przy taskach Social. |
| **`SocialBrief`** | Brief runu Social (post_* / reel_*): `topic` (wymagane), `audience?`, `goal?`, `ideaCount?` (integer ≥ 1). **Nie** zawiera `angle` / `targetLength`. Definicja TypeScript: `apps/api/src/runs/domain/run.types.ts` — **nie** `packages/shared`. |
| **`ContentBrief`** | Brief runu Content (page_*): `topic` (wymagane), `audience?`, `goal?` (string, bez enumu w shared), `angle?` (kąt / Challenger), `targetLength?` (słowa, integer ≥ 1). **Nie** zawiera `ideaCount`. CTA **nie** jest polem briefu — źródło akcji: `cta.items` kontekstu firmy. `contentKind` jest na runie, nie w briefie. Definicja: ten sam plik `run.types.ts`. |
| **`Run.brief`** | Kolumna JSON na agregacie Run: **unia** `SocialBrief` \| `ContentBrief` rozróżniana `taskType` (nie jeden kształt SM). Jeden byt runtime; dwa kontrakty TypeScript / Zod. |
| **Brief SM** | Potocznie = **`SocialBrief`** + platforma + język na starcie runu Social. Zmiana względem: wcześniejsze hasło mieszało platformę/język z polami briefu i sugerowało jeden brief na wszystkie `taskType`. |
| **Weryfikacja spójności** | Krok pipeline’u sprawdzający treść względem kontekstu firmy przed uznaniem wyniku. W MVP = węzeł `ConsistencyVerifier` (także język). |
| **HITL** | Human-in-the-loop: pauza runu na wybór z listy, gdy kolejny krok zależy od selekcji (task dwuetapowy). W MVP: **HITL model B**. Social (`post_ideas_then_content` / `reel_ideas_then_scripts`): **dokładnie jeden** `selectedIdeaId` ∈ draftu / `hitl.options`; inaczej **400** `HITL_INVALID_SELECTION`. Content: jak wcześniej — `[outline.id]`. Zmiana względem: Social bez walidacji długości selekcji (multi bez semantyki wyniku). |
| **HITL model B** | Faza ideas kończy **invoke** grafu; stan pauzy (draft, `conversationId`, metadane fazy) kanonicznie w **DB**; `POST .../hitl` startuje **nowy invoke** fazy content. Zakaz checkpoinetera LangGraph jako store pauzy w MVP. Zmiana względem: wcześniejsze hasło HITL bez modelu persistence. |
| **Full-auto** | Wykonanie tasku jednoetapowego bez wymuszonej pauzy selekcji. |
| **Self-host** | Uruchomienie we własnej infrastrukturze operatora; licencja MIT. |
| **First-run** | Stan pustej instancji: `GET /api/v1/auth/bootstrap-status` → `available: true` → jednorazowy `POST .../bootstrap-admin`. Potem endpoint bootstrap trwale niedostępny. |
| **Agenci aktywni** | Sygnał UX: bramka `complete === true` (można startować runy produktowe: Social i Content). **Nie** oznacza „run w toku” (`running` / `awaiting_hitl` / `interrupted`). Odwrotnie: agenci nieaktywni / zablokowani = kontekst niekompletny. |
| **MVP** | Pierwszy kompletny slice produktowy: auth, dashboard, gateway, **SQLite**, logi, SSE, fundament feedbacku, **Social (posty i rolki)** oraz **Content (BC) w podstawowej formie**; w kontrakcie slice’u także typowane `extras`, HITL SM = 1 id, pola wyniku SM (`cta?`, `characterCount`) oraz opcjonalne `role` outline — **nie** kolejne workflowy. |
| **V1 — rozbudowa** | Faza **po MVP**: cutover persistence na **PostgreSQL** + panel odczytu opinii + publikacja na portalach SM + łańcuch audytorów Content + YouTube. **Nie** oznacza „kolejne workflowy / rolki / blog” (te kanały są w MVP). Nie mylić z prefiksem HTTP `/api/v1`. SQLite pozostaje silnikiem MVP **także** po dodaniu Content. |

## Role i tenancy

| Pojęcie | Definicja |
|---------|-----------|
| **`admin`** | Jedyny administrator (bootstrap); wyłączne prawo edycji kontekstu firmy; może generować treści jak `user`. Norma: `security.md`. |
| **`user`** | Rola uruchamiająca runy produktowe (Social i Content) i przeglądająca wyniki/logi; bez edycji kontekstu. |
| **Jedna firma / instancja** | Brak multi-tenant SaaS: wszyscy użytkownicy instancji dzielą jeden kontekst. |
| **Bootstrap admin** | Utworzenie pierwszego konta administratora przy starcie self-host (first-run). |

## Architektura i runtime

| Pojęcie | Definicja |
|---------|-----------|
| **Modularny monolit** | Trzy procesy w jednym monorepo (`apps/api`, `apps/frontend`, `apps/ai-provider-gateway`) ze wspólnym `packages/shared`. |
| **Cienki klient** | `apps/frontend`: UI + HTTP/SSE; **bez** reguł bramki, grafu Social / Content, Prisma i sekretów LLM. |
| **Port / adapter** | Granica I/O: domain/application zależą od portu. Prisma = adapter w `infrastructure` BC. Klient gateway = adapter HTTP w `apps/api/src/llm/` (port `LlmGateway`). Zmiana względem: wcześniejszy opis bez lokalizacji adaptera LLM. |
| **Port `LlmGateway`** | Port chat (i opcjonalnie stream) do `apps/ai-provider-gateway`; jedyna droga `apps/api` do LLM. Wołają go BC (np. Social), nie kontrolery HTTP. |
| **Bounded context (BC)** | Obszar odpowiedzialności w `apps/api` z układem warstw HTTP → application → domain + porty → adaptery: **Auth**, **Company Context**, **Social**, **Content**, **Runs / Logs**, **Feedback**. **Nie** to samo co jeden plik `*.module.ts` Nest — jeden BC może mieć kernel + HTTP. Zmiana względem: lista bez Content (Content wchodzi w MVP, nie V1). |
| **Moduł Nest** | Jednostka DI (`@Module`). Import w **jedną** stronę jest legalny (Social → kernel lifecycle). Pętla `forwardRef` między BC grafu a Runs — zakaz (`architektura.md`, `anty_patterny.md`). |
| **Port lifecycle runu** | Port Runs: `appendLog` + `transition`. Wołają go węzły/fasada grafu. Token w `runs/domain/`; **nie** w `packages/shared`. |
| **Port `RunExecutor`** | Port Runs: `execute(run)`. W MVP: **composite** w kleju procesu — `taskType` Social → `SocialRunExecutor`; `taskType` Content → `ContentRunExecutor`; nieznany → `failed` z kodem `UNKNOWN_TASK_TYPE`. Binding tokenu = klej procesu, nie import grafu z `RunsModule`. |
| **Port `RunResultReader`** | Port odczytu wyniku runu (snapshot GET). W MVP: **composite** w kleju — składa **addytywny** snapshot: `ideas` / `content` (posty), `reelIdeas` / `reelScript` (rolki), `pageOutline` / `pageDocument` (Content). Brak kanału = pusta tablica / `null` (nie null-crash). Binding jak executora — composition root, nie import grafu z `RunsModule`. |
| **Klej procesu (composition root)** | Spięcie tokenów Nest przy starcie `apps/api` (`AppModule` / `registerAsync`). **Nie** bounded context i **nie** `health/` / `llm/`. |
| **Feedback (BC)** | Bounded context zapisu opinii tekstowych (`application` \| `agent` \| `run`). Bez LangGraph; panel odczytu = **V1 — rozbudowa**. **Nie** ocena gwiazdkowa, flaga edycji ani finalize (to Runs). |
| **LangGraph / graf** | Orchestracja pipeline’u za fasadą application service (nie w controllerze). MVP: osobny graf Social i osobny graf Content; **zakaz** fat Social (strony w `social/`). |
| **Async run** | Asynchroniczne wykonanie pipeline’u; klient dostaje `RunId`, postęp przez SSE. |
| **Worker in-process** | Wykonanie runu w procesie `apps/api` po `202`. Zakaz osobnego always-on workera OS i spawnu procesu per run w MVP. |
| **Limit współbieżności** | Globalny `MAX_CONCURRENT_RUNS` (domyślnie **3**) = maksymalna liczba równoległych **execute** w procesie api. Wejście w `running` z `queued` **oraz** z `interrupted` tylko przy wolnym slocie. Nowe POST ponad limit zostają `queued` (FIFO). W drain: najpierw `interrupted`, potem `queued`. `awaiting_hitl → running` (HITL) jest osobnym use-casem i **nie** jest tym capem w MVP. Brak limitu per-user w MVP. Zmiana względem: wcześniejszy opis capu wyłącznie dla nowych runów w `queued`. |
| **Gateway** (`ai-provider-gateway`) | Osobna aplikacja — jedyna droga `apps/api` do vendorów LLM; bez domeny Content Chain. |
| **`packages/shared`** | Współdzielone typy kontraktu API i brand types (**bez** logiki biznesowej, **bez Zod** / runtime walidatorów). **Nie** mylić z `apps/api/src/shared/`. |
| **`apps/api/src/shared/`** | Cross-cutting wyłącznie wewnątrz api (env, envelope, interceptory). **Nie** zastępuje `packages/shared` i **nie** trzyma reguł Social / kontekstu firmy. |
| **Moduły ops / LLM (nie-BC)** | `apps/api/src/health/`, `metrics/`, `llm/` — powierzchnia ops i klient gateway. **Nie** bounded contexty: brak układu `application` / `domain` / `infrastructure` jak w BC. |
| **Prisma / SQLite** | Adapter persistence **MVP**; ORM tylko w infrastructure. |
| **PostgreSQL** | Silnik od fazy **V1 — rozbudowa** (ops / skala). **Nie** jest warunkiem dodania Content — Content działa na SQLite w MVP. |
| **DB kanoniczna** | Baza jako źródło prawdy dla kontekstu firmy, userów, sesji refresh, runów, wyników Social (posty i rolki) i Content, logów UI, **opinii tekstowych** oraz metadanych przeglądu (`userRating`, `outputEdited`, `reviewFinalizedAt`). Nie cichy fallback z plików. |

## Run, statusy, taski

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Brandowany ID runu; format `run_<uuid>`. |
| **`RunStatus`** | `queued` \| `running` \| `interrupted` \| `awaiting_hitl` \| `completed` \| `failed`. |
| **`RunTaskType`** | Social: `post_ideas` \| `post_content` \| `post_ideas_then_content` \| `reel_ideas` \| `reel_script` \| `reel_ideas_then_scripts`. Content: `page_copy` \| `page_outline_then_copy`. |
| **`SocialPlatform`** | `linkedin` \| `facebook` \| `instagram`. **Nie** zawiera `'web'`. |
| **`RunPlatform`** | `SocialPlatform` \| `'web'`. Kolumna `Run.platform` (NOT NULL): przy `page_*` sentinel **`web`** (wartość kolumny, nie wartość enumu SM). Application nigdy nie traktuje `'web'` jako `SocialPlatform`. |
| **`ContentLanguage`** | `pl` \| `en`. |
| **`interrupted`** | Status recovery: execute w procesie api zostało przerwane (crash/restart); pipeline **nie leci**, ale to **nie** jest nowa pozycja FIFO z `POST /runs`. Powstaje wyłącznie na bootcie z leftover `running`. Legalne wyjścia: `interrupted → running` (wolny slot) albo `interrupted → failed` (cap recovery). Zakaz `interrupted → queued`. Nie mylić z `queued` ani z `awaiting_hitl`. |
| **`startedBy`** | Inicjator runu (sesja). Lista/snapshot; authz oceny, Edytuj, opinii o runie i `GET /runs/user/:userId`. Po auth nowe runy zawsze z inicjatorem. |
| **Log runu** | Czytelny wpis w DB powiązany z `RunId`, zwykle też z `ConversationId` oraz `RequestId` **tego kroku**; źródło prawdy dla UI. |
| **Logi procesu (Pino)** | Strukturalne logi stdout `apps/api` (request HTTP, crash, start) przez `nestjs-pino`. **Nie** zamiennik kanonicznych logów runu w DB. |
| **Hop LLM** | Jedno wywołanie gateway w kroku agenta / refine. Własny `RequestId` z **odpowiedzi** gateway; wspólny `ConversationId` runu. |
| **Ocena runu** | Pole `userRating` (typ `RunUserRating` \| `null`): zawsze obecne; `null` gdy autor nie zostawił gwiazdek; `1`…`5` gdy zostawił. Po **finalize** niemutowalne. |
| **Flaga edycji outputu** | `outputEdited`: czy autor użył Edytuj na wyniku agentów (bez stopnia / diff w MVP). |
| **Edytuj** | Akcja UI po pipeline (`completed` / `failed`): ustawia `outputEdited: true`. **Nie** HITL i **nie** nadpisuje wyniku agentów w DB w MVP. Tylko `startedBy`, dopóki przegląd otwarty. |
| **Przegląd runu** | Do zatwierdzenia autor może zmieniać gwiazdki i oznaczać edycję; `POST .../finalize-review` zamyka i blokuje dalsze zmiany. |
| **`reviewFinalizedAt`** | Timestamp zamknięcia przeglądu. `null` = otwarty; po ustawieniu ocena i flaga edycji niemutowalne (`REVIEW_LOCKED`). |
| **Opinia (Feedback)** | Append-only wpis tekstowy BC Feedback: target `FeedbackTargetType`; metadane `authorId`, `createdAt`; panel odczytu = V1. **Nie** gwiazdki / `outputEdited` / finalize (to Runs). Zmiana względem: wcześniejsze hasło bez rozróżnienia rekordu vs BC vs przegląd. |
| **`FeedbackTargetType`** | `application` \| `agent` \| `run`. Przy `agent` obowiązkowe `agentKey`; przy `run` obowiązkowe `runId` autora (`startedBy`). Kontrakt MVP w docs/spec; w shared przy implementacji BC Feedback. |
| **`FeedbackAgentKey`** | Stały enum MVP: `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier` \| `PageWriterAgent`. Węzły `LoadContext`, `NormalizeBrief`, `Persist*`, `Refine*`, `OutlineAgent` **nie** są pozycjami tego katalogu. Kontrakt MVP w docs/spec; implementacja enumu w shared = Faza 6 (feedback). |
| **SSE runu** | Strumień zdarzeń: `run.status`, `run.log`, `run.hitl`, `run.completed`, `run.failed`. Po `run.completed` \| `run.failed` serwer **kończy** strumień. `awaiting_hitl` / `interrupted` nie kończą SSE. Reconnect tylko po nieoczekiwanym zerwaniu przy statusie nieterminalnym. Zmiana względem: wcześniejsze hasło wymieniało eventy bez cyklu życia połączenia. |
| **Snapshot logów** | `GET .../runs/:runId/logs` — historia; nie zastępuje SSE dla statusu live. |
| **Agent (węzeł pipeline’u)** | Krok grafu Social albo Content. Katalog bazowy Social: `LoadContext`, `NormalizeBrief`, `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`. Katalog bazowy Content: `LoadContext`, `NormalizeBrief`, `OutlineAgent`, `PageWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`. Wywołanie LLM (gdy dotyczy) = osobny hop do gateway. |
| **`ConsistencyVerifier`** | Jeden węzeł, dwa obszary: (1) spójność z kontekstem firmy, (2) język — gramatyka, interpunkcja, składnia dla `pl`/`en`. Osobny `LanguageQualityVerifier` = poza MVP. Fail → Refine*. |
| **Refine** | Ponowne wywołanie agenta po negatywnym werdykcie `ConsistencyVerifier`. Twardy limit **`max N=2`**, potem `failed`. Zakaz nieskończonej pętli. Zmiana względem: wcześniejsze „ograniczone `max N`” bez liczby. |
| **Structured output** | Wyjście węzła LLM walidowane schemą (Zod) zanim pójdzie dalej w grafie. Porażka parse = błąd kroku / refine / `failed` — nie cichy tekst do UI. |
| **Recovery runu** | Po restarcie / crashu api: leftover `running` → `interrupted` (`recoveryAttempts++`), potem claim `interrupted → running` pod `MAX_CONCURRENT_RUNS`. Leftover już `interrupted` (nie zdążył dostać slotu) — **bez** inkrementu, wraca do pompy. Do **3** prób wznowienia **fazy** z trwałego stanu w DB po powrocie do `running` (model B; nie dokończenie hopu LLM w locie). `awaiting_hitl` **nie** zużywa puli recovery. Po wyczerpaniu capu → `failed` + log. Zmiana względem: wcześniejsze recovery jako ponowne execute na leftover `running` bez statusu pośredniego i bez capu na claim. |
| **`isRetryable`** | Polityka domeny Runs: co wolno ponowić (recovery po crashu, timeout / rate-limit gateway wg polityki) vs czego nie (walidacja, wyczerpany refine verifiera, zła konfiguracja klucza gateway). |

## Identyfikatory i korelacja

Zmiana względem wcześniejszego, zbyt uproszczonego opisu: **`RequestId` nie jest jeden na cały run.** Formaty `req_<uuid>` / `conv_<uuid>` nadal jak w `ai-provider-gateway` (zgodność logów), ale semantyka zakresów jest jak poniżej.

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Jeden na async run produktowy (`run_<uuid>`). |
| **`ConversationId`** | Brand; format jak w gateway: `conv_<uuid>`. **Jeden wspólny na cały run agentowy** — nim spinamy wszystkie wywołania LLM i wpisy logów runu (aplikacyjne + gateway). |
| **`RequestId`** | Brand; format jak w gateway: `req_<uuid>`. Nadawany w **odpowiedzi**: przez `apps/api` (HTTP) albo przez gateway (hop LLM). Klient / kroki runu **nie** generują go z góry. Oś korelacji pipeline’u SM = `ConversationId` (+ `RunId`). |
| **`UserId`** | Brand; rekomendowany format `usr_<uuid>`. |
| **`FeedbackId`** | Brand; format `fbk_<uuid>`. Jeden wpis opinii tekstowej. Kontrakt MVP w docs/spec; w `packages/shared` przy implementacji BC Feedback. |
| **`RunUserRating`** | Brand `1` \| `2` \| `3` \| `4` \| `5`. W JSON runu pole `userRating` jest `number \| null` (`null` = brak gwiazdek). Kontrakt MVP w docs/spec; w shared przy implementacji przeglądu runu. |
| **`GatewayModelAlias`** | Brand aliasu modelu z konfiguracji gateway (≠ vendor `modelId`). |
| **`UserRole`** | `admin` \| `user`. |
| **Brand type** | Nominalny typ TypeScript (`Brand<K, Name>`) + walidacja na granicach; patrz `brand_types.md`. |

### Model korelacji logów (norma)

```text
RunId              ──────────────────────────────────────────►  cały run
ConversationId     ──────────────────────────────────────────►  wszystkie kroki LLM w runie (CC → body)
RequestId (HTTP)   ──► start / HITL / inne API (generuje apps/api)
RequestId (LLM₁)        ──► z odpowiedzi gateway po agencie 1
RequestId (LLM₂)              ──► z odpowiedzi gateway po agencie 2
RequestId (LLM₃)                    ──► z odpowiedzi gateway po agencie 3
```

Pełny przebieg LLM w logach = `RunId` + `ConversationId` + seria `RequestId` **nadanych przez gateway**. CC nie generuje `RequestId` „na zapas” pod wywołania chat.

## Komunikacja

| Pojęcie | Definicja |
|---------|-----------|
| **`/api/v1`** | Prefiks publicznego HTTP API Content Chain. |
| **Swagger `/docs`** | DX OpenAPI UI `apps/api`, **poza** `/api/v1`. Zakaz montowania pod `/api` (kolizja z prefiksem produktowym). |
| **JWT + httpOnly cookies** | Access w `cc_access` + refresh w `cc_refresh` (oba httpOnly) dla `apps/frontend` i Postmana; to samo auth dla SSE. Bez Bearer w MVP. |
| **Envelope błędu CC** | JSON: `{ code, message, requestId, details? }`. |
| **`x-request-id`** | Nagłówek korelacji HTTP **odpowiedzi** `apps/api` (to samo `RequestId` co w envelope). Klient **nie musi** go wysyłać. Przy chat/stream do gateway Content Chain **nie** ustawia tego nagłówka. |
| **Health** | CC: `GET /api/v1/health` — liveness procesu `apps/api`. Gateway (upstream): `GET /api/v1/health` oraz `GET /api/v1/health/ready`. Zmiana względem: wcześniejsze hasło tylko liveness api, bez rozróżnienia gateway. |
| **Metrics / Prometheus** | `GET /metrics` na `apps/api` — metryki operacyjne procesu; **nie** zamiennik logów runu. |
| **`X-Gateway-Key`** | Sekret klienta gateway; tylko po stronie `apps/api` / env, nigdy w bundlu frontu. |
| **Natywny czat gateway** | `POST /api/v1/chat` (i opcjonalnie `/chat/stream`) — domyślna ścieżka LLM z Content Chain. |

## Kody błędów — Content Chain API

| `code` | Znaczenie |
|--------|-----------|
| `UNAUTHORIZED` | Brak lub nieważna sesja. |
| `FORBIDDEN` | Brak uprawnień (np. `user` edytuje kontekst). |
| `VALIDATION_FAILED` | Błąd walidacji wejścia. |
| `CONTEXT_INCOMPLETE` | Bramka kontekstu niespełniona — start runu zablokowany. |
| `UNKNOWN_TASK_TYPE` | Composite executor dostał `taskType` poza unią Social \| Content (log + status `failed`; nie cichy no-op). HTTP spoza enumu → `VALIDATION_FAILED` (400), composite nie jest wołany. |
| `HITL_REQUIRED` | Konflikt względem oczekiwanego stanu HITL. |
| `NOT_FOUND` | Nieznana ścieżka HTTP / zasób na poziomie routera (np. goły HTTP 404). **Nie** mylić z `RUN_NOT_FOUND`. |
| `RUN_NOT_FOUND` | Nieznany `RunId` (wyłącznie z `DomainException` w BC Runs). |
| `REVIEW_LOCKED` | Przegląd runu już zatwierdzony — zmiana oceny / flagi edycji niedozwolona. |
| `RUN_NOT_REVIEWABLE` | Ocena / edycja / finalize gdy run nie jest `completed` ani `failed`. |
| `CONFLICT` | Niedozwolone przejście statusu / konflikt stanu. |
| `INTERNAL_ERROR` | Błąd nieobsłużony po stronie `apps/api`. |

## Kody błędów — gateway (istotne dla integracji)

Skrót z kontraktu `ai-provider-gateway`; pełny słownik w docs upstream. CC mapuje je na logi runu / `failed`.

| `code` | Znaczenie (skrót) |
|--------|-------------------|
| `GATEWAY_KEY_MISSING` | Brak nagłówka `X-Gateway-Key`. |
| `GATEWAY_KEY_INVALID` | Klucz poza allowlistą. |
| `MODEL_ALIAS_NOT_FOUND` | Nieznany alias modelu w konfiguracji gateway. |
| `VALIDATION_FAILED` | Błąd walidacji DTO gateway. |
| `RATE_LIMITED` | Limit po stronie gateway (smart rate limit / cooldown). |
| `PROVIDER_RATE_LIMITED` | Limit upstream providera. |
| `PROVIDER_TIMEOUT` | Timeout wywołania providera. |
| `PROVIDER_UNAVAILABLE` | Provider niedostępny / wyczerpane retry+fallback. |
| `TOOLS_NOT_SUPPORTED` | Tooling przy aliasie bez `capabilities.tools`. |
| `STREAMING_NOT_SUPPORTED` | Stream przy aliasie bez wsparcia streamingu. |
| `PROVIDER_AUTH_FAILED` | Błąd uwierzytelnienia do upstream providera (np. niepoprawny klucz vendora w env gateway). |
| `MODEL_NOT_ALLOWED` | Niedozwolony override w `params` wg policy `allowOverrides` aliasu (np. klient przesłał `temperature`, a alias nie dopuszcza nadpisania). |
| `PROVIDER_UNSUPPORTED` | Typ providera nie ma adaptera w gateway (konfiguracja). |
| `GATEWAY_KEY_NOT_CONFIGURED` | Brak allowlisty kluczy w runtime gateway (błąd konfiguracji serwera; HTTP 500). |
| `THINKING_NOT_SUPPORTED` | `thinkingEnabled: true` przy aliasie bez `capabilities.thinking`. |

## Poza zakresem słownika

- Pełna dokumentacja OpenAPI gateway (tylko skrót kodów powyżej).
- Opisy wdrożeniowe env — `deployment.md`.
- Anty-patterny opisowe — `anty_patterny.md`.
- Bezpieczeństwo / UX / metryki szczegółowo — `security.md`, `ux_dashboard.md`, `observability.md`.
