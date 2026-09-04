# Content Chain — feature plan: rozszerzenie kontraktu MVP (Faza 4.3)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-4-3-mvp-contract.md`  
**Kotwica major:** Faza 4.3 (kroki 4.3.1–4.3.5) + ślad **MILESTONE 4.3**.  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/data_flow.md` §4 / §4c / §4e, `docs/brand_types.md`, `SPEC-KONTEKST-FIRMY.md`, `SPEC-SOCIAL.md` (S-6, S-7b), `SPEC-CONTENT.md` (Ctn-3), `SPEC-RUNY.md` (R-3f, R-3g), `SPEC-KOMUNIKACJA.md` (K-8, K-9), `SPEC-TESTY.md` (D-20…D-22), `content-chain-backend_major_plan.md` Faza 4.3.  
**Założenie wejścia:** Faza 4.2 / Milestone 4.2 `WYKONANY` / `OSIĄGNIĘTY`; docs+SPEC kontraktu 4.3 już zsynchronizowane (gate KROK 1).  
**Kolejność `KROK` ≠ etykietom major 4.3.1–4.3.5 1:1** — pass rozwojowy: major 4.3.3 rozbity na **KROK 3** (schema/persist) → **KROK 4** (HITL 1 id).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Typowane `extras`, HITL SM dokładnie 1 id, `cta?` na pomysłach, `characterCount` na post content, opcjonalne `role` na sekcjach outline |
| Major | Faza 4.3 / 4.3.1–4.3.5; start po Milestone 4.2; MILESTONE 4.3 po DoD fazy |
| Poza zakresem | Faza 5 (auth), Faza 6 (feedback / `userRating`), Faza 9 (Zod 4), UI frontendu, załączniki, N→N, WP, łańcuch 6 audytorów, zmiana semantyki Fazy 4 / 4.1 / 4.2 poza dopiskiem kontraktu |
| Po implementacji (informacyjnie) | Major: Faza 4.3 i 4.3.1–4.3.5 → `WYKONANY`; MILESTONE 4.3 → `OSIĄGNIĘTY`. Edycja major **poza** tym skillem |

---

## Założenia

- Zod **3** (`apps/api` `^3.25.76`). `packages/shared` bez Zod. Bez migracji Prisma (kolumna `extras Json?` już jest; payloady Social/Content = Json).
- Walidacja `extras`: **application Zod `.strict()`** → `VALIDATION_FAILED` (jak `parseWithZod` w Runs). DTO class-validator zostaje cienką bramką Nest (`@IsObject()`); **nie** polegać na DTO jako jedynym kontrakcie extras.
- HITL Social: kod **`HITL_INVALID_SELECTION`** (400), status zostaje `awaiting_hitl`. **Nie** zaostrzać `hitlSelectedIdeaIdsSchema` do `.length(1)` — to dałoby `VALIDATION_FAILED` zamiast kanonu docs. Schema: `z.array(z.string())` (dopuszcza `[]`); egzekucja długości + członkostwa w `ResumeHitlUseCase`.
- `characterCount`: integer ≥ 0; **kanon** = `body.length` po sukcesie writer/refine; wartość z LLM **nie** jest źródłem prawdy (nie dodawać wymaganego pola do `contentOutputSchema`). Ustawić przy budowie `SocialContent` w writer/refine **oraz** twarde nadpisanie w Persist; przy odczycie starego JSON bez klucza → mapper `body.length` (`SPEC-RUNY.md` R-3g).
- `cta?` na `SocialIdea` / `ReelIdea`: opcjonalne; refine zachowuje gdy model zwróci. HITL page bez zmian (`[outline.id]`).
- `PageOutlineSection.role?`: enum zamknięty; nieznana wartość → fail parse; brak `role` = OK.
- Auth pre-Faza 5: e2e / Postman jak dotychczas (bez sesji).
- Tsconfig bez zmian. Brak `any` na granicach.

---

## Biblioteki / API

Weryfikacja 2026-09-04. Context7 Zod `/colinhacks/zod/v3.24.2` (API zgodne z `^3.25.76` w projekcie):

- `z.object({…}).strict()` — nieznane klucze → `ZodError` przy `parse` / `safeParse`.
- `.nullable()` / `.nullish()` dla `extras: null | omit`.
- `z.enum([...])` dla `role` i dyskryminacji katalogu.

Źródło: Context7 query `z.object .strict() reject unknown keys optional nullable nested arrays`. Przy konflikcie ze SPEC → wygrywa SPEC.

---

## FAZA 1 — Rozszerzenie kontraktu MVP (pre-auth)

Odpowiada major **Faza 4.3**. Jedna faza w tym pliku. Po DoD — ślad **MILESTONE 4.3**.

---

### KROK 1 — Gate: checklista docs/SPEC (major 4.3.1)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Potwierdzić, że kontrakt A–D jest spójny między komunikacją a SPEC — **bez** implementacji kodu. Major 4.3.1; `update-mvp-contract-plan.md` może nie istnieć na dysku — źródłem jest bieżący zestaw docs/SPEC.

**Artefakty:** brak zmian w repo (wyłącznie weryfikacja).

**Checklista (A–D):**

| Id | Pole / reguła | docs | SPEC |
|----|---------------|------|------|
| A | `CompanyContextExtras` + Zod `.strict()`; poza `isComplete` | `dokumentacja_komunikacji.md`, `dictionary.md` | `SPEC-KONTEKST-FIRMY` C-1…C-8 |
| B | HITL SM `length === 1` → inaczej `HITL_INVALID_SELECTION` | komunikacja HITL, `data_flow` §4/§4c | `SPEC-SOCIAL` S-6, `SPEC-RUNY` R-3f |
| C | `ideas[].cta?`, `reelIdeas[].cta?`, `content.characterCount` | komunikacja result, dictionary | `SPEC-SOCIAL` S-7b, `SPEC-RUNY` R-3g |
| D | `pageOutline.sections[].role?` enum | `data_flow` §4e, dictionary | `SPEC-CONTENT` Ctn-3 |

**DoD kroku:**

- Cztery wiersze A–D potwierdzone lokalnie (treść zgodna; brak sprzeczności uniemożliwiającej KROK 2–6).
- Zero commitów wymaganych wyłącznie dla tego kroku.

---

### KROK 2 — Company Context: `CompanyContextExtras` + Zod + PUT/PATCH

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Typowany kształt `extras`, walidacja Zod przy zapisie, round-trip, completeness bez regresji. Major 4.3.2; `SPEC-KONTEKST-FIRMY`; `SPEC-TESTY` D-20.

**Artefakty:**

- Nowy: `apps/api/src/company-context/application/company-context.schemas.ts`
- Nowy: `apps/api/src/company-context/application/company-context.schemas.spec.ts`
- Nowy: `apps/api/src/company-context/application/parse-company-context-extras.ts` (cienki wrapper jak Runs `parseWithZod` **albo** reuse istniejącego `runs/application/parse-with-zod` przez import z `shared` — **preferuj** wyniesienie / lokalną kopię w company-context **bez** importu company-context → runs; najprościej: lokalny `parseWithZod` w `company-context/application/parse-with-zod.ts` skopiowany 1:1 z Runs **albo** wspólny helper w `apps/api/src/shared/validation/parse-with-zod.ts` jeśli już istnieje ścieżka shared — **w tym wycinku:** nowy plik lokalny w company-context, identyczny kontrakt `VALIDATION_FAILED`, żeby nie otwierać refaktoru Runs).
- Zmiana: `company-context.types.ts`, `company-context.mapper.ts`, controller (parse przed use-case), ewent. DTO komentarz Swagger.
- Testy: unit schema; e2e `company-context.e2e-spec.ts` — nieznany klucz → 400; round-trip znanego kształtu.

**Kolejność:** typy → schema → parse w controller/mapper → unit → e2e.

#### Nowy plik — `apps/api/src/company-context/application/parse-with-zod.ts`

```typescript
import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';

