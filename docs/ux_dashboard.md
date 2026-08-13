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
| **Runy SM** | admin, user | Lista runów całej instancji + start nowego; klik wiersza → szczegóły |
| **Run (szczegóły)** | admin, user | Podstrona po kliknięciu w liście: live status, logi, HITL, wynik |
| **Użytkownicy** | tylko admin | Lista + tworzenie `user` (bez edycji / dezaktywacji w UI MVP) |
| **Konto** | każdy | Wylogowanie |

## Globalny wskaźnik: czy agenci są aktywni

Stały element UI (np. pasek pod headerem / chip w sidebarze), widoczny na wszystkich widokach po zalogowaniu:

| Stan | Warunek | Przekaz (PL) |
|------|---------|--------------|
| **Agenci aktywni** | `completeness.complete === true` | Można uruchamiać flow’y SM |
| **Agenci nieaktywni / zablokowani** | kontekst niekompletny | Start runów zablokowany; lista brakujących sekcji + link do Kontekstu |
| **Run w toku** (uzupełnienie) | istnieje run w `running` / `awaiting_hitl` | Opcjonalny drugi sygnał: „Trwa run…” z linkiem do szczegółów |

Źródło: `GET /company-context/completeness` (+ lista runów / SSE).  
CTA „Start runu” disabled + tooltip, gdy agenci nieaktywni — zgodnie z **409** `CONTEXT_INCOMPLETE` po stronie api (UI nie jest jedyną bramką).

## Widok: Kontekst firmy

- Formularze / sekcje: tożsamość, oferta, głos SM, CTA/kanały, odbiorca.
- Widoczny status kompletności per sekcja.
- Zapis: tylko admin; user — read-only z komunikatem.

## Widok: Runy SM

- Źródło: `GET /api/v1/runs` — **runy całej instancji**.
- Kolumny listy: `runId`, typ tasku, platforma, język, status, `createdAt`, email inicjatora (`startedBy.email`).
- Paginacja: **10** na stronę, najnowsze pierwsze; stały rozmiar strony.
- Filtry MVP: status, `taskType`, platforma, użytkownik inicjujący (`userId`).
- Akcja: nowy run (brief, `taskType`, platforma, język, ewent. `selectedIdeaIds` dla samego content).
- Start zablokowany wizualnie, gdy globalnie agenci nieaktywni.
- **Nawigacja:** klik wiersza → podstrona **Run (szczegóły)** dla tego `runId` (podstawowe info z listy; pełny live / logi / HITL / wynik na szczegółach).

## Widok: Run (szczegóły) — obowiązkowy live

Wejście: z listy Runy SM (klik) lub bezpośredni deep-link po `runId`.

| Element | Zachowanie |
|---------|------------|
| **Nagłówek / meta** | Te same podstawowe pola co wiersz listy + ewent. `conversationId` (ops light) |
| **Status live** | Subskrypcja SSE `.../events`; zmiana statusu **natychmiast**; prezentacja **animowana / atrakcyjna** (np. pulsacja / progress przy `running`, wyraźny stan `awaiting_hitl`, sukces/fail) — nie tylko szary label |
| **Logi** | Przyrostowo z SSE `run.log` + możliwość dociągnięcia historii GET logs |
| **HITL** | Panel wyboru pomysłów, gdy `awaiting_hitl` + `run.hitl`; submit → `POST .../hitl` |
| **Wynik** | Ideas / content po `completed` (czytelny podgląd, kopiowanie) |

Reconnect SSE: UI powinien odtworzyć subskrypcję; status i logi można uzupełnić snapshotem GET run / logs.

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

## Poza zakresem UX MVP

- Zmiana hasła / email / usuwanie własnego konta przez użytkownika  
- Soft-delete użytkowników w UI admina (endpoint api istnieje; UI później)  
- Motywy dark/light jako wymóg  
- i18n UI (EN)  
- Pipeline builder, drag-and-drop agentów  
- Pixel-perfect design system / Figma jako część docs  
- Automatyczne testy FE (`testy.md` — poza MVP)

Implementacja wizualna statusu live należy do frontu; ten dokument ustala **wymaganie zachowania** (live + atrakcyjna animacja statusu), nie konkretną bibliotekę motion.
