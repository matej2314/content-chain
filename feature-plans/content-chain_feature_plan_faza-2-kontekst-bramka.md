# Content Chain — feature plan: Faza 2 (Kontekst firmy i bramka)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Kontekst firmy (bramka + extras) i chip kompletności w chrome |
| Major | `content-chain-frontend_major_plan.md` — Faza 2 (kroki 2.1–2.2) + MILESTONE 2 |
| Bramka ścieżki wstecz | Spełniona: major Faza 1 `WYKONANY`, MILESTONE 1 `OSIĄGNIĘTY` |
| Źródła | `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `docs/dokumentacja_koncepcyjna.md`, `docs/dictionary.md`, `spec/SPEC-FRONTEND.md`, `spec/SPEC-KONTEKST-FIRMY.md`, `spec/SPEC-AUTH.md`, `spec/SPEC-TESTY.md`, skill `content-chain-product-ui` |
| Poza zakresem tego pliku | Major Faza 3 (Konto, start, SSE, floating box, archiwum Runy) — osobny plik zestawu; HITL/wynik; email/opinia; Użytkownicy; nowa paleta; BFF/`apiFetch`; egzekucja bramki w UI zamiast api |
| Po implementacji (informacyjnie) | Major FE: Faza 2 i kroki 2.1–2.2 → `WYKONANY`; MILESTONE 2 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność `KROK` w tym pliku **≠** numeracja major 2.1 → 2.2 (pass rozwojowy). Mapowanie: KROK 1 = kontrakt + `CompletenessProvider` (pod major 2.2 i później 3.1); KROK 2 ← major 2.1; KROK 3 ← major 2.2.

**Pass rozwojowy:** typy i `GET/PUT` przed widokiem; provider kompletności w chrome przed chipem; chip czyta provider, nie własny fetch. Brak przenosin do Fazy 3 majoru. Hook `useCompleteness` zostaje publiczny, bo CTA startu (osobny plik / major 3.1) ma z niego korzystać.

**HOW zatwierdzony:** zapis kontekstu = jeden `PUT` całego formularza (bramka + extras). `PATCH` per sekcja nie wchodzi. Completeness: fetch w layoutcie po sesji + `refetch` po udanym PUT. Status per sekcja na widoku = `missing` z ostatniego GET/PUT (nie lokalna kopia `isComplete`).

**Design Read (dziedziczenie locku):** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Stack z projektu: Next.js **16.3.0** App Router, React 19, Tailwind v4, shadcn (`radix-nova`), `@iconify/react`, `@content-chain/shared`. `tsconfig` `strict: true`; **nie** włączamy `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess`.
- Fetch: wyłącznie `apiFetch` (Faza 1). JSON → `unknown` → parser. Zakaz `as GateSection` / `as CompanyContext`.
- `GATE_SECTIONS` nie ma eksportu w `@content-chain/shared`. Unia i type guard żyją w module FE i **muszą** zgadzać się z `apps/api/src/company-context/domain/company-context.constants.ts` (`identity` \| `offer` \| `voice` \| `cta` \| `audience`).
- Role: `admin` zapisuje; `user` czyta. Egzekucja zapisu w api (`403` `FORBIDDEN`). UI nie jest jedyną bramką startu runów (`SPEC-KONTEKST-FIRMY.md` C-5, `SPEC-FRONTEND.md` F-6).
- Visual lock Fazy 1 zostaje. Ten plik **dziedziczy** tokeny z `globals.css`. Zakaz nowej palety, `--success` jako drugi brand, stock-fioletu, kart-dekoracji na każdą sekcję.
- Testy automatyczne FE **poza MVP** (`SPEC-TESTY.md` T-7). Weryfikacja = DoD obserwowalne.
- Prettier root: `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: all`, `printWidth: 100`.
- Copy UI: polski; bez myślnika em w etykietach. Envelope: `code` + `message` as-is.
- Context7: `/vercel/next.js/v16.2.9` — Client Component jako provider kontekstu React; strona App Router może pozostać Server Component i importować klienta. **Nie** Server Actions / `useActionState` na tym wycinku (mutacje przez `apiFetch` + cookie, jak Faza 1).
- shadcn: `npx shadcn@latest add textarea` z `apps/frontend` (aliasy z `components.json`). Poniższy plik `textarea.tsx` to kompletny fallback w rytmie istniejącego `Input` (lock). Jeśli CLI zapisze inny plik w `shared/ui`, **zostaw output CLI** i podłącz go w formularzu. Nie dokładaj nowej biblioteki.

---

## FAZA 1 — Kontekst firmy i bramka agentów

Odpowiada major **Faza 2**.

### KROK 1 — Typy, API kontekstu, CompletenessProvider

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Granica FE rozumie `GET/PUT /company-context` i `GET /company-context/completeness`. Chrome po sesji ma jeden stan kompletności do chipa (ten krok) i do późniejszego disable CTA startu (major 3.1, poza tym plikiem). Major 2.2 (fundament); `SPEC-FRONTEND.md` F-3 / F-6; `SPEC-KONTEKST-FIRMY.md` C-2 / C-3 / C-4; `docs/dokumentacja_komunikacji.md` (Company context).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/company-context/api/company-context.types.ts`
- Nowy: `apps/frontend/src/modules/company-context/api/company-context.api.ts`
- Nowy: `apps/frontend/src/modules/company-context/components/completeness-provider.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`

