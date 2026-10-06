---
wersja: 17
data_utworzenia: 2026-09-17
data_modyfikacji: 2026-10-06
---

# UX Dashboard — Content Chain

Kierunek UI self-host (`apps/frontend`) dla MVP. Bez specyfikacji pikseli / design systemu — widoki, stany i zachowanie względem API/SSE.

Powiązane: `dokumentacja_koncepcyjna.md`, `dokumentacja_komunikacji.md`, `data_flow.md`, `security.md`, `observability.md`.

Zmiana względem: shell dashboardu rozciągał sidebar do pełnej wysokości treści (chipy demo / agenci na dole wymagają długiego scrolla). Od tej wersji: layout zalogowany = **viewport shell** (`h-dvh`, overflow ukryty na rootcie); **scroll tylko w obszarze roboczym** (`main`); sidebar + chipy zawsze w viewportcie. **Moje runy** na Koncie: **paginacja UI** `pageSize = 10` (jak lista Runy) — slice po stronie FE; `GET /runs/user/:userId` nadal zwraca **całą** listę (SSE / floating box / select opinii).

Zmiana względem: chip „Agenci aktywni” = wyłącznie `completeness.complete`. Od tej wersji: `agentsActive` = completeness **∧** `gatewayAlive` (api `/health/ready`); copy nieaktywnego kanoniczne; disable CTA na obu powierzchniach startu; kropki zakładek nadal tylko z `completeness.missing`; odświeżanie bez interval (mount + refetch przy okazji).

Zmiana względem: przegląd otwarty do ręcznego „Zamknij przegląd” bez limitu. Od tej wersji: disable gdy `reviewFinalizedAt !== null` **albo** minął serwerowy `reviewExpiresAt`; copy jak po ręcznym finalize („Przegląd zamknięty”); **bez** countdownu / wiersza „dostępne do…”; FE **nie** wylicza TTL lokalnie z `pipelineFinishedAt`.

Zmiana względem: brak modala potwierdzenia przed Stop w roboczym `cancel-run-state.md` — **unieważnione**. Obowiązuje modal **„Czy na pewno?”** (Tak = API cancel; Nie = zamknięcie, zero API). Archiwum Runy bez `cancelled` → z `cancelled` (`completed` \| `failed` \| `cancelled`). Floating box: po `cancelled` krótko label **„Anulowany”**, potem ukrycie pozycji po **200 ms** (doprecyzowanie kanonu „krótko pokazuje, potem się ukrywa”).

Zmiana względem: błędy API w UI jako **`code` + `message`**. Od tej wersji w UI obowiązuje wyłącznie **`message`** z envelope (`code` zostaje w HTTP do logiki klienta).

Zmiana względem: nieaktywne „Zarejestruj się!” / zakaz otwartego signup. Od tej wersji: aktywna rejestracja (prod i DEMO), strona podziękowań + resend w `production`, deep link aktywacji → logowanie + toast; invite zostaje.

Zmiana względem: UX milczał o chipie demo / lockach `guest`. Od tej wersji: `DemoModeChipSlot` **nad** CompletenessChip — **tylko dashboard**, gdy `demoMode === true`; locki UI wyłącznie `role === guest` **i** `demoMode === true`; modal limitu **po** błędzie quota z API; archiwum lista całej instancji, cudzy detail zablokowany; signup / thank-you / activate **bez zmian** flow względem planu register. **Uwaga nazewnictwa:** istniejący `GuestView` w home-entry = stan **anonimowy** (login/register) — **nie** mylić z rolą `guest`.

Zmiana względem: Faza 18 — invite → zawsze `user` także przy demo. Od tej wersji: po zaproszeniu + loginie na instancji demo konto ma `role=guest` → **te same locki** co po self-register (`session.role === 'guest'` ∧ `demoMode`). Accept flow (hasło → `/` → login, bez cookie) **bez zmian**. **Bez** pickera roli na invite. Zaproszony w demo = gość sandboxu, nie pełny członek zespołu.

## Założenia UX

- Cienki klient: reguły i pipeline w `apps/api`.
- Język **UI: polski** (generowane treści SM: PL/EN wg briefu runu).
- Nawigacja: **sidebar** + **header** + obszar roboczy (po zalogowaniu). Sidebar = widoki. Header = tożsamość sesji (login) i wylogowanie.
- **Layout dashboardu (po sesji):** wysokość = viewport (`h-dvh`); root **bez** scrolla dokumentu; **scroll wyłącznie w `main`** (obszar roboczy). Sidebar (desktop) = wysokość viewportu — nawigacja u góry, **DemoChip** (gdy demo on) + chip agentów u dołu sidebara **zawsze w viewportcie** (bez konieczności scrollowania treści widoku). Mobile: sidebar w sheet; scroll treści jak na desktopie w obszarze roboczym.
- Live run: status **na żywo (SSE)**, wizualnie **animowany / czytelnie atrakcyjny** (nie suchy sam tekst „running”).
- Sesja: wyłącznie cookie httpOnly (`cc_access` / `cc_refresh`); probe tożsamości: `GET /api/v1/auth/me`.

## Wejście: strona główna (logowanie), rejestracja, sesja

**Strona główna** (brak ważnej sesji): tło + karta z formularzem logowania (email, hasło, CTA logowania) oraz przycisk **„Nie masz konta? Zarejestruj się!”** pod formularzem. Przycisk jest **aktywny**, gdy `bootstrap-status.available === false` (produkcja pełna i DEMO — **nie** zależy od `demoMode` / `DEMO_MODE`). Przy first-run (`available === true`) rejestracja jest **ukryta / disabled** — pierwsza ścieżka to bootstrap admina. Dashboard (sidebar) **tylko** po udanej sesji — nigdy jako pierwsza treść niezalogowanego.

Komponent home-entry **`GuestView`** = widok **anonimowy** (karta logowania / register). **Nie** jest to rola `UserRole.guest`.

