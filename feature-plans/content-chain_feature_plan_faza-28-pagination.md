# Content Chain — feature plan: opcjonalna paginacja listingów (Faza 28)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-28-pagination.md`  
**Kotwica major:** Faza 28 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 28).  
**Numer BE 28 ≠ FE 29** — konsumpcja UI Runy / Users / Moje runy = `content-chain-frontend_major_plan.md` Faza 29 / `SPEC-FRONTEND.md` F-8 (poza tym wycinkiem).  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`, `docs/dictionary.md`, `docs/anty_patterny.md`, `SPEC-RUNY.md` R-3a / R-3c, `SPEC-AUTH.md` A-10b, `SPEC-KOMUNIKACJA.md` K-2a / K-2b / K-2j, `SPEC-TESTY.md` D-82…D-85 (D-28 uściślone), major Faza 28.  
**Kolejność** `KROK`**:** shared → resolver/DTO → Runs port+Prisma → Runs HTTP → Users → testy (pass rozwojowy).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 28 majoru backend: opcjonalna paginacja `GET /api/v1/runs`, `GET /api/v1/runs/user/:userId`, `GET /api/v1/users` — tryb all vs strona, allowlista `pageSize`, envelope, **bez** migracji Prisma |
| Major | Faza 28; start po Fazach 1–27 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 28 |
| Poza zakresem | UI / major FE Faza 29; cursor / infinite scroll; inne listingi HTTP; zmiana semantyki filtrów `GET /runs` poza spięciem z paginacją; MILESTONE 28; przepisywanie Faz 10 / 21 |
| Po implementacji (informacyjnie) | Major: Faza 28 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 28. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW) | Feature | Zakres |
|-------------|---------|--------|
| Walidacja query + envelope | FAZA 1 / KROK 1–2 | shared + DTO / resolver |
| Adapter / use-case count+slice / all | FAZA 1 / KROK 3–5 | Runs + Users |
| Testy kontraktu D-82…D-85 | FAZA 1 / KROK 6 | e2e + unit + Postman |
| DTO shared | FAZA 1 / KROK 1 | `@content-chain/shared` |

**Pass rozwojowy (sesja planu):**

1. Allowlista + typ envelope w shared **przed** DTO / portami.
2. Resolver trybu + DTO query **przed** adapterami / use-case’ami (wykrywanie „brak parametrów” wymaga **usunięcia** defaultu `page = 1` z DTO).
3. Port Runs + Prisma **przed** use-case / controller Runs.
4. Users po wspólnym resolverze (ten sam kontrakt paginacji).
5. Testy na końcu (w tym odwrócenie historycznego e2e: `pageSize=50` → **200**, nie 400).
6. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma **6**, Zod 4 w api (ten wycinek: walidacja query = **class-validator** jak istniejące DTO list; **bez** nowego Zod body), monorepo `packages/shared`.
- `tsconfig` **bez** zmian. Typy jawne na granicach; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- **Allowlista `pageSize`:** wyłącznie **10 \| 15 \| 25 \| 50**. W tym **`50` jest legalne** → **200** (D-83). **400** `VALIDATION_FAILED` tylko poza allowlistą (np. `11`, `20`, `100`) albo zły `page` (nie-integer / `< 1` / nieparsowalny) albo obce pole (`limit` — `forbidNonWhitelisted`).
- **Tryb all:** brak **obu** query `page` i `pageSize` → cała kolekcja (po filtrach) w envelope `{ items, page, pageSize, total }` z `page=1`, `pageSize=total`, `total=N`; pusta kolekcja → `total=0`, `pageSize=0`, `page=1` (D-82).
- **Tryb stron:** obecność `page` **i/lub** `pageSize` → brakujące = default `page=1`, `pageSize=10`; `items.length ≤ pageSize`; `total` = liczność po filtrach (nie tylko strona).
- Authz listingów **bez zmian** (R-3a guest showcase; R-3c `:userId` = sesja; A-10b admin).
- Users: sort odpowiedzi **`createdAt` desc** (A-10b / D-85) — refaktor względem obecnego Prisma `orderBy: { createdAt: 'asc' }`.
- Refaktor względem historii (bez edycji statusów major): Faza 10 / R-3a stałe `pageSize=10`; R-3c pełna lista bez envelope meta; Faza 21 Users bez trybu stron.
- Breaking addytywny dla klientów: `GET /runs/user/:userId` i `GET /users` **zyskują** `page` / `pageSize` / `total` w JSON (dotąd często tylko `{ items }`). FE Faza 29 dostosuje tabele; istniejący FE parsujący tylko `items` nadal działa przy trybie all (bez parametrów) — poza zakresem tego planu.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| class-validator `@IsIn` | Context7 `/typestack/class-validator` | `IsIn(values)` — wartość musi być `===` elementowi tablicy | `@IsIn([...PAGE_SIZES])` na `pageSize` po `@Type(() => Number)` + `@IsInt()` |
| Nest `ValidationPipe` | konwencja repo `configure-http-app.ts` | `whitelist` + `forbidNonWhitelisted` + `transform` | Obce `limit` nadal **400**; `pageSize` **musi** być polem DTO (inaczej każde `pageSize` = 400) |
| Prisma 6 `skip`/`take`/`count` | konwencja `PrismaRunAdapter.list` | Klasyczny Client API | Tryb stron: `count` + `findMany({ skip, take })`; tryb all: `findMany` bez skip/take + `total = items.length` (albo równoległy `count`) |
| Wykrywanie trybu all | SPEC R-3a / D-82 | Brak **obu** parametrów | DTO: **bez** property default `page = 1`; resolver: `page === undefined && pageSize === undefined` → `mode: 'all'` |

---

## FAZA 1 — Opcjonalna paginacja trzech listingów

Odpowiada major Faza 28 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Allowlista + envelope w `@content-chain/shared`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wspólny kontrakt typów dla api i FE (Faza 29): stałe allowlisty + generyczny envelope. Major Faza 28 / HOW „DTO shared”; `SPEC-RUNY.md` R-3a; `SPEC-AUTH.md` A-10b.

**Artefakty:**

- Nowy: `packages/shared/src/pagination.ts`
- Zmiana: `packages/shared/src/index.ts`

#### Nowy plik — pełny kod

`packages/shared/src/pagination.ts`:

```typescript
/** Allowlista `pageSize` — R-3a / R-3c / A-10b / K-2a / K-2b / K-2j. */
export const PAGE_SIZES = [10, 15, 25, 50] as const;

