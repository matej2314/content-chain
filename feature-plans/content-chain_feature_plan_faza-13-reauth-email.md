# Content Chain — feature plan: re-auth hasłem przy zmianie własnego emaila (Faza 13)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-13-reauth-email.md`  
**Kotwica major:** Faza 13 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 10 / Krok 10.2 (`WYKONANY`) — `PATCH /auth/me` `{ email }` bez weryfikacji hasła.  
**Źródła kanonu (nie treść 10.2):** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-AUTH.md` A-3b, `SPEC-KOMUNIKACJA.md` K-2d, `SPEC-BEZPIECZENSTWO.md` B-8a, `SPEC-TESTY.md` D-27, major Faza 13.  
**Pass rozwojowy:** schema → re-auth → mutacja → HTTP → testy. **Brak innych przesunięć.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Re-auth przy zmianie własnego emaila: `PATCH /auth/me/email` + `{ email, currentPassword }` + `INVALID_PASSWORD` |
| Major | Faza 13 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–12 (`WYKONANY`); **bez** MILESTONE 13 |
| Poza zakresem | FE / modal Konta (major FE Faza 9); confirm e-mail (V1); zmiana hasła zalogowanego; rotacja sesji przy A-3b; `PATCH /users/:id` z `email`; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major: Faza 13 → `WYKONANY`. Brak `MILESTONE` 13. MILESTONE 5/6 / Faza 10.2 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 13 (gate) | FAZA 1 / KROK 1–5 | Schema → re-auth → mutacja → HTTP → unit + Postman D-27 |

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Zod **4.4.x** w application (`parseWithZod`), bcrypt przez istniejące `comparePassword` (`auth.helpers.ts`).
- Kolejność use-case (A-3b): Zod → bcrypt compare `currentPassword` (jak login A-2, **bez** polityki A-5) → dopiero potem no-op / 409 / `updateEmail`.
- Złe hasło → **401** `INVALID_PASSWORD`, `message`: `Invalid password` — **nie** `UNAUTHORIZED`, **nie** loginowe `Invalid credentials`.
- Ten sam email + poprawne hasło → **200** bez `updateEmail` (re-auth obowiązkowy).
- **409** `CONFLICT` (zajęty / soft-deleted) **tylko po** udanym re-auth — złe hasło przy zajętym adresie → nadal `INVALID_PASSWORD`, email w DB bez zmiany.
- `GET /auth/me` = probe; **brak** mutacji na `PATCH /auth/me` (trasa usunięta).
- Sesja cookie **bez** rotacji z powodu A-3b.
- Port: hasło z `UserRepository.findForAuth(email)` (`UserForAuth.passwordHash`) — bez rozszerzania portu o `findById`+hash.
- Typy: `input: unknown` + Zod; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- FE woła jeszcze historyczne `PATCH /auth/me` — poza tym wycinkiem (major FE Faza 9).

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/colinhacks/zod/v4.0.1` (`.strict()`, `z.string().min`, `z.string().email`). Wersja w projekcie: `apps/api` → `zod@^4.4.3`.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|------------------|
| Body HTTP | `safeParse` + issues → `VALIDATION_FAILED` | Istniejący `parseWithZod` |
| Email | `z.string().email()` | Spójnie z `loginSchema` / historycznym A-3b |
| `currentPassword` | `z.string().min(1)` — niepuste; **bez** A-5 | Jak `loginSchema.password` |
| `.strict()` | odrzuca nieznane klucze | Body `{ email, currentPassword }.strict()` |
| bcrypt | `comparePassword` z `auth.helpers.ts` | Bez nowego wrappera; bez `assertPasswordPolicy` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Re-auth hasłem przy zmianie własnego emaila

Odpowiada major **Faza 13** (implementacja HOW). Jedna faza w tym zestawie.

---

### KROK 1 — Schema Zod `{ email, currentPassword }`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wspólny schemat application dla A-3b w `auth.schemas.ts` (`.strict()`, `currentPassword` niepusty, bez A-5). `SPEC-AUTH.md` A-3b, `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/auth.schemas.ts`

#### Refaktor — `auth.schemas.ts`

**teraz:**

```typescript
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const patchUserSchema = z
  .object({
    isActive: z.literal(true),
  })
  .strict();

export type BootstrapAdminInput = z.infer<typeof bootstrapAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PatchUserCommand = z.infer<typeof patchUserSchema>;
```

**zamień na:**

