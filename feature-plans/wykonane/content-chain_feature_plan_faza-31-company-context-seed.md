# Content Chain — feature plan: seed kontekstu firmy (Faza 31)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-31-company-context-seed.md`  
**Kotwica major:** Faza 31 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 31).  
**Źródła:** `docs/deployment.md`, `docs/dictionary.md`, `docs/data_flow.md`, `docs/anty_patterny.md`, `docs/architektura_katalogi_pliki.md`, `docs/testy.md`, `SPEC-KONTEKST-FIRMY.md` C-9, `SPEC-PERSISTENCE.md` P-9, `SPEC-TESTY.md` D-86…D-89, major Faza 31 / kroki 31.1–31.2.  
**Baza (historia, bez edycji):** Faza 3 (company-context) + Faza 18 (`DEMO_MODE`) + Faza 30 (`WYKONANY`).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 31: uniwersalny `SeedModule` / `SeedService`, `seedCompanyContext()` seed-if-empty, auto przy `DEMO_MODE=true`, DX `seed:company-context`, fixture JSON (Mostek), cleanup `demo-context.txt` |
| Major | Faza 31; start po Fazie 30 (`WYKONANY`); **bez** MILESTONE między 30 a 31; **bez** MILESTONE 31 |
| Poza zakresem | Force overwrite; overlay przy GET; zmiana guest / Redis / `GET /config`; seed w bash / `docker-entrypoint.sh`; Setup Postman = seed; major FE; przepisywanie Fazy 3 / 18 / 30 |
| Po implementacji (informacyjnie) | Major: Faza 31 → `WYKONANY` (DoD gate + kod). Kroki 31.1–31.2 → `WYKONANY`. Brak `MILESTONE` 31. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 31.1 SeedModule / auto `DEMO_MODE` | FAZA 1 / KROK 1–3 | predykat pustego + eksport Put; fixture; SeedService + OnModuleInit + testy auto/no-op |
| 31.2 DX + cleanup `demo-context.txt` | FAZA 1 / KROK 4–5 | wąski CLI + pnpm; cleanup txt + regresja D-89 |

**Pass rozwojowy (sesja planu):**

1. Predykat `isEmptyCompanyContext` + eksport `PutCompanyContextUseCase` **przed** `SeedService`.
2. Fixture JSON **przed** ładowaniem w serwisie.
3. `SeedService` + wiring `AppModule` **przed** skryptem DX (DX woła ten sam serwis).
4. Testy jednostkowe **w tym samym kroku** co komponent (nie osobna „faza testów”).
5. Cleanup `demo-context.txt` **po** zielonych D-86…D-88 (i smoke manualnym).
6. **Brak przesunięć między fazami major.**

**Decyzje HOW (uzgodnione):**

- Zapis wyłącznie przez `PutCompanyContextUseCase` (ta sama bramka co udany PUT) — nie surowy Prisma/SQL.
- Auto: `OnModuleInit` w `SeedService` **tylko** gdy `DEMO_MODE === true`.
- DX: `NestFactory.createApplicationContext` na **wąskim** `SeedCliModule` (bez `RunsModule` / workera).
- Fixture kanoniczny: `apps/api/src/seed/fixtures/company-context.json` (treść Mostek z `demo-context.txt`).
- Konwersja txt→JSON: **jednorazowa**. Jeśli `company-context.json` już istnieje i ma niepustą treść → **pomijamy** nadpis z txt. Seed runtime czyta **tylko** JSON.
- Seed DB: zawsze seed-if-empty (idempotentny); niepusty → no-op; **bez** force.
- Nazwy: `SeedModule` / `SeedService` — **zakaz** brandu `Demo*`.

---

## Założenia

- Stack: NestJS **11** (`@nestjs/common` / `@nestjs/core` ^11), Zod **4.4.x** w `apps/api`, Prisma 6, pnpm workspace.
- `DEMO_MODE` już w `env.schema` (bool po transform); przy `true` wymagany Redis — bez zmian semantyki poza seedem.
- `CompanyContextModule` dziś eksportuje `GetCompletenessUseCase` + `COMPANY_CONTEXT_REPOSITORY` — **brak** eksportu Put (refaktor KROK 1).
- `tsconfig` / `rootDir: src` — CLI bootstrap pod `src/seed/`; launcher w `apps/api/scripts/`.
- nest-cli: dodać asset fixture JSON (jak maile / prompt.md).
- Typy: jawne na granicach publicznych; `unknown` + Zod przy JSON z dysku; zakaz `any`; `import type` dla typów; kolejność importów jak w `typescript-practices`.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

