# Feature Plan — Faza 5–6 Auth + Feedback (plik 1/2): Auth API

## Meta

**Kotwica major:** Faza 5 (Krok 5.1 + 5.2) — Auth API w formie docelowej.  
**Zakres tego pliku:** FAZA 1 (bootstrap, sesja, role, `/me`) + FAZA 2 (użytkownicy: lista → **InviteUser** → soft-delete, guardi, `startedBy` ze sesji). Kolejność kroków FAZY 2: **KROK 1 → 2 → 3 → 4** (bez KROK 5+).  
**Plik 2/2:** `content-chain_feature_plan_faza-5-6-auth-feedback_2.md` — FAZA 3 (persistence) + FAZA 4 (Feedback BC + review runu).  
**Źródła:** `SPEC-AUTH.md`, `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`, `SPEC-PERSISTENCE.md`.  
**Poza zakresem wycinka tego pliku:** BC Feedback, tabela Feedback, pola przeglądu runu, `GET /runs/user/:userId` → plik 2/2.

---

## Założenia (stack / wersje)

- NestJS 11 + `@nestjs/passport` + `@nestjs/jwt` + `passport-jwt` (zainstalować — brak w `package.json`)  
- `bcrypt` (cost = 12) dla haseł; SHA-256 dla hasha refresh tokena **oraz** tokenu zaproszenia w DB  
- Cookie `cc_access` (JWT, httpOnly) + `cc_refresh` (random hex 32B, httpOnly) — per `SPEC-AUTH.md` A-2  
- Refresh rotacja: nowy token + nowy `cc_access` przy każdym `/auth/refresh`  
- Guardi globalne przez `APP_GUARD` w `AppModule` + `@Public()` dla tras otwartych (w tym `accept-invite`)  
- `validatePasswordPolicy` — reguły z `SPEC-AUTH.md` A-5 / `docs/security.md` (także pierwsze hasło na accept-invite)  
- Zod 3 w `apps/api` (Faza 9 przyniesie bump do 4); Zod tylko w application  
- Prisma SQLite — `User` i `RefreshSession` już w schemacie. **KROK 1 wymaga** migracji modelu `Invitation` **oraz** SQL D17 (`UNIQUE (email) WHERE status = 'pending'`, komentarz jak `User_one_admin`). ~~brak DDL-migracji dla auth~~  
- `nodemailer` (+ `@types/nodemailer`) — obowiązkowy adapter SMTP w infrastructure; port mailera w Auth. Deps **KROKU 1** (nie osobnego kroku). `development` / `test`: adapter logujący (send zawsze się udaje).  
- `JWT_SECRET`, `JWT_ACCESS_TTL` (default `15m`), `JWT_REFRESH_TTL` (default `1d`) — już w `env.schema.ts`  
- KROK 1 dopisuje: `INVITE_TTL` (default `7d`, `parseTtlMs` jak JWT), `MAIL_FROM`, `APP_PUBLIC_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — fail-fast w `production` (`docs/deployment.md`)  
- `startedBy: { id, email }` już zmapowany w `PrismaRunAdapter.toSnapshot` (include join); brakuje przekazania `userId` z sesji przy POST /runs

---

## FAZA 1 — Bootstrap, sesja cookie, role i probe `/me`

> Odpowiada Krokowi 5.1 z major planu.

### KROK 1 — Instalacja deps auth i cookie-parser w configureHttpApp

**Status:** `WYKONANY`

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

---

### KROK 2 — Domain auth: typy, polityka haseł, porty

**Status:** `WYKONANY`

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

---

### KROK 3 — Infrastructure: adaptery Prisma, JwtCookieStrategy, cookie helpers

**Status:** `WYKONANY`

**Cel:** Implementacja portów w warstwie infrastructure: Prisma adaptery dla User i RefreshSession, strategia JWT z cookie extractorem, narzędzia cookie.  
Odwołanie: `SPEC-AUTH.md` norma implementacji (cookie httpOnly, jwt cookie extractor).

Zmiana względem: wcześniejszy szkic tego kroku (`PassportStrategy(Strategy, 'jwt')`). Obowiązuje aktualna implementacja `apps/api/src/auth/infrastructure/jwt-cookie.strategy.ts` — nazwa strategii Passport to `'jwt-cookie'` (nie `'jwt'`). Guard w Kroku 5 musi używać tej samej nazwy.

Zmiana względem: wcześniejszy szkic `clearAuthCookies(res: Response)` czyścił cookie tylko z `{ path: '/' }`. Obowiązuje aktualna sygnatura `clearAuthCookies(res: Response, env: Env)` z `cookie.helper.ts` — `clearCookie` dostaje te same flagi co `setAuthCookies` (`httpOnly`, `secure`, `sameSite`, `path`), żeby Express/przeglądarka usunęły cookie ustawione w production.

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
import { createUserId, isUserId } from '@content-chain/shared';
import { ENV, type Env } from '../../shared/config/env';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { Request } from 'express';
import type { AuthUserContext } from '../domain/auth-user.types';
import type { JwtPayload } from '../domain/auth-user.types';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(@Inject(ENV) private readonly env: Env) {
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

export function clearAuthCookies(res: Response, env: Env): void {
  const isProduction = env.NODE_ENV === 'production';
  const base = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
    path: '/',
  };
  res.clearCookie(ACCESS_COOKIE, base);
  res.clearCookie(REFRESH_COOKIE, base);
}
```

**Biblioteki / API:**
- `passport-jwt` / `ExtractJwt.fromExtractors` — pobiera JWT z `req.cookies['cc_access']`; wersja z `package.json` po instalacji w KROK 1
- `bcrypt.hash(plain, 12)` / `bcrypt.compare(plain, hash)` — cost 12 per `SPEC-AUTH.md` A-5

**DoD kroku:**
- `PrismaUserAdapter.findForAuth` zwraca `passwordHash`; `findById` — bez hasha
- `PrismaRefreshSessionAdapter.findValid` odfiltrowuje wygasłe sesje (`expiresAt > now`)
- `JwtCookieStrategy` rejestruje się jako `'jwt-cookie'` (`PassportStrategy(Strategy, 'jwt-cookie')`)
- `JwtCookieStrategy.validate` zwraca `AuthUserContext` albo rzuca 401
- `setAuthCookies` ustawia `httpOnly: true`; `Secure` i `SameSite=strict` tylko w production
- `clearAuthCookies(res, env)` czyści `cc_access` i `cc_refresh` z tymi samymi flagami co `setAuthCookies`
- TypeScript bez błędów

---

### KROK 4 — Application: use-case'y auth + schemas Zod

**Status:** `WYKONANY`

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

---

### KROK 5 — AuthModule wiring, AuthController, guardy globalne, dekoratory

**Status:** `WYKONANY`

**Cel:** Złożyć `AuthModule` z NestJS DI, zaimplementować `AuthController`, zdefiniować globalne guardy i dekoratory pomocnicze.  
Odwołanie: `SPEC-AUTH.md` norma implementacji, `docs/security.md`.

Zmiana względem: wcześniejszy szkic tego kroku (`AuthGuard('jwt')` / strategia `'jwt'`). Nazwa strategii obowiązuje z Fazy 1 / Kroku 3 — `JwtCookieStrategy` w `jwt-cookie.strategy.ts` rejestruje `'jwt-cookie'`; `JwtAuthGuard` musi wołać `AuthGuard('jwt-cookie')`.

Zmiana względem: wcześniejsze wywołanie `clearAuthCookies(res)` w `AuthController.postLogout`. Obowiązuje sygnatura z Fazy 1 / Kroku 3 — `clearAuthCookies(res, this.env)`.

