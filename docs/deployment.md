# Deployment — Content Chain

Self-host MVP: jak uruchamiać, konfigurować i utrzymywać jedną instalację (jedna firma = jedna instancja).

Powiązane: `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `testy.md`, `security.md`, `observability.md`.

## Środowiska

| Nazwa | Przeznaczenie |
|-------|----------------|
| **`local`** | Development na stacji (DX): pnpm workspaces, hot reload, SQLite lokalny plik |
| **`production`** | Self-host u operatora: docelowo `docker compose` (lub równoważne), trwały volume DB, sekrety z env |

Bez osobnego „SaaS multi-tenant cloud” w MVP. Staging opcjonalny później = kolejna instancja `production`-like.

## Sposoby uruchomienia (C)

### DX — pnpm (`local`)

1. `pnpm install` w rootcie (workspaces).
2. Skopiować `.env.example` → `.env` dla `apps/api`, `apps/ai-provider-gateway`, `apps/frontend` (wg implementacji).
3. Migracje Prisma (api) na SQLite.
4. Uruchomić procesy: gateway → api → frontend (kolejność: najpierw gateway, potem api zależne od niego).
5. Bootstrap admin (`POST /api/v1/auth/bootstrap-admin`) przy pustej DB.

Skrypty dokładne (`pnpm dev` / `pnpm --filter …`) doprecyzuje root `package.json` przy implementacji.

### Self-host — Docker Compose (`production`)

Jeden stack:

| Usługa | Obraz / build | Rola |
|--------|---------------|------|
| `frontend` | `apps/frontend` | UI |
| `api` | `apps/api` | Domena, runy, SSE, `/metrics` |
| `ai-provider-gateway` | `apps/ai-provider-gateway` | LLM |
| Volume | np. `api-sqlite` | Plik SQLite (kanoniczna DB) |

- Frontend woła api (URL z env).
- Api woła gateway po sieci compose (wewnętrzny hostname); **`X-Gateway-Key`** tylko w env api/gateway.
- Publish: UI (np. 3000), api (np. 3001), gateway **nie musi** być publiczny na zewnątrz (tylko sieć wewnętrzna) — rekomendacja production.
- `/metrics` api (i opcjonalnie gateway) — scrape z sieci ops / localhost; nie eksponować zbędnie na internet.

## Konfiguracja i sekrety

- **Env per aplikacja**; w repo tylko **`.env.example`** (placeholdery).
- **Zakaz** commitowania `.env`, kluczy vendorów, `X-Gateway-Key`, JWT secrets.
- Fail-fast: brak wymaganych zmiennych → proces nie wstaje (szczególnie api i gateway).
- Przykładowe kategorie zmiennych (nazwy ustali implementacja):

| Obszar | Przykłady |
|--------|-----------|
| Api | `DATABASE_URL` (SQLite), `JWT_*`, `GATEWAY_BASE_URL`, `GATEWAY_KEY`, `NODE_ENV` |
| Gateway | klucze providerów, `gateway.config.yaml`, allowlista kluczy, port |
| Frontend | `NEXT_PUBLIC_API_BASE_URL` (tylko URL api — **bez** sekretów LLM) |

## Observability

| Sygnał | Gdzie | Uwagi |
|--------|-------|--------|
| Logi runu (domena) | DB + SSE | Źródło prawdy przebiegu SM |
| Stdout/stderr | kontenery / procesy | Ops, błędy procesu |
| Metryki | `GET /metrics` na **`apps/api`** | Prometheus; nie mylić z logami runu |
| Metryki gateway | opcjonalnie scrape gateway `/metrics` | Jak w projekcie upstream |

W `production`: zalecany Prometheus (lub agent) scrapujący api; alerty poza MVP docs (można dodać później).

## Dane i backup (SQLite)

- Plik DB na **nazwanym volume** (compose) lub wskazanej ścieżce (`local`).
- Backup MVP: spójna kopia pliku SQLite przy zatrzymanym zapisie lub z użyciem bezpiecznej procedury kopiowania (np. `sqlite3 .backup`) — szczegóły w runbooku implementacji.
- **Bez HA / Postgres jako wymogu MVP**; ewentualny adapter Postgres = później.
- Eksport kontekstu do `.md` / checksum — **nie** w pierwszym dowodzie agentów (tuż po MVP).

## Kolejność wdrożenia vs produkt

Zgodna z docs koncepcyjnymi:

1. api + gateway + pipeline + SQLite (Postman)  
2. auth  
3. frontend  

Compose może od początku definiować wszystkie trzy usługi; „puste” UI do czasu gotowości api jest OK.

## Checklist operatora (`production`)

1. Ustaw env / sekrety (api, gateway, frontend).  
2. `docker compose up` (build).  
3. Sprawdź `GET /api/v1/health` (api) oraz readiness gateway (wewnętrznie).  
4. Bootstrap admin.  
5. Uzupełnij kontekst → completeness.  
6. Smoke: start runu SM (Postman lub UI).  
7. Podłącz scrape `/metrics` (opcjonalnie od razu).  
8. Zaplanuj backup volume SQLite.

## Anty-patterny deploy (skrót)

- Publiczny gateway z vendor keys na 0.0.0.0 bez potrzeby.
- Sekrety w obrazie Docker (warstwach) zamiast env runtime.
- SQLite na efemerycznym filesystemie kontenera bez volume.
- Traktowanie samego Postmana jako końca self-host UX.

## Poza zakresem MVP

- Kubernetes / multi-region  
- Managed Postgres jako wymóg  
- Automatyczny certyfikat / pełny ingress guide (można dodać później)  
- Multi-tenant SaaS