| Ekran / krok | Kiedy | Zachowanie |
|--------------|-------|------------|
| **Strona główna — logowanie** | Brak ważnej sesji i `bootstrap-status.available === false` | Ten sam widok; submit → `POST /auth/login` → dashboard |
| **Strona główna — first-run (tryb)** | Brak ważnej sesji i `bootstrap-status.available === true` | **Ten sam widok** (nie osobna strona). Submit tego samego formularza → `POST /auth/bootstrap-admin` (pierwszy admin) → sesja cookie jak po loginie → dashboard. Przycisk „Zarejestruj się!” **ukryty / disabled** |
| **Rejestracja** | Klik „Zarejestruj się!” (tylko gdy bootstrap niedostępny) | Formularz: email, hasło, **powtórz hasło** (confirm tylko UI — API dostaje `{ email, password }`). Submit → `POST /auth/register` |
| **Po register — `production`** | Udany **201** z `verifiedAt: null` **lub** **503** `MAIL_DELIVERY_FAILED` po utworzeniu pending User (`NODE_ENV=production`) | **Bez** sesji / Set-Cookie. Przejście / **pozostanie** na **stronie podziękowań**: copy sukcesu + „Nie otrzymałeś wiadomości e-mail?” + button **„Wyślij ponownie”** → `POST /auth/resend-activation` z `{ email }` ze **stanu formularza / klienta** (nie z body **201**). Sygnał thank-you po **201**: `user.verifiedAt === null`. Opcjonalne copy o ograniczeniach gościa (gdy demo) **nie** zmienia flow aktywacji |
| **Po register — poza `production`** | Udany **201** z `verifiedAt` ustawionym (ISO) | Konto gotowe od razu; krótki sukces → widok logowania (**bez** obligatoryjnego thank-you + resend pod mail) |
| **Kolizja email (409)** | `POST /auth/register` → **409** `CONFLICT`, `message`: **`Email already in use`** | **Zostajemy na formularzu rejestracji**; jawny błąd przy polu email (zmiana adresu + ponowny submit). **Bez** thank-you, **bez** udawania sukcesu |
| **Aktywacja z maila** | Deep link **wyłącznie** `{APP_PUBLIC_URL}/?activationToken=…` (mail / opcjonalny log DX) | **Natychmiast** widok logowania (strona główna `/`); w tle `POST /auth/activate` z tokenem z query; po sukcesie **toast** na `/`: „Konto aktywowane! Możesz się zalogować.” (**wyjątek** od „Toaster tylko po sesji”). Błąd activate (**401**) → **ogólny** komunikat na karcie logowania (bez rozróżniania przyczyn). **Bez** dashboardu; **bez** Set-Cookie po activate |
| **Akceptacja zaproszenia** | Publiczny **deep link** `{APP_PUBLIC_URL}/invite/accept?token=…` (mail / log dev); nie strona główna | Formularz **pierwszego** hasła → `POST /auth/accept-invite` → **powrót na stronę główną (logowanie)**. Brak Set-Cookie po accept; dashboard dopiero po `POST /auth/login` |
| **Probe sesji** | Start aplikacji / reload | `GET /auth/me` → przy **401** `UNAUTHORIZED`: `POST /auth/refresh` → ponownie `GET /auth/me` → przy kolejnym **401** `UNAUTHORIZED`: strona główna (logowanie; tryb bootstrap gdy `available`). **401** `INVALID_PASSWORD` (re-auth email) **nie** dotyczy tego wiersza |

Zmiana względem: osobne ekrany first-run vs logowanie; wejście na dashboard bez przejścia przez kartę logowania jako stronę główną. Od tej wersji jeden widok główny = logowanie (+ **aktywna** rejestracja gdy bootstrap niedostępny); first-run to tryb submitu na tej karcie.

Zmiana względem: nieaktywne „Zarejestruj się!” / zakaz signup. Invite `/invite/accept?token=` **bez zmian sensu**. Confirm e-mail przy zmianie adresu (`PATCH /auth/me/email`) pozostaje **V1** — **nie** mylić z aktywacją przy rejestracji.

**Header dashboardu (od pierwszego layoutu po sesji):** pasek nad obszarem roboczym na **wszystkich** widokach zalogowanych. Elementy **wewnątrz headera wyrównane do prawej**.

Hierarchia sterowania tożsamością:

1. Widoczny **login** zalogowanego (email z `GET /auth/me`) jako **przycisk** (kontrolka nadrzędna).
2. Z tego przycisku — **„Wyloguj się”** (pozycja menu / rozwinięcie; nie osobny wiersz sidebara i nie luźny przycisk obok loginu bez tej hierarchii).

Klik **„Wyloguj się”** → **modal potwierdzenia** → **Tak** → `POST /auth/logout` → nawigacja na **`/`** (karta logowania). **Nie** / zamknięcie modala zostawia użytkownika w dashboardzie. Wylogowanie **nie** zastępuje widoku Konto i **nie** żyje w sidebarze.

Zmiana względem: „Wyloguj się” w chrome (sidebar **lub** header), bez wskazania miejsca ani hierarchii login → wylogowanie.

**Konto (MVP):** osobny widok w sidebarze (admin, `user` i `guest` przy demo on) — profil, **własne** runy (live) i formularz startu runu (**inline**). Druga powierzchnia startu = CTA **„Uruchom agenta”** na widoku **Runy** (modal, ten sam brief). Nie mylić Runy z listą live — Runy pozostają archiwum `completed` \| `failed` \| `cancelled`. Szczegóły: sekcje „Widok: Konto” i „Widok: Runy”.

## DEMO MODE — chip i locki

Boot zalogowanego: publiczny `GET /api/v1/config` → `{ demoMode }`. Egzekucja limitów = API; FE odzwierciedla.

| Element | Kiedy | Zachowanie |
|---------|-------|------------|
| **`DemoModeChipSlot` / DemoChip** | **Tylko dashboard** (layout po sesji), gdy `demoMode === true` | Slot **nad** CompletenessChip. Copy w stylu **„Tryb demo aktywny / Wybrane funkcje ograniczone”** + Iconify. Przy `demoMode === false` chip **nie** jest widoczny (bez ostrzeżeń ops w UI) |
| Completeness chip | bez zmian | Demo **nie** zastępuje bramki kontekstu ani chipa kompletności |
| **Locki UI** | wyłącznie `session.role === 'guest'` **AND** `demoMode === true` | Sidebar (np. Użytkownicy ukryte/disabled), formy (email na Koncie, Edytuj, finalize, write kontekstu), disable `taskType` poza allowlistą (`post_ideas`, `page_copy`, `page_outline_then_copy`). Dotyczy gościa z **self-register** oraz z **accept-invite** przy demo on (ten sam predykat). **Admin** na instancji demo **bez** locków |
| **GuestLimitModal** | po **403** quota z `POST /runs` (`GUEST_TYPE_QUOTA_EXCEEDED` / `GUEST_GLOBAL_QUOTA_EXCEEDED` / `GUEST_TYPE_NOT_ALLOWED`) | Modal **po** odpowiedzi API (nie pre-empt). CTA kontakt: tablica `{ iconName, contactData }[]` (mailto, LinkedIn, GitHub) — hardcoded FE |
| Archiwum | `guest` + demo | Lista **całej** instancji jak admin/`user`; klik wiersza **cudzego** runu — zablokowany (FE + API **403**) |
| Rating **429** | `guest` soft cap | `message` z envelope przy kontroli oceny (nie toast walidacji) |

