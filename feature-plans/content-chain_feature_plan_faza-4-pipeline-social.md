# Content Chain — feature plan: pipeline Social (ideas / content)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-4-pipeline-social.md`  
**Kotwica major:** Faza 4 (kroki 4.1–4.3) + MILESTONE 4.  
**Źródła:** `docs/data_flow.md`, `docs/dokumentacja_komunikacji.md`, `docs/architektura.md`, `docs/architektura_katalogi_pliki.md`, `docs/brand_types.md`, `SPEC-SOCIAL.md`, `SPEC-RUNY.md` (R-4, R-6, R-9), `SPEC-KOMUNIKACJA.md` (K-5, K-7), `SPEC-PERSISTENCE.md` (P-1, P-4, P-7), `SPEC-TESTY.md` (D-4…D-8).  
**Kolejność** `KROK` **w tym pliku ≠ etykietom major 4.1 / 4.2 / 4.3** — pass rozwojowy: porty → Zod → prompty → zależności → węzły → graf → Prisma → snapshot/SSE → executor → testy → Postman.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---



## Meta


| Pole                             | Wartość                                                                                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Wycinek                          | Cała Faza 4 majoru + dowód Milestone 4 (Postman, obie ścieżki)                                                                                                                                   |
| Major                            | Faza 4 / 4.1–4.3; start po Fazie 7 i Fazie 8 (`WYKONANY`) oraz Milestone 3 (`OSIĄGNIĘTY`)                                                                                                        |
| Poza zakresem                    | Faza 5 (auth cookie), Faza 6 (`userRating` / opinie), UI HITL, checkpointer LangGraph, `LanguageQualityVerifier`, vendor SDK LLM (`ChatOpenAI` itd.), kolekcja Postman dla samego `post_content` |
| Po implementacji (informacyjnie) | Major: Faza 4 i kroki 4.1–4.3 → `WYKONANY`; MILESTONE 4 → `OSIĄGNIĘTY`. Edycja major **poza** tym skillem                                                                                        |


---



## Założenia

- HTTP startu i HITL **zostaje** w BC Runs (`POST /runs`, `POST .../hitl`). `social.controller.ts` bez nowych tras. Fasada Social jest wołana z `RunExecutorPort`, nie z controllera (`SPEC-SOCIAL.md` S-1).
- Jeden skompilowany graf LangGraph z jawnym `phase: 'ideas' \| 'content'` i współdzielonym `ConsistencyVerifier`. `compile()` **bez** checkpoinetera (S-6 / S-9, model B).
- LLM wyłącznie przez istniejący `LlmGatewayPort` → `POST {GATEWAY}/api/v1/chat` (`SPEC-KOMUNIKACJA.md` K-5). Structured output = parse tekstu odpowiedzi + Zod — **nie** `ChatOpenAI.withStructuredOutput`.
- Tabele `SocialIdea` / `SocialContent` już są w schemacie Fazy 2. Ten wycinek **dopisuje** kolumny stanu fazy na `Run` (append migracja, P-7).
- Snapshot `userRating` / `outputEdited` / `reviewFinalizedAt` = Faza 6; tu uzupełniamy `result` i `hitl`.
- `post_content` ma ścieżkę w grafie (węzły content potrzebne przy HITL). DoD Postman/Milestone 4 = wyłącznie `post_ideas` oraz `post_ideas_then_content`.
- Testy CI: fake `LlmGatewayPort`, **zakaz** live vendora (`SPEC-TESTY.md`). E2E, które dziś kończą stubem, nadpisują port LLM, nie `RUN_EXECUTOR` (D-9 nadal trzyma `HoldingRunExecutor`).
- NestJS 11, Prisma 6 + SQLite, Zod 3 (już w `apps/api`), Jest 30. Identyfikatory pomysłów: `idea_<uuid>` w payloadzie SM — **bez** nowego brandu w `packages/shared` (katalog `docs/brand_types.md` go nie ma).

