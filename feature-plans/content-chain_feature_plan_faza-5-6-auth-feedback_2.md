# Feature Plan — Faza 5–6 Auth + Feedback (plik 2/2): Feedback BC + przegląd runu

## Meta

**Kotwica major:** Faza 6 (Kroki 6.1, 6.2, 6.3) — fundament zapisu feedbacku, przeglądu runu i listy runów autora. Kończy MILESTONE 6.  
**Ten plik:** FAZA 3 (shared typy + Prisma migration) + FAZA 4 (HTTP Feedback, lista runów autora, przegląd runu).  
**Plik 1/2:** `content-chain_feature_plan_faza-5-6-auth-feedback_1.md` — FAZA 1 + 2 (Auth API, guardi).  
**Zakres wejścia:** FAZA 1+2 z pliku _1 muszą być zaimplementowane (guardy globalne, auth sesja).  
**Źródła:** `SPEC-FEEDBACK.md` (w tym Fbk-3a), `SPEC-RUNY.md` R-3b/R-3c/R-10, `docs/dokumentacja_komunikacji.md`, `SPEC-PERSISTENCE.md` P-5/P-7, `SPEC-AUTH.md` (authz), `SPEC-BEZPIECZENSTWO.md`.

---

## Założenia (stack / wersje)

- Prisma SQLite (MVP per `SPEC-PERSISTENCE.md` P-6) — append schema (P-7: nowe kolumny/tabele, bez kasowania historii)
- Tabela `Feedback` — `id` brandowane `fbk_<uuid>` (`SPEC-FEEDBACK.md` Fbk-1)
- `FeedbackAgentKey` enum w `packages/shared` (nie tabela w DB) — `SPEC-FEEDBACK.md` Fbk-4
- Pola przeglądu runu: `userRating Int?`, `outputEdited Boolean @default(false)`, `reviewFinalizedAt DateTime?` — per `SPEC-RUNY.md` R-10
- `GET /runs/user/:userId` — bez paginacji pageSize=10; trasa statyczna przed `:runId` w Nest (`SPEC-RUNY.md` R-3c)
- Authz review: tylko autor (`startedByUserId === session.id`) + tylko `completed | failed` + przed finalize
- `POST /feedback` `targetType=run`: ten sam warunek statusu co przegląd (`completed | failed`); **bez** locka `reviewFinalizedAt` (Fbk-3a; KROK 2.1)
- Guardy globalne z pliku _1 (JWT + Roles) już aktywne — brak ponownego `@UseGuards` w tym pliku
- Zod 3 w `apps/api` (jak cała aplikacja w tym momencie)
- Krawędź HTTP: DTO class-validator (jak `StartRunDto` / `HitlDto`); prawda kontraktu = Zod w application przez `parseWithZod`
- `userRating` w tym wycinku: `number | null` + Zod `int` 1–5 (nie brand `RunUserRating` w shared — świadome odłożenie względem `docs/dictionary.md`)
- `PrismaModule` jest `@Global()` — import w `FeedbackModule` opcjonalny (jawna zależność OK)

### Korekty względem wcześniejszej treści tego planu

Zmiana względem: szkic sprzed review architektury (ten sam plik, status `NIE_ROZPOCZĘTY`). Powód: zgrzyty ze SPEC i żywym `apps/api`.

1. **Fbk-3 HTTP:** nieistniejący `runId` → **404** `RUN_NOT_FOUND`; cudzy albo run bez `startedBy` → **403** `FORBIDDEN`; zły format → **400** `VALIDATION_FAILED`. Wcześniejszy szkic zwijał brak wiersza do 403 „żeby nie ujawniać istnienia” — rozjazd z Fbk-3 i z recenzją runu (`RUN_NOT_FOUND`). Port `FeedbackRunReader` rozróżnia brak wiersza od braku inicjatora (unia dyskryminowana).
2. **`toSnapshot` + faki portu** wchodzą do DoD Kroku 1 Fazy 4 (typ `RunReviewFields`; `unusedRepo` / `asSnapshot` w 5 specach).
3. **Postman R8/R9:** `GET /runs/user/:userId` (nie POST).
4. **R-10:** jedna funkcja domenowa `assertRunReviewable` (wzorzec jak `assertTransition`); trzy use-case’y review tylko wołają asercję + zapis.
5. `listByUser` — predykaty shared, bez `as RunTaskType`.
6. Mutacje przeglądu: `updateMany` z `reviewFinalizedAt: null`; `count !== 1` → `REVIEW_LOCKED` (lock przy wyścigu).
7. **Fbk-3a:** `POST /feedback` `targetType=run` dodatkowo wymaga statusu `completed` \| `failed` → **409** `RUN_NOT_REVIEWABLE`. FAZA 4 KROK 2 (`WYKONANY`) egzekwował tylko Fbk-3 (własność). Dopisek: KROK 2.1. Finalize **nie** blokuje tekstu. `application` / `agent` bez zmian.

---

## FAZA 3 — Shared typy i persistence fundament feedbacku / przeglądu

> Odpowiada Krokowi 6.1 z major planu.

### KROK 1 — `packages/shared`: FeedbackId, FeedbackTargetType, FeedbackAgentKey

**Status:** `WYKONANY`

**Cel:** Dodać brand types i enumy BC Feedback do pakietu współdzielonego — przed Prisma schema i BC Feedback.  
Odwołanie: `SPEC-FEEDBACK.md` Fbk-1/Fbk-4; `docs/brand_types.md`; `SPEC-MONOREPO.md`.

**Artefakty (refaktory):**
- `packages/shared/src/branded/ids.ts` — dopisanie `FeedbackId`
- `packages/shared/src/branded/enums.ts` — dopisanie `FeedbackTargetType`, `FeedbackAgentKey`

(Eksporty przez `packages/shared/src/index.ts` — już re-eksportuje z obu plików.)

**Implementacja:**

**Refaktor** `packages/shared/src/branded/ids.ts` — dopisanie `FeedbackId` na końcu pliku:

dodaj po istniejących definicjach (wzorzec: prefix `fbk_` wg `SPEC-FEEDBACK.md`):
```typescript
// ---------------------------------------------------------------------------
// FeedbackId
// ---------------------------------------------------------------------------

export type FeedbackId = Brand<string, 'FeedbackId'>;

const FEEDBACK_ID_RE = new RegExp(`^fbk_${UUID_PART}$`, 'i');

export const isFeedbackId = (value: string): value is FeedbackId =>
  FEEDBACK_ID_RE.test(value);

export const createFeedbackId = (value: string): FeedbackId => {
  if (!isFeedbackId(value)) throw new Error('Invalid FeedbackId');
  return brand<FeedbackId>(value);
};
```

