# Content Chain — feature plan: modernizacja szaty graficznej (Faza 22 FE)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-22-modernizacja-szaty.md`  
**Kotwica major:** Faza 22 (cała) — `content-chain-frontend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 22).  
**Refaktor względem:** **Faza 1 / Krok 1.4 / 1.4.4** (`WYKONANY`) — pierwszy visual lock (sidebar jasny, status = dot + muted, logowanie = wyśrodkowana karta, brak KPI). Od tej fazy obowiązuje **drugi visual lock** (`docs/ux_dashboard.md` „Normy wizualne” + `SPEC-FRONTEND.md` **F-11…F-19**). Faza 1 / 1.4 / 1.4.4 oraz dziedziczenie locku w Fazach 2–21 pozostają historią (`WYKONANY`).  
**Źródła:** `docs/ux_dashboard.md`, `docs/brand_types.md`, `docs/dokumentacja_komunikacji.md` (`GET /runs/summary`), `SPEC-FRONTEND.md` F-11…F-19 / F-2 / F-3 / F-8, `SPEC-KOMUNIKACJA.md` K-2k, `SPEC-RUNY.md` R-13, `SPEC-TESTY.md` T-7, major FE Faza 22; kontrakt api (poza kodem tego wycinka) = major BE Faza 24.  
**Numer FE 22 ≠ BE 24.**  
**Skill UI:** `content-chain-product-ui` — **drugi visual lock** (nie „dziedzicz palety Fazy 1”).  
**Kolejność `KROK`:** tokeny → badge → sidebar → hero → split-panel → chipy → invite → floating → klient summary → KPI na Koncie.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 22 majoru FE: drugi visual lock (F-11…F-19) + KPI cards na Koncie (F-16) |
| Major | Faza 22; start po Fazach 1–21 (`WYKONANY`) i Milestone 1–6 / 2.1 / 3.5 / 3.6 (`OSIĄGNIĘTY`); **bez** MILESTONE 22 |
| Poza zakresem | Implementacja `apps/api` / BE Faza 24; **przełącznik** light/dark / dual-mode (kanon = stały dark shell); zmiana logiki SSE / HITL / feedbacku / autoryzacji (poza konsumentem summary); nowe pozycje nawigacyjne; **MILESTONE 22**; Playwright; trzecia paleta poza kanonem |
| Zależność BE (sesja implementacji) | Przed startem kodu FE: `RunsSummaryResponse` w `@content-chain/shared` oraz działający `GET /api/v1/runs/summary` (gate / HOW major BE Faza 24). Dostarczenie BE = poza tym plikiem |
| Po implementacji (informacyjnie) | Major FE: Faza 22 → `WYKONANY` (DoD gate + kod). Brak `MILESTONE` 22. Faza 1 / 1.4 historia. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (FE Faza 22 / SPEC) | Feature | Zakres |
|---------------------------|---------|--------|
| F-11 tokeny + primary + `@theme` | FAZA 1 / KROK 1 | `globals.css` |
| F-12 badge-pill statusów | FAZA 1 / KROK 2 | `RunStatusView` |
| F-14 dark shell (ciemny sidebar + ciemny main) + logo-area | FAZA 1 / KROK 3 | `AppSidebar` + tokeny `:root` |
| F-13 hero `running` \| `awaiting_hitl` | FAZA 1 / KROK 4 | detail + komponent hero |
| F-15 split-panel `/` | FAZA 2 / KROK 1 | `HomeEntry` |
| F-17 lifting chipów | FAZA 2 / KROK 2 | Demo / Completeness |
| F-18 invite-accept | FAZA 2 / KROK 3 | `AcceptInviteForm` |
| F-19 floating box | FAZA 2 / KROK 4 | `FloatingRunsBox` (+ badge z F-12) |
| F-16 KPI | FAZA 3 / KROK 1–2 | API klient + karty na Koncie |

**Pass rozwojowy (sesja planu):**

1. Tokeny CSS (KROK 1) **przed** badge, sidebar, hero, chipami, invite, floating.
2. Badge (KROK 2) **przed** floating lifting (używa `RunStatusView`).
3. Sidebar / hero niezależne od split-panelu — po tokenach.
4. Split-panel, chipy, invite — po tokenach; kolejność w FAZA 2 jak wyżej.
5. `parseRunsSummary` + `fetchRunsSummary` **przed** komponentem KPI.
6. KPI wire w `AccountView` na końcu.
7. **Brak przesunięć między fazami major.** **Brak przesunięć poza kolejnością KROK powyżej.**

---

## Założenia

- Stack FE bez zmian: Next.js **16.3**, React **19**, Tailwind **v4** (`@theme inline`), shadcn, Iconify, Geist — `apps/frontend/package.json`.
- `tsconfig` **bez** zmian. Typy jawne; zakaz `any` / `@ts-ignore`; `import type` dla typów; DTO KPI wyłącznie z `@content-chain/shared` (F-3 / F-16).
- Design Read (product-ui): *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.*
- Primary = żywy **indigo/violet** (wysoka chroma). **Pełny dark shell:** ciemny sidebar **i** ciemny `main` (jeden kanon; **bez** przełącznika light/dark / dual-mode). Zmiana względem: wcześniejsza decyzja „ciemny sidebar ≠ dark mode — main jasny”.
- Wartości `oklch` poniżej = HOW; mapa status→token = docs (bez zmiany przypisań).
- Flow auth / SSE / HITL / cancel / guest locki mutacji — **bez zmian** semantyki.
- Automatyczne testy `apps/frontend` — **poza MVP** (`SPEC-TESTY.md` T-7); DoD = checklist manual / obserwowalne.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.
- W planie **zakaz** odwołań do planów pomocniczych w rootcie; kanon = `docs/` + `spec/` + major.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| Tailwind v4 `@theme inline` | Context7 `/websites/tailwindcss` + istniejący `globals.css` | Custom kolory: definicja w `:root` / `.dark`, most `--color-*` w `@theme inline` → utility `bg-success`, `text-success-foreground` itd. | Rozszerzyć istniejący blok `@theme inline` o statusy; primary/sidebar przez zmianę `:root` |
| Next.js App Router | Konwencja repo | Client components jak dziś | Bez nowych zależności npm |
| `apiFetch` | F-2 / istniejący BFF | Same-origin `/api/v1/runs/summary` | Nowy `fetchRunsSummary` |

---

## FAZA 1 — Tokeny, badge, sidebar, hero

Odpowiada major FE Faza 22 (część F-11…F-14 / F-13). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Tokeny semantyczne + primary indigo/violet + ciemny sidebar

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Drugi visual lock w CSS — F-11, F-14 (wartości sidebar), `docs/brand_types.md` (tokeny + `@theme`), `docs/ux_dashboard.md` (paleta). Refaktor względem Fazy 1 / 1.4.4.

**Artefakty:**

- Zmiana: `apps/frontend/src/app/globals.css`

**teraz** (fragment `@theme inline` — brak mostów statusowych; po `--color-destructive`):

```css
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
```

**zamień na:**

```css
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-completed: var(--completed);
  --color-completed-foreground: var(--completed-foreground);
  --color-interrupted: var(--interrupted);
  --color-interrupted-foreground: var(--interrupted-foreground);
  --color-cancelled: var(--cancelled);
  --color-cancelled-foreground: var(--cancelled-foreground);
  --color-queued: var(--queued);
  --color-queued-foreground: var(--queued-foreground);
  --color-accent-foreground: var(--accent-foreground);
