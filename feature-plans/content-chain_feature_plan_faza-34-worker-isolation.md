# Content Chain — feature plan: izolacja workera (Faza 34)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-34-worker-isolation.md`  
**Kotwica major:** Faza 34 w `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 34).  
**Refaktor względem:** Faza 3.2 / 7 / 8 / 12 / 29 (historia `WYKONANY`) — in-process worker, abort mapa, SSE hub, recovery/sweep w `apps/api`.  
**Prereq kodu:** Faza 30 PostgreSQL (`WYKONANY`).  
**Źródła:** `docs/architektura.md`, `docs/dictionary.md`, `docs/data_flow.md`, `docs/deployment.md`, `docs/architektura_katalogi_pliki.md`, `docs/anty_patterny.md`, `docs/testy.md`, `docs/observability.md`, `SPEC-RUNY.md` R-4/R-4a/R-5/R-6/R-9/R-10/R-11, `SPEC-MONOREPO.md` M-1/M-9/M-10, `SPEC-KOMUNIKACJA.md` K-2e/K-3, `SPEC-PERSISTENCE.md` P-6b/P-10, `SPEC-TESTY.md` D-9/D-9b/D-10/D-14/D-30…D-34/D-35…D-40.  
**Pass rozwojowy:** porty/kontrakty + hub (hydrate `run.log`) **przed** pumpem workera; wycięcie `InProcessRunWorker` z api **po** handlerach; **atomic cut** na deploy; Compose **na końcu**; unit w każdym KROK kodu; audyt unit → e2e.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 34: `apps/worker` + pg-boss + most SSE PG NOTIFY + abort `run.abort` + recovery/sweep na workerze + Compose `worker` |
| Major | Faza 34 → po implementacji `WYKONANY`; kroki 34.1–34.5 → `WYKONANY`; **bez** MILESTONE 34 |
| Poza zakresem | Major FE; BullMQ/Redis most; worker per BC; extract `packages/*` jako prereq dnia 1; wariant HITL B/C; disconnect→hop gateway; dual-deploy AWS |
| Po implementacji (informacyjnie) | Major Faza 34 / 34.1–34.5 → `WYKONANY`. Brak `OSIĄGNIĘTY`. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 34.1 topologia / `apps/worker` | FAZA 1 / KROK 1 | pakiet + bootstrap |
| 34.2 kolejka / claim / HITL-A / `{ runId }` | FAZA 1 / KROK 2 + FAZA 2 / KROK 2–3 | kontrakt + handlery + api enqueue |
| 34.3 SSE NOTIFY + adaptery hub | FAZA 1 / KROK 3 | rename + NOTIFY-only + LISTEN + hydrate `run.log` |
| 34.4 abort + recovery + sweep | FAZA 2 / KROK 1 (+ 2–3) | registry w workerze; api bez pump/sweep |
| 34.5 Compose `worker` | FAZA 3 / KROK 1 | usługa + env + DX |
| (regresja) | FAZA 3 / KROK 2–3 | audyt unit + e2e/Postman |

**Pass rozwojowy (sesja planu):**

1. Kontrakty job/NOTIFY + porty **przed** adapterami i pumpem.
2. Rename hub + LISTEN/NOTIFY (hydrate `run.log`) **przed** execute w osobnym procesie.
3. AbortRegistry + recovery + sweep na workerze **przed** pełnym drain/pg-boss work.
4. Handlery pg-boss **przed** usunięciem `InProcessRunWorker` z api.
5. Compose **po** wire; audyt unit **przed** e2e/Postman.
6. **Brak przesunięć między fazami major.**
7. **D1 — atomic cut:** kolejność K1→K3 = pisanie kodu; **DoD środowiska / deploy** = brak middle state (albo stary in-process w api, albo pełny split). Nie wolno zostawić: worker execute + api lokalny `RunAbortRegistry` / dual recovery.

**Decyzje HOW (wire):**

| Temat | Wartość |
|-------|---------|
| Kolejki pg-boss | `run.wake`, `run.execute` |
| Payload obu | `{ runId }` (string) → `createRunId` + load `Run` z DB; **zakaz** snapshotu rekordu |
| Kanał SSE NOTIFY | `cc_run_sse` |
| Koperta SSE (hybrid) | `{ kind: 'publish'; event: Exclude<RunSseEvent, { event: 'run.log' }> } \| { kind: 'publish-log'; logId: string; runId: string } \| { kind: 'complete'; runId: string }` — **„pełny zakres”** = każdy **rodzaj** eventu z workera idzie mostem; dla `run.log` treść SSE składa api z DB (NOTIFY ≠ SoT) |
| `run.log` most (D4) | Worker po `appendLog` → NOTIFY **`publish-log` + `{ logId, runId }`** (zawsze, bez progu rozmiaru; `runId` = kolejka hydrate per run). Api LISTEN → **`getLogById(logId)`** → `hub.publish({ event: 'run.log', data })`. `logId` **tylko** w kopercie mostu — **bez** zmiany kształtu EventSource FE (R-2 / K-3) |
| Kanał abort | `run.abort` (jak SPEC); payload = sam `runId` (tekst) |
| Rename hub | `InMemoryRunSseHub` → `LocalRunSseHub` (plik `local-run-sse.hub.ts`) |
| Adapter worker | `NotifyRunSseHub` — `publish` status/HITL/terminal → NOTIFY `publish`; `publish` `run.log` → wymaga `logId` (patrz lifecycle) → NOTIFY `publish-log`; `complete` → NOTIFY `complete`; `subscribe` → throw; fail NOTIFY → **log warn/error**, bez throw procesu (**D5**) |
| Port enqueue | `RUN_JOB_ENQUEUE` / `RunJobEnqueuePort` (`enqueueWake`, `enqueueExecute`) |
| Port abort api | `RUN_ABORT_SIGNAL` / `RunAbortSignalPort` (`requestCancel`) — wspólny Cancel + DeleteUser |
| Pump | logika z `InProcessRunWorker` → `RunExecutePump` w drzewie api; bootstrap **tylko** w workerze |
| Cut ownership (**D1**) | Atomic: w momencie gdy worker ma execute, api **jednocześnie** bez pump/recovery/sweep oraz Cancel wyłącznie przez `RunAbortSignalPort` |
| Wake po recover (**D2**) | **Zawsze** `enqueueWake` (lub równoważny `notifyQueued` / job `run.wake`) po `recover.execute()` — bez „ewentualnie” |
| pg-boss ownership (**D3**) | **Tylko worker:** `start` + `createQueue` + `work`. **Api:** `start` + `send` (**bez** `createQueue`, **bez** `work`). Race api↑ przed kolejkami → retry `send` i/lub Compose `depends_on` worker healthy |
| Fail mostu (**D5**) | NOTIFY / hydrate miss → log warn/error; skip tego eventu; bez crash procesu; GET logs = SoT po reloadzie |
| pg-boss Nest CJS (**D6**) | `pg-boss` ≥12 = **ESM-only**; Nest `api`/`worker` emitują **CJS** (`nodenext` + brak `"type":"module"`). **Zakaz** `import` / `import type { PgBoss } from 'pg-boss'` w plikach Nest (TS1479). Typy DI = **lokalne surface** (`PgBossSendClient` / `PgBossWorkerClient` w `pg-boss.tokens.ts`). Konstrukcja instancji **tylko** w async Nest `useFactory`: `const { PgBoss } = await import('pg-boss')`. Unit: mock surface, bez importu pakietu. **Nie** migrujemy Nest na ESM w tym wycinku |
| Import dnia 1 | worker → ścieżki `../api/src/...` (path alias); extract `packages/*` **nie** w tym wycinku |
| `pg` Client | osobny klient `LISTEN`/`NOTIFY` (nie Prisma); wspólny `DATABASE_URL` |

---

## Założenia

- Stack: NestJS 11, Zod 4.4.x, Prisma 6 + PostgreSQL (Faza 30), Node jak Dockerfile api (`24.19.0`), pnpm workspace.
- Zależności nowe: `pg-boss` + `pg` (+ `@types/pg`) w **`api` i `worker`** (api: send + LISTEN SSE; worker: createQueue + work + LISTEN abort + NOTIFY SSE). Pin `pg-boss` **12.x** (ESM-only) — spójnie w obu appkach.
- Api **bez** `OnModuleInit` recovery/sweep/pump; worker always-on: recovery → **obowiązkowy wake** → autoFinalize boot → interval sweep → pg-boss `work`.
- HITL wariant **A**: `run.execute` bez `claimNext*`; bumpuje `inFlight`.
- Limit per-user (R-6a) **bez zmian** (zostaje w api przy admit).
- Typy: jawne na portach; zakaz `any`; `import type`; `unknown` + Zod/guard na payloadach NOTIFY/job.
- **D6 (pg-boss ↔ Nest CJS):** żadnych statycznych importów typów/wartości z `pg-boss` w kodzie Nest; lokalne surface + `await import('pg-boss')` w factory. `pg` / `@types/pg` bez tej blokady (CJS-friendly).
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki / API

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| pg-boss (**D3** + **D6**) | Worker: factory `await import('pg-boss')` → `new PgBoss` → `start()` → `createQueue` ×2 → `work`. Api: ta sama konstrukcja → `start()` → `send` only (bez `createQueue` / `work`); `stop({ graceful })` po obu stronach. Typy DI = lokalne surface, nie `import type` z pakietu | Context7 `/timgit/pg-boss`; HOW **D6** |
| Job data | `job.data` = `{ runId }`; worker ładuje Run z repo | SPEC P-10 / R-5 |
| PG NOTIFY/LISTEN | `pg.Client` / `Pool` + `LISTEN` / `NOTIFY`; SSE = JSON koperty hybrid; abort = runId; fail → log (**D5**) | docs `data_flow.md`, SPEC R-4 / R-11 |
| Nest worker | `NestFactory.createApplicationContext` (bez HTTP runów) | SPEC M-10 |

---

## FAZA 1 — Szkielet `apps/worker` + kontrakty jobów/NOTIFY + hub SSE

Odpowiada major 34.1 + start 34.2/34.3. Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Pakiet `apps/worker` (Nest bootstrap; bez REST runów) + unit

**Status:** `WYKONANY`

**Cel:** Cztery runtime w workspace (M-1); cienki proces bez publicznej powierzchni REST runów (M-10). Major 34.1.

**Artefakty (nowe):**

- `apps/worker/package.json`
- `apps/worker/tsconfig.json`, `apps/worker/tsconfig.build.json`
- `apps/worker/nest-cli.json`
- `apps/worker/src/main.ts`
- `apps/worker/src/worker-app.module.ts`
- `apps/worker/src/main.spec.ts` (unit: moduł się kompiluje / provider bootstrap stub)
- Root: dopisek `references` w `tsconfig.json`; skrypt `dev:worker` w root `package.json` (opcjonalnie równolegle z istniejącymi)

#### `apps/worker/package.json` — kompletny

```json
{
  "name": "worker",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "test": "jest",
    "typecheck:tests": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@content-chain/shared": "workspace:*",
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.0",
    "@prisma/client": "^6",
    "dotenv": "^17.4.2",
    "nestjs-pino": "^4.0.0",
    "pg": "^8.16.0",
    "pg-boss": "^10.1.5",
    "pino": "^9.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^22.0.0",
    "@types/pg": "^8.15.0",
    "jest": "^30.4.2",
    "ts-jest": "^29.2.5",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": { "^.+\\.(t|j)s$": "ts-jest" },
    "testEnvironment": "node"
  }
}
```

> Pin dokładnej wersji `pg-boss` przy instalacji do aktualnej stabilnej z registry (Context7: API `PgBoss` / `createQueue` / `work` z tablicą jobów). Nie dokładaj dashboard CLI.

#### `apps/worker/tsconfig.json` — kompletny

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "isolatedModules": true,
    "paths": {
      "@api/*": ["../api/src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### `apps/worker/src/main.ts` — kompletny (szkielet; pełne importy runtime w FAZA 2)

```typescript
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkerAppModule } from './worker-app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(WorkerAppModule, {
    bufferLogs: true,
  });
  app.enableShutdownHooks();
  const logger = new Logger('WorkerBootstrap');
  logger.log('apps/worker started (no public runs HTTP)');
}

bootstrap().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
```

#### `apps/worker/src/worker-app.module.ts` — szkielet (rozszerzany w FAZA 2)

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * Thin runtime shell. FAZA 2 wires WorkerRuntimeModule from the api tree
 * (execute / recovery / sweep / pg-boss work / abort LISTEN).
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
  ],
})
export class WorkerAppModule {}
```

#### Unit — `apps/worker/src/main.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { WorkerAppModule } from './worker-app.module';

describe('WorkerAppModule', () => {
  it('boots an application context without HTTP server', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WorkerAppModule],
    }).compile();
    const app = moduleRef.createNestApplicationContext();
    await app.init();
    expect(app).toBeDefined();
    await app.close();
  });
});
```

**DoD kroku:**

- `apps/worker` w workspace; `pnpm --filter worker test` zielony dla powyższego spec.
- Brak controllera REST runów / SSE EventSource w workerze.
- Root `tsconfig` references obejmują worker (dopisek).

---

### KROK 2 — Kontrakt pg-boss (`{ runId }`) + porty enqueue / abort-signal + unit

**Status:** `WYKONANY`

**Cel:** SoT = `Run`; pg-boss = wake/dispatch; wspólny port abort dla Cancel + purge (R-5, R-11, P-10). Major 34.2 (kontrakt). **D6:** adaptery typują DI lokalnym surface, bez `import` z `pg-boss`.

**Artefakty (nowe w drzewie api — reuse z workera):**

- `apps/api/src/runs/domain/run-job-enqueue.port.ts`
- `apps/api/src/runs/domain/run-abort-signal.port.ts`
- `apps/api/src/runs/infrastructure/dispatch/run-job.constants.ts`
- `apps/api/src/runs/infrastructure/dispatch/run-job.schemas.ts`
- `apps/api/src/runs/infrastructure/dispatch/pg-boss.run-job.enqueue.ts`
- `apps/api/src/runs/infrastructure/dispatch/pg-notify-abort.signal.ts`
- `apps/api/src/runs/infrastructure/dispatch/pg-boss.tokens.ts` — tokeny + `PgBossSendClient` (+ później `PgBossWorkerClient` w FAZA 2)
- Specs: `run-job.schemas.spec.ts`, `pg-boss.run-job.enqueue.spec.ts`, `pg-notify-abort.signal.spec.ts`

#### Port enqueue — kompletny

```typescript
import type { RunId } from '@content-chain/shared';

export const RUN_JOB_ENQUEUE = Symbol('RUN_JOB_ENQUEUE');

export interface RunJobEnqueuePort {
  enqueueWake(runId: RunId): Promise<void>;
  enqueueExecute(runId: RunId): Promise<void>;
}
```

#### Port abort signal — kompletny

```typescript
import type { RunId } from '@content-chain/shared';

export const RUN_ABORT_SIGNAL = Symbol('RUN_ABORT_SIGNAL');

/** Live soft-stop to worker (NOTIFY). Durable cancelRequested stays on RunRepository. */
export interface RunAbortSignalPort {
  requestCancel(runId: RunId): Promise<void>;
}
```

#### Stałe + schema — kompletne

```typescript
// run-job.constants.ts
export const RUN_WAKE_QUEUE = 'run.wake';
export const RUN_EXECUTE_QUEUE = 'run.execute';
export const RUN_ABORT_CHANNEL = 'run.abort';
export const RUN_SSE_CHANNEL = 'cc_run_sse';
```

```typescript
// run-job.schemas.ts
import { z } from 'zod';

