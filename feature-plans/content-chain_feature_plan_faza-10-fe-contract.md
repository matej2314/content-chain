# Content Chain — feature plan: kontrakt api pod dashboard FE (Faza 10)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-10-fe-contract.md`  
**Kotwica major:** Faza 10 (cała) — kroki 10.1, 10.2, 10.3 w `content-chain-backend_major_plan.md`.  
**Refaktor względem:** Faza 6 / Krok 6.3 (`WYKONANY`) — `POST .../output-edited` tylko flaga; Faza 5 / Krok 5.1 (`WYKONANY`) — `GET /auth/me` bez mutacji emaila; Faza 3 / Krok 3.3 (`WYKONANY`) — `GET /runs` filtr `status` jako jeden enum.  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`, `docs/security.md`, `SPEC-RUNY.md` R-10 / R-3a, `SPEC-AUTH.md` A-3b, `SPEC-KOMUNIKACJA.md` K-2a / K-2b / K-2d, `SPEC-TESTY.md` D-12 / D-27 / D-28, major Faza 10.  
**Kolejność `KROK` w tym pliku = major 10.1 → 10.2 → 10.3** (pass rozwojowy: brak przesunięć między krokami).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 10 majoru backend: zapis edycji wyniku z `{ result }`, `PATCH /auth/me` (email), filtr `status` wielowartościowy na `GET /runs` |
| Major | Faza 10 / 10.1–10.3; start po Fazach 1–9 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 10 |
| Poza zakresem | Zmiana hasła zalogowanego; usuwanie własnego konta; panel odczytu opinii; limit per-user (V1); UI / BFF Next (major frontendowy); nowy endpoint SSE; re-invoke grafu przy edycji |
| Po implementacji (informacyjnie) | Major: Faza 10 i kroki 10.1–10.3 → `WYKONANY`. MILESTONE 5/6 bez zmian (`OSIĄGNIĘTY`). Brak `MILESTONE` 10. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 10.1 | KROK 1 | `POST .../output-edited` + `{ result }` → nadpis store + `outputEdited` |
| 10.2 | KROK 2 | `PATCH /auth/me` `{ email }` |
| 10.3 | KROK 3 | `GET /runs?status=completed,failed` (CSV / zbiór) |

**Pass rozwojowy (sesja planu):** brak przesunięć między KROK 1–3 (auth, wynik, listing niezależne). Wewnątrz KROK 1: schemy/`allowedKeys` → use-case (store + flaga) → HTTP → testy/Postman.

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Zod **4.4.x** w application (`parseWithZod`), class-validator / class-transformer na query DTO listingu (jak dziś).
- Pipeline / verifier / graf Social i Content **nie** startują przy zapisie edycji (`SPEC-RUNY.md` R-10).
- `PATCH /users/:id` nadal wyłącznie `{ isActive: true }` — bez `email` (`SPEC-AUTH.md` A-3b).
- Konflikt email: `User.email` zajęty w tym soft-deleted → **409** `CONFLICT`; porównanie **case-sensitive** jak zaproszenia (`findForAuth`).
- Ten sam email co bieżący użytkownik → **200** bez mutacji (idempotentny no-op; nie 409 na siebie).
- Filtr `status`: jeden enum **albo** CSV unikalnych `RunStatus`; powtórki = zbiór; brak parametru = wszystkie; nieznana wartość → **400** `VALIDATION_FAILED`.
- `pageSize=10`, sort `createdAt` desc — bez zmian.
- Zakaz `any` / `@ts-ignore`; dane zewnętrzne: `unknown` + Zod.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/colinhacks/zod/v4.0.1` (safeParse, `z.email` / formats). Wersja w projekcie: `apps/api` → `zod@^4.4.3`.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|------------------|
| Body HTTP | `safeParse` + issues → `VALIDATION_FAILED` | Istniejący `parseWithZod` |
| Email | Zod 4: top-level `z.email()`; legacy `z.string().email()` nadal OK | **`z.string().email()`** jak `InviteUserUseCase` (spójność regexa z auth) |
| `.strict()` | odrzuca nieznane klucze | Body `{ email }` i root `{ result }` ze `.strict()` |
| Query `status` | class-transformer `Transform` + class-validator (warstwa HTTP listingu) | Bez nowego Zod na query — spójnie z `ListRunsQueryDto` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Kontrakt api pod dashboard FE

Odpowiada major **Faza 10**. Jedna faza w tym zestawie.

---

### KROK 1 — Zapis edycji wyniku z treścią (`output-edited`)

**Status:** `WYKONANY`

**Cel:** `POST /api/v1/runs/:runId/output-edited` przyjmuje `{ result }`, zastępuje kanoniczny wynik w store Social/Content (bez grafu), stawia `outputEdited: true`. Major 10.1. `SPEC-RUNY.md` R-10, `SPEC-TESTY.md` D-12, `docs/dokumentacja_komunikacji.md`.

**Artefakty:**

- Nowy: `apps/api/src/runs/application/output-edited-result.schemas.ts`
- Nowy: `apps/api/src/runs/application/save-output-edited.use-case.ts` (zastępuje `flag-output-edited.use-case.ts`)
- Nowy: `apps/api/src/runs/application/save-output-edited.use-case.spec.ts` (zastępuje `flag-output-edited.use-case.spec.ts`)
- Zmiana: `apps/api/src/runs/runs.controller.ts`, `runs.module.ts`, `runs.controller.spec.ts`
- Usunięcie po migracji: `flag-output-edited.use-case.ts`, `flag-output-edited.use-case.spec.ts`
- Zmiana: `apps/api/test/postman/review.postman-collection.json` (R3 + body `{ result }`; asercja snapshotu treści)

#### Nowy plik — `output-edited-result.schemas.ts`

