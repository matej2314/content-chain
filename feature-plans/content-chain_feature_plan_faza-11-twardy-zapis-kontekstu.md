# Content Chain — feature plan: twardy zapis kontekstu firmy (Faza 11)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-11-twardy-zapis-kontekstu.md`  
**Kotwica major:** Faza 11 (cała) — kroki 11.1 i 11.2 w `content-chain-backend_major_plan.md`.  
**Refaktor względem:** Faza 3 / Krok 3.1 (`WYKONANY`) — PUT/PATCH zapisywały niekompletną bramkę; `isComplete` tylko informował i blokował `POST /runs`; oferta = `.some` (nazwa + korzyść, `description` poza minimum); `cta` / `audience` = `.some`. Faza 4.3 / Krok 4.3.2 (`WYKONANY`) — Zod extras i `extras` poza `isComplete` **zostają**.  
**Źródła:** `docs/dokumentacja_koncepcyjna.md` (tabela bramki), `docs/dokumentacja_komunikacji.md` (PUT/PATCH 400, nie 409), `SPEC-KONTEKST-FIRMY.md` C-1 / C-4, `SPEC-KOMUNIKACJA.md` K-8, `SPEC-TESTY.md` D-1 / D-20 / D-29, major Faza 11.  
**Kolejność `KROK` w tym pliku:** 11.1 → 11.2 application → 11.2 HTTP (pass rozwojowy: merge PATCH wyjęty z adaptera **przed** asercją; `cta`/`audience` `.every` w KROK 1, bo PUT od KROK 2 egzekwuje `isComplete` jako warunek persist).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 11 majoru backend: twardy PUT/PATCH kontekstu wyłącznie przy kompletnej bramce |
| Major | Faza 11 / 11.1–11.2; start po Fazach 1–10 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 11 |
| Poza zakresem | UI / major FE Faza 3.5; migracja Prisma (`identityName` `@default("")` na bootstrap GET zostaje); zmiana semantyki C-5 / 409 na starcie runu; logika w `packages/shared`; ciche czyszczenie kalekich wierszy już w SQLite; wymaganie `extras` / `cta.target` |
| Po implementacji (informacyjnie) | Major: Faza 11 i kroki 11.1–11.2 → `WYKONANY`. MILESTONE 3 bez zmian (`OSIĄGNIĘTY`). Brak `MILESTONE` 11. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 11.1 | KROK 1 | `isCompleteOfferItem` + oferta / CTA / audience = `length ≥ 1` ∧ `every`; `collectGateItemPaths`; unit |
| 11.2 | KROK 2 | `mergeCompanyContext`; `assertCompanyContextWritable` **przed** `repository.put`; PATCH: get → merge → asercja → `put` |
| 11.2 | KROK 3 | e2e D-29 + regresja D-1 / D-20; Postman (400 na kalekiej bramce) |

