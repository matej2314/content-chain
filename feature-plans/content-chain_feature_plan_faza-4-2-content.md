# Content Chain — feature plan: BC Content + klej composite

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-4-2-content.md`  
**Kotwica major:** Faza 4.2 (kroki 4.2.1–4.2.4) + ślad **MILESTONE 4.2**.  
**Źródła:** `docs/architektura.md`, `docs/data_flow.md` §4d–4e, `docs/dokumentacja_komunikacji.md`, `docs/brand_types.md`, `docs/testy.md`, `SPEC-CONTENT.md` (w tym Ctn-10), `SPEC-RUNY.md` (R-3d / R-3e / R-3f), `SPEC-PERSISTENCE.md` (P-5 / P-7), `SPEC-TESTY.md` (D-17, D-18, D-19), `SPEC-SOCIAL.md` (zakaz importu Content).  
**Założenie wejścia:** FAZA 1 rolek (`feature-plans/content-chain_feature_plan_faza-4-1-rolki.md`) już zaimplementowana — `reel_*` w `RunTaskType`, porty reel, snapshot `reelIdeas` / `reelScript`.  
**Kolejność `KROK` ≠ etykietom major 4.2.1–4.2.4** — pass rozwojowy: shared + zawężenie Social **przed** `page_*` w unii; kernel hopu **przed** grafem Content; Zod HTTP startu **razem z klejem** (nie w izolowanym Prisma).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Major Faza 4.2 — BC Content (`page_*`) + composite executor/reader + MILESTONE 4.2 jako bramka wyniku |
| Major | Faza 4.2 / 4.2.1–4.2.4; start po Fazie 4.1; MILESTONE 4.2 po DoD obu faz |
| Poza zakresem | Faza 5 (auth), Faza 6 (`PageWriterAgent` w shared, `userRating`), Faza 9 (Zod 4), łańcuch 6 audytorów, WordPress, checkpointer, import Social ↔ Content, zmiana Fazy 4 / 4.1 (poza zawężeniem `SocialTaskType`) |
| Po implementacji (informacyjnie) | Major: Faza 4.2 i 4.2.1–4.2.4 → `WYKONANY`; MILESTONE 4.2 → `OSIĄGNIĘTY`. Edycja major **poza** tym skillem |

---

## Założenia

- HTTP nadal Runs. `ContentModule` bez `controllers[]`. LLM przez istniejący `LlmGatewayPort`. Zod **3**. Tsconfig bez zmian. `packages/shared` bez Zod.
- Faza grafu Content: `'outline' \| 'copy'` — **nie** reuse `'ideas'` (`SPEC-CONTENT.md` Ctn-6). Kolumna `Run.pipelinePhase` trzyma obie rodziny wartości (Social: `ideas`/`content`; page: `outline`/`copy`).
- Sentinel DB: `Run.platform = 'web'` (`RunPlatform`; **nie** `SocialPlatform`). HTTP `platform` przy `page_*` **zakazane**.
- `ContentKind`: `blog` \| `service_page` \| `landing`. `FeedbackAgentKey` / `PageWriterAgent` — **Faza 6**, nie ten wycinek.
- Port `ContentResultStore` osobny od Social. Tabele `ContentOutline` / `ContentDocument`.
- Klej: `run-dispatch.executor.ts` zależy od `RunExecutorPort` + `isSocialTaskType` / `isContentTaskType` z shared — **nie** od klas grafu. `RunsModule` nie importuje `SocialModule` / `ContentModule` (tylko `registerAsync` w `AppModule`).
- Refine `max N=2`: kopia polityki w `content/domain` (zakaz importu `social/domain` z Content).
- Liczniki refine na `Run`: `outlineRefineCount` / `copyRefineCount` (domain 1:1, default 0). **Nie** reuse `ideasRefineCount` / `contentRefineCount` — te zostają Social (`SPEC-CONTENT.md` Ctn-10, `SPEC-PERSISTENCE.md` P-5 od v4).
  Zmiana względem: wcześniejsze założenie tego planu („`ideasRefineCount` = outline, `contentRefineCount` = copy, bez nowych pól”).
- HITL page: `hitl.options` = tablica z jednym elementem `pageOutline` (id całego outline’u); `selectedIdeaIds` na `POST .../hitl` = dokładnie `[outline.id]` — walidacja w `ResumeHitlUseCase` (reader `getPageOutline`), **400** `HITL_INVALID_SELECTION` przy mismatch, status zostaje `awaiting_hitl`. `POST /runs` dla `page_*` **bez** `selectedIdeaIds` (gałąź Zod page nie ma tego pola; `.strict()` odrzuca). Id sekcji nielegalne.
  Zmiana względem: wcześniejsze założenie „kanon tablicy id jak SM” bez egzekucji id; `docs/data_flow.md` §4e (po korekcie 2026-09-01), `SPEC-CONTENT.md` Ctn-5 v3, `SPEC-RUNY.md` R-3f v10.
- Snapshot addytywny: pola Social z 4.1 zostają; dokładamy `pageOutline` / `pageDocument` oraz `contentKind` (lista + GET). `userRating` / `outputEdited` — Faza 6, nie dodawać.
- `parseLlmJson`, `LlmHopService` i algorytm `loadPrompt` / `renderPrompt` żyją w `apps/api/src/shared/llm/` (KROK 4). `refine-policy` **zostaje** w `domain/` każdego BC (kopia 1:1 — drzewo SPEC). `packages/shared` bez Zod. `LlmModule` bez zmian (hop nie spina `llm/` z Runs).
  Zmiana względem: wcześniejsze założenie „tylko parseLlmJson do shared, hop/load-prompt kopia w Content”.
- ValidationPipe: `forbidNonWhitelisted: true` — DTO **musi** zadeklarować opcjonalne `contentKind` i opcjonalne `platform`; prawdziwa unia = Zod w application.

---

## Biblioteki / API

Weryfikacja 2026-09-01. Context7 Zod `/colinhacks/zod/v3.24.2`: `z.discriminatedUnion('taskType', [z.object({ taskType: z.enum(...) }), …])`; `z.enum` jest legalnym dyskryminatorem; `.strict()` odrzuca nieznane klucze (`platform` na gałęzi page, `contentKind` na gałęzi Social). LangGraph: ten sam wzorzec co Social (`StateGraph(z.object)`, `compile()` bez checkpoinetera). Prisma 6 SQLite: append P-7. Nest: `registerAsync` inject obu executorów; bez `forwardRef`.

---

## FAZA 2 — BC Content + klej

Odpowiada major **Faza 4.2**. Jedna faza w tym pliku.

---

### KROK 1 — Shared: `SocialTaskType` / `ContentTaskType` / `page_*` / `ContentKind` / `RunPlatform`

**Status:** `WYKONANY`

**Cel:** Zamknięta unia tasków + zawężenie Social **zanim** `page_*` wejdzie do `RunTaskType`, którego Social przełącza. Major 4.2.1 (shared); `docs/brand_types.md`; `SPEC-RUNY.md` R-3d.

**Artefakty:**

- Zmiana: `packages/shared/src/branded/enums.ts`
- Zmiana: `apps/api/src/social/domain/social.types.ts` (`taskType: SocialTaskType`)
- Zmiana: `apps/api/src/social/infrastructure/graph/state.ts`
- Zmiana: `apps/api/src/social/application/social-run.executor.ts` (narrowing na wejściu)
- Zmiana: `apps/api/src/social/application/social-pipeline.facade.ts` (graf dostaje `SocialTaskType`)

**Kolejność:** shared → zawężenie Social (kompilacja) → **nie** otwierać HTTP `page_*` w tym kroku (Zod unia = KROK 6).

#### Refaktor — `packages/shared/src/branded/enums.ts`

Po KROK 1 planu rolek `RunTaskType` ma 6 wartości Social. **Zamień cały blok task/platform** na:

```typescript
export type SocialTaskType =
  | 'post_ideas'
  | 'post_content'
  | 'post_ideas_then_content'
  | 'reel_ideas'
  | 'reel_script'
  | 'reel_ideas_then_scripts';

