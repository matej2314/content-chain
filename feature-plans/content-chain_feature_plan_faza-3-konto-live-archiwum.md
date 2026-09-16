# Content Chain — feature plan: Faza 3 (Konto, live, archiwum)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Konto (start + Moje runy), szczegóły live, floating box, archiwum Runy |
| Major | `content-chain-frontend_major_plan.md` — Faza 3 (kroki 3.1–3.5) + MILESTONE 3 |
| Bramka ścieżki wstecz | Spełniona przed wycinkiem zestawu (Faza 1 `WYKONANY`, MILESTONE 1 `OSIĄGNIĘTY`). Ten plik **zakłada zaimplementowany** `feature-plans/content-chain_feature_plan_faza-2-kontekst-bramka.md` (`CompletenessProvider` / `useCompleteness`). Milestone 2 jest wewnątrz wycinka zestawu. |
| Źródła | `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `docs/brand_types.md`, `spec/SPEC-FRONTEND.md` F-5/F-5a/F-7/F-8, `spec/SPEC-RUNY.md` R-3/R-3a/R-3c/R-3d, `spec/SPEC-KOMUNIKACJA.md` K-2/K-2a, `spec/SPEC-TESTY.md` T-7, skill `content-chain-product-ui` |
| Poza zakresem tego pliku | HITL/wynik (major Faza 4); email i opinia na Koncie (Faza 5); widok Użytkownicy (Faza 6); `conversationId` w UI; `selectedIdeaIds` na starcie; chip „w toku”; nowa paleta; BFF; implementacja api |
| Kontrakt archiwum | Backend Faza 10 / 10.3 jest `WYKONANY` w `content-chain-backend_major_plan.md`. FE woła `GET /runs?status=completed,failed`. Nota w majorze FE o 10.3 `NIE_ROZPOCZĘTY` jest nieaktualna względem kodu api. |
| Po implementacji (informacyjnie) | Major FE: Faza 3 i kroki 3.1–3.5 → `WYKONANY`; MILESTONE 3 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność `KROK` **≠** numeracja major 3.1→3.5. Mapowanie: KROK 1–2 fundament; KROK 3 ← 3.1; KROK 4 ← 3.3 (przesunięty przed 3.2); KROK 5 ← 3.2; KROK 6 ← 3.4; KROK 7 ← 3.5.

**Pass rozwojowy:** API runów i refcount SSE przed powierzchniami; status live jeden komponent; szczegóły przed listami, które do nich nawigują; `useCompleteness` z pliku 1 na CTA startu. Brak przenosin do innych faz majoru.

**HOW:** native `<select>` w rytmie `Input` (bez nowego DS). Filtr inicjatora archiwum: `GET /users` tylko jako źródło `{ id, email }` dla **admina**; to **nie** jest widok Użytkownicy. `user` widzi kolumnę inicjatora, bez tego selecta (endpoint jest `@Roles('admin')`).

**Design Read:** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Next.js **16.3.0**, `params: Promise<…>` (Context7 `/vercel/next.js/v16.2.9`: RSC `await params`; klient `use(params)`). Strona szczegółów: RSC → klient.
- `apiFetch` + cookie. EventSource same-origin `/api/v1/runs/:runId/events`, `withCredentials: true` (rejestr Fazy 1). **Nie** przez `apiFetch` (przeglądarkowe SSE).
- JSON → `unknown` → parser. `RunId` / `UserId` z `@content-chain/shared` (`createRunId` / `isRunId`). Zakaz `as RunId`.
- Rejestr Fazy 1 zamyka gniazdo przy każdym `release`. Ten plik dodaje **licznik refów**: Konto + szczegóły + box współdzielą jedno `EventSource` na `runId`.
- Live: `running` \| `awaiting_hitl` \| `interrupted`. `queued` / `completed` / `failed`: bez SSE. Po `run.completed` / `run.failed`: `release` → `close()`. Reconnect tylko przy zerwaniu, gdy status nadal live. `heartbeat` ignorować.
- `interrupted` ≠ `running` (copy i prezentacja). Reduced motion: `globals.css` już gasi animacje.
- Start: unia Zod api (Social: `platform`, `SocialBrief`; page: `contentKind`, `ContentBrief`). FE **nie** wysyła `selectedIdeaIds`. Po 202 zostajemy na `/account`.
- Testy FE poza MVP. Prettier jak w pliku 1.
- Copy UI bez myślnika em. Envelope as-is.

---

## FAZA 2 — Konto: start, live, szczegóły, archiwum

Odpowiada major **Faza 3**. Numer `FAZA 2` jest porządkowy w zestawie (plik 1 = `FAZA 1`).

### KROK 1 — Typy, parsery i API runów

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Granica FE dla list, snapshotu, startu i logów. Major 3.1–3.5 (fundament); `SPEC-RUNY.md` R-3a/R-3c/R-3d; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/api/runs.types.ts`
- Nowy: `apps/frontend/src/modules/runs/api/run-labels.ts`
- Nowy: `apps/frontend/src/modules/runs/api/runs.api.ts`

#### Nowy plik — `apps/frontend/src/modules/runs/api/runs.types.ts`

