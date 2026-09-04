import { Inject, Injectable } from '@nestjs/common';
import {
  PAGE_SIZE,
  RUN_REPOSITORY,
  RunStartedBy,
  type ListRunsQuery,
  type RunRepository,
} from '../domain/run.port';
import type {
  ContentKind,
  ContentLanguage,
  RunId,
  RunPlatform,
  RunStatus,
  RunTaskType,
} from '@content-chain/shared';

interface ListRunsOutput {
  items: {
    runId: RunId;
    taskType: RunTaskType;
    platform: RunPlatform;
    contentKind: ContentKind | null;
    language: ContentLanguage;
    status: RunStatus;
    createdAt: string;
    startedBy: RunStartedBy | null;
  }[];
  page: number;
  pageSize: number;
  total: number;
}

@Injectable()
export class ListRunsUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(query: ListRunsQuery): Promise<ListRunsOutput> {
    const result = await this.runs.list(query);
    return {
      items: result.items.map((item) => ({
        runId: item.id,
        taskType: item.taskType,
        platform: item.platform,
        contentKind: item.contentKind,
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