| Temat | Źródło | Ustalenie | Decyzja w wycinku |
|-------|--------|-----------|-------------------|
| `createApplicationContext` | Context7 `/nestjs/docs.nestjs.com` — application-context | Standalone IoC bez listenera HTTP; na końcu `app.close()` | DX CLI |
| `OnModuleInit` | Context7 — lifecycle-events | Wołane przy init kontekstu (także standalone); głębokie moduły pierwsze | Auto-seed w `SeedService` |
| Zod parse fixture | istniejący Zod 4 w api + `companyContextExtrasSchema` | Fixture = `unknown` → schema → `CompanyContext` | `loadCompanyContextFixture` |

---

## FAZA 1 — Seed kontekstu firmy (major 31.1–31.2)

Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Predykat pustego kontekstu + eksport Put

**Status:** `WYKONANY`

**Cel:** Jedna funkcja domenowa „pusty = emptyCompanyContext / C-2” oraz dostęp `PutCompanyContextUseCase` poza BC (dla seedu). Major 31.1 / `SPEC-KONTEKST-FIRMY.md` C-9 / P-9.

**Artefakty:**

- Nowy: `apps/api/src/company-context/domain/is-empty-company-context.ts`
- Nowy: `apps/api/src/company-context/domain/is-empty-company-context.spec.ts`
- Zmiana: `apps/api/src/company-context/company-context.module.ts` (exports)

#### Nowy plik — `is-empty-company-context.ts`

```typescript
import type { CompanyContext } from './company-context.types';

/** C-9 / C-2: równoważny `emptyCompanyContext()` (także gdy wiersz singletonu istnieje). */
export function isEmptyCompanyContext(context: CompanyContext): boolean {
  return (
    context.identity.name === '' &&
    context.identity.description === '' &&
    context.offer.items.length === 0 &&
    context.voice.weDo === '' &&
    context.voice.weDont === '' &&
    context.cta.items.length === 0 &&
    context.audience.profiles.length === 0 &&
    context.extras === null
  );
}
```

#### Nowy plik — `is-empty-company-context.spec.ts`

```typescript
import { emptyCompanyContext } from './company-context.types';
import { isEmptyCompanyContext } from './is-empty-company-context';

describe('isEmptyCompanyContext', () => {
  it('returns true for emptyCompanyContext()', () => {
    expect(isEmptyCompanyContext(emptyCompanyContext())).toBe(true);
  });

  it('returns false when any gate field is filled', () => {
    const context = emptyCompanyContext();
    context.identity.name = 'Mostek';
    expect(isEmptyCompanyContext(context)).toBe(false);
  });

  it('returns false when extras is a non-null object', () => {
    const context = emptyCompanyContext();
    context.extras = { hashtags: ['mostek'] };
    expect(isEmptyCompanyContext(context)).toBe(false);
  });
});
```

#### Refaktor — `company-context.module.ts`

**Teraz:**

```typescript
  exports: [GetCompletenessUseCase, COMPANY_CONTEXT_REPOSITORY],
```

**Zamień na:**

```typescript
  exports: [
    GetCompletenessUseCase,
    PutCompanyContextUseCase,
    COMPANY_CONTEXT_REPOSITORY,
  ],
```

(`PutCompanyContextUseCase` już jest w `providers` — tylko eksport.)

**DoD kroku:**

- Unit `is-empty-company-context.spec.ts` zielony.
- `CompanyContextModule` eksportuje `PutCompanyContextUseCase`.

---

### KROK 2 — Fixture JSON (Mostek) + idempotentna reguła konwersji

**Status:** `WYKONANY`

**Cel:** Kanoniczny fixture o kształcie `CompanyContext`, kompletny względem C-4; źródło treści = Mostek z rootowego `demo-context.txt` (jednorazowo).

**Artefakty:**

- Nowy: `apps/api/src/seed/fixtures/company-context.json`
- Nowy: `apps/api/src/seed/load-company-context-fixture.ts`
- Nowy: `apps/api/src/seed/load-company-context-fixture.spec.ts`
- Zmiana: `apps/api/nest-cli.json` (assets)

**Reguła konwersji (implementacja / re-run):**