export type ContentTaskType = 'page_copy' | 'page_outline_then_copy';

export type RunTaskType = SocialTaskType | ContentTaskType;

export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram';
export type RunPlatform = SocialPlatform | 'web';
export type ContentKind = 'blog' | 'service_page' | 'landing';
export type ContentLanguage = 'pl' | 'en';

export const SOCIAL_TASK_TYPES = [
  'post_ideas',
  'post_content',
  'post_ideas_then_content',
  'reel_ideas',
  'reel_script',
  'reel_ideas_then_scripts',
] as const satisfies readonly SocialTaskType[];

export const CONTENT_TASK_TYPES = [
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly ContentTaskType[];

export const RUN_TASK_TYPES = [
  ...SOCIAL_TASK_TYPES,
  ...CONTENT_TASK_TYPES,
] as const satisfies readonly RunTaskType[];

export const SOCIAL_PLATFORMS = [
  'linkedin',
  'facebook',
  'instagram',
] as const satisfies readonly SocialPlatform[];

export const RUN_PLATFORMS = [
  ...SOCIAL_PLATFORMS,
  'web',
] as const satisfies readonly RunPlatform[];

export const CONTENT_KINDS = [
  'blog',
  'service_page',
  'landing',
] as const satisfies readonly ContentKind[];

export const CONTENT_LANGUAGES = ['pl', 'en'] as const satisfies readonly ContentLanguage[];

export const isSocialTaskType = (value: string): value is SocialTaskType =>
  (SOCIAL_TASK_TYPES as readonly string[]).includes(value);

export const isContentTaskType = (value: string): value is ContentTaskType =>
  (CONTENT_TASK_TYPES as readonly string[]).includes(value);

export const isRunTaskType = (value: string): value is RunTaskType =>
  (RUN_TASK_TYPES as readonly string[]).includes(value);

export const isSocialPlatform = (value: string): value is SocialPlatform =>
  (SOCIAL_PLATFORMS as readonly string[]).includes(value);

export const isRunPlatform = (value: string): value is RunPlatform =>
  (RUN_PLATFORMS as readonly string[]).includes(value);

export const isContentKind = (value: string): value is ContentKind =>
  (CONTENT_KINDS as readonly string[]).includes(value);

export const isContentLanguage = (value: string): value is ContentLanguage =>
  (CONTENT_LANGUAGES as readonly string[]).includes(value);
```

Zachowaj istniejące `UserRole` / `RunStatus` / helpery bez zmian. **Nie** dodawaj `PageWriterAgent`.

`z.enum(RUN_TASK_TYPES)` w `run.schemas.ts` po tym kroku **zacząłby** akceptować `page_*` przy wciąż wymaganym `platform` — **nie odpalaj** e2e page dopóki KROK 6 nie podmieni schematu na `discriminatedUnion`. DTO w KROK 1 **nie** zmieniaj jeszcze (zostaje wymagane `platform`) — wtedy `POST page_copy` bez platformy pada na ValidationPipe, a z `linkedin` przeszedłby Zod 4.1 i wpadłby w Social. Dlatego **KROK 6** otwiera HTTP; ten krok tylko typy + zawężenie Social.

#### Refaktor — Social `taskType`

`social.types.ts` / `SocialGraphState`: `taskType: SocialTaskType` (import z shared).

`SocialRunExecutor.execute` — na starcie:

```typescript
    if (!isSocialTaskType(run.taskType)) {
      throw new Error(
        `SocialRunExecutor received non-social taskType: ${run.taskType}`,
      );
    }
```

(Po KROK 6 composite nie woła Social dla `page_*`. Guard jest pasem bezpieczeństwa, nie HTTP 400.)

Fasada: po guardzie `run.taskType` jest `SocialTaskType`; przekaż do `graph.invoke`.

**Testy:** nowy `packages/shared` nie ma Jest — pokrycie `isContentTaskType` / `isRunPlatform` w KROK 6 unit Zod. Unit `reel-task.spec` / Social executor bez zmian semantyki.

**DoD (krok):**

- `RunTaskType` = Social ∪ Content; `'web'` nie jest `SocialPlatform`.
- Social kompiluje się na `SocialTaskType`; `page_copy` nie jest `SocialTaskType`.
- HTTP startu **nie** przyjmuje jeszcze legalnego `page_*` (DTO nadal wymaga `platform`).

---

### KROK 2 — Prisma: `contentKind`, tabele Content, `RunRecord`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Persistencja page runów. Major 4.2.1; Ctn-9 / Ctn-10; P-5 / P-7.

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma`
- Nowy: migracja `content_kind_and_pages`
- Zmiana: `apps/api/src/runs/domain/run.types.ts`
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- Zmiana: helpery `makeRun` w testach Runs/Social (`contentKind: null`, `outlineRefineCount: 0`, `copyRefineCount: 0`, `platform` nadal Social w fixture’ach Social)

#### Refaktor — `schema.prisma`

Na `Run` dopisz:

```prisma
  contentKind          String?
  outlineRefineCount   Int      @default(0)
  copyRefineCount      Int      @default(0)
  outlines             ContentOutline[]
  documents            ContentDocument[]
```

`ideasRefineCount` / `contentRefineCount` **bez zmian** (Social). Nowe kolumny tylko doklejane (P-7).

Modele:

```prisma
model ContentOutline {
  id        String   @id
  runId     String
  payload   Json
  createdAt DateTime @default(now())
  run       Run      @relation(fields: [runId], references: [id])

  @@index([runId])
}

model ContentDocument {
  id           String   @id
  runId        String
  payload      Json
  verification Json?
  createdAt    DateTime  @default(now())
  run          Run       @relation(fields: [runId], references: [id])

  @@index([runId])
}
```

SQL (kształt po `prisma migrate dev --name content_kind_and_pages`):

```sql
-- AlterTable
ALTER TABLE "Run" ADD COLUMN "contentKind" TEXT;
ALTER TABLE "Run" ADD COLUMN "outlineRefineCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Run" ADD COLUMN "copyRefineCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ContentOutline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentOutline_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContentDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verification" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentDocument_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ContentOutline_runId_idx" ON "ContentOutline"("runId");

-- CreateIndex
CREATE INDEX "ContentDocument_runId_idx" ON "ContentDocument"("runId");
```

#### Refaktor — `run.types.ts`

**Teraz:** `platform: SocialPlatform`; `pipelinePhase: 'ideas' | 'content' | null`; brak `contentKind`.

**Zamień na** (import `RunPlatform`, `ContentKind`):

```typescript
  taskType: RunTaskType;
  platform: RunPlatform;
  contentKind: ContentKind | null;
  language: ContentLanguage;
  pipelinePhase: 'ideas' | 'content' | 'outline' | 'copy' | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  outlineRefineCount: number;
  copyRefineCount: number;
```

Istniejące `ideasRefineCount` / `contentRefineCount` zostają. Nowe pola: start i fixture Social = `0`.

#### Refaktor — `prisma-run.adapter.ts`

`create`: zapisz `contentKind: run.contentKind`, `outlineRefineCount: run.outlineRefineCount`, `copyRefineCount: run.copyRefineCount`.

`toPipelinePhase`:

```typescript
function toPipelinePhase(value: string | null): RunRecord['pipelinePhase'] {
  if (
    value === 'ideas' ||
    value === 'content' ||
    value === 'outline' ||
    value === 'copy'
  ) {
    return value;
  }
  return null;
}
```

`toSnapshot`:

```typescript
    if (!isRunTaskType(row.taskType)) {
      throw new Error(`Run.taskType is not a RunTaskType: ${row.taskType}`);
    }
    if (!isRunPlatform(row.platform)) {
      throw new Error(`Run.platform is not a RunPlatform: ${row.platform}`);
    }
    const contentKind =
      row.contentKind == null || row.contentKind === ''
        ? null
        : isContentKind(row.contentKind)
          ? row.contentKind
          : (() => {
              throw new Error(
                `Run.contentKind is not a ContentKind: ${row.contentKind}`,
              );
            })();
```

`platform: row.platform` (już `RunPlatform`). Nie `as SocialPlatform`.

`RunRow` type: dodaj `contentKind: string | null`, `outlineRefineCount: number`, `copyRefineCount: number`.

Wszystkie `makeRun` / `RunRecord` w testach: `contentKind: null`, `outlineRefineCount: 0`, `copyRefineCount: 0` (Social). `pipelinePhase` Social fixture’ów bez zmian.

**DoD (krok):**

- Migracja w repo; page tabele + `Run.contentKind` + `outlineRefineCount` / `copyRefineCount` (default 0).
- Social run: `contentKind` null; `platform` z enumu SM (gdy powstanie — KROK 6); kolumny refine Social nietknięte semantyka.
- Adapter mapuje `taskType` / `platform` / `contentKind` przez `is*`, nie goły `as`.

---

### KROK 3 — Domain Content + port `ContentResultStore`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt BC bez LangGraph i bez Nest. Major 4.2.2 (fundament domain).

**Artefakty (nowe):**

- `apps/api/src/content/domain/content.types.ts`
- `apps/api/src/content/domain/refine-policy.ts`
- `apps/api/src/content/domain/refine-policy.spec.ts`
- `apps/api/src/content/domain/content-result.port.ts`

#### Nowy plik — `content.types.ts`

```typescript
import type { CompanyContext } from '../../company-context/domain/company-context.types';
import type { RunBrief } from '../../runs/domain/run.types';
import type {
  ContentKind,
  ContentLanguage,
  ConversationId,
  ContentTaskType,
  RunId,
} from '@content-chain/shared';

export type ContentPipelinePhase = 'outline' | 'copy';

export type PageOutlineSection = {
  id: string;
  heading: string;
  summary: string;
};

export type PageOutline = {
  id: string;
  title: string;
  sections: PageOutlineSection[];
};

export type PageDocument = {
  title: string;
  lead: string;
  body: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type VerifierVerdict = {
  ok: boolean;
  contextIssues: string[];
  languageIssues: string[];
};

export type ContentPipelineState = {
  phase: ContentPipelinePhase | null;
  outlineRefineCount: number;
  copyRefineCount: number;
};

export type ContentPipelineOutcome =
  | {
      kind: 'completed';
      outline: PageOutline | null;
      document: PageDocument | null;
    }
  | { kind: 'awaiting_hitl'; outline: PageOutline }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };

export type ContentPipelineInput = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: ContentTaskType;
  contentKind: ContentKind;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: ContentPipelinePhase;
  company: CompanyContext;
  outline: PageOutline | null;
  document: PageDocument | null;
};
```

Id outline / sekcji: prefiks `outl_` / `osec_` + uuid w węźle — **bez** nowego brandu w shared.

#### Nowy plik — `refine-policy.ts`

Kopia 1:1 `apps/api/src/social/domain/refine-policy.ts` (`MAX_REFINE = 2`, `canRefine`, `nextRefineCount`). **Nie** importować z `social/`. **Nie** wyciągać do `shared/llm` — polityka limitu refine zostaje w `domain/` BC (`SPEC-SOCIAL.md` / `SPEC-CONTENT.md` drzewo `domain/`).

`refine-policy.spec.ts` — analogia Social (canRefine 0/1 true, 2 false; nextRefineCount; REFINE_EXHAUSTED).

#### Nowy plik — `content-result.port.ts`

```typescript
import type { RunId } from '@content-chain/shared';
import type {
  ContentPipelineState,
  PageDocument,
  PageOutline,
  VerifierVerdict,
} from './content.types';

export const CONTENT_RESULT_STORE = Symbol('CONTENT_RESULT_STORE');

export interface ContentResultStore {
  replaceOutline(runId: RunId, outline: PageOutline): Promise<void>;
  replaceDocument(
    runId: RunId,
    document: PageDocument,
    verification: VerifierVerdict,
  ): Promise<void>;
  getOutline(runId: RunId): Promise<PageOutline | null>;
  getDocument(runId: RunId): Promise<{
    document: PageDocument;
    verification: VerifierVerdict | null;
  } | null>;
  savePipelineState(runId: RunId, state: ContentPipelineState): Promise<void>;
  getPipelineState(runId: RunId): Promise<ContentPipelineState>;
}
```

`savePipelineState` mapuje domain **1:1** na `outlineRefineCount` / `copyRefineCount` (Ctn-10). **Nie** na `ideasRefineCount` / `contentRefineCount`.

**DoD (krok):**

- Domain kompletny; port bez Prisma.
- Unit refine zielony.
- Brak importu Social.

---

### KROK 4 — Refaktor: kernel hopu LLM do `apps/api/src/shared/llm/`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna implementacja `parseLlmJson` / `LlmHopService` / `loadPrompt`+`renderPrompt`, zanim powstanie graf Content. Refaktor względem: Faza 4 / żywy `social/infrastructure/graph/llm-hop.ts`, `social/application/parse-llm-json.ts`, `social/infrastructure/prompts/load-prompt.ts`. Content **nie** kopiuje tych plików (KROK 5). `refine-policy` **poza** tym krokiem (zostaje w `domain/` — KROK 3).

Norma: `apps/api/src/shared/` = cross-cutting api, nie reguły Social (`docs/dictionary.md`, `SPEC-MONOREPO.md` M-8). Hop to transport + parse + log przez port lifecycle — nie domena SM. Szablony `.prompt.md` zostają w BC (S-2 / Ctn-2). `LlmModule` bez zmian (port gateway only).

**Artefakty:**

- Nowy: `apps/api/src/shared/llm/parse-llm-json.ts` (przeniesienie 1:1)
- Nowy: `apps/api/src/shared/llm/llm-hop.ts` (przeniesienie klasy; import `parseLlmJson` z `./parse-llm-json`)
- Nowy: `apps/api/src/shared/llm/load-prompt.ts` (`loadPromptFromDir` + `renderPrompt`)
- Zmiana: Social importy hop / parse / cienki binder promptów
- Usunięcie: `apps/api/src/social/application/parse-llm-json.ts`, `apps/api/src/social/infrastructure/graph/llm-hop.ts` (po podmianie importów)
- Przeniesienie speca: `llm-hop.spec.ts` obok nowej klasy (albo zostaw w social z nowym importem — byle jedna klasa)

**Kolejność:** parse → hop → loader → importy Social → `pnpm --filter api test` (unit hop + schemy + węzły).

#### `parse-llm-json.ts`

Przenieś 1:1 z `social/application/`. `social.schemas.spec.ts`: `from '../../shared/llm/parse-llm-json'` (albo ścieżka względna poprawna z `application/`).

#### `llm-hop.ts`

Ta sama klasa `LlmHopService` (`@Injectable()`, `chatJson`, retry, `RUN_LIFECYCLE`). Import `parseLlmJson` z `./parse-llm-json`. Ścieżki do `llm/` i `runs/domain` z `shared/llm/` = `../../llm/...`, `../../runs/domain/...`.

`SocialModule` / `social-pipeline.facade.ts` / `social.graph.ts` / węzły / `llm-hop.spec.ts`: import klasy z `../../shared/llm/llm-hop` (węzły: `../../../shared/llm/llm-hop`). **`providers: [LlmHopService]` zostaje w `SocialModule`** — nie dodawać hopu do `LlmModule`.

#### `load-prompt.ts` (shared)

```typescript
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadPromptFromDir(
  directory: string,
  fileName: string,
): string {
  return readFileSync(join(directory, fileName), 'utf-8');
}

export function renderPrompt(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => vars[key] ?? '',
  );
}
```

`directory` na granicy FS = `string` (Node), nie `any`.

#### Cienki binder Social (zostaje w BC)

`apps/api/src/social/infrastructure/prompts/load-prompt.ts` — **nie** kopiuj `readFileSync`+regex. Bind `__dirname` katalogu promptów:

```typescript
import { loadPromptFromDir, renderPrompt } from '../../../shared/llm/load-prompt';

export { renderPrompt };

export function loadPrompt(fileName: string): string {
  return loadPromptFromDir(__dirname, fileName);
}
```

Węzły Social **bez** zmiany importu `from '../../prompts/load-prompt'`. `nest-cli.json` nadal kopiuje `**/*.prompt.md` przy BC.

**Testy:** istniejący `llm-hop.spec.ts` zielony po nowym imporcie. Unit loader: `renderPrompt` podmienia `{{language}}`; brak `{{brak}}` → pusty string (jak dziś). Regresja węzłów ideation/verifier (ścieżka pliku promptu).

**DoD (krok):**

- Jedna klasa `LlmHopService` w `shared/llm/`; Social jej używa; brak drugiej kopii w `social/infrastructure/graph/`.
- `parseLlmJson` tylko w `shared/llm/`.
- Algorytm loadera w `shared/llm`; BC tylko binduje katalog promptów.
- `LlmModule` bez `RunLifecycleModule` i bez `LlmHopService`.
- Unit Social (hop, schemy, węzły) zielone. Brak katalogu `content/` w tym kroku (poza już istniejącym domain z KROK 3).

---

### KROK 5 — Moduł `apps/api/src/content/` (graf, prompty, fasada, executor)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pełny BC analogiczny do Social. Major 4.2.2; Ctn-1…Ctn-10. Kernel hopu już w `shared/llm/` (KROK 4).

**Artefakty (nowe, kompletne):** drzewo z SPEC. Hop / parse / loader — import z `shared/llm`, nie kopia.

**Kolejność:** schemy/prompty → binder `load-prompt` Content → węzły (hop z shared) → graf → persist adapter → fasada → executor → module.

#### Nowy plik — `apps/api/src/content/application/content.schemas.ts`

```typescript
import { z } from 'zod';

export const pageOutlineSectionSchema = z.object({
  id: z.string().min(1).optional(),
  heading: z.string().min(1),
  summary: z.string().min(1),
});

export const pageOutlineOutputSchema = z.object({
  title: z.string().min(1),
  sections: z.array(pageOutlineSectionSchema).min(1),
});

export const pageDocumentOutputSchema = z.object({
  title: z.string().min(1),
  lead: z.string().min(1),
  body: z.string().min(1),
  metaTitle: z.string().min(1).optional(),
  metaDescription: z.string().min(1).optional(),
});

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNonEmptyString(
  record: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = record[key];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function coerceVerifierIssue(value: unknown): unknown {
  if (typeof value === 'string') return value;
  if (!isPlainRecord(value)) return value;
  const itemId =
    readNonEmptyString(value, 'itemId') ?? readNonEmptyString(value, 'item');
  const issue = readNonEmptyString(value, 'issue');
  const quote = readNonEmptyString(value, 'quote');
  const parts = [itemId, quote, issue].filter(
    (part): part is string => part != null,
  );
  return parts.length > 0 ? parts.join(' — ') : value;
}

const verifierIssueSchema = z.preprocess(coerceVerifierIssue, z.string());

export const verifierOutputSchema = z.object({
  ok: z.boolean(),
  contextIssues: z.array(verifierIssueSchema).default([]),
  languageIssues: z.array(verifierIssueSchema).default([]),
});

export type PageOutlineOutput = z.infer<typeof pageOutlineOutputSchema>;
export type PageDocumentOutput = z.infer<typeof pageDocumentOutputSchema>;
```

`content.schemas.spec.ts` — parse outline/document; coerce verifier jak Social; `null` w tablicy issues → `STRUCTURED_OUTPUT_INVALID`.

#### Prompty (nowe pliki)

`apps/api/src/content/infrastructure/prompts/load-prompt.ts` — **ten sam binder co Social** (`loadPromptFromDir(__dirname, fileName)` + re-export `renderPrompt` z `shared/llm/load-prompt`). Szablony `.prompt.md` tylko tutaj (Ctn-2). Zakaz drugiej kopii `readFileSync`+regex.

**`page-outline.prompt.md`**

```markdown
Jesteś OutlineAgent — szkicujesz strukturę strony (blog / service_page / landing). Nie piszesz pełnego copy.
(ścieżka content: page_outline)

Język: {{language}}.
Rodzaj strony (contentKind): {{contentKind}}.

Kontekst firmy (JSON):
{{company}}

Brief (JSON):
{{brief}}

## Zadanie

Zwróć szkic: `title` + `sections` (każda: `heading`, `summary` 1–2 zdania). Jedna spójna narracja pod `contentKind`. Fakty wyłącznie z kontekstu i briefu.

## Zakazy

- Nie wymyślaj usług, liczb ani case’ów spoza JSON.
- Nie pisz pełnych akapitów body — to faza outline.
- Nie odwołuj się do plików repo.

## Wyjście

WYŁĄCZNIE JSON:

{"title":"...","sections":[{"heading":"...","summary":"..."}]}
```

**`page-writer.prompt.md`**

```markdown
Jesteś PageWriterAgent — piszesz dokument strony (title, lead, body, opcjonalnie meta).
(ścieżka content: page_copy)

Język: {{language}}.
Rodzaj strony: {{contentKind}}.

Kontekst firmy (JSON):
{{company}}

Brief (JSON):
{{brief}}

Zaakceptowany outline (JSON; może być pusty przy page_copy bez HITL):
{{outline}}

## Zadanie

Napisz jeden dokument. Jeśli outline niepusty — zrealizuj jego sekcje. Jeśli pusty — struktura z brief.topic + contentKind. CTA / oferty wyłącznie z kontekstu.

## Wyjście

WYŁĄCZNIE JSON:

{"title":"...","lead":"...","body":"...","metaTitle":"...","metaDescription":"..."}
```

**`refine-page-outline.prompt.md`** / **`refine-page-document.prompt.md`** — analogia refine Social: wejście JSON + zarzuty; wyjście ten sam kształt co outline/document. Marker `(ścieżka content: page_outline)` / `(ścieżka content: page_copy)`.

**`verifier.prompt.md`** — ten sam układ S-4 co Social (dwa obszary, string issues), payload = outline albo dokument. **Bez** zakazu „to posty”. Marker niepotrzebny (fake LLM i tak łapie ConsistencyVerifier).

#### `LlmHopService` w Content — bez kopii pliku

**Nie** twórz `content/infrastructure/graph/llm-hop.ts`. Węzły i fasada importują `LlmHopService` z `apps/api/src/shared/llm/llm-hop.ts`. `ContentModule`: `providers: [LlmHopService, …]` (osobna instancja Nest; `LlmModule` bez hopu). Zakaz importu `SocialModule` / `social/infrastructure`.

#### State + graf

`state.ts`:

```typescript
export type ContentGraphState = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: ContentTaskType;
  contentKind: ContentKind;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: ContentPipelinePhase;
  company: CompanyContext | null;
  outline: PageOutline | null;
  document: PageDocument | null;
  verdict: VerifierVerdict | null;
  outlineRefineCount: number;
  copyRefineCount: number;
  failedCode: string | null;
  failedMessage: string | null;
};
```

`content.graph.ts` — `StateGraph` jak Social; węzły: `loadContext`, `normalizeBrief`, `outlineAgent`, `pageWriterAgent`, `consistencyVerifier`, `refineOutline`, `refineDocument`, `persistOutline`, `persistDocument`, `failRun`.

```typescript
function routeAfterNormalizeBrief(
  state: ContentGraphState,
): 'pageWriterAgent' | 'outlineAgent' {
  return state.phase === 'copy' ? 'pageWriterAgent' : 'outlineAgent';
}

function routeAfterConsistencyVerifier(
  state: ContentGraphState,
):
  | 'failRun'
  | 'persistDocument'
  | 'persistOutline'
  | 'refineDocument'
  | 'refineOutline' {
  if (state.failedCode) return 'failRun';
  if (state.verdict?.ok) {
    return state.phase === 'copy' ? 'persistDocument' : 'persistOutline';
  }
  const attempts =
    state.phase === 'copy'
      ? state.copyRefineCount
      : state.outlineRefineCount;
  if (canRefine(attempts)) {
    return state.phase === 'copy' ? 'refineDocument' : 'refineOutline';
  }
  return 'failRun';
}
```

`compileContentGraph` — `compile()` bez checkpoinetera. `START → loadContext → normalizeBrief` + conditional jak wyżej.

#### Węzły (wzorzec Social, pełna semantyka)

- `load-context.node.ts` — `context.get()` → `{ company }` (port `CompanyContextRepository`).
- `normalize-brief.node.ts` — `topic.trim()`, `ideaCount` default 5 (nieużywane w copy, nieszkodliwe).
- `outline.node.ts` — hop `OutlineAgent`, `pageOutlineOutputSchema`, id `outl_${uuid}` / sekcje `osec_${uuid}`.
- `page-writer.node.ts` — hop `PageWriterAgent`; `outline` w prompcie = `JSON.stringify(state.outline)` albo instrukcja „brak outline — pisz z brief”.
- `verifier.node.ts` — payload `phase === 'copy' ? document : outline`.
- `refine-outline.node.ts` / `refine-document.node.ts` — `nextRefineCount` na odpowiednim liczniku.
- `persist-outline.node.ts` / `persist-document.node.ts`.
- `fail-run.node.ts` — `VERIFIER_FAILED` jak Social.

#### Adapter — `prisma-content-result.adapter.ts`

Analogia Social: `deleteMany` + `create` / `createMany`; PK dokumentu `cdoc_${uuid}`; outline PK = `outline.id`.

`savePipelineState`:

```typescript
        pipelinePhase: state.phase,
        outlineRefineCount: state.outlineRefineCount,
        copyRefineCount: state.copyRefineCount,
```

Update **tylko** tych pól — bez `ideasRefineCount` / `contentRefineCount`.

`getPipelineState`: `phase` tylko `'outline' | 'copy'` (inaczej `null`); liczniki z `outlineRefineCount` / `copyRefineCount` (nie z kolumn Social).

#### Fasada — `content-pipeline.facade.ts`

`invokePhase(run, phase, extras)` → `compileContentGraph`. `toOutcome`:

- `failedCode` → `failed`
- `phase === 'outline' && taskType === 'page_outline_then_copy'` → `awaiting_hitl`
- inaczej `completed`

Guard: `isContentTaskType(run.taskType)`; `contentKind` z `run.contentKind` (null → `failed` `CONTENT_KIND_REQUIRED` albo nie wołać — StartRun zawsze ustawia, KROK 6).

#### Executor — `content-run.executor.ts`

`implements RunExecutorPort`. `resolvePhase(run, storedPhase)`:

```typescript
    if (run.taskType === 'page_copy') return 'copy';
    if (
      run.taskType === 'page_outline_then_copy' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'copy';
    }
    if (storedPhase) return storedPhase;
    return 'outline';
```

Kolejność jak żywy Social (force taskType **przed** `storedPhase`).

Przed `resolvePhase` / fasadą — guard selekcji (pas poza HTTP):

```typescript
    if (
      run.taskType === 'page_outline_then_copy' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      const outline = await this.resultStore.getOutline(run.id);
      const valid =
        outline != null &&
        run.selectedIdeaIds.length === 1 &&
        run.selectedIdeaIds[0] === outline.id;
      if (!valid) {
        await this.lifecycle.transition(run, 'failed', {
          failedCode: 'HITL_INVALID_SELECTION',
          failedMessage: 'selectedIdeaIds must be exactly [outline.id]',
        });
        return;
      }
    }
```

Ścieżka happy: HTTP już odrzucił mismatch, więc ten `failed` to tylko omijanie HITL (np. śmieć w DB). Recovery HITL: `page_outline_then_copy` + `getOutline` nie-null + brak selekcji → `awaiting_hitl` z `hitlOptions: [outline]` (bez fasady).

`resultSummary`: `'outline'` / `'pageDocument'`.

`contentKind` null na `RunRecord` przy page → `transition failed` kod `CONTENT_KIND_REQUIRED` (nie powinno się zdarzyć po KROK 6).

#### `content.module.ts`

Import `LlmHopService` z `../../shared/llm/llm-hop` (nie z `social/`).

```typescript
@Module({
  imports: [RunLifecycleModule, LlmModule, CompanyContextModule],
  providers: [
    { provide: CONTENT_RESULT_STORE, useClass: PrismaContentResultAdapter },
    LlmHopService,
    ContentPipelineFacade,
    ContentRunExecutor,
  ],
  exports: [ContentRunExecutor, CONTENT_RESULT_STORE],
})
export class ContentModule {}
```

Bez `controllers[]`. Bez `SocialModule` / `RunsModule`.

**Testy (unit):**

- `content-pipeline.facade.spec.ts` — `toOutcome` analogia Social (HITL tylko `page_outline_then_copy` + outline).
- `content-run.executor.spec.ts` — analogia `social-run.executor.spec.ts` dla `page_copy`, `page_outline_then_copy` (force copy, storedPhase, HITL skip facade, failed mapping). Plus: `then_copy` + `selectedIdeaIds: ['wrong']` + outline w store → `failed` `HITL_INVALID_SELECTION`, fasada nie wołana.
- Węzeł outline: id gdy model pominie; hop `OutlineAgent`.
- Persist outline woła `replaceOutline`, nie document.

**DoD (krok):**

- Moduł eksportuje `ContentRunExecutor` + store.
- `compile()` bez checkpoinetera; refine N=2.
- Unit fasady + executor analogiczne do Social.
- Content nie importuje Social.

---

### KROK 6 — Klej composite, Zod unia startu, snapshot, lista

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jeden worker, dwa BC; HTTP otwiera `page_*` dopiero tu. Major 4.2.1 (walidacja — **przesunięta**) + 4.2.3; R-3d / R-3e / R-3f.

**Artefakty:**

- Nowy: `apps/api/src/shared/assert-never.ts` (jeśli użyty) **albo** gałąź `UNKNOWN_TASK_TYPE` na `string`
- Nowy: `apps/api/src/runs/application/run-dispatch.executor.ts`
- Nowy: `apps/api/src/runs/application/run-dispatch.executor.spec.ts`
- Nowy: `apps/api/src/runs/application/composite-run-result.reader.ts`
- Zmiana: `apps/api/src/app.module.ts`
- Zmiana: `apps/api/src/runs/application/run.schemas.ts`
- Zmiana: `apps/api/src/runs/application/start-run.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/http/dto/start-run.dto.ts`
- Zmiana: `apps/api/src/runs/http/dto/list-runs-query.dto.ts`
- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/application/list-runs.use-case.ts`
- Zmiana: `apps/api/src/runs/domain/run-result-reader.port.ts`
- Zmiana: `apps/api/src/runs/infrastructure/empty-run-result.reader.ts`
- Zmiana: `apps/api/src/runs/application/resume-hitl.use-case.ts` (+ spec)
- Zmiana: `apps/api/src/runs/domain/run.port.ts` (`ListRunsQuery.platform: RunPlatform`)

#### Nowy plik — `run-dispatch.executor.ts`

```typescript
import { isContentTaskType, isSocialTaskType } from '@content-chain/shared';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunLifecyclePort } from '../domain/run-lifecycle.port';
import type { RunRecord } from '../domain/run.types';

