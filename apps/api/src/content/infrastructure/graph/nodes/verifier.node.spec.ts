import { createRequestId } from '@content-chain/shared';
import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { RunLifecyclePort } from '../../../../runs/domain/run-lifecycle.port';
import { verifierOutputSchema } from '../../../application/content.schemas';
import type { PageDocument, PageOutline } from '../../../domain/content.types';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { ContentGraphState } from '../state';
import { createVerifierNode } from './verifier.node';

const REQUEST_ID = createRequestId(
  'req_123e4567-e89b-12d3-a456-426614174000',
);

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
    outline,
    document,
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

  it('sends outline as payload when phase is outline', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const state = makeState({ phase: 'outline' });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (
      hop.chatJson as jest.MockedFunction<LlmHopService['chatJson']>
    ).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(state.outline));
    expect(userContent).not.toContain(state.document?.body);
  });

  it('sends document as payload when phase is copy', async () => {
    const hop = fakeHop({
      data: { ok: true, contextIssues: [], languageIssues: [] },
    });
    const state = makeState({ phase: 'copy' });

    await createVerifierNode(hop, fakeAppendLog())(state);

    const { userContent } = (
      hop.chatJson as jest.MockedFunction<LlmHopService['chatJson']>
    ).mock.calls[0][0];
    expect(userContent).toContain(JSON.stringify(state.document));
    expect(userContent).not.toContain(state.outline?.title);
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
