import type { ContentGraphState } from '../state';

export function createNormalizeBriefNode() {
  return (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const topic = state.brief.topic.trim();
    return Promise.resolve({
      brief: {
        ...state.brief,
        topic,
        ...(state.brief.angle !== undefined
          ? { angle: state.brief.angle.trim() }
          : {}),
      },
    });
  };
}
