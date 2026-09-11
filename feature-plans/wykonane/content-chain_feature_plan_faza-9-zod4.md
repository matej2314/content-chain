# Content Chain — feature plan: Zod 4 w `apps/api`

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-9-zod4.md`  
**Kotwica major:** Faza 9 (cała) — kroki 9.1 i 9.2. Refaktor względem Fazy 1 / Kroku 1.4 (`WYKONANY`) — Zod jako walidacja application w `apps/api`; oraz świadomy pin Zod 3 z `feature-plans/wykonane/content-chain_feature_plan_faza-4-pipeline-social.md` (Interop Zod 3, **nie** Zod 4.x w tamtym wycinku).  
**Źródła:** `docs/brand_types.md`, `docs/architektura.md`, `docs/anty_patterny.md`, `docs/dictionary.md`, `SPEC-KOMUNIKACJA.md` (Zod w application, bez pinu major), `SPEC-MONOREPO.md` M-5 / M-8, `SPEC-SOCIAL.md` S-3, `SPEC-CONTENT.md` Ctn-3, `SPEC-RUNY.md` R-3d, `SPEC-TESTY.md` D-19a / D-20, `SPEC-KONTEKST-FIRMY.md` C-4, major Faza 9.  
**Kolejność `KROK` w tym pliku ≠ numeracja major 9.1 / 9.2 1:1** — pass rozwojowy: helpery i env przed schemami BC i grafami; testy = major 9.2.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 9 majoru: jedna linia `zod@^4.4.x` w `apps/api` jak w `apps/ai-provider-gateway` (`^4.4.3`) |
| Major | Faza 9 / kroki 9.1–9.2; start **po** Fazach 4, 4.1, 4.2, 4.3, 5, 6 (`WYKONANY`) i Milestone 4, 4.2, 4.3, 5, 6 (`OSIĄGNIĘTY`); Fazy 7 i 8 już `WYKONANY` |
| Poza zakresem | Migracja grafu Social/Content na LangGraph `StateSchema`; zmiana kontraktu HTTP; Zod w `packages/shared`; semantyka gateway (poza lockfile workspace, jeśli hoist wymusi ten sam 4.4.x — **bez** obniżania gateway do 3); `tsconfig` |
| Po implementacji (informacyjnie) | Major: Faza 9 i kroki 9.1–9.2 → `WYKONANY`. Brak `MILESTONE` 9. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 9.1 | KROK 1–5 | Bump + helpery + env + schemy BC + grafy `z.object` |
| 9.2 | KROK 6 | Unit / e2e regresji walidacji |

**Pass rozwojowy (sesja planu):** helpery (`parseWithZod` / `parseLlmJson` / `LlmHopService`) i `env.schema` przed schemami BC; grafy po schemach; testy na końcu. Brak przesunięć między fazami major.

---

## Założenia

- Stack api bez zmian poza major Zod: NestJS 11, class-validator na HTTP, Zod **tylko** w application, Prisma, LangGraph `z.object` (nie `StateSchema`).
- Pin: `apps/api` → `zod@^4.4.3` (ta sama deklaracja co gateway). SPEC **nie** pinuje majoru — tu egzekwujemy major Faza 9.
- `packages/shared` **bez** zależności `zod` (`SPEC-MONOREPO.md` M-5, `docs/brand_types.md`).
- Wzorzec typów: gateway — `import type { ZodType } from 'zod'` / `z.ZodType`; `ctx.addIssue({ code: z.ZodIssueCode.custom, ... })`; `.strict()` na obiektach, które mają odrzucać nieznane klucze; `issue.path.join('.')`.
- Kontrakt błędów bez zmian: `VALIDATION_FAILED` (400) z `details[].path` separatorem `'.'` (`SPEC-KOMUNIKACJA.md` K-8); structured output LLM → `STRUCTURED_OUTPUT_INVALID` (500), nie cichy tekst (`SPEC-SOCIAL.md` S-3).
- `z.object()` w Zod 4 **obcina** nieznane klucze (strip), **nie** odrzuca. Semantyka `.strict()` / `z.strictObject` **musi** zostać na briefach, extras i startcie runu — inaczej D-19a i C-4 zamieniłyby się w ciche strip.
- `.default([])` ma nadal działać **tylko** przy braku klucza (`undefined`). `null` w `contextIssues` / `hashtags` → fail parse (testy Social/Content). Jeśli po bumpie Zod 4 zaakceptuje `null`, schemat **dostawić** tak, by `null` znów padał — nie zmieniać DoD testu.
- `tsconfig` api **bez zmian**. Zakaz `any`, `as` na parse JSON, `@ts-ignore`. Dane zewnętrzne: `unknown` + `safeParse`.
- Branded `RunId`: `runIdSchema` zostaje `z.string().refine(isRunId).transform(createRunId)` — output = brand, nie goły `string`.
- HTTP DTO / class-validator / envelope **bez** zmian kontraktu.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/websites/zod_dev` (changelog Zod 4 + basics). Wersja w projekcie: gateway `zod@^4.4.3`; api dziś `zod@^3.25.76`. Peer `@langchain/langgraph@^1.4.10`: `zod@^3.25.32 \|\| ^4.2.0` — 4.4.x wchodzi w zakres.

