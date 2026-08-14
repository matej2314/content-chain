import { Injectable } from '@nestjs/common';
import { RUN_STATUSES } from '@content-chain/shared';
import { PrismaService } from '../shared/persistence/prisma.service';
import { metricsRegistry, runsByStatus } from './metrics.registry';

@Injectable()
export class MetricsService {
  constructor(private readonly prisma: PrismaService) {}

  async render(): Promise<{ contentType: string; body: string }> {
    const grouped = await this.prisma.run.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts = new Map(grouped.map((row) => [row.status, row._count._all]));
    for (const status of RUN_STATUSES) {
      runsByStatus.set({ status }, counts.get(status) ?? 0);
    }
    return {
      contentType: metricsRegistry.contentType,
      body: await metricsRegistry.metrics(),
    };
  }
}
