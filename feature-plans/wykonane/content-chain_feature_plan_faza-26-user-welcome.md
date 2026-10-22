# Content Chain — feature plan: powitalny mail `user_welcome` po activate (Faza 26)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-26-user-welcome.md`  
**Kotwica major:** Faza 26 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 26).  
**Numer BE 26 ≠ FE** — welcome wyłącznie w Auth `infrastructure/mail/` + `ActivateAccountUseCase` (nie React Email, nie FE).  
**Źródła:** `docs/dokumentacja_koncepcyjna.md`, `docs/dokumentacja_komunikacji.md`, `docs/deployment.md`, `docs/architektura.md`, `docs/architektura_katalogi_pliki.md`, `docs/security.md`, `docs/anty_patterny.md`, `docs/dictionary.md`, `SPEC-AUTH.md` (A-12 / Mailer / Kinds / `user_welcome`), `SPEC-KOMUNIKACJA.md` (K-2h), `SPEC-TESTY.md` (D-41 / D-45 — bez wymogu SMTP welcome; unit renderer poza T-5), major Faza 26.  
**Kolejność** `KROK`**:** port → szablon+CID+renderer → adaptery → use-case best-effort → unit / regresja.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 26 majoru backend: kind `user_welcome` po udanym `POST /auth/activate`; PL HTML+text we wspólnym shellu Fazy 25; CID w I/O; best-effort; pola `email` / `appPublicUrl` / `login`; odbiorcy `user` \| `guest` |
| Major | Faza 26; start po Fazach 1–25.6 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 26 |
| Refaktor względem | Faza 16 (`ActivateAccountUseCase` bez maila po sukcesie); Faza 5 / 25 (port / shell bez `user_welcome`); Faza 25.5 (wspólna powierzchnia mail I/O — bez zmiany semantyki welcome). **Bez** edycji treści tych faz w major |
| Poza zakresem | Welcome przy invite / accept-invite / bootstrap / register poza activate / soft-delete / reaktywacji; nowe env SMTP; osobny BC „Email”; React Email / FE; fail activate / **503** `MAIL_DELIVERY_FAILED` przez pad welcome; token/hasło w treści; MILESTONE 26; major FE; legalizacja szablonów (Faza 25); odmiana ważności invite (Faza 25.6) |
| Po implementacji (informacyjnie) | Major: Faza 26 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 26. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW) | Feature | Zakres |
|-------------|---------|--------|
| Unia kinds + szablon HTML+text | FAZA 1 / KROK 1–2 | port + template + assets CID + renderer |
| CID w I/O; SMTP / logging | FAZA 1 / KROK 3 | Nodemailer `attachments` + Logging bez tokenu |
| Best-effort po activate | FAZA 1 / KROK 4 | `ActivateAccountUseCase` |
| Unit / regresja D-* | FAZA 1 / KROK 5 | renderer + use-case; **bez** nowych D-* |

**Pass rozwojowy (sesja planu):**

1. Port `UserWelcomeMail` **przed** szablonem i `switch` w rendererze.
2. Szablon + ścieżki CID **przed** adapterami (SMTP musi dostać `attachments`).
3. Adaptery **przed** / równolegle z use-case — use-case woła tylko port; semantyka send musi znać kind.
4. Use-case: send **po** `consumeAndVerify`, w `try/catch` — błąd **nie** wychodzi na zewnątrz.
5. Testy na końcu (treść / CID = unit; HTTP D-41/D-45 bez asercji dostawy welcome).
6. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

**Decyzje HOW (domknięte w sesji planu — docs/SPEC nie pinują copy ani listy plików):**