**Implementacja (kolejność):** typy → api → provider → owinięcie shellu. Chip nadal pusty (KROK 3).

#### Nowy plik — `apps/frontend/src/modules/company-context/api/company-context.types.ts`

```ts
import { isRecord, type ApiErrorEnvelope } from '@/shared/api/envelope';

export const GATE_SECTIONS = ['identity', 'offer', 'voice', 'cta', 'audience'] as const;

export type GateSection = (typeof GATE_SECTIONS)[number];

export const GATE_SECTION_LABELS = {
  identity: 'Tożsamość',
  offer: 'Oferta',
  voice: 'Głos SM',
  cta: 'CTA / kanały',
  audience: 'Odbiorca',
} as const satisfies Record<GateSection, string>;

export function isGateSection(value: string): value is GateSection {
  return (GATE_SECTIONS as readonly string[]).includes(value);
}

export type OfferItem = {
  readonly name: string;
  readonly benefit: readonly string[];
  readonly description: string;
};

export type CtaItem = {
  readonly label: string;
  readonly target?: string;
};

export type AudienceProfile = {
  readonly description: string;
};

export type CompanyContextCaseStudy = {
  readonly title: string;
  readonly summary: string;
  readonly metrics?: readonly string[];
};

export type CompanyContextObjection = {
  readonly label: string;
  readonly response: string;
};

export type CompanyContextExtras = {
  readonly caseStudies?: readonly CompanyContextCaseStudy[];
  readonly objections?: readonly CompanyContextObjection[];
  readonly hashtags?: readonly string[];
  readonly catalogNotes?: string;
  readonly performanceNotes?: string;
};

export type CompanyContext = {
  readonly identity: { readonly name: string; readonly description: string };
  readonly offer: { readonly items: readonly OfferItem[] };
  readonly voice: { readonly weDo: string; readonly weDont: string };
  readonly cta: { readonly items: readonly CtaItem[] };
  readonly audience: { readonly profiles: readonly AudienceProfile[] };
  readonly extras: CompanyContextExtras | null;
};

export type Completeness = {
  readonly complete: boolean;
  readonly missing: readonly GateSection[];
};

export type CompanyContextPayload = CompanyContext & {
  readonly completeness: Completeness;
};

export type CompletenessState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly completeness: Completeness };

function parseStringArray(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`Invalid ${label}`);
  }
  return value;
}

function parseOfferItem(value: unknown): OfferItem {
  if (!isRecord(value) || typeof value.name !== 'string' || typeof value.description !== 'string') {
    throw new Error('Invalid offer item');
  }
  return {
    name: value.name,
    description: value.description,
    benefit: parseStringArray(value.benefit, 'offer.benefit'),
  };
}

function parseCtaItem(value: unknown): CtaItem {
  if (!isRecord(value) || typeof value.label !== 'string') {
    throw new Error('Invalid CTA item');
  }
  if (value.target !== undefined && typeof value.target !== 'string') {
    throw new Error('Invalid CTA target');
  }
  return value.target === undefined
    ? { label: value.label }
    : { label: value.label, target: value.target };
}

function parseAudienceProfile(value: unknown): AudienceProfile {
  if (!isRecord(value) || typeof value.description !== 'string') {
    throw new Error('Invalid audience profile');
  }
  return { description: value.description };
}

function parseCaseStudy(value: unknown): CompanyContextCaseStudy {
  if (!isRecord(value) || typeof value.title !== 'string' || typeof value.summary !== 'string') {
    throw new Error('Invalid case study');
  }
  if (value.metrics === undefined) {
    return { title: value.title, summary: value.summary };
  }
  return {
    title: value.title,
    summary: value.summary,
    metrics: parseStringArray(value.metrics, 'caseStudy.metrics'),
  };
}

function parseObjection(value: unknown): CompanyContextObjection {
  if (!isRecord(value) || typeof value.label !== 'string' || typeof value.response !== 'string') {
    throw new Error('Invalid objection');
  }
  return { label: value.label, response: value.response };
}

const EXTRAS_KEYS = [
  'caseStudies',
  'objections',
  'hashtags',
  'catalogNotes',
  'performanceNotes',
] as const;

function parseExtras(value: unknown): CompanyContextExtras | null {
  if (value === null) return null;
  if (!isRecord(value)) {
    throw new Error('Invalid extras');
  }
  for (const key of Object.keys(value)) {
    if (!(EXTRAS_KEYS as readonly string[]).includes(key)) {
      throw new Error('Invalid extras');
    }
  }
  const extras: {
    caseStudies?: readonly CompanyContextCaseStudy[];
    objections?: readonly CompanyContextObjection[];
    hashtags?: readonly string[];
    catalogNotes?: string;
    performanceNotes?: string;
  } = {};
  if (value.caseStudies !== undefined) {
    if (!Array.isArray(value.caseStudies)) throw new Error('Invalid extras.caseStudies');
    extras.caseStudies = value.caseStudies.map(parseCaseStudy);
  }
  if (value.objections !== undefined) {
    if (!Array.isArray(value.objections)) throw new Error('Invalid extras.objections');
    extras.objections = value.objections.map(parseObjection);
  }
  if (value.hashtags !== undefined) {
    extras.hashtags = parseStringArray(value.hashtags, 'extras.hashtags');
  }
  if (value.catalogNotes !== undefined) {
    if (typeof value.catalogNotes !== 'string') throw new Error('Invalid extras.catalogNotes');
    extras.catalogNotes = value.catalogNotes;
  }
  if (value.performanceNotes !== undefined) {
    if (typeof value.performanceNotes !== 'string') {
      throw new Error('Invalid extras.performanceNotes');
    }
    extras.performanceNotes = value.performanceNotes;
  }
  return extras;
}

export function parseCompleteness(value: unknown): Completeness {
  if (!isRecord(value) || typeof value.complete !== 'boolean' || !Array.isArray(value.missing)) {
    throw new Error('Invalid completeness payload');
  }
  const missing: GateSection[] = [];
  for (const item of value.missing) {
    if (typeof item !== 'string' || !isGateSection(item)) {
      throw new Error('Invalid completeness.missing');
    }
    missing.push(item);
  }
  return { complete: value.complete, missing };
}

export function parseCompanyContext(value: unknown): CompanyContext {
  if (
    !isRecord(value) ||
    !isRecord(value.identity) ||
    typeof value.identity.name !== 'string' ||
    typeof value.identity.description !== 'string' ||
    !isRecord(value.offer) ||
    !Array.isArray(value.offer.items) ||
    !isRecord(value.voice) ||
    typeof value.voice.weDo !== 'string' ||
    typeof value.voice.weDont !== 'string' ||
    !isRecord(value.cta) ||
    !Array.isArray(value.cta.items) ||
    !isRecord(value.audience) ||
    !Array.isArray(value.audience.profiles)
  ) {
    throw new Error('Invalid company context payload');
  }
  return {
    identity: { name: value.identity.name, description: value.identity.description },
    offer: { items: value.offer.items.map(parseOfferItem) },
    voice: { weDo: value.voice.weDo, weDont: value.voice.weDont },
    cta: { items: value.cta.items.map(parseCtaItem) },
    audience: { profiles: value.audience.profiles.map(parseAudienceProfile) },
    extras: parseExtras(value.extras),
  };
}

export function parseCompanyContextPayload(value: unknown): CompanyContextPayload {
  const context = parseCompanyContext(value);
  if (!isRecord(value)) {
    throw new Error('Invalid company context payload');
  }
  return { ...context, completeness: parseCompleteness(value.completeness) };
}

export function emptyCompanyContext(): CompanyContext {
  return {
    identity: { name: '', description: '' },
    offer: { items: [] },
    voice: { weDo: '', weDont: '' },
    cta: { items: [] },
    audience: { profiles: [] },
    extras: null,
  };
}

function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Payload PUT: puste extras → `null` (SPEC C-8). Nie jest bramką startu. */
export function extrasForPut(extras: CompanyContextExtras | null): CompanyContextExtras | null {
  if (extras === null) return null;
  const caseStudies = extras.caseStudies
    ?.map((item) => ({
      title: item.title.trim(),
      summary: item.summary.trim(),
      metrics: item.metrics?.map((metric) => metric.trim()).filter(nonEmpty),
    }))
    .filter((item) => nonEmpty(item.title) && nonEmpty(item.summary))
    .map((item) =>
      item.metrics && item.metrics.length > 0
        ? item
        : { title: item.title, summary: item.summary },
    );
  const objections = extras.objections
    ?.map((item) => ({ label: item.label.trim(), response: item.response.trim() }))
    .filter((item) => nonEmpty(item.label) && nonEmpty(item.response));
  const hashtags = extras.hashtags?.map((tag) => tag.trim()).filter(nonEmpty);
  const catalogNotes = extras.catalogNotes?.trim();
  const performanceNotes = extras.performanceNotes?.trim();
  const next: {
    caseStudies?: CompanyContextCaseStudy[];
    objections?: CompanyContextObjection[];
    hashtags?: string[];
    catalogNotes?: string;
    performanceNotes?: string;
  } = {};
  if (caseStudies && caseStudies.length > 0) next.caseStudies = caseStudies;
  if (objections && objections.length > 0) next.objections = objections;
  if (hashtags && hashtags.length > 0) next.hashtags = hashtags;
  if (catalogNotes) next.catalogNotes = catalogNotes;
  if (performanceNotes) next.performanceNotes = performanceNotes;
  return Object.keys(next).length === 0 ? null : next;
}

export function companyContextForPut(context: CompanyContext): CompanyContext {
  return {
    identity: {
      name: context.identity.name,
      description: context.identity.description,
    },
    offer: {
      items: context.offer.items.map((item) => ({
        name: item.name,
        description: item.description,
        benefit: [...item.benefit],
      })),
    },
    voice: { weDo: context.voice.weDo, weDont: context.voice.weDont },
    cta: {
      items: context.cta.items.map((item) => {
        const target = item.target?.trim();
        return target
          ? { label: item.label, target }
          : { label: item.label };
      }),
    },
    audience: {
      profiles: context.audience.profiles.map((profile) => ({
        description: profile.description,
      })),
    },
    extras: extrasForPut(context.extras),
  };
}

export function withDraftRows(context: CompanyContext): CompanyContext {
  return {
    ...context,
    offer: {
      items:
        context.offer.items.length > 0
          ? context.offer.items
          : [{ name: '', benefit: [], description: '' }],
    },
    cta: {
      items: context.cta.items.length > 0 ? context.cta.items : [{ label: '' }],
    },
    audience: {
      profiles:
        context.audience.profiles.length > 0
          ? context.audience.profiles
          : [{ description: '' }],
    },
  };
}
```

