---
wersja: 11
data_utworzenia: 2026-09-29
data_modyfikacji: 2026-10-06
---

# Bezpieczeństwo — Content Chain

Norma self-host dla `local` i `production`: auth, sekrety, ekspozycja powierzchni, bootstrap. Bez pełnego modelu STRIDE.

Powiązane: `dokumentacja_komunikacji.md`, `deployment.md`, `anty_patterny.md`, `architektura.md`.

Zmiana względem: publiczny health = tylko liveness. Od tej wersji także publiczny `GET /api/v1/health/ready` — jak liveness: **bez** wrażliwych danych, bez wycieku `GATEWAY_KEY` / topologii wewnętrznej.

Zmiana względem: zakaz otwartego signup; jedyna droga na `user` = invite. Od tej wersji: self-registration legalna obok invite; aktywacja e-mail w `production` (`verifiedAt` + `AccountActivation`); **409** na register przy kolizji email (świadoma enumeracja UX); resend/login bez enumeracji stanu konta.

Zmiana względem: `security.md` po planie register — register **zawsze** `role = user`; `guest` / `DEMO_MODE` poza kanonem. Od tej wersji **refaktor roli** (dostępność register **bez zmian**): `DEMO_MODE=true` → `guest`; `false` → `user`. Dopisano GuestGuard, martwą sesję guest przy demo off, limity Redis, ownership odczytu/mutacji. **Bez** rozdziału o zarządzaniu/czyszczeniu kont guest (osobny plan).

Zmiana względem: Redis guest bez normy hasła połączenia. Od tej wersji: opcjonalne **`REDIS_PASSWORD`** (HOST/PORT); przy `REDIS_URL` hasło w URL; sekret jak `SMTP_PASS` (nie w logach / health / envelope) — `deployment.md`.

Zmiana względem: kanon `REDIS_URL` **albo** HOST/PORT. Od tej wersji wyłącznie **`REDIS_HOST`+`REDIS_PORT`** (+ opcjonalne **`REDIS_PASSWORD`**); **`REDIS_URL` usunięte**.

Zmiana względem: Faza 18 / demo — *„invite nigdy nie tworzy `guest` (także przy demo on)”*; `guest` wyłącznie self-register. Od tej wersji accept-invite **mirror register**: `DEMO_MODE=true` → **`guest`**, `false` → **`user`**. Sens: przy demo off invite = pełnoprawny członek zespołu; przy demo on = kolejny gość sandboxu (rekruterzy / zaciekawieni), **nie** członkostwo zespołu — te same limity co register→guest. Body nadal bez `role`; invite **nigdy** → `admin`. Register **bez zmian**.

## Założenia

- Jedna instancja = jedna firma; zagrożenia to głównie błędna konfiguracja i wyciek sekretów, nie multi-tenant izolacja.
- Publiczne repo MIT — docs muszą być jednoznaczne dla operatora.
- LLM i klucze vendorów wyłącznie za `apps/ai-provider-gateway`.

## Role i uprawnienia

| Akcja | `admin` | `user` | `guest` (tylko gdy `DEMO_MODE=true`) |
|-------|---------|--------|-----------------------------------------|
| Edycja kontekstu firmy | tak | nie | **nie** (GET kontekstu **tak**; write → **403**) |
| Start runów produktowych | tak (wszystkie typy) | tak (wszystkie typy) | tak — **allowlista** 3 typów + slot ×1 + global cap Redis (`dokumentacja_komunikacji.md`) |
| HITL / cancel / ocena / feedback `run` | własne (`startedBy`) | własne | **tylko własne**; cudze → **403** |
| Lista `GET /runs` (archiwum instancji) | tak | tak | **tak** (showcase) |
| Detail / logs / events / SSE | własne wg kanonu ownership | własne | **tylko własne**; cudze → **403** |
| `POST .../output-edited` / finalize-review | własne (okno TTL) | własne | **nie** → **403** |
| `PATCH /auth/me/email` | tak | tak | **nie** → **403** |
| `POST /feedback` `application` / `agent` | tak | tak | **tak** (bez limitu Redis) |
| Panel odczytu / analityka opinii | V1 — rozbudowa | V1 — rozbudowa | V1 — rozbudowa |
| Lista użytkowników (`GET /users`) | tak | nie | **nie** → **403** |
| Zaproszenia: create / lista pending / resend / revoke | tak | nie | **nie** → **403** |
| Soft-delete / reaktywacja usera | tak | nie | **nie** → **403** |
| Bootstrap pierwszego admina | jednorazowy (API + tryb strony głównej / karta logowania) | — | — |