Ustalenia użyte w krokach:

| Temat | Zod 4 (`/websites/zod_dev` changelog) | Decyzja w api |
|-------|--------------------------------------|---------------|
| `ZodTypeAny` | baza to `ZodType<Output, Input>` (2 generyki, default `unknown`) | `T extends z.ZodType` + `z.output<T>` (nie `any`) |
| Issue types | `z.ZodCustomIssue` → `z.core.$ZodIssueCustom`; kody issue przemianowane | `addIssue` jak gateway: `code: z.ZodIssueCode.custom` (żywy 4.4.3). Gdy tsc padnie — `code: 'custom'` |
| `.strict()` / `.passthrough()` | kanon: `z.strictObject` / `z.looseObject` | **zostaw `.strict()`** jak gateway; fallback `z.strictObject({...})` tylko gdy metoda zniknie z typów 4.4.3 |
| `.default()` | nadal na `undefined` w decode; **nie** mylić z encode | pin testami `null` → fail |
| `z.preprocess` | nadal w publicznym API (pipe pod spodem) | zostaje (verifier coerce, `durationSeconds`) |
| `z.infer` / `z.output` | `z.output` ≡ `z.infer` po transform | helpery zwracają `z.output<T>` |
| `z.string().email()` vs `z.email()` | top-level formats są kanonem v4 | **zostaw `z.string().email()`** (mniejszy dryf regexa); gdy usunięte → `z.email()` |
| `z.enum(as const)` | gateway tak robi na krotkach | `z.enum(SOCIAL_TASK_TYPES)` itd. bez zmian kształtu |
| import | changelog często `import * as z` | zostaje `import { z } from 'zod'` jak api i gateway |

Przy konflikcie praktyki Zod 4 ze SPEC (np. strip zamiast reject nieznanych kluczy) → **wygrywa SPEC** (`.strict()` na extras / brief).

---

## FAZA 1 — Refaktor Zod 4 w `apps/api`

Odpowiada major **Faza 9**. Jedna faza w tym zestawie.

---

### KROK 1 — Bump `zod@^4.4.3` i lockfile

**Status:** `WYKONANY`

**Cel:** `apps/api` zależy od tej samej linii Zod co gateway. Major 9.1 (start). `SPEC-KOMUNIKACJA.md` (Zod w application). `packages/shared` bez Zod.

**Artefakty:**

- Zmiana: `apps/api/package.json`
- Zmiana: `pnpm-lock.yaml` (root workspace)
- Bez zmiany: `apps/ai-provider-gateway/package.json` (zostaje `zod@^4.4.3`, semantyka nietknięta)
- Bez zmiany: `packages/shared/package.json`

**Kolejność:** deklaracja w `package.json` → `pnpm install` z roota → weryfikacja drzewa.

#### Implementacja — `apps/api/package.json`

**teraz** (fragment `dependencies`):

```json
    "zod": "^3.25.76"
```

**zamień na:**

```json
    "zod": "^4.4.3"
```

Z roota workspace:

```bash
pnpm install
```

Nie obniżać gateway. Jeśli hoist zwinie obie aplikacje do jednego 4.4.x — OK. Jeśli lockfile doda drugi wpis 4.4.x tylko dla api — też OK.

