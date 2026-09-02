import type { CompanyContextRepository } from '../../company-context/domain/company-context.port';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import type { RunRecord, SocialRunRecord } from '../../runs/domain/run.types';
import { makeContentRun, makeSocialRun } from '../../runs/run-record.test-helpers';
import type { SocialResultStore } from '../domain/social-result.port';
import type { ReelIdea, SocialIdea } from '../domain/social.types';
import type { SocialGraphState } from '../infrastructure/graph/state';
import { LlmHopService } from '../infrastructure/graph/llm-hop';
import { compileSocialGraph } from '../infrastructure/graph/social.graph';
import { SocialPipelineFacade, toOutcome } from './social-pipeline.facade';

jest.mock('../infrastructure/graph/social.graph', () => ({
  compileSocialGraph: jest.fn(),
}));

const compileSocialGraphMock = jest.mocked(compileSocialGraph);

const ideas: SocialIdea[] = [
  { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
];

const reelIdeas: ReelIdea[] = [
  {
    id: 'idea_r1',
    title: 'R1',
    description: 'D1',
    hook: 'H1',
    durationSeconds: 15,
  },
];

function makeFinal(
  overrides: Partial<
    Pick<
      SocialGraphState,
      | 'failedCode'
      | 'failedMessage'
      | 'verdict'
      | 'ideas'
      | 'content'
      | 'reelIdeas'
      | 'reelScript'
    >
  > = {},
) {
  return {
    failedCode: null,
    failedMessage: null,
    verdict: null,
    ideas,
    content: null,
    reelIdeas: [] as ReelIdea[],
    reelScript: null,
    ...overrides,
  };
}

function unusedContext(): CompanyContextRepository {
  const unexpected = async () => {
    throw new Error('unexpected context call');
  };
  return { get: unexpected, put: unexpected, patch: unexpected };
}

function unusedStore(): SocialResultStore {
  const unexpected = async () => {
    throw new Error('unexpected store call');
  };
  return {
    replaceIdeas: unexpected,
    replaceReelIdeas: unexpected,
    replaceReelScript: unexpected,
    replaceContent: unexpected,
    listIdeas: unexpected,
    listReelIdeas: unexpected,
    getContent: unexpected,
    getReelScript: unexpected,
    savePipelineState: unexpected,
    getPipelineState: unexpected,
  };
}

function unusedLifecycle(): RunLifecyclePort {
  return {
    appendLog: async () => {
      throw new Error('unexpected appendLog');
    },
    transition: async () => {
      throw new Error('unexpected transition');
    },
  };
}

function unusedHop(): LlmHopService {
  return {
    chatJson: async () => {
      throw new Error('unexpected hop');
    },
  } as LlmHopService;
}

function makeFacade(
  invoke: jest.MockedFunction<
    (input: SocialGraphState) => Promise<SocialGraphState>
  >,
) {
  compileSocialGraphMock.mockReturnValue({ invoke });
  return new SocialPipelineFacade(
    unusedContext(),
    unusedStore(),
    unusedHop(),
    unusedLifecycle(),
  );
}

describe('toOutcome', () => {
  it('returns awaiting_hitl for ideas phase of post_ideas_then_content', () => {
    expect(
      toOutcome({ taskType: 'post_ideas_then_content' }, 'ideas', makeFinal()),
    ).toEqual({ kind: 'awaiting_hitl', ideas, reelIdeas: [] });
  });

  it('returns completed for post_ideas without HITL', () => {
    expect(toOutcome({ taskType: 'post_ideas' }, 'ideas', makeFinal())).toEqual(
      {
        kind: 'completed',
        ideas,
        content: null,
        reelIdeas: [],
        reelScript: null,
      },
    );
  });

  it('returns completed for content phase after HITL', () => {
    const content = { body: 'Post', hashtags: ['#acme'], cta: 'CTA' };
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'content',
        makeFinal({ content }),
      ),
    ).toEqual({
      kind: 'completed',
      ideas,
      content,
      reelIdeas: [],
      reelScript: null,
    });
  });

  it('returns awaiting_hitl for ideas phase of reel_ideas_then_scripts', () => {
    expect(
      toOutcome(
        { taskType: 'reel_ideas_then_scripts' },
        'ideas',
        makeFinal({ reelIdeas }),
      ),
    ).toEqual({ kind: 'awaiting_hitl', ideas: [], reelIdeas });
  });

  it('returns completed for reel_ideas without HITL', () => {
    expect(
      toOutcome({ taskType: 'reel_ideas' }, 'ideas', makeFinal({ reelIdeas })),
    ).toEqual({
      kind: 'completed',
      ideas,
      content: null,
      reelIdeas,
      reelScript: null,
    });
  });

  it('returns completed for reel content phase after HITL', () => {
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
    expect(
      toOutcome(
        { taskType: 'reel_ideas_then_scripts' },
        'content',
        makeFinal({ reelIdeas, reelScript }),
      ),
    ).toEqual({
      kind: 'completed',
      ideas,
      content: null,
      reelIdeas,
      reelScript,
    });
  });

  it('returns failed when graph set failedCode, even if HITL would apply', () => {
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'ideas',
        makeFinal({
          failedCode: 'VERIFIER_FAILED',
          failedMessage: null,
          verdict: {
            ok: false,
            contextIssues: ['off-brand CTA'],
            languageIssues: ['grammar'],
          },
        }),
      ),
    ).toEqual({
      kind: 'failed',
      code: 'VERIFIER_FAILED',
      message: 'pipeline failed',
      contextIssues: ['off-brand CTA'],
      languageIssues: ['grammar'],
    });
  });
});

