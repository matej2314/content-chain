---
wersja: 5
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-18
---

# SPEC — Kontekst firmy

## Cel / zakres względem dokumentacji

Norma bounded contextu **Company Context** w `apps/api`: kanoniczny zapis kontekstu firmy w DB, bramka kompletności sekcji, authz edycji wyłącznie dla `admin`, typowane opcjonalne `extras`.

Uszczegóławia bramkę i sekcje z `docs/dokumentacja_koncepcyjna.md`, endpointy z `docs/dokumentacja_komunikacji.md` oraz reguły ról z `docs/security.md` / `SPEC-AUTH.md`.

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
| `audience` (odbiorca) | ≥ 1 profil; każdy z niepustym opisem | `profiles.length ≥ 1` ∧ każdy `description` niepusty |

Kompletna usługa (`isCompleteOfferItem`): niepuste `name`, `description` oraz `benefit` z ≥ 1 niepustym stringiem **i** bez pustych wpisów w tablicy.

Zmiana względem wersji 4 / wiersz `offer`: kompletność oferty = `.some` (jedna pozycja z nazwą i korzyścią; `description` **poza** minimum; kalekie rodzeństwo legalne w JSON). Od tej wersji `every` + `description` w minimum — zgodnie z `docs/dokumentacja_koncepcyjna.md`.

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

`missing` zawiera klucze niespełnionych sekcji bramki. Funkcja jest unit-testowalna bez DB/HTTP. **`extras` nie wpływają** na `complete` / `missing`.

Predykat oferty: `items.length ≥ 1` ∧ `items.every(isCompleteOfferItem)`; kompletna usługa = niepuste `name`, `description`, `benefit` (bez pustych stringów i z ≥ 1 wpisem).

C-2. `GET /api/v1/company-context` zwraca aktualny kontekst (w tym `extras`: obiekt albo `null`) + informację o kompletności (flaga / obiekt spójny z docs). Pusta instancja (same `""` / `[]`) jest legalnym odczytem.

C-3. `GET /api/v1/company-context/completeness` zwraca `{ complete, missing }` — ten sam werdykt co C-1.

C-4. Zapis kontekstu: **`PUT` oraz `PATCH`** `/api/v1/company-context` w MVP — **tylko `admin`**. `user` → `403` `FORBIDDEN`. Body może zawierać `extras`; nieznane klucze w `extras` → **400** `VALIDATION_FAILED` (Zod `.strict()` przez wspólny `parseWithZod` z `apps/api/src/shared/parse-with-zod.ts` — nie lokalna kopia w module).

Poza authz i Zod extras: **PUT i PATCH zapisują wyłącznie gdy `isComplete(wynik).complete === true`**. PUT: `wynik` = zmapowane body. PATCH: werdykt na **merge** z aktualnym stanem w DB. Niekompletny wynik (w tym kaleka / pusta oferta, pusta nazwa firmy) → **400** `VALIDATION_FAILED`, `details` z brakującymi sekcjami i/lub ścieżkami pozycji (np. `offer.items.1.description`); **brak** `put` / upsert. **Nie** reuse `409` `CONTEXT_INCOMPLETE` na zapisie (ten kod zostaje na C-5).

Zmiana względem wersji 4 / C-4: zapis był **niezależny od kompletności** bramki (`isComplete` informował GET i blokował wyłącznie `POST /runs`). Od tej wersji udany persist wymaga `complete === true`. Stara reguła („zapis niezależny od kompletności”) **unieważniona**. Walidacja extras / helper `parseWithZod` (v3) **bez zmiany sensu**.

Zmiana względem wersji 3 / C-4: walidacja extras przez wspólny helper api shared (refaktor względem lokalnej kopii w `company-context/application/`).

