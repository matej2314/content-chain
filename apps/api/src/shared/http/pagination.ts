import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  type PageSize,
  type PaginatedList,
} from '@content-chain/shared';

export type PaginationMode =
  { mode: 'all' } | { mode: 'page'; page: number; pageSize: PageSize };

export type PaginationQueryFields = {
  page?: number;
  pageSize?: number;
};

export function resolvePaginationMode(
  query: PaginationQueryFields,
): PaginationMode {
  if (query.page === undefined && query.pageSize === undefined) {
    return { mode: 'all' };
  }
  return {
    mode: 'page',
    page: query.page ?? DEFAULT_PAGE,
    pageSize: (query.pageSize ?? DEFAULT_PAGE_SIZE) as PageSize,
  };
}

export function paginationMeta(
  mode: PaginationMode,
  total: number,
): Pick<PaginatedList<unknown>, 'page' | 'pageSize' | 'total'> {
  if (mode.mode === 'all') {
    return { page: DEFAULT_PAGE, pageSize: total, total };
  }
  return { page: mode.page, pageSize: mode.pageSize, total };
}

interface PrismaPageArgsOutput {
  skip?: number;
  take?: number;
}

export function prismaPageArgs(mode: PaginationMode): PrismaPageArgsOutput {
  if (mode.mode === 'all') {
    return {};
  }
  return {
    skip: (mode.page - 1) * mode.pageSize,
    take: mode.pageSize,
  };
}