Zmiana względem: wcześniejszy szkic `AuthController` z `@Body() body: unknown`. Obowiązuje DTO HTTP class-validator (`SPEC-AUTH.md` Wolno; `SPEC-KOMUNIKACJA.md` warstwa Controller + kryterium „DTO HTTP walidowane class-validator”). Prawda haseł nadal w domain (`validatePasswordPolicy`, Faza 1 / Krok 2) + Zod w application (`parseWithZod`, Faza 1 / Krok 4). Use-case’y zostają przy `execute(input: unknown)` — instancja DTO jest legalnym wejściem.

Zmiana względem: wcześniejszy szkic `AuthController.postLogout` z `@Public()` i opcjonalnym `req.user` (wylogowanie bez sesji, tylko clear cookie). Obowiązuje: `POST /auth/logout` **wymaga** ważnego `cc_access` (`JwtAuthGuard`, bez `@Public()`). Bez sesji → `401`. `req.user` jest źródłem tożsamości, kogo wylogować (`LogoutUseCase.execute(user.id, …)`). `@Public()` zostaje na `bootstrap-status`, `bootstrap-admin`, `login`, `refresh` — nie na `logout` ani `/me`.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/http/dto/bootstrap-admin.dto.ts` — body `POST /auth/bootstrap-admin`
- `apps/api/src/auth/http/dto/login.dto.ts` — body `POST /auth/login`
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
 * Używa strategii 'jwt-cookie' (JwtCookieStrategy) zarejestrowanej w AuthModule.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-cookie') {
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
import { BootstrapAdminDto } from './http/dto/bootstrap-admin.dto';
import { LoginDto } from './http/dto/login.dto';
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
  async postBootstrapAdmin(@Body() body: BootstrapAdminDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.bootstrapAdmin.execute(body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return { user: result.user };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
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

  // --- Trasy chronione (wymagają cc_access) ---

  @Post('logout')
  @HttpCode(200)
  async postLogout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as AuthUserContext | undefined;
    if (!user) {
      throw new UnauthorizedException();
    }
    const raw = (req.cookies as Record<string, string> | undefined)?.['cc_refresh'];
    await this.logout.execute(user.id, raw);
    clearAuthCookies(res, this.env);
    return { ok: true };
  }

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
- `AuthGuard('jwt-cookie')` z `@nestjs/passport` — używa strategii `'jwt-cookie'` (nazwy z `PassportStrategy(Strategy, 'jwt-cookie')` w Kroku 3)
- `APP_GUARD` z `@nestjs/core` — globalne guardy w kolejności: `JwtAuthGuard` → `RolesGuard`
- class-validator (`@IsEmail`, `@IsString`, `@MinLength`) + `@nestjs/swagger` `@ApiProperty` — DTO HTTP jak `runs/http/dto` i `company-context/http/dto`; `ValidationPipe` (whitelist / `forbidNonWhitelisted`) już globalny (Faza 1 / Krok 1)

```typescript
// apps/api/src/auth/http/dto/bootstrap-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/** Cienka bramka HTTP. Polityka haseł — domain; kształt komendy — Zod w application. */
export class BootstrapAdminDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  password!: string;
}
```

```typescript
// apps/api/src/auth/http/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/** Cienka bramka HTTP. Polityka haseł — domain; kształt komendy — Zod w application. */
export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  password!: string;
}
```

**DoD kroku:**
- `GET /api/v1/auth/bootstrap-status` zwraca `{ available: boolean }` bez sesji
- `POST /api/v1/auth/bootstrap-admin` i `POST /api/v1/auth/login` przyjmują DTO class-validator (`email`, `password`); nieznany klucz w body → 400 (`ValidationPipe` `forbidNonWhitelisted`); pełna polityka haseł nadal w domain/application
- `POST /api/v1/auth/bootstrap-admin` (201): tworzy admina + Set-Cookie `cc_access` + `cc_refresh`; drugie wywołanie → 409
- `POST /api/v1/auth/login` (200): Set-Cookie + body bez tokenów; konto nieaktywne → 401
- `POST /api/v1/auth/refresh` (200): rotacja; nieprawidłowy token → 401
- `POST /api/v1/auth/logout` wymaga ważnego `cc_access` (bez `@Public()`); brak/wygasła sesja → 401; (200): unieważnienie sesji refresh tego użytkownika + cookie wyczyszczone
- `GET /api/v1/auth/me` (200): `{ id, email, role }` lub 401 przy braku/wygaśnięciu `cc_access`
- `GET /api/v1/health` i `GET /metrics` dostępne bez sesji (`@Public`)
- Wszystkie inne trasy API blokowane guardem do czasu FAZY 2 KROKU 3 (który dodaje guardi na runs/company-context)
- `pnpm --filter api test` bez regresji

---

## FAZA 2 — Użytkownicy, zaproszenia, soft-delete, zabezpieczenie API, `startedBy` ze sesji

> Odpowiada Krokowi 5.2 z major planu.

### KROK 1 — Application: ListUsers, InviteUser, SoftDeleteUser

**Status:** `WYKONANY`

**Cel:** Zaimplementować listę kont, **zaproszenia** (`InviteUser` + pomocnicze w tym samym slocie) oraz soft-delete przez admin. Kolejność artefaktów: **`InvitationId` w `packages/shared`** → `ListUsers` → **`InviteUser` (ex-`CreateUser`)** → `SoftDeleteUser`.  
Odwołanie: `SPEC-AUTH.md` A-7 / A-7a–d, A-10; `docs/security.md` tabela uprawnień; `docs/dokumentacja_komunikacji.md` Users + Invitations; `docs/brand_types.md` (`InvitationId` = `inv_<uuid>`).  
Refaktor względem: FAZA 2 / KROK 1 — blok `CreateUserUseCase` + `createUserSchema` z `password` (środkowy artefakt kroku).  
Refaktor względem: `packages/shared/src/branded/ids.ts` (FAZA 1 monorepo, WYKONANY) — katalog ID bez `InvitationId`; port `invitation-repository.port.ts` importuje `InvitationId` / `UserId` z `@content-chain/shared`, więc brand musi powstać **przed** portem i use-case'ami.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/application/list-users.use-case.ts`
- `apps/api/src/auth/application/invite-user.use-case.ts` (zamiast `create-user.use-case.ts`)
- `apps/api/src/auth/application/list-invitations.use-case.ts`
- `apps/api/src/auth/application/resend-invitation.use-case.ts`
- `apps/api/src/auth/application/revoke-invitation.use-case.ts`
- `apps/api/src/auth/application/accept-invite.use-case.ts`
- `apps/api/src/auth/domain/invitation-repository.port.ts`
- `apps/api/src/auth/domain/transactional-mailer.port.ts`
- `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts`
- `apps/api/src/auth/infrastructure/logging-mailer.adapter.ts`
- `apps/api/src/auth/infrastructure/nodemailer-smtp-mailer.adapter.ts`
- `apps/api/src/auth/application/soft-delete-user.use-case.ts`

**Artefakty (refaktory / DDL w tym samym kroku):**
- `packages/shared/src/branded/ids.ts` — dopisanie `InvitationId` (`inv_<uuid>`) + `INVITATION_ID_RE` + `isInvitationId` / `createInvitationId` (wzorzec jak `UserId`)
- `packages/shared/src/index.ts` — **bez zmiany treści**; już re-eksportuje `./branded/ids` (port `invitation-repository.port.ts` importuje `InvitationId` stąd)
- `apps/api/src/shared/http/new-ids.ts` — dopisanie `newInvitationId()` analogicznie do `newUserId` (konsument `createInvitationId`)
- `apps/api/prisma/schema.prisma` — model `Invitation` + komentarz partial unique (jak `User_one_admin`)
- migracja SQL D17: `UNIQUE (email) WHERE status = 'pending'` (**bez** `purpose`)
- `apps/api/src/shared/config/env.schema.ts` + `apps/api/.env.example` — `INVITE_TTL`, `MAIL_FROM`, `APP_PUBLIC_URL`, `SMTP_*`
- `apps/api/src/shared/config/env.schema.spec.ts` — default `INVITE_TTL=7d` + fail-fast SMTP w `production`
- `pnpm --filter api add nodemailer` oraz `pnpm --filter api add -D @types/nodemailer`

