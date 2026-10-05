# Content Chain — feature plan: DEMO MODE + rola `guest` (Faza 18)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-18-demo-guest.md`  
**Kotwica major:** Faza 18 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` + kontrakt `packages/shared` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 5 (`WYKONANY`) — role `admin` \| `user` bez `GuestGuard`; Faza 3 (`WYKONANY`) — start runu bez slotów gościa / Redis; Faza 16 (`WYKONANY`) — `RegisterUserUseCase` zawsze `role = user`.  
**Źródła kanonu (nie treść Fazy 16 „zawsze user”):** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/deployment.md`, `docs/brand_types.md`, `docs/anty_patterny.md`, `docs/dictionary.md`, `SPEC-AUTH.md` A-6a / A-11, `SPEC-RUNY.md` R-12, `SPEC-KOMUNIKACJA.md` K-2g / K-11 / K-12, `SPEC-BEZPIECZENSTWO.md` B-11, `SPEC-PERSISTENCE.md` D19, `SPEC-TESTY.md` D-41 / D-46 / D-50…D-62, major Faza 18.  
**Pass rozwojowy:** shared + env → `GET /config` → register / 401 → `GuestGuard`+whitelist → Redis → polityka startu → ownership → rating → testy. **Przesunięcia:** Redis i config wcześniej niż HOW majoru (pkt 3–4); testy na końcu.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | `DEMO_MODE`, rola `guest`, `GuestGuard` / `@AllowGuest`, refaktor roli przy register, limity slot/cap/rating, ownership, publiczny `GET /config` |
| Major | Faza 18 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–17 (`WYKONANY`); **bez** MILESTONE 18 |
| Redis (zatwierdzone HOW) | Klient **`ioredis`**. Env: **`REDIS_URL`** (priorytet), inaczej **`REDIS_HOST` + `REDIS_PORT`**. Przy `DEMO_MODE=true` wymagane połączenie (fail-fast walidacji env). Przy `false` Redis opcjonalny |
| Poza zakresem | UI chip/locki/modal (major FE Faza 14); awans roli; switch demo w panelu; `role` w body register; osobny register-as-guest; czyszczenie kont guest; fail `health`/`ready` z braku Redis; zmiany gateway |
| Po implementacji (informacyjnie) | Major: Faza 18 → `WYKONANY`. Brak `MILESTONE` 18. Faza 5 / 3 / 16 / MILESTONE 5 / 3 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 18 (gate) | FAZA 1 / KROK 1–3 | Shared, env, `GET /config` |
| Faza 18 (gate) | FAZA 2 / KROK 1–3 | Register, 401, GuestGuard |
| Faza 18 (gate) | FAZA 3 / KROK 1–4 | Redis, polityka startu, ownership, rating |
| Faza 18 (gate) | FAZA 4 / KROK 1–2 | D-50…D-62, Postman |

---

## Założenia

- Stack bez zmian: NestJS 11, Zod 4 (env), Prisma `User.role` **String** (bez migracji enum), JWT cookie, `DomainException` + `HttpExceptionFilter`.
- `tsconfig` **bez** zmian. Typy: jawne na granicach; `unknown` + parser na HTTP/env; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- `DEMO_MODE` = boolean po walidacji env; zmiana trybu = **restart procesu**.
- Pad Redis przy `POST /runs` guest → **fail closed** (403 `GUEST_GLOBAL_QUOTA_EXCEEDED` — jedyny istniejący kod capu globalnego w docs; bez nowego kodu SPEC).
- Pad Redis przy ratingu guest → **fail open** (ocena zapisywana).
- Soft rating ponad cap → **429**, `code`: `TOO_MANY_REQUESTS` (HTTP 429; docs wymagają `message` w envelope, nie nazwy kodu).
- `MAX_CONCURRENT_RUNS` + FIFO **bez zmian**.
- Register **zawsze** publiczny. Invite **zawsze** `user`. Register **nigdy** `admin`.
- FE: tylko uzupełnienie `USER_ROLE_LABELS` pod nową unię `UserRole` (kompilacja monorepo) — **nie** chip demo.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/redis/ioredis` (Redis Commander: `incr` / `decr`; `enableOfflineQueue` default true — **wyłączyć** przy fail-closed; `disconnect`/`quit`). NestJS: `/nestjs/docs.nestjs.com` — `SetMetadata` + `Reflector.getAllAndOverride` + `APP_GUARD` (ten sam wzorzec co `JwtAuthGuard` / `@Public()`).

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Klient | `new Redis(url, options)` albo `new Redis({ host, port, ...options })` | `REDIS_URL` wygrywa z host/port |
| Fail closed | `enableOfflineQueue: false`, `maxRetriesPerRequest: 1`, `connectTimeout: 1500` | błąd komendy → `{ kind: 'unavailable' }` |
| TTL doby UTC | po pierwszym `INCR` (`n === 1`) → `pexpire(key, msUntilNextUtcMidnight)` | klucze z docs |
| Guard | metadata jak `@Public()` | `@AllowGuest()` + `GuestGuard` po `JwtAuthGuard` i `RolesGuard` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

Wersja `ioredis`: `^5.4.0` w `apps/api/package.json` (zgodna z docs v5).

---

## FAZA 1 — Shared, env, publiczny config

Odpowiada major **Faza 18** HOW pkt 1–3 (część config). Jedna faza zestawu.

---

### KROK 1 — `UserRole` += `guest`

**Status:** `WYKONANY`

**Cel:** Unia kontraktu obejmuje `guest`; `isUserRole` akceptuje JWT/DB. Prisma zostaje `String`. `docs/brand_types.md`, `SPEC-PERSISTENCE.md`, major HOW pkt 1.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/frontend/src/modules/users/api/users-labels.ts` (zupełność `Record<UserRole, string>`)