| Temat | Decyzja |
|-------|---------|
| Subject | `Witamy w Content Chain` |
| Body | Podziękowanie + 3 ścieżki UI (logowanie, kontekst firmy, runy) + CTA „Zaloguj się” |
| `login` | `{APP_PUBLIC_URL}/` (landing + modal auth — kanon wejścia FE) |
| CID | **2** zrzuty: `welcome-login.png`, `welcome-runs.png`; cid `welcome-login@content-chain`, `welcome-runs@content-chain` |
| Placeholdery PNG | Minimalne poprawne PNG w repo (wymienne później na prawdziwe zrzuty UI) — **bez** nowych env |
| Trigger | Po **każdym** udanym activate dla `role ∈ { user, guest }` (łańcuch activation istnieje w `production`; poza prod activate zwykle nie występuje). **Bez** osobnego checku `NODE_ENV` na welcome — adapter logujący obsługuje DX |
| Admin | **Nie** wysyłać (defense in depth; bootstrap nie idzie przez activate) |

---

## Założenia

- Stack bez zmian: NestJS 11, nodemailer `^10` (`@types/nodemailer` `^8`), monorepo; **bez** nowego npm (zakaz React Email).
- Shell / paleta / `escapeHtml` / `renderTransactionalMail` z Fazy 25 — **reuse**; ten wycinek dodaje kind + CID, nie przepisuje layoutu invite/activation.
- Port: use-case przekazuje tylko `kind` + pola; HTML/text/CID **wyłącznie** w `infrastructure/mail/`.
- Deep linki invite/activation **bez regresji**; welcome **bez** tokenu w URL ani body.
- Env: wyłącznie istniejące `SMTP_*` / `MAIL_FROM` / `APP_PUBLIC_URL` — **bez** nowych zmiennych.
- `nest-cli.json` `compilerOptions.assets` musi kopiować PNG do `dist` (dziś tylko `**/*.prompt.md`).
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| nodemailer 10 CID | Context7 `/nodemailer/nodemailer-homepage` (attachments / embedded-images) + `apps/api` `nodemailer ^10` | `attachments: [{ filename, path, cid }]`, HTML `<img src="cid:…">`; przy image+cid Nodemailer ustawia `Content-Disposition: inline` | SMTP adapter dokłada `attachments` z renderera tylko dla `user_welcome` |
| React Email | SPEC-AUTH zakaz | — | **Nie** dodawać |
| Nest assets | `nest-cli.json` | `assets` kopiowane do `dist` | Dodać glob PNG pod `mail/assets/` |

---

## FAZA 1 — Powitalny mail `user_welcome` po activate

Odpowiada major Faza 26 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Port: `UserWelcomeMail` + unia `TransactionalMail`

**Status:** `WYKONANY`

**Cel:** Rozszerzyć kontrakt portu o kind `user_welcome` z polami injection ze SPEC (`email`, `appPublicUrl`, `login`). Major Faza 26 HOW-1; `SPEC-AUTH.md` Mailer / Kinds / A-12.

**Artefakty:**

- Zmiana: `apps/api/src/auth/domain/transactional-mailer.port.ts`

#### Refaktor — `teraz` → `zamień na`

`apps/api/src/auth/domain/transactional-mailer.port.ts` — po typie `UserActivationMail`, przed `TransactionalMail`:

**teraz:**

```typescript
export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
  validityLabel: string;
};

export type TransactionalMail = UserInvitedMail | UserActivationMail;
```

**zamień na:**

```typescript
export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
  validityLabel: string;
};

export type UserWelcomeMail = {
  kind: 'user_welcome';
  to: string;
  email: string;
  appPublicUrl: string;
  login: string;
};

export type TransactionalMail =
  | UserInvitedMail
  | UserActivationMail
  | UserWelcomeMail;
```

**DoD kroku:**

- Unia `TransactionalMail` obejmuje `user_welcome`.
- Brak pól tokenu / hasła / `validityLabel` na welcome (nie dotyczy).
- `tsc` / IDE: miejsca ze `switch` / zawężeniem kind **muszą** dostać gałąź w KROK 2–3 (oczekiwany błąd kompilacji do domknięcia w kolejnych krokach — OK).

---

### KROK 2 — Szablon HTML+text + assety CID + renderer

**Status:** `WYKONANY`

**Cel:** Treść PL + `<img src="cid:…">` + metadane załączników; `renderTransactionalMail` obsługuje nowy kind. Major HOW-1 / HOW-3; `SPEC-AUTH` Treść / CID; `docs/architektura_katalogi_pliki.md`.

