# Content Chain — feature plan: zarządzanie użytkownikami (Faza 21)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-21-users-management.md`  
**Kotwica major:** Faza 21 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 5 (`WYKONANY`) — `SoftDeleteUserUseCase` / DELETE zawsze soft; Faza 12 (`WYKONANY`) — cancel wyłącznie `startedBy`; JWT validate bez checku DB; Faza 18 (`WYKONANY`) — runtime `guest` / Redis ratings (czyszczenie per-konto poza 18).  
**Źródła kanonu (nie treść Fazy 5/12 „zawsze soft” / „cancel tylko owner”):** `users-management-plan.md`, `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/data_flow.md`, `SPEC-AUTH.md` A-10 / A-10a / A-3c, `SPEC-RUNY.md` R-11, `SPEC-KOMUNIKACJA.md` K-2c / K-2e / K-2j / K-8, `SPEC-PERSISTENCE.md` D21, `SPEC-FEEDBACK.md` Fbk-9, `SPEC-BEZPIECZENSTWO.md` B-12, `SPEC-TESTY.md` D-25 / D-26 / D-63…D-72, major Faza 21.  
**Pass rozwojowy:** porty purge + Redis → `startedBy.role` + cancel → JWT `isActive` → `DeleteUserUseCase` / A-10a / HTTP → testy. **Przesunięcia:** porty i detail `role` wcześniej niż numeracja HOW majoru (pkt 1 / 5 / 6); testy na końcu. **Brak przesunięć między fazami major.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | `DELETE /users/:id` soft `user` / hard+`purge` `guest`; A-10a tylko `user`; R-11 admin→guest; `startedBy.role` na detail; Redis DEL ratings SCAN; `JwtCookieStrategy` + `isActive`/null → 401 |
| Major | Faza 21 (`NIE_ROZPOCZĘTY` → po implementacji gate `WYKONANY`); start po Fazach 1–20 (`WYKONANY`); **bez** MILESTONE 21 |
| HTTP | Jedna trasa `DELETE /api/v1/users/:id`; opcjonalny query `purge=true` (skutek tylko `guest`+live) |
| Poza zakresem | UI FE (major FE Faza 16); reset / bulk / wipe; soft `guest`; hard `user`; blacklista JWT; DEL globalnego `daily:runs`; `startedBy.role` na liście `GET /runs`; Cancel admin na archiwum |
| Po implementacji (informacyjnie) | Major: Faza 21 → `WYKONANY` (DoD gate). Brak `MILESTONE` 21. Faza 5 / 12 / 18 / MILESTONE 5 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 21 (gate) | FAZA 1 / KROK 1–4 | Porty purge + Redis + Nest eksport |
| Faza 21 (gate) | FAZA 2 / KROK 1–2 | `startedBy.role` + cancel R-11 |
| Faza 21 (gate) | FAZA 3 / KROK 1 | JWT access `isActive`/null |
| Faza 21 (gate) | FAZA 4 / KROK 1–3 | DeleteUser + A-10a + HTTP |
| Faza 21 (gate) | FAZA 5 / KROK 1–2 | D-25/26/63–72 + Postman |

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma 6, Zod 4 w api, `ioredis` ^5.11, passport-jwt, monorepo `packages/shared`.
- `tsconfig` **bez** zmian. Typy jawne na granicach; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Semantyka wyłącznie po `target.role` — nie po `DEMO_MODE`.
- Soft `user` **dozwolony** przy live (bez 409). Hard tylko `guest`. Target `admin` → 403.
- `purge=true` zbędny (brak live / target `user`) → zachowanie jak bez flagi (bez osobnego błędu).
- Message **409** `GUEST_HAS_ACTIVE_RUN`: wspólny angielski string `Guest has an active run` (bez `details.runIds`).
- Jedna interaktywna tx Prisma na soft oraz na hard/purge (abort **przed** tx; Redis **po** commit, fail-open).
- Porty `GuestPurgePort` / `FeedbackPurgePort` przyjmują `Prisma.TransactionClient` (świadomy wyciek typu Prisma na sygnaturze portu pod jedną tx cross-BC — zgodnie z D21 / A-10 orkiestracją).
- Auth **nie** importuje fat controllera Runs do HTTP Users; DI: `GuestPurgeModule` + `GuestQuotaModule` + `FeedbackModule` + `RunAbortRegistry` z `RunLifecycleModule`.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

