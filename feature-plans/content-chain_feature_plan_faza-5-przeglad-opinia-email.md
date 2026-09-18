# Content Chain — feature plan: Faza 5 (przegląd, opinia, email)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Przegląd na szczegółach (gwiazdki, Edytuj `result`, finalize); globalny zapis opinii; Konto: email + ten sam formularz opinii |
| Major | `content-chain-frontend_major_plan.md` — Faza 5 (kroki 5.1–5.3) + MILESTONE 5 |
| Ten plik zestawu | `FAZA 2` (porządkowa). Plik 1 = major 4 (`WYKONANY` w planie jako HOW; w kodzie: załóż zaimplementowany `content-chain_feature_plan_faza-4-hitl-wynik.md`) |
| Bramka ścieżki wstecz | Założenie: zapis kontekstu = kompletna bramka (major FE **Faza 3.5** / Milestone 3.5, api **Faza 11**). Ten plik **nie** implementuje `/context`. |
| Źródła | `docs/ux_dashboard.md`, `docs/dokumentacja_komunikacji.md`, `spec/SPEC-FRONTEND.md` F-8/F-9, `spec/SPEC-RUNY.md` R-10, `spec/SPEC-FEEDBACK.md`, `spec/SPEC-AUTH.md` A-3b, skill `content-chain-product-ui` |
| Poza zakresem tego pliku | HITL/wynik (plik 1); Użytkownicy (plik 3); `/context` i twardy PUT bramki (FE Faza 3.5, api Faza 11); panel odczytu opinii; zmiana hasła / usuwanie konta; diff vs output agenta; `PATCH /users/:id` z emailem; nowa paleta; implementacja api |
| Kontrakt api | Backend Faza 10.1 / 10.2 = `WYKONANY`. FE woła `PATCH .../rating`, `POST .../output-edited` `{ result }`, `POST .../finalize-review`, `POST /feedback`, `PATCH /auth/me`. Nie implementuje api |
| Po implementacji (informacyjnie) | Major FE: Faza 5 i kroki 5.1–5.3 → `WYKONANY`; MILESTONE 5 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność `KROK` ≠ 5.1→5.3 jeden do jednego: KROK 1 ← 5.1; KROK 2 = wspólny formularz + CTA (5.2) **przed** Kontem; KROK 3 ← 5.3 (email + reuse).

**Pass rozwojowy:** payload Edytuj (klucze `result` per `taskType`, bez `characterCount`) przed edytorem; `FeedbackForm` przed CTA i Kontem. Brak przenosin do innych faz majoru.

**HOW:** gwiazdki = Iconify `lucide:star` (ta sama rodzina co sidebar), nie `<input type="number">`. Opinia globalna = `Dialog` jak wylogowanie. Select runów opinii = `useOwnRuns()` odfiltrowany do `completed` \| `failed` (nie `GET /runs`).

**Design Read:** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Zapis kontekstu firmy = kompletna bramka (major FE **Faza 3.5**, api **Faza 11**). Ten plik **nie** implementuje `/context` i **nie** każe zapisywać pustej / kalekiej bramki.
- Parser snapshotu z pliku 1 (`result`, `userRating`, `outputEdited`, `reviewFinalizedAt`) jest na miejscu. `RunResultView` / `HitlPanel` istnieją.
- `OwnRunsProvider` owija chrome (header + Konto). Formularz opinii **reuse** tej listy.
- `apiFetch` + envelope as-is. `409` `REVIEW_LOCKED` / `RUN_NOT_REVIEWABLE` / `CONFLICT` bez mapy tłumaczeń.
- Edytuj: body `{ result }` tylko z kluczami dozwolonymi dla `taskType` (`RESULT_KEYS_BY_TASK_TYPE` jak api). Kardynalność i `id` / `sourceIdeaId` **nietknięte** (pola id w UI disabled albo w ogóle nieedytowalne). `characterCount` **nie** wysyłamy (api z `body.length`).
- Ocena: `PATCH` przy wyborze gwiazdki (w tym powrót do `null`). Finalize zatwierdza stan w DB, nie lokalny draft gwiazdek.
- Gwiazdki i Edytuj tylko autor + `completed` \| `failed` + `reviewFinalizedAt === null`.
- Copy bez em-dash. Testy FE poza MVP. `tsconfig` bez zmian.

### Biblioteki / API

- **Iconify** (Context7 `/websites/iconify_design`): `import { Icon } from '@iconify/react'` + `icon="lucide:star"` (string name). Już w chrome. Bez drugiej biblioteki ikon.
- **Dialog** (kit projektu, wzorzec `logout-dialog.tsx`): kontrolowany `open` / `onOpenChange`. Formularz opinii w `DialogContent` z `sm:max-w-lg` (szerszy niż wylogowanie).
- SPEC wygrywa: dwa miejsca zapisu opinii (header + Konto) to **ten sam kanon**, nie dwa różne wezwania na jednym ekranie poza Kontem.

---

## FAZA 2 — Przegląd, opinia, email

Odpowiada major **Faza 5**. Numer `FAZA 2` jest porządkowy w zestawie.

### KROK 1 — Przegląd na szczegółach (ocena, Edytuj, finalize)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wypełnienie slotu `data-slot="run-review"`. Major 5.1. `SPEC-RUNY.md` R-10; `docs/ux_dashboard.md` (Edytuj = treść kanoniczna + flaga).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/api/result-edit-payload.ts`
- Nowy: `apps/frontend/src/modules/runs/components/run-review-access.ts`
- Nowy: `apps/frontend/src/modules/runs/components/run-result-editor.tsx`
- Nowy: `apps/frontend/src/modules/runs/components/run-review-panel.tsx`
- Zmiana: `apps/frontend/src/modules/runs/api/runs.api.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx`

#### Nowy plik — `apps/frontend/src/modules/runs/api/result-edit-payload.ts`

