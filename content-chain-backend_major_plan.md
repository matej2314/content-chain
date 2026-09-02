# Content Chain — major plan (backend)

**Zakres tego pliku:** fundament monorepo, boilerplate frontu (wyłącznie struktura i pakiety) oraz **backend** aż do zielonego pipeline’u SM (Milestone 4), **dopełnienia Social o rolki (Faza 4.1)** i **BC Content + klej (Faza 4.2 / Milestone 4.2)**, auth API **oraz fundamentu zapisu feedbacku** (opinie, ocena runu, flaga edycji).  
**Poza tym plikiem:** dashboard / feature FE (osobny major frontendowy — w tym kontrolki zapisu opinii/gwiazdek wg `docs/ux_dashboard.md`), pełny Docker Compose / `production` (ewentualnie tylko roboczy compose pod backend — bez domknięcia produkcyjnego), eksport `.md` + checksum, PostgreSQL / faza V1 — rozbudowa (w tym **panel administracyjny** opinii / analityka), rozbudowa ops poza fundamentem metryk.

**Źródła:** `docs/`, `spec/SPEC-*.md` (w tym `SPEC-CONTENT.md`), `content-chain_brief.md` (kontekst kolejności budowy; kanały MVP nadpisane przez docs 2026-08-31).  
**Kolejność priorytetów:** Faza 7 (`WYKONANY`) i Faza 8 (`WYKONANY`) — **Faza 4** (`WYKONANY`) / Milestone 4 (`OSIĄGNIĘTY`), **Faza 4.1** (`WYKONANY`), potem **Faza 4.2** (Content + klej) / Milestone 4.2, potem Faza 5 (Auth), potem Faza 6 (fundament zapisu feedbacku). Faza 7 i Faza 8 nie mają własnego milestone’u. **Faza 9** (Zod 4 w `apps/api`) — **na samym końcu tego majoru**, dopiero po pełnym wdrożeniu Fazy 4, **4.1, 4.2**, 5 i 6 oraz osiągnięciu Milestone 4, **4.2**, 5–6; nie startować równolegle z pipeline’em / auth / feedbackiem.

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

**Status:** `WYKONANY`

**Opis:** Pierwszy slice produktowy backendu: post ideas i post content z weryfikacją względem kontekstu, zapisem wyników i czytelnych logów; LLM tylko przez gateway. Weryfikacja **obu** happy pathów Postmanem (bez UI). Zgodnie z `SPEC-SOCIAL.md`, `SPEC-RUNY.md` (porty lifecycle / executor, bez cyklu Nest), `docs/data_flow.md`, `docs/dokumentacja_koncepcyjna.md`, `docs/architektura.md` (zależności między BC).  
**Odblokowana po Fazie 7** (`WYKONANY`) **i Fazie 8** (`WYKONANY`): executor Social siada na grafie z `interrupted` i twardym capem claimu (`SPEC-RUNY.md` R-6 / R-9); hub SSE kończy strumień po `completed`/`failed` (`SPEC-RUNY.md` R-4a), zanim pipeline zacznie produkować runy.

**DoD (faza):**

- Pipeline SM działa za fasadą api (controller nie orkiestruje grafu ani promptów).
- Wyniki i werdykt weryfikacji trafiają do DB; logi runu są czytelne.
- Obie ścieżki Postman przechodzą: `post_ideas` (full-auto) oraz `post_ideas_then_content` z pauzą HITL.
- Graf Nest acykliczny: Social → port lifecycle Runs; `RUN_EXECUTOR` wiązany w kleju procesu; brak `forwardRef` Runs ↔ Social.

### Krok 4.1 — Fasada Social, orchestracja i prompty

**Status:** `WYKONANY`

**Opis:** Application fasada invoke fazy; orchestracja pipeline’u i szablony promptów za granicą HTTP — zgodnie z wyjątkiem Social w docs/SPEC. Dostarczone w feature planie KROK 1–6a (`WYKONANY`). Spięcie fasady jako `RUN_EXECUTOR` — Krok 4.2 / 4.5, nie ten krok.

**DoD (krok):**

- Fasada application i skompilowany graf istnieją; `graph.invoke` nie żyje w controllerze.
- Prompty i definicja pipeline’u nie żyją w controllerze ani we froncie/gateway.
- Structured output kroków jest walidowany przed kontynuacją (porażka ≠ cichy tekst do klienta).