export type PageSize = (typeof PAGE_SIZES)[number];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE: PageSize = 10;

export function isPageSize(value: unknown): value is PageSize {
  return (
    typeof value === 'number' &&
    (PAGE_SIZES as readonly number[]).includes(value)
  );
}

/**
 * Envelope listingu z opcjonalną paginacją (oba tryby: all i strona).
 * `pageSize` w trybie all = `total` (w tym 0 przy pustej kolekcji).
 */
export type PaginatedList<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
```

**teraz** (`packages/shared/src/index.ts`):

```typescript
export * from './branded/brand';
export * from './branded/ids';
export * from './branded/enums';
export * from './runs/runs-summary';
```

**zamień na:**

```typescript
export * from './branded/brand';
export * from './branded/ids';
export * from './branded/enums';
export * from './runs/runs-summary';
export * from './pagination';
```

**DoD kroku:**

- `PAGE_SIZES` / `PageSize` / `PaginatedList` / defaulty eksportowane z `@content-chain/shared`.
- `isPageSize(50) === true`; `isPageSize(11) === false`.
- Build `packages/shared` przechodzi.

---

### KROK 2 — Resolver trybu + DTO query (wspólne api)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna semantyka „all vs strona” + walidacja HTTP `page`/`pageSize` na trzech GET. Usunąć default `page = 1` z `ListRunsQueryDto` (inaczej ValidationPipe/transform zawsze ustawia stronę → niemożliwy tryb all). `SPEC-KOMUNIKACJA.md` K-2a; D-82 / D-83.

**Artefakty:**

- Nowy: `apps/api/src/shared/http/pagination.ts`
- Nowy: `apps/api/src/shared/http/pagination-query.dto.ts`
- Nowy: `apps/api/src/shared/http/pagination.spec.ts`
- Zmiana: `apps/api/src/runs/http/dto/list-runs-query.dto.ts`

#### Nowy plik — pełny kod

`apps/api/src/shared/http/pagination.ts`:

```typescript
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  type PageSize,
  type PaginatedList,
} from '@content-chain/shared';

