# Content Chain — feature plan: Accept-invite rola vs `DEMO_MODE` (Faza 19)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-19-accept-invite-demo-role.md`  
**Kotwica major:** Faza 19 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 18 (`WYKONANY`) — `guest` przy **register**; Faza 5 (`WYKONANY`) — accept-invite zawsze `role=user`; Faza 15 (`WYKONANY`) — anti-enum **401** (bez zmiany statusów).  
**Źródła kanonu (nie treść Fazy 18 „invite nadal user”):** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/testy.md`, `docs/anty_patterny.md`, `SPEC-AUTH.md` A-7 / A-7b, `SPEC-PERSISTENCE.md` D16, `SPEC-KOMUNIKACJA.md`, `SPEC-TESTY.md` D-23 / D-23a / D-46, major Faza 19.  
**Pass rozwojowy:** port → adapter → use-case → unit → Postman. **Przesunięcie:** względem HOW majoru (use-case przed portem) — port i adapter wcześniej, żeby `role` istniało w kontrakcie przed użyciem w use-case.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | `POST /auth/accept-invite`: `DEMO_MODE=true` → `User.role = guest`; `false` → `user` (mirror register A-11); body **bez** `role`; invite **nigdy** → `admin`; `verifiedAt = now()`; brak Set-Cookie; anti-enum **401** bez regresji |
| Major | Faza 19 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–18 (`WYKONANY`); **bez** MILESTONE 19 |
| Poza zakresem | UI / major FE; migracja Prisma / backfill ról; `Invitation.role`; `role` w body invite/accept; awans `guest`→`user`/`admin`; zmiana semantyki GuestGuard / R-12 / Redis / ownership; drzewo katalogów (`api-structure-refactor-plan.md`) |
| Po implementacji (informacyjnie) | Major: Faza 19 → `WYKONANY`. Brak `MILESTONE` 19. Faza 5 / 15 / 18 / MILESTONE 5 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 19 (gate) HOW 2 | FAZA 1 / KROK 1–2 | Port + adapter Prisma |
| Faza 19 (gate) HOW 1, 3 | FAZA 1 / KROK 3 | `AcceptInviteUseCase` + `ENV` + wynik `UserRole` |
| Faza 19 (gate) HOW 4–5, 7 | FAZA 1 / KROK 4–5 | Unit + Postman + `graphify update .` |

---

## Założenia

- Stack bez zmian: NestJS 11, Zod 4 (body accept bez `role`), Prisma `User.role` **String** (bez migracji enum), `DomainException` + envelope.
- `tsconfig` **bez** zmian. Typy: `UserRole` z `@content-chain/shared`; `import type`; zakaz `any` / `@ts-ignore`.
- Wzorzec roli = `RegisterUserUseCase`: `const role: UserRole = this.env.DEMO_MODE ? 'guest' : 'user'`.
- `ENV` już w `AuthModule` (`EnvModule`); **bez** zmiany listy `providers` — tylko konstruktor use-case + `@Inject(ENV)`.
- GuestGuard / limity / martwa sesja: **bez zmian kodu** — zaproszeni przy demo on podlegają istniejącym regułom jak register→guest.
- Kolekcje Postman `auth` / `invitations-pipeline` zakładają **`DEMO_MODE=false`** (default lokalny) → asercja `role=user` **zostaje**; ścieżka demo on = folder w `demo-guest`.

---

## Biblioteki / API

**Context7:** nie wywołany — wycinek to refaktor logiki biznesowej na istniejącym wzorcu Nest DI / Prisma (bez nowego API biblioteki). Przy konflikcie przykład ↔ SPEC → **wygrywa SPEC**.

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| Rola vs demo | `env.DEMO_MODE ? 'guest' : 'user'` | `RegisterUserUseCase` (Faza 18) |
| Inject env | `@Inject(ENV) private readonly env: Env` | `register-user.use-case.ts`, `auth.module.ts` + `EnvModule` |
| Persist | `tx.user.create({ data: { …, role: input.role, verifiedAt: new Date() } })` | `prisma-invitation.adapter.ts` + D16 |
| Anti-enum | `!created.ok` → `UNAUTHORIZED` / `Invalid invitation token` / 401 | Faza 15 / A-7b — **bez zmian** |

---

## FAZA 1 — Accept-invite: rola vs `DEMO_MODE` (mirror register)

Odpowiada major **Faza 19** HOW pkt 1–7. Jedna faza zestawu.

---

### KROK 1 — Port: `AcceptInviteAndCreateUserInput` += `role`

**Status:** `WYKONANY`

**Cel:** Kontrakt portu niesie rolę z use-case (nie hardcode w adapterze). `SPEC-PERSISTENCE.md` D16, `SPEC-AUTH.md` A-7b, major HOW pkt 2.

**Artefakty:**

- Zmiana: `apps/api/src/auth/domain/invitation-repository.port.ts`

#### Refaktor — typ inputu

Plik: `apps/api/src/auth/domain/invitation-repository.port.ts`

**teraz:**

```typescript
import type { InvitationId, UserId } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';
```

**zamień na:**

```typescript
import type { InvitationId, UserId, UserRole } from '@content-chain/shared';
import type { AuthUser } from './auth-user.types';
```

**teraz:**

```typescript
export type AcceptInviteAndCreateUserInput = {
  invitationId: InvitationId;
  userId: UserId;
  email: string;
  passwordHash: string;
};
```

**zamień na:**

```typescript
export type AcceptInviteAndCreateUserInput = {
  invitationId: InvitationId;
  userId: UserId;
  email: string;
  passwordHash: string;
  role: UserRole;
};
```

`AcceptInviteAndCreateUserResult` / `InvitationRepository` — **bez zmian** (wynik już niesie `AuthUser.role: UserRole`).

**Biblioteki / API:** shared `UserRole` (`admin` \| `user` \| `guest`) — bez rozszerzania unii.

**Testy:** kompilacja unitów w KROK 4 (mocki muszą przekazać `role` w expect / input).

**DoD kroku:**

- Input portu wymaga `role: UserRole`.
- Brak `role` w typach Invitation / HTTP DTO.

---

### KROK 2 — Adapter Prisma: `role: input.role`

**Status:** `WYKONANY`

**Cel:** Persistacja roli z portu; usunąć hardcode `'user'`. D16, A-7b, major HOW pkt 2.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts`