```

**teraz** (cały blok `:root` — primary muted + sidebar jasny):

```css
:root {
  --background: oklch(0.985 0.004 240);
  --foreground: oklch(0.22 0.02 240);
  --card: oklch(0.995 0.002 240);
  --card-foreground: oklch(0.22 0.02 240);
  --popover: oklch(0.995 0.002 240);
  --popover-foreground: oklch(0.22 0.02 240);
  --primary: oklch(0.4 0.05 230);
  --primary-foreground: oklch(0.985 0.01 230);
  --secondary: oklch(0.95 0.01 240);
  --secondary-foreground: oklch(0.28 0.02 240);
  --muted: oklch(0.95 0.01 240);
  --muted-foreground: oklch(0.5 0.02 240);
  --accent: oklch(0.95 0.012 230);
  --accent-foreground: oklch(0.28 0.03 230);
  --destructive: oklch(0.55 0.16 25);
  --border: oklch(0.9 0.01 240);
  --input: oklch(0.9 0.01 240);
  --ring: oklch(0.4 0.05 230);
  --chart-1: oklch(0.4 0.05 230);
  --chart-2: oklch(0.55 0.02 240);
  --chart-3: oklch(0.45 0.02 240);
  --chart-4: oklch(0.35 0.02 240);
  --chart-5: oklch(0.28 0.02 240);
  --radius: 0.5rem;
  --sidebar: oklch(0.97 0.008 240);
  --sidebar-foreground: oklch(0.22 0.02 240);
  --sidebar-primary: oklch(0.4 0.05 230);
  --sidebar-primary-foreground: oklch(0.985 0.01 230);
  --sidebar-accent: oklch(0.93 0.012 230);
  --sidebar-accent-foreground: oklch(0.28 0.03 230);
  --sidebar-border: oklch(0.9 0.01 240);
  --sidebar-ring: oklch(0.4 0.05 230);
}
```

**zamień na:**

```css
:root {
  /* Pełny dark shell — main + sidebar ciemne (jeden kanon; bez przełącznika) */
  --background: oklch(0.18 0.025 285);
  --foreground: oklch(0.93 0.01 285);
  --card: oklch(0.23 0.03 285);
  --card-foreground: oklch(0.93 0.01 285);
  --popover: oklch(0.23 0.03 285);
  --popover-foreground: oklch(0.93 0.01 285);
  /* Primary: żywy indigo/violet — jaśniejszy pod dark canvas */
  --primary: oklch(0.65 0.2 285);
  --primary-foreground: oklch(0.99 0.01 285);
  --secondary: oklch(0.28 0.03 285);
  --secondary-foreground: oklch(0.93 0.01 285);
  --muted: oklch(0.28 0.025 285);
  --muted-foreground: oklch(0.72 0.02 285);
  --accent: oklch(0.3 0.05 285);
  --accent-foreground: oklch(0.95 0.01 285);
  --destructive: oklch(0.65 0.18 25);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.65 0.2 285);
  --chart-1: oklch(0.65 0.2 285);
  --chart-2: oklch(0.62 0.12 250);
  --chart-3: oklch(0.58 0.1 200);
  --chart-4: oklch(0.62 0.14 145);
  --chart-5: oklch(0.68 0.14 70);
  --radius: 0.5rem;
  /* Sidebar ciemniejszy od main (hierarchia chrome) */
  --sidebar: oklch(0.14 0.03 285);
  --sidebar-foreground: oklch(0.93 0.01 285);
  --sidebar-primary: oklch(0.65 0.2 285);
  --sidebar-primary-foreground: oklch(0.99 0.01 285);
  --sidebar-accent: oklch(0.26 0.045 285);
  --sidebar-accent-foreground: oklch(0.95 0.01 285);
  --sidebar-border: oklch(1 0 0 / 12%);
  --sidebar-ring: oklch(0.65 0.2 285);
  /* Statusy — unikalne rodziny (F-11 / F-12); lightness pod dark canvas */
  --success: oklch(0.68 0.15 145);
  --success-foreground: oklch(0.18 0.03 145);
  --warning: oklch(0.78 0.14 75);
  --warning-foreground: oklch(0.22 0.05 75);
  --completed: oklch(0.68 0.12 230);
  --completed-foreground: oklch(0.18 0.03 230);
  --interrupted: oklch(0.7 0.12 45);
  --interrupted-foreground: oklch(0.2 0.04 45);
  --cancelled: oklch(0.65 0.04 285);
  --cancelled-foreground: oklch(0.92 0.01 285);
  --queued: oklch(0.68 0.08 250);
  --queued-foreground: oklch(0.18 0.03 250);
}
```

**teraz** (blok `.dark` — **zsynchronizuj** z tym samym dark shellem w `:root`, bez włączania dual-mode / przełącznika w UI):

W `.dark` ustaw te same wartości co w `:root` powyżej (primary / sidebar / statusy / surfaces) — klasa `.dark` może istnieć w CSS, ale produkt **nie** przełącza motywu; kanon = dark shell z `:root`.

**DoD kroku:**

- Utility Tailwind `bg-success`, `text-warning-foreground`, `border-completed` itd. działają (most `@theme`).
- Primary = indigo/violet; `--background` i `--sidebar` **ciemne** w `:root` (pełny dark shell).
- Brak hex/rgb statusów „na piechotę” w CSS poza tokenami `oklch`.
- Komentarz z-index / reduced-motion / Sonner — **bez zmian**.

---

### KROK 2 — `RunStatusView`: badge-pill 1:1 per `RunStatus`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-12 / mapa docs. Refaktor względem prezentacji dot + muted z Fazy 1 / 3.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/run-status.tsx`