**Pass rozwojowy (sesja planu):** merge PATCH dziś siedzi w `PrismaCompanyContextAdapter.patch` i od razu woła `put` (upsert). Bez wyniesienia merge do domain **przed** asercją w use-case werdykt byłby po persist. CTA/audience `.every` w KROK 1 (nie „tylko oferta”) — zatwierdzone w wywiadzie; inaczej twardy PUT legalizowałby kalekie etykiety/profile wbrew tabeli bramki. **Brak przesunięć między fazami major.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Zod **4.4.x** wyłącznie na kształcie `extras` (istniejący `parseWithZod`). **Nie** walidujemy kompletności bramki Zod-em.
- Ta sama `isComplete` dla GET completeness, PUT/PATCH (werdykt przed persist) i C-5 (`POST /runs` → nadal **409** `CONTEXT_INCOMPLETE`).
- Niepusty string = `trim().length > 0`. Indeks w `details[].path` = **0-based** (jak Zod extras, D-20); przykład docs `offer.items.1.description` = druga pozycja.
- `details` zapisu: `{ section }` jak start runu **plus** `{ path }` kalekich pozycji. Kod HTTP zapisu = **400** `VALIDATION_FAILED` — **nie** reuse `CONTEXT_INCOMPLETE`.
- Zakaz `items.filter(isCompleteOfferItem)` (i analogicznego stripu CTA/audience) w adapterze / use-case.
- `repository.patch` zostaje na porcie (adapter: get + merge + put **bez** bramki). Ścieżka HTTP PATCH **nie** woła `patch` — tylko `get` + `put`.
- Zakaz `any` / nieuzasadnionych asercji; `tsconfig` **bez** zmian (`exactOptionalPropertyTypes` / `noUncheckedIndexedAccess` nie włączamy).
- GET pustego singletona (brak wiersza albo same `""` / `[]`) bez zmian — legalny odczyt, bez upsert przy odrzucie zapisu.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/nestjs/docs.nestjs.com` (exception filters). Wersja w projekcie: `apps/api` → `@nestjs/common@^11.0.0`.

| Temat | Ustalenie Context7 | Decyzja w wycinku |
|-------|--------------------|-------------------|
| Custom exception | Docs pokazują podklasę `HttpException`; catch-all `@Catch()` mapuje nie-HTTP na 500 | **Bez zmiany filtra.** Zostaje projektowy `DomainException` + istniejący `HttpExceptionFilter` (`instanceof DomainException` → `code` / `details` / `httpStatus`). Nie migrujemy na `BadRequestException`. |
| Envelope | Nest JSON `{ statusCode, message }` **nie** jest kontraktem produktu | Envelope K-1 z `docs/dokumentacja_komunikacji.md` / `SPEC-KOMUNIKACJA.md` K-8 wygrywa |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**. Brak nowych zależności npm. Zod 4 tylko tam, gdzie już jest (`extras`).

---

## FAZA 1 — Twardy zapis kontekstu firmy (kompletna bramka)

Odpowiada major **Faza 11**. Jedna faza w tym zestawie.

---

### KROK 1 — Predykat oferty / CTA / audience i `isComplete`

**Status:** `WYKONANY`

**Cel:** Domain `isComplete` odpowiada tabeli bramki z `docs/dokumentacja_koncepcyjna.md` i `SPEC-KONTEKST-FIRMY.md` C-1: oferta `every` + `description` w minimum; CTA i audience `length ≥ 1` ∧ `every`. Ta sama funkcja dla GET, zapisu (KROK 2) i startu runu. Major 11.1 + zatwierdzone HOW (nie tylko oferta).

**Artefakty:**

- Zmiana: `apps/api/src/company-context/domain/is-complete.ts`
- Zmiana: `apps/api/src/company-context/domain/is-complete.spec.ts`
- Zmiana: `apps/api/src/company-context/domain/company-context.types.ts` (typ `details` zapisu — użyty w KROK 2; dodany tu, bo `collectGateItemPaths` zwraca `{ path }`)

#### Typ — dopisek w `company-context.types.ts`

Po `Completeness`:

```typescript
export type CompanyContextWriteDetail =
  | { readonly section: GateSection }
  | { readonly path: string };
```

`GateSection` jest już importowany w tym pliku.

#### `is-complete.ts` — zamiana całego pliku

**teraz:** `offer.items.some` (nazwa + dowolna niepusta korzyść); `cta` / `audience` = `.some`.

**zamień na** (kompletny plik):

```typescript
import type {
  AudienceProfile,
  CompanyContext,
  Completeness,
  CtaItem,
  OfferItem,
} from './company-context.types';
import { GATE_SECTIONS, type GateSection } from './company-context.constants';

const nonEmpty = (value: string): boolean => value.trim().length > 0;

export function isCompleteOfferItem(item: OfferItem): boolean {
  return (
    nonEmpty(item.name) &&
    nonEmpty(item.description) &&
    item.benefit.length >= 1 &&
    item.benefit.every(nonEmpty)
  );
}

export function isCompleteCtaItem(item: CtaItem): boolean {
  return nonEmpty(item.label);
}

export function isCompleteAudienceProfile(
  profile: AudienceProfile,
): boolean {
  return nonEmpty(profile.description);
}

const sectionFilled: Record<GateSection, (context: CompanyContext) => boolean> =
  {
    identity: ({ identity }) =>
      nonEmpty(identity.name) && nonEmpty(identity.description),
    offer: ({ offer }) =>
      offer.items.length >= 1 && offer.items.every(isCompleteOfferItem),
    voice: ({ voice }) => nonEmpty(voice.weDo) && nonEmpty(voice.weDont),
    cta: ({ cta }) =>
      cta.items.length >= 1 && cta.items.every(isCompleteCtaItem),
    audience: ({ audience }) =>
      audience.profiles.length >= 1 &&
      audience.profiles.every(isCompleteAudienceProfile),
  };

export function isComplete(context: CompanyContext): Completeness {
  const missing = GATE_SECTIONS.filter(
    (section) => !sectionFilled[section](context),
  );
  return { complete: missing.length === 0, missing };
}

