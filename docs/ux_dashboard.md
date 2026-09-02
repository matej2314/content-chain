# UX Dashboard — Content Chain

Kierunek UI self-host (`apps/frontend`) dla MVP. Bez specyfikacji pikseli / design systemu — widoki, stany i zachowanie względem API/SSE.

Powiązane: `dokumentacja_koncepcyjna.md`, `dokumentacja_komunikacji.md`, `data_flow.md`, `security.md`, `observability.md`.

## Założenia UX

- Cienki klient: reguły i pipeline w `apps/api`.
- Język **UI: polski** (generowane treści SM: PL/EN wg briefu runu).
- Nawigacja: **sidebar** + obszar roboczy (po zalogowaniu).
- Live run: status **na żywo (SSE)**, wizualnie **animowany / czytelnie atrakcyjny** (nie suchy sam tekst „running”).
- Sesja: wyłącznie cookie httpOnly (`cc_access` / `cc_refresh`); probe tożsamości: `GET /api/v1/auth/me`.

## Wejście: first-run, logowanie, sesja

| Ekran / krok | Kiedy | Zachowanie |
|--------------|-------|------------|
| **First-run (bootstrap)** | `GET /auth/bootstrap-status` → `available: true` | Formularz email + hasło → `POST /auth/bootstrap-admin`; po sukcesie sesja cookie i wejście do dashboardu |
| **Logowanie** | Brak ważnej sesji i bootstrap niedostępny | Email + hasło → `POST /auth/login` |
| **Probe sesji** | Start aplikacji / reload | `GET /auth/me` → przy `401`: `POST /auth/refresh` → ponownie `GET /auth/me` → przy kolejnym `401`: login lub first-run |

**Konto (MVP):** wyłącznie **wylogowanie** (`POST /auth/logout`). Poza MVP (później): zmiana hasła, zmiana email, usuwanie własnego konta przez użytkownika.

## Nawigacja (sidebar)

| Widok | Kto | Cel |
|-------|-----|-----|
| **Kontekst firmy** | admin: edycja; user: podgląd | Uzupełnienie sekcji bramki; podgląd completeness |
| **Runy** | admin, user | Lista runów całej instancji + start nowego (Social i Content); klik wiersza → szczegóły |
| **Run (szczegóły)** | admin, user | Podstrona po kliknięciu w liście: live status, logi, HITL, wynik |
| **Użytkownicy** | tylko admin | Lista + tworzenie `user` (bez edycji / dezaktywacji w UI MVP) |
| **Konto** | każdy | Wylogowanie |

**Globalny CTA (po zalogowaniu):** przycisk **„Zostaw opinię”** (równoważny label: „Oceń aplikację”) — dostępny z layoutu (np. sidebar / header), nie tylko ze szczegółów runu. Otwiera formularz opinii tekstowej (niżej). Panel administracyjny odczytu opinii = **V1 — rozbudowa** (MVP = zapis).

## Globalny wskaźnik: czy agenci są aktywni

Stały element UI (np. pasek pod headerem / chip w sidebarze), widoczny na wszystkich widokach po zalogowaniu:

| Stan | Warunek | Przekaz (PL) |
|------|---------|--------------|
| **Agenci aktywni** | `completeness.complete === true` | Można uruchamiać runy produktowe (Social i Content) |
| **Agenci nieaktywni / zablokowani** | kontekst niekompletny | Start runów zablokowany; lista brakujących sekcji + link do Kontekstu |
| **Run w toku** (uzupełnienie) | istnieje run w `running` / `awaiting_hitl` / `interrupted` | Opcjonalny drugi sygnał: przy `running` / `awaiting_hitl` — „Trwa run…”; przy `interrupted` — **inne copy** („Przerwany — wznowienie przy wolnym slocie”), z linkiem do szczegółów |

