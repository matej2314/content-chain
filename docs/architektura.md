# Architektura — Content Chain

## Widok systemu

Content Chain to **modularny monolit w monorepo** z trzema osobnymi procesami runtime oraz wspólnym pakietem kontraktów.

Zmiana względem wcześniejszej wersji tego dokumentu: ścieżki aplikacji ujednolicono do `apps/api`, `apps/frontend`, `apps/ai-provider-gateway` (w rootcie monorepo, **bez** opakowania `src/apps/`). Szczegółowe drzewo: `architektura_katalogi_pliki.md`.

| Element                    | Rola                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `apps/api`                 | Jedyny właściciel domeny i orchestracji: auth, kontekst firmy, pipeline Social i Content, runy, logi, persistence         |
| `apps/frontend`            | Cienki klient UI (dashboard, flow’y Social i Content, podgląd logów); bez reguł domenowych i bez dostępu do vendorów LLM  |
| `apps/ai-provider-gateway` | Osobny deployable: routing / providery LLM; **zero** logiki Content Chain (Social, kontekst, auth produktu) |
| `packages/shared`          | Lekkie, współdzielone typy publicznego kontraktu API (bez logiki biznesowej, **bez Zod**) |

```mermaid
flowchart LR
  subgraph monorepo["Monorepo Content Chain"]
    FE["apps/frontend"]
    API["apps/api"]
    GW["apps/ai-provider-gateway"]
    SH["packages/shared"]
  end

  User["Admin / User"] --> FE
  FE -->|"HTTP + cookies cc_access/cc_refresh"| API
  API -->|"port LLM"| GW
  GW -->|"vendors LLM"| Vendors["Dostawcy modeli"]
  API --> DB[(SQLite)]
  FE -.-> SH
  API -.-> SH
```

**Zasada zależności:** `apps/frontend` → `apps/api` → (porty) → adaptery (Prisma/SQLite, klient gateway). `apps/api` **nie** woła vendorów LLM bezpośrednio. Gateway nie zależy od domeny `apps/api`.

Content Chain jest też **realnym use-case’em** projektu `ai-provider-gateway` (instancja dostosowana w `apps/ai-provider-gateway`), a nie tylko izolowanym demo samego gateway’a.

## Style architektury

### Styl globalny

- **Modularny monolit** (trzy aplikacje w jednym repo, jasne granice procesów).
- **Porty i adaptery** na granicach I/O: persistence, LLM (przez gateway), ewentualnie inne zewnętrzne zależności.
- **Strategiczne DDD „lekko”:** bounded contexty i wspólny język (`CompanyContext`, `Run`, `PostIdeas`, `PostContent`, `ReelIdea`, `PageDocument`, …) — **bez** narzucania pełnej taktyki DDD (bogate agregaty / event sourcing wszędzie) w MVP.

### Dziedziczenie i wyjątki

Wszystkie bounded contexty w `apps/api` stosują ten sam wzorzec warstw (cienki controller → application / use-case → domain + porty), z **świadomym wyjątkiem wewnętrznym**: pipeline’y Social i Content orkestrowane grafem (LangGraph) za fasadą application service. Social i Content **nie** wystawiają własnego controllera HTTP — start runu i HITL zostają w BC Runs (`dokumentacja_komunikacji.md`).

### Style per obszar

| Obszar                                              | Styl wewnętrzny                                                                                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Auth, Company Context, Runs / Logs, Feedback        | Klasyczne warstwy NestJS: HTTP → use-case → domain / porty → adaptery                                                                            |
| Social pipeline (posty, rolki, weryfikacja, HITL)   | **Orchestracja / graf** (LangChain/LangGraph) ukryty za application service; stan runu w DB; węzły = kroki pipeline’u, nie logika w controllerze |
| Content pipeline (outline, page copy, weryfikacja, HITL) | **Orchestracja / graf** jak Social; osobny folder BC; **zakaz** wciągania stron do `social/` |
| `apps/frontend`                                     | Cienki klient: UI + stan serwerowy z API; App Router z podziałem Server/Client bez przenoszenia domeny do Next                                   |
| `apps/ai-provider-gateway`                          | Osobny bounded deployable: wyłącznie warstwa providerów / routingu LLM                                                                           |

### Poza zakresem styli w MVP