export function collectGateItemPaths(
  context: CompanyContext,
): readonly { path: string }[] {
  const details: { path: string }[] = [];

  context.offer.items.forEach((item, index) => {
    if (isCompleteOfferItem(item)) {
      return;
    }
    if (!nonEmpty(item.name)) {
      details.push({ path: `offer.items.${index}.name` });
    }
    if (!nonEmpty(item.description)) {
      details.push({ path: `offer.items.${index}.description` });
    }
    if (item.benefit.length === 0) {
      details.push({ path: `offer.items.${index}.benefit` });
    } else {
      item.benefit.forEach((entry, benefitIndex) => {
        if (!nonEmpty(entry)) {
          details.push({
            path: `offer.items.${index}.benefit.${benefitIndex}`,
          });
        }
      });
    }
  });

  context.cta.items.forEach((item, index) => {
    if (!isCompleteCtaItem(item)) {
      details.push({ path: `cta.items.${index}.label` });
    }
  });

  context.audience.profiles.forEach((profile, index) => {
    if (!isCompleteAudienceProfile(profile)) {
      details.push({ path: `audience.profiles.${index}.description` });
    }
  });

  return details;
}
```

`cta.target` **nie** wchodzi do predykatu (poza zakresem fazy). Pusta tablica oferty/CTA/audience → sekcja w `missing`, **bez** path pozycji (nie ma indeksu).

#### Testy — `is-complete.spec.ts`

Zastąp plik. Fixture `complete` jak dziś (już ma `description` na ofercie). Dopisz przypadki DoD 11.1 + CTA/audience:

```typescript
import { emptyCompanyContext } from './company-context.types';
import {
  collectGateItemPaths,
  isComplete,
  isCompleteOfferItem,
} from './is-complete';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

describe('isCompleteOfferItem', () => {
  it('rejects whitespace name, empty description, empty benefit entries', () => {
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: ['Oszczędność'],
      }),
    ).toBe(true);
    expect(
      isCompleteOfferItem({
        name: '  ',
        description: 'ok',
        benefit: ['Oszczędność'],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: '  ',
        benefit: ['Oszczędność'],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: [],
      }),
    ).toBe(false);
    expect(
      isCompleteOfferItem({
        name: 'Audyt',
        description: 'ok',
        benefit: ['ok', '  '],
      }),
    ).toBe(false);
  });
});

describe('isComplete', () => {
  it('returns all gate keys missing for an empty context', () => {
    expect(isComplete(emptyCompanyContext())).toEqual({
      complete: false,
      missing: ['identity', 'offer', 'voice', 'cta', 'audience'],
    });
  });

  it('returns complete: true and empty missing when all sections are filled', () => {
    expect(isComplete(complete)).toEqual({ complete: true, missing: [] });
  });

  it('ignores extras for the gate', () => {
    expect(isComplete({ ...complete, extras: null }).complete).toBe(true);
  });

  it('treats whitespace-only identity as incomplete', () => {
    const result = isComplete({
      ...complete,
      identity: { name: '  ', description: 'ok' },
    });
    expect(result.complete).toBe(false);
    expect(result.missing).toContain('identity');
  });

  it('rejects a kaleka offer sibling, empty description, and whitespace benefit', () => {
    const noDescription = isComplete({
      ...complete,
      offer: {
        items: [{ name: 'Audyt', benefit: ['Oszczędność'], description: '' }],
      },
    });
    expect(noDescription.complete).toBe(false);
    expect(noDescription.missing).toContain('offer');

    const secondKaleka = isComplete({
      ...complete,
      offer: {
        items: [
          complete.offer.items[0],
          { name: 'Druga', benefit: ['x'], description: '' },
        ],
      },
    });
    expect(secondKaleka.complete).toBe(false);
    expect(secondKaleka.missing).toContain('offer');

    const whitespaceBenefit = isComplete({
      ...complete,
      offer: {
        items: [{ name: 'Audyt', benefit: ['  '], description: 'ok' }],
      },
    });
    expect(whitespaceBenefit.complete).toBe(false);
    expect(whitespaceBenefit.missing).toContain('offer');
  });

  it('rejects a kaleka CTA or audience sibling', () => {
    const kalekaCta = isComplete({
      ...complete,
      cta: {
        items: [
          { label: 'Napisz do nas', target: '/kontakt' },
          { label: '  ' },
        ],
      },
    });
    expect(kalekaCta.complete).toBe(false);
    expect(kalekaCta.missing).toContain('cta');

    const kalekaAudience = isComplete({
      ...complete,
      audience: {
        profiles: [
          { description: 'Founder SaaS B2B' },
          { description: '   ' },
        ],
      },
    });
    expect(kalekaAudience.complete).toBe(false);
    expect(kalekaAudience.missing).toContain('audience');
  });
});