```ts
import type { RunTaskType } from '@content-chain/shared';
import type {
  PageDocument,
  PageOutline,
  ReelScript,
  RunResult,
  SocialContent,
  SocialIdea,
  ReelIdea,
} from '@/modules/runs/api/runs-result.types';

const RESULT_KEYS_BY_TASK_TYPE: Record<RunTaskType, readonly (keyof RunResult)[]> = {
  post_ideas: ['ideas'],
  post_content: ['content'],
  post_ideas_then_content: ['ideas', 'contents'],
  reel_ideas: ['reelIdeas'],
  reel_script: ['reelScript'],
  reel_ideas_then_scripts: ['reelIdeas', 'reelScripts'],
  page_outline_then_copy: ['pageOutline', 'pageDocument'],
  page_copy: ['pageDocument'],
};

function omitEmptyCta<T extends { readonly cta?: string }>(item: T): T {
  const cta = item.cta?.trim();
  if (!cta) {
    const { cta: _dropped, ...rest } = item;
    return rest as T;
  }
  return { ...item, cta };
}

function contentPayload(content: SocialContent): Record<string, unknown> {
  const next: Record<string, unknown> = {
    body: content.body,
    hashtags: [...content.hashtags],
  };
  const cta = content.cta?.trim();
  if (cta) next.cta = cta;
  return next;
}

function scriptPayload(script: ReelScript): Record<string, unknown> {
  const next: Record<string, unknown> = {
    segments: script.segments.map((segment) => ({
      startSeconds: segment.startSeconds,
      endSeconds: segment.endSeconds,
      onScreen: segment.onScreen,
      voiceover: segment.voiceover,
    })),
    cta: script.cta,
  };
  const notes = script.notes?.trim();
  if (notes) next.notes = notes;
  return next;
}

function outlinePayload(outline: PageOutline): Record<string, unknown> {
  return {
    id: outline.id,
    title: outline.title,
    sections: outline.sections.map((section) => ({
      id: section.id,
      heading: section.heading,
      summary: section.summary,
      ...(section.role ? { role: section.role } : {}),
    })),
  };
}

function documentPayload(document: PageDocument): Record<string, unknown> {
  const next: Record<string, unknown> = {
    title: document.title,
    lead: document.lead,
    body: document.body,
  };
  const metaTitle = document.metaTitle?.trim();
  const metaDescription = document.metaDescription?.trim();
  if (metaTitle) next.metaTitle = metaTitle;
  if (metaDescription) next.metaDescription = metaDescription;
  return next;
}

function ideaPayload(idea: SocialIdea): Record<string, unknown> {
  const next = omitEmptyCta(idea);
  return {
    id: next.id,
    title: next.title,
    angle: next.angle,
    hook: next.hook,
    ...(next.cta ? { cta: next.cta } : {}),
  };
}

function reelIdeaPayload(idea: ReelIdea): Record<string, unknown> {
  const next = omitEmptyCta(idea);
  return {
    id: next.id,
    title: next.title,
    description: next.description,
    hook: next.hook,
    durationSeconds: next.durationSeconds,
    ...(next.cta ? { cta: next.cta } : {}),
  };
}

export function buildOutputEditedBody(
  taskType: RunTaskType,
  result: RunResult,
): { readonly result: Record<string, unknown> } {
  const payload: Record<string, unknown> = {};
  for (const key of RESULT_KEYS_BY_TASK_TYPE[taskType]) {
    if (key === 'ideas' && result.ideas.length > 0) {
      payload.ideas = result.ideas.map(ideaPayload);
    }
    if (key === 'content' && result.content !== null) {
      payload.content = contentPayload(result.content);
    }
    if (key === 'contents' && result.contents.length > 0) {
      payload.contents = result.contents.map((item) => ({
        ...contentPayload(item),
        sourceIdeaId: item.sourceIdeaId,
      }));
    }
    if (key === 'reelIdeas' && result.reelIdeas.length > 0) {
      payload.reelIdeas = result.reelIdeas.map(reelIdeaPayload);
    }
    if (key === 'reelScript' && result.reelScript !== null) {
      payload.reelScript = scriptPayload(result.reelScript);
    }
    if (key === 'reelScripts' && result.reelScripts.length > 0) {
      payload.reelScripts = result.reelScripts.map((item) => ({
        ...scriptPayload(item),
        sourceIdeaId: item.sourceIdeaId,
      }));
    }
    if (key === 'pageOutline' && result.pageOutline !== null) {
      payload.pageOutline = outlinePayload(result.pageOutline);
    }
    if (key === 'pageDocument' && result.pageDocument !== null) {
      payload.pageDocument = documentPayload(result.pageDocument);
    }
  }
  return { result: payload };
}

export function canEditResult(taskType: RunTaskType, result: RunResult): boolean {
  return Object.keys(buildOutputEditedBody(taskType, result).result).length > 0;
}
```

`omitEmptyCta` z destrukturyzacją `cta` jest OK w FE (nie publiczne API). Jeśli lint na `_dropped`: buduj obiekt jawnie bez spreadu omit.

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-review-access.ts`

```ts
import type { UserId } from '@content-chain/shared';
import { isTerminalRunStatus, type RunSnapshot } from '@/modules/runs/api/runs.types';

export function canReviewSnapshot(snapshot: RunSnapshot, userId: UserId): boolean {
  return (
    snapshot.startedBy !== null &&
    snapshot.startedBy.id === userId &&
    isTerminalRunStatus(snapshot.status) &&
    snapshot.reviewFinalizedAt === null
  );
}
```

#### Refaktor — `runs.api.ts`

Dopisz (obok `submitHitl` z pliku 1):

```ts
import { isRecord } from '@/shared/api/envelope';
import type { UserRating } from '@/modules/runs/api/runs-result.types';

export async function patchRunRating(
  runId: RunId,
  rating: UserRating | null,
): Promise<{ readonly userRating: UserRating | null }> {
  const body = await apiFetch(`/runs/${runId}/rating`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ rating }),
  });
  if (!isRecord(body) || (body.userRating !== null && typeof body.userRating !== 'number')) {
    throw new Error('Invalid rating payload');
  }
  if (
    body.userRating !== null &&
    (body.userRating < 1 || body.userRating > 5 || !Number.isInteger(body.userRating))
  ) {
    throw new Error('Invalid userRating');
  }
  return { userRating: body.userRating as UserRating | null };
}

export async function saveOutputEdited(
  runId: RunId,
  payload: { readonly result: Record<string, unknown> },
): Promise<void> {
  const body = await apiFetch(`/runs/${runId}/output-edited`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!isRecord(body) || body.outputEdited !== true) {
    throw new Error('Invalid output-edited payload');
  }
}