- Mikroserwisy domenowe i event-driven między wieloma serwisami biznesowymi
- CQRS / Event Sourcing jako styl globalny
- „Fat” LangGraph / reguły SM albo Content w controllerze lub w gateway
- Opinie, gwiazdki i flaga edycji outputu wewnątrz grafu Social / Content (to komendy Runs / Feedback po zakończeniu przebiegu)
- Pełna ceremonialna Clean Architecture w `frontend/`
- **Czyste taktyczne DDD** jako obowiązkowy styl globalny (świadomie odłożone względem MVP)

## Bounded contexty w `apps/api`

| Context             | Odpowiedzialność                                                                     | Kluczowe reguły                                                       |
| ------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Auth** | Użytkownicy, role `admin` \| `user`, sesja: JWT w `cc_access` + refresh w `cc_refresh` (httpOnly) | **Jeden** `admin` (bootstrap); tylko on edytuje kontekst; obaj mogą uruchamiać runy produktowe — `security.md` |
| **Company Context** | Kanoniczny kontekst firmy w DB, bramka kompletności                                  | Do kompletności — start **każdego** `POST /runs` zablokowany |
| **Social**          | Post ideas/content **oraz** reel ideas/script (LI / FB / IG, PL / EN), weryfikacja spójności z kontekstem | Task jednoetapowy = full-auto; dwuetapowy = HITL przy wyborze z listy; **bez** własnych tras HTTP; **bez** page copy w tym folderze |
| **Content**         | Copy stron / long-form (`page_copy`, `page_outline_then_copy`; `ContentKind`) w **podstawowej formie** | Graf za fasadą; HITL model B (outline); **bez** własnych tras HTTP; **bez** importu Social i odwrotnie |
| **Runs / Logs**     | Cykl życia async runu, statusy, czytelne logi powiązane z `runId`                    | DB = źródło prawdy dla logów widocznych w UI; stdout = ops; ocena gwiazdkowa + flaga edycji outputu + zamknięcie przeglądu — metadane runu (nie graf) |
| **Feedback**        | Opinie tekstowe o aplikacji / agencie / runie (append-only)                           | Zapis w DB; odczyt analityczny / panel admina = **V1 — rozbudowa**; nie w LangGraph |

Zmiana względem: „rolki itd. = V1” oraz „jeden executor Social w MVP”. Content wchodzi w **MVP**; klej nadal ręczny (dwa executory w `AppModule` / `registerAsync`); self-register nadal poza MVP. PostgreSQL odpięty od „kolejnych workflowów” — cutover = V1 ops/skala (`spec/SPEC-PERSISTENCE.md`), niezależnie od tego, że Content jest w MVP.

YouTube, publikacja portali, łańcuch audytorów Content — **V1 — rozbudowa** / później; architektura zakłada dodawanie kolejnych contextów / grafów bez rozbijania monorepo na mikroserwisy i **bez złączania** katalogów grafu z BC Runs.

### Zależności między BC w `apps/api`

Runs jest orkiestratorem **procesu** (kolejka, statusy, logi, SSE, recovery). Social i Content są orkiestratorami **treści** swojego kanału.

Kierunek współpracy:

- Graf agenta **woła porty Runs** (`appendLog`, `transition`) — bez omijania cyklu życia runu i bez emisji SSE z węzłów.
- Worker Runs woła jeden port `RunExecutorPort` („wykonaj ten run”). Implementacja: **composite** w kleju (`taskType` → `SocialRunExecutor` \| `ContentRunExecutor`; nieznany → `failed` / `UNKNOWN_TASK_TYPE`).
- **Spięcie** tokenów executora i readera z konkretnymi klasami należy do **kleju procesu** (`AppModule` / `registerAsync`) — nie do wzajemnego importu modułów Nest (`forwardRef` Runs ↔ Social / Content). Social **nie** importuje Content i odwrotnie. `RunsModule` **nie** importuje żadnego grafu.
- Nowy folder BC w MVP (Content) + nowy wpis w kleju — **ręczny**. Self-register grafów (`OnModuleInit` do rejestru) **nie** jest wzorcem MVP.
- Reader snapshotu: composite składa pola addytywne (social i/lub reel i/lub content).

Zlewanie `social/` z `runs/` albo wciąganie stron do `social/` jest odrzucone: izolacja katalogu grafu ma umożliwić kolejne agenty bez przebudowy orkiestratora.

## Warstwy w `apps/api` (NestJS)

