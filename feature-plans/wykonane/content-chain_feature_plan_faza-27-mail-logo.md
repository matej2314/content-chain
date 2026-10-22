# Content Chain — feature plan: logotyp PNG (CID) w headerze shella maili (Faza 27)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-27-mail-logo.md`  
**Kotwica major:** Faza 27 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 27).  
**Numer BE 27 ≠ FE** — montaż wyłącznie w Auth `infrastructure/mail/` (nie React Email, nie sidebar / landing).  
**Źródła:** `docs/brand_types.md` (marka wizualna w shellu), `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/architektura_katalogi_pliki.md`, `SPEC-AUTH.md` (Treść maila / shell / CID), `SPEC-TESTY.md` (unit renderer: logo CID vs string marki; poza T-5), `SPEC-README.md`, major Faza 27.  
**Kolejność** `KROK`**:** asset+resolver → shell HTML → merge attachments w rendererze → unit.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 27 majoru backend: w headerze wspólnego shella HTML wszystkich kinds slot brandu = logotyp PNG (CID); plain text / subject / copy body = string „Content Chain” bez regresji |
| Major | Faza 27; start po Fazach 1–26 / 25.5 / 25.6 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 27 |
| Refaktor względem | Faza 25 (`WYKONANY`) — tekstowy wordmark w headerze HTML; Faza 26 (`WYKONANY`) — CID zrzutów `user_welcome` (ta faza **rozszerza** CID o markę w shellu dla **wszystkich** kinds — **bez** przepisywania Fazy 26 w major). **Bez** edycji treści / statusów tych faz w major |
| Poza zakresem | Podmiana „Content Chain” w subjectach / prozie body / plaintext na obraz; light-logo; React Email / FE / sidebar / landing; nowa paleta / tokeny CSS; nowe env SMTP; osobny BC „Email”; MILESTONE 27; major FE; przepisywanie Faz 25–26 |
| Po implementacji (informacyjnie) | Major: Faza 27 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 27. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW) | Feature | Zakres |
|-------------|---------|--------|
| Asset logotypu + CID w `infrastructure/mail/` | FAZA 1 / KROK 1 | plik PNG + `brand-cid-attachments.ts` |
| Montaż w wspólnym shellu HTML; `alt` / szerokość / `cid:` | FAZA 1 / KROK 2 | `wrapMailHtml` |
| Wszystkie kinds przez jeden shell; merge CID | FAZA 1 / KROK 3 | `renderTransactionalMail` |
| Unit renderer: logo CID vs string plain text | FAZA 1 / KROK 4 | `render-transactional-mail.spec.ts` |

**Pass rozwojowy (sesja planu):**

1. Asset + stała `cid` **przed** `<img src="cid:…">` w shellu.
2. Shell **przed** merge attachments (HTML bez załącznika = broken image w SMTP).
3. Merge w centralnym rendererze **przed** testami (invite/activation/welcome muszą dostać brand CID bez duplikacji w każdym szablonie).
4. Testy na końcu.
5. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

**Decyzje HOW (domknięte w sesji planu — docs/SPEC nie pinują ścieżki / cid / szerokości):**

| Temat | Decyzja |
|-------|---------|
| Asset | Kopia wizualna `apps/frontend/public/content-chain-logo-transparent.png` (intrinsic **530×275**, RGBA) → `apps/api/src/auth/infrastructure/mail/assets/brand/content-chain-logo-transparent.png` |
| `cid` | `brand-logo@content-chain` |
| Szerokość HTML | `width="160"`; `style="max-width:100%;height:auto;display:block;"` |
| `alt` | `Content Chain` |
| Merge CID | w `renderTransactionalMail`: zawsze prepend `resolveBrandCidAttachments()`; welcome = brand + 2 zrzuty (kolejność: brand, login, runs) |
| Plain text | **bez zmian** — pierwsza linia string „Content Chain” |
| `nest-cli.json` | glob `auth/infrastructure/mail/assets/**/*` już istnieje (Faza 26) — **bez** zmiany, o ile asset leży pod `assets/` |

---

## Założenia