**403** przy naruszeniu (`FORBIDDEN`). Egzekucja zawsze w `apps/api`, nie tylko w UI. Nowe trasy: **GuestGuard** — brak `@AllowGuest()` → guest **403** (default deny). `admin`/`user`: `@Roles` jak dotychczas.

Gdy `DEMO_MODE=false`: JWT z `role=guest` na **każdej** chronionej trasie (w tym `/me`, refresh) → **401** jak nieaktywne / złe credentials (anti-enum). Rola guest jest **martwa**. Opcjonalne czyszczenie sesji w DB — poza tym dokumentem (feature).

## Bootstrap i konta admin

1. **`GET /api/v1/auth/bootstrap-status`** (publiczny) — `{ available }` pod stronę główną (czy submit karty logowania to bootstrap, czy `POST /auth/login`).
2. **`POST /api/v1/auth/bootstrap-admin`** działa **wyłącznie**, gdy w DB **nie ma** żadnego użytkownika z `role = admin`. Po sukcesie ustawia sesję cookie (jak login) oraz **`User.verifiedAt = now()`** (admin gotowy do loginu bez aktywacji linkiem).
3. Po utworzeniu pierwszego admina endpoint bootstrap jest **trwale niedostępny** (np. **409** `CONFLICT` / **403**); `bootstrap-status.available === false`.
4. **Twarda blokada:** tworzenie / awans kolejnych użytkowników z `role = admin` jest **zabronione** w MVP (API odrzuca). W systemie jest **co najwyżej jeden** admin — ten z bootstrapu. Register / activate / resend **nigdy** nie tworzą `admin`.
5. **Dwie drogi na konto nie-admin:** (a) **zaproszenie** — admin podaje tylko email; aktywne konto powstaje przy `POST /auth/accept-invite` (gotowe do loginu; **`verifiedAt = now()`**); **rola vs `DEMO_MODE`** jak register: **`true` → `guest`**, **`false` → `user`**. Body invite / accept **bez** `role`; invite **nigdy** → `admin`. **Sens:** demo off = pełnoprawny członek zespołu; demo on = gość sandboxu (nie członkostwo zespołu). (b) **otwarta rejestracja** — publiczny `POST /auth/register` (zawsze dostępny; **nie** zależy od `DEMO_MODE`). **Zmiana względem:** po planie register serwer **zawsze** ustawiał **`role = user`**. **Refaktor register:** `DEMO_MODE=true` → **`guest`**; `DEMO_MODE=false` → **`user`**. Body **bez** `role`. Register **nigdy** → `admin`. Przed utworzeniem `User` register **unieważnia** (`revoked`) ewentualne **`Invitation` `pending`** na ten sam email. **Nie** przez `POST /users` z hasłem. **Zakaz permanentny** awansu `guest` → `user` / `admin`.
6. **Self-service konta w MVP:** zalogowany może zmienić **własny email** (`PATCH /api/v1/auth/me/email`, widok Konto) wyłącznie po podaniu **aktualnego hasła** w body (`currentPassword`). To **re-auth** przy mutacji wrażliwej — **nie** jest self-service zmianą hasła. **`GET /auth/me` = wyłącznie probe** (bez mutacji na `PATCH /auth/me`). **Poza MVP:** zmiana hasła zalogowanego (planowany wzorzec: osobna trasa np. `PATCH /auth/me/password` + re-auth + `INVALID_PASSWORD`, po SMTP), usuwanie własnego konta. **Confirm e-mail przy zmianie adresu = V1** — **nie** mylić z aktywacją konta po rejestracji. **Wyjątek onboarding:** pierwsze hasło przy `POST /auth/accept-invite` oraz hasło przy `POST /auth/register`. MVP: login / logout / bootstrap / register + activate + resend / zaproszenia + accept-invite + zmiana własnego emaila z re-auth.