```mermaid
flowchart TB
  HTTP["Controllers / Guards / DTO"]
  APP["Application services / use-cases"]
  DOM["Domain + polityki (bramka, role, statusy runu)"]
  PORTS["Ports: Persistence, LlmGateway, ..."]
  ADAPTERS["Adapters: Prisma/SQLite, HTTP client → gateway"]
  GRAPH["Social / Content: LangGraph za fasadą application service"]

  HTTP --> APP
  APP --> DOM
  APP --> PORTS
  APP --> GRAPH
  GRAPH --> PORTS
  PORTS --> ADAPTERS
```

- **Controllers:** walidacja wejścia, mapowanie HTTP, authz — bez ORM i bez promptów.
- **Application:** orkiestracja przypadku użycia (start runu, wznowienie po HITL, odczyt logów).
- **Domain:** reguły niezależne od Nest/LLM (kompletność kontekstu, dozwolone przejścia statusów, role).
- **Ports / adapters:** Prisma + **SQLite w MVP** (ORM tylko w infrastructure); klient HTTP (lub równoważny) do gateway jako adapter portu LLM. PostgreSQL — od fazy **V1 — rozbudowa** (ops/skala, nie warunek Content).
- **Cross-cutting w `apps/api` (MVP):** `@nestjs/config` (env), **Pino** / `nestjs-pino` (logi procesu — `observability.md`), DX OpenAPI **Swagger UI pod `/docs`** (poza prefiksem produktowym `/api/v1`; szczegóły `dokumentacja_komunikacji.md`). Walidacja HTTP: class-validator; application: Zod — `SPEC-KOMUNIKACJA.md`.

**Anty-patterny do unikania:** reguły biznesowe w controllerze; bezpośrednie wywołania vendorów LLM z `apps/api`; logika SM / Content w `apps/frontend` lub w gateway; synchroniczne blokowanie HTTP na cały długi run LLM; montowanie Swagger pod `/api` (kolizja z `/api/v1`); wzajemny `forwardRef` między modułami Nest BC Runs i grafem (albo import `SocialModule` / `ContentModule` z `RunsModule`) jako klej pipeline’u; traktowanie `'web'` jako `SocialPlatform`.

## Async run i HITL

Pipeline produktowy działa jako **asynchroniczny run**:

1. Klient tworzy run (brief **w kształcie kanału** — `SocialBrief` albo `ContentBrief` wg `taskType`, typ tasku, `platform` **albo** `contentKind`, język) → otrzymuje `runId`. Nie ma jednego uniwersalnego obiektu briefu SM na `page_*` (`dokumentacja_komunikacji.md`).
2. Worker / kontynuacja w `apps/api` wykonuje graf (Social albo Content wg `taskType`); każdy istotny krok dopisuje **czytelny wpis logu** w DB.
3. Live postęp (status, logi przyrostowe, sygnał HITL, completed/failed) idzie do klienta przez **SSE** (`GET /api/v1/runs/:runId/events`). Po `run.completed` / `run.failed` serwer **kończy** strumień; dalszy odczyt = GET. **GET** równolegle: snapshot logów runu oraz `GET /api/v1/health` — bez pollingu statusu jako kanału live. Szczegóły cyklu życia SSE: `dokumentacja_komunikacji.md`.
4. Przy tasku dwuetapowym run przechodzi w stan oczekiwania na **HITL** (wybór z listy pomysłów / rolek / outline’u); wznowienie osobnym wywołaniem API.
5. Task jednoetapowy kończy się bez pauzy selekcji.
6. Wynik (addytywny snapshot: ideas / content / reelIdeas / reelScript / pageOutline / pageDocument) i werdykt weryfikacji spójności są zapisane w DB i dostępne przez API / UI.
7. Po `completed` albo `failed` autor runu (`startedBy`) może: oznaczyć edycję outputu (flaga), ustawić ocenę `1–5` albo zostawić `null`, potem **zatwierdzić / zamknąć przegląd** — od tej chwili ocena i flaga są niemutowalne. Opinia tekstowa (aplikacja / agent / run) jest osobnym zapisem (BC Feedback), niezależnym od grafu.

Zmiana względem wcześniejszego zapisu w tym dokumencie: zamiast opierania obserwacji runu na samym pollingu HTTP — **SSE od MVP** (szczegóły kontraktu: `dokumentacja_komunikacji.md`). Dopisano fundament feedbacku (zapis w MVP; panel analityczny = V1 — rozbudowa). Dopisano, że strumień SSE kończy się po evencie terminalnym (wcześniej tylko „live przez SSE”, bez końca połączenia).

## Auth

