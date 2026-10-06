---
wersja: 16
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-06
---

# SPEC — Bezpieczeństwo i self-host ops

## Cel / zakres względem dokumentacji

Norma **przekrojowa**: bezpieczeństwo implementacji i ekspozycji self-host (env, powierzchnie sieciowe, cookie, brak wycieku sekretów w logach/metrics) — uszczegółowienie `docs/security.md`, `docs/deployment.md`, `docs/observability.md` oraz spójność z `SPEC-AUTH.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-FRONTEND.md`, `SPEC-PERSISTENCE.md`.

Nie zastępuje BC Auth ani pełnego runbooka operatorskiego — spina reguły egzekwowalne w kodzie i przy deployu MVP.

Zmiana względem wersji 10 / cel: surface publiczne auth = accept-invite (+ sesyjne 409). Od tej wersji także register / activate / resend — anti-enum częściowa (`docs/security.md`).

Zmiana względem wersji 12 / cel: publiczny health = tylko liveness. Od tej wersji także publiczny `GET /api/v1/health/ready` — jak liveness: **bez** wrażliwych danych / `GATEWAY_KEY` (`docs/security.md`).
Zmiana względem wersji 13 / cel: brak GuestGuard / DEMO env. Od tej wersji B-11 — `docs/security.md`.
Zmiana względem wersji 14 / B-8 + B-11: Redis guest bez hasła połączenia w normie. Od tej wersji opcjonalne **`REDIS_PASSWORD`** (HOST/PORT) jako sekret; przy `REDIS_URL` hasło w URL — `docs/deployment.md` / `docs/security.md`.
Zmiana względem wersji 15 / B-8 + B-11: kanon URL **albo** HOST/PORT. Od tej wersji wyłącznie **`REDIS_HOST`+`REDIS_PORT`** (+ opcjonalne **`REDIS_PASSWORD`**); **`REDIS_URL` usunięte**.

## Powiązanie ze stylem z docs

Wiążące: jedna instalacja = jedna firma; zagrożenia głównie konfiguracja i wyciek sekretów; LLM/vendor keys tylko za gateway; egzekucja ról w api.

**Wyjątek względem stylu globalnego:** brak (SPEC przekrojowy, nie osobny BC z innym stylem wewnętrznym).

## Wymagania (egzekwowalne)

B-1. **Fail-fast:** procesy `apps/api` i `apps/ai-provider-gateway` nie startują przy braku wymaganych zmiennych env (JWT, `GATEWAY_*`, klucze vendorów po stronie gateway, `DATABASE_URL` itd. wg `.env.example`). W **`production`** dodatkowo wymagane: **`SMTP_HOST`**, **`SMTP_PORT`**, **`SMTP_USER`**, **`SMTP_PASS`**, **`MAIL_FROM`**, **`APP_PUBLIC_URL`** (`docs/deployment.md`). W `development` / `test` SMTP nie jest wymagane (adapter logujący).

B-2. W repozytorium: **`.env.example`** per aplikacja (`api`, `frontend`, `ai-provider-gateway`) z placeholderami — **bez** sekretów. Pliki `.env` poza gitem.

B-3. Na `apps/api`: **Helmet** (lub równoważny zestaw security headers) włączony od MVP.

B-4. **CORS:** konfigurowalny przez env (DX / Postman / ewentualny inny origin). Produktowy FE **nie** woła api cross-origin (BFF — B-5a). Brak „* + credentials” jako domyślnej konfiguracji production.

B-5. Cookie sesji: **`cc_access`**, **`cc_refresh`** — httpOnly; w `production`: `Secure` + `SameSite=strict` (`SPEC-AUTH.md`).

B-5a. **BFF:** przeglądarka wyłącznie origin `apps/frontend` (`/api/v1/...`). Next używa `API_BASE_URL` (nie `NEXT_PUBLIC_*`). Przekaz `Cookie` / `Set-Cookie`; SSE bez pełnego bufora. `docs/deployment.md`, `SPEC-FRONTEND.md` F-2.

Zmiana względem wersji 6 / B-4–B-5: FE wołał api bezpośrednio (`NEXT_PUBLIC_API_BASE_URL`); SameSite „sensowny” bez BFF.
Zmiana względem wersji 7: „Nie wolno” dopisuje wprost URL api w `NEXT_PUBLIC_*` (B-5a) — wcześniej tylko w B-5a i tabeli env.

