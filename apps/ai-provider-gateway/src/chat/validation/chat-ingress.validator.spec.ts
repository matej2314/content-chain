import { validateChatIngress } from './chat-ingress.validator';
import { INGRESS_LIMITS } from './chat-ingress.constants';
import { ApiErrorCode } from '../../common/errors/api-error.code';
import type { ChatRequestDto } from '../dto/chat-request.dto';
import type { ChatIngressProfile } from './chat-ingress.types';

function requestWith(messages: ChatRequestDto['messages']): ChatRequestDto {
  return { modelAlias: 'test', messages };
}

function expectValidationFailed(
  dto: ChatRequestDto,
  profile: ChatIngressProfile,
): void {
  expect(() => validateChatIngress(dto, profile)).toThrow(
    expect.objectContaining({
      response: expect.objectContaining({
        code: ApiErrorCode.VALIDATION_FAILED,
      }),
    }),
  );
}

describe('validateChatIngress', () => {
  describe('native profile', () => {
    const limits = INGRESS_LIMITS.native;

    it('should pass with the maximum number of messages', () => {
      expect(() =>
        validateChatIngress(
          requestWith(
            Array(limits.maxMessages).fill({ role: 'user', content: 'test' }),
          ),
          'native',
        ),
      ).not.toThrow();
    });

    it('should fail when message count exceeds the native maximum', () => {
      expectValidationFailed(
        requestWith(
          Array(limits.maxMessages + 1).fill({
            role: 'user',
            content: 'test',
          }),
        ),
        'native',
      );
    });

    it('should pass when user content is at the native maximum', () => {
      expect(() =>
        validateChatIngress(
          requestWith([
            { role: 'user', content: 'a'.repeat(limits.maxContentUser) },
          ]),
          'native',
        ),
      ).not.toThrow();
    });

    it('should fail when user content exceeds the native maximum', () => {
      expectValidationFailed(
        requestWith([
          {
            role: 'user',
            content: 'a'.repeat(limits.maxContentUser + 1),
          },
        ]),
        'native',
      );
    });

    it('should pass when assistant content is at the native maximum', () => {
      expect(() =>
        validateChatIngress(
          requestWith([
            {
              role: 'assistant',
              content: 'a'.repeat(limits.maxContentAssistant),
            },
          ]),
          'native',
        ),
      ).not.toThrow();
    });

    it('should fail when assistant content exceeds the native maximum', () => {
      expectValidationFailed(
        requestWith([
          {
            role: 'assistant',
            content: 'a'.repeat(limits.maxContentAssistant + 1),
          },
        ]),
        'native',
      );
    });

    it('should pass when tool content is at the native maximum', () => {
      expect(() =>
        validateChatIngress(
          requestWith([
            {
              role: 'tool',
              content: 'a'.repeat(limits.maxContentTool),
              toolCallId: 'call_1',
            },
          ]),
          'native',
        ),
      ).not.toThrow();
    });

    it('should fail when tool content exceeds the native maximum', () => {
      expectValidationFailed(
        requestWith([
          {
            role: 'tool',
            content: 'a'.repeat(limits.maxContentTool + 1),
            toolCallId: 'call_1',
          },
        ]),
        'native',
      );
    });
  });

  describe('facade-openai profile', () => {
    const limits = INGRESS_LIMITS['facade-openai'];

    it('should pass with 200 messages', () => {
      expect(() =>
        validateChatIngress(
          requestWith(Array(200).fill({ role: 'user', content: 'test' })),
          'facade-openai',
        ),
      ).not.toThrow();
    });

    it('should pass when user content is below the facade maximum', () => {
      expect(() =>
        validateChatIngress(
          requestWith([{ role: 'user', content: 'a'.repeat(100000) }]),
          'facade-openai',
        ),
      ).not.toThrow();
    });

    it('should fail when message count exceeds the facade maximum', () => {
      expectValidationFailed(
        requestWith(
          Array(limits.maxMessages + 1).fill({
            role: 'user',
            content: 'test',
          }),
        ),
        'facade-openai',
      );
    });

    it('should fail when user content exceeds the facade maximum', () => {
      expectValidationFailed(
        requestWith([
          {
            role: 'user',
            content: 'a'.repeat(limits.maxContentUser + 1),
          },
        ]),
        'facade-openai',
      );
    });
  });

  describe('facade-anthropic profile', () => {
    const limits = INGRESS_LIMITS['facade-anthropic'];

    it('should pass with 200 messages', () => {
      expect(() =>
        validateChatIngress(
          requestWith(Array(200).fill({ role: 'user', content: 'test' })),
          'facade-anthropic',
        ),
      ).not.toThrow();
    });

    it('should fail when message count exceeds the facade maximum', () => {
      expectValidationFailed(
        requestWith(
          Array(limits.maxMessages + 1).fill({
            role: 'user',
            content: 'test',
          }),
        ),
        'facade-anthropic',
      );
    });
  });
});
