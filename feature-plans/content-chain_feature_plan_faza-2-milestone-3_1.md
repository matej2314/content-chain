# Feature Plan — Faza 2 major: fundament runtime backendu

## Meta

**Kotwica major:** `content-chain-backend_major_plan.md` — Faza 2 (kroki 2.1–2.4) + ślad do MILESTONE 2.  
**Zestaw wycinka:** `faza-2-milestone-3` (plik `_1` = ten; plik `_2` = major Faza 3 + MILESTONE 3).  
**Bramka ścieżki wstecz:** Faza 1 major = `WYKONANY`, MILESTONE 1 = `OSIĄGNIĘTY`.  
**Źródła:** `docs/` (m.in. `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `observability.md`, `security.md`, `brand_types.md`, `deployment.md`), `spec/SPEC-PERSISTENCE.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`, `SPEC-TESTY.md`, `SPEC-MONOREPO.md`.  
**Poza zakresem tego pliku:** BC Company Context i Runs (plik `_2` / major Faza 3), pipeline Social (major Faza 4), auth produktowy i authz (major Faza 5), dashboard FE, Docker Compose production, PostgreSQL / V1 — rozbudowa.

**Pass rozwojowy (ten plik):** fail-fast env **przed** Prisma; envelope/`requestId` **przed** smoke LLM; metryki statusów runów czytają DB przy scrape (tabele z KROK 2), bez logiki BC Runs.

---

## Założenia

- Stack z projektu: NestJS `^11`, Prisma `^6` + `prisma-client-js` (nie generator Prisma 7), Zod `^3`, Pino/`nestjs-pino`, `@nestjs/config`, class-validator, Swagger `/docs`, port api **3001**.
- Silnik DB MVP: **wyłącznie SQLite** (`SPEC-PERSISTENCE.md` P-6). Schema przenośna: String ID brandowane, **bez** `@db.*` (P-7). Enumy kontraktu w kolumnach jako `String` (wartości z `@content-chain/shared`).
- LLM wyłącznie przez port + adapter HTTP do gateway; **zakaz** importu źródeł `apps/ai-provider-gateway` (`SPEC-MONOREPO.md`).
- Authz cookie / role — **poza tym plikiem** (major Faza 5). `JWT_*` i tak są w fail-fast (B-1), mimo że nie są jeszcze używane do sesji.
- Powierzchnie HTTP błędów: envelope K-1 (`SPEC-KOMUNIKACJA.md`). Health bez wrażliwych danych (B-7).
- Testy: Jest + supertest; live vendor LLM **zakazany** na PR (`SPEC-TESTY.md` T-4). Smoke prawdziwego gateway za flagą env, poza CI PR.

**Biblioteki (Context7 / docs oficjalne):**

| Temat | Źródło | Ustalenie w tym planie |
|-------|--------|------------------------|
| Helmet | Context7 `/nestjs/docs.nestjs.com` — `app.use(helmet())` przed innymi `app.use` | `helmet` na Express adapter; CSP wyłączone poza `production`, żeby nie zepsuć Swagger `/docs` |
| Config validate | Context7 — `ConfigModule.forRoot({ validate })` | `validate` = `envSchema.parse` (Zod); rzut przy starcie = fail-fast |
| SSE | Context7 — `@Sse()` + `Observable<MessageEvent>` | **nie w tym pliku** (plik `_2`) |
| HTTP client | Context7 — `@nestjs/axios` + `axios` | adapter LLM |
| Prisma 6 | `package.json` `^6` + prisma.io models; fallback po redirect Context7 `/prisma/docs` | `provider = sqlite`, Migrate (nie sam `db push`), jeden `PrismaClient` |
| Prometheus | Context7 `/prometheus/client_js` — `Counter`/`Histogram`/`Gauge`, `collectDefaultMetrics({ prefix })`, `register.metrics()`, `Content-Type: register.contentType` | pakiet npm **`prom-client`** (API zgodne; import `prom-client` nie `@prometheus/client`); **bez** ClusterRegistry (api = jeden proces) |

Przy konflikcie praktyki z internetu ze SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Fundament runtime backendu

Odpowiada major **Faza 2**.

---

### KROK 1 — Fail-fast env i typowana konfiguracja

**Status:** `WYKONANY`

**Cel:** Proces `apps/api` nie wstaje przy braku krytycznych zmiennych (B-1, major 2.2 — **przesunięte rozwojowo przed Prisma**). Odwołanie: `SPEC-BEZPIECZENSTWO.md` B-1/B-2, `docs/deployment.md`, `docs/security.md`.

**Artefakty:**

- nowy: `apps/api/src/shared/config/env.schema.ts`
- nowy: `apps/api/src/shared/config/env.schema.spec.ts`
- nowy: `apps/api/src/shared/config/env.ts`
- nowy: `apps/api/src/shared/config/env.module.ts`
- refaktor: `apps/api/src/app.module.ts`
- refaktor: `apps/api/.env.example`
- refaktor: `apps/api/package.json` (Jest config + skrypty test)

**Implementacja:**

**Nowy plik:** `apps/api/src/shared/config/env.schema.ts`

```typescript
import { z } from 'zod';

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().int().positive().default(3001),
    DATABASE_URL: z.string().min(1),
    GATEWAY_BASE_URL: z.string().url(),
    GATEWAY_KEY: z.string().min(1),
    GATEWAY_MODEL_ALIAS: z.string().min(1).default('chat-default'),
    JWT_SECRET: z.string().min(1),
    JWT_ACCESS_TTL: z.string().min(1).default('15m'),
    JWT_REFRESH_TTL: z.string().min(1).default('7d'),
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

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}

export function parseCorsOrigins(corsOrigin: string): string[] {
  return corsOrigin
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter((item) => item.length > 0);
}
```

**Nowy plik:** `apps/api/src/shared/config/env.ts`

```typescript
import type { Env } from './env.schema';

export const ENV = 'ENV';

export type { Env };
```

**Nowy plik:** `apps/api/src/shared/config/env.module.ts`

Token `ENV` musi być widoczny w importowanych modułach (m.in. pod KROK 4 — `@Inject(ENV)` w adapterze LLM). Provider **nie** zostaje lokalnie w `AppModule.providers` (tam nie jest eksportowany do dzieci).

```typescript
import { Global, Module } from '@nestjs/common';
import { ENV } from './env';
import { validateEnv } from './env.schema';

@Global()
@Module({
  providers: [
    {
      provide: ENV,
      useFactory: () => validateEnv(process.env as Record<string, unknown>),
    },
  ],
  exports: [ENV],
})
export class EnvModule {}
```

**Nowy plik:** `apps/api/src/shared/config/env.schema.spec.ts`

Pokrycie DoD: brak każdej z krytycznych zmiennych (`DATABASE_URL`, `GATEWAY_BASE_URL`, `GATEWAY_KEY`, `JWT_SECRET`, `CORS_ORIGIN`) → `validateEnv` rzuca.

```typescript
import { parseCorsOrigins, validateEnv } from './env.schema';