Zmiana względem: mutacja na `PATCH /auth/me` + złe hasło jako `UNAUTHORIZED`. Powód: rozdział probe vs mutacja; uniknięcie konfliktu z cyklem sesji FE.
Zmiana względem: self-service email bez re-auth (sam cookie). Powód: skradziona sesja nie może trwale przejąć identyfikatora konta bez znajomości hasła.
Zmiana względem: „self-service email poza zakresem MVP”.
7. **`DELETE /api/v1/users/:id`** = soft-delete (dezaktywacja); konto nieaktywne nie loguje się. DELETE **usuwa** wiersze **`AccountActivation`** dla tego usera (jeśli były). **`POST /auth/register`** na email soft-deleted → **409** `CONFLICT`, `message`: **`Email already in use`** (reclaim wyłącznie adminem przez `PATCH`, nie self-register). **Reaktywacja** = **`PATCH /api/v1/users/:id`** z body `{ "isActive": true }` (API; UI nadal poza MVP). `PATCH` **nie** przyjmuje `role` (zakaz awansu do `admin`) ani `isActive: false` (dezaktywacja wyłącznie przez DELETE). Reaktywacja **nie** odtwarza sesji refresh — potem zwykły login. Admin `PATCH` **nie** ustawia `verifiedAt` — konto bez weryfikacji nadal nie loguje się w `production` do czasu activate / resend.

Zmiana względem wcześniejszego punktu 7 (tylko DELETE / soft-delete): kanał przywrócenia konta w API jest **PATCH**, nie ręczna edycja SQLite.

## DEMO MODE, GuestGuard i limity gościa

Włączanie wyłącznie env **`DEMO_MODE=true|false`** (default **`false`**), odczyt przy **starcie procesu** — jedyna zmiana trybu to **restart**. **Brak** toggle w panelu admina.

- Publiczny **`GET /api/v1/config`** (V1): wyłącznie `{ "demoMode": boolean }`. FE nie egzekwuje limitów.
- **Register zawsze dozwolony** (plan register — dostępność **bez zmian**). Rola: jak punkt 5 powyżej.
- **Login:** kolejność dla pary guest + demo: **najpierw** check `DEMO_MODE`. `guest` && `DEMO_MODE=false` → reject **tym samym 401** + message co złe hasło / konto nieaktywne (anti-enum). `admin` / `user` bez zmian. Przy demo on: login `guest` jak zwykły login (w tym pending `verifiedAt` w `production`).
- **GuestGuard** + whitelist **`@AllowGuest()`**. Nowe trasy default deny dla guest.
- Rate limit HTTP (jak pozostałe trasy) **oraz** admit przy `POST /runs` (Redis global cap) — **nie** drugi semafor execute obok `MAX_CONCURRENT_RUNS`. FIFO i cap współbieżności **bez zmian**.
- Redis: klucze `content-chain:guest:daily:runs:{UTC-date}` oraz `content-chain:guest:daily:ratings:{userId}:{UTC-date}`. Przy `DEMO_MODE=true` Redis potrzebny pod cap + soft rating. Przy `false` Redis **opcjonalny**; `health` / `ready` **nie** failują z braku Redis. Połączenie: **`REDIS_HOST`+`REDIS_PORT`** (+ opcjonalne **`REDIS_PASSWORD`**). **`REDIS_PASSWORD`** = sekret (nie w logach, metrics, envelope, body `health`/`ready`).
- Pad Redis przy `POST /runs` guest → **fail closed**. Pad Redis przy ratingu guest → **fail open**.
- Admin: tylko bootstrap / istniejący wiersz; dump SQLite przenosi role (w tym `guest` i admina). `DEMO_MODE` **nie** degraduje ról w DB.