#### Nowy plik — `apps/frontend/src/modules/company-context/api/company-context.api.ts`

```ts
import { apiFetch } from '@/shared/api/api-fetch';
import {
  parseCompanyContextPayload,
  parseCompleteness,
  companyContextForPut,
  type CompanyContext,
  type CompanyContextPayload,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';

export async function fetchCompleteness(): Promise<Completeness> {
  const body = await apiFetch('/company-context/completeness');
  return parseCompleteness(body);
}

export async function fetchCompanyContext(): Promise<CompanyContextPayload> {
  const body = await apiFetch('/company-context');
  return parseCompanyContextPayload(body);
}

export async function putCompanyContext(
  context: CompanyContext,
): Promise<CompanyContextPayload> {
  const body = await apiFetch('/company-context', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(companyContextForPut(context)),
  });
  return parseCompanyContextPayload(body);
}
```

#### Nowy plik — `apps/frontend/src/modules/company-context/components/completeness-provider.tsx`

```tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ApiError, type ApiErrorEnvelope } from '@/shared/api/envelope';
import { fetchCompleteness } from '@/modules/company-context/api/company-context.api';
import type { CompletenessState } from '@/modules/company-context/api/company-context.types';

type CompletenessContextValue = {
  readonly state: CompletenessState;
  readonly refetch: () => Promise<void>;
};

const CompletenessContext = createContext<CompletenessContextValue | null>(null);

const FALLBACK_ENVELOPE: ApiErrorEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function CompletenessProvider({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<CompletenessState>({ status: 'loading' });

  const refetch = useCallback(async () => {
    try {
      const completeness = await fetchCompleteness();
      setState({ status: 'ready', completeness });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setState({ status: 'error', envelope: reason.envelope });
        return;
      }
      setState({ status: 'error', envelope: FALLBACK_ENVELOPE });
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const value = useMemo(() => ({ state, refetch }), [state, refetch]);

  return <CompletenessContext.Provider value={value}>{children}</CompletenessContext.Provider>;
}

export function useCompleteness(): CompletenessContextValue {
  const value = useContext(CompletenessContext);
  if (!value) {
    throw new Error('useCompleteness must be used within CompletenessProvider');
  }
  return value;
}
```

