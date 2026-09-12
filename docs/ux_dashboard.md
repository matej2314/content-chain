# UX Dashboard — Content Chain

Kierunek UI self-host (`apps/frontend`) dla MVP. Bez specyfikacji pikseli / design systemu — widoki, stany i zachowanie względem API/SSE.

Powiązane: `dokumentacja_koncepcyjna.md`, `dokumentacja_komunikacji.md`, `data_flow.md`, `security.md`, `observability.md`.

## Założenia UX

- Cienki klient: reguły i pipeline w `apps/api`.
- Język **UI: polski** (generowane treści SM: PL/EN wg briefu runu).
- Nawigacja: **sidebar** + **header** + obszar roboczy (po zalogowaniu). Sidebar = widoki. Header = tożsamość sesji (login) i wylogowanie.
- Live run: status **na żywo (SSE)**, wizualnie **animowany / czytelnie atrakcyjny** (nie suchy sam tekst „running”).
- Sesja: wyłącznie cookie httpOnly (`cc_access` / `cc_refresh`); probe tożsamości: `GET /api/v1/auth/me`.

## Wejście: strona główna (logowanie), sesja

**Strona główna** (brak ważnej sesji): tło + karta z formularzem logowania (email, hasło, CTA logowania) oraz **nieaktywny** przycisk **„Nie masz konta? Zarejestruj się!”** w standardowym miejscu pod formularzem. Przycisk rejestracji **nie** prowadzi do signup i **nie** aktywuje się w MVP (otwarta rejestracja zakazana). Dashboard (sidebar) **tylko** po udanej sesji — nigdy jako pierwsza treść niezalogowanego.

| Ekran / krok | Kiedy | Zachowanie |
|--------------|-------|------------|
| **Strona główna — logowanie** | Brak ważnej sesji i `bootstrap-status.available === false` | Ten sam widok; submit → `POST /auth/login` → dashboard |
| **Strona główna — first-run (tryb)** | Brak ważnej sesji i `bootstrap-status.available === true` | **Ten sam widok** (nie osobna strona). Submit tego samego formularza → `POST /auth/bootstrap-admin` (pierwszy admin) → sesja cookie jak po loginie → dashboard. Przycisk „Zarejestruj się!” nadal nieaktywny |
| **Akceptacja zaproszenia** | Publiczny **deep link** `{APP_PUBLIC_URL}/invite/accept?token=…` (mail / log dev); nie strona główna | Formularz **pierwszego** hasła → `POST /auth/accept-invite` → **powrót na stronę główną (logowanie)**. Brak Set-Cookie po accept; dashboard dopiero po `POST /auth/login` |
| **Probe sesji** | Start aplikacji / reload | `GET /auth/me` → przy `401`: `POST /auth/refresh` → ponownie `GET /auth/me` → przy kolejnym `401`: strona główna (logowanie; tryb bootstrap gdy `available`) |

Zmiana względem: osobne ekrany first-run vs logowanie; wejście na dashboard bez przejścia przez kartę logowania jako stronę główną. Od tej wersji jeden widok główny = logowanie (+ martwa rejestracja); first-run to tryb submitu na tej karcie.

**Header dashboardu (od pierwszego layoutu po sesji):** pasek nad obszarem roboczym na **wszystkich** widokach zalogowanych. Elementy **wewnątrz headera wyrównane do prawej**.

Hierarchia sterowania tożsamością:

1. Widoczny **login** zalogowanego (email z `GET /auth/me`) jako **przycisk** (kontrolka nadrzędna).
2. Z tego przycisku — **„Wyloguj się”** (pozycja menu / rozwinięcie; nie osobny wiersz sidebara i nie luźny przycisk obok loginu bez tej hierarchii).

Klik **„Wyloguj się”** → **modal potwierdzenia** → **Tak** → `POST /auth/logout` → nawigacja na **`/`** (karta logowania). **Nie** / zamknięcie modala zostawia użytkownika w dashboardzie. Wylogowanie **nie** zastępuje widoku Konto i **nie** żyje w sidebarze.

Zmiana względem: „Wyloguj się” w chrome (sidebar **lub** header), bez wskazania miejsca ani hierarchii login → wylogowanie.

