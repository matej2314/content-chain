# Content Chain — major plan (backend)

**Zakres tego pliku:** fundament monorepo, boilerplate frontu (wyłącznie struktura i pakiety) oraz **backend** aż do zielonego pipeline’u SM, auth API **oraz fundamentu zapisu feedbacku** (opinie, ocena runu, flaga edycji).  
**Poza tym plikiem:** dashboard / feature FE (osobny major frontendowy — w tym kontrolki zapisu opinii/gwiazdek wg `docs/ux_dashboard.md`), pełny Docker Compose / `production` (ewentualnie tylko roboczy compose pod backend — bez domknięcia produkcyjnego), eksport `.md` + checksum, PostgreSQL / faza V1 — rozbudowa (w tym **panel administracyjny** opinii / analityka), rozbudowa ops poza fundamentem metryk.

**Źródła:** `docs/`, `spec/SPEC-*.md`, `content-chain_brief.md` (kontekst kolejności budowy).  
**Kolejność priorytetów:** Faza 7 (`WYKONANY`) i Faza 8 (`WYKONANY`) — kolejny start: **Faza 4** / Milestone 4 (pipeline + Postman), potem Faza 5 (Auth), potem Faza 6 (fundament zapisu feedbacku). Faza 7 i Faza 8 nie mają własnego milestone’u.

**Statusy (fazy / kroki):** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`  
**Milestone:** domyślnie **bez statusu**; po spełnieniu DoD → wyłącznie `OSIĄGNIĘTY`

---

## Faza 1 — Fundament monorepo i boilerplate aplikacji

**Status:** `WYKONANY`

**Opis:** Uporządkowany start repozytorium: docelowe drzewo aplikacji i pakietu współdzielonego, wspólne typy kontraktu (w tym brand types), boilerplate frontu bez ekranów produktowych oraz uruchamialne szkielety api i gateway LLM (api ze stackiem config/logger/Swagger `/docs`, port 3001). Cel: bezpieczny start prac backendowych bez reworku layoutu monorepo. Zgodnie z `docs/architektura_katalogi_pliki.md`, `docs/brand_types.md`, `SPEC-MONOREPO.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`.

**DoD (faza):**

- W rootcie istnieje spójny workspace z dokładnie trzema aplikacjami runtime i pakietem współdzielonym typów — zgodnie z docs/SPEC monorepo.
- `packages/shared` zawiera typy/enumy/brand types potrzebne dalszym fazom backendu (bez logiki domenowej).
- Frontend ma wyłącznie boilerplate (struktura + wymagane zależności) — bez ekranów produktowych.
- Procesy api i gateway da się uruchomić jako działające aplikacje startowe (gateway = pełna uruchamialna instancja w monorepo, nie pusty stub); api: port **3001**, Swagger **`/docs`**, stack config/Pino/walidacja.
- Szablony konfiguracji env per aplikacja oraz wspólny tooling jakości kodu w rootcie są na miejscu.

### Krok 1.1 — Workspace i docelowe drzewo katalogów

**Status:** `WYKONANY`

**Opis:** Układ monorepo zgodny z dokumentacją: aplikacje pod `apps/`, typy kontraktu pod `packages/shared`, bez opakowania aplikacji w rootowy `src/`.

**DoD (krok):**

- Istnieją ścieżki `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, `packages/shared`.
- Workspace obejmuje aplikacje i pakiety zgodnie z `SPEC-MONOREPO.md`.
- Granice importów między pakietami są respektowane na poziomie układu (bez mieszania źródeł api ↔ gateway ↔ frontend).

### Krok 1.2 — Pakiet współdzielony: kontrakt typów i brand types

**Status:** `WYKONANY`

**Opis:** Domknięcie wspólnego kontraktu typów (identyfikatory brandowane, enumy statusów/ról/platform/języków itd.) jako gotowości pod persistence i BC — zgodnie z `docs/brand_types.md` i `SPEC-MONOREPO.md`.

**DoD (krok):**

- Brand types i enumy MVP z docs są dostępne w pakiecie współdzielonym.
- Pakiet nie zawiera use-case’ów, ORM ani walidacji runtime domeny.
- Api (i później FE) mogą polegać na tym kontrakcie bez duplikacji „na piechotę”.

### Krok 1.3 — Boilerplate frontendu (struktura + pakiety)

**Status:** `WYKONANY`

**Opis:** Przygotowanie cienkiego klienta wyłącznie jako szkielet pod przyszły major frontendowy: katalogi i wymagane zależności wg docs/`SPEC-FRONTEND.md`, **bez** budowy dashboardu i feature’ów.

**DoD (krok):**

- Drzewo katalogów frontu odzwierciedla podział z docs (m.in. routing + `modules/`).
  Zmiana względem: wcześniejsze sformułowanie „routing + features” (nazwa katalogu UI). Źródło: `docs/architektura_katalogi_pliki.md`, `SPEC-FRONTEND.md`.
- Wymagane zależności frontu są zainstalowane / zadeklarowane w workspace.
- Brak zaimplementowanych ekranów produktowych (Kontekst, Runy, Użytkownicy itd.) w zakresie tego majoru.

### Krok 1.4 — Szkielety api i gateway LLM

**Status:** `WYKONANY`

