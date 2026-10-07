# Content Chain — feature plan: drzewo katalogów BC Runs i Auth (Faza 20)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-20-katalogi-runs-auth.md`  
**Kotwica major:** Faza 20 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 1.4 / Faza 3 / Faza 5 (`WYKONANY`) — płaskie `infrastructure/` / `application/`; wzorzec podkatalogów I/O już w Social/Content (Faza 4 / 4.2) — **bez** edycji Social/Content. Faza 18 / 19 — **bez** zmiany semantyki ról.  
**Źródła kanonu (nie płaskie drzewa z treści Fazy 1.4 / 3 / 5):** `docs/architektura_katalogi_pliki.md`, `docs/architektura.md`, `docs/dictionary.md`, `docs/anty_patterny.md`, `docs/testy.md`, `SPEC-RUNY.md`, `SPEC-AUTH.md`, `SPEC-PERSISTENCE.md`, `SPEC-MONOREPO.md`, major Faza 20.  
**Pass rozwojowy:** persistence/sse/quota → lifecycle/guest → dispatch → importy Nest/e2e → Auth I/O → graphify → regresja. **Przesunięcia:** (1) `*.spec.ts` razem ze źródłami; (2) `application/lifecycle` (+ `guest`) **przed** `infrastructure/dispatch` (zależność `StubRunExecutor` → `RunLifecycleService`).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Podkatalogi I/O / kernel w BC Runs i Auth; **zero** zmiany zachowania HTTP / guest / review / mail / roli accept-invite |
| Major | Faza 20 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–19 (`WYKONANY`); **bez** MILESTONE 20 |
| Poza zakresem | Controllery → `http/`; refaktor `auth.helpers.ts`; podkatalogi use-case’ów Auth; Social/Content/Feedback/Company Context; ops `health/`/`metrics/`/`llm/`; FE / gateway; nowy kontrakt API; nowe case’y D-* / foldery Postman produktu |
| Po implementacji (informacyjnie) | Major: Faza 20 → `WYKONANY`. Brak `MILESTONE` 20. Faza 1.4 / 3 / 5 / 18 / 19 / MILESTONE 1 / 3 / 5 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major HOW | Feature | Zakres |
|-----------|---------|--------|
| HOW 1 (Runs infra) | FAZA 1 / KROK 1, 3 | `persistence` / `sse` / `quota` / `dispatch` |
| HOW 2 (Runs application) | FAZA 1 / KROK 2, 4 | `lifecycle` / `guest` + Nest / e2e |
| HOW 3 (Auth infra) | FAZA 2 / KROK 1 | `persistence` / `mail` / `session` |
| HOW 4–6 (specs, graphify, regresja) | FAZA 1 (specs w ruchach) + FAZA 3 | colocation w ruchach; graphify; unit/smoke |

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Jest — **tylko ścieżki plików i importy**.
- Preferuj `git mv` (lub równoważne) dla zachowania historii.
- Warstwy BC bez zmian; porty zostają w `domain/`; moduły Nest i `run-record.test-helpers.ts` w **korzeniu** BC.
- Auth `application/` **płaskie**; `auth.helpers.ts` **nie** przenosić.
- Zakaz `helpers/` / `adapters/` / `mappers/` jako kanonu.
- Po każdym bloku ruchów: `pnpm --filter api exec tsc --noEmit` (lub `pnpm build:api`) — zielony kompilator przed następnym krokiem.
- Przy konflikcie przykład ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki / API

**Context7:** nie wywołany — wycinek to wyłącznie układ katalogów i względne importy TypeScript / Nest DI (bez nowego API biblioteki). Nest resolvuje providery po klasach z poprawionych ścieżek importu, nie po folderze.

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| Drzewo Runs | `infrastructure/{persistence,sse,quota,dispatch}`, `application/{lifecycle,guest}` | `docs/architektura_katalogi_pliki.md`, `SPEC-RUNY.md` |
| Drzewo Auth | `infrastructure/{persistence,mail,session}` | `docs/architektura_katalogi_pliki.md`, `SPEC-AUTH.md` |
| Prisma tylko w persistence | gdy warstwa ma >1 granicę I/O | `SPEC-PERSISTENCE.md`, `SPEC-MONOREPO.md` M-1 |
| Fixture unit | `run-record.test-helpers.ts` zostaje w korzeniu `runs/` | `docs/testy.md` |

