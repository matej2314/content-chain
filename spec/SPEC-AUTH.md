---
wersja: 19
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-06
---

# SPEC — Auth

## Cel / zakres względem dokumentacji

Norma implementacji bounded contextu **Auth** w `apps/api`: bootstrap jednego admina (w tym status pod first-run), login/logout/refresh, **`GET /auth/me`**, **`PATCH /auth/me/email` (własny email + re-auth; nie dla `guest`)**, role `admin` | `user` | **`guest`**, lista kont, **zaproszenia** (create/list/resend/revoke), publiczny **accept-invite** (rola vs `DEMO_MODE`, mirror register), **otwarta rejestracja** (`POST /auth/register` — rola vs `DEMO_MODE`), **aktywacja konta** (`POST /auth/activate` + `AccountActivation` / `verifiedAt`; także dla `guest`), **resend aktywacji**, **GuestGuard** / martwa sesja `guest` przy demo off, soft-delete, **reaktywacja PATCH**, polityka haseł i sesji.

Zmiana względem wersji 5: zakres „lista + tworzenie z hasłem” zastąpiony zaproszeniami + accept-invite (`docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 6: A-10a — `PATCH /users/:id` obowiązkowy w MVP i wyłącznie reaktywacją (`{ isActive: true }`); UI nadal poza MVP.
Zmiana względem wersji 14: zakaz otwartego signup / „jedyna droga = invite”. Od tej wersji self-register + aktywacja e-mail w `production` (A-11…A-13) — `docs/security.md`, `docs/dokumentacja_komunikacji.md`.
Zmiana względem wersji 17 / cel: A-11 = zawsze `role = user`; `guest` / DEMO poza Auth. Od tej wersji **refaktor A-11** (rola vs `DEMO_MODE`) + GuestGuard + martwa sesja guest — `docs/security.md`.
Zmiana względem wersji 18 / A-7 / A-7b / tabela ról: accept-invite **zawsze** `role = user` (także przy demo on); zakaz invite→`guest` (Faza 18). Od tej wersji **refaktor A-7 / A-7b** — rola accept-invite vs `DEMO_MODE` (mirror A-11); sens: demo off = członek zespołu (`user`); demo on = gość sandboxu (`guest`) — `docs/security.md`.

Uszczegóławia `docs/security.md` oraz endpointy auth/users z `docs/dokumentacja_komunikacji.md`. Egzekucja uprawnień zawsze w `apps/api`, nie tylko w UI.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`): klasyczne warstwy Nest — HTTP → application / use-case → domain + porty → adaptery (Prisma). Auth **nie** używa LangGraph.

**Wyjątek względem stylu globalnego:** brak (wyjątek grafu dotyczy Social i Content — nie Auth).

## Role i uprawnienia (norma)

| Akcja | `admin` | `user` | `guest` (tylko gdy `DEMO_MODE=true`) |
|-------|---------|--------|-------------------------------------|
| Bootstrap pierwszego admina | jednorazowy (gdy brak admina) + status publiczny | — | — |
| Edycja kontekstu firmy | tak (egzekucja w BC kontekstu) | nie → `FORBIDDEN` | nie → `FORBIDDEN` |
| Odczyt kontekstu firmy (`GET`) | tak | tak | tak (`@AllowGuest`) |
| Start runów / HITL / logi / SSE / lista `GET /runs` | tak | tak | lista **tak** (showcase); start wg `GuestRunPolicy` (`SPEC-RUNY.md` R-12); HITL / logi / SSE / detail **tylko własne** |
| Ocena **własnego** runu | tak | tak | tak + soft limit (`SPEC-RUNY.md` R-12) |
| Output-edited / finalize | tak (własny) | tak (własny) | nie → `FORBIDDEN` |
| Cudzy detail / HITL / cancel / rating / feedback-run | nie → `FORBIDDEN` | nie → `FORBIDDEN` | nie → `FORBIDDEN` |
| `GET /runs/user/:userId` tylko własny id; `POST /feedback` | tak | tak | tak (`application`/`agent`; `run` tylko własny) |
| Lista kont (`GET /users`) | tak | nie | nie → `FORBIDDEN` |
| Zaproszenia: create / lista pending / resend / revoke | tak | nie | nie → `FORBIDDEN` |
| Soft-delete (`DELETE`) użytkownika | tak (API; UI MVP bez tego) | nie | nie → `FORBIDDEN` |
| Reaktywacja (`PATCH /users/:id`, `{ isActive: true }`) | tak (API; UI MVP bez tego) | nie | nie → `FORBIDDEN` |
| Zmiana własnego emaila (`PATCH /auth/me/email` + `currentPassword`) | tak | tak | nie → `FORBIDDEN` |
| `GET /auth/me` / refresh / logout | tak | tak | tak (przy demo on + `@AllowGuest`) |
| Akceptacja zaproszenia (`POST /auth/accept-invite`) | publiczna (bez roli / bez sesji) | publiczna | publiczna |
| Rejestracja (`POST /auth/register`) | publiczna | publiczna | publiczna |
| Aktywacja / resend | publiczna | publiczna | publiczna |