#### Refaktor — `acceptAndCreateUser` (fragment `user.create`)

Plik: `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts`

**teraz:**

```typescript
        const userRow = await tx.user.create({
          data: {
            id: input.userId,
            email: input.email,
            passwordHash: input.passwordHash,
            role: 'user',
            isActive: true,
            verifiedAt: new Date(),
          },
        });
```

**zamień na:**

```typescript
        const userRow = await tx.user.create({
          data: {
            id: input.userId,
            email: input.email,
            passwordHash: input.passwordHash,
            role: input.role,
            isActive: true,
            verifiedAt: new Date(),
          },
        });
```

Gałąź P2002 → `revoked` + `{ ok: false, reason: 'email-taken' }` — **bez zmian** (Faza 15). Mapowanie `userRow.role` przez `isUserRole` — **bez zmian**.

**Biblioteki / API:** Prisma `$transaction` jak dotychczas.

**Testy:** KROK 4 (unit use-case z mockiem portu); żywy HTTP w KROK 5.

**DoD kroku:**

- Adapter nie hardcoduje `'user'`.
- `verifiedAt = new Date()` nadal przy create.
- Kolizja email → revoke + `email-taken` bez regresji.

---

### KROK 3 — `AcceptInviteUseCase`: `ENV` + rola vs `DEMO_MODE`

**Status:** `WYKONANY`

**Cel:** Happy path mirror A-11: demo on → `guest`, demo off → `user`; 201 zwraca faktyczne `created.user.role`. A-7 / A-7b, major HOW pkt 1 i 3.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/accept-invite.use-case.ts`
- `auth.module.ts` / `auth.controller.ts` / `accept-invite.dto.ts` — **bez zmian**

#### Refaktor — importy, wynik, konstruktor, `execute`

Plik: `apps/api/src/auth/application/accept-invite.use-case.ts`

**Kompletny plik po zmianie** (mały; zastępuje całą obecną treść):

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import type { UserId, UserRole } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { newUserId } from '../../shared/http/new-ids';
import { ENV, type Env } from '../../shared/config/env';
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
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class AcceptInviteUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(ENV) private readonly env: Env,
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
    const role: UserRole = this.env.DEMO_MODE ? 'guest' : 'user';
    const created = await this.invitations.acceptAndCreateUser({
      invitationId: invitation.id,
      userId: newUserId(),
      email: invitation.email,
      passwordHash,
      role,
    });
    if (!created.ok) {
      // A-7b: maskowanie kolizji email jak nieważny token (zakaz 409 na tej trasie).
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid invitation token',
        401,
      );
    }

    return {
      user: {
        id: created.user.id,
        email: created.user.email,
        role: created.user.role,
      },
    };
  }
}
```

**Uwagi typowania:** wynik `role: UserRole` (nie literal `'user'`); `role` w create **nigdy** `'admin'`; schema Zod body **bez** `role`.

**Biblioteki / API:** Nest `@Inject(ENV)` jak `RegisterUserUseCase`.

**Testy:** KROK 4.

**DoD kroku:**

- `DEMO_MODE=true` → `acceptAndCreateUser` dostaje `role: 'guest'`; wynik 201 z `role: 'guest'`.
- `DEMO_MODE=false` → `role: 'user'`.
- Anti-enum 401 + message jak dotychczas.
- Brak Set-Cookie (controller bez zmian).