**Pełny plik po zmianie** (`run-status.tsx`):

```tsx
import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS } from '@/modules/runs/api/run-labels';

type RunStatusViewProps = {
  readonly status: RunStatus;
  readonly compact?: boolean;
  readonly className?: string;
};

const STATUS_PILL: Record<RunStatus, string> = {
  running: 'border-success/40 bg-success/15 text-success',
  awaiting_hitl: 'border-warning/50 bg-warning/20 text-warning-foreground',
  completed: 'border-completed/40 bg-completed/15 text-completed',
  failed: 'border-destructive/40 bg-destructive/15 text-destructive',
  interrupted: 'border-interrupted/40 bg-interrupted/15 text-interrupted',
  cancelled: 'border-cancelled/40 bg-cancelled/20 text-cancelled-foreground',
  queued: 'border-queued/40 bg-queued/15 text-queued',
};

export function RunStatusView({ status, compact = false, className }: RunStatusViewProps) {
  const label = compact ? RUN_STATUS_SHORT_LABELS[status] : RUN_STATUS_LABELS[status];
  const liveMotion = status === 'running' || status === 'awaiting_hitl';

  return (
    <span
      data-slot="run-status"
      data-status={status}
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums',
        STATUS_PILL[status],
        liveMotion && 'motion-safe:animate-pulse',
        className,
      )}
    >
      {label}
    </span>
  );
}
```