W systemie MVP jest **co najwyżej jeden** `admin` — ten z bootstrapu. Tworzenie / awans kolejnego admina → odrzucenie (`403` / `400`). Register / activate / resend **nigdy** nie tworzą `admin`. Invite **nigdy** → `admin`. Rola konta przy accept-invite: **`DEMO_MODE=true` → `guest`** (gość sandboxu); **`DEMO_MODE=false` → `user`** (członek zespołu) — mirror A-11; body invite / accept **bez** `role`. **Zakaz permanentny** awansu `guest` → `user` / `admin` (brak endpointu i ścieżki produktowej — nie „poza V1”). Bootstrap **nigdy** nie tworzy `guest`.

Gdy `DEMO_MODE=false`: JWT z `role=guest` na **każdej** chronionej trasie (w tym `/me`, refresh) → **401** jak nieaktywne (A-2 / A-6a). Rola w DB **nie** jest degradowana przez sam flag env.

Zmiana względem wersji 4: dopisano, że te same guardy obejmują runy Content (nie tylko SM).
Zmiana względem wersji 14 / tabela ról: brak publicznych tras register / activate / resend.
Zmiana względem wersji 17 / tabela ról: dwie kolumny `admin`/`user`; `guest` poza. Od tej wersji kolumna `guest` + zakaz awansu.
Zmiana względem wersji 18 / nota przy tabeli ról: *„Invite nigdy nie tworzy `guest` (także przy `DEMO_MODE=true`)”*. Od tej wersji invite przy demo on → `guest`; przy demo off → `user`.

## Wymagania (egzekwowalne)

A-1. `POST /api/v1/auth/bootstrap-admin` działa **tylko**, gdy w DB nie ma użytkownika z `role = admin`. Po sukcesie: ustawia sesję cookie jak login oraz **`User.verifiedAt = now()`**; endpoint jest trwale niedostępny (`CONFLICT` / `FORBIDDEN`).

A-1a. `GET /api/v1/auth/bootstrap-status` (bez auth) zwraca `{ "available": boolean }` — `true` wyłącznie gdy wolno wykonać bootstrap. Pod **stronę główną** FE (tryb submitu karty logowania, nie osobny ekran) — `SPEC-FRONTEND.md` / `docs/ux_dashboard.md`.

Zmiana względem wersji 8 / A-1a: „pod ekran first-run”. Od tej wersji ten sam widok co logowanie (`docs/ux_dashboard.md`).

Zmiana względem wersji 2: dopisano publiczny status bootstrapu oraz sesję cookie po udanym bootstrapie (wcześniej: sam fakt utworzenia admina bez normy first-run / Set-Cookie).

A-2. Login (`POST /api/v1/auth/login`) ustawia **dwa** cookie httpOnly:

| Cookie | Zawartość | TTL (default) |
|--------|-----------|----------------|
| `cc_access` | JWT access | 15 min (env) |
| `cc_refresh` | sekret refresh (rotowany; hash w DB) | 1 dzień (env) |

Body **200**: `{ "expiresIn", "user": { "id", "email", "role" } }` — **bez** `accessToken` / `refreshToken` w JSON. Login → **401** z **identycznym** `code` + `message` (np. `Invalid credentials`) gdy: złe hasło **albo** `isActive = false` (soft-delete) **albo** (w `NODE_ENV=production`) `verifiedAt == null` (pending aktywacji) **albo** (`role = guest` **i** `DEMO_MODE=false`). **Bez** `ACCOUNT_NOT_ACTIVATED` i bez rozróżniania przyczyny. Kolejność dla pary guest + demo: **najpierw** check `DEMO_MODE` (guest + demo off → ten sam 401, zanim inne powody rejectu tego przypadku). `admin` / `user`: login **bez zmian** (także przy demo on). Przy demo on: login `guest` jak zwykły login (w tym pending `verifiedAt` w `production`).

Zmiana względem wersji 1 tego SPEC (oraz wcześniejszego zapisu docs „accessToken w body + tylko refresh w cookie”): oba tokeny wyłącznie w httpOnly cookie; klienci (FE, Postman) **nie** używają `Authorization: Bearer` w MVP.
Zmiana względem wersji 14 / A-2: odrzucenie loginu tylko soft-delete / nieaktywne. Od tej wersji także brak `verifiedAt` w `production` — ten sam 401.
Zmiana względem wersji 17 / A-2: brak gałęzi guest przy demo off. Od tej wersji ten sam 401 + check demo first.

A-3. Refresh (`POST /api/v1/auth/refresh`) na podstawie cookie `cc_refresh`: waliduje sesję w DB, **rotuje** refresh (stary wpis unieważniony, nowy hash + nowe `cc_refresh`), wystawia nowy JWT w `cc_access`. Body bez tokenów (ew. `expiresIn` — opcjonalnie). Kanoniczny probe tożsamości UI = A-3a, nie refresh.

A-3a. `GET /api/v1/auth/me` (wymaga ważnego `cc_access`): **200** `{ "id", "email", "role" }` wyłącznie; brak / nieważna sesja → **401** `UNAUTHORIZED`.

