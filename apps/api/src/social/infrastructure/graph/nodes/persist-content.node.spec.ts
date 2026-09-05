import { emptyCompanyContext } from '../../../../company-context/domain/company-context.types';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { SocialResultStore } from '../../../domain/social-result.port';
import type {
  SocialContent,
  VerifierVerdict,
  ReelScript,
} from '../../../domain/social.types';
import type { SocialGraphState } from '../state';
import { createPersistContentNode } from './persist-content.node';

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_content',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch' },
    selectedIdeaIds: ['idea_1'],
    phase: 'content',
    company: emptyCompanyContext(),
    ideas: [{ id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' }],
    content: { body: 'placeholder', hashtags: [], characterCount: 11 },
    reelIdeas: [],
    reelScript: null,
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
    clearContents: jest.fn().mockResolvedValue(undefined),
    appendContent: jest.fn().mockResolvedValue(undefined),
    listContents: jest.fn().mockResolvedValue([]),
    clearReelScripts: jest.fn().mockResolvedValue(undefined),
    appendReelScript: jest.fn().mockResolvedValue(undefined),
    listReelScripts: jest.fn().mockResolvedValue([]),
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

describe('createPersistContentNode', () => {
  it('replaces content and verdict for the run and returns no state patch', async () => {
    const content: SocialContent = {
      body: 'Gotowy post.',
      hashtags: ['#acme'],
      cta: 'Napisz do nas',
      characterCount: 999,
    };
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    const store = fakeStore();
    const state = makeState({ content, verdict });

    const out = await createPersistContentNode(store)(state);

    expect(store.replaceContent).toHaveBeenCalledTimes(1);
    expect(store.replaceContent).toHaveBeenCalledWith(
      state.runId,
      {
        ...content,
        characterCount: content.body.length,
      },
      verdict,
    );
    expect(store.replaceIdeas).not.toHaveBeenCalled();
    expect(store.replaceReelScript).not.toHaveBeenCalled();
    expect(store.appendContent).not.toHaveBeenCalled();
    expect(out).toEqual({});
  });

  it('appends two-stage content without calling replaceContent', async () => {
    const content: SocialContent = {
      body: 'Gotowy post.',
      hashtags: ['#acme'],
      cta: 'Napisz do nas',
      characterCount: 999,
      sourceIdeaId: 'idea_1',
    };
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    const store = fakeStore();
    const rows: SocialContent[] = [];
    store.appendContent.mockImplementation(async (_runId, item) => {
      rows.push(item);
    });
    const first = makeState({
      taskType: 'post_ideas_then_content',
      selectedIdeaIds: ['idea_1'],
      content,
      verdict,
    });
    const second = makeState({
      taskType: 'post_ideas_then_content',
      selectedIdeaIds: ['idea_2'],
      content: {
        ...content,
        body: 'Drugi post.',
        characterCount: 11,
        sourceIdeaId: 'idea_2',
      },
      verdict,
    });

    await createPersistContentNode(store)(first);
    await createPersistContentNode(store)(second);

    expect(store.appendContent).toHaveBeenCalledTimes(2);
    expect(store.replaceContent).not.toHaveBeenCalled();
    expect(rows).toHaveLength(2);
    expect(rows[0]?.characterCount).toBe(content.body.length);
    expect(rows[0]?.sourceIdeaId).toBe('idea_1');
    expect(rows[1]?.sourceIdeaId).toBe('idea_2');
    expect(rows[1]?.characterCount).toBe('Drugi post.'.length);
  });

  it('replaces reel script and does not call replaceContent', async () => {
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
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    const store = fakeStore();
    const state = makeState({
      taskType: 'reel_script',
      reelScript,
      verdict,
    });

    const out = await createPersistContentNode(store)(state);

    expect(store.replaceReelScript).toHaveBeenCalledTimes(1);
    expect(store.replaceReelScript).toHaveBeenCalledWith(
      state.runId,
      reelScript,
      verdict,
    );
    expect(store.replaceContent).not.toHaveBeenCalled();
    expect(store.appendReelScript).not.toHaveBeenCalled();
    expect(out).toEqual({});
  });

  it('appends two-stage reel script without calling replaceReelScript', async () => {
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
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    const store = fakeStore();
    const state = makeState({
      taskType: 'reel_ideas_then_scripts',
      selectedIdeaIds: ['idea_1'],
      reelScript,
      verdict,
    });

    await createPersistContentNode(store)(state);

    expect(store.appendReelScript).toHaveBeenCalledTimes(1);
    expect(store.appendReelScript).toHaveBeenCalledWith(
      state.runId,
      { ...reelScript, sourceIdeaId: 'idea_1' },
      verdict,
    );
    expect(store.replaceReelScript).not.toHaveBeenCalled();
    expect(store.replaceContent).not.toHaveBeenCalled();
  });

  it('throws when reelScript or verdict is missing', async () => {
    const store = fakeStore();

    await expect(
      createPersistContentNode(store)(
        makeState({ taskType: 'reel_script', reelScript: null }),
      ),
    ).rejects.toThrow('Reel script and verdict are required before persist.');
    expect(store.replaceReelScript).not.toHaveBeenCalled();
  });

  it('propagates store failures', async () => {
    const store = fakeStore();
    store.replaceContent.mockRejectedValue(new Error('db down'));

    await expect(createPersistContentNode(store)(makeState())).rejects.toThrow(
      'db down',
    );
  });
});