## Rejestracja i aktywacja konta (e-mail)

Bramka aktywacji zależy wyłącznie od **`NODE_ENV=production`**. **Nie** zależy od `DEMO_MODE`.

| Stan | `isActive` | `verifiedAt` | `AccountActivation` | Login (`production`) |
|------|------------|--------------|---------------------|----------------------|
| Pending (po register w prod) | `true` | `null` | 1 ważny wiersz | **401** (ten sam komunikat co złe hasło / soft-delete) |
| Zweryfikowany | `true` | ustawione | brak | OK |
| Soft-delete | `false` | dowolne (bez czyszczenia) | zwykle brak | **401** |
| Po register poza prod | `true` | ustawione od razu | brak (wymóg wyłączony) | OK |

- **`production`:** po udanym register: `isActive = true`, `verifiedAt = null`, wiersz **`AccountActivation`** (hash tokenu + `userId` + `expiresAt`), mail `user_activation`. **Bez** Set-Cookie. Login **401** do czasu udanego `POST /auth/activate`.
- **Poza `production`:** przy register od razu `verifiedAt` ustawione; aktywacja linkiem **wyłączona** (opcjonalny log URL jak invite — DX).
- Token: w DB **tylko hash**; raw wyłącznie w mailu / logu DX. **`AccountActivation`**: `id` = prefiks **`act_`** + UUID; **`userId`** unikalny (max jeden wiersz na usera); **`tokenHash`** unikalny. Po udanej aktywacji: ustaw `User.verifiedAt`, **usuń** wiersz(e) `AccountActivation` dla tego usera. TTL: env `ACTIVATION_TTL`, default **`7d`** (jak invite). **`POST /auth/register`** sukces **201** zwraca `{ "user": { "id", "email", "role", "verifiedAt" } }` (`verifiedAt` ISO lub `null` w prod pending).
- **Pending ≠ soft-delete:** pending ma `isActive = true` + `verifiedAt = null`. Soft-delete = `isActive = false`. **Zakaz** reuse `isActive = false` jako „oczekuje na mail”.
- **`POST /auth/register` + zajęty email:** **409** `CONFLICT`, `message`: **`Email already in use`**. **Bez** drugiego `User`. **Świadoma enumeracja** — trade-off UX (użytkownik musi móc zmienić adres). Zmiana względem chwilowego zapisu „maskowany 201 przy kolizji”.
- **`POST /auth/resend-activation`:** zawsze **200** + ten sam `message`: **`Wiadomość wysłana ponownie`**, niezależnie czy email istnieje / pending / już aktywny / przekroczony rate limit. Mail + rotacja tokenu **tylko** gdy jest pending z `AccountActivation`; inaczej no-op (w tym pad SMTP — **bez** **503**). Rate limit: **5** żądań / **15 min** na email (soft); po przekroczeniu — **ta sama** odpowiedź **200**. **Bez** enumeracji przez resend. Zmiana względem wersji 4: **503** `MAIL_DELIVERY_FAILED` na resend aktywacji.
- **`POST /auth/login`:** wspólny **401** dla złego hasła / soft-delete / brak `verifiedAt` w prod **oraz** (`role=guest` && `DEMO_MODE=false`) — **bez** `ACCOUNT_NOT_ACTIVATED` i bez ujawniania „pending” / „guest przy demo off”. Check demo dla guest **przed** innymi powodami rejectu tego przypadku.
- **`POST /auth/activate`:** zły / zużyty / wygasły token → wspólny **401** (bez rozróżniania). Sukces → **200** `{ "user": { "id", "email", "role" } }`, **bez** Set-Cookie. **Zakaz** **409** na activate (`Email already in use` = wyłącznie register i inne surface’y z zajętym emailem).