export async function finalizeRunReview(runId: RunId): Promise<{ readonly reviewFinalizedAt: string }> {
  const body = await apiFetch(`/runs/${runId}/finalize-review`, {
    method: 'POST',
  });
  if (!isRecord(body) || typeof body.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid finalize payload');
  }
  return { reviewFinalizedAt: body.reviewFinalizedAt };
}
```

Zawężenie `userRating` bez `as`: lokalny type guard `function isUserRating(value: number): value is UserRating`. **Zamień** `as UserRating` na guard (zakaz gołego `as` w implementacji).

```ts
function isUserRating(value: number): value is UserRating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}
```

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-result-editor.tsx`

Edytor treści. Id / `sourceIdeaId` w `readOnly` inputach (albo ukryte + podpis). Bez dodawania / usuwania pozycji.

```tsx
'use client';

import { NativeSelect } from '@/shared/ui/native-select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { FormField } from '@/shared/ui/form-field';
import { PAGE_OUTLINE_ROLE_LABELS } from '@/modules/runs/api/run-labels';
import {
  PAGE_OUTLINE_SECTION_ROLES,
  type PageOutlineSectionRole,
  type ReelDurationSeconds,
  type ReelScript,
  type ReelScriptSegment,
  type RunResult,
  type SocialContent,
} from '@/modules/runs/api/runs-result.types';
import type { RunTaskType } from '@content-chain/shared';

type RunResultEditorProps = {
  readonly taskType: RunTaskType;
  readonly result: RunResult;
  readonly disabled: boolean;
  readonly onChange: (result: RunResult) => void;
  readonly idPrefix: string;
};

const DURATIONS: readonly ReelDurationSeconds[] = [15, 30, 90];

function splitHashtags(value: string): readonly string[] {
  return value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function ContentFields({
  idPrefix,
  content,
  disabled,
  onChange,
}: {
  readonly idPrefix: string;
  readonly content: SocialContent;
  readonly disabled: boolean;
  readonly onChange: (content: SocialContent) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FormField label="Treść" htmlFor={`${idPrefix}-body`}>
        <Textarea
          id={`${idPrefix}-body`}
          value={content.body}
          disabled={disabled}
          onChange={(event) => onChange({ ...content, body: event.target.value })}
        />
      </FormField>
      <FormField label="Hashtagi (oddzielone spacją)" htmlFor={`${idPrefix}-tags`}>
        <Input
          id={`${idPrefix}-tags`}
          value={content.hashtags.join(' ')}
          disabled={disabled}
          onChange={(event) =>
            onChange({ ...content, hashtags: splitHashtags(event.target.value) })
          }
        />
      </FormField>
      <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-cta`}>
        <Input
          id={`${idPrefix}-cta`}
          value={content.cta ?? ''}
          disabled={disabled}
          onChange={(event) =>
            onChange({
              ...content,
              ...(event.target.value.trim() ? { cta: event.target.value } : { cta: undefined }),
            })
          }
        />
      </FormField>
    </div>
  );
}

function patchScriptSegment(
  script: ReelScript,
  index: number,
  patch: Partial<ReelScriptSegment>,
): ReelScript {
  return {
    ...script,
    segments: script.segments.map((row, rowIndex) =>
      rowIndex === index ? { ...row, ...patch } : row,
    ),
  };
}

function ReelScriptFields({
  idPrefix,
  script,
  disabled,
  onChange,
}: {
  readonly idPrefix: string;
  readonly script: ReelScript;
  readonly disabled: boolean;
  readonly onChange: (script: ReelScript) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {script.segments.map((segment, index) => (
        <fieldset key={`${idPrefix}-seg-${index}`} className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Segment {index + 1}</legend>
          <FormField label="Start (s)" htmlFor={`${idPrefix}-seg-${index}-start`}>
            <Input
              id={`${idPrefix}-seg-${index}-start`}
              type="number"
              value={String(segment.startSeconds)}
              disabled={disabled}
              onChange={(event) => {
                const startSeconds = Number(event.target.value);
                if (!Number.isFinite(startSeconds)) return;
                onChange(patchScriptSegment(script, index, { startSeconds }));
              }}
            />
          </FormField>
          <FormField label="Koniec (s)" htmlFor={`${idPrefix}-seg-${index}-end`}>
            <Input
              id={`${idPrefix}-seg-${index}-end`}
              type="number"
              value={String(segment.endSeconds)}
              disabled={disabled}
              onChange={(event) => {
                const endSeconds = Number(event.target.value);
                if (!Number.isFinite(endSeconds)) return;
                onChange(patchScriptSegment(script, index, { endSeconds }));
              }}
            />
          </FormField>
          <FormField label="Na ekranie" htmlFor={`${idPrefix}-seg-${index}-on`}>
            <Textarea
              id={`${idPrefix}-seg-${index}-on`}
              value={segment.onScreen}
              disabled={disabled}
              onChange={(event) =>
                onChange(patchScriptSegment(script, index, { onScreen: event.target.value }))
              }
            />
          </FormField>
          <FormField label="Voiceover" htmlFor={`${idPrefix}-seg-${index}-vo`}>
            <Textarea
              id={`${idPrefix}-seg-${index}-vo`}
              value={segment.voiceover}
              disabled={disabled}
              onChange={(event) =>
                onChange(patchScriptSegment(script, index, { voiceover: event.target.value }))
              }
            />
          </FormField>
        </fieldset>
      ))}
      <FormField label="CTA scenariusza" htmlFor={`${idPrefix}-cta`}>
        <Input
          id={`${idPrefix}-cta`}
          value={script.cta}
          disabled={disabled}
          onChange={(event) => onChange({ ...script, cta: event.target.value })}
        />
      </FormField>
      <FormField label="Notatki (opcjonalnie)" htmlFor={`${idPrefix}-notes`}>
        <Textarea
          id={`${idPrefix}-notes`}
          value={script.notes ?? ''}
          disabled={disabled}
          onChange={(event) =>
            onChange({
              ...script,
              ...(event.target.value.trim()
                ? { notes: event.target.value }
                : { notes: undefined }),
            })
          }
        />
      </FormField>
    </div>
  );
}

