---
wersja: 9
data_utworzenia: 2026-09-30
data_modyfikacji: 2026-10-09
---

# Deployment — Content Chain

Self-host MVP: jak uruchamiać, konfigurować i utrzymywać jedną instalację (jedna firma = jedna instancja).

Powiązane: `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `testy.md`, `security.md`, `observability.md`.

Zmiana względem: compose / publish / sekrety bez modelu Compose-first. Od tej wersji kanon production: **trzy usługi** (`ai-provider-gateway` + `api` + `frontend`); **jeden** root `.env` (Vault → Jenkins); publish **`127.0.0.1`**; sieci **`cc-network`** + **`main_network`**; Redis **external** (env, nie usługa compose); volume SQLite `api-sqlite` → `/app/data/chain.db`; migracje w entrypoint api; build z **roota** monorepo + **pnpm**; FE `API_BASE_URL=http://api:3001`, port **3004**; api→gateway po hostname serwisu compose `:3100`.

Zmiana względem: checklist health = tylko liveness api + readiness gateway (ops). Od tej wersji: api `/health` (liveness) **oraz** api `/health/ready` (zależność = gateway **liveness**); gateway `/health/ready` zostaje ops/orchestracja, **nie** bramka chipa „Agenci aktywni”.

Zmiana względem: brak frontmatteru; env api bez zmiennych TTL przeglądu. Od tej wersji: `REVIEW_TTL` (okno przeglądu) i `REVIEW_SWEEP_INTERVAL` (częstotliwość sweepera; boot zawsze raz). MVP = **single-process** api (multi-instance poza zakresem).

Zmiana względem: mailer tylko `user_invited`. Od tej wersji: także `user_activation`; opcjonalne `ACTIVATION_TTL` (default `7d`); backup SQLite przenosi konta (w tym admina); DEMO nie wymaga migracji roli admina.

Zmiana względem: `DEMO_MODE` wyłącznie kotwica planu demo, **nie** w tabeli env. Od tej wersji kanon ops: `DEMO_MODE` (default `false`), `GUEST_GLOBAL_CAP_PER_DAY` (default **30**), `GUEST_RATING_CAP_PER_DAY` (default **10**); TZ limitów = **UTC**; Redis pod cap gdy demo on; dump przenosi role (w tym `guest`); `DEMO_MODE` **nie** degraduje ról w DB.

Zmiana względem: Redis w ops tylko jako „połączenie pod klucze” bez nazw env. Od tej wersji: `REDIS_URL` **albo** `REDIS_HOST`+`REDIS_PORT` (URL wygrywa); opcjonalne **`REDIS_PASSWORD`** wyłącznie w trybie HOST/PORT.

Zmiana względem: kanon `REDIS_URL` **albo** HOST/PORT. Od tej wersji **tylko** `REDIS_HOST`+`REDIS_PORT` (+ opcjonalne `REDIS_PASSWORD`); **`REDIS_URL` usunięte**.

Zmiana względem: Faza 18 — przy `DEMO_MODE=true` tylko self-register → `guest`. Od tej wersji: konta z **register i accept-invite** → `guest`; cel instancji demo = sandbox do poklikania. Restart / dump / brak degradacji ról przez sam flag — **bez zmian**.

## Środowiska

| Nazwa | Przeznaczenie |
|-------|----------------|
| **`local`** | Development na stacji (DX): pnpm workspaces, hot reload, SQLite lokalny plik |
| **`production`** | Self-host u operatora: **Compose-first** (`docker compose up -d --build`), trwały volume DB, sekrety z jednego root `.env` (Vault → Jenkins) |

Bez osobnego „SaaS multi-tenant cloud” w MVP. Staging opcjonalny później = kolejna instancja `production`-like (poza bieżącym planem naprawy deployu).

## Sposoby uruchomienia (C)

### DX — pnpm (`local`)

1. `pnpm install` w rootcie (workspaces).
2. Skopiować **per-app** `.env.example` → `.env` dla `apps/api`, `apps/ai-provider-gateway`, `apps/frontend` (DX / dokumentacja kluczy). W `production` te same klucze lądują w **jednym** root `.env` — patrz niżej.
3. Migracje Prisma (api) na SQLite (`prisma migrate deploy` / skrypt DX).
4. Uruchomić procesy: gateway → api → frontend (kolejność: najpierw gateway, potem api zależne od niego).
5. First-run w UI: strona główna (karta logowania) przy `bootstrap-status.available` submituje `POST /api/v1/auth/bootstrap-admin`; równoważnie ten sam endpoint z Postmana przy pustej DB (ops).