Źródło wzorca: Context7 `/vercel/next.js/v16.2.9` (Client Component provider z `children`; layout/shell klient owija drzewo). Analogia w repo: `SessionProvider` / `EventSourceRegistryProvider`.

#### Refaktor — `dashboard-shell.tsx`

Plik: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`.

**Teraz:**

```tsx
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';
```

```tsx
  return (
    <EventSourceRegistryProvider>
      <div className="flex min-h-dvh bg-background">
        <div className="hidden md:block">
          <AppSidebar role={state.user.role} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader user={state.user} />
          <main className="min-w-0 flex-1 p-4 text-sm">{children}</main>
        </div>
        <FloatingBoxSlot />
      </div>
    </EventSourceRegistryProvider>
  );
```

**Zamień na:**

```tsx
import { CompletenessProvider } from '@/modules/company-context/components/completeness-provider';
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';
```

```tsx
  return (
    <EventSourceRegistryProvider>
      <CompletenessProvider>
        <div className="flex min-h-dvh bg-background">
          <div className="hidden md:block">
            <AppSidebar role={state.user.role} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <AppHeader user={state.user} />
            <main className="min-w-0 flex-1 p-4 text-sm">{children}</main>
          </div>
          <FloatingBoxSlot />
        </div>
      </CompletenessProvider>
    </EventSourceRegistryProvider>
  );
