import {
  buildGatewayChatErrorLog,
  buildGatewayChatRequestLog,
  buildGatewayChatResponseLog,
  redactGatewaySecret,
} from './llm-gateway-chat.log';

describe('llm-gateway-chat.log', () => {
  it('redacts the gateway secret from strings', () => {
    expect(
      redactGatewaySecret('before super-secret-key after', 'super-secret-key'),
    ).toBe('before [REDACTED] after');
  });

  it('builds a request log with split messages and without the secret', () => {
    const log = buildGatewayChatRequestLog({
      url: 'http://127.0.0.1:3100/api/v1/chat',
      modelAlias: 'chat-default',
      conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
      messages: [
        { role: 'user', content: 'hello super-secret-key' },
        { role: 'user', content: 'tail' },
      ],
      params: { maxOutputTokens: 4096 },
      secret: 'super-secret-key',
    });

    expect(log.messageCount).toBe(2);
    expect(log.messages[0]?.content).toBe('hello [REDACTED]');
    expect(JSON.stringify(log)).not.toContain('super-secret-key');
    expect(log.params).toEqual({ maxOutputTokens: 4096 });
  });

  it('builds a response log with output text', () => {
    const log = buildGatewayChatResponseLog({
      httpStatus: 201,
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      conversationId: 'conv_123e4567-e89b-12d3-a456-426614174000',
      model: 'chat-default',
      finishReason: 'stop',
      usage: { outputTokens: 580 },
      text: '{"ok":false}',
      secret: 'super-secret-key',
    });

    expect(log.text).toBe('{"ok":false}');
    expect(log.textLength).toBe(12);
    expect(log.finishReason).toBe('stop');
  });

  it('builds an error log without leaking the secret', () => {
    const log = buildGatewayChatErrorLog({
      httpStatus: 403,
      code: 'GATEWAY_KEY_INVALID',
      message: 'rejected super-secret-key',
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      secret: 'super-secret-key',
    });

    expect(log.message).toBe('rejected [REDACTED]');
    expect(JSON.stringify(log)).not.toContain('super-secret-key');
  });
});