export type PaginationMode =
  | { mode: 'all' }
  | { mode: 'page'; page: number; pageSize: PageSize };

export type PaginationQueryFields = {
  page?: number;
  pageSize?: number;
};

/**
 * Brak obu parametrów → tryb all.
 * Obecność page i/lub pageSize → tryb stron (defaulty SPEC).
 * Wywoływać **po** ValidationPipe (pageSize już ∈ allowlisty gdy podane).
 */
export function resolvePaginationMode(
  query: PaginationQueryFields,
): PaginationMode {
  if (query.page === undefined && query.pageSize === undefined) {
    return { mode: 'all' };
  }
  return {
    mode: 'page',
    page: query.page ?? DEFAULT_PAGE,
    pageSize: (query.pageSize ?? DEFAULT_PAGE_SIZE) as PageSize,
  };
}

export function paginationMeta(
  mode: PaginationMode,
  total: number,
): Pick<PaginatedList<unknown>, 'page' | 'pageSize' | 'total'> {
  if (mode.mode === 'all') {
    return { page: DEFAULT_PAGE, pageSize: total, total };
  }
  return { page: mode.page, pageSize: mode.pageSize, total };
}

export function prismaPageArgs(mode: PaginationMode): {
  skip?: number;
  take?: number;
} {
  if (mode.mode === 'all') {
    return {};
  }
  return {
    skip: (mode.page - 1) * mode.pageSize,
    take: mode.pageSize,
  };
}
```

`apps/api/src/shared/http/pagination-query.dto.ts`:

```typescript
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { PAGE_SIZES, type PageSize } from '@content-chain/shared';

/**
 * Opcjonalne `page` / `pageSize` — **bez** property defaultów
 * (defaulty tylko w `resolvePaginationMode` przy trybie stron).
 */
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([...PAGE_SIZES])
  pageSize?: PageSize;
}
```

`apps/api/src/shared/http/pagination.spec.ts`:

```typescript
import {
  paginationMeta,
  prismaPageArgs,
  resolvePaginationMode,
} from './pagination';

describe('resolvePaginationMode', () => {
  it('returns all when both page and pageSize are absent', () => {
    expect(resolvePaginationMode({})).toEqual({ mode: 'all' });
  });

  it('defaults page=1 when only pageSize is set', () => {
    expect(resolvePaginationMode({ pageSize: 25 })).toEqual({
      mode: 'page',
      page: 1,
      pageSize: 25,
    });
  });

  it('defaults pageSize=10 when only page is set', () => {
    expect(resolvePaginationMode({ page: 2 })).toEqual({
      mode: 'page',
      page: 2,
      pageSize: 10,
    });
  });

  it('accepts pageSize=50 (allowlist max)', () => {
    expect(resolvePaginationMode({ page: 1, pageSize: 50 })).toEqual({
      mode: 'page',
      page: 1,
      pageSize: 50,
    });
  });
});

describe('paginationMeta', () => {
  it('sets pageSize=total in all mode including empty', () => {
    expect(paginationMeta({ mode: 'all' }, 0)).toEqual({
      page: 1,
      pageSize: 0,
      total: 0,
    });
    expect(paginationMeta({ mode: 'all' }, 12)).toEqual({
      page: 1,
      pageSize: 12,
      total: 12,
    });
  });

  it('echoes page mode args and total', () => {
    expect(
      paginationMeta({ mode: 'page', page: 2, pageSize: 15 }, 40),
    ).toEqual({ page: 2, pageSize: 15, total: 40 });
  });
});

describe('prismaPageArgs', () => {
  it('omits skip/take in all mode', () => {
    expect(prismaPageArgs({ mode: 'all' })).toEqual({});
  });

  it('computes skip/take in page mode', () => {
    expect(
      prismaPageArgs({ mode: 'page', page: 3, pageSize: 10 }),
    ).toEqual({ skip: 20, take: 10 });
  });
});
```

#### Refaktor `ListRunsQueryDto`

**teraz** (`apps/api/src/runs/http/dto/list-runs-query.dto.ts` — fragment klasy):

```typescript
export class ListRunsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseStatusQuery(value))
  // ... status, taskType, platform, userId bez pageSize
}
```

**zamień na:**

```typescript
import { PaginationQueryDto } from '../../../shared/http/pagination-query.dto';

