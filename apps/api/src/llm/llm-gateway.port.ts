import type { LlmChatCommand, LlmChatResult } from './llm-gateway.types';

export interface LlmGatewayPort {
  chat(command: LlmChatCommand): Promise<LlmChatResult>;
}
