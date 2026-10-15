# Content Chain — feature plan: Audience `name` + scoping grupy przy starcie runu (Faza 22)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-22-audience-name-scoping.md`  
**Kotwica major:** Faza 22 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 22).  
**Refaktor względem:** Faza 3 / Krok 3.1 (`WYKONANY`) — katalog `audience.profiles` bez wymaganego `name` w bramce; Faza 11 (`WYKONANY`) — twardy zapis przy kompletnej bramce (audience = niepusty `description`, bez unikalności `name`); Faza 4 / 4.1 (`WYKONANY`, Social) i Faza 4.2 (`WYKONANY`, Content) — fallback „brak `brief.audience` → pełny katalog `audience.profiles`” w LoadContext / promptach.  
**Źródła:** `docs/dokumentacja_koncepcyjna.md`, `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `SPEC-KONTEKST-FIRMY.md` C-1 / C-4, `SPEC-SOCIAL.md` S-4 / S-10, `SPEC-CONTENT.md` Ctn-4 / Ctn-12, `SPEC-KOMUNIKACJA.md` K-2, `SPEC-RUNY.md` R-3d, `SPEC-TESTY.md` D-73…D-77, major Faza 22.  
**Kolejność `KROK` w tym pliku:** domain `name` + unikalność → DTO/fixture’y → helper scopingu → LoadContext Social/Content → prompty → testy D-75…D-77 (pass rozwojowy: helper i typ `name` **przed** LoadContext i asercjami pipeline).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 22 majoru backend: wymagane `AudienceProfile.name`, unikalność nazw przy zapisie, effective audience scope (omit / name katalogu / custom) w Social + Content |
| Major | Faza 22; start po Fazach 1–21 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 22 |
| Poza zakresem | UI / major FE Faza 18; nowe pole FK / `audienceProfileId` w briefie; migracja schematu briefu; zmiana semantyki roli outline `audience_world`; Docker / CI; `packages/shared`; backfill istniejących danych (świadomie poza troską) |
| Po implementacji (informacyjnie) | Major: Faza 22 → `WYKONANY` (DoD gate + kod z feature planu). Brak `MILESTONE` 22. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major HOW (wskazówka) | Feature | Zakres |
|-----------------------|---------|--------|
| 1–2 (domain + unikalność) | FAZA 1 / KROK 1–2 | `name` w typie/bramce, unikalność, DTO, fixture’y, D-73/D-74 |
| 3–5 (scoping + testy) | FAZA 2 / KROK 1–4 | helper effective, LoadContext, prompty, D-75…D-77 |

**Pass rozwojowy (sesja planu):** helper scopingu i wymagane `name` powstają **przed** LoadContext i testami pipeline. Fixture’y e2e/Postman dostają `name` w FAZA 1 (inaczej PUT kontekstu po KROK 1 pada na bramce). Prompty **po** scoped `state.company` (KROK 3), żeby nie utrwalać starego fallbacku. **Brak przesunięć między fazami major.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma (JSON `audienceProfiles` — **bez** migracji kolumn), Zod 4 tylko tam, gdzie już jest (`extras`). Kompletność audience **nie** przez Zod — domain `isComplete` + DTO `class-validator` `@IsString()` na `name`.
- `AudienceProfile = { name: string; description: string }` — oba wymagane w bramce (`trim().length > 0`).
- Unikalność `name`: po `trim`, porównanie **case-insensitive**; kolizja → **400** `VALIDATION_FAILED` **przed** `put`; **nie** osobny klucz w `missing` C-1.
- `brief.audience?` pozostaje opcjonalnym stringiem — **bez** nowego klucza API / FK.
- Scoping BE (S-10 / Ctn-12): (1) klucz `audience` **omit** → effective `profiles: []`; (2) string po trim+CI **równy** `profiles[].name` katalogu → **jeden** profil; (3) inaczej (custom / brak matcha) → `profiles: []`, opis zostaje w `brief.audience`. FE odpowiada za to, by tryb „Wpisz…” nie wysyłał celowo `name` z katalogu; BE **nie** ma osobnego flagi trybu.
- Effective context = wynik `withEffectiveAudience` zapisany w `state.company` w LoadContext — **ten sam** obiekt trafia do generatorów i verifiera (`JSON.stringify(state.company)`).
- Zakaz `any` / nieuzasadnionych asercji; `tsconfig` bez zmian.
- Istniejący `DomainException` + filter — **bez** migracji na `BadRequestException`.

---

## Biblioteki (research)

**Bez Context7** — wycinek to czysta logika domenowa + istniejące wzorce Nest/class-validator już w BC Company Context. Brak nowych zależności npm i braku nowych API bibliotek.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Envelope 400 | Projektowy `DomainException` + filter | Unikalność i bramka `name` → ten sam kanał co Faza 11 |
| DTO | `@IsString()` jak `description` | Dodane pole `name` na `AudienceProfileDto` |
| Prisma JSON | `audienceProfiles` Json | Shape `{ name, description }[]` bez migracji schematu |

Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Company Context: `name` w bramce + unikalność nazw

Odpowiada major Faza 22 (część company-context). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Domain: typ, `isComplete`, unikalność przed persist

**Status:** `WYKONANY`

**Cel:** Domain egzekwuje `SPEC-KONTEKST-FIRMY.md` C-1 / C-4: kompletny profil = niepusty `name` **i** `description`; ścieżki gate obejmują `audience.profiles.{i}.name`; kolizja nazw (trim, CI) → **400** `VALIDATION_FAILED` bez `put`. Major Faza 22 HOW 1–2.

**Artefakty:**

- Zmiana: `apps/api/src/company-context/domain/company-context.types.ts`
- Zmiana: `apps/api/src/company-context/domain/is-complete.ts`
- Zmiana: `apps/api/src/company-context/domain/assert-company-context-writable.ts`
- Nowy: `apps/api/src/company-context/domain/assert-audience-profile-names-unique.ts`
- Zmiana: `apps/api/src/company-context/domain/is-complete.spec.ts`
- Zmiana: `apps/api/src/company-context/domain/assert-company-context-writable.spec.ts`

#### Typ — `AudienceProfile`

**teraz** (`company-context.types.ts`):

```typescript
export type AudienceProfile = { description: string };
```

**zamień na:**

```typescript
export type AudienceProfile = { name: string; description: string };
```

#### `is-complete.ts` — predykat i ścieżki

**teraz** (`isCompleteAudienceProfile` + pętla w `collectGateItemPaths`):

```typescript
export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.description);
}
// …
  context.audience.profiles.forEach((profile, index) => {
    if (!isCompleteAudienceProfile(profile)) {
      details.push({ path: `audience.profiles.${index}.description` });
    }
  });
