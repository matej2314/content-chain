import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { newRequestId } from './new-ids';
import { DomainException } from '../exceptions/domain.exception';
import type { ErrorEnvelope } from './error-envelope';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.requestId ?? newRequestId();

    if (!request.requestId) {
      response.setHeader('X-Request-Id', requestId);
    }

    const envelope = this.toEnvelope(exception, requestId);
    const status = this.toStatus(exception);

    if (status >= 500) {
      this.logger.error(
        { requestId, code: envelope.code },
        exception instanceof Error ? exception.message : 'Unknown error',
      );
    }
    response.status(status).json(envelope);
  }

  private toStatus(exception: unknown): HttpStatus {
    if (exception instanceof DomainException) {
      return exception.httpStatus;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private toEnvelope(
    exception: unknown,
    requestId: ErrorEnvelope['requestId'],
  ): ErrorEnvelope {
    if (exception instanceof DomainException) {
      return {
        code: exception.code,
        message: exception.message,
        requestId,
        details: exception.details,
      };
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      const details = this.validationDetails(payload);
      return {
        code: status === 400 ? 'VALIDATION_FAILED' : this.codeFromHttp(status),
        message: this.messageFromHttp(payload, exception.message),
        requestId,
        details,
      };
    }
    return {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
      requestId,
      details: [],
    };
  }

  private codeFromHttp(status: number): string {
    if (status === 401) return 'UNAUTHORIZED';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    if (status === 409) return 'CONFLICT';
    return 'INTERNAL_ERROR';
  }

  private messageFromHttp(payload: string | object, fallback: string): string {
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && 'message' in payload) {
      const message = (payload as { message: string | string[] }).message;
      if (Array.isArray(message)) return message.join('; ');
      if (typeof message === 'string') return message;
    }
    return fallback;
  }

  private validationDetails(payload: string | object): unknown[] {
    if (typeof payload === 'object' && payload && 'message' in payload) {
      const message = (payload as { message: unknown }).message;
      if (Array.isArray(message))
        return message.map((item) => ({ message: item }));
    }
    return [];
  }
}