Zmiana względem wersji 5: usunięto **409** na activate; kanoniczny message register **409** = `Email already in use`.
- Polityka haseł jak bootstrap / accept-invite; email **case-sensitive** (bez `trim` / `toLowerCase`) — bez zmian.

## Hasła (bcrypt)

- Algorytm: **bcrypt** (hash tylko po stronie `apps/api`; nigdy plaintext w logach).
- Polityka przy ustawianiu / zmianie hasła (walidacja przed hashowaniem):

| Reguła | Wymaganie |
|--------|-----------|
| Długość | minimum **12** znaków |
| Cyfra | minimum **1** |
| Wielka litera | minimum **1** |
| Znak specjalny | minimum **1** (bezpieczny zestaw ASCII, np. `!@#$%^&*()_+-=[]{}|;:,.<>?`) |

Niespełnienie → **400** `VALIDATION_FAILED` z czytelnym komunikatem (bez ujawniania hashów). Ta sama polityka obowiązuje przy **pierwszym** haśle na `accept-invite` oraz przy haśle na `POST /auth/register`.

Przy `PATCH /api/v1/auth/me/email` pole `currentPassword` jest weryfikowane **tak samo jak przy logowaniu** — wyłącznie porównaniem bcrypt z hashem sesji, **bez** polityki haseł (polityka obowiązuje wyłącznie przy ustawianiu **nowego** hasła — bootstrap / accept-invite / register). Złe hasło → **401** `INVALID_PASSWORD`, `message`: `Invalid password` (osobny od sesyjnego `UNAUTHORIZED` i od loginu `Invalid credentials`). Plaintext `currentPassword` nigdy w logach ani odpowiedziach.

Porównanie i unique `email` (**User** i **Invitation**) są **case-sensitive**, jak `findForAuth` / `User.email` dziś. Świadomie **bez** `trim` / `toLowerCase`. `Ada@x` i `ada@x` to dwa różne adresy.

Na **publicznym** `POST /auth/accept-invite` kolizja `User.email` (P2002; aktywny albo soft-deleted) → **401** `UNAUTHORIZED` z **identycznym** `code` + `message` co przy złym / zużytym / `revoked` / wygasłym tokenie (np. `Invalid invitation token`). **Zakaz** odrębnego statusu lub kodu zdradzającego istnienie `User` (w tym „email zajęty”). Przy kolizji zaproszenie należy **unieważnić** (`revoked` lub równoważne zużycie tokenu **bez** utworzenia `User`), żeby ten sam raw token nie został „żywy” `pending`. Kolizja to edge (race, soft-deleted zajmujący email) — naprawa po stronie operatora (Users / nowe zaproszenie), nie przez **409** dla gościa z linkiem. Admin nadal widzi użytkowników i soft-delete; **409** przy `POST /invitations` (istniejący User / drugi pending), przy `PATCH /auth/me/email` oraz przy **`POST /auth/register` (zajęty email)** **zostaje** — inny threat model (sesja admina / zalogowany / **świadomy UX signup**).

Zmiana względem: kolizja na accept-invite → **409** `CONFLICT` jako świadoma enumeracja „email zajęty” / „nie maskować jako 401”. Powód: publiczny endpoint invite nie może być probe istnienia konta. **Register** świadomie **jest** wyjątkiem UX (**409**).

| Surface | Zachowanie | Enumeracja? |
|---------|-------------|-------------|
| `POST /auth/register` — email już w `User` | **409** `CONFLICT` + jawny komunikat | **Tak — świadoma** (UX) |
| `POST /auth/resend-activation` | Zawsze ten sam sukces; mail tylko przy pending | **Nie** |
| `POST /auth/login` | Wspólny **401** (złe hasło / soft-delete / brak `verifiedAt` w prod / guest przy demo off) | **Nie** |
| `POST /auth/activate` (zły token) | Wspólny **401** | Bez enumeracji email |
| `POST /auth/accept-invite` (kolizja email) | Wspólny **401** + revoke Invitation | **Nie** |