**Refaktor** `packages/shared/src/branded/enums.ts` — dopisanie typów Feedback na końcu pliku:

dodaj:
```typescript
// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

/** Cel opinii tekstowej — SPEC-FEEDBACK.md Fbk-1. */
export type FeedbackTargetType = 'application' | 'agent' | 'run';

/**
 * Stały katalog agentów MVP — SPEC-FEEDBACK.md Fbk-4.
 * Nie jest tabelą w DB — enum w shared.
 */
export type FeedbackAgentKey =
  | 'IdeationAgent'
  | 'ContentWriterAgent'
  | 'ConsistencyVerifier'
  | 'PageWriterAgent';

export const FEEDBACK_TARGET_TYPES = [
  'application',
  'agent',
  'run',
] as const satisfies readonly FeedbackTargetType[];

export const FEEDBACK_AGENT_KEYS = [
  'IdeationAgent',
  'ContentWriterAgent',
  'ConsistencyVerifier',
  'PageWriterAgent',
] as const satisfies readonly FeedbackAgentKey[];

export const isFeedbackTargetType = (v: string): v is FeedbackTargetType =>
  (FEEDBACK_TARGET_TYPES as readonly string[]).includes(v);

export const isFeedbackAgentKey = (v: string): v is FeedbackAgentKey =>
  (FEEDBACK_AGENT_KEYS as readonly string[]).includes(v);
```

**DoD kroku:**
- `@content-chain/shared` eksportuje `FeedbackId`, `createFeedbackId`, `isFeedbackId`
- `@content-chain/shared` eksportuje `FeedbackTargetType`, `FeedbackAgentKey` + stałe + predicaty
- `pnpm --filter shared build` (lub typecheck) bez błędów
- Brak logiki domenowej ani Zod w `packages/shared`

---

### KROK 2 — Prisma migration: tabela Feedback + pola przeglądu na Run

**Status:** `WYKONANY`

**Cel:** Append do schematu Prisma — nowe pola na modelu `Run` oraz tabela `Feedback`. Brak modyfikacji istniejących kolumn.  
Odwołanie: `SPEC-PERSISTENCE.md` P-5/P-7; `SPEC-RUNY.md` R-10; `SPEC-FEEDBACK.md` Fbk-1.

**Artefakty (refaktory):**
- `apps/api/prisma/schema.prisma` — model `Run` + nowy model `Feedback`

**Implementacja:**

**Refaktor** `apps/api/prisma/schema.prisma` — dopisanie pól przeglądu do modelu `Run`:

teraz (fragment modelu Run — koniec pól przed relacjami):
```prisma
  recoveryAttempts   Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  startedBy          User?              @relation("RunStartedBy", fields: [startedByUserId], references: [id])
```

zamień na:
```prisma
  recoveryAttempts   Int                @default(0)
  userRating         Int?
  outputEdited       Boolean            @default(false)
  reviewFinalizedAt  DateTime?
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  startedBy          User?              @relation("RunStartedBy", fields: [startedByUserId], references: [id])
```

**Dopisanie nowego modelu** `Feedback` na końcu `schema.prisma`:

```prisma
model Feedback {
  id         String   @id
  targetType String
  agentKey   String?
  runId      String?
  body       String
  authorId   String
  createdAt  DateTime @default(now())

  @@index([authorId])
  @@index([runId])
}
```

> **Uwaga:** brak relacji FK do `Run` / `User` na modelu `Feedback` — `runId` i `authorId` walidowane w application. To **wyjątek** względem `RunLog` / `Invitation` (świadomy dziennik append-only; wiersz przeżyje zniknięcie runu), nie wymóg P-7 (P-7 = unikać `@db.*`, nie relacje). Istnienie runu i własność `startedBy` sprawdza `FeedbackRunReader`.

Komenda migracji (w katalogu `apps/api/`):
```bash
pnpm prisma migrate dev --name feedback-and-run-review
```

**DoD kroku:**
- Po migracji `Run` ma kolumny `userRating`, `outputEdited`, `reviewFinalizedAt`
- Istniejące runy nie psują się: `userRating` domyślnie `null`, `outputEdited` domyślnie `false`, `reviewFinalizedAt` domyślnie `null`
- `Feedback` tabela istnieje z indeksami
- `pnpm --filter api test` (unit — skrypt `test`, nie `test:e2e`) zielone (nowe kolumny mają bezpieczne defaulty)

---

## FAZA 4 — HTTP Feedback, lista runów autora i przegląd runu

> Odpowiada Krokom 6.2 + 6.3 z major planu.

### KROK 1 — RunSnapshot z polami przeglądu + RunRepository port + `GET /runs/user/:userId`

**Status:** `WYKONANY`

**Cel:** Rozszerzyć `RunSnapshot` i port `RunRepository` o pola przeglądu runu oraz metodę `listByUser`. Dodać trasę `GET /runs/user/:userId` w `RunsController`.  
Odwołanie: `SPEC-RUNY.md` R-3b/R-3c/R-10; `docs/dokumentacja_komunikacji.md` GET /runs/user/:userId.

**Artefakty (refaktory):**
- `apps/api/src/runs/domain/run.port.ts` — rozszerzenie `RunSnapshot`, nowe typy, nowe metody `RunRepository`
- `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` — implementacja nowych metod + rozszerzenie `RunRow` i `toSnapshot`
- `apps/api/src/runs/application/get-run.use-case.ts` — `GetRunOutput` z polami przeglądu
- `apps/api/src/runs/runs.controller.ts` — nowa trasa `GET user/:userId` (importy `createUserId` / `isUserId` już są w pliku — nie duplikować)
- `apps/api/src/runs/runs.module.ts` — nowy use-case
- faki `RunRepository` w specach (typecheck po poszerzeniu portu):
  - `apps/api/src/runs/application/get-run.use-case.spec.ts`
  - `apps/api/src/runs/application/start-run.use-case.spec.ts`
  - `apps/api/src/runs/application/resume-hitl.use-case.spec.ts`
  - `apps/api/src/runs/application/in-process-run.worker.spec.ts`
  - `apps/api/src/runs/application/recover-interrupted-runs.use-case.spec.ts`

**Artefakty (nowe pliki):**
- `apps/api/src/runs/application/list-runs-user.use-case.ts`

**Implementacja:**

**Refaktor** `apps/api/src/runs/domain/run.port.ts` — rozszerzenie typów i interfejsu:

