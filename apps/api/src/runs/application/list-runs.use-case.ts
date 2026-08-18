import { Inject, Injectable } from '@nestjs/common';
import {
  PAGE_SIZE,
  RUN_REPOSITORY,
  type ListRunsQuery,
  type RunRepository,
} from '../domain/run.port';

@Injectable()
export class ListRunsUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(query: ListRunsQuery) {
    const result = await this.runs.list(query);
    return {
      items: result.items.map((item) => ({
        runId: item.id,
        taskType: item.taskType,
        platform: item.platform,
        language: item.language,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
        startedBy: item.startedBy,
      })),
      page: result.page,
      pageSize: PAGE_SIZE,
      total: result.total,
    };
  }
}
