import {
  createConversationId,
  createRequestId,
} from '@content-chain/shared';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import type { LlmGatewayPort } from '../../llm/llm-gateway.port';
import type { LlmChatResult } from '../../llm/llm-gateway.types';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import { verifierOutputSchema } from '../../social/application/social.schemas';
import type { Env } from '../config/env.schema';
import { newConversationId, newRunId } from '../http/new-ids';
import { LlmHopService } from './llm-hop';

const REQUEST_ID = createRequestId(
  'req_123e4567-e89b-12d3-a456-426614174000',
);

function fakeLifecycle(): RunLifecyclePort {
  return {
    appendLog: jest.fn().mockResolvedValue(undefined),
    transition: jest
      .fn()
      .mockImplementation(async (run, to) => ({ ...run, status: to })),
  };
}

function chatResult(text: string): LlmChatResult {
  return {
    text,
    requestId: REQUEST_ID,
    conversationId: createConversationId(
      'conv_123e4567-e89b-12d3-a456-426614174000',
    ),
    model: 'chat-default',
  };
}

function makeHop(gateway: LlmGatewayPort, lifecycle: RunLifecyclePort) {
  return new LlmHopService(
    gateway,
    { GATEWAY_MODEL_ALIAS: 'chat-default' } as Env,
    lifecycle,
  );
}

describe('LlmHopService.chatJson', () => {
  const input = {
    runId: newRunId(),
    conversationId: newConversationId(),
    step: 'ConsistencyVerifier',
    userContent: 'payload',
    schema: verifierOutputSchema,
  };

  it('logs success only after JSON parses, with gateway requestId', async () => {
    const chat = jest.fn().mockResolvedValue(
      chatResult('{"ok":true,"contextIssues":[],"languageIssues":[]}'),
    );
    const lifecycle = fakeLifecycle();

    const out = await makeHop({ chat }, lifecycle).chatJson(input);

    expect(out.data.ok).toBe(true);
    expect(out.requestId).toBe(REQUEST_ID);
    expect(lifecycle.appendLog).toHaveBeenCalledTimes(1);
    expect(lifecycle.appendLog).toHaveBeenCalledWith({
      runId: input.runId,
      conversationId: input.conversationId,
      level: 'info',
      message: 'LLM hop ConsistencyVerifier',
      step: 'ConsistencyVerifier',
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
    });
  });

  it('does not log success when parse fails and keeps requestId on the error log', async () => {
    const chat = jest.fn().mockResolvedValue(chatResult('{"ok":"nope"}'));
    const lifecycle = fakeLifecycle();

    await expect(makeHop({ chat }, lifecycle).chatJson(input)).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );

    expect(chat).toHaveBeenCalledTimes(1);
    expect(lifecycle.appendLog).toHaveBeenCalledTimes(1);
    expect(lifecycle.appendLog).toHaveBeenCalledWith({
      runId: input.runId,
      conversationId: input.conversationId,
      level: 'error',
      message: 'LLM hop ConsistencyVerifier failed (attempt 1)',
      step: 'ConsistencyVerifier',
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
    });
  });

  it('retries retryable gateway errors and logs requestId from the gateway error', async () => {
    const chat = jest
      .fn()
      .mockRejectedValueOnce(
        new LlmGatewayError(
          'Gateway chat failed (PROVIDER_UNAVAILABLE)',
          'PROVIDER_UNAVAILABLE',
          'req_aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
          true,
        ),
      )
      .mockResolvedValue(
        chatResult('{"ok":true,"contextIssues":[],"languageIssues":[]}'),
      );
    const lifecycle = fakeLifecycle();

    await makeHop({ chat }, lifecycle).chatJson(input);

    expect(chat).toHaveBeenCalledTimes(2);
    expect(lifecycle.appendLog).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        level: 'error',
        requestId: 'req_aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
      }),
    );
    expect(lifecycle.appendLog).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        level: 'info',
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      }),
    );
  });
});