**Opis:** Uruchamialne aplikacje `apps/api` oraz `apps/ai-provider-gateway` z docelową strukturą katalogów BC/warstw po stronie api i pełną, dostosowaną instancją gateway w monorepo (gotową pod późniejszy smoke z api). Gateway bez domeny Content Chain — zgodnie z `docs/architektura.md`. Api od Fazy 1 ma zatwierdzony stack runtime: `@nestjs/config`, class-validator/Zod (deps), Pino/`nestjs-pino`, Swagger UI pod `/docs`; lokalny port api **3001** (`docs/deployment.md`, `SPEC-KOMUNIKACJA.md` / `SPEC-BEZPIECZENSTWO.md`). Helmet, CORS i fail-fast krytycznych env — Faza 2.

**DoD (krok):**

- Api startuje jako proces z szkieletową strukturą BC zgodną z drzewem docs.
- Api ma zainstalowany i podpięty stack config / logger procesu / Swagger (`/docs`); port domyślny lokalny **3001**.
- Gateway w monorepo jest **pełną, uruchamialną** instancją (nie pusty katalog-stub).
- Brak przeniesienia reguł Social / kontekstu firmy / auth produktu do gateway.

### Krok 1.5 — Tooling root i szablony env

**Status:** `WYKONANY`

**Opis:** Wspólny lint/format w rootcie workspace oraz szablony zmiennych środowiskowych per aplikacja (placeholdery, bez sekretów) — zgodnie z `SPEC-MONOREPO.md` / `SPEC-BEZPIECZENSTWO.md` i `docs/deployment.md` (DX lokalny).

**DoD (krok):**

- Wspólna konfiguracja jakości kodu w rootcie obejmuje workspace.
- Każda aplikacja ma szablon env z placeholderami; sekrety nie trafiają do repo.
- Start DX lokalnego da się opisać ze skryptów root (bez wymogu Nx/Turborepo w MVP).

---

## MILESTONE 1 — Monorepo i boilerplate gotowe pod rozwój backendu

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 1. Duży skok: layout repo, kontrakt typów, boilerplate FE oraz uruchamialne api/gateway — wolno wchodzić w fundament runtime backendu.

**DoD (milestone):**

- Faza 1 spełnia swoje DoD (lub ma status `WYKONANY`).
- Trzy aplikacje + `packages/shared` istnieją i są spójne z docs.
- Brand types / enumy kontraktu są gotowe na kolejne fazy.
- Frontend pozostaje wyłącznie boilerplate w tym planie.
- Api i gateway startują; tooling i szablony env są na miejscu.
- Akceptacja przejścia do Fazy 2.

---

## Faza 2 — Fundament runtime backendu

**Status:** `WYKONANY`

**Opis:** Kanoniczna baza MVP, podstawowa powierzchnia HTTP api, droga do LLM wyłącznie przez gateway oraz **fundament** metryk procesu. Bez budowy pipeline’u SM i bez auth. Zgodnie z `SPEC-PERSISTENCE.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`, `docs/observability.md`.

**DoD (faza):**

- Api korzysta z kanonicznej bazy MVP (SQLite) przygotowanej pod BC z docs.
- Odpowiedzi błędów mają uzgodniony envelope; health jest obserwowalny.
- Smoke połączenia api → gateway przechodzi.
- Obecny jest wyłącznie **fundament** metryk ops api (bez rozbudowy alertów / pełnego ops).

### Krok 2.1 — Persistence MVP (fundament schematu)

**Status:** `WYKONANY`

**Opis:** Fundament zapisu kanonicznego pod auth, kontekst firmy, runy i wyniki SM — silnik MVP zgodnie z docs/SPEC; identyfikatory w postaci brandowanej. Bez cichego fallbacku z plików.

**DoD (krok):**

- Schema/migracje pod BC MVP są w miejscu ustalonym w docs (`apps/api` / persistence).
- Domain/shared nie zależą bezpośrednio od ORM.
- Baza jest gotowa jako źródło prawdy dla kolejnych BC (jeszcze bez pełnej logiki biznesowej).

### Krok 2.2 — Powierzchnia HTTP: envelope, health, startowe zabezpieczenia

**Status:** `WYKONANY`

**Opis:** Stabilny kontrakt błędów i health oraz podstawy zabezpieczeń startu procesu (nagłówki / CORS wg normy) — bez pełnego auth. **Uwaga względem Fazy 1 / Kroku 1.4:** `@nestjs/config`, Pino/`nestjs-pino` i Swagger (`/docs`) mogą już być w api; ten krok **nie** instaluje ich od zera — dopina Helmet, CORS, envelope błędów, health oraz **fail-fast** krytycznych zmiennych env.

**DoD (krok):**

- Błędy HTTP api mają envelope zgodny z docs/`SPEC-KOMUNIKACJA.md`.
- Health odpowiada w sposób bezpieczny (bez wrażliwych danych).
- Fail-fast przy braku krytycznych zmiennych env jest egzekwowany dla api (i spójnie z normą gateway).

### Krok 2.3 — Port LLM i smoke z gateway

**Status:** `WYKONANY`

**Opis:** Api woła modele wyłącznie przez port + adapter do lokalnego gateway; weryfikacja dymna połączenia. Zgodnie z granicą LLM w `docs/architektura.md` i `SPEC-KOMUNIKACJA.md`.