describe('collectGateItemPaths', () => {
  it('points at the kaleka offer description with a 0-based index', () => {
    expect(
      collectGateItemPaths({
        ...complete,
        offer: {
          items: [
            complete.offer.items[0],
            { name: 'Druga', benefit: ['x'], description: '' },
          ],
        },
      }),
    ).toEqual([{ path: 'offer.items.1.description' }]);
  });

  it('returns no item paths for an empty offer list', () => {
    expect(
      collectGateItemPaths({ ...complete, offer: { items: [] } }),
    ).toEqual([]);
  });
});
```

`complete.offer.items[0]` — przy `noUncheckedIndexedAccess` wyłączonym w tsconfig (stan projektu) to `OfferItem`. Nie włączamy flagi. Gdyby kompilator kiedyś wymagał, użyć jawnego elementu fixture, nie `!`.

**Biblioteki:** brak (czysta funkcja).

**DoD kroku:**

- Unit: kaleka pozycja, puste `description`, druga niepełna usługa, sam whitespace → `missing` zawiera `offer`; `complete === false`.
- Jedna kompletna usługa przy `length ≥ 1` i reszcie bramki → `complete === true`.
- Kaleki sibling CTA / audience → `missing` zawiera `cta` / `audience`.
- `extras` nadal poza `isComplete`.
- `collectGateItemPaths` dla drugiej oferty bez opisu → `{ path: 'offer.items.1.description' }`.

---

### KROK 2 — Merge + asercja przed `put`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Use-case’y wołają domain **przed** `repository.put`. PATCH ocenia **merge** z aktualnym stanem. Przy odrzucie brak upsert. Major 11.2 (warstwa application/domain). `SPEC-KONTEKST-FIRMY.md` C-4.

**Artefakty:**

- Nowy: `apps/api/src/company-context/domain/merge-company-context.ts`
- Nowy: `apps/api/src/company-context/domain/merge-company-context.spec.ts`
- Nowy: `apps/api/src/company-context/domain/assert-company-context-writable.ts`
- Nowy: `apps/api/src/company-context/domain/assert-company-context-writable.spec.ts`
- Nowy: `apps/api/src/company-context/application/put-company-context.use-case.spec.ts`
- Nowy: `apps/api/src/company-context/application/patch-company-context.use-case.spec.ts`
- Zmiana: `put-company-context.use-case.ts`, `patch-company-context.use-case.ts`
- Zmiana: `prisma-company-context.adapter.ts` (`patch` używa `mergeCompanyContext`; **bez** `filter`)

Kolejność w kroku: merge → assert → PUT use-case → PATCH use-case → adapter DRY.

#### Nowy plik — `merge-company-context.ts`

```typescript
import type { PartialCompanyContext } from './company-context.port';
import type { CompanyContext } from './company-context.types';

export function mergeCompanyContext(
  current: CompanyContext,
  partial: PartialCompanyContext,
): CompanyContext {
  return {
    identity: { ...current.identity, ...partial.identity },
    offer: { items: partial.offer?.items ?? current.offer.items },
    voice: { ...current.voice, ...partial.voice },
    cta: { items: partial.cta?.items ?? current.cta.items },
    audience: {
      profiles: partial.audience?.profiles ?? current.audience.profiles,
    },
    extras: partial.extras === undefined ? current.extras : partial.extras,
  };
}
```

Semantyka **1:1** z dzisiejszym merge w adapterze (w tym `extras: null` nadpisuje, `undefined` zostawia current).

#### Nowy plik — `merge-company-context.spec.ts`

```typescript
import { emptyCompanyContext } from './company-context.types';
import { mergeCompanyContext } from './merge-company-context';

const current = {
  ...emptyCompanyContext(),
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Czas'],
        description: 'Przegląd.',
      },
    ],
  },
  extras: { hashtags: ['#old'] },
};

