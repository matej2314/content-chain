const GATEWAY_ERROR_CODE_LABELS = new Set([
  'RATE_LIMITED',
  'PROVIDER_RATE_LIMITED',
  'PROVIDER_TIMEOUT',
  'PROVIDER_UNAVAILABLE',
  'GATEWAY_KEY_MISSING',
  'GATEWAY_KEY_INVALID',
  'GATEWAY_KEY_NOT_CONFIGURED',
  'MODEL_ALIAS_NOT_FOUND',
  'VALIDATION_FAILED',
  'MODEL_NOT_ALLOWED',
  'PROVIDER_AUTH_FAILED',
  'PROVIDER_UNSUPPORTED',
  'TOOLS_NOT_SUPPORTED',
  'THINKING_NOT_SUPPORTED',
  'STREAMING_NOT_SUPPORTED',
  'INTERNAL_SERVER_ERROR',
  'UNKNOWN',
]);

export function toGatewayErrorCodeLabel(code: string | undefined): string {
  if (!code) return 'UNKNOWN';
  if (GATEWAY_ERROR_CODE_LABELS.has(code)) return code;
  return 'UNKNOWN';
}

const counts = new Map<string, number>();

/** shortcut: in-memory only (no prom scrape on worker); upgrade when host exports package counters */
export const gatewayErrorsTotal = {
  inc(labels: { code: string }): void {
    counts.set(labels.code, (counts.get(labels.code) ?? 0) + 1);
  },
  reset(): void {
    counts.clear();
  },
};

export const metricsRegistry = {
  async metrics(): Promise<string> {
    return [...counts.entries()]
      .map(
        ([code, n]) =>
          `content_chain_gateway_errors_total{code="${code}"} ${n}`,
      )
      .join('\n');
  },
};
