import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import { validatePasswordPolicy } from '../domain/password.policy';
import { comparePassword, hashPassword } from './auth.helpers';
import { changeMePasswordSchema } from './auth.schemas';
import type { AuthUserContext } from '../domain/auth-user.types';

@Injectable()
export class ChangeMePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<{ ok: true }> {
    const command = parseWithZod(changeMePasswordSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const isPasswordValid = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!isPasswordValid) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    validatePasswordPolicy(command.newPassword);

    const passwordHash = await hashPassword(command.newPassword);
    await this.users.updatePassword(context.id, passwordHash);
    await this.sessions.deleteByUser(context.id);

    return { ok: true };
  }
}
