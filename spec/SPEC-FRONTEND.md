---
wersja: 64
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-22
---

# SPEC — Frontend

## Cel / zakres względem dokumentacji

Norma `apps/frontend`: cienki klient self-host (**anonimowe `/` = landing** + formularze auth w **modalu** w trzech trybach `login` \| `register` \| `bootstrap_admin` — **bez** osobnej trasy first-run; **otwarta rejestracja**, **thank-you fullscreen** w szablonie landingu + resend w `production`, deep link aktywacji → toast na landingu (sukces) / auto-open modal login (błąd), akceptacja zaproszenia jako deep link → landing (modal login **nie** auto), dashboard **po sesji** w tym widok **Konto**, flow’y Social i Content, HITL, logi, **zapis opinii / oceny / edycji wyniku**, **Users: toggle soft `user` / Usuń+purge `guest`**, **Cancel admin→guest na detail**), spójny z `docs/ux_dashboard.md` (w tym **„Normy wizualne”**) i kontraktem `SPEC-KOMUNIKACJA.md` / `SPEC-AUTH.md` / `SPEC-FEEDBACK.md` / `SPEC-RUNY.md`.

Aplikacja `apps/frontend` **już istnieje** w monorepo jako cienki klient Next (App Router, `modules/`). Ten SPEC dotyczy **ekranów i zachowania produktowego** na tym kliencie — bez ponownego bootstrapu aplikacji.

Bez reguł domenowych pipeline’u, bez bramki kompletności jako jedynej egzekucji, bez sekretów LLM.

Zmiana względem wersji 63 / F-14 / F-15: norma (Faza 27 / F-15) wymagała logotypu PNG **tylko** w sticky chrome landingu i **nie** w logo-area sidebara. Od tej wersji F-14: logo-area sidebara (desktop `AppSidebar` **oraz** mobile sheet) = **ten sam** asset `/content-chain-logo-transparent.png` przez `next/image` (`width`/`height` 530×275; wysokość w slocie `h-14` — HOW, np. `h-8` / `h-9`; `w-auto`; `alt` = string brand; **bez** linku). Sticky chrome F-15 (`h-20`, `#top`) **bez** zmiany parametrów; hero wordmark — nadal **bez** wymogu tego assetu — `docs/ux_dashboard.md` (v40).

Zmiana względem wersji 62 / F-15: brand sticky chrome landingu = **tekst / string** nazwy marki **bez** wymogu assetu PNG. Od wersji 63 lewy brand sticky chrome = **statyczny logotyp** `/content-chain-logo-transparent.png` przez `next/image` (`width`/`height` 530×275, `h-20 w-auto`, `priority`, `alt` = string brand, link `#top`). Auth / CTA chrome / modal / thank-you / audience / closing — **bez** redefinicji poza formą brandu. (Zakres sidebara — zmiana względem powyżej / v64 / F-14.)

Zmiana względem wersji 61 / „Wzorce / struktura”: drzewo wymieniało przykładowe `social`, `content` w `modules/` i nie pinowało `landing` / `shell` / `demo` / `health` / `notifications`. Od tej wersji norma katalogów = **aktualne** drzewo FE (`docs/architektura_katalogi_pliki.md`): landing osobno od auth; UI pipeline’u w `runs/` (bez modułów `social/` / `content/` na FE).

Zmiana względem wersji 58 / cel / F-4a / F-4b / F-8 / F-15: anonimowe `/` = **split-panel** (formularz obok dekoracji; mobile = tylko formularz); CTA „Zarejestruj admina” na karcie / w trybie logowania; thank-you / activate jako widok karty logowania. Od tej wersji: **landing** + auth w **modalu**; bootstrap CTA **tylko** na formularzu register gdy `available === true`; thank-you fullscreen w szablonie landingu; activate sukces = toast **bez** auto-modala, błąd = auto-open login — `docs/ux_dashboard.md` (landing-legalization Faza 2).

Zmiana względem wersji 59 / F-15: IA landingu = sticky chrome → hero → „sekcje wartości / procesu” → footer **bez** sekcji audience. Od tej wersji F-15 obejmuje sekcję **„Dla kogo”** (audience) **przed** sekcją wartości; kotwica chrome/footer; trzy karty person + lead wartości dla firmy/zespołu; **bez** wymogu screenshotów audience; **bez** trzeciej palety; Auth / modal / thank-you / activate / CTA chrome **bez** zmiany kontraktu poza strukturą treści marketingowej — `docs/ux_dashboard.md` (landing-dla-kogo Faza 2).

Zmiana względem wersji 60 / F-15: closing landingu milczał o CTA albo domyślnie dublował parę chrome (login + register). Od tej wersji closing = **jeden** CTA **„Sprawdzam!”** → modal `register`; wariant `Button` **`default`** (stylistyka wariantu / F-14 CTA-only — **bez** redefinicji). Sticky chrome (**„Zaloguj się”** / **„Załóż konto”**) oraz Auth / modal / thank-you / activate / bootstrap CTA na register — **bez zmian** kontraktu poza punktem wejścia z closing — `docs/ux_dashboard.md` (landing-closing-cta Faza 2).

Zmiana względem wersji 51 / cel: szata graficzna = pierwszy visual lock (jasny sidebar, statusy dot + muted, wyśrodkowana karta logowania, brak KPI). Od tej wersji **F-11…F-19** (drugi visual lock): primary indigo/violet, **pełny dark shell** (ciemny sidebar **i** ciemny `main`), unikalne badge-pille per `RunStatus`, hero tylko `running` \| `awaiting_hitl`, split-panel `/` (**nadpisane** w v59: landing + modal), KPI z `GET /api/v1/runs/summary`, lifting chipów / invite-accept / floating box — `docs/ux_dashboard.md` („Normy wizualne”), `docs/brand_types.md`.

Zmiana względem wersji 53 / F-14 / cel: *ciemny sidebar ≠ dark mode — `main` jasny*. Od tej wersji F-14 = **dark shell** (sidebar + `main` ciemne); dual-mode z przełącznikiem nadal V1 — `docs/ux_dashboard.md`.

Zmiana względem wersji 54 / F-11…F-19: brak pinu font-family w normach wizualnych; historyczny Geist jako sans (Faza 1 UI). Od tej wersji F-11 + stack + DoD: **Space Grotesk** (`--font-sans`), **Inter** (`--font-secondary` — tytuły kart KPI + paragrafy pomocnicze), **Geist Mono** (`--font-mono`); wyłącznie `next/font/google`; **zakaz** Inter jako default `body` — `docs/ux_dashboard.md` („Typografia”), `docs/brand_types.md`.

Zmiana względem wersji 55 / F-14: filled CTA produktu = solid `bg-primary` (indigo/violet) jak chrome. Od tej wersji F-14: **CTA-only** — wariant `Button` **`default`** = gradient teal/mint 135° + tekst ciemny (tokeny w `globals.css`; wartości = HOW); solid `--primary` chrome (sidebar / split / ring) **bez** zmiany kierunku indigo/violet — `docs/ux_dashboard.md` (Paleta), `docs/brand_types.md`.

Zmiana względem wersji 56 / F-14: *aktywny nav = `bg-primary text-primary-foreground`*; solid `--primary` także jako fill pozycji menu. Od tej wersji F-14: **stany pozycji menu** (normal / hover / active / active+hover) — teal/mint wash + inset ring + lewy pasek; tekst **muted** w active spoczynku; ta sama norma desktop + mobile sheet; solid indigo chrome dla split / ring **poza** pozycjami nav; tło `--sidebar` i kolory CTA `Button` `default` **bez zmian** — `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”), `docs/brand_types.md`.

Zmiana względem wersji 57 / F-8: milczenie o kolejności `CompletenessChipSlot` w mobile sheet (slot implikowany tylko przez „sidebar” / viewport). Od tej wersji F-8 + „Nie wolno” + DoD: mobile sheet zawiera **ten sam** `CompletenessChipSlot` (DemoChip nad CompletenessChip wg F-10) **przed** stopką „Wyloguj się”; desktop slot w `AppSidebar` bez zmian; **brak** wyjątku „chipy tylko `lg+`”; semantyka F-6 / F-10 / F-17 i forma liftingu **bez** redefinicji poza pozycją montażu; F-14 stany nav **bez** zmiany (slot ≠ pozycja nav) — `docs/ux_dashboard.md`.

Zmiana względem wersji 49 / cel / F-8: po `202` z Konta / modalu Runy — widok źródłowy; zakaz wymuszania nawigacji na szczegóły. Od tej wersji F-8 + „Nie wolno” + DoD: po **202** **zawsze** nawigacja na `/runs/:runId` (obie powierzchnie); toast „Run wystartował” zostaje; modal zamyka się; błąd startu bez nawigacji — `docs/ux_dashboard.md`.

Zmiana względem wersji 48 / cel / F-8: Case studies / Obiekcje bez kanonu prezentacji listy (listy jak dotychczas — bez wzorca Oferty). Od tej wersji F-8 + „Nie wolno” + DoD jak `docs/ux_dashboard.md` (Kontekst firmy / Dodatki — Case studies i Obiekcje jak Oferta).
Zmiana względem wersji 46 / cel / F-8: Dodatki = jeden panel `extras` bez podzakładek (zakaz zagnieżdżeń). Od tej wersji F-8 + „Nie wolno” + DoD jak `docs/ux_dashboard.md` (Kontekst firmy / Dodatki — cztery podzakładki).

Zmiana względem wersji 45 / cel / F-8: zakładka CTA / kanały bez kanonu prezentacji listy. Od tej wersji F-8 + „Nie wolno” + DoD jak `docs/ux_dashboard.md` (Kontekst firmy / CTA).

Zmiana względem wersji 44 / cel / F-8: zakładka Oferta bez kanonu prezentacji listy usług. Od tej wersji F-8 + „Nie wolno” + DoD jak `docs/ux_dashboard.md` (Kontekst firmy / Oferta).

Zmiana względem wersji 43 / cel / F-8: **Wybrany** / **Niewybrany** bez formy badge. Od tej wersji badge (tokeny) jak `docs/ux_dashboard.md` (Wynik).

Zmiana względem wersji 42 / cel / F-8: prezentacja wyniku na szczegółach bez kanonu kolejności etapów / markdown `pageDocument` / zakazu drugiego nagłówka. Od tej wersji F-8 + „Nie wolno” + DoD jak `docs/ux_dashboard.md` (Wynik).

Zmiana względem wersji 39 / cel / F-4a / F-8: first-run = tryb submitu tej samej karty logowania. Od tej wersji trzy tryby na `/`; login zawsze `POST /auth/login`; bootstrap admina = osobny formularz po CTA gdy `available === true` — `docs/ux_dashboard.md`.

Zmiana względem wersji 41 / F-4a / F-8: CTA register ukryte / disabled gdy `available === true` (XOR z „Zarejestruj admina”). Od tej wersji na karcie logowania **zawsze** „Zaloguj się” + „Nie masz konta? Zarejestruj się!”; „Zarejestruj admina” tylko warunkowo — `docs/ux_dashboard.md`.

Zmiana względem wersji 37 / F-8 / F-5b: Users bez akcji na koncie; Stop wyłącznie własny run; UI soft-delete / reaktywacja poza MVP. Od tej wersji: kolumna Akcje (toggle `user` / Usuń+purge `guest`); Cancel admin gdy `startedBy.role=guest` **tylko** na detail — `docs/ux_dashboard.md`, `users-management-plan.md` Faza 2.

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

Zmiana względem wersji 38 / F-2: `API_BASE_URL` bez pinu wartości compose / portu UI prod. Od tej wersji kanon production: `API_BASE_URL=http://api:3001` (hostname serwisu compose); port startu UI **3004** — `docs/deployment.md`.

Zmiana względem wersji 47 / F-7 / F-8: zakładka Odbiorca bez wymaganego pola Nazwa; start runu = wolny input „Grupa”. Od tej wersji: profil = **Nazwa** + opis; **Grupa** = **select** (3 tryby) — `docs/ux_dashboard.md`.

Zmiana względem wersji 50 / F-8 / F-10: *„zakaz nawigacji do cudzego `/runs/:id` dla guest”* (Faza 14). Od tej wersji: klik wiersza archiwum (także cudzego) **dozwolony** → detail **read-only**; bez SSE na cudzym; locki mutacji guest ∧ demo on **bez zmian** — `docs/ux_dashboard.md`, `guest-view-others-runs-plan.md`.

## Powiązanie ze stylem z docs / wyjątek

Wiążące (`docs/architektura.md`): Next.js jako UI; pobieranie i mutacje wyłącznie przez `apps/api`; sekrety LLM nigdy w bundlu.

**Wyjątek względem stylu globalnego api:** tak — **bez** ceremonialnej Clean Architecture / warstwy domain SM w Next. Obowiązuje jednak **podział modułowy** kodu FE (`modules/`), nie płaski „dump” komponentów.

Zmiana względem wersji 2: katalog modułów UI to `modules/` (wcześniej `features/` w tej sekcji, w drzewie „Wzorce / struktura”, w tabeli „Organizacja” oraz w kryteriach akceptacji). Źródło: `docs/architektura_katalogi_pliki.md`.

## Wymagania (egzekwowalne)

F-1. App Router: **Server Components domyślnie**; `"use client"` tylko tam, gdzie potrzeba interakcji, formularzy, SSE, floating boxa lub stanu przeglądarki. Chronione dane **wolno** czytać w RSC (cookie na originie FE — F-2).

F-2. Przeglądarka woła **same-origin** `/api/v1/...` (BFF Next). Natywny `fetch` z `credentials: 'include'` / `'same-origin'`. Next proxy’uje do `apps/api` — **`API_BASE_URL` wyłącznie na serwerze Next** (nigdy `NEXT_PUBLIC_*` na ten URL). W **compose / production** wartość kanoniczna: **`API_BASE_URL=http://api:3001`** (hostname serwisu compose — **nie** `http://localhost:3001` wewnątrz kontenera FE). Port startu UI production: **3004** (`next start -p 3004` / `PORT=3004`). **Zakaz** `NEXT_PUBLIC_API_BASE_URL` jako URL-a, pod który idzie przeglądarka. Proxy **musi** przekazywać `Cookie` / `Set-Cookie` i **strumieniować** SSE (bez pełnego bufora). Bez wymogu React Query / SWR w MVP.