```

Provider tylko w gałęzi `authenticated` (już po early-return). Mobile `AppSidebar` w `Sheet` headera też jest w tym drzewie.

**Biblioteki / API:** `apiFetch` (istniejący). GET ` /api/v1/company-context/completeness` → `{ complete, missing }`. Next: Client Context w klienckim shellu (Context7 jak wyżej).

**Testy:** brak (FE poza MVP).

**DoD (krok):**

- Parsery odrzucają payload bez `complete` / z `missing` spoza unii sekcji.
- Po sesji `CompletenessProvider` woła completeness przez BFF (ścieżka `/api/v1/...`, nie origin api).
- `useCompleteness` działa w sidebarze i w `main`.
- Slot chipa nadal pusty.

---

### KROK 2 — Widok Kontekst firmy

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Admin uzupełnia i zapisuje sekcje bramki oraz extras jednym PUT. `user` widzi ten sam układ tylko do odczytu. Status kompletności per sekcja z `missing` odpowiedzi. Extras nie sterują chipem. Major 2.1; `docs/ux_dashboard.md` (Widok: Kontekst firmy); `SPEC-KONTEKST-FIRMY.md` C-4 / C-8; `SPEC-FRONTEND.md` F-8.

**Artefakty:**

- Nowy: `apps/frontend/src/shared/ui/textarea.tsx` (CLI albo fallback poniżej)
- Nowy: `apps/frontend/src/modules/company-context/components/company-context-form.tsx`
- Nowy: `apps/frontend/src/modules/company-context/components/company-context-view.tsx`
- Zmiana: `apps/frontend/src/app/(app)/context/page.tsx`

**Implementacja (kolejność):** textarea → form → view → page. Po udanym PUT wywołać `refetch` z KROK 1.

#### Nowy plik — `apps/frontend/src/shared/ui/textarea.tsx`

Preferowane: z katalogu `apps/frontend`:

```bash
npx shadcn@latest add textarea
```

Fallback (rytm `Input`, tokeny locku; użyj gdy CLI niedostępne):

```tsx
import * as React from 'react';
import { cn } from '@/shared/utils/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'min-h-20 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
```

#### Nowy plik — `apps/frontend/src/modules/company-context/components/company-context-form.tsx`

```tsx
'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import {
  GATE_SECTION_LABELS,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
  type GateSection,
} from '@/modules/company-context/api/company-context.types';

