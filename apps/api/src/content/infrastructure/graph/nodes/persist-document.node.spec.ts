import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { ContentResultStore } from '../../../domain/content-result.port';
import type { PageDocument, VerifierVerdict } from '../../../domain/content.types';
import type { ContentGraphState } from '../state';
import { createPersistDocumentNode } from './persist-document.node';

function makeState(
  overrides: Partial<ContentGraphState> = {},
): ContentGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'page_copy',
    contentKind: 'blog',
    language: 'pl',
    brief: { topic: 'Audyt procesów' },
    selectedIdeaIds: ['outl_1'],
    phase: 'copy',
    company: emptyCompanyContext(),
    outline: {
      id: 'outl_1',
      title: 'Audyt w 10 dni',
      sections: [
        { id: 'osec_1', heading: 'Problem', summary: 'Chaos ops po seedzie.' },
      ],
    },
    document: {
      title: 'placeholder',
      lead: 'placeholder',
      body: 'placeholder',
    },
    verdict: { ok: true, contextIssues: [], languageIssues: [] },
    outlineRefineCount: 0,
    copyRefineCount: 0,
    failedCode: null,
    failedMessage: null,
    ...overrides,
  };
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

describe('createPersistDocumentNode', () => {
  it('replaces document and verdict for the run and does not call replaceOutline', async () => {
    const document: PageDocument = {
      title: 'Audyt procesów',
      lead: 'Founderzy odzyskują czas.',
      body: 'Pełny tekst strony na bazie briefu i kontekstu.',
    };
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    const store = fakeStore();
    const state = makeState({ document, verdict, copyRefineCount: 2 });

    const out = await createPersistDocumentNode(store)(state);

    expect(store.replaceDocument).toHaveBeenCalledTimes(1);
    expect(store.replaceDocument).toHaveBeenCalledWith(
      state.runId,
      document,
      verdict,
    );
    expect(store.replaceOutline).not.toHaveBeenCalled();
    expect(store.savePipelineState).toHaveBeenCalledWith(state.runId, {
      phase: 'copy',
      outlineRefineCount: 0,
      copyRefineCount: 2,
    });
    expect(out).toEqual({});
  });

  it('throws when document or verdict is missing', async () => {
    const store = fakeStore();

    await expect(
      createPersistDocumentNode(store)(makeState({ document: null })),
    ).rejects.toThrow('Document and verdict are required before persist.');
    await expect(
      createPersistDocumentNode(store)(makeState({ verdict: null })),
    ).rejects.toThrow('Document and verdict are required before persist.');
    expect(store.replaceDocument).not.toHaveBeenCalled();
    expect(store.savePipelineState).not.toHaveBeenCalled();
  });

  it('propagates store failures', async () => {
    const store = fakeStore();
    store.replaceDocument.mockRejectedValue(new Error('db down'));

    await expect(
      createPersistDocumentNode(store)(makeState()),
    ).rejects.toThrow('db down');
    expect(store.savePipelineState).not.toHaveBeenCalled();
  });
});
