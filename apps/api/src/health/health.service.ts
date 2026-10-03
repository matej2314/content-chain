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
  
}
