# Content Chain — feature plan: readiness api + probe liveness gateway (Faza 17)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-17-health-ready.md`  
**Kotwica major:** Faza 17 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 2 / Krok 2.2 (`WYKONANY`) — powierzchnia HTTP z samym liveness (`GET /api/v1/health`); Faza 2 / Krok 2.3 (`WYKONANY`) — port LLM `chat` bez roli probe health.  
**Źródła kanonu (nie treść 2.2 / 2.3):** `docs/dokumentacja_komunikacji.md`, `docs/security.md`, `docs/architektura_katalogi_pliki.md`, `docs/data_flow.md`, `docs/dictionary.md`, `docs/anty_patterny.md`, `docs/deployment.md`, `docs/ux_dashboard.md`, `SPEC-KOMUNIKACJA.md` K-5 / K-10, `SPEC-BEZPIECZENSTWO.md` B-7, `SPEC-KONTEKST-FIRMY.md` (granica sieci), `SPEC-TESTY.md` D-47 / D-48 / D-49, major Faza 17.  
**Pass rozwojowy:** klient probe → serwis (cache + agregat) → controller → testy. **Brak przesunięć.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Publiczny `GET /api/v1/health/ready`: agregat `ready` \| `not_ready`; `checks.api` + `checks.gateway`; probe = upstream **liveness** `GET {GATEWAY_BASE_URL}/api/v1/health` |
| Major | Faza 17 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–16 (`WYKONANY`); **bez** MILESTONE 17 |
| Stałe (zatwierdzone) | timeout probe **1500 ms**; cache in-memory **10_000 ms** (w przedziałach docs 1–2 s / 5–15 s); **bez** nowych zmiennych env |
| Poza zakresem | UI chipa / CompletenessProvider (major FE Faza 13); zmiany `evaluateReadiness` w gateway; konsumpcja upstream `/health/ready`; twardy reject `POST /runs` za gateway down; FE→gateway; port `chat` jako probe |
| Po implementacji (informacyjnie) | Major: Faza 17 → `WYKONANY`. Brak `MILESTONE` 17. MILESTONE 2 / Faza 2.2 / 2.3 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 17 (gate) | FAZA 1 / KROK 1–4 | Probe HTTP → HealthService readiness → `GET /ready` → D-47/D-48/D-49 |

---

## Założenia

- Stack bez zmian: NestJS 11, Zod 4 (env już jest), globalny `ENV` (`EnvModule`), natywny `fetch` (jak `LlmGatewayHttpAdapter`).
- Upstream liveness gateway: **200** + body `{ status: "healthy", timestamp: "<ISO8601>" }` (`HealthLivenessResponseDto` w gateway) — **bez** `X-Gateway-Key`.
- „Sensowny body”: JSON z `status === "healthy"` oraz `timestamp` jako niepusty `string` (ISO). Inne kształty → unhealthy (`bad-body`).
- HTTP api `/health/ready`: **zawsze 200** przy żywym procesie api; werdykt wyłącznie w `body.status`.
- Agregat `ready` **tylko** gdy `checks.api` i `checks.gateway` są `healthy`.
- Liveness `GET /api/v1/health` **bez zmian** kontraktu.
- Probe **nie** używa `GATEWAY_KEY` / nagłówka `X-Gateway-Key`; body ready **bez** sekretów, URL z kluczami, topologii poza skrótem checków.
- `POST /runs`: **bez** nowego kodu `GATEWAY_NOT_READY` — wycinek **nie** rusza `StartRunUseCase` / bramki kontekstu.
- Typy: jawne na granicach publicznych; `unknown` + zawężenie przy JSON upstream; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- `tsconfig` **bez** zmian.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/mdn/content` (`AbortSignal.timeout` + `fetch`). Runtime: Node **24** w środowisku deweloperskim (wystarczy wsparcie `AbortSignal.timeout` / `fetch`).

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|------------------|
| Timeout fetch | `fetch(url, { signal: AbortSignal.timeout(ms) })`; przy timeout → `DOMException` / Error `name === "TimeoutError"` | Mapuj na unhealthy `reason: 'timeout'` (także `AbortError` jako awaria probe → unhealthy) |
| Unreachable | `TypeError` / inne błędy sieci | `reason: 'unreachable'` |
| NestJS route | `@Get('ready')` na `@Controller('health')` + `@Public()` na klasie | Jak istniejący liveness |
| NestJS DI | globalny `ENV`; lokalny provider probe w `HealthModule` | bez `HttpModule` / axios |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (K-10 / B-7).

---

## FAZA 1 — Readiness api + probe liveness gateway

Odpowiada major **Faza 17** (implementacja HOW). Jedna faza w tym zestawie.

---

### KROK 1 — Cienki klient HTTP probe liveness gateway

**Status:** `WYKONANY`

**Cel:** Osobny serwis w module ops `health/` woła `GET {GATEWAY_BASE_URL}/api/v1/health` z timeoutem 1500 ms, **bez** klucza i **bez** portu `chat`. `SPEC-KOMUNIKACJA.md` K-5 / K-10, `docs/dokumentacja_komunikacji.md`, major Faza 17 HOW pkt 1.

**Artefakty:**

- Nowy: `apps/api/src/health/gateway-liveness.probe.ts`
- Nowy: `apps/api/src/health/gateway-liveness.probe.spec.ts`
- Zmiana: `apps/api/src/health/health.module.ts` (provider)

#### Nowy plik — `gateway-liveness.probe.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { ENV, type Env } from '../shared/config/env';

