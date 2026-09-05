import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { ContentResultStore } from '../../../domain/content-result.port';
import type { PageOutline } from '../../../domain/content.types';
import type { ContentGraphState } from '../state';
import { createPersistOutlineNode } from './persist-outline.node';

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

describe('createPersistOutlineNode', () => {
  it('replaces outline and does not call replaceDocument', async () => {
    const outline: PageOutline = {
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
    const store = fakeStore();
    const state = makeState({
      outline,
      outlineRefineCount: 1,
      copyRefineCount: 0,
    });

    await createPersistOutlineNode(store)(state);

    expect(store.replaceOutline).toHaveBeenCalledTimes(1);
    expect(store.replaceOutline).toHaveBeenCalledWith(state.runId, outline);
    expect(store.replaceDocument).not.toHaveBeenCalled();
    expect(store.savePipelineState).toHaveBeenCalledWith(state.runId, {
      phase: 'outline',
      outlineRefineCount: 1,
      copyRefineCount: 0,
    });
  });

  it('throws when outline is missing', async () => {
    const store = fakeStore();

    await expect(createPersistOutlineNode(store)(makeState())).rejects.toThrow(
      'Outline is required before persist.',
    );
    expect(store.replaceOutline).not.toHaveBeenCalled();
    expect(store.savePipelineState).not.toHaveBeenCalled();
  });

  it('propagates store failures', async () => {
    const store = fakeStore();
    store.replaceOutline.mockRejectedValue(new Error('db down'));
    const outline: PageOutline = {
      id: 'outl_1',
      title: 'Audyt w 10 dni',
      sections: [
        { id: 'osec_1', heading: 'Problem', summary: 'Chaos ops po seedzie.' },
      ],
    };

    await expect(
      createPersistOutlineNode(store)(makeState({ outline })),
    ).rejects.toThrow('db down');
    expect(store.savePipelineState).not.toHaveBeenCalled();
  });
});