1. Jeśli `apps/api/src/seed/fixtures/company-context.json` **istnieje** i po `JSON.parse` ma niepustą treść obiektu (`typeof === 'object'`, nie `null`, ma klucze) → **nie nadpisuj** z `demo-context.txt`.
2. Jeśli pliku brak / pusty (`{}` / pusty string) → zapisz treść z planu poniżej (Mostek).
3. Seed **nigdy** nie czyta `demo-context.txt` w runtime.
4. Po smoke (KROK 5) usuń `demo-context.txt` z roota — fixture JSON zostaje jedynym źródłem.

#### Nowy plik — `company-context.json` (kompletny)

```json
{
  "identity": {
    "name": "Mostek",
    "description": "Mostek spina systemy, które w firmie już stoją, i dopisuje aplikacje tam, gdzie ERP albo sklep nie dają rady. Pracujemy zdalnie i u klienta w całej Polsce — produkcja, hurt, logistyka, serwis, zwykle 50–500 osób. Po wdrożeniu zostajemy na dyżurze, nie zostawiamy kodu i znikamy."
  },
  "offer": {
    "items": [
      {
        "name": "Integracja systemów",
        "description": "Łączymy to, co firma już kupiła: ERP (Comarch, Subiekt, enova, SAP Business One), magazyn, sklep B2B, kuriera, czasem bramkę z hali albo API od dostawcy. Zamówienie, stan i dokument mają iść same, bez przepisywania z maila do kolejnego okna. Dostarczamy z Warszawy, Krakowa, Wrocławia, Trójmiasta i reszty kraju — dystans nie jest warunkiem projektu.",
        "benefit": [
          "Koniec z przepisywaniem zamówień między sklepem a ERP",
          "Stany magazynowe w jednym miejscu, nie w trzech arkuszach",
          "Błąd widać w kolejce, zanim wyjdzie zła faktura albo zła etykieta"
        ]
      },
      {
        "name": "Aplikacje wewnętrzne",
        "description": "Budujemy dedykowaną aplikację webową (z widokiem mobilnym) na jeden konkretny proces operacyjny, którego nie da się sensownie domknąć w ERP ani w gotowym narzędziu — np. awizacja dostaw, kontrola jakości na hali, obieg zleceń serwisowych, panel dla handlowców w terenie. Zakres jest wąski i ustalony z użytkownikami procesu; nie robimy „systemu do wszystkiego”.",
        "benefit": [
          "Zespół schodzi z Excela i WhatsAppa w tym jednym procesie",
          "Działa w przeglądarce i na telefonie, bez zakupów nowego sprzętu",
          "Wąski zakres = realny termin wdrożenia, nie otwarty projekt na lata"
        ]
      },
      {
        "name": "Opieka po wdrożeniu",
        "description": "Dyżur, drobne zmiany i pilnowanie kolejek po starcie. Godziny w pakiecie na miesiąc, nie osobna wycena za każdą poprawkę etykiety. Zespół rozproszony po Polsce — odpowiedź w dni robocze, niezależnie od województwa klienta.",
        "benefit": [
          "Jak kurier zmieni format etykiety, poprawiamy to w tym samym tygodniu",
          "Jest komu zadzwonić, gdy kolejka stoi w poniedziałek rano",
          "Drobne zmiany nie czekają na „nowy projekt”"
        ]
      }
    ]
  },
  "voice": {
    "weDo": "Mówimy nazwami systemów i czynności: co się przepisuje ręcznie, ile to zajmuje na zmianę, co wchodzi w integrację, a co zostaje w ERP. Zdania krótkie. Termin w tygodniach, od warsztatu z ludźmi, którzy ten proces klikają. Firma jest na „my”. Jak coś trwa 8 tygodni, piszemy 8 tygodni. Nie ograniczamy oferty do jednego regionu — mówimy o Polsce, nie o „okolicy biura”.",
    "weDont": "Bez „transformacji cyfrowej”, „synergii” i „platformy nowej generacji”. Bez obietnicy, że AI załatwi magazyn. Nie piszemy, że ogarniamy każdy system. Nie wrzucamy stawki godzinowej w grafikę. Nie piszemy od imienia założyciela. Nie sprzedajemy się hasłem „lokalny software house z X” — lokalizacja klienta nie jest filtrem."
  },
  "cta": {
    "items": [
      {
        "label": "Umów rozmowę o procesie",
        "target": "https://mostek.example/rozmowa"
      },
      {
        "label": "Poproś o zakres integracji",
        "target": "https://mostek.example/zakres"
      }
    ]
  },
  "audience": {
    "profiles": [
      {
        "name": "Dyrektor operacyjny w produkcji lub logistyce",
        "description": "Prowadzi firmę produkcyjną, przetwórczą albo magazynową, 50–500 osób, dowolne województwo. ERP już jest. Obok niego żyje Excel, mail i telefon na halę. Decyduje, gdy błąd w dokumencie albo opóźniona wysyłka zaczyna wychodzić na zewnątrz. Pyta, czy ruszamy działający system, kto zostaje po starcie i czy da się zrobić to bez przeprowadzki zespołu IT do biura."
      },
      {
        "name": "Właściciel hurtowni, sklepu B2B albo sieci punktów",
        "description": "Prowadzi hurt lub sklep, który wyrósł z Subiekta, Optimy albo panelu B2B. Zamówienia spływają z maila, z B2B i od handlowca — czasem z kilku miast. Sam jeszcze klika, albo klika jedna osoba, która jak pójdzie na urlop, zostawia zaległość. Chce, żeby zamówienie samo wskoczyło do ERP i na etykietę, bez kolejnego stanowiska i bez „tylko jeśli jesteście w naszym mieście”."
      }
    ]
  },
  "extras": {
    "hashtags": [
      "integracje",
      "erp",
      "comarch",
      "subiekt",
      "softwarehouse",
      "itpolska",
      "aplikacjewewnetrzne",
      "mostek"
    ],
    "catalogNotes": "Integracje, które robimy na co dzień: Comarch Optima i XL, Subiekt GT i nexo, enova365, SAP Business One, sklepy B2B (BaseLinker, własne panele), kurierzy DPD, InPost, DHL. Aplikacje wewnętrzne: panel w przeglądarce plus widok na telefon, logowanie kontem firmowym, baza po stronie klienta. Opieka: pakiet 8 albo 16 godzin miesięcznie, dyżur w dni robocze 8–16 (strefa PL). Pracujemy z klientami w całej Polsce — kick-off online albo na miejscu. Nie robimy stron wizytówek, sklepów od zera, aplikacji w sklepach z aplikacjami ani body leasingu. Nie bierzemy projektu, w którym nikt od klienta nie może usiąść na warsztat.",
    "performanceNotes": "Lepiej schodzi opis jednego zepsutego kroku („zamówienie z maila, 40 minut na zmianę, trzy osoby”) niż post „wdrażamy systemy”. Na LinkedIn działa zrzut kolejki błędów z zamazanymi danymi, gorzej działa zdjęcie zespołu przy laptopach. Rolki 20–30 s: najpierw ręczne przepisywanie, potem ten sam dokument, który wskakuje sam. Pytanie „co u was ludzie jeszcze przepisują z maila?” zbiera więcej odpowiedzi niż „napisz do nas”. Nazwa systemu (Optima, Subiekt) w pierwszym zdaniu trzyma właściwych ludzi. Hashtag województwa słabszy niż nazwa branży albo systemu — krajowy zasięg lepiej widać w case’ach z różnych miast niż w haśle „obsługujemy całą Polskę”.",
    "caseStudies": [
      {
        "title": "Producent opakowań, Małopolska",
        "summary": "Producent opakowań, około 120 osób, Comarch Optima. Zamówienia ze sklepu B2B i z maila handlowcy przepisywali ręcznie do Optimy, a etykiety kurierskie wystawiali osobno. Poranna zmiana traciła na to około 40 minut; w piątki rosła zaległość. Zrobiliśmy integrację sklepu z Optimą i automatyczne etykiety z danych zamówienia. Warsztat online w październiku, start w grudniu, bez wyłączania Optimy. Projekt zdalny — Mostek bez oddziału w Małopolsce.",
        "metrics": [
          "uruchomienie 9 tygodni po warsztacie kick-off z klientem (październik → grudzień); poranna zmiana odzyskała ok. 40 minut dziennie (koniec ręcznego przepisywania zamówień i etykiet); w pierwszym miesiącu DPD zmieniło format etykiety — 2 poprawki weszły w opiekę, bez osobnego zlecenia"
        ]
      },
      {
        "title": "Serwis maszyn, Pomorze",
        "summary": "Serwis maszyn przemysłowych, 18 techników rozjeżdżających się po północnej Polsce. Dyspozytor trzymał zlecenia w Excelu, technicy dopisywali status na WhatsAppie, klient dzwonił do biura z pytaniem „gdzie jest ekipa”. Zrobiliśmy obieg zleceń: dyspozytor na komputerze, technik na telefonie, klient dostaje status bez telefonu do biura. Excel został jako archiwum starego roku.",
        "metrics": [
          "uruchomienie 7 tygodni po warsztacie kick-off z klientem; wszyscy 18 techników pracowali na aplikacji mobilnej już w pierwszym tygodniu po starcie; telefony do biura „gdzie jest ekipa” spadły z kilkunastu dziennie do 2–3"
        ]
      }
    ],
    "objections": [
      {
        "label": "Mamy już ERP, po co druga aplikacja",
        "response": "ERP zostaje. Nie wstawiamy obok niego drugiego „systemu do wszystkiego”. Dopisujemy tylko ten kawałek, którego w ERP nie ma albo który ludzie obchodzą Excelem. Jak da się to ustawić w Optimie albo Subiekcie bez kodu, mówimy to na warsztacie i nie bierzemy zlecenia."
      },
      {
        "label": "Jesteście z innego miasta / nie macie oddziału u nas",
        "response": "Nie potrzebujemy oddziału w każdym województwie. Kick-off i warsztat robimy online albo przyjeżdżamy raz–dwa na start. Integracje i opieka idą zdalnie — kolejka błędów nie wymaga biura obok magazynu. Jak ktoś wymaga codziennej obecności na hali przez pół roku, nie jesteśmy dobrym dopasowaniem."
      },
      {
        "label": "Mamy swojego programistę, zrobimy to u siebie",
        "response": "Jedna osoba w firmie zwykle gasi bieżące pożary i nie ma kwartału na integrację z kurierem. Wchodzimy z zakresem na ten jeden proces i z kimś, kto zostanie po starcie. Własny programista dalej ogarnia resztę. Jak ma czas i chce to prowadzić sam, nie jesteśmy potrzebni."
      }
    ]
  }
}
```