Wiring `AuthModule` (providery Invitation / mailer / use-case’y Fazy 2) — **KROK 2**, nie ten slot.

**Implementacja:**

Najpierw brand w shared (kompilacja `@content-chain/shared` **przed** portem). `InvitationPurpose` / `InvitationStatus` **zostają** w `invitation-repository.port.ts` (domain Auth), nie w `packages/shared/src/branded/enums.ts`.

**Refaktor** `packages/shared/src/branded/ids.ts` — dopisać `InvitationId` obok `UserId` (typ, regex, helpery):

```typescript
// packages/shared/src/branded/ids.ts — dopiski (reszta pliku bez zmian)

export type RequestId = Brand<string, 'RequestId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type UserId = Brand<string, 'UserId'>;
export type InvitationId = Brand<string, 'InvitationId'>;
export type RunId = Brand<string, 'RunId'>;
export type GatewayModelAlias = Brand<string, 'GatewayModelAlias'>;

const UUID_PART = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const REQUEST_ID_RE = new RegExp(`^req_${UUID_PART}$`, 'i');
const CONV_ID_RE = new RegExp(`^conv_${UUID_PART}$`, 'i');
const USER_ID_RE = new RegExp(`^usr_${UUID_PART}$`, 'i');
const INVITATION_ID_RE = new RegExp(`^inv_${UUID_PART}$`, 'i');
const RUN_ID_RE = new RegExp(`^run_${UUID_PART}$`, 'i');

// ---------------------------------------------------------------------------
// InvitationId — ID zaproszenia (Invitation), nie konto User; docs/brand_types.md
// ---------------------------------------------------------------------------

export const isInvitationId = (value: string): value is InvitationId =>
  INVITATION_ID_RE.test(value);
export const createInvitationId = (value: string): InvitationId => {
  if (!isInvitationId(value)) throw new Error('Invalid InvitationId');
  return brand<InvitationId>(value);
};
```

Zakaz: `as InvitationId` na `req.params` / wierszu Prisma bez `isInvitationId` / `createInvitationId`. Prefiks `inv_` — nie mylić z `usr_`.

**Refaktor** `apps/api/src/shared/http/new-ids.ts` — dopisać fabrykę (wzorzec `newUserId`):

```typescript
// apps/api/src/shared/http/new-ids.ts — dopisek
import {
  createConversationId,
  createInvitationId,
  createRequestId,
  createRunId,
  createUserId,
  type ConversationId,
  type InvitationId,
  type RequestId,
  type RunId,
  type UserId,
} from '@content-chain/shared';

export const newRequestId = (): RequestId => createRequestId(`req_${uuidv4()}`);
export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${uuidv4()}`);
export const newRunId = (): RunId => createRunId(`run_${uuidv4()}`);
export const newUserId = (): UserId => createUserId(`usr_${uuidv4()}`);
export const newInvitationId = (): InvitationId =>
  createInvitationId(`inv_${uuidv4()}`);
```

`InviteUserUseCase` może wołać `newInvitationId()` zamiast składać prefiks `inv_` i uuid ręcznie przez `createInvitationId`. Adapter Prisma mapuje `row.id` przez `createInvitationId` (jak `createUserId` w `prisma-user.adapter.ts`).

Po zmianie shared: `pnpm --filter @content-chain/shared build` (albo `dev`), zanim api skompiluje `import type { InvitationId, UserId } from '@content-chain/shared'` w `invitation-repository.port.ts`.

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
// apps/api/src/auth/domain/invitation-repository.port.ts
import type { InvitationId, UserId } from '@content-chain/shared';

export const INVITATION_REPOSITORY = Symbol('INVITATION_REPOSITORY');

export type InvitationPurpose = 'invite';
export type InvitationStatus = 'pending' | 'accepted' | 'revoked';

export type InvitationRecord = {
  id: InvitationId;
  email: string;
  tokenHash: string;
  purpose: InvitationPurpose;
  status: InvitationStatus;
  expiresAt: Date;
  invitedByUserId: UserId;
  createdAt: Date;
};

export type CreateInvitationInput = {
  id: InvitationId;
  email: string;
  tokenHash: string;
  purpose: InvitationPurpose;
  expiresAt: Date;
  invitedByUserId: UserId;
};

export type RotateInvitationTokenInput = {
  id: InvitationId;
  tokenHash: string;
  expiresAt: Date;
};

export interface InvitationRepository {
  createPending(input: CreateInvitationInput): Promise<InvitationRecord>;
  findPendingByEmail(email: string): Promise<InvitationRecord | null>;
  listPending(): Promise<InvitationRecord[]>;
  findById(id: InvitationId): Promise<InvitationRecord | null>;
  findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null>;
  rotateToken(input: RotateInvitationTokenInput): Promise<InvitationRecord>;
  revoke(id: InvitationId): Promise<void>;
  markAccepted(id: InvitationId): Promise<void>;
}
```

Zmiana względem: nazwa metody portu `findValidPendingByTokenHash` — obowiązuje `findPendingByHash` (ten sam kontrakt: hash + `now`; pending/ważność w adapterze). Zgodnie z `apps/api/src/auth/domain/invitation-repository.port.ts`.

**Uzupełnienie portu** `invitation-repository.port.ts` — `InvitationListRecord` (GET lista: `invitedBy` bez hashu) oraz `acceptAndCreateUser` (D16, wzorzec `createAdminIfNone`). Use-case **nie** importuje Prisma. `markAccepted` zostaje jako prymityw persistence; `AcceptInviteUseCase` woła wyłącznie `acceptAndCreateUser`.

Zmiana względem: szkic interfejsu powyżej z `listPending(): Promise<InvitationRecord[]>` i bez `acceptAndCreateUser`.

Dodaj typy (po `RotateInvitationTokenInput`; `import type { AuthUser }` z `./auth-user.types`):

```typescript
export type InvitationListRecord = {
  id: InvitationId;
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date;
  invitedBy: { id: UserId; email: string };
};

export type AcceptInviteAndCreateUserInput = {
  invitationId: InvitationId;
  userId: UserId;
  email: string;
  passwordHash: string;
};

export type AcceptInviteAndCreateUserResult =
  | { ok: true; user: AuthUser }
  | { ok: false; reason: 'email-taken' };
```

teraz:

```typescript
export interface InvitationRepository {
  createPending(input: CreateInvitationInput): Promise<InvitationRecord>;
  findPendingByEmail(email: string): Promise<InvitationRecord | null>;
  listPending(): Promise<InvitationRecord[]>;
  findById(id: InvitationId): Promise<InvitationRecord | null>;
  findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null>;
  rotateToken(input: RotateInvitationTokenInput): Promise<InvitationRecord>;
  revoke(id: InvitationId): Promise<void>;
  markAccepted(id: InvitationId): Promise<void>;
}
```

zamień na:

```typescript
export interface InvitationRepository {
  createPending(input: CreateInvitationInput): Promise<InvitationRecord>;
  findPendingByEmail(email: string): Promise<InvitationRecord | null>;
  listPending(): Promise<InvitationListRecord[]>;
  findById(id: InvitationId): Promise<InvitationRecord | null>;
  findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null>;
  rotateToken(input: RotateInvitationTokenInput): Promise<InvitationRecord>;
  revoke(id: InvitationId): Promise<void>;
  markAccepted(id: InvitationId): Promise<void>;
  acceptAndCreateUser(
    input: AcceptInviteAndCreateUserInput,
  ): Promise<AcceptInviteAndCreateUserResult>;
}
```

```typescript
// apps/api/src/auth/domain/transactional-mailer.port.ts
import type { InvitationId } from '@content-chain/shared';

export const TRANSACTIONAL_MAILER = Symbol('TRANSACTIONAL_MAILER');

export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
};

export interface TransactionalMailer {
  send(message: UserInvitedMail): Promise<void>;
}
```