export const runJobPayloadSchema = z
  .object({
    runId: z.string().min(1),
  })
  .strict();

export type RunJobPayload = z.infer<typeof runJobPayloadSchema>;
```

#### Adapter enqueue (szkic kompletny; `PgBossSendClient` inject — **D6**)

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { PG_BOSS, type PgBossSendClient } from './pg-boss.tokens';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import type { RunId } from '@content-chain/shared';
import type { RunJobEnqueuePort } from '../../domain/run-job-enqueue.port';

@Injectable()
export class PgBossRunJobEnqueue implements RunJobEnqueuePort {
  constructor(@Inject(PG_BOSS) private readonly boss: PgBossSendClient) {}

  async enqueueWake(runId: RunId): Promise<void> {
    await this.boss.send(RUN_WAKE_QUEUE, { runId });
  }

  async enqueueExecute(runId: RunId): Promise<void> {
    await this.boss.send(RUN_EXECUTE_QUEUE, { runId });
  }
}
```

> **D6:** zakaz `import type { PgBoss } from 'pg-boss'` (oraz `with { 'resolution-mode': 'import' }` — nadal TS1479 w tym setupie Nest CJS). Wire instancji = FAZA 2 / KROK 3 (`RunDispatchModule` + `await import('pg-boss')`).

