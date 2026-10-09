---
wersja: 4
data_utworzenia: 2026-09-27
data_modyfikacji: 2026-10-09
---

# Architektura katalogów i plików — Content Chain

Propozycja **docelowego drzewa** monorepo (greenfield). Odzwierciedla style i granice z `architektura.md`: trzy aplikacje pod `apps/`, wspólne typy w `packages/shared`, `docs/` w rootcie. **Bez** rootowego katalogu `src/` opakowującego aplikacje.

Zmiana względem: drzewo bez jawnego „źródła prawdy” deployu. Od tej wersji w szkielecie: root `docker-compose.yml`, `Jenkinsfile`, Dockerfile’e usług (build context = **root** monorepo + pnpm), entrypoint api (migracje → start) — szczegóły ops: `deployment.md`.

Zmiana względem: płaskie `runs/infrastructure/` i `auth/infrastructure/` oraz płaski kernel w `runs/application/`. Od tej wersji: podkatalogi w warstwie po **granicy I/O / kernel** (analogicznie do Social/Content: `graph/` / `prompts/` / `persistence/`); **zakaz** `helpers/` / `adapters/` / `mappers/` jako kanonu warstwy. Mapowania wiersza Prisma zostają przy adapterze persistence. Bez zmiany kontraktu HTTP, ról, runów, guest ani silnika Prisma.

Zmiana względem: `health/` = liveness i readiness bez doprecyzowania zależności. Od tej wersji: readiness api obejmuje probe **liveness** procesu gateway (nie port `chat`; nie konsumpcja upstream `/health/ready`).

Zmiana względem wcześniejszej wersji (bez frontmatteru): jedna linia o cancel — mapa `AbortController` w workerze Runs (v1 in-process).

## Tooling

- **pnpm workspaces** w rootcie (`package.json` + `pnpm-workspace.yaml`).
- Aplikacje i pakiety jako workspace packages; bez Nx na start.

## Drzewo docelowe (szkielet)

```text
content-chain/
├── apps/
│   ├── api/                         # NestJS + LangGraph — domena i orchestracja
│   │   ├── Dockerfile               # build: context = root monorepo + pnpm
│   │   ├── docker-entrypoint…       # prisma migrate deploy → start procesu (production)
│   │   ├── prisma/                  # schema Prisma (SQLite MVP)
│   │   ├── test/
│   │   │   ├── *.e2e-spec.ts        # Jest e2e (supertest; fake LLM w happy path pipeline)
│   │   │   └── postman/             # kolekcja Postman v2.1 Milestone 4 + README; nie BC, nie runtime, nie runner pnpm test:e2e
│   │   ├── package.json
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── auth/
│   │       ├── company-context/
│   │       ├── social/
│   │       ├── content/             # BC Content (copy stron; bez HTTP controllera)
│   │       ├── runs/
│   │       ├── feedback/            # opinie tekstowe (zapis MVP)
│   │       ├── health/              # liveness / readiness procesu
│   │       ├── metrics/             # eksporter Prometheus (`GET /metrics`)
│   │       ├── llm/                 # port LLM + adapter HTTP do gateway
│   │       └── shared/              # cross-cutting tylko w api (nie packages/shared)
│   ├── frontend/                    # Next.js — cienki klient
│   │   ├── Dockerfile               # build: context = root + pnpm; port prod 3004
│   │   ├── package.json
│   │   └── src/                     # App Router, moduły UI
│   └── ai-provider-gateway/         # gateway LLM — bez domeny Content Chain
│       ├── Dockerfile               # (ścieżka w root compose; port 3100)
│       ├── gateway.config.yaml      # w repo; COPY do obrazu + volume mount (host wygrywa)
│       ├── package.json
│       └── src/
├── packages/
│   └── shared/                      # typy publicznego kontraktu API
│       ├── package.json
│       └── src/
├── docs/
├── docker-compose.yml               # Źródło prawdy runtime production (Compose-first)
├── Jenkinsfile                      # Job deploy: Vault → root .env → compose up → smoke
├── .env.example                     # Suma kluczy prod (placeholdery); runtime = root .env z Vault
├── package.json
└── pnpm-workspace.yaml
```