```typescript
import { z } from 'zod';
import type { RunTaskType } from '@content-chain/shared';
import {
  contentOutputSchema,
  reelIdeaSchema,
  reelScriptOutputSchema,
  socialIdeaSchema,
} from '../../social/application/social.schemas';
import {
  pageDocumentOutputSchema,
  pageOutlineOutputSchema,
} from '../../content/application/content.schemas';

/** Klucze addytywnego `result` dozwolone per `taskType` (docs / snapshot). */
export const RESULT_KEYS_BY_TASK_TYPE: Record<
  RunTaskType,
  ReadonlySet<string>
> = {
  post_ideas: new Set(['ideas']),
  post_content: new Set(['content']),
  post_ideas_then_content: new Set(['ideas', 'contents']),
  reel_ideas: new Set(['reelIdeas']),
  reel_script: new Set(['reelScript']),
  reel_ideas_then_scripts: new Set(['reelIdeas', 'reelScripts']),
  page_outline_then_copy: new Set(['pageOutline', 'pageDocument']),
};

const ideaPersistedSchema = socialIdeaSchema.extend({
  id: z.string().min(1),
});

const reelIdeaPersistedSchema = reelIdeaSchema.extend({
  id: z.string().min(1),
});

/** Body klienta: bez zaufania do `characterCount` — serwer ustawi z `body.length`. */
export const editedContentSchema = contentOutputSchema;

export const editedContentItemSchema = editedContentSchema.extend({
  sourceIdeaId: z.string().min(1),
});

export const editedReelScriptItemSchema = reelScriptOutputSchema.extend({
  sourceIdeaId: z.string().min(1),
});

const pageOutlineSectionPersistedSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  summary: z.string().min(1),
  role: z
    .enum([
      'audience_world',
      'pain',
      'challenger',
      'insight',
      'proof',
      'objection',
      'cta',
      'other',
    ])
    .optional(),
});

export const editedPageOutlineSchema = pageOutlineOutputSchema
  .omit({ sections: true })
  .extend({
    id: z.string().min(1),
    sections: z.array(pageOutlineSectionPersistedSchema).min(1),
  });

export const editedPageDocumentSchema = pageDocumentOutputSchema;

export const outputEditedBodySchema = z
  .object({
    result: z.record(z.string(), z.unknown()),
  })
  .strict();

export const ideasArraySchema = z.array(ideaPersistedSchema).min(1);
export const reelIdeasArraySchema = z.array(reelIdeaPersistedSchema).min(1);
export const contentsArraySchema = z.array(editedContentItemSchema).min(1);
export const reelScriptsArraySchema = z
  .array(editedReelScriptItemSchema)
  .min(1);
```

#### Nowy plik — `save-output-edited.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunId, RunTaskType } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../../social/domain/social-result.port';
import type {
  SocialContent,
  SocialContentItem,
  SocialIdea,
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  VerifierVerdict,
} from '../../social/domain/social.types';
import {
  CONTENT_RESULT_STORE,
  type ContentResultStore,
} from '../../content/domain/content-result.port';
import type {
  PageDocument,
  PageOutline,
} from '../../content/domain/content.types';
import { assertRunReviewable } from '../domain/assert-run-reviewable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import {
  RESULT_KEYS_BY_TASK_TYPE,
  contentsArraySchema,
  editedContentSchema,
  editedPageDocumentSchema,
  editedPageOutlineSchema,
  ideasArraySchema,
  outputEditedBodySchema,
  reelIdeasArraySchema,
  reelScriptsArraySchema,
} from './output-edited-result.schemas';
import { reelScriptOutputSchema as reelScriptShape } from '../../social/application/social.schemas';

const EMPTY_VERDICT: VerifierVerdict = {
  ok: true,
  contextIssues: [],
  languageIssues: [],
};

function validationFailed(message: string): never {
  throw new DomainException('VALIDATION_FAILED', message, 400);
}

function assertSameIds(
  stored: readonly string[],
  incoming: readonly string[],
  label: string,
): void {
  if (stored.length !== incoming.length) {
    validationFailed(`${label} cardinality must not change`);
  }
  const storedSet = new Set(stored);
  const incomingSet = new Set(incoming);
  if (storedSet.size !== stored.length || incomingSet.size !== incoming.length) {
    validationFailed(`${label} ids must be unique`);
  }
  for (const id of storedSet) {
    if (!incomingSet.has(id)) {
      validationFailed(`${label} ids must match stored result`);
    }
  }
}

function withCharacterCount(
  content: {
    body: string;
    hashtags: string[];
    cta?: string;
    sourceIdeaId?: string;
  },
): SocialContent {
  const next: SocialContent = {
    body: content.body,
    hashtags: content.hashtags,
    characterCount: content.body.length,
  };
  if (content.cta !== undefined) next.cta = content.cta;
  if (content.sourceIdeaId !== undefined) {
    next.sourceIdeaId = content.sourceIdeaId;
  }
  return next;
}

