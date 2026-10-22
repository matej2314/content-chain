import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import type { UserActivationMail } from '../../../domain/transactional-mailer.port';
import type { RenderedMailParts } from './user-invited.template';

export function renderUserActivationMail(
  message: UserActivationMail,
): RenderedMailParts {
  const subject = 'Aktywuj konto w Content Chain';
  const validity = escapeHtml(message.validityLabel);
  const bodyHtml = `<p style="margin:0 0 12px 0;">Dziękujemy za rejestrację w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.</p>
<p style="margin:0;">${validity}</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Aktywacja konta',
    bodyHtml,
    cta: {
      label: 'Aktywuj konto',
      href: message.activateUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0;word-break:break-all;"><a href="${escapeHtml(message.activateUrl)}" style="color:${MAIL_PALETTE.primary};">${escapeHtml(message.activateUrl)}</a></p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Aktywacja konta',
    bodyLines: [
      'Dziękujemy za rejestrację w Content Chain.',
      'Otwórz link poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.',
      message.validityLabel,
    ],
    cta: {
      label: 'Aktywuj konto',
      href: message.activateUrl,
    },
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
