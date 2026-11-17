# Content Chain — feature plan: packages `runs-kernel` + `run-pipelines` (Faza 35)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-35-runs-kernel-packages.md`  
**Kotwica major:** Faza 35 w `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 35).  
**Refaktor względem:** Faza 34 / 34.1–34.5 (`WYKONANY`) — day-1 import TS `apps/worker` → `apps/api/src`; ownership runtime **bez zmian**.  
**Źródła:** `docs/architektura.md`, `docs/architektura_katalogi_pliki.md`, `docs/dictionary.md`, `docs/anty_patterny.md`, `docs/deployment.md`, `SPEC-MONOREPO.md` M-1/M-8/M-10/M-11, `SPEC-PERSISTENCE.md` P-2, `SPEC-RUNY.md` R-5/R-5a (+ R-9/R-10/R-11 bez regresji), `SPEC-SOCIAL.md` S-2, `SPEC-CONTENT.md` Ctn-2, `SPEC-README.md`.  
**Pass rozwojowy:** `parseTtlMs` poza Auth **przed** extractem kernela; szkielet obu packages na starcie; `runs-kernel` **przed** `run-pipelines`; assets w pakiecie **przed** DoD bootu; closure/audit R-5a; **FAZA 5** platform extract **po** R-5a.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Faza 35: `@content-chain/runs-kernel` + `@content-chain/run-pipelines`; zakaz TS app↔app; cienkie hosty; assets; closure; DoD R-5a; **FAZA 5** = `@content-chain/domain-kit` + `@content-chain/persistence` (platform extract po R-5a) |
| Major | Faza 35 / 35.1 / 35.2 → po FAZACH 1–4 `WYKONANY`; **bez** MILESTONE 35; FAZA 5 = follow-up **poza** 35.1/35.2 |
| Poza zakresem | Major FE; extract Auth do osobnego pakietu; osobne `@content-chain/social` / `@content-chain/content`; model B (execute przez HTTP/RPC do api); przepisywanie Fazy 34; przenoszenie Prisma schema poza `apps/api`; nowy major krok 35.3 |
| Po implementacji (informacyjnie) | Major Faza 35 / 35.1 / 35.2 → `WYKONANY` po FAZACH 1–4. Brak `OSIĄGNIĘTY`. FAZA 5 nie oznacza major. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 35.1 pakiety + zakaz app↔app | FAZA 1–2 | szkielet, TTL, extract kernela, wire hostów bez day-1, **jeden token `ENV` (Symbol)** |
| 35.2 execute slice + assets + closure + DoD | FAZA 3–4 | `run-pipelines`, assets, `RUN_EXECUTOR`, Dockerfile/deps, audit bootu |
| *(poza major 35.x)* platform extract | FAZA 5 | `domain-kit` + `persistence`; hard cut platformy z `runs-kernel` / duplikatów api |

**Pass rozwojowy (sesja planu):**

1. `parseTtlMs` / `parseTtlSeconds` → `packages/shared` **przed** przeniesieniem plików kernela (worker-env / sweep / review importują dziś `auth.helpers` → ryzyko `bcrypt` w grafie workera).
2. Szkielet **obu** packages (pusty export) **przed** move — `workspace:*` i kolejność build.
3. `runs-kernel` **przed** `run-pipelines` (porty `RUN_*` / lifecycle).
4. Po wire hostów (FAZA 2 / KROK 2): **KROK 3** — jeden `ENV` = `Symbol` z kernela w api + worker + e2e (zanim FAZA 3 pipelines).
5. Assets `*.prompt.md` w `run-pipelines` **przed** DoD bootu workera.
6. Closure `package.json` / Dockerfile + audit `rg` **na końcu** FAZY 4 (R-5a).
7. FAZA 5 **po** zielonym R-5a — platform extract (`domain-kit` / `persistence`).
8. **Brak przesunięć między fazami major.**

**Decyzje HOW (zamknięte w sesji):**

| Temat | Wartość |
|-------|---------|
| Forma pakietów | Jak `packages/shared`: `tsc` + `package.json` `main`/`types`/`exports` — **nie** Nest `libs/` / nest-cli library |
| `parseTtlMs` | `packages/shared/src/ttl.ts` (bez Nest, bez Auth); Auth/rejestry importują z `@content-chain/shared` |
| `DomainException` + `parseWithZod` + pagination helpers | **Docelowo (FAZA 5):** `@content-chain/domain-kit`. *Interim FAZY 2–4:* mogą żyć w `runs-kernel` / api `shared/` do cutoveru — **hard cut** w FAZIE 5 |
| `ENV` token + `WorkerEnvModule` + `worker-env.schema` | → `runs-kernel` (`Symbol('ENV')`); api `EnvModule` / `env.schema` zostają w `apps/api`; **jeden** token DI w obu hostach (FAZA 2 / KROK 3) — **zakaz** lokalnego `ENV = 'ENV'` (string) obok Symbola kernela |
| `PrismaModule` / `PrismaService` / `toInputJson` | **Docelowo (FAZA 5):** `@content-chain/persistence`; schema Prisma **zostaje** w `apps/api/prisma`. *Interim FAZY 2–4:* mogą żyć w `runs-kernel` / api `shared/persistence` |
| `PaginationQueryDto` | zostaje w `apps/api/src/shared/http/` (HTTP-only) |
| Local hub SSE + LISTEN | zostają w **api** (`LocalRunSseHub`, `RunSseNotifyListener`) — nie w workerze |
| Notify hub + abort LISTEN + pg-boss work + pump | → `runs-kernel` |
| Social+Content execute + prompty + result stores + LLM hop + `CompanyContextCoreModule` | → `run-pipelines` |
| Api `RUN_EXECUTOR` | **bez** Social/Content executors; `UnsupportedRunExecutor` (throw) — pump tylko w workerze |
| Api result reader | `RunPipelineResultStoresModule` z `run-pipelines` |
| Hard cut | **bez** długowiecznych re-exportów drzewa `apps/api/src/social|content` po move; update importów; FAZA 5: **bez** re-exportów platformy z `runs-kernel` |
| Composition root workera | `apps/worker/src/worker-runtime.module.ts` — klej DI; pakiety eksportują klasy/tokeny/moduły cząstkowe, **nie** finalny moduł z pipelines wewnątrz kernela |
| Model execute | **A** (lokalnie w workerze); model B odrzucony |
| Docker worker | COPY `packages/{shared,domain-kit,persistence,runs-kernel,run-pipelines}` + `apps/worker`; **bez** COPY całego drzewa źródeł `apps/api` jako SoT kodu (schema prisma: wyjątek generate/copy) |
| Powrót platformy tylko do api | **odrzucony** (łamie izolację workera) |

---

## Założenia

- Stack: NestJS 11, Zod 4.4.x, Prisma 6 + PostgreSQL, LangGraph jak w api, pnpm workspace, Node jak Dockerfile (`24.19.0`).
- `packages/shared` = typy/brand/TTL util — **bez** Zod (M-1 / istniejąca norma).
- Ownership R-5 / R-9 / R-10 / R-11 **bez regresji** (execute/recovery/sweep/AbortRegistry = worker; HTTP/Subjecty/enqueue = api).
- Typy: jawne na portach; zakaz `any`; `import type`; bez osłabiania kontraktów przy move.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.
- Nest monorepo „library” z docs Nest = inspiracja; w tym repo kanon = `packages/*` + `workspace:*` (jak shared).

---

## Biblioteki / API

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| Workspace packages | `package.json` name `@content-chain/…`, `main`/`types`/`exports` → `dist`, build `tsc` | Context7 Nest recipes (contracts package); wzorzec `packages/shared` |
| Nest host | Worker: `NestFactory.createApplicationContext`; api: istniejący HTTP | SPEC M-10 |
| Assets promptów | `*.prompt.md` w pakiecie + kopiowanie do `dist` w `build`; `loadPromptFromDir(__dirname, …)` | SPEC M-11 / S-2 / Ctn-2 |
| pg-boss / NOTIFY | bez zmiany kontraktu Fazy 34 (D3/D6) | SPEC R-5 / R-4 |

---

## FAZA 1 — Szkielet packages + util TTL poza Auth

Odpowiada major **35.1** (start). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Szkielet `packages/runs-kernel` + `packages/run-pipelines`

**Status:** `WYKONANY`

**Cel:** Istnieją puste (export-only) pakiety workspace; `pnpm -r` / filter build widzi oba (M-1). Major 35.1.

**Artefakty (nowe):**

- `packages/runs-kernel/package.json`
- `packages/runs-kernel/tsconfig.json`
- `packages/runs-kernel/src/index.ts`
- `packages/run-pipelines/package.json`
- `packages/run-pipelines/tsconfig.json`
- `packages/run-pipelines/src/index.ts`
- Root `tsconfig.json` — dopisek `references`
- Root / app `package.json` — `workspace:*` deps (api + worker) w KROK 2 FAZY 2 / 3 przy wire; tu tylko pakiety się budują

#### `packages/runs-kernel/package.json` — kompletny

```json
{
  "name": "@content-chain/runs-kernel",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsc -p tsconfig.json --watch"
  },
  "dependencies": {
    "@content-chain/shared": "workspace:*",
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.0",
    "@prisma/client": "^6",
    "pg": "^8.23.1",
    "pg-boss": "^12.38.2",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/pg": "^8.15.0",
    "typescript": "^5.7.0"
  }
}
```

> Pin `pg` / `pg-boss` do wersji z lockfile workspace (jak `apps/worker`). Nie dokładaj `bcrypt`, swagger, nodemailer, passport.

#### `packages/runs-kernel/tsconfig.json` — kompletny

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "node",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

#### `packages/runs-kernel/src/index.ts` — start (szkielet)

```typescript
/** @content-chain/runs-kernel — lifecycle / recovery / sweep / abort / pump-dispatch. */
export {};
```

#### `packages/run-pipelines/package.json` — kompletny

```json
{
  "name": "@content-chain/run-pipelines",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc -p tsconfig.json && node ./scripts/copy-prompt-assets.mjs",
    "dev": "tsc -p tsconfig.json --watch"
  },
  "dependencies": {
    "@content-chain/runs-kernel": "workspace:*",
    "@content-chain/shared": "workspace:*",
    "@langchain/core": "^1.2.8",
    "@langchain/langgraph": "^1.4.10",
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@prisma/client": "^6",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.7.0"
  }
}
```

#### `packages/run-pipelines/tsconfig.json` — kompletny

Jak `runs-kernel` (CJS + decorators + `strict`), `rootDir`/`outDir` analogicznie.

#### `packages/run-pipelines/src/index.ts` — start

```typescript
/** @content-chain/run-pipelines — execute Social+Content + prompt assets. */
export {};
```

#### `packages/run-pipelines/scripts/copy-prompt-assets.mjs` — kompletny

```javascript
import { cpSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = join(root, 'src');
const distRoot = join(root, 'dist');

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!name.endsWith('.prompt.md')) continue;
    const rel = relative(srcRoot, full);
    const dest = join(distRoot, rel);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(full, dest);
  }
}

