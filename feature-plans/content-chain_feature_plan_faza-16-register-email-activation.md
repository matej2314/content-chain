# Content Chain — feature plan: rejestracja + aktywacja e-mail (Faza 16)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-16-register-email-activation.md`  
**Kotwica major:** Faza 16 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (+ `packages/shared` ID). Major nie zawiera kroków kodu.  
**Refaktor względem:** Faza 5 Auth (`WYKONANY`) — jedyna droga na `user` = invite → accept-invite; brak register / activate / resend.  
**Źródła kanonu (nie treść Fazy 5):** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/deployment.md`, `docs/dictionary.md`, `SPEC-AUTH.md` A-11…A-13 / A-1 / A-2 / A-7 / A-7b / A-10 / A-10a, `SPEC-BEZPIECZENSTWO.md` B-8, `SPEC-KOMUNIKACJA.md` K-2g…K-2i, `SPEC-PERSISTENCE.md` P-5 / D19, `SPEC-TESTY.md` D-41…D-46, major Faza 16.  
**Pass rozwojowy:** persistence/porty/mailer → ścieżki istniejące (verifiedAt) → register/activate/resend/HTTP → testy. Przesunięcia: (1) `User.create`+`verifiedAt` i port `AccountActivation` przed bootstrap/accept/soft-delete/login; (2) mailer `user_activation`+`ACTIVATION_TTL` przed Register/Resend; (3) soft rate-limit w KROK 4 FAZY 3; (4) login gate przed D-41/D-45.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta


| Pole                             | Wartość                                                                                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wycinek                          | Publiczny register + aktywacja e-mail (`verifiedAt`, `AccountActivation`, activate, resend) + login 401 pending + verifiedAt na list/reactivate/soft-delete                                                                                  |
| Major                            | Faza 16 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–15 (`WYKONANY`); **bez** MILESTONE 16                                                                                                              |
| Poza zakresem                    | UI FE (major FE Faza 12); `DEMO_MODE` / `guest`; confirm e-mail przy `PATCH /auth/me/email` (V1); Set-Cookie na register/activate/resend; drugi admin; edycja major/docs/SPEC; aktualizacja `docs/brand_types.md` (ID `act_` w shared — tak) |
| Po implementacji (informacyjnie) | Major: Faza 16 → `WYKONANY`. Brak `MILESTONE` 16. Faza 5 / MILESTONE 5 bez zmian historii. Edycja major **poza** tym skillem                                                                                                                 |


**Mapa major → ten plik**


| Major          | Feature  | Zakres                                                                       |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| Faza 16 (gate) | FAZA 1–4 | Persistence → ścieżki istniejące → register/activate/resend/HTTP → D-41…D-46 |


---

## Założenia

- Stack: NestJS 11, Prisma 6 (SQLite), Zod **4.4.x** (`z.email()`, `.strict()`, `parseWithZod`), bcrypt przez `auth.helpers`, TTL przez `parseTtlMs`.
- Register **zawsze** publiczny; **zawsze** `role = user`; **bez** bramki `DEMO_MODE`.
- Kolizja email na register → **409** `CONFLICT`, `message`: `Email already in use` (świadoma enumeracja UX). Soft-deleted email też **409** (reclaim tylko admin `PATCH`).
- Accept-invite kolizja nadal **401** (Faza 15) — **nie** mieszać z register.
- Prod: pending = `isActive=true` + `verifiedAt=null` + `AccountActivation`; login wspólny **401** `Invalid credentials`. Poza prod: `verifiedAt` od razu.
- Resend: zawsze **200** + `Wiadomość wysłana ponownie`; rate limit soft **5 / 15 min** / email; **bez** **503** na SMTP.
- Register SMTP fail → **503** `MAIL_DELIVERY_FAILED` + `details: [{ id: userId }]` — User pending **zostaje**.
- `GET /auth/me` **bez** `verifiedAt` (probe). `GET /users` + reactivate **z** `verifiedAt`.
- Typy: `input: unknown` + Zod; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)


| Temat                | Źródło                                            | Ustalenie                                                  | Decyzja w wycinku                                             |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| Zod body             | Context7 `/colinhacks/zod` (projekt `zod@^4.4.3`) | `z.email()`, `.strict()` / `strictObject`                  | Schematy jak `updateMeEmailSchema`: `.strict()` + `z.email()` |
| Prisma migracja      | Context7 `/prisma/web` + lokalne migracje         | ADD COLUMN + backfill SQL; nowa tabela + UNIQUE            | Jak `Invitation` / backfill `pipelineFinishedAt`              |
| Nest HTTP            | istniejący AuthController                         | `@Public()`, `@HttpCode`, bez Set-Cookie na tych trasach   | Wzorzec `postAcceptInvite`                                    |
| bcrypt / TTL / token | `auth.helpers.ts`                                 | `generateRefreshToken` + `hashRefreshToken` + `parseTtlMs` | Reuse; bez nowego crypto wrappera                             |


---

## FAZA 1 — Persistence, typy, env, mailer

Odpowiada major **Faza 16** (fundament HOW).

---

### KROK 1 — Prisma: `verifiedAt` + `AccountActivation` + backfill

**Status:** `WYKONANY`

**Cel:** Schema i migracja zgodne z `SPEC-PERSISTENCE.md` P-5 / D19 oraz `SPEC-AUTH.md` A-11…A-13. Backfill istniejących userów: `verifiedAt = createdAt`.

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma`
- Nowy: `apps/api/prisma/migrations/20261002120000_user_verified_at_account_activation/migration.sql` (timestamp dopasuj przy `prisma migrate`)

