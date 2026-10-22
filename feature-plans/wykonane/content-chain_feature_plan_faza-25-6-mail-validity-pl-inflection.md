# Content Chain — feature plan: poprawna odmiana PL ważności invite/activation

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-25-6-mail-validity-pl-inflection.md`  
**Kotwica major:** Faza 25.6 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 25.6).  
**Numer BE 25.6** = między Fazą 25.5 a 26; **≠** numery FE.  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/deployment.md`, `SPEC-AUTH.md` (Mailer / Treść maila), `SPEC-TESTY.md` (unit renderer; bez nowych D-*), `SPEC-README.md`, major Faza 25.6.  
**Kolejność `KROK`:** helper (pełne zdanie + miejscownik) → szablony (tylko inject) → unit.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 25.6 majoru backend: body invite/activation — **jedno** zdanie PL **„Link jest jednorazowy i wygasa po {X}.”**; {X} w **miejscowniku** (np. `7d` → „7 dniach”); `validityLabel` = **pełne** to zdanie; szablon tylko inject |
| Major | Faza 25.6; start po Fazie 25.5 (`WYKONANY`); **bez** MILESTONE 25.6; **obok** Fazy 26 (nie blokuje welcome) |
| Refaktor względem | Faza 25.5 (`WYKONANY`) — kanon „Link wygasa po {X}.” / przykład dopełniacza (`7d` → „7 dni”); `validityLabel` jako fragment czasu + osobne „Link jest jednorazowy.” w szablonie. Faza 25 / 5 / 16 / 20 — historia (`WYKONANY`), **bez** edycji ich treści w major |
| Baseline `teraz` | Stan **HEAD / Faza 25.5** (`formatMailValidityLabel` → `Link wygasa po ${human}.`; szablony z prefiksem „Link jest jednorazowy.”). Lokalny WIP z formułą „po upływie …” **odrzucić** — docs/SPEC **zakazują** tego obejścia |
| Poza zakresem | `user_welcome` / CID (major Faza 26); zmiana defaultów TTL / SMTP / deep linków / HTTP Auth; nowe D-*; React Email; i18n poza PL; editor szablonów; major FE; przepisywanie Fazy 25.5 w major |
| Po implementacji (informacyjnie) | Major: Faza 25.6 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 25.6. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (HOW wskazówkowy) | Feature | Zakres |
|-------------------------|---------|--------|
| Helper pełne zdanie + miejscownik; fill już istnieje | FAZA 1 / KROK 1 | `formatMailValidityLabel` (+ unit helper) |
| Szablony: tylko inject etykiety | FAZA 1 / KROK 2 | `user-invited` / `user-activation` |
| Unit helper + renderer; DX bez regresji | FAZA 1 / KROK 3 | `*.spec.ts` (helper, renderer, asercje `validityLabel` w use-case specs) |

**Pass rozwojowy (sesja planu):**

1. Helper **przed** szablonami (szablon musi dostać pełne zdanie; inaczej na chwilę dubluje „jednorazowy”).
2. Szablony **przed** unitami asercji copy.
3. Testy na końcu (treść = unit; **bez** nowych D-*; logging adapter / `rawToken` / URL-only — **bez regresji**).
4. Fill w use-case’ach **bez** osobnego kroku — już wołają `formatMailValidityLabel`; zmienia się tylko wynik stringa + oczekiwania w specs.
5. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack bez zmian: NestJS 11; parser TTL jak `parseTtlMs` (`d` / `h` / `m` / default sekundy); env `INVITE_TTL` / `ACTIVATION_TTL` default **`7d`** / **`7d`** — **bez zmian**.
- Port `TransactionalMail` / `validityLabel: string` / `rawToken` — **bez zmian kontraktu** (semantyka etykiety: pełne zdanie zamiast fragmentu czasu).
- Deep linki bez regresji: invite `{APP_PUBLIC_URL}/invite/accept?token={raw}`; activation `{APP_PUBLIC_URL}/?activationToken={raw}`.
- Copy kanoniczne: **„Link jest jednorazowy i wygasa po {X}.”**; {X} = liczba + **miejscownik** jednostki. Przykład: `7d` → `Link jest jednorazowy i wygasa po 7 dniach.`
- **Zakaz** formuły „po upływie …” jako obejścia przypadka gramatycznego.
- **Zakaz** czytania env / parsowania TTL w szablonach — tylko injection `message.validityLabel`.
- Adapter logujący: kind, to, id, subject, Open URL, Token raw — **bez regresji**.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Odmiana PL TTL | SPEC-AUTH + `docs/dokumentacja_komunikacji.md` | Brak nowej zależności npm; jednostki jak `parseTtlMs` | Czysty helper w Auth application; unit własny |
| nodemailer / shell | Faza 25 / 25.5 (`WYKONANY`) | `html`+`text` bez zmian kontraktu I/O | Adaptery **bez** zmian; zmienia się tylko string etykiety i inject w szablonach |

