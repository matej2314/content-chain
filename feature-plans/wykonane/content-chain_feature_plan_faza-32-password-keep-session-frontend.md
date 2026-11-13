# Content Chain — feature plan: keep-session UX po zmianie hasła (FE Faza 32)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-32-password-keep-session-frontend.md`  
**Kotwica major:** Faza 32 w `content-chain-frontend_major_plan.md` (gate — HOW w tym pliku).  
**Refaktor względem:** Faza 31 / Krok 31.2 (`WYKONANY` — sukces hasła → `clear()` + `router.replace('/')`). Faza 31 **bez** edycji treści / statusów.  
**Źródła:** `docs/ux_dashboard.md` (Hasło V1), `SPEC-FRONTEND.md` F-8, `SPEC-AUTH.md` A-3d, `SPEC-KOMUNIKACJA.md` K-2d.  
**Zależność api:** `content-chain-backend_major_plan.md` Faza 33 (rotacja cookie) — **osobny tor**; ten plan **nie** implementuje BE.  
**Pass rozwojowy:** brak przesunięć — jedna powierzchnia `AccountPasswordForm`.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Sukces `PATCH /auth/me/password` → zamknięcie modala + toast + zostań na `/account` |
| Major | FE Faza 32 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY`); **bez** MILESTONE 32 |
| Poza zakresem | BE Faza 33; delete own / confirm e-mail; dual-mode / i18n; forgot-password; nowa paleta; suite unit FE (repo FE bez test runnera) |
| Po implementacji (informacyjnie) | Major FE Faza 32 → `WYKONANY`. Brak `OSIĄGNIĘTY` |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| FE Faza 32 | FAZA 1 / KROK 1 | UX keep-session w modalu hasła |

---

## Założenia

- Stack: Next.js **16.3.0**, React **19.2.8**, `sonner` **^2.0.8** przez istniejący `notifyProduct` — **bez** nowych paczek.
- Toast = `notifyProduct({ kind: 'success', title, id })` (jak email pending / start run) — **nie** surowy `toast()` w komponencie Konta.
- Sesja: cookie httpOnly rotuje BE — FE **nie** woła `clear()` i **nie** nawiguje na `/` na happy path hasła.
- `INVALID_PASSWORD` / `VALIDATION_FAILED` / Anuluj — **bez zmian** sensu.
- Usuń konto nadal `clear()` + `router.replace('/')` — **nie ruszać**.
- Powierzchnia: `content-chain-product-ui` — dziedziczenie Dialog / FormField / dark shell; **bez** nowej palety.
- Brak `*.test.tsx` / skryptu `test` w `apps/frontend` — DoD bez nowego harnessu testowego.

---

## Biblioteki / API

| Temat | Ustalenie | Skąd |
|-------|-----------|------|
| Toast produktowy | `notifyProduct` → `sonner` `toast(title, { id })` | repo `notify-product.tsx`; sonner 2.x |
| Modal | istniejący `Dialog` / `DialogContent` | repo |
| Sesja | `useSession()` — po sukcesie hasła **bez** `clear` | repo |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC** (F-8).

---

## FAZA 1 — Keep-session UX po zmianie hasła

Odpowiada major FE **Faza 32** (HOW).

---

### KROK 1 — `AccountPasswordForm`: toast + zostań na Koncie

**Status:** `WYKONANY`

**Cel:** Happy path hasła = zamknięcie modala + toast sukcesu + brak wylogowania / landingu. Major FE Faza 32 pkt 1–3; `SPEC-FRONTEND.md` F-8; `docs/ux_dashboard.md` Hasło (V1).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/account-password-form.tsx`
- **Bez** zmian: `account-delete-form.tsx`, `account-email-form.tsx`, `auth.api.ts` (`patchOwnPassword` → `void` OK — body usera nie jest wymagane po stronie FE; cookie jar BFF).

#### Importy

**teraz:**

```typescript
import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// …
import { useSession } from '@/modules/auth/components/session-provider';
```