export function parseWithZod<T extends z.ZodTypeAny>(
  schema: T,
  input: unknown,
): z.output<T> {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  throw new DomainException(
    'VALIDATION_FAILED',
    'Application command validation failed',
    400,
    result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  );
}
```

#### Nowy plik — `apps/api/src/company-context/application/company-context.schemas.ts`

```typescript
import { z } from 'zod';

export const companyContextCaseStudySchema = z
  .object({
    title: z.string().min(1),
    summary: z.string().min(1),
    metrics: z.array(z.string()).optional(),
  })
  .strict();

export const companyContextObjectionSchema = z
  .object({
    label: z.string().min(1),
    response: z.string().min(1),
  })
  .strict();

export const companyContextExtrasSchema = z
  .object({
    caseStudies: z.array(companyContextCaseStudySchema).optional(),
    objections: z.array(companyContextObjectionSchema).optional(),
    hashtags: z.array(z.string()).optional(),
    catalogNotes: z.string().optional(),
    performanceNotes: z.string().optional(),
  })
  .strict();

export const companyContextExtrasInputSchema =
  companyContextExtrasSchema.nullable();

export type CompanyContextExtrasParsed = z.infer<
  typeof companyContextExtrasSchema
>;
```

#### Nowy plik — `apps/api/src/company-context/application/company-context.schemas.spec.ts`

```typescript
import { companyContextExtrasInputSchema } from './company-context.schemas';

