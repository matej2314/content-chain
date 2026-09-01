# Content Chain — feature plan: dopełnienie Social (rolki)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-4-1-rolki.md`  
**Kotwica major:** Faza 4.1 (kroki 4.1.1–4.1.4). MILESTONE 4.2 — dopiero po pliku Content (`faza-4-2-content.md`).  
**Źródła:** `docs/data_flow.md` §4b–4c, `docs/dokumentacja_komunikacji.md`, `docs/brand_types.md`, `docs/testy.md`, `SPEC-SOCIAL.md` (S-7 / S-7a / S-7b / S-7c), `SPEC-RUNY.md` (R-3f), `SPEC-PERSISTENCE.md` (P-7), `SPEC-TESTY.md` (D-15, D-16, regresja D-4…D-8).  
**Kolejność `KROK` w tym pliku ≠ etykietom major 4.1.1–4.1.4** — pass rozwojowy: shared → domain/porty → Prisma → Zod/prompty → węzły/graf/fasada → executor → HTTP → testy/Postman.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Major Faza 4.1 — trzy taski `reel_*` w istniejącym BC Social |
| Major | Faza 4.1 / 4.1.1–4.1.4; start po Fazie 4 (`WYKONANY`) i Milestone 4 (`OSIĄGNIĘTY`) |
| Poza zakresem | `apps/api/src/content/`, `page_*`, `ContentKind`, `RunPlatform` / `'web'`, composite executor, Faza 5 (auth), Faza 6 (`PageWriterAgent` w shared), Faza 9 (Zod 4), checkpointer LangGraph, YouTube, `LanguageQualityVerifier`, osobny Postman dla `reel_script` solo |
| Po implementacji (informacyjnie) | Major: Faza 4.1 i kroki 4.1.1–4.1.4 → `WYKONANY`. MILESTONE 4.2 **nie** w tym pliku. Edycja major **poza** tym skillem |

---

## Założenia

- Ten sam skompilowany graf LangGraph, model B, verifier `max N=2`, worker, SSE. HTTP nadal Runs. **Bez** drugiego `SocialRunExecutor`.
- `PipelinePhase` zostaje `'ideas' \| 'content'`. Dla rolek `'content'` **znaczy** fazę scenariusza (`SPEC-SOCIAL.md` S-7a).
- Snapshot HTTP **addytywny**: posty `result.ideas` / `result.content` bez zmian semantyki Milestone 4; rolki dokładają `result.reelIdeas` / `result.reelScript`. Scenariusza **nie** wpychamy w `SocialContent`.
- Id pomysłu rolki: `idea_<uuid>` — bez nowego brandu w shared.
- `ReelDurationSeconds` = `15 \| 30 \| 90` (unia liczb, nie brand).
- Katalog `FeedbackAgentKey` **bez** nowych kluczy w tym wycinku.
- Zod **3** (`apps/api` `zod@^3.25.76`). Tsconfig **bez zmian**. `packages/shared` bez Zod.
- `resolvePhase`: analogia 1:1 do **żywego** kodu Fazy 4 (nie do szkicu major 4.4 z `storedPhase` na pierwszej linii). `post_content` / `reel_script` oraz HITL + niepuste `selectedIdeaIds` wymuszają `'content'` **przed** `storedPhase`. `storedPhase` zostaje fallbackiem, gdy taskType nie wymusza fazy. **Nie** przestawiamy kolejności gałęzi `post_*` — istniejący test `post_content even when stored phase is ideas` musi zostać zielony.
- Rozszerzenie `RUN_TASK_TYPES` od KROK 1 otwiera `z.enum` / DTO na `reel_*`. KROK 1–6 muszą być na miejscu zanim odpalimy e2e/Postman.
- Nest: `SocialModule` bez `controllers[]`; `RunsModule` bez importu Social; klej `RUN_EXECUTOR` bez zmian w tym pliku (nadal `SocialRunExecutor`).
- Fake LLM w CI; żywy gateway tylko Postman (poza PR), jak Milestone 4.

---

## Biblioteki / API

Weryfikacja 2026-09-01. Context7: Zod `/colinhacks/zod/v3.24.2` — `z.literal(15)`, `z.union([…])`. W projekcie Zod 3.25.x; semantyka union/literal bez zmian. LangGraph: ten sam wzorzec co Faza 4 (`new StateGraph(z.object)`, `compile()` bez checkpoinetera). Prisma 6 + SQLite: `createMany` OK, `skipDuplicates` nie; SQL migracji = wynik `prisma migrate dev` (P-1 / P-7). SPEC wygrywa ze wzorcem LangGraph HITL.

---

## FAZA 1 — Dopełnienie Social: rolki

Odpowiada major **Faza 4.1**. Jedna faza w tym pliku.

---

### KROK 1 — Shared: `reel_*` w `RunTaskType`

**Status:** `WYKONANY`

**Cel:** Kontrakt enumów MVP przyjmuje trzy taski rolek. Bez `page_*`. Major 4.1.1 (shared); `docs/brand_types.md`; `SPEC-SOCIAL.md` (taski MVP).

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`

**Kolejność:** wyłącznie ten plik.

#### Refaktor — `teraz` → `zamień na`

Plik: `packages/shared/src/branded/enums.ts`.

**Teraz:**

```typescript
export type RunTaskType = 'post_ideas' | 'post_content' | 'post_ideas_then_content';
```

```typescript
export const RUN_TASK_TYPES = [
  'post_ideas',
  'post_content',
  'post_ideas_then_content',
] as const satisfies readonly RunTaskType[];
```

**Zamień na:**

```typescript
export type RunTaskType =
  | 'post_ideas'
  | 'post_content'
  | 'post_ideas_then_content'
  | 'reel_ideas'
  | 'reel_script'
  | 'reel_ideas_then_scripts';