## Sesje (JWT + cookie)

- Access: JWT w cookie **`cc_access`** (httpOnly; krótki TTL).
- Refresh: cookie **`cc_refresh`** (httpOnly; hash sesji w DB; rotacja przy refresh).
- Oba cookie: `Secure` + sensowny `SameSite` w `production`.
- SSE i HTTP: ta sama sesja cookie — **zakaz** tokenu w query string; **zakaz** `Authorization: Bearer` jako modelu MVP (FE, Postman = cookie jar).
- Body login/refresh **nie** zwraca tokenów (tylko `user` / `expiresIn` wg kontraktu API).
- Probe tożsamości UI: **`GET /api/v1/auth/me`** → `{ id, email, role }` albo **401** `UNAUTHORIZED` (flow: me → przy sesyjnym 401 refresh → me). **Każde** wywołanie produktowe FE do API: przy **401** `UNAUTHORIZED` ten sam refresh + jednorazowy retry, potem karta logowania (`SPEC-FRONTEND.md`). **401** `INVALID_PASSWORD` (re-auth) **nie** wchodzi w ten cykl — błąd pod polem, sesja zostaje.
- Wylogowanie unieważnia refresh w DB i czyści **oba** cookie.
- **BFF (`apps/frontend`):** przeglądarka mówi wyłącznie z originem Next (ścieżki `/api/v1/...`). Next proxy’uje do `apps/api` (env serwerowe, nie `NEXT_PUBLIC_*`). Cookie sesji są na originie FE — `SameSite=strict` w `production` jest spójne z tym modelem. SSE musi iść przez to samo proxy **bez buforowania** całego strumienia.

Zmiana względem wcześniejszego zapisu „access w odpowiedzi JSON + tylko refresh w cookie”: access także wyłącznie w httpOnly cookie.

## Sekrety i powierzchnie

| Element | Norma |
|---------|--------|
| `.env` | tylko lokalnie / w runtime; w repo wyłącznie `.env.example` |
| `X-Gateway-Key`, klucze vendorów, `JWT_*`, **hasło SMTP** (`SMTP_PASS`) | nigdy w obrazie FE, nigdy `NEXT_PUBLIC_*`; w stdout dumpie hopu (tylko `development`) wartość klucza → `[REDACTED]` (`observability.md`) |
| Raw token zaproszenia / aktywacji | **nie** w logach `production`; **nie** w JSON-ie odpowiedzi admina / publicznych sukcesów. W `development` wolno zalogować URL (odpowiednik treści maila / DX) |
| `apps/ai-provider-gateway` w `production` | **nie** publikować na internet; tylko sieć wewnętrzna (compose) |
| `GET /metrics` (`apps/api`) | scrape z sieci ops / localhost; **nie** jako publiczny endpoint internetowy w `production` |
| `GET /api/v1/health` | może być dostępny do probe; bez wrażliwych danych |
| `GET /api/v1/health/ready` | publiczny jak liveness (probe FE / ops); body = skrót statusów checków (`api`, `gateway`); **bez** sekretów, `X-Gateway-Key`, wartości env, hostname’ów z kluczami |

## Checklist operatora (`production`)

1. Silne sekrety w env (JWT, gateway key, vendor keys, **`SMTP_PASS`**).  
2. Gateway i `/metrics` niewystawione publicznie.  
3. HTTPS przed FE/api (reverse proxy) — cookie Secure.  
4. Bootstrap → jeden admin → wyłączenie bootstrapu zweryfikowane.  
5. Próba utworzenia drugiego admina → odrzucona.  
6. W `production`: **SMTP** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) + **`MAIL_FROM`** + **`APP_PUBLIC_URL`** — fail-fast przy starcie; bez nich zaproszenia i maile aktywacji nie działają.  
7. Volume SQLite z ograniczonymi uprawnieniami hosta + backup.  
8. Brak sekretów w logach stdout / `run.log`. Pełna treść hopu chat **nie** trafia na stdout w `production`. Raw token zaproszenia / aktywacji **nie** w logach `production`.