describe('companyContextExtrasInputSchema', () => {
  it('accepts known shape', () => {
    const out = companyContextExtrasInputSchema.parse({
      caseStudies: [
        { title: 'Acme', summary: 'Wynik', metrics: ['+20%'] },
      ],
      objections: [{ label: 'Cena', response: 'ROI w 3 mies.' }],
      hashtags: ['#acme'],
      catalogNotes: 'Pakiet Pro',
      performanceNotes: 'LI > IG',
    });
    expect(out?.caseStudies?.[0]?.title).toBe('Acme');
  });

  it('accepts null', () => {
    expect(companyContextExtrasInputSchema.parse(null)).toBeNull();
  });

  it('rejects unknown key', () => {
    const result = companyContextExtrasInputSchema.safeParse({
      hashtags: ['#x'],
      unknownBag: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects unknown key inside case study', () => {
    const result = companyContextExtrasInputSchema.safeParse({
      caseStudies: [{ title: 'A', summary: 'B', extra: 1 }],
    });
    expect(result.success).toBe(false);
  });
});
```

#### Refaktor — typy domain

Plik: `apps/api/src/company-context/domain/company-context.types.ts`

**Teraz:**

```typescript
export type CompanyContextExtras = Record<string, unknown>;
```

**Zamień na:**

```typescript
export type CompanyContextCaseStudy = {
  title: string;
  summary: string;
  metrics?: string[];
};

export type CompanyContextObjection = {
  label: string;
  response: string;
};

export type CompanyContextExtras = {
  caseStudies?: CompanyContextCaseStudy[];
  objections?: CompanyContextObjection[];
  hashtags?: string[];
  catalogNotes?: string;
  performanceNotes?: string;
};
```

#### Refaktor — mapper + controller (parse extras)

Plik: `apps/api/src/company-context/application/company-context.mapper.ts`

**Teraz (fragment):**

```typescript
    extras: dto.extras ?? null,
```

**Zamień na:** (parse w mapperze — jedno miejsce dla PUT)

```typescript
import { parseWithZod } from './parse-with-zod';
import { companyContextExtrasInputSchema } from './company-context.schemas';
// ...
    extras:
      dto.extras === undefined
        ? null
        : parseWithZod(companyContextExtrasInputSchema, dto.extras),
```

Dla PATCH — gdy `dto.extras !== undefined`:

```typescript
...(dto.extras !== undefined
  ? {
      extras: parseWithZod(companyContextExtrasInputSchema, dto.extras),
    }
  : {}),
```

`isComplete` — **bez zmian** (już ignoruje extras). Spec D-20: dopisać asercję unit schema (powyżej) + e2e unknown key.

**DoD kroku:**

- PUT/PATCH ze znanym `extras` → 200 + round-trip GET.
- Nieznany klucz w `extras` → 400 `VALIDATION_FAILED`.
- `isComplete` / completeness bez zmiany werdyktu przy obecności `extras`.
- Unit schema zielony.

---

### KROK 3 — Social: `cta?` na ideas/reelIdeas, `characterCount`, Zod, prompty, Persist/mapper

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Addytywne pola wyniku SM zgodnie z S-7b / R-3g / komunikacją. Część major 4.3.3 (bez HITL — to KROK 4).

**Artefakty:**

- Zmiana: `social.types.ts`, `social.schemas.ts` (+ spec), `ideation.node.ts`, `refine-ideas.node.ts`, `content-writer.node.ts`, `refine-content.node.ts`, `persist-content.node.ts` (+ spec), `prisma-social-result.adapter.ts`
- Prompty: `ideation.prompt.md`, `refine-ideas.prompt.md`, `reel-ideas.prompt.md`, `refine-reel-ideas.prompt.md` (opcjonalne `cta` w JSON out)
- Testy: schema unit; persist ustawia `characterCount`; adapter odczytu uzupełnia brakujący klucz

#### Refaktor — domain

Plik: `apps/api/src/social/domain/social.types.ts`

**Teraz:**

```typescript
export type SocialIdea = {
  id: string;
  title: string;
  angle: string;
  hook: string;
};

export type SocialContent = {
  body: string;
  hashtags: string[];
  cta?: string;
};

export type ReelIdea = {
  id: string;
  title: string;
  description: string;
  hook: string;
  durationSeconds: ReelDurationSeconds;
};
```

**Zamień na:**

```typescript
export type SocialIdea = {
  id: string;
  title: string;
  angle: string;
  hook: string;
  cta?: string;
};

export type SocialContent = {
  body: string;
  hashtags: string[];
  cta?: string;
  characterCount: number;
};

export type ReelIdea = {
  id: string;
  title: string;
  description: string;
  hook: string;
  durationSeconds: ReelDurationSeconds;
  cta?: string;
};
```

#### Refaktor — Zod LLM schemas

Plik: `apps/api/src/social/application/social.schemas.ts`

**Teraz:**

```typescript
export const socialIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  angle: z.string().min(1),
  hook: z.string().min(1),
});
```

**Zamień na:**

```typescript
export const socialIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  angle: z.string().min(1),
  hook: z.string().min(1),
  cta: z.string().min(1).optional(),
});
```

Analogicznie `reelIdeaSchema` + `cta: z.string().min(1).optional()`.

`contentOutputSchema` — **bez** `characterCount` (LLM nie jest źródłem). Dodać unit: parse content OK bez `characterCount`.

#### Refaktor — ideation / refine-ideas (mapowanie `cta`)

Plik: `apps/api/src/social/infrastructure/graph/nodes/ideation.node.ts`

**Teraz:**

```typescript
    const ideas: SocialIdea[] = data.ideas.map((idea) => ({
      id: idea.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
    }));
