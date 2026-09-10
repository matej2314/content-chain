import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type { UserId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

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
};

@Injectable()
export class ListRunsUserUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(
    userId: UserId,
    requestingUser: AuthUserContext,
  ): Promise<ListRunsUserOutput> {
    if (userId !== requestingUser.id) {
      throw new DomainException(
        'FORBIDDEN',
        'Access to other user runs is forbidden',
        403,
      );
    }
    const items = await this.runs.listByUser(userId);
    return {
      items: items.map((item) => ({
        runId: item.runId,
        taskType: item.taskType,
        platform: item.platform,
        language: item.language,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
      })),
    };
  }
}