export class ListRunsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseStatusQuery(value))
  @IsArray()
  @ArrayUnique()
  @IsIn([...RUN_STATUSES], { each: true })
  status?: RunStatus[];

  @IsOptional()
  @IsIn([...RUN_TASK_TYPES])
  taskType?: (typeof RUN_TASK_TYPES)[number];

  @IsOptional()
  @IsIn([...RUN_PLATFORMS])
  platform?: (typeof RUN_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  userId?: string;
}
```

(Usunąć lokalne dekoratory `page` oraz nieużywane importy `Min` jeśli niepotrzebne; zachować `parseStatusQuery` i importy filtrów.)

**DoD kroku:**

- Unit `pagination.spec.ts` zielony.
- `ListRunsQueryDto` dziedziczy `page`/`pageSize` **bez** defaultu property.
- `pageSize=50` przechodzi walidację DTO; `pageSize=11` → `VALIDATION_FAILED` (pokrycie w KROK 6).

---

### KROK 3 — Runs: port + Prisma (list + listByUser)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Adapter egzekwuje tryb all vs strona; `listByUser` zwraca envelope (nie gołą tablicę). R-3a / R-3c.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.ts`
- Dotknięte mocki portu w `*.spec.ts` (sygnatura `listByUser`) — tylko dostosowanie typów / stubów

#### Refaktor portu

**teraz** (`run.port.ts` — fragment):

```typescript
export const PAGE_SIZE = 10;

export type ListRunsQuery = {
  page: number;
  status?: RunStatus[];
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

// w RunRepository:
list(query: ListRunsQuery): Promise<ListRunsResult>;
listByUser(userId: UserId): Promise<LightRunItem[]>;
```

**zamień na:**

```typescript
import type { PaginationMode } from '../../shared/http/pagination';
import type { PageSize } from '@content-chain/shared';

/** @deprecated Użyj DEFAULT_PAGE_SIZE z shared — alias pod istniejące importy w trakcie migracji KROK 4. */
export const PAGE_SIZE = 10;

export type ListRunsQuery = {
  pagination: PaginationMode;
  status?: RunStatus[];
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: number;
  total: number;
};

export type ListLightRunsResult = {
  items: LightRunItem[];
  page: number;
  pageSize: number;
  total: number;
};

// w RunRepository:
list(query: ListRunsQuery): Promise<ListRunsResult>;
listByUser(
  userId: UserId,
  pagination: PaginationMode,
): Promise<ListLightRunsResult>;
```

(`PageSize` import tylko jeśli użyty w pliku; w przeciwnym razie pomiń.)

#### Refaktor `PrismaRunAdapter.list`

**teraz:**

```typescript
async list(query: ListRunsQuery): Promise<ListRunsResult> {
  const page = query.page ?? 1;
  const where = { /* filtry */ };
  const [total, rows] = await this.prisma.$transaction([
    this.prisma.run.count({ where }),
    this.prisma.run.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        startedBy: { select: { id: true, email: true, role: true } },
      },
    }),
  ]);
  return {
    items: rows.map((row) => this.toSnapshot(row)),
    page,
    pageSize: PAGE_SIZE,
    total,
  };
}
```

**zamień na:**

```typescript
async list(query: ListRunsQuery): Promise<ListRunsResult> {
  const where = {
    ...(query.status && query.status.length > 0
      ? { status: { in: query.status } }
      : {}),
    ...(query.taskType ? { taskType: query.taskType } : {}),
    ...(query.platform ? { platform: query.platform } : {}),
    ...(query.userId ? { startedByUserId: query.userId } : {}),
  };
  const pageArgs = prismaPageArgs(query.pagination);
  const [total, rows] = await this.prisma.$transaction([
    this.prisma.run.count({ where }),
    this.prisma.run.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...pageArgs,
      include: {
        startedBy: { select: { id: true, email: true, role: true } },
      },
    }),
  ]);
  const meta = paginationMeta(query.pagination, total);
  return {
    items: rows.map((row) => this.toSnapshot(row)),
    ...meta,
  };
}
```

