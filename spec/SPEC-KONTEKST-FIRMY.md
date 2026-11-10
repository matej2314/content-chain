---
wersja: 9
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-11-10
---

# SPEC — Kontekst firmy

## Cel / zakres względem dokumentacji

Norma bounded contextu **Company Context** w `apps/api`: kanoniczny zapis kontekstu firmy w DB, bramka kompletności sekcji, authz edycji wyłącznie dla `admin`, typowane opcjonalne `extras`, oraz **seed-if-empty** (auto przy `DEMO_MODE` / DX) jako jawny zapis — bez overlay przy odczycie.

Uszczegóławia bramkę i sekcje z `docs/dokumentacja_koncepcyjna.md`, endpointy z `docs/dokumentacja_komunikacji.md`, ops seedu z `docs/deployment.md` / `docs/dictionary.md` oraz reguły ról z `docs/security.md` / `SPEC-AUTH.md`.

Zmiana względem wersji 8 / C-6 + „Nie wolno”: zakaz cichego fallbacku z plików przy odczycie. Od tej wersji **C-9**: dozwolony wyłącznie **jawny seed zapisu** (seed-if-empty) z fixture JSON; overlay przy GET nadal zakazany. Mechanizm: uniwersalny `SeedModule` / `SeedService` + `seedCompanyContext()` — nie „DemoSeed*”.

