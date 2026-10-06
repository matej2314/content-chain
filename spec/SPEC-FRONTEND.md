---
wersja: 37
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-06
---

# SPEC — Frontend

## Cel / zakres względem dokumentacji

Norma `apps/frontend`: cienki klient self-host (**strona główna = karta logowania**, **otwarta rejestracja**, **thank-you + resend** w `production`, deep link aktywacji → login + toast, akceptacja zaproszenia jako deep link, dashboard **po sesji** w tym widok **Konto**, flow’y Social i Content, HITL, logi, **zapis opinii / oceny / edycji wyniku**), spójny z `docs/ux_dashboard.md` i kontraktem `SPEC-KOMUNIKACJA.md` / `SPEC-AUTH.md` / `SPEC-FEEDBACK.md` / `SPEC-RUNY.md`.

Aplikacja `apps/frontend` **już istnieje** w monorepo jako cienki klient Next (App Router, `modules/`). Ten SPEC dotyczy **ekranów i zachowania produktowego** na tym kliencie — bez ponownego bootstrapu aplikacji.

Bez reguł domenowych pipeline’u, bez bramki kompletności jako jedynej egzekucji, bez sekretów LLM.

Zmiana względem wersji 35 / cel: shell dashboardu rósł z treścią (chipy poza pierwszym ekranem); Moje runy bez paginacji UI. Od tej wersji: **viewport shell** (scroll tylko w `main`); **Moje runy** = paginacja UI `pageSize = 10` (slice FE; API R-3c bez zmian) — `docs/ux_dashboard.md`.

Zmiana względem wersji 13 / cel: dopisano akceptację zaproszenia i zapis **treści** wyniku (nie tylko flagi); nota, że SPEC nie oznacza tworzenia aplikacji od zera.
Zmiana względem wersji 14 / cel: strona główna = karta logowania (nie osobny first-run); dashboard po sesji.
Zmiana względem wersji 15 / cel: wylogowanie z modalem w chrome dashboardu od pierwszego layoutu po sesji.
Zmiana względem wersji 18 / cel: miejsce wylogowania było „chrome (sidebar lub header)”. Od tej wersji wyłącznie **header** (login jako przycisk → „Wyloguj się”; zawartość headera do prawej).
Zmiana względem wersji 23 / cel: kanon milczał o kanale „wydarzyło się”. Od tej wersji toast (Sonner) w layoutcie po sesji — obok live (F-5) i envelope (F-7); `docs/ux_dashboard.md`.
Zmiana względem wersji 24 / cel: F-8 nadal wymaga widoku **Konto** (start inline). Od tej wersji **druga** powierzchnia startu = modal **„Uruchom agenta”** na Runach (`docs/ux_dashboard.md`).

Zmiana względem wersji 25 / cel: brak Stop / `cancelled` w UX. Od tej wersji anulowanie: przycisk **Stop** + modal, toast **„Run anulowany”**, archiwum z `cancelled`, floating box bez Stop (`docs/ux_dashboard.md`).

Zmiana względem wersji 28 / cel: przegląd otwarty do ręcznego finalize bez limitu; disable tylko po `reviewFinalizedAt`. Od tej wersji disable także po serwerowym `reviewExpiresAt`; bez lokalnego wyliczania TTL; bez nowego chrome deadline/countdown — `docs/ux_dashboard.md`.

Zmiana względem wersji 30 / cel: nieaktywne „Zarejestruj się!” / zakaz otwartego signup. Od tej wersji aktywny signup, thank-you+resend (prod), deep link aktywacji → login + toast — `docs/ux_dashboard.md`.

Zmiana względem wersji 33 / cel: chip „Agenci aktywni” = wyłącznie completeness. Od tej wersji `agentsActive` = completeness ∧ `gatewayAlive` (api `/health/ready`) — `docs/ux_dashboard.md`, `docs/dictionary.md`.
Zmiana względem wersji 34 / cel: DEMO chip / locki `guest` poza SPEC. Od tej wersji F-10 + F-8 nawigacja guest; F-4b **bez** warunku `demoMode`.
Zmiana względem wersji 36 / F-10: locki `guest` ∧ demo — bez jawnej ścieżki invite. Od tej wersji po accept+login przy demo on obowiązują te same locki co po register→guest (`SPEC-AUTH.md` A-7b); predykat F-10 **bez zmian**.

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

F-4a. Probe sesji **oraz każde** produktowe wywołanie do `/api/v1`: przy **401** `UNAUTHORIZED` → `POST /auth/refresh` → **jednorazowy** retry żądania; kolejny **401** `UNAUTHORIZED` → **strona główna (karta logowania)**. Start / reload: `GET /auth/me` → (**401** `UNAUTHORIZED`) refresh → `GET /auth/me`. Gdy `GET /auth/bootstrap-status` → `available: true`, **ten sam** formularz submituje `POST /auth/bootstrap-admin` zamiast `POST /auth/login`. Dashboard (sidebar) wyłącznie po sesji. Na stronie głównej przycisk **„Nie masz konta? Zarejestruj się!”** jest **aktywny**, gdy bootstrap **niedostępny**; przy first-run (bootstrap available) — ukryty / disabled. Cykl refresh → retry → karta logowania dotyczy wyłącznie **401** `UNAUTHORIZED` (sesja). **401** `INVALID_PASSWORD` (re-auth) **nie** uruchamia refresh ani `unauthorizedHandler` — błąd pod polem hasła, sesja zostaje.

