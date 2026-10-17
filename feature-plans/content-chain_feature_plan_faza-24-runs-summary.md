# Content Chain — feature plan: GET /api/v1/runs/summary (KPI, Faza 24)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-24-runs-summary.md`  
**Kotwica major:** Faza 24 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 24).  
**Numer BE 24 ≠ FE 22** — UI KPI = `content-chain-frontend_major_plan.md` Faza 22 / `SPEC-FRONTEND.md` F-16 (poza tym wycinkiem).  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md` (KPI — tylko kontrakt), `SPEC-KOMUNIKACJA.md` K-2k, `SPEC-RUNY.md` R-13, `SPEC-TESTY.md` D-78…D-81, `SPEC-AUTH.md` (role / GuestGuard), major Faza 24.  
**Kolejność `KROK`:** shared DTO → port + Prisma → use-case + cache → HTTP/module → testy (pass rozwojowy: brak użycia przed powstaniem).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 24 majoru backend: `GET /api/v1/runs/summary` — agregacja KPI rolling 30d, scope admin/user/guest∧demo, cache TTL 60 s, DTO shared, **bez** migracji Prisma |
| Major | Faza 24; start po Fazach 1–23 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 24 |
| Poza zakresem | UI / major FE Faza 22; migracja schematu; panel admina V1; dark mode; CDN cache; Redis jako store KPI; zmiana listy `GET /runs` / detail; edycja historii Fazy 3/18 |
| Po implementacji (informacyjnie) | Major: Faza 24 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 24. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (kontrakt / HOW) | Feature | Zakres |
|------------------------|---------|--------|
| Shape + DTO shared | FAZA 1 / KROK 1 | `@content-chain/shared` |
| Agregacja na `Run` bez migracji | FAZA 1 / KROK 2 | port + Prisma |
| Scope + cache TTL 60 s | FAZA 1 / KROK 3 | use-case |
| Trasa `summary` przed `:runId` | FAZA 1 / KROK 4 | controller + module |
| D-78…D-81 | FAZA 1 / KROK 5 | unit + e2e + Postman smoke |

**Pass rozwojowy (sesja planu):**

1. Typ shared **przed** use-case / HTTP.
2. `aggregateSummary` na porcie + Prisma **przed** use-case.
3. Cache w use-case **przed** controllerem.
4. `@Get('summary')` w tym samym kroku co wire (obok `user/:userId`, **przed** `:runId`).
5. Testy na końcu.
6. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma **6** (`@prisma/client` ^6), Zod 4 w api (ten wycinek **bez** nowego Zod body — brak query/body), monorepo `packages/shared`.
- `tsconfig` **bez** zmian. Typy jawne na granicach; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Okno: rolling **30 × 24 × 60 × 60 × 1000** ms od `now` serwera; `windowTo = now`, `windowFrom = now - 30d` (oba ISO8601 w odpowiedzi).
- Scope: `admin` → bez filtra `startedByUserId`; `user` / `guest` → `startedByUserId = actor.id`. Guest dociera do handlera tylko przy `DEMO_MODE=true` (`GuestGuard` + `@AllowGuest`) — demo off → **401** jak pozostałe trasy.
- `successRateLast30d`: `(completed / terminal) * 100` wśród statusów ∈ `{completed, failed, cancelled}` w oknie; brak terminalnych → **`0`**; zaokrąglenie do **1** miejsca po przecinku (`Math.round(x * 10) / 10`) — spójne z przykładem docs `75.5`.
- `activeNow`: count status ∈ `{running, awaiting_hitl, queued}` w scope — **bez** filtra daty (**nie** `interrupted`).
- `topTaskTypeLast30d`: max `_count` w oknie; remis → typ z największym `_max(createdAt)` wśród remisujących; brak runów / brak legalnego `taskType` → `null`.
- Cache: **in-process** `Map`, TTL **60_000** ms, klucz scope (`admin` \| `user:{id}` \| `guest:{id}`) — **bez** nowego npm, **bez** Redis (Redis = guest quotas).
- **Bez** migracji Prisma; indeksy `createdAt` / `status` / `startedByUserId` / `taskType` już istnieją.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Prisma Client 6 | Context7 `/websites/prisma_io` + wersja projektu `@prisma/client` ^6 | Klasyczny Client API: `count({ where })`, `groupBy({ by, where, _count, _max })` — **nie** nowy query builder Prisma 7 z Context7 | Użyć istniejącego stylu jak `countByUserAndType` w `PrismaRunAdapter` |
| Nest routing | Konwencja repo + R-13 / K-2k | Trasa statyczna przed `:param` | `@Get('summary')` przed `@Get(':runId')` |
| Cache | K-2k HOW | in-process / CDN / serwer | In-process Map TTL 60 s |

---

## FAZA 1 — GET /api/v1/runs/summary (KPI)

Odpowiada major Faza 24 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Typ odpowiedzi w `@content-chain/shared`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wspólny DTO `RunsSummaryResponse` dla api i FE (F-3 / F-16 / K-2k / R-13.6). Major Faza 24 — DTO w shared.

**Artefakty:**

- Nowy: `packages/shared/src/runs/runs-summary.ts`
- Zmiana: `packages/shared/src/index.ts`

#### Nowy plik — pełny kod

`packages/shared/src/runs/runs-summary.ts`:

```typescript
import type { RunTaskType } from '../branded/enums';

