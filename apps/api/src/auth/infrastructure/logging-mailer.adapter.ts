import { Injectable, Logger } from '@nestjs/common';
import type {
  TransactionalMailer,
  TransactionalMail,
} from '../domain/transactional-mailer.port';

@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  send(message: TransactionalMail): Promise<void> {
    if (message.kind === 'user_invited') {
      const text = `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`;
      this.logger.log(
        `user_invited to=${message.to} invitationId=${message.invitationId} ${text}`,
      );
      return Promise.resolve();
    }
    const text = `Open: ${message.activateUrl}\nToken: ${message.rawToken}`;
    this.logger.log(
      `user_activation to=${message.to} activationId=${message.activationId} ${text}`,
    );
    return Promise.resolve();
  }
}
