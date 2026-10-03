# Content Chain — major plan (frontend)

**Zakres tego pliku:** cienki klient produktowy `apps/frontend` — **BFF** (same-origin `/api/v1` → `apps/api`), strona główna (karta logowania / first-run jako ten sam formularz), publiczny deep link **`/invite/accept?token=`**, dashboard po sesji (sidebar + header + obszar roboczy) aż do kompletnego UX MVP: Kontekst firmy, **Konto** (start inline + Moje runy + live), **Runy** (archiwum `completed` \| `failed` **oraz** CTA/modal **„Uruchom agenta”**), szczegóły Run (live własnego runu, HITL, wynik, przegląd), Użytkownicy (admin), zapis opinii, floating box, toast zdarzeń po sesji. Numeracja faz **1–6 plus Faza 2.1 (między 2 a 3), Faza 3.5 (między 3 a 4), Faza 3.6 (między 3.5 a 4), Faza 7 (po MILESTONE 6), Faza 8 (po Fazie 7 — gate anulowania), Faza 9 (po Fazie 8 — gate re-auth email na Koncie), Faza 10 (po Fazie 9 — gate auto-close przeglądu / `reviewExpiresAt`), Faza 11 (po Fazie 10 — gate anti-enumeration accept-invite), Faza 12 (po Fazie 11 — gate rejestracji / aktywacji e-mail), Faza 13 (po Fazie 12 — gate bramki „Agenci aktywni” z liveness gateway) oraz Faza 14 (po Fazie 13 — gate DEMO MODE / rola `guest`)** jest własna tego majoru (nie kontynuuje `content-chain-backend_major_plan.md`). **Uwaga o kolizji nazw:** istniejący **Krok 3.5** (Lista Runy / archiwum, `WYKONANY`) **nie** jest Fazą 3.5 — nie mylić tych kotwic. **Faza 3.6** (toast / feedback zdarzeń) **nie** jest Krokiem 3.5 ani Fazą 3.5. **Faza 7** **nie** jest Fazą 3 / Krokiem 3.1 / Krokiem 3.5 — to dopisek drugiej powierzchni startu po testach UI. **Faza 8** **nie** jest Fazą 7 / 3 / 3.6 — to gate normy UX `cancelled` pod feature-plan. **Faza 9** **nie** jest Fazą 5 / 5.3.1 — to gate normy UX re-auth pod feature-plan. **Faza 10 (ten major)** **nie** jest Fazą 5 / Krokiem 5.1 i **nie** jest **`content-chain-backend_major_plan.md` Fazą 10** (Edytuj / email / filtr `GET /runs`) — to gate UX auto-close przeglądu; kontrakt api = backend **Faza 14**. **Faza 11 (ten major)** **nie** jest **`content-chain-backend_major_plan.md` Fazą 11** (twardy zapis kontekstu) — to gate UX błędów accept-invite bez enumeracji; kontrakt api = backend **Faza 15**. **Faza 12 (ten major)** **nie** jest **`content-chain-backend_major_plan.md` Fazą 12** (anulowanie runu) — to gate UX rejestracji + aktywacji e-mail; kontrakt api = backend **Faza 16**. **Faza 13 (ten major)** **nie** jest **`content-chain-backend_major_plan.md` Fazą 13** (re-auth email) — to gate UX `agentsActive` (completeness ∧ gatewayAlive); kontrakt api = backend **Faza 17**. **Faza 14 (ten major)** **nie** jest **`content-chain-backend_major_plan.md` Fazą 14** (auto-close przeglądu) — to gate UX DEMO chip / locki `guest` / modal limitu; kontrakt api = backend **Faza 18**. Numer **14** (nie 13) — Faza 13 zajęta bramką „Agenci aktywni” (`demo-mode-guest-role-plan.md` proponował historycznie 13).

**Poza tym plikiem:** trzy zmiany kontraktu api — **`content-chain-backend_major_plan.md`, Faza 10** (Krok 10.1 zapis treści przy Edytuj; Krok 10.2 własny email; Krok 10.3 filtr wielowartościowy `GET /runs`); **twardy zapis kontekstu firmy — `content-chain-backend_major_plan.md`, Faza 11** (PUT/PATCH wyłącznie przy kompletnej bramce; ten major nie implementuje api). Rozszerzenie kontraktu email (re-auth, `PATCH /auth/me/email`, `INVALID_PASSWORD`) = **`content-chain-backend_major_plan.md` Faza 13**; ten major **nie** implementuje api. Backend Faza 10 / 10.2 pozostaje historią pierwszego self-service email bez re-auth. Kontrakt auto-close przeglądu (`pipelineFinishedAt`, `REVIEW_TTL`, sweeper, `reviewExpiresAt`, mutacja = 409 bez CAS) = **`content-chain-backend_major_plan.md` Faza 14**; ten major **nie** implementuje api. Kontrakt anti-enumeration na `accept-invite` (kolizja email → **401** jak zły token, bez **409**) = **`content-chain-backend_major_plan.md` Faza 15**; ten major **nie** implementuje api. Kontrakt otwartej rejestracji + aktywacji e-mail (`POST /auth/register`, `activate`, `resend-activation`, `verifiedAt`, `AccountActivation`) = **`content-chain-backend_major_plan.md` Faza 16**; ten major **nie** implementuje api (gate UX = **Faza 12**). Kontrakt readiness api + probe liveness gateway (`GET /api/v1/health/ready`, `checks.gateway` z upstream liveness) = **`content-chain-backend_major_plan.md` Faza 17**; ten major **nie** implementuje api (gate UX = **Faza 13**). Kontrakt DEMO MODE + rola `guest` (publiczny `GET /config` V1 wyłącznie `{ demoMode }`, `GuestGuard` / limity slot+cap+rating, **401** guest gdy demo off) = **`content-chain-backend_major_plan.md` Faza 18**; ten major **nie** implementuje api (gate UX = **Faza 14**). **Faza 3.6** (toast) **nie** dodaje fazy api, **nie** zmienia HTTP/SSE/Prisma i **nie** jest backend Fazą 11. Dalej poza tym plikiem: panel administracyjny odczytu opinii; zmiana hasła zalogowanego / usuwanie własnego konta; confirm e-mail przy zmianie adresu (V1); soft-delete użytkowników w UI; `selectedIdeaIds` na starcie w UI; `conversationId` w UI; limit per-user runów w toku; next-intl / mapa tłumaczeń envelope; Playwright / automatyczne testy FE; Docker/`production` jako temat tego planu; PostgreSQL / V1 — rozbudowa. Aplikacja frontu **już istnieje** jako boilerplate (backend Faza 1 / Krok 1.3) — ten major nie tworzy jej od zera. **Historycznie** „otwarta rejestracja poza zakresem” — unieważnione przez **Fazę 12** (gate); Faza 1 / 1.1–1.2 pozostają historią (`WYKONANY`).

**Źródła:** `docs/` (w tym `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `docs/brand_types.md`, `docs/security.md`, `docs/deployment.md`), `spec/SPEC-*.md` (w tym `SPEC-FRONTEND.md`, `SPEC-AUTH.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-RUNY.md`, `SPEC-FEEDBACK.md`, `SPEC-BEZPIECZENSTWO.md`), `auto-close-review-plan.md` (Faza 10 — auto-close przeglądu w UI), `register_email_activation-plan.md` (Faza 12 — rejestracja + aktywacja e-mail w UI), `ready-state-fix-plan.md` (Faza 13 — bramka „Agenci aktywni” z liveness gateway), `demo-mode-guest-role-plan.md` (Faza 14 — DEMO MODE / rola `guest` w UI).  
**Kolejność priorytetów:** **Faza 1** (`WYKONANY`) / Milestone 1 (`OSIĄGNIĘTY`); **Faza 2** (`WYKONANY`) / Milestone 2 (`OSIĄGNIĘTY`); **Faza 2.1** (`WYKONANY`) / Milestone 2.1 (`OSIĄGNIĘTY`); **Faza 3** (`WYKONANY`) / Milestone 3 (`OSIĄGNIĘTY`); **Faza 3.5** (`WYKONANY`) / Milestone 3.5 (`OSIĄGNIĘTY`); **Faza 3.6** (`WYKONANY`) / Milestone 3.6 (`OSIĄGNIĘTY`); **Faza 4** (`WYKONANY`) / Milestone 4 (`OSIĄGNIĘTY`); **Faza 5** (`WYKONANY`) / Milestone 5 (`OSIĄGNIĘTY`); **Faza 6** (`WYKONANY`) / Milestone 6 (`OSIĄGNIĘTY`); **Faza 7** (`WYKONANY`) — **bez** milestone'u po niej; **Faza 8** (`WYKONANY`) — **bez** MILESTONE 8; **Faza 9** (`WYKONANY`) — modal re-auth hasłem przy zmianie emaila na Koncie (refaktor względem Fazy 5 / Kroku 5.3.1): DoD gate + HOW z feature-planu; **bez** MILESTONE 9 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 13. **Faza 10** (`WYKONANY`) — auto-close przeglądu w UI (`reviewExpiresAt`): DoD gate + HOW z feature-planu; **bez** MILESTONE 10 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 14. **Faza 11** (`WYKONANY`) — UX błędów accept-invite bez enumeracji (refaktor względem Fazy 1 / Kroku 1.3): DoD gate + HOW z feature-planu; **bez** MILESTONE 11 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 15. **Faza 12** (`WYKONANY`) — rejestracja i aktywacja konta w UI (refaktor względem Fazy 1 / Kroku 1.1–1.2): DoD gate + HOW z feature-planu; **bez** MILESTONE 12 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 16. **Faza 13** (`WYKONANY`) — bramka „Agenci aktywni” z liveness gateway (refaktor względem Fazy 2 / Kroku 2.2 oraz Fazy 3 / start-gate completeness): DoD gate + HOW z feature-planu; **bez** MILESTONE 13 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 17. **Faza 14** (`NIE_ROZPOCZĘTY`) — DEMO MODE + rola `guest` (chip, locki, modal limitu; signup zostaje Fazą 12): DoD gate + HOW z feature-planu; **bez** MILESTONE 14 i **bez** kroków implementacji kodu w tym majorze. Zależność api: `content-chain-backend_major_plan.md` Faza 18 (oraz Faza 16 jako baza register). Faza 5 / 5.1 / 5.3.1 / MILESTONE 5 pozostają historią (`WYKONANY` / `OSIĄGNIĘTY`). Faza 1 / 1.1–1.3 / MILESTONE 1 pozostają historią przy Fazie 11 i Fazie 12 (`WYKONANY` / `OSIĄGNIĘTY`). Faza 2 / 2.2 / MILESTONE 2 oraz Faza 3 / 3.1 / Faza 7 (start-gate) pozostają historią przy Fazie 13 (`WYKONANY` / `OSIĄGNIĘTY`). Faza 1 / chrome, Faza 2 / CompletenessChipSlot, Faza 3 / archiwum Runy oraz Faza 12 (signup) pozostają historią przy Fazie 14 (`WYKONANY` / `OSIĄGNIĘTY`). Milestone 6 zamknął kanon Fazy 1–6. Faza 2.1 **nie** blokuje Fazy 3. **Faza 3.5 blokuje Fazę 4**. **Faza 3.6 blokuje Fazę 4** — start Fazy 4 dopiero po Milestone 3.5 **oraz** Milestone 3.6 (inaczej niż 2.1 vs 3). Faza 3.6 **nie** blokuje Fazy 3.5 (i odwrotnie). Archiwum Runy (**Krok 3.5**, nie Faza 3.5) korzysta z backend **10.3** (`WYKONANY` w majorze api); twardy PUT kontekstu zakłada backend **Faza 11**; Edytuj z treścią i własny email (Faza 5) korzystają z backend **10.1** i **10.2** (`WYKONANY` w majorze api). Pierwszy UX email (Faza 5 / 5.3.1) korzystał z backend **10.2** (`WYKONANY`, historia). **Re-auth** / trasa `PATCH /auth/me/email` / `INVALID_PASSWORD` = backend **Faza 13** (gate); HOW FE bierze kanon z `docs/` + `spec/`, nie z treści Podkroku 5.3.1. Start, Moje runy, SSE, BFF i toast **nie** czekają na backend Fazę 10 / 11. **Faza 7** nie dodaje fazy api. **Faza 8** — anulowanie runu w UI (`cancelled`): DoD gate + HOW z feature-planu; **bez** MILESTONE 8 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-8-cancel-ui.md`). **Faza 9** — re-auth email na Koncie: DoD gate + HOW z feature-planu; **bez** MILESTONE 9 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-9-reauth-email.md`). **Faza 10** — auto-close przeglądu (`reviewExpiresAt`): DoD gate + HOW z feature-planu; **bez** MILESTONE 10 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-10-auto-close-review.md`); HOW bierze kanon z `docs/` + `spec/`, nie z treści Kroku 5.1. **Faza 11** — anti-enumeration accept-invite: DoD gate + HOW z feature-planu; **bez** MILESTONE 11 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-11-anti-enumeration-accept-invite.md`); HOW bierze kanon z `docs/` + `spec/`, nie z treści Kroku 1.3. **Faza 12** — rejestracja / thank-you+resend / activate→login+toast: DoD gate + HOW z feature-planu; **bez** MILESTONE 12 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-12-register-email-activation.md`); HOW bierze kanon z `docs/` + `spec/`, nie z treści Kroku 1.1–1.2 (nieaktywne „Zarejestruj się!” jest historyczne). **Faza 13** — chip + disable CTA = `agentsActive` (completeness ∧ gatewayAlive z api `/health/ready`): DoD gate + HOW z feature-planu; **bez** MILESTONE 13 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-13-agents-active-gateway.md`); HOW bierze kanon z `docs/` + `spec/` (`ready-state-fix-plan.md`), nie z treści Kroku 2.2 / 3.1 / 7.2 (chip / start-gate tylko z completeness jest historyczne). **Faza 14** — DEMO chip / locki `guest` / modal limitu: DoD gate + HOW z feature-planu; **bez** MILESTONE 14 i **bez** kroków implementacji kodu w tym majorze (HOW = `content-chain_feature_plan_faza-14-demo-mode-guest.md`); HOW bierze kanon z `docs/` + `spec/` (`demo-mode-guest-role-plan.md`), nie z treści Kroku 1.1–1.4 / 2.2 / 3.5 / Fazy 12 (brak chipa demo / locków guest / bramkowania signup przez `demoMode` jest historyczne albo należy do Fazy 12 bez zmian flow).

**Język wizualny (skill, nie osobna faza):** powierzchnie UI w `apps/frontend` (karty, chrome, widoki, stany loading/empty/error, prezentacja statusu live, Toaster) wymagają skilla **`content-chain-product-ui`** (`.cursor/skills/content-chain-product-ui/`). IA, copy, trasy i stack nadal biorą `docs/` + `spec/` — skill nie nadpisuje kanonu. **Visual lock** jest jednorazowy w Fazie 1 (Krok 1.4 + karty wejścia 1.1–1.3); Fazy 2, **2.1**, 3, **3.5**, **3.6**, 4–6 **oraz Faza 7** **dziedziczą** tokeny, bez nowej palety na widok. Powierzchnie Fazy 12 (formularz register, thank-you, widok logowania po deep linku) **dziedziczą** ten sam lock. Powierzchnie Fazy 13 (chip „Agenci aktywni”, tooltips / disable CTA startu) **dziedziczą** ten sam lock — **bez** nowej palety. Powierzchnie Fazy 14 (`DemoChip`, `GuestLimitModal`, locki formularzy/nawigacji) **dziedziczą** ten sam lock — **bez** nowej palety. Toaster (Faza 3.6) = warstwa `--z-toast` (token już w locku), nie nowa paleta ani `richColors` Sonnera z pudełka — toast aktywacji używa tej samej warstwy. Skill **nie** dotyczy: BFF / `apiFetch` / cookie / rejestru `EventSource` (Krok 1.6 i równoważne w późniejszych krokach), typów kontraktu (Krok 1.5), ani `content-chain-backend_major_plan.md` Faza 10 / Faza 11 / Faza 16 / Faza 17 / Faza 18.

**Feature plany:** przy `/create-feature-implementation-plan` na wycinku z powierzchnią UI dołącz ten skill (`@content-chain-product-ui`). HOW i kod w feature planie mają już spełniać lock / dziedziczenie — nie odkładaj smaku na implementację. Kotwicę wskazuj jawnie na **ten** major (nie na backend / backend Fazę 10). **Faza 10 (ten major)** = gate auto-close — kotwica feature-planu FE to ta faza, nie backend Faza 10 ani backend Faza 14. **Faza 11 (ten major)** = gate anti-enumeration accept-invite — kotwica feature-planu FE to ta faza, nie backend Faza 11 ani backend Faza 15. **Faza 12 (ten major)** = gate rejestracji / aktywacji e-mail — kotwica feature-planu FE to ta faza, nie backend Faza 12 ani backend Faza 16. **Faza 13 (ten major)** = gate bramki „Agenci aktywni” z liveness gateway — kotwica feature-planu FE to ta faza, nie backend Faza 13 ani backend Faza 17. **Faza 14 (ten major)** = gate DEMO MODE / `guest` — kotwica feature-planu FE to ta faza, nie backend Faza 14 ani backend Faza 18.

**Statusy (fazy / kroki):** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`  
**Milestone:** domyślnie **bez statusu**; po spełnieniu DoD → wyłącznie `OSIĄGNIĘTY`