Źródło: `GET /company-context/completeness` (+ lista runów / SSE).  
CTA „Start runu” disabled + tooltip, gdy agenci nieaktywni — zgodnie z **409** `CONTEXT_INCOMPLETE` po stronie api (UI nie jest jedyną bramką).

## Widok: Kontekst firmy

- Formularze / sekcje: tożsamość, oferta, głos SM, CTA/kanały, odbiorca.
- Widoczny status kompletności per sekcja.
- Zapis: tylko admin; user — read-only z komunikatem.

## Widok: Runy

- Źródło: `GET /api/v1/runs` — **runy całej instancji**.
- Kolumny listy: `runId`, typ tasku, platforma (lub `web` przy page_*), `contentKind` gdy page_*, język, status, `createdAt`, email inicjatora (`startedBy.email`).
- Paginacja: **10** na stronę, najnowsze pierwsze; stały rozmiar strony.
- Filtry MVP: status (w tym `interrupted`), `taskType` (post_*, reel_*, page_*), platforma (w tym `web`), użytkownik inicjujący (`userId`).
- Akcja: nowy run — select `taskType` obejmuje rolki i page_*; **`contentKind` widoczne gdy page_***; **platforma ukryta/disabled gdy page_***; język; ewent. `selectedIdeaIds` dla samego content/script.
- Brief formularza **zależny od `taskType`**: przy post_* / reel_* — temat + opcjonalnie grupa, cel, **liczba pomysłów**; **ukryć** kąt i długość. Przy `page_*` — temat + opcjonalnie grupa, cel, **kąt (Challenger)**, **długość (słowa)**; **ukryć** liczbę pomysłów. CTA nie jest polem briefu (kontekst firmy).
- Zmiana względem: jeden zestaw pól briefu SM (w tym `ideaCount`) na start page.
- Start zablokowany wizualnie, gdy globalnie agenci nieaktywni.
- **Nawigacja:** klik wiersza → podstrona **Run (szczegóły)** dla tego `runId`.

Major FE implementuje widoki; ten dokument ustala **kontrakt** formularza i wyniku (rolka vs post vs strona).

## Widok: Run (szczegóły) — obowiązkowy live

Wejście: z listy Runy SM (klik) lub bezpośredni deep-link po `runId`.

| Element | Zachowanie |
|---------|------------|
| **Nagłówek / meta** | Te same podstawowe pola co wiersz listy + ewent. `conversationId` (ops light) |
| **Status live** | Subskrypcja SSE `.../events`; zmiana statusu **natychmiast**; prezentacja **animowana / atrakcyjna** (np. pulsacja / progress przy `running`, wyraźny stan `awaiting_hitl`, **czytelny przestój `interrupted`** — nie ta sama pulsacja co `running`, sukces/fail) — nie tylko szary label |
| **Logi** | Przyrostowo z SSE `run.log` + możliwość dociągnięcia historii GET logs |
| **HITL** | Panel wyboru: pomysły postu, pomysły rolek albo outline strony — wg `taskType` i `hitl.options`; submit → `POST .../hitl` |
| **Wynik** | Po `completed`: widok **postu** (`ideas` / `content`), **rolki** (`reelIdeas` / `reelScript.segments`) albo **strony** (`pageOutline` / `pageDocument`) — nie jeden szablon na wszystko; przy `failed` — to, co zdążyło się zapisać |
| **Edytuj** | Widoczny gdy jest wynik i przegląd **nie** jest zatwierdzony **oraz** sesja = `startedBy`. Klik → użytkownik edytuje treść w UI; api ustawia **wyłącznie flagę** `outputEdited: true` (bez diff / % w MVP; oryginał agentów w DB bez nadpisu w MVP) |
| **Ocena gwiazdkowa (1–5)** | Po `completed` **albo** `failed`, tylko autor runu. Dobrowolna: brak wyboru = w DB zostaje `userRating: null`. Do zatwierdzenia można zmieniać wybór (w tym wrócić do braku oceny). Czytelne gwiazdki, nie sam numeric input |
| **Zamknij / zapisz przegląd** | Zatwierdza aktualną ocenę (`null` albo `1–5`) i flagę edycji. Po sukcesie kontrolki oceny i Edytuj są zablokowane |