teraz:
```typescript
export type RunStartedBy = { id: string; email: string };

export type RunSnapshot = RunRecord & { startedBy: RunStartedBy | null };

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

export interface RunRepository {
  create(run: RunRecord): Promise<void>;
  getById(id: RunId): Promise<RunSnapshot | null>;
  saveStatus(id: RunId, status: RunStatus): Promise<void>;
  saveRecoveryAttempt(id: RunId, attempts: number): Promise<void>;
  claimNextQueued(): Promise<RunRecord | null>;
  claimNextInterrupted(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
  appendLog(entry: RunLogEntry): Promise<RunLogEntry>;
  listLogs(id: RunId): Promise<RunLogEntry[]>;
  list(query: ListRunsQuery): Promise<ListRunsResult>;
  saveSelectedIdeaIds(id: RunId, selectedIdeaIds: string[]): Promise<void>;
}
```

zamień na:
```typescript
import type { ContentLanguage, RunPlatform, RunTaskType } from '@content-chain/shared';

export type RunStartedBy = { id: string; email: string };

export type RunSnapshot = RunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
};

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

/** Lekki element listy GET /runs/user/:userId — SPEC-RUNY.md R-3c. */
export type LightRunItem = {
  runId: RunId;
  taskType: RunTaskType;
  platform: RunPlatform;
  language: ContentLanguage;
  status: RunStatus;
  createdAt: Date;
};

export interface RunRepository {
  create(run: RunRecord): Promise<void>;
  getById(id: RunId): Promise<RunSnapshot | null>;
  saveStatus(id: RunId, status: RunStatus): Promise<void>;
  saveRecoveryAttempt(id: RunId, attempts: number): Promise<void>;
  claimNextQueued(): Promise<RunRecord | null>;
  claimNextInterrupted(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
  appendLog(entry: RunLogEntry): Promise<RunLogEntry>;
  listLogs(id: RunId): Promise<RunLogEntry[]>;
  list(query: ListRunsQuery): Promise<ListRunsResult>;
  saveSelectedIdeaIds(id: RunId, selectedIdeaIds: string[]): Promise<void>;
  /** Lista runów autora — bez paginacji pageSize=10 (R-3c). */
  listByUser(userId: UserId): Promise<LightRunItem[]>;
  /** Pola przeglądu — SPEC-RUNY.md R-10. `true` gdy zaktualizowano wiersz z `reviewFinalizedAt: null`. */
  saveRating(id: RunId, rating: number | null): Promise<boolean>;
  saveOutputEdited(id: RunId): Promise<boolean>;
  saveFinalizedAt(id: RunId, at: Date): Promise<boolean>;
}
```

**Refaktor** `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` — rozszerzenie `RunRow`, `toSnapshot` i nowe metody:

teraz (`RunRow` type — fragment):
```typescript
type RunRow = {
  id: string;
  // ...
  recoveryAttempts: number;
  createdAt: Date;
  startedBy: { id: string; email: string } | null;
};
```

zamień na (dodanie pól przeglądu):
```typescript
type RunRow = {
  id: string;
  conversationId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  brief: unknown;
  selectedIdeaIds: unknown;
  startedByUserId: string | null;
  contentKind: string | null;
  pipelinePhase: string | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  outlineRefineCount: number;
  copyRefineCount: number;
  recoveryAttempts: number;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
  createdAt: Date;
  startedBy: { id: string; email: string } | null;
};
```

teraz (metoda `toSnapshot` — fragment `base`):
```typescript
    const base = {
      id: createRunId(row.id),
      // ...
      recoveryAttempts: row.recoveryAttempts,
      createdAt: row.createdAt,
      startedBy: row.startedBy,
    };
```

zamień na (dopisanie pól przeglądu do `base`):
```typescript
    const base = {
      id: createRunId(row.id),
      conversationId: createConversationId(row.conversationId),
      language: row.language,
      status: row.status,
      selectedIdeaIds: toSelectedIdeaIds(row.selectedIdeaIds),
      startedByUserId:
        row.startedByUserId && isUserId(row.startedByUserId)
          ? createUserId(row.startedByUserId)
          : null,
      pipelinePhase: toPipelinePhase(row.pipelinePhase),
      ideasRefineCount: row.ideasRefineCount,
      contentRefineCount: row.contentRefineCount,
      outlineRefineCount: row.outlineRefineCount,
      copyRefineCount: row.copyRefineCount,
      recoveryAttempts: row.recoveryAttempts,
      userRating: row.userRating,
      outputEdited: row.outputEdited,
      reviewFinalizedAt: row.reviewFinalizedAt,
      createdAt: row.createdAt,
      startedBy: row.startedBy,
    };
```

oraz zmień adnotacje snapshotów w `toSnapshot` (dziś `SocialRunRecord & Pick<RunSnapshot, 'startedBy'>` — za wąskie po poszerzeniu `RunSnapshot`):

```typescript
type RunReviewFields = Pick<
  RunSnapshot,
  'startedBy' | 'userRating' | 'outputEdited' | 'reviewFinalizedAt'
>;

const snapshot: SocialRunRecord & RunReviewFields = {
  ...base,
  taskType: row.taskType,
  platform: row.platform,
  contentKind: null,
  brief: briefParsed.data,
};
```

(analogicznie `ContentRunRecord & RunReviewFields` w gałęzi Content).

dodaj nowe metody do klasy `PrismaRunAdapter` (przed lub po `saveSelectedIdeaIds`):

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
    return rows.map((row) => {
      if (!isRunTaskType(row.taskType)) {
        throw new Error(`Run.taskType is not a RunTaskType: ${row.taskType}`);
      }
      if (!isRunPlatform(row.platform)) {
        throw new Error(`Run.platform is not a RunPlatform: ${row.platform}`);
      }
      if (!isContentLanguage(row.language)) {
        throw new Error(`Run.language is not a ContentLanguage: ${row.language}`);
      }
      if (!isRunStatus(row.status)) {
        throw new Error(`Run.status is not a RunStatus: ${row.status}`);
      }
      return {
        runId: createRunId(row.id),
        taskType: row.taskType,
        platform: row.platform,
        language: row.language,
        status: row.status,
        createdAt: row.createdAt,
      };
    });
  }

  async saveRating(id: RunId, rating: number | null): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { userRating: rating },
    });
    return result.count === 1;
  }

  async saveOutputEdited(id: RunId): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { outputEdited: true },
    });
    return result.count === 1;
  }

  async saveFinalizedAt(id: RunId, at: Date): Promise<boolean> {
    const result = await this.prisma.run.updateMany({
      where: { id, reviewFinalizedAt: null },
      data: { reviewFinalizedAt: at },
    });
    return result.count === 1;
  }
