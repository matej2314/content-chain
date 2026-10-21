# Content Chain — feature plan: copy maili invite/activation (ważność + URL-only)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-25-5-mail-copy-url-only.md`  
**Kotwica major:** Faza 25.5 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 25.5).  
**Numer BE 25.5** = między Fazą 25 a 26; **≠** numery FE.  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/security.md`, `docs/dictionary.md`, `docs/deployment.md`, `SPEC-AUTH.md` (Mailer / Treść maila / zakazy), `SPEC-TESTY.md` (unit renderer; bez nowych D-*), major Faza 25.5.  
**Kolejność `KROK`:** port + helper → fill w use-case’ach → szablony → unit.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 25.5 majoru backend: body invite/activation — PL „Link wygasa po {X}.” z aktualnego `INVITE_TTL` / `ACTIVATION_TTL`; raw token wyłącznie w deep linku; **bez** osobnej linii Postman w body |
| Major | Faza 25.5; start po Fazie 25 (`WYKONANY`); **bez** MILESTONE 25.5; przed HOW Fazy 26 (wspólny shell/port) |
| Refaktor względem | Faza 25 (`WYKONANY`) — szablony HTML+text / shell; historyczny HOW z linią raw w body oraz copy „zgodnie z TTL”. Faza 5 / 16 / 20 — historia (`WYKONANY`), **bez** edycji ich treści w major |
| Poza zakresem | `user_welcome` / CID (major Faza 26); zmiana defaultów TTL / SMTP / deep linków / HTTP Auth; nowe D-*; React Email; i18n poza PL; editor szablonów; major FE |
| Po implementacji (informacyjnie) | Major: Faza 25.5 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 25.5. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW wskazówkowy) | Feature | Zakres |
|-------------------------|---------|--------|
| Pole etykiety ważności + helper z TTL env | FAZA 1 / KROK 1 | port + `formatMailValidityLabel` |
| Fill w application przed renderem | FAZA 1 / KROK 2 | invite / resend-invite / register / resend-activation |
| Szablony: etykieta; bez linii raw | FAZA 1 / KROK 3 | `user-invited` / `user-activation` |
| Unit renderer + helper; DX bez regresji | FAZA 1 / KROK 4 | `*.spec.ts` |

**Pass rozwojowy (sesja planu):**

1. Port `validityLabel` + helper **przed** use-case’ami i szablonami (szablony i fill potrzebują pola).
2. Fill w use-case’ach **przed** szablonami (kontrakt wiadomości kompletny przy pierwszym renderze w testach).
3. Szablony **przed** unitami asercji copy.
4. Testy na końcu (treść = unit; HTTP D-* bez nowych numerów; logging adapter **bez** zmiany DX).
5. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack bez zmian: NestJS 11, istniejący `parseTtlMs` / env `INVITE_TTL` / `ACTIVATION_TTL` (default **`7d`** / **`7d`** — **bez zmian**).
- Port: `rawToken` **zostaje** (DX logger / budowa URL w use-case). Nowe pole: `validityLabel: string` (pełne zdanie PL, gotowe do wstrzyknięcia).
- Deep linki bez regresji: invite `{APP_PUBLIC_URL}/invite/accept?token={raw}`; activation `{APP_PUBLIC_URL}/?activationToken={raw}`.
- Copy: wzorzec **„Link wygasa po {X}.”**; {X} = liczba + odmiana PL jednostek jak parser TTL (`d` / `h` / `m` / domyślnie sekundy). Przykład: `7d` → `Link wygasa po 7 dni.`
- **Zakaz** czytania env / parsowania TTL w plikach szablonów — tylko injection `message.validityLabel`.
- Adapter logujący: kind, to, id, subject, Open URL, Token raw — **bez regresji** (kod adaptera może zostać; nadal bierze `rawToken` z portu).
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Formatowanie TTL PL | SPEC-AUTH + lokalny `parseTtlMs` | Brak nowej zależności npm; jednostki jak istniejący parser | Czysty helper w Auth application; unit własny |
| nodemailer / shell | Faza 25 (`WYKONANY`) | `html`+`text` bez zmian kontraktu | Adaptery **bez** zmian treści poza tym, że renderer dostaje nowe pole |

---

## FAZA 1 — Refaktor copy invite/activation (ważność + URL-only)

Odpowiada major Faza 25.5 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Port `validityLabel` + helper `formatMailValidityLabel`

**Status:** `WYKONANY`

**Cel:** Kontrakt wiadomości i I/O formatowania ważności poza szablonem. Major Faza 25.5 HOW-1; `SPEC-AUTH` Mailer / Treść maila; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/domain/transactional-mailer.port.ts`
- Nowy: `apps/api/src/auth/application/format-mail-validity-label.ts`
- Nowy: `apps/api/src/auth/application/format-mail-validity-label.spec.ts` (można przenieść asercje helpera do KROK 4 — tu lub tam; **wymagane** przed zamknięciem FAZA 1)