**Deployables (skrót):** kanon ops = root `docker-compose.yml` + `Jenkinsfile` + Dockerfile’e w `apps/{api,frontend,ai-provider-gateway}/` budowane z **kontekstu roota**. Porty, sieci (`cc-network` + `main_network`), volume `api-sqlite`, sekrety i smoke — `deployment.md`.


## Mapowanie stylów → katalogi

| Ustalenie z `architektura.md` | Konsekwencja w drzewie |
|-------------------------------|-------------------------|
| Modularny monolit, 3 procesy | `apps/api`, `apps/frontend`, `apps/ai-provider-gateway` |
| Port/adapter (persistence, LLM) | Porty w `domain` / `application`; adaptery w `infrastructure` (+ Prisma w `apps/api/prisma`); klient gateway w `apps/api/src/llm/` |
| Health / metrics (ops) | `apps/api/src/health/`, `apps/api/src/metrics/` — nie BC |
| Social = LangGraph za fasadą | `apps/api/src/social/infrastructure/graph/` |
| Prompty przy BC Social (posty **i** rolki) | `apps/api/src/social/infrastructure/prompts/` |
| Content = LangGraph za fasadą | `apps/api/src/content/infrastructure/graph/` |
| Prompty przy BC Content | `apps/api/src/content/infrastructure/prompts/` |
| Podział `infrastructure/` po I/O (Runs, Auth; wzorzec Social/Content) | Podkatalogi `persistence/` / `sse/` / `quota/` / `dispatch/` / `mail/` / `session/` / `graph/` / `prompts/` — **nie** nowe BC; kierunek zależności warstw bez zmian |
| Kernel procesu w `application/` (Runs) | `application/lifecycle/` (+ `application/guest/` na politykę); use-case’y HTTP zostają płasko w `application/` |
| Cienki frontend | Moduły UI w `apps/frontend/src/modules/`; brak `domain/` SM |
| Gateway bez domeny CC | Tylko kod providerów / routingu w `apps/ai-provider-gateway` |
| Shared typy kontraktu | `packages/shared` — bez use-case’ów i bez Prisma |

## `apps/api` — bounded contexty (~1 poziom w głąb)

Każdy BC (`auth`, `company-context`, `social`, `content`, `runs`, `feedback`) trzyma spójny układ warstw:

```text
apps/api/src/<context>/
├── <context>.module.ts
├── <context>.controller.ts          # cienkie HTTP
├── application/                     # use-case’y / serwisy aplikacyjne
├── domain/                          # reguły, typy domenowe, porty (interfejsy)
└── infrastructure/                  # adaptery (Prisma repos, …); klient LLM w `src/llm/`
```

**Podkatalogi w warstwie** — tylko gdy warstwa miesza różne granice I/O albo kernel procesu z use-case’ami HTTP. Podział jest po **granicy I/O / kernel**, nie po rodzaju pliku (`helpers` / `adapters` / `mappers`). Małe BC (Feedback, Company Context) **mogą** zostać płaskie w `infrastructure/` (jeden adapter Prisma). Social/Content już mają `graph/` / `prompts/` / `persistence/` — to wzorzec, nie cel przepisania tych BC w tej zmianie.

