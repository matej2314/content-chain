import { Test } from '@nestjs/testing';
import { RUN_STATUSES } from '@content-chain/shared';
import { RUN_STATS_PORT } from '../runs/domain/run-stats.port';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  it('fills gauges from RunStatsPort without Prisma', async () => {
    const counts = new Map([['completed', 2] as const]);
    const moduleRef = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: RUN_STATS_PORT,
          useValue: {
            countByStatus: jest.fn().mockResolvedValue(counts),
          },
        },
      ],
    }).compile();

    const service = moduleRef.get(MetricsService);
    const { contentType, body } = await service.render();
    expect(contentType).toContain('text/plain');
    expect(body).toContain('content_chain_runs_by_status');
    for (const status of RUN_STATUSES) {
      expect(body).toContain(`status="${status}"`);
    }
  });
});
