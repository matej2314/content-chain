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
5. First-run w UI (`bootstrap-status` → formularz) albo równoważnie `POST /api/v1/auth/bootstrap-admin` przy pustej DB (ops / Postman).

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
- Nazwy zmiennych api = `apps/api/.env.example` (i walidacja przy starcie). Gateway / frontend — wg ich `.env.example`.
- W `production`: `CORS_ORIGIN` nie może być `*`.

| Obszar | Zmienne |
|--------|---------|
| Api | `NODE_ENV`, `PORT`, `DATABASE_URL` (SQLite), `GATEWAY_BASE_URL`, `GATEWAY_KEY`, `GATEWAY_MODEL_ALIAS`, `JWT_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL`, `CORS_ORIGIN`, `MAX_CONCURRENT_RUNS`, **`INVITE_TTL`** (default `7d`, ten sam parser co JWT TTL), **`MAIL_FROM`**, **`APP_PUBLIC_URL`**, **`SMTP_HOST`**, **`SMTP_PORT`**, **`SMTP_USER`**, **`SMTP_PASS`** |
| Gateway | klucze providerów, `gateway.config.yaml`, allowlista kluczy, port (szczegóły: `apps/ai-provider-gateway/.env.example`) |
| Frontend | `NEXT_PUBLIC_API_BASE_URL` (tylko URL api — **bez** sekretów LLM) |

Nazwy SMTP / maila są **kanoniczne** (te same w `spec/SPEC-BEZPIECZENSTWO.md` i `.env.example` przy implementacji):

| Zmienna | `production` | `development` / `test` |
|---------|--------------|------------------------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | **obowiązkowe** (fail-fast) | nie wymagane — adapter **logujący** (konsola / Pino), bez prawdziwego SMTP |
| `MAIL_FROM` | **obowiązkowe** (fail-fast) | nie wymagane przy adapterze logującym |
| `APP_PUBLIC_URL` | **obowiązkowe** (publiczny URL aplikacji w linku zaproszenia) | nie wymagane; w logu dev wystarczy ścieżka / placeholder |
| `INVITE_TTL` | opcjonalne, default **`7d`** | to samo |

Bootstrap admina **bez SMTP** nadal możliwy (email + hasło, bez maila).

Create / resend zaproszenia: lokalnie (`development` / `test`) send adaptera logującego **zawsze się udaje** → zawsze **201**. **503** `MAIL_DELIVERY_FAILED` + `details.id` tylko przy padzie **prawdziwego** SMTP (`production`).

`MAX_CONCURRENT_RUNS` ogranicza liczbę równoległych execute: claim `queued → running` **oraz** `interrupted → running` (wznowienia po restarcie). Nie dotyczy wyłącznie nowych `POST /runs`.

Lokalna instancja gateway w tym repo: `apps/ai-provider-gateway/gateway.config.yaml` (m.in. `timeoutMs` i `maxOutputTokens` aliasu używanego przez api) musi unieść hop Social z pełnym JSON kontekstu firmy. **Liczb z YAML nie pinujemy w SPEC** — źródło operatorskie to plik instancji. Ingress native: **10 000** znaków na `content` `user` / `assistant` (`dokumentacja_komunikacji.md`). Jak odpalić happy path: `apps/api/test/postman/README.md`.

## Observability

| Sygnał | Gdzie | Uwagi |
|--------|-------|--------|
| Logi runu (domena) | DB + SSE | Źródło prawdy przebiegu Social / Content |
| Stdout/stderr | kontenery / procesy | Ops, błędy procesu |
| Metryki | `GET /metrics` na **`apps/api`** | Prometheus; nie mylić z logami runu |
| Metryki gateway | opcjonalnie scrape gateway `/metrics` | Jak w projekcie upstream |

W `production`: zalecany Prometheus (lub agent) scrapujący api; alerty poza MVP docs (można dodać później).

## Dane i backup (SQLite)

- Plik DB na **nazwanym volume** (compose) lub wskazanej ścieżce (`local`).
- Backup MVP: spójna kopia pliku SQLite przy zatrzymanym zapisie lub z użyciem bezpiecznej procedury kopiowania (np. `sqlite3 .backup`) — szczegóły w runbooku implementacji.
- W **MVP**: wyłącznie SQLite (volume), w tym modele reel i Content. **PostgreSQL** — obowiązkowo od fazy **V1 — rozbudowa** (ops / skala, **nie** warunek dodania Content): nowa historia migracji, pusta baza, ew. osobny import danych — `spec/SPEC-PERSISTENCE.md`.
- Eksport kontekstu do `.md` / checksum — **nie** w pierwszym dowodzie agentów (tuż po MVP).

## Kolejność wdrożenia vs produkt

Zgodna z docs koncepcyjnymi:

1. api + gateway + **oba** pipeline’y (Social posty/rolki + Content) + SQLite (`apps/api/test/postman/` — kolekcja Social A–D i Content A–B)  
2. auth  
3. frontend  

Compose może od początku definiować wszystkie trzy usługi; „puste” UI do czasu gotowości api jest OK.

## Checklist operatora (`production`)

1. Ustaw env / sekrety (api, gateway, frontend).  
2. `docker compose up` (build).  
3. Sprawdź `GET /api/v1/health` (api) oraz readiness gateway (wewnętrznie).  
4. Bootstrap admin.  
5. (Opcjonalnie) smoke zaproszenia: `POST /invitations` → token z maila SMTP; lokalnie adapter logujący → token z logu api.  
6. Uzupełnij kontekst → completeness.  
7. Smoke: start runu Social i Content (`apps/api/test/postman/` albo UI).  
8. Podłącz scrape `/metrics` (opcjonalnie od razu).  
9. Zaplanuj backup volume SQLite.

## Anty-patterny deploy (skrót)

- Publiczny gateway z vendor keys na 0.0.0.0 bez potrzeby.
- Sekrety w obrazie Docker (warstwach) zamiast env runtime.
- SQLite na efemerycznym filesystemie kontenera bez volume.
- Traktowanie samego Postmana jako końca self-host UX.

## Poza zakresem MVP

- Kubernetes / multi-region  
- Managed Postgres **w MVP** (Postgres = faza **V1 — rozbudowa**, ops/skala — nie warunek Content)  
- Automatyczny certyfikat / pełny ingress guide (można dodać później)  
- Multi-tenant SaaS
