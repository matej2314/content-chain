import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import { ideasOutputSchema, reelIdeasOutputSchema } from '../../../application/social.schemas';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import { createIdeationNode } from './ideation.node';

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch', ideaCount: 3 },
    selectedIdeaIds: null,
    phase: 'ideas',
    company: emptyCompanyContext(),
    ideas: [],
    content: { body: 'placeholder', hashtags: [], characterCount: 11 },
    reelIdeas: [],
    reelScript: null,
    verdict: { ok: true, contextIssues: [], languageIssues: [] },
    ideasRefineCount: 0,
    contentRefineCount: 0,
    failedCode: null,
    failedMessage: null,
    ...overrides,
  };
}

function fakeHop(
  result:
    | { data: unknown; requestId?: ReturnType<typeof createRequestId> }
    | Error,
): LlmHopService {
  const chatJson = jest.fn().mockImplementation(async () => {
    if (result instanceof Error) throw result;
    return {
      data: result.data,
      requestId:
        result.requestId ??
        createRequestId('req_123e4567-e89b-12d3-a456-426614174000'),
    };
  });
  return { chatJson } as unknown as LlmHopService;
}

describe('createIdeationNode', () => {
  it('fills idea_<uuid> when the model omits id', async () => {
    const hop = fakeHop({
      data: {
        ideas: [{ title: 'T1', angle: 'A1', hook: 'H1' }],
      },
    });
    const node = createIdeationNode(hop);
    const state = makeState();

    const out = await node(state);

    expect(out.ideas).toHaveLength(1);
    expect(out.ideas?.[0]).toEqual({
      id: expect.stringMatching(/^idea_[0-9a-f-]{36}$/i),
      title: 'T1',
      angle: 'A1',
      hook: 'H1',
    });
  });

  it('maps optional cta when the model returns it', async () => {
    const hop = fakeHop({
      data: {
        ideas: [{ title: 'T1', angle: 'A1', hook: 'H1', cta: 'Napisz' }],
      },
    });

    const out = await createIdeationNode(hop)(makeState());

    expect(out.ideas?.[0]).toEqual({
      id: expect.stringMatching(/^idea_[0-9a-f-]{36}$/i),
      title: 'T1',
      angle: 'A1',
      hook: 'H1',
      cta: 'Napisz',
    });
  });

  it('keeps a model-provided idea id', async () => {
    const hop = fakeHop({
      data: {
        ideas: [
          { id: 'idea_keep-me', title: 'T2', angle: 'A2', hook: 'H2' },
        ],
      },
    });
    const node = createIdeationNode(hop);

    const out = await node(makeState());

    expect(out.ideas?.[0]?.id).toBe('idea_keep-me');
  });

  it('calls the hop as IdeationAgent with rendered prompt vars', async () => {
    const hop = fakeHop({
      data: { ideas: [{ title: 'T', angle: 'A', hook: 'H' }] },
    });
    const company = {
      ...emptyCompanyContext(),
      identity: { name: 'Acme', description: 'B2B' },
    };
    const brief = { topic: 'Q3 launch', ideaCount: 3 };
    const state = makeState({ company, brief, language: 'en', platform: 'linkedin' });

    await createIdeationNode(hop)(state);

    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: ideasOutputSchema,
      userContent: expect.stringContaining('"name":"Acme"'),
    });
    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain('Język treści pomysłów: en.');
    expect(userContent).toContain('Platforma: linkedin.');
    expect(userContent).toContain('Liczba pomysłów: 3.');
    expect(userContent).toContain(JSON.stringify(brief));
  });

  it('defaults ideaCount to 5 when brief omits it', async () => {
    const hop = fakeHop({
      data: { ideas: [{ title: 'T', angle: 'A', hook: 'H' }] },
    });

    await createIdeationNode(hop)(makeState({ brief: { topic: 'Q3' } }));

    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain('Liczba pomysłów: 5.');
  });

  it('returns reelIdeas and uses reelIdeasOutputSchema when taskType is reel_ideas', async () => {
    const hop = fakeHop({
      data: {
        ideas: [
          {
            title: 'R1',
            description: 'D1',
            hook: 'H1',
            durationSeconds: 15,
          },
        ],
      },
    });
    const node = createIdeationNode(hop);
    const state = makeState({ taskType: 'reel_ideas' });

    const out = await node(state);

    expect(out.ideas).toBeUndefined();
    expect(out.reelIdeas).toHaveLength(1);
    expect(out.reelIdeas?.[0]).toEqual({
      id: expect.stringMatching(/^idea_[0-9a-f-]{36}$/i),
      title: 'R1',
      description: 'D1',
      hook: 'H1',
      durationSeconds: 15,
    });
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: reelIdeasOutputSchema,
      userContent: expect.stringContaining('(ścieżka rolek: reel_ideas)'),
    });
  });

  it('propagates STRUCTURED_OUTPUT_INVALID from the hop', async () => {
    const hop = fakeHop(
      new DomainException(
        'STRUCTURED_OUTPUT_INVALID',
        'LLM output failed schema validation',
        500,
      ),
    );

    await expect(createIdeationNode(hop)(makeState())).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });
});
