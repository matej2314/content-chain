# Feature Plan — Faza 5–6 Auth + Feedback (plik 1/2): Auth API

## Meta

**Kotwica major:** Faza 5 (Krok 5.1 + 5.2) — Auth API w formie docelowej.  
**Zakres tego pliku:** FAZA 1 (bootstrap, sesja, role, `/me`) + FAZA 2 (użytkownicy, soft-delete, guardi, `startedBy` ze sesji).  
**Plik 2/2:** `content-chain_feature_plan_faza-5-6-auth-feedback_2.md` — FAZA 3 (persistence) + FAZA 4 (Feedback BC + review runu).  
**Źródła:** `SPEC-AUTH.md`, `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`, `SPEC-PERSISTENCE.md`.  
**Poza zakresem wycinka tego pliku:** BC Feedback, tabela Feedback, pola przeglądu runu, `GET /runs/user/:userId` → plik 2/2.

---

## Założenia (stack / wersje)

- NestJS 11 + `@nestjs/passport` + `@nestjs/jwt` + `passport-jwt` (zainstalować — brak w `package.json`)  
- `bcrypt` (cost = 12) dla haseł; SHA-256 dla hasha refresh tokena w DB  
- Cookie `cc_access` (JWT, httpOnly) + `cc_refresh` (random hex 32B, httpOnly) — per `SPEC-AUTH.md` A-2  
- Refresh rotacja: nowy token + nowy `cc_access` przy każdym `/auth/refresh`  
- Guardi globalne przez `APP_GUARD` w `AppModule` + `@Public()` dla tras otwartych  
- `validatePasswordPolicy` — reguły z `SPEC-AUTH.md` A-5 / `docs/security.md`  
- Zod 3 w `apps/api` (Faza 9 przyniesie bump do 4); Zod tylko w application  
- Prisma SQLite — `User` i `RefreshSession` już w schemacie (brak DDL-migracji dla auth)  
- `JWT_SECRET`, `JWT_ACCESS_TTL` (default `15m`), `JWT_REFRESH_TTL` (default `1d`) — już w `env.schema.ts`  
- `startedBy: { id, email }` już zmapowany w `PrismaRunAdapter.toSnapshot` (include join); brakuje przekazania `userId` z sesji przy POST /runs

---

## FAZA 1 — Bootstrap, sesja cookie, role i probe `/me`

> Odpowiada Krokowi 5.1 z major planu.

### KROK 1 — Instalacja deps auth i cookie-parser w configureHttpApp

**Cel:** Zainstalować brakujące zależności auth i podpiąć `cookie-parser` pod NestJS — bez czego `JwtCookieStrategy` nie odczyta `req.cookies`.  
Odwołanie: `SPEC-AUTH.md` norma implementacji, `docs/security.md` (bcrypt).

**Artefakty:**
- Komenda `pnpm` — nowe deps w `apps/api/package.json`
- Refaktor: `apps/api/src/shared/http/configure-http-app.ts`

**Implementacja:**

Komenda instalacji (w katalogu workspace root):
```bash
pnpm --filter api add @nestjs/passport @nestjs/jwt passport passport-jwt bcrypt cookie-parser
pnpm --filter api add -D @types/passport-jwt @types/bcrypt @types/cookie-parser
```

**Refaktor** `apps/api/src/shared/http/configure-http-app.ts`:

teraz:
```typescript
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { parseCorsOrigins } from '../config/env.schema';
import type { Env } from '../config/env.schema';

export function configureHttpApp(app: INestApplication): void {
```

zamień na:
```typescript
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { parseCorsOrigins } from '../config/env.schema';
import type { Env } from '../config/env.schema';

export function configureHttpApp(app: INestApplication): void {
  app.use(cookieParser());
```

**Refaktor** `apps/api/src/shared/http/express.d.ts` — rozszerzenie `req.user` o `AuthUserContext`:

teraz:
```typescript
import type { RequestId } from '@content-chain/shared';

declare global {
  namespace Express {
    interface Request {
      requestId?: RequestId;
    }
  }
}
```

zamień na:
```typescript
import type { RequestId } from '@content-chain/shared';
import type { AuthUserContext } from '../types/auth-user-context';

declare global {
  namespace Express {
    interface Request {
      requestId?: RequestId;
      user?: AuthUserContext;
    }
  }
}
```

**Biblioteki / API:** `cookie-parser` — standardowy middleware Express; `cookieParser()` musi być wywołany PRZED guardami Passport, które czytają `req.cookies`.

**DoD kroku:**
- `pnpm --filter api install` kończy się bez błędów
- `configure-http-app.ts` importuje i aplikuje `cookieParser()`
- `express.d.ts` rozszerza `Request.user` o `AuthUserContext` (typ z KROK 2)
- TypeScript kompiluje się

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 2 — Domain auth: typy, polityka haseł, porty

**Cel:** Zdefiniować typy domenowe auth i interfejsy portów — przed infrastrukturą i use-case'ami.  
Odwołanie: `SPEC-AUTH.md` norma implementacji; `docs/brand_types.md` (`UserId`).

**Artefakty (nowe pliki):**
- `apps/api/src/shared/types/auth-user-context.ts`
- `apps/api/src/auth/domain/auth-user.types.ts`
- `apps/api/src/auth/domain/password.policy.ts`
- `apps/api/src/auth/domain/user.repository.port.ts`
- `apps/api/src/auth/domain/refresh-session.repository.port.ts`

**Implementacja:**

```typescript
// apps/api/src/shared/types/auth-user-context.ts
import type { UserId, UserRole } from '@content-chain/shared';

/** Kształt użytkownika w req.user i @CurrentUser() — bez wrażliwych danych. */
export type AuthUserContext = {
  id: UserId;
  email: string;
  role: UserRole;
};
```