**Weryfikacja drzewa:** `pnpm --filter api why zod` — bezpośrednia zależność api to 4.4.x. Transitive Zod 3 u innego pakietu (jeśli peer opcjonalny LangChain) **nie** wraca do `apps/api/package.json`. Api **nie** importuje `zod/v3`.

#### Biblioteki / API

Context7 `/websites/zod_dev` — instalacja v4 jako `zod@^4`. Peer LangGraph: 4.2.0+; 4.4.3 spełnia.

#### Testy

Brak nowych testów w tym kroku. Kompilacja api może **nie** przejść do KROK 2 (to oczekiwane). Nie commituj bumpa w izolacji jako „gotowe”, jeśli tsc pada na `ZodTypeAny`.

#### DoD (krok)

- `apps/api/package.json` ma `"zod": "^4.4.3"`.
- Lockfile workspace zaktualizowany; gateway nadal na linii 4.4.x.
- `packages/shared` bez `zod`.
- Brak importu `zod/v3` w `apps/api/src`.

---

### KROK 2 — Kernel walidacji: `parseWithZod`, `parseLlmJson`, `LlmHopService`

**Status:** `WYKONANY`

**Cel:** Publiczne granice parserów kompilują się na `z.ZodType` / `z.output<T>`; kody domenowe bez zmian. Major 9.1 (`parse-with-zod.ts`, `parse-llm-json.ts`). `SPEC-MONOREPO.md` M-8, `SPEC-KOMUNIKACJA.md` K-8, `SPEC-SOCIAL.md` S-3.

**Artefakty:**

- Zmiana: `apps/api/src/shared/parse-with-zod.ts` (cały plik — mały)
- Zmiana: `apps/api/src/shared/llm/parse-llm-json.ts` (sygnatura)
- Zmiana: `apps/api/src/shared/llm/llm-hop.ts` (constraint generyczny)
- Bez zmiany: `DomainException`, separator `path`

**Kolejność:** `parse-with-zod` → `parse-llm-json` → `llm-hop` (hop woła `parseLlmJson`).

#### Implementacja — `apps/api/src/shared/parse-with-zod.ts`

Plik po zmianie (kompletny):