**Prisma** (ten sam krok; komentarz jak `User_one_admin`):

```prisma
model Invitation {
  id              String   @id
  email           String
  tokenHash       String
  /// MVP: tylko `invite`. Kolumna rezerwa pod `password_reset` — inny purpose nieobsługiwany.
  purpose         String
  status          String
  expiresAt       DateTime
  invitedByUserId String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  /// Unique index `Invitation_one_pending_email` (status = 'pending') in SQL migration — SPEC-AUTH A-7d / SPEC-PERSISTENCE P-5 D17. Prisma 6 cannot declare partial unique in schema. Index without `purpose`.
  invitedBy       User     @relation(fields: [invitedByUserId], references: [id])
}
```

**Migracja** `apps/api/prisma/migrations/<timestamp>_users_invitations/migration.sql` (CREATE TABLE + D17 w tym samym pliku; komentarz jak `User_one_admin`):

```sql
-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Invitation_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Unique index `Invitation_one_pending_email` (status = 'pending') — SPEC-AUTH A-7d / SPEC-PERSISTENCE D17.
-- Partial unique is not expressible in Prisma 6 schema (preview `partialIndexes` is Prisma 7.4+).
-- Index without `purpose`. Expired rows stay status = 'pending' and still block a second POST.
CREATE UNIQUE INDEX "Invitation_one_pending_email" ON "Invitation"("email") WHERE "status" = 'pending';
```

`User.passwordHash` nadal wymagany — wiersz `User` powstaje dopiero w `AcceptInvite`. Na `User` dopisać relację `invitations Invitation[]`.

```typescript
// apps/api/src/auth/application/invite-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  createInvitationId,
  type InvitationId,
  type UserId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import { z } from 'zod';

const inviteUserSchema = z.object({
  email: z.string().email(),
});

export type InviteUserResult = {
  id: InvitationId;
  email: string;
  expiresAt: string;
};

@Injectable()
export class InviteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    input: unknown,
    invitedByUserId: UserId,
  ): Promise<InviteUserResult> {
    const command = parseWithZod(inviteUserSchema, input);
    // D18: bez trim/toLowerCase — email case-sensitive jak User

    const existingUser = await this.users.findForAuth(command.email);
    if (existingUser) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const pending = await this.invitations.findPendingByEmail(command.email);
    if (pending) {
      throw new DomainException(
        'CONFLICT',
        'Pending invitation already exists',
        409,
      );
    }

    const { raw, hash } = generateRefreshToken();
    const invitationId = createInvitationId(`inv_${uuidv4()}`);
    const expiresAt = new Date(Date.now() + parseTtlMs(this.env.INVITE_TTL));

    const saved = await this.invitations.createPending({
      id: invitationId,
      email: command.email,
      tokenHash: hash,
      purpose: 'invite',
      expiresAt,
      invitedByUserId,
    });

    try {
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
      });
    } catch {
      throw new DomainException(
        'MAIL_DELIVERY_FAILED',
        'Mail delivery failed',
        503,
        [{ id: saved.id }],
      );
    }

    return {
      id: saved.id,
      email: saved.email,
      expiresAt: saved.expiresAt.toISOString(),
    };
  }
}
```

**Uzupełnienie** `invite-user.use-case.ts` — `newInvitationId()` (DoD tego kroku; bez ręcznego `inv_` + `uuidv4`).

teraz:

```typescript
import { v4 as uuidv4 } from 'uuid';
import {
  createInvitationId,
  type InvitationId,
  type UserId,
} from '@content-chain/shared';
```

```typescript
    const invitationId = createInvitationId(`inv_${uuidv4()}`);
```

zamień na:

```typescript
import { newInvitationId } from '../../shared/http/new-ids';
import type { InvitationId, UserId } from '@content-chain/shared';
```

```typescript
    const invitationId = newInvitationId();
```

Pomocnicze **tego samego slota** (nie wynosić do KROKU 3/4/5). `hashRefreshToken` / `generateRefreshToken` (SHA-256) — reuse na token zaproszenia.

```typescript
// apps/api/src/auth/application/list-invitations.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import type { InvitationId, UserId } from '@content-chain/shared';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';

export type InvitationListItem = {
  id: InvitationId;
  email: string;
  createdAt: string;
  expiresAt: string;
  invitedBy: { id: UserId };
};

@Injectable()
export class ListInvitationsUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
  ) {}

  async execute(): Promise<{ items: InvitationListItem[] }> {
    const pending = await this.invitations.listPending();
    return {
      items: pending.map((row) => ({
        id: row.id,
        email: row.email,
        createdAt: row.createdAt.toISOString(),
        expiresAt: row.expiresAt.toISOString(),
        invitedBy: { id: row.invitedByUserId },
      })),
    };
  }
}
```

```typescript
// apps/api/src/auth/application/resend-invitation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { createInvitationId, isInvitationId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../shared/config/env';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import type { InviteUserResult } from './invite-user.use-case';

@Injectable()
export class ResendInvitationUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(idParam: string): Promise<InviteUserResult> {
    if (!isInvitationId(idParam)) {
      throw new DomainException(
        'VALIDATION_FAILED',
        'Invalid invitation id',
        400,
      );
    }
    const invitationId = createInvitationId(idParam);
    const existing = await this.invitations.findById(invitationId);
    if (!existing || existing.status !== 'pending') {
      throw new DomainException(
        'INVITATION_NOT_FOUND',
        'Invitation not found',
        404,
      );
    }

    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(Date.now() + parseTtlMs(this.env.INVITE_TTL));
    const saved = await this.invitations.rotateToken({
      id: invitationId,
      tokenHash: hash,
      expiresAt,
    });

    try {
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
      });
    } catch {
      throw new DomainException(
        'MAIL_DELIVERY_FAILED',
        'Mail delivery failed',
        503,
        [{ id: saved.id }],
      );
    }

    return {
      id: saved.id,
      email: saved.email,
      expiresAt: saved.expiresAt.toISOString(),
    };
  }
}
```

```typescript
// apps/api/src/auth/application/revoke-invitation.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { createInvitationId, isInvitationId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';

@Injectable()
export class RevokeInvitationUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
  ) {}

  async execute(idParam: string): Promise<{ ok: true }> {
    if (!isInvitationId(idParam)) {
      throw new DomainException(
        'VALIDATION_FAILED',
        'Invalid invitation id',
        400,
      );
    }
    const invitationId = createInvitationId(idParam);
    const existing = await this.invitations.findById(invitationId);
    if (!existing || existing.status !== 'pending') {
      throw new DomainException(
        'INVITATION_NOT_FOUND',
        'Invitation not found',
        404,
      );
    }
    await this.invitations.revoke(invitationId);
    return { ok: true };
  }
}
```

```typescript
// apps/api/src/auth/application/accept-invite.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import type { UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newUserId } from '../../shared/http/new-ids';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import { hashPassword, hashRefreshToken } from './auth.helpers';

const acceptInviteSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(1),
});

export type AcceptInviteResult = {
  user: { id: UserId; email: string; role: 'user' };
};

@Injectable()
export class AcceptInviteUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
  ) {}

  async execute(input: unknown): Promise<AcceptInviteResult> {
    const command = parseWithZod(acceptInviteSchema, input);
    const tokenHash = hashRefreshToken(command.token);

    const invitation = await this.invitations.findPendingByHash(
      tokenHash,
      new Date(),
    );
    if (!invitation) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid invitation token',
        401,
      );
    }

    validatePasswordPolicy(command.password);

    const passwordHash = await hashPassword(command.password);
    const created = await this.invitations.acceptAndCreateUser({
      invitationId: invitation.id,
      userId: newUserId(),
      email: invitation.email,
      passwordHash,
    });
    if (!created.ok) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    return {
      user: {
        id: created.user.id,
        email: created.user.email,
        role: 'user',
      },
    };
  }
}
```

