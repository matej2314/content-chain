import { DomainException } from '../../shared/exceptions/domain.exception';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import type { ContentRunRecord, RunRecord } from '../../runs/domain/run.types';
import {
  makeContentRun,
  makeSocialRun,
} from '../../runs/run-record.test-helpers';
import type { ContentResultStore } from '../domain/content-result.port';
import type {
  ContentPipelineOutcome,
  ContentPipelineState,
  PageDocument,
  PageOutline,
} from '../domain/content.types';
import type { ContentPipelineFacade } from './content-pipeline.facade';
import { ContentRunExecutor } from './content-run.executor';

const outline: PageOutline = {
  id: 'outl_1',
  title: 'Audyt w 10 dni',
  sections: [
    { id: 'osec_1', heading: 'Problem', summary: 'Chaos ops po seedzie.' },
  ],
};

const document: PageDocument = {
  title: 'Audyt procesów',
  lead: 'Founderzy odzyskują czas.',
  body: 'Pełny tekst strony na bazie briefu i kontekstu.',
};

const ZERO_REFINE = {
  outlineRefineCount: 0,
  copyRefineCount: 0,
} as const;

type PipelineOutcomeBody =
  | {
      kind: 'completed';
      outline: PageOutline | null;
      document: PageDocument | null;
    }
  | { kind: 'awaiting_hitl'; outline: PageOutline }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };

function pipelineOutcome(
  body: PipelineOutcomeBody,
  refine: { outlineRefineCount: number; copyRefineCount: number } = ZERO_REFINE,
): ContentPipelineOutcome {
  return { ...body, ...refine };
}