**Źródło:** Context7 MCP — `/prisma/docs`→`/prisma/web` (interactive `$transaction`); `/redis/ioredis` (`scan` + MATCH/COUNT, potem `del`). Nest Passport: `validate` może być `async` i zwracać `Promise` (wzorzec `@nestjs/passport` + istniejący `JwtCookieStrategy`). Wersje z `apps/api/package.json`: `@prisma/client@^6`, `ioredis@^5.11.1`, `@nestjs/common@^11`, `passport-jwt@^4.0.1`.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Tx | `prisma.$transaction(async (tx) => { … })` | Soft + hard/purge w jednej interactive tx |
| Redis SCAN | pętla `scan(cursor, 'MATCH', pattern, 'COUNT', n)` do cursora `"0"`; batch `del(...keys)` | Pattern `content-chain:guest:daily:ratings:{userId}:*`; **nie** `KEYS` |
| Fail-open Redis | try/catch wokół SCAN/DEL → log warning, hard i tak 200 | Jak rating fail-open Fazy 18 |
| JWT validate | `async validate(payload): Promise<AuthUserContext>` + `findById` | null / `!isActive` → `UNAUTHORIZED` 401 |

---

## FAZA 1 — Porty purge / Redis (Runs + Feedback + GuestQuota)

Odpowiada major Faza 21 HOW pkt 8 (+ fundament pod pkt 3–4). Porty **przed** `DeleteUserUseCase`.

---

### KROK 1 — `GuestPurgePort` + adapter Prisma

**Status:** `WYKONANY`

**Cel:** Runs eksportuje kasowanie drzewa runów gościa + detekcję live. `SPEC-RUNY.md` R-11 pkt 11, `SPEC-PERSISTENCE.md` D21, major HOW pkt 3–4 / 8.

**Artefakty:**

- Nowy: `apps/api/src/runs/domain/guest-purge.port.ts`
- Nowy: `apps/api/src/runs/infrastructure/persistence/prisma-guest-purge.adapter.ts`
- Nowy: `apps/api/src/runs/guest-purge.module.ts`
- Zmiana: `apps/api/src/runs/run-lifecycle.module.ts` — przenieś tu `RunAbortRegistry` (export)
- Zmiana: `apps/api/src/runs/runs.module.ts` — usuń lokalny provider `RunAbortRegistry`; bierz z `RunLifecycleModule`

#### Nowy plik — `guest-purge.port.ts`

```typescript
import type { Prisma } from '@prisma/client';
import type { RunId, UserId } from '@content-chain/shared';

export const GUEST_PURGE = Symbol('GUEST_PURGE');

export type GuestPurgeDeleteStats = {
  readonly runIds: readonly string[];
  readonly deletedRuns: number;
};

export interface GuestPurgePort {
  hasLiveRuns(userId: UserId): Promise<boolean>;
  listLiveRunIds(userId: UserId): Promise<RunId[]>;
  /**
   * Kasuje dzieci Run + wiersze Run dla `startedByUserId` wewnątrz podanej tx.
   * Kolejność: logs → social/content children → Run. **Bez** Feedback / User.
   */
  deleteRunTree(
    userId: UserId,
    tx: Prisma.TransactionClient,
  ): Promise<GuestPurgeDeleteStats>;
}

export const LIVE_RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
] as const;
```

#### Nowy plik — `prisma-guest-purge.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import {
  createRunId,
  type RunId,
  type UserId,
} from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import {
  LIVE_RUN_STATUSES,
  type GuestPurgeDeleteStats,
  type GuestPurgePort,
} from '../../domain/guest-purge.port';

@Injectable()
export class PrismaGuestPurgeAdapter implements GuestPurgePort {
  constructor(private readonly prisma: PrismaService) {}

  async hasLiveRuns(userId: UserId): Promise<boolean> {
    const count = await this.prisma.run.count({
      where: {
        startedByUserId: userId,
        status: { in: [...LIVE_RUN_STATUSES] },
      },
    });
    return count > 0;
  }

  async listLiveRunIds(userId: UserId): Promise<RunId[]> {
    const rows = await this.prisma.run.findMany({
      where: {
        startedByUserId: userId,
        status: { in: [...LIVE_RUN_STATUSES] },
      },
      select: { id: true },
    });
    return rows.map((row) => createRunId(row.id));
  }

