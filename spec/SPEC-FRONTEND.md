---
wersja: 20
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-12
---

# SPEC — Frontend

## Cel / zakres względem dokumentacji

Norma `apps/frontend`: cienki klient self-host (**strona główna = karta logowania**, akceptacja zaproszenia jako deep link, dashboard **po sesji** w tym widok **Konto**, flow’y Social i Content, HITL, logi, **zapis opinii / oceny / edycji wyniku**), spójny z `docs/ux_dashboard.md` i kontraktem `SPEC-KOMUNIKACJA.md` / `SPEC-AUTH.md` / `SPEC-FEEDBACK.md` / `SPEC-RUNY.md`.

Aplikacja `apps/frontend` **już istnieje** w monorepo jako cienki klient Next (App Router, `modules/`). Ten SPEC dotyczy **ekranów i zachowania produktowego** na tym kliencie — bez ponownego bootstrapu aplikacji.

Bez reguł domenowych pipeline’u, bez bramki kompletności jako jedynej egzekucji, bez sekretów LLM.

Zmiana względem wersji 13 / cel: dopisano akceptację zaproszenia i zapis **treści** wyniku (nie tylko flagi); nota, że SPEC nie oznacza tworzenia aplikacji od zera.
Zmiana względem wersji 14 / cel: strona główna = karta logowania (nie osobny first-run); dashboard po sesji.
Zmiana względem wersji 15 / cel: wylogowanie z modalem w chrome dashboardu od pierwszego layoutu po sesji.
Zmiana względem wersji 18 / cel: miejsce wylogowania było „chrome (sidebar lub header)”. Od tej wersji wyłącznie **header** (login jako przycisk → „Wyloguj się”; zawartość headera do prawej).

## Powiązanie ze stylem z docs / wyjątek

Wiążące (`docs/architektura.md`): Next.js jako UI; pobieranie i mutacje wyłącznie przez `apps/api`; sekrety LLM nigdy w bundlu.

**Wyjątek względem stylu globalnego api:** tak — **bez** ceremonialnej Clean Architecture / warstwy domain SM w Next. Obowiązuje jednak **podział modułowy** kodu FE (`modules/`), nie płaski „dump” komponentów.

Zmiana względem wersji 2: katalog modułów UI to `modules/` (wcześniej `features/` w tej sekcji, w drzewie „Wzorce / struktura”, w tabeli „Organizacja” oraz w kryteriach akceptacji). Źródło: `docs/architektura_katalogi_pliki.md`.

## Wymagania (egzekwowalne)

F-1. App Router: **Server Components domyślnie**; `"use client"` tylko tam, gdzie potrzeba interakcji, formularzy, SSE, floating boxa lub stanu przeglądarki. Chronione dane **wolno** czytać w RSC (cookie na originie FE — F-2).

F-2. Przeglądarka woła **same-origin** `/api/v1/...` (BFF Next). Natywny `fetch` z `credentials: 'include'` / `'same-origin'`. Next proxy’uje do `apps/api` (`API_BASE_URL` tylko na serwerze). **Zakaz** `NEXT_PUBLIC_API_BASE_URL` jako URL-a, pod który idzie przeglądarka. Proxy **musi** przekazywać `Cookie` / `Set-Cookie` i **strumieniować** SSE (bez pełnego bufora). Bez wymogu React Query / SWR w MVP.

Zmiana względem wersji 19 / F-2: fetch z `credentials` **wprost** na origin `apps/api` (`NEXT_PUBLIC_API_BASE_URL`). Od tej wersji BFF; cookie na originie FE (`docs/deployment.md`, `docs/security.md`).

F-3. Typy request/response / enumy / brand types z **`@content-chain/shared`** na granicy FE — bez duplikacji DTO „na piechotę”.

F-4. Auth web: wyłącznie cookie **`cc_access`** i **`cc_refresh`** (httpOnly) — patrz `SPEC-AUTH.md`. FE **nie** przechowuje JWT w `localStorage`, memory jako store tokenu ani zmiennych `NEXT_PUBLIC_*`. Brak nagłówka `Authorization: Bearer` jako modelu MVP (także Postman — cookie jar).

