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
| Ocena gwiazdkowa / flaga edycji / finalize przeglądu **własnego** runu | tak | tak |
| To samo na runie obcego `startedBy` | nie | nie |
| `GET /runs/user/:userId` tylko gdy `:userId` = sesja | tak (własne) | tak (własne) |
| `POST /feedback` (opinia tekstowa) | tak | tak |
| Panel odczytu / analityka opinii | V1 — rozbudowa | V1 — rozbudowa |
| Lista użytkowników (`GET /users`) | tak | nie |
| Zaproszenia: create / lista pending / resend / revoke | tak | nie |
| Soft-delete użytkownika (API; UI MVP bez tego) | tak | nie |
| Bootstrap pierwszego admina | jednorazowy (API + ekran first-run) | — |

**403** przy naruszeniu (`FORBIDDEN`). Egzekucja zawsze w `apps/api`, nie tylko w UI.

## Bootstrap i konta admin

1. **`GET /api/v1/auth/bootstrap-status`** (publiczny) — `{ available }` pod ekran first-run w dashboardzie.
2. **`POST /api/v1/auth/bootstrap-admin`** działa **wyłącznie**, gdy w DB **nie ma** żadnego użytkownika z `role = admin`. Po sukcesie ustawia sesję cookie (jak login).
3. Po utworzeniu pierwszego admina endpoint bootstrap jest **trwale niedostępny** (np. **409** `CONFLICT` / **403**); `bootstrap-status.available === false`.
4. **Twarda blokada:** tworzenie / awans kolejnych użytkowników z `role = admin` jest **zabronione** w MVP (API odrzuca). W systemie jest **co najwyżej jeden** admin — ten z bootstrapu.
5. Pozostali `user` **zapraszani** przez jedynego admina (tylko email). Konto powstaje wyłącznie przy akceptacji zaproszenia — **nie** przez `POST /users` z hasłem. Zmiana względem: „pozostali użytkownicy tylko z `role = user` (tworzeni przez jedynego admina)”.
6. **Self-service konta w MVP poza zakresem:** zmiana hasła zalogowanego, zmiana email, usuwanie własnego konta — później. **Wyjątek:** jednorazowe **pierwsze** hasło przy `POST /auth/accept-invite` to onboarding, nie self-service konta. MVP: login / logout / bootstrap / zaproszenia + accept-invite.
7. **`DELETE /api/v1/users/:id`** = soft-delete (dezaktywacja); konto nieaktywne nie loguje się.

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

Porównanie i unique `email` (**User** i **Invitation**) są **case-sensitive**, jak `findForAuth` / `User.email` dziś. Świadomie **bez** `trim` / `toLowerCase`. `Ada@x` i `ada@x` to dwa różne adresy.

Na publicznym `accept-invite` kolizja `User.email` (P2002) → **409** `CONFLICT` jest **świadoma** (enumeracja „email zajęty”) — **nie** maskować jako `401`.

## Sesje (JWT + cookie)

- Access: JWT w cookie **`cc_access`** (httpOnly; krótki TTL).
- Refresh: cookie **`cc_refresh`** (httpOnly; hash sesji w DB; rotacja przy refresh).
- Oba cookie: `Secure` + sensowny `SameSite` w `production`.
- SSE i HTTP: ta sama sesja cookie — **zakaz** tokenu w query string; **zakaz** `Authorization: Bearer` jako modelu MVP (FE, Postman = cookie jar).
- Body login/refresh **nie** zwraca tokenów (tylko `user` / `expiresIn` wg kontraktu API).
- Probe tożsamości UI: **`GET /api/v1/auth/me`** → `{ id, email, role }` albo **401** (flow: me → przy 401 refresh → me).
- Wylogowanie unieważnia refresh w DB i czyści **oba** cookie.

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
- Self-service: zmiana hasła zalogowanego, zmiana email, usuwanie własnego konta (wyjątek: pierwsze hasło na accept-invite — onboarding)  
- Rotacja wielu adminów / recovery „lost admin” (osobna procedura później)  
- WAF / full pentest report  
- Szyfrowanie pliku SQLite at-rest (opcjonalnie później)

Szczegóły endpointów: `dokumentacja_komunikacji.md`. Deploy: `deployment.md`.
