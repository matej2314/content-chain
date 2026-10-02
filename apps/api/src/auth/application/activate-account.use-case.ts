import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import { hashRefreshToken } from './auth.helpers';
import { activateAccountSchema } from './auth.schemas';
import type { UserId, UserRole } from '@content-chain/shared';

export type ActivateAccountOutput = {
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class ActivateAccountUseCase {
  constructor(
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
  ) {}

  async execute(input: unknown): Promise<ActivateAccountOutput> {
    const command = parseWithZod(activateAccountSchema, input);
    const tokenHash = hashRefreshToken(command.token);
    const activation = await this.activations.findValidByTokenHash(
      tokenHash,
      new Date(),
    );
    if (!activation) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid activation token',
        401,
      );
    }

    const user = await this.activations.consumeAndVerify(
      activation.userId,
      new Date(),
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