Zmiana względem wersji 19 / F-4a: refresh tylko przy starcie aplikacji. Od tej wersji ten sam cykl na każdym fetchu (TTL access ~15 min).
Zmiana względem wersji 14 / F-4a: osobny ekran first-run albo logowanie. Od tej wersji jeden widok główny = logowanie; first-run = tryb submitu; rejestracja wizualna, nieaktywna (`docs/ux_dashboard.md`).
Zmiana względem: F-4a traktowało każdy **401** jak wygaśnięcie sesji — od tej wersji wyłącznie `UNAUTHORIZED` (decyzja A1 / `docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 30 / F-4a: nieaktywne „Zarejestruj się!”. Od tej wersji aktywny signup (bramka = bootstrap available) — `docs/ux_dashboard.md`.

F-4b. Rejestracja i aktywacja (UX):

1. Formularz rejestracji: email, hasło, powtórz hasło (confirm tylko UI; API = `{ email, password }`).
2. Po **201** z `user.verifiedAt === null` **lub** **503** `MAIL_DELIVERY_FAILED` (pending User utworzony): przejście / **pozostanie** na **stronie podziękowań** (copy sukcesu + „Nie otrzymałeś wiadomości e-mail?” + button **„Wyślij ponownie”** → `POST /auth/resend-activation` z email ze **stanu klienta**, nie z body **201**). Po **201** z ustawionym `verifiedAt` (poza prod): krótki sukces → login (bez obligatoryjnego thank-you).
3. Kolizja email (**409** `CONFLICT`, `message`: **`Email already in use`**): **zostajemy** na formularzu rejestracji; jawny błąd przy polu email — **bez** thank-you.
4. Deep link aktywacji **wyłącznie** `/?activationToken=…`: **natychmiast** widok logowania na `/`; w tle `POST /auth/activate`; po sukcesie toast **„Konto aktywowane! Możesz się zalogować.”** (**wyjątek** — Toaster dozwolony na niezalogowanym `/`). Błąd activate (**401**) → **ogólny** komunikat na karcie logowania. **Bez** dashboardu; **bez** Set-Cookie z activate.
5. Register / activate / resend **nie** ustawiają sesji w UI (brak cookie z tych tras).
6. Signup / thank-you / activate **nie** zależą od `demoMode` (F-4a / F-4b **bez** `if (!demoMode) hide`). Opcjonalne copy o ograniczeniach gościa na thank-you **nie** zmienia flow aktywacji.

Zmiana względem wersji 32 / F-4b: sygnał thank-you = `verifiedAt === null`; activate-fail bez **409**; wyjątek Toastera na `/` po sukcesie activate.
Zmiana względem wersji 34 / F-4b: milczenie o `demoMode`. Od tej wersji jawny zakaz bramkowania signup przez demo.

F-5. Live status runu: **SSE** `.../runs/:runId/events` (same-origin BFF, ta sama sesja cookie). **N×** `EventSource` wyłącznie dla **własnych** runów w `running` \| `awaiting_hitl` \| `interrupted` (rejestr layoutu: max jedno połączenie na `runId`). `queued` **bez** SSE (GET). Zakaz pollingu statusu **konkretnego** runu jako kanału live. GET archiwum Runy co 15 min **nie** jest kanałem live. Status wizualnie animowany / czytelny (`docs/ux_dashboard.md`) — w tym odrębny stan **`interrupted`** oraz terminal **`cancelled`** (nie mylić z `failed`). Typ statusu z `@content-chain/shared`.

Zmiana względem wersji 19 / F-5: jeden SSE na stronie szczegółów; chip instancji. Od tej wersji rejestr N połączeń + floating box; archiwum bez live.

Zmiana względem wersji 4 / F-5: zbiór statusów UI bez `interrupted`; po restarcie UI mogło mylić przestój recovery z aktywnym pipeline.

Zmiana względem wersji 25 / F-5: brak odrębnego stanu UI dla `cancelled`.

F-5a. Cykl życia `EventSource`: gdy snapshot GET jest `completed` \| `failed` \| `cancelled` **albo** `queued`, UI **nie** otwiera SSE. Po evencie `run.completed` \| `run.failed` \| **`run.cancelled`** — `EventSource.close()`. Reconnect wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted`. **Dodatkowo** (konsumpcja UI, nie nowy socket): jeden toast terminalu per `runId`, jeśli pathname **nie** jest szczegółami **tego** runu (`/runs/:runId`); na szczegółach tego runu — **zero** toasta terminalu z SSE (toast mutacji cancel — F-5b — bez dublowania SSE). Dedup po id toasta / per `runId`. **Zakaz** otwierania SSE na runie terminalnym „żeby pokazać toast” — toast wyłącznie z już otwartego live w rejestrze layoutu (własne runy) albo z odpowiedzi mutacji cancel.

Zmiana względem wersji 19 / F-5a: zakaz otwarcia obejmował tylko terminal; `queued` też bez socketa.

Zmiana względem wersji 5 / F-5: F-5 i „Wolno: Reconnect SSE” bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

Zmiana względem wersji 23 / F-5a: `close()` i zakaz SSE na terminalu **bez zmiany**; dopisano toast poza szczegółami (`docs/ux_dashboard.md`).

Zmiana względem wersji 25 / F-5a: terminal close tylko `completed` \| `failed`. Od tej wersji także `run.cancelled`.

F-5b. Anulowanie w UI (Stop):

1. Przycisk etykieta **Stop** — wyłącznie na **Moich runach** (Konto) oraz **szczegółach runu**, dla **własnego** runu w statusie nieterminalnym (`queued` \| `running` \| `awaiting_hitl` \| `interrupted`). Floating box **bez** Stop.
2. Przed API: modal **„Czy na pewno?”** — **Tak** = `POST /api/v1/runs/:runId/cancel`; **Nie** = zamknięcie modala, **zero** wywołań API.
3. Po **200** z cancel: toast sukcesu mutacji **„Run anulowany”** (zostajemy na widoku źródłowym). Gdy **nie** na `/runs/:runId` tego runu — toast z akcją **Szczegóły** (jak mapa UX). Dedup względem toasta SSE `run.cancelled` / `notifyRunTerminal` (jeden toast per `runId`).
4. Po sukcesie: odświeżenie wiersza / snapshotu (`cancelled`); na szczegółach panel HITL znika; przegląd (gwiazdki / Edytuj / finalize) niedostępny; partial wynik widoczny jak przy `failed`.
5. Floating box: po `cancelled` krótko label **„Anulowany”**, potem usunięcie pozycji po **200 ms** (nie trzymać anulowanego runu w boxie).

Zmiana względem: wcześniejszy kanon roboczy bez modala przed Stop — **unieważnione**; obowiązuje modal (`docs/ux_dashboard.md`).

F-6. Bramka „Agenci aktywni” i disable CTA startu runu — predykat UX:

`agentsActive` ⇔ `contextComplete` ∧ `gatewayAlive`

| Sygnał | Źródło |
|--------|--------|
| `contextComplete` | `GET .../company-context/completeness` → `complete === true` |
| `gatewayAlive` | `GET /api/v1/health/ready` → `checks.gateway.status === "healthy"` |

Chip zielony / aktywny **oraz** enable CTA startu = ten sam `agentsActive`. Disable dotyczy **obu** powierzchni: submit na Koncie **oraz** przycisk/modal **„Uruchom agenta”** na Runach. Copy nieaktywnego: **„Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.”** Gdy `complete === false`: wolno **dodatkowo** lista `missing` + link „Uzupełnij kontekst”. Gdy `complete === true` a gateway nie żyje: **bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji. Odświeżanie: mount + refetch przy okazji (np. po udanym zapisie kontekstu) — **bez** interval pollingu. **Egzekucja** twardej bramki kontekstu nadal w api (`409` `CONTEXT_INCOMPLETE` na `POST /runs`) — **bez** nowego rejectu „gateway down” na starcie runu. **Zakaz** wołania gateway z FE — wyłącznie BFF → `apps/api` (F-2).

Zmiana względem wersji 33 / F-6 (oraz v22 / v24): chip i disable = wyłącznie `GET .../completeness`. Od tej wersji AND z `gatewayAlive` z api `/health/ready`; copy i reguły remedacji wg `docs/ux_dashboard.md`. Druga powierzchnia startu (Konto + Runy) **bez unieważnienia**.

F-7. Język chrome / etykiet: **polski**. Envelope błędów MVP: w UI pokazać **wyłącznie `message` jak z API** (angielskie `message` — bez mapy tłumaczeń). **`code` nie jest treścią UI** — pozostaje w envelope HTTP do gałęzi klienta (np. `INVALID_PASSWORD` vs `UNAUTHORIZED`). next-intl / i18n envelope = **V1 — rozbudowa**. Treści SM: PL/EN wg briefu runu. Formularz startu runu (**Konto inline oraz modal na Runach** — ten sam brief): pola briefu **wg `taskType`** — post/reel: liczba pomysłów, bez kąta/długości; `page_*`: kąt i długość opcjonalnie, **bez** liczby pomysłów (`docs/ux_dashboard.md`). Błędy przy formularzu / błędzie GET bloku = `message` **w miejscu błędu** (także w modalu). Toast **nie** zastępuje envelope przy polu. Toast sukcesu mutacji = **polski** tytuł (`docs/ux_dashboard.md`), **z wyjątkiem** `PATCH /auth/me/email` (sukces i błędy — **bez** toastu; `message` pod polami modala). Jeśli toast błędu (poza formularzem, gdy mapa UX na to zezwala): to samo `message`, bez tłumaczenia i bez `code` w UI.

Zmiana względem: F-7 wymagało pokazywania **`code` i `message`**. Od tej wersji obowiązuje tylko **`message`** (`docs/ux_dashboard.md`).

Zmiana względem wersji 19 / F-7: błędy miały być „zrozumiałe po polsku” bez rozstrzygnięcia envelope. Od tej wersji envelope as-is; i18n = V1.

Zmiana względem wersji 8 / F-7: język UI bez rozróżnienia pól briefu kanału.

Zmiana względem wersji 23 / F-7: F-7 milczało o sukcesie mutacji (cisza po 200/202). Envelope as-is **bez unieważnienia**; toast nie zastępuje envelope przy polu.

Zmiana względem wersji 24 / F-7: formularz startu był „**(tylko Konto)**”. Od tej wersji **Konto (inline) i Runy (modal)**; pola briefu **bez zmiany**.

Zmiana względem: toast sukcesu mutacji bez wyjątku dla zmiany emaila — od tej wersji `PATCH /auth/me/email` **bez** toastu (`docs/ux_dashboard.md`).

F-8. Widoki minimalne wg `docs/ux_dashboard.md`:

- Strona główna: tło + karta logowania + **aktywny** **„Nie masz konta? Zarejestruj się!”** (gdy bootstrap niedostępny; przy first-run ukryty/disabled); first-run = tryb submitu tej karty; formularz rejestracji (F-4b); thank-you + resend po **201** w prod; **akceptacja zaproszenia** na **`/invite/accept?token=`** (tożsame z URL w mailu `{APP_PUBLIC_URL}/invite/accept?token=…`) → `POST /auth/accept-invite` → strona główna — dashboard dopiero po loginie; deep link aktywacji → widok logowania + activate w tle + toast (F-4b). Błędy wyłącznie `message` z envelope na karcie (bez Toastera na login/register/accept-invite — toast aktywacji **dozwolony** po sukcesie activate). Kolizja email na accept-invite i nieważny token = ten sam **401** — UI **bez** osobnego copy „email zajęty” i **bez** gałęzi na **409** `CONFLICT` z tej trasy. Kolizja na **register** = **409** → błąd przy polu email (F-4b). Opcjonalnie stała pomocnicza na accept-invite (bez leak z API): ogólne „Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.” — **tylko** jeśli mapowana z tego samego 401 (bez rozróżniania przyczyn po `code`);
- Kontekst firmy: **sześć zakładek** — Tożsamość (domyślnie otwarta), Oferta, Głos SM, CTA / kanały, Odbiorca, Dodatki (`extras` w jednym panelu, bez podzakładek). Na triggerach zakładek bramki indykator z `completeness.missing` ostatniego **udanego** GET/PUT (zielona = kompletna, czerwona = brak); zakładka Dodatki **bez** kropki bramki. Zapis = jeden `PUT` całości. Submit **nie** wysyła, gdy draft nie spełnia bramki (puste wymagane pole albo kaleka oferta); lokalny predykat identyczny z C-1 **wyłącznie** do disable CTA zapisu i błędów pól — **kropki** nadal wyłącznie z `missing` odpowiedzi (**nie** gateway); **chip** „Agenci aktywni” = F-6 (`agentsActive`, nie sam `missing`). Placeholdery pustej oferty stripowane; kalekiej usługi nie stripujemy. Nie da się usunąć ostatniej kompletnej usługi tak, by PUT poszedł z `items: []`. Szczegóły: `docs/ux_dashboard.md` (Widok: Kontekst firmy);
- **Runy** = archiwum instancji `completed` \| `failed` \| `cancelled` (`GET /runs?status=completed,failed,cancelled`, strona 10, odświeżanie przy wejściu i co **15 min**). **Bez** SSE, **bez** runów w toku na liście (także cudzych). CTA **„Uruchom agenta”** → modal z tym samym briefem co na Koncie (pusty draft; bez prefillu z archiwum). Po **202** z modalu — zostajemy na Runach, modal zamknięty, toast „Run wystartował”; live = floating box;
- **Konto**: email — formularz → modal re-auth (email **disabled** + `currentPassword`) → `PATCH /auth/me/email` `{ email, currentPassword }` (każdy Potwierdź z obu pól); złe hasło (`INVALID_PASSWORD`) / `VALIDATION_FAILED` pod polem hasła (email zostaje disabled; **bez** cyklu F-4a); **409** → modal otwarty, clear pól, odblokowanie emaila, błąd pod polem email; sukces bez toastu + `GET /auth/me`; Anuluj bez API (draft formularza bez zmian względem otwarcia); **Moje runy** (`GET /runs/user/:userId` — **pełna** lista HTTP; **paginacja UI** stałe `pageSize = 10` jak archiwum Runy — Poprzednia / `strona / totalPages (total)` / Następna; wszystkie statusy; **Stop** + modal na własnym nieterminalnym — F-5b); formularz **startu inline** (brief wg `taskType`; bez `selectedIdeaIds`; prefill ze **snapshotu** `GET /runs/:runId` z wiersza „Moje runy”); opinia. Po **202** startu **z Konta** — zostajemy na Koncie **oraz** toast „Run wystartował”;
- `PUT` kontekstu **200** → toast „Kontekst zapisany”; **400** → envelope przy formularzu, **zero** toasta (lokalny predykat / envelope); `POST .../cancel` **200** → toast **„Run anulowany”** (F-5b);
- Layout **zalogowany**: root **`h-dvh`** + overflow ukryty; **scroll tylko w `main`**; sidebar (desktop) = wysokość viewportu — DemoChip (gdy demo) + chip agentów **zawsze w viewportcie**; Toaster (warstwa `--z-toast`); pozycja **nie** gryzie się z floating boxem (toast `top-right`; box `bottom-right`). **Brak** Toastera na karcie logowania / first-run / accept-invite / formularzu register (toast po sukcesie activate — wyjątek F-4b);
- Run szczegóły: HITL / wynik **post vs rolka vs strona** / przegląd (bez `conversationId` w UI); **Stop** + modal (F-5b) dla własnego nieterminalnego; po `cancelled` HITL znika, przegląd niedostępny, partial wynik jak przy `failed`; live SSE tylko własny `running` \| `awaiting_hitl` \| `interrupted` (ten sam rejestr co box);
- HITL Social: **multi-select** (min. 1); Content: `[outline.id]`;
- Wynik dwuetapowy Social = listy `contents[]` / `reelScripts[]`; `characterCount` / `cta?` / `role?` jak UX;
- Użytkownicy (admin): lista + zaproszenie email; pending w tym wygasłe; resend/revoke;
- **Header**: zawartość do prawej; login → „Wyloguj się” → modal → `POST /auth/logout` → `/`;
- Globalny CTA opinii; na szczegółach: Edytuj (`result` + flaga), gwiazdki, finalize — **tylko** gdy snapshot `completed` \| `failed` (nie na `cancelled`) **oraz** przegląd otwarty (`reviewFinalizedAt === null` **i** nie minął serwerowy `reviewExpiresAt`); po zamknięciu copy **„Przegląd zamknięty”** (bez rozróżnienia auto vs ręczne); **bez** widocznego deadline / countdown / wiersza „dostępne do…”;
- Chip „Agenci aktywni” wg F-6 (`agentsActive`); **`DemoModeChipSlot` nad CompletenessChip** — **tylko dashboard**, gdy `demoMode === true` (F-10); **floating box** własnych runów w toku poza Kontem (zwijany; **bez** Stop). Po `cancelled`: krótko **„Anulowany”**, ukrycie pozycji po **200 ms**. **Nie** chip/stos „w toku” w chrome.
- Nawigacja F-8 wg roli: `admin` — Users + zaproszenia; `user` — bez Users; `guest` (demo on) — bez Users / bez zapisu kontekstu / bez Edytuj / finalize; archiwum lista OK; **zakaz** nawigacji do cudzego `/runs/:id` (403 z API). Istniejący `GuestView` w home-entry = stan **anonimowy** (login/register) — **nie** mylić z rolą `guest`.

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
Zmiana względem wersji 21 / F-8: Kontekst firmy = sekcje bramki + extras w jednym ciągu, status per sekcja przy nagłówku bloku. Od tej wersji: sześć zakładek (default Tożsamość); kropki bramki na triggerach z `missing` ostatniego GET/PUT; Dodatki bez kropki i bez podzakładek; zapis nadal jeden `PUT`.
Zmiana względem wersji 22 / F-8: submit mógł wysłać niekompletną bramkę (api zapisywało). Od tej wersji UI nie wysyła pustych wymaganych / kalekiej oferty; lokalny predykat C-1 tylko do disable i błędów pól. Źródło kropek **bez zmiany** (`missing`). Chip = F-6 (od v34: nie sam `missing`). Egzekucja persist: `SPEC-KONTEKST-FIRMY.md` C-4.
Zmiana względem wersji 23 / F-8: layout po sesji nie miał Toastera; 200 / 202 / terminal poza szczegółami = cisza. Floating box **bez zmiany** (w toku, znika na terminalu).
Zmiana względem wersji 24 / F-8: Runy „**Bez** startu”; Konto = **jedyny** formularz startu; po `202` wyłącznie Konto. Od tej wersji: dwie powierzchnie tego samego briefu (Konto inline + modal na Runach); po `202` widok źródłowy; archiwum nadal bez SSE / bez w toku na liście (`docs/ux_dashboard.md`). Powód: pierwsze testy UI w przeglądarce.

Zmiana względem wersji 25 / F-8: archiwum `completed` \| `failed`; brak Stop; floating box znika na terminalu bez reguły „Anulowany” + 200 ms. Od tej wersji archiwum + Stop (F-5b) + box po cancel.

Zmiana względem wersji 29 / F-8: założenie, że FE może rozróżnić kolizję email (**409**) od złego tokenu na accept-invite. Od tej wersji obie sytuacje = ten sam **401** / envelope na karcie (`docs/ux_dashboard.md`).

Zmiana względem wersji 30 / F-8: martwa rejestracja / brak thank-you / brak deep link aktywacji. Od tej wersji aktywny signup + F-4b.

Zmiana względem wersji 33 / F-8: chip kompletności = sam `missing` / completeness. Od tej wersji chip = F-6 (`agentsActive`); kropki zakładek **nadal tylko** `completeness.missing` (F-8 w tym zakresie **bez unieważnienia** sensu kropek).

Zmiana względem wersji 35 / F-8: layout rósł z treścią (sidebar/chipy poza pierwszym ekranem); Moje runy = pełna tabela bez paginacji UI. Od tej wersji: viewport shell + paginacja UI Moje runy (=10) — `docs/ux_dashboard.md`.

F-9. Select runów w formularzu opinii: wyłącznie `GET /api/v1/runs/user/:userId` z id z `/auth/me`. Zakaz ładowania „wszystkich runów instancji” z `GET /runs` do tego selecta. UI **filtruje** pozycje do `completed` \| `failed` \| (`cancelled` **oraz** istnieje nie-`null` pole wyniku w snapshotcie — per `SPEC-FEEDBACK.md` Fbk-3a; select może dociągnąć snapshot albo stosować regułę równoważną; **nie** pokazywać `cancelled` bez wyniku). Lista API zostaje pełna — `SPEC-RUNY.md` R-3c. Select agentów = enum z shared (labelki PL). Ocena, Edytuj i finalize tylko gdy snapshot mówi, że sesja jest `startedBy`, status `completed` \| `failed` i przegląd **otwarty**: `reviewFinalizedAt === null` **oraz** nie minął serwerowy **`reviewExpiresAt`** (deadline wyłącznie z API — **zakaz** lokalnego wyliczania z `pipelineFinishedAt` + stałej). FE-only disable **nie** jest jedyną bramką — api i tak zwraca `REVIEW_LOCKED` po TTL / finalize (`SPEC-RUNY.md` R-10). Po lokalnym expiry (lekki timer od pola `reviewExpiresAt` z API, bez SSE): UI jak zamknięty (copy „Przegląd zamknięty”); reload odświeża `reviewFinalizedAt` gdy sweeper zapisał — **nie** wymagane do disable. **Zakaz** nowego chrome deadline / countdown / wiersza „dostępne do…” w MVP tej zmiany. Submit `targetType=run` poza oknem Fbk-3a i tak → **409** `RUN_NOT_REVIEWABLE`.

Zmiana względem wersji 12 / F-9: select pokazywał wszystkie runy autora (w tym w toku). Od tej wersji filtr kliencki `completed` \| `failed`; bramka HTTP jak w docs komunikacji.

Zmiana względem wersji 25 / F-9: filtr bez `cancelled`. Od tej wersji `cancelled` z wynikiem wchodzi do selecta.

Zmiana względem wersji 28 / F-9: „przegląd niezamknięty” = tylko `reviewFinalizedAt === null`. Od tej wersji także serwerowy `reviewExpiresAt`; zakaz lokalnego TTL math i chrome deadline — `docs/ux_dashboard.md`.

F-10. DEMO MODE (UX) — `docs/ux_dashboard.md`:

1. Boot: `DemoModeProvider` (lub równoważny) woła publiczny `GET /config`; jedyne pole używane w V1: `demoMode`.
2. `DemoModeChipSlot` / `DemoChip` **nad** CompletenessChip — **tylko dashboard**, gdy `demoMode === true`. Copy w stylu „Tryb demo aktywny / Wybrane funkcje ograniczone” + Iconify. Przy `demoMode === false` chip **nie** jest widoczny.
3. Locki UI (sidebar, formy, disable `taskType` poza allowlistą, zapis kontekstu, Users, Edytuj/finalize, `PATCH /auth/me/email`): wyłącznie gdy **`session.role === 'guest'` AND `demoMode === true`**. Admin na instancji demo **bez** locków gościa. Ten sam predykat obejmuje konta `guest` z **register** oraz z **accept-invite** przy demo on (`SPEC-AUTH.md` A-7b) — po accept → `/` → login flow bez zmian; locki dopiero po sesji z `role === guest`.
4. `GuestLimitModal` **wyłącznie** po błędzie quota z API (`GUEST_TYPE_*` / `GUEST_GLOBAL_QUOTA_EXCEEDED`); CTA kontakt `{ iconName, contactData }[]` (mailto, LinkedIn, GitHub) — hardcoded FE. **Zakaz** preemptive modalu bez odpowiedzi API.
5. Rating: obsługa **429** (`message` z envelope). Feedback: `application`/`agent` OK; `run` tylko własny.
6. Egzekucja limitów = API; FE tylko odzwierciedla.

Zmiana względem wersji 34: chip/locki guest poza zakresem. Od tej wersji F-10.
Zmiana względem wersji 36 / F-10: bez jawnej ścieżki invite→guest. Od tej wersji zaproszony przy demo on podlega tym samym lockom co self-register guest; predykat **bez zmian**; `GuestView` ≠ `UserRole.guest` (F-8) — bez zmian.

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

- Client components dla SSE, formularzy, HITL, floating boxa, **DemoChip** / **GuestLimitModal**.
- Reconnect SSE wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted` + uzupełnienie snapshotem; `EventSource.close()` po evencie terminalnym (`completed` / `failed` / `cancelled`).
- N× EventSource w rejestrze layoutu (jedno na `runId`); szczegóły **reuse** tego połączenia.
- Stop + modal „Czy na pewno?” na Moich runach / szczegółach; `POST .../cancel` tylko po Tak (F-5b).
- Toast mutacji „Run anulowany”; toast SSE `run.cancelled` w `notifyRunTerminal` z dedupem per `runId`.
- Floating box: po `cancelled` label „Anulowany”, potem usunięcie po **200 ms**.
- Read-only podgląd kontekstu dla `user`; edycja tylko gdy sesja `admin`.
- Widok Kontekst firmy jako zakładki (`docs/ux_dashboard.md`); default Tożsamość; CTA zapisu na każdej zakładce przy jednym `PUT`.
- Lokalna kopia predykatu C-1 (`isComplete` / `isCompleteOfferItem`) w `modules/company-context` **wyłącznie** do disable CTA zapisu i błędów pól — **nie** import z `apps/api`; **nie** źródło kropek / chipa.
- Indykator kompletności na triggerze zakładki bramki z `completeness.missing` ostatniego GET/PUT (kropka + etykieta dostępności kompletna / niekompletna). Semantyczna zieleń / czerwień statusu — nie drugi brand produktu.
- Kompozycję `agentsActive` z `GET .../completeness` **oraz** `GET /api/v1/health/ready` (F-6) — bez zanieczyszczania lokalnego `isComplete` ani `isComplete` domeny siecią.
- Copy nieaktywnego chipa kanoniczne; dodatkowo `missing` + link `/context` tylko gdy `complete === false`.
- Refetch completeness / `/health/ready` przy mount i przy okazji (np. po udanym PUT kontekstu) — **bez** interval.
- First-run jako tryb submitu **tej samej** karty logowania.
- **Aktywny** przycisk „Zarejestruj się!” gdy bootstrap niedostępny; formularz register; thank-you + resend gdy **201** `verifiedAt === null` (lub **503** po utworzeniu pending); deep link aktywacji → login + activate w tle + toast (F-4b).
- Header: zawartość **do prawej**; login → „Wyloguj się”; modal; `POST /auth/logout` → `/`.
- Widok **Konto**: email z modalem re-auth (`PATCH /auth/me/email` + `currentPassword`; recovery **409**; `INVALID_PASSWORD` bez wylogowania), Moje runy (live; **paginacja UI** 10), **start inline**, opinia; po starcie **z Konta** zostajemy tutaj.
- Widok **Runy**: archiwum `completed` \| `failed` \| `cancelled`; GET co 15 min + przy wejściu; CTA/modal **„Uruchom agenta”** (ten sam brief); po **202** z Run — zostać, zamknąć modal.
- Client components dla modalu startu (Dialog kitu shadcn).
- Floating box poza Kontem (zwijany).
- Cienki wrapper `notifyProduct` / `notifyRunTerminal` (Sonner jako adapter; unia produktowa, bez `any`).
- Odczyt pathname App Router (`usePathname` lub równoważny) do `viewingRunId` przy toaście terminalu.
- Toaster w gałęzi authenticated layoutu; token `--z-toast`; **wyjątek:** toast po sukcesie activate na niezalogowanym `/`.
- Viewport shell: `h-dvh`, scroll wyłącznie w obszarze roboczym; chipy chrome w sidebarze w viewportcie.
- Publiczny `/invite/accept?token=` → strona główna.
- Formularz opinii, gwiazdki i edytor wyniku jako Client Components.
- Zapis Edytuj przez `POST .../output-edited` z `result`.
- Lekki timer lokalny od serwerowego `reviewExpiresAt` (disable kontrolek po expiry; bez SSE „dla TTL”; bez lokalnego math z `pipelineFinishedAt`).
- BFF: rewrite albo streaming Route Handler — byle Cookie + SSE bez bufora.

### Nie wolno

- Sekretów LLM, `X-Gateway-Key`, JWT w `NEXT_PUBLIC_*` / localStorage.
- `NEXT_PUBLIC_API_BASE_URL` i bezpośredniego fetcha przeglądarki na origin api.
- Wołania `apps/ai-provider-gateway` z FE (w tym `/health`, `/health/ready`, chat) — wyłącznie BFF → `apps/api`.
- Interval pollingu completeness albo `/health/ready` (obowiązuje mount + refetch przy okazji — F-6).
- Liczenia **chipa** wyłącznie z completeness (bez `gatewayAlive`) albo wyłącznie z `/health/ready` (bez completeness).
- Fałszywego „Uzupełnij kontekst” jako jedynej remedacji, gdy `complete === true` a gateway nie żyje.
- Buforowania SSE w BFF.
- Pollingu statusu **jednego** runu zamiast SSE.
- `EventSource` na `queued` / `completed` / `failed` / `cancelled` albo drugiego socketa na ten sam `runId`.
- Zostawiania `EventSource` otwartego po `completed`/`failed`/`cancelled` ani reconnectu po zamknięciu terminalnym.
- Prezentowania `interrupted` tą samą animacją / copy co `running`; traktowania `cancelled` jako `failed` w copy toasta / archiwum.
- Stop we floating boxie; cancel **bez** modala „Czy na pewno?”; admin-cancel cudzego runu z UI.
- Natychmiastowego usunięcia pozycji boxa po `cancelled` bez krótkiego labelu „Anulowany” (obowiązuje **200 ms**).
- Podwójnego toasta mutacja cancel + SSE `run.cancelled` bez dedupu.
- Chipu / stosu chipów „w toku” w chrome (obowiązuje floating box).
- Innego briefu / innego `POST /runs` na Runach niż na Koncie.
- Startu w sidebarze / headerze albo na szczegółach `/runs/:runId`.
- Prefillu startu z wiersza archiwum (obowiązuje wyłącznie „Moje runy” na Koncie).
- SSE albo wierszy `queued` / `running` / `awaiting_hitl` / `interrupted` na liście Runy (także po starcie z modalu).
- Wymuszania nawigacji na szczegóły po `202`.
- Traktowania GET archiwum (15 min) jako kanału live szczegółów.
- Egzekucji bramki kompletności **tylko** w UI.
- Liczenia **kropek / chipa** z draftu formularza albo z lokalnej kopii `isComplete` (kropki = `missing` z ostatniego udanego GET/PUT; chip = F-6). Lokalny predykat C-1 **nie** zastępuje C-4 / C-5 w api.
- Doklejania stanu gateway / `/health/ready` do kropek zakładek kontekstu (kropki **tylko** `completeness.missing` — F-8).
- Polegania na samym atrybucie `required` HTML jako bramce zapisu.
- Zapisywania kalekiej oferty (PUT z niepełną pozycją albo `items: []`).
- `PATCH` per zakładka w MVP (zapis kontekstu = jeden `PUT` całości).
- Indykatora bramki (kropki) na zakładce Dodatki.
- Zagnieżdżonych zakładek / podzakładek `extras`.
- Logiki pipeline Social / Content / verifiera / promptów w FE.
- Płaskiego `components/` bez `modules/`.
- Bearer access jako modelu MVP.
- Self-service hasła zalogowanego i usuwania własnego konta; confirm e-mail przy zmianie adresu (V1). **Zmiana własnego emaila z re-auth jest w MVP** (modal + `PATCH /auth/me/email`).
- Traktowania **401** `INVALID_PASSWORD` jak wygaśnięcie sesji (refresh / logout) — obowiązuje F-4a wyłącznie na `UNAUTHORIZED`.
- Toasta sukcesu / walidacji / **409** przy `PATCH /auth/me/email` (obowiązuje envelope pod polami modala).
- Ładowania listy instancji (`GET /runs` bez filtra terminalnego) jako „Moje runy”.
- Pokazywania **całej** tabeli „Moje runy” bez paginacji UI (obowiązuje stałe `pageSize = 10` jak Runy — F-8); **oraz** dodawania query `page` / `pageSize` do `GET /runs/user/:userId` (kontrakt R-3c bez paginacji HTTP).
- Rozciągania sidebara / chipów demo i agentów poza viewport przy długiej treści (obowiązuje viewport shell — F-8).
- UI create użytkownika z hasłem; UI soft-delete w MVP.
- Pomijania Users albo `/invite/accept` w MVP.
- Pokazywania dashboardu bez sesji; osobnej strony first-run.
- Wylogowania bez modala albo „Wyloguj się” w sidebarze.
- Headera z zawartością nie do prawej.
- Nieaktywnego „Zarejestruj się!” gdy bootstrap niedostępny; bramkowania signup przez `DEMO_MODE` w UI.
  Zmiana względem wersji 30 / „Nie wolno”: „Aktywnego «Zarejestruj się!» / otwartego signup” — **unieważnione**; obowiązuje F-4a / F-4b.
- Maskowania sukcesu rejestracji przy **409** (thank-you bez konta) albo pomijania błędu przy polu email.
- Osobnego trwałego ekranu „Aktywacja…” / dashboardu po samym activate (obowiązuje login + toast).
- Traktowania thank-you jako obowiązkowego poza `production`.
- Panelu admina opinii w MVP.
- Wysyłania edycji inną drogą niż `POST .../output-edited`; re-invoke pipeline; `selectedIdeaIds` na starcie; `conversationId` w UI.
- Lokalnego wyliczania expiry przeglądu z `pipelineFinishedAt` + stałej / lokalnego `REVIEW_TTL` (obowiązuje wyłącznie serwerowe `reviewExpiresAt`).
- Polegania wyłącznie na FE-only disable bez bramki API (api i tak → `REVIEW_LOCKED`).
- Nowego chrome deadline / countdown / wiersza „dostępne do…” na panelu przeglądu w MVP tej zmiany.
- Rozróżnienia copy auto vs ręczne zamknięcie przeglądu (obowiązuje „Przegląd zamknięty”).
- Wyniku dwuetapowego Social jako jednego bloku; single-select HITL Social.
- Mapowania `message` błędów na PL w MVP (obowiązuje `message` z API). Pokazywania `code` jako treści UI błędu (`code` zostaje w envelope HTTP do logiki klienta).
- Toasta na walidację pól / 400 / 409 formularza, przy którym operator stoi.
- Toasta na `run.log`, `running`, heartbeat.
- Context / store toasta jako kopia GET / server state.
- Toastera na karcie logowania / bootstrap / accept-invite.
- Gałęzi UI na accept-invite zależnej od **409** `CONFLICT` / „Email already in use” / osobnego copy „email zajęty” (obowiązuje ten sam kanał **401** co nieważny token — F-8).
- Browser Notification API; maila przy `failed` runu.
- Drugiego Toastera; `window.alert` / `confirm` zamiast envelope.
- `toast.promise` na formularzach, które już mają `pending`.
- Chipu demo poza dashboardem albo przy `demoMode === false`.
- Locków guest gdy `role !== guest` albo `demoMode === false`.
- Modalu limitu **przed** błędem quota z API.
- Bramkowania signup / thank-you / activate przez `demoMode` (F-4b).
- Wejścia UI w cudzy detail runu dla `guest`.

Zmiana względem wersji 19 / „Nie wolno”: kanon Runy+start+chip oraz fetch wprost na api — unieważnione na rzecz BFF, archiwum, Konta jako startu, boxa.
Zmiana względem wersji 21 / „Nie wolno”: dopisano zakaz lokalnego werdyktu kompletności na zakładkach, `PATCH` per zakładka, kropki na Dodatki i zagnieżdżeń extras.
Zmiana względem wersji 22 / „Nie wolno”: całkowity zakaz lokalnej kopii `isComplete` — od tej wersji kopia C-1 **wolna** wyłącznie do disable submitu i błędów pól; kropki / chip nadal z odpowiedzi. Dopisano zakaz samego `required` HTML oraz zapisu kalekiej oferty.
Zmiana względem wersji 23 / „Nie wolno”: dopisano zakaz toasta na walidację, na `run.log`, store toasta jako server state, Toastera poza sesją, Browser Notification i maila przy failu.
Zmiana względem wersji 24 / „Nie wolno”: zakaz „Formularza startu na widoku **Runy**” **unieważniony** — kanon to dwie powierzchnie tego samego briefu. Od tej wersji zakaz dotyczy live na archiwum, drugiego kontraktu startu, CTA w chrome/szczegółach, prefillu z archiwum i zrzutu na szczegóły po `202`.

Zmiana względem wersji 25 / „Nie wolno”: dopisano zakazy Stop bez modala / w boxie, podwójnego toasta cancel, mylenia `cancelled` z `failed`, natychmiastowego ukrycia boxa.
Zmiana względem wersji 28 / „Nie wolno”: dopisano zakazy lokalnego TTL math, FE-only jako jedynej bramki, chrome deadline oraz rozróżnienia copy auto/ręczne.
Zmiana względem wersji 34 / „Nie wolno”: dopisano zakazy FE→gateway, interval `/health/ready`, chipa bez AND, fałszywego „Uzupełnij kontekst” przy żywym kontekście, gateway w kropkach zakładek.
Zmiana względem wersji 35 / „Nie wolno”: dopisano zakazy pełnej tabeli Moje runy bez paginacji UI, query `page`/`pageSize` na `GET /runs/user/:userId`, oraz rozciągania sidebara/chipów poza viewport.

Zmiana względem wersji 13 / „Nie wolno”: zakaz „nadpisu wyniku poza flagą” unieważniony — kanon to zapis treści + flaga (`docs/ux_dashboard.md`). „Gdy powstanie” na Users / accept-invite unieważnione.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Next.js App Router | obowiązkowe |
| Natywny `fetch` + cookies (BFF same-origin) | obowiązkowe |
| `@content-chain/shared` | obowiązkowe |
| shadcn + Iconify (gdy ikony) | obowiązkowe |
| Sonner (kit shadcn) | obowiązkowe (toast „wydarzyło się”; adapter, nie store) |
| React Query / SWR | poza wymogiem MVP |
| Automatyczne testy FE | poza MVP (`docs/testy.md`) |

## Kryteria akceptacji

- [ ] Strona główna: karta logowania + **aktywny** „Zarejestruj się!” (gdy bootstrap niedostępny); first-run = tryb tej karty; **`/invite/accept?token=`** → logowanie; deep link aktywacji → login + toast; chrome po polsku; dashboard tylko po sesji.
- [ ] Register: **409** `Email already in use` → błąd na formularzu; **201** `verifiedAt === null` lub **503** → thank-you + resend (email ze stanu klienta); **201** z `verifiedAt` → login; **bez** sesji z register/activate/resend.
- [ ] Header: do prawej; login → „Wyloguj się”; modal → logout → `/`.
- [ ] Fetch same-origin `/api/v1`; **401** `UNAUTHORIZED` → refresh → retry; cookie httpOnly na originie FE; **401** `INVALID_PASSWORD` **bez** refresh/wylogowania.
- [ ] **Runy** = archiwum `completed` \| `failed` \| `cancelled` (15 min + wejście) **oraz** CTA/modal **„Uruchom agenta”**; **Konto** = start inline + Moje runy live (paginacja UI 10) + Stop; po `202` widok źródłowy.
- [ ] Layout zalogowany: `h-dvh`, scroll tylko w `main`; chipy w sidebarze widoczne bez scrolla treści.
- [ ] N× SSE tylko własne `running` / `awaiting_hitl` / `interrupted`; `close()` na `completed`/`failed`/`cancelled`; `queued` bez socketa; floating box poza Kontem **bez** Stop; po cancel: „Anulowany” → ukrycie po 200 ms.
- [ ] Stop + modal „Czy na pewno?” → cancel API; toast „Run anulowany”; dedup SSE; na `cancelled` brak przeglądu / HITL.
- [ ] Start zablokowany w UI przy `!agentsActive` (niekompletność **lub** gateway nie żyje) **oraz** api `409` `CONTEXT_INCOMPLETE` przy niekompletnym kontekście; **bez** osobnego kodu „gateway down” na `POST /runs`.
- [ ] Chip F-6: copy nieaktywnego kanoniczne; przy kompletnym kontekście i martwym gateway — disable CTA **bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji; kropki zakładek **tylko** z `completeness.missing`.
- [ ] F-10: `GET /config`; chip demo tylko dashboard gdy `demoMode`; locki tylko `guest` ∧ demo on (także po accept+login przy demo on — te same co register→guest); modal limitu po quota API; 429 rating.
- [ ] Konto: email — modal re-auth (`PATCH /auth/me/email` `{ email, currentPassword }`); `INVALID_PASSWORD` / `VALIDATION_FAILED` pod hasłem (bez F-4a); **409** → clear + odblokowanie emaila + błąd pod emailem; sukces bez toastu + `GET /auth/me`; Anuluj bez API; moje runy (paginacja UI 10) → szczegóły; start (prefill ze snapshotu); opinia.
- [ ] Admin: Users + zaproszenie; accept-invite → `/` → login (flow bez zmian; przy demo on sesja `guest` → locki F-10); błąd kolizji / złego tokenu = ten sam envelope **401** na karcie (bez UI „email zajęty” / bez gałęzi **409**).
- [ ] `app/` + `modules/`; typy z shared; brak sekretów LLM; brak `NEXT_PUBLIC_` URL-a api.
- [ ] Opinia / gwiazdki / Edytuj / finalize wg kontraktu; disable po `reviewFinalizedAt` **lub** po serwerowym `reviewExpiresAt`; copy „Przegląd zamknięty”; **bez** countdown / „dostępne do…”; HITL Social multi-select; wynik then_* = listy.
- [ ] Envelope błędu w UI: `message` z API (bez `code` w treści).
- [ ] Kontekst firmy: sześć zakładek (default Tożsamość); kropki bramki z `missing` ostatniego GET/PUT; Dodatki bez kropki; jeden `PUT`; `user` read-only.
- [ ] Admin nie utrwali pustej nazwy firmy ani kalekiej usługi (submit zablokowany; 400 z api gdy UI ominięte); `user` read-only.
- [ ] Po 202 na Koncie: wiersz **oraz** toast „Run wystartował”.
- [ ] Po 202 na Runach: toast „Run wystartował”, modal zamknięty, floating box; lista archiwum **bez** nowego wiersza dopóki run nie jest `completed` \| `failed` \| `cancelled`.
- [ ] PUT kontekstu 200 → toast PL; 400 → envelope, zero toasta; cancel 200 → „Run anulowany”.
- [ ] Terminal SSE (`completed`/`failed`/`cancelled`) poza `/runs/:id` tego runu: jeden toast + link Szczegóły; box: na `cancelled` krótko „Anulowany”, potem 200 ms.
- [ ] Na `/runs/:id` tego runu: **brak** toasta terminalu z SSE (mutacja cancel może mieć toast bez nawigacji); status + logi na szczegółach.
- [ ] Select opinii: `completed` \| `failed` \| (`cancelled` z wynikiem); bez `cancelled` bez wyniku.
- [ ] Toaster tylko po sesji (wyjątek: toast po sukcesie activate na widoku logowania); `--z-toast`; nie zasłania floating boxa.

## Poza zakresem

- Playwright / testy FE.
- Motywy jasny / ciemny (**V1 — rozbudowa**, obowiązkowy): oba tryby w produkcie oraz **dynamiczne** przełączanie przez użytkownika **dedykowanym przełącznikiem** w UI (`docs/ux_dashboard.md`). W MVP motyw produktowy pozostaje jasny.
- i18n / next-intl (**V1 — rozbudowa**).
- Limit per-user runów w toku (**V1 — rozbudowa**, obowiązkowy).
- Pixel-perfect / Figma jako norma.
- Publikacja postów na API portali (v2).
- OAuth / social login.
- Przełącznik DEMO w UI admina; zarządzanie użytkownikami (osobny plan).
- Osobny trwały ekran „Aktywacja…”.
- Zmiana hasła zalogowanego / usuwanie własnego konta; soft-delete users w UI; confirm e-mail przy zmianie adresu (**V1** — **nie** mylić z aktywacją po register). **Zmiana własnego emaila z re-auth (modal) jest w MVP.**
- `selectedIdeaIds` na starcie; `conversationId` w UI.
- CTA startu w sidebarze / headerze oraz na szczegółach `/runs/:runId`.
- Prefill startu z wiersza archiwum Runy.
- Panel admina opinii / diff / historia wersji outputu.
- Nowy endpoint SSE „moje runy”.
- Browser Notification API; mail przy `failed` runu.
- Druga rura toastów poza `notifyProduct`.

Zmiana względem wersji 20 / „Poza zakresem”: „Playwright / testy FE, dark/light jako wymóg” (jedna linia, bez fazy). Od tej wersji Playwright zostaje poza MVP; dual-mode = **obowiązek V1** z dedykowanym przełącznikiem.
Zmiana względem wersji 30 / „Poza zakresem”: „Otwarta rejestracja” — **unieważnione**; signup jest w zakresie MVP (F-4b).