Zmiana względem: pozycja „Konto” tylko jako wylogowanie, bez podstrony i bez zmiany email.

Zmiana względem: **jedyny** formularz startu wyłącznie na Koncie (kanon Fazy 3). Od tej wersji **dwie** powierzchnie tego samego formularza (Konto inline + Runy modal). Powód: pierwsze testy UI w przeglądarce.

## Nawigacja (sidebar)

| Widok | Kto | Cel |
|-------|-----|-----|
| **Kontekst firmy** | admin: edycja; user i guest: podgląd | Uzupełnienie sekcji bramki (tylko admin); podgląd completeness |
| **Runy** | admin, user, guest (demo) | **Archiwum firmy:** tylko runy instancji w `completed` \| `failed` \| `cancelled` (paginacja 10, najnowsze pierwsze). Klik wiersza → szczegóły (snapshot; **bez** SSE) — **guest: tylko własne**. CTA **„Uruchom agenta”** → modal z tym samym briefem co na Koncie (guest: typy poza allowlistą disabled). Cudzy run w toku **nie** jest na tej liście. Nowy run po starcie **nie** wpadnie na listę, dopóki nie jest terminalny (live = floating box) |
| **Run (szczegóły)** | admin, user; guest tylko `startedBy === self` | Podstrona po kliknięciu w **Moich runach** (Konto) albo w archiwum Runy: logi, HITL, wynik, przegląd; **Stop** na własnym nieterminalnym. Guest: **bez** Edytuj / finalize. Live SSE tylko gdy run jest własny i w `running` / `awaiting_hitl` / `interrupted`. **Bez** CTA startu |
| **Konto** | każdy zalogowany | Własny email (**guest: lock** — bez `PATCH /auth/me/email`); **Moje runy** (wszystkie statusy, live; **paginacja UI** 10 jak Runy; **Stop** na własnym nieterminalnym); **start** nowego runu (**inline**, ten sam brief co modal na Runach; guest: allowlista); opinia tekstowa. Po udanym `POST /runs` **z tego widoku** — **ten** widok (nie od razu pojedyncze szczegóły) |
| **Użytkownicy** | tylko admin | Lista kont + **zaproszenie (email)**; lista pending (w tym wygasłe); resend/revoke. **W zakresie MVP** dashboardu. Bez edycji / dezaktywacji / soft-delete kont w UI MVP. **Guest: brak nawigacji** (lock) |

**Wyloguj się** nie jest pozycją sidebara — wyłącznie hierarchia przycisku loginu w headerze (wyżej).

Zmiana względem: **Runy** = cała instancja (wszystkie statusy) + start; po starcie → szczegóły tego `runId`; sygnał „w toku” = chip w chrome. Od Fazy 3: Runy = archiwum terminalne; start i live = Konto; chrome = floating box (niżej).

Zmiana względem Fazy 3 („Bez formularza startu” na Runach; jedyny start = Konto): od tej wersji Runy zostają archiwum **oraz** mają CTA/modal **„Uruchom agenta”**; Konto **zostaje** powierzchnią startu. Live własnych runów nadal = Konto + box, nie lista archiwum.

**Globalny CTA (po zalogowaniu):** przycisk **„Zostaw opinię”** (równoważny label: „Oceń aplikację”) — dostępny z layoutu (np. sidebar / header), nie tylko ze szczegółów runu. Otwiera formularz opinii tekstowej (niżej). Panel administracyjny odczytu opinii = **V1 — rozbudowa** (MVP = zapis).

## Globalny wskaźnik: czy agenci są aktywni

Stały element UI (chip w sidebarze — pod nawigacją, nad dołem chrome’u), widoczny na wszystkich widokach po zalogowaniu. Dzięki viewport shellowi (założenia UX) chip **nie** „ucieka” poza pierwszy ekran przy długiej treści obszaru roboczego.

**Predykat:** `agentsActive` ⇔ `contextComplete` **∧** `gatewayAlive`.

| Sygnał | Źródło | Znaczenie |
|--------|--------|-----------|
| `contextComplete` | `GET /company-context/completeness` → `complete === true` | Bramka kontekstu w DB |
| `gatewayAlive` | `GET /api/v1/health/ready` → `checks.gateway.status === "healthy"` | Proces gateway żyje (api probe upstream **liveness**; **nie** pełny readiness config/redis/cache) |

| Stan | Warunek | Przekaz (PL) |
|------|---------|--------------|
| **Agenci aktywni** | `agentsActive` | Można uruchamiać runy produktowe (Social i Content) |
| **Agenci nieaktywni / zablokowani** | `!agentsActive` | **„Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.”** |

**Detale remedacji (obok copy kanonicznego):**

| Sytuacja | UI |
|----------|-----|
| `complete === false` | Wolno **dodatkowo** pokazać listę `missing` + link „Uzupełnij kontekst” |
| `complete === true` a gateway nie żyje | **Bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji — wystarczy copy kanoniczne |

**Odświeżanie:** jak completeness — **mount + refetch przy okazji** (np. po udanym zapisie kontekstu / wspólnym `refetch` providera). **Bez** interval pollingu.  
**Zakaz:** FE → gateway (wyłącznie BFF → `apps/api`).

CTA **„Uruchom agenta”** (Konto — submit formularza; Runy — przycisk otwierający modal **oraz** submit w modalu) disabled + tooltip, gdy `!agentsActive`. Twarda bramka api na `POST /runs` pozostaje **409** `CONTEXT_INCOMPLETE` przy niekompletnym kontekście — **bez** nowego rejectu „gateway down” na starcie runu (UI nie jest jedyną bramką kontekstu; brak gateway = disable CTA, nie osobny kod HTTP startu).

## Floating box: własne runy w toku

**Obowiązkowy** drugi sygnał w MVP — **nie** chip w chrome i **nie** stos chipów. Dotyczy wyłącznie runów **zalogowanego** (`GET /runs/user/:userId`) w `running` \| `awaiting_hitl` \| `interrupted`.

| Stan UI | Zachowanie |
|---------|------------|
| Widok **Konto** | Box **ukryty** — live jest listą „Moje runy” |
| Inny widok po sesji (Kontekst, Runy, szczegóły, Użytkownicy, …) | **Floating box**: pozycja per taki run (status + skrót meta + link do szczegółów). Copy: `running` / `awaiting_hitl` — „Trwa run…”; `interrupted` — **inne** („Przerwany — wznowienie przy wolnym slocie”). **Bez** przycisku **Stop** (Stop tylko na Moich runach / szczegółach). HITL / wynik / przegląd **nie** żyją w boxie (tylko na szczegółach). Box można **zwinąć** do mniejszej wersji i rozwinąć |
| `queued` | **Bez** pozycji w boxie i **bez** SSE. Widać na Koncie ze snapshotu GET |
| Po `cancelled` | Pokazać krótko status **„Anulowany”**, potem **ukryć / zamknąć pozycję po 200 ms** (nie trzymać anulowanego runu w boxie) |