**Biblioteki (weryfikacja 2026-08-19, Context7 + oficjalne docs + npm; korekta stanu grafu 2026-08-20):** stan grafu = `z.object` (Zod 3) przekazany do `new StateGraph(SocialState)` ([use-graph-api](https://docs.langchain.com/oss/javascript/langgraph/use-graph-api) — ścieżka Zod v3 / `InteropZodObject`). Zmiana względem: wcześniejsza norma `StateSchema` + Zod 3 ([Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api)). Powód: `StateSchema` w `@langchain/langgraph@1.4.10` wymaga `~standard.jsonSchema`; Zod 3.25 ma tylko `validate` — `new StateSchema({ field: z.*() })` nie typuje się. **Nie** `new StateSchema({…})`. **Nie** `Annotation.Root` (Legacy). **Nie** Zod 4.x. `StateGraph`, `START`/`END`, `addEdge(START, …)`, `addConditionalEdges(source, routingFn)`, `compile()` bez checkpoinetera. Install: `pnpm add @langchain/langgraph @langchain/core` ([install](https://docs.langchain.com/oss/javascript/langgraph/install)); meta `langchain` / vendor SDK — poza zakresem (K-5). npm: `@langchain/langgraph@1.4.10` (latest; peer `@langchain/core@^1.1.48`, `zod@^3.25.32 \|\| ^4.2.0`), `@langchain/core@^1.2.8`, Zod zostaje na 3 (`^3.25.32`; latest Zod 4.x nie bierzemy). Nest 11: `compilerOptions.assets` pod `src/`. Prisma 6 SQLite: `createMany` OK, `skipDuplicates` nie; SQL migracji = wynik CLI. SPEC wygrywa ze wzorcem LangGraph HITL (`interrupt` + checkpointer) — pauza = `awaiting_hitl` w DB.

---



## FAZA 1 — Pipeline Social (ideas / content)

Odpowiada major **Faza 4**. Jedna faza w tym zestawie.

---



### KROK 1 — Domain Social: typy, refine N=2, porty

**Status:** `WYKONANY`

**Cel:** Kontrakt BC Social bez LangGraph i bez Prisma. Major 4.1 (fundament); `SPEC-SOCIAL.md` S-5; `docs/data_flow.md` (węzły bazowe).

**Artefakty (nowe):**

- `apps/api/src/social/domain/social.types.ts`
- `apps/api/src/social/domain/refine-policy.ts`
- `apps/api/src/social/domain/refine-policy.spec.ts`
- `apps/api/src/social/domain/social-result.port.ts`

**Kolejność:** typy → polityka → port → test polityki.

#### Nowy plik — `apps/api/src/social/domain/social.types.ts`

```typescript
import type { CompanyContext } from '../../company-context/domain/company-context.types';
import type { RunBrief } from '../../runs/domain/run.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  RunTaskType,
  SocialPlatform,
} from '@content-chain/shared';

export type PipelinePhase = 'ideas' | 'content';

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

export type VerifierVerdict = {
  ok: boolean;
  contextIssues: string[];
  languageIssues: string[];
};

export type PipelineState = {
  phase: PipelinePhase | null;
  ideasRefineCount: number;
  contentRefineCount: number;
};

export type SocialPipelineInput = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext;
  ideas: SocialIdea[];
  content: SocialContent | null;
};

export type SocialPipelineOutcome =
  | { kind: 'completed'; ideas: SocialIdea[]; content: SocialContent | null }
  | { kind: 'awaiting_hitl'; ideas: SocialIdea[] }
  | {
      kind: 'failed';
      code: string;
      message: string;
      contextIssues?: string[];
      languageIssues?: string[];
    };
```



#### Nowy plik — `apps/api/src/social/domain/refine-policy.ts`

```typescript
export const MAX_REFINE = 2;

export function canRefine(attempts: number): boolean {
  return attempts < MAX_REFINE;
}

export function nextRefineCount(attempts: number): number {
  if (!canRefine(attempts)) {
    throw new Error('REFINE_EXHAUSTED');
  }
  return attempts + 1;
}
```



#### Nowy plik — `apps/api/src/social/domain/refine-policy.spec.ts`

```typescript
import { MAX_REFINE, canRefine, nextRefineCount } from './refine-policy';

describe('refine-policy', () => {
  it('allows two refine attempts then blocks', () => {
    expect(canRefine(0)).toBe(true);
    expect(nextRefineCount(0)).toBe(1);
    expect(nextRefineCount(1)).toBe(2);
    expect(canRefine(MAX_REFINE)).toBe(false);
    expect(() => nextRefineCount(MAX_REFINE)).toThrow('REFINE_EXHAUSTED');
  });
});
```



#### Nowy plik — `apps/api/src/social/domain/social-result.port.ts`

```typescript
import type { RunId } from '@content-chain/shared';
import type {
  PipelineState,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from './social.types';

export const SOCIAL_RESULT_STORE = Symbol('SOCIAL_RESULT_STORE');

export interface SocialResultStore {
  replaceIdeas(runId: RunId, ideas: SocialIdea[]): Promise<void>;
  replaceContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void>;
  listIdeas(runId: RunId): Promise<SocialIdea[]>;
  getContent(runId: RunId): Promise<{
    content: SocialContent;
    verification: VerifierVerdict | null;
  } | null>;
  savePipelineState(runId: RunId, state: PipelineState): Promise<void>;
  getPipelineState(runId: RunId): Promise<PipelineState>;
}
```

**Biblioteki:** brak nowych.

**DoD (krok):**

- Limit refine jest egzekwowalny w domain (`MAX_REFINE = 2`); test przechodzi.
- Port zapisu wyników nie importuje Prisma ani LangGraph.
- Brak zmian w `RunsModule` / HTTP.

---



### KROK 2 — Schematy Zod structured output

**Status:** `WYKONANY`

**Cel:** Parse wyjść LLM zanim graf pójdzie dalej (S-3). Porażka parse ≠ cichy tekst do klienta. Zod 3 już w `apps/api` (`package.json`).

**Artefakty (nowe):**

- `apps/api/src/social/application/social.schemas.ts`
- `apps/api/src/social/application/parse-llm-json.ts`
- `apps/api/src/social/application/social.schemas.spec.ts`



#### Nowy plik — `apps/api/src/social/application/social.schemas.ts`

```typescript
import { z } from 'zod';

export const socialIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  angle: z.string().min(1),
  hook: z.string().min(1),
});

export const ideasOutputSchema = z.object({
  ideas: z.array(socialIdeaSchema).min(1),
});

export const contentOutputSchema = z.object({
  body: z.string().min(1),
  hashtags: z.array(z.string()).default([]),
  cta: z.string().min(1).optional(),
});

export const verifierOutputSchema = z.object({
  ok: z.boolean(),
  contextIssues: z.array(z.string()).default([]),
  languageIssues: z.array(z.string()).default([]),
});

export type IdeasOutput = z.infer<typeof ideasOutputSchema>;
export type ContentOutput = z.infer<typeof contentOutputSchema>;
export type VerifierOutput = z.infer<typeof verifierOutputSchema>;
```

Zod 3: `.default([])` podstawia wartość **tylko gdy pole jest** `undefined` (brak klucza). `"hashtags": null` / `"contextIssues": null` → `safeParse` fail → `STRUCTURED_OUTPUT_INVALID` (nie surowy tekst). `z.output<T>` jest aliasem typu wyjścia schematu (obok `z.infer`); w funkcjach generycznych `T extends z.ZodTypeAny`.

#### Nowy plik — `apps/api/src/social/application/parse-llm-json.ts`

```typescript
import type { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';

export function extractJsonText(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return (fenced?.[1] ?? trimmed).trim();
}

export function parseLlmJson<T extends z.ZodTypeAny>(
  schema: T,
  raw: string,
): z.output<T> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonText(raw));
  } catch {
    throw new DomainException(
      'STRUCTURED_OUTPUT_INVALID',
      'LLM output is not valid JSON',
      500,
    );
  }
  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new DomainException(
      'STRUCTURED_OUTPUT_INVALID',
      'LLM output failed schema validation',
      500,
      result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    );
  }
  return result.data;
}
```



#### Nowy plik — `apps/api/src/social/application/social.schemas.spec.ts`

```typescript
import { ideasOutputSchema, verifierOutputSchema } from './social.schemas';
import { parseLlmJson } from './parse-llm-json';

describe('parseLlmJson', () => {
  it('parses fenced JSON ideas', () => {
    const raw = '```json\n{"ideas":[{"title":"A","angle":"B","hook":"C"}]}\n```';
    const out = parseLlmJson(ideasOutputSchema, raw);
    expect(out.ideas).toHaveLength(1);
  });

  it('rejects broken shape', () => {
    expect(() => parseLlmJson(verifierOutputSchema, '{"ok":"nope"}')).toThrow(
      'STRUCTURED_OUTPUT_INVALID',
    );
  });

  it('defaults missing issue arrays and rejects null', () => {
    expect(
      parseLlmJson(verifierOutputSchema, '{"ok":true}').contextIssues,
    ).toEqual([]);
    expect(() =>
      parseLlmJson(verifierOutputSchema, '{"ok":true,"contextIssues":null}'),
    ).toThrow('STRUCTURED_OUTPUT_INVALID');
  });
});
```

**DoD (krok):**

- Porażka JSON/Zod rzuca `STRUCTURED_OUTPUT_INVALID` (nie zwraca surowego tekstu).
- Brak klucza tablicy (`.default`) przechodzi; `null` w tym polu — nie.
- Istniejący `parseWithZod` HTTP **nie** jest używany do hopów LLM (inny kod błędu / 500 vs walidacja komendy).

---



### KROK 3 — Szablony promptów jako pliki

**Status:** `WYKONANY`

**Cel:** Prompty w `infrastructure/prompts/`, nie w controllerze (S-2). Copy roboczy — treść merytoryczna poza SPEC.

**Artefakty (nowe):**

- `apps/api/src/social/infrastructure/prompts/load-prompt.ts`
- `apps/api/src/social/infrastructure/prompts/ideation.prompt.md`
- `apps/api/src/social/infrastructure/prompts/content-writer.prompt.md`
- `apps/api/src/social/infrastructure/prompts/verifier.prompt.md`
- `apps/api/src/social/infrastructure/prompts/refine-ideas.prompt.md`
- `apps/api/src/social/infrastructure/prompts/refine-content.prompt.md`

**Zmiana:** `apps/api/nest-cli.json` — kopiowanie `*.prompt.md` do `dist/` (Nest 11 `compilerOptions.assets`).

#### Refaktor — `apps/api/nest-cli.json`

**Teraz:**

```json
"compilerOptions": {
  "deleteOutDir": true
}
```

**Zamień na** (Nest CLI: glob względem `sourceRoot` / `src`; assety poza `src` nie są kopiowane):

```json
"compilerOptions": {
  "deleteOutDir": true,
  "assets": ["**/*.prompt.md"],
  "watchAssets": true
}
```



#### Nowy plik — `apps/api/src/social/infrastructure/prompts/load-prompt.ts`

```typescript
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadPrompt(fileName: string): string {
  return readFileSync(join(__dirname, fileName), 'utf8');
}

export function renderPrompt(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}
```



#### Nowy plik — `ideation.prompt.md`

```markdown
Jesteś IdeationAgent. Język odpowiedzi: {{language}}. Platforma: {{platform}}.
Kontekst firmy (JSON):
{{company}}
Brief (JSON):
{{brief}}
Zwróć WYŁĄCZNIE JSON: {"ideas":[{"title":"...","angle":"...","hook":"..."}]}.
Liczba pomysłów: {{ideaCount}}. Bez markdown poza JSON.
```



#### Nowy plik — `content-writer.prompt.md`

```markdown
Jesteś ContentWriterAgent. Język: {{language}}. Platforma: {{platform}}.
Kontekst firmy (JSON):
{{company}}
Brief (JSON):
{{brief}}
Wybrane pomysły (JSON):
{{ideas}}
Zwróć WYŁĄCZNIE JSON: {"body":"...","hashtags":["..."],"cta":"..."}.
```



#### Nowy plik — `verifier.prompt.md`

```markdown
Jesteś ConsistencyVerifier. Oceń spójność z kontekstem firmy ORAZ język (gramatyka, interpunkcja, składnia) dla {{language}}.
Kontekst firmy (JSON):
{{company}}
Materiał do oceny (JSON):
{{payload}}
Zwróć WYŁĄCZNIE JSON: {"ok":true,"contextIssues":[],"languageIssues":[]}.
Jeśli fail: ok=false oraz niepuste tablice z konkretnymi zarzutami (rozróżnij kontekst vs język).
```



#### Nowy plik — `refine-ideas.prompt.md`

```markdown
Jesteś RefineIdeas. Popraw listę pomysłów wg zarzutów verifiera. Język: {{language}}.
Kontekst firmy (JSON):
{{company}}
Pomysły (JSON):
{{ideas}}
Zarzuty kontekstu: {{contextIssues}}
Zarzuty języka: {{languageIssues}}
Zwróć WYŁĄCZNIE JSON: {"ideas":[{"title":"...","angle":"...","hook":"..."}]}.
```



#### Nowy plik — `refine-content.prompt.md`

```markdown
Jesteś RefineContent. Popraw treść wg zarzutów verifiera. Język: {{language}}.
Kontekst firmy (JSON):
{{company}}
Treść (JSON):
{{content}}
Zarzuty kontekstu: {{contextIssues}}
Zarzuty języka: {{languageIssues}}
Zwróć WYŁĄCZNIE JSON: {"body":"...","hashtags":["..."],"cta":"..."}.
```

**DoD (krok):**

- Żaden prompt nie jest stringiem w controllerze.
- `nest build` kopiuje `*.prompt.md` obok skompilowanego `load-prompt.js`.

---



### KROK 4 — Zależności w `apps/api/package.json`

**Status:** `WYKONANY`

**Cel:** LangGraph.js + LangChain.js (rdzeń) w workspace api, zanim węzły importują pakiety. `SPEC-SOCIAL.md` stack. Oficjalny install: `pnpm add @langchain/langgraph @langchain/core` ([docs](https://docs.langchain.com/oss/javascript/langgraph/install)).

**Nie instalować:** `langchain` (meta + ChatOpenAI), `@langchain/openai`, `@langchain/anthropic`, `@langchain/langgraph-checkpoint-sqlite` — transport LLM = gateway; HITL = model B.

**Wersje (npm 2026-08-19, registry):** `@langchain/langgraph@1.4.10` = latest; peer `@langchain/core@^1.1.48`, peer `zod@^3.25.32 \|\| ^4.2.0`. Pin core: `^1.2.8` (spełnia peera). Projekt ma `zod@^3.0.0` — **podnieść Zod w api do** `^3.25.32` (zostać na Zod 3, nie 4.x). Istniejące `safeParse` / `z.object` bez zmiany API.

**Artefakty:**

- Zmiana: `apps/api/package.json` (`dependencies` + `jest.transformIgnorePatterns`)
- Lockfile workspace (`pnpm-lock.yaml`) — wynik `pnpm --filter api add`

**Komenda (z roota):**

```bash
pnpm --filter api add @langchain/langgraph@^1.4.10 @langchain/core@^1.2.8 zod@^3.25.32
```



#### Refaktor — `apps/api/package.json` `dependencies`

**Teraz (fragment):**

```json
"uuid": "^14.0.0",
"zod": "^3.0.0"
```

**Zamień na:**

```json
"uuid": "^14.0.0",
"zod": "^3.25.32",
"@langchain/core": "^1.2.8",
"@langchain/langgraph": "^1.4.10"
```



#### Refaktor — `apps/api/package.json` `jest.transformIgnorePatterns`

LangGraph/LangChain są ESM. Wyjątek musi łapać też layout pnpm dla scoped pakietów (`.pnpm/@langchain+langgraph@…/node_modules/@langchain/…`). Wzorzec `uuid(?:@…)` działa dla nienamespace’owego `uuid`; dla `@langchain` **nie** — pierwszy segment `.pnpm/@langchain+…` nie kończy się `/` po prefiksie `@langchain`.

**Teraz:**

```json
"transformIgnorePatterns": [
  "/node_modules/(?!(.pnpm/)?uuid(?:@[^/]+)?(?:/|$))"
]
```

**Zamień na:**

```json
"transformIgnorePatterns": [
  "/node_modules/(?!.*(?:uuid|@langchain|langsmith|langgraph)/)"
]
```

To samo `transformIgnorePatterns` dodać w `apps/api/test/jest-e2e.json`, jeśli e2e importuje graf.

**DoD (krok):**

- Pakiet jest ESM — nie `require()`. Sprawdzenie: `pnpm --filter api exec node --input-type=module -e "import('@langchain/langgraph').then(() => console.log('ok'))"` nie kończy się `Cannot find module` / `ERR_REQUIRE_ESM`.
- Brak pakietów vendor LLM i checkpoinetera w `dependencies`.
- Sekrety nie trafiają do `package.json`.

---



### KROK 5 — Węzły grafu (porty, bez Prisma)

**Status:** `WYKONANY`

**Cel:** Węzły z `docs/data_flow.md` jako fabryki zamykające porty. Testy na fake LLM / fake store. Typ stanu = czysty TS (`SocialGraphState`); `StateSchema` i krawędzie — KROK 6. Węzły nie importują `@langchain/langgraph`.

**Artefakty (nowe):**

- `apps/api/src/social/infrastructure/graph/state.ts`
- `apps/api/src/social/infrastructure/graph/llm-hop.ts`
- `apps/api/src/social/infrastructure/graph/nodes/load-context.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/normalize-brief.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/ideation.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/content-writer.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/verifier.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/refine-ideas.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/refine-content.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/persist-ideas.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/persist-content.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/fail-run.node.ts`
- `apps/api/src/social/infrastructure/graph/nodes/ideation.node.spec.ts` (reprezentatywny unit; analogicznie verifier + persist)

`v4` z `uuid` do `idea_<uuid>` gdy model nie zwróci `id`.

#### Nowy plik — `apps/api/src/social/infrastructure/graph/state.ts`

```typescript
import type { CompanyContext } from '../../../company-context/domain/company-context.types';
import type { RunBrief } from '../../../runs/domain/run.types';
import type {
  PipelinePhase,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from '../../domain/social.types';
import type {
  ContentLanguage,
  ConversationId,
  RunId,
  RunTaskType,
  SocialPlatform,
} from '@content-chain/shared';

export type SocialGraphState = {
  runId: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  phase: PipelinePhase;
  company: CompanyContext | null;
  ideas: SocialIdea[];
  content: SocialContent | null;
  verdict: VerifierVerdict | null;
  ideasRefineCount: number;
  contentRefineCount: number;
  failedCode: string | null;
  failedMessage: string | null;
};
```



#### Nowy plik — `apps/api/src/social/infrastructure/graph/llm-hop.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  createGatewayModelAlias,
  unbrand,
  type ConversationId,
  type RequestId,
} from '@content-chain/shared';
import type { z } from 'zod';
import { LLM_GATEWAY_PORT } from '../../../llm/llm.tokens';
import type { LlmGatewayPort } from '../../../llm/llm-gateway.port';
import { LlmGatewayError } from '../../../llm/llm-gateway.errors';
import { ENV, type Env } from '../../../shared/config/env';
import { isRetryable } from '../../../runs/domain/is-retryable';
import { RunLifecycleService } from '../../../runs/application/run-lifecycle.service';
import { parseLlmJson } from '../../application/parse-llm-json';
import type { RunId } from '@content-chain/shared';

const MAX_GATEWAY_ATTEMPTS = 3;

@Injectable()
export class LlmHopService {
  constructor(
    @Inject(LLM_GATEWAY_PORT) private readonly llm: LlmGatewayPort,
    @Inject(ENV) private readonly env: Env,
    private readonly lifecycle: RunLifecycleService,
  ) {}

  async chatJson<T extends z.ZodTypeAny>(input: {
    runId: RunId;
    conversationId: ConversationId;
    step: string;
    userContent: string;
    schema: T;
  }): Promise<{ data: z.output<T>; requestId: RequestId }> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_GATEWAY_ATTEMPTS; attempt += 1) {
      try {
        const result = await this.llm.chat({
          modelAlias: createGatewayModelAlias(this.env.GATEWAY_MODEL_ALIAS),
          conversationId: input.conversationId,
          messages: [{ role: 'user', content: input.userContent }],
        });
        await this.lifecycle.appendLog({
          runId: input.runId,
          conversationId: input.conversationId,
          level: 'info',
          message: `LLM hop ${input.step}`,
          step: input.step,
          requestId: unbrand(result.requestId),
        });
        return {
          data: parseLlmJson(input.schema, result.text),
          requestId: result.requestId,
        };
      } catch (error) {
        lastError = error;
        const retryable =
          error instanceof LlmGatewayError &&
          isRetryable({
            kind: 'gateway',
            code: error.gatewayCode,
            retryable: error.retryable,
          });
        await this.lifecycle.appendLog({
          runId: input.runId,
          conversationId: input.conversationId,
          level: 'error',
          message: `LLM hop ${input.step} failed (attempt ${attempt})`,
          step: input.step,
          requestId:
            error instanceof LlmGatewayError
              ? error.gatewayRequestId
              : undefined,
        });
        if (!retryable || attempt === MAX_GATEWAY_ATTEMPTS) throw error;
      }
    }
    throw lastError;
  }
}
```

Uwaga: `appendLog.requestId` w `RunLogEntry` jest `string | undefined`, nie brand — zostawiamy `unbrand` albo sam string z gateway (adapter już waliduje format).

#### Nowy plik — `nodes/load-context.node.ts`

```typescript
import type { CompanyContextRepository } from '../../../company-context/domain/company-context.port';
import type { SocialGraphState } from '../state';

export function createLoadContextNode(context: CompanyContextRepository) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const company = await context.get();
    return { company };
  };
}
```



#### Nowy plik — `nodes/normalize-brief.node.ts`

```typescript
import type { SocialGraphState } from '../state';

