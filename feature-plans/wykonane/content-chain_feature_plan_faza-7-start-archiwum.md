# Content Chain — feature plan: Faza 7 (Start agenta z archiwum Runy)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Druga powierzchnia startu: CTA **„Uruchom agenta”** + modal na `/runs`; ten sam brief co Konto |
| Major | `content-chain-frontend_major_plan.md` — Faza 7 (kroki 7.1–7.2). **Bez** milestone’u po Fazie 7 |
| Ten plik zestawu | `FAZA 1` (porządkowa w skali tego wycinka = cała major Faza 7) |
| Kolejność KROK ≠ major | KROK 1 = hostowalny brief + Tooltip (fundament 7.2 / część 7.1). KROK 2 = CTA/modal na archiwum (7.1 + reszta 7.2) |
| Źródła | `docs/ux_dashboard.md` (Widok: Runy / Konto; CTA kompletności; mapa toastu 202), `spec/SPEC-FRONTEND.md` F-6 / F-7 / F-8, `spec/SPEC-TESTY.md` T-7, skill `content-chain-product-ui` |
| Poza zakresem | Nowy kontrakt `POST /runs` / SSE / Faza 10–11 api; prefill z wiersza archiwum; CTA na `/runs/:runId`, sidebarze, headerze; Playwright / testy FE; nowa paleta; zmiana `tsconfig` |
| Po implementacji (informacyjnie) | Major FE: Faza 7 i kroki 7.1–7.2 → `WYKONANY`. Milestone po Fazie 7 **nie istnieje**. **Edycja major poza tym skillem.** |

**Pass rozwojowy (zatwierdzony):** (1) refaktor `StartRunForm` + kit Tooltip **przed** Dialogiem na archiwum; (2) Tooltip w KROK 1, bo DoD wymaga go na CTA **i** w modalu. Brak przesunięć między fazami major.

**HOW:** reuse `StartRunForm` (nie kopia pól). Overlay = istniejący `Dialog` shadcn (wzorzec `FeedbackCta` / logout). Po 202 z modalu: pathname `/runs`, modal close, `notifyProduct` „Run wystartował”, `refresh()` own runs → floating box; **zakaz** `fetchArchiveRuns` po starcie. Copy bez em-dash. Testy FE poza MVP (T-7).

**Design Read:** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

**Typy:** granice propsów jawne (`readonly`); unia `disableReason: string | null`; brak `any` / `as`; `import type` tam gdzie tylko typy. `tsconfig` **bez zmian**.

---

## Założenia

- Fazy 1–6 (oraz 2.1 / 3.5 / 3.6) i ich milestony są historią (`WYKONANY` / `OSIĄGNIĘTY`). Ten wycinek **nie** przepisuje Fazy 3 / MILESTONE 3 / Fazy 6.
- `StartRunForm` + `EMPTY_START_DRAFT` + `draftFromSnapshot` + `startRun()` + `notifyProduct` + `useOwnRuns().refresh` + `useCompleteness` **już istnieją**. Konto zostaje powierzchnią inline + prefill ze snapshotu (Krok 3.2).
- `ArchiveRunsView` ładuje wyłącznie `completed` \| `failed` (strona 10, 15 min). Ten wycinek **nie** dokłada SSE ani wierszy w toku.
- Overlay: `apps/frontend/src/shared/ui/dialog.tsx`. Szerokość hosta formularza: override `sm:max-w-xl` (jak opinia `sm:max-w-lg`, nie default `sm:max-w-sm`).
- Kit Tooltip: styl `radix-nova` (`components.json`), prymityw z paczki `radix-ui` (już w `apps/frontend/package.json`). **Bez** nowej zależności npm. `z-index` treści: `z-(--z-toast)` — nad Dialogiem (`--z-modal: 30`), bez nowej warstwy w `globals.css`.
- `TooltipProvider` wyłącznie w gałęzi authenticated `DashboardShell` (jak `Toaster`) — nie na karcie logowania / accept-invite.
- Etykieta submitu na **obu** powierzchniach: **„Uruchom agenta”** (`docs/ux_dashboard.md`). Nagłówek bloku na Koncie zostaje **„Start runu”**. Tytuł modalu: **„Uruchom agenta”**.
- Envelope 400 / 409 przy formularzu (także w modalu); zero toasta na błędzie. Toast sukcesu 202 już w `StartRunForm` — modal go **nie** dubluje.
- Skill UI: dziedziczenie locku Fazy 1; zakaz hero/bento/drugiej palety. Motion overlayu = istniejący `data-open:animate-in` Dialogu.

