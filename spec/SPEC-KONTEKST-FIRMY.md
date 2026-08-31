---
wersja: 2
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-31
---

# SPEC — Kontekst firmy

## Cel / zakres względem dokumentacji

Norma bounded contextu **Company Context** w `apps/api`: kanoniczny zapis kontekstu firmy w DB, bramka kompletności sekcji, authz edycji wyłącznie dla `admin`.

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

**Poza bramką (opcjonalne w modelu):** case studies, obiekcje, pełny katalog, performance, hashtagi itd. — wolno przechowywać; **nie** wchodzą do `complete`.

## Wymagania (egzekwowalne)

C-1. W domain istnieje czysta funkcja (lub równoważny serwis domenowy bez I/O):

`isComplete(context) → { complete: boolean, missing: string[] }`

`missing` zawiera klucze niespełnionych sekcji bramki. Funkcja jest unit-testowalna bez DB/HTTP.

C-2. `GET /api/v1/company-context` zwraca aktualny kontekst + informację o kompletności (flaga / obiekt spójny z docs).

C-3. `GET /api/v1/company-context/completeness` zwraca `{ complete, missing }` — ten sam werdykt co C-1.

C-4. Zapis kontekstu: **`PUT` oraz `PATCH`** `/api/v1/company-context` w MVP — **tylko `admin`**. `user` → `403` `FORBIDDEN`.

C-5. Start runu (`POST /api/v1/runs`) w `apps/api` **musi** sprawdzić bramkę — **każdy** taskType (post_*, reel_*, page_*); przy `complete === false` → `409` `CONTEXT_INCOMPLETE` z `details` (np. brakujące sekcje). UI nie jest jedyną bramką. Jedna bramka na cały produkt (w tym głos SM dla page_* — świadome).

Zmiana względem wersji 1: C-5 mówił „start runu SM”; teraz każdy `POST /runs`.

C-6. Jedna instalacja = **jeden** kanoniczny kontekst firmy w DB. Brak cichego odczytu / fallbacku z plików `.md` w runtime.

C-7. Model persistence: **osobne kolumny (lub równoważne pola zmapowane 1:1) per sekcja bramki** — nie jeden nieprzezroczysty blob JSON jako jedyny nośnik sekcji wymaganych. Opcjonalne pola poza bramką mogą być osobnymi kolumnami nullable / JSON opcjonalnym.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/company-context/
├── company-context.module.ts
├── company-context.controller.ts
├── application/                 # get, put, patch, completeness
├── domain/                      # isComplete, typy sekcji, port persistence
└── infrastructure/              # adapter Prisma
```

| Element | Norma |
|---------|--------|
| Bramka | reguła w **domain**; application tylko orkiestruje odczyt + wywołanie |
| Walidacja kompletności MVP | pozytywna = **niepuste** wymagane wartości (bez NLP / scoringu jakości) |
| HTTP zapis | PUT (pełna aktualizacja uzgodnionych pól) **i** PATCH (częściowa) |
| Authz | `JwtAuthGuard` + `RolesGuard` (`admin` na zapis) |
| Odczyt | `admin` i `user` (oba mogą czytać / używać przy runach) |

### Wolno

- Trzymać opcjonalne sekcje poza bramką w DB bez wpływu na `complete`.
- Zwracać w GET status kompletności per sekcja (wygodne dla UI).
- Współdzielić wynik `isComplete` między endpointem completeness a guardem startu runu (ten sam kod domenowy).

### Nie wolno

- Pozwalać `user` na PUT/PATCH kontekstu.
- Egzekwować kompletność **tylko** w `apps/frontend`.
- Startować runa w api bez sprawdzenia bramki.
- Cichego fallbacku kontekstu z `.md` / plików przy pustej lub niespójnej DB.
- Umieszczać regułę bramki w controllerze lub w grafie Social / Content (graf **odczytuje** kompletny kontekst; decyzja „czy wolno startować” należy do api przed grafem / w use-case startu runu).
- Traktować jakość copy kontekstu jako warunek programowy MVP (tylko niepustość wymaganych pól).

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Warstwy Nest + port/adapter Prisma | obowiązkowe (jak pozostałe BC poza Social graph) |
| Domenowa `isComplete` bez I/O | obowiązkowe |
| PUT + PATCH w MVP | obowiązkowe |
| Kolumny per sekcja bramki | obowiązkowe |
| Eksport `.md` / checksum | poza MVP (tuż po — docs) |

## Kryteria akceptacji

- [ ] Unit test: niekompletny kontekst → `complete: false` + poprawne `missing`; kompletny → `complete: true`, `missing: []`.
- [ ] `user` nie zapisze kontekstu (`FORBIDDEN`); `admin` tak.
- [ ] `GET .../completeness` zgodne z `isComplete`.
- [ ] `POST /runs` przy niekompletności → `409` `CONTEXT_INCOMPLETE` (bez utworzenia przebiegu LLM).
- [ ] Schema ma pola/kolumny per sekcja bramki; opcjonalne poza-bramką nie blokują `complete`.
- [ ] Brak ścieżki runtime czytającej kontekst z `.md` zamiast DB.

## Poza zakresem

- Formularze UI / wskaźnik „Agenci aktywni” → `SPEC-FRONTEND.md`.
- Eksport kontekstu do `.md` + checksum.
- Treść promptów i ConsistencyVerifier (użycie kontekstu jako wejścia) → `SPEC-SOCIAL.md` / `SPEC-CONTENT.md`.
- Szczegóły migracji Prisma → `SPEC-PERSISTENCE.md`.