#### Adapter abort NOTIFY — kompletny

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'pg';
import type { RunId } from '@content-chain/shared';
import type { RunAbortSignalPort } from '../../domain/run-abort-signal.port';
import { PG_NOTIFY_POOL } from './pg-boss.tokens';
import { RUN_ABORT_CHANNEL } from './run-job.constants';

@Injectable()
export class PgNotifyAbortSignal implements RunAbortSignalPort {
  constructor(@Inject(PG_NOTIFY_POOL) private readonly pool: Pool) {}

  async requestCancel(runId: RunId): Promise<void> {
    // D5: przy fail — Logger.warn/error w implementacji; durable flag już w DB
    await this.pool.query(`SELECT pg_notify($1, $2)`, [
      RUN_ABORT_CHANNEL,
      runId,
    ]);
  }
}
```

```typescript
// pg-boss.tokens.ts
/** Api enqueue surface — real PgBoss satisfies structurally (D6). */
export type PgBossSendClient = {
  send(name: string, data: { runId: string }): Promise<string | null>;
};

export const PG_BOSS = Symbol('PG_BOSS');
export const PG_NOTIFY_POOL = Symbol('PG_NOTIFY_POOL');
```

**Unit (obowiązkowe przypadki):**

| Spec | Przypadki |
|------|-----------|
| `run-job.schemas.spec.ts` | akceptuje `{ runId }`; odrzuca extra keys / brak `runId` / nie-string |
| `pg-boss.run-job.enqueue.spec.ts` | `enqueueWake` → `boss.send('run.wake', { runId })`; `enqueueExecute` → `run.execute`; mock = `PgBossSendClient` (**bez** importu `pg-boss`) |
| `pg-notify-abort.signal.spec.ts` | `requestCancel` woła `pg_notify` z kanałem `run.abort` i payloadem `runId` |

**DoD kroku:** porty + adaptery + unit zielone; payload wyłącznie `{ runId }`; kanał abort ≠ SSE; **brak** statycznego importu z `pg-boss` w plikach kroku (**D6**).

---

### KROK 3 — Rename hub api + adapter NOTIFY-only + LISTEN→hub (hydrate `run.log`) + unit

**Status:** `WYKONANY`

**Cel:** Subjecty tylko w api; worker = NOTIFY-only; most = pełny **zakres rodzajów** eventów z workera; `run.log` = hydrate po `logId` (**D4**). Major 34.3. Refaktor względem: Faza 8 hub in-process (`InMemoryRunSseHub`) — Subjecty zostają w api; wire worker→api = NOTIFY + hydrate logów. **D6:** ten krok używa `pg` (`Pool`) — bez importu `pg-boss`.

**Artefakty:**

- Rename: `apps/api/src/runs/infrastructure/sse/run-sse.hub.ts` → klasa `LocalRunSseHub` (ten sam plik **albo** `local-run-sse.hub.ts` + update importów; usuń nazwę `InMemory*`)
- Nowy: `apps/api/src/runs/infrastructure/sse/run-sse-notify.envelope.ts` (+ `.spec.ts`)
- Nowy: `apps/api/src/runs/infrastructure/sse/notify-run-sse.hub.ts` (+ `.spec.ts`) — używany **w workerze**
- Nowy: `apps/api/src/runs/infrastructure/sse/run-sse-notify.listener.ts` (+ `.spec.ts`) — `OnModuleInit` w **api**; hydrate `publish-log`
- Zmiana: `run.port.ts` / `PrismaRunAdapter` — **`getLogById(logId: string): Promise<RunLogEntry | null>`** (id wiersza `RunLog` już w PG; **nie** ekspozycja `id` w SSE FE)
- Zmiana: `RunLifecycleService.appendLog` (ścieżka workera) — po zapisie przekazać **`logId`** do adaptera NOTIFY (np. `NotifyRunSseHub.publishLog(logId)` **albo** rozszerzenie wewnętrzne przed `publish`; FE nadal dostaje `RunLogEntry` bez `id`)
- Zmiana: `run-lifecycle.module.ts` — `useClass: LocalRunSseHub`; provider listenera
- Update: `run-sse.hub.spec.ts` (nazwa describe / import)

#### Koperta SSE — kompletna (hybrid **D4**)

```typescript
import { z } from 'zod';
import type { RunSseEvent } from '../../domain/run-sse.port';