### Biblioteki / API

- **shadcn Tooltip** (radix-nova): Context7 `/websites/ui_shadcn` — disabled button owinięty w `span` + `TooltipTrigger asChild`; `TooltipProvider` w layoucie po sesji. Źródło pliku kitu: registry `radix-nova/ui/tooltip.tsx` (WebFetch `https://ui.shadcn.com/r/styles/radix-nova/tooltip.json`). Alias `cn` → `@/shared/utils/utils`; `z-50` z registry **zamień** na `z-(--z-toast)`.
- **Dialog:** istniejący kit; wzorzec kontrolowany `open` / `onOpenChange` jak `FeedbackCta`. SPEC F-8: client component modalu startu.
- Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Start agenta z archiwum Runy

Odpowiada major **Faza 7**.

### KROK 1 — Hostowalny brief (`StartRunForm`)

**Status:** `WYKONANY`

**Cel:** Formularz startu da się hostować na Koncie (inline) i w Dialogu (KROK 2) bez drugiej kopii pól. Tooltip przy nieaktywnych agentach. Major: fundament 7.2 + część DoD 7.1 (host). `SPEC-FRONTEND.md` F-6 / F-7. `docs/ux_dashboard.md` (Start runu / CTA kompletności).

**Artefakty:**

- Nowy: `apps/frontend/src/shared/ui/tooltip.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/start-run-gate.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx`

Kolejność w kroku: Tooltip → Provider w shellu → gate → refaktor formularza → `idPrefix` na Koncie.

#### Nowy plik — `apps/frontend/src/shared/ui/tooltip.tsx`

Kompletny kit (radix-nova, dostosowany do aliasów i skali z-index). **Nie** zostawiaj `z-50` ani importu `cn` z `"cn"`.

```tsx
'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '@/shared/utils/utils';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-(--z-toast) inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-(--z-toast) **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-(--z-toast) size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
```

#### Nowy plik — `apps/frontend/src/modules/runs/components/start-run-gate.tsx`

Jedna bramka kompletności dla CTA archiwum i submitu formularza. Tooltip na disabled: `span` (Context7 — `pointer-events-none` na `Button`).

```tsx
'use client';

import { useMemo, type ReactNode } from 'react';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

export function useStartRunGate(): {
  readonly agentsActive: boolean;
  readonly disableReason: string | null;
} {
  const { state: completeness } = useCompleteness();
  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);

  return { agentsActive, disableReason };
}

export function AgentsGateTooltip({
  reason,
  children,
}: {
  readonly reason: string | null;
  readonly children: ReactNode;
}): ReactNode {
  if (reason === null) return children;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block w-fit">{children}</span>
      </TooltipTrigger>
      <TooltipContent>{reason}</TooltipContent>
    </Tooltip>
  );
}
```

#### Refaktor — `dashboard-shell.tsx`

`TooltipProvider` w gałęzi `authenticated` (obok `Toaster`). Gałąź skeleton / anonymous **bez** providera.

**teraz** (return authenticated):

```tsx
  return (
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <OwnRunsProvider>
          <div className="flex min-h-dvh bg-background">
```

**zamień na:**

```tsx
  return (
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <OwnRunsProvider>
          <TooltipProvider>
          <div className="flex min-h-dvh bg-background">
```

Dodać import: `import { TooltipProvider } from '@/shared/ui/tooltip';`

Zamknąć `</TooltipProvider>` **po** `<Toaster />`, wewnątrz `OwnRunsProvider` (Toaster zostaje rodzeństwem layoutu, nie wewnątrz `div` chrome — jak dziś).

**teraz:**

```tsx
          <Toaster />
        </OwnRunsProvider>
```

**zamień na:**

```tsx
          <Toaster />
          </TooltipProvider>
        </OwnRunsProvider>
```

#### Refaktor — `start-run-form.tsx`

Props publiczne (granica): `idPrefix` (jak `FeedbackForm`), `heading`, opcjonalny `onSuccess` po 202. Submit **„Uruchom agenta”**. Tooltip na CTA submitu gdy `disableReason !== null`. Akapit `disableReason` **zostaje** (wyjaśnienie bez hover; tooltip = DoD major). `toInput` / `EMPTY_START_DRAFT` / `draftFromSnapshot` **bez zmiany semantyki**.

**teraz** (`StartRunFormProps` + sygnatura):