**Artefakty:**

- Nowy: `apps/api/src/auth/infrastructure/mail/templates/user-welcome.template.ts`
- Nowy: `apps/api/src/auth/infrastructure/mail/welcome-cid-attachments.ts`
- Nowe (binarne placeholdery):  
  - `apps/api/src/auth/infrastructure/mail/assets/welcome/welcome-login.png`  
  - `apps/api/src/auth/infrastructure/mail/assets/welcome/welcome-runs.png`
- Zmiana: `apps/api/src/auth/infrastructure/mail/templates/user-invited.template.ts` (typ `RenderedMailParts` — opcjonalne `attachments`)
- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.ts`
- Zmiana: `apps/api/nest-cli.json` (`assets` — kopiowanie PNG)

#### Typ `RenderedMailParts` — rozszerzenie

W `user-invited.template.ts` (**teraz**):

```typescript
export type RenderedMailParts = {
  subject: string;
  html: string;
  text: string;
};
```

**zamień na:**

```typescript
export type MailCidAttachment = {
  filename: string;
  path: string;
  cid: string;
};

export type RenderedMailParts = {
  subject: string;
  html: string;
  text: string;
  attachments?: readonly MailCidAttachment[];
};
```

Invite / activation **bez** pola `attachments` (jak dziś).

#### Nowy plik — `welcome-cid-attachments.ts` (pełny kod)

```typescript
import { join } from 'node:path';
import type { MailCidAttachment } from './templates/user-invited.template';

/**
 * Inline CID assets for user_welcome — paths resolved relative to this module
 * (works from src/ and from dist/ when nest-cli copies assets).
 */
const ASSETS_DIR = join(__dirname, 'assets', 'welcome');

export const WELCOME_CID = {
  login: 'welcome-login@content-chain',
  runs: 'welcome-runs@content-chain',
} as const;

export function resolveWelcomeCidAttachments(): readonly MailCidAttachment[] {
  return [
    {
      filename: 'welcome-login.png',
      path: join(ASSETS_DIR, 'welcome-login.png'),
      cid: WELCOME_CID.login,
    },
    {
      filename: 'welcome-runs.png',
      path: join(ASSETS_DIR, 'welcome-runs.png'),
      cid: WELCOME_CID.runs,
    },
  ];
}
```

#### Placeholdery PNG (artefakty binarne)

Przy implementacji utwórz **oba** pliki jako poprawne PNG (wystarczy minimalny 1×1 albo mały zrzut UI). Przykład generatora (jednorazowo w shellu implementacji — **nie** commitować skryptu, chyba że zespół chce):

```bash
node -e "
const fs=require('fs');
const path=require('path');
const dir='apps/api/src/auth/infrastructure/mail/assets/welcome';
fs.mkdirSync(dir,{recursive:true});
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==','base64');
for (const name of ['welcome-login.png','welcome-runs.png']) {
  fs.writeFileSync(path.join(dir,name), png);
}
"
```

Późniejsza zamiana na prawdziwe zrzuty UI = ten sam path / cid — **bez** zmiany kodu szablonu.

#### Nowy plik — `user-welcome.template.ts` (pełny kod)

```typescript
import { escapeHtml } from '../escape-html';
import { MAIL_PALETTE } from '../mail-palette';
import {
  wrapMailHtml,
  wrapMailText,
  type MailShellContent,
  type MailShellTextContent,
} from '../mail-shell';
import {
  resolveWelcomeCidAttachments,
  WELCOME_CID,
} from '../welcome-cid-attachments';
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
  <li style="margin-bottom:8px;"><strong>Kontekst firmy</strong> — uzupełnij dane firmy (wymagane przed startem runów; edycja tylko dla admina).</li>
  <li style="margin-bottom:8px;"><strong>Runy</strong> — uruchamiaj pipeline Social / Content i śledź postęp na liście runów.</li>
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
      '2. Kontekst firmy — uzupełnij dane firmy (wymagane przed startem runów; edycja tylko dla admina).',
      '3. Runy — uruchamiaj pipeline Social / Content i śledź postęp na liście runów.',
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
```

#### Refaktor — `render-transactional-mail.ts`

**teraz:**

```typescript
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
```

**zamień na:**

```typescript
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
 * Builds subject + html + text (+ optional CID attachments) from port fields
 * before SMTP / logging send. Domain / use-case must not import this module.
 */