### Krok 4.2 — Integracja z kontekstem, runami i gateway; wyniki

**Status:** `WYKONANY`

**Opis:** Spięcie Social z bramką kontekstu, cyklem runu, logami oraz gateway; zapis ideas/content i weryfikacja spójności z kontekstem firmy. Persistence store SM — feature KROK 7 (`WYKONANY`). Snapshot GET + executor — KROK 8–9 po KROK 7b (granice Nest).

**DoD (krok):**

- Start respektuje bramkę kontekstu i cykl życia runu.
- Start/wznowienie pipeline’u idzie wyłącznie przez fasadę aplikacyjną (worker → `RunExecutorPort` → Social).
- Wywołania LLM idą przez port/gateway; korelacja ID zgodna z `docs/brand_types.md`.
- Wynik (ideas/content) oraz efekt weryfikacji są dostępne przez api / DB.
- Limit refine po fail verifiera jest skończony (norma SPEC); brak nieskończonej pętli.
- Binding `RUN_EXECUTOR` w kleju (`AppModule` / `registerAsync`); Social woła `RunLifecyclePort`, nie klasę serwisu przez `forwardRef(RunsModule)`.
- Snapshot `result`/`hitl` przez port odczytu — **zakaz** `GetRunUseCase` wstrzykującego `SOCIAL_RESULT_STORE` dzięki `RunsModule imports SocialModule`.

### Krok 4.3 — Happy path Postman (obie ścieżki)

**Status:** `WYKONANY`

**Opis:** DoD pośredni z docs: weryfikacja bez UI. Obowiązkowo obie ścieżki: lista pomysłów full-auto oraz ideas → HITL → content.

**DoD (krok):**

- `post_ideas` kończy się sukcesem z listą pomysłów w DB i czytelnymi logami.
- `post_ideas_then_content` pauzuje na HITL, wznawia po wyborze i kończy treścią w DB.
- Scenariusze da się powtórzyć przez klienta HTTP (Postman) bez frontendu produktowego.

### Krok 4.4 — Korekty implementacyjne: `startedBy` w snapshotcie i `resolvePhase` z DB

**Status:** `WYKONANY`

**Opis:** Trzy punkty naprawcze zidentyfikowane w przeglądzie architektonicznym planu Fazy 4 (feature plan KROK 6a, KROK 8 i KROK 9). Punkt 3 (pusty `ideas` w ContentWriter) **już dostarczony** w feature KROK 6a (`WYKONANY`) — nie powtarzać. Punkty 1–2 zostają w KROK 8–9; snapshot **nie** wraca do `startedBy: run.startedBy` ani do wstrzyknięcia `SOCIAL_RESULT_STORE` przez import Social.

**1. `startedBy` w snapshotcie `GET /runs/:runId` — Opcja A**

Refaktor względem: Krok 3.2 (`WYKONANY`) — `RunRecord` posiada `startedByUserId: UserId | null`, bez pola `startedBy` jako obiektu. Refaktor `GetRunUseCase` z KROK 8 feature planu zawiera linię `startedBy: run.startedBy`, która zwróciłaby `undefined` w runtime (pole nie istnieje w `RunRecord`).

Korekta: mapowanie bezpośrednio z `startedByUserId`:

```typescript
startedBy: run.startedByUserId ?? null,
```

Snapshot zwraca `string | null` (surowe UserId lub brak inicjatora). Wzbogacenie do `{ id, email }` — dopiero Faza 5 / Krok 5.2, po domknięciu auth i dołączeniu User do odczytu RunRepository.

**2. `resolvePhase` z odczytem `pipelinePhase` z DB jako aktywny fallback**

Refaktor względem: feature plan KROK 9 (`SocialRunExecutor.resolvePhase`) — metoda derywuje fazę wyłącznie z `taskType` + `selectedIdeaIds`, ignorując pole `pipelinePhase` zapisane przez `savePipelineState` przed `facade.invokePhase`. Kolumna była write-only (obserwability); po korekcie staje się aktywnym fallbackiem recovery.

Korekta: `resolvePhase` przyjmuje `storedPhase: PipelinePhase | null` z `getPipelineState()` i używa go w pierwszej kolejności:

```typescript
private resolvePhase(run: RunRecord, storedPhase: PipelinePhase | null): PipelinePhase {
  if (storedPhase) return storedPhase;
  if (run.taskType === 'post_content') return 'content';
  if (
    run.taskType === 'post_ideas_then_content' &&
    run.selectedIdeaIds &&
    run.selectedIdeaIds.length > 0
  ) {
    return 'content';
  }
  return 'ideas';
}
```

