---
wersja: 17
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-07
---

# SPEC — Persistence

## Cel / zakres względem dokumentacji

Norma warstwy persistence w `apps/api`: port + adapter Prisma, lokalizacja schema/migracji, kanoniczność DB, zakazy ORM w domain oraz **harmonogram silników** SQLite → PostgreSQL.

Uszczegóławia `docs/architektura.md`, `docs/architektura_katalogi_pliki.md` oraz brak cichego fallbacku z `docs/dokumentacja_koncepcyjna.md` / `docs/anty_patterny.md`.

Zmiana względem wersji 9: kanon Run bez `pipelineFinishedAt` / indeksu pod sweeper. Od tej wersji kolumna kotwicy TTL przeglądu + migracja backfill B — `docs/dictionary.md`, `SPEC-RUNY.md` R-10.
Zmiana względem wersji 11: kanon Auth bez `verifiedAt` / `AccountActivation`. Od tej wersji marker weryfikacji + tabela tokenu aktywacji — `docs/dictionary.md`, `SPEC-AUTH.md` A-11…A-13.
Zmiana względem wersji 13 / P-5: `User.role` przy register zawsze `user`. Od tej wersji String `admin`\|`user`\|`guest` (bez Prisma enum); sloty guest = COUNT `Run`.
Zmiana względem wersji 14 / D16: `users.create(role=user)` przy accept-invite. Od tej wersji `role` z use-case (`guest` \| `user` vs `DEMO_MODE`) — `SPEC-AUTH.md` A-7b; **bez** migracji / backfill istniejących ról.
Zmiana względem wersji 16 / P-5: DELETE Users = zawsze soft; brak normy hard/purge tree. Od tej wersji soft vs hard/purge; zakaz orphan Feedback; jedna tx delete tree; **bez** obowiązku migracji Cascade; abort **poza** tx — `SPEC-AUTH.md` A-10, `users-management-plan.md` Faza 2.

## Powiązanie ze stylem z docs

Wiążące: porty w domain/application; Prisma **wyłącznie** w `infrastructure` albo `infrastructure/persistence/` (+ katalog `apps/api/prisma`). Reguły biznesowe nie zależą od silnika SQL.

**Wyjątek względem stylu globalnego:** brak.

## Twarde założenie silników (norma)

| Faza | Silnik | Znaczenie |
|------|--------|-----------|
| **MVP** | **Wyłącznie SQLite** | Slice produktowy (Social posty+rolki + Content podstawowa forma + auth + dashboard + gateway wg docs). Jedyny dozwolony provider Prisma w tej fazie. Nowe modele reel/page **append** na SQLite (P-7). |
| **V1 — rozbudowa** | **Przejście na PostgreSQL** | Obowiązkowa zmiana silnika (ops / skala). **Zmiana względem** wersji 2: V1 **nie** oznacza „kolejne workflowy poza pierwszym slice Social” — Content jest w MVP; Postgres jest niezależny od tego, że Content już istnieje. SQLite nie pozostaje docelowym silnikiem po wejściu w tę fazę. |

Uściślenie względem potocznego „1:1 config”:

- **Kod domeny i porty** — bez przepisywania przy zmianie silnika.
- **Prisma:** zmiana `provider` + `DATABASE_URL` + **nowa historia** `prisma/migrations` pod PostgreSQL (stare migracje SQLite → archiwum). Oficjalnie nie da się użyć tych samych plików SQL migracji na obu providerach ([Prisma Migrate — switch providers](https://docs.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues)).
- **Dane:** nowa baza PostgreSQL startuje **pusta**. Rekordy z pliku SQLite **nie** migrują się automatycznie; ewentualny eksport/import = osobna procedura ops (poza automatyzmem Prisma). Plik SQLite nie jest kasowany przez samą zmianę providera — po prostu przestaje być kanonicznym store’em po cutoverze.

W tym SPEC nazwa **„V1 — rozbudowa”** oznacza fazę **po MVP** (PostgreSQL + panel opinii + publikacja + audytorzy Content + YouTube). Nie mylić z prefiksem HTTP `/api/v1`.

## Wymagania (egzekwowalne)

P-1. Schema i migracje: `apps/api/prisma/`. W MVP obowiązuje **Prisma Migrate** (nie opierać produkcji MVP wyłącznie na `db push`).

P-2. Jeden współdzielony **`PrismaClient`** (moduł Nest) używany przez adaptery BC — bez wielu niespójnych instancji bez uzasadnienia.

P-3. Identyfikatory w kolumnach: **brandowane stringi** zgodnie z `docs/brand_types.md` (np. `run_…`, `usr_…`, `inv_…`, `conv_…`) — store w DB w tej postaci.

P-4. ORM / SQL / Prisma **zakazane** w `domain/` oraz w `packages/shared`. Application zależy od **portów**.

P-5. DB jest kanoniczna dla kontekstu firmy, userów, **zaproszeń (Invitation)**, **aktywacji konta (`AccountActivation`)**, sesji refresh, runów, wyników Social (posty i rolki) i Content, logów runu, **opinii tekstowych** oraz metadanych przeglądu runu (`userRating`, `outputEdited`, `reviewFinalizedAt`, **`pipelineFinishedAt`**) **oraz** anulowania (`cancelledAt`, `cancelRequested`). **`reviewExpiresAt` nie jest kolumną** — wyliczane w API (`SPEC-RUNY.md` R-10). **Zakaz** cichego fallbacku kontekstu z plików `.md` w runtime.

Kanon tabel (Auth):

- Model **`User`**: m.in. `passwordHash` (wymagany), `isActive`, **`role`** = **String** (`admin` \| `user` \| `guest` — unia `UserRole` w shared; **zakaz** wymogu Prisma `enum` roli), **`verifiedAt`** (`DateTime?` — `null` = nieaktywowane linkiem / pending w prod; po sukcesie activate = timestamp; poza `production` ustawiane przy register). Soft-delete (`isActive = false`) **nie** czyści `verifiedAt` (historia). Pending ≠ soft-delete: pending ma `isActive = true` + `verifiedAt = null`. Dump/restore przenosi string roli; `DEMO_MODE` **nie** przepisuje ról w DB.
- Model **`Invitation`** (lub równoważna nazwa) — `id` (`inv_<uuid>`), `email`, `tokenHash`, `purpose` (`invite` w MVP; rezerwa pod `password_reset` bez zmiany modelu świata), `status` (`pending` \| `accepted` \| `revoked`), `expiresAt`, `invitedByUserId`, timestamps; **bez** kolumny raw tokenu. Invitation **nie** jest „User z pustym hasłem”.
- Model **`AccountActivation`** (lub równoważna nazwa) — `id` = **`act_<uuid>`**; hash tokenu (`tokenHash`, **unikalny**), `userId` (**unikalny**), `expiresAt` (TTL `ACTIVATION_TTL`, default `7d`); ew. `createdAt`; **bez** kolumny raw tokenu. Po udanym activate: update `User.verifiedAt` + **delete** wierszy activation dla tego usera. Soft-delete `user` **oraz** hard/purge `guest` **usuwają** wiersze activation. Raw wyłącznie w mailu / logu DX. Migracja wprowadzająca `verifiedAt`: **backfill** istniejących `User` → `verifiedAt = createdAt`; bootstrap / accept-invite ustawiają `verifiedAt = now()` przy create.

`User.passwordHash` nadal wymagany — wiersz `User` powstaje przy accept-invite **albo** przy register (A-11); **nie** przy samym Invitation pending.

**D21 (Users DELETE — soft vs hard/purge):** semantyka HTTP = `SPEC-AUTH.md` A-10. Persistence:

| Tryb | Tx Prisma (jedna) | Poza tx |
|------|-------------------|---------|
| Soft `user` | `isActive=false` + delete refresh sessions + delete `AccountActivation` | — |
| Hard / purge `guest` | Delete dzieci Run (kolejność aplikacyjna) + Run gościa + Feedback (`authorId` = guest **OR** `runId` ∈ runów gościa) + refresh + activation + `User` | Abort live (purge) **przed** tx; Redis DEL ratings **po** commit (fail-open) |

- Soft **nie** kasuje Run / Feedback; soft **nie** czyści `verifiedAt`.
- Hard **usuwa wiersz** `User` — email wolny.
- **Zakaz orphan Feedback** po hard (Feedback **nie** ma FK — kasować **jawnie**).
- **Bez** obowiązku migracji `onDelete: Cascade` na dzieciach Run — kolejność w **jednej** transakcji aplikacyjnej wystarczy.
- Abort in-process / SSE **nie** wchodzą do tej samej ACID tx co delete tree.
- Soft `user` także w **jednej** tx (jak tabela).

**D17:** migracja SQL `UNIQUE (email) WHERE status = 'pending'` (komentarz w `schema.prisma` jak `User_one_admin`; Prisma 6 nie wyrazi partial unique; indeks **bez** `purpose`). Wygasły wiersz zostaje `status = pending` — indeks nadal blokuje drugi `POST`.

**D16:** accept-invite happy path = **jedna** transakcja Prisma: `users.create(role=<guest|user z use-case vs DEMO_MODE>, verifiedAt=now())` **oraz** Invitation → `accepted`. Rola **nie** jest hardcodowana w adapterze — przychodzi z inputu portu (`SPEC-AUTH.md` A-7b). Atomowość create + `accepted` **bez zmian**.

Ścieżka kolizji (P2002 / `User.email` zajęty, aktywny albo soft-deleted): **brak** `User` z tej próby; Invitation → `revoked` (nie `accepted`); brak „sukcesu” create. Atomowość jak happy path — revoke (lub równoważne zużycie) w tej samej transakcji / atomowym kroku co próba create. Semantyka HTTP: `SPEC-AUTH.md` A-7b (**401**, nie 409).

**D19 (register):** kolizja email na `POST /auth/register` (aktywny **lub** soft-deleted) → **brak** drugiego `User`; HTTP **409** `CONFLICT`, `message`: **`Email already in use`** — `SPEC-AUTH.md` A-11. Happy path: **revoke** pending `Invitation` na email, potem create User (`DEMO_MODE=true` → `role=guest`; `false` → `role=user`). **Zmiana względem:** D19 wersji 13 — zawsze `role = user`. W `production`: `verifiedAt = null` + wiersz `AccountActivation` (+ mail poza transakcją). Po activate: `verifiedAt` + delete activation.

**D20 (sloty guest):** **brak** tabeli slotów. Zużycie = COUNT wierszy `Run` (`startedByUserId` + `taskType`, wszystkie statusy). Opcjonalny indeks wspierający `(startedByUserId, taskType)` — bez pinu nazwy. Cap dzienny / rating = Redis, nie kolumny User/Run.

Zmiana względem wersji 10 / D16: wyłącznie happy path create+`accepted`. Od tej wersji jawna ścieżka P2002 → revoke bez User.
Zmiana względem wersji 14 / D16: pin `role=user` w `users.create`. Od tej wersji `role` z use-case vs `DEMO_MODE`; **bez** migracji / backfill istniejących wierszy `User`.

Zmiana względem wersji 11 / P-5: kanon Auth bez `verifiedAt` / `AccountActivation` / D19. Od tej wersji marker + tabela aktywacji; `User` także z register.

**D18:** `email` na `User` i `Invitation` **bez** normalizacji (`trim` / `toLowerCase`); unique i porównanie case-sensitive.

Zmiana względem wersji 7 / P-5: kanon DB bez zaproszeń; droga na `user` milcząco przez utworzenie wiersza `User` z hasłem od admina.

Kolumna `Run.brief` (Json): **unia** `SocialBrief` | `ContentBrief` rozróżniana `taskType` — **bez nowej migracji** przy zmianie kształtu TypeScript. Semantyka i parse przy mapowaniu wiersza → `RunRecord`: `SPEC-RUNY.md` R-3d1.

`CompanyContext.extras` (Json?): semantyka typowana w application (`CompanyContextExtras`, Zod `.strict()`) — **nie** nowe tabele per case study w MVP. Payload JSON `SocialIdea` / `SocialContent` / `ReelScript` / `ContentOutline` — addytywne klucze (`cta?`, `characterCount`, `role?`, **`sourceIdeaId`** na content/script dwuetapowym); tabele `SocialContent` / `SocialReelScript` już 1:N per `runId` — migracja danych **nie** wymagana (stare wiersze OK).

Zmiana względem wersji 6 / P-5: enumeracja addytywnych kluczy bez `sourceIdeaId`; kontrakt HTTP udawał 1:1 mimo tabel 1:N.

Zmiana względem wersji 5 / P-5: milcząco brak normy typowanych extras i addytywnych kluczy wyniku SM/outline.

Zmiana względem wersji 4 / P-5: milcząco jeden JSON briefu SM; od tej wersji unia kanałowa bez zmiany schemy Prisma.

Kanon tabel (append, P-7): istniejące + `SocialReelIdea`, `SocialReelScript`, `ContentOutline`, `ContentDocument`; `Run.contentKind` nullable; `Run.platform` zostaje `String` NOT NULL (sentinel `'web'` przy page_*); na `Run` osobne liczniki refine Content: `outlineRefineCount`, `copyRefineCount` (`Int`, default `0`). Kolumny `ideasRefineCount` / `contentRefineCount` zostają **wyłącznie** Social (posty i rolki). Content **nie** zapisuje stanu refine do kolumn Social.

Na modelu **`Run`** (kanon DB, migracja append):

| Pole | Typ / semantyka |
|------|-----------------|
| `status` | obejmuje wartość **`cancelled`** (trzeci terminal — `docs/brand_types.md`, `SPEC-RUNY.md`) |
| `cancelledAt` | `DateTime?` — `null` do pierwszego udanego przejścia do `cancelled`; potem ISO w snapshotcie |
| `cancelRequested` | `Boolean` (default `false`) — durable guard recovery / wyścig cancel vs crash; zerowane przy wygranej `attemptCancel` |
| `pipelineFinishedAt` | `DateTime?` — kotwica okna `REVIEW_TTL`; ustawiane **raz** przy legalnym transition → `completed` \| `failed`; `null` przy `cancelled` i statusach nieterminalnych |

Bez osobnego `cancelledBy` (authz = `startedBy`). Semantyka CAS / recovery — `SPEC-RUNY.md` R-9 / R-11; bez rollbacku wyniku po cancel. Semantyka TTL / sweeper — `SPEC-RUNY.md` R-10.

**Indeks sweepera:** model `Run` **musi** mieć indeks wspierający zapytanie sweepera auto-finalize (wiersze z kotwicą, bez `reviewFinalizedAt`, z miniętym oknem). Norma **nie** pinuje nazwy ani dokładnego kształtu indeksu — byle zapytanie batch UPDATE było wspierane indeksem.

**Migracja backfill B (jednorazowo):** dodanie kolumny `pipelineFinishedAt`; dla istniejących wierszy w statusie `completed` \| `failed` bez kotwicy: `pipelineFinishedAt = updatedAt`, fallback `createdAt`. Migracja **nie** ustawia `reviewFinalizedAt`. Domknięcie wygasłych otwartych przeglądów = **pierwszy boot sweepera** (jedna odpowiedzialność — `SPEC-RUNY.md` R-10). Po wdrożeniu **zakaz** używania `updatedAt` jako bieżącej kotwicy TTL.

**Zakaz DELETE** wierszy `Run` (ani wyników Social/Content) w ramach TTL / auto-finalize — wyłącznie UPDATE `reviewFinalizedAt`.

Zmiana względem wersji 8 / P-5: kanon Run bez pól anulowania. Od tej wersji `cancelledAt` + `cancelRequested` + status `cancelled` w DB.

Zmiana względem wersji 9 / P-5: kanon Run bez `pipelineFinishedAt`. Od tej wersji kolumna kotwicy + norma indeksu sweepera + backfill B — `docs/dictionary.md`, `docs/data_flow.md`.

Zmiana względem wersji 2: kanon obejmuje reel i Content; V1 = Postgres niezależnie od kanałów w MVP.

Zmiana względem wersji 3: kanon nie rozdzielał liczników refine — Content mógłby reuse’ować `ideasRefineCount` / `contentRefineCount`. Od tej wersji refine page ma własne kolumny (P-7 append; bez kasowania kolumn Social).

P-6. W MVP `datasource.provider = "sqlite"`. Wprowadzenie PostgreSQL jako providera aplikacji = sygnał wejścia w fazę **V1 — rozbudowa** (patrz tabela wyżej), z nową historią migracji.

P-7. `schema.prisma` w MVP utrzymywać **przenośnie** (unikać zbędnych atrybutów `@db.*` / typów tylko pod jeden silnik), żeby modele dało się przenieść przy cutoverze na PostgreSQL przy minimalnych poprawkach. Partial unique zaproszeń (`UNIQUE (email) WHERE status = 'pending'`) jest SQL w migracji — **ten sam wzorzec** przenosi się na PostgreSQL przy cutoverze (nowa historia migracji, ten sam predykat).

P-8. Drugi ORM obok Prisma — zakazany w MVP i przy cutoverze (nadal Prisma, inny provider).

## Norma implementacji

### Wzorce / struktura

```text
apps/api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/          # historia pod aktualny provider
└── src/
    └── <bc>/infrastructure/              # albo …
        └── persistence/                  # gdy BC ma kilka granic I/O — jedyne miejsce PrismaClient w BC
```

Zmiana względem wersji 15 / struktura: norma wskazywała wyłącznie `…/<bc>/infrastructure/` bez `persistence/`. Od tej wersji Prisma w BC = `infrastructure/` **albo** `infrastructure/persistence/` gdy warstwa miesza kilka I/O — nadal **jedyne** miejsce `PrismaClient` w BC (`docs/architektura_katalogi_pliki.md`).

| Element | Norma |
|---------|--------|
| Port persistence | interfejsy per potrzeba BC (users, **invitations**, **account-activation**, sessions, context, runs, logs, wyniki SM, feedback) |
| Adapter | Prisma implementuje porty; lokalizacja = `<bc>/infrastructure/` **albo** `<bc>/infrastructure/persistence/` (gdy BC ma kilka I/O) |
| SQLite ops (WAL, busy_timeout) | **poza** sztywną normą SPEC — decyzja implementacyjna pod współbieżność runów |
| Kolumny kontekstu firmy | per sekcja — `SPEC-KONTEKST-FIRMY.md` |
| Sesje refresh (hash) | `SPEC-AUTH.md` |

### Wolno

- Współdzielić jednego `PrismaClient` między adapterami.
- Trzymać adapter Prisma w `infrastructure/persistence/`, gdy BC ma kilka granic I/O (Runs, Auth; wzorzec Social/Content).
- Archiwizować katalog migracji SQLite przy starcie historii PostgreSQL.
- Traktować cutover na PostgreSQL jako zaplanowany krok fazy V1 — rozbudowa (nie jako wymóg dnia 1 MVP).

### Nie wolno

- Prisma / SQL w `domain/` lub w `packages/shared`.
- Prisma w `infrastructure/sse` \| `quota` \| `mail` \| `session` \| `graph` (te podkatalogi = inne I/O; ORM wyłącznie w `infrastructure/` lub `infrastructure/persistence/`).
- Cichego odczytu kontekstu z `.md` przy dziurawej DB.
- PostgreSQL jako providera **w MVP**.
- Pozostawania przy SQLite jako kanonie po wejściu w V1 — rozbudowę (ops/skala; **nie** mylić z „po dodaniu Content” — Content jest w MVP na SQLite).
- Obiecywać w kodzie/docs wewnętrznych, że te same pliki migracji SQLite zadziałają na PostgreSQL bez nowej historii.
- Drugiego ORM równolegle do Prisma.
- Przenoszenia reguł domenowych do UI przy zmianie silnika.
- Zapisu refine outline/copy (BC Content) do `Run.ideasRefineCount` / `Run.contentRefineCount`.
- Migracji Prisma wyłącznie po to, by rozdzielić `SocialBrief` / `ContentBrief` (kolumna Json zostaje; zmiana to parse, nie DDL).
- Osobnych tabel `case_studies` / równoważnych per sekcja extras w tym wycinku MVP (Json `extras` + Zod).
- Modelowania zaproszenia jako `User` z pustym / sentinel `passwordHash`.
- Drugiego `pending` na ten sam `email` bez indeksu SQL D17.
- Reuse `isActive = false` jako „pending aktywacji” (obowiązuje `verifiedAt = null` + `AccountActivation`).
- Pozostawiania wierszy `AccountActivation` po udanym activate (obowiązuje delete).
- Czyszczenia `verifiedAt` przy soft-delete.
- Orphan `Feedback` po hard/purge `guest` (obowiązuje jawne delete — D21).
- Wymogu migracji Cascade jako jedynej drogi delete tree (obowiązuje jedna tx aplikacyjna — D21).
- Składania abortu in-process / SSE w tej samej ACID tx co hard/purge (abort poza tx — D21).
- Drugiego aktywnego wiersza `AccountActivation` per user (jeden pending).
- Przechowywania raw tokenu aktywacji w DB.
- `DELETE` runów / wyników w ramach TTL przeglądu lub auto-finalize (obowiązuje UPDATE `reviewFinalizedAt`).
- Traktowania `reviewExpiresAt` jako kolumny DB.
- Używania `updatedAt` jako bieżącej kotwicy TTL po wdrożeniu (wyjątek: jednorazowy backfill B).
- Prisma `enum` dla `User.role` (obowiązuje String + unia TS).
- Tabeli „guest slots” / zużycia per typ (obowiązuje COUNT `Run` — D20).

Zmiana względem wersji 3 / „Nie wolno”: dopisano zakaz reuse kolumn refine Social na Content.
Zmiana względem wersji 4 / „Nie wolno”: dopisano zakaz zbędnej migracji `brief`.
Zmiana względem wersji 5 / „Nie wolno”: dopisano zakaz osobnych tabel case studies zamiast `extras` Json.
Zmiana względem wersji 7 / „Nie wolno”: dopisano zakaz „User pending z pustym hasłem” oraz obejścia unique pending.
Zmiana względem wersji 9 / „Nie wolno”: dopisano zakazy DELETE przy TTL oraz `reviewExpiresAt` jako kolumny / `updatedAt` jako bieżącej kotwicy.
Zmiana względem wersji 10 / „Nie wolno”: dopisano zakaz żywego `pending` po P2002 na accept-invite.
Zmiana względem wersji 11 / „Nie wolno”: dopisano zakazy pending przez `isActive=false`, orphan `AccountActivation`, czyszczenia `verifiedAt` przy soft-delete.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Prisma + **SQLite** | obowiązkowe w **MVP** |
| Prisma Migrate | obowiązkowe od MVP |
| Brandowane ID w DB | obowiązkowe |
| Prisma + **PostgreSQL** | obowiązkowe od fazy **V1 — rozbudowa** (ops/skala); poza MVP; **nie** warunek Content |
| Automatyczny transfer danych SQLite → PostgreSQL | poza zakresem automatyzmu (ops / osobna procedura) |
| Szyfrowanie at-rest SQLite | poza MVP |

Źródło limitu zmiany providera: [Prisma Migrate limitations](https://docs.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues).

## Kryteria akceptacji

- [ ] MVP: `provider = sqlite`, migracje w repo, aplikacja wstaje na pliku SQLite.
- [ ] Żaden plik w `domain/` nie importuje `@prisma/client`.
- [ ] ID w DB mają prefiksy brandów z docs.
- [ ] Brak ścieżki runtime fallbacku kontekstu z `.md`.
- [ ] Model `Run` ma `cancelledAt`, `cancelRequested`, `pipelineFinishedAt` oraz dopuszcza status `cancelled` (migracja w historii Prisma); istnieje indeks wspierający zapytanie sweepera.
- [ ] Migracja backfill B ustawia tylko kotwicę (`updatedAt` else `createdAt`); **bez** ustawiania `reviewFinalizedAt` w migracji.
- [ ] W dokumentacji implementacyjnej / README ops jest jasne: cutover PostgreSQL = nowa historia migracji + pusta baza + opcjonalny import danych; SQLite tylko MVP; V1 — rozbudowa = PostgreSQL.
- [ ] Accept-invite D16: happy path = jedna transakcja create User (`role` vs `DEMO_MODE`) + `accepted`; kolizja P2002 → brak User, Invitation `revoked` (nie żywego `pending`).
- [ ] `User.verifiedAt` (`DateTime?`) w schemie; soft-delete **nie** czyści pola.
- [ ] `User.role` = String (`admin`/`user`/`guest`); **bez** Prisma enum roli; **brak** tabeli slotów guest.
- [ ] Soft `user` = jedna tx bez kasowania Run/Feedback; hard/purge `guest` = jedna tx delete tree + User; brak orphan Feedback; abort poza tx.

## Poza zakresem

- Konkretny skrypt ETL danych SQLite → PostgreSQL.
- Backup/restore volume (docs deployment / ops).
- Eksport kontekstu do `.md` / checksum (tuż po MVP wg docs produktowych — nie ten SPEC).
- Konfiguracja WAL/busy_timeout (implementacja).
- Szczegóły schematu każdej tabeli BC (doprecyzowują Auth / Kontekst / Runy / Social / Content / Feedback przy implementacji, byle norma port/adapter i silników była zachowana).