#### Refaktor — `schema.prisma` (`model User` + nowy model)

**teraz (fragment User):**

```prisma
model User {
  id              String           @id
  email           String           @unique
  passwordHash    String
  /// Unique index `User_one_admin` (role = 'admin') in SQL migration — SPEC-AUTH A-1. Prisma 6 cannot declare partial unique in schema.
  role            String
  isActive        Boolean          @default(true)
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  refreshSessions RefreshSession[]
  startedRuns     Run[]            @relation("RunStartedBy")
  invitations     Invitation[]
}
```

**zamień na:**

```prisma
model User {
  id                 String              @id
  email              String              @unique
  passwordHash       String
  /// Unique index `User_one_admin` (role = 'admin') in SQL migration — SPEC-AUTH A-1. Prisma 6 cannot declare partial unique in schema.
  role               String
  isActive           Boolean             @default(true)
  /// null = pending aktywacji (tylko production register). Soft-delete NIE czyści pola.
  verifiedAt         DateTime?
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
  refreshSessions    RefreshSession[]
  startedRuns        Run[]               @relation("RunStartedBy")
  invitations        Invitation[]
  accountActivations AccountActivation[]
}

model AccountActivation {
  id        String   @id
  userId    String   @unique
  tokenHash String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([expiresAt])
}
```

#### Nowy plik — `migration.sql` (treść migracji)

```sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN "verifiedAt" DATETIME;

-- Backfill: istniejące konta (bootstrap / accept-invite) traktuj jako zweryfikowane.
UPDATE "User" SET "verifiedAt" = "createdAt" WHERE "verifiedAt" IS NULL;

-- CreateTable
CREATE TABLE "AccountActivation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccountActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_userId_key" ON "AccountActivation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_tokenHash_key" ON "AccountActivation"("tokenHash");

-- CreateIndex
CREATE INDEX "AccountActivation_expiresAt_idx" ON "AccountActivation"("expiresAt");
```

**DoD kroku:**

- `npx prisma migrate` / generate przechodzi; `User.verifiedAt` i `AccountActivation` w kliencie.
- Po migracji istniejące wiersze User mają `verifiedAt` nie-null.

---

### KROK 2 — Porty / typy / adaptery (`verifiedAt`, `AccountActivation`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Domain + Prisma: `AuthUser.verifiedAt`, create z `verifiedAt`, `setVerifiedAt`, port aktywacji, branded `AccountActivationId` (`act_<uuid>`). `SPEC-AUTH.md`, `SPEC-PERSISTENCE.md`.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/ids.ts`
- Zmiana: `apps/api/src/shared/http/new-ids.ts`
- Zmiana: `apps/api/src/auth/domain/auth-user.types.ts`
- Zmiana: `apps/api/src/auth/domain/user-repository.port.ts`
- Zmiana: `apps/api/src/auth/infrastructure/prisma-user.adapter.ts`
- Zmiana: `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts` (`acceptAndCreateUser` + mapowanie `verifiedAt`)
- Nowy: `apps/api/src/auth/domain/account-activation-repository.port.ts`
- Nowy: `apps/api/src/auth/infrastructure/prisma-account-activation.adapter.ts`

#### Refaktor — `packages/shared/src/branded/ids.ts`

**Dopisz** (obok `InvitationId`):

```typescript
export type AccountActivationId = Brand<string, 'AccountActivationId'>;

const ACCOUNT_ACTIVATION_ID_RE = new RegExp(`^act_${UUID_PART}$`, 'i');

export const isAccountActivationId = (
  value: string,
): value is AccountActivationId => ACCOUNT_ACTIVATION_ID_RE.test(value);

export const createAccountActivationId = (
  value: string,
): AccountActivationId => {
  if (!isAccountActivationId(value)) {
    throw new Error('Invalid AccountActivationId');
  }
  return brand<AccountActivationId>(value);
};
```

#### Refaktor — `new-ids.ts`

**Dopisz:**

```typescript
import {
  // ...istniejące
  createAccountActivationId,
  type AccountActivationId,
} from '@content-chain/shared';

export const newAccountActivationId = (): AccountActivationId =>
  createAccountActivationId(`act_${uuidv4()}`);
```

#### Refaktor — `auth-user.types.ts`

**teraz:**

```typescript
export type AuthUser = {
  id: UserId;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserListItem = Pick<
  AuthUser,
  'id' | 'email' | 'role' | 'isActive' | 'createdAt'
>;
```

**zamień na:**

```typescript
export type AuthUser = {
  id: UserId;
  email: string;
  role: UserRole;
  isActive: boolean;
  /** null = pending aktywacji (prod register). Soft-delete nie czyści. */
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserListItem = Pick<
  AuthUser,
  'id' | 'email' | 'role' | 'isActive' | 'verifiedAt' | 'createdAt'
>;
```

#### Refaktor — `user-repository.port.ts`

**teraz (fragment create / CreateAdminIfNoneData):**