**DoD kroku:**

- Forma pill; każdy `RunStatus` inny token (compact = ta sama mapa).
- Brak samego kółka (dot); `completed` ≠ kolor `running`.
- Listy / floating / detail używają tego samego komponentu bez osobnej mapy.

---

### KROK 3 — `AppSidebar`: logo-area + aktywny = primary

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-14 (chrome). Tokeny ciemnego sidebara już z KROK 1 (`bg-sidebar`).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/shell/components/app-sidebar.tsx`

**teraz:**

```tsx
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="px-3 py-3">
        <p className="text-sm font-medium">Content Chain</p>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/70',
              )}
            >
```

**zamień na:**

```tsx
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <p className="text-sm font-medium tracking-tight">Content Chain</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-sidebar-accent/70',
              )}
            >
```

Usuń nieużywany import `Separator`, jeśli po usunięciu `<Separator />` nie ma innych użyć w pliku.

**DoD kroku:**

- Logo-area `h-14` + `border-b`.
- Aktywny nav = `bg-primary text-primary-foreground`.
- Sidebar wizualnie ciemny; `main` również ciemny (dark shell); chipy na dole bez zmiany pozycji.

---

### KROK 4 — Hero banner na detail (`running` \| `awaiting_hitl`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-13. `interrupted` / queued / terminalne — **bez** hero (tylko badge z KROK 2).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/run-live-hero.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx`

#### Nowy plik — pełny kod

`apps/frontend/src/modules/runs/components/run-live-hero.tsx`:

```tsx
import type { RunStatus } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
import { RunStatusView } from '@/modules/runs/components/run-status';

type RunLiveHeroProps = {
  readonly status: RunStatus;
  readonly className?: string;
};

export function RunLiveHero({ status, className }: RunLiveHeroProps) {
  if (status !== 'running' && status !== 'awaiting_hitl') {
    return null;
  }

  return (
    <div
      data-slot="run-live-hero"
      data-status={status}
      className={cn(
        'rounded-lg border px-4 py-3',
        status === 'running' &&
          'border-success/30 bg-gradient-to-r from-success/25 via-success/10 to-transparent',
        status === 'awaiting_hitl' &&
          'border-warning/40 bg-gradient-to-r from-warning/30 via-warning/10 to-transparent',
        'motion-safe:animate-pulse',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium">
          {status === 'running' ? 'Run w toku' : 'Oczekuje na decyzję HITL'}
        </p>
        <RunStatusView status={status} />
      </div>
    </div>
  );
}
```

#### Wire w `RunDetailsView`

**teraz** (importy + fragment headera):

```tsx
import { RunStatusView } from '@/modules/runs/components/run-status';
```

```tsx
      <header className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{RUN_TASK_TYPE_LABELS[snapshot.taskType]}</h1>
        <p className="text-sm text-muted-foreground">
          {RUN_PLATFORM_LABELS[snapshot.platform]}
          {snapshot.contentKind ? ` · ${CONTENT_KIND_LABELS[snapshot.contentKind]}` : ''}
          {` · ${LANGUAGE_LABELS[snapshot.language]}`}
          {snapshot.startedBy ? ` · ${snapshot.startedBy.email}` : ''}
          <span className="ml-2">
            <IsoDateTime iso={snapshot.createdAt} />
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <RunStatusView status={snapshot.status} />
          {canCancel ? (
            <Button type="button" variant="outline" size="sm" onClick={() => setCancelOpen(true)}>
              Stop
            </Button>
          ) : null}
        </div>
      </header>
```

**zamień na:**

```tsx
import { RunLiveHero } from '@/modules/runs/components/run-live-hero';
import { RunStatusView } from '@/modules/runs/components/run-status';
```

