# Content Chain — major plan (frontend)

**Zakres tego pliku:** cienki klient produktowy `apps/frontend` — **BFF** (same-origin `/api/v1` → `apps/api`), strona główna (karta logowania / first-run jako ten sam formularz), publiczny deep link **`/invite/accept?token=`**, dashboard po sesji (sidebar + header + obszar roboczy) aż do kompletnego UX MVP: Kontekst firmy, **Konto** (start + Moje runy + live), **Runy** (archiwum `completed` \| `failed`), szczegóły Run (live własnego runu, HITL, wynik, przegląd), Użytkownicy (admin), zapis opinii, floating box. Numeracja faz **1–6 jest własna tego majoru** (nie kontynuuje `content-chain-backend_major_plan.md`).

**Poza tym plikiem:** trzy zmiany kontraktu api — **`content-chain-backend_major_plan.md`, Faza 10** (Krok 10.1 zapis treści przy Edytuj; Krok 10.2 własny email; Krok 10.3 filtr wielowartościowy `GET /runs`); panel administracyjny odczytu opinii; zmiana hasła zalogowanego / usuwanie własnego konta; soft-delete użytkowników w UI; otwarta rejestracja; `selectedIdeaIds` na starcie w UI; `conversationId` w UI; limit per-user runów w toku; next-intl / mapa tłumaczeń envelope; Playwright / automatyczne testy FE; Docker/`production` jako temat tego planu; PostgreSQL / V1 — rozbudowa. Aplikacja frontu **już istnieje** jako boilerplate (backend Faza 1 / Krok 1.3) — ten major nie tworzy jej od zera.