export function RunResultEditor({
  taskType,
  result,
  disabled,
  onChange,
  idPrefix,
}: RunResultEditorProps) {
  return (
    <div className="flex flex-col gap-6">
      {(taskType === 'post_ideas' || taskType === 'post_ideas_then_content') &&
        result.ideas.map((idea, index) => (
          <fieldset key={idea.id} className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Pomysł {index + 1}</legend>
            <FormField label="Tytuł" htmlFor={`${idPrefix}-idea-${idea.id}-title`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-title`}
                value={idea.title}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, title: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Hook" htmlFor={`${idPrefix}-idea-${idea.id}-hook`}>
              <Textarea
                id={`${idPrefix}-idea-${idea.id}-hook`}
                value={idea.hook}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, hook: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Kąt" htmlFor={`${idPrefix}-idea-${idea.id}-angle`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-angle`}
                value={idea.angle}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id ? { ...item, angle: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-idea-${idea.id}-cta`}>
              <Input
                id={`${idPrefix}-idea-${idea.id}-cta`}
                value={idea.cta ?? ''}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    ideas: result.ideas.map((item) =>
                      item.id === idea.id
                        ? {
                            ...item,
                            ...(event.target.value.trim()
                              ? { cta: event.target.value }
                              : { cta: undefined }),
                          }
                        : item,
                    ),
                  })
                }
              />
            </FormField>
          </fieldset>
        ))}

      {taskType === 'post_content' && result.content ? (
        <ContentFields
          idPrefix={`${idPrefix}-content`}
          content={result.content}
          disabled={disabled}
          onChange={(content) => onChange({ ...result, content })}
        />
      ) : null}

      {taskType === 'post_ideas_then_content'
        ? result.contents.map((item) => (
            <fieldset key={item.sourceIdeaId} className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Treść ({item.sourceIdeaId})</legend>
              <ContentFields
                idPrefix={`${idPrefix}-contents-${item.sourceIdeaId}`}
                content={item}
                disabled={disabled}
                onChange={(content) =>
                  onChange({
                    ...result,
                    contents: result.contents.map((row) =>
                      row.sourceIdeaId === item.sourceIdeaId
                        ? { ...content, sourceIdeaId: item.sourceIdeaId }
                        : row,
                    ),
                  })
                }
              />
            </fieldset>
          ))
        : null}

      {(taskType === 'reel_ideas' || taskType === 'reel_ideas_then_scripts') &&
        result.reelIdeas.map((idea) => (
          <fieldset key={idea.id} className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Pomysł rolki</legend>
            <FormField label="Tytuł" htmlFor={`${idPrefix}-reel-${idea.id}-title`}>
              <Input
                id={`${idPrefix}-reel-${idea.id}-title`}
                value={idea.title}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, title: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Opis" htmlFor={`${idPrefix}-reel-${idea.id}-desc`}>
              <Textarea
                id={`${idPrefix}-reel-${idea.id}-desc`}
                value={idea.description}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, description: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Hook" htmlFor={`${idPrefix}-reel-${idea.id}-hook`}>
              <Textarea
                id={`${idPrefix}-reel-${idea.id}-hook`}
                value={idea.hook}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, hook: event.target.value } : item,
                    ),
                  })
                }
              />
            </FormField>
            <FormField label="Czas (s)" htmlFor={`${idPrefix}-reel-${idea.id}-dur`}>
              <NativeSelect
                id={`${idPrefix}-reel-${idea.id}-dur`}
                value={String(idea.durationSeconds)}
                disabled={disabled}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value !== 15 && value !== 30 && value !== 90) return;
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id ? { ...item, durationSeconds: value } : item,
                    ),
                  });
                }}
              >
                {DURATIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </NativeSelect>
            </FormField>
            <FormField label="CTA (opcjonalnie)" htmlFor={`${idPrefix}-reel-${idea.id}-cta`}>
              <Input
                id={`${idPrefix}-reel-${idea.id}-cta`}
                value={idea.cta ?? ''}
                disabled={disabled}
                onChange={(event) =>
                  onChange({
                    ...result,
                    reelIdeas: result.reelIdeas.map((item) =>
                      item.id === idea.id
                        ? {
                            ...item,
                            ...(event.target.value.trim()
                              ? { cta: event.target.value }
                              : { cta: undefined }),
                          }
                        : item,
                    ),
                  })
                }
              />
            </FormField>
          </fieldset>
        ))}

      {taskType === 'reel_script' && result.reelScript ? (
        <ReelScriptFields
          idPrefix={`${idPrefix}-script`}
          script={result.reelScript}
          disabled={disabled}
          onChange={(script) => onChange({ ...result, reelScript: script })}
        />
      ) : null}

      {taskType === 'reel_ideas_then_scripts'
        ? result.reelScripts.map((item) => (
            <fieldset key={item.sourceIdeaId} className="flex flex-col gap-3">
              <legend className="text-sm font-medium">Scenariusz</legend>
              <p className="text-xs text-muted-foreground">
                Powiązanie z pomysłem zostaje bez zmian (sourceIdeaId nieedytowalne).
              </p>
              <ReelScriptFields
                idPrefix={`${idPrefix}-rs-${item.sourceIdeaId}`}
                script={item}
                disabled={disabled}
                onChange={(script) =>
                  onChange({
                    ...result,
                    reelScripts: result.reelScripts.map((row) =>
                      row.sourceIdeaId === item.sourceIdeaId
                        ? { ...script, sourceIdeaId: item.sourceIdeaId }
                        : row,
                    ),
                  })
                }
              />
            </fieldset>
          ))
        : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline
        ? result.pageOutline.sections.map((section) => (
            <fieldset key={section.id} className="flex flex-col gap-2">
              <legend className="text-sm font-medium">Sekcja outline</legend>
              <FormField label="Nagłówek" htmlFor={`${idPrefix}-sec-${section.id}-h`}>
                <Input
                  id={`${idPrefix}-sec-${section.id}-h`}
                  value={section.heading}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, heading: event.target.value } : row,
                        ),
                      },
                    });
                  }}
                />
              </FormField>
              <FormField label="Streszczenie" htmlFor={`${idPrefix}-sec-${section.id}-s`}>
                <Textarea
                  id={`${idPrefix}-sec-${section.id}-s`}
                  value={section.summary}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, summary: event.target.value } : row,
                        ),
                      },
                    });
                  }}
                />
              </FormField>
              <FormField label="Rola (opcjonalnie)" htmlFor={`${idPrefix}-sec-${section.id}-r`}>
                <NativeSelect
                  id={`${idPrefix}-sec-${section.id}-r`}
                  value={section.role ?? ''}
                  disabled={disabled}
                  onChange={(event) => {
                    const outline = result.pageOutline;
                    if (!outline) return;
                    const raw = event.target.value;
                    const role: PageOutlineSectionRole | undefined =
                      raw === ''
                        ? undefined
                        : PAGE_OUTLINE_SECTION_ROLES.find((item) => item === raw);
                    if (raw !== '' && role === undefined) return;
                    onChange({
                      ...result,
                      pageOutline: {
                        ...outline,
                        sections: outline.sections.map((row) =>
                          row.id === section.id ? { ...row, role } : row,
                        ),
                      },
                    });
                  }}
                >
                  <option value="">Bez roli</option>
                  {PAGE_OUTLINE_SECTION_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {PAGE_OUTLINE_ROLE_LABELS[role]}
                    </option>
                  ))}
                </NativeSelect>
              </FormField>
            </fieldset>
          ))
        : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageOutline ? (
        <FormField label="Tytuł outline" htmlFor={`${idPrefix}-outline-title`}>
          <Input
            id={`${idPrefix}-outline-title`}
            value={result.pageOutline.title}
            disabled={disabled}
            onChange={(event) => {
              const outline = result.pageOutline;
              if (!outline) return;
              onChange({ ...result, pageOutline: { ...outline, title: event.target.value } });
            }}
          />
        </FormField>
      ) : null}

      {(taskType === 'page_outline_then_copy' || taskType === 'page_copy') && result.pageDocument ? (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Dokument strony</legend>
          <FormField label="Tytuł" htmlFor={`${idPrefix}-doc-title`}>
            <Input
              id={`${idPrefix}-doc-title`}
              value={result.pageDocument.title}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, title: event.target.value } });
              }}
            />
          </FormField>
          <FormField label="Lead" htmlFor={`${idPrefix}-doc-lead`}>
            <Textarea
              id={`${idPrefix}-doc-lead`}
              value={result.pageDocument.lead}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, lead: event.target.value } });
              }}
            />
          </FormField>
          <FormField label="Treść" htmlFor={`${idPrefix}-doc-body`}>
            <Textarea
              id={`${idPrefix}-doc-body`}
              value={result.pageDocument.body}
              disabled={disabled}
              onChange={(event) => {
                const document = result.pageDocument;
                if (!document) return;
                onChange({ ...result, pageDocument: { ...document, body: event.target.value } });
              }}
            />
          </FormField>
        </fieldset>
      ) : null}
    </div>
  );
}
```

`ReelScriptFields` jest wspólny dla skalarnego `reel_script` i listy `reelScripts[]`. Liczba segmentów stała (bez dodawania / usuwania). `sourceIdeaId` pozycji listy nie jest kontrolką. Pola: start, koniec, onScreen, voiceover, CTA, notes.

#### Nowy plik — `apps/frontend/src/modules/runs/components/run-review-panel.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { UserId } from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import {
  finalizeRunReview,
  patchRunRating,
  saveOutputEdited,
} from '@/modules/runs/api/runs.api';
import {
  buildOutputEditedBody,
  canEditResult,
} from '@/modules/runs/api/result-edit-payload';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { RunResult, UserRating } from '@/modules/runs/api/runs-result.types';
import { canReviewSnapshot } from '@/modules/runs/components/run-review-access';
import { RunResultEditor } from '@/modules/runs/components/run-result-editor';

type RunReviewPanelProps = {
  readonly snapshot: RunSnapshot;
  readonly userId: UserId;
  readonly editing: boolean;
  readonly onEditingChange: (editing: boolean) => void;
  readonly onReload: () => Promise<void>;
};

const STARS: readonly UserRating[] = [1, 2, 3, 4, 5];
const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function RunReviewPanel({
  snapshot,
  userId,
  editing,
  onEditingChange,
  onReload,
}: RunReviewPanelProps) {
  const locked = snapshot.reviewFinalizedAt !== null;
  const author =
    snapshot.startedBy !== null && snapshot.startedBy.id === userId;
  const reviewable = canReviewSnapshot(snapshot, userId);
  const [draft, setDraft] = useState<RunResult>(snapshot.result);
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  if (!author || (snapshot.status !== 'completed' && snapshot.status !== 'failed')) {
    return null;
  }

  async function runAction(action: () => Promise<void>): Promise<void> {
    setPending(true);
    setEnvelope(null);
    try {
      await action();
      await onReload();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <section data-slot="run-review" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Przegląd</h2>
      {locked ? (
        <p className="text-sm text-muted-foreground">
          Przegląd zamknięty
          {snapshot.userRating !== null ? `. Ocena ${snapshot.userRating} z 5.` : '.'}
        </p>
      ) : null}
      <div role="group" aria-label="Ocena gwiazdkowa" className="flex items-center gap-1">
        {STARS.map((value) => {
          const active = snapshot.userRating !== null && snapshot.userRating >= value;
          return (
            <Button
              key={value}
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={!reviewable || pending}
              aria-label={`Ocena ${value} z 5`}
              aria-pressed={snapshot.userRating === value}
              onClick={() => {
                void runAction(async () => {
                  await patchRunRating(snapshot.runId, value);
                });
              }}
            >
              <Icon
                icon="lucide:star"
                className={active ? 'size-4 text-foreground' : 'size-4 text-muted-foreground'}
              />
            </Button>
          );
        })}
        {reviewable ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending || snapshot.userRating === null}
            onClick={() => {
              void runAction(async () => {
                await patchRunRating(snapshot.runId, null);
              });
            }}
          >
            Bez oceny
          </Button>
        ) : null}
      </div>
      {reviewable && canEditResult(snapshot.taskType, snapshot.result) ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setDraft(snapshot.result);
              onEditingChange(!editing);
            }}
          >
            {editing ? 'Anuluj edycję' : 'Edytuj'}
          </Button>
          {editing ? (
            <Button
              type="button"
              disabled={pending}
              onClick={() => {
                void runAction(async () => {
                  await saveOutputEdited(
                    snapshot.runId,
                    buildOutputEditedBody(snapshot.taskType, draft),
                  );
                  onEditingChange(false);
                });
              }}
            >
              Zapisz treść
            </Button>
          ) : null}
        </div>
      ) : null}
      {editing && reviewable ? (
        <RunResultEditor
          taskType={snapshot.taskType}
          result={draft}
          disabled={pending}
          idPrefix="review-edit"
          onChange={setDraft}
        />
      ) : null}
      {reviewable ? (
        <Button
          type="button"
          disabled={pending}
          onClick={() => {
            void runAction(async () => {
              await finalizeRunReview(snapshot.runId);
              onEditingChange(false);
            });
          }}
        >
          Zamknij przegląd
        </Button>
      ) : null}
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
    </section>
  );
}
```

Po zmianie `snapshot.result` z zewnątrz (GET) zsynchronizuj `draft` tylko gdy `!editing` (w `useEffect` zależnym od `snapshot.runId` + `snapshot.outputEdited` + `snapshot.result`).

Kropka w copy locku: `Przegląd zamknięty` + osobne zdanie z oceną. Unikaj ` · ` jako separatora wszystkiego (anti-tell); tu dopuszczalny jako meta (już w nagłówku szczegółów Fazy 3). Alternatywa: dwa `<span>`.

#### Refaktor — `run-details-view.tsx`

Stan `editing` w widoku szczegółów. Gdy `editing`, **nie** pokazuj `RunResultView` (edytor jest w przeglądzie). Po zapisie GET odświeża wynik.

**teraz** (po pliku 1, koniec `article`):

```tsx
      <HitlPanel ... />
      <RunResultView snapshot={snapshot} />
      <div data-slot="run-review" />
```

**zamień na:**

```tsx
      <HitlPanel
        snapshot={snapshot}
        onSubmitted={async () => {
          await reloadDetails(snapshot.runId);
          patchStatus(snapshot.runId, 'running');
          void refresh();
        }}
      />
      {editing ? null : <RunResultView snapshot={snapshot} />}
      {session.status === 'authenticated' ? (
        <RunReviewPanel
          snapshot={snapshot}
          userId={session.user.id}
          editing={editing}
          onEditingChange={setEditing}
          onReload={async () => {
            await reloadDetails(snapshot.runId);
          }}
        />
      ) : null}
```

`const [editing, setEditing] = useState(false);` plus reset `setEditing(false)` gdy zmienia się `runId`.

**Nie:** gwiazdki w boxie; ponowne odpalenie pipeline; UI diff; ocena po finalize.

**DoD kroku:**

- Autor po `completed` \| `failed` i otwartym przeglądzie: gwiazdki 1–5 (nie numeric), Edytuj, finalize.
- Brak gwiazdek = `PATCH` `rating: null` przez „Bez oceny”; brak wyboru na starcie zostawia `null`.
- Zapis Edytuj → GET pokazuje treść użytkownika; `outputEdited` z api; bez wywołania grafu (FE nie ma takiego klienta).
- Po finalize kontrolki disabled; `409` envelope.
- Nie-autor i stany nieterminalne: brak panelu.

---

### KROK 2 — Globalny formularz opinii

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 5.2. CTA w slocie headera Fazy 1. `SPEC-FEEDBACK.md`, `SPEC-FRONTEND.md` F-9, `docs/ux_dashboard.md` (Zostaw opinię).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/feedback/api/feedback.types.ts`
- Nowy: `apps/frontend/src/modules/feedback/api/feedback.api.ts`
- Nowy: `apps/frontend/src/modules/feedback/api/feedback-labels.ts`
- Nowy: `apps/frontend/src/modules/feedback/components/feedback-form.tsx`
- Nowy: `apps/frontend/src/modules/feedback/components/feedback-cta.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/chrome-slots.tsx`

#### Nowy plik — `apps/frontend/src/modules/feedback/api/feedback.types.ts`

```ts
import {
  createFeedbackId,
  createRunId,
  createUserId,
  isFeedbackAgentKey,
  isFeedbackId,
  isFeedbackTargetType,
  isRunId,
  isUserId,
  type FeedbackAgentKey,
  type FeedbackId,
  type FeedbackTargetType,
  type RunId,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const FEEDBACK_BODY_MAX = 4000;

export type CreateFeedbackInput =
  | { readonly targetType: 'application'; readonly body: string }
  | {
      readonly targetType: 'agent';
      readonly agentKey: FeedbackAgentKey;
      readonly body: string;
    }
  | { readonly targetType: 'run'; readonly runId: RunId; readonly body: string };

export type FeedbackCreated = {
  readonly id: FeedbackId;
  readonly targetType: FeedbackTargetType;
  readonly agentKey: FeedbackAgentKey | null;
  readonly runId: RunId | null;
  readonly body: string;
  readonly authorId: UserId;
  readonly createdAt: string;
};

export function feedbackRequestBody(input: CreateFeedbackInput): Record<string, unknown> {
  if (input.targetType === 'application') {
    return { targetType: 'application', body: input.body };
  }
  if (input.targetType === 'agent') {
    return { targetType: 'agent', agentKey: input.agentKey, body: input.body };
  }
  return { targetType: 'run', runId: input.runId, body: input.body };
}

export function parseFeedbackCreated(value: unknown): FeedbackCreated {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isFeedbackId(value.id) ||
    typeof value.targetType !== 'string' ||
    !isFeedbackTargetType(value.targetType) ||
    typeof value.body !== 'string' ||
    typeof value.authorId !== 'string' ||
    !isUserId(value.authorId) ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid feedback payload');
  }
  const agentKey =
    value.agentKey === null || value.agentKey === undefined
      ? null
      : typeof value.agentKey === 'string' && isFeedbackAgentKey(value.agentKey)
        ? value.agentKey
        : (() => {
            throw new Error('Invalid agentKey');
          })();
  const runId =
    value.runId === null || value.runId === undefined
      ? null
      : typeof value.runId === 'string' && isRunId(value.runId)
        ? createRunId(value.runId)
        : (() => {
            throw new Error('Invalid runId');
          })();
  return {
    id: createFeedbackId(value.id),
    targetType: value.targetType,
    agentKey,
    runId,
    body: value.body,
    authorId: createUserId(value.authorId),
    createdAt: value.createdAt,
  };
}
```

#### Nowy plik — `apps/frontend/src/modules/feedback/api/feedback.api.ts`

```ts
import { apiFetch } from '@/shared/api/api-fetch';
import {
  feedbackRequestBody,
  parseFeedbackCreated,
  type CreateFeedbackInput,
  type FeedbackCreated,
} from '@/modules/feedback/api/feedback.types';

export async function createFeedback(input: CreateFeedbackInput): Promise<FeedbackCreated> {
  const body = await apiFetch('/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(feedbackRequestBody(input)),
  });
  return parseFeedbackCreated(body);
}
```

#### Nowy plik — `apps/frontend/src/modules/feedback/api/feedback-labels.ts`

```ts
import type { FeedbackAgentKey, FeedbackTargetType } from '@content-chain/shared';

export const FEEDBACK_TARGET_LABELS = {
  application: 'Aplikacja',
  agent: 'Agent',
  run: 'Run',
} as const satisfies Record<FeedbackTargetType, string>;

export const FEEDBACK_AGENT_LABELS = {
  IdeationAgent: 'Agent pomysłów',
  ContentWriterAgent: 'Agent treści SM',
  ConsistencyVerifier: 'Weryfikator spójności',
  PageWriterAgent: 'Agent copy strony',
} as const satisfies Record<FeedbackAgentKey, string>;
```

#### Nowy plik — `apps/frontend/src/modules/feedback/components/feedback-form.tsx`

```tsx
'use client';

import { useMemo, useState, type FormEvent } from 'react';
import {
  FEEDBACK_AGENT_KEYS,
  FEEDBACK_TARGET_TYPES,
  isFeedbackAgentKey,
  isFeedbackTargetType,
  isRunId,
  createRunId,
  type FeedbackAgentKey,
  type FeedbackTargetType,
  type RunId,
} from '@content-chain/shared';
import { Button } from '@/shared/ui/button';
import { NativeSelect } from '@/shared/ui/native-select';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { isTerminalRunStatus } from '@/modules/runs/api/runs.types';
import { RUN_TASK_TYPE_LABELS } from '@/modules/runs/api/run-labels';
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { createFeedback } from '@/modules/feedback/api/feedback.api';
import { FEEDBACK_BODY_MAX, type CreateFeedbackInput } from '@/modules/feedback/api/feedback.types';
import {
  FEEDBACK_AGENT_LABELS,
  FEEDBACK_TARGET_LABELS,
} from '@/modules/feedback/api/feedback-labels';

type FeedbackFormProps = {
  readonly idPrefix: string;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function toInput(
  targetType: FeedbackTargetType,
  agentKey: FeedbackAgentKey,
  runId: RunId | '',
  body: string,
): CreateFeedbackInput | null {
  const trimmed = body.trim();
  if (trimmed.length === 0 || trimmed.length > FEEDBACK_BODY_MAX) return null;
  if (targetType === 'application') return { targetType, body: trimmed };
  if (targetType === 'agent') return { targetType, agentKey, body: trimmed };
  if (runId === '') return null;
  return { targetType: 'run', runId, body: trimmed };
}

export function FeedbackForm({ idPrefix }: FeedbackFormProps) {
  const { state } = useOwnRuns();
  const [targetType, setTargetType] = useState<FeedbackTargetType>('application');
  const [agentKey, setAgentKey] = useState<FeedbackAgentKey>('IdeationAgent');
  const [runId, setRunId] = useState<RunId | ''>('');
  const [body, setBody] = useState('');
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  const reviewableRuns = useMemo(() => {
    if (state.status !== 'ready') return [];
    return state.items.filter((item) => isTerminalRunStatus(item.status));
  }, [state]);

  const input = toInput(targetType, agentKey, runId, body);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!input) return;
    setPending(true);
    setEnvelope(null);
    setSaved(false);
    try {
      await createFeedback(input);
      setBody('');
      setSaved(true);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(event) => void onSubmit(event)}>
      <FormField label="Co oceniasz" htmlFor={`${idPrefix}-target`}>
        <NativeSelect
          id={`${idPrefix}-target`}
          value={targetType}
          onChange={(event) => {
            if (!isFeedbackTargetType(event.target.value)) return;
            setTargetType(event.target.value);
            setSaved(false);
          }}
        >
          {FEEDBACK_TARGET_TYPES.map((item) => (
            <option key={item} value={item}>
              {FEEDBACK_TARGET_LABELS[item]}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      {targetType === 'agent' ? (
        <FormField label="Agent" htmlFor={`${idPrefix}-agent`}>
          <NativeSelect
            id={`${idPrefix}-agent`}
            value={agentKey}
            onChange={(event) => {
              if (!isFeedbackAgentKey(event.target.value)) return;
              setAgentKey(event.target.value);
            }}
          >
            {FEEDBACK_AGENT_KEYS.map((item) => (
              <option key={item} value={item}>
                {FEEDBACK_AGENT_LABELS[item]}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : null}
      {targetType === 'run' ? (
        <FormField
          label="Run"
          htmlFor={`${idPrefix}-run`}
          hint="Tylko Twoje zakończone albo nieudane runy."
        >
          <NativeSelect
            id={`${idPrefix}-run`}
            value={runId}
            disabled={state.status !== 'ready'}
            onChange={(event) => {
              if (event.target.value === '') {
                setRunId('');
                return;
              }
              if (!isRunId(event.target.value)) return;
              setRunId(createRunId(event.target.value));
            }}
          >
            <option value="">Wybierz run</option>
            {reviewableRuns.map((item) => (
              <option key={item.runId} value={item.runId}>
                {RUN_TASK_TYPE_LABELS[item.taskType]} ({item.createdAt})
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : null}
      <FormField label="Treść opinii" htmlFor={`${idPrefix}-body`}>
        <Textarea
          id={`${idPrefix}-body`}
          value={body}
          maxLength={FEEDBACK_BODY_MAX}
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </FormField>
      {state.status === 'error' && targetType === 'run' ? (
        <EnvelopeError code={state.envelope.code} message={state.envelope.message} />
      ) : null}
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
      {saved ? <p className="text-xs text-muted-foreground">Zapisano opinię.</p> : null}
      <Button type="submit" disabled={pending || input === null}>
        Zapisz opinię
      </Button>
    </form>
  );
}
```

W opcji runu **nie** używaj ` · ` jeśli anti-tell przeszkadza: `{RUN_TASK_TYPE_LABELS[item.taskType]} ({item.createdAt})`. `runId` w native option value zostaje; etykieta bez brand-id na pierwszy plan.

`idPrefix` rozdziela `htmlFor` między modal a Konto (`feedback-global` / `feedback-account`).

#### Nowy plik — `apps/frontend/src/modules/feedback/components/feedback-cta.tsx`

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
import { FeedbackForm } from '@/modules/feedback/components/feedback-form';

export function FeedbackCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        Zostaw opinię
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="z-(--z-modal) sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Zostaw opinię</DialogTitle>
            <DialogDescription>
              Zapis dotyczy aplikacji, agenta albo Twojego zakończonego runu.
            </DialogDescription>
          </DialogHeader>
          <FeedbackForm idPrefix="feedback-global" />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

#### Refaktor — `chrome-slots.tsx`

**teraz:**

```ts
export function FeedbackCtaSlot() {
  return <div data-slot="feedback-cta" />;
}
```

**zamień na:**

```ts
import { FeedbackCta } from '@/modules/feedback/components/feedback-cta';

export function FeedbackCtaSlot() {
  return (
    <div data-slot="feedback-cta">
      <FeedbackCta />
    </div>
  );
}
```

**Nie:** `GET /runs` do selecta; lista opinii; drugi DS.

**DoD kroku:**

- Header ma CTA „Zostaw opinię”; dialog z trzema targetami; agent i run obowiązkowe gdy wybrane.
- Select runów = własne `completed` \| `failed` z providera Moich runów.
- Sukces 201: krótki komunikat, brak ekranu listy.
- CTA zostaje po dodaniu bloku na Koncie (KROK 3).

---

### KROK 3 — Konto: email i opinia

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 5.3 (5.3.1 email, 5.3.2 opinia). `SPEC-AUTH.md` A-3b. Nie zastępuje startu, Moich runów ani wylogowania w headerze.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/api/auth.api.ts`
- Nowy: `apps/frontend/src/modules/auth/components/account-email-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx`

#### Refaktor — `auth.api.ts`

Dopisz:

```ts
export async function patchOwnEmail(email: string): Promise<SessionUser> {
  const body = await apiFetch('/auth/me', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return parseSessionUser(body);
}
```

#### Nowy plik — `apps/frontend/src/modules/auth/components/account-email-form.tsx`

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { patchOwnEmail } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function AccountEmailForm() {
  const { state, setAuthenticated } = useSession();
  const current = state.status === 'authenticated' ? state.user.email : '';
  const [email, setEmail] = useState(current);
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  if (state.status !== 'authenticated') return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setEnvelope(null);
    setSaved(false);
    try {
      const user = await patchOwnEmail(email.trim());
      setAuthenticated(user);
      setEmail(user.email);
      setSaved(true);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-xl flex-col gap-3" onSubmit={(event) => void onSubmit(event)}>
      <FormField label="Email" htmlFor="account-email">
        <Input
          id="account-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormField>
      {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
      {saved ? <p className="text-xs text-muted-foreground">Zapisano adres email.</p> : null}
      <Button type="submit" disabled={pending || email.trim() === current}>
        Zapisz email
      </Button>
    </form>
  );
}
```

Header pokazuje `user.email` z sesji: po `setAuthenticated` login w headerze się zgadza z GET `/auth/me`.

#### Refaktor — `account-view.tsx`

**teraz** (szkielet return):

```tsx
    <div className="flex flex-col gap-10">
      <div className="flex max-w-xl flex-col gap-1">
        <h1 className="text-lg font-medium">Konto</h1>
        <p className="text-sm text-muted-foreground">Start runu i lista Twoich przebiegów.</p>
      </div>
      <StartRunForm draft={draft} onDraftChange={setDraft} />
      ...
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Moje runy</h2>
        <MyRunsList onPrefill={(runId) => void onPrefill(runId)} />
      </section>
    </div>
```

**zamień na:** kolejność bloków jak UX: **Email**, start, Moje runy, **Opinia**. Lead bez obietnicy tylko startu.

```tsx
    <div className="flex flex-col gap-10">
      <div className="flex max-w-xl flex-col gap-1">
        <h1 className="text-lg font-medium">Konto</h1>
        <p className="text-sm text-muted-foreground">
          Email, start runu, Twoje przebiegi i opinia.
        </p>
      </div>
      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Email</h2>
        <AccountEmailForm />
      </section>
      <StartRunForm draft={draft} onDraftChange={setDraft} />
      {prefillError ? (
        <EnvelopeError code={prefillError.code} message={prefillError.message} />
      ) : null}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Moje runy</h2>
        <MyRunsList onPrefill={(runId) => void onPrefill(runId)} />
      </section>
      <section className="flex max-w-xl flex-col gap-3">
        <h2 className="text-base font-medium">Opinia</h2>
        <FeedbackForm idPrefix="feedback-account" />
      </section>
    </div>
```

Importy: `AccountEmailForm`, `FeedbackForm`.

**Nie:** zmiana hasła; usuwanie konta; wylogowanie na Koncie; drugi listing Runy.

**DoD kroku:**

- `PATCH /auth/me` `{ email }`; 409 `CONFLICT` as-is; header pokazuje nowy adres.
- Opinia na Koncie = ten sam `FeedbackForm`; CTA headera zostaje.
- Sidebar Konto ≠ wylogowanie (header Fazy 1).

---

#### Propozycja commit message

```text
feat(frontend): close run review and record feedback plus email

Authors can rate, edit canonical result text, and finalize; operators save feedback and their own email without leaving the dashboard.
```

---

## Weryfikacja wycinka (ten plik)

- Kotwica major 5 / 5.1–5.3. Plik 3 (Użytkownicy) osobno.
- Zgodność UX + SPEC R-10 / Fbk / A-3b / F-8/F-9.
- Nowe pliki z kompletnym kodem; refaktory fragmentami. Edytor `reelScripts[]` = te same pola segmentu co skalar `reel_script` (`ReelScriptFields`).
- Nagłówki `FAZA` / `KROK`. Commit EN.
- Statusy `NIE_ROZPOCZĘTY`. Major nietknięty.
- Lock: Dialog jak wylogowanie; gwiazdki Iconify lucide; listy/formularze gęste; envelope as-is.

## Ślad do major (informacyjnie)

Po implementacji **tego** pliku: Faza 5, Kroki 5.1–5.3 → `WYKONANY`; MILESTONE 5 → `OSIĄGNIĘTY`. Faza 4 wg pliku 1. Faza 6 bez zmian. Ten skill **nie** edytuje majoru.