Zmiana względem wersji 5 / cel: milczenie o granicach względem sieci. Od tej wersji jawnie: `isComplete` / C-1…C-5 **bez** gateway; wskaźnik UX „Agenci aktywni” → `SPEC-FRONTEND.md` F-6.
Zmiana względem wersji 6 / C-4: `user` → 403 na zapis. Od tej wersji także `guest`; GET z `@AllowGuest`.
Zmiana względem wersji 7 / wiersz `audience` + C-1 / C-4: kompletność profilu = tylko niepusty `description`; brak normy unikalności `name`. Od tej wersji: **`name` + `description`** w bramce; unikalność `name` (trim, case-insensitive) przy zapisie → **400** `VALIDATION_FAILED` — `docs/dokumentacja_koncepcyjna.md`, `docs/dictionary.md`.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`): klasyczne warstwy Nest — controller → application → domain (reguła bramki) + porty → adapter Prisma. Bez LangGraph.

**Wyjątek względem stylu globalnego:** brak.

## Sekcje bramki (MVP)

Start **każdego** `POST /runs` (Social i Content) **oraz** udany PUT/PATCH kontekstu — dopiero gdy **wszystkie** sekcje spełniają minimalną kompletność (jakość merytoryczna po stronie admina; programowo: niepuste wymagane wartości). Niepusty string = `trim().length > 0`. `null` / `undefined` na wymaganym polu = niekompletne.

| Sekcja (klucz) | Minimalna treść (docs) | Kompletność w kodzie MVP |
|----------------|------------------------|---------------------------|
| `identity` (tożsamość) | Nazwa firmy + krótki opis / misja (1–3 zdania) | niepuste: `name` + `description` |
| `offer` (oferta) | ≥ 1 **kompletna** usługa: nazwa + opis + ≥ 1 korzyść; brak kalekich pozycji | `items.length ≥ 1` ∧ `items.every(isCompleteOfferItem)` |
| `voice` (głos SM) | Ton: jak mówimy / jak nie mówimy | niepuste: `weDo` + `weDont` |
| `cta` (CTA / kanały) | ≥ 1 CTA; każda pozycja z niepustą etykietą; `target` opcjonalny | `items.length ≥ 1` ∧ każdy `label` niepusty |
| `audience` (odbiorca) | ≥ 1 profil; każdy z niepustym **`name`** oraz **`description`** | `profiles.length ≥ 1` ∧ każdy profil: niepusty `name` ∧ niepusty `description` |

Kompletna usługa (`isCompleteOfferItem`): niepuste `name`, `description` oraz `benefit` z ≥ 1 niepustym stringiem **i** bez pustych wpisów w tablicy.

Kompletny profil odbiorcy (`isCompleteAudienceProfile`): niepuste `name` **oraz** niepuste `description` (trim). Katalog = biblioteka pod select przy starcie runu; **nie** jest automatycznie wstrzykiwany w całości do payloadu LLM (`SPEC-SOCIAL.md` / `SPEC-CONTENT.md`).

Zmiana względem wersji 4 / wiersz `offer`: kompletność oferty = `.some` (jedna pozycja z nazwą i korzyścią; `description` **poza** minimum; kalekie rodzeństwo legalne w JSON). Od tej wersji `every` + `description` w minimum — zgodnie z `docs/dokumentacja_koncepcyjna.md`.

Zmiana względem wersji 7 / wiersz `audience`: kompletność = wyłącznie niepusty `description`. Od tej wersji **`name` + `description`** — zgodnie z `docs/dokumentacja_koncepcyjna.md`.

**Poza bramką — `CompanyContextExtras` (`extras`):** opcjonalny typowany obiekt:

| Pole | Kształt |
|------|---------|
| `caseStudies?` | `{ title: string; summary: string; metrics?: string[] }[]` |
| `objections?` | `{ label: string; response: string }[]` |
| `hashtags?` | `string[]` |
| `catalogNotes?` | `string` |
| `performanceNotes?` | `string` |

Zmiana względem wersji 2: wcześniejsza reguła „opcjonalne poza bramką (case studies…)” bez nazwanego kształtu — od tej wersji kanon = typowane `extras` + Zod `.strict()`; **nie** wchodzą do `missing` / C-1.

## Wymagania (egzekwowalne)

C-1. W domain istnieje czysta funkcja (lub równoważny serwis domenowy bez I/O):

`isComplete(context) → { complete: boolean, missing: string[] }`

`missing` zawiera klucze niespełnionych sekcji bramki. Funkcja jest unit-testowalna bez DB/HTTP. **`extras` nie wpływają** na `complete` / `missing`. **`isComplete` nie obejmuje** sieci, procesu gateway ani konfiguracji LLM — probe / `gatewayAlive` = `SPEC-KOMUNIKACJA.md` K-10 + wskaźnik UX `SPEC-FRONTEND.md` F-6.

Predykat oferty: `items.length ≥ 1` ∧ `items.every(isCompleteOfferItem)`; kompletna usługa = niepuste `name`, `description`, `benefit` (bez pustych stringów i z ≥ 1 wpisem).

Predykat audience: `profiles.length ≥ 1` ∧ `profiles.every(isCompleteAudienceProfile)`; kompletny profil = niepuste `name` **i** `description`. `collectGateItemPaths` (lub równoważnik w `details` przy 400): ścieżki m.in. `audience.profiles.{i}.name`, `audience.profiles.{i}.description` (jak `offer.items.{i}.*`).

Zmiana względem wersji 5 / C-1: milczenie o sieci. Od tej wersji jawny zakaz doklejania gateway do werdyktu domenowego.

Zmiana względem wersji 7 / C-1: `isCompleteAudienceProfile` = tylko `description`. Od tej wersji także niepusty `name`; ścieżki gate obejmują `audience.profiles.{i}.name`.

C-2. `GET /api/v1/company-context` zwraca aktualny kontekst (w tym `extras`: obiekt albo `null`) + informację o kompletności (flaga / obiekt spójny z docs). Pusta instancja (same `""` / `[]`) jest legalnym odczytem. Trasa **dozwolona** dla `guest` (`@AllowGuest`, read-only).

C-3. `GET /api/v1/company-context/completeness` zwraca `{ complete, missing }` — ten sam werdykt co C-1. Odczyt **także** dla `guest`.

C-4. Zapis kontekstu: **`PUT` oraz `PATCH`** `/api/v1/company-context` w MVP — **tylko `admin`**. `user` **oraz** `guest` → `403` `FORBIDDEN`. Body może zawierać `extras`; nieznane klucze w `extras` → **400** `VALIDATION_FAILED` (Zod `.strict()` przez wspólny `parseWithZod` z `apps/api/src/shared/parse-with-zod.ts` — nie lokalna kopia w module).

Poza authz i Zod extras: **PUT i PATCH zapisują wyłącznie gdy `isComplete(wynik).complete === true`**. PUT: `wynik` = zmapowane body. PATCH: werdykt na **merge** z aktualnym stanem w DB. Niekompletny wynik (w tym kaleka / pusta oferta, pusta nazwa firmy, profil bez `name` / z pustym `name`) → **400** `VALIDATION_FAILED`, `details` z brakującymi sekcjami i/lub ścieżkami pozycji (np. `offer.items.1.description`, `audience.profiles.0.name`); **brak** `put` / upsert. **Nie** reuse `409` `CONTEXT_INCOMPLETE` na zapisie (ten kod zostaje na C-5).

Dodatkowo (poza `missing` sekcji): **unikalność `audience.profiles[].name`** — po `trim`, porównanie **case-insensitive**; dwa profile z tą samą nazwą (różniącą się tylko wielkością liter) → **400** `VALIDATION_FAILED` (jak inne błędy zapisu); **brak** persist. Unikalność **nie** jest osobnym kluczem w `missing` C-1 — to twarda reguła zapisu w domain / application przed `put`.

Zmiana względem wersji 4 / C-4: zapis był **niezależny od kompletności** bramki (`isComplete` informował GET i blokował wyłącznie `POST /runs`). Od tej wersji udany persist wymaga `complete === true`. Stara reguła („zapis niezależny od kompletności”) **unieważniona**. Walidacja extras / helper `parseWithZod` (v3) **bez zmiany sensu**.

Zmiana względem wersji 3 / C-4: walidacja extras przez wspólny helper api shared (refaktor względem lokalnej kopii w `company-context/application/`).

Zmiana względem wersji 7 / C-4: brak normy unikalności nazw profili. Od tej wersji kolizja `name` (trim, case-insensitive) → **400** `VALIDATION_FAILED`.

C-5. Start runu (`POST /api/v1/runs`) w `apps/api` **musi** sprawdzić bramkę — **każdy** taskType (post_*, reel_*, page_*); przy `complete === false` → `409` `CONTEXT_INCOMPLETE` z `details` (np. brakujące sekcje). UI nie jest jedyną bramką. Jedna bramka na cały produkt (w tym głos SM dla page_* — świadome).

Zmiana względem wersji 1: C-5 mówił „start runu SM”; teraz każdy `POST /runs`.

C-6. Jedna instalacja = **jeden** kanoniczny kontekst firmy w DB. **Zakaz** cichego odczytu / overlay z plików (`.md` / JSON fixture) przy `GET` / completeness gdy DB pusta lub niespójna — kanon odczytu = wyłącznie DB.

**Zmiana względem** wcześniejszej formy C-6 („brak cichego odczytu / fallbacku z plików `.md`”): zakaz **nadal** dotyczy **overlay przy odczycie**; **nie** wyklucza jawnego seedu **zapisu** opisanego w C-9.

C-7. Model persistence: **osobne kolumny (lub równoważne pola zmapowane 1:1) per sekcja bramki** — nie jeden nieprzezroczysty blob JSON jako jedyny nośnik sekcji wymaganych. `extras`: kolumna Prisma **`Json?`** (lub równoważne); walidacja kształtu w application Zod przy PUT/PATCH — **nie** osobne tabele per case study w tym wycinku.

C-8. Preferencja pustych danych: omit / `null` na całym `extras`, gdy brak danych (nie obowiązkowe puste tablice).

C-9. **Seed kontekstu (seed-if-empty).** Wolno **zapisać** singleton kontekstu z fixture JSON o kształcie `CompanyContext` (kontrakt PUT) **wyłącznie** gdy kontekst jest **pusty**. „Pusty” = równoważny `emptyCompanyContext()` / legalnemu pustemu odczytowi C-2 (same `""` / `[]` / `extras=null`), także gdy wiersz singletonu już istnieje. Gdy kontekst **niepusty** → **no-op** (brak overwrite; **zakaz** force).

- **Auto:** przy starcie procesu api, wyłącznie gdy `DEMO_MODE=true`.
- **DX:** wywołanie `SeedService.seedCompanyContext()` (lub kanoniczna komenda `seed:company-context`) — **bez** wymogu `DEMO_MODE`, **bez** ustawiania flagi.
- Fixture musi spełnić **ten sam** warunek zapisu co udany PUT (C-4: `isComplete(wynik).complete === true` + unikalność audience itd.). Inaczej: **brak** zapisu / fail-fast ścieżki seedu — **bez** cichego częściowego stanu w DB.
- Zapis idzie przez warstwę domenową / ten sam port co udany PUT (nie surowy SQL/Prisma omijający bramkę).
- Mechanizm strukturalny (bez HOW): uniwersalny `SeedModule` / `SeedService` w `apps/api` (nie-BC jak `health/` / `llm/`); metoda `seedCompanyContext()` — **zakaz** brandu „Demo*” w nazwie modułu/serwisu. Semantyka demo = warunek przy wołaniu metody, nie nazwa typu.

`DEMO_MODE` poza seedem (guest / Redis / `GET /config`) — **bez zmian** w tym SPEC.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/company-context/
├── company-context.module.ts
├── company-context.controller.ts
├── application/                 # get, put, patch, completeness; Zod extras
├── domain/                      # isComplete, typy sekcji + CompanyContextExtras, port persistence
└── infrastructure/              # adapter Prisma
```

