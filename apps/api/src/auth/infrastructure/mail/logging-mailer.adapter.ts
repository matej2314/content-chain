import { Injectable, Logger } from '@nestjs/common';
import { renderTransactionalMail } from './render-transactional-mail';
import type {
  TransactionalMailer,
  TransactionalMail,
} from '../../domain/transactional-mailer.port';

@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  send(message: TransactionalMail): Promise<void> {
    const rendered = renderTransactionalMail(message);
    if (message.kind === 'user_invited') {
      this.logger.log(
        `${message.kind} to=${message.to} invitationId=${message.invitationId} subject=${rendered.subject} Open: ${message.acceptUrl} Token: ${message.rawToken}`,
      );
      return Promise.resolve();
    }
    this.logger.log(
      `${message.kind} to=${message.to} activationId=${message.activationId} subject=${rendered.subject} Open: ${message.activateUrl} Token: ${message.rawToken}`,
    );
    return Promise.resolve();
  }
}
