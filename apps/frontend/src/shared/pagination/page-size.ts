import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  isPageSize,
  type PageSize,
} from '@content-chain/shared';

export { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, isPageSize, type PageSize };

/** `totalPages` z envelope; pusta kolekcja → 1 (jak archiwum Runy). */
export function totalPagesFromMeta(total: number, pageSize: number): number {
  if (pageSize <= 0) return 1;
  return Math.max(1, Math.ceil(total / pageSize));
}