```tsx
type StartRunFormProps = {
  readonly draft: StartRunDraft;
  readonly onDraftChange: (next: StartRunDraft) => void;
};

export function StartRunForm({ draft, onDraftChange }: StartRunFormProps) {
  const { state: completeness } = useCompleteness();
  const { refresh } = useOwnRuns();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  const agentsActive = completeness.status === 'ready' && completeness.completeness.complete;
  const pageTask = isContentTaskType(draft.taskType);

  const disableReason = useMemo(() => {
    if (completeness.status === 'loading') return 'Sprawdzanie kompletności kontekstu…';
    if (completeness.status === 'error') return 'Nie można potwierdzić bramki kontekstu.';
    if (!agentsActive) return 'Agenci nieaktywni. Uzupełnij kontekst firmy.';
    return null;
  }, [agentsActive, completeness]);
```

**zamień na:**

```tsx
type StartRunFormHeading = 'visible' | 'none';

type StartRunFormProps = {
  readonly draft: StartRunDraft;
  readonly onDraftChange: (next: StartRunDraft) => void;
  readonly idPrefix: string;
  readonly heading: StartRunFormHeading;
  readonly onSuccess?: () => void;
};

export function StartRunForm({
  draft,
  onDraftChange,
  idPrefix,
  heading,
  onSuccess,
}: StartRunFormProps) {
  const { refresh } = useOwnRuns();
  const { agentsActive, disableReason } = useStartRunGate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const pageTask = isContentTaskType(draft.taskType);
```

Import: `useStartRunGate`, `AgentsGateTooltip` z `./start-run-gate`. Usunąć import `useCompleteness` z tego pliku (bramka żyje w gate).

**teraz** (sukces 202):

```tsx
      await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
```

**zamień na:**

```tsx
      await startRun(input);
      await refresh();
      notifyProduct({ kind: 'success', title: 'Run wystartował' });
      onSuccess?.();
```

Gałąź `catch` (`ApiError` → envelope przy formularzu, zero toasta) **nietknięta**.

**teraz** (markup: `h2` + id stałe + submit):

```tsx
    <form className="flex max-w-xl flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      <h2 className="text-base font-medium">Start runu</h2>
      <FormField label="Typ zadania" htmlFor="start-task-type">
        <NativeSelect
          id="start-task-type"
```

(oraz analogicznie `start-content-kind`, `start-platform`, `start-language`, `start-topic`, `start-audience`, `start-goal`, `start-angle`, `start-length`, `start-idea-count`)

**zamień na:** `htmlFor` / `id` = `` `${idPrefix}-task-type` `` itd. (ten sam zestaw sufiksów). `h2` tylko gdy `heading === 'visible'`. `form`: zostaw `max-w-xl` na Koncie; w modalu KROK 2 nadpisze szerokość hosta Dialogu, formularz może dostać `className` bez `max-w-xl` gdy heading none — **prościej:** zawsze `flex flex-col gap-4` **bez** `max-w-xl` na `<form>` (Konto już owija sekcje w `max-w-xl`).

**teraz** (form class + h2):

```tsx
    <form className="flex max-w-xl flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      <h2 className="text-base font-medium">Start runu</h2>
```

**zamień na:**

```tsx
    <form className="flex flex-col gap-4" onSubmit={(event) => void onSubmit(event)}>
      {heading === 'visible' ? <h2 className="text-base font-medium">Start runu</h2> : null}
```

Konto: w `account-view` sekcja startu ma już `max-w-xl` na przodku (`StartRunForm` siedzi obok email w kolumnie `max-w-xl` tylko na pierwszych blokach — **uwaga:** dziś formularz sam ma `max-w-xl`. Po zdjęciu z form: owiń wywołanie na Koncie).

**teraz** (submit):

```tsx
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {disableReason ? <p className="text-xs text-muted-foreground">{disableReason}</p> : null}
      <Button
        type="submit"
        disabled={pending || !agentsActive || !inputReady}
        className="self-start"
      >
        {pending ? 'Uruchamianie…' : 'Uruchom run'}
      </Button>
```

**zamień na:**

```tsx
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {disableReason ? <p className="text-xs text-muted-foreground">{disableReason}</p> : null}
      <AgentsGateTooltip reason={disableReason}>
        <Button
          type="submit"
          disabled={pending || !agentsActive || !inputReady}
          className="self-start"
        >
          {pending ? 'Uruchamianie…' : 'Uruchom agenta'}
        </Button>
      </AgentsGateTooltip>
```

Tooltip **nie** dla samego `!inputReady` (pusty temat) — tylko `disableReason` z bramki kompletności (F-6).

Mapa `id` (sufiks → pole):

