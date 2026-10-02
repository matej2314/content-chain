# Content Chain — feature plan: Faza 11 (UX błędów accept-invite bez enumeracji)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Publiczny `/invite/accept?token=`: błąd kolizji email i nieważny token = ten sam kanał **401** na karcie; brak UI „email zajęty” / gałęzi **409**; stała PL dla **401**; bez Toastera |
| Major | `content-chain-frontend_major_plan.md` — **Faza 11** (gate normy, bez kroków kodu w majorze). **Bez** MILESTONE 11. **Nie** mylić z backend Fazą 11 (twardy zapis kontekstu) |
| Ten plik | `FAZA 1` (porządkowa = cała major Faza 11) |
| Kolejność KROK ≠ major | Major nie ma 11.1/11.2 — `KROK` = HOW implementacji UI |
| Źródła | `docs/ux_dashboard.md` (accept-invite / błędy), `docs/security.md`, `docs/dokumentacja_komunikacji.md` (`POST /auth/accept-invite`), `SPEC-FRONTEND.md` F-8 / „Nie wolno”, `SPEC-AUTH.md` A-7b, `SPEC-BEZPIECZENSTWO.md` B-8, `SPEC-KOMUNIKACJA.md` K-2f |
| Zależność api | Kontrakt z docs/SPEC; implementacja BE = `feature-plans/content-chain_feature_plan_faza-15-anti-enumeration-accept-invite.md`. FE **nie** implementuje Nest/Prisma |
| Refaktor względem | Faza 1 / Krok 1.3 (`WYKONANY`) — publiczny accept z historycznym założeniem **409** „email zajęty”. MILESTONE 1 = historia. Kanon = aktualne docs/SPEC, **nie** treść Kroku 1.3 |
| Poza zakresem | Kod BE; widok Użytkownicy / create invite; Toaster na tej trasie; Playwright; nowa paleta; `tsconfig`; edycja major/docs/SPEC; rozróżnianie przyczyn 401 po `code` |
| Po implementacji (informacyjnie) | Major FE: Faza 11 → `WYKONANY` (DoD gate + ten HOW). Brak `MILESTONE` 11. **Edycja major poza tym skillem.** |

**Pass rozwojowy:** brak przesunięć — KROK 2 tylko nadpisuje `message` przy **401** / `UNAUTHORIZED` w helperze z KROK 1; formularz nie dodaje drugiej ścieżki błędów.

**HOW:** jeden helper mapujący `unknown` → envelope na karcie; **zakaz** gałęzi `CONFLICT` / „Email already in use” / „email zajęty”; copy PL dla wszystkich 401 jednakowe; dziedziczenie karty Fazy 1.

**Design Read:** self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify; VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; dziedziczenie locku Fazy 1 (`content-chain-product-ui`) — **bez** nowej palety na `/invite/accept`.

**Typy:** granice propsów `readonly`; brak `any` / nieuzasadnionych `as`; `import type` gdzie tylko typy. `tsconfig` **bez zmian**.

**Grandfathering docs (sesja):** `docs/README.md` bez frontmatteru — potwierdzona stara dokumentacja; nie dopisywano metadanych.

---

## Założenia

- Fazy 1–10 majoru FE i milestony 1–6 = historia. Ten wycinek **nie** przepisuje Fazy 1 / Kroku 1.3 / MILESTONE 1.
- Happy path **bez zmian:** `acceptInvite` → `router.replace('/')`; **bez** Set-Cookie po accept; dashboard dopiero po loginie.
- Błędy API na karcie: wyłącznie `EnvelopeError` (`code` + `message`) — **bez** `notifyProduct` / Toaster (kanon Fazy 3.6 / F-7: toaster tylko po sesji).
- Kolizja email i nieważny / zużyty / revoked / wygasły token przychodzą z API jako **401** `UNAUTHORIZED` (ten sam `code` + kanoniczny `message` BE). UI **nie** buduje osobnego copy „email zajęty”.
- **Zakaz** gałęzi UI na `status === 409`, `code === 'CONFLICT'`, stringach „Email already in use” / „email zajęty” na tej trasie.
- **400** `VALIDATION_FAILED` (hasło poza polityką API) → envelope as-is na karcie (obok lokalnego hintu polityki przed requestem).
- KROK 2: dla **każdego** **401** / `UNAUTHORIZED` `message` na karcie = stała PL (bez rozróżniania przyczyn). `code` z envelope zostaje (nadal `UNAUTHORIZED` — bez leaku).
- Do czasu wdrożenia BE Fazy 15 API może jeszcze zwrócić historyczne **409** — FE **nie** maskuje go osobną gałęzią „email zajęty”; pokazuje envelope as-is (bez dedykowanego copy). Po BE 15 kolizja = 401 → stała PL.
- Skill UI: wyłącznie dziedziczenie Card / FormField / Button z locku Fazy 1.

