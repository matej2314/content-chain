export function parseTtlMs(ttl: string): number {
  const unit = ttl.at(-1);
  const value = parseInt(ttl.slice(0, -1), 10);
  switch (unit) {
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return value * 1000;
  }
}

/** jsonwebtoken `expiresIn` as number = seconds. */
export function parseTtlSeconds(ttl: string): number {
  return Math.floor(parseTtlMs(ttl) / 1000);
}
