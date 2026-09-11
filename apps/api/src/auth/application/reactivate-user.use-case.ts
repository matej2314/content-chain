import { Inject, Injectable } from '@nestjs/common';
import { createUserId, isUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import type { UserListItem } from '../domain/auth-user.types';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import { patchUserSchema } from './auth.schemas';

@Injectable()
export class ReactivateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(idParam: string, input: unknown): Promise<UserListItem> {
    parseWithZod(patchUserSchema, input);
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
        'Cannot update the admin account',
        403,
      );
    }
    if (!user.isActive) {
      await this.users.setActive(userId, true);
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: true,
      createdAt: user.createdAt,
    };
  }
}
