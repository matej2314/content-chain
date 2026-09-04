---
wersja: 4
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-04
---

# SPEC — Kontekst firmy

## Cel / zakres względem dokumentacji

Norma bounded contextu **Company Context** w `apps/api`: kanoniczny zapis kontekstu firmy w DB, bramka kompletności sekcji, authz edycji wyłącznie dla `admin`, typowane opcjonalne `extras`.

Uszczegóławia bramkę i sekcje z `docs/dokumentacja_koncepcyjna.md`, endpointy z `docs/dokumentacja_komunikacji.md` oraz reguły ról z `docs/security.md` / `SPEC-AUTH.md`.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`): klasyczne warstwy Nest — controller → application → domain (reguła bramki) + porty → adapter Prisma. Bez LangGraph.

**Wyjątek względem stylu globalnego:** brak.

## Sekcje bramki (MVP)

Start **każdego** `POST /runs` (Social i Content) odblokowany dopiero gdy **wszystkie** sekcje spełniają minimalną kompletność (jakość merytoryczna po stronie admina; programowo: niepuste wymagane wartości).

| Sekcja (klucz) | Minimalna treść (docs) | Kompletność w kodzie MVP |
|----------------|------------------------|---------------------------|
| `identity` (tożsamość) | Nazwa firmy + krótki opis / misja (1–3 zdania) | niepuste: nazwa + opis |
| `offer` (oferta) | ≥ 1 usługa/produkt: nazwa + korzyść | niepusta lista z ≥ 1 elementem mającym niepustą nazwę i korzyść |
| `voice` (głos SM) | Ton: jak mówimy / jak nie mówimy | niepuste oba kierunki tonu (lub równoważne pola normy implementacji) |
| `cta` (CTA / kanały) | ≥ 1 domyślne CTA lub kierunek | niepusta lista / wartość ≥ 1 |
| `audience` (odbiorca) | ≥ 1 profil grupy docelowej | niepusta lista ≥ 1 profilu z niepustym opisem stanowiska/branży/kontekstu |

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

C-2. `GET /api/v1/company-context` zwraca aktualny kontekst (w tym `extras`: obiekt albo `null`) + informację o kompletności (flaga / obiekt spójny z docs).

C-3. `GET /api/v1/company-context/completeness` zwraca `{ complete, missing }` — ten sam werdykt co C-1.

C-4. Zapis kontekstu: **`PUT` oraz `PATCH`** `/api/v1/company-context` w MVP — **tylko `admin`**. `user` → `403` `FORBIDDEN`. Body może zawierać `extras`; nieznane klucze w `extras` → **400** `VALIDATION_FAILED` (Zod `.strict()` przez wspólny `parseWithZod` z `apps/api/src/shared/parse-with-zod.ts` — nie lokalna kopia w module).

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
| Bramka | reguła w **domain**; application tylko orkiestruje odczyt + wywołanie |
| Walidacja kompletności MVP | pozytywna = **niepuste** wymagane wartości (bez NLP / scoringu jakości) |
| `extras` | typowany obiekt; Zod `.strict()`; poza `isComplete` |
| HTTP zapis | PUT (pełna aktualizacja uzgodnionych pól) **i** PATCH (częściowa) |
| Authz | `JwtAuthGuard` + `RolesGuard` (`admin` na zapis) |
| Odczyt | `admin` i `user` (oba mogą czytać / używać przy runach) |

### Wolno

- Trzymać `extras` w DB bez wpływu na `complete`.
- Zwracać w GET status kompletności per sekcja bramki (wygodne dla UI).
- Współdzielić wynik `isComplete` między endpointem completeness a guardem startu runu (ten sam kod domenowy).
- Omit / `null` całego `extras` gdy brak danych.

### Nie wolno

- Pozwalać `user` na PUT/PATCH kontekstu.
- Egzekwować kompletność **tylko** w `apps/frontend`.
- Startować runa w api bez sprawdzenia bramki.
- Cichego fallbacku kontekstu z `.md` / plików przy pustej lub niespójnej DB.
- Umieszczać regułę bramki w controllerze lub w grafie Social / Content (graf **odczytuje** kompletny kontekst; decyzja „czy wolno startować” należy do api przed grafem / w use-case startu runu).
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
- [ ] Unit parse Zod `extras` (znany kształt OK; nieznany klucz → fail).
- [ ] `user` nie zapisze kontekstu (`FORBIDDEN`); `admin` tak.
- [ ] `GET .../completeness` zgodne z `isComplete`.
- [ ] `POST /runs` przy niekompletności → `409` `CONTEXT_INCOMPLETE` (bez utworzenia przebiegu LLM).
- [ ] Schema ma pola/kolumny per sekcja bramki; `extras` Json opcjonalne nie blokują `complete`.
- [ ] E2e / HTTP: PUT z hashtagami / case study → round-trip w GET.
- [ ] Brak ścieżki runtime czytającej kontekst z `.md` zamiast DB.

## Poza zakresem

- Formularze UI / wskaźnik „Agenci aktywni” → `SPEC-FRONTEND.md`.
- Eksport kontekstu do `.md` + checksum.
- Treść promptów i ConsistencyVerifier (użycie kontekstu / extras jako wejścia) → `SPEC-SOCIAL.md` / `SPEC-CONTENT.md`.
- Szczegóły migracji Prisma → `SPEC-PERSISTENCE.md`.