**Konto (MVP):** osobny widok w sidebarze (admin i `user`) — profil, **własne** runy (live) i **jedyny** formularz startu runu. Nie mylić z widokiem **Runy** (archiwum `completed` \| `failed` instancji). Szczegóły: sekcja „Widok: Konto”.

Zmiana względem: pozycja „Konto” tylko jako wylogowanie, bez podstrony i bez zmiany email.

## Nawigacja (sidebar)

| Widok | Kto | Cel |
|-------|-----|-----|
| **Kontekst firmy** | admin: edycja; user: podgląd | Uzupełnienie sekcji bramki; podgląd completeness |
| **Runy** | admin, user | **Archiwum firmy:** tylko runy instancji w `completed` \| `failed` (paginacja 10, najnowsze pierwsze). Klik wiersza → szczegóły (snapshot; **bez** SSE). **Bez** formularza startu. Cudzy run w toku **nie** jest na tej liście |
| **Run (szczegóły)** | admin, user | Podstrona po kliknięciu w **Moich runach** (Konto) albo w archiwum Runy: logi, HITL, wynik, przegląd. Live SSE tylko gdy run jest własny i w `running` / `awaiting_hitl` / `interrupted` |
| **Konto** | każdy | Własny email; **Moje runy** (wszystkie statusy, live); **start** nowego runu (jedyny kanon startu w MVP); opinia tekstowa. Po udanym `POST /runs` — **ten** widok (nie od razu pojedyncze szczegóły) |
| **Użytkownicy** | tylko admin | Lista kont + **zaproszenie (email)**; lista pending (w tym wygasłe); resend/revoke. **W zakresie MVP** dashboardu. Bez edycji / dezaktywacji / soft-delete kont w UI MVP |

**Wyloguj się** nie jest pozycją sidebara — wyłącznie hierarchia przycisku loginu w headerze (wyżej).

Zmiana względem: **Runy** = cała instancja (wszystkie statusy) + start; po starcie → szczegóły tego `runId`; sygnał „w toku” = chip w chrome. Od tej wersji: Runy = archiwum terminalne; start i live = Konto; chrome = floating box (niżej).

**Globalny CTA (po zalogowaniu):** przycisk **„Zostaw opinię”** (równoważny label: „Oceń aplikację”) — dostępny z layoutu (np. sidebar / header), nie tylko ze szczegółów runu. Otwiera formularz opinii tekstowej (niżej). Panel administracyjny odczytu opinii = **V1 — rozbudowa** (MVP = zapis).

## Globalny wskaźnik: czy agenci są aktywni

Stały element UI (np. pasek pod headerem / chip w sidebarze), widoczny na wszystkich widokach po zalogowaniu:

| Stan | Warunek | Przekaz (PL) |
|------|---------|--------------|
| **Agenci aktywni** | `completeness.complete === true` | Można uruchamiać runy produktowe (Social i Content) |
| **Agenci nieaktywni / zablokowani** | kontekst niekompletny | Start runów zablokowany; lista brakujących sekcji + link do Kontekstu |
Źródło chipa kompletności: `GET /company-context/completeness`.  
CTA „Start runu” (wyłącznie na **Koncie**) disabled + tooltip, gdy agenci nieaktywni — zgodnie z **409** `CONTEXT_INCOMPLETE` po stronie api (UI nie jest jedyną bramką).

## Floating box: własne runy w toku

**Obowiązkowy** drugi sygnał w MVP — **nie** chip w chrome i **nie** stos chipów. Dotyczy wyłącznie runów **zalogowanego** (`GET /runs/user/:userId`) w `running` \| `awaiting_hitl` \| `interrupted`.

| Stan UI | Zachowanie |
|---------|------------|
| Widok **Konto** | Box **ukryty** — live jest listą „Moje runy” |
| Inny widok po sesji (Kontekst, Runy, szczegóły, Użytkownicy, …) | **Floating box**: pozycja per taki run (status + skrót meta + link do szczegółów). Copy: `running` / `awaiting_hitl` — „Trwa run…”; `interrupted` — **inne** („Przerwany — wznowienie przy wolnym slocie”). HITL / wynik / przegląd **nie** żyją w boxie (tylko na szczegółach). Box można **zwinąć** do mniejszej wersji i rozwinąć |
| `queued` | **Bez** pozycji w boxie i **bez** SSE. Widać na Koncie ze snapshotu GET |