```tsx
      <header className="flex flex-col gap-2">
        <h1 className="text-lg font-medium">{RUN_TASK_TYPE_LABELS[snapshot.taskType]}</h1>
        <p className="text-sm text-muted-foreground">
          {RUN_PLATFORM_LABELS[snapshot.platform]}
          {snapshot.contentKind ? ` · ${CONTENT_KIND_LABELS[snapshot.contentKind]}` : ''}
          {` · ${LANGUAGE_LABELS[snapshot.language]}`}
          {snapshot.startedBy ? ` · ${snapshot.startedBy.email}` : ''}
          <span className="ml-2">
            <IsoDateTime iso={snapshot.createdAt} />
          </span>
        </p>
        <RunLiveHero status={snapshot.status} />
        {snapshot.status === 'running' || snapshot.status === 'awaiting_hitl' ? null : (
          <div className="flex flex-wrap items-center gap-2">
            <RunStatusView status={snapshot.status} />
          </div>
        )}
        {canCancel ? (
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setCancelOpen(true)}>
              Stop
            </Button>
          </div>
        ) : null}
      </header>
```

Uwaga: przy `running` / `awaiting_hitl` badge jest **wewnątrz** hero (unikaj duplikatu). Stop zostaje poza hero.

**DoD kroku:**

- Hero tylko dla `running` \| `awaiting_hitl`.
- `interrupted` = badge, **bez** hero.
- Gradient z tokenów success/warning; `prefers-reduced-motion` respektowany przez istniejący media query w `globals.css`.

---

#### Propozycja commit message

```text
feat(ui): apply second visual lock tokens, status pills, dark sidebar, and live hero

Replace the Phase 1 muted chrome with indigo/violet primary, semantic RunStatus badges, dark sidebar chrome, and a detail hero limited to running and awaiting_hitl.
```

---

## FAZA 2 — Split-panel i lifting powierzchni

Odpowiada major FE Faza 22 (F-15, F-17…F-19). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Split-panel na `/` (`HomeEntry`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-15. Flow auth (F-4a / F-4b / F-8) **bez zmian** — tylko layout.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx`
- (Opcjonalnie nowy helper JSX w tym samym pliku — bez osobnego pliku, jeśli krótki.)

Dodaj komponent pomocniczy w tym samym pliku (przed `HomeEntryInner`):

```tsx
function GuestBrandPanel() {
  return (
    <aside
      data-slot="guest-brand-panel"
      className="relative hidden w-[min(42%,28rem)] shrink-0 flex-col justify-between overflow-hidden bg-primary px-8 py-10 text-primary-foreground lg:flex"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80"
      />
      <div className="relative z-10 flex flex-col gap-6">
        <p className="text-xl font-semibold tracking-tight">Content Chain</p>
        <div className="flex max-w-sm flex-col gap-3 text-sm leading-relaxed text-primary-foreground/90">
          <p>
            Self-hostowy dashboard do uruchamiania agentów contentowych — od briefu po przegląd
            wyniku.
          </p>
          <p>Jedna sesja, ciemny obszar roboczy i kontrola HITL tam, gdzie decyzja należy do Ciebie.</p>
        </div>
      </div>
      <p className="relative z-10 text-sm font-medium text-primary-foreground/95">
        Zaloguj się, aby wejść do panelu operatora.
      </p>
    </aside>
  );
}
```

**teraz** (loading authenticated / skeleton return):

```tsx
  if (state.status === 'loading' || state.status === 'authenticated') {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-4">
        <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <Toaster />
      {view.mode === 'thank_you' ? (
```

**zamień na:**

```tsx
  if (state.status === 'loading' || state.status === 'authenticated') {
    return (
      <div className="flex min-h-dvh bg-background">
        <GuestBrandPanel />
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-background">
      <GuestBrandPanel />
      <div className="flex flex-1 items-center justify-center p-4">
        <Toaster />
        {view.mode === 'thank_you' ? (
```

Zamknij dodatkowy wrapper po bloku formularzy (przed końcem `return`):

**teraz:**

```tsx
      )}
    </div>
  );
}
```

**zamień na:**

```tsx
      )}
      </div>
    </div>
  );
}
```

Suspense fallback — ten sam układ split (BrandPanel + skeleton), spójnie z loadingiem.

**DoD kroku:**

- `lg+`: lewy brand + prawy formularz; mobile: tylko formularz (`hidden lg:flex` na panelu).
- Tryby `login` \| `register` \| `bootstrap_admin` \| thank-you bez zmiany API.
- Copy korzyści po polsku; brand „Content Chain” widoczny w panelu.

---

### KROK 2 — Lifting chipów (Demo / Agenci)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-17 — kolorowy **lewy border**; pozycja / semantyka bez zmian.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/demo/components/demo-chip.tsx`
- Zmiana: `apps/frontend/src/modules/company-context/components/completeness-chip.tsx`

