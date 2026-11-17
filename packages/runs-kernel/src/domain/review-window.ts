export function isReviewWindowOpen(
  pipelineFinishedAt: Date | null,
  reviewFinalizedAt: Date | null,
  now: Date,
  reviewTtlMs: number,
): boolean {
  if (reviewFinalizedAt !== null) return false;
  if (pipelineFinishedAt === null) return false;
  return now.getTime() < pipelineFinishedAt.getTime() + reviewTtlMs;
}

export function computeReviewExpiresAt(
  pipelineFinishedAt: Date | null,
  reviewFinalizedAt: Date | null,
  reviewTtlMs: number,
): string | null {
  if (pipelineFinishedAt === null || reviewFinalizedAt !== null) return null;
  return new Date(pipelineFinishedAt.getTime() + reviewTtlMs).toISOString();
}