```

**zamień na:**

```typescript
export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.name) && nonEmpty(profile.description);
}
// …
  context.audience.profiles.forEach((profile, index) => {
    if (isCompleteAudienceProfile(profile)) {
      return;
    }
    if (!nonEmpty(profile.name)) {
      details.push({ path: `audience.profiles.${index}.name` });
    }
    if (!nonEmpty(profile.description)) {
      details.push({ path: `audience.profiles.${index}.description` });
    }
  });
```

(Reszta pliku bez zmian: `isCompleteOfferItem`, `isCompleteCtaItem`, `sectionFilled`, `isComplete`.)

#### Nowy plik — `assert-audience-profile-names-unique.ts` (kompletny)

```typescript
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { CompanyContext } from './company-context.types';

function normalizeAudienceName(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Unikalność `audience.profiles[].name` (trim, case-insensitive).
 * Poza `missing` C-1 — twarda reguła zapisu przed `put` (SPEC-KONTEKST-FIRMY C-4).
 */
export function assertAudienceProfileNamesUnique(
  context: CompanyContext,
): void {
  const seen = new Set<string>();
  for (const profile of context.audience.profiles) {
    const key = normalizeAudienceName(profile.name);
    if (key.length === 0) {
      continue;
    }
    if (seen.has(key)) {
      throw new DomainException(
        'VALIDATION_FAILED',
        'Audience profile names must be unique (case-insensitive)',
        400,
        [{ path: 'audience.profiles' }],
      );
    }
    seen.add(key);
  }
}
```

#### `assert-company-context-writable.ts`

**teraz:**

```typescript
export function assertCompanyContextWritable(context: CompanyContext): void {
  const { complete, missing } = isComplete(context);
  if (complete) {
    return;
  }
  const details: CompanyContextWriteDetail[] = [
    ...missing.map((section) => ({ section })),
    ...collectGateItemPaths(context),
  ];
  throw new DomainException(
    'VALIDATION_FAILED',
    'Cannot persist incomplete company context',
    400,
    details,
  );
}
```

**zamień na:**

```typescript
import { DomainException } from '../../shared/exceptions/domain.exception';
import type {
  CompanyContext,
  CompanyContextWriteDetail,
} from './company-context.types';
import { assertAudienceProfileNamesUnique } from './assert-audience-profile-names-unique';
import { collectGateItemPaths, isComplete } from './is-complete';

export function assertCompanyContextWritable(context: CompanyContext): void {
  const { complete, missing } = isComplete(context);
  if (!complete) {
    const details: CompanyContextWriteDetail[] = [
      ...missing.map((section) => ({ section })),
      ...collectGateItemPaths(context),
    ];
    throw new DomainException(
      'VALIDATION_FAILED',
      'Cannot persist incomplete company context',
      400,
      details,
    );
  }
  assertAudienceProfileNamesUnique(context);
}
```

Put/Patch use-case’y **bez zmian** — już wołają `assertCompanyContextWritable` przed `put`.

#### Testy unit — fragmenty

W `is-complete.spec.ts` i `assert-company-context-writable.spec.ts` zaktualizuj fixture `complete.audience`:

**teraz:** `{ profiles: [{ description: 'Founder SaaS B2B' }] }`  
**zamień na:** `{ profiles: [{ name: 'Founder SaaS', description: 'Founder SaaS B2B' }] }`

Dopisz (szkic):

```typescript
// is-complete.spec.ts
it('rejects audience profile without name / whitespace name', () => {
  expect(
    isComplete({
      ...complete,
      audience: {
        profiles: [{ name: '', description: 'ok' }],
      },
    }).missing,
  ).toContain('audience');

  expect(
    collectGateItemPaths({
      ...complete,
      audience: {
        profiles: [{ name: '  ', description: 'ok' }],
      },
    }),
  ).toEqual([{ path: 'audience.profiles.0.name' }]);
});

// assert-company-context-writable.spec.ts (lub osobny *.spec.ts helpera)
it('rejects duplicate audience names case-insensitively', () => {
  expect(() =>
    assertCompanyContextWritable({
      ...complete,
      audience: {
        profiles: [
          { name: 'Founder', description: 'A' },
          { name: ' founder ', description: 'B' },
        ],
      },
    }),
  ).toMatchObject({
    // rejects → DomainException
  });
  try {
    assertCompanyContextWritable({
      ...complete,
      audience: {
        profiles: [
          { name: 'Founder', description: 'A' },
          { name: ' founder ', description: 'B' },
        ],
      },
    });
    fail('expected DomainException');
  } catch (error) {
    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect((error as DomainException).details).toEqual(
      expect.arrayContaining([{ path: 'audience.profiles' }]),
    );
  }
});
```

Popraw też kalekie audience w istniejącym teście (`{ description: '…' }` → dodaj `name` na kompletnym rodzeństwie).

**DoD kroku:**

- `AudienceProfile` wymaga `name` + `description`.
- Profil bez / z pustym `name` → `missing` zawiera `audience`; `collectGateItemPaths` niesie `audience.profiles.{i}.name`.
- Dwa profile z nazwami różniącymi się tylko case/trim → `assertCompanyContextWritable` rzuca 400, Put/Patch nie wołają `put` (pokryte w KROK 2 e2e + tu unit).
- Unit zielone dla zmienionych speców.

---

### KROK 2 — DTO, fixture’y e2e/Postman, e2e D-73 / D-74

**Status:** `WYKONANY`

**Cel:** HTTP DTO wymaga `name`; wszystkie body PUT kontekstu w testach/Postman mają `name`; e2e D-73/D-74 obserwowalne (`SPEC-TESTY.md`). Major Faza 22 HOW 1–2 (powierzchnia HTTP + regresja fixture).

**Artefakty:**

- Zmiana: `apps/api/src/company-context/http/dto/company-context.dto.ts`
- Zmiana fixture’ów (ten sam kształt profilu):
  - `apps/api/src/company-context/application/put-company-context.use-case.spec.ts`
  - `apps/api/src/company-context/application/patch-company-context.use-case.spec.ts`
  - `apps/api/test/company-context.e2e-spec.ts`
  - `apps/api/test/social-pipeline.e2e-spec.ts`
  - `apps/api/test/content-pipeline.e2e-spec.ts`
  - `apps/api/test/runs-lifecycle.e2e-spec.ts`
  - `apps/api/test/runs-list.e2e-spec.ts`
  - `apps/api/test/runs-cancel.e2e-spec.ts`
  - `apps/api/test/runs-review-ttl.e2e-spec.ts`
  - `apps/api/test/demo-guest.e2e-spec.ts`
  - `apps/api/test/users-management.e2e-spec.ts`
  - Postman: `apps/api/test/postman/social-pipeline.postman-collection.json`, `content-pipeline.postman-collection.json`, `review.postman-collection.json`, `demo-guest.postman-collection.json` (oraz inne kolekcje z `PUT /company-context` bez `name` — wyszukaj `"profiles"` + sam `description`)
- Mapper `toCompanyContext` — **bez zmian logiki** (już `dto.audience.profiles`); TypeScript podciągnie nowe pole z DTO.

#### DTO — `AudienceProfileDto`

**teraz:**

```typescript
export class AudienceProfileDto {
  @ApiProperty()
  @IsString()
  description!: string;
}
```

**zamień na:**

```typescript
export class AudienceProfileDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;
}
```

#### Fixture — kanoniczna zamiana

**teraz:** `{ profiles: [{ description: 'Founder SaaS B2B' }] }`  
**zamień na:** `{ profiles: [{ name: 'Founder SaaS', description: 'Founder SaaS B2B' }] }`

W Postman raw JSON: przed `"description": "Founder…"` / `"description": "p"` dodaj `"name": "Founder SaaS"` (lub sensowna krótka nazwa). W demo-guest body z `"description": "p"` → `"name": "P", "description": "p"`.

#### e2e — D-73 / D-74 (dopisek w `company-context.e2e-spec.ts`)

```typescript
it('D-73 PUT profile without name → 400; DB unchanged', async () => {
  await agent.put('/api/v1/company-context').send(completeBody).expect(200);

  const response = await agent
    .put('/api/v1/company-context')
    .send({
      ...completeBody,
      audience: {
        profiles: [{ name: '  ', description: 'Founder SaaS B2B' }],
      },
    })
    .expect(400);

  expect(response.body.code).toBe('VALIDATION_FAILED');
  expect(response.body.details).toEqual(
    expect.arrayContaining([
      { section: 'audience' },
      { path: 'audience.profiles.0.name' },
    ]),
  );
  const context = await agent.get('/api/v1/company-context').expect(200);
  expect(context.body.audience).toEqual(completeBody.audience);
});