Skrypty dokładne (`pnpm dev` / `pnpm --filter …`) doprecyzuje root `package.json` przy implementacji.

### Self-host — Docker Compose (`production`)

**Model: Compose-first.** Źródło prawdy runtime: root `docker-compose.yml`. Job Jenkins (gdy wdrożony) woła `docker compose up -d --build` w katalogu projektu.

**Zakres usług stacku** — wyłącznie trzy:

| Usługa | Dockerfile (context = **root** monorepo) | Rola | Host bind | Kontener |
|--------|------------------------------------------|------|-----------|----------|
| `ai-provider-gateway` | `apps/ai-provider-gateway/…` (ścieżka w compose) | LLM | `127.0.0.1:3100` | `3100` |
| `api` | `apps/api/Dockerfile` | Domena, runy, SSE, `/metrics` | `127.0.0.1:3001` | `3001` |
| `frontend` | `apps/frontend/Dockerfile` | UI (Next) | `127.0.0.1:3004` | `3004` |
| Volume `api-sqlite` | — | Plik SQLite | — | `/app/data` → DB `file:/app/data/chain.db` |

**Poza bazowym `up`:** Redis, Ollama, Prometheus/Grafana i inne compose z `apps/ai-provider-gateway/deployment/` **nie** wchodzą w ten stack. Redis na serwerze jest **external** — api łączy się przez `REDIS_HOST` / `REDIS_PORT` (+ opcjonalne `REDIS_PASSWORD`) z env.

**Sieci (wszystkie trzy usługi):**

| Sieć | Typ | Rola |
|------|-----|------|
| `cc-network` | tworzona w compose | DNS między serwisami (`api` ↔ `ai-provider-gateway` ↔ `frontend`) |
| `main_network` | **external** (już na serwerze) | Podpięcie pod edge / reverse proxy na hoście |

**Publish:** FE, api i gateway → wyłącznie **`127.0.0.1:<port>:<port>`** (nie `0.0.0.0`). Dostęp z internetu tylko przez edge na hoście / `main_network` (reverse proxy poza tym dokumentem jako pełny guide). Gateway **nie** jest publicznym originem.

**Build obrazów:** kontekst **root** monorepo + **pnpm** (workspace / `packages/shared`). Zakaz zakładania samodzielnego `npm ci` w `apps/<svc>` bez shared.

**`gateway.config.yaml`:** w remote repo; **COPY do obrazu** oraz **volume mount** z hosta (`./apps/ai-provider-gateway/gateway.config.yaml` → kontener, typowo `:ro`). Host nadpisuje runtime; **bez sekretów w YAML**.

**Migracje api:** entrypoint kontenera api: `prisma migrate deploy` → dopiero start procesu Node. Pad migracji = pad kontenera / fail joba.

**Runtime FE:** `API_BASE_URL=http://api:3001` (hostname serwisu compose); port UI production **3004** (`next start -p 3004`).

**Api → gateway:** `GATEWAY_BASE_URL=http://ai-provider-gateway:3100` (hostname serwisu compose + port 3100) — **nie** `localhost` w env kontenera api.

- Api woła gateway po sieci compose; **`X-Gateway-Key`** tylko w env api/gateway.
- Front **nie** ustawia `NEXT_PUBLIC_API_BASE_URL` jako adresu, pod który przeglądarka idzie bezpośrednio. Serwer Next: `API_BASE_URL` (wewnętrzny URL api). Przeglądarka: same-origin `/api/v1/...`.
- Proxy BFF **musi** przekazywać `Cookie` / `Set-Cookie` oraz **strumieniować** SSE (`text/event-stream`) — zakaz zbierania całego response do bufora.
- `/metrics` api (i opcjonalnie gateway) — scrape z sieci ops / localhost; nie eksponować zbędnie na internet.

## Konfiguracja i sekrety

- **Production:** **jeden** root `.env` w katalogu projektu (Jenkins generuje z Vault AppRole → flat map kluczy pod `secret/data/${CONT_NAME}/${VAULT_ENV}`). Compose podaje go wszystkim usługom (`env_file: ./.env` lub równoważne).
- **DX / dokumentacja kluczy:** w repo nadal **per-app `.env.example`** (`apps/api`, `apps/ai-provider-gateway`, `apps/frontend`) oraz root `.env.example` (suma kluczy prod) — placeholdery; **nie** kanon runtime production.
- **Zakaz** commitowania `.env`, kluczy vendorów, `X-Gateway-Key`, JWT secrets; **zakaz** bake sekretów w warstwach obrazu.
- Fail-fast: brak wymaganych zmiennych → proces nie wstaje (szczególnie api i gateway).
- Nazwy zmiennych api = `apps/api/.env.example` (i walidacja przy starcie). Gateway / frontend — wg ich `.env.example` (te same nazwy w root `.env` w prod).
- W `production`: `CORS_ORIGIN` nie może być `*`.

