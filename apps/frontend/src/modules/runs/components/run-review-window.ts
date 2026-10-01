export type ReviewWindowFields = {
  readonly reviewFinalizedAt: string | null;
  readonly reviewExpiresAt: string | null;
};

export function isReviewExpired(
  reviewExpiresAt: string | null,
  nowMs: number = Date.now(),
): boolean {
  if (reviewExpiresAt === null) return false;
  const expiresMs = Date.parse(reviewExpiresAt);
  if (Number.isNaN(expiresMs)) return false;
  return nowMs >= expiresMs;
}

export function isReviewWindowOpen(
  fields: ReviewWindowFields,
  nowMs: number = Date.now(),
): boolean {
  return fields.reviewFinalizedAt === null && !isReviewExpired(fields.reviewExpiresAt, nowMs);
}