#### Nowy plik — `load-company-context-fixture.ts`

```typescript
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { companyContextExtrasInputSchema } from '../company-context/application/company-context.schemas';
import { isComplete } from '../company-context/domain/is-complete';
import type { CompanyContext } from '../company-context/domain/company-context.types';

const offerItemSchema = z
  .object({
    name: z.string(),
    benefit: z.array(z.string()),
    description: z.string(),
  })
  .strict();

const ctaItemSchema = z
  .object({
    label: z.string(),
    target: z.string().optional(),
  })
  .strict();

const audienceProfileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .strict();

export const companyContextFixtureSchema = z
  .object({
    identity: z
      .object({
        name: z.string(),
        description: z.string(),
      })
      .strict(),
    offer: z.object({ items: z.array(offerItemSchema) }).strict(),
    voice: z
      .object({
        weDo: z.string(),
        weDont: z.string(),
      })
      .strict(),
    cta: z.object({ items: z.array(ctaItemSchema) }).strict(),
    audience: z.object({ profiles: z.array(audienceProfileSchema) }).strict(),
    extras: companyContextExtrasInputSchema,
  })
  .strict();

export type CompanyContextFixture = z.infer<typeof companyContextFixtureSchema>;

export function fixturePath(
  baseDir: string = __dirname,
): string {
  return join(baseDir, 'fixtures', 'company-context.json');
}

export function loadCompanyContextFixture(
  baseDir: string = __dirname,
): CompanyContext {
  const raw: unknown = JSON.parse(readFileSync(fixturePath(baseDir), 'utf8'));
  const parsed = companyContextFixtureSchema.parse(raw);
  if (!isComplete(parsed).complete) {
    throw new Error(
      'Company context fixture is incomplete relative to gate C-4',
    );
  }
  return parsed;
}
```