const valid = {
  NODE_ENV: 'development',
  PORT: '3001',
  DATABASE_URL: 'file:./chain.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'change-me-gateway-key',
  JWT_SECRET: 'change-me-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
};

describe('validateEnv', () => {
  it('parses a complete env object', () => {
    const env = validateEnv(valid);
    expect(env.PORT).toBe(3001);
    expect(env.MAX_CONCURRENT_RUNS).toBe(3);
    expect(env.GATEWAY_MODEL_ALIAS).toBe('chat-default');
  });

  it.each([
    'DATABASE_URL',
    'GATEWAY_BASE_URL',
    'GATEWAY_KEY',
    'JWT_SECRET',
    'CORS_ORIGIN',
  ] as const)('throws when %s is missing', (key) => {
    const { [key]: _, ...rest } = valid;
    expect(() => validateEnv(rest)).toThrow();
  });

  it('rejects CORS_ORIGIN=* in production', () => {
    expect(() =>
      validateEnv({ ...valid, NODE_ENV: 'production', CORS_ORIGIN: '*' }),
    ).toThrow();
  });
});

describe('parseCorsOrigins', () => {
  it('splits a comma-separated allowlist', () => {
    expect(
      parseCorsOrigins('http://localhost:3000, http://127.0.0.1:3000'),
    ).toEqual(['http://localhost:3000', 'http://127.0.0.1:3000']);
  });
});
```

**Refaktor:** `apps/api/src/app.module.ts`

Teraz:

```typescript
    ConfigModule.forRoot({ isGlobal: true }),
```

Zamień na fail-fast + globalny `EnvModule` (bez lokalnego providera `ENV` w `AppModule`):

```typescript
import { EnvModule } from './shared/config/env.module';
import { validateEnv } from './shared/config/env.schema';

// w imports:
ConfigModule.forRoot({
  isGlobal: true,
  validate: validateEnv,
}),
EnvModule,
```

`ConfigModule.validate` = fail-fast bootu. `EnvModule` = token `ENV` z już sparsowanym obiektem (bez sekretów w logach), injectable w całym `apps/api`. **Bez** `envFilePath` — domyślne ładowanie `.env` (zgodnie z `docs/deployment.md` / `.env.example`: kopia do `.env`).

**Refaktor:** `apps/api/.env.example`

Teraz: brak `GATEWAY_MODEL_ALIAS` i `MAX_CONCURRENT_RUNS`.

Dopisz (placeholdery, bez prawdziwych sekretów):

```dotenv
GATEWAY_MODEL_ALIAS=chat-default
MAX_CONCURRENT_RUNS=3
```

**Refaktor:** `apps/api/package.json` — dopisz konfigurację Jest (brak pliku `jest.config.*` w api) oraz skrypt e2e:

W `scripts` dodaj `"test:e2e": "jest --config ./test/jest-e2e.json"`.

Na końcu `package.json` dodaj:

```json
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
```

**Biblioteki:** `@nestjs/config` `validate` — Context7 NestJS configuration. Zod — już w `apps/api`.

**Testy:** `env.schema.spec.ts` jak wyżej (`it.each` dla krytycznych kluczy).

**DoD kroku:**

- Brak `DATABASE_URL` / `GATEWAY_KEY` / `JWT_SECRET` / `GATEWAY_BASE_URL` / `CORS_ORIGIN` → proces nie bootuje (Zod throw przy `ConfigModule`); unit pokrywa każdy z tych kluczy.
- `production` + `CORS_ORIGIN=*` → start odrzucony.
- Token `ENV` dostarcza `@Global()` `EnvModule` (`exports: [ENV]`); `AppModule` nie trzyma lokalnego providera `ENV`.
- `.env.example` ma placeholdery w tym `GATEWAY_MODEL_ALIAS` i `MAX_CONCURRENT_RUNS`; brak sekretów.
- `pnpm --filter api test` odpala Jest i przechodzi test schematu env.

---

### KROK 2 — Persistence MVP (schema, migracja, PrismaModule)

**Status:** `WYKONANY`

**Cel:** Kanoniczna SQLite pod BC z docs (user/sesja, kontekst, runy, logi, wyniki SM) bez logiki biznesowej. Domain/shared **nie** importują Prisma. Major 2.1, `SPEC-PERSISTENCE.md` P-1…P-8, `docs/architektura_katalogi_pliki.md`.

**Artefakty:**

- refaktor: `apps/api/prisma/schema.prisma`
- nowy: `apps/api/prisma/migrations/20260813120000_init_mvp/migration.sql` (timestamp może być z `prisma migrate dev`; treść SQL musi odpowiadać schema)
- nowy: `apps/api/prisma/migrations/migration_lock.toml`
- nowy: `apps/api/src/shared/persistence/prisma.service.ts`
- nowy: `apps/api/src/shared/persistence/prisma.module.ts`
- nowy: `apps/api/src/shared/persistence/prisma.service.spec.ts`
- refaktor: `apps/api/src/app.module.ts` (import `PrismaModule`)
- refaktor: `apps/api/package.json` (skrypty prisma)
- refaktor: `apps/api/.gitignore`

**Implementacja (kolejność):** schema → `prisma migrate dev` → `PrismaService` → moduł globalny.

**Refaktor:** `apps/api/prisma/schema.prisma`

Teraz: tylko `datasource` + `generator`, brak modeli.

Zamień całość na:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id              String           @id
  email           String           @unique
  passwordHash    String
  role            String
  isActive        Boolean          @default(true)
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  refreshSessions RefreshSession[]
  startedRuns     Run[]            @relation("RunStartedBy")
}

model RefreshSession {
  id        String   @id
  userId    String
  tokenHash String
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
}

model CompanyContext {
  id                  String   @id
  identityName        String   @default("")
  identityDescription String   @default("")
  offerItems          Json     @default("[]")
  voiceWeDo           String   @default("")
  voiceWeDont         String   @default("")
  ctaItems            Json     @default("[]")
  audienceProfiles    Json     @default("[]")
  extras              Json?
  updatedAt           DateTime @updatedAt
}

model Run {
  id               String           @id
  conversationId   String
  taskType         String
  platform         String
  language         String
  status           String
  brief            Json
  selectedIdeaIds  Json?
  startedByUserId  String?
  recoveryAttempts Int              @default(0)
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  startedBy        User?            @relation("RunStartedBy", fields: [startedByUserId], references: [id])
  logs             RunLog[]
  ideas            SocialIdea[]
  contents         SocialContent[]

  @@index([createdAt])
  @@index([status])
  @@index([taskType])
  @@index([platform])
  @@index([startedByUserId])
}

model RunLog {
  id             String   @id
  runId          String
  conversationId String?
  at             DateTime
  level          String
  message        String
  step           String?
  requestId      String?
  run            Run      @relation(fields: [runId], references: [id])

  @@index([runId, at])
}

model SocialIdea {
  id        String   @id
  runId     String
  payload   Json
  createdAt DateTime @default(now())
  run       Run      @relation(fields: [runId], references: [id])

  @@index([runId])
}

model SocialContent {
  id           String   @id
  runId        String
  payload      Json
  verification Json?
  createdAt    DateTime @default(now())
  run          Run      @relation(fields: [runId], references: [id])

  @@index([runId])
}
```

