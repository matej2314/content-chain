# Content Chain — feature plan: Auth self-service V1 (Faza 32)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-32-auth-self-service.md`  
**Kotwica major:** Faza 32 w `content-chain-backend_major_plan.md` (gate — HOW w tym pliku).  
**Refaktor względem:** Faza 10 / 13 (`PATCH /auth/me/email` MVP bez confirm), Faza 16 (`AccountActivation`), Faza 21 (`DeleteUserUseCase`), Faza 25+ (shell maili CID).  
**Źródła:** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/deployment.md`, `SPEC-AUTH.md` A-3a…A-3e / A-8, `SPEC-KOMUNIKACJA.md` K-2d, `SPEC-BEZPIECZENSTWO.md` B-8a, `SPEC-TESTY.md` D-27 / D-90…D-94.  
**Pass rozwojowy:** persistence → mail/env → confirm flow → password → delete own → HTTP; e2e/Postman w FAZIE 2. **Brak innych przesunięć.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Confirm e-mail (pending + mail), `PATCH /auth/me/password`, `DELETE /auth/me` |
| Major | Faza 32 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY`); **bez** MILESTONE 32 |
| Poza zakresem | FE Konto (major FE); dual-mode/i18n; forgot-password; self-delete `admin`; panel admin; edycja major/docs/SPEC w sesji implementacji (chyba że living edit poza tym planem) |
| Po implementacji (informacyjnie) | Major Faza 32 → `WYKONANY`. Brak `OSIĄGNIĘTY` (bez MILESTONE 32) |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 32 / 32.1–32.3 | FAZA 1 + FAZA 2 | Implementacja + unit równolegle; potem weryfikacja unitów + e2e/Postman |

---

## Założenia

- Stack: NestJS 11, Prisma (PostgreSQL), Zod 4.4.x (`parseWithZod`), bcrypt via `comparePassword` / `hashPassword`, istniejący shell maili CID.
- `EMAIL_CHANGE_TTL` default **`24h`** w `env.schema` (parser jak pozostałe TTL). `.env.example` może pinować równoważne `1d` — schema default = `24h` wg SPEC.
- Deep link: `{APP_PUBLIC_URL}/?emailChangeToken={raw}` — **nie** `activationToken`.
- Kind maila: `email_change_confirm` — szablon jak `user_activation` (shell + CID + `validityLabel`).
- Persistence: tabela **`EmailChangeRequest`** (osobny byt ≠ `AccountActivation`).
- `DeleteOwnAccountUseCase`: re-auth → `DeleteUserUseCase.execute(selfId, self, { purge })` + Clear-Cookie w kontrolerze.
- Soft/hard delete: dorzucić cleanup `EmailChangeRequest` obok `AccountActivation`.
- Unit testy **w tym samym kroku** co kod; FAZA 2 = przegląd unitów + e2e/Postman D-27 V1 + D-90…D-94.
- Typy: `input: unknown` + Zod; branded `EmailChangeRequestId` (`ecr_<uuid>`); zakaz `any`.

---

## Biblioteki / API

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| Zod `.strict()` / `z.email()` | jak istniejące `auth.schemas.ts` | repo + Zod 4.4.x |
| Prisma model + migrate | jak `AccountActivation` | repo |
| Nest `@Public` / `@AllowGuest` | jak logout / me / activate | repo |
| bcrypt / TTL | `auth.helpers` + `formatMailValidityLabel` | repo |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Auth self-service V1 (implementacja + unit równolegle)

Odpowiada major **Faza 32** (HOW). Unit w każdym `KROK`.

---

### KROK 1 — Persistence `EmailChangeRequest` + branded id

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Osobny byt pending confirm (A-3b); port + adapter + migracja. `SPEC-AUTH.md` A-3b, `SPEC-TESTY.md` D-27 / D-90.

**Artefakty:**