**zamień na:**

```typescript
import { useEffect, useState, type FormEvent } from 'react';
// …
import { useSession } from '@/modules/auth/components/session-provider';
import { notifyProduct } from '@/modules/notifications/notify-product';
```

(usuń `useRouter`.)

#### Hooki / sukces submitu

**teraz:**

```typescript
export function AccountPasswordForm({ open, onOpenChange }: AccountPasswordFormProps) {
  const router = useRouter();
  const { state, clear } = useSession();
  // …

        await patchOwnPassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        clear();
        onOpenChange(false);
        setForm(INITIAL);
        router.replace('/');
```

**zamień na:**

```typescript
export function AccountPasswordForm({ open, onOpenChange }: AccountPasswordFormProps) {
  const { state } = useSession();
  // …

        await patchOwnPassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        onOpenChange(false);
        setForm(INITIAL);
        notifyProduct({
          kind: 'success',
          title: 'Hasło zostało zmienione.',
          id: 'account-password-changed',
        });
```

**Zakaz na happy path:** `clear()`, `router.replace('/')`, `router.push('/')`, oraz równoważne wylogowanie → landing.

#### Copy modala

**teraz:**

```typescript
            <DialogDescription>
              Podaj aktualne hasło i nowe. Sesja zostanie zakończona po sukcesie.
            </DialogDescription>
```

**zamień na:**

```typescript
            <DialogDescription>
              Podaj aktualne hasło i nowe. Po zapisaniu zostaniesz zalogowany na tym
              urządzeniu; inne sesje wylogują się.
            </DialogDescription>
```

#### Catch / UI pól

Bez zmian: `INVALID_PASSWORD` → pod aktualnym; `VALIDATION_FAILED` → pod nowym; Anuluj bez API; `pending` blokuje zamknięcie.

#### Pełny plik po zmianie (najmniejszy komplet)