#### Refaktor — `enums.ts`

**teraz**

```typescript
export type UserRole = 'admin' | 'user';
export const USER_ROLES = ['admin', 'user'] as const satisfies readonly UserRole[];
```

**zamień na**

```typescript
export type UserRole = 'admin' | 'user' | 'guest';
export const USER_ROLES = ['admin', 'user', 'guest'] as const satisfies readonly UserRole[];
```

#### Refaktor — `users-labels.ts`

**teraz**

```typescript
export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
} as const satisfies Record<UserRole, string>;
```

**zamień na**

```typescript
export const USER_ROLE_LABELS = {
  admin: 'Administrator',
  user: 'Użytkownik',
  guest: 'Gość',
} as const satisfies Record<UserRole, string>;
```

**DoD kroku:** `isUserRole('guest') === true`; `isUserRole` nadal odrzuca inne stringi; brak migracji Prisma.

---

### KROK 2 — Env `DEMO_MODE` i capy + Redis connection

**Status:** `WYKONANY`

**Cel:** Fail-fast przy starcie; default demo off; capy dodatnie; Redis wymagany wyłącznie przy demo on. `docs/deployment.md`, `SPEC-BEZPIECZENSTWO.md` B-11.

**Artefakty:**

- Zmiana: `apps/api/src/shared/config/env.schema.ts`
- Nowy helper: `apps/api/src/shared/config/redis-connection.ts`
- Zmiana: `apps/api/.env.example`
- Zmiana: `apps/api/package.json` — zależność `ioredis`

#### Refaktor — `env.schema.ts` (pola obiektu + `superRefine`)

Dodać do `z.object({...})` **przed** `.superRefine`:

```typescript
    DEMO_MODE: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value): boolean => value === 'true'),
    GUEST_GLOBAL_CAP_PER_DAY: z.coerce.number().int().positive().default(30),
    GUEST_RATING_CAP_PER_DAY: z.coerce.number().int().positive().default(10),
    REDIS_URL: z.string().url().optional(),
    REDIS_HOST: z.string().min(1).optional(),
    REDIS_PORT: z.coerce.number().int().positive().optional(),
```

W **istniejącym** `superRefine` dopisać (po checkach production):

```typescript
    if (value.DEMO_MODE === true) {
      const hasUrl = value.REDIS_URL !== undefined && value.REDIS_URL.length > 0;
      const hasHostPort =
        value.REDIS_HOST !== undefined && value.REDIS_PORT !== undefined;
      if (!hasUrl && !hasHostPort) {
        ctx.addIssue({
          code: 'custom',
          path: ['REDIS_URL'],
          message:
            'REDIS_URL or REDIS_HOST+REDIS_PORT is required when DEMO_MODE=true',
        });
      }
    }
```

Uwaga Zod 4: `superRefine` na obiekcie z `.transform` na polu — `value.DEMO_MODE` jest już `boolean`. Jeśli parser w teście poda brak `DEMO_MODE`, default `'false'` → `false`.

Testy wołające `validateEnv({...})` **nie** muszą podawać Redis przy default demo off.

#### Nowy plik — `redis-connection.ts`

```typescript
import type { Env } from './env.schema';

export type RedisStandalone =
  | { readonly kind: 'url'; readonly url: string }
  | { readonly kind: 'host'; readonly host: string; readonly port: number };

export function resolveRedisStandalone(env: Env): RedisStandalone | null {
  if (env.REDIS_URL !== undefined && env.REDIS_URL.length > 0) {
    return { kind: 'url', url: env.REDIS_URL };
  }
  if (env.REDIS_HOST !== undefined && env.REDIS_PORT !== undefined) {
    return { kind: 'host', host: env.REDIS_HOST, port: env.REDIS_PORT };
  }
  return null;
}
```

#### `.env.example` — dopisek