Uwagi normy:

- ID w kolumnach = brandowane stringi (`usr_…`, `run_…`, …) — aplikacja nadaje je przez `create*` z `@content-chain/shared`; **brak** `autoincrement`.
- Kolumny kontekstu **per sekcja bramki** (C-7 / fundament pod plik `_2`): `identity*`, `offerItems`, `voice*`, `ctaItems`, `audienceProfiles`; `extras` = opcjonalne poza bramką.
- Tabele `User` / `RefreshSession` / `SocialIdea` / `SocialContent` = fundament pod Fazy 4–5; **bez** use-case’ów w tym kroku.
- `Json` Prisma na SQLite jest przenośne do PostgreSQL (P-7); nie używać `@db.Text` itd.

**Nowy plik:** `apps/api/prisma/migrations/migration_lock.toml`

```toml
# Please do not edit this file manually
provider = "sqlite"
```

**Nowy plik:** `apps/api/prisma/migrations/20260813120000_init_mvp/migration.sql`

Przy implementacji **preferuj** wygenerowany SQL z `prisma migrate dev --name init_mvp` (musi trafić do repo — P-1). Poniżej kanoniczny odpowiednik (SQLite, bez natywnych enumów):

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "RefreshSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "RefreshSession_userId_idx" ON "RefreshSession"("userId");

CREATE TABLE "CompanyContext" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identityName" TEXT NOT NULL DEFAULT '',
    "identityDescription" TEXT NOT NULL DEFAULT '',
    "offerItems" TEXT NOT NULL DEFAULT '[]',
    "voiceWeDo" TEXT NOT NULL DEFAULT '',
    "voiceWeDont" TEXT NOT NULL DEFAULT '',
    "ctaItems" TEXT NOT NULL DEFAULT '[]',
    "audienceProfiles" TEXT NOT NULL DEFAULT '[]',
    "extras" TEXT,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "selectedIdeaIds" TEXT,
    "startedByUserId" TEXT,
    "recoveryAttempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Run_startedByUserId_fkey" FOREIGN KEY ("startedByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "Run_createdAt_idx" ON "Run"("createdAt");
CREATE INDEX "Run_status_idx" ON "Run"("status");
CREATE INDEX "Run_taskType_idx" ON "Run"("taskType");
CREATE INDEX "Run_platform_idx" ON "Run"("platform");
CREATE INDEX "Run_startedByUserId_idx" ON "Run"("startedByUserId");

CREATE TABLE "RunLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "conversationId" TEXT,
    "at" DATETIME NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "step" TEXT,
    "requestId" TEXT,
    CONSTRAINT "RunLog_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "RunLog_runId_at_idx" ON "RunLog"("runId", "at");

CREATE TABLE "SocialIdea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialIdea_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "SocialIdea_runId_idx" ON "SocialIdea"("runId");

CREATE TABLE "SocialContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "verification" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialContent_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "SocialContent_runId_idx" ON "SocialContent"("runId");
```

**Nowy plik:** `apps/api/src/shared/persistence/prisma.service.ts`

```typescript
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await this.$connect();
    await this.$queryRawUnsafe('PRAGMA journal_mode=WAL;');
    await this.$queryRawUnsafe('PRAGMA busy_timeout=5000;');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
```

WAL/`busy_timeout` = decyzja implementacyjna poza sztywną normą SPEC (współbieżność runów); nie przenosi reguł domeny do SQL.

**Nowy plik:** `apps/api/src/shared/persistence/prisma.module.ts`

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

**Nowy plik:** `apps/api/src/shared/persistence/prisma.service.spec.ts`

```typescript
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('is a PrismaClient subclass', () => {
    const service = new PrismaService();
    expect(service).toBeInstanceOf(PrismaService);
  });
});
```

**Refaktor:** `apps/api/src/app.module.ts` — dodaj `PrismaModule` do `imports`.

**Refaktor:** `apps/api/package.json` `scripts`:

```json
"prisma:generate": "prisma generate",
"prisma:migrate": "prisma migrate dev",
"prisma:migrate:deploy": "prisma migrate deploy"
```

Dopisz `"postinstall": "prisma generate"` **albo** wywołanie `prisma generate` w `build` — klient musi istnieć przed `nest build`. Nie commituj wygenerowanego `node_modules/.prisma`.

**Refaktor:** `apps/api/.gitignore`

Teraz: `.env`

Zamień na:

```gitignore
.env
*.db
*.db-journal
*.db-wal
*.db-shm
```

**Zakaz:** import `@prisma/client` w `domain/` (jeszcze nie istnieje logika BC) oraz w `packages/shared`. Adaptery BC w pliku `_2` będą jedynymi konsumentami `PrismaService` poza `shared/persistence` i metrykami.

**Biblioteki:** Prisma Migrate — obowiązkowe (P-1); nie opierać MVP na samym `db push`.

**DoD kroku:**

- `provider = sqlite`; migracja w repo; `prisma migrate deploy` na pustym pliku SQLite tworzy tabele.
- Jeden `PrismaClient` przez `PrismaModule`.
- Żaden plik poza `shared/persistence` (+ później `*/infrastructure`) nie importuje `@prisma/client`.
- Aplikacja wstaje z `DATABASE_URL=file:./chain.db` po migracji.

---

### KROK 3 — Powierzchnia HTTP: requestId, envelope, ValidationPipe, Helmet, CORS, health

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Stabilny kontrakt błędów i health oraz startowe zabezpieczenia procesu. Major 2.2 (reszta po fail-fast z KROK 1). `SPEC-KOMUNIKACJA.md` K-1/K-8, `SPEC-BEZPIECZENSTWO.md` B-3/B-4/B-7, `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- nowy: `apps/api/src/shared/http/new-ids.ts`
- nowy: `apps/api/src/shared/http/request-id.middleware.ts`
- nowy: `apps/api/src/shared/http/express.d.ts`
- nowy: `apps/api/src/shared/http/error-envelope.ts`
- nowy: `apps/api/src/shared/http/domain.exception.ts`
- nowy: `apps/api/src/shared/http/http-exception.filter.ts`
- nowy: `apps/api/src/shared/http/http-exception.filter.spec.ts`
- nowy: `apps/api/src/shared/health/health.controller.ts`
- nowy: `apps/api/src/shared/health/health.module.ts`
- nowy: `apps/api/test/setup-env.ts`
- nowy: `apps/api/test/health.e2e-spec.ts`
- refaktor: `apps/api/src/main.ts`
- refaktor: `apps/api/src/app.module.ts`
- refaktor: `apps/api/package.json` (deps: `helmet`, `supertest`, `@types/supertest`)
- refaktor: `apps/api/test/jest-e2e.json`
- refaktor: `apps/api/test/app.e2e-spec.ts` (env setup / nie bootować bez env)

**Implementacja (kolejność):** `new-ids` → middleware → exception + filter → health → `main.ts` (pipe, helmet, cors) → e2e.