**DoD (krok):**

- Api nie woła vendorów LLM bezpośrednio.
- Smoke api → uruchomiony gateway kończy się sukcesem obserwowalnym (odpowiedź / log bez wycieku sekretów).
- Sekrety gateway nie pojawiają się w odpowiedziach publicznych api.

### Krok 2.4 — Fundament metryk ops api

**Status:** `WYKONANY`

**Opis:** Minimalny fundament ekspozycji metryk procesu api — wyłącznie podstawa pod observability; **bez** rozbudowy ops, alertów ani mylenia z logami runu domenowego.

**DoD (krok):**

- Fundament metryk api jest dostępny zgodnie z kierunkiem `docs/observability.md` / `SPEC-BEZPIECZENSTWO.md`.
- Metryki nie zawierają sekretów ani treści promptów.
- Brak wymogu pełnego stacku monitoringu w tym majorze.

---

## MILESTONE 2 — Backend startowalny: kanoniczna DB + droga do LLM

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 2. Fundament runtime domknięty: wolno budować BC kontekstu i runów.

**DoD (milestone):**

- Faza 2 spełnia swoje DoD (lub `WYKONANY`).
- Kanoniczna DB MVP jest gotowa pod kolejne BC.
- Health i envelope działają; smoke api→gateway OK.
- Fundament metrics obecny; brak wycieku sekretów na powierzchniach publicznych.
- Akceptacja przejścia do Fazy 3.

---

## Faza 3 — Kontekst firmy i cykl życia runów

**Status:** `WYKONANY`

**Opis:** Bramka kompletności kontekstu firmy oraz cykl życia async runu (statusy, logi w DB, SSE, lista kolekcji pod dashboard, wykonanie in-process) jako podstawa pod Social. Zgodnie z `SPEC-KONTEKST-FIRMY.md`, `SPEC-RUNY.md`, `docs/data_flow.md`, `docs/dokumentacja_komunikacji.md`.

**DoD (faza):**

- Kontekst firmy da się zapisać i odczytać; kompletność jest egzekwowana programowo.
- Start flow SM jest blokowany przy niekompletnym kontekście.
- Run ma dozwolone przejścia statusów, append-only logi w DB oraz live postęp przez SSE (GET = snapshot).
- Lista runów całej instancji jest dostępna przez API (paginacja, filtry, pola pod dashboard — w tym inicjator gdy znany).

### Krok 3.1 — BC Company Context

**Status:** `WYKONANY`

**Opis:** Kanoniczny kontekst jednej firmy na instancję, werdykt kompletności sekcji bramki oraz blokada startu runów przy braku kompletności.

**DoD (krok):**

- Werdykt kompletności jest obserwowalny (flaga / brakujące sekcje) zgodnie z docs.
- Niekompletny kontekst skutkuje odrzuceniem startu runu w sposób zgodny z kontraktem (`CONTEXT_INCOMPLETE` / równoważny efekt z docs).
- Jakość merytoryczna treści pozostaje po stronie użytkownika; programowo egzekwowana jest kompletność wymaganych sekcji.

### Krok 3.2 — BC Runs (statusy, logi, SSE, in-process)

**Status:** `WYKONANY`

**Opis:** Utworzenie runu, polityka statusów, kanoniczne logi, emisja SSE oraz wykonanie workera w procesie api — bez osobnego always-on workera OS w MVP. Przy starcie zapisywane jest miejsce na inicjatora (`startedBy`) pod późniejsze auth.

**DoD (krok):**

- Niedozwolone przejście statusu jest odrzucane.
- Logi runu w DB pozwalają odtworzyć przebieg (append-only).
- Live postęp idzie SSE; snapshot dostępny osobno (w tym meta pod szczegóły UI).
- HTTP nie blokuje na cały długi przebieg LLM.

### Krok 3.3 — Lista runów instancji (paginacja i filtry)

**Status:** `WYKONANY`

**Opis:** Powierzchnia `GET /api/v1/runs` pod widok listy dashboardu: cała instancja, stała strona 10, sort `createdAt` desc, filtry status / taskType / platforma / userId, pozycje z `startedBy` (email jako identyfikator wyświetlany). Zgodnie z docs komunikacji i `SPEC-RUNY.md`.  
*(Dopisane względem wcześniejszej wersji Fazy 3: wcześniej tylko cykl pojedynczego runu bez listingu kolekcji.)*

**DoD (krok):**

- Lista zwraca runy całej instancji z polami wymaganymi przez docs (w tym `createdAt`, `startedBy` gdy znany).
- Paginacja działa ze stałym rozmiarem 10; najnowsze pierwsze.
- Filtry status, taskType, platform, userId działają zgodnie z kontraktem.
- Snapshot szczegółów runu jest spójny z danymi listy (gotowość pod nawigację lista → szczegóły w majorze FE).

---

## MILESTONE 3 — Bramka kontekstu i runy gotowe pod pipeline Social

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 3. Kontekst i runy (w tym listing) są gotowe; wolno wdrażać pipeline Social.

**DoD (milestone):**

- Faza 3 spełnia swoje DoD (lub `WYKONANY`).
- Niekompletny kontekst blokuje start; kompletny odblokowuje ścieżkę pod Social.
- Run ma obserwowalny cykl życia (status + logi + SSE).
- Lista runów instancji jest dostępna przez API (paginacja / filtry / pola pod dashboard).
- Akceptacja przejścia do Fazy 4.