```text
DEMO_MODE=false
GUEST_GLOBAL_CAP_PER_DAY=30
GUEST_RATING_CAP_PER_DAY=10
# Required when DEMO_MODE=true. REDIS_URL wins over HOST/PORT.
# REDIS_URL=redis://127.0.0.1:6379
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
```

#### `package.json` api

Dodać `"ioredis": "^5.4.0"` do `dependencies` (lockfile przez `pnpm` przy implementacji).

**DoD kroku:** `DEMO_MODE` niepodany → `false`; `true` bez Redis → `ZodError`; `false` bez Redis → OK; capy default 30/10.

---

### KROK 3 — Publiczny `GET /api/v1/config`

**Status:** `WYKONANY`

**Cel:** V1 wyłącznie `{ demoMode: boolean }`. `SPEC-KOMUNIKACJA.md` K-11, D-60.

**Artefakty:**

- Nowy: `apps/api/src/public-config/public-config.controller.ts`
- Nowy: `apps/api/src/public-config/public-config.module.ts`
- Nowy: `apps/api/src/public-config/public-config.controller.spec.ts`
- Zmiana: `apps/api/src/app.module.ts` — `imports: [PublicConfigModule]`

#### Nowy plik — `public-config.controller.ts`

```typescript
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { ENV, type Env } from '../shared/config/env';

export type PublicConfigResponse = {
  readonly demoMode: boolean;
};

@Public()
@ApiTags('config')
@Controller('config')
export class PublicConfigController {
  constructor(@Inject(ENV) private readonly env: Env) {}

  @Get()
  @ApiOperation({ summary: 'Public product flags (V1: demoMode only)' })
  @ApiOkResponse({ description: '{ demoMode: boolean }' })
  get(): PublicConfigResponse {
    return { demoMode: this.env.DEMO_MODE };
  }
}
```

#### Nowy plik — `public-config.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { PublicConfigController } from './public-config.controller';

@Module({
  controllers: [PublicConfigController],
})
export class PublicConfigModule {}
```

#### Test (szkic)

- `get()` przy `DEMO_MODE: false` → `{ demoMode: false }`; `true` → `{ demoMode: true }`.
- Asercja: JSON nie zawiera `GUEST_*`, `REDIS_*`, `GATEWAY_KEY`.
- Metadata `@Public()` na klasie (jak `health.controller.spec.ts`).

**DoD kroku:** `GET /api/v1/config` bez cookie → 200 i **wyłącznie** pole `demoMode`.

---

#### Propozycja commit message

```text
feat(config): expose demoMode flag and guest role in shared contract

Load DEMO_MODE and guest caps at process start so register and guards can branch without a UI toggle.
```

---

## FAZA 2 — Auth: register, martwa sesja, GuestGuard

---

### KROK 1 — Refaktor `RegisterUserUseCase` (rola vs `DEMO_MODE`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `DEMO_MODE=true` → `guest`; `false` → `user`. Dostępność register **bez zmian**. `SPEC-AUTH.md` A-11, D-41 / D-50.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/register-user.use-case.ts`
- Zmiana: `apps/api/src/auth/application/register-user.use-case.spec.ts`

#### Refaktor — `register-user.use-case.ts`

**teraz**

```typescript
    const role: UserRole = 'user';
```

**zamień na**

```typescript
    const role: UserRole = this.env.DEMO_MODE ? 'guest' : 'user';
```

Reszta (revoke invite, pending prod, 409, nigdy admin) **bez zmian**.

#### Testy

- D-41: env default / `DEMO_MODE: false` → `create` z `role: 'user'` (istniejące asercje zostają).
- D-50: `validateEnv({ ...TEST_ENV fields, DEMO_MODE: 'true', REDIS_URL: 'redis://127.0.0.1:6379' })` → `role: 'guest'`.
- Regresja: revoke pending invite; 409; nigdy `admin`.

**DoD kroku:** gałąź roli wyłącznie z env; body nadal `{ email, password }`.

---

### KROK 2 — Login + refresh: `guest` && demo off → 401

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Check `DEMO_MODE` **przed** innymi powodami rejectu dla znalezionego `guest`. Ten sam `UNAUTHORIZED` / `Invalid credentials` co złe hasło. `SPEC-AUTH.md` A-2 / A-6a, D-51 / D-52. `POST /auth/refresh` jest `@Public()` — **nie** idzie przez `GuestGuard`; check w use-case.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/reject-dead-guest-session.ts`
- Zmiana: `apps/api/src/auth/application/login.use-case.ts`
- Zmiana: `apps/api/src/auth/application/refresh.use-case.ts`
- Zmiana: `*.spec.ts` login / refresh

#### Nowy plik — `reject-dead-guest-session.ts`

```typescript
import type { UserRole } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';

