# Content Chain — feature plan: Faza 4 (HITL i wynik)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Szczegóły runu: panel HITL + widok wyniku |
| Major | `content-chain-frontend_major_plan.md` — Faza 4 (kroki 4.1–4.2) + MILESTONE 4 |
| Ten plik zestawu | `FAZA 1` (porządkowa). Pliki 2–3: major 5 i 6 |
| Bramka ścieżki wstecz | Start **dopiero po** major FE **Faza 3.5** + **Milestone 3.5** (twardy PUT kontekstu) oraz backend **Faza 11**. Fazy 1, 2, 2.1, 3 = `WYKONANY` i Milestone 1–3 = `OSIĄGNIĘTY` **nie** wystarczają do startu Fazy 4. **Nie mylić** Fazy 3.5 z **Krokiem 3.5** (archiwum Runy). |
| Źródła | `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `spec/SPEC-FRONTEND.md` F-5/F-8, `spec/SPEC-RUNY.md` R-3b/R-3f/R-3g, `spec/SPEC-SOCIAL.md` S-6/S-7b, `spec/SPEC-CONTENT.md` Ctn (HITL `[outline.id]`), skill `content-chain-product-ui` |
| Poza zakresem tego pliku | UI przeglądu / gwiazdki / Edytuj / finalize (major 5); opinia i email (major 5); Użytkownicy (major 6); `/context` i twardy PUT bramki (FE Faza 3.5, api Faza 11); `conversationId` w UI; HITL we floating boxie; nowa paleta; BFF; implementacja api |
| Kontrakt api | `POST /runs/:runId/hitl` oraz snapshot `hitl` / `result` / pola przeglądu już w `apps/api`. FE nie implementuje api. Parser **czyta** `userRating` / `outputEdited` / `reviewFinalizedAt` (pass rozwojowy), **bez** kontrolek przeglądu |
| Po implementacji (informacyjnie) | Major FE: Faza 4 i kroki 4.1–4.2 → `WYKONANY`; MILESTONE 4 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność `KROK` ≠ numeracja major 4.1→4.2. Mapowanie: KROK 1 fundament parsera; KROK 2 ← 4.1; KROK 3 ← 4.2.

**Pass rozwojowy:** pełny parser snapshotu (w tym pola przeglądu) i klient HITL przed panelem; unia `result` przed widokiem. Przesunięcie: pola przeglądu z major 5 do KROK 1 jako kontrakt, nie jako UI.

**HOW:** natywny `<input type="checkbox">` w rytmie `Input` / `NativeSelect` (bez nowego prymitywu shadcn). Content HITL = jeden CTA akceptacji, nie multi-select.

**Design Read:** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Kontekst firmy w DB jest już pod twardą bramką (FE **Faza 3.5**, api **Faza 11**). Ten plik **nie** zapisuje `/context` i **nie** każe PUT-ować pustej / kalekiej bramki.
- Next.js **16.3.0**, React **19.2.8**, TypeScript **5** w `apps/frontend`. Client components jak istniejący `RunDetailsView`.
- `apiFetch` + cookie; **202** jest `response.ok` (klient HITL nie wymaga osobnego statusu). Envelope `code` + `message` as-is.
- JSON → `unknown` → parser. `RunId` / `UserId` z `@content-chain/shared`. Id pomysłów / outline / `sourceIdeaId` zostają `string` (api i SPEC nie brandują ich w shared).
- Snapshot GET zawsze ma `result` (klucze addytywne, puste tablice / `null`) oraz `hitl: null` poza `awaiting_hitl`. `conversationId` jest w JSON; parser **ignoruje** (nie wchodzi do typu UI).
- SSE `run.status` **nie** niesie `hitl.options`. Wejście w `awaiting_hitl` i zejście z pauzy = GET snapshot. Po udanym HITL: GET jak po evencie terminalnym.
- `interrupted` ≠ HITL: panel ukryty (`docs/ux_dashboard.md`).
- HITL i wynik tylko na szczegółach. Box / Konto / archiwum bez drugiego panelu.
- Testy FE poza MVP. Prettier: single quotes, jak `start-run-form.tsx`. Copy UI bez em-dash.
- `tsconfig` bez zmiany. Zakaz `any` / `as RunId`.

### Biblioteki / API

- **React 19.2** (Context7 `/react/react/v19.2.7`): checkbox sterowany `checked` + `onChange`. Nie `defaultChecked` przy stanie React. Submit: `form` + `preventDefault`, wartości z `useState` (kolejność zaznaczeń = kolejność `selectedIdeaIds`).
- **SPEC wygrywa** z przykładem internetowym: Social min. 1 unikalne id ⊆ options; Content dokładnie `[outline.id]`.
- shadcn: `Button`, `Label`, `EnvelopeError`. Bez `npx shadcn add checkbox`.

---

## FAZA 1 — HITL i wynik

Odpowiada major **Faza 4**. Numer `FAZA 1` jest porządkowy w zestawie.

### KROK 1 — Typy snapshotu (hitl, result, pola przeglądu) i klient HITL

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Granica FE czyta ten sam snapshot co api (`SPEC-RUNY.md` R-3b/R-3g) i umie wznowić HITL (`POST .../hitl`). Major 4.1–4.2 (fundament). UI panelu i wyniku = KROK 2–3. UI przeglądu = plik 2.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/api/runs-result.types.ts`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.types.ts` (`RunSnapshot`, `parseRunSnapshot`)
- Zmiana: `apps/frontend/src/modules/runs/api/runs.api.ts` (`submitHitl`)
- Zmiana: `apps/frontend/src/modules/runs/api/run-labels.ts` (labelki `role` outline)

#### Nowy plik — `apps/frontend/src/modules/runs/api/runs-result.types.ts`

```ts
import type { RunTaskType } from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const PAGE_OUTLINE_SECTION_ROLES = [
  'audience_world',
  'pain',
  'challenger',
  'insight',
  'proof',
  'objection',
  'cta',
  'other',
] as const;

