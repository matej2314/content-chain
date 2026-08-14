import { lastValueFrom, of, throwError } from 'rxjs';
import {
  ExecutionContext,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DomainException } from '../shared/exceptions/domain.exception';
import { HttpMetricsInterceptor } from './http-metrics.interceptor';
import {
  httpRequestDurationSeconds,
  httpRequestsTotal,
  metricsRegistry,
} from './metrics.registry';
import type { Request, Response } from 'express';

function httpContext(
  request: Partial<Request>,
  response: Partial<Response> = { statusCode: 200 },
): ExecutionContext {
  return {
    getType: () => 'http',
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => response,
    }),
  } as ExecutionContext;
}

describe('HttpMetricsInterceptor', () => {
  const interceptor = new HttpMetricsInterceptor();

  beforeEach(() => {
    httpRequestsTotal.reset();
    httpRequestDurationSeconds.reset();
  });

  it('records a successful request with route template and duration', async () => {
    const context = httpContext({
      method: 'GET',
      path: '/api/v1/health',
      route: { path: '/api/v1/health' },
    } as Partial<Request>);

    await lastValueFrom(interceptor.intercept(context, { handle: () => of('ok') }));

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_http_requests_total\{method="GET",route="\/api\/v1\/health",status="200"\} 1/,
    );
    expect(snapshot).toMatch(
      /content_chain_http_request_duration_seconds_count\{method="GET",route="\/api\/v1\/health"\} 1/,
    );
  });

  it('records HttpException 404 with the exception status and closes the timer', async () => {
    const context = httpContext({
      method: 'GET',
      path: '/api/v1/missing',
      route: { path: '/api/v1/missing' },
    } as Partial<Request>);

    await expect(
      lastValueFrom(
        interceptor.intercept(context, {
          handle: () => throwError(() => new NotFoundException()),
        }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_http_requests_total\{method="GET",route="\/api\/v1\/missing",status="404"\} 1/,
    );
    expect(snapshot).toMatch(
      /content_chain_http_request_duration_seconds_count\{method="GET",route="\/api\/v1\/missing"\} 1/,
    );
  });

  it('records HttpException 500 with the exception status and closes the timer', async () => {
    const context = httpContext({
      method: 'POST',
      path: '/api/v1/runs',
      route: { path: '/api/v1/runs' },
    } as Partial<Request>);

    await expect(
      lastValueFrom(
        interceptor.intercept(context, {
          handle: () => throwError(() => new InternalServerErrorException()),
        }),
      ),
    ).rejects.toBeInstanceOf(InternalServerErrorException);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_http_requests_total\{method="POST",route="\/api\/v1\/runs",status="500"\} 1/,
    );
    expect(snapshot).toMatch(
      /content_chain_http_request_duration_seconds_count\{method="POST",route="\/api\/v1\/runs"\} 1/,
    );
  });

  it('records DomainException with its httpStatus and closes the timer', async () => {
    const context = httpContext({
      method: 'POST',
      path: '/api/v1/company-context',
      route: { path: '/api/v1/company-context' },
    } as Partial<Request>);

    await expect(
      lastValueFrom(
        interceptor.intercept(context, {
          handle: () =>
            throwError(
              () =>
                new DomainException(
                  'CONTEXT_INCOMPLETE',
                  'Company context gate is not satisfied',
                  409,
                ),
            ),
        }),
      ),
    ).rejects.toBeInstanceOf(DomainException);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_http_requests_total\{method="POST",route="\/api\/v1\/company-context",status="409"\} 1/,
    );
    expect(snapshot).toMatch(
      /content_chain_http_request_duration_seconds_count\{method="POST",route="\/api\/v1\/company-context"\} 1/,
    );
  });

  it('uses unmapped when route template is missing and never labels the raw path', async () => {
    const context = httpContext({
      method: 'GET',
      path: '/no-such-route-xyz',
    });

    await expect(
      lastValueFrom(
        interceptor.intercept(context, {
          handle: () => throwError(() => new NotFoundException()),
        }),
      ),
    ).rejects.toBeInstanceOf(NotFoundException);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_http_requests_total\{method="GET",route="unmapped",status="404"\} 1/,
    );
    expect(snapshot).not.toContain('no-such-route-xyz');
  });

  it('does not record scrape requests to /metrics', async () => {
    const context = httpContext({
      method: 'GET',
      path: '/metrics',
      route: { path: '/metrics' },
    } as Partial<Request>);

    await lastValueFrom(interceptor.intercept(context, { handle: () => of('ok') }));

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).not.toMatch(
      /content_chain_http_requests_total\{[^}]*route="\/metrics"/,
    );
  });
});