**DemoChip — teraz:**

```tsx
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
```

**zamień na:**

```tsx
      className="flex items-start gap-2 rounded-md border border-border border-l-4 border-l-warning px-2 py-2 text-xs"
```

**CompletenessChip — stan „Agenci aktywni” — teraz:**

```tsx
        className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
```

**zamień na:**

```tsx
        className="flex items-start gap-2 rounded-md border border-border border-l-4 border-l-success px-2 py-2 text-xs"
```

**CompletenessChip — stan „Agenci nieaktywni” — teraz:**

```tsx
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
```

**zamień na:**

```tsx
      className="flex items-start gap-2 rounded-md border border-border border-l-4 border-l-interrupted px-2 py-2 text-xs"
```

**DoD kroku:**

- Demo / aktywni / nieaktywni: widoczny lewy border z tokenów.
- Predykat `agentsActive` / DemoChip visibility — bez zmian.

---

### KROK 3 — Lifting `/invite/accept`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-18 — kosmetyka tokenów / gęstości; flow i copy **bez zmian**.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`

**teraz** (oba `Card` — brak tokenu / pusty token):

```tsx
      <Card className="w-full max-w-md border bg-card shadow-none">
```

**zamień na** (oba wystąpienia):

```tsx
      <Card className="w-full max-w-md border border-border bg-card shadow-none ring-1 ring-primary/10">
```

Opcjonalnie: `CardHeader` — `className="gap-1.5 pb-2"` (gęstość); **bez** zmiany tekstów / `ACCEPT_INVITE_DEMO_HINT` / submit.

**DoD kroku:**

- Karta accept-invite wizualnie spójna z drugim lockiem.
- Envelope / nawigacja po sukcesie — bez zmian.

---

### KROK 4 — Lifting floating box

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-19. Badge już z F-12; tu kosmetyka shella. Zachowanie Stop / pozycja / copy — **bez zmian**.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/floating-runs-box.tsx`

**teraz:**

```tsx
      className="fixed right-4 bottom-4 z-(--z-overlay) w-80 max-w-[calc(100%-2rem)] rounded-lg border border-border bg-card text-sm"
```

**zamień na:**

```tsx
      className="fixed right-4 bottom-4 z-(--z-overlay) w-80 max-w-[calc(100%-2rem)] rounded-lg border border-border bg-card text-sm shadow-sm ring-1 ring-primary/5"
```

**DoD kroku:**

- Box używa pill statusów (z KROK 2 FAZY 1).
- Brak Stop w boxie; reguły collapsu / linków — bez zmian.

---

#### Propozycja commit message

```text
feat(ui): add login split-panel and lift chips, invite, and floating box

Complete the second visual lock guest and chrome surfaces without changing auth, demo, or SSE behavior.
```

---

## FAZA 3 — KPI cards na Koncie (F-16)

Odpowiada major FE Faza 22 / F-16. Status startowy kroków: `NIE_ROZPOCZĘTY`.

**Wymaganie sesji implementacji:** eksport `RunsSummaryResponse` z `@content-chain/shared` oraz `GET /api/v1/runs/summary` dostępne przez BFF (dostarczenie BE po stronie użytkownika — przed tymi krokami).

---

### KROK 1 — Klient `fetchRunsSummary` + parser

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-2 / F-3 / F-16 / K-2k — thin client; DTO z shared; runtime parse jak pozostałe runs API.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/api/runs.types.ts` — dodaj `parseRunsSummary`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.api.ts` — dodaj `fetchRunsSummary`

#### Parser (dopisz do `runs.types.ts`)

Importy: `isRunTaskType`, `type RunsSummaryResponse`, `type RunTaskType` z `@content-chain/shared` (obok istniejących).

```typescript
export function parseRunsSummary(value: unknown): RunsSummaryResponse {
  if (
    !isRecord(value) ||
    typeof value.windowFrom !== 'string' ||
    typeof value.windowTo !== 'string' ||
    typeof value.totalLast30d !== 'number' ||
    typeof value.successRateLast30d !== 'number' ||
    typeof value.activeNow !== 'number'
  ) {
    throw new Error('Invalid runs summary');
  }

  let topTaskTypeLast30d: RunTaskType | null = null;
  if (value.topTaskTypeLast30d !== null && value.topTaskTypeLast30d !== undefined) {
    if (typeof value.topTaskTypeLast30d !== 'string' || !isRunTaskType(value.topTaskTypeLast30d)) {
      throw new Error('Invalid runs summary topTaskType');
    }
    topTaskTypeLast30d = value.topTaskTypeLast30d;
  }

  return {
    windowFrom: value.windowFrom,
    windowTo: value.windowTo,
    totalLast30d: value.totalLast30d,
    successRateLast30d: value.successRateLast30d,
    activeNow: value.activeNow,
    topTaskTypeLast30d,
  };
}
```

#### API (dopisz do `runs.api.ts`)

```typescript
import type { RunsSummaryResponse } from '@content-chain/shared';
import { parseRunsSummary } from '@/modules/runs/api/runs.types';