```

**Zamień na:**

```typescript
    const ideas: SocialIdea[] = data.ideas.map((idea) => ({
      id: idea.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
      ...(idea.cta !== undefined ? { cta: idea.cta } : {}),
    }));
```

To samo dla `reelIdeas` map w ideation + refine-ideas (reel i post).

#### Refaktor — content-writer / refine-content

**Teraz:**

```typescript
    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      cta: data.cta,
    };
```

**Zamień na:**

```typescript
    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      cta: data.cta,
      characterCount: data.body.length,
    };
```

(Identycznie w `refine-content.node.ts`.)

#### Refaktor — persist-content (twarde nadpisanie)

Plik: `apps/api/src/social/infrastructure/graph/nodes/persist-content.node.ts`

**Teraz:**

```typescript
    await store.replaceContent(state.runId, state.content, state.verdict);
```

**Zamień na:**

```typescript
    const content: SocialContent = {
      ...state.content,
      characterCount: state.content.body.length,
    };
    await store.replaceContent(state.runId, content, state.verdict);
```

(+ import typu `SocialContent`). Spec persist: expect `characterCount === body.length` nawet gdy state miał inną wartość.

#### Refaktor — odczyt adaptera (stary JSON)

Plik: `apps/api/src/social/infrastructure/persistence/prisma-social-result.adapter.ts` — `getContent`

**Teraz:**

```typescript
      content: row.payload as SocialContent,
```

**Zamień na:**

```typescript
      content: mapStoredSocialContent(row.payload),