Wywołanie w `execute`: `this.resolvePhase(run, pipeline.phase)` (gdzie `pipeline` pochodzi z `getPipelineState()`). Dla obecnych `taskType` wynik jest identyczny z poprzednią logiką, więc brak regresji. Kolumna `pipelinePhase` zapisana przed `invoke` jest aktywna w ścieżce recovery przy typach zadań dodanych w przyszłości.

**3. `ContentWriterAgent` dla `post_content` bez uprzedniego ideation (Opcja B)**

Refaktor względem: Krok 4.1 (`WYKONANY`) / feature plan KROK 5 (`WYKONANY`) — `content-writer.node.ts` przekazuje surowe `[]` do promptu gdy `post_content` startuje bez wcześniejszego ideation. LLM dostaje sprzeczny sygnał: instrukcja „na podstawie wybranych pomysłów" + pusta lista.

**Stan:** dostarczone w feature KROK 6a (`WYKONANY`). DoD poniżej dla tego punktu jest już spełnione.

Korekta (dwa artefakty):

- **`content-writer.node.ts`** — gdy `ideas.length === 0`, zamiast `JSON.stringify([])` przekazuje eksplicytny komunikat: `'[] — brak wybranych pomysłów; generuj post wyłącznie z brief.topic, brief.goal i kontekstu firmy'`
- **`content-writer.prompt.md`** — sekcja `## Zadanie` opisuje obie ścieżki: z pomysłami (zrealizuj hook/angle/title) i bez pomysłów (generuj z brief.topic i kontekstu); usuwa domyślne założenie o niepustej liście

Zgodne z oryginalnym projektem (`deprecated/…/post_content.prompt.md`): „Pomysł lub temat: [hook + opis LUB sam temat w zdaniu]" — brief bez pomysłu był zawsze poprawnym wejściem dla `post_content`.

**DoD (krok):**

- `GetRunUseCase` zwraca `startedBy: run.startedByUserId ?? null`; TypeScript kompiluje się bez błędów na tym polu.
- `SocialRunExecutor.resolvePhase` przyjmuje `storedPhase: PipelinePhase | null` i używa go jako pierwszeństwo przed logiką `taskType`/`selectedIdeaIds`.
- Wywołanie `resolvePhase(run, pipeline.phase)` jest aktualne w metodzie `execute`.
- `content-writer.node.ts` przekazuje eksplicytny string instrukcji gdy `ideas.length === 0`; JSON gdy niepuste.
- `content-writer.prompt.md` opisuje obie ścieżki bez ambigwitu.
- Testy D-4..D-10 oraz D-14 nie psują się po wszystkich zmianach; dodany unit test węzła dla przypadku `ideas = []`.

### Krok 4.5 — Granice Nest: port lifecycle i klej `RUN_EXECUTOR`

**Status:** `WYKONANY`

**Opis:** Refaktor względem: feature plan **KROK 7** (`WYKONANY`) — `RunsModule` importuje `forwardRef(() => SocialModule)` pod przyszły `SOCIAL_RESULT_STORE` w `GetRunUseCase`; oraz względem szkicu KROK 9 z wzajemnym `forwardRef`. Cel: acykliczny graf Nest zgodny z `docs/architektura.md` i `SPEC-RUNY.md` v7 / `SPEC-SOCIAL.md` v4. Social zostaje osobnym BC (kolejne grafy V1 bez złączania z Runs).

**Zakres:**

- Token `RunLifecyclePort` (`appendLog` + `transition`); graf/fasada/hop zależą od portu, nie od klasy `RunLifecycleService`.
- Usunąć `forwardRef` i import `SocialModule` z `RunsModule`.
- `SocialModule` importuje kernel/port lifecycle (nie pełny `RunsModule`).
- `RUN_EXECUTOR`: `AppModule` / `RunsModule.registerAsync` wpinające `SocialRunExecutor` (jedna implementacja; bez self-register).
- Snapshot `result`/`hitl`: port odczytu (reader), nie `imports: [SocialModule]` w Runs.

**DoD (krok):**