export function rejectDeadGuestSession(
  role: UserRole,
  demoMode: boolean,
): void {
  if (role === 'guest' && !demoMode) {
    throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
  }
}
```

#### Refaktor — `login.use-case.ts`

Po `findForAuth`, **zanim** `!isActive` / `verifiedAt` / hasło:

**teraz**

```typescript
    const userForAuth = await this.users.findForAuth(command.email);
    if (!userForAuth || !userForAuth.isActive) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    if (this.env.NODE_ENV === 'production' && userForAuth.verifiedAt === null) {
```

**zamień na**

```typescript
    const userForAuth = await this.users.findForAuth(command.email);
    if (!userForAuth) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }
    rejectDeadGuestSession(userForAuth.role, this.env.DEMO_MODE);
    if (!userForAuth.isActive) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    if (this.env.NODE_ENV === 'production' && userForAuth.verifiedAt === null) {
```

Gdy brak wiersza — **nie** wołać reject (brak roli).

#### Refaktor — `refresh.use-case.ts`

Po `findById`, przed rotacją:

```typescript
    rejectDeadGuestSession(user.role, this.env.DEMO_MODE);
```

(tuż po sprawdzeniu `!user` — gdy user istnieje; demo-off guest → `Invalid credentials`, nie „inactive”).

**DoD kroku:** login guest + demo off → 401 identyczny z złym hasłem; admin/user przy demo on bez regresji; refresh guest + demo off → 401.

---

### KROK 3 — `GuestGuard` + `@AllowGuest` + `APP_GUARD`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Default deny dla `guest` przy demo on; demo off + JWT guest → **401** (nie 403). `SPEC-AUTH.md` A-6a. Context7: ten sam `Reflector` co `@Public()`.

**Artefakty:**

- Nowy: `apps/api/src/shared/decorators/allow-guest.decorator.ts`
- Nowy: `apps/api/src/shared/guards/guest.guard.ts`
- Nowy: `apps/api/src/shared/guards/guest.guard.spec.ts`
- Zmiana: `apps/api/src/app.module.ts`
- Zmiana kontrolerów: whitelist (poniżej)
- Zmiana speców metadata (`runs.controller.spec.ts`, `feedback.controller.spec.ts`, `company-context` jeśli istnieje)

#### Nowy plik — `allow-guest.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const ALLOW_GUEST_KEY = 'allowGuest';

export const AllowGuest = () => SetMetadata(ALLOW_GUEST_KEY, true);
```

#### Nowy plik — `guest.guard.ts`

```typescript
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ALLOW_GUEST_KEY } from '../decorators/allow-guest.decorator';
import { ENV, type Env } from '../config/env';
import type { AuthUserContext } from '../types/auth-user-context';
import type { Request } from 'express';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ENV) private readonly env: Env,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as AuthUserContext | undefined;
    if (!user || user.role !== 'guest') {
      return true;
    }

    if (!this.env.DEMO_MODE) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const allowed = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowed) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return true;
  }
}
```

Kolejność `APP_GUARD` w `app.module.ts`: `JwtAuthGuard` → `RolesGuard` → **`GuestGuard`**.

**teraz**

```typescript
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
```

**zamień na** — dodać trzeci provider `GuestGuard` (import klasy).

#### Whitelist `@AllowGuest()` (handler, nie klasa — default deny na nowych metodach)

| Powierzchnia | Metody |
|--------------|--------|
| `AuthController` | `getMe`, `postLogout` — **nie** `patchMeEmail` |
| `CompanyContextController` | `get`, `completeness` — **nie** PUT/PATCH (`@Roles('admin')` i tak 403) |
| `RunsController` | `create`, `list`, `getRunsByUser`, `get`, `logs`, `events`, `hitl`, `patchRating`, `cancel` — **nie** `postOutputEdited`, `postFinalizeReview` |
| `FeedbackController` | `create` |

`UsersController` / `InvitationsController`: brak `@AllowGuest` (zostaje `@Roles('admin')`).

#### Test `guest.guard.spec.ts`

- public → `true`
- `role=user` → `true`
- `role=guest`, `DEMO_MODE=false` → `UnauthorizedException`
- `role=guest`, demo on, brak metadata → `ForbiddenException`
- demo on + `@AllowGuest` → `true`

Zaktualizować `runs.controller.spec.ts`: asercja `ALLOW_GUEST_KEY` na allowliście; **brak** na output-edited / finalize.

**DoD kroku:** guest + demo on bez dekoratora → 403; `/me` z AllowGuest działa; `PATCH /auth/me/email` → 403; JWT guest + demo off na chronionej → 401.

---

#### Propozycja commit message

```text
feat(auth): assign guest on demo register and deny dead guest sessions