#### Nowy plik — `load-company-context-fixture.spec.ts`

```typescript
import { isComplete } from '../company-context/domain/is-complete';
import {
  companyContextFixtureSchema,
  loadCompanyContextFixture,
} from './load-company-context-fixture';

describe('loadCompanyContextFixture', () => {
  it('loads Mostek fixture that passes the write gate', () => {
    const context = loadCompanyContextFixture();
    expect(context.identity.name).toBe('Mostek');
    expect(isComplete(context)).toEqual({ complete: true, missing: [] });
    expect(companyContextFixtureSchema.safeParse(context).success).toBe(true);
  });

  it('rejects unknown extras keys (strict)', () => {
    const result = companyContextFixtureSchema.safeParse({
      identity: { name: 'X', description: 'Y' },
      offer: {
        items: [
          { name: 'A', benefit: ['b'], description: 'd' },
        ],
      },
      voice: { weDo: 'a', weDont: 'b' },
      cta: { items: [{ label: 'L' }] },
      audience: { profiles: [{ name: 'P', description: 'D' }] },
      extras: { unknownBag: true },
    });
    expect(result.success).toBe(false);
  });
});
```

#### Refaktor — `nest-cli.json` assets

**Teraz:**

```json
    "assets": [
      "**/*.prompt.md",
      "auth/infrastructure/mail/assets/**/*"
    ],
```