---

### KROK 4 — Unit: demo on / off + regresja anti-enum

**Status:** `WYKONANY`

**Cel:** Pokrycie A-7b / D-23 / D-46 na poziomie use-case. Major HOW pkt 4. `SPEC-TESTY.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/accept-invite.use-case.spec.ts`

#### Refaktor — env + konstruktor + asercje roli

Plik: `apps/api/src/auth/application/accept-invite.use-case.spec.ts`

1. Dodać import i stałe env (wzorzec `register-user.use-case.spec.ts`):

```typescript
import { validateEnv } from '../../shared/config/env.schema';

const BASE_ENV_FIELDS = {
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  INVITE_TTL: '7d',
  ACTIVATION_TTL: '7d',
} as const;

const TEST_ENV_DEMO_OFF = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'false',
});

const TEST_ENV_DEMO_ON = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'true',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
});
```

2. Każde `new AcceptInviteUseCase(invitations)` → `new AcceptInviteUseCase(invitations, TEST_ENV_DEMO_OFF)` (default demo off dla istniejących testów).

3. **Zamienić** happy-path test „creates a user with role user…”:

**teraz (skrót):** `new AcceptInviteUseCase(…)` + expect `role: 'user'` + `toMatchObject` bez `role` w inputcie.

**zamień na:**

```typescript
  it('creates a user with role user when DEMO_MODE is false (D-23)', async () => {
    const created = makeCreatedUser({ role: 'user' });
    const acceptAndCreateUser = jest.fn(
      async (
        _input: AcceptInviteAndCreateUserInput,
      ): Promise<AcceptInviteAndCreateUserResult> => ({
        ok: true,
        user: created,
      }),
    );
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser,
      }),
      TEST_ENV_DEMO_OFF,
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).resolves.toEqual({
      user: {
        id: created.id,
        email: created.email,
        role: 'user',
      },
    });
    expect(created.verifiedAt).not.toBeNull();
    expect(acceptAndCreateUser).toHaveBeenCalledTimes(1);
    expect(acceptAndCreateUser.mock.calls[0]?.[0]).toMatchObject({
      invitationId: INVITATION_ID,
      email: INVITE_EMAIL,
      role: 'user',
    });
    expect(acceptAndCreateUser.mock.calls[0]?.[0].role).not.toBe('admin');
    expect(acceptAndCreateUser.mock.calls[0]?.[0].role).not.toBe('guest');
    expect(typeof acceptAndCreateUser.mock.calls[0]?.[0].passwordHash).toBe(
      'string',
    );
  });

  it('creates a user with role guest when DEMO_MODE is true (D-23 / D-46)', async () => {
    const created = makeCreatedUser({ role: 'guest' });
    const acceptAndCreateUser = jest.fn(
      async (
        input: AcceptInviteAndCreateUserInput,
      ): Promise<AcceptInviteAndCreateUserResult> => ({
        ok: true,
        user: makeCreatedUser({ role: input.role }),
      }),
    );
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser,
      }),
      TEST_ENV_DEMO_ON,
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).resolves.toEqual({
      user: {
        id: USER_ID,
        email: INVITE_EMAIL,
        role: 'guest',
      },
    });
    expect(acceptAndCreateUser.mock.calls[0]?.[0]).toMatchObject({
      role: 'guest',
    });
    expect(acceptAndCreateUser.mock.calls[0]?.[0].role).not.toBe('admin');
    expect(acceptAndCreateUser.mock.calls[0]?.[0].role).not.toBe('user');
  });
```

4. Pozostałe testy (unknown token, weak password, email-taken → 401, missing token): dodać drugi argument `TEST_ENV_DEMO_OFF`; asercje anti-enum **bez zmian** treści.

**DoD kroku:**

- `pnpm --filter api test` (lub równoważny target unit auth) — zielone: demo off → `user`, demo on → `guest`, 401 anti-enum.
- Żaden test nie oczekuje `role: 'user'` przy `TEST_ENV_DEMO_ON`.

---

### KROK 5 — Postman + README + `graphify`

**Status:** `WYKONANY`

**Cel:** Żywy HTTP D-23 / D-46: demo off = `user` (auth + invitations); demo on = invite→guest + smoke. Major HOW pkt 5–7. `docs/testy.md` (kanon już opisuje ścieżkę — bez edycji docs w tej sesji implementacji, chyba że README Postman wymaga dopisku).

**Artefakty:**