`AcceptInviteUseCase` **nie** woła `setAuthCookies`. Zły token / revoked / wygasły → ten sam `401 UNAUTHORIZED` (zaproszenie bez zmian). Hasło poza A-5 → `400 VALIDATION_FAILED` (pending bez zmian). Kolizja `User.email` (P2002) → `409 CONFLICT`.

`PrismaInvitationAdapter` woła zapytania wyłącznie przez `PrismaService` (jak `prisma-refresh-session.adapter.ts`). Import `{ Prisma } from '@prisma/client'` **nie** jest klientem DB — to namespace błędów Prisma. Jest potrzebny **tylko** w `acceptAndCreateUser`: type-guard `Prisma.PrismaClientKnownRequestError` + kod `P2002` (unikalny `User.email`) → `{ ok: false, reason: 'email-taken' }`. Ten sam helper co `isUniqueConstraintViolation` w `prisma-user.adapter.ts` (`createAdminIfNone`). Analogią **nie** jest refresh-session — tam port nie mapuje unique constraint na wynik domenowy. Bez tego catcha kolizja wychodzi jako 500 zamiast 409 (`SPEC-AUTH.md` A-7b / D16).

```typescript
// apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  createInvitationId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AcceptInviteAndCreateUserInput,
  AcceptInviteAndCreateUserResult,
  CreateInvitationInput,
  InvitationListRecord,
  InvitationPurpose,
  InvitationRecord,
  InvitationRepository,
  InvitationStatus,
  RotateInvitationTokenInput,
} from '../domain/invitation-repository.port';

// Namespace Prisma tylko tutaj (P2002). Zapytania: this.prisma (PrismaService).
function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

function isInvitationPurpose(value: string): value is InvitationPurpose {
  return value === 'invite';
}

function isInvitationStatus(value: string): value is InvitationStatus {
  return value === 'pending' || value === 'accepted' || value === 'revoked';
}

type InvitationRow = {
  id: string;
  email: string;
  tokenHash: string;
  purpose: string;
  status: string;
  expiresAt: Date;
  invitedByUserId: string;
  createdAt: Date;
};

@Injectable()
export class PrismaInvitationAdapter implements InvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toRecord(row: InvitationRow): InvitationRecord {
    if (!isInvitationPurpose(row.purpose) || !isInvitationStatus(row.status)) {
      throw new DomainException(
        'INTERNAL_ERROR',
        'Invalid invitation row in persistence',
        500,
      );
    }
    return {
      id: createInvitationId(row.id),
      email: row.email,
      tokenHash: row.tokenHash,
      purpose: row.purpose,
      status: row.status,
      expiresAt: row.expiresAt,
      invitedByUserId: createUserId(row.invitedByUserId),
      createdAt: row.createdAt,
    };
  }

  async createPending(input: CreateInvitationInput): Promise<InvitationRecord> {
    const row = await this.prisma.invitation.create({
      data: {
        id: input.id,
        email: input.email,
        tokenHash: input.tokenHash,
        purpose: input.purpose,
        status: 'pending',
        expiresAt: input.expiresAt,
        invitedByUserId: input.invitedByUserId,
      },
    });
    return this.toRecord(row);
  }

  async findPendingByEmail(email: string): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findFirst({
      where: { email, status: 'pending' },
    });
    return row ? this.toRecord(row) : null;
  }

  async listPending(): Promise<InvitationListRecord[]> {
    const rows = await this.prisma.invitation.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'asc' },
      include: { invitedBy: { select: { id: true, email: true } } },
    });
    return rows.map((row) => {
      const record = this.toRecord(row);
      return {
        id: record.id,
        email: record.email,
        status: record.status,
        expiresAt: record.expiresAt,
        createdAt: record.createdAt,
        invitedBy: {
          id: createUserId(row.invitedBy.id),
          email: row.invitedBy.email,
        },
      };
    });
  }

  async findById(
    id: InvitationRecord['id'],
  ): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findUnique({ where: { id } });
    return row ? this.toRecord(row) : null;
  }

  async findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findFirst({
      where: {
        tokenHash,
        status: 'pending',
        expiresAt: { gt: now },
      },
    });
    return row ? this.toRecord(row) : null;
  }

  async rotateToken(
    input: RotateInvitationTokenInput,
  ): Promise<InvitationRecord> {
    const row = await this.prisma.invitation.update({
      where: { id: input.id },
      data: { tokenHash: input.tokenHash, expiresAt: input.expiresAt },
    });
    return this.toRecord(row);
  }

  async revoke(id: InvitationRecord['id']): Promise<void> {
    await this.prisma.invitation.update({
      where: { id },
      data: { status: 'revoked' },
    });
  }

  async markAccepted(id: InvitationRecord['id']): Promise<void> {
    await this.prisma.invitation.update({
      where: { id },
      data: { status: 'accepted' },
    });
  }

  async acceptAndCreateUser(
    input: AcceptInviteAndCreateUserInput,
  ): Promise<AcceptInviteAndCreateUserResult> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const userRow = await tx.user.create({
          data: {
            id: input.userId,
            email: input.email,
            passwordHash: input.passwordHash,
            role: 'user',
            isActive: true,
          },
        });
        await tx.invitation.update({
          where: { id: input.invitationId },
          data: { status: 'accepted' },
        });
        if (!isUserRole(userRow.role)) {
          throw new DomainException(
            'INTERNAL_ERROR',
            'Invalid user role in persistence',
            500,
          );
        }
        const user: AuthUser = {
          id: createUserId(userRow.id),
          email: userRow.email,
          role: userRow.role,
          isActive: userRow.isActive,
          createdAt: userRow.createdAt,
          updatedAt: userRow.updatedAt,
        };
        return { ok: true, user };
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        return { ok: false, reason: 'email-taken' };
      }
      throw error;
    }
  }
}
```

Zakaz: `as InvitationId` / `as UserId` na wierszu Prisma — wyłącznie `createInvitationId` / `createUserId`. `findPendingByEmail` **bez** filtra `expiresAt` (wygasły pending też 409). `listPending` obejmuje wygasłe. `findPendingByHash` wymaga `status = pending` **oraz** `expiresAt > now`.

```typescript
// apps/api/src/auth/infrastructure/logging-mailer.adapter.ts
import { Injectable, Logger } from '@nestjs/common';
import type {
  TransactionalMailer,
  UserInvitedMail,
} from '../domain/transactional-mailer.port';

@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  async send(message: UserInvitedMail): Promise<void> {
    const text = `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`;
    this.logger.log(
      `user_invited to=${message.to} invitationId=${message.invitationId} ${text}`,
    );
  }
}
```

Adapter logujący: `send` **nigdy nie rzuca**. Rejestracja tylko gdy `NODE_ENV` ≠ `production` (DI w KROKU 2). Raw token w logu jest dozwolony wyłącznie poza `production` (`SPEC-BEZPIECZENSTWO.md` B-8).

```typescript
// apps/api/src/auth/infrastructure/nodemailer-smtp-mailer.adapter.ts
import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ENV, type Env } from '../../shared/config/env';
import type {
  TransactionalMailer,
  UserInvitedMail,
} from '../domain/transactional-mailer.port';

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

function readSmtpConfig(env: Env): SmtpConfig {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = env;
  if (
    SMTP_HOST === undefined ||
    SMTP_PORT === undefined ||
    SMTP_USER === undefined ||
    SMTP_PASS === undefined ||
    MAIL_FROM === undefined
  ) {
    throw new Error('SMTP configuration is incomplete');
  }
  return {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
  };
}

@Injectable()
export class NodemailerSmtpMailerAdapter implements TransactionalMailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(@Inject(ENV) env: Env) {
    const smtp = readSmtpConfig(env);
    this.from = smtp.from;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  async send(message: UserInvitedMail): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: 'You are invited',
      text: `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`,
    });
  }
}
```

