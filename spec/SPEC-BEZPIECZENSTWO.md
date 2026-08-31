---
wersja: 4
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-31
---

# SPEC — Bezpieczeństwo i self-host ops

## Cel / zakres względem dokumentacji

Norma **przekrojowa**: bezpieczeństwo implementacji i ekspozycji self-host (env, powierzchnie sieciowe, cookie, brak wycieku sekretów w logach/metrics) — uszczegółowienie `docs/security.md`, `docs/deployment.md`, `docs/observability.md` oraz spójność z `SPEC-AUTH.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-FRONTEND.md`, `SPEC-PERSISTENCE.md`.

Nie zastępuje BC Auth ani pełnego runbooka operatorskiego — spina reguły egzekwowalne w kodzie i przy deployu MVP.

## Powiązanie ze stylem z docs

Wiążące: jedna instalacja = jedna firma; zagrożenia głównie konfiguracja i wyciek sekretów; LLM/vendor keys tylko za gateway; egzekucja ról w api.

**Wyjątek względem stylu globalnego:** brak (SPEC przekrojowy, nie osobny BC z innym stylem wewnętrznym).

## Wymagania (egzekwowalne)

B-1. **Fail-fast:** procesy `apps/api` i `apps/ai-provider-gateway` nie startują przy braku wymaganych zmiennych env (JWT, `GATEWAY_*`, klucze vendorów po stronie gateway, `DATABASE_URL` itd. wg `.env.example`).

B-2. W repozytorium: **`.env.example`** per aplikacja (`api`, `frontend`, `ai-provider-gateway`) z placeholderami — **bez** sekretów. Pliki `.env` poza gitem.

B-3. Na `apps/api`: **Helmet** (lub równoważny zestaw security headers) włączony od MVP.

B-4. **CORS:** konfigurowalny przez env (dozwolone origin(y) FE + obsługa `credentials` pod cookie). Brak „* + credentials” jako domyślnej konfiguracji production.

B-5. Cookie sesji: **`cc_access`**, **`cc_refresh`** — httpOnly; w `production`: `Secure` + sensowny `SameSite` (`SPEC-AUTH.md`).

B-6. W `production`: `apps/ai-provider-gateway` **nie** jest publikowany do internetu (tylko sieć wewnętrzna compose / równoważna). `GET /metrics` api — scrape z sieci ops / localhost, nie publiczny endpoint internetowy.

B-7. `GET /api/v1/health` może być bez auth do probe — **bez** wrażliwych danych w odpowiedzi.

B-8. Sekrety (`X-Gateway-Key`, JWT secrets, hasła, klucze vendorów) **nigdy** w: bundlu FE, `NEXT_PUBLIC_*`, envelope HTTP, SSE, `run.log`, treści opinii (`Feedback.body`), labelach Prometheus, stdout procesu. Dump treści hopu chat na stdout adaptera LLM **wyłącznie** przy `NODE_ENV=development`; w polach tekstowych wartość `GATEWAY_KEY` zastępowana `[REDACTED]`.

Zmiana względem wersji 3 / B-8: wcześniejsza lista nie obejmowała diagnostycznego dumpa hopu; kod w `LlmGatewayHttpAdapter` + `llm-gateway-chat.log.ts` (`docs/observability.md`, `docs/security.md`).

B-9. Minimalny zestaw `/metrics` (proces `apps/api`) zgodny z `docs/observability.md`: HTTP (licznik + latencja), uptime/process, liczniki/gauge statusów runów, sygnały błędów wywołań gateway — nazwy mogą mieć prefiks `content_chain_`.

B-10. Bootstrap / jeden admin / polityka haseł — jak `SPEC-AUTH.md` / `docs/security.md` (ten SPEC nie dubluje szczegółów, ale uznaje je za obowiązujące przy review security).

## Norma implementacji

### Wzorce

| Obszar | Norma |
|--------|--------|
| Konfiguracja | **`@nestjs/config`** w `apps/api` + walidowany obiekt env przy starcie (fail-fast — B-1; pełne egzekwowanie krytycznych env może dojść w Fazie 2 major, deps/ConfigModule wcześniej) |
| FE | Tylko bezpieczne `NEXT_PUBLIC_*` (np. URL api) |
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
- Dumpa pełnych promptów hopu gateway na stdout w `production` (w tym przy `NODE_ENV=production`).
- Tokenu sesji w query string (SSE/API).
- Drugiego `admin` w MVP.
- `Authorization: Bearer` jako modelu auth MVP.
- Cichego fallbacku kontekstu z `.md` (`SPEC-PERSISTENCE.md`).

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

## Kryteria akceptacji

- [ ] Api/gateway padają przy starcie bez wymaganych env; `.env.example` istnieje i nie zawiera sekretów.
- [ ] Helmet (lub równoważne) aktywne na api; CORS czyta allowlistę z env.
- [ ] W production: gateway i metrics nie są publiczne; cookie Secure.
- [ ] Brak sekretów w logach runu, SSE, envelope, treści opinii, labelach metrics i stdout (w `development` dump hopu z `[REDACTED]` zamiast `GATEWAY_KEY`; w `production` bez dumpa treści chat).
- [ ] `/metrics` zwraca co najmniej sygnały z B-9.
- [ ] Checklist operatora z `docs/security.md` da się odhaczyć na instalacji compose.

## Poza zakresem

- OAuth / SSO / 2FA, rotacja wielu adminów, recovery lost-admin.
- WAF, pełny pentest, szyfrowanie pliku SQLite at-rest.
- Alerty Prometheus YAML, OTel traces, centralny ELK/Loki.
- Szczegóły BC Auth / Social / Feedback / przegląd runu (odniesienia do właściwych SPEC).