- `RunsModule` nie importuje `SocialModule`; `SocialModule` nie ma `forwardRef(RunsModule)`.
- Worker wstrzykuje `RUN_EXECUTOR` z kleju; stub nie jest produkcyjnym providerem po KROK 9.
- `GetRunUseCase` nie wstrzykuje `SOCIAL_RESULT_STORE` z importu Social.
- Testy Fazy 3 / 7 / 8 (w tym D-9, D-14) pozostają zielone po zdjęciu `forwardRef`.

---

## MILESTONE 4 — Zielony pipeline SM (dowód pośredni Postman)

**Status:** `OSIĄGNIĘTY`

**Opis:** Bramka po Fazie 4. Duży skok produktowy backendu: pipeline SM działa end-to-end bez UI. **Priorytet przed Auth.**

**DoD (milestone):**

- Faza 4 spełnia swoje DoD (lub `WYKONANY`).
- Obie ścieżki Postman (ideas oraz ideas→HITL→content) są zielone.
- Logi runu pozwalają odtworzyć przebieg; UI nie jest wymagane.
- Graf Nest Runs ↔ Social pozostaje acykliczny (Krok 4.5).
- Akceptacja przejścia do Fazy 5 (Auth).

---

## Faza 4.1 — Dopełnienie Social: rolki

**Status:** `WYKONANY`

**Opis:** Po Milestone 4 (`OSIĄGNIĘTY`); **nie zmienia Fazy 4**. Mapowanie rolek z `Proces_SM` na istniejący BC Social: ten sam graf, model B, verifier `max N=2`, worker, SSE. HTTP nadal Runs. Taski `reel_ideas`, `reel_script`, `reel_ideas_then_scripts`. Snapshot addytywny (`reelIdeas` / `reelScript`). **Bez** `apps/api/src/content/`, **bez** composite dwugrafowego (nadal jeden `SocialRunExecutor`). Źródło: `SPEC-SOCIAL.md` (od v6), `docs/data_flow.md` §4b–4c, `mvp_v1_range_plan.md`.

**Nota (po feature planie):** `feature-plans/content-chain_feature_plan_faza-4-1-rolki.md` (KROK 1–8 `WYKONANY` → major 4.1.1–4.1.4). Shared `reel_*`, domain/porty, Prisma, Zod 3 + prompty, węzły/graf/fasada, executor (`resolvePhase` jak żywy kod Fazy 4: `reel_script` / HITL+selekcja wymuszają `'content'` **przed** `storedPhase`), HTTP snapshot addytywny, e2e D-15/D-16 + Postman C/D. **MILESTONE 4.2 nie oznaczać** — wymaga Fazy 4.2 (`feature-plans/content-chain_feature_plan_faza-4-2-content.md`). Faza 4.2 pozostaje `NIE_ROZPOCZĘTY`.

**Kontrakty typów:** `RunTaskType` += trzy `reel_*` w shared (bez Zod w shared). Domain: `ReelIdea`, `ReelScript`, `ReelDurationSeconds` = `15 \| 30 \| 90` (unia, nie brand). Zod application: `reelIdeaSchema` / `reelScriptSchema`. Port reader: `listReelIdeas`, `getReelScript`. Prisma → domain przez `isRunTaskType`. tsconfig **bez zmian**.

**DoD (faza):**

- Trzy taski `reel_*` działają E2E (Jest fake LLM) i Postman (żywy gateway) — D-15, D-16.
- D-4/D-5 postów nadal zielone.
- `pnpm --filter api test` (unit) + e2e api zielone.
- Brak katalogu `apps/api/src/content/`.

### Krok 4.1.1 — Shared, Prisma, porty, domain Social

**Status:** `WYKONANY`

**Opis:** Enum `reel_*`; modele `SocialReelIdea` / `SocialReelScript` (append, P-7); port store i `RunResultReader` o sygnaturach reel; `PipelinePhase` zostaje `'ideas' \| 'content'`.

**DoD (krok):**

- Migracja w repo; tabele z `runId`, JSON payload, index `runId`.
- Port kompletny; unit nie wymaga DB.

### Krok 4.1.2 — Schemy Zod, prompty, węzły, graf, fasada, executor

**Status:** `WYKONANY`

**Opis:** Prompty `reel-*.prompt.md` / `refine-reel-*.prompt.md`; węzły ładują szablon po `taskType`; persist reel (dyskryminacja); `resolvePhase` analogicznie do postów (`reel_script` → `'content'`; HITL + selection → `'content'`); `storedPhase` pierwszym fallbackiem (jak Krok 4.4, bez edycji tamtego kroku). Fake LLM rozróżnia reel vs post.

