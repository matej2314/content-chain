# Content Chain — feature plan: rotacja sesji przy zmianie hasła (Faza 33)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-33-password-keep-session.md`  
**Kotwica major:** Faza 33 w `content-chain-backend_major_plan.md` (gate — HOW w tym pliku).  
**Refaktor względem:** Faza 32 / Krok 32.2 / A-3d Clear-Cookie (`WYKONANY`) — sukces `PATCH /auth/me/password` = Clear-Cookie + `{ ok: true }`. Faza 32 **bez** edycji treści / statusów.  
**Źródła:** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `SPEC-AUTH.md` A-3d, `SPEC-KOMUNIKACJA.md` K-2d, `SPEC-TESTY.md` D-92, `SPEC-BEZPIECZENSTWO.md` B-8a.  
**Pass rozwojowy:** use-case (+unit) → HTTP (+unit / e2e / Postman). **Brak przesunięć.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Keep-session przy `PATCH /auth/me/password`: revoke-all → Set-Cookie nowej pary + body `{ id, email, role }` |
| Major | Faza 33 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY`); **bez** MILESTONE 33 |
| Poza zakresem | FE Konto (major FE Faza 32 UX); `DELETE /auth/me` / confirm e-mail; login / refresh / logout poza reuse; forgot-password; edycja major w tej sesji |
| Po implementacji (informacyjnie) | Major Faza 33 → `WYKONANY`. Brak `OSIĄGNIĘTY` (bez MILESTONE 33) |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 33 | FAZA 1 / KROK 1–2 | Use-case + HTTP; testy równolegle w każdym kroku |

---

## Założenia

- Stack: NestJS 11, `@nestjs/jwt` 11, Zod 4.4.x (`parseWithZod`), istniejące `setAuthCookies` / `generateRefreshToken` / `AuthTokenResult`.
- Body sukcesu = **pola usera jak w loginie** (`{ id, email, role }`), **nie** wrapper `{ user: … }` ani `{ ok: true }`, **nie** `expiresIn` (login ma `expiresIn` — password nie).
- Kolejność: `updatePassword` → `sessions.deleteByUser` → nowa para (JWT + `sessions.create`) → controller `setAuthCookies`.
- Złe `currentPassword` / słabe `newPassword` — **bez** rotacji (jak dziś).
- Unit / e2e / Postman w **tym samym** kroku co kod, którego dotyczą.
- Typy: `input: unknown` + Zod; zwrot `AuthTokenResult`; zakaz `any`.

---

## Biblioteki / API

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| `JwtService.signAsync` + inject | jak `LoginUseCase` / `BootstrapAdminUseCase` | repo + Context7 `/nestjs/jwt` |
| Cookie httpOnly `cc_access` / `cc_refresh` | `setAuthCookies` — **nie** `clearAuthCookies` na happy path | repo `cookie.helper.ts` |
| Zod `changeMePasswordSchema` | bez zmian kształtu body | repo |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (A-3d / D-92).

---

## FAZA 1 — Keep-session przy `PATCH /auth/me/password`

Odpowiada major **Faza 33** (HOW). Testy w każdym `KROK`.

---

### KROK 1 — `ChangeMePasswordUseCase`: revoke-all → nowa para + `AuthTokenResult`

**Status:** `WYKONANY`

**Cel:** Po udanej zmianie hasła unieważnij wszystkie refresh, wydaj nową parę tokenów (jak login), zwróć `AuthTokenResult`. Major Faza 33 pkt 1–3; `SPEC-AUTH.md` A-3d; `docs/security.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/change-me-password.use-case.ts`
- Zmiana: `apps/api/src/auth/application/change-me-password.use-case.spec.ts`
- DI: `JwtService` + `ENV` (jak login) — `AuthModule` już eksportuje / importuje `JwtModule`; provider use-case bez osobnej rejestracji poza istniejącą.

#### Use-case — pełny plik po zmianie

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import { validatePasswordPolicy } from '../domain/password.policy';
import {
  comparePassword,
  generateRefreshToken,
  hashPassword,
  parseTtlMs,
} from './auth.helpers';
import { changeMePasswordSchema } from './auth.schemas';
import type { AuthTokenResult } from './bootstrap-admin.use-case';
import type { AuthUserContext } from '../domain/auth-user.types';

@Injectable()
export class ChangeMePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
    private readonly jwt: JwtService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<AuthTokenResult> {
    const command = parseWithZod(changeMePasswordSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const isPasswordValid = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!isPasswordValid) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    validatePasswordPolicy(command.newPassword);

    const passwordHash = await hashPassword(command.newPassword);
    await this.users.updatePassword(context.id, passwordHash);
    await this.sessions.deleteByUser(context.id);

    const accessToken = await this.jwt.signAsync({
      sub: current.id,
      email: current.email,
      role: current.role,
    });
    const { raw: refreshToken, hash: tokenHash } = generateRefreshToken();
    await this.sessions.create({
      id: uuidv4(),
      userId: current.id,
      tokenHash,
      expiresAt: new Date(Date.now() + parseTtlMs(this.env.JWT_REFRESH_TTL)),
    });

    return {
      user: {
        id: current.id,
        email: current.email,
        role: current.role,
      },
      accessToken,
      refreshToken,
    };
  }
}
```

