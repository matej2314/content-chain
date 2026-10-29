# Content Chain — feature plan: UX limitu per-user + Stop bez regresji (Faza 30 FE)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-30-user-in-flight-limit-frontend.md`  
**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 30** (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 30) — po `POST /runs` **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED` pokazać **`message`** na formularzu startu (Konto inline **oraz** modal Runy); **bez** toastu; **bez** nawigacji; **bez** cichego „queued”; **zakaz** `GuestLimitModal` dla tego kodu; Stop/cancel F-5b **bez regresji** przy V1 abort→gateway (FE **nie** woła gateway); **bez** panelu mutacji `MAX_USER_IN_FLIGHT_RUNS`.  
**Źródła:** `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-5b / F-6 / F-7 / F-10, `SPEC-RUNY.md` R-6a / R-11, `SPEC-KOMUNIKACJA.md` K-8, `SPEC-TESTY.md` (T-7 — automaty FE poza MVP), major FE Faza 30.  
**Skill UI:** `content-chain-product-ui` — Design Read: *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; envelope przy formularzu startu = istniejący `EnvelopeError`, bez nowej palety / bez nowego modala.*  
**Numer FE 30 ≠ BE 29** — kontrakt api = `content-chain-backend_major_plan.md` Faza 29 (+ HOW w `feature-plans/content-chain_feature_plan_faza-29-execute-safety.md`).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 30 majoru FE |
| Major | Faza 30 (gate); HOW: KROK 1–3 poniżej |
| Poza zakresem | Implementacja api / env `MAX_USER_IN_FLIGHT_RUNS` / abort gateway; panel admin limitu; next-intl envelope; zmiana globalnego `EnvelopeError` (pokazuje też `code` — dziedzictwo chrome; poza tym wycinkiem); MILESTONE 30; przepisywanie Fazy 3 / 7 / 8 / 14 / 16 / 29 (`WYKONANY`); Playwright jako suite |
| Zależność BE | `content-chain-backend_major_plan.md` **Faza 29** — **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED` na `POST /runs`; cancel **200** + abort api→gateway niewidoczny w UI. **Przed** merge FE na produkcję: api musi zwracać ten kod |
| Pass rozwojowy | helper kodu → gałąź `StartRunForm` → audyt Stop; **brak** przesunięć między fazami major |
| Po implementacji (informacyjnie) | Major FE: Faza 30 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 30) |

**Refaktor względem (historia, bez edycji `WYKONANY`):** Faza 3 / Krok 3.1 oraz Faza 7 (start Konto / modal Runy bez gałęzi limitu per-user); Faza 8 / Faza 16 (Stop/cancel UX MVP); Faza 14 (`GuestLimitModal` tylko quota guest).

**Mapa major → ten plik**

| Major (gate) | Feature | Zakres |
|--------------|---------|--------|
| Kod envelope per-user | FAZA 1 / KROK 1 | stała + type guard (osobno od `GUEST_*`) |
| Formularz startu (Konto + modal) | FAZA 1 / KROK 2 | `StartRunForm` — `message` / zakaz GuestLimitModal |
| Stop bez regresji V1 | FAZA 1 / KROK 3 | audyt `CancelRunDialog` / `cancelRun` |

**Pass rozwojowy (sesja planu):**

1. Stała / `isUserInFlightLimitCode` **przed** gałęzią w `StartRunForm`.
2. Jawna gałąź limitu w catch submitu **przed** audytem Stop (powierzchnie Konto + modal dzielą jeden komponent).
3. Audyt Stop na końcu — **zero zmian kodu**, gdy F-5b już spełnione.
4. **Brak przesunięć między fazami major.** **Brak przesunięć w tej FAZA poza kolejnością KROK powyżej.**

---

## Założenia

- Stack FE: Next.js **16.3.0**, React **19.2.8**, istniejący `ApiError` / `EnvelopeError` / `GuestLimitModal` / `CancelRunDialog` — **bez** nowych paczek.
- Jedna powierzchnia formularza: `StartRunForm` montowany w `account-view.tsx` (Konto) **oraz** `start-agent-dialog.tsx` (modal Runy) — jedna gałąź pokrywa obie.
- `GUEST_QUOTA_CODES` (**403** guest) **≠** `USER_IN_FLIGHT_LIMIT_EXCEEDED` (**409** per-user) — rozłączne type guardy; **zakaz** dopisywania limitu per-user do `isGuestQuotaCode`.
- Po limicie: stan `error` + `EnvelopeError`; **bez** `notifyProduct` / `notifyRunTerminal`; **bez** `router.push`; **bez** `onSuccess` (modal zostaje otwarty z błędem).
- Sukces **202** bez zmian: toast „Run wystartował” + nawigacja `/runs/:runId` (Faza 20).
- Stop: `POST /api/v1/runs/:runId/cancel` wyłącznie przez BFF (`apiFetch`); FE **nie** woła gateway; modal „Czy na pewno?”; toast cancel F-5b **bez zmian**.
- Typy: unia dyskryminowana `StartState` zostaje; bez `any` / `@ts-ignore`; `import type` dla typów; `as const` na kodzie envelope.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.
- Visual: dziedziczenie locku Fazy 22–23; **bez** nowego modala / palety dla limitu per-user.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| `useState` + unia statusów | Context7 `/reactjs/react.dev` (TypeScript — object union; Managing State — form submit) | Modeluj `idle` / `pending` / `error` jako unię obiektów; przy błędzie submitu ustaw stan błędu **zamiast** nawigacji / sukcesu | Istniejąca `StartState` zostaje; limitu per-user = wariant `error` (nie `quota`) |
| `ApiError` / envelope | lokalny `apps/frontend/src/shared/api/envelope.ts` | `reason.envelope.code` + `message`; status HTTP w `ApiError.status` | Gałąź po **`code`** (F-7: `code` do logiki klienta); UI pokazuje `message` przez `EnvelopeError` |
| Cancel HTTP | lokalny `cancelRun` + F-5b / R-11 | FE tylko `POST .../cancel` same-origin; abort gateway = api | **Bez** nowego klienta HTTP w FE |

---

## FAZA 1 — UX limitu per-user + Stop bez regresji V1

Odpowiada major FE Faza 30 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Stała i type guard `USER_IN_FLIGHT_LIMIT_EXCEEDED`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jawny kontrakt kodu envelope limitu per-user po stronie FE, rozłączny od `GUEST_*`. Major FE Faza 30; `SPEC-KOMUNIKACJA.md` K-8; `SPEC-RUNY.md` R-6a; `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/lib/user-in-flight-limit.ts`

#### Nowy plik — pełny kod

```typescript
/** Envelope `code` for POST /runs when per-user in-flight cap is hit (HTTP 409). */
export const USER_IN_FLIGHT_LIMIT_EXCEEDED = 'USER_IN_FLIGHT_LIMIT_EXCEEDED' as const;