export function createNormalizeBriefNode() {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const topic = state.brief.topic.trim();
    const ideaCount = state.brief.ideaCount ?? 5;
    return {
      brief: {
        ...state.brief,
        topic,
        ideaCount,
      },
    };
  };
}
```



#### Węzły LLM (wzorzec) — `nodes/ideation.node.ts`

```typescript
import { v4 as uuidv4 } from 'uuid';
import { ideasOutputSchema } from '../../application/social.schemas';
import { loadPrompt, renderPrompt } from '../prompts/load-prompt';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import type { SocialIdea } from '../../domain/social.types';

export function createIdeationNode(hop: LlmHopService) {
  const template = loadPrompt('ideation.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: ideasOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        platform: state.platform,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        ideaCount: String(state.brief.ideaCount ?? 5),
      }),
    });
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

Analogicznie `content-writer.node.ts` (`contentOutputSchema`, step `ContentWriterAgent`, filtr `state.ideas` po `selectedIdeaIds` gdy niepuste), `verifier.node.ts` (payload = `ideas` albo `content` wg `phase`), `refine-ideas.node.ts` / `refine-content.node.ts` (po udanym refine: `ideasRefineCount` / `contentRefineCount` przez `nextRefineCount`).

Verifier: logować rozróżnienie faila — jeśli `!ok`, `appendLog` z `contextIssues` / `languageIssues` w `message` (bez sekretów).