**DoD (krok):**

- Structured output rolek walidowany; refine N=2.
- Executor: analogiczne testy do `social-run.executor.spec.ts` dla trzech `reel_*`.
- Fasada: HITL tylko `reel_ideas_then_scripts` w fazie ideas.

### Krok 4.1.3 — HTTP Runs: DTO, Zod startu, snapshot, lista

**Status:** `WYKONANY`

**Opis:** DTO/Zod przyjmują `reel_*`; `platform` nadal wymagane; snapshot addytywny; lista filtr `taskType=reel_ideas`; adapter Prisma mapuje `taskType` przez `isRunTaskType`.

**DoD (krok):**

- `POST /runs` z `reel_*` + `platform` → 202.
- Snapshot: `reelIdeas` / `reelScript`; posty: `ideas` / `content` jak Milestone 4.
- HITL: `selectedIdeaIds` z `reelIdeas`.

### Krok 4.1.4 — Testy unit, e2e, Postman

**Status:** `WYKONANY`

**Opis:** Unit (executor, fasada, schemy, persist, węzły promptów). E2E: D-15, D-16 + regresja D-4…D-8. Postman: foldery **C. reel_ideas**, **D. reel_ideas_then_scripts** w `social-pipeline.postman-collection.json`. `reel_script` solo — Jest, nie obowiązkowy Postman.

**DoD (krok):**

- Jest unit + e2e zielone.
- README Postman opisuje C/D; kolekcja importowalna.
- Milestone 4 A/B bez regresji.

---

## Faza 4.2 — BC Content + orkiestracja

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Po Fazie 4.1; **nie zmienia Fazy 4**. Drugi bounded context `apps/api/src/content/` (`page_copy`, `page_outline_then_copy`, `ContentKind`). Composite kleju w composition root (ręczny `switch` + `assertNever`). Testy, że Runs nie zna katalogu grafów. Źródło: `SPEC-CONTENT.md`, `SPEC-RUNY.md` (R-3d/e/f), `docs/architektura.md`.

**Kontrakty typów:** `RunTaskType` += `page_*`; `ContentKind` + `isContentKind`; `RunPlatform = SocialPlatform | 'web'` w shared (**nie** jako `SocialPlatform`). `StartRunCommand`: unia dyskryminowana TS + Zod `discriminatedUnion('taskType')`. `RunRecord` = `SocialRunRecord` | `ContentRunRecord` (`taskType` dyskryminuje `brief`). `SocialBrief` / `ContentBrief` w `runs/domain` — **zakaz** płaskiego `RunBrief` i definicji w `packages/shared` / `apps/api/src/shared/`. Odczyt JSON `Run.brief`: parse Zod wg `taskType` (nie `as`). Domain: `PageOutline`, `PageDocument`; faza `'outline' \| 'copy'`. Port `ContentResultStore` osobny. Zakaz `any`.

Dopisek (2026-09-02): brief kanałowy — `docs/dokumentacja_komunikacji.md`, `run_type_fixture_plan.md`. Refaktor Social (`SocialBrief`, fixture’y `makeSocialRun`) **przed** grafem Content (krok 4.2.1b / feature KROK 2b).

**Mapa etykiet → feature plan** (`content-chain_feature_plan_faza-4-2-content.md`). Obowiązuje ta kolejność, nie „wszystko walidacji w 4.2.1”:

| Major | Feature | Zakres |
|-------|---------|--------|
| 4.2.1 | KROK 1–2 | Shared enumy + Prisma Content. HTTP `page_*` **zamknięte**. |
| 4.2.1b | KROK 2b | Unia `RunRecord` + `SocialBrief` + `socialBriefSchema`. HTTP `page_*` nadal zamknięte. |
| 4.2.2 | KROK 3–5 | Domain Content, kernel hopu, graf/fasada/executor. |
| 4.2.3 | KROK 6 | Klej + Zod unia startu (`socialBriefSchema` / `contentBriefSchema`) + otwarcie HTTP `page_*` + snapshot `brief`. |
| 4.2.4 | KROK 7 | Unit / e2e D-17…D-19a / Postman Content / regresja Social. |

**DoD (faza):**