```

```typescript
export const RUN_TASK_TYPES = [
  'post_ideas',
  'post_content',
  'post_ideas_then_content',
  'reel_ideas',
  'reel_script',
  'reel_ideas_then_scripts',
] as const satisfies readonly RunTaskType[];
```

`isRunTaskType` bez zmian sygnatury — czyta `RUN_TASK_TYPES`. `SocialPlatform` **bez** `'web'`. Eksport `packages/shared/src/index.ts` już re-eksportuje `enums.ts`.

**Biblioteki:** brak nowego API.

**Testy:** brak osobnego speca shared (repo nie ma `packages/shared/**/*.spec.ts`). Pokrycie: KROK 7 Zod startu + KROK 8 e2e.

**DoD (krok):**

- `RunTaskType` / `RUN_TASK_TYPES` zawierają dokładnie trzy `reel_*` i dotychczasowe trzy `post_*`.
- Brak `page_*`, `ContentKind`, `RunPlatform`.
- `isRunTaskType('reel_ideas') === true`; `isRunTaskType('page_copy') === false`.

---

### KROK 2 — Domain Social: typy rolek, helper, porty

**Status:** `WYKONANY`

**Cel:** Domain i porty znają rolki, zanim powstaną Prisma i węzły. Major 4.1.1; `SPEC-SOCIAL.md` S-7b / S-7c.

**Artefakty:**

- Nowy: `apps/api/src/social/domain/reel-task.ts`
- Zmiana: `apps/api/src/social/domain/social.types.ts`
- Zmiana: `apps/api/src/social/domain/social-result.port.ts`
- Zmiana: `apps/api/src/runs/domain/run-result-reader.port.ts`

**Kolejność:** helper → typy → port store → reader.

#### Nowy plik — `apps/api/src/social/domain/reel-task.ts`

```typescript
export type ReelTaskType =
  | 'reel_ideas'
  | 'reel_script'
  | 'reel_ideas_then_scripts';

export function isReelTaskType(
  taskType: string,
): taskType is ReelTaskType {
  return (
    taskType === 'reel_ideas' ||
    taskType === 'reel_script' ||
    taskType === 'reel_ideas_then_scripts'
  );
}
```

#### Refaktor — `social.types.ts`

**Teraz** (po `SocialContent`): brak typów rolek. `SocialPipelineInput` / `SocialPipelineOutcome` tylko ideas/content.

**Zamień na** — dopisz po `SocialContent` i rozszerz input/outcome. `PipelinePhase` **bez zmian**.

```typescript
export type ReelDurationSeconds = 15 | 30 | 90;

export type ReelIdea = {
  id: string;
  title: string;
  description: string;
  hook: string;
  durationSeconds: ReelDurationSeconds;
};

export type ReelScriptSegment = {
  startSeconds: number;
  endSeconds: number;
  onScreen: string;
  voiceover: string;
};

export type ReelScript = {
  segments: ReelScriptSegment[];
  cta: string;
  notes?: string;
};
```

`SocialPipelineInput` — dodaj pola (reszta bez zmian):

```typescript
  ideas: SocialIdea[];
  content: SocialContent | null;
  reelIdeas: ReelIdea[];
  reelScript: ReelScript | null;
```

`SocialPipelineOutcome` — unia zostaje dyskryminowana po `kind`; HITL rolek niesie `reelIdeas`, completed jest addytywny:

```typescript
export type SocialPipelineOutcome =
  | {
      kind: 'completed';
      ideas: SocialIdea[];
      content: SocialContent | null;
      reelIdeas: ReelIdea[];
      reelScript: ReelScript | null;
    }
  | { kind: 'awaiting_hitl'; ideas: SocialIdea[]; reelIdeas: ReelIdea[] }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };
```

Gałąź `awaiting_hitl` zawsze ma obie tablice: posty wypełniają `ideas` i `reelIdeas: []`; rolki odwrotnie. Unika opcjonalnego `reelIdeas?` i `any`.

Istniejące testy `toOutcome` / executor, które konstruują `{ kind: 'completed', ideas, content }` albo `{ kind: 'awaiting_hitl', ideas }`, trzeba uzupełnić o `reelIdeas` / `reelScript` w **tym samym** KROK 2 (kompilacja) — pełne asercje executor/fasady w KROK 6.

Dla `completed` / `awaiting_hitl` w `social-pipeline.facade.spec.ts` i `social-run.executor.spec.ts` dopisz od razu:

```typescript
reelIdeas: [],
reelScript: null,
```

oraz w `awaiting_hitl`: `reelIdeas: []` obok `ideas`.

#### Refaktor — `social-result.port.ts`

**Teraz:** `replaceIdeas` / `replaceContent` / `listIdeas` / `getContent` / pipeline.

**Zamień na** — dopisz do interfejsu (istniejące metody bez zmian sygnatur):

```typescript
  replaceReelIdeas(runId: RunId, ideas: ReelIdea[]): Promise<void>;
  replaceReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void>;
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  getReelScript(runId: RunId): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null>;
```

Import typów `ReelIdea` / `ReelScript` z `./social.types`.

Każdy `jest.Mocked<SocialResultStore>` w repo musi dostać te cztery metody w tym kroku (inaczej TS nie kompiluje). Pliki: `social-run.executor.spec.ts`, `persist-ideas.node.spec.ts`, `persist-content.node.spec.ts`. Stuby: `mockRejectedValue(new Error('unexpected …'))` albo `mockResolvedValue` analogicznie do ideas/content.

#### Refaktor — `run-result-reader.port.ts`

**Teraz:** tylko `listIdeas` / `getContent`.

**Zamień na** — import `ReelIdea`, `ReelScript`; dopisz:

```typescript
  listReelIdeas(runId: RunId): Promise<ReelIdea[]>;
  getReelScript(runId: RunId): Promise<{
    script: ReelScript | null;
    verification: VerifierVerdict | null;
  } | null>;
```

`EmptyRunResultReader` i `fakeReader` w `get-run.use-case.spec.ts` — stuby `listReelIdeas → []`, `getReelScript → null` w tym kroku (snapshot HTTP w KROK 7).

**Testy:** nowy `apps/api/src/social/domain/reel-task.spec.ts` — `isReelTaskType` true dla trzech `reel_*`, false dla trzech `post_*`.

**DoD (krok):**

- Domain eksportuje `ReelIdea` / `ReelScript` / `ReelDurationSeconds` zgodnie z S-7b.
- Port store i `RunResultReader` mają sygnatury reel.
- Unit helpera `isReelTaskType` zielony; `PipelinePhase` nadal `'ideas' | 'content'`.
- Unit nie wymaga DB.

---

### KROK 3 — Prisma: `SocialReelIdea` / `SocialReelScript` + adapter

**Status:** `WYKONANY`

**Cel:** Append-only tabele rolek (P-7); adapter implementuje nowe metody portu. Major 4.1.1.

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma`
- Nowy: `apps/api/prisma/migrations/<timestamp>_social_reel_tables/migration.sql` (wynik CLI)
- Zmiana: `apps/api/src/social/infrastructure/persistence/prisma-social-result.adapter.ts`

**Kolejność:** schema → migrate → adapter.

#### Refaktor — `schema.prisma`

Na modelu `Run` dopisz relacje (obok `ideas` / `contents`):

