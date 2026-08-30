import { Inject, Injectable } from '@nestjs/common';
import {
  createGatewayModelAlias,
  unbrand,
  type ConversationId,
  type RequestId,
} from '@content-chain/shared';
import { LLM_GATEWAY_PORT } from '../../../llm/llm.tokens';
import { LlmGatewayError } from '../../../llm/llm-gateway.errors';
import { ENV, type Env } from '../../../shared/config/env';
import { isRetryable } from '../../../runs/domain/is-retryable';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../../runs/domain/run-lifecycle.port';
import { parseLlmJson } from '../../application/parse-llm-json';
import type { RunId } from '@content-chain/shared';
import type { LlmGatewayPort } from '../../../llm/llm-gateway.port';
import type { z } from 'zod';

interface ChatJsonInput<T extends z.ZodTypeAny> {
  runId: RunId;
  conversationId: ConversationId;
  step: string;
  userContent: string;
  schema: T;
}

const MAX_GATEWAY_ATTEMPTS = 3;

@Injectable()
export class LlmHopService {
  constructor(
    @Inject(LLM_GATEWAY_PORT) private readonly gateway: LlmGatewayPort,
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_LIFECYCLE) private readonly lifeCycle: RunLifecyclePort,
  ) {}

  async chatJson<T extends z.ZodTypeAny>(
    input: ChatJsonInput<T>,
  ): Promise<{ data: z.output<T>; requestId: RequestId }> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_GATEWAY_ATTEMPTS; attempt++) {
      let gatewayRequestId: string | undefined;
      try {
        const result = await this.gateway.chat({
          modelAlias: createGatewayModelAlias(this.env.GATEWAY_MODEL_ALIAS),
          conversationId: input.conversationId,
          messages: [{ role: 'user', content: input.userContent }],
        });
        gatewayRequestId = unbrand(result.requestId);
        const data = parseLlmJson(input.schema, result.text);
        await this.lifeCycle.appendLog({
          runId: input.runId,
          conversationId: input.conversationId,
          level: 'info',
          message: `LLM hop ${input.step}`,
          step: input.step,
          requestId: gatewayRequestId,
        });
        return { data, requestId: result.requestId };
      } catch (error) {
        lastError = error;
        const retryable =
          error instanceof LlmGatewayError &&
          isRetryable({
            kind: 'gateway',
            code: error.gatewayCode,
            retryable: error.retryable,
          });
        await this.lifeCycle.appendLog({
          runId: input.runId,
          conversationId: input.conversationId,
          level: 'error',
          message: `LLM hop ${input.step} failed (attempt ${attempt})`,
          step: input.step,
          requestId:
            error instanceof LlmGatewayError
              ? error.gatewayRequestId
              : gatewayRequestId,
        });
        if (!retryable || attempt === MAX_GATEWAY_ATTEMPTS) throw error;
      }
    }
    throw lastError;
  }
}