---

## Faza 1 — Wejście, BFF i szkielet po sesji

**Status:** `WYKONANY`

**Opis:** Produktowy start cienkiego klienta na istniejącym szkielecie: BFF (przeglądarka wyłącznie origin FE), probe sesji i wrapper **401 → refresh → jeden retry** na każdym produktowym fetchu, strona główna jako karta logowania (first-run = tryb tego samego formularza), publiczny deep link **`/invite/accept?token=`** (gotowość pod Fazę 6; ten sam kształt co mail), layout zalogowany ze slotami późniejszych widoków, header tożsamości, rejestr `EventSource` (pusty) i slot floating boxa. Typy semantyczne kontraktu z `docs/brand_types.md` na granicach UI. Zgodnie z `docs/ux_dashboard.md`, `docs/deployment.md`, `SPEC-FRONTEND.md` F-1/F-2/F-4a, `SPEC-AUTH.md`, `SPEC-BEZPIECZENSTWO.md` B-5a, `docs/brand_types.md`. Powierzchnie karty logowania, accept-invite i chrome: **`content-chain-product-ui`** (visual lock w Kroku 1.4). Krok 1.5 i 1.6 bez tego skilla.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-1-milestone-1.md` (KROK 1 `WYKONANY` → major 1.5; KROK 2 `WYKONANY` → major 1.6 transport; KROK 3 `WYKONANY` → major 1.4.4; KROK 4 `WYKONANY` → major 1.1; KROK 5 `WYKONANY` → major 1.2; KROK 6 `WYKONANY` → major 1.3; KROK 7 `WYKONANY` → major 1.4.1–1.4.3 + rejestr EventSource z 1.6). Envelope `{ code, message }` + branded `UserId` / `UserRole`, BFF catch-all `/api/v1` + `apiFetch` (401 → refresh → jeden retry, strumień SSE bez bufora), visual lock, karta logowania z trybem first-run, publiczny `/invite/accept?token=`, chrome po sesji (sidebar, header z wylogowaniem, sloty). **MILESTONE 1** → `OSIĄGNIĘTY`. Faza 2 pozostaje `NIE_ROZPOCZĘTY`.
Zmiana względem: status Fazy 1, kroków 1.1–1.6 (w tym 1.4.4) (`NIE_ROZPOCZĘTY`) oraz MILESTONE 1 (bez statusu). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-1-milestone-1.md`.

**DoD (faza):**

- Przeglądarka nie woła originu `apps/api`; `API_BASE_URL` tylko na serwerze Next; brak `NEXT_PUBLIC_API_BASE_URL` jako URL-a produktu.
- Brak ważnej sesji nigdy nie pokazuje dashboardu (sidebar / header / obszar roboczy).
- Strona główna to karta logowania z nieaktywnym wezwaniem do rejestracji; first-run nie jest osobną stroną.
- Po sesji widać layout dashboardu: sidebar (sloty nawigacji) oraz header (tożsamość).
- Wylogowanie jest dostępne od pierwszego layoutu po sesji (hierarchia headera, modal).
- Publiczny ekran akceptacji zaproszenia jest pod **`/invite/accept?token=`** i kończy się na karcie logowania, bez wejścia do dashboardu z samej akceptacji.
- Identyfikatory i enumy kontraktu na granicach UI pochodzą ze wspólnego pakietu typów (`docs/brand_types.md`), nie z doraźnych stringów.
- Język chrome / etykiet: polski; envelope błędów: `code` + `message` **jak z API**; sekrety LLM nie trafiają do klienta.
- SSE da się później strumieniować przez BFF (bez pełnego bufora odpowiedzi) — szkielet proxy na to gotowy.
- Tokeny i chrome (karta + layout po sesji) są po visual locku `content-chain-product-ui` — Fazy 2–6 nie dostają drugiej palety ani stock-fioletu shadcn.

### Krok 1.1 — Sesja i strona główna

**Status:** `WYKONANY`

**Opis:** Po starcie / przeładowaniu klient odczytuje tożsamość same-origin. Brak sesji → karta logowania. Udane logowanie → dashboard. Cookie httpOnly na **originie FE** (BFF przekazuje `Set-Cookie`). Wygląd karty (nie probe / cookie): **`content-chain-product-ui`**.

**DoD (krok):**

- Probe tożsamości: `GET /auth/me` → (401) `POST /auth/refresh` → ponownie `GET /auth/me` → kolejny 401 → karta logowania (`docs/ux_dashboard.md` / `SPEC-AUTH.md` / `SPEC-FRONTEND.md` F-4a).
- Submit karty przy braku first-run loguje i otwiera dashboard.
- Tokeny sesji nie są trzymane w magazynie przeglądarki dostępnym skryptom.

### Krok 1.2 — First-run jako tryb tej samej karty

**Status:** `WYKONANY`

**Opis:** Pusta instancja nie dostaje osobnego ekranu bootstrapu. Ten sam formularz strony głównej tworzy pierwszego administratora i sesję jak po loginie. Powierzchnia karty: ten sam lock co 1.1 (`content-chain-product-ui`); bez osobnej estetyki first-run.

**DoD (krok):**

- Gdy bootstrap jest dostępny, submit karty tworzy pierwszego admina i wchodzi do dashboardu.
- Przycisk rejestracji pozostaje nieaktywny także w trybie first-run.
- Ponowny bootstrap po utworzeniu admina nie jest ścieżką UI.

### Krok 1.3 — Publiczny deep link akceptacji zaproszenia

**Status:** `WYKONANY`

**Opis:** Ekran spoza dashboardu na **`/invite/accept?token=`** (legalizacja URL z mailera api — bez zmiany ścieżki w mailu). Token z odnośnika → pierwsze hasło → powrót na stronę główną. Gotowość pod Fazę 6; bez budowania listy użytkowników w tej fazie. Formularz hasła: **`content-chain-product-ui`** (ten sam język co karta logowania).

**DoD (krok):**

- Deep link z tokenem pokazuje formularz pierwszego hasła (polityka haseł z docs bezpieczeństwa).
- Sukces akceptacji **nie** otwiera dashboardu; użytkownik loguje się na stronie głównej.
- Zużyty / nieważny token daje czytelny błąd envelope (`code` + `message`), bez wycieku szczegółów implementacji.
- Inna ścieżka FE (np. `/accept-invite`) **nie** jest kanonem — mail i UI muszą się zgadzać.

### Krok 1.4 — Layout zalogowany: sidebar, header, sloty

**Status:** `WYKONANY`

**Opis:** Chrome dashboardu od razu z miejscami na późniejsze fazy — żeby Fazy 2–6 nie przebudowywały szkieletu. Sidebar = widoki. Header = tożsamość, wyrównanie do prawej. Tu zapada **visual lock** (`content-chain-product-ui`): tokeny w `globals.css` / shadcn, Geist, stany kontrolek; Fazy 2–6 tylko wypełniają sloty w tym języku.

**DoD (krok):**

- Sidebar ma pozycje (nawet jako puste miejsca / „wkrótce”, byle spójne z kanonem): Kontekst firmy, Runy, Konto; Użytkownicy tylko przy roli admin.
- Header jest na wszystkich widokach po sesji; elementy **wewnątrz headera wyrównane do prawej**.
- Login sesji (adres e-mail) jest **przyciskiem**; z niego **„Wyloguj się”** (nie pozycja sidebara, nie luźny przycisk obok loginu).
- Klik „Wyloguj się” → modal; Tak → koniec sesji i karta logowania; Nie / zamknięcie zostawia dashboard.
- W layoutcie są miejsca na: chip kompletności, **floating box** (Faza 3 — na Koncie ukryty), globalne CTA opinii (treść tych elementów w późniejszych fazach). **Nie** slot chipa / stosu „run w toku” w chrome.

#### Podkrok 1.4.1 — Sidebar: sloty widoków

Kontekst, Runy, Konto dla każdej roli zalogowanej; Użytkownicy wyłącznie admin — zgodnie z tabelą nawigacji w `docs/ux_dashboard.md`.

#### Podkrok 1.4.2 — Header: login → wylogowanie

Hierarchia tożsamości i modal; zawartość headera do prawej.

#### Podkrok 1.4.3 — Sloty wskaźników, floating box i CTA opinii

Miejsca w chrome na chip kompletności (Faza 2), pusty kontener floating boxa (Faza 3) oraz globalny zapis opinii (Faza 5) — bez pełnej treści tych funkcji w Fazie 1.

#### Podkrok 1.4.4 — Visual lock (`content-chain-product-ui`)

**Status:** `WYKONANY`