export class RunDispatchExecutor implements RunExecutorPort {
  constructor(
    private readonly social: RunExecutorPort,
    private readonly content: RunExecutorPort,
    private readonly lifecycle: RunLifecyclePort,
  ) {}

  async execute(run: RunRecord): Promise<void> {
    if (isSocialTaskType(run.taskType)) {
      return this.social.execute(run);
    }
    if (isContentTaskType(run.taskType)) {
      return this.content.execute(run);
    }
    await this.lifecycle.transition(run, 'failed', {
      failedCode: 'UNKNOWN_TASK_TYPE',
      failedMessage: `Unknown taskType: ${String(run.taskType)}`,
    });
  }
}
```

D-19 unit: `execute` z obiektem `RunRecord` i `taskType` poszerzonym na granicy testu:

```typescript
function runWithUnknownTask(): RunRecord {
  return {
    ...makeRun(),
    // D-19: persistence garbage poza unią RunTaskType — testuje fail-closed composite.
    taskType: 'legacy_blog' as RunRecord['taskType'],
  };
}
```

Uzasadnienie `as`: produkcja nie konstruuje takiego `RunRecord`; HTTP odcina Zod (400). Test musi wejść w gałąź default.

Trzy testy dispatchera: social (`post_ideas`) woła tylko social; `page_copy` tylko content; unknown → `failed` / `UNKNOWN_TASK_TYPE`, żaden executor.

#### Nowy plik — `composite-run-result.reader.ts`

Implementuje `RunResultReader`: deleguje list/get Social do store Social, page do store Content. Nie importuje grafów.

Rozszerz `RunResultReader` (po 4.1 reel):

```typescript
  getPageOutline(runId: RunId): Promise<PageOutline | null>;
  getPageDocument(runId: RunId): Promise<{
    document: PageDocument | null;
    verification: VerifierVerdict | null;
  } | null>;