- Nowe: `packages/shared/src/branded/ids.ts` (dopisek), eksport z index
- Nowe: `apps/api/src/auth/domain/email-change-request.repository.port.ts`
- Nowe: `apps/api/src/auth/infrastructure/persistence/prisma-email-change-request.adapter.ts`
- Zmiana: `apps/api/prisma/schema.prisma` + migracja Prisma
- Nowe: `apps/api/src/auth/infrastructure/persistence/prisma-email-change-request.adapter.spec.ts` (lub unit portu z fake)

#### Shared — `EmailChangeRequestId`

W `packages/shared/src/branded/ids.ts` (wzorzec jak `AccountActivationId`):

```typescript
export type EmailChangeRequestId = Brand<string, 'EmailChangeRequestId'>;

const EMAIL_CHANGE_REQUEST_ID_RE = new RegExp(`^ecr_${UUID_PART}$`, 'i');

export const isEmailChangeRequestId = (
  value: string,
): value is EmailChangeRequestId => EMAIL_CHANGE_REQUEST_ID_RE.test(value);

export const createEmailChangeRequestId = (
  value: string,
): EmailChangeRequestId => {
  if (!isEmailChangeRequestId(value)) {
    throw new Error('Invalid EmailChangeRequestId');
  }
  return brand<EmailChangeRequestId>(value);
};
```

Eksport z `packages/shared` index jak pozostałe id.

#### Prisma — `schema.prisma`

**teraz (fragment `User`):**

```prisma
  accountActivation AccountActivation?
}
```

**zamień na:**

```prisma
  accountActivation   AccountActivation?
  emailChangeRequest  EmailChangeRequest?
}

model EmailChangeRequest {
  id           String   @id
  userId       String   @unique
  pendingEmail String
  tokenHash    String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([expiresAt])
  @@index([pendingEmail])
}
```

Migracja: `pnpm --filter api exec prisma migrate dev --name email_change_request` (nazwa wg konwencji repo).

#### Port — nowy plik

```typescript
// apps/api/src/auth/domain/email-change-request.repository.port.ts
import type { EmailChangeRequestId, UserId } from '@content-chain/shared';

export const EMAIL_CHANGE_REQUEST_REPOSITORY = Symbol(
  'EMAIL_CHANGE_REQUEST_REPOSITORY',
);

export type EmailChangeRequestRecord = {
  id: EmailChangeRequestId;
  userId: UserId;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

export type UpsertEmailChangeRequestInput = {
  id: EmailChangeRequestId;
  userId: UserId;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
};

export interface EmailChangeRequestRepository {
  upsertForUser(
    input: UpsertEmailChangeRequestInput,
  ): Promise<EmailChangeRequestRecord>;
  findByUserId(userId: UserId): Promise<EmailChangeRequestRecord | null>;
  findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<EmailChangeRequestRecord | null>;
  findByPendingEmail(
    pendingEmail: string,
  ): Promise<EmailChangeRequestRecord | null>;
  rotateToken(
    userId: UserId,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<EmailChangeRequestRecord>;
  consumeAndApplyEmail(
    userId: UserId,
    newEmail: string,
  ): Promise<{ id: UserId; email: string; role: string }>;
  deleteByUserId(userId: UserId): Promise<void>;
}
```

#### Adapter — nowy plik (kompletny)