it('D-74 PUT duplicate names case-insensitive → 400; no persist', async () => {
  await agent.put('/api/v1/company-context').send(completeBody).expect(200);

  const response = await agent
    .put('/api/v1/company-context')
    .send({
      ...completeBody,
      audience: {
        profiles: [
          { name: 'Founder', description: 'A' },
          { name: 'FOUNDER', description: 'B' },
        ],
      },
    })
    .expect(400);

  expect(response.body.code).toBe('VALIDATION_FAILED');
  expect(response.body.details).toEqual(
    expect.arrayContaining([{ path: 'audience.profiles' }]),
  );
  const context = await agent.get('/api/v1/company-context').expect(200);
  expect(context.body.audience).toEqual(completeBody.audience);
});
```

Analogiczny smoke PATCH (opcjonalnie jeden test): PATCH zamieniający `audience` na kolizję nazw → 400, singleton bez zmiany.

**DoD kroku:**

- PUT/PATCH bez `name` / z pustym `name` → **400**; ścieżka w `details`; DB bez upsert kaleki (D-73).
- Kolizja CI → **400**; brak persist (D-74).
- Wszystkie e2e/Postman setupy kontekstu przechodzą z wymaganym `name`.
- Regresja D-29 / completeness bez regresji semantyki poza audience.

---

#### Propozycja commit message

```text
feat(company-context): require unique audience profile names in the gate