```

(Dopisać import `isRunPlatform` z `@content-chain/shared` — `isRunTaskType` / `isContentLanguage` / `isRunStatus` już są w pliku. **Zakaz** `as RunTaskType` / `as RunStatus` w tym mapperze — ten sam styl co `toSnapshot` / R-3d1.)

**Refaktor** `apps/api/src/runs/application/get-run.use-case.ts` — rozszerzenie `GetRunOutput`:

teraz:
```typescript
export interface GetRunOutput {
  runId: RunId;
  // ...
  createdAt: string;
  startedBy: RunStartedBy | null;
  result: { ... };
  hitl: { ... } | null;
}
```

zamień na (dopisanie pól przeglądu):
```typescript
export interface GetRunOutput {
  runId: RunId;
  taskType: RunTaskType;
  platform: RunPlatform;
  contentKind: ContentKind | null;
  language: ContentLanguage;
  brief: SocialBrief | ContentBrief;
  status: RunStatus;
  conversationId: ConversationId;
  createdAt: string;
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: string | null;
  result: {
    ideas: SocialIdea[];
    content: SocialContent | null;
    contents: SocialContentItem[];
    reelIdeas: ReelIdea[];
    reelScript: ReelScript | null;
    reelScripts: ReelScriptItem[];
    pageOutline: PageOutline | null;
    pageDocument: PageDocument | null;
  };
  hitl: {
    options: SocialIdea[] | ReelIdea[] | PageOutline[];
  } | null;
}
```

teraz (return statement w `execute`, fragment po `startedBy: run.startedBy`):
```typescript
    return {
      // ...
      startedBy: run.startedBy,
      result: { ... },
      hitl,
    };
```

zamień na:
```typescript
    return {
      // ...
      startedBy: run.startedBy,
      userRating: run.userRating,
      outputEdited: run.outputEdited,
      reviewFinalizedAt: run.reviewFinalizedAt?.toISOString() ?? null,
      result: { ... },
      hitl,
    };
```

**Nowy plik** `apps/api/src/runs/application/list-runs-user.use-case.ts`:

```typescript
// apps/api/src/runs/application/list-runs-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type LightRunItem, type RunRepository } from '../domain/run.port';
import type { UserId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

export type ListRunsUserOutput = {
  items: Array<{
    runId: string;
    taskType: string;
    platform: string;
    language: string;
    status: string;
    createdAt: string;
  }>;
};

@Injectable()
export class ListRunsUserUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(
    userId: UserId,
    requestingUser: AuthUserContext,
  ): Promise<ListRunsUserOutput> {
    // SPEC-RUNY.md R-3c: :userId musi równać się sesji; bez wyjątku admin
    if (userId !== requestingUser.id) {
      throw new DomainException('FORBIDDEN', 'Access to other user runs is forbidden', 403);
    }
    const items = await this.runs.listByUser(userId);
    return {
      items: items.map((item) => ({
        runId: item.runId,
        taskType: item.taskType,
        platform: item.platform,
        language: item.language,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
      })),
    };
  }
}
```

**Refaktor** `apps/api/src/runs/runs.controller.ts` — nowa trasa `GET user/:userId` PRZED `GET :runId`:

teraz (fragment — importy i metody `get` + `list`):
```typescript
  @Get()
  list(@Query() query: ListRunsQueryDto): Promise<unknown> {
    // ...
  }

  @Get(':runId')
  get(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getRun.execute(runId);
  }