export async function fetchRunsSummary(): Promise<RunsSummaryResponse> {
  const body = await apiFetch('/runs/summary');
  return parseRunsSummary(body);
}
```

(Scal importy `RunsSummaryResponse` / `parseRunsSummary` z istniejącymi — bez duplikatów.)

**DoD kroku:**

- `GET` same-origin przez BFF; parse rzuca przy kalekim shape.
- Typ odpowiedzi = `RunsSummaryResponse` z shared (bez lokalnego duplikatu DTO).

---

### KROK 2 — `AccountKpiCards` powyżej „Start runu”

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** F-16 / docs Konto — karty; guest tylko przy `demoMode === true`; błąd → ukryj blok.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/account-kpi-cards.tsx`
- Nowy: `apps/frontend/src/modules/runs/lib/format-kpi-window.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx`

#### Nowy — `format-kpi-window.ts`

```typescript
const DATE_FORMAT = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

/** np. `15.06.2026–14.07.2026` (docs UX). */
export function formatKpiWindow(windowFrom: string, windowTo: string): string {
  const fromMs = Date.parse(windowFrom);
  const toMs = Date.parse(windowTo);
  if (Number.isNaN(fromMs) || Number.isNaN(toMs)) {
    return `${windowFrom}–${windowTo}`;
  }
  return `${DATE_FORMAT.format(fromMs)}–${DATE_FORMAT.format(toMs)}`;
}
```

#### Nowy — `account-kpi-cards.tsx` (pełny kod)

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { RunsSummaryResponse } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useDemoMode } from '@/modules/demo/components/demo-mode-provider';
import { fetchRunsSummary } from '@/modules/runs/api/runs.api';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { formatKpiWindow } from '@/modules/runs/lib/format-kpi-window';

type KpiState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'hidden' }
  | { readonly status: 'ready'; readonly summary: RunsSummaryResponse };

function shouldFetchKpi(role: string, demoReady: boolean, demoMode: boolean): boolean {
  if (role === 'admin' || role === 'user') return true;
  if (role === 'guest') return demoReady && demoMode;
  return false;
}