(Import `paginationMeta`, `prismaPageArgs` z `shared/http/pagination`; usunąć użycie stałej `PAGE_SIZE` w `skip`/`take`.)

#### Refaktor `listByUser`

**teraz:**

```typescript
async listByUser(userId: UserId): Promise<LightRunItem[]> {
  const rows = await this.prisma.run.findMany({
    where: { startedByUserId: userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      taskType: true,
      platform: true,
      language: true,
      status: true,
      createdAt: true,
    },
  });
  return rows.map((row) => toLightRunItem(row));
}
```

**zamień na:**

```typescript
async listByUser(
  userId: UserId,
  pagination: PaginationMode,
): Promise<ListLightRunsResult> {
  const where = { startedByUserId: userId };
  const pageArgs = prismaPageArgs(pagination);
  const [total, rows] = await this.prisma.$transaction([
    this.prisma.run.count({ where }),
    this.prisma.run.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...pageArgs,
      select: {
        id: true,
        taskType: true,
        platform: true,
        language: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);
  const meta = paginationMeta(pagination, total);
  return {
    items: rows.map((row) => toLightRunItem(row)),
    ...meta,
  };
}
```

**DoD kroku:**

- `list` / `listByUser` respektują `PaginationMode`; meta zgodna z `paginationMeta`.
- Typecheck api: stuby `listByUser` w specach przyjmują drugi argument (można `jest.fn()` / `unexpected` bez zmian ciała).

---

### KROK 4 — Runs HTTP: ListRuns + ListRunsUser + controller

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Use-case’y i HTTP zawsze zwracają envelope; controller mapuje DTO → `pagination` + filtry. R-3a / R-3c / K-2a / K-2b.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/list-runs.use-case.ts`
- Zmiana: `apps/api/src/runs/application/list-runs-user.use-case.ts`
- Zmiana: `apps/api/src/runs/runs.controller.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts`

#### Refaktor `ListRunsUseCase`

**teraz:**

```typescript
async execute(query: ListRunsQuery): Promise<ListRunsOutput> {
  const result = await this.runs.list(query);
  return {
    items: result.items.map(/* ... */),
    page: result.page,
    pageSize: PAGE_SIZE,
    total: result.total,
  };
}
```

**zamień na:**

```typescript
async execute(query: ListRunsQuery): Promise<ListRunsOutput> {
  const result = await this.runs.list(query);
  return {
    items: result.items.map((item) => ({
      runId: item.id,
      taskType: item.taskType,
      platform: item.platform,
      contentKind: item.contentKind,
      language: item.language,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
      startedBy: item.startedBy,
    })),
    page: result.page,
    pageSize: result.pageSize,
    total: result.total,
  };
}
```

(Usunąć import / hardcode `PAGE_SIZE` z odpowiedzi.)

#### Refaktor `ListRunsUserUseCase`

**teraz:**

```typescript
export type ListRunsUserOutput = {
  items: ListRunsUserItem[];
};

async execute(
  userId: UserId,
  requestingUser: AuthUserContext,
): Promise<ListRunsUserOutput> {
  if (userId !== requestingUser.id) {
    throw new DomainException(/* FORBIDDEN */);
  }
  const items = await this.runs.listByUser(userId);
  return {
    items: items.map(/* ISO */),
  };
}
```

**zamień na:**

```typescript
import type { PaginationMode } from '../../shared/http/pagination';

export type ListRunsUserOutput = {
  items: ListRunsUserItem[];
  page: number;
  pageSize: number;
  total: number;
};

async execute(
  userId: UserId,
  requestingUser: AuthUserContext,
  pagination: PaginationMode,
): Promise<ListRunsUserOutput> {
  if (userId !== requestingUser.id) {
    throw new DomainException(
      'FORBIDDEN',
      'Access to other user runs is forbidden',
      403,
    );
  }
  const result = await this.runs.listByUser(userId, pagination);
  return {
    items: result.items.map((item) => ({
      runId: item.runId,
      taskType: item.taskType,
      platform: item.platform,
      language: item.language,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
    })),
    page: result.page,
    pageSize: result.pageSize,
    total: result.total,
  };
}
```

#### Refaktor `RunsController`

**teraz** (`list` + `getRunsByUser`):

```typescript
@Get()
list(@Query() query: ListRunsQueryDto): Promise<unknown> {
  if (query.userId && !isUserId(query.userId)) {
    throw new BadRequestException('Invalid user ID format');
  }
  const command: ListRunsQuery = {
    page: query.page ?? 1,
    status: query.status,
    taskType: query.taskType,
    platform: query.platform,
    userId: query.userId ? createUserId(query.userId) : undefined,
  };
  return this.listRuns.execute(command);
}

