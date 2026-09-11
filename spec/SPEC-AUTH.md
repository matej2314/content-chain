---
wersja: 7
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-11
---

# SPEC — Auth

## Cel / zakres względem dokumentacji

Norma implementacji bounded contextu **Auth** w `apps/api`: bootstrap jednego admina (w tym status pod first-run), login/logout/refresh, **`GET /auth/me`**, role `admin` | `user`, lista kont, **zaproszenia** (create/list/resend/revoke), publiczny **accept-invite**, soft-delete, **reaktywacja PATCH**, polityka haseł i sesji.

Zmiana względem wersji 5: zakres „lista + tworzenie z hasłem” zastąpiony zaproszeniami + accept-invite (`docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 6: A-10a — `PATCH /users/:id` obowiązkowy w MVP i wyłącznie reaktywacją (`{ isActive: true }`); UI nadal poza MVP.

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
| Lista kont (`GET /users`) | tak | nie |
| Zaproszenia: create / lista pending / resend / revoke | tak | nie |
| Soft-delete (`DELETE`) użytkownika | tak (API; UI MVP bez tego) | nie |
| Reaktywacja (`PATCH /users/:id`, `{ isActive: true }`) | tak (API; UI MVP bez tego) | nie |
| Akceptacja zaproszenia (`POST /auth/accept-invite`) | publiczna (bez roli / bez sesji) | publiczna (bez roli / bez sesji) |

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

A-7. Admin **zaprasza** na `role = user`. Konto `User` powstaje **wyłącznie** przez `POST /auth/accept-invite`. Na ścieżce zaproszenia **nie ma** pola roli (zawsze `user`). Drugi `admin` nadal zakazany (A-1).

Zmiana względem: „Admin tworzy wyłącznie użytkowników z `role = user`” (implikowało `POST /users` + hasło). `POST /api/v1/users` z `password` **wypada z kanonu**.

A-7a. `POST /api/v1/invitations` — tylko `admin`; body `{ email }` (bez hasła). Zapis Invitation `pending` (hash SHA-256 tokenu, TTL `INVITE_TTL`, default `7d`, parser jak JWT TTL) **najpierw**, potem send. Raw token **nie** wraca w JSON-ie. Send OK albo adapter logujący (`development` / `test`) → **201** `{ id, email, expiresAt }`. Pad prawdziwego SMTP po zapisie → **503** `MAIL_DELIVERY_FAILED`, envelope K-1, w `details` **`id` zaproszenia**; wiersz zostaje `pending`. Retry `POST` przy istniejącym `pending` (także wygasłym) → **409** `CONFLICT`. `user` → **403**. Istniejący `User` (aktywny albo soft-deleted) → **409**.

A-7b. `POST /api/v1/auth/accept-invite` — publiczny (`@Public()`); body `{ token, password }`. Walidacja tokenu i polityki A-5 **przed** transakcją (zły token / hasło → wiersz zaproszenia **bez zmian**). Potem **jedna** transakcja Prisma: `users.create(role=user)` **oraz** Invitation → `accepted` (wzorzec jak `createAdminIfNone`). **Nie** woła `setAuthCookies`. Token zły / zużyty / `revoked` / wygasły → **401** `UNAUTHORIZED` (ten sam komunikat — brak enumeracji tokenu). Hasło poza A-5 → **400** `VALIDATION_FAILED`. Kolizja `User.email` w transakcji (P2002) → **409** `CONFLICT` (świadoma enumeracja; nie maskować jako `401`). **201** `{ "user": { "id", "email", "role" } }`.

A-7c. Resend (`POST /api/v1/invitations/:id/resend`): rotacja tokenu (nowy raw, nowy hash, nowy `expiresAt`; stary nieważny) + ponowny mail; ten sam `id`. Brak / nie-pending → **404**. Pad SMTP → **503** + to samo `id` jak A-7a. Revoke (`DELETE /api/v1/invitations/:id`): `pending` → `revoked` (nie twardy DELETE wiersza); po revoke nowy `POST` na ten email dozwolony, o ile nie ma `User`.

A-7d. Najwyżej jeden `pending` na `email` — egzekucja indeksem SQL `UNIQUE (email) WHERE status = 'pending'` (Prisma 6 nie wyrazi partial unique; wzorzec jak `User_one_admin`; indeks **bez** `purpose`). `GET /invitations`: wszystkie `pending`, **w tym wygasłe**. Porównanie `email` (**User** i **Invitation**) **case-sensitive** — bez `trim` / `toLowerCase`.

A-8. TTL: **konfigurowalne env**; domyślnie access **15 minut**, refresh **1 dzień**. TTL zaproszenia: `INVITE_TTL`, default **7 dni**.

A-9. MVP: **zakaz** transportu access przez `Authorization: Bearer` (web, Postman, integracje) — wyłącznie cookie jar / `credentials: 'include'`.

A-10. `DELETE /api/v1/users/:id` = **soft-delete / dezaktywacja** (brak twardego usunięcia wiersza w MVP). `:id` = `UserId`; zły format → **400** `VALIDATION_FAILED`; brak wiersza → **404** `USER_NOT_FOUND`; target `role = admin` → **403** `FORBIDDEN`. DELETE kasuje refresh w DB.

A-10a. `PATCH /api/v1/users/:id` = **wyłącznie reaktywacja** (kontrakt: `docs/dokumentacja_komunikacji.md`). Body `{ "isActive": true }` (literał; Zod `.strict()`; zakaz `role` / `email` / `password`). `isActive: false` → **400** `VALIDATION_FAILED` (dezaktywacja = DELETE, jeden kanał). Authz: `@Roles('admin')` + cookie; `user` → **403** `FORBIDDEN`; brak sesji → **401** `UNAUTHORIZED`. Path `:id` = `UserId`; zły format → **400** `VALIDATION_FAILED`; brak wiersza → **404** `USER_NOT_FOUND`; target `role = admin` → **403** `FORBIDDEN`. Target już `isActive: true` → **200** idempotentnie (bez 409). Sukces **200**: `{ id, email, role, isActive, createdAt }` z `isActive: true`. **Bez** Set-Cookie; **bez** `RefreshSession.create` — potem zwykły `POST /auth/login`. UI poza MVP.

Zmiana względem wersji 6 (A-10: „PATCH może służyć m.in. reaktywacji — poza UI MVP”): PATCH jest **obowiązkowy** w MVP i **tylko** reaktywacją (nie ogólną aktualizacją konta). UI nadal poza MVP.

Zmiana względem wersji 2 („dezaktywacja zamiast DELETE, jeśli implementacja tak wybierze”): soft-delete jest **obowiązkowy** dla DELETE.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/auth/
├── auth.module.ts
├── auth.controller.ts          # bootstrap-status, bootstrap, login, refresh, logout, me, accept-invite
├── users.controller.ts         # GET/PATCH/DELETE users (admin) — bez POST create-z-hasłem
├── invitations.controller.ts   # GET/POST invitations, resend, revoke (admin) — lub równoważny podział
├── application/                # use-case’y (InviteUser, ListInvitations, Resend, Revoke, AcceptInvite, lista/soft-delete/reaktywacja)
├── domain/                     # reguły ról, polityka haseł, soft-delete, porty invitation + mailer
└── infrastructure/             # Prisma (User, Invitation), hash bcrypt, JWT, cookie helpers, adapter SMTP (nodemailer) / adapter logujący
```

| Element | Norma |
|---------|--------|
| Guardi | `JwtAuthGuard` + `RolesGuard` (Nest + Passport JWT); extractor JWT z cookie `cc_access` |
| Access | JWT w cookie `cc_access`; krótki TTL; stateless do wygaśnięcia |
| Refresh | hash w DB + cookie `cc_refresh`; rotacja przy każdym refresh |
| Cookie (production) | `httpOnly`; `Secure` + sensowny `SameSite` na **obu** cookie |
| Biblioteki | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt` (lub `bcryptjs`); **nodemailer** wyłącznie jako adapter SMTP w infrastructure |
| Mailer | Port w Auth (`send({ kind: 'user_invited', … })`); `development` / `test`: adapter logujący; `production`: nodemailer SMTP |

Wzorce zgodne z modelem Nest Authentication ([docs.nestjs.com/security/authentication](https://docs.nestjs.com/security/authentication)). Cost bcrypt = 12 — [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). Adapter SMTP: [Nodemailer `createTransport` + `sendMail`](https://github.com/nodemailer/nodemailer) (`host` / `port` / `auth.user` / `auth.pass` ↔ `SMTP_*`; `from` ↔ `MAIL_FROM`).

### Sesja (cookie-only)

1. Login: wydaj JWT → `cc_access`; wygeneruj sekret refresh → hash w DB → `cc_refresh`.
2. Refresh: waliduj `cc_refresh` vs DB → unieważnij stary → nowy refresh + nowy access w cookie.
3. Logout / reuse unieważnionego refresh: unieważnij sesję; wyczyść oba cookie.
4. Access JWT nie zastępuje store’u refresh.

### Wolno

- Port persistence użytkowników, sesji refresh **oraz zaproszeń**; adapter Prisma w `infrastructure`.
- Port mailera transakcyjnego w Auth; adapter logujący poza `production`; adapter SMTP = **nodemailer** wyłącznie w infrastructure.
- Walidacja DTO auth class-validator + reguły haseł w domain/application (Zod — `SPEC-KOMUNIKACJA.md`).
- Soft-delete + flaga aktywności; odrzucenie loginu dla kont nieaktywnych; PATCH reaktywacji **bez** odtwarzania sesji refresh.
- Publiczny `bootstrap-status` oraz publiczny `accept-invite` bez sesji.

### Nie wolno

- Drugiego `role = admin` ani awansu `user` → `admin` w MVP.
- Przechowywania haseł plaintext / odwracalnych.
- Hasła w mailu; admin zna hasło `user`; `POST /users` z hasłem.
- Nodemailera (ani innego klienta SMTP) w domain / use-case — wyłącznie adapter infrastructure.
- Otwartego signup (konto `user` tylko z ważnym tokenem zaproszenia).
- Zwracania raw tokenu zaproszenia w JSON-ie admina.
- Zwracania access/refresh w body JSON ani trzymania ich w `localStorage` / memory FE jako store.
- `Authorization: Bearer` jako modelu auth MVP.
- OAuth / social login / 2FA w MVP.
- Egzekucji ról wyłącznie po stronie UI.
- Self-service w MVP: zmiana hasła **zalogowanego**, zmiana email, usuwanie własnego konta.
  Zmiana względem: „żadnego ustawiania hasła przez użytkownika”. **Wyjątek (D13):** jednorazowe **pierwsze** hasło przy `accept-invite` to onboarding, nie self-service konta.
- Twardego DELETE użytkownika jako domyślnego zachowania MVP (obowiązuje soft-delete).
- `PATCH` z `role` / `email` / `password` albo `isActive: false` (dezaktywacja wyłącznie DELETE).
- Refresh wyłącznie jako JWT w cookie **bez** wpisu w DB.
- Wycieku hashów haseł, sekretów JWT, plaintext refresh ani raw tokenu zaproszenia (w `production`) do logów / envelope.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS + `@nestjs/jwt` + `@nestjs/passport` + `passport-jwt` | obowiązkowe |
| bcrypt, **cost = 12** | obowiązkowe |
| Cookie `cc_access` + `cc_refresh` (httpOnly) + refresh hash w DB + rotacja | obowiązkowe |
| TTL env: access default 15m, refresh default 1d; `INVITE_TTL` default 7d | obowiązkowe |
| Port mailera + **nodemailer** (adapter SMTP w `production`) | obowiązkowe |
| Adapter logujący maila w `development` / `test` | obowiązkowe |
| Bearer access / OAuth / 2FA / self-service account edits (poza pierwszym hasłem na accept-invite) | poza MVP |
| `GET /auth/me` + `GET /auth/bootstrap-status` + `POST /auth/accept-invite` | obowiązkowe |
| `PATCH /users/:id` (reaktywacja `{ isActive: true }`) | obowiązkowe |

## Kryteria akceptacji

- [ ] `bootstrap-status` poprawnie sygnalizuje dostępność; bootstrap tworzy jedynego admina + sesję; ponowne wywołanie odrzucone.
- [ ] Próba utworzenia drugiego admina przez API odrzucona.
- [ ] Login ustawia `cc_access` i `cc_refresh` (httpOnly); body bez tokenów; chronione trasy działają na cookie.
- [ ] `GET /auth/me` zwraca `{ id, email, role }` albo 401; refresh rotuje cookie; logout czyści oba i unieważnia sesję w DB.
- [ ] Hasło niespełniające polityki → `VALIDATION_FAILED`; spełniające → bcrypt(cost 12) — także na accept-invite.
- [ ] `user` nie przechodzi tras admin-only (`RolesGuard` → `FORBIDDEN`), w tym `POST /invitations` → 403.
- [ ] Admin zaprasza (`POST /invitations`, tylko email) → pending + mail; konto `user` powstaje przez accept-invite → login; raw token nie wraca w JSON admina.
- [ ] Drugi `POST /invitations` przy `pending` (także wygasłym) → **409**; `GET` pending obejmuje wygasłe.
- [ ] Zużyty / wygasły / revoked token → **401** na accept-invite; hasło poza A-5 → **400** (pending bez zmian).
- [ ] Pad SMTP po zapisie (gdy testowany adapter SMTP) → **503** `MAIL_DELIVERY_FAILED` + `details.id`.
- [ ] DELETE użytkownika = soft-delete; nieaktywny nie loguje się.
- [ ] PATCH `{ isActive: true }` na soft-deleted `user` → 200 `isActive: true`; potem login tym kontem → 200. `isActive: false` / `role` w body → 400. `user` woła PATCH → 403. PATCH admina → 403.
- [ ] Postman / FE bez Bearer — wyłącznie cookie.
- [ ] Domyślne TTL: access 15m, refresh 1d, invite 7d (nadpisywalne env).

## Poza zakresem

- Widoki UI (first-run, login, użytkownicy, konto, akceptacja zaproszenia) → `SPEC-FRONTEND.md` / `docs/ux_dashboard.md`.
- Self-service: zmiana hasła **zalogowanego** / email / usuwanie własnego konta; OAuth, SSO, 2FA, recovery „lost admin”. Pierwsze hasło na accept-invite **jest** w zakresie (A-7b).
- Soft-delete / reaktywacja w UI admina (API tak; UI MVP nie) — płynne V1.
- Szczegóły ekspozycji sieciowej gateway/metrics / reverse proxy → `SPEC-BEZPIECZENSTWO.md`.
- Schema Prisma — `SPEC-PERSISTENCE.md` / implementacja, byle port sesji refresh, zaproszeń i flagi aktywności istniał.
