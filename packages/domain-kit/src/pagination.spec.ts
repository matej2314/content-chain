import {
  paginationMeta,
  prismaPageArgs,
  resolvePaginationMode,
} from './pagination';

describe('resolvePaginationMode', () => {
  it('returns all when both page and pageSize are absent', () => {
    expect(resolvePaginationMode({})).toEqual({ mode: 'all' });
  });

  it('defaults page=1 when only pageSize is set', () => {
    expect(resolvePaginationMode({ pageSize: 25 })).toEqual({
      mode: 'page',
      page: 1,
      pageSize: 25,
    });
  });

  it('defaults pageSize=10 when only page is set', () => {
    expect(resolvePaginationMode({ page: 2 })).toEqual({
      mode: 'page',
      page: 2,
      pageSize: 10,
    });
  });

  it('accepts pageSize=50 (allowlist max)', () => {
    expect(resolvePaginationMode({ page: 1, pageSize: 50 })).toEqual({
      mode: 'page',
      page: 1,
      pageSize: 50,
    });
  });
});

describe('paginationMeta', () => {
  it('sets pageSize=total in all mode including empty', () => {
    expect(paginationMeta({ mode: 'all' }, 0)).toEqual({
      page: 1,
      pageSize: 0,
      total: 0,
    });
    expect(paginationMeta({ mode: 'all' }, 12)).toEqual({
      page: 1,
      pageSize: 12,
      total: 12,
    });
  });

  it('echoes page mode args and total', () => {
    expect(paginationMeta({ mode: 'page', page: 2, pageSize: 15 }, 40)).toEqual(
      { page: 2, pageSize: 15, total: 40 },
    );
  });
});

describe('prismaPageArgs', () => {
  it('omits skip/take in all mode', () => {
    expect(prismaPageArgs({ mode: 'all' })).toEqual({});
  });

  it('computes skip/take in page mode', () => {
    expect(prismaPageArgs({ mode: 'page', page: 3, pageSize: 10 })).toEqual({
      skip: 20,
      take: 10,
    });
  });
});
