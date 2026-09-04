import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { RunLifecyclePort } from '../../../../runs/domain/run-lifecycle.port';
import { verifierOutputSchema } from '../../../application/social.schemas';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import { createVerifierNode } from './verifier.node';

const REQUEST_ID = createRequestId(
  'req_123e4567-e89b-12d3-a456-426614174000',
);

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch' },
    selectedIdeaIds: null,
    phase: 'ideas',
    company: emptyCompanyContext(),
    ideas: [
      { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
    ],
    content: {
      body: 'Gotowy post.',
      hashtags: ['#acme'],
      cta: 'Napisz do nas',
      characterCount: 'Gotowy post.'.length,
    },
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

function fakeAppendLog() {
  return jest.fn().mockResolvedValue(undefined) as jest.MockedFunction<
    RunLifecyclePort['appendLog']
  >;
}

describe('createVerifierNode', () => {
  it('returns an ok verdict and does not append a fail log', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const appendLog = fakeAppendLog();
    const state = makeState();

    const out = await createVerifierNode(hop, appendLog)(state);

    expect(out).toEqual({
      verdict: { ok: true, contextIssues: [], languageIssues: [] },
    });
    expect(appendLog).not.toHaveBeenCalled();
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ConsistencyVerifier',
      schema: verifierOutputSchema,
      userContent: expect.any(String),
    });
  });

  it('sends ideas as payload when phase is ideas', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const state = makeState({ phase: 'ideas' });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(state.ideas));
    expect(userContent).not.toContain(state.content?.body);
  });

  it('sends content as payload when phase is content', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const state = makeState({ phase: 'content' });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(state.content));
    expect(userContent).not.toContain(state.ideas[0].title);
  });

  it('sends reelIdeas as payload when taskType is reel and phase is ideas', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const reelIdeas = [
      {
        id: 'idea_1',
        title: 'R1',
        description: 'D1',
        hook: 'H1',
        durationSeconds: 15 as const,
      },
    ];
    const state = makeState({
      taskType: 'reel_ideas',
      phase: 'ideas',
      reelIdeas,
    });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(reelIdeas));
    expect(userContent).not.toContain(state.ideas[0].title);
  });

  it('sends reelScript as payload when taskType is reel and phase is content', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const reelScript = {
      segments: [
        {
          startSeconds: 0,
          endSeconds: 15,
          onScreen: 'Hook',
          voiceover: 'Powiedz problem.',
        },
      ],
      cta: 'Napisz do nas',
    };
    const state = makeState({
      taskType: 'reel_script',
      phase: 'content',
      reelScript,
    });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(reelScript));
    expect(userContent).not.toContain(state.content?.body);
  });

  it('coerces pass-only issue notes into an ok verdict and logs a warn', async () => {
    const hop = fakeHop({
      data: {
        ok: false,
        contextIssues: [
          'idea_1: CTA «Napisz do nas» — poprawne mapowanie na cta.items[].label, pass.',
        ],
        languageIssues: [],
      },
    });
    const appendLog = fakeAppendLog();
    const state = makeState();

    const out = await createVerifierNode(hop, appendLog)(state);

    expect(out.verdict).toEqual({
      ok: true,
      contextIssues: [],
      languageIssues: [],
    });
    expect(appendLog).toHaveBeenCalledTimes(1);
    expect(appendLog).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      level: 'warn',
      step: 'ConsistencyVerifier',
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      message: expect.stringMatching(/pass-only issue notes; treating as ok/),
    });
  });

  it('logs context and language issues separately when the verdict fails', async () => {
    const hop = fakeHop({
      data: {
        ok: false,
        contextIssues: ['off-brand CTA'],
        languageIssues: ['missing comma'],
      },
    });
    const appendLog = fakeAppendLog();
    const state = makeState();

    const out = await createVerifierNode(hop, appendLog)(state);

    expect(out.verdict).toEqual({
      ok: false,
      contextIssues: ['off-brand CTA'],
      languageIssues: ['missing comma'],
    });
    expect(appendLog).toHaveBeenCalledTimes(1);
    expect(appendLog).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      level: 'warn',
      step: 'ConsistencyVerifier',
      requestId: 'req_123e4567-e89b-12d3-a456-426614174000',
      message: expect.stringMatching(/off-brand CTA/),
    });
    const message = String(appendLog.mock.calls[0][0].message);
    expect(message).toContain('Context issues: ["off-brand CTA"]');
    expect(message).toContain('Language issues: ["missing comma"]');
    expect(message).not.toMatch(/GATEWAY_KEY|jwt|password|secret/i);
  });

  it('propagates STRUCTURED_OUTPUT_INVALID from the hop', async () => {
    const hop = fakeHop(
      new DomainException(
        'STRUCTURED_OUTPUT_INVALID',
        'LLM output failed schema validation',
        500,
      ),
    );
    const appendLog = fakeAppendLog();

    await expect(
      createVerifierNode(hop, appendLog)(makeState()),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
    expect(appendLog).not.toHaveBeenCalled();
  });
});