| Obszar | Zmienne |
|--------|---------|
| Api | `NODE_ENV`, `PORT`, `DATABASE_URL` (**kanon prod:** `file:/app/data/chain.db`), `GATEWAY_BASE_URL` (**kanon prod:** `http://ai-provider-gateway:3100`), `GATEWAY_KEY`, `GATEWAY_MODEL_ALIAS`, `JWT_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL`, `CORS_ORIGIN`, `MAX_CONCURRENT_RUNS`, **`DEMO_MODE`** (`true`\|`false`, default **`false`** — przy starcie procesu; zmiana = restart), **`GUEST_GLOBAL_CAP_PER_DAY`** (default **30**, walidowany), **`GUEST_RATING_CAP_PER_DAY`** (default **10**, walidowany), **`INVITE_TTL`** (default `7d`, ten sam parser co JWT TTL), **`ACTIVATION_TTL`** (default `7d`, ten sam parser — TTL tokenu aktywacji konta), **`REVIEW_TTL`** (default `2h`, ten sam parser), **`REVIEW_SWEEP_INTERVAL`** (default `5m`, ten sam styl stringa TTL), **`MAIL_FROM`**, **`APP_PUBLIC_URL`**, **`SMTP_HOST`**, **`SMTP_PORT`**, **`SMTP_USER`**, **`SMTP_PASS`**. Redis (gdy demo on / cap guest): **`REDIS_HOST`**+**`REDIS_PORT`** (wymagane przy `DEMO_MODE=true`; instancja **external** na serwerze — nie kontener w tym compose); opcjonalne **`REDIS_PASSWORD`**. Klucze: `content-chain:guest:daily:runs:{UTC-date}` oraz `content-chain:guest:daily:ratings:{userId}:{UTC-date}` |
| Gateway | klucze providerów, `gateway.config.yaml` (plik + mount), allowlista kluczy, port **3100** (szczegóły: `apps/ai-provider-gateway/.env.example`) |
| Frontend | **`API_BASE_URL`** (**kanon prod:** `http://api:3001`; tylko proces Next → api; **bez** `NEXT_PUBLIC_*` na ten URL). Przeglądarka nie zna origina api. Port UI prod **3004**. |

Nazwy SMTP / maila są **kanoniczne** (te same w `spec/SPEC-BEZPIECZENSTWO.md` i `.env.example` przy implementacji):

| Zmienna | `production` | `development` / `test` |
|---------|--------------|------------------------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | **obowiązkowe** (fail-fast) | nie wymagane — adapter **logujący** (konsola / Pino), bez prawdziwego SMTP |
| `MAIL_FROM` | **obowiązkowe** (fail-fast) | nie wymagane przy adapterze logującym |
| `APP_PUBLIC_URL` | **obowiązkowe** (publiczny URL aplikacji w linku zaproszenia **i** aktywacji) | nie wymagane; w logu dev wystarczy ścieżka / placeholder |
| `INVITE_TTL` | opcjonalne, default **`7d`** | to samo |
| `ACTIVATION_TTL` | opcjonalne, default **`7d`** (jak invite) | to samo — TTL tokenu `AccountActivation` |
| `REVIEW_TTL` | opcjonalne, default **`2h`** (fail-fast przy złym stringu, jak inne TTL) | to samo — długość **okna przeglądu** od `pipelineFinishedAt` |
| `REVIEW_SWEEP_INTERVAL` | opcjonalne, default **`5m`** (fail-fast przy złym stringu) | to samo — częstotliwość **okresowego** sweepera; boot api zawsze odpala sweeper **raz** |

`REVIEW_TTL` = jak długo po `completed`/`failed` wolno mutować przegląd. `REVIEW_SWEEP_INTERVAL` = jak często job domyka wygasłe wiersze w DB (`reviewFinalizedAt`); **nie** przedłuża ani nie skraca okna przeglądu.

Bootstrap admina **bez SMTP** nadal możliwy (email + hasło, bez maila).