walk(srcRoot);
```

**Root `tsconfig.json` — `teraz` → `zamień na` (fragment `references`):**

```json
{
  "path": "./packages/shared/tsconfig.json"
},
{
  "path": "./packages/runs-kernel/tsconfig.json"
},
{
  "path": "./packages/run-pipelines/tsconfig.json"
},
{
  "path": "./apps/api/tsconfig.json"
}
```

(dodaj entries packages obok istniejących apps; `packages/shared` jeśli jeszcze nie ma w `references` — dopisz).

**Testy:** `pnpm --filter @content-chain/runs-kernel build` oraz `pnpm --filter @content-chain/run-pipelines build` → exit 0.

**DoD kroku:**

- Katalogi `packages/runs-kernel` i `packages/run-pipelines` istnieją; build zielony.
- Brak deps Auth/HTTP w `package.json` obu pakietów.

---

### KROK 2 — `parseTtlMs` / `parseTtlSeconds` → `@content-chain/shared`

**Status:** `WYKONANY`

**Cel:** Util TTL poza `auth/` (M-11 / anty-pattern util+bcrypt). Odblokowuje extract kernela bez side-effect `require('bcrypt')`.

**Artefakty:**

- **Nowy:** `packages/shared/src/ttl.ts`
- **Zmiana:** `packages/shared/src/index.ts` (re-export)
- **Zmiana:** `apps/api/src/auth/application/auth.helpers.ts` — usunięcie obu funkcji; Auth importuje z shared
- **Zmiana importów:** wszystkie `parseTtlMs` / `parseTtlSeconds` z `auth.helpers` → `@content-chain/shared` (runs review, worker-env, cookie helper, auth use-case’y)

#### `packages/shared/src/ttl.ts` — kompletny

```typescript
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

/** jsonwebtoken `expiresIn` as number = seconds. */
export function parseTtlSeconds(ttl: string): number {
  return Math.floor(parseTtlMs(ttl) / 1000);
}
```

#### `packages/shared/src/index.ts` — dopisek

```typescript
export * from './ttl';
```

#### `auth.helpers.ts` — `teraz` → `zamień na` (usunąć blok TTL; zostawić bcrypt/hash)

Usuń `parseTtlMs` i `parseTtlSeconds` z pliku. Przykład call-site:

```typescript
// teraz
import { parseTtlMs } from '../../auth/application/auth.helpers';
// zamień na
import { parseTtlMs } from '@content-chain/shared';
```

To samo dla `parseTtlSeconds` w `auth.module.ts` / cookie helper.

**Testy:** istniejące unit Auth + `worker-env.schema.spec` (jeśli jest) — zielone po zmianie importu; opcjonalnie mały unit `ttl` w shared (nie wymagany jeśli regresja Auth pokrywa).

**DoD kroku:**

- `rg "parseTtlMs" apps/api/src/auth/application/auth.helpers.ts` → brak.
- Żaden plik poza Auth-hash nie importuje TTL z `auth.helpers`.
- `auth.helpers` nadal może importować `bcrypt` — **nie** jest importowany przez worker-env / runs.

---

#### Propozycja commit message

```text
chore(monorepo): scaffold runs-kernel and run-pipelines; move TTL helpers to shared