describe('mergeCompanyContext', () => {
  it('merges identity fields and keeps offer when omitted', () => {
    const merged = mergeCompanyContext(current, {
      identity: { name: 'Nowa' },
    });
    expect(merged.identity).toEqual({
      name: 'Nowa',
      description: 'Robimy X.',
    });
    expect(merged.offer).toEqual(current.offer);
  });

  it('replaces extras with null when the patch sets null', () => {
    expect(
      mergeCompanyContext(current, { extras: null }).extras,
    ).toBeNull();
  });

  it('keeps extras when the patch omits extras', () => {
    expect(mergeCompanyContext(current, { identity: { name: 'X' } }).extras).toEqual(
      { hashtags: ['#old'] },
    );
  });
});
```

#### Nowy plik — `assert-company-context-writable.ts`

Wzorzec: `apps/api/src/runs/domain/assert-run-reviewable.ts` (domain rzuca `DomainException`).

```typescript
import { DomainException } from '../../shared/exceptions/domain.exception';
import type {
  CompanyContext,
  CompanyContextWriteDetail,
} from './company-context.types';
import { collectGateItemPaths, isComplete } from './is-complete';

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

Nie używać kodu `CONTEXT_INCOMPLETE` ani statusu 409.

#### Nowy plik — `assert-company-context-writable.spec.ts`

```typescript
import { DomainException } from '../../shared/exceptions/domain.exception';
import { emptyCompanyContext } from './company-context.types';
import { assertCompanyContextWritable } from './assert-company-context-writable';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

describe('assertCompanyContextWritable', () => {
  it('passes for a complete gate including extras null', () => {
    expect(() =>
      assertCompanyContextWritable({ ...complete, extras: null }),
    ).not.toThrow();
  });

  it('throws 400 VALIDATION_FAILED with section and offer path', () => {
    try {
      assertCompanyContextWritable({
        ...complete,
        offer: {
          items: [
            complete.offer.items[0],
            { name: 'Druga', benefit: ['x'], description: '' },
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
        expect.arrayContaining([
          { section: 'offer' },
          { path: 'offer.items.1.description' },
        ]),
      );
    }
  });

  it('throws for empty context without item paths', () => {
    try {
      assertCompanyContextWritable(emptyCompanyContext());
      fail('expected DomainException');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainException);
      expect((error as DomainException).code).not.toBe('CONTEXT_INCOMPLETE');
      expect((error as DomainException).httpStatus).toBe(400);
      expect((error as DomainException).details).toEqual([
        { section: 'identity' },
        { section: 'offer' },
        { section: 'voice' },
        { section: 'cta' },
        { section: 'audience' },
      ]);
    }
  });
});
```

#### PUT use-case

**teraz** (`put-company-context.use-case.ts`): `put` od razu, `isComplete` tylko na odpowiedzi.

**zamień `execute` na:**

```typescript
  async execute(context: CompanyContext) {
    assertCompanyContextWritable(context);
    const saved = await this.repository.put(context);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
```

Importy: `assertCompanyContextWritable` z `../domain/assert-company-context-writable`. Reszta klasy bez zmian (`@Injectable`, wstrzyknięcie portu).

#### PATCH use-case

**teraz:** `this.repository.patch(partial)` (merge+upsert w adapterze).

**zamień `execute` na:**

```typescript
  async execute(partial: PartialCompanyContext) {
    const current = await this.repository.get();
    const merged = mergeCompanyContext(current, partial);
    assertCompanyContextWritable(merged);
    const saved = await this.repository.put(merged);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
```

Importy: `mergeCompanyContext`, `assertCompanyContextWritable`, `isComplete` (już jest). **Nie** wołać `this.repository.patch`.

#### Adapter — DRY merge, bez stripu

W `prisma-company-context.adapter.ts` **teraz** ręczny merge w `patch`.

**zamień ciało `patch` na:**

```typescript
  async patch(partial: PartialCompanyContext): Promise<CompanyContext> {
    const current = await this.get();
    return this.put(mergeCompanyContext(current, partial));
  }
```

Import `mergeCompanyContext`. **Zakaz** `filter` na `offer.items` / `cta.items` / `audience.profiles`. Adapter **nie** woła `assertCompanyContextWritable` (reguła w domain; application orkiestruje HTTP).

#### Nowy plik — `put-company-context.use-case.spec.ts`

