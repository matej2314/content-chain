# Content Chain — feature plan: nawigacja na szczegóły zaraz po starcie (Faza 20)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-20-nawigacja-po-starcie.md`  
**Kotwica major:** Faza 20 (cała) — `content-chain-frontend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 20).  
**Refaktor względem:** Faza 3 / Krok 3.1 (`WYKONANY`) — „po **202** zostajemy na Koncie”; Faza 7 / Kroki 7.1–7.2 (`WYKONANY`) — „po **202** z modalu zostajemy na Runach”; powiązane noty Fazy 3.6 (`WYKONANY`) — toast „Run wystartował” **bez** zmiany copy. MILESTONE 3 / 3.6 oraz Faza 3 / 3.1 / 3.6 / 7 pozostają historią (`OSIĄGNIĘTY` / `WYKONANY`).  
**Źródła:** `docs/ux_dashboard.md` (Konto / Runy / Feedback zdarzeń — mapa po `POST /runs` **202**), `docs/dictionary.md` (Konto / Runy), `docs/anty_patterny.md` (zakaz zostawania na widoku źródłowym po `202`), `SPEC-FRONTEND.md` F-8 + „Nie wolno” + DoD, major FE Faza 20. Skill wizualny: `content-chain-product-ui` (dziedziczenie locku Fazy 1 — wycinek **bez** nowej palety / chrome).  
**Kolejność `KROK` w tym pliku:** jeden krok w wspólnym `StartRunForm` (obie powierzchnie startu).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 20 majoru FE: po udanym `POST /runs` (**202**) z **obu** powierzchni (Konto inline **oraz** modal „Uruchom agenta” na Runach) — **zawsze** nawigacja na `/runs/:runId`; toast „Run wystartował” zostaje; modal zamyka się przed / przy przejściu; błąd startu — **bez** nawigacji |
| Major | Faza 20; start po Fazach 1–19 (`WYKONANY`) i Milestone 1–6 / 2.1 / 3.5 / 3.6 (`OSIĄGNIĘTY`); **bez** MILESTONE 19 / 20 |
| Poza zakresem | Zmiana kontraktu HTTP/SSE startu; zmiana copy toasta; zmiana semantyki floating boxa / rejestru SSE poza skutkiem przebywania na szczegółach; backend major; Playwright; nowa paleta; **MILESTONE 20** |
| Po implementacji (informacyjnie) | Major FE: Faza 20 → `WYKONANY` (DoD gate + kod z feature planu). Brak `MILESTONE` 20. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (opis DoD / HOW) | Feature | Zakres |
|------------------------|---------|--------|
| Po `202` → `/runs/:runId` (Konto + modal Runy) | FAZA 1 / KROK 1 | `StartRunForm`: `runId` z odpowiedzi + `router.push`; kolejność toast → `onSuccess` → push |

**Pass rozwojowy (sesja planu):** brak przesunięć. Nawigacja i toast w jednym miejscu (`StartRunForm`) — obie powierzchnie dziedziczą zachowanie. `onSuccess` (zamknięcie modala) **przed** `router.push`, żeby Dialog zdążył się zamknąć przed / przy przejściu. `runId` z `StartRunAccepted` **przed** nawigacją. Brak zależności między fazami major do przenoszenia. Typy / `startRun` / parser **nietknięte**.

---

## Założenia

- Stack FE bez zmian: Next.js App Router **16.3.x**, React, Tailwind v4, shadcn kit, TypeScript `strict` jak w `apps/frontend`.
- `startRun` już zwraca `Promise<StartRunAccepted>` (`runId: RunId`, `status: 'queued' | 'running'`) — **bez** zmiany `runs.api.ts` / parsera.
- Nawigacja: `useRouter` z `next/navigation`, `router.push(\`/runs/${accepted.runId}\`)` — wzorzec jak inne client components w projekcie (`logout-dialog`, `home-entry`).
- Toast sukcesu: istniejący `notifyProduct({ kind: 'success', title: 'Run wystartował' })` — **bez** zmiany copy ani kontraktu toasta.
- Kolejność po sukcesie: `refresh()` → toast → `setStartState(idle)` → `onSuccess?.()` (modal) → `router.push(...)`.
- Błąd (4xx / envelope / `ApiError` / quota guest): **bez** `router.push`; formularz / modal zostaje (obecne gałęzie `catch` — **bez** zmian semantyki).
- `StartAgentDialog`: nadal przekazuje `onSuccess={() => handleOpenChange(false)}` — **bez** osobnej nawigacji w dialogu (uniknąć podwójnego `push`).
- `AccountView`: bez `onSuccess` — nawigacja wyłącznie z formularza.
- Semantyka floating boxa / rejestru SSE / toasta terminalnego na `/runs/:runId` — **bez zmian** (skutek uboczny: po starcie operator jest od razu na szczegółach → toast terminalu SSE dla tego runu = no-op wg istniejącego `viewingRunId`).
- Visual: Design Read — *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8*; dziedziczenie locku Fazy 1; **bez** nowej palety / kart / chrome.
- Zakaz `any` / nieuzasadnionych asercji; `RunId` branded — ścieżka z interpolacją stringa jak w istniejących linkach do szczegółów.

---

## Biblioteki (research)

| Temat | Ustalenie | Źródło | Decyzja w wycinku |
|-------|-----------|--------|-------------------|
| Client navigation | `useRouter` z `next/navigation`; `router.push(url)` w handlerze eventu / po mutacji | Context7 `/vercel/next.js` (App Router redirecting / migration) | `push` w `onSubmit` po sukcesie `startRun` |
| Next w projekcie | `next@16.3.0` | `apps/frontend/package.json` | Bez upgrade |
| Toast | `notifyProduct` | istniejący moduł notifications | Bez zmian copy |
| Visual lock | `content-chain-product-ui` | skill projektu | Dziedziczenie; wycinek bez warstwy CSS |

Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Nawigacja na szczegóły zaraz po starcie

Odpowiada major Faza 20 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — `StartRunForm`: po 202 → toast + close + `router.push`

**Status:** `WYKONANY`

**Cel:** Po udanym starcie runu operator trafia na `/runs/:runId` z obu powierzchni (Konto i modal Runy). Major Faza 20; `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-8. Refaktor względem Fazy 3 / 3.1 i Fazy 7 / 7.1–7.2 (historia: widok źródłowy po `202`).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Bez zmian wymaganych: `start-agent-dialog.tsx` (już zamyka modal przez `onSuccess`), `account-view.tsx`, `runs.api.ts`, `notify-product`

#### Import `useRouter`

**teraz:** (początek pliku — brak `next/navigation`)

```typescript
'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
```

**zamień na:**

```typescript
'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
```

(Import frameworka `next/navigation` zaraz po React — zgodnie z konwencją grup importów w projekcie / typescript-practices.)

#### Hook w komponencie

**teraz:**

```typescript
export function StartRunForm({
  draft,
  onDraftChange,
  idPrefix,
  heading,
  onSuccess,
}: StartRunFormProps) {
  const { refresh } = useOwnRuns();
  const { agentsActive, disableReason } = useStartRunGate();
  const guestLocked = useGuestLocked();
```

**zamień na:**

```typescript
export function StartRunForm({
  draft,
  onDraftChange,
  idPrefix,
  heading,
  onSuccess,
}: StartRunFormProps) {
  const router = useRouter();
  const { refresh } = useOwnRuns();
  const { agentsActive, disableReason } = useStartRunGate();
  const guestLocked = useGuestLocked();
```

#### Sukces `onSubmit`

**teraz:**

```typescript
    try {
      await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
      setStartState({ status: 'idle' });
      onSuccess?.();
    } catch (reason: unknown) {
```

**zamień na:**

```typescript
    try {
      const accepted = await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
      setStartState({ status: 'idle' });
      onSuccess?.();
      router.push(`/runs/${accepted.runId}`);
    } catch (reason: unknown) {
```

**Uwagi implementacyjne:**

1. Gałęzie `catch` (envelope / quota / INTERNAL_ERROR) — **bez** `router.push`.
2. Nie dodawaj drugiego `push` w `StartAgentDialog`.
3. Nie zmieniaj tytułu toasta.
4. Nie używaj `window.location` / `router.replace` — `push` (historia wstecz: szczegóły → poprzedni widok).
5. `accepted.runId` to branded `RunId` — interpolacja w template string jak przy istniejących linkach `/runs/...`.

**Biblioteki / API:** Context7 Next.js App Router — `useRouter` + `router.push` w Client Component; wersja z `apps/frontend/package.json`.

**Testy:** brak nowych automatów (Playwright poza zakresem major / tego wycinka). Weryfikacja ręczna w DoD.

**DoD kroku:**

- Po **202** z Konta (inline): toast „Run wystartował” **oraz** URL `/runs/:runId` nowo utworzonego runu.
- Po **202** z modalu Runy: modal zamknięty, ten sam toast, ten sam URL szczegółów.
- Błąd startu (np. `CONTEXT_INCOMPLETE` / quota guest): **bez** nawigacji; formularz / modal zostaje; envelope / `GuestLimitModal` jak dziś.
- `startRun` / typy / copy toasta / floating box / rejestr SSE — bez celowej zmiany kontraktu.
- `tsc` / lint dla zmienionego pliku bez nowych błędów typów.

---

#### Propozycja commit message

```text
feat(runs): navigate to run details immediately after start

After POST /runs 202, keep the success toast and always open /runs/:runId
from both Account and the archive start modal so the operator lands on live details.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major Faza 20 | Pokryta jednym krokiem w `StartRunForm` (obie powierzchnie) |
| docs / SPEC | Zgodność z `ux_dashboard.md` + F-8: po `202` → szczegóły; toast; modal close; błąd bez nawigacji |
| Antypattern | „Zostań na Koncie/Runach po `202`” — usunięty z zachowania UI |
| Refaktor | Fragmenty `teraz → zamień na` tylko w `start-run-form.tsx` |
| Visual | Dziedziczenie locku; bez nowej palety |
| Major | Nietknięty w tej sesji; po implementacji (osobno): Faza 20 → `WYKONANY`; **bez** MILESTONE 20 |
| Sekrety | Brak |

---

## Ślad do major (informacyjnie — po późniejszej implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 20 | `WYKONANY` (DoD gate + HOW z tego feature planu) |
| MILESTONE 20 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 3 / 3.1, Faza 7 / 7.1–7.2, Faza 3.6, MILESTONE 3 / 3.6 | Historia — **bez** przepisywania |

Edycja major / statusów = poza tym feature planem (ręcznie albo w sesji `/feature-implementation` na życzenie użytkownika).
