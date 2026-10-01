'use client';

import { useEffect, useState } from 'react';

export function useReviewExpiryTick(reviewExpiresAt: string | null): number {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (reviewExpiresAt === null) return;

    const expiresMs = Date.parse(reviewExpiresAt);
    if (Number.isNaN(expiresMs)) return;

    const delay = Math.max(0, expiresMs - Date.now());
    const id = window.setTimeout(() => {
      setNowMs(Date.now());
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [reviewExpiresAt]);

  return nowMs;
}
