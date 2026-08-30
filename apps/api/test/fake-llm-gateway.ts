import { createRequestId } from '@content-chain/shared';
import { LlmGatewayError } from '../src/llm/llm-gateway.errors';
import type { LlmGatewayPort } from '../src/llm/llm-gateway.port';
import type { LlmChatCommand, LlmChatResult } from '../src/llm/llm-gateway.types';

export const FAKE_LLM_REQUEST_ID = 'req_123e4567-e89b-12d3-a456-426614174000';

export type FakeLlmScriptItem = string | 'GATEWAY_FAIL';

export class FakeLlmGateway implements LlmGatewayPort {
  script: FakeLlmScriptItem[] = [];
  calls: LlmChatCommand[] = [];

  reset(): void {
    this.script = [];
    this.calls = [];
  }

  async chat(command: LlmChatCommand): Promise<LlmChatResult> {
    this.calls.push(command);
    const next = this.script.shift();
    if (next === 'GATEWAY_FAIL') {
      throw new LlmGatewayError(
        'Gateway chat failed (PROVIDER_UNAVAILABLE)',
        'PROVIDER_UNAVAILABLE',
        undefined,
        true,
      );
    }
    return {
      text: next ?? inferReply(command),
      requestId: createRequestId(FAKE_LLM_REQUEST_ID),
      conversationId: command.conversationId,
      model: 'chat-default',
    };
  }
}

export function ideasJson(): string {
  return JSON.stringify({
    ideas: [
      { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
      { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
    ],
  });
}

export function verifierOk(): string {
  return JSON.stringify({ ok: true, contextIssues: [], languageIssues: [] });
}

export function verifierFail(): string {
  return JSON.stringify({
    ok: false,
    contextIssues: ['off-brand CTA'],
    languageIssues: [],
  });
}

export function contentJson(): string {
  return JSON.stringify({
    body: 'Gotowy post.',
    hashtags: ['#acme'],
    cta: 'Napisz do nas',
  });
}

function inferReply(command: LlmChatCommand): string {
  const userContent = command.messages[0]?.content ?? '';
  if (userContent.includes('ConsistencyVerifier')) {
    return verifierOk();
  }
  if (
    userContent.includes('ContentWriterAgent') ||
    userContent.includes('RefineContent')
  ) {
    return contentJson();
  }
  return ideasJson();
}