Live: **N×** `EventSource` na `GET .../runs/:runId/events` (istniejący kontrakt per `runId`; **bez** nowego endpointu SSE). Rejestr połączeń w layoutcie zalogowanym (jedno połączenie na `runId`). `queued` nie otwiera socketa. Po `completed` / `failed` / `cancelled` — `close()`; przy `completed`/`failed` zniknięcie z boxa od razu; przy `cancelled` — label „Anulowany” → ukrycie po **200 ms** (zakończony wpadnie do archiwum Runy przy następnym odświeżeniu). Toast terminalu **nie** zatrzymuje boxa: box i tak znika (po delay przy cancel); toast zastępuje **ciszę**, nie pozycję boxa (sekcja „Feedback zdarzeń”).

Cudzy run w toku **nie** ma sygnału w chrome (archiwum Runy go też nie pokazuje).

Zmiana względem: drugi sygnał = chip w chrome (instancja, w tym cudze); lista Runy niosła wszystkie statusy na żywo.

## Feedback zdarzeń (toast)

Trzy kanały — **nie wolno** ich zlewać:

| Kanał | Powierzchnia | Czas życia |
|-------|--------------|------------|
| **Dzieje się** | Moje runy, floating box, status na szczegółach + SSE | dopóki status live |
| **Wydarzyło się** | Toast (Sonner) w layoutcie **po sesji** | sekundy; **nie** store, **nie** GET |
| **Request padł przy formularzu / bloku** | envelope: `message` w miejscu błędu | dopóki operator nie poprawi / nie zejdzie |

**Zmiana względem:** wcześniej brak warstwy „wydarzyło się”; jedyny sygnał poza envelope to live (box / Moje runy) i zmiana wiersza po 202. Od tej wersji toast **zastępuje ciszę** po udanej mutacji oraz po terminalu runu poza szczegółami — **nie** zastępuje boxa, chipa, kropek ani envelope.

Po `completed` / `failed` floating box **nadal znika**; po `cancelled` — krótko „Anulowany”, potem ukrycie po **200 ms**. Chip / kropki / box **zostają** w kanonie. Toast **nie** jest źródłem prawdy statusu ani powodu `failed` — po reloadzie obowiązuje GET run / GET logs. `failed` na szczegółach: status + logi z powodem **zostają** (sekcja „Widok: Run (szczegóły)” i „Stany puste i błędy”). `cancelled` na szczegółach: status anulowany przez operatora (nie błąd pipeline).

### Mapa MVP minimum

Sukces toasta: **polski**, krótki tytuł. Błąd w toaście **tylko** gdy na tym evencie nie ma powierzchni envelope (w MVP minimum: **brak** takiego przypadku przy mutacjach formularza — 400/409 zostają przy polu). Gdy toast błędu kiedyś wejdzie (poza formularzem): **`message`** z envelope, **bez** mapy PL i **bez** pokazywania `code`.

| Zdarzenie | Toast? | Copy (sukces) / zachowanie |
|-----------|--------|----------------------------|
| `PUT /company-context` **200** | tak | „Kontekst zapisany” |
| `PUT /company-context` **400** (walidacja / bramka) | **nie** | envelope + `details` przy formularzu |
| `POST /runs` **202** | tak | „Run wystartował” (zostajemy na widoku, z którego wystartowano: Konto albo Runy; modal na Runach się zamyka). Live nowego runu: na Koncie = wiersz „Moje runy”; na Runach = floating box (lista archiwum **bez** nowego wiersza) |
| `POST /runs` **409** `CONTEXT_INCOMPLETE` / **400** | **nie** | envelope na formularzu startu (także w modalu na Runach) |
| `POST /runs` **403** quota guest (`GUEST_*`) | **nie** (toast) | **GuestLimitModal** + kontakty (po odpowiedzi API) |
| `POST /runs` **403** quota guest (`GUEST_*`) | **nie** (toast) | **GuestLimitModal** + kontakty (po odpowiedzi API) |
| `POST .../cancel` **200** | tak | **„Run anulowany”** (zostajemy na widoku źródłowym). Gdy operator **nie** jest na `/runs/:runId` **tego** runu — toast z akcją **Szczegóły**. Gdy **jest** na szczegółach tego runu — toast mutacji bez nawigacji; SSE terminal **nie** dubluje (dedup per `runId`) |
| SSE `run.completed` / `run.failed` / `run.cancelled` **i** operator **nie** jest na `/runs/:runId` **tego** runu | tak | „Run zakończony” / „Run nieudany” / **„Run anulowany”** + akcja **Szczegóły** (link); `notifyRunTerminal` z dedupem względem toasta mutacji cancel |
| SSE terminal **na** `/runs/:runId` tego runu | **nie** | status + logi na szczegółach (bez dublowania toasta mutacji) |
| GET listy / snapshot / completeness (błąd strony) | **nie** | envelope w bloku |
| Pulse `running`, `run.log`, heartbeat | **nie** | box / szczegóły |
| Login / bootstrap / accept-invite / register | **nie** | envelope na karcie (brak Toastera poza sesją) |
| Sukces `POST /auth/activate` (deep link na `/`) | **tak** | „Konto aktywowane! Możesz się zalogować.” — **jedyny** wyjątek Toastera poza sesją |
| Błąd `POST /auth/activate` | **nie** | ogólny komunikat na karcie logowania |
| `awaiting_hitl` | **nie** (MVP) | box już zmienia copy; HITL później na tym samym prymitywie |

Później (HITL, opinia, zaproszenia): **ten sam** kanał toasta, nadal **nie** toast na walidację przy polu. **`PATCH /auth/me/email` (zmiana własnego emaila):** sukces **bez** toastu; błędy hasła (`INVALID_PASSWORD`) / `VALIDATION_FAILED` / **409** — wyłącznie pod polami w modalu re-auth (nie toast). **401** `INVALID_PASSWORD` **nie** uruchamia cyklu refresh / wylogowania.

Toaster wyłącznie w gałęzi zalogowanej (warstwa toast w chrome; nie zasłania headera — np. `top-right`; floating box zostaje `bottom-right`) — **wyjątek:** toast po udanym activate na niezalogowanym `/` (aktywacja e-mail).

