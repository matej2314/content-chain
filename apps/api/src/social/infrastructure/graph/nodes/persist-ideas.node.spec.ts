import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { SocialResultStore } from '../../../domain/social-result.port';
import type { SocialIdea } from '../../../domain/social.types';
import type { SocialGraphState } from '../state';
import { createPersistIdeasNode } from './persist-ideas.node';

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch' },
    selectedIdeaIds: null,
    phase: 'ideas',
    company: emptyCompanyContext(),
    ideas: [],
    content: { body: 'placeholder', hashtags: [] },
    verdict: { ok: true, contextIssues: [], languageIssues: [] },
    ideasRefineCount: 0,
    contentRefineCount: 0,
    failedCode: null,
    failedMessage: null,
    ...overrides,
  };
}

function fakeStore(): jest.Mocked<SocialResultStore> {
  return {
    replaceIdeas: jest.fn().mockResolvedValue(undefined),
    replaceReelIdeas: jest.fn().mockResolvedValue(undefined),
    replaceReelScript: jest.fn().mockResolvedValue(undefined),
    replaceContent: jest.fn().mockResolvedValue(undefined),
    listIdeas: jest.fn().mockResolvedValue([]),
    listReelIdeas: jest.fn().mockResolvedValue([]),
    getContent: jest.fn().mockResolvedValue(null),
    getReelScript: jest.fn().mockResolvedValue(null),
    savePipelineState: jest.fn().mockResolvedValue(undefined),
    getPipelineState: jest.fn().mockResolvedValue({
      phase: null,
      ideasRefineCount: 0,
      contentRefineCount: 0,
    }),
  };
}

describe('createPersistIdeasNode', () => {
  it('replaces ideas for the run and returns no state patch', async () => {
    const ideas: SocialIdea[] = [
      { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
      { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
    ];
    const store = fakeStore();
    const state = makeState({ ideas });

    const out = await createPersistIdeasNode(store)(state);

    expect(store.replaceIdeas).toHaveBeenCalledTimes(1);
    expect(store.replaceIdeas).toHaveBeenCalledWith(state.runId, ideas);
    expect(store.replaceContent).not.toHaveBeenCalled();
    expect(out).toEqual({});
  });

  it('propagates store failures', async () => {
    const store = fakeStore();
    store.replaceIdeas.mockRejectedValue(new Error('db down'));

    await expect(
      createPersistIdeasNode(store)(makeState()),
    ).rejects.toThrow('db down');
  });
});