Jednorazowe spięcie motywu (akcent, szarości, radius, `--font-sans` → Geist, stany Button/input/modal) zanim Faza 2 wypełni Kontekst. Feature plan tego chrome **dołącza** skill; HOW nie zostawia stock-fioletu shadcn „na później”. Zakaz hero/bento/GSAP i zmiany IA.

### Krok 1.5 — Kontrakt typów i język UI

**Status:** `WYKONANY`

**Opis:** Granice klienta używają typów semantycznych i enumów z dokumentacji brand types. Chrome po polsku; envelope API **bez** mapy tłumaczeń (next-intl = V1). Ten krok = kontrakt typów i copy envelope — **bez** `content-chain-product-ui` (smak chrome jest w 1.4).

**DoD (krok):**

- Identyfikatory runu, użytkownika, opinii itd. nie są mylone jako zwykły tekst na granicach UI (`docs/brand_types.md`).
- Envelope błędów api jest pokazywany jako **`code` i `message` jak zwrócone** (angielskie `message` w MVP — `SPEC-FRONTEND.md` F-7).
- Brak sekretów modelu / bramy LLM w kliencie.

### Krok 1.6 — BFF, `apiFetch` i rejestr SSE

**Status:** `WYKONANY`

**Opis:** Next pośredniczy same-origin `/api/v1/...` do `apps/api` (`API_BASE_URL` server-only). Jeden helper klienta: przy **401** → `POST /auth/refresh` → **jednorazowy** retry; kolejny 401 → karta logowania (nie tylko probe startowy). RSC **wolno** czytać chronione dane (cookie na originie FE). Rejestr layoutu: max jedno `EventSource` na `runId` (podłączenie w Fazie 3). Proxy **strumieniuje** SSE — zakaz pełnego bufora body. **Bez** `content-chain-product-ui` (transport, nie wygląd).

**DoD (krok):**

- Login / refresh / logout / me idą przez BFF; `Set-Cookie` z api ląduje na originie FE.
- Produktowy fetch poza helperem 401 **nie** istnieje (albo jest ten sam cykl).
- Szkielet proxy SSE: `text/event-stream` bez zebrania całego strumienia przed flush.
- Rejestr połączeń istnieje w layoutcie (na razie pusty) — Konto, szczegóły i floating box (Faza 3) nie otworzą drugiego socketa na ten sam `runId`.

---

## MILESTONE 1 — Wejście, BFF i chrome dashboardu

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 1. Duży skok: self-host ma kartę logowania (w tym first-run), akceptację zaproszenia na ścieżce z maila, BFF z cyklem 401 oraz szkielet zalogowany (sidebar + header z wylogowaniem). Wolno budować pierwszy widok roboczy (kontekst firmy).

**DoD (milestone):**

- Faza 1 spełnia swoje DoD (lub ma status `WYKONANY`).
- Niezalogowany nie widzi dashboardu.
- Header: login jako przycisk → „Wyloguj się” + modal; zawartość do prawej.
- Sloty nawigacji i wskaźników nie wymuszają reworku layoutu w Fazach 2–6; brak chipa „w toku” jako kanonu.
- Visual lock Fazy 1 (`content-chain-product-ui`, Krok 1.4) jest na miejscu; wolno wypełniać widoki bez nowej palety.
- Typy semantyczne kontraktu są używane na granicach UI.
- Przeglądarka nie zna URL-a api.
- Akceptacja przejścia do Fazy 2.

---

## Faza 2 — Kontekst firmy i bramka agentów

**Status:** `WYKONANY`

**Opis:** Widok Kontekst firmy: sekcje bramki i opcjonalne extras. Chip „agenci aktywni / nieaktywni” w chrome. Start runów nadal nie jest tematem tej fazy, ale sygnał kompletności musi być gotowy, bo Faza 3 go czyta. Zgodnie z `docs/ux_dashboard.md`, docs kontekstu firmy, `SPEC-FRONTEND.md`. Widok i chip: **`content-chain-product-ui`** (dziedziczenie locku Fazy 1, bez nowej palety).

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-2-kontekst-bramka.md` (KROK 1 `WYKONANY` → typy / `GET|PUT` / `CompletenessProvider` pod major 2.2 i później 3.1; KROK 2 `WYKONANY` → major 2.1; KROK 3 `WYKONANY` → major 2.2). Zapis = jeden `PUT` (bramka + extras); chip czyta provider, nie własny fetch; `useCompleteness` publiczny pod CTA startu (Faza 3). **MILESTONE 2** → `OSIĄGNIĘTY`. Faza 3 pozostaje `NIE_ROZPOCZĘTY`.
Zmiana względem: status Fazy 2, kroków 2.1–2.2 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 2 (bez statusu). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-2-kontekst-bramka.md`.

**DoD (faza):**

- Admin uzupełnia i zapisuje kontekst (bramka + extras).
- Użytkownik z rolą `user` widzi kontekst tylko do odczytu.
- Chip kompletności jest widoczny na widokach po sesji i oddaje stan bramki.
- UI nie udaje jedynej bramki startu — api nadal odrzuca start przy niekompletności (egzekucja w późniejszej fazie startu).

### Krok 2.1 — Widok Kontekst firmy

**Status:** `WYKONANY`

**Opis:** Formularze sekcji bramki i extras; status kompletności per sekcja bramki.

**DoD (krok):**

- Sekcje bramki i extras są zgodne z `docs/ux_dashboard.md`.
- Zapis tylko dla admina; `user` dostaje czytelny komunikat read-only.
- Extras nie blokują sygnału „agenci aktywni”.

### Krok 2.2 — Chip kompletności w chrome

**Status:** `WYKONANY`

**Opis:** Wypełnienie slotu z Fazy 1: stały sygnał, czy można uruchamiać runy produktowe.

**DoD (krok):**

- Stan „agenci aktywni” vs „nieaktywni” jest zrozumiały; przy niekompletności widać brakujące sekcje i drogę do Kontekstu.
- Chip nie myli kompletności kontekstu z runami w toku (ten sygnał = floating box / Moje runy w Fazie 3).

---

## MILESTONE 2 — Kontekst i bramka widoczne

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 2. Duży skok: operator widzi i (jako admin) wypełnia kontekst; chrome mówi, czy agenci są aktywni. Wolno budować start i live na Koncie.

**DoD (milestone):**

- Faza 2 spełnia swoje DoD (lub `WYKONANY`).
- Kontekst jest edytowalny przez admina i czytelny dla `user`.
- Chip kompletności działa na layoutcie z Fazy 1.
- Akceptacja przejścia do Fazy 3.

---

## Faza 2.1 — Zakładki widoku Kontekst firmy

**Status:** `WYKONANY`

**Opis:** Refaktor prezentacji widoku Kontekst firmy: sekcje w **zakładkach** zamiast jednego ciągu. Zgodnie z `docs/ux_dashboard.md` (Widok: Kontekst firmy), `SPEC-FRONTEND.md` F-8. Powierzchnia: **`content-chain-product-ui`** (dziedziczenie locku Fazy 1, bez nowej palety). Chip w chrome, `CompletenessProvider`, trasa `/context`, authz i kontrakt `GET`/`PUT` / `completeness` **bez zmian**.

Refaktor względem: Faza 2 / Krok 2.1 (`WYKONANY`). Cel: ten sam formularz i ten sam jeden `PUT`; inna IA (zakładki + kropki na triggerach bramki).

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-2-1-zakladki-kontekstu.md` (KROK 1–3 `WYKONANY` → major 2.1.1: typy/`missing` + `GateCompletenessDot` → kit `Tabs` → refaktor formularza na sześć zakładek). Ten sam jeden `PUT`; kropki tylko na bramce ze `missing`; Dodatki bez kropki; chip/BFF/Faza 3 poza zakresem. **MILESTONE 2.1** → `OSIĄGNIĘTY`. Faza 2 / Krok 2.1 i MILESTONE 2 bez zmian (historia). Faza 3 pozostaje `NIE_ROZPOCZĘTY`.
Zmiana względem: status Fazy 2.1 i Kroku 2.1.1 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 2.1 (bez statusu). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-2-1-zakladki-kontekstu.md`.

**DoD (faza):**

- Sześć zakładek: Tożsamość (domyślnie otwarta), Oferta, Głos SM, CTA / kanały, Odbiorca, Dodatki.
- Bez zagnieżdżeń i bez podzakładek; extras w jednej zakładce Dodatki.
- Kropki tylko na zakładkach bramki; źródło = `missing` z ostatniego GET/PUT (nie draft, nie lokalne `isComplete`).
- Dodatki bez kropki bramki.
- Zapis nadal jeden `PUT` całości; CTA zapisu na każdej zakładce; `user` read-only.
- Chip „Agenci aktywni” i egzekucja bramki w api bez zmian.

### Krok 2.1.1 — Zakładki i indykatory kompletności

**Status:** `WYKONANY`

**Opis:** Podział istniejącego formularza kontekstu na zakładki; indykator na triggerze sekcji bramki.

**DoD (krok):**

- Wejście na `/context` otwiera Tożsamość.
- Trigger bramki pokazuje zieloną kropkę, gdy sekcji nie ma w `missing`, czerwoną gdy jest; kolor nie jest jedynym sygnałem.
- Zakładka Dodatki nie ma kropki bramki.
- Przełączenie zakładki nie zapisuje; zapis = pełny `PUT` (także pól z nieaktywnych zakładek).

---

## MILESTONE 2.1 — Zakładki kontekstu

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 2.1. Operator nawiguje kontekst zakładkami; kompletność sekcji bramki widać na triggerze. Faza 3 (Konto) nie zależy od tej bramki.

**DoD (milestone):**

- Faza 2.1 spełnia swoje DoD (lub `WYKONANY`).
- Kanon `docs/ux_dashboard.md` (zakładki) jest obserwowalny na `/context`.
- Faza 2 / Krok 2.1 i MILESTONE 2 pozostają historią (`WYKONANY` / `OSIĄGNIĘTY`) — bez przepisywania.

---

## Faza 3 — Konto: start i live, szczegóły live, archiwum Runy

**Status:** `WYKONANY`

**Opis:** Widok **Konto** = **jedyny** formularz startu + **Moje runy** (wszystkie statusy autora, live). Po `POST /runs` **zostajemy na Koncie**. Szczegóły Run: live status i logi dla **własnego** `running` \| `awaiting_hitl` \| `interrupted` (rejestr SSE z Fazy 1). **Floating box** własnych runów w toku na widokach **innych niż Konto** (zwijany; status + link; nie HITL/wynik). Widok **Runy** = archiwum instancji `completed` \| `failed` (wejście + co **15 min**; bez startu, bez SSE). Na szczegółach **slot** HITL/wyniku (Faza 4) i przeglądu (Faza 5); zakaz `conversationId`. Prefill startu ze **snapshotu** `GET /runs/:runId`. `queued` = wyłącznie GET. Zgodnie z `docs/ux_dashboard.md`, `SPEC-RUNY.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-FRONTEND.md` F-5/F-5a/F-8. Powierzchnie (formularz, listy, box, prezentacja statusu — w tym `interrupted` ≠ `running`): **`content-chain-product-ui`**. Rejestr `EventSource` / BFF SSE: bez tego skilla.

**Zależność api (tylko archiwum):** `content-chain-backend_major_plan.md`, Faza 10 / Krok **10.3** (`WYKONANY`) — `GET /runs?status=completed,failed`. Kroki 3.1–3.4 **nie** czekają na Fazę 10.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-3-konto-live-archiwum.md` (KROK 1 `WYKONANY` → typy / parsery / `runs.api` pod major 3.1–3.5; KROK 2 `WYKONANY` → refcount SSE, `RunStatusView`, `OwnRunsProvider`; KROK 3 `WYKONANY` → major 3.1; KROK 4 + 4.1 `WYKONANY` → major 3.3; KROK 5 `WYKONANY` → major 3.2; KROK 6 `WYKONANY` → major 3.4; KROK 7 `WYKONANY` → major 3.5). Start na Koncie + Moje runy + prefill ze snapshotu; szczegóły live z identycznością `snapshot.runId === runId`; floating box poza Kontem; archiwum `GET /runs?status=completed,failed`. **MILESTONE 3** → `OSIĄGNIĘTY`. Faza 4 pozostaje `NIE_ROZPOCZĘTY`.
Zmiana względem: status Fazy 3, kroków 3.1–3.5 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 3 (bez statusu); nota zależności 10.3 (`NIE_ROZPOCZĘTY` → `WYKONANY` w majorze api). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-3-konto-live-archiwum.md`.

**DoD (faza):**

- Start jest wyłącznie na Koncie; zablokowany wizualnie przy nieaktywnych agentach; api i tak jest bramką.
- Formularz startu rozróżnia brief post/reel vs page; bez pola wyboru id pomysłów; po 202 użytkownik **nie** jest zrzucany na szczegóły.
- Moje runy = autor, wszystkie statusy; lista Runy ≠ Moje runy i **nie** pokazuje runów w toku.
- Szczegóły własnego runu w toku żyją na żywo; skończony i `queued` nie zostawiają otwartego kanału live.
- `interrupted` jest czytelnie inny niż `running` (lista, szczegóły, box).
- Floating box: własne w toku poza Kontem; ukryty na Koncie; zwijany; bez cudzych runów.
- Archiwum: `status=completed,failed`, strona 10, odświeżanie przy wejściu i co 15 min (gdy 10.3 jest na miejscu).
- Ten sam widok szczegółów jest celem z Konta, archiwum i boxa — bez drugiego ekranu detali.