C-5. Start runu (`POST /api/v1/runs`) w `apps/api` **musi** sprawdzić bramkę — **każdy** taskType (post_*, reel_*, page_*); przy `complete === false` → `409` `CONTEXT_INCOMPLETE` z `details` (np. brakujące sekcje). UI nie jest jedyną bramką. Jedna bramka na cały produkt (w tym głos SM dla page_* — świadome).

Zmiana względem wersji 1: C-5 mówił „start runu SM”; teraz każdy `POST /runs`.

C-6. Jedna instalacja = **jeden** kanoniczny kontekst firmy w DB. Brak cichego odczytu / fallbacku z plików `.md` w runtime.

C-7. Model persistence: **osobne kolumny (lub równoważne pola zmapowane 1:1) per sekcja bramki** — nie jeden nieprzezroczysty blob JSON jako jedyny nośnik sekcji wymaganych. `extras`: kolumna Prisma **`Json?`** (lub równoważne); walidacja kształtu w application Zod przy PUT/PATCH — **nie** osobne tabele per case study w tym wycinku.

C-8. Preferencja pustych danych: omit / `null` na całym `extras`, gdy brak danych (nie obowiązkowe puste tablice).

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
| Authz | `JwtAuthGuard` + `RolesGuard` (`admin` na zapis) |
| Odczyt | `admin` i `user` (oba mogą czytać / używać przy runach) |

### Wolno

- Trzymać `extras` w DB bez wpływu na `complete`.
- Zwracać w GET status kompletności per sekcja bramki (wygodne dla UI).
- Współdzielić **tę samą** `isComplete` między GET completeness, PUT/PATCH (werdykt przed persist) a guardem startu runu (ten sam kod domenowy).
- Omit / `null` całego `extras` gdy brak danych.

### Nie wolno

- Pozwalać `user` na PUT/PATCH kontekstu.
- Egzekwować kompletność **tylko** w `apps/frontend`.
- Cicho stripować kalekie `offer.items` w adapterze / use-case (kaleka pozycja → 400, nie `filter`).
- Startować runa w api bez sprawdzenia bramki.
- Cichego fallbacku kontekstu z `.md` / plików przy pustej lub niespójnej DB.
- Umieszczać regułę bramki w controllerze lub w grafie Social / Content (graf **odczytuje** kompletny kontekst; decyzja „czy wolno zapisać” = use-case PUT/PATCH; „czy wolno startować” = use-case startu runu — przed grafem).
- Traktować jakość copy kontekstu jako warunek programowy MVP (tylko niepustość wymaganych pól).
- Traktować `extras` jako warunek startu runu / wpis do `missing`.
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
- [ ] Unit parse Zod `extras` (znany kształt OK; nieznany klucz → fail).
- [ ] `user` nie zapisze kontekstu (`FORBIDDEN`); `admin` tak — **tylko** przy kompletnej bramce.
- [ ] `GET .../completeness` zgodne z `isComplete`.
- [ ] `POST /runs` przy niekompletności → `409` `CONTEXT_INCOMPLETE` (bez utworzenia przebiegu LLM).
- [ ] HTTP: PUT/PATCH niekompletnej bramki → **400** `VALIDATION_FAILED`; GET bez zmiany (brak upsert).
- [ ] Schema ma pola/kolumny per sekcja bramki; `extras` Json opcjonalne nie blokują `complete`.
- [ ] E2e / HTTP: PUT z hashtagami / case study → round-trip w GET (**przy kompletnym** body bramki).
- [ ] Brak ścieżki runtime czytającej kontekst z `.md` zamiast DB.

## Poza zakresem

- Formularze UI / wskaźnik „Agenci aktywni” → `SPEC-FRONTEND.md`.
- Eksport kontekstu do `.md` + checksum.
- Treść promptów i ConsistencyVerifier (użycie kontekstu / extras jako wejścia) → `SPEC-SOCIAL.md` / `SPEC-CONTENT.md`.
- Szczegóły migracji Prisma → `SPEC-PERSISTENCE.md`.