- Stack bez zmian: NestJS 11, nodemailer `^10` (`apps/api`), monorepo; **bez** nowego npm (zakaz React Email).
- Shell / paleta / `escapeHtml` / szablony kinds / CID welcome z Faz 25–26 — **reuse**; ten wycinek zmienia **tylko** slot brandu HTML + wspólny załącznik marki.
- Port `TransactionalMail` / use-case’y / HTTP Auth — **bez zmian**.
- Env: wyłącznie istniejące `SMTP_*` / `MAIL_FROM` / `APP_PUBLIC_URL` — **bez** nowych zmiennych.
- CID wyłącznie w `infrastructure/mail/` — **zakaz** montażu w domain / use-case.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| nodemailer 10 CID | Context7 `/nodemailer/nodemailer-homepage` (attachments / embedded-images) + `apps/api` `nodemailer ^10` | `attachments: [{ filename, path, cid }]`, HTML `<img src="cid:…">`; przy image+cid Nodemailer ustawia `Content-Disposition: inline` | Adapter SMTP już mapuje `attachments` z renderera (Faza 26) — **bez** zmiany adaptera, o ile renderer zawsze zwraca brand CID |
| React Email | SPEC-AUTH zakaz | — | **Nie** dodawać |
| Nest assets | `apps/api/nest-cli.json` | `auth/infrastructure/mail/assets/**/*` kopiowane do `dist` | Nowy katalog `assets/brand/` objęty istniejącym globem |

---

## FAZA 1 — Logotyp CID w headerze shella maili

Odpowiada major Faza 27 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Asset PNG + resolver CID marki

**Status:** `WYKONANY`

**Cel:** Lokalny plik logotypu + helper ścieżek CID w I/O mail, obok assets welcome. Major HOW-1; `docs/brand_types.md`; `docs/architektura_katalogi_pliki.md`; `SPEC-AUTH.md` (Lokalizacja I/O / CID).

**Artefakty:**

- Nowy (binarny): `apps/api/src/auth/infrastructure/mail/assets/brand/content-chain-logo-transparent.png`
- Nowy: `apps/api/src/auth/infrastructure/mail/brand-cid-attachments.ts`

#### Asset (kopiowanie)

```bash
mkdir -p apps/api/src/auth/infrastructure/mail/assets/brand
cp apps/frontend/public/content-chain-logo-transparent.png \
  apps/api/src/auth/infrastructure/mail/assets/brand/content-chain-logo-transparent.png
```

Plik musi pozostać PNG RGBA, intrinsic **530×275** (tożsamość wizualna z FE public). **Bez** rekompresji „na oko” zmieniającej wymiary.

#### Nowy plik — kompletny kod

`apps/api/src/auth/infrastructure/mail/brand-cid-attachments.ts`:

```typescript
import { join } from 'node:path';
import type { MailCidAttachment } from './templates/user-invited.template';

/**
 * Inline CID asset for the shared mail shell brand mark — paths relative to
 * this module (src/ and dist/ when nest-cli copies assets).
 */
const ASSETS_DIR = join(__dirname, 'assets', 'brand');

export const BRAND_CID = {
  logo: 'brand-logo@content-chain',
} as const;

export function resolveBrandCidAttachments(): readonly MailCidAttachment[] {
  return [
    {
      filename: 'content-chain-logo-transparent.png',
      path: join(ASSETS_DIR, 'content-chain-logo-transparent.png'),
      cid: BRAND_CID.logo,
    },
  ];
}
```

**DoD kroku:**

- Plik PNG istnieje pod `assets/brand/` (530×275).
- `BRAND_CID.logo === 'brand-logo@content-chain'`.
- `resolveBrandCidAttachments()` zwraca jeden wpis z `path` wskazującym na ten PNG.
- `nest-cli` assets glob obejmuje nową ścieżkę **bez** edycji `nest-cli.json` (weryfikacja: ścieżka pod `auth/infrastructure/mail/assets/`).

---

### KROK 2 — Refaktor `wrapMailHtml`: slot brandu = `<img cid:>`

**Status:** `WYKONANY`

**Cel:** Header HTML = logotyp CID (`alt` = marka); plain text bez regresji. Major HOW-2; `docs/brand_types.md`; `SPEC-AUTH.md` Treść maila.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/mail-shell.ts`

#### Refaktor — `teraz` → `zamień na`

`apps/api/src/auth/infrastructure/mail/mail-shell.ts` — importy + fragment headera w `wrapMailHtml`.

**teraz (importy):**

```typescript
import { MAIL_PALETTE } from './mail-palette';
import { escapeHtml } from './escape-html';
```

**zamień na (importy):**

```typescript
import { BRAND_CID } from './brand-cid-attachments';
import { escapeHtml } from './escape-html';
import { MAIL_PALETTE } from './mail-palette';
```

**teraz (slot brandu w HTML):**

```typescript
          <tr>
            <td style="padding:24px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:${p.primary};">
              Content Chain
            </td>
          </tr>
```

**zamień na (slot brandu w HTML):**

```typescript
          <tr>
            <td style="padding:24px 28px 8px 28px;">
              <img src="cid:${BRAND_CID.logo}" alt="Content Chain" width="160" style="max-width:100%;height:auto;display:block;" />
            </td>
          </tr>