**Nowy plik:** `apps/api/src/shared/http/new-ids.ts`

Generatory ID **w api** (nie w `packages/shared` — M-5: shared bez zbędnego runtime). Walidacja wzorca przez istniejące `create*` z kontraktu.

```typescript
import { randomUUID } from 'node:crypto';
import {
  createConversationId,
  createRequestId,
  createRunId,
  createUserId,
  type ConversationId,
  type RequestId,
  type RunId,
  type UserId,
} from '@content-chain/shared';

export const newRequestId = (): RequestId => createRequestId(`req_${randomUUID()}`);
export const newConversationId = (): ConversationId =>
  createConversationId(`conv_${randomUUID()}`);
export const newRunId = (): RunId => createRunId(`run_${randomUUID()}`);
export const newUserId = (): UserId => createUserId(`usr_${randomUUID()}`);
```

**Nowy plik:** `apps/api/src/shared/http/express.d.ts`

```typescript
import type { RequestId } from '@content-chain/shared';

declare module 'express-serve-static-core' {
  interface Request {
    requestId?: RequestId;
  }
}
```

**Nowy plik:** `apps/api/src/shared/http/request-id.middleware.ts`

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { newRequestId } from './new-ids';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = newRequestId();
    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  }
}
```

Klient **nie** musi przysyłać `x-request-id`; api **zawsze** nadaje własne (docs brand types).

**Nowy plik:** `apps/api/src/shared/http/error-envelope.ts`

```typescript
import type { RequestId } from '@content-chain/shared';

export type ErrorEnvelope = {
  code: string;
  message: string;
  requestId: RequestId;
  details: unknown[];
};
```

**Nowy plik:** `apps/api/src/shared/http/domain.exception.ts`

```typescript
export class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly httpStatus: number,
    public readonly details: unknown[] = [],
  ) {
    super(message);
    this.name = 'DomainException';
  }
}
```

Kody z `docs/dictionary.md` / komunikacji: `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_FAILED`, `CONTEXT_INCOMPLETE`, `HITL_REQUIRED`, `RUN_NOT_FOUND`, `CONFLICT`, `INTERNAL_ERROR`. W tym kroku filter mapuje je, gdy zostaną rzucone; use-case’y kontekstu/runów — plik `_2`.

**Nowy plik:** `apps/api/src/shared/http/http-exception.filter.ts`

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { DomainException } from './domain.exception';
import type { ErrorEnvelope } from './error-envelope';
import { newRequestId } from './new-ids';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.requestId ?? newRequestId();

    const envelope = this.toEnvelope(exception, requestId);
    const status = this.toStatus(exception);

    if (status >= 500) {
      this.logger.error(
        { requestId, code: envelope.code },
        exception instanceof Error ? exception.message : 'unhandled',
      );
    }

    response.status(status).json(envelope);
  }

  private toStatus(exception: unknown): number {
    if (exception instanceof DomainException) {
      return exception.httpStatus;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private toEnvelope(exception: unknown, requestId: ErrorEnvelope['requestId']): ErrorEnvelope {
    if (exception instanceof DomainException) {
      return {
        code: exception.code,
        message: exception.message,
        requestId,
        details: exception.details,
      };
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      const details = this.validationDetails(payload);
      return {
        code: status === 400 ? 'VALIDATION_FAILED' : this.codeFromHttp(status),
        message: this.messageFromHttp(payload, exception.message),
        requestId,
        details,
      };
    }
    return {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      requestId,
      details: [],
    };
  }

  private codeFromHttp(status: number): string {
    if (status === 401) return 'UNAUTHORIZED';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    if (status === 409) return 'CONFLICT';
    return 'INTERNAL_ERROR';
  }

  private messageFromHttp(payload: string | object, fallback: string): string {
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && 'message' in payload) {
      const message = (payload as { message: string | string[] }).message;
      if (Array.isArray(message)) return message.join('; ');
      if (typeof message === 'string') return message;
    }
    return fallback;
  }

  private validationDetails(payload: string | object): unknown[] {
    if (typeof payload === 'object' && payload && 'message' in payload) {
      const message = (payload as { message: unknown }).message;
      if (Array.isArray(message)) return message.map((item) => ({ message: item }));
    }
    return [];
  }
}
```

Filter **nie** wstawia `X-Gateway-Key`, JWT ani haseł do `message` / `details`.

`RUN_NOT_FOUND` (`docs/dictionary.md`) **wyłącznie** z `DomainException` w BC Runs (nieznany `runId`). Goły HTTP 404 (nieznana ścieżka / `NotFoundException`) → kod `NOT_FOUND` (poziom routera; nie mylić z runem). Status HTTP zostaje 404.

**Nowy plik:** `apps/api/src/shared/http/http-exception.filter.spec.ts`

```typescript
import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { DomainException } from './domain.exception';
import { HttpExceptionFilter } from './http-exception.filter';
import { createRequestId } from '@content-chain/shared';

const requestId = createRequestId('req_123e4567-e89b-12d3-a456-426614174000');

function hostWith(statusSink: { statusCode?: number; body?: unknown }): ArgumentsHost {
  const response = {
    status(code: number) {
      statusSink.statusCode = code;
      return this;
    },
    json(body: unknown) {
      statusSink.body = body;
      return this;
    },
  };
  return {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({ requestId }),
    }),
  } as ArgumentsHost;
}

describe('HttpExceptionFilter', () => {
  const filter = new HttpExceptionFilter();

  it('maps DomainException to the K-1 envelope', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(
      new DomainException('CONTEXT_INCOMPLETE', 'Company context gate is not satisfied', 409, [
        { section: 'offer' },
      ]),
      hostWith(sink),
    );
    expect(sink.statusCode).toBe(409);
    expect(sink.body).toEqual({
      code: 'CONTEXT_INCOMPLETE',
      message: 'Company context gate is not satisfied',
      requestId,
      details: [{ section: 'offer' }],
    });
  });

  it('maps ValidationPipe-style HttpException to VALIDATION_FAILED', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(new BadRequestException(['brief should not be empty']), hostWith(sink));
    expect(sink.statusCode).toBe(400);
    expect((sink.body as { code: string }).code).toBe('VALIDATION_FAILED');
    expect((sink.body as { requestId: string }).requestId).toBe(requestId);
  });

  it('does not map a generic HTTP 404 to RUN_NOT_FOUND', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(new NotFoundException(), hostWith(sink));
    expect(sink.statusCode).toBe(404);
    expect((sink.body as { code: string }).code).toBe('NOT_FOUND');
    expect((sink.body as { code: string }).code).not.toBe('RUN_NOT_FOUND');
  });
});
```

**Nowy plik:** `apps/api/src/shared/health/health.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Liveness of apps/api' })
  @ApiOkResponse({ description: 'Process is alive' })
  liveness(): { status: 'healthy'; timestamp: string } {
    return { status: 'healthy', timestamp: new Date().toISOString() };
  }
}
```

Bez `DATABASE_URL`, bez kluczy, bez listy env.

**Nowy plik:** `apps/api/src/shared/health/health.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
```

