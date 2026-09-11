import { Inject, Injectable } from '@nestjs/common';
import {
  createGatewayModelAlias,
  unbrand,
  type ConversationId,
  type RequestId,
} from '@content-chain/shared';
import { LLM_GATEWAY_PORT } from '../../llm/llm.tokens';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import { ENV, type Env } from '../config/env';
import { isRetryable } from '../../runs/domain/is-retryable';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../runs/domain/run-lifecycle.port';
import { DomainException } from '../exceptions/domain.exception';
import { parseLlmJson } from './parse-llm-json';
import type { RunId } from '@content-chain/shared';
import type { LlmGatewayPort } from '../../llm/llm-gateway.port';
import type { z } from 'zod';

interface ChatJsonInput<T extends z.ZodType> {
  runId: RunId;
  conversationId: ConversationId;
  step: string;
  userContent: string;
  schema: T;
}

const MAX_GATEWAY_ATTEMPTS = 3;
const STRUCTURED_OUTPUT_INVALID = 'STRUCTURED_OUTPUT_INVALID';

function isStructuredOutputInvalid(error: unknown): error is DomainException {
  return (
    error instanceof DomainException && error.code === STRUCTURED_OUTPUT_INVALID
  );
}

function isHopRetryable(error: unknown): boolean {
  if (isStructuredOutputInvalid(error)) {
    return true;
  }
  return (
    error instanceof LlmGatewayError &&
    isRetryable({
      kind: 'gateway',
      code: error.gatewayCode,
      retryable: error.retryable,
    })
  );
}

function repairSuffix(error: DomainException, repairAttempt: number): string {
  const issues =
    error.details.length > 0
      ? ` Issues: ${JSON.stringify(error.details)}.`
      : '';
  return `\n\n---\nThe previous reply failed structured-output validation (${error.message}).${issues} Return ONLY JSON that satisfies the original task. No markdown, no commentary. (repair ${String(repairAttempt)})`;
}

function hopUserContent(
  userContent: string,
  parseError: DomainException | null,
  attempt: number,
): string {
  if (parseError === null || attempt === 1) {
    return userContent;
  }
  return `${userContent}${repairSuffix(parseError, attempt)}`;
}

function hopErrorLogMessage(
  step: string,
  attempt: number,
  error: unknown,
): string {
  const prefix = `LLM hop ${step} failed (attempt ${String(attempt)})`;
  if (error instanceof LlmGatewayError || error instanceof DomainException) {
    return `${prefix}: ${error.message}`;
  }
  return prefix;
}

@Injectable()
export class LlmHopService {
  constructor(
    @Inject(LLM_GATEWAY_PORT) private readonly gateway: LlmGatewayPort,
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_LIFECYCLE) private readonly lifeCycle: RunLifecyclePort,
  ) {}

  async chatJson<T extends z.ZodType>(
    input: ChatJsonInput<T>,
  ): Promise<{ data: z.output<T>; requestId: RequestId }> {
    let lastError: unknown;
    let lastParseError: DomainException | null = null;
    for (let attempt = 1; attempt <= MAX_GATEWAY_ATTEMPTS; attempt++) {
      let gatewayRequestId: string | undefined;
      try {
        const result = await this.gateway.chat({
          modelAlias: createGatewayModelAlias(this.env.GATEWAY_MODEL_ALIAS),
          conversationId: input.conversationId,
          messages: [
            {
              role: 'user',
              content: hopUserContent(
                input.userContent,
                lastParseError,
                attempt,
              ),
            },
          ],
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
        if (isStructuredOutputInvalid(error)) {
          lastParseError = error;
        }
        await this.lifeCycle.appendLog({
          runId: input.runId,
          conversationId: input.conversationId,
          level: 'error',
          message: hopErrorLogMessage(input.step, attempt, error),
          step: input.step,
          requestId:
            error instanceof LlmGatewayError
              ? error.gatewayRequestId
              : gatewayRequestId,
        });
        if (!isHopRetryable(error) || attempt === MAX_GATEWAY_ATTEMPTS) {
          throw error;
        }
      }
    }
    throw lastError;
  }
}
