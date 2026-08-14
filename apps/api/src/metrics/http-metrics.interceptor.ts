import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import {
  httpRequestDurationSeconds,
  httpRequestsTotal,
} from './metrics.registry';
import type { Request, Response } from 'express';
import { DomainException } from '../shared/exceptions/domain.exception';

export const UNMAPPED_HTTP_ROUTE = 'unmapped';

export function httpRouteLabel(request: Request): string {
  const path = request.route?.path;
  if (typeof path === 'string' && path.length > 0) {
    return path;
  }
  return UNMAPPED_HTTP_ROUTE;
}

function statusLabel(error: unknown, responseStatus: number): string {
  if (responseStatus !== 200) {
    return String(responseStatus);
  }
  if (error instanceof HttpException) {
    return String(error.getStatus());
  }
  if (error instanceof DomainException) return String(error.httpStatus);
  return '500';
}

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    if (request.path === '/metrics' || request.path === 'metrics') {
      return next.handle();
    }
    const route = httpRouteLabel(request);
    const method = request.method;
    const end = httpRequestDurationSeconds.startTimer({ method, route });
    let recorded = false;
    const record = (status: string) => {
      if (recorded) return;
      recorded = true;
      end();
      httpRequestsTotal.inc({ method, route, status });
    };
    return next.handle().pipe(
      tap({
        next: () => record(String(response.statusCode)),
        error: (error: unknown) => {
          record(statusLabel(error, response.statusCode));
        },
      }),
    );
  }
}
