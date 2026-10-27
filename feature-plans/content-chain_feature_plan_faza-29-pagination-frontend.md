# Content Chain — feature plan: paginacja HTTP listingów FE (Faza 29)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-29-pagination-frontend.md`  
**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 29** (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 29) — tabele **Runy** / **Użytkownicy** / **Konto (Moje runy)** zawsze wołają API z `page` + `pageSize` (domyślnie 10); kontrolki Poprzednia / `strona / totalPages (total)` / Następna **oraz** select **10 / 15 / 25 / 50**; `total` z envelope; **zakaz** FE-slice; OwnRuns / floating / select opinii = GET user **bez** parametrów.  
**Źródła:** `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-8 / F-9, `SPEC-RUNY.md` R-3a / R-3c, `SPEC-AUTH.md` A-10b, `SPEC-TESTY.md` (T-7 — automaty FE poza MVP), major FE Faza 29.  
**Skill UI:** `content-chain-product-ui` — Design Read: *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; paginacja = pasek kontrolek + NativeSelect, bez bento / pill clusters.*  
**Numer FE 29 ≠ BE 28** — kontrakt api = `content-chain-backend_major_plan.md` Faza 28 (+ HOW w `feature-plans/content-chain_feature_plan_faza-28-pagination.md`).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 29 majoru FE |
| Major | Faza 29 (gate); HOW: KROK 1–5 poniżej |
| Poza zakresem | Implementacja api / Prisma; infinite scroll / cursor; zmiana filtrów archiwum poza spięciem z `page`/`pageSize`; MILESTONE 29; przepisywanie Fazy 3 / 6 / 16 / 28 (`WYKONANY`); Playwright jako suite |
| Zależność BE | `content-chain-backend_major_plan.md` **Faza 28** — opcjonalna paginacja trzech GET + allowlista + envelope; eksport `PAGE_SIZES` / `PageSize` / `DEFAULT_PAGE_SIZE` z `@content-chain/shared`. **Przed** merge FE: shared + endpointy w trybie stron muszą działać |
| Pass rozwojowy | shared/kontrolki → API → Runy → Moje runy → Users; **brak** przesunięć między fazami major |
| Po implementacji (informacyjnie) | Major FE: Faza 29 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 29) |

**Refaktor względem (historia, bez edycji `WYKONANY`):** Faza 3 / Krok 3.5 (archiwum — stałe HTTP `pageSize=10` bez selectu); Faza 3 / Moje runy (pełny GET + FE-slice); Faza 6 / 16 (Users bez wymogu paginacji HTTP / selectu).

**Mapa major → ten plik**

| Major (gate) | Feature | Zakres |
|--------------|---------|--------|
| Select + kontrolki + HTTP | FAZA 1 / KROK 1–2 | UI wspólny + klienci API |
| Runy tabela | FAZA 1 / KROK 3 | `ArchiveRunsView` |
| Moje runy (zakaz FE-slice) | FAZA 1 / KROK 4 | `MyRunsList` vs OwnRuns |
| Users tabela | FAZA 1 / KROK 5 | `UsersView` |

**Pass rozwojowy (sesja planu):**

1. Allowlista / helper / pasek kontrolek **przed** widokami.
2. Klienty API z `page`+`pageSize` **oraz** zachowanie wywołań bez parametrów **przed** refaktorem widoków.
3. Runy (już HTTP page) → dodanie `pageSize` / select.
4. Moje runy — oddzielenie tabeli od OwnRuns (największy refaktor; zależy od `fetchUserRunsPage`).
5. Users na końcu (ten sam pasek + `fetchUsersPage`).
6. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack FE: Next.js **16.3.0**, React **19.2.8**, Tailwind v4, istniejący `NativeSelect` / `Button` / `FormField` — **bez** nowych paczek, **bez** shadcn `Select` (w repo jest `native-select.tsx`).
- Allowlista `pageSize`: **10 \| 15 \| 25 \| 50** — wyłącznie z `@content-chain/shared` (`PAGE_SIZES`, `PageSize`, `DEFAULT_PAGE_SIZE = 10`, `DEFAULT_PAGE = 1`). **Nie** duplikować literałów allowlisty w FE poza importem.
- Tabele **zawsze** wysyłają **oba** query `page` i `pageSize` (tryb stron). **Nigdy** nie wołają listingu tabeli bez parametrów.
- OwnRuns (`fetchUserRuns`), floating box, select opinii (`useOwnRuns`), filtr inicjatorów archiwum (`fetchUsers` / `fetchInitiatorOptions`) — **bez** `page`/`pageSize` (tryb cała kolekcja po stronie api).
- `total` / `page` / `pageSize` w UI = z envelope odpowiedzi (nie `items.length` jako `total` w trybie stron).
- Zmiana `pageSize` → **reset `page=1`**.
- `totalPages = max(1, ceil(total / pageSize))` przy `pageSize > 0`; przy `total === 0` pokazuj `1 / 1 (0)` jak dziś archiwum.
- Typy: bez `any` / `@ts-ignore`; `import type` dla typów; branded `UserId` / `RunId` bez zmian.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.
- Visual: dziedziczenie locku Fazy 22–23; pasek paginacji = gęsty rząd kontrolek (`tabular-nums`), nie karty.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| `useEffect` + race fetch | Context7 `/reactjs/react.dev` (Synchronizing with Effects) | Flaga `ignore` / `cancelled` w cleanup — ignoruj wynik po unmount / zmianie deps | Jak w `ArchiveRunsView` dziś (`cancelled`); to samo w Moje runy / Users page load |
| `NativeSelect` | lokalny `apps/frontend/src/shared/ui/native-select.tsx` | Native `<select>` + focus ring teal | Select `pageSize` **tylko** przez `NativeSelect` (jak filtry archiwum) |
| `@content-chain/shared` pagination | BE Faza 28 / plan `faza-28-pagination` | `PAGE_SIZES`, `PageSize`, `DEFAULT_*`, `PaginatedList<T>` | FE importuje stałe/typy; envelope FE może zostać lokalnym typem mirror (`ArchiveRunsPage` itd.) albo aliasem `PaginatedList<…>` — w HOW: alias gdzie naturalny |

---

## FAZA 1 — Paginacja HTTP listingów (Runy / Users / Moje runy)

Odpowiada major FE Faza 29 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Helper + pasek kontrolek paginacji

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna powierzchnia UI dla trzech tabel (Poprzednia / meta / Następna / select rozmiaru). Major Faza 29; `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-8; product-ui (density, NativeSelect).

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/shared/pagination/page-size.ts` | **nowy** — re-export / helper `totalPages` |
| `apps/frontend/src/shared/pagination/list-pagination-bar.tsx` | **nowy** — kompletny komponent |

#### Nowy plik — pełny kod

`apps/frontend/src/shared/pagination/page-size.ts`:

```typescript
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  isPageSize,
  type PageSize,
} from '@content-chain/shared';

export { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, isPageSize, type PageSize };

/** `totalPages` z envelope; pusta kolekcja → 1 (jak archiwum Runy). */
export function totalPagesFromMeta(total: number, pageSize: number): number {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(total / pageSize));
}
```

`apps/frontend/src/shared/pagination/list-pagination-bar.tsx`:

```tsx
'use client';

import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form-field';
import { NativeSelect } from '@/shared/ui/native-select';
import {
  PAGE_SIZES,
  isPageSize,
  type PageSize,
} from '@/shared/pagination/page-size';

const SELECT_LIST_CLASS = '[&_option]:bg-popover';

type ListPaginationBarProps = {
  readonly page: number;
  readonly pageSize: PageSize;
  readonly total: number;
  readonly totalPages: number;
  readonly disabled?: boolean;
  readonly onPageChange: (page: number) => void;
  readonly onPageSizeChange: (pageSize: PageSize) => void;
  readonly sizeSelectId: string;
};

export function ListPaginationBar({
  page,
  pageSize,
  total,
  totalPages,
  disabled = false,
  onPageChange,
  onPageSizeChange,
  sizeSelectId,
}: ListPaginationBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 text-sm">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Poprzednia
        </Button>
        <p className="tabular-nums text-muted-foreground">
          {page} / {totalPages} ({total})
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Następna
        </Button>
      </div>
      <FormField label="Na stronie" htmlFor={sizeSelectId} className="mb-0 min-w-28">
        <NativeSelect
          id={sizeSelectId}
          className={SELECT_LIST_CLASS}
          value={String(pageSize)}
          disabled={disabled}
          onChange={(event) => {
            const raw = Number(event.target.value);
            if (isPageSize(raw)) {
              onPageSizeChange(raw);
            }
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </NativeSelect>
      </FormField>
    </div>
  );
}
```

**Uwagi UI:** label **„Na stronie”** nad selectem (FormField); meta `page / totalPages (total)` w `tabular-nums`; **bez** kart / pill clusters.

**Testy:** brak suite FE (T-7). DoD: kompilacja + użycie w KROK 3–5.

**DoD kroku:**

- Pliki istnieją; import `PAGE_SIZES` wyłącznie z shared (przez `page-size.ts`).
- `ListPaginationBar` nie woła API.
- Zmiana selectu woła tylko `onPageSizeChange` (reset `page` robi rodzic).

---

### KROK 2 — Klienci API: `page` + `pageSize` vs tryb bez parametrów

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Warstwa `runs.api` / `users.api` + parsery envelope pod tabele; zachować wywołania bez query dla OwnRuns / inicjatorów. Major Faza 29; R-3a / R-3c / A-10b; F-8.

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/runs/api/runs.types.ts` | typ `UserRunsPage` + `parseUserRunsPage` |
| `apps/frontend/src/modules/runs/api/runs.api.ts` | `pageSize` w archiwum; `fetchUserRunsPage` |
| `apps/frontend/src/modules/users/api/users.types.ts` | typ `UsersPage` + `parseUsersPage` |
| `apps/frontend/src/modules/users/api/users.api.ts` | `fetchUsersPage` |

#### Refaktor — `runs.types.ts`

**Dopisz** obok `ArchiveRunsPage` / `parseArchiveRunsPage`:

```typescript
export type UserRunsPage = {
  readonly items: readonly UserRunItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
};

export function parseUserRunsPage(value: unknown): UserRunsPage {
  if (
    !isRecord(value) ||
    !Array.isArray(value.items) ||
    typeof value.page !== 'number' ||
    typeof value.pageSize !== 'number' ||
    typeof value.total !== 'number'
  ) {
    throw new Error('Invalid user runs page payload');
  }
  return {
    items: value.items.map(parseUserRunItem),
    page: value.page,
    pageSize: value.pageSize,
    total: value.total,
  };
}
```

`parseUserRunList` **zostaje** (OwnRuns — czyta `items`; po BE envelope ma też meta, parser ignoruje nadmiar).

#### Refaktor — `runs.api.ts`

**teraz** (`ArchiveRunsQuery` + `fetchArchiveRuns`):

```typescript
export type ArchiveRunsQuery = {
  readonly page: number;
  readonly status: readonly ('completed' | 'failed' | 'cancelled')[];
  readonly taskType?: RunTaskType;
  readonly platform?: RunPlatform;
  readonly userId?: UserId;
};

export async function fetchArchiveRuns(query: ArchiveRunsQuery): Promise<ArchiveRunsPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('status', query.status.join(','));
  // ... filtry ...
  const body = await apiFetch(`/runs?${params.toString()}`);
  return parseArchiveRunsPage(body);
}
```

**zamień na:**

```typescript
import type { PageSize } from '@/shared/pagination/page-size';
import {
  parseArchiveRunsPage,
  parseUserRunList,
  parseUserRunsPage,
  // ...pozostałe jak dziś...
  type ArchiveRunsPage,
  type UserRunItem,
  type UserRunsPage,
} from '@/modules/runs/api/runs.types';

export type ArchiveRunsQuery = {
  readonly page: number;
  readonly pageSize: PageSize;
  readonly status: readonly ('completed' | 'failed' | 'cancelled')[];
  readonly taskType?: RunTaskType;
  readonly platform?: RunPlatform;
  readonly userId?: UserId;
};

/** OwnRuns / floating / opinia — bez parametrów paginacji (tryb cała kolekcja). */
export async function fetchUserRuns(userId: UserId): Promise<readonly UserRunItem[]> {
  const body = await apiFetch(`/runs/user/${userId}`);
  return parseUserRunList(body);
}

export type UserRunsPageQuery = {
  readonly page: number;
  readonly pageSize: PageSize;
};

/** Tabela Moje runy — zawsze page + pageSize. */
export async function fetchUserRunsPage(
  userId: UserId,
  query: UserRunsPageQuery,
): Promise<UserRunsPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('pageSize', String(query.pageSize));
  const body = await apiFetch(`/runs/user/${userId}?${params.toString()}`);
  return parseUserRunsPage(body);
}

export async function fetchArchiveRuns(query: ArchiveRunsQuery): Promise<ArchiveRunsPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('pageSize', String(query.pageSize));
  params.set('status', query.status.join(','));
  if (query.taskType) params.set('taskType', query.taskType);
  if (query.platform) params.set('platform', query.platform);
  if (query.userId) params.set('userId', query.userId);
  const body = await apiFetch(`/runs?${params.toString()}`);
  return parseArchiveRunsPage(body);
}
```

`fetchInitiatorOptions` nadal: `fetchUsers()` **bez** query.

#### Refaktor — `users.types.ts`

**Dopisz:**

```typescript
export type UsersPage = {
  readonly items: readonly UserListItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
};

export function parseUsersPage(value: unknown): UsersPage {
  if (
    !isRecord(value) ||
    !Array.isArray(value.items) ||
    typeof value.page !== 'number' ||
    typeof value.pageSize !== 'number' ||
    typeof value.total !== 'number'
  ) {
    throw new Error('Invalid users page payload');
  }
  return {
    items: value.items.map(parseUserListItem),
    page: value.page,
    pageSize: value.pageSize,
    total: value.total,
  };
}
```

`parseUserList` **zostaje** dla `fetchUsers()` (inicjatorzy).

#### Refaktor — `users.api.ts`

**teraz:**

```typescript
export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}
```

**zamień na / dopisz:**

```typescript
import type { PageSize } from '@/shared/pagination/page-size';
import {
  parseUserList,
  parseUsersPage,
  type UserListItem,
  type UsersPage,
} from '@/modules/users/api/users.types';

/** Inicjatorzy archiwum / tryb cała kolekcja — bez page/pageSize. */
export async function fetchUsers(): Promise<readonly UserListItem[]> {
  const body = await apiFetch('/users');
  return parseUserList(body);
}

export type UsersPageQuery = {
  readonly page: number;
  readonly pageSize: PageSize;
};

/** Tabela Użytkownicy — zawsze page + pageSize. */
export async function fetchUsersPage(query: UsersPageQuery): Promise<UsersPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('pageSize', String(query.pageSize));
  const body = await apiFetch(`/users?${params.toString()}`);
  return parseUsersPage(body);
}
```

**DoD kroku:**

- Archiwum **musi** dostać `pageSize` w typie query (kompilator złamie stare wywołania → KROK 3).
- `fetchUserRuns` / `fetchUsers` **bez** query string paginacji.
- `fetchUserRunsPage` / `fetchUsersPage` zawsze ustawiają oba parametry.
- Parsery stron wymagają `page` / `pageSize` / `total` (liczby).

---

### KROK 3 — Runy: `ArchiveRunsView` + select `pageSize`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Archiwum zawsze wysyła `page`+`pageSize`; select 10/15/25/50; reset strony przy zmianie rozmiaru / filtrów. Major Faza 29; F-8 Runy; refaktor względem Fazy 3 / 3.5 (stałe 10).

**Artefakty:** `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`

#### Refaktor — stan query

**teraz** (fragment):

```typescript
type ArchiveQueryState = {
  page: number;
  statusFilter: StatusFilter;
  taskType: RunTaskType | '';
  platform: RunPlatform | '';
  userId: UserId | '';
};

type ArchiveQueryAction =
  | { type: 'setPage'; page: number }
  | { type: 'setStatusFilter'; statusFilter: StatusFilter }
  // ...
```

**zamień na:**

```typescript
import { ListPaginationBar } from '@/shared/pagination/list-pagination-bar';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  totalPagesFromMeta,
  type PageSize,
} from '@/shared/pagination/page-size';

type ArchiveQueryState = {
  page: number;
  pageSize: PageSize;
  statusFilter: StatusFilter;
  taskType: RunTaskType | '';
  platform: RunPlatform | '';
  userId: UserId | '';
};

type ArchiveQueryAction =
  | { type: 'setPage'; page: number }
  | { type: 'setPageSize'; pageSize: PageSize }
  | { type: 'setStatusFilter'; statusFilter: StatusFilter }
  | { type: 'setTaskType'; taskType: RunTaskType | '' }
  | { type: 'setPlatform'; platform: RunPlatform | '' }
  | { type: 'setUserId'; userId: UserId | '' };

const INITIAL_ARCHIVE_QUERY: ArchiveQueryState = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  statusFilter: 'all',
  taskType: '',
  platform: '',
  userId: '',
};
```

W reducerze:

```typescript
case 'setPageSize':
  return { ...state, pageSize: action.pageSize, page: DEFAULT_PAGE };
```

(istniejące case’y filtrów nadal `page: 1` / `DEFAULT_PAGE`).

#### Refaktor — fetch

**teraz:** `fetchArchiveRuns({ page, status, ... })` bez `pageSize`; deps `[page, platform, …]`.

**zamień na:** przekaż `pageSize`; deps **+ `pageSize`**.

```typescript
const data = await fetchArchiveRuns({
  page,
  pageSize,
  status:
    statusFilter === 'all'
      ? (['completed', 'failed', 'cancelled'] as const)
      : ([statusFilter] as const),
  ...(taskType === '' ? {} : { taskType }),
  ...(platform === '' ? {} : { platform }),
  ...(userId === '' ? {} : { userId }),
});
```

```typescript
const { page, pageSize, statusFilter, taskType, platform, userId } = query;
// ...
}, [page, pageSize, platform, statusFilter, taskType, userId]);
```

#### Refaktor — stopka paginacji

**teraz:** lokalne przyciski Poprzednia/Następna bez selectu.

**zamień na:**

```tsx
{result ? (
  <ListPaginationBar
    sizeSelectId="archive-page-size"
    page={page}
    pageSize={pageSize}
    total={result.total}
    totalPages={totalPagesFromMeta(result.total, result.pageSize)}
    disabled={loading}
    onPageChange={(next) => dispatchQuery({ type: 'setPage', page: next })}
    onPageSizeChange={(next) => dispatchQuery({ type: 'setPageSize', pageSize: next })}
  />
) : null}
```

Meta w pasku: lokalny `page` / wyliczone `totalPages` / `result.total` (spójne z dotychczasowym `result.page` przy zgodnym API). Preferuj `result.page` tylko jeśli zawsze === state — tu state jest źródłem requestu; wyświetlaj **`page`** ze state (jak dziś dla disabled Prev).

**DoD kroku:**

- Network: `GET /runs?...&page=&pageSize=` zawsze przy loadzie tabeli.
- Select 10/15/25/50; zmiana → `page=1` i nowy request.
- Filtry nadal resetują `page`.
- Odświeżanie 15 min bez zmian semantyki.
- `fetchInitiatorOptions` / `fetchUsers()` bez paginacji — bez regresji.

---

### KROK 4 — Moje runy: HTTP zamiast FE-slice; OwnRuns bez parametrów

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Tabela na Koncie = `fetchUserRunsPage`; **usunąć** `items.slice(...)`; OwnRuns nadal `fetchUserRuns` bez query (live / floating / opinia). Major Faza 29; F-8 Konto; R-3c; refaktor względem Fazy 3 Moje runy.

**Artefakty:** `apps/frontend/src/modules/runs/components/my-runs-list.tsx` (główny); `own-runs-provider.tsx` **bez** zmian kontraktu fetch (weryfikacja: nadal `fetchUserRuns(userId)`).

#### Zachowanie (kontrakt UI)

1. State lokalny: `page`, `pageSize`, wynik strony (`items` / `total` / loading / error).
2. `useSession` → `userId`; brak userId → nic / loading.
3. `useOwnRuns` **zostaje** do: `patchStatus` po Cancel, `refresh()` po Cancel, **overlay statusu** live na wierszach bieżącej strony (`runId` → status z OwnRuns gdy ready).
4. Po starcie runu formularz woła `OwnRuns.refresh` — tabela **dopina** refetch strony gdy OwnRuns przejdzie na `ready` z inną „sygnaturą” zbioru `runId` (np. `items.map(i => i.runId).join()`), **albo** jawny refetch w `useEffect` zależny od tej sygnatury + `page`/`pageSize`. Status-only SSE: wystarczy overlay (bez pełnego refetch).
5. **Zakaz** `state.items.slice` jako paginacji.

#### Implementacja — pełny zamiennik pliku

`apps/frontend/src/modules/runs/components/my-runs-list.tsx`:

```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { RunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { CancelRunDialog } from '@/modules/runs/components/cancel-run-dialog';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchUserRunsPage } from '@/modules/runs/api/runs.api';
import {
  isCancelableRunStatus,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';
import { RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
import { ListPaginationBar } from '@/shared/pagination/list-pagination-bar';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  totalPagesFromMeta,
  type PageSize,
} from '@/shared/pagination/page-size';

type MyRunsListProps = {
  readonly onPrefill: (runId: RunId) => void;
};

type PageState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly code: string; readonly message: string }
  | {
      readonly status: 'ready';
      readonly items: readonly UserRunItem[];
      readonly total: number;
      readonly pageSize: number;
    };

const FALLBACK = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
} as const;

export function MyRunsList({ onPrefill }: MyRunsListProps) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const { state: ownState, patchStatus, refresh } = useOwnRuns();
  const [cancelTarget, setCancelTarget] = useState<RunId | null>(null);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);
  const [list, setList] = useState<PageState>({ status: 'loading' });

  const ownRunIdsKey =
    ownState.status === 'ready' ? ownState.items.map((item) => item.runId).join(',') : ownState.status;

  const ownStatusById = useMemo(() => {
    const map = new Map<RunId, UserRunItem['status']>();
    if (ownState.status === 'ready') {
      for (const item of ownState.items) {
        map.set(item.runId, item.status);
      }
    }
    return map;
  }, [ownState]);

  useEffect(() => {
    if (!userId) return;
    const id = userId;
    let cancelled = false;
    async function load(): Promise<void> {
      setList((current) =>
        current.status === 'ready' ? current : { status: 'loading' },
      );
      try {
        const data = await fetchUserRunsPage(id, { page, pageSize });
        if (cancelled) return;
        if (data.total > 0 && data.items.length === 0 && page > 1) {
          setPage((current) => Math.max(DEFAULT_PAGE, current - 1));
          return;
        }
        setList({
          status: 'ready',
          items: data.items,
          total: data.total,
          pageSize: data.pageSize,
        });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setList({
            status: 'error',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        setList({ status: 'error', ...FALLBACK });
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [userId, page, pageSize, ownRunIdsKey]);

  if (!userId || list.status === 'loading') {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }
  if (list.status === 'error') {
    return <EnvelopeError code={list.code} message={list.message} />;
  }
  if (list.total === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Brak własnych runów. Uruchom pierwszy z formularza powyżej.
      </p>
    );
  }

  const totalPages = totalPagesFromMeta(list.total, list.pageSize);
  const rows = list.items.map((item) => {
    const liveStatus = ownStatusById.get(item.runId);
    return liveStatus && liveStatus !== item.status
      ? { ...item, status: liveStatus }
      : item;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Typ</th>
              <th className="py-2 pr-3 font-medium">Platforma</th>
              <th className="py-2 pr-3 font-medium">Status</th>
              <th className="py-2 pr-3 font-medium">Utworzono</th>
              <th className="py-2 font-medium">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((item) => (
              <tr key={item.runId}>
                <td className="py-2 pr-3">
                  <Link href={`/runs/${item.runId}`} className="underline-offset-4 hover:underline">
                    {RUN_TASK_TYPE_LABELS[item.taskType]}
                  </Link>
                </td>
                <td className="py-2 pr-3">{RUN_PLATFORM_LABELS[item.platform]}</td>
                <td className="py-2 pr-3">
                  <RunStatusView status={item.status} compact />
                </td>
                <td className="py-2 pr-3">
                  <IsoDateTime iso={item.createdAt} />
                </td>
                <td className="py-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {isCancelableRunStatus(item.status) ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCancelTarget(item.runId)}
                      >
                        Stop
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onPrefill(item.runId)}
                    >
                      Nowy z tym briefem
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ListPaginationBar
        sizeSelectId="my-runs-page-size"
        page={page}
        pageSize={pageSize}
        total={list.total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setPage(DEFAULT_PAGE);
        }}
      />
      <CancelRunDialog
        open={cancelTarget !== null}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
        runId={cancelTarget}
        onCancelled={(snapshot) => {
          patchStatus(snapshot.runId, snapshot.status);
          void refresh();
        }}
      />
    </div>
  );
}
```

**Uwagi:**

- `ownRunIdsKey` w deps refetchuje przy nowym/usuniętym runie w OwnRuns (start / terminal poza stroną), **nie** przy samym `patchStatus` tego samego id (klucz bez statusu) — live status = overlay.
- Po Cancel: `refresh()` OwnRuns zmienia status w mapie; pełny refetch strony też nastąpi jeśli zmieni się zbiór id (np. nie) — overlay wystarczy dla `cancelled`; opcjonalnie po `onCancelled` wymuś lokalny reload przez `setPage((p) => p)` lub licznik — **w implementacji:** po `refresh()` wywołaj też lekkie `setList` reload: najprościej dodać `const [reloadToken, setReloadToken] = useState(0)` i `setReloadToken((n) => n + 1)` w `onCancelled`, token w deps effectu (zalecane doprecyzowanie przy kodowaniu, jeśli overlay + grace cancel nie odświeża wiersza wystarczająco).
- **OwnRunsProvider:** zero zmian ścieżki URL (nadal bez query).

**DoD kroku:**

- DevTools: tabela → `GET /runs/user/:id?page=&pageSize=`; OwnRuns / floating → `GET /runs/user/:id` **bez** tych query.
- Brak `.slice` na liście OwnRuns w `my-runs-list.tsx`.
- Select + kontrolki jak Runy; zmiana `pageSize` → `page=1`.
- Stop / prefill / badge statusu bez regresji; opinia nadal z OwnRuns.

---

### KROK 5 — Użytkownicy: `UsersView` + `fetchUsersPage`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Sekcja „Konta” = paginacja HTTP + select; zaproszenia bez zmian (pełna lista invites). Major Faza 29; F-8 Users; A-10b; refaktor względem Fazy 6 / 16.

**Artefakty:** `apps/frontend/src/modules/users/components/users-view.tsx`

#### Refaktor — stan list

**teraz:** `users: readonly UserListItem[] | null` ładowane przez `fetchUsers()` w `reload` razem z invites.

**zamień na (kształt):**

```typescript
import { fetchUsersPage } from '@/modules/users/api/users.api';
import { ListPaginationBar } from '@/shared/pagination/list-pagination-bar';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  totalPagesFromMeta,
  type PageSize,
} from '@/shared/pagination/page-size';
import type { UsersPage } from '@/modules/users/api/users.types';

type AdminListsState = {
  usersPage: UsersPage | null;
  invites: readonly InvitationListItem[] | null;
  loadError: ErrorObject | null;
};

// + lokalnie:
const [page, setPage] = useState(DEFAULT_PAGE);
const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);
```

`reload` / effect:

- Invites: `fetchInvitations()` jak dziś (może zostać w `reload` po mutacjach invite).
- Users: **osobny** load zależny od `[page, pageSize]` (+ token po mutacji konta).

Przykład rozdzielenia:

```typescript
const loadInvites = useCallback(async (): Promise<void> => { /* fetchInvitations → setLists */ }, []);

useEffect(() => {
  let cancelled = false;
  async function loadUsers(): Promise<void> {
    try {
      const next = await fetchUsersPage({ page, pageSize });
      if (cancelled) return;
      if (next.total > 0 && next.items.length === 0 && page > 1) {
        setPage((current) => Math.max(DEFAULT_PAGE, current - 1));
        return;
      }
      setLists((prev) => ({ ...prev, usersPage: next, loadError: null }));
    } catch (reason: unknown) {
      if (cancelled) return;
      const nextError = reason instanceof ApiError ? reason.envelope : FALLBACK;
      setLists((prev) => ({ ...prev, loadError: nextError }));
    }
  }
  void loadUsers();
  return () => {
    cancelled = true;
  };
}, [page, pageSize, usersReloadToken]);
```

Po `AccountActionDialog` `onSuccess`: zwiększ `usersReloadToken` (i ewentualnie zostaw invites).  
Po invite/resend/revoke: przeładuj invites; users page **bez** wymogu resetu (chyba że produktowo chcesz odświeżyć — odśwież token users też OK).

#### Refaktor — render sekcji Konta

Zamiast `users.map` na pełnej tablicy:

```tsx
<section className="flex flex-col gap-3">
  <h2 className="text-base font-medium">Konta</h2>
  {usersPage.total === 0 ? (
    <p className="text-sm text-muted-foreground">Brak kont do wyświetlenia.</p>
  ) : (
    <>
      <div className="overflow-x-auto">{/* tabela usersPage.items — kolumny/Akcje bez zmian */}</div>
      <ListPaginationBar
        sizeSelectId="users-page-size"
        page={page}
        pageSize={pageSize}
        total={usersPage.total}
        totalPages={totalPagesFromMeta(usersPage.total, usersPage.pageSize)}
        disabled={pending}
        onPageChange={setPage}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setPage(DEFAULT_PAGE);
        }}
      />
    </>
  )}
</section>
```

Skeleton / error: jak dziś, ale warunek `usersPage === null`.

**DoD kroku:**

- Network tabela Konta: `GET /users?page=&pageSize=`.
- Inicjatorzy archiwum nadal `GET /users` bez query (`fetchUsers`).
- Select + kontrolki; Akcje / dialogi bez regresji.
- Pusta strona po usunięciu ostatniego wiersza → zejście o 1 page (guard w loaderze).

---

#### Propozycja commit message

```text
feat(frontend): paginate Runy, Users, and Moje runy over HTTP

Drive listing tables with page+pageSize and a shared size select; keep OwnRuns and initiator fetches on the full-collection mode.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica Faza 29 | Trzy tabele + select + zakaz FE-slice + OwnRuns bez params |
| docs / SPEC | Zgodność z `ux_dashboard` + F-8; R-3a/R-3c/A-10b |
| Shared allowlista | Import z `@content-chain/shared` (po BE Faza 28) |
| Race fetch | Flaga `cancelled` / `ignore` (React docs) |
| product-ui | NativeSelect + pasek; bez nowej palety |
| Testy FE | Poza MVP (T-7) — brak wymogu Playwright w DoD |
| Major nietknięty | Ten skill nie edytuje major |
| Zależność BE | FE nie merge’ować na produkcję bez api trybu stron |

**Checklist ręczny (po implementacji):**

1. Runy: zmiana „Na stronie” → request z nowym `pageSize`, `page=1`.
2. Moje runy: DevTools dwa kształty URL (tabela vs OwnRuns).
3. Users: paginacja Kont; invites pełna lista.
4. Guest/user/admin: authz listingów bez regresji (api).

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| `content-chain-frontend_major_plan.md` Faza 29 | `WYKONANY` |
| MILESTONE 29 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy 3 / 6 / 16 / 28 FE | bez zmian statusów (historia) |
| Backend Faza 28 | osobny tor — musi być gotowa pod kontrakt; ten plan FE jej **nie** oznacza |

Edycja major / statusów = **poza** tą sesją feature-planu (ręcznie lub przy `/feature-implementation` na życzenie).