@Injectable()
export class SaveOutputEditedUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(SOCIAL_RESULT_STORE) private readonly social: SocialResultStore,
    @Inject(CONTENT_RESULT_STORE) private readonly content: ContentResultStore,
  ) {}

  async execute(
    runId: RunId,
    input: unknown,
    actor: AuthUserContext,
  ): Promise<{ runId: RunId; outputEdited: true }> {
    const body = parseWithZod(outputEditedBodySchema, input);
    const keys = Object.keys(body.result);
    if (keys.length === 0) {
      validationFailed('result must not be empty');
    }

    const run = await this.runs.getById(runId);
    assertRunReviewable(run, actor.id);

    const allowed = RESULT_KEYS_BY_TASK_TYPE[run.taskType];
    for (const key of keys) {
      if (!allowed.has(key)) {
        validationFailed(`result key "${key}" is not allowed for this taskType`);
      }
    }

    for (const key of keys) {
      await this.applyKey(run.id, run.taskType, key, body.result[key]);
    }

    const updated = await this.runs.saveOutputEdited(runId);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    return { runId: run.id, outputEdited: true };
  }

  private async applyKey(
    runId: RunId,
    taskType: RunTaskType,
    key: string,
    value: unknown,
  ): Promise<void> {
    switch (key) {
      case 'ideas': {
        const incoming = parseWithZod(ideasArraySchema, value);
        const stored = await this.social.listIdeas(runId);
        if (stored.length === 0) {
          validationFailed('no stored ideas to edit');
        }
        assertSameIds(
          stored.map((i) => i.id),
          incoming.map((i) => i.id),
          'ideas',
        );
        const byId = new Map(incoming.map((i) => [i.id, i]));
        const ordered: SocialIdea[] = stored.map((s) => {
          const next = byId.get(s.id);
          if (!next) validationFailed('ideas ids must match stored result');
          return {
            id: next.id,
            title: next.title,
            angle: next.angle,
            hook: next.hook,
            ...(next.cta !== undefined ? { cta: next.cta } : {}),
          };
        });
        await this.social.replaceIdeas(runId, ordered);
        return;
      }
      case 'reelIdeas': {
        const incoming = parseWithZod(reelIdeasArraySchema, value);
        const stored = await this.social.listReelIdeas(runId);
        if (stored.length === 0) {
          validationFailed('no stored reelIdeas to edit');
        }
        assertSameIds(
          stored.map((i) => i.id),
          incoming.map((i) => i.id),
          'reelIdeas',
        );
        const byId = new Map(incoming.map((i) => [i.id, i]));
        const ordered: ReelIdea[] = stored.map((s) => {
          const next = byId.get(s.id);
          if (!next) validationFailed('reelIdeas ids must match stored result');
          return {
            id: next.id,
            title: next.title,
            description: next.description,
            hook: next.hook,
            durationSeconds: next.durationSeconds,
            ...(next.cta !== undefined ? { cta: next.cta } : {}),
          };
        });
        await this.social.replaceReelIdeas(runId, ordered);
        return;
      }
      case 'content': {
        const parsed = parseWithZod(editedContentSchema, value);
        const stored = await this.social.getContent(runId);
        if (!stored) {
          validationFailed('no stored content to edit');
        }
        const next = withCharacterCount(parsed);
        await this.social.replaceContent(
          runId,
          next,
          stored.verification ?? EMPTY_VERDICT,
        );
        return;
      }
      case 'contents': {
        const incoming = parseWithZod(contentsArraySchema, value);
        const stored = await this.social.listContents(runId);
        if (stored.length === 0) {
          validationFailed('no stored contents to edit');
        }
        assertSameIds(
          stored.map((i) => i.sourceIdeaId),
          incoming.map((i) => i.sourceIdeaId),
          'contents.sourceIdeaId',
        );
        const bySource = new Map(
          incoming.map((i) => [i.sourceIdeaId, i] as const),
        );
        const verdictBySource = new Map<string, VerifierVerdict>();
        // verification per row not exposed on SocialContentItem — keep EMPTY if unknown
        for (const row of stored) {
          verdictBySource.set(row.sourceIdeaId, EMPTY_VERDICT);
        }
        await this.social.clearContents(runId);
        for (const row of stored) {
          const next = bySource.get(row.sourceIdeaId);
          if (!next) {
            validationFailed('contents sourceIdeaId must match stored result');
          }
          const item: SocialContentItem = {
            ...withCharacterCount({
              body: next.body,
              hashtags: next.hashtags,
              cta: next.cta,
              sourceIdeaId: next.sourceIdeaId,
            }),
            sourceIdeaId: next.sourceIdeaId,
          };
          await this.social.appendContent(
            runId,
            item,
            verdictBySource.get(row.sourceIdeaId) ?? EMPTY_VERDICT,
          );
        }
        return;
      }
      case 'reelScript': {
        const parsed = parseWithZod(reelScriptShape, value);
        const stored = await this.social.getReelScript(runId);
        if (!stored) {
          validationFailed('no stored reelScript to edit');
        }
        const next: ReelScript = {
          segments: parsed.segments,
          cta: parsed.cta,
          ...(parsed.notes !== undefined ? { notes: parsed.notes } : {}),
        };
        await this.social.replaceReelScript(
          runId,
          next,
          stored.verification ?? EMPTY_VERDICT,
        );
        return;
      }
      case 'reelScripts': {
        const incoming = parseWithZod(reelScriptsArraySchema, value);
        const stored = await this.social.listReelScripts(runId);
        if (stored.length === 0) {
          validationFailed('no stored reelScripts to edit');
        }
        assertSameIds(
          stored.map((i) => i.sourceIdeaId),
          incoming.map((i) => i.sourceIdeaId),
          'reelScripts.sourceIdeaId',
        );
        const bySource = new Map(
          incoming.map((i) => [i.sourceIdeaId, i] as const),
        );
        await this.social.clearReelScripts(runId);
        for (const row of stored) {
          const next = bySource.get(row.sourceIdeaId);
          if (!next) {
            validationFailed(
              'reelScripts sourceIdeaId must match stored result',
            );
          }
          const item: ReelScriptItem = {
            segments: next.segments,
            cta: next.cta,
            sourceIdeaId: next.sourceIdeaId,
            ...(next.notes !== undefined ? { notes: next.notes } : {}),
          };
          await this.social.appendReelScript(runId, item, EMPTY_VERDICT);
        }
        return;
      }
      case 'pageOutline': {
        const parsed = parseWithZod(editedPageOutlineSchema, value);
        const stored = await this.content.getOutline(runId);
        if (!stored) {
          validationFailed('no stored pageOutline to edit');
        }
        if (stored.id !== parsed.id) {
          validationFailed('pageOutline.id must not change');
        }
        assertSameIds(
          stored.sections.map((s) => s.id),
          parsed.sections.map((s) => s.id),
          'pageOutline.sections',
        );
        const byId = new Map(parsed.sections.map((s) => [s.id, s]));
        const outline: PageOutline = {
          id: stored.id,
          title: parsed.title,
          sections: stored.sections.map((s) => {
            const next = byId.get(s.id);
            if (!next) {
              validationFailed('pageOutline.sections ids must match');
            }
            return {
              id: next.id,
              heading: next.heading,
              summary: next.summary,
              ...(next.role !== undefined ? { role: next.role } : {}),
            };
          }),
        };
        await this.content.replaceOutline(runId, outline);
        return;
      }
      case 'pageDocument': {
        const parsed = parseWithZod(editedPageDocumentSchema, value);
        const stored = await this.content.getDocument(runId);
        if (!stored) {
          validationFailed('no stored pageDocument to edit');
        }
        const document: PageDocument = {
          title: parsed.title,
          lead: parsed.lead,
          body: parsed.body,
          ...(parsed.metaTitle !== undefined
            ? { metaTitle: parsed.metaTitle }
            : {}),
          ...(parsed.metaDescription !== undefined
            ? { metaDescription: parsed.metaDescription }
            : {}),
        };
        await this.content.replaceDocument(
          runId,
          document,
          stored.verification ?? EMPTY_VERDICT,
        );
        return;
      }
      default:
        validationFailed(`unsupported result key "${key}"`);
    }
  }
}
```

> **Nota:** `taskType` w `applyKey` jest dostępny pod dalsze twarde gałęzie; walidacja kluczy opiera się na `RESULT_KEYS_BY_TASK_TYPE`.

#### Refaktor — controller

Plik: `apps/api/src/runs/runs.controller.ts`

**Teraz:**

```typescript
import { FlagOutputEditedUseCase } from './application/flag-output-edited.use-case';
// ...
  @Post(':runId/output-edited')
  @HttpCode(200)
  async postOutputEdited(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.flagOutputEdited.execute(runId, user);
  }