@Get('user/:userId')
async getRunsByUser(
  @Param('userId') userId: string,
  @CurrentUser() user: AuthUserContext,
): Promise<ListRunsUserOutput> {
  if (!isUserId(userId)) {
    throw new BadRequestException('Invalid user ID format');
  }
  return this.listRunsUser.execute(createUserId(userId), user);
}
```

**zamień na:**

```typescript
import { resolvePaginationMode } from '../shared/http/pagination';
import { PaginationQueryDto } from '../shared/http/pagination-query.dto';

@Get()
list(@Query() query: ListRunsQueryDto): Promise<unknown> {
  if (query.userId && !isUserId(query.userId)) {
    throw new BadRequestException('Invalid user ID format');
  }
  const command: ListRunsQuery = {
    pagination: resolvePaginationMode(query),
    status: query.status,
    taskType: query.taskType,
    platform: query.platform,
    userId: query.userId ? createUserId(query.userId) : undefined,
  };
  return this.listRuns.execute(command);
}

@Get('user/:userId')
async getRunsByUser(
  @Param('userId') userId: string,
  @Query() query: PaginationQueryDto,
  @CurrentUser() user: AuthUserContext,
): Promise<ListRunsUserOutput> {
  if (!isUserId(userId)) {
    throw new BadRequestException('Invalid user ID format');
  }
  return this.listRunsUser.execute(
    createUserId(userId),
    user,
    resolvePaginationMode(query),
  );
}
```

#### Refaktor `runs.controller.spec.ts`

**teraz:**

```typescript
expect(listRuns.execute).toHaveBeenCalledWith({
  page: 2,
  status: ['completed'],
  taskType: 'post_ideas',
  platform: 'linkedin',
  userId: undefined,
});
// ...
const listed = { items: [] };
expect(listRunsUser.execute).toHaveBeenCalledWith(
  sessionUser.id,
  sessionUser,
);
```

**zamień na:**

```typescript
expect(listRuns.execute).toHaveBeenCalledWith({
  pagination: { mode: 'page', page: 2, pageSize: 10 },
  status: ['completed'],
  taskType: 'post_ideas',
  platform: 'linkedin',
  userId: undefined,
});
// getRunsByUser(sessionUser.id, {}, sessionUser) — pusty query → all
expect(listRunsUser.execute).toHaveBeenCalledWith(
  sessionUser.id,
  sessionUser,
  { mode: 'all' },
);
```

(Dostosować wywołania `controller.list` / `getRunsByUser` w specu do nowych sygnatur; dodać case z `pageSize: 50` → `pagination.pageSize === 50`.)

**DoD kroku:**

- `GET /runs` bez parametrów → envelope tryb all.
- `GET /runs/user/:userId` bez parametrów → envelope tryb all (live/select).
- `GET /runs?page=1&pageSize=50` → 200, `pageSize: 50`.
- Unit controller spec zielony.

---

### KROK 5 — Users: port + Prisma + use-case + controller

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `GET /users` = ten sam model paginacji + envelope; sort `createdAt` **desc**. A-10b / K-2j / D-85.

**Artefakty:**

- Zmiana: `apps/api/src/auth/domain/user-repository.port.ts`
- Zmiana: `apps/api/src/auth/infrastructure/persistence/prisma-user.adapter.ts`
- Zmiana: `apps/api/src/auth/application/list-users.use-case.ts`
- Zmiana: `apps/api/src/auth/users.controller.ts`
- Zmiana: `apps/api/src/auth/users.controller.spec.ts`

#### Refaktor portu Users

**teraz:**

```typescript
list(): Promise<AuthUser[]>;
```

**zamień na:**

```typescript
import type { PaginationMode } from '../../shared/http/pagination';

export type ListUsersResult = {
  items: AuthUser[];
  page: number;
  pageSize: number;
  total: number;
};

