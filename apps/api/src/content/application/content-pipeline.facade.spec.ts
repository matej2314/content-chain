import type { CompanyContextRepository } from '../../company-context/domain/company-context.port';
import type { RunLifecyclePort } from '../../runs/domain/run-lifecycle.port';
import type { RunRecord } from '../../runs/domain/run.types';
import {
  makeContentRun,
  makeSocialRun,
} from '../../runs/run-record.test-helpers';
import type { ContentResultStore } from '../domain/content-result.port';
import type { PageDocument, PageOutline } from '../domain/content.types';
import type { ContentGraphState } from '../infrastructure/graph/state';
import { LlmHopService } from '../../shared/llm/llm-hop';
import { compileContentGraph } from '../infrastructure/graph/content.graph';
import { ContentPipelineFacade, toOutcome } from './content-pipeline.facade';

jest.mock('../infrastructure/graph/content.graph', () => ({
  compileContentGraph: jest.fn(),
}));

const compileContentGraphMock = jest.mocked(compileContentGraph);

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

function makeFinal(
  overrides: Partial<
    Pick<
      ContentGraphState,
      | 'failedCode'
      | 'failedMessage'
      | 'verdict'
      | 'outline'
      | 'document'
      | 'outlineRefineCount'
      | 'copyRefineCount'
    >
  > = {},
) {
  return {
    failedCode: null,
    failedMessage: null,
    verdict: null,
    outline,
    document: null as PageDocument | null,
    outlineRefineCount: 0,
    copyRefineCount: 0,
    ...overrides,
  };
}

function unusedContext(): CompanyContextRepository {
  const unexpected = async () => {
    throw new Error('unexpected context call');
  };
  return { get: unexpected, put: unexpected, patch: unexpected };
}

function unusedStore(): ContentResultStore {
  const unexpected = async () => {
    throw new Error('unexpected store call');
  };
  return {
    replaceOutline: unexpected,
    replaceDocument: unexpected,
    getOutline: unexpected,
    getDocument: unexpected,
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
    (input: ContentGraphState) => Promise<ContentGraphState>
  >,
) {
  compileContentGraphMock.mockReturnValue({ invoke });
  return new ContentPipelineFacade(
    unusedContext(),
    unusedStore(),
    unusedHop(),
    unusedLifecycle(),
  );
}

describe('toOutcome', () => {
  it('returns awaiting_hitl for outline phase of page_outline_then_copy', () => {
    expect(
      toOutcome(
        { taskType: 'page_outline_then_copy' },
        'outline',
        makeFinal(),
      ),
    ).toEqual({
      kind: 'awaiting_hitl',
      outline,
      outlineRefineCount: 0,
      copyRefineCount: 0,
    });
  });

  it('returns completed for page_copy without HITL', () => {
    expect(
      toOutcome(
        { taskType: 'page_copy' },
        'copy',
        makeFinal({ document }),
      ),
    ).toEqual({
      kind: 'completed',
      outline,
      document,
      outlineRefineCount: 0,
      copyRefineCount: 0,
    });
  });

  it('returns completed for copy phase after HITL', () => {
    expect(
      toOutcome(
        { taskType: 'page_outline_then_copy' },
        'copy',
        makeFinal({ document }),
      ),
    ).toEqual({
      kind: 'completed',
      outline,
      document,
      outlineRefineCount: 0,
      copyRefineCount: 0,
    });
  });

  it('returns failed when graph set failedCode, even if HITL would apply', () => {
    expect(
      toOutcome(
        { taskType: 'page_outline_then_copy' },
        'outline',
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
      outlineRefineCount: 0,
      copyRefineCount: 0,
    });
  });

  it('throws when HITL would apply but outline is missing', () => {
    expect(() =>
      toOutcome(
        { taskType: 'page_outline_then_copy' },
        'outline',
        makeFinal({ outline: null }),
      ),
    ).toThrow('Outline is required before awaiting HITL.');
  });
});

describe('ContentPipelineFacade.invokePhase', () => {
  afterEach(() => {
    compileContentGraphMock.mockReset();
  });

  it('rejects a non-content task type before invoking the graph', async () => {
    const invoke = jest.fn();
    const facade = makeFacade(invoke);
    const run = makeSocialRun({ taskType: 'post_ideas' });

    await expect(
      facade.invokePhase(run, 'outline', {
        outline: null,
        outlineRefineCount: 0,
        copyRefineCount: 0,
      }),
    ).rejects.toThrow(
      'ContentPipelineFacade received non-content taskType: post_ideas',
    );
    expect(invoke).not.toHaveBeenCalled();
  });

  it('invokes the graph with run fields, extras, and contentKind', async () => {
    const run = makeContentRun({
      taskType: 'page_outline_then_copy',
      contentKind: 'landing',
      language: 'en',
      brief: { topic: 'Launch', angle: 'speed' },
      selectedIdeaIds: ['outl_1'],
    });
    const graphState: ContentGraphState = {
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'page_outline_then_copy',
      contentKind: 'landing',
      language: 'en',
      brief: run.brief,
      selectedIdeaIds: ['outl_1'],
      phase: 'copy',
      company: null,
      outline,
      document,
      verdict: null,
      outlineRefineCount: 1,
      copyRefineCount: 2,
      failedCode: null,
      failedMessage: null,
    };
    const invoke = jest.fn().mockResolvedValue(graphState);
    const facade = makeFacade(invoke);

    const outcome = await facade.invokePhase(run, 'copy', {
      outline,
      outlineRefineCount: 1,
      copyRefineCount: 2,
    });

    expect(invoke).toHaveBeenCalledWith({
      runId: run.id,
      conversationId: run.conversationId,
      taskType: 'page_outline_then_copy',
      contentKind: 'landing',
      language: 'en',
      brief: run.brief,
      selectedIdeaIds: ['outl_1'],
      phase: 'copy',
      company: null,
      outline,
      document: null,
      verdict: null,
      outlineRefineCount: 1,
      copyRefineCount: 2,
      failedCode: null,
      failedMessage: null,
    });
    expect(outcome).toEqual({
      kind: 'completed',
      outline,
      document,
      outlineRefineCount: 1,
      copyRefineCount: 2,
    });
  });

  it('passes ContentBrief after isContentTaskType without ideaCount default', async () => {
    const run: RunRecord = makeContentRun({
      taskType: 'page_copy',
      brief: { topic: 'Audyt', goal: 'lead' },
    });
    const invoke = jest.fn().mockResolvedValue(
      makeFinal({
        document,
      }),
    );
    const facade = makeFacade(invoke);

    await facade.invokePhase(run, 'copy', {
      outline: null,
      outlineRefineCount: 0,
      copyRefineCount: 0,
    });

    expect(invoke).toHaveBeenCalledWith(
      expect.objectContaining({
        brief: { topic: 'Audyt', goal: 'lead' },
        contentKind: 'blog',
        taskType: 'page_copy',
      }),
    );
    expect(invoke.mock.calls[0]?.[0].brief).not.toHaveProperty('ideaCount');
  });
});