Create / resend zaproszenia **oraz** mail aktywacji przy **register**: lokalnie (`development` / `test`) send adaptera logującego **zawsze się udaje**. **503** `MAIL_DELIVERY_FAILED` + `details.id` tylko przy padzie **prawdziwego** SMTP (`production`) na invite create/resend **oraz** register. **`POST /auth/resend-activation`:** pad SMTP → **bez** **503** (zawsze **200** + `Wiadomość wysłana ponownie`).

**Kanon URL w mailach:**

| Kind | URL |
|------|-----|
| `user_invited` | `{APP_PUBLIC_URL}/invite/accept?token={raw}` |
| `user_activation` | `{APP_PUBLIC_URL}/?activationToken={raw}` → FE natychmiast widok logowania + activate w tle |

Aktywacja linkiem wymagana **tylko** gdy `NODE_ENV=production`. Poza prod: `verifiedAt` przy register od razu; opcjonalny log URL. Migracja wprowadzająca `verifiedAt`: **backfill** istniejących `User` → `verifiedAt = createdAt`; bootstrap / accept-invite ustawiają `verifiedAt = now()` przy create.

`MAX_CONCURRENT_RUNS` ogranicza liczbę równoległych execute: claim `queued → running` **oraz** `interrupted → running` (wznowienia po restarcie). Nie dotyczy wyłącznie nowych `POST /runs`. **Nie** jest drugim capem gościa — global guest cap to Redis (doba UTC), **przed** create Run.

| Zmienna | Semantyka |
|---------|-----------|
| `DEMO_MODE` | `true` \| `false` (string bool), default **`false`**. Ładowane przy starcie. **Brak** UI toggle. Register **zawsze** dostępny. Przy `true`: nowe konta z **register i accept-invite** → `guest` (sandbox do poklikania); przy `false`: obie ścieżki → `user` (invite = członek zespołu). |
| `GUEST_GLOBAL_CAP_PER_DAY` | Default **30**. Wszystkie starty `guest` na instancji / dobę UTC. |
| `GUEST_RATING_CAP_PER_DAY` | Default **10**. Soft limit ocen `guest` / user / dobę UTC. |
| `REDIS_HOST` + `REDIS_PORT` | Standalone Redis (**external** — nie usługa w bazowym compose CC). Przy `DEMO_MODE=true` **wymagane** (fail-fast). |
| `REDIS_PASSWORD` | Opcjonalne hasło AUTH (ioredis `password`). Sekret — nie w logach / envelope / health. |

Przy `DEMO_MODE=true` Redis jest potrzebny pod cap runów i soft rating. Przy `false` Redis **opcjonalny**. `GET /health` i `/health/ready` **nie** failują z powodu braku Redis.

Lokalna instancja gateway w tym repo: `apps/ai-provider-gateway/gateway.config.yaml` (m.in. `timeoutMs` i `maxOutputTokens` aliasu używanego przez api) musi unieść hop Social z pełnym JSON kontekstu firmy. **Liczb z YAML nie pinujemy w SPEC** — źródło operatorskie to plik instancji. Ingress native: **10 000** znaków na `content` `user` / `assistant` (`dokumentacja_komunikacji.md`). Jak odpalić happy path: `apps/api/test/postman/README.md`.

## Observability

| Sygnał | Gdzie | Uwagi |
|--------|-------|--------|
| Logi runu (domena) | DB + SSE | Źródło prawdy przebiegu Social / Content |
| Stdout/stderr | kontenery / procesy | Ops, błędy procesu |
| Metryki | `GET /metrics` na **`apps/api`** | Prometheus; nie mylić z logami runu |
| Metryki gateway | opcjonalnie scrape gateway `/metrics` | Jak w projekcie upstream; **nie** część bazowego compose CC |

W `production`: zalecany Prometheus (lub agent) scrapujący api z localhost / sieci ops; pełny stack monitoringowy (Prometheus/Grafana z gateway deployment) **poza** bazowym `up`. Alerty poza MVP docs (można dodać później).

## Dane i backup (SQLite)

- Plik DB na **nazwanym volume** `api-sqlite` montowanym jako **`/app/data`** w kontenerze api; kanoniczny URL: **`DATABASE_URL=file:/app/data/chain.db`**.
- Backup MVP: spójna kopia pliku SQLite przy zatrzymanym zapisie lub z użyciem bezpiecznej procedury kopiowania (np. `sqlite3 .backup`) — szczegóły w runbooku implementacji.
- **Backup / restore przenosi konta i role** (w tym `admin`, `user`, **`guest`**). Nowa pusta DB + bootstrap = **nowy** admin (nie „odzyskanie” starego bez restore volume). **`DEMO_MODE` nie degraduje** ról w DB (guest zostaje guest po restarcie z demo off — sesja/login wtedy **401**, wiersz bez zmiany roli).
- W **MVP**: wyłącznie SQLite (volume), w tym modele reel i Content. **PostgreSQL** — obowiązkowo od fazy **V1 — rozbudowa** (ops / skala, **nie** warunek dodania Content): nowa historia migracji, pusta baza, ew. osobny import danych — `spec/SPEC-PERSISTENCE.md`.
- Eksport kontekstu do `.md` / checksum — **nie** w pierwszym dowodzie agentów (tuż po MVP).

