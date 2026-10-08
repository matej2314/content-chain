import { Inject, Injectable, Logger } from '@nestjs/common';
import { createUserId, isUserId, type UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  GUEST_PURGE,
  type GuestPurgePort,
} from '../../runs/domain/guest-purge.port';
import {
  FEEDBACK_PURGE,
  type FeedbackPurgePort,
} from '../../feedback/domain/feedback-purge.port';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../../runs/domain/guest-quota.port';
import { RunAbortRegistry } from '../../runs/application/lifecycle/run-abort.registry';
import type { AuthUserContext } from '../domain/auth-user.types';

export type DeleteUserResult = { ok: true };

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(GUEST_PURGE) private readonly guestPurge: GuestPurgePort,
    @Inject(FEEDBACK_PURGE) private readonly feedbackPurge: FeedbackPurgePort,
    @Inject(GUEST_QUOTA) private readonly guestQuota: GuestQuotaPort,
    private readonly abortRegistry: RunAbortRegistry,
  ) {}

  private async softDeleteUser(userId: UserId): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { isActive: false },
      });
      await tx.refreshSession.deleteMany({ where: { userId } });
      await tx.accountActivation.deleteMany({ where: { userId } });
    });
  }

  async execute(
    idParam: string,
    actor: AuthUserContext,
    options: { purge: boolean },
  ): Promise<DeleteUserResult> {
    if (!isUserId(idParam)) {
      throw new DomainException('VALIDATION_FAILED', 'Invalid user ID', 400);
    }
    const userId = createUserId(idParam);
    const user = await this.users.findById(userId);
    if (!user) {
      throw new DomainException('USER_NOT_FOUND', 'User not found', 404);
    }
    if (user.role === 'admin') {
      throw new DomainException(
        'FORBIDDEN',
        'Cannot delete the admin account',
        403,
      );
    }

    if (user.role === 'user') {
      await this.softDeleteUser(userId);
      this.logger.log({
        msg: 'user_delete',
        adminId: actor.id,
        targetId: userId,
        targetRole: user.role,
        mode: 'soft',
      });
      return { ok: true };
    }

    // role === 'guest'

    const hasLiveRuns = await this.guestPurge.hasLiveRuns(userId);
    if (hasLiveRuns && !options.purge) {
      throw new DomainException(
        'GUEST_HAS_ACTIVE_RUN',
        'Guest has an active run',
        409,
      );
    }
    let mode: 'hard' | 'purge' = 'hard';
    if (hasLiveRuns && options.purge) {
      mode = 'purge';
      const liveIds = await this.guestPurge.listLiveRunIds(userId);
      for (const runId of liveIds) {
        this.abortRegistry.requestCancel(runId);
      }
    }

    const stats = await this.prisma.$transaction(async (tx) => {
      const tree = await this.guestPurge.deleteRunTree(userId, tx);
      const deletedFeedback = await this.feedbackPurge.deleteForGuest(
        userId,
        tree.runIds,
        tx,
      );
      await tx.refreshSession.deleteMany({ where: { userId } });
      await tx.accountActivation.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
      return {
        deletedRuns: tree.deletedRuns,
        deletedFeedback,
      };
    });

    const ratingsDeleted = await this.guestQuota.deleteDailyRatings(userId);
    if (!ratingsDeleted) {
      this.logger.warn({
        msg: 'guest_ratings_redis_delete_failed',
        targetId: userId,
      });
    }

    this.logger.log({
      msg: 'user_delete',
      adminId: actor.id,
      targetId: userId,
      targetRole: 'guest',
      mode,
      deletedRuns: stats.deletedRuns,
      deletedFeedback: stats.deletedFeedback,
    });
    return { ok: true };
  }
}