export type PageOutlineSectionRole = (typeof PAGE_OUTLINE_SECTION_ROLES)[number];

export type UserRating = 1 | 2 | 3 | 4 | 5;

export type SocialIdea = {
  readonly id: string;
  readonly title: string;
  readonly angle: string;
  readonly hook: string;
  readonly cta?: string;
};

export type SocialContent = {
  readonly body: string;
  readonly hashtags: readonly string[];
  readonly characterCount: number;
  readonly cta?: string;
};

export type SocialContentItem = SocialContent & {
  readonly sourceIdeaId: string;
};

export type ReelDurationSeconds = 15 | 30 | 90;

export type ReelIdea = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly hook: string;
  readonly durationSeconds: ReelDurationSeconds;
  readonly cta?: string;
};

export type ReelScriptSegment = {
  readonly startSeconds: number;
  readonly endSeconds: number;
  readonly onScreen: string;
  readonly voiceover: string;
};

export type ReelScript = {
  readonly segments: readonly ReelScriptSegment[];
  readonly cta: string;
  readonly notes?: string;
};

export type ReelScriptItem = ReelScript & {
  readonly sourceIdeaId: string;
};

export type PageOutlineSection = {
  readonly id: string;
  readonly heading: string;
  readonly summary: string;
  readonly role?: PageOutlineSectionRole;
};

export type PageOutline = {
  readonly id: string;
  readonly title: string;
  readonly sections: readonly PageOutlineSection[];
};

export type PageDocument = {
  readonly title: string;
  readonly lead: string;
  readonly body: string;
  readonly metaTitle?: string;
  readonly metaDescription?: string;
};

export type RunResult = {
  readonly ideas: readonly SocialIdea[];
  readonly content: SocialContent | null;
  readonly contents: readonly SocialContentItem[];
  readonly reelIdeas: readonly ReelIdea[];
  readonly reelScript: ReelScript | null;
  readonly reelScripts: readonly ReelScriptItem[];
  readonly pageOutline: PageOutline | null;
  readonly pageDocument: PageDocument | null;
};

export type RunHitl =
  | { readonly kind: 'post_ideas'; readonly options: readonly SocialIdea[] }
  | { readonly kind: 'reel_ideas'; readonly options: readonly ReelIdea[] }
  | { readonly kind: 'page_outline'; readonly options: readonly PageOutline[] };

export type RunReviewFields = {
  readonly userRating: UserRating | null;
  readonly outputEdited: boolean;
  readonly reviewFinalizedAt: string | null;
};

export type HitlAccepted = {
  readonly runId: string;
  readonly status: 'running';
};

function parseOptionalCta(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Invalid cta');
  }
  return value;
}