// w UserRepository:
list(pagination: PaginationMode): Promise<ListUsersResult>;
```

#### Refaktor Prisma `list`

**teraz:**

```typescript
async list(): Promise<AuthUser[]> {
  const rows = await this.prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return rows.map((row) => this.toUser(row));
}
```

**zamień na:**

```typescript
async list(pagination: PaginationMode): Promise<ListUsersResult> {
  const pageArgs = prismaPageArgs(pagination);
  const [total, rows] = await this.prisma.$transaction([
    this.prisma.user.count(),
    this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      ...pageArgs,
    }),
  ]);
  const meta = paginationMeta(pagination, total);
  return {
    items: rows.map((row) => this.toUser(row)),
    ...meta,
  };
}
```

#### Refaktor `ListUsersUseCase`

**teraz:**

```typescript
async execute(): Promise<{ items: UserListItem[] }> {
  const all = await this.users.list();
  return {
    items: all.map(/* pick fields */),
  };
}
```

**zamień na:**

```typescript
import type { PaginationMode } from '../../shared/http/pagination';

async execute(
  pagination: PaginationMode,
): Promise<{
  items: UserListItem[];
  page: number;
  pageSize: number;
  total: number;
}> {
  const result = await this.users.list(pagination);
  return {
    items: result.items.map(
      ({ id, email, role, isActive, verifiedAt, createdAt }) => ({
        id,
        email,
        role,
        isActive,
        verifiedAt,
        createdAt,
      }),
    ),
    page: result.page,
    pageSize: result.pageSize,
    total: result.total,
  };
}
```

#### Refaktor `UsersController`

**teraz:**

```typescript
@Get()
list() {
  return this.listUsers.execute();
}
```

**zamień na:**

```typescript
import { PaginationQueryDto } from '../shared/http/pagination-query.dto';
import { resolvePaginationMode } from '../shared/http/pagination';

@Get()
list(@Query() query: PaginationQueryDto) {
  return this.listUsers.execute(resolvePaginationMode(query));
}
```

#### Refaktor `users.controller.spec.ts`

**teraz:**

```typescript
await expect(controller.list()).resolves.toBe(payload);
expect(listUsers.execute).toHaveBeenCalledWith();
```

**zamień na:**

```typescript
const payload = {
  items: [userItem],
  page: 1,
  pageSize: 1,
  total: 1,
};
listUsers.execute.mockResolvedValue(payload);