#### Unit — `change-me-password.use-case.spec.ts` (fragmenty)

**teraz (sukces):**

```typescript
    const uc = new ChangeMePasswordUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updatePassword,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { currentPassword: PASSWORD, newPassword: NEW_PASSWORD },
      ),
    ).resolves.toEqual({ ok: true });

    expect(updatePassword).toHaveBeenCalledWith(ID, expect.any(String));
    expect(deleteByUser).toHaveBeenCalledWith(ID);
```

**zamień na** (wzorzec jwt/env jak `login.use-case.spec.ts` — `makeJwt()`, `TEST_ENV` z `JWT_REFRESH_TTL`):

```typescript
    const create = jest.fn(async () => undefined);
    const jwt = makeJwt();
    const uc = new ChangeMePasswordUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updatePassword,
      }),
      unusedSessions({ deleteByUser, create }),
      jwt,
      TEST_ENV,
    );

    const result = await uc.execute(
      { id: ID, email: 'me@example.com', role: 'user' },
      { currentPassword: PASSWORD, newPassword: NEW_PASSWORD },
    );

    expect(result.user).toEqual({
      id: ID,
      email: 'me@example.com',
      role: 'user',
    });
    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken.length).toBeGreaterThan(0);
    expect(updatePassword).toHaveBeenCalledWith(ID, expect.any(String));
    expect(deleteByUser).toHaveBeenCalledWith(ID);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0]?.[0]).toMatchObject({ userId: ID });
    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: ID,
      email: 'me@example.com',
      role: 'user',
    });
```

Dla `INVALID_PASSWORD` / `VALIDATION_FAILED`: konstruktor z `jwt` + `TEST_ENV`; asercje **bez** `deleteByUser` / `create` / `signAsync` — jak dziś + `expect(create).not…` / `expect(jwt.signAsync).not…`.

**DoD kroku:**

- `execute` zwraca `AuthTokenResult`; sukces = update → deleteByUser → create + JWT.
- Unit: sukces / złe current / słabe new — zielone; bez rotacji na błędach.
- Kompilacja typów: brak `{ ok: true }` na granicy use-case’u.

---

### KROK 2 — `AuthController` Set-Cookie + testy HTTP (unit / e2e D-92 / Postman)

**Status:** `WYKONANY`