**Refaktor:** `apps/api/src/app.module.ts`

- `imports`: dodaj `HealthModule`.
- Zaimplementuj `NestModule.configure` z `RequestIdMiddleware` dla `*`.
- `providers`: dodaj `{ provide: APP_FILTER, useClass: HttpExceptionFilter }`.

**Refaktor:** `apps/api/src/main.ts`

Teraz: brak Helmet, CORS, ValidationPipe.

Zamień ciało `bootstrap` na (zachowaj Pino, prefix, Swagger `/docs`, port z config):

```typescript
import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { parseCorsOrigins } from './shared/config/env.schema';
import type { Env } from './shared/config/env.schema';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<Env['NODE_ENV']>('NODE_ENV', 'development');
  const corsOrigin = configService.getOrThrow<string>('CORS_ORIGIN');
  const port = configService.get<number>('PORT', 3001);

  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    }),
  );
  app.enableCors({
    origin: parseCorsOrigins(corsOrigin),
    credentials: true,
  });
  app.setGlobalPrefix('api/v1', { exclude: ['metrics', 'docs', 'docs-json'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Content Chain API')
    .setDescription('HTTP API - DX OpenAPI')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
}
void bootstrap();
```

Uwagi:

- Helmet **przed** innymi `app.use` (Context7 Nest helmet).
- CSP off poza production — Swagger UI `/docs` wymaga inline/skryptów; w production CSP zostaje default Helmet (docs DX nie jest kontraktem FE).
- CORS: allowlista z env + `credentials: true`; **zakaz** `origin: '*'` + credentials w production (już w KROK 1).
- Prefix: health pod `/api/v1/health`; `/metrics` i `/docs` poza prefiksem produktowym.

**Nowy plik:** `apps/api/test/setup-env.ts`

```typescript
process.env.NODE_ENV ??= 'test';
process.env.PORT ??= '3001';
process.env.DATABASE_URL ??= 'file:./test.db';
process.env.GATEWAY_BASE_URL ??= 'http://127.0.0.1:3100';
process.env.GATEWAY_KEY ??= 'test-gateway-key';
process.env.GATEWAY_MODEL_ALIAS ??= 'chat-default';
process.env.JWT_SECRET ??= 'test-jwt-secret';
process.env.JWT_ACCESS_TTL ??= '15m';
process.env.JWT_REFRESH_TTL ??= '7d';
process.env.CORS_ORIGIN ??= 'http://localhost:3000';
process.env.MAX_CONCURRENT_RUNS ??= '3';
```

**Refaktor:** `apps/api/test/jest-e2e.json` — dodaj `"setupFiles": ["<rootDir>/setup-env.ts"]`.

**Nowy plik:** `apps/api/test/health.e2e-spec.ts`

```typescript
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health returns liveness without secrets', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    expect(response.body.status).toBe('healthy');
    expect(typeof response.body.timestamp).toBe('string');
    expect(JSON.stringify(response.body)).not.toMatch(/GATEWAY_KEY|JWT_SECRET|password/i);
    expect(response.headers['x-request-id']).toMatch(/^req_/);
  });
});
```

`createNestApplication()` **nie** odtwarza `main.ts`. **Wymagane:** `configureHttpApp` w `apps/api/src/shared/http/configure-http-app.ts` — wołana z `main.ts` i z e2e.

**Nowy plik:** `apps/api/src/shared/http/configure-http-app.ts`

```typescript
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { parseCorsOrigins } from '../config/env.schema';
import type { Env } from '../config/env.schema';

export function configureHttpApp(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<Env['NODE_ENV']>('NODE_ENV', 'development');
  const corsOrigin = configService.getOrThrow<string>('CORS_ORIGIN');

  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === 'production' ? undefined : false,
    }),
  );
  app.enableCors({
    origin: parseCorsOrigins(corsOrigin),
    credentials: true,
  });
  app.setGlobalPrefix('api/v1', { exclude: ['metrics', 'docs', 'docs-json'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
```

`main.ts` woła `configureHttpApp(app)` + Swagger + `listen`. Filter: **tylko** `{ provide: APP_FILTER, useClass: HttpExceptionFilter }` w `AppModule` — **bez** `useGlobalFilters` w `configureHttpApp` (żeby nie dublować). Middleware `RequestIdMiddleware` zostaje w `AppModule.configure` (działa w e2e).

**Refaktor `package.json` api — zależności:**

```text
pnpm --filter api add helmet @nestjs/axios axios
pnpm --filter api add -D supertest @types/supertest
```

(`@nestjs/axios` / `axios` są na KROK 4; wolno dodać już tutaj, by nie rozbijać lockfile dwa razy.)

**DoD kroku:**

- Błąd HTTP ma `{ code, message, requestId, details }` i `x-request-id` w formacie `req_<uuid>`.
- `GET /api/v1/health` → `200` `{ status: "healthy", timestamp }` bez sekretów.
- Helmet ustawia security headers; CORS czyta allowlistę z env + credentials.
- ValidationPipe: nieznane pola → `400` `VALIDATION_FAILED`.
- Swagger nadal pod `/docs` (nie pod `/api`).

---

### KROK 4 — Port LLM, adapter HTTP, smoke z gateway

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Api woła modele wyłącznie przez port + adapter do lokalnego gateway. Major 2.3, `SPEC-KOMUNIKACJA.md` K-5/K-6/K-7, `docs/dokumentacja_komunikacji.md` powierzchnia 2, `docs/architektura.md`.

**Artefakty:**

- nowy: `apps/api/src/shared/llm/llm-gateway.port.ts`
- nowy: `apps/api/src/shared/llm/llm-gateway.types.ts`
- nowy: `apps/api/src/shared/llm/llm-gateway.errors.ts`
- nowy: `apps/api/src/shared/llm/llm-gateway.http.adapter.ts`
- nowy: `apps/api/src/shared/llm/llm-gateway.http.adapter.spec.ts`
- nowy: `apps/api/src/shared/llm/llm.module.ts`
- nowy: `apps/api/src/shared/llm/llm.tokens.ts`
- nowy: `apps/api/test/smoke-gateway.e2e-spec.ts`
- refaktor: `apps/api/src/app.module.ts`

**Implementacja:**

**Nowy plik:** `apps/api/src/shared/llm/llm.tokens.ts`

```typescript
export const LLM_GATEWAY_PORT = Symbol('LLM_GATEWAY_PORT');
```

**Nowy plik:** `apps/api/src/shared/llm/llm-gateway.types.ts`

```typescript
import type { ConversationId, GatewayModelAlias, RequestId } from '@content-chain/shared';

export type LlmChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LlmChatParams = {
  temperature?: number;
  maxOutputTokens?: number;
};

export type LlmChatCommand = {
  modelAlias: GatewayModelAlias;
  conversationId: ConversationId;
  messages: LlmChatMessage[];
  params?: LlmChatParams;
};

export type LlmUsage = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

export type LlmChatResult = {
  text: string;
  requestId: RequestId;
  conversationId: ConversationId;
  model: string;
  usage?: LlmUsage;
  finishReason?: string;
};
```