```

Import typów Content z `content/domain` — Runs reader **już** zależy od typów Social; analogicznie Content. **Nie** importować `ContentModule`.

`EmptyRunResultReader`: `getPageOutline → null`, `getPageDocument → null`.

#### Refaktor — `AppModule`

```typescript
    SocialModule,
    ContentModule,
    RunsModule.registerAsync({
      imports: [SocialModule, ContentModule, RunLifecycleModule],
      inject: [SocialRunExecutor, ContentRunExecutor, RUN_LIFECYCLE],
      useFactory: (
        social: SocialRunExecutor,
        content: ContentRunExecutor,
        lifecycle: RunLifecyclePort,
      ): RunExecutorPort =>
        new RunDispatchExecutor(social, content, lifecycle),
      resultReader: {
        inject: [SOCIAL_RESULT_STORE, CONTENT_RESULT_STORE],
        useFactory: (
          social: SocialResultStore,
          content: ContentResultStore,
        ): RunResultReader =>
          new CompositeRunResultReader(social, content),
      },
    }),
```

`RunsModule` statyczny **bez** importu Social/Content. Brak `forwardRef`.

#### Zod — `run.schemas.ts`

**Teraz:** `z.object({ taskType: z.enum(RUN_TASK_TYPES), platform: z.enum(SOCIAL_PLATFORMS), … })`.

**Zamień na** (Context7 `discriminatedUnion` + `.strict()`):

```typescript
const socialStartRunSchema = z
  .object({
    taskType: z.enum(SOCIAL_TASK_TYPES),
    platform: z.enum(SOCIAL_PLATFORMS),
    language: z.enum(CONTENT_LANGUAGES),
    brief: runBriefSchema,
    selectedIdeaIds: z.array(z.string()).optional(),
  })
  .strict();