```typescript
import { emptyCompanyContext } from '../domain/company-context.types';
import type { CompanyContextRepository } from '../domain/company-context.port';
import { PutCompanyContextUseCase } from './put-company-context.use-case';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: null,
};

function unusedRepo(
  overrides: Partial<CompanyContextRepository> = {},
): CompanyContextRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    get: unexpected,
    put: unexpected,
    patch: unexpected,
    ...overrides,
  };
}

describe('PutCompanyContextUseCase', () => {
  it('persists a complete context including extras null', async () => {
    const put = jest.fn(async (context: typeof complete) => context);
    const uc = new PutCompanyContextUseCase(unusedRepo({ put }));
    const result = await uc.execute(complete);
    expect(put).toHaveBeenCalledTimes(1);
    expect(result.completeness).toEqual({ complete: true, missing: [] });
    expect(result.extras).toBeNull();
  });

  it('rejects an incomplete body and does not call put', async () => {
    const put = jest.fn();
    const uc = new PutCompanyContextUseCase(unusedRepo({ put }));
    await expect(uc.execute(emptyCompanyContext())).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(put).not.toHaveBeenCalled();
  });

  it('does not call patch', async () => {
    const patch = jest.fn();
    const put = jest.fn(async (context: typeof complete) => context);
    const uc = new PutCompanyContextUseCase(unusedRepo({ put, patch }));
    await uc.execute(complete);
    expect(patch).not.toHaveBeenCalled();
  });
});
```

#### Nowy plik — `patch-company-context.use-case.spec.ts`

```typescript
import { emptyCompanyContext } from '../domain/company-context.types';
import type { CompanyContextRepository } from '../domain/company-context.port';
import { PatchCompanyContextUseCase } from './patch-company-context.use-case';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

function unusedRepo(
  overrides: Partial<CompanyContextRepository> = {},
): CompanyContextRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    get: unexpected,
    put: unexpected,
    patch: unexpected,
    ...overrides,
  };
}

describe('PatchCompanyContextUseCase', () => {
  it('merges then puts when the result stays complete', async () => {
    const put = jest.fn(async (context: typeof complete) => context);
    const patch = jest.fn();
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => complete,
        put,
        patch,
      }),
    );
    const result = await uc.execute({ identity: { name: 'Nowa' } });
    expect(patch).not.toHaveBeenCalled();
    expect(put).toHaveBeenCalledWith({
      ...complete,
      identity: { name: 'Nowa', description: complete.identity.description },
    });
    expect(result.identity.name).toBe('Nowa');
  });

  it('rejects a patch that clears identity.name and does not call put', async () => {
    const put = jest.fn();
    const patch = jest.fn();
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => complete,
        put,
        patch,
      }),
    );
    await expect(
      uc.execute({ identity: { name: '' } }),
    ).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(put).not.toHaveBeenCalled();
    expect(patch).not.toHaveBeenCalled();
  });

  it('does not persist when get returns empty and patch is partial', async () => {
    const put = jest.fn();
    const uc = new PatchCompanyContextUseCase(
      unusedRepo({
        get: async () => emptyCompanyContext(),
        put,
      }),
    );
    await expect(
      uc.execute({ identity: { name: 'Acme' } }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    expect(put).not.toHaveBeenCalled();
  });
});
```

**Biblioteki:** `DomainException` jak pozostałe BC; filter Nest bez zmian (Context7: nie przechodzimy na `HttpException`).

**DoD kroku:**

- Niekompletne body PUT → wyjątek 400 `VALIDATION_FAILED`; `put` **nie** wołane.
- PATCH zerujący `identity.name` na kompletnym stanie → `put` nie wołane; `patch` na porcie nie wołane ze ścieżki HTTP.
- Kompletna bramka + `extras: null` → `put` wołane, odpowiedź z `completeness.complete === true`.
- Adapter nie filtruje kalekich `items`.

---

### KROK 3 — HTTP / e2e D-29 + regresja D-1 / D-20

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Obserwowalny kontrakt HTTP z `docs/dokumentacja_komunikacji.md` i `SPEC-TESTY.md` D-29. D-1 zostaje 409. D-20 (unknown extras) nadal na **kompletnym** body bramki. Controller **bez** nowej logiki bramki (C-4 w application/domain).

**Artefakty:**

- Zmiana: `apps/api/test/company-context.e2e-spec.ts`
- Zmiana (opisy): `apps/api/test/postman/social-pipeline.postman-collection.json`, `apps/api/test/postman/content-pipeline.postman-collection.json` — nowy request D-29 + korekta opisu PUT (upsert tylko przy kompletnej bramce)
- Regresja bez zmiany asercji: `apps/api/test/runs-lifecycle.e2e-spec.ts` (D-1 już 409 + `details[].section`); e2e D-20 w `company-context.e2e-spec.ts` zostaje