Persist only when every profile has a non-empty name and description, and reject case-insensitive name collisions before put.
```

---

## FAZA 2 — Effective audience w pipeline Social i Content

Odpowiada major Faza 22 (scoping S-10 / Ctn-12). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Helper `withEffectiveAudience`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna czysta funkcja domain mapuje katalog + opcjonalny `brief.audience` na effective `CompanyContext` wg `SPEC-SOCIAL.md` S-10 / `SPEC-CONTENT.md` Ctn-12. Major Faza 22 HOW 3.

**Artefakty:**

- Nowy: `apps/api/src/company-context/domain/with-effective-audience.ts`
- Nowy: `apps/api/src/company-context/domain/with-effective-audience.spec.ts`

#### Nowy plik — `with-effective-audience.ts` (kompletny)

```typescript
import type { CompanyContext } from './company-context.types';

function normalizeAudienceName(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Effective company context for a run: scopes `audience.profiles` only.
 * Other sections unchanged. Catalog in DB is a library — not auto-injected.
 *
 * - `briefAudience` undefined (omit) → `profiles: []`
 * - trim+CI match to a catalog `name` → single matching profile
 * - otherwise (custom / no match) → `profiles: []` (brief keeps the free-text)
 */
export function withEffectiveAudience(
  company: CompanyContext,
  briefAudience: string | undefined,
): CompanyContext {
  if (briefAudience === undefined) {
    return { ...company, audience: { profiles: [] } };
  }

  const needle = normalizeAudienceName(briefAudience);
  if (needle.length === 0) {
    return { ...company, audience: { profiles: [] } };
  }

  const match = company.audience.profiles.find(
    (profile) => normalizeAudienceName(profile.name) === needle,
  );

  if (match !== undefined) {
    return { ...company, audience: { profiles: [match] } };
  }

  return { ...company, audience: { profiles: [] } };
}
```

#### Nowy plik — `with-effective-audience.spec.ts` (kompletny)

```typescript
import type { CompanyContext } from './company-context.types';
import { withEffectiveAudience } from './with-effective-audience';

const company: CompanyContext = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność'],
        description: 'Przegląd.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz' }] },
  audience: {
    profiles: [
      { name: 'Founder SaaS', description: 'Founder 8–40' },
      { name: 'Ops Lead', description: 'Ops / CS' },
    ],
  },
  extras: null,
};

