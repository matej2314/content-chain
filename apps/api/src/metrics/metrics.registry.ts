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
