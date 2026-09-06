import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const user = await this.users.findById(context.id);
    if (!user || !user.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
