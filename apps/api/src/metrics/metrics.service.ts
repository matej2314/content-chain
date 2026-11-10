import { Inject, Injectable } from '@nestjs/common';
import { RUN_STATUSES } from '@content-chain/shared';
import {
  RUN_STATS_PORT,
  type RunStatsPort,
} from '../runs/domain/run-stats.port';
import { metricsRegistry, runsByStatus } from './metrics.registry';

@Injectable()
export class MetricsService {
  constructor(
    @Inject(RUN_STATS_PORT) private readonly runStats: RunStatsPort,
  ) {}

  async render(): Promise<{ contentType: string; body: string }> {
    const counts = await this.runStats.countByStatus();
    for (const status of RUN_STATUSES) {
      runsByStatus.set({ status }, counts.get(status) ?? 0);
    }
    return {
      contentType: metricsRegistry.contentType,
      body: await metricsRegistry.metrics(),
    };
  }
}