Zmiana względem wersji 12: wyjątek Toastera na `/` po sukcesie activate; sygnał thank-you = `verifiedAt === null`; activate-fail bez **409**.

## Widok: Kontekst firmy

Formularze w **zakładkach** (nie jeden ciąg sekcji na stronie). Dokładnie **sześć** zakładek, **bez** zagnieżdżeń i **bez** podzakładek:

| Zakładka | Zawartość | Indykator bramki |
|----------|-----------|------------------|
| **Tożsamość** | Sekcja bramki `identity` | tak |
| **Oferta** | Sekcja bramki `offer`: ≥ 1 kompletna usługa (nazwa + opis + ≥ 1 korzyść); hint formularza zgodny z tym minimum | tak |
| **Głos SM** | Sekcja bramki `voice` | tak |
| **CTA / kanały** | Sekcja bramki `cta` | tak |
| **Odbiorca** | Sekcja bramki `audience` | tak |
| **Dodatki** | Całe **`extras`** (case studies, obiekcje, hashtagi, catalogNotes, performanceNotes) w **jednym** panelu | **nie** |

- Wejście na widok: otwarta zakładka **Tożsamość**.
- Dodatki: admin może edytować; **nie** blokują „Agenci aktywni”.
- Na triggerze każdej zakładki **bramki**: indykator kompletności — **zielona** kropka, gdy klucz sekcji **nie** jest w `missing`; **czerwona**, gdy jest. Źródło: **wyłącznie** `completeness.missing` z ostatniego **udanego** `GET` / `PUT` kontekstu — **nie** stan gateway / `health/ready`. Kropki = kompletność sekcji; chip „Agenci aktywni” = completeness **∧** `gatewayAlive`. **Nie** z niezapisanego draftu i **nie** z lokalnej kopii `isComplete` jako źródła kropek / chipa.
- Zakładka Dodatki: **bez** kropki bramki.
- Kolor nie jest jedynym sygnałem (etykieta dostępności: kompletna / niekompletna).
- Zapis: jeden `PUT` całego kontekstu (wszystkie zakładki, także nieaktywna); tylko admin; `user` i `guest` — read-only z komunikatem. CTA zapisu dostępne na każdej zakładce.
- CTA zapisu **nie** przechodzi, gdy którekolwiek wymagane pole bramki jest puste albo oferta zawiera kaleką usługę (pozycja częściowo wypełniona). Placeholder pustej oferty **nie** jest usługą — strip przed PUT; kalekiej pozycji **nie** stripujemy (blokada submitu + błąd przy pozycji).
- Nie da się usunąć ostatniej kompletnej usługi tak, by lista spadła do 0 i poszła w PUT.
- Copy / hint oferty: minimum = nazwa + opis + ≥ 1 korzyść biznesowa (każda pozycja kompletna).

Zmiana względem: jeden widok ciągiem z tekstem „Kompletna” / „Niekompletna” przy nagłówku sekcji. Od zakładek: kropki na triggerach bramki; extras w jednej zakładce Dodatki bez kropki. Od tej wersji: zapis zablokowany przy pustym wymaganym polu / kalekiej ofercie; źródło kropek i chipa **bez zmiany** (ostatni udany GET/PUT, nie draft).

## Widok: Runy (archiwum firmy)

- Źródło: `GET /api/v1/runs?status=completed,failed,cancelled` — **zakończone, nieudane i anulowane runy całej instancji** (jeden listing, sort `createdAt` desc). Query `status` przyjmuje jedną wartość **albo** listę rozdzieloną przecinkiem (`docs/dokumentacja_komunikacji.md`).
- Kolumny listy: `runId`, typ tasku, platforma (lub `web` przy page_*), `contentKind` gdy page_*, język, status, `createdAt`, email inicjatora (`startedBy.email`).
- Paginacja: **10** na stronę, najnowsze pierwsze; stały rozmiar strony.
- Filtry MVP na archiwum: `taskType` (post_*, reel_*, page_*), platforma (w tym `web`), użytkownik inicjujący (`userId`). Filtr statusu **tylko** w zbiorze `completed` \| `failed` \| `cancelled` (albo dowolny podzbiór — domyślnie cały trójkąt).
- CTA **„Uruchom agenta”** (admin, `user` i `guest` przy demo) otwiera **modal** z tym samym formularzem briefu co na Koncie (pola wg `taskType`; bez `selectedIdeaIds`). Guest: typy poza allowlistą **disabled**. Draft w modalu jest **pusty** — **bez** prefillu z wiersza archiwum (prefill zostaje na Koncie, z „Moich runów”). Tytuł modalu: **„Uruchom agenta”**.
- Po **202** z modalu: zostajemy na Runach, modal się zamyka, toast „Run wystartował”; live nowego runu = **floating box**. Lista archiwum **nie** dostaje nowego wiersza, dopóki run nie jest `completed` \| `failed` \| `cancelled`.
- **Bez** SSE i **bez** pokazywania `queued` / `running` / `awaiting_hitl` / `interrupted` na tej liście.
- Odświeżanie: przy **wejściu** na widok oraz co **15 minut**, gdy widok jest otwarty. To **nie** jest kanał live statusu (`SPEC-FRONTEND.md`).
- **Nawigacja:** klik wiersza → **Run (szczegóły)** — snapshot GET; EventSource **nie** otwierać (status terminalny). Szczegóły **bez** CTA startu. **Guest:** klik cudzego wiersza **zablokowany** (brak nawigacji + API 403).

Zmiana względem: Runy = wszystkie statusy instancji + start + wejście w live z tej listy. Od Fazy 3: archiwum terminalne **bez** startu.

Zmiana względem Fazy 3 („Bez formularza startu na tym widoku (start = Konto)”): od tej wersji archiwum **zostaje** terminalne (bez SSE / bez w toku na liście) **oraz** ma CTA/modal **„Uruchom agenta”**. Ten sam brief co Konto; po `202` widok źródłowy. Powód: pierwsze testy UI w przeglądarce.

## Widok: Konto

Osobna pozycja sidebara (admin, `user`, `guest`). **Nie** zastępuje widoku Runy.