```typescript
export type CreateAdminIfNoneData = {
  id: UserId;
  email: string;
  passwordHash: string;
};

export interface UserRepository {
  // ...
  create(data: {
    id: UserId;
    email: string;
    passwordHash: string;
    role: UserRole;
  }): Promise<AuthUser>;
  // ...
}
```

**zamień na:**

```typescript
export type CreateAdminIfNoneData = {
  id: UserId;
  email: string;
  passwordHash: string;
};

export type CreateUserData = {
  id: UserId;
  email: string;
  passwordHash: string;
  role: UserRole;
  verifiedAt: Date | null;
};

export interface UserRepository {
  findForAuth(email: string): Promise<UserForAuth | null>;
  findById(id: UserId): Promise<AuthUser | null>;
  findAdminCount(): Promise<number>;
  create(data: CreateUserData): Promise<AuthUser>;
  createAdminIfNone(
    data: CreateAdminIfNoneData,
  ): Promise<CreateAdminIfNoneResult>;
  setActive(id: UserId, isActive: boolean): Promise<void>;
  setVerifiedAt(id: UserId, verifiedAt: Date): Promise<AuthUser>;
  list(): Promise<AuthUser[]>;
  updateEmail(id: UserId, email: string): Promise<AuthUser>;
}
```

#### Nowy plik — `account-activation-repository.port.ts`

```typescript
import type { AccountActivationId, UserId } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';
import type { CreateUserData } from './user-repository.port';

export const ACCOUNT_ACTIVATION_REPOSITORY = Symbol(
  'ACCOUNT_ACTIVATION_REPOSITORY',
);

export type AccountActivationRecord = {
  id: AccountActivationId;
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

export type CreatePendingUser = {
  user: CreateUserData & { verifiedAt: null };
  activation: {
    id: AccountActivationId;
    tokenHash: string;
    expiresAt: Date;
  };
};

export type RotateActivationTokenInput = {
  userId: UserId;
  tokenHash: string;
  expiresAt: Date;
};

export interface AccountActivationRepository {
  /** TX: User (pending) + AccountActivation. */
  createPendingUser(
    input: CreatePendingUser,
  ): Promise<AuthUser>;

  findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<AccountActivationRecord | null>;

  findValidByUserId(userId: UserId): Promise<AccountActivationRecord | null>;

  /** TX: set User.verifiedAt + delete all AccountActivation for user. */
  consumeAndVerify(
    userId: UserId,
    verifiedAt: Date,
  ): Promise<AuthUser>;

  rotateToken(input: RotateActivationTokenInput): Promise<AccountActivationRecord>;

  deleteByUserId(userId: UserId): Promise<void>;
}
```

#### Nowy plik — `prisma-account-activation.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import {
  createAccountActivationId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AccountActivationRecord,
  AccountActivationRepository,
  CreatePendingUser,
  RotateActivationTokenInput,
} from '../domain/account-activation-repository.port';
import type { UserId } from '@content-chain/shared';