```

`wrapMailText` — **bez zmian** (pierwsza linia nadal `'Content Chain'`).

**DoD kroku:**

- HTML shell zawiera `src="cid:brand-logo@content-chain"` oraz `alt="Content Chain"`.
- W slocie headera **brak** tekstowego wordmarku uppercase jako jedynej formy brandu.
- `<title>Content Chain</title>` oraz string marki w body szablonów — dozwolone / bez regresji.
- Plain text: pierwsza linia nadal `Content Chain`.

---

### KROK 3 — Montaż załącznika marki dla wszystkich kinds

**Status:** `WYKONANY`

**Cel:** Każdy kind przez wspólny shell dostaje brand CID w `attachments`; welcome zachowuje zrzuty. Major HOW-3; `SPEC-AUTH.md` (wszystkie kinds / CID w I/O).

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.ts`
- **Bez** zmiany: `nodemailer-smtp-mailer.adapter.ts` (już mapuje `attachments`), `logging-mailer.adapter.ts`, szablony invite/activation/welcome (welcome nadal zwraca tylko zrzuty — merge w rendererze)

#### Refaktor — `teraz` → `zamień na`

`apps/api/src/auth/infrastructure/mail/render-transactional-mail.ts` — cały plik logicznie:

**teraz:**

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

**zamień na:**

```typescript
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
```

**DoD kroku:**

- `user_invited` / `user_activation`: `attachments.length === 1`, `cid === 'brand-logo@content-chain'`.
- `user_welcome`: `attachments.length === 3`; kolejność cid: `brand-logo@content-chain`, `welcome-login@content-chain`, `welcome-runs@content-chain`.
- Adapter SMTP **bez** diffu funkcjonalnego (korzysta z `rendered.attachments`).
- Domain / use-case **nie** importują `brand-cid-attachments` ani renderer.

---

### KROK 4 — Unit renderer: logo CID vs string marki w plain text

**Status:** `WYKONANY`

**Cel:** Asercje zgodne z `SPEC-TESTY.md` / `SPEC-AUTH.md` — logotyp CID w HTML **nie** zastępuje stringa marki w plain text; sam tekst w headerze HTML **nie** jest wystarczającym kanonem. **Bez** nowych D-* / zmian T-5.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`

#### Refaktor — `teraz` → `zamień na` (fragmenty asercji)

Po renderze invite (istniejący test PL invite) — **dopisz** asercje brandu (obok istniejących):

**dopisz:**

```typescript
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.html).toMatch(
      /<img[^>]+src="cid:brand-logo@content-chain"[^>]+alt="Content Chain"/,
    );
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(1);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
```

Po renderze activation — **dopisz** analogicznie:

```typescript
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(1);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
```

W teście welcome — **zamień** asercje attachments:

**teraz:**

```typescript
    expect(rendered.attachments).toHaveLength(2);
    expect(rendered.attachments?.[0]?.cid).toBe('welcome-login@content-chain');
    expect(rendered.attachments?.[1]?.cid).toBe('welcome-runs@content-chain');
```

**zamień na:**

```typescript
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(3);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
    expect(rendered.attachments?.[1]?.cid).toBe('welcome-login@content-chain');
    expect(rendered.attachments?.[2]?.cid).toBe('welcome-runs@content-chain');
```

Regresje: validity / URL-only / escape / brak linii Postman / subjecty PL — **bez osłabienia**.

**DoD kroku:**

- Unit green: invite + activation + welcome asertują logo CID w HTML i string marki na starcie plain text.
- Welcome: 3 CID (brand + 2 zrzuty).
- **Bez** nowych identyfikatorów D-* HTTP; T-5 nietknięte.

---

#### Propozycja commit message

```text
feat(auth): embed brand logo as CID in transactional mail shell header

Replace the HTML text wordmark with the shared PNG mark for every mail kind
while keeping the plain-text brand string unchanged.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major | Faza 27 pokryta (asset, shell, wszystkie kinds, unit) |
| docs / SPEC | Header HTML = logotyp CID; plain text string; dark panel; bez light-logo; CID tylko I/O |
| Kod nowych plików | `brand-cid-attachments.ts` kompletny; PNG skopiowany |
| Refaktory | Fragmenty `teraz → zamień na` (shell + renderer + spec) |
| Pass rozwojowy | Asset → shell → merge → testy; brak przesunięć między fazami major |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | jeden EN Conventional Commits na końcu FAZA 1 |
| Major / docs / SPEC | **nietknięte** w tej sesji |
| Plany pomocnicze w rootcie | **brak odwołań** w tym pliku |
| Statusy kroków | startowo `NIE_ROZPOCZĘTY` |

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po implementacji (poza tym skillem) |
|---------|-------------------------------------|
| Faza 27 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 27 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 25 / 25.5 / 25.6 / 26 | pozostają `WYKONANY` — **bez** przepisywania |
| Milestone 1–6 / 4.2 / 4.3 | bez zmian (`OSIĄGNIĘTY`) |
| Major FE | bez zmian |