```

**Zamień na:**

```typescript
import { SaveOutputEditedUseCase } from './application/save-output-edited.use-case';
// konstruktor: private readonly saveOutputEdited: SaveOutputEditedUseCase
// ...
  @Post(':runId/output-edited')
  @HttpCode(200)
  async postOutputEdited(
    @Param('runId', ParseRunIdPipe) runId: RunId,
    @Body() body: unknown,
    @CurrentUser() user: AuthUserContext,
  ) {
    return this.saveOutputEdited.execute(runId, body, user);
  }
```

#### Refaktor — module

Plik: `apps/api/src/runs/runs.module.ts`

**Teraz:** `FlagOutputEditedUseCase` w `providers`.

**Zamień na:** `SaveOutputEditedUseCase` w `providers` (import Social/Content już w `registerAsync` — DI `SOCIAL_RESULT_STORE` / `CONTENT_RESULT_STORE` dostępne).

#### Testy

**Unit** (`save-output-edited.use-case.spec.ts`) — kompletny szkielet przypadków:

```typescript
import { createUserId, type RunId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { SocialResultStore } from '../../social/domain/social-result.port';
import type { ContentResultStore } from '../../content/domain/content-result.port';
import { makeSocialRun } from '../run-record.test-helpers';
import { SaveOutputEditedUseCase } from './save-output-edited.use-case';

const ACTOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

function unusedRuns(overrides: Partial<RunRepository> = {}): RunRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    create: unexpected,
    getById: unexpected,
    saveStatus: unexpected,
    saveRecoveryAttempt: unexpected,
    claimNextQueued: unexpected,
    claimNextInterrupted: unexpected,
    findInterruptedRunning: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    saveSelectedIdeaIds: unexpected,
    listByUser: unexpected,
    saveRating: unexpected,
    saveOutputEdited: unexpected,
    saveFinalizedAt: unexpected,
    ...overrides,
  };
}

function unusedSocial(
  overrides: Partial<SocialResultStore> = {},
): SocialResultStore {
  const unexpected = async () => {
    throw new Error('unexpected social store call');
  };
  return {
    replaceIdeas: unexpected,
    replaceReelIdeas: unexpected,
    listIdeas: unexpected,
    listReelIdeas: unexpected,
    replaceContent: unexpected,
    replaceReelScript: unexpected,
    clearContents: unexpected,
    appendContent: unexpected,
    listContents: unexpected,
    clearReelScripts: unexpected,
    appendReelScript: unexpected,
    listReelScripts: unexpected,
    getContent: unexpected,
    getReelScript: unexpected,
    savePipelineState: unexpected,
    getPipelineState: unexpected,
    ...overrides,
  };
}

function unusedContent(
  overrides: Partial<ContentResultStore> = {},
): ContentResultStore {
  const unexpected = async () => {
    throw new Error('unexpected content store call');
  };
  return {
    replaceOutline: unexpected,
    replaceDocument: unexpected,
    getOutline: unexpected,
    getDocument: unexpected,
    savePipelineState: unexpected,
    getPipelineState: unexpected,
    ...overrides,
  };
}

function snapshot(overrides: Partial<RunSnapshot> = {}): RunSnapshot {
  return {
    ...makeSocialRun({
      status: 'completed',
      startedByUserId: ACTOR.id,
      taskType: 'post_content',
    }),
    startedBy: { id: ACTOR.id, email: ACTOR.email },
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    ...overrides,
  };
}