Unblock worker extract without pulling bcrypt via auth.helpers into the runtime graph.
```

---

## FAZA 2 — Extract `@content-chain/runs-kernel` + hosty bez day-1

Odpowiada major **35.1**. Status startowy: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Przeniesienie kernela Runs do `packages/runs-kernel`

**Status:** `WYKONANY`

**Cel:** Współdzielony kod lifecycle / recovery / sweep / abort / pump / dispatch (+ Prisma run + Notify SSE) w pakiecie; **bez** HTTP controllers / Auth / FE (M-1 / R-5).

**Strategia:** `git mv` (lub równoważny move) plików poniżej → `packages/runs-kernel/src/...`; poprawa importów względnych na pakietowe; **nie** wklejać treści każdego pliku w planie — treść = istniejąca, zmiana = lokalizacja + importy.

#### Mapa przeniesień (źródło → cel)

| Z `apps/api/src/…` | Do `packages/runs-kernel/src/…` |
|--------------------|--------------------------------|
| `shared/exceptions/domain.exception.ts` | `shared/domain.exception.ts` |
| `shared/parse-with-zod.ts` (+ `.spec` jeśli przenosisz) | `shared/parse-with-zod.ts` |
| `shared/persistence/prisma.service.ts` | `persistence/prisma.service.ts` |
| `shared/persistence/prisma.module.ts` | `persistence/prisma.module.ts` |
| `shared/config/env.ts` (`ENV` token) | `config/env.token.ts` (sam Symbol + typ `RuntimeEnv`) |
| `shared/config/worker-env.schema.ts` (+ spec) | `config/worker-env.schema.ts` |
| `shared/config/worker-env.module.ts` | `config/worker-env.module.ts` |
| `runs/domain/run-executor.port.ts` | `domain/run-executor.port.ts` |
| `runs/domain/run-lifecycle.port.ts` | `domain/run-lifecycle.port.ts` |
| `runs/domain/run.port.ts` | `domain/run.port.ts` |
| `runs/domain/run-sse.port.ts` | `domain/run-sse.port.ts` |
| `runs/domain/run-stats.port.ts` | `domain/run-stats.port.ts` |
| `runs/domain/run-job-enqueue.port.ts` | `domain/run-job-enqueue.port.ts` |
| `runs/domain/run-abort-signal.port.ts` | `domain/run-abort-signal.port.ts` |
| `runs/domain/run.types.ts` | `domain/run.types.ts` |
| `runs/domain/status-transitions.ts` (+ spec) | `domain/status-transitions.ts` |
| `runs/domain/is-retryable.ts` (+ spec) | `domain/is-retryable.ts` |
| `runs/domain/review-window.ts` (+ spec) | `domain/review-window.ts` |
| `runs/domain/assert-run-reviewable.ts` (+ spec) | `domain/assert-run-reviewable.ts` |
| `runs/application/lifecycle/*` (cały katalog, w tym specs) | `application/lifecycle/*` |
| `runs/application/recover-interrupted-runs.use-case.ts` (+ spec jeśli jest) | `application/recover-interrupted-runs.use-case.ts` |
| `runs/application/auto-finalize-expired-reviews.use-case.ts` (+ spec) | `application/auto-finalize-expired-reviews.use-case.ts` |
| `runs/infrastructure/dispatch/*` | `infrastructure/dispatch/*` |
| `runs/infrastructure/sse/notify-run-sse.hub.ts` (+ spec) | `infrastructure/sse/notify-run-sse.hub.ts` |
| `runs/infrastructure/sse/run-sse-notify.envelope.ts` (+ spec) | `infrastructure/sse/run-sse-notify.envelope.ts` |
| `runs/infrastructure/persistence/prisma-run.adapter.ts` (+ powiązane mappery run **tylko** jeśli nie zależą od HTTP) | `infrastructure/persistence/prisma-run.adapter.ts` |
| `runs/worker-runtime.module.ts` | **nie do pakietu** — przenieś do `apps/worker/src/worker-runtime.module.ts` (composition root hosta; anti-cykl z `run-pipelines`) |

**Zostaje w `apps/api` (nie przenosić w tym kroku):**

- `runs/http/*`, `runs.controller*`, use-case’y HTTP (start/cancel/list/…)
- `LocalRunSseHub`, `RunSseNotifyListener` (Subjecty + LISTEN w api)
- `run-lifecycle.module.ts` (api composition: Local hub) — **zaktualizować importy** portów/serwisów z pakietu
- `run-dispatch.module.ts` (enqueue api)
- guest / feedback / auth

**Composition root workera:** od FAZY 2 plik `WorkerRuntimeModule` żyje w `apps/worker/src/` i importuje klasy/tokeny z `@content-chain/runs-kernel`. W FAZIE 3 dopina `RunPipelinesModule` + factory `RUN_EXECUTOR`. **Zakaz** umieszczania finalnego kleju pipelines wewnątrz `runs-kernel` (cykl kernela ↔ pipelines).

#### `RuntimeEnv` + token — nowy kształt w kernela

```typescript
// packages/runs-kernel/src/config/env.token.ts
export const ENV = Symbol('ENV');

/** Narrow env surface used by worker + shared lifecycle providers. */
export type RuntimeEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  GATEWAY_BASE_URL: string;
  GATEWAY_KEY: string;
  GATEWAY_MODEL_ALIAS: string;
  MAX_CONCURRENT_RUNS: number;
  REVIEW_TTL: string;
  REVIEW_SWEEP_INTERVAL: string;
};
```

`validateWorkerEnv` zwraca `RuntimeEnv` (usuń fillers pod pełne `Env` api — niepotrzebne po zawężeniu typów w przeniesionych providerach). Providerzy kernela typują `@Inject(ENV) private readonly env: RuntimeEnv`.

Api `Env` (pełne) **strukturalnie** spełnia `RuntimeEnv` tam, gdzie api wstrzykuje ten sam token do serwisów współdzielonych (np. `RunLifecycleService` w api) — albo api Lifecycle używa pełnego `Env` z lokalnego tokenu. **Preferencja ponytail:** jeden Symbol `ENV` z kernela; api `EnvModule` providuje pełny obiekt `Env` jako `ENV` (nadzbiór pól).

#### `UnsupportedRunExecutor` — nowy plik w kernela

```typescript
import { Injectable } from '@nestjs/common';
import { DomainException } from '../shared/domain.exception';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRecord } from '../domain/run.types';

