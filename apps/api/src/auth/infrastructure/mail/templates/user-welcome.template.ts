import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  resolveWelcomeCidAttachments,
  WELCOME_CID,
} from '../welcome-cid-attachments';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import type { UserWelcomeMail } from '../../../domain/transactional-mailer.port';
import type { RenderedMailParts } from './user-invited.template';

export function renderUserWelcomeMail(
  message: UserWelcomeMail,
): RenderedMailParts {
  const subject = 'Witamy w Content Chain';
  const email = escapeHtml(message.email);
  const login = escapeHtml(message.login);
  const appPublicUrl = escapeHtml(message.appPublicUrl);

  const bodyHtml = `<p style="margin:0 0 12px 0;">Dziękujemy — konto <strong>${email}</strong> jest aktywne.</p>
<p style="margin:0 0 12px 0;">Krótki przewodnik po Content Chain:</p>
<ol style="margin:0 0 16px 0;padding-left:20px;">
  <li style="margin-bottom:8px;"><strong>Logowanie</strong> — wejdź na stronę główną i otwórz modal logowania.</li>
  <li style="margin-bottom:8px;"><strong>Runy</strong> — na stronie Runy uruchamiaj pipeline Social / Content, śledź postęp na liście i odpowiadaj, gdy run czeka na Twoją decyzję (HITL).</li>
  <li style="margin-bottom:8px;"><strong>Konto</strong> — w sekcji Konto zobaczysz swoje runy i ustawienia konta.</li>
</ol>
<p style="margin:0 0 8px 0;font-size:13px;color:${MAIL_PALETTE.mutedForeground};">Logowanie (podgląd):</p>
<p style="margin:0 0 16px 0;"><img src="cid:${WELCOME_CID.login}" alt="Ekran logowania Content Chain" width="480" style="max-width:100%;height:auto;border-radius:8px;border:1px solid ${MAIL_PALETTE.primary};" /></p>
<p style="margin:0 0 8px 0;font-size:13px;color:${MAIL_PALETTE.mutedForeground};">Lista runów (podgląd):</p>
<p style="margin:0 0 12px 0;"><img src="cid:${WELCOME_CID.runs}" alt="Lista runów Content Chain" width="480" style="max-width:100%;height:auto;border-radius:8px;border:1px solid ${MAIL_PALETTE.primary};" /></p>
<p style="margin:0;">Adres aplikacji: <a href="${appPublicUrl}" style="color:${MAIL_PALETTE.primary};">${appPublicUrl}</a></p>`;

  const shellHtml: MailShellContent = {
    heading: 'Witamy na pokładzie',
    bodyHtml,
    cta: {
      label: 'Zaloguj się',
      href: message.login,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0;word-break:break-all;"><a href="${login}" style="color:${MAIL_PALETTE.primary};">${login}</a></p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Witamy na pokładzie',
    bodyLines: [
      `Dziękujemy — konto ${message.email} jest aktywne.`,
      'Krótki przewodnik po Content Chain:',
      '1. Logowanie — wejdź na stronę główną i otwórz modal logowania.',
      '2. Runy — na stronie Runy uruchamiaj pipeline Social / Content, śledź postęp na liście i odpowiadaj, gdy run czeka na Twoją decyzję (HITL).',
      '3. Konto — w sekcji Konto zobaczysz swoje runy i ustawienia konta.',
      `Adres aplikacji: ${message.appPublicUrl}`,
    ],
    cta: {
      label: 'Zaloguj się',
      href: message.login,
    },
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
    attachments: resolveWelcomeCidAttachments(),
  };
}