**SSE — start i koniec.** Gdy snapshot GET już ma status `completed` albo `failed`, UI **nie** otwiera SSE (wystarczy GET run / logs). W trakcie live: po evencie `run.completed` albo `run.failed` UI **zamyka** `EventSource` (`close()`). Tego zamknięcia ani `onerror` po tym `close()` **nie** wolno traktować jako restartu api.

Reconnect SSE: odtworzyć subskrypcję wyłącznie po nieoczekiwanym zerwaniu, gdy status runu jest wciąż nieterminalny; status i logi uzupełnić snapshotem GET. Po restarcie api snapshot może pokazać `interrupted` zanim znowu `running` — nie zakładać natychmiastowego powrotu do pulsu pipeline. Przeglądarkowy `EventSource` sam wznawia połączenie po close serwera — bez `close()` po terminalu powstaje pętla na `.../events`.

Zmiana względem wcześniejszego zapisu: reconnect był ogólny, bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

Ocena i Edytuj **nie** są HITL (HITL = wybór z listy w trakcie pipeline).

## Formularz: Zostaw opinię (zapis MVP)

Modal / panel z layoutu (CTA globalny). Wymaga sesji.

| Pole | Zachowanie |
|------|------------|
| **Co oceniasz** | Wybór: **aplikacja** \| **agent** \| **run** |
| **Agent** | Gdy target = agent: **obowiązkowy** select stałego enumu: `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `PageWriterAgent` (labelki PL w UI) |
| **Run** | Gdy target = run: **obowiązkowy** select runów **zalogowanego** użytkownika — źródło `GET /api/v1/runs/user/:userId` (`:userId` = id z `/auth/me`). Lista **wszystkich** jego runów (bez paginacji 10 z dashboardu) |
| **Treść** | Pole tekstowe opinii |

Zapis → `POST /api/v1/feedback`. Wiele opinii w czasie (append). Brak ekranu listy opinii i panelu admina w MVP.

Authz selecta runów: wyłącznie runy autora; obcy `userId` → api `403`.

## Widok: Użytkownicy (admin)

- Lista użytkowników (`GET /users`).
- Tworzenie tylko `role = user` + hasło wg `security.md`.
- Brak UI do tworzenia drugiego admina.
- Brak UI edycji / soft-delete w MVP (api ma soft-delete pod późniejsze V1).

## Stany puste i błędy

- Brak admina: first-run → bootstrap → dashboard.
- Pusty kontekst / po pierwszym wejściu admina: onboarding → uzupełnij kontekst → „Agenci aktywni”.
- Błędy API: czytelny komunikat z `code` / `message` (bez stack trace).
- `failed` run: status + ostatnie logi z powodem (verifier / gateway).
- `interrupted` run: status + informacja, że wznowienie czeka na wolny slot (bez panelu HITL i bez oceny).

## Poza zakresem UX MVP

- Zmiana hasła / email / usuwanie własnego konta przez użytkownika  
- Soft-delete użytkowników w UI admina (endpoint api istnieje; UI później)  
- Panel administracyjny opinii / średnich ocen / analityki feedbacku (**V1 — rozbudowa**)  
- Stopień edycji outputu (diff / procent) — tylko flaga w MVP  
- Zmiana oceny po „Zamknij / zapisz przegląd”  
- Motywy dark/light jako wymóg  
- i18n UI (EN)  
- Pipeline builder, drag-and-drop agentów  
- Pixel-perfect design system / Figma jako część docs  
- Automatyczne testy FE (`testy.md` — poza MVP)

Implementacja wizualna statusu live należy do frontu; ten dokument ustala **wymaganie zachowania** (live + atrakcyjna animacja statusu), nie konkretną bibliotekę motion.