**1 BC ≠ obowiązkowo 1 plik `*.module.ts`.** Wolno wydzielić kernel lifecycle (port `appendLog` / `transition` + hub SSE + repozytorium runu) od HTTP/workera, jeśli to zamyka cykl importów Nest. To nadal ten sam BC Runs — nie nowy bounded context. Klej `RUN_EXECUTOR` w `app.module.ts` (albo `registerAsync`) **nie** jest BC; analogia: `health/` / `llm/` to też nie-BC, ale ops — klej pipeline’u zostaje przy starcie procesu, nie w `llm/`. Worker in-process (cancel v1): `Map<RunId, AbortController>` przy execute + `attemptCancel` na repo — norma w `architektura.md` / `SPEC-RUNY.md`; **bez** osobnego katalogu BC. `RunLifecycleModule` / `GuestQuotaModule` zostają w **korzeniu** `runs/` (nie nowe BC).

### Social (wyjątek orchestracji)

```text
apps/api/src/social/
├── social.module.ts                 # bez controllers[] — HTTP start/HITL jest w Runs
├── application/                     # fasada invoke fazy + SocialRunExecutor
├── domain/
└── infrastructure/
    ├── graph/                       # LangGraph — definicja i węzły pipeline’u
    ├── prompts/                     # szablony promptów SM (posty **i** rolki)
    └── persistence/                 # adaptery zapisu wyników SM (via Prisma)
```

Zmiana względem wcześniejszego drzewa z `social.controller.ts`: plik i rejestracja Nest nie istnieją. Wejście produktowe = `POST /runs` i `POST .../hitl` w BC Runs (`architektura.md`).

### Content (wyjątek orchestracji — analogicznie do Social)

```text
apps/api/src/content/
├── content.module.ts                # bez controllers[] — HTTP start/HITL jest w Runs
├── application/                     # fasada invoke fazy + ContentRunExecutor
├── domain/                          # PageOutline, PageDocument, refine, port store
└── infrastructure/
    ├── graph/                       # LangGraph — węzły outline / writer / verifier
    ├── prompts/                     # page-outline, page-writer, refine-*, verifier
    └── persistence/                 # ContentOutline / ContentDocument via Prisma
```

`ContentModule` nie importuje `SocialModule` / `RunsModule` (tylko kernel lifecycle port jak Social). **Zakaz** fat Social: strony nie żyją w `social/`.

### Runs / Logs

```text
apps/api/src/runs/
├── runs.module.ts
├── run-lifecycle.module.ts
├── guest-quota.module.ts
├── runs.controller.ts               # status, logi, HITL, lista user/:userId, ocena, zapis edycji wyniku, finalize
├── run-record.test-helpers.ts       # unit: makeSocialRun / makeContentRun; nie e2e (`apps/api/test/`); bez zmian lokalizacji; nie adapter
├── http/                            # dto, pipe — bez zmian układu
├── application/
│   ├── lifecycle/                   # kernel procesu (worker, abort, dispatch; nie use-case HTTP)
│   ├── guest/                       # GuestRunPolicy
│   └── …                            # *use-case*, schemy, composite reader — płasko
├── domain/                          # statusy runu, polityka przejść, lock przeglądu, porty (executor, lifecycle, odczyt wyniku, OutputEditedWriter)
└── infrastructure/
    ├── persistence/                 # Prisma run/log/output-edited + mapowania wiersza (`to-*`, `map-stored-*`)
    ├── sse/                         # hub SSE / subject
    ├── quota/                       # Redis guest + adapter niedostępności
    └── dispatch/                    # stub executor (I/O test/fallback pod port)
```

`run-record.test-helpers.ts` jest wyłącznie dla Jest unit (`*.spec.ts` przy `src/`). Zostaje w **korzeniu** BC Runs — nie w `infrastructure/` ani w `helpers/`. Nie jest adapterem ani use-casem — po unii `RunRecord` unit nie może używać `Partial<RunRecord>`. E2E w `apps/api/test/` startuje runy przez HTTP, nie przez te fabryki.

Port lifecycle (`appendLog`, `transition`) i port executora (`execute`) żyją w `domain/`. Implementacje executora **nie** należą do tego drzewa — są w `social/application/` i `content/application/`. Binding tokenu — klej procesu (composite), nie `imports: [SocialModule]` ani `imports: [ContentModule]` w `runs.module.ts`.