```typescript
// apps/api/src/auth/domain/auth-user.types.ts
import type { UserId, UserRole } from '@content-chain/shared';
export type { AuthUserContext } from '../../shared/types/auth-user-context';

/** Pełny model domenowy użytkownika (bez passwordHash — wyłącznie auth helpers). */
export type AuthUser = {
  id: UserId;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/** Payload JWT — sub = UserId jako string. */
export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
```

```typescript
// apps/api/src/auth/domain/password.policy.ts
import { DomainException } from '../../shared/exceptions/domain.exception';

const MIN_LENGTH = 12;
const MAX_BYTES = 72; // limit bcrypt
const HAS_DIGIT = /\d/;
const HAS_UPPER = /[A-Z]/;
// bezpieczny zestaw ASCII wg docs/security.md
const HAS_SPECIAL = /[!@#$%^&*()\-_=+[\]{}|;:,.<>?]/;

export function validatePasswordPolicy(plain: string): void {
  if (plain.length < MIN_LENGTH) {
    throw new DomainException(
      'VALIDATION_FAILED',
      `Password must be at least ${MIN_LENGTH} characters`,
      400,
    );
  }
  if (Buffer.byteLength(plain, 'utf8') > MAX_BYTES) {
    throw new DomainException(
      'VALIDATION_FAILED',
      `Password must not exceed ${MAX_BYTES} bytes (bcrypt limit)`,
      400,
    );
  }
  if (!HAS_DIGIT.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one digit',
      400,
    );
  }
  if (!HAS_UPPER.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one uppercase letter',
      400,
    );
  }
  if (!HAS_SPECIAL.test(plain)) {
    throw new DomainException(
      'VALIDATION_FAILED',
      'Password must contain at least one special character',
      400,
    );
  }
}
```

```typescript
// apps/api/src/auth/domain/user.repository.port.ts
import type { UserId, UserRole } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export type UserForAuth = AuthUser & { passwordHash: string };

export interface UserRepository {
  /** Odczyt dla auth: zwraca też passwordHash (tylko login/bootstrap). */
  findForAuth(email: string): Promise<UserForAuth | null>;
  findById(id: UserId): Promise<AuthUser | null>;
  findAdminCount(): Promise<number>;
  create(data: {
    id: UserId;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser>;
  setActive(id: UserId, isActive: boolean): Promise<void>;
  list(): Promise<AuthUser[]>;
}
```

```typescript
// apps/api/src/auth/domain/refresh-session.repository.port.ts
import type { UserId } from '@content-chain/shared';

export const REFRESH_SESSION_REPOSITORY = Symbol('REFRESH_SESSION_REPOSITORY');

export type RefreshSessionRecord = {
  id: string;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
};

export interface RefreshSessionRepository {
  create(session: RefreshSessionRecord): Promise<void>;
  /** Zwraca sesję, jeśli hash tokenHash pasuje i sesja nie wygasła. */
  findValid(userId: UserId, tokenHash: string): Promise<RefreshSessionRecord | null>;
  deleteById(id: string): Promise<void>;
  /** Unieważnienie wszystkich sesji użytkownika (logout). */
  deleteByUser(userId: UserId): Promise<void>;
}
```

**DoD kroku:**
- Typy kompilują się bez błędów TypeScript
- `validatePasswordPolicy` rzuca `DomainException('VALIDATION_FAILED', ...)` przy niespełnieniu każdej reguły
- Porty są czyste (brak importu Prisma / ORM)

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 3 — Infrastructure: adaptery Prisma, JwtCookieStrategy, cookie helpers

**Cel:** Implementacja portów w warstwie infrastructure: Prisma adaptery dla User i RefreshSession, strategia JWT z cookie extractorem, narzędzia cookie.  
Odwołanie: `SPEC-AUTH.md` norma implementacji (cookie httpOnly, jwt cookie extractor).

**Artefakty (nowe pliki):**
- `apps/api/src/auth/infrastructure/prisma-user.adapter.ts`
- `apps/api/src/auth/infrastructure/prisma-refresh-session.adapter.ts`
- `apps/api/src/auth/infrastructure/jwt-cookie.strategy.ts`
- `apps/api/src/auth/infrastructure/cookie.helper.ts`
- `apps/api/src/auth/application/auth.helpers.ts`

**Implementacja:**

```typescript
// apps/api/src/auth/application/auth.helpers.ts
// Czyste helpersy kryptograficzne — bez importów NestJS
import { createHash, randomBytes } from 'node:crypto';
import * as bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 12; // SPEC-AUTH.md A-5

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function comparePassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Generuje parę (raw token → cookie, hash → DB). */
export function generateRefreshToken(): { raw: string; hash: string } {
  const raw = randomBytes(32).toString('hex');
  const hash = createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

export function hashRefreshToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

/** Parsuje TTL string (np. "15m", "1d") do ms. */
export function parseTtlMs(ttl: string): number {
  const unit = ttl.at(-1);
  const value = parseInt(ttl.slice(0, -1), 10);
  switch (unit) {
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return value * 1000;
  }
}
```

```typescript
// apps/api/src/auth/infrastructure/prisma-user.adapter.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, type UserId, type UserRole } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user.repository.port';

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaUserAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findForAuth(email: string): Promise<UserForAuth | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? { ...this.toUser(row), passwordHash: row.passwordHash } : null;
  }

  async findById(id: UserId): Promise<AuthUser | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toUser(row) : null;
  }

  async findAdminCount(): Promise<number> {
    return this.prisma.user.count({ where: { role: 'admin' } });
  }

  async create(data: {
    id: UserId;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser> {
    const row = await this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        isActive: true,
      },
    });
    return this.toUser(row);
  }

  async setActive(id: UserId, isActive: boolean): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { isActive } });
  }

  async list(): Promise<AuthUser[]> {
    const rows = await this.prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.toUser(r));
  }

  private toUser(row: UserRow): AuthUser {
    return {
      id: createUserId(row.id),
      email: row.email,
      role: row.role as UserRole,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
```