## Do / Don’t

| Wolno | Nie wolno |
|-------|-----------|
| Jeden admin z bootstrapu; `user` przez zaproszenie **lub** self-register przy `DEMO_MODE=false`; `guest` z self-register **lub** accept-invite gdy demo on | Drugi `role = admin` w MVP; register/activate/resend → `admin`; **awans `guest` → `user`/`admin`**; **`role` w body** invite / accept / register; osobny endpoint register-as-guest; **blokowanie register przy `DEMO_MODE=false`** |
| GuestGuard + `@AllowGuest` (default deny dla guest) | Masowe `@Roles('admin','user')` „żeby zablokować guest”; zaufanie do ukrytych przycisków FE |
| Redis admit przy `POST /runs` guest + `MAX_CONCURRENT_RUNS` bez zmian | Drugi limit współbieżności „dla guest”; fail open Redis na start runu guest |
| Switch trybu wyłącznie env + restart | Switch demo w panelu admina |
| bcrypt + polityka haseł jak wyżej (bootstrap / accept-invite / register) | Przechowywanie haseł plaintext / odwracalne; **hasło w mailu**; admin zna hasło `user` |
| Cookie httpOnly dla **access i refresh** (`cc_access`, `cc_refresh`) wyłącznie po login / bootstrap | Set-Cookie na register / activate / resend; access/refresh w `localStorage` / Bearer jako model MVP |
| Token invite / activation: w DB tylko hash SHA-256; raw w mailu | Raw token w JSON-ie admina (także „dla Postmana”) |
| Pending = `isActive=true` + `verifiedAt=null` + `AccountActivation` | Pending przez samo `isActive=false`; wymaganie aktywacji poza `production`; register bramkowany `DEMO_MODE` |
| **409** na register przy zajętym emailu (świadomy UX) | Maskowany **201** przy kolizji na register („sukces” bez konta / bez maila) |
| Stały sukces resend; wspólny **401** na loginie (pending / soft-delete / złe hasło / guest przy demo off) | `ACCOUNT_NOT_ACTIVATED` / różnicowanie stanu konta na loginie lub resendzie |
| Wewnętrzny gateway + ograniczony metrics | Publiczny gateway z kluczami vendorów |
| Dump hopu chat na stdout wyłącznie przy `NODE_ENV=development`, z redakcją `GATEWAY_KEY`; w `development` wolno logować URL akceptacji / aktywacji | Pełne prompty / `output.text` hopu w logach procesu w `production`; raw token w logach `production` |

## Poza zakresem MVP

- OAuth / SSO / 2FA  
- Self-service: zmiana hasła zalogowanego, usuwanie własnego konta (wyjątek: pierwsze hasło na accept-invite / hasło na register — onboarding). **Zmiana własnego emaila z re-auth hasłem jest w MVP** (`PATCH /auth/me/email` + `currentPassword` + `INVALID_PASSWORD`) — **nie** dla `guest`. Wzorzec osobnej mutacji + re-auth = fundament pod przyszłą zmianę hasła (po SMTP; poza MVP). **Confirm e-mail** przy zmianie adresu = **V1** (poza MVP; **nie** mylić z aktywacją po register)  
- Rotacja wielu adminów / recovery „lost admin” (osobna procedura później)  
- WAF / full pentest report  
- Szyfrowanie pliku SQLite at-rest (opcjonalnie później)  
- Zarządzanie / czyszczenie kont `guest` (osobny plan)  
- Awans `guest` → `user` / `admin` (**zakaz permanentny**, nie „poza V1”)

Szczegóły endpointów: `dokumentacja_komunikacji.md`. Deploy: `deployment.md`.