- Mechanizm: **JWT access** w cookie httpOnly **`cc_access`** + **refresh** w httpOnly **`cc_refresh`** dla `apps/frontend` (oraz Postman na cookie). Bez Bearer / access w body jako modelu MVP.
- Role: `admin`, `user` — zgodnie z dokumentacją koncepcyjną.
- Poza MVP auth: OAuth / social login, rozbudowane ABAC.

## Persistence

- Port persistence + adapter **Prisma / SQLite** — **wyłącznie w MVP** (w tym modele reel i Content).
- **V1 — rozbudowa:** obowiązkowe przejście na **PostgreSQL** (ops / skala — **nie** warunek dodania Content). Zmiana `provider` + `DATABASE_URL` + **nowa historia** Prisma Migrate; baza Postgres startuje pusta; transfer danych z SQLite = osobna procedura ops. Nie obiecywać 1:1 tych samych plików migracji SQLite na Postgres.
- DB jest kanoniczna dla kontekstu firmy, runów, wyników i logów UI.
- Eksport `.md` / checksum — poza pierwszym dowodem agentów (tuż po MVP); bez cichego fallbacku runtime z plików.

Norma egzekwowalna: `spec/SPEC-PERSISTENCE.md`.

## Frontend (`apps/frontend`)

- Next.js jako UI self-host: dashboard kontekstu, uruchamianie flow’ów Social i Content, HITL, podgląd wyników i logów.
- Pobieranie danych i mutacje wyłącznie przez `apps/api`; sekrety LLM i klucze vendorów **nigdy** w bundlu klienta.
- Typy żądań/odpowiedzi: współdzielone z `packages/shared` tam, gdzie kontrakt jest publiczny.

## Gateway (`apps/ai-provider-gateway`)

- Osobny proces; jedyna droga `apps/api` do modeli.
- Dostosowana instancja pod ten projekt (use-case gateway’a z osobnego produktu).
- Nie przechowuje kanonicznego kontekstu firmy Content Chain i nie implementuje pipeline’u SM.

## Decyzje architektoniczne (skrót)

| Decyzja         | Wybór                                           | Odrzucone / odłożone                           |
| --------------- | ----------------------------------------------- | ---------------------------------------------- |
| Forma systemu   | Modularny monolit, 3 app + shared               | Mikroserwisy domenowe w MVP                    |
| Styl domeny     | Port/adapter + lekkie BC; nie pure tactical DDD | Full DDD / ES / CQRS                           |
| LLM             | Tylko przez gateway w monorepo                  | Bezpośrednie SDK vendorów w `apps/api`         |
| Pipeline        | Async run + LangGraph za fasadą                 | Synchroniczny request = cały LLM               |
| HITL            | Stan runu + API wznowienia                      | Ad hoc „pytanie w środku HTTP” bez modelu runu |
| Logi produktowe | Kanonicznie w DB per `runId`                    | Tylko stdout / tylko pliki                     |
| Auth            | JWT w `cc_access` + refresh w `cc_refresh` (oba httpOnly), 2 role | OAuth w MVP; Bearer / access w body jako model web |
| DB              | Prisma + **SQLite w MVP**; **PostgreSQL od V1 — rozbudowa** (ops/skala) | Postgres w MVP; SQLite po wejściu w V1; Postgres jako warunek Content |
| Layout monorepo | `apps/*` + `packages/shared` w rootcie          | Rootowy `src/apps/` (porzucone)                |
| Shared          | `packages/shared` typy/enumy/brand (**bez Zod**) | Duplikacja DTO; Zod/runtime w shared; `'web'` w `SocialPlatform` |
| Feedback        | Osobny BC + tabela opinii; ocena/edycja na Run   | Feedback w LangGraph; panel admina w MVP       |
| Zależności Nest BC | Social i Content → porty lifecycle Runs; composite `RUN_EXECUTOR` w kleju (`AppModule` / `registerAsync`) | `forwardRef` Runs ↔ graf; zlewanie `social/` z `runs/`; fat Social (strony w `social/`); self-register grafów w MVP; jeden executor Social jako jedyny model MVP |

## Poza zakresem tego dokumentu

- Docelowe drzewo katalogów i plików → `architektura_katalogi_pliki.md`
- Normatywny kontrakt I/O (endpointy, payloady, błędy) → `dokumentacja_komunikacji.md`
- Szczegółowe przepływy danych end-to-end → `data_flow.md`
- Strategia testów i deploymentu → `testy.md`, `deployment.md`
- Bezpieczeństwo / observability / UX → `security.md`, `observability.md`, `ux_dashboard.md`
