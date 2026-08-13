import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { DomainException } from '../exceptions/domain.exception';
import { HttpExceptionFilter } from './http-exception.filter';
import { createRequestId } from '@content-chain/shared';

const requestId = createRequestId('req_123e4567-e89b-12d3-a456-426614174000');

function hostWith(statusSink: {
  statusCode?: number;
  body?: unknown;
}): ArgumentsHost {
  const response = {
    status(code: number) {
      statusSink.statusCode = code;
      return this;
    },
    json(body: unknown) {
      statusSink.body = body;
      return this;
    },
  };
  return {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({ requestId }),
    }),
  } as ArgumentsHost;
}

describe('HttpExceptionFilter', () => {
  const filter = new HttpExceptionFilter();

  it('maps DomainException to the K-1 envelope', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(
      new DomainException(
        'CONTEXT_INCOMPLETE',
        'Company context gate is not satisfied',
        409,
        [{ section: 'offer' }],
      ),
      hostWith(sink),
    );
    expect(sink.statusCode).toBe(409);
    expect(sink.body).toEqual({
      code: 'CONTEXT_INCOMPLETE',
      message: 'Company context gate is not satisfied',
      requestId,
      details: [{ section: 'offer' }],
    });
  });

  it('maps ValidationPipe-style HttpException to VALIDATION_FAILED', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(
      new BadRequestException(['brief should not be empty']),
      hostWith(sink),
    );
    expect(sink.statusCode).toBe(400);
    expect((sink.body as { code: string }).code).toBe('VALIDATION_FAILED');
    expect((sink.body as { requestId: string }).requestId).toBe(requestId);
  });

  it('does not map a generic HTTP 404 to RUN_NOT_FOUND', () => {
    const sink: { statusCode?: number; body?: unknown } = {};
    filter.catch(new NotFoundException(), hostWith(sink));
    expect(sink.statusCode).toBe(404);
    expect((sink.body as { code: string }).code).toBe('NOT_FOUND');
    expect((sink.body as { code: string }).code).not.toBe('RUN_NOT_FOUND');
  });
});
