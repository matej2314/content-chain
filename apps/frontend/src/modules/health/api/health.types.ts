export type HealthCheckStatus = 'healthy' | 'unhealthy';

export type HealthReadyAggregate = 'ready' | 'not_ready';

export type HealthCheck = {
  readonly status: HealthCheckStatus;
  readonly message: string;
};

export type HealthReadyResponse = {
  readonly status: HealthReadyAggregate;
  readonly timestamp: string;
  readonly checks: {
    readonly api: HealthCheck;
    readonly gateway: HealthCheck;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseHealthCheck(value: unknown, label: string): HealthCheck {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${label}`);
  }
  if (value.status !== 'healthy' && value.status !== 'unhealthy') {
    throw new Error(`Invalid ${label}.status`);
  }
  if (typeof value.message !== 'string') {
    throw new Error(`Invalid ${label}.message`);
  }
  return { status: value.status, message: value.message };
}

export function parseHealthReadyResponse(value: unknown): HealthReadyResponse {
  if (!isRecord(value)) {
    throw new Error('Invalid health/ready payload');
  }
  if (value.status !== 'ready' && value.status !== 'not_ready') {
    throw new Error('Invalid health/ready.status');
  }
  if (typeof value.timestamp !== 'string' || value.timestamp.trim().length === 0) {
    throw new Error('Invalid health/ready.timestamp');
  }
  if (!isRecord(value.checks)) {
    throw new Error('Invalid health/ready.checks');
  }
  return {
    status: value.status,
    timestamp: value.timestamp,
    checks: {
      api: parseHealthCheck(value.checks.api, 'checks.api'),
      gateway: parseHealthCheck(value.checks.gateway, 'checks.gateway'),
    },
  };
}

/** F-6: gatewayAlive ⇔ checks.gateway.status === "healthy". */
export function isGatewayAlive(response: HealthReadyResponse): boolean {
  return response.checks.gateway.status === 'healthy';
}