type ActivationRow = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaAccountActivationAdapter
  implements AccountActivationRepository
{
  constructor(private readonly prisma: PrismaService) {}

  private toActivation(row: ActivationRow): AccountActivationRecord {
    return {
      id: createAccountActivationId(row.id),
      userId: createUserId(row.userId),
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    };
  }

  private toUser(row: UserRow): AuthUser {
    if (!isUserRole(row.role)) {
      throw new DomainException(
        'INTERNAL_ERROR',
        'Invalid user role in persistence',
        500,
      );
    }
    return {
      id: createUserId(row.id),
      email: row.email,
      role: row.role,
      isActive: row.isActive,
      verifiedAt: row.verifiedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async createPendingUser(
    input: CreatePendingUser,
  ): Promise<AuthUser> {
    return this.prisma.$transaction(async (tx) => {
      const userRow = await tx.user.create({
        data: {
          id: input.user.id,
          email: input.user.email,
          passwordHash: input.user.passwordHash,
          role: input.user.role,
          isActive: true,
          verifiedAt: null,
        },
      });
      await tx.accountActivation.create({
        data: {
          id: input.activation.id,
          userId: input.user.id,
          tokenHash: input.activation.tokenHash,
          expiresAt: input.activation.expiresAt,
        },
      });
      return this.toUser(userRow);
    });
  }

  async findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<AccountActivationRecord | null> {
    const row = await this.prisma.accountActivation.findFirst({
      where: { tokenHash, expiresAt: { gt: now } },
    });
    return row ? this.toActivation(row) : null;
  }

  async findValidByUserId(userId: UserId): Promise<AccountActivationRecord | null> {
    const row = await this.prisma.accountActivation.findUnique({
      where: { userId },
    });
    return row ? this.toActivation(row) : null;
  }

  async consumeAndVerify(userId: UserId, verifiedAt: Date): Promise<AuthUser> {
    return this.prisma.$transaction(async (tx) => {
      const userRow = await tx.user.update({
        where: { id: userId },
        data: { verifiedAt },
      });
      await tx.accountActivation.deleteMany({ where: { userId } });
      return this.toUser(userRow);
    });
  }

  async rotateToken(
    input: RotateActivationTokenInput,
  ): Promise<AccountActivationRecord> {
    const row = await this.prisma.accountActivation.update({
      where: { userId: input.userId },
      data: {
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      },
    });
    return this.toActivation(row);
  }

  async deleteByUserId(userId: UserId): Promise<void> {
    await this.prisma.accountActivation.deleteMany({ where: { userId } });
  }
}
```

#### Refaktor — `prisma-user.adapter.ts` (kluczowe fragmenty)

`**UserRow` + `toUser`:** dodaj `verifiedAt: Date | null` i mapuj do `AuthUser`.

`**create`:**

```typescript
async create(data: CreateUserData): Promise<AuthUser> {
  const row = await this.prisma.user.create({
    data: {
      id: data.id,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role,
      isActive: true,
      verifiedAt: data.verifiedAt,
    },
  });
  return this.toUser(row);
}
```

`**createAdminIfNone` — w `tx.user.create` dodaj `verifiedAt: new Date()`.**

**Dopisz:**

```typescript
async setVerifiedAt(id: UserId, verifiedAt: Date): Promise<AuthUser> {
  const row = await this.prisma.user.update({
    where: { id },
    data: { verifiedAt },
  });
  return this.toUser(row);
}
```

#### Refaktor — `prisma-invitation.adapter.ts` (`acceptAndCreateUser`)

W `tx.user.create` dodaj `verifiedAt: new Date()`. W obiekcie `AuthUser` mapuj `verifiedAt: userRow.verifiedAt`.

**DoD kroku:**

- Kompilacja typów: każde mapowanie `AuthUser` zawiera `verifiedAt`.
- Port aktywacji zarejestrowany w module w KROK 3 / FAZA 3 (wire przy HTTP) — adapter gotowy do DI.

---

### KROK 3 — Env `ACTIVATION_TTL` + mailer `user_activation`

**Status:** `WYKONANY`

**Cel:** `docs/deployment.md` — `ACTIVATION_TTL` default `7d`; kind maila `user_activation` z deep-linkiem `/?activationToken=`.

**Artefakty:**

- Zmiana: `apps/api/src/shared/config/env.schema.ts`
- Zmiana: `apps/api/src/shared/config/env.schema.spec.ts`
- Zmiana: `apps/api/src/auth/domain/transactional-mailer.port.ts`
- Zmiana: `apps/api/src/auth/infrastructure/logging-mailer.adapter.ts`
- Zmiana: `apps/api/src/auth/infrastructure/nodemailer-smtp-mailer.adapter.ts`

#### Refaktor — `env.schema.ts`

**Dopisz pole** obok `INVITE_TTL`:

```typescript
ACTIVATION_TTL: z.string().min(1).default('7d'),
```

#### Refaktor — `env.schema.spec.ts`

**Dopisz test:**

```typescript
it('defaults ACTIVATION_TTL to 7d', () => {
  expect(validateEnv(valid).ACTIVATION_TTL).toBe('7d');
});
```

#### Refaktor — `transactional-mailer.port.ts`

**teraz:**

```typescript
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

**zamień na:**

```typescript
import type { AccountActivationId, InvitationId } from '@content-chain/shared';

export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
};

export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
};

export type TransactionalMail = UserInvitedMail | UserActivationMail;

export interface TransactionalMailer {
  send(message: TransactionalMail): Promise<void>;
}
```

#### Refaktor — `logging-mailer.adapter.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import type {
  TransactionalMail,
  TransactionalMailer,
} from '../domain/transactional-mailer.port';

@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  send(message: TransactionalMail): Promise<void> {
    if (message.kind === 'user_invited') {
      const text = `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`;
      this.logger.log(
        `user_invited to=${message.to} invitationId=${message.invitationId} ${text}`,
      );
      return Promise.resolve();
    }
    const text = `Open: ${message.activateUrl}\nToken: ${message.rawToken}`;
    this.logger.log(
      `user_activation to=${message.to} activationId=${message.activationId} ${text}`,
    );
    return Promise.resolve();
  }
}
```

#### Refaktor — `nodemailer-smtp-mailer.adapter.ts` (`send`)

**zamień sygnaturę/ciało `send`:**

```typescript
async send(message: TransactionalMail): Promise<void> {
  if (message.kind === 'user_invited') {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: 'You are invited to join Content Chain App',
      text: `You are invited to join Content Chain App. Please click the link below to accept the invitation: ${message.acceptUrl}\nToken: ${message.rawToken}`,
    });
    return;
  }
  await this.transporter.sendMail({
    from: this.from,
    to: message.to,
    subject: 'Activate your Content Chain account',
    text: `Please activate your account: ${message.activateUrl}\nToken: ${message.rawToken}`,
  });
}
```

(Import `TransactionalMail` zamiast samego `UserInvitedMail`.)

**DoD kroku:**

- `validateEnv` defaultuje `ACTIVATION_TTL=7d`.
- Logging adapter w non-prod loguje `user_activation` z URL i raw tokenem.

#### Propozycja commit message

```text
feat(auth): add verifiedAt schema, AccountActivation, and activation mail