/**
 * Odpowiedź `GET /api/v1/runs/summary` (K-2k / R-13).
 * Daty = ISO8601 string; `topTaskTypeLast30d` = null gdy brak runów w oknie.
 */
export type RunsSummaryResponse = {
  windowFrom: string;
  windowTo: string;
  totalLast30d: number;
  successRateLast30d: number;
  activeNow: number;
  topTaskTypeLast30d: RunTaskType | null;
};
```

**teraz** (`packages/shared/src/index.ts`):

```typescript
export * from './branded/brand';
export * from './branded/ids';
export * from './branded/enums';
```

**zamień na:**

```typescript
export * from './branded/brand';
export * from './branded/ids';
export * from './branded/enums';
export * from './runs/runs-summary';
```

Po zmianie: `pnpm --filter @content-chain/shared build` (albo skrypt workspace równoważny), żeby api/FE widziały export.

**DoD kroku:**

- `RunsSummaryResponse` eksportowane z `@content-chain/shared`.
- Pola zgodne z docs / K-2k (nazwy + typy).
- Brak Zod w shared (enumy/DTO typów — konwencja shared).

---

### KROK 2 — Port `aggregateSummary` + Prisma (bez migracji)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Agregacja na tabeli `Run` przez port repository — use-case nie woła Prisma. R-13.1 / R-13.7.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.ts`
- Opcjonalnie unit: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.aggregate-summary.spec.ts` (fake prisma) — pełne pokrycie metryk też w KROK 5

#### Typy + metoda portu

**teraz** (`run.port.ts` — fragment przed `export interface RunRepository`):

```typescript
export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