---

## FAZA 1 — Poprawna odmiana PL ważności invite/activation

Odpowiada major Faza 25.6 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Helper `formatMailValidityLabel`: pełne zdanie + miejscownik

**Status:** `WYKONANY`

**Cel:** Application zwraca `validityLabel` = pełne „Link jest jednorazowy i wygasa po {X}.” z {X} w miejscowniku. Major Faza 25.6 HOW-1; `SPEC-AUTH` Treść maila; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/format-mail-validity-label.ts`
- Zmiana: `apps/api/src/auth/application/format-mail-validity-label.spec.ts` (asercje helpera — tu lub domknięte w KROK 3; **wymagane** przed zamknięciem FAZA 1)

#### Refaktor — helper (pełny plik)

`apps/api/src/auth/application/format-mail-validity-label.ts`:

**teraz (Faza 25.5 / HEAD):**

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
  amount: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(amount);
  if (abs === 1) return one;
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }

  return many;
}
```

**zamień na (pełny plik):**

```typescript
/**
 * Builds PL validity copy for invite/activation mails from TTL env strings.
 * Units mirror `parseTtlMs` (`d` / `h` / `m` / default seconds).
 * Returns the full sentence with locative after "po" (e.g. 7d → "… po 7 dniach.").
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
    // Locative: 1 → dniu; 2+ → dniach (few/many identical in locative plural).
    human = `${amount} ${polishPlural(amount, 'dniu', 'dniach', 'dniach')}`;
  } else if (unit === 'h') {
    human = `${amount} ${polishPlural(amount, 'godzinie', 'godzinach', 'godzinach')}`;
  } else if (unit === 'm') {
    human = `${amount} ${polishPlural(amount, 'minucie', 'minutach', 'minutach')}`;
  } else {
    // parseTtlMs default: treat whole string as seconds when unit unknown
    const seconds = Number.parseInt(ttl, 10);
    const s = Number.isFinite(seconds) ? seconds : amount;
    human = Number.isFinite(s)
      ? `${s} ${polishPlural(s, 'sekundzie', 'sekundach', 'sekundach')}`
      : ttl;
  }

  return `Link jest jednorazowy i wygasa po ${human}.`;
}

function polishPlural(
  amount: number,
  one: string,
  few: string,
  many: string,
): string {
  const abs = Math.abs(amount);
  if (abs === 1) return one;
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }

  return many;
}
```

**Typy:** sygnatura publiczna bez zmian — `(ttl: string) => string`. Bez branded TTL (jak w 25.5); string env pozostaje źródłem prawdy.

**DoD kroku:**

- `formatMailValidityLabel('7d') === 'Link jest jednorazowy i wygasa po 7 dniach.'`
- `formatMailValidityLabel('1d') === 'Link jest jednorazowy i wygasa po 1 dniu.'`
- Brak „po upływie” / dopełniacza „7 dni” / „1 dzień” w wyniku helpera.
- Use-case’e nadal wołają helper (bez zmiany wire) — string w `mailer.send` zmienia się automatycznie.

---

### KROK 2 — Szablony: tylko inject `validityLabel`

**Status:** `WYKONANY`