```prisma
  reelIdeas          SocialReelIdea[]
  reelScripts        SocialReelScript[]
```

Nowe modele (na końcu pliku, analogia `SocialIdea` / `SocialContent`):

```prisma
model SocialReelIdea {
  id        String   @id
  runId     String
  payload   Json
  createdAt DateTime @default(now())
  run       Run      @relation(fields: [runId], references: [id])

  @@index([runId])
}

model SocialReelScript {
  id           String   @id
  runId        String
  payload      Json
  verification Json?
  createdAt    DateTime  @default(now())
  run          Run       @relation(fields: [runId], references: [id])

  @@index([runId])
}
```

SQL migracji (oczekiwany kształt po `prisma migrate dev --name social_reel_tables`; timestamp nadaje CLI):

```sql
-- CreateTable
CREATE TABLE "SocialReelIdea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialReelIdea_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SocialReelScript" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verification" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialReelScript_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SocialReelIdea_runId_idx" ON "SocialReelIdea"("runId");

-- CreateIndex
CREATE INDEX "SocialReelScript_runId_idx" ON "SocialReelScript"("runId");
```

#### Refaktor — adapter persistencji

Plik: `prisma-social-result.adapter.ts`. Import `ReelIdea`, `ReelScript`. Dopisz metody (wzorzec `replaceIdeas` / `replaceContent`; PK skryptu `srs_<uuid>` jak `sct_` dla contentu; PK pomysłu = `idea.id`):

```typescript
  async replaceReelIdeas(runId: RunId, ideas: ReelIdea[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialReelIdea.deleteMany({ where: { runId } }),
      this.prisma.socialReelIdea.createMany({
        data: ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      }),
    ]);
  }

  async replaceReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialReelScript.deleteMany({ where: { runId } }),
      this.prisma.socialReelScript.create({
        data: {
          id: `srs_${uuidv4()}`,
          runId,
          payload: toInputJson(script),
          verification: toInputJson(verification),
        },
      }),
    ]);
  }

  async listReelIdeas(runId: RunId): Promise<ReelIdea[]> {
    const rows = await this.prisma.socialReelIdea.findMany({
      where: { runId },
    });
    return rows.map((row) => row.payload as ReelIdea);
  }

  async getReelScript(runId: RunId) {
    const row = await this.prisma.socialReelScript.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) return null;
    return {
      script: row.payload as ReelScript,
      verification: (row.verification as VerifierVerdict | null) ?? null,
    };
  }
```

Mapowanie `payload as ReelIdea` jest **tym samym** wzorcem co żywy `listIdeas` (`payload as SocialIdea`) — nie wprowadzamy Zod w adapterze w tym wycinku.

**Testy:** unit adaptera nie jest wymagany (żywy Prisma = e2e KROK 8). Persist węzłów — KROK 5.

**DoD (krok):**

- Migracja w repo; tabele z `runId`, JSON payload, index `runId`.
- Adapter spełnia port; istniejące `replaceIdeas` / `replaceContent` bez regresji.
- Brak reuse `SocialContent` na skrypt.

---

### KROK 4 — Zod rolek i prompty

**Status:** `WYKONANY`

**Cel:** Structured output LLM dla rolek + szablony. Major 4.1.2; `SPEC-SOCIAL.md` S-3, S-7c.

**Artefakty:**

- Zmiana: `apps/api/src/social/application/social.schemas.ts`
- Zmiana: `apps/api/src/social/application/social.schemas.spec.ts`
- Nowe: cztery pliki `*.prompt.md` w `apps/api/src/social/infrastructure/prompts/`
- Zmiana: `apps/api/src/social/infrastructure/prompts/verifier.prompt.md` (ten sam węzeł ocenia posty **i** rolki)

`nest-cli.json` już kopiuje `**/*.prompt.md` — bez zmian.

#### Refaktor — `social.schemas.ts`

Dopisz (Zod 3, Context7: `z.literal` + `z.union`):

```typescript
export const reelDurationSecondsSchema = z.preprocess(
  (value: unknown) => {
    if (typeof value === 'string' && /^(15|30|90)$/.test(value)) {
      return Number(value);
    }
    return value;
  },
  z.union([z.literal(15), z.literal(30), z.literal(90)]),
);

export const reelIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  hook: z.string().min(1),
  durationSeconds: reelDurationSecondsSchema,
});

export const reelIdeasOutputSchema = z.object({
  ideas: z.array(reelIdeaSchema).min(1),
});

export const reelScriptSegmentSchema = z.object({
  startSeconds: z.number(),
  endSeconds: z.number(),
  onScreen: z.string().min(1),
  voiceover: z.string().min(1),
});

export const reelScriptOutputSchema = z.object({
  segments: z.array(reelScriptSegmentSchema).min(1),
  cta: z.string().min(1),
  notes: z.string().min(1).optional(),
});

export type ReelIdeasOutput = z.infer<typeof reelIdeasOutputSchema>;
export type ReelScriptOutput = z.infer<typeof reelScriptOutputSchema>;
```

Preprocess string `"15"` → `15` jest na granicy LLM (`unknown`); wynik nadal `15 | 30 | 90`. `z.coerce.number()` **nie** — przepuściłby `45`.

#### Testy schematów — dopisz do `social.schemas.spec.ts`

```typescript
import {
  reelIdeasOutputSchema,
  reelScriptOutputSchema,
} from './social.schemas';

it('parses reel ideas with numeric durationSeconds', () => {
  const out = parseLlmJson(
    reelIdeasOutputSchema,
    '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":15}]}',
  );
  expect(out.ideas[0]?.durationSeconds).toBe(15);
});

it('coerces durationSeconds from string 30', () => {
  const out = parseLlmJson(
    reelIdeasOutputSchema,
    '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":"30"}]}',
  );
  expect(out.ideas[0]?.durationSeconds).toBe(30);
});

it('rejects durationSeconds 45', () => {
  expect(() =>
    parseLlmJson(
      reelIdeasOutputSchema,
      '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":45}]}',
    ),
  ).toThrow(
    expect.objectContaining({
      name: 'DomainException',
      code: 'STRUCTURED_OUTPUT_INVALID',
    }),
  );
});

it('parses reel script segments', () => {
  const out = parseLlmJson(
    reelScriptOutputSchema,
    '{"segments":[{"startSeconds":0,"endSeconds":15,"onScreen":"Tekst","voiceover":"Powiedz"}],"cta":"Napisz do nas"}',
  );
  expect(out.segments).toHaveLength(1);
  expect(out.cta).toBe('Napisz do nas');
});
```

