import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import { pageDocumentOutputSchema } from '../../../application/content.schemas';
import type { PageOutline } from '../../../domain/content.types';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import { createPageWriterNode } from './page-writer.node';

const REQUEST_ID = createRequestId(
  'req_123e4567-e89b-12d3-a456-426614174000',
);

const EMPTY_OUTLINE_INSTRUCTION =
  'brak outline — pisz z ContentBrief (topic / angle / goal / targetLength)';

const SAMPLE_OUTLINE: PageOutline = {
  id: 'outl_1',
  title: 'Audyt w 10 dni',
  sections: [
    {
      id: 'osec_1',
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'pain',
    },
  ],
};

const DOCUMENT_DATA = {
  title: 'Audyt procesów',
  lead: 'Founderzy odzyskują czas.',
  body: 'Pełny tekst strony na bazie briefu i kontekstu.',
};

function makeState(
  overrides: Partial<ContentGraphState> = {},
): ContentGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'page_copy',
    contentKind: 'blog',
    language: 'pl',
    brief: { topic: 'Audyt procesów', goal: 'lead' },
    selectedIdeaIds: null,
    phase: 'copy',
    company: emptyCompanyContext(),
    outline: null,
    document: null,
    verdict: { ok: true, contextIssues: [], languageIssues: [] },
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

describe('createPageWriterNode', () => {
  it('maps hop output to document and calls PageWriterAgent', async () => {
    const hop = fakeHop({ data: DOCUMENT_DATA });
    const state = makeState({ outline: SAMPLE_OUTLINE });

    const out = await createPageWriterNode(hop)(state);

    expect(out).toEqual({
      document: {
        title: DOCUMENT_DATA.title,
        lead: DOCUMENT_DATA.lead,
        body: DOCUMENT_DATA.body,
      },
    });
    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'PageWriterAgent',
      schema: pageDocumentOutputSchema,
      userContent: expect.stringContaining(JSON.stringify(SAMPLE_OUTLINE)),
    });
  });

  it('includes optional meta fields when the model returns them', async () => {
    const hop = fakeHop({
      data: {
        ...DOCUMENT_DATA,
        metaTitle: 'Audyt procesów Acme',
        metaDescription: 'Przegląd ops w 10 dni.',
      },
    });

    const out = await createPageWriterNode(hop)(makeState());

    expect(out.document).toEqual({
      ...DOCUMENT_DATA,
      metaTitle: 'Audyt procesów Acme',
      metaDescription: 'Przegląd ops w 10 dni.',
    });
  });

  it('injects the empty-outline instruction when state.outline is null', async () => {
    const hop = fakeHop({ data: DOCUMENT_DATA });

    await createPageWriterNode(hop)(makeState({ outline: null }));

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(EMPTY_OUTLINE_INSTRUCTION);
    expect(userContent).toContain('(ścieżka content: page_copy)');
    expect(userContent).not.toContain(JSON.stringify(SAMPLE_OUTLINE));
  });

  it('passes JSON outline when state.outline is present', async () => {
    const hop = fakeHop({ data: DOCUMENT_DATA });

    await createPageWriterNode(hop)(makeState({ outline: SAMPLE_OUTLINE }));

    const userContent = hopUserContent(hop);
    expect(userContent).toContain(JSON.stringify(SAMPLE_OUTLINE));
    expect(userContent).not.toContain(EMPTY_OUTLINE_INSTRUCTION);
  });

  it('renders language, contentKind and ContentBrief without ideaCount', async () => {
    const hop = fakeHop({ data: DOCUMENT_DATA });
    const brief = {
      topic: 'Audyt procesów',
      angle: 'czas founderów',
      goal: 'lead',
      targetLength: 800,
    };
    const state = makeState({
      language: 'en',
      contentKind: 'landing',
      brief,
    });

    await createPageWriterNode(hop)(state);

    const userContent = hopUserContent(hop);
    expect(userContent).toContain('Język: en.');
    expect(userContent).toContain('Rodzaj strony: landing.');
    expect(userContent).toContain(JSON.stringify(brief));
    expect(userContent).not.toMatch(/"ideaCount"/);
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
      createPageWriterNode(hop)(makeState({ outline: SAMPLE_OUTLINE })),
    ).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });
});