**Cel:** Body bez osobnego prefiksu „Link jest jednorazowy.” — pełne zdanie przychodzi z application. Major Faza 25.6 HOW-2; `SPEC-AUTH` — szablon tylko inject.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/mail/templates/user-invited.template.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/templates/user-activation.template.ts`

#### Refaktor — invite HTML + text

`user-invited.template.ts`:

**teraz:**

```typescript
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymujesz zaproszenie do aplikacji <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby ustawić hasło i dołączyć do zespołu.</p>
<p style="margin:0;">Link jest jednorazowy. ${validity}</p>`;
```

oraz w `bodyLines`:

```typescript
      `Link jest jednorazowy. ${message.validityLabel}`,
```

**zamień na:**

```typescript
  const bodyHtml = `<p style="margin:0 0 12px 0;">Otrzymujesz zaproszenie do aplikacji <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby ustawić hasło i dołączyć do zespołu.</p>
<p style="margin:0;">${validity}</p>`;
```

oraz:

```typescript
      message.validityLabel,
```

#### Refaktor — activation HTML + text

`user-activation.template.ts`:

**teraz:**

```typescript
  const bodyHtml = `<p style="margin:0 0 12px 0;">Dziękujemy za rejestrację w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.</p>
<p style="margin:0;">Link jest jednorazowy. ${validity}</p>`;
```

oraz w `bodyLines`:

```typescript
      `Link jest jednorazowy. ${message.validityLabel}`,
```

**zamień na:**

```typescript
  const bodyHtml = `<p style="margin:0 0 12px 0;">Dziękujemy za rejestrację w <strong>Content Chain</strong>.</p>
<p style="margin:0 0 12px 0;">Kliknij przycisk poniżej, aby aktywować konto. Po aktywacji możesz się zalogować.</p>
<p style="margin:0;">${validity}</p>`;
```

oraz:

```typescript
      message.validityLabel,
```

**DoD kroku:**

- W HTML/text invite i activation: **jedno** wystąpienie „jednorazowy” pochodzi wyłącznie z `validityLabel`.
- Szablony **nie** czytają env / nie parsują TTL.
- `escapeHtml(message.validityLabel)` w HTML bez zmian semantyki.

---

### KROK 3 — Unit helper + renderer + regresja asercji `validityLabel`

**Status:** `WYKONANY`

**Cel:** Asercje kanonu pełnego zdania + miejscownika; regresja fill w use-case specs; **bez** nowych D-*. Major Faza 25.6 HOW-3; `SPEC-TESTY.md`.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/format-mail-validity-label.spec.ts`
- Zmiana: `apps/api/src/auth/infrastructure/mail/render-transactional-mail.spec.ts`
- Zmiana: `apps/api/src/auth/application/invite-user.use-case.spec.ts`
- Zmiana: `apps/api/src/auth/application/resend-invitation.use-case.spec.ts`
- Zmiana: `apps/api/src/auth/application/register-user.use-case.spec.ts`
- Zmiana: `apps/api/src/auth/application/resend-activation.use-case.spec.ts`

#### Refaktor — unit helper (pełny plik)

`format-mail-validity-label.spec.ts`:

**zamień na:**

```typescript
import { formatMailValidityLabel } from './format-mail-validity-label';