describe('withEffectiveAudience', () => {
  it('D-75 omit brief.audience → empty effective profiles', () => {
    const scoped = withEffectiveAudience(company, undefined);
    expect(scoped.audience.profiles).toEqual([]);
    expect(scoped.identity).toEqual(company.identity);
    expect(scoped.offer).toEqual(company.offer);
  });

  it('D-76 catalog name match (trim, case-insensitive) → one profile', () => {
    const scoped = withEffectiveAudience(company, '  founder saas ');
    expect(scoped.audience.profiles).toEqual([
      { name: 'Founder SaaS', description: 'Founder 8–40' },
    ]);
  });

  it('D-77 custom string → empty profiles despite catalog', () => {
    const scoped = withEffectiveAudience(
      company,
      'Właściciele lokalnych kawiarni w Warszawie',
    );
    expect(scoped.audience.profiles).toEqual([]);
  });
});
```

**DoD kroku:**

- Trzy tryby pokryte unitami D-75…D-77 na helperze.
- Pozostałe sekcje kontekstu nietknięte.
- Brak I/O / Nest w module.

---

### KROK 2 — LoadContext Social + Content

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Po `get()` kontekstu, przed hopami LLM, `state.company` = effective scope z `state.brief.audience` — wspólne dla generatora i verifiera (`docs/data_flow.md`, S-10, Ctn-12). Major Faza 22 HOW 3–4.

**Artefakty:**

- Zmiana: `apps/api/src/social/infrastructure/graph/nodes/load-context.node.ts`
- Zmiana: `apps/api/src/content/infrastructure/graph/nodes/load-context.node.ts`
- Opcjonalnie nowy / rozszerzony: `load-context.node.spec.ts` w Social i/lub Content (asercja scoped `company` bez LLM)

#### Social — `load-context.node.ts`

**teraz:**

```typescript
import type { CompanyContextRepository } from '../../../../company-context/domain/company-context.port';
import type { SocialGraphState } from '../state';