B-6. W `production`: `apps/ai-provider-gateway` **nie** jest publikowany do internetu (tylko sieć wewnętrzna compose / równoważna). `GET /metrics` api — scrape z sieci ops / localhost, nie publiczny endpoint internetowy.

B-7. `GET /api/v1/health` oraz `GET /api/v1/health/ready` mogą być bez auth do probe — **bez** wrażliwych danych w odpowiedzi (skrót statusów checków; **zakaz** `GATEWAY_KEY` / `X-Gateway-Key` / wartości env / hostname’ów z kluczami w body). Semantyka ready / probe: `SPEC-KOMUNIKACJA.md` K-10.

Zmiana względem wersji 12 / B-7: norma dotyczyła wyłącznie liveness. Od tej wersji także publiczny `/health/ready` z tą samą dyscypliną sekretów.

B-8. Sekrety (`X-Gateway-Key`, JWT secrets, hasła, **`SMTP_PASS`**, opcjonalne **`REDIS_PASSWORD`**, klucze vendorów, **raw token zaproszenia**, **raw token aktywacji konta**) **nigdy** w: bundlu FE, `NEXT_PUBLIC_*`, envelope HTTP, SSE, `run.log`, treści opinii (`Feedback.body`), labelach Prometheus, stdout procesu w `production`. Dump treści hopu chat na stdout adaptera LLM **wyłącznie** przy `NODE_ENV=development`; w polach tekstowych wartość `GATEWAY_KEY` zastępowana `[REDACTED]`. **Wyjątek `development`:** wolno zalogować URL akceptacji zaproszenia **oraz** URL aktywacji konta (odpowiednik treści maila). Nie rozluźniać B-8 dla `production`.

**503** `MAIL_DELIVERY_FAILED` **nie** jest wyciekiem sekretu — w `details` wyłącznie `id` (Invitation albo User) (`docs/dokumentacja_komunikacji.md`).

Anti-enumeracja vs UX na publicznych surface auth (`docs/security.md`, `SPEC-AUTH.md`):

| Surface | Norma | Enumeracja? |
|---------|-------|-------------|
| `POST /auth/register` — email już w `User` | **409** `CONFLICT` + jawny komunikat; bez drugiego User | **Tak — świadoma** (UX signup) |
| `POST /auth/resend-activation` | Zawsze **200** + `Wiadomość wysłana ponownie`; mail tylko przy pending; **bez** **503** | **Nie** |
| `POST /auth/login` | Wspólny **401** (złe hasło / soft-delete / brak `verifiedAt` w prod) | **Nie** |
| `POST /auth/activate` (zły token) | Wspólny **401** | Bez enumeracji email |
| `POST /auth/accept-invite` — kolizja `User.email` | **401** jak nieważny token + revoke Invitation; **zakaz** **409** | **Nie** (maskowanie) |

**409** `CONFLICT` przy zajętym emailu na `PATCH /auth/me/email` **oraz** na admin `POST /invitations` **zostaje** (inny threat model — sesja). **Zakaz** maskowanego **201** przy kolizji na register.

Zmiana względem wersji 9 / B-8: **409** na publicznym accept-invite **oraz** na `PATCH /auth/me/email` było kanonem (świadoma enumeracja; „nie luką do naprawy na 401”). Od tej wersji accept-invite = maskowanie **401**; **409** tylko na sesyjnych trasach.

Zmiana względem wersji 5: enumeracja `409` na zajęty email obejmowała tylko accept-invite.

Zmiana względem wersji 4 / B-8: lista sekretów bez hasła SMTP i raw tokenu zaproszenia; brak normy 503/`details.id` i 409 na accept.

Zmiana względem wersji 10 / B-8: brak register / activate / resend; raw tylko invite. Od tej wersji raw activation token + tabela anti-enum (409 na register świadomie).

B-8a. `currentPassword` w `PATCH /auth/me/email` jest sekretem jak hasło logowania: nigdy w logach, metrics, SSE, envelope sukcesu. Złe hasło → **401** `INVALID_PASSWORD`, `message`: `Invalid password` (nie mylić z sesyjnym `UNAUTHORIZED` ani z loginem `Invalid credentials`). Re-auth przy zmianie emaila jest **obowiązkowy** w MVP; confirm e-mail = V1 (`docs/security.md`). Wzorzec = fundament pod przyszłą zmianę hasła (poza MVP).

Zmiana względem: mutacja email na `PATCH /auth/me` bez re-auth albo z `UNAUTHORIZED` na złe hasło.