describe('formatMailValidityLabel', () => {
  it('formats 7d as full sentence with locative days', () => {
    expect(formatMailValidityLabel('7d')).toBe(
      'Link jest jednorazowy i wygasa po 7 dniach.',
    );
  });

  it('formats 1d as singular locative day', () => {
    expect(formatMailValidityLabel('1d')).toBe(
      'Link jest jednorazowy i wygasa po 1 dniu.',
    );
  });

  it('formats hours and minutes with PL locative', () => {
    expect(formatMailValidityLabel('2h')).toBe(
      'Link jest jednorazowy i wygasa po 2 godzinach.',
    );
    expect(formatMailValidityLabel('1h')).toBe(
      'Link jest jednorazowy i wygasa po 1 godzinie.',
    );
    expect(formatMailValidityLabel('5m')).toBe(
      'Link jest jednorazowy i wygasa po 5 minutach.',
    );
    expect(formatMailValidityLabel('1m')).toBe(
      'Link jest jednorazowy i wygasa po 1 minucie.',
    );
  });

  it('formats bare seconds with PL locative', () => {
    expect(formatMailValidityLabel('30')).toBe(
      'Link jest jednorazowy i wygasa po 30 sekundach.',
    );
    expect(formatMailValidityLabel('1')).toBe(
      'Link jest jednorazowy i wygasa po 1 sekundzie.',
    );
  });

  it('does not use "po upływie" workaround', () => {
    expect(formatMailValidityLabel('7d')).not.toContain('upływie');
  });
});
```

#### Refaktor — renderer fixture

`render-transactional-mail.spec.ts`:

**teraz:**

```typescript
const VALIDITY = 'Link wygasa po 7 dni.';
```

oraz w teście escape:

```typescript
    const evilValidity = 'Link wygasa po <script>1d</script>.';
```

**zamień na:**

```typescript
const VALIDITY = 'Link jest jednorazowy i wygasa po 7 dniach.';
```

oraz:

```typescript
    const evilValidity =
      'Link jest jednorazowy i wygasa po <script>1d</script>.';
```

Istniejące asercje `toContain(escapeHtml(VALIDITY))` / `not.toContain('Token (np. Postman)')` — **zostają**. Opcjonalnie (zalecane): `expect(rendered.html).toContain('Link jest jednorazowy i wygasa po')` oraz `expect(rendered.html).not.toMatch(/Link jest jednorazowy\.\s*Link jest/)`.

#### Refaktor — use-case specs (oczekiwany `validityLabel`)

We wszystkich czterech plikach asercji `mailer.send` / `toHaveBeenCalledWith`:

**teraz (przykład HEAD):**

```typescript
      validityLabel: 'Link wygasa po 7 dni.',
```

**zamień na:**

```typescript
      validityLabel: 'Link jest jednorazowy i wygasa po 7 dniach.',
```

Pliki: `invite-user.use-case.spec.ts`, `resend-invitation.use-case.spec.ts`, `register-user.use-case.spec.ts`, `resend-activation.use-case.spec.ts` (wszystkie wystąpienia tej etykiety przy default TTL `7d`).

**DoD kroku:**

- Unit helper zielony dla `7d` / `1d` / `h` / `m` / sekund oraz zakazu „upływie”.
- Unit renderer: pełny wzorzec ważności + deep link; **bez** linii Postman.
- Use-case specs: oczekiwany `validityLabel` = pełne zdanie z miejscownikiem.
- **Brak** nowych D-* HTTP; DX logger (`rawToken`, Open URL) nietknięty.

---

#### Propozycja commit message

```text
fix(auth): use locative PL validity sentence in invite/activation mails

Make validityLabel the full "Link jest jednorazowy i wygasa po {X}." with
locative units so templates only inject one sentence.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|---------------|
| Kanon docs/SPEC | Body = jedno zdanie z miejscownikiem; bez „po upływie”; bez drugiego „Link jest jednorazowy.” w szablonie |
| Helper | `7d` → `… po 7 dniach.`; `1d` → `… po 1 dniu.` |
| Port / fill | Wire use-case’ów bez zmian; tylko wynik stringa |
| URL-only / DX | `rawToken` + logging adapter bez regresji |
| Testy | Unit helper + renderer + regresja use-case specs; **zero** nowych D-* |
| Poza zakresem | Brak Fazy 26 / welcome / zmian TTL defaults / FE |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego wycinka |
|---------|-------------------------------|
| Faza 25.6 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 25.6 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 25.5 / 25 / 5 / 16 / 20 | bez zmian (`WYKONANY`) |
| Faza 26 | bez zmiany statusu (nadal `NIE_ROZPOCZĘTY` lub jak w major) |

Edycja major **poza** tą sesją feature planu (ręcznie lub w `/feature-implementation` na życzenie użytkownika).
