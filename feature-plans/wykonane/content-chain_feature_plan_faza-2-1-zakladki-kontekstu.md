# Content Chain — feature plan: Faza 2.1 (zakładki kontekstu)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Zakładki widoku Kontekst firmy + indykatory bramki na triggerach |
| Major | `content-chain-frontend_major_plan.md` — Faza 2.1 / Krok 2.1.1 + MILESTONE 2.1 |
| Bramka ścieżki wstecz | Spełniona: Faza 1 i Faza 2 `WYKONANY`; MILESTONE 1 i 2 `OSIĄGNIĘTY` |
| Refaktor względem | Major Faza 2 / Krok 2.1 (`WYKONANY`) — ten sam formularz i jeden `PUT`; inna IA (zakładki + kropki) |
| Źródła | `docs/ux_dashboard.md` (Widok: Kontekst firmy), `spec/SPEC-FRONTEND.md` F-8, `spec/SPEC-KONTEKST-FIRMY.md` C-1–C-4 / C-8, skill `content-chain-product-ui` |
| Poza zakresem tego pliku | Chip chrome, `CompletenessProvider`, trasa `/context`, authz, kontrakt `GET`/`PUT`, Faza 3 (Konto/start), `PATCH` per zakładka, podzakładki extras, sync zakładki z URL, nowa paleta, BFF/`apiFetch` |
| Po implementacji (informacyjnie) | Major FE: Faza 2.1 i Krok 2.1.1 → `WYKONANY`; MILESTONE 2.1 → `OSIĄGNIĘTY`. Faza 2 / Krok 2.1 i MILESTONE 2 **bez zmian** (historia). **Edycja major poza tym skillem.** |

Kolejność `KROK` w tym pliku: model i indykator → prymityw Tabs → refaktor formularza. Mapowanie: KROK 1–3 razem = major 2.1.1.

**Pass rozwojowy:** KROK 3 używa unii zakładek i kropki z KROK 1 oraz `shared/ui/tabs` z KROK 2. Stan draftu zostaje w `CompanyContextView` — odmontowanie nieaktywnego `TabsContent` nie gubi pól przy `PUT`. Brak przesunięć. Brak przenosin między fazami major.

**HOW:** brak query/hash dla zakładki; CTA zapisu wyłącznie w aktywnym panelu (jeden `<form>`, jeden `PUT`); kolor kropki nie jest jedynym sygnałem (`aria-label` + `sr-only`).

**Design Read (dziedziczenie locku):** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Stack z projektu: Next.js **16.3.0** App Router, React 19, Tailwind v4, shadcn styl **radix-nova**, pakiet `radix-ui` ^1.6.7, `@iconify/react`, `@content-chain/shared`. `tsconfig` `strict: true`; **nie** włączamy `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess`.
- Fetch i parser: bez zmian (`apiFetch`, `unknown` → parser). Zakaz lokalnego `isComplete` na triggerze.
- Visual lock Fazy 1 zostaje. Zakaz nowej palety, `--success` w `:root` jako drugi brand, stock-fioletu, Card na każdą zakładkę, podzakładek, emoji, em-dash w copy UI.
- Semantyczna zieleń / czerwień kropki = status sekcji, nie akcent produktu (`SPEC-FRONTEND.md` Wolno). Czerwień = `--destructive`. Zieleń = lokalna klasa oklch na indykatorze — **nie** nowy token w `globals.css`.
- Testy automatyczne FE **poza MVP** (`SPEC-TESTY.md` T-7). Weryfikacja = DoD obserwowalne.
- Prettier root: `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: all`, `printWidth: 100`.
- Copy UI: polski. Envelope: `code` + `message` as-is.
- shadcn: `npx shadcn@latest add tabs` z katalogu `apps/frontend` (aliasy z `components.json`). Poniższy `tabs.tsx` to kompletny fallback w rytmie `dropdown-menu.tsx`. Jeśli CLI zapisze inny plik w `shared/ui`, **zostaw output CLI** i podłącz go w formularzu. Nie dokładaj nowej biblioteki.
- Context7 `/websites/ui_shadcn`: `Tabs` + `defaultValue` + `TabsTrigger`/`TabsContent` ze spójnym `value`. Registry radix-nova: `Tabs as TabsPrimitive` z pakietu `radix-ui` (nie `@radix-ui/react-tabs`). `onValueChange` **nie** woła zapisu. `forceMount` **nie** ustawiamy — draft jest w rodzicu.