describe('SaveOutputEditedUseCase', () => {
  it('replaces content, sets characterCount from body.length, flags outputEdited', async () => {
    const run = snapshot();
    const replaceContent = jest.fn(async () => undefined);
    const saveOutputEdited = jest.fn(async (_id: RunId) => true);
    const useCase = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => run,
        saveOutputEdited,
      }),
      unusedSocial({
        getContent: async () => ({
          content: {
            body: 'stary',
            hashtags: [],
            characterCount: 5,
          },
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
        replaceContent,
      }),
      unusedContent(),
    );

    await expect(
      useCase.execute(
        run.id,
        { result: { content: { body: 'nowy tekst', hashtags: ['#a'] } } },
        ACTOR,
      ),
    ).resolves.toEqual({ runId: run.id, outputEdited: true });

    expect(replaceContent).toHaveBeenCalledWith(
      run.id,
      {
        body: 'nowy tekst',
        hashtags: ['#a'],
        characterCount: 'nowy tekst'.length,
      },
      expect.objectContaining({ ok: true }),
    );
    expect(saveOutputEdited).toHaveBeenCalledWith(run.id);
  });

  it('rejects empty result, foreign keys, and sourceIdeaId cardinality changes', async () => {
    const run = snapshot({ taskType: 'post_ideas_then_content' });
    const useCase = new SaveOutputEditedUseCase(
      unusedRuns({ getById: async () => run }),
      unusedSocial({
        listContents: async () => [
          {
            body: 'a',
            hashtags: [],
            characterCount: 1,
            sourceIdeaId: 'idea_1',
          },
        ],
      }),
      unusedContent(),
    );

    await expect(
      useCase.execute(run.id, { result: {} }, ACTOR),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    await expect(
      useCase.execute(
        run.id,
        { result: { pageDocument: { title: 'x' } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    await expect(
      useCase.execute(
        run.id,
        {
          result: {
            contents: [
              { body: 'a', hashtags: [], sourceIdeaId: 'idea_1' },
              { body: 'b', hashtags: [], sourceIdeaId: 'idea_2' },
            ],
          },
        },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('maps saveOutputEdited false to REVIEW_LOCKED and skips store when not reviewable', async () => {
    const locked = snapshot();
    const saveOutputEdited = jest.fn(async () => false);
    const replaceContent = jest.fn(async () => undefined);
    const lockedUc = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => locked,
        saveOutputEdited,
      }),
      unusedSocial({
        getContent: async () => ({
          content: { body: 'x', hashtags: [], characterCount: 1 },
          verification: null,
        }),
        replaceContent,
      }),
      unusedContent(),
    );
    await expect(
      lockedUc.execute(
        locked.id,
        { result: { content: { body: 'y', hashtags: [] } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'REVIEW_LOCKED' });

    const queued = snapshot({ status: 'queued' });
    const queuedUc = new SaveOutputEditedUseCase(
      unusedRuns({ getById: async () => queued }),
      unusedSocial(),
      unusedContent(),
    );
    await expect(
      queuedUc.execute(
        queued.id,
        { result: { content: { body: 'y', hashtags: [] } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'RUN_NOT_REVIEWABLE' });
  });
});
```

**Postman:** w `review.postman-collection.json` request **R3** — body raw JSON z `{ "result": { "ideas": [… te same id co fixture] } }` (albo `content` zgodny z typem fixture `completedRunId`); po R3 asercja GET snapshot: treść = body klienta **oraz** `outputEdited: true`. R5b/R6b nadal bez wymogu treści przy 409 (body może być minimalne poprawne albo puste — przy 409 authz/status parse body i tak może paść wcześniej: **wysyłaj poprawny kształt**, żeby kod błędu pozostał `REVIEW_LOCKED` / `RUN_NOT_REVIEWABLE`).

#### Biblioteki / API

Zod 4 + `parseWithZod`; porty `SocialResultStore` / `ContentResultStore` (replace/clear/append) — **nie** fasady pipeline.

#### DoD (krok)

- Body z `result` obowiązkowe; puste / obcy klucz / zmiana id lub kardynalności → **400** `VALIDATION_FAILED`.
- GET snapshot po zapisie zwraca treść użytkownika; `outputEdited: true`; `characterCount === body.length` dla content/contents.
- Graf / executor nie wołany (unit: brak calli poza store + `saveOutputEdited`).
- Te same **403** / **409** `REVIEW_LOCKED` / `RUN_NOT_REVIEWABLE` co ocena.
- D-12 / Postman R3 przechodzą z nadpisem treści.

#### Dopisek — lock `saveOutputEdited` przed `applyKey` (F-01)

**Status:** `NIE_ROZPOCZĘTY`

Refaktor względem: FAZA 1 / KROK 1 szkic `SaveOutputEditedUseCase.execute` (`applyKey` → potem `saveOutputEdited`) oraz trzeci case w `save-output-edited.use-case.spec.ts`. Cel: jak `RateRunUseCase` i `SPEC-RUNY.md` R-10 — optymistyczny lock flagi **zanim** nadpis store, żeby `REVIEW_LOCKED` nie zostawiał już zastąpionego wyniku. Dodatkowo szkic `RESULT_KEYS_BY_TASK_TYPE` uzupełniony o `page_copy` (komplet `RunTaskType`).

Plik: `apps/api/src/runs/application/output-edited-result.schemas.ts`

**Teraz** (szkic KROK 1): brak `page_copy` w mapie.

**Zamień na** (dopisek w `RESULT_KEYS_BY_TASK_TYPE`):

```typescript
  page_outline_then_copy: new Set(['pageOutline', 'pageDocument']),
  page_copy: new Set(['pageDocument']),
```

Plik: `apps/api/src/runs/application/save-output-edited.use-case.ts` — `execute` po walidacji kluczy.

**Teraz:**

```typescript
    for (const key of keys) {
      await this.applyKey(run.id, run.taskType, key, body.result[key]);
    }

    const updated = await this.runs.saveOutputEdited(runId);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    return { runId: run.id, outputEdited: true };
```

**Zamień na:**

```typescript
    const updated = await this.runs.saveOutputEdited(runId);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    for (const key of keys) {
      await this.applyKey(run.id, run.taskType, key, body.result[key]);
    }

    return { runId: run.id, outputEdited: true };
```

Plik: `apps/api/src/runs/application/save-output-edited.use-case.spec.ts`

- Happy path: `saveOutputEdited` wołane **przed** `replaceContent` (`invocationCallOrder`).
- Puste `result` / obcy klucz: `saveOutputEdited` **nie** wołane (odrzut przed lockiem).
- Zmiana kardynalności: klucze legalne → lock `true`, potem `applyKey` → `VALIDATION_FAILED` (mock `saveOutputEdited` musi zwracać `true`).
- `saveOutputEdited === false`: `REVIEW_LOCKED`, store **nie** wołany (`unusedSocial()` bez stubów `getContent` / `replaceContent`).

**Teraz** (fragment locka ze szkicu KROK 1):

```typescript
    const replaceContent = jest.fn(async () => undefined);
    const lockedUc = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => locked,
        saveOutputEdited,
      }),
      unusedSocial({
        getContent: async () => ({
          content: { body: 'x', hashtags: [], characterCount: 1 },
          verification: null,
        }),
        replaceContent,
      }),
      unusedContent(),
    );
```

**Zamień na:**

```typescript
    const lockedUc = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => locked,
        saveOutputEdited,
      }),
      unusedSocial(),
      unusedContent(),
    );
    // po execute: expect(saveOutputEdited).toHaveBeenCalledWith(locked.id)
    // unusedSocial() rzuca, gdy applyKey dotknie store
```

DoD (dopisek): `REVIEW_LOCKED` z `saveOutputEdited === false` **bez** mutacji Social/Content store; flaga ustawiana przed `applyKey`.

#### Dopisek — atomowy replace tablic `contents` / `reelScripts` (F-02)

**Status:** `NIE_ROZPOCZĘTY`

Refaktor względem: FAZA 1 / KROK 1 szkic `applyKey` gałęzi `contents` / `reelScripts` (`clear*` + pętla `append*`) oraz port `SocialResultStore` (tylko clear/append dla tablic). Cel: jedna mutacja w `$transaction` jak `replaceIdeas` / `replaceContent` — błąd w środku pętli nie zostawia pustej tablicy. `clearContents` / `appendContent` (i analog reel) **zostają** dla pipeline Social.

Plik: `apps/api/src/social/domain/social-result.port.ts`

**Teraz:** brak `replaceContents` / `replaceReelScripts`.

**Dopisz** (obok `replaceContent` / `replaceReelScript`):

```typescript
  replaceContents(
    runId: RunId,
    items: readonly SocialContentItem[],
    verification: VerifierVerdict,
  ): Promise<void>;
  replaceReelScripts(
    runId: RunId,
    items: readonly ReelScriptItem[],
    verification: VerifierVerdict,
  ): Promise<void>;
```

Plik: `apps/api/src/social/infrastructure/persistence/prisma-social-result.adapter.ts`

**Zamień na** (wzorzec `replaceIdeas`: `deleteMany` + `createMany` w `$transaction`; `id` jak przy `append*` — `sct_` / `srs_` + uuid):

```typescript
  async replaceContents(
    runId: RunId,
    items: readonly SocialContentItem[],
    verification: VerifierVerdict,
  ): Promise<void> {
    const verificationJson = toInputJson(verification);
    await this.prisma.$transaction([
      this.prisma.socialContent.deleteMany({ where: { runId } }),
      this.prisma.socialContent.createMany({
        data: items.map((item) => ({
          id: `sct_${uuidv4()}`,
          runId,
          payload: toInputJson(item),
          verification: verificationJson,
        })),
      }),
    ]);
  }
```

Analogicznie `replaceReelScripts` na `socialReelScript`.

Plik: `apps/api/src/runs/application/save-output-edited.use-case.ts` — `applyKey`.

**Teraz:**

```typescript
        await this.social.clearContents(runId);
        for (const row of stored) {
          // ... map item ...
          await this.social.appendContent(runId, item, EMPTY_VERDICT);
        }
```

**Zamień na:**

```typescript
        const ordered: SocialContentItem[] = stored.map((row) => {
          const next = bySource.get(row.sourceIdeaId);
          if (!next) {
            validationFailed('contents sourceIdeaId must match stored result');
          }
          return {
            ...withCharacterCount({
              body: next.body,
              hashtags: next.hashtags,
              cta: next.cta,
              sourceIdeaId: next.sourceIdeaId,
            }),
            sourceIdeaId: next.sourceIdeaId,
          };
        });
        await this.social.replaceContents(runId, ordered, EMPTY_VERDICT);
```

Gałąź `reelScripts`: `replaceReelScripts(runId, ordered, EMPTY_VERDICT)` zamiast `clearReelScripts` + pętli `appendReelScript`.

Unit: `save-output-edited.use-case.spec.ts` — `replaceContents` wołane **raz** (kolejność = store, nie body klienta); mocki `SocialResultStore` dopisują `replaceContents` / `replaceReelScripts`.

DoD (dopisek): edycja `contents` / `reelScripts` to jedna operacja portu w transakcji adaptera; pipeline nadal może `clear`+`append`.

#### Dopisek — port `OutputEditedWriter` (plan + jeden `commit`) (F-01 / F-02)

**Status:** `NIE_ROZPOCZĘTY`

Refaktor względem: FAZA 1 / KROK 1 szkic `execute` (`applyKey` mutuje store, potem `runs.saveOutputEdited`); dopisek F-01 (`saveOutputEdited` przed `applyKey` — flaga bez wspólnej transakcji ze store; `VALIDATION_FAILED` po locku); dopisek F-02 (`replaceContents` / `replaceReelScripts` na `SocialResultStore` — atomowa tablica, nadal osobny round-trip od flagi). Cel: walidacja treści **przed** lockiem (F-01) **oraz** flaga `outputEdited` + replace artefaktów w **jednej** `prisma.$transaction` pod `reviewFinalizedAt IS NULL` (F-02 / `SPEC-RUNY.md` R-10: brak zmiany treści po finalize). `SocialResultStore.replaceContents` / `replaceReelScripts` i `clear`+`append` **zostają** dla pipeline; ścieżka Edytuj nie woła ich przy zapisie.

Kolejność plików (kontrakt → persist → DI → application → testy use-case):

1. Nowy: `apps/api/src/runs/domain/output-edited-writer.port.ts`
2. Nowy: `apps/api/src/runs/infrastructure/prisma-output-edited.adapter.ts`
3. Nowy: `apps/api/src/runs/infrastructure/prisma-output-edited.adapter.spec.ts`
4. Zmiana: `apps/api/src/runs/run-lifecycle.module.ts` (provider + export tokenu)
5. Zmiana: `apps/api/src/runs/application/save-output-edited.use-case.ts` (`planKey` + `writer.commit`; store tylko odczyt)
6. Zmiana: `apps/api/src/runs/application/save-output-edited.use-case.spec.ts` (mock writera; `saveOutputEdited` na repo **nie** wołane z tego use-case)

Plik 1 — `output-edited-writer.port.ts`

```typescript
export const OUTPUT_EDITED_WRITER = Symbol('OUTPUT_EDITED_WRITER');

export type OutputEditedWrite =
  | { readonly kind: 'ideas'; readonly ideas: readonly SocialIdea[] }
  | { readonly kind: 'reelIdeas'; readonly ideas: readonly ReelIdea[] }
  | {
      readonly kind: 'content';
      readonly content: SocialContent;
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'contents';
      readonly items: readonly SocialContentItem[];
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'reelScript';
      readonly script: ReelScript;
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'reelScripts';
      readonly items: readonly ReelScriptItem[];
      readonly verification: SocialVerifierVerdict;
    }
  | { readonly kind: 'pageOutline'; readonly outline: PageOutline }
  | {
      readonly kind: 'pageDocument';
      readonly document: PageDocument;
      readonly verification: ContentVerifierVerdict;
    };

export interface OutputEditedWriter {
  commit(runId: RunId, writes: readonly OutputEditedWrite[]): Promise<boolean>;
}
```

`commit` → `true` gdy `updateMany` Run (`reviewFinalizedAt: null`, `outputEdited: true`) ma `count === 1` i replace’e na `tx` przeszły; `false` gdy przegląd już zamknięty — **bez** delete/create artefaktów (return z callbacka, bez throw — pusta zmiana się commituje).

Plik 2 — `prisma-output-edited.adapter.ts`: `PrismaOutputEditedAdapter` implementuje port. Interaktywne `$transaction`: najpierw lock flagi, potem `applyWrite(tx, …)` per `kind` (`deleteMany` + `create` / `createMany`; id wierszy `sct_` / `srs_` / `cdoc_` + `uuidv4` jak w adapterach Social/Content). `switch` zupełny (`never` w `default`).

Plik 3 — spec adaptera: `count === 0` → `false` i brak `socialContent.deleteMany`/`create`; `count === 1` → flaga **przed** replace (`invocationCallOrder`).

Plik 4 — `run-lifecycle.module.ts`

**Teraz:** tylko `RUN_REPOSITORY` → `PrismaRunAdapter`.

**Zamień na:** dodatkowo `{ provide: OUTPUT_EDITED_WRITER, useClass: PrismaOutputEditedAdapter }` w `providers` **oraz** `OUTPUT_EDITED_WRITER` w `exports` (obok `RUN_REPOSITORY`). `RunsModule` już importuje `RunLifecycleModule` — bez drugiego bindu w `runs.module.ts`.

Plik 5 — `save-output-edited.use-case.ts`

Konstruktor: `runs` + `social` + `content` + `@Inject(OUTPUT_EDITED_WRITER) writer`. Odczyt store (`list*` / `get*`) zostaje; mutacje `replace*` / `clear*` / `append*` z tego use-case **wychodzą**.

**Teraz** (po dopisku F-01): `saveOutputEdited` → pętla `applyKey` (zapis w store).

**Zamień na:**

```typescript
    const writes: OutputEditedWrite[] = [];
    for (const key of keys) {
      writes.push(await this.planKey(run.id, key, body.result[key]));
    }

    const updated = await this.writer.commit(run.id, writes);
    if (!updated) {
      throw new DomainException(
        'REVIEW_LOCKED',
        'Review is already finalized',
        409,
      );
    }

    return { runId: run.id, outputEdited: true };
```

`planKey` = dotychczasowe gałęzie `applyKey` do parse / `assertSameIds` / „no stored *” i zwraca `OutputEditedWrite` (bez I/O zapisu). Puste `result` i obcy klucz nadal **przed** `planKey` / `commit`. `RunRepository.saveOutputEdited` zostaje na porcie (inne użycia) — ten use-case go **nie** woła.

Plik 6 — spec use-case: czwarty argument `unusedWriter({ commit })`. Happy path: `commit` raz z `{ kind: 'content', content: { … characterCount: body.length } }`. `contents`: jeden `commit`, kolejność `items` = store. Puste / obcy klucz / kardynalność: `commit` **nie** wołane. `commit === false` po `getContent`: `REVIEW_LOCKED`. `queued`: `commit` nie wołane.

DoD (dopisek): `VALIDATION_FAILED` bez `commit` (flaga nie wstaje); `REVIEW_LOCKED` = `commit === false` bez mutacji artefaktów; happy path = jeden `commit` (flaga + store w tej samej transakcji adaptera).

---

### KROK 2 — Zmiana własnego emaila (`PATCH /auth/me`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Zalogowany (admin i `user`) zmienia własny email. Major 10.2. `SPEC-AUTH.md` A-3b, `SPEC-TESTY.md` D-27, `docs/dokumentacja_komunikacji.md`, `docs/security.md`.

**Artefakty:**

- Nowy: `apps/api/src/auth/application/update-me-email.use-case.ts`
- Nowy: `apps/api/src/auth/application/update-me-email.use-case.spec.ts`
- Zmiana: `apps/api/src/auth/domain/user-repository.port.ts`
- Zmiana: `apps/api/src/auth/infrastructure/prisma-user.adapter.ts`
- Zmiana: `apps/api/src/auth/auth.controller.ts`, `auth.module.ts`
- Regresja: `apps/api/src/auth/application/reactivate-user.use-case.spec.ts` / e2e auth — `PATCH /users/:id` z `email` nadal **400**

#### Refaktor — port

Plik: `apps/api/src/auth/domain/user-repository.port.ts`

**Teraz:** brak mutacji email.

**Dopisz do `UserRepository`:**

```typescript
  updateEmail(id: UserId, email: string): Promise<AuthUser>;
```

#### Refaktor — adapter

Plik: `apps/api/src/auth/infrastructure/prisma-user.adapter.ts`

**Dopisz:**

```typescript
  async updateEmail(id: UserId, email: string): Promise<AuthUser> {
    try {
      const row = await this.prisma.user.update({
        where: { id },
        data: { email },
      });
      return this.toUser(row);
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new DomainException('CONFLICT', 'Email already in use', 409);
      }
      throw error;
    }
  }
```

#### Nowy plik — `update-me-email.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';

const updateMeEmailSchema = z
  .object({
    email: z.string().email(),
  })
  .strict();

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<Pick<AuthUserContext, 'id' | 'email' | 'role'>> {
    const command = parseWithZod(updateMeEmailSchema, input);

    const current = await this.users.findById(context.id);
    if (!current || !current.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    if (current.email === command.email) {
      return {
        id: current.id,
        email: current.email,
        role: current.role,
      };
    }

    const occupied = await this.users.findForAuth(command.email);
    if (occupied) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const updated = await this.users.updateEmail(current.id, command.email);
    return {
      id: updated.id,
      email: updated.email,
      role: updated.role,
    };
  }
}
```

#### Refaktor — `auth.controller.ts`

**Teraz:** tylko `GET me`.

**Zamień / dopisz** (importy `Patch`, `HttpCode`, use-case):

```typescript
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Get('me')
  async getMe(@CurrentUser() user: AuthUserContext) {
    return this.me.execute(user);
  }

  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Patch('me')
  @HttpCode(200)
  async patchMe(
    @CurrentUser() user: AuthUserContext,
    @Body() body: unknown,
  ) {
    return this.updateMeEmail.execute(user, body);
  }
```

Zarejestruj `UpdateMeEmailUseCase` w `auth.module.ts` `providers`.

#### Nowy plik — test unit

```typescript
import { createUserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type { UserRepository } from '../domain/user-repository.port';
import { UpdateMeEmailUseCase } from './update-me-email.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');

function user(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: ID,
    email: 'me@example.com',
    role: 'user',
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

function unusedUsers(overrides: Partial<UserRepository> = {}): UserRepository {
  const unexpected = async () => {
    throw new Error('unexpected');
  };
  return {
    findForAuth: unexpected,
    findById: unexpected,
    findAdminCount: unexpected,
    create: unexpected,
    createAdminIfNone: unexpected,
    setActive: unexpected,
    list: unexpected,
    updateEmail: unexpected,
    ...overrides,
  };
}

describe('UpdateMeEmailUseCase', () => {
  it('updates own email and returns { id, email, role }', async () => {
    const updateEmail = jest.fn(async () =>
      user({ email: 'next@example.com' }),
    );
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        findForAuth: async () => null,
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'next@example.com',
      role: 'user',
    });
    expect(updateEmail).toHaveBeenCalledWith(ID, 'next@example.com');
  });

  it('returns 200 no-op when email unchanged; 409 when occupied; 400 on bad shape', async () => {
    const updateEmail = jest.fn(async () => user());
    const same = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        updateEmail,
      }),
    );
    await expect(
      same.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'me@example.com' },
      ),
    ).resolves.toEqual({ id: ID, email: 'me@example.com', role: 'user' });
    expect(updateEmail).not.toHaveBeenCalled();

    const conflict = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        findForAuth: async () =>
          user({
            id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
            email: 'taken@example.com',
          }),
      }),
    );
    await expect(
      conflict.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });

    const bad = new UpdateMeEmailUseCase(
      unusedUsers({ findById: async () => user() }),
    );
    await expect(
      bad.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'not-an-email', role: 'admin' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });
});
```

> Wszystkie mocki `UserRepository` w innych `*.spec.ts` auth **dopisują** `updateEmail: unexpected` (jak po rozszerzeniu portu).

#### DoD (krok)

- Sesja: **200** `{ id, email, role }` z nowym emailem; kolejny `GET /auth/me` zgadza się.
- Kolizja (w tym soft-deleted przez `findForAuth`) → **409**; zły kształt / extra keys → **400**; brak sesji → **401**.
- `PATCH /users/:id` z `email` nadal **400** (`PatchUserDto` bez zmian).
- Case D-27 przechodzi.

---

### KROK 3 — Filtr `status` wielowartościowy na `GET /runs`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Query `status` = jeden `RunStatus` **albo** CSV unikalnych wartości. Major 10.3. `SPEC-RUNY.md` R-3a, `SPEC-KOMUNIKACJA.md` K-2a, `SPEC-TESTY.md` D-28, `docs/ux_dashboard.md` (archiwum `completed,failed`).

**Artefakty:**

- Zmiana: `apps/api/src/runs/domain/run.port.ts` (`ListRunsQuery.status`)
- Zmiana: `apps/api/src/runs/http/dto/list-runs-query.dto.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts`
- Zmiana: `apps/api/test/runs-list.e2e-spec.ts` (D-28)

#### Refaktor — port

Plik: `apps/api/src/runs/domain/run.port.ts`

**Teraz:**

```typescript
export type ListRunsQuery = {
  page: number;
  status?: RunStatus;
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};
```

**Zamień na:**

```typescript
export type ListRunsQuery = {
  page: number;
  /** Znormalizowany zbiór statusów (1…n). Brak / pusta = bez filtra. */
  status?: RunStatus[];
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};
```

#### Refaktor — DTO

Plik: `apps/api/src/runs/http/dto/list-runs-query.dto.ts`

**Teraz:** `@IsIn([...RUN_STATUSES]) status?: …` (skalar).

**Zamień na:**

```typescript
import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  RUN_PLATFORMS,
  RUN_STATUSES,
  RUN_TASK_TYPES,
  type RunStatus,
} from '@content-chain/shared';