A-3b. `PATCH /api/v1/auth/me/email` (ta sama sesja): body `{ "email", "currentPassword" }` (`.strict()`) — zmiana **własnego** adresu po re-auth. **`GET /auth/me` = wyłącznie probe** (A-3a); **bez** mutacji na `PATCH /auth/me`. Kolejność: Zod → bcrypt compare `currentPassword` z hashem użytkownika sesji (jak login, A-2; **bez** polityki A-5 — to weryfikacja istniejącego hasła, nie ustawianie nowego) → zapis emaila gdy różny od obecnego. **200** `{ id, email, role }` także gdy email bez zmian (po udanym re-auth, bez UPDATE). Zajęty email (w tym soft-deleted) → **409** `CONFLICT` (dopiero po udanym re-auth). Brak / pusty `currentPassword` / zły kształt → **400**. Złe hasło → **401** `INVALID_PASSWORD`, `message`: `Invalid password` (**nie** `UNAUTHORIZED`). Brak sesji → **401** `UNAUTHORIZED`. **Nie** `PATCH /users/:id` (tam nadal zakaz `email`). Bez self-service **zmiany** hasła / roli / `isActive`. Bez maila potwierdzającego w MVP (V1). Sesja refresh / cookie **bez** rotacji z powodu A-3b. Wzorzec osobnej ścieżki mutacji + re-auth + `INVALID_PASSWORD` = fundament pod przyszłe `PATCH /auth/me/password` (poza MVP).

Zmiana względem: A-3b na `PATCH /auth/me` z body `{ email }` lub `{ email, currentPassword }` i złe hasło jako `UNAUTHORIZED`.
Zmiana względem wersji 9: self-service email był zakazany. Od tej wersji A-3b jest w MVP (`docs/ux_dashboard.md` widok Konto).

**Uwaga o A-5:** re-auth na A-3b celowo **nie** stosuje polityki haseł (A-5) do `currentPassword` — analogicznie do loginu (A-2). Polityka dotyczy wyłącznie momentu **ustawiania** hasła (`bootstrap-admin`, `accept-invite`, **`register`**); hasło raz zaakceptowane pozostaje ważne do re-auth, nawet gdyby polityka A-5 później się zaostrzyła.

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

A-6. Chronione trasy API (w tym SSE) wymagają sesji z cookie `cc_access` (`JwtAuthGuard` czytający JWT z cookie); trasy z rolami — dodatkowo `RolesGuard`. Brak / nieważna sesja → `401` `UNAUTHORIZED`; brak roli → `403` `FORBIDDEN`. Semantyka `@Roles` dla `admin`/`user` **bez zmian**: brak `@Roles` = authenticated OK.

A-6a. Globalny **`GuestGuard`**: gdy `role === guest` **i** `DEMO_MODE=true`, trasa musi mieć **`@AllowGuest()`** (whitelist). Brak dekoratora → **403** `FORBIDDEN`. Nowe trasy **domyślnie zablokowane** dla guest (default deny). **Zakaz** masowego `@Roles('admin','user')` jako substytutu GuestGuard. Gdy `DEMO_MODE=false`: każdy chroniony request z JWT `role=guest` (w tym `GET /auth/me`, `POST /auth/refresh`) → **401** jak A-2 (anti-enum) — **nie** 403 „forbidden guest”. Publiczne trasy (`@Public()`) bez tej gałęzi. Opcjonalne czyszczenie sesji/cookies w DB przy wyłączeniu demo — poza tym SPEC (feature).

Zmiana względem wersji 17 / A-6: wyłącznie Jwt + Roles. Od tej wersji GuestGuard + martwa sesja guest.

A-7. Admin **zaprasza** bez pola roli (body invitations / accept **bez** `role`). Konto nie-admin powstaje przez **`POST /auth/accept-invite`** **albo** **`POST /auth/register`** (A-11). Rola konta przy accept-invite = vs `DEMO_MODE` (jak A-11): **`true` → `guest`**, **`false` → `user`**. Invite **nigdy** → `admin`. Sens: demo off = pełnoprawny członek zespołu; demo on = gość sandboxu (nie członkostwo zespołu). Drugi `admin` nadal zakazany (A-1).

Zmiana względem: „Admin tworzy wyłącznie użytkowników z `role = user`” (implikowało `POST /users` + hasło). `POST /api/v1/users` z `password` **wypada z kanonu**.
Zmiana względem wersji 14 / A-7: „Konto `User` powstaje **wyłącznie** przez accept-invite”. Od tej wersji druga droga = self-register (A-11).
Zmiana względem wersji 18 / A-7: Admin zaprasza na `role = user` (zawsze `user` na ścieżce zaproszenia). Od tej wersji rola przy accept = vs `DEMO_MODE` (mirror A-11).

A-7a. `POST /api/v1/invitations` — tylko `admin`; body `{ email }` (bez hasła; **bez** `role`). Zapis Invitation `pending` (hash SHA-256 tokenu, TTL `INVITE_TTL`, default `7d`, parser jak JWT TTL) **najpierw**, potem send. Raw token **nie** wraca w JSON-ie. Send OK albo adapter logujący (`development` / `test`) → **201** `{ id, email, expiresAt }`. Pad prawdziwego SMTP po zapisie → **503** `MAIL_DELIVERY_FAILED`, envelope K-1, w `details` **`id` zaproszenia**; wiersz zostaje `pending`. Retry `POST` przy istniejącym `pending` (także wygasłym) → **409** `CONFLICT`. `user` → **403**. Istniejący `User` (aktywny albo soft-deleted) → **409**. URL w mailu: **`{APP_PUBLIC_URL}/invite/accept?token={raw}`** (ta sama ścieżka co FE — `docs/ux_dashboard.md`). Invite **dostępny** także przy `DEMO_MODE=true` (admin wpuszcza kolejnego gościa sandboxu).