```typescript
// apps/api/src/auth/infrastructure/persistence/prisma-email-change-request.adapter.ts
import { Injectable } from '@nestjs/common';
import {
  createEmailChangeRequestId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import type { UserId } from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
  UpsertEmailChangeRequestInput,
} from '../../domain/email-change-request.repository.port';

type Row = {
  id: string;
  userId: string;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

@Injectable()
export class PrismaEmailChangeRequestAdapter
  implements EmailChangeRequestRepository
{
  constructor(private readonly prisma: PrismaService) {}

  private toRecord(row: Row): EmailChangeRequestRecord {
    return {
      id: createEmailChangeRequestId(row.id),
      userId: createUserId(row.userId),
      pendingEmail: row.pendingEmail,
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    };
  }

  async upsertForUser(
    input: UpsertEmailChangeRequestInput,
  ): Promise<EmailChangeRequestRecord> {
    const row = await this.prisma.emailChangeRequest.upsert({
      where: { userId: input.userId },
      create: {
        id: input.id,
        userId: input.userId,
        pendingEmail: input.pendingEmail,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      },
      update: {
        pendingEmail: input.pendingEmail,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      },
    });
    return this.toRecord(row);
  }

  async findByUserId(
    userId: UserId,
  ): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findUnique({
      where: { userId },
    });
    return row ? this.toRecord(row) : null;
  }

  async findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findFirst({
      where: { tokenHash, expiresAt: { gt: now } },
    });
    return row ? this.toRecord(row) : null;
  }

  async findByPendingEmail(
    pendingEmail: string,
  ): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findFirst({
      where: { pendingEmail },
    });
    return row ? this.toRecord(row) : null;
  }

  async rotateToken(
    userId: UserId,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<EmailChangeRequestRecord> {
    const row = await this.prisma.emailChangeRequest.update({
      where: { userId },
      data: { tokenHash, expiresAt },
    });
    return this.toRecord(row);
  }

  async consumeAndApplyEmail(
    userId: UserId,
    newEmail: string,
  ): Promise<{ id: UserId; email: string; role: string }> {
    return this.prisma.$transaction(async (tx) => {
      const userRow = await tx.user.update({
        where: { id: userId },
        data: { email: newEmail },
      });
      await tx.emailChangeRequest.deleteMany({ where: { userId } });
      if (!isUserRole(userRow.role)) {
        throw new DomainException(
          'INTERNAL_ERROR',
          'Invalid user role in persistence',
          500,
        );
      }
      return {
        id: createUserId(userRow.id),
        email: userRow.email,
        role: userRow.role,
      };
    });
  }

  async deleteByUserId(userId: UserId): Promise<void> {
    await this.prisma.emailChangeRequest.deleteMany({ where: { userId } });
  }
}
```

#### Unit (równolegle)

- Adapter lub fake port: `upsertForUser` → `findByUserId`; `findValidByTokenHash` odrzuca wygasły; `consumeAndApplyEmail` zmienia email i kasuje pending.

**DoD kroku:** migracja aplikuje się na pustej PG; model w schema; port+adapter skompilowane; unit zielony; **nie** reuse `AccountActivation`.

---

### KROK 2 — Mail `email_change_confirm` + `EMAIL_CHANGE_TTL`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kind + szablon (shell PL/CID jak activation) + env default `24h` + deep link. `docs/deployment.md`, `SPEC-AUTH.md` A-8 / A-3b, D-91 unit renderer.

**Artefakty:**

- Zmiana: `env.schema.ts`, `transactional-mailer.port.ts`, `render-transactional-mail.ts`, `logging-mailer.adapter.ts`
- Nowe: `apps/api/src/auth/infrastructure/mail/templates/email-change-confirm.template.ts`
- Unit: `render-transactional-mail.spec.ts` (case confirm) + `env.schema.spec.ts` (default `24h`)

#### Env

**teraz:**

```typescript
    ACTIVATION_TTL: z.string().min(1).default('7d'),
    REVIEW_TTL: z.string().min(1).default('2h'),
```

**zamień na:**

```typescript
    ACTIVATION_TTL: z.string().min(1).default('7d'),
    EMAIL_CHANGE_TTL: z.string().min(1).default('24h'),
    REVIEW_TTL: z.string().min(1).default('2h'),
```

(`.env.example` już ma pin — jeśli `1d`, zostaw; schema default = `24h`.)

#### Port mailera

**teraz:**

```typescript
export type TransactionalMail =
| UserInvitedMail 
| UserActivationMail 
| UserWelcomeMail;
```

**zamień na** (dopisek typu + unia):

```typescript
export type EmailChangeConfirmMail = {
  kind: 'email_change_confirm';
  to: string;
  requestId: EmailChangeRequestId;
  confirmUrl: string;
  rawToken: string;
  validityLabel: string;
};

export type TransactionalMail =
  | UserInvitedMail
  | UserActivationMail
  | UserWelcomeMail
  | EmailChangeConfirmMail;
```

(`import type { EmailChangeRequestId }` z shared.)