#### Persist — `nodes/persist-ideas.node.ts`

```typescript
import type { SocialResultStore } from '../../domain/social-result.port';
import type { SocialGraphState } from '../state';

export function createPersistIdeasNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    await store.replaceIdeas(state.runId, state.ideas);
    return {};
  };
}
```

`persist-content.node.ts` woła `replaceContent` z `state.content` + `state.verdict`.

`fail-run.node.ts` ustawia `failedCode: 'VERIFIER_FAILED'` i `failedMessage` łączący listy zarzutów, gdy refine wyczerpany. Inne kody (`STRUCTURED_OUTPUT_INVALID`, `GATEWAY_*`) ustawia executor przy catch — ten węzeł jest tylko dla ścieżki verifier.

**Test (szkic):** `ideation.node.spec.ts` — fake `LlmHopService.chatJson` zwraca jedną ideę; węzeł uzupełnia `idea_` gdy brak `id`. Drugi test: `parseLlmJson` rzuca → węzeł propaguje.

**DoD (krok):**

- Każdy hop LLM ma `step` = nazwa węzła z docs (`IdeationAgent`, `ConsistencyVerifier`, `ContentWriterAgent`, `RefineIdeas`, `RefineContent`).
- Węzły nie importują Prisma.
- Unit ideation + verifier (fail z dwiema listami) przechodzą na fake hopie.

---



### KROK 6 — Compiled graph + fasada application

**Status:** `WYKONANY`

**Cel:** S-1 / S-6: `graph.invoke` tylko w fasadzie. Jeden graf: stały entry `START → loadContext → normalizeBrief` (prefiks przepleciony: `addNode` + od razu `addEdge`, bo to sekwencja bez rozjazdu). Reszta węzłów jako katalog, potem krawędzie i pętle. Rozgałęzienie `phase` **po** `normalizeBrief` oraz decyzja persist/refine/fail **po** `consistencyVerifier` — `addConditionalEdges(source, namedRoutingFn)`. Po Refine* krawędź stała z powrotem do `consistencyVerifier` (nie do generatora). Funkcje routera w **tym samym pliku** (`routeAfterNormalizeBrief`, `routeAfterConsistencyVerifier`); to zwykłe fn zwracające nazwę węzła, nie klasa LangGraph. `compile()` bez checkpoinetera.

**Artefakty (nowe):**

- `apps/api/src/social/infrastructure/graph/social.graph.ts`
- `apps/api/src/social/application/social-pipeline.facade.ts`
- `apps/api/src/social/application/social-pipeline.facade.spec.ts`

**Źródło API:** [Graph API](https://docs.langchain.com/oss/javascript/langgraph/graph-api) + [use-graph-api](https://docs.langchain.com/oss/javascript/langgraph/use-graph-api) — stan = `z.object({…})` (Zod 3) jako argument `new StateGraph(SocialState)` (`InteropZodObject`). `addEdge(START, firstNode)`, `addConditionalEdges(source, routingFn)` (zwrot = nazwa węzła; mapa ścieżek opcjonalna), `compile()`. `routingFn` = zwykła funkcja / typ `ConditionalEdgeRouter` — **nie** klasa do `new`. **Nie** `new StateSchema({…})` (typy 1.4.10 wymagają `~standard.jsonSchema`, którego Zod 3 nie ma). **Nie** `Annotation.Root` (Legacy). **Nie** `addConditionalEdges(START, router)` — u nas `START` jest krawędzią stałą do `loadContext`; `phase` routuje dopiero z `normalizeBrief`. **Nie** lambd inline w `addConditionalEdges` — nazwane fn w tym samym pliku, żeby łańcuch `compileSocialGraph` czytał się jako topologia.

Zmiana względem: wcześniejszy szkic tego kroku z `const SocialState = new StateSchema({…})`. Last-write-wins bez `.langgraph.reducer()` / `ReducedValue`. Graf jest sekwencyjny (brak równoległego zapisu tego samego kanału). Typ węzłów nadal `SocialGraphState` (`state.ts`).

#### Nowy plik — `apps/api/src/social/infrastructure/graph/social.graph.ts`

```typescript
import { END, START, StateGraph } from '@langchain/langgraph';
import { z } from 'zod';
import { canRefine } from '../../domain/refine-policy';
import { createLoadContextNode } from './nodes/load-context.node';
import { createNormalizeBriefNode } from './nodes/normalize-brief.node';
import { createIdeationNode } from './nodes/ideation.node';
import { createContentWriterNode } from './nodes/content-writer.node';
import { createVerifierNode } from './nodes/verifier.node';
import { createRefineIdeasNode } from './nodes/refine-ideas.node';
import { createRefineContentNode } from './nodes/refine-content.node';
import { createPersistIdeasNode } from './nodes/persist-ideas.node';
import { createPersistContentNode } from './nodes/persist-content.node';
import { createFailRunNode } from './nodes/fail-run.node';
import { RunLifecycleService } from '../../../runs/application/run-lifecycle.service';
import type { SocialGraphState } from './state';
import type { CompanyContextRepository } from '../../../company-context/domain/company-context.port';
import type { LlmHopService } from './llm-hop';
import type { SocialResultStore } from '../../domain/social-result.port';

const SocialState = z.object({
  runId: z.custom<SocialGraphState['runId']>(),
  conversationId: z.custom<SocialGraphState['conversationId']>(),
  taskType: z.custom<SocialGraphState['taskType']>(),
  platform: z.custom<SocialGraphState['platform']>(),
  language: z.custom<SocialGraphState['language']>(),
  brief: z.custom<SocialGraphState['brief']>(),
  selectedIdeaIds: z.custom<SocialGraphState['selectedIdeaIds']>(),
  phase: z.custom<SocialGraphState['phase']>(),
  company: z.custom<SocialGraphState['company']>(),
  ideas: z.custom<SocialGraphState['ideas']>(),
  content: z.custom<SocialGraphState['content']>(),
  verdict: z.custom<SocialGraphState['verdict']>(),
  ideasRefineCount: z.number(),
  contentRefineCount: z.number(),
  failedCode: z.custom<SocialGraphState['failedCode']>(),
  failedMessage: z.custom<SocialGraphState['failedMessage']>(),
});

interface CompileSocialGraphOptions {
  context: CompanyContextRepository;
  store: SocialResultStore;
  hop: LlmHopService;
  lifecycle: RunLifecycleService;
}

export type CompiledSocialGraph = {
  invoke(input: SocialGraphState): Promise<SocialGraphState>;
};

function routeAfterNormalizeBrief(
  state: SocialGraphState,
): 'contentWriterAgent' | 'ideationAgent' {
  return state.phase === 'content' ? 'contentWriterAgent' : 'ideationAgent';
}

function routeAfterConsistencyVerifier(
  state: SocialGraphState,
):
  | 'failRun'
  | 'persistContent'
  | 'persistIdeas'
  | 'refineContent'
  | 'refineIdeas' {
  if (state.failedCode) return 'failRun';
  if (state.verdict?.ok) {
    return state.phase === 'content' ? 'persistContent' : 'persistIdeas';
  }
  const attempts =
    state.phase === 'content'
      ? state.contentRefineCount
      : state.ideasRefineCount;
  if (canRefine(attempts)) {
    return state.phase === 'content' ? 'refineContent' : 'refineIdeas';
  }
  return 'failRun';
}

export function compileSocialGraph(
  deps: CompileSocialGraphOptions,
): CompiledSocialGraph {
  const graph = new StateGraph(SocialState)
    .addNode('loadContext', createLoadContextNode(deps.context))
    .addEdge(START, 'loadContext')
    .addNode('normalizeBrief', createNormalizeBriefNode())
    .addEdge('loadContext', 'normalizeBrief')
    .addNode('ideationAgent', createIdeationNode(deps.hop))
    .addNode('contentWriterAgent', createContentWriterNode(deps.hop))
    .addNode(
      'consistencyVerifier',
      createVerifierNode(
        deps.hop,
        deps.lifecycle.appendLog.bind(deps.lifecycle),
      ),
    )
    .addNode('refineIdeas', createRefineIdeasNode(deps.hop))
    .addNode('refineContent', createRefineContentNode(deps.hop))
    .addNode('persistIdeas', createPersistIdeasNode(deps.store))
    .addNode('persistContent', createPersistContentNode(deps.store))
    .addNode('failRun', createFailRunNode())
    .addConditionalEdges('normalizeBrief', routeAfterNormalizeBrief)
    .addEdge('ideationAgent', 'consistencyVerifier')
    .addEdge('contentWriterAgent', 'consistencyVerifier')
    .addEdge('refineIdeas', 'consistencyVerifier')
    .addEdge('refineContent', 'consistencyVerifier')
    .addConditionalEdges('consistencyVerifier', routeAfterConsistencyVerifier)
    .addEdge('persistIdeas', END)
    .addEdge('persistContent', END)
    .addEdge('failRun', END);

  return graph.compile();
}
```

Zmiana względem: wcześniejszy szkic tego kroku z `createVerifierNode(deps.hop)` (sam hop). Powód: węzeł z KROK 5 (WYKONANY) przyjmuje `appendLog: RunLifecycleService['appendLog']`, nie cały serwis. Goła referencja `deps.lifecycle.appendLog` gubi `this` metody klasy (`this.runs` / `this.sseHub`) — kompozycja woła `.bind(deps.lifecycle)`, żeby wywołanie z węzła było równoważne `deps.lifecycle.appendLog(...)`. `transition` nie wchodzi do grafu.

Zmiana względem: wcześniejszy szkic tego kroku z katalogiem **wszystkich** `addNode` przed **wszystkimi** `addEdge` oraz z lambdami inline w `addConditionalEdges`. Teraz: (1) liniowy prefiks przepleciony (`loadContext` / `normalizeBrief` + ich krawędzie od razu po węźle — `START` nie „w środku” sekcji krawędzi); od `ideationAgent` dalej katalog węzłów, potem krawędzie (rozjazdy i pętle nie da się uczciwie zapisać jako jednej sekwencji); (2) routing wyciągnięty do `routeAfterNormalizeBrief` i `routeAfterConsistencyVerifier` w tym samym pliku, wołanych z `addConditionalEdges`; (3) `CompileSocialGraphOptions` + `CompiledSocialGraph` zamiast inline `deps` i gołego zwrotu `compile()`.

Zmiana względem: wcześniejszy szkic tego kroku (oraz mermaid w `docs/data_flow.md`) z `.addEdge('refineIdeas', 'ideationAgent')` i `.addEdge('refineContent', 'contentWriterAgent')`. Teraz: Refine* wraca do `consistencyVerifier`. Powód: węzły generatora z KROK 5 (WYKONANY) nadpisują `ideas` / `content` nowym hopem z briefu (bez zarzutów verifiera); verifier ma ocenić materiał po Refine*. Router `routeAfterConsistencyVerifier` bez zmian (`canRefine` → Refine*, limit → `failRun`).

**Zakaz:** `compile({ checkpointer: ... })`. `interrupt()` z docs LangGraph wymaga checkpoinetera — poza zakresem (model B).

#### Nowy plik — `apps/api/src/social/application/social-pipeline.facade.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../../company-context/domain/company-context.port';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../domain/social-result.port';
import {
  CompiledSocialGraph,
  compileSocialGraph,
} from '../infrastructure/graph/social.graph';
import { LlmHopService } from '../infrastructure/graph/llm-hop';
import { RunLifecycleService } from '../../runs/application/run-lifecycle.service';
import type {
  PipelinePhase,
  SocialIdea,
  SocialPipelineOutcome,
} from '../domain/social.types';
import type { RunRecord } from '../../runs/domain/run.types';
import type { SocialGraphState } from '../infrastructure/graph/state';

@Injectable()
export class SocialPipelineFacade {
  private readonly graph: CompiledSocialGraph;

  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    context: CompanyContextRepository,
    @Inject(SOCIAL_RESULT_STORE) store: SocialResultStore,
    hop: LlmHopService,
    lifecycle: RunLifecycleService,
  ) {
    this.graph = compileSocialGraph({ context, store, hop, lifecycle });
  }

  async invokePhase(
    run: RunRecord,
    phase: PipelinePhase,
    extras: {
      ideasRefineCount: number;
      contentRefineCount: number;
      ideas: SocialIdea[];
    },
  ): Promise<SocialPipelineOutcome> {
    const final = await this.graph.invoke({
      runId: run.id,
      conversationId: run.conversationId,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      brief: run.brief,
      selectedIdeaIds: run.selectedIdeaIds,
      phase,
      company: null,
      ideas: extras.ideas,
      content: null,
      verdict: null,
      ideasRefineCount: extras.ideasRefineCount,
      contentRefineCount: extras.contentRefineCount,
      failedCode: null,
      failedMessage: null,
    });
    return toOutcome(run, phase, final);
  }
}

