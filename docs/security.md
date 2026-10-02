---
wersja: 3
data_utworzenia: 2026-09-29
data_modyfikacji: 2026-10-01
---

# Bezpieczeństwo — Content Chain

Norma self-host dla `local` i `production`: auth, sekrety, ekspozycja powierzchni, bootstrap. Bez pełnego modelu STRIDE.

Powiązane: `dokumentacja_komunikacji.md`, `deployment.md`, `anty_patterny.md`, `architektura.md`.

## Założenia

- Jedna instancja = jedna firma; zagrożenia to głównie błędna konfiguracja i wyciek sekretów, nie multi-tenant izolacja.
- Publiczne repo MIT — docs muszą być jednoznaczne dla operatora.
- LLM i klucze vendorów wyłącznie za `apps/ai-provider-gateway`.

## Role i uprawnienia

| Akcja | `admin` | `user` |
|-------|---------|--------|
| Edycja kontekstu firmy | tak | nie |
| Start runów produktowych (Social i Content) / HITL / odczyt logów / lista runów instancji | tak | tak |
| Ocena gwiazdkowa / zapis edycji wyniku (`POST .../output-edited`) / finalize przeglądu **własnego** runu | tak | tak |
| To samo na runie obcego `startedBy` | nie | nie |
| `GET /runs/user/:userId` tylko gdy `:userId` = sesja | tak (własne) | tak (własne) |
| `POST /feedback` (opinia tekstowa) | tak | tak |
| Panel odczytu / analityka opinii | V1 — rozbudowa | V1 — rozbudowa |
| Lista użytkowników (`GET /users`) | tak | nie |
| Zaproszenia: create / lista pending / resend / revoke | tak | nie |
| Soft-delete użytkownika (`DELETE /users/:id`; API; UI MVP bez tego) | tak | nie |
| Reaktywacja (`PATCH /users/:id`, `{ isActive: true }`; API; UI MVP bez tego) | tak | nie |
| Bootstrap pierwszego admina | jednorazowy (API + tryb strony głównej / karta logowania) | — |

**403** przy naruszeniu (`FORBIDDEN`). Egzekucja zawsze w `apps/api`, nie tylko w UI.

## Bootstrap i konta admin

1. **`GET /api/v1/auth/bootstrap-status`** (publiczny) — `{ available }` pod stronę główną (czy submit karty logowania to bootstrap, czy `POST /auth/login`).
2. **`POST /api/v1/auth/bootstrap-admin`** działa **wyłącznie**, gdy w DB **nie ma** żadnego użytkownika z `role = admin`. Po sukcesie ustawia sesję cookie (jak login).
3. Po utworzeniu pierwszego admina endpoint bootstrap jest **trwale niedostępny** (np. **409** `CONFLICT` / **403**); `bootstrap-status.available === false`.
4. **Twarda blokada:** tworzenie / awans kolejnych użytkowników z `role = admin` jest **zabronione** w MVP (API odrzuca). W systemie jest **co najwyżej jeden** admin — ten z bootstrapu.
5. Pozostali `user` **zapraszani** przez jedynego admina (tylko email). Konto powstaje wyłącznie przy akceptacji zaproszenia — **nie** przez `POST /users` z hasłem. Zmiana względem: „pozostali użytkownicy tylko z `role = user` (tworzeni przez jedynego admina)”.
6. **Self-service konta w MVP:** zalogowany może zmienić **własny email** (`PATCH /api/v1/auth/me/email`, widok Konto) wyłącznie po podaniu **aktualnego hasła** w body (`currentPassword`). To **re-auth** przy mutacji wrażliwej — **nie** jest self-service zmianą hasła. **`GET /auth/me` = wyłącznie probe** (bez mutacji na `PATCH /auth/me`). **Poza MVP:** zmiana hasła zalogowanego (planowany wzorzec: osobna trasa np. `PATCH /auth/me/password` + re-auth + `INVALID_PASSWORD`, po SMTP), usuwanie własnego konta, confirm e-mail przy zmianie adresu (V1). **Wyjątek:** jednorazowe **pierwsze** hasło przy `POST /auth/accept-invite` to onboarding, nie self-service hasła. MVP: login / logout / bootstrap / zaproszenia + accept-invite + zmiana własnego emaila z re-auth.