---

## FAZA 1 — Runs: podkatalogi I/O + kernel

**Status:** `WYKONANY`

Odpowiada major **Faza 20** HOW pkt 1–2 (+ colocation specs). Jedna faza zestawu dla BC Runs.

---

### KROK 1 — `infrastructure/{persistence,sse,quota}` (+ `*.spec.ts`)

**Status:** `WYKONANY`

**Cel:** Wydzielić granice I/O Prisma / SSE / Redis quota zgodnie z `SPEC-RUNY.md` i `docs/architektura_katalogi_pliki.md`. Stub dispatch **jeszcze nie** — zależy od `application/lifecycle` (KROK 2).

**Artefakty — mapa `git mv`:**

| Teraz | Cel |
|-------|-----|
| `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` | `…/infrastructure/persistence/prisma-run.adapter.ts` |
| `apps/api/src/runs/infrastructure/prisma-run.adapter.set-pipeline-finished.spec.ts` | `…/persistence/prisma-run.adapter.set-pipeline-finished.spec.ts` |
| `apps/api/src/runs/infrastructure/prisma-output-edited.adapter.ts` | `…/persistence/prisma-output-edited.adapter.ts` |
| `apps/api/src/runs/infrastructure/prisma-output-edited.adapter.spec.ts` | `…/persistence/prisma-output-edited.adapter.spec.ts` |
| `apps/api/src/runs/infrastructure/prisma-run-row.types.ts` | `…/persistence/prisma-run-row.types.ts` |
| `apps/api/src/runs/infrastructure/empty-run-result.reader.ts` | `…/persistence/empty-run-result.reader.ts` |
| `apps/api/src/runs/infrastructure/to-light-run-item.ts` | `…/persistence/to-light-run-item.ts` |
| `apps/api/src/runs/infrastructure/to-pipeline-phase.ts` | `…/persistence/to-pipeline-phase.ts` |
| `apps/api/src/runs/infrastructure/to-run-snapshot-base.ts` | `…/persistence/to-run-snapshot-base.ts` |
| `apps/api/src/runs/infrastructure/to-selected-idea-ids.ts` | `…/persistence/to-selected-idea-ids.ts` |
| `apps/api/src/runs/infrastructure/run-sse.hub.ts` | `…/infrastructure/sse/run-sse.hub.ts` |
| `apps/api/src/runs/infrastructure/run-sse.hub.spec.ts` | `…/sse/run-sse.hub.spec.ts` |
| `apps/api/src/runs/infrastructure/ioredis-guest-quota.adapter.ts` | `…/infrastructure/quota/ioredis-guest-quota.adapter.ts` |
| `apps/api/src/runs/infrastructure/ioredis-guest-quota.adapter.spec.ts` | `…/quota/ioredis-guest-quota.adapter.spec.ts` |
| `apps/api/src/runs/infrastructure/unavailable-guest-quota.adapter.ts` | `…/quota/unavailable-guest-quota.adapter.ts` |

**Po `git mv` — poprawa głębokości importów w przeniesionych plikach** (wzorzec: +1 poziom do `shared/` i `domain/`; importy `./` między plikami w tym samym podkatalogu bez zmian).

#### Refaktor — głębokość w `persistence/*`

We wszystkich plikach w `infrastructure/persistence/` (adaptery, mappery, `empty-run-result.reader.ts`, spece):

**teraz (przykład z `prisma-run.adapter.ts`):**

```typescript
import { PrismaService } from '../../shared/persistence/prisma.service';
import { assertTransition } from '../domain/status-transitions';
import { toInputJson } from '../../shared/persistence/to-input-json';
import {
  RUN_REPOSITORY,
  // …
} from '../domain/run.port';
import { /* … */ } from '../application/run.schemas';
import { CANCELABLE_RUN_STATUSES } from '../domain/status-transitions';
```

**zamień na:**

```typescript
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { assertTransition } from '../../domain/status-transitions';
import { toInputJson } from '../../../shared/persistence/to-input-json';
import {
  RUN_REPOSITORY,
  // …
} from '../../domain/run.port';
import { /* … */ } from '../../application/run.schemas';
import { CANCELABLE_RUN_STATUSES } from '../../domain/status-transitions';
```

Pozostałe w tym katalogu — ta sama reguła:

| Prefiks przed ruchem | Po ruchu |
|----------------------|----------|
| `../../shared/…` | `../../../shared/…` |
| `../domain/…` | `../../domain/…` |
| `../application/…` | `../../application/…` |
| `../../content/…` / `../../social/…` (`empty-run-result.reader`) | `../../../content/…` / `../../../social/…` |
| `./to-*`, `./prisma-*` (ten sam folder) | bez zmian |

#### Refaktor — głębokość w `sse/*` i `quota/*`

**teraz:**

```typescript
import { ENV, type Env } from '../../shared/config/env';
import type { RunSseEvent, RunSseHub } from '../domain/run-sse.port';
// quota:
import { resolveRedisStandalone } from '../../shared/config/redis-connection';
import { GUEST_QUOTA, type GuestQuotaPort } from '../domain/guest-quota.port';
```

**zamień na:**

```typescript
import { ENV, type Env } from '../../../shared/config/env';
import type { RunSseEvent, RunSseHub } from '../../domain/run-sse.port';
// quota:
import { resolveRedisStandalone } from '../../../shared/config/redis-connection';
import { GUEST_QUOTA, type GuestQuotaPort } from '../../domain/guest-quota.port';
```

Spec `run-sse.hub.spec.ts` / `ioredis-guest-quota.adapter.spec.ts`: `../../shared` → `../../../shared`; `../../shared/http/new-ids` → `../../../shared/http/new-ids`.

**Jeszcze nie** ruszaj `run-lifecycle.module.ts` / `guest-quota.module.ts` — zbiorczo w KROK 4 (po lifecycle), albo minimalnie teraz jeśli kompilacja wymaga — preferuj jeden pass w KROK 4. Po samym KROK 1 kompilacja całego api będzie czerwona do KROK 4 — **akceptowalne w trakcie fazy**; domknięcie DoD fazy po KROK 4.

**Testy:** spece przeniesione; asercje **bez zmian**.

**DoD kroku:**

- Katalogi `persistence/`, `sse/`, `quota/` istnieją; płaskie pliki z mapy zniknęły z `infrastructure/`.
- Importy względne w przeniesionych plikach mają poprawną głębokość.
- `stub-run.executor*` nadal płasko w `infrastructure/` (przenoszony w KROK 3).

---

### KROK 2 — `application/{lifecycle,guest}` (+ `*.spec.ts`)

**Status:** `WYKONANY`

**Cel:** Kernel procesu i polityka guest poza płaskim workiem use-case’ów HTTP. `SPEC-RUNY.md` — lokalizacja I/O / kernel.

**Artefakty — mapa `git mv`:**

| Teraz | Cel |
|-------|-----|
| `apps/api/src/runs/application/in-process-run.worker.ts` | `…/application/lifecycle/in-process-run.worker.ts` |
| `apps/api/src/runs/application/in-process-run.worker.spec.ts` | `…/lifecycle/in-process-run.worker.spec.ts` |
| `apps/api/src/runs/application/run-abort.registry.ts` | `…/lifecycle/run-abort.registry.ts` |
| `apps/api/src/runs/application/run-abort.registry.spec.ts` | `…/lifecycle/run-abort.registry.spec.ts` |
| `apps/api/src/runs/application/run-dispatch.executor.ts` | `…/lifecycle/run-dispatch.executor.ts` |
| `apps/api/src/runs/application/run-dispatch.executor.spec.ts` | `…/lifecycle/run-dispatch.executor.spec.ts` |
| `apps/api/src/runs/application/run-lifecycle.service.ts` | `…/lifecycle/run-lifecycle.service.ts` |
| `apps/api/src/runs/application/run-lifecycle.service.spec.ts` | `…/lifecycle/run-lifecycle.service.spec.ts` |
| `apps/api/src/runs/application/guest-run-policy.service.ts` | `…/application/guest/guest-run-policy.service.ts` |
| `apps/api/src/runs/application/guest-run-policy.service.spec.ts` | `…/guest/guest-run-policy.service.spec.ts` |

**Zostają płasko w `application/`:** wszystkie `*-use-case.ts` (+ spece), `run.schemas*`, `output-edited-result.schemas.ts`, `composite-run-result.reader.ts`.

#### Refaktor — importy wewnątrz `lifecycle/*`

**teraz (`in-process-run.worker.ts` — fragment):**