| Element | Norma |
|---------|--------|
| Bramka | reguła w **domain**; application orkiestruje odczyt, werdykt **przed** persist PUT/PATCH oraz guard startu runu |
| Walidacja kompletności MVP | pozytywna = **niepuste** wymagane wartości (bez NLP / scoringu jakości); oferta = `every` + `description` |
| `extras` | typowany obiekt; Zod `.strict()`; poza `isComplete` i poza warunkiem persist |
| HTTP zapis | PUT (pełna aktualizacja uzgodnionych pól) **i** PATCH (częściowa); persist **tylko** gdy `complete === true` |
| Authz | `JwtAuthGuard` + `RolesGuard` (`admin` na zapis) + `GuestGuard` (`@AllowGuest` na GET) |
| Odczyt | `admin`, `user` i `guest` (read-only dla `user`/`guest`) |

### Wolno

- Trzymać `extras` w DB bez wpływu na `complete`.
- Zwracać w GET status kompletności per sekcja bramki (wygodne dla UI).
- Współdzielić **tę samą** `isComplete` między GET completeness, PUT/PATCH (werdykt przed persist) a guardem startu runu (ten sam kod domenowy).
- Omit / `null` całego `extras` gdy brak danych.
- Jawny seed-if-empty (C-9): auto przy `DEMO_MODE=true` oraz DX `seed:company-context` / `seedCompanyContext()` — zapis kompletnego fixture przez warstwę domenową.

