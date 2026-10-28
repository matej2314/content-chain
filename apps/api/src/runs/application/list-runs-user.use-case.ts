import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { UserId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { PaginationMode } from '../../shared/http/pagination';

interface ListRunsUserItem {
  runId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  createdAt: string;
}

export type ListRunsUserOutput = {
  items: ListRunsUserItem[];
  page: number;
  pageSize: number;
  total: number;
};

@Injectable()
export class ListRunsUserUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(
    userId: UserId,
    requestingUser: AuthUserContext,
    pagination: PaginationMode,
  ): Promise<ListRunsUserOutput> {
    if (userId !== requestingUser.id) {
      throw new DomainException(
        'FORBIDDEN',
        'Access to other user runs is forbidden',
        403,
      );
    }
    const result = await this.runs.listByUser(userId, pagination);
    return {
      items: result.items.map((item) => ({
        runId: item.runId,
        taskType: item.taskType,
        platform: item.platform,
        language: item.language,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
      })),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
    };
  }
}
