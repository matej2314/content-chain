import { Inject, Injectable, Logger } from '@nestjs/common';
import { createRequestId, isRequestId, unbrand } from '@content-chain/shared';
import { ENV, type Env } from '../shared/config/env';
import { LlmGatewayError } from './llm-gateway.errors';
import { gatewayErrorsTotal } from '../metrics/metrics.registry';
import { toGatewayErrorCodeLabel } from '../metrics/gateway-error-code';
import {
  buildGatewayChatErrorLog,
  buildGatewayChatRequestLog,
  buildGatewayChatResponseLog,
} from './llm-gateway-chat.log';
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
  private readonly logger = new Logger(LlmGatewayHttpAdapter.name);

  constructor(@Inject(ENV) private readonly env: Env) {}

  async chat(command: LlmChatCommand): Promise<LlmChatResult> {
    const url = `${this.env.GATEWAY_BASE_URL.replace(/\/$/, '')}/api/v1/chat`;
    const modelAlias = unbrand(command.modelAlias);
    const conversationId = unbrand(command.conversationId);
    this.logDevGatewayChat(() => {
      this.logger.log(
        `gateway chat request ${JSON.stringify(
          buildGatewayChatRequestLog({
            url,
            modelAlias,
            conversationId,
            messages: command.messages,
            params: command.params,
            secret: this.env.GATEWAY_KEY,
          }),
        )}`,
      );
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Key': this.env.GATEWAY_KEY,
        },
        body: JSON.stringify({
          modelAlias,
          conversationId,
          messages: command.messages,
          ...(command.params ? { params: command.params } : {}),
        }),
      });

      if (response.status !== 201) {
        const errorBody = await this.readJsonBody<GatewayErrorBody>(response);
        this.logDevGatewayChat(() => {
          this.logger.warn(
            `gateway chat error ${JSON.stringify(
              buildGatewayChatErrorLog({
                httpStatus: response.status,
                code: errorBody?.code,
                message: errorBody?.message,
                requestId: errorBody?.requestId,
                secret: this.env.GATEWAY_KEY,
              }),
            )}`,
          );
        });
        throw this.mapHttpError(errorBody);
      }

      const body = await this.readJsonBody<GatewayChatResponse>(response);
      this.logDevGatewayChat(() => {
        this.logger.log(
          `gateway chat response ${JSON.stringify(
            buildGatewayChatResponseLog({
              httpStatus: response.status,
              requestId: body?.requestId,
              conversationId: body?.conversationId,
              model: body?.model,
              finishReason: body?.finishReason,
              usage: body?.usage,
              text: body?.output?.text,
              secret: this.env.GATEWAY_KEY,
            }),
          )}`,
        );
      });
      if (!body || !isRequestId(body.requestId)) {
        gatewayErrorsTotal.inc({ code: 'VALIDATION_FAILED' });
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
      if (!(error instanceof LlmGatewayError)) {
        this.logger.warn('gateway chat transport error');
      }
      throw this.mapError(error);
    }
  }

  private logDevGatewayChat(write: () => void): void {
    if (this.env.NODE_ENV !== 'development') {
      return;
    }
    write();
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
    gatewayErrorsTotal.inc({ code: toGatewayErrorCodeLabel(code) });
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
    gatewayErrorsTotal.inc({ code: 'UNKNOWN' });
    return new LlmGatewayError(
      'Gateway chat failed (UNKNOWN)',
      undefined,
      undefined,
      false,
    );
  }
}
