import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';

const updateEmailSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateEmailSchema, input);

    const current = await this.users.findById(context.id);
    if (!current || !current.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
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