function parseStringId(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Invalid ${label}`);
  }
  return value;
}

function parseHashtags(value: unknown): readonly string[] {
  if (!Array.isArray(value)) throw new Error('Invalid hashtags');
  return value.map((item) => {
    if (typeof item !== 'string') throw new Error('Invalid hashtag');
    return item;
  });
}

function isPageOutlineSectionRole(value: string): value is PageOutlineSectionRole {
  return (PAGE_OUTLINE_SECTION_ROLES as readonly string[]).includes(value);
}

function isReelDuration(value: number): value is ReelDurationSeconds {
  return value === 15 || value === 30 || value === 90;
}

function parseCharacterCount(body: string, raw: unknown): number {
  if (raw === undefined) return body.length;
  if (typeof raw !== 'number' || !Number.isInteger(raw) || raw < 0) {
    throw new Error('Invalid characterCount');
  }
  return raw;
}

export function parseSocialIdea(value: unknown): SocialIdea {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.angle !== 'string' ||
    typeof value.hook !== 'string'
  ) {
    throw new Error('Invalid SocialIdea');
  }
  const idea: SocialIdea = {
    id: parseStringId(value.id, 'idea.id'),
    title: value.title,
    angle: value.angle,
    hook: value.hook,
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? idea : { ...idea, cta };
}

export function parseSocialContent(value: unknown): SocialContent {
  if (!isRecord(value) || typeof value.body !== 'string') {
    throw new Error('Invalid SocialContent');
  }
  const content: SocialContent = {
    body: value.body,
    hashtags: parseHashtags(value.hashtags),
    characterCount: parseCharacterCount(value.body, value.characterCount),
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? content : { ...content, cta };
}

export function parseSocialContentItem(value: unknown): SocialContentItem {
  if (!isRecord(value)) throw new Error('Invalid SocialContentItem');
  return {
    ...parseSocialContent(value),
    sourceIdeaId: parseStringId(value.sourceIdeaId, 'sourceIdeaId'),
  };
}

export function parseReelIdea(value: unknown): ReelIdea {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.description !== 'string' ||
    typeof value.hook !== 'string' ||
    typeof value.durationSeconds !== 'number' ||
    !isReelDuration(value.durationSeconds)
  ) {
    throw new Error('Invalid ReelIdea');
  }
  const idea: ReelIdea = {
    id: parseStringId(value.id, 'reelIdea.id'),
    title: value.title,
    description: value.description,
    hook: value.hook,
    durationSeconds: value.durationSeconds,
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? idea : { ...idea, cta };
}

function parseReelScriptSegment(value: unknown): ReelScriptSegment {
  if (
    !isRecord(value) ||
    typeof value.startSeconds !== 'number' ||
    typeof value.endSeconds !== 'number' ||
    typeof value.onScreen !== 'string' ||
    typeof value.voiceover !== 'string'
  ) {
    throw new Error('Invalid ReelScriptSegment');
  }
  return {
    startSeconds: value.startSeconds,
    endSeconds: value.endSeconds,
    onScreen: value.onScreen,
    voiceover: value.voiceover,
  };
}

export function parseReelScript(value: unknown): ReelScript {
  if (!isRecord(value) || !Array.isArray(value.segments) || typeof value.cta !== 'string') {
    throw new Error('Invalid ReelScript');
  }
  const script: ReelScript = {
    segments: value.segments.map(parseReelScriptSegment),
    cta: value.cta,
  };
  if (value.notes === undefined) return script;
  if (typeof value.notes !== 'string') throw new Error('Invalid ReelScript.notes');
  return { ...script, notes: value.notes };
}

export function parseReelScriptItem(value: unknown): ReelScriptItem {
  if (!isRecord(value)) throw new Error('Invalid ReelScriptItem');
  return {
    ...parseReelScript(value),
    sourceIdeaId: parseStringId(value.sourceIdeaId, 'sourceIdeaId'),
  };
}

function parsePageOutlineSection(value: unknown): PageOutlineSection {
  if (
    !isRecord(value) ||
    typeof value.heading !== 'string' ||
    typeof value.summary !== 'string'
  ) {
    throw new Error('Invalid PageOutlineSection');
  }
  const section: PageOutlineSection = {
    id: parseStringId(value.id, 'section.id'),
    heading: value.heading,
    summary: value.summary,
  };
  if (value.role === undefined) return section;
  if (typeof value.role !== 'string' || !isPageOutlineSectionRole(value.role)) {
    throw new Error('Invalid section.role');
  }
  return { ...section, role: value.role };
}

export function parsePageOutline(value: unknown): PageOutline {
  if (!isRecord(value) || typeof value.title !== 'string' || !Array.isArray(value.sections)) {
    throw new Error('Invalid PageOutline');
  }
  return {
    id: parseStringId(value.id, 'outline.id'),
    title: value.title,
    sections: value.sections.map(parsePageOutlineSection),
  };
}

export function parsePageDocument(value: unknown): PageDocument {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.lead !== 'string' ||
    typeof value.body !== 'string'
  ) {
    throw new Error('Invalid PageDocument');
  }
  const document: PageDocument = {
    title: value.title,
    lead: value.lead,
    body: value.body,
  };
  if (value.metaTitle !== undefined) {
    if (typeof value.metaTitle !== 'string') throw new Error('Invalid metaTitle');
  }
  if (value.metaDescription !== undefined) {
    if (typeof value.metaDescription !== 'string') throw new Error('Invalid metaDescription');
  }
  return {
    ...document,
    ...(typeof value.metaTitle === 'string' ? { metaTitle: value.metaTitle } : {}),
    ...(typeof value.metaDescription === 'string'
      ? { metaDescription: value.metaDescription }
      : {}),
  };
}

function parseArray<T>(value: unknown, parseItem: (item: unknown) => T, label: string): readonly T[] {
  if (!Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value.map(parseItem);
}

export function parseRunResult(value: unknown): RunResult {
  if (!isRecord(value)) throw new Error('Invalid result');
  const content =
    value.content === null
      ? null
      : parseSocialContent(value.content);
  const reelScript =
    value.reelScript === null ? null : parseReelScript(value.reelScript);
  const pageOutline =
    value.pageOutline === null ? null : parsePageOutline(value.pageOutline);
  const pageDocument =
    value.pageDocument === null ? null : parsePageDocument(value.pageDocument);
  return {
    ideas: parseArray(value.ideas, parseSocialIdea, 'ideas'),
    content,
    contents: parseArray(value.contents, parseSocialContentItem, 'contents'),
    reelIdeas: parseArray(value.reelIdeas, parseReelIdea, 'reelIdeas'),
    reelScript,
    reelScripts: parseArray(value.reelScripts, parseReelScriptItem, 'reelScripts'),
    pageOutline,
    pageDocument,
  };
}

export function parseRunHitl(taskType: RunTaskType, value: unknown): RunHitl | null {
  if (value === null) return null;
  if (!isRecord(value) || !Array.isArray(value.options)) {
    throw new Error('Invalid hitl');
  }
  if (taskType === 'post_ideas_then_content') {
    return { kind: 'post_ideas', options: value.options.map(parseSocialIdea) };
  }
  if (taskType === 'reel_ideas_then_scripts') {
    return { kind: 'reel_ideas', options: value.options.map(parseReelIdea) };
  }
  if (taskType === 'page_outline_then_copy') {
    return { kind: 'page_outline', options: value.options.map(parsePageOutline) };
  }
  throw new Error('Unexpected hitl for taskType');
}

export function parseReviewFields(value: unknown): RunReviewFields {
  if (!isRecord(value)) throw new Error('Invalid review fields');
  if (typeof value.outputEdited !== 'boolean') {
    throw new Error('Invalid outputEdited');
  }
  let userRating: UserRating | null;
  if (value.userRating === null) {
    userRating = null;
  } else if (
    value.userRating === 1 ||
    value.userRating === 2 ||
    value.userRating === 3 ||
    value.userRating === 4 ||
    value.userRating === 5
  ) {
    userRating = value.userRating;
  } else {
    throw new Error('Invalid userRating');
  }
  if (value.reviewFinalizedAt !== null && typeof value.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid reviewFinalizedAt');
  }
  return {
    userRating,
    outputEdited: value.outputEdited,
    reviewFinalizedAt: value.reviewFinalizedAt,
  };
}

export function parseHitlAccepted(value: unknown): HitlAccepted {
  if (!isRecord(value) || typeof value.runId !== 'string' || value.status !== 'running') {
    throw new Error('Invalid hitl payload');
  }
  return { runId: value.runId, status: 'running' };
}

export function runResultHasArtifacts(result: RunResult): boolean {
  return (
    result.ideas.length > 0 ||
    result.content !== null ||
    result.contents.length > 0 ||
    result.reelIdeas.length > 0 ||
    result.reelScript !== null ||
    result.reelScripts.length > 0 ||
    result.pageOutline !== null ||
    result.pageDocument !== null
  );
}
```

#### Refaktor — `RunSnapshot` i `parseRunSnapshot`

`apps/frontend/src/modules/runs/api/runs.types.ts`

Na górze dopisz import:

```ts
import {
  parseReviewFields,
  parseRunHitl,
  parseRunResult,
  type RunHitl,
  type RunResult,
  type RunReviewFields,
} from '@/modules/runs/api/runs-result.types';
```

**teraz** (`RunSnapshot`):

```ts
export type RunSnapshot = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly contentKind: ContentKind | null;
  readonly language: ContentLanguage;
  readonly brief: RunBrief;
  readonly status: RunStatus;
  readonly createdAt: string;
  readonly startedBy: StartedBy | null;
};
```

**zamień na:**

```ts
export type RunSnapshot = {
  readonly runId: RunId;
  readonly taskType: RunTaskType;
  readonly platform: RunPlatform;
  readonly contentKind: ContentKind | null;
  readonly language: ContentLanguage;
  readonly brief: RunBrief;
  readonly status: RunStatus;
  readonly createdAt: string;
  readonly startedBy: StartedBy | null;
  readonly result: RunResult;
  readonly hitl: RunHitl | null;
} & RunReviewFields;
```

**teraz** (koniec `parseRunSnapshot` — return):

```ts
  return {
    ...core,
    contentKind,
    brief: parseBrief(core.taskType, value.brief),
    startedBy: parseStartedBy(value.startedBy),
  };
```

**zamień na:**

```ts
  const review = parseReviewFields(value);
  return {
    ...core,
    contentKind,
    brief: parseBrief(core.taskType, value.brief),
    startedBy: parseStartedBy(value.startedBy),
    result: parseRunResult(value.result),
    hitl: parseRunHitl(core.taskType, value.hitl),
    userRating: review.userRating,
    outputEdited: review.outputEdited,
    reviewFinalizedAt: review.reviewFinalizedAt,
  };
```

`draftFromSnapshot` / listy user **nie** czytają `result`. Prefill startu bez zmian.

#### Refaktor — `runs.api.ts`

Importy: `parseHitlAccepted`, `HitlAccepted` z `runs-result.types.ts`.

**Dopisz** na końcu pliku:

```ts
export async function submitHitl(
  runId: RunId,
  selectedIdeaIds: readonly string[],
): Promise<HitlAccepted> {
  const body = await apiFetch(`/runs/${runId}/hitl`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ selectedIdeaIds: [...selectedIdeaIds] }),
  });
  return parseHitlAccepted(body);
}
```

#### Refaktor — `run-labels.ts`

Import typu `PageOutlineSectionRole` z `runs-result.types.ts`. Dopisz:

```ts
export const PAGE_OUTLINE_ROLE_LABELS = {
  audience_world: 'Świat odbiorcy',
  pain: 'Ból',
  challenger: 'Challenger',
  insight: 'Insight',
  proof: 'Dowód',
  objection: 'Zastrzeżenie',
  cta: 'CTA',
  other: 'Inne',
} as const satisfies Record<PageOutlineSectionRole, string>;
```

**Testy:** brak nowych testów FE (poza MVP). Parser rzuca `Error` przy złym JSON; `apiFetch` mapuje HTTP na `ApiError`.

**DoD kroku:**

- `GET /runs/:id` na szczegółach parsuje `result`, `hitl`, `userRating`, `outputEdited`, `reviewFinalizedAt` albo pada jako błąd widoku (envelope / fallback), nie jako cichy drop pól.
- `conversationId` nie jest w `RunSnapshot` i nie jest renderowany.
- `submitHitl` woła same-origin `POST /api/v1/runs/:runId/hitl` przez `apiFetch`.
- Brak UI HITL / wyniku / przeglądu w tym kroku.

---

### KROK 2 — Panel HITL

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wypełnienie slotu `data-slot="run-hitl"`. Major 4.1. Social: multi-select min. 1; Content: akceptacja outline `[outline.id]`. `SPEC-RUNY.md` R-3f, `SPEC-CONTENT.md`, `docs/ux_dashboard.md`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/hitl-panel.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx` (dociągnięcie snapshotu przy granicy HITL + montaż panelu)

#### Nowy plik — `apps/frontend/src/modules/runs/components/hitl-panel.tsx`

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { submitHitl } from '@/modules/runs/api/runs.api';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { PageOutline, ReelIdea, SocialIdea } from '@/modules/runs/api/runs-result.types';

type HitlPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly onSubmitted: () => Promise<void>;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function toggleId(current: readonly string[], id: string): readonly string[] {
  if (current.includes(id)) return current.filter((item) => item !== id);
  return [...current, id];
}

function SocialOption({
  idea,
  checked,
  onToggle,
}: {
  readonly idea: SocialIdea | ReelIdea;
  readonly checked: boolean;
  readonly onToggle: (id: string) => void;
}) {
  const hint = 'description' in idea ? idea.description : idea.angle;
  return (
    <li className="flex items-start gap-2 py-2">
      <input
        id={`hitl-${idea.id}`}
        name="selectedIdeaIds"
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(idea.id)}
        className="mt-1 size-4 shrink-0 rounded-sm border border-input accent-primary"
      />
      <label htmlFor={`hitl-${idea.id}`} className="flex min-w-0 flex-col gap-0.5 text-sm">
        <span className="font-medium">{idea.title}</span>
        <span className="text-muted-foreground">{idea.hook}</span>
        <span className="text-xs text-muted-foreground">{hint}</span>
        {idea.cta ? <span className="text-xs">CTA: {idea.cta}</span> : null}
      </label>
    </li>
  );
}

function OutlinePreview({ outline }: { readonly outline: PageOutline }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-medium">{outline.title}</p>
      <ol className="divide-y divide-border">
        {outline.sections.map((section) => (
          <li key={section.id} className="flex flex-col gap-0.5 py-2">
            <span className="font-medium">{section.heading}</span>
            <span className="text-muted-foreground">{section.summary}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HitlPanel({ snapshot, onSubmitted }: HitlPanelProps) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  if (snapshot.status !== 'awaiting_hitl' || snapshot.hitl === null) {
    return null;
  }

  async function send(ids: readonly string[]): Promise<void> {
    setPending(true);
    setEnvelope(null);
    try {
      await submitHitl(snapshot.runId, ids);
      await onSubmitted();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setEnvelope(reason.envelope);
      } else {
        setEnvelope(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  if (snapshot.hitl.kind === 'page_outline') {
    const outline = snapshot.hitl.options[0];
    if (outline === undefined) {
      return (
        <section data-slot="run-hitl" className="flex flex-col gap-2">
          <h2 className="text-sm font-medium">Wybór w pipeline</h2>
          <p className="text-sm text-muted-foreground">Brak outline do akceptacji.</p>
        </section>
      );
    }
    return (
      <section data-slot="run-hitl" className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Akceptacja outline</h2>
        <OutlinePreview outline={outline} />
        {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
        <form
          className="flex flex-col gap-2"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void send([outline.id]);
          }}
        >
          <Button type="submit" disabled={pending}>
            Akceptuj outline
          </Button>
        </form>
      </section>
    );
  }

  const options = snapshot.hitl.options;
  const canSubmit = selected.length >= 1;

  return (
    <section data-slot="run-hitl" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Wybór w pipeline</h2>
      <p className="text-xs text-muted-foreground">
        Zaznacz co najmniej jeden pomysł. Każdy wybór to osobny artefakt.
      </p>
      <form
        className="flex flex-col gap-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!canSubmit) return;
          void send(selected);
        }}
      >
        <fieldset className="min-w-0">
          <legend className="sr-only">Pomysły do kontynuacji</legend>
          {options.length === 0 ? (
            <p className="text-sm text-muted-foreground">Brak opcji do wyboru.</p>
          ) : (
            <ul className="divide-y divide-border">
              {options.map((idea) => (
                <SocialOption
                  key={idea.id}
                  idea={idea}
                  checked={selected.includes(idea.id)}
                  onToggle={(id) => setSelected((current) => toggleId(current, id))}
                />
              ))}
            </ul>
          )}
        </fieldset>
        {!canSubmit ? (
          <p className="text-xs text-muted-foreground">Wybierz co najmniej jeden pomysł.</p>
        ) : null}
        {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
        <Button type="submit" disabled={pending || !canSubmit}>
          Kontynuuj
        </Button>
      </form>
    </section>
  );
}
```

#### Refaktor — `run-details-view.tsx`

1. Import `HitlPanel`, `RunResultView` (KROK 3 montuje wynik; w tym kroku wystarczy HITL + refetch; wynik w KROK 3).
2. Wyciągnij ładowanie snapshotu+logów do funkcji używanej w `useEffect`, `onTerminal` i po HITL.
3. `onStatus`: patch `status` jak dziś; **dodatkowo** GET gdy `status === 'awaiting_hitl'` albo gdy bieżący snapshot ma `hitl !== null` (zejście z pauzy, żeby panel zniknął).

**teraz** (`onStatus` w `useRunEventSource`):

```ts
    onStatus: (status) => {
      setView((current) => {
        if (current.status !== 'ready') return current;
        if (runId === null || current.snapshot.runId !== runId) return current;
        return { ...current, snapshot: { ...current.snapshot, status } };
      });
      if (runId) patchStatus(runId, status);
    },
```

**zamień na:**

```ts
    onStatus: (status) => {
      setView((current) => {
        if (current.status !== 'ready') return current;
        if (runId === null || current.snapshot.runId !== runId) return current;
        return { ...current, snapshot: { ...current.snapshot, status } };
      });
      if (runId) patchStatus(runId, status);
      const shouldReloadHitl =
        status === 'awaiting_hitl' ||
        (view.status === 'ready' && view.snapshot.hitl !== null);
      if (shouldReloadHitl && runId !== null) {
        void reloadDetails(runId);
      }
    },
```

`view` w closure `onStatus` jest stale przez `useEffectEvent` w hooku (handlery są w `useEffectEvent`). **Nie** czytaj `view` z renderu w ten sposób.

**HOW poprawny:** trzymaj `hitl` w `useRef` aktualizowanym przy `ready`, albo zawsze GET przy `awaiting_hitl` oraz GET po sukcesie `submitHitl`. Zejście z pauzy po 202 obsługuje `onSubmitted` (GET). SSE `running` po HITL: patch status + jeśli ref `hadHitl` → GET raz i zgaś ref.

Szkic refu (w `RunDetailsView`):

```ts
  const hadHitlRef = useRef(false);
  if (view.status === 'ready') {
    hadHitlRef.current = view.snapshot.hitl !== null;
  }
```

W `onStatus`:

```ts
      if (runId) patchStatus(runId, status);
      if (runId !== null && (status === 'awaiting_hitl' || hadHitlRef.current)) {
        void reloadDetails(runId);
      }
```

`reloadDetails` = istniejący `Promise.all([fetchRunSnapshot, fetchRunLogs])` + `setView` + guard `runIdRef`.

**teraz** (sloty na dole article):

```tsx
      <div data-slot="run-hitl" />
      <div data-slot="run-result" />
      <div data-slot="run-review" />
```

**zamień na** (KROK 2; wynik i przegląd w kolejnych krokach/plikach):

```tsx
      <HitlPanel
        snapshot={snapshot}
        onSubmitted={async () => {
          await reloadDetails(snapshot.runId);
          patchStatus(snapshot.runId, 'running');
          void refresh();
        }}
      />
      <div data-slot="run-result" />
      <div data-slot="run-review" />
```

Wyciągnij `reloadDetails` przed `useRunEventSource`, żeby `onTerminal` i HITL wołały tę samą funkcję (zamiast duplikatu `Promise.all` z dziś).

**Stany:**

| Stan | Zachowanie |
|------|------------|
| Nie `awaiting_hitl` | `HitlPanel` zwraca `null` |
| `interrupted` | Status z Fazy 3; panel ukryty |
| Social, 0 zaznaczeń | CTA disabled + tekst pod listą |
| 400 `HITL_INVALID_SELECTION` | `EnvelopeError` as-is; status zostaje; panel zostaje |
| 409 `HITL_REQUIRED` | envelope; GET odświeża status |
| Loading submit | `Button disabled` |
| Cudzy run w `awaiting_hitl` | Panel widoczny (GET); SSE i tak wyłączone (Faza 3) |

**Nie:** drugi panel w boxie; zmiana kanonu Content na multi-select; `selectedIdeaIds` na starcie.

**DoD kroku:**

- Przy własnym (i cudzym, jeśli GET) `awaiting_hitl` widać panel; poza tym stanem go nie ma.
- Social: nie da się wysłać pustego wyboru z UI; 2+ legalne; kolejność body = kolejność zaznaczania.
- Content: jeden przycisk, body `{ selectedIdeaIds: [outline.id] }`.
- Błąd selekcji = envelope z kontraktu.
- Po 202 panel znika po GET (status `running`, `hitl: null`).
- Box bez HITL.

---

### KROK 3 — Widok wyniku

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wypełnienie slotu `data-slot="run-result"`. Major 4.2. Listy vs skalar wg `taskType`; `characterCount` / `cta?` / `role?` gdy są. `docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-8.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/components/run-result-view.tsx`
- Zmiana: `run-details-view.tsx` (zastąpienie pustego `data-slot="run-result"`)
- Slot `run-review` zostaje pusty (plik 2)

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-result-view.tsx`

```tsx
import { PAGE_OUTLINE_ROLE_LABELS } from '@/modules/runs/api/run-labels';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import {
  runResultHasArtifacts,
  type PageDocument,
  type PageOutline,
  type ReelIdea,
  type ReelScript,
  type SocialContent,
  type SocialIdea,
} from '@/modules/runs/api/runs-result.types';

type RunResultViewProps = {
  readonly snapshot: RunSnapshot;
};

function ideaTitle(ideas: readonly SocialIdea[] | readonly ReelIdea[], id: string): string {
  const match = ideas.find((item) => item.id === id);
  return match === undefined ? id : match.title;
}

function IdeaBlock({ idea }: { readonly idea: SocialIdea }) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <h3 className="text-sm font-medium">{idea.title}</h3>
      <p className="text-sm">{idea.hook}</p>
      <p className="text-xs text-muted-foreground">{idea.angle}</p>
      {idea.cta ? <p className="text-xs">CTA: {idea.cta}</p> : null}
    </article>
  );
}

