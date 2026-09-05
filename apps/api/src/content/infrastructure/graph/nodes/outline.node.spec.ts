import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import { pageOutlineOutputSchema } from '../../../application/content.schemas';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import { createOutlineNode } from './outline.node';

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
      requestId:
        result.requestId ??
        createRequestId('req_123e4567-e89b-12d3-a456-426614174000'),
    };
  });
  return { chatJson } as unknown as LlmHopService;
}

describe('createOutlineNode', () => {
  it('fills outl_ and osec_ ids when the model omits them', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt w 10 dni',
        sections: [{ heading: 'Problem', summary: 'Chaos ops po seedzie.' }],
      },
    });
    const out = await createOutlineNode(hop)(makeState());

    expect(out.outline?.id).toMatch(/^outl_[0-9a-f-]{36}$/i);
    expect(out.outline?.title).toBe('Audyt w 10 dni');
    expect(out.outline?.sections).toHaveLength(1);
    expect(out.outline?.sections[0]).toEqual({
      id: expect.stringMatching(/^osec_[0-9a-f-]{36}$/i),
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
    });
  });

  it('keeps a model-provided section id', async () => {
    const hop = fakeHop({
      data: {
        title: 'Tytuł',
        sections: [
          {
            id: 'osec_keep-me',
            heading: 'Oferta',
            summary: 'Audyt procesów Acme.',
          },
        ],
      },
    });

    const out = await createOutlineNode(hop)(makeState());

    expect(out.outline?.sections[0]?.id).toBe('osec_keep-me');
  });

  it('maps optional role when the model returns it', async () => {
    const hop = fakeHop({
      data: {
        title: 'Audyt w 10 dni',
        sections: [
          {
            heading: 'Problem',
            summary: 'Chaos ops po seedzie.',
            role: 'pain',
          },
          {
            heading: 'Oferta',
            summary: 'Audyt procesów Acme.',
          },
        ],
      },
    });

    const out = await createOutlineNode(hop)(makeState());

    expect(out.outline?.sections[0]).toEqual({
      id: expect.stringMatching(/^osec_[0-9a-f-]{36}$/i),
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'pain',
    });
    expect(out.outline?.sections[1]).toEqual({
      id: expect.stringMatching(/^osec_[0-9a-f-]{36}$/i),
      heading: 'Oferta',
      summary: 'Audyt procesów Acme.',
    });
    expect(out.outline?.sections[1]).not.toHaveProperty('role');
  });

  it('calls the hop as OutlineAgent with rendered prompt vars', async () => {
    const hop = fakeHop({
      data: {
        title: 'Tytuł',
        sections: [{ heading: 'H', summary: 'S' }],
      },
    });
    const company = {
      ...emptyCompanyContext(),
      identity: { name: 'Acme', description: 'B2B' },
    };
    const brief = { topic: 'Audyt procesów', angle: 'czas founderów' };
    const state = makeState({
      company,
      brief,
      language: 'en',
      contentKind: 'landing',
    });

    await createOutlineNode(hop)(state);

    expect(hop.chatJson).toHaveBeenCalledWith({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'OutlineAgent',
      schema: pageOutlineOutputSchema,
      userContent: expect.stringContaining('(ścieżka content: page_outline)'),
    });
    const { userContent } = (hop.chatJson as jest.Mock).mock.calls[0][0] as {
      userContent: string;
    };
    expect(userContent).toContain('Język: en.');
    expect(userContent).toContain('Rodzaj strony (contentKind): landing.');
    expect(userContent).toContain('"name":"Acme"');
    expect(userContent).toContain(JSON.stringify(brief));
  });

  it('propagates STRUCTURED_OUTPUT_INVALID from the hop', async () => {
    const hop = fakeHop(
      new DomainException(
        'STRUCTURED_OUTPUT_INVALID',
        'LLM output failed schema validation',
        500,
      ),
    );

    await expect(createOutlineNode(hop)(makeState())).rejects.toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });
});
