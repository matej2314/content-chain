import { Inject, Injectable } from '@nestjs/common';
import { createRequestId, isRequestId, unbrand } from '@content-chain/shared';
import { ENV, type Env } from '../shared/config/env';
import { LlmGatewayError } from './llm-gateway.errors';
import type { LlmGatewayPort } from './llm-gateway.port';
import type {
  LlmChatCommand,
  LlmChatResult,
  LlmUsage,
} from './llm-gateway.types';

type GatewayChatResponse = {
  requestId: string;
  conversationId: string;
  model: string;
  output?: { type?: string; text?: string };
  usage?: LlmUsage;
  finishReason?: string;
};

type GatewayErrorBody = {
  code?: string;
  message?: string;
  requestId?: string;
  details?: unknown[];
};

const RETRYABLE_CODES = new Set([
  'RATE_LIMITED',
  'PROVIDER_RATE_LIMITED',
  'PROVIDER_TIMEOUT',
  'PROVIDER_UNAVAILABLE',
]);

@Injectable()
export class LlmGatewayHttpAdapter implements LlmGatewayPort {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async chat(command: LlmChatCommand): Promise<LlmChatResult> {
    const url = `${this.env.GATEWAY_BASE_URL.replace(/\/$/, '')}/api/v1/chat`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Key': this.env.GATEWAY_KEY,
        },
        body: JSON.stringify({
          modelAlias: unbrand(command.modelAlias),
          conversationId: unbrand(command.conversationId),
          messages: command.messages,
          ...(command.params ? { params: command.params } : {}),
        }),
      });

      if (response.status !== 201) {
        const errorBody = await this.readJsonBody<GatewayErrorBody>(response);
        throw this.mapHttpError(errorBody);
      }

      const body = await this.readJsonBody<GatewayChatResponse>(response);
      if (!body || !isRequestId(body.requestId)) {
        throw new LlmGatewayError(
          'Gateway chat failed (invalid requestId in response)',
          'VALIDATION_FAILED',
          undefined,
          false,
        );
      }

      const requestId = createRequestId(body.requestId);
      return {
        text: body.output?.text ?? '',
        requestId,
        conversationId: command.conversationId,
        model: body.model,
        usage: body.usage,
        finishReason: body.finishReason,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private async readJsonBody<T>(response: Response): Promise<T | undefined> {
    try {
      return (await response.json()) as T;
    } catch {
      return undefined;
    }
  }

  private mapHttpError(body: GatewayErrorBody | undefined): LlmGatewayError {
    const code = body?.code;
    const gatewayRequestId = body?.requestId;
    const retryable = code ? RETRYABLE_CODES.has(code) : false;
    const safeMessage = `Gateway chat failed (${code ?? 'UNKNOWN_ERROR'})`;
    return new LlmGatewayError(
      safeMessage,
      code,
      gatewayRequestId,
      retryable,
      body?.details ?? [],
    );
  }

  private mapError(error: unknown): LlmGatewayError {
    if (error instanceof LlmGatewayError) return error;
    return new LlmGatewayError(
      'Gateway chat failed (UNKNOWN)',
      undefined,
      undefined,
      false,
    );
  }
}