export const GATEWAY_PROBE_TIMEOUT_MS = 1_500;

export type GatewayLivenessProbeReason =
  | 'timeout'
  | 'unreachable'
  | 'bad-status'
  | 'bad-body';

export type GatewayLivenessProbeResult =
  | { ok: true }
  | { ok: false; reason: GatewayLivenessProbeReason };

type GatewayLivenessBody = {
  status: 'healthy';
  timestamp: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseGatewayLivenessBody(value: unknown): GatewayLivenessBody | null {
  if (!isRecord(value)) {
    return null;
  }
  const status = value.status;
  const timestamp = value.timestamp;
  if (status !== 'healthy') {
    return null;
  }
  if (typeof timestamp !== 'string' || timestamp.trim().length === 0) {
    return null;
  }
  return { status: 'healthy', timestamp };
}

function probeFailureReason(error: unknown): GatewayLivenessProbeReason {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return 'timeout';
    }
  }
  return 'unreachable';
}

@Injectable()
export class GatewayLivenessProbe {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async probe(): Promise<GatewayLivenessProbeResult> {
    const baseUrl = this.env.GATEWAY_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api/v1/health`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(GATEWAY_PROBE_TIMEOUT_MS),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.status < 200 || response.status > 299) {
        return { ok: false, reason: 'bad-status' };
      }

      let json: unknown;
      try {
        json = await response.json();
      } catch {
        return { ok: false, reason: 'bad-body' };
      }

      if (parseGatewayLivenessBody(json) === null) {
        return { ok: false, reason: 'bad-body' };
      }

      return { ok: true };
    } catch (error: unknown) {
      return { ok: false, reason: probeFailureReason(error) };
    }
  }
}
```

#### Nowy plik — `gateway-liveness.probe.spec.ts`

```typescript
import { validateEnv } from '../shared/config/env.schema';
import {
  GATEWAY_PROBE_TIMEOUT_MS,
  GatewayLivenessProbe,
} from './gateway-liveness.probe';

const TEST_ENV = validateEnv({
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
  GATEWAY_BASE_URL: 'http://127.0.0.1:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret-at-least-32-chars!!',
  CORS_ORIGIN: 'http://localhost:3000',
});

describe('GatewayLivenessProbe', () => {
  const originalFetch = global.fetch;
  let probe: GatewayLivenessProbe;

  beforeEach(() => {
    probe = new GatewayLivenessProbe(TEST_ENV);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns ok on HTTP 2xx with sensible liveness body and no gateway key header', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: '2026-10-03T10:00:00.000Z',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
    global.fetch = fetchMock;

    await expect(probe.probe()).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://127.0.0.1:3100/api/v1/health');
    expect(init.method).toBe('GET');
    const headers = new Headers(init.headers);
    expect(headers.get('X-Gateway-Key')).toBeNull();
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(GATEWAY_PROBE_TIMEOUT_MS).toBe(1_500);
  });

  it('maps non-2xx to bad-status', async () => {
    global.fetch = jest.fn().mockResolvedValue(new Response('nope', { status: 503 }));
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'bad-status',
    });
  });

  it('maps invalid JSON / wrong shape to bad-body', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'degraded' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'bad-body',
    });
  });

  it('maps TimeoutError to timeout', async () => {
    const err = new Error('aborted');
    err.name = 'TimeoutError';
    global.fetch = jest.fn().mockRejectedValue(err);
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'timeout',
    });
  });

  it('maps network failure to unreachable', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('fetch failed'));
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'unreachable',
    });
  });

  it('does not call upstream /health/ready', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: '2026-10-03T10:00:00.000Z',
        }),
        { status: 200 },
      ),
    );
    global.fetch = fetchMock;
    await probe.probe();
    expect(String(fetchMock.mock.calls[0]?.[0])).not.toContain('/health/ready');
  });
});
```

#### Refaktor — `HealthModule` (provider probe)

Plik: `apps/api/src/health/health.module.ts`

**teraz:**

```typescript
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService]
})
export class HealthModule {}
```

**zamień na:**

```typescript
import { Module } from '@nestjs/common';
import { GatewayLivenessProbe } from './gateway-liveness.probe';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, GatewayLivenessProbe],
})
export class HealthModule {}
```

**Biblioteki / API:** `AbortSignal.timeout` + `fetch` (Context7 `/mdn/content`); wzorzec URL jak `LlmGatewayHttpAdapter` (`GATEWAY_BASE_URL` + `/api/v1/...`), **bez** `X-Gateway-Key`.

**Testy:** unit probe powyżej (KROK 1); integracja agregatu w KROK 2/4.

**DoD kroku:**

- Provider w `HealthModule`; URL kończy się na `/api/v1/health` (nie `/health/ready`, nie `/chat`).
- Sukces tylko przy 2xx + `status: "healthy"` + niepusty `timestamp`.
- Timeout / unreachable / nie-2xx / zły body → `{ ok: false, reason }`.
- Brak nagłówka `X-Gateway-Key` w wywołaniu.

---

### KROK 2 — `HealthService`: cache + agregat readiness

**Status:** `WYKONANY`

**Cel:** `readiness()` zwraca agregat zgodny z docs; `checks.api` zawsze healthy (żywy proces); `checks.gateway` z wyniku probe; cache in-memory **10 s**; liveness bez regresji. K-10, B-7, major HOW pkt 2–3.

**Artefakty:**

- Zmiana: `apps/api/src/health/health.service.ts`
- Zmiana: `apps/api/src/health/health.service.spec.ts`

#### Refaktor — typy + `readiness` w `HealthService`

Plik: `apps/api/src/health/health.service.ts`

**teraz:**

```typescript
import { Injectable } from '@nestjs/common';

export type HealthLiveness = {
  status: 'healthy';
  timestamp: string;
};

@Injectable()
export class HealthService {
  liveness(): HealthLiveness {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
```

**zamień na:**

```typescript
import { Injectable } from '@nestjs/common';
import {
  GatewayLivenessProbe,
  type GatewayLivenessProbeReason,
  type GatewayLivenessProbeResult,
} from './gateway-liveness.probe';

export const GATEWAY_PROBE_CACHE_TTL_MS = 10_000;

export type HealthLiveness = {
  status: 'healthy';
  timestamp: string;
};

export type HealthCheckStatus = 'healthy' | 'unhealthy';

export type HealthCheckItem = {
  status: HealthCheckStatus;
  message: string;
};

export type HealthReadiness = {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    api: HealthCheckItem;
    gateway: HealthCheckItem;
  };
};

type CachedGatewayCheck = {
  expiresAtMs: number;
  gateway: HealthCheckItem;
};

const GATEWAY_OK_MESSAGE = 'Gateway process up';

function gatewayMessage(reason: GatewayLivenessProbeReason): string {
  switch (reason) {
    case 'timeout':
      return 'Gateway liveness timeout';
    case 'unreachable':
      return 'Gateway process unreachable';
    case 'bad-status':
      return 'Gateway liveness returned non-success status';
    case 'bad-body':
      return 'Gateway liveness body invalid';
    default: {
      const _exhaustive: never = reason;
      return _exhaustive;
    }
  }
}

function toGatewayCheck(result: GatewayLivenessProbeResult): HealthCheckItem {
  if (result.ok) {
    return { status: 'healthy', message: GATEWAY_OK_MESSAGE };
  }
  return { status: 'unhealthy', message: gatewayMessage(result.reason) };
}

@Injectable()
export class HealthService {
  private gatewayCache: CachedGatewayCheck | null = null;

  constructor(private readonly gatewayLivenessProbe: GatewayLivenessProbe) {}

  liveness(): HealthLiveness {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }

  async readiness(): Promise<HealthReadiness> {
    const api: HealthCheckItem = {
      status: 'healthy',
      message: 'API process up',
    };
    const gateway = await this.getGatewayCheck();
    const ready = api.status === 'healthy' && gateway.status === 'healthy';

    return {
      status: ready ? 'ready' : 'not_ready',
      timestamp: new Date().toISOString(),
      checks: { api, gateway },
    };
  }

  private async getGatewayCheck(): Promise<HealthCheckItem> {
    const now = Date.now();
    if (this.gatewayCache !== null && this.gatewayCache.expiresAtMs > now) {
      return this.gatewayCache.gateway;
    }

    const gateway = toGatewayCheck(await this.gatewayLivenessProbe.probe());
    this.gatewayCache = {
      gateway,
      expiresAtMs: now + GATEWAY_PROBE_CACHE_TTL_MS,
    };
    return gateway;
  }
}
```

#### Refaktor — `health.service.spec.ts`

Plik: `apps/api/src/health/health.service.spec.ts`

**teraz:**

```typescript
import { HealthService } from './health.service';

describe('HealthService', () => {
  const service = new HealthService();

  it('returns liveness without secrets', () => {
    const body = service.liveness();
    expect(body.status).toBe('healthy');
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|JWT_SECRET|password|DATABASE_URL/i,
    );
  });
});
```

**zamień na:**

```typescript
import {
  GATEWAY_PROBE_CACHE_TTL_MS,
  HealthService,
} from './health.service';
import type { GatewayLivenessProbe } from './gateway-liveness.probe';

describe('HealthService', () => {
  let probe: { probe: jest.Mock };
  let service: HealthService;

  beforeEach(() => {
    probe = { probe: jest.fn() };
    service = new HealthService(probe as unknown as GatewayLivenessProbe);
  });

  it('returns liveness without secrets', () => {
    const body = service.liveness();
    expect(body.status).toBe('healthy');
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|JWT_SECRET|password|DATABASE_URL|X-Gateway-Key/i,
    );
  });

  it('aggregates ready when gateway probe ok', async () => {
    probe.probe.mockResolvedValue({ ok: true });
    const body = await service.readiness();
    expect(body.status).toBe('ready');
    expect(body.checks.api.status).toBe('healthy');
    expect(body.checks.gateway.status).toBe('healthy');
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|X-Gateway-Key|JWT_SECRET|password/i,
    );
  });

  it('aggregates not_ready when gateway probe fails', async () => {
    probe.probe.mockResolvedValue({ ok: false, reason: 'timeout' });
    const body = await service.readiness();
    expect(body.status).toBe('not_ready');
    expect(body.checks.gateway.status).toBe('unhealthy');
    expect(body.checks.gateway.message).toBe('Gateway liveness timeout');
    expect(JSON.stringify(body)).not.toMatch(/127\.0\.0\.1:3100|GATEWAY_KEY/i);
  });

  it('caches gateway probe result within TTL', async () => {
    probe.probe.mockResolvedValue({ ok: true });
    await service.readiness();
    await service.readiness();
    expect(probe.probe).toHaveBeenCalledTimes(1);
    expect(GATEWAY_PROBE_CACHE_TTL_MS).toBe(10_000);
  });

  it('re-probes after cache TTL expires', async () => {
    jest.useFakeTimers();
    try {
      probe.probe
        .mockResolvedValueOnce({ ok: true })
        .mockResolvedValueOnce({ ok: false, reason: 'unreachable' });

      const first = await service.readiness();
      expect(first.status).toBe('ready');

      jest.advanceTimersByTime(GATEWAY_PROBE_CACHE_TTL_MS + 1);
      const second = await service.readiness();
      expect(second.status).toBe('not_ready');
      expect(probe.probe).toHaveBeenCalledTimes(2);
    } finally {
      jest.useRealTimers();
    }
  });
});
```

**Biblioteki / API:** brak nowych; cache lokalny w serwisie.

**Testy:** unit powyżej; D-47/D-48 w KROK 4 (controller + pełniejsza asercja).

**DoD kroku:**

- `liveness()` kontrakt bez zmian.
- `readiness()`: `ready` tylko przy obu checkach healthy; inaczej `not_ready`.
- Cache 10 s ogranicza liczbę wywołań `probe()`.
- Message gateway **bez** URL / sekretów.

---

### KROK 3 — `HealthController`: publiczny `GET /ready`

**Status:** `WYKONANY`

**Cel:** Ekspozycja HTTP `GET /api/v1/health/ready` (globalny prefix `/api/v1`), `@Public()`, **200** + body z serwisu. K-10, B-7, major HOW pkt 4.

**Artefakty:**

- Zmiana: `apps/api/src/health/health.controller.ts`
- Zmiana: `apps/api/src/health/health.controller.spec.ts`

#### Refaktor — `HealthController`

Plik: `apps/api/src/health/health.controller.ts`

**teraz:**

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { HealthService } from './health.service';

@Public()
@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness of main backend application' })
  @ApiOkResponse({ description: 'Process is alive' })
  liveness(): ReturnType<HealthService['liveness']> {
    return this.healthService.liveness();
  }
}
```

**zamień na:**

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { HealthService } from './health.service';

@Public()
@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness of main backend application' })
  @ApiOkResponse({ description: 'Process is alive' })
  liveness(): ReturnType<HealthService['liveness']> {
    return this.healthService.liveness();
  }

  @Get('ready')
  @ApiOperation({
    summary: 'Product readiness (API process + gateway liveness)',
    description:
      'Always HTTP 200 while the API process is up. Verdict is body.status (ready | not_ready). checks.gateway comes from upstream gateway GET /api/v1/health (liveness), not /health/ready. No auth; no secrets in body.',
  })
  @ApiOkResponse({
    description:
      'Readiness aggregate; HTTP 200 with status ready | not_ready in body',
  })
  readiness(): ReturnType<HealthService['readiness']> {
    return this.healthService.readiness();
  }
}
```

#### Refaktor — `health.controller.spec.ts`

Plik: `apps/api/src/health/health.controller.spec.ts`

**teraz:**

```typescript
import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { HealthController } from './health.controller';
import { HealthService, type HealthLiveness } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: { liveness: jest.Mock };

  beforeEach(async () => {
    healthService = { liveness: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: healthService }],
    }).compile();

    controller = module.get(HealthController);
  });

  it('marks the controller public so GET /health skips JwtAuthGuard', () => {
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, HealthController)).toBe(true);
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, HealthController.prototype.liveness),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata('path', HealthController.prototype.liveness),
    ).toBe('/');
  });

  it('delegates liveness to HealthService', () => {
    const body: HealthLiveness = {
      status: 'healthy',
      timestamp: '2026-09-08T10:00:00.000Z',
    };
    healthService.liveness.mockReturnValue(body);

    expect(controller.liveness()).toBe(body);
    expect(healthService.liveness).toHaveBeenCalledTimes(1);
  });
});
```

**zamień na:**

```typescript
import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { HealthController } from './health.controller';
import {
  HealthService,
  type HealthLiveness,
  type HealthReadiness,
} from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: { liveness: jest.Mock; readiness: jest.Mock };

  beforeEach(async () => {
    healthService = { liveness: jest.fn(), readiness: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: healthService }],
    }).compile();

    controller = module.get(HealthController);
  });

  it('marks the controller public so GET /health skips JwtAuthGuard', () => {
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, HealthController)).toBe(true);
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, HealthController.prototype.liveness),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, HealthController.prototype.readiness),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata('path', HealthController.prototype.liveness),
    ).toBe('/');
    expect(
      Reflect.getMetadata('path', HealthController.prototype.readiness),
    ).toBe('ready');
  });

  it('delegates liveness to HealthService', () => {
    const body: HealthLiveness = {
      status: 'healthy',
      timestamp: '2026-09-08T10:00:00.000Z',
    };
    healthService.liveness.mockReturnValue(body);

    expect(controller.liveness()).toBe(body);
    expect(healthService.liveness).toHaveBeenCalledTimes(1);
  });

  it('delegates readiness to HealthService', async () => {
    const body: HealthReadiness = {
      status: 'ready',
      timestamp: '2026-10-03T10:00:00.000Z',
      checks: {
        api: { status: 'healthy', message: 'API process up' },
        gateway: { status: 'healthy', message: 'Gateway process up' },
      },
    };
    healthService.readiness.mockResolvedValue(body);

    await expect(controller.readiness()).resolves.toBe(body);
    expect(healthService.readiness).toHaveBeenCalledTimes(1);
  });
});
```

**Biblioteki / API:** NestJS `@Get('ready')` (istniejący stack).

**Testy:** metadata `path === 'ready'` + delegacja; pełne D-47/D-48 w KROK 4.

**DoD kroku:**

- Trasa publiczna `GET .../health/ready` (klasa `@Public()`).
- Delegacja do `HealthService.readiness()`.
- Liveness nietknięty funkcjonalnie.
- Swagger opisuje semantyka 200 + werdykt w body.

---

### KROK 4 — Testy D-47 / D-48 / D-49 + regresja liveness

**Status:** `WYKONANY`

**Cel:** Domknięcie DoD z `SPEC-TESTY.md` D-47…D-49 oraz regresja liveness; potwierdzenie, że wycinek **nie** dodaje rejectu gateway na `POST /runs`.

**Artefakty:**

- Pokrycie unit: `gateway-liveness.probe.spec.ts`, `health.service.spec.ts`, `health.controller.spec.ts` (KROK 1–3)
- Opcjonalnie (gdy w repo jest suite Postman / e2e health): request `GET {{baseUrl}}/api/v1/health/ready` z asercjami D-47/D-48
- **Bez** zmian: `apps/api/src/runs/application/start-run.use-case.ts` (D-49)

#### Asercje obowiązkowe (unit — już w KROK 1–3)

| Id | Warunek | Oczekiwanie |
|----|---------|-------------|
| D-47 | probe `{ ok: true }` | `status: ready`, `checks.gateway.status: healthy`, JSON bez `GATEWAY_KEY` / `X-Gateway-Key` |
| D-48 | probe timeout / unreachable / bad-status | `status: not_ready`, `checks.gateway.status: unhealthy`; (HTTP 200 — warstwa controller nie rzuca; serwis zawsze zwraca body) |
| Regresja liveness | `liveness()` | `{ status: 'healthy', timestamp }` bez sekretów |
| Cache | dwa `readiness()` w TTL | jedno wywołanie `probe()` |
| Zakaz upstream ready | URL probe | **nie** zawiera `/health/ready` |

#### D-49 — regresja `POST /runs`

- W tym wycinku **zakaz** edycji `StartRunUseCase` / mapowania błędów startu o „gateway down”.
- Istniejący test `start-run.use-case.spec.ts` (CONTEXT_INCOMPLETE) pozostaje źródłem regresji bramki kontekstu.
- DoD: w diffie implementacji **brak** symbolu `GATEWAY_NOT_READY` oraz brak nowego guardu sieci przed `POST /runs`.

#### Szkic asercji Postman (opcjonalnie, gdy dopinasz kolekcję)

```javascript
pm.test('ready HTTP 200', function () {
  pm.response.to.have.status(200);
});
const body = pm.response.json();
pm.test('aggregate shape', function () {
  pm.expect(body.status).to.be.oneOf(['ready', 'not_ready']);
  pm.expect(body.checks.api.status).to.eql('healthy');
  pm.expect(body.checks.gateway.status).to.be.oneOf(['healthy', 'unhealthy']);
});
pm.test('no secrets', function () {
  const raw = pm.response.text();
  pm.expect(raw).to.not.match(/GATEWAY_KEY|X-Gateway-Key|JWT_SECRET/i);
});
```

D-47 vs D-48 w Postman zależą od tego, czy lokalny gateway żyje — preferowane źródło DoD w CI: **unit z mockiem fetch / probe**.

**DoD kroku:**

- Unit D-47 / D-48 / cache / no-secrets / no `/health/ready` — zielone.
- Regresja liveness — zielona.
- D-49: brak zmian w ścieżce startu runu o gateway; brak `GATEWAY_NOT_READY`.

---

#### Propozycja commit message

```text
feat(health): expose product readiness via gateway liveness probe

Let FE read agents-active dependency from GET /health/ready without
consuming gateway /health/ready or coupling StartRun to network state.
```

---

## Weryfikacja wycinka

| Kryterium | Jak |
|-----------|-----|
| K-10 | Publiczny `/health/ready`; probe = upstream **liveness**; timeout 1.5 s; cache 10 s; HTTP 200 + werdykt w body |
| B-7 | Body bez `GATEWAY_KEY` / `X-Gateway-Key` / sekretów env |
| K-5 | Probe **nie** przez port `chat` / `LlmGatewayHttpAdapter` |
| Zakaz upstream `/health/ready` | URL probe tylko `.../api/v1/health` |
| D-47 / D-48 / D-49 | Unit + brak rejectu gateway na `POST /runs` |
| Liveness bez regresji | `GET /health` jak wcześniej |
| Typy | unie dyskryminowane wyniku probe; `never` w switch reason; bez `any` |
| Kanon | docs/SPEC aktualne — **nie** treść Kroku 2.2 / 2.3 |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Major nietknięty w tej sesji | tak |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 17 | `WYKONANY` (gate + HOW z tego feature planu) |
| MILESTONE 17 | **nie tworzyć** / nie oznaczać |
| Faza 2 / 2.2 / 2.3 | bez zmian (`WYKONANY` — historia) |
| MILESTONE 2 | bez zmian (`OSIĄGNIĘTY`) |

Edycja pliku major — **poza** tą sesją (ręcznie lub w `/feature-implementation` na życzenie).

---

## Checklist sesji planu

| Pozycja | Status |
|---------|--------|
| Kotwica Faza 17 + bramka ścieżki wstecz | OK |
| Grandfathering docs bez FM: `docs/README.md` | potwierdzone (ta sesja) |
| Pass rozwojowy | probe → serwis/cache → controller → testy; brak przesunięć |
| Stałe timeout/cache | 1500 ms / 10_000 ms (zatwierdzone) |
| Kompletny kod nowych plików | `gateway-liveness.probe.ts` (+ spec) |
| Refaktory `teraz → zamień na` | module / service / controller (+ specs) |
| Commit message EN Conventional Commits | koniec FAZA 1 |
| Major / docs / SPEC nietknięte | tak |
