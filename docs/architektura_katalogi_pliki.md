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
│   │   ├── package.json
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── auth/
│   │       ├── company-context/
│   │       ├── social/
│   │       ├── runs/
│   │       └── shared/              # cross-cutting tylko w api (nie packages/shared)
│   ├── frontend/                    # Next.js — cienki klient
│   │   ├── package.json
│   │   └── src/                     # App Router, features UI
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
| Port/adapter (persistence, LLM) | Porty w `domain` / `application`; adaptery w `infrastructure` (+ Prisma w `apps/api/prisma`) |
| Social = LangGraph za fasadą | `apps/api/src/social/infrastructure/graph/` |
| Prompty przy BC Social | `apps/api/src/social/infrastructure/prompts/` |
| Cienki frontend | Features UI w `apps/frontend`; brak `domain/` SM |
| Gateway bez domeny CC | Tylko kod providerów / routingu w `apps/ai-provider-gateway` |
| Shared typy kontraktu | `packages/shared` — bez use-case’ów i bez Prisma |

## `apps/api` — bounded contexty (~1 poziom w głąb)

Każdy BC (`auth`, `company-context`, `social`, `runs`) trzyma spójny układ warstw:

```text
apps/api/src/<context>/
├── <context>.module.ts
├── <context>.controller.ts          # cienkie HTTP
├── application/                     # use-case’y / serwisy aplikacyjne
├── domain/                          # reguły, typy domenowe, porty (interfejsy)
└── infrastructure/                  # adaptery (Prisma repos, klient gateway, …)
```

### Social (wyjątek orchestracji)

```text
apps/api/src/social/
├── social.module.ts
├── social.controller.ts
├── application/                     # fasada: start/wznów pipeline, bez fat controller
├── domain/
└── infrastructure/
    ├── graph/                       # LangGraph — definicja i węzły pipeline’u
    ├── prompts/                     # szablony promptów SM
    └── persistence/                 # adaptery zapisu wyników SM (via Prisma)
```

### Runs / Logs

```text
apps/api/src/runs/
├── runs.module.ts
├── runs.controller.ts               # status runu, logi, wznowienie HITL (wg kontraktu API)
├── application/
├── domain/                          # statusy runu, polityka przejść
└── infrastructure/
```

### Auth i Company Context

Ten sam szkielet warstw; w `company-context` — reguła bramki kompletności w `domain/`, zapis kanoniczny przez port → Prisma.

### Persistence (Prisma + SQLite)

- Schema i migracje: `apps/api/prisma/`.
- Użycie ORM **tylko** w `infrastructure` (adapter); application/domain zależą od **portów**, nie od klienta Prisma bezpośrednio.
- SQLite jako domyślny provider MVP; ewentualny PostgreSQL później = zmiana providera / adaptera, nie przeniesienie reguł do UI.

### `apps/api/src/shared/`

Pomocnicze elementy wyłącznie API (np. konfiguracja, interceptory, mapping błędów). **Nie** dublować `packages/shared` i **nie** umieszczać tu reguł Social / kontekstu firmy.

## `apps/frontend`

```text
apps/frontend/src/
├── app/                             # App Router (routes, layouts)
├── features/                        # np. auth, company-context, social, runs
├── shared/                          # UI kit / utils frontu (nie domena api)
└── ...
```

- Features wołają `apps/api` przez HTTP; typy z `@content-chain/shared` (lub równoważny alias workspace).
- Zakaz: sekrety LLM, bezpośredni dostęp do Prisma/gateway vendorów, kopiowanie reguł bramki / pipeline’u.

## `apps/ai-provider-gateway`

Struktura wewnętrzna zgodna z dostosowaną instancją gateway’a (osobny produkt). W Content Chain obowiązuje norma: **brak** modułów `company-context` / `social` / auth produktu w tym drzewie.

## `packages/shared`

```text
packages/shared/src/
├── index.ts
└── ...                              # typy request/response, enumy publiczne (role, statusy runu, platformy SM)
```

Tylko kontrakt; bez implementacji Nest/Next/Prisma/LangGraph.

## Zasady lokalizacji (do/don’t)

| Wolno | Nie wolno |
|-------|-----------|
| Reguły domenowe i pipeline w `apps/api/src/<bc>/` | Logika SM / bramki kontekstu w `apps/frontend` lub gateway |
| Prisma wyłącznie jako adapter w `infrastructure` (+ `prisma/`) | Import Prisma w `domain/` lub w `packages/shared` |
| Prompty i graf w `social/infrastructure/` | Prompty i wywołania LLM w controllerze |
| Typy publiczne w `packages/shared` | Use-case’y i dostęp do DB w `packages/shared` |
| Aplikacje pod `apps/` | Rootowy katalog `src/` opakowujący wszystkie app |

## Poza zakresem tego dokumentu

- Normatywny kontrakt HTTP / błędy → `dokumentacja_komunikacji.md`
- Przepływy runu end-to-end → `data_flow.md`
- Skrypty deploy / env → `deployment.md`
- Brand types → `brand_types.md`
- Pełna lista każdego pliku źródłowego (implementacja doprecyzuje nazwy use-case’ów)
