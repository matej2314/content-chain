import { Inject, Injectable } from '@nestjs/common';
import { ENV, type Env } from '../shared/config/env';

export const GATEWAY_PROBE_TIMEOUT_MS = 1_500;

export type GatewayLivenessProbeReason =
  'timeout' | 'unreachable' | 'bad-status' | 'bad-body';

export type GatewayLivenessProbeResult =
  { ok: true } | { ok: false; reason: GatewayLivenessProbeReason };

type GatewayLivenessBody = {
  status: 'healthy';
  timestamp: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseGatewayLivenessBody(value: unknown): GatewayLivenessBody | null {
  if (!isRecord(value)) return null;

  const status = value.status;
  const timestamp = value.timestamp;
  if (status !== 'healthy') return null;
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
