# Content Chain — major plan (backend)

**Zakres tego pliku:** fundament monorepo, boilerplate frontu (wyłącznie struktura i pakiety) oraz **backend** aż do zielonego pipeline’u SM i auth API.  
**Poza tym plikiem:** dashboard / feature FE (osobny major frontendowy), pełny Docker Compose / `production` (ewentualnie tylko roboczy compose pod backend — bez domknięcia produkcyjnego), eksport `.md` + checksum, PostgreSQL / faza V1 — rozbudowa, rozbudowa ops poza fundamentem metryk.

**Źródła:** `docs/`, `spec/SPEC-*.md`, `content-chain_brief.md` (kontekst kolejności budowy).  
**Kolejność priorytetów:** najpierw Milestone 4 (pipeline + Postman), potem Faza 5 (Auth) — zgodnie z order of attack w docs.

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

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Kanoniczna baza MVP, podstawowa powierzchnia HTTP api, droga do LLM wyłącznie przez gateway oraz **fundament** metryk procesu. Bez budowy pipeline’u SM i bez auth. Zgodnie z `SPEC-PERSISTENCE.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`, `docs/observability.md`.

**DoD (faza):**

- Api korzysta z kanonicznej bazy MVP (SQLite) przygotowanej pod BC z docs.
- Odpowiedzi błędów mają uzgodniony envelope; health jest obserwowalny.
- Smoke połączenia api → gateway przechodzi.
- Obecny jest wyłącznie **fundament** metryk ops api (bez rozbudowy alertów / pełnego ops).

### Krok 2.1 — Persistence MVP (fundament schematu)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Fundament zapisu kanonicznego pod auth, kontekst firmy, runy i wyniki SM — silnik MVP zgodnie z docs/SPEC; identyfikatory w postaci brandowanej. Bez cichego fallbacku z plików.

**DoD (krok):**

- Schema/migracje pod BC MVP są w miejscu ustalonym w docs (`apps/api` / persistence).
- Domain/shared nie zależą bezpośrednio od ORM.
- Baza jest gotowa jako źródło prawdy dla kolejnych BC (jeszcze bez pełnej logiki biznesowej).

### Krok 2.2 — Powierzchnia HTTP: envelope, health, startowe zabezpieczenia

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Stabilny kontrakt błędów i health oraz podstawy zabezpieczeń startu procesu (nagłówki / CORS wg normy) — bez pełnego auth. **Uwaga względem Fazy 1 / Kroku 1.4:** `@nestjs/config`, Pino/`nestjs-pino` i Swagger (`/docs`) mogą już być w api; ten krok **nie** instaluje ich od zera — dopina Helmet, CORS, envelope błędów, health oraz **fail-fast** krytycznych zmiennych env.

**DoD (krok):**

- Błędy HTTP api mają envelope zgodny z docs/`SPEC-KOMUNIKACJA.md`.
- Health odpowiada w sposób bezpieczny (bez wrażliwych danych).
- Fail-fast przy braku krytycznych zmiennych env jest egzekwowany dla api (i spójnie z normą gateway).

### Krok 2.3 — Port LLM i smoke z gateway

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Api woła modele wyłącznie przez port + adapter do lokalnego gateway; weryfikacja dymna połączenia. Zgodnie z granicą LLM w `docs/architektura.md` i `SPEC-KOMUNIKACJA.md`.

**DoD (krok):**

- Api nie woła vendorów LLM bezpośrednio.
- Smoke api → uruchomiony gateway kończy się sukcesem obserwowalnym (odpowiedź / log bez wycieku sekretów).
- Sekrety gateway nie pojawiają się w odpowiedziach publicznych api.

### Krok 2.4 — Fundament metryk ops api

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Minimalny fundament ekspozycji metryk procesu api — wyłącznie podstawa pod observability; **bez** rozbudowy ops, alertów ani mylenia z logami runu domenowego.

**DoD (krok):**

- Fundament metryk api jest dostępny zgodnie z kierunkiem `docs/observability.md` / `SPEC-BEZPIECZENSTWO.md`.
- Metryki nie zawierają sekretów ani treści promptów.
- Brak wymogu pełnego stacku monitoringu w tym majorze.

---

## MILESTONE 2 — Backend startowalny: kanoniczna DB + droga do LLM

**Opis:** Bramka po Fazie 2. Fundament runtime domknięty: wolno budować BC kontekstu i runów.

**DoD (milestone):**

- Faza 2 spełnia swoje DoD (lub `WYKONANY`).
- Kanoniczna DB MVP jest gotowa pod kolejne BC.
- Health i envelope działają; smoke api→gateway OK.
- Fundament metrics obecny; brak wycieku sekretów na powierzchniach publicznych.
- Akceptacja przejścia do Fazy 3.

---

## Faza 3 — Kontekst firmy i cykl życia runów

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Bramka kompletności kontekstu firmy oraz cykl życia async runu (statusy, logi w DB, SSE, lista kolekcji pod dashboard, wykonanie in-process) jako podstawa pod Social. Zgodnie z `SPEC-KONTEKST-FIRMY.md`, `SPEC-RUNY.md`, `docs/data_flow.md`, `docs/dokumentacja_komunikacji.md`.