```ts
import {
  createRunId,
  createUserId,
  isContentKind,
  isContentLanguage,
  isContentTaskType,
  isRunId,
  isRunPlatform,
  isRunStatus,
  isRunTaskType,
  isSocialPlatform,
  isSocialTaskType,
  isUserId,
  type ContentKind,
  type ContentLanguage,
  type ContentTaskType,
  type RunId,
  type RunPlatform,
  type RunStatus,
  type RunTaskType,
  type SocialPlatform,
  type SocialTaskType,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const LIVE_RUN_STATUSES = ['running', 'awaiting_hitl', 'interrupted'] as const;
export type LiveRunStatus = (typeof LIVE_RUN_STATUSES)[number];

export function isLiveRunStatus(status: RunStatus): status is LiveRunStatus {
  return (LIVE_RUN_STATUSES as readonly RunStatus[]).includes(status);
}

export function isTerminalRunStatus(status: RunStatus): boolean {
  return status === 'completed' || status === 'failed';
}

export type SocialBrief = {
  readonly topic: string;
  readonly audience?: string;
  readonly goal?: string;
  readonly ideaCount?: number;
};

export type ContentBrief = {
  readonly topic: string;
  readonly audience?: string;
  readonly goal?: string;
  readonly angle?: string;
  readonly targetLength?: number;
};

export type RunBrief = SocialBrief | ContentBrief;

export type StartedBy = {
  readonly id: UserId;
  readonly email: string;
};

export type UserRunItem = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly language: ContentLanguage;
  readonly status: RunStatus;
  readonly createdAt: string;
};

export type ArchiveRunItem = UserRunItem & {
  readonly contentKind: ContentKind | null;
  readonly startedBy: StartedBy | null;
};

export type ArchiveRunsPage = {
  readonly items: readonly ArchiveRunItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
};

export type RunLogLevel = 'info' | 'warn' | 'error';

export type RunLogItem = {
  readonly at: string;
  readonly level: RunLogLevel;
  readonly message: string;
  readonly step?: string;
};

export type RunSnapshot = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly contentKind: ContentKind | null;
  readonly language: ContentLanguage;
  readonly brief: RunBrief;
  readonly status: RunStatus;
  readonly createdAt: string;
  readonly startedBy: StartedBy | null;
};

export type StartRunInput =
  | {
      readonly taskType: SocialTaskType;
      readonly platform: SocialPlatform;
      readonly language: ContentLanguage;
      readonly brief: SocialBrief;
    }
  | {
      readonly taskType: ContentTaskType;
      readonly contentKind: ContentKind;
      readonly language: ContentLanguage;
      readonly brief: ContentBrief;
    };

export type StartRunAccepted = {
  readonly runId: RunId;
  readonly status: 'queued' | 'running';
};

function parseOptionalString(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new Error('Invalid optional string');
  return value;
}

function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new Error('Invalid optional int');
  }
  return value;
}

export function parseStartedBy(value: unknown): StartedBy | null {
  if (value === null) return null;
  if (!isRecord(value) || typeof value.id !== 'string' || !isUserId(value.id)) {
    throw new Error('Invalid startedBy');
  }
  if (typeof value.email !== 'string' || value.email.length === 0) {
    throw new Error('Invalid startedBy.email');
  }
  return { id: createUserId(value.id), email: value.email };
}

export function parseSocialBrief(value: unknown): SocialBrief {
  if (!isRecord(value) || typeof value.topic !== 'string') {
    throw new Error('Invalid SocialBrief');
  }
  if (value.angle !== undefined || value.targetLength !== undefined) {
    throw new Error('Invalid SocialBrief');
  }
  const brief: SocialBrief = { topic: value.topic };
  const audience = parseOptionalString(value.audience);
  const goal = parseOptionalString(value.goal);
  const ideaCount = parseOptionalInt(value.ideaCount);
  return {
    ...brief,
    ...(audience !== undefined ? { audience } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(ideaCount !== undefined ? { ideaCount } : {}),
  };
}

export function parseContentBrief(value: unknown): ContentBrief {
  if (!isRecord(value) || typeof value.topic !== 'string') {
    throw new Error('Invalid ContentBrief');
  }
  if (value.ideaCount !== undefined) {
    throw new Error('Invalid ContentBrief');
  }
  const audience = parseOptionalString(value.audience);
  const goal = parseOptionalString(value.goal);
  const angle = parseOptionalString(value.angle);
  const targetLength = parseOptionalInt(value.targetLength);
  return {
    topic: value.topic,
    ...(audience !== undefined ? { audience } : {}),
    ...(goal !== undefined ? { goal } : {}),
    ...(angle !== undefined ? { angle } : {}),
    ...(targetLength !== undefined ? { targetLength } : {}),
  };
}

function parseBrief(taskType: RunTaskType, value: unknown): RunBrief {
  return isContentTaskType(taskType) ? parseContentBrief(value) : parseSocialBrief(value);
}

function parseRunCore(value: unknown): Omit<UserRunItem, never> {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    typeof value.taskType !== 'string' ||
    !isRunTaskType(value.taskType) ||
    typeof value.platform !== 'string' ||
    !isRunPlatform(value.platform) ||
    typeof value.language !== 'string' ||
    !isContentLanguage(value.language) ||
    typeof value.status !== 'string' ||
    !isRunStatus(value.status) ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid run item');
  }
  return {
    runId: createRunId(value.runId),
    taskType: value.taskType,
    platform: value.platform,
    language: value.language,
    status: value.status,
    createdAt: value.createdAt,
  };
}

export function parseUserRunItem(value: unknown): UserRunItem {
  return parseRunCore(value);
}

export function parseUserRunList(value: unknown): readonly UserRunItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid user runs payload');
  }
  return value.items.map(parseUserRunItem);
}

export function parseArchiveRunItem(value: unknown): ArchiveRunItem {
  const core = parseRunCore(value);
  if (!isRecord(value)) throw new Error('Invalid archive item');
  const contentKind =
    value.contentKind === null
      ? null
      : typeof value.contentKind === 'string' && isContentKind(value.contentKind)
        ? value.contentKind
        : (() => {
            throw new Error('Invalid contentKind');
          })();
  return { ...core, contentKind, startedBy: parseStartedBy(value.startedBy) };
}

export function parseArchiveRunsPage(value: unknown): ArchiveRunsPage {
  if (
    !isRecord(value) ||
    !Array.isArray(value.items) ||
    typeof value.page !== 'number' ||
    typeof value.pageSize !== 'number' ||
    typeof value.total !== 'number'
  ) {
    throw new Error('Invalid archive payload');
  }
  return {
    items: value.items.map(parseArchiveRunItem),
    page: value.page,
    pageSize: value.pageSize,
    total: value.total,
  };
}

export function parseRunSnapshot(value: unknown): RunSnapshot {
  const core = parseRunCore(value);
  if (!isRecord(value)) throw new Error('Invalid snapshot');
  const contentKind =
    value.contentKind === null
      ? null
      : typeof value.contentKind === 'string' && isContentKind(value.contentKind)
        ? value.contentKind
        : (() => {
            throw new Error('Invalid contentKind');
          })();
  return {
    ...core,
    contentKind,
    brief: parseBrief(core.taskType, value.brief),
    startedBy: parseStartedBy(value.startedBy),
  };
}

const LOG_LEVELS = ['info', 'warn', 'error'] as const satisfies readonly RunLogLevel[];

function isRunLogLevel(value: string): value is RunLogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}

export function parseRunLogItem(value: unknown): RunLogItem {
  if (
    !isRecord(value) ||
    typeof value.at !== 'string' ||
    typeof value.level !== 'string' ||
    !isRunLogLevel(value.level) ||
    typeof value.message !== 'string'
  ) {
    throw new Error('Invalid log item');
  }
  const item: RunLogItem = {
    at: value.at,
    level: value.level,
    message: value.message,
  };
  if (value.step === undefined) return item;
  if (typeof value.step !== 'string') throw new Error('Invalid log.step');
  return { ...item, step: value.step };
}

export function parseRunLogs(value: unknown): readonly RunLogItem[] {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error('Invalid logs payload');
  }
  return value.items.map(parseRunLogItem);
}

export function parseStartRunAccepted(value: unknown): StartRunAccepted {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    (value.status !== 'queued' && value.status !== 'running')
  ) {
    throw new Error('Invalid start run payload');
  }
  return { runId: createRunId(value.runId), status: value.status };
}

export function parseSseStatusData(value: unknown): { runId: RunId; status: RunStatus } {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    typeof value.status !== 'string' ||
    !isRunStatus(value.status)
  ) {
    throw new Error('Invalid SSE status');
  }
  return { runId: createRunId(value.runId), status: value.status };
}

export function omitEmptyBrief(brief: RunBrief): RunBrief {
  const topic = brief.topic.trim();
  const audience = brief.audience?.trim();
  const goal = brief.goal?.trim();
  if ('ideaCount' in brief) {
    return {
      topic,
      ...(audience ? { audience } : {}),
      ...(goal ? { goal } : {}),
      ...(brief.ideaCount !== undefined ? { ideaCount: brief.ideaCount } : {}),
    };
  }
  const angle = brief.angle?.trim();
  return {
    topic,
    ...(audience ? { audience } : {}),
    ...(goal ? { goal } : {}),
    ...(angle ? { angle } : {}),
    ...(brief.targetLength !== undefined ? { targetLength: brief.targetLength } : {}),
  };
}

export function startRunBody(input: StartRunInput): Record<string, unknown> {
  if (isContentTaskType(input.taskType)) {
    return {
      taskType: input.taskType,
      contentKind: input.contentKind,
      language: input.language,
      brief: omitEmptyBrief(input.brief),
    };
  }
  if (!isSocialTaskType(input.taskType)) {
    throw new Error('Invalid start taskType');
  }
  return {
    taskType: input.taskType,
    platform: input.platform,
    language: input.language,
    brief: omitEmptyBrief(input.brief),
  };
}
```

