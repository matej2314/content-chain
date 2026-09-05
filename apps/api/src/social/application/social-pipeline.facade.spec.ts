import type { CompanyContextRepository } from '../../company-context/domain/company-context.port';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import type { RunRecord, SocialRunRecord } from '../../runs/domain/run.types';
import {
  makeContentRun,
  makeSocialRun,
} from '../../runs/run-record.test-helpers';
import type { SocialResultStore } from '../domain/social-result.port';
import type { ReelIdea, SocialIdea } from '../domain/social.types';
import type { SocialGraphState } from '../infrastructure/graph/state';
import { LlmHopService } from '../../shared/llm/llm-hop';
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
    clearContents: async () => undefined,
    appendContent: unexpected,
    listContents: unexpected,
    clearReelScripts: async () => undefined,
    appendReelScript: unexpected,
    listReelScripts: unexpected,
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
  store: SocialResultStore = unusedStore(),
) {
  compileSocialGraphMock.mockReturnValue({ invoke });
  return new SocialPipelineFacade(
    unusedContext(),
    store,
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
    const content = {
      body: 'Post',
      hashtags: ['#acme'],
      cta: 'CTA',
      characterCount: 4,
    };
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
      content: {
        body: 'Post',
        hashtags: ['#acme'],
        cta: 'CTA',
        characterCount: 4,
      },
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

  it('invokes once per HITL id, clears contents once, and does not call replaceContent', async () => {
    const run = makeSocialRun({
      taskType: 'post_ideas_then_content',
      selectedIdeaIds: ['idea_1', 'idea_2'],
    });
    const graphState: SocialGraphState = {
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'post_ideas_then_content',
      platform: run.platform,
      language: run.language,
      brief: run.brief,
      selectedIdeaIds: ['idea_1'],
      phase: 'content',
      company: null,
      ideas,
      content: {
        body: 'Post',
        hashtags: ['#acme'],
        characterCount: 4,
      },
      reelIdeas: [],
      reelScript: null,
      verdict: null,
      ideasRefineCount: 0,
      contentRefineCount: 3,
      failedCode: null,
      failedMessage: null,
    };
    const invoke = jest.fn().mockResolvedValue(graphState);
    const clearContents = jest.fn().mockResolvedValue(undefined);
    const replaceContent = jest.fn();
    const store: SocialResultStore = {
      ...unusedStore(),
      clearContents,
      replaceContent,
    };
    const facade = makeFacade(invoke, store);

    const outcome = await facade.invokePhase(run, 'content', {
      ideas,
      reelIdeas: [],
      ideasRefineCount: 0,
      contentRefineCount: 3,
    });

    expect(clearContents).toHaveBeenCalledTimes(1);
    expect(clearContents).toHaveBeenCalledWith(run.id);
    expect(replaceContent).not.toHaveBeenCalled();
    expect(invoke).toHaveBeenCalledTimes(2);
    expect(invoke.mock.calls[0]?.[0].selectedIdeaIds).toEqual(['idea_1']);
    expect(invoke.mock.calls[1]?.[0].selectedIdeaIds).toEqual(['idea_2']);
    expect(invoke.mock.calls[0]?.[0].contentRefineCount).toBe(3);
    expect(invoke.mock.calls[1]?.[0].contentRefineCount).toBe(3);
    expect(outcome.kind).toBe('completed');
  });

  it('stops the two-stage loop when one hop fails', async () => {
    const run = makeSocialRun({
      taskType: 'post_ideas_then_content',
      selectedIdeaIds: ['idea_1', 'idea_2', 'idea_3'],
    });
    const failed: SocialGraphState = {
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'post_ideas_then_content',
      platform: run.platform,
      language: run.language,
      brief: run.brief,
      selectedIdeaIds: ['idea_2'],
      phase: 'content',
      company: null,
      ideas,
      content: null,
      reelIdeas: [],
      reelScript: null,
      verdict: {
        ok: false,
        contextIssues: ['off-brand'],
        languageIssues: [],
      },
      ideasRefineCount: 0,
      contentRefineCount: 0,
      failedCode: 'VERIFIER_FAILED',
      failedMessage: 'nope',
    };
    const invoke = jest
      .fn()
      .mockResolvedValueOnce({ ...failed, failedCode: null, verdict: null })
      .mockResolvedValueOnce(failed);
    const facade = makeFacade(invoke);

    const outcome = await facade.invokePhase(run, 'content', {
      ideas,
      reelIdeas: [],
      ideasRefineCount: 0,
      contentRefineCount: 0,
    });

    expect(invoke).toHaveBeenCalledTimes(2);
    expect(outcome).toEqual({
      kind: 'failed',
      code: 'VERIFIER_FAILED',
      message: 'nope',
      contextIssues: ['off-brand'],
      languageIssues: [],
    });
  });
});