F-4a. Probe sesji **oraz każde** produktowe wywołanie do `/api/v1`: przy **401** → `POST /auth/refresh` → **jednorazowy** retry żądania; kolejny **401** → **strona główna (karta logowania)**. Start / reload: `GET /auth/me` → (401) refresh → `GET /auth/me`. Gdy `GET /auth/bootstrap-status` → `available: true`, **ten sam** formularz submituje `POST /auth/bootstrap-admin` zamiast `POST /auth/login`. Dashboard (sidebar) wyłącznie po sesji. Na stronie głównej przycisk **„Nie masz konta? Zarejestruj się!”** jest **nieaktywny** w MVP.

Zmiana względem wersji 19 / F-4a: refresh tylko przy starcie aplikacji. Od tej wersji ten sam cykl na każdym fetchu (TTL access ~15 min).
Zmiana względem wersji 14 / F-4a: osobny ekran first-run albo logowanie. Od tej wersji jeden widok główny = logowanie; first-run = tryb submitu; rejestracja wizualna, nieaktywna (`docs/ux_dashboard.md`).

F-5. Live status runu: **SSE** `.../runs/:runId/events` (same-origin BFF, ta sama sesja cookie). **N×** `EventSource` wyłącznie dla **własnych** runów w `running` \| `awaiting_hitl` \| `interrupted` (rejestr layoutu: max jedno połączenie na `runId`). `queued` **bez** SSE (GET). Zakaz pollingu statusu **konkretnego** runu jako kanału live. GET archiwum Runy co 15 min **nie** jest kanałem live. Status wizualnie animowany / czytelny (`docs/ux_dashboard.md`) — w tym odrębny stan **`interrupted`**. Typ statusu z `@content-chain/shared`.

Zmiana względem wersji 19 / F-5: jeden SSE na stronie szczegółów; chip instancji. Od tej wersji rejestr N połączeń + floating box; archiwum bez live.

Zmiana względem wersji 4 / F-5: zbiór statusów UI bez `interrupted`; po restarcie UI mogło mylić przestój recovery z aktywnym pipeline.

