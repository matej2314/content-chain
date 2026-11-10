# Content Chain — feature plan: L-11 metrics port + cutover PostgreSQL (Faza 30)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-30-metrics-postgres.md`  
**Kotwica major:** Faza 30 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 30).  
**Numer BE 30 ≠ FE 30** (UX limitu per-user — poza tym wycinkiem).  
**Źródła:** `docs/observability.md`, `docs/deployment.md` (V1 Postgres), `docs/architektura.md`, `docs/architektura_katalogi_pliki.md`, `SPEC-RUNY.md` R-14, `SPEC-BEZPIECZENSTWO.md` B-9, `SPEC-PERSISTENCE.md` P-6 / P-6a / P-6b / P-7, major Faza 30 / kroki 30.1–30.2.  
**Kolejność obowiązkowa:** **FAZA 1 (L-11 / SQLite) → FAZA 2 (cutover PG)**. L-11 **nie** czeka na Postgres.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 30 majoru backend: (1) spłata L-11 — `RunStatsPort` + `metrics/` bez `PrismaService`; testy na SQLite; (2) cutover PostgreSQL — tymczasowe archiwum migracji SQLite, nowa historia Migrate, Compose/env/CI, smoke na pustej PG, potem usunięcie archiwum SQLite z drzewa |
| Major | Faza 30; start po Fazach 1–29 (`WYKONANY`); **bez** MILESTONE między 29 a 30; **bez** MILESTONE 30 |
| Poza zakresem | ETL SQLite→PG w kodzie produktu; panel admin P0; major FE; przepisywanie faz MVP SQLite `WYKONANY`; CQRS „dla metrics”; reuse R-13 `aggregateSummary` jako źródła Prometheus; publiczny `/metrics` na internet; zmiana semantyki gauge/HTTP metrics poza źródłem Run |
| Po implementacji (informacyjnie) | Major: Faza 30 → `WYKONANY` (DoD gate + kod). Kroki 30.1–30.2 → `WYKONANY`. Brak `MILESTONE` 30. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 30.1 L-11 port stats (SQLite) | FAZA 1 / KROK 1–4 | port + adapter + metrics + testy SQLite |
| 30.2 Cutover PostgreSQL | FAZA 2 / KROK 1–5 | archiwum Migrate + provider + Compose/env/CI + smoke + usunięcie archiwum SQLite |

**Pass rozwojowy (sesja planu):**

1. `RunStatsPort` + implementacja w `PrismaRunAdapter` **przed** refaktorem `MetricsService`.
2. Eksport portu z `RunLifecycleModule` **przed** importem w `MetricsModule`.
3. Testy L-11 na SQLite **przed** flipem providera (FAZA 1 domknięta przed FAZA 2).
4. Archiwum SQLite + `provider = postgresql` **przed** nową historią Migrate.
5. Nowa Migrate (+ partial unique SQL) **przed** Compose/`DATABASE_URL`/e2e.
6. Smoke ops (KROK 4) **przed** usunięciem archiwum SQLite (KROK 5) — baseline PG i partial unique muszą być w aktywnej historii.
7. **Brak przesunięć między fazami major.**

**Decyzje HOW:**

- Port = cienki **`RunStatsPort`** (preferowany w R-14 / B-9), nie `countByStatus` na `RunRepository` i nie osobny CQRS.
- Jeden adapter: `PrismaRunAdapter implements RunRepository, RunStatsPort` (jak `useExisting` przy Feedback reader — bez drugiej klasy ORM).
- Cutover = ścieżka **Compose Postgres** (managed = ten sam `DATABASE_URL` poza stackiem; bez drugiej ścieżki kodu).
- Import danych SQLite→PG = **poza** produktem (procedura ops).
- Archiwum SQLite w drzewie = **tylko na czas cutoveru** (KROK 1→5); docs/SPEC wymagają archiwizacji przy starcie historii PG, **nie** wiecznej retencji katalogu — po smoke usuwamy z working tree (historia zostaje w Gicie).

---

## Założenia