---

## Faza 4 — Pipeline Social (ideas / content)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Pierwszy slice produktowy backendu: post ideas i post content z weryfikacją względem kontekstu, zapisem wyników i czytelnych logów; LLM tylko przez gateway. Weryfikacja **obu** happy pathów Postmanem (bez UI). Zgodnie z `SPEC-SOCIAL.md`, `docs/data_flow.md`, `docs/dokumentacja_koncepcyjna.md`.  
**Odblokowana po Fazie 7** (`WYKONANY`) **i Fazie 8** (`WYKONANY`): executor Social siada na grafie z `interrupted` i twardym capem claimu (`SPEC-RUNY.md` R-6 / R-9); hub SSE kończy strumień po `completed`/`failed` (`SPEC-RUNY.md` R-4a), zanim pipeline zacznie produkować runy.

**DoD (faza):**

- Pipeline SM działa za fasadą api (controller nie orkiestruje grafu ani promptów).
- Wyniki i werdykt weryfikacji trafiają do DB; logi runu są czytelne.
- Obie ścieżki Postman przechodzą: `post_ideas` (full-auto) oraz `post_ideas_then_content` z pauzą HITL.

### Krok 4.1 — Fasada Social, orchestracja i prompty

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Application fasada startu/wznowienia; orchestracja pipeline’u i szablony promptów za granicą HTTP — zgodnie z wyjątkiem Social w docs/SPEC.

**DoD (krok):**

- Start/wznowienie pipeline’u idzie wyłącznie przez fasadę aplikacyjną.
- Prompty i definicja pipeline’u nie żyją w controllerze ani we froncie/gateway.
- Structured output kroków jest walidowany przed kontynuacją (porażka ≠ cichy tekst do klienta).

### Krok 4.2 — Integracja z kontekstem, runami i gateway; wyniki

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Spięcie Social z bramką kontekstu, cyklem runu, logami oraz gateway; zapis ideas/content i weryfikacja spójności z kontekstem firmy.

**DoD (krok):**

- Start respektuje bramkę kontekstu i cykl życia runu.
- Wywołania LLM idą przez port/gateway; korelacja ID zgodna z `docs/brand_types.md`.
- Wynik (ideas/content) oraz efekt weryfikacji są dostępne przez api / DB.
- Limit refine po fail verifiera jest skończony (norma SPEC); brak nieskończonej pętli.

### Krok 4.3 — Happy path Postman (obie ścieżki)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** DoD pośredni z docs: weryfikacja bez UI. Obowiązkowo obie ścieżki: lista pomysłów full-auto oraz ideas → HITL → content.

**DoD (krok):**

- `post_ideas` kończy się sukcesem z listą pomysłów w DB i czytelnymi logami.
- `post_ideas_then_content` pauzuje na HITL, wznawia po wyborze i kończy treścią w DB.
- Scenariusze da się powtórzyć przez klienta HTTP (Postman) bez frontendu produktowego.

---

## MILESTONE 4 — Zielony pipeline SM (dowód pośredni Postman)

**Opis:** Bramka po Fazie 4. Duży skok produktowy backendu: pipeline SM działa end-to-end bez UI. **Priorytet przed Auth.**

**DoD (milestone):**

- Faza 4 spełnia swoje DoD (lub `WYKONANY`).
- Obie ścieżki Postman (ideas oraz ideas→HITL→content) są zielone.
- Logi runu pozwalają odtworzyć przebieg; UI nie jest wymagane.
- Akceptacja przejścia do Fazy 5 (Auth).

---

## Faza 5 — Auth API (forma docelowa)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Auth w formie docelowej na api: bootstrap jednego admina (status + sesja po bootstrapie), sesja cookie, **`GET /auth/me`**, role, zarządzanie użytkownikami (lista/create + soft-delete w API), zabezpieczenie powierzchni kontekstu i runów oraz wypełnianie `startedBy` przy starcie. Zgodnie z `SPEC-AUTH.md`, `docs/security.md` — po zielonym pipeline (order of attack).

**DoD (faza):**

- Bootstrap admina działa jednorazowo; `bootstrap-status` poprawnie sygnalizuje dostępność; po bootstrapie jest sesja cookie.
- Login/logout/refresh oraz **`GET /auth/me`** opierają się o cookie sesji zgodne z docs/SPEC (bez tokenów access w body jako modelu MVP).
- Role `admin` / `user` są egzekwowane na api (w tym edycja kontekstu tylko admin).
- Zarządzanie użytkownikami: lista + tworzenie `user`; DELETE = soft-delete; nowe runy ze sesją mają `startedBy`.

### Krok 5.1 — Bootstrap, sesja cookie, role, probe `/me`

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Pierwszy admin (w tym publiczny status pod first-run FE), mechanizm sesji, model ról oraz kanoniczny probe tożsamości `GET /auth/me`.  
*(Rozszerzenie względem wcześniejszej treści kroku 5.1: dopisano bootstrap-status, sesję po bootstrapie i `/me`.)*

**DoD (krok):**