## Kolejność wdrożenia vs produkt

Zgodna z docs koncepcyjnymi:

1. api + gateway + **oba** pipeline’y (Social posty/rolki + Content) + SQLite (`apps/api/test/postman/` — kolekcja Social A–D i Content A–B)  
2. auth  
3. frontend  

Compose od początku definiuje wszystkie trzy usługi; „puste” UI do czasu gotowości api jest OK.

## Checklist operatora (`production`)

1. Root `.env` z Vault (lub równoważne sekrety) — suma kluczy api + gateway + frontend; per-app `.env.example` tylko jako dokumentacja.  
2. Sieć Docker `main_network` istnieje na hoście; `cc-network` tworzy compose.  
3. `docker compose up -d --build` (root `docker-compose.yml`).  
4. **Smoke (obowiązkowy w Jenkins):** `GET http://127.0.0.1:3001/api/v1/health` (api — liveness procesu).  
5. **Smoke (obowiązkowy w Jenkins):** `GET http://127.0.0.1:3001/api/v1/health/ready` — body `status === "ready"` (api + gateway żyją; `checks.gateway` = liveness procesu gateway). **Brak `ready` = fail joba** (timeout/retry, nie jednorazowy curl).  
6. (Ops / orchestracja) readiness gateway wewnętrznie: `GET {gateway}/api/v1/health/ready` — **nie** źródło chipa „Agenci aktywni” w CC.  
7. Bootstrap admin.  
8. (Opcjonalnie) smoke zaproszenia: `POST /invitations` → token z maila SMTP; lokalnie adapter logujący → token z logu api → `POST /auth/accept-invite` → `POST /auth/login`. Przy **`DEMO_MODE=true`**: po loginie widać chip demo / limity gościa (`role=guest`). Smoke register + activate (w `production`): `POST /auth/register` → mail `user_activation` / log → `POST /auth/activate` → `POST /auth/login`.  
9. Uzupełnij kontekst → completeness; przy `ready` api chip UX = „Agenci aktywni”.  
10. Smoke: start runu Social i Content (`apps/api/test/postman/` albo UI).  
11. Podłącz scrape `/metrics` (opcjonalnie od razu; z localhost / sieci ops).  
12. Zaplanuj backup volume `api-sqlite`.  
13. Po deployu: prune tylko **dangling** images — **nie** `docker builder prune --all` / `docker image prune --all` jako część każdego joba.

## Anty-patterny deploy (skrót)

- Publiczny gateway / FE / api na `0.0.0.0` bez potrzeby — w production bind **`127.0.0.1`**; edge tylko przez host / `main_network`.
- Frontend **poza** wspólną siecią compose z api (`cc-network`) — BFF nie resolvuje hostname `api`.
- Sekrety w obrazie Docker (warstwach) zamiast root `.env` runtime z Vault.
- SQLite na efemerycznym filesystemie kontenera bez volume `api-sqlite`.
- `DATABASE_URL` / `GATEWAY_BASE_URL` z `localhost` **wewnątrz** kontenera api (zamiast ścieżki volume / hostname serwisu compose).
- `npm` / `npm ci` w obrazie przy pnpm workspace (łamanie `workspace:` / lockfile).
- `docker image prune --all` / `docker builder prune --all` po każdym deployu (zamiast wyłącznie dangling).
- Redis / Ollama / observability jako wymagane usługi w bazowym compose CC.
- Traktowanie samego Postmana jako końca self-host UX.

## Poza zakresem MVP

- Kubernetes / multi-region  
- Managed Postgres **w MVP** (Postgres = faza **V1 — rozbudowa**, ops/skala — nie warunek Content)  
- Automatyczny certyfikat / pełny ingress guide (można dodać później)  
- Multi-tenant SaaS  
- Multi-instance api / distributed lock sweepera (MVP = single-process)  
- Rollback (tagi obrazów / poprzednia rewizja), staging, hardening SSL Vault — osobne fazy  
- Redis / Ollama / compose monitoring **w** bazowym stacku CC