```typescript
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/** A-3b — re-auth + zmiana własnego emaila. Bez polityki A-5 na `currentPassword`. */
export const updateMeEmailSchema = z
  .object({
    email: z.string().email(),
    currentPassword: z.string().min(1),
  })
  .strict();

export const patchUserSchema = z
  .object({
    isActive: z.literal(true),
  })
  .strict();

export type BootstrapAdminInput = z.infer<typeof bootstrapAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateMeEmailInput = z.infer<typeof updateMeEmailSchema>;
export type PatchUserCommand = z.infer<typeof patchUserSchema>;
```

**DoD kroku:**

- `updateMeEmailSchema` eksportowany; brak `currentPassword` / pusty string / extra key → fail Zod (później `VALIDATION_FAILED` przez `parseWithZod`).
- Brak wywołania polityki haseł A-5 w schemacie.

---

### KROK 2 — `UpdateMeEmailUseCase`: re-auth

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po Zod: załadować użytkownika sesji z hashem (`findForAuth(context.email)`), zweryfikować `comparePassword` jak login — **bez** A-5. Złe hasło → `INVALID_PASSWORD`. Brak / nieaktywny / mismatch id → `UNAUTHORIZED`. Mutacja emaila **jeszcze nie** — po udanym re-auth zwracamy bieżącą tożsamość (intermediate pod KROK 3). `SPEC-AUTH.md` A-3b, `SPEC-BEZPIECZENSTWO.md` B-8a, `docs/security.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/update-me-email.use-case.ts`

#### Refaktor — `update-me-email.use-case.ts` (stan po KROK 2)

**teraz:** (historyczny Faza 10.2 — Zod tylko `{ email }`, `findById`, brak hasła)

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';

const updateEmailSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateEmailSchema, input);

    const current = await this.users.findById(context.id);
    if (!current || !current.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    if (current.email === command.email) {
      return {
        id: current.id,
        email: current.email,
        role: current.role,
      };
    }

    const occupied = await this.users.findForAuth(command.email);
    if (occupied) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const updated = await this.users.updateEmail(context.id, command.email);
    return {
      id: updated.id,
      email: updated.email,
      role: updated.role,
    };
  }
}
```

**zamień na:**

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';
import { comparePassword } from './auth.helpers';
import { updateMeEmailSchema } from './auth.schemas';

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateMeEmailSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const validPass = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!validPass) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    // KROK 3: mutacja emaila (no-op / 409 / updateEmail) — po udanym re-auth.
    return {
      id: current.id,
      email: current.email,
      role: current.role,
    };
  }
}
```

**DoD kroku:**

- Złe `currentPassword` → `DomainException` `{ code: 'INVALID_PASSWORD', message: 'Invalid password', httpStatus: 401 }`; **bez** `updateEmail`.
- Brak / pusty `currentPassword` / zły kształt → `VALIDATION_FAILED` (400) zanim pojawi się bcrypt.
- Brak A-5 na `currentPassword`.
- Po poprawnym haśle (jeszcze bez KROK 3) odpowiedź niesie **bieżący** email z DB (mutacja w KROK 3).

---

### KROK 3 — `UpdateMeEmailUseCase`: mutacja dopiero po re-auth

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po udanym re-auth: ten sam email → **200** bez UPDATE; zajęty (w tym soft-deleted) → **409**; inaczej `updateEmail`. Złe hasło **nadal** wygrywa nad 409 (kolejność z KROK 2). `SPEC-AUTH.md` A-3b, `SPEC-TESTY.md` D-27.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/update-me-email.use-case.ts`

#### Refaktor — blok po udanym `comparePassword`

**teraz:** (koniec KROK 2)

```typescript
    if (!validPass) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    // KROK 3: mutacja emaila (no-op / 409 / updateEmail) — po udanym re-auth.
    return {
      id: current.id,
      email: current.email,
      role: current.role,
    };
  }
}
```

**zamień na:**

```typescript
    if (!validPass) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    if (current.email === command.email) {
      return {
        id: current.id,
        email: current.email,
        role: current.role,
      };
    }

    const occupied = await this.users.findForAuth(command.email);
    if (occupied) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const updated = await this.users.updateEmail(context.id, command.email);
    return {
      id: updated.id,
      email: updated.email,
      role: updated.role,
    };
  }
}
```

**Kompletny plik po KROK 3** (docelowy):

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';
import { comparePassword } from './auth.helpers';
import { updateMeEmailSchema } from './auth.schemas';

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateMeEmailSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const validPass = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!validPass) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    if (current.email === command.email) {
      return {
        id: current.id,
        email: current.email,
        role: current.role,
      };
    }

    const occupied = await this.users.findForAuth(command.email);
    if (occupied) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const updated = await this.users.updateEmail(context.id, command.email);
    return {
      id: updated.id,
      email: updated.email,
      role: updated.role,
    };
  }
}
```