const pageStartRunSchema = z
  .object({
    taskType: z.enum(CONTENT_TASK_TYPES),
    contentKind: z.enum(CONTENT_KINDS),
    language: z.enum(CONTENT_LANGUAGES),
    brief: runBriefSchema,
  })
  .strict();

export const startRunCommandSchema = z.discriminatedUnion('taskType', [
  socialStartRunSchema,
  pageStartRunSchema,
]);
```

`.strict()` na page odrzuca `platform: 'linkedin'` **oraz** `selectedIdeaIds`. Na social odrzuca `contentKind`. `taskType` spoza enumów → Zod fail → `VALIDATION_FAILED` (D-19 HTTP).

Unit: plik `run.schemas.spec.ts` (nowy) — page bez platform OK; page + linkedin fail; page + `selectedIdeaIds` fail; post bez platform fail; post + contentKind fail; `taskType: 'nope'` fail.

#### `StartRunCommand` + use-case

Unia dyskryminowana TS jak w założeniach. `execute`:

```typescript
    const parsedCommand = parseWithZod(startRunCommandSchema, command);
    // gate completeness bez zmian
    const isPage = isContentTaskType(parsedCommand.taskType);
    const run: RunRecord = {
      // …
      taskType: parsedCommand.taskType,
      platform: isPage ? 'web' : parsedCommand.platform,
      contentKind: isPage ? parsedCommand.contentKind : null,
      outlineRefineCount: 0,
      copyRefineCount: 0,
      // ideasRefineCount / contentRefineCount nadal 0 jak dziś
      // …
    };