- `bootstrap-status` i bootstrap są zgodne z docs; bootstrap niedostępny po utworzeniu admina.
- Sesja działa na uzgodnionych cookie httpOnly; klienci HTTP (Postman) używają cookie jar.
- `GET /auth/me` zwraca `{ id, email, role }` albo 401 — gotowość pod flow FE me → refresh → me.
- Role rozróżniają uprawnienia zgodnie z SPEC-AUTH.

### Krok 5.2 — Użytkownicy, soft-delete i zabezpieczenie powierzchni api

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Lista + tworzenie użytkowników w granicach normy, soft-delete w API, domknięcie authz na kontekście firmy i runach SM oraz obowiązkowy inicjator przy starcie runu ze sesją.  
*(UI admina MVP: tylko lista + create — poza tym major planem FE; tu norma API.)*

**DoD (krok):**

- Admin może listować i tworzyć konta `user` zgodnie z SPEC; nie powstaje drugi admin poza bootstrapem.
- DELETE użytkownika = soft-delete; nieaktywny nie loguje się.
- `user` nie edytuje kontekstu firmy; start runów / HITL / odczyt logów / lista zgodnie z rolami.
- Start runu ze sesją zapisuje `startedBy`; powierzchnie wcześniej otwarte pod Postman są domknięte authz bez psucia happy path dla zalogowanych ról.

---

## MILESTONE 5 — Auth API gotowe pod feedback i frontend

**Opis:** Bramka po Fazie 5. Sesja, role i `startedBy` działają. **Nie** zamyka majoru backendowego.

Zmiana względem wcześniejszego zapisu tego milestone’u („Backend w zakresie tego majoru domknięty”): domknięcie przesunięte za Fazę 6 (fundament zapisu feedbacku). Powód: ocena i opinie wymagają autentycznego `startedBy` / sesji, ale są osobnym krokiem po auth.

**DoD (milestone):**

- Faza 5 spełnia swoje DoD (lub `WYKONANY`).
- Zielony pipeline (Milestone 4) nadal przechodzi przy poprawnej sesji / rolach.
- Auth jest w formie docelowej na api (`/me`, bootstrap-status, soft-delete); egzekucja uprawnień nie polega na UI.
- Lista runów + `startedBy` oraz probe sesji są gotowe jako kontrakt pod Fazę 6 i major frontendowy.
- Akceptacja przejścia do Fazy 6.

---

## Faza 6 — Fundament zapisu: opinie, ocena runu, flaga edycji

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** MVP-fundament jakości z perspektywy użytkownika: tabela opinii tekstowych, metadane oceny gwiazdkowej (`null` \| `1–5`) i flagi edycji outputu na runie, HTTP zapisu, lista `GET /runs/user/:userId`. **Bez** panelu administracyjnego / analityki (V1 — rozbudowa) i **bez** UI (major FE). Zgodnie z `SPEC-FEEDBACK.md`, `SPEC-RUNY.md` (R-3c, R-10), `docs/dokumentacja_komunikacji.md`.

**DoD (faza):**

- Opinia tekstowa zapisuje się w DB z `authorId` i `createdAt`; target aplikacja / agent (enum) / własny run.
- Snapshot runu zawiera `userRating`, `outputEdited`, `reviewFinalizedAt`; ocena i flaga działają na `completed` i `failed` tylko dla autora; po finalize — lock.
- `GET /api/v1/runs/user/:userId` zwraca wszystkie runy sesji; cudzy id → 403.
- Happy path Postman (bez UI) dla zapisu opinii, oceny, flagi i finalize.

### Krok 6.1 — Persistence: tabela opinii i pola przeglądu Run

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Nowa migracja Prisma (append; bez przepisywania historii SQLite z Fazy 2): tabela Feedback + kolumny Run (`userRating`, `outputEdited`, `reviewFinalizedAt`). Domyślnie `userRating = null`, `outputEdited = false`, `reviewFinalizedAt = null`.

**DoD (krok):**

- Schema przenośna (P-7); ID opinii brandowane `fbk_<uuid>`.
- Istniejący cykl życia runu (Faza 3–4) nie psuje się: nowe pola mają bezpieczne defaulty.
- ORM tylko w infrastructure.

### Krok 6.2 — HTTP Feedback i lista runów autora

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** BC `feedback/` — `POST /api/v1/feedback`. `GET /api/v1/runs/user/:userId` w BC Runs (trasa przed `:runId`). Authz: sesja; run/target run tylko `startedBy`; `:userId` = sesja.

**DoD (krok):**

- POST opinii: 201 z metadanymi; drugi wpis = nowy wiersz; cudzy run → 403.
- Target `agent` wymaga enumu `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier`.
- Lista user zwraca wszystkie runy autora bez `pageSize=10`.
- Brak GET panelu opinii w tym kroku (świadomie).

### Krok 6.3 — Ocena, flaga edycji, finalize; snapshot

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** `PATCH .../rating`, `POST .../output-edited`, `POST .../finalize-review`. Snapshot `GET /runs/:runId` zgodny z docs (w tym `userRating` zawsze obecne). Flaga edycji nie nadpisuje payloadu SM.

**DoD (krok):**

- `completed` i `failed` (także po edycji outputu) — autor może oceniać i oznaczać edycję do finalize.
- Brak gwiazdek → `null`; 1–5 tylko po wyborze użytkownika.
- Po finalize dalsza zmiana → `REVIEW_LOCKED`; zły status → `RUN_NOT_REVIEWABLE`.
- Postman: finalize z `null` oraz z oceną 1–5.