Zmiana względem wersji 19 / F-2: fetch z `credentials` **wprost** na origin `apps/api` (`NEXT_PUBLIC_API_BASE_URL`). Od tej wersji BFF; cookie na originie FE (`docs/deployment.md`, `docs/security.md`).
Zmiana względem wersji 38 / F-2: bez pinu wartości `API_BASE_URL` / portu 3004 w production. Od tej wersji kanon compose `http://api:3001` + port UI **3004**.

F-3. Typy request/response / enumy / brand types z **`@content-chain/shared`** na granicy FE — bez duplikacji DTO „na piechotę”.

F-4. Auth web: wyłącznie cookie **`cc_access`** i **`cc_refresh`** (httpOnly) — patrz `SPEC-AUTH.md`. FE **nie** przechowuje JWT w `localStorage`, memory jako store tokenu ani zmiennych `NEXT_PUBLIC_*`. Brak nagłówka `Authorization: Bearer` jako modelu MVP (także Postman — cookie jar).

F-4a. Probe sesji **oraz każde** produktowe wywołanie do `/api/v1`: przy **401** `UNAUTHORIZED` → `POST /auth/refresh` → **jednorazowy** retry żądania; kolejny **401** `UNAUTHORIZED` → **landing na `/`** (modal auth zamknięty). Start / reload: `GET /auth/me` → (**401** `UNAUTHORIZED`) refresh → `GET /auth/me`. Anonimowe `/`: **landing** + auth w **modalu** w jednym z trzech trybów `login` \| `register` \| `bootstrap_admin` (**bez** osobnej trasy; ten sam model desktop + mobile — F-15). CTA chrome landingu: **„Zaloguj się”** → otwiera modal tryb `login`; **„Załóż konto”** → modal tryb `register` (oba **niezależnie** od `available` i `demoMode`). Submit formularza logowania (modal) → **zawsze** `POST /auth/login` (**zakaz** mode-hijack: submit logowania **nigdy** nie woła `POST /auth/bootstrap-admin`, także gdy `available === true`). **Zakaz** CTA „Zarejestruj admina” na formularzu / w trybie logowania. Gdy `GET /auth/bootstrap-status` → `available: true` — opcjonalny przycisk **„Zarejestruj admina”** (lub równoważne copy PL) **wyłącznie** na formularzu **rejestracji** → przełącza modal na tryb `bootstrap_admin` (email + hasło; opcjonalnie powtórz hasło tylko UI, jak register) → `POST /auth/bootstrap-admin` → sesja cookie → dashboard. Przy `available === false` — **bez** CTA „Zarejestruj admina”. CTA admina **nie** zastępuje ani nie wyłącza register / „Załóż konto”. Z formularza admina i register — jawny powrót do trybu `login` w modalu albo zamknięcie modala (landing). Zalogowany na `/` → redirect `/account` (**bez zmian**). Dashboard (sidebar) wyłącznie po sesji. Cykl refresh → retry → landing dotyczy wyłącznie **401** `UNAUTHORIZED` (sesja). **401** `INVALID_PASSWORD` (re-auth) **nie** uruchamia refresh ani `unauthorizedHandler` — błąd pod polem hasła, sesja zostaje.