Foundation for open registration: marker + token table, ACTIVATION_TTL, and user_activation mail kind without changing HTTP surface yet.
```

---

## FAZA 2 — Ścieżki istniejące (`verifiedAt` + cleanup)

---

### KROK 1 — Bootstrap + accept-invite: `verifiedAt = now()`

**Status:** `WYKONANY`

**Cel:** `SPEC-AUTH.md` A-1 / A-7b — create admin / accept-invite ustawiają `verifiedAt`. Adaptery z FAZY 1 już to robią; upewnij unit mocki / typy CreateUserData jeśli ktoś woła `users.create` bez `verifiedAt`.

**Artefakty:**

- Zmiana (jeśli potrzeba): call-site’y `users.create` / mocki w `*.spec.ts` (bootstrap, accept-invite, invite specs).
- `createAdminIfNone` / `acceptAndCreateUser` — już z `verifiedAt: new Date()` z FAZY 1 KROK 2.

**DoD kroku:**

- Unit bootstrap / accept-invite kompilują się; happy path tworzy usera z nie-null `verifiedAt` (asercja w teście lub adapter).

---

### KROK 2 — Soft-delete usuwa `AccountActivation`; list + reactivate z `verifiedAt`

**Status:** `WYKONANY`

**Cel:** A-10 / A-10a / `docs/dokumentacja_komunikacji.md` — DELETE kasuje activation; GET/PATCH users zwracają `verifiedAt` (ISO lub `null` w JSON — serializacja Date → ISO w Nest).

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/soft-delete-user.use-case.ts`
- Zmiana: `apps/api/src/auth/application/list-users.use-case.ts`
- Zmiana: `apps/api/src/auth/application/reactivate-user.use-case.ts`
- Zmiana: odpowiadające `*.spec.ts`

#### Refaktor — `soft-delete-user.use-case.ts`

**teraz (constructor + końcówka):**

```typescript
constructor(
  @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  @Inject(REFRESH_SESSION_REPOSITORY)
  private readonly sessions: RefreshSessionRepository,
) {}
// ...
await this.users.setActive(userId, false);
await this.sessions.deleteByUser(userId);
return { ok: true };
```

**zamień na:**

```typescript
constructor(
  @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  @Inject(REFRESH_SESSION_REPOSITORY)
  private readonly sessions: RefreshSessionRepository,
  @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
  private readonly activations: AccountActivationRepository,
) {}
// ...
await this.users.setActive(userId, false);
await this.sessions.deleteByUser(userId);
await this.activations.deleteByUserId(userId);
return { ok: true };
```

(Import `ACCOUNT_ACTIVATION_REPOSITORY` / typ portu.)

#### Refaktor — `list-users.use-case.ts`

**zamień mapowanie na:**

```typescript
items: all.map(({ id, email, role, isActive, verifiedAt, createdAt }) => ({
  id,
  email,
  role,
  isActive,
  verifiedAt,
  createdAt,
})),
```

#### Refaktor — `reactivate-user.use-case.ts`

**zamień return:**

```typescript
return {
  id: user.id,
  email: user.email,
  role: user.role,
  isActive: true,
  verifiedAt: user.verifiedAt,
  createdAt: user.createdAt,
};
```

**Uwaga:** reaktywacja **nie** ustawia `verifiedAt` (A-10a).

**DoD kroku:**

- Soft-delete woła `deleteByUserId`.
- Projekcja list/reactivate zawiera `verifiedAt`.

---

### KROK 3 — Login: pending w production → wspólny 401

**Status:** `WYKONANY`

**Cel:** A-2 — w `NODE_ENV=production` odrzuć `verifiedAt == null` tym samym `UNAUTHORIZED` / `Invalid credentials` co złe hasło / soft-delete. **Bez** `ACCOUNT_NOT_ACTIVATED`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/login.use-case.ts`
- Zmiana: `apps/api/src/auth/application/login.use-case.spec.ts`

#### Refaktor — `login.use-case.ts`

**teraz:**

```typescript
const userForAuth = await this.users.findForAuth(command.email);
if (!userForAuth || !userForAuth.isActive) {
  throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
}

const validPass = await comparePassword(
  command.password,
  userForAuth.passwordHash,
);

if (!validPass) {
  throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
}
```

**zamień na:**

```typescript
const userForAuth = await this.users.findForAuth(command.email);
if (!userForAuth || !userForAuth.isActive) {
  throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
}

if (
  this.env.NODE_ENV === 'production' &&
  userForAuth.verifiedAt === null
) {
  throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
}

const validPass = await comparePassword(
  command.password,
  userForAuth.passwordHash,
);

if (!validPass) {
  throw new DomainException('UNAUTHORIZED', 'Invalid credentials', 401);
}
```

**DoD kroku:**

- Unit: prod + `verifiedAt: null` → 401 przed sukcesem; non-prod z `verifiedAt: null` **nie** blokuje (edge — poza A-11 non-prod i tak ustawia verifiedAt).
- Unit: soft-delete / złe hasło bez regresji.

#### Propozycja commit message

```text
feat(auth): wire verifiedAt into bootstrap, users list, and login

Existing account paths set or expose verification state; production login rejects pending accounts with the same 401 as bad credentials.
```

---

## FAZA 3 — Register / Activate / Resend + HTTP

---

### KROK 1 — Zod schemas register / activate / resend

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Application schemas `.strict()` — K-2g…K-2i / A-11…A-13. Polityka A-5 **poza** Zod (jak accept-invite).

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/auth.schemas.ts`

#### Refaktor — `auth.schemas.ts` (dopisz przed `patchUserSchema`)

```typescript
export const registerUserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1),
  })
  .strict();

export const activateAccountSchema = z
  .object({
    token: z.string().min(1),
  })
  .strict();

export const resendActivationSchema = z
  .object({
    email: z.email(),
  })
  .strict();

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type ActivateAccountInput = z.infer<typeof activateAccountSchema>;
export type ResendActivationInput = z.infer<typeof resendActivationSchema>;
```