type CompanyContextFormProps = {
  readonly value: CompanyContext;
  readonly completeness: Completeness;
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
  readonly onChange: (next: CompanyContext) => void;
  readonly onSubmit: () => void;
};

function SectionHeading({
  section,
  missing,
}: {
  readonly section: GateSection;
  readonly missing: readonly GateSection[];
}) {
  const incomplete = missing.includes(section);
  return (
    <div className="flex items-baseline justify-between gap-2">
      <h2 className="text-base font-medium">{GATE_SECTION_LABELS[section]}</h2>
      <p className="text-xs text-muted-foreground">{incomplete ? 'Niekompletna' : 'Kompletna'}</p>
    </div>
  );
}

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
      className="flex max-w-3xl flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <section className="flex flex-col gap-3">
        <SectionHeading section="identity" missing={completeness.missing} />
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
        <FormField
          label="Opis / misja"
          htmlFor="identity-description"
          hint="1–3 zdania."
        >
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
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="offer" missing={completeness.missing} />
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
                      offer: { items: value.offer.items.filter((_, currentIndex) => currentIndex !== index) },
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
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="voice" missing={completeness.missing} />
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
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="cta" missing={completeness.missing} />
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
                      cta: { items: value.cta.items.filter((_, currentIndex) => currentIndex !== index) },
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
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="audience" missing={completeness.missing} />
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
                      currentIndex === index
                        ? { description: event.target.value }
                        : current,
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
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Dodatki (opcjonalne)</h2>
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
                      currentIndex === index ? { ...current, summary: event.target.value } : current,
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
      </section>

      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}

      {readOnly ? (
        <p className="text-sm text-muted-foreground">Tylko administrator może zapisać kontekst.</p>
      ) : (
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? 'Zapisywanie…' : 'Zapisz kontekst'}
        </Button>
      )}
    </form>
  );
}
```

Klucze wierszy `offer-${index}` są lokalne dla kontrolowanego formularza (brak id z api). Nie używać index jako React key, jeśli w tym samym commicie pojawi się stabilne id z kontraktu; w MVP api nie daje id pozycji.

#### Nowy plik — `apps/frontend/src/modules/company-context/components/company-context-view.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import {
  fetchCompanyContext,
  putCompanyContext,
} from '@/modules/company-context/api/company-context.api';
import {
  withDraftRows,
  type CompanyContext,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import { CompanyContextForm } from '@/modules/company-context/components/company-context-form';

type ViewState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: { readonly code: string; readonly message: string } }
  | {
      readonly status: 'ready';
      readonly context: CompanyContext;
      readonly completeness: Completeness;
    };

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function CompanyContextView() {
  const { state: session } = useSession();
  const { refetch } = useCompleteness();
  const [view, setView] = useState<ViewState>({ status: 'loading' });
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<{ code: string; message: string } | null>(null);

  const readOnly = session.status === 'authenticated' && session.user.role !== 'admin';

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchCompanyContext();
        if (cancelled) return;
        setView({
          status: 'ready',
          context: withDraftRows(payload),
          completeness: payload.completeness,
        });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setView({ status: 'error', envelope: reason.envelope });
          return;
        }
        setView({ status: 'error', envelope: FALLBACK });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(): Promise<void> {
    if (view.status !== 'ready' || readOnly) return;
    setPending(true);
    setSubmitError(null);
    try {
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setSubmitError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setSubmitError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

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

  if (view.status === 'error') {
    return <EnvelopeError code={view.envelope.code} message={view.envelope.message} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-w-3xl flex-col gap-1">
        <h1 className="text-lg font-medium">Kontekst firmy</h1>
        <p className="text-sm text-muted-foreground">
          Sekcje bramki odblokowują agentów. Dodatki są opcjonalne.
        </p>
      </div>
      <CompanyContextForm
        value={view.context}
        completeness={view.completeness}
        readOnly={readOnly}
        pending={pending}
        error={submitError}
        onChange={(context) =>
          setView({ status: 'ready', context, completeness: view.completeness })
        }
        onSubmit={() => {
          void onSubmit();
        }}
      />
    </div>
  );
}
```

#### Refaktor — `context/page.tsx`

Plik: `apps/frontend/src/app/(app)/context/page.tsx`.

**Teraz:**

```tsx
export default function ContextPage() {
  return (
    <section className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium">Kontekst firmy</h1>
      <p className="text-sm text-muted-foreground">
        Tu uzupełnisz sekcje bramki. Widok będzie dostępny w kolejnej fazie.
      </p>
    </section>
  );
}
```

**Zamień na:**

```tsx
import { CompanyContextView } from '@/modules/company-context/components/company-context-view';

export default function ContextPage() {
  return <CompanyContextView />;
}
```

Strona zostaje Server Component (Context7: import klienta z RSC). Fetch sesyjny zostaje w kliencie przez `apiFetch` (spójnie z Fazą 1; bez drugiego serwerowego klienta HTTP).

**Biblioteki / API:** PUT `/company-context` body = sekcje + `extras` obiekt albo `null`. 403 dla `user` (UI nie pokazuje submit). 400 `VALIDATION_FAILED` przy nieznanym kluczu extras (parser FE też odrzuca obcy klucz przy GET). shadcn `textarea`. Iconify `lucide:plus` / `lucide:trash-2` (ta sama rodzina co sidebar).

**Testy:** brak (FE poza MVP).

**DoD (krok):**

- Admin zapisuje bramkę i extras jednym PUT; GET round-trip zgadza się z polami.
- `user` widzi pola `disabled`, komunikat read-only, brak CTA zapisu.
- Status „Kompletna” / „Niekompletna” per sekcja bramki zgadza się z `missing` z api (po załadowaniu i po zapisie).
- Wypełnienie tylko extras przy pustej bramce **nie** ustawia `complete: true` (chip w KROK 3 to potwierdzi).
- Loading: skeleton układu; błąd GET/PUT: envelope as-is.
- Brak nowej palety; sekcje to bloki z `divide-y`, nie siatka kart.

---

### KROK 3 — Chip kompletności w chrome

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wypełnić slot Fazy 1: stały sygnał „agenci aktywni / nieaktywni” na widokach po sesji, z listą braków i drogą do `/context`. Nie mylić z runami w toku. Major 2.2; `docs/ux_dashboard.md` (Globalny wskaźnik); `SPEC-FRONTEND.md` F-6 / F-8; `docs/dictionary.md` (Agenci aktywni).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/company-context/components/completeness-chip.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/chrome-slots.tsx`

**Implementacja:** chip czyta `useCompleteness`; slot renderuje chip. Desktop i mobilny sidebar dzielą ten sam slot.

#### Nowy plik — `apps/frontend/src/modules/company-context/components/completeness-chip.tsx`

```tsx
'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Skeleton } from '@/shared/ui/skeleton';
import { EnvelopeError } from '@/shared/ui/form-field';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { GATE_SECTION_LABELS } from '@/modules/company-context/api/company-context.types';

export function CompletenessChip() {
  const { state } = useCompleteness();

  if (state.status === 'loading') {
    return <Skeleton className="h-16 w-full" />;
  }

  if (state.status === 'error') {
    return (
      <EnvelopeError
        code={state.envelope.code}
        message={state.envelope.message}
        className="text-xs"
      />
    );
  }

  if (state.completeness.complete) {
    return (
      <div
        data-slot="completeness-chip"
        className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
      >
        <Icon icon="lucide:check" className="mt-0.5 size-3.5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">Agenci aktywni</p>
          <p className="text-muted-foreground">Można uruchamiać runy produktowe.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="completeness-chip"
      className="flex items-start gap-2 rounded-md border border-border px-2 py-2 text-xs"
    >
      <Icon icon="lucide:octagon-pause" className="mt-0.5 size-3.5 shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-medium">Agenci nieaktywni</p>
        <p className="text-muted-foreground">
          Brakuje:{' '}
          {state.completeness.missing.map((section) => GATE_SECTION_LABELS[section]).join(', ')}
        </p>
        <Link href="/context" className="text-foreground underline-offset-4 hover:underline">
          Uzupełnij kontekst
        </Link>
      </div>
    </div>
  );
}
```

Aktywny / nieaktywny: ten sam border tokenu, inna ikona i copy. **Nie** zielony neon ani druga paleta. To nie jest chip „run w toku”.

#### Refaktor — `chrome-slots.tsx`

Plik: `apps/frontend/src/modules/shell/components/chrome-slots.tsx`. Symbol `CompletenessChipSlot`.

**Teraz:**

```tsx
export function CompletenessChipSlot() {
  return <div data-slot="completeness-chip" className="min-h-6" />;
}
```

**Zamień na:**

```tsx
import { CompletenessChip } from '@/modules/company-context/components/completeness-chip';

export function CompletenessChipSlot() {
  return <CompletenessChip />;
}
```

Import `CompletenessChip` na górze pliku obok istniejących importów. `FloatingBoxSlot` i `FeedbackCtaSlot` bez zmian (Faza 3 / 5).

Po zapisie kontekstu (KROK 2 `refetch`) chip na Kontekście i po nawigacji na inne widoki pokazuje nowy stan bez reloadu layoutu.

**Biblioteki / API:** `next/link`, Iconify. Stan z providera KROK 1.

**Testy:** brak (FE poza MVP).

**DoD (krok):**

- Chip widoczny w sidebarze na wszystkich widokach po sesji (desktop i Sheet mobilny).
- `complete === true` → „Agenci aktywni”; inaczej „Agenci nieaktywni” + labelki PL brakujących sekcji + link `/context`.
- Chip nie pokazuje statusu runów.
- Po PUT kompletnego kontekstu chip przechodzi na aktywnych bez przeładowania aplikacji.
- Extras-only nie aktywuje chipa.

---

## Weryfikacja wycinka

- Kotwica: major Faza 2 (2.1 + 2.2) pokryta. Milestone 2 po implementacji (informacyjnie).
- Zgodność: `docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-6/F-8, `SPEC-KONTEKST-FIRMY.md` (UI nie egzekwuje startu; extras poza `missing`).
- Nowe pliki: kompletny kod w krokach. Refaktory: fragmenty `teraz → zamień na`.
- Pass rozwojowy: provider przed chipem i przed przyszłym startem; brak prac Fazy 3 w tym pliku.
- Nagłówki wyłącznie `FAZA` / `KROK`. Statusy z trójki, startowo `NIE_ROZPOCZĘTY`.
- Major nietknięty. Brak sekretów.
- Pre-flight UI (`content-chain-product-ui`): dziedziczenie locku, density 7–8, skeleton/empty/error, label nad polem, zero hero/bento/emoji.

---

## Ślad do major

Po **implementacji** tego pliku (osobna sesja / ręczne `/feature-implementation`):

| Major | Status docelowy |
|-------|-----------------|
| Faza 2 | `WYKONANY` |
| Krok 2.1 | `WYKONANY` |
| Krok 2.2 | `WYKONANY` |
| MILESTONE 2 | `OSIĄGNIĘTY` |

Ten skill **nie** edytuje `content-chain-frontend_major_plan.md`.

Następny plik zestawu (po zatwierdzeniu tego): `feature-plans/content-chain_feature_plan_faza-3-konto-live-archiwum.md` (major Faza 3). CTA startu **czyta** `useCompleteness` z KROK 1 tego pliku.