B-9. Minimalny zestaw `/metrics` (proces `apps/api`) zgodny z `docs/observability.md`: HTTP (licznik + latencja), uptime/process, liczniki/gauge statusów runów, sygnały błędów wywołań gateway — nazwy mogą mieć prefiks `content_chain_`.

B-10. Bootstrap / jeden admin / polityka haseł — jak `SPEC-AUTH.md` / `docs/security.md` (ten SPEC nie dubluje szczegółów, ale uznaje je za obowiązujące przy review security).

B-11. **DEMO MODE / guest (authz):** `DEMO_MODE` (bool string, default **`false`**) ładowane przy **starcie procesu** — zmiana wymaga restartu; **brak** switcha w UI. `GuestGuard` + `@AllowGuest` — `SPEC-AUTH.md` A-6a. Redis keys: `content-chain:guest:daily:runs:{UTC-date}`, `content-chain:guest:daily:ratings:{userId}:{UTC-date}`. Przy `DEMO_MODE=true` Redis potrzebny pod cap + soft rating. Przy `false` Redis **opcjonalny**. `GET /health` i `GET /health/ready` **nie** failują z braku Redis. Pad Redis: `POST /runs` guest → fail closed; rating guest → fail open (`SPEC-RUNY.md` R-12). Env capów: `GUEST_GLOBAL_CAP_PER_DAY` (default 30), `GUEST_RATING_CAP_PER_DAY` (default 10) — walidowane przy starcie. Połączenie Redis (przy `DEMO_MODE=true` wymagane): **`REDIS_HOST`**+**`REDIS_PORT`**; opcjonalne **`REDIS_PASSWORD`**. **Zakaz** `REDIS_URL`. Dump SQLite przenosi role (w tym `guest`); `DEMO_MODE` **nie** degraduje ról w DB.

Zmiana względem wersji 13: brak normy DEMO/Redis guest. Od tej wersji B-11.
Zmiana względem wersji 14 / B-11: brak nazw env połączenia Redis / `REDIS_PASSWORD`. Od tej wersji kanon URL vs HOST/PORT + opcjonalne hasło HOST/PORT (`docs/deployment.md`).
Zmiana względem wersji 15 / B-11: `REDIS_URL` **albo** HOST/PORT. Od tej wersji wyłącznie HOST/PORT + opcjonalne `REDIS_PASSWORD`.

## Norma implementacji

### Wzorce

| Obszar | Norma |
|--------|--------|
| Konfiguracja | **`@nestjs/config`** w `apps/api` + walidowany obiekt env przy starcie (fail-fast — B-1; pełne egzekwowanie krytycznych env może dojść w Fazie 2 major, deps/ConfigModule wcześniej) |
| FE | Brak URL-a api w `NEXT_PUBLIC_*`; `API_BASE_URL` tylko serwer Next |
| Auth transport | Cookie-only MVP — `SPEC-AUTH.md` / `SPEC-FRONTEND.md` |
| Logi vs metrics | Logi procesu: **Pino** / `nestjs-pino` (stdout); logi runu = DB/SSE; metrics = ops procesu — bez mieszania i bez sekretów (`docs/observability.md`) |
| Deploy | Compose: volume SQLite, sekrety z env, HTTPS przed FE/api w production; lokalnie api **PORT=3001** (`docs/deployment.md`) |

### Wolno

- Ograniczać `/metrics` reverse proxy / firewallem zamiast auth w aplikacji (MVP).
- Trzymać osobne `.env.example` per workspace package.
- Opcjonalnie scrape metrics gateway w sieci ops (upstream) — bez ekspozycji publicznej.
- Dump hopu chat na stdout wyłącznie w `development`, z redakcją `GATEWAY_KEY`.

### Nie wolno

