---
wersja: 2
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-15
---

# SPEC — Persistence

## Cel / zakres względem dokumentacji

Norma warstwy persistence w `apps/api`: port + adapter Prisma, lokalizacja schema/migracji, kanoniczność DB, zakazy ORM w domain oraz **harmonogram silników** SQLite → PostgreSQL.

Uszczegóławia `docs/architektura.md`, `docs/architektura_katalogi_pliki.md` oraz brak cichego fallbacku z `docs/dokumentacja_koncepcyjna.md` / `docs/anty_patterny.md`.

## Powiązanie ze stylem z docs

Wiążące: porty w domain/application; Prisma **wyłącznie** w `infrastructure` (+ katalog `apps/api/prisma`). Reguły biznesowe nie zależą od silnika SQL.

**Wyjątek względem stylu globalnego:** brak.

## Twarde założenie silników (norma)

| Faza | Silnik | Znaczenie |
|------|--------|-----------|
| **MVP** | **Wyłącznie SQLite** | Pierwszy slice (Social + auth + dashboard + gateway wg docs). Jedyny dozwolony provider Prisma w tej fazie. |
| **V1 — rozbudowa** (kolejne workflowy poza pierwszym slice Social) | **Przejście na PostgreSQL** | Obowiązkowa zmiana silnika przed / wraz z rozbudową o kolejne workflowy. SQLite nie pozostaje docelowym silnikiem po wejściu w tę fazę. |

Uściślenie względem potocznego „1:1 config”:

- **Kod domeny i porty** — bez przepisywania przy zmianie silnika.
- **Prisma:** zmiana `provider` + `DATABASE_URL` + **nowa historia** `prisma/migrations` pod PostgreSQL (stare migracje SQLite → archiwum). Oficjalnie nie da się użyć tych samych plików SQL migracji na obu providerach ([Prisma Migrate — switch providers](https://docs.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues)).
- **Dane:** nowa baza PostgreSQL startuje **pusta**. Rekordy z pliku SQLite **nie** migrują się automatycznie; ewentualny eksport/import = osobna procedura ops (poza automatyzmem Prisma). Plik SQLite nie jest kasowany przez samą zmianę providera — po prostu przestaje być kanonicznym store’em po cutoverze.

W tym SPEC nazwa **„V1 — rozbudowa”** oznacza fazę **po MVP** (kolejne workflowy). Nie mylić z czasem używanym w docs określeniem „v1” jako synonimem zakresu produktowego MVP.

## Wymagania (egzekwowalne)

P-1. Schema i migracje: `apps/api/prisma/`. W MVP obowiązuje **Prisma Migrate** (nie opierać produkcji MVP wyłącznie na `db push`).

P-2. Jeden współdzielony **`PrismaClient`** (moduł Nest) używany przez adaptery BC — bez wielu niespójnych instancji bez uzasadnienia.

P-3. Identyfikatory w kolumnach: **brandowane stringi** zgodnie z `docs/brand_types.md` (np. `run_…`, `usr_…`, `conv_…`) — store w DB w tej postaci.

P-4. ORM / SQL / Prisma **zakazane** w `domain/` oraz w `packages/shared`. Application zależy od **portów**.

P-5. DB jest kanoniczna dla kontekstu firmy, userów, sesji refresh, runów, wyników SM, logów runu, **opinii tekstowych** oraz metadanych przeglądu runu (`userRating`, `outputEdited`, `reviewFinalizedAt`). **Zakaz** cichego fallbacku kontekstu z plików `.md` w runtime.

Zmiana względem wersji 1: kanon obejmuje Feedback i pola przeglądu (fundament zapisu MVP).

P-6. W MVP `datasource.provider = "sqlite"`. Wprowadzenie PostgreSQL jako providera aplikacji = sygnał wejścia w fazę **V1 — rozbudowa** (patrz tabela wyżej), z nową historią migracji.

P-7. `schema.prisma` w MVP utrzymywać **przenośnie** (unikać zbędnych atrybutów `@db.*` / typów tylko pod jeden silnik), żeby modele dało się przenieść przy cutoverze na PostgreSQL przy minimalnych poprawkach.

P-8. Drugi ORM obok Prisma — zakazany w MVP i przy cutoverze (nadal Prisma, inny provider).

## Norma implementacji

### Wzorce / struktura

```text
apps/api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/          # historia pod aktualny provider
└── src/
    └── <bc>/infrastructure/ # jedyne miejsce użycia PrismaClient w BC
```

| Element | Norma |
|---------|--------|
| Port persistence | interfejsy per potrzeba BC (users, sessions, context, runs, logs, wyniki SM, feedback) |
| Adapter | Prisma implementuje porty |
| SQLite ops (WAL, busy_timeout) | **poza** sztywną normą SPEC — decyzja implementacyjna pod współbieżność runów |
| Kolumny kontekstu firmy | per sekcja — `SPEC-KONTEKST-FIRMY.md` |
| Sesje refresh (hash) | `SPEC-AUTH.md` |

### Wolno

- Współdzielić jednego `PrismaClient` między adapterami.
- Archiwizować katalog migracji SQLite przy starcie historii PostgreSQL.
- Traktować cutover na PostgreSQL jako zaplanowany krok fazy V1 — rozbudowa (nie jako wymóg dnia 1 MVP).

### Nie wolno

- Prisma / SQL w `domain/` lub w `packages/shared`.
- Cichego odczytu kontekstu z `.md` przy dziurawej DB.
- PostgreSQL jako providera **w MVP**.
- Pozostawania przy SQLite jako kanonie po wejściu w V1 — rozbudowę (kolejne workflowy).
- Obiecywać w kodzie/docs wewnętrznych, że te same pliki migracji SQLite zadziałają na PostgreSQL bez nowej historii.
- Drugiego ORM równolegle do Prisma.
- Przenoszenia reguł domenowych do UI przy zmianie silnika.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Prisma + **SQLite** | obowiązkowe w **MVP** |
| Prisma Migrate | obowiązkowe od MVP |
| Brandowane ID w DB | obowiązkowe |
| Prisma + **PostgreSQL** | obowiązkowe od fazy **V1 — rozbudowa** (kolejne workflowy); poza MVP |
| Automatyczny transfer danych SQLite → PostgreSQL | poza zakresem automatyzmu (ops / osobna procedura) |
| Szyfrowanie at-rest SQLite | poza MVP |

Źródło limitu zmiany providera: [Prisma Migrate limitations](https://docs.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues).

## Kryteria akceptacji

- [ ] MVP: `provider = sqlite`, migracje w repo, aplikacja wstaje na pliku SQLite.
- [ ] Żaden plik w `domain/` nie importuje `@prisma/client`.
- [ ] ID w DB mają prefiksy brandów z docs.
- [ ] Brak ścieżki runtime fallbacku kontekstu z `.md`.
- [ ] W dokumentacji implementacyjnej / README ops jest jasne: cutover PostgreSQL = nowa historia migracji + pusta baza + opcjonalny import danych; SQLite tylko MVP; V1 — rozbudowa = PostgreSQL.

## Poza zakresem

- Konkretny skrypt ETL danych SQLite → PostgreSQL.
- Backup/restore volume (docs deployment / ops).
- Eksport kontekstu do `.md` / checksum (tuż po MVP wg docs produktowych — nie ten SPEC).
- Konfiguracja WAL/busy_timeout (implementacja).
- Szczegóły schematu każdej tabeli BC (doprecyzowują Auth / Kontekst / Runy / Social / Feedback przy implementacji, byle norma port/adapter i silników była zachowana).