  async deleteRunTree(
    userId: UserId,
    tx: Prisma.TransactionClient,
  ): Promise<GuestPurgeDeleteStats> {
    const runs = await tx.run.findMany({
      where: { startedByUserId: userId },
      select: { id: true },
    });
    const runIds = runs.map((r) => r.id);
    if (runIds.length === 0) {
      return { runIds: [], deletedRuns: 0 };
    }

    await tx.runLog.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialIdea.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialContent.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialReelIdea.deleteMany({ where: { runId: { in: runIds } } });
    await tx.socialReelScript.deleteMany({ where: { runId: { in: runIds } } });
    await tx.contentOutline.deleteMany({ where: { runId: { in: runIds } } });
    await tx.contentDocument.deleteMany({ where: { runId: { in: runIds } } });

    const deleted = await tx.run.deleteMany({
      where: { startedByUserId: userId },
    });

    return { runIds, deletedRuns: deleted.count };
  }
}
```

#### Nowy plik — `guest-purge.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { GUEST_PURGE } from './domain/guest-purge.port';
import { PrismaGuestPurgeAdapter } from './infrastructure/persistence/prisma-guest-purge.adapter';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaGuestPurgeAdapter,
    { provide: GUEST_PURGE, useExisting: PrismaGuestPurgeAdapter },
  ],
  exports: [GUEST_PURGE],
})
export class GuestPurgeModule {}
```

#### Refaktor — `RunAbortRegistry` → `RunLifecycleModule`

**teraz** (`runs.module.ts`): `providers: [RunAbortRegistry, …]`, `exports: [RunLifecycleModule, RunAbortRegistry]`.

**zamień na:** provider + export `RunAbortRegistry` w `run-lifecycle.module.ts`; w `runs.module.ts` usuń z `providers` / `exports` (import lifecycle już jest — AbortRegistry dostępny przez re-export lifecycle albo bezpośredni import lifecycle w Auth).

**DoD kroku:** `hasLiveRuns` / `listLiveRunIds` / `deleteRunTree` kompilują się; `GuestPurgeModule` eksportuje `GUEST_PURGE`; jeden singleton `RunAbortRegistry` z lifecycle.

---

### KROK 2 — `FeedbackPurgePort` + adapter

**Status:** `WYKONANY`

**Cel:** Fbk-9 — jawne kasowanie Feedback w tx hard/purge. `SPEC-FEEDBACK.md` Fbk-9.

**Artefakty:**

- Nowy: `apps/api/src/feedback/domain/feedback-purge.port.ts`
- Nowy: `apps/api/src/feedback/infrastructure/prisma-feedback-purge.adapter.ts`
- Zmiana: `apps/api/src/feedback/feedback.module.ts` — provider + **export** `FEEDBACK_PURGE`

#### Nowy plik — `feedback-purge.port.ts`

```typescript
import type { Prisma } from '@prisma/client';
import type { UserId } from '@content-chain/shared';

export const FEEDBACK_PURGE = Symbol('FEEDBACK_PURGE');

export interface FeedbackPurgePort {
  /**
   * Kasuje wiersze gdzie `authorId = guestUserId` **OR** `runId ∈ runIds`.
   */
  deleteForGuest(
    guestUserId: UserId,
    runIds: readonly string[],
    tx: Prisma.TransactionClient,
  ): Promise<number>;
}
```

#### Nowy plik — `prisma-feedback-purge.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { UserId } from '@content-chain/shared';
import type { FeedbackPurgePort } from '../domain/feedback-purge.port';

@Injectable()
export class PrismaFeedbackPurgeAdapter implements FeedbackPurgePort {
  async deleteForGuest(
    guestUserId: UserId,
    runIds: readonly string[],
    tx: Prisma.TransactionClient,
  ): Promise<number> {
    const result = await tx.feedback.deleteMany({
      where: {
        OR: [
          { authorId: guestUserId },
          ...(runIds.length > 0 ? [{ runId: { in: [...runIds] } }] : []),
        ],
      },
    });
    return result.count;
  }
}
```

#### Refaktor — `feedback.module.ts`

**teraz** — brak exportów.

**zamień na** (fragment providers + exports):

```typescript
import { FEEDBACK_PURGE } from './domain/feedback-purge.port';
import { PrismaFeedbackPurgeAdapter } from './infrastructure/prisma-feedback-purge.adapter';

// providers += 
PrismaFeedbackPurgeAdapter,
{ provide: FEEDBACK_PURGE, useExisting: PrismaFeedbackPurgeAdapter },

// exports:
exports: [FEEDBACK_PURGE],
```

**DoD kroku:** `FeedbackModule` eksportuje `FEEDBACK_PURGE`; delete OR author/runIds w tx.

---

### KROK 3 — `GuestQuotaPort.deleteDailyRatings`

**Status:** `WYKONANY`

**Cel:** SCAN + DEL `content-chain:guest:daily:ratings:{userId}:*`; fail-open. A-10 Redis; major HOW pkt 8.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/guest-quota.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/quota/ioredis-guest-quota.adapter.ts`
- Zmiana: `apps/api/src/runs/infrastructure/quota/unavailable-guest-quota.adapter.ts`
- Nowy (opcjonalnie unit): `apps/api/src/runs/infrastructure/quota/ioredis-guest-quota.adapter.spec.ts` — mock SCAN/DEL

#### Refaktor — `guest-quota.port.ts`

**teraz**

