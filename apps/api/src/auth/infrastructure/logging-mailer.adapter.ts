import { Injectable, Logger } from '@nestjs/common';
import type {
  TransactionalMailer,
  UserInvitedMail,
} from '../domain/transactional-mailer.port';

@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  async send(message: UserInvitedMail): Promise<void> {
    const text = `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`;
    this.logger.log(
      `user_invited to=${message.to} invitationId=${message.invitationId} ${text}`,
    );
  }
}