### Krok 3.1 — Konto: start runu

**Status:** `WYKONANY`

**Opis:** Jedyny formularz nowego runu w MVP. Ten sam kanon pól później służy prefillowi z wiersza (Krok 3.2).

**DoD (krok):**

- Wybór typu tasku obejmuje posty, rolki i strony; `contentKind` gdy `page_*`; platforma ukryta/disabled gdy `page_*`; pola briefu zależą od typu zgodnie z UX.
- Brak `selectedIdeaIds` w UI startu.
- CTA startu disabled + wyjaśnienie, gdy agenci nieaktywni.
- Po **202** zostajemy na Koncie (nowy wiersz na Moich runach); nie wymuszamy nawigacji na szczegóły.

### Krok 3.2 — Konto: Moje runy i prefill

**Status:** `WYKONANY`

**Opis:** Listing autora: `GET /runs/user/:userId` (`userId` z `/auth/me`), wszystkie statusy. Klik → szczegóły. Prefill z wiersza = **nowy** run; brief / `contentKind` z `GET /runs/:runId`, nie z wiersza listy user.

**DoD (krok):**

- Lista „Moje runy” nie jest listą instancji ani źródłem selectu opinii (opinia = Faza 5).
- `queued` i terminalne: snapshot GET (wejście na Konto, po `POST /runs`, po evencie SSE innego własnego runu, focus okna).
- Prefill nie wznawia starego `runId`.

### Krok 3.3 — Szczegóły Run: live, logi, rejestr SSE

**Status:** `WYKONANY`

**Opis:** Podstrona po `runId`: meta, status, logi. Slot na HITL/wynik (Faza 4) i na przegląd (Faza 5). EventSource tylko gdy run **własny** i `running` \| `awaiting_hitl` \| `interrupted` — przez rejestr layoutu (jedno połączenie na id). Archiwum terminalne: wyłącznie GET. Wygląd statusu/logów: **`content-chain-product-ui`**. Cykl `EventSource`: bez tego skilla.

**DoD (krok):**

- Status zmienia się natychmiast w trakcie live; prezentacja nie jest suchym labelkiem.
- Skończony run (`completed` / `failed`) oraz `queued` **nie** otwierają SSE; w trakcie — `close()` po evencie końcowym.
- `interrupted` ma inne copy i inną prezentację niż `running`.
- `conversationId` nie jest pokazywany.
- Na szczegółach jest miejsce na panel HITL / wynik / kontrolki przeglądu — bez pełnej treści Fazy 4 i 5.
- Wejście ze szczegółów cudzego runu (archiwum) nie subskrybuje SSE.

### Krok 3.4 — Floating box (własne runy w toku)

**Status:** `WYKONANY`

**Opis:** Wypełnienie slotu z Fazy 1. Pozycje z `GET /runs/user/:userId` w `running` \| `awaiting_hitl` \| `interrupted`. Live = ten sam rejestr SSE co Moje runy i szczegóły. **Nie** chip w chrome.

**DoD (krok):**

- Na widoku Konto box jest **ukryty**.
- Na innych widokach po sesji: pozycja per taki run (status + skrót meta + link do szczegółów); copy `interrupted` inne niż „Trwa run…”.
- Box można zwinąć i rozwinąć; HITL / wynik / przegląd **nie** żyją w boxie.
- `queued` bez pozycji i bez SSE.
- Po `completed` / `failed`: `close()` i zniknięcie z boxa.

### Krok 3.5 — Lista Runy (archiwum firmy)

**Status:** `WYKONANY`

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.3 (`WYKONANY`). Ten krok FE zakłada `status` jako jeden enum **albo** listę przecinkową; nie implementuje api.

**Opis:** Listing `GET /runs?status=completed,failed`: kolumny, filtry w zbiorze terminalnym, strona po 10, klik → szczegóły (snapshot, bez SSE).

**DoD (krok):**

- Lista i filtry zgodne z `docs/ux_dashboard.md` (typy tasku, platforma / web, inicjator; status tylko `completed` \| `failed` albo oba).
- Paginacja stała: 10, najnowsze pierwsze.
- Odświeżanie przy wejściu na widok i co **15 minut**, gdy widok jest otwarty — to **nie** jest kanał live.
- Brak formularza startu; brak runów w toku (także cudzych).
- Ta lista **nie** jest źródłem selectu opinii ani listy „Moje runy”.

---

## MILESTONE 3 — Start na Koncie, live i archiwum

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 3. Duży skok: operator startuje run z Konta, śledzi własne w toku (lista + box + szczegóły) i przegląda archiwum firmy. Wolno dokładać HITL i wynik.

**DoD (milestone):**

- Faza 3 spełnia swoje DoD (lub `WYKONANY`).
- Konto = start + Moje runy; Runy = archiwum terminalne; live = rejestr N× SSE, nie nowy hub.
- Szczegóły są jedynym miejscem detalu runu (Konto / box / archiwum tylko nawigują tutaj).
- Akceptacja przejścia do Fazy 4.

---

## Faza 3.5 — Twardy zapis kontekstu firmy

**Status:** `WYKONANY`

**To nie jest Krok 3.5** (Lista Runy / archiwum, `WYKONANY` w Fazie 3). Ta faza = twardy PUT bramki na `/context`; kroki poniżej to **3.5.1** / **3.5.2**.

**Refaktor względem:** Faza 2 / Krok 2.1 (`WYKONANY`) oraz Faza 2.1 (`WYKONANY`) — ten sam jeden PUT i te same zakładki/kropki; zmiana: nie wysyłamy i nie przyjmujemy niekompletnej bramki. Oferta: każda usługa kompletna (nazwa + opis + ≥ 1 korzyść).

**Zależność api:** `content-chain-backend_major_plan.md` Faza 11 (`WYKONANY`). Ten major nie implementuje api. W produkcie: najpierw api Faza 11, potem ta faza.

**Powierzchnia:** `content-chain-product-ui` (dziedziczenie locku Fazy 1, bez nowej palety). Chip / `CompletenessProvider` / źródło `missing` **bez zmiany kanonu F-8**.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-3.5-twardy-zapis-kontekstu-front.md` (KROK 1 `WYKONANY` → kopia C-1 + strip pustych placeholderów oferty w `companyContextForPut` pod major 3.5.1; KROK 2 `WYKONANY` → hint oferty, `aria-required`, błędy kalekiej usługi, disable ostatniego „Usuń usługę”; KROK 3 `WYKONANY` → major 3.5.2: brak PUT przy padającym predykacie, CTA Zapisz `disabled`, envelope 400 as-is, refetch chipa tylko po 200). **MILESTONE 3.5** → `OSIĄGNIĘTY`. Faza 2 / 2.1 / 3 i ich milestone’y bez zmian (historia). Faza 4 pozostaje `NIE_ROZPOCZĘTY`.
Zmiana względem: status Fazy 3.5, kroków 3.5.1–3.5.2 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 3.5 (bez statusu); nota zależności Fazy 11 (`NIE_ROZPOCZĘTY` → `WYKONANY` w majorze api). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-3.5-twardy-zapis-kontekstu-front.md`.

**DoD (faza):**

- Submit zablokowany, gdy draft nie spełnia bramki (lokalny predykat = C-1).
- Puste placeholdery oferty stripowane; kaleka usługa = błąd pola, nie PUT.
- Nie da się usunąć ostatniej kompletnej usługi tak, by PUT poszedł z `items: []`.
- 400 z api → envelope as-is; DB bez zmiany (gdyby ktoś ominął UI).
- `user` read-only bez zmian.
- Kropki i chip nadal z ostatniego udanego GET/PUT.

### Krok 3.5.1 — Predykat i formularz

**Status:** `WYKONANY`

Numer kroku **3.5.1**, nie 3.5 — unik kolizji z Krokiem 3.5 (archiwum Runy).

**Opis:** Lokalna kopia `isComplete` / `isCompleteOfferItem` w `modules/company-context` (kopia C-1, nie import z `apps/api`). `companyContextForPut` stripuje w pełni puste placeholdery; kalekich wierszy **nie** stripuje (zostają w drafcie, submit padnie). `required` na polach bramki; disable ostatniego „Usuń” gdy został jeden kompletny item.

**DoD (krok):**

- Predykat oferty: `items.length ≥ 1` ∧ każda pozycja z niepustym `name`, `description`, `benefit` (≥ 1 niepusty string, bez pustych wpisów).
- Placeholder pustej oferty nie jest usługą i nie wchodzi do body.
- `Usuń usługę` nie pozwala zejść do zera kompletnych pozycji w PUT.
- Kropki na triggerach nadal z `missing` odpowiedzi, nie z draftu.

### Krok 3.5.2 — Submit i envelope

**Status:** `WYKONANY`

**Opis:** Widok nie woła PUT, gdy predykat pada. CTA Zapisz `disabled` przy niekompletnej bramce (po strip placeholderów w pamięci podglądu). 400 pokazuje `code` + `message` as-is. `refetch` chipa tylko po 200.

**DoD (krok):**

- Admin nie utrwali pustej nazwy / kalekiej usługi przez UI.
- Envelope 400 bez mapy tłumaczeń; chip nie skacze z draftu.
- Happy path kompletny → jeden PUT całości (zakładki bez zmian z Fazy 2.1).

---

## MILESTONE 3.5 — Zapis kontekstu bez dziur w bramce

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka przed Fazą 4. Faza 2 / 2.1 / 3 i ich milestone’y zostają historią (`WYKONANY` / `OSIĄGNIĘTY`). Wolno startować HITL dopiero po tej bramce.

**DoD (milestone):**

- Faza 3.5 spełnia swoje DoD (lub ma status `WYKONANY`).
- PUT z UI nie przechodzi przy pustym wymaganym polu ani kalekiej ofercie; chip/kropki nadal z ostatniego udanego GET/PUT.
- Akceptacja przejścia do Fazy 4.

---

## Faza 3.6 — Feedback zdarzeń (toast)

**Status:** `WYKONANY`

**To nie jest Krok 3.5** (Lista Runy / archiwum, `WYKONANY`) **ani Faza 3.5** (twardy PUT kontekstu). Ta faza = efemeryczny sygnał „wydarzyło się” w layoutcie po sesji (Sonner).

**Refaktor względem:** Faza 1 / Krok 1.4.3 + Faza 3 / Krok 3.1 i 3.4 (`WYKONANY`) — sloty chrome, start na Koncie i live (Moje runy / floating box / SSE) są; brak kanału „wydarzyło się” (PUT 200, POST 202, terminal poza szczegółami = cisza). `close()` boxa po `completed`/`failed` **bez zmiany sensu** Kroku 3.4: toast **zastępuje ciszę**, nie pozycję boxa.

Źródło: `docs/ux_dashboard.md` (Feedback zdarzeń / trzy kanały), `SPEC-FRONTEND.md` F-7 / F-8 / F-5a.

**Zależność api:** brak. Payload SSE, kody HTTP i Prisma **bez zmian**. Ta faza **nie** jest `content-chain-backend_major_plan.md` Fazą 11 (kontekst) i **nie** czeka na Fazę 3.5 — toast po PUT 200 działa także przed twardą bramką. Faza 3.6 **nie** blokuje 3.5.

**Powierzchnia:** `content-chain-product-ui` (dziedziczenie locku Fazy 1, bez nowej palety). Toaster = warstwa `--z-toast` (token już w `globals.css`). Chip / kropki / floating box **bez zmiany kanonu**.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-3.6-feedback-zdarzen-toast.md` (KROK 1 `WYKONANY` → major 3.6.1: `sonner`, kit `Toaster` (lock, `--z-toast`, `top-right`), unia `ProductToast`, `notifyProduct` / `notifyRunTerminal`, `viewingRunId` z pathname, mount wyłącznie w authenticated `DashboardShell`; KROK 2 `WYKONANY` → major 3.6.2: PUT 200 „Kontekst zapisany”, POST 202 „Run wystartował”; gałęzie 400/409 / predykat 3.5 / GET bloku nietknięte; KROK 3 `WYKONANY` → major 3.6.3: `OwnRunsProvider` woła `notifyRunTerminal` przy terminalu, dedup `run-terminal:${runId}`, no-op na `/runs/:runId` tego runu, `close()` / `refresh` bez zmiany sensu 3.4). **MILESTONE 3.6** → `OSIĄGNIĘTY`. Faza 3 / MILESTONE 3 / Krok 3.1 i 3.4 oraz Faza 3.5 / MILESTONE 3.5 bez zmian (historia). Faza 4 pozostaje `NIE_ROZPOCZĘTY` do Milestone 3.5 **oraz** 3.6.
Zmiana względem: status Fazy 3.6, kroków 3.6.1–3.6.3 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 3.6 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-3.6-feedback-zdarzen-toast.md`.