---

## FAZA 1 — Zakładki widoku Kontekst firmy

Odpowiada major **Faza 2.1**.

### KROK 1 — Model zakładek i indykator z `missing`

**Status:** `WYKONANY`

**Cel:** FE ma zamkniętą unię sześciu zakładek i jeden werdykt kropki z `completeness.missing` ostatniego GET/PUT (nie draft, nie lokalne `isComplete`). Major 2.1.1; `SPEC-FRONTEND.md` F-8; `docs/ux_dashboard.md` (tabela zakładek); `SPEC-KONTEKST-FIRMY.md` C-1 (`extras` poza `missing`).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/api/company-context.types.ts`
- Nowy: `apps/frontend/src/modules/company-context/components/gate-completeness-dot.tsx`

**Implementacja (kolejność):** typy → komponent kropki. Formularz nadal ciągiem do KROK 3.

#### Refaktor — `company-context.types.ts`

Dopisz **po** `GATE_SECTION_LABELS` / `isGateSection` (istniejące `GATE_SECTIONS` bez zmian).

**Teraz:** po `isGateSection` od razu `OfferItem`.

**Zamień na** (wstawka między `isGateSection` a `OfferItem`):

```ts
export const CONTEXT_TABS = [...GATE_SECTIONS, 'extras'] as const;

export type ContextTab = (typeof CONTEXT_TABS)[number];

export const DEFAULT_CONTEXT_TAB: ContextTab = 'identity';

export const CONTEXT_TAB_LABELS = {
  ...GATE_SECTION_LABELS,
  extras: 'Dodatki',
} as const satisfies Record<ContextTab, string>;

export function isContextTab(value: string): value is ContextTab {
  return (CONTEXT_TABS as readonly string[]).includes(value);
}

/** `null` = zakładka poza bramką (Dodatki). `true` = klucz jest w `missing`. */
export function gateTabIsMissing(
  tab: ContextTab,
  missing: readonly GateSection[],
): boolean | null {
  if (tab === 'extras') return null;
  return missing.includes(tab);
}
```

Nie ruszaj parserów, `companyContextForPut`, `withDraftRows`.

#### Nowy plik — `apps/frontend/src/modules/company-context/components/gate-completeness-dot.tsx`

```tsx
import { cn } from '@/shared/utils/utils';
import {
  CONTEXT_TAB_LABELS,
  gateTabIsMissing,
  type ContextTab,
  type GateSection,
} from '@/modules/company-context/api/company-context.types';

type GateCompletenessDotProps = {
  readonly tab: ContextTab;
  readonly missing: readonly GateSection[];
};

export function GateCompletenessDot({ tab, missing }: GateCompletenessDotProps) {
  const missingFlag = gateTabIsMissing(tab, missing);
  if (missingFlag === null) return null;

  return (
    <span className="inline-flex items-center" data-slot="gate-completeness-dot">
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          missingFlag ? 'bg-destructive' : 'bg-[oklch(0.48_0.11_150)]',
        )}
      />
      <span className="sr-only">{missingFlag ? 'niekompletna' : 'kompletna'}</span>
    </span>
  );
}