```typescript
// apps/api/src/auth/infrastructure/prisma-refresh-session.adapter.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, type UserId } from '@content-chain/shared';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';

@Injectable()
export class PrismaRefreshSessionAdapter implements RefreshSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(session: RefreshSessionRecord): Promise<void> {
    await this.prisma.refreshSession.create({
      data: {
        id: session.id,
        userId: session.userId,
        tokenHash: session.tokenHash,
        expiresAt: session.expiresAt,
      },
    });
  }

  async findValid(
    userId: UserId,
    tokenHash: string,
  ): Promise<RefreshSessionRecord | null> {
    const row = await this.prisma.refreshSession.findFirst({
      where: {
        userId,
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });
    if (!row) return null;
    return {
      id: row.id,
      userId: createUserId(row.userId),
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
    };
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.refreshSession
      .delete({ where: { id } })
      .catch(() => undefined);
  }

  async deleteByUser(userId: UserId): Promise<void> {
    await this.prisma.refreshSession.deleteMany({ where: { userId } });
  }
}
```

```typescript
// apps/api/src/auth/infrastructure/jwt-cookie.strategy.ts
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { createUserId, isUserId } from '@content-chain/shared';
import { ENV, type Env } from '../../shared/config/env';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { JwtPayload } from '../domain/auth-user.types';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(ENV) env: Env) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) =>
          (req.cookies as Record<string, string> | undefined)?.['cc_access'] ??
          null,
      ]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): AuthUserContext {
    if (!isUserId(payload.sub)) {
      throw new DomainException('UNAUTHORIZED', 'Invalid token subject', 401);
    }
    return {
      id: createUserId(payload.sub),
      email: payload.email,
      role: payload.role,
    };
  }
}
```

```typescript
// apps/api/src/auth/infrastructure/cookie.helper.ts
import type { Response } from 'express';
import type { Env } from '../../shared/config/env';

const ACCESS_COOKIE = 'cc_access';
const REFRESH_COOKIE = 'cc_refresh';

/** Parsuje TTL string ("15m", "1d") → ms. */
function parseTtlMs(ttl: string): number {
  const unit = ttl.at(-1);
  const value = parseInt(ttl.slice(0, -1), 10);
  switch (unit) {
    case 'm': return value * 60 * 1000;
    case 'h': return value * 60 * 60 * 1000;
    case 'd': return value * 24 * 60 * 60 * 1000;
    default: return value * 1000;
  }
}

export function setAuthCookies(
  res: Response,
  access: string,
  refresh: string,
  env: Env,
): void {
  const isProduction = env.NODE_ENV === 'production';
  const base = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    path: '/',
  };
  res.cookie(ACCESS_COOKIE, access, {
    ...base,
    maxAge: parseTtlMs(env.JWT_ACCESS_TTL),
  });
  res.cookie(REFRESH_COOKIE, refresh, {
    ...base,
    maxAge: parseTtlMs(env.JWT_REFRESH_TTL),
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_COOKIE, { path: '/' });
  res.clearCookie(REFRESH_COOKIE, { path: '/' });
}
```

**Biblioteki / API:**
- `passport-jwt` / `ExtractJwt.fromExtractors` — pobiera JWT z `req.cookies['cc_access']`; wersja z `package.json` po instalacji w KROK 1
- `bcrypt.hash(plain, 12)` / `bcrypt.compare(plain, hash)` — cost 12 per `SPEC-AUTH.md` A-5

**DoD kroku:**
- `PrismaUserAdapter.findForAuth` zwraca `passwordHash`; `findById` — bez hasha
- `PrismaRefreshSessionAdapter.findValid` odfiltrowuje wygasłe sesje (`expiresAt > now`)
- `JwtCookieStrategy.validate` zwraca `AuthUserContext` albo rzuca 401
- `setAuthCookies` ustawia `httpOnly: true`; `Secure` i `SameSite=strict` tylko w production
- TypeScript bez błędów

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 4 — Application: use-case'y auth + schemas Zod

**Cel:** Zaimplementować use-case'y warstwy application: bootstrap-status, bootstrap-admin, login, logout, refresh, me.  
Odwołanie: `SPEC-AUTH.md` A-1..A-4, A-3a; `docs/security.md`.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/application/auth.schemas.ts`
- `apps/api/src/auth/application/bootstrap-status.use-case.ts`
- `apps/api/src/auth/application/bootstrap-admin.use-case.ts`
- `apps/api/src/auth/application/login.use-case.ts`
- `apps/api/src/auth/application/logout.use-case.ts`
- `apps/api/src/auth/application/refresh.use-case.ts`
- `apps/api/src/auth/application/me.use-case.ts`

**Implementacja:**

```typescript
// apps/api/src/auth/application/auth.schemas.ts
import { z } from 'zod';

export const bootstrapAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type BootstrapAdminInput = z.infer<typeof bootstrapAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
```

```typescript
// apps/api/src/auth/application/bootstrap-status.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';

@Injectable()
export class BootstrapStatusUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(): Promise<{ available: boolean }> {
    const count = await this.users.findAdminCount();
    return { available: count === 0 };
  }
}
```

```typescript
// apps/api/src/auth/application/bootstrap-admin.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  hashPassword,
  generateRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import { bootstrapAdminSchema } from './auth.schemas';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthUser } from '../domain/auth-user.types';

