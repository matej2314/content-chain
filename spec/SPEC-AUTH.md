---
wersja: 5
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-31
---

# SPEC — Auth

## Cel / zakres względem dokumentacji

Norma implementacji bounded contextu **Auth** w `apps/api`: bootstrap jednego admina (w tym status pod first-run), login/logout/refresh, **`GET /auth/me`**, role `admin` | `user`, lista + tworzenie użytkowników (`user` only), soft-delete, polityka haseł i sesji.

Uszczegóławia `docs/security.md` oraz endpointy auth/users z `docs/dokumentacja_komunikacji.md`. Egzekucja uprawnień zawsze w `apps/api`, nie tylko w UI.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`): klasyczne warstwy Nest — HTTP → application / use-case → domain + porty → adaptery (Prisma). Auth **nie** używa LangGraph.

**Wyjątek względem stylu globalnego:** brak (wyjątek grafu dotyczy Social i Content — nie Auth).

## Role i uprawnienia (norma)

| Akcja | `admin` | `user` |
|-------|---------|--------|
| Bootstrap pierwszego admina | jednorazowy (gdy brak admina) + status publiczny | — |
| Edycja kontekstu firmy | tak (egzekucja w BC kontekstu) | nie → `FORBIDDEN` |
| Start runów produktowych (Social i Content) / HITL / odczyt logów / lista runów | tak | tak |
| Ocena / flaga edycji / finalize **własnego** runu; `GET /runs/user/:userId` tylko własny id; `POST /feedback` | tak | tak |
| To samo na cudzym runie / cudzym `:userId` | nie → `FORBIDDEN` | nie → `FORBIDDEN` |
| `GET` / `POST` użytkowników | tak (tylko tworzenie `role = user`) | nie |
| Soft-delete (`DELETE`) użytkownika | tak (API; UI MVP bez tego) | nie |

W systemie MVP jest **co najwyżej jeden** `admin` — ten z bootstrapu. Tworzenie / awans kolejnego admina → odrzucenie (`403` / `400`).

Zmiana względem wersji 4: dopisano, że te same guardy obejmują runy Content (nie tylko SM).

## Wymagania (egzekwowalne)

A-1. `POST /api/v1/auth/bootstrap-admin` działa **tylko**, gdy w DB nie ma użytkownika z `role = admin`. Po sukcesie: ustawia sesję cookie jak login; endpoint jest trwale niedostępny (`CONFLICT` / `FORBIDDEN`).

A-1a. `GET /api/v1/auth/bootstrap-status` (bez auth) zwraca `{ "available": boolean }` — `true` wyłącznie gdy wolno wykonać bootstrap. Pod ekran first-run FE.

Zmiana względem wersji 2: dopisano publiczny status bootstrapu oraz sesję cookie po udanym bootstrapie (wcześniej: sam fakt utworzenia admina bez normy first-run / Set-Cookie).

A-2. Login (`POST /api/v1/auth/login`) ustawia **dwa** cookie httpOnly:

| Cookie | Zawartość | TTL (default) |
|--------|-----------|----------------|
| `cc_access` | JWT access | 15 min (env) |
| `cc_refresh` | sekret refresh (rotowany; hash w DB) | 1 dzień (env) |

Body **200**: `{ "expiresIn", "user": { "id", "email", "role" } }` — **bez** `accessToken` / `refreshToken` w JSON. Konto soft-deleted / nieaktywne → odrzucenie loginu.

Zmiana względem wersji 1 tego SPEC (oraz wcześniejszego zapisu docs „accessToken w body + tylko refresh w cookie”): oba tokeny wyłącznie w httpOnly cookie; klienci (FE, Postman) **nie** używają `Authorization: Bearer` w MVP.

A-3. Refresh (`POST /api/v1/auth/refresh`) na podstawie cookie `cc_refresh`: waliduje sesję w DB, **rotuje** refresh (stary wpis unieważniony, nowy hash + nowe `cc_refresh`), wystawia nowy JWT w `cc_access`. Body bez tokenów (ew. `expiresIn` — opcjonalnie). Kanoniczny probe tożsamości UI = A-3a, nie refresh.

A-3a. `GET /api/v1/auth/me` (wymaga ważnego `cc_access`): **200** `{ "id", "email", "role" }` wyłącznie; brak / nieważna sesja → **401** `UNAUTHORIZED`.

Zmiana względem wersji 2: wcześniej brak osobnego probe; odczyt `user` z refresh był opcjonalny. Obowiązuje: **`/auth/me`** + flow FE me → (401) refresh → me.

A-4. Logout (`POST /api/v1/auth/logout`) unieważnia refresh w DB i czyści **oba** cookie (`cc_access`, `cc_refresh`).

A-5. Hasła: hash **bcrypt** z **cost (salt rounds) = 12**; plaintext nigdy w logach ani odpowiedziach. Polityka przed hashowaniem (jak `docs/security.md`):

| Reguła | Wymaganie |
|--------|-----------|
| Długość | minimum **12** znaków |
| Cyfra | ≥ 1 |
| Wielka litera | ≥ 1 |
| Znak specjalny | ≥ 1 (ASCII jak w security.md) |
| Górny limit praktyczny | ≤ **72 bajty** (limit bcrypt) |

Niespełnienie → `400` `VALIDATION_FAILED`.

A-6. Chronione trasy API (w tym SSE) wymagają sesji z cookie `cc_access` (`JwtAuthGuard` czytający JWT z cookie); trasy z rolami — dodatkowo `RolesGuard`. Brak / nieważna sesja → `401` `UNAUTHORIZED`; brak roli → `403` `FORBIDDEN`.

A-7. Admin tworzy wyłącznie użytkowników z `role = user`. Próba ustawienia `admin` → odrzucenie.

A-8. TTL: **konfigurowalne env**; domyślnie access **15 minut**, refresh **1 dzień**.

A-9. MVP: **zakaz** transportu access przez `Authorization: Bearer` (web, Postman, integracje) — wyłącznie cookie jar / `credentials: 'include'`.

A-10. `DELETE /api/v1/users/:id` = **soft-delete / dezaktywacja** (brak twardego usunięcia wiersza w MVP). `PATCH` może służyć m.in. reaktywacji — poza UI MVP.

Zmiana względem wersji 2 („dezaktywacja zamiast DELETE, jeśli implementacja tak wybierze”): soft-delete jest **obowiązkowy** dla DELETE.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/auth/
├── auth.module.ts
├── auth.controller.ts          # bootstrap-status, bootstrap, login, refresh, logout, me
├── users.controller.ts         # GET/POST/PATCH/DELETE users (admin) — lub równoważny podział
├── application/                # use-case’y
├── domain/                     # reguły ról, polityka haseł, soft-delete, porty
└── infrastructure/             # Prisma repos, hash bcrypt, JWT, cookie helpers
```

