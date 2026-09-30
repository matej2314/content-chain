import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import { comparePassword } from './auth.helpers';
import { updateMeEmailSchema } from './auth.schemas';
import type { AuthUserContext } from '../domain/auth-user.types';

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateMeEmailSchema, input);

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

    if (current.email === command.email) {
      return {
        id: current.id,
        email: current.email,
        role: current.role,
      };
    }

    const occupied = await this.users.findForAuth(command.email);
    if (occupied) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const updated = await this.users.updateEmail(context.id, command.email);
    return {
      id: updated.id,
      email: updated.email,
      role: updated.role,
    };
  }
}