export function toOutcome(
  run: Pick<RunRecord, 'taskType'>,
  phase: PipelinePhase,
  final: Pick<
    SocialGraphState,
    'failedCode' | 'failedMessage' | 'verdict' | 'ideas' | 'content'
  >,
): SocialPipelineOutcome {
  if (final.failedCode) {
    return {
      kind: 'failed',
      code: final.failedCode,
      message: final.failedMessage ?? 'pipeline failed',
      contextIssues: final.verdict?.contextIssues,
      languageIssues: final.verdict?.languageIssues,
    };
  }
  if (phase === 'ideas' && run.taskType === 'post_ideas_then_content') {
    return { kind: 'awaiting_hitl', ideas: final.ideas };
  }
  return {
    kind: 'completed',
    ideas: final.ideas,
    content: final.content,
  };
}
```

#### Nowy plik — `apps/api/src/social/application/social-pipeline.facade.spec.ts`

```typescript
import type { SocialGraphState } from '../infrastructure/graph/state';
import { toOutcome } from './social-pipeline.facade';

const ideas = [{ id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' }];

function makeFinal(
  overrides: Partial<
    Pick<
      SocialGraphState,
      'failedCode' | 'failedMessage' | 'verdict' | 'ideas' | 'content'
    >
  > = {},
) {
  return {
    failedCode: null,
    failedMessage: null,
    verdict: null,
    ideas,
    content: null,
    ...overrides,
  };
}

describe('toOutcome', () => {
  it('returns awaiting_hitl for ideas phase of post_ideas_then_content', () => {
    expect(
      toOutcome({ taskType: 'post_ideas_then_content' }, 'ideas', makeFinal()),
    ).toEqual({ kind: 'awaiting_hitl', ideas });
  });

  it('returns completed for post_ideas without HITL', () => {
    expect(toOutcome({ taskType: 'post_ideas' }, 'ideas', makeFinal())).toEqual({
      kind: 'completed',
      ideas,
      content: null,
    });
  });

  it('returns completed for content phase after HITL', () => {
    const content = { body: 'Post', hashtags: ['#acme'], cta: 'CTA' };
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'content',
        makeFinal({ content }),
      ),
    ).toEqual({ kind: 'completed', ideas, content });
  });

  it('returns failed when graph set failedCode, even if HITL would apply', () => {
    expect(
      toOutcome(
        { taskType: 'post_ideas_then_content' },
        'ideas',
        makeFinal({
          failedCode: 'VERIFIER_FAILED',
          failedMessage: null,
          verdict: {
            ok: false,
            contextIssues: ['off-brand CTA'],
            languageIssues: ['grammar'],
          },
        }),
      ),
    ).toEqual({
      kind: 'failed',
      code: 'VERIFIER_FAILED',
      message: 'pipeline failed',
      contextIssues: ['off-brand CTA'],
      languageIssues: ['grammar'],
    });
  });
});
```

**DoD (krok):**

- Controller nadal nie importuje `@langchain/langgraph`.
- Stan grafu przez `z.object` (Zod 3) → `new StateGraph(SocialState)`, nie `StateSchema`, nie `Annotation.Root`.
- Prefiks `START → loadContext → normalizeBrief` przepleciony (`addNode` + `addEdge`); od `ideationAgent` katalog węzłów, potem krawędzie.
- `addConditionalEdges` woła `routeAfterNormalizeBrief` / `routeAfterConsistencyVerifier` (ten sam plik, nie lambdy, nie klasa routera).
- `compile()` bez checkpoinetera.
- Fasada nie woła `transition` (to executor w KROK 9) — tylko zwraca `SocialPipelineOutcome`.

---



### KROK 6a — Korekta: ContentWriterAgent dla `post_content` bez ideas (Opcja B)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Usunięcie ciszy / nieokreślonego zachowania LLM gdy `post_content` startuje bez uprzedniego ideation (pusty `ideas: []` w stanie grafu). Refaktor względem: KROK 5 (`WYKONANY`) — `content-writer.node.ts` zawsze serializuje `state.ideas` do JSON, niezależnie od tego czy lista jest pusta.

**Artefakty (zmiana):**

- Zmiana: `apps/api/src/social/infrastructure/graph/nodes/content-writer.node.ts`
- Zmiana: `apps/api/src/social/infrastructure/prompts/content-writer.prompt.md`

#### Refaktor — `content-writer.node.ts`

**Teraz (fragment):**

```typescript
      ideas: JSON.stringify(ideas),