| Blok | Zachowanie |
|------|------------|
| **Email** | Formularz nowego adresu → **Zapisz email** → **zawsze** modal: pole email (prefill = draft, **disabled**) + pole aktualnego hasła + Anuluj / Potwierdź. Potwierdź **zawsze** → `PATCH /api/v1/auth/me/email` `{ email, currentPassword }` (brak stanu „już zweryfikowany”). **Guest (`role === guest` i demo on):** blok **zablokowany** (brak PATCH — API **403**). Złe hasło (**401** `INVALID_PASSWORD`) / `VALIDATION_FAILED` hasła → `message` **pod polem hasła**; stan disabled emaila **bez zmian** (przed 409: zostaje **disabled**; **po 409**: zostaje **odblokowany**); **bez** toastu; **bez** refresh/wylogowania przy `INVALID_PASSWORD`. **409** `CONFLICT` → modal **otwarty**; **czyszczenie** pól email + hasło; **odblokowanie** inputu email; błąd **pod polem email**; ponowny Potwierdź znowu z hasłem. Sukces → zamknięcie modala, odświeżenie sesji (`GET /auth/me`), aktualizacja wyświetlanego emaila, **bez** toastu. Anuluj → zamknięcie modala, **zero** API; draft na formularzu Konta bez zmian względem otwarcia (edycja w modalu po 409 nie wraca na formularz). CTA „Zapisz email” **nie** jest disabled wyłącznie dlatego, że adres = obecny (re-auth i tak wymagany). **Bez** self-service zmiany hasła i **bez** usuwania konta na tym widoku |
| **Moje runy** | Źródło: `GET /api/v1/runs/user/:userId` (`:userId` z `/auth/me`) — **wszystkie** statusy zalogowanego (**pełna** lista z API; **bez** `page` / `pageSize` na HTTP). **Paginacja UI:** stałe **`pageSize = 10`** (jak archiwum Runy), kontrolki **Poprzednia** / `strona / totalPages (total)` / **Następna** — slice po stronie FE; API i rejestr SSE / floating box nadal widzą pełny zbiór. Live: SSE per `runId` wyłącznie dla `running` \| `awaiting_hitl` \| `interrupted` (rejestr layoutu). `queued` i terminalne: snapshot GET (wejście na Konto, po `POST /runs`, po evencie SSE innego własnego runu, focus okna). Przycisk **Stop** na wierszu **własnego** runu w statusie nieterminalnym (`queued` \| `running` \| `awaiting_hitl` \| `interrupted`) → modal **„Czy na pewno?”** → **Tak** = `POST .../cancel`; **Nie** = zamknięcie modala, **zero** API. Po sukcesie: odświeżenie wiersza (`cancelled`); `queued` bez SSE. Klik wiersza → **Run (szczegóły)**. Pełny wynik / HITL / przegląd na szczegółach, nie na liście |
| **Start runu** | Formularz startu **inline** (ten sam brief co modal **„Uruchom agenta”** na Runach — nie drugi kontrakt). Select `taskType` obejmuje rolki i page_*; **`contentKind` gdy page_***; **platforma ukryta/disabled gdy page_***; język. **Guest:** typy poza `post_ideas` / `page_copy` / `page_outline_then_copy` **disabled**. Brief **zależny od `taskType`**: post_* / reel_* — temat + opcjonalnie grupa, cel, **liczba pomysłów** (bez kąta/długości); `page_*` — temat + opcjonalnie grupa, cel, **kąt**, **długość słów** (bez liczby pomysłów). CTA nie jest polem briefu. **Bez** `selectedIdeaIds`. Start disabled + wyjaśnienie, gdy agenci nieaktywni. Z wiersza **Moje runy**: **nowy** run z prefill `taskType` + brief + platforma/`contentKind` **ze snapshotu** `GET /runs/:runId` (lista user **nie** niesie `brief` / `contentKind`). Prefill **nie** dotyczy wiersza archiwum Runy. Po **202** **z tego widoku**: zostajemy na Koncie (nowy wiersz); nie wymuszamy od razu szczegółów |
| **Opinia tekstowa** | Na Koncie dostępny zapis opinii (`POST /feedback`) — ten sam kanon co globalny CTA „Zostaw opinię” (aplikacja / agent / run; select runów: własne `completed` \| `failed` \| (`cancelled` **z** nie-`null` polem wyniku w snapshotcie)). Globalny CTA w layoutcie **zostaje** |

Wylogowanie **nie** żyje na widoku Konto — header: przycisk loginu → „Wyloguj się” + modal, od pierwszego layoutu.

Zmiana względem: Moje runy = pełna tabela bez paginacji UI. Od tej wersji tabela na Koncie = strony po 10 (FE); kontrakt `GET /runs/user/:userId` **bez zmiany**.

Zmiana względem: Konto = tylko logout / brak podstrony; zmiana email poza MVP; własne runy tylko jako select w formularzu opinii; start na widoku Runy; po starcie → szczegóły. Od Fazy 3: Konto = **jedyny** start + Moje runy; po `202` Konto.

Zmiana względem Fazy 3 („**Jedyny** formularz startu w MVP”): od tej wersji Konto **zostaje** powierzchnią startu (inline + prefill z „Moich runów”); druga powierzchnia = modal na Runach. Po `202` z Konta — nadal Konto.

## Widok: Run (szczegóły) — obowiązkowy live

Wejście: z listy **Moje runy** na Koncie, z archiwum **Runy**, z floating boxa, lub bezpośredni deep-link po `runId`.