```tsx
'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { patchOwnPassword } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';
import { useSession } from '@/modules/auth/components/session-provider';
import { notifyProduct } from '@/modules/notifications/notify-product';

const FALLBACK_MESSAGE = 'Nie udało się odczytać odpowiedzi.';
const POLICY_HINT =
  'Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).';

type AccountPasswordFormProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

type PasswordFormState = {
  currentPassword: string;
  newPassword: string;
  confirm: string;
  pending: boolean;
  currentError: string | null;
  newError: string | null;
};

const INITIAL: PasswordFormState = {
  currentPassword: '',
  newPassword: '',
  confirm: '',
  pending: false,
  currentError: null,
  newError: null,
};

export function AccountPasswordForm({ open, onOpenChange }: AccountPasswordFormProps) {
  const { state } = useSession();
  const [form, setForm] = useState<PasswordFormState>(INITIAL);

  useEffect(() => {
    if (!open) return;
    setForm(INITIAL);
  }, [open]);

  if (state.status !== 'authenticated') return null;

  function closeWithoutApi(): void {
    if (form.pending) return;
    onOpenChange(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (form.pending) return;

    if (form.newPassword !== form.confirm) {
      setForm((prev) => ({
        ...prev,
        newError: 'Hasła muszą być identyczne.',
        currentError: null,
      }));
      return;
    }
    if (!passwordMeetsPolicy(form.newPassword)) {
      setForm((prev) => ({
        ...prev,
        newError: POLICY_HINT,
        currentError: null,
      }));
      return;
    }

    void (async () => {
      setForm((prev) => ({
        ...prev,
        pending: true,
        currentError: null,
        newError: null,
      }));
      try {
        await patchOwnPassword({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        onOpenChange(false);
        setForm(INITIAL);
        notifyProduct({
          kind: 'success',
          title: 'Hasło zostało zmienione.',
          id: 'account-password-changed',
        });
      } catch (reason: unknown) {
        if (!(reason instanceof ApiError)) {
          setForm((prev) => ({
            ...prev,
            currentError: FALLBACK_MESSAGE,
            pending: false,
          }));
          return;
        }
        const { code, message } = reason.envelope;
        if (code === 'INVALID_PASSWORD' || code === 'VALIDATION_FAILED') {
          if (code === 'INVALID_PASSWORD') {
            setForm((prev) => ({
              ...prev,
              currentError: message,
              pending: false,
            }));
            return;
          }
          setForm((prev) => ({
            ...prev,
            newError: message,
            pending: false,
          }));
          return;
        }
        setForm((prev) => ({
          ...prev,
          currentError: message,
          pending: false,
        }));
      }
    })();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (form.pending) return;
        if (!next) closeWithoutApi();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Zmiana hasła</DialogTitle>
            <DialogDescription>
              Podaj aktualne hasło i nowe. Po zapisaniu zostaniesz zalogowany na tym
              urządzeniu; inne sesje wylogują się.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <FormField label="Aktualne hasło" htmlFor="account-current-password">
              <Input
                id="account-current-password"
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            {form.currentError ? (
              <p className="text-sm text-destructive" role="alert">
                {form.currentError}
              </p>
            ) : null}

            <FormField label="Nowe hasło" htmlFor="account-new-password">
              <Input
                id="account-new-password"
                type="password"
                autoComplete="new-password"
                value={form.newPassword}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            <FormField label="Powtórz nowe hasło" htmlFor="account-confirm-password">
              <Input
                id="account-confirm-password"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                disabled={form.pending}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    confirm: event.target.value,
                  }))
                }
                required
              />
            </FormField>
            {form.newError ? (
              <p className="text-sm text-destructive" role="alert">
                {form.newError}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={form.pending}
              onClick={closeWithoutApi}
            >
              Anuluj
            </Button>
            <Button type="submit" disabled={form.pending}>
              Zapisz hasło
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

**Testy:** brak harnessu unit w `apps/frontend` — **nie** dodawać Jest/Vitest „przy okazji”. Weryfikacja ręczna / istniejący smoke:

1. Zalogowany na `/account` → Zmień hasło → sukces → modal zamknięty, toast, URL nadal `/account`, sidebar zalogowany.
2. Złe aktualne hasło → błąd pod polem; sesja żywa; bez toastu sukcesu.
3. Usuń konto → nadal landing (regresja).

**DoD kroku:**

- Happy path: **bez** `clear` / `replace('/')`; toast `account-password-changed`; modal zamknięty.
- Copy DialogDescription bez „sesja zakończona”.
- Delete own / confirm e-mail nietknięte.
- Zależność BE Faza 33: FE działa poprawnie dopiero gdy api zwraca Set-Cookie (keep-session); przy starym Clear-Cookie BE UX będzie niespójny — implementacja FE **nie** maskuje tego `clear()`.

---

#### Propozycja commit message

```text
feat(account): keep session after password change with success toast

Close the password modal and stay on /account instead of clearing the
session, matching F-8 keep-session UX.
```

---

## Weryfikacja wycinka

| Check | Kryterium |
|-------|-----------|
| Kotwica | FE Faza 32; Faza 31 nietknięta |
| SPEC/docs | F-8 Hasło; `ux_dashboard.md` toast + zostań |
| Kod | `AccountPasswordForm` keep-session; reuse `notifyProduct` |
| BE | poza zakresem (major BE Faza 33) |
| Nagłówki | `FAZA` / `KROK` |
| Commit | EN Conventional Commits na końcu FAZY 1 |

---

## Ślad do major (po implementacji — informacyjnie)

| Pozycja | Po implementacji |
|---------|------------------|
| FE Faza 32 | `WYKONANY` |
| MILESTONE 32 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| FE Faza 31 | bez zmian (`WYKONANY`) |
| BE Faza 33 | osobny tor — ten major FE jej **nie** oznacza |

Ten plik **nie** zmienia majoru. Statusy — poza sesją (ręcznie lub przy `/feature-implementation`).
