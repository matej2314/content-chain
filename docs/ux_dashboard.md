# UX Dashboard — Content Chain

Kierunek UI self-host (`apps/frontend`) dla MVP. Bez specyfikacji pikseli / design systemu — widoki, stany i zachowanie względem API/SSE.

Powiązane: `dokumentacja_koncepcyjna.md`, `dokumentacja_komunikacji.md`, `data_flow.md`, `security.md`, `observability.md`.

## Założenia UX

- Cienki klient: reguły i pipeline w `apps/api`.
- Język **UI: polski** (generowane treści SM: PL/EN wg briefu runu).
- Nawigacja: **sidebar** + obszar roboczy.
- Live run: status **na żywo (SSE)**, wizualnie **animowany / czytelnie atrakcyjny** (nie suchy sam tekst „running”).

## Nawigacja (sidebar)

| Widok | Kto | Cel |
|-------|-----|-----|
| **Kontekst firmy** | admin: edycja; user: podgląd | Uzupełnienie sekcji bramki; podgląd completeness |
| **Runy SM** | admin, user | Lista runów + start nowego (brief, task, platforma, język) |
| **Run (szczegóły)** | admin, user | Live status, logi, HITL, wynik |
| **Użytkownicy** | tylko admin | Lista / tworzenie `user` (bez drugiego admina — `security.md`) |
| **Konto** | każdy | Wylogowanie; ewent. zmiana własnego hasła (jeśli w zakresie api) |

## Globalny wskaźnik: czy agenci są aktywni

Stały element UI (np. pasek pod headerem / chip w sidebarze), widoczny na wszystkich widokach:

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

- Lista: `runId`, typ tasku, platforma, język, status, czas.
- Akcja: nowy run (brief, `taskType`, platforma, język, ewent. `selectedIdeaIds` dla samego content).
- Start zablokowany wizualnie, gdy globalnie agenci nieaktywni.

## Widok: Run (szczegóły) — obowiązkowy live

| Element | Zachowanie |
|---------|------------|
| **Status live** | Subskrypcja SSE `.../events`; zmiana statusu **natychmiast**; prezentacja **animowana / atrakcyjna** (np. pulsacja / progress przy `running`, wyraźny stan `awaiting_hitl`, sukces/fail) — nie tylko szary label |
| **Logi** | Przyrostowo z SSE `run.log` + możliwość dociągnięcia historii GET logs |
| **HITL** | Panel wyboru pomysłów, gdy `awaiting_hitl` + `run.hitl`; submit → `POST .../hitl` |
| **Wynik** | Ideas / content po `completed` (czytelny podgląd, kopiowanie) |
| **Korelacja (ops light)** | Opcjonalnie `conversationId` / `runId` w panelu szczegółów (dla debugu) |

Reconnect SSE: UI powinien odtworzyć subskrypcję; status i logi można uzupełnić snapshotem GET run / logs.

## Widok: Użytkownicy (admin)

- Lista użytkowników.
- Tworzenie tylko `role = user` + hasło wg `security.md`.
- Brak UI do tworzenia drugiego admina.

## Stany puste i błędy

- Pusty kontekst / pierwsze uruchomienie: onboarding → uzupełnij kontekst → „Agenci aktywni”.
- Błędy API: czytelny komunikat z `code` / `message` (bez stack trace).
- `failed` run: status + ostatnie logi z powodem (verifier / gateway).

## Poza zakresem UX MVP

- Motywy dark/light jako wymóg  
- i18n UI (EN)  
- Pipeline builder, drag-and-drop agentów  
- Pixel-perfect design system / Figma jako część docs  
- Automatyczne testy FE (`testy.md` — poza MVP)

Implementacja wizualna statusu live należy do frontu; ten dokument ustala **wymaganie zachowania** (live + atrakcyjna animacja statusu), nie konkretną bibliotekę motion.
