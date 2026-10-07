import { Inject, Injectable } from '@nestjs/common';
import type { RunTaskType, UserId } from '@content-chain/shared';
import type { AuthUserContext } from '../../../shared/types/auth-user-context';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../../shared/config/env';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../../domain/guest-quota.port';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';

const GUEST_TASK_TYPES = [
  'post_ideas',
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly RunTaskType[];

function isGuestTaskType(
  taskType: RunTaskType,
): taskType is (typeof GUEST_TASK_TYPES)[number] {
  return (GUEST_TASK_TYPES as readonly RunTaskType[]).includes(taskType);
}

export type GuestRunAdmit = {
  readonly release: () => Promise<void>;
};

@Injectable()
export class GuestRunPolicyService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(GUEST_QUOTA) private readonly quota: GuestQuotaPort,
  ) {}

  async admitStart(
    actor: AuthUserContext,
    taskType: RunTaskType,
  ): Promise<GuestRunAdmit | null> {
    if (actor.role !== 'guest' || !this.env.DEMO_MODE) {
      return null;
    }
    if (!isGuestTaskType(taskType)) {
      throw new DomainException(
        'GUEST_TYPE_NOT_ALLOWED',
        'Task type is not allowed for guest',
        403,
      );
    }
    const used = await this.runs.countByUserAndType(actor.id, taskType);
    if (used >= 1) {
      throw new DomainException(
        'GUEST_TYPE_QUOTA_EXCEEDED',
        'Guest task type quota exceeded',
        403,
      );
    }
    const admit = await this.quota.tryAdmitDailyRun(
      this.env.GUEST_GLOBAL_CAP_PER_DAY,
    );
    if (admit.kind !== 'ok') {
      throw new DomainException(
        'GUEST_GLOBAL_QUOTA_EXCEEDED',
        'Guest daily run quota exceeded',
        403,
      );
    }
    return {
      release: () => this.quota.releaseDailyRun(),
    };
  }

  assertGuestOwnsRun(
    actor: AuthUserContext,
    startedByUserId: UserId | null,
  ): void {
    if (actor.role !== 'guest') {
      return;
    }
    if (startedByUserId !== actor.id) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
  }
}