**Nowy plik:** `apps/api/src/shared/llm/llm-gateway.errors.ts`

```typescript
export class LlmGatewayError extends Error {
  constructor(
    message: string,
    public readonly gatewayCode: string | undefined,
    public readonly gatewayRequestId: string | undefined,
    public readonly retryable: boolean,
    public readonly details: unknown[] = [],
  ) {
    super(message);
    this.name = 'LlmGatewayError';
  }
}
```

`message` **nie** zawiera wartości `GATEWAY_KEY`. `retryable = true` dla `RATE_LIMITED` / `PROVIDER_RATE_LIMITED` / `PROVIDER_TIMEOUT` / `PROVIDER_UNAVAILABLE`; `false` dla `GATEWAY_KEY_*`, `MODEL_ALIAS_NOT_FOUND`, `VALIDATION_FAILED`, `MODEL_NOT_ALLOWED`, `PROVIDER_AUTH_FAILED`, `PROVIDER_UNSUPPORTED`, `GATEWAY_KEY_NOT_CONFIGURED`, `TOOLS_NOT_SUPPORTED`, `THINKING_NOT_SUPPORTED`, `INTERNAL_SERVER_ERROR` (pełna lista kodów: `docs/dictionary.md`).

**Nowy plik:** `apps/api/src/shared/llm/llm-gateway.port.ts`

```typescript
import type { LlmChatCommand, LlmChatResult } from './llm-gateway.types';

export interface LlmGatewayPort {
  chat(command: LlmChatCommand): Promise<LlmChatResult>;
}
```

**Nowy plik:** `apps/api/src/shared/llm/llm-gateway.http.adapter.ts`

```typescript
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { createRequestId, isRequestId, unbrand } from '@content-chain/shared';
import { ENV, type Env } from '../config/env';
import { LlmGatewayError } from './llm-gateway.errors';
import type { LlmGatewayPort } from './llm-gateway.port';
import type { LlmChatCommand, LlmChatResult } from './llm-gateway.types';

type GatewayChatResponse = {
  requestId: string;
  conversationId: string;
  model: string;
  output?: { type?: string; text?: string };
  usage?: { inputTokens?: number; outputTokens?: number; totalTokens?: number };
  finishReason?: string;
};

type GatewayErrorBody = {
  code?: string;
  message?: string;
  requestId?: string;
  details?: unknown[];
};

const RETRYABLE_CODES = new Set([
  'RATE_LIMITED',
  'PROVIDER_RATE_LIMITED',
  'PROVIDER_TIMEOUT',
  'PROVIDER_UNAVAILABLE',
]);

@Injectable()
export class LlmGatewayHttpAdapter implements LlmGatewayPort {
  constructor(
    private readonly http: HttpService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async chat(command: LlmChatCommand): Promise<LlmChatResult> {
    const url = `${this.env.GATEWAY_BASE_URL.replace(/\/$/, '')}/api/v1/chat`;
    try {
      const response = await firstValueFrom(
        this.http.post<GatewayChatResponse>(
          url,
          {
            modelAlias: unbrand(command.modelAlias),
            conversationId: unbrand(command.conversationId),
            messages: command.messages,
            ...(command.params ? { params: command.params } : {}),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Gateway-Key': this.env.GATEWAY_KEY,
            },
            validateStatus: (status) => status === 201,
          },
        ),
      );
      const body = response.data;
      if (!isRequestId(body.requestId)) {
        throw new LlmGatewayError(
          'Gateway chat failed (invalid requestId in response)',
          'VALIDATION_FAILED',
          undefined,
          false,
        );
      }
      const requestId = createRequestId(body.requestId);
      return {
        text: body.output?.text ?? '',
        requestId,
        conversationId: command.conversationId,
        model: body.model,
        usage: body.usage,
        finishReason: body.finishReason,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private mapError(error: unknown): LlmGatewayError {
    if (error instanceof LlmGatewayError) return error;
    if (error instanceof AxiosError) {
      const body = error.response?.data as GatewayErrorBody | undefined;
      const code = body?.code;
      const gatewayRequestId = body?.requestId;
      const retryable = code ? RETRYABLE_CODES.has(code) : false;
      const safeMessage = `Gateway chat failed (${code ?? error.code ?? 'UNKNOWN'})`;
      return new LlmGatewayError(safeMessage, code, gatewayRequestId, retryable, body?.details ?? []);
    }
    return new LlmGatewayError('Gateway chat failed (UNKNOWN)', undefined, undefined, false);
  }
}
```

Twarde reguły adaptera:

- **Nie** ustawiać nagłówka `x-request-id` (K-5).
- **Nie** logować `X-Gateway-Key` ani nie wkładać go do `LlmGatewayError.message`.
- `conversationId` w body = ten przekazany w komendzie (K-6); `requestId` hopu **z odpowiedzi** gateway.
- Rola `system` w `messages[]` jest zablokowana upstream — CC wysyła `user` / `assistant`.
- **Zakaz** SDK OpenAI/Anthropic w `apps/api`.
- Niepoprawny `requestId` w odpowiedzi gateway → `LlmGatewayError` non-retryable; **zakaz** `as RequestId`.
- `params` opcjonalnie przekazywane w body (warunkowo, gdy `command.params` jest obecne); gateway stosuje `allowOverrides` z YAML.
- `usage` i `finishReason` odczytywane z odpowiedzi i propagowane w `LlmChatResult` (opcjonalne).
- `details` z envelope błędu gateway propagowane w `LlmGatewayError.details` — do logu runu.

**Poza zakresem tego kroku (rozszerzenie Fazy 4):** rola `'tool'` w `LlmChatMessage`, pole `tooling` w `LlmChatCommand`, `toolCalls` w `LlmChatResult`, `metadata` w body. Gateway obsługuje te pola — adapter wymaga rozszerzenia w feature planie Fazy 4 (Social pipeline z function calling), gdy będą potrzebne.

**Nowy plik:** `apps/api/src/shared/llm/llm.module.ts`

```typescript
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LlmGatewayHttpAdapter } from './llm-gateway.http.adapter';
import { LLM_GATEWAY_PORT } from './llm.tokens';

@Module({
  imports: [HttpModule],
  providers: [{ provide: LLM_GATEWAY_PORT, useClass: LlmGatewayHttpAdapter }],
  exports: [LLM_GATEWAY_PORT],
})
export class LlmModule {}
```

**Refaktor:** `AppModule.imports` — dodaj `LlmModule`.

**Nowy plik:** `apps/api/src/shared/llm/llm-gateway.http.adapter.spec.ts`