Zmiana względem: mutacja na `PATCH /auth/me` + złe hasło jako `UNAUTHORIZED`. Powód: rozdział probe vs mutacja; uniknięcie konfliktu z cyklem sesji FE.
Zmiana względem: self-service email bez re-auth (sam cookie). Powód: skradziona sesja nie może trwale przejąć identyfikatora konta bez znajomości hasła.
Zmiana względem: „self-service email poza zakresem MVP”.
7. **`DELETE /api/v1/users/:id`** = soft-delete (dezaktywacja); konto nieaktywne nie loguje się. **Reaktywacja** = **`PATCH /api/v1/users/:id`** z body `{ "isActive": true }` (API; UI nadal poza MVP). `PATCH` **nie** przyjmuje `role` (zakaz awansu do `admin`) ani `isActive: false` (dezaktywacja wyłącznie przez DELETE). Reaktywacja **nie** odtwarza sesji refresh — potem zwykły login.

Zmiana względem wcześniejszego punktu 7 (tylko DELETE / soft-delete): kanał przywrócenia konta w API jest **PATCH**, nie ręczna edycja SQLite.

## Hasła (bcrypt)

- Algorytm: **bcrypt** (hash tylko po stronie `apps/api`; nigdy plaintext w logach).
- Polityka przy ustawianiu / zmianie hasła (walidacja przed hashowaniem):

| Reguła | Wymaganie |
|--------|-----------|
| Długość | minimum **12** znaków |
| Cyfra | minimum **1** |
| Wielka litera | minimum **1** |
| Znak specjalny | minimum **1** (bezpieczny zestaw ASCII, np. `!@#$%^&*()_+-=[]{}|;:,.<>?`) |

Niespełnienie → **400** `VALIDATION_FAILED` z czytelnym komunikatem (bez ujawniania hashów). Ta sama polityka obowiązuje przy **pierwszym** haśle na `accept-invite`.

Przy `PATCH /api/v1/auth/me/email` pole `currentPassword` jest weryfikowane **tak samo jak przy logowaniu** — wyłącznie porównaniem bcrypt z hashem sesji, **bez** polityki haseł (polityka obowiązuje wyłącznie przy ustawianiu **nowego** hasła — bootstrap / accept-invite). Złe hasło → **401** `INVALID_PASSWORD`, `message`: `Invalid password` (osobny od sesyjnego `UNAUTHORIZED` i od loginu `Invalid credentials`). Plaintext `currentPassword` nigdy w logach ani odpowiedziach.

Porównanie i unique `email` (**User** i **Invitation**) są **case-sensitive**, jak `findForAuth` / `User.email` dziś. Świadomie **bez** `trim` / `toLowerCase`. `Ada@x` i `ada@x` to dwa różne adresy.

Na **publicznym** `POST /auth/accept-invite` kolizja `User.email` (P2002; aktywny albo soft-deleted) → **401** `UNAUTHORIZED` z **identycznym** `code` + `message` co przy złym / zużytym / `revoked` / wygasłym tokenie (np. `Invalid invitation token`). **Zakaz** odrębnego statusu lub kodu zdradzającego istnienie `User` (w tym „email zajęty”). Przy kolizji zaproszenie należy **unieważnić** (`revoked` lub równoważne zużycie tokenu **bez** utworzenia `User`), żeby ten sam raw token nie został „żywy” `pending`. Kolizja to edge (race, soft-deleted zajmujący email) — naprawa po stronie operatora (Users / nowe zaproszenie), nie przez **409** dla gościa z linkiem. Admin nadal widzi użytkowników i soft-delete; **409** przy `POST /invitations` (istniejący User / drugi pending) oraz przy `PATCH /auth/me/email` **zostaje** — inny threat model (sesja admina / zalogowany).

