import { DomainException } from '../../shared/exceptions/domain.exception';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import type { RunRecord } from '../../runs/domain/run.types';
import type { SocialResultStore } from '../domain/social-result.port';
import type {
  PipelineState,
  ReelIdea,
  ReelScript,
  SocialContent,
  SocialIdea,
  SocialPipelineOutcome,
} from '../domain/social.types';
import type { SocialPipelineFacade } from './social-pipeline.facade';
import { SocialRunExecutor } from './social-run.executor';

const ideas: SocialIdea[] = [
  { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
  { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
];

const content: SocialContent = {
  body: 'Gotowy post.',
  hashtags: ['#acme'],
  cta: 'Napisz do nas',
};

const reelIdeas: ReelIdea[] = [
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
];

const reelScript: ReelScript = {
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

function makeRun(overrides: Partial<RunRecord> = {}): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status: 'running',
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    pipelinePhase: null,
    ideasRefineCount: 0,
    contentRefineCount: 0,
    recoveryAttempts: 0,
    createdAt: new Date(),
    ...overrides,
  };
}

function fakeStore(
  overrides: {
    ideas?: SocialIdea[];
    reelIdeas?: ReelIdea[];
    pipeline?: PipelineState;
  } = {},
): jest.Mocked<SocialResultStore> {
  return {
    replaceIdeas: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceIdeas')),
    replaceReelIdeas: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceReelIdeas')),
    replaceReelScript: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceReelScript')),
    replaceContent: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceContent')),
    getContent: jest.fn().mockRejectedValue(new Error('unexpected getContent')),
    getReelScript: jest
      .fn()
      .mockRejectedValue(new Error('unexpected getReelScript')),
    listIdeas: jest.fn().mockResolvedValue(overrides.ideas ?? []),
    listReelIdeas: jest.fn().mockResolvedValue(overrides.reelIdeas ?? []),
    getPipelineState: jest.fn().mockResolvedValue(
      overrides.pipeline ?? {
        phase: null,
        ideasRefineCount: 0,
        contentRefineCount: 0,
      },
    ),
    savePipelineState: jest.fn().mockResolvedValue(undefined),
  };
}

function fakeLifecycle(): jest.Mocked<RunLifecyclePort> {
  return {
    appendLog: jest.fn().mockResolvedValue(undefined),
    transition: jest
      .fn()
      .mockImplementation(async (run: RunRecord, to: RunRecord['status']) => ({
        ...run,
        status: to,
      })),
  };
}

function fakeFacade(
  result:
    SocialPipelineOutcome | Error | (() => Promise<SocialPipelineOutcome>),
): Pick<SocialPipelineFacade, 'invokePhase'> {
  const invokePhase = jest.fn(async (): Promise<SocialPipelineOutcome> => {
    if (typeof result === 'function') return result();
    if (result instanceof Error) throw result;
    return result;
  });
  return { invokePhase };
}

function makeExecutor(args: {
  facade: Pick<SocialPipelineFacade, 'invokePhase'>;
  lifecycle: RunLifecyclePort;
  store: SocialResultStore;
}): SocialRunExecutor {
  return new SocialRunExecutor(args.facade, args.lifecycle, args.store);
}

describe('SocialRunExecutor', () => {
  describe('phase resolution', () => {
    it('invokes ideas for post_ideas and completes with ideas summary', async () => {
      const run = makeRun({ taskType: 'post_ideas' });
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content: null,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'ideas',
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'ideas:2',
      });
    });

    it('invokes content for post_content even when stored phase is ideas', async () => {
      const run = makeRun({ taskType: 'post_content' });
      const store = fakeStore({
        pipeline: {
          phase: 'ideas',
          ideasRefineCount: 1,
          contentRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'content',
        ideasRefineCount: 1,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(
        run,
        'content',
        expect.objectContaining({
          ideasRefineCount: 1,
          contentRefineCount: 0,
        }),
      );
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'content',
      });
    });

    it('invokes content after HITL when then_content has selectedIdeaIds', async () => {
      const run = makeRun({
        taskType: 'post_ideas_then_content',
        selectedIdeaIds: ['idea_1'],
      });
      const store = fakeStore({
        ideas,
        pipeline: {
          phase: 'ideas',
          ideasRefineCount: 0,
          contentRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'content', {
        ideas,
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'content',
      });
    });

    it('uses stored phase when task type does not force content', async () => {
      const run = makeRun({ taskType: 'post_ideas' });
      const store = fakeStore({
        pipeline: {
          phase: 'content',
          ideasRefineCount: 0,
          contentRefineCount: 2,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).toHaveBeenCalledWith(
        run,
        'content',
        expect.objectContaining({ contentRefineCount: 2 }),
      );
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'content',
      });
    });

    it('invokes ideas for reel_ideas and completes with reelIdeas summary', async () => {
      const run = makeRun({ taskType: 'reel_ideas' });
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas,
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'ideas',
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'reelIdeas:2',
      });
    });

    it('invokes content for reel_script even when stored phase is ideas', async () => {
      const run = makeRun({ taskType: 'reel_script' });
      const store = fakeStore({
        pipeline: {
          phase: 'ideas',
          ideasRefineCount: 1,
          contentRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas: [],
        reelScript,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'content',
        ideasRefineCount: 1,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(
        run,
        'content',
        expect.objectContaining({
          ideasRefineCount: 1,
          contentRefineCount: 0,
        }),
      );
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'reelScript',
      });
    });

    it('invokes content after HITL when then_scripts has selectedIdeaIds', async () => {
      const run = makeRun({
        taskType: 'reel_ideas_then_scripts',
        selectedIdeaIds: ['idea_1'],
      });
      const store = fakeStore({
        reelIdeas,
        pipeline: {
          phase: 'ideas',
          ideasRefineCount: 0,
          contentRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas,
        reelScript,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'content', {
        ideas: [],
        reelIdeas,
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'reelScript',
      });
    });

    it('uses stored phase when reel_ideas does not force content', async () => {
      const run = makeRun({ taskType: 'reel_ideas' });
      const store = fakeStore({
        pipeline: {
          phase: 'content',
          ideasRefineCount: 0,
          contentRefineCount: 2,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas,
        reelScript,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).toHaveBeenCalledWith(
        run,
        'content',
        expect.objectContaining({ contentRefineCount: 2 }),
      );
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'reelScript',
      });
    });
  });

  describe('HITL', () => {
    it('pauses on stored ideas without selection and skips the facade (recovery)', async () => {
      const run = makeRun({
        taskType: 'post_ideas_then_content',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ ideas });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content: null,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.savePipelineState).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
    });

    it('treats an empty selectedIdeaIds list as no selection', async () => {
      const run = makeRun({
        taskType: 'post_ideas_then_content',
        selectedIdeaIds: [],
      });
      const store = fakeStore({ ideas });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content: null,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
    });

    it('pauses on stored reel ideas without selection and skips the facade (recovery)', async () => {
      const run = makeRun({
        taskType: 'reel_ideas_then_scripts',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ reelIdeas });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas,
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.savePipelineState).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: reelIdeas,
      });
    });

    it('treats an empty selectedIdeaIds list as no selection for reel HITL', async () => {
      const run = makeRun({
        taskType: 'reel_ideas_then_scripts',
        selectedIdeaIds: [],
      });
      const store = fakeStore({ reelIdeas });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas: [],
        content: null,
        reelIdeas,
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: reelIdeas,
      });
    });

    it('awaits HITL from the facade after generating ideas', async () => {
      const run = makeRun({
        taskType: 'post_ideas_then_content',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ ideas: [] });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'awaiting_hitl',
        ideas,
        reelIdeas: [],
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'ideas',
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
    });

    it('awaits HITL from the facade after generating reel ideas', async () => {
      const run = makeRun({
        taskType: 'reel_ideas_then_scripts',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ ideas: [], reelIdeas: [] });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'awaiting_hitl',
        ideas: [],
        reelIdeas,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'ideas',
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'ideas', {
        ideas: [],
        reelIdeas: [],
        ideasRefineCount: 0,
        contentRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: reelIdeas,
      });
    });
  });

  describe('failed outcomes', () => {
    it('transitions failed when the facade returns a failed outcome', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'failed',
        code: 'VERIFIER_FAILED',
        message: 'off-brand CTA',
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'VERIFIER_FAILED',
        failedMessage: 'off-brand CTA',
      });
      expect(lifecycle.transition).not.toHaveBeenCalledWith(
        run,
        'completed',
        expect.anything(),
      );
    });

    it('maps DomainException to failedCode from the exception', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        new DomainException('CONTEXT_INCOMPLETE', 'incomplete', 409),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await expect(executor.execute(run)).resolves.toBeUndefined();

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'CONTEXT_INCOMPLETE',
        failedMessage: 'incomplete',
      });
    });

    it('maps LlmGatewayError to gatewayCode', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        new LlmGatewayError(
          'Gateway chat failed',
          'PROVIDER_UNAVAILABLE',
          undefined,
          true,
        ),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await expect(executor.execute(run)).resolves.toBeUndefined();

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'PROVIDER_UNAVAILABLE',
        failedMessage: 'Gateway chat failed',
      });
    });

    it('falls back to GATEWAY_ERROR when LlmGatewayError has no code', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        new LlmGatewayError('timeout', undefined, undefined, true),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'GATEWAY_ERROR',
        failedMessage: 'timeout',
      });
    });

    it('maps a generic Error to EXECUTOR_FAILED', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(new Error('graph exploded'));
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'EXECUTOR_FAILED',
        failedMessage: 'graph exploded',
      });
    });

    it('maps a non-Error throw to EXECUTOR_FAILED with a default message', async () => {
      const run = makeRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(async () => {
        throw 'not-an-error';
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'EXECUTOR_FAILED',
        failedMessage: 'pipeline failed',
      });
    });

    it('does not catch store failures before invoke', async () => {
      const run = makeRun();
      const store = fakeStore();
      store.listIdeas.mockRejectedValue(new Error('db down'));
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade({
        kind: 'completed',
        ideas,
        content: null,
        reelIdeas: [],
        reelScript: null,
      });
      const executor = makeExecutor({ facade, lifecycle, store });

      await expect(executor.execute(run)).rejects.toThrow('db down');
      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(lifecycle.transition).not.toHaveBeenCalled();
    });
  });

  it('throws when taskType is not social and does not invoke the facade', async () => {
    const invokePhase = jest.fn();
    const executor = new SocialRunExecutor(
      { invokePhase } as Pick<SocialPipelineFacade, 'invokePhase'>,
      fakeLifecycle(),
      fakeStore(),
    );
    await expect(
      executor.execute(makeRun({ taskType: 'page_copy' })),
    ).rejects.toThrow(/non-social task/);
    expect(invokePhase).not.toHaveBeenCalled();
  });
});