**DoD (faza):**

- Toaster wyłącznie w gałęzi authenticated layoutu; `position` top-right; `z-index: var(--z-toast)`; nie gryzie się z floating boxem (box zostaje bottom-right).
- Brak Toastera na karcie logowania / first-run / accept-invite.
- Cienki wrapper `notifyProduct` / `notifyRunTerminal` — unia produktowa (`ProductToast`), Sonner jako adapter, bez `any`, bez Context/store toasta jako kopia GET.
- `PUT /company-context` **200** → toast PL „Kontekst zapisany”; **400** → wyłącznie envelope przy formularzu (zero toasta).
- `POST /runs` **202** → toast PL „Run wystartował” (zostajemy na Koncie — F-8); **409** / **400** startu → envelope, zero toasta.
- Terminal SSE `run.completed` / `run.failed`: jeden toast per `runId`, gdy pathname ≠ szczegóły **tego** runu; na `/runs/:runId` tego runu — zero toasta terminalu; `close()` / refresh GET jak Krok 3.4.
- Faza 4–6 reuse tego samego modułu (nie drugi Toaster / nie drugi kit).

### Krok 3.6.1 — Toaster i kontrakt

**Status:** `WYKONANY`

**Opis:** Pakiet `sonner` przez kit shadcn w `apps/frontend`. Wrapper typowany (`notifyProduct` / `notifyRunTerminal`; unia `ProductToast` — sukces z tytułem PL albo błąd z `EnvelopeRef`). Mount Toastera wyłącznie w gałęzi authenticated `DashboardShell`. Tokeny locku; zakaz tęczowych `richColors` Sonnera z pudełka. `packages/shared` nadal bez logiki UI / toastów.

**DoD (krok):**

- `<Toaster />` tylko po sesji; warstwa `--z-toast`; pozycja `top-right` (header niezasłonięty; box zostaje `bottom-right`).
- Wywołania produktowe idą przez wrapper; Sonner nie jest wołany ad hoc z widoków poza adapterem.
- Unia bez `any`; błąd w toaście (gdy kiedyś użyty) pokazuje `code` + `message` envelope, bez mapy PL.
- `viewingRunId` do terminalu pochodzi z `usePathname()` (`/runs/:id` → ten id, inaczej `null`) — nie z draftu.

### Krok 3.6.2 — Mutacje (kontekst, start)

**Status:** `WYKONANY`

**Opis:** Po udanym zapisie kontekstu i po 202 startu — toast sukcesu. Gałęzie błędu formularza (`EnvelopeError` / `ApiError`) **nietknięte** (F-7). Bez `toast.promise` na pending tych formularzy.

**DoD (krok):**

- Widok kontekstu: **200** → `notifyProduct({ kind: 'success', title: 'Kontekst zapisany' })`; **400** / walidacja lokalna (w tym predykat Fazy 3.5, gdy już jest) → envelope przy polu, zero toasta.
- Formularz startu: **202** → `notifyProduct({ kind: 'success', title: 'Run wystartował' })` i pozostanie na Koncie; **409** `CONTEXT_INCOMPLETE` / **400** → envelope na formularzu startu.
- GET listy / snapshot / completeness (błąd strony) nadal envelope w bloku — nie toast.

### Krok 3.6.3 — Terminal poza szczegółami

**Status:** `WYKONANY`

**Opis:** Istniejący live w `OwnRunsProvider` woła `notifyRunTerminal` przy evencie terminalnym. Dedup: id toasta `` `run-terminal:${runId}` `` (gdy szczegóły i Moje runy oba dostaną terminal). Akcja **Szczegóły** — nawigacja App Router na `/runs/:runId`, bez pełnego reloadu. `close()` i odświeżenie GET **bez zmiany sensu** Kroku 3.4. **Zakaz** otwierania SSE na runie terminalnym „żeby pokazać toast”.

**DoD (krok):**

- Toast „Run zakończony” / „Run nieudany” tylko gdy operator **nie** jest na `/runs/:runId` **tego** runu; no-op gdy `viewingRunId === runId`.
- Na szczegółach tego runu — status + logi; zero toasta terminalu; powód `failed` nadal z logów / snapshotu, nie z toasta.
- Jeden toast per `runId` (dedup).
- Box nadal znika po `completed`/`failed`; toast nie zatrzymuje pozycji w boxie.
- Pulse `running`, `run.log`, heartbeat — **bez** toasta.
- `awaiting_hitl` — **bez** toasta w MVP; HITL reuse `notifyProduct` w Fazie 4 na tym samym prymitywie.

---

## MILESTONE 3.6 — Operator wie, że się udało / skończyło

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka przed Fazą 4 (**obok** Milestone 3.5). Faza 3 / MILESTONE 3 oraz Krok 3.1 i 3.4 zostają historią (`WYKONANY` / `OSIĄGNIĘTY`). Wolno startować HITL dopiero po tej bramce **oraz** po Milestone 3.5.

**DoD (milestone):**

- Faza 3.6 spełnia swoje DoD (lub ma status `WYKONANY`).
- Toaster po sesji; mapa MVP (PUT 200, POST 202, terminal poza szczegółami) obserwowalna; envelope przy polu bez toasta; na szczegółach tego runu zero toasta terminalu.
- Akceptacja przejścia do Fazy 4 wymaga też Milestone 3.5.

---

## Faza 4 — HITL i wynik

**Status:** `WYKONANY`

**Opis:** Start po Milestone 3.5 (twardy zapis kontekstu) **oraz** Milestone 3.6 (feedback zdarzeń / toast). Na widoku szczegółów: pauza HITL (Social: wielokrotny wybór z listy; Content: akceptacja outline) oraz prezentacja wyniku po zakończeniu (listy vs skalar wg typu tasku). Zgodnie z `docs/ux_dashboard.md`, `SPEC-SOCIAL.md`, `SPEC-CONTENT.md`, `SPEC-FRONTEND.md`. Panel i wynik: **`content-chain-product-ui`** (dziedziczenie locku).

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-4-hitl-wynik.md` (KROK 1 `WYKONANY` → parser snapshotu `result` / `hitl` / pola przeglądu + `submitHitl` jako fundament major 4.1–4.2; KROK 2 `WYKONANY` → major 4.1; KROK 3 `WYKONANY` → major 4.2). Panel HITL na szczegółach (Social multi-select min. 1, Content `[outline.id]`); wynik wg `taskType` (lista vs skalar); slot przeglądu pusty (Faza 5). **MILESTONE 4** → `OSIĄGNIĘTY`. Fazy 5–6 i ich milestone’y bez zmian.
Zmiana względem: status Fazy 4, kroków 4.1–4.2 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 4 (bez statusu). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-4-hitl-wynik.md`.

**DoD (faza):**

- HITL Social wymaga co najmniej jednego unikalnego wyboru spośród opcji; Content pozostaje akceptacją outline.
- Wynik dwuetapowego Social to lista, nie jeden blok tekstu.
- Widać pola wynikowe wymagane w UX (m.in. długość treści tam, gdzie kanon to przewiduje; `cta` / `role` gdy są).
- HITL nie jest mylony z oceną ani z Edytuj (to Faza 5) i **nie** żyje we floating boxie.

### Krok 4.1 — Panel HITL

**Status:** `WYKONANY`

**Opis:** Wybór w trakcie pipeline na szczegółach runu.

**DoD (krok):**

- Panel pojawia się przy oczekiwaniu na HITL i znika / blokuje się poza tym stanem.
- Social: multi-select min. 1; Content: outline bez zmiany kanonu wyboru.
- Błędna selekcja jest czytelna (envelope z kontraktu).

### Krok 4.2 — Widok wyniku

**Status:** `WYKONANY`

**Opis:** Prezentacja artefaktów po `completed` (i tego, co zdążyło się zapisać przy `failed`).

**DoD (krok):**

- Post / rolka / strona rozróżnione zgodnie z `docs/ux_dashboard.md`.
- Dwuetapowy Social = listy z powiązaniem do pomysłu; jednoetapowy = skalar.
- Wynik jest na szczegółach runu — Konto i box nie dostaną drugiego panelu treści.

---

## MILESTONE 4 — HITL i wynik na szczegółach

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 4. Duży skok: da się przeprowadzić selekcję w pipeline i zobaczyć wynik. Wolno zamykać przegląd, zapisywać opinię i dołożyć email / opinię na Koncie.

**DoD (milestone):**

- Faza 4 spełnia swoje DoD (lub `WYKONANY`).
- HITL i wynik są na tym samym widoku szczegółów co live z Fazy 3.
- Akceptacja przejścia do Fazy 5.

---

## Faza 5 — Przegląd, opinia, email na Koncie

**Status:** `WYKONANY`

**Opis:** Na szczegółach: gwiazdki, Edytuj (zapis **treści** wyniku), finalize. Globalny formularz opinii (i ten sam kanon na Koncie). Na **Koncie** (start i Moje runy już z Fazy 3): formularz własnego emaila oraz blok opinii. Wylogowanie pozostaje w headerze z Fazy 1.

**Zależność api:** szczegóły implementacji w **`content-chain-backend_major_plan.md`, Faza 10** (`WYKONANY`) — Krok 10.1 (Edytuj / treść wyniku), Krok 10.2 (własny email). Ten major ich nie implementuje. Opinia i gwiazdki / finalize korzystają z istniejącego kontraktu Fazy 5–6 backendu.

**Charakter zmian w api (skrót; pełny opis = backend Faza 10):**

1. Zapis edycji wyniku przyjmuje treść wyniku i **zastępuje** kanoniczny artefakt oraz stawia flagę edycji — pipeline / verifier **nie** startują ponownie. Dotychczasowa semantyka „tylko flaga” nie obowiązuje.
2. Zmiana własnego adresu e-mail jest kontraktem sesji zalogowanego (zajęty adres = konflikt). Nie idzie przez aktualizację cudzego konta przez admina.

Zgodnie z `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md`, `SPEC-FEEDBACK.md`, `SPEC-AUTH.md`, `SPEC-FRONTEND.md`. Powierzchnie przeglądu, opinii i formularza email: **`content-chain-product-ui`**. Kontrakt 10.1 / 10.2: bez tego skilla.

**Nota (po feature planie):** `feature-plans/wykonane/content-chain_feature_plan_faza-5-przeglad-opinia-email.md` (KROK 1 `WYKONANY` → major 5.1; KROK 2 `WYKONANY` → major 5.2; KROK 3 `WYKONANY` → major 5.3). Gwiazdki + Edytuj `{ result }` + finalize na szczegółach (slot przeglądu); globalny Dialog opinii w headerze (select własnych `completed` \| `failed`); Konto: `PATCH /auth/me` + ten sam formularz opinii. **MILESTONE 5** → `OSIĄGNIĘTY`. Faza 4 bez zmian (`WYKONANY` / Milestone 4 `OSIĄGNIĘTY` wg pliku 1). Faza 6 bez zmian.
Zmiana względem: status Fazy 5, kroków 5.1–5.3 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 5 (bez statusu); nota zależności 10.1 / 10.2 (`NIE_ROZPOCZĘTY` → `WYKONANY` w majorze api). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-5-przeglad-opinia-email.md`.

**DoD (faza):**

- Autor może ocenić, edytować treść wyniku i zamknąć przegląd; po zamknięciu kontrolki są zablokowane.
- Po zapisie Edytuj UI pokazuje treść użytkownika jako wynik (gdy api realizuje charakter zmiany powyżej).
- Opinia tekstowa zapisuje się z layoutu i z Konta; select runów to wyłącznie własne zakończone / nieudane — **nie** lista instancji i **nie** Moje runy jako całość statusów.
- Konto nie duplikuje archiwum Runy; Moje runy (Faza 3) prowadzą do istniejącego widoku szczegółów.
- Zmiana własnego emaila działa (gdy api realizuje charakter zmiany powyżej); hasło i usuwanie konta nadal poza MVP.

### Krok 5.1 — Przegląd na szczegółach (ocena, Edytuj, finalize)

**Status:** `WYKONANY`

**Opis:** Wypełnienie slotu z Fazy 3. Edycja to treść kanonicznego wyniku, nie sama flaga i nie ponowne odpalenie agentów.

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.1 (`WYKONANY`). Ten krok FE zakłada ten kontrakt; nie implementuje api.

**DoD (krok):**

- Gwiazdki 1–5, dobrowolne (brak wyboru = brak oceny); tylko autor, tylko po zakończeniu pracy agenta, dopóki przegląd otwarty.
- Edytuj pozwala zmienić każdą treść wyniku obecnego snapshotu; zapis wielokrotny do finalize; bez diff / historii wersji.
- Zamknięcie przeglądu blokuje ocenę i Edytuj.
- UI nie woła ponownie pipeline’u przy zapisie edycji.

### Krok 5.2 — Globalny formularz opinii

**Status:** `WYKONANY`

**Opis:** CTA z layoutu (slot Fazy 1): aplikacja / agent / run; zapis bez ekranu listy opinii.

**DoD (krok):**

- Formularz zgodny z `docs/ux_dashboard.md` (w tym select agenta i filtr runów autora `completed` \| `failed`).
- Źródło selectu runów ≠ listing Runy instancji i ≠ pełna lista „Moje runy” (wszystkie statusy).
- Globalny CTA zostaje także po dodaniu opinii na Koncie.

### Krok 5.3 — Konto: email i opinia

**Status:** `WYKONANY`

**Opis:** Dopełnienie widoku Konto z Fazy 3 o profil email i zapis opinii. Nie zastępuje Runy, startu, Moich runów ani wylogowania. Własny email: implementacja api w `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.2.

