# Architektura katalogów i plików — Content Chain

Propozycja **docelowego drzewa** monorepo (greenfield). Odzwierciedla style i granice z `architektura.md`: trzy aplikacje pod `apps/`, wspólne typy w `packages/shared`, `docs/` w rootcie. **Bez** rootowego katalogu `src/` opakowującego aplikacje.

## Tooling

- **pnpm workspaces** w rootcie (`package.json` + `pnpm-workspace.yaml`).
- Aplikacje i pakiety jako workspace packages; bez Nx na start.

## Drzewo docelowe (szkielet)

```text
content-chain/
├── apps/
│   ├── api/                         # NestJS + LangGraph — domena i orchestracja
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
│   │       ├── runs/
│   │       ├── feedback/            # opinie tekstowe (zapis MVP)
│   │       ├── health/              # liveness / readiness procesu
│   │       ├── metrics/             # eksporter Prometheus (`GET /metrics`)
│   │       ├── llm/                 # port LLM + adapter HTTP do gateway
│   │       └── shared/              # cross-cutting tylko w api (nie packages/shared)
│   ├── frontend/                    # Next.js — cienki klient
│   │   ├── package.json
│   │   └── src/                     # App Router, moduły UI
│   └── ai-provider-gateway/         # gateway LLM — bez domeny Content Chain
│       ├── package.json
│       └── src/
├── packages/
│   └── shared/                      # typy publicznego kontraktu API
│       ├── package.json
│       └── src/
├── docs/
├── package.json
└── pnpm-workspace.yaml
```


## Mapowanie stylów → katalogi

| Ustalenie z `architektura.md` | Konsekwencja w drzewie |
|-------------------------------|-------------------------|
| Modularny monolit, 3 procesy | `apps/api`, `apps/frontend`, `apps/ai-provider-gateway` |
| Port/adapter (persistence, LLM) | Porty w `domain` / `application`; adaptery w `infrastructure` (+ Prisma w `apps/api/prisma`); klient gateway w `apps/api/src/llm/` |
| Health / metrics (ops) | `apps/api/src/health/`, `apps/api/src/metrics/` — nie BC |
| Social = LangGraph za fasadą | `apps/api/src/social/infrastructure/graph/` |
| Prompty przy BC Social | `apps/api/src/social/infrastructure/prompts/` |
| Cienki frontend | Moduły UI w `apps/frontend/src/modules/`; brak `domain/` SM |
| Gateway bez domeny CC | Tylko kod providerów / routingu w `apps/ai-provider-gateway` |
| Shared typy kontraktu | `packages/shared` — bez use-case’ów i bez Prisma |

## `apps/api` — bounded contexty (~1 poziom w głąb)

Każdy BC (`auth`, `company-context`, `social`, `runs`, `feedback`) trzyma spójny układ warstw:

```text
apps/api/src/<context>/
├── <context>.module.ts
├── <context>.controller.ts          # cienkie HTTP
├── application/                     # use-case’y / serwisy aplikacyjne
├── domain/                          # reguły, typy domenowe, porty (interfejsy)
└── infrastructure/                  # adaptery (Prisma repos, …); klient LLM w `src/llm/`
```

**1 BC ≠ obowiązkowo 1 plik `*.module.ts`.** Wolno wydzielić kernel lifecycle (port `appendLog` / `transition` + hub SSE + repozytorium runu) od HTTP/workera, jeśli to zamyka cykl importów Nest. To nadal ten sam BC Runs — nie nowy bounded context. Klej `RUN_EXECUTOR` w `app.module.ts` (albo `registerAsync`) **nie** jest BC; analogia: `health/` / `llm/` to też nie-BC, ale ops — klej pipeline’u zostaje przy starcie procesu, nie w `llm/`.

### Social (wyjątek orchestracji)

```text
apps/api/src/social/
├── social.module.ts                 # bez controllers[] — HTTP start/HITL jest w Runs
├── application/                     # fasada invoke fazy + SocialRunExecutor
├── domain/
└── infrastructure/
    ├── graph/                       # LangGraph — definicja i węzły pipeline’u
    ├── prompts/                     # szablony promptów SM
    └── persistence/                 # adaptery zapisu wyników SM (via Prisma)
```

Zmiana względem wcześniejszego drzewa z `social.controller.ts`: plik i rejestracja Nest nie istnieją. Wejście produktowe = `POST /runs` i `POST .../hitl` w BC Runs (`architektura.md`).

### Runs / Logs