```typescript
import { ENV, type Env } from '../../shared/config/env';
import { RUN_EXECUTOR, type RunExecutorPort } from '../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../domain/run-sse.port';
import { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import { RunLifecycleService } from './run-lifecycle.service';
import { RunAbortRegistry } from './run-abort.registry';
import type { RunRecord } from '../domain/run.types';
import { AutoFinalizeExpiredReviewsUseCase } from './auto-finalize-expired-reviews.use-case';
import { parseTtlMs } from '../../auth/application/auth.helpers';
```

**zamień na:**

```typescript
import { ENV, type Env } from '../../../shared/config/env';
import { RUN_EXECUTOR, type RunExecutorPort } from '../../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../../domain/run-sse.port';
import { RecoverInterruptedRunsUseCase } from '../recover-interrupted-runs.use-case';
import { RunLifecycleService } from './run-lifecycle.service';
import { RunAbortRegistry } from './run-abort.registry';
import type { RunRecord } from '../../domain/run.types';
import { AutoFinalizeExpiredReviewsUseCase } from '../auto-finalize-expired-reviews.use-case';
import { parseTtlMs } from '../../../auth/application/auth.helpers';
```

**teraz (`run-lifecycle.service.ts` / `run-dispatch.executor.ts` — wzorzec):**

```typescript
import type { RunLifecyclePort } from '../domain/run-lifecycle.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
```

**zamień na:**

```typescript
import type { RunLifecyclePort } from '../../domain/run-lifecycle.port';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
```

**Spece lifecycle** — ta sama reguła + fixture:

**teraz:**

```typescript
import { makeSocialRun } from '../run-record.test-helpers';
```

**zamień na:**

```typescript
import { makeSocialRun } from '../../run-record.test-helpers';
```

`in-process-run.worker.spec.ts`: importy use-case’ów z płaskiego `application/` → `../recover-interrupted-runs.use-case`, `../auto-finalize-expired-reviews.use-case`; `../../shared` → `../../../shared`.

#### Refaktor — importy wewnątrz `guest/*`

**teraz:**

```typescript
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../shared/config/env';
import { GUEST_QUOTA, type GuestQuotaPort } from '../domain/guest-quota.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
```

**zamień na:**

```typescript
import type { AuthUserContext } from '../../../shared/types/auth-user-context';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../../shared/config/env';
import { GUEST_QUOTA, type GuestQuotaPort } from '../../domain/guest-quota.port';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
```

Spec guest: `../../shared` → `../../../shared`; `../domain` → `../../domain`; `./guest-run-policy.service` bez zmian.

**DoD kroku:**

- Istnieją `application/lifecycle/` i `application/guest/` z plikami z mapy.
- Use-case’y HTTP nadal płasko w `application/`.
- Importy wewnątrz przeniesionych plików poprawione (w tym use-case’y wołane z workera przez `../`).

---

### KROK 3 — `infrastructure/dispatch` (stub)

**Status:** `WYKONANY`

**Cel:** Stub executor w `dispatch/` z finalną ścieżką do `RunLifecycleService` w `lifecycle/` (jedna poprawka importu — stąd kolejność po KROK 2).

**Artefakty — mapa `git mv`:**

| Teraz | Cel |
|-------|-----|
| `apps/api/src/runs/infrastructure/stub-run.executor.ts` | `…/infrastructure/dispatch/stub-run.executor.ts` |
| `apps/api/src/runs/infrastructure/stub-run.executor.spec.ts` | `…/dispatch/stub-run.executor.spec.ts` |

#### Refaktor — `stub-run.executor.ts`

**teraz:**

```typescript
import { RunLifecycleService } from '../application/run-lifecycle.service';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRecord } from '../domain/run.types';
```

**zamień na:**

```typescript
import { RunLifecycleService } from '../../application/lifecycle/run-lifecycle.service';
import type { RunExecutorPort } from '../../domain/run-executor.port';
import type { RunRecord } from '../../domain/run.types';
```

#### Refaktor — `stub-run.executor.spec.ts`

**teraz:**

```typescript
import type { RunRecord } from '../domain/run.types';
import type { RunLifecycleService } from '../application/run-lifecycle.service';
import { makeSocialRun } from '../run-record.test-helpers';
import { StubRunExecutor } from './stub-run.executor';
```

**zamień na:**

