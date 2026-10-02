import { Inject, Injectable } from '@nestjs/common';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { ENV, type Env } from '../../shared/config/env';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import { resendActivationSchema } from './auth.schemas';
import { SoftEmailRateLimiter } from './soft-email-rate-limiter';

export const RESEND_ACTIVATION_RATE_LIMITER = Symbol(
  'RESEND_ACTIVATION_RATE_LIMITER',
);

export type ResendActivationOutput = {
  message: 'Wiadomość wysłana ponownie';
};

const SUCCESS: ResendActivationOutput = {
  message: 'Wiadomość wysłana ponownie',
};

@Injectable()
export class ResendActivationUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
    @Inject(RESEND_ACTIVATION_RATE_LIMITER)
    private readonly rateLimiter: SoftEmailRateLimiter,
  ) {}

  async execute(input: unknown): Promise<ResendActivationOutput> {
    const command = parseWithZod(resendActivationSchema, input);
    if (!this.rateLimiter.tryConsume(command.email)) {
      return SUCCESS;
    }
    const user = await this.users.findForAuth(command.email);
    if (!user || !user.isActive || user.verifiedAt !== null) {
      return SUCCESS;
    }
    const existing = await this.activations.findValidByUserId(user.id);
    if (!existing) {
      return SUCCESS;
    }
    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(
      Date.now() + parseTtlMs(this.env.ACTIVATION_TTL),
    );

    let activationId = existing.id;
    try {
      const rotated = await this.activations.rotateToken({
        userId: user.id,
        tokenHash: hash,
        expiresAt,
      });
      activationId = rotated.id;
    } catch {
      return SUCCESS;
    }
    try {
      await this.mailer.send({
        kind: 'user_activation',
        to: user.email,
        activationId,
        activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${raw}`,
        rawToken: raw,
      });
    } catch {
      return SUCCESS;
    }
    return SUCCESS;
  }
}