```typescript
export interface GuestQuotaPort {
  tryAdmitDailyRun(cap: number, now?: Date): Promise<GuestQuotaAdmitResult>;
  releaseDailyRun(now?: Date): Promise<void>;
  tryAdmitDailyRating(
    userId: UserId,
    cap: number,
    now?: Date,
  ): Promise<GuestQuotaAdmitResult>;
}
```

**zamień na**

```typescript
export interface GuestQuotaPort {
  tryAdmitDailyRun(cap: number, now?: Date): Promise<GuestQuotaAdmitResult>;
  releaseDailyRun(now?: Date): Promise<void>;
  tryAdmitDailyRating(
    userId: UserId,
    cap: number,
    now?: Date,
  ): Promise<GuestQuotaAdmitResult>;
  /**
   * DEL wszystkich kluczy ratings dla userId (SCAN). Fail-open: błąd Redis → `false` (bez throw).
   * Globalnego `daily:runs` **nie** ruszać. Sukces SCAN/DEL → `true`.
   */
  deleteDailyRatings(userId: UserId): Promise<boolean>;
}
```

#### Refaktor — `IoredisGuestQuotaAdapter` — dopisz metodę

**zamień na** (dopisek w klasie; użyj istniejącego `RATINGS_PREFIX` + `this.redis`):

```typescript
  /**
   * @returns `true` gdy SCAN/DEL zakończone bez błędu; `false` przy padzie Redis (fail-open).
   */
  async deleteDailyRatings(userId: UserId): Promise<boolean> {
    const pattern = `${RATINGS_PREFIX}${userId}:*`;
    try {
      let cursor = '0';
      do {
        const [nextCursor, keys] = await this.redis.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          100,
        );
        cursor = nextCursor;
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      } while (cursor !== '0');
      return true;
    } catch {
      return false;
    }
  }
```

#### Refaktor — `UnavailableGuestQuotaAdapter`

**dopisz:**

```typescript
  deleteDailyRatings(_userId: UserId): Promise<boolean> {
    return Promise.resolve(true);
  }
```

**DoD kroku:** interfejs + oba adaptery kompilują się; SCAN nie używa `KEYS`; pad Redis → `false` bez throw.

---

### KROK 4 — Wiring Nest (bez cyklu Auth↔Runs)

**Status:** `WYKONANY`

**Cel:** Auth będzie mógł zaimportować porty; `RunAbortRegistry` z lifecycle. A-10 architektura.

**Artefakty:**

- Zmiany z KROK 1–3 domknięte
- Nota pod FAZA 4: `AuthModule.imports` += `GuestPurgeModule`, `GuestQuotaModule`, `FeedbackModule`, `RunLifecycleModule` (AbortRegistry)

**DoD kroku:** `GuestPurgeModule` / `FEEDBACK_PURGE` / `deleteDailyRatings` / AbortRegistry dostępne do DI w Auth **bez** `AuthModule` w imports Runs.

#### Propozycja commit message

```text
feat(api): add guest purge ports and Redis ratings delete

Export GuestPurge and FeedbackPurge for Auth orchestration and allow SCAN-based cleanup of per-guest rating keys.
```

---

## FAZA 2 — Detail `startedBy.role` + cancel (R-11)

Odpowiada major HOW pkt 5–6.

---

### KROK 1 — `RunStartedBy.role` na getById / detail

**Status:** `WYKONANY`

**Cel:** Snapshot detail niesie `role`; lista archiwum **bez** wymogu `role` (może zostać `undefined` / bez pola przy `startedBy: null` z claim — przy list z joinem wolno dodać `role` addytywnie, ale DoD = **GET /runs/:id**). `SPEC-KOMUNIKACJA.md` K-2c, D-71.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts` — typ `RunStartedBy`
- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run-row.types.ts`
- Zmiana: `apps/api/src/runs/infrastructure/persistence/prisma-run.adapter.ts` — `select: { id, email, role }` na **getById** (i ewentualnie list — opcjonalnie)
- Zmiana: `apps/api/src/runs/infrastructure/persistence/to-run-snapshot-base.ts` — mapowanie z walidacją `isUserRole`
- Zmiana helperów testowych / speców typów `startedBy` (dopisz `role` gdzie wymagane przez TS)

#### Refaktor — `run.port.ts`

**teraz**

```typescript
export type RunStartedBy = { id: string; email: string };
```

**zamień na**

```typescript
import type { UserRole } from '@content-chain/shared';

export type RunStartedBy = { id: string; email: string; role: UserRole };
```

#### Refaktor — `getById` include

**teraz**

```typescript
include: { startedBy: { select: { id: true, email: true } } },
```

**zamień na**

```typescript
include: { startedBy: { select: { id: true, email: true, role: true } } },
```

#### Refaktor — `to-run-snapshot-base.ts` (fragment `startedBy`)

**teraz** `startedBy: row.startedBy`

**zamień na** (gdy `row.startedBy != null` — waliduj `isUserRole(row.startedBy.role)` i zbuduj obiekt; przy braku roli w wierszu claim path z `startedBy: null` bez zmian):

```typescript
startedBy:
  row.startedBy === null
    ? null
    : {
        id: row.startedBy.id,
        email: row.startedBy.email,
        role: (() => {
          if (!isUserRole(row.startedBy.role)) {
            throw new Error(
              `Run.startedBy.role is not a UserRole: ${row.startedBy.role}`,
            );
          }
          return row.startedBy.role;
        })(),
      },
```

Zaktualizuj `RunRow.startedBy` na `{ id: string; email: string; role: string } | null`.

**DoD kroku:** `GET /runs/:id` → `startedBy.role` ∈ `admin|user|guest`; kompilacja speców z nowym typem.

---

### KROK 2 — `CancelRunUseCase` authz admin→guest

**Status:** `WYKONANY`

**Cel:** Owner **lub** (`actor.role === 'admin'` && `startedBy.role === 'guest'`); cudzy `user` → 403; log rozróżnia aktora. R-11, D-69 / D-70.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/cancel-run.use-case.ts`
- Zmiana: `apps/api/src/runs/application/cancel-run.use-case.spec.ts`

#### Refaktor — authz + log w `cancel-run.use-case.ts`

**teraz**

```typescript
    if (snapshot.startedBy?.id !== actor.id) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
```

**zamień na**

```typescript
    const startedBy = snapshot.startedBy;
    const isOwner = startedBy?.id === actor.id;
    const isAdminCancellingGuest =
      actor.role === 'admin' && startedBy?.role === 'guest';
    if (!isOwner && !isAdminCancellingGuest) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
```

**teraz** (log):

```typescript
      message: 'Run cancelled by user',
```

**zamień na**

```typescript
      message: isAdminCancellingGuest
        ? 'Run cancelled by admin'
        : 'Run cancelled by user',
```

(Użyj zmiennej `isAdminCancellingGuest` w scope po udanej CAS — zachowaj wyliczenie przed mutacją.)

**Testy (szkic):**

- admin + `startedBy.role=guest` + inny `id` → 200 / CAS ścieżka; message log `cancelled by admin`
- admin + `startedBy.role=user` + inny `id` → 403; brak `attemptCancel`
- owner `user` jak dziś → 200

**DoD kroku:** D-69 / D-70 na poziomie unit; regresja owner cancel.

#### Propozycja commit message

```text
feat(runs): allow admin cancel of guest runs and expose startedBy.role

Admin may cancel only when the run owner role is guest; detail snapshots carry role for authz and UI.
```

---

## FAZA 3 — Sesja access (`isActive` / brak User)

Odpowiada major HOW pkt 7; A-3c.

---

### KROK 1 — `JwtCookieStrategy.validate` async + DB

**Status:** `WYKONANY`

**Cel:** Brak wiersza **lub** `isActive !== true` → 401 (ten sam sens co refresh). Bez blacklisty. D-25 / D-68.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/session/jwt-cookie.strategy.ts`
- Zmiana: `apps/api/src/auth/auth.module.ts` — strategy już w Auth; dopnij `USER_REPOSITORY` (już provider)
- Nowy lub zmiana spec: unit strategy / guard smoke

#### Refaktor — `jwt-cookie.strategy.ts`

**teraz** — konstruktor tylko `ENV`; `validate` synchroniczny z payloadu.

**zamień na**

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { createUserId, isUserId, isUserRole } from '@content-chain/shared';
import { ENV, type Env } from '../../../shared/config/env';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { readCookie } from './cookie.helper';
import type { Request } from 'express';
import type { AuthUserContext } from '../../domain/auth-user.types';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/user-repository.port';

function isRecord(value: unknown): value is {
  sub?: unknown;
  email?: unknown;
  role?: unknown;
} {
  return typeof value === 'object' && value !== null;
}

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(
    @Inject(ENV) env: Env,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | undefined) => {
          if (!req?.cookies) return null;
          const token = readCookie(req, 'cc_access');
          return typeof token === 'string' && token.length > 0 ? token : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: unknown): Promise<AuthUserContext> {
    if (
      !isRecord(payload) ||
      typeof payload.sub !== 'string' ||
      !isUserId(payload.sub) ||
      typeof payload.email !== 'string' ||
      payload.email.length === 0 ||
      typeof payload.role !== 'string' ||
      !isUserRole(payload.role)
    ) {
      throw new DomainException('UNAUTHORIZED', 'Invalid token subject', 401);
    }

    const userId = createUserId(payload.sub);
    const user = await this.users.findById(userId);
    if (!user || !user.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
```

**Nota:** zwracaj `role` / `email` z DB (nie wyłącznie z JWT), żeby soft/hard i ewentualna spójność były natychmiastowe. Refresh już sprawdza `isActive` — bez regresji; ujednolicony message.

**DoD kroku:** access po soft → 401; access po hard (brak wiersza) → 401; aktywny user bez regresji.

#### Propozycja commit message

```text
feat(auth): reject access JWT when user is missing or inactive

Validate cc_access against the User row so soft-delete and hard-delete invalidate sessions without a token blacklist.
```

---

## FAZA 4 — `DeleteUserUseCase` + A-10a + HTTP

Odpowiada major HOW pkt 1–4 (+ A-10a).

---

### KROK 1 — `DeleteUserUseCase` (następca soft)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Gałęzie soft / hard / 409 / purge; audyt; orkiestracja portów. A-10, D21.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/delete-user.use-case.ts`
- Nowy: `apps/api/src/auth/application/delete-user.use-case.spec.ts`
- Usunięcie użycia: `soft-delete-user.use-case.ts` (plik można usunąć po przełączeniu DI + przenieść / przepisać testy)
- Zmiana: `apps/api/src/shared/persistence/prisma.service.ts` — bez zmian API; use-case wstrzykuje `PrismaService`

#### Nowy plik — `delete-user.use-case.ts`

```typescript
import { Inject, Injectable, Logger } from '@nestjs/common';
import { createUserId, isUserId, type UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { PrismaService } from '../../shared/persistence/prisma.service';
import type { AuthUserContext } from '../domain/auth-user.types';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  GUEST_PURGE,
  type GuestPurgePort,
} from '../../runs/domain/guest-purge.port';
import {
  FEEDBACK_PURGE,
  type FeedbackPurgePort,
} from '../../feedback/domain/feedback-purge.port';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../../runs/domain/guest-quota.port';
import { RunAbortRegistry } from '../../runs/application/lifecycle/run-abort.registry';

export type DeleteUserResult = { ok: true };

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(GUEST_PURGE) private readonly guestPurge: GuestPurgePort,
    @Inject(FEEDBACK_PURGE) private readonly feedbackPurge: FeedbackPurgePort,
    @Inject(GUEST_QUOTA) private readonly guestQuota: GuestQuotaPort,
    private readonly abortRegistry: RunAbortRegistry,
  ) {}

  async execute(
    idParam: string,
    actor: AuthUserContext,
    options: { purge: boolean } = { purge: false },
  ): Promise<DeleteUserResult> {
    if (!isUserId(idParam)) {
      throw new DomainException('VALIDATION_FAILED', 'Invalid user ID', 400);
    }
    const userId = createUserId(idParam);
    const user = await this.users.findById(userId);
    if (!user) {
      throw new DomainException('USER_NOT_FOUND', 'User not found', 404);
    }
    if (user.role === 'admin') {
      throw new DomainException(
        'FORBIDDEN',
        'Cannot delete the admin account',
        403,
      );
    }

    if (user.role === 'user') {
      await this.softDeleteUser(userId);
      this.logger.log({
        msg: 'user_delete',
        adminId: actor.id,
        targetId: userId,
        targetRole: user.role,
        mode: 'soft',
      });
      return { ok: true };
    }

    // role === 'guest' (w tym legacy soft-deleted guest)
    const hasLive = await this.guestPurge.hasLiveRuns(userId);
    if (hasLive && !options.purge) {
      throw new DomainException(
        'GUEST_HAS_ACTIVE_RUN',
        'Guest has an active run',
        409,
      );
    }

    let mode: 'hard' | 'purge' = 'hard';
    if (hasLive && options.purge) {
      mode = 'purge';
      const liveIds = await this.guestPurge.listLiveRunIds(userId);
      for (const runId of liveIds) {
        this.abortRegistry.requestCancel(runId);
      }
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      const tree = await this.guestPurge.deleteRunTree(userId, tx);
      const deletedFeedback = await this.feedbackPurge.deleteForGuest(
        userId,
        tree.runIds,
        tx,
      );
      await tx.refreshSession.deleteMany({ where: { userId } });
      await tx.accountActivation.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
      return {
        deletedRuns: tree.deletedRuns,
        deletedFeedback,
      };
    });

    const ratingsDeleted = await this.guestQuota.deleteDailyRatings(userId);
    if (!ratingsDeleted) {
      this.logger.warn({
        msg: 'guest_ratings_redis_delete_failed',
        targetId: userId,
      });
    }

    this.logger.log({
      msg: 'user_delete',
      adminId: actor.id,
      targetId: userId,
      targetRole: 'guest',
      mode,
      deletedRuns: stats.deletedRuns,
      deletedFeedback: stats.deletedFeedback,
    });

    return { ok: true };
  }

  private async softDeleteUser(userId: UserId): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { isActive: false },
      });
      await tx.refreshSession.deleteMany({ where: { userId } });
      await tx.accountActivation.deleteMany({ where: { userId } });
    });
  }
}
```

**Uwagi implementacyjne:**

- Nazwy modeli Prisma (`refreshSession`, `accountActivation`) — zweryfikuj z wygenerowanym clientem (jak w istniejących adapterach).
- Soft idempotent: ponowny DELETE na `isActive=false` → znowu tx (no-op update) → **200**.
- `purge=true` bez live → zwykły hard (`mode: 'hard'`).
- Po `deleteDailyRatings`: adapter łyka błędy; log warning w use-case gdy chcesz audyt — można logować **przed** wywołaniem tylko przy hard, a w adapterze dodać callback; minimum: adapter fail-open + `logger.warn` w use-case otocz try/catch jak wyżej.

**Testy unit (obowiązkowe szkice w `delete-user.use-case.spec.ts`):** soft user; soft przy „live” bez wołania guestPurge delete; guest bez live → hard + redis; guest + live bez purge → 409; guest + live + purge → abort + hard; admin target → 403; invalid id → 400; missing → 404; legacy inactive guest → hard.

**DoD kroku:** A-10 gałęzie w unitach; brak Prisma Run w controllerze.

---

### KROK 2 — `ReactivateUserUseCase`: guest → 403

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-10a — reaktywacja tylko `role=user`; target `guest` → 403. D-26.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/reactivate-user.use-case.ts`
- Zmiana: `apps/api/src/auth/application/reactivate-user.use-case.spec.ts`

#### Refaktor — po sprawdzeniu admina

**teraz** — tylko blokada `admin`, potem `setActive`.

**zamień na** (po bloku admin):

```typescript
    if (user.role === 'guest') {
      throw new DomainException(
        'FORBIDDEN',
        'Cannot reactivate a guest account',
        403,
      );
    }
    if (user.role !== 'user') {
      throw new DomainException('FORBIDDEN', 'Cannot update this account', 403);
    }
```

(Drugi guard jest obroną pod przyszłe role; w MVP po admin/guest zostaje `user`.)

**Test:** `role=guest` → 403; `setActive` nie wołane.

**DoD kroku:** PATCH guest → 403; user soft → 200 jak dziś.

---

### KROK 3 — `UsersController` + `AuthModule` wiring

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Query `purge`; actor do audytu; DI. K-2j.

**Artefakty:**

- Zmiana: `apps/api/src/auth/users.controller.ts`
- Zmiana: `apps/api/src/auth/users.controller.spec.ts`
- Zmiana: `apps/api/src/auth/auth.module.ts`
- Zmiana: `apps/api/src/shared/http/configure-swagger.spec.ts` (stub `DeleteUserUseCase`)

#### Refaktor — `users.controller.ts`

**teraz**

```typescript
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly softDelete: SoftDeleteUserUseCase,
    private readonly reactivate: ReactivateUserUseCase,
  ) {}

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.softDelete.execute(id);
  }
```

**zamień na**

```typescript
import { Query } from '@nestjs/common';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUserContext } from './domain/auth-user.types';
import { DeleteUserUseCase } from './application/delete-user.use-case';

  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly reactivate: ReactivateUserUseCase,
  ) {}

  @Delete(':id')
  @HttpCode(200)
  delete(
    @Param('id') id: string,
    @Query('purge') purgeRaw: string | undefined,
    @CurrentUser() user: AuthUserContext,
  ) {
    const purge = purgeRaw === 'true';
    return this.deleteUser.execute(id, user, { purge });
  }
```

#### Refaktor — `auth.module.ts` (fragment)

**imports +=**

```typescript
import { GuestPurgeModule } from '../runs/guest-purge.module';
import { GuestQuotaModule } from '../runs/guest-quota.module';
import { FeedbackModule } from '../feedback/feedback.module';
import { RunLifecycleModule } from '../runs/run-lifecycle.module';
```

```typescript
imports: [
  PassportModule,
  JwtModule.registerAsync({ /* bez zmian */ }),
  PrismaModule,
  EnvModule,
  GuestPurgeModule,
  GuestQuotaModule,
  FeedbackModule,
  RunLifecycleModule,
],
```

**providers:** zamień `SoftDeleteUserUseCase` → `DeleteUserUseCase`.

Usuń plik `soft-delete-user.use-case.ts` (+ stary spec) po przeniesieniu asercji.

**DoD kroku:** `DELETE ?purge=true` dociera do use-case; bootstrap modułu bez cyklu; Swagger/spec stuby zielone.

#### Propozycja commit message

```text
feat(auth): branch user delete by role with guest purge

Replace always-soft DELETE with soft user deactivation, hard guest cleanup, optional purge of live guest runs, and guest-blocked reactivation.
```

---

## FAZA 5 — Testy + Postman

Odpowiada major HOW pkt 9.

---

### KROK 1 — Unit / e2e D-25, D-26, D-63…D-72

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Piramida wg `SPEC-TESTY.md`. Preferuj unit use-case + wąskie e2e tam, gdzie cookie/JWT.

| ID | Asercja (minimum) |
|----|-------------------|
| D-25 | Soft `user` → 200; kolejne requesty z tym samym access → **401**; runy usera **zostają** |
| D-26 | PATCH reaktywacja `user` OK; PATCH `guest` → **403** |
| D-63 | Hard guest (bez live) → 200; brak User/runów/feedback; email wolny |
| D-64 | Guest + live bez purge → **409** `GUEST_HAS_ACTIVE_RUN` |
| D-65 | Guest + live + `purge=true` → **200**; brak User/runów |
| D-66 | DELETE target admin → 403; sesja `user` → DELETE 403 |
| D-67 | Legacy soft-guest → hard (nie 404) |
| D-68 | Access po hard → 401 |
| D-69 | Admin cancel guest run → 200 + log admin |
| D-70 | Admin cancel cudzego user → 403 |
| D-71 | GET detail ma `startedBy.role` |
| D-72 | Soft nie kasuje feedback; hard kasuje (Fbk-9) |

**Artefakty:** specy z FAZA 2–4 + ewentualnie `apps/api/test/*.e2e-spec.ts` jeśli projekt tak trzyma D-* HTTP.

**DoD kroku:** lista D-25/26/63–72 pokryta unitami i/lub e2e; CI zielone w zakresie api.

---

### KROK 2 — Postman

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Regresja kolekcji auth + dopisek scenariuszy guest delete/purge + cancel admin→guest (folder w `demo-guest` lub `auth`).

**Artefakty:**

- Zmiana: `apps/api/test/postman/auth.postman-collection.json` — D-25/D-26 pod soft+401 access / PATCH guest 403
- Zmiana: `apps/api/test/postman/demo-guest.postman-collection.json` — D-63…D-68 / D-72 (hard/purge)
- Zmiana (cancel): kolekcja z cancel (np. social/review) albo demo-guest — D-69/D-70
- Nota w `docs/testy.md` tylko jeśli już opisuje Newman — **nie** ruszaj docs w tej sesji feature; przy implementacji ewentualny dopisek poza tym planem / za życzeniem

**DoD kroku:** Newman ścieżki happy/negatyw dla delete/purge/cancel przechodzą lokalnie wg README api.

#### Propozycja commit message

```text
test(api): cover user delete purge and admin guest cancel

Add D-25/D-26/D-63–D-72 unit coverage and Postman paths for soft user, hard guest, purge, and R-11 admin cancel.
```

---

## Weryfikacja wycinka

- [ ] Kotwica major Faza 21 HOW pkt 1–9 pokryta FAZA 1–5
- [ ] Zgodność A-10 / A-10a / A-3c / R-11 / D21 / Fbk-9 / K-8 `GUEST_HAS_ACTIVE_RUN`
- [ ] Nowe pliki z kompletnym kodem w planie; refaktory jako `teraz → zamień na`
- [ ] Brak cyklu Auth↔Runs; brak fat controllera Prisma Run
- [ ] Nagłówki wyłącznie `FAZA` / `KROK`; każda FAZA ma EN Conventional Commit
- [ ] Statusy startowe `NIE_ROZPOCZĘTY`
- [ ] Major / docs / SPEC **nietknięte** tą sesją
- [ ] Poza zakresem: FE UI, bulk, blacklista, global daily runs

**Pass rozwojowy (potwierdzenie):** porty → role detail → cancel → JWT → DeleteUser → testy. Przesunięcia jak w Meta; brak przenosin między fazami major.

---

## Ślad do major (informacyjnie — po implementacji)

| Element major | Po implementacji (ręcznie / `/feature-implementation`) |
|---------------|--------------------------------------------------------|
| Faza 21 | `WYKONANY` (DoD gate: docs/SPEC już są; HOW w tym pliku zrealizowany w kodzie) |
| MILESTONE 21 | **brak** — nic nie oznaczać |
| Faza 5 / 12 / 18 / MILESTONE 5 | **bez zmian** historii |

FE major Faza 16 — osobny feature-plan; zależność api = ten wycinek.
