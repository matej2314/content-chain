import type {
  ConversationId,
  GatewayModelAlias,
  RequestId,
} from '@content-chain/shared';

export type LlmChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type LlmChatParams = {
  temperature?: number;
  maxOutputTokens?: number;
};

export type LlmChatCommand = {
  modelAlias: GatewayModelAlias;
  conversationId: ConversationId;
  messages: LlmChatMessage[];
  params?: LlmChatParams;
};

export type LlmUsage = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

export type LlmChatResult = {
  text: string;
  requestId: RequestId;
  conversationId: ConversationId;
  model: string;
  usage?: LlmUsage;
  finishReason?: string;
};