function fakeStore(
  overrides: {
    outline?: PageOutline | null;
    pipeline?: ContentPipelineState;
  } = {},
): jest.Mocked<ContentResultStore> {
  return {
    replaceOutline: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceOutline')),
    replaceDocument: jest
      .fn()
      .mockRejectedValue(new Error('unexpected replaceDocument')),
    getDocument: jest
      .fn()
      .mockRejectedValue(new Error('unexpected getDocument')),
    getOutline: jest.fn().mockResolvedValue(overrides.outline ?? null),
    getPipelineState: jest.fn().mockResolvedValue(
      overrides.pipeline ?? {
        phase: null,
        outlineRefineCount: 0,
        copyRefineCount: 0,
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
    | ContentPipelineOutcome
    | Error
    | (() => Promise<ContentPipelineOutcome>),
): Pick<ContentPipelineFacade, 'invokePhase'> {
  const invokePhase = jest.fn(async (): Promise<ContentPipelineOutcome> => {
    if (typeof result === 'function') return result();
    if (result instanceof Error) throw result;
    return result;
  });
  return { invokePhase };
}

function makeExecutor(args: {
  facade: Pick<ContentPipelineFacade, 'invokePhase'>;
  lifecycle: RunLifecyclePort;
  store: ContentResultStore;
}): ContentRunExecutor {
  return new ContentRunExecutor(args.facade, args.lifecycle, args.store);
}

describe('ContentRunExecutor', () => {
  describe('phase resolution', () => {
    it('invokes copy for page_copy and completes with pageDocument summary', async () => {
      const run = makeContentRun({ taskType: 'page_copy' });
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline: null,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(1, run.id, {
        phase: 'copy',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(store.savePipelineState).toHaveBeenNthCalledWith(2, run.id, {
        phase: 'copy',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'copy', {
        outline: null,
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'pageDocument',
      });
    });

    it('invokes copy for page_copy even when stored phase is outline', async () => {
      const run = makeContentRun({ taskType: 'page_copy' });
      const store = fakeStore({
        pipeline: {
          phase: 'outline',
          outlineRefineCount: 1,
          copyRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome(
          {
            kind: 'completed',
            outline: null,
            document,
          },
          { outlineRefineCount: 1, copyRefineCount: 0 },
        ),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(1, run.id, {
        phase: 'copy',
        outlineRefineCount: 1,
        copyRefineCount: 0,
      });
      expect(store.savePipelineState).toHaveBeenNthCalledWith(2, run.id, {
        phase: 'copy',
        outlineRefineCount: 1,
        copyRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(
        run,
        'copy',
        expect.objectContaining({
          outlineRefineCount: 1,
          copyRefineCount: 0,
        }),
      );
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'pageDocument',
      });
    });

    it('invokes copy after HITL when then_copy has selectedIdeaIds matching outline.id', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: ['outl_1'],
      });
      const store = fakeStore({
        outline,
        pipeline: {
          phase: 'outline',
          outlineRefineCount: 0,
          copyRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'copy', {
        outline,
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'completed', {
        resultSummary: 'pageDocument',
      });
    });

    it('fails HITL_INVALID_SELECTION when then_copy stored phase is copy without [outline.id]', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: null,
      });
      const store = fakeStore({
        pipeline: {
          phase: 'copy',
          outlineRefineCount: 0,
          copyRefineCount: 2,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline: null,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.savePipelineState).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'HITL_INVALID_SELECTION',
        failedMessage: 'selectedIdeaIds must be exactly [outline.id]',
      });
    });

    it('uses stored outline phase when then_copy does not force copy', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: null,
      });
      const store = fakeStore({
        pipeline: {
          phase: 'outline',
          outlineRefineCount: 1,
          copyRefineCount: 0,
        },
      });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome(
          {
            kind: 'awaiting_hitl',
            outline,
          },
          { outlineRefineCount: 1, copyRefineCount: 0 },
        ),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(1, run.id, {
        phase: 'outline',
        outlineRefineCount: 1,
        copyRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'outline', {
        outline: null,
        outlineRefineCount: 1,
        copyRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
    });

    it('invokes outline for then_copy without stored phase or selection', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: null,
      });
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'awaiting_hitl',
          outline,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(1, run.id, {
        phase: 'outline',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(store.savePipelineState).toHaveBeenNthCalledWith(2, run.id, {
        phase: 'outline',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'outline', {
        outline: null,
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
    });
  });

  describe('HITL', () => {
    it('pauses on stored outline without selection and skips the facade (recovery)', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ outline });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline,
          document: null,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.savePipelineState).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
    });

    it('treats an empty selectedIdeaIds list as no selection', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: [],
      });
      const store = fakeStore({ outline });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline,
          document: null,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
    });

    it('fails HITL_INVALID_SELECTION when then_copy selection is not [outline.id]', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: ['wrong'],
      });
      const store = fakeStore({ outline });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.savePipelineState).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'HITL_INVALID_SELECTION',
        failedMessage: 'selectedIdeaIds must be exactly [outline.id]',
      });
    });

    it('awaits HITL from the facade after generating an outline', async () => {
      const run = makeContentRun({
        taskType: 'page_outline_then_copy',
        selectedIdeaIds: null,
      });
      const store = fakeStore({ outline: null });
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome(
          {
            kind: 'awaiting_hitl',
            outline,
          },
          { outlineRefineCount: 1, copyRefineCount: 0 },
        ),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(1, run.id, {
        phase: 'outline',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(store.savePipelineState).toHaveBeenNthCalledWith(2, run.id, {
        phase: 'outline',
        outlineRefineCount: 1,
        copyRefineCount: 0,
      });
      expect(facade.invokePhase).toHaveBeenCalledWith(run, 'outline', {
        outline: null,
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
    });
  });

  describe('failed outcomes', () => {
    it('transitions failed when the facade returns a failed outcome', async () => {
      const run = makeContentRun();
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome(
          {
            kind: 'failed',
            code: 'VERIFIER_FAILED',
            message: 'off-brand CTA',
          },
          { outlineRefineCount: 0, copyRefineCount: 2 },
        ),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(store.savePipelineState).toHaveBeenNthCalledWith(2, run.id, {
        phase: 'copy',
        outlineRefineCount: 0,
        copyRefineCount: 2,
      });
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
      const run = makeContentRun();
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
      expect(store.savePipelineState).toHaveBeenCalledTimes(1);
      expect(store.savePipelineState).toHaveBeenCalledWith(run.id, {
        phase: 'copy',
        outlineRefineCount: 0,
        copyRefineCount: 0,
      });
    });

    it('maps LlmGatewayError to gatewayCode', async () => {
      const run = makeContentRun();
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
      const run = makeContentRun();
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
      const run = makeContentRun();
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
      const run = makeContentRun();
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
      const run = makeContentRun();
      const store = fakeStore();
      store.getOutline.mockRejectedValue(new Error('db down'));
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline: null,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await expect(executor.execute(run)).rejects.toThrow('db down');
      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(lifecycle.transition).not.toHaveBeenCalled();
    });

    it('transitions failed CONTENT_KIND_REQUIRED when page run has null contentKind', async () => {
      const run = {
        ...makeContentRun({ taskType: 'page_copy' }),
        // persistence garbage: page taskType without contentKind (unia KROK 2b tego nie modeluje)
        contentKind: null as unknown as ContentRunRecord['contentKind'],
      };
      const store = fakeStore();
      const lifecycle = fakeLifecycle();
      const facade = fakeFacade(
        pipelineOutcome({
          kind: 'completed',
          outline: null,
          document,
        }),
      );
      const executor = makeExecutor({ facade, lifecycle, store });

      await executor.execute(run);

      expect(facade.invokePhase).not.toHaveBeenCalled();
      expect(store.getOutline).not.toHaveBeenCalled();
      expect(lifecycle.transition).toHaveBeenCalledWith(run, 'failed', {
        failedCode: 'CONTENT_KIND_REQUIRED',
        failedMessage: 'contentKind is required for page tasks',
      });
    });
  });

  it('throws when taskType is not content and does not invoke the facade', async () => {
    const facade = fakeFacade(
      pipelineOutcome({
        kind: 'completed',
        outline: null,
        document,
      }),
    );
    const executor = makeExecutor({
      facade,
      lifecycle: fakeLifecycle(),
      store: fakeStore(),
    });
    await expect(
      executor.execute(makeSocialRun({ taskType: 'post_ideas' })),
    ).rejects.toThrow(/non-content taskType/);
    expect(facade.invokePhase).not.toHaveBeenCalled();
  });
});