**Zamień na:**

```json
    "assets": [
      "**/*.prompt.md",
      "auth/infrastructure/mail/assets/**/*",
      "seed/fixtures/**/*"
    ],
```

**DoD kroku:**

- Plik JSON Mostek w drzewie; przy re-runie implementacji niepusty JSON **nie** jest nadpisywany z txt.
- Unit loadera zielony; `isComplete(fixture).complete === true`.
- Asset nest-cli obejmuje fixture.

---

### KROK 3 — `SeedModule` / `SeedService` + auto przy `DEMO_MODE`

**Status:** `WYKONANY`

**Cel:** Lifecycle boot woła seed-if-empty wyłącznie przy `DEMO_MODE=true`. Major 31.1; C-9; D-86 / D-87.

**Artefakty:**

- Nowy: `apps/api/src/seed/seed.service.ts`
- Nowy: `apps/api/src/seed/seed.service.spec.ts`
- Nowy: `apps/api/src/seed/seed.module.ts`
- Zmiana: `apps/api/src/app.module.ts`

#### Nowy plik — `seed.service.ts`

```typescript
import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PutCompanyContextUseCase } from '../company-context/application/put-company-context.use-case';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../company-context/domain/company-context.port';
import { isEmptyCompanyContext } from '../company-context/domain/is-empty-company-context';
import { ENV, type Env } from '../shared/config/env';
import { loadCompanyContextFixture } from './load-company-context-fixture';

export type SeedCompanyContextResult =
  | { readonly status: 'seeded' }
  | { readonly status: 'skipped'; readonly reason: 'not-empty' };

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly contexts: CompanyContextRepository,
    private readonly putCompanyContext: PutCompanyContextUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.env.DEMO_MODE) {
      return;
    }
    const result = await this.seedCompanyContext();
    this.logger.log(
      { result },
      'company context seed on boot (DEMO_MODE=true)',
    );
  }

  async seedCompanyContext(): Promise<SeedCompanyContextResult> {
    const current = await this.contexts.get();
    if (!isEmptyCompanyContext(current)) {
      return { status: 'skipped', reason: 'not-empty' };
    }
    const fixture = loadCompanyContextFixture();
    await this.putCompanyContext.execute(fixture);
    return { status: 'seeded' };
  }
}
```

#### Nowy plik — `seed.service.spec.ts`

