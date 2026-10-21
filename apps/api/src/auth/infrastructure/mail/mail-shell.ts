import { MAIL_PALETTE } from './mail-palette';
import { escapeHtml } from './escape-html';

export type MailShellContent = {
  heading: string;
  bodyHtml: string;
  cta?: {
    label: string;
    href: string;
  };
  footerNoteHtml?: string;
};

export type MailShellTextContent = {
  heading: string;
  bodyLines: string[];
  cta?: {
    label: string;
    href: string;
  };
  footerLines?: string[];
};

export function wrapMailHtml(content: MailShellContent): string {
  const p = MAIL_PALETTE;
  const heading = escapeHtml(content.heading);
  const ctaBlock =
    content.cta === undefined
      ? ''
      : `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px 0;">
  <tr>
    <td bgcolor="${p.ctaBackground}" style="border-radius:8px;">
      <a href="${escapeHtml(content.cta.href)}"
         style="display:inline-block;padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:${p.ctaForeground};text-decoration:none;">
        ${escapeHtml(content.cta.label)}
      </a>
    </td>
  </tr>
</table>`;
  const footerNote =
    content.footerNoteHtml === undefined || content.footerNoteHtml === ''
      ? ''
      : `<div style="margin-top:20px;padding-top:16px;border-top:1px solid ${p.panel};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${p.mutedForeground};">${content.footerNoteHtml}</div>`;

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Content Chain</title>
</head>
<body style="margin:0;padding:0;background:${p.background};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${p.background};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${p.panel};border-radius:12px;border:1px solid ${p.primary};">
          <tr>
            <td style="padding:24px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:${p.primary};">
              Content Chain
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;line-height:1.3;color:${p.foreground};">
              ${heading}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:${p.foreground};">
              ${content.bodyHtml}
              ${ctaBlock}
              ${footerNote}
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${p.mutedForeground};">
          Wiadomość wygenerowana automatycznie - nie odpowiadaj na ten e-mail.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function wrapMailText(content: MailShellTextContent): string {
  const lines: string[] = [
    'Content Chain',
    '',
    content.heading,
    '',
    ...content.bodyLines,
  ];
  if (content.cta !== undefined) {
    lines.push('', `${content.cta.label}: ${content.cta.href}`);
  }
  if (content.footerLines !== undefined && content.footerLines.length > 0) {
    lines.push('', ...content.footerLines);
  }
  lines.push(
    '',
    'Wiadomość wygenerowana automatycznie - nie odpowiadaj na ten e-mail.',
  );
  return lines.join('\n');
}