**DoD (faza):**

- Kontekst firmy da się zapisać i odczytać; kompletność jest egzekwowana programowo.
- Start flow SM jest blokowany przy niekompletnym kontekście.
- Run ma dozwolone przejścia statusów, append-only logi w DB oraz live postęp przez SSE (GET = snapshot).
- Lista runów całej instancji jest dostępna przez API (paginacja, filtry, pola pod dashboard — w tym inicjator gdy znany).

### Krok 3.1 — BC Company Context

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Kanoniczny kontekst jednej firmy na instancję, werdykt kompletności sekcji bramki oraz blokada startu runów przy braku kompletności.

**DoD (krok):**

- Werdykt kompletności jest obserwowalny (flaga / brakujące sekcje) zgodnie z docs.
- Niekompletny kontekst skutkuje odrzuceniem startu runu w sposób zgodny z kontraktem (`CONTEXT_INCOMPLETE` / równoważny efekt z docs).
- Jakość merytoryczna treści pozostaje po stronie użytkownika; programowo egzekwowana jest kompletność wymaganych sekcji.

### Krok 3.2 — BC Runs (statusy, logi, SSE, in-process)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Utworzenie runu, polityka statusów, kanoniczne logi, emisja SSE oraz wykonanie workera w procesie api — bez osobnego always-on workera OS w MVP. Przy starcie zapisywane jest miejsce na inicjatora (`startedBy`) pod późniejsze auth.

**DoD (krok):**

- Niedozwolone przejście statusu jest odrzucane.
- Logi runu w DB pozwalają odtworzyć przebieg (append-only).
- Live postęp idzie SSE; snapshot dostępny osobno (w tym meta pod szczegóły UI).
- HTTP nie blokuje na cały długi przebieg LLM.

### Krok 3.3 — Lista runów instancji (paginacja i filtry)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Powierzchnia `GET /api/v1/runs` pod widok listy dashboardu: cała instancja, stała strona 10, sort `createdAt` desc, filtry status / taskType / platforma / userId, pozycje z `startedBy` (email jako identyfikator wyświetlany). Zgodnie z docs komunikacji i `SPEC-RUNY.md`.  
*(Dopisane względem wcześniejszej wersji Fazy 3: wcześniej tylko cykl pojedynczego runu bez listingu kolekcji.)*

**DoD (krok):**

- Lista zwraca runy całej instancji z polami wymaganymi przez docs (w tym `createdAt`, `startedBy` gdy znany).
- Paginacja działa ze stałym rozmiarem 10; najnowsze pierwsze.
- Filtry status, taskType, platform, userId działają zgodnie z kontraktem.
- Snapshot szczegółów runu jest spójny z danymi listy (gotowość pod nawigację lista → szczegóły w majorze FE).

---

## MILESTONE 3 — Bramka kontekstu i runy gotowe pod pipeline Social

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

## MILESTONE 5 — Backend w zakresie tego majoru domknięty

**Opis:** Bramka zamykająca ten plik (uzgodniony wyjątek „po ostatniej fazie”). Pipeline SM + auth API działają łącznie; frontend produktowy pozostaje poza planem.

**DoD (milestone):**

- Faza 5 spełnia swoje DoD (lub `WYKONANY`).
- Zielony pipeline (Milestone 4) nadal przechodzi przy poprawnej sesji / rolach.
- Auth jest w formie docelowej na api (`/me`, bootstrap-status, soft-delete); egzekucja uprawnień nie polega na UI.
- Lista runów + `startedBy` oraz probe sesji są gotowe jako kontrakt pod major frontendowy.
- Dashboard / feature FE, pełny compose production, eksport `.md`/checksum oraz PostgreSQL / V1 — rozbudowa pozostają **poza** tym major planem.
- Akceptacja domknięcia majoru backendowego (kolejny major: frontend produktowy — osobno).

---

## Mapa odwołań (lekka)

| Obszar | Docs / SPEC |
|--------|-------------|
| Drzewo monorepo | `docs/architektura_katalogi_pliki.md`, `SPEC-MONOREPO.md` |
| Brand types | `docs/brand_types.md` |
| Frontend (tylko boilerplate tu) | `SPEC-FRONTEND.md`, `docs/ux_dashboard.md` (ekrany = później) |
| Persistence MVP | `SPEC-PERSISTENCE.md` |
| HTTP / SSE / gateway / lista runów / auth probe | `docs/dokumentacja_komunikacji.md`, `SPEC-KOMUNIKACJA.md` |
| Bezpieczeństwo / env / bootstrap /me | `docs/security.md`, `SPEC-BEZPIECZENSTWO.md`, `SPEC-AUTH.md` |
| Kontekst firmy | `SPEC-KONTEKST-FIRMY.md`, `docs/dokumentacja_koncepcyjna.md` |
| Runy / logi / listing | `SPEC-RUNY.md`, `docs/observability.md` |
| Social | `SPEC-SOCIAL.md`, `docs/data_flow.md` |
| Auth | `SPEC-AUTH.md` |
| Kolejność budowy | `docs/dokumentacja_koncepcyjna.md`, `content-chain_brief.md` |