export interface RunRepository {
```

**zamień na:**

```typescript
export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

/** Scope przed agregacją: brak `startedByUserId` = cała instancja (admin). */
export type RunSummaryScope = {
  startedByUserId?: UserId;
};

/**
 * Surowe liczby z DB — percent / ISO / cache liczy use-case (R-13).
 * `topTaskTypeLast30d` już z remisem rozstrzygniętym w adapterze (max count, potem max createdAt).
 */
export type RunSummaryAggregate = {
  totalLast30d: number;
  completedLast30d: number;
  terminalLast30d: number;
  activeNow: number;
  topTaskTypeLast30d: RunTaskType | null;
};

export interface RunRepository {
```

Dodaj import `RunTaskType` z `@content-chain/shared` (obok istniejących importów typów).

**teraz** (koniec interfejsu `RunRepository`, po `countByUserAndType`):

```typescript
  countByUserAndType(userId: UserId, taskType: RunTaskType): Promise<number>;
}
```

**zamień na:**

```typescript
  countByUserAndType(userId: UserId, taskType: RunTaskType): Promise<number>;
  aggregateSummary(
    scope: RunSummaryScope,
    windowFrom: Date,
    windowTo: Date,
  ): Promise<RunSummaryAggregate>;
}
```

Uwaga: jeśli sygnatura `countByUserAndType` w pliku używa `RunRecord['taskType']` zamiast `RunTaskType` — **nie zmieniaj** tej metody; dopisz tylko `aggregateSummary`. Import `RunTaskType` tylko gdy potrzebny dla nowego typu.

#### Prisma adapter — pełna metoda

Dopisz do `PrismaRunAdapter` (importy: `isRunTaskType`, typy `RunSummaryAggregate` / `RunSummaryScope` z portu):

```typescript
  async aggregateSummary(
    scope: RunSummaryScope,
    windowFrom: Date,
    windowTo: Date,
  ): Promise<RunSummaryAggregate> {
    const ownerFilter =
      scope.startedByUserId === undefined
        ? {}
        : { startedByUserId: scope.startedByUserId };

    const inWindow = {
      ...ownerFilter,
      createdAt: { gte: windowFrom, lte: windowTo },
    };

    const terminalStatuses = ['completed', 'failed', 'cancelled'] as const;
    const activeStatuses = ['running', 'awaiting_hitl', 'queued'] as const;

    const [totalLast30d, completedLast30d, terminalLast30d, activeNow, groups] =
      await Promise.all([
        this.prisma.run.count({ where: inWindow }),
        this.prisma.run.count({
          where: { ...inWindow, status: 'completed' },
        }),
        this.prisma.run.count({
          where: { ...inWindow, status: { in: [...terminalStatuses] } },
        }),
        this.prisma.run.count({
          where: {
            ...ownerFilter,
            status: { in: [...activeStatuses] },
          },
        }),
        this.prisma.run.groupBy({
          by: ['taskType'],
          where: inWindow,
          _count: { _all: true },
          _max: { createdAt: true },
        }),
      ]);

    let topTaskTypeLast30d: RunSummaryAggregate['topTaskTypeLast30d'] = null;
    if (groups.length > 0) {
      let bestCount = -1;
      let bestCreatedAt = new Date(0);
      for (const group of groups) {
        if (!isRunTaskType(group.taskType)) {
          continue;
        }
        const count = group._count._all;
        const maxCreated = group._max.createdAt ?? new Date(0);
        if (
          count > bestCount ||
          (count === bestCount && maxCreated > bestCreatedAt)
        ) {
          bestCount = count;
          bestCreatedAt = maxCreated;
          topTaskTypeLast30d = group.taskType;
        }
      }
    }

    return {
      totalLast30d,
      completedLast30d,
      terminalLast30d,
      activeNow,
      topTaskTypeLast30d,
    };
  }
```

**DoD kroku:**

- Port ma `aggregateSummary`; Prisma implementuje bez migracji.
- Remis `taskType` → nowszy `_max.createdAt`.
- `activeNow` bez filtra `createdAt`.
- Istniejące `Partial<RunRepository>` w unitach kompilują się (Partial); nowe testy podają override.

---

### KROK 3 — `GetRunsSummaryUseCase` + cache TTL 60 s

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Scope wg roli, okno 30d, `successRate`, mapowanie na `RunsSummaryResponse`, cache in-process 60 s. K-2k / R-13.2–5.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/get-runs-summary.use-case.ts`
- Nowy: `apps/api/src/runs/application/get-runs-summary.use-case.spec.ts` (szkic asercji w KROK 5; tu plik use-case obowiązkowy)

#### Nowy plik — pełny kod

`apps/api/src/runs/application/get-runs-summary.use-case.ts`:

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunsSummaryResponse } from '@content-chain/shared';
import {
  RUN_REPOSITORY,
  type RunRepository,
  type RunSummaryScope,
} from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

