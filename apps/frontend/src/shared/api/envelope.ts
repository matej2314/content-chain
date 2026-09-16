import { createRequestId, isRequestId, type RequestId } from '@content-chain/shared';

export type ApiErrorEnvelope = {
  readonly code: string;
  readonly message: string;
  readonly requestId?: RequestId;
  readonly details?: readonly unknown[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseApiErrorEnvelope(value: unknown): ApiErrorEnvelope | null {
  if (!isRecord(value)) return null;
  const { code, message, requestId, details } = value;
  if (typeof code !== 'string' || typeof message !== 'string') return null;

  let parsedRequestId: RequestId | undefined;
  if (typeof requestId === 'string' && isRequestId(requestId)) {
    parsedRequestId = createRequestId(requestId);
  }

  const parsed: ApiErrorEnvelope = {
    code,
    message,
    ...(parsedRequestId !== undefined ? { requestId: parsedRequestId } : {}),
    ...(Array.isArray(details) ? { details } : {}),
  };
  return parsed;
}

export class ApiError extends Error {
  readonly name = 'ApiError';

  constructor(
    readonly status: number,
    readonly envelope: ApiErrorEnvelope,
  ) {
    super(envelope.message);
  }
}