**DoD (krok):**

- Formularz własnego emaila; zajęty adres = czytelny konflikt envelope; bez zmiany hasła i bez usuwania konta.
- Opinia tekstowa na Koncie = ten sam kanon co krok 5.2.
- Sidebar Konto ≠ header (login → wylogowanie).

#### Podkrok 5.3.1 — Email

Zmiana własnego adresu.

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.2 (`WYKONANY`). Ten podkrok FE zakłada ten kontrakt; nie implementuje api.

#### Podkrok 5.3.2 — Opinia na Koncie

Zapis jak globalny CTA; CTA layoutu pozostaje.

---

## MILESTONE 5 — Przegląd, opinia i email

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 5. Duży skok: autor zamyka przegląd wyniku, zapisuje opinię, a Konto ma profil email obok startu i własnych runów z Fazy 3. Wolno domknąć admina użytkowników.

**DoD (milestone):**

- Faza 5 spełnia swoje DoD (lub `WYKONANY`).
- Runy nadal = archiwum; Konto = start + własne runy + email + opinia.
- Wylogowanie nadal tylko w headerze (Faza 1).
- Akceptacja przejścia do Fazy 6.

---

## Faza 6 — Użytkownicy i domknięcie UX self-host

**Status:** `WYKONANY`

**Opis:** Widok Użytkownicy (tylko admin): lista kont, zaproszenie samym emailem, pending (w tym wygasłe), resend / revoke. Spójność z deep linkiem **`/invite/accept?token=`** z Fazy 1. Sidebar ukrywa Użytkowników przed `user`. Brak sekretów w kliencie. Zgodnie z `docs/ux_dashboard.md`, `SPEC-AUTH.md`, `SPEC-FRONTEND.md`, `docs/security.md`. Widok admina: **`content-chain-product-ui`** (ten sam lock; ekran accept zostaje z Fazy 1).

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-6-uzytkownicy.md` (KROK 1 `WYKONANY` → major 6.1; KROK 2 `WYKONANY` → major 6.2; KROK 3 `WYKONANY` → major 6.3). Lista kont + zaproszenie samym emailem; pending w tym wygasłe, resend/revoke; accept z Fazy 1 bez drugiego ekranu; chrome ról bez `NEXT_PUBLIC_*`. **MILESTONE 6** → `OSIĄGNIĘTY`. Fazy 1–5 oraz 2.1 / 3.5 / 3.6 bez zmian (historia).
Zmiana względem: status Fazy 6, kroków 6.1–6.3 (`NIE_ROZPOCZĘTY`) oraz MILESTONE 6 (bez statusu). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-6-uzytkownicy.md`.

**DoD (faza):**

- Admin zaprasza bez podawania hasła zaproszonego.
- Lista pending obejmuje wygasłe; resend i revoke działają zgodnie z UX.
- `user` nie widzi widoku Użytkownicy.
- Accept z Fazy 1 + zaproszenie z tej fazy tworzą spójną ścieżkę: mail `{APP_PUBLIC_URL}/invite/accept?token=…` → hasło → logowanie na stronie głównej → dashboard.
- Dashboard MVP jest kompletny względem `docs/ux_dashboard.md` (łącznie z Kontem, archiwum Runy, floating boxem i headerem).

### Krok 6.1 — Widok Użytkownicy (admin)

**Status:** `WYKONANY`

**Opis:** Lista kont + zaproszenia. Bez edycji / dezaktywacji / soft-delete w UI.

**DoD (krok):**

- Lista kont bez tokenów zaproszeń.
- Zaproszenie: tylko email.
- Pending w tym wygasłe; resend / revoke.
- Brak UI drugiego admina i braku UI soft-delete.

### Krok 6.2 — Spójność zaproszenia z wejściem

**Status:** `WYKONANY`

**Opis:** Ścieżka z maila korzysta z ekranu Fazy 1 (`/invite/accept`); po akceptacji nadal karta logowania.

**DoD (krok):**

- Zaproszony nie omija karty logowania.
- Komunikaty błędów tokenu / hasła są spójne z docs auth (envelope as-is).

### Krok 6.3 — Role w chrome i zamknięcie klienta

**Status:** `WYKONANY`

**Opis:** Ostateczna zgodność sidebara i headera z rolami; brak wycieku sekretów.

**DoD (krok):**

- `user` nie ma pozycji Użytkownicy; ma Kontekst (odczyt), Runy (archiwum), Konto, header z loginem, floating box poza Kontem.
- Admin ma to samo plus Użytkownicy i edycję kontekstu.
- Klient pozostaje bez sekretów LLM / bramy i bez URL-a api w `NEXT_PUBLIC_*`.

---

## MILESTONE 6 — Dashboard MVP frontendu

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka zamykająca ten plik (po Fazie 6). Duży skok: cienki klient self-host realizuje kanon `docs/ux_dashboard.md` — od karty logowania i BFF po Konto (start + live), archiwum Runy, szczegóły, opinię, floating box i zaproszenia — bez wchodzenia w zakres V1 ani w implementację api w tym majorze.

**DoD (milestone):**

- Faza 6 spełnia swoje DoD (lub `WYKONANY`).
- Fazy 1–6 oraz Faza 2.1 mają status `WYKONANY` albo równoważnie spełnione obowiązkowe DoD.
- Wejście, BFF, header (login → wylogowanie, zawartość do prawej), sidebar, Kontekst, Konto (start / Moje runy / email / opinia), Runy (archiwum), szczegóły (live / HITL / wynik / przegląd), floating box, Użytkownicy (admin) i zapis opinii są obserwowalne w produkcie.
- Język wizualny od Fazy 1 przez Fazę 6 jest jednym lockiem (`content-chain-product-ui`); brak drugiej palety i brak landingowych wzorców.
- Świadomie poza tym majorem pozostaje to, co zapisano na wstępie (m.in. panel odczytu opinii, hasło zalogowanego, testy FE, next-intl, limit per-user). Zmiany api pod ten major: `content-chain-backend_major_plan.md`, Faza 10 (10.1 / 10.2 / 10.3).
- Akceptacja zamknięcia majoru frontendowego.

---

## Faza 7 — Start agenta z archiwum Runy

**Status:** `WYKONANY`

**Refaktor względem:** Faza 3 / Krok 3.1 i Krok 3.5 (`WYKONANY`) oraz MILESTONE 3 (`OSIĄGNIĘTY`). Ten sam formularz briefu i ten sam `POST /runs`; zmiana: druga powierzchnia startu — CTA **„Uruchom agenta”** + modal na widoku **Runy**. Konto **zostaje** powierzchnią startu (inline). Prefill ze snapshotu **zostaje wyłącznie** na Koncie (Krok 3.2). Archiwum nadal bez SSE i bez wierszy w toku (sens Kroku 3.5 **bez zmiany** poza CTA). Faza 3 / MILESTONE 3 / Faza 6 / MILESTONE 6 **bez przepisywania**.

Źródło: `docs/ux_dashboard.md` (widok Runy / Konto; CTA kompletności; mapa toastu 202), `SPEC-FRONTEND.md` F-6 / F-7 / F-8. Powód: pierwsze testy UI w przeglądarce.

**Zależność api:** brak. `POST /runs`, bramka `CONTEXT_INCOMPLETE` i SSE **bez zmian**. Ta faza **nie** dodaje kroku w `content-chain-backend_major_plan.md`.

**Powierzchnia:** `content-chain-product-ui` (dziedziczenie locku Fazy 1, bez nowej palety). Overlay = istniejący `Dialog` shadcn (jak logout / opinia), nie nowy kit.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-7-start-archiwum.md` (KROK 1 `WYKONANY` → fundament major 7.2 + część 7.1: hostowalny `StartRunForm` + kit Tooltip + `useStartRunGate`; KROK 2 `WYKONANY` → major 7.1 + reszta 7.2: CTA/modal na `/runs`). Reuse briefu z Konta w Dialogu; `TooltipProvider` po sesji; toast 202 bez dublowania; lista archiwum bez `fetchArchiveRuns` po starcie. **Brak** milestone’u po Fazie 7 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 3 / Krok 3.1 / 3.5 / MILESTONE 3 / Faza 6 / MILESTONE 6 bez zmian (historia).
Zmiana względem: status Fazy 7, kroków 7.1–7.2 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-7-start-archiwum.md`.

**DoD (faza):**

- Na `/runs` przycisk **„Uruchom agenta”** (admin i `user`) otwiera modal z kanonicznym briefem (ten sam co na Koncie).
- Disable + tooltip przy nieaktywnych agentach na CTA i w modalu; **409** / **400** → envelope w formularzu (także w modalu), zero toasta.
- Po **202** z modalu: zostajemy na Runach, modal zamknięty, toast „Run wystartował”; live = floating box; lista archiwum **bez** nowego wiersza dopóki run nie jest `completed` \| `failed`.
- Konto: start inline, prefill z „Moich runów”, po 202 Konto + wiersz — **bez regresji**.
- Szczegóły `/runs/:runId`, sidebar i header **bez** tego CTA.
- Brak SSE na liście Runy; brak prefillu z wiersza archiwum.

### Krok 7.1 — CTA i modal na archiwum

**Status:** `WYKONANY`

**Opis:** Widok Runy (Krok 3.5) dostaje przycisk **„Uruchom agenta”** otwierający modal. Lista, filtry, paginacja 10, odświeżanie 15 min i brak SSE **bez zmiany sensu**.

**DoD (krok):**

- CTA widoczny dla `admin` i `user` na `/runs` (nie na `/runs/:runId`).
- Modal używa `Dialog` z kitu; tytuł **„Uruchom agenta”**.
- Zamknięcie bez submitu nie startuje runu.

### Krok 7.2 — Ten sam brief, sukces i bramka

**Status:** `WYKONANY`

**Opis:** Modal hostuje ten sam formularz co Konto (reuse, nie druga kopia pól). Draft startowy pusty. Po 202 — widok źródłowy Runy.

**DoD (krok):**

- Pola briefu wg `taskType` jak Krok 3.1; bez `selectedIdeaIds`; bez prefillu z archiwum.
- **202** → toast „Run wystartował”, modal close, pathname `/runs`; box pokazuje nowy run gdy `running` \| `awaiting_hitl` \| `interrupted`.
- **409** `CONTEXT_INCOMPLETE` / **400** → envelope w modalu.
- Start z Konta (Krok 3.1 / 3.2) bez regresji.

---

## Faza 8 — Anulowanie runu w UI (`cancelled`) — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 8** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze).

**Refaktor względem:** Faza 3 (Konto / live / archiwum / box) (`WYKONANY`); Faza 3.6 (toast) (`WYKONANY`); Faza 4 (HITL) (`WYKONANY`); Faza 5 (przegląd / opinia) (`WYKONANY`). Cel: Stop + modal, toast „Run anulowany”, archiwum z `cancelled`, select opinii z `cancelled`+wynik, box bez Stop; po `cancelled` krótko „Anulowany” → ukrycie po **200 ms** — zgodnie z `docs/ux_dashboard.md` / `SPEC-FRONTEND.md` po Fazach A–C.

**Zależność api:** kontrakt `POST .../cancel` + SSE `run.cancelled` + snapshot `cancelledAt` (norma w docs/spec; implementacja api = feature-plan powiązany z backend Faza 12).

