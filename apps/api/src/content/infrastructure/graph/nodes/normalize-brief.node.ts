import type { ContentGraphState } from '../state';

export function createNormalizeBriefNode() {
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const topic = state.brief.topic.trim();
    return {
      brief: {
        ...state.brief,
        topic,
        ...(state.brief.angle !== undefined
          ? { angle: state.brief.angle.trim() }
          : {}),
      },
    };
  };
}
