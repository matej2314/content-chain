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
| Start runów SM / HITL / odczyt logów / lista runów instancji | tak | tak |
| Lista + tworzenie użytkowników (`user`) | tak (z ograniczeniem adminów — niżej) | nie |
| Soft-delete użytkownika (API; UI MVP bez tego) | tak | nie |
| Bootstrap pierwszego admina | jednorazowy (API + ekran first-run) | — |

**403** przy naruszeniu (`FORBIDDEN`). Egzekucja zawsze w `apps/api`, nie tylko w UI.

## Bootstrap i konta admin

1. **`GET /api/v1/auth/bootstrap-status`** (publiczny) — `{ available }` pod ekran first-run w dashboardzie.
2. **`POST /api/v1/auth/bootstrap-admin`** działa **wyłącznie**, gdy w DB **nie ma** żadnego użytkownika z `role = admin`. Po sukcesie ustawia sesję cookie (jak login).
3. Po utworzeniu pierwszego admina endpoint bootstrap jest **trwale niedostępny** (np. **409** `CONFLICT` / **403**); `bootstrap-status.available === false`.
4. **Twarda blokada:** tworzenie / awans kolejnych użytkowników z `role = admin` jest **zabronione** w MVP (API odrzuca). W systemie jest **co najwyżej jeden** admin — ten z bootstrapu.
5. Pozostali użytkownicy tylko z `role = user` (tworzeni przez jedynego admina).
6. **Self-service konta w MVP poza zakresem:** zmiana hasła, zmiana email, usuwanie własnego konta przez użytkownika — później. MVP: login / logout / bootstrap / admin tworzy `user`.
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

Niespełnienie → **400** `VALIDATION_FAILED` z czytelnym komunikatem (bez ujawniania hashów).

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
| `X-Gateway-Key`, klucze vendorów, `JWT_*` | nigdy w obrazie FE, nigdy `NEXT_PUBLIC_*` |
| `apps/ai-provider-gateway` w `production` | **nie** publikować na internet; tylko sieć wewnętrzna (compose) |
| `GET /metrics` (`apps/api`) | scrape z sieci ops / localhost; **nie** jako publiczny endpoint internetowy w `production` |
| `GET /api/v1/health` | może być dostępny do probe; bez wrażliwych danych |

## Checklist operatora (`production`)

1. Silne sekrety w env (JWT, gateway key, vendor keys).  
2. Gateway i `/metrics` niewystawione publicznie.  
3. HTTPS przed FE/api (reverse proxy) — cookie Secure.  
4. Bootstrap → jeden admin → wyłączenie bootstrapu zweryfikowane.  
5. Próba utworzenia drugiego admina → odrzucona.  
6. Volume SQLite z ograniczonymi uprawnieniami hosta + backup.  
7. Brak sekretów w logach stdout / `run.log`.

## Do / Don’t

| Wolno | Nie wolno |
|-------|-----------|
| Jeden admin z bootstrapu; wielu `user` | Drugi `role = admin` w MVP |
| bcrypt + polityka haseł jak wyżej | Przechowywanie haseł plaintext / odwracalne |
| Cookie httpOnly dla **access i refresh** (`cc_access`, `cc_refresh`) | Access/refresh w `localStorage`, memory FE jako store ani Bearer jako model MVP |
| Wewnętrzny gateway + ograniczony metrics | Publiczny gateway z kluczami vendorów |

## Poza zakresem MVP

- OAuth / SSO / 2FA  
- Self-service: zmiana hasła, zmiana email, usuwanie własnego konta  
- Rotacja wielu adminów / recovery „lost admin” (osobna procedura później)  
- WAF / full pentest report  
- Szyfrowanie pliku SQLite at-rest (opcjonalnie później)

Szczegóły endpointów: `dokumentacja_komunikacji.md`. Deploy: `deployment.md`.