**Zależność:** docs + SPEC (Fazy A–C) oraz gate backend Faza 12 (norma) — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan (Stop/modal, mutacja cancel, toast dedup, archiwum, opinia, HITL znika po cancel, floating box: „Anulowany” → ukrycie po 200 ms). HOW = `feature-plans/content-chain_feature_plan_faza-8-cancel-ui.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-8-cancel-ui.md` (KROK 1 `WYKONANY` → kontrakt FE: enum/`cancelledAt`/helpers terminal vs reviewable vs cancelable, `cancelRun`, toast „Run anulowany” + dedup, SSE `run.cancelled`; KROK 2 `WYKONANY` → Stop + modal na Moich runach i szczegółach; KROK 3 `WYKONANY` → archiwum z `cancelled`, grace 200 ms w floating boxie, select opinii z `cancelled`+wynik). DoD gate Fazy 8 + HOW wdrożone. **Brak** MILESTONE 8 — nic nie oznaczono `OSIĄGNIĘTY`. Fazy 1–7 / M1–M6 bez zmian (historia).
Zmiana względem: status Fazy 8 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-8-cancel-ui.md`.

**Poza zakresem:** Stop w boxie; cancel bez modala; gateway abort UI; Playwright; kroki kodu w tym majorze (HOW w feature-planie).

**DoD (faza-gate):**

- Fazy A–C planu zmian domknięte; F-8 / F-9 / toast / archiwum opisują `cancelled`.
- Backend Faza 12 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.

---

## Faza 9 — Modal hasła przy zmianie emaila na Koncie — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 9** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze).

**Refaktor względem:** Faza 5 / Krok 5.3.1 (`WYKONANY`) — zmiana własnego emaila samym `{ email }` bez modala re-auth. MILESTONE 5 pozostaje `OSIĄGNIĘTY` (historia).

**Zależność api:** kontrakt `PATCH /auth/me/email` + `currentPassword` + `INVALID_PASSWORD` (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend Faza 13).

**Zależność:** docs + SPEC (kanon re-auth email) oraz gate backend Faza 13 — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: po „Zapisz email” **zawsze** Dialog (także gdy adres = obecny) — email (prefill, **disabled**) + pole aktualnego hasła; każdy Potwierdź → `PATCH /auth/me/email` `{ email, currentPassword }`; złe hasło (`INVALID_PASSWORD`) / `VALIDATION_FAILED` pod polem hasła — `code` + `message` pod hasłem; **stan disabled emaila bez zmian** (przed 409: zostaje **disabled**; po 409: zostaje **odblokowany**); **bez** cyklu sesji F-4a; **409** → modal otwarty, clear email+hasło, odblokowanie emaila, błąd pod polem email, ponowny submit z obu pól; sukces → zamknięcie, `GET /auth/me`, **bez** toastu; Anuluj → zero API, draft formularza bez zmian względem otwarcia; CTA nie disabled wyłącznie dlatego, że email = current. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` — **nie** z treści Podkroku 5.3.1 (`WYKONANY`). HOW = `feature-plans/content-chain_feature_plan_faza-9-reauth-email.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-9-reauth-email.md` (KROK 1 `WYKONANY` → `apiFetch`: **401** `INVALID_PASSWORD` bez refresh / `unauthorizedHandler`; `patchOwnEmail` → `PATCH /auth/me/email` `{ email, currentPassword }`; KROK 2 `WYKONANY` → `AccountEmailForm`: Dialog re-auth zawsze przed mutacją, recovery **409**, envelope pod hasłem / emailem, sukces bez toastu). DoD gate Fazy 9 + HOW wdrożone. **Brak** MILESTONE 9 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 5 / 5.3.1 / MILESTONE 5 bez zmian (historia). Backend Faza 13 = osobny ślad.
Zmiana względem: status Fazy 9 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-9-reauth-email.md`.

**Poza zakresem:** toast sukcesu / toast na 409; confirm e-mail; zmiana hasła; Playwright; kroki kodu w tym majorze (HOW w feature-planie).

**DoD (faza-gate):**

- docs + SPEC zawierają re-auth przy `PATCH /auth/me/email` + `INVALID_PASSWORD`; `docs/ux_dashboard.md` / `SPEC-FRONTEND.md` opisują modal re-auth + recovery 409 + `INVALID_PASSWORD` bez wylogowania.
- Backend Faza 13 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.

---

## Faza 10 — Auto-close przeglądu w UI (`reviewExpiresAt`) — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 10** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze). **Uwaga:** ta Faza 10 **nie** jest `content-chain-backend_major_plan.md` Fazą 10 (Edytuj / email / filtr `GET /runs`).

**Refaktor względem:** Faza 5 / Krok 5.1 (`WYKONANY`) — przegląd otwarty do ręcznego „Zamknij przegląd” bez TTL. MILESTONE 5 pozostaje `OSIĄGNIĘTY` (historia).

**Zależność api:** kontrakt `pipelineFinishedAt` + wyliczone `reviewExpiresAt` na snapshotcie / sukcesach mutacji przeglądu; mutacja po TTL → **409** `REVIEW_LOCKED` bez side-effect zapisu locka; sweeper ustawia `reviewFinalizedAt` (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend Faza 14). Ten major **nie** implementuje api.

**Zależność:** docs + SPEC (kanon auto-close przeglądu z `auto-close-review-plan.md` Fazy 1–2) oraz gate backend Faza 14 — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: disable Edytuj / gwiazdek / „Zamknij przegląd” gdy `reviewFinalizedAt !== null` **albo** minął serwerowy `reviewExpiresAt`; copy jak po ręcznym finalize (**„Przegląd zamknięty”**, bez rozróżnienia auto vs ręczne); **bez** widocznego deadline / countdown / wiersza „dostępne do…”; FE **nie** wylicza TTL lokalnie z `pipelineFinishedAt` + stałej — deadline wyłącznie z pola API. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` — **nie** z treści Kroku 5.1 (`WYKONANY`). HOW = `feature-plans/content-chain_feature_plan_faza-10-auto-close-review.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-10-auto-close-review.md` (KROK 1 `WYKONANY` → typy/parser `pipelineFinishedAt` / `reviewExpiresAt` + `run-review-window`; KROK 2 `WYKONANY` → `canReviewSnapshot` / `canEditSnapshot` / `useRunResultEdit` z oknem TTL; KROK 3 `WYKONANY` → `useReviewExpiryTick` + panel / sekcja wyniku: disable + copy „Przegląd zamknięty” bez chrome deadline). DoD gate Fazy 10 + HOW wdrożone. **Brak** MILESTONE 10 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 5 / 5.1 / MILESTONE 5 bez zmian (historia). Backend Faza 14 = osobny ślad.
Zmiana względem: status Fazy 10 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-10-auto-close-review.md`.

**Poza zakresem:** implementacja w `apps/frontend` w tym majorze; kroki kodu w tym pliku; widoczny deadline / countdown UI; copy system vs user; HITL TTL; polling statusu „dla TTL”; SSE „dla TTL”; lokalny math TTL.

**Zakres HOW (wskazówka — nie kroki tego majoru; HOW = feature-plan powyżej):**

1. Typy / parser snapshotu (+ sukcesy mutacji przeglądu): `pipelineFinishedAt`, `reviewExpiresAt`.
2. `canReviewSnapshot` / dostęp Edytuj: `false` gdy locked **lub** minął serwerowy `reviewExpiresAt`.
3. Panel: zachowanie jak zamknięty po expiry; copy „Przegląd zamknięty”; **bez** wiersza „dostępne do…”.
4. Lekki timer lokalny od `reviewExpiresAt` z API (disable po expiry; bez SSE, bez lokalnego TTL math).
5. Skill `content-chain-product-ui` na powierzchni panelu (dziedziczenie locku Fazy 1).

**DoD (faza-gate):**

- docs + SPEC Frontend opisują disable po expiry / finalize bez nowego chrome deadline/countdown (`docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-9).
- Backend Faza 14 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.
- Ten major nie oznacza implementacji jako `WYKONANY` z samego gate.

---

## Faza 11 — UX błędów accept-invite bez enumeracji — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 11** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze). **Uwaga:** ta Faza 11 **nie** jest `content-chain-backend_major_plan.md` Fazą 11 (twardy zapis kontekstu).

**Refaktor względem:** Faza 1 / Krok 1.3 (`WYKONANY`) — publiczny `/invite/accept?token=` z założeniem kontraktu, w którym kolizja email mogła wrócić jako **409** „email zajęty”. MILESTONE 1 pozostaje `OSIĄGNIĘTY` (historia).

**Zależność api:** kontrakt `POST /auth/accept-invite`: kolizja `User.email` → **401** `UNAUTHORIZED` z **identycznym** `code` + `message` co przy złym / zużytym / revoked / wygasłym tokenie; **zakaz** **409** na tej trasie z powodu email (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend Faza 15). Ten major **nie** implementuje api.

**Zależność:** docs + SPEC (kanon anti-enumeration na accept-invite) oraz gate backend Faza 15 — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: błąd kolizji email na accept-invite **nie** ma osobnego copy „email zajęty” z API — użytkownik widzi ten sam komunikat co przy nieważnym zaproszeniu (envelope `code` + `message` na karcie); **brak** gałęzi UI na **409** / `CONFLICT` dla tej trasy; **bez** Toastera na tej powierzchni (kanon Fazy 3.6). Opcjonalna stała pomocnicza (np. „Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.”) — **tylko** jeśli nadal mapowana z tego samego **401**, bez rozróżniania przyczyn po `code`. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` — **nie** z treści Kroku 1.3 (`WYKONANY`; możliwe **409** „email zajęty” jest historyczne). HOW = `feature-plans/content-chain_feature_plan_faza-11-anti-enumeration-accept-invite.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-11-anti-enumeration-accept-invite.md` (KROK 1 `WYKONANY` → `toAcceptInviteFormError` + `AcceptInviteForm` bez gałęzi `CONFLICT` / „email zajęty”; KROK 2 `WYKONANY` → stała PL `ACCEPT_INVITE_UNAUTHORIZED_HINT` dla każdego **401** / `UNAUTHORIZED`). DoD gate Fazy 11 + HOW wdrożone. **Brak** MILESTONE 11 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 1 / 1.3 / MILESTONE 1 bez zmian (historia). Backend Faza 15 = osobny ślad.
Zmiana względem: status Fazy 11 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-11-anti-enumeration-accept-invite.md`.

**Poza zakresem:** implementacja w `apps/frontend` w tym majorze; kroki kodu w tym pliku; zmiany widoku Użytkownicy / create invite; Playwright; Toaster na accept-invite.

**Zakres HOW (wskazówka — nie kroki tego majoru; HOW = feature-plan powyżej):**

1. `accept-invite-form` (lub równoważny): obsługa envelope **401** jak przy nieważnym tokenie.
2. Usunąć / nie dodawać gałęzi UI na `CONFLICT` / „Email already in use” dla tej trasy.
3. Skill `content-chain-product-ui` przy copy / karcie (dziedziczenie locku Fazy 1).
4. Bez Toastera na `/invite/accept` (kanon poza sesją).

**DoD (faza-gate):**

- docs + SPEC-FRONTEND: accept-invite pokazuje błąd jak przy nieważnym tokenie; brak UI „email zajęty” z **409**.
- Backend Faza 15 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.
- Ten major nie oznacza implementacji jako `WYKONANY` z samego gate.

---

## Faza 12 — Rejestracja i aktywacja konta w UI — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 12** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze). **Uwaga:** ta Faza 12 **nie** jest `content-chain-backend_major_plan.md` Fazą 12 (anulowanie runu).

**Refaktor względem:** Faza 1 / Krok 1.1–1.2 (`WYKONANY`) — nieaktywne wezwanie „Zarejestruj się!”; first-run bez otwartego signup; otwarta rejestracja poza zakresem majoru. MILESTONE 1 pozostaje `OSIĄGNIĘTY` (historia).

**Zależność api:** kontrakt `POST /auth/register` (zawsze publiczny; kolizja email → **409** `CONFLICT` + jawny message), `POST /auth/activate`, `POST /auth/resend-activation`, stany `verifiedAt` / `AccountActivation` (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend Faza 16). Ten major **nie** implementuje api.

**Zależność:** docs + SPEC (`register_email_activation-plan.md` Fazy 1–2; `docs/ux_dashboard.md`, `SPEC-FRONTEND.md`) oraz gate backend Faza 16 — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: aktywny przycisk **„Zarejestruj się!”** gdy bootstrap **niedostępny**; formularz rejestracji; po **201** **lub** **503** register w `production` → thank-you (email resend ze **stanu klienta**); kolizja **409** `Email already in use` → formularz; poza prod → krótki sukces → login; deep link **wyłącznie** `/?activationToken=` → login + activate w tle; toast sukcesu na `/` (**wyjątek** od F-5a); błąd activate → ogólny komunikat na karcie logowania; dashboard po loginie; **bez** Set-Cookie na register / activate / resend; **bez** osobnego trwałego ekranu „Aktywacja…”. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` — **nie** z treści Kroku 1.1–1.2 (`WYKONANY`; nieaktywne „Zarejestruj się!” jest historyczne). HOW = `feature-plans/content-chain_feature_plan_faza-12-register-email-activation.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-12-register-email-activation.md` (KROK 1 `WYKONANY` → klienty `register` / `activate` / `resendActivation` + parser `verifiedAt`; KROK 2 `WYKONANY` → aktywny CTA „Zarejestruj się!”, `RegisterForm`, **409** na polu email; KROK 3 `WYKONANY` → thank-you + resend ze stanu klienta / poza prod → login z hintem; KROK 4 `WYKONANY` → `/?activationToken=` + Toaster na `/` + toast sukcesu / ogólny błąd na karcie). DoD gate Fazy 12 + HOW wdrożone. **Brak** MILESTONE 12 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 1 / 1.1–1.2 / MILESTONE 1 bez zmian (historia). Backend Faza 16 = osobny ślad.
Zmiana względem: status Fazy 12 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-12-register-email-activation.md`.

