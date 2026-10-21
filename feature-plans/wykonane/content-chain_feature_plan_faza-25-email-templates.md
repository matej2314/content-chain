# Content Chain — feature plan: szablony e-mail HTML + text (Faza 25)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-25-email-templates.md`  
**Kotwica major:** Faza 25 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 25).  
**Numer BE 25 ≠ FE** — szablony wyłącznie w Auth `infrastructure/mail/` (nie React Email, nie FE).  
**Źródła:** `docs/architektura.md`, `docs/architektura_katalogi_pliki.md`, `docs/brand_types.md` (kolorystyka maili), `docs/deployment.md`, `docs/security.md`, `docs/dokumentacja_komunikacji.md` (deep linki / token w mailu), `SPEC-AUTH.md` (Mailer / Treść / zakazy), `SPEC-TESTY.md` (HTML ≠ nowy D-*; unit renderera poza T-5), major Faza 25.  
**Kolejność** `KROK`**:** paleta + shell → szablony + renderer → adaptery SMTP/log → unit + regresja.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 25 majoru backend: maile transakcyjne = czysty HTML + równoległy plain text; wspólny shell; PL; kinds `user_invited` \| `user_activation`; render przed `sendMail` wyłącznie w `infrastructure/mail/` |
| Major | Faza 25; start po Fazach 1–24 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 25 |
| Refaktor względem | Faza 5 (plain EN inline SMTP), Faza 16 (`user_activation` plain), Faza 20 (drzewo `mail/` bez kanonu HTML) — **bez** edycji treści tych faz w major |
| Poza zakresem | `user_welcome` / CID (major Faza 26); zmiana HTTP Auth; SMTP/env; deep linków; nowy BC „Email”; React Email / JSX / szablony FE; i18n; editor w produkcie; confirm-email V1; major FE |
| Po implementacji (informacyjnie) | Major: Faza 25 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 25. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW) | Feature | Zakres |
|-------------|---------|--------|
| Wspólny shell + kolory z `globals.css` | FAZA 1 / KROK 1 | `mail-palette` + `mail-shell` |
| Szablony per kind + injection | FAZA 1 / KROK 2 | templates + `renderTransactionalMail` |
| Adapter SMTP `html`+`text`; log DX | FAZA 1 / KROK 3 | Nodemailer + Logging |
| Unit renderer; regresja D-* | FAZA 1 / KROK 4 | `*.spec.ts` + istniejące unit/e2e |

**Pass rozwojowy (sesja planu):**

1. Paleta + shell **przed** szablonami.
2. Renderer **przed** adapterami.
3. Adaptery wołają wyłącznie `renderTransactionalMail(message)` — **bez** treści inline EN.
4. Testy na końcu (asercje treści = unit renderera; HTTP D-* bez nowych numerów).
5. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**
6. Port `TransactionalMail` = nadal `user_invited` \| `user_activation` (bez `user_welcome` — Faza 26). Shell zaprojektowany tak, by Faza 26 dodała kind + szablon bez przepisywania layoutu.

---

## Założenia

- Stack bez zmian: NestJS 11, nodemailer `^10` (`@types/nodemailer` `^8`), monorepo; **bez** nowego npm (zakaz React Email).
- Port `TransactionalMailer` / pola wiadomości / flow use case → `mailer.send({ kind, … })` **bez** zmiany sensu.
- Deep linki bez regresji: invite `{APP_PUBLIC_URL}/invite/accept?token={raw}`; activation `{APP_PUBLIC_URL}/?activationToken={raw}` — budowane w use-case jak dziś; szablony tylko wstrzykują gotowe URL / `rawToken`.
- Język subject + body: **PL**. Token raw nadal w body (link + tekst pod Postman) — `docs/dokumentacja_komunikacji.md`.
- Kolory: role z `docs/brand_types.md` / `globals.css`; w HTML **inline** hex (klienci poczty nie honorują CSS variables). Wartości HOW poniżej — odczyt z `apps/frontend/src/app/globals.css` (CTA hex bezpośrednio; dark shell / primary ≈ konwersja oklch → sRGB przy planowaniu; przy implementacji wolno skorygować 1–2 jednostki, jeśli wizualnie rozjeżdża się z UI).
- Escape HTML dla pól wstrzykiwanych do HTML (`href`, tekst URL, token) — funkcja w I/O mail; **bez** logiki domenowej w szablonach.
- CTA w mailu: **solid** `#39a185` (gradient CTA słabo wspierany w klientach poczty); tekst przycisku `#0b1f1a`.
- Adapter logujący: nadal loguje `kind`, `to`, id, URL, **raw token** (DX); **nie** wymaga dumpa pełnego HTML; semantyka envelope HTTP **bez zmian**.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**. Norma `user_welcome` w SPEC-AUTH obowiązuje od Fazy 26 — ten wycinek **nie** rozszerza unii portu.

### Paleta HOW (inline)

| Rola | Hex | Źródło |
|------|-----|--------|
| Tło shell | `#10101c` | `--background` oklch(0.18 0.025 285) → sRGB |
| Tekst | `#e7e7ee` | `--foreground` |
| Tekst muted / footer | `#a3a3b1` | `--muted-foreground` |
| Powierzchnia karty / panel | `#272735` | `--muted` |
| Akcent primary (header border / mark) | `#8776ff` | `--primary` oklch(0.65 0.2 285) |
| CTA tło | `#39a185` | `--button-default-from` |
| CTA tekst | `#0b1f1a` | `--button-default-foreground` |

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| nodemailer 10 `sendMail` | Context7 `/nodemailer/nodemailer-homepage` + `apps/api` `nodemailer ^10` | `transporter.sendMail({ from, to, subject, text, html })` — równoległe `html` + `text` | Adapter SMTP przekazuje oba z renderera; **bez** `alternatives[]` (wystarczy para text/html) |
| React Email | SPEC-AUTH zakaz | — | **Nie** dodawać |
| Nest mail | Konwencja repo | Adaptery już w `infrastructure/mail/` | Tylko refaktor treści + wspólny renderer |

---

## FAZA 1 — Szablony HTML + plain text (Auth `infrastructure/mail/`)

Odpowiada major Faza 25 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Paleta inline + wspólny shell HTML/text

**Status:** `WYKONANY`

**Cel:** Stałe kolory HOW + layout (header / body / CTA / footer) współdzielony przez kinds. Major Faza 25 HOW-1; `SPEC-AUTH` Treść maila / Kolorystyka; `docs/brand_types.md`.

**Artefakty:**

- Nowy: `apps/api/src/auth/infrastructure/mail/mail-palette.ts`
- Nowy: `apps/api/src/auth/infrastructure/mail/mail-shell.ts`
- Nowy: `apps/api/src/auth/infrastructure/mail/escape-html.ts`

#### Nowy plik — pełny kod

`apps/api/src/auth/infrastructure/mail/mail-palette.ts`:

```typescript
/**
 * Inline hex for transactional mail shell.
 * Roles mapped from apps/frontend/src/app/globals.css (dark shell / primary / CTA).
 * Clients do not honor CSS variables — values are frozen at render time.
 */
export const MAIL_PALETTE = {
  background: '#10101c',
  foreground: '#e7e7ee',
  mutedForeground: '#a3a3b1',
  panel: '#272735',
  primary: '#8776ff',
  ctaBackground: '#39a185',
  ctaForeground: '#0b1f1a',
} as const;

export type MailPalette = typeof MAIL_PALETTE;
```

`apps/api/src/auth/infrastructure/mail/escape-html.ts`:

```typescript
/** Escape text for HTML attribute / text nodes in mail templates (I/O only). */
export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
```

`apps/api/src/auth/infrastructure/mail/mail-shell.ts`:

```typescript
import { MAIL_PALETTE } from './mail-palette';
import { escapeHtml } from './escape-html';

export type MailShellContent = {
  /** Visible title under brand (HTML-safe plain text; escaped inside). */
  heading: string;
  /** Inner HTML fragment already escaped / built by kind template (paragraphs etc.). */
  bodyHtml: string;
  cta?: {
    label: string;
    href: string;
  };
  /** Extra plain lines after CTA (e.g. raw token for Postman) — escaped. */
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
```

**DoD kroku:**

- Pliki kompilują się w `apps/api` (typecheck w ramach późniejszego kroku testów).
- Shell nie importuje Nest / Prisma / domain use-case.
- CTA i kolory zgodne z tabelą HOW; brak CSS variables w output HTML.

---

### KROK 2 — Szablony per kind + renderer

**Status:** `WYKONANY`

**Cel:** Subject/body PL dla `user_invited` i `user_activation`; injection wyłącznie z pól `TransactionalMail`. Major HOW-2; `SPEC-AUTH` Treść / Kinds (MVP tego wycinka = dwa kinds); port bez zmian.

**Artefakty:**

- Nowy: `apps/api/src/auth/infrastructure/mail/templates/user-invited.template.ts`
- Nowy: `apps/api/src/auth/infrastructure/mail/templates/user-activation.template.ts`
- Nowy: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.ts`

Port `apps/api/src/auth/domain/transactional-mailer.port.ts` — **bez zmian** (unia zostaje `user_invited` \| `user_activation`).

#### Nowy plik — pełny kod

`apps/api/src/auth/infrastructure/mail/templates/user-invited.template.ts`:

```typescript
import type { UserInvitedMail } from '../../../domain/transactional-mailer.port';
import { escapeHtml } from '../escape-html';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';

export type RenderedMailParts = {
  subject: string;
  html: string;
  text: string;
};

export function renderUserInvitedMail(message: UserInvitedMail): RenderedMailParts {
  const subject = 'Zaproszenie do Content Chain';
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymujesz zaproszenie do aplikacji <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby ustawić hasło i dołączyć do zespołu.</p>
<p style="margin:0;">Link jest jednorazowy i wygasa zgodnie z TTL zaproszenia.</p>`;

  const shellHtml: MailShellContent = {
    heading: 'Dołącz do zespołu',
    bodyHtml,
    cta: {
      label: 'Akceptuj zaproszenie',
      href: message.acceptUrl,
    },
    footerNoteHtml: `<p style="margin:0 0 8px 0;">Jeśli przycisk nie działa, wklej ten adres w przeglądarce:</p>
<p style="margin:0 0 12px 0;word-break:break-all;"><a href="${escapeHtml(message.acceptUrl)}" style="color:#8776ff;">${escapeHtml(message.acceptUrl)}</a></p>
<p style="margin:0 0 4px 0;">Token (np. Postman):</p>
<p style="margin:0;font-family:Consolas,Monaco,monospace;word-break:break-all;color:#e7e7ee;">${escapeHtml(message.rawToken)}</p>`,
  };

  const shellText: MailShellTextContent = {
    heading: 'Dołącz do zespołu',
    bodyLines: [
      'Otrzymujesz zaproszenie do aplikacji Content Chain.',
      'Otwórz link poniżej, aby ustawić hasło i dołączyć do zespołu.',
      'Link jest jednorazowy i wygasa zgodnie z TTL zaproszenia.',
    ],
    cta: {
      label: 'Akceptuj zaproszenie',
      href: message.acceptUrl,
    },
    footerLines: [
      `Token (np. Postman): ${message.rawToken}`,
    ],
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
```

`apps/api/src/auth/infrastructure/mail/templates/user-activation.template.ts`:

```typescript
import type { UserActivationMail } from '../../../domain/transactional-mailer.port';
import { escapeHtml } from '../escape-html';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
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
<p style="margin:0 0 12px 0;word-break:break-all;"><a href="${escapeHtml(message.activateUrl)}" style="color:#8776ff;">${escapeHtml(message.activateUrl)}</a></p>
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
    footerLines: [
      `Token (np. Postman): ${message.rawToken}`,
    ],
  };

  return {
    subject,
    html: wrapMailHtml(shellHtml),
    text: wrapMailText(shellText),
  };
}
```

`apps/api/src/auth/infrastructure/mail/render-transactional-mail.ts`:

```typescript
import type { TransactionalMail } from '../../domain/transactional-mailer.port';
import { renderUserActivationMail } from './templates/user-activation.template';
import {
  renderUserInvitedMail,
  type RenderedMailParts,
} from './templates/user-invited.template';

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
```

**DoD kroku:**

- Renderer zwraca `subject` (PL), niepusty `html` i `text` dla obu kinds.
- `html` zawiera escaped CTA href + token; `text` zawiera URL i linię `Token (np. Postman): …`.
- Brak importów renderer/szablonów z `application/` / `domain/` (poza typami portu).

---

### KROK 3 — Refaktor adapterów SMTP + logującego

**Status:** `WYKONANY`

**Cel:** Produktowy send = `html` + `text` + PL subject; DX log nadal z URL + raw token. Major HOW-3; Context7 nodemailer `sendMail({ html, text })`; `SPEC-AUTH` Mailer.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/nodemailer-smtp-mailer.adapter.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/logging-mailer.adapter.ts`
- `auth.module.ts` — **bez zmian** (wire production vs logging zostaje)

#### Refaktor — `nodemailer-smtp-mailer.adapter.ts`

**teraz** (metoda `send` + importy treści):

```typescript
import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ENV, type Env } from '../../../shared/config/env';
import type { Transporter } from 'nodemailer';
import type {
  TransactionalMailer,
  TransactionalMail,
} from '../../domain/transactional-mailer.port';

// ... readSmtpConfig bez zmian ...

  async send(message: TransactionalMail): Promise<void> {
    if (message.kind === 'user_invited') {
      await this.transporter.sendMail({
        from: this.from,
        to: message.to,
        subject: 'You are invited to join Content Chain App',
        text: `You are invited to join Content Chain App. Please click the link below to accept the invitation: ${message.acceptUrl}\nToken: ${message.rawToken} `,
      });
      return;
    }
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: 'Activate your Content Chain account',
      text: `Please activate your account: ${message.activateUrl}\nToken: ${message.rawToken}`,
    });
  }
```

**zamień na:**

```typescript
import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ENV, type Env } from '../../../shared/config/env';
import type {
  TransactionalMail,
  TransactionalMailer,
} from '../../domain/transactional-mailer.port';
import { renderTransactionalMail } from './render-transactional-mail';

// ... readSmtpConfig + constructor bez zmian sensu ...

  async send(message: TransactionalMail): Promise<void> {
    const rendered = renderTransactionalMail(message);
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html,
    });
  }
```

Pełny plik po zmianie (dla jednoznaczności implementacji):

```typescript
import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { ENV, type Env } from '../../../shared/config/env';
import type {
  TransactionalMail,
  TransactionalMailer,
} from '../../domain/transactional-mailer.port';
import { renderTransactionalMail } from './render-transactional-mail';

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

function readSmtpConfig(env: Env): SmtpConfig {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
    throw new Error('SMTP configuration is missing');
  }
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
  };
}

@Injectable()
export class NodemailerSmtpMailerAdapter implements TransactionalMailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(@Inject(ENV) private readonly env: Env) {
    const smtp = readSmtpConfig(env);
    this.from = smtp.from;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  async send(message: TransactionalMail): Promise<void> {
    const rendered = renderTransactionalMail(message);
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html,
    });
  }
}
```

#### Refaktor — `logging-mailer.adapter.ts`

**teraz:**

```typescript
@Injectable()
export class LoggingMailerAdapter implements TransactionalMailer {
  private readonly logger = new Logger(LoggingMailerAdapter.name);

  send(message: TransactionalMail): Promise<void> {
    if (message.kind === 'user_invited') {
      const text = `Open: ${message.acceptUrl}\nToken: ${message.rawToken}`;
      this.logger.log(
        `user_invited to=${message.to} invitationId=${message.invitationId} ${text}`,
      );
      return Promise.resolve();
    }
    const text = `Open: ${message.activateUrl}\nToken: ${message.rawToken}`;
    this.logger.log(
      `user_activation to=${message.to} activationId=${message.activationId} ${text}`,
    );
    return Promise.resolve();
  }
}
```

**zamień na:**

```typescript
import { Injectable, Logger } from '@nestjs/common';
import type {
  TransactionalMail,
  TransactionalMailer,
} from '../../domain/transactional-mailer.port';
import { renderTransactionalMail } from './render-transactional-mail';

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
```

Uwaga: wywołanie `renderTransactionalMail` w loggerze gwarantuje, że DX widzi ten sam subject co SMTP i że szablon nie jest „martwy” poza production; pełnego HTML **nie** logujemy (hałas / rozmiar). Raw token i URL **zostają** w logu.

**DoD kroku:**

- `production`: `sendMail` dostaje `html` i `text` + subject PL.
- Poza production: log zawiera kind, to, id, subject PL, `Open: <url>`, `Token: <raw>`.
- Use-case’y invite / resend-invitation / register / resend-activation — **bez** zmian wywołań `mailer.send`.
- Brak EN subject/body jako kanonu produktu.

---

### KROK 4 — Unit renderera + regresja invite / activation

**Status:** `WYKONANY`

**Cel:** Asercja treści poza obowiązkowym T-5 Postman; HTTP D-* bez nowych numerów i bez zmiany envelope. Major HOW-4; `SPEC-TESTY.md` (HTML nie dodaje D-*).

**Artefakty:**

- Nowy: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`
- Regresja (bez nowych D-*): istniejące unit `invite-user` / `resend-invitation` / `register-user` / `resend-activation` + e2e D-23 / D-41…D-46 (smoke adapter logujący) — uruchomić, nie przepisywać asercji HTTP pod HTML.

#### Nowy plik — pełny kod testu

`apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`:

```typescript
import {
  createAccountActivationId,
  createInvitationId,
} from '@content-chain/shared';
import { escapeHtml } from './escape-html';
import { renderTransactionalMail } from './render-transactional-mail';

const INVITE_URL =
  'https://app.example/invite/accept?token=tok_invite_raw_1';
const ACTIVATE_URL =
  'https://app.example/?activationToken=tok_activate_raw_1';

describe('renderTransactionalMail', () => {
  it('renders PL invite mail with html+text, CTA url and Postman token', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_11111111-1111-4111-8111-111111111111',
      ),
      acceptUrl: INVITE_URL,
      rawToken: 'tok_invite_raw_1',
    });

    expect(rendered.subject).toBe('Zaproszenie do Content Chain');
    expect(rendered.html).toContain('Content Chain');
    expect(rendered.html).toContain('Akceptuj zaproszenie');
    expect(rendered.html).toContain(escapeHtml(INVITE_URL));
    expect(rendered.html).toContain(escapeHtml('tok_invite_raw_1'));
    expect(rendered.html).toContain('#39a185');
    expect(rendered.text).toContain(INVITE_URL);
    expect(rendered.text).toContain('Token (np. Postman): tok_invite_raw_1');
    expect(rendered.subject).not.toMatch(/invited|Activate/i);
  });

  it('renders PL activation mail with html+text, CTA url and Postman token', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_activation',
      to: 'newbie@example.com',
      activationId: createAccountActivationId(
        'act_11111111-1111-4111-8111-111111111111',
      ),
      activateUrl: ACTIVATE_URL,
      rawToken: 'tok_activate_raw_1',
    });

    expect(rendered.subject).toBe('Aktywuj konto w Content Chain');
    expect(rendered.html).toContain('Aktywuj konto');
    expect(rendered.html).toContain(escapeHtml(ACTIVATE_URL));
    expect(rendered.html).toContain(escapeHtml('tok_activate_raw_1'));
    expect(rendered.text).toContain(ACTIVATE_URL);
    expect(rendered.text).toContain(
      'Token (np. Postman): tok_activate_raw_1',
    );
  });

  it('escapes html-special characters in injected url and token', () => {
    const evilUrl = 'https://app.example/invite/accept?token=a&b=<x>"';
    const evilToken = 'tok_<raw>&"';
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_22222222-2222-4222-8222-222222222222',
      ),
      acceptUrl: evilUrl,
      rawToken: evilToken,
    });

    expect(rendered.html).not.toContain('<x>');
    expect(rendered.html).toContain(escapeHtml(evilUrl));
    expect(rendered.html).toContain(escapeHtml(evilToken));
  });
});
```

**Regresja (komendy obserwowalne):**

```bash
# z roota monorepo / apps/api — zgodnie z konwencją repo
pnpm --filter api test -- render-transactional-mail
pnpm --filter api test -- invite-user resend-invitation register-user resend-activation
# opcjonalnie e2e smoke auth invite/activation (istniejące D-*) — bez nowych numerów
```

**DoD kroku:**

- Unit renderera zielony: PL subject, html+text, deep link, token Postman, escape, kolor CTA w HTML.
- Istniejące unit use-case mail (mock `mailer.send` z `kind`) zielone — **bez** wymogu asercji HTML w use-case.
- **Brak** nowego D-* HTTP; Postman T-5 bez obowiązku asercji body HTML.
- `graphify update .` po zmianach kodu (sesja implementacji).

---

#### Propozycja commit message

```text
feat(auth): render transactional invite and activation mail as HTML+text

Replace inline English plain bodies with a shared PL shell so SMTP clients get multipart content without changing the mailer port or deep links.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica Faza 25 pokryta | KROK 1–4 = HOW 1–4 major |
| SPEC-AUTH | HTML+text, PL, shell w `mail/`, zakaz React Email / FE / treść w domain; port flow bez zmian |
| SPEC-TESTY | Treść = unit renderera; brak nowych D-*; envelope invite/activation bez regresji |
| docs | Deep linki + token w mailu; kolory z brand_types / globals (HOW hex) |
| Poza zakresem | Brak `user_welcome` / CID / nowych env / zmiany HTTP |
| Typowanie | Jawne typy na granicach (`RenderedMailParts`, `TransactionalMail`); `assertNever`; `import type`; zakaz `any` |
| Nagłówki | wyłącznie `FAZA` / `KROK`; commit message EN Conventional Commits na końcu fazy |

---

## Ślad do major (informacyjnie — po implementacji)

| Element major | Po implementacji tego planu |
|---------------|----------------------------|
| Faza 25 | `WYKONANY` (DoD gate + kod z feature-planu) |
| MILESTONE 25 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 16 / 20 | bez zmian statusów (`WYKONANY`) |
| Faza 26 (`user_welcome`) | nadal `NIE_ROZPOCZĘTY` — osobny feature-plan; reuse shell/renderer |

Ten skill **nie** edytuje major ani nie startuje `/feature-implementation`.