export const RUNS_SUMMARY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
export const RUNS_SUMMARY_CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  value: RunsSummaryResponse;
};

function cacheKey(actor: AuthUserContext): string {
  if (actor.role === 'admin') {
    return 'admin';
  }
  return `${actor.role}:${actor.id}`;
}

function scopeFor(actor: AuthUserContext): RunSummaryScope {
  if (actor.role === 'admin') {
    return {};
  }
  return { startedByUserId: actor.id };
}

function successRate(completed: number, terminal: number): number {
  if (terminal === 0) {
    return 0;
  }
  return Math.round((completed / terminal) * 1000) / 10;
}

@Injectable()
export class GetRunsSummaryUseCase {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(
    actor: AuthUserContext,
    now: Date = new Date(),
  ): Promise<RunsSummaryResponse> {
    const key = cacheKey(actor);
    const hit = this.cache.get(key);
    if (hit !== undefined && hit.expiresAt > now.getTime()) {
      return hit.value;
    }

    const windowTo = now;
    const windowFrom = new Date(now.getTime() - RUNS_SUMMARY_WINDOW_MS);
    const aggregate = await this.runs.aggregateSummary(
      scopeFor(actor),
      windowFrom,
      windowTo,
    );

    const value: RunsSummaryResponse = {
      windowFrom: windowFrom.toISOString(),
      windowTo: windowTo.toISOString(),
      totalLast30d: aggregate.totalLast30d,
      successRateLast30d: successRate(
        aggregate.completedLast30d,
        aggregate.terminalLast30d,
      ),
      activeNow: aggregate.activeNow,
      topTaskTypeLast30d: aggregate.topTaskTypeLast30d,
    };

    this.cache.set(key, {
      expiresAt: now.getTime() + RUNS_SUMMARY_CACHE_TTL_MS,
      value,
    });
    return value;
  }

  /** Testy D-80 — czyszczenie między case’ami. */
  clearCache(): void {
    this.cache.clear();
  }
}
```

**DoD kroku:**

- Admin → scope pusty; user/guest → własne id.
- `successRateLast30d === 0` przy `terminalLast30d === 0`.
- Drugi `execute` w TTL nie woła ponownie `aggregateSummary` (unit w KROK 5).
- Parametr `now` (opcjonalny) ułatwia test TTL bez fake timers na całego Nest.

---

### KROK 4 — HTTP `GET summary` + wire modułu

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Trasa chroniona cookie + `@AllowGuest`, przed `:runId`. K-2k / R-13.7.

**Artefakty:**

- Zmiana: `apps/api/src/runs/runs.controller.ts`
- Zmiana: `apps/api/src/runs/runs.module.ts`

#### Controller — inject + trasa

**teraz** (konstruktor — fragment z `listRunsUser`):

```typescript
    private readonly listRuns: ListRunsUseCase,
    private readonly listRunsUser: ListRunsUserUseCase,
    private readonly rateRun: RateRunUseCase,
```

**zamień na:**

```typescript
    private readonly listRuns: ListRunsUseCase,
    private readonly listRunsUser: ListRunsUserUseCase,
    private readonly getRunsSummary: GetRunsSummaryUseCase,
    private readonly rateRun: RateRunUseCase,