F-5a. Cykl życia `EventSource`: gdy snapshot GET jest `completed` \| `failed` **albo** `queued`, UI **nie** otwiera SSE. Po evencie `run.completed` \| `run.failed` — `EventSource.close()`. Reconnect wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted`.

Zmiana względem wersji 19 / F-5a: zakaz otwarcia obejmował tylko terminal; `queued` też bez socketa.

Zmiana względem wersji 5 / F-5: F-5 i „Wolno: Reconnect SSE” bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

F-6. Bramka „Agenci aktywni” i disable CTA startu runu — UX na bazie `GET .../completeness`; **egzekucja** nadal w api (`409` `CONTEXT_INCOMPLETE`).

F-7. Język chrome / etykiet: **polski**. Envelope błędów MVP: pokazać **`code` i `message` jak z API** (angielskie `message` — bez mapy tłumaczeń). next-intl / i18n envelope = **V1 — rozbudowa**. Treści SM: PL/EN wg briefu runu. Formularz startu runu (**tylko Konto**): pola briefu **wg `taskType`** — post/reel: liczba pomysłów, bez kąta/długości; `page_*`: kąt i długość opcjonalnie, **bez** liczby pomysłów (`docs/ux_dashboard.md`).

Zmiana względem wersji 19 / F-7: błędy miały być „zrozumiałe po polsku” bez rozstrzygnięcia envelope. Od tej wersji envelope as-is; i18n = V1.

Zmiana względem wersji 8 / F-7: język UI bez rozróżnienia pól briefu kanału.

F-8. Widoki minimalne wg `docs/ux_dashboard.md`:

- Strona główna: tło + karta logowania + nieaktywny **„Nie masz konta? Zarejestruj się!”**; first-run = tryb submitu tej karty; **akceptacja zaproszenia** na **`/invite/accept?token=`** (tożsame z URL w mailu `{APP_PUBLIC_URL}/invite/accept?token=…`) → `POST /auth/accept-invite` → strona główna — dashboard dopiero po loginie;
- Kontekst firmy (sekcje bramki + opcjonalne **extras**);
- **Runy** = archiwum instancji `completed` \| `failed` (`GET /runs?status=completed,failed`, strona 10, odświeżanie przy wejściu i co **15 min**). **Bez** startu, **bez** SSE, **bez** runów w toku (także cudzych);
- **Konto**: email (`PATCH /auth/me`); **Moje runy** (`GET /runs/user/:userId`, wszystkie statusy); **jedyny** formularz **startu** (brief wg `taskType`; bez `selectedIdeaIds`; prefill ze **snapshotu** `GET /runs/:runId`); opinia. Po **202** startu — zostajemy na Koncie;
- Run szczegóły: HITL / wynik **post vs rolka vs strona** / przegląd (bez `conversationId` w UI); live SSE tylko własny `running` \| `awaiting_hitl` \| `interrupted` (ten sam rejestr co box);
- HITL Social: **multi-select** (min. 1); Content: `[outline.id]`;
- Wynik dwuetapowy Social = listy `contents[]` / `reelScripts[]`; `characterCount` / `cta?` / `role?` jak UX;
- Użytkownicy (admin): lista + zaproszenie email; pending w tym wygasłe; resend/revoke;
- **Header**: zawartość do prawej; login → „Wyloguj się” → modal → `POST /auth/logout` → `/`;
- Globalny CTA opinii; na szczegółach: Edytuj (`result` + flaga), gwiazdki, finalize;
- Chip kompletności agentów; **floating box** własnych runów w toku poza Kontem (zwijany). **Nie** chip/stos w chrome.

Zmiana względem wersji 19 / F-8: Runy = cała instancja + start; po starcie szczegóły; chip „w toku”. Od tej wersji: Runy = archiwum; start+live = Konto; box; trasa invite jak mailer.

Zmiana względem wersji 3: dopisano kontrolki **zapisu** feedbacku (`docs/ux_dashboard.md`). Panel administracyjny odczytu opinii / analityka = **V1 — rozbudowa**, nie ten SPEC.
Zmiana względem wersji 7: zakaz logiki pipeline w FE obejmuje Social **i** Content (wcześniej sformułowanie „pipeline SM”).
Zmiana względem wersji 9 / F-8: single-select HITL SM, formularz extras, pola wyniku `characterCount` / `cta` / `role`.
Zmiana względem wersji 10 / F-8 (nota v9: single-select): od tej wersji HITL Social = **multi-select** (min. 1); widok wyniku dwuetapowego = lista, nie jeden blok. Content: akceptacja outline bez zmian.
Zmiana względem wersji 11 / F-8: „admin: tylko lista + tworzenie” implikowało pole hasła. Obowiązuje zaproszenie (email).
Zmiana względem wersji 13 / F-8: Users i accept-invite były „gdy ekran powstanie” / „przyszły” i poza DoD Fazy 5 API. Od tej wersji **oba są widokami MVP**. Edytuj zapisuje **treść** wyniku (nie samą flagę). Start bez `selectedIdeaIds`; `conversationId` poza UI; sygnał „run w toku” obowiązkowy.
Zmiana względem wersji 14 / F-8: osobne ekrany first-run i logowania. Od tej wersji strona główna = karta logowania (martwa rejestracja); dashboard tylko po sesji.
Zmiana względem wersji 15 / F-8: „Konto (tylko logout)” jako widok. Od v16 przycisk wylogowania + modal w layoutcie zalogowanym od początku.
Zmiana względem wersji 16 / F-8: z powrotem **widok Konto** (email, moje runy, szybki start, opinia); Runy bez zmian (instancja); wylogowanie w chrome zostaje.
Zmiana względem wersji 18 / F-8: „Wyloguj się” w chrome (sidebar lub header). Od tej wersji hierarchia **header → przycisk loginu → Wyloguj się**; zawartość headera do prawej.

F-9. Select runów w formularzu opinii: wyłącznie `GET /api/v1/runs/user/:userId` z id z `/auth/me`. Zakaz ładowania „wszystkich runów instancji” z `GET /runs` do tego selecta. UI **filtruje** pozycje do `completed` \| `failed` (lista API zostaje pełna — `SPEC-RUNY.md` R-3c). Select agentów = enum z shared (labelki PL). Ocena i Edytuj tylko gdy snapshot mówi, że sesja jest `startedBy` i przegląd niezamknięty. Submit `targetType=run` przy innym statusie i tak → **409** `RUN_NOT_REVIEWABLE` (`SPEC-FEEDBACK.md` Fbk-3a).

Zmiana względem wersji 12 / F-9: select pokazywał wszystkie runy autora (w tym w toku). Od tej wersji filtr kliencki `completed` \| `failed`; bramka HTTP jak w docs komunikacji.

Zmiana względem wersji 1: Konto nie obejmuje zmiany hasła; dodano first-run; lista runów = cała instancja z nawigacją lista → szczegóły; admin users bez edycji/dezaktywacji w UI (soft-delete UI nadal poza MVP).

## Norma implementacji

### Wzorce / struktura (modułowo)

```text
apps/frontend/src/
├── app/                    # App Router: routes, layouts
├── modules/                # moduły UI: auth, company-context, social, content, runs, users, feedback, …
│   └── <module>/
│       ├── components/
│       ├── api/            # fetch wrappers do endpointów modułu
│       └── …
├── shared/                 # UI kit (shadcn), utils — bez domeny api
└── …
```

| Element | Norma |
|---------|--------|
| Organizacja | **Moduły UI** pod `modules/` + `app/` na routing |
| Dane | `fetch` → `apps/api`; brak Prisma / gateway / LangGraph w FE |
| UI | **shadcn** + **Iconify** (`@iconify/react`) tam, gdzie ikony są potrzebne |
| Env publiczne | **brak** URL-a api w `NEXT_PUBLIC_*`; `API_BASE_URL` tylko serwer Next |

### Wolno

- Client components dla SSE, formularzy, HITL, floating boxa.
- Reconnect SSE wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted` + uzupełnienie snapshotem; `EventSource.close()` po evencie terminalnym.
- N× EventSource w rejestrze layoutu (jedno na `runId`); szczegóły **reuse** tego połączenia.
- Read-only podgląd kontekstu dla `user`; edycja tylko gdy sesja `admin`.
- First-run jako tryb submitu **tej samej** karty logowania.
- Nieaktywny przycisk „Zarejestruj się!”.
- Header: zawartość **do prawej**; login → „Wyloguj się”; modal; `POST /auth/logout` → `/`.
- Widok **Konto**: email, Moje runy (live), **start**, opinia; po starcie zostajemy tutaj.
- Widok **Runy**: archiwum `completed` \| `failed`; GET co 15 min + przy wejściu.
- Floating box poza Kontem (zwijany).
- Publiczny `/invite/accept?token=` → strona główna.
- Formularz opinii, gwiazdki i edytor wyniku jako Client Components.
- Zapis Edytuj przez `POST .../output-edited` z `result`.
- BFF: rewrite albo streaming Route Handler — byle Cookie + SSE bez bufora.