### Feedback (opinie tekstowe)

```text
apps/api/src/feedback/
├── feedback.module.ts
├── feedback.controller.ts           # POST zapisu opinii (MVP: bez panelu odczytu)
├── application/
├── domain/
└── infrastructure/                  # adapter Prisma tabeli opinii (płasko — jeden I/O)
```

### Auth

```text
apps/api/src/auth/
├── auth.module.ts
├── auth.controller.ts
├── users.controller.ts
├── invitations.controller.ts
├── application/                     # use-case’y, schemy, limiter — płasko (bez podkatalogów use-case’ów „na siłę”)
├── domain/                          # bez zmian układu
├── http/                            # DTO — bez zmian układu
└── infrastructure/
    ├── persistence/                 # Prisma User / Invitation / AccountActivation / refresh
    ├── mail/                        # nodemailer + adapter logujący
    └── session/                     # cookie + JwtCookieStrategy
```

`auth.helpers.ts` (jeśli obecny) **nie** przenosi się do `helpers/` — świadomy dług nazwy; poza zakresem normy drzewa.

### Company Context

Ten sam szkielet warstw co inne BC; **bez** wymogu podkatalogów w `infrastructure/` (jeden adapter Prisma). Reguła bramki kompletności w `domain/`, zapis kanoniczny przez port → Prisma.

### Persistence (Prisma + SQLite w MVP)

- Schema i migracje: `apps/api/prisma/`.
- Użycie ORM **tylko** w `infrastructure` BC — albo płasko w `infrastructure/`, albo w `infrastructure/persistence/` gdy warstwa ma kilka granic I/O. Nadal **jedyne** miejsce `PrismaClient` w danym BC; application/domain zależą od **portów**, nie od klienta Prisma bezpośrednio.
- Mapowania wiersza Prisma (`to-*`, `map-stored-*`) żyją **przy** adapterze persistence — nie w osobnym `mappers/` warstwy.
- **SQLite** jako jedyny provider **MVP**.
- **PostgreSQL** — od fazy **V1 — rozbudowa** (ops / skala, **nie** warunek dodania Content): zmiana providera + nowa historia Migrate; nie przenoszenie reguł do UI. Szczegóły: `spec/SPEC-PERSISTENCE.md`.

### `apps/api/src/shared/`

Pomocnicze elementy wyłącznie API (np. konfiguracja, interceptory, mapping błędów, `parse-with-zod.ts`). **Nie** dublować `packages/shared` i **nie** umieszczać tu reguł Social / kontekstu firmy.

`parse-with-zod.ts` — cienki helper cross-cutting: application Zod → `DomainException` (`VALIDATION_FAILED`, 400); `details[].path` = segmenty Zod `issue.path` połączone `'.'`. Używany przez BC (Runs, company-context) — **bez** reguł domenowych w tym pliku. Obok: `config/`, `http/`, `exceptions/`, `llm/`, `persistence/`.

### `apps/api/src/health/`, `metrics/`, `llm/`

To **nie** są bounded contexty — brak układu `application` / `domain` / `infrastructure`.

- `health/` — liveness procesu (`GET /api/v1/health`) oraz readiness produktowa (`GET /api/v1/health/ready`: check api + probe upstream **liveness** gateway). Cienki klient HTTP probe **w `health/`** (lub obok), **nie** w porcie `chat` / `llm/`. Kontrakt: `dokumentacja_komunikacji.md`.
- `metrics/` — eksporter Prometheus (`GET /metrics` poza `/api/v1`; `observability.md`).
- `llm/` — port LLM i adapter HTTP do `apps/ai-provider-gateway` (**chat**). Wołają go BC (Social, Content), nie kontrolery HTTP. **Bez** obowiązku pełnienia roli probe health. Helper kształtu logu hopu: `llm-gateway-chat.log.ts` (stdout tylko w `development`, z redakcją `GATEWAY_KEY` — `observability.md`). **Nie** umieszczać tu domeny Content Chain ani kluczy vendorów.