```

Dodaj import: `import { GetRunsSummaryUseCase } from './application/get-runs-summary.use-case';`

**teraz** (trasa `user/:userId` — wstaw **przed** nią lub zaraz po liście `GET()`, **zawsze przed** `@Get(':runId')`):

```typescript
  @AllowGuest()
  @Get('user/:userId')
  async getRunsByUser(
```

**zamień na** (dodaj `summary` **przed** `user/:userId` — obie statyczne przed `:runId`):

```typescript
  @AllowGuest()
  @Get('summary')
  getSummary(@CurrentUser() user: AuthUserContext) {
    return this.getRunsSummary.execute(user);
  }

  @AllowGuest()
  @Get('user/:userId')
  async getRunsByUser(
```

#### Module providers

**teraz** (`runs.module.ts` — fragment providers):

```typescript
    ListRunsUseCase,
    ListRunsUserUseCase,
    RateRunUseCase,
```

**zamień na:**

```typescript
    ListRunsUseCase,
    ListRunsUserUseCase,
    GetRunsSummaryUseCase,
    RateRunUseCase,
```

Import `GetRunsSummaryUseCase` jak pozostałe use-case’y.

**DoD kroku:**

- `GET /api/v1/runs/summary` → 200 z shape (przy sesji).
- Bez cookie → 401 (global auth).
- Guest bez `@AllowGuest` byłby 403 — tu dekorator **jest**.
- Nest nie myli `summary` z `:runId` (smoke w KROK 5).

---

### KROK 5 — Unit + e2e D-78…D-81 + Postman smoke

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pokrycie `SPEC-TESTY.md` D-78…D-81 / DoD R-13. Warstwa: unit use-case + integration/e2e HTTP.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/get-runs-summary.use-case.spec.ts`
- Nowy: `apps/api/test/runs-summary.e2e-spec.ts`
- Zmiana (opcjonalny smoke): `apps/api/test/postman/demo-guest.postman-collection.json` **lub** krótka nota w README kolekcji — pełne D-* = Jest

#### Unit — pełny szkic pliku

`apps/api/src/runs/application/get-runs-summary.use-case.spec.ts`:

```typescript
import { createUserId } from '@content-chain/shared';
import type { RunRepository, RunSummaryAggregate } from '../domain/run.port';
import {
  GetRunsSummaryUseCase,
  RUNS_SUMMARY_CACHE_TTL_MS,
} from './get-runs-summary.use-case';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

function unusedRepo(overrides: Partial<RunRepository>): RunRepository {
  return overrides as RunRepository;
}

const admin: AuthUserContext = {
  id: createUserId('usr_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  email: 'admin@test',
  role: 'admin',
};

const user: AuthUserContext = {
  id: createUserId('usr_bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  email: 'user@test',
  role: 'user',
};

const emptyAgg: RunSummaryAggregate = {
  totalLast30d: 0,
  completedLast30d: 0,
  terminalLast30d: 0,
  activeNow: 0,
  topTaskTypeLast30d: null,
};

describe('GetRunsSummaryUseCase', () => {
  it('returns successRate 0 when no terminal runs (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const now = new Date('2026-07-14T12:00:00.000Z');
    const result = await uc.execute(admin, now);
    expect(result.successRateLast30d).toBe(0);
    expect(result.topTaskTypeLast30d).toBeNull();
    expect(result.windowTo).toBe(now.toISOString());
  });

  it('computes successRate among terminal with one decimal (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue({
      totalLast30d: 4,
      completedLast30d: 3,
      terminalLast30d: 4,
      activeNow: 1,
      topTaskTypeLast30d: 'post_ideas',
    } satisfies RunSummaryAggregate);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const result = await uc.execute(user);
    expect(result.successRateLast30d).toBe(75);
    expect(result.topTaskTypeLast30d).toBe('post_ideas');
    expect(aggregateSummary).toHaveBeenCalledWith(
      { startedByUserId: user.id },
      expect.any(Date),
      expect.any(Date),
    );
  });

  it('admin scope has no startedByUserId filter (D-78)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    await uc.execute(admin);
    expect(aggregateSummary).toHaveBeenCalledWith(
      {},
      expect.any(Date),
      expect.any(Date),
    );
  });

  it('caches response for TTL 60s (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const t0 = new Date('2026-07-14T12:00:00.000Z');
    await uc.execute(admin, t0);
    await uc.execute(
      admin,
      new Date(t0.getTime() + RUNS_SUMMARY_CACHE_TTL_MS - 1),
    );
    expect(aggregateSummary).toHaveBeenCalledTimes(1);
    await uc.execute(
      admin,
      new Date(t0.getTime() + RUNS_SUMMARY_CACHE_TTL_MS + 1),
    );
    expect(aggregateSummary).toHaveBeenCalledTimes(2);
  });
});
```

Dopisz osobny unit (w tym samym pliku lub `prisma-run.adapter.aggregate-summary.spec.ts`) na remis `topTaskType` w adapterze, jeśli e2e nie seeduje remisu — **preferuj** unit z fake `prisma.run.groupBy` zwracającym dwa typy z tym samym `_count` i różnym `_max.createdAt`.

#### E2E — szkic `runs-summary.e2e-spec.ts`

Wzór setupu jak `runs-list.e2e-spec.ts` / `demo-guest.e2e-spec.ts` (`deployTestDb`, `createAuthenticatedAgent`, wipe runs). Minimalne case’y:

1. **D-78:** `request(app).get('/api/v1/runs/summary').expect(401)`; admin agent → **200**, shape kluczy, `typeof successRateLast30d === 'number'`; seed cudzego runu usera → admin `totalLast30d` ≥ 1.
2. **D-79:** zarejestruj/zaloguj `user` (jak w `runs-list` — invite/register path istniejący w suite); seed runów admin + user; user summary **nie** liczy runów admina (`totalLast30d` tylko własne).
3. **D-80:** seed tylko `failed`/`cancelled` (0 completed) → `successRateLast30d === 0`; seed `running` poza oknem daty (stary `createdAt`) → nadal w `activeNow`; opcjonalnie remis taskType w unit adaptera.
4. **D-81:** w suite z `DEMO_MODE=true` (jak `demo-guest.e2e-spec.ts`): guest `GET /summary` → **200**, tylko własne; osobny test / suite z demo off + JWT guest → **401** (może już pokryte GuestGuard — dopisz asercję na `/runs/summary` jeśli brak).

Seed Prisma `run.create` — te same pola obowiązkowe co w D-55 e2e (`id`, `conversationId`, `taskType`, `platform`, `language`, `status`, `brief`, `startedByUserId`).

#### Postman

W `demo-guest.postman-collection.json` (folder Allow): request `GET {{baseUrl}}/api/v1/runs/summary` → asercja **200** + obecność pól shape. Admin smoke: w `auth` / `review` kolekcji albo nota: *pełne D-78…D-81 = Jest e2e*.

**DoD kroku:**

- D-78…D-81 pokryte warstwą adekwatną (unit + e2e).
- Brak migracji; regresja listy / detail / guest archive (D-55) nietknięta semantycznie.
- `pnpm --filter api test` (unit) + e2e summary zielone lokalnie wg repo.

---

#### Propozycja commit message

```text
feat(runs): add GET /runs/summary KPI aggregate with scoped cache

Expose rolling 30-day metrics for account KPI cards without a schema migration; cache responses for 60s per auth scope.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| K-2k / docs shape | 200: `windowFrom`/`windowTo`/`totalLast30d`/`successRateLast30d`/`activeNow`/`topTaskTypeLast30d` |
| R-13 scope | admin=instancja; user/guest=własne; guest∧demo |
| R-13 metryki | successRate 0 bez terminalnych; remis topTaskType → max createdAt; activeNow bez 30d |
| Cache | TTL 60 s (unit) |
| DTO shared | import z `@content-chain/shared` |
| Bez migracji | brak nowego pliku w `prisma/migrations` |
| D-78…D-81 | unit + e2e |
| Trasa | `summary` przed `:runId` |
| Nagłówki planu | wyłącznie `FAZA` / `KROK` |
| Helper plans | brak odwołań do `*-plan.md` w rootcie |
| Major nietknięty | ten plik nie edytuje major |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja major | Po implementacji tego planu |
|---------------|-----------------------------|
| Faza 24 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 24 | **nie tworzyć** / nie oznaczać |
| Fazy 1–23 / MILESTONE 1–6 / 4.2 / 4.3 | bez zmian historii |

Edycja statusów major — **poza** tą sesją (ręcznie lub przy `/feature-implementation` na życzenie użytkownika).
