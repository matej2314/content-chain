import { renderUserActivationMail } from './templates/user-activation.template';
import {
  renderUserInvitedMail,
  type RenderedMailParts,
} from './templates/user-invited.template';
import type { TransactionalMail } from '../../domain/transactional-mailer.port';

export type { RenderedMailParts };

function assertNever(value: never): never {
  throw new Error(`Unhandled transactional mail kind: ${String(value)}`);
}

/**
 * Builds subject + html + text from port fields before SMTP / logging send.
 * Domain / use-case must not import this module.
 */
export function renderTransactionalMail(
  message: TransactionalMail,
): RenderedMailParts {
  switch (message.kind) {
    case 'user_invited':
      return renderUserInvitedMail(message);
    case 'user_activation':
      return renderUserActivationMail(message);
    default:
      return assertNever(message);
  }
}