Nodemailer wyłącznie w tym adapterze. Pad `sendMail` → wyjątek (łapany w `InviteUser` / `ResendInvitation` jako 503). Rejestracja gdy `NODE_ENV === 'production'` (DI w KROKU 2).

**Refaktor** `apps/api/src/shared/config/env.schema.ts` — `INVITE_TTL` default `'7d'`; `SMTP_*` / `MAIL_FROM` / `APP_PUBLIC_URL` wymagane gdy `NODE_ENV === 'production'` (`superRefine` jak `CORS_ORIGIN`).

teraz (pola JWT już są; brak zaproszeń / SMTP):

```typescript
    JWT_REFRESH_TTL: z.string().min(1).default('1d'),
    CORS_ORIGIN: z.string().min(1),
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
  })
  .superRefine((value, ctx) => {
    if (value.NODE_ENV === 'production' && value.CORS_ORIGIN.trim() === '*') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['CORS_ORIGIN'],
        message: 'CORS_ORIGIN cannot be * in production',
      });
    }
  });
```

zamień na:

```typescript
    JWT_REFRESH_TTL: z.string().min(1).default('1d'),
    CORS_ORIGIN: z.string().min(1),
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
    INVITE_TTL: z.string().min(1).default('7d'),
    APP_PUBLIC_URL: z.string().url().optional(),
    MAIL_FROM: z.string().min(1).optional(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASS: z.string().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.NODE_ENV === 'production' && value.CORS_ORIGIN.trim() === '*') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['CORS_ORIGIN'],
        message: 'CORS_ORIGIN cannot be * in production',
      });
    }
    if (value.NODE_ENV !== 'production') {
      return;
    }
    const required: Array<
      [string, string | number | undefined]
    > = [
      ['APP_PUBLIC_URL', value.APP_PUBLIC_URL],
      ['MAIL_FROM', value.MAIL_FROM],
      ['SMTP_HOST', value.SMTP_HOST],
      ['SMTP_PORT', value.SMTP_PORT],
      ['SMTP_USER', value.SMTP_USER],
      ['SMTP_PASS', value.SMTP_PASS],
    ];
    for (const [path, field] of required) {
      if (field === undefined || field === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [path],
          message: `${path} is required in production`,
        });
      }
    }
  });
```

**Refaktor** `apps/api/.env.example` — placeholdery (bez sekretów produkcyjnych):

teraz (fragment JWT / CORS; brak invite/SMTP):

```
JWT_SECRET="change-me-jwt-secret"
JWT_ACCESS_TTL="15m"
JWT_REFRESH_TTL="1d"
CORS_ORIGIN='http://localhost:3000'
```

zamień na:

```
JWT_SECRET="change-me-jwt-secret"
JWT_ACCESS_TTL="15m"
JWT_REFRESH_TTL="1d"
INVITE_TTL="7d"
APP_PUBLIC_URL=http://localhost:3000
MAIL_FROM="noreply@localhost"
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_USER="mail"
SMTP_PASS="change-me-smtp-pass"
CORS_ORIGIN='http://localhost:3000'
```

W `development` / `test` `SMTP_*` i `MAIL_FROM` nie są wymagane (adapter logujący). Wartości w example są placeholderami pod lokalny SMTP (np. Mailhog) — nie sekretami.

**Refaktor** `apps/api/src/shared/config/env.schema.spec.ts` — asercje defaultu i fail-fast:

```typescript
  it('defaults INVITE_TTL to 7d', () => {
    expect(validateEnv(valid).INVITE_TTL).toBe('7d');
  });

  it('does not require SMTP in development', () => {
    expect(() => validateEnv(valid)).not.toThrow();
  });

  it('requires SMTP, MAIL_FROM and APP_PUBLIC_URL in production', () => {
    expect(() =>
      validateEnv({ ...valid, NODE_ENV: 'production' }),
    ).toThrow();
  });

  it('parses production when invite SMTP fields are set', () => {
    const env = validateEnv({
      ...valid,
      NODE_ENV: 'production',
      APP_PUBLIC_URL: 'https://app.example.com',
      MAIL_FROM: 'noreply@example.com',
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_USER: 'mail',
      SMTP_PASS: 'change-me',
    });
    expect(env.INVITE_TTL).toBe('7d');
    expect(env.SMTP_HOST).toBe('smtp.example.com');
  });
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
- `@content-chain/shared` eksportuje `InvitationId`, `isInvitationId`, `createInvitationId` (`inv_<uuid>`); `invitation-repository.port.ts` i `transactional-mailer.port.ts` kompilują `import type { InvitationId, UserId } from '@content-chain/shared'`
- `newInvitationId()` w `apps/api/src/shared/http/new-ids.ts`; `InviteUserUseCase` woła `newInvitationId()`; adapter Prisma nie używa gołego `as InvitationId`
- Admin nie przekazuje `password`; `InviteUserUseCase` tworzy pending + mail (D15: 201 vs 503 + `details.id`); raw token nie w wyniku
- `ListInvitationsUseCase` zwraca wszystkie `pending` (w tym wygasłe), pola `id, email, createdAt, expiresAt, invitedBy`; bez `tokenHash`
- `ResendInvitationUseCase` rotuje token + send; brak / nie-pending → 404; pad SMTP → 503 + to samo `id`
- `RevokeInvitationUseCase`: `pending` → `revoked` (nie twardy DELETE); brak / nie-pending → 404
- `AcceptInviteUseCase`: walidacja tokenu i A-5 **przed** transakcją; `acceptAndCreateUser` = jedna transakcja Prisma (D16); bez `setAuthCookies`
- `PrismaInvitationAdapter` implementuje port (w tym D16 / P2002 → `{ ok: false, reason: 'email-taken' }`); `findPendingByEmail` bez filtra `expiresAt`
- `LoggingMailerAdapter.send` nigdy nie rzuca; `NodemailerSmtpMailerAdapter` = jedyne miejsce importu `nodemailer`
- `SoftDeleteUserUseCase` ustawia `isActive = false`; brak wiersza → 404
- `ListUsersUseCase` nie zwraca `passwordHash`
- Brak importu Prisma w use-case'ach
- Migracja `Invitation` + indeks SQL D17 w tym kroku
- `INVITE_TTL` default `7d`; w `production` fail-fast: `APP_PUBLIC_URL`, `MAIL_FROM`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

---

### KROK 2 — UsersController + InvitationsController + accept-invite + AuthModule.controllers update

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** HTTP powierzchnia listy i soft-delete kont (admin) **oraz** zaproszeń (admin) i publicznego accept-invite. Dodanie kontrolerów do `AuthModule`.  
Odwołanie: `docs/dokumentacja_komunikacji.md` Users + Invitations + accept-invite; `SPEC-AUTH.md` A-7 / A-7a–d, A-10.  
Refaktor względem: `UsersController.create` → `CreateUserUseCase`; DoD `POST /api/v1/users` (201) + hasło.

Kolejność handlerów analogiczna do dziś: `GET` lista → **mutacja dodawania (invitations + accept-invite)** → `DELETE` soft-delete.

**Artefakty (nowe pliki):**
- `apps/api/src/auth/users.controller.ts` — `GET /` + `DELETE :id` (bez `POST` create)
- `apps/api/src/auth/invitations.controller.ts` — list / create / resend / revoke
- `apps/api/src/auth/http/invite-user.dto.ts` — body `POST /invitations` (ścieżka jak Faza 1 na dysku: `auth/http/*.dto.ts`, nie `http/dto/`)
- `apps/api/src/auth/http/accept-invite.dto.ts` — body `POST /auth/accept-invite`

**Artefakty (refaktory):**
- `apps/api/src/auth/auth.controller.ts` — publiczny `POST /auth/accept-invite` (`@Public()`, 201, bez cookie)
- `apps/api/src/auth/auth.module.ts` — kontrolery Users/Invitations; providery use-case’ów **oraz** `PrismaInvitationAdapter` / `INVITATION_REPOSITORY` / `TRANSACTIONAL_MAILER` (factory po `NODE_ENV`) ze slota KROKU 1
- `apps/api/test/postman/auth.postman-collection.json` — foldery Invitations + Accept-invite (invite → token z logu api → accept → login; raw token **nie** w JSON admina)

**Implementacja:**

```typescript
// apps/api/src/auth/users.controller.ts
import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { ListUsersUseCase } from './application/list-users.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

@ApiTags('users')
@Controller('users')
@Roles('admin') // cały kontroler — tylko admin; JwtAuthGuard działa globalnie
export class UsersController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly softDelete: SoftDeleteUserUseCase,
  ) {}

  @Get()
  list() {
    return this.listUsers.execute();
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.softDelete.execute(id);
  }
}
```

```typescript
// apps/api/src/auth/http/invite-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

/** Cienka bramka HTTP. Kształt komendy — Zod w InviteUserUseCase; D18 bez trim/toLowerCase. */
export class InviteUserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;
}
```

```typescript
// apps/api/src/auth/http/accept-invite.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