### Nie wolno

- Sekretów LLM, `X-Gateway-Key`, JWT w `NEXT_PUBLIC_*` / localStorage.
- `NEXT_PUBLIC_API_BASE_URL` i bezpośredniego fetcha przeglądarki na origin api.
- Buforowania SSE w BFF.
- Pollingu statusu **jednego** runu zamiast SSE.
- `EventSource` na `queued` / `completed` / `failed` albo drugiego socketa na ten sam `runId`.
- Zostawiania `EventSource` otwartego po `completed`/`failed` ani reconnectu po zamknięciu terminalnym.
- Prezentowania `interrupted` tą samą animacją / copy co `running`.
- Chipu / stosu chipów „w toku” w chrome (obowiązuje floating box).
- Formularza startu na widoku **Runy**.
- Traktowania GET archiwum (15 min) jako kanału live szczegółów.
- Egzekucji bramki kompletności **tylko** w UI.
- Logiki pipeline Social / Content / verifiera / promptów w FE.
- Płaskiego `components/` bez `modules/`.
- Bearer access jako modelu MVP.
- Self-service hasła zalogowanego i usuwania własnego konta. **Zmiana własnego emaila jest w MVP.**
- Ładowania listy instancji (`GET /runs` bez filtra terminalnego) jako „Moje runy”.
- UI create użytkownika z hasłem; UI soft-delete w MVP.
- Pomijania Users albo `/invite/accept` w MVP.
- Pokazywania dashboardu bez sesji; osobnej strony first-run.
- Wylogowania bez modala albo „Wyloguj się” w sidebarze.
- Headera z zawartością nie do prawej.
- Aktywnego „Zarejestruj się!” / otwartego signup.
- Panelu admina opinii w MVP.
- Wysyłania edycji inną drogą niż `POST .../output-edited`; re-invoke pipeline; `selectedIdeaIds` na starcie; `conversationId` w UI.
- Wyniku dwuetapowego Social jako jednego bloku; single-select HITL Social.
- Mapowania envelope błędów na PL w MVP (obowiązuje `code` + `message` z API).