await expect(controller.list({})).resolves.toBe(payload);
expect(listUsers.execute).toHaveBeenCalledWith({ mode: 'all' });
```

(Dodać case `list({ page: 1, pageSize: 25 })` → `mode: 'page', page: 1, pageSize: 25`.)

**DoD kroku:**

- `GET /users` bez parametrów → envelope all; z `pageSize=50` → 200.
- Sort desc (najnowsze pierwsze) — asercja w KROK 6.
- Authz admin bez regresji (403 user/guest).

---

### KROK 6 — Testy D-82…D-85 + regresje + Postman

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** DoD T-5 / D-82…D-85; regresja D-28; unieważnienie historycznego e2e „forbid `pageSize=50`”. `SPEC-TESTY.md`.

**Artefakty:**

- Zmiana: `apps/api/test/runs-list.e2e-spec.ts` (główne D-82 / D-83 / D-28; user-runs D-84)
- Nowy lub rozszerzenie: e2e Users (np. w `users-management.e2e-spec.ts` albo nowy `users-list.e2e-spec.ts`) — D-85
- Zmiana: `apps/api/test/postman/review.postman-collection.json` — R8/E12: asercja `page`/`pageSize`/`total` przy trybie all (bez parametrów)
- Opcjonalnie smoke w `auth.postman-collection.json` na `GET /users` envelope
- Unit już z KROK 2; controller specs z KROK 4–5

#### Refaktor krytyczny e2e (historyczny forbid)

**teraz** (`runs-list.e2e-spec.ts`):

```typescript
it('rejects client pageSize/limit override and invalid userId on the HTTP boundary', async () => {
  const pageSize = await agent
    .get('/api/v1/runs')
    .query({ pageSize: 50 })
    .expect(400);
  expect(pageSize.body.code).toBe('VALIDATION_FAILED');

  const limit = await agent
    .get('/api/v1/runs')
    .query({ limit: 20 })
    .expect(400);
  // ...
});
```

**zamień na:**

```typescript
it('accepts allowlisted pageSize and rejects invalid pagination / filters', async () => {
  const allowed = await agent
    .get('/api/v1/runs')
    .query({ page: 1, pageSize: 50 })
    .expect(200);
  const allowedBody = readListBody(allowed.body);
  expect(allowedBody.page).toBe(1);
  expect(allowedBody.pageSize).toBe(50);
  expect(allowedBody.items.length).toBeLessThanOrEqual(50);
  expect(typeof allowedBody.total).toBe('number');

  const forbiddenSize = await agent
    .get('/api/v1/runs')
    .query({ pageSize: 11 })
    .expect(400);
  expect(forbiddenSize.body.code).toBe('VALIDATION_FAILED');

  const limit = await agent
    .get('/api/v1/runs')
    .query({ limit: 20 })
    .expect(400);
  expect(limit.body.code).toBe('VALIDATION_FAILED');

  // ... zachować invalid userId / taskType / platform jak dziś
});
```

#### Szkic przypadków e2e (obowiązkowe)

| Id | Asercja |
|----|---------|
| D-82 | `GET /runs` bez `page`/`pageSize` → 200; `page===1`; `pageSize===total`; `items.length===total`; przy 0 runów `pageSize===0` |
| D-83 | `pageSize` ∈ {10,15,25,50} → 200; `50` **nie** 400; `11`/`100` → 400; `page=0` / `page=abc` → 400; regresja D-28 `status=completed,failed,cancelled&page=1&pageSize=10` |
| D-84 | `GET /runs/user/:id` bez params → envelope all; z params → strona; cudzy id → 403; light fields |
| D-85 | `GET /users` admin: all vs strona; allowlista; sort `createdAt` desc; user/guest → 403; brak sesji → 401 |

**Postman R8:** przy 200 bez query — `pm.expect(body).to.have.keys('items','page','pageSize','total')` (lub contain); `page === 1`; `pageSize === body.items.length` (tryb all). **Bez** wysyłania `page`/`pageSize` w R8 (select / live = tryb all).

**DoD kroku:**

- `pnpm --filter api test` + e2e list / users w zakresie D-82…D-85 zielone.
- Historyczne „`pageSize=50` → 400” **nie** istnieje.
- Postman R8 nie psuje się na nowym envelope.

---

#### Propozycja commit message

```text
feat(api): add optional pagination on runs and users listings

Allow pageSize 10|15|25|50 with all-collection mode when page and pageSize are omitted; always return { items, page, pageSize, total }.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| R-3a / K-2a | `GET /runs` all vs strona + allowlista + envelope |
| R-3c / K-2b | `GET /runs/user/:userId` ten sam model; authz 403 |
| A-10b / K-2j | `GET /users` envelope + sort desc |
| D-82…D-85 | e2e / Postman |
| D-28 | regresja filtra status + `pageSize=10` |
| `pageSize=50` | **200**, nie 400 (SPEC-TESTY D-83) |
| FE | poza zakresem (Faza 29) — kontrakt shared gotowy |
| Major | Faza 28 → `WYKONANY` dopiero po implementacji; **bez** MILESTONE 28 |

**Zgodność:** docs + SPEC wygrywają nad historycznym e2e i treścią Fazy 10 / 21 (`WYKONANY`).

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego planu |
|---------|------------------------------|
| Faza 28 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 28 | **nie oznaczać** (brak w majorze) |
| Faza 10 / 21 / MILESTONE 6 | bez zmian (`WYKONANY` / `OSIĄGNIĘTY`) |

---

## Checklist jakości planu

- [x] Nagłówki wyłącznie `FAZA` / `KROK`
- [x] Propozycja commit message (EN, Conventional Commits) na końcu FAZA 1
- [x] Kompletny kod nowych plików; refaktory jako `teraz` → `zamień na`
- [x] Pass rozwojowy opisany; brak przesunięć między fazami major
- [x] Bez odwołań do planów pomocniczych w rootcie
- [x] Major / docs / SPEC nietknięte w tej sesji
- [x] Statusy startowe `NIE_ROZPOCZĘTY`
- [x] Grandfathering docs: `docs/README.md` bez frontmatteru (sesja)
