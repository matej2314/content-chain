import type { InvitationId, AccountActivationId } from '@content-chain/shared';

export const TRANSACTIONAL_MAILER = Symbol('TRANSACTIONAL_MAILER');

export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
  validityLabel: string;
};

export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
  validityLabel: string;
};

export type UserWelcomeMail = {
  kind: 'user_welcome';
  to: string;
  email: string;
  appPublicUrl: string;
  login: string;
};

export type TransactionalMail =
| UserInvitedMail 
| UserActivationMail 
| UserWelcomeMail;

export interface TransactionalMailer {
  send(message: TransactionalMail): Promise<void>;
}