Live: **N×** `EventSource` na `GET .../runs/:runId/events` (istniejący kontrakt per `runId`; **bez** nowego endpointu SSE). Rejestr połączeń w layoutcie zalogowanym (jedno połączenie na `runId`). `queued` nie otwiera socketa. Po `completed` / `failed` — `close()` i zniknięcie z boxa (zakończony wpadnie do archiwum Runy przy następnym odświeżeniu).

Cudzy run w toku **nie** ma sygnału w chrome (archiwum Runy go też nie pokazuje).

Zmiana względem: drugi sygnał = chip w chrome (instancja, w tym cudze); lista Runy niosła wszystkie statusy na żywo.

## Widok: Kontekst firmy

- Formularze / sekcje bramki: tożsamość, oferta, głos SM, CTA/kanały, odbiorca.
- Opcjonalne sekcje **`extras`** (case studies, obiekcje, hashtagi, catalogNotes, performanceNotes) — admin może edytować; **nie** blokują „Agenci aktywni”.
- Widoczny status kompletności per sekcja bramki.
- Zapis: tylko admin; user — read-only z komunikatem.

## Widok: Runy (archiwum firmy)

- Źródło: `GET /api/v1/runs?status=completed,failed` — **zakończone i nieudane runy całej instancji** (jeden listing, sort `createdAt` desc). Query `status` przyjmuje jedną wartość **albo** listę rozdzieloną przecinkiem (`docs/dokumentacja_komunikacji.md`).
- Kolumny listy: `runId`, typ tasku, platforma (lub `web` przy page_*), `contentKind` gdy page_*, język, status, `createdAt`, email inicjatora (`startedBy.email`).
- Paginacja: **10** na stronę, najnowsze pierwsze; stały rozmiar strony.
- Filtry MVP na archiwum: `taskType` (post_*, reel_*, page_*), platforma (w tym `web`), użytkownik inicjujący (`userId`). Filtr statusu **tylko** w zbiorze `completed` \| `failed` (albo oba naraz — domyślnie oba).
- **Bez** formularza startu na tym widoku (start = Konto).
- **Bez** SSE i **bez** pokazywania `queued` / `running` / `awaiting_hitl` / `interrupted`.
- Odświeżanie: przy **wejściu** na widok oraz co **15 minut**, gdy widok jest otwarty. To **nie** jest kanał live statusu (`SPEC-FRONTEND.md`).
- **Nawigacja:** klik wiersza → **Run (szczegóły)** — snapshot GET; EventSource **nie** otwierać (status terminalny).

Zmiana względem: Runy = wszystkie statusy instancji + start + wejście w live z tej listy.

## Widok: Konto

Osobna pozycja sidebara (admin i `user`). **Nie** zastępuje widoku Runy.

| Blok | Zachowanie |
|------|------------|
| **Email** | Prosty formularz zmiany **własnego** adresu (sesja). Zapis → `PATCH /api/v1/auth/me`. Unikalność jak w auth (zajęty → czytelny błąd). **Bez** zmiany hasła i **bez** usuwania konta na tym widoku |
| **Moje runy** | Źródło: `GET /api/v1/runs/user/:userId` (`:userId` z `/auth/me`) — **wszystkie** statusy zalogowanego. Live: SSE per `runId` wyłącznie dla `running` \| `awaiting_hitl` \| `interrupted` (rejestr layoutu). `queued` i terminalne: snapshot GET (wejście na Konto, po `POST /runs`, po evencie SSE innego własnego runu, focus okna). Klik wiersza → **Run (szczegóły)**. Pełny wynik / HITL / przegląd na szczegółach, nie na liście |
| **Start runu** | **Jedyny** formularz startu w MVP (w tym dawny „szybki start”). Select `taskType` obejmuje rolki i page_*; **`contentKind` gdy page_***; **platforma ukryta/disabled gdy page_***; język. Brief **zależny od `taskType`**: post_* / reel_* — temat + opcjonalnie grupa, cel, **liczba pomysłów** (bez kąta/długości); `page_*` — temat + opcjonalnie grupa, cel, **kąt**, **długość słów** (bez liczby pomysłów). CTA nie jest polem briefu. **Bez** `selectedIdeaIds`. Start disabled + wyjaśnienie, gdy agenci nieaktywni. Z wiersza: **nowy** run z prefill `taskType` + brief + platforma/`contentKind` **ze snapshotu** `GET /runs/:runId` (lista user **nie** niesie `brief` / `contentKind`). Po **202**: zostajemy na Koncie (nowy wiersz); nie wymuszamy od razu szczegółów |
| **Opinia tekstowa** | Na Koncie dostępny zapis opinii (`POST /feedback`) — ten sam kanon co globalny CTA „Zostaw opinię” (aplikacja / agent / run; select runów tylko własne `completed` \| `failed`). Globalny CTA w layoutcie **zostaje** |