**Poza zakresem:** implementacja w `apps/frontend` w tym majorze; kroki kodu w tym pliku; DEMO chip / locki `guest` (plan demo); osobny trwały ekran „Aktywacja…” (świadomie pominięty); confirm e-mail przy `PATCH /auth/me/email` (V1); Playwright; zmiany BFF / modelu cookie.

**Zakres HOW (wskazówka — nie kroki tego majoru; HOW = feature-plan powyżej):**

1. Formularz register (email / hasło / confirm) + bramka vs bootstrap; mapowanie **409** `CONFLICT` na błąd przy polu email.
2. Strona podziękowań po **201** lub **503** register w prod: copy + resend z email ze stanu klienta; stała odpowiedź **200** `Wiadomość wysłana ponownie`.
3. Handler `/?activationToken=` na `/`: activate w tle + toast sukcesu (**wyjątek** toast na stronie głównej); błąd → ogólny komunikat na karcie logowania.
4. Skill `content-chain-product-ui` na powierzchniach register / thank-you / login po deep linku (dziedziczenie locku Fazy 1).
5. BFF / `apiFetch` bez zmiany modelu cookie — register / activate / resend **bez** sesji.

**DoD (faza-gate):**

- docs + SPEC-FRONTEND: signup, thank-you+resend (prod), deep link → login + toast; **409** na kolizji zostaje na formularzu.
- Backend Faza 16 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.
- Ten major nie oznacza implementacji jako `WYKONANY` z samego gate.

---

## Faza 13 — Bramka „Agenci aktywni” z liveness gateway — norma gotowa pod feature-plan

**Status:** `WYKONANY`

**Bez MILESTONE 13** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze). **Uwaga:** ta Faza 13 **nie** jest `content-chain-backend_major_plan.md` Fazą 13 (re-auth email).

**Refaktor względem:** Faza 2 / Krok 2.2 (`WYKONANY`) — chip „Agenci aktywni / nieaktywni” wyłącznie z `GET /company-context/completeness`; Faza 3 / Krok 3.1 oraz Faza 7 / Krok 7.2 (`WYKONANY`) — disable CTA startu (Konto + „Uruchom agenta”) czyta ten sam sygnał completeness. MILESTONE 2 / 3 oraz Faza 2 / 2.2 / Faza 3 / 3.1 / Faza 7 / 7.2 pozostają historią (`OSIĄGNIĘTY` / `WYKONANY`).

**Zależność api:** publiczny `GET /api/v1/health/ready` — agregat `ready` | `not_ready`; `checks.gateway` healthy ⇔ api uznało upstream liveness gateway za OK (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend Faza 17). Ten major **nie** implementuje api. FE **nie** woła originu gateway.

**Zależność:** docs + SPEC (`ready-state-fix-plan.md` Fazy 1–2; `docs/ux_dashboard.md`, `docs/dictionary.md`, `SPEC-FRONTEND.md` F-6) oraz gate backend Faza 17 — przed feature-planem FE.

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: predykat **`agentsActive` ⇔ `contextComplete` ∧ `gatewayAlive`**, gdzie `contextComplete` = `completeness.complete === true`, a `gatewayAlive` = api `/health/ready` → `checks.gateway` healthy; zielony chip + enable CTA startu (Konto **oraz** „Uruchom agenta” na Runach) = ten sam `agentsActive`; copy nieaktywnego kanoniczne: **„Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.”**; gdy `complete === false` — wolno dodatkowo `missing` + link „Uzupełnij kontekst”; gdy `complete === true` a gateway nie żyje — **bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji; kropki zakładek kontekstu **nadal tylko** z `completeness.missing` (bez gateway); odświeżanie jak completeness: **mount + refetch przy okazji** (np. po udanym zapisie kontekstu / wspólnym `refetch`) — **bez** interval pollingu; `isComplete` / semantyka completeness **bez** zanieczyszczenia siecią. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` F-6 — **nie** z treści Kroku 2.2 / 3.1 / 7.2 (`WYKONANY`; „tylko completeness” jest historyczne). HOW = `feature-plans/content-chain_feature_plan_faza-13-agents-active-gateway.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-13-agents-active-gateway.md` (KROK 1 `WYKONANY` → typy/parser `health.types` + `fetchGatewayAlive` / `checks.gateway`; KROK 2 `WYKONANY` → `GatewayAliveProvider` + `computeAgentsActive` + mount w shellu + refetch po PUT; KROK 3 `WYKONANY` → chip + `useStartRunGate` z kompozycją, copy kanoniczne, link „Uzupełnij kontekst” tylko gdy `!contextComplete`). DoD gate Fazy 13 + HOW wdrożone. **Brak** MILESTONE 13 — nic nie oznaczono `OSIĄGNIĘTY`. Faza 2 / 2.2 / MILESTONE 2 oraz Faza 3 / 3.1 / Faza 7 / 7.2 / MILESTONE 3 bez zmian (historia). Backend Faza 17 = osobny ślad.
Zmiana względem: status Fazy 13 (`NIE_ROZPOCZĘTY`). Powód: ślad do major po implementacji `content-chain_feature_plan_faza-13-agents-active-gateway.md`.

**Powierzchnia:** `content-chain-product-ui` (dziedziczenie locku Fazy 1, bez nowej palety).

**Poza zakresem:** implementacja w `apps/frontend` w tym majorze; kroki kodu w tym pliku; FE→gateway; interval polling statusu; twardy reject `POST /runs` za „gateway down” (api — poza tym majorze; UX nadal disable CTA); interpretacja pełnego readiness gateway (config / redis / cache / upstream `/health/ready`); zmiana semantyki `isComplete` / BC company-context; Playwright.

**Zakres HOW (wskazówka — nie kroki tego majoru; HOW = feature-plan powyżej):**

1. Klient / typy `GET /api/v1/health/ready` (BFF same-origin) — odczyt `checks.gateway` / agregatu bez sekretów.
2. Kompozycja `agentsActive` z completeness **∧** gatewayAlive — **bez** wpinania sieci do `isComplete` / semantyki `CompletenessProvider` jako „kompletność kontekstu”.
3. Chip chrome + `useStartRunGate` (Konto + modal Runy): disable / tooltip / copy nieaktywnego wg kanonu; `missing` + link `/context` tylko gdy kontekst niekompletny.
4. Odświeżanie: mount + refetch przy okazji (zapis kontekstu / wspólny refetch) — **zakaz** interval i FE→gateway.
5. Skill `content-chain-product-ui` na chipie / tooltipach / CTA (dziedziczenie locku Fazy 1).

**DoD (faza-gate):**

- docs + SPEC-FRONTEND F-6: `agentsActive` = completeness ∧ gatewayAlive (api `/health/ready`); copy nieaktywnego kanoniczne; disable CTA na obu powierzchniach startu; kropki zakładek nadal tylko completeness.
- Backend Faza 17 (gate) dopisana.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.
- Ten major nie oznacza implementacji jako `WYKONANY` z samego gate.

---

## Faza 14 — DEMO MODE i rola `guest` w UI — norma gotowa pod feature-plan

**Status:** `NIE_ROZPOCZĘTY`

**Bez MILESTONE 14** — gate normy UX; HOW implementacji w osobnym feature-planie (nie w tym majorze). **Uwaga:** ta Faza 14 **nie** jest `content-chain-backend_major_plan.md` Fazą 14 (auto-close przeglądu). Numer **14** (nie 13) — Faza 13 zajęta bramką „Agenci aktywni”.

**Refaktor względem:** Faza 1 / chrome i karta logowania (`WYKONANY`) — brak chipa demo; istniejący `GuestView` w home-entry = stan **anonimowy** (login/register), **nie** rola `guest`; Faza 2 / Krok 2.2 CompletenessChipSlot (`WYKONANY`) — slot completeness bez `DemoModeChipSlot` nad nim; Faza 3 / Krok 3.5 archiwum Runy (`WYKONANY`) — lista instancji bez blokady wejścia w cudzy detail po stronie roli guest; **Faza 12** (`WYKONANY`) — signup / thank-you / activate **bez** warunku `demoMode` (to **zostaje** — ta faza **nie** bramkuje signup). MILESTONE 1 / 2 / 3 oraz Faza 12 pozostają historią (`OSIĄGNIĘTY` / `WYKONANY`).

**Zależność api:** publiczny `GET /api/v1/config` V1 wyłącznie `{ demoMode: boolean }`; sesja `/auth/me` z `role` w tym `'guest'`; kody quota `GUEST_TYPE_NOT_ALLOWED` / `GUEST_TYPE_QUOTA_EXCEEDED` / `GUEST_GLOBAL_QUOTA_EXCEEDED`; rating guest **429**; mutacje zabronione / cudzy detail → **403**; `guest` && !demo → **401** (norma w aktualnych docs/spec; implementacja api = feature-plan powiązany z backend **Faza 18**). Baza register/activate = backend **Faza 16** (**bez regresji** dostępności signup). Ten major **nie** implementuje api.

**Zależność:** docs + SPEC (`demo-mode-guest-role-plan.md` Fazy 1–2; `docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-10 / F-4b / F-8) oraz gate backend Faza 18 — przed feature-planem FE. Signup / thank-you / activate = **Faza 12** (bez `if (!demoMode) hide`).

**Opis:** Ta faza majoru **nie** zawiera kroków implementacji kodu FE. Oznacza gotowość normy UX pod feature-plan: boot `DemoModeProvider` (lub równoważny) z `GET /config` (tylko `demoMode`); `DemoModeChipSlot` / `DemoChip` **nad** CompletenessChip — **tylko dashboard**, gdy `demoMode === true` (copy w stylu „Tryb demo aktywny / Wybrane funkcje ograniczone” + Iconify); przy demo off chip **nie** jest widoczny; locki UI (sidebar, formy, disable `taskType` poza allowlistą `post_ideas` / `page_copy` / `page_outline_then_copy`, zapis kontekstu, Users, Edytuj/finalize, `PATCH /auth/me/email`) **wyłącznie** gdy `session.role === 'guest'` **AND** `demoMode === true` (admin na instancji demo **bez** locków gościa); `GuestLimitModal` **wyłącznie** po błędzie quota z API + CTA kontakt `{ iconName, contactData }[]` (mailto, LinkedIn, GitHub) — hardcoded FE; obsługa **429** rating (envelope); archiwum: lista całej instancji OK, **brak** nawigacji do cudzego detail (FE + API 403); feedback `application`/`agent` OK, `run` tylko własny; egzekucja limitów = API, FE tylko odzwierciedla; **zakaz** UI switch demo; **zakaz** awansu roli w UI; **zakaz** mylenia `GuestView` (anonim) z rolą `guest`. Completeness / `agentsActive` (Faza 13) **zostaje** — demo **nie** zastępuje bramki kontekstu. **HOW i kod** biorą kanon z aktualnych `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` F-10 — **nie** z treści Kroku 1.1–1.4 / 2.2 / 3.5 / Fazy 12 (`WYKONANY`). HOW = `feature-plans/content-chain_feature_plan_faza-14-demo-mode-guest.md`.

**Powierzchnia:** `content-chain-product-ui` (dziedziczenie locku Fazy 1, bez nowej palety) — chip i modal.

**Poza zakresem:** implementacja w `apps/frontend` w tym majorze; kroki kodu w tym pliku; przełącznik demo dla admina; uzależnianie signup / thank-you / activate od `demoMode`; osobny ekran aktywacji; zarządzanie użytkownikami; awans `guest` → `user`/`admin`; preemptive modal limitu bez odpowiedzi API; Playwright.

**Zakres HOW (wskazówka — nie kroki tego majoru; HOW = feature-plan powyżej):**

1. `DemoModeProvider` + publiczny `GET /config` (BFF same-origin) — V1 wyłącznie pole `demoMode`.
2. Signup / thank-you / activate = Faza 12 — **bez** `if (!demoMode) hide`; opcjonalne copy ograniczeń gościa na thank-you **nie** zmienia flow aktywacji.
3. `DemoModeChipSlot` / `DemoChip` **nad** CompletenessChip — **tylko dashboard**, gdy `demoMode === true`.
4. Guest locks gdy `role === guest` **i** `demoMode === true` (sidebar, formy, allowlista typów, mutacje zabronione).
5. `GuestLimitModal` + tablica kontaktów — **po** błędzie quota z API (`GUEST_TYPE_*` / `GUEST_GLOBAL_QUOTA_EXCEEDED`).
6. Obsługa kodów quota + **429** rating; brak nawigacji do cudzego detail (archiwum = lista OK).
7. Skill `content-chain-product-ui` na chip / modal (dziedziczenie locku Fazy 1).

**DoD (faza-gate):**

- docs + SPEC-FRONTEND F-10: `GET /config`; chip demo tylko dashboard gdy `demoMode`; locki tylko `guest` ∧ demo on; modal limitu po quota API; 429 rating; F-4b **bez** warunku `demoMode`.
- Backend Faza 18 (gate) dopisana; Faza 12 (signup) **bez** regresji dostępności.
- Wolno otworzyć feature-plan FE bez luk w docs/spec.
- Ten major nie oznacza implementacji jako `WYKONANY` z samego gate.