Controller, DTO class-validator, mapper Zod extras — **bez** zmian w tym kroku (puste stringi przechodzą `@IsString()`, bramka łapie je w use-case).

#### e2e — dopiski w `company-context.e2e-spec.ts`

Po istniejących case’ach (happy PUT, PATCH merge nazwy, extras round-trip, D-20 unknown key) dodaj:

```typescript
  it('D-29 PUT incomplete identity does not upsert on an empty database', async () => {
    await prisma.companyContext.deleteMany();

    const response = await agent
      .put('/api/v1/company-context')
      .send({ ...completeBody, identity: { name: '', description: 'ok' } })
      .expect(400);

    expect(response.body.code).toBe('VALIDATION_FAILED');
    expect(response.body.details).toEqual(
      expect.arrayContaining([{ section: 'identity' }]),
    );
    expect(await prisma.companyContext.count()).toBe(0);

    const completeness = await agent
      .get('/api/v1/company-context/completeness')
      .expect(200);
    expect(completeness.body.complete).toBe(false);
  });

  it('D-29 PUT kaleka offer (missing description / second item) leaves the singleton unchanged', async () => {
    await agent.put('/api/v1/company-context').send(completeBody).expect(200);

    const missingDescription = await agent
      .put('/api/v1/company-context')
      .send({
        ...completeBody,
        offer: {
          items: [
            {
              name: 'Audyt',
              benefit: ['Oszczędność czasu'],
              description: '',
            },
          ],
        },
      })
      .expect(400);
    expect(missingDescription.body.code).toBe('VALIDATION_FAILED');
    expect(missingDescription.body.details).toEqual(
      expect.arrayContaining([
        { section: 'offer' },
        { path: 'offer.items.0.description' },
      ]),
    );

    const secondKaleka = await agent
      .put('/api/v1/company-context')
      .send({
        ...completeBody,
        offer: {
          items: [
            completeBody.offer.items[0],
            { name: 'Druga', benefit: ['x'], description: '' },
          ],
        },
      })
      .expect(400);
    expect(secondKaleka.body.details).toEqual(
      expect.arrayContaining([{ path: 'offer.items.1.description' }]),
    );

    const emptyBenefit = await agent
      .put('/api/v1/company-context')
      .send({
        ...completeBody,
        offer: {
          items: [{ name: 'Audyt', benefit: [''], description: 'ok' }],
        },
      })
      .expect(400);
    expect(emptyBenefit.body.code).toBe('VALIDATION_FAILED');

    const stored = await agent.get('/api/v1/company-context').expect(200);
    expect(stored.body.identity).toEqual(completeBody.identity);
    expect(stored.body.offer).toEqual(completeBody.offer);
    expect(stored.body.completeness.complete).toBe(true);
  });

  it('D-29 PATCH clearing identity.name returns 400 and does not persist', async () => {
    await agent.put('/api/v1/company-context').send(completeBody).expect(200);

    const response = await agent
      .patch('/api/v1/company-context')
      .send({ identity: { name: '' } })
      .expect(400);

    expect(response.body.code).toBe('VALIDATION_FAILED');
    expect(response.body.details).toEqual(
      expect.arrayContaining([{ section: 'identity' }]),
    );

    const stored = await agent.get('/api/v1/company-context').expect(200);
    expect(stored.body.identity.name).toBe(completeBody.identity.name);
  });

  it('D-29 PUT complete gate with extras null returns 200', async () => {
    const response = await agent
      .put('/api/v1/company-context')
      .send({ ...completeBody, extras: null })
      .expect(200);

    expect(response.body.extras).toBeNull();
    expect(response.body.completeness).toEqual({ complete: true, missing: [] });
  });

  it('D-29 PUT kaleka CTA sibling returns 400', async () => {
    await agent.put('/api/v1/company-context').send(completeBody).expect(200);

    const response = await agent
      .put('/api/v1/company-context')
      .send({
        ...completeBody,
        cta: {
          items: [
            { label: 'Napisz do nas', target: '/kontakt' },
            { label: '' },
          ],
        },
      })
      .expect(400);

    expect(response.body.code).toBe('VALIDATION_FAILED');
    expect(response.body.details).toEqual(
      expect.arrayContaining([
        { section: 'cta' },
        { path: 'cta.items.1.label' },
      ]),
    );

    const stored = await agent.get('/api/v1/company-context').expect(200);
    expect(stored.body.cta).toEqual(completeBody.cta);
  });
```

Istniejący test `PATCH identity name merges and does not wipe offer` **zostaje** (merge nadal 200, bo wynik kompletny).