export function AccountKpiCards() {
  const { state: session } = useSession();
  const { state: demo } = useDemoMode();
  const [state, setState] = useState<KpiState>({ status: 'idle' });
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (session.status !== 'authenticated') {
      setState({ status: 'hidden' });
      return;
    }

    const demoReady = demo.status === 'ready';
    const demoMode = demo.status === 'ready' ? demo.demoMode : false;

    if (session.user.role === 'guest' && demo.status === 'loading') {
      setState({ status: 'loading' });
      return;
    }

    if (!shouldFetchKpi(session.user.role, demoReady, demoMode)) {
      setState({ status: 'hidden' });
      return;
    }

    const requestId = ++requestIdRef.current;
    setState({ status: 'loading' });

    void fetchRunsSummary()
      .then((summary) => {
        if (requestId !== requestIdRef.current) return;
        setState({ status: 'ready', summary });
      })
      .catch((reason: unknown) => {
        if (requestId !== requestIdRef.current) return;
        void reason;
        if (reason instanceof ApiError) {
          setState({ status: 'hidden' });
          return;
        }
        setState({ status: 'hidden' });
      });

    return () => {
      requestIdRef.current += 1;
    };
  }, [session, demo]);

  if (state.status === 'hidden' || state.status === 'idle') {
    return null;
  }

  if (state.status === 'loading') {
    return (
      <section className="flex max-w-3xl flex-col gap-3" data-slot="account-kpi" aria-busy="true">
        <h2 className="text-base font-medium">Statystyki</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    );
  }

  const { summary } = state;
  const topLabel =
    summary.topTaskTypeLast30d === null
      ? '—'
      : RUN_TASK_TYPE_LABELS[summary.topTaskTypeLast30d];

  const cards: readonly { readonly title: string; readonly value: string }[] = [
    { title: 'Runy (30 dni)', value: String(summary.totalLast30d) },
    {
      title: 'Skuteczność',
      value: `${summary.successRateLast30d.toLocaleString('pl-PL', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
      })}%`,
    },
    { title: 'Aktywne teraz', value: String(summary.activeNow) },
    { title: 'Najczęstszy typ', value: topLabel },
  ];

  return (
    <section className="flex max-w-3xl flex-col gap-3" data-slot="account-kpi">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base font-medium">Statystyki</h2>
        <p className="text-xs text-muted-foreground">
          Okno: {formatKpiWindow(summary.windowFrom, summary.windowTo)}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border bg-card shadow-none">
            <CardHeader className="gap-1 px-4 pt-4 pb-1">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-lg font-semibold tabular-nums tracking-tight">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

#### Wire w `AccountView`

**teraz:**

```tsx
import { MyRunsList } from '@/modules/runs/components/my-runs-list';
```

```tsx
      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Email</h2>
        <AccountEmailForm />
      </section>
      <div className="max-w-xl">
        <StartRunForm draft={draft} onDraftChange={setDraft} idPrefix="start" heading="visible" />
      </div>
```

**zamień na:**

```tsx
import { AccountKpiCards } from '@/modules/runs/components/account-kpi-cards';
import { MyRunsList } from '@/modules/runs/components/my-runs-list';
```

```tsx
      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Email</h2>
        <AccountEmailForm />
      </section>
      <AccountKpiCards />
      <div className="max-w-xl">
        <StartRunForm draft={draft} onDraftChange={setDraft} idPrefix="start" heading="visible" />
      </div>
```

Kolejność sekcji: Email → **Statystyki (KPI)** → Start runu → Moje runy.

**DoD kroku:**

- KPI **powyżej** „Start runu”.
- `admin` / `user`: fetch zawsze; `guest`: tylko `demoMode === true`; inaczej brak bloku.
- Błąd HTTP / parse → blok **ukryty** (bez kart z treścią błędu KPI).
- Metryki + zakres dat z `windowFrom` / `windowTo`.
- Karty = border / tło / radius (forma kart dozwolona dla KPI — F-16 / product-ui).

---

#### Propozycja commit message

```text
feat(account): show KPI cards from runs summary above start run

Fetch GET /runs/summary for admin and user always, and for guest only when demo mode is on; hide the block on any fetch error.
```

---

## Weryfikacja wycinka

| Kryterium | Sprawdzenie |
|-----------|-------------|
| F-11 | Tokeny + `@theme` w `globals.css`; primary indigo/violet |
| F-12 | Pill 1:1; brak shared muted / dot |
| F-13 | Hero tylko `running` \| `awaiting_hitl`; `interrupted` bez hero |
| F-14 | Ciemny sidebar; logo `h-14`; aktywny = primary; main ciemny (dark shell) |
| F-15 | Split `lg+`; mobile = formularz |
| F-16 | KPI nad Start; DTO shared; guest∧demo; błąd → ukryj |
| F-17…F-19 | Lewy border chipów; lifting invite + floating |
| Product-ui | Drugi lock; Design Read; anti-tells (bez glow / stock purple drift) |
| BE | Ten plan **nie** implementuje api; wymaga shared + endpoint przed FAZA 3 |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit messages | EN Conventional Commits na końcu każdej FAZY |
| Helper plans | brak odwołań do `*-plan.md` w rootcie |
| Major | nietknięty w tej sesji |
| Testy FE | poza MVP (T-7) — checklist manual |

**Checklist manual (po implementacji):**

1. `/` desktop: split brand \| form; mobile: tylko form.
2. Po sesji: ciemny sidebar, ciemny main (dark shell), aktywna pozycja primary.
3. Listy / floating / detail: unikalne badge statusów.
4. Detail `running` / `awaiting_hitl`: hero; `interrupted`: badge bez hero.
5. Konto: KPI nad Start (admin/user); guest∧demo on → KPI; demo off → brak; wyłączony endpoint → brak bloku.
6. Chipy: lewy border; invite-accept i floating spójne wizualnie.

---

## Ślad do major (informacyjnie, po implementacji)

| Element | Po wdrożeniu kodu |
|---------|-------------------|
| Faza 22 FE | `WYKONANY` (DoD gate + HOW z tego planu) |
| MILESTONE 22 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 1 / 1.4 / 1.4.4 | historia (`WYKONANY`) — bez przepisywania |
| BE Faza 24 | osobny ślad (poza tym plikiem) |

Edycja pliku major = **poza** tą sesją feature-planu / poza `/create-feature-implementation-plan`.