/** Inline w NOTIFY — bez run.log (treść logu zawsze z DB). */
const runSseInlineEventSchema = z.discriminatedUnion('event', [
  z.object({
    event: z.literal('run.status'),
    data: z.object({
      runId: z.string().min(1),
      status: z.string().min(1),
    }),
  }),
  z.object({
    event: z.literal('run.hitl'),
    data: z.object({
      runId: z.string().min(1),
      options: z.array(z.unknown()),
    }),
  }),
  z.object({
    event: z.literal('run.completed'),
    data: z.object({
      runId: z.string().min(1),
      resultSummary: z.string().optional(),
    }),
  }),
  z.object({
    event: z.literal('run.failed'),
    data: z.object({
      runId: z.string().min(1),
      code: z.string().optional(),
      message: z.string(),
    }),
  }),
  z.object({
    event: z.literal('run.cancelled'),
    data: z.object({ runId: z.string().min(1) }),
  }),
]);

export const runSseNotifyEnvelopeSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('publish'),
    event: runSseInlineEventSchema,
  }),
  z.object({
    kind: z.literal('publish-log'),
    logId: z.string().min(1),
    runId: z.string().min(1),
  }),
  z.object({
    kind: z.literal('complete'),
    runId: z.string().min(1),
  }),
]);

export type RunSseNotifyEnvelope = z.infer<typeof runSseNotifyEnvelopeSchema>;

export function parseRunSseNotifyPayload(
  raw: string,
): RunSseNotifyEnvelope | null {
  let json: unknown;
  try {
    json = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  const parsed = runSseNotifyEnvelopeSchema.safeParse(json);
  return parsed.success ? parsed.data : null;
}

export function encodePublish(
  event: Exclude<RunSseEvent, { event: 'run.log' }>,
): string {
  return JSON.stringify({
    kind: 'publish',
    event,
  } satisfies RunSseNotifyEnvelope);
}

export function encodePublishLog(logId: string, runId: string): string {
  return JSON.stringify({
    kind: 'publish-log',
    logId,
    runId,
  } satisfies RunSseNotifyEnvelope);
}

export function encodeComplete(runId: string): string {
  return JSON.stringify({
    kind: 'complete',
    runId,
  } satisfies RunSseNotifyEnvelope);
}
```

> „Pełny zakres” (docs/major) = każdy **rodzaj** eventu z workera przechodzi mostem; dla `run.log` treść SSE = hydrate z DB po `logId` (NOTIFY ≠ SoT). **Zakaz** pomijania rodzaju `run.log` w moście.

#### `NotifyRunSseHub` — kompletny (**D4** + **D5**)

```typescript
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Pool } from 'pg';
import type { RunId } from '@content-chain/shared';
import type { RunSseEvent, RunSseHub } from '../../domain/run-sse.port';
import { PG_NOTIFY_POOL } from '../dispatch/pg-boss.tokens';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import {
  encodeComplete,
  encodePublish,
  encodePublishLog,
} from './run-sse-notify.envelope';

@Injectable()
export class NotifyRunSseHub implements RunSseHub {
  private readonly logger = new Logger(NotifyRunSseHub.name);

  constructor(@Inject(PG_NOTIFY_POOL) private readonly pool: Pool) {}

  subscribe(_runId: RunId): Observable<RunSseEvent> {
    throw new Error('NotifyRunSseHub does not support subscribe (api-only)');
  }

  /** Status / HITL / terminal — inline. run.log → użyj publishLog(logId). */
  publish(event: RunSseEvent): void {
    if (event.event === 'run.log') {
      this.logger.error(
        'NotifyRunSseHub.publish(run.log) forbidden — use publishLog(logId)',
      );
      return;
    }
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodePublish(event),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err }, 'SSE NOTIFY publish failed');
      });
  }

  publishLog(logId: string, runId: RunId): void {
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodePublishLog(logId, runId),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err, logId }, 'SSE NOTIFY publish-log failed');
      });
  }

  complete(runId: RunId): void {
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodeComplete(runId),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err, runId }, 'SSE NOTIFY complete failed');
      });
  }
}
```

> shortcut: `RunSseHub` port FE-facing nie musi mieć `publishLog` — metoda na klasie workera / wąski port wewnętrzny; lifecycle workera woła `publishLog` po `appendLog` zwracającym id wiersza.

#### Listener api — kompletny (hydrate + kolejka per `runId`)

```typescript
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'pg';
import { createRunId } from '@content-chain/shared';
import { ENV, type Env } from '../../../shared/config/env';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../../domain/run-sse.port';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import { parseRunSseNotifyPayload } from './run-sse-notify.envelope';