| Element | Zachowanie |
|---------|------------|
| **Nagłówek / meta** | Te same podstawowe pola co wiersz listy. **`conversationId` poza MVP UI** (zostaje w API / logach / snapshotcie — dashboard go nie pokazuje) |
| **Stop** | Ten sam przepływ co na Moich runach: przycisk **Stop** dla **własnego** runu nieterminalnego → modal **„Czy na pewno?”** → Tak = `POST .../cancel`; Nie = close, zero API. Po `cancelled` panel HITL **znika**; przegląd (gwiazdki / Edytuj / finalize) **niedostępny** |
| **Status live** | Gdy run jest własny i w `running` \| `awaiting_hitl` \| `interrupted`: ten sam `EventSource` co rejestr layoutu (nie drugie połączenie na ten `runId`). Prezentacja **animowana / atrakcyjna**. `queued` / `completed` / `failed` / `cancelled` / cudzy run: **bez** nowej subskrypcji — GET snapshot |
| **Logi** | Przyrostowo z SSE `run.log` + możliwość dociągnięcia historii GET logs |
| **HITL** | Panel wyboru: pomysły postu, pomysły rolek albo outline strony — wg `taskType` i `hitl.options`. Social dwuetapowy: **multi-select** (min. 1 unikalne id ⊆ options; np. checkboxy / chipy); Content: akceptacja outline’u (**bez** zmian — nadal `[outline.id]`). Submit → `POST .../hitl`. Po `cancelled` panel **nie** jest pokazywany |
| **Wynik** | Po `completed`: widok **listy postów** (`ideas` / `contents[]` z `sourceIdeaId`; na liście pomysłów `cta` gdy jest; przy każdym content pokaż `characterCount`) albo **jednego** posta (`content` — task jednoetapowy `post_content`), **listy scenariuszy** (`reelIdeas` / `reelScripts[]`) albo **jednej** rolki (`reelScript` — `reel_script`), albo **strony** (`pageOutline` / `pageDocument` — etykieta `role` przy sekcji, gdy ustawione); przy `failed` **albo** `cancelled` — to, co zdążyło się zapisać (partial jak przy `failed`). Dwuetapowy Social: **nie** jeden blok copy. Po zapisie Edytuj — **ta** treść (nie output agentów sprzed edycji). |
| **Edytuj** | Po zakończeniu pracy agenta (`completed` albo `failed`, gdy jest wynik): przycisk **Edytuj** dla autora (`startedBy`), dopóki przegląd otwarty. **Niedostępne** przy `cancelled`, po `reviewFinalizedAt` **oraz** gdy minął serwerowy `reviewExpiresAt` (deadline z API — **bez** lokalnego wyliczania z `pipelineFinishedAt` + stałej). Użytkownik **może, ale nie musi** z niego skorzystać. Edytowalna jest **każda treść wyniku** tego runu (post / lista postów, pomysły, scenariusz / lista scenariuszy, outline, dokument strony — wg tego, co jest w snapshotcie). **Zapis** → api przyjmuje nową treść (kształt jak `result` w snapshotcie), **zastępuje** kanoniczny wynik w DB **oraz** ustawia `outputEdited: true`. Od tego momentu GET/UI pokazują treść użytkownika jako wynik runu. Pipeline / verifier **nie** startują ponownie. Bez diff / % i bez osobnej kopii „oryginału agenta” w MVP. Wielokrotny zapis do finalize / w oknie TTL. |
| **Ocena gwiazdkowa (1–5)** | Po `completed` **albo** `failed`, tylko autor runu. **Niedostępna** przy `cancelled`, po finalize **oraz** po expiry (`reviewExpiresAt` z API). Dobrowolna: brak wyboru = w DB zostaje `userRating: null`. Do zatwierdzenia można zmieniać wybór (w tym wrócić do braku oceny). Czytelne gwiazdki, nie sam numeric input |
| **Zamknij / zapisz przegląd** | Zatwierdza aktualną ocenę (`null` albo `1–5`) i flagę edycji. Po sukcesie kontrolki oceny i Edytuj są zablokowane. Po expiry (serwerowy `reviewExpiresAt`) albo gdy `reviewFinalizedAt` już ustawione — te same kontrolki niedostępne; copy **„Przegląd zamknięty”** (bez rozróżnienia auto vs ręczne). **Bez** widocznego deadline / countdown / wiersza „dostępne do…”. **Niedostępne** przy `cancelled` |

Zmiana względem: „ewent. `conversationId` (ops light)” w nagłówku; Edytuj ustawiało wyłącznie flagę, oryginał agentów w DB bez nadpisu; przegląd bez limitu czasu. Od tej wersji zapis edycji **jest** kanonicznym wynikiem; `conversationId` nie jest w UI MVP; disable po serwerowym expiry / finalize.

**SSE — start i koniec.** Gdy snapshot GET już ma status `completed` albo `failed` albo `cancelled` **albo** `queued`, UI **nie** otwiera SSE. W trakcie live (`running` / `awaiting_hitl` / `interrupted`): po evencie `run.completed` albo `run.failed` albo `run.cancelled` UI **zamyka** `EventSource` (`close()`). Tego zamknięcia ani `onerror` po tym `close()` **nie** wolno traktować jako restartu api. Przeglądarka woła SSE **same-origin** (BFF Next — `docs/deployment.md`); `withCredentials` przy cross-origin nie dotyczy produktu MVP.

Reconnect SSE: odtworzyć subskrypcję wyłącznie po nieoczekiwanym zerwaniu, gdy status runu jest wciąż nieterminalny; status i logi uzupełnić snapshotem GET. Po restarcie api snapshot może pokazać `interrupted` zanim znowu `running` — nie zakładać natychmiastowego powrotu do pulsu pipeline. Przeglądarkowy `EventSource` sam wznawia połączenie po close serwera — bez `close()` po terminalu powstaje pętla na `.../events`.

Zmiana względem wcześniejszego zapisu: reconnect był ogólny, bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

Zmiana względem: HITL Social jako **single select** / jeden blok wyniku. Obowiązuje multi-select (min. 1) i lista postów / scenariuszy (`contents[]` / `reelScripts[]`). Content: akceptacja outline bez zmian.

Ocena i Edytuj **nie** są HITL (HITL = wybór z listy w trakcie pipeline).

## Formularz: Zostaw opinię (zapis MVP)

Modal / panel z layoutu (CTA globalny). Wymaga sesji.