```

**Zamień na:**

```typescript
      ideas:
        ideas.length > 0
          ? JSON.stringify(ideas)
          : '[] — brak wybranych pomysłów; generuj post wyłącznie z brief.topic, brief.goal i kontekstu firmy',
```

Zmiana względem: KROK 5 (`WYKONANY`) — węzeł przekazywał surowe `[]` bez instrukcji dla LLM. Pusty string JSON jest technicznie poprawny, ale LLM dostaje sprzeczny sygnał: instrukcja mówi „na podstawie wybranych pomysłów", a dane są puste. Opcja B: eksplicytny, czytelny komunikat w danych zamiast warunkowej logiki w promptcie. Brak zmian w `renderPrompt`; brak nowych szablonów.

#### Refaktor — `content-writer.prompt.md` (sekcja `## Zadanie`)

**Teraz:**

```
Napisz JEDEN post na podstawie wybranych pomysłów i briefu.
- Jeśli jest jeden pomysł — zrealizuj jego `hook` / `angle` / `title`.
- Jeśli jest kilka — scal w jedną spójną myśl (jedna myśl na post). Nie pisz serii postów ani wariantów.
```

**Zamień na:**

```
Napisz JEDEN post na podstawie briefu i kontekstu firmy.
- Jeśli pole `ideas` zawiera pomysły — zrealizuj ich `hook` / `angle` / `title` (jeden lub scalone w jedną myśl).
- Jeśli pole `ideas` jest puste (brak wybranych pomysłów) — generuj post wyłącznie z `brief.topic` i `brief.goal` jako kierunku treści. Nie wymyślaj dodatkowych angle'ów spoza briefu i kontekstu.
- Jedna myśl na post. Nie pisz serii postów ani wariantów.
```

Zmiana względem: KROK 3 (`WYKONANY`) — prompt zakładał zawsze niepuste `ideas`. Nowe brzmienie usuwa założenie o niepustej liście i jawnie opisuje obie ścieżki.

**DoD (krok):**

- Węzeł `content-writer.node.ts` przekazuje eksplicytny string instrukcji gdy `ideas.length === 0`; przekazuje `JSON.stringify(ideas)` gdy niepuste.
- Prompt `content-writer.prompt.md` opisuje obie ścieżki (z pomysłami / bez pomysłów) bez ambigwitu.
- Unit test węzła: gdy `state.ideas = []`, zmienna `ideas` w renderze promptu zawiera string z „brak wybranych pomysłów"; gdy `state.ideas` niepuste — poprawny JSON.
- Istniejące testy KROK 5 / KROK 10 (D-4, D-5) nie psują się.

---



### KROK 7 — Persistence Prisma: wyniki SM + stan fazy

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Model B w DB (S-6). Adapter w `social/infrastructure/persistence/`. Append migracja (P-1, P-7).

**Artefakty:**

- Zmiana: `apps/api/prisma/schema.prisma` (kolumny na `Run`)
- Nowa migracja: `apps/api/prisma/migrations/<timestamp>_run_pipeline_state/migration.sql` (wynik `prisma migrate dev` — nie ręczny push)
- Nowy: `apps/api/src/social/infrastructure/persistence/prisma-social-result.adapter.ts`
- Zmiana: `apps/api/src/runs/domain/run.types.ts` (`RunRecord`)
- Zmiana: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` (`create` / `toSnapshot` / `RunRow`)
- Zmiana: wszystkie `makeRun` / `RunRecord` literały (pola z defaultami)



#### Refaktor — `schema.prisma` model `Run`

**Dopisz pola (nie usuwaj istniejących):**

```prisma
  pipelinePhase      String?
  ideasRefineCount   Int      @default(0)
  contentRefineCount Int      @default(0)
```

Mapowanie typów Prisma → SQLite: `String?` → TEXT NULL, `Int @default(0)` → INTEGER NOT NULL DEFAULT 0.

SQL migracji **nie kopiować stąd**. Źródło prawdy: plik wygenerowany przez `pnpm --filter api exec prisma migrate dev --name run_pipeline_state`. Na SQLite CLI często emituje `RedefineTables` (nowa tabela + kopia + rename), a nie trzy `ALTER TABLE ADD COLUMN` — to oczekiwane zachowanie silnika, nie ręczny SQL do wklejenia. `createMany` w adapterze jest wspierane na SQLite (Prisma ≥ 5.14); **nie** używać `skipDuplicates` (SQLite go nie obsługuje).

#### Refaktor — `run.types.ts` `RunRecord`

**Dopisz:**

```typescript
  pipelinePhase: 'ideas' | 'content' | null;
  ideasRefineCount: number;
  contentRefineCount: number;
```

`StartRunUseCase` przy `create`: `pipelinePhase: null`, liczniki `0`. `PrismaRunAdapter.create` zapisuje te pola. `toSnapshot` je mapuje.

#### Nowy plik — `prisma-social-result.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { RunId } from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { toInputJson } from '../../../shared/persistence/to-input-json';
import type { SocialResultStore } from '../../domain/social-result.port';
import type {
  PipelineState,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
} from '../../domain/social.types';

@Injectable()
export class PrismaSocialResultAdapter implements SocialResultStore {
  constructor(private readonly prisma: PrismaService) {}

  async replaceIdeas(runId: RunId, ideas: SocialIdea[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialIdea.deleteMany({ where: { runId } }),
      this.prisma.socialIdea.createMany({
        data: ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      }),
    ]);
  }

  async replaceContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialContent.deleteMany({ where: { runId } }),
      this.prisma.socialContent.create({
        data: {
          id: `sct_${uuidv4()}`,
          runId,
          payload: toInputJson(content),
          verification: toInputJson(verification),
        },
      }),
    ]);
  }

  async listIdeas(runId: RunId): Promise<SocialIdea[]> {
    const rows = await this.prisma.socialIdea.findMany({ where: { runId } });
    return rows.map((row) => row.payload as SocialIdea);
  }

  async getContent(runId: RunId) {
    const row = await this.prisma.socialContent.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) return null;
    return {
      content: row.payload as SocialContent,
      verification: (row.verification as VerifierVerdict | null) ?? null,
    };
  }

  async savePipelineState(runId: RunId, state: PipelineState): Promise<void> {
    await this.prisma.run.update({
      where: { id: runId },
      data: {
        pipelinePhase: state.phase,
        ideasRefineCount: state.ideasRefineCount,
        contentRefineCount: state.contentRefineCount,
      },
    });
  }

  async getPipelineState(runId: RunId): Promise<PipelineState> {
    const row = await this.prisma.run.findUnique({ where: { id: runId } });
    return {
      phase: (row?.pipelinePhase as PipelineState['phase']) ?? null,
      ideasRefineCount: row?.ideasRefineCount ?? 0,
      contentRefineCount: row?.contentRefineCount ?? 0,
    };
  }
}
```

Prisma tylko tutaj (i w istniejącym adapterze Runs) — nie w `domain/`.

`wipeRuns` w e2e już czyści `socialContent` / `socialIdea`.

W tym kroku **dopnij adapter do** `SocialModule` (jeszcze bez `RUN_EXECUTOR` / grafu), żeby KROK 8 mógł wstrzyknąć `SOCIAL_RESULT_STORE` do `GetRunUseCase`:

```typescript
providers: [
  { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
],
exports: [SOCIAL_RESULT_STORE],
```

`RunsModule` importuje `forwardRef(() => SocialModule)` od tego kroku (executor dojdzie w KROK 9).

**DoD (krok):**

- Restart procesu: wiersze `SocialIdea` i kolumny fazy zostają w SQLite.
- Domain Social nadal bez `@prisma/client`.

---



### KROK 8 — GET snapshot `result`/`hitl` + SSE `run.hitl`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt `docs/dokumentacja_komunikacji.md`. Social nie emituje SSE z węzłów (R-4) — tylko lifecycle.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.ts` (`TransitionExtras` + publish `run.hitl`)
- Zmiana: `apps/api/src/runs/application/run-lifecycle.service.spec.ts`
- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts`
- `RunsModule` już importuje `SocialModule` od KROK 7 (`SOCIAL_RESULT_STORE` w konstruktorze `GetRunUseCase`)



#### Refaktor — `RunLifecycleService.transition`

**Teraz** (`TransitionExtras`):

```typescript
export type TransitionExtras = {
  resultSummary?: string;
  failedCode?: string;
  failedMessage?: string;
};
```

**Zamień na:**

```typescript
export type TransitionExtras = {
  resultSummary?: string;
  failedCode?: string;
  failedMessage?: string;
  hitlOptions?: unknown[];
};
```

Po `publish` `run.status`, gdy `to === 'awaiting_hitl'`:

```typescript
    if (to === 'awaiting_hitl') {
      this.sseHub.publish({
        event: 'run.hitl',
        data: { runId: run.id, options: extras?.hitlOptions ?? [] },
      });
    }
```

`complete` nadal **nie** jest wołane (test Fazy 8 zostaje). Nowy asert: `publish` z `run.hitl` przy przejściu `running → awaiting_hitl`.

#### Refaktor — `GetRunUseCase.execute` zwracany obiekt

**Teraz:**

```typescript
      result: null,
      hitl: null,
```

**Zamień na (wstrzyknięty** `SocialResultStore`**):**

```typescript
    const ideas = await this.social.listIdeas(run.id);
    const stored = await this.social.getContent(run.id);
    const hitl =
      run.status === 'awaiting_hitl'
        ? { options: ideas }
        : null;
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedByUserId ?? null,
      result: {
        ideas,
        content: stored?.content ?? null,
      },
      hitl,
    };
