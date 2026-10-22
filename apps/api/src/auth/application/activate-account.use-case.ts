import { Inject, Injectable, Logger } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { hashRefreshToken } from './auth.helpers';
import { activateAccountSchema } from './auth.schemas';
import type { UserId, UserRole } from '@content-chain/shared';

export type ActivateAccountOutput = {
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class ActivateAccountUseCase {
  private readonly logger = new Logger(ActivateAccountUseCase.name);

  constructor(
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
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

    if (user.role === 'user' || user.role === 'guest') {
      const appPublicUrl = this.env.APP_PUBLIC_URL ?? '';
      const login = `${appPublicUrl}/`;
      try {
        await this.mailer.send({
          kind: 'user_welcome',
          to: user.email,
          email: user.email,
          appPublicUrl,
          login,
        });
      } catch (error: unknown) {
        const detail =
          error instanceof Error ? error.message : 'unknown mailer error';
        this.logger.warn(
          `user_welcome delivery failed to=${user.email}: ${detail}`,
        );
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