/** Api host must not execute pipelines (model A = worker only). */
@Injectable()
export class UnsupportedRunExecutor implements RunExecutorPort {
  execute(_run: RunRecord): Promise<void> {
    return Promise.reject(
      new DomainException(
        'EXECUTE_ON_WORKER_ONLY',
        'Run execute is owned by apps/worker',
        500,
      ),
    );
  }
}
```

#### `packages/runs-kernel/src/index.ts` — po extract (eksporty publiczne)

Eksportuj minimum potrzebne hostom:

- tokeny / porty: `ENV`, `RUN_*`, typy `RunRecord`, …
- `DomainException`, `parseWithZod`
- `PrismaModule`, `PrismaService`
- `WorkerEnvModule`, `validateWorkerEnv`
- `UnsupportedRunExecutor`
- `RunLifecycleService` (api `RunLifecycleModule` reużywa)
- klasy pump / abort / recovery / sweep / dispatch / `NotifyRunSseHub` / `PrismaRunAdapter` / tokeny pg-boss
- enqueue/abort adaptery używane przez api (`PgBossRunJobEnqueue`, `PgNotifyAbortSignal`, stałe kolejek, `loadPgBoss`, …)

**Uwaga DI:** `apps/worker/src/worker-runtime.module.ts` w FAZIE 2 rejestruje providers kernela; `RUN_EXECUTOR` tymczasowo = `UnsupportedRunExecutor` aż FAZA 3 podłączy `RunPipelinesModule`. DoD pełnego bootu execute = FAZA 4. DoD FAZY 2 = brak day-1 importów + api/worker na `workspace:*` runs-kernel.

**Kolejność w kroku:**

1. Move plików + fix importów wewnątrz pakietu.
2. `index.ts` eksporty.
3. `pnpm --filter @content-chain/runs-kernel build`.
4. Update api call-sites (KROK 2).

**Testy:** przenieś `*.spec.ts` razem z jednostkami; `pnpm --filter api test` dla ścieżek nieprzeniesionych + uruchom specs kernela przez jest api **albo** dodaj `test` script w pakiecie (minimalnie: api jest z `moduleNameMapper` na dist/src pakietu). Preferencja: specs obok źródeł w pakiecie; api/worker jest `moduleNameMapper`:

```json
"^@content-chain/runs-kernel$": "<rootDir>/../../packages/runs-kernel/src/index.ts",
"^@content-chain/runs-kernel/(.*)$": "<rootDir>/../../packages/runs-kernel/src/$1"
```

**DoD kroku:**

- Kod z mapy żyje w `packages/runs-kernel`.
- Pakiet buduje się; brak importów z `apps/api` / `apps/worker` wewnątrz pakietu.
- Brak `bcrypt` / swagger / nodemailer w deps pakietu.

---

### KROK 2 — Wire api + worker na `runs-kernel`; skasuj day-1 import

**Status:** `WYKONANY`

**Cel:** Oba hosty zależą od `@content-chain/runs-kernel` przez `workspace:*`; **zakaz** TS `apps/worker` ↔ `apps/api` (M-10). Day-1 unieważniony w kodzie.

**Artefakty (zmiany):**

- `apps/api/package.json` — dependency `"@content-chain/runs-kernel": "workspace:*"`
- `apps/worker/package.json` — to samo (+ usunięcie zbędnych jeśli przeniesione)
- `apps/worker/src/worker-app.module.ts`
- `apps/worker/src/main.spec.ts` — importy z pakietu
- `apps/api/src/**` — importy `DomainException` / `parseWithZod` / portów / lifecycle z `@content-chain/runs-kernel`
- `apps/api/src/runs/run-lifecycle.module.ts` — import klas z pakietu; Local hub zostaje lokalnie
- Usuń puste katalogi po move

#### `apps/worker/src/worker-app.module.ts` — `teraz` → `zamień na`

```typescript
// teraz
import { WorkerRuntimeModule } from '../../api/src/runs/worker-runtime.module';

// zamień na
import { WorkerRuntimeModule } from './worker-runtime.module';
```

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkerRuntimeModule } from './worker-runtime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    WorkerRuntimeModule,
  ],
})
export class WorkerAppModule {}
```

`worker-runtime.module.ts` w workerze: skopiuj/ przenieś dotychczasową treść z api, zamień importy ścieżek api → `@content-chain/runs-kernel`; do FAZY 3 bez Social/Content — `RUN_EXECUTOR: UnsupportedRunExecutor`.

#### Api `RunLifecycleModule` — kierunek

```typescript
// przykładowe importy po zmianie
import {
  PrismaRunAdapter,
  RUN_LIFECYCLE,
  RUN_REPOSITORY,
  RUN_SSE_HUB,
  RUN_STATS_PORT,
  RunLifecycleService,
  OUTPUT_EDITED_WRITER, // jeśli port przeniesiony; inaczej zostaw lokalnie
} from '@content-chain/runs-kernel';
import { LocalRunSseHub } from './infrastructure/sse/local-run-sse.hub';
import { RunSseNotifyListener } from './infrastructure/sse/run-sse-notify.listener';
```

> Jeśli `OUTPUT_EDITED_WRITER` / `PrismaOutputEditedAdapter` zostają w api (HTTP edit) — **nie** przenoś ich w FAZIE 2; zostaw w api z importem typów run z kernela.

#### Api `AppModule` — `RUN_EXECUTOR` bez Social/Content (fragment)

```typescript
import {
  UnsupportedRunExecutor,
  RUN_LIFECYCLE,
  type RunExecutorPort,
} from '@content-chain/runs-kernel';

// w RunsModule.registerAsync:
inject: [RUN_LIFECYCLE],
useFactory: (lifecycle: RunLifecyclePort): RunExecutorPort =>
  new UnsupportedRunExecutor(),
```

`SocialModule` / `ContentModule` w `AppModule` **na ten krok** mogą zostać tylko pod `resultReader` — wycinane w FAZIE 3 po `RunPipelineResultStoresModule`.

**Testy:**

- `rg "apps/api/src|\\.\\./\\.\\./api/src" apps/worker` → **0** trafień importów TS.
- `rg "from ['\"].*apps/worker" apps/api` → **0**.
- Unit api: lifecycle / enqueue / abort signal — zielone.
- Unit worker `main.spec.ts` — mocki z `@content-chain/runs-kernel`.

**DoD kroku:**

- Day-1 import usunięty z `worker-app.module.ts` i `main.spec.ts`.
- Api kompiluje się z kernela.
- Semantyka ownership bez zmian w kodzie ścieżek HTTP.
- Token `ENV`: domknięcie w **KROK 3** (ten krok nie zostawia string `'ENV'` jako SoT DI).

---

### KROK 3 — Jeden token DI `ENV` = `Symbol` z `runs-kernel` (api + worker + e2e)

**Status:** `WYKONANY`

**Refaktor względem:** FAZA 2 / KROK 1 (WYKONANY) — `packages/runs-kernel/src/config/env.token.ts` (`Symbol('ENV')` + `RuntimeEnv`). Cel: usunąć footgun Nest DI (string `'ENV'` w api vs `Symbol` w kernela), żeby `@Inject(ENV)` w providerach z pakietu resolvował ten sam provider co `EnvModule` / `WorkerEnvModule`.

**Cel:** W obu hostach i w testach e2e topologii workera istnieje **dokładnie jeden** token `ENV` — eksportowany z `@content-chain/runs-kernel`. Api nadal waliduje pełne `Env` (`env.schema` + `EnvModule`); obiekt `Env` jest **nadzbiorem** `RuntimeEnv` i jest providowany pod ten sam Symbol. **Zakaz** drugiego SoT (`export const ENV = 'ENV'` albo osobny Symbol lokalny).

**Artefakty (zmiany):**

- `apps/api/src/shared/config/env.ts` — bez własnej definicji tokenu
- `apps/api/src/shared/config/env.module.ts` — `provide: ENV` z importu kernela
- Call-site’y api importujące `ENV` z `shared/config/env` — albo przez cienki re-export w `env.ts`, albo bezpośrednio z `@content-chain/runs-kernel` (jedna konwencja w całym api)
- `apps/api/test/boot-worker-e2e.ts` — `ENV` / `overrideProvider(ENV)` z `@content-chain/runs-kernel` (nie ze stringowego tokenu api)
- Specs / override’y Jest, które rejestrują `ENV` — ten sam Symbol
- Worker: potwierdź, że composition root już injectuje Symbol z kernela (bez regresji do stringa)

#### `apps/api/src/shared/config/env.ts` — `teraz` → `zamień na`

```typescript
// teraz
import type { Env } from './env.schema';
export const ENV = 'ENV';
export type { Env };

// zamień na — token wyłącznie z kernela; typ Env zostaje lokalny (pełne api schema)
export type { Env } from './env.schema';
export { ENV } from '@content-chain/runs-kernel';
```

> Alternatywa równoważna (też OK): usuń plik `env.ts` i wszędzie `import { ENV } from '@content-chain/runs-kernel'` + `import type { Env } from './env.schema'`. Preferencja ponytail: **re-export** jak wyżej — mniejszy diff call-site’ów.

#### `EnvModule` — bez zmiany kształtu providera, inny token

```typescript
import { Global, Module } from '@nestjs/common';
import { ENV } from './env'; // re-export Symbol z @content-chain/runs-kernel
import { validateEnv } from './env.schema';

@Global()
@Module({
  providers: [
    {
      provide: ENV,
      useFactory: () => validateEnv(process.env),
    },
  ],
  exports: [ENV],
})
export class EnvModule {}
```

`validateEnv` zwraca pełne `Env`; providerzy kernela typują `RuntimeEnv` — structural typing / nadzbiór pól wystarcza (bez castów „na siłę” i bez drugiego providera).

#### `boot-worker-e2e.ts` — kierunek

```typescript
// teraz (przykład problematyczny)
import { ENV, type Env } from '../src/shared/config/env';
// po KROK 3 — ENV musi być tym samym symbolem co w WorkerRuntimeModule:
import { ENV } from '@content-chain/runs-kernel';
// type Env: zostaw z api schema albo użyj RuntimeEnv w worker e2e, jeśli wystarczy wąski surface
```

`overrideProvider(ENV).useValue(...)` w e2e **musi** używać Symbola z kernela — inaczej override nie trafia w `@Inject(ENV)` pump/abort/sweep.

**Kolejność w kroku:**

1. Przepnij `env.ts` / importy tokenu (api).
2. Przepnij `boot-worker-e2e` + inne override’y testowe.
3. `rg` audit (DoD) → build api + worker.

**Testy:**

- Unit / boot Nest api: providerzy z `@Inject(ENV)` (Auth, Runs HTTP, dispatch) dostają `Env` po starcie `AppModule`.
- Providerzy przeniesieni do kernela używani w api (`RunLifecycleService` itd.) resolvują env **bez** `UnknownDependenciesException` dla `ENV`.
- `bootWorkerE2e` / worker unit: `overrideProvider(ENV)` działa na pump / recovery.
- `rg -n "export const ENV = 'ENV'|export const ENV = \\\"ENV\\\"" apps packages` → **0** (poza ewentualnym komentarzem historycznym w planie — nie w kodzie).

**DoD kroku:**

- [ ] Jedyny runtime token `ENV` = `Symbol` z `@content-chain/runs-kernel` (api `EnvModule`, worker `WorkerEnvModule`, e2e overrides).
- [ ] Brak stringowego SoT `ENV = 'ENV'` w `apps/` / `packages/`.
- [ ] Api i worker kompilują się; smoke DI: lifecycle / dispatch w api + worker context bez braku `ENV`.
- [ ] Semantyka walidacji: api = pełne `env.schema`; worker = `validateWorkerEnv` → `RuntimeEnv` — bez zmiany ownership env hostów.

---

#### Propozycja commit message

```text
refactor(runs): extract runs-kernel package and drop worker→api imports

Shared lifecycle, recovery, sweep, abort, and pump live in workspace package; hosts depend via workspace protocol.
```

```text
fix(api): bind EnvModule to runs-kernel ENV Symbol

Stop Nest DI miss between string 'ENV' in api and Symbol token used by kernel providers and worker e2e overrides.
```

---

## FAZA 3 — Extract `@content-chain/run-pipelines` + assets + `RUN_EXECUTOR`

Odpowiada major **35.2**. Status startowy: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Slice Social+Content + assets w `run-pipelines`

**Status:** `WYKONANY`

**Cel:** Fasady / executory / graph / prompty / result stores (+ LLM hop, company-context **repo-only**) w jednym pakiecie (S-2 / Ctn-2 / decyzja „nie osobne social/content packages”).

#### Mapa przeniesień

| Z `apps/api/src/…` | Do `packages/run-pipelines/src/…` |
|--------------------|-----------------------------------|
| `social/**` (bez ewentualnego pustego HTTP — tu nie ma controllera) | `social/**` |
| `content/**` | `content/**` |
| `shared/llm/*` (`llm-hop`, `load-prompt`, `parse-llm-json`, `is-abort-error` + specs) | `llm/*` |
| `llm/*` (gateway port/adapter/module) | `llm-gateway/*` |
| `company-context/company-context-core.module.ts` | `company-context/company-context-core.module.ts` |
| `company-context/domain/company-context.port.ts` | `company-context/domain/company-context.port.ts` |
| `company-context/infrastructure/prisma-company-context.adapter.ts` | `company-context/infrastructure/prisma-company-context.adapter.ts` |
| typy domain company needed by adapter/port | te same ścieżki względne w pakiecie **albo** import z api — **zakaz** importu pakietu z `apps/api`; przenieś **minimalny** zestaw typów/mapperów wymaganych przez adapter (pełne use-case’y HTTP CC zostają w api) |

**Company context — precyzja:** HTTP (`CompanyContextController`, use-case’y put/patch/get) zostają w `apps/api/src/company-context/`. Port + Prisma adapter + `CompanyContextCoreModule` żyją w `run-pipelines`. Api `CompanyContextModule` importuje `CompanyContextCoreModule` z `@content-chain/run-pipelines`. Jeśli adapter zależy od typów domain CC — przenieś **pliki domain potrzebne repo** (np. typy rekordu / mapper) do pakietu **albo** do wspólnego miejsca już w pakiecie; nie ciągnij controllera.

#### Nest module w pakiecie — `RunPipelinesModule` (wire execute)

Nowy plik `packages/run-pipelines/src/nest/run-pipelines.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { CompanyContextCoreModule } from '../company-context/company-context-core.module';
import { LlmModule } from '../llm-gateway/llm.module';
import { LlmHopService } from '../llm/llm-hop';
import { ContentPipelineFacade } from '../content/application/content-pipeline.facade';
import { ContentRunExecutor } from '../content/application/content-run.executor';
import { CONTENT_RESULT_STORE } from '../content/domain/content-result.port';
import { PrismaContentResultAdapter } from '../content/infrastructure/persistence/prisma-content-result.adapter';
import { SocialPipelineFacade } from '../social/application/social-pipeline.facade';
import { SocialRunExecutor } from '../social/application/social-run.executor';
import { SOCIAL_RESULT_STORE } from '../social/domain/social-result.port';
import { PrismaSocialResultAdapter } from '../social/infrastructure/persistence/prisma-social-result.adapter';

/**
 * Execute-side providers for worker composition root (model A).
 * Does not register RUN_EXECUTOR — host binds RunDispatchExecutor.
 */