@Injectable()
export class RunSseNotifyListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunSseNotifyListener.name);
  private client: Client | null = null;
  /** Serializacja hydrate per run — uniknij przestawienia kolejności logów. */
  private readonly logTailByRun = new Map<string, Promise<void>>();

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_SSE_HUB) private readonly hub: RunSseHub,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    const client = new Client({ connectionString: this.env.DATABASE_URL });
    this.client = client;
    client.on('notification', (msg) => {
      if (msg.channel !== RUN_SSE_CHANNEL || msg.payload == null) return;
      const envelope = parseRunSseNotifyPayload(msg.payload);
      if (!envelope) {
        this.logger.warn('ignored invalid SSE NOTIFY payload');
        return;
      }
      if (envelope.kind === 'publish') {
        this.hub.publish(
          envelope.event as Parameters<RunSseHub['publish']>[0],
        );
        return;
      }
      if (envelope.kind === 'complete') {
        this.hub.complete(createRunId(envelope.runId));
        return;
      }
      void this.hydrateLog(envelope.logId, envelope.runId);
    });
    await client.connect();
    await client.query(`LISTEN ${RUN_SSE_CHANNEL}`);
  }

  /** Chain per runId **przed** await fetch — kolejność = kolejność sygnałów mostu. */
  private hydrateLog(logId: string, runId: string): void {
    const prev = this.logTailByRun.get(runId) ?? Promise.resolve();
    const next = prev
      .then(async () => {
        const entry = await this.runs.getLogById(logId);
        if (!entry) {
          this.logger.warn({ logId }, 'SSE hydrate: log not found — skip');
          return;
        }
        this.hub.publish({
          event: 'run.log',
          data: { ...entry, runId: entry.runId },
        });
      })
      .catch((err: unknown) => {
        this.logger.warn({ err, logId }, 'SSE hydrate failed');
      });
    this.logTailByRun.set(runId, next);
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.query(`UNLISTEN ${RUN_SSE_CHANNEL}`);
      await this.client.end();
    } catch (err) {
      this.logger.warn({ err }, 'SSE LISTEN shutdown failed');
    }
    this.client = null;
  }
}
```

> shortcut: szkic `enqueueHydrateLog` powyżej jest **ilustracją kolejności** — w implementacji: najpierw `getLogById`, potem chain na `Map` po `entry.runId` (bez podwójnego fetcha). `LISTEN ${RUN_SSE_CHANNEL}` — kanał = stała `cc_run_sse`; nie interpolować z requestu.

#### Refaktor `RunLifecycleModule` — fragment

**teraz:**

```typescript
import { InMemoryRunSseHub } from './infrastructure/sse/run-sse.hub';
// ...
{ provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
RunAbortRegistry,
```

**zamień na:**

```typescript
import { LocalRunSseHub } from './infrastructure/sse/local-run-sse.hub';
import { RunSseNotifyListener } from './infrastructure/sse/run-sse-notify.listener';
// ...
{ provide: RUN_SSE_HUB, useClass: LocalRunSseHub },
RunSseNotifyListener,
// RunAbortRegistry zostaje do FAZA 2 / KROK 3 (wycięcie z api) —
// w tym kroku jeszcze w module; worker przejmie ownership w FAZA 2.
```

**Unit (obowiązkowe):**

| Spec | Przypadki |
|------|-----------|
| `run-sse-notify.envelope.spec.ts` | round-trip `publish` / `publish-log` / `complete`; odrzut złego JSON / złego `kind`; **odrzut** `publish` z `event: 'run.log'` |
| `notify-run-sse.hub.spec.ts` | inline `publish`/`complete` → `pg_notify`; `publishLog` → `publish-log`; `publish(run.log)` nie wysyła pełnego loga; `subscribe` rzuca; fail query → log (mock), bez throw |
| `run-sse.hub.spec.ts` (Local) | regresja TTL / complete / publish-after-complete (jak dziś) |
| `run-sse-notify.listener.spec.ts` | `publish` → `hub.publish`; `complete` → `hub.complete`; `publish-log` → kolejka per `runId` → `getLogById` → `hub.publish(run.log)`; brak wiersza → warn + brak publish; śmieci → ignore |
| `prisma-run.adapter` / port | `getLogById` zwraca entry albo `null` |

**DoD kroku:** FE EventSource bez zmiany kształtu (bez `logId` w SSE); Subjecty tylko w api; worker hub = NOTIFY-only + `publishLog`; hydrate zawsze dla logów; unit zielone.

---

#### Propozycja commit message

```text
feat(worker): scaffold apps/worker and SSE NOTIFY bridge contracts

Introduce enqueue/abort ports, LocalRunSseHub rename, hybrid publish-log
hydrate for run.log, and pg-boss job payload { runId }.
```

---

## FAZA 2 — Execute / recovery / sweep / abort na workerze + api bez pump

Odpowiada major 34.2 (runtime) + 34.4. Status startowy: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Worker: AbortRegistry + LISTEN `run.abort`; recovery; review sweep + unit

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jeden owner recovery/sweep/abort mapy = worker (R-9 / R-10 / R-11). Major 34.4. Refaktor względem: Faza 7/12/14 recovery+sweep+abort w `InProcessRunWorker` (api).

**Artefakty:**

- Nowy: `apps/api/src/runs/infrastructure/dispatch/run-abort-notify.listener.ts` (+ `.spec.ts`) — tylko w procesie workera
- Nowy: `apps/api/src/runs/worker-runtime.module.ts` — DI workera (lifecycle, repo, AbortRegistry, listeners, pump w KROK 2)
- Przenieś ownership: `RecoverInterruptedRunsUseCase` + `AutoFinalizeExpiredReviewsUseCase` rejestracja / `OnModuleInit` **tylko** w worker runtime (nie w api `RunsModule` boot)
- **Jawne (D1):** w tym samym cutcie co ownership workera — **wyciąć** z `InProcessRunWorker.onModuleInit` (później `RunExecutePump`): `recover.execute()`, `autoFinalize` + `setInterval`. Samo przeniesienie providerów **nie** wystarczy, dopóki klasa w api nadal woła je w boot.
- `RunAbortRegistry` provider w `WorkerRuntimeModule` (nie eksportowany do HTTP api po KROK 3 — razem z atomic cut)

#### `RunAbortNotifyListener` — kompletny

```typescript
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'pg';
import { createRunId } from '@content-chain/shared';
import { ENV, type Env } from '../../../shared/config/env';
import { Inject } from '@nestjs/common';
import { RunAbortRegistry } from '../../application/lifecycle/run-abort.registry';
import { RUN_ABORT_CHANNEL } from './run-job.constants';

@Injectable()
export class RunAbortNotifyListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunAbortNotifyListener.name);
  private client: Client | null = null;

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly abortRegistry: RunAbortRegistry,
  ) {}

  async onModuleInit(): Promise<void> {
    const client = new Client({ connectionString: this.env.DATABASE_URL });
    this.client = client;
    client.on('notification', (msg) => {
      if (msg.channel !== RUN_ABORT_CHANNEL || msg.payload == null) return;
      this.abortRegistry.requestCancel(createRunId(msg.payload));
    });
    await client.connect();
    await client.query(`LISTEN ${RUN_ABORT_CHANNEL}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.query(`UNLISTEN ${RUN_ABORT_CHANNEL}`);
      await this.client.end();
    } catch (err) {
      this.logger.warn({ err }, 'abort LISTEN shutdown failed');
    }
    this.client = null;
  }
}
```

**Kolejność boot workera (w pump / runtime `onModuleInit`):**

1. `recover.execute()`  
2. **`enqueueWake` / `notifyQueued` — zawsze po recover (**D2**)** — nawet gdy recover nic nie zmienił (tani no-op drain)  
3. `autoFinalize.execute()` + `setInterval(REVIEW_SWEEP_INTERVAL)`  
4. (KROK 2) pg-boss `start` + `createQueue` + `work` (**D3**) przez factory `await import('pg-boss')` (**D6**) — ten krok K1 nadal bez importu `pg-boss` (tylko `pg` LISTEN)

**Unit:**

| Spec | Przypadki |
|------|-----------|
| `run-abort-notify.listener.spec.ts` | payload runId → `abortRegistry.requestCancel`; obcy kanał ignorowany |
| `run-abort.registry.spec.ts` | **bez regresji** (przenieś/zostaw w api tree; nadal unit) |
| Wiring sweep | unit na klasie boot workera: po init wywołany `recover` **raz**, potem **wake**, `autoFinalize` **raz**, timer ustawiony; `onDestroy` czyści interval (przenieś asercje z `in-process-run.worker.spec.ts`) |

**DoD kroku:** api **nie** odpala recovery/sweep (także nie przez `InProcessRunWorker.onModuleInit`); listener abort → registry; wake po recover obowiązkowy; unit zielone. **Uwaga D1:** nie wdrażaj tego kroku na środowisku z worker execute, dopóki K3 nie przełączy Cancel na `RunAbortSignalPort` i nie usunie pump z api.

---

### KROK 2 — Worker: drain/claim/HITL-A + handlery pg-boss + unit

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Cap claim + HITL A; joby `{ runId }` + load z DB (R-5 / R-6). Major 34.2. **D3** + **D6:** handlery na lokalnym `PgBossWorkerClient`; konstrukcja `PgBoss` wyłącznie przez `await import('pg-boss')` w factory workera.

**Artefakty:**

- Rename/przenieś logikę: `InProcessRunWorker` → `RunExecutePump`  
  (`apps/api/src/runs/application/lifecycle/run-execute.pump.ts`)
- Nowy: `apps/api/src/runs/infrastructure/dispatch/pg-boss-run.worker.ts` — worker-only: `start` + **`createQueue`** + `work('run.wake')` → `pump.notifyQueued()`; `work('run.execute')` → load Run + `pump.scheduleExistingRunning(run)` (**D3**); DI typ = `PgBossWorkerClient` (**D6**)
- Dopisek w `pg-boss.tokens.ts`: `PgBossWorkerClient` (rozszerza surface o `start` / `stop` / `createQueue` / `work` — bez importu typów z `pg-boss`)
- Hub w pumpie = `NotifyRunSseHub` (DI workera); lifecycle `appendLog` → `publishLog(logId, runId)`
- Przenieś / zaktualizuj spec: `in-process-run.worker.spec.ts` → `run-execute.pump.spec.ts` (te same scenariusze claim / HITL / cap / executor fail)
- Nowy: `pg-boss-run.worker.spec.ts` — mock `PgBossWorkerClient`, **bez** `import('pg-boss')` w specu

#### Zachowanie `RunExecutePump` (1:1 z obecnym workerem)

Publiczne API:

- `notifyQueued(): void` — enqueue drain (wake)
- `scheduleExistingRunning(run: RunRecord): void` — HITL-A / execute job path
- `onModuleInit` / `onModuleDestroy` — **tylko** gdy hostem jest worker (recovery+sweep+wake już w KROK 1; tu pg-boss `createQueue`/`work` **albo** osobna klasa `PgBossRunWorker`)

#### Factory pg-boss w workerze (**D6** — wymagany wzorzec)

```typescript
{
  provide: PG_BOSS,
  useFactory: async (/* ConfigService → connectionString */): Promise<PgBossWorkerClient> => {
    const { PgBoss } = await import('pg-boss');
    const boss = new PgBoss({ connectionString /* ... */ });
    await boss.start();
    await boss.createQueue(RUN_WAKE_QUEUE);
    await boss.createQueue(RUN_EXECUTE_QUEUE);
    return boss;
  },
}
```

> Klasa `PgBossRunWorker` / handlery wołają `boss.work(...)` na wstrzykniętym `PgBossWorkerClient` — **nie** importują `PgBoss` ze static `from 'pg-boss'`.

**Handler wake (pseudokod wymagany w pliku):**

```typescript
await boss.work(RUN_WAKE_QUEUE, async ([job]) => {
  const parsed = runJobPayloadSchema.parse(job.data);
  // runId w paylodzie = wake hint; drain i tak claimuje z DB
  void parsed.runId;
  pump.notifyQueued();
});
```

**Handler execute:**

```typescript
await boss.work(RUN_EXECUTE_QUEUE, async ([job]) => {
  const { runId } = runJobPayloadSchema.parse(job.data);
  const run = await runs.getById(createRunId(runId));
  if (!run || run.status !== 'running') return;
  pump.scheduleExistingRunning(run);
});
```

**Unit (obowiązkowe — przeniesione + nowe):**

| Przypadek | Skąd |
|-----------|------|
| claim `interrupted` przed `queued` | dawny `InProcessRunWorker` spec |
| cap `MAX_CONCURRENT_RUNS` | j.w. |
| HITL resume bumpuje `inFlight` ponad MAX, drain czeka | j.w. |
| executor throw → log + `failed` gdy nadal `running` | j.w. |
| abort signal z registry przy execute | j.w. / abort spec |
| `run.wake` → `notifyQueued` | nowy |
| `run.execute` → load + `scheduleExistingRunning`; skip gdy status ≠ `running` | nowy |
| payload bez `runId` → błąd / job fail bez claim | nowy |

**DoD kroku:** semantyka claim/HITL-A jak dziś; SoT = DB; unit zielone; **D6** — brak static import `pg-boss` poza dynamicznym w factory.

---

### KROK 3 — Api: enqueue Start/HITL; NOTIFY abort Cancel/DeleteUser; usunięcie in-process + unit

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Api = admit/cancel/HITL/SSE/enqueue; **bez** pump/execute/sweep (R-5 / R-11). Major 34.2 + 34.4. **Domknięcie D1** (atomic cut z K1–K2).

**Artefakty (refaktor):**

- `start-run.use-case.ts` — `InProcessRunWorker` → `RunJobEnqueuePort.enqueueWake(run.id)`
- `resume-hitl.use-case.ts` — po transition `running` → `enqueueExecute(runId)` (**nie** przekazywać całego `RunRecord` do joba)
- `cancel-run.use-case.ts` — `RunAbortRegistry` → `RunAbortSignalPort.requestCancel` (await)
- `delete-user.use-case.ts` — to samo
- `runs.module.ts` — usuń `InProcessRunWorker`, `RecoverInterruptedRunsUseCase`, `AutoFinalizeExpiredReviewsUseCase` z providerów api (use-case auto-finalize może zostać zaimportowany tylko przez worker module)
- `run-lifecycle.module.ts` — **usuń** `RunAbortRegistry` z api exports; zostaw hub + listener SSE + (osobny moduł dispatch) enqueue/abort signal + pool/pg-boss **send**
- Nowy mały `RunDispatchModule` (api): factory **`await import('pg-boss')`** → `new PgBoss` → `start()` → bind `PG_BOSS` jako `PgBossSendClient` (**`send` only — bez `createQueue` / bez `work`**, **D3** + **D6**), `Pool`, binduje `RUN_JOB_ENQUEUE` / `RUN_ABORT_SIGNAL`; `send` z **retry** gdy kolejka jeszcze nie istnieje (race ze startem workera); `onModuleDestroy` → `stop({ graceful: true })`
- Usuń plik `in-process-run.worker.ts` po przeniesieniu
- Update wszystkich speców use-case’ów

#### Factory pg-boss w api (`RunDispatchModule` — **D6**)

```typescript
{
  provide: PG_BOSS,
  useFactory: async (/* ConfigService */): Promise<PgBossSendClient> => {
    const { PgBoss } = await import('pg-boss');
    const boss = new PgBoss({ connectionString /* ... */ });
    await boss.start();
    // D3: bez createQueue / bez work
    return boss;
  },
}
```

#### Refaktor StartRun — fragment

**teraz:**

```typescript
private readonly worker: InProcessRunWorker,
// ...
this.worker.notifyQueued();
```

**zamień na:**

```typescript
@Inject(RUN_JOB_ENQUEUE) private readonly jobs: RunJobEnqueuePort,
// ...
await this.jobs.enqueueWake(run.id);
```

#### Refaktor ResumeHitl — fragment

**teraz:**

```typescript
this.worker.notifyHitlResumed({ ...running, selectedIdeaIds: parsedSelectedIdeaIds });
```

**zamień na:**

```typescript
await this.jobs.enqueueExecute(parsedRunId);
```

#### Refaktor CancelRun — fragment

**teraz:**

```typescript
this.abortRegistry.requestCancel(runId);
```

**zamień na:**

```typescript
await this.abortSignal.requestCancel(runId);
```

**Unit (obowiązkowe):**

| Spec | Przypadki |
|------|-----------|
| `start-run.use-case.spec.ts` | po create → `enqueueWake`; brak wywołania pump |
| `resume-hitl.use-case.spec.ts` | po sukcesie → `enqueueExecute`; brak `scheduleExistingRunning` w api |
| `cancel-run.use-case.spec.ts` | sukces CAS → `abortSignal.requestCancel`; regresja authz/idempotencja |
| `delete-user.use-case.spec.ts` | purge guest → `requestCancel` per aktywny run (jak dziś registry) |
| DI smoke | `RunsModule` api **nie** dostarcza `InProcessRunWorker` / nie woła recovery na init |
| D6 smoke | w `apps/api` / `apps/worker` **brak** `from 'pg-boss'` (grep); jedyny load = dynamic `import('pg-boss')` w factory |

**DoD kroku:** brak in-process pump w api; Cancel/DeleteUser → NOTIFY; api bez `createQueue`/`work`; **D1 spełnione** (brak middle state na deploy); **D6** (brak static import `pg-boss`); unit zielone.

---

#### Propozycja commit message

```text
feat(worker): move run execute, recovery, and sweep to apps/worker

API enqueues pg-boss jobs and signals abort over NOTIFY; the worker owns
claim/HITL-A, AbortRegistry, and review sweep so HTTP no longer runs pumps.
```

---

## FAZA 3 — Compose `worker` + weryfikacja unitów + regresja e2e/Postman

Odpowiada major 34.5 + DoD testowe. Status startowy: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Compose usługa `worker` + `.env.example` + skrypty DX

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Compose-first V1 z czterema usługami aplikacyjnymi; wspólny PG (`docs/deployment.md`, M-9). Major 34.5. Obsługa race **D3** (kolejki tworzy worker).

**Artefakty:**

- Nowy: `apps/worker/Dockerfile` (context root; COPY `apps/api` + `apps/worker` + `packages/shared`; build `pnpm --filter worker...` — **smoke build w obrazie**; **bez** publicznego portu runów)
- Zmiana: `docker-compose.yml` — service `worker` (`depends_on: postgres healthy`, ten sam `DATABASE_URL` pattern co api, env: `GATEWAY_*`, `MAX_CONCURRENT_RUNS`, `REVIEW_TTL`, `REVIEW_SWEEP_INTERVAL`, `JWT_SECRET` jeśli wspólny validateEnv — **dostosuj** `validateEnv` workera do **węższego** schematu bez CORS/SMTP jeśli niepotrzebne; wolno osobny `worker-env.schema.ts` z subsetem)
- Api w Compose: **`depends_on: worker` (started/healthy)** **albo** documented retry `send` w `PgBossRunJobEnqueue` — jedno z dwóch obowiązkowe pod **D3**
- Runtime image: Node jak api (`24.x`) — wystarczy dla `await import('pg-boss')` z CJS Nest (**D6**); **bez** ustawiania `"type":"module"` w obrazie api/worker
- Nowy: `apps/worker/.env.example`
- Root / api `.env.example` — dopiski kluczy workera w sumie prod gdy trzeba
- `docker-compose.dev.yml` — usługa worker gdy stack DX jej używa
- Skrypty root: `dev:worker`, ewent. `build:worker`
- **D1:** dokumentacja DX / Compose — stack podnosi **api + worker razem** po cutoverze; zakaz „tylko api” z oczekiwaniem execute

#### Compose — fragment do wstawienia (po `api`)

```yaml
  worker:
    build:
      context: .
      dockerfile: apps/worker/Dockerfile
      target: production
    container_name: cc-worker
    restart: unless-stopped
    env_file:
      - ./.env
    environment:
      NODE_ENV: production
    command:
      - |
        export DATABASE_URL="postgresql://$${POSTGRES_USER}:$${POSTGRES_PASSWORD}@postgres:5432/$${POSTGRES_DB}?schema=public"
        exec node dist/main.js
    depends_on:
      postgres:
        condition: service_healthy
      ai-provider-gateway:
        condition: service_healthy
    networks:
      - cc-network
      - main_network
```

> Api: dodaj `depends_on.worker` (gdy health workera istnieje) **lub** poleganie wyłącznie na retry `send` — zapisz wybrane w DoD implementacji.

**Unit / sprawdzenie konfiguracji:**

- Spec parse env workera (subset): `MAX_CONCURRENT_RUNS`, `REVIEW_*`, `DATABASE_URL`, `GATEWAY_*` — fail-fast na złym TTL stringu (jak api `parseTtlMs`).
- Asercja Dockerfile: brak `EXPOSE` portu operator runs (albo tylko opcjonalny health wewnętrzny — **bez** REST runów).

**DoD kroku:** `docker compose config` zawiera `worker`; race D3 zaadresowany (depends_on i/lub retry); `.env.example` workera istnieje.

---

### KROK 2 — Weryfikacja wcześniej utworzonych testów jednostkowych

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Domknąć spójność unitów FAZA 1–2 po wycięciu in-process: mapa przypadków → plik; brak orphanów; zielony suite; regresja **D6** (brak static import `pg-boss`).

**Artefakty:** brak nowego kodu produkcyjnego (ew. poprawki speców / importów). Checklist w tym kroku = DoD.

#### Mapa przypadków → spec (wypełnij/odfajkuj przy implementacji)

| Obszar | Przypadki (min.) | Spec (oczekiwany) | Status |
|--------|------------------|-------------------|--------|
| Worker bootstrap | context bez HTTP | `apps/worker/src/main.spec.ts` | |
| Job payload Zod | strict `{ runId }` | `run-job.schemas.spec.ts` | |
| Enqueue port | wake/execute → właściwa kolejka; mock `PgBossSendClient` | `pg-boss.run-job.enqueue.spec.ts` | |
| Abort NOTIFY api | `pg_notify(run.abort, runId)` | `pg-notify-abort.signal.spec.ts` | |
| Koperta SSE | publish / publish-log / complete + reject `run.log` inline | `run-sse-notify.envelope.spec.ts` | |
| Notify hub | inline + `publishLog`; subscribe throws; fail→log | `notify-run-sse.hub.spec.ts` | |
| Local hub | TTL, complete, publish-after-complete | `local-run-sse.hub.spec.ts` (ex InMemory) | |
| LISTEN SSE | publish→hub; publish-log→getLogById→run.log; miss→skip | `run-sse-notify.listener.spec.ts` | |
| getLogById | hit / miss | adapter / port spec | |
| LISTEN abort | payload → registry | `run-abort-notify.listener.spec.ts` | |
| AbortRegistry | begin/pending/end | `run-abort.registry.spec.ts` | |
| Pump claim/HITL-A/cap/fail | przeniesione z in-process | `run-execute.pump.spec.ts` | |
| pg-boss handlers | wake→notifyQueued; execute→schedule; skip non-running; mock `PgBossWorkerClient` | `pg-boss-run.worker.spec.ts` | |
| StartRun | `enqueueWake` | `start-run.use-case.spec.ts` | |
| ResumeHitl | `enqueueExecute` | `resume-hitl.use-case.spec.ts` | |
| Cancel | `RunAbortSignalPort` | `cancel-run.use-case.spec.ts` | |
| DeleteUser purge | abort signal | `delete-user.use-case.spec.ts` | |
| Env worker | TTL/cap parse | `worker` env spec | |

**Weryfikacje obowiązkowe:**

1. **Orphan check:** brak importów `InProcessRunWorker` / `InMemoryRunSseHub` w `apps/` (grep = 0).
2. **Owner check:** żaden `OnModuleInit` w api nie woła `RecoverInterruptedRuns` / `AutoFinalize` / pump drain.
3. **Podwójny owner / D1:** recovery/sweep **nie** zarejestrowane jednocześnie w api i workerze; Cancel w api **nie** woła lokalnego `RunAbortRegistry` po cutoverze.
4. **D2:** boot workera po `recover` zawsze enqueue wake.
5. **D3:** api bez `createQueue`/`work`; worker ma oba.
6. **D4:** brak pełnego `run.log` w NOTIFY `publish`; jest `publish-log` + hydrate.
7. **D6:** `rg "from ['\"]pg-boss['\"]" apps/api apps/worker` = 0; load runtime tylko `await import('pg-boss')` w factory; unit bez require pakietu.
8. **Uruchomienie:** `pnpm --filter api test` oraz `pnpm --filter worker test` — zielone.
9. **Luki:** jeśli mapa pokazuje brakujący przypadek z FAZA 1–2 — **dopisz unit w tym kroku** (nie odkładaj na e2e).

**DoD kroku:** tabela kompletna; orphan = 0; **D6** grep czysty; oba suite unit zielone; brak świadomych dziur w mapie.

---

### KROK 3 — E2e / Postman: D-9 / D-9b / D-10 / D-14 / D-30…D-34 / D-35…D-40

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Regresja kontraktu operatora przy osobnym workerze (`SPEC-TESTY.md`). **Bez** nowych numerów D-*.

**Artefakty:** update istniejących e2e / kolekcji Postman (harness musi odpalać **api + worker** + PG); bez zmiany kształtu EventSource FE.

**Zakres asercji (skrót):**

| ID | Oczekiwanie po izolacji |
|----|-------------------------|
| D-9 / D-9b | execute poza api; queue + HITL A bez czekania na slot claim |
| D-10 | recovery po kill **workera**; api bez recovery boot; SSE recovery przez most |
| D-14 | SSE na api; eventy execute **i** recovery z workera (w tym `run.log` przez hydrate `publish-log`); cancel order + complete |
| D-30…D-34 | cancel + NOTIFY abort do workera; recovery+flaga → cancelled |
| D-35…D-40 | sweep boot+interval na workerze; api bez timera |

**DoD kroku:** powyższe D-* zielone w e2e/Postman przy topologii api+worker; kontrakt HTTP/SSE bez regresji kształtu.

---

#### Propozycja commit message

```text
chore(deploy): add Compose worker service and verify isolation tests

Ship the always-on worker container and close unit/e2e coverage for
queue, NOTIFY SSE/abort, recovery, and review sweep after the process split.
```

---

## Weryfikacja wycinka

| Kryterium | Dowód |
|-----------|--------|
| M-1 / M-10 | `apps/worker` istnieje; brak publicznego REST runów |
| R-5 / P-10 | pg-boss wake/execute; payload `{ runId }`; SoT = `Run` |
| R-6 A | claim cap + HITL poza FIFO; `inFlight` jak dziś |
| R-4 / R-4a | Local hub w api; Notify hub w workerze; LISTEN `cc_run_sse`; **D4** hydrate `run.log` po `logId` (rodzaj eventu w moście) |
| R-11 | AbortRegistry w workerze; api `RUN_ABORT_SIGNAL` → `run.abort` |
| R-9 / R-10 | recovery + sweep tylko worker; **D2** wake po recover |
| Deployment | Compose `worker` + wspólny PG; **D3** createQueue na workerze |
| Cut (**D1**) | brak middle state api/worker na deploy |
| Nest ↔ pg-boss (**D6**) | lokalne surface DI; `await import('pg-boss')` w factory; brak static `from 'pg-boss'` |
| Testy | unit per KROK + audyt FAZA 3/KROK 2 + D-* e2e |
| Major nietknięty w tej sesji planu | tak |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 34 | `WYKONANY` |
| Kroki 34.1–34.5 | `WYKONANY` |
| MILESTONE 34 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy 3.2 / 7 / 8 / 12 / 29 / 30 / 33 | bez edycji statusów (`WYKONANY`) |

---

## Nota sesji planu

- Grandfathering docs: `docs/README.md` bez frontmatteru (potwierdzone w sesji).
- Feature plan **nie** cytuje planów pomocniczych w rootcie / `aux-plans/`.
- Implementacja kodu = poza tą sesją (opcjonalnie ręczne `/feature-implementation`).
- **2026-11-16 — domknięcie HOW (D1–D5):** atomic cut; wake zawsze po recover; pg-boss `createQueue`/`work` tylko worker; most SSE hybrid hydrate `run.log` (`publish-log` + `{ logId, runId }`); fail NOTIFY/hydrate → log. Gate docs/SPEC/major: brak blokady („pełny zakres” = rodzaje eventów; koperta = HOW).
- **2026-11-16 — HOW D6 (pg-boss ESM ↔ Nest CJS):** po TS1479 na `import type { PgBoss } from 'pg-boss'` w `apps/api` (`nodenext`, brak `"type":"module"`). Ustalenie: lokalne `PgBossSendClient` / `PgBossWorkerClient` w `pg-boss.tokens.ts`; konstrukcja wyłącznie `await import('pg-boss')` w Nest factory; unit mockuje surface. Odrzucone: migracja Nest na ESM, `.mts`, `@ts-expect-error`, `resolution-mode` (nie usuwa 1479 w tym setupie). Zaktualizowano FAZA 1/K2–K3, FAZA 2/K1–K3, FAZA 3/K2 + meta HOW/założenia/Biblioteki — **bez** edycji FAZA 1/KROK 1 (`WYKONANY`).
- **2026-11-16 — FAZA 1 / KROK 2 → `WYKONANY`:** porty enqueue/abort, stałe/schema `{ runId }`, adaptery pg-boss send + NOTIFY abort, unit zielone; wire Nest = FAZA 2.
- **2026-11-16 — FAZA 1 / KROK 3 → `WYKONANY`:** `LocalRunSseHub`, koperta hybrid, `NotifyRunSseHub`, LISTEN+hydrate `getLogById` / `publishLog`, unit zielone; wire worker hub = FAZA 2.