```

zamień na (dodanie trasy user/:userId między list a :runId; `createUserId` / `isUserId` już zaimportowane w żywym kontrolerze):
```typescript
import { ListRunsUserUseCase } from './application/list-runs-user.use-case';

  // Trasa statyczna user/:userId musi być przed :runId — NestJS dopasowuje od góry.
  // :runId/logs i :runId/events zostają tam gdzie są (przed gołym :runId).
  @Get('user/:userId')
  async getRunsByUser(
    @Param('userId') userId: string,
    @CurrentUser() user: AuthUserContext,
  ) {
    if (!isUserId(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    return this.listRunsUser.execute(createUserId(userId), user);
  }

  @Get()
  list(@Query() query: ListRunsQueryDto): Promise<unknown> {
    // ... (bez zmian)
  }

  @Get(':runId')
  get(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getRun.execute(runId);
  }
```

Oraz dodać `ListRunsUserUseCase` do konstruktora `RunsController`:

```typescript
  constructor(
    private readonly startRun: StartRunUseCase,
    private readonly getRun: GetRunUseCase,
    private readonly getLogs: GetRunLogsUseCase,
    private readonly resumeHitl: ResumeHitlUseCase,
    private readonly listRuns: ListRunsUseCase,
    private readonly listRunsUser: ListRunsUserUseCase, // NOWE
    @Inject(RUN_SSE_HUB) private readonly sse: RunSseHub,
    @Inject(ENV) private readonly env: Env,
  ) {}
```

**Refaktor** `apps/api/src/runs/runs.module.ts` — dopisanie `ListRunsUserUseCase` do providers:

teraz:
```typescript
  providers: [
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
  ],
```

zamień na:
```typescript
import { ListRunsUserUseCase } from './application/list-runs-user.use-case';

  providers: [
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
    ListRunsUserUseCase,
  ],
```

**DoD kroku:**
- `GET /api/v1/runs/user/:userId` przy sesji właściciela → lista lekka `{ runId, taskType, platform, language, status, createdAt }`
- Cudzy `:userId` → 403 `FORBIDDEN` (brak wyjątku dla admin)
- `GET /api/v1/runs/:runId` snapshot zawiera `userRating`, `outputEdited`, `reviewFinalizedAt`
- Istniejące runy (sprzed migracji) — `userRating: null`, `outputEdited: false`, `reviewFinalizedAt: null` w snapshotcie
- `toSnapshot` kompiluje się z `RunReviewFields` (obie gałęzie unii); `listByUser` bez `as`
- Pięć `unusedRepo` + `asSnapshot` w specach Runs uzupełnione o `listByUser` / `saveRating` / `saveOutputEdited` / `saveFinalizedAt` oraz pola przeglądu (`userRating: null`, `outputEdited: false`, `reviewFinalizedAt: null`)
- TypeScript kompiluje się; `pnpm --filter api test` (unit) bez regresji D-4..D-22

W każdym `unusedRepo` dopisać stuby (wzorzec `unexpected` jak pozostałe metody): `listByUser`, `saveRating`, `saveOutputEdited`, `saveFinalizedAt`. `asSnapshot`:

```typescript
function asSnapshot(run: RunRecord): RunSnapshot {
  return {
    ...run,
    startedBy: null,
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
  };
}
```

---

### KROK 2 — BC Feedback: domain, application, infrastructure, FeedbackController, FeedbackModule

**Status:** `WYKONANY`

**Cel:** Zbudować BC Feedback od zera: walidacja targetu, sprawdzenie własności runu, zapis do DB.  
Odwołanie: `SPEC-FEEDBACK.md` Fbk-1..Fbk-7; `docs/dokumentacja_komunikacji.md` POST /feedback.

**Artefakty (nowe pliki):**
- `apps/api/src/feedback/domain/feedback.types.ts`
- `apps/api/src/feedback/domain/feedback-run.reader.port.ts`
- `apps/api/src/feedback/application/feedback.schemas.ts`
- `apps/api/src/feedback/application/create-feedback.use-case.ts`
- `apps/api/src/feedback/application/create-feedback.use-case.spec.ts`
- `apps/api/src/feedback/infrastructure/prisma-feedback.adapter.ts`
- `apps/api/src/feedback/infrastructure/prisma-feedback-run-reader.adapter.ts`
- `apps/api/src/feedback/http/dto/create-feedback.dto.ts`
- `apps/api/src/feedback/feedback.controller.ts`
- `apps/api/src/feedback/feedback.module.ts`

**Artefakty (refaktory):**
- `apps/api/src/app.module.ts` — dopisanie `FeedbackModule` do imports

**Implementacja:**

```typescript
// apps/api/src/feedback/domain/feedback.types.ts
import type {
  FeedbackAgentKey,
  FeedbackId,
  FeedbackTargetType,
  RunId,
  UserId,
} from '@content-chain/shared';

export type FeedbackEntry = {
  id: FeedbackId;
  targetType: FeedbackTargetType;
  agentKey: FeedbackAgentKey | null;
  runId: RunId | null;
  body: string;
  authorId: UserId;
  createdAt: Date;
};

export const FEEDBACK_BODY_MAX = 4000;

export const FEEDBACK_REPOSITORY = Symbol('FEEDBACK_REPOSITORY');

export interface FeedbackRepository {
  save(entry: FeedbackEntry): Promise<void>;
}
```

```typescript
// apps/api/src/feedback/domain/feedback-run.reader.port.ts
import type { RunId, UserId } from '@content-chain/shared';

export const FEEDBACK_RUN_READER = Symbol('FEEDBACK_RUN_READER');

/** Wynik odczytu inicjatora — rozróżnia brak wiersza od runu bez startedBy. */
export type FeedbackRunLookup =
  | { kind: 'missing' }
  | { kind: 'found'; startedBy: UserId | null };

/**
 * Port do odczytu startedByUserId z runu — bez importu SocialModule ani ContentModule.
 * Implementacja przez adapter Prisma bezpośrednio na tabeli Run (nie cały RUN_REPOSITORY).
 */
export interface FeedbackRunReader {
  getStartedBy(runId: RunId): Promise<FeedbackRunLookup>;
}
```

```typescript
// apps/api/src/feedback/application/feedback.schemas.ts
import { z } from 'zod';
import { FEEDBACK_AGENT_KEYS } from '@content-chain/shared';
import { FEEDBACK_BODY_MAX } from '../domain/feedback.types';

const [firstAgentKey, ...restAgentKeys] = FEEDBACK_AGENT_KEYS;
if (firstAgentKey === undefined) {
  throw new Error('FEEDBACK_AGENT_KEYS must not be empty');
}
const agentKeySchema = z.enum([firstAgentKey, ...restAgentKeys]);

export const createFeedbackSchema = z.discriminatedUnion('targetType', [
  z.object({
    targetType: z.literal('application'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
  }),
  z.object({
    targetType: z.literal('agent'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
    agentKey: agentKeySchema,
  }),
  z.object({
    targetType: z.literal('run'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
    runId: z.string().min(1),
  }),
]);

export type CreateFeedbackCommand = z.infer<typeof createFeedbackSchema>;
```

```typescript
// apps/api/src/feedback/application/create-feedback.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  createFeedbackId,
  isRunId,
  createRunId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  FEEDBACK_REPOSITORY,
  type FeedbackEntry,
  type FeedbackRepository,
} from '../domain/feedback.types';
import {
  FEEDBACK_RUN_READER,
  type FeedbackRunReader,
} from '../domain/feedback-run.reader.port';
import { createFeedbackSchema } from './feedback.schemas';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { FeedbackAgentKey, RunId } from '@content-chain/shared';

@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    @Inject(FEEDBACK_REPOSITORY)
    private readonly feedbacks: FeedbackRepository,
    @Inject(FEEDBACK_RUN_READER) private readonly runReader: FeedbackRunReader,
  ) {}

  async execute(
    input: unknown,
    author: AuthUserContext,
  ): Promise<FeedbackEntry> {
    const command = parseWithZod(createFeedbackSchema, input);

    let runId: RunId | null = null;
    let agentKey: FeedbackAgentKey | null = null;

    if (command.targetType === 'run') {
      if (!isRunId(command.runId)) {
        throw new DomainException(
          'VALIDATION_FAILED',
          'Invalid runId format',
          400,
        );
      }
      runId = createRunId(command.runId);
      const lookup = await this.runReader.getStartedBy(runId);
      if (lookup.kind === 'missing') {
        throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
      }
      // Fbk-3: startedBy runu = autor sesji (także run bez inicjatora = nie twoje)
      if (lookup.startedBy === null || lookup.startedBy !== author.id) {
        throw new DomainException(
          'FORBIDDEN',
          'Cannot leave feedback on another user run',
          403,
        );
      }
    }

    if (command.targetType === 'agent') {
      agentKey = command.agentKey;
    }

    const entry: FeedbackEntry = {
      id: createFeedbackId(`fbk_${uuidv4()}`),
      targetType: command.targetType,
      agentKey,
      runId,
      body: command.body,
      authorId: author.id,
      createdAt: new Date(),
    };

    await this.feedbacks.save(entry);
    return entry;
  }
}
```

```typescript
// apps/api/src/feedback/infrastructure/prisma-feedback.adapter.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import type { FeedbackEntry, FeedbackRepository } from '../domain/feedback.types';

@Injectable()
export class PrismaFeedbackAdapter implements FeedbackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(entry: FeedbackEntry): Promise<void> {
    await this.prisma.feedback.create({
      data: {
        id: entry.id,
        targetType: entry.targetType,
        agentKey: entry.agentKey,
        runId: entry.runId,
        body: entry.body,
        authorId: entry.authorId,
        createdAt: entry.createdAt,
      },
    });
  }
}
```

```typescript
// apps/api/src/feedback/infrastructure/prisma-feedback-run-reader.adapter.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, isUserId, type RunId } from '@content-chain/shared';
import type {
  FeedbackRunLookup,
  FeedbackRunReader,
} from '../domain/feedback-run.reader.port';

/**
 * Czyta startedByUserId bezpośrednio z tabeli Run przez PrismaClient.
 * Nie importuje RunsModule / SocialModule / ContentModule — per SPEC-FEEDBACK.md Fbk-7
 * i SPEC-RUNY.md zakaz forwardRef.
 */
@Injectable()
export class PrismaFeedbackRunReaderAdapter implements FeedbackRunReader {
  constructor(private readonly prisma: PrismaService) {}

  async getStartedBy(runId: RunId): Promise<FeedbackRunLookup> {
    const row = await this.prisma.run.findUnique({
      where: { id: runId },
      select: { startedByUserId: true },
    });
    if (!row) return { kind: 'missing' };
    if (!row.startedByUserId || !isUserId(row.startedByUserId)) {
      return { kind: 'found', startedBy: null };
    }
    return { kind: 'found', startedBy: createUserId(row.startedByUserId) };
  }
}
```

```typescript
// apps/api/src/feedback/http/dto/create-feedback.dto.ts
import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  FEEDBACK_AGENT_KEYS,
  FEEDBACK_TARGET_TYPES,
} from '@content-chain/shared';
import { FEEDBACK_BODY_MAX } from '../../domain/feedback.types';