#### Szablon — nowy plik (wzorzec `user-activation.template.ts`)

```typescript
// apps/api/src/auth/infrastructure/mail/templates/email-change-confirm.template.ts
import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import type { EmailChangeConfirmMail } from '../../../domain/transactional-mailer.port';
import type { RenderedMailParts } from './user-invited.template';

export function renderEmailChangeConfirmMail(
  message: EmailChangeConfirmMail,
): RenderedMailParts {
  const subject = 'Potwierdź nowy adres e-mail w Content Chain';
  const validity = escapeHtml(message.validityLabel);
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymaliśmy prośbę o zmianę adresu e-mail w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby potwierdzić <strong>nowy</strong> adres. Dopiero wtedy zastąpi on dotychczasowy.</p>
<p style="margin:0;">${validity}</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Potwierdzenie zmiany e-mail',
    bodyHtml,
    cta: {
      label: 'Potwierdź e-mail',
      href: message.confirmUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0;word-break:break-all;"><a href="${escapeHtml(message.confirmUrl)}" style="color:${MAIL_PALETTE.primary};">${escapeHtml(message.confirmUrl)}</a></p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Potwierdzenie zmiany e-mail',
    bodyLines: [
      'Otrzymaliśmy prośbę o zmianę adresu e-mail w Content Chain.',
      'Otwórz link poniżej, aby potwierdzić nowy adres. Dopiero wtedy zastąpi on dotychczasowy.',
      message.validityLabel,
    ],
    cta: {
      label: 'Potwierdź e-mail',
      href: message.confirmUrl,
    },
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
```

#### Renderer + logging

W `render-transactional-mail.ts` — case `'email_change_confirm': return renderEmailChangeConfirmMail(message);`

W `logging-mailer.adapter.ts` — case log jak activation (`Open: confirmUrl`, `Token: rawToken`).

#### Unit (równolegle)

- `validateEnv` bez `EMAIL_CHANGE_TTL` → default `24h`.
- Renderer: HTML ma `cid:` logo; plain text „Content Chain”; body zawiera `emailChangeToken`; `validityLabel` pełne zdanie; **bez** linii „Token (np. Postman)”.

**DoD kroku:** kind w unii; szablon na wspólnym shellu; env default `24h`; unit renderer + env zielone.

---

### KROK 3 — Confirm flow: UpdateMeEmail / Me / confirm / resend

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-3b V1 + A-3a `pendingEmail`. D-27 V1, D-90, D-91 (unit).

**Artefakty:**

- Zmiana: `update-me-email.use-case.ts`, `me.use-case.ts`
- Nowe: `confirm-email-change.use-case.ts`, `resend-email-change-confirm.use-case.ts`
- Unit: `*.use-case.spec.ts` dla czterech use-case’ów

#### `MeUseCase` — return + pending

**teraz:** zwraca `{ id, email, role }`.

**zamień na:** wstrzyknij `EMAIL_CHANGE_REQUEST_REPOSITORY`; po `findById`:

```typescript
const pending = await this.emailChanges.findByUserId(context.id);
return {
  id: user.id,
  email: user.email,
  role: user.role,
  pendingEmail: pending?.pendingEmail ?? null,
};
```

#### `UpdateMeEmailUseCase` — V1 pending + mail

Kolejność: Zod → `findForAuth` + active + id → `comparePassword` → same email → early return z `pendingEmail` → zajęty `User.email` **lub** cudzy `findByPendingEmail` → **409** → `upsertForUser` + `mailer.send({ kind: 'email_change_confirm', … })` → przy throw SMTP → **503** `MAIL_DELIVERY_FAILED` (pending zostaje) → **200** `{ id, email, role, pendingEmail }`.

Szkic kluczowej ścieżki (nowy ≠ obecny):