/** Cienka bramka HTTP. Polityka haseł — domain (`validatePasswordPolicy`); kształt — Zod w AcceptInviteUseCase. */
export class AcceptInviteDto {
  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  token!: string;

  @ApiProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  password!: string;
}
```

Zmiana względem: szkic `InvitationsController.create` z `@Body() body: unknown`. Obowiązuje DTO class-validator jak Faza 1 / Krok 5 (`SPEC-KOMUNIKACJA.md` warstwa Controller). Use-case zostaje przy `execute(input: unknown)` — instancja DTO jest legalnym wejściem. Nieznany klucz w body → 400 (`ValidationPipe` `forbidNonWhitelisted`).

```typescript
// apps/api/src/auth/invitations.controller.ts
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
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUserContext } from '../shared/types/auth-user-context';
import { InviteUserDto } from './http/invite-user.dto';
import { InviteUserUseCase } from './application/invite-user.use-case';
import { ListInvitationsUseCase } from './application/list-invitations.use-case';
import { ResendInvitationUseCase } from './application/resend-invitation.use-case';
import { RevokeInvitationUseCase } from './application/revoke-invitation.use-case';

@ApiTags('invitations')
@Controller('invitations')
@Roles('admin')
export class InvitationsController {
  constructor(
    private readonly listInvitations: ListInvitationsUseCase,
    private readonly inviteUser: InviteUserUseCase,
    private readonly resendInvitation: ResendInvitationUseCase,
    private readonly revokeInvitation: RevokeInvitationUseCase,
  ) {}

  @Get()
  list() {
    return this.listInvitations.execute();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: InviteUserDto, @CurrentUser() user: AuthUserContext) {
    return this.inviteUser.execute(body, user.id);
  }

  @Post(':id/resend')
  @HttpCode(201)
  resend(@Param('id') id: string) {
    return this.resendInvitation.execute(id);
  }

  @Delete(':id')
  @HttpCode(200)
  revoke(@Param('id') id: string) {
    return this.revokeInvitation.execute(id);
  }
}
```

**Refaktor** `apps/api/src/auth/auth.controller.ts` — publiczny accept-invite. `@Public()` zostaje na `bootstrap-status`, `bootstrap-admin`, `login`, `refresh` **oraz** `accept-invite`. **Nie** wołać `setAuthCookies`.

teraz (constructor + brak handlera accept-invite):

```typescript
import { MeUseCase } from './application/me.use-case';
import { BootstrapAdminDto } from './http/bootstrap-admin.dto';
import { LoginDto } from './http/login.dto';
```

```typescript
  constructor(
    private readonly bootstrapStatus: BootstrapStatusUseCase,
    private readonly bootstrapAdmin: BootstrapAdminUseCase,
    private readonly login: LoginUseCase,
    private readonly logout: LogoutUseCase,
    private readonly refresh: RefreshUseCase,
    private readonly me: MeUseCase,
    @Inject(ENV) private readonly env: Env,
  ) {}
```

zamień na:

```typescript
import { MeUseCase } from './application/me.use-case';
import { AcceptInviteUseCase } from './application/accept-invite.use-case';
import { BootstrapAdminDto } from './http/bootstrap-admin.dto';
import { LoginDto } from './http/login.dto';
import { AcceptInviteDto } from './http/accept-invite.dto';
```

```typescript
  constructor(
    private readonly bootstrapStatus: BootstrapStatusUseCase,
    private readonly bootstrapAdmin: BootstrapAdminUseCase,
    private readonly login: LoginUseCase,
    private readonly logout: LogoutUseCase,
    private readonly refresh: RefreshUseCase,
    private readonly me: MeUseCase,
    private readonly acceptInvite: AcceptInviteUseCase,
    @Inject(ENV) private readonly env: Env,
  ) {}
```

Dopisz handler w sekcji tras publicznych (obok `login` / `refresh`; **przed** `logout` / `me`):

```typescript
  @Public()
  @Post('accept-invite')
  @HttpCode(201)
  async postAcceptInvite(@Body() body: AcceptInviteDto) {
    return this.acceptInvite.execute(body);
  }
```

**Refaktor** `apps/api/src/auth/auth.module.ts` — kontrolery + use-case’y KROKU 1 **oraz** adapter Invitation + factory mailera.

Zmiana względem: szkic providerów wyłącznie z use-case’ami (bez `INVITATION_REPOSITORY` / `TRANSACTIONAL_MAILER`). Factory **nie** rejestruje obu mailerów jako `providers` naraz — `NodemailerSmtpMailerAdapter` w konstruktorze wymaga SMTP; w `development` / `test` `new` na SMTP padłby na starcie. Tworzyć SMTP adapter **tylko** gdy `NODE_ENV === 'production'`.

teraz (fragment controllers i providers):

```typescript
  controllers: [AuthController],
  providers: [
    JwtCookieStrategy,
    PrismaUserAdapter,
    PrismaRefreshSessionAdapter,
    { provide: USER_REPOSITORY, useExisting: PrismaUserAdapter },
    {
      provide: REFRESH_SESSION_REPOSITORY,
      useExisting: PrismaRefreshSessionAdapter,
    },
    BootstrapStatusUseCase,
    BootstrapAdminUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    MeUseCase,
  ],
```

zamień na:

```typescript
import { UsersController } from './users.controller';
import { InvitationsController } from './invitations.controller';
import { PrismaInvitationAdapter } from './infrastructure/prisma-invitation.adapter';
import { LoggingMailerAdapter } from './infrastructure/logging-mailer.adapter';
import { NodemailerSmtpMailerAdapter } from './infrastructure/nodemailer-smtp-mailer.adapter';
import { INVITATION_REPOSITORY } from './domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from './domain/transactional-mailer.port';
import { ListUsersUseCase } from './application/list-users.use-case';
import { InviteUserUseCase } from './application/invite-user.use-case';
import { ListInvitationsUseCase } from './application/list-invitations.use-case';
import { ResendInvitationUseCase } from './application/resend-invitation.use-case';
import { RevokeInvitationUseCase } from './application/revoke-invitation.use-case';
import { AcceptInviteUseCase } from './application/accept-invite.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

  controllers: [AuthController, UsersController, InvitationsController],
  providers: [
    JwtCookieStrategy,
    PrismaUserAdapter,
    PrismaRefreshSessionAdapter,
    PrismaInvitationAdapter,
    { provide: USER_REPOSITORY, useExisting: PrismaUserAdapter },
    {
      provide: REFRESH_SESSION_REPOSITORY,
      useExisting: PrismaRefreshSessionAdapter,
    },
    { provide: INVITATION_REPOSITORY, useExisting: PrismaInvitationAdapter },
    {
      provide: TRANSACTIONAL_MAILER,
      inject: [ENV],
      useFactory: (env: Env): TransactionalMailer => {
        if (env.NODE_ENV === 'production') {
          return new NodemailerSmtpMailerAdapter(env);
        }
        return new LoggingMailerAdapter();
      },
    },
    BootstrapStatusUseCase,
    BootstrapAdminUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    MeUseCase,
    ListUsersUseCase,
    InviteUserUseCase,
    ListInvitationsUseCase,
    ResendInvitationUseCase,
    RevokeInvitationUseCase,
    AcceptInviteUseCase,
    SoftDeleteUserUseCase,
  ],