export type AuthTokenResult = {
  user: Pick<AuthUser, 'id' | 'email' | 'role'>;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class BootstrapAdminUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<AuthTokenResult> {
    const command = parseWithZod(bootstrapAdminSchema, input);

    const count = await this.users.findAdminCount();
    if (count > 0) {
      throw new DomainException(
        'CONFLICT',
        'Bootstrap admin already exists',
        409,
      );
    }

    validatePasswordPolicy(command.password);

    const passwordHash = await hashPassword(command.password);
    const userId = createUserId(`usr_${uuidv4()}`);

    const user = await this.users.create({
      id: userId,
      email: command.email,
      passwordHash,
      role: 'admin',
    });

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const { raw: refreshToken, hash: tokenHash } = generateRefreshToken();

    await this.sessions.create({
      id: uuidv4(),
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }
}
```

```typescript
// apps/api/src/auth/application/login.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  comparePassword,
  generateRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import { loginSchema } from './auth.schemas';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthTokenResult } from './bootstrap-admin.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<AuthTokenResult> {
    const command = parseWithZod(loginSchema, input);

    const userForAuth = await this.users.findForAuth(command.email);
    if (!userForAuth || !userForAuth.isActive) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    const valid = await comparePassword(
      command.password,
      userForAuth.passwordHash,
    );
    if (!valid) {
      throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
    }

    const accessToken = await this.jwt.signAsync({
      sub: userForAuth.id,
      email: userForAuth.email,
      role: userForAuth.role,
    });

    const { raw: refreshToken, hash: tokenHash } = generateRefreshToken();

    await this.sessions.create({
      id: uuidv4(),
      userId: userForAuth.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: { id: userForAuth.id, email: userForAuth.email, role: userForAuth.role },
      accessToken,
      refreshToken,
    };
  }
}
```

```typescript
// apps/api/src/auth/application/logout.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { hashRefreshToken } from './auth.helpers';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import type { UserId } from '@content-chain/shared';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
  ) {}

  /**
   * Unieważnia sesję refresh.
   * Przy braku/nieprawidłowym tokenie — no-op (logout jest idempotentny).
   */
  async execute(userId: UserId, rawRefreshToken: string | undefined): Promise<void> {
    if (!rawRefreshToken) {
      // Brak tokenu — wyczyść wszystkie sesje tego użytkownika
      await this.sessions.deleteByUser(userId);
      return;
    }
    const tokenHash = hashRefreshToken(rawRefreshToken);
    const session = await this.sessions.findValid(userId, tokenHash);
    if (session) {
      await this.sessions.deleteById(session.id);
    }
  }
}
```

```typescript
// apps/api/src/auth/application/refresh.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import {
  createUserId,
  isUserId,
  type UserId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  generateRefreshToken,
  hashRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthTokenResult } from './bootstrap-admin.use-case';

@Injectable()
export class RefreshUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  /**
   * Wymaga: userId z JWT access (może wygasnąć — używamy danych z cc_refresh).
   * Schemat: odczytaj cc_refresh z cookies, znajdź sesję, zrotuj.
   */
  async execute(
    rawRefreshToken: string | undefined,
  ): Promise<AuthTokenResult> {
    if (!rawRefreshToken) {
      throw new DomainException('UNAUTHORIZED', 'Refresh token missing', 401);
    }

    const tokenHash = hashRefreshToken(rawRefreshToken);

    // Znajdź sesję po hashu (pełne skanowanie by userId wymaga odczytu JWT sub bez
    // walidacji expiry — szukamy po samym hashu przez findFirst bez filtru userId)
    const session = await this.sessions.findValidByHash(tokenHash);
    if (!session) {
      throw new DomainException('UNAUTHORIZED', 'Invalid or expired refresh token', 401);
    }

    const user = await this.users.findById(session.userId);
    if (!user || !user.isActive) {
      throw new DomainException('UNAUTHORIZED', 'User not found or inactive', 401);
    }

    // Rotacja: usuń stary, utwórz nowy
    await this.sessions.deleteById(session.id);
    const { raw: newRefreshToken, hash: newHash } = generateRefreshToken();
    await this.sessions.create({
      id: uuidv4(),
      userId: user.id,
      tokenHash: newHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
```

> **Uwaga do `RefreshUseCase`**: `findValidByHash` szuka po samym `tokenHash` bez filtra `userId` — pozwala na refresh bez ważnego access tokena. Wymaga dodania tej metody do `RefreshSessionRepository` port i adaptera.

**Uzupełnienie port** `refresh-session.repository.port.ts` — dodanie metody `findValidByHash`:

teraz:
```typescript
export interface RefreshSessionRepository {
  create(session: RefreshSessionRecord): Promise<void>;
  findValid(userId: UserId, tokenHash: string): Promise<RefreshSessionRecord | null>;
  deleteById(id: string): Promise<void>;
  deleteByUser(userId: UserId): Promise<void>;
}
```

zamień na:
```typescript
export interface RefreshSessionRepository {
  create(session: RefreshSessionRecord): Promise<void>;
  findValid(userId: UserId, tokenHash: string): Promise<RefreshSessionRecord | null>;
  /** Wyszukiwanie wyłącznie po hashu (dla refresh bez aktywnego access JWT). */
  findValidByHash(tokenHash: string): Promise<RefreshSessionRecord | null>;
  deleteById(id: string): Promise<void>;
  deleteByUser(userId: UserId): Promise<void>;
}
```

**Uzupełnienie** `PrismaRefreshSessionAdapter` — implementacja `findValidByHash`:

dodaj metodę (po `findValid`):
```typescript
async findValidByHash(tokenHash: string): Promise<RefreshSessionRecord | null> {
  const row = await this.prisma.refreshSession.findFirst({
    where: { tokenHash, expiresAt: { gt: new Date() } },
  });
  if (!row) return null;
  return {
    id: row.id,
    userId: createUserId(row.userId),
    tokenHash: row.tokenHash,
    expiresAt: row.expiresAt,
  };
}
```

```typescript
// apps/api/src/auth/application/me.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    // Odśwież dane z DB (np. isActive mógł się zmienić)
    const user = await this.users.findById(context.id);
    if (!user || !user.isActive) {
      throw new DomainException('UNAUTHORIZED', 'User not found or inactive', 401);
    }
    return { id: user.id, email: user.email, role: user.role };
  }
}
```

**DoD kroku:**
- `BootstrapAdminUseCase` odrzuca próbę bootstrap gdy admin istnieje (`CONFLICT` 409)
- `LoginUseCase` odrzuca nieaktywne konto i błędne hasło (`UNAUTHORIZED` 401); obie gałęzie dają ten sam komunikat (brak enumeracji kont)
- `RefreshUseCase` rotuje token (stary usunięty, nowy utworzony); nieważny token → 401
- `LogoutUseCase` jest idempotentny — brak tokena → usunięcie wszystkich sesji użytkownika
- `MeUseCase` odświeża dane z DB (ochrona przed soft-deleted user z ważnym JWT)
- Żaden use-case nie ujawnia `passwordHash` w odpowiedzi

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 5 — AuthModule wiring, AuthController, guardy globalne, dekoratory

**Cel:** Złożyć `AuthModule` z NestJS DI, zaimplementować `AuthController`, zdefiniować globalne guardy i dekoratory pomocnicze.  
Odwołanie: `SPEC-AUTH.md` norma implementacji, `docs/security.md`.

**Artefakty (nowe pliki):**
- `apps/api/src/shared/decorators/public.decorator.ts`
- `apps/api/src/shared/decorators/roles.decorator.ts`
- `apps/api/src/shared/decorators/current-user.decorator.ts`
- `apps/api/src/shared/guards/jwt-auth.guard.ts`
- `apps/api/src/shared/guards/roles.guard.ts`

**Artefakty (refaktory):**
- `apps/api/src/auth/auth.module.ts` — pełna implementacja (z pełnego stubu)
- `apps/api/src/auth/auth.controller.ts` — pełna implementacja (z pełnego stubu)
- `apps/api/src/app.module.ts` — `APP_GUARD` + `@Public()` na health/metrics
- `apps/api/src/health/health.controller.ts` — `@Public()`
- `apps/api/src/metrics/metrics.controller.ts` — `@Public()`

**Implementacja:**

```typescript
// apps/api/src/shared/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/** Dekorator dla tras niewymagających sesji (bypass JwtAuthGuard). */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

```typescript
// apps/api/src/shared/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import type { UserRole } from '@content-chain/shared';

export const ROLES_KEY = 'roles';
/** Dekorator ról — stosować razem z @UseGuards(RolesGuard) lub APP_GUARD. */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

```typescript
// apps/api/src/shared/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { AuthUserContext } from '../types/auth-user-context';

/** Wyciąga req.user ustawiony przez JwtCookieStrategy.validate(). */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUserContext => {
    const req = ctx.switchToHttp().getRequest<Request>();
    // req.user jest ustawiony przez Passport po walidacji JWT
    return req.user as AuthUserContext;
  },
);
```

```typescript
// apps/api/src/shared/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Globalny guard JWT — bypass dla tras oznaczonych @Public().
 * Używa strategii 'jwt' (JwtCookieStrategy) zarejestrowanej w AuthModule.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