**DoD kroku:** nieznane klucze → `VALIDATION_FAILED` przez `parseWithZod`.

---

### KROK 2 — `RegisterUserUseCase`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-11 — revoke pending Invitation; zawsze `role=user`; 201 z `verifiedAt`; prod pending+mail; kolizja 409; SMTP fail 503.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/register-user.use-case.ts`

#### Nowy plik — `register-user.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { UserId, UserRole } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newAccountActivationId, newUserId } from '../../shared/http/new-ids';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { ENV, type Env } from '../../shared/config/env';
import { generateRefreshToken, hashPassword, parseTtlMs } from './auth.helpers';
import { registerUserSchema } from './auth.schemas';

function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

export type RegisterUserResult = {
  user: {
    id: UserId;
    email: string;
    role: UserRole;
    verifiedAt: Date | null;
  };
};

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<RegisterUserResult> {
    const command = parseWithZod(registerUserSchema, input);

    const existing = await this.users.findForAuth(command.email);
    if (existing) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    validatePasswordPolicy(command.password);

    const pendingInvite = await this.invitations.findPendingByEmail(
      command.email,
    );
    if (pendingInvite) {
      await this.invitations.revoke(pendingInvite.id);
    }

    const passwordHash = await hashPassword(command.password);
    const userId = newUserId();
    const role: UserRole = 'user';
    const isProduction = this.env.NODE_ENV === 'production';

    let user;
    let rawToken: string | null = null;
    let activationId = null as ReturnType<typeof newAccountActivationId> | null;

    try {
      if (isProduction) {
        const { raw, hash } = generateRefreshToken();
        rawToken = raw;
        activationId = newAccountActivationId();
        user = await this.activations.createPendingUser({
          user: {
            id: userId,
            email: command.email,
            passwordHash,
            role,
            verifiedAt: null,
          },
          activation: {
            id: activationId,
            tokenHash: hash,
            expiresAt: new Date(
              Date.now() + parseTtlMs(this.env.ACTIVATION_TTL),
            ),
          },
        });
      } else {
        user = await this.users.create({
          id: userId,
          email: command.email,
          passwordHash,
          role,
          verifiedAt: new Date(),
        });
      }
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new DomainException('CONFLICT', 'Email already in use', 409);
      }
      throw error;
    }

    if (isProduction && rawToken && activationId) {
      try {
        await this.mailer.send({
          kind: 'user_activation',
          to: user.email,
          activationId,
          activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${rawToken}`,
          rawToken,
        });
      } catch {
        throw new DomainException(
          'MAIL_DELIVERY_FAILED',
          'Mail delivery failed',
          503,
          [{ id: user.id }],
        );
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        verifiedAt: user.verifiedAt,
      },
    };
  }
}
```

**DoD kroku:**

- Prod: User pending + activation + mail; brak Set-Cookie (HTTP w KROK 5).
- Kolizja / soft-deleted → 409, bez drugiego User.
- Pending Invitation → revoked przed create.

---

### KROK 3 — `ActivateAccountUseCase`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-12 — sukces 200 `{ user }` + `verifiedAt` + delete activation; zły token → wspólny 401; **bez** 409; **bez** Set-Cookie.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/activate-account.use-case.ts`

#### Nowy plik — `activate-account.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { UserId, UserRole } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import { hashRefreshToken } from './auth.helpers';
import { activateAccountSchema } from './auth.schemas';

export type ActivateAccountResult = {
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class ActivateAccountUseCase {
  constructor(
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
  ) {}

  async execute(input: unknown): Promise<ActivateAccountResult> {
    const command = parseWithZod(activateAccountSchema, input);
    const tokenHash = hashRefreshToken(command.token);
    const activation = await this.activations.findValidByTokenHash(
      tokenHash,
      new Date(),
    );
    if (!activation) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid activation token',
        401,
      );
    }

    const user = await this.activations.consumeAndVerify(
      activation.userId,
      new Date(),
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
```

**DoD kroku:** zużyty / wygasły / zły token → ten sam 401; sukces usuwa wiersze activation.

---

### KROK 4 — `ResendActivationUseCase` + soft rate limit 5/15 min

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-13 — zawsze 200 + stały message; mail+rotacja tylko przy pending; pad SMTP → nadal 200; rate limit soft.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/soft-email-rate-limiter.ts`
- Nowy: `apps/api/src/auth/application/resend-activation.use-case.ts`

#### Nowy plik — `soft-email-rate-limiter.ts`

```typescript
/**
 * Soft in-memory limiter (process-local). Over limit → caller no-ops mail
 * but still returns the same success HTTP (A-13).
 */
export class SoftEmailRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly maxHits: number,
    private readonly windowMs: number,
  ) {}

  /** true = under limit (hit recorded); false = over limit (no extra record). */
  tryConsume(key: string, now = Date.now()): boolean {
    const normalized = key.trim().toLowerCase();
    const windowStart = now - this.windowMs;
    const prev = this.hits.get(normalized) ?? [];
    const recent = prev.filter((t) => t > windowStart);
    if (recent.length >= this.maxHits) {
      this.hits.set(normalized, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(normalized, recent);
    return true;
  }
}
```

#### Nowy plik — `resend-activation.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { ENV, type Env } from '../../shared/config/env';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import { resendActivationSchema } from './auth.schemas';
import { SoftEmailRateLimiter } from './soft-email-rate-limiter';

export const RESEND_ACTIVATION_RATE_LIMITER = Symbol(
  'RESEND_ACTIVATION_RATE_LIMITER',
);

export type ResendActivationResult = {
  message: 'Wiadomość wysłana ponownie';
};

const SUCCESS: ResendActivationResult = {
  message: 'Wiadomość wysłana ponownie',
};

@Injectable()
export class ResendActivationUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
    @Inject(RESEND_ACTIVATION_RATE_LIMITER)
    private readonly rateLimiter: SoftEmailRateLimiter,
  ) {}

  async execute(input: unknown): Promise<ResendActivationResult> {
    // Zod fail → 400 VALIDATION_FAILED (nie maskować jako 200 — A-13 dotyczy stanu konta, nie kształtu body).
    const command = parseWithZod(resendActivationSchema, input);

    if (!this.rateLimiter.tryConsume(command.email)) {
      return SUCCESS;
    }

    const user = await this.users.findForAuth(command.email);
    if (!user || !user.isActive || user.verifiedAt !== null) {
      return SUCCESS;
    }

    const existing = await this.activations.findValidByUserId(user.id);
    if (!existing) {
      return SUCCESS;
    }

    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(
      Date.now() + parseTtlMs(this.env.ACTIVATION_TTL),
    );

    let activationId = existing.id;
    try {
      const rotated = await this.activations.rotateToken({
        userId: user.id,
        tokenHash: hash,
        expiresAt,
      });
      activationId = rotated.id;
    } catch {
      // Brak wiersza (race) → no-op sukcesu.
      return SUCCESS;
    }

    try {
      await this.mailer.send({
        kind: 'user_activation',
        to: user.email,
        activationId,
        activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${raw}`,
        rawToken: raw,
      });
    } catch {
      // A-13: bez 503 — stały sukces HTTP.
    }

    return SUCCESS;
  }
}
```

**DoD kroku:**

- pending → rotacja + mail (albo cichy fail SMTP).
- brak konta / aktywny / rate limit → ten sam SUCCESS.
- Zod fail → 400 (nie maskować walidacji jako 200).

---

### KROK 5 — `AuthController` + `AuthModule` (3 trasy `@Public`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** K-2g…K-2i — HTTP bez Set-Cookie; DI portów i rate limitera.

**Artefakty:**

- Zmiana: `apps/api/src/auth/auth.controller.ts`
- Zmiana: `apps/api/src/auth/auth.module.ts`

#### Refaktor — `auth.controller.ts` (dopisz DI + metody)

```typescript
import { RegisterUserUseCase } from './application/register-user.use-case';
import { ActivateAccountUseCase } from './application/activate-account.use-case';
import { ResendActivationUseCase } from './application/resend-activation.use-case';

// constructor — dopisz:
private readonly registerUser: RegisterUserUseCase,
private readonly activateAccount: ActivateAccountUseCase,
private readonly resendActivation: ResendActivationUseCase,

@Public()
@Post('register')
@HttpCode(201)
async postRegister(@Body() body: unknown) {
  return this.registerUser.execute(body);
}

@Public()
@Post('activate')
@HttpCode(200)
async postActivate(@Body() body: unknown) {
  return this.activateAccount.execute(body);
}

@Public()
@Post('resend-activation')
@HttpCode(200)
async postResendActivation(@Body() body: unknown) {
  return this.resendActivation.execute(body);
}
```

**Zakaz:** `setAuthCookies` na tych trzech metodach.

#### Refaktor — `auth.module.ts`

- Import / provider: `PrismaAccountActivationAdapter`, `{ provide: ACCOUNT_ACTIVATION_REPOSITORY, useExisting: PrismaAccountActivationAdapter }`.
- Providers: `RegisterUserUseCase`, `ActivateAccountUseCase`, `ResendActivationUseCase`.
- Rate limiter:

```typescript
{
  provide: RESEND_ACTIVATION_RATE_LIMITER,
  useFactory: (): SoftEmailRateLimiter =>
    new SoftEmailRateLimiter(5, 15 * 60 * 1000),
},
```

**DoD kroku:**

- Trzy trasy publiczne odpowiadają kontraktowi docs/SPEC.
- Soft-delete DI ma `ACCOUNT_ACTIVATION_REPOSITORY` (FAZA 2) — dopnij provider jeśli jeszcze nie.

#### Propozycja commit message

```text
feat(auth): add public register, activate, and resend-activation flows

Open self-registration creates pending users in production with email activation; resend stays non-enumerating with a soft rate limit.
```

---

## FAZA 4 — Testy D-41…D-46

---

### KROK 1 — Unit use-case specs

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `SPEC-TESTY.md` D-41…D-46 na warstwie use-case (adekwatnie); regresje invite/bootstrap/login.

**Artefakty:**

- Nowe: `register-user.use-case.spec.ts`, `activate-account.use-case.spec.ts`, `resend-activation.use-case.spec.ts`
- Zmiany: `login.use-case.spec.ts`, `soft-delete-user.use-case.spec.ts`, `bootstrap-admin.use-case.spec.ts`, `accept-invite.use-case.spec.ts`, `reactivate-user.use-case.spec.ts` (mocki `verifiedAt` / activation repo)

#### Minimalny zakres asercji


| Case        | Asercja                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D-41 (unit) | Register z `env.NODE_ENV=production` → user `verifiedAt=null`, `createPendingUser` + mail `user_activation`; login mock → 401; activate → `consumeAndVerify` |
| D-42        | Register non-prod → `users.create` z `verifiedAt` Date; **bez** activation/mail                                                                              |
| D-43        | `findForAuth` zwraca user (active lub `isActive:false`) → 409 `Email already in use`; brak create                                                            |
| D-44        | Resend: zawsze `{ message: 'Wiadomość wysłana ponownie' }`; mail tylko gdy pending+activation; SMTP throw → nadal SUCCESS; rate limit 6. wywołanie bez maila |
| D-45        | Activate zły hash → 401; login pending/prod → 401; złe hasło → ten sam message                                                                               |
| D-46        | Accept-invite / bootstrap ścieżki z `verifiedAt`; register role zawsze `user`; soft-delete woła `deleteByUserId`; revoke pending invite przed register       |


Wzorce mocków: jak `invite-user.use-case.spec.ts` / `resend-invitation.use-case.spec.ts` (`unusedMailer`, stałe env).

**DoD kroku:** `pnpm`/`npm` test dla wymienionych speców zielony.

---

### KROK 2 — e2e / Postman D-41…D-46

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pokrycie kontraktu HTTP w `auth.postman-collection.json` (+ e2e jeśli projekt ma warstwę e2e auth; inaczej Postman = primary jak D-23a / D-27).

**Artefakty:**

- Zmiana: `apps/api/test/postman/auth.postman-collection.json`
- Ewentualnie: `apps/api/test/postman/README.md` (kolejność folderów)
- Ewentualnie: e2e pod `apps/api/test/` jeśli istnieje wzorzec auth e2e — dopisz D-41…D-46 analogicznie do cancel/TTL

#### Minimalny zakres Postman (nowy folder **Register / activation**)

1. `POST /auth/register` happy (dev/test runner) → **201**, body z `verifiedAt` ISO, **brak** Set-Cookie `cc_access`.
2. Login tym kontem → **200** (non-prod).
3. `POST /auth/register` ten sam email → **409** `Email already in use`.
4. `POST /auth/activate` zły token → **401**.
5. `POST /auth/resend-activation` dowolny email → **200** + `Wiadomość wysłana ponownie`.
6. Regresja: accept-invite → login; GET `/users` pozycja ma `verifiedAt`.

**Nota prod (D-41):** pełny pending+activate na żywym SMTP zwykle poza Newmanem lokalnym — pokryj unit + opcjonalny e2e z `NODE_ENV=production` i mailerem-mockiem w DI testowym. W README: D-41 prod path = unit/e2e; Postman default = non-prod register.

**DoD kroku:**

- Folder Postman przechodzi na świeżym api (non-prod).
- Checklist D-41…D-46 w SPEC-TESTY uznana za pokrytą warstwą adekwatną.

#### Propozycja commit message

```text
test(auth): cover register, activate, and resend-activation (D-41–D-46)

Lock the verification contract with unit cases and Postman flows so pending login and collision semantics stay non-regressing.
```

---

## Weryfikacja wycinka


| Kryterium     | Jak sprawdzić                                                                                |
| ------------- | -------------------------------------------------------------------------------------------- |
| A-11 register | 201 + `verifiedAt`; zawsze `user`; revoke invite; 409 kolizja; 503 SMTP prod; bez cookie     |
| A-12 activate | 200 `{ user }`; delete activation; 401 wspólny; bez 409; bez cookie                          |
| A-13 resend   | zawsze 200 + stały message; soft 5/15; bez 503                                               |
| A-2 login     | prod pending = 401 `Invalid credentials`                                                     |
| A-1 / A-7b    | bootstrap + accept ustawiają `verifiedAt`                                                    |
| A-10          | soft-delete usuwa `AccountActivation`; nie czyści `verifiedAt`                               |
| P-5 / D19     | migracja + backfill; unikalne `userId`/`tokenHash`                                           |
| D-41…D-46     | unit + Postman/e2e                                                                           |
| Poza zakresem | brak zmian FE UI; brak Set-Cookie na 3 trasach; major/docs/SPEC nietknięte w tej sesji planu |


Zgodność: docs + SPEC wygrywają nad Faza 5 historyczną („jedyna droga = invite”).

---

## Ślad do major (informacyjnie — po implementacji)


| Pozycja                          | Po implementacji HOW                             |
| -------------------------------- | ------------------------------------------------ |
| Faza 16                          | `WYKONANY` (gate + ścieżka HOW w feature-planie) |
| MILESTONE 16                     | **brak** — nic nie oznaczać `OSIĄGNIĘTY`         |
| Faza 5 / 5.1 / 5.2 / MILESTONE 5 | bez zmian historii (`WYKONANY` / `OSIĄGNIĘTY`)   |


Aktualizacja statusów major: **poza** tym skillem (ręcznie / sesja `/feature-implementation` na życzenie).

---

## Nota sesji planu

- **Grandfathering docs:** `docs/README.md` bez frontmatteru — potwierdzone jako stara dokumentacja w tej sesji; frontmatteru nie dopisywano.
- Ten skill **nie** implementuje kodu i **nie** startuje `/feature-implementation`.
)

