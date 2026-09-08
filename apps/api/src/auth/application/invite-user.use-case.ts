import { Inject, Injectable } from '@nestjs/common';
import { newInvitationId } from '../../shared/http/new-ids';
import type { InvitationId, UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import { z } from 'zod';

const inviteUserSchema = z.object({
  email: z.string().email(),
});

export type InviteUserResult = {
  id: InvitationId;
  email: string;
  expiresAt: string;
};

@Injectable()
export class InviteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    input: unknown,
    invitedByUserId: UserId,
  ): Promise<InviteUserResult> {
    const command = parseWithZod(inviteUserSchema, input);

    const existingUser = await this.users.findForAuth(command.email);
    if (existingUser) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const isPendingInvitation = await this.invitations.findPendingByEmail(
      command.email,
    );
    if (isPendingInvitation) {
      throw new DomainException(
        'CONFLICT',
        'Pending invitation already exists',
        409,
      );
    }

    const { raw, hash } = generateRefreshToken();
    const invitationId = newInvitationId();
    const expiresAt = new Date(Date.now() + parseTtlMs(this.env.INVITE_TTL));

    const created = await this.invitations.createPending({
      id: invitationId,
      email: command.email,
      tokenHash: hash,
      purpose: 'invite',
      expiresAt,
      invitedByUserId,
    });
    if (!created.ok) {
      throw new DomainException(
        'CONFLICT',
        'Pending invitation already exists',
        409,
      );
    }
    const saved = created.invitation;

    try {
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
      });
    } catch {
      throw new DomainException(
        'MAIL_DELIVERY_FAILED',
        'Mail delivery failed',
        503,
        [{ id: saved.id }],
      );
    }

    return {
      id: saved.id,
      email: saved.email,
      expiresAt: saved.expiresAt.toISOString(),
    };
  }
}