```

Narrowing: w gałęzi `isPage` Zod daje `contentKind`; w social — `platform`. Nie używać `as`.

Testy start-run: page_copy persist `platform: 'web'`, `contentKind: 'blog'`; social nadal `contentKind: null`; page + platform w command → VALIDATION_FAILED.

#### DTO HTTP

`StartRunDto`: `@IsIn([...RUN_TASK_TYPES])`; `platform` `@IsOptional() @IsIn([...SOCIAL_PLATFORMS])`; `contentKind` `@IsOptional() @IsIn([...CONTENT_KINDS])`. **Nie** wymagaj platformy na DTO — Zod jest bramką.

`ListRunsQueryDto`: `taskType` `RUN_TASK_TYPES`; `platform` `RUN_PLATFORMS` (w tym `web`).

#### GetRun / lista

GetRun: `contentKind: run.contentKind`; `result.pageOutline` / `pageDocument`; HITL:

```typescript
    const hitlOptions =
      run.taskType === 'reel_ideas_then_scripts'
        ? reelIdeas
        : run.taskType === 'page_outline_then_copy'
          ? outline == null
            ? []
            : [outline]
          : ideas;
```

Lista: dopisz `contentKind: item.contentKind` do mapowania (docs).

#### Refaktor — `ResumeHitlUseCase`

Po guardzie `awaiting_hitl`, **przed** `saveSelectedIdeaIds`:

```typescript
    if (run.taskType === 'page_outline_then_copy') {
      const outline = await this.results.getPageOutline(run.id);
      if (outline == null) {
        throw new DomainException(
          'CONFLICT',
          'Page outline is missing',
          409,
        );
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
    }
```

Wstrzyknij `RUN_RESULT_READER` (ten sam co GetRun). **Nie** importuj `ContentModule`. Unit: mismatch → 400, `saveSelectedIdeaIds` nie wołane, worker nie notyfikowany; match → jak dziś.

**DoD (krok):**

- SocialModule nie importuje ContentModule; RunsModule nie importuje grafów.
- HITL page: `awaiting_hitl` + options z outline; resume tylko `[outline.id]`; obce id → 400, status bez zmian.
- Unit dispatchera: social vs content vs default.
- Page run: DB `platform='web'`, `contentKind` ustawione.
- Nieznany `taskType` HTTP → 400, composite nie wołany.

---

### KROK 7 — Testy D-17/D-18/D-19, Postman Content, regresja Social

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 4.2.4; Milestone 4.2 DoD testowe.

**Artefakty:**

- Zmiana: `apps/api/test/fake-llm-gateway.ts`
- Nowy: `apps/api/test/content-pipeline.e2e-spec.ts`
- Zmiana: `apps/api/test/social-pipeline.e2e-spec.ts` (`wipeRuns` kasuje tabele Content)
- Nowy: `apps/api/test/postman/content-pipeline.postman-collection.json`
- Zmiana: `apps/api/test/postman/README.md`
- Unit Zod / dispatcher / GetRun / ResumeHitl z KROK 6

#### Fake LLM

```typescript
export function pageOutlineJson(): string {
  return JSON.stringify({
    title: 'Audyt w 10 dni',
    sections: [
      { heading: 'Problem', summary: 'Chaos ops po seedzie.' },
      { heading: 'Oferta', summary: 'Audyt procesów Acme.' },
    ],
  });
}

export function pageDocumentJson(): string {
  return JSON.stringify({
    title: 'Audyt procesów',
    lead: 'Founderzy odzyskują czas.',
    body: 'Pełny tekst strony na bazie briefu i kontekstu.',
    metaTitle: 'Audyt procesów Acme',
    metaDescription: 'Przegląd ops w 10 dni.',
  });
}
```

`inferReply`: **przed** gałęzią postów:

```typescript
  if (userContent.includes('(ścieżka content: page_copy)')) {
    return pageDocumentJson();
  }
  if (userContent.includes('(ścieżka content: page_outline)')) {
    return pageOutlineJson();
  }
```

Verifier OK jak dotychczas (ConsistencyVerifier).

#### E2E `content-pipeline.e2e-spec.ts`

Setup jak Social: `deployTestDb`, override `LLM_GATEWAY_PORT`, `PUT` kontekstu.

`wipeRuns`: `contentDocument`, `contentOutline`, potem reel/social/runLog/run.

**D-17** `page_copy`: skrypt `[pageDocumentJson(), verifierOk()]`; `POST` `{ taskType, contentKind: 'blog', language: 'pl', brief }` **bez** `platform`; 202; `completed`; `result.pageDocument.title`; `contentKind === 'blog'`; `platform === 'web'`; hop logi `PageWriterAgent` + `ConsistencyVerifier`; brak sekretu.

**D-18** `page_outline_then_copy`: outline+verifier → `awaiting_hitl`; `hitl.options[0].id`; HITL z tym id; document+verifier → `completed` + `pageDocument.body`. Negatyw: `POST .../hitl` z `['not-the-outline-id']` → 400 `HITL_INVALID_SELECTION`; GET snapshot nadal `awaiting_hitl`.

**D-19 HTTP:** `POST` `{ taskType: 'not-a-task', platform: 'linkedin', language: 'pl', brief }` → 400 `VALIDATION_FAILED`.

**Walidacja unii:** `page_copy` + `platform: 'linkedin'` → 400. Lista `GET /runs?taskType=page_copy` oraz `?platform=web`.

**Refine (e2e skrót):** verifier fail raz + refine document + OK — opcjonalnie w tym pliku (major: refine w e2e). Minimum: jeden test refine N=1 sukces i jeden fail po 2 (jak D-6).

Korelacja: `conversationId` stały, `requestId` fake w logu.

#### Social e2e

`wipeRuns` w `social-pipeline.e2e-spec.ts` też kasuje Content (FK). D-4…D-8 / D-15/D-16 bez regresji.

#### Postman — nowy plik `content-pipeline.postman-collection.json`

Kolekcja v2.1: zmienna `baseUrl` jak Social. Foldery:

- **Setup** — te same PUT/GET completeness (można skopiować body z kolekcji Social).
- **A. page_copy** — POST bez `platform`, z `contentKind: "blog"`; poll `completed`; `result.pageDocument.body`; logi.
- **B. page_outline_then_copy** — poll `awaiting_hitl`; `ideaId` z `hitl.options[0].id` albo `result.pageOutline.id`; HITL; poll `completed` + `pageDocument`.

#### README Postman

Dopisz drugą kolekcję. Tabela: Social A–D (z planu 4.1) + Content A/B. Setup obu = `PUT /company-context`. Newman: dwa `npx newman run …`.

**DoD (krok):**

- Unit + e2e zielone (D-17, D-18, D-19 + regresja Social A–D / D-4, D-5, D-15…D-16).
- Postman Content + Social A–D opisane w README.
- Faza 9 nie startuje (Zod 3 w `apps/api/package.json`).

---

## Weryfikacja wycinka

| Kryterium | Gdzie |
|-----------|--------|
| `page_copy` / `page_outline_then_copy` Jest + Postman | KROK 7 D-17/D-18, kolekcja Content |
| Posty i rolki bez regresji | KROK 7 e2e Social |
| HTTP nieznany `taskType` → 400; composite `UNKNOWN_TASK_TYPE` | KROK 6–7 D-19 |
| Klej: dwa BC, jeden worker; graf Nest acykliczny | KROK 6 |
| Page: `platform='web'`, `contentKind` ustawione | KROK 6–7 |
| Refine page: kolumny `outlineRefineCount` / `copyRefineCount` (nie reuse Social) | KROK 2–3, 5; Ctn-10 |
| HITL page: tylko `[outline.id]`; obce id → 400 | KROK 5–7; Ctn-5 / R-3f |
| Kernel hopu w `shared/llm/` (bez kopii w Content) | KROK 4–5 |
| Zod 3 | cały plik |
| MILESTONE 4.2 DoD | poniżej — po implementacji **obu** feature planów |

---

## Ślad do major (informacyjnie, poza tym skillem)

Po implementacji **tego** pliku **oraz** zatwierdzonego planu rolek:

- Faza 4.2 i kroki 4.2.1–4.2.4 → `WYKONANY`
- MILESTONE 4.2 → `OSIĄGNIĘTY` gdy: DoD 4.1 i 4.2 spełnione; Postman Social A–D + Content A–B (żywy gateway); Jest e2e D-4, D-5, D-15…D-18; klej dwa BC / jeden worker; graf Nest acykliczny

Faza 5 (Auth) nie startuje z tego skilla.

---

## Pass rozwojowy (ten plik)

Przesunięcia (zatwierdzone przed hierarchią, tu utrwalone):

1. `SocialTaskType` + zawężenie Social **przed** użytkiem `page_*` w Social (KROK 1).
2. Zod `discriminatedUnion` + otwarcie HTTP `page_*` **w KROK 6** (z klejem), nie w KROK 2 — inaczej 202 poszłoby do samego `SocialRunExecutor`.
3. Kernel `parseLlmJson` / hop / loader w `shared/llm/` **przed** grafem Content (KROK 4); Content importuje, nie kopiuje (KROK 5). `refine-policy` zostaje w `domain/` (KROK 3).
4. Osobne kolumny `outlineRefineCount` / `copyRefineCount` zamiast reuse `ideasRefineCount` / `contentRefineCount` (Ctn-10 / P-5 v4) — KROK 2–3, 5.
5. HITL page: walidacja `[outline.id]` na `ResumeHitlUseCase` + zakaz `selectedIdeaIds` na starcie `page_*` (Ctn-5 v3 / R-3f v10) — KROK 5–7.

Kolejność faz major bez zmian: 4.1 (osobny plik) przed 4.2.