describe('SocialPipelineFacade.invokePhase', () => {
  afterEach(() => {
    compileSocialGraphMock.mockReset();
  });

  it('rejects a non-social task type before invoking the graph', async () => {
    const invoke = jest.fn();
    const facade = makeFacade(invoke);
    const run = makeContentRun({ taskType: 'page_copy' });

    await expect(
      facade.invokePhase(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      }),
    ).rejects.toThrow(
      'SocialPipelineFacade received non-social task type: page_copy',
    );
    expect(invoke).not.toHaveBeenCalled();
  });

  it('rejects a non-social platform before invoking the graph', async () => {
    const invoke = jest.fn();
    const facade = makeFacade(invoke);
    const run: RunRecord = {
      ...makeSocialRun({ taskType: 'post_ideas' }),
      // persistence garbage outside SocialPlatform — tests the isSocialPlatform guard
      platform: 'web' as SocialRunRecord['platform'],
    };

    await expect(
      facade.invokePhase(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      }),
    ).rejects.toThrow('SocialPipelineFacade received non-social platform: web');
    expect(invoke).not.toHaveBeenCalled();
  });

  it('invokes the graph with run fields, extras, and social platform', async () => {
    const run = makeSocialRun({
      taskType: 'post_ideas_then_content',
      platform: 'instagram',
      language: 'en',
      brief: { topic: 'Launch', audience: 'founders' },
      selectedIdeaIds: ['idea_1'],
    });
    const graphState: SocialGraphState = {
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'post_ideas_then_content',
      platform: 'instagram',
      language: 'en',
      brief: run.brief,
      selectedIdeaIds: ['idea_1'],
      phase: 'content',
      company: null,
      ideas,
      content: { body: 'Post', hashtags: ['#acme'], cta: 'CTA' },
      reelIdeas: [],
      reelScript: null,
      verdict: null,
      ideasRefineCount: 1,
      contentRefineCount: 2,
      failedCode: null,
      failedMessage: null,
    };
    const invoke = jest.fn().mockResolvedValue(graphState);
    const facade = makeFacade(invoke);

    const outcome = await facade.invokePhase(run, 'content', {
      ideas,
      reelIdeas: [],
      ideasRefineCount: 1,
      contentRefineCount: 2,
    });

    expect(invoke).toHaveBeenCalledWith({
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'post_ideas_then_content',
      platform: 'instagram',
      language: 'en',
      brief: run.brief,
      selectedIdeaIds: ['idea_1'],
      phase: 'content',
      company: null,
      ideas,
      content: null,
      reelIdeas: [],
      reelScript: null,
      verdict: null,
      ideasRefineCount: 1,
      contentRefineCount: 2,
      failedCode: null,
      failedMessage: null,
    });
    expect(outcome).toEqual({
      kind: 'completed',
      ideas,
      content: graphState.content,
      reelIdeas: [],
      reelScript: null,
    });
  });
});