Zmiana względem wersji 11 / A-7a: kształt deep linku nie był w SPEC (żył tylko w kodzie mailera).

A-7b. `POST /api/v1/auth/accept-invite` — publiczny (`@Public()`); body `{ token, password }` (`.strict()`; **bez** `role`). Walidacja tokenu i polityki A-5 **przed** transakcją (zły token / hasło → wiersz zaproszenia **bez zmian**). Happy path: **jedna** transakcja Prisma: `users.create(role=<guest|user vs DEMO_MODE>, verifiedAt=now())` **oraz** Invitation → `accepted` (wzorzec jak `createAdminIfNone`; rola jak A-11). **Nie** woła `setAuthCookies`. Token zły / zużyty / `revoked` / wygasły → **401** `UNAUTHORIZED` (ten sam komunikat — brak enumeracji tokenu). Hasło poza A-5 → **400** `VALIDATION_FAILED`. Kolizja `User.email` (P2002; aktywny albo soft-deleted) przy ważnym tokenie `pending` → **401** `UNAUTHORIZED` z **identycznym** `code` + `message` co przy złym tokenie (np. `Invalid invitation token`); **brak** `User`; Invitation → `revoked` (lub równoważne zużycie tokenu **bez** utworzenia `User`) w tej samej transakcji / atomowym kroku co próba create. **Zakaz** **409** / osobnego komunikatu „email zajęty” na tej publicznej trasie. **201** `{ "user": { "id", "email", "role" } }` — przy demo on `role` może być `guest`.

Zmiana względem wersji 13 / A-7b: kolizja email → **409** `CONFLICT` (świadoma enumeracja; „nie maskować jako 401”). Od tej wersji: maskowanie **401** + revoke Invitation — `docs/security.md`, `docs/dokumentacja_komunikacji.md`.
Zmiana względem wersji 18 / A-7b: `users.create(role=user, verifiedAt=now())` (pin `user`). Od tej wersji `role` vs `DEMO_MODE` (`guest` \| `user`); anti-enum **401**, brak Set-Cookie — **bez zmian**.

A-7c. Resend (`POST /api/v1/invitations/:id/resend`): rotacja tokenu (nowy raw, nowy hash, nowy `expiresAt`; stary nieważny) + ponowny mail; ten sam `id`. Brak / nie-pending → **404**. Pad SMTP → **503** + to samo `id` jak A-7a. Revoke (`DELETE /api/v1/invitations/:id`): `pending` → `revoked` (nie twardy DELETE wiersza); po revoke nowy `POST` na ten email dozwolony, o ile nie ma `User`.

A-7d. Najwyżej jeden `pending` na `email` — egzekucja indeksem SQL `UNIQUE (email) WHERE status = 'pending'` (Prisma 6 nie wyrazi partial unique; wzorzec jak `User_one_admin`; indeks **bez** `purpose`). `GET /invitations`: wszystkie `pending`, **w tym wygasłe**. Porównanie `email` (**User** i **Invitation**) **case-sensitive** — bez `trim` / `toLowerCase`.

A-8. TTL: **konfigurowalne env**; domyślnie access **15 minut**, refresh **1 dzień**. TTL zaproszenia: `INVITE_TTL`, default **7 dni**. TTL aktywacji konta: `ACTIVATION_TTL`, default **7 dni** (parser jak invite / JWT TTL).

A-9. MVP: **zakaz** transportu access przez `Authorization: Bearer` (web, Postman, integracje) — wyłącznie cookie jar / `credentials: 'include'`.

A-10. `DELETE /api/v1/users/:id` = **soft-delete / dezaktywacja** (brak twardego usunięcia wiersza w MVP). `:id` = `UserId`; zły format → **400** `VALIDATION_FAILED`; brak wiersza → **404** `USER_NOT_FOUND`; target `role = admin` → **403** `FORBIDDEN`. DELETE kasuje refresh w DB **oraz** usuwa wiersze **`AccountActivation`** dla usera. Soft-delete **nie** czyści `verifiedAt` (historia).

A-10a. `PATCH /api/v1/users/:id` = **wyłącznie reaktywacja** (kontrakt: `docs/dokumentacja_komunikacji.md`). Body `{ "isActive": true }` (literał; Zod `.strict()`; zakaz `role` / `email` / `password`). `isActive: false` → **400** `VALIDATION_FAILED` (dezaktywacja = DELETE, jeden kanał). Authz: `@Roles('admin')` + cookie; `user` → **403** `FORBIDDEN`; brak sesji → **401** `UNAUTHORIZED`. Path `:id` = `UserId`; zły format → **400** `VALIDATION_FAILED`; brak wiersza → **404** `USER_NOT_FOUND`; target `role = admin` → **403** `FORBIDDEN`. Target już `isActive: true` → **200** idempotentnie (bez 409). Sukces **200**: `{ id, email, role, isActive, verifiedAt, createdAt }` z `isActive: true`. **Bez** Set-Cookie; **bez** `RefreshSession.create` — potem zwykły `POST /auth/login`. **Nie** ustawia `verifiedAt` — konto bez weryfikacji nadal nie loguje się w `production` do czasu activate / resend. UI poza MVP.

Zmiana względem wersji 6 (A-10: „PATCH może służyć m.in. reaktywacji — poza UI MVP”): PATCH jest **obowiązkowy** w MVP i **tylko** reaktywacją (nie ogólną aktualizacją konta). UI nadal poza MVP.