Zmiana względem wersji 58 / F-4a: CTA „Zarejestruj admina” na karcie / w trybie logowania; redirect po sesji = „widok logowania”; powierzchnia = karta / split-panel. Od tej wersji: landing + modal; bootstrap CTA **tylko** na formularzu register gdy `available === true`; po wygaśnięciu sesji = landing (modal zamknięty) — `docs/ux_dashboard.md`.
Zmiana względem wersji 41 / F-4a: *register aktywny tylko gdy `available === false`; przy `true` ukryty/disabled* — **unieważnione**. Od tej wersji register zawsze dostępny; `available` steruje wyłącznie opcjonalnym CTA admina — `docs/ux_dashboard.md`.
Zmiana względem wersji 39 / F-4a: *gdy `available: true`, ten sam formularz submituje `bootstrap-admin` zamiast login* — **unieważnione**. Od tej wersji login zawsze `/auth/login`; bootstrap = osobny formularz po CTA gdy `available === true` — `docs/ux_dashboard.md`.
Zmiana względem wersji 19 / F-4a: refresh tylko przy starcie aplikacji. Od tej wersji ten sam cykl na każdym fetchu (TTL access ~15 min).
Zmiana względem wersji 14 / F-4a: osobny ekran first-run albo logowanie. Od tej wersji jeden widok główny = logowanie; first-run = tryb submitu; rejestracja wizualna, nieaktywna (`docs/ux_dashboard.md`).
Zmiana względem: F-4a traktowało każdy **401** jak wygaśnięcie sesji — od tej wersji wyłącznie `UNAUTHORIZED` (decyzja A1 / `docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 30 / F-4a: nieaktywne „Zarejestruj się!”. Od tej wersji aktywny signup (wcześniej bramka = bootstrap available; od v42 bramka `available` **nie** dotyczy register) — `docs/ux_dashboard.md`.

F-4b. Rejestracja i aktywacja (UX):

1. Formularz rejestracji (modal, tryb `register`): email, hasło, powtórz hasło (confirm tylko UI; API = `{ email, password }`).
2. Po **201** z `user.verifiedAt === null` **lub** **503** `MAIL_DELIVERY_FAILED` (pending User utworzony): **zamknięcie modala**; **fullscreen thank-you** na `/` w **szablonie landingu** (chrome landingu; **nie** modal; **bez** nowego URL) — copy sukcesu + „Nie otrzymałeś wiadomości e-mail?” + button **„Wyślij ponownie”** → `POST /auth/resend-activation` z email ze **stanu klienta**, nie z body **201**. Po **201** z ustawionym `verifiedAt` (poza prod): krótki sukces → tryb logowania w modalu (bez obligatoryjnego thank-you).
3. Kolizja email (**409** `CONFLICT`, `message`: **`Email already in use`**): **zostajemy** na formularzu rejestracji (w modalu); jawny błąd przy polu email — **bez** thank-you.
4. Deep link aktywacji **wyłącznie** `/?activationToken=…`: landing na `/`; w tle `POST /auth/activate`; po sukcesie toast **„Konto aktywowane! Możesz się zalogować.”** na landingu (**wyjątek** — Toaster dozwolony na niezalogowanym `/`) — **bez** auto-otwarcia modala. Błąd activate (**401**) → **auto-open** modal logowania + **ogólny** komunikat w modalu. **Bez** dashboardu; **bez** Set-Cookie z activate.
5. Register / activate / resend **nie** ustawiają sesji w UI (brak cookie z tych tras).
6. Signup / thank-you / activate **nie** zależą od `demoMode` (F-4a / F-4b **bez** `if (!demoMode) hide`). Opcjonalne copy o ograniczeniach gościa na thank-you **nie** zmienia flow aktywacji.

Zmiana względem wersji 58 / F-4b: thank-you / activate jako widok karty logowania; sukces activate = toast przy widoku logowania (implikacja auto-powierzchni login). Od tej wersji: thank-you fullscreen w szablonie landingu; sukces activate = toast **bez** auto-modala; błąd = auto-open login — `docs/ux_dashboard.md`.
Zmiana względem wersji 32 / F-4b: sygnał thank-you = `verifiedAt === null`; activate-fail bez **409**; wyjątek Toastera na `/` po sukcesie activate.
Zmiana względem wersji 34 / F-4b: milczenie o `demoMode`. Od tej wersji jawny zakaz bramkowania signup przez demo.

F-5. Live status runu: **SSE** `.../runs/:runId/events` (same-origin BFF, ta sama sesja cookie). **N×** `EventSource` wyłącznie dla **własnych** runów w `running` \| `awaiting_hitl` \| `interrupted` (rejestr layoutu: max jedno połączenie na `runId`). `queued` **bez** SSE (GET). Zakaz pollingu statusu **konkretnego** runu jako kanału live. GET archiwum Runy co 15 min **nie** jest kanałem live. Status wizualnie: badge-pill per mapa F-12 (`docs/ux_dashboard.md`); na detail hero tylko `running` \| `awaiting_hitl` (F-13) — w tym odrębny stan **`interrupted`** (bez hero) oraz terminal **`cancelled`** (nie mylić z `failed`). Typ statusu z `@content-chain/shared`.

Zmiana względem wersji 19 / F-5: jeden SSE na stronie szczegółów; chip instancji. Od tej wersji rejestr N połączeń + floating box; archiwum bez live.

Zmiana względem wersji 4 / F-5: zbiór statusów UI bez `interrupted`; po restarcie UI mogło mylić przestój recovery z aktywnym pipeline.

Zmiana względem wersji 25 / F-5: brak odrębnego stanu UI dla `cancelled`.

F-5a. Cykl życia `EventSource`: gdy snapshot GET jest `completed` \| `failed` \| `cancelled` **albo** `queued`, UI **nie** otwiera SSE. Po evencie `run.completed` \| `run.failed` \| **`run.cancelled`** — `EventSource.close()`. Reconnect wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted`. **Dodatkowo** (konsumpcja UI, nie nowy socket): jeden toast terminalu per `runId`, jeśli pathname **nie** jest szczegółami **tego** runu (`/runs/:runId`); na szczegółach tego runu — **zero** toasta terminalu z SSE (toast mutacji cancel — F-5b — bez dublowania SSE). Dedup po id toasta / per `runId`. **Zakaz** otwierania SSE na runie terminalnym „żeby pokazać toast” — toast wyłącznie z już otwartego live w rejestrze layoutu (własne runy) albo z odpowiedzi mutacji cancel.

Zmiana względem wersji 19 / F-5a: zakaz otwarcia obejmował tylko terminal; `queued` też bez socketa.

Zmiana względem wersji 5 / F-5: F-5 i „Wolno: Reconnect SSE” bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

Zmiana względem wersji 23 / F-5a: `close()` i zakaz SSE na terminalu **bez zmiany**; dopisano toast poza szczegółami (`docs/ux_dashboard.md`).

Zmiana względem wersji 25 / F-5a: terminal close tylko `completed` \| `failed`. Od tej wersji także `run.cancelled`.

F-5b. Anulowanie w UI (Stop):

1. Przycisk etykieta **Stop** / Cancel — gdy status nieterminalny (`queued` \| `running` \| `awaiting_hitl` \| `interrupted`) **oraz** (owner **lub** (`session.role === admin` **∧** `startedBy.role === guest`)). Powierzchnie: **Moje runy** (Konto) — tylko własne; **szczegóły runu** — owner **lub** admin→guest. Floating box **bez** Stop. **Bez** Stop admina na cudzym `role=user`. **Bez** Cancel admin→guest na liście archiwum Runy. Parse `startedBy.role` ze snapshotu `GET /runs/:id` (detail).
2. Przed API: modal **„Czy na pewno?”** — **Tak** = `POST /api/v1/runs/:runId/cancel`; **Nie** = zamknięcie modala, **zero** wywołań API.
3. Po **200** z cancel: toast sukcesu mutacji **„Run anulowany”** (zostajemy na widoku źródłowym). Gdy **nie** na `/runs/:runId` tego runu — toast z akcją **Szczegóły** (jak mapa UX). Dedup względem toasta SSE `run.cancelled` / `notifyRunTerminal` (jeden toast per `runId`).
4. Po sukcesie: odświeżenie wiersza / snapshotu (`cancelled`); na szczegółach panel HITL znika; przegląd (gwiazdki / Edytuj / finalize) niedostępny; partial wynik widoczny jak przy `failed`.
5. Floating box: po `cancelled` krótko label **„Anulowany”**, potem usunięcie pozycji po **200 ms** (nie trzymać anulowanego runu w boxie).

Zmiana względem: wcześniejszy kanon roboczy bez modala przed Stop — **unieważnione**; obowiązuje modal (`docs/ux_dashboard.md`).
Zmiana względem wersji 37 / F-5b: Stop wyłącznie własny run. Od tej wersji admin→guest na **detail** (parse `startedBy.role`).

F-6. Bramka „Agenci aktywni” i disable CTA startu runu — predykat UX:

`agentsActive` ⇔ `contextComplete` ∧ `gatewayAlive`

| Sygnał | Źródło |
|--------|--------|
| `contextComplete` | `GET .../company-context/completeness` → `complete === true` |
| `gatewayAlive` | `GET /api/v1/health/ready` → `checks.gateway.status === "healthy"` |

Chip zielony / aktywny **oraz** enable CTA startu = ten sam `agentsActive`. Disable dotyczy **obu** powierzchni: submit na Koncie **oraz** przycisk/modal **„Uruchom agenta”** na Runach. Copy nieaktywnego: **„Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.”** Gdy `complete === false`: wolno **dodatkowo** lista `missing` + link „Uzupełnij kontekst”. Gdy `complete === true` a gateway nie żyje: **bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji. Odświeżanie: mount + refetch przy okazji (np. po udanym zapisie kontekstu) — **bez** interval pollingu. **Egzekucja** twardej bramki kontekstu nadal w api (`409` `CONTEXT_INCOMPLETE` na `POST /runs`) — **bez** nowego rejectu „gateway down” na starcie runu. **Zakaz** wołania gateway z FE — wyłącznie BFF → `apps/api` (F-2).

Zmiana względem wersji 33 / F-6 (oraz v22 / v24): chip i disable = wyłącznie `GET .../completeness`. Od tej wersji AND z `gatewayAlive` z api `/health/ready`; copy i reguły remedacji wg `docs/ux_dashboard.md`. Druga powierzchnia startu (Konto + Runy) **bez unieważnienia**.

F-7. Język chrome / etykiet: **polski**. Envelope błędów MVP: w UI pokazać **wyłącznie `message` jak z API** (angielskie `message` — bez mapy tłumaczeń). **`code` nie jest treścią UI** — pozostaje w envelope HTTP do gałęzi klienta (np. `INVALID_PASSWORD` vs `UNAUTHORIZED`). next-intl / i18n envelope = **V1 — rozbudowa**. Treści SM: PL/EN wg briefu runu. Formularz startu runu (**Konto inline oraz modal na Runach** — ten sam brief): pola briefu **wg `taskType`** — post/reel: liczba pomysłów, bez kąta/długości; `page_*`: kąt i długość opcjonalnie, **bez** liczby pomysłów (`docs/ux_dashboard.md`). Pole **Grupa** = **select** (nie wolny input jako kanon): (1) domyślnie **„Bez wskazania grupy”** → omit `brief.audience`; (2) opcje = `name` profili z **odczytu kontekstu firmy** (`GET /company-context` / równoważny katalog — **nie** sam endpoint completeness); wybór → `brief.audience` = ten `name`; (3) ostatnia opcja **„Wpisz własną grupę…”** → dodatkowe pole tekstowe (opis odbiorcy) → `brief.audience` = ten opis; **bez** dopasowania do katalogu. Błędy przy formularzu / błędzie GET bloku = `message` **w miejscu błędu** (także w modalu). Toast **nie** zastępuje envelope przy polu. Toast sukcesu mutacji = **polski** tytuł (`docs/ux_dashboard.md`), **z wyjątkiem** `PATCH /auth/me/email` (sukces i błędy — **bez** toastu; `message` pod polami modala). Jeśli toast błędu (poza formularzem, gdy mapa UX na to zezwala): to samo `message`, bez tłumaczenia i bez `code` w UI.

Zmiana względem: F-7 wymagało pokazywania **`code` i `message`**. Od tej wersji obowiązuje tylko **`message`** (`docs/ux_dashboard.md`).

Zmiana względem wersji 19 / F-7: błędy miały być „zrozumiałe po polsku” bez rozstrzygnięcia envelope. Od tej wersji envelope as-is; i18n = V1.

Zmiana względem wersji 8 / F-7: język UI bez rozróżnienia pól briefu kanału.

Zmiana względem wersji 23 / F-7: F-7 milczało o sukcesie mutacji (cisza po 200/202). Envelope as-is **bez unieważnienia**; toast nie zastępuje envelope przy polu.

Zmiana względem wersji 24 / F-7: formularz startu był „**(tylko Konto)**”. Od tej wersji **Konto (inline) i Runy (modal)**; pola briefu **bez zmiany**.

Zmiana względem: toast sukcesu mutacji bez wyjątku dla zmiany emaila — od tej wersji `PATCH /auth/me/email` **bez** toastu (`docs/ux_dashboard.md`).

Zmiana względem wersji 47 / F-7: „Grupa” jako wolny input. Od tej wersji **select** + trzy tryby (`docs/ux_dashboard.md`).

F-8. Widoki minimalne wg `docs/ux_dashboard.md`:

- Strona główna: **landing** (F-15) + auth w **modalu** — na `/` trzy tryby `login` \| `register` \| `bootstrap_admin` (**bez** osobnej trasy first-run; ten sam model desktop + mobile). CTA chrome: **„Zaloguj się”** → modal `login`; **„Załóż konto”** → modal `register` (zawsze; **nie** zależy od `available`). CTA closing: **jeden** przycisk **„Sprawdzam!”** → modal `register`, wariant `Button` **`default`** (F-15; chrome para **bez** zmiany). Widok `login` (modal): submit → **zawsze** `POST /auth/login`; **zakaz** CTA „Zarejestruj admina” na logowaniu. Przy `available === true` — opcjonalne CTA **„Zarejestruj admina”** **wyłącznie** na formularzu **register** → tryb `bootstrap_admin` w modalu (osobny formularz → `POST /auth/bootstrap-admin` → sesja → dashboard); register **nie** jest ukrywany. Formularz rejestracji (F-4b); thank-you fullscreen w szablonie landingu + resend po **201** w prod; **akceptacja zaproszenia** na **`/invite/accept?token=`** (tożsame z URL w mailu `{APP_PUBLIC_URL}/invite/accept?token=…`) → `POST /auth/accept-invite` → **landing** `/` — modal logowania **nie** auto (użytkownik klika „Zaloguj się”); dashboard dopiero po loginie; deep link aktywacji → landing + activate w tle + toast sukcesu **bez** auto-modala / błąd → auto-open login (F-4b). Błędy wyłącznie `message` z envelope w modalu / na karcie accept-invite (bez Toastera na login/register/bootstrap/accept-invite — toast aktywacji **dozwolony** po sukcesie activate na landingu). Kolizja email na accept-invite i nieważny token = ten sam **401** — UI **bez** osobnego copy „email zajęty” i **bez** gałęzi na **409** `CONFLICT` z tej trasy. Kolizja na **register** = **409** → błąd przy polu email (F-4b). Opcjonalnie stała pomocnicza na accept-invite (bez leak z API): ogólne „Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.” — **tylko** jeśli mapowana z tego samego 401 (bez rozróżniania przyczyn po `code`);
- Kontekst firmy: **sześć zakładek** — Tożsamość (domyślnie otwarta), Oferta, Głos SM, CTA / kanały, Odbiorca, Dodatki. Na triggerach zakładek bramki indykator z `completeness.missing` ostatniego **udanego** GET/PUT (zielona = kompletna, czerwona = brak); zakładka Dodatki **bez** kropki bramki. Zapis = jeden `PUT` całości. Submit **nie** wysyła, gdy draft nie spełnia bramki (puste wymagane pole albo kaleka oferta **albo** profil bez Nazwy / opisu); lokalny predykat identyczny z C-1 (**w tym** niepusty `audience.profiles[].name`) **wyłącznie** do disable CTA zapisu i błędów pól — **kropki** nadal wyłącznie z `missing` odpowiedzi (**nie** gateway); **chip** „Agenci aktywni” = F-6 (`agentsActive`, nie sam `missing`). Placeholdery pustej oferty stripowane; kalekiej usługi nie stripujemy. Nie da się usunąć ostatniej kompletnej usługi tak, by PUT poszedł z `items: []`. **Oferta (UI listy):** hint globalny (minimum + „Korzyści: jedna na linię”); **Dodaj usługę** nad listą (`justify-end`), nowa pozycja **prepend**; pozycja = nagłówek (nazwa albo „Usługa N”) + **Usuń** po prawej; pola **Nazwa → Opis → Korzyści**; licznik korzyści pod polem; poniżej `lg` nagłówek = siatka + `truncate` tytułu (Usuń w prawej kolumnie); od `lg` flex + wrap. **CTA / kanały (UI listy):** hint globalny; **Dodaj CTA** nad listą (`justify-end`), **prepend**; pozycja = nagłówek (etykieta albo „CTA N”) + **Usuń CTA** po prawej; pola **Etykieta CTA → Cel (opcjonalnie)**; poniżej `lg` jak Oferta. **Odbiorca (UI listy):** każdy profil — wymagane pole **Nazwa** (etykieta UI **„Nazwa”**, nie „Tytuł”) **oraz** opis; lista czytelna po nazwie (nagłówek = wypełniona nazwa albo „Profil N”). **Dodatki (podzakładki):** wyłącznie tu zagnieżdżenia — **Hashtagi** (domyślna) / **Notatki** (`catalogNotes` + `performanceNotes`) / **Case studies** / **Obiekcje**; CTA zapisu pod podzakładkami; **bez** hicie o „Agenci aktywni” / pustych polach w panelu; podzakładki bez kropek. **Case studies (UI listy, jak Oferta):** **bez** hicie globalnego nad listą; **Dodaj** nad listą (`justify-end`), **prepend**; pozycja = nagłówek (wypełniony `title` → „Case {title}”; pusty → „Case N”, 1-based; numer tylko w UI) + **Usuń** po prawej; pola **Tytuł → Streszczenie → Metryki**; `divide-y`; poniżej `lg` jak Oferta. **Obiekcje (UI listy, jak Oferta):** **bez** hicie globalnego nad listą; **Dodaj** nad listą (`justify-end`), **prepend**; pozycja = nagłówek (wypełniony `label` → „Obiekcja {label}”; pusty → „Obiekcja N”, 1-based; numer tylko w UI) + **Usuń** po prawej; pola **Obiekcja → Odpowiedź**; `divide-y`; poniżej `lg` jak Oferta. Extras nadal poza bramką / bez kropek na podzakładkach. Szczegóły: `docs/ux_dashboard.md` (Widok: Kontekst firmy);
- **Runy** = archiwum instancji `completed` \| `failed` \| `cancelled` (`GET /runs?status=completed,failed,cancelled`, strona 10, odświeżanie przy wejściu i co **15 min**). **Bez** SSE, **bez** runów w toku na liście (także cudzych). CTA **„Uruchom agenta”** → modal z tym samym briefem co na Koncie (pusty draft; bez prefillu z archiwum). Po **202** z modalu — modal zamknięty, toast „Run wystartował”, nawigacja na `/runs/:runId`; błąd startu **bez** nawigacji; live poza Kontem = floating box;
- **Konto**: email — formularz → modal re-auth (email **disabled** + `currentPassword`) → `PATCH /auth/me/email` `{ email, currentPassword }` (każdy Potwierdź z obu pól); złe hasło (`INVALID_PASSWORD`) / `VALIDATION_FAILED` pod polem hasła (email zostaje disabled; **bez** cyklu F-4a); **409** → modal otwarty, clear pól, odblokowanie emaila, błąd pod polem email; sukces bez toastu + `GET /auth/me`; Anuluj bez API (draft formularza bez zmian względem otwarcia); **Statystyki KPI** (F-16) **powyżej** „Start runu”; **Moje runy** (`GET /runs/user/:userId` — **pełna** lista HTTP; **paginacja UI** stałe `pageSize = 10` jak archiwum Runy — Poprzednia / `strona / totalPages (total)` / Następna; wszystkie statusy; status = badge-pill F-12; **Stop** + modal na własnym nieterminalnym — F-5b); formularz **startu inline** (brief wg `taskType`; bez `selectedIdeaIds`; prefill ze **snapshotu** `GET /runs/:runId` z wiersza „Moje runy”); opinia. Po **202** startu **z Konta** — toast „Run wystartował” **oraz** nawigacja na `/runs/:runId`; błąd startu **bez** nawigacji;
- `PUT` kontekstu **200** → toast „Kontekst zapisany”; **400** → envelope przy formularzu, **zero** toasta (lokalny predykat / envelope); `POST .../cancel` **200** → toast **„Run anulowany”** (F-5b);
- Layout **zalogowany**: root **`h-dvh`** + overflow ukryty; **scroll tylko w `main`**; **dark shell** (F-14) — ciemny sidebar **i** ciemny `main` (desktop sidebar = wysokość viewportu); **`CompletenessChipSlot`** (DemoChip gdy demo on + CompletenessChip — F-10 / F-6) **zawsze w viewportcie** (lifting F-17): desktop = dół `AppSidebar`; **mobile sheet** = ten sam slot **przed** stopką „Wyloguj się” (kolejność sheetu: (1) tożsamość / email, (2) lista pozycji nav, (3) `CompletenessChipSlot`, (4) „Wyloguj się” → modal); chipy **nie** są pozycją nav. Toaster (warstwa `--z-toast`); pozycja **nie** gryzie się z floating boxem (toast `top-right`; box `bottom-right`). **Brak** Toastera w modalu auth (login / register / bootstrap) / na accept-invite (toast po sukcesie activate na landingu — wyjątek F-4b);
- Run szczegóły: HITL / wynik **post vs rolka vs strona** / przegląd (bez `conversationId` w UI); **hero banner** tylko `running` \| `awaiting_hitl` (F-13); pozostałe statusy = badge F-12 (`interrupted` **bez** hero); **Stop** + modal (F-5b) gdy owner **lub** (admin ∧ `startedBy.role=guest`) i nieterminalny; po `cancelled` HITL znika, przegląd niedostępny, partial wynik jak przy `failed`; live SSE tylko własny `running` \| `awaiting_hitl` \| `interrupted` (ten sam rejestr co box);
- HITL Social: **multi-select** (min. 1); Content: `[outline.id]`;
- Wynik (odczyt) wg `docs/ux_dashboard.md`: pod „Wynik” **bez** drugiego nagłówka typu/etapu; dwuetapowe = **najpierw** etap 2 (`contents[]` / `reelScripts[]` / `pageDocument`), potem etap 1 (zwijany gdy etap 2 niepusty; label „Pomysły” / „Outline”); przy pozycji etapu 2 podpis „Pomysł: {title}”; na liście pomysłów etapu 1 obok tytułu **badge** Wybrany / Niewybrany (Wybrany: `primary/15` + `primary`; Niewybrany: `muted` + `muted-foreground`; `rounded-md`); `characterCount` / `cta?` / `role?` jak UX; `pageDocument.body` w odczycie = sformatowany markdown (subset) + blok „Meta SEO”; Edytuj = surowy tekst;
- Użytkownicy (admin): lista + zaproszenie email; pending w tym wygasłe; resend/revoke; **kolumna Akcje** (jeden slot / wiersz):
  - `role=admin`: **brak** przycisku;
  - `role=user`: przycisk **toggle** — aktywny → Dezaktywuj (`DELETE` soft); nieaktywny → Aktywuj (`PATCH` `{ isActive: true }`); **każda** akcja z modalem potwierdzenia; copy = dezaktywacja / aktywacja (**nie** mylić z aktywacją e-mail);
  - `role=guest` (także gdy `DEMO_MODE=true`): ten sam slot = **„Usuń”** (hard; nigdy toggle soft/PATCH). Flow: (1) modal „trwałe usunięcie”; (2) `DELETE` bez `purge`; (3) przy **409** `GUEST_HAS_ACTIVE_RUN` — dialog z `message` envelope (**bez** listy runów) → potwierdzenie force; (4) `DELETE ?purge=true` → reload listy. Przy braku live: hard po pierwszym modalu. Błędy Users: **`message` z envelope** przy dialogu (jak invite), nie toast; po sukcesie **reload** listy.
- **Header / wylogowanie**: zawartość do prawej. **Desktop** (`lg+`): login → „Wyloguj się” → modal → `POST /auth/logout` → `/` (logout **nie** w `AppSidebar`). **Mobile** (`lg:hidden`): dropdown tożsamości w headerze ukryty — sheet = sidebar (nav + `CompletenessChipSlot`) **oraz** klaster tożsamości/logout: email + stopka **„Wyloguj się”** (po slocie) → ten sam modal. Logout w stopce sheetu **nie** jest pozycją listy nav; sens hierarchii header → login → „Wyloguj się” **bez** zmiany.
- Globalny CTA opinii; na szczegółach: Edytuj (`result` + flaga), gwiazdki, finalize — **tylko** gdy snapshot `completed` \| `failed` (nie na `cancelled`) **oraz** przegląd otwarty (`reviewFinalizedAt === null` **i** nie minął serwerowy `reviewExpiresAt`); po zamknięciu copy **„Przegląd zamknięty”** (bez rozróżnienia auto vs ręczne); **bez** widocznego deadline / countdown / wiersza „dostępne do…”;
- Chip „Agenci aktywni” wg F-6 (`agentsActive`); **`CompletenessChipSlot`**: DemoChip **nad** CompletenessChip — **tylko dashboard**, gdy `demoMode === true` (F-10); **ten sam** slot w desktop `AppSidebar` **i** w mobile sheet (przed „Wyloguj się” — layout F-8); **floating box** własnych runów w toku poza Kontem (zwijany; **bez** Stop). Po `cancelled`: krótko **„Anulowany”**, ukrycie pozycji po **200 ms**. **Nie** chip/stos „w toku” w chrome.
- Nawigacja F-8 wg roli: `admin` — Users + zaproszenia; `user` — bez Users; `guest` (demo on) — bez Users / bez zapisu kontekstu / bez Edytuj / finalize; archiwum lista OK; **klik cudzego wiersza archiwum → detail read-only** (snapshot; bez Stop / HITL / Edytuj / finalize; **bez** EventSource). Istniejący `GuestView` w home-entry = stan **anonimowy** (landing + modal; tryby `login` / `register` / `bootstrap_admin`) — **nie** mylić z rolą `guest`.

Zmiana względem wersji 58 / F-8: strona główna = split-panel + formularz; bootstrap CTA na logowaniu; invite → karta logowania; activate → widok logowania. Od tej wersji: landing + modal; bootstrap CTA tylko na register gdy `available`; invite → landing (modal **nie** auto); activate per F-4b — `docs/ux_dashboard.md`.
Zmiana względem wersji 49 / F-8: po `202` z Konta / modalu Runy — widok źródłowy; „Nie wolno” zabraniało wymuszania nawigacji na szczegóły. Od tej wersji po **202** z obu powierzchni → `/runs/:runId`; toast „Run wystartował” zostaje; modal zamyka się; błąd bez nawigacji — `docs/ux_dashboard.md`.
Zmiana względem wersji 48 / F-8: Case studies / Obiekcje = listy jak dotychczas (Dodaj / Usuń, pola pozycji) — bez wzorca nagłówka Oferty/CTA. Od tej wersji kanon list jak Oferta (Dodaj nad listą / prepend, nagłówek + Usuń, responsive poniżej `lg`, nagłówki „Case …” / „Obiekcja …”, bez hicie globalnego) — `docs/ux_dashboard.md`.
Zmiana względem wersji 47 / F-8: Odbiorca bez wymaganego `name` / etykiety „Nazwa”; lokalny C-1 bez `name`. Od tej wersji Nazwa + opis wymagane; lokalny predykat uwzględnia `name` — `docs/ux_dashboard.md`, `SPEC-KONTEKST-FIRMY.md` C-1.
Zmiana względem wersji 46 / F-8: Dodatki = jeden panel bez podzakładek (zakaz zagnieżdżeń extras). Od tej wersji cztery podzakładki + bez hicie — `docs/ux_dashboard.md`.
Zmiana względem wersji 45 / F-8: CTA / kanały bez prezentacji listy. Od tej wersji kanon CTA jak Oferta — `docs/ux_dashboard.md`.
Zmiana względem wersji 44 / F-8: Oferta bez prezentacji listy (kolejność / Dodaj / prepend / nagłówek / responsive). Od tej wersji kanon Oferty z `docs/ux_dashboard.md`.
Zmiana względem wersji 43 / F-8: Wybrany / Niewybrany = zwykły muted tekst. Od tej wersji **badge** z tokenami — `docs/ux_dashboard.md`.
Zmiana względem wersji 42 / F-8: wynik = listy then_* / pola `characterCount` / `cta` / `role` bez kolejności etapów, bez markdown body, bez zakazu drugiego nagłówka. Od tej wersji pełny kanon prezentacji Wyniku z `docs/ux_dashboard.md`.
Zmiana względem wersji 41 / F-8: register ukryty gdy `available === true`. Od tej wersji register zawsze; CTA admina tylko warunkowo — `docs/ux_dashboard.md`.
Zmiana względem wersji 39 / F-8: *first-run = tryb submitu tej karty*; `GuestView` = login/register. Od tej wersji trzy tryby na `/` + formularz `bootstrap_admin`; `GuestView` obejmuje też bootstrap — `docs/ux_dashboard.md`.

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
Zmiana względem wersji 24 / F-8: Runy „**Bez** startu”; Konto = **jedyny** formularz startu; po `202` wyłącznie Konto. Od tej wersji (historycznie v24→): dwie powierzchnie tego samego briefu (Konto inline + modal na Runach); po `202` widok źródłowy; archiwum nadal bez SSE / bez w toku na liście (`docs/ux_dashboard.md`). Powód: pierwsze testy UI w przeglądarce. **Unieważnione częściowo od v50:** „po `202` widok źródłowy” — obowiązuje nawigacja na szczegóły (nota v49→v50 powyżej); dwie powierzchnie i archiwum terminalne **bez unieważnienia**.

Zmiana względem wersji 25 / F-8: archiwum `completed` \| `failed`; brak Stop; floating box znika na terminalu bez reguły „Anulowany” + 200 ms. Od tej wersji archiwum + Stop (F-5b) + box po cancel.

Zmiana względem wersji 29 / F-8: założenie, że FE może rozróżnić kolizję email (**409**) od złego tokenu na accept-invite. Od tej wersji obie sytuacje = ten sam **401** / envelope na karcie (`docs/ux_dashboard.md`).

Zmiana względem wersji 30 / F-8: martwa rejestracja / brak thank-you / brak deep link aktywacji. Od tej wersji aktywny signup + F-4b.

Zmiana względem wersji 33 / F-8: chip kompletności = sam `missing` / completeness. Od tej wersji chip = F-6 (`agentsActive`); kropki zakładek **nadal tylko** `completeness.missing` (F-8 w tym zakresie **bez unieważnienia** sensu kropek).

Zmiana względem wersji 35 / F-8: layout rósł z treścią (sidebar/chipy poza pierwszym ekranem); Moje runy = pełna tabela bez paginacji UI. Od tej wersji: viewport shell + paginacja UI Moje runy (=10) — `docs/ux_dashboard.md`.

Zmiana względem wersji 37 / F-8: *„Użytkownicy (admin): lista + zaproszenie”* bez akcji na koncie; *„Brak UI soft-delete / reaktywacji w MVP”*. Od tej wersji toggle `user` + Usuń/purge `guest` + Cancel admin→guest na detail.

Zmiana względem wersji 57 / F-8: layout / chipy milczały o kolejności w mobile sheet (implikacja „sidebar” bez jawnej kompozycji); logout wyłącznie jako header desktop bez precyzji stopki sheetu. Od tej wersji: `CompletenessChipSlot` także w mobile sheet przed „Wyloguj się”; kolejność sheetu jak wyżej; desktop slot bez zmian; semantyka Demo / Completeness (F-6 / F-10 / F-17) **bez** redefinicji — `docs/ux_dashboard.md`.

F-9. Select runów w formularzu opinii: wyłącznie `GET /api/v1/runs/user/:userId` z id z `/auth/me`. Zakaz ładowania „wszystkich runów instancji” z `GET /runs` do tego selecta. UI **filtruje** pozycje do `completed` \| `failed` \| (`cancelled` **oraz** istnieje nie-`null` pole wyniku w snapshotcie — per `SPEC-FEEDBACK.md` Fbk-3a; select może dociągnąć snapshot albo stosować regułę równoważną; **nie** pokazywać `cancelled` bez wyniku). Lista API zostaje pełna — `SPEC-RUNY.md` R-3c. Select agentów = enum z shared (labelki PL). Ocena, Edytuj i finalize tylko gdy snapshot mówi, że sesja jest `startedBy`, status `completed` \| `failed` i przegląd **otwarty**: `reviewFinalizedAt === null` **oraz** nie minął serwerowy **`reviewExpiresAt`** (deadline wyłącznie z API — **zakaz** lokalnego wyliczania z `pipelineFinishedAt` + stałej). FE-only disable **nie** jest jedyną bramką — api i tak zwraca `REVIEW_LOCKED` po TTL / finalize (`SPEC-RUNY.md` R-10). Po lokalnym expiry (lekki timer od pola `reviewExpiresAt` z API, bez SSE): UI jak zamknięty (copy „Przegląd zamknięty”); reload odświeża `reviewFinalizedAt` gdy sweeper zapisał — **nie** wymagane do disable. **Zakaz** nowego chrome deadline / countdown / wiersza „dostępne do…” w MVP tej zmiany. Submit `targetType=run` poza oknem Fbk-3a i tak → **409** `RUN_NOT_REVIEWABLE`.

Zmiana względem wersji 12 / F-9: select pokazywał wszystkie runy autora (w tym w toku). Od tej wersji filtr kliencki `completed` \| `failed`; bramka HTTP jak w docs komunikacji.

Zmiana względem wersji 25 / F-9: filtr bez `cancelled`. Od tej wersji `cancelled` z wynikiem wchodzi do selecta.

Zmiana względem wersji 28 / F-9: „przegląd niezamknięty” = tylko `reviewFinalizedAt === null`. Od tej wersji także serwerowy `reviewExpiresAt`; zakaz lokalnego TTL math i chrome deadline — `docs/ux_dashboard.md`.

F-10. DEMO MODE (UX) — `docs/ux_dashboard.md`:

1. Boot: `DemoModeProvider` (lub równoważny) woła publiczny `GET /config`; jedyne pole używane w V1: `demoMode`.
2. `DemoModeChipSlot` / `DemoChip` **nad** CompletenessChip (wewnątrz `CompletenessChipSlot`) — **tylko dashboard**, gdy `demoMode === true`. Copy w stylu „Tryb demo aktywny / Wybrane funkcje ograniczone” + Iconify. Przy `demoMode === false` chip **nie** jest widoczny. Montaż slotu: desktop `AppSidebar` **i** mobile sheet — F-8 (pozycja; semantyka **bez** zmiany).
3. Locki UI (sidebar, formy, disable `taskType` poza allowlistą, zapis kontekstu, Users, Edytuj/finalize, `PATCH /auth/me/email`): wyłącznie gdy **`session.role === 'guest'` AND `demoMode === true`**. Admin na instancji demo **bez** locków gościa. Ten sam predykat obejmuje konta `guest` z **register** oraz z **accept-invite** przy demo on (`SPEC-AUTH.md` A-7b) — po accept → `/` → login flow bez zmian; locki dopiero po sesji z `role === guest`.
4. `GuestLimitModal` **wyłącznie** po błędzie quota z API (`GUEST_TYPE_*` / `GUEST_GLOBAL_QUOTA_EXCEEDED`); CTA kontakt `{ iconName, contactData }[]` (mailto, LinkedIn, GitHub) — hardcoded FE. **Zakaz** preemptive modalu bez odpowiedzi API.
5. Rating: obsługa **429** (`message` z envelope). Feedback: `application`/`agent` OK; `run` tylko własny.
6. Archiwum (guest ∧ demo on): klik wiersza (własnego **i** cudzego) → `/runs/:id` **read-only**; **bez** SSE na cudzym; locki mutacji (pkt 3) **bez zmian**.
7. Egzekucja limitów = API; FE tylko odzwierciedla.

Zmiana względem wersji 34: chip/locki guest poza zakresem. Od tej wersji F-10.
Zmiana względem wersji 36 / F-10: bez jawnej ścieżki invite→guest. Od tej wersji zaproszony przy demo on podlega tym samym lockom co self-register guest; predykat **bez zmian**; `GuestView` ≠ `UserRole.guest` (F-8) — bez zmian.
Zmiana względem wersji 50 / F-10: zakaz wejścia w cudzy detail. Od tej wersji pkt 6 — nawigacja archiwum dozwolona (read-only).

### Normy wizualne (F-11…F-19)

Kanon: `docs/ux_dashboard.md` („Normy wizualne”), `docs/brand_types.md`. ID stałe. Drugi visual lock względem Fazy 1 UI (historyczny jasny sidebar / statusy dot).

F-11. Tokeny semantyczne CSS: wyłącznie w `apps/frontend/src/app/globals.css` — definicja w **`:root` i `.dark`** oraz **obowiązkowy** most `@theme inline` (`--color-success`, `--color-warning`, `--color-completed`, `--color-interrupted`, `--color-cancelled`, `--color-queued` + warianty `-foreground` gdzie używane jako tło/tekst; analogicznie do `--color-destructive`). Pełny zestaw z mapy `RunStatus` w docs. **Zakaz** hex/rgb „na piechotę” w badge’ach statusów, hero, chipach, liftingu invite/floating. **Wyjątek CTA:** hex/gradient wyłącznie jako wartości dedykowanych tokenów wariantu `Button` **`default`** (F-14) — nie w statusach / hero / chipach / liftingu. Tokeny **nie** w `packages/shared`.

**Typografia (część F-11):** tokeny fontów w tym samym `globals.css` + ładunek w `layout.tsx` wyłącznie przez `next/font/google` (build-time self-host). **`--font-sans`** → **Space Grotesk** (default UI: `body`, chrome, formularze, wartości KPI, nagłówki widoków `h1`/`h2`). **`--font-secondary`** → **Inter** — wyłącznie tytuły kart KPI (`CardTitle` / równoważne) oraz paragrafy pomocnicze pod nagłówkami widoków; **zakaz** mapowania Inter na globalne `--font-heading` (Inter ≠ wszystkie nagłówki). **`--font-mono`** → **Geist Mono** (statusy / `tabular-nums` / meta mono). **Zakaz** `<link>` do Google Fonts; **zakaz** Inter jako default `body` / głównego chrome; serify / kinetic display poza produktem. Kanon: `docs/ux_dashboard.md` („Typografia”), `docs/brand_types.md` (mapa tokenów fontu).

Zmiana względem wersji 54 / F-11: F-11 pinowało kolory statusów / `@theme` bez font-family; Geist jako sans był historyczny (Faza 1). Od tej wersji F-11 obejmuje też Space Grotesk + Inter + Geist Mono jak wyżej.

F-12. Badge statusów (`RunStatusView` / równoważny): forma **pill** (`rounded-full border px-2 py-0.5`); **unikalny** kolor per `RunStatus` wg mapy docs (`running`→`--success`, `awaiting_hitl`→`--warning`, `completed`→`--completed`, `failed`→`--destructive`, `interrupted`→`--interrupted`, `cancelled`→`--cancelled`, `queued`→`--queued`). Compact (listy, floating box) = **te same** kolory i forma. **Zakaz** samego kółka (dot) bez kontenera pill; **zakaz** dzielenia jednego „muted” między kilka statusów; `completed` **nie** dzieli koloru z `running`.

Zmiana względem: status = kropka + plain muted text; kilka statusów na jednym muted.

F-13. Hero banner „run w toku”: wyłącznie na szczegółach `/runs/:runId`, gdy `status ∈ {running, awaiting_hitl}` — gradient z tokenów success/warning + animacja. **Ukryty** dla `interrupted`, `queued` oraz terminalnych (`completed` \| `failed` \| `cancelled`). `interrupted` = osobny badge (F-12) **bez** hero.

F-14. **Pełny dark shell:** ciemny sidebar (`AppSidebar`: `--sidebar` / `--sidebar-foreground` ciemne oklch; logo-area `h-14` + `border-b`) **oraz** ciemny obszar roboczy (`--background` / `main`). Sidebar może być nieco ciemniejszy od `main`. Primary akcent **chrome** = żywy **indigo/violet** (wysoka chroma) — solid `--primary` / `--primary-foreground` / `--ring` dla landingu (hero / chrome) i focus ring (**poza** wypełnieniem pozycji nawigacji). Landing **dziedziczy** ten sam kanon tokenów — **bez** trzeciej palety. **Bez** przełącznika light/dark w MVP — dark shell **nie** jest dual-mode; dual-mode z przełącznikiem = V1 (poza zakresem).

**Brand w logo-area:** **statyczny logotyp** PNG `/content-chain-logo-transparent.png` (origin FE / `public/`) przez `next/image` — **nie** sam tekst nazwy marki; `width={530}`, `height={275}`; wysokość wyświetlana dopasowana do slotu `h-14` (np. `h-8` / `h-9` — precyzja HOW = feature plan); **nie** `h-20` jak sticky chrome F-15; `w-auto`; `alt` = string brand (nazwa marki z copy); **bez** linku. Ta sama norma na desktopie (`AppSidebar`) **oraz** w mobile sheet (brand w logo-area / równoważnym miejscu tożsamości chrome sidebara). Sticky chrome landingu (F-15: `h-20`, `#top`) — **bez** zmiany tą regułą. Kanon: `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”).
Zmiana względem: Faza 27 / F-15 / v63 — logotyp PNG **tylko** sticky chrome, **nie** sidebar. Od tej wersji sidebar **także** wymaga tego assetu (powyżej); parametry sticky chrome **bez** zmiany.

**Stany pozycji menu (nav):** normal / hover / active / active+hover — kierunek blisko Vireo; precyzyjne hex / opacity / radius / transition = HOW. Ta sama norma na desktopie (`AppSidebar`) **oraz** w mobile sheet (lista pozycji). Kanon formy: `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”). **Montaż `CompletenessChipSlot`** (desktop sidebar + mobile sheet przed „Wyloguj się”) — **F-8**; slot **nie** jest pozycją nav (stany poniżej **nie** dotyczą chipów).