- Commitowania `.env` z sekretami.
- Publicznego gateway z kluczami vendorów w production.
- Publicznego `/metrics` na internet w production.
- Sekretów LLM / gateway w FE.
- Wycieku `GATEWAY_KEY` / `X-Gateway-Key` / sekretów env w body `GET /api/v1/health` albo `GET /api/v1/health/ready`.
- Dumpa pełnych promptów hopu gateway na stdout w `production` (w tym przy `NODE_ENV=production`).
- Tokenu sesji w query string (SSE/API).
- Raw tokenu zaproszenia **ani** raw tokenu aktywacji w JSON-ie admina / odpowiedziach ani w logach `production`.
- Publicznego `accept-invite` zwracającego **409** / „email zajęty” przy kolizji `User.email` (B-8 / A-7b).
- Maskowanego sukcesu (**201**) przy kolizji email na `POST /auth/register` (obowiązuje **409** — B-8 / A-11).
- Enumeracji stanu konta przez `POST /auth/resend-activation` (różne HTTP / message wg pending vs brak vs aktywny).
- **503** `MAIL_DELIVERY_FAILED` na `POST /auth/resend-activation` (obowiązuje stały **200**).
- Osobnego kodu `ACCOUNT_NOT_ACTIVATED` na loginie (wspólny **401** z złym hasłem / soft-delete / **guest przy demo off**).
- Switcha DEMO w panelu admina; masowego `@Roles('admin','user')` zamiast GuestGuard.
- Awansu `guest` → `user`/`admin`.
- Faila `health`/`ready` wyłącznie z powodu braku Redis.
- Set-Cookie na register / activate / resend-activation.
- Drugiego `admin` w MVP; register / activate / resend → `admin`.
- `Authorization: Bearer` jako modelu auth MVP.
- Cichego fallbacku kontekstu z `.md` (`SPEC-PERSISTENCE.md`).
- URL-a api w `NEXT_PUBLIC_*` (B-5a).

Zmiana względem wersji 10 / „Nie wolno”: dopisano zakazy maskowanego 201 na register, enumeracji przez resend, `ACCOUNT_NOT_ACTIVATED`, Set-Cookie na register/activate/resend, raw activation token.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Fail-fast env + `.env.example` | obowiązkowe |
| **`@nestjs/config`** (ładowanie env w `apps/api`) | obowiązkowe |
| **Pino** + **`nestjs-pino`** (logi procesu api) | obowiązkowe |
| Helmet (lub równoważne) na api | obowiązkowe |
| CORS z env + credentials | obowiązkowe |
| Cookie Secure w production | obowiązkowe |
| Minimalny `/metrics` bez sekretów | obowiązkowe |
| OAuth / 2FA / WAF / pentest / at-rest SQLite encrypt | poza MVP |

Zmiana względem wersji 1: dopisano `@nestjs/config` oraz Pino/`nestjs-pino` jako zatwierdzony stack logów/konfiguracji procesu (wcześniej tylko ogólne „walidowany obiekt env” i stdout bez wskazania biblioteki — `docs/observability.md` / `docs/architektura.md`).

Zmiana względem wersji 2: B-8 obejmuje też treść opinii (`Feedback.body`).

Zmiana względem wersji 3: B-8 obejmuje stdout dump hopu (tylko `development` + redakcja klucza).
Zmiana względem wersji 4: B-1 fail-fast SMTP/`MAIL_FROM`/`APP_PUBLIC_URL` w `production`; B-8 += `SMTP_PASS` i raw invite token.

## Kryteria akceptacji

- [ ] Api/gateway padają przy starcie bez wymaganych env; `.env.example` istnieje i nie zawiera sekretów.
- [ ] Helmet (lub równoważne) aktywne na api; CORS czyta allowlistę z env.
- [ ] W production: gateway i metrics nie są publiczne; cookie Secure.
- [ ] `GET /api/v1/health` i `GET /api/v1/health/ready` bez wrażliwych danych / bez wycieku `GATEWAY_KEY`.
- [ ] Brak sekretów w logach runu, SSE, envelope, treści opinii, labelach metrics i stdout (w `development` dump hopu z `[REDACTED]` zamiast `GATEWAY_KEY`; w `production` bez dumpa treści chat; raw invite / activation token nie w logach `production`).
- [ ] Publiczne auth: register kolizja → **409**; resend = stały sukces; login pending / soft-delete / złe hasło / guest przy demo off = wspólny **401**; activate-fail = wspólny **401**; accept-invite kolizja = **401** (nie 409).
- [ ] `GET /config` publiczny, body tylko `demoMode`; GuestGuard default deny; Redis nie psuje ready.
- [ ] `/metrics` zwraca co najmniej sygnały z B-9.
- [ ] Checklist operatora z `docs/security.md` da się odhaczyć na instalacji compose.

## Poza zakresem

- OAuth / SSO / 2FA, rotacja wielu adminów, recovery lost-admin.
- WAF, pełny pentest, szyfrowanie pliku SQLite at-rest.
- Alerty Prometheus YAML, OTel traces, centralny ELK/Loki.
- Szczegóły BC Auth / Social / Feedback / przegląd runu (odniesienia do właściwych SPEC).