```

#### Nowy helper w tym samym pliku (lub `social/infrastructure/persistence/map-stored-social-content.ts`):

```typescript
export function mapStoredSocialContent(payload: unknown): SocialContent {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    throw new Error('Invalid SocialContent payload');
  }
  const record = payload as Record<string, unknown>;
  const body = record.body;
  if (typeof body !== 'string') {
    throw new Error('Invalid SocialContent.body');
  }
  const hashtags = Array.isArray(record.hashtags)
    ? record.hashtags.filter((item): item is string => typeof item === 'string')
    : [];
  const cta = typeof record.cta === 'string' ? record.cta : undefined;
  const characterCount =
    typeof record.characterCount === 'number' &&
    Number.isFinite(record.characterCount) &&
    record.characterCount >= 0
      ? Math.trunc(record.characterCount)
      : body.length;
  return {
    body,
    hashtags,
    ...(cta !== undefined ? { cta } : {}),
    characterCount,
  };
}
```

(Zakaz `any`; `unknown` + zawężenie.)

#### Prompty — fragment JSON out

`ideation.prompt.md` / `refine-ideas.prompt.md` — zamień linię przykładu JSON na:

```text
{"ideas":[{"title":"...","angle":"...","hook":"...","cta":"..."}]}
```

Dopisek: pole `cta` opcjonalne — krótka fraza akcji zgodna z `cta.items[].label`; pomiń klucz gdy brak sensu.

`reel-ideas.prompt.md` / `refine-reel-ideas.prompt.md` — analogicznie opcjonalne `cta` w elemencie tablicy (obok `durationSeconds`).

**DoD kroku:**

- Unit: schema ideas z/bez `cta`; content LLM bez `characterCount` OK.
- Persist + getContent: `characterCount === body.length`; stary payload bez klucza → uzupełniony.
- Kompilacja miejsc budujących `SocialContent` (writer/refine/testy fake) — wszystkie ustawiają `characterCount`.

---

### KROK 4 — Runs/Social: HITL dokładnie 1 id + `HITL_INVALID_SELECTION`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Social dwuetapowy jak Content — dokładnie jeden id ∈ draftu / options. Major 4.3.3 (HITL); `SPEC-RUNY` R-3f; `SPEC-SOCIAL` S-6; D-21.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/run.schemas.ts` (`hitlSelectedIdeaIdsSchema`)
- Zmiana: `apps/api/src/runs/application/resume-hitl.use-case.ts`
- Zmiana: `apps/api/src/runs/application/resume-hitl.use-case.spec.ts`
- E2e: `social-pipeline.e2e-spec.ts` (0 id, 2 id → 400; 1 poprawny → completed) — może wejść też w KROK 6; **unit w tym kroku obowiązkowy**

#### Refaktor — schema HITL

Plik: `apps/api/src/runs/application/run.schemas.ts`

**Teraz (typowe):**

```typescript
export const hitlSelectedIdeaIdsSchema = z.array(z.string()).min(1);
```

**Zamień na:**

```typescript
/** Długość i członkostwo egzekwuje ResumeHitlUseCase → HITL_INVALID_SELECTION. */
export const hitlSelectedIdeaIdsSchema = z.array(z.string());
```

#### Refaktor — `ResumeHitlUseCase`

Plik: `apps/api/src/runs/application/resume-hitl.use-case.ts`

Po sprawdzeniu `awaiting_hitl`, **przed** `saveSelectedIdeaIds`, dopisz gałąź Social (obok istniejącej page):

**Zamień blok po walidacji statusu na logikę:**

```typescript
    if (run.taskType === 'page_outline_then_copy') {
      const outline = await this.results.getPageOutline(run.id);
      if (outline == null) {
        throw new DomainException('CONFLICT', 'Page outline is missing', 409);
      }
      const valid =
        parsedSelectedIdeaIds.length === 1 &&
        parsedSelectedIdeaIds[0] === outline.id;
      if (!valid) {
        throw new DomainException(
          'HITL_INVALID_SELECTION',
          'selectedIdeaIds must be exactly [outline.id]',
          400,
        );
      }
    } else if (
      run.taskType === 'post_ideas_then_content' ||
      run.taskType === 'reel_ideas_then_scripts'
    ) {
      const draftIds =
        run.taskType === 'reel_ideas_then_scripts'
          ? (await this.results.listReelIdeas(run.id)).map((idea) => idea.id)
          : (await this.results.listIdeas(run.id)).map((idea) => idea.id);
      const selectedId = parsedSelectedIdeaIds[0];
      const valid =
        parsedSelectedIdeaIds.length === 1 &&
        selectedId !== undefined &&
        draftIds.includes(selectedId);
      if (!valid) {
        throw new DomainException(
          'HITL_INVALID_SELECTION',
          'selectedIdeaIds must contain exactly one id from hitl draft',
          400,
        );
      }
    }
```