| Stan | Tekst | Tło pozycji | Ring / pasek |
|------|-------|-------------|--------------|
| **Normal** | muted | przezroczyste | bez ringa, bez lewego paska |
| **Hover** (idle) | strong | subtelny fill (~white/4%) | bez ringa / paska |
| **Active** (spoczynek) | **muted** | gradient wash teal/mint (L→R, mocniejszy → słabszy) | inset ring w teal + lewy pasek accent z glow (`::before` lub równoważna forma) |
| **Active + hover** | strong | fill hover **zastępuje** gradient wash | ring + pasek **zostają** |

**Zakaz (nav):** solid `bg-primary text-primary-foreground` (lub równoważny solid indigo fill) jako active item; zmiany tła całego sidebara (`--sidebar` / `bg-sidebar` aside) pod pretekstem stanów nav; zmiany kolorów / gradientu CTA `Button` `default` przy okazji nav. Stany nav **nie** stylują logo-area (forma brandu — powyżej); chipy, IA pozycji — poza tą normą stanów.

**CTA `Button` `default` (CTA-only):** wypełniony przycisk produktu **nie** dziedziczy solid `bg-primary` indigo jako jedynego filled CTA. Wariant **`default`** (`variant` pominięty lub `variant="default"`) = tło gradient teal/mint **135°** + tekst **ciemny** — dedykowane tokeny w `globals.css` (mapowanie w `button.tsx`); wartości hex/gradient = HOW feature-planu. Hover / `:active`: te same kolory tła i tekstu + `brightness(1.06)` na **całym** przycisku. **Zakaz** zmiany solid `--primary` chrome na teal / gradient. **Poza:** `outline` / `ghost` / `destructive` / `link` / `secondary` — bez tej normy gradientu.