### Nie wolno

- Pozwalać `user` **ani** `guest` na PUT/PATCH kontekstu.
- Egzekwować kompletność **tylko** w `apps/frontend`.
- Cicho stripować kalekie `offer.items` w adapterze / use-case (kaleka pozycja → 400, nie `filter`).
- Traktować profil audience bez `name` / z pustym `name` jako kompletny; zapisywać katalog z zduplikowanymi `name` (case-insensitive po trim).
- Startować runa w api bez sprawdzenia bramki.
- Cichego fallbacku / overlay kontekstu z `.md` / plików przy **odczycie** (GET / completeness) przy pustej lub niespójnej DB — **zmiana względem:** wcześniejszy zakaz „cichego fallbacku z plików” pozostaje dla odczytu; dozwolony jest wyłącznie jawny seed **zapisu** (C-9).
- Force overwrite niepustego kontekstu seedem; częściowego zapisu fixture omijającego C-4.
- Brandować moduł/serwis seedu jako „Demo*” (obowiązuje `SeedModule` / `SeedService`).
- Umieszczać regułę bramki w controllerze lub w grafie Social / Content (graf **odczytuje** kompletny kontekst; decyzja „czy wolno zapisać” = use-case PUT/PATCH; „czy wolno startować” = use-case startu runu — przed grafem).
- Traktować jakość copy kontekstu jako warunek programowy MVP (tylko niepustość wymaganych pól).
- Traktować `extras` jako warunek startu runu / wpis do `missing`.
- Doklejać stan sieci / `gatewayAlive` / wynik `/health/ready` do `isComplete`, `missing`, C-3 albo C-5 (probe = ops health; chip UX = `SPEC-FRONTEND.md` F-6).
- Równoległego „unknown bag” obok znanego kształtu `extras`.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Warstwy Nest + port/adapter Prisma | obowiązkowe (jak pozostałe BC poza Social graph) |
| Domenowa `isComplete` bez I/O | obowiązkowe |
| PUT + PATCH w MVP | obowiązkowe |
| Kolumny per sekcja bramki | obowiązkowe |
| `extras` Json + Zod `.strict()` | obowiązkowe |
| Eksport `.md` / checksum | poza MVP (tuż po — docs) |
| Osobne tabele case_studies | poza tym wycinkiem |