```typescript
const occupiedUser = await this.users.findForAuth(command.email);
if (occupiedUser) {
  throw new DomainException('CONFLICT', 'Email already in use', 409);
}
const occupiedPending = await this.emailChanges.findByPendingEmail(
  command.email,
);
if (occupiedPending && occupiedPending.userId !== context.id) {
  throw new DomainException('CONFLICT', 'Email already in use', 409);
}

const rawToken = generateRefreshToken();
const tokenHash = hashRefreshToken(rawToken);
const expiresAt = new Date(
  Date.now() + parseTtlMs(this.env.EMAIL_CHANGE_TTL),
);
const requestId = createEmailChangeRequestId(`ecr_${randomUUID()}`);
await this.emailChanges.upsertForUser({
  id: requestId,
  userId: context.id,
  pendingEmail: command.email,
  tokenHash,
  expiresAt,
});

const confirmUrl = `${this.env.APP_PUBLIC_URL ?? ''}/?emailChangeToken=${rawToken}`;
try {
  await this.mailer.send({
    kind: 'email_change_confirm',
    to: command.email,
    requestId,
    confirmUrl,
    rawToken,
    validityLabel: formatMailValidityLabel(this.env.EMAIL_CHANGE_TTL),
  });
} catch {
  throw new DomainException(
    'MAIL_DELIVERY_FAILED',
    'Failed to deliver confirmation email',
    503,
    { id: context.id },
  );
}

return {
  id: current.id,
  email: current.email,
  role: current.role,
  pendingEmail: command.email,
};
```

**Nie** wołać `users.updateEmail` na tej ścieżce.

#### `ConfirmEmailChangeUseCase` — nowy

```typescript
// apps/api/src/auth/application/confirm-email-change.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { hashRefreshToken } from './auth.helpers';
import { activateAccountSchema } from './auth.schemas'; // reuse { token } .strict() OR lokalny confirmEmailChangeSchema
import {
  EMAIL_CHANGE_REQUEST_REPOSITORY,
  type EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';

@Injectable()
export class ConfirmEmailChangeUseCase {
  constructor(
    @Inject(EMAIL_CHANGE_REQUEST_REPOSITORY)
    private readonly emailChanges: EmailChangeRequestRepository,
  ) {}

  async execute(
    input: unknown,
  ): Promise<{ id: string; email: string; role: string }> {
    const command = parseWithZod(activateAccountSchema, input); // lub confirmEmailChangeSchema = to samo
    const tokenHash = hashRefreshToken(command.token);
    const pending = await this.emailChanges.findValidByTokenHash(
      tokenHash,
      new Date(),
    );
    if (!pending) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid confirmation token',
        401,
      );
    }
    return this.emailChanges.consumeAndApplyEmail(
      pending.userId,
      pending.pendingEmail,
    );
  }
}
```

Preferuj **osobny** `confirmEmailChangeSchema = z.object({ token: z.string().min(1) }).strict()` w `auth.schemas.ts` (czytelność).

#### `ResendEmailChangeConfirmUseCase` — nowy

- Sesja wymagana (kontroler).
- Brak pending → **409**.
- `rotateToken` + mail na `pending.pendingEmail`; pad SMTP → **503**.
- **Bez** anti-enumeration jak resend-activation (tu zalogowany).

#### Unit (równolegle)

- UpdateMeEmail: pending + brak zmiany `User.email`; same email; `INVALID_PASSWORD`; conflict User/pending; SMTP fail → 503.
- Me: `pendingEmail` null vs string.
- Confirm: happy; zły token 401; sesja nie ustawiana w use-case.
- Resend: 409 bez pending; rotate + send.

**DoD kroku:** unit zielone dla D-27 V1 / D-90 / D-91 na warstwie application; brak `AccountActivation` na confirm.

---

### KROK 4 — `PATCH /auth/me/password`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-3d. D-92 (unit).

**Artefakty:**

- Zmiana: `user-repository.port.ts` + `prisma-user.adapter.ts` (`updatePassword`)
- Nowe: `change-me-password.use-case.ts` + spec
- Schema: `changeMePasswordSchema`

```typescript
export const changeMePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1),
  })
  .strict();
```

Use-case:

1. `parseWithZod`
2. `findForAuth(context.email)` + active + id
3. `comparePassword(currentPassword)` → else `INVALID_PASSWORD`
4. `validatePasswordPolicy(newPassword)`
5. `hashPassword(newPassword)` → `users.updatePassword`
6. `sessions.deleteByUser(context.id)`
7. return `{ ok: true }` — Clear-Cookie w kontrolerze

Port:

```typescript
updatePassword(id: UserId, passwordHash: string): Promise<void>;
```

#### Unit

- Sukces → `updatePassword` + `deleteByUser` wywołane.
- Złe current → `INVALID_PASSWORD`, **bez** `deleteByUser`.
- Słabe new → `VALIDATION_FAILED`.

**DoD kroku:** unit D-92 na application; wszystkie refresh unieważnione w happy path.

---

### KROK 5 — `DELETE /auth/me`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** A-3e. D-93 (unit). Reuse `DeleteUserUseCase`.

**Artefakty:**

- Nowe: `delete-own-account.use-case.ts` + spec
- Zmiana: `delete-user.use-case.ts` — cleanup `EmailChangeRequest` w soft/hard
- Schema: `deleteOwnAccountSchema = z.object({ currentPassword: z.string().min(1) }).strict()`

```typescript
@Injectable()
export class DeleteOwnAccountUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
    options: { purge: boolean },
  ): Promise<{ ok: true }> {
    const command = parseWithZod(deleteOwnAccountSchema, input);
    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }
    const ok = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!ok) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }
    // admin → 403 inside DeleteUserUseCase (target.role === admin)
    return this.deleteUser.execute(context.id, context, options);
  }
}
```

#### Refaktor `DeleteUserUseCase` — cleanup email-change

W soft tx i hard tx (obok `accountActivation.deleteMany`):

```typescript
await tx.emailChangeRequest.deleteMany({ where: { userId } });
```

(albo `emailChanges.deleteByUserId` poza tx jeśli brak tx API — preferuj w tej samej tx Prisma jak activation).

#### Unit

- user soft → woła deleteUser; admin → 403; złe hasło → INVALID_PASSWORD bez delete; guest live bez purge → GUEST_HAS_ACTIVE_RUN (przez deleteUser).

**DoD kroku:** unit D-93; Users DELETE kontrakt nietknięty poza cleanup pending.

---

### KROK 6 — HTTP controller + AuthModule wiring

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Trasy K-2d; GuestGuard tabela ról. Unit `auth.controller.spec.ts` rozszerzony.

**Artefakty:** `auth.controller.ts`, `auth.module.ts`, ewent. cienkie DTO class-validator jeśli repo tak robi dla body — **preferuj** `unknown` + Zod w use-case jak `patchMeEmail`.

#### Controller — dopiski

```typescript
  @Public()
  @Post('confirm-email-change')
  @HttpCode(200)
  postConfirmEmailChange(@Body() body: unknown) {
    return this.confirmEmailChange.execute(body);
  }

  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Post('me/email/resend-confirm')
  @HttpCode(200)
  postResendEmailChangeConfirm(@CurrentUser() user: AuthUserContext) {
    return this.resendEmailChangeConfirm.execute(user);
  }

  @AllowGuest()
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Patch('me/password')
  @HttpCode(200)
  async patchMePassword(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.changeMePassword.execute(user, body);
    clearAuthCookies(res, this.env);
    return result;
  }

  @AllowGuest()
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Delete('me')
  @HttpCode(200)
  async deleteMe(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
    @Query('purge') purge: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.deleteOwnAccount.execute(user, body, {
      purge: purge === 'true',
    });
    clearAuthCookies(res, this.env);
    return result;
  }
```

Import `Delete` z `@nestjs/common`.  
`PATCH me/email` **bez** `@AllowGuest` (guest → 403 / D-56).  
Password + delete **z** `@AllowGuest`.

#### Module

- Provider: `PrismaEmailChangeRequestAdapter` + `{ provide: EMAIL_CHANGE_REQUEST_REPOSITORY, useExisting: … }`
- Use-case’y: Confirm, Resend, ChangePassword, DeleteOwn
- Inject do `UpdateMeEmail` / `Me` nowych zależności

#### Unit controllera