export function gateTabAriaLabel(tab: ContextTab, missing: readonly GateSection[]): string {
  const label = CONTEXT_TAB_LABELS[tab];
  const missingFlag = gateTabIsMissing(tab, missing);
  if (missingFlag === null) return label;
  return `${label}, ${missingFlag ? 'niekompletna' : 'kompletna'}`;
}
```

#### Biblioteki / API

Brak nowego API. Werdykt = `missing.includes(section)` jak chip Fazy 2. Context7 nie dotyczy.

#### Testy

Poza MVP. Ręcznie: przy `missing: ['offer']` kropka Oferty czerwona + `sr-only` „niekompletna”; Tożsamość zielona + „kompletna”; wywołanie `GateCompletenessDot` z `tab="extras"` nic nie renderuje.

#### DoD (krok)

- Istnieje `ContextTab` = pięć sekcji bramki + `extras`; default `'identity'`.
- `gateTabIsMissing('extras', …)` zwraca `null`; dla bramki czyta wyłącznie tablicę `missing`.
- Kropka nie liczy kompletności z wartości pól formularza.

---

### KROK 2 — Prymityw Tabs w `shared/ui`

**Status:** `WYKONANY`

**Cel:** Kit ma `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` w locku Fazy 1, gotowe pod formularz. Major 2.1.1 (powierzchnia); `SPEC-FRONTEND.md` (shadcn); skill `content-chain-product-ui` (dziedziczenie, bez nowej palety).

**Artefakty:**

- Nowy: `apps/frontend/src/shared/ui/tabs.tsx`

**Implementacja:** z `apps/frontend` uruchom `npx shadcn@latest add tabs`. Jeśli CLI utworzy plik — zostaw go. Fallback poniżej (registry radix-nova, import `radix-ui`, alias `cn`). Nie instaluj `@radix-ui/react-tabs`.

#### Nowy plik — `apps/frontend/src/shared/ui/tabs.tsx`

```tsx
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/utils';
import { Tabs as TabsPrimitive } from 'radix-ui';

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn('group/tabs flex gap-2 data-horizontal:flex-col', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
        'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
        'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
```

Motion: `transition-all` / `after:transition-opacity` zostają z registry (focus/aktywna zakładka). Globalny `@media (prefers-reduced-motion: reduce)` w `globals.css` już gasi duration. Nie dokładaj GSAP / `motion`.

#### Biblioteki / API

- Context7 `/websites/ui_shadcn`: `defaultValue` na `Tabs`; każdy `TabsTrigger` ma `value` tożsame z `TabsContent`.
- Registry: https://ui.shadcn.com/r/styles/radix-nova/tabs.json — `from "radix-ui"`.
- CLI: `npx shadcn@latest add tabs` (MCP: `npx shadcn@latest add @shadcn/tabs`) z `apps/frontend`.

#### Testy

Poza MVP. Kompilacja / import w KROK 3.

#### DoD (krok)

- Istnieje eksport `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` z `@/shared/ui/tabs`.
- Import prymitywu z `radix-ui`, w tym samym stylu co `dropdown-menu.tsx`.
- Brak nowej palety i brak `NEXT_PUBLIC_*`.

---

### KROK 3 — Refaktor formularza: sześć paneli i jeden PUT

**Status:** `WYKONANY`

**Cel:** `/context` pokazuje zakładki z kanonu; wejście otwiera Tożsamość; zapis = pełny `PUT`; przełączenie nie zapisuje; `user` read-only. Major 2.1.1; `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-8 (zakaz `PATCH` per zakładka, zakaz kropki na Dodatki, zakaz zagnieżdżeń).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx`
- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-view.tsx` (szkielet loadingu pod listę zakładek)
- Bez zmian: `company-context.api.ts`, `completeness-provider.tsx`, `completeness-chip.tsx`, `app/(app)/context/page.tsx`

**Implementacja (kolejność):** importy i `FormActions` → triggery → panele z istniejącymi polami → szkielet widoku.

Pola `onChange` / `id` / `FormField` **bez zmian semantyki** względem Fazy 2. Znika `SectionHeading` (status był przy nagłówku bloku — teraz na triggerze).

Nie ustawiaj `onValueChange` na `Tabs` (poza ewentualnym no-op). Nie wołaj `onSubmit` przy zmianie zakładki.

`defaultValue={DEFAULT_CONTEXT_TAB}`. Kontrolowany `value` **nie** jest potrzebny.

#### Refaktor — `company-context-form.tsx`

Zamień **cały plik** (owinięcie każdej sekcji + CTA w panelu; pola te same).

```tsx
'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  CONTEXT_TAB_LABELS,
  DEFAULT_CONTEXT_TAB,
  GATE_SECTIONS,
  GATE_SECTION_LABELS,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import {
  GateCompletenessDot,
  gateTabAriaLabel,
} from '@/modules/company-context/components/gate-completeness-dot';

type CompanyContextFormProps = {
  readonly value: CompanyContext;
  readonly completeness: Completeness;
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
  readonly onChange: (next: CompanyContext) => void;
  readonly onSubmit: () => void;
};

function linesToList(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function listToLines(value: readonly string[]): string {
  return value.join('\n');
}

function commaToList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function extrasOrEmpty(extras: CompanyContextExtras | null): CompanyContextExtras {
  return extras ?? {};
}

function FormActions({
  readOnly,
  pending,
  error,
}: {
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {readOnly ? (
        <p className="text-sm text-muted-foreground">Tylko administrator może zapisać kontekst.</p>
      ) : (
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? 'Zapisywanie…' : 'Zapisz kontekst'}
        </Button>
      )}
    </div>
  );
}

export function CompanyContextForm({
  value,
  completeness,
  readOnly,
  pending,
  error,
  onChange,
  onSubmit,
}: CompanyContextFormProps) {
  const extras = extrasOrEmpty(value.extras);

  function patch(next: CompanyContext): void {
    onChange(next);
  }

  return (
    <form
      className="flex max-w-3xl flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Tabs defaultValue={DEFAULT_CONTEXT_TAB} className="gap-4">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0"
        >
          {GATE_SECTIONS.map((section) => (
            <TabsTrigger
              key={section}
              value={section}
              aria-label={gateTabAriaLabel(section, completeness.missing)}
              className="flex-none"
            >
              {GATE_SECTION_LABELS[section]}
              <GateCompletenessDot tab={section} missing={completeness.missing} />
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="extras"
            aria-label={gateTabAriaLabel('extras', completeness.missing)}
            className="flex-none"
          >
            {CONTEXT_TAB_LABELS.extras}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="flex flex-col gap-3">
          <FormField label="Nazwa firmy" htmlFor="identity-name">
            <Input
              id="identity-name"
              value={value.identity.name}
              disabled={readOnly}
              onChange={(event) =>
                patch({
                  ...value,
                  identity: { ...value.identity, name: event.target.value },
                })
              }
            />
          </FormField>
          <FormField label="Opis / misja" htmlFor="identity-description" hint="1–3 zdania.">
            <Textarea
              id="identity-description"
              value={value.identity.description}
              disabled={readOnly}
              onChange={(event) =>
                patch({
                  ...value,
                  identity: { ...value.identity, description: event.target.value },
                })
              }
            />
          </FormField>
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>

        <TabsContent value="offer" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Minimum jedna usługa z nazwą i co najmniej jedną korzyścią.
          </p>
          <div className="flex flex-col divide-y divide-border">
            {value.offer.items.map((item, index) => (
              <div key={`offer-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
                <FormField label="Nazwa" htmlFor={`offer-name-${index}`}>
                  <Input
                    id={`offer-name-${index}`}
                    value={item.name}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.offer.items.map((current, currentIndex) =>
                        currentIndex === index ? { ...current, name: event.target.value } : current,
                      );
                      patch({ ...value, offer: { items } });
                    }}
                  />
                </FormField>
                <FormField
                  label="Korzyści"
                  htmlFor={`offer-benefit-${index}`}
                  hint="Jedna korzyść na linię."
                >
                  <Textarea
                    id={`offer-benefit-${index}`}
                    value={listToLines(item.benefit)}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.offer.items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, benefit: linesToList(event.target.value) }
                          : current,
                      );
                      patch({ ...value, offer: { items } });
                    }}
                  />
                </FormField>
                <FormField label="Opis" htmlFor={`offer-description-${index}`}>
                  <Textarea
                    id={`offer-description-${index}`}
                    value={item.description}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.offer.items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, description: event.target.value }
                          : current,
                      );
                      patch({ ...value, offer: { items } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    onClick={() =>
                      patch({
                        ...value,
                        offer: {
                          items: value.offer.items.filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                    Usuń usługę
                  </Button>
                )}
              </div>
            ))}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({
                  ...value,
                  offer: {
                    items: [...value.offer.items, { name: '', benefit: [], description: '' }],
                  },
                })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj usługę
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>

        <TabsContent value="voice" className="flex flex-col gap-3">
          <FormField label="Jak mówimy" htmlFor="voice-we-do">
            <Textarea
              id="voice-we-do"
              value={value.voice.weDo}
              disabled={readOnly}
              onChange={(event) =>
                patch({ ...value, voice: { ...value.voice, weDo: event.target.value } })
              }
            />
          </FormField>
          <FormField label="Jak nie mówimy" htmlFor="voice-we-dont">
            <Textarea
              id="voice-we-dont"
              value={value.voice.weDont}
              disabled={readOnly}
              onChange={(event) =>
                patch({ ...value, voice: { ...value.voice, weDont: event.target.value } })
              }
            />
          </FormField>
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>

        <TabsContent value="cta" className="flex flex-col gap-3">
          <div className="flex flex-col divide-y divide-border">
            {value.cta.items.map((item, index) => (
              <div key={`cta-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
                <FormField label="Etykieta CTA" htmlFor={`cta-label-${index}`}>
                  <Input
                    id={`cta-label-${index}`}
                    value={item.label}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.cta.items.map((current, currentIndex) =>
                        currentIndex === index ? { ...current, label: event.target.value } : current,
                      );
                      patch({ ...value, cta: { items } });
                    }}
                  />
                </FormField>
                <FormField label="Cel (opcjonalnie)" htmlFor={`cta-target-${index}`}>
                  <Input
                    id={`cta-target-${index}`}
                    value={item.target ?? ''}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.cta.items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, target: event.target.value }
                          : current,
                      );
                      patch({ ...value, cta: { items } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    onClick={() =>
                      patch({
                        ...value,
                        cta: {
                          items: value.cta.items.filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                    Usuń CTA
                  </Button>
                )}
              </div>
            ))}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({ ...value, cta: { items: [...value.cta.items, { label: '' }] } })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj CTA
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>

        <TabsContent value="audience" className="flex flex-col gap-3">
          <div className="flex flex-col divide-y divide-border">
            {value.audience.profiles.map((profile, index) => (
              <div key={`audience-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
                <FormField
                  label="Profil odbiorcy"
                  htmlFor={`audience-${index}`}
                  hint="Stanowisko, branża albo kontekst."
                >
                  <Textarea
                    id={`audience-${index}`}
                    value={profile.description}
                    disabled={readOnly}
                    onChange={(event) => {
                      const profiles = value.audience.profiles.map((current, currentIndex) =>
                        currentIndex === index ? { description: event.target.value } : current,
                      );
                      patch({ ...value, audience: { profiles } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    onClick={() =>
                      patch({
                        ...value,
                        audience: {
                          profiles: value.audience.profiles.filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                    Usuń profil
                  </Button>
                )}
              </div>
            ))}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({
                  ...value,
                  audience: { profiles: [...value.audience.profiles, { description: '' }] },
                })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj profil
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>

        <TabsContent value="extras" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Nie blokują sygnału Agenci aktywni. Puste pola nie są zapisywane.
          </p>
          <FormField label="Hashtagi" htmlFor="extras-hashtags" hint="Oddzielone przecinkami.">
            <Input
              id="extras-hashtags"
              value={(extras.hashtags ?? []).join(', ')}
              disabled={readOnly}
              onChange={(event) =>
                patch({
                  ...value,
                  extras: { ...extras, hashtags: commaToList(event.target.value) },
                })
              }
            />
          </FormField>
          <FormField label="Notatki katalogowe" htmlFor="extras-catalog">
            <Textarea
              id="extras-catalog"
              value={extras.catalogNotes ?? ''}
              disabled={readOnly}
              onChange={(event) =>
                patch({
                  ...value,
                  extras: { ...extras, catalogNotes: event.target.value },
                })
              }
            />
          </FormField>
          <FormField label="Notatki performance" htmlFor="extras-performance">
            <Textarea
              id="extras-performance"
              value={extras.performanceNotes ?? ''}
              disabled={readOnly}
              onChange={(event) =>
                patch({
                  ...value,
                  extras: { ...extras, performanceNotes: event.target.value },
                })
              }
            />
          </FormField>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Case studies</p>
            {(extras.caseStudies ?? []).map((item, index) => (
              <div key={`case-${index}`} className="flex flex-col gap-3 border-t border-border pt-3">
                <FormField label="Tytuł" htmlFor={`case-title-${index}`}>
                  <Input
                    id={`case-title-${index}`}
                    value={item.title}
                    disabled={readOnly}
                    onChange={(event) => {
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
                        currentIndex === index ? { ...current, title: event.target.value } : current,
                      );
                      patch({ ...value, extras: { ...extras, caseStudies } });
                    }}
                  />
                </FormField>
                <FormField label="Streszczenie" htmlFor={`case-summary-${index}`}>
                  <Textarea
                    id={`case-summary-${index}`}
                    value={item.summary}
                    disabled={readOnly}
                    onChange={(event) => {
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, summary: event.target.value }
                          : current,
                      );
                      patch({ ...value, extras: { ...extras, caseStudies } });
                    }}
                  />
                </FormField>
                <FormField
                  label="Metryki (opcjonalnie)"
                  htmlFor={`case-metrics-${index}`}
                  hint="Oddzielone przecinkami."
                >
                  <Input
                    id={`case-metrics-${index}`}
                    value={(item.metrics ?? []).join(', ')}
                    disabled={readOnly}
                    onChange={(event) => {
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, metrics: commaToList(event.target.value) }
                          : current,
                      );
                      patch({ ...value, extras: { ...extras, caseStudies } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    onClick={() =>
                      patch({
                        ...value,
                        extras: {
                          ...extras,
                          caseStudies: (extras.caseStudies ?? []).filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                    Usuń case study
                  </Button>
                )}
              </div>
            ))}
            {readOnly ? null : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() =>
                  patch({
                    ...value,
                    extras: {
                      ...extras,
                      caseStudies: [...(extras.caseStudies ?? []), { title: '', summary: '' }],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj case study
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Obiekcje</p>
            {(extras.objections ?? []).map((item, index) => (
              <div key={`obj-${index}`} className="flex flex-col gap-3 border-t border-border pt-3">
                <FormField label="Obiekcja" htmlFor={`obj-label-${index}`}>
                  <Input
                    id={`obj-label-${index}`}
                    value={item.label}
                    disabled={readOnly}
                    onChange={(event) => {
                      const objections = (extras.objections ?? []).map((current, currentIndex) =>
                        currentIndex === index ? { ...current, label: event.target.value } : current,
                      );
                      patch({ ...value, extras: { ...extras, objections } });
                    }}
                  />
                </FormField>
                <FormField label="Odpowiedź" htmlFor={`obj-response-${index}`}>
                  <Textarea
                    id={`obj-response-${index}`}
                    value={item.response}
                    disabled={readOnly}
                    onChange={(event) => {
                      const objections = (extras.objections ?? []).map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, response: event.target.value }
                          : current,
                      );
                      patch({ ...value, extras: { ...extras, objections } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    onClick={() =>
                      patch({
                        ...value,
                        extras: {
                          ...extras,
                          objections: (extras.objections ?? []).filter(
                            (_, currentIndex) => currentIndex !== index,
                          ),
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:trash-2" className="size-3.5" />
                    Usuń obiekcję
                  </Button>
                )}
              </div>
            ))}
            {readOnly ? null : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() =>
                  patch({
                    ...value,
                    extras: {
                      ...extras,
                      objections: [...(extras.objections ?? []), { label: '', response: '' }],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj obiekcję
              </Button>
            )}
          </div>
          <FormActions readOnly={readOnly} pending={pending} error={error} />
        </TabsContent>
      </Tabs>
    </form>
  );
}
```

Przyciski „Dodaj / Usuń” zostają `type="button"`, żeby nie submitowały formularza.

#### Refaktor — szkielet w `company-context-view.tsx`

**Teraz:**

```tsx
  if (view.status === 'loading') {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
```

**Zamień na:**

```tsx
  if (view.status === 'loading') {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
```

Nagłówek widoku („Kontekst firmy” / lead) i `onSubmit` / `putCompanyContext` **bez zmian**. Chip w chrome bez zmian.

#### Biblioteki / API

Kontrakt `PUT /company-context` bez zmian (`companyContextForPut`). Po sukcesie `view.completeness` z odpowiedzi — kropki odświeżają się z tego payloadu, nie z draftu. `refetch()` chipa zostaje.

#### Testy

Poza MVP. Scenariusze ręczne:

1. Wejście na `/context` → aktywna Tożsamość (`data-active` / panel identity).
2. Edycja Oferty, przełączenie na Głos SM, zapis z Głosu → `PUT` zawiera też ofertę.
3. Przełączenie zakładki bez kliknięcia „Zapisz kontekst” → brak requestu `PUT`.
4. `user`: pola disabled, komunikat read-only na każdej zakładce, brak submit.
5. Dodatki: brak kropki; case studies w tym samym panelu, bez zagnieżdżonych tabów.
6. Chip „Agenci aktywni” nadal z providera.

#### DoD (krok)

- Sześć zakładek w kanonicznej kolejności; default Tożsamość.
- Kropki tylko na bramce; źródło `completeness.missing` z ostatniego GET/PUT.
- Jeden `PUT` całości; CTA na każdej zakładce; przełączenie nie zapisuje.
- `user` read-only; extras w jednym panelu Dodatki.

---

#### Propozycja commit message

```text
feat(company-context): show context sections as completeness tabs

Keep a single PUT of the whole context while operators navigate gate
status on tab triggers instead of a stacked form.
```

---

## Weryfikacja wycinka

- Kotwica major Faza 2.1 / 2.1.1 pokryta; chip, BFF i Faza 3 poza plikiem.
- Zgodność `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` F-8 (w tym v22: zakładki, `missing`, zakaz PATCH / kropki na Dodatki / zagnieżdżeń).
- Nowe pliki: kompletny kod `tabs.tsx`, `gate-completeness-dot.tsx`.
- Refaktory: wstawka typów; cały formularz jako jedna zamiana (pola bez nowej semantyki); szkielet loadingu.
- Pass rozwojowy: typy + kropka → kit Tabs → formularz.
- Nagłówki wyłącznie `FAZA` / `KROK`; commit EN (Conventional Commits) na końcu fazy.
- Statusy kroków: `NIE_ROZPOCZĘTY`.
- Major nietknięty. Brak sekretów.
- Pre-flight UI: dziedziczenie locku; density 7–8 (`variant="line"`, wrap, `divide-y`); brak Card-dekoracji; focus ring z tokenu; envelope as-is; brak em-dash / emoji.

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po domknięciu DoD |
|---------|-------------------|
| Faza 2.1 | `WYKONANY` |
| Krok 2.1.1 | `WYKONANY` |
| MILESTONE 2.1 | `OSIĄGNIĘTY` |
| Faza 2 / Krok 2.1 / MILESTONE 2 | bez zmian (`WYKONANY` / `OSIĄGNIĘTY`) |
| Faza 3 | nadal `NIE_ROZPOCZĘTY` (niezależna od tej bramki) |
