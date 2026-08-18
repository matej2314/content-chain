# Słownik — Content Chain

Kanoniczne definicje pojęć domenowych i technicznych. Identyfikatory typów, kodów i pól API w backtickach; opisy po polsku.

Powiązane: `dokumentacja_koncepcyjna.md`, `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `observability.md`.

Zmiana względem wcześniejszej wersji tego dokumentu: lista BC uzupełniona o **Feedback**; HITL uściślony do **modelu B** (stan pauzy w DB); port LLM zlokalizowany w `apps/api/src/llm/`; Health rozróżnia api vs gateway; `DB kanoniczna` obejmuje opinie i metadane przeglądu; dopisano hasła cross-cutting, workera, recovery, korelacji hopu LLM oraz przeglądu. `FeedbackId` / `FeedbackTargetType` / `FeedbackAgentKey` / `RunUserRating` = kontrakt MVP w docs/spec (w `packages/shared` przy implementacji BC Feedback / przeglądu).

Zmiana względem poprzedniego zbioru `RunStatus` (pięć wartości, recovery jako ponowne execute na leftover `running`): dopisano status **`interrupted`**. `MAX_CONCURRENT_RUNS` tnie **każdy** claim do `running` z `queued` oraz z `interrupted` (priorytet recovery nad nowymi POST). Burst execute wszystkich leftover `running` ponad cap **unieważniony**. HITL (`awaiting_hitl`) pozostaje osobnym use-casem.

---

## Produkt i domena

| Pojęcie | Definicja |
|---------|-----------|
| **Content Chain** | Publiczna, self-hostowalna aplikacja agentowa do generowania treści SM z weryfikacją względem kontekstu firmy, zapisem wyników i obserwowalnymi runami. |
| **Kontekst firmy** (`Company Context`) | Kanoniczny zestaw informacji o organizacji w DB (jedna instancja = jedna firma); wejście do generowania i weryfikacji spójności. |
| **Bramka kontekstu** / kompletność | Programowy warunek: wymagane sekcje kontekstu uzupełnione → flow’y SM odblokowane; inaczej start runu zablokowany (`CONTEXT_INCOMPLETE`). Werdykt: `isComplete`. |
| **`isComplete`** | Czysta funkcja domeny kontekstu: `{ complete, missing }` (`missing` = klucze niespełnionych sekcji bramki). Jedyny werdykt programowy przed startem runu; unit-testowalna bez DB/HTTP. |
| **Sekcje bramki** | Tożsamość, oferta (≥1 usługa + korzyść), głos SM, CTA/kanały, odbiorca — patrz docs koncepcyjne. |
| **Post ideas** | Lista pomysłów na posty SM (task / etap pipeline’u). |
| **Post content** | Gotowe copy posta (hook, body, CTA itd.). |
| **Brief SM** | Wejście użytkownika do runu: temat, grupa docelowa, cel, platforma, język, liczba pomysłów itd. |
| **Weryfikacja spójności** | Krok pipeline’u sprawdzający treść względem kontekstu firmy przed uznaniem wyniku. W MVP = węzeł `ConsistencyVerifier` (także język). |
| **HITL** | Human-in-the-loop: pauza runu na wybór z listy, gdy kolejny krok zależy od selekcji (task dwuetapowy). W MVP: **HITL model B**. |
| **HITL model B** | Faza ideas kończy **invoke** grafu; stan pauzy (draft, `conversationId`, metadane fazy) kanonicznie w **DB**; `POST .../hitl` startuje **nowy invoke** fazy content. Zakaz checkpoinetera LangGraph jako store pauzy w MVP. Zmiana względem: wcześniejsze hasło HITL bez modelu persistence. |
| **Full-auto** | Wykonanie tasku jednoetapowego bez wymuszonej pauzy selekcji. |
| **Self-host** | Uruchomienie we własnej infrastrukturze operatora; licencja MIT. |
| **First-run** | Stan pustej instancji: `GET /api/v1/auth/bootstrap-status` → `available: true` → jednorazowy `POST .../bootstrap-admin`. Potem endpoint bootstrap trwale niedostępny. |
| **Agenci aktywni** | Sygnał UX: bramka `complete === true` (można startować flow’y SM). **Nie** oznacza „run w toku” (`running` / `awaiting_hitl` / `interrupted`). Odwrotnie: agenci nieaktywni / zablokowani = kontekst niekompletny. |
| **MVP** | Pierwszy kompletny slice produktowy: auth, dashboard, post ideas/content, gateway, **SQLite**, logi, SSE. |
| **V1 — rozbudowa** | Faza **po MVP**: kolejne workflowy / agenci poza pierwszym slice Social; obowiązkowy cutover persistence na **PostgreSQL** (`spec/SPEC-PERSISTENCE.md`). Nie mylić z prefiksem HTTP `/api/v1`. |

## Role i tenancy

| Pojęcie | Definicja |
|---------|-----------|
| **`admin`** | Jedyny administrator (bootstrap); wyłączne prawo edycji kontekstu firmy; może generować treści jak `user`. Norma: `security.md`. |
| **`user`** | Rola uruchamiająca flow’y SM i przeglądająca wyniki/logi; bez edycji kontekstu. |
| **Jedna firma / instancja** | Brak multi-tenant SaaS: wszyscy użytkownicy instancji dzielą jeden kontekst. |
| **Bootstrap admin** | Utworzenie pierwszego konta administratora przy starcie self-host (first-run). |

## Architektura i runtime

| Pojęcie | Definicja |
|---------|-----------|
| **Modularny monolit** | Trzy procesy w jednym monorepo (`apps/api`, `apps/frontend`, `apps/ai-provider-gateway`) ze wspólnym `packages/shared`. |
| **Cienki klient** | `apps/frontend`: UI + HTTP/SSE; **bez** reguł bramki, grafu SM, Prisma i sekretów LLM. |
| **Port / adapter** | Granica I/O: domain/application zależą od portu. Prisma = adapter w `infrastructure` BC. Klient gateway = adapter HTTP w `apps/api/src/llm/` (port `LlmGateway`). Zmiana względem: wcześniejszy opis bez lokalizacji adaptera LLM. |
| **Port `LlmGateway`** | Port chat (i opcjonalnie stream) do `apps/ai-provider-gateway`; jedyna droga `apps/api` do LLM. Wołają go BC (np. Social), nie kontrolery HTTP. |
| **Bounded context (BC)** | Moduł odpowiedzialności w `apps/api` z układem warstw HTTP → application → domain + porty → adaptery: **Auth**, **Company Context**, **Social**, **Runs / Logs**, **Feedback**. Zmiana względem: wcześniejsza lista bez Feedback. |
| **Feedback (BC)** | Bounded context zapisu opinii tekstowych (`application` \| `agent` \| `run`). Bez LangGraph; panel odczytu = **V1 — rozbudowa**. **Nie** ocena gwiazdkowa, flaga edycji ani finalize (to Runs). |
| **LangGraph / graf** | Orchestracja pipeline’u Social za fasadą application service (nie w controllerze). |
| **Async run** | Asynchroniczne wykonanie pipeline’u; klient dostaje `RunId`, postęp przez SSE. |
| **Worker in-process** | Wykonanie runu w procesie `apps/api` po `202`. Zakaz osobnego always-on workera OS i spawnu procesu per run w MVP. |
| **Limit współbieżności** | Globalny `MAX_CONCURRENT_RUNS` (domyślnie **3**) = maksymalna liczba równoległych **execute** w procesie api. Wejście w `running` z `queued` **oraz** z `interrupted` tylko przy wolnym slocie. Nowe POST ponad limit zostają `queued` (FIFO). W drain: najpierw `interrupted`, potem `queued`. `awaiting_hitl → running` (HITL) jest osobnym use-casem i **nie** jest tym capem w MVP. Brak limitu per-user w MVP. Zmiana względem: wcześniejszy opis capu wyłącznie dla nowych runów w `queued`. |
| **Gateway** (`ai-provider-gateway`) | Osobna aplikacja — jedyna droga `apps/api` do vendorów LLM; bez domeny Content Chain. |
| **`packages/shared`** | Współdzielone typy kontraktu API i brand types (**bez** logiki biznesowej, **bez Zod** / runtime walidatorów). **Nie** mylić z `apps/api/src/shared/`. |
| **`apps/api/src/shared/`** | Cross-cutting wyłącznie wewnątrz api (env, envelope, interceptory). **Nie** zastępuje `packages/shared` i **nie** trzyma reguł Social / kontekstu firmy. |
| **Moduły ops / LLM (nie-BC)** | `apps/api/src/health/`, `metrics/`, `llm/` — powierzchnia ops i klient gateway. **Nie** bounded contexty: brak układu `application` / `domain` / `infrastructure` jak w BC. |
| **Prisma / SQLite** | Adapter persistence **MVP**; ORM tylko w infrastructure. |
| **PostgreSQL** | Silnik od fazy **V1 — rozbudowa** (nie MVP). |
| **DB kanoniczna** | Baza jako źródło prawdy dla kontekstu firmy, userów, sesji refresh, runów, wyników SM, logów UI, **opinii tekstowych** oraz metadanych przeglądu (`userRating`, `outputEdited`, `reviewFinalizedAt`). Nie cichy fallback z plików. Zmiana względem: wcześniejszy opis bez opinii i przeglądu. |

## Run, statusy, taski

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Brandowany ID runu; format `run_<uuid>`. |
| **`RunStatus`** | `queued` \| `running` \| `interrupted` \| `awaiting_hitl` \| `completed` \| `failed`. |
| **`RunTaskType`** | `post_ideas` \| `post_content` \| `post_ideas_then_content`. |
| **`SocialPlatform`** | `linkedin` \| `facebook` \| `instagram`. |
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
| **`FeedbackAgentKey`** | Stały enum MVP: `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier`. Węzły `LoadContext`, `NormalizeBrief`, `Persist*`, `Refine*` **nie** są pozycjami tego katalogu. Kontrakt MVP w docs/spec; w shared przy implementacji BC Feedback. |
| **SSE runu** | Strumień zdarzeń: `run.status`, `run.log`, `run.hitl`, `run.completed`, `run.failed`. |
| **Snapshot logów** | `GET .../runs/:runId/logs` — historia; nie zastępuje SSE dla statusu live. |
| **Agent (węzeł pipeline’u)** | Krok grafu Social. Katalog bazowy: `LoadContext`, `NormalizeBrief`, `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`. Wywołanie LLM (gdy dotyczy) = osobny hop do gateway. Zmiana względem: wcześniejszy opis bez kanonicznych nazw węzłów. |
| **`ConsistencyVerifier`** | Jeden węzeł, dwa obszary: (1) spójność z kontekstem firmy, (2) język — gramatyka, interpunkcja, składnia dla `pl`/`en`. Osobny `LanguageQualityVerifier` = poza MVP. Fail → Refine*. |
| **Refine** | Ponowne wywołanie agenta po negatywnym werdykcie `ConsistencyVerifier`. Twardy limit **`max N=2`**, potem `failed`. Zakaz nieskończonej pętli. Zmiana względem: wcześniejsze „ograniczone `max N`” bez liczby. |
| **Structured output** | Wyjście węzła LLM walidowane schemą (Zod) zanim pójdzie dalej w grafie. Porażka parse = błąd kroku / refine / `failed` — nie cichy tekst do UI. |
| **Recovery runu** | Po restarcie / crashu api: leftover `running` → `interrupted` (`recoveryAttempts++`), potem claim `interrupted → running` pod `MAX_CONCURRENT_RUNS`. Leftover już `interrupted` (nie zdążył dostać slotu) — **bez** inkrementu, wraca do pompy. Do **3** prób wznowienia **fazy** z trwałego stanu w DB po powrocie do `running` (model B; nie dokończenie hopu LLM w locie). `awaiting_hitl` **nie** zużywa puli recovery. Po wyczerpaniu capu → `failed` + log. Zmiana względem: wcześniejsze recovery jako ponowne execute na leftover `running` bez statusu pośredniego i bez capu na claim. |
| **`isRetryable`** | Polityka domeny Runs: co wolno ponowić (recovery po crashu, timeout / rate-limit gateway wg polityki) vs czego nie (walidacja, wyczerpany refine verifiera, zła konfiguracja klucza gateway). |

## Identyfikatory i korelacja

Zmiana względem wcześniejszego, zbyt uproszczonego opisu: **`RequestId` nie jest jeden na cały run.** Formaty `req_<uuid>` / `conv_<uuid>` nadal jak w `ai-provider-gateway` (zgodność logów), ale semantyka zakresów jest jak poniżej.

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Jeden na async run SM (`run_<uuid>`). |
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