```typescript
import type { RunRecord } from '../../domain/run.types';
import type { RunLifecycleService } from '../../application/lifecycle/run-lifecycle.service';
import { makeSocialRun } from '../../run-record.test-helpers';
import { StubRunExecutor } from './stub-run.executor';
```

**DoD kroku:**

- `infrastructure/dispatch/` zawiera stub + spec.
- Brak plików stub na płaskim `infrastructure/`.
- Import lifecycle wskazuje `application/lifecycle/…`.

---

### KROK 4 — Importy Nest, domain port, use-case’y, `app.module`, e2e

**Status:** `WYKONANY`

**Cel:** Przywrócić kompilację i DI — wszystkie konsumenci wskazują nowe ścieżki. Semantyka klas **bez zmian**.

**Artefakty (zmiana ścieżek importu):**

- `apps/api/src/runs/run-lifecycle.module.ts`
- `apps/api/src/runs/guest-quota.module.ts`
- `apps/api/src/runs/runs.module.ts`
- `apps/api/src/runs/domain/run-lifecycle.port.ts`
- `apps/api/src/app.module.ts`
- `apps/api/test/runs-list.e2e-spec.ts`
- Use-case’y / spece płaskie w `application/` importujące kernel / guest (lista poniżej)

#### Refaktor — `run-lifecycle.module.ts`

**teraz:**

```typescript
import { RunLifecycleService } from './application/run-lifecycle.service';
import { PrismaOutputEditedAdapter } from './infrastructure/prisma-output-edited.adapter';
import { PrismaRunAdapter } from './infrastructure/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/run-sse.hub';
```

**zamień na:**

```typescript
import { RunLifecycleService } from './application/lifecycle/run-lifecycle.service';
import { PrismaOutputEditedAdapter } from './infrastructure/persistence/prisma-output-edited.adapter';
import { PrismaRunAdapter } from './infrastructure/persistence/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/sse/run-sse.hub';
```

#### Refaktor — `guest-quota.module.ts`

**teraz:**

```typescript
import { IoredisGuestQuotaAdapter } from './infrastructure/ioredis-guest-quota.adapter';
import { UnavailableGuestQuotaAdapter } from './infrastructure/unavailable-guest-quota.adapter';
```

**zamień na:**

```typescript
import { IoredisGuestQuotaAdapter } from './infrastructure/quota/ioredis-guest-quota.adapter';
import { UnavailableGuestQuotaAdapter } from './infrastructure/quota/unavailable-guest-quota.adapter';
```

#### Refaktor — `runs.module.ts` (fragment importów)

**teraz:**

```typescript
import { InProcessRunWorker } from './application/in-process-run.worker';
import { GuestRunPolicyService } from './application/guest-run-policy.service';
import { RunAbortRegistry } from './application/run-abort.registry';
```

**zamień na:**

```typescript
import { InProcessRunWorker } from './application/lifecycle/in-process-run.worker';
import { GuestRunPolicyService } from './application/guest/guest-run-policy.service';
import { RunAbortRegistry } from './application/lifecycle/run-abort.registry';
```

(Pozostałe importy use-case’ów z `./application/*-use-case` — bez zmian.)

#### Refaktor — `domain/run-lifecycle.port.ts`

**teraz:**

```typescript
import type { RunLifecycleService } from '../application/run-lifecycle.service';
```

**zamień na:**

```typescript
import type { RunLifecycleService } from '../application/lifecycle/run-lifecycle.service';
```

#### Refaktor — `app.module.ts`

**teraz:**

```typescript
import { RunDispatchExecutor } from './runs/application/run-dispatch.executor';
```

**zamień na:**

```typescript
import { RunDispatchExecutor } from './runs/application/lifecycle/run-dispatch.executor';
```

(`CompositeRunResultReader` zostaje w `./runs/application/composite-run-result.reader` — bez zmian.)

#### Refaktor — e2e `test/runs-list.e2e-spec.ts`

**teraz:**

```typescript
import { StubRunExecutor } from '../src/runs/infrastructure/stub-run.executor';
```

**zamień na:**

```typescript
import { StubRunExecutor } from '../src/runs/infrastructure/dispatch/stub-run.executor';
```

#### Refaktor — use-case’y płaskie → lifecycle / guest

We wszystkich poniższych plikach zamień ścieżki względne:

| Plik | `teraz` | `zamień na` |
|------|---------|-------------|
| `cancel-run.use-case.ts` (+ spec) | `./run-abort.registry`, `./run-lifecycle.service` | `./lifecycle/run-abort.registry`, `./lifecycle/run-lifecycle.service` |
| `recover-interrupted-runs.use-case.ts` (+ spec) | `./run-lifecycle.service` | `./lifecycle/run-lifecycle.service` |
| `start-run.use-case.ts` (+ spec) | `./in-process-run.worker`, `./guest-run-policy.service` | `./lifecycle/in-process-run.worker`, `./guest/guest-run-policy.service` |
| `resume-hitl.use-case.ts` (+ spec) | `./in-process-run.worker`, `./run-lifecycle.service`, `./guest-run-policy.service` | `./lifecycle/…`, `./guest/…` |
| `get-run.use-case.ts` (+ spec) | `./guest-run-policy.service` | `./guest/guest-run-policy.service` |
| `get-run-logs.use-case.ts` (+ spec) | `./guest-run-policy.service` | `./guest/guest-run-policy.service` |

Przykład (`start-run.use-case.ts`):

**teraz:**

```typescript
import { InProcessRunWorker } from './in-process-run.worker';
import { GuestRunPolicyService } from './guest-run-policy.service';
```

**zamień na:**

```typescript
import { InProcessRunWorker } from './lifecycle/in-process-run.worker';
import { GuestRunPolicyService } from './guest/guest-run-policy.service';
```

**Uwaga:** `parseTtlMs` z `../../auth/application/auth.helpers` w use-case’ach płaskich — **bez zmian** (głębokość `application/` ta sama).

**Testy:** brak nowych asercji; po poprawkach ścieżek unit Runs muszą się resolvować.

**DoD kroku:**

- `pnpm --filter api exec tsc --noEmit` (lub `pnpm build:api`) — OK.
- Brak importów do starych płaskich ścieżek kernel/I/O Runs (wyszukaj: `runs/infrastructure/prisma-run`, `runs/application/run-lifecycle.service`, `guest-run-policy.service` bez `/guest/`, itd.).
- Drzewo końcowe Runs zgodne z docs/SPEC (moduły w korzeniu; `http/` nietknięte; `run-record.test-helpers.ts` w korzeniu).

---

#### Propozycja commit message

```text
refactor(runs): nest I/O and kernel files under persistence/sse/quota/dispatch and lifecycle/guest

Align the Runs BC folder tree with the catalog norm without changing HTTP or guest behavior.
```

---

## FAZA 2 — Auth: `infrastructure/{persistence,mail,session}`

Odpowiada major **Faza 20** HOW pkt 3.

---

### KROK 1 — Przeniesienie I/O Auth + `AuthModule` / controllery

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Podział Auth `infrastructure/` po granicy I/O. `application/` płaskie; controllery w korzeniu BC — bez ruchu do `http/`. `SPEC-AUTH.md`.

**Artefakty — mapa `git mv`:**

| Teraz | Cel |
|-------|-----|
| `apps/api/src/auth/infrastructure/prisma-user.adapter.ts` | `…/infrastructure/persistence/prisma-user.adapter.ts` |
| `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts` | `…/persistence/prisma-invitation.adapter.ts` |
| `apps/api/src/auth/infrastructure/prisma-account-activation.adapter.ts` | `…/persistence/prisma-account-activation.adapter.ts` |
| `apps/api/src/auth/infrastructure/prisma-refresh-session.adapter.ts` | `…/persistence/prisma-refresh-session.adapter.ts` |
| `apps/api/src/auth/infrastructure/logging-mailer.adapter.ts` | `…/infrastructure/mail/logging-mailer.adapter.ts` |
| `apps/api/src/auth/infrastructure/nodemailer-smtp-mailer.adapter.ts` | `…/mail/nodemailer-smtp-mailer.adapter.ts` |
| `apps/api/src/auth/infrastructure/cookie.helper.ts` | `…/infrastructure/session/cookie.helper.ts` |
| `apps/api/src/auth/infrastructure/jwt-cookie.strategy.ts` | `…/session/jwt-cookie.strategy.ts` |

#### Refaktor — głębokość w `persistence/*`

**teraz (wzorzec adaptera Prisma):**

```typescript
import { PrismaService } from '../../shared/persistence/prisma.service';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import { USER_REPOSITORY /* … */ } from '../domain/user-repository.port';
```

**zamień na:**