- `page_copy` i `page_outline_then_copy` zielone (Jest + Postman) — D-17, D-18.
- Posty i rolki bez regresji.
- Nieznany `taskType` w HTTP → `400` `VALIDATION_FAILED`; composite nie wołany.
- `UNKNOWN_TASK_TYPE` pokryty unitem composite.
- **D-19a:** page + `brief.ideaCount` → 400; Social + `brief.angle` → 400.
- Faza 9 **nie** startuje (Zod 3).

### Krok 4.2.1 — Shared, Prisma Content, `Run.contentKind`

**Status:** `NIE_ROZPOCZĘTY`

**Etykieta feature:** KROK 1–2.

**Opis:** Enumy; `Run.contentKind`; tabele `ContentOutline` / `ContentDocument`; na `Run` kolumny `outlineRefineCount` / `copyRefineCount` (default 0; **nie** reuse `ideasRefineCount` / `contentRefineCount`); sentinel `platform: 'web'` dla page_* w **schemacie** (zapis adaptera). **Nie** otwierać HTTP `page_*` i **nie** wstawiać tu Zod `discriminatedUnion` startu — to krok 4.2.3. Zmiana względem wcześniejszej etykiety tego kroku („walidacja startu” + oba briefy Zod): walidacja HTTP i `contentBriefSchema` są w 4.2.3, nie tutaj.

**DoD (krok):**

- Page run (persistencja): DB `platform='web'`, `contentKind` ustawione, gdy run page powstanie później przez HTTP (4.2.3).
- Social run: `contentKind` null, `platform` z enumu SM; kolumny refine Social bez zmian semantyki.
- Migracja dokłada `outlineRefineCount` / `copyRefineCount`; Content zapisuje refine wyłącznie tam (`SPEC-CONTENT.md` Ctn-10, `SPEC-PERSISTENCE.md` P-5).

### Krok 4.2.1b — Unia `RunRecord` + `SocialBrief`

**Status:** `NIE_ROZPOCZĘTY`

**Etykieta feature:** KROK 2b.

**Refaktor względem:** Faza 4 / żywy Social (`import type { RunBrief }`); feature KROK 2 (`WYKONANY` — płaski `RunBrief` na `RunRecord`).

**Opis:** `RunRecord` = `SocialRunRecord` \| `ContentRunRecord`; `SocialBrief` / `ContentBrief` w `runs/domain`; usunąć publiczny `RunBrief`. Social domain/state importuje `SocialBrief`. Fixture’y `makeSocialRun` / `makeContentRun` — **zakaz** `Partial<RunRecord>` i `makeRun` na unii. Zod: przemianować `runBriefSchema` → `socialBriefSchema`; command startu nadal wymaga `platform` (HTTP page zamknięte). **Zakaz** otwierania `page_*` i **zakaz** `contentBriefSchema` w HTTP do kroku 4.2.3.

**DoD (krok):**

- Kompilacja Social + Runs na unii; brak eksportu `RunBrief`.
- `startRunCommandSchema` nadal wymaga `platform`; e2e `page_*` nieotwarte.

### Krok 4.2.2 — Moduł `apps/api/src/content/` (graf podstawowy)

**Status:** `NIE_ROZPOCZĘTY`

**Etykieta feature:** KROK 3–5 (domain → kernel hopu → graf/fasada/executor).

**Opis:** Drzewo application / domain / infrastructure (graph, prompts, persistence). Węzły: `LoadContext`, `NormalizeBrief`, `OutlineAgent`, `PageWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`, `FailRun`. `compile()` bez checkpoinetera. Refine `max N=2` (polityka w `content/domain`, kopia Social). Hop LLM / `parseLlmJson` / loader promptów — `apps/api/src/shared/llm/` (osobna instancja `LlmHopService` w `ContentModule`; **nie** kopia klasy, **nie** import Social). `ContentModule` bez `controllers[]`; nie importuje Social/Runs (tylko port lifecycle). Domain Content: `brief: ContentBrief`. Wejście: krok 4.2.1b (`SocialBrief` / unia `RunRecord`) już zrobiony — **nie** importować `RunBrief`.

**DoD (krok):**

- Moduł eksportuje `ContentRunExecutor` + store.
- Unit fasady + executor analogiczne do Social.

### Krok 4.2.3 — Klej, Zod unia startu, otwarcie HTTP `page_*`

**Status:** `NIE_ROZPOCZĘTY`

**Etykieta feature:** KROK 6.