export type UserInFlightLimitCode = typeof USER_IN_FLIGHT_LIMIT_EXCEEDED;

export function isUserInFlightLimitCode(code: string): code is UserInFlightLimitCode {
  return code === USER_IN_FLIGHT_LIMIT_EXCEEDED;
}
```

**DoD kroku:**

- Eksport stałej + type guard; **bez** importu z `@/modules/demo`.
- `isGuestQuotaCode('USER_IN_FLIGHT_LIMIT_EXCEEDED') === false` (regresja: lista `GUEST_QUOTA_CODES` **bez** tego kodu — zero edycji `guest-policy.ts` w tym kroku, tylko weryfikacja).

---

### KROK 2 — `StartRunForm`: limitu per-user → envelope na formularzu

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po `POST /runs` **409** `USER_IN_FLIGHT_LIMIT_EXCEEDED` operator widzi `message` przy formularzu (Konto + modal Runy); **nie** `GuestLimitModal`; **nie** toast; **nie** nawigacja. Refaktor względem: Faza 3 / 3.1 + Faza 7 (historia). `SPEC-FRONTEND.md` F-7 / F-10 pkt 4/7; `docs/ux_dashboard.md` (tabela toastów).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Bez zmian montażu: `account-view.tsx`, `start-agent-dialog.tsx` (już używają `StartRunForm`)

#### Refaktor — import

**teraz** (fragment importów demo / envelope):

```typescript
import { GuestLimitModal } from '@/modules/demo/components/guest-limit-modal';
import { isGuestAllowedTaskType, isGuestQuotaCode } from '@/modules/demo/lib/guest-policy';
```

**zamień na:**

```typescript
import { GuestLimitModal } from '@/modules/demo/components/guest-limit-modal';
import { isGuestAllowedTaskType, isGuestQuotaCode } from '@/modules/demo/lib/guest-policy';
import { isUserInFlightLimitCode } from '@/modules/runs/lib/user-in-flight-limit';
```

#### Refaktor — `catch` w `onSubmit`

**teraz:**

```typescript
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        if (isGuestQuotaCode(reason.envelope.code)) {
          setStartState({
            status: 'quota',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        setStartState({
          status: 'error',
          code: reason.envelope.code,
          message: reason.envelope.message,
        });
        return;
      }
      setStartState({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Nie udało się odczytać odpowiedzi.',
      });
    }
```

**zamień na:**

```typescript
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        if (isGuestQuotaCode(reason.envelope.code)) {
          setStartState({
            status: 'quota',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        // Per-user in-flight (409 USER_IN_FLIGHT_LIMIT_EXCEEDED): form envelope only —
        // never GuestLimitModal, never toast, never navigate (F-7 / F-10).
        if (isUserInFlightLimitCode(reason.envelope.code)) {
          setStartState({
            status: 'error',
            code: reason.envelope.code,
            message: reason.envelope.message,
          });
          return;
        }
        setStartState({
          status: 'error',
          code: reason.envelope.code,
          message: reason.envelope.message,
        });
        return;
      }
      setStartState({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Nie udało się odczytać odpowiedzi.',
      });
    }
```

**Uwagi HOW (bez zmiany JSX poza już istniejącym `EnvelopeError`):**

- Ścieżka sukcesu (`await startRun` → `refresh` → `notifyProduct` → `onSuccess` → `router.push`) **bez zmian** — wołana **tylko** po 202.
- `GuestLimitModal` nadal `open={startState.status === 'quota'}` — limitu per-user **nie** ustawia `quota`.
- `CONTEXT_INCOMPLETE` / inne `ApiError` nadal wariant `error` (jak dziś).
- Unia `StartState` **bez** nowego wariantu — limitu = `error` (React docs: unia statusów; błąd submitu → stan błędu, nie sukces).

**DoD kroku:**

- Przy odpowiedzi api z `code === USER_IN_FLIGHT_LIMIT_EXCEEDED`: na Koncie **i** w modalu Runy widać `EnvelopeError` z `message` z API; modal GuestLimit **zamknięty**.
- Brak toasta limitu; brak przejścia na `/runs/:id`; draft formularza zostaje.
- Guest quota (`GUEST_*`) nadal otwiera `GuestLimitModal` (regresja Fazy 14).
- `tsc` / lint dla zmienionych plików bez błędów.

---

### KROK 3 — Stop/cancel: audyt F-5b bez regresji V1

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Potwierdzić, że Stop w UI pozostaje semantyką MVP (modal „Czy na pewno?”, **200**, bez await execute po stronie UI, toast „Run anulowany”) — niezależnie od abortu api→gateway (R-11). FE **nie** dostaje nowego endpointu ani klienta gateway. Refaktor względem: Faza 8 / 16 (historia). `SPEC-FRONTEND.md` F-5b pkt 6; major FE Faza 30.

**Artefakty (odczyt / weryfikacja — bez obowiązkowej edycji):**

- `apps/frontend/src/modules/runs/components/cancel-run-dialog.tsx`
- `apps/frontend/src/modules/runs/api/runs.api.ts` (`cancelRun`)
- Montaż: `my-runs-list.tsx`, `run-details-view.tsx`

#### Stan odniesienia (już zgodny — nie przepisywać na zapas)

`cancelRun`:

```typescript
export async function cancelRun(runId: RunId): Promise<RunSnapshot> {
  const body = await apiFetch(`/runs/${runId}/cancel`, {
    method: 'POST',
  });
  return parseRunSnapshot(body);
}
```

`CancelRunDialog.confirm`: `await cancelRun(runId)` → `notifyRunCancelled` → `onCancelled` → zamknięcie modala; błąd → `EnvelopeError` w dialogu; **Nie** = `onOpenChange(false)` bez API.

#### Audyt (checklist DoD — wykonaj przy implementacji)

| # | Asercja | Oczekiwane |
|---|---------|------------|
| 1 | Jedyny HTTP cancel z FE | `POST` same-origin `/api/v1/runs/:runId/cancel` przez `apiFetch` |
| 2 | Brak URL / fetch do gateway z `apps/frontend` przy Stop | grep: zero wywołań gateway base URL z modułu runs / cancel |
| 3 | Modal przed API | Tak tylko po „Tak”; „Nie” = zero requestu |
| 4 | Toast | Sukces cancel → istniejący `notifyRunCancelled` (F-5b); **bez** zmiany copy |
| 5 | Floating box | **Bez** Stop (F-8) — nietknięte |
| 6 | Admin→guest Cancel | Tylko detail (Faza 16) — nietknięte |

**Jeśli wszystkie punkty już prawdziwe:** **zero diffu** w plikach cancel — krok zamyka się notą w PR / checklistą powyżej.

**Jeśli znajdziesz regresję** (np. pominięty modal, await na „pełny pipeline”, wywołanie poza BFF): napraw **minimalnym** diffem w `CancelRunDialog` / wywołującym — **bez** nowego API abort w FE i **bez** panelu limitu.

**DoD kroku:**

- Checklist 1–6 spełniona (z notą „bez zmian” albo minimalnym fixem).
- Manualnie: Stop na Moich runach / szczegółach → modal → Tak → **200** snapshot `cancelled` (gdy api V1); UI bez wysyłki do gateway.

---

#### Propozycja commit message

```text
feat(frontend): show per-user in-flight limit on start form

Map USER_IN_FLIGHT_LIMIT_EXCEEDED to form envelope (not GuestLimitModal);
keep Stop/cancel on BFF cancel without UI regression.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica Faza 30 | message na startcie; zakaz GuestLimitModal; Stop bez regresji; bez panelu capu |
| docs / SPEC | `ux_dashboard` tabela toastów; F-5b / F-7 / F-10; K-8 / R-6a |
| product-ui | `EnvelopeError` istniejący; bez nowego modala / palety |
| Pass rozwojowy | helper → form → Stop |
| Testy FE | Poza MVP (T-7) — brak wymogu Playwright w DoD |
| Major nietknięty | Ten skill nie edytuje major |
| Zależność BE | FE nie merge’ować na produkcję bez **409** z api (BE Faza 29) |
| Brak odwołań do planów pomocniczych w rootcie | źródła = docs / SPEC / major / feature-plans |

**Checklist ręczny (po implementacji + gdy BE Faza 29 gotowa):**

1. Użytkownik z `MAX_USER_IN_FLIGHT_RUNS` własnymi in-flight → `POST /runs` z Konta → envelope przy formularzu; brak toastu; brak `/runs/:id`.
2. To samo z modalu **Uruchom agenta** na Runach (modal zostaje otwarty z błędem).
3. Guest quota nadal → `GuestLimitModal` (nie mylić z limitem per-user).
4. Stop: modal → Tak → cancel BFF; brak requestu do gateway z przeglądarki.

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| `content-chain-frontend_major_plan.md` Faza 30 | `WYKONANY` |
| MILESTONE 30 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Fazy 3 / 7 / 8 / 14 / 16 / 29 FE | bez zmian statusów (historia) |
| Backend Faza 29 | osobny tor — musi być gotowa pod kontrakt; ten plan FE jej **nie** oznacza |

Edycja major / statusów = **poza** tą sesją feature-planu (ręcznie lub przy `/feature-implementation` na życzenie).