/** Suma kluczy HTTP; prawda = Zod discriminatedUnion w application (jak StartRunDto). */
export class CreateFeedbackDto {
  @IsIn([...FEEDBACK_TARGET_TYPES])
  targetType!: (typeof FEEDBACK_TARGET_TYPES)[number];

  @IsString()
  @MinLength(1)
  @MaxLength(FEEDBACK_BODY_MAX)
  body!: string;

  @IsOptional()
  @IsIn([...FEEDBACK_AGENT_KEYS])
  agentKey?: (typeof FEEDBACK_AGENT_KEYS)[number];

  @IsOptional()
  @IsString()
  @MinLength(1)
  runId?: string;
}
```

```typescript
// apps/api/src/feedback/feedback.controller.ts
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import { CreateFeedbackDto } from './http/dto/create-feedback.dto';
import type { AuthUserContext } from '../shared/types/auth-user-context';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly createFeedback: CreateFeedbackUseCase) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: CreateFeedbackDto,
    @CurrentUser() user: AuthUserContext,
  ) {
    const entry = await this.createFeedback.execute(body, user);
    return {
      id: entry.id,
      targetType: entry.targetType,
      agentKey: entry.agentKey,
      runId: entry.runId,
      body: entry.body,
      authorId: entry.authorId,
      createdAt: entry.createdAt.toISOString(),
    };
  }
}
```

```typescript
// apps/api/src/feedback/feedback.module.ts
import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import { PrismaFeedbackAdapter } from './infrastructure/prisma-feedback.adapter';
import { PrismaFeedbackRunReaderAdapter } from './infrastructure/prisma-feedback-run-reader.adapter';
import { FEEDBACK_REPOSITORY } from './domain/feedback.types';
import { FEEDBACK_RUN_READER } from './domain/feedback-run.reader.port';
import { PrismaModule } from '../shared/persistence/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackController],
  providers: [
    CreateFeedbackUseCase,
    PrismaFeedbackAdapter,
    PrismaFeedbackRunReaderAdapter,
    { provide: FEEDBACK_REPOSITORY, useExisting: PrismaFeedbackAdapter },
    { provide: FEEDBACK_RUN_READER, useExisting: PrismaFeedbackRunReaderAdapter },
  ],
})
export class FeedbackModule {}
```

**Refaktor** `apps/api/src/app.module.ts` — dopisanie `FeedbackModule` do imports:

teraz (fragment imports tablicy):
```typescript
    MetricsModule,
  ],
```

zamień na:
```typescript
import { FeedbackModule } from './feedback/feedback.module';

    MetricsModule,
    FeedbackModule,
  ],
```

**Biblioteki / API:**
- `z.discriminatedUnion('targetType', [...])` — Zod 3, walidacja per target type (prawda); DTO HTTP = suma kluczy pod `ValidationPipe`
- `PrismaFeedbackRunReaderAdapter` — bezpośredni dostęp do `prisma.run` bez importu `RunsModule`; zgodny z zakazem `forwardRef` z Kroku 4.5 major
- `FeedbackRunLookup` — `missing` vs `found` (Fbk-3: 404 vs 403)

**DoD kroku:**
- `POST /api/v1/feedback` (201): `targetType=application` → wiersz z `authorId` = sesja
- `POST /api/v1/feedback` z `targetType=agent` + poprawny `agentKey` → 201; nieznany `agentKey` → 400
- `POST /api/v1/feedback` z `targetType=run` + własny `runId` → 201; cudzy run → 403; nieistniejący run → **404** `RUN_NOT_FOUND`; zły format `runId` → 400 `VALIDATION_FAILED`
- Unit: `CreateFeedbackUseCase` z fake portami pokrywa 201 / 403 / 404 (bez HTTP)
- Wiele wpisów tego samego autora na ten sam target — dozwolone (append-only)
- Brak `GET` kolekcji / panelu (MVP)
- `FeedbackModule` nie importuje `SocialModule`, `ContentModule` ani `RunsModule`
- Brak `forwardRef` między Feedback a Runs

---

### KROK 2.1 — Warunek statusu przy feedbacku tekstowym o runie

**Status:** `WYKONANY`

**Cel:** `POST /api/v1/feedback` z `targetType=run` tylko gdy autor = `startedBy` **oraz** status `completed` \| `failed`.  
Refaktor względem: FAZA 4 / KROK 2 (`WYKONANY`) — Fbk-3 (własność bez statusu). Nie zmienia R-10 ani locka finalize.  
Odwołanie: `SPEC-FEEDBACK.md` Fbk-3a; `docs/dokumentacja_komunikacji.md` POST /feedback; `docs/anty_patterny.md`.

**Artefakty (refaktory):**
- `apps/api/src/feedback/domain/feedback-run.reader.port.ts` — na `kind: 'found'` dodać `status: RunStatus`
- `apps/api/src/feedback/infrastructure/prisma.feedback-run-reader.adapter.ts` — `select` też `status`; predykat `isRunStatus` (bez `as`)
- `apps/api/src/feedback/application/create-feedback.use-case.ts` — po checku autora: zły status → 409 `RUN_NOT_REVIEWABLE`, `save` nie wołane
- `apps/api/src/feedback/application/create-feedback.use-case.spec.ts` — happy path z `status: 'completed'` (oraz analog `failed`); nieterminalne statusy → 409; application/agent bez lookupu statusu; terminalny status po „finalize” w faku → zapis nadal OK

**Implementacja:**

**Refaktor** `feedback-run.reader.port.ts` — rozszerzenie unii `found`:

teraz:
```typescript
export type FeedbackRunLookup =
  | { kind: 'missing' }
  | { kind: 'found'; startedBy: UserId | null };
```

zamień na (dopisać `RunStatus` do istniejącego importu z `@content-chain/shared`):
```typescript
export type FeedbackRunLookup =
  | { kind: 'missing' }
  | { kind: 'found'; startedBy: UserId | null; status: RunStatus };