Zmiana względem: kolizja na accept-invite → **409** `CONFLICT` jako świadoma enumeracja „email zajęty” / „nie maskować jako 401”. Powód: publiczny endpoint nie może być probe istnienia konta.

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
| Raw token zaproszenia | **nie** w logach `production`; **nie** w JSON-ie odpowiedzi admina. W `development` wolno zalogować URL akceptacji (odpowiednik treści maila / DX pod Postman) |
| `apps/ai-provider-gateway` w `production` | **nie** publikować na internet; tylko sieć wewnętrzna (compose) |
| `GET /metrics` (`apps/api`) | scrape z sieci ops / localhost; **nie** jako publiczny endpoint internetowy w `production` |
| `GET /api/v1/health` | może być dostępny do probe; bez wrażliwych danych |

## Checklist operatora (`production`)

1. Silne sekrety w env (JWT, gateway key, vendor keys, **`SMTP_PASS`**).  
2. Gateway i `/metrics` niewystawione publicznie.  
3. HTTPS przed FE/api (reverse proxy) — cookie Secure.  
4. Bootstrap → jeden admin → wyłączenie bootstrapu zweryfikowane.  
5. Próba utworzenia drugiego admina → odrzucona.  
6. W `production`: **SMTP** (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`) + **`MAIL_FROM`** + **`APP_PUBLIC_URL`** — fail-fast przy starcie; bez nich zaproszenia nie działają.  
7. Volume SQLite z ograniczonymi uprawnieniami hosta + backup.  
8. Brak sekretów w logach stdout / `run.log`. Pełna treść hopu chat **nie** trafia na stdout w `production`. Raw token zaproszenia **nie** w logach `production`.

## Do / Don’t

| Wolno | Nie wolno |
|-------|-----------|
| Jeden admin z bootstrapu; wielu `user` przez zaproszenie | Drugi `role = admin` w MVP; otwarty signup |
| bcrypt + polityka haseł jak wyżej | Przechowywanie haseł plaintext / odwracalne; **hasło w mailu**; admin zna hasło `user` |
| Cookie httpOnly dla **access i refresh** (`cc_access`, `cc_refresh`) | Access/refresh w `localStorage`, memory FE jako store ani Bearer jako model MVP |
| Token zaproszenia: w DB tylko hash SHA-256; raw w mailu | Raw token w JSON-ie admina (także „dla Postmana”) |
| Wewnętrzny gateway + ograniczony metrics | Publiczny gateway z kluczami vendorów |
| Dump hopu chat na stdout wyłącznie przy `NODE_ENV=development`, z redakcją `GATEWAY_KEY`; w `development` wolno logować URL akceptacji | Pełne prompty / `output.text` hopu w logach procesu w `production`; raw token zaproszenia w logach `production` |

## Poza zakresem MVP

- OAuth / SSO / 2FA  
- Self-service: zmiana hasła zalogowanego, usuwanie własnego konta (wyjątek: pierwsze hasło na accept-invite — onboarding). **Zmiana własnego emaila z re-auth hasłem jest w MVP** (`PATCH /auth/me/email` + `currentPassword` + `INVALID_PASSWORD`). Wzorzec osobnej mutacji + re-auth = fundament pod przyszłą zmianę hasła (po SMTP; poza MVP). **Confirm e-mail** przy zmianie adresu = **V1** (poza MVP)  
- Rotacja wielu adminów / recovery „lost admin” (osobna procedura później)  
- WAF / full pentest report  
- Szyfrowanie pliku SQLite at-rest (opcjonalnie później)

Szczegóły endpointów: `dokumentacja_komunikacji.md`. Deploy: `deployment.md`.