**Opis:** `run-dispatch.executor.ts` (nie `utils.ts`); composite reader; `registerAsync` inject obu executorów i store’ów; `GetRunUseCase` wypełnia `pageOutline` / `pageDocument` **oraz** `brief` w kształcie kanału (Social vs Content). Worker nadal jeden `RUN_EXECUTOR`. Recovery `interrupted` → właściwy BC po `taskType`. HITL page: `ResumeHitlUseCase` waliduje `selectedIdeaIds === [outline.id]` (400 `HITL_INVALID_SELECTION`). **Tu** (nie w 4.2.1): Zod `discriminatedUnion('taskType')` — page bez platform OK, page z `linkedin` → fail, post bez platform → fail; brief per gałąź `socialBriefSchema` vs `contentBriefSchema` (`.strict()`); page + `ideaCount` → 400; Social + `angle` → 400. Parse JSON `Run.brief` wg `taskType` (nie `as`). Zmiana względem wcześniejszej etykiety 4.2.1: walidacja startu i otwarcie `page_*` są tym krokiem.

**DoD (krok):**

- SocialModule nie importuje ContentModule; RunsModule nie importuje żadnego grafu.
- HITL page: `awaiting_hitl` + options z outline; resume tylko `[outline.id]`; obce id → 400, status bez zmian.
- Unit dispatchera: social vs content vs default.
- Unit Zod pokrywa unię taskType + D-19a (page/`ideaCount`, Social/`angle`).
- GET snapshot zwraca `brief` zgodny z `taskType`.

### Krok 4.2.4 — Testy unit, e2e, Postman Content, regresja Social

**Status:** `NIE_ROZPOCZĘTY`

**Etykieta feature:** KROK 7.

**Opis:** Unit domain/schemy/dispatcher/GetRun. E2E `content-pipeline.e2e-spec.ts` (D-17, D-18, refine, korelacja); lista `taskType=page_copy`, `platform=web`; start page + `linkedin` → 400. **D-19a:** page + `brief.ideaCount` → 400; Social + `brief.angle` → 400. Postman: `content-pipeline.postman-collection.json` (A/B); Setup = `PUT /company-context`. Body page **bez** `ideaCount`.

**DoD (krok):**

- Unit + e2e zielone.
- Postman Content + Social A–D opisane w README.

---

## MILESTONE 4.2 — Zespoły agentowe kompletne (podstawowa forma)

**Opis:** Bramka mapowania po Fazach 4.1 i 4.2. **Nie** mylić z Milestone 4 (posty) ani z publicznym MVP. Auth nadal Faza 5.

**DoD (milestone):**

- Faza 4.1 i 4.2 spełniają DoD (lub `WYKONANY`).
- Postman Social A–D + Content A–B zielone (żywy gateway).
- Jest e2e D-4, D-5, D-15…D-18, D-19a zielone (fake LLM).
- Klej: dwa BC, jeden worker; graf Nest acykliczny.
- Akceptacja przejścia do Fazy 5 (Auth).

---

## Faza 5 — Auth API (forma docelowa)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Auth w formie docelowej na api: bootstrap jednego admina (status + sesja po bootstrapie), sesja cookie, **`GET /auth/me`**, role, zarządzanie użytkownikami (lista/create + soft-delete w API), zabezpieczenie powierzchni kontekstu i runów oraz wypełnianie `startedBy` przy starcie. Zgodnie z `SPEC-AUTH.md`, `docs/security.md` — po zielonym pipeline (order of attack).  
Dopisek: **start po Fazie 4.2 / Milestone 4.2** (nie bezpośrednio po Milestone 4). DoD auth **bez** przepisu.

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
- Wzbogacenie snapshotu `startedBy` do `{ id, email }` zostaje w BC Runs (join User) — **bez** ponownego `imports: [SocialModule]` ani `forwardRef` z Fazy 4.

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
- BC Feedback i rozszerzenie snapshotu Runs **bez** `forwardRef` / importu `SocialModule` (granice z Kroku 4.5 zostają).

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
- `FeedbackModule` nie importuje `SocialModule` i nie tworzy `forwardRef` z Runs (Krok 4.5 zostaje).

### Krok 6.3 — Ocena, flaga edycji, finalize; snapshot

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** `PATCH .../rating`, `POST .../output-edited`, `POST .../finalize-review`. Snapshot `GET /runs/:runId` zgodny z docs (w tym `userRating` zawsze obecne). Flaga edycji nie nadpisuje payloadu SM. Pola przeglądu dokładane do istniejącego snapshotu Runs — **bez** importu `SocialModule` i bez wciągania feedbacku do grafu (`SPEC-RUNY.md`, Krok 4.5).

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