Wylogowanie **nie** żyje na widoku Konto — header: przycisk loginu → „Wyloguj się” + modal, od pierwszego layoutu.

Zmiana względem: Konto = tylko logout / brak podstrony; zmiana email poza MVP; własne runy tylko jako select w formularzu opinii; start na widoku Runy; po starcie → szczegóły.

## Widok: Run (szczegóły) — obowiązkowy live

Wejście: z listy **Moje runy** na Koncie, z archiwum **Runy**, z floating boxa, lub bezpośredni deep-link po `runId`.

| Element | Zachowanie |
|---------|------------|
| **Nagłówek / meta** | Te same podstawowe pola co wiersz listy. **`conversationId` poza MVP UI** (zostaje w API / logach / snapshotcie — dashboard go nie pokazuje) |
| **Status live** | Gdy run jest własny i w `running` \| `awaiting_hitl` \| `interrupted`: ten sam `EventSource` co rejestr layoutu (nie drugie połączenie na ten `runId`). Prezentacja **animowana / atrakcyjna**. `queued` / `completed` / `failed` / cudzy run: **bez** nowej subskrypcji — GET snapshot |
| **Logi** | Przyrostowo z SSE `run.log` + możliwość dociągnięcia historii GET logs |
| **HITL** | Panel wyboru: pomysły postu, pomysły rolek albo outline strony — wg `taskType` i `hitl.options`. Social dwuetapowy: **multi-select** (min. 1 unikalne id ⊆ options; np. checkboxy / chipy); Content: akceptacja outline’u (**bez** zmian — nadal `[outline.id]`). Submit → `POST .../hitl` |
| **Wynik** | Po `completed`: widok **listy postów** (`ideas` / `contents[]` z `sourceIdeaId`; na liście pomysłów `cta` gdy jest; przy każdym content pokaż `characterCount`) albo **jednego** posta (`content` — task jednoetapowy `post_content`), **listy scenariuszy** (`reelIdeas` / `reelScripts[]`) albo **jednej** rolki (`reelScript` — `reel_script`), albo **strony** (`pageOutline` / `pageDocument` — etykieta `role` przy sekcji, gdy ustawione); przy `failed` — to, co zdążyło się zapisać. Dwuetapowy Social: **nie** jeden blok copy. Po zapisie Edytuj — **ta** treść (nie output agentów sprzed edycji). |
| **Edytuj** | Po zakończeniu pracy agenta (`completed` albo `failed`, gdy jest wynik): przycisk **Edytuj** dla autora (`startedBy`), dopóki przegląd otwarty. Użytkownik **może, ale nie musi** z niego skorzystać. Edytowalna jest **każda treść wyniku** tego runu (post / lista postów, pomysły, scenariusz / lista scenariuszy, outline, dokument strony — wg tego, co jest w snapshotcie). **Zapis** → api przyjmuje nową treść (kształt jak `result` w snapshotcie), **zastępuje** kanoniczny wynik w DB **oraz** ustawia `outputEdited: true`. Od tego momentu GET/UI pokazują treść użytkownika jako wynik runu. Pipeline / verifier **nie** startują ponownie. Bez diff / % i bez osobnej kopii „oryginału agenta” w MVP. Wielokrotny zapis do finalize. |
| **Ocena gwiazdkowa (1–5)** | Po `completed` **albo** `failed`, tylko autor runu. Dobrowolna: brak wyboru = w DB zostaje `userRating: null`. Do zatwierdzenia można zmieniać wybór (w tym wrócić do braku oceny). Czytelne gwiazdki, nie sam numeric input |
| **Zamknij / zapisz przegląd** | Zatwierdza aktualną ocenę (`null` albo `1–5`) i flagę edycji. Po sukcesie kontrolki oceny i Edytuj są zablokowane |