```

```typescript
// apps/api/src/shared/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { UserRole } from '@content-chain/shared';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { AuthUserContext } from '../types/auth-user-context';
import type { Request } from 'express';

/**
 * Globalny guard ról — aktywny tylko gdy handler/klasa ma @Roles(...).
 * Musi być po JwtAuthGuard w kolejności APP_GUARD (req.user już ustawiony).
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as AuthUserContext | undefined;
    if (!user) throw new ForbiddenException('FORBIDDEN');
    if (!required.includes(user.role)) throw new ForbiddenException('FORBIDDEN');
    return true;
  }
}
```

**Refaktor** `apps/api/src/auth/auth.module.ts`:

teraz (stub):
```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController]
})
export class AuthModule {}
```

zamień na (pełny moduł):
```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { EnvModule } from '../shared/config/env.module';
import { ENV, type Env } from '../shared/config/env';
import { JwtCookieStrategy } from './infrastructure/jwt-cookie.strategy';
import { PrismaUserAdapter } from './infrastructure/prisma-user.adapter';
import { PrismaRefreshSessionAdapter } from './infrastructure/prisma-refresh-session.adapter';
import { USER_REPOSITORY } from './domain/user.repository.port';
import { REFRESH_SESSION_REPOSITORY } from './domain/refresh-session.repository.port';
import { BootstrapStatusUseCase } from './application/bootstrap-status.use-case';
import { BootstrapAdminUseCase } from './application/bootstrap-admin.use-case';
import { LoginUseCase } from './application/login.use-case';
import { LogoutUseCase } from './application/logout.use-case';
import { RefreshUseCase } from './application/refresh.use-case';
import { MeUseCase } from './application/me.use-case';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [ENV],
      useFactory: (env: Env) => ({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: env.JWT_ACCESS_TTL },
      }),
    }),
    PrismaModule,
    EnvModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtCookieStrategy,
    PrismaUserAdapter,
    PrismaRefreshSessionAdapter,
    { provide: USER_REPOSITORY, useExisting: PrismaUserAdapter },
    { provide: REFRESH_SESSION_REPOSITORY, useExisting: PrismaRefreshSessionAdapter },
    BootstrapStatusUseCase,
    BootstrapAdminUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    MeUseCase,
  ],
  exports: [USER_REPOSITORY, JwtModule],
})
export class AuthModule {}
```

**Refaktor** `apps/api/src/auth/auth.controller.ts`:

teraz (stub):
```typescript
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {}
```

zamień na:
```typescript
import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { Public } from '../shared/decorators/public.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { setAuthCookies, clearAuthCookies } from './infrastructure/cookie.helper';
import { BootstrapStatusUseCase } from './application/bootstrap-status.use-case';
import { BootstrapAdminUseCase } from './application/bootstrap-admin.use-case';
import { LoginUseCase } from './application/login.use-case';
import { LogoutUseCase } from './application/logout.use-case';
import { RefreshUseCase } from './application/refresh.use-case';
import { MeUseCase } from './application/me.use-case';
import { ENV, type Env } from '../shared/config/env';
import { Inject } from '@nestjs/common';
import type { AuthUserContext } from '../shared/types/auth-user-context';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly bootstrapStatus: BootstrapStatusUseCase,
    private readonly bootstrapAdmin: BootstrapAdminUseCase,
    private readonly login: LoginUseCase,
    private readonly logout: LogoutUseCase,
    private readonly refresh: RefreshUseCase,
    private readonly me: MeUseCase,
    @Inject(ENV) private readonly env: Env,
  ) {}

  // --- Trasy publiczne ---

  @Public()
  @Get('bootstrap-status')
  getBootstrapStatus() {
    return this.bootstrapStatus.execute();
  }

  @Public()
  @Post('bootstrap-admin')
  @HttpCode(201)
  async postBootstrapAdmin(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const result = await this.bootstrapAdmin.execute(body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return { user: result.user };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async postLogin(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const result = await this.login.execute(body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return {
      expiresIn: this.env.JWT_ACCESS_TTL,
      user: result.user,
    };
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async postRefresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = (req.cookies as Record<string, string> | undefined)?.['cc_refresh'];
    const result = await this.refresh.execute(raw);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return { expiresIn: this.env.JWT_ACCESS_TTL };
  }

  @Public()
  @Post('logout')
  @HttpCode(200)
  async postLogout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as AuthUserContext | undefined;
    const raw = (req.cookies as Record<string, string> | undefined)?.['cc_refresh'];
    if (user) {
      await this.logout.execute(user.id, raw);
    }
    clearAuthCookies(res);
    return { ok: true };
  }

  // --- Trasy chronione (wymagają cc_access) ---

  @Get('me')
  async getMe(@CurrentUser() user: AuthUserContext) {
    return this.me.execute(user);
  }
}
```

**Refaktor** `apps/api/src/app.module.ts` — dodanie `APP_GUARD` i importów:

teraz (fragment providers):
```typescript
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
```

zamień na:
```typescript
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// ... (do pozostałych importów dodać):
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard';
import { RolesGuard } from './shared/guards/roles.guard';

// W providers:
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
```

**Refaktor** `apps/api/src/health/health.controller.ts` — `@Public()`:

teraz:
```typescript
@ApiTags('health')
@Controller('health')
export class HealthController {
```

zamień na:
```typescript
import { Public } from '../shared/decorators/public.decorator';

@Public()
@ApiTags('health')
@Controller('health')
export class HealthController {
```

**Refaktor** `apps/api/src/metrics/metrics.controller.ts` — `@Public()`:

teraz:
```typescript
@Controller()
export class MetricsController {
```

zamień na:
```typescript
import { Public } from '../shared/decorators/public.decorator';

@Public()
@Controller()
export class MetricsController {
```

**Biblioteki / API:**
- `JwtModule.registerAsync` — [NestJS JWT docs](https://docs.nestjs.com/security/authentication) — inject `ENV` token z `EnvModule` do factory
- `PassportModule` — rejestracja strategii Passport w module
- `AuthGuard('jwt')` z `@nestjs/passport` — używa strategii `'jwt'` (nazwy z `PassportStrategy(Strategy, 'jwt')`)
- `APP_GUARD` z `@nestjs/core` — globalne guardy w kolejności: `JwtAuthGuard` → `RolesGuard`

**DoD kroku:**
- `GET /api/v1/auth/bootstrap-status` zwraca `{ available: boolean }` bez sesji
- `POST /api/v1/auth/bootstrap-admin` (201): tworzy admina + Set-Cookie `cc_access` + `cc_refresh`; drugie wywołanie → 409
- `POST /api/v1/auth/login` (200): Set-Cookie + body bez tokenów; konto nieaktywne → 401
- `POST /api/v1/auth/refresh` (200): rotacja; nieprawidłowy token → 401
- `POST /api/v1/auth/logout` (200): cookie wyczyszczone
- `GET /api/v1/auth/me` (200): `{ id, email, role }` lub 401 przy braku/wygaśnięciu `cc_access`
- `GET /api/v1/health` i `GET /metrics` dostępne bez sesji (`@Public`)
- Wszystkie inne trasy API blokowane guardem do czasu FAZY 2 KROKU 3 (który dodaje guardi na runs/company-context)
- `pnpm --filter api test` bez regresji

**Status:** `NIE_ROZPOCZĘTY`

---

## FAZA 2 — Użytkownicy, soft-delete, zabezpieczenie API, `startedBy` ze sesji

> Odpowiada Krokowi 5.2 z major planu.

### KROK 1 — Application: CreateUser, ListUsers, SoftDeleteUser

**Cel:** Zaimplementować use-case'y CRUD użytkowników (tylko `role = user`; soft-delete przez admin).  
Odwołanie: `SPEC-AUTH.md` A-7, A-10; `docs/security.md` tabela uprawnień; `docs/dokumentacja_komunikacji.md` Users.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/application/list-users.use-case.ts`
- `apps/api/src/auth/application/create-user.use-case.ts`
- `apps/api/src/auth/application/soft-delete-user.use-case.ts`

**Implementacja:**

```typescript
// apps/api/src/auth/application/list-users.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import type { AuthUser } from '../domain/auth-user.types';

export type UserListItem = Pick<
  AuthUser,
  'id' | 'email' | 'role' | 'isActive' | 'createdAt'
>;

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(): Promise<{ items: UserListItem[] }> {
    const all = await this.users.list();
    return {
      items: all.map(({ id, email, role, isActive, createdAt }) => ({
        id,
        email,
        role,
        isActive,
        createdAt: createdAt.toISOString(),
      })),
    };
  }
}
```

```typescript
// apps/api/src/auth/application/create-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';
import { hashPassword } from './auth.helpers';
import { z } from 'zod';
import type { AuthUser } from '../domain/auth-user.types';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    input: unknown,
  ): Promise<Pick<AuthUser, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(createUserSchema, input);

    validatePasswordPolicy(command.password);

    // SPEC-AUTH.md A-7: admin tworzy tylko role=user; żadna ścieżka nie tworzy admin
    const passwordHash = await hashPassword(command.password);
    const userId = createUserId(`usr_${uuidv4()}`);

    const user = await this.users.create({
      id: userId,
      email: command.email,
      passwordHash,
      role: 'user',
    });

    return { id: user.id, email: user.email, role: user.role };
  }
}
```

```typescript
// apps/api/src/auth/application/soft-delete-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { isUserId, createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user.repository.port';

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(idParam: string): Promise<{ ok: true }> {
    if (!isUserId(idParam)) {
      throw new DomainException('VALIDATION_FAILED', 'Invalid user id', 400);
    }
    const userId = createUserId(idParam);
    const user = await this.users.findById(userId);
    if (!user) {
      throw new DomainException('USER_NOT_FOUND', 'User not found', 404);
    }
    // SPEC-AUTH.md A-10: soft-delete = dezaktywacja (brak twardego DELETE)
    await this.users.setActive(userId, false);
    return { ok: true };
  }
}
```

**DoD kroku:**
- `CreateUserUseCase` zawsze tworzy `role = 'user'`; polityka haseł egzekwowana przed hashem
- `SoftDeleteUserUseCase` ustawia `isActive = false`; brak wiersza → 404
- `ListUsersUseCase` nie zwraca `passwordHash`
- Brak importu Prisma w use-case'ach

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 2 — UsersController + AuthModule.controllers update

**Cel:** HTTP powierzchnia zarządzania użytkownikami — tylko dla admina. Dodanie `UsersController` do `AuthModule`.  
Odwołanie: `docs/dokumentacja_komunikacji.md` Users; `SPEC-AUTH.md` A-7, A-10.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/users.controller.ts`

**Artefakty (refaktory):**
- `apps/api/src/auth/auth.module.ts` — dopisanie `UsersController` i use-case'ów z KROK 1

**Implementacja:**

```typescript
// apps/api/src/auth/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { ListUsersUseCase } from './application/list-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

@ApiTags('users')
@Controller('users')
@Roles('admin') // cały kontroler — tylko admin; JwtAuthGuard działa globalnie
export class UsersController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly softDelete: SoftDeleteUserUseCase,
  ) {}

  @Get()
  list() {
    return this.listUsers.execute();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: unknown) {
    return this.createUser.execute(body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.softDelete.execute(id);
  }
}
```

**Refaktor** `apps/api/src/auth/auth.module.ts` — dopisanie `UsersController` i use-case'ów CRUD użytkowników:

teraz (fragment controllers i providers):
```typescript
  controllers: [AuthController],
  providers: [
    JwtCookieStrategy,
    // ...istniejące providery...
    MeUseCase,
  ],
```

zamień na:
```typescript
import { UsersController } from './users.controller';
import { ListUsersUseCase } from './application/list-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

  controllers: [AuthController, UsersController],
  providers: [
    JwtCookieStrategy,
    // ...istniejące providery...
    MeUseCase,
    ListUsersUseCase,
    CreateUserUseCase,
    SoftDeleteUserUseCase,
  ],
```

**DoD kroku:**
- `GET /api/v1/users` → lista z `isActive`; `user` → 403 `FORBIDDEN`
- `POST /api/v1/users` (201) → tworzy tylko `role=user`; hasło wg polityki; `user` → 403
- `DELETE /api/v1/users/:id` → soft-delete; nieznany id → 404; `user` → 403
- `JwtAuthGuard` global + `RolesGuard` global egzekwują reguły bez `@UseGuards` w kontrolerze

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 3 — `@Public()` na trasach otwartych + weryfikacja guardów w runs/company-context

**Cel:** Upewnić się, że wszystkie trasy nieautoryzowane mają `@Public()` i że `RunsController` oraz `CompanyContextController` poprawnie działają z globalnym guardem; PUT/PATCH company-context wymaga roli `admin`.  
Odwołanie: `SPEC-AUTH.md` A-6; `docs/security.md` tabela uprawnień; `SPEC-RUNY.md` R-3a.

**Artefakty (refaktory):**
- `apps/api/src/company-context/company-context.controller.ts` — `@Roles('admin')` na PUT/PATCH
- (brak zmian w `runs.controller.ts` dla guardów — `JwtAuthGuard` globalny wystarczy; zmiany `startedBy` w KROK 4)

**Implementacja:**

**Refaktor** `apps/api/src/company-context/company-context.controller.ts` — `@Roles('admin')` na PUT i PATCH:

teraz (fragment):
```typescript
import { Controller, Body, Get, Patch, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
```

zamień na:
```typescript
import { Controller, Body, Get, Patch, Put, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
```

Oraz na metodach `put` i `patch`:

teraz:
```typescript
  @Put()
  put(@Body() body: PutCompanyContextDto) {
    return this.putContext.execute(toCompanyContext(body));
  }

  @Patch()
  patch(@Body() body: PatchCompanyContextDto) {
    return this.patchContext.execute(toPartialCompanyContext(body));
  }
```

zamień na:
```typescript
  @Roles('admin')
  @Put()
  put(@Body() body: PutCompanyContextDto) {
    return this.putContext.execute(toCompanyContext(body));
  }

  @Roles('admin')
  @Patch()
  patch(@Body() body: PatchCompanyContextDto) {
    return this.patchContext.execute(toPartialCompanyContext(body));
  }
```

**Weryfikacja:** Wszystkie trasy `RunsController` są chronione globalnym `JwtAuthGuard` bez dodatkowych adnotacji — admin i user mają dostęp do wszystkich run-endpoints (start, HITL, logi, SSE, lista). Różnicowanie authz wewnątrz use-case'u (np. ocena tylko własnego runu) — Faza 2 / Krok 4 i Faza 4 / Krok 3.

**DoD kroku:**
- `PUT/PATCH /api/v1/company-context` przy `role=user` → 403 `FORBIDDEN`
- `GET /api/v1/company-context` i `/completeness` przy ważnej sesji (admin lub user) → działa
- `GET /api/v1/runs`, `POST /api/v1/runs` itd. — wymagają ważnego `cc_access`; bez sesji → 401
- `GET /api/v1/health` i `GET /metrics` — publiczne, bez sesji → 200

**Status:** `NIE_ROZPOCZĘTY`

---

### KROK 4 — `startedBy` ze sesji: StartRunUseCase + RunsController

**Cel:** Przekazać `userId` z uwierzytelnionej sesji do `StartRunUseCase`, by run miał inicjatora zamiast `null`.  
Odwołanie: `SPEC-RUNY.md` R-3b; major Krok 5.2 DoD „nowe runy ze sesją mają `startedBy`".

> **Uwaga:** join `startedBy: { id, email }` w `PrismaRunAdapter.getById` jest JUŻ zaimplementowany (include w Faza 4 KROK 4.4). Snapshot i lista już zwracają `{ id, email }`. Jedyna zmiana to przekazanie `userId` z sesji zamiast hardcoded `null`.

**Artefakty (refaktory):**
- `apps/api/src/runs/application/start-run.use-case.ts` — sygnatura `execute(command, startedByUserId?)`
- `apps/api/src/runs/runs.controller.ts` — wyciągnięcie `user.id` z sesji i przekazanie do use-case

**Implementacja:**

**Refaktor** `apps/api/src/runs/application/start-run.use-case.ts`:

teraz (sygnatura execute + linie z `startedByUserId: null`):
```typescript
  async execute(
    command: StartRunCommand,
  ): Promise<Pick<RunRecord, 'id' | 'conversationId' | 'status'>> {
```

```typescript
        startedByUserId: null,
```
(linia 112 i 130 — obie instancje)

zamień na:
```typescript
  async execute(
    command: StartRunCommand,
    startedByUserId: UserId | null = null,
  ): Promise<Pick<RunRecord, 'id' | 'conversationId' | 'status'>> {
```

```typescript
        startedByUserId,
```
(obie instancje — zarówno content jak i social branch)

Pełny import `UserId` już jest w pliku przez `@content-chain/shared`.

**Refaktor** `apps/api/src/runs/runs.controller.ts` — import `CurrentUser` i przekazanie `userId`:

teraz (import + create handler):
```typescript
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Sse,
  Query,
  BadRequestException,
  type MessageEvent,
} from '@nestjs/common';
```

zamień na (dodaj `Patch` i import dekoratorów):
```typescript
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Sse,
  Query,
  BadRequestException,
  type MessageEvent,
} from '@nestjs/common';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUserContext } from '../shared/types/auth-user-context';
```

teraz (metoda `create`):
```typescript
  @Post()
  @HttpCode(202)
  async create(@Body() body: StartRunDto) {
    const result = await this.startRun.execute(body);
```

zamień na:
```typescript
  @Post()
  @HttpCode(202)
  async create(
    @Body() body: StartRunDto,
    @CurrentUser() user: AuthUserContext,
  ) {
    const result = await this.startRun.execute(body, user.id);
```

**DoD kroku:**
- `POST /api/v1/runs` ze ważną sesją → nowy run ma `startedByUserId = user.id`
- `GET /api/v1/runs/:runId` → `startedBy: { id, email }` (nie null) dla runów ze sesją
- `GET /api/v1/runs` → pozycje listy mają `startedBy: { id, email }`
- TypeScript kompiluje się (sygnatura execute z opcjonalnym drugim parametrem)
- Istniejące testy e2e D-4..D-22 nie psują się (test-helpers mogą wymagać drobnego update `startedByUserId` — bez regresji logiki)

**Status:** `NIE_ROZPOCZĘTY`

---

## Weryfikacja wycinka (DoD FAZY 1 + 2)

- [ ] `POST /auth/bootstrap-admin` tworzy jedynego admina + sesję cookie; drugie wywołanie → 409
- [ ] `GET /auth/bootstrap-status` → `{ available: false }` po bootstrapie
- [ ] `POST /auth/login` → body bez tokenów; Set-Cookie `cc_access` + `cc_refresh`; konto inactive → 401
- [ ] `POST /auth/refresh` → rotacja refresh; nieważny token → 401
- [ ] `GET /auth/me` → `{ id, email, role }` przy ważnym `cc_access`; wygasły/brak → 401
- [ ] `POST /auth/logout` → cookie wyczyszczone; idempotentny
- [ ] Próba bootstrap z hasłem < 12 znaków / bez cyfry / bez wielkiej / bez znaku specjalnego → 400 `VALIDATION_FAILED`
- [ ] `POST /users` (admin) tworzy `role=user`; `user` → 403
- [ ] `DELETE /users/:id` → soft-delete (`isActive = false`); nieaktywny nie loguje się po tej operacji
- [ ] `PUT/PATCH /company-context` przy `role=user` → 403
- [ ] `POST /runs` bez sesji → 401; z sesją → `startedByUserId` ustawiony; snapshot `startedBy: { id, email }`
- [ ] `GET /health` i `GET /metrics` — publiczne (200 bez sesji)
- [ ] Zgodność z `SPEC-AUTH.md` A-1..A-10 i `docs/security.md`
- [ ] `pnpm --filter api test` (unit) zielone

---

## Ślad do major (po implementacji i zatwierdzeniu)

Po realnej implementacji kodu wg tego planu:

| Element major | Oczekiwany status |
|---|---|
| Krok 5.1 | `WYKONANY` |
| Krok 5.2 | `WYKONANY` |
| Faza 5 | `WYKONANY` |
| MILESTONE 5 | `OSIĄGNIĘTY` (po zielonym pipeline Milestone 4 z auth) |

Faza 6 i MILESTONE 6 → plik `_2`.

> Statusy major zmienia użytkownik ręcznie po realnej implementacji — ten plan ich nie modyfikuje.