function ReelIdeaBlock({ idea }: { readonly idea: ReelIdea }) {
  return (
    <article className="flex flex-col gap-1 py-2">
      <h3 className="text-sm font-medium">{idea.title}</h3>
      <p className="text-sm">{idea.hook}</p>
      <p className="text-xs text-muted-foreground">{idea.description}</p>
      <p className="font-mono text-xs tabular-nums">{idea.durationSeconds} s</p>
      {idea.cta ? <p className="text-xs">CTA: {idea.cta}</p> : null}
    </article>
  );
}

function ContentBlock({ content }: { readonly content: SocialContent }) {
  return (
    <article className="flex max-w-[65ch] flex-col gap-1 py-2">
      <p className="whitespace-pre-wrap text-sm">{content.body}</p>
      {content.hashtags.length > 0 ? (
        <p className="text-xs text-muted-foreground">{content.hashtags.join(' ')}</p>
      ) : null}
      {content.cta ? <p className="text-xs">CTA: {content.cta}</p> : null}
      <p className="font-mono text-xs tabular-nums text-muted-foreground">
        {content.characterCount} znaków
      </p>
    </article>
  );
}

function ScriptBlock({ script }: { readonly script: ReelScript }) {
  return (
    <article className="flex flex-col gap-2 py-2">
      <ol className="divide-y divide-border text-sm">
        {script.segments.map((segment) => (
          <li
            key={`${segment.startSeconds}-${segment.endSeconds}-${segment.onScreen}`}
            className="flex flex-col gap-0.5 py-2"
          >
            <p className="font-mono text-xs tabular-nums text-muted-foreground">
              {segment.startSeconds} - {segment.endSeconds} s
            </p>
            <p>{segment.onScreen}</p>
            <p className="text-muted-foreground">{segment.voiceover}</p>
          </li>
        ))}
      </ol>
      <p className="text-xs">CTA: {script.cta}</p>
      {script.notes ? <p className="text-xs text-muted-foreground">{script.notes}</p> : null}
    </article>
  );
}