| Element | Norma |
|---------|--------|
| Guardi | `JwtAuthGuard` + `RolesGuard` (Nest + Passport JWT); extractor JWT z cookie `cc_access` |
| Access | JWT w cookie `cc_access`; krótki TTL; stateless do wygaśnięcia |
| Refresh | hash w DB + cookie `cc_refresh`; rotacja przy każdym refresh |
| Cookie (production) | `httpOnly`; `Secure` + sensowny `SameSite` na **obu** cookie |
| Biblioteki | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt` (lub `bcryptjs`) |

Wzorce zgodne z modelem Nest Authentication ([docs.nestjs.com/security/authentication](https://docs.nestjs.com/security/authentication)). Cost bcrypt = 12 — [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

### Sesja (cookie-only)

1. Login: wydaj JWT → `cc_access`; wygeneruj sekret refresh → hash w DB → `cc_refresh`.
2. Refresh: waliduj `cc_refresh` vs DB → unieważnij stary → nowy refresh + nowy access w cookie.
3. Logout / reuse unieważnionego refresh: unieważnij sesję; wyczyść oba cookie.
4. Access JWT nie zastępuje store’u refresh.

### Wolno

- Port persistence użytkowników i sesji refresh; adapter Prisma w `infrastructure`.
- Walidacja DTO auth class-validator + reguły haseł w domain/application (Zod — `SPEC-KOMUNIKACJA.md`).
- Soft-delete + flaga aktywności; odrzucenie loginu dla kont nieaktywnych.
- Publiczny `bootstrap-status` bez sesji.

### Nie wolno

- Drugiego `role = admin` ani awansu `user` → `admin` w MVP.
- Przechowywania haseł plaintext / odwracalnych.
- Zwracania access/refresh w body JSON ani trzymania ich w `localStorage` / memory FE jako store.
- `Authorization: Bearer` jako modelu auth MVP.
- OAuth / social login / 2FA w MVP.
- Egzekucji ról wyłącznie po stronie UI.
- Self-service w MVP: zmiana własnego hasła, zmiana email, usuwanie własnego konta.
- Twardego DELETE użytkownika jako domyślnego zachowania MVP (obowiązuje soft-delete).
- Refresh wyłącznie jako JWT w cookie **bez** wpisu w DB.
- Wycieku hashów haseł, sekretów JWT ani plaintext refresh do logów / envelope.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS + `@nestjs/jwt` + `@nestjs/passport` + `passport-jwt` | obowiązkowe |
| bcrypt, **cost = 12** | obowiązkowe |
| Cookie `cc_access` + `cc_refresh` (httpOnly) + refresh hash w DB + rotacja | obowiązkowe |
| TTL env: access default 15m, refresh default 1d | obowiązkowe |
| Bearer access / OAuth / 2FA / self-service account edits | poza MVP |
| `GET /auth/me` + `GET /auth/bootstrap-status` | obowiązkowe |

## Kryteria akceptacji

- [ ] `bootstrap-status` poprawnie sygnalizuje dostępność; bootstrap tworzy jedynego admina + sesję; ponowne wywołanie odrzucone.
- [ ] Próba utworzenia drugiego admina przez API odrzucona.
- [ ] Login ustawia `cc_access` i `cc_refresh` (httpOnly); body bez tokenów; chronione trasy działają na cookie.
- [ ] `GET /auth/me` zwraca `{ id, email, role }` albo 401; refresh rotuje cookie; logout czyści oba i unieważnia sesję w DB.
- [ ] Hasło niespełniające polityki → `VALIDATION_FAILED`; spełniające → bcrypt(cost 12).
- [ ] `user` nie przechodzi tras admin-only (`RolesGuard` → `FORBIDDEN`).
- [ ] DELETE użytkownika = soft-delete; nieaktywny nie loguje się.
- [ ] Postman / FE bez Bearer — wyłącznie cookie.
- [ ] Domyślne TTL: access 15m, refresh 1d (nadpisywalne env).

## Poza zakresem

- Widoki UI (first-run, login, użytkownicy, konto) → `SPEC-FRONTEND.md` / `docs/ux_dashboard.md`.
- Self-service: zmiana hasła / email / usuwanie własnego konta; OAuth, SSO, 2FA, recovery „lost admin”.
- Soft-delete w UI admina (API tak; UI MVP nie) — płynne V1.
- Szczegóły ekspozycji sieciowej gateway/metrics / reverse proxy → `SPEC-BEZPIECZENSTWO.md`.
- Schema Prisma — `SPEC-PERSISTENCE.md` / implementacja, byle port sesji refresh i flagi aktywności istniał.