#### Nowy plik — `reel-ideas.prompt.md`

```markdown
Jesteś IdeationAgent — ekspertem od pomysłów na rolki / Reels (LinkedIn, Facebook, Instagram). Nie piszesz scenariusza klatka-po-klatce; dostarczasz listę pomysłów gotowych do wyboru.
(ścieżka rolek: reel_ideas)

Język treści pomysłów: {{language}}.
Platforma: {{platform}}.
Liczba pomysłów: {{ideaCount}}.

Kontekst firmy (JSON — jedyne źródło faktów o firmie, ofercie, tonie, CTA i audience):
{{company}}

Brief (JSON):
{{brief}}

## Zadanie

Wygeneruj dokładnie {{ideaCount}} pomysłów na rolki pod wskazaną platformę i brief. Każdy pomysł to jedna myśl / jeden format (np. problem-agitacja, how-to w 15 s, mit vs fakt, CTA z kontekstu).

Mapowanie pól:
- `title` — krótki tytuł roboczy (nie clickbait).
- `description` — 1–2 zdania: o czym rolka, jaka wartość, jaki kąt; wpleć kierunek jednej akcji CTA wyłącznie z `cta.items`.
- `hook` — pierwsze 1–2 sekundy na ekranie (tekst, który zatrzymuje scroll).
- `durationSeconds` — wyłącznie `15` albo `30` albo `90` (liczba, nie string). Dobierz do platformy i myśli: Instagram/Facebook zwykle 15–30; LinkedIn bywa 30; 90 tylko gdy jedna spójna narracja tego wymaga.

## Hook i kąty

Hook ma skłonić do dociągnięcia kolejnej sekundy. Preferuj problem, pytanie, konkret z kontekstu. Nie zaczynaj od oferty ani od „W dzisiejszym filmie…”.

Grupa docelowa: `brief.audience` jeśli podane, inaczej `audience.profiles`.

## Zakazy

- Nie wymyślaj usług, liczb, case’ów ani CTA spoza kontekstu firmy.
- Nie używaj nazw konkurentów, chyba że są w JSON kontekstu.
- Nie generuj pomysłów na posty tekstowe ani na YouTube — tylko rolki.
- Nie odwołuj się do plików repo. Wszystko, czego potrzebujesz, jest w JSON powyżej.
- `durationSeconds` inne niż 15, 30, 90 jest nieważne.

## Wyjście

Zwróć WYŁĄCZNIE JSON (bez markdown, bez komentarza, bez tekstu przed/po):

{"ideas":[{"title":"...","description":"...","hook":"...","durationSeconds":15}]}

Tablica `ideas` ma mieć dokładnie {{ideaCount}} elementów. Pole `id` pomiń (nadaje je pipeline).
```

#### Nowy plik — `reel-script.prompt.md`

```markdown
Jesteś ContentWriterAgent — scenarzystą rolek / Reels. Z pomysłu (lub briefu) piszesz jeden scenariusz: segmenty czasowe, tekst na ekranie, voiceover, jedno CTA.
(ścieżka rolek: reel_script)

Język treści: {{language}}.
Platforma: {{platform}}.

Kontekst firmy (JSON — jedyne źródło faktów, tonu i CTA):
{{company}}

Brief (JSON):
{{brief}}

Wybrane pomysły na rolki (JSON):
{{ideas}}

## Zadanie

Napisz JEDEN scenariusz rolki.
- Jeśli pole `ideas` zawiera pomysły — zrealizuj ich `hook` / `description` / `title` i trzymaj `durationSeconds` wybranego pomysłu (suma segmentów ≈ ten czas).
- Jeśli pole `ideas` jest puste (brak wybranych pomysłów) — generuj scenariusz wyłącznie z `brief.topic` i `brief.goal`. Nie wymyślaj dodatkowych kątów spoza briefu i kontekstu.
- Jedna myśl. Nie pisz wariantów ani serii rolek.

Segmenty:
- `startSeconds` / `endSeconds` — liczby (sekundy od początku); zakresy spójne, bez dziur obowiązkowych, bez nachodzenia.
- `onScreen` — krótki tekst / overlay.
- `voiceover` — to, co mówimy; może być puste w sensie „cisza + tekst”, ale pole string niepuste (np. krótka didaskalia).

`cta` — jedna akcja z `cta.items`. `notes` — opcjonalne didaskalia produkcyjne (bez nowych faktów o firmie).

## Zakazy

- Nie wymyślaj usług, wyników ani liczb spoza kontekstu.
- Nie pisz posta tekstowego (`body` / hashtagi posta). To scenariusz rolki.
- Nie odwołuj się do plików repo.

## Wyjście

Zwróć WYŁĄCZNIE JSON (bez markdown, bez komentarza, bez tekstu przed/po):

{"segments":[{"startSeconds":0,"endSeconds":5,"onScreen":"...","voiceover":"..."}],"cta":"..."}
```

#### Nowy plik — `refine-reel-ideas.prompt.md`

```markdown
Jesteś RefineIdeas — to samo rzemiosło co IdeationAgent rolek, ale poprawiasz ISTNIEJĄCĄ listę pomysłów na rolki według zarzutów verifiera. Nie wymyślaj kampanii od zera.
(ścieżka rolek: reel_ideas)

Język treści: {{language}}.

Kontekst firmy (JSON — jedyne źródło faktów):
{{company}}

Pomysły do poprawy (JSON):
{{ideas}}

Zarzuty kontekstu:
{{contextIssues}}

Zarzuty języka:
{{languageIssues}}

## Zadanie

Wdróż zarzuty ConsistencyVerifier. Zachowaj `durationSeconds` w {15, 30, 90}, liczbę pomysłów i `id` jeśli był. Każdy pomysł nadal: `title`, `description`, `hook`.

## Zakazy

- Nie dodawaj faktów spoza kontekstu.
- Nie zmieniaj liczby pomysłów, chyba że zarzut tego wymaga.
- Nie generuj scenariusza. To faza pomysłów na rolki.
- Nie odwołuj się do plików repo.

## Wyjście

Zwróć WYŁĄCZNIE JSON (bez markdown, bez komentarza, bez tekstu przed/po):

{"ideas":[{"title":"...","description":"...","hook":"...","durationSeconds":15}]}
```

#### Nowy plik — `refine-reel-script.prompt.md`