#### Refaktor — port

`apps/api/src/auth/domain/transactional-mailer.port.ts`:

**teraz:**

```typescript
export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
};

export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
};
```

**zamień na:**

```typescript
export type UserInvitedMail = {
  kind: 'user_invited';
  to: string;
  invitationId: InvitationId;
  acceptUrl: string;
  rawToken: string;
  /** Full PL sentence, e.g. "Link wygasa po 7 dni." — built in application from INVITE_TTL. */
  validityLabel: string;
};

export type UserActivationMail = {
  kind: 'user_activation';
  to: string;
  activationId: AccountActivationId;
  activateUrl: string;
  rawToken: string;
  /** Full PL sentence — built in application from ACTIVATION_TTL. */
  validityLabel: string;
};
```

#### Nowy plik — pełny kod

`apps/api/src/auth/application/format-mail-validity-label.ts`:

```typescript
/**
 * Builds PL validity copy for invite/activation mails from TTL env strings.
 * Units mirror `parseTtlMs` (`d` / `h` / `m` / default seconds).
 * Templates must only inject the result — no env / TTL parsing in templates.
 */
export function formatMailValidityLabel(ttl: string): string {
  const unit = ttl.at(-1);
  const rawValue = ttl.slice(0, -1);
  const value = Number.parseInt(rawValue, 10);
  const amount = Number.isFinite(value) ? value : Number.NaN;

  let human: string;
  if (!Number.isFinite(amount) || amount < 0) {
    human = ttl;
  } else if (unit === 'd') {
    human = `${amount} ${polishPlural(amount, 'dzień', 'dni', 'dni')}`;
  } else if (unit === 'h') {
    human = `${amount} ${polishPlural(amount, 'godzinę', 'godziny', 'godzin')}`;
  } else if (unit === 'm') {
    human = `${amount} ${polishPlural(amount, 'minutę', 'minuty', 'minut')}`;
  } else {
    // parseTtlMs default: treat whole string as seconds when unit unknown
    const seconds = Number.parseInt(ttl, 10);
    const s = Number.isFinite(seconds) ? seconds : amount;
    human = Number.isFinite(s)
      ? `${s} ${polishPlural(s, 'sekundę', 'sekundy', 'sekund')}`
      : ttl;
  }

  return `Link wygasa po ${human}.`;
}

function polishPlural(
  n: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(n);
  if (abs === 1) {
    return one;
  }
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }
  return many;
}
```

**DoD kroku:**

- Typy `UserInvitedMail` / `UserActivationMail` wymagają `validityLabel`.
- `formatMailValidityLabel('7d') === 'Link wygasa po 7 dni.'` (pokryte unit w KROK 1 lub 4).
- Szablony nadal nie czytają env (helper wyłącznie w application).

---

### KROK 2 — Fill `validityLabel` w use-case’ach przed `mailer.send`

**Status:** `WYKONANY`

**Cel:** Application buduje etykietę z aktualnego env TTL. Major Faza 25.5 HOW-1 (fill); `SPEC-AUTH` — zakaz TTL w szablonach.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/invite-user.use-case.ts`
- Zmiana: `apps/api/src/auth/application/resend-invitation.use-case.ts`
- Zmiana: `apps/api/src/auth/application/register-user.use-case.ts`
- Zmiana: `apps/api/src/auth/application/resend-activation.use-case.ts`

We wszystkich czterech: import `formatMailValidityLabel` z `./format-mail-validity-label` i dopisanie pola przy `mailer.send`.

#### Refaktor — invite

`invite-user.use-case.ts` — blok `mailer.send`:

**teraz:**

```typescript
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
      });
```

**zamień na:**

```typescript
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
        validityLabel: formatMailValidityLabel(this.env.INVITE_TTL),
      });