function parseStatusQuery(value: unknown): RunStatus[] | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value as RunStatus[];
  }
  if (typeof value !== 'string') {
    return value as RunStatus[];
  }
  const parts = value
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return [...new Set(parts)] as RunStatus[];
}

export class ListRunsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseStatusQuery(value))
  @IsArray()
  @ArrayUnique()
  @IsIn([...RUN_STATUSES], { each: true })
  status?: RunStatus[];

  @IsOptional()
  @IsIn([...RUN_TASK_TYPES])
  taskType?: (typeof RUN_TASK_TYPES)[number];

  @IsOptional()
  @IsIn([...RUN_PLATFORMS])
  platform?: (typeof RUN_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  userId?: string;
}
```

> Nieznana wartość w CSV → class-validator `@IsIn` → **400** (envelope projektu mapuje na `VALIDATION_FAILED` jak pozostałe DTO).

#### Refaktor — Prisma adapter

Plik: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` metoda `list`

**Teraz:**

```typescript
    const where = {
      ...(query.status ? { status: query.status } : {}),
```

**Zamień na:**

```typescript
    const where = {
      ...(query.status && query.status.length > 0
        ? { status: { in: query.status } }
        : {}),
```

#### Refaktor — controller spec

`runs.controller.spec.ts` — oczekiwanie `status: 'completed'` → `status: ['completed']` (po Transform w realnym HTTP; w teście unitowym kontrolera przekaż już tablicę z DTO).