**Cel:** Happy path = `setAuthCookies` + body `{ id, email, role }`; **zakaz** `clearAuthCookies`. D-92 keep-session. `SPEC-KOMUNIKACJA.md` K-2d; `SPEC-TESTY.md` D-92; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/auth.controller.ts`
- Zmiana: `apps/api/src/auth/auth.controller.spec.ts`
- Zmiana: `apps/api/test/auth-self-service.e2e-spec.ts`
- Zmiana: `apps/api/test/postman/auth.postman-collection.json`

#### Controller — `patchMePassword`

**teraz:**

```typescript
  async patchMePassword(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.changeMePassword.execute(user, body);
    clearAuthCookies(res, this.env);
    return result;
  }
```

**zamień na:**

```typescript
  async patchMePassword(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.changeMePassword.execute(user, body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return result.user;
  }
```

(`clearAuthCookies` zostaje w pliku dla logout / `DELETE /auth/me`.)

#### Unit controller

**teraz:**

```typescript
  it('changes password and clears auth cookies', async () => {
    const body = {
      currentPassword: 'Password12!!',
      newPassword: 'Password34!!',
    };
    changeMePassword.execute.mockResolvedValue({ ok: true });

    await expect(
      controller.patchMePassword(sessionUser, body, res),
    ).resolves.toEqual({ ok: true });
    expect(changeMePassword.execute).toHaveBeenCalledWith(sessionUser, body);
    expect(clearAuthCookies).toHaveBeenCalledWith(res, env);
    expect(setAuthCookies).not.toHaveBeenCalled();
  });
```

**zamień na:**

```typescript
  it('changes password and sets rotated auth cookies', async () => {
    const body = {
      currentPassword: 'Password12!!',
      newPassword: 'Password34!!',
    };
    changeMePassword.execute.mockResolvedValue(tokenResult);

    await expect(
      controller.patchMePassword(sessionUser, body, res),
    ).resolves.toEqual(tokenResult.user);
    expect(changeMePassword.execute).toHaveBeenCalledWith(sessionUser, body);
    expect(setAuthCookies).toHaveBeenCalledWith(
      res,
      tokenResult.accessToken,
      tokenResult.refreshToken,
      env,
    );
    expect(clearAuthCookies).not.toHaveBeenCalled();
  });
```

(`tokenResult` już w specu — jak login/bootstrap.)

#### E2e D-92

**teraz (rdzeń sukcesu):**

```typescript
  it('D-92: password change clears cookies; wrong current keeps session', async () => {
    // … login agent …
    // wrong → 401; GET me 200
    const changed = await agent
      .patch('/api/v1/auth/me/password')
      .send({
        currentPassword: USER_PASSWORD,
        newPassword: NEW_PASSWORD,
      })
      .expect(200);
    expect(changed.body).toEqual({ ok: true });
    const cleared = setCookieHeaders(changed);
    expect(cleared).toMatch(/cc_access=/);
    expect(cleared).toMatch(/cc_refresh=/);

    await agent.get('/api/v1/auth/me').expect(401);

    await request
      .agent(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email, password: NEW_PASSWORD })
      .expect(200);
    // cleanup…
  });
```

**zamień na:**

```typescript
  it('D-92: password change rotates cookies; wrong current keeps session', async () => {
    const email = `e2e-selfsvc-pw-${randomUUID()}@content-chain.test`;
    const userId = await createUserRow(prisma, {
      email,
      password: USER_PASSWORD,
      role: 'user',
    });
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/v1/auth/login')
      .send({ email, password: USER_PASSWORD })
      .expect(200);

    // druga sesja (inne urządzenie) — po rotacji jej refresh ma paść
    const other = request.agent(app.getHttpServer());
    await other
      .post('/api/v1/auth/login')
      .send({ email, password: USER_PASSWORD })
      .expect(200);

    const wrong = await agent
      .patch('/api/v1/auth/me/password')
      .send({
        currentPassword: 'WrongPassword1!',
        newPassword: NEW_PASSWORD,
      })
      .expect(401);
    expect(wrong.body.code).toBe('INVALID_PASSWORD');
    await agent.get('/api/v1/auth/me').expect(200);

    const changed = await agent
      .patch('/api/v1/auth/me/password')
      .send({
        currentPassword: USER_PASSWORD,
        newPassword: NEW_PASSWORD,
      })
      .expect(200);
    expect(changed.body).toEqual({
      id: userId,
      email,
      role: 'user',
    });
    const rotated = setCookieHeaders(changed);
    expect(rotated).toMatch(/cc_access=/);
    expect(rotated).toMatch(/cc_refresh=/);

    // keep-session na tym agencie (nowe cookie)
    await agent.get('/api/v1/auth/me').expect(200);

    // poprzednia sesja: refresh → 401 (revoke-all)
    await other.post('/api/v1/auth/refresh').expect(401);

    await prisma.refreshSession.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
  });