Zmiana względem wersji 2 („dezaktywacja zamiast DELETE, jeśli implementacja tak wybierze”): soft-delete jest **obowiązkowy** dla DELETE.

Zmiana względem wersji 14 / A-10a: milczenie o `verifiedAt` przy reaktywacji. Od tej wersji jawnie: PATCH **nie** ustawia `verifiedAt`.

A-11. `POST /api/v1/auth/register` — publiczny (`@Public()`); body `{ email, password }` (`.strict()`; **bez** `role`). **Zawsze** dostępny — **nie** bramkowany `DEMO_MODE` (dostępność **bez zmian** względem A-11 po planie register). Rola: **`DEMO_MODE=true` → `guest`**; **`DEMO_MODE=false` → `user`**. **Zmiana względem:** A-11 wersji 17 (oraz kanon po planie register) — serwer **zawsze** ustawiał **`role = user`**; `guest` / `DEMO_MODE` były poza kontraktem register. **Zakaz:** drugi endpoint register-as-guest; `role` w body. Register **nigdy** → `admin`. Przed `User.create`: **revoke** ewentualnego **`Invitation` `pending`** na ten sam email. Polityka A-5 przed hashowaniem. Email case-sensitive jak A-7d. Aktywacja (A-12 / A-13 / `verifiedAt` / `AccountActivation`) **bez zmian** sensu — dotyczy także kont `guest` (demo on + `production`).

| Scenariusz | HTTP | Skutek |
|------------|------|--------|
| Nowy email, `NODE_ENV=production` | **201** `{ user: { id, email, role, verifiedAt } }` | `isActive=true`, `verifiedAt=null`, wiersz `AccountActivation` (`act_<uuid>`, unikalny `userId`, unikalny `tokenHash`), mail `user_activation`; **bez** Set-Cookie |
| Nowy email, poza `production` | **201** jak wyżej | `verifiedAt` ustawione od razu (ISO w body); bez wymogu maila aktywacyjnego; **bez** Set-Cookie |
| Email już w `User` (aktywny **lub** soft-deleted) | **409** `CONFLICT`, `message`: **`Email already in use`** | **Bez** drugiego `User`; **świadoma enumeracja** (UX); reclaim soft-delete = admin `PATCH`, nie register |
| Hasło poza A-5 | **400** `VALIDATION_FAILED` | brak User |
| Pad SMTP (`production`, **nowy** User właśnie utworzony) | **503** `MAIL_DELIVERY_FAILED` + `details.id` = id User | User pending zostaje; FE thank-you + resend (`SPEC-FRONTEND.md` F-4b) |

Zmiana względem wersji 15 / A-11: rola register zależna od `DEMO_MODE` / `guest`. Od wersji 17: register = wyłącznie `user` + revoke pending invite.
Zmiana względem wersji 17 / A-11: zawsze `role = user`. Od tej wersji **refaktor** — rola vs `DEMO_MODE` (dostępność i reszta tabeli A-11 **bez zmian**).

A-12. `POST /api/v1/auth/activate` — publiczny; body `{ token }`. Sukces: ustawia `User.verifiedAt`, **usuwa** wiersz(e) `AccountActivation` dla tego usera; **200** `{ user: { id, email, role } }`; **bez** Set-Cookie. Token zły / zużyty / wygasły → wspólny **401** (bez rozróżniania; bez enumeracji email). **Zakaz** **409** na tej trasie (409 `Email already in use` = wyłącznie register / inne surface’y z zajętym emailem — A-11). Wymóg aktywacji linkiem tylko w `NODE_ENV=production`; poza prod ścieżka nie jest obligatoryjna (A-11 ustawia `verifiedAt` od razu). Deep link FE: wyłącznie `/?activationToken=`.

Zmiana względem wersji 16 / A-12: błędne **409** „Email already in use” na activate. Od tej wersji activate-fail = wyłącznie wspólny **401**.

A-13. `POST /api/v1/auth/resend-activation` — publiczny; body np. `{ email }`. **Zawsze** **200** + `message`: **`Wiadomość wysłana ponownie`**, niezależnie czy email istnieje / pending / już aktywny / przekroczony rate limit. Mail + rotacja tokenu (nowy hash, nowy `expiresAt`) **tylko** gdy jest pending z `AccountActivation`; inaczej no-op (**w tym** pad SMTP — **bez** **503**). Rate limit: **5** / **15 min** na email (soft). **Bez** Set-Cookie. **Bez** enumeracji stanu konta przez resend.

Zmiana względem wersji 15 / A-13: **503** `MAIL_DELIVERY_FAILED` na resend aktywacji. Od tej wersji stały **200** + stały message.

**Stany konta (kanon):**

| Stan | `isActive` | `verifiedAt` | `AccountActivation` | Login (`production`) |
|------|------------|--------------|---------------------|----------------------|
| Pending (po register w prod) | `true` | `null` | 1 ważny wiersz | **401** |
| Zweryfikowany | `true` | ustawione | brak | OK |
| Soft-delete | `false` | dowolne | zwykle brak | **401** |
| Po register poza prod | `true` | ustawione od razu | brak | OK |

