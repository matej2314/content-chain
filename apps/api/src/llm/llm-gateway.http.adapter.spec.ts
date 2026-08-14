import {
  createConversationId,
  createGatewayModelAlias,
} from '@content-chain/shared';
import { LlmGatewayHttpAdapter } from './llm-gateway.http.adapter';
import { LlmGatewayError } from './llm-gateway.errors';
import type { Env } from '../shared/config/env.schema';
import {
  gatewayErrorsTotal,
  metricsRegistry,
} from '../metrics/metrics.registry';

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

  beforeEach(() => {
    gatewayErrorsTotal.reset();
  });

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

  it('increments gatewayErrorsTotal with an allowlisted code', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(429, {
        code: 'RATE_LIMITED',
        message: 'slow down',
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      }),
    );

    const adapter = new LlmGatewayHttpAdapter(env);
    await expect(adapter.chat(command)).rejects.toBeInstanceOf(LlmGatewayError);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_gateway_errors_total\{code="RATE_LIMITED"\} 1/,
    );
  });

  it('does not register a free-form error message as a metric code', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(502, {
        code: 'Rate limit exceeded for org-x',
        message: 'Rate limit exceeded for org-x',
        requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      }),
    );

    const adapter = new LlmGatewayHttpAdapter(env);
    await expect(adapter.chat(command)).rejects.toBeInstanceOf(LlmGatewayError);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_gateway_errors_total\{code="UNKNOWN"\} 1/,
    );
    expect(snapshot).not.toContain('Rate limit exceeded for org-x');
  });

  it('increments VALIDATION_FAILED when gateway returns an invalid requestId', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(201, {
        requestId: 'not-a-req',
        conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
        model: 'chat-default',
        output: { type: 'text', text: 'ok' },
      }),
    );

    const adapter = new LlmGatewayHttpAdapter(env);
    await expect(adapter.chat(command)).rejects.toBeInstanceOf(LlmGatewayError);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_gateway_errors_total\{code="VALIDATION_FAILED"\} 1/,
    );
  });

  it('increments UNKNOWN when the gateway hop fails at the network layer', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('fetch failed'));

    const adapter = new LlmGatewayHttpAdapter(env);
    await expect(adapter.chat(command)).rejects.toBeInstanceOf(LlmGatewayError);

    const snapshot = await metricsRegistry.metrics();
    expect(snapshot).toMatch(
      /content_chain_gateway_errors_total\{code="UNKNOWN"\} 1/,
    );
  });
});