```typescript
import { emptyCompanyContext } from '../company-context/domain/company-context.types';
import type { CompanyContextRepository } from '../company-context/domain/company-context.port';
import type { PutCompanyContextUseCase } from '../company-context/application/put-company-context.use-case';
import type { Env } from '../shared/config/env';
import { SeedService } from './seed.service';
import * as loadFixture from './load-company-context-fixture';

const completeFixture = {
  identity: { name: 'Mostek', description: 'Opis.' },
  offer: {
    items: [
      {
        name: 'Integracja',
        benefit: ['A'],
        description: 'Opis oferty.',
      },
    ],
  },
  voice: { weDo: 'konkret', weDont: 'żargon' },
  cta: { items: [{ label: 'Kontakt', target: '/x' }] },
  audience: {
    profiles: [{ name: 'Ops', description: 'Dyrektor ops' }],
  },
  extras: null,
};

function repo(
  overrides: Partial<CompanyContextRepository> = {},
): CompanyContextRepository {
  return {
    get: async () => emptyCompanyContext(),
    put: async (context) => context,
    ...overrides,
  };
}

function env(demoMode: boolean): Env {
  return { DEMO_MODE: demoMode } as Env;
}

describe('SeedService', () => {
  let loadSpy: jest.SpyInstance;

  beforeEach(() => {
    loadSpy = jest
      .spyOn(loadFixture, 'loadCompanyContextFixture')
      .mockReturnValue(completeFixture);
  });

  afterEach(() => {
    loadSpy.mockRestore();
  });

  it('seeds when context is empty (D-86 path)', async () => {
    const put = { execute: jest.fn(async (c: typeof completeFixture) => c) };
    const service = new SeedService(
      env(false),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await expect(service.seedCompanyContext()).resolves.toEqual({
      status: 'seeded',
    });
    expect(put.execute).toHaveBeenCalledWith(completeFixture);
  });

  it('no-ops when context is not empty (D-87)', async () => {
    const put = { execute: jest.fn() };
    const filled = { ...emptyCompanyContext(), identity: { name: 'X', description: 'Y' } };
    const service = new SeedService(
      env(true),
      repo({ get: async () => filled }),
      put as unknown as PutCompanyContextUseCase,
    );
    await expect(service.seedCompanyContext()).resolves.toEqual({
      status: 'skipped',
      reason: 'not-empty',
    });
    expect(put.execute).not.toHaveBeenCalled();
    expect(loadSpy).not.toHaveBeenCalled();
  });

  it('onModuleInit seeds only when DEMO_MODE is true', async () => {
    const put = { execute: jest.fn(async (c: typeof completeFixture) => c) };
    const off = new SeedService(
      env(false),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await off.onModuleInit();
    expect(put.execute).not.toHaveBeenCalled();

    const on = new SeedService(
      env(true),
      repo(),
      put as unknown as PutCompanyContextUseCase,
    );
    await on.onModuleInit();
    expect(put.execute).toHaveBeenCalledTimes(1);
  });
});
```

#### Nowy plik — `seed.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CompanyContextModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
```

#### Refaktor — `app.module.ts`

**Teraz** (fragment imports):

```typescript
import { PublicConfigModule } from './public-config/public-config.module';
import { FeedbackModule } from './feedback/feedback.module';
```

**Zamień na** (dodaj import + wpis w tablicy `imports`):

```typescript
import { PublicConfigModule } from './public-config/public-config.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SeedModule } from './seed/seed.module';
```

W tablicy `imports` modułu — po `PublicConfigModule` (lub obok innych nie-BC):

```typescript
    PublicConfigModule,
    SeedModule,
```

**DoD kroku:**

- Unit `seed.service.spec.ts` zielony (D-86 / D-87 na poziomie serwisu + warunek `DEMO_MODE` w `onModuleInit`).
- Brak nazw `Demo*` w module/serwisie.
- Start api z `DEMO_MODE=true` + pusty kontekst → zapis; restart przy niepustym → no-op.

---

### KROK 4 — DX `seed:company-context` (wąski CLI)

**Status:** `WYKONANY`

**Cel:** Ręczny seed bez wymogu `DEMO_MODE` i bez ustawiania flagi. Major 31.2; D-88.

**Artefakty:**

- Nowy: `apps/api/src/seed/seed-cli.module.ts`
- Nowy: `apps/api/src/seed/seed-company-context.cli.ts`
- Nowy: `apps/api/scripts/seed-company-context.mjs`
- Zmiana: `apps/api/package.json` (script)
- Zmiana: root `package.json` (proxy script)

#### Nowy plik — `seed-cli.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyContextModule } from '../company-context/company-context.module';
import { EnvModule } from '../shared/config/env.module';
import { validateEnv } from '../shared/config/env.schema';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { SeedModule } from './seed.module';

/** Wąski kontekst DX — bez Runs / workera / HTTP. */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    EnvModule,
    PrismaModule,
    CompanyContextModule,
    SeedModule,
  ],
})
export class SeedCliModule {}
```

#### Nowy plik — `seed-company-context.cli.ts`

```typescript
import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedCliModule } from './seed-cli.module';
import { SeedService } from './seed.service';