```typescript
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import type { AuthUser } from '../../domain/auth-user.types';
import { USER_REPOSITORY /* … */ } from '../../domain/user-repository.port';
```

#### Refaktor — głębokość w `mail/*`

**teraz (`logging-mailer.adapter.ts`):**

```typescript
import type { TransactionalMailer } from '../domain/transactional-mailer.port';
```

**zamień na:**

```typescript
import type { TransactionalMailer } from '../../domain/transactional-mailer.port';
```

**teraz (`nodemailer-smtp-mailer.adapter.ts`):**

```typescript
import { ENV, type Env } from '../../shared/config/env';
import type { TransactionalMailer } from '../domain/transactional-mailer.port';
```

**zamień na:**

```typescript
import { ENV, type Env } from '../../../shared/config/env';
import type { TransactionalMailer } from '../../domain/transactional-mailer.port';
```

#### Refaktor — głębokość w `session/*`

**teraz (`cookie.helper.ts`):**

```typescript
import { parseTtlMs } from '../application/auth.helpers';
import type { Env } from '../../shared/config/env';
```

**zamień na:**

```typescript
import { parseTtlMs } from '../../application/auth.helpers';
import type { Env } from '../../../shared/config/env';
```

**teraz (`jwt-cookie.strategy.ts`):**

```typescript
import { ENV, type Env } from '../../shared/config/env';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { readCookie } from './cookie.helper';
import type { AuthUserContext } from '../domain/auth-user.types';
```

**zamień na:**

```typescript
import { ENV, type Env } from '../../../shared/config/env';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { readCookie } from './cookie.helper';
import type { AuthUserContext } from '../../domain/auth-user.types';
```

#### Refaktor — `auth.module.ts` (importy I/O)

**teraz:**

```typescript
import { JwtCookieStrategy } from './infrastructure/jwt-cookie.strategy';
import { PrismaUserAdapter } from './infrastructure/prisma-user.adapter';
import { PrismaRefreshSessionAdapter } from './infrastructure/prisma-refresh-session.adapter';
import { PrismaAccountActivationAdapter } from './infrastructure/prisma-account-activation.adapter';
import { PrismaInvitationAdapter } from './infrastructure/prisma-invitation.adapter';
import { NodemailerSmtpMailerAdapter } from './infrastructure/nodemailer-smtp-mailer.adapter';
import { LoggingMailerAdapter } from './infrastructure/logging-mailer.adapter';
```

**zamień na:**

```typescript
import { JwtCookieStrategy } from './infrastructure/session/jwt-cookie.strategy';
import { PrismaUserAdapter } from './infrastructure/persistence/prisma-user.adapter';
import { PrismaRefreshSessionAdapter } from './infrastructure/persistence/prisma-refresh-session.adapter';
import { PrismaAccountActivationAdapter } from './infrastructure/persistence/prisma-account-activation.adapter';
import { PrismaInvitationAdapter } from './infrastructure/persistence/prisma-invitation.adapter';
import { NodemailerSmtpMailerAdapter } from './infrastructure/mail/nodemailer-smtp-mailer.adapter';
import { LoggingMailerAdapter } from './infrastructure/mail/logging-mailer.adapter';
```

(Importy `./application/*` — bez zmian.)

#### Refaktor — `auth.controller.ts` + `auth.controller.spec.ts`

**teraz:**

```typescript
import {
  clearAuthCookies,
  setAuthCookies,
} from './infrastructure/cookie.helper';
// … oraz drugi import readCookie z tej samej ścieżki
```

**zamień na:**

```typescript
import {
  clearAuthCookies,
  setAuthCookies,
} from './infrastructure/session/cookie.helper';
```

W `auth.controller.spec.ts` zaktualizuj **oba** miejsca: import oraz `jest.mock` / `jest.requireActual`:

**teraz:**

```typescript
jest.mock('./infrastructure/cookie.helper', () => {
  const actual = jest.requireActual('./infrastructure/cookie.helper');
  // …
});
```

**zamień na:**

```typescript
jest.mock('./infrastructure/session/cookie.helper', () => {
  const actual = jest.requireActual('./infrastructure/session/cookie.helper');
  // …
});
```

**DoD kroku:**

- Drzewo Auth zgodne z docs/SPEC (`persistence` / `mail` / `session`).
- `auth.helpers.ts` nadal w `application/`.
- Controllery nadal w korzeniu `auth/`.
- `pnpm --filter api exec tsc --noEmit` — OK.
- Brak importów do płaskiego `auth/infrastructure/*.ts` (poza podkatalogami).