| Pole | Zachowanie |
|------|------------|
| **Co oceniasz** | Wybór: **aplikacja** \| **agent** \| **run** |
| **Agent** | Gdy target = agent: **obowiązkowy** select stałego enumu: `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `PageWriterAgent` (labelki PL w UI) |
| **Run** | Gdy target = run: **obowiązkowy** select runów **zalogowanego** użytkownika — źródło `GET /api/v1/runs/user/:userId` (`:userId` = id z `/auth/me`). Endpoint zwraca **wszystkie** jego runy (bez paginacji 10 z dashboardu); UI **filtruje** do `completed` \| `failed` \| (`cancelled` **i** jest nie-`null` pole wyniku w snapshotcie — lista user może wymagać dociągnięcia snapshotu albo reguły równoważnej; kanon: **nie** pokazywać `cancelled` bez wyniku). Run w toku nie jest opcją. API i tak odrzuci niedozwolony status / brak wyniku (**409** `RUN_NOT_REVIEWABLE`) — filtr kliencki nie jest jedyną bramką. |
| **Treść** | Pole tekstowe opinii |

Zapis → `POST /api/v1/feedback`. Wiele opinii w czasie (append). Brak ekranu listy opinii i panelu admina w MVP.

Authz selecta runów: wyłącznie runy autora; obcy `userId` → api `403`.

## Widok: Użytkownicy (admin)

**W zakresie MVP** dashboardu (`apps/frontend`). Weryfikacja samego API (Postman + token z maila/logu) **nie** zastępuje tych ekranów w produkcie.

- Lista kont (`GET /users`) — bez pending invites.
- **Zaproszenie:** pole **email** (admin **nie** podaje hasła) → `POST /invitations`.
- Lista pending (`GET /invitations`) — **wszystkie** `pending`, **w tym wygasłe** (`expiresAt < now`); akcje resend / revoke.
- Brak UI do tworzenia drugiego admina.
- Brak UI edycji / soft-delete kont w MVP (api ma soft-delete pod późniejsze V1).

**Akceptacja zaproszenia (publiczna, MVP):** trasa **`/invite/accept?token=`** (ten sam kształt, który api wkłada do maila jako `{APP_PUBLIC_URL}/invite/accept?token=…`) — **nie** strona główna. Formularz pierwszego hasła (polityka z `security.md`) → `POST /auth/accept-invite` → **strona główna (logowanie)**. Dashboard dopiero po udanym `POST /auth/login`. Trasa poza layoutem zalogowanego.

Błędy na tej powierzchni: **wyłącznie** `message` z envelope na karcie (bez Toastera — jak login / bootstrap). Kolizja email i nieważny token przychodzą jako ten sam **401** — UI **nie** ma osobnego copy „email zajęty” ani gałęzi na **409** `CONFLICT` z tej trasy. Opcjonalnie stała pomocnicza (bez leak z API): ogólne „Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.” — **tylko** jeśli nadal mapowane z tego samego 401 (bez rozróżniania przyczyn po `code`).

Zmiana względem: widok Users i accept-invite jako „przyszły FE / gdy ekran powstanie”; implementacja UI była odkładana względem DoD API. Od wcześniejszej wersji oba ekrany są kanonem UX MVP.

Zmiana względem: założenie, że FE może rozróżnić kolizję email (**409**) od złego tokenu na accept-invite. Od tej wersji obie sytuacje = ten sam **401** / ten sam kanał envelope.

## Stany puste i błędy

- Brak admina: strona główna (ten sam formularz) → bootstrap → dashboard.
- Pusty kontekst / po pierwszym wejściu admina: onboarding → uzupełnij kontekst → (przy żywym gateway) „Agenci aktywni”.
- Błędy API (MVP): pokazać **wyłącznie `message` z envelope** (jak zwraca API; komunikaty są po angielsku). **`code` nie jest treścią UI** — służy logice klienta (gałęzie HTTP), nie etykiecie przy polu. **Bez** stack trace. Chrome i etykiety poza envelope — po polsku. Tłumaczenie UI (np. next-intl) = **V1 — rozbudowa**, nie MVP. Przy formularzu / błędzie GET bloku: `message` **w miejscu błędu** — **nie** toast (sekcja „Feedback zdarzeń”).
  Zmiana względem: wcześniejsza norma wymagała pokazywania **`code` i `message`**. Od tej wersji w UI obowiązuje tylko **`message`**.
- `failed` run: status + ostatnie logi z powodem (verifier / gateway) **zostają** na szczegółach. Toast terminalu poza szczegółami („Run nieudany”) **nie** jest magazynem powodu.
- `cancelled` run: status **anulowany przez operatora** — **nie** błąd pipeline. Partial wynik widoczny jak przy `failed`; panel HITL i przegląd (gwiazdki / Edytuj / finalize) niedostępne. Toast mutacji / terminalu: „Run anulowany”.
- `interrupted` run: status + informacja, że wznowienie czeka na wolny slot (bez panelu HITL i bez oceny).

## Poza zakresem UX MVP

- Zmiana hasła zalogowanego / usuwanie własnego konta przez użytkownika (pierwsze hasło na accept-invite = onboarding, nie ten punkt). **Zmiana własnego emaila z re-auth hasłem jest w MVP** (widok Konto → `PATCH /auth/me/email`). Wzorzec pod przyszłą zmianę hasła (po SMTP) = poza MVP. **Confirm e-mail** przy zmianie adresu = **V1** (poza MVP)  
- Soft-delete / edycja użytkowników w UI admina (endpoint api istnieje; UI później)  
- `selectedIdeaIds` na formularzu **startu** runu (HITL dwuetapowy zostaje)  
- `conversationId` w UI szczegółów runu (zostaje w API / logach)  
- Limit **per-user** liczby runów w toku (MVP: tylko globalny `MAX_CONCURRENT_RUNS` na execute) — **obowiązkowy** temat **V1 — rozbudowa**. Slot ×1 i global cap **gościa** to osobny kanon DEMO MODE (nie ten punkt V1)  
- Przełącznik DEMO w UI admina; awans roli `guest`; uzależnianie signup od `demoMode`  
- i18n UI / next-intl (**V1 — rozbudowa**; MVP: PL w chrome, w UI błędów wyłącznie `message` z API bez mapy tłumaczeń)  
- Panel administracyjny opinii / średnich ocen / analityki feedbacku (**V1 — rozbudowa**)  
- Stopień edycji outputu (diff / procent / historia wersji) — w MVP zapis **zastępuje** wynik i stawia flagę; bez porównywania z outputem agentów  
- Zmiana oceny po „Zamknij / zapisz przegląd” **albo** po auto-close / expiry TTL  
- Widoczny deadline / countdown / wiersz „review dostępne do…” na panelu przeglądu (świadomie odłożone; FE używa `reviewExpiresAt` tylko do disable)  
- Motywy jasny / ciemny — **obowiązkowy** temat **V1 — rozbudowa**: oba tryby w produkcie oraz **dynamiczne** przełączanie przez użytkownika **dedykowanym przełącznikiem** w interfejsie (nie sam `prefers-color-scheme` bez kontrolki). W MVP motyw produktowy pozostaje jasny  
- Pipeline builder, drag-and-drop agentów  
- Osobny trwały ekran „Aktywacja…” (świadomie pominięty — deep link od razu pokazuje logowanie + toast)  
- Confirm e-mail przy `PATCH /auth/me/email` (**V1**; nie mylić z aktywacją przy register)  
- Automatyczne testy FE (`testy.md` — poza MVP)  
- Chip / stos chipów „run w toku” w chrome (zastąpiony floating boxem)  
- SSE na `queued` oraz nowy endpoint „SSE moich runów” (obowiązuje N× istniejące `.../runs/:runId/events`)  
- CTA startu w sidebarze / headerze oraz na szczegółach `/runs/:runId` (obowiązują Konto inline + modal na liście Runy)  
- Prefill startu z wiersza archiwum Runy (w tym cudzego runu) — prefill wyłącznie z „Moich runów” na Koncie  
- Browser Notification API; mail przy `failed` runu; toast na `running` / `run.log` / heartbeat; trzymanie „właśnie skończonych” w floating boxie  
- Toast jako kopia GET / React Query / Context „server state”

Implementacja wizualna statusu live należy do frontu; ten dokument ustala **wymaganie zachowania** (live + atrakcyjna animacja statusu), nie konkretną bibliotekę motion.

Zmiana względem: „Motywy dark/light jako wymóg” na liście poza MVP, bez fazy i bez sterowania. Od tej wersji dual-mode jest **obowiązkiem V1** z dedykowanym przełącznikiem w UI; MVP bez zmiany locku jasnego.