function OutlineBlock({ outline }: { readonly outline: PageOutline }) {
  return (
    <article className="flex flex-col gap-2 py-2">
      <h3 className="text-sm font-medium">{outline.title}</h3>
      <ol className="divide-y divide-border">
        {outline.sections.map((section) => (
          <li key={section.id} className="flex flex-col gap-0.5 py-2 text-sm">
            <span className="font-medium">{section.heading}</span>
            <span className="text-muted-foreground">{section.summary}</span>
            {section.role ? (
              <span className="text-xs text-muted-foreground">
                Rola: {PAGE_OUTLINE_ROLE_LABELS[section.role]}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </article>
  );
}

function DocumentBlock({ document }: { readonly document: PageDocument }) {
  return (
    <article className="flex max-w-[65ch] flex-col gap-2 py-2 text-sm">
      <h3 className="font-medium">{document.title}</h3>
      <p>{document.lead}</p>
      <p className="whitespace-pre-wrap">{document.body}</p>
      {document.metaTitle ? (
        <p className="text-xs text-muted-foreground">Meta title: {document.metaTitle}</p>
      ) : null}
      {document.metaDescription ? (
        <p className="text-xs text-muted-foreground">Meta: {document.metaDescription}</p>
      ) : null}
    </article>
  );
}

function EmptyResult({ failed }: { readonly failed: boolean }) {
  return (
    <p className="text-sm text-muted-foreground">
      {failed ? 'Run nie zapisał artefaktów.' : 'Brak zapisanego wyniku.'}
    </p>
  );
}

export function RunResultView({ snapshot }: RunResultViewProps) {
  if (snapshot.status !== 'completed' && snapshot.status !== 'failed') {
    return null;
  }

  const { result, taskType } = snapshot;
  const failed = snapshot.status === 'failed';

  return (
    <section data-slot="run-result" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Wynik</h2>
      {!runResultHasArtifacts(result) ? <EmptyResult failed={failed} /> : null}

      {taskType === 'post_ideas' || taskType === 'post_ideas_then_content' ? (
        result.ideas.length > 0 ? (
          <div className="divide-y divide-border">
            {result.ideas.map((idea) => (
              <IdeaBlock key={idea.id} idea={idea} />
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'post_content' && result.content ? (
        <ContentBlock content={result.content} />
      ) : null}

      {taskType === 'post_ideas_then_content' ? (
        result.contents.length > 0 ? (
          <div className="divide-y divide-border">
            {result.contents.map((item) => (
              <div key={item.sourceIdeaId} className="flex flex-col gap-1 py-2">
                <p className="text-xs text-muted-foreground">
                  Pomysł: {ideaTitle(result.ideas, item.sourceIdeaId)}
                </p>
                <ContentBlock content={item} />
              </div>
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'reel_ideas' || taskType === 'reel_ideas_then_scripts' ? (
        result.reelIdeas.length > 0 ? (
          <div className="divide-y divide-border">
            {result.reelIdeas.map((idea) => (
              <ReelIdeaBlock key={idea.id} idea={idea} />
            ))}
          </div>
        ) : null
      ) : null}

      {taskType === 'reel_script' && result.reelScript ? (
        <ScriptBlock script={result.reelScript} />
      ) : null}

      {taskType === 'reel_ideas_then_scripts' ? (
        result.reelScripts.length > 0 ? (
          <div className="divide-y divide-border">
            {result.reelScripts.map((item) => (
              <div key={item.sourceIdeaId} className="flex flex-col gap-1 py-2">
                <p className="text-xs text-muted-foreground">
                  Pomysł: {ideaTitle(result.reelIdeas, item.sourceIdeaId)}
                </p>
                <ScriptBlock script={item} />
              </div>
            ))}
          </div>
        ) : null
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline ? (
        <OutlineBlock outline={result.pageOutline} />
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageDocument ? (
        <DocumentBlock document={result.pageDocument} />
      ) : null}
    </section>
  );
}
```

`page_copy` zwykle nie ma outline; warunek `pageOutline` jest no-op gdy `null`.

Dwuetapowy Social **nie** renderuje `result.content` / `result.reelScript` (api trzyma skalar `null`). Jednoetapowy **nie** renderuje tablic `contents` / `reelScripts`.

#### Refaktor — slot wyniku

**teraz:**

```tsx
      <div data-slot="run-result" />
```

**zamień na:**

```tsx
      <RunResultView snapshot={snapshot} />
```

`RunResultView` jest Server-safe (brak hooków); można importować z client `RunDetailsView`.

Po `onTerminal` istniejący GET już wstawia pełny `result` do stanu. Po Edytuj (plik 2) ten sam widok pokaże treść użytkownika, bo czyta snapshot.

**Nie:** wynik na Koncie / w boxie; `conversationId`; diff vs output agenta; kontrolki przeglądu.

**DoD kroku:**

- `completed`: sekcja Wynik wg `taskType` (lista vs skalar).
- `failed`: to, co jest w `result`; pusty = copy empty.
- `contents[]` / `reelScripts[]` powiązane `sourceIdeaId`; przy content `characterCount`; `cta` / `role` tylko gdy obecne.
- Poza `completed` \| `failed` sekcji nie ma (także w trakcie HITL: wybór żyje w panelu, nie jako „Wynik”).
- Slot przeglądu nadal pusty.

---

#### Propozycja commit message

```text
feat(runs): show HITL selection and run result on details

Fill the details slots so operators can resume a paused pipeline and read artifacts without a second screen.
```

---

## Weryfikacja wycinka (ten plik)

- Kotwica major 4 / 4.1–4.2 pokryta; major 5–6 w kolejnych plikach.
- Zgodność `docs/ux_dashboard.md` + `SPEC-FRONTEND.md` F-8 + `SPEC-RUNY.md` HITL min. 1 / Content `[outline.id]`.
- Nowe pliki: kompletny kod. Refaktory: fragmenty `teraz → zamień na`.
- Nagłówki wyłącznie `FAZA` / `KROK`. Commit EN Conventional Commits.
- Statusy `NIE_ROZPOCZĘTY`. Major nietknięty.
- Visual lock dziedziczony (listy `divide-y`, brak Card na artefaktach, envelope as-is, zero emoji / em-dash / nowej palety).
- Pre-flight: HITL/wynik tylko na szczegółach; loading szczegółów już skeleton; empty wyniku z powodem; focus ring z `Button`/`input`.

## Ślad do major (informacyjnie)

Po **implementacji tego pliku** (poza tą sesją): Faza 4, Krok 4.1, Krok 4.2 → `WYKONANY`; MILESTONE 4 → `OSIĄGNIĘTY`. Fazy 5–6 bez zmian. Ten skill **nie** edytuje majoru.