Zmiana względem: „ewent. `conversationId` (ops light)” w nagłówku; Edytuj ustawiało wyłącznie flagę, oryginał agentów w DB bez nadpisu. Od tej wersji zapis edycji **jest** kanonicznym wynikiem; `conversationId` nie jest w UI MVP.

**SSE — start i koniec.** Gdy snapshot GET już ma status `completed` albo `failed` **albo** `queued`, UI **nie** otwiera SSE. W trakcie live (`running` / `awaiting_hitl` / `interrupted`): po evencie `run.completed` albo `run.failed` UI **zamyka** `EventSource` (`close()`). Tego zamknięcia ani `onerror` po tym `close()` **nie** wolno traktować jako restartu api. Przeglądarka woła SSE **same-origin** (BFF Next — `docs/deployment.md`); `withCredentials` przy cross-origin nie dotyczy produktu MVP.

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
| **Run** | Gdy target = run: **obowiązkowy** select runów **zalogowanego** użytkownika — źródło `GET /api/v1/runs/user/:userId` (`:userId` = id z `/auth/me`). Endpoint zwraca **wszystkie** jego runy (bez paginacji 10 z dashboardu); UI **filtruje** do `completed` \| `failed` (run w toku nie jest opcją). API i tak odrzuci inny status (**409** `RUN_NOT_REVIEWABLE`) — filtr kliencki nie jest jedyną bramką. |
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

Zmiana względem: widok Users i accept-invite jako „przyszły FE / gdy ekran powstanie”; implementacja UI była odkładana względem DoD API. Od tej wersji oba ekrany są kanonem UX MVP.

## Stany puste i błędy

- Brak admina: strona główna (ten sam formularz) → bootstrap → dashboard.
- Pusty kontekst / po pierwszym wejściu admina: onboarding → uzupełnij kontekst → „Agenci aktywni”.
- Błędy API (MVP): pokazać **`code` i `message` tak, jak zwraca envelope** (komunikaty API są po angielsku). **Bez** stack trace. Chrome i etykiety poza envelope — po polsku. Tłumaczenie UI (np. next-intl) = **V1 — rozbudowa**, nie MVP.
- `failed` run: status + ostatnie logi z powodem (verifier / gateway).
- `interrupted` run: status + informacja, że wznowienie czeka na wolny slot (bez panelu HITL i bez oceny).

## Poza zakresem UX MVP

- Zmiana hasła zalogowanego / usuwanie własnego konta przez użytkownika (pierwsze hasło na accept-invite = onboarding, nie ten punkt). **Zmiana własnego emaila jest w MVP** (widok Konto)  
- Soft-delete / edycja użytkowników w UI admina (endpoint api istnieje; UI później)  
- `selectedIdeaIds` na formularzu **startu** runu (HITL dwuetapowy zostaje)  
- `conversationId` w UI szczegółów runu (zostaje w API / logach)  
- Limit **per-user** liczby runów w toku (MVP: tylko globalny `MAX_CONCURRENT_RUNS` na execute) — **obowiązkowy** temat **V1 — rozbudowa**  
- i18n UI / next-intl (**V1 — rozbudowa**; MVP: PL w chrome, envelope błędów bez mapy tłumaczeń)  
- Panel administracyjny opinii / średnich ocen / analityki feedbacku (**V1 — rozbudowa**)  
- Stopień edycji outputu (diff / procent / historia wersji) — w MVP zapis **zastępuje** wynik i stawia flagę; bez porównywania z outputem agentów  
- Zmiana oceny po „Zamknij / zapisz przegląd”  
- Motywy dark/light jako wymóg  
- Pipeline builder, drag-and-drop agentów  
- Otwarta rejestracja / aktywny przycisk „Zarejestruj się!” na stronie głównej (w MVP pozostaje nieaktywny)  
- Automatyczne testy FE (`testy.md` — poza MVP)  
- Chip / stos chipów „run w toku” w chrome (zastąpiony floating boxem)  
- SSE na `queued` oraz nowy endpoint „SSE moich runów” (obowiązuje N× istniejące `.../runs/:runId/events`)

Implementacja wizualna statusu live należy do frontu; ten dokument ustala **wymaganie zachowania** (live + atrakcyjna animacja statusu), nie konkretną bibliotekę motion.
