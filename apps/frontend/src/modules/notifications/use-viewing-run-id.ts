'use client';

import { usePathname } from 'next/navigation';
import type { RunId } from '@content-chain/shared';
import { viewingRunIdFromPathname } from '@/modules/notifications/product-toast';

export function useViewingRunId(): RunId | null {
  const pathname = usePathname();
  return viewingRunIdFromPathname(pathname);
}