#### Testy e2e (D-28)

Dopisz w `apps/api/test/runs-list.e2e-spec.ts`:

```typescript
  it('D-28: filters status=completed,failed; single interrupted; rejects unknown', async () => {
    // Arrange: co najmniej jeden completed, jeden failed, jeden nieterminalny (jak istniejące setupy pliku)
    const mixed = await agent.get('/api/v1/runs').query({
      status: 'completed,failed',
    });
    expect(mixed.status).toBe(200);
    const mixedBody = readListBody(mixed.body);
    expect(mixedBody.pageSize).toBe(10);
    expect(
      mixedBody.items.every(
        (item) => item.status === 'completed' || item.status === 'failed',
      ),
    ).toBe(true);
    // createdAt desc — gdy ≥2 itemy:
    for (let i = 1; i < mixedBody.items.length; i += 1) {
      expect(
        Date.parse(mixedBody.items[i - 1]!.createdAt),
      ).toBeGreaterThanOrEqual(Date.parse(mixedBody.items[i]!.createdAt));
    }

    const single = await agent.get('/api/v1/runs').query({
      status: 'interrupted',
    });
    expect(single.status).toBe(200);
    const singleBody = readListBody(single.body);
    expect(singleBody.items.every((item) => item.status === 'interrupted')).toBe(
      true,
    );

    const bad = await agent.get('/api/v1/runs').query({
      status: 'completed,nope',
    });
    expect(bad.status).toBe(400);
    // envelope: code VALIDATION_FAILED — zgodnie z HttpExceptionFilter projektu
  });
```

