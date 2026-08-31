import type {
  LlmChatMessage,
  LlmChatParams,
  LlmUsage,
} from './llm-gateway.types';

export type GatewayChatRequestLog = {
  url: string;
  modelAlias: string;
  conversationId: string;
  messageCount: number;
  messages: readonly {
    role: LlmChatMessage['role'];
    contentLength: number;
    content: string;
  }[];
  params: LlmChatParams | null;
};

export type GatewayChatResponseLog = {
  httpStatus: number;
  requestId: string | null;
  conversationId: string | null;
  model: string | null;
  finishReason: string | null;
  usage: LlmUsage | null;
  text: string;
  textLength: number;
};

export type GatewayChatErrorLog = {
  httpStatus: number;
  code: string | null;
  message: string | null;
  requestId: string | null;
};

export function redactGatewaySecret(value: string, secret: string): string {
  if (secret.length === 0) {
    return value;
  }
  return value.split(secret).join('[REDACTED]');
}

export function buildGatewayChatRequestLog(input: {
  url: string;
  modelAlias: string;
  conversationId: string;
  messages: readonly LlmChatMessage[];
  params: LlmChatParams | undefined;
  secret: string;
}): GatewayChatRequestLog {
  return {
    url: input.url,
    modelAlias: input.modelAlias,
    conversationId: input.conversationId,
    messageCount: input.messages.length,
    messages: input.messages.map((message) => {
      const content = redactGatewaySecret(message.content, input.secret);
      return {
        role: message.role,
        contentLength: content.length,
        content,
      };
    }),
    params: input.params ?? null,
  };
}

export function buildGatewayChatResponseLog(input: {
  httpStatus: number;
  requestId: string | undefined;
  conversationId: string | undefined;
  model: string | undefined;
  finishReason: string | undefined;
  usage: LlmUsage | undefined;
  text: string | undefined;
  secret: string;
}): GatewayChatResponseLog {
  const text = redactGatewaySecret(input.text ?? '', input.secret);
  return {
    httpStatus: input.httpStatus,
    requestId: input.requestId ?? null,
    conversationId: input.conversationId ?? null,
    model: input.model ?? null,
    finishReason: input.finishReason ?? null,
    usage: input.usage ?? null,
    text,
    textLength: text.length,
  };
}

export function buildGatewayChatErrorLog(input: {
  httpStatus: number;
  code: string | undefined;
  message: string | undefined;
  requestId: string | undefined;
  secret: string;
}): GatewayChatErrorLog {
  return {
    httpStatus: input.httpStatus,
    code: input.code ?? null,
    message:
      input.message === undefined
        ? null
        : redactGatewaySecret(input.message, input.secret),
    requestId: input.requestId ?? null,
  };
}
