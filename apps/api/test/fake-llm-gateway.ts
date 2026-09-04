import { createRequestId } from '@content-chain/shared';
import { LlmGatewayError } from '../src/llm/llm-gateway.errors';
import type { LlmGatewayPort } from '../src/llm/llm-gateway.port';
import type {
  LlmChatCommand,
  LlmChatResult,
} from '../src/llm/llm-gateway.types';

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

  if (userContent.includes('(ścieżka content: page_copy)')) {
    return pageDocumentJson();
  }
  if (userContent.includes('(ścieżka content: page_outline)')) {
    return pageOutlineJson();
  }

  if (userContent.includes('(ścieżka rolek: reel_script)')) {
    return reelScriptJson();
  }

  if (userContent.includes('(ścieżka rolek: reel_ideas)')) {
    return reelIdeasJson();
  }

  if (
    userContent.includes('ConsistencyVerifier') ||
    userContent.includes('sędzią spójności')
  ) {
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

export function reelIdeasJson(): string {
  return JSON.stringify({
    ideas: [
      {
        id: 'idea_1',
        title: 'R1',
        description: 'D1',
        hook: 'H1',
        durationSeconds: 15,
      },
      {
        id: 'idea_2',
        title: 'R2',
        description: 'D2',
        hook: 'H2',
        durationSeconds: 30,
      },
    ],
  });
}

export function reelScriptJson(): string {
  return JSON.stringify({
    segments: [
      {
        startSeconds: 0,
        endSeconds: 15,
        onScreen: 'hook na ekranie',
        voiceover: 'jedno zdanie problemu.',
      },
    ],
    cta: 'Napisz do nas',
  });
}

export function pageOutlineJson(): string {
  return JSON.stringify({
    title: 'Audyt w 10 dni',
    sections: [
      { heading: 'Problem', summary: 'Chaos ops po seedzie.' },
      { heading: 'Oferta', summary: 'Audyt procesów Acme.' },
    ],
  });
}

export function pageDocumentJson(): string {
  return JSON.stringify({
    title: 'Audyt procesów',
    lead: 'Founderzy odzyskują czas.',
    body: 'Pełny tekst strony na bazie briefu i kontekstu.',
    metaTitle: 'Audyt procesów Acme',
    metaDescription: 'Przegląd ops w 10 dni.',
  });
}
