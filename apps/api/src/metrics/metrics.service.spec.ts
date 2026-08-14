import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';
import { PrismaService } from '../shared/persistence/prisma.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: PrismaService,
          useValue: {
            run: { groupBy: jest.fn().mockResolvedValue([]) },
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