```text
apps/api/src/runs/
├── runs.module.ts
├── runs.controller.ts               # status, logi, HITL, lista user/:userId, ocena, flaga edycji, finalize
├── application/
├── domain/                          # statusy runu, polityka przejść, lock przeglądu, porty (executor, lifecycle, odczyt wyniku)
└── infrastructure/
```

Port lifecycle (`appendLog`, `transition`) i port executora (`execute`) żyją w `domain/`. Implementacja executora SM **nie** należy do tego drzewa — jest w `social/application/`. Binding tokenu — klej procesu, nie `imports: [SocialModule]` w `runs.module.ts`.

### Feedback (opinie tekstowe)

```text
apps/api/src/feedback/
├── feedback.module.ts
├── feedback.controller.ts           # POST zapisu opinii (MVP: bez panelu odczytu)
├── application/
├── domain/
└── infrastructure/                  # adapter Prisma tabeli opinii
```

### Auth i Company Context

Ten sam szkielet warstw; w `company-context` — reguła bramki kompletności w `domain/`, zapis kanoniczny przez port → Prisma.

### Persistence (Prisma + SQLite w MVP)

- Schema i migracje: `apps/api/prisma/`.
- Użycie ORM **tylko** w `infrastructure` (adapter); application/domain zależą od **portów**, nie od klienta Prisma bezpośrednio.
- **SQLite** jako jedyny provider **MVP**.
- **PostgreSQL** — od fazy **V1 — rozbudowa** (kolejne workflowy): zmiana providera + nowa historia Migrate; nie przenoszenie reguł do UI. Szczegóły: `spec/SPEC-PERSISTENCE.md`.

### `apps/api/src/shared/`

Pomocnicze elementy wyłącznie API (np. konfiguracja, interceptory, mapping błędów). **Nie** dublować `packages/shared` i **nie** umieszczać tu reguł Social / kontekstu firmy.

### `apps/api/src/health/`, `metrics/`, `llm/`

To **nie** są bounded contexty — brak układu `application` / `domain` / `infrastructure`.

- `health/` — liveness i readiness procesu (`GET /api/v1/health`, `GET /api/v1/health/ready`; kontrakt: `dokumentacja_komunikacji.md`).
- `metrics/` — eksporter Prometheus (`GET /metrics` poza `/api/v1`; `observability.md`).
- `llm/` — port LLM i adapter HTTP do `apps/ai-provider-gateway`. Wołają go BC (np. Social), nie kontrolery HTTP. Helper kształtu logu hopu: `llm-gateway-chat.log.ts` (stdout tylko w `development`, z redakcją `GATEWAY_KEY` — `observability.md`). **Nie** umieszczać tu domeny Content Chain ani kluczy vendorów.

## `apps/frontend`

```text
apps/frontend/src/
├── app/                             # App Router (routes, layouts)
├── modules/                         # np. auth, company-context, social, runs, feedback
├── shared/                          # UI kit / utils frontu (nie domena api)
└── ...
```

- Moduły UI wołają `apps/api` przez HTTP; typy z `@content-chain/shared` (lub równoważny alias workspace). Katalog `modules/` zastępuje wcześniejszą nazwę `features/`.
- Zakaz: sekrety LLM, bezpośredni dostęp do Prisma/gateway vendorów, kopiowanie reguł bramki / pipeline’u.

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
| Prisma wyłącznie jako adapter w `infrastructure` (+ `prisma/`) | Import Prisma w `domain/` lub w `packages/shared` |
| Prompty i graf w `social/infrastructure/` | Prompty i wywołania LLM w controllerze |
| Typy publiczne w `packages/shared` (**bez Zod**) | Use-case’y, DB, Zod/runtime w `packages/shared` |
| Aplikacje pod `apps/` | Rootowy katalog `src/` opakowujący wszystkie app |
| Kernel lifecycle Runs + klej `RUN_EXECUTOR` w `AppModule` | `forwardRef` Runs ↔ Social; port lifecycle w `packages/shared` |
| Kolekcja E2E pod `apps/api/test/postman/` | `apps/api/postman/` ani `apps/api/src/postman/` (wygląda jak moduł produktu) |

## Poza zakresem tego dokumentu

- Normatywny kontrakt HTTP / błędy → `dokumentacja_komunikacji.md`
- Przepływy runu end-to-end → `data_flow.md`
- Skrypty deploy / env → `deployment.md`
- Brand types → `brand_types.md`
- Pełna lista każdego pliku źródłowego (implementacja doprecyzuje nazwy use-case’ów)