## `apps/frontend`

```text
apps/frontend/src/
├── app/                             # App Router (routes, layouts)
├── modules/                         # np. auth, company-context, social, content, runs, feedback
├── shared/                          # UI kit / utils frontu (nie domena api)
└── ...
```

- Moduły UI wołają `apps/api` **przez BFF Next** (same-origin `/api/v1`); typy z `@content-chain/shared` (lub równoważny alias workspace). Katalog `modules/` zastępuje wcześniejszą nazwę `features/`.
- Zakaz: sekrety LLM, bezpośredni dostęp do Prisma/gateway vendorów, kopiowanie reguł bramki / pipeline’u.
- Zakaz: `NEXT_PUBLIC_API_BASE_URL` jako adresu przeglądarki do api (env `API_BASE_URL` tylko na serwerze Next).

## `apps/ai-provider-gateway`

Struktura wewnętrzna zgodna z dostosowaną instancją gateway’a (osobny produkt). W Content Chain obowiązuje norma: **brak** modułów `company-context` / `social` / auth produktu w tym drzewie.

## `packages/shared`

```text
packages/shared/src/
├── index.ts
└── ...                              # typy request/response, enumy publiczne (role, statusy runu, platformy SM)
```

Tylko kontrakt typów/enumów/brand; **bez** Zod, Nest/Next/Prisma/LangGraph, use-case’ów.

## Zasady lokalizacji (do/don’t)

| Wolno | Nie wolno |
|-------|-----------|
| Reguły domenowe i pipeline w `apps/api/src/<bc>/` | Logika SM / bramki kontekstu w `apps/frontend` lub gateway |
| Prisma wyłącznie jako adapter w `infrastructure` albo `infrastructure/persistence/` (+ `prisma/`) | Import Prisma w `domain/` lub w `packages/shared`; Prisma w `infrastructure/sse` \| `quota` \| `mail` \| `session` \| `graph` |
| Podkatalogi I/O w `infrastructure/` (Runs, Auth; już Social/Content: `graph` / `prompts` / `persistence`) oraz kernel w `application/lifecycle` / `guest` | `helpers/` / `adapters/` / `mappers/` jako kanon warstwy BC; mappery wiersza Prisma poza katalogiem persistence; porty w `infrastructure/`; kernel lifecycle jako nowy BC |
| Prompty i graf w `social/infrastructure/` | Prompty i wywołania LLM w controllerze |
| Typy publiczne w `packages/shared` (**bez Zod**) | Use-case’y, DB, Zod/runtime w `packages/shared` |
| Aplikacje pod `apps/` | Rootowy katalog `src/` opakowujący wszystkie app |
| Kernel lifecycle Runs + klej composite `RUN_EXECUTOR` w `AppModule` | `forwardRef` Runs ↔ Social / Content; port lifecycle w `packages/shared`; fat Social (page copy w `social/`); `'web'` jako `SocialPlatform` |
| Kolekcja E2E pod `apps/api/test/postman/` | `apps/api/postman/` ani `apps/api/src/postman/` (wygląda jak moduł produktu) |
| Małe BC (Feedback, Company Context) płaskie w `infrastructure/` | Podkatalogi w `health/` / `metrics/` / `llm/` na wzór BC; podkatalogi use-case’ów Auth „na siłę” |

## Poza zakresem tego dokumentu

- Normatywny kontrakt HTTP / błędy → `dokumentacja_komunikacji.md`
- Przepływy runu end-to-end → `data_flow.md`
- Skrypty deploy / env → `deployment.md`
- Brand types → `brand_types.md`
- Pełna lista każdego pliku źródłowego (implementacja doprecyzuje nazwy use-case’ów)