@Module({
  imports: [LlmModule, CompanyContextCoreModule],
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
    LlmHopService,
    SocialPipelineFacade,
    SocialRunExecutor,
    ContentPipelineFacade,
    ContentRunExecutor,
  ],
  exports: [
    CompanyContextCoreModule,
    SOCIAL_RESULT_STORE,
    CONTENT_RESULT_STORE,
    SocialRunExecutor,
    ContentRunExecutor,
  ],
})
export class RunPipelinesModule {}
```

#### `RunPipelineResultStoresModule` — dla api (bez executorów / LLM)

```typescript
import { Module } from '@nestjs/common';
import { CONTENT_RESULT_STORE } from '../content/domain/content-result.port';
import { PrismaContentResultAdapter } from '../content/infrastructure/persistence/prisma-content-result.adapter';
import { SOCIAL_RESULT_STORE } from '../social/domain/social-result.port';
import { PrismaSocialResultAdapter } from '../social/infrastructure/persistence/prisma-social-result.adapter';

@Module({
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
  ],
  exports: [SOCIAL_RESULT_STORE, CONTENT_RESULT_STORE],
})
export class RunPipelineResultStoresModule {}
```

#### Assets

- Pliki `*.prompt.md` przeniesione **razem** z `infrastructure/prompts/`.
- `load-prompt.ts` w social/content nadal woła `loadPromptFromDir(__dirname, fileName)` — po `copy-prompt-assets.mjs` `__dirname` w `dist` ma obok `.prompt.md`.
- Usuń zależność workera od `apps/api/nest-cli.json` assets dla promptów (api nest-cli może nadal kopiować mail/seed; promptów SM/page **nie** musi już mieć jeśli nic w api ich nie czyta — po przeniesieniu usuń `**/*.prompt.md` z api nest-cli **tylko jeśli** żaden kod api ich nie ładuje).

#### Eksporty `packages/run-pipelines/src/index.ts`

- `RunPipelinesModule`, `RunPipelineResultStoresModule`
- porty/store symbole + typy potrzebne api (`SocialResultStore`, content types, schemas używane przez `SaveOutputEdited` / `output-edited-result.schemas`)
- **nie** eksportuj całego grafu publicznie bez potrzeby

**Testy:** przenieś specs Social/Content/LLM; build pakietu + copy assets (`test -f dist/social/infrastructure/prompts/ideation.prompt.md`).

**DoD kroku:**

- Brak `apps/api/src/social` / `apps/api/src/content` (katalogi usunięte po move).
- Assets w `dist` pakietu.
- Pakiet **nie** importuje `apps/*`.

---

### KROK 2 — Composition root workera + api result stores

**Status:** `WYKONANY`

**Cel:** Worker wiąże `RUN_EXECUTOR` przez `run-pipelines` (model A); api czyta/zapisuje wyniki przez stores z pakietu — **bez** importu execute z `apps/api` (R-5 / R-5a).

#### `apps/worker/src/worker-runtime.module.ts` — podłączenie pipelines (fragment)

```typescript
import {
  RunPipelinesModule,
  SocialRunExecutor,
  ContentRunExecutor,
} from '@content-chain/run-pipelines';
import {
  RunDispatchExecutor,
  RunLifecycleService,
  RUN_EXECUTOR,
  WorkerEnvModule,
  PrismaModule,
  // … AbortRegistry, Notify hub, recover, sweep, pg-boss, pump …
} from '@content-chain/runs-kernel';

@Module({
  imports: [WorkerEnvModule, PrismaModule, RunPipelinesModule],
  providers: [
    // … providers kernela jak w FAZIE 2 …
    {
      provide: RUN_EXECUTOR,
      useFactory: (
        social: SocialRunExecutor,
        content: ContentRunExecutor,
        lifecycle: RunLifecycleService,
      ) => new RunDispatchExecutor(social, content, lifecycle),
      inject: [SocialRunExecutor, ContentRunExecutor, RunLifecycleService],
    },
  ],
})
export class WorkerRuntimeModule {}
```

`RunDispatchExecutor` przyjmuje `RunExecutorPort` — **`runs-kernel` nie zależy od `run-pipelines`**. Klej tylko w hoście workera.

#### Api `AppModule` — `teraz` → `zamień na` (klej Runs)

```typescript
import { UnsupportedRunExecutor } from '@content-chain/runs-kernel';
import {
  RunPipelineResultStoresModule,
  SOCIAL_RESULT_STORE,
  CONTENT_RESULT_STORE,
  type SocialResultStore,
  type ContentResultStore,
} from '@content-chain/run-pipelines';

// imports: usuń SocialModule, ContentModule; dodaj RunPipelineResultStoresModule
RunsModule.registerAsync({
  imports: [RunPipelineResultStoresModule, RunLifecycleModule],
  inject: [],
  useFactory: (): RunExecutorPort => new UnsupportedRunExecutor(),
  resultReader: {
    inject: [SOCIAL_RESULT_STORE, CONTENT_RESULT_STORE],
    useFactory: (
      social: SocialResultStore,
      content: ContentResultStore,
    ): RunResultReader => new CompositeRunResultReader(social, content),
  },
}),
```

Usuń z api: `SocialModule`, `ContentModule`, `LlmModule` (jeśli nieużywany), importy executorów.

#### `CompanyContextModule` (api) — import core z pakietu

```typescript
import { CompanyContextCoreModule } from '@content-chain/run-pipelines';
```

**Deps:**

- `apps/worker/package.json`: `"@content-chain/run-pipelines": "workspace:*"`
- `apps/api/package.json`: to samo (result stores + CC core)

**Testy:** unit Social/Content/executor w pakiecie; unit api `SaveOutputEdited` / `GetRun` na stores; worker unit bootstrap widzi `RUN_EXECUTOR` factory.

**DoD kroku:**

- Worker composition **bez** ścieżek `apps/api/src`.
- Api **bez** modułów Social/Content execute.
- Model B nie występuje w kodzie.

---

#### Propozycja commit message

```text
refactor(pipelines): move Social/Content execute slice into run-pipelines

Worker binds RUN_EXECUTOR locally via package providers; prompt assets ship with the package dist.
```

---

## FAZA 4 — Closure deps + audit app↔app + DoD bootu (R-5a / M-11)

Odpowiada major **35.2** (domknięcie). Status startowy: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — `package.json` workera + Dockerfile bez drzewa źródeł api jako SoT

**Status:** `WYKONANY`

**Cel:** Dependency closure workera = host + `workspace:*` + deps faktycznie potrzebne; obraz nie opiera się o skopiowane źródła api (M-11 / deployment).

#### `apps/worker/package.json` — docelowe dependencies (kierunek)

Zostaw / miej:

- `@content-chain/shared`, `@content-chain/runs-kernel`, `@content-chain/run-pipelines`
- Nest core/config/common, `pg`, `pg-boss`, `prisma`/`@prisma/client`, `zod`, `rxjs`, `reflect-metadata`, `dotenv`, pino jeśli host loguje
- LangGraph **tylko jeśli** host importuje bezpośrednio — preferuj deps w `run-pipelines`, nie dubluj w workerze bez importu

**Zakaz** w workerze: `bcrypt`, `@nestjs/swagger`, `swagger-ui-express`, `nodemailer`, `passport`, `@nestjs/jwt`, `class-transformer` (chyba że host realnie importuje — nie powinien).

Usuń `moduleNameMapper` `@api/(.*)` z jest workera.

#### `apps/worker/Dockerfile` — `teraz` → `zamień na` (build stage, ideowo)

```dockerfile
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json .npmrc ./
COPY packages/shared ./packages/shared
COPY packages/runs-kernel ./packages/runs-kernel
COPY packages/run-pipelines ./packages/run-pipelines
COPY apps/worker ./apps/worker
# Prisma schema SoT nadal w api — kopiuj TYLKO schema (nie całe src api)
COPY apps/api/prisma ./apps/api/prisma
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile --filter worker...
RUN pnpm --filter @content-chain/shared build \
 && pnpm --filter @content-chain/runs-kernel build \
 && pnpm --filter @content-chain/run-pipelines build
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter worker build
RUN pnpm --filter worker deploy --prod /prod/worker \
  && mkdir -p /prod/worker/prisma \
  && cp apps/api/prisma/schema.prisma /prod/worker/prisma/schema.prisma \
  && test -f /prod/worker/dist/worker/src/main.js
```

> Jeśli `pnpm --filter api exec prisma generate` wymaga więcej plików api niż `package.json`+prisma — dołóż **minimalny** zestaw (np. lockpath), **nie** całe `apps/api/src`.

Usuń z builda: `COPY apps/api ./apps/api` jako pełne drzewo źródeł.

**DoD kroku:**

- Worker `package.json` bez deps Auth/HTTP z listy zakazów.
- Dockerfile bez pełnego `COPY apps/api` src.

---

### KROK 2 — Audit importów + DoD bootu (R-5a)

**Status:** `WYKONANY`

**Cel:** Weryfikowalne (a)(b)(c) z `SPEC-RUNY.md` R-5a.

#### (a) Audit `rg`

```bash
# musi być pusto (importy TS app↔app)
rg -n "from ['\"].*apps/api|from ['\"]\\.\\./.*api/src|from ['\"]@api/" apps/worker --glob '!**/node_modules/**' --glob '!**/dist/**'
rg -n "from ['\"].*apps/worker" apps/api/src --glob '!**/node_modules/**'
```

#### (b) Boot

```bash
pnpm --filter @content-chain/shared build
pnpm --filter @content-chain/runs-kernel build
pnpm --filter @content-chain/run-pipelines build
pnpm --filter worker build
# z DATABASE_URL + gateway env jak w .env.example workera:
pnpm --filter worker start
# oczekiwane: log Nest context + "Worker started." + brak crash; pg-boss work/recovery startuje (logi / brak throw)
```

#### (c) Stack bez Auth/HTTP

```bash
# przykładowy dowód: w drzewie require bootu workera brak bcrypt/swagger/mail
node -e "
const Module = require('module');
const orig = Module.prototype.require;
const hit = new Set();
Module.prototype.require = function(id) {
  if (/bcrypt|swagger|nodemailer|passport/.test(id)) hit.add(id);
  return orig.apply(this, arguments);
};
require('./apps/worker/dist/worker/src/main.js');
setTimeout(() => {
  if (hit.size) { console.error([...hit]); process.exit(1); }
  console.log('ok: no auth/http hits');
  process.exit(0);
}, 5000);
"
```

> Dostosuj timeout/ścieżkę dist do faktycznego emit. Alternatywa akceptowalna w DoD: `rg` po `apps/worker/package.json` + `pnpm why bcrypt --filter worker` → brak.

**Testy regresji (minimum):**

- Unit: kernela + pipelines (przeniesione specs)
- Unit worker `main.spec.ts`
- Api unit: Runs HTTP (cancel/start enqueue) + SaveOutputEdited
- E2e / Postman: **nie** blocker startu Fazy 35 wg major; zalecane po implementacji jako regresja izolacji (D-9 / D-14 / D-30… / review) — poza twardym DoD tego kroku, chyba że lokalnie zielone

**DoD kroku (R-5a):**

- [ ] (a) brak importów TS app↔app
- [ ] (b) `pnpm --filter worker start` past Nest boot + pg-boss work/recovery
- [ ] (c) stack bootu bez auth controllers / swagger / mail / `bcrypt`
- [ ] Ownership R-9 / R-10 / R-11 semantycznie bez regresji w kodzie

---

#### Propozycja commit message

```text
build(worker): close dependency graph on packages and prove independent boot

Worker image and package.json no longer treat apps/api source as the execute SoT.
```

---

## FAZA 5 — Platform extract: `domain-kit` + `persistence`

**Poza major 35.1 / 35.2** (follow-up debt po R-5a). Status startowy kroków: `NIE_ROZPOCZĘTY`.

**Cel:** Wyciągnąć platformę (`DomainException`, `parseWithZod`, pagination helpers, Nest `PrismaModule`) z `runs-kernel` i z duplikatów `apps/api/src/shared/`, żeby Auth/metrics **nie** zależały od pakietu „runs”. Schema Prisma zostaje w `apps/api/prisma`. Prisma = SoT CRUD/claim; raw `pg` = NOTIFY/LISTEN (bez zmiany P-10).

**Nota:** Docs/SPEC (M-1 / M-8 / P-2, `architektura*`, `anty_patterny`) zaktualizowane **przed** implementacją tej fazy (legalność cutu).

**Kolejność:** dopiero po zielonym DoD FAZY 4 (R-5a).

---

### KROK 1 — Szkielet `packages/domain-kit` + `packages/persistence`

**Status:** `WYKONANY`

**Cel:** Puste (export-only) pakiety workspace; root `tsconfig` `references`; forma jak `shared` (M-1 / M-6).

#### `packages/domain-kit/package.json` — kierunek

```json
{
  "name": "@content-chain/domain-kit",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsc -p tsconfig.json --watch"
  },
  "dependencies": {
    "@content-chain/shared": "workspace:*",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.7.0"
  }
}
```

> **Bez** Nest, Prisma, bcrypt, swagger. `tsconfig`: CJS + `strict` (decorators **nie** wymagane).

#### `packages/persistence/package.json` — kierunek

```json
{
  "name": "@content-chain/persistence",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsc -p tsconfig.json --watch"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@prisma/client": "^6",
    "reflect-metadata": "^0.2.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.7.0"
  }
}
```

> `tsconfig`: CJS + `emitDecoratorMetadata` / `experimentalDecorators` + `strict`. **Bez** Zod/Auth.

**Artefakty:** `src/index.ts` export-only w obu; dopisek `references` w root `tsconfig.json`.

**Testy:** `pnpm --filter @content-chain/domain-kit build` oraz `pnpm --filter @content-chain/persistence build` → exit 0.

**DoD kroku:**

- Katalogi istnieją; build zielony.
- Brak deps Auth/HTTP w obu `package.json`.

---

### KROK 2 — Move + rewire; hard cut platformy z `runs-kernel` i api `shared`

**Status:** `WYKONANY`

**Cel:** Jedno SoT platformy; Auth/metrics → `domain-kit` / `persistence`; `runs-kernel` = lifecycle Runs.

#### Mapa przeniesień

| Z | Do |
|---|---|
| `packages/runs-kernel/src/shared/domain.exception.ts` | `packages/domain-kit/src/domain.exception.ts` |
| `packages/runs-kernel/src/shared/parse-with-zod.ts` (+ spec) | `packages/domain-kit/src/parse-with-zod.ts` |
| `packages/runs-kernel/src/shared/pagination.ts` | `packages/domain-kit/src/pagination.ts` |
| `apps/api/src/shared/http/pagination.ts` (+ spec) | **usuń** po rewire (logika = domain-kit; **zostaw** `PaginationQueryDto`) |
| `apps/api/src/shared/exceptions/domain.exception.ts` (jeśli jeszcze jest) | **usuń** |
| `apps/api/src/shared/parse-with-zod.ts` (jeśli jeszcze jest) | **usuń** |
| `packages/runs-kernel/src/persistence/prisma.*` + `to-input-json.ts` (+ specs) | `packages/persistence/src/…` |
| `apps/api/src/shared/persistence/prisma.*` + `to-input-json` (jeśli jeszcze) | **usuń** |

**Audyt przed merge treści pagination:** `diff` api `shared/http/pagination.ts` vs kernel `shared/pagination.ts` — wygrywa zachowanie pokryte specami; jedna kopia + przeniesiony/scalone `.spec.ts`.

**Importy (kierunek):**

```typescript
import {
  DomainException,
  parseWithZod,
  resolvePaginationMode,
  paginationMeta,
  prismaPageArgs,
  type PaginationMode,
} from '@content-chain/domain-kit';
import { PrismaModule, PrismaService, toInputJson } from '@content-chain/persistence';
```

- `runs-kernel` / `run-pipelines` / api Auth, Runs HTTP, Feedback, metrics, CC → powyższe.
- `apps/worker` composition: `PrismaModule` z `@content-chain/persistence`.
- `apps/*/package.json` + Dockerfile: `workspace:*` + `COPY packages/{domain-kit,persistence}`.
- `runs-kernel` `index.ts`: **usuń** eksporty `DomainException` / `parseWithZod` / `pagination*` / `PrismaModule` / `PrismaService` / `toInputJson` (hard cut; **bez** re-exportów legacy).

**Testy:**

- Unit pagination (jedna kopia w domain-kit).
- Unit Auth list users + Runs list (`prisma-user` / `prisma-run`).
- `rg "DomainException|parseWithZod|resolvePaginationMode" apps/api/src/auth apps/api/src/metrics` → importy z `@content-chain/domain-kit`, **0** z `runs-kernel`.
- `rg "export \\{ DomainException|PrismaModule|paginationMeta" packages/runs-kernel/src/index.ts` → **0**.
- Regresja bootu workera (smoke z FAZY 4): `pnpm --filter worker start` past Nest + pg-boss.

**DoD kroku:**

- [ ] Jedno SoT: `domain-kit` + `persistence`
- [ ] Auth/metrics **bez** importu `@content-chain/runs-kernel` wyłącznie po platformę
- [ ] Brak app↔app; Dockerfile z nowymi packages
- [ ] Api + worker + kernel + pipelines build; R-5a bez regresji

#### Propozycja commit message

```text
refactor(platform): extract domain-kit and persistence out of runs-kernel