```typescript
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosHeaders } from 'axios';
import { createConversationId, createGatewayModelAlias } from '@content-chain/shared';
import { LlmGatewayHttpAdapter } from './llm-gateway.http.adapter';
import { LlmGatewayError } from './llm-gateway.errors';
import type { Env } from '../config/env.schema';

const env = {
  GATEWAY_BASE_URL: 'http://127.0.0.1:3100',
  GATEWAY_KEY: 'super-secret-key',
} as Env;

const command = {
  modelAlias: createGatewayModelAlias('chat-default'),
  conversationId: createConversationId('conv_123e4567-e89b-12d3-a456-426614174000'),
  messages: [{ role: 'user' as const, content: 'ping' }],
};

describe('LlmGatewayHttpAdapter', () => {
  it('posts native chat without x-request-id and returns gateway requestId + usage', async () => {
    const post = jest.fn().mockReturnValue(
      of({
        data: {
          requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
          conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
          model: 'chat-default',
          output: { type: 'text', text: 'pong' },
          usage: { inputTokens: 5, outputTokens: 1, totalTokens: 6 },
          finishReason: 'stop',
        },
      }),
    );
    const adapter = new LlmGatewayHttpAdapter({ post } as unknown as HttpService, env);
    const result = await adapter.chat(command);
    expect(result.text).toBe('pong');
    expect(result.requestId).toBe('req_123e4567-e89b-12d3-a456-426614174000');
    expect(result.usage).toEqual({ inputTokens: 5, outputTokens: 1, totalTokens: 6 });
    expect(result.finishReason).toBe('stop');
    const [, , config] = post.mock.calls[0];
    expect(config.headers['X-Gateway-Key']).toBe('super-secret-key');
    expect(config.headers['x-request-id']).toBeUndefined();
    expect(post.mock.calls[0][0]).toBe('http://127.0.0.1:3100/api/v1/chat');
  });

  it('passes params to gateway body when present', async () => {
    const post = jest.fn().mockReturnValue(
      of({
        data: {
          requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
          conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
          model: 'chat-default',
          output: { type: 'text', text: 'ok' },
        },
      }),
    );
    const adapter = new LlmGatewayHttpAdapter({ post } as unknown as HttpService, env);
    await adapter.chat({ ...command, params: { temperature: 0.4, maxOutputTokens: 2048 } });
    const body = post.mock.calls[0][1];
    expect(body.params).toEqual({ temperature: 0.4, maxOutputTokens: 2048 });
  });

  it('omits params from gateway body when absent', async () => {
    const post = jest.fn().mockReturnValue(
      of({
        data: {
          requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
          conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
          model: 'chat-default',
          output: { type: 'text', text: 'ok' },
        },
      }),
    );
    const adapter = new LlmGatewayHttpAdapter({ post } as unknown as HttpService, env);
    await adapter.chat(command);
    const body = post.mock.calls[0][1];
    expect(body).not.toHaveProperty('params');
  });

  it('maps gateway errors without leaking the key and preserves details', async () => {
    const axiosError = new AxiosError('Request failed');
    axiosError.response = {
      status: 403,
      statusText: 'Forbidden',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: {
        code: 'GATEWAY_KEY_INVALID',
        message: 'nope',
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
        details: [{ reason: 'key not in allowlist' }],
      },
    };
    const post = jest.fn().mockReturnValue(throwError(() => axiosError));
    const adapter = new LlmGatewayHttpAdapter({ post } as unknown as HttpService, env);
    await expect(adapter.chat(command)).rejects.toEqual(expect.any(LlmGatewayError));
    try {
      await adapter.chat(command);
    } catch (error) {
      expect(error).toBeInstanceOf(LlmGatewayError);
      expect((error as LlmGatewayError).message).not.toContain('super-secret-key');
      expect((error as LlmGatewayError).retryable).toBe(false);
      expect((error as LlmGatewayError).gatewayCode).toBe('GATEWAY_KEY_INVALID');
      expect((error as LlmGatewayError).details).toEqual([{ reason: 'key not in allowlist' }]);
    }
  });
});
```

**Nowy plik:** `apps/api/test/smoke-gateway.e2e-spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { createConversationId, createGatewayModelAlias } from '@content-chain/shared';
import { AppModule } from '../src/app.module';
import { LLM_GATEWAY_PORT } from '../src/shared/llm/llm.tokens';
import type { LlmGatewayPort } from '../src/shared/llm/llm-gateway.port';

const enabled = process.env.SMOKE_GATEWAY === '1';

(enabled ? describe : describe.skip)('smoke api → gateway', () => {
  it('completes native chat through LlmGatewayPort', async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const port = moduleRef.get<LlmGatewayPort>(LLM_GATEWAY_PORT);
    const result = await port.chat({
      modelAlias: createGatewayModelAlias(process.env.GATEWAY_MODEL_ALIAS ?? 'chat-default'),
      conversationId: createConversationId(
        `conv_${crypto.randomUUID?.() ?? '123e4567-e89b-12d3-a456-426614174000'}`,
      ),
      messages: [{ role: 'user', content: 'Reply with the single word pong.' }],
    });
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.requestId.startsWith('req_')).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/X-Gateway-Key|GATEWAY_KEY/i);
    await moduleRef.close();
  });
});
```

Dla `createConversationId` w smoke: użyj `newConversationId()` z `shared/http/new-ids.ts` (prostsze niż ręczny UUID).

Smoke **nie** jest publicznym endpointem HTTP (brak w kontrakcie docs). Uruchomienie poza PR: gateway + api env, `SMOKE_GATEWAY=1 pnpm --filter api test:e2e -- smoke-gateway`.

**DoD kroku:**

- Brak importów TS `apps/api` → `apps/ai-provider-gateway`.
- Adapter woła `POST {GATEWAY_BASE_URL}/api/v1/chat` z `X-Gateway-Key`, bez `x-request-id`.
- Unit: sukces mapuje `requestId` z body; `usage` i `finishReason` propagowane z odpowiedzi gateway.
- Unit: `params` w komendzie → body zawiera `params`; brak `params` → body bez tego klucza.
- Unit: błąd 403 nie zawiera sekretu; `details` z envelope gateway propagowane w `LlmGatewayError.details`.
- `SMOKE_GATEWAY=1` przeciw uruchomionemu gateway kończy się tekstem + `req_…` (obserwowalne w asercji / logu procesu bez wycieku klucza).
- Na PR suite **nie** wymaga żywego vendora LLM (smoke skip).

---

### KROK 5 — Fundament metryk ops (`GET /metrics`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Minimalna ekspozycja Prometheus procesu api — bez alertów, bez mylenia z logami runu. Major 2.4, `docs/observability.md`, `SPEC-BEZPIECZENSTWO.md` B-8/B-9, `SPEC-KOMUNIKACJA.md` (ścieżka poza `/api/v1`).

**Artefakty:**

- nowy: `apps/api/src/shared/metrics/metrics.registry.ts`
- nowy: `apps/api/src/shared/metrics/metrics.service.ts`
- nowy: `apps/api/src/shared/metrics/http-metrics.interceptor.ts`
- nowy: `apps/api/src/shared/metrics/metrics.controller.ts`
- nowy: `apps/api/src/shared/metrics/metrics.module.ts`
- nowy: `apps/api/test/metrics.e2e-spec.ts`
- refaktor: `apps/api/src/app.module.ts`
- refaktor: `apps/api/package.json` (`prom-client`)
- refaktor: `apps/api/src/shared/llm/llm-gateway.http.adapter.ts` (inkrement błędów gateway)