```

#### Refaktor — resend invitation

`resend-invitation.use-case.ts` — analogicznie:

**teraz:** `rawToken: raw,` (bez `validityLabel`)  
**zamień na:** `rawToken: raw, validityLabel: formatMailValidityLabel(this.env.INVITE_TTL),`

#### Refaktor — register (production activation mail)

`register-user.use-case.ts` — blok `user_activation`:

**teraz:**

```typescript
        await this.mailer.send({
          kind: 'user_activation',
          to: user.email,
          activationId,
          activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${rawToken}`,
          rawToken,
        });
```

**zamień na:**

```typescript
        await this.mailer.send({
          kind: 'user_activation',
          to: user.email,
          activationId,
          activateUrl: `${this.env.APP_PUBLIC_URL ?? ''}/?activationToken=${rawToken}`,
          rawToken,
          validityLabel: formatMailValidityLabel(this.env.ACTIVATION_TTL),
        });
```

#### Refaktor — resend activation

`resend-activation.use-case.ts`:

**teraz:** `rawToken: raw,`  
**zamień na:** `rawToken: raw, validityLabel: formatMailValidityLabel(this.env.ACTIVATION_TTL),`

**DoD kroku:**

- Wszystkie ścieżki `user_invited` / `user_activation` przekazują `validityLabel`.
- Deep linki i `rawToken` **bez regresji**.
- Kompilacja TypeScript przechodzi na call-site’ach `mailer.send` (po KROK 1).

---

### KROK 3 — Szablony: wstrzyknięcie etykiety; usunięcie linii Postman

**Status:** `WYKONANY`

**Cel:** Body produktowe URL-only + ludzka ważność. Major Faza 25.5 HOW-2; `SPEC-AUTH` Treść maila / Nie wolno (osobna linia raw); `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/templates/user-invited.template.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/templates/user-activation.template.ts`

`render-transactional-mail.ts`, `mail-shell.ts`, `logging-mailer.adapter.ts`, `nodemailer-smtp-mailer.adapter.ts` — **bez zmian** (renderer i tak przekazuje całe `message`; logger nadal używa `rawToken`).

#### Refaktor — `user-invited.template.ts` (pełna treść po zmianie)

Zamień plik na:

```typescript
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
```

#### Refaktor — `user-activation.template.ts` (pełna treść po zmianie)

```typescript
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
<p style="margin:0;">Link jest jednorazowy. ${validity}</p>`;

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
      `Link jest jednorazowy. ${message.validityLabel}`,
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
```

**DoD kroku:**

- HTML i text zawierają `validityLabel` / „Link wygasa po”.
- Brak „Token (np. Postman)” i brak osobnej linii wyłącznie z raw poza URL.
- CTA + „skopiuj link” (footer URL) bez regresji kształtu deep linku.
- Szablony **nie** importują `ENV` / `parseTtlMs` / `formatMailValidityLabel`.

---

### KROK 4 — Unit: helper + renderer; DX bez regresji

**Status:** `WYKONANY`

**Cel:** Asercje treści poza T-5 / bez nowych D-*. Major Faza 25.5 HOW-3; `SPEC-TESTY.md` (unit renderer; zakaz wymogu linii Postman).

**Artefakty:**

- Nowy (jeśli nie w KROK 1): `apps/api/src/auth/application/format-mail-validity-label.spec.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`
- Regresja: istniejące unit invite/register/resend — uzupełnij obiekty `send` o `validityLabel` tam, gdzie test buduje pełny `TransactionalMail` / asertuje pola (TypeScript wymusi).
- **Bez** zmian `logging-mailer.adapter.ts` — DX URL + Token raw zostaje; opcjonalnie krótki smoke unit jeśli już istnieje (nie wymagany nowy D-*).

#### Nowy plik — unit helpera

`apps/api/src/auth/application/format-mail-validity-label.spec.ts`:

```typescript
import { formatMailValidityLabel } from './format-mail-validity-label';

describe('formatMailValidityLabel', () => {
  it('formats 7d as PL days', () => {
    expect(formatMailValidityLabel('7d')).toBe('Link wygasa po 7 dni.');
  });

  it('formats 1d as singular day', () => {
    expect(formatMailValidityLabel('1d')).toBe('Link wygasa po 1 dzień.');
  });

  it('formats hours and minutes with PL inflection', () => {
    expect(formatMailValidityLabel('2h')).toBe('Link wygasa po 2 godziny.');
    expect(formatMailValidityLabel('1h')).toBe('Link wygasa po 1 godzinę.');
    expect(formatMailValidityLabel('5m')).toBe('Link wygasa po 5 minut.');
  });
});
```

#### Refaktor — `render-transactional-mail.spec.ts`

**teraz → zamień na** (pełny plik po zmianie):

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
const VALIDITY = 'Link wygasa po 7 dni.';

describe('renderTransactionalMail', () => {
  it('renders PL invite mail with validity label and CTA url (URL-only raw)', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_11111111-1111-4111-8111-111111111111',
      ),
      acceptUrl: INVITE_URL,
      rawToken: 'tok_invite_raw_1',
      validityLabel: VALIDITY,
    });

    expect(rendered.subject).toBe('Zaproszenie do Content Chain');
    expect(rendered.html).toContain('Content Chain');
    expect(rendered.html).toContain('Akceptuj zaproszenie');
    expect(rendered.html).toContain(escapeHtml(INVITE_URL));
    expect(rendered.html).toContain(escapeHtml(VALIDITY));
    expect(rendered.html).toContain('#39a185');
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(INVITE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
    expect(rendered.subject).not.toMatch(/invited|Activate/i);
  });

  it('renders PL activation mail with validity label and CTA url (URL-only raw)', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_activation',
      to: 'newbie@example.com',
      activationId: createAccountActivationId(
        'act_11111111-1111-4111-8111-111111111111',
      ),
      activateUrl: ACTIVATE_URL,
      rawToken: 'tok_activate_raw_1',
      validityLabel: VALIDITY,
    });

    expect(rendered.subject).toBe('Aktywuj konto w Content Chain');
    expect(rendered.html).toContain('Aktywuj konto');
    expect(rendered.html).toContain(escapeHtml(ACTIVATE_URL));
    expect(rendered.html).toContain(escapeHtml(VALIDITY));
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(ACTIVATE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
  });

  it('escapes html-special characters in injected url and validity label', () => {
    const evilUrl = 'https://app.example/invite/accept?token=a&b=<x>"';
    const evilValidity = 'Link wygasa po <script>1d</script>.';
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_22222222-2222-4222-8222-222222222222',
      ),
      acceptUrl: evilUrl,
      rawToken: 'tok_<raw>&"',
      validityLabel: evilValidity,
    });

    expect(rendered.html).not.toContain('<script>');
    expect(rendered.html).toContain(escapeHtml(evilUrl));
    expect(rendered.html).toContain(escapeHtml(evilValidity));
  });
});
```

**Uwaga implementacyjna:** raw nadal występuje **wewnątrz** URL deep linku w HTML/text — to zamierzone. Zakaz dotyczy osobnej linii „Token (np. Postman): …”, nie obecności tokenu w query.

**DoD kroku:**

- Unit helpera + renderera zielone.
- Brak nowych D-* / zmian T-5.
- Logging DX: nadal loguje Open URL + Token raw (regresja ręczna / istniejący unit adaptera jeśli jest — **bez** obowiązku nowego pliku).
- Unit use-case’ów Auth (invite/register/resend) kompilują się i przechodzą po uzupełnieniu `validityLabel` w fixture’ach.

---

#### Propozycja commit message

```text
refactor(auth): use URL-only mail copy with TTL validity labels

Invite/activation bodies drop the Postman raw line and inject a PL
"Link wygasa po …" label built from INVITE_TTL / ACTIVATION_TTL in application.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kanon docs/SPEC | Body bez linii Postman; ważność z TTL; `rawToken` na porcie; zakaz TTL w szablonach |
| Deep linki | Bez zmiany kształtu URL |
| Default env | `7d` / `7d` nietknięte |
| Testy | Unit helper + renderer; **bez** nowych D-* |
| DX | Logging adapter: kind, to, id, subject, URL, Token raw |
| Poza zakresem | Brak `user_welcome`; brak zmian HTTP/SMTP/FE |

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego planu |
|---------|------------------------------|
| Faza 25.5 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 25.5 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 25 / 5 / 16 / 20 | bez zmian (`WYKONANY`) |
| Faza 26 | nadal `NIE_ROZPOCZĘTY` (odblokowana kolejnością po 25.5) |

Edycja major **poza** tą sesją / tym skillem.