| Sufiks | Pole |
|--------|------|
| `task-type` | Typ zadania |
| `content-kind` | Rodzaj strony (`page_*`) |
| `platform` | Platforma (social) |
| `language` | Język |
| `topic` | Temat |
| `audience` | Grupa |
| `goal` | Cel |
| `angle` | Perspektywa (`page_*`) |
| `length` | Długość |
| `idea-count` | Liczba pomysłów |

Nie kopiuj drugiej tabeli pól briefu. Nie ruszaj literówki „Perpsektywa” w labelu (poza zakresem).

#### Refaktor — `account-view.tsx`

**teraz:**

```tsx
      <StartRunForm draft={draft} onDraftChange={setDraft} />
```

**zamień na:**

```tsx
      <div className="max-w-xl">
        <StartRunForm
          draft={draft}
          onDraftChange={setDraft}
          idPrefix="start"
          heading="visible"
        />
      </div>
```

Prefill `onPrefill` / `draftFromSnapshot` **bez zmiany**. Brak `onSuccess` (zostajemy na Koncie; toast + wiersz Moich runów jak dziś).

**Testy:** brak nowych (T-7).

**DoD kroku:**

- `StartRunForm` przyjmuje `idPrefix`, `heading`, opcjonalny `onSuccess`; pola briefu i `toInput` bez drugiej kopii.
- Konto: `idPrefix="start"`, nagłówek „Start runu”, submit „Uruchom agenta”, prefill ze snapshotu działa.
- 202 na Koncie: toast „Run wystartował”, pozostanie na `/account`, envelope 400/409 bez toasta.
- Disabled + tooltip gdy agenci nieaktywni / loading / błąd completeness; akapit wyjaśnienia zostaje.
- `TooltipProvider` tylko po sesji; karta logowania bez tooltip kitu.
- Brak `any`; `tsconfig` nietknięty.

---

### KROK 2 — CTA i modal na `/runs`

**Status:** `WYKONANY`

**Cel:** Widok Runy dostaje CTA **„Uruchom agenta”** (admin i `user`) otwierający `Dialog` z tym samym briefem, pustym draftem. Po 202: zostajemy na Runach, modal zamknięty, live = floating box, lista archiwum bez nowego wiersza. Major 7.1 + reszta 7.2. `SPEC-FRONTEND.md` F-8. `docs/ux_dashboard.md` (Widok: Runy).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/start-agent-dialog.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`
- **Bez zmiany:** `run-details-view.tsx`, `app-header.tsx`, `nav.ts`, `runs/[runId]/page.tsx`, `runs.api.ts` (`startRun` reuse)

#### Nowy plik — `apps/frontend/src/modules/runs/components/start-agent-dialog.tsx`

Kontrolowany Dialog (nie `DialogTrigger` — CTA bywa `disabled`). Draft pusty; reset przy każdym zamknięciu. Zamknięcie bez submitu = brak `POST`. W trakcie `pending` formularz sam blokuje submit; `onOpenChange(false)` w trakcie requestu **wolno** (nie blokuj Esc) — request i tak dociągnie toast po 202; `onSuccess` przy zamkniętym dialogu jest no-op dla UI (draft i tak reset).

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { AgentsGateTooltip, useStartRunGate } from '@/modules/runs/components/start-run-gate';
import {
  EMPTY_START_DRAFT,
  StartRunForm,
  type StartRunDraft,
} from '@/modules/runs/components/start-run-form';

export function StartAgentDialog() {
  const { disableReason } = useStartRunGate();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<StartRunDraft>(EMPTY_START_DRAFT);

  function handleOpenChange(next: boolean): void {
    setOpen(next);
    if (!next) {
      setDraft(EMPTY_START_DRAFT);
    }
  }

  return (
    <>
      <AgentsGateTooltip reason={disableReason}>
        <Button
          type="button"
          disabled={disableReason !== null}
          onClick={() => handleOpenChange(true)}
        >
          Uruchom agenta
        </Button>
      </AgentsGateTooltip>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="z-(--z-modal) max-h-[min(90dvh,44rem)] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Uruchom agenta</DialogTitle>
            <DialogDescription>
              Ten sam brief co na Koncie. Live nowego runu jest poza tą listą.
            </DialogDescription>
          </DialogHeader>
          <StartRunForm
            draft={draft}
            onDraftChange={setDraft}
            idPrefix="start-archive"
            heading="none"
            onSuccess={() => handleOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

`DialogDescription` jak w pliku (bez em-dash, bez `selectedIdeaIds`, bez obietnicy nawigacji na szczegóły).

#### Refaktor — `archive-runs-view.tsx`

Nagłówek: CTA po prawej na `sm+` (density 7–8, nie bento). Copy „Start jest na Koncie” **usuń**. Filtry, tabela, paginacja 10, interwał 15 min, brak SSE — **bez zmiany sensu**.

**teraz:**

```tsx
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-medium">Runy</h1>
        <p className="text-sm text-muted-foreground">
          Archiwum zakończonych i nieudanych runów instancji. Start jest na Koncie.
        </p>
      </div>
