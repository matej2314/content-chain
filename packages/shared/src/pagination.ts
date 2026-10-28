export const PAGE_SIZES = [10, 15, 25, 50] as const;

export type PageSize = (typeof PAGE_SIZES)[number];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export function isPageSize(value: unknown): value is PageSize {
  return typeof value === 'number' && (PAGE_SIZES as readonly number[]).includes(value);
}

export type PaginatedList<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