Zmiana względem wersji 19 / „Nie wolno”: kanon Runy+start+chip oraz fetch wprost na api — unieważnione na rzecz BFF, archiwum, Konta jako startu, boxa.

Zmiana względem wersji 13 / „Nie wolno”: zakaz „nadpisu wyniku poza flagą” unieważniony — kanon to zapis treści + flaga (`docs/ux_dashboard.md`). „Gdy powstanie” na Users / accept-invite unieważnione.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Next.js App Router | obowiązkowe |
| Natywny `fetch` + cookies (BFF same-origin) | obowiązkowe |
| `@content-chain/shared` | obowiązkowe |
| shadcn + Iconify (gdy ikony) | obowiązkowe |
| React Query / SWR | poza wymogiem MVP |
| Automatyczne testy FE | poza MVP (`docs/testy.md`) |

## Kryteria akceptacji

- [ ] Strona główna: karta logowania + nieaktywny „Zarejestruj się!”; first-run = tryb tej karty; **`/invite/accept?token=`** → logowanie; chrome po polsku; dashboard tylko po sesji.
- [ ] Header: do prawej; login → „Wyloguj się”; modal → logout → `/`.
- [ ] Fetch same-origin `/api/v1`; 401 → refresh → retry; cookie httpOnly na originie FE.
- [ ] **Runy** = archiwum `completed` \| `failed` (15 min + wejście); **Konto** = start + Moje runy live; po starcie Konto.
- [ ] N× SSE tylko własne `running` / `awaiting_hitl` / `interrupted`; `close()` na terminalu; `queued` bez socketa; floating box poza Kontem.
- [ ] Start zablokowany w UI przy niekompletności **i** api 409.
- [ ] Konto: email; moje runy → szczegóły; start (prefill ze snapshotu); opinia.
- [ ] Admin: Users + zaproszenie; accept-invite → `/`.
- [ ] `app/` + `modules/`; typy z shared; brak sekretów LLM; brak `NEXT_PUBLIC_` URL-a api.
- [ ] Opinia / gwiazdki / Edytuj / finalize wg kontraktu; HITL Social multi-select; wynik then_* = listy.
- [ ] Envelope błędu: `code` + `message` z API.

## Poza zakresem

- Playwright / testy FE, dark/light jako wymóg.
- i18n / next-intl (**V1 — rozbudowa**).
- Limit per-user runów w toku (**V1 — rozbudowa**, obowiązkowy).
- Pixel-perfect / Figma jako norma.
- Publikacja postów na API portali (v2).
- OAuth / social login.
- Otwarta rejestracja.
- Zmiana hasła zalogowanego / usuwanie własnego konta; soft-delete users w UI.
- `selectedIdeaIds` na starcie; `conversationId` w UI.
- Panel admina opinii / diff / historia wersji outputu.
- Nowy endpoint SSE „moje runy”.