Stop Auth and list helpers from depending on the Runs package; keep one pagination SoT.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| M-1 drzewo | `packages/{shared,domain-kit,persistence,runs-kernel,run-pipelines}` |
| M-8 / P-2 | wyjątki/parse/pagination = domain-kit; Nest Prisma = persistence |
| M-10 zakaz app↔app | `rg` z FAZY 4 / KROK 2 (a) |
| FAZA 2 / KROK 3 token `ENV` | jeden `Symbol` z `runs-kernel`; brak `ENV = 'ENV'`; `EnvModule` + e2e overrides na tym Symbolu |
| M-11 closure + assets | worker deps; prompts w `run-pipelines` dist; Dockerfile (+ domain-kit/persistence) |
| R-5 / model A | `RUN_EXECUTOR` bound w workerze przez pipelines; api = `UnsupportedRunExecutor` |
| R-5a | checklist (a)(b)(c) — **przed** FAZĄ 5 |
| S-2 / Ctn-2 | graph/prompty w `run-pipelines` |
| R-9 / R-10 / R-11 | recovery/sweep/AbortRegistry nadal tylko worker path |
| FAZA 5 | Auth↛runs-kernel po platformę; jedno SoT pagination |
| Docs/SPEC | zsynchronizowane z M-1/M-8/P-2; plan nie cytuje aux |
| Faza 34 | nietknięta historycznie |