## Faza 9 — Refaktor `apps/api`: Zod 4 (zbieżnie z gateway)

**Status:** `NIE_ROZPOCZĘTY`

**Kiedy start:** **wyłącznie na końcu tego majoru** — po `WYKONANY` Fazy 4, **4.1, 4.2**, 5 i 6 oraz `OSIĄGNIĘTY` Milestone 4, **4.2**, 5 i 6. Fazy 7 i 8 są już `WYKONANY`. Zakaz startu tej fazy w trakcie pipeline’u Social / Content, auth albo fundamentu feedbacku. Schemy rolek i Content migrują na Zod 4 w tej fazie (świadomy koszt: 4.1/4.2 na Zod 3).

**Opis:** Refaktor względem: **Faza 1 / Krok 1.4** (`WYKONANY`) — Zod jako zależność walidacji application w `apps/api`; oraz świadomy pin **Zod 3** w `feature-plans/content-chain_feature_plan_faza-4-pipeline-social.md` (graf `z.object` / Interop Zod 3, **nie** Zod 4.x w tamtym wycinku). Cel: jedna linia Zod **4.4.x** w `apps/api` i `apps/ai-provider-gateway` (gateway ma `zod@^4.4.3`). Peer `@langchain/langgraph` (`zod@^3.25.32 || ^4.2.0`) obejmuje 4.4.x. Docs/SPEC wymagają Zod w application, **bez** pinu major — `packages/shared` nadal bez Zod.

**Poza zakresem tej fazy:** migracja grafu Social na `StateSchema` LangGraph (osobna decyzja po zielonym Zod 4); zmiana kontraktu HTTP; Zod w `packages/shared`.

**Bez MILESTONE 9** — ujednolicenie zależności, nie skok produktowy.

**DoD (faza):**

- `apps/api` zależy od `zod@^4.4.x` (ta sama linia co gateway).
- Schemy application / env / structured output LLM kompilują się i zachowują semantykę S-3 (porażka parse ≠ cichy tekst).
- `pnpm --filter api test` oraz istniejące e2e api przechodzą (w tym walidacja env i komend).
- Graf Social nadal działa (`z.object` albo późniejszy `StateSchema` — nie wymóg tej fazy).
- Brak Zod w `packages/shared`.

### Krok 9.1 — Bump Zod w api i korekta typów / schematów

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Podnieść `apps/api` do `zod@^4.4.x`. Dostosować API Zod 3→4 w plikach, które importują `zod` (m.in. `env.schema.ts`, `parse-with-zod.ts`, `parse-llm-json.ts`, `run.schemas.ts`, `social.schemas.ts`, stan grafu). Wzorzec użycia: `apps/ai-provider-gateway`.

**DoD (krok):**

- `apps/api/package.json` + lockfile: Zod 4.4.x; brak Zod 3 w drzewie api.
- TypeScript api kompiluje się (m.in. `ZodTypeAny` / kody `addIssue`).
- `validateEnv` i parse komend / LLM nadal rzucają te same kody domenowe (`VALIDATION_FAILED`, `STRUCTURED_OUTPUT_INVALID`).

### Krok 9.2 — Testy regresji walidacji

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Zielone testy po bumpie — w szczególności `.default([])` vs `null` w structured output oraz `env.schema` (`CORS_ORIGIN` w production).

**DoD (krok):**

- Unit schematów Social / Runs / env przechodzą na Zod 4.
- E2E api, które polegają na walidacji Zod, bez regresji.
- Gateway pozostaje na swojej 4.4.x bez zmian w tej fazie (chyba że lockfile workspace wymaga spójnego bumpa — bez obniżania gateway do 3).

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
| Social (posty i rolki) | `SPEC-SOCIAL.md`, `docs/data_flow.md` |
| Content (BC) | `SPEC-CONTENT.md`, `docs/architektura.md` |
| Klej composite | `SPEC-RUNY.md` (R-3d/e), `docs/architektura.md` |
| Zod (api vs gateway) | `SPEC-KOMUNIKACJA.md` (Zod w application, bez pinu major); Faza 9 — `zod@^4.4.x` w `apps/api` jak `apps/ai-provider-gateway` |
| Auth | `SPEC-AUTH.md` |
| Kolejność budowy | `docs/dokumentacja_koncepcyjna.md`, `content-chain_brief.md` |