```markdown
Jesteś RefineContent — poprawiasz ISTNIEJĄCY scenariusz rolki według zarzutów verifiera. Nie pisz nowej rolki od zera, jeśli wystarczy korekta fraz.
(ścieżka rolek: reel_script)

Język treści: {{language}}.

Kontekst firmy (JSON):
{{company}}

Scenariusz do poprawy (JSON):
{{content}}

Zarzuty kontekstu:
{{contextIssues}}

Zarzuty języka:
{{languageIssues}}

## Zadanie

Wdróż zarzuty. Zachowaj strukturę `segments` + `cta`. Nie dodawaj faktów spoza kontekstu.

## Wyjście

Zwróć WYŁĄCZNIE JSON:

{"segments":[{"startSeconds":0,"endSeconds":5,"onScreen":"...","voiceover":"..."}],"cta":"..."}
```

#### Refaktor — `verifier.prompt.md`

**Teraz:**

```markdown
Materiał do oceny (JSON — pomysły albo treść posta):
{{payload}}
```

oraz w zakazach: `Nie oceniaj rolek / wideo — to posty.`

**Zamień na:**

```markdown
Materiał do oceny (JSON — pomysły na post, treść posta, pomysły na rolki albo scenariusz rolki):
{{payload}}
```

Zakaz `Nie oceniaj rolek / wideo — to posty.` **usuń**. Dopisz:

```markdown
- Oceniaj ten payload, który dostałeś (post albo rolka). Nie wymagaj pól z drugiego formatu.
```

Reszta S-4 (dwa obszary, interpunkcja haczyka) bez zmian.

**DoD (krok):**

- Structured output rolek walidowany Zod 3; `durationSeconds` 45 → `STRUCTURED_OUTPUT_INVALID`.
- Cztery szablony rolek istnieją jako pliki, nie stringi w węzłach.
- Verifier nie odrzuca rolek z góry.

---

### KROK 5 — Węzły, graf, fasada

**Status:** `WYKONANY`

**Cel:** Routing po `taskType` + `phase`; HITL tylko `reel_ideas_then_scripts` w fazie ideas. Major 4.1.2; S-6 / S-7.

**Artefakty:**

- Zmiana: `apps/api/src/social/infrastructure/graph/state.ts`
- Zmiana: `apps/api/src/social/infrastructure/graph/social.graph.ts` (tylko `SocialState` — dodać pola; krawędzie **bez** nowych węzłów)
- Zmiana: węzły ideation / refine-ideas / content-writer / refine-content / persist-* / verifier
- Zmiana: `apps/api/src/social/application/social-pipeline.facade.ts`
- Zmiana: wszystkie `makeState` w `*.spec.ts` węzłów (pola `reelIdeas` / `reelScript`)

**Kolejność:** state → węzły → graf (pola) → fasada → testy węzłów.

#### Refaktor — `state.ts`

Dopisz do `SocialGraphState`:

```typescript
  ideas: SocialIdea[];
  content: SocialContent | null;
  reelIdeas: ReelIdea[];
  reelScript: ReelScript | null;
```

W `social.graph.ts` w `SocialState = z.object({…})` analogicznie:

```typescript
  reelIdeas: z.custom<SocialGraphState['reelIdeas']>(),
  reelScript: z.custom<SocialGraphState['reelScript']>(),
```

Krawędzie grafu **bez zmian** (te same nazwy węzłów). Persist dyskryminuje wewnątrz węzła.

W każdym `makeState` testów węzłów dopisz `reelIdeas: []`, `reelScript: null`.

#### Refaktor — `ideation.node.ts`

Ładuj **oba** szablony w fabryce (sync `loadPrompt` jak dziś). W handlerze wybór:

```typescript
import { isReelTaskType } from '../../../domain/reel-task';
import {
  ideasOutputSchema,
  reelIdeasOutputSchema,
} from '../../../application/social.schemas';

export function createIdeationNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('ideation.prompt.md');
  const reelTemplate = loadPrompt('reel-ideas.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const reel = isReelTaskType(state.taskType);
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: reel ? reelIdeasOutputSchema : ideasOutputSchema,
      userContent: renderPrompt(reel ? reelTemplate : postTemplate, {
        language: state.language,
        platform: state.platform,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        ideaCount: String(state.brief.ideaCount ?? 5),
      }),
    });
    if (reel) {
      const reelIdeas = data.ideas.map((idea) => ({
        id: idea.id ?? `idea_${uuidv4()}`,
        title: idea.title,
        description: idea.description,
        hook: idea.hook,
        durationSeconds: idea.durationSeconds,
      }));
      return { reelIdeas };
    }
    const ideas: SocialIdea[] = data.ideas.map((idea) => ({
      id: idea.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
    }));
    return { ideas };
  };
}
```

Narrowing: po `schema: reel ? reelIdeasOutputSchema : ideasOutputSchema` TypeScript może nie zawęzić `data`. Rozdziel na dwie ścieżki `hop.chatJson` (dwa wywołania w `if/else`), żeby `data` było `ReelIdeasOutput` vs `IdeasOutput` bez `as`.

#### Refaktor — `refine-ideas.node.ts`

Analogicznie: `refine-ideas.prompt.md` vs `refine-reel-ideas.prompt.md`; schema ideas vs reel; zwrot `{ ideas, ideasRefineCount }` vs `{ reelIdeas, ideasRefineCount }`. Zachowaj `id` jak dziś (`idea.id ?? state.ideas[index]?.id` / `state.reelIdeas[index]?.id`).

#### Refaktor — `content-writer.node.ts`

```typescript
const reel = isReelTaskType(state.taskType);
const selectedIds = state.selectedIdeaIds;
if (reel) {
  const source = state.reelIdeas;
  const ideas =
    selectedIds != null && selectedIds.length > 0
      ? source.filter((idea) => selectedIds.includes(idea.id))
      : source;
  const template = loadPrompt('reel-script.prompt.md'); // w fabryce, nie w handlerze
  // hop.chatJson schema reelScriptOutputSchema
  // return { reelScript: { segments, cta, notes } }
}
// istniejąca ścieżka postów bez zmian semantyki (w tym pusty ideas → instrukcja brief)
```

Szablony ładuj w fabryce: `content-writer.prompt.md` + `reel-script.prompt.md`.

Pusty `reelIdeas` przy `reel_script`: przekaż string analogiczny do postów:

`'[] — brak wybranych pomysłów; generuj scenariusz wyłącznie z brief.topic, brief.goal i kontekstu firmy'`

#### Refaktor — `refine-content.node.ts`

Dla rolek: prompt `refine-reel-script.prompt.md`, schema `reelScriptOutputSchema`, zmienna `{{content}}` = `JSON.stringify(state.reelScript)`, zwrot `{ reelScript, contentRefineCount }`. Posty bez zmian.