**DoD kroku:**

- Ten sam email + poprawne hasło → 200, `updateEmail` **nie** wywołane.
- Nowy wolny email + poprawne hasło → `updateEmail(id, email)` + 200 z nowym adresem.
- Zajęty email + poprawne hasło → 409; zajęty + złe hasło → 401 `INVALID_PASSWORD` (bez 409).
- Brak rotacji sesji / Set-Cookie w use-case (HTTP też nie ustawia).

---

### KROK 4 — HTTP: `PATCH /auth/me/email`; usunięcie mutacji z `PATCH /auth/me`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Osobna trasa mutacji; `GET /auth/me` bez zmian; brak `patchMe` na `me`. `SPEC-AUTH.md` A-3b / A-3a, `SPEC-KOMUNIKACJA.md` K-2d.

**Artefakty:**

- Zmiana: `apps/api/src/auth/auth.controller.ts`
- Zmiana: `apps/api/src/auth/auth.controller.spec.ts`
- Zmiana: `apps/api/src/shared/http/configure-swagger.spec.ts`

#### Refaktor — `auth.controller.ts` (handler)

**teraz:**

```typescript
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Patch('me')
  @HttpCode(200)
  async patchMe(@CurrentUser() user: AuthUserContext, @Body() body: unknown) {
    return this.updateMeEmail.execute(user, body);
  }
}
```

**zamień na:**

```typescript
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Patch('me/email')
  @HttpCode(200)
  async patchMeEmail(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
  ) {
    return this.updateMeEmail.execute(user, body);
  }
}
```

Bez `@Public()` — ten sam globalny JwtAuthGuard co `getMe`. Bez `setAuthCookies` / `clearAuthCookies` w handlerze.

#### Refaktor — `auth.controller.spec.ts` (metadane + delegacja)

**teraz (fragmenty):**

```typescript
    expect(isPublic(proto.patchMe)).toBe(false);
    // ...
    expect(Reflect.getMetadata('path', proto.patchMe)).toBe('me');
    // ...
    expect(Reflect.getMetadata('method', proto.patchMe)).toBe(
      RequestMethod.PATCH,
    );
```

```typescript
  it('delegates PATCH me to UpdateMeEmailUseCase', async () => {
    const body = { email: 'new@example.com' };
    const updated = {
      id: sessionUser.id,
      email: body.email,
      role: sessionUser.role,
    };
    updateMeEmail.execute.mockResolvedValue(updated);

    await expect(controller.patchMe(sessionUser, body)).resolves.toBe(updated);
    expect(updateMeEmail.execute).toHaveBeenCalledWith(sessionUser, body);
    expect(setAuthCookies).not.toHaveBeenCalled();
  });
```

**zamień na:**

```typescript
    expect(isPublic(proto.patchMeEmail)).toBe(false);
    // ...
    expect(Reflect.getMetadata('path', proto.patchMeEmail)).toBe('me/email');
    // ...
    expect(Reflect.getMetadata('method', proto.patchMeEmail)).toBe(
      RequestMethod.PATCH,
    );
```

```typescript
  it('delegates PATCH me/email to UpdateMeEmailUseCase', async () => {
    const body = {
      email: 'new@example.com',
      currentPassword: 'Password12!!',
    };
    const updated = {
      id: sessionUser.id,
      email: body.email,
      role: sessionUser.role,
    };
    updateMeEmail.execute.mockResolvedValue(updated);

    await expect(controller.patchMeEmail(sessionUser, body)).resolves.toBe(
      updated,
    );
    expect(updateMeEmail.execute).toHaveBeenCalledWith(sessionUser, body);
    expect(setAuthCookies).not.toHaveBeenCalled();
  });
```

#### Refaktor — `configure-swagger.spec.ts`

**teraz:**

```typescript
    expect(getOperation(document, '/api/v1/auth/me', 'patch').security).toEqual(
      [{ [COOKIE_AUTH_NAME]: [] }],
    );
```

**zamień na:**

```typescript
    expect(
      getOperation(document, '/api/v1/auth/me/email', 'patch').security,
    ).toEqual([{ [COOKIE_AUTH_NAME]: [] }]);
```

Upewnij się, że operacja `PATCH /api/v1/auth/me` **nie** istnieje w dokumencie (brak mutacji na probe). Jeśli asercja `getOperation(..., 'patch')` rzuca — OK (trasa usunięta); nie przywracaj starego path.

**DoD kroku:**

- `PATCH /api/v1/auth/me/email` chronione cookie; deleguje do `UpdateMeEmailUseCase`.
- Brak handlera `PATCH .../auth/me` mutującego email.
- Controller spec + swagger spec zielone; brak Set-Cookie przy sukcesie A-3b.

---

### KROK 5 — Testy: unit use-case + Postman Own email (D-27)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pokrycie D-27 na unit (application) + artefakt E2E Postman (T-5, jak D-23). `SPEC-TESTY.md` D-27.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/update-me-email.use-case.spec.ts` (przepisanie)
- Zmiana: `apps/api/test/postman/auth.postman-collection.json` (folder Own email + opisy)
- Opcjonalnie nota w `apps/api/test/postman/README.md` jeśli wprost wspomina `PATCH /auth/me` bez re-auth

#### Kompletny plik — `update-me-email.use-case.spec.ts`

```typescript
import { hash as bcryptHash } from 'bcrypt';
import { createUserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { UpdateMeEmailUseCase } from './update-me-email.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const PASSWORD = 'ValidPassword1!';
const WRONG_PASSWORD = 'WrongPassword1!';

function user(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: ID,
    email: 'me@example.com',
    role: 'user',
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

async function userForAuth(
  overrides: Partial<UserForAuth> = {},
): Promise<UserForAuth> {
  const base = user();
  return {
    ...base,
    passwordHash: await bcryptHash(PASSWORD, 4),
    ...overrides,
    id: overrides.id ?? base.id,
    email: overrides.email ?? base.email,
  };
}

function unusedUsers(overrides: Partial<UserRepository> = {}): UserRepository {
  const unexpected = async () => {
    throw new Error('unexpected');
  };
  return {
    findForAuth: unexpected,
    findById: unexpected,
    findAdminCount: unexpected,
    create: unexpected,
    createAdminIfNone: unexpected,
    setActive: unexpected,
    list: unexpected,
    updateEmail: unexpected,
    ...overrides,
  };
}

describe('UpdateMeEmailUseCase', () => {
  it('updates own email after re-auth and returns { id, email, role }', async () => {
    const current = await userForAuth();
    const updateEmail = jest.fn(async () =>
      user({ email: 'next@example.com' }),
    );
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'next@example.com',
      role: 'user',
    });
    expect(updateEmail).toHaveBeenCalledWith(ID, 'next@example.com');
  });

  it('same email + valid password → 200 no-op; occupied → 409 after re-auth', async () => {
    const current = await userForAuth();
    const updateEmail = jest.fn(async () => user());
    const same = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updateEmail,
      }),
    );
    await expect(
      same.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'me@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({ id: ID, email: 'me@example.com', role: 'user' });
    expect(updateEmail).not.toHaveBeenCalled();

    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
      })),
    };
    const conflict = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
      }),
    );
    await expect(
      conflict.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
  });

  it('wrong password → INVALID_PASSWORD even when target email is occupied', async () => {
    const current = await userForAuth();
    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: WRONG_PASSWORD },
      ),
    ).rejects.toMatchObject({
      code: 'INVALID_PASSWORD',
      message: 'Invalid password',
      httpStatus: 401,
    });
    expect(updateEmail).not.toHaveBeenCalled();
  });

  it('rejects missing currentPassword / bad shape with VALIDATION_FAILED', async () => {
    const current = await userForAuth();
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => current,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: '' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        {
          email: 'next@example.com',
          currentPassword: PASSWORD,
          role: 'admin',
        },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects inactive or missing session user with 401 UNAUTHORIZED', async () => {
    const updateEmail = jest.fn(async () => user());
    const inactive = await userForAuth({ isActive: false });
    const inactiveUc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => inactive,
        updateEmail,
      }),
    );
    await expect(
      inactiveUc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
    expect(updateEmail).not.toHaveBeenCalled();

    const missing = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => null,
        updateEmail,
      }),
    );
    await expect(
      missing.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
  });

  it('returns 409 when email is occupied by soft-deleted user (after re-auth)', async () => {
    const current = await userForAuth();
    const softDeleted: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
        isActive: false,
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return softDeleted;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
    expect(updateEmail).not.toHaveBeenCalled();
  });
});
```

#### Postman — folder `Own email (D-27)`

Aktualizacje w `auth.postman-collection.json` (bez sekretów poza istniejącymi zmiennymi kolekcji):

1. **Opis folderu / kolekcji:** trasa `PATCH /auth/me/email` + `{ email, currentPassword }`; złe hasło → `INVALID_PASSWORD`.
2. Wszystkie requesty mutacji email: URL `{{baseUrl}}/auth/me/email`.
3. Body z `currentPassword: "{{invitePassword}}"` (hasło reaktywowanego `user` z Accept-invite).
4. **Nowe requesty** (kolejność sugerowana w folderze, przed / obok happy path):
   - `PATCH me/email wrong password (401 INVALID_PASSWORD)` — body z poprawnym `patchedEmail` + złe hasło → **401**, `code=INVALID_PASSWORD`, `message=Invalid password`; potem `GET /auth/me` nadal stary email (albo asercja w tym samym teście, że email w odpowiedzi błędu nie wycieka hasła).
   - `PATCH me/email missing currentPassword (400)` — tylko `{ email }` → **400** `VALIDATION_FAILED`.
   - `PATCH me/email same address (200 no-op)` — `{ email: "{{inviteEmail}}", currentPassword }` gdy sesja ma jeszcze `inviteEmail`, **albo** po restore: ten sam adres + hasło → 200.
5. Happy path / 409 / restore / users ban / bez cookie: te same asercje co dziś, z `currentPassword` i nowym URL.
6. Request bez sesji: URL `/auth/me/email`, body z obu polami (guard i tak 401 `UNAUTHORIZED`).

Przykład raw body happy path:

```json
{
  "email": "{{patchedEmail}}",
  "currentPassword": "{{invitePassword}}"
}
```

Przykład testu złego hasła:

```javascript
pm.test('status 401', function () {
  pm.response.to.have.status(401);
});
const body = pm.response.json();
pm.test('INVALID_PASSWORD', function () {
  pm.expect(body.code).to.eql('INVALID_PASSWORD');
  pm.expect(body.message).to.eql('Invalid password');
});
```

**DoD kroku:**

- Unit `UpdateMeEmailUseCase` zielony (w tym `INVALID_PASSWORD` przed 409).
- Postman D-27 pokrywa: 200 + GET me; same email no-op; złe hasło; brak `currentPassword`; 409 po re-auth; `PATCH /users/:id` + email → 400; brak sesji → 401.
- Brak osobnego wymogu nowego pliku Jest e2e (T-5: Postman jak D-23).

---

#### Propozycja commit message

```text
feat(auth): require password re-auth on own email change

Move self-service email to PATCH /auth/me/email with currentPassword and
INVALID_PASSWORD so a stolen session cannot change the account identifier.
```

---

## Weryfikacja wycinka

| Kryterium | Jak |
|-----------|-----|
| A-3b / K-2d / B-8a | Trasa, body, kolejność, kody 400/401/409 |
| D-27 | Unit + Postman |
| Probe vs mutacja | `GET /auth/me` bez zmian; brak mutacji na `PATCH /auth/me` |
| Bez A-5 na re-auth | Schema + use-case bez `assertPasswordPolicy` |
| Bez rotacji sesji | Handler bez cookies |
| Typy | `unknown` + Zod; bez `any` |
| Kanon | docs/SPEC aktualne — **nie** treść Kroku 10.2 |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Major nietknięty w tej sesji | tak |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 13 | `WYKONANY` (gate + HOW z tego feature planu) |
| MILESTONE 13 | **nie tworzyć** / nie oznaczać |
| Faza 10 / 10.2 | bez zmian (`WYKONANY` — historia) |
| MILESTONE 5 / 6 | bez zmian (`OSIĄGNIĘTY`) |

Edycja pliku major — **poza** tą sesją (ręcznie lub w `/feature-implementation` na życzenie).

---

## Checklist sesji planu

| Pozycie | Status |
|---------|--------|
| Kotwica Faza 13 + bramka ścieżki wstecz | OK |
| Grandfathering docs bez FM: `docs/README.md`, `docs/deployment.md` | potwierdzone |
| Pass rozwojowy | schema → re-auth → mutacja → HTTP → testy; brak innych przesunięć |
| Kompletny kod nowych schematów / docelowy use-case | tak |
| Refaktory `teraz → zamień na` | tak |
| Commit message EN Conventional Commits | koniec FAZA 1 |
| Major / docs / SPEC nietknięte | tak |
