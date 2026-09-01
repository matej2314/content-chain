import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import { contentOutputSchema, reelScriptOutputSchema } from '../../../application/social.schemas';
import type { SocialIdea, ReelIdea } from '../../../domain/social.types';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import { createContentWriterNode } from './content-writer.node';

const REQUEST_ID = createRequestId(
  'req_123e4567-e89b-12d3-a456-426614174000',
);

const EMPTY_IDEAS_INSTRUCTION =
  '[] - brak wybranych pomysłów; generuj post wyłącznie z brief.topic, brief.goal i kontekstu firmy';

const SAMPLE_IDEA: SocialIdea = {
  id: 'idea_1',
  title: 'T1',
  angle: 'A1',
  hook: 'H1',
};

const CONTENT_DATA = {
  body: 'Gotowy post.',
  hashtags: ['#acme'],
  cta: 'Napisz do nas',
};

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_content',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch', goal: 'lead' },
    selectedIdeaIds: null,
    phase: 'content',
    company: emptyCompanyContext(),
    ideas: [],
    content: null,
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
      requestId: result.requestId ?? REQUEST_ID,
    };
  });
  return { chatJson } as unknown as LlmHopService;
}

function hopUserContent(hop: LlmHopService): string {
  const chatJson = hop.chatJson as jest.MockedFunction<
    LlmHopService['chatJson']
  >;
  const firstCall = chatJson.mock.calls[0];
  expect(firstCall).toBeDefined();
  return firstCall[0].userContent;
}

describe('createContentWriterNode', () => {
  it('maps hop output to content and calls ContentWriterAgent', async () => {
    const hop = fakeHop({ data: CONTENT_DATA });
    const state = makeState({ ideas: [SAMPLE_IDEA] });

    const out = await createContentWriterNode(hop)(state);

    expect(out).toEqual({
      content: {
        body: CONTENT_DATA.body,
        hashtags: CONTENT_DATA.hashtags,
        cta: CONTENT_DATA.cta,
      },
    });
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ContentWriterAgent',
      schema: contentOutputSchema,
      userContent: expect.stringContaining(JSON.stringify(SAMPLE_IDEA)),
    });
  });

  it('injects the empty-ideas instruction when state.ideas is []', async () => {
    const hop = fakeHop({ data: CONTENT_DATA });

    await createContentWriterNode(hop)(makeState({ ideas: [] }));

    const userContent = hopUserContent(hop);
    expect(userContent).toContain('brak wybranych pomysłów');
    expect(userContent).toContain(EMPTY_IDEAS_INSTRUCTION);
    expect(userContent).toContain(
      'Jeśli pole `ideas` jest puste (brak wybranych pomysłów)',
    );
  });

  it('passes JSON ideas when state.ideas is non-empty', async () => {
    const ideas: SocialIdea[] = [
      SAMPLE_IDEA,
      { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
    ];
    const hop = fakeHop({ data: CONTENT_DATA });

    await createContentWriterNode(hop)(makeState({ ideas }));

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(JSON.stringify(ideas));
    expect(userContent).not.toContain(EMPTY_IDEAS_INSTRUCTION);
  });

  it('filters ideas by selectedIdeaIds when the selection is non-empty', async () => {
    const other: SocialIdea = {
      id: 'idea_2',
      title: 'T2',
      angle: 'A2',
      hook: 'H2',
    };
    const hop = fakeHop({ data: CONTENT_DATA });

    await createContentWriterNode(hop)(
      makeState({
        ideas: [SAMPLE_IDEA, other],
        selectedIdeaIds: ['idea_2'],
      }),
    );

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(JSON.stringify([other]));
    expect(userContent).not.toContain(JSON.stringify(SAMPLE_IDEA));
    expect(userContent).not.toContain(EMPTY_IDEAS_INSTRUCTION);
  });

  it('uses the empty-ideas instruction when selectedIdeaIds match nothing', async () => {
    const hop = fakeHop({ data: CONTENT_DATA });

    await createContentWriterNode(hop)(
      makeState({
        ideas: [SAMPLE_IDEA],
        selectedIdeaIds: ['idea_missing'],
      }),
    );

    expect(hopUserContent(hop)).toContain(EMPTY_IDEAS_INSTRUCTION);
  });

  it('propagates STRUCTURED_OUTPUT_INVALID from the hop', async () => {
    const hop = fakeHop(
      new DomainException(
        'STRUCTURED_OUTPUT_INVALID',
        'LLM output failed schema validation',
        500,
      ),
    );

    await expect(
      createContentWriterNode(hop)(makeState({ ideas: [SAMPLE_IDEA] })),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('maps hop output to reelScript when taskType is reel_script', async () => {
    const reelIdea: ReelIdea = {
      id: 'idea_1',
      title: 'R1',
      description: 'D1',
      hook: 'H1',
      durationSeconds: 15,
    };
    const hop = fakeHop({
      data: {
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz do nas',
      },
    });
    const state = makeState({
      taskType: 'reel_script',
      reelIdeas: [reelIdea],
    });

    const out = await createContentWriterNode(hop)(state);

    expect(out).toEqual({
      reelScript: {
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz do nas',
      },
    });
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ContentWriterAgent',
      schema: reelScriptOutputSchema,
      userContent: expect.stringContaining('(ścieżka rolek: reel_script)'),
    });
    expect(hopUserContent(hop)).toContain(JSON.stringify(reelIdea));
  });

  it('injects the empty-reel-ideas instruction when reelIdeas is []', async () => {
    const hop = fakeHop({
      data: {
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz do nas',
      },
    });

    await createContentWriterNode(hop)(
      makeState({ taskType: 'reel_script', reelIdeas: [] }),
    );

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(
      '[] — brak wybranych pomysłów; generuj scenariusz wyłącznie z brief.topic, brief.goal i kontekstu firmy',
    );
  });

  it('filters reel ideas by selectedIdeaIds when the selection is non-empty', async () => {
    const reelIdea: ReelIdea = {
      id: 'idea_1',
      title: 'R1',
      description: 'D1',
      hook: 'H1',
      durationSeconds: 15,
    };
    const otherReel: ReelIdea = {
      id: 'idea_2',
      title: 'R2',
      description: 'D2',
      hook: 'H2',
      durationSeconds: 30,
    };
    const hop = fakeHop({
      data: {
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz do nas',
      },
    });

    await createContentWriterNode(hop)(
      makeState({
        taskType: 'reel_script',
        reelIdeas: [reelIdea, otherReel],
        selectedIdeaIds: [otherReel.id],
      }),
    );

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(JSON.stringify([otherReel]));
    expect(userContent).not.toContain(JSON.stringify(reelIdea));
    expect(userContent).not.toContain(
      '[] — brak wybranych pomysłów; generuj scenariusz wyłącznie z brief.topic, brief.goal i kontekstu firmy',
    );
  });
});