```

**zamień na:**

```tsx
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Runy</h1>
          <p className="text-sm text-muted-foreground">
            Archiwum zakończonych i nieudanych runów instancji.
          </p>
        </div>
        <StartAgentDialog />
      </div>
```

Import: `import { StartAgentDialog } from '@/modules/runs/components/start-agent-dialog';`

**Zakaz w tym kroku:**

- wołanie `fetchArchiveRuns` / `setResult` po 202 (nowy run nie jest terminalny);
- prefill z `item.runId` wiersza tabeli;
- `EventSource` / `useRunEventSource` na tej stronie;
- drugi `<Toaster />`;
- CTA w `run-details-view` / header / sidebar.

Po 202: `StartRunForm` → `refresh()` own runs (layout) → pozycja w floating box gdy `running` \| `awaiting_hitl` \| `interrupted`. `/runs` **nie** jest Kontem, więc box **nie** jest ukryty (Krok 3.4 bez zmiany sensu).

**Testy:** brak nowych (T-7). Weryfikacja ręczna / przeglądarka po implementacji (poza tą sesją).

**DoD kroku:**

- CTA **„Uruchom agenta”** na `/runs` dla `admin` i `user`; brak na `/runs/:runId`, sidebarze, headerze.
- Modal: `Dialog` kitu, tytuł **„Uruchom agenta”**, ten sam `StartRunForm`, pusty draft, bez prefillu z archiwum.
- Zamknięcie bez submitu nie woła `POST /runs`; ponowne otwarcie = `EMPTY_START_DRAFT`.
- Disable + tooltip na CTA i na submitcie w modalu przy nieaktywnych agentach.
- 202: toast „Run wystartował” (jeden, z formularza), modal zamknięty, pathname `/runs`, box pokazuje run; lista archiwum bez nowego wiersza.
- 409 `CONTEXT_INCOMPLETE` / 400: `EnvelopeError` w modalu, zero toasta, modal zostaje otwarty.
- Konto (KROK 1): inline + prefill bez regresji.

---

#### Propozycja commit message

```text
feat(runs): allow starting an agent from the archive view

Reuse the account brief in a dialog so operators can start a run without leaving /runs.
```

---

## Weryfikacja wycinka

- Kotwica: major Faza 7 (7.1–7.2) pokryta; F-6/F-7/F-8 i `docs/ux_dashboard.md` (Runy + Konto) bez drugiej normy.
- Nagłówki wyłącznie `FAZA` / `KROK`; commit EN Conventional Commits na końcu FAZA 1.
- Nowe pliki: kompletny kod (`tooltip.tsx`, `start-run-gate.tsx`, `start-agent-dialog.tsx`). Refaktory: fragmenty `teraz` → `zamień na`.
- Pass rozwojowy: Tooltip + host formularza przed modalem; brak przesunięć między fazami major.
- Brak sekretów; `API_BASE_URL` nietknięty; brak `NEXT_PUBLIC_*`.
- Testy FE świadomie pominięte (T-7).
- Major / docs / SPEC **nietknięte** w tej sesji.
- Statusy kroków feature: `NIE_ROZPOCZĘTY`.

### Pre-flight UI (`content-chain-product-ui`)

- IA: Runy = archiwum + CTA/modal; Konto = inline; szczegóły bez startu; box poza Kontem.
- Dziedziczenie locku; Dialog/Tooltip w tokenach; CTA nie wrapuje się na desktop (`whitespace-nowrap` już w `Button`).
- Envelope inline; toast tylko 202; empty archiwum bez zmiany sensu (CTA jest następnym krokiem na widoku).
- Zero em-dash w copy UI; zero nowej palety.

---

## Ślad do major (informacyjnie, po implementacji)

| Element major | Po implementacji |
|---------------|------------------|
| Faza 7 | `WYKONANY` |
| Krok 7.1 | `WYKONANY` |
| Krok 7.2 | `WYKONANY` |
| MILESTONE po Fazie 7 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |

Faza 3 / Krok 3.1 / 3.5 / MILESTONE 3 / Faza 6 / MILESTONE 6 **bez przepisywania** (historia).