- Stack: NestJS 11, Prisma **6** (`@prisma/client` / `prisma` ^6), prom-client (istniejący), Node jak w Dockerfile api.
- FAZA 1: `datasource.provider` **pozostaje** `sqlite`; volume / `file:` URL bez zmian.
- FAZA 2: `provider = "postgresql"`; `migration_lock.toml` → `postgresql`; stara historia → archiwum w repo.
- Entrypoint api już woła `prisma migrate deploy` — **bez** zmiany sensu; po cutoverze działa na PG.
- Partial unique (`User_one_admin`, `Invitation_one_pending_email`) **nie** są w `schema.prisma` (Prisma 6) — muszą wrócić jako SQL w nowej historii (P-7).
- `tsconfig` **bez** zmian. Typy jawne na granicach portu; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Switch provider Migrate | Context7 `/prisma/web` v6 — limitations | Nie da się auto-przełączyć providerów; zmienić `provider`+`url`, **usunąć/zarchiwizować** `./prisma/migrations`, `migrate dev` / nowa historia na pustej bazie; custom SQL z poprzednich migracji **dopisać ręcznie** | Archiwum → `migrations_sqlite_archive/`; nowa historia PG; dopisek partial unique |
| `provider` w schema | Context7 Prisma v6 guides | `provider = "postgresql"`, `url = env("DATABASE_URL")` | FAZA 2 / KROK 1 |
| `groupBy` | istniejący `MetricsService` + `PrismaRunAdapter.aggregateSummary` | `by: ['status'], _count: { _all: true }` | Przenieść do adaptera pod portem |

---

## FAZA 1 — L-11: `RunStatsPort` + `metrics/` bez Prisma (SQLite)

Odpowiada major Krok 30.1. Status startowy kroków: `NIE_ROZPOCZĘTY`.

Po tej fazie stack MVP (SQLite) działa jak dziś — wolno robić pełną regresję aplikacji przed cutoverem PG.

---

### KROK 1 — Port `RunStatsPort`

**Status:** `WYKONANY`

**Cel:** Cienki kontrakt odczytu liczników `RunStatus` dla Prometheus. Major 30.1; `SPEC-RUNY.md` R-14; `docs/observability.md` (L-11); wzorzec jak `FeedbackRunReader`.

**Artefakty:**

- Nowy: `apps/api/src/runs/domain/run-stats.port.ts`

#### Nowy plik — kompletny

```typescript
import type { RunStatus } from '@content-chain/shared';

export const RUN_STATS_PORT = Symbol('RUN_STATS_PORT');

/**
 * Read-only counts of runs by status for Prometheus gauges.
 * Not a substitute for R-13 aggregateSummary / GET /runs/summary.
 */
export interface RunStatsPort {
  countByStatus(): Promise<ReadonlyMap<RunStatus, number>>;
}
```

**DoD kroku:**

- Symbol + interfejs wyeksportowane; brak zależności od Prisma / Nest w pliku portu.
- Komentarz / nazwa nie myli z `aggregateSummary`.

---

### KROK 2 — Implementacja w `PrismaRunAdapter`

**Status:** `WYKONANY`

**Cel:** `groupBy` statusów żyje wyłącznie w `runs/infrastructure/persistence/`. Major 30.1; R-14 pkt 2.

**Artefakty:**

- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/run-lifecycle.module.ts`

#### Refaktor — `prisma-run.adapter.ts`

**teraz** (nagłówek klasy + importy istotne):

```typescript
import {
  type ListRunsQuery,
  type ListRunsResult,
  type ListLightRunsResult,
  type RunRepository,
  type RunSnapshot,
  type RunSummaryAggregate,
  type RunSummaryScope,
} from '../../domain/run.port';
// ...
export class PrismaRunAdapter implements RunRepository {
```

**zamień na:**

```typescript
import {
  type ListRunsQuery,
  type ListRunsResult,
  type ListLightRunsResult,
  type RunRepository,
  type RunSnapshot,
  type RunSummaryAggregate,
  type RunSummaryScope,
} from '../../domain/run.port';
import type { RunStatsPort } from '../../domain/run-stats.port';
import {
  isRunStatus,
  type RunStatus,
} from '@content-chain/shared';
// ...
export class PrismaRunAdapter implements RunRepository, RunStatsPort {
```

Dopisz metodę (np. zaraz po `countInFlightByUser`):

```typescript
  async countByStatus(): Promise<ReadonlyMap<RunStatus, number>> {
    const grouped = await this.prisma.run.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts = new Map<RunStatus, number>();
    for (const row of grouped) {
      if (!isRunStatus(row.status)) continue;
      counts.set(row.status, row._count._all);
    }
    return counts;
  }
```

Uwaga importów: scal `isRunStatus` / `RunStatus` z istniejącym importem `@content-chain/shared` (grupa wartości + type) — bez drugiego bloku importu z tego samego pakietu.

#### Refaktor — `run-lifecycle.module.ts`

**teraz:**

```typescript
@Module({
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: OUTPUT_EDITED_WRITER, useClass: PrismaOutputEditedAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    RunAbortRegistry,
  ],
  exports: [
    RUN_REPOSITORY,
    OUTPUT_EDITED_WRITER,
    RUN_SSE_HUB,
    RUN_LIFECYCLE,
    RunLifecycleService,
    RunAbortRegistry,
  ],
})
export class RunLifecycleModule {}
```

**zamień na:**

```typescript
import { RUN_STATS_PORT } from './domain/run-stats.port';

@Module({
  providers: [
    PrismaRunAdapter,
    { provide: RUN_REPOSITORY, useExisting: PrismaRunAdapter },
    { provide: RUN_STATS_PORT, useExisting: PrismaRunAdapter },
    { provide: OUTPUT_EDITED_WRITER, useClass: PrismaOutputEditedAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    RunLifecycleService,
    { provide: RUN_LIFECYCLE, useExisting: RunLifecycleService },
    RunAbortRegistry,
  ],
  exports: [
    RUN_REPOSITORY,
    RUN_STATS_PORT,
    OUTPUT_EDITED_WRITER,
    RUN_SSE_HUB,
    RUN_LIFECYCLE,
    RunLifecycleService,
    RunAbortRegistry,
  ],
})
export class RunLifecycleModule {}
```

**DoD kroku:**

- Jedna instancja `PrismaRunAdapter` obsługuje oba porty.
- `RUN_STATS_PORT` wyeksportowany z `RunLifecycleModule`.
- Żaden plik poza `runs/infrastructure/persistence/` nie woła `prisma.run.groupBy` pod metrics.

---

### KROK 3 — Refaktor `MetricsService` / `MetricsModule`

**Status:** `WYKONANY`

**Cel:** `apps/api/src/metrics/` bez `PrismaService` / ORM / SQL. Major 30.1; B-9; R-14 pkt 1.

**Artefakty:**

- Zmiana: `apps/api/src/metrics/metrics.service.ts`
- Zmiana: `apps/api/src/metrics/metrics.module.ts`
- Zmiana: `apps/api/src/metrics/metrics.service.spec.ts`

#### Refaktor — `metrics.service.ts`

**teraz:**

```typescript
import { Injectable } from '@nestjs/common';
import { RUN_STATUSES } from '@content-chain/shared';
import { PrismaService } from '../shared/persistence/prisma.service';
import { metricsRegistry, runsByStatus } from './metrics.registry';

@Injectable()
export class MetricsService {
  constructor(private readonly prisma: PrismaService) {}

  async render(): Promise<{ contentType: string; body: string }> {
    const grouped = await this.prisma.run.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts = new Map(grouped.map((row) => [row.status, row._count._all]));
    for (const status of RUN_STATUSES) {
      runsByStatus.set({ status }, counts.get(status) ?? 0);
    }
    return {
      contentType: metricsRegistry.contentType,
      body: await metricsRegistry.metrics(),
    };
  }
}
```

**zamień na:**

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { RUN_STATUSES } from '@content-chain/shared';
import {
  RUN_STATS_PORT,
  type RunStatsPort,
} from '../runs/domain/run-stats.port';
import { metricsRegistry, runsByStatus } from './metrics.registry';

@Injectable()
export class MetricsService {
  constructor(
    @Inject(RUN_STATS_PORT) private readonly runStats: RunStatsPort,
  ) {}

  async render(): Promise<{ contentType: string; body: string }> {
    const counts = await this.runStats.countByStatus();
    for (const status of RUN_STATUSES) {
      runsByStatus.set({ status }, counts.get(status) ?? 0);
    }
    return {
      contentType: metricsRegistry.contentType,
      body: await metricsRegistry.metrics(),
    };
  }
}
```

#### Refaktor — `metrics.module.ts`

**teraz:**

```typescript
@Module({
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
```

**zamień na:**

```typescript
import { RunLifecycleModule } from '../runs/run-lifecycle.module';

@Module({
  imports: [RunLifecycleModule],
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
```

(Zachowaj istniejące importy Nest / interceptor / controller / service — dopisz tylko `RunLifecycleModule`.)

#### Refaktor — `metrics.service.spec.ts`

**teraz:** mock `PrismaService.run.groupBy`.

**zamień na:** mock `RUN_STATS_PORT` z `countByStatus` → `Map` (np. pusta + jedna statusowa). Asercja: po `render()` body / gauge ścieżka nie rzuca; brak providera `PrismaService` w module testowym.

Szkic:

```typescript
import { Test } from '@nestjs/testing';
import { RUN_STATUSES } from '@content-chain/shared';
import { RUN_STATS_PORT } from '../runs/domain/run-stats.port';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  it('fills gauges from RunStatsPort without Prisma', async () => {
    const counts = new Map([['completed', 2] as const]);
    const moduleRef = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: RUN_STATS_PORT,
          useValue: {
            countByStatus: jest.fn().mockResolvedValue(counts),
          },
        },
      ],
    }).compile();

    const service = moduleRef.get(MetricsService);
    const { contentType, body } = await service.render();
    expect(contentType).toContain('text/plain');
    expect(body).toContain('content_chain_runs_by_status');
    for (const status of RUN_STATUSES) {
      expect(body).toContain(`status="${status}"`);
    }
  });
});
```

**DoD kroku:**

- `rg "PrismaService|prisma\\." apps/api/src/metrics` → **0** trafień w kodzie produkcyjnym metrics.
- `GET /metrics` nadal eksponuje `content_chain_runs_by_status{status=…}` dla wszystkich `RUN_STATUSES`.
- Brak cyklu Nest: `RunLifecycleModule` **nie** importuje `MetricsModule`.

---

### KROK 4 — Testy L-11 na SQLite + regresja metrics

**Status:** `WYKONANY`

**Cel:** Dowód R-14 na istniejącym silniku MVP. Major 30.1 DoD.

**Artefakty:**

- Zmiana / uzupełnienie: `apps/api/src/metrics/metrics.service.spec.ts` (KROK 3)
- Opcjonalnie lekki: unit na `PrismaRunAdapter.countByStatus` z mockiem `prisma.run.groupBy` **albo** integration na SQLite jeśli w repo już jest wzorzec integration adaptera — **nie** dodawać nowego harnessu e2e tylko pod L-11.
- Regresja ręczna / istniejące e2e: `GET /metrics` (gdy pokryte) bez flipu DB.

**DoD kroku:**

- Unit metrics zielony z mockiem portu.
- Aplikacja na SQLite: `GET /metrics` zwraca gauge’e; HTTP/default metrics bez regresji.
- Review: diff `metrics/` → Prisma = odrzucany jako naruszenie SPEC.

---

#### Propozycja commit message

```text
refactor(metrics): read run status gauges through RunStatsPort

Keep Prometheus export free of Prisma so ops metrics stay behind the Runs port on SQLite (L-11).
```

---

## FAZA 2 — Cutover PostgreSQL (ops + Migrate)

Odpowiada major Krok 30.2. **Start dopiero po FAZA 1.** Status startowy kroków: `NIE_ROZPOCZĘTY`.

Po tej fazie kanon V1 = Postgres; SQLite nie jest silnikiem aplikacji / testów e2e; archiwum migracji SQLite usunięte z drzewa (KROK 5).

---

### KROK 1 — Archiwum migracji SQLite + provider Postgres

**Status:** `WYKONANY`

**Cel:** Odciąć historię SQLite od aktywnego Migrate; przestawić schema. Major 30.2; P-6b; Context7 switch-provider.

**Artefakty:**

- Przeniesienie: `apps/api/prisma/migrations/` → `apps/api/prisma/migrations_sqlite_archive/` (cała dotychczasowa historia + stary `migration_lock.toml`)
- Nowy: `apps/api/prisma/migrations_sqlite_archive/README.md`
- Zmiana: `apps/api/prisma/schema.prisma` (`provider`)
- (pusty) nowy katalog `apps/api/prisma/migrations/` powstaje w KROK 2

#### Nowy plik — `migrations_sqlite_archive/README.md`

```markdown
# Archiwum migracji SQLite (MVP) — tymczasowe

Historia Prisma Migrate z okresu `provider = sqlite`.
**Nie** uruchamiać `prisma migrate deploy` z tego katalogu na PostgreSQL.

Aktywna historia V1: `../migrations/` (PostgreSQL).
Katalog usuwany z drzewa po smoke PG (feature plan FAZA 2 / KROK 5); retencja = Git history.
```

#### Refaktor — `schema.prisma`

**teraz:**

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**zamień na:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Modele **bez** zmian w tym kroku (P-7 — przenośność). Partial unique nadal poza schema (komentarze przy `User.role` / `Invitation` zostają).

**DoD kroku:**

- Aktywny `prisma/migrations/` nie zawiera już SQL SQLite (albo jest pusty przed KROK 2).
- Archiwum w drzewie z README (**tymczasowe** do KROK 5).
- `schema.prisma` → `postgresql`.

---

### KROK 2 — Nowa historia Migrate (PG) + partial unique

**Status:** `WYKONANY`

**Cel:** Jedna (lub dwie) migracje od pustej PG do aktualnego modelu + indeksy SQL z archiwum. Major 30.2; P-6b; P-7.

**Artefakty:**

- Nowy: `apps/api/prisma/migrations/migration_lock.toml`
- Nowy: `apps/api/prisma/migrations/<timestamp>_init_postgres/migration.sql` (wygenerowany + dopisek)
- Ewentualnie osobna migracja `<timestamp>_partial_uniques/migration.sql` — dopuszczalne; preferuj **jeden** init z dopiskiem na końcu pliku (mniej szumu).

#### `migration_lock.toml`

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

#### Generowanie SQL (HOW — wykonać przy implementacji)

Na maszynie z pustą bazą Postgres (lokalny Docker OK):

```bash
cd apps/api
# DATABASE_URL=postgresql://… wskazujący PUSTĄ bazę
pnpm exec prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/$(date -u +%Y%m%d%H%M%S)_init_postgres/migration.sql
```

(Utwórz katalog migracji przed redirectem albo użyj `prisma migrate dev --name init_postgres` na pustej PG — ten sam efekt: baseline ze schema.)

#### Dopisek obowiązkowy na końcu `migration.sql` (kompletny fragment)

```sql
-- Partial uniques — Prisma 6 schema cannot declare them (SPEC-AUTH / SPEC-PERSISTENCE P-7).
-- Ported from migrations_sqlite_archive (User_one_admin, Invitation_one_pending_email).
CREATE UNIQUE INDEX "User_one_admin" ON "User"("role") WHERE "role" = 'admin';
CREATE UNIQUE INDEX "Invitation_one_pending_email" ON "Invitation"("email") WHERE "status" = 'pending';
```

**Nie** kopiować backfilli SQLite (`backfill_*`) do historii PG — baza startuje pusta; backfille MVP są historią archiwum.

**DoD kroku:**

- `prisma migrate deploy` na **pustej** PG przechodzi.
- Indeksy partial unique istnieją po deployu.
- `migration_lock.toml` = `postgresql`.
- Brak obietnicy „te same pliki SQLite na PG”.

---

### KROK 3 — Compose, env, CI/e2e pod Postgres

**Status:** `WYKONANY`

**Cel:** Topologia V1 bez `api-sqlite` / mountu pliku SQLite jako kanonu. Major 30.2; `docs/deployment.md` V1; P-6b.

**Artefakty:**

- Zmiana: `docker-compose.yml`
- Zmiana: `apps/api/.env.example`
- Zmiana: root generowania `.env` w `.github/workflows/smoke.yml` (i analogiczne miejsce Jenkins **tylko jeśli** trzyma `DATABASE_URL=file:…` — dopisz PG)
- Zmiana: `apps/api/test/setup-env.ts`
- Zmiana: wszystkie e2e `deployTestDb` / hardcode `DATABASE_URL: 'file:./test.db'` → URL Postgres testowy
- (DX) document placeholders `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` w `.env.example` api lub root — bez sekretów prawdziwych

#### Compose — usługa Postgres + api

Dodaj usługę (hostname DNS w `cc-network`: `postgres`):

```yaml
  postgres:
    image: postgres:16-alpine
    container_name: cc-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - api-postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - cc-network
    # Bez publish na host — tylko sieć compose (ops/managed mogą mapować port osobno).
```

W `api`:

- `depends_on`: `postgres` z `condition: service_healthy` (+ istniejący gateway).
- **Usuń** volume mount pliku SQLite (`/opt/content-chain/data:/app/data` albo named `api-sqlite`) z kanonu V1.
- `DATABASE_URL` z root `.env` (compose `env_file`) — **nie** bake w obrazie.

Na końcu pliku:

```yaml
volumes:
  api-postgres:
```

#### `.env.example` (api) — fragment

**teraz:**

```text
DATABASE_URL="file:./chain.db"
```

**zamień na:**

```text
# V1 — PostgreSQL (compose hostname `postgres` albo managed).
DATABASE_URL="postgresql://cc:cc@localhost:5432/content_chain?schema=public"
POSTGRES_USER=cc
POSTGRES_PASSWORD=cc
POSTGRES_DB=content_chain
```

(DX lokalny: gdy Postgres tylko w compose bez publish, użyj `docker compose exec` / publish tymczasowy — URL hosta dostosuj; w kontenerze api: host `postgres`.)

Kanon **w kontenerze api**:

```text
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public
```

#### Testy e2e / setup-env

**teraz** (`setup-env.ts`):

```typescript
process.env.DATABASE_URL ??= 'file:./test.db';
```

**zamień na:**

```typescript
process.env.DATABASE_URL ??=
  'postgresql://cc:cc@127.0.0.1:5432/content_chain_test?schema=public';
```

We **wszystkich** e2e, gdzie `deployTestDb` nadpisuje:

```typescript
DATABASE_URL: 'file:./test.db',
```

**zamień na** (ten sam URL co setup albo `process.env.DATABASE_URL!`):

```typescript
DATABASE_URL: process.env.DATABASE_URL!,
```

Wymaganie DX/CI: przed `pnpm --filter api test:e2e` musi działać Postgres z bazą `content_chain_test` (pusta lub drop/create per job). **Nie** dodawać ETL.

Unit specki, które tylko podstawiają string `file:./test.db` do `validateEnv` (bez realnego połączenia), mogą zostać albo dostać URL `postgresql://…` — behawior walidacji bez zmian (nadal `z.string().min(1)`), preferuj URL PG dla spójności.

#### Smoke workflow

W `.github/workflows/smoke.yml` zamień generowanie:

```text
DATABASE_URL=file:/app/data/chain.db
```

na connection string do usługi `postgres` w compose (+ sekrety/user/db z env joba). Job musi podnieść Postgres razem ze stackiem.

**DoD kroku:**

- `docker compose config` pokazuje `postgres` + volume `api-postgres`; brak kanonicznego mountu SQLite na api.
- Entrypoint api: `migrate deploy` na PG przy starcie.
- E2e / setup-env nie wskazują `file:`.
- Smoke CI nie ustawia `file:/app/data/chain.db`.

---

### KROK 4 — Smoke ops na pustej PG

**Status:** `WYKONANY`

**Cel:** Domknięcie DoD Kroku 30.2 / fazy. Checklist z `docs/deployment.md` (V1) — bez ETL.

**Procedura (obserwowalna):**

1. Pusta baza PG (volume świeży albo `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`).
2. `docker compose up -d --build` (lub równoważne) → api przechodzi `migrate deploy`.
3. Smoke: `GET /api/v1/health`, `GET /api/v1/health/ready`, `GET /metrics`.
4. Bootstrap admin na pustej bazie (jak dotychczasowy first-run).
5. Potwierdzenie: brak volume SQLite w kanonie; dane MVP SQLite **nie** są automatycznie w PG.

**DoD kroku:**

- Trzy smoke’i OK na PG.
- Pad migracji = pad kontenera api (istniejący entrypoint).
- Jawne: import SQLite→PG poza tym wycinkiem.
- Partial unique obecne w aktywnej historii PG (warunek wejścia w KROK 5).

---

### KROK 5 — Usunięcie archiwum migracji SQLite

**Status:** `WYKONANY`

**Cel:** Po domkniętym baseline PG usunąć tymczasowe archiwum z working tree. Major 30.2 / P-6b — archiwizacja przy starcie historii PG **już spełniona** w KROK 1; docs/SPEC **nie** pinują wiecznej retencji katalogu w drzewie (historia MVP zostaje w Gicie).

**Artefakty:**

- Usunięcie całego katalogu: `apps/api/prisma/migrations_sqlite_archive/`
- Bez zmian w aktywnym `apps/api/prisma/migrations/` (historia PostgreSQL nienaruszona)

**HOW:**

1. Potwierdź DoD KROK 4 (smoke OK; partial unique w `migrations/…_init_postgres`).
2. Usuń `apps/api/prisma/migrations_sqlite_archive/` z drzewa (jeden commit fazy albo ten sam diff co cutover — bez osobnego commita „na zapas”).
3. Nie przywracaj SQLite do `schema.prisma` / aktywnego Migrate.

**DoD kroku:**

- Brak `apps/api/prisma/migrations_sqlite_archive/` w working tree.
- `apps/api/prisma/migrations/` + `migration_lock.toml` (`postgresql`) bez zmian względem KROK 2–4.
- `prisma migrate deploy` na pustej PG nadal przechodzi (regresja po usunięciu archiwum).

---

#### Propozycja commit message

```text
feat(persistence): cut over api store to PostgreSQL for V1

Replace SQLite migrate history with a Postgres baseline and compose service, then drop the temporary SQLite archive from the tree.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| L-11 / R-14 / B-9 | Brak Prisma w `metrics/`; port + adapter; testy na SQLite w FAZA 1 |
| Kolejność 30.1 → 30.2 | FAZA 1 commitowalna i testowalna bez PG; FAZA 2 potem |
| P-6b | Compose/managed PG; nowa historia; pusta baza; bez reuse SQL SQLite |
| P-7 | Partial unique w SQL migracji PG |
| Archiwum SQLite | KROK 1 = tymczasowe; KROK 5 = usunięcie z drzewa po smoke |
| Poza zakresem | Brak ETL w `apps/`; brak FE; brak MILESTONE 30 |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN na końcu każdej fazy |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 30 | `WYKONANY` |
| Krok 30.1 | `WYKONANY` |
| Krok 30.2 | `WYKONANY` |
| MILESTONE 30 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy MVP SQLite / Faza 29 | **bez zmian** (`WYKONANY`) |

Edycja pliku major **nie** należy do tej sesji feature planu ani do auto-startu implementacji.