---

#### Propozycja commit message

```text
refactor(auth): split infrastructure into persistence, mail, and session folders

Match the Auth BC catalog norm; keep flat application use-cases and cookie semantics unchanged.
```

---

## FAZA 3 — Graphify + regresja

Odpowiada major **Faza 20** HOW pkt 5–6.

---

### KROK 1 — `graphify update .`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Odświeżyć graf wiedzy po przeniesieniu plików TS (major HOW pkt 5).

**Artefakty:** wyjście `graphify-out/` (AST-only).

**Implementacja:**

```bash
graphify update .
```

Uruchom z roota monorepo po domknięciu FAZA 1–2.

**DoD kroku:**

- Komenda kończy się sukcesem.
- Węzły / ścieżki odzwierciedlają nowe lokalizacje (spot-check: `PrismaRunAdapter`, `RunLifecycleService`, `JwtCookieStrategy`).

---

### KROK 2 — Unit Runs/Auth + smoke checklist (bez nowych D-*)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Potwierdzić **zero regresji zachowania** — istniejące testy, bez nowych case’ów produktowych / folderów Postman.

**Implementacja — komendy:**

```bash
pnpm --filter api test -- runs
pnpm --filter api test -- auth
# opcjonalnie pełne unit api:
pnpm test:api
```

**Smoke checklist (ręcznie lub istniejące e2e — bez nowych plików produktu):**

| Obszar | Co sprawdzić |
|--------|----------------|
| Auth cookie | login → `/me` → refresh / logout (istniejące spece / Postman auth) |
| Start run | `POST /runs` happy path (istniejące e2e / Postman) |
| SSE | hub unit (`run-sse.hub.spec`) + istniejący flow events |
| Guest quota | unit `guest-run-policy` + `ioredis-guest-quota` / unavailable |

**Zakaz:** nowych identyfikatorów D-* w `SPEC-TESTY.md`; nowych folderów kolekcji Postman „produktowych”.

**DoD kroku:**

- Unit Runs + Auth zielone (ścieżki resolvują, asercje nietknięte merytorycznie).
- Brak diffu w logice poza importami / ścieżkami plików.
- Checklist smoke odhaczona lub równoważne istniejące e2e zielone (`pnpm test:e2e:api` jeśli środowisko lokalne na to pozwala).

---

#### Propozycja commit message

```text
chore: refresh graphify after Runs and Auth directory refactor

Keep the knowledge graph aligned with the new I/O and kernel folder layout.
```

*(Jeśli graphify + ewentualne drobne poprawki ścieżek wpadną w ten sam commit co FAZA 2 — dopuszczalne; wtedy ten komunikat łączy się z commit message FAZA 2 albo osobny chore po regresji. Preferuj: FAZA 1 commit → FAZA 2 commit → ten chore po `graphify update`, bez osobnego commita „pustej” regresji.)*

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Drzewo Runs | zgodne z `docs/architektura_katalogi_pliki.md` / `SPEC-RUNY.md` |
| Drzewo Auth | zgodne z `docs/architektura_katalogi_pliki.md` / `SPEC-AUTH.md` |
| Zakaz kind-folders | brak nowych `helpers/` / `adapters/` / `mappers/` |
| Prisma | wyłącznie w `infrastructure/persistence/` (Runs i Auth) |
| Kernel | `lifecycle/` + `guest/`; use-case’y Auth/Runs HTTP płaskie |
| Zero zachowania | brak zmian body/statusów HTTP, guest, review, mail, roli invite |
| Pass rozwojowy | lifecycle przed dispatch; spece z źródłami |
| Context7 | nie wymagany (brak nowego API lib) |
| Major nietknięty w tej sesji planu | tak |

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja major | Po implementacji feature planu |
|---------------|--------------------------------|
| Faza 20 | `WYKONANY` (gate + HOW w kodzie) |
| MILESTONE 20 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1.4 / 3 / 5 / 18 / 19; MILESTONE 1 / 3 / 5 / 4 / 4.2 | bez zmian historii (`WYKONANY` / `OSIĄGNIĘTY`) |

Edycja statusów major — **poza** tym skillem (ręcznie lub w sesji `/feature-implementation` na życzenie użytkownika).
