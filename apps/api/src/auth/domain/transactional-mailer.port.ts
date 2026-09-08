import type { InvitationId } from '@content-chain/shared';

export const TRANSACTIONAL_MAILER = Symbol('TRANSACTIONAL_MAILER');

export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
};

export interface TransactionalMailer {
  send(message: UserInvitedMail): Promise<void>;
}