export function createLoadContextNode(context: CompanyContextRepository) {
  return async (
    _state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const company = await context.get();
    return { company };
  };
}
```

**zamień na:**

```typescript
import type { CompanyContextRepository } from '../../../../company-context/domain/company-context.port';
import { withEffectiveAudience } from '../../../../company-context/domain/with-effective-audience';
import type { SocialGraphState } from '../state';

export function createLoadContextNode(context: CompanyContextRepository) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const company = await context.get();
    return {
      company: withEffectiveAudience(company, state.brief.audience),
    };
  };
}
```

#### Content — `load-context.node.ts`

**teraz:** analogicznie `_state` + `return { company }`.

**zamień na:** ten sam wzorzec z `ContentGraphState` + `withEffectiveAudience(company, state.brief.audience)`.

#### Unit LoadContext (szkic — Social; Content 1:1)

```typescript
import { withEffectiveAudience } from '../../../../company-context/domain/with-effective-audience';
import { createLoadContextNode } from './load-context.node';
// … minimal SocialGraphState stub z brief / company null

it('scopes company before returning (omit → [])', async () => {
  const catalog = { /* complete CompanyContext z 2 profilami */ };
  const get = jest.fn(async () => catalog);
  const node = createLoadContextNode({ get } as CompanyContextRepository);
  const partial = await node({
    brief: { topic: 'x' }, // bez audience
    // … wymagane pola stanu stubem
  } as SocialGraphState);
  expect(partial.company).toEqual(withEffectiveAudience(catalog, undefined));
  expect(partial.company?.audience.profiles).toEqual([]);
});
```

**DoD kroku:**

- LoadContext Social i Content wołają `withEffectiveAudience`.
- Węzły LLM/verifier nadal czytają `state.company` — bez osobnego drugiego scopingu.
- Unit (lub równoważny kontrakt) potwierdza omit → `[]` na wyjściu węzła.

---

### KROK 3 — Prompty: usunąć fallback „pełny katalog”

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Instrukcje LLM nie nakazują „brak `brief.audience` → użyj wszystkich `audience.profiles`”. Payload już niesie effective `company`; prompty opisują **effective** profiles + opcjonalny opis w briefie. Major Faza 22 + `SPEC-SOCIAL` / `SPEC-CONTENT` zakazy.

**Artefakty (fragmenty `teraz` → `zamień na`):**

| Plik | Fragment |
|------|----------|
| `apps/api/src/social/infrastructure/prompts/ideation.prompt.md` | linia „Grupa docelowa…” |
| `apps/api/src/social/infrastructure/prompts/reel-ideas.prompt.md` | j.w. |
| `apps/api/src/social/infrastructure/prompts/content-writer.prompt.md` | „Grupa: …” |
| `apps/api/src/content/infrastructure/prompts/page-writer.prompt.md` | „Grupa: …” |
| `apps/api/src/social/infrastructure/prompts/verifier.prompt.md` | reguły audience vs puste profiles |
| `apps/api/src/content/infrastructure/prompts/verifier.prompt.md` | j.w. |

#### Generatorzy (ideation / reel-ideas / content-writer / page-writer)

**teraz (przykład ideation):**

```text
Grupa docelowa: `brief.audience` jeśli podane, inaczej `audience.profiles` z kontekstu.
```

**zamień na:**

```text
Grupa docelowa: gdy `company.audience.profiles` w JSON kontekstu jest niepuste — pisz do tych profili (effective scope runu). Gdy `profiles` jest puste, a `brief.audience` jest ustawione — traktuj `brief.audience` jako wolny opis grupy (custom). Gdy oba puste / brak — nie zakładaj konkretnej grupy z katalogu firmy.
```

Dla content-writer / page-writer:

**teraz:** `Grupa: `brief.audience` albo `audience.profiles`.`  
**zamień na:** ten sam sens co wyżej (jedno–dwa zdania, spójne brzmienie).

#### Verifierzy (Social + Content)

Dopisz / zastąp fragment o audience (obok istniejących reguł faktów):

**teraz (sens):** fakty z `audience.profiles` / odrzut gdy inna grupa niż profiles/brief — bez rozróżnienia pustego effective.

**zamień na (dopisek normatywny):**

```text
`audience.profiles` w JSON to **effective** scope runu (może być puste). Gdy puste: **nie** oceniaj faktów audience względem pełnego katalogu firmy spoza payloadu; jeśli `brief.audience` jest w briefie — wolno odnosić się do tego opisu jako grupy custom. Odrzut przy sprzeczności z obecnymi effective profiles albo gdy treść opisuje inną grupę niż effective / brief.
```

`page-outline.prompt.md` / refine — **bez obowiązkowej zmiany**, o ile nie powtarzają starego fallbacku „albo pełne profiles” (obecnie nie powtarzają wprost).

**DoD kroku:**

- Żaden prompt Social/Content generatora nie zawiera „inaczej `audience.profiles`” / „albo `audience.profiles`” jako fallback pełnego katalogu.
- Verifier jawnie zna pusty effective + custom brief.

---

### KROK 4 — Testy D-75…D-77 na LoadContext + regresja / graphify

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kotwice `SPEC-TESTY.md` D-75…D-77 domknięte na poziomie unit/kontrakt (helper + LoadContext); regresja e2e pipeline bez wymogu E2E LLM; `graphify update .` po zmianach TS.

**Artefakty:**

- Specy z KROK 1–2 (D-75…D-77) — upewnij się, że nazwy testów / komentarze kotwiczą D-*.
- Regresja: istniejące e2e Social/Content / Postman setup (już z `name` z FAZA 1) — start runu bez `brief.audience` nadal 202; **bez** nowych folderów produktowych Postman (opcjonalnie jedna asercja unit wystarczy per SPEC).
- Po zmianach TS: `graphify update .` (AST-only).

**DoD kroku:**

- D-75 / D-76 / D-77 zielone (helper ± LoadContext).
- Regresja unit/e2e company-context + smoke pipeline bez nowych wymagań E2E LLM.
- Graphify zaktualizowany.

---

#### Propozycja commit message

```text
feat(runs): scope audience profiles for Social and Content pipelines