```

**Refaktor** `prisma.feedback-run-reader.adapter.ts` — `select: { startedByUserId, status }`; gdy wiersz jest, a `!isRunStatus(row.status)` → `throw new Error(...)` (ten sam styl co `listByUser` / R-3d1). Gałąź `found` zwraca `status: row.status`.

**Refaktor** `create-feedback.use-case.ts` — **po** istniejącym checku Fbk-3 (404 / 403), **przed** budową `entry`:

```typescript
      if (lookup.status !== 'completed' && lookup.status !== 'failed') {
        throw new DomainException(
          'RUN_NOT_REVIEWABLE',
          'Run is not in a reviewable state',
          409,
        );
      }
```

Kolejność: format `runId` → missing → własność → status → `save`. Cudzy run w toku zostaje **403**, nie 409.

**Zakazy:** import `assertRunReviewable` / `RunsModule` / `SocialModule` / `ContentModule`; `REVIEW_LOCKED` na ścieżce tekstu; zmiana `GET /runs/user/:userId` / `listByUser`.

**DoD kroku:**
- `POST /feedback` `targetType=run` + własny `completed` albo `failed` → 201
- Własny run `queued` / `running` / `awaiting_hitl` / `interrupted` → **409** `RUN_NOT_REVIEWABLE`; `save` nie wołane
- Cudzy run / brak wiersza / zły format — bez regresji Fbk-3 (403 / 404 / 400)
- `application` / `agent` — 201 bez odczytu statusu runu
- Drugi wpis na ten sam `runId` po `reviewFinalizedAt` — nadal 201 (append)
- Unit: faki `FeedbackRunLookup` z polem `status`; `pnpm --filter api test` (unit) zielone

---

### KROK 3 — Review runu: use-case'y + HTTP endpoints + snapshot + Postman

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Zaimplementować pełny cykl przeglądu runu: ocena gwiazdkowa, flaga edycji outputu, finalize. Dopisać endpointy do `RunsController`. Snapshot już zaktualizowany w KROK 1.  
Odwołanie: `SPEC-RUNY.md` R-10; `docs/dokumentacja_komunikacji.md` PATCH rating / POST output-edited / POST finalize-review.

**Artefakty (nowe pliki):**
- `apps/api/src/runs/domain/assert-run-reviewable.ts`
- `apps/api/src/runs/domain/assert-run-reviewable.spec.ts`
- `apps/api/src/runs/application/rate-run.use-case.ts`
- `apps/api/src/runs/application/flag-output-edited.use-case.ts`
- `apps/api/src/runs/application/finalize-review.use-case.ts`
- `apps/api/src/runs/http/dto/patch-run-rating.dto.ts`

**Artefakty (refaktory):**
- `apps/api/src/runs/runs.controller.ts` — nowe trasy PATCH rating, POST output-edited, POST finalize-review; dopisać `Patch` do importu z `@nestjs/common`
- `apps/api/src/runs/runs.module.ts` — dopisanie nowych use-case'ów

**Implementacja:**

```typescript
// apps/api/src/runs/domain/assert-run-reviewable.ts
import type { UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { RunSnapshot } from './run.port';

/**
 * R-10: run istnieje, status completed|failed, aktor = startedBy, przegląd otwarty.
 * Wzorzec jak assertTransition — jedna asercja, trzy use-case'y tylko wołają.
 */
export function assertRunReviewable(
  run: RunSnapshot | null,
  actorId: UserId,
): asserts run is RunSnapshot {
  if (!run) {
    throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
  }
  if (run.status !== 'completed' && run.status !== 'failed') {
    throw new DomainException(
      'RUN_NOT_REVIEWABLE',
      'Run is not in a reviewable state',
      409,
    );
  }
  if (run.startedByUserId !== actorId) {
    throw new DomainException('FORBIDDEN', 'Access denied', 403);
  }
  if (run.reviewFinalizedAt !== null) {
    throw new DomainException(
      'REVIEW_LOCKED',
      'Review is already finalized',
      409,
    );
  }
}
```

```typescript
// apps/api/src/runs/http/dto/patch-run-rating.dto.ts
import { IsIn, ValidateIf } from 'class-validator';

export class PatchRunRatingDto {
  @ValidateIf((_, value: unknown) => value !== null)
  @IsIn([1, 2, 3, 4, 5])
  rating!: 1 | 2 | 3 | 4 | 5 | null;
}
```

```typescript
// apps/api/src/runs/application/rate-run.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

const ratingSchema = z.object({
  rating: z.union([z.null(), z.number().int().min(1).max(5)]),
});

@Injectable()
export class RateRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(runId: RunId, input: unknown, actor: AuthUserContext) {
    const { rating } = parseWithZod(ratingSchema, input);
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);
    const updated = await this.runs.saveRating(runId, rating);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }
    return {
      runId: run.id,
      userRating: rating,
      reviewFinalizedAt: null,
    };
  }
}
```

```typescript
// apps/api/src/runs/application/flag-output-edited.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class FlagOutputEditedUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(runId: RunId, actor: AuthUserContext) {
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);
    const updated = await this.runs.saveOutputEdited(runId);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }
    return { runId: run.id, outputEdited: true };
  }
}
```

```typescript
// apps/api/src/runs/application/finalize-review.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class FinalizeReviewUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(runId: RunId, actor: AuthUserContext) {
    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);

    const finalizedAt = new Date();
    const updated = await this.runs.saveFinalizedAt(runId, finalizedAt);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    return {
      runId: run.id,
      userRating: run.userRating,
      outputEdited: run.outputEdited,
      reviewFinalizedAt: finalizedAt.toISOString(),
    };
  }
}
```

**Refaktor** `apps/api/src/runs/runs.controller.ts` — nowe endpointy review (dopisać po istniejących trasach, przed końcem klasy):

dopisz importy (`Patch` z `@nestjs/common` — dziś kontroler go nie importuje):
```typescript
import { Patch } from '@nestjs/common';
import { RateRunUseCase } from './application/rate-run.use-case';
import { FlagOutputEditedUseCase } from './application/flag-output-edited.use-case';
import { FinalizeReviewUseCase } from './application/finalize-review.use-case';
import { PatchRunRatingDto } from './http/dto/patch-run-rating.dto';
```

dopisz do konstruktora:
```typescript
    private readonly rateRun: RateRunUseCase,
    private readonly flagOutputEdited: FlagOutputEditedUseCase,
    private readonly finalizeReview: FinalizeReviewUseCase,
```

dopisz nowe metody (przed zamknięciem klasy):
```typescript
  @Patch(':runId/rating')
  @HttpCode(200)
  async patchRating(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @Body() body: PatchRunRatingDto,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.rateRun.execute(runId, body, user);
  }

  @Post(':runId/output-edited')
  @HttpCode(200)
  async postOutputEdited(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.flagOutputEdited.execute(runId, user);
  }

  @Post(':runId/finalize-review')
  @HttpCode(200)
  async postFinalizeReview(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.finalizeReview.execute(runId, user);
  }