#### Refaktor — `persist-ideas.node.ts`

```typescript
export function createPersistIdeasNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    if (isReelTaskType(state.taskType)) {
      await store.replaceReelIdeas(state.runId, state.reelIdeas);
      return {};
    }
    await store.replaceIdeas(state.runId, state.ideas);
    return {};
  };
}
```

#### Refaktor — `persist-content.node.ts`

```typescript
    if (isReelTaskType(state.taskType)) {
      if (state.reelScript == null || state.verdict == null) {
        throw new Error('Reel script and verdict are required before persist.');
      }
      await store.replaceReelScript(
        state.runId,
        state.reelScript,
        state.verdict,
      );
      return {};
    }
    // istniejący replaceContent
```

#### Refaktor — `verifier.node.ts`

**Teraz:** `const payload = state.phase === 'content' ? state.content : state.ideas;`

**Zamień na:**

```typescript
import { isReelTaskType } from '../../../domain/reel-task';

function verifierPayload(state: SocialGraphState): unknown {
  if (isReelTaskType(state.taskType)) {
    return state.phase === 'content' ? state.reelScript : state.reelIdeas;
  }
  return state.phase === 'content' ? state.content : state.ideas;
}
```

`JSON.stringify(payload)` jak dziś. `unknown` na granicy serializacji do promptu — nie `any`.

#### Refaktor — `social-pipeline.facade.ts`

`invokePhase` extras:

```typescript
    extras: {
      ideasRefineCount: number;
      contentRefineCount: number;
      ideas: SocialIdea[];
      reelIdeas: ReelIdea[];
    },
```

`graph.invoke` — dopisz `reelIdeas: extras.reelIdeas`, `reelScript: null`.

`toOutcome`:

```typescript
  if (phase === 'ideas' && run.taskType === 'post_ideas_then_content') {
    return { kind: 'awaiting_hitl', ideas: final.ideas, reelIdeas: [] };
  }
  if (phase === 'ideas' && run.taskType === 'reel_ideas_then_scripts') {
    return {
      kind: 'awaiting_hitl',
      ideas: [],
      reelIdeas: final.reelIdeas,
    };
  }
  return {
    kind: 'completed',
    ideas: final.ideas,
    content: final.content,
    reelIdeas: final.reelIdeas,
    reelScript: final.reelScript,
  };
```

`Pick<SocialGraphState, …>` w `toOutcome` musi objąć `reelIdeas` i `reelScript`.

Test `toOutcome`: dopisz przypadek `reel_ideas_then_scripts` + `'ideas'` → `awaiting_hitl` z `reelIdeas`; `reel_ideas` + `'ideas'` → `completed` (bez HITL). Istniejące asercje postów: uzupełnij puste `reelIdeas` / `reelScript`.

Testy węzłów: ideation przy `taskType: 'reel_ideas'` woła `reelIdeasOutputSchema` i zwraca `reelIdeas` (nie `ideas`); persist-ideas przy reel woła `replaceReelIdeas` i **nie** `replaceIdeas`.

**DoD (krok):**

- Ten sam graf; brak katalogu `content/`.
- HITL z fasady tylko `reel_ideas_then_scripts` w fazie ideas.
- Persist dyskryminuje tabele; posty nadal `SocialIdea` / `SocialContent`.
- Structured output rolek walidowany przed persist.

---

### KROK 6 — Executor `resolvePhase` i fake LLM

**Status:** `WYKONANY`

**Cel:** Trzy `reel_*` w `SocialRunExecutor`; fake LLM rozróżnia reel vs post. Major 4.1.2.

**Artefakty:**

- Zmiana: `apps/api/src/social/application/social-run.executor.ts`
- Zmiana: `apps/api/src/social/application/social-run.executor.spec.ts`
- Zmiana: `apps/api/test/fake-llm-gateway.ts`

#### Refaktor — `resolvePhase` i `execute`

Plik: `social-run.executor.ts`.

**Teraz** `resolvePhase`:

```typescript
    if (run.taskType === 'post_content') return 'content';
    if (
      run.taskType === 'post_ideas_then_content' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'content';
    }
    if (storedPhase) return storedPhase;
    return 'ideas';
```

**Zamień na:**

```typescript
    if (run.taskType === 'post_content' || run.taskType === 'reel_script') {
      return 'content';
    }
    if (
      (run.taskType === 'post_ideas_then_content' ||
        run.taskType === 'reel_ideas_then_scripts') &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'content';
    }
    if (storedPhase) return storedPhase;
    return 'ideas';
```

`execute` — obok `listIdeas` wołaj `listReelIdeas`. Pauza recovery HITL:

```typescript
    const noSelection =
      run.selectedIdeaIds == null || run.selectedIdeaIds.length === 0;

    if (
      run.taskType === 'post_ideas_then_content' &&
      ideas.length > 0 &&
      noSelection
    ) {
      await this.lifecycle.transition(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
      return;
    }

    if (
      run.taskType === 'reel_ideas_then_scripts' &&
      reelIdeas.length > 0 &&
      noSelection
    ) {
      await this.lifecycle.transition(run, 'awaiting_hitl', {
        hitlOptions: reelIdeas,
      });
      return;
    }
```

`invokePhase` extras: `ideas`, `reelIdeas`. `hitlOptions` z fasady: `outcome.kind === 'awaiting_hitl'` → `outcome.reelIdeas.length > 0 ? outcome.reelIdeas : outcome.ideas`.

`resultSummary`:

```typescript
        resultSummary: isReelTaskType(run.taskType)
          ? phase === 'ideas'
            ? `reelIdeas:${outcome.reelIdeas.length}`
            : 'reelScript'
          : phase === 'ideas'
            ? `ideas:${outcome.ideas.length}`
            : 'content',
```

#### Testy executor — analogia do istniejących (pełny kod nowych `it`)

Dopisz w `social-run.executor.spec.ts` (obok `phase resolution` / `HITL`):

- `reel_ideas` → `invokePhase(..., 'ideas')`, `completed` z `resultSummary: 'reelIdeas:2'`.
- `reel_script` wymusza `'content'` nawet gdy `storedPhase === 'ideas'` (jak `post_content`).
- `reel_ideas_then_scripts` + `selectedIdeaIds` → `'content'`.
- `reel_ideas_then_scripts` + zapisane `reelIdeas` bez selekcji → `awaiting_hitl` **bez** fasady; `hitlOptions` = reel ideas.
- `storedPhase` nadal fallback dla `reel_ideas` (jak `post_ideas`).