**Źródła:** `docs/` (w tym `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `docs/brand_types.md`, `docs/security.md`, `docs/deployment.md`), `spec/SPEC-*.md` (w tym `SPEC-FRONTEND.md`, `SPEC-AUTH.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-RUNY.md`, `SPEC-FEEDBACK.md`, `SPEC-BEZPIECZENSTWO.md`).  
**Kolejność priorytetów:** Fazy 1 → 6 z bramką `MILESTONE` po każdej fazie; Milestone 6 zamyka ten plik. Archiwum Runy (Krok 3.5) zakłada backend **10.3**; Edytuj z treścią i własny email (Faza 5) zakładają **10.1** i **10.2**. Start, Moje runy, SSE i BFF **nie** czekają na Fazę 10.

**Język wizualny (skill, nie osobna faza):** powierzchnie UI w `apps/frontend` (karty, chrome, widoki, stany loading/empty/error, prezentacja statusu live) wymagają skilla **`content-chain-product-ui`** (`.cursor/skills/content-chain-product-ui/`). IA, copy, trasy i stack nadal biorą `docs/` + `spec/` — skill nie nadpisuje kanonu. **Visual lock** jest jednorazowy w Fazie 1 (Krok 1.4 + karty wejścia 1.1–1.3); Fazy 2–6 **dziedziczą** tokeny, bez nowej palety na widok. Skill **nie** dotyczy: BFF / `apiFetch` / cookie / rejestru `EventSource` (Krok 1.6 i równoważne w późniejszych krokach), typów kontraktu (Krok 1.5), ani `content-chain-backend_major_plan.md` Faza 10.

**Feature plany:** przy `/create-feature-implementation-plan` na wycinku z powierzchnią UI dołącz ten skill (`@content-chain-product-ui`). HOW i kod w feature planie mają już spełniać lock / dziedziczenie — nie odkładaj smaku na implementację. Kotwicę wskazuj jawnie na **ten** major (nie na backend / Fazę 10).

**Statusy (fazy / kroki):** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`  
**Milestone:** domyślnie **bez statusu**; po spełnieniu DoD → wyłącznie `OSIĄGNIĘTY`

---

## Faza 1 — Wejście, BFF i szkielet po sesji

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Produktowy start cienkiego klienta na istniejącym szkielecie: BFF (przeglądarka wyłącznie origin FE), probe sesji i wrapper **401 → refresh → jeden retry** na każdym produktowym fetchu, strona główna jako karta logowania (first-run = tryb tego samego formularza), publiczny deep link **`/invite/accept?token=`** (gotowość pod Fazę 6; ten sam kształt co mail), layout zalogowany ze slotami późniejszych widoków, header tożsamości, rejestr `EventSource` (pusty) i slot floating boxa. Typy semantyczne kontraktu z `docs/brand_types.md` na granicach UI. Zgodnie z `docs/ux_dashboard.md`, `docs/deployment.md`, `SPEC-FRONTEND.md` F-1/F-2/F-4a, `SPEC-AUTH.md`, `SPEC-BEZPIECZENSTWO.md` B-5a, `docs/brand_types.md`. Powierzchnie karty logowania, accept-invite i chrome: **`content-chain-product-ui`** (visual lock w Kroku 1.4). Krok 1.5 i 1.6 bez tego skilla.

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

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Po starcie / przeładowaniu klient odczytuje tożsamość same-origin. Brak sesji → karta logowania. Udane logowanie → dashboard. Cookie httpOnly na **originie FE** (BFF przekazuje `Set-Cookie`). Wygląd karty (nie probe / cookie): **`content-chain-product-ui`**.

**DoD (krok):**

- Probe tożsamości: `GET /auth/me` → (401) `POST /auth/refresh` → ponownie `GET /auth/me` → kolejny 401 → karta logowania (`docs/ux_dashboard.md` / `SPEC-AUTH.md` / `SPEC-FRONTEND.md` F-4a).
- Submit karty przy braku first-run loguje i otwiera dashboard.
- Tokeny sesji nie są trzymane w magazynie przeglądarki dostępnym skryptom.

### Krok 1.2 — First-run jako tryb tej samej karty

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Pusta instancja nie dostaje osobnego ekranu bootstrapu. Ten sam formularz strony głównej tworzy pierwszego administratora i sesję jak po loginie. Powierzchnia karty: ten sam lock co 1.1 (`content-chain-product-ui`); bez osobnej estetyki first-run.

**DoD (krok):**

- Gdy bootstrap jest dostępny, submit karty tworzy pierwszego admina i wchodzi do dashboardu.
- Przycisk rejestracji pozostaje nieaktywny także w trybie first-run.
- Ponowny bootstrap po utworzeniu admina nie jest ścieżką UI.

### Krok 1.3 — Publiczny deep link akceptacji zaproszenia

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Ekran spoza dashboardu na **`/invite/accept?token=`** (legalizacja URL z mailera api — bez zmiany ścieżki w mailu). Token z odnośnika → pierwsze hasło → powrót na stronę główną. Gotowość pod Fazę 6; bez budowania listy użytkowników w tej fazie. Formularz hasła: **`content-chain-product-ui`** (ten sam język co karta logowania).

**DoD (krok):**

- Deep link z tokenem pokazuje formularz pierwszego hasła (polityka haseł z docs bezpieczeństwa).
- Sukces akceptacji **nie** otwiera dashboardu; użytkownik loguje się na stronie głównej.
- Zużyty / nieważny token daje czytelny błąd envelope (`code` + `message`), bez wycieku szczegółów implementacji.
- Inna ścieżka FE (np. `/accept-invite`) **nie** jest kanonem — mail i UI muszą się zgadzać.

### Krok 1.4 — Layout zalogowany: sidebar, header, sloty

**Status:** `NIE_ROZPOCZĘTY`

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

**Status:** `NIE_ROZPOCZĘTY`

Jednorazowe spięcie motywu (akcent, szarości, radius, `--font-sans` → Geist, stany Button/input/modal) zanim Faza 2 wypełni Kontekst. Feature plan tego chrome **dołącza** skill; HOW nie zostawia stock-fioletu shadcn „na później”. Zakaz hero/bento/GSAP i zmiany IA.

### Krok 1.5 — Kontrakt typów i język UI

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Granice klienta używają typów semantycznych i enumów z dokumentacji brand types. Chrome po polsku; envelope API **bez** mapy tłumaczeń (next-intl = V1). Ten krok = kontrakt typów i copy envelope — **bez** `content-chain-product-ui` (smak chrome jest w 1.4).

**DoD (krok):**

- Identyfikatory runu, użytkownika, opinii itd. nie są mylone jako zwykły tekst na granicach UI (`docs/brand_types.md`).
- Envelope błędów api jest pokazywany jako **`code` i `message` jak zwrócone** (angielskie `message` w MVP — `SPEC-FRONTEND.md` F-7).
- Brak sekretów modelu / bramy LLM w kliencie.

### Krok 1.6 — BFF, `apiFetch` i rejestr SSE

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Next pośredniczy same-origin `/api/v1/...` do `apps/api` (`API_BASE_URL` server-only). Jeden helper klienta: przy **401** → `POST /auth/refresh` → **jednorazowy** retry; kolejny 401 → karta logowania (nie tylko probe startowy). RSC **wolno** czytać chronione dane (cookie na originie FE). Rejestr layoutu: max jedno `EventSource` na `runId` (podłączenie w Fazie 3). Proxy **strumieniuje** SSE — zakaz pełnego bufora body. **Bez** `content-chain-product-ui` (transport, nie wygląd).

**DoD (krok):**

- Login / refresh / logout / me idą przez BFF; `Set-Cookie` z api ląduje na originie FE.
- Produktowy fetch poza helperem 401 **nie** istnieje (albo jest ten sam cykl).
- Szkielet proxy SSE: `text/event-stream` bez zebrania całego strumienia przed flush.
- Rejestr połączeń istnieje w layoutcie (na razie pusty) — Konto, szczegóły i floating box (Faza 3) nie otworzą drugiego socketa na ten sam `runId`.

---

## MILESTONE 1 — Wejście, BFF i chrome dashboardu

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

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Widok Kontekst firmy: sekcje bramki i opcjonalne extras. Chip „agenci aktywni / nieaktywni” w chrome. Start runów nadal nie jest tematem tej fazy, ale sygnał kompletności musi być gotowy, bo Faza 3 go czyta. Zgodnie z `docs/ux_dashboard.md`, docs kontekstu firmy, `SPEC-FRONTEND.md`. Widok i chip: **`content-chain-product-ui`** (dziedziczenie locku Fazy 1, bez nowej palety).

**DoD (faza):**

- Admin uzupełnia i zapisuje kontekst (bramka + extras).
- Użytkownik z rolą `user` widzi kontekst tylko do odczytu.
- Chip kompletności jest widoczny na widokach po sesji i oddaje stan bramki.
- UI nie udaje jedynej bramki startu — api nadal odrzuca start przy niekompletności (egzekucja w późniejszej fazie startu).

### Krok 2.1 — Widok Kontekst firmy

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Formularze sekcji bramki i extras; status kompletności per sekcja bramki.

**DoD (krok):**

- Sekcje bramki i extras są zgodne z `docs/ux_dashboard.md`.
- Zapis tylko dla admina; `user` dostaje czytelny komunikat read-only.
- Extras nie blokują sygnału „agenci aktywni”.

### Krok 2.2 — Chip kompletności w chrome

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Wypełnienie slotu z Fazy 1: stały sygnał, czy można uruchamiać runy produktowe.

**DoD (krok):**

- Stan „agenci aktywni” vs „nieaktywni” jest zrozumiały; przy niekompletności widać brakujące sekcje i drogę do Kontekstu.
- Chip nie myli kompletności kontekstu z runami w toku (ten sygnał = floating box / Moje runy w Fazie 3).

---

## MILESTONE 2 — Kontekst i bramka widoczne

**Opis:** Bramka po Fazie 2. Duży skok: operator widzi i (jako admin) wypełnia kontekst; chrome mówi, czy agenci są aktywni. Wolno budować start i live na Koncie.

**DoD (milestone):**

- Faza 2 spełnia swoje DoD (lub `WYKONANY`).
- Kontekst jest edytowalny przez admina i czytelny dla `user`.
- Chip kompletności działa na layoutcie z Fazy 1.
- Akceptacja przejścia do Fazy 3.

---

## Faza 3 — Konto: start i live, szczegóły live, archiwum Runy

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Widok **Konto** = **jedyny** formularz startu + **Moje runy** (wszystkie statusy autora, live). Po `POST /runs` **zostajemy na Koncie**. Szczegóły Run: live status i logi dla **własnego** `running` \| `awaiting_hitl` \| `interrupted` (rejestr SSE z Fazy 1). **Floating box** własnych runów w toku na widokach **innych niż Konto** (zwijany; status + link; nie HITL/wynik). Widok **Runy** = archiwum instancji `completed` \| `failed` (wejście + co **15 min**; bez startu, bez SSE). Na szczegółach **slot** HITL/wyniku (Faza 4) i przeglądu (Faza 5); zakaz `conversationId`. Prefill startu ze **snapshotu** `GET /runs/:runId`. `queued` = wyłącznie GET. Zgodnie z `docs/ux_dashboard.md`, `SPEC-RUNY.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-FRONTEND.md` F-5/F-5a/F-8. Powierzchnie (formularz, listy, box, prezentacja statusu — w tym `interrupted` ≠ `running`): **`content-chain-product-ui`**. Rejestr `EventSource` / BFF SSE: bez tego skilla.

**Zależność api (tylko archiwum):** `content-chain-backend_major_plan.md`, Faza 10 / Krok **10.3** (`NIE_ROZPOCZĘTY`) — `GET /runs?status=completed,failed`. Kroki 3.1–3.4 **nie** czekają na Fazę 10.

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

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Jedyny formularz nowego runu w MVP. Ten sam kanon pól później służy prefillowi z wiersza (Krok 3.2).

**DoD (krok):**

- Wybór typu tasku obejmuje posty, rolki i strony; `contentKind` gdy `page_*`; platforma ukryta/disabled gdy `page_*`; pola briefu zależą od typu zgodnie z UX.
- Brak `selectedIdeaIds` w UI startu.
- CTA startu disabled + wyjaśnienie, gdy agenci nieaktywni.
- Po **202** zostajemy na Koncie (nowy wiersz na Moich runach); nie wymuszamy nawigacji na szczegóły.

### Krok 3.2 — Konto: Moje runy i prefill

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Listing autora: `GET /runs/user/:userId` (`userId` z `/auth/me`), wszystkie statusy. Klik → szczegóły. Prefill z wiersza = **nowy** run; brief / `contentKind` z `GET /runs/:runId`, nie z wiersza listy user.

**DoD (krok):**

- Lista „Moje runy” nie jest listą instancji ani źródłem selectu opinii (opinia = Faza 5).
- `queued` i terminalne: snapshot GET (wejście na Konto, po `POST /runs`, po evencie SSE innego własnego runu, focus okna).
- Prefill nie wznawia starego `runId`.

### Krok 3.3 — Szczegóły Run: live, logi, rejestr SSE

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Podstrona po `runId`: meta, status, logi. Slot na HITL/wynik (Faza 4) i na przegląd (Faza 5). EventSource tylko gdy run **własny** i `running` \| `awaiting_hitl` \| `interrupted` — przez rejestr layoutu (jedno połączenie na id). Archiwum terminalne: wyłącznie GET. Wygląd statusu/logów: **`content-chain-product-ui`**. Cykl `EventSource`: bez tego skilla.

**DoD (krok):**

- Status zmienia się natychmiast w trakcie live; prezentacja nie jest suchym labelkiem.
- Skończony run (`completed` / `failed`) oraz `queued` **nie** otwierają SSE; w trakcie — `close()` po evencie końcowym.
- `interrupted` ma inne copy i inną prezentację niż `running`.
- `conversationId` nie jest pokazywany.
- Na szczegółach jest miejsce na panel HITL / wynik / kontrolki przeglądu — bez pełnej treści Fazy 4 i 5.
- Wejście ze szczegółów cudzego runu (archiwum) nie subskrybuje SSE.

### Krok 3.4 — Floating box (własne runy w toku)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Wypełnienie slotu z Fazy 1. Pozycje z `GET /runs/user/:userId` w `running` \| `awaiting_hitl` \| `interrupted`. Live = ten sam rejestr SSE co Moje runy i szczegóły. **Nie** chip w chrome.

**DoD (krok):**

- Na widoku Konto box jest **ukryty**.
- Na innych widokach po sesji: pozycja per taki run (status + skrót meta + link do szczegółów); copy `interrupted` inne niż „Trwa run…”.
- Box można zwinąć i rozwinąć; HITL / wynik / przegląd **nie** żyją w boxie.
- `queued` bez pozycji i bez SSE.
- Po `completed` / `failed`: `close()` i zniknięcie z boxa.

### Krok 3.5 — Lista Runy (archiwum firmy)

**Status:** `NIE_ROZPOCZĘTY`

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.3 (`NIE_ROZPOCZĘTY`). Ten krok FE zakłada `status` jako jeden enum **albo** listę przecinkową; nie implementuje api.

**Opis:** Listing `GET /runs?status=completed,failed`: kolumny, filtry w zbiorze terminalnym, strona po 10, klik → szczegóły (snapshot, bez SSE).

**DoD (krok):**

- Lista i filtry zgodne z `docs/ux_dashboard.md` (typy tasku, platforma / web, inicjator; status tylko `completed` \| `failed` albo oba).
- Paginacja stała: 10, najnowsze pierwsze.
- Odświeżanie przy wejściu na widok i co **15 minut**, gdy widok jest otwarty — to **nie** jest kanał live.
- Brak formularza startu; brak runów w toku (także cudzych).
- Ta lista **nie** jest źródłem selectu opinii ani listy „Moje runy”.

---

## MILESTONE 3 — Start na Koncie, live i archiwum

**Opis:** Bramka po Fazie 3. Duży skok: operator startuje run z Konta, śledzi własne w toku (lista + box + szczegóły) i przegląda archiwum firmy. Wolno dokładać HITL i wynik.

**DoD (milestone):**

- Faza 3 spełnia swoje DoD (lub `WYKONANY`).
- Konto = start + Moje runy; Runy = archiwum terminalne; live = rejestr N× SSE, nie nowy hub.
- Szczegóły są jedynym miejscem detalu runu (Konto / box / archiwum tylko nawigują tutaj).
- Akceptacja przejścia do Fazy 4.

---

## Faza 4 — HITL i wynik

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Na widoku szczegółów: pauza HITL (Social: wielokrotny wybór z listy; Content: akceptacja outline) oraz prezentacja wyniku po zakończeniu (listy vs skalar wg typu tasku). Zgodnie z `docs/ux_dashboard.md`, `SPEC-SOCIAL.md`, `SPEC-CONTENT.md`, `SPEC-FRONTEND.md`. Panel i wynik: **`content-chain-product-ui`** (dziedziczenie locku).

**DoD (faza):**

- HITL Social wymaga co najmniej jednego unikalnego wyboru spośród opcji; Content pozostaje akceptacją outline.
- Wynik dwuetapowego Social to lista, nie jeden blok tekstu.
- Widać pola wynikowe wymagane w UX (m.in. długość treści tam, gdzie kanon to przewiduje; `cta` / `role` gdy są).
- HITL nie jest mylony z oceną ani z Edytuj (to Faza 5) i **nie** żyje we floating boxie.

### Krok 4.1 — Panel HITL

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Wybór w trakcie pipeline na szczegółach runu.

**DoD (krok):**

- Panel pojawia się przy oczekiwaniu na HITL i znika / blokuje się poza tym stanem.
- Social: multi-select min. 1; Content: outline bez zmiany kanonu wyboru.
- Błędna selekcja jest czytelna (envelope z kontraktu).

### Krok 4.2 — Widok wyniku

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Prezentacja artefaktów po `completed` (i tego, co zdążyło się zapisać przy `failed`).

**DoD (krok):**

- Post / rolka / strona rozróżnione zgodnie z `docs/ux_dashboard.md`.
- Dwuetapowy Social = listy z powiązaniem do pomysłu; jednoetapowy = skalar.
- Wynik jest na szczegółach runu — Konto i box nie dostaną drugiego panelu treści.

---

## MILESTONE 4 — HITL i wynik na szczegółach

**Opis:** Bramka po Fazie 4. Duży skok: da się przeprowadzić selekcję w pipeline i zobaczyć wynik. Wolno zamykać przegląd, zapisywać opinię i dołożyć email / opinię na Koncie.

**DoD (milestone):**

- Faza 4 spełnia swoje DoD (lub `WYKONANY`).
- HITL i wynik są na tym samym widoku szczegółów co live z Fazy 3.
- Akceptacja przejścia do Fazy 5.

---

## Faza 5 — Przegląd, opinia, email na Koncie

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Na szczegółach: gwiazdki, Edytuj (zapis **treści** wyniku), finalize. Globalny formularz opinii (i ten sam kanon na Koncie). Na **Koncie** (start i Moje runy już z Fazy 3): formularz własnego emaila oraz blok opinii. Wylogowanie pozostaje w headerze z Fazy 1.

**Zależność api:** szczegóły implementacji w **`content-chain-backend_major_plan.md`, Faza 10** (`NIE_ROZPOCZĘTY`) — Krok 10.1 (Edytuj / treść wyniku), Krok 10.2 (własny email). Ten major ich nie implementuje. Opinia i gwiazdki / finalize korzystają z istniejącego kontraktu Fazy 5–6 backendu.

**Charakter zmian w api (skrót; pełny opis = backend Faza 10):**

1. Zapis edycji wyniku przyjmuje treść wyniku i **zastępuje** kanoniczny artefakt oraz stawia flagę edycji — pipeline / verifier **nie** startują ponownie. Dotychczasowa semantyka „tylko flaga” nie obowiązuje.
2. Zmiana własnego adresu e-mail jest kontraktem sesji zalogowanego (zajęty adres = konflikt). Nie idzie przez aktualizację cudzego konta przez admina.

Zgodnie z `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md`, `SPEC-FEEDBACK.md`, `SPEC-AUTH.md`, `SPEC-FRONTEND.md`. Powierzchnie przeglądu, opinii i formularza email: **`content-chain-product-ui`**. Kontrakt 10.1 / 10.2: bez tego skilla.

**DoD (faza):**

- Autor może ocenić, edytować treść wyniku i zamknąć przegląd; po zamknięciu kontrolki są zablokowane.
- Po zapisie Edytuj UI pokazuje treść użytkownika jako wynik (gdy api realizuje charakter zmiany powyżej).
- Opinia tekstowa zapisuje się z layoutu i z Konta; select runów to wyłącznie własne zakończone / nieudane — **nie** lista instancji i **nie** Moje runy jako całość statusów.
- Konto nie duplikuje archiwum Runy; Moje runy (Faza 3) prowadzą do istniejącego widoku szczegółów.
- Zmiana własnego emaila działa (gdy api realizuje charakter zmiany powyżej); hasło i usuwanie konta nadal poza MVP.

### Krok 5.1 — Przegląd na szczegółach (ocena, Edytuj, finalize)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Wypełnienie slotu z Fazy 3. Edycja to treść kanonicznego wyniku, nie sama flaga i nie ponowne odpalenie agentów.

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.1 (`NIE_ROZPOCZĘTY`). Ten krok FE zakłada ten kontrakt; nie implementuje api.

**DoD (krok):**

- Gwiazdki 1–5, dobrowolne (brak wyboru = brak oceny); tylko autor, tylko po zakończeniu pracy agenta, dopóki przegląd otwarty.
- Edytuj pozwala zmienić każdą treść wyniku obecnego snapshotu; zapis wielokrotny do finalize; bez diff / historii wersji.
- Zamknięcie przeglądu blokuje ocenę i Edytuj.
- UI nie woła ponownie pipeline’u przy zapisie edycji.

### Krok 5.2 — Globalny formularz opinii

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** CTA z layoutu (slot Fazy 1): aplikacja / agent / run; zapis bez ekranu listy opinii.

**DoD (krok):**

- Formularz zgodny z `docs/ux_dashboard.md` (w tym select agenta i filtr runów autora `completed` \| `failed`).
- Źródło selectu runów ≠ listing Runy instancji i ≠ pełna lista „Moje runy” (wszystkie statusy).
- Globalny CTA zostaje także po dodaniu opinii na Koncie.

### Krok 5.3 — Konto: email i opinia

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Dopełnienie widoku Konto z Fazy 3 o profil email i zapis opinii. Nie zastępuje Runy, startu, Moich runów ani wylogowania. Własny email: implementacja api w `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.2.

**DoD (krok):**

- Formularz własnego emaila; zajęty adres = czytelny konflikt envelope; bez zmiany hasła i bez usuwania konta.
- Opinia tekstowa na Koncie = ten sam kanon co krok 5.2.
- Sidebar Konto ≠ header (login → wylogowanie).

#### Podkrok 5.3.1 — Email

Zmiana własnego adresu.

**Implementacja api:** `content-chain-backend_major_plan.md`, Faza 10 / Krok 10.2 (`NIE_ROZPOCZĘTY`). Ten podkrok FE zakłada ten kontrakt; nie implementuje api.

#### Podkrok 5.3.2 — Opinia na Koncie

Zapis jak globalny CTA; CTA layoutu pozostaje.

---

## MILESTONE 5 — Przegląd, opinia i email

**Opis:** Bramka po Fazie 5. Duży skok: autor zamyka przegląd wyniku, zapisuje opinię, a Konto ma profil email obok startu i własnych runów z Fazy 3. Wolno domknąć admina użytkowników.

**DoD (milestone):**

- Faza 5 spełnia swoje DoD (lub `WYKONANY`).
- Runy nadal = archiwum; Konto = start + własne runy + email + opinia.
- Wylogowanie nadal tylko w headerze (Faza 1).
- Akceptacja przejścia do Fazy 6.

---

## Faza 6 — Użytkownicy i domknięcie UX self-host

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Widok Użytkownicy (tylko admin): lista kont, zaproszenie samym emailem, pending (w tym wygasłe), resend / revoke. Spójność z deep linkiem **`/invite/accept?token=`** z Fazy 1. Sidebar ukrywa Użytkowników przed `user`. Brak sekretów w kliencie. Zgodnie z `docs/ux_dashboard.md`, `SPEC-AUTH.md`, `SPEC-FRONTEND.md`, `docs/security.md`. Widok admina: **`content-chain-product-ui`** (ten sam lock; ekran accept zostaje z Fazy 1).

**DoD (faza):**

- Admin zaprasza bez podawania hasła zaproszonego.
- Lista pending obejmuje wygasłe; resend i revoke działają zgodnie z UX.
- `user` nie widzi widoku Użytkownicy.
- Accept z Fazy 1 + zaproszenie z tej fazy tworzą spójną ścieżkę: mail `{APP_PUBLIC_URL}/invite/accept?token=…` → hasło → logowanie na stronie głównej → dashboard.
- Dashboard MVP jest kompletny względem `docs/ux_dashboard.md` (łącznie z Kontem, archiwum Runy, floating boxem i headerem).

### Krok 6.1 — Widok Użytkownicy (admin)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Lista kont + zaproszenia. Bez edycji / dezaktywacji / soft-delete w UI.

**DoD (krok):**

- Lista kont bez tokenów zaproszeń.
- Zaproszenie: tylko email.
- Pending w tym wygasłe; resend / revoke.
- Brak UI drugiego admina i braku UI soft-delete.

### Krok 6.2 — Spójność zaproszenia z wejściem

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Ścieżka z maila korzysta z ekranu Fazy 1 (`/invite/accept`); po akceptacji nadal karta logowania.

**DoD (krok):**

- Zaproszony nie omija karty logowania.
- Komunikaty błędów tokenu / hasła są spójne z docs auth (envelope as-is).

### Krok 6.3 — Role w chrome i zamknięcie klienta

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Ostateczna zgodność sidebara i headera z rolami; brak wycieku sekretów.

**DoD (krok):**

- `user` nie ma pozycji Użytkownicy; ma Kontekst (odczyt), Runy (archiwum), Konto, header z loginem, floating box poza Kontem.
- Admin ma to samo plus Użytkownicy i edycję kontekstu.
- Klient pozostaje bez sekretów LLM / bramy i bez URL-a api w `NEXT_PUBLIC_*`.

---

## MILESTONE 6 — Dashboard MVP frontendu

**Opis:** Bramka zamykająca ten plik (po Fazie 6). Duży skok: cienki klient self-host realizuje kanon `docs/ux_dashboard.md` — od karty logowania i BFF po Konto (start + live), archiwum Runy, szczegóły, opinię, floating box i zaproszenia — bez wchodzenia w zakres V1 ani w implementację api w tym majorze.

**DoD (milestone):**

- Faza 6 spełnia swoje DoD (lub `WYKONANY`).
- Fazy 1–6 mają status `WYKONANY` albo równoważnie spełnione obowiązkowe DoD.
- Wejście, BFF, header (login → wylogowanie, zawartość do prawej), sidebar, Kontekst, Konto (start / Moje runy / email / opinia), Runy (archiwum), szczegóły (live / HITL / wynik / przegląd), floating box, Użytkownicy (admin) i zapis opinii są obserwowalne w produkcie.
- Język wizualny od Fazy 1 przez Fazę 6 jest jednym lockiem (`content-chain-product-ui`); brak drugiej palety i brak landingowych wzorców.
- Świadomie poza tym majorem pozostaje to, co zapisano na wstępie (m.in. panel odczytu opinii, hasło zalogowanego, testy FE, next-intl, limit per-user). Zmiany api pod ten major: `content-chain-backend_major_plan.md`, Faza 10 (10.1 / 10.2 / 10.3).
- Akceptacja zamknięcia majoru frontendowego.