## Kryteria akceptacji

- [ ] Unit test: niekompletny kontekst → `complete: false` + poprawne `missing`; kompletny → `complete: true`, `missing: []`; obecność `extras` nie zmienia werdyktu.
- [ ] Unit: kaleka oferta (brak opisu / pusta korzyść / druga niepełna pozycja / whitespace) → `missing` zawiera `offer`.
- [ ] Unit: profil bez `name` / z pustym `name` → `missing` zawiera `audience`; `collectGateItemPaths` niesie `audience.profiles.{i}.name`.
- [ ] Unit / HTTP: dwa profile z `name` różniącymi się tylko wielkością liter → **400** `VALIDATION_FAILED` (brak persist).
- [ ] Unit parse Zod `extras` (znany kształt OK; nieznany klucz → fail).
- [ ] `user` **i** `guest` nie zapiszą kontekstu (`FORBIDDEN`); `admin` tak — **tylko** przy kompletnej bramce.
- [ ] `GET .../completeness` zgodne z `isComplete`.
- [ ] `POST /runs` przy niekompletności → `409` `CONTEXT_INCOMPLETE` (bez utworzenia przebiegu LLM).
- [ ] HTTP: PUT/PATCH niekompletnej bramki → **400** `VALIDATION_FAILED`; GET bez zmiany (brak upsert).
- [ ] Schema ma pola/kolumny per sekcja bramki; `extras` Json opcjonalne nie blokują `complete`.
- [ ] E2e / HTTP: PUT z hashtagami / case study → round-trip w GET (**przy kompletnym** body bramki).
- [ ] Brak ścieżki runtime czytającej kontekst z `.md` / fixture zamiast DB (GET).
- [ ] Seed-if-empty (C-9): pusty + auto/`seedCompanyContext` → zapis kompletnego fixture; niepusty → no-op; niekompletny fixture → brak częściowego stanu.

## Poza zakresem

- Formularze UI / wskaźnik produktowy **„Agenci aktywni”** (`agentsActive` = completeness ∧ `gatewayAlive`) → `SPEC-FRONTEND.md` F-6.
- Probe liveness gateway / `GET /api/v1/health/ready` → `SPEC-KOMUNIKACJA.md` K-10.
- Eksport kontekstu do `.md` + checksum.
- Treść promptów i ConsistencyVerifier (użycie kontekstu / extras jako wejścia) → `SPEC-SOCIAL.md` / `SPEC-CONTENT.md`.
- Szczegóły migracji Prisma → `SPEC-PERSISTENCE.md`.
- Semantyka guest / Redis / `GET /config` przy `DEMO_MODE` → `SPEC-AUTH.md` / `SPEC-RUNY.md` (poza C-9).