Istniejący case `status=completed` / `status=interrupted` — bez regresji (DTO przyjmuje jeden token → tablica 1-el.).

#### DoD (krok)

- `status=completed,failed` → wyłącznie te statusy, najnowsze pierwsze, `pageSize=10`.
- `status=interrupted` (pojedynczy) bez regresji.
- Brak `status` → pełna instancja.
- Zła wartość w liście → **400** `VALIDATION_FAILED`.
- Case D-28 przechodzi.

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Pokrycie kotwicy 10.1–10.3 | Trzy `KROK` powyżej |
| Docs / SPEC | R-10, A-3b, R-3a, D-12/27/28 — bez re-invoke grafu; bez email na `PATCH /users/:id` |
| Regresja Fazy 3–6 | Listing bez `status`, ocena, finalize, sesja login/me |
| Kompletny kod nowych plików | schemy + `SaveOutputEditedUseCase` + `UpdateMeEmailUseCase` + testy |
| Refaktory | fragmenty `teraz → zamień na` |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Major nietknięty | tak |
| Sekrety | brak |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 10 | `WYKONANY` |
| Krok 10.1 | `WYKONANY` |
| Krok 10.2 | `WYKONANY` |
| Krok 10.3 | `WYKONANY` |
| MILESTONE 5 / 6 | bez zmian (`OSIĄGNIĘTY`) |
| MILESTONE 10 | **nie tworzyć** / nie oznaczać |

Edycja pliku major — **poza** tą sesją (ręcznie lub w `/feature-implementation` na życzenie).
