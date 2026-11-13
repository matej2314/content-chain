import { Inject, Injectable } from '@nestjs/common';
import { AuthUserContext } from '../domain/auth-user.types';
import { DeleteUserUseCase } from './delete-user.use-case';
import { parseWithZod } from '../../shared/parse-with-zod';
import { deleteOwnAccountSchema } from './auth.schemas';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { comparePassword } from './auth.helpers';

@Injectable()
export class DeleteOwnAccountUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
    options: { purge: boolean },
  ): Promise<{ ok: true }> {
    const command = parseWithZod(deleteOwnAccountSchema, input);
    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const isPassOk = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );
    if (!isPassOk) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    return this.deleteUser.execute(context.id, context, options);
  }
}
