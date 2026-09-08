import type { SocialGraphState } from '../state';

export function createNormalizeBriefNode() {
  return (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const topic = state.brief.topic.trim();
    const ideaCount = state.brief.ideaCount ?? 5;
    return Promise.resolve({
      brief: {
        ...state.brief,
        topic,
        ideaCount,
      },
    });
  };
}