---

## Ślad do major (informacyjnie, po implementacji)

| Element | Po implementacji |
|---------|------------------|
| Faza 35 | `WYKONANY` (po FAZACH 1–4) |
| Krok 35.1 | `WYKONANY` |
| Krok 35.2 | `WYKONANY` |
| MILESTONE 35 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| FAZA 5 | **nie** mapuje się na major 35.x |
| Faza 34 / 34.1–34.5 | **bez zmian** (`WYKONANY`) |

Edycja major = poza tym skillem (ręcznie / sesja implementacji na życzenie).

---

## Nota sesji planu

- Grandfathering docs: `docs/README.md` bez kompletnego frontmatteru (potwierdzone) — **nie** dopisywany.
- SPEC: frontmatter kompletny; bump legalności FAZY 5: `SPEC-MONOREPO` M-1/M-8, `SPEC-PERSISTENCE` P-2, `SPEC-README`, docs `architektura*` / `anty_patterny`.
- Pass rozwojowy: TTL → shared najpierw; kernel przed pipelines; **composition root zawsze w `apps/worker`** (anti-cykl kernela ↔ pipelines); FAZA 2 / KROK 3 = jeden `ENV` Symbol; FAZA 5 po R-5a.
- Implementacja kodu / `/feature-implementation` — **nie** startuje z tej sesji.