```

Zmiana względem: wcześniejszy szkic tego kroku z `startedBy: run.startedBy`. Powód: `RunRecord` (Krok 3.2 — `WYKONANY`) posiada `startedByUserId: UserId | null`, nie pole `startedBy` — odwołanie do nieistniejącego pola zwróciłoby `undefined` w runtime. Opcja A: mapowanie bezpośrednio z `startedByUserId`. Wzbogacenie do `{ id, email }` — Faza 5 / Krok 5.2, po domknięciu auth i dołączeniu User do odczytu `RunRepository`.

**DoD (krok):**

- `GET /runs/:id` przy `awaiting_hitl` ma niepusty `hitl.options` i `result.ideas`.
- `interrupted` → `hitl: null` (docs).
- Unit lifecycle: `run.hitl` emitowany; `complete` nie.
- Pole `startedBy` w odpowiedzi ma typ `string | null` (surowe UserId lub brak inicjatora); TypeScript kompiluje się bez błędów.

---



### KROK 9 — Executor zamiast stuba: gateway, refine, re-invoke fazy

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 4.2. `RUN_EXECUTOR` = Social. Po `interrupted → running` re-invoke **fazy** z DB (S-6 pkt 5, R-9). Worker in-process bez zmian semantyki capu.

**Artefakty:**

- Nowy: `apps/api/src/social/application/social-run.executor.ts`
- Nowy: `apps/api/src/social/application/social-run.executor.spec.ts`
- Zmiana: `apps/api/src/social/social.module.ts`
- Zmiana: `apps/api/src/runs/runs.module.ts` (usunąć binding `StubRunExecutor`; `forwardRef` + import Social)
- `StubRunExecutor` — zostawić plik + spec jako martwy albo usunąć w tym kroku; **nie** rejestrować w module. Komentarz w e2e D-9 zaktualizować („production uses SocialRunExecutor”).



#### Nowy plik — `social-run.executor.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunExecutorPort } from '../../runs/domain/run-executor.port';
import type { RunRecord } from '../../runs/domain/run.types';
import { RunLifecycleService } from '../../runs/application/run-lifecycle.service';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../domain/social-result.port';
import { SocialPipelineFacade } from './social-pipeline.facade';
import type { PipelinePhase } from '../domain/social.types';

@Injectable()
export class SocialRunExecutor implements RunExecutorPort {
  constructor(
    private readonly facade: SocialPipelineFacade,
    private readonly lifecycle: RunLifecycleService,
    @Inject(SOCIAL_RESULT_STORE) private readonly store: SocialResultStore,
  ) {}

  async execute(run: RunRecord): Promise<void> {
    const ideas = await this.store.listIdeas(run.id);
    const pipeline = await this.store.getPipelineState(run.id);

    if (
      run.taskType === 'post_ideas_then_content' &&
      ideas.length > 0 &&
      (run.selectedIdeaIds == null || run.selectedIdeaIds.length === 0)
    ) {
      await this.lifecycle.transition(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
      return;
    }

    const phase = this.resolvePhase(run, pipeline.phase);
    await this.store.savePipelineState(run.id, {
      phase,
      ideasRefineCount: pipeline.ideasRefineCount,
      contentRefineCount: pipeline.contentRefineCount,
    });

    try {
      const outcome = await this.facade.invokePhase(run, phase, {
        ideas,
        ideasRefineCount: pipeline.ideasRefineCount,
        contentRefineCount: pipeline.contentRefineCount,
      });
      if (outcome.kind === 'awaiting_hitl') {
        await this.lifecycle.transition(run, 'awaiting_hitl', {
          hitlOptions: outcome.ideas,
        });
        return;
      }
      if (outcome.kind === 'failed') {
        await this.lifecycle.transition(run, 'failed', {
          failedCode: outcome.code,
          failedMessage: outcome.message,
        });
        return;
      }
      await this.lifecycle.transition(run, 'completed', {
        resultSummary:
          phase === 'ideas'
            ? `ideas:${outcome.ideas.length}`
            : 'content',
      });
    } catch (error) {
      const failedCode =
        error instanceof DomainException
          ? error.code
          : error instanceof LlmGatewayError
            ? (error.gatewayCode ?? 'GATEWAY_ERROR')
            : 'EXECUTOR_FAILED';
      const failedMessage =
        error instanceof Error ? error.message : 'pipeline failed';
      await this.lifecycle.transition(run, 'failed', {
        failedCode,
        failedMessage,
      });
    }
  }

  private resolvePhase(run: RunRecord, storedPhase: PipelinePhase | null): PipelinePhase {
    if (storedPhase) return storedPhase;
    if (run.taskType === 'post_content') return 'content';
    if (
      run.taskType === 'post_ideas_then_content' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'content';
    }
    return 'ideas';
  }
}
```

Zmiana względem: wcześniejszy szkic `resolvePhase(run: RunRecord)` bez parametru `storedPhase`. Powód: kolumna `pipelinePhase` na `Run` (KROK 7) jest zapisywana przez `savePipelineState` przed `facade.invokePhase`, ale nie była odczytywana w recovery — pełniła wyłącznie rolę observability. Po korekcie: `storedPhase` (z `getPipelineState().phase`) staje się pierwszeństwem w rozwiązaniu fazy; dla istniejących `taskType` wynik jest identyczny z poprzednią logiką (bez regresji). Kolumna staje się aktywnym fallbackiem przy typach zadań niejednoznacznych bez pełnego stanu `RunRecord`.

Reguły fazy (po korekcie):

- `storedPhase` niepuste → zawsze ta wartość (fallback z DB; priorytet przed poniższymi regułami)
- `post_ideas` → `ideas`
- `post_content` → `content`
- `then_content` + `selectedIdeaIds.length ≥ 1` → `content` (po HITL albo start z wyborem)
- `then_content` + pomysły w DB bez wyboru → **wczesny return** `awaiting_hitl` (recovery po crashu między persist a transition)
- w przeciwnym razie → `ideas`



#### Refaktor — `social.module.ts` (rozszerzenie KROK 7)

**Teraz (po KROK 7):** store + export, bez executora.

**Zamień na** pełny moduł z `forwardRef(RunsModule)`, `LlmModule`, `LlmHopService`, `SocialPipelineFacade`, `SocialRunExecutor` i `{ provide: RUN_EXECUTOR, useExisting: SocialRunExecutor }` — jak poniżej:

```typescript
import { Module, forwardRef } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { LlmModule } from '../llm/llm.module';
import { RUN_EXECUTOR } from '../runs/domain/run-executor.port';
import { RunsModule } from '../runs/runs.module';
import { SOCIAL_RESULT_STORE } from './domain/social-result.port';
import { SocialPipelineFacade } from './application/social-pipeline.facade';
import { SocialRunExecutor } from './application/social-run.executor';
import { LlmHopService } from './infrastructure/graph/llm-hop';
import { PrismaSocialResultAdapter } from './infrastructure/persistence/prisma-social-result.adapter';
import { SocialController } from './social.controller';

@Module({
  imports: [
    forwardRef(() => RunsModule),
    LlmModule,
    CompanyContextModule,
  ],
  controllers: [SocialController],
  providers: [
    { provide: SOCIAL_RESULT_STORE, useClass: PrismaSocialResultAdapter },
    LlmHopService,
    SocialPipelineFacade,
    SocialRunExecutor,
    { provide: RUN_EXECUTOR, useExisting: SocialRunExecutor },
  ],
  exports: [RUN_EXECUTOR, SOCIAL_RESULT_STORE],
})
export class SocialModule {}
```

`CompanyContextModule` już eksportuje `COMPANY_CONTEXT_REPOSITORY`.

#### Refaktor — `runs.module.ts`

**Teraz (fragment):**

```typescript
import { StubRunExecutor } from './infrastructure/stub-run.executor';
// ...
  imports: [CompanyContextModule],
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    { provide: RUN_EXECUTOR, useClass: StubRunExecutor },
```

**Zamień na:**

```typescript
import { Module, forwardRef } from '@nestjs/common';
import { SocialModule } from '../social/social.module';
// ...
  imports: [CompanyContextModule, forwardRef(() => SocialModule)],
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
```

Usunąć provider `RUN_EXECUTOR` z Runs (token przychodzi z Social). `GetRunUseCase` dostaje `SOCIAL_RESULT_STORE` z importu Social.

Worker przy catch nadal oznacza `failed`, jeśli executor rzuci **zanim** sam zrobi `transition` — executor w tym planie łapie błędy i woła `failed` sam. Żeby uniknąć podwójnego `failed`, **nie rzucać** po obsłudze (albo sprawdzić status jak dziś w workerze). Zostawić catch workera jako siatkę.

**DoD (krok):**

- `POST /runs` nie blokuje na LLM (202 + worker).
- Log hopu ma `conversationId` runu i `requestId` z odpowiedzi gateway (albo brak `requestId` przy dropie).
- Refine ≤ 2, potem `failed` z powodem kontekst i/lub język.
- Crash przy `running` → Faza 7 recovery; kolejny `execute` wznawia fazę z DB, nie checkpoinera.
- `awaiting_hitl` po restarcie zostaje (nie `interrupted`).
- `resolvePhase` przyjmuje `storedPhase: PipelinePhase | null`; przy niepustej wartości zwraca ją bez sprawdzania `taskType`/`selectedIdeaIds`.

---



### KROK 10 — Testy Jest D-4…D-8 (fake LLM)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** `SPEC-TESTY.md` D-4…D-8 na PR bez live vendora. Graf pełny rzadko — happy path integration z fake `LlmGatewayPort`.

**Artefakty (nowe / zmiana):**

- Nowy: `apps/api/src/social/application/social-pipeline.integration.spec.ts` (albo `test/social-pipeline.e2e-spec.ts`)
- Zmiana: `apps/api/test/runs-lifecycle.e2e-spec.ts` — asercja StubRunExecutor → logi `IdeationAgent` / `ConsistencyVerifier`; override `LLM_GATEWAY_PORT` zwracający poprawny JSON ideas
- Nowy helper fake: `apps/api/test/fake-llm-gateway.ts`



#### Nowy plik — `apps/api/test/fake-llm-gateway.ts`

```typescript
import {
  createConversationId,
  createRequestId,
} from '@content-chain/shared';
import type { LlmGatewayPort } from '../src/llm/llm-gateway.port';
import type { LlmChatCommand, LlmChatResult } from '../src/llm/llm-gateway.types';
import { LlmGatewayError } from '../src/llm/llm-gateway.errors';

export class FakeLlmGateway implements LlmGatewayPort {
  script: Array<string | 'GATEWAY_FAIL'> = [];
  calls: LlmChatCommand[] = [];