#### Nowy plik — `apps/frontend/src/modules/runs/api/run-labels.ts`

```ts
import type {
  ContentKind,
  ContentLanguage,
  RunPlatform,
  RunStatus,
  RunTaskType,
} from '@content-chain/shared';

export const RUN_TASK_TYPE_LABELS = {
  post_ideas: 'Pomysły na posty',
  post_content: 'Treść posta',
  post_ideas_then_content: 'Pomysły, potem treści',
  reel_ideas: 'Pomysły na rolki',
  reel_script: 'Scenariusz rolki',
  reel_ideas_then_scripts: 'Pomysły, potem scenariusze',
  page_copy: 'Copy strony',
  page_outline_then_copy: 'Outline, potem copy',
} as const satisfies Record<RunTaskType, string>;

export const RUN_PLATFORM_LABELS = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  web: 'Web',
} as const satisfies Record<RunPlatform, string>;

export const CONTENT_KIND_LABELS = {
  blog: 'Blog',
  service_page: 'Strona oferty',
  landing: 'Landing',
} as const satisfies Record<ContentKind, string>;

export const LANGUAGE_LABELS = {
  pl: 'Polski',
  en: 'English',
} as const satisfies Record<ContentLanguage, string>;

export const RUN_STATUS_LABELS = {
  queued: 'W kolejce',
  running: 'Trwa run',
  awaiting_hitl: 'Czeka na wybór',
  interrupted: 'Przerwany. Wznowienie przy wolnym slocie',
  completed: 'Zakończony',
  failed: 'Nieudany',
} as const satisfies Record<RunStatus, string>;

export const RUN_STATUS_SHORT_LABELS = {
  queued: 'W kolejce',
  running: 'Trwa run…',
  awaiting_hitl: 'Trwa run…',
  interrupted: 'Przerwany. Wznowienie przy wolnym slocie',
  completed: 'Zakończony',
  failed: 'Nieudany',
} as const satisfies Record<RunStatus, string>;
```

#### Nowy plik — `apps/frontend/src/modules/runs/api/runs.api.ts`

```ts
import {
  CONTENT_KINDS,
  CONTENT_LANGUAGES,
  RUN_PLATFORMS,
  RUN_TASK_TYPES,
  createUserId,
  isUserId,
  type ContentKind,
  type ContentLanguage,
  type RunId,
  type RunPlatform,
  type RunStatus,
  type RunTaskType,
  type UserId,
} from '@content-chain/shared';
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseArchiveRunsPage,
  parseRunLogs,
  parseRunSnapshot,
  parseStartRunAccepted,
  parseUserRunList,
  startRunBody,
  type ArchiveRunsPage,
  type RunLogItem,
  type RunSnapshot,
  type StartRunAccepted,
  type StartRunInput,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';

export async function fetchUserRuns(userId: UserId): Promise<readonly UserRunItem[]> {
  const body = await apiFetch(`/runs/user/${userId}`);
  return parseUserRunList(body);
}

export async function fetchRunSnapshot(runId: RunId): Promise<RunSnapshot> {
  const body = await apiFetch(`/runs/${runId}`);
  return parseRunSnapshot(body);
}

export async function fetchRunLogs(runId: RunId): Promise<readonly RunLogItem[]> {
  const body = await apiFetch(`/runs/${runId}/logs`);
  return parseRunLogs(body);
}

export async function startRun(input: StartRunInput): Promise<StartRunAccepted> {
  const body = await apiFetch('/runs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(startRunBody(input)),
  });
  return parseStartRunAccepted(body);
}

export type ArchiveRunsQuery = {
  readonly page: number;
  readonly status: readonly ('completed' | 'failed')[];
  readonly taskType?: RunTaskType;
  readonly platform?: RunPlatform;
  readonly userId?: UserId;
};

export async function fetchArchiveRuns(query: ArchiveRunsQuery): Promise<ArchiveRunsPage> {
  const params = new URLSearchParams();
  params.set('page', String(query.page));
  params.set('status', query.status.join(','));
  if (query.taskType) params.set('taskType', query.taskType);
  if (query.platform) params.set('platform', query.platform);
  if (query.userId) params.set('userId', query.userId);
  const body = await apiFetch(`/runs?${params.toString()}`);
  return parseArchiveRunsPage(body);
}

export type InitiatorOption = {
  readonly id: UserId;
  readonly email: string;
};

export async function fetchInitiatorOptions(): Promise<readonly InitiatorOption[]> {
  const body = await apiFetch('/users');
  if (!isRecord(body) || !Array.isArray(body.items)) {
    throw new Error('Invalid users payload');
  }
  return body.items.map((item) => {
    if (!isRecord(item) || typeof item.id !== 'string' || !isUserId(item.id)) {
      throw new Error('Invalid user item');
    }
    if (typeof item.email !== 'string' || item.email.length === 0) {
      throw new Error('Invalid user email');
    }
    return { id: createUserId(item.id), email: item.email };
  });
}

export const ARCHIVE_TASK_TYPES = RUN_TASK_TYPES;
export const ARCHIVE_PLATFORMS = RUN_PLATFORMS;
export const START_TASK_TYPES = RUN_TASK_TYPES;
export const START_LANGUAGES = CONTENT_LANGUAGES;
export const START_CONTENT_KINDS = CONTENT_KINDS;
```

`fetchInitiatorOptions`: `item.id` po `isUserId` jest `UserId`. Nie wołać z roli `user` (403). KROK 7 łapie `ApiError` 403 i ukrywa filtr.

Nie eksportuj zbędnych aliasów `ARCHIVE_*` jeśli używasz bezpośrednio stałych z shared w widokach.

**Biblioteki:** `apiFetch`. Query `status` przecinkowe (api 10.3).

**DoD (krok):** parsery pokrywają listę user, snapshot (w tym unię briefu), logi, 202 startu, archiwum z `pageSize`. Body startu bez `selectedIdeaIds` i bez XOR-obcych kluczy.

---