**Implementacja:**

Zależność: `pnpm --filter api add prom-client`.

Prefiks nazw: `content_chain_` (docs). Labelki: **tylko** `method`, `route`, `status` — **zakaz** email, brief, prompt, `GATEWAY_KEY`.

**Nowy plik:** `apps/api/src/shared/metrics/metrics.registry.ts`

```typescript
import {
  collectDefaultMetrics,
  Counter,
  Gauge,
  Histogram,
  Registry,
} from 'prom-client';

export const metricsRegistry = new Registry();

collectDefaultMetrics({ register: metricsRegistry, prefix: 'content_chain_' });

export const httpRequestsTotal = new Counter({
  name: 'content_chain_http_requests_total',
  help: 'HTTP requests',
  labelNames: ['method', 'route', 'status'] as const,
  registers: [metricsRegistry],
});

export const httpRequestDurationSeconds = new Histogram({
  name: 'content_chain_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route'] as const,
  registers: [metricsRegistry],
});

export const processStartTimeSeconds = new Gauge({
  name: 'content_chain_process_start_time_seconds',
  help: 'Process start Unix timestamp',
  registers: [metricsRegistry],
});

processStartTimeSeconds.setToCurrentTime();

export const runsByStatus = new Gauge({
  name: 'content_chain_runs_by_status',
  help: 'Run counts by status (from canonical DB)',
  labelNames: ['status'] as const,
  registers: [metricsRegistry],
});

export const gatewayErrorsTotal = new Counter({
  name: 'content_chain_gateway_errors_total',
  help: 'Errors when calling ai-provider-gateway from api',
  labelNames: ['code'] as const,
  registers: [metricsRegistry],
});
```

`collectDefaultMetrics` z prefiksem pokrywa uptime/CPU/pamięć procesu (B-9 „uptime/process”). Osobny gauge startu = dodatkowy sygnał żywego procesu.

**Nowy plik:** `apps/api/src/shared/metrics/metrics.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { RUN_STATUSES } from '@content-chain/shared';
import { PrismaService } from '../persistence/prisma.service';
import { metricsRegistry, runsByStatus } from './metrics.registry';

@Injectable()
export class MetricsService {
  constructor(private readonly prisma: PrismaService) {}

  async render(): Promise<{ contentType: string; body: string }> {
    const grouped = await this.prisma.run.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts = new Map(grouped.map((row) => [row.status, row._count._all]));
    for (const status of RUN_STATUSES) {
      runsByStatus.set({ status }, counts.get(status) ?? 0);
    }
    return {
      contentType: metricsRegistry.contentType,
      body: await metricsRegistry.metrics(),
    };
  }
}
```

W KROK 2 tabele runów istnieją, więc gauge nie wymaga BC Runs. Brak sekretów w labelach.

**Nowy plik:** `apps/api/src/shared/metrics/http-metrics.interceptor.ts`

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { httpRequestDurationSeconds, httpRequestsTotal } from './metrics.registry';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const route = req.route?.path ?? req.path ?? 'unknown';
    if (route === '/metrics' || route === 'metrics') return next.handle();
    const end = httpRequestDurationSeconds.startTimer({ method: req.method, route });
    return next.handle().pipe(
      tap(() => {
        end();
        httpRequestsTotal.inc({
          method: req.method,
          route,
          status: String(res.statusCode),
        });
      }),
    );
  }
}
```

**Nowy plik:** `apps/api/src/shared/metrics/metrics.controller.ts`

```typescript
import { Controller, Get, Header, Res } from '@nestjs/common';
import type { Response } from 'express';
import { MetricsService } from './metrics.service';

@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get('metrics')
  @Header('Cache-Control', 'no-store')
  async metricsEndpoint(@Res() res: Response): Promise<void> {
    const snapshot = await this.metrics.render();
    res.setHeader('Content-Type', snapshot.contentType);
    res.status(200).send(snapshot.body);
  }
}
```

Kontroler **bez** prefiksu `api/v1` dzięki `exclude: ['metrics']` w `configureHttpApp`. Nie dodawać `@Controller('metrics')` pod global prefix.

**Nowy plik:** `apps/api/src/shared/metrics/metrics.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpMetricsInterceptor } from './http-metrics.interceptor';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: HttpMetricsInterceptor },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
```

**Refaktor adaptera LLM** (`llm-gateway.http.adapter.ts`) — w `mapError` przed `return`:

```typescript
gatewayErrorsTotal.inc({ code: code ?? 'UNKNOWN' });
```

Import `gatewayErrorsTotal` z `metrics.registry`. Label = kod gateway (`RATE_LIMITED`, …), **nie** URL z kluczem.

**Refaktor:** `AppModule.imports` — `MetricsModule`.

**Nowy plik:** `apps/api/test/metrics.e2e-spec.ts`

```typescript
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

describe('Metrics (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /metrics exposes process HTTP and run gauges without secrets', async () => {
    await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    const response = await request(app.getHttpServer()).get('/metrics').expect(200);
    expect(response.text).toContain('content_chain_http_requests_total');
    expect(response.text).toContain('content_chain_http_request_duration_seconds');
    expect(response.text).toContain('content_chain_runs_by_status');
    expect(response.text).toContain('content_chain_gateway_errors_total');
    expect(response.text).not.toMatch(/change-me-gateway-key|JWT_SECRET|password=/i);
  });
});
```

**DoD kroku:**

- `GET /metrics` (poza `/api/v1`) zwraca tekst Prometheus: HTTP (licznik + latencja), process/default, `runs_by_status`, błędy gateway.
- Brak sekretów i treści promptów w metrykach/labelach.
- Brak wymogu Grafana/alertów w tym majorze.

---

## Weryfikacja wycinka (ten plik)

- [ ] Schema SQLite + migracja w `apps/api/prisma/`; jeden `PrismaClient`.
- [ ] Fail-fast krytycznych env; Helmet; CORS z env + credentials; envelope K-1; health bez sekretów.
- [ ] Port LLM + adapter native chat; smoke za `SMOKE_GATEWAY=1`; PR bez live vendorów.
- [ ] `/metrics` fundament B-9.
- [ ] Brak logiki Company Context / Runs / Social / Auth (poza tabelami fundamentu).
- [ ] Nagłówki wyłącznie `FAZA 1` / `KROK 1`…`KROK 5`.
- [ ] Statusy kroków z trójki; startowo `NIE_ROZPOCZĘTY`.
- [ ] Major nietknięty.

---

## Ślad do major (informacyjnie, po późniejszej implementacji)

Ten skill **nie** zmienia major. Po implementacji tego pliku (ręcznie / `/feature-implementation`):

| Element major | Oczekiwany status |
|---------------|-------------------|
| Faza 2 | `WYKONANY` |
| Kroki 2.1, 2.2, 2.3, 2.4 | `WYKONANY` |
| MILESTONE 2 | `OSIĄGNIĘTY` (po akceptacji DoD milestone) |

Faza 3 / MILESTONE 3 — plik `_2`, nie ten.