**Zakaz** reuse `isActive=false` jako pending.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/auth/
├── auth.module.ts
├── auth.controller.ts          # bootstrap-status, bootstrap, login, refresh, logout, me, me/email, accept-invite, register, activate, resend-activation
├── users.controller.ts         # GET/PATCH/DELETE users (admin) — bez POST create-z-hasłem
├── invitations.controller.ts   # GET/POST invitations, resend, revoke (admin) — lub równoważny podział
├── application/                # use-case’y (InviteUser, AcceptInvite, RegisterUser, ActivateAccount, ResendActivation, ListInvitations, Resend, Revoke, lista/soft-delete/reaktywacja)
├── domain/                     # reguły ról, polityka haseł, soft-delete, porty invitation + account-activation + mailer
└── infrastructure/             # Prisma (User, Invitation, AccountActivation), hash bcrypt, JWT, cookie helpers, adapter SMTP (nodemailer) / adapter logujący
```

| Element | Norma |
|---------|--------|
| Guardi | `JwtAuthGuard` + `RolesGuard` + **`GuestGuard`** (Nest + Passport JWT); extractor JWT z cookie `cc_access` |
| Access | JWT w cookie `cc_access`; krótki TTL; stateless do wygaśnięcia |
| Refresh | hash w DB + cookie `cc_refresh`; rotacja przy każdym refresh |
| Cookie (production) | `httpOnly`; `Secure` + `SameSite=strict` na **obu** cookie; origin = FE (BFF) |
| Biblioteki | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt` (lub `bcryptjs`); **nodemailer** wyłącznie jako adapter SMTP w infrastructure |
| Mailer | Port w Auth (`send({ kind: 'user_invited' \| 'user_activation', … })`); `development` / `test`: adapter logujący; `production`: nodemailer SMTP |