Zmiana względem wersji 56 / F-14: *aktywny nav = `bg-primary text-primary-foreground`*; solid `--primary` także jako fill pozycji menu. Od tej wersji pozycje menu **wychodzą** z normy solid indigo fill — stany normal / hover / active / active+hover (teal wash + ring + rail; muted w active); desktop + mobile sheet; tło `--sidebar` i CTA `default` chronione.
Zmiana względem wersji 55 / F-14: *filled CTA = `bg-primary` indigo/violet*. Od tej wersji filled CTA = osobny kanon wariantu `default` (gradient + ciemny tekst); chrome primary bez zmiany kierunku indigo/violet.
Zmiana względem wersji 53 / F-14: *ciemny sidebar ≠ dark mode — `main` jasny*. Od tej wersji kanon = dark shell (sidebar + main).
Zmiana względem wcześniejszego: sidebar jasny (ten sam motyw co jasny main) — historia pierwszego locku.

F-15. **Landing** na `/` (anonimowa strona główna): treść marketingowa **bez** formularza auth obok. Struktura IA (kanon; spójnie z `docs/ux_dashboard.md`):

1. **Sticky chrome** — lewy brand = **statyczny logotyp** PNG Content Chain przez `next/image`: `src="/content-chain-logo-transparent.png"`, `width={530}`, `height={275}`, `className="h-20 w-auto"`, `priority`, `alt` = string brand (nazwa marki z copy), kontener link kotwicy `#top` (`inline-flex shrink-0 items-center`). **Nie** sam tekst / string nazwy marki jako brand chrome. CTA wejścia („Zaloguj się” / „Załóż konto”) **oraz** kotwice do sekcji treści (w tym audience, wartości, Kontekst, Runy, proces) — spójnie z footerem. Parametry sticky chrome (`h-20`, `#top`) dotyczą **landingu** `/` — **nie** brand / wordmark w hero. Logo-area sidebara dashboardu = **ten sam** asset, osobna skala w slocie `h-14` (**F-14**).
2. **Hero** (+ istniejący proof hero / tech) — brand / headline / supporting + CTA; ścieżki assetów screenshotów hero = feature plan / major (**nie** ten SPEC).
3. **Sekcja audience („Dla kogo”)** — **przed** sekcją wartości; kotwica np. `#dla-kogo` w sticky chrome **oraz** footerze. Lead o **wartości wnoszonej przez projekt do firmy / zespołu** (intencja; nie tylko „kim jesteś”). Forma: **trzy karty** person (tytuł + body), tekstowe; persony (intencja / skrót — **nie** finalne stringi PL): founderzy / małe zespoły; marketerzy B2B; zespoły techniczne. **Bez** wymogu screenshotów w tej sekcji; **bez** trzeciej palety (dziedziczenie locku landingu / F-14).
4. **Sekcje wartości / procesu** — wartości („Co zyskuje zespół”) → proof Kontekst → Runy → proces → **closing**.
5. **Closing** (ostatnia sekcja treści przed stopką) — **jeden** przycisk CTA z etykietą **„Sprawdzam!”** → otwiera modal auth w trybie **`register`**. Wariant: `Button` **`default`** (stylistyka wariantu / F-14 CTA-only — **bez** redefinicji gradientu / tokenów). Closing **nie** ma drugiego CTA logowania i **nie** dubluje pary sticky chrome; logowanie pozostaje w chrome (**„Zaloguj się”**) oraz w footerze.
6. **Footer** — te same kotwice co sticky chrome (w tym audience); link „Zaloguj się” w footerze — **bez zmian** tym wymaganiem.

Kolejność scrollu (kanon): hero (+ proof / tech) → **Dla kogo** → wartości → Kontekst → Runy → proces → closing / footer.

**Finalne copy** marketingowe (stringi PL poza etykietą closing CTA) = feature plan / major — **nie** ten SPEC (tu: struktura + intencja; etykieta closing = **„Sprawdzam!”**). Formularze `login` \| `register` \| `bootstrap_admin` w **modalu** (ten sam model na desktopie i mobile — **nie** „tylko formularz na pełnym ekranie” jako jedyna treść `/`). Thank-you = fullscreen w **szablonie landingu** (nie modal; bez nowego URL) — F-4b. Flow / endpointy / tryby auth oraz CTA chrome (**„Zaloguj się”** / **„Załóż konto”** — F-4a / F-4b / F-8) **bez zmian** poza punktem wejścia z closing (jeden CTA → `register`) i formą lewego brandu sticky chrome (logotyp PNG — powyżej).

Zmiana względem wersji 63 / F-15: wykluczenie logo-area sidebara z wymogu PNG (logotyp **tylko** sticky chrome). Od tej wersji sidebar = F-14 (powyżej); sticky chrome parametry **bez** zmiany; hero nadal bez wymogu tego assetu — `docs/ux_dashboard.md`.
Zmiana względem wersji 62 / F-15: brand sticky chrome = tekst / string nazwy marki **bez** wymogu PNG. Od wersji 63 brand = asset `/content-chain-logo-transparent.png` przez `next/image` (530×275, `h-20 w-auto`, `priority`, `alt` = brand, link `#top`); Auth / CTA / modal / thank-you / audience / closing **bez** redefinicji poza formą brandu — `docs/ux_dashboard.md`.
Zmiana względem wersji 60 / F-15: closing bez jawnego kontraktu CTA (milczenie / domysł pary jak chrome). Od tej wersji closing = jeden CTA „Sprawdzam!” → `register`, wariant `Button` `default`; chrome para CTA bez zmian — `docs/ux_dashboard.md`.
Zmiana względem wersji 59 / F-15: IA = chrome → hero → „sekcje wartości / procesu” → footer **bez** audience. Od tej wersji audience („Dla kogo”) jest częścią kanonu IA **przed** wartościami; kotwica chrome/footer; trzy karty + lead wartości; bez wymogu screenshotów audience; bez trzeciej palety — `docs/ux_dashboard.md`.
Zmiana względem wersji 58 / F-15: *split-panel* (`lg+` = dekoracja | formularz; mobile = tylko formularz). Od v59: landing + modal auth — `docs/ux_dashboard.md`.
Zmiana względem: wyśrodkowana karta na pełnej szerokości tła.

F-16. KPI cards na Koncie: blok **powyżej** sekcji „Start runu”; forma = **karty** (border / tło / radius). Fetch `GET /api/v1/runs/summary` (BFF, F-2); DTO z `@content-chain/shared` (F-3). Pokaż metryki `totalLast30d`, `successRateLast30d`, `activeNow`, `topTaskTypeLast30d` oraz zakres dat z `windowFrom` / `windowTo` (prezentacja np. `15.06.2026–14.07.2026`). Widoczność: `admin` / `user` — zawsze (scope odpowiedzi = HTTP); `guest` — **tylko** gdy `demoMode === true`; gdy demo off — blok **nie** renderowany. Błąd HTTP / brak endpointu → blok **ukryty** (bez pustych kart z błędem jako treścią KPI). **Typografia (F-11):** etykiety / tytuły kart KPI = **Inter** (`--font-secondary`); wartości liczbowe i pozostała treść kart = **Space Grotesk** (`--font-sans`). Semantyka fetch / guest / ukrycie przy błędzie — **bez zmian**. Kontrakt: `SPEC-KOMUNIKACJA.md` K-2k, `SPEC-RUNY.md` R-13.

F-17. Chipy Demo / Agenci: kolorowy **lewy border** z tokenów semantycznych (F-11). Pozycja (DemoChip nad CompletenessChip; ten sam `CompletenessChipSlot` desktop + mobile — F-8) i semantyka (`agentsActive` F-6, `demoMode` F-10) **bez zmian**.

F-18. Invite-accept lifting: kosmetyka tokenów / gęstości na `/invite/accept`. Flow, envelope, copy produktowe (F-8) **bez zmian**.

F-19. Floating-box lifting: kosmetyka + badge statusów wg F-12. Pozycjonowanie / copy statusów / zachowanie Stop (**bez** Stop w boxie) / reguła „Anulowany” + 200 ms (F-5b / F-8) **bez zmian**.

Zmiana względem wersji 1: Konto nie obejmuje zmiany hasła; dodano first-run; lista runów = cała instancja z nawigacją lista → szczegóły; admin users bez edycji/dezaktywacji w UI (soft-delete UI nadal poza MVP).

## Norma implementacji

### Wzorce / struktura (modułowo)