### KROK 2 — Status live i subskrypcja EventSource

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedno gniazdo na `runId`, wspólna prezentacja statusu, provider listy własnych runów. Major 3.3/3.4 (fundament); `SPEC-FRONTEND.md` F-5/F-5a.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/shell/event-source-registry.ts`
- Nowy: `apps/frontend/src/modules/runs/components/run-status.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/use-run-event-source.ts`
- Nowy: `apps/frontend/src/modules/runs/components/own-runs-provider.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx` (stan **po pliku 1**)

#### Refaktor — rejestr SSE (refcount)

Plik: `apps/frontend/src/modules/shell/event-source-registry.ts`.

**Teraz:**

```ts
  return {
    acquire(runId: RunId): EventSource {
      const existing = connections.get(runId);
      if (existing) return existing;
      const source = new EventSource(`/api/v1/runs/${runId}/events`, {
        withCredentials: true,
      });
      connections.set(runId, source);
      return source;
    },
    release(runId: RunId): void {
      const existing = connections.get(runId);
      if (!existing) return;
      existing.close();
      connections.delete(runId);
    },
```

(typ mapy: `Map<RunId, EventSource>`.)

**Zamień na:**

```ts
type RegistryEntry = {
  readonly source: EventSource;
  refs: number;
};

export function createEventSourceRegistry(): EventSourceRegistry {
  const connections = new Map<RunId, RegistryEntry>();

  return {
    acquire(runId: RunId): EventSource {
      const existing = connections.get(runId);
      if (existing) {
        existing.refs += 1;
        return existing.source;
      }
      const source = new EventSource(`/api/v1/runs/${runId}/events`, {
        withCredentials: true,
      });
      connections.set(runId, { source, refs: 1 });
      return source;
    },
    release(runId: RunId): void {
      const existing = connections.get(runId);
      if (!existing) return;
      existing.refs -= 1;
      if (existing.refs > 0) return;
      existing.source.close();
      connections.delete(runId);
    },
    peek(runId: RunId): EventSource | undefined {
      return connections.get(runId)?.source;
    },
    closeAll(): void {
      for (const entry of connections.values()) {
        entry.source.close();
      }
      connections.clear();
    },
  };
}
```

`peek` i sygnatura `EventSourceRegistry` bez zmian semantycznych poza refcount.

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-status.tsx`

```tsx
import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS } from '@/modules/runs/api/run-labels';

type RunStatusViewProps = {
  readonly status: RunStatus;
  readonly compact?: boolean;
  readonly className?: string;
};

export function RunStatusView({ status, compact = false, className }: RunStatusViewProps) {
  const label = compact ? RUN_STATUS_SHORT_LABELS[status] : RUN_STATUS_LABELS[status];
  const liveMotion = status === 'running' || status === 'awaiting_hitl';
  return (
    <span
      data-slot="run-status"
      data-status={status}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium tabular-nums',
        status === 'interrupted' && 'text-muted-foreground',
        status === 'failed' && 'text-destructive',
        status === 'queued' && 'text-muted-foreground',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full bg-foreground/50',
          status === 'running' && 'bg-foreground',
          status === 'awaiting_hitl' && 'rounded-sm bg-foreground/80',
          status === 'interrupted' && 'bg-muted-foreground',
          liveMotion && 'motion-safe:animate-pulse',
        )}
      />
      {label}
    </span>
  );
}
```

`running`: kółko + pulse. `awaiting_hitl`: kwadrat (inna geometria) + pulse. `interrupted`: kółko statyczne, copy o wznowieniu. To jedyny wyjątek motion (skill states). Kolor z tokenów locku, bez nowej palety.

#### Nowy plik — `apps/frontend/src/modules/runs/components/use-run-event-source.ts`

```tsx
'use client';

import { useEffect } from 'react';
import type { RunId, RunStatus } from '@content-chain/shared';
import { useEventSourceRegistry } from '@/modules/shell/components/event-source-registry-provider';
import {
  isLiveRunStatus,
  isTerminalRunStatus,
  parseRunLogItem,
  parseSseStatusData,
  type RunLogItem,
} from '@/modules/runs/api/runs.types';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';

export type RunLiveHandlers = {
  readonly onStatus: (status: RunStatus) => void;
  readonly onLog?: (item: RunLogItem) => void;
  readonly onTerminal?: (status: 'completed' | 'failed') => void;
};

function parseEventData(raw: string): unknown {
  if (raw.length === 0) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function useRunEventSource(
  runId: RunId | null,
  enabled: boolean,
  handlers: RunLiveHandlers,
): void {
  const registry = useEventSourceRegistry();

  useEffect(() => {
    if (!runId || !enabled) return;
    const source = registry.acquire(runId);
    let released = false;

    const releaseOnce = (): void => {
      if (released) return;
      released = true;
      registry.release(runId);
    };

    const onStatus = (event: Event): void => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') return;
      const parsed = parseSseStatusData(parseEventData(event.data));
      handlers.onStatus(parsed.status);
      if (isTerminalRunStatus(parsed.status)) {
        handlers.onTerminal?.(parsed.status);
        releaseOnce();
      }
    };

    const onLog = (event: Event): void => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') return;
      const data = parseEventData(event.data);
      handlers.onLog?.(parseRunLogItem(data));
    };

    const onCompleted = (): void => {
      handlers.onStatus('completed');
      handlers.onTerminal?.('completed');
      releaseOnce();
    };

    const onFailed = (): void => {
      handlers.onStatus('failed');
      handlers.onTerminal?.('failed');
      releaseOnce();
    };

    const onError = (): void => {
      if (released) return;
      void fetchRunSnapshot(runId)
        .then((snapshot) => {
          handlers.onStatus(snapshot.status);
          if (!isLiveRunStatus(snapshot.status)) {
            if (isTerminalRunStatus(snapshot.status)) {
              handlers.onTerminal?.(snapshot.status);
            }
            releaseOnce();
          }
        })
        .catch(() => {
          /* envelope przy następnym GET widoku */
        });
    };

    source.addEventListener('run.status', onStatus);
    source.addEventListener('run.log', onLog);
    source.addEventListener('run.completed', onCompleted);
    source.addEventListener('run.failed', onFailed);
    source.addEventListener('error', onError);

    return () => {
      source.removeEventListener('run.status', onStatus);
      source.removeEventListener('run.log', onLog);
      source.removeEventListener('run.completed', onCompleted);
      source.removeEventListener('run.failed', onFailed);
      source.removeEventListener('error', onError);
      releaseOnce();
    };
  }, [enabled, handlers, registry, runId]);
}
```

W implementacji **zstabilizuj `handlers`** (`useMemo` u konsumenta albo ref w hooku), żeby effect nie zrywał SSE co render. Preferowany wzorzec w hooku: `handlersRef.current = handlers`.

Heartbeat: brak listenera = ignorancja. Przeglądarka sama reconnectuje EventSource po dropie; `onError` + snapshot rozstrzyga terminal vs live.

#### Nowy plik — `apps/frontend/src/modules/runs/components/own-runs-provider.tsx`

```tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { RunId, RunStatus } from '@content-chain/shared';
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchUserRuns } from '@/modules/runs/api/runs.api';
import {
  isLiveRunStatus,
  type UserRunItem,
} from '@/modules/runs/api/runs.types';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';

type OwnRunsState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly items: readonly UserRunItem[] };

type OwnRunsContextValue = {
  readonly state: OwnRunsState;
  readonly inProgress: readonly UserRunItem[];
  readonly refresh: () => Promise<void>;
  readonly patchStatus: (runId: RunId, status: RunStatus) => void;
};

const OwnRunsContext = createContext<OwnRunsContextValue | null>(null);
const FALLBACK: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

function LiveItemSubscription({
  runId,
  onStatus,
}: {
  readonly runId: RunId;
  readonly onStatus: (runId: RunId, status: RunStatus) => void;
}) {
  useRunEventSource(runId, true, {
    onStatus: (status) => {
      onStatus(runId, status);
    },
  });
  return null;
}

export function OwnRunsProvider({ children }: { readonly children: ReactNode }) {
  const { state: session } = useSession();
  const userId = session.status === 'authenticated' ? session.user.id : null;
  const [state, setState] = useState<OwnRunsState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      const items = await fetchUserRuns(userId);
      setState({ status: 'ready', items });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK });
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    function onFocus(): void {
      void refresh();
    }
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  const patchStatus = useCallback((runId: RunId, status: RunStatus) => {
    setState((current) => {
      if (current.status !== 'ready') return current;
      return {
        status: 'ready',
        items: current.items.map((item) => (item.runId === runId ? { ...item, status } : item)),
      };
    });
  }, []);

  const inProgress = state.status === 'ready' ? state.items.filter((item) => isLiveRunStatus(item.status)) : [];

  const value = useMemo(
    () => ({ state, inProgress, refresh, patchStatus }),
    [inProgress, patchStatus, refresh, state],
  );

  return (
    <OwnRunsContext.Provider value={value}>
      {inProgress.map((item) => (
        <LiveItemSubscription key={item.runId} runId={item.runId} onStatus={patchStatus} />
      ))}
      {children}
    </OwnRunsContext.Provider>
  );
}

export function useOwnRuns(): OwnRunsContextValue {
  const value = useContext(OwnRunsContext);
  if (!value) {
    throw new Error('useOwnRuns must be used within OwnRunsProvider');
  }
  return value;
}
```

Po evencie terminalnym wiersz zostaje na liście (Moje runy = wszystkie statusy) ze statusem końcowym; wypada z `inProgress` → box znika, subskrypcja odmontowuje się i `release`. `queued` nigdy nie wchodzi do `inProgress`.

#### Refaktor — `dashboard-shell.tsx` (po pliku 1)

**Teraz (oczekiwane po pliku 1):** `EventSourceRegistryProvider` > `CompletenessProvider` > layout.

**Zamień na:** wewnątrz `CompletenessProvider`, owinięcie drzewa w `OwnRunsProvider` (import z `@/modules/runs/components/own-runs-provider`). Kolejność: rejestr SSE → completeness → own runs → chrome. Provider own runs musi być **pod** rejestrem EventSource.

**Biblioteki:** EventSource (WHATWG). Context7 Next nie dotyczy protokołu SSE.

**DoD (krok):** dwa konsumenty tego samego `runId` = jedno gniazdo; `release` zamyka dopiero przy ref=0; `queued` bez SSE; terminal → close; `interrupted` wizualnie inny niż `running`.

---

### KROK 3 — Konto: formularz startu

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedyny start MVP. Major 3.1; `SPEC-FRONTEND.md` F-6/F-7/F-8.

**Artefakty:**

- Nowy: `apps/frontend/src/shared/ui/native-select.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Zmiana: `apps/frontend/src/app/(app)/account/page.tsx`

#### Nowy plik — `apps/frontend/src/shared/ui/native-select.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/shared/utils/utils';

function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="select"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30',
        className,
      )}
      {...props}
    />
  );
}