Istniejący test „resumes social HITL without reading a page outline” → rozszerz o `listIdeas` zwracające `[{ id: 'idea_1', … }]`. Nowe testy: `[]`, `['a','b']`, id spoza draftu → `HITL_INVALID_SELECTION`, bez `saveSelectedIdeaIds`.

**DoD kroku:**

- Unit: 0 / 2+ / obcy id → 400 `HITL_INVALID_SELECTION`; 1 poprawny → `running` + notify.
- Page HITL bez regresji.

---

### KROK 5 — Content: `PageOutlineSection.role` + Zod + prompty

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Opcjonalne `role` na sekcjach outline; regresja bez `role` zielona. Major 4.3.4; `SPEC-CONTENT` Ctn-3; D-22 (część role).

**Artefakty:**

- Zmiana: `content.types.ts`, `content.schemas.ts` (+ spec), `outline.node.ts`, `refine-outline.node.ts`
- Prompty: `page-outline.prompt.md`, `refine-page-outline.prompt.md`, `page-writer.prompt.md` (respektuj `role` gdy obecne)
- Persistence: addytywne JSON — bez migracji; mapowanie w outline node zachowuje `role`

#### Refaktor — domain

Plik: `apps/api/src/content/domain/content.types.ts`

**Teraz:**

```typescript
export type PageOutlineSection = {
  id: string;
  heading: string;
  summary: string;
};
```

**Zamień na:**

```typescript
export type PageOutlineSectionRole =
  | 'audience_world'
  | 'pain'
  | 'challenger'
  | 'insight'
  | 'proof'
  | 'objection'
  | 'cta'
  | 'other';

export type PageOutlineSection = {
  id: string;
  heading: string;
  summary: string;
  role?: PageOutlineSectionRole;
};
```

#### Refaktor — Zod

Plik: `apps/api/src/content/application/content.schemas.ts`

**Teraz:**

```typescript
export const pageOutlineSectionSchema = z.object({
  id: z.string().min(1).optional(),
  heading: z.string().min(1),
  summary: z.string().min(1),
});
```

**Zamień na:**

```typescript
export const pageOutlineSectionRoleSchema = z.enum([
  'audience_world',
  'pain',
  'challenger',
  'insight',
  'proof',
  'objection',
  'cta',
  'other',
]);

export const pageOutlineSectionSchema = z.object({
  id: z.string().min(1).optional(),
  heading: z.string().min(1),
  summary: z.string().min(1),
  role: pageOutlineSectionRoleSchema.optional(),
});
```

Unit: znany `role` OK; nieznany → fail; brak `role` OK.

#### Refaktor — outline / refine-outline map

**Teraz:**

```typescript
      sections: data.sections.map((section) => ({
        id: section.id ?? `osec_${uuidv4()}`,
        heading: section.heading,
        summary: section.summary,
      })),
```

**Zamień na:**

```typescript
      sections: data.sections.map((section) => ({
        id: section.id ?? `osec_${uuidv4()}`,
        heading: section.heading,
        summary: section.summary,
        ...(section.role !== undefined ? { role: section.role } : {}),
      })),
```

#### Prompty

`page-outline.prompt.md` / `refine-page-outline.prompt.md` — dopisz katalog `role` (opcjonalny) i przykład:

```text
{"title":"...","sections":[{"heading":"...","summary":"...","role":"pain"}]}
```

Nie wymagać wszystkich ról w każdym outline.

`page-writer.prompt.md` — gdy sekcja ma `role`, trzymaj funkcję narracyjną sekcji; brak `role` → domyśl z `contentKind` jak dziś.