  async chat(command: LlmChatCommand): Promise<LlmChatResult> {
    this.calls.push(command);
    const next = this.script.shift() ?? ideasJson();
    if (next === 'GATEWAY_FAIL') {
      throw new LlmGatewayError(
        'Gateway chat failed (PROVIDER_UNAVAILABLE)',
        'PROVIDER_UNAVAILABLE',
        undefined,
        true,
      );
    }
    return {
      text: next,
      requestId: createRequestId('req_123e4567-e89b-12d3-a456-426614174000'),
      conversationId: command.conversationId,
      model: 'chat-default',
    };
  }
}

export function ideasJson(): string {
  return JSON.stringify({
    ideas: [
      { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
      { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
    ],
  });
}

export function verifierOk(): string {
  return JSON.stringify({ ok: true, contextIssues: [], languageIssues: [] });
}

export function verifierFail(): string {
  return JSON.stringify({
    ok: false,
    contextIssues: ['off-brand CTA'],
    languageIssues: [],
  });
}

export function contentJson(): string {
  return JSON.stringify({
    body: 'Gotowy post.',
    hashtags: ['#acme'],
    cta: 'Napisz do nas',
  });
}

export { createConversationId };
```

Sekwencja D-4 (`post_ideas`): `ideasJson`, `verifierOk`.  
D-5: ideas+ok → HITL → `contentJson`+`verifierOk`. Zły HITL na `completed` już jest w e2e.  
D-6: `ideasJson`, `verifierFail`, `ideasJson` (refine), `verifierOk` **oraz** wariant: fail ×3 hopów verifiera po 2 refine → `failed`.  
D-7: `GATEWAY_FAIL` (retryable) ×3 → `failed`; logi bez `X-Gateway-Key` / wartości `GATEWAY_KEY`.  
D-8: wszystkie `chat` z tym samym `conversationId`; log kroku z `requestId` stuba.

E2e lifecycle: `overrideProvider(LLM_GATEWAY_PORT).useValue(fake)` w `beforeAll` happy-path (nie w bloku D-9 z holding executor). Timeout `waitForRunStatus` podnieść, jeśli graf ma kilka hopów (nadal fake = szybki).

**DoD (krok):**

- D-4…D-8 pokryte (warstwa integration/e2e + unit refine).
- `pnpm --filter api test` i `test:e2e` bez sieci do vendora.
- D-9 / D-9b / D-10 / D-14 **nie** zepsute.

---



### KROK 11 — Kolekcja Postman: obie ścieżki happy path

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Major 4.3 + DoD Milestone 4. Powtarzalne bez UI. Auth nie jest wymagany (Faza 5 później). Gateway **lokalny** musi działać — to dowód pośredni ops, nie CI PR.

**Artefakty (nowe):**

- `apps/api/postman/social-pipeline.postman_collection.json`
- `apps/api/postman/README.md` (jak odpalić: api :3001 + gateway + kompletny kontekst; cookie jar niepotrzebny)

Kolekcja v2.1, zmienne: `baseUrl` = `http://localhost:3001/api/v1`, `runId`, `ideaId`.

Foldery:

1. **Setup** — `PUT /company-context` (body jak `completeContextBody` z e2e).
2. **A. post_ideas** — `POST /runs` (`taskType: post_ideas`) → pętla `GET /runs/:runId` aż `completed` → `GET .../logs` (asercja: jest `conversationId`, jest `requestId` na hopie, brak sekretu gateway w body).
3. **B. post_ideas_then_content** — `POST /runs` → czekaj `awaiting_hitl` → weź `result.ideas[0].id` → `POST .../hitl` `{ selectedIdeaIds: [id] }` → czekaj `completed` + `result.content.body`.

Skrypty testów Postman: `pm.test` na status 202/200, `status` enum, niepusty `result`. SSE opcjonalnie (Postman słabo trzyma EventSource) — Milestone 4 nie wymaga SSE; logi + snapshot wystarczą. Heartbeat z Fazy 8 nie blokuje.

**DoD (krok):**

- Ręcznie / Newman lokalnie: obie ścieżki zielone przy żywym gateway i kompletnych env z `.env.example`.
- UI nie jest potrzebny.
- Kolekcja bez sekretów (placeholder `GATEWAY` nie występuje — klient nie woła gateway).

---



## Weryfikacja wycinka


| Wymaganie                                    | Gdzie                                             |
| -------------------------------------------- | ------------------------------------------------- |
| S-1 fasada, nie controller                   | KROK 6 / 9                                        |
| S-2 graf + pliki promptów                    | KROK 3 / 5 / 6                                    |
| S-3 Zod przed dalszym krokiem                | KROK 2 / 5                                        |
| S-4 jeden ConsistencyVerifier, dwa obszary   | KROK 5                                            |
| S-5 max refine N=2                           | KROK 1 / 6                                        |
| S-6 / S-9 model B, brak checkpoinetera       | KROK 7 / 9                                        |
| S-7 jednoetapowe bez HITL                    | KROK 6 / 9                                        |
| S-8 ten sam ConversationId, requestId w logu | KROK 5 / 10 / 11                                  |
| D-4…D-8                                      | KROK 10                                           |
| Postman obie ścieżki / Milestone 4           | KROK 11                                           |
| SSE complete po completed/failed (Faza 8)    | bez regresji; `awaiting_hitl` nie woła `complete` |
| Cap `interrupted` (Faza 7)                   | executor siada na claimu; re-invoke fazy          |


**Pass rozwojowy (potwierdzenie):** porty (1) → Zod (2) → prompty (3) → pakiety (4) → węzły (5) → graf/fasada (6) → Prisma + eksport `SOCIAL_RESULT_STORE` (7) → snapshot/SSE (8) → executor / `RUN_EXECUTOR` (9) → Jest (10) → Postman (11). Binding store w module **przesunięty do KROK 7**, żeby KROK 8 nie czekał na executor.

**Nagłówki:** wyłącznie `FAZA 1` / `KROK 1`…`KROK 11`.

---



## Ślad do major (informacyjnie)

Po implementacji (poza tą sesją):

- Faza 4 → `WYKONANY`
- Kroki 4.1, 4.2, 4.3 → `WYKONANY`
- MILESTONE 4 → `OSIĄGNIĘTY`

Ten skill **nie** edytuje `content-chain-backend_major_plan.md`.
)