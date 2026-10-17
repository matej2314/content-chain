import type { PrismaService } from '../../../shared/persistence/prisma.service';
import { PrismaRunAdapter } from './prisma-run.adapter';

describe('PrismaRunAdapter.aggregateSummary', () => {
  it('breaks topTaskType ties by newest createdAt (D-80)', async () => {
    const count = jest.fn().mockResolvedValue(0);
    const groupBy = jest.fn().mockResolvedValue([
      {
        taskType: 'post_ideas',
        _count: { _all: 2 },
        _max: { createdAt: new Date('2026-07-01T10:00:00.000Z') },
      },
      {
        taskType: 'page_copy',
        _count: { _all: 2 },
        _max: { createdAt: new Date('2026-07-10T10:00:00.000Z') },
      },
    ]);
    const adapter = new PrismaRunAdapter({
      run: { count, groupBy },
    } as unknown as PrismaService);

    const windowFrom = new Date('2026-06-14T12:00:00.000Z');
    const windowTo = new Date('2026-07-14T12:00:00.000Z');
    const result = await adapter.aggregateSummary({}, windowFrom, windowTo);

    expect(result.topTaskTypeLast30d).toBe('page_copy');
    expect(groupBy).toHaveBeenCalledWith({
      by: ['taskType'],
      where: {
        createdAt: { gte: windowFrom, lte: windowTo },
      },
      _count: { _all: true },
      _max: { createdAt: true },
    });
  });
});
