import type { ReelScript, ReelScriptSegment } from '../../domain/social.types';

function mapStoredReelScriptSegment(item: unknown): ReelScriptSegment {
  if (typeof item !== 'object' || item === null || Array.isArray(item)) {
    throw new Error('Invalid ReelScript.segments item');
  }
  const segment = item as Record<string, unknown>;
  if (
    typeof segment.startSeconds !== 'number' ||
    typeof segment.endSeconds !== 'number' ||
    typeof segment.onScreen !== 'string' ||
    typeof segment.voiceover !== 'string'
  ) {
    throw new Error('Invalid ReelScript.segments item');
  }
  return {
    startSeconds: segment.startSeconds,
    endSeconds: segment.endSeconds,
    onScreen: segment.onScreen,
    voiceover: segment.voiceover,
  };
}

export function mapStoredReelScript(payload: unknown): ReelScript {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error('Invalid ReelScript payload');
  }
  const record = payload as Record<string, unknown>;
  if (!Array.isArray(record.segments)) {
    throw new Error('Invalid ReelScript.segments');
  }
  const cta = record.cta;
  if (typeof cta !== 'string') {
    throw new Error('Invalid ReelScript.cta');
  }
  const notes = typeof record.notes === 'string' ? record.notes : undefined;
  const sourceIdeaId =
    typeof record.sourceIdeaId === 'string' && record.sourceIdeaId.length > 0
      ? record.sourceIdeaId
      : undefined;
  return {
    segments: record.segments.map(mapStoredReelScriptSegment),
    cta,
    ...(notes !== undefined ? { notes } : {}),
    ...(sourceIdeaId !== undefined ? { sourceIdeaId } : {}),
  };
}