---

## MILESTONE 6 — Backend w zakresie tego majoru domknięty

**Opis:** Bramka zamykająca ten plik (przesunięta za Fazę 6). Pipeline SM + auth API + fundament zapisu feedbacku działają łącznie; frontend produktowy oraz panel admina opinii pozostają poza planem.

**DoD (milestone):**

- Faza 6 spełnia swoje DoD (lub `WYKONANY`).
- Zielony pipeline (Milestone 4) i auth (Milestone 5) nadal przechodzą.
- Kontrakt zapisu opinii / oceny / flagi / listy `runs/user/:userId` jest gotowy pod major frontendowy (`ux_dashboard.md`).
- Dashboard / feature FE, pełny compose production, eksport `.md`/checksum, PostgreSQL / V1 — rozbudowa (panel analityczny opinii) pozostają **poza** tym major planem.
- Akceptacja domknięcia majoru backendowego (kolejny major: frontend produktowy — osobno).

---

## Faza 7 — Refaktor cyklu runu: `interrupted` i cap recovery

**Status:** `WYKONANY`

**Opis:** Refaktor względem: **Faza 3 / Krok 3.2** (`WYKONANY`) — worker in-process, recovery po crashu, przejścia statusów; oraz **Faza 1 / Krok 1.2** (`WYKONANY`) — enum `RunStatus` w `packages/shared`. Cel: status `interrupted`, twardy `MAX_CONCURRENT_RUNS` na claim `interrupted → running` (priorytet nad `queued`), bez burstu leftover `running`. HITL (`awaiting_hitl → running`) poza tym use-casem.  
Źródło normy: `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `SPEC-RUNY.md` (od v4), `SPEC-TESTY.md` D-9 / D-9b / D-10.  
**Bez MILESTONE 7** — to korekta kontraktu, nie skok produktowy. Wykonana **przed startem Fazy 4**. MILESTONE 3 (`OSIĄGNIĘTY`) zostaje: runy istnieją; ta faza koryguje graf zanim Social użyje executora.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-7-interrupted-recovery.md`. Recovery na starcie procesu tylko ustawia stan; leftover wraca do wykonania przez ten sam cap co kolejka (priorytet `interrupted` przed `queued`). HITL poza capem bez zmian. Brak MILESTONE 7. Faza 4 pozostaje `NIE_ROZPOCZĘTY`, odblokowana do startu.

**DoD (faza):**

- `RunStatus` w shared obejmuje `interrupted`; niedozwolone krawędzie (w tym `interrupted → queued`, `awaiting_hitl → interrupted`) są odrzucane.
- Boot: leftover `running` → `interrupted` (albo `failed` przy capie 3); leftover już `interrupted` bez inkrementu `recoveryAttempts`.
- Claim `interrupted → running` i `queued → running` tylko przy `inFlight < MAX_CONCURRENT_RUNS`; drain: najpierw `interrupted`, potem FIFO `queued`.
- `POST /runs` nadal zwraca tylko `queued` \| `running`; `awaiting_hitl` po restarcie bez zmian.
- Testy D-9, D-9b i D-10 przechodzą; brak burstu execute recovery ponad cap.

### Krok 7.1 — Kontrakt `RunStatus` i maszyna przejść

**Status:** `WYKONANY`

**Opis:** Refaktor względem: Faza 1 / Krok 1.2 (`WYKONANY`) oraz Faza 3 / Krok 3.2 (`WYKONANY`, `assertTransition`). Dopisanie `interrupted` do unii/enumu w `packages/shared` oraz legalnych krawędzi: `running → interrupted`, `interrupted → running`, `interrupted → failed`.

**DoD (krok):**

- `@content-chain/shared` eksportuje `interrupted` w `RunStatus` / `RUN_STATUSES`.
- Domain odrzuca `interrupted → queued`, `completed → running`, `awaiting_hitl → interrupted`.
- Filtr listy runów akceptuje nowy status (ten sam enum).
- Brak zmiany modelu persistence statusu runu (nowa wartość kontraktu, bez migracji schematu).

### Krok 7.2 — Recovery boot, claim i drain pod capem

**Status:** `WYKONANY`

**Opis:** Refaktor względem: Faza 3 / Krok 3.2 (`WYKONANY`) — `RecoverInterruptedRunsUseCase`, `InProcessRunWorker` (`scheduleExistingRunning` / burst), `claimNextQueued`. Recovery ustawia stan; worker claimuje `interrupted` analogicznie do `queued`, pod `MAX_CONCURRENT_RUNS`, z priorytetem w `drain`. HITL nadal poza tym capem (ten sam use-case co w Kroku 3.2).

**DoD (krok):**

- `onModuleInit`: recovery **przed** claimem `queued`; brak startu wszystkich leftover execute naraz.
- Atomowy claim `interrupted → running` (`assertTransition` + wartownik statusu).
- Drain przy wolnym slocie: najpierw `interrupted`, potem FIFO `queued`.
- `recoveryAttempts++` tylko z leftover `running`; cap 3 → `failed` + log, bez execute.
- SSE `run.status` przy przejściach do/z `interrupted`.
- HITL (`awaiting_hitl → running`) nadal omija cap claimu.