### Biblioteki / API

| Temat | Źródło | Decyzja |
|-------|--------|---------|
| `ApiError` / envelope | Istniejący `@/shared/api/envelope` | `instanceof ApiError` → `status` + `envelope.code` / `message`; bez nowych parserów |
| React form state | Istniejący wzorzec `AcceptInviteForm` / login card | `useState` + `FormEvent`; bez nowych zależności |
| Toast / Sonner | — | **Nie** montować Toastera na `/invite/accept`; **nie** wołać `notifyProduct` |
| Visual | `content-chain-product-ui` | Dziedziczenie locku; karta `max-w-md`, `shadow-none`, `text-muted-foreground` jak dziś |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**. Brak nowych API bibliotek w wycinku — research Context7 zbędny.

---

## FAZA 1 — UX błędów accept-invite bez enumeracji

Odpowiada major **Faza 11**.

---

### KROK 1 — Helper mapowania błędu + `AcceptInviteForm` bez gałęzi enumeracji

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna ścieżka błędów API na karcie accept-invite: envelope as-is; **brak** UI rozróżniającego kolizję email od nieważnego tokenu. Major Faza 11 HOW #1–2; `SPEC-FRONTEND.md` F-8; `docs/ux_dashboard.md`; `SPEC-AUTH.md` A-7b.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/accept-invite-form-error.ts`
- Zmiana: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`

Kolejność w kroku: helper → podpięcie w `onSubmit` catch.

#### Nowy plik — `accept-invite-form-error.ts`

```typescript
import { ApiError } from '@/shared/api/envelope';

export type AcceptInviteFormError = {
  readonly code: string;
  readonly message: string;
};

/**
 * Mapuje błąd accept-invite na envelope karty.
 * Anti-enumeration (Faza 11 / A-7b): bez gałęzi CONFLICT / „email zajęty”.
 * Kolizja email i zły token = ten sam kanał 401 — copy PL nadpisuje KROK 2.
 */
