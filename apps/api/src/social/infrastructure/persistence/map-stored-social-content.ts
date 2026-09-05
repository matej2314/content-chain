import type { SocialContent } from '../../domain/social.types';

export function mapStoredSocialContent(payload: unknown): SocialContent {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error('Invalid SocialContent payload');
  }
  const record = payload as Record<string, unknown>;
  const body = record.body;
  if (typeof body !== 'string') {
    throw new Error('Invalid SocialContent.body');
  }
  const hashtags = Array.isArray(record.hashtags)
    ? record.hashtags.filter((item): item is string => typeof item === 'string')
    : [];
  const cta = typeof record.cta === 'string' ? record.cta : undefined;
  const characterCount =
    typeof record.characterCount === 'number' &&
    Number.isFinite(record.characterCount) &&
    record.characterCount >= 0
      ? Math.trunc(record.characterCount)
      : body.length;
  const sourceIdeaId =
    typeof record.sourceIdeaId === 'string' && record.sourceIdeaId.length > 0
      ? record.sourceIdeaId
      : undefined;
  return {
    body,
    hashtags,
    ...(cta !== undefined ? { cta } : {}),
    characterCount,
    ...(sourceIdeaId !== undefined ? { sourceIdeaId } : {}),
  };
}