D-20 (`PUT unknown key in extras`) już wysyła `completeBody` — bez zmiany asercji.

D-1: nie ruszać `runs-lifecycle.e2e-spec.ts`; po KROK 1 pusta DB nadal `complete: false` → 409. Świadomie **nie** zamieniać tego case’u na 400.

#### Postman

W folderze setup obu kolekcji (`social-pipeline`, `content-pipeline`), **po** `PATCH extras unknown key (400)`, wstaw request:

- Nazwa: `PUT incomplete offer (400 D-29)`
- Method: `PUT` `{{baseUrl}}/company-context`
- Body: kompletny fixture jak w istniejącym PUT, ale druga usługa z `"description": ""` (albo pierwsza z pustym `description` — byle `offer.items.N.description`)
- Testy: status 400; `body.code === 'VALIDATION_FAILED'`; `details` zawiera `{ section: 'offer' }` **lub** `path` zaczynający się od `offer.items.`; **nie** `CONTEXT_INCOMPLETE`
- Description: `D-29: niekompletna bramka → 400, bez upsert. Odpalaj po udanym PUT company-context (singleton zostaje kompletny).`

Korekta opisu istniejącego `PUT company-context`: zdanie „PUT jest upsertem singletona” → „PUT zapisuje singleton **tylko** przy kompletnej bramce; niekompletne body → 400 bez upsert”.

Happy-path PUT Postmana już ma kompletne oferty z `description` i dwa CTA z etykietami — **bez** zmiany fixture’u Acme.

**DoD kroku:**

- Niekompletne PUT/PATCH → 400 `VALIDATION_FAILED`; GET/count singletona bez zmiany (brak upsert).
- Kaleka oferta (brak opisu / pusta korzyść / druga niepełna) → 400 + path pozycji.
- Kompletna bramka + `extras: null` → 200 + `completeness` jak dziś.
- `POST /runs` przy pustym kontekście nadal 409 `CONTEXT_INCOMPLETE` (D-1).
- D-20 unknown extras nadal 400 ze ścieżką Zod (`.`), na kompletnym body.

---

#### Propozycja commit message

```text
fix(company-context): reject incomplete PUT/PATCH before persist

Require every offer, CTA and audience item to be complete so kaleka rows never land in SQLite; keep CONTEXT_INCOMPLETE for POST /runs only.
```

---

## Weryfikacja wycinka

| Kryterium | Jak spełnione |
|-----------|----------------|
| Kotwica Faza 11 / 11.1–11.2 | KROK 1–3 |
| C-1 oferta `every` + description | KROK 1 |
| C-1 CTA/audience `every` | KROK 1 (HOW sesji) |
| C-4 persist tylko przy `complete === true` | KROK 2–3 |
| 400 `VALIDATION_FAILED`, nie 409 na zapisie | KROK 2–3; C-5 nietknięte |
| D-29 + regresja D-1 / D-20 | KROK 3 |
| Zakaz `filter` kalek | KROK 2 adapter / use-case |
| GET pustego singletona | KROK 3 e2e `deleteMany` + GET |
| extras poza bramką i poza PUT-gate | `isComplete` ignoruje; happy `extras: null` |
| Nagłówki `FAZA` / `KROK` | ten plik |
| Commit message EN Conventional Commits | koniec FAZY 1 |
| Statusy z trójki | wszystkie `NIE_ROZPOCZĘTY` |
| Major / docs / SPEC nietknięte | ten skill |
| Kompletny kod nowych plików | merge, assert, specy use-case |
| Refaktory jako fragmenty | use-case `execute`, adapter `patch` |
| `any` / sekrety | brak |

**Niezgodność z docs/SPEC:** brak w zakresie wycinka (po zatwierdzeniu CTA/audience `.every`).

**FE:** `content-chain-frontend_major_plan.md` Faza 3.5 — poza tym plikiem; backend przed UI.

---

## Ślad do major (informacyjnie)

Po **realnej** implementacji (osobna sesja, np. ręczne `/feature-implementation`) — **nie** w tej sesji:

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 11 | `WYKONANY` |
| Krok 11.1 | `WYKONANY` |
| Krok 11.2 | `WYKONANY` |
| MILESTONE 3 | bez zmian (`OSIĄGNIĘTY`) |
| MILESTONE 11 | **nie tworzyć / nie oznaczać** |

Ten skill **nie** edytuje `content-chain-backend_major_plan.md`.