- password sukces → `clearAuthCookies` wywołane
- delete sukces → clear
- confirm **bez** set/clear cookies
- patch email nadal bez AllowGuest

**DoD kroku:** wiring kompiluje się; unit controllera zielony; trasy zgodne z K-2d.

---

#### Propozycja commit message

```text
feat(auth): add email-change confirm, password change, and self-delete

Pending confirm uses a dedicated EmailChangeRequest and EMAIL_CHANGE_TTL (24h);
password and delete-own clear cookies and reuse existing delete semantics.
```

---

## FAZA 2 — Weryfikacja unitów + e2e + Postman

Domknięcie DoD testowego wycinka (D-27 V1, D-90…D-94) na warstwie e2e/Postman + przegląd unitów z FAZY 1.

---

### KROK 1 — Przegląd i poprawa unitów FAZY 1

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wszystkie unit z FAZY 1 zielone i zgodne z D-27 V1 + D-90…D-94 (warstwa application/renderer).

**Artefakty:** poprawki wyłącznie w `*.spec.ts` / drobne fixy pod testy — bez nowych tras.

**DoD kroku:** `pnpm` Jest unit auth (wskazany filtr) zielony; brak faili renderer/env/use-case z FAZY 1.

---

### KROK 2 — E2E / Postman D-27 V1 + D-90…D-94 + regresja

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** T-5 / kolekcja auth: przebudowa folderu Own email (D-27) na V1; nowe requesty confirm/resend/password/delete-own; regresja activate (D-41…D-46), guest email 403 (D-56), Users DELETE (D-63…D-66).

**Artefakty:**

- Zmiana: `apps/api/test/postman/auth.postman-collection.json` (lub równoważna ścieżka)
- Opcjonalnie: `*.e2e-spec.ts` jeśli repo tak pokrywa auth

**Scenariusze (minimum):**

| ID | Asercja |
|----|---------|
| D-27 | PATCH email → pendingEmail; `User.email` stary; INVALID_PASSWORD; 409 zajęty |
| D-90 | confirm token z logu/`emailChangeToken` → nowy email; bez Set-Cookie |
| D-91 | zły token 401; resend bez pending 409; (SMTP 503 — gdy da się stubować) |
| D-92 | password → Clear-Cookie; złe current → INVALID_PASSWORD z żywą sesją |
| D-93 | delete user soft + clear; admin 403; guest live bez purge → GUEST_HAS_ACTIVE_RUN |
| D-94 | activate URL nadal `activationToken`; Users DELETE bez regresji; guest PATCH email 403 |

DX tokenu confirm: adapter logujący (Open URL + Token) jak activation.

**DoD kroku:** Postman/e2e pokrywa tabelę; regresja activate/Users zielona.

---

#### Propozycja commit message

```text
test(auth): cover self-service confirm, password, and delete-own flows

Align D-27 with pending email confirm and add Postman/e2e cases for D-90–D-94.
```

---

## Weryfikacja wycinka

- [ ] A-3a `pendingEmail` na `GET /me`
- [ ] A-3b V1 pending + `email_change_confirm` + `/?emailChangeToken=` + `EMAIL_CHANGE_TTL` default 24h + 503 SMTP
- [ ] A-3d password + Clear-Cookie + delete wszystkich refresh
- [ ] A-3e delete own soft/hard/purge + admin 403 + Clear-Cookie
- [ ] Brak reuse `AccountActivation`
- [ ] Unit równolegle w FAZIE 1; FAZA 2 = przegląd + e2e/Postman
- [ ] Zgodność `docs/` + `SPEC-AUTH` / `SPEC-TESTY` / `SPEC-KOMUNIKACJA` K-2d
- [ ] Nagłówki wyłącznie `FAZA` / `KROK`; commit message EN na końcu każdej fazy

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 32 | `WYKONANY` |
| Kroki 32.1–32.3 | `WYKONANY` |
| MILESTONE 32 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy 10 / 13 / 16 / 21 / 25+ | bez zmian historii |

Edycja major **poza** tym skillem (ręcznie / `/feature-implementation` gdy użytkownik każe).