```

**Refaktor** `apps/api/src/runs/runs.module.ts` — dopisanie nowych use-case'ów do providers:

teraz:
```typescript
  providers: [
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
    ListRunsUserUseCase,
  ],
```

zamień na:
```typescript
import { RateRunUseCase } from './application/rate-run.use-case';
import { FlagOutputEditedUseCase } from './application/flag-output-edited.use-case';
import { FinalizeReviewUseCase } from './application/finalize-review.use-case';

  providers: [
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
    ListRunsUseCase,
    ListRunsUserUseCase,
    RateRunUseCase,
    FlagOutputEditedUseCase,
    FinalizeReviewUseCase,
  ],
```

**Postman — nowe requesty** w pliku kolekcji (lub osobna kolekcja `review.postman-collection.json`):

```
Setup: POST /auth/login → zapisz cc_access cookie
R1. PATCH /api/v1/runs/:runId/rating  body: { "rating": 4 }
    oczekiwane: 200 { runId, userRating: 4, reviewFinalizedAt: null }
R2. PATCH /api/v1/runs/:runId/rating  body: { "rating": null }
    oczekiwane: 200 { userRating: null }
R3. POST  /api/v1/runs/:runId/output-edited
    oczekiwane: 200 { runId, outputEdited: true }
R4. POST  /api/v1/runs/:runId/finalize-review
    oczekiwane: 200 { runId, userRating, outputEdited, reviewFinalizedAt: "<ISO>" }
R5. PATCH /api/v1/runs/:runId/rating  body: { "rating": 5 }   (po finalize)
    oczekiwane: 409 REVIEW_LOCKED
R6. PATCH /api/v1/runs/:runId/rating  (run ze statusem running)
    oczekiwane: 409 RUN_NOT_REVIEWABLE
R7. POST /api/v1/feedback  body: { "targetType": "run", "runId": "<własny completed|failed>", "body": "Świetnie!" }
    oczekiwane: 201 z id fbk_...
R7b. POST /api/v1/feedback  body: { "targetType": "run", "runId": "run_<uuid-nieistniejący>", "body": "…" }
    oczekiwane: 404 RUN_NOT_FOUND
R7c. POST /api/v1/feedback  body: { "targetType": "run", "runId": "<własny running>", "body": "Za wcześnie" }
    oczekiwane: 409 RUN_NOT_REVIEWABLE
R8. GET /api/v1/runs/user/:userId
    oczekiwane: 200 { items: [...] }
R9. GET /api/v1/runs/user/:innyUserId
    oczekiwane: 403 FORBIDDEN
```

**DoD kroku:**
- `PATCH .../rating` z `{ rating: 1..5 }` → `userRating` zaktualizowany; `{ rating: null }` → `userRating: null`
- `POST .../output-edited` → `outputEdited: true`; ponowne wywołanie po finalize → 409 `REVIEW_LOCKED`
- `POST .../finalize-review` → `reviewFinalizedAt` ustawiony; drugie wywołanie → 409 `REVIEW_LOCKED`
- Run ze statusem `running` / `queued` / `awaiting_hitl` / `interrupted` → 409 `RUN_NOT_REVIEWABLE`
- Cudza sesja na którymkolwiek endpoint review → 403 `FORBIDDEN`
- `GET /api/v1/runs/:runId` snapshot: `userRating`, `outputEdited`, `reviewFinalizedAt` zawsze w JSON (null / false / null przy braku)
- Unit: `assertRunReviewable` pokrywa 404 / 409 `RUN_NOT_REVIEWABLE` / 403 / 409 `REVIEW_LOCKED`
- Postman case'y R1–R9 (+ R7b, R7c) przechodzą (z ważną sesją)
- `pnpm --filter api test` (unit) zielone; brak regresji D-4..D-22
- `pnpm --filter api test:e2e` osobno, gdy suite e2e jest odpalany — nie mylić ze skryptem `test`

---

## Weryfikacja wycinka (DoD FAZY 3 + 4)

- [ ] `packages/shared` eksportuje `FeedbackId`, `FeedbackTargetType`, `FeedbackAgentKey` + predicaty
- [ ] Migracja `feedback-and-run-review` zastosowana: tabela `Feedback` istnieje; `Run` ma `userRating`, `outputEdited`, `reviewFinalizedAt`
- [ ] Istniejące runy nie zepsuły się po migracji (domyślne wartości)
- [ ] `GET /api/v1/runs/user/:userId` zwraca listę lekką; cudzy id → 403
- [ ] `POST /api/v1/feedback` — 201 dla application / agent / własny run `completed`\|`failed`; 403 dla cudzego run; **404** `RUN_NOT_FOUND` dla nieistniejącego; **409** `RUN_NOT_REVIEWABLE` dla własnego runu w toku (Fbk-3a); 400 dla nieznanego agentKey / złego formatu `runId`
- [ ] Wiele feedbacków tego samego autora na ten sam target — dozwolone
- [ ] `PATCH .../rating`, `POST .../output-edited`, `POST .../finalize-review` — reguły R-10 przez `assertRunReviewable` + `updateMany`
- [ ] Snapshot `GET /runs/:runId` zawiera pola przeglądu (zawsze w JSON — null/false/null przy braku)
- [ ] `FeedbackModule` nie importuje `RunsModule`, `SocialModule`, `ContentModule`; brak `forwardRef`
- [ ] Faki `RunRepository` / `asSnapshot` oraz `toSnapshot` (`RunReviewFields`) kompilują się
- [ ] Zgodność z `SPEC-FEEDBACK.md` Fbk-3 / Fbk-3a, `SPEC-RUNY.md` R-10, R-3b, R-3c
- [ ] `pnpm --filter api test` (unit) zielone

---

## Ślad do major (po implementacji i zatwierdzeniu)

Po realnej implementacji kodu wg FAZY 3 + 4 tego planu:

| Element major | Oczekiwany status |
|---|---|
| Krok 6.1 | `WYKONANY` |
| Krok 6.2 | `WYKONANY` |
| Krok 6.3 | `WYKONANY` |
| Faza 6 | `WYKONANY` |
| MILESTONE 6 | `OSIĄGNIĘTY` |

Łącznie z plikiem _1: cały wycinek Faza 5 → MILESTONE 6 domknięty.  
Następny krok w major: Faza 9 — Zod 4 (wyłącznie na końcu, po MILESTONE 6 i za jawnym życzeniem użytkownika).

> Statusy major zmienia użytkownik ręcznie po realnej implementacji — ten plan ich nie modyfikuje.