- Zmiana: `apps/api/test/postman/auth.postman-collection.json` (opis folderu Accept-invite — pin „zawsze user” → „przy `DEMO_MODE=false` → user; suite lokalna zakłada demo off”)
- Zmiana: `apps/api/test/postman/invitations-pipeline.postman-collection.json` (to samo w description / test name)
- Zmiana: `apps/api/test/postman/demo-guest.postman-collection.json` — **nowy folder** `Invite guest`
- Zmiana: `apps/api/test/postman/README.md` — DEMO guest + zaproszenia: invite→guest przy demo on
- Po TS: `graphify update .` (major HOW pkt 7)

#### Auth / invitations-pipeline (demo off)

Asercje `pm.expect(body.user.role).to.eql('user')` **zostają** (runner przy `DEMO_MODE=false`).

**teraz** (description requestu accept-invite w auth):

```text
Publiczny. 201 `{ user: { id, email, role } }` z role=user. Bez Set-Cookie.
```

**zamień na:**

```text
Publiczny. 201 `{ user: { id, email, role } }`. Suite auth zakłada DEMO_MODE=false → role=user (D-23). Przy DEMO_MODE=true ta sama trasa zwraca guest — pokrycie w demo-guest. Bez Set-Cookie.
```

Analogiczna nota w `invitations-pipeline` (description accept + README sekcja Zaproszenia: „konto `user`” → „przy demo off = `user`”).

#### demo-guest — folder `Invite guest`

Wstawić **po** `Register guest` (albo przed Allow), kolejność runnera: **Config → Register guest → Invite guest → Allow → Deny → Admin przy demo**.

Zmienne kolekcji (dodać):

| key | value (placeholder) |
|-----|---------------------|
| `inviteGuestEmail` | `invite-guest@example.com` |
| `inviteGuestPassword` | `Password12!!` (lub reuse `guestPassword`) |
| `inviteGuestToken` | `` (wklej z logu api po create) |

**Szkic requestów folderu:**

1. `POST login admin` — jak folder „Admin przy demo” (cookie admina).
2. `POST /invitations` `{ "email": "{{inviteGuestEmail}}" }` — prerequest: unikalny email `invite-guest-` + `Date.now()` + `@example.com`; test: 201; nota w description: wklej raw token z logu DX do `inviteGuestToken`.
3. Clear cookie jar originu api (jak auth accept-invite).
4. `POST /auth/accept-invite` `{ token, password }` → **201**, `body.user.role === 'guest'`, brak Set-Cookie; zapis `invitedGuestUserId`.
5. `POST /auth/login` zaproszonym → **200**, `role === 'guest'`.
6. Smoke: jeden `POST /runs` dozwolonego typu (np. `post_ideas`) → **202** **albo** (jeśli slot już zajęty przez Register guest w tym samym runnerze) **403** `GUEST_TYPE_QUOTA_EXCEEDED` — asercja: status ∈ {202, 403} i przy 403 `code === 'GUEST_TYPE_QUOTA_EXCEEDED'`. Alternatywa zalecana w DoD: **osobny Collection Runner tylko folderów Config + Invite guest** (bez Register), żeby pierwszy slot był wolny → asercja 202; README opisuje obie ścieżki.

**Bez** zmiany GuestGuard / capów — tylko weryfikacja, że invite→guest podlega tym samym regułom.

#### README Postman

Dopisać w sekcji DEMO guest:

- Ścieżka invite→accept→`guest` (D-23 / D-46 przy demo on); token z logu jak invitations.
- Auth / invitations-pipeline: zakładają `DEMO_MODE=false`.

**DoD kroku:**

- Auth + invitations (demo off): accept → `user`; D-23a 401 bez regresji.
- demo-guest: accept przy demo on → `guest` (+ smoke 202/403 jak wyżej).
- `graphify update .` po zmianach TS.
- Brak migracji / Invitation.role / promote.

---

#### Propozycja commit message

```text
feat(auth): assign guest role on accept-invite when DEMO_MODE is on

Mirror register so invited accounts join the demo sandbox as guests, not as team users.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kanon | A-7 / A-7b / D16 / D-23 / D-46 — invite rola vs `DEMO_MODE` |
| Anti-enum | Kolizja email → **401** + revoke; **nie** 409 |
| Mirror register | Ta sama reguła `DEMO_MODE ? guest : user`; nigdy `admin` |
| Bez Set-Cookie | Controller / DTO bez zmian sesji |
| GuestGuard | Semantyka bez zmian kodu; zaproszeni guest podlegają limitom |
| Brak migracji | String `role`; bez backfill |
| Typy | `UserRole` na granicach portu i wyniku; bez `any` |
| Pass rozwojowy | Port → adapter → use-case → testy (przesunięcie względem numeracji HOW majoru) |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Major | Nietknięty w tej sesji |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 19 | `WYKONANY` (gate + HOW) |
| MILESTONE 19 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 15 / 18 / MILESTONE 5 | bez zmian historii |

Wdrożenie kodu = poza tą sesją (opcjonalnie ręczne `/feature-implementation`).