```typescript
import { z } from 'zod';
import { DomainException } from './exceptions/domain.exception';

export function parseWithZod<T extends z.ZodType>(
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

**teraz** (sygnatura):

```typescript
export function parseWithZod<T extends z.ZodTypeAny>(
  schema: T,
  input: unknown,
): z.output<T> {
```

**zamień na:** jak wyżej (`z.ZodType`). Ciało `safeParse` / mapowanie `issues` bez zmian semantyki. `issue.path` w Zod 4 to `PropertyKey[]` — `join('.')` zostaje (K-8).

Nie używać `ZodType<any>` ani `import type { ZodTypeAny }`.

#### Implementacja — `apps/api/src/shared/llm/parse-llm-json.ts`

**teraz:**

```typescript
export function parseLlmJson<T extends z.ZodTypeAny>(
  schema: T,
  raw: string,
): z.output<T> {
```

**zamień na:**

```typescript
export function parseLlmJson<T extends z.ZodType>(
  schema: T,
  raw: string,
): z.output<T> {
```

Reszta pliku bez zmian: `JSON.parse` na `extractJsonText` → `unknown` → `safeParse` → przy fail `STRUCTURED_OUTPUT_INVALID` (500) + `details[].path`.

#### Implementacja — `apps/api/src/shared/llm/llm-hop.ts`

**teraz:**

```typescript
interface ChatJsonInput<T extends z.ZodTypeAny> {
  runId: RunId;
  conversationId: ConversationId;
  step: string;
  userContent: string;
  schema: T;
}
```

oraz

```typescript
  async chatJson<T extends z.ZodTypeAny>(
    input: ChatJsonInput<T>,
  ): Promise<{ data: z.output<T>; requestId: RequestId }> {
```

**zamień na:**

```typescript
interface ChatJsonInput<T extends z.ZodType> {
  runId: RunId;
  conversationId: ConversationId;
  step: string;
  userContent: string;
  schema: T;
}
```

```typescript
  async chatJson<T extends z.ZodType>(
    input: ChatJsonInput<T>,
  ): Promise<{ data: z.output<T>; requestId: RequestId }> {
```

Retry hopu i mapowanie `STRUCTURED_OUTPUT_INVALID` bez zmian.

#### Biblioteki / API

Context7: `ZodType<Output = unknown, Input = unknown>`; `z.output<T>` po `transform`. Wzorzec gateway: `ZodType<T>` w `load-answers.ts` — tu `T extends z.ZodType` + `z.output<T>`, bo `runIdSchema` ma transform do brandu.

#### Testy

Istniejące: `social.schemas.spec.ts` / `content.schemas.spec.ts` (przez `parseLlmJson`), `run.schemas.spec.ts` (przez `parseWithZod`), `llm-hop.spec.ts`. Zielone po KROK 4–6; w tym kroku tsc na trzech plikach bez `ZodTypeAny`.

#### DoD (krok)

- W `apps/api/src` zero `ZodTypeAny`.
- `parseWithZod` nadal rzuca `VALIDATION_FAILED` / 400 / `details[].path` z `'.'`.
- `parseLlmJson` nadal rzuca `STRUCTURED_OUTPUT_INVALID` / 500 przy złym JSON i złym kształcie.
- Sygnatury publiczne mają jawny constraint `z.ZodType` i zwrot `z.output<T>`.

---

### KROK 3 — `env.schema`: `addIssue`, coerce, CORS w production

**Status:** `WYKONANY`

**Cel:** `validateEnv` kompiluje się na Zod 4; fail-fast production (`CORS_ORIGIN=*`, SMTP) bez zmiany semantyki. Major 9.1 (`env.schema.ts`). `SPEC-KOMUNIKACJA.md` K-3b / K-8, `SPEC-BEZPIECZENSTWO.md` (env).

**Artefakty:**

- Zmiana: `apps/api/src/shared/config/env.schema.ts` (tylko jeśli API `addIssue` / `ZodIssueCode` pęknie)
- Bez zmiany: lista pól, defaulty (`PORT` 3001, `SSE_HEARTBEAT_MS` 25_000, `RUN_SSE_SUBJECT_TTL_MS` 600_000, `MAX_CONCURRENT_RUNS` 3)
- Bez zmiany: `env.module.ts`, `parseCorsOrigins`

**Kolejność:** dostosować `superRefine` → odpalić `env.schema.spec.ts` (pełne zielone w KROK 6; tu tsc + unit env wolno wcześniej).

#### Implementacja — `apps/api/src/shared/config/env.schema.ts`

Fragment `superRefine` — **teraz i docelowo** (wzorzec gateway 4.4.3):

```typescript
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['CORS_ORIGIN'],
        message: 'CORS_ORIGIN cannot be * in production',
      });
```

oraz analogicznie dla brakujących pól production (`APP_PUBLIC_URL`, `MAIL_FROM`, `SMTP_*`).

**Fallback (tylko gdy `z.ZodIssueCode` znika z typów 4.4.3):**

```typescript
      ctx.addIssue({
        code: 'custom',
        path: ['CORS_ORIGIN'],
        message: 'CORS_ORIGIN cannot be * in production',
      });
```

Nie przechodzić na `z.core.$ZodIssueCustom` w ciele `addIssue` — to typy issue, nie input `addIssue`.

`z.coerce.number()` na `PORT` / `SSE_*` / `SMTP_PORT` / `MAX_CONCURRENT_RUNS` **zostaje**. `z.enum(['development', 'production', 'test'])` zostaje. `z.string().url()` na `GATEWAY_BASE_URL` / `APP_PUBLIC_URL` zostaje.

`validateEnv` nadal:

```typescript
export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}
```

Nest `ConfigModule` podaje `process.env` jako `Record<string, unknown>` — bez `as Env`.

#### Biblioteki / API

Context7: kody issue przemianowane w typach `$ZodIssue*`. Runtime `addIssue({ code: 'custom' })` jest kanoniczne; gateway trzyma `z.ZodIssueCode.custom` na 4.4.3 — **najpierw skopiuj gateway**.

#### Testy

Istniejący `apps/api/src/shared/config/env.schema.spec.ts`: brak pola krytycznego → throw; production + `CORS_ORIGIN=*` → throw; production bez SMTP → throw; defaulty `INVITE_TTL` / `MAX_CONCURRENT_RUNS`. **Nie** przepisywać asercji na konkretny tekst `ZodError`, chyba że Zod 4 zmieni komunikat **i** test trzymał string (dziś: `toThrow()` bez message).

#### DoD (krok)

- `validateEnv` kompiluje się; `Env = z.infer<typeof envSchema>`.
- Production: `CORS_ORIGIN=*` odrzucony; brak SMTP / `APP_PUBLIC_URL` odrzucony.
- Development: SMTP opcjonalny; defaulty liczbowe z coerce bez zmian.
- Brak hardkodowania `SSE_HEARTBEAT_MS` / `RUN_SSE_SUBJECT_TTL_MS` poza schemą env.

---

### KROK 4 — Schemy application BC

**Status:** `WYKONANY`

**Weryfikacja:** tsc/lint czyste na Zod 4.4.3; testy D-19a / D-20 / `.default([])` vs `null` zielone. Fallbacki `z.strictObject`, `z.email()`, preprocess zamiast `.default([])` nie uruchomione. Oczekiwana zmiana źródła = brak.

**Cel:** Wszystkie schemy application kompilują się na Zod 4 **bez** zmiany kontraktu walidacji (XOR brief, extras `.strict()`, S-3, branded runId). Major 9.1 (`run.schemas.ts`, `social.schemas.ts`, stan grafu — graf = KROK 5). `SPEC-RUNY.md` R-3d, `SPEC-KONTEKST-FIRMY.md` C-4, `SPEC-SOCIAL.md` S-3, `SPEC-CONTENT.md` Ctn-3, `SPEC-FEEDBACK.md`, `SPEC-AUTH.md`.

**Artefakty (inwentarz importów `zod` poza helperami/env/grafami):**

| Plik | Oczekiwana zmiana źródła |
|------|--------------------------|
| `runs/application/run.schemas.ts` | brak, o ile `.strict()` + `discriminatedUnion` + `z.enum(as const)` kompilują się |
| `social/application/social.schemas.ts` | brak, o ile `z.preprocess` + `.default([])` kompilują się |
| `content/application/content.schemas.ts` | j.w. |
| `company-context/application/company-context.schemas.ts` | `.strict()` zostaje |
| `auth/application/auth.schemas.ts` | `z.string().email()` zostaje albo `z.email()` (fallback) |
| `auth/application/invite-user.use-case.ts` | j.w. na `inviteUserSchema` |
| `auth/application/accept-invite.use-case.ts` | brak (min string) |
| `feedback/application/feedback.schemas.ts` | `z.enum` + `discriminatedUnion` |
| `runs/application/rate-run.use-case.ts` | `z.union([z.null(), z.number()...])` |

**Kolejność:** Runs (start + brief) → Social/Content structured output → company-context extras → auth → feedback → rating. Nie ruszać DTO HTTP.

#### Semantyka, której nie wolno zgubić

1. **Start runu** — `z.discriminatedUnion('taskType', [socialStartRunSchema, pageStartRunSchema])` z `.strict()` na gałęziach i briefach. Page + `platform` / `brief.ideaCount` → fail; Social + `contentKind` / `brief.angle` / `brief.targetLength` → fail (`SPEC-TESTY.md` D-19a). `omitUndefinedDeep` w `StartRunUseCase` zostaje (klucz `undefined` ze stripu Nest vs `.strict()`).
2. **Extras** — `companyContextExtrasSchema.strict()`; nieznany klucz → fail (D-20). `nullable()` na input.
3. **Verifier / hashtags** — `.default([])` przy braku klucza; `null` → `STRUCTURED_OUTPUT_INVALID`.
4. **Coerce verifier** — `z.preprocess(coerceVerifierIssue, z.string())`; obiekt `{ itemId\|item, quote?, issue }` → jeden string; `{}` / liczba → fail.
5. **`reelDurationSecondsSchema`** — `z.preprocess` string `"15"|"30"|"90"` → number literal union.

#### Fallback `.strict()` → `z.strictObject`

Tylko gdy tsc: `.strict does not exist`. Przykład briefu Social:

**teraz:**

```typescript
export const socialBriefSchema = z
  .object({
    topic: z.string(),
    audience: z.string().optional(),
    goal: z.string().optional(),
    ideaCount: z.number().int().min(1).optional(),
  })
  .strict();
```

**zamień na (fallback):**

```typescript
export const socialBriefSchema = z.strictObject({
  topic: z.string(),
  audience: z.string().optional(),
  goal: z.string().optional(),
  ideaCount: z.number().int().min(1).optional(),
});
```

To samo dla `contentBriefSchema`, `socialStartRunSchema`, `pageStartRunSchema`, `companyContextCaseStudySchema`, `companyContextObjectionSchema`, `companyContextExtrasSchema`. **Nie** stosować `z.strictObject` na schemach structured output LLM (ideas/content/outline) — tam nieznane klucze LLM mają być obcinane jak dziś (`z.object` strip), nie 500 przez extra key.

#### Fallback `z.string().email()`

**teraz** (`auth.schemas.ts` / `invite-user.use-case.ts`):

```typescript
  email: z.string().email(),
```

**zamień na (tylko gdy metoda usunięta):**

```typescript
  email: z.email(),
```

Happy-path e-maile w testach auth (`user@example.com`) muszą przejść.

#### Fallback `.default([])` vs `null`

Jeśli po bumpie test „defaults missing issue arrays and rejects null” padnie, bo Zod 4 przyjmie `null`:

**teraz:**

```typescript
  contextIssues: z.array(verifierIssueSchema).default([]),
  languageIssues: z.array(verifierIssueSchema).default([]),
```

**zamień na:**

```typescript
  contextIssues: z.preprocess((value: unknown) => {
    if (value === undefined) return [];
    return value;
  }, z.array(verifierIssueSchema)),
  languageIssues: z.preprocess((value: unknown) => {
    if (value === undefined) return [];
    return value;
  }, z.array(verifierIssueSchema)),
```

To samo dla `hashtags` w `contentOutputSchema`, jeśli analogiczny test padnie. Semantyka S-3 ważniejsza niż idiomatyczne `.default`.

#### `z.enum` na krotkach shared

Zostaje `z.enum(SOCIAL_TASK_TYPES)` itd. — `as const` w `packages/shared` (wzorzec gateway `z.enum(PROVIDER_TYPES)`). Feedback: `z.enum([firstAgentKey, ...otherAgentKeys])` zostaje (wartownik `undefined` na pustej krotce).

#### `runIdSchema`

Bez zmiany kształtu:

```typescript
export const runIdSchema = z
  .string()
  .refine(isRunId, { message: 'Invalid runId' })
  .transform((value) => createRunId(value));
```

`parseWithZod(runIdSchema, …)` zwraca `RunId`, nie `string`.

#### Prisma adapter brief

`prisma-run.adapter.ts`: `socialBriefSchema.safeParse` / `contentBriefSchema.safeParse` wg `taskType` — **bez** `as`. Po zmianie `.strict()` / `strictObject` zachowanie śmieci w JSON bez zmian (fail adaptera).

#### Biblioteki / API

Context7: `z.strictObject` kanon v4; `.strict()` żywy w gateway 4.4.3. `discriminatedUnion` zostaje. `z.preprocess` zostaje.

#### Testy

Nie dodawać nowych plików, chyba że tsc wymaga asercji na nowy kształt błędu. Pokrycie: `run.schemas.spec.ts` (D-19a), `company-context.schemas.spec.ts` (D-20), `social.schemas.spec.ts`, `content.schemas.spec.ts`, `create-feedback.use-case.spec.ts`, `rate-run.use-case.spec.ts`. Zielone formalnie w KROK 6.

#### DoD (krok)

- Wszystkie pliki z tabeli kompilują się na Zod 4.
- D-19a: page + `ideaCount` / Social + `angle` → `VALIDATION_FAILED` (nie strip).
- D-20: nieznany klucz extras → fail; `null` extras OK.
- Structured output: brak klucza tablicy → `[]`; `null` → `STRUCTURED_OUTPUT_INVALID`.
- Brak Zod w `packages/shared`. Brak zmiany kontraktu HTTP.

---

### KROK 5 — Grafy Social / Content: `z.object` state

**Status:** `WYKONANY`

**Weryfikacja:** `z.custom<T>()` bez predicatu i `StateGraph(z.object)` kompilują się; `compileSocialGraph` / `compileContentGraph` + `invoke` przyjmują schemat Zod 4 (bez błędu `_zod`/`_def`). Fallback predicatu i `StateSchema` nie uruchomione. Oczekiwana zmiana źródła = brak.

**Cel:** `StateGraph(SocialState)` / `StateGraph(ContentState)` kompiluje się i invoke działa na Zod 4. Major 9.1 (stan grafu). **Nie** migracja na `StateSchema` LangGraph (poza fazą). `SPEC-SOCIAL.md` / `SPEC-CONTENT.md` — graf za fasadą.

**Artefakty:**

- Zmiana: `apps/api/src/social/infrastructure/graph/social.graph.ts` — tylko gdy `z.custom` / konstruktor `StateGraph` tego wymaga
- Zmiana: `apps/api/src/content/infrastructure/graph/content.graph.ts` — analogicznie
- Bez zmiany: węzły, prompty, `compile()` bez checkpoinetera, routing

**Kolejność:** Social state → Content state → unit executor/fasada (KROK 6 domyka).

#### Implementacja

**teraz** (oba grafy, wzorzec):

```typescript
const SocialState = z.object({
  runId: z.custom<SocialGraphState['runId']>(),
  conversationId: z.custom<SocialGraphState['conversationId']>(),
  // …pozostałe pola z.custom / z.number() jak dziś
});
```

```typescript
  const graph = new StateGraph(SocialState)
```

**Docelowo:** ten sam kształt. `z.object` **bez** `.strict()` — stan grafu nie jest kontraktem HTTP; strip extra kluczy LangGraph jest OK.

Jeśli `z.custom<T>()` bez predicatu przestanie kompilować się w 4.4.3, dodać no-op check:

**zamień na (fallback):**

```typescript
  runId: z.custom<SocialGraphState['runId']>((value): value is SocialGraphState['runId'] => true),
```

Nie używać `as SocialGraphState`. Nie przepisywać state na `Annotation.Root` / `StateSchema`.

Jeśli `StateGraph` w runtime nie przyjmie schematu Zod 4 (`_zod` vs `_def`): **stop implementacji tego fallbacku w feature planie nie zgadujemy** — peer LangGraph deklaruje Zod 4.2+; najpierw unit `social-run.executor.spec.ts` / `content-run.executor.spec.ts`. Gdyby invoke padł na internale Zod, to regresja zależności (nie zmiana kontraktu HTTP) — naprawa = zgodność wersji `@langchain/langgraph` z Zod 4 **bez** obniżania Zod do 3 i **bez** cichego `StateSchema` (poza zakresem fazy; eskalacja do użytkownika).

#### Biblioteki / API

Major: peer LangGraph obejmuje 4.4.x. Context7 Zod: `z.object` + `z.custom`. Docs LangGraph structured output — nie wołane; transport LLM idzie przez gateway.

#### Testy

Istniejące: `social-run.executor.spec.ts`, `social-pipeline.facade.spec.ts`, `content-run.executor.spec.ts`, `content-pipeline.facade.spec.ts`. E2E D-4/D-5/D-15… w KROK 6.

#### DoD (krok)

- Oba `compile*Graph` kompilują się.
- Unit executor/fasada: invoke fazy ideas/content (post, reel, page) bez błędu schematu stanu.
- Brak `StateSchema` / checkpoinetera.
- Graf nadal acykliczny; HTTP bez zmian.

---

### KROK 6 — Testy regresji walidacji

**Status:** `WYKONANY`

**Weryfikacja:** `pnpm --filter api test` oraz `pnpm --filter api test:e2e` zielone na Zod 4.4.3. Żadnych zmian w testach ani w kodzie produkcyjnym — asercje Zod 3 nie wymagały korekty.

**Cel:** Zielone testy po bumpie — w szczególności `.default([])` vs `null` oraz `env.schema` (`CORS_ORIGIN` w production). Major 9.2. `SPEC-TESTY.md` D-19a / D-20; e2e api oparte o Zod.

**Artefakty:**

- Zmiana testów **tylko** gdy asercja trzymała komunikat Zod 3 (dziś niemal wszędzie `code: 'VALIDATION_FAILED' | 'STRUCTURED_OUTPUT_INVALID'` — zostawić).
- Bez nowych kolekcji Postman i bez zmiany kontraktu HTTP.
- Bez zmiany testów gateway.

**Kolejność:** unit schematów → unit use-case’ów walidacji → `pnpm --filter api test` → `pnpm --filter api test:e2e`.

#### Co odpalić (obowiązkowe)

Unit (wybrane, walidacja Zod):

- `src/shared/config/env.schema.spec.ts` — w tym `CORS_ORIGIN=*` w production
- `src/runs/application/run.schemas.spec.ts` — D-19a
- `src/company-context/application/company-context.schemas.spec.ts` — D-20
- `src/social/application/social.schemas.spec.ts` — default `[]` / reject `null` / coerce verifier
- `src/content/application/content.schemas.spec.ts` — analog
- `src/runs/application/start-run.use-case.spec.ts` — `VALIDATION_FAILED` przed persist
- `src/feedback/application/create-feedback.use-case.spec.ts`
- `src/runs/application/rate-run.use-case.spec.ts`
- executory / fasady Social i Content (KROK 5)

E2E api (regresja, nie nowy scenariusz): istniejące `test/*.e2e-spec.ts` — m.in. social-pipeline, content-pipeline, company-context, validation-pipe, runs-lifecycle. Auth cookie jak po Fazie 5.

Pełne:

```bash
pnpm --filter api test
pnpm --filter api test:e2e
```

#### Szkic asercji, których **nie** osłabiać

`social.schemas.spec.ts` / `content.schemas.spec.ts` — zostaje:

```typescript
  it('defaults missing issue arrays and rejects null', () => {
    expect(
      parseLlmJson(verifierOutputSchema, '{"ok":true}').contextIssues,
    ).toEqual([]);
    expect(() =>
      parseLlmJson(verifierOutputSchema, '{"ok":true,"contextIssues":null}'),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });
```

`env.schema.spec.ts` — zostaje:

```typescript
  it('rejects CORS_ORIGIN=* in production', () => {
    expect(() =>
      validateEnv({
        ...valid,
        ...productionInvite,
        NODE_ENV: 'production',
        CORS_ORIGIN: '*',
      }),
    ).toThrow();
  });
```

Jeśli ten test padnie wyłącznie przez zmianę typu throw (`ZodError` vs inny) — `validateEnv` ma nadal rzucać (Nest fail-fast); **nie** łapać i mapować na inny kod HTTP w tym wycinku.

#### DoD (krok)

- Unit schematów Social / Runs / env / extras / Content verifier przechodzi na Zod 4.
- E2E api oparte o walidację Zod bez regresji.
- `pnpm --filter api test` oraz istniejące e2e api zielone.
- Gateway bez zmian semantyki; lockfile nie zaniża gateway do Zod 3.
- Graf Social/Content nadal działa na `z.object`.

---

## Weryfikacja wycinka

- Kotwica: Faza 9 major (9.1 + 9.2) pokryta KROK 1–6.
- Docs/SPEC: Zod w application; shared bez Zod; S-3; K-8 `path` = `'.'`; D-19a / D-20; extras `.strict()`.
- Nowe pliki produkcyjne: brak. Refaktory: fragmenty `teraz → zamień na` + kompletny `parse-with-zod.ts`.
- Pass rozwojowy: helpery → env → schemy BC → grafy → testy.
- Nagłówki wyłącznie `FAZA` / `KROK`. Statusy z trójki, start `NIE_ROZPOCZĘTY`.
- Major nietknięty. Brak sekretów. `tsconfig` bez zmian.

---

## Ślad do major (informacyjnie)

Po **implementacji** (poza tą sesją, tylko gdy użytkownik tak zdecyduje):

- Faza 9 → `WYKONANY`
- Krok 9.1 → `WYKONANY`
- Krok 9.2 → `WYKONANY`
- Brak `MILESTONE` 9 — nic nie oznaczać `OSIĄGNIĘTY` z tytułu tej fazy

Ten plik **nie** edytuje `content-chain-backend_major_plan.md`.