export function renderTransactionalMail(
  message: TransactionalMail,
): RenderedMailParts {
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
}
```

#### Refaktor — `nest-cli.json`

**teraz:**

```json
"assets": ["**/*.prompt.md"],
```

**zamień na:**

```json
"assets": [
  "**/*.prompt.md",
  "auth/infrastructure/mail/assets/**/*"
],
```

(`sourceRoot` = `src` — ścieżka względna do `src/`.)

**DoD kroku:**

- `renderTransactionalMail({ kind: 'user_welcome', … })` zwraca subject PL, HTML z `cid:welcome-login@content-chain` / `cid:welcome-runs@content-chain`, plain text bez tokenu, `attachments.length === 2`.
- PNG istnieją pod `mail/assets/welcome/`.
- `nest build` kopiuje assety do `dist/auth/infrastructure/mail/assets/welcome/`.

---

### KROK 3 — Adaptery: Nodemailer CID + Logging bez tokenu

**Status:** `WYKONANY`

**Cel:** SMTP wysyła `html` + `text` + `attachments` (CID); adapter logujący DX dla welcome **bez** linii Token. Major HOW-3; `SPEC-AUTH` Mailer DX; Context7 CID.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/nodemailer-smtp-mailer.adapter.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/logging-mailer.adapter.ts`

#### Refaktor — Nodemailer

**teraz** (`send`):

```typescript
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

**zamień na:**

```typescript
  async send(message: TransactionalMail): Promise<void> {
    const rendered = renderTransactionalMail(message);
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html,
      attachments: rendered.attachments?.map((item) => ({
        filename: item.filename,
        path: item.path,
        cid: item.cid,
      })),
    });
  }
```

#### Refaktor — Logging

**teraz:**

```typescript
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
```

**zamień na:**

```typescript
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
```

**DoD kroku:**

- Invite/activation: DX **bez regresji** (Open URL + Token raw).
- Welcome: log kind / to / email / subject / Open login — **bez** `Token:`.
- SMTP: przy welcome `sendMail` dostaje `attachments` z `cid` (weryfikacja unit mockiem transportera **opcjonalna**; minimum = kompilacja + ścieżka kodu).

---

### KROK 4 — `ActivateAccountUseCase`: send best-effort

**Status:** `WYKONANY`

**Cel:** Po sukcesie activate wysłać `user_welcome` dla `user` \| `guest`; pad SMTP **nie** zmienia wyniku. Major HOW-2 / HOW-4; `SPEC-AUTH` A-12; `SPEC-KOMUNIKACJA` K-2h; `docs/security.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/activate-account.use-case.ts`

#### Refaktor — pełny plik docelowy

```typescript
import { Inject, Injectable, Logger } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  ACCOUNT_ACTIVATION_REPOSITORY,
  type AccountActivationRepository,
} from '../domain/account-activation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { hashRefreshToken } from './auth.helpers';
import { activateAccountSchema } from './auth.schemas';
import type { UserId, UserRole } from '@content-chain/shared';

export type ActivateAccountOutput = {
  user: { id: UserId; email: string; role: UserRole };
};

@Injectable()
export class ActivateAccountUseCase {
  private readonly logger = new Logger(ActivateAccountUseCase.name);

  constructor(
    @Inject(ACCOUNT_ACTIVATION_REPOSITORY)
    private readonly activations: AccountActivationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(input: unknown): Promise<ActivateAccountOutput> {
    const command = parseWithZod(activateAccountSchema, input);
    const tokenHash = hashRefreshToken(command.token);
    const activation = await this.activations.findValidByTokenHash(
      tokenHash,
      new Date(),
    );
    if (!activation) {
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid activation token',
        401,
      );
    }

    const user = await this.activations.consumeAndVerify(
      activation.userId,
      new Date(),
    );

    if (user.role === 'user' || user.role === 'guest') {
      const appPublicUrl = this.env.APP_PUBLIC_URL ?? '';
      const login = `${appPublicUrl}/`;
      try {
        await this.mailer.send({
          kind: 'user_welcome',
          to: user.email,
          email: user.email,
          appPublicUrl,
          login,
        });
      } catch (error: unknown) {
        const detail =
          error instanceof Error ? error.message : 'unknown mailer error';
        this.logger.warn(
          `user_welcome delivery failed to=${user.email}: ${detail}`,
        );
      }
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
```

**Uwagi:**

- **Zakaz** mapowania catch na `DomainException('MAIL_DELIVERY_FAILED', …)`.
- Brak welcome dla `admin` (gałąź `if` pomija).
- Nest DI: `TRANSACTIONAL_MAILER` i `ENV` już w `AuthModule` — konstruktor use-case dostanie je automatycznie (bez zmiany providera, o ile use-case jest w `providers`).

**DoD kroku:**

- Sukces activate → wywołanie `mailer.send({ kind: 'user_welcome', … })` dla `user`/`guest`.
- Odrzucenie mailera → nadal zwracany `{ user }` (bez throw).
- Brak send przy `role === 'admin'`.
- Pola send: `email`, `appPublicUrl`, `login` — **bez** tokenu aktywacji.

---

### KROK 5 — Unit renderer / use-case; regresja D-*

**Status:** `WYKONANY`

**Cel:** Asercje treści / CID / best-effort poza T-5; D-41 / D-45 **bez** wymogu dostarczonego welcome. Major HOW-5; `SPEC-TESTY.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`
- Zmiana: `apps/api/src/auth/application/activate-account.use-case.spec.ts`

#### Dopisek — `render-transactional-mail.spec.ts`

Dodać case (obok istniejących):

```typescript
  it('renders PL welcome mail with CID refs and without activation token', () => {
    const login = 'https://app.example/';
    const rendered = renderTransactionalMail({
      kind: 'user_welcome',
      to: 'newbie@example.com',
      email: 'newbie@example.com',
      appPublicUrl: 'https://app.example',
      login,
    });

    expect(rendered.subject).toBe('Witamy w Content Chain');
    expect(rendered.html).toContain('Witamy na pokładzie');
    expect(rendered.html).toContain(escapeHtml('newbie@example.com'));
    expect(rendered.html).toContain('cid:welcome-login@content-chain');
    expect(rendered.html).toContain('cid:welcome-runs@content-chain');
    expect(rendered.html).toContain(escapeHtml(login));
    expect(rendered.html).not.toMatch(/activationToken/i);
    expect(rendered.text).toContain('newbie@example.com');
    expect(rendered.text).toContain(login);
    expect(rendered.text).not.toMatch(/activationToken/i);
    expect(rendered.attachments).toHaveLength(2);
    expect(rendered.attachments?.[0]?.cid).toBe('welcome-login@content-chain');
    expect(rendered.attachments?.[1]?.cid).toBe('welcome-runs@content-chain');
  });
```

#### Refaktor — `activate-account.use-case.spec.ts` (fragmenty)

Na górze pliku (wzorzec jak `register-user.use-case.spec.ts`): `validateEnv` + `BASE_ENV_FIELDS` z `APP_PUBLIC_URL: 'https://app.example.com'`; `const TEST_ENV = validateEnv({ NODE_ENV: 'test', ...BASE_ENV_FIELDS })`.

Helper:

```typescript
function unusedMailer(
  overrides: Partial<TransactionalMailer> = {},
): TransactionalMailer {
  return {
    send: jest.fn(async () => undefined),
    ...overrides,
  };
}
```

Importy: `validateEnv` / `type Env` z `../../shared/config/env`; `type { TransactionalMailer }` z portu.

1. Wszystkie istniejące `new ActivateAccountUseCase(...)` → 3 argumenty: `(activations, unusedMailer(), TEST_ENV)`.

**teraz** (wzorzec wywołań):

```typescript
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
    );
```

**zamień na** (happy path + mail OK):

```typescript
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );
```

2. Po happy path dodać asercję:

```typescript
    expect(mailer.send).toHaveBeenCalledTimes(1);
    expect(mailer.send).toHaveBeenCalledWith({
      kind: 'user_welcome',
      to: USER_EMAIL,
      email: USER_EMAIL,
      appPublicUrl: 'https://app.example.com',
      login: 'https://app.example.com/',
    });
```

3. Nowy test — best-effort:

```typescript
  it('returns success when user_welcome mailer fails (best-effort; A-12)', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt }),
    );
    const mailer = unusedMailer({
      send: jest.fn(async () => {
        throw new Error('SMTP down');
      }),
    });
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await expect(useCase.execute({ token: RAW_TOKEN })).resolves.toEqual({
      user: {
        id: USER_ID,
        email: USER_EMAIL,
        role: 'user',
      },
    });
    expect(mailer.send).toHaveBeenCalledTimes(1);
  });
```

4. Nowy test — guest dostaje welcome; admin nie:

```typescript
  it('sends user_welcome for guest role', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt, role: 'guest' }),
    );
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await useCase.execute({ token: RAW_TOKEN });
    expect(mailer.send).toHaveBeenCalledTimes(1);
  });

  it('does not send user_welcome for admin role', async () => {
    const findValidByTokenHash = jest.fn(
      async (): Promise<AccountActivationRecord | null> => makeActivation(),
    );
    const consumeAndVerify = jest.fn(
      async (_userId: typeof USER_ID, verifiedAt: Date): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt, role: 'admin' }),
    );
    const mailer = unusedMailer();
    const useCase = new ActivateAccountUseCase(
      unusedActivations({ findValidByTokenHash, consumeAndVerify }),
      mailer,
      TEST_ENV,
    );

    await useCase.execute({ token: RAW_TOKEN });
    expect(mailer.send).not.toHaveBeenCalled();
  });
```

5. Pozostałe case’y (UNAUTHORIZED / VALIDATION) — ten sam konstruktor z `unusedMailer()` + `TEST_ENV` (send nie musi być wołany).

**Regresja HTTP:** istniejące e2e / Postman D-41 / D-45 — **bez** nowych numerów D-*; **bez** asercji sukcesu SMTP welcome. Ręcznie: pad mailera w teście unit (powyżej) wystarcza na best-effort.

**DoD kroku:**

- Unit renderer + activate zielone.
- Brak nowych D-* / zmian obowiązkowego T-5.
- Invite/activation renderer specs **bez regresji**.

---

#### Propozycja commit message

```text
feat(auth): send best-effort user_welcome mail after activate

After a successful account activation, notify user|guest with a PL HTML+text
welcome (CID screenshots in mail I/O) without failing the activate response.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kanon docs/SPEC | `user_welcome` tylko po activate; PL; CID w I/O; pola bez tokenu/hasła; odbiorcy `user`\|`guest`; best-effort |
| Envelope activate | Pad SMTP → nadal **200**; **bez** `MAIL_DELIVERY_FAILED` / **503** |
| Env | Brak nowych zmiennych; `APP_PUBLIC_URL` jak dziś |
| Testy | Unit renderer (CID / subject) + use-case best-effort; D-41/D-45 bez wymogu dostawy |
| Shell Fazy 25 | Reuse `mail-shell` / paleta; invite/activation bez regresji copy 25.5/25.6 |
| Poza zakresem | Brak welcome poza activate; brak React Email / FE; brak MILESTONE 26 |

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego planu |
|---------|------------------------------|
| Faza 26 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 26 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 5 / 16 / 25 / 25.5 / 25.6 | bez zmian (`WYKONANY`) |

Edycja major **poza** tą sesją / tym skillem.
`)
