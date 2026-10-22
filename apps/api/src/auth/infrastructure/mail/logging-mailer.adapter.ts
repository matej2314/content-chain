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
    switch (message.kind) {
      case 'user_invited':
        this.logger.log(
          `${message.kind} to=${message.to} invitationId=${message.invitationId} subject=${rendered.subject} Open: ${message.acceptUrl} Token: ${message.rawToken}`,
        );
        break;
      case 'user_activation':
        this.logger.log(
          `${message.kind} to=${message.to} activationId=${message.activationId} subject=${rendered.subject} Open: ${message.activateUrl} Token: ${message.rawToken}`,
        );
        break;
      case 'user_welcome':
        this.logger.log(
          `${message.kind} to=${message.to} email=${message.email} subject=${rendered.subject} Open: ${message.login}`,
        );
        break;
      default: {
        const _exhaustive: never = message;
        throw new Error(
          `Unhandled transactional mail kind: ${String(_exhaustive)}`,
        );
      }
    }
    return Promise.resolve();
  }
}
