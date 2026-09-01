import type { SocialGraphState } from '../infrastructure/graph/state';
import type { ReelIdea } from '../domain/social.types';
import { toOutcome } from './social-pipeline.facade';

const ideas = [{ id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' }];

const reelIdeas: ReelIdea[] = [
  {
    id: 'idea_r1',
    title: 'R1',
    description: 'D1',
    hook: 'H1',
    durationSeconds: 15,
  },
];

function makeFinal(
  overrides: Partial<
    Pick<
      SocialGraphState,
      | 'failedCode'
      | 'failedMessage'
      | 'verdict'
      | 'ideas'
      | 'content'
      | 'reelIdeas'
      | 'reelScript'
    >
  > = {},
) {
  return {
    failedCode: null,
    failedMessage: null,
    verdict: null,
    ideas,
    content: null,
    reelIdeas: [] as ReelIdea[],
    reelScript: null,
    ...overrides,
  };
}

describe('toOutcome', () => {
  it('returns awaiting_hitl for ideas phase of post_ideas_then_content', () => {
    expect(
      toOutcome({ taskType: 'post_ideas_then_content' }, 'ideas', makeFinal()),
    ).toEqual({ kind: 'awaiting_hitl', ideas, reelIdeas: [] });
  });

  it('returns completed for post_ideas without HITL', () => {
    expect(toOutcome({ taskType: 'post_ideas' }, 'ideas', makeFinal())).toEqual({
      kind: 'completed',
      ideas,
      content: null,
      reelIdeas: [],
      reelScript: null,
    });
  });

  it('returns completed for content phase after HITL', () => {
    const content = { body: 'Post', hashtags: ['#acme'], cta: 'CTA' };
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'content',
        makeFinal({ content }),
      ),
    ).toEqual({
      kind: 'completed',
      ideas,
      content,
      reelIdeas: [],
      reelScript: null,
    });
  });

  it('returns awaiting_hitl for ideas phase of reel_ideas_then_scripts', () => {
    expect(
      toOutcome(
        { taskType: 'reel_ideas_then_scripts' },
        'ideas',
        makeFinal({ reelIdeas }),
      ),
    ).toEqual({ kind: 'awaiting_hitl', ideas: [], reelIdeas });
  });

  it('returns completed for reel_ideas without HITL', () => {
    expect(
      toOutcome(
        { taskType: 'reel_ideas' },
        'ideas',
        makeFinal({ reelIdeas }),
      ),
    ).toEqual({
      kind: 'completed',
      ideas,
      content: null,
      reelIdeas,
      reelScript: null,
    });
  });

  it('returns failed when graph set failedCode, even if HITL would apply', () => {
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'ideas',
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
    });
  });
});