export function toAcceptInviteFormError(reason: unknown): AcceptInviteFormError {
  if (reason instanceof ApiError) {
    // Świadomie: brak branchy na status 409 / code CONFLICT / message „already in use”.
    return {
      code: reason.envelope.code,
      message: reason.envelope.message,
    };
  }
  return {
    code: 'INTERNAL_ERROR',
    message: 'Nie udało się odczytać odpowiedzi.',
  };
}
```

#### Refaktor — `accept-invite-form.tsx` (catch + import)

**teraz:**

```typescript
import { ApiError } from '@/shared/api/envelope';
import { acceptInvite } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
```

**zamień na:**

```typescript
import { acceptInvite } from '@/modules/auth/api/auth.api';
import { toAcceptInviteFormError } from '@/modules/auth/accept-invite-form-error';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
```

**teraz** (`catch`):

```typescript
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
```

**zamień na:**

```typescript
    } catch (reason: unknown) {
      setError(toAcceptInviteFormError(reason));
    } finally {
```

Reszta formularza **bez zmian:** lokalny hint polityki hasła, `EnvelopeError`, Card layout, brak Toastera, sukces → `router.replace('/')`.

**DoD kroku:**

- Catch używa wyłącznie `toAcceptInviteFormError` — w pliku formularza **brak** `CONFLICT`, `409`, „email zajęty”, „already in use”.
- **400** / inne `ApiError` → `code` + `message` z envelope na karcie.
- Brak `notifyProduct` / importu Sonnera na tej powierzchni.
- `acceptInvite` + happy path / brak tokenu w URL — bez regresji.

---

### KROK 2 — Stała PL dla każdego 401 / `UNAUTHORIZED`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jednolity komunikat PL przy nieważnym zaproszeniu **i** kolizji email (oba **401**), bez leak z API i bez rozróżniania przyczyn po `code`. Major Faza 11 (opcjonalna stała); `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-8.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/accept-invite-form-error.ts`

#### Refaktor — nadpisanie `message` przy 401

**teraz** (ciało `toAcceptInviteFormError` po KROK 1):

```typescript
export function toAcceptInviteFormError(reason: unknown): AcceptInviteFormError {
  if (reason instanceof ApiError) {
    // Świadomie: brak branchy na status 409 / code CONFLICT / message „already in use”.
    return {
      code: reason.envelope.code,
      message: reason.envelope.message,
    };
  }
  return {
    code: 'INTERNAL_ERROR',
    message: 'Nie udało się odczytać odpowiedzi.',
  };
}
```

**zamień na:**

```typescript
/** Jednolity copy PL dla każdego 401 na accept-invite — bez rozróżniania przyczyn. */
export const ACCEPT_INVITE_UNAUTHORIZED_HINT =
  'Nie można dokończyć zaproszenia. Skontaktuj się z administratorem.';

export function toAcceptInviteFormError(reason: unknown): AcceptInviteFormError {
  if (reason instanceof ApiError) {
    // Świadomie: brak branchy na status 409 / code CONFLICT / message „already in use”.
    if (reason.status === 401 || reason.envelope.code === 'UNAUTHORIZED') {
      return {
        code: reason.envelope.code,
        message: ACCEPT_INVITE_UNAUTHORIZED_HINT,
      };
    }
    return {
      code: reason.envelope.code,
      message: reason.envelope.message,
    };
  }
  return {
    code: 'INTERNAL_ERROR',
    message: 'Nie udało się odczytać odpowiedzi.',
  };
}
```

**Uwagi:**

- Warunek łączy `status === 401` **lub** `code === 'UNAUTHORIZED'` — jeden tekst dla obu; **nie** ma osobnego case na kolizję vs token.
- Historyczne **409** (przed BE Fazą 15): nadal as-is z API (bez stałej PL i bez copy „email zajęty” z FE) — nie budujemy drugiej gałęzi enumeracji.
- `VALIDATION_FAILED` (**400**) nadal pokazuje `message` z API.

**DoD kroku:**

- Każdy `ApiError` z 401 / `UNAUTHORIZED` → `EnvelopeError` z `code` z API i `message === ACCEPT_INVITE_UNAUTHORIZED_HINT`.
- Brak osobnego tekstu dla kolizji email.
- KROK 1 DoD nadal spełnione (brak gałęzi CONFLICT w formularzu).

---

#### Propozycja commit message

```text
feat(auth): unify accept-invite errors without email enumeration

Show the same card channel for 401 unauthorized invite outcomes and replace
the API message with a single PL hint so collision cannot be told from a bad token.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica | Major FE Faza 11 pokryta HOW (helper + stała PL + zakaz 409-UI) |
| Docs / SPEC | Zgodność z `ux_dashboard` / F-8 / A-7b / B-8 / K-2f — bez dublowania rozdziałów |
| Kod nowych plików | `accept-invite-form-error.ts` kompletny w planie |
| Refaktory | Fragmenty `teraz` → `zamień na` w formularzu i helperze |
| Pass rozwojowy | Brak przesunięć (zapisane w Meta) |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Commit | Jedna propozycja EN Conventional Commits na końcu FAZA 1 |
| Statusy | `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC | Nietknięte w tej sesji |
| Visual | Dziedziczenie `content-chain-product-ui`; bez Toastera |
| Sekrety | Brak |

**Checklist ręczna po implementacji (poza tą sesją):**

1. Zły / brakujący token → **401** → karta: `UNAUTHORIZED` + stała PL.
2. (Gdy BE Faza 15 wdrożona) ważny token + zajęty email → **401** → **ten sam** wygląd co pkt 1; Invitation `revoked` po stronie API.
3. Hasło poza polityką lokalnie → hint pola; poza A-5 z API → **400** envelope as-is.
4. Sukces → `/` bez sesji; brak toastu na `/invite/accept`.
5. W kodzie FE accept-invite: zero gałęzi `CONFLICT` / „email zajęty”.

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po HOW |
|---------|--------|
| `content-chain-frontend_major_plan.md` Faza 11 | `WYKONANY` (DoD gate + ten feature plan) |
| MILESTONE 11 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1 / Krok 1.3 / MILESTONE 1 | bez zmian (historia) |
| Backend Faza 15 / feature-plan BE | osobny ślad; ten plik ich **nie** oznacza |

Edycja major **poza** tym skillem (zwykle po `/feature-implementation`, gdy użytkownik tak zdecyduje).
