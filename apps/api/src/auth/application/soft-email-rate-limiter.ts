/**
 * Soft in-memory limiter (process-local). Over limit → caller no-ops mail
 * but still returns the same success HTTP (A-13).
 */
export class SoftEmailRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly maxHits: number,
    private readonly windowMs: number,
  ) {}

  tryConsume(key: string, now = Date.now()): boolean {
    const normalized = key.trim().toLowerCase();
    const windowStart = now - this.windowMs;
    const prev = this.hits.get(normalized) ?? [];
    const recent = prev.filter((t) => t > windowStart);
    if (recent.length >= this.maxHits) {
      this.hits.set(normalized, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(normalized, recent);
    return true;
  }
}
