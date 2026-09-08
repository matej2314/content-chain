import { Inject, Injectable } from '@nestjs/common';
import { isUserId, createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
  ) {}

  async execute(idParam: string): Promise<{ ok: true }> {
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
        'Cannot deactivate the admin account',
        403,
      );
    }
    await this.users.setActive(userId, false);
    await this.sessions.deleteByUser(userId);
    return { ok: true };
  }
}