Apply effective company context in LoadContext so omit, catalog name, and custom brief.audience no longer inject the full audience catalog into LLM and verifier payloads.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| C-1 `name`+`description` | Unit `isComplete` / `collectGateItemPaths`; e2e D-73 |
| C-4 unikalność | Unit + e2e D-74 |
| S-10 / Ctn-12 trzy tryby | Unit `withEffectiveAudience` + LoadContext (D-75…D-77) |
| Ten sam effective dla LLM i verifiera | Jedno `state.company` po LoadContext; brak drugiego surowego `get()` w verifierze |
| Zakaz „omit = wszystkie profiles” | Kod LoadContext + prompty bez starego fallbacku |
| Brak FK briefu | `SocialBrief` / `ContentBrief` nietknięte (`audience?: string`) |
| Zgodność docs/SPEC | Trace: `SPEC-KONTEKST-FIRMY`, `SPEC-SOCIAL` S-10, `SPEC-CONTENT` Ctn-12, `SPEC-TESTY` D-73…D-77 |
| Poza zakresem | Zero zmian FE; zero migracji Prisma brief |

---

## Ślad do major (informacyjnie — bez edycji w tej sesji)

Po **implementacji** tego feature planu (osobna sesja, np. ręczne `/feature-implementation`):

| Element major | Oczekiwany status |
|---------------|-------------------|
| Faza 22 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 22 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 3.1 / 11 / 4 / 4.1 / 4.2 / MILESTONE 3 / 4 / 4.2 | bez zmian (`WYKONANY` / `OSIĄGNIĘTY`) |

---

## Nota sesji planu

- Grandfathering docs: `docs/README.md` bez kompletnego frontmatteru — zaakceptowane jako stara dokumentacja w tej sesji.
- Ten skill **nie** implementuje kodu i **nie** edytuje major / docs / SPEC.
- Wdrożenie kodu = opcjonalnie ręczne `/feature-implementation` poza tą sesją.