```

#### Postman — folder `Password (D-92)`

Opis folderu: sukces = **200** + body `{ id, email, role }` + **Set-Cookie** (nie Clear-Cookie).

**Request `PATCH me/password success`:**

- nazwa: `PATCH me/password success (Set-Cookie keep-session)`
- description: D-92 keep-session
- test script — **zamień** asercje `ok: true` / „clears…” na:

```javascript
pm.test('status 200', function () { pm.response.to.have.status(200); });
const body = pm.response.json();
pm.test('body id email role', function () {
  pm.expect(body).to.have.keys('id', 'email', 'role');
  pm.expect(body.email).to.eql(pm.environment.get('patchedEmail'));
});
pm.test('sets rotated auth cookies', function () {
  const cookies = pm.response.headers.all()
    .filter(function (h) { return h.key.toLowerCase() === 'set-cookie'; })
    .map(function (h) { return h.value; })
    .join('\n');
  pm.expect(cookies).to.include('cc_access=');
  pm.expect(cookies).to.include('cc_refresh=');
});
```

**Request `GET me after password change`:**

- description: D-92 keep-session → **200** (nie 401)
- test: `pm.response.to.have.status(200)`

**Request `POST login with new password`:** opcjonalnie zostaw jako regresję „nowe hasło działa po świadomym loginie” **albo** usuń, jeśli łańcuch cookie jar już trzyma sesję — preferuj **zostaw** (nie szkodzi D-92; nie asercjonuj Clear-Cookie).

Wrong current / weak new — **bez zmian** sensu.

**DoD kroku:**

- Happy path: Set-Cookie + body user; **zero** `clearAuthCookies` na password.
- Unit controller: `setAuthCookies` + `result.user`.
- E2e D-92: keep-session na agencie zmieniającym; druga sesja → refresh 401; złe current bez rotacji.
- Postman D-92: asercje keep-session; folder description zaktualizowany.
- Regresja: logout / `DELETE /auth/me` nadal Clear-Cookie.

---

#### Propozycja commit message

```text
feat(auth): keep session after password change via cookie rotation

Revoke all refresh tokens then issue a new cc_access/cc_refresh pair so
the current device stays logged in per A-3d / D-92.
```

---

## Weryfikacja wycinka

| Check | Kryterium |
|-------|-----------|
| Kotwica | Major Faza 33 — keep-session; Faza 32 nietknięta |
| SPEC/docs | A-3d, K-2d, D-92, `security.md`, `dokumentacja_komunikacji.md`, `dictionary.md` |
| Kod | Use-case `AuthTokenResult`; controller Set-Cookie; body `{ id, email, role }` |
| Testy | Unit w KROK 1–2; e2e + Postman w KROK 2 |
| Poza zakresem | FE, delete-own, confirm, MILESTONE 33 |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit | EN Conventional Commits na końcu FAZY 1 |

---

## Ślad do major (po implementacji — informacyjnie)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 33 | `WYKONANY` |
| MILESTONE 33 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 32 | bez zmian (`WYKONANY`) |

Ten skill / ten plik **nie** zmienia majoru. Statusy major — poza sesją (ręcznie lub przy `/feature-implementation` na życzenie).
