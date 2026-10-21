import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import type { UserInvitedMail } from '../../../domain/transactional-mailer.port';

export type RenderedMailParts = {
  subject: string;
  html: string;
  text: string;
};

export function renderUserInvitedMail(message: UserInvitedMail): RenderedMailParts {
  const subject = 'Zaproszenie do Content Chain';
  const validity = escapeHtml(message.validityLabel);
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymujesz zaproszenie do aplikacji <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby ustawić hasło i dołączyć do zespołu.</p>
<p style="margin:0;">Link jest jednorazowy. ${validity}</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Dołącz do zespołu',
    bodyHtml,
    cta: {
      label: 'Akceptuj zaproszenie',
      href: message.acceptUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0;word-break:break-all;"><a href="${escapeHtml(message.acceptUrl)}" style="color:${MAIL_PALETTE.primary};">${escapeHtml(message.acceptUrl)}</a></p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Dołącz do zespołu',
    bodyLines: [
      'Otrzymujesz zaproszenie do aplikacji Content Chain.',
      'Otwórz link poniżej, aby ustawić hasło i dołączyć do zespołu.',
      `Link jest jednorazowy. ${message.validityLabel}`,
    ],
    cta: {
      label: 'Akceptuj zaproszenie',
      href: message.acceptUrl,
    },
    // URL-only: no separate Postman raw line in footer
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