Role comes from DEMO_MODE at register time; GuestGuard default-deny keeps new routes closed without mass @Roles lists.
```

---

## FAZA 3 — Polityka runów guest + Redis

---

### KROK 1 — Port Redis quota + adapter `ioredis`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** INCR/DECR dziennych kluczy UTC; brak klienta gdy brak konfiguracji; **nie** wpinane w `health`/`ready`. B-11, R-12 pkt 3–6.

**Artefakty:**

- Nowy: `apps/api/src/runs/domain/guest-quota.port.ts`
- Nowy: `apps/api/src/runs/infrastructure/ioredis-guest-quota.adapter.ts`
- Nowy: `apps/api/src/runs/infrastructure/unavailable-guest-quota.adapter.ts`
- Nowy: `apps/api/src/runs/infrastructure/ioredis-guest-quota.adapter.spec.ts`
- Nowy: `apps/api/src/runs/guest-quota.module.ts`
- Zmiana: `apps/api/src/runs/runs.module.ts` — `imports: [GuestQuotaModule]`
- Zmiana: `apps/api/src/health/health.service.spec.ts` / D-47 — regresja: **brak** zależności od Redis (bez zmian kodu health, tylko świadoma asercja w FAZA 4)

#### Nowy plik — `guest-quota.port.ts`

```typescript
import type { UserId } from '@content-chain/shared';

export const GUEST_QUOTA = Symbol('GUEST_QUOTA');

export type GuestQuotaAdmitResult =
  | { readonly kind: 'ok' }
  | { readonly kind: 'exceeded' }
  | { readonly kind: 'unavailable' };

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

#### Nowy plik — `unavailable-guest-quota.adapter.ts`

```typescript
import type { UserId } from '@content-chain/shared';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../domain/guest-quota.port';

export class UnavailableGuestQuotaAdapter implements GuestQuotaPort {
  async tryAdmitDailyRun(): Promise<GuestQuotaAdmitResult> {
    return { kind: 'unavailable' };
  }

  async releaseDailyRun(): Promise<void> {
    return;
  }

  async tryAdmitDailyRating(
    _userId: UserId,
  ): Promise<GuestQuotaAdmitResult> {
    return { kind: 'unavailable' };
  }
}
```

#### Nowy plik — `ioredis-guest-quota.adapter.ts`

```typescript
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import type { UserId } from '@content-chain/shared';
import { ENV, type Env } from '../../shared/config/env';
import { resolveRedisStandalone } from '../../shared/config/redis-connection';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../domain/guest-quota.port';

const RUNS_PREFIX = 'content-chain:guest:daily:runs:';
const RATINGS_PREFIX = 'content-chain:guest:daily:ratings:';

const REDIS_COMMAND_OPTIONS = {
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 1500,
} as const;

function utcDateKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function msUntilNextUtcMidnight(now: Date): number {
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  return Math.max(1, next - now.getTime());
}

function createRedis(env: Env): Redis {
  const standalone = resolveRedisStandalone(env);
  if (standalone === null) {
    throw new Error('Redis configuration missing');
  }
  if (standalone.kind === 'url') {
    return new Redis(standalone.url, REDIS_COMMAND_OPTIONS);
  }
  return new Redis({
    host: standalone.host,
    port: standalone.port,
    ...REDIS_COMMAND_OPTIONS,
  });
}

@Injectable()
export class IoredisGuestQuotaAdapter implements GuestQuotaPort, OnModuleDestroy {
  private readonly redis: Redis;

  constructor(@Inject(ENV) env: Env) {
    this.redis = createRedis(env);
  }

  async onModuleDestroy(): Promise<void> {
    this.redis.disconnect();
  }

  async tryAdmitDailyRun(
    cap: number,
    now: Date = new Date(),
  ): Promise<GuestQuotaAdmitResult> {
    return this.tryIncr(`${RUNS_PREFIX}${utcDateKey(now)}`, cap, now);
  }

  async releaseDailyRun(now: Date = new Date()): Promise<void> {
    try {
      await this.redis.decr(`${RUNS_PREFIX}${utcDateKey(now)}`);
    } catch {
      return;
    }
  }

  async tryAdmitDailyRating(
    userId: UserId,
    cap: number,
    now: Date = new Date(),
  ): Promise<GuestQuotaAdmitResult> {
    return this.tryIncr(
      `${RATINGS_PREFIX}${userId}:${utcDateKey(now)}`,
      cap,
      now,
    );
  }

  private async tryIncr(
    key: string,
    cap: number,
    now: Date,
  ): Promise<GuestQuotaAdmitResult> {
    try {
      const value = await this.redis.incr(key);
      if (value === 1) {
        await this.redis.pexpire(key, msUntilNextUtcMidnight(now));
      }
      if (value > cap) {
        await this.redis.decr(key);
        return { kind: 'exceeded' };
      }
      return { kind: 'ok' };
    } catch {
      return { kind: 'unavailable' };
    }
  }
}
```

#### Nowy plik — `guest-quota.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ENV, type Env } from '../shared/config/env';
import { resolveRedisStandalone } from '../shared/config/redis-connection';
import { GUEST_QUOTA, type GuestQuotaPort } from './domain/guest-quota.port';
import { IoredisGuestQuotaAdapter } from './infrastructure/ioredis-guest-quota.adapter';
import { UnavailableGuestQuotaAdapter } from './infrastructure/unavailable-guest-quota.adapter';

@Module({
  providers: [
    {
      provide: GUEST_QUOTA,
      inject: [ENV],
      useFactory: (env: Env): GuestQuotaPort => {
        if (resolveRedisStandalone(env) === null) {
          return new UnavailableGuestQuotaAdapter();
        }
        return new IoredisGuestQuotaAdapter(env);
      },
    },
  ],
  exports: [GUEST_QUOTA],
})
export class GuestQuotaModule {}
```

`RunsModule` (statyczny `@Module`): dodać `GuestQuotaModule` do `imports`.

Test adaptera: mock `Redis.prototype.incr` — `unavailable` przy throw; `exceeded` gdy `incr` > cap + `decr`; klucz `content-chain:guest:daily:runs:2026-10-03` przy `now = 2026-10-03T12:00:00.000Z`.

**DoD kroku:** health **nie** importuje `GuestQuotaModule`; brak Redis przy demo off = `UnavailableGuestQuotaAdapter`.

---

### KROK 2 — `countByUserAndType` + `GuestRunPolicy` na `POST /runs`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Allowlista + COUNT wszystkie statusy + Redis **przed** `create` + DECR przy rollbacku. R-12, D-54 / D-58. Kolejność w start: walidacja → kompletność kontekstu → polityka guest → `create`.

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Nowy: `apps/api/src/runs/application/guest-run-policy.service.ts`
- Nowy: `apps/api/src/runs/application/guest-run-policy.service.spec.ts`
- Zmiana: `apps/api/src/runs/application/start-run.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/runs.module.ts` (provider policy)
- Zmiana: wszystkie test doubles `RunRepository` — dodać `countByUserAndType` (i `finalizeExpiredReviews` tam, gdzie brakuje względem portu)

#### Refaktor — `run.port.ts`

Dodać do `RunRepository`:

```typescript
  countByUserAndType(userId: UserId, taskType: RunTaskType): Promise<number>;
```

(`RunTaskType` już importowany w pliku.)

#### Refaktor — `prisma-run.adapter.ts`

Dodać metodę:

```typescript
  async countByUserAndType(
    userId: UserId,
    taskType: RunRecord['taskType'],
  ): Promise<number> {
    return this.prisma.run.count({
      where: { startedByUserId: userId, taskType },
    });
  }
```

**Bez** `status` w `where`.

#### Nowy plik — `guest-run-policy.service.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunTaskType, UserId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../shared/config/env';
import { GUEST_QUOTA, type GuestQuotaPort } from '../domain/guest-quota.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';

const GUEST_TASK_TYPES = [
  'post_ideas',
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly RunTaskType[];

function isGuestTaskType(
  taskType: RunTaskType,
): taskType is (typeof GUEST_TASK_TYPES)[number] {
  return (GUEST_TASK_TYPES as readonly RunTaskType[]).includes(taskType);
}

export type GuestRunAdmit = {
  readonly release: () => Promise<void>;
};

@Injectable()
export class GuestRunPolicyService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(GUEST_QUOTA) private readonly quota: GuestQuotaPort,
  ) {}

  async admitStart(
    actor: AuthUserContext,
    taskType: RunTaskType,
  ): Promise<GuestRunAdmit | null> {
    if (actor.role !== 'guest' || !this.env.DEMO_MODE) {
      return null;
    }
    if (!isGuestTaskType(taskType)) {
      throw new DomainException(
        'GUEST_TYPE_NOT_ALLOWED',
        'Task type is not allowed for guest',
        403,
      );
    }
    const used = await this.runs.countByUserAndType(actor.id, taskType);
    if (used >= 1) {
      throw new DomainException(
        'GUEST_TYPE_QUOTA_EXCEEDED',
        'Guest task type quota exceeded',
        403,
      );
    }
    const admit = await this.quota.tryAdmitDailyRun(
      this.env.GUEST_GLOBAL_CAP_PER_DAY,
    );
    if (admit.kind !== 'ok') {
      throw new DomainException(
        'GUEST_GLOBAL_QUOTA_EXCEEDED',
        'Guest daily run quota exceeded',
        403,
      );
    }
    return {
      release: () => this.quota.releaseDailyRun(),
    };
  }

  assertGuestOwnsRun(
    actor: AuthUserContext,
    startedByUserId: UserId | null,
  ): void {
    if (actor.role !== 'guest') {
      return;
    }
    if (startedByUserId !== actor.id) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
  }
}
```

`admitStart` zwraca `null` dla admin/user (policy no-op). `startedByUserId` porównanie z `actor.id` (oba branded `UserId`).

#### Refaktor — `start-run.use-case.ts`

Sygnatura:

**teraz**

```typescript
  constructor(
    private readonly completeness: GetCompletenessUseCase,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly worker: InProcessRunWorker,
  ) {}

  async execute(
    command: StartRunCommand,
    startedByUserId: UserId | null = null,
  ): Promise<Pick<RunRecord, 'id' | 'conversationId' | 'status'>> {
```

**zamień na** — dodać `GuestRunPolicyService`; drugi argument:

```typescript
    actor: AuthUserContext | null = null,
```

`startedByUserId` = `actor?.id ?? null`.

Po bramce `complete`, przed budową `run`:

```typescript
    const guestAdmit =
      actor === null ? null : await this.guestPolicy.admitStart(actor, parsedCommand.taskType);
```

Po `await this.runs.create(run)` w `try/catch`:

```typescript
    try {
      await this.runs.create(run);
    } catch (error) {
      if (guestAdmit !== null) {
        await guestAdmit.release();
      }
      throw error;
    }
```

#### Refaktor — `runs.controller.ts` `create`

**teraz:** `this.startRun.execute(body, user.id)`  
**zamień na:** `this.startRun.execute(body, user)`

Spec `start-run.use-case.spec.ts`: `makeUseCase` wstrzykuje fake policy (`admitStart: async () => null`). Nowe case’y w `guest-run-policy.service.spec.ts` (nie w start) dla kodów 403. Start: gdy `create` rzuca, wołane `release`.

`unusedRepo`: dodać `countByUserAndType: unexpected` (oraz `finalizeExpiredReviews` jeśli TypeScript tego wymaga).

**DoD kroku:** drugi `post_ideas` guest → `GUEST_TYPE_QUOTA_EXCEEDED` także gdy pierwszy `failed`; `post_content` → `GUEST_TYPE_NOT_ALLOWED`; Redis unavailable / exceeded → 403 global; admin omija policy.

---

### KROK 3 — Ownership detail / HITL / logs / SSE / cancel / feedback `run`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Guest czyta i mutuje **tylko własne** runy; lista instancji bez filtra. D-55 / D-61 / D-62. Cancel już sprawdza `startedBy` dla **wszystkich** ról — guest korzysta z tego. Admin nadal widzi cudzy detail.

**Artefakty:**

- Zmiana: `get-run.use-case.ts`, `get-run-logs.use-case.ts`, `resume-hitl.use-case.ts`
- Zmiana: `runs.controller.ts` — `@CurrentUser()` na `get` / `logs` / `events` / `hitl`
- Zmiana: `cancel-run.use-case.ts` — przekazać `actor` do `getRun.execute` jeśli sygnatura GetRun wymaga aktora
- Feedback `run`: już 403 cudzy — **bez zmiany** semantyki; guest + AllowGuest wystarczy (D-55)

#### Wzorzec GetRun / logs / HITL

Dodać argument `actor: AuthUserContext`. Po `getById`:

```typescript
    this.guestPolicy.assertGuestOwnsRun(actor, run.startedByUserId);
```

(`run.startedByUserId` z rekordu; nie mylić z `startedBy` DTO.)

`GetRunUseCase` wstrzykuje `GuestRunPolicyService`.

**Controller**

**teraz** (przykład)

```typescript
  logs(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getLogs.execute(runId);
  }
```

**zamień na**

```typescript
  logs(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.getLogs.execute(runId, user);
  }
```

Analogicznie `get`, `events` (oba `getRun.execute`), `hitl`.

`ListRunsUseCase` **bez** filtra guest (showcase).

`ListRunsUserUseCase` już 403 gdy `userId !== requestingUser.id` — guest może listę **własną**.

Zaktualizować unit specy GetRun / logs / HITL / controller (nowy argument).

**DoD kroku:** guest GET cudzego `:runId` / logs / events / HITL / cancel → 403; GET `/runs` 200 z cudzymi wierszami listy; HITL na własnym dozwolony (D-62).

---

### KROK 4 — Soft cap rating (429, fail open)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** R-12 pkt 6, D-57. Ownership zostaje w `assertRunReviewable` (już `startedByUserId !== actorId` → 403).

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/rate-run.use-case.ts`
- Zmiana: `rate-run.use-case.spec.ts`

#### Refaktor — `rate-run.use-case.ts`

Wstrzyknąć `ENV` (już jest), `GUEST_QUOTA`, ewentualnie tylko quota (cap z env).

Po `parseWithZod`, **przed** `getById` albo po ownership (`assertRunReviewable` wymaga runu — więc: getById → assertRunReviewable → quota guest → saveRating):

```typescript
    if (actor.role === 'guest' && this.env.DEMO_MODE) {
      const admit = await this.quota.tryAdmitDailyRating(
        actor.id,
        this.env.GUEST_RATING_CAP_PER_DAY,
      );
      if (admit.kind === 'exceeded') {
        throw new DomainException(
          'TOO_MANY_REQUESTS',
          'Guest daily rating limit exceeded',
          429,
        );
      }
      // unavailable → fail open
    }
```

Nie DECR rating przy późniejszym `REVIEW_LOCKED` (spec: limitujemy próbę oceny; lock 409 jest po TTL — kolejność: reviewable najpierw, potem quota, żeby wygasły przegląd nie zużywał capu).

**Kolejność ostateczna:** parse → getById → `assertRunReviewable` → quota guest → `saveRating`.

**DoD kroku:** (cap+1)-sza ocena guest → 429; mock quota `unavailable` → ocena zapisana; admin bez Redis.

---

#### Propozycja commit message

```text
feat(runs): enforce guest run slots and Redis daily caps

Admit Redis before persist so a failed create does not consume the instance cap, and keep MAX_CONCURRENT_RUNS as the only execute semaphore.
```

---

## FAZA 4 — Testy i Postman

---

### KROK 1 — Unit / e2e D-50…D-62 + regresje

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `SPEC-TESTY.md` D-50…D-62 oraz D-41/D-46 (rola vs demo) i D-47 (Redis **nie** psuje ready).

**Artefakty (orientacyjnie):**

- `register-user.use-case.spec.ts` — D-50
- `login.use-case.spec.ts` — D-51 (guest + `DEMO_MODE: false`, poprawne hasło → 401; **nie** wołać `comparePassword` po reject demo — asercja `signAsync` not called)
- `refresh.use-case.spec.ts` — D-52
- `guest.guard.spec.ts` — D-52 / D-53
- `guest-run-policy.service.spec.ts` — D-54 / D-58
- `get-run.use-case.spec.ts` / HITL / cancel — D-55 / D-62
- `rate-run.use-case.spec.ts` — D-57
- `public-config.controller.spec.ts` — D-60
- e2e cienkie (cookie): D-56 mutacje 403 (email, users, invitations, PUT context, output-edited, finalize); D-59 login admin przy `DEMO_MODE=true`; D-61 GET context 200 / PUT 403
- `health.service.spec.ts` — bez mocka Redis (D-47)

Gdy e2e podnosi app z `DEMO_MODE=true`, env **musi** mieć `REDIS_URL` (walidacja); quota mockować przez override providera `GUEST_QUOTA` albo Redis testowy. Preferuj unit policy + e2e HTTP guardów bez żywego Redis (override `GUEST_QUOTA`).

**DoD kroku:** checklista D-50…D-62 pokryta testami automatycznymi w `apps/api`; D-41/D-46 zielone.

---

### KROK 2 — Postman

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Żywy HTTP demo (lokalnie `DEMO_MODE=true` + Redis). Nie zastępuje Jest.

**Artefakty:**

- Nowy: `apps/api/test/postman/demo-guest.postman-collection.json`
- Zmiana: `apps/api/test/postman/README.md` — folder, zmienne `guestEmail` / `guestPassword`, wymóg Redis gdy demo on

Foldery (kolejność runnera):

1. **Config** — `GET /config` → `demoMode === true` (albo skip gdy false + note w README).
2. **Register guest** — `POST /auth/register` → `role === guest`; login.
3. **Allow** — GET context 200; `POST /runs` `post_ideas` 202; drugi ten sam typ 403 `GUEST_TYPE_QUOTA_EXCEEDED`; `post_content` 403 `GUEST_TYPE_NOT_ALLOWED`.
4. **Deny** — PATCH email 403; GET `/users` 403; PUT context 403; output-edited 403.
5. **Admin przy demo** — login admin 200 (D-59); brak endpointu promocji.

Nie wymaga żywego gateway poza startem runu (jak inne kolekcje). README: Collection Runner **nie** jest T-5 CI.

**DoD kroku:** kolekcja importowalna; README opisuje `DEMO_MODE` + Redis.

---

#### Propozycja commit message

```text
test(auth): cover guest demo quotas and dead-session 401s

Lock D-50–D-62 so register role, GuestGuard, and Redis fail modes stay aligned with the authz matrix.
```

---

## Weryfikacja wycinka

- Kotwica: pełna Faza 18 major (HOW 1–7).
- Nagłówki wyłącznie `FAZA` / `KROK`; commit message EN na końcu każdej fazy.
- Zgodność: A-11 refaktor (nie „zawsze user”); R-12; K-11; B-11; D-50…D-62.
- Nowe pliki: kompletny kod w planie. Refaktory: fragmenty `teraz → zamień na`.
- Pass: Redis i config przed policy/testami; AllowGuest razem z Guard.
- Major / docs / SPEC **nietknięte** tą sesją.
- `tsconfig` bez zmian; brak sekretów.

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po kodzie |
|---------|-----------|
| Faza 18 | `WYKONANY` (gate + HOW w feature) |
| MILESTONE 18 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 3 / 16, MILESTONE 5 / 3 | bez zmian historii |

Edycja major **poza** tym plikiem / skillem.