### Krok 7.3 — Testy kolejki i recovery (D-9 / D-9b / D-10)

**Status:** `WYKONANY`

**Opis:** Pokrycie nowej normy z `SPEC-TESTY.md` (warstwa unit / integration oraz istniejący e2e D-9). Refaktor względem: testów workera i recovery z Fazy 3 / Kroku 3.2 (`WYKONANY`), które utrwalają burst HITL — burst **HITL** zostaje; burst **recovery** jest sprzeczny z R-6/R-9 od SPEC v4.

**DoD (krok):**

- D-9: nowy POST przy pełnym capie zostaje `queued`, potem startuje.
- D-9b: `MAX=1`, dwa `interrupted` + jeden `queued` → kolejność execute: interrupted, interrupted, queued.
- D-10: leftover `running` → `interrupted`; 3× przerwany execute → `failed` + log; leftover `interrupted` bez inkrementu attempts; boot nie burstuje ponad cap.
- Istniejący test HITL ponad cap **nie** jest przepisywany na recovery (osobny use-case).

---

## Faza 8 — Refaktor SSE: koniec strumienia i evikcja huba

**Status:** `WYKONANY`

**Opis:** Refaktor względem: **Faza 3 / Krok 3.2** (`WYKONANY`) — `InMemoryRunSseHub` (`Map` subjectów), `RunsController.events`, `RunLifecycleService.publish`; oraz **Faza 7 / Krok 7.2** (`WYKONANY`) — SSE `run.status` przy `interrupted` **zostaje** (stream nie kończy się na `interrupted` / `awaiting_hitl`). Cel: po `completed` / `failed` hub robi `complete` + usuwa wpis z mapy; Observable SSE się kończy; late-join na skończonym runie emituje snapshot i zamyka połączenie — bez wycieku pamięci i wiszących socketów.  
Źródło normy: `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`, `docs/anty_patterny.md`, `SPEC-KOMUNIKACJA.md` K-3a, `SPEC-RUNY.md` R-4a, `SPEC-FRONTEND.md` F-5a, `SPEC-TESTY.md` D-14.  
Kontrakt docs/SPEC jest **już w repo** (dopisany przed startem tej fazy); tu wdrażamy go w `apps/api`. UI `EventSource` (F-5a) pozostaje w majorze frontendowym.  
**Bez MILESTONE 8** — korekta cyklu życia kanału live, nie skok produktowy. **Wykonana przed startem Fazy 4** (Faza 7 uznała Faza 4 za odblokowaną po `interrupted`; ta faza wstawia się przed Social, żeby hub nie rósł z każdym runem pipeline’u).

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-8-sse-complete.md`. Port `complete` + evikcja huba; lifecycle woła `complete` tylko po `completed`/`failed`; late-join terminalny zamyka stream bez `subscribe`; heartbeat + TTL Subject. Brak MILESTONE 8. Faza 4 pozostaje `NIE_ROZPOCZĘTY`, odblokowana do startu (po Fazie 7 i Fazie 8).

**DoD (faza):**

- Port `RunSseHub` ma jawny `complete(runId)` (lub równoważne); hub po `completed`/`failed` kończy subject i usuwa wpis z mapy.
- `awaiting_hitl` i `interrupted` nie wołają `complete`; disconnect klienta nie evikuje subjectu żyjącego runu.
- `GET .../events` przy snapshotcie już terminalnym: `run.status` z najnowszego odczytu DB, potem koniec streamu — bez wiecznego subjectu.
- Subjects w hubie mają TTL automatu ewikcji (`RUN_SSE_SUBJECT_TTL_MS`); brak zombie Subject przy hung runie.
- Live Observable zawiera merge z heartbeat (`SSE_HEARTBEAT_MS`); klient nie dostaje ciszy TCP dłuższej niż ~25 s.
- `startWith` w `events()` oparty na najnowszym odczycie DB (drugi `getRun.execute` przed `subscribe`).
- Testy D-14 przechodzą (unit huba/lifecycle/controllera + e2e: skończony run zamyka SSE).

### Krok 8.1 — Port i `InMemoryRunSseHub`: `complete` + evikcja

**Status:** `WYKONANY`

**Opis:** Refaktor względem: Faza 3 / Krok 3.2 (`WYKONANY`) — `run-sse.port.ts` / `run-sse.hub.ts` (`subjectFor` bez `delete`). Idempotentny `complete(runId)`: `subject.complete()` + `subjects.delete`. `publish` po `complete` nie ożywia wiecznego subjectu.

**DoD (krok):**

- Interfejs huba eksportuje `complete(runId)`.
- Po `complete` mapa nie trzyma wpisu; drugi `complete` = no-op.
- Unit test huba pokrywa evikcję i propagację complete do subscribera (bez HTTP).

### Krok 8.2 — Lifecycle i late-join HTTP

**Status:** `WYKONANY`

**Opis:** Refaktor względem: Faza 3 / Krok 3.2 (`WYKONANY`) — `RunLifecycleService.transition` (publish terminalnego eventu bez `complete`) oraz `RunsController.events` (`subscribe` + `startWith` bez końca Observable). Po `publish(run.completed)` / `publish(run.failed)` wołane `complete(runId)`. Snapshot `completed` \| `failed` → `of(snapshot)` i complete, **bez** `subscribe` na hubie.

**DoD (krok):**

- Transition do `completed`/`failed` kończy hub po evencie terminalnym.
- Transition do `awaiting_hitl` / `interrupted` nie kończy huba (zgodność z Fazą 7 / 7.2).
- Late-join na skończonym runie nie alokuje subjectu na zawsze.
- Worker / `appendLog` bez zmian semantyki (kolejność: logi, potem terminal + `complete`).

### Krok 8.3 — Testy D-14

**Status:** `WYKONANY`

**Opis:** Pokrycie `SPEC-TESTY.md` D-14. Refaktor względem: testów controllera SSE i e2e lifecycle z Fazy 3 / Kroku 3.2 (`WYKONANY`) — e2e zrywa połączenie po pierwszym `run.status` i nie asertuje końca streamu ani rozmiaru mapy.

**DoD (krok):**

- Unit: lifecycle woła `complete` tylko po `completed`/`failed`.
- Unit: controller przy snapshotcie terminalnym nie woła `subscribe`.
- E2E (lub integration HTTP): `GET .../events` na skończonym runie emituje `run.status` i **kończy** response (`end`), bez timeoutu na otwartym sockecie.
- Istniejące e2e live `run.status` na nieskończonym jeszcze przebiegu nie są psute.

### Krok 8.4 — Heartbeat keep-alive i TTL Subject

**Status:** `WYKONANY`

**Opis:** Rozszerzenie względem: Krok 8.1 (`WYKONANY`) — `InMemoryRunSseHub.subjectFor` bez TTL automatu; Krok 8.2 (`WYKONANY`) — `RunsController.events` bez heartbeat merge. Cel: (1) Subject otworzony przez `subscribe()` jest domykany z błędem po `RUN_SSE_SUBJECT_TTL_MS`, gdy run nigdy nie dobiegnie do stanu terminalnego (hung/crashed worker); (2) live Observable mergowany ze strumieniem heartbeat co `SSE_HEARTBEAT_MS` — zapobiega ciszy TCP i reconnectowi klienta, który skutkowałby nowym Subject w hubie; (3) `startWith` w `events()` używa odczytu `latest` (drugi `getRun.execute`), nie `snapshot` (starszy odczyt guard-terminalu).  
Źródło normy: `SPEC-RUNY.md` R-4a (TTL + heartbeat), `SPEC-KOMUNIKACJA.md` K-3b (heartbeat + latest snapshot), `docs/dokumentacja_komunikacji.md` (kontrakt heartbeat dla klienta).

**DoD (krok):**

- `env.schema.ts` zawiera `RUN_SSE_SUBJECT_TTL_MS` (default `600_000`) i `SSE_HEARTBEAT_MS` (default `25_000`) z walidacją Zod i wstrzyknięciem przez `ENV` token.
- `InMemoryRunSseHub` wstrzykuje `Env`; `subjectFor` uruchamia timer TTL z `timer.unref()`; drugi `complete` = no-op (idempotentność zachowana z Kroku 8.1).
- `RunsController.events` merguje live Observable z `interval(SSE_HEARTBEAT_MS)` emitującym `{ type: 'heartbeat', data: '' }`.
- `startWith` w `events()` używa obiektu `latestEvent` (z drugiego `getRun.execute`), nie `snapshotEvent`.
- Unit: TTL Subject zamyka strumień po upływie czasu i usuwa wpis z mapy; idempotentność zachowana.
- Unit: heartbeat nie pojawia się w ścieżce `of(...)` (snapshot terminalny) — tylko w live merge.

---

## Mapa odwołań (lekka)

| Obszar | Docs / SPEC |
|--------|-------------|
| Drzewo monorepo | `docs/architektura_katalogi_pliki.md`, `SPEC-MONOREPO.md` |
| Brand types | `docs/brand_types.md` |
| Frontend (tylko boilerplate tu) | `SPEC-FRONTEND.md`, `docs/ux_dashboard.md` (ekrany = później) |
| Persistence MVP | `SPEC-PERSISTENCE.md` |
| HTTP / SSE / gateway / lista runów / auth probe / feedback | `docs/dokumentacja_komunikacji.md`, `SPEC-KOMUNIKACJA.md` |
| Bezpieczeństwo / env / bootstrap /me | `docs/security.md`, `SPEC-BEZPIECZENSTWO.md`, `SPEC-AUTH.md` |
| Kontekst firmy | `SPEC-KONTEKST-FIRMY.md`, `docs/dokumentacja_koncepcyjna.md` |
| Runy / logi / listing / przegląd (ocena, edycja) / `interrupted` / cykl życia SSE | `SPEC-RUNY.md` (w tym R-4a), `SPEC-KOMUNIKACJA.md` (K-3a, K-3b), `docs/observability.md`, `docs/data_flow.md` (recovery), `docs/dokumentacja_komunikacji.md` |
| Opinie tekstowe | `SPEC-FEEDBACK.md` |
| Social | `SPEC-SOCIAL.md`, `docs/data_flow.md` |
| Auth | `SPEC-AUTH.md` |
| Kolejność budowy | `docs/dokumentacja_koncepcyjna.md`, `content-chain_brief.md` |