Wzorce zgodne z modelem Nest Authentication ([docs.nestjs.com/security/authentication](https://docs.nestjs.com/security/authentication)). Cost bcrypt = 12 — [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). Adapter SMTP: [Nodemailer `createTransport` + `sendMail`](https://github.com/nodemailer/nodemailer) (`host` / `port` / `auth.user` / `auth.pass` ↔ `SMTP_*`; `from` ↔ `MAIL_FROM`).

### Sesja (cookie-only)

1. Login: wydaj JWT → `cc_access`; wygeneruj sekret refresh → hash w DB → `cc_refresh`.
2. Refresh: waliduj `cc_refresh` vs DB → unieważnij stary → nowy refresh + nowy access w cookie.
3. Logout / reuse unieważnionego refresh: unieważnij sesję; wyczyść oba cookie.
4. Access JWT nie zastępuje store’u refresh.

### Wolno

- Port persistence użytkowników, sesji refresh, **zaproszeń** oraz **aktywacji konta** (`AccountActivation`); adapter Prisma w `infrastructure`.
- Port mailera transakcyjnego w Auth (`user_invited` **oraz** `user_activation`); adapter logujący poza `production`; adapter SMTP = **nodemailer** wyłącznie w infrastructure.
- Walidacja DTO auth class-validator + reguły haseł w domain/application (Zod — `SPEC-KOMUNIKACJA.md`).
- Soft-delete + flaga aktywności; odrzucenie loginu dla kont nieaktywnych **oraz** (w prod) bez `verifiedAt`; PATCH reaktywacji **bez** odtwarzania sesji refresh i **bez** ustawiania `verifiedAt`.
- Publiczny `bootstrap-status`, `accept-invite`, **`register`**, **`activate`**, **`resend-activation`** bez sesji.
- `UserRole` w `@content-chain/shared`: `admin` \| `user` \| **`guest`**; persistencja `User.role` = **String** (bez wymogu Prisma enum) — `SPEC-MONOREPO.md` / `SPEC-PERSISTENCE.md`.
- `GuestGuard` + `@AllowGuest` na allowliście; `DEMO_MODE` wyłącznie env przy starcie procesu (default `false`; zmiana = restart; **brak** toggle UI).
- `guest` z self-register **lub** accept-invite gdy `DEMO_MODE=true` (A-7b / A-11).

### Nie wolno

- Drugiego `role = admin` ani awansu `user` → `admin` w MVP; register / activate / resend → `admin`; invite → `admin`.
- **Awansu `guest` → `user` / `admin`** (endpoint, skrypt produktowy, „promocja”) — **zakaz permanentny**.
- Przypisywania `guest` przy **bootstrap** (bootstrap → wyłącznie `admin`).
  Zmiana względem wersji 18 / „Nie wolno”: *„Przypisywania `guest` przy accept-invite / bootstrap”* — gałąź accept-invite **unieważniona**; przy `DEMO_MODE=true` accept-invite **wolno** → `guest` (A-7b). Zakaz bootstrap→`guest` **zostaje**.
- Osobnego endpointu register-as-guest albo `role` w body register / invitations / accept-invite.
- Przechowywania haseł plaintext / odwracalnych.
- Hasła w mailu; admin zna hasło `user`; `POST /users` z hasłem.
- Nodemailera (ani innego klienta SMTP) w domain / use-case — wyłącznie adapter infrastructure.
- Bramkowania `POST /auth/register` przez `DEMO_MODE` (register zawsze publiczny).
  Zmiana względem wersji 14 / „Nie wolno”: „Otwartego signup (konto `user` tylko z ważnym tokenem zaproszenia)” — **unieważnione**; obowiązuje A-11 + invite.
- Pending przez samo `isActive=false` (obowiązuje `verifiedAt=null` + `AccountActivation` w prod).
- Wymagania aktywacji linkiem poza `NODE_ENV=production`.
- Set-Cookie na register / activate / resend-activation.
- Maskowanego **201** (lub innego „sukcesu”) przy kolizji email na register — obowiązuje **409** `CONFLICT` + jawny message (A-11).
- Zwracania raw tokenu zaproszenia **ani** raw tokenu aktywacji w JSON-ie admina / odpowiedziach.
- Zwracania access/refresh w body JSON ani trzymania ich w `localStorage` / memory FE jako store.
- `Authorization: Bearer` jako modelu auth MVP.
- OAuth / social login / 2FA w MVP.
- Egzekucji ról wyłącznie po stronie UI.
- Self-service w MVP: zmiana hasła **zalogowanego**, usuwanie własnego konta; confirm e-mail przy zmianie adresu (V1) — **nie** mylić z aktywacją po register (A-12).
  Zmiana względem: „żadnego ustawiania hasła przez użytkownika”. **Wyjątek (D13):** jednorazowe **pierwsze** hasło przy `accept-invite` **oraz** hasło na `register` to onboarding, nie self-service hasła.
  Zmiana względem wersji 9: zakaz obejmował też zmianę email — od tej wersji A-3b **jest** w MVP (re-auth: `PATCH /auth/me/email` + `currentPassword`).
  Zmiana względem: A-3b na `PATCH /auth/me` bez re-auth / złe hasło jako `UNAUTHORIZED`.
- Mutacji wrażliwej email / hasła na `PATCH /auth/me` (miesza probe z update) — obowiązuje osobna ścieżka A-3b.
- Twardego DELETE użytkownika jako domyślnego zachowania MVP (obowiązuje soft-delete).
- `PATCH /users/:id` z `role` / `email` / `password` albo `isActive: false` (dezaktywacja wyłącznie DELETE). Własny email = wyłącznie `PATCH /auth/me/email` (A-3b).
- Refresh wyłącznie jako JWT w cookie **bez** wpisu w DB.
- Wycieku hashów haseł, sekretów JWT, plaintext refresh, raw tokenu zaproszenia ani raw tokenu aktywacji (w `production`) do logów / envelope.
- **409** `CONFLICT` / odrębnego kodu „email zajęty” na publicznym `POST /auth/accept-invite` przy kolizji `User.email` — obowiązuje **401** jak nieważny token + revoke (A-7b). **409** na `POST /invitations`, `PATCH /auth/me/email` **oraz** `POST /auth/register` **zostaje**.
- Masowego `@Roles('admin','user')` zamiast `GuestGuard` / `@AllowGuest`.
- Switcha DEMO w panelu admina (`DEMO_MODE` wyłącznie env + restart).

Zmiana względem wersji 13 / „Nie wolno”: brak zakazu 409-enumeracji na accept-invite (wcześniej A-7b nakazywało 409).
Zmiana względem wersji 14 / „Nie wolno”: zakaz otwartego signup unieważniony; dopisano zakazy Set-Cookie na register/activate/resend, maskowanego 201 przy kolizji, pending przez `isActive=false`.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS + `@nestjs/jwt` + `@nestjs/passport` + `passport-jwt` | obowiązkowe |
| bcrypt, **cost = 12** | obowiązkowe |
| Cookie `cc_access` + `cc_refresh` (httpOnly) + refresh hash w DB + rotacja | obowiązkowe |
| TTL env: access default 15m, refresh default 1d; `INVITE_TTL` default 7d; `ACTIVATION_TTL` default 7d | obowiązkowe |
| Port mailera + **nodemailer** (adapter SMTP w `production`) | obowiązkowe |
| Adapter logujący maila w `development` / `test` | obowiązkowe |
| Kind mailera `user_invited` **oraz** `user_activation` | obowiązkowe |
| Bearer access / OAuth / 2FA / zmiana hasła zalogowanego / usuwanie siebie / confirm e-mail przy zmianie adresu | poza MVP (V1 confirm) |
| `GET /auth/me` + `PATCH /auth/me/email` (`email` + `currentPassword`) + `GET /auth/bootstrap-status` + `POST /auth/accept-invite` + `POST /auth/register` + `POST /auth/activate` + `POST /auth/resend-activation` | obowiązkowe |
| `PATCH /users/:id` (reaktywacja `{ isActive: true }`) | obowiązkowe |
| Model `User.verifiedAt` + tabela `AccountActivation` | obowiązkowe (`SPEC-PERSISTENCE.md`) |

## Kryteria akceptacji

- [ ] `bootstrap-status` poprawnie sygnalizuje dostępność; bootstrap tworzy jedynego admina + sesję; ponowne wywołanie odrzucone.
- [ ] Próba utworzenia drugiego admina przez API odrzucona; register / activate / resend **nie** tworzą `admin`.
- [ ] Login ustawia `cc_access` i `cc_refresh` (httpOnly); body bez tokenów; chronione trasy działają na cookie.
- [ ] Login → ten sam **401** dla złego hasła / soft-delete / (prod) `verifiedAt == null` / (`guest` && `DEMO_MODE=false`); **bez** `ACCOUNT_NOT_ACTIVATED`.
- [ ] `GET /auth/me` / refresh z JWT `guest` przy `DEMO_MODE=false` → **401** (nie 403).
- [ ] Guest bez `@AllowGuest` przy demo on → **403**; `GET /users` / invitations / `PATCH /auth/me/email` dla guest → **403**.
- [ ] `GET /auth/me` zwraca `{ id, email, role }` albo **401** `UNAUTHORIZED`; `PATCH /auth/me/email` `{ email, currentPassword }` zmienia własny adres po re-auth albo **409** gdy zajęty; złe hasło → **401** `INVALID_PASSWORD` / `Invalid password`; brak / pusty `currentPassword` → **400**; refresh rotuje cookie; logout czyści oba i unieważnia sesję w DB; A-3b **nie** rotuje sesji; **brak** mutacji na `PATCH /auth/me`.
- [ ] Hasło niespełniające polityki → `VALIDATION_FAILED`; spełniające → bcrypt(cost 12) — na accept-invite **oraz** register.
- [ ] `user` nie przechodzi tras admin-only (`RolesGuard` → `FORBIDDEN`), w tym `POST /invitations` → 403.
- [ ] Admin zaprasza (`POST /invitations`, tylko email, bez `role`) → pending + mail; accept-invite: `DEMO_MODE=false` → `role=user`, `DEMO_MODE=true` → `role=guest`; potem login; raw token nie wraca w JSON admina.
- [ ] `POST /auth/register`: nowy email → **201** bez Set-Cookie; prod = pending + mail; poza prod = `verifiedAt` od razu; zajęty email → **409** `CONFLICT` (bez drugiego User); **nie** maskowany 201; `DEMO_MODE=true` → `role=guest`; `false` → `role=user`.
- [ ] `POST /auth/activate`: sukces → **200** `{ user }` + `verifiedAt` + delete `AccountActivation`; zły token → wspólny **401**.
- [ ] `POST /auth/resend-activation`: zawsze **200** + `Wiadomość wysłana ponownie`; mail tylko przy pending; **bez** **503**.
- [ ] DELETE soft-delete usuwa wiersze `AccountActivation`; register **nigdy** `admin`; bootstrap **nigdy** `guest`; invite **nigdy** `admin`; invite rola vs `DEMO_MODE` (nie pin „zawsze user”).
- [ ] Brak ścieżki HTTP promocji `guest` → `user`/`admin`.
- [ ] Drugi `POST /invitations` przy `pending` (także wygasłym) → **409**; `GET` pending obejmuje wygasłe.
- [ ] Zużyty / wygasły / revoked token → **401** na accept-invite; hasło poza A-5 → **400** (pending bez zmian).
- [ ] Kolizja `User.email` (także soft-deleted) przy ważnym tokenie → **401** `UNAUTHORIZED`, ten sam `message` co zły token; Invitation → `revoked`; **nie** **409**; brak `User` z tej próby.
- [ ] Pad SMTP po zapisie (gdy testowany adapter SMTP) → **503** `MAIL_DELIVERY_FAILED` + `details.id` (Invitation albo User).
- [ ] DELETE użytkownika = soft-delete; nieaktywny nie loguje się; soft-delete **nie** czyści `verifiedAt`.
- [ ] PATCH `{ isActive: true }` na soft-deleted `user` → 200 `isActive: true`; **nie** ustawia `verifiedAt`. `isActive: false` / `role` w body → 400. `user` woła PATCH → 403. PATCH admina → 403.
- [ ] Postman / FE bez Bearer — wyłącznie cookie.
- [ ] Domyślne TTL: access 15m, refresh 1d, invite 7d, activation 7d (nadpisywalne env).

## Poza zakresem

- Widoki UI (first-run, login, rejestracja, thank-you, aktywacja→login+toast, użytkownicy, konto, akceptacja zaproszenia) — **MVP dashboardu** → `SPEC-FRONTEND.md` / `docs/ux_dashboard.md`. Ten SPEC nie wymaga ekranów jako DoD API (Postman zostaje).

Zmiana względem wersji 7 / poza zakresem: doprecyzowano, że ekrany Users i accept-invite są w zakresie MVP FE, nie „przyszłe”.
Zmiana względem wersji 14 / poza zakresem: dopisano rejestrację / thank-you / deep link aktywacji jako widoki FE.
- Self-service: zmiana hasła **zalogowanego** / usuwanie własnego konta; OAuth, SSO, 2FA, recovery „lost admin”; confirm e-mail przy zmianie adresu (**V1** — **nie** mylić z A-12). Pierwsze hasło na accept-invite **oraz** hasło na register **są** w zakresie. **Zmiana własnego emaila z re-auth (A-3b) jest w zakresie MVP** — wzorzec ścieżki + `INVALID_PASSWORD` = fundament pod przyszłe `PATCH /auth/me/password` (poza MVP).
- Soft-delete / reaktywacja w UI admina (API tak; UI MVP nie) — płynne V1.
- Zarządzanie / czyszczenie kont `guest` (osobny plan).
- Chip / locki UI DEMO — `SPEC-FRONTEND.md`. Polityka slotów / Redis admit — `SPEC-RUNY.md` R-12.
- Szczegóły ekspozycji sieciowej gateway/metrics / reverse proxy → `SPEC-BEZPIECZENSTWO.md`.
- Schema Prisma — `SPEC-PERSISTENCE.md` / implementacja, byle port sesji refresh, zaproszeń, aktywacji (`AccountActivation` / `verifiedAt`) i flagi aktywności istniał.