Fixture reel:

```typescript
const reelIdeas: ReelIdea[] = [
  {
    id: 'idea_1',
    title: 'R1',
    description: 'D1',
    hook: 'H1',
    durationSeconds: 15,
  },
  {
    id: 'idea_2',
    title: 'R2',
    description: 'D2',
    hook: 'H2',
    durationSeconds: 30,
  },
];

const reelScript: ReelScript = {
  segments: [
    {
      startSeconds: 0,
      endSeconds: 15,
      onScreen: 'Hook',
      voiceover: 'Powiedz problem.',
    },
  ],
  cta: 'Napisz do nas',
};
```

`fakeStore`: `listReelIdeas` z `overrides.reelIdeas ?? []`.

Istniejące testy `post_*` **nie** przepisujemy poza wymaganymi polami outcome (`reelIdeas: []`, `reelScript: null`).

#### Refaktor — `fake-llm-gateway.ts`

Dopisz:

```typescript
export function reelIdeasJson(): string {
  return JSON.stringify({
    ideas: [
      {
        id: 'idea_1',
        title: 'R1',
        description: 'D1',
        hook: 'H1',
        durationSeconds: 15,
      },
      {
        id: 'idea_2',
        title: 'R2',
        description: 'D2',
        hook: 'H2',
        durationSeconds: 30,
      },
    ],
  });
}

export function reelScriptJson(): string {
  return JSON.stringify({
    segments: [
      {
        startSeconds: 0,
        endSeconds: 15,
        onScreen: 'Hook na ekranie',
        voiceover: 'Jedno zdanie problemu.',
      },
    ],
    cta: 'Napisz do nas',
  });
}
```

`inferReply` — **przed** gałęzią ContentWriter/ideas:

```typescript
  if (userContent.includes('(ścieżka rolek: reel_script)')) {
    return reelScriptJson();
  }
  if (userContent.includes('(ścieżka rolek: reel_ideas)')) {
    return reelIdeasJson();
  }
```

Verifier i `GATEWAY_FAIL` bez zmian. Token `(ścieżka rolek: …)` jest w promptach KROK 4 — nie zgadujemy po `ContentWriterAgent`.

**DoD (krok):**

- Executor: analogiczne testy do `social-run.executor.spec.ts` dla trzech `reel_*`.
- Fasada: HITL tylko `reel_ideas_then_scripts` w fazie ideas (KROK 5 + ten krok).
- D-4/D-5 unit executor postów nadal zielone.
- Fake LLM bez skryptu i tak zwraca reel JSON, gdy prompt zawiera marker rolek.

---

### KROK 7 — HTTP Runs: DTO, Zod, snapshot, lista

**Status:** `WYKONANY`

**Cel:** Start `reel_*` + `platform`; snapshot addytywny; HITL z `reelIdeas`; lista filtruje `taskType=reel_ideas`; Prisma mapuje `taskType` przez `isRunTaskType`. Major 4.1.3; `SPEC-RUNY.md` R-3f.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts`
- Zmiana: `apps/api/src/runs/application/get-run.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/infrastructure/empty-run-result.reader.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` (`toSnapshot`)
- Zmiana: `apps/api/src/runs/http/dto/start-run.dto.ts` / `list-runs-query.dto.ts` — **tylko jeśli** nie czytają już `RUN_TASK_TYPES` (dziś czytają — po KROK 1 Swagger/`@IsIn` same łapią `reel_*`)
- `run.schemas.ts` `z.enum(RUN_TASK_TYPES)` — bez edycji, o ile KROK 1 zrobiony

`platform` nadal wymagane (`SOCIAL_PLATFORMS`). `contentKind` **nie** wchodzi.

#### Refaktor — `GetRunUseCase`

**Teraz:** `result: { ideas, content }`; HITL `options: ideas`.

**Zamień na** (ciało `execute` po `getById`):

```typescript
    const ideas = await this.results.listIdeas(run.id);
    const reelIdeas = await this.results.listReelIdeas(run.id);
    const stored = await this.results.getContent(run.id);
    const storedReel = await this.results.getReelScript(run.id);
    const hitlOptions =
      run.taskType === 'reel_ideas_then_scripts' ? reelIdeas : ideas;
    const hitl =
      run.status === 'awaiting_hitl' ? { options: hitlOptions } : null;
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedBy,
      result: {
        ideas,
        content: stored?.content ?? null,
        reelIdeas,
        reelScript: storedReel?.script ?? null,
      },
      hitl,
    };
```

Istniejące testy GetRun: w `toEqual` dopisz `reelIdeas: []` (albo fixture) i `reelScript: null`. Nowy test: `taskType: 'reel_ideas_then_scripts'`, `awaiting_hitl`, reader zwraca `reelIdeas` → `hitl.options` === te rolki, `result.ideas` może być `[]`.

#### Refaktor — `EmptyRunResultReader`

```typescript
  async listReelIdeas(_runId: RunId): Promise<ReelIdea[]> {
    return [];
  }

  async getReelScript(_runId: RunId) {
    return null;
  }
```

#### Refaktor — `prisma-run.adapter.ts` `toSnapshot`

**Teraz:** `taskType: row.taskType as RunTaskType`

**Zamień na:**

```typescript
import { isRunTaskType } from '@content-chain/shared';

    if (!isRunTaskType(row.taskType)) {
      throw new Error(`Run.taskType is not a RunTaskType: ${row.taskType}`);
    }
    // …
      taskType: row.taskType,
