import {
  createConversationId,
  createGatewayModelAlias,
} from '@content-chain/shared';
import { LlmGatewayHttpAdapter } from './llm-gateway.http.adapter';
import { LlmGatewayError } from './llm-gateway.errors';
import type { Env } from '../shared/config/env.schema';

const env = {
  GATEWAY_BASE_URL: 'http://127.0.0.1:3100',
  GATEWAY_KEY: 'super-secret-key',
} as Env;

const command = {
  modelAlias: createGatewayModelAlias('chat-default'),
  conversationId: createConversationId(
    'conv_123e4567-e89b-12d3-a456-426614174000',
  ),
  messages: [{ role: 'user' as const, content: 'ping' }],
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('LlmGatewayHttpAdapter', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('posts native chat without x-request-id and returns gateway requestId + usage', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      jsonResponse(201, {
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
        conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
        model: 'chat-default',
        output: { type: 'text', text: 'pong' },
        usage: { inputTokens: 5, outputTokens: 1, totalTokens: 6 },
        finishReason: 'stop',
      }),
    );
    global.fetch = fetchMock;

    const adapter = new LlmGatewayHttpAdapter(env);
    const result = await adapter.chat(command);
    expect(result.text).toBe('pong');
    expect(result.requestId).toBe('req_123e4567-e89b-12d3-a456-426614174000');
    expect(result.usage).toEqual({
      inputTokens: 5,
      outputTokens: 1,
      totalTokens: 6,
    });
    expect(result.finishReason).toBe('stop');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3100/api/v1/chat',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gateway-Key': 'super-secret-key',
        },
      }),
    );
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(
      (init.headers as Record<string, string>)['x-request-id'],
    ).toBeUndefined();
  });

  it('passes params to gateway body when present', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      jsonResponse(201, {
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
        conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
        model: 'chat-default',
        output: { type: 'text', text: 'ok' },
      }),
    );
    global.fetch = fetchMock;

    const adapter = new LlmGatewayHttpAdapter(env);
    await adapter.chat({
      ...command,
      params: { temperature: 0.4, maxOutputTokens: 2048 },
    });
    const body = JSON.parse(
      String((fetchMock.mock.calls[0][1] as RequestInit).body),
    );
    expect(body.params).toEqual({ temperature: 0.4, maxOutputTokens: 2048 });
  });

  it('omits params from gateway body when absent', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      jsonResponse(201, {
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
        conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
        model: 'chat-default',
        output: { type: 'text', text: 'ok' },
      }),
    );
    global.fetch = fetchMock;

    const adapter = new LlmGatewayHttpAdapter(env);
    await adapter.chat(command);
    const body = JSON.parse(
      String((fetchMock.mock.calls[0][1] as RequestInit).body),
    );
    expect(body).not.toHaveProperty('params');
  });

  it('maps gateway errors without leaking the key and preserves details', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(403, {
        code: 'GATEWAY_KEY_INVALID',
        message: 'nope',
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
        details: [{ reason: 'key not in allowlist' }],
      }),
    );

    try {
      const adapter = new LlmGatewayHttpAdapter(env);
      await adapter.chat(command);
    } catch (error) {
      expect(error).toBeInstanceOf(LlmGatewayError);
      expect((error as LlmGatewayError).message).not.toContain(
        'super-secret-key',
      );
      expect((error as LlmGatewayError).retryable).toBe(false);
      expect((error as LlmGatewayError).gatewayCode).toBe(
        'GATEWAY_KEY_INVALID',
      );
      expect((error as LlmGatewayError).details).toEqual([
        { reason: 'key not in allowlist' },
      ]);
    }
  });
});
