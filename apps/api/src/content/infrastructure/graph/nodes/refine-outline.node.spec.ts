import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import { pageOutlineOutputSchema } from '../../../application/content.schemas';
import type { ContentResultStore } from '../../../domain/content-result.port';
import type { PageOutline } from '../../../domain/content.types';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import { createRefineOutlineNode } from './refine-outline.node';

const EXISTING_OUTLINE: PageOutline = {
  id: 'outl_keep-me',
  title: 'Audyt w 10 dni',
  sections: [
    {
      id: 'osec_keep-me',
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'pain',
    },
  ],
};

function makeState(
  overrides: Partial<ContentGraphState> = {},
): ContentGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'page_outline_then_copy',
    contentKind: 'blog',
    language: 'pl',
    brief: { topic: 'Audyt procesów' },
    selectedIdeaIds: null,
    phase: 'outline',
    company: emptyCompanyContext(),
    outline: EXISTING_OUTLINE,
    document: null,
    verdict: {
      ok: false,
      contextIssues: ['CTA poza katalogiem'],
      languageIssues: [],
    },
    outlineRefineCount: 0,
    copyRefineCount: 0,
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

function fakeStore(): jest.Mocked<ContentResultStore> {
  return {
    replaceOutline: jest.fn().mockResolvedValue(undefined),
    replaceDocument: jest.fn().mockResolvedValue(undefined),
    getOutline: jest.fn().mockResolvedValue(null),
    getDocument: jest.fn().mockResolvedValue(null),
    savePipelineState: jest.fn().mockResolvedValue(undefined),
    getPipelineState: jest.fn().mockResolvedValue({
      phase: null,
      outlineRefineCount: 0,
      copyRefineCount: 0,
    }),
  };
}

describe('createRefineOutlineNode', () => {
  it('keeps outline and section ids and maps optional role', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt bez obietnic',
        sections: [
          {
            heading: 'Problem',
            summary: 'Ops po seedzie zostaje w chaosie.',
            role: 'pain',
          },
        ],
      },
    });
    const store = fakeStore();
    const state = makeState();

    const out = await createRefineOutlineNode(hop, store)(state);

    expect(out.outline).toEqual({
      id: 'outl_keep-me',
      title: 'Audyt bez obietnic',
      sections: [
        {
          id: 'osec_keep-me',
          heading: 'Problem',
          summary: 'Ops po seedzie zostaje w chaosie.',
          role: 'pain',
        },
      ],
    });
    expect(out.outlineRefineCount).toBe(1);
    expect(store.savePipelineState).toHaveBeenCalledWith(state.runId, {
      phase: 'outline',
      outlineRefineCount: 1,
      copyRefineCount: 0,
    });
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineOutline',
      schema: pageOutlineOutputSchema,
      userContent: expect.stringContaining(JSON.stringify(EXISTING_OUTLINE)),
    });
  });

  it('preserves previous section role when the model omits it', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt w 10 dni',
        sections: [{ heading: 'Problem', summary: 'Chaos ops po seedzie.' }],
      },
    });

    const out = await createRefineOutlineNode(hop, fakeStore())(makeState());

    expect(out.outline?.sections[0]).toEqual({
      id: 'osec_keep-me',
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'pain',
    });
  });

  it('overrides previous section role when the model returns a different legal role', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt w 10 dni',
        sections: [
          {
            heading: 'Problem',
            summary: 'Chaos ops po seedzie.',
            role: 'insight',
          },
        ],
      },
    });

    const out = await createRefineOutlineNode(hop, fakeStore())(makeState());

    expect(out.outline?.sections[0]).toEqual({
      id: 'osec_keep-me',
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'insight',
    });
  });

  it('omits role when neither the model nor the previous section has one', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt w 10 dni',
        sections: [{ heading: 'Problem', summary: 'Chaos ops po seedzie.' }],
      },
    });
    const outline: PageOutline = {
      id: 'outl_keep-me',
      title: 'Audyt w 10 dni',
      sections: [
        {
          id: 'osec_keep-me',
          heading: 'Problem',
          summary: 'Starsze streszczenie.',
        },
      ],
    };

    const out = await createRefineOutlineNode(hop, fakeStore())(
      makeState({ outline }),
    );

    expect(out.outline?.sections[0]).toEqual({
      id: 'osec_keep-me',
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
    });
    expect(out.outline?.sections[0]).not.toHaveProperty('role');
  });

  it('propagates STRUCTURED_OUTPUT_INVALID from the hop', async () => {
    const hop = fakeHop(
      new DomainException(
        'STRUCTURED_OUTPUT_INVALID',
        'LLM output failed schema validation',
        500,
      ),
    );
    const store = fakeStore();

    await expect(
      createRefineOutlineNode(hop, store)(makeState()),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
    expect(store.savePipelineState).not.toHaveBeenCalled();
  });
});