```

`platform` nadal `as SocialPlatform` (sentinel `'web'` = Faza 4.2, nie ten plik).

**Testy HTTP/Zod:** w `start-run.use-case.spec.ts` dopisz: `taskType: 'reel_ideas'` + `platform: 'linkedin'` przechodzi parse (create wołane); bez `platform` nadal `VALIDATION_FAILED` (schema niezmieniona — `platform` wymagane).

**DoD (krok):**

- `POST /runs` z `reel_*` + `platform` → 202.
- Snapshot: `reelIdeas` / `reelScript`; posty: `ideas` / `content` jak Milestone 4 (klucze reel puste / null).
- HITL: `selectedIdeaIds` z `reelIdeas`.
- Lista: `taskType=reel_ideas` legalny filtr (`@IsIn(RUN_TASK_TYPES)`).
- Adapter: `isRunTaskType`, nie goły `as RunTaskType`.

---

### KROK 8 — Testy unit/e2e D-15/D-16, Postman C/D, regresja

**Status:** `WYKONANY`

**Cel:** Major 4.1.4; `SPEC-TESTY.md` D-15, D-16; regresja D-4…D-8; Postman foldery C/D.

**Artefakty:**

- Zmiana: `apps/api/test/social-pipeline.e2e-spec.ts`
- Zmiana: `apps/api/test/postman/social-pipeline.postman-collection.json`
- Zmiana: `apps/api/test/postman/README.md`
- Uzupełnienia unit z KROK 4–7, jeśli coś zostało

`reel_script` solo — Jest (describe w e2e albo unit executor już z KROK 6); **nie** obowiązkowy Postman.

#### E2E — `social-pipeline.e2e-spec.ts`

Rozszerz `RunSnapshotBody.result`:

```typescript
  result: {
    ideas: SocialIdeaBody[];
    content: SocialContentBody | null;
    reelIdeas: Array<{
      id: string;
      title: string;
      description: string;
      hook: string;
      durationSeconds: 15 | 30 | 90;
    }>;
    reelScript: {
      segments: Array<{
        startSeconds: number;
        endSeconds: number;
        onScreen: string;
        voiceover: string;
      }>;
      cta: string;
      notes?: string;
    } | null;
  };
```

`wipeRuns`: **przed** `socialIdea.deleteMany`:

```typescript
  await prisma.socialReelScript.deleteMany();
  await prisma.socialReelIdea.deleteMany();
```

`postRun` — rozszerz unię `taskType` o `'reel_ideas' | 'reel_script' | 'reel_ideas_then_scripts'`.

Nowe describe (skrypt LLM z helperów KROK 6):

**D-15** — `useScript([reelIdeasJson(), verifierOk()])`; `POST reel_ideas`; wait `completed`; `result.reelIdeas[0].id`; `socialReelIdea.count === 2`; `result.ideas` puste albo nieużywane do asercji D-15; `result.content` null; brak HITL.

**D-16** — ideas+verifier → `awaiting_hitl`; `hitl.options === result.reelIdeas`; `POST hitl` z `result.reelIdeas[0].id`; skrypt `[reelScriptJson(), verifierOk()]`; `completed`; `result.reelScript.segments` niepuste; `socialReelScript.count === 1`.

**`reel_script` solo (Jest):** `useScript([reelScriptJson(), verifierOk()])`; `POST reel_script`; `completed`; `result.reelScript.segments`.

D-4…D-8 **zostają**; nie zmieniać asercji ideas/content poza kompatybilnością typu snapshotu (klucze reel mogą być `[]` / `null`).

Lista (opcjonalnie w `runs-list.e2e-spec.ts` albo w tym pliku): `GET /runs?taskType=reel_ideas` zwraca tylko rolki — jeśli nie ma gotowego e2e listy pod filtr, wystarczy unit DTO + jeden request w D-15 po completed.

#### Postman — foldery C i D

Dopisz do tablicy `item` kolekcji (po folderze B), analogia A/B:

- **C. reel_ideas:** `POST` body `taskType: reel_ideas`, `platform: linkedin`, `language: pl`, `brief.topic`; poll aż `completed`; asercja `result.reelIdeas` niepusta + `result.reelIdeas[0].id`; logi jak A (`conversationId` / `requestId`, brak sekretu). Poll **nie** może akceptować `awaiting_hitl`.
- **D. reel_ideas_then_scripts:** poll aż `awaiting_hitl`; `ideaId` z `result.reelIdeas[0].id` (nie `result.ideas`); `POST .../hitl`; poll `completed`; asercja `result.reelScript.segments` niepusta.

Zmienne: można reuse `runId` / `ideaId`; poll count `pollCountC` / `pollCountHitlD` / `pollCountD`.

`info.description` kolekcji: dopisz foldery C/D (Milestone 4.1 / dowód rolek). Nazwa kolekcji może zostać z „Social pipeline”; opis nie może twierdzić, że są tylko A/B.

#### README Postman

**Teraz:** „foldery w kolejności **Setup → A → B**”; tabela tylko A/B; poza zakresem `post_content` solo.

**Zamień** akapity ścieżek na:

| Folder | Przebieg |
|--------|----------|
| **A. post_ideas** | bez zmian Milestone 4 |
| **B. post_ideas_then_content** | bez zmian Milestone 4 |
| **C. reel_ideas** | `POST /runs` (`reel_ideas`) → poll `completed` → `result.reelIdeas[0].id` + logi |
| **D. reel_ideas_then_scripts** | poll `awaiting_hitl` (`options` / `reelIdeas`) → HITL → `result.reelScript.segments` |

Runner: **Setup → A → B → C → D**. `reel_script` solo — poza Postmanem (Jest).

**DoD (krok):**

- `pnpm --filter api test` (unit) + e2e api zielone.
- D-15, D-16 + regresja D-4…D-8.
- README opisuje C/D; kolekcja importowalna (v2.1).
- Milestone 4 A/B bez regresji.
- Brak `apps/api/src/content/`.

---

## Weryfikacja wycinka

| Kryterium | Gdzie |
|-----------|--------|
| Trzy taski `reel_*` E2E Jest (fake LLM) | KROK 8 D-15, D-16, `reel_script` solo |
| Postman C/D (żywy gateway) | KROK 8 — poza CI PR, jak A/B |
| D-4/D-5 postów zielone | KROK 8 regresja |
| `PipelinePhase` bez nowej wartości | KROK 2 / 6 |
| Snapshot addytywny | KROK 7 |
| Brak katalogu `content/` | cały plik |
| Zod 3, tsconfig bez zmian | KROK 4 / Meta |
| Graf Nest acykliczny (Faza 4.5) | nietknięty klej `AppModule` |

---

## Ślad do major (informacyjnie, poza tym skillem)

Po **implementacji** tego pliku (nie w tej sesji):

- Faza 4.1 oraz kroki 4.1.1–4.1.4 → `WYKONANY`
- MILESTONE 4.2 **nie** oznaczać — wymaga Fazy 4.2 (`feature-plans/content-chain_feature_plan_faza-4-2-content.md`)

---

## Pass rozwojowy (ten plik)

Przesunięcia względem numeracji major 4.1.x (zatwierdzone przed zapisem):

1. Executor (`resolvePhase`, fake LLM) **przed** HTTP — KROK 6 przed KROK 7 (major 4.1.2 przed 4.1.3).
2. Zod + prompty **przed** węzłami — KROK 4 przed KROK 5.
3. Shared `reel_*` pierwszy (KROK 1), zanim Zod startu i DTO zaczną akceptować te wartości.

Brak przenoszenia prac do Fazy 4.2.