**DoD kroku:**

- Outline z `role` przechodzi parse + HITL page bez zmian kontraktu id.
- Outline bez `role` — regresja zielona (unit + istniejące e2e Content).
- Nieznany `role` → fail Zod.

---

### KROK 6 — e2e / Postman regresja + dokumentacja testów (major 4.3.5)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Domknięcie DoD fazy i Milestone 4.3 od strony dowodu. D-20…D-22; Social A–D + Content A–B; nowe case’y.

**Artefakty:**

- `apps/api/test/company-context.e2e-spec.ts` — extras round-trip + unknown key 400
- `apps/api/test/social-pipeline.e2e-spec.ts` — HITL 0/2 id; assert `characterCount === body.length`; opcjonalnie `cta` gdy fake LLM zwróci
- `apps/api/test/content-pipeline.e2e-spec.ts` — outline z `role` (fake LLM) przechodzi; bez `role` regresja
- `apps/api/test/fake-llm-gateway.ts` — odpowiedzi z opcjonalnym `cta` / `role` (bez `characterCount` z LLM)
- Postman: `social-pipeline.postman-collection.json`, `content-pipeline.postman-collection.json`, `README.md` — foldery/negatywne HITL + asercje wyniku; Setup może dodać poprawne `extras` (bez wpływu na completeness)
- Nota w planie / README: D-20…D-22 pokryte (bez edycji `SPEC-TESTY.md` w tej sesji feature — SPEC już ma normy; implementacja testów = ten krok)

**Szkic asercji e2e Social HITL negatyw:**

```typescript
await expect(
  api.post(`/runs/${runId}/hitl`).send({ selectedIdeaIds: [] }),
).resolves.toMatchObject({ status: 400, body: { code: 'HITL_INVALID_SELECTION' } });
// status runu nadal awaiting_hitl
```

(Dostosuj do faktycznego envelope `DomainException` / filtra w projekcie — jak istniejące Content HITL invalid.)

**DoD kroku:**

- Social A–D + Content A–B zielone (Jest e2e + opis Postman).
- Nowe case’y: extras, HITL 1 id (negatyw/pozytyw), `characterCount`, `role` — opisane w Postman README.
- D-20…D-22 pokryte warstwą adekwatną (unit i/lub e2e).

---

## Weryfikacja wycinka

| Kryterium | Źródło |
|-----------|--------|
| PUT/PATCH extras kształt + unknown → 400; `isComplete` ignoruje extras | major 4.3 DoD; SPEC-KONTEKST-FIRMY |
| HITL post/reel ≠1 id → 400 `HITL_INVALID_SELECTION`; 1 id → content/script | SPEC-RUNY R-3f; SPEC-SOCIAL S-6 |
| Snapshot: `cta?`, `characterCount`, `role?` | SPEC-RUNY R-3g; komunikacja |
| Unit + e2e + Postman | SPEC-TESTY D-20…D-22; major 4.3.5 |
| Bez auth / bez Fazy 5–6–9 | major poza zakresem |
| Nagłówki wyłącznie `FAZA` / `KROK` | konwencja feature planu |
| Pass rozwojowy: 4.3.3 = KROK 3→4 | ten dokument |

---

## Ślad do major (informacyjnie — po implementacji)

| Element major | Po implementacji DoD |
|---------------|----------------------|
| Krok 4.3.1 … 4.3.5 | `WYKONANY` |
| Faza 4.3 | `WYKONANY` |
| MILESTONE 4.3 | `OSIĄGNIĘTY` |
| Milestone 4 / 4.2 | bez edycji (`OSIĄGNIĘTY`) |
| Faza 5 | pozostaje `NIE_ROZPOCZĘTY` (odblokowana kolejnością) |

Edycja pliku major **poza** tym skillem / poza sesją tworzenia feature planu.

---

## Pass rozwojowy (zapisany)

- Major 4.3.3 rozbity: **schema/persist/prompty (KROK 3) przed HITL (KROK 4)** — HITL i e2e GET potrzebują typów `cta` / `characterCount` oraz draftów z readera.
- Brak przenosin między fazami major.
- Kolejność feature `KROK` ≠ numeracji major 4.3.x 1:1 (tylko ten split).