async function main(): Promise<void> {
  const app = await NestFactory.createApplicationContext(SeedCliModule, {
    logger: ['error', 'warn', 'log'],
  });
  try {
    const seed = app.get(SeedService);
    const result = await seed.seedCompanyContext();
    Logger.log(JSON.stringify(result), 'seed:company-context');
  } finally {
    await app.close();
  }
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
```

#### Nowy plik — `scripts/seed-company-context.mjs`

```javascript
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const apiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(apiRoot, 'dist', 'seed', 'seed-company-context.cli.js');

if (!existsSync(entry)) {
  console.error(
    `[seed:company-context] Missing ${entry}. Run: pnpm --filter api build`,
  );
  process.exit(1);
}

const result = spawnSync(process.execPath, [entry], {
  cwd: apiRoot,
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? 1);
```

#### Refaktor — `apps/api/package.json` scripts

**Teraz** (fragment):

```json
    "prisma:studio": "prisma studio"
```

**Zamień na:**

```json
    "prisma:studio": "prisma studio",
    "seed:company-context": "node ./scripts/seed-company-context.mjs"
```

#### Refaktor — root `package.json` scripts

**Teraz** (fragment):

```json
		"format:check": "prettier --check ."
```

**Zamień na:**

```json
		"format:check": "prettier --check .",
		"seed:company-context": "pnpm --filter api seed:company-context"
```

**Test D-88 (unit ścieżki DX = bezpośrednie `seedCompanyContext` przy `DEMO_MODE=false`):** pokryte w KROK 3 (`env(false)` + pusty → `seeded`; niepusty → skip). Dodatkowo smoke ręczny:

```bash
pnpm --filter api build
DEMO_MODE=false pnpm seed:company-context   # pusty DB → seeded
pnpm seed:company-context                   # ponownie → skipped not-empty
```

**DoD kroku:**

- `pnpm seed:company-context` (po `build`) działa bez `DEMO_MODE=true`.
- Brak logiki seedu w `docker-entrypoint.sh` / bashu Compose.
- D-88 spełnione (unit + smoke).

---

### KROK 5 — Cleanup `demo-context.txt` + regresja D-89

**Status:** `WYKONANY`

**Cel:** Po weryfikacji auto + DX usunąć artefakt przejściowy; Setup Postman nadal = `PUT /company-context`.

**Artefakty:**

- Usunięcie: `demo-context.txt` (root repo)
- Bez zmian w `apps/api/test/postman/*` Setup (asercja regresji)

**Kolejność:**

1. Potwierdź D-86…D-88 (unit + smoke boot / CLI).
2. Usuń `demo-context.txt`.
3. Sprawdź, że kolekcje Social/Content Setup nadal mają request `PUT company-context` (nie DX seed).

**DoD kroku:**

- `demo-context.txt` nie istnieje w working tree.
- D-89: Setup Postman = PUT (bez zamiany na seed).
- Fixture JSON pozostaje jedynym źródłem treści seedu.

---

#### Propozycja commit message

```text
feat(seed): add seed-if-empty company context for demo boot and DX

Load a complete Mostek fixture through PutCompanyContextUseCase so DEMO_MODE boot and seed:company-context stay idempotent without force overwrite.
```

---

## Weryfikacja wycinka

| Check | Źródło |
|-------|--------|
| Auto tylko przy `DEMO_MODE=true` | C-9, deployment.md |
| Seed-if-empty / no-op / bez force | C-9, P-9, D-86, D-87 |
| DX bez wymogu DEMO | C-9, D-88 |
| Zapis domenowy (Put) | C-9, anty_patterny |
| Brak overlay GET | C-6, C-9 |
| Brak `Demo*` w nazwach | C-9, architektura_katalogi |
| Brak seedu w entrypoint | anty_patterny |
| Setup Postman = PUT | D-89, testy.md |
| Fixture kompletny C-4 | C-9 |
| Konwersja txt→JSON jednorazowa / skip gdy JSON niepusty | uzgodnienie sesji |
| Nagłówki wyłącznie `FAZA` / `KROK` | skill |
| Major nietknięty w tej sesji | skill |

**Komendy po implementacji (orientacyjnie):**

```bash
pnpm --filter api test -- is-empty-company-context
pnpm --filter api test -- load-company-context-fixture
pnpm --filter api test -- seed.service
pnpm --filter api build && pnpm seed:company-context
```

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po domknięciu kodu |
|---------|-------------------|
| Faza 31 | `WYKONANY` |
| Krok 31.1 | `WYKONANY` |
| Krok 31.2 | `WYKONANY` |
| MILESTONE 31 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 3 / 18 / 30 | bez zmian treści / statusów |

Edycja major **poza** tym skillem (ręcznie lub w sesji `/feature-implementation` na życzenie).
