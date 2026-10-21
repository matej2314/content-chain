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
  const bodyHtml = `<p style="margin:0 0 12px 0;">Dziękujemy za rejestrację w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.</p>
<p style="margin:0;">Link jest jednorazowy i wygasa zgodnie z TTL aktywacji.</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Aktywacja konta',
    bodyHtml,
    cta: {
      label: 'Aktywuj konto',
      href: message.activateUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0 0 12px 0;word-break:break-all;"><a href="${escapeHtml(message.activateUrl)}" style="color:${MAIL_PALETTE.primary};">${escapeHtml(message.activateUrl)}</a></p>
<p style="margin:0 0 4px 0;">Token (np. Postman):</p>
<p style="margin:0;font-family:Consolas,Monaco,monospace;word-break:break-all;color:#e7e7ee;">${escapeHtml(message.rawToken)}</p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Aktywacja konta',
    bodyLines: [
      'Dziękujemy za rejestrację w Content Chain.',
      'Otwórz link poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.',
      'Link jest jednorazowy i wygasa zgodnie z TTL aktywacji.',
    ],
    cta: {
      label: 'Aktywuj konto',
      href: message.activateUrl,
    },
    footerLines: [`Token (np. Postman): ${message.rawToken}`],
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