```

`NodemailerSmtpMailerAdapter` i `LoggingMailerAdapter` **nie** jako osobne `providers` (uniknąć podwójnego `new` SMTP w dev). `useFactory` woła `new` wybranej implementacji.

**Refaktor** `apps/api/test/postman/auth.postman-collection.json` — dopisać zmienne i foldery. Folder **Session** kończy się `logout` (czyści cookie) — Invitations **nie** mogą iść „po Session” bez ponownego loginu. Runner: **Unauthenticated → Bootstrap → Session → Invitations → Accept-invite**.

Zmienne kolekcji (dopisać obok `adminEmail` / `adminPassword`):

| key | value (placeholder) | uwaga |
|-----|---------------------|--------|
| `inviteEmail` | `user@example.com` | case-sensitive (D18) |
| `invitePassword` | `Password12!!` | spełnia A-5 |
| `inviteToken` | *(puste)* | operator wkleja raw token z **logu api** (adapter logujący); **nie** z JSON `POST /invitations` |
| `invitationId` | *(puste)* | ustawiane ze skryptu testu po 201 |

Folder **Invitations** (pierwszy request = `POST /auth/login` adminem — cookie jar po Session/logout jest pusty):

1. `POST /auth/login` — body `{ email: {{adminEmail}}, password: {{adminPassword}} }`; 200 + cookie.
2. `POST /invitations` — body `{ "email": "{{inviteEmail}}" }`; **201**; asercje: `id`, `email`, `expiresAt`; **brak** `token` / `rawToken` / `tokenHash` / `accessToken`. Test zapisuje `invitationId` z `body.id`.
3. `POST /invitations` (ten sam email) — **409** `CONFLICT`.
4. `GET /invitations` — 200; tablica `items`; jest wpis z `invitationId`; pola `id, email, createdAt, expiresAt, invitedBy`; brak hashu/tokenu.
5. `POST /invitations/:id/resend` — `{{invitationId}}`; **201**; to samo `id`; znowu brak tokenu w JSON (nowy token tylko w logu — zaktualizować `inviteToken` ręcznie przed Accept-invite).
6. `GET /api/v1/users` (jako admin) — 200; `items[].isActive` obecne; brak `passwordHash`.

Folder **Accept-invite** (prerequest: **wyczyść cookie jar** originu api — request **bez** sesji admina):

1. `POST /auth/accept-invite` — body `{ "token": "{{inviteToken}}", "password": "{{invitePassword}}" }`; **201** `{ user: { id, email, role } }` z `role === "user"`; **brak** `Set-Cookie` `cc_access` / `cc_refresh`; brak tokenów w JSON.
2. `POST /auth/accept-invite` (ten sam token) — **401** `UNAUTHORIZED`.
3. `POST /auth/login` nowym kontem — `{ email: {{inviteEmail}}, password: {{invitePassword}} }` → 200 + cookie.
4. `POST /invitations` jako `user` — **403** `FORBIDDEN`.
5. `GET /users` jako `user` — **403**.
6. `POST /auth/login` adminem, potem `DELETE /users/:id` (id z kroku accept) — 200 `{ ok: true }`; kolejne `POST /auth/login` tym `inviteEmail` → **401**.

Unauthenticated (dopisać do istniejącego folderu):

- `POST /invitations` bez cookie → **401**.
- `POST /auth/accept-invite` z tokenem `"nope"` → **401** (trasa publiczna; zły token, nie brak sesji).
- `POST /auth/accept-invite` z hasłem `"short"` i dowolnym tokenem → **400** `VALIDATION_FAILED` albo **401** jeśli token nieważny **pierwszy** (kolejność A-7b: najpierw token, potem A-5 — przy złym tokenie 401, pending bez zmian). Do negatywu hasła: użyć **ważnego** `inviteToken` w osobnym requestcie po utworzeniu zaproszenia, albo zaakceptować że ten case żyje w folderze Accept-invite przed happy-path (osobny invite).

Happy path Newman: `NODE_ENV=development` → adapter logujący → zawsze **201** na create/resend. Raw token: zmienna `inviteToken` (wklejka z stdout Pino `LoggingMailerAdapter`); **zakaz** zwracania tokenu w JSON „żeby Newman przeszedł”.

**DoD kroku:**
- `GET /api/v1/users` → lista z `isActive`; `user` → 403 `FORBIDDEN`
- brak `POST /users`; invitations: `user` → 403; drugi pending → 409; `GET` pending obejmuje wygasłe
- `POST /invitations` przyjmuje `InviteUserDto` (`email`); nieznany klucz → 400; raw token nie w JSON
- `POST /invitations` / resend: 201 gdy send OK; 503 + `details.id` gdy SMTP padł (`production`)
- `POST /auth/accept-invite` (`AcceptInviteDto`, `@Public()`) bez sesji → 201 `{ user }` **bez** Set-Cookie; 401 zużyty/wygasły; 409 gdy email zajęty; hasło poza A-5 → 400 (pending bez zmian)
- `DELETE /api/v1/users/:id` → soft-delete; nieznany id → 404; `user` → 403
- `AuthModule`: `INVITATION_REPOSITORY` + `TRANSACTIONAL_MAILER` (logging gdy `NODE_ENV` ≠ `production`; nodemailer tylko w `production`)
- `JwtAuthGuard` global + `RolesGuard` global egzekwują reguły bez `@UseGuards` w kontrolerze
- Postman: invite → token z logu → accept → login (happy path adapter logujący = 201)

---

### KROK 3 — `@Public()` na trasach otwartych + weryfikacja guardów w runs/company-context

**Status:** `NIE_ROZPOCZĘTY`

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

---

### KROK 4 — `startedBy` ze sesji: StartRunUseCase + RunsController

**Status:** `NIE_ROZPOCZĘTY`

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

---

## Weryfikacja wycinka (DoD FAZY 1 + 2)

- [ ] `POST /auth/bootstrap-admin` tworzy jedynego admina + sesję cookie; drugie wywołanie → 409
- [ ] `GET /auth/bootstrap-status` → `{ available: false }` po bootstrapie
- [ ] `POST /auth/login` → body bez tokenów; Set-Cookie `cc_access` + `cc_refresh`; konto inactive → 401
- [ ] `POST /auth/refresh` → rotacja refresh; nieważny token → 401
- [ ] `GET /auth/me` → `{ id, email, role }` przy ważnym `cc_access`; wygasły/brak → 401
- [ ] `POST /auth/logout` ze sesją → cookie wyczyszczone i unieważnienie refresh tego użytkownika; bez `cc_access` → 401
- [ ] Próba bootstrap z hasłem < 12 znaków / bez cyfry / bez wielkiej / bez znaku specjalnego → 400 `VALIDATION_FAILED`
- [ ] `POST /invitations` (admin, tylko email) → 201 `{ id, email, expiresAt }` (adapter logujący); `user` → 403; raw token nie w JSON
- [ ] `POST /auth/accept-invite` (publiczny) → 201 `{ user }`; bez Set-Cookie; potem `POST /auth/login`
- [ ] Drugi `POST /invitations` przy pending (także wygasłym) → 409; `GET /invitations` obejmuje wygasłe
- [ ] Pad SMTP (gdy dotyczy) → 503 `MAIL_DELIVERY_FAILED` + `details.id`
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