```text
apps/frontend/src/
├── app/                    # App Router: `/`, `(app)/*`, `/invite/accept`, BFF `api/v1/[[...path]]`
├── modules/
│   ├── auth/               # sesja, modal auth, invite, thank-you, home-entry
│   ├── landing/            # landing marketingowy (view + copy); **nie** pod `auth/`
│   ├── shell/              # chrome dashboardu (sidebar, header, SSE registry)
│   ├── company-context/
│   ├── runs/               # start / HITL / wynik / floating / KPI / archiwum (UI Social+Content)
│   ├── users/
│   ├── feedback/
│   ├── demo/
│   ├── health/
│   ├── notifications/
│   └── <module>/
│       ├── components/
│       ├── api/            # fetch wrappers do endpointów modułu (gdy potrzebne)
│       └── …
├── shared/                 # UI kit (shadcn), apiFetch, env, utils — bez domeny api
└── …
```

| Element | Norma |
|---------|--------|
| Organizacja | **Moduły UI** pod `modules/` + `app/` na routing; kanon listy jak wyżej / `docs/architektura_katalogi_pliki.md` |
| Granica SM/Content | **Bez** `modules/social` / `modules/content` — pipeline w `apps/api`; FE = `modules/runs` |
| Landing | `modules/landing/` + montaż z `modules/auth` (`HomeEntry`); copy w `landing-copy` |
| Dane | `fetch` → BFF → `apps/api`; brak Prisma / gateway / LangGraph w FE |
| UI | **shadcn** + **Iconify** (`@iconify/react`) tam, gdzie ikony są potrzebne |
| Env publiczne | **brak** URL-a api w `NEXT_PUBLIC_*`; `API_BASE_URL` tylko serwer Next (prod compose: `http://api:3001`); port UI prod **3004** |

### Wolno

- Client components dla SSE, formularzy, HITL, floating boxa, **DemoChip** / **GuestLimitModal**.
- Reconnect SSE wyłącznie po nieoczekiwanym zerwaniu przy `running` / `awaiting_hitl` / `interrupted` + uzupełnienie snapshotem; `EventSource.close()` po evencie terminalnym (`completed` / `failed` / `cancelled`).
- N× EventSource w rejestrze layoutu (jedno na `runId`); szczegóły **reuse** tego połączenia.
- Stop + modal „Czy na pewno?” na Moich runach / szczegółach; `POST .../cancel` tylko po Tak (F-5b).
- Toast mutacji „Run anulowany”; toast SSE `run.cancelled` w `notifyRunTerminal` z dedupem per `runId`.
- Floating box: po `cancelled` label „Anulowany”, potem usunięcie po **200 ms**.
- Read-only podgląd kontekstu dla `user`; edycja tylko gdy sesja `admin`.
- Widok Kontekst firmy jako zakładki (`docs/ux_dashboard.md`); default Tożsamość; CTA zapisu na każdej zakładce przy jednym `PUT`.
- Lokalna kopia predykatu C-1 (`isComplete` / `isCompleteOfferItem` / kompletność profilu audience z **`name` + `description`**) w `modules/company-context` **wyłącznie** do disable CTA zapisu i błędów pól — **nie** import z `apps/api`; **nie** źródło kropek / chipa.
- Select **Grupa** przy starcie: opcje z katalogu kontekstu firmy; mapowanie do `brief.audience` wg F-7 (omit / name / custom bez matcha).
- Indykator kompletności na triggerze zakładki bramki z `completeness.missing` ostatniego GET/PUT (kropka + etykieta dostępności kompletna / niekompletna). Semantyczna zieleń / czerwień statusu — nie drugi brand produktu.
- Kompozycję `agentsActive` z `GET .../completeness` **oraz** `GET /api/v1/health/ready` (F-6) — bez zanieczyszczania lokalnego `isComplete` ani `isComplete` domeny siecią.
- Copy nieaktywnego chipa kanoniczne; dodatkowo `missing` + link `/context` tylko gdy `complete === false`.
- Refetch completeness / `/health/ready` przy mount i przy okazji (np. po udanym PUT kontekstu) — **bez** interval.
- Landing na `/` + modal auth w trzech trybach (`login` \| `register` \| `bootstrap_admin`); CTA chrome „Zaloguj się” / „Załóż konto”; opcjonalne CTA „Zarejestruj admina” **tylko** na formularzu register gdy `available === true` → tryb `bootstrap_admin` → `POST /auth/bootstrap-admin` (F-4a / F-15).
  Zmiana względem wersji 58 / „Wolno”: *split-panel + CTA admina na karcie logowania* — **unieważnione**; obowiązuje landing + modal + bootstrap CTA na register.
- Landing IA (F-15): sticky chrome (lewy brand = logotyp PNG `/content-chain-logo-transparent.png` przez `next/image`, `h-20 w-auto`, `alt` = brand, link `#top`) → hero → sekcja audience („Dla kogo”) → wartości → Kontekst → Runy → proces → closing / footer; kotwica audience w chrome i footerze; trzy karty person + lead wartości dla firmy/zespołu; bez wymogu screenshotów audience; bez trzeciej palety; closing = **jeden** CTA **„Sprawdzam!”** → modal `register`, wariant `Button` **`default`** (stylistyka bez redefinicji); chrome para CTA (**„Zaloguj się”** / **„Załóż konto”**) **bez zmian**.
  Zmiana względem wersji 62 / „Wolno”: brand sticky chrome jako tekst / string. Od wersji 63 brand chrome = logotyp PNG (F-15).
- Logo-area sidebara (F-14): ten sam asset `/content-chain-logo-transparent.png` przez `next/image` (530×275; wysokość w `h-14` — HOW; `w-auto`; `alt` = brand; **bez** linku); desktop `AppSidebar` **oraz** mobile sheet; **nie** `h-20` / `#top` jak sticky chrome.
  Zmiana względem wersji 63 / „Wolno”: *bez wymogu PNG w sidebarze*. Od tej wersji logo-area **wymaga** assetu (F-14); hero nadal bez wymogu.
  Zmiana względem wersji 60 / „Wolno”: closing bez jawnego CTA albo para jak chrome. Od tej wersji closing = jeden „Sprawdzam!” → `register` (F-15).
  Zmiana względem wersji 59 / „Wolno”: landing bez jawnej sekcji audience w IA. Od tej wersji audience przed wartościami jest kanonem F-15.
  Zmiana względem wersji 39 / „Wolno”: *„First-run jako tryb submitu tej samej karty logowania”* — **unieważnione**; obowiązuje F-4a (osobny formularz bootstrap).
  Zmiana względem wersji 41 / „Wolno”: *„Aktywny «Zarejestruj się!» gdy bootstrap niedostępny”* — **unieważnione**; register zawsze (F-4a).
- **Zawsze dostępny** CTA „Załóż konto” / tryb register (niezależnie od `available`); formularz register w modalu; thank-you fullscreen w szablonie landingu + resend gdy **201** `verifiedAt === null` (lub **503** po utworzeniu pending); deep link aktywacji → landing + activate w tle + toast sukcesu **bez** auto-modala / błąd → auto-open login (F-4b).
- Header: zawartość **do prawej**; desktop login → „Wyloguj się”; mobile sheet: `CompletenessChipSlot` → stopka „Wyloguj się”; modal; `POST /auth/logout` → `/` (landing; modal auth zamknięty) (F-8).
- Widok **Konto**: email z modalem re-auth (`PATCH /auth/me/email` + `currentPassword`; recovery **409**; `INVALID_PASSWORD` bez wylogowania), **KPI cards** (F-16) powyżej Start runu, Moje runy (live; **paginacja UI** 10; badge F-12), **start inline**, opinia; po **202** **z Konta** → nawigacja na `/runs/:runId` + toast „Run wystartował”.
- Widok **Runy**: archiwum `completed` \| `failed` \| `cancelled`; GET co 15 min + przy wejściu; CTA/modal **„Uruchom agenta”** (ten sam brief); po **202** z Run — zamknąć modal, nawigacja na `/runs/:runId` + toast „Run wystartował”; statusy = badge F-12.
- Client components dla modalu startu (Dialog kitu shadcn) **oraz** modalu auth na landingu.
- Floating box poza Kontem (zwijany) — lifting F-19; badge F-12.
- Tokeny statusowe + tokeny fontów w `globals.css` (`:root` / `.dark` / `@theme inline`) — F-11 (Space Grotesk / Inter `--font-secondary` / Geist Mono via `next/font/google`); hero na detail tylko `running` \| `awaiting_hitl` — F-13; **dark shell** (ciemny sidebar + ciemny `main`) + logo-area z logotypem PNG — F-14; **stany pozycji menu** (normal / hover / active / active+hover; teal wash + ring + rail; desktop + mobile sheet; **bez** solid `bg-primary` na active) — F-14; **CTA-only** `Button` `default` (tokeny gradientu + ciemny tekst; chrome `--primary` indigo bez zmiany poza fill nav) — F-14; **landing** na `/` — F-15; lifting chipów / invite-accept — F-17 / F-18.
- Cienki wrapper `notifyProduct` / `notifyRunTerminal` (Sonner jako adapter; unia produktowa, bez `any`).
- Odczyt pathname App Router (`usePathname` lub równoważny) do `viewingRunId` przy toaście terminalu.
- Toaster w gałęzi authenticated layoutu; token `--z-toast`; **wyjątek:** toast po sukcesie activate na niezalogowanym landingu `/`.
- Viewport shell: `h-dvh`, scroll wyłącznie w obszarze roboczym; `CompletenessChipSlot` w desktop sidebarze **i** w mobile sheet zawsze w viewportcie (F-8).
- Publiczny `/invite/accept?token=` → landing `/` (modal login **nie** auto).
- Formularz opinii, gwiazdki i edytor wyniku jako Client Components.
- Zapis Edytuj przez `POST .../output-edited` z `result`.
- Lekki timer lokalny od serwerowego `reviewExpiresAt` (disable kontrolek po expiry; bez SSE „dla TTL”; bez lokalnego math z `pipelineFinishedAt`).
- BFF: rewrite albo streaming Route Handler — byle Cookie + SSE bez bufora.

### Nie wolno

- Sekretów LLM, `X-Gateway-Key`, JWT w `NEXT_PUBLIC_*` / localStorage.
- `NEXT_PUBLIC_API_BASE_URL` i bezpośredniego fetcha przeglądarki na origin api.
- `API_BASE_URL=http://localhost:3001` (lub inny loopback hosta) jako URL BFF **wewnątrz** kontenera / procesu FE w compose production (obowiązuje hostname serwisu `api` — F-2).
- Wołania `apps/ai-provider-gateway` z FE (w tym `/health`, `/health/ready`, chat) — wyłącznie BFF → `apps/api`.
- Interval pollingu completeness albo `/health/ready` (obowiązuje mount + refetch przy okazji — F-6).
- Liczenia **chipa** wyłącznie z completeness (bez `gatewayAlive`) albo wyłącznie z `/health/ready` (bez completeness).
- Fałszywego „Uzupełnij kontekst” jako jedynej remedacji, gdy `complete === true` a gateway nie żyje.
- Buforowania SSE w BFF.
- Pollingu statusu **jednego** runu zamiast SSE.
- `EventSource` na `queued` / `completed` / `failed` / `cancelled` albo drugiego socketa na ten sam `runId`.
- Zostawiania `EventSource` otwartego po `completed`/`failed`/`cancelled` ani reconnectu po zamknięciu terminalnym.
- Prezentowania `interrupted` tą samą animacją / copy / hero co `running`; traktowania `cancelled` jako `failed` w copy toasta / archiwum.
- Statusu runu jako samego kółka (dot) bez pill; dzielenia jednego koloru „muted” między kilka `RunStatus`; `completed` dzielącego token z `running` (obowiązuje F-12).
- Hero banneru dla `interrupted` / `queued` / terminalnych (obowiązuje F-13).
- Jasnego sidebara **albo** jasnego `main` jako kanonu produktu; traktowania dark shellu jako dual-mode / przełącznika (obowiązuje F-14 — pełny dark shell; dual-mode = V1).
  Zmiana względem wersji 53 / „Nie wolno”: *F-14 — main jasny*; *ciemny sidebar ≠ dual-mode przy jasnym main*. Od tej wersji zakaz jasnego `main` w MVP; dark shell = kanon.
- Split-panelu (dekoracja | formularz) albo wyśrodkowanej karty logowania jako layoutu anonimowego `/`; traktowania „tylko formularz na pełnym ekranie” jako **jedynej** treści `/` na mobile (obowiązuje landing + modal — F-15).
  Zmiana względem wersji 58 / „Nie wolno”: *wyśrodkowana karta zamiast split-panelu* — **unieważnione** jako norma „obowiązuje F-15 split”; od tej wersji zakaz dotyczy split-panelu **i** karty jako layoutu `/`.
- Pomijania sekcji audience („Dla kogo”) w IA landingu albo umieszczania jej **po** sekcji wartości jako zamiennika kanonu; trzeciej palety / wymogu screenshotów w sekcji audience (obowiązuje F-15).
  Zmiana względem wersji 59 / „Nie wolno”: brak zakazu pomijania audience. Od tej wersji audience przed wartościami jest obowiązkowym elementem IA.
- Dwóch CTA w sekcji closing (login + register) albo dublowania pary chrome w closing; CTA closing innego niż **„Sprawdzam!”** → `register`; zmiany stylistyki wariantu `Button` `default` / F-14 CTA-only przy okazji closing; zmiany pary CTA sticky chrome albo linku „Zaloguj się” w footerze pod pretekstem closing (obowiązuje F-15).
  Zmiana względem wersji 60 / „Nie wolno”: brak zakazu pary CTA w closing. Od tej wersji closing = wyłącznie jeden CTA „Sprawdzam!” → `register`.
- Brandu sticky chrome landingu jako samego tekstu / stringu nazwy marki **bez** assetu PNG; brandu logo-area sidebara (desktop / mobile sheet) jako samego tekstu **bez** assetu PNG; wymuszania parametrów sticky chrome (`h-20`, link `#top`) na logo-area sidebara; wymuszania `/content-chain-logo-transparent.png` w hero wordmark pod pretekstem F-14 / F-15 (obowiązuje F-14 logo-area + F-15 sticky chrome; hero bez wymogu PNG).
  Zmiana względem wersji 63 / „Nie wolno”: *zakaz wymuszania PNG w logo-area sidebara* (logotyp tylko sticky chrome). Od tej wersji logo-area **wymaga** PNG (F-14); zakaz tekstowego brandu dotyczy chrome landingu **i** sidebara; hero nadal bez wymogu assetu.
  Zmiana względem wersji 62 / „Nie wolno”: brak zakazu tekstowego brandu chrome. Od wersji 63 sticky chrome wymaga logotypu PNG.
- Hex/rgb „na piechotę” w badge’ach statusów / hero / chipach / liftingu (obowiązuje F-11). **Wyjątek:** wartości hex/gradient wyłącznie jako definicja dedykowanych tokenów wariantu `Button` **`default`** w `globals.css` (F-14 CTA-only) — nie w statusach / hero / chipach / liftingu.
- Traktowania filled CTA (`Button` `default`) jako obowiązkowego solid `bg-primary` indigo; podmiany solid `--primary` chrome (landing / ring poza pozycjami nav) na teal / gradient CTA (obowiązuje F-14 CTA-only).
- Active item nawigacji jako solid `bg-primary text-primary-foreground` (lub równoważny solid indigo fill); pomijania stanów hover / active+hover albo różnej normy stanów między desktopem a mobile sheet (obowiązuje F-14 — stany pozycji menu).
  Zmiana względem wersji 56 / „Nie wolno”: *aktywny nav = solid `bg-primary`* było kanonem F-14. Od tej wersji solid indigo fill na pozycji nav jest **zakazany**.
- Zmiany tła całego sidebara (`--sidebar` / `bg-sidebar` aside) pod pretekstem stanów pozycji menu; zmiany kolorów / gradientu CTA `Button` `default` przy okazji nav (obowiązuje F-14 — tło `--sidebar` i CTA-only chronione).
- Inter jako default `body` / głównego chrome; `<link>` do Google Fonts; mapowania Inter na globalne `--font-heading`; Geist (lub innego fontu) jako obowiązkowego `--font-sans` zamiast Space Grotesk; serifów / kinetic display w produkcie (obowiązuje F-11 — typografia).
- Bloku KPI poniżej „Start runu”; pustych kart KPI przy błędzie HTTP; KPI dla `guest` przy `demoMode === false` (obowiązuje F-16).
- Stop we floating boxie; cancel **bez** modala „Czy na pewno?”; admin-cancel cudzego runu **`role=user`** z UI; Cancel admin→guest na liście archiwum (obowiązuje tylko detail — F-5b).
  Zmiana względem wersji 37 / „Nie wolno”: *„admin-cancel cudzego runu z UI”* — unieważnione dla admin→guest na detail; zakaz cancel cudzego `user` **zostaje**.
- Natychmiastowego usunięcia pozycji boxa po `cancelled` bez krótkiego labelu „Anulowany” (obowiązuje **200 ms**).
- Podwójnego toasta mutacja cancel + SSE `run.cancelled` bez dedupu.
- Chipu / stosu chipów „w toku” w chrome (obowiązuje floating box).
- Innego briefu / innego `POST /runs` na Runach niż na Koncie.
- Startu w sidebarze / headerze albo na szczegółach `/runs/:runId`.
- Prefillu startu z wiersza archiwum (obowiązuje wyłącznie „Moje runy” na Koncie).
- SSE albo wierszy `queued` / `running` / `awaiting_hitl` / `interrupted` na liście Runy (także po starcie z modalu).
- Zostawiania operatora na widoku źródłowym (Konto / Runy) po udanym `POST /runs` (**202**) — obowiązuje nawigacja na `/runs/:runId` (F-8).
  Zmiana względem wersji 49 / „Nie wolno”: *„Wymuszania nawigacji na szczegóły po `202`”* — **unieważnione**; od tej wersji nawigacja na szczegóły po `202` jest **wymagana**.
- Traktowania GET archiwum (15 min) jako kanału live szczegółów.
- Egzekucji bramki kompletności **tylko** w UI.
- Liczenia **kropek / chipa** z draftu formularza albo z lokalnej kopii `isComplete` (kropki = `missing` z ostatniego udanego GET/PUT; chip = F-6). Lokalny predykat C-1 **nie** zastępuje C-4 / C-5 w api.
- Doklejania stanu gateway / `/health/ready` do kropek zakładek kontekstu (kropki **tylko** `completeness.missing` — F-8).
- Polegania na samym atrybucie `required` HTML jako bramce zapisu.
- Zapisywania kalekiej oferty (PUT z niepełną pozycją albo `items: []`).
- Zakładki Oferta: **Dodaj usługę** pod listą; append nowej pozycji na koniec; kolejności pól Nazwa → Korzyści → Opis; **Usuń** poza wierszem nagłówka pozycji; wrapu nagłówka poniżej `lg`, który zostawia Usuń po lewej przy prawej **Dodaj** (obowiązuje siatka + `truncate` poniżej `lg` — `docs/ux_dashboard.md`).
- Zakładki CTA / kanały: **Dodaj CTA** pod listą; append na koniec; **Usuń CTA** poza wierszem nagłówka; wrapu nagłówka poniżej `lg` rozjeżdżającego Usuń względem Dodaj (obowiązuje ten sam wzorzec co Oferta — `docs/ux_dashboard.md`).
- Zakładki Odbiorca: profilu bez wymaganego pola **Nazwa**; etykiety UI „Tytuł” zamiast „Nazwa”; lokalnego `isComplete` ignorującego `name`.
- Wolnego inputu **Grupa** jako jedynego kanonu startu runu (obowiązuje **select** + trzy tryby — F-7); matchowania custom opisu do `profiles[].name` przed `POST /runs`; źródła opcji selecta wyłącznie z `GET .../completeness` (obowiązuje katalog z odczytu kontekstu).
- `PATCH` per zakładka w MVP (zapis kontekstu = jeden `PUT` całości).
- Indykatora bramki (kropki) na zakładce Dodatki **oraz** na jej podzakładkach.
- Płaskiego jednego panelu `extras` bez podzakładek (obowiązują cztery podzakładki — F-8 / `docs/ux_dashboard.md`).
  Zmiana względem wersji 21 / „Nie wolno”: *„Zagnieżdżonych zakładek / podzakładek `extras`”* — **unieważnione**; od tej wersji podzakładki w Dodatki są **wymagane**; zakaz dotyczy płaskiego panelu.
- Podzakładek / zagnieżdżeń w zakładkach bramki (Tożsamość, Oferta, Głos SM, CTA / kanały, Odbiorca) — zagnieżdżenia **tylko** w Dodatki.
- Hicitu w panelu Dodatki o „Agenci aktywni” / „puste pola nie są zapisywane” (sygnał agentów = chip w chrome).
- Podzakładek Case studies / Obiekcje: **Dodaj** pod listą; append nowej pozycji na koniec; **Usuń** poza wierszem nagłówka pozycji; braku nagłówka pozycji; hicie globalnego nad tymi listami (obowiązuje wzorzec Oferty — `docs/ux_dashboard.md`).
  Zmiana względem wersji 48 / „Nie wolno”: norma dopuszczająca Case studies / Obiekcje jako „listy jak dotychczas (Dodaj / Usuń, pola pozycji) — bez wzorca nagłówka Oferty/CTA” — **unieważniona**; od tej wersji obowiązuje kanon jak Oferta (F-8).
- Logiki pipeline Social / Content / verifiera / promptów w FE.
- Modułów UI `modules/social/` lub `modules/content/` (pipeline = `apps/api`; UI = `modules/runs/`).
- Landingu marketingowego jako podkatalogu `modules/auth/landing/` (obowiązuje `modules/landing/`).
- Płaskiego `components/` bez `modules/`.
- Bearer access jako modelu MVP.
- Self-service hasła zalogowanego i usuwania własnego konta; confirm e-mail przy zmianie adresu (V1). **Zmiana własnego emaila z re-auth jest w MVP** (modal + `PATCH /auth/me/email`).
- Traktowania **401** `INVALID_PASSWORD` jak wygaśnięcie sesji (refresh / logout) — obowiązuje F-4a wyłącznie na `UNAUTHORIZED`.
- Toasta sukcesu / walidacji / **409** przy `PATCH /auth/me/email` (obowiązuje envelope pod polami modala).
- Ładowania listy instancji (`GET /runs` bez filtra terminalnego) jako „Moje runy”.
- Pokazywania **całej** tabeli „Moje runy” bez paginacji UI (obowiązuje stałe `pageSize = 10` jak Runy — F-8); **oraz** dodawania query `page` / `pageSize` do `GET /runs/user/:userId` (kontrakt R-3c bez paginacji HTTP).
- Rozciągania sidebara / chipów demo i agentów poza viewport przy długiej treści (obowiązuje viewport shell — F-8).
- Mobile sheetu tylko z nav + logout **bez** `CompletenessChipSlot` (Demo / Completeness), gdy desktop ten slot ma — **zakaz** wyjątku „chipy tylko `lg+`” (obowiązuje F-8).
  Zmiana względem wersji 57 / „Nie wolno”: brak jawnego zakazu sheetu bez slotu. Od tej wersji montaż slotu w mobile sheet jest **wymagany** jak na desktopie.
- UI create użytkownika z hasłem; dwóch przycisków Soft+Hard na `user`; soft/toggle na `guest`; reaktywacji `guest` z UI; braku modala przed toggle/Usuń/purge.
- Pomijania Users albo `/invite/accept` w MVP.
  Zmiana względem wersji 37 / „Nie wolno”: *„UI soft-delete w MVP”* — **unieważnione**; obowiązuje F-8 Akcje (toggle / Usuń / purge).
- Pokazywania dashboardu bez sesji; osobnej strony / trasy first-run (bootstrap zostaje na `/` w modalu).
- Mode-hijack: submitu formularza logowania → `POST /auth/bootstrap-admin` (także gdy `available === true`) — obowiązuje F-4a (login zawsze `/auth/login`).
  Zmiana względem wersji 39 / „Nie wolno”: first-run jako tryb submitu tej samej karty był **wolny** — od tej wersji **zakazany**.
- Wylogowania bez modala; „Wyloguj się” jako pozycja listy nav albo w desktop `AppSidebar` (na mobile stopka sheetu **poza** listą nav — F-8; sens hierarchii header → login → Wyloguj **bez** zmiany).
  Zmiana względem wersji 57 / „Nie wolno”: *„Wyloguj się” w sidebarze* bez rozróżnienia mobile sheet. Od tej wersji zakaz dotyczy listy nav / desktop sidebara; stopka mobile sheet z logoutem (po slocie) jest **wymagana** (F-8).
- Headera z zawartością nie do prawej.
- Nieaktywnego / ukrytego CTA „Załóż konto” / trybu register (także gdy `available === true`); bramkowania signup przez `DEMO_MODE` albo przez `bootstrap-status.available` w UI.
  Zmiana względem wersji 41 / „Nie wolno”: *„Nieaktywnego «Zarejestruj się!» gdy bootstrap niedostępny”* (implikacja: wolno ukryć register przy `available === true`) — **unieważnione**; register zawsze widoczny (F-4a).
  Zmiana względem wersji 30 / „Nie wolno”: „Aktywnego «Zarejestruj się!» / otwartego signup” — **unieważnione**; obowiązuje F-4a / F-4b.
- Pokazywania CTA „Zarejestruj admina” na formularzu / w trybie **logowania**; pokazywania tego CTA gdy `available === false`; ukrywania / disable tego CTA na formularzu register gdy `available === true`.
  Zmiana względem wersji 58 / „Nie wolno”: CTA admina na karcie logowania było **dozwolone**. Od tej wersji lokalizacja = **tylko** formularz register (F-4a).
- Maskowania sukcesu rejestracji przy **409** (thank-you bez konta) albo pomijania błędu przy polu email.
- Thank-you jako **modal** albo poza szablonem landingu; osobnego trwałego ekranu „Aktywacja…” / dashboardu po samym activate; **auto-otwarcia** modala po sukcesie activate (obowiązuje toast na landingu bez auto-modala — F-4b).
- Traktowania thank-you jako obowiązkowego poza `production`.
- Panelu admina opinii w MVP.
- Wysyłania edycji inną drogą niż `POST .../output-edited`; re-invoke pipeline; `selectedIdeaIds` na starcie; `conversationId` w UI.
- Lokalnego wyliczania expiry przeglądu z `pipelineFinishedAt` + stałej / lokalnego `REVIEW_TTL` (obowiązuje wyłącznie serwerowe `reviewExpiresAt`).
- Polegania wyłącznie na FE-only disable bez bramki API (api i tak → `REVIEW_LOCKED`).
- Nowego chrome deadline / countdown / wiersza „dostępne do…” na panelu przeglądu w MVP tej zmiany.
- Rozróżnienia copy auto vs ręczne zamknięcie przeglądu (obowiązuje „Przegląd zamknięty”).
- Wyniku dwuetapowego Social jako jednego bloku; single-select HITL Social.
- Drugiego nagłówka (typu tasku / etykiety etapu) bezpośrednio pod sekcją UI „Wynik” — obowiązuje jeden nagłówek „Wynik”, potem treść (`docs/ux_dashboard.md`).
- Prezentacji etapu 1 nad etapem 2, gdy oba są w snapshotcie dwuetapowym (obowiązuje: etap 2 pierwszy; etap 1 zwijany gdy etap 2 niepusty).
- Surowego `pageDocument.body` z widoczną składnią markdown w **odczycie** (obowiązuje sformatowany subset + „Meta SEO”; Edytuj = surowy tekst).
- Etykiet Wybrany / Niewybrany przy pomysłach etapu 1 jako zwykłego tekstu bez badge (obowiązuje forma badge z tokenami — `docs/ux_dashboard.md`).
- Mapowania `message` błędów na PL w MVP (obowiązuje `message` z API). Pokazywania `code` jako treści UI błędu (`code` zostaje w envelope HTTP do logiki klienta).
- Toasta na walidację pól / 400 / 409 formularza, przy którym operator stoi.
- Toasta na `run.log`, `running`, heartbeat.
- Context / store toasta jako kopia GET / server state.
- Toastera w modalu auth (login / register / bootstrap) / na accept-invite (wyjątek: toast sukcesu activate na landingu — F-4b).
- Gałęzi UI na accept-invite zależnej od **409** `CONFLICT` / „Email already in use” / osobnego copy „email zajęty” (obowiązuje ten sam kanał **401** co nieważny token — F-8).
- Browser Notification API; maila przy `failed` runu.
- Drugiego Toastera; `window.alert` / `confirm` zamiast envelope.
- `toast.promise` na formularzach, które już mają `pending`.
- Chipu demo poza dashboardem albo przy `demoMode === false`.
- Locków guest gdy `role !== guest` albo `demoMode === false`.
- Modalu limitu **przed** błędem quota z API.
- Bramkowania signup / thank-you / activate przez `demoMode` (F-4b).
- Wejścia UI w cudzy **nieterminalny** detail runu dla `guest`; EventSource na cudzym runie (także terminalnym) dla `guest`.
  Zmiana względem wersji 50 / „Nie wolno”: *„Wejścia UI w cudzy detail runu dla `guest`”* — **zawężone**: archiwum (terminalne) dozwolone (F-8 / F-10); zakaz dotyczy live/nieterminalnego oraz SSE na cudzym.

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
| Fonty: Space Grotesk + Inter + Geist Mono via `next/font/google` | obowiązkowe (F-11; Inter = `--font-secondary`, nie default body) |
| React Query / SWR | poza wymogiem MVP |
| Automatyczne testy FE | poza MVP (`docs/testy.md`) |

## Kryteria akceptacji

- [ ] Strona główna: **landing** + modal auth (F-15); IA: sticky chrome (brand = logotyp PNG `/content-chain-logo-transparent.png` przez `next/image`, `h-20 w-auto`, `alt` = brand, `#top`) → hero → **„Dla kogo”** (audience; 3 karty + lead wartości; kotwica chrome/footer) → wartości → Kontekst → Runy → proces → closing / footer; closing = **jeden** CTA **„Sprawdzam!”** → modal `register`, wariant `Button` **`default`** (stylistyka bez redefinicji); trzy tryby w modalu (`login` \| `register` \| `bootstrap_admin`); desktop **i** mobile = ten sam model (landing + modal); CTA chrome „Zaloguj się” / „Załóż konto” (**bez** zmiany względem closing); submit logowania **zawsze** `POST /auth/login`; **zakaz** CTA „Zarejestruj admina” na logowaniu; opcjonalne CTA „Zarejestruj admina” **tylko** na register iff `available === true` → tryb `bootstrap_admin` → `bootstrap-admin`; **`/invite/accept?token=`** → landing (modal login **nie** auto); deep link aktywacji → toast na landingu **bez** auto-modala / błąd → auto-open login; chrome po polsku; zalogowany `/` → `/account`; dashboard tylko po sesji.
- [ ] Register: **409** `Email already in use` → błąd na formularzu (w modalu); **201** `verifiedAt === null` lub **503** → thank-you fullscreen w szablonie landingu + resend (email ze stanu klienta); **201** z `verifiedAt` → tryb login w modalu; **bez** sesji z register/activate/resend.
- [ ] Header: do prawej; desktop login → „Wyloguj się”; mobile sheet: `CompletenessChipSlot` → stopka „Wyloguj się”; modal → logout → `/`.
- [ ] Fetch same-origin `/api/v1`; BFF → `API_BASE_URL` tylko serwer (prod: `http://api:3001`); UI prod na porcie **3004**; **401** `UNAUTHORIZED` → refresh → retry; cookie httpOnly na originie FE; **401** `INVALID_PASSWORD` **bez** refresh/wylogowania.
- [ ] **Runy** = archiwum `completed` \| `failed` \| `cancelled` (15 min + wejście) **oraz** CTA/modal **„Uruchom agenta”**; **Konto** = start inline + Moje runy live (paginacja UI 10) + Stop; po `202` szczegóły tego runu (Konto + modal Runy); toast „Run wystartował”; modal zamknięty; błąd startu bez nawigacji.
- [ ] Layout zalogowany: `h-dvh`, scroll tylko w `main`; **dark shell** (F-14) — ciemny sidebar **i** ciemny `main` + logo-area z logotypem PNG `/content-chain-logo-transparent.png` (`next/image`, 530×275; skala w `h-14` — HOW; `w-auto`; `alt` = brand; **bez** linku; desktop + mobile sheet); `CompletenessChipSlot` w desktop sidebarze **oraz** w mobile sheet przed „Wyloguj się” (widoczny bez scrolla treści; lifting F-17).
- [ ] Smoke mobile sheet: ten sam `CompletenessChipSlot` co desktop, przed stopką „Wyloguj się” (F-8; bez wyjątku „tylko `lg+`”); ten sam brand PNG w logo-area sheetu co desktop (F-14).
- [ ] F-11…F-19: tokeny + `@theme` w `globals.css`; typografia F-11 — Space Grotesk (`--font-sans`), Inter (`--font-secondary` na tytułach kart KPI + paragrafach pomocniczych), Geist Mono (`--font-mono`); `next/font/google` bez `<link>`; Inter ≠ default body; unikalny badge-pill per `RunStatus` (compact = te same); hero tylko `running` \| `awaiting_hitl` na detail; KPI cards nad Start runu (`GET /runs/summary`, DTO shared, zakres dat; guest tylko demo on; błąd → ukryj; etykiety KPI = Inter, wartości = Space Grotesk); lifting invite-accept / floating box bez zmiany flow; F-14 stany pozycji menu — normal / hover / active / active+hover (teal wash + ring + rail; tekst muted w active; desktop + mobile sheet; **bez** solid `bg-primary` na active); tło `--sidebar` bez zmiany pod nav; F-14 CTA-only — `Button` `default` = gradient teal/mint 135° + tekst ciemny (tokeny; nie solid `bg-primary`); chrome primary indigo/violet dla landingu / ring poza fill nav; hover/active CTA = te same kolory + `brightness(1.06)`; F-14 logo-area = logotyp PNG (skala w `h-14`, bez linku; desktop + sheet); F-15 = landing + modal (**nie** split-panel) **z** brandem sticky chrome = logotyp PNG `/content-chain-logo-transparent.png` (`next/image`, `h-20 w-auto`, `#top`; **nie** hero; sidebar = F-14) **oraz** sekcją audience („Dla kogo”) przed wartościami (kotwica chrome/footer; 3 karty; bez screenshotów audience / bez trzeciej palety) **oraz** closing = jeden CTA „Sprawdzam!” → `register` / `Button` `default` (chrome para CTA bez zmian).
- [ ] N× SSE tylko własne `running` / `awaiting_hitl` / `interrupted`; `close()` na `completed`/`failed`/`cancelled`; `queued` bez socketa; floating box poza Kontem **bez** Stop; po cancel: „Anulowany” → ukrycie po 200 ms.
- [ ] Stop + modal „Czy na pewno?” → cancel API (owner **lub** admin∧guest na detail); toast „Run anulowany”; dedup SSE; na `cancelled` brak przeglądu / HITL; parse `startedBy.role`.
- [ ] Start zablokowany w UI przy `!agentsActive` (niekompletność **lub** gateway nie żyje) **oraz** api `409` `CONTEXT_INCOMPLETE` przy niekompletnym kontekście; **bez** osobnego kodu „gateway down” na `POST /runs`.
- [ ] Chip F-6: copy nieaktywnego kanoniczne; przy kompletnym kontekście i martwym gateway — disable CTA **bez** fałszywego „Uzupełnij kontekst” jako jedynej remedacji; kropki zakładek **tylko** z `completeness.missing`.
- [ ] F-10: `GET /config`; chip demo tylko dashboard gdy `demoMode`; locki tylko `guest` ∧ demo on (także po accept+login przy demo on — te same co register→guest); modal limitu po quota API; 429 rating; archiwum: klik cudzego wiersza → detail read-only (bez SSE / bez mutacji).
- [ ] Konto: email — modal re-auth (`PATCH /auth/me/email` `{ email, currentPassword }`); `INVALID_PASSWORD` / `VALIDATION_FAILED` pod hasłem (bez F-4a); **409** → clear + odblokowanie emaila + błąd pod emailem; sukces bez toastu + `GET /auth/me`; Anuluj bez API; KPI (F-16) powyżej Start runu; moje runy (paginacja UI 10, badge F-12) → szczegóły; start (prefill ze snapshotu); opinia.
- [ ] Admin: Users + zaproszenie + kolumna Akcje (toggle `user` / Usuń+purge `guest` / brak na admin); flow 409→`purge=true`; `message` w dialogu; accept-invite → landing `/` (modal login **nie** auto; przy demo on sesja `guest` po loginie → locki F-10); błąd kolizji / złego tokenu = ten sam envelope **401** na karcie (bez UI „email zajęty” / bez gałęzi **409**).
- [ ] `app/` + `modules/` wg drzewa (m.in. `landing/`, `auth/`, `shell/`, `runs/` — **bez** `modules/social`\|`content`); typy z shared; brak sekretów LLM; brak `NEXT_PUBLIC_` URL-a api.
- [ ] Opinia / gwiazdki / Edytuj / finalize wg kontraktu; disable po `reviewFinalizedAt` **lub** po serwerowym `reviewExpiresAt`; copy „Przegląd zamknięty”; **bez** countdown / „dostępne do…”; HITL Social multi-select; wynik then_* = listy; kolejność etapów + zwijany etap 1; **bez** drugiego nagłówka pod „Wynik”; badge Wybrany / Niewybrany; `pageDocument` odczyt = markdown + Meta SEO.
- [ ] Envelope błędu w UI: `message` z API (bez `code` w treści).
- [ ] Kontekst firmy: sześć zakładek (default Tożsamość); kropki bramki z `missing` ostatniego GET/PUT; Dodatki bez kropki; jeden `PUT`; `user` read-only; Oferta: Dodaj nad listą + prepend, pola Nazwa→Opis→Korzyści, nagłówek+Usuń, licznik korzyści, poniżej `lg` truncate tytułu; CTA / kanały: Dodaj nad listą + prepend, Etykieta→Cel, nagłówek+Usuń, poniżej `lg` truncate; Odbiorca: wymagane **Nazwa** + opis; Dodatki: cztery podzakładki (Hashtagi domyślna / Notatki / Case studies / Obiekcje), Zapisz pod nimi, bez hicite o Agenci aktywni; Case studies: Dodaj nad listą + prepend, nagłówek („Case {title}” / „Case N”) + Usuń, pola Tytuł→Streszczenie→Metryki, poniżej `lg` truncate, bez hicie globalnego; Obiekcje: Dodaj nad listą + prepend, nagłówek („Obiekcja {label}” / „Obiekcja N”) + Usuń, pola Obiekcja→Odpowiedź, poniżej `lg` truncate, bez hicie globalnego.
- [ ] Start runu (Konto + modal): **Grupa** = select (Bez wskazania / nazwy z kontekstu / Wpisz własną grupę… + opis); mapowanie `brief.audience` wg F-7; custom bez matcha do katalogu.
- [ ] Admin nie utrwali pustej nazwy firmy, kalekiej usługi ani profilu bez Nazwy (submit zablokowany; 400 z api gdy UI ominięte); `user` read-only.
- [ ] Po 202 na Koncie: wiersz **oraz** toast „Run wystartował”.
- [ ] Po 202 na Runach: toast „Run wystartował”, modal zamknięty, floating box; lista archiwum **bez** nowego wiersza dopóki run nie jest `completed` \| `failed` \| `cancelled`.
- [ ] PUT kontekstu 200 → toast PL; 400 → envelope, zero toasta; cancel 200 → „Run anulowany”.
- [ ] Terminal SSE (`completed`/`failed`/`cancelled`) poza `/runs/:id` tego runu: jeden toast + link Szczegóły; box: na `cancelled` krótko „Anulowany”, potem 200 ms.
- [ ] Na `/runs/:id` tego runu: **brak** toasta terminalu z SSE (mutacja cancel może mieć toast bez nawigacji); status + logi na szczegółach.
- [ ] Select opinii: `completed` \| `failed` \| (`cancelled` z wynikiem); bez `cancelled` bez wyniku.
- [ ] Toaster tylko po sesji (wyjątek: toast po sukcesie activate na landingu — **bez** auto-otwarcia modala); `--z-toast`; nie zasłania floating boxa.

## Poza zakresem

- Playwright / testy FE.
- Motywy jasny / ciemny (**V1 — rozbudowa**, obowiązkowy): oba tryby w produkcie oraz **dynamiczne** przełączanie przez użytkownika **dedykowanym przełącznikiem** w UI (`docs/ux_dashboard.md`). W MVP kanon = **pełny dark shell** (F-14 — ciemny sidebar **i** ciemny `main`); **bez** przełącznika — dark shell **nie** jest dual-mode.
- i18n / next-intl (**V1 — rozbudowa**).
- Limit per-user runów w toku (**V1 — rozbudowa**, obowiązkowy).
- Pixel-perfect / Figma jako norma.
- Publikacja postów na API portali (v2).
- OAuth / social login.
- Przełącznik DEMO w UI admina; reset instancji / bulk purge gości z UI.
- Osobny trwały ekran „Aktywacja…”.
- Zmiana hasła zalogowanego / usuwanie własnego konta; confirm e-mail przy zmianie adresu (**V1** — **nie** mylić z aktywacją po register). **Zmiana własnego emaila z re-auth (modal) jest w MVP.** Soft/hard Users + reaktywacja `user` **w UI** (F-8) — **nie** poza zakresem.
  Zmiana względem wersji 37 / poza zakresem: *„zarządzanie użytkownikami (osobny plan)”* / *„soft-delete users w UI”* — **unieważnione** dla per-konto toggle/Usuń/purge; reset/bulk **zostaje** poza.
- `selectedIdeaIds` na starcie; `conversationId` w UI.
- CTA startu w sidebarze / headerze oraz na szczegółach `/runs/:runId`.
- Prefill startu z wiersza archiwum Runy.
- Panel admina opinii / diff / historia wersji outputu.
- Nowy endpoint SSE „moje runy”.
- Browser Notification API; mail przy `failed` runu.
- Druga rura toastów poza `notifyProduct`.

Zmiana względem wersji 20 / „Poza zakresem”: „Playwright / testy FE, dark/light jako wymóg” (jedna linia, bez fazy). Od tej wersji Playwright zostaje poza MVP; dual-mode = **obowiązek V1** z dedykowanym przełącznikiem.
Zmiana względem wersji 30 / „Poza zakresem”: „Otwarta rejestracja” — **unieważnione**; signup jest w zakresie MVP (F-4b).