export { NativeSelect };
```

#### Nowy plik — `apps/frontend/src/modules/runs/components/start-run-form.tsx`

```tsx
'use client';

import { useMemo, useState, type FormEvent } from 'react';
import {
  CONTENT_KINDS,
  CONTENT_LANGUAGES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
  isContentTaskType,
  type ContentKind,
  type ContentLanguage,
  type RunTaskType,
  type SocialPlatform,
} from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { NativeSelect } from '@/shared/ui/native-select';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { startRun } from '@/modules/runs/api/runs.api';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import type { RunSnapshot, StartRunInput } from '@/modules/runs/api/runs.types';

export type StartRunDraft = {
  readonly taskType: RunTaskType;
  readonly platform: SocialPlatform;
  readonly contentKind: ContentKind;
  readonly language: ContentLanguage;
  readonly topic: string;
  readonly audience: string;
  readonly goal: string;
  readonly ideaCount: string;
  readonly angle: string;
  readonly targetLength: string;
};

export const EMPTY_START_DRAFT: StartRunDraft = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  contentKind: 'blog',
  language: 'pl',
  topic: '',
  audience: '',
  goal: '',
  ideaCount: '',
  angle: '',
  targetLength: '',
};

export function draftFromSnapshot(snapshot: RunSnapshot): StartRunDraft {
  const brief = snapshot.brief;
  return {
    taskType: snapshot.taskType,
    platform: snapshot.platform === 'web' ? 'linkedin' : snapshot.platform,
    contentKind: snapshot.contentKind ?? 'blog',
    language: snapshot.language,
    topic: brief.topic,
    audience: brief.audience ?? '',
    goal: brief.goal ?? '',
    ideaCount: 'ideaCount' in brief && brief.ideaCount !== undefined ? String(brief.ideaCount) : '',
    angle: 'angle' in brief ? (brief.angle ?? '') : '',
    targetLength:
      'targetLength' in brief && brief.targetLength !== undefined ? String(brief.targetLength) : '',
  };
}

function toInput(draft: StartRunDraft): StartRunInput | null {
  if (draft.topic.trim().length === 0) return null;
  if (isContentTaskType(draft.taskType)) {
    const targetLength = draft.targetLength.trim();
    const parsedLength = targetLength.length === 0 ? undefined : Number(targetLength);
    if (parsedLength !== undefined && (!Number.isInteger(parsedLength) || parsedLength < 1)) {
      return null;
    }
    return {
      taskType: draft.taskType,
      contentKind: draft.contentKind,
      language: draft.language,
      brief: {
        topic: draft.topic,
        ...(draft.audience.trim() ? { audience: draft.audience } : {}),
        ...(draft.goal.trim() ? { goal: draft.goal } : {}),
        ...(draft.angle.trim() ? { angle: draft.angle } : {}),
        ...(parsedLength !== undefined ? { targetLength: parsedLength } : {}),
      },
    };
  }
  const ideaCount = draft.ideaCount.trim();
  const parsedCount = ideaCount.length === 0 ? undefined : Number(ideaCount);
  if (parsedCount !== undefined && (!Number.isInteger(parsedCount) || parsedCount < 1)) {
    return null;
  }
  return {
    taskType: draft.taskType,
    platform: draft.platform,
    language: draft.language,
    brief: {
      topic: draft.topic,
      ...(draft.audience.trim() ? { audience: draft.audience } : {}),
      ...(draft.goal.trim() ? { goal: draft.goal } : {}),
      ...(parsedCount !== undefined ? { ideaCount: parsedCount } : {}),
    },
  };
}

type StartRunFormProps = {
  readonly draft: StartRunDraft;
  readonly onDraftChange: (next: StartRunDraft) => void;
};

