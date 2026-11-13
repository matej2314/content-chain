import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import type { EmailChangeConfirmMail } from '../../../domain/transactional-mailer.port';
import type { RenderedMailParts } from './user-invited.template';

export function renderEmailChangeConfirmMail(
  message: EmailChangeConfirmMail,
): RenderedMailParts {
  const subject = 'Potwierdź nowy adres e-mail w Content Chain';
  const validity = escapeHtml(message.validityLabel);
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymaliśmy prośbę o zmianę adresu e-mail w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby potwierdzić <strong>nowy</strong> adres. Dopiero wtedy zastąpi on dotychczasowy.</p>
<p style="margin:0;">${validity}</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Potwierdzenie zmiany e-mail',
    bodyHtml,
    cta: {
      label: 'Potwierdź e-mail',
      href: message.confirmUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0;word-break:break-all;"><a href="${escapeHtml(message.confirmUrl)}" style="color:${MAIL_PALETTE.primary};">${escapeHtml(message.confirmUrl)}</a></p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Potwierdzenie zmiany e-mail',
    bodyLines: [
      'Otrzymaliśmy prośbę o zmianę adresu e-mail w Content Chain.',
      'Otwórz link poniżej, aby potwierdzić nowy adres. Dopiero wtedy zastąpi on dotychczasowy.',
      message.validityLabel,
    ],
    cta: {
      label: 'Potwierdź e-mail',
      href: message.confirmUrl,
    },
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
