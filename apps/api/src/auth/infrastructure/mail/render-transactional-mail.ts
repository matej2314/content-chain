import { resolveBrandCidAttachments } from './brand-cid-attachments';
import { renderUserActivationMail } from './templates/user-activation.template';
import {
  renderUserInvitedMail,
  type RenderedMailParts,
} from './templates/user-invited.template';
import { renderUserWelcomeMail } from './templates/user-welcome.template';
import type { TransactionalMail } from '../../domain/transactional-mailer.port';

export type { RenderedMailParts };

function assertNever(value: never): never {
  throw new Error(`Unhandled transactional mail kind: ${String(value)}`);
}

/**
 * Builds subject + html + text (+ CID attachments) from port fields
 * before SMTP / logging send. Brand logo CID is prepended for every kind.
 * Domain / use-case must not import this module.
 */
export function renderTransactionalMail(
  message: TransactionalMail,
): RenderedMailParts {
  const rendered = ((): RenderedMailParts => {
    switch (message.kind) {
      case 'user_invited':
        return renderUserInvitedMail(message);
      case 'user_activation':
        return renderUserActivationMail(message);
      case 'user_welcome':
        return renderUserWelcomeMail(message);
      default:
        return assertNever(message);
    }
  })();

  return {
    ...rendered,
    attachments: [
      ...resolveBrandCidAttachments(),
      ...(rendered.attachments ?? []),
    ],
  };
}