export function StartRunForm({ draft, onDraftChange }: StartRunFormProps) {
  const { state: completeness } = useCompleteness();
  const { refresh } = useOwnRuns();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;
  const pageTask = isContentTaskType(draft.taskType);

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const input = toInput(draft);
    if (!input || !agentsActive) return;
    setPending(true);
    setError(null);
    try {
      await startRun(input);
      await refresh();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-xl flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      <h2 className="text-base font-medium">Start runu</h2>
      <FormField label="Typ zadania" htmlFor="start-task-type">
        <NativeSelect
          id="start-task-type"
          value={draft.taskType}
          onChange={(event) =>
            onDraftChange({ ...draft, taskType: event.target.value as typeof draft.taskType })
          }
        >
          {RUN_TASK_TYPES.map((taskType) => (
            <option key={taskType} value={taskType}>
              {RUN_TASK_TYPE_LABELS[taskType]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {pageTask ? (
        <FormField label="Rodzaj strony" htmlFor="start-content-kind">
          <NativeSelect
            id="start-content-kind"
            value={draft.contentKind}
            onChange={(event) =>
              onDraftChange({ ...draft, contentKind: event.target.value as ContentKind })
            }
          >
            {CONTENT_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {CONTENT_KIND_LABELS[kind]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : (
        <FormField label="Platforma" htmlFor="start-platform">
          <NativeSelect
            id="start-platform"
            value={draft.platform}
            onChange={(event) =>
              onDraftChange({ ...draft, platform: event.target.value as SocialPlatform })
            }
          >
            {SOCIAL_PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {RUN_PLATFORM_LABELS[platform]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      )}
      <FormField label="Język" htmlFor="start-language">
        <NativeSelect
          id="start-language"
          value={draft.language}
          onChange={(event) =>
            onDraftChange({ ...draft, language: event.target.value as ContentLanguage })
          }
        >
          {CONTENT_LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {LANGUAGE_LABELS[language]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField label="Temat" htmlFor="start-topic">
        <Input
          id="start-topic"
          value={draft.topic}
          onChange={(event) => onDraftChange({ ...draft, topic: event.target.value })}
          required
        />
      </FormField>
      <FormField label="Grupa (opcjonalnie)" htmlFor="start-audience">
        <Input
          id="start-audience"
          value={draft.audience}
          onChange={(event) => onDraftChange({ ...draft, audience: event.target.value })}
        />
      </FormField>
      <FormField label="Cel (opcjonalnie)" htmlFor="start-goal">
        <Input
          id="start-goal"
          value={draft.goal}
          onChange={(event) => onDraftChange({ ...draft, goal: event.target.value })}
        />
      </FormField>
      {pageTask ? (
        <>
          <FormField label="Kąt (opcjonalnie)" htmlFor="start-angle">
            <Input
              id="start-angle"
              value={draft.angle}
              onChange={(event) => onDraftChange({ ...draft, angle: event.target.value })}
            />
          </FormField>
          <FormField label="Długość w słowach (opcjonalnie)" htmlFor="start-length">
            <Input
              id="start-length"
              inputMode="numeric"
              value={draft.targetLength}
              onChange={(event) => onDraftChange({ ...draft, targetLength: event.target.value })}
            />
          </FormField>
        </>
      ) : (
        <FormField label="Liczba pomysłów (opcjonalnie)" htmlFor="start-idea-count">
          <Input
            id="start-idea-count"
            inputMode="numeric"
            value={draft.ideaCount}
            onChange={(event) => onDraftChange({ ...draft, ideaCount: event.target.value })}
          />
        </FormField>
      )}
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {disableReason ? <p className="text-xs text-muted-foreground">{disableReason}</p> : null}
      <Button type="submit" disabled={pending || !agentsActive || !toInput(draft)} className="self-start">
        {pending ? 'Uruchamianie…' : 'Uruchom run'}
      </Button>
    </form>
  );
}
```

Zamiast `as typeof draft.taskType` na `select`: `isRunTaskType(event.target.value)` i early-return. To samo dla platform / kind / language (`isSocialPlatform`, `isContentKind`, `isContentLanguage`).

Platforma przy `page_*`: **nie renderować** (ukryta). Nie wysyłać `platform` w body.

#### Refaktor — `account/page.tsx`

**Teraz:** placeholder „e-mail i opinia”.

**Zamień na:** Client wrapper albo od razu cienki import. W tym kroku wystarczy strona:

```tsx
import { AccountStartSection } from '@/modules/runs/components/account-start-section';

export default function AccountPage() {
  return <AccountStartSection />;
}
```

Nowy plik `account-start-section.tsx` (`'use client'`): nagłówek „Konto”, `StartRunForm` ze stanem `EMPTY_START_DRAFT`. KROK 5 podmieni ten wrapper na pełny `AccountView` (form + Moje runy). Nie wspominaj emaila/opinii (Faza 5).

**DoD (krok):** post/reel vs page pola; brak `selectedIdeaIds`; CTA disabled + wyjaśnienie gdy chip nieaktywny; 202 bez nawigacji na szczegóły; 409 `CONTEXT_INCOMPLETE` jako envelope.

---

### KROK 4 — Szczegóły Run: live, logi, sloty

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jeden widok detalu. Major 3.3; F-5/F-5a. HITL/wynik/przegląd = puste `data-slot`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/run-details-view.tsx`
- Nowy: `apps/frontend/src/app/(app)/runs/[runId]/page.tsx`

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-details-view.tsx`

```tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { createRunId, isRunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { fetchRunLogs, fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import {
  isLiveRunStatus,
  type RunLogItem,
  type RunSnapshot,
} from '@/modules/runs/api/runs.types';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';

type DetailsState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: { code: string; message: string } }
  | { readonly status: 'ready'; readonly snapshot: RunSnapshot; readonly logs: readonly RunLogItem[] };

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function logKey(item: RunLogItem): string {
  return `${item.at}|${item.level}|${item.message}|${item.step ?? ''}`;
}

export function RunDetailsView({ runIdParam }: { readonly runIdParam: string }) {
  const { state: session } = useSession();
  const { patchStatus, refresh } = useOwnRuns();
  const [view, setView] = useState<DetailsState>({ status: 'loading' });

  const runId = isRunId(runIdParam) ? createRunId(runIdParam) : null;

  const load = useCallback(async () => {
    if (!runId) {
      setView({
        status: 'error',
        envelope: { code: 'VALIDATION_FAILED', message: 'Invalid runId' },
      });
      return;
    }
    try {
      const [snapshot, logs] = await Promise.all([fetchRunSnapshot(runId), fetchRunLogs(runId)]);
      setView({ status: 'ready', snapshot, logs });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setView({ status: 'error', envelope: reason.envelope });
        return;
      }
      setView({ status: 'error', envelope: FALLBACK });
    }
  }, [runId]);

  useEffect(() => {
    void load();
  }, [load]);

  const own =
    view.status === 'ready' &&
    session.status === 'authenticated' &&
    view.snapshot.startedBy !== null &&
    view.snapshot.startedBy.id === session.user.id;
  const live = view.status === 'ready' && own && isLiveRunStatus(view.snapshot.status);

  useRunEventSource(runId, live, {
    onStatus: (status) => {
      setView((current) =>
        current.status === 'ready' ? { ...current, snapshot: { ...current.snapshot, status } } : current,
      );
      if (runId) patchStatus(runId, status);
    },
    onLog: (item) => {
      setView((current) => {
        if (current.status !== 'ready') return current;
        if (current.logs.some((existing) => logKey(existing) === logKey(item))) return current;
        return { ...current, logs: [...current.logs, item] };
      });
    },
    onTerminal: () => {
      void load();
      void refresh();
    },
  });

  if (view.status === 'loading') {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (view.status === 'error') {
    return <EnvelopeError code={view.envelope.code} message={view.envelope.message} />;
  }

  const { snapshot, logs } = view;
  return (
    <article className="flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{RUN_TASK_TYPE_LABELS[snapshot.taskType]}</h1>
        <p className="text-sm text-muted-foreground">
          {RUN_PLATFORM_LABELS[snapshot.platform]}
          {snapshot.contentKind ? ` · ${CONTENT_KIND_LABELS[snapshot.contentKind]}` : ''}
          {` · ${LANGUAGE_LABELS[snapshot.language]}`}
          {snapshot.startedBy ? ` · ${snapshot.startedBy.email}` : ''}
          <span className="ml-2 font-mono text-xs tabular-nums">{snapshot.createdAt}</span>
        </p>
        <RunStatusView status={snapshot.status} />
      </header>
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Logi</h2>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak wpisów logu.</p>
        ) : (
          <ol className="divide-y divide-border text-sm">
            {logs.map((item) => (
              <li key={logKey(item)} className="flex flex-col gap-0.5 py-2">
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  {item.at}
                  {item.step ? ` · ${item.step}` : ''}
                  {` · ${item.level}`}
                </p>
                <p>{item.message}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
      <div data-slot="run-hitl" />
      <div data-slot="run-result" />
      <div data-slot="run-review" />
    </article>
  );
}
```

Nie renderować `conversationId`. Cudzy run (archiwum): `live === false` → brak SSE.

#### Nowy plik — `apps/frontend/src/app/(app)/runs/[runId]/page.tsx`

```tsx
import { RunDetailsView } from '@/modules/runs/components/run-details-view';

export default async function RunDetailsPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  return <RunDetailsView runIdParam={runId} />;
}
```

Context7: `params` jako `Promise` w Next 16.

**DoD (krok):** live status natychmiast; terminal i `queued` bez SSE; `interrupted` ≠ `running`; brak `conversationId`; sloty puste; wejście z archiwum (cudzy) bez EventSource.

---

### KROK 5 — Konto: Moje runy i prefill

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Lista autora, klik → szczegóły, prefill = **nowy** run ze snapshotu. Major 3.2.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/my-runs-list.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/account-view.tsx`
- Zmiana: `apps/frontend/src/app/(app)/account/page.tsx`
- Zmiana: usunąć tymczasowy `account-start-section.tsx` z KROK 3 (albo wchłonąć).

#### Nowy plik — `apps/frontend/src/modules/runs/components/my-runs-list.tsx`

```tsx
'use client';

import Link from 'next/link';
import type { RunId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { RUN_PLATFORM_LABELS, RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';

type MyRunsListProps = {
  readonly onPrefill: (runId: RunId) => void;
};

export function MyRunsList({ onPrefill }: MyRunsListProps) {
  const { state } = useOwnRuns();

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }
  if (state.status === 'error') {
    return <EnvelopeError code={state.envelope.code} message={state.envelope.message} />;
  }
  if (state.items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Brak własnych runów. Uruchom pierwszy z formularza powyżej.
      </p>
    );
  }

  return (
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
          {state.items.map((item) => (
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
              <td className="py-2 pr-3 font-mono text-xs tabular-nums">{item.createdAt}</td>
              <td className="py-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => onPrefill(item.runId)}>
                  Nowy z tym briefem
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

Prefill **nie** wznawia `runId`. Klik wiersza (typ) → `/runs/:runId`.

#### Nowy plik — `apps/frontend/src/modules/runs/components/account-view.tsx`

```tsx
'use client';

import { useState } from 'react';
import type { RunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import {
  draftFromSnapshot,
  EMPTY_START_DRAFT,
  StartRunForm,
} from '@/modules/runs/components/start-run-form';
import { MyRunsList } from '@/modules/runs/components/my-runs-list';

export function AccountView() {
  const [draft, setDraft] = useState(EMPTY_START_DRAFT);
  const [prefillError, setPrefillError] = useState<{ code: string; message: string } | null>(null);

  async function onPrefill(runId: RunId): Promise<void> {
    setPrefillError(null);
    try {
      const snapshot = await fetchRunSnapshot(runId);
      setDraft(draftFromSnapshot(snapshot));
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setPrefillError({ code: reason.envelope.code, message: reason.envelope.message });
        return;
      }
      setPrefillError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-xl flex-col gap-1">
        <h1 className="text-lg font-medium">Konto</h1>
        <p className="text-sm text-muted-foreground">Start runu i lista Twoich przebiegów.</p>
      </div>
      <StartRunForm draft={draft} onDraftChange={setDraft} />
      {prefillError ? (
        <EnvelopeError code={prefillError.code} message={prefillError.message} />
      ) : null}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Moje runy</h2>
        <MyRunsList onPrefill={(runId) => void onPrefill(runId)} />
      </section>
    </div>
  );
}
```

Lista user **nie** ma `brief` / `contentKind` — prefill wyłącznie ze snapshotu `GET /runs/:id`.

#### Refaktor — `account/page.tsx`

**Zamień na:**

```tsx
import { AccountView } from '@/modules/runs/components/account-view';

export default function AccountPage() {
  return <AccountView />;
}
```

**DoD (krok):** wszystkie statusy autora; `queued` z GET (focus / po POST / po SSE innego live); prefill nie wznawia starego id; lista ≠ archiwum i ≠ select opinii.

---

### KROK 6 — Floating box

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Własne runy w toku poza Kontem. Major 3.4.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/floating-runs-box.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/chrome-slots.tsx` (po pliku 1 chip jest wypełniony)

#### Nowy plik — `apps/frontend/src/modules/runs/components/floating-runs-box.tsx`

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { RunStatusView } from '@/modules/runs/components/run-status';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';

export function FloatingRunsBox() {
  const { inProgress } = useOwnRuns();
  const [collapsed, setCollapsed] = useState(false);

  if (inProgress.length === 0) return null;

  return (
    <section
      data-slot="floating-box"
      className="fixed right-4 bottom-4 z-(--z-overlay) w-80 max-w-[calc(100%-2rem)] rounded-lg border border-border bg-card text-sm"
    >
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <p className="font-medium">Runy w toku ({inProgress.length})</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Rozwiń' : 'Zwiń'}
          onClick={() => setCollapsed((value) => !value)}
        >
          <Icon icon={collapsed ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="size-3.5" />
        </Button>
      </div>
      {collapsed ? null : (
        <ul className="flex flex-col divide-y divide-border">
          {inProgress.map((item) => (
            <li key={item.runId} className="flex flex-col gap-1 px-3 py-2">
              <RunStatusView status={item.status} compact />
              <p className="text-xs text-muted-foreground">{RUN_TASK_TYPE_LABELS[item.taskType]}</p>
              <Link href={`/runs/${item.runId}`} className="text-xs underline-offset-4 hover:underline">
                Szczegóły
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

Bez HITL/wyniku/przeglądu. `queued` nie wchodzi (`inProgress`). Po terminalu pozycja znika wraz z filtrem live.

#### Refaktor — `FloatingBoxSlot` w `chrome-slots.tsx`

**Teraz:** pusty `div` + `pointer-events-none` + komentarz Fazy 3; ukrycie na `/account`.

**Zamień na:**

```tsx
export function FloatingBoxSlot() {
  const pathname = usePathname();
  if (pathname === '/account') return null;
  return <FloatingRunsBox />;
}
```

Import `FloatingRunsBox`. Usuń `pointer-events-none`. Chip i feedback slot bez zmian względem pliku 1.

**DoD (krok):** ukryty na Koncie; gdzie indziej pozycje live; zwijany; `interrupted` inne copy; brak cudzych runów; `queued` bez pozycji.

---

### KROK 7 — Lista Runy (archiwum firmy)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `completed` \| `failed`, strona 10, odświeżanie wejście + 15 min. Major 3.5.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`
- Zmiana: `apps/frontend/src/app/(app)/runs/page.tsx`

#### Nowy plik — `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  RUN_PLATFORMS,
  RUN_TASK_TYPES,
  createUserId,
  isRunPlatform,
  isRunTaskType,
  isUserId,
  type RunPlatform,
  type RunTaskType,
  type UserId,
} from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { NativeSelect } from '@/shared/ui/native-select';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import {
  fetchArchiveRuns,
  fetchInitiatorOptions,
  type InitiatorOption,
} from '@/modules/runs/api/runs.api';
import {
  CONTENT_KIND_LABELS,
  LANGUAGE_LABELS,
  RUN_PLATFORM_LABELS,
  RUN_STATUS_LABELS,
  RUN_TASK_TYPE_LABELS,
} from '@/modules/runs/api/run-labels';
import { RunStatusView } from '@/modules/runs/components/run-status';
import type { ArchiveRunsPage } from '@/modules/runs/api/runs.types';

const REFRESH_MS = 15 * 60 * 1000;

type StatusFilter = 'both' | 'completed' | 'failed';

export function ArchiveRunsView() {
  const { state: session } = useSession();
  const isAdmin = session.status === 'authenticated' && session.user.role === 'admin';
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('both');
  const [taskType, setTaskType] = useState<RunTaskType | ''>('');
  const [platform, setPlatform] = useState<RunPlatform | ''>('');
  const [userId, setUserId] = useState<UserId | ''>('');
  const [initiators, setInitiators] = useState<readonly InitiatorOption[]>([]);
  const [result, setResult] = useState<ArchiveRunsPage | null>(null);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    void fetchInitiatorOptions()
      .then(setInitiators)
      .catch((reason: unknown) => {
        if (reason instanceof ApiError && reason.status === 403) setInitiators([]);
      });
  }, [isAdmin]);

  useEffect(() => {
    let cancelled = false;
    async function load(): Promise<void> {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArchiveRuns({
          page,
          status: statusFilter === 'both' ? ['completed', 'failed'] : [statusFilter],
          ...(taskType === '' ? {} : { taskType }),
          ...(platform === '' ? {} : { platform }),
          ...(userId === '' ? {} : { userId }),
        });
        if (!cancelled) setResult(data);
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setError({ code: reason.envelope.code, message: reason.envelope.message });
        } else {
          setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
        }
        setResult(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    const timer = window.setInterval(() => {
      void load();
    }, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [page, platform, statusFilter, taskType, userId]);

  const totalPages = result ? Math.max(1, Math.ceil(result.total / result.pageSize)) : 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium">Runy</h1>
        <p className="text-sm text-muted-foreground">
          Archiwum zakończonych i nieudanych runów instancji. Start jest na Koncie.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <FormField label="Status" htmlFor="archive-status">
          <NativeSelect
            id="archive-status"
            value={statusFilter}
            onChange={(event) => {
              const value = event.target.value;
              if (value === 'both' || value === 'completed' || value === 'failed') {
                setStatusFilter(value);
                setPage(1);
              }
            }}
          >
            <option value="both">Zakończone i nieudane</option>
            <option value="completed">Zakończone</option>
            <option value="failed">Nieudane</option>
          </NativeSelect>
        </FormField>
        <FormField label="Typ" htmlFor="archive-task">
          <NativeSelect
            id="archive-task"
            value={taskType}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                setTaskType('');
                setPage(1);
                return;
              }
              if (isRunTaskType(value)) {
                setTaskType(value);
                setPage(1);
              }
            }}
          >
            <option value="">Wszystkie</option>
            {RUN_TASK_TYPES.map((item) => (
              <option key={item} value={item}>
                {RUN_TASK_TYPE_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        <FormField label="Platforma" htmlFor="archive-platform">
          <NativeSelect
            id="archive-platform"
            value={platform}
            onChange={(event) => {
              const value = event.target.value;
              if (value === '') {
                setPlatform('');
                setPage(1);
                return;
              }
              if (isRunPlatform(value)) {
                setPlatform(value);
                setPage(1);
              }
            }}
          >
            <option value="">Wszystkie</option>
            {RUN_PLATFORMS.map((item) => (
              <option key={item} value={item}>
                {RUN_PLATFORM_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        {isAdmin && initiators.length > 0 ? (
          <FormField label="Inicjator" htmlFor="archive-user">
            <NativeSelect
              id="archive-user"
              value={userId}
              onChange={(event) => {
                const value = event.target.value;
                if (value === '') {
                  setUserId('');
                  setPage(1);
                  return;
                }
                if (isUserId(value)) {
                  setUserId(createUserId(value));
                  setPage(1);
                }
              }}
            >
              <option value="">Wszyscy</option>
              {initiators.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.email}
                </option>
              ))}
            </NativeSelect>
          </FormField>
        ) : null}
      </div>
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {loading && result === null ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : null}
      {result && result.items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Brak runów w archiwum dla tych filtrów.</p>
      ) : null}
      {result && result.items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Typ</th>
                <th className="py-2 pr-3 font-medium">Platforma</th>
                <th className="py-2 pr-3 font-medium">Rodzaj</th>
                <th className="py-2 pr-3 font-medium">Język</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Utworzono</th>
                <th className="py-2 font-medium">Inicjator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {result.items.map((item) => (
                <tr key={item.runId}>
                  <td className="py-2 pr-3">
                    <Link href={`/runs/${item.runId}`} className="underline-offset-4 hover:underline">
                      {RUN_TASK_TYPE_LABELS[item.taskType]}
                    </Link>
                  </td>
                  <td className="py-2 pr-3">{RUN_PLATFORM_LABELS[item.platform]}</td>
                  <td className="py-2 pr-3">
                    {item.contentKind ? CONTENT_KIND_LABELS[item.contentKind] : 'brak'}
                  </td>
                  <td className="py-2 pr-3">{LANGUAGE_LABELS[item.language]}</td>
                  <td className="py-2 pr-3">
                    <RunStatusView status={item.status} compact />
                  </td>
                  <td className="py-2 pr-3 font-mono text-xs tabular-nums">{item.createdAt}</td>
                  <td className="py-2">{item.startedBy?.email ?? 'brak'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {result ? (
        <div className="flex items-center gap-2 text-sm">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Poprzednia
          </Button>
          <p className="tabular-nums text-muted-foreground">
            {result.page} / {totalPages} ({result.total})
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Następna
          </Button>
        </div>
      ) : null}
    </div>
  );
}
```

Interval 15 min **nie** jest kanałem live szczegółów. Brak SSE na tej stronie. Status filtra tylko terminalny. `pageSize` z odpowiedzi api (10).

#### Refaktor — `runs/page.tsx`

**Zamień na:**

```tsx
import { ArchiveRunsView } from '@/modules/runs/components/archive-runs-view';

export default function RunsPage() {
  return <ArchiveRunsView />;
}
```

**DoD (krok):** `status=completed,failed` (lub jeden z nich); filtry task/platform/(admin userId); 10; sort z api; odświeżanie wejście+15 min; brak startu i runów w toku; klik → te same szczegóły (snapshot, bez SSE).

---

## Weryfikacja wycinka

- Kotwica major Faza 3 (3.1–3.5) pokryta. Milestone 3 informacyjnie po implementacji.
- Zgodność docs/SPEC: Konto = start+Moje runy; Runy = archiwum; N× SSE własne live; box poza Kontem; envelope as-is; typy branded.
- Nowe pliki: pełny kod. Refaktory: fragmenty. Plik 1 nietknięty.
- Pass: refcount przed wieloma konsumentami; szczegóły przed listami; completeness z pliku 1 na CTA.
- Nagłówki `FAZA` / `KROK`. Statusy `NIE_ROZPOCZĘTY`. Major nietknięty. Brak sekretów.
- Pre-flight UI: dziedziczenie locku; listy `divide-y`/tabele; live motion tylko status; empty/loading/error.

---

## Ślad do major

Po implementacji **tego** pliku (poza tą sesją):

| Major | Status docelowy |
|-------|-----------------|
| Faza 3 | `WYKONANY` |
| Kroki 3.1–3.5 | `WYKONANY` |
| MILESTONE 3 | `OSIĄGNIĘTY` |

Ten skill nie edytuje majoru. Wdrożenie kodu: opcjonalnie ręczne `/feature-implementation` na zatwierdzonym zestawie.
