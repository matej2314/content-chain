# Feature Plan — Faza 3 major: kontekst firmy i cykl życia runów

## Meta

**Kotwica major:** `content-chain-backend_major_plan.md` — Faza 3 (kroki 3.1–3.3) + ślad do MILESTONE 3.  
**Zestaw wycinka:** `faza-2-milestone-3` (plik `_1` = major Faza 2; **ten plik** = major Faza 3).  
**Zależność:** implementacja pliku `_1` musi być na miejscu (Prisma schema, `PrismaService`, `ENV`, `DomainException`, `HttpExceptionFilter`, `newRunId` / `newConversationId`, `configureHttpApp`, `/metrics`).  
**Refaktor w tym planie (KROK 2):** `DomainException` przeniesiona z `shared/http/domain.exception.ts` → `shared/exceptions/domain.exception.ts` — domain nie zależy od katalogu HTTP. Importy z `_1` (`http-exception.filter.ts`, `http-exception.filter.spec.ts`) zaktualizowane w tym samym kroku.  
**Źródła:** `docs/dokumentacja_komunikacji.md`, `docs/dokumentacja_koncepcyjna.md`, `docs/observability.md`, `docs/architektura.md`, `spec/SPEC-KONTEKST-FIRMY.md`, `SPEC-RUNY.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-TESTY.md`, `SPEC-PERSISTENCE.md`.  
**Poza zakresem tego pliku:** pipeline Social / LangGraph / wyniki ideas-content (major Faza 4 — podmienia `RunExecutorPort`), auth / cookie / `JwtAuthGuard` / `FORBIDDEN` dla `user` (major Faza 5), dashboard FE, live vendor LLM na PR.

**Authz w tym wycinku:** powierzchnie kontekstu i runów **otwarte** (Postman). C-4 (`admin` na zapis) i K-4 (cookie SSE) obowiązują docelowo — major Faza 5 je domyka. `startedBy` = `null` (docs: era przed auth).

**Pass rozwojowy (ten plik):** `isComplete` i HTTP kontekstu **przed** `POST /runs`; domain statusów **przed** workera; hub SSE **przed** HTTP `.../events`; listing **po** utworzeniu runu. Stub executora **nie** woła LLM (port z `_1` zostaje dla Fazy 4).

---

## Założenia

- Warstwy BC: controller → application → domain + porty → adapter Prisma (`docs/architektura_katalogi_pliki.md`). Prisma tylko w `infrastructure/` oraz w `shared/persistence` z `_1`.
- Walidacja HTTP: class-validator + `ValidationPipe`. Application: Zod. Shared: bez Zod.
- SSE: Nest `@Sse()` + RxJS `Observable<MessageEvent>` (Context7 `/nestjs/docs.nestjs.com` — techniques/server-sent-events). Emisja **wyłącznie** z BC Runs (R-4).
- Worker: in-process, `MAX_CONCURRENT_RUNS` z `ENV` (default 3). Stub executora: log placeholder → `completed` (zatwierdzone HOW).
- HITL HTTP istnieje jako zmiana stanu; stub **nie** wchodzi w `awaiting_hitl`. Social (Faza 4) ustawi pauzę modelem B (`SPEC-SOCIAL.md` S-6) — poza tym plikiem.
- Testy: Jest unit (domain bez I/O) + supertest; D-1 (`CONTEXT_INCOMPLETE`) w tym wycinku; D-2/D-3 authz — Faza 5; D-4…D-8 Social — Faza 4; D-9 kolejka i D-10 recovery — tutaj (z fake/stub executora, bez live LLM).

**Biblioteki:**

| Temat | Źródło | Ustalenie |
|-------|--------|-----------|
| SSE | Context7 NestJS `@Sse()` / `MessageEvent` | `type` = nazwa zdarzenia (`run.status`, …); `data` = JSON |
| RxJS | już w `apps/api` (`rxjs`) | `Subject` w hubie; `startWith` na snapshot statusu przy subskrypcji |
| Prisma | plik `_1` / Prisma 6 | `groupBy`/`updateMany` do kolejki i recovery; append log = `create` |

---

## FAZA 2 — Kontekst firmy i cykl życia runów

Odpowiada major **Faza 3**. Numer `FAZA 2` = drugi w zestawie wycinka (ciągłość po `FAZA 1` w pliku `_1`).

---

### KROK 1 — BC Company Context (domain, persistence, HTTP)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kanoniczny jeden kontekst na instancję, werdykt kompletności, GET/PUT/PATCH. Major 3.1, `SPEC-KONTEKST-FIRMY.md` C-1…C-7 (C-4 authz — Faza 5). JSON uzgodniony w wywiadzie HOW.

**Artefakty:**

- nowy: `apps/api/src/company-context/domain/company-context.types.ts`
- nowy: `apps/api/src/company-context/domain/is-complete.ts`
- nowy: `apps/api/src/company-context/domain/is-complete.spec.ts`
- nowy: `apps/api/src/company-context/domain/company-context.constants.ts`
- nowy: `apps/api/src/company-context/domain/company-context.query.port.ts`
- nowy: `apps/api/src/company-context/application/company-context.mapper.ts`
- nowy: `apps/api/src/company-context/application/get-company-context.use-case.ts`
- nowy: `apps/api/src/company-context/application/put-company-context.use-case.ts`
- nowy: `apps/api/src/company-context/application/patch-company-context.use-case.ts`
- nowy: `apps/api/src/company-context/application/get-completeness.use-case.ts`
- nowy: `apps/api/src/company-context/infrastructure/prisma-company-context.adapter.ts`
- nowy: `apps/api/src/company-context/http/dto/company-context.dto.ts`
- refaktor: `apps/api/src/company-context/company-context.controller.ts`
- refaktor: `apps/api/src/company-context/company-context.module.ts`
- refaktor: `apps/api/src/company-context/company-context.controller.spec.ts` (zastąp „should be defined” testami HTTP z testing module + fake port **albo** przenieś asercje do e2e i zostaw cienki spec)
- nowy: `apps/api/test/company-context.e2e-spec.ts`

**Implementacja (kolejność):** typy + `isComplete` → port/adapter → use-case’y → DTO/controller → e2e.

**Nowy plik:** `apps/api/src/company-context/domain/company-context.constants.ts`

```typescript
export const COMPANY_CONTEXT_SINGLETON_ID = 'default';

export const GATE_SECTIONS = ['identity', 'offer', 'voice', 'cta', 'audience'] as const;

export type GateSection = (typeof GATE_SECTIONS)[number];
```

**Nowy plik:** `apps/api/src/company-context/domain/company-context.types.ts`

```typescript
import type { GateSection } from './company-context.constants';

export type OfferItem = { name: string; benefit: string };
export type CtaItem = { label: string; target?: string };
export type AudienceProfile = { description: string };

export type CompanyContextExtras = Record<string, unknown>;

export type CompanyContext = {
  identity: { name: string; description: string };
  offer: { items: OfferItem[] };
  voice: { weDo: string; weDont: string };
  cta: { items: CtaItem[] };
  audience: { profiles: AudienceProfile[] };
  extras: CompanyContextExtras | null;
};

export type Completeness = {
  complete: boolean;
  missing: GateSection[];
};

export const emptyCompanyContext = (): CompanyContext => ({
  identity: { name: '', description: '' },
  offer: { items: [] },
  voice: { weDo: '', weDont: '' },
  cta: { items: [] },
  audience: { profiles: [] },
  extras: null,
});
```

**Nowy plik:** `apps/api/src/company-context/domain/is-complete.ts`

```typescript
import type { CompanyContext, Completeness } from './company-context.types';
import type { GateSection } from './company-context.constants';

const nonEmpty = (value: string): boolean => value.trim().length > 0;

export function isComplete(context: CompanyContext): Completeness {
  const missing: GateSection[] = [];

  if (!nonEmpty(context.identity.name) || !nonEmpty(context.identity.description)) {
    missing.push('identity');
  }
  if (
    !context.offer.items.some((item) => nonEmpty(item.name) && nonEmpty(item.benefit))
  ) {
    missing.push('offer');
  }
  if (!nonEmpty(context.voice.weDo) || !nonEmpty(context.voice.weDont)) {
    missing.push('voice');
  }
  if (!context.cta.items.some((item) => nonEmpty(item.label))) {
    missing.push('cta');
  }
  if (!context.audience.profiles.some((item) => nonEmpty(item.description))) {
    missing.push('audience');
  }

  return { complete: missing.length === 0, missing };
}
```

**Nowy plik:** `apps/api/src/company-context/domain/is-complete.spec.ts`

```typescript
import { emptyCompanyContext } from './company-context.types';
import { isComplete } from './is-complete';

const complete = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: { items: [{ name: 'Audyt', benefit: 'Oszczędność czasu' }] },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

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
});
```

**Nowy plik:** `apps/api/src/company-context/domain/company-context.query.port.ts`

```typescript
import type { CompanyContext } from './company-context.types';

export const COMPANY_CONTEXT_REPOSITORY = Symbol('COMPANY_CONTEXT_REPOSITORY');

export interface CompanyContextRepository {
  get(): Promise<CompanyContext>;
  put(context: CompanyContext): Promise<CompanyContext>;
  patch(partial: PartialCompanyContext): Promise<CompanyContext>;
}

export type PartialCompanyContext = {
  identity?: Partial<CompanyContext['identity']>;
  offer?: Partial<CompanyContext['offer']>;
  voice?: Partial<CompanyContext['voice']>;
  cta?: Partial<CompanyContext['cta']>;
  audience?: Partial<CompanyContext['audience']>;
  extras?: CompanyContext['extras'];
};
```

**Nowy plik:** `apps/api/src/company-context/infrastructure/prisma-company-context.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { COMPANY_CONTEXT_SINGLETON_ID } from '../domain/company-context.constants';
import type {
  CompanyContextRepository,
  PartialCompanyContext,
} from '../domain/company-context.query.port';
import {
  emptyCompanyContext,
  type CompanyContext,
  type CompanyContextExtras,
} from '../domain/company-context.types';

@Injectable()
export class PrismaCompanyContextAdapter implements CompanyContextRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<CompanyContext> {
    const row = await this.prisma.companyContext.findUnique({
      where: { id: COMPANY_CONTEXT_SINGLETON_ID },
    });
    return row ? this.toDomain(row) : emptyCompanyContext();
  }

  async put(context: CompanyContext): Promise<CompanyContext> {
    const row = await this.prisma.companyContext.upsert({
      where: { id: COMPANY_CONTEXT_SINGLETON_ID },
      create: this.toRow(context),
      update: this.toRow(context),
    });
    return this.toDomain(row);
  }

  async patch(partial: PartialCompanyContext): Promise<CompanyContext> {
    const current = await this.get();
    const merged: CompanyContext = {
      identity: { ...current.identity, ...partial.identity },
      offer: { items: partial.offer?.items ?? current.offer.items },
      voice: { ...current.voice, ...partial.voice },
      cta: { items: partial.cta?.items ?? current.cta.items },
      audience: { profiles: partial.audience?.profiles ?? current.audience.profiles },
      extras: partial.extras === undefined ? current.extras : partial.extras,
    };
    return this.put(merged);
  }

  private toRow(context: CompanyContext) {
    return {
      id: COMPANY_CONTEXT_SINGLETON_ID,
      identityName: context.identity.name,
      identityDescription: context.identity.description,
      offerItems: context.offer.items as Prisma.InputJsonValue,
      voiceWeDo: context.voice.weDo,
      voiceWeDont: context.voice.weDont,
      ctaItems: context.cta.items as Prisma.InputJsonValue,
      audienceProfiles: context.audience.profiles as Prisma.InputJsonValue,
      extras: (context.extras ?? Prisma.JsonNull) as Prisma.InputJsonValue,
    };
  }

  private toDomain(row: {
    identityName: string;
    identityDescription: string;
    offerItems: Prisma.JsonValue;
    voiceWeDo: string;
    voiceWeDont: string;
    ctaItems: Prisma.JsonValue;
    audienceProfiles: Prisma.JsonValue;
    extras: Prisma.JsonValue | null;
  }): CompanyContext {
    return {
      identity: { name: row.identityName, description: row.identityDescription },
      offer: { items: (row.offerItems as CompanyContext['offer']['items']) ?? [] },
      voice: { weDo: row.voiceWeDo, weDont: row.voiceWeDont },
      cta: { items: (row.ctaItems as CompanyContext['cta']['items']) ?? [] },
      audience: {
        profiles: (row.audienceProfiles as CompanyContext['audience']['profiles']) ?? [],
      },
      extras: (row.extras as CompanyContextExtras | null) ?? null,
    };
  }
}
```

**Zakaz:** odczyt `.md` / plików jako fallback (C-6, P-5). Pusty singleton w pamięci przy braku wiersza jest OK; pierwszy PUT tworzy wiersz.

**Nowy plik:** `apps/api/src/company-context/application/get-company-context.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../domain/company-context.query.port';
import { isComplete } from '../domain/is-complete';

@Injectable()
export class GetCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute() {
    const context = await this.repository.get();
    const completeness = isComplete(context);
    return { ...context, completeness };
  }
}
```

**Nowy plik:** `apps/api/src/company-context/application/company-context.mapper.ts`

```typescript
import type { Completeness, CompanyContext } from '../domain/company-context.types';
import type { PartialCompanyContext } from '../domain/company-context.query.port';
import type {
  PatchCompanyContextDto,
  PutCompanyContextDto,
} from '../http/dto/company-context.dto';

export function toCompanyContext(dto: PutCompanyContextDto): CompanyContext {
  return {
    identity: { name: dto.identity.name, description: dto.identity.description },
    offer: { items: dto.offer.items },
    voice: { weDo: dto.voice.weDo, weDont: dto.voice.weDont },
    cta: { items: dto.cta.items },
    audience: { profiles: dto.audience.profiles },
    extras: dto.extras ?? null,
  };
}

export function toPartialCompanyContext(dto: PatchCompanyContextDto): PartialCompanyContext {
  return {
    ...(dto.identity ? { identity: dto.identity } : {}),
    ...(dto.offer ? { offer: dto.offer } : {}),
    ...(dto.voice ? { voice: dto.voice } : {}),
    ...(dto.cta ? { cta: dto.cta } : {}),
    ...(dto.audience ? { audience: dto.audience } : {}),
    ...(dto.extras !== undefined ? { extras: dto.extras } : {}),
  };
}

export function toPublicCompanyContext(context: CompanyContext, completeness: Completeness) {
  return { ...context, completeness };
}
```

Application zależy od DTO HTTP tylko w mapperze (granica). Use-case’y przyjmują typy domenowe.

**Nowy plik:** `apps/api/src/company-context/application/get-completeness.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../domain/company-context.query.port';
import { isComplete } from '../domain/is-complete';

@Injectable()
export class GetCompletenessUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute() {
    return isComplete(await this.repository.get());
  }
}
```

**Nowy plik:** `apps/api/src/company-context/application/put-company-context.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../domain/company-context.query.port';
import type { CompanyContext } from '../domain/company-context.types';
import { isComplete } from '../domain/is-complete';
import { toPublicCompanyContext } from './company-context.mapper';

@Injectable()
export class PutCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute(context: CompanyContext) {
    const saved = await this.repository.put(context);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
}
```

**Nowy plik:** `apps/api/src/company-context/application/patch-company-context.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
  type PartialCompanyContext,
} from '../domain/company-context.query.port';
import { isComplete } from '../domain/is-complete';
import { toPublicCompanyContext } from './company-context.mapper';

@Injectable()
export class PatchCompanyContextUseCase {
  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly repository: CompanyContextRepository,
  ) {}

  async execute(partial: PartialCompanyContext) {
    const saved = await this.repository.patch(partial);
    return toPublicCompanyContext(saved, isComplete(saved));
  }
}
```

**Nowy plik:** `apps/api/src/company-context/http/dto/company-context.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class OfferItemDto {
  @IsString()
  name!: string;

  @IsString()
  benefit!: string;
}

export class CtaItemDto {
  @IsString()
  label!: string;

  @IsOptional()
  @IsString()
  target?: string;
}

export class AudienceProfileDto {
  @IsString()
  description!: string;
}

export class IdentityDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;
}

export class OfferDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferItemDto)
  items!: OfferItemDto[];
}

export class VoiceDto {
  @IsString()
  weDo!: string;

  @IsString()
  weDont!: string;
}

export class CtaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CtaItemDto)
  items!: CtaItemDto[];
}

export class AudienceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AudienceProfileDto)
  profiles!: AudienceProfileDto[];
}

export class PatchIdentityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class PatchVoiceDto {
  @IsOptional()
  @IsString()
  weDo?: string;

  @IsOptional()
  @IsString()
  weDont?: string;
}

export class PutCompanyContextDto {
  @ValidateNested()
  @Type(() => IdentityDto)
  identity!: IdentityDto;

  @ValidateNested()
  @Type(() => OfferDto)
  offer!: OfferDto;

  @ValidateNested()
  @Type(() => VoiceDto)
  voice!: VoiceDto;

  @ValidateNested()
  @Type(() => CtaDto)
  cta!: CtaDto;

  @ValidateNested()
  @Type(() => AudienceDto)
  audience!: AudienceDto;

  @IsOptional()
  extras?: Record<string, unknown>;
}

export class PatchCompanyContextDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PatchIdentityDto)
  identity?: PatchIdentityDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferDto)
  offer?: OfferDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PatchVoiceDto)
  voice?: PatchVoiceDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CtaDto)
  cta?: CtaDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AudienceDto)
  audience?: AudienceDto;

  @IsOptional()
  extras?: Record<string, unknown>;
}
```

PUT **nie** wymaga niepustych stringów na granicy HTTP — kompletność to domain. Puste stringi są legalnym zapisem (admin uzupełnia później). PATCH: zagnieżdżone DTO z polami opcjonalnymi (`PatchIdentityDto` / `PatchVoiceDto`), żeby `PATCH { "identity": { "name": "Nowa" } }` przeszło `ValidationPipe`.

**Refaktor:** `company-context.controller.ts`

Teraz: pusta klasa `@Controller('company-context')`.

Zamień na:

```typescript
import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCompanyContextUseCase } from './application/get-company-context.use-case';
import { GetCompletenessUseCase } from './application/get-completeness.use-case';
import { PatchCompanyContextUseCase } from './application/patch-company-context.use-case';
import { PutCompanyContextUseCase } from './application/put-company-context.use-case';
import {
  toCompanyContext,
  toPartialCompanyContext,
} from './application/company-context.mapper';
import {
  PatchCompanyContextDto,
  PutCompanyContextDto,
} from './http/dto/company-context.dto';

@ApiTags('company-context')
@Controller('company-context')
export class CompanyContextController {
  constructor(
    private readonly getContext: GetCompanyContextUseCase,
    private readonly putContext: PutCompanyContextUseCase,
    private readonly patchContext: PatchCompanyContextUseCase,
    private readonly getCompleteness: GetCompletenessUseCase,
  ) {}

  @Get('completeness')
  completeness() {
    return this.getCompleteness.execute();
  }

  @Get()
  @ApiOkResponse({ description: 'Canonical company context + completeness' })
  get() {
    return this.getContext.execute();
  }

  @Put()
  put(@Body() body: PutCompanyContextDto) {
    return this.putContext.execute(toCompanyContext(body));
  }

  @Patch()
  patch(@Body() body: PatchCompanyContextDto) {
    return this.patchContext.execute(toPartialCompanyContext(body));
  }
}
```

Kolejność metod: `completeness` **przed** `@Get()` bez ścieżki — inaczej Nest złapie `completeness` jako parametr. Brak auth guardów w tym wycinku.

**Refaktor:** `company-context.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { GetCompanyContextUseCase } from './application/get-company-context.use-case';
import { GetCompletenessUseCase } from './application/get-completeness.use-case';
import { PatchCompanyContextUseCase } from './application/patch-company-context.use-case';
import { PutCompanyContextUseCase } from './application/put-company-context.use-case';
import { CompanyContextController } from './company-context.controller';
import { COMPANY_CONTEXT_REPOSITORY } from './domain/company-context.query.port';
import { PrismaCompanyContextAdapter } from './infrastructure/prisma-company-context.adapter';

@Module({
  controllers: [CompanyContextController],
  providers: [
    { provide: COMPANY_CONTEXT_REPOSITORY, useClass: PrismaCompanyContextAdapter },
    GetCompanyContextUseCase,
    PutCompanyContextUseCase,
    PatchCompanyContextUseCase,
    GetCompletenessUseCase,
  ],
  exports: [GetCompletenessUseCase, COMPANY_CONTEXT_REPOSITORY],
})
export class CompanyContextModule {}
```

`AppModule` już importuje `CompanyContextModule` (Faza 1).

**E2E** `apps/api/test/company-context.e2e-spec.ts` (szkic obowiązkowy):

- `beforeAll`: `setup-env` + `prisma migrate deploy` na `file:./test.db` + `configureHttpApp`.
- GET completeness na pustej DB → `{ complete: false, missing: [...5 kluczy] }`.
- PUT kompletnego body → GET `completeness.complete === true`.
- PATCH `{ identity: { name: "Nowa" } }` merguje, nie kasuje oferty.
- Odpowiedź **nie** zawiera ścieżki `.md` ani fallbacku plikowego.
- Brak asercji 403 (Faza 5).

**DoD kroku:**

- Unit: niekompletny → `complete: false` + poprawne `missing`; kompletny → `true`, `[]`; `extras` nie blokuje.
- `GET /company-context` i `GET .../completeness` spójne z `isComplete`.
- PUT + PATCH zapisują kolumny per sekcja; jeden wiersz `id=default`.
- Brak odczytu kontekstu z `.md`.

---

### KROK 2 — BC Runs: domain (statusy, retry, log)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Polityka przejść i `isRetryable` niezależne od Nest/Prisma. Major 3.2 (warstwa domain), R-1, R-9 pkt 3.

**Artefakty:**

- nowy: `apps/api/src/shared/exceptions/domain.exception.ts` (przeniesienie klasy z `shared/http/domain.exception.ts`)
- usunięcie: `apps/api/src/shared/http/domain.exception.ts` (stary plik po przeniesieniu)
- refaktor: `apps/api/src/shared/http/http-exception.filter.ts` (import `DomainException` → `../exceptions/domain.exception`)
- refaktor: `apps/api/src/shared/http/http-exception.filter.spec.ts` (j.w.)
- nowy: `apps/api/src/runs/domain/run.types.ts`
- nowy: `apps/api/src/runs/domain/status-transitions.ts`
- nowy: `apps/api/src/runs/domain/status-transitions.spec.ts`
- nowy: `apps/api/src/runs/domain/is-retryable.ts`
- nowy: `apps/api/src/runs/domain/is-retryable.spec.ts`
- nowy: `apps/api/src/runs/domain/run-log.ts`
- nowy: `apps/api/src/runs/domain/run.repository.port.ts`
- nowy: `apps/api/src/runs/domain/run-executor.port.ts`
- nowy: `apps/api/src/runs/domain/run-sse.port.ts`

**Implementacja (kolejność):** refaktor `DomainException` → typy run → statusy → retry → porty.

---

#### Refaktor: `DomainException` → `shared/exceptions/`

Plik `_1` KROK 3 utworzył `DomainException` w `apps/api/src/shared/http/domain.exception.ts`. Warstwa domain (`runs/domain/status-transitions.ts`) importuje tę klasę — tworząc zależność domain → katalog HTTP. Przeniesienie do `shared/exceptions/` eliminuje ten coupling.

**Nowy plik:** `apps/api/src/shared/exceptions/domain.exception.ts`

Treść **identyczna** jak w `_1` KROK 3 (klasa `DomainException` z `code`, `message`, `httpStatus`, `details`). Przenieś plik; **nie** kopiuj — stary `shared/http/domain.exception.ts` usuń.

**Refaktor `_1`:** zaktualizuj importy w plikach powstałych w pliku `_1`:

| Plik | Stary import | Nowy import |
|------|-------------|-------------|
| `shared/http/http-exception.filter.ts` | `from './domain.exception'` | `from '../exceptions/domain.exception'` |
| `shared/http/http-exception.filter.spec.ts` | `from './domain.exception'` | `from '../exceptions/domain.exception'` |

**Weryfikacja:** `pnpm --filter api build` bez błędów; testy z `_1` nadal przechodzą.

---

**Nowy plik:** `apps/api/src/runs/domain/run.types.ts`

```typescript
import type {
  ConversationId,
  RunId,
  RunStatus,
  RunTaskType,
  SocialPlatform,
  ContentLanguage,
  UserId,
} from '@content-chain/shared';

export type RunBrief = {
  topic: string;
  audience?: string;
  goal?: string;
  ideaCount?: number;
};

export type RunRecord = {
  id: RunId;
  conversationId: ConversationId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  status: RunStatus;
  brief: RunBrief;
  selectedIdeaIds: string[] | null;
  startedByUserId: UserId | null;
  recoveryAttempts: number;
  createdAt: Date;
};

export type RunLogLevel = 'info' | 'warn' | 'error';

export type RunLogEntry = {
  runId: RunId;
  conversationId: ConversationId | null;
  at: Date;
  level: RunLogLevel;
  message: string;
  step?: string;
  requestId?: string;
};
```

**Nowy plik:** `apps/api/src/runs/domain/status-transitions.ts`

```typescript
import type { RunStatus } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';

const ALLOWED: Record<RunStatus, readonly RunStatus[]> = {
  queued: ['running'],
  running: ['awaiting_hitl', 'completed', 'failed'],
  awaiting_hitl: ['running'],
  completed: [],
  failed: [],
};

export function assertTransition(from: RunStatus, to: RunStatus): void {
  if (!ALLOWED[from].includes(to)) {
    throw new DomainException(
      'CONFLICT',
      `Illegal run status transition: ${from} → ${to}`,
      409,
      [{ from, to }],
    );
  }
}

export function canTransition(from: RunStatus, to: RunStatus): boolean {
  return ALLOWED[from].includes(to);
}
```

Krawędzie zgodnie z `SPEC-RUNY.md`: `queued → running`; `running → awaiting_hitl | completed | failed`; `awaiting_hitl → running`. **Brak** `completed → running`, **brak** `awaiting_hitl → failed` (recovery zostawia HITL w spokoju; porażka tylko z `running`).

**Nowy plik:** `apps/api/src/runs/domain/status-transitions.spec.ts`

```typescript
import { assertTransition, canTransition } from './status-transitions';
import { DomainException } from '../../shared/exceptions/domain.exception';

describe('assertTransition', () => {
  it('allows queued → running', () => {
    expect(() => assertTransition('queued', 'running')).not.toThrow();
  });

  it('rejects completed → running', () => {
    expect(() => assertTransition('completed', 'running')).toThrow(DomainException);
  });

  it('allows running → awaiting_hitl and running → failed', () => {
    expect(canTransition('running', 'awaiting_hitl')).toBe(true);
    expect(canTransition('running', 'failed')).toBe(true);
  });
});
```

**Nowy plik:** `apps/api/src/runs/domain/is-retryable.ts`

```typescript
export type RetryReason =
  | { kind: 'process_crash' }
  | { kind: 'gateway'; code?: string; retryable: boolean }
  | { kind: 'validation' }
  | { kind: 'refine_exhausted' }
  | { kind: 'config' };

export function isRetryable(reason: RetryReason): boolean {
  switch (reason.kind) {
    case 'process_crash':
      return true;
    case 'gateway':
      return reason.retryable;
    case 'validation':
    case 'refine_exhausted':
    case 'config':
      return false;
  }
}
```

`gateway.retryable` pochodzi z `LlmGatewayError.retryable` (plik `_1`). Stub Fazy 3 nie woła gateway; funkcja musi istnieć pod recovery i pod Fazę 4 (D-7/D-10).

**Nowy plik:** `apps/api/src/runs/domain/is-retryable.spec.ts` — crash/timeout = true; `GATEWAY_KEY_INVALID` / `validation` / `refine_exhausted` = false.

**Nowy plik:** `apps/api/src/runs/domain/run.repository.port.ts`

```typescript
import type { RunId, RunStatus, UserId } from '@content-chain/shared';
import type { RunLogEntry, RunRecord } from './run.types';

export const RUN_REPOSITORY = Symbol('RUN_REPOSITORY');

export const PAGE_SIZE = 10;

export type ListRunsQuery = {
  page: number;
  status?: RunStatus;
  taskType?: RunRecord['taskType'];
  platform?: RunRecord['platform'];
  userId?: UserId;
};

export type RunStartedBy = { id: string; email: string };

export type RunSnapshot = RunRecord & { startedBy: RunStartedBy | null };

export type ListRunsResult = {
  items: RunSnapshot[];
  page: number;
  pageSize: typeof PAGE_SIZE;
  total: number;
};

export interface RunRepository {
  create(run: RunRecord): Promise<void>;
  getById(id: RunId): Promise<RunSnapshot | null>;
  saveStatus(id: RunId, status: RunStatus): Promise<void>;
  saveRecoveryAttempt(id: RunId, attempts: number): Promise<void>;
  claimNextQueued(): Promise<RunRecord | null>;
  findInterruptedRunning(): Promise<RunRecord[]>;
  appendLog(entry: RunLogEntry): Promise<RunLogEntry>;
  listLogs(id: RunId): Promise<RunLogEntry[]>;
  list(query: ListRunsQuery): Promise<ListRunsResult>;
  saveSelectedIdeaIds(id: RunId, selectedIdeaIds: string[]): Promise<void>;
}
```

`claimNextQueued`: atomowo `queued → running` najstarszego `createdAt` (FIFO), tylko gdy wywołujący ma slot. Implementacja w KROK 3 (`updateMany` + odczyt).

**Nowy plik:** `apps/api/src/runs/domain/run-executor.port.ts`

```typescript
import type { RunRecord } from './run.types';

export const RUN_EXECUTOR = Symbol('RUN_EXECUTOR');

export interface RunExecutorPort {
  execute(run: RunRecord): Promise<void>;
}
```

Faza 4 podmieni provider na fasadę Social. W tym wycinku: `StubRunExecutor`.

**Nowy plik:** `apps/api/src/runs/domain/run-sse.port.ts`

```typescript
import type { Observable } from 'rxjs';
import type { RunId, RunStatus } from '@content-chain/shared';
import type { RunLogEntry } from './run.types';

export const RUN_SSE_HUB = Symbol('RUN_SSE_HUB');

export type RunSseEvent =
  | { event: 'run.status'; data: { runId: RunId; status: RunStatus } }
  | { event: 'run.log'; data: RunLogEntry & { runId: RunId } }
  | { event: 'run.hitl'; data: { runId: RunId; options: unknown[] } }
  | { event: 'run.completed'; data: { runId: RunId; resultSummary?: string } }
  | { event: 'run.failed'; data: { runId: RunId; code?: string; message: string } };

export interface RunSseHub {
  subscribe(runId: RunId): Observable<MessageEvent>;
  publish(event: RunSseEvent): void;
}
```

`MessageEvent` — typ DOM/Nest (RxJS nest SSE). W TS Nest: import typu z `@nestjs/common` nie zawsze jest; użyj `{ data: unknown; type?: string }` jeśli kompilator nie zna globalnego `MessageEvent`.

**DoD kroku:**

- Nielegalne przejście rzuca `DomainException` `CONFLICT` (unit).
- `isRetryable` pokrywa crash vs config/validation (unit).
- Porty bez Prisma i bez Nest w plikach `domain/` (poza typem Observable w porcie SSE — dopuszczalne; jeśli chcesz czystszej granicy, `subscribe` może zwracać własny minimalny typ strumienia mapowany w infra).

---

### KROK 3 — BC Runs: persistence, SSE hub, worker, stub, recovery

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Runtime cyklu życia in-process bez Social. Major 3.2 (application/infra), R-2, R-5, R-6, R-9.

**Artefakty:**

- nowy: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`
- nowy: `apps/api/src/runs/infrastructure/run-sse.hub.ts`
- nowy: `apps/api/src/runs/infrastructure/stub-run.executor.ts`
- nowy: `apps/api/src/runs/application/run-lifecycle.service.ts`
- nowy: `apps/api/src/runs/application/in-process-run.worker.ts`
- nowy: `apps/api/src/runs/application/recover-interrupted-runs.use-case.ts`
- nowy: `apps/api/src/runs/application/start-run.use-case.ts` *(HTTP w KROK 4 woła ten use-case — tu pełna logika startu, żeby worker i bramka były gotowe)*
- nowy: `apps/api/src/runs/application/resume-hitl.use-case.ts`
- nowy: `apps/api/src/runs/application/get-run.use-case.ts`
- nowy: `apps/api/src/runs/application/get-run-logs.use-case.ts`
- nowy: `apps/api/src/runs/infrastructure/stub-run.executor.spec.ts`
- nowy: `apps/api/src/runs/application/recover-interrupted-runs.use-case.spec.ts`
- refaktor: `apps/api/src/runs/domain/run.repository.port.ts` (uproszczenie `saveStatus` — bez opcjonalnego `recoveryAttempts`; nowa metoda `saveRecoveryAttempt`)

**Nowy plik:** `apps/api/src/runs/infrastructure/run-sse.hub.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Subject, type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { RunId } from '@content-chain/shared';
import type { RunSseEvent, RunSseHub } from '../domain/run-sse.port';

@Injectable()
export class InMemoryRunSseHub implements RunSseHub {
  private readonly subjects = new Map<string, Subject<RunSseEvent>>();

  subscribe(runId: RunId): Observable<MessageEvent> {
    return this.subjectFor(runId).pipe(
      map((event) => ({ type: event.event, data: event.data }) as MessageEvent),
    );
  }

  publish(event: RunSseEvent): void {
    this.subjectFor(event.data.runId).next(event);
  }

  private subjectFor(runId: RunId): Subject<RunSseEvent> {
    const key = String(runId);
    let subject = this.subjects.get(key);
    if (!subject) {
      subject = new Subject<RunSseEvent>();
      this.subjects.set(key, subject);
    }
    return subject;
  }
}
```

**Nowy plik:** `apps/api/src/runs/application/run-lifecycle.service.ts`

Orkiestruje `assertTransition` + `saveStatus` + `publish(run.status)` oraz `appendLog` + `publish(run.log)`. Jedyna droga zmiany statusu i dopisania logu z application (Social w Fazie 4 też tędy — nie omija SSE).

Szkielet:

```typescript
@Injectable()
export class RunLifecycleService {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_SSE_HUB) private readonly sse: RunSseHub,
  ) {}

  async transition(run: RunRecord, to: RunStatus): Promise<RunRecord> {
    assertTransition(run.status, to);
    await this.runs.saveStatus(run.id, to);
    this.sse.publish({ event: 'run.status', data: { runId: run.id, status: to } });
    if (to === 'completed') {
      this.sse.publish({
        event: 'run.completed',
        data: { runId: run.id, resultSummary: 'stub: no Social pipeline' },
      });
    }
    if (to === 'failed') {
      this.sse.publish({
        event: 'run.failed',
        data: { runId: run.id, message: 'run failed' },
      });
    }
    return { ...run, status: to };
  }

  async appendLog(entry: Omit<RunLogEntry, 'at'> & { at?: Date }): Promise<void> {
    const saved = await this.runs.appendLog({ ...entry, at: entry.at ?? new Date() });
    this.sse.publish({ event: 'run.log', data: { ...saved, runId: saved.runId } });
  }
}
```

Log **append-only**: adapter tylko `prisma.runLog.create` — zero `update`/`delete` na `RunLog`.

**Nowy plik:** `apps/api/src/runs/infrastructure/prisma-run.adapter.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  createConversationId,
  createRunId,
  createUserId,
  isUserId,
  type ContentLanguage,
  type RunStatus,
  type RunTaskType,
  type SocialPlatform,
} from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { assertTransition } from '../domain/status-transitions';
import {
  PAGE_SIZE,
  type ListRunsQuery,
  type ListRunsResult,
  type RunRepository,
  type RunSnapshot,
} from '../domain/run.repository.port';
import type { RunLogEntry, RunRecord } from '../domain/run.types';

type RunRow = {
  id: string;
  conversationId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  brief: unknown;
  selectedIdeaIds: unknown;
  startedByUserId: string | null;
  recoveryAttempts: number;
  createdAt: Date;
  startedBy: { id: string; email: string } | null;
};

@Injectable()
export class PrismaRunAdapter implements RunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(run: RunRecord): Promise<void> {
    await this.prisma.run.create({
      data: {
        id: run.id,
        conversationId: run.conversationId,
        taskType: run.taskType,
        platform: run.platform,
        language: run.language,
        status: run.status,
        brief: run.brief,
        selectedIdeaIds: run.selectedIdeaIds ?? undefined,
        startedByUserId: run.startedByUserId,
        recoveryAttempts: run.recoveryAttempts,
        createdAt: run.createdAt,
      },
    });
  }

  async getById(id: ReturnType<typeof createRunId>): Promise<RunSnapshot | null> {
    const row = await this.prisma.run.findUnique({
      where: { id },
      include: { startedBy: { select: { id: true, email: true } } },
    });
    return row ? this.toSnapshot(row) : null;
  }

  async saveStatus(
    id: ReturnType<typeof createRunId>,
    status: RunStatus,
  ): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { status },
    });
  }

  async claimNextQueued(): Promise<RunRecord | null> {
    const next = await this.prisma.run.findFirst({
      where: { status: 'queued' },
      orderBy: { createdAt: 'asc' },
      include: { startedBy: { select: { id: true, email: true } } },
    });
    if (!next) return null;
    assertTransition(next.status as RunStatus, 'running');
    const claimed = await this.prisma.run.updateMany({
      where: { id: next.id, status: 'queued' },
      data: { status: 'running' },
    });
    if (claimed.count !== 1) {
      return this.claimNextQueued();
    }
    return this.toSnapshot({ ...next, status: 'running' });
  }

  async findInterruptedRunning(): Promise<RunRecord[]> {
    const rows = await this.prisma.run.findMany({
      where: { status: 'running' },
      include: { startedBy: { select: { id: true, email: true } } },
    });
    return rows.map((row) => this.toSnapshot(row));
  }

  async appendLog(entry: RunLogEntry): Promise<RunLogEntry> {
    const saved = await this.prisma.runLog.create({
      data: {
        id: `log_${randomUUID()}`,
        runId: entry.runId,
        conversationId: entry.conversationId,
        at: entry.at,
        level: entry.level,
        message: entry.message,
        step: entry.step,
        requestId: entry.requestId,
      },
    });
    return {
      runId: createRunId(saved.runId),
      conversationId: saved.conversationId
        ? createConversationId(saved.conversationId)
        : null,
      at: saved.at,
      level: saved.level as RunLogEntry['level'],
      message: saved.message,
      step: saved.step ?? undefined,
      requestId: saved.requestId ?? undefined,
    };
  }

  async listLogs(id: ReturnType<typeof createRunId>): Promise<RunLogEntry[]> {
    const rows = await this.prisma.runLog.findMany({
      where: { runId: id },
      orderBy: { at: 'asc' },
    });
    return rows.map((saved) => ({
      runId: createRunId(saved.runId),
      conversationId: saved.conversationId
        ? createConversationId(saved.conversationId)
        : null,
      at: saved.at,
      level: saved.level as RunLogEntry['level'],
      message: saved.message,
      step: saved.step ?? undefined,
      requestId: saved.requestId ?? undefined,
    }));
  }

  async list(query: ListRunsQuery): Promise<ListRunsResult> {
    const page = query.page;
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.taskType ? { taskType: query.taskType } : {}),
      ...(query.platform ? { platform: query.platform } : {}),
      ...(query.userId ? { startedByUserId: query.userId } : {}),
    };
    const [total, rows] = await this.prisma.$transaction([
      this.prisma.run.count({ where }),
      this.prisma.run.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { startedBy: { select: { id: true, email: true } } },
      }),
    ]);
    return {
      items: rows.map((row) => this.toSnapshot(row)),
      page,
      pageSize: PAGE_SIZE,
      total,
    };
  }

  async saveSelectedIdeaIds(
    id: ReturnType<typeof createRunId>,
    selectedIdeaIds: string[],
  ): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { selectedIdeaIds },
    });
  }

  async saveRecoveryAttempt(
    id: ReturnType<typeof createRunId>,
    attempts: number,
  ): Promise<void> {
    await this.prisma.run.update({
      where: { id },
      data: { recoveryAttempts: attempts },
    });
  }

  private toSnapshot(row: RunRow): RunSnapshot {
    return {
      id: createRunId(row.id),
      conversationId: createConversationId(row.conversationId),
      taskType: row.taskType as RunTaskType,
      platform: row.platform as SocialPlatform,
      language: row.language as ContentLanguage,
      status: row.status as RunStatus,
      brief: row.brief as RunRecord['brief'],
      selectedIdeaIds: (row.selectedIdeaIds as string[] | null) ?? null,
      startedByUserId:
        row.startedByUserId && isUserId(row.startedByUserId)
          ? createUserId(row.startedByUserId)
          : null,
      recoveryAttempts: row.recoveryAttempts,
      createdAt: row.createdAt,
      startedBy: row.startedBy,
    };
  }
}
```

Log **append-only**: wyłącznie `runLog.create` — zero `update`/`delete` na `RunLog`. `list()` jest w adapterze od razu (KROK 5 tylko HTTP + use-case).

**Nowy plik:** `apps/api/src/runs/infrastructure/stub-run.executor.ts`

```typescript
import { Injectable } from '@nestjs/common';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRecord } from '../domain/run.types';
import { RunLifecycleService } from '../application/run-lifecycle.service';

@Injectable()
export class StubRunExecutor implements RunExecutorPort {
  constructor(private readonly lifecycle: RunLifecycleService) {}

  async execute(run: RunRecord): Promise<void> {
    await this.lifecycle.appendLog({
      runId: run.id,
      conversationId: run.conversationId,
      level: 'info',
      message: 'pipeline executor: no-op (Social w Fazie 4)',
      step: 'StubRunExecutor',
    });
    await this.lifecycle.transition(run, 'completed');
  }
}
```

**Nie** woła `LlmGatewayPort`. **Nie** zapisuje `SocialIdea` / `SocialContent`. Wiadomość logu **bez** sekretów.

**Nowy plik:** `apps/api/src/runs/application/in-process-run.worker.ts`

```typescript
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ENV, type Env } from '../../shared/config/env';
import { RUN_EXECUTOR, type RunExecutorPort } from '../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';
import { RUN_SSE_HUB, type RunSseHub } from '../domain/run-sse.port';
import type { RunRecord } from '../domain/run.types';
import { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import { RunLifecycleService } from './run-lifecycle.service';

@Injectable()
export class InProcessRunWorker implements OnModuleInit {
  private inflight = 0;

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_EXECUTOR) private readonly executor: RunExecutorPort,
    @Inject(RUN_SSE_HUB) private readonly sse: RunSseHub,
    private readonly recover: RecoverInterruptedRunsUseCase,
    private readonly lifecycle: RunLifecycleService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.recover.execute();
    void this.pump();
  }

  notifyQueued(): void {
    void this.pump();
  }

  private async pump(): Promise<void> {
    while (this.inflight < this.env.MAX_CONCURRENT_RUNS) {
      const claimed = await this.runs.claimNextQueued();
      if (!claimed) return;
      this.inflight += 1;
      void this.executeClaimed(claimed).finally(() => {
        this.inflight -= 1;
        void this.pump();
      });
    }
  }

  notifyHitlResumed(run: RunRecord): void {
    this.inflight += 1;
    void this.executeViaExecutor(run).finally(() => {
      this.inflight -= 1;
      void this.pump();
    });
  }

  private async executeClaimed(run: RunRecord): Promise<void> {
    this.sse.publish({
      event: 'run.status',
      data: { runId: run.id, status: 'running' },
    });
    await this.executeViaExecutor(run);
  }

  private async executeViaExecutor(run: RunRecord): Promise<void> {
    try {
      await this.executor.execute(run);
    } catch {
      await this.lifecycle.appendLog({
        runId: run.id,
        conversationId: run.conversationId,
        level: 'error',
        message: 'run executor failed',
        step: 'InProcessRunWorker',
      });
      const latest = await this.runs.getById(run.id);
      if (latest && latest.status === 'running') {
        await this.lifecycle.transition(latest, 'failed');
      }
    }
  }
}
```

HTTP **nie** `await` całego executora — `notifyQueued()` jest synchronicznym kickiem. `claimNextQueued` tylko DB; worker emituje `run.status=running` po claim.

Jeśli start ma wolny slot: `StartRunUseCase` tworzy `queued`, potem `notifyQueued()` — 202 z `queued | running` (odczyt po create+claim).

`notifyHitlResumed(run)` — publiczna metoda do wznawiania runów po HITL; zarządza licznikiem `inflight` tak samo jak `executeClaimed`, ale **nie** emituje `run.status=running` (zrobiło to już `lifecycle.transition` w `ResumeHitlUseCase`). Dzięki temu wznowiony HITL wlicza się do limitu `MAX_CONCURRENT_RUNS`.

**Nowy plik:** `apps/api/src/runs/application/start-run.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { GetCompletenessUseCase } from '../../company-context/application/get-completeness.use-case';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';
import type { RunBrief, RunRecord } from '../domain/run.types';
import { InProcessRunWorker } from './in-process-run.worker';
import type { ContentLanguage, RunTaskType, SocialPlatform } from '@content-chain/shared';

export type StartRunCommand = {
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: RunBrief;
  selectedIdeaIds?: string[];
};

@Injectable()
export class StartRunUseCase {
  constructor(
    private readonly completeness: GetCompletenessUseCase,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly worker: InProcessRunWorker,
  ) {}

  async execute(command: StartRunCommand): Promise<Pick<RunRecord, 'id' | 'conversationId' | 'status'>> {
    const gate = await this.completeness.execute();
    if (!gate.complete) {
      throw new DomainException(
        'CONTEXT_INCOMPLETE',
        'Company context gate is not satisfied',
        409,
        gate.missing.map((section) => ({ section })),
      );
    }

    const run: RunRecord = {
      id: newRunId(),
      conversationId: newConversationId(),
      taskType: command.taskType,
      platform: command.platform,
      language: command.language,
      status: 'queued',
      brief: command.brief,
      selectedIdeaIds: command.selectedIdeaIds ?? null,
      startedByUserId: null,
      recoveryAttempts: 0,
      createdAt: new Date(),
    };
    await this.runs.create(run);
    this.worker.notifyQueued();
    const fresh = await this.runs.getById(run.id);
    return {
      id: run.id,
      conversationId: run.conversationId,
      status: fresh?.status ?? 'queued',
    };
  }
}
```

Przy `complete === false` **brak** wiersza `Run` i **brak** wywołania LLM.

**Nowy plik:** `apps/api/src/runs/application/resume-hitl.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';
import { RunLifecycleService } from './run-lifecycle.service';
import { InProcessRunWorker } from './in-process-run.worker';

@Injectable()
export class ResumeHitlUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly lifecycle: RunLifecycleService,
    private readonly worker: InProcessRunWorker,
  ) {}

  async execute(runId: RunId, selectedIdeaIds: string[]) {
    const run = await this.runs.getById(runId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    if (run.status !== 'awaiting_hitl') {
      throw new DomainException('HITL_REQUIRED', 'Run is not awaiting HITL', 409);
    }
    await this.runs.saveSelectedIdeaIds(runId, selectedIdeaIds);
    const running = await this.lifecycle.transition(run, 'running');
    this.worker.notifyHitlResumed({ ...running, selectedIdeaIds });
    return { runId, status: 'running' as const };
  }
}
```

HITL wraca do `running` **poza** kolejką `queued` i startuje `execute` od razu przez `worker.notifyHitlResumed`. Wywołanie jest synchroniczne (nie `void`), a worker zarządza `inflight` tak jak przy normalnym claimie — limit `MAX_CONCURRENT_RUNS` jest egzekwowany.

**Nowy plik:** `apps/api/src/runs/application/recover-interrupted-runs.use-case.ts`

```typescript
import { Inject, Injectable, Logger } from '@nestjs/common';
import { isRetryable } from '../domain/is-retryable';
import { RUN_EXECUTOR, type RunExecutorPort } from '../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';
import { RunLifecycleService } from './run-lifecycle.service';

const RECOVERY_CAP = 3;

@Injectable()
export class RecoverInterruptedRunsUseCase {
  private readonly logger = new Logger(RecoverInterruptedRunsUseCase.name);

  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_EXECUTOR) private readonly executor: RunExecutorPort,
    private readonly lifecycle: RunLifecycleService,
  ) {}

  async execute(): Promise<void> {
    const interrupted = await this.runs.findInterruptedRunning();
    for (const run of interrupted) {
      if (!isRetryable({ kind: 'process_crash' }) || run.recoveryAttempts >= RECOVERY_CAP) {
        await this.lifecycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: 'recovery exhausted after process interrupt',
          step: 'recovery',
        });
        await this.lifecycle.transition(run, 'failed');
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      try {
        await this.executor.execute({ ...run, recoveryAttempts: run.recoveryAttempts + 1 });
      } catch {
        await this.lifecycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: 'recovery attempt failed',
          step: 'recovery',
        });
        const latest = await this.runs.getById(run.id);
        if (latest && latest.recoveryAttempts >= RECOVERY_CAP && latest.status === 'running') {
          await this.lifecycle.transition(latest, 'failed');
        }
      }
    }
  }
}
```

Runy `awaiting_hitl` **nie** są w `findInterruptedRunning`. `queued` rusza dopiero w `worker.pump()` po recovery.

Unit recovery: fake repo z jednym `running` + `recoveryAttempts: 3` → `failed` + log; `attempts: 0` + fake executor success → `execute` wywołane.

**Refaktor później w module (KROK 4)** spina providery. Tu trzymaj pliki gotowe.

**DoD kroku:**

- Logi tylko `create`; worker in-process; cap z `ENV.MAX_CONCURRENT_RUNS`.
- Stub kończy `completed` z czytelnym logiem, bez LLM i bez sekretów.
- Wyjątek executora → log + `failed` (run nie zostaje w `running`).
- Recovery: `running` ≤ 3, potem `failed` + log; `awaiting_hitl` nietknięty (unit na fake repo).
- `assertTransition('queued', 'running')` wywoływane w `claimNextQueued` przed `updateMany` — domenowa polityka egzekwowana przy każdej zmianie statusu (R-1).
- `saveRecoveryAttempt` używane w recovery zamiast `saveStatus(..., 'running', ...)` — inkrementacja licznika prób jest wyraźnie oddzielona od zmiany statusu.
- `notifyHitlResumed` zarządza `inflight` tak samo jak normalny claim — wznowienie po HITL wlicza się do limitu `MAX_CONCURRENT_RUNS` (R-6).

---

### KROK 4 — HTTP runów: POST, snapshot, logi, SSE, HITL

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Powierzchnia zgodna z `docs/dokumentacja_komunikacji.md`. Major 3.2 HTTP. K-2, K-3. Auth SSE — Faza 5.

**Artefakty:**

- nowy: `apps/api/src/runs/http/dto/start-run.dto.ts`
- nowy: `apps/api/src/runs/http/dto/hitl.dto.ts`
- nowy: `apps/api/src/runs/http/parse-run-id.pipe.ts`
- refaktor: `apps/api/src/runs/runs.controller.ts`
- refaktor: `apps/api/src/runs/runs.module.ts`
- refaktor: `apps/api/src/runs/runs.controller.spec.ts`
- nowy: `apps/api/test/runs-lifecycle.e2e-spec.ts`

**Nowy plik:** `apps/api/src/runs/http/dto/start-run.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  CONTENT_LANGUAGES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
} from '@content-chain/shared';

export class RunBriefDto {
  @IsString()
  topic!: string;

  @IsOptional()
  @IsString()
  audience?: string;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  ideaCount?: number;
}

export class StartRunDto {
  @ApiProperty({ enum: RUN_TASK_TYPES })
  @IsIn([...RUN_TASK_TYPES])
  taskType!: (typeof RUN_TASK_TYPES)[number];

  @ApiProperty({ enum: SOCIAL_PLATFORMS })
  @IsIn([...SOCIAL_PLATFORMS])
  platform!: (typeof SOCIAL_PLATFORMS)[number];

  @ApiProperty({ enum: CONTENT_LANGUAGES })
  @IsIn([...CONTENT_LANGUAGES])
  language!: (typeof CONTENT_LANGUAGES)[number];

  @ValidateNested()
  @Type(() => RunBriefDto)
  brief!: RunBriefDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedIdeaIds?: string[];
}
```

**Nowy plik:** `apps/api/src/runs/http/dto/hitl.dto.ts`

```typescript
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class HitlDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  selectedIdeaIds!: string[];
}
```

**Nowy plik:** `apps/api/src/runs/http/parse-run-id.pipe.ts`

```typescript
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { createRunId, isRunId } from '@content-chain/shared';

@Injectable()
export class ParseRunIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isRunId(value)) {
      throw new BadRequestException('Invalid runId');
    }
    return createRunId(value);
  }
}
```

`BadRequestException` → filter → `VALIDATION_FAILED`. **Zakaz** `as RunId` w controllerze.

**Refaktor:** `runs.controller.ts`

```typescript
import { Body, Controller, Get, HttpCode, Param, Post, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, startWith } from 'rxjs';
import type { RunId } from '@content-chain/shared';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { StartRunUseCase } from './application/start-run.use-case';
import { RUN_SSE_HUB, type RunSseHub } from './domain/run-sse.port';
import { Inject } from '@nestjs/common';
import { HitlDto } from './http/dto/hitl.dto';
import { StartRunDto } from './http/dto/start-run.dto';
import { ParseRunIdPipe } from './http/parse-run-id.pipe';

@ApiTags('runs')
@Controller('runs')
export class RunsController {
  constructor(
    private readonly startRun: StartRunUseCase,
    private readonly getRun: GetRunUseCase,
    private readonly getLogs: GetRunLogsUseCase,
    private readonly resumeHitl: ResumeHitlUseCase,
    @Inject(RUN_SSE_HUB) private readonly sse: RunSseHub,
  ) {}

  @Post()
  @HttpCode(202)
  async create(@Body() body: StartRunDto) {
    const result = await this.startRun.execute(body);
    return {
      runId: result.id,
      conversationId: result.conversationId,
      status: result.status,
    };
  }

  @Get(':runId/logs')
  logs(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getLogs.execute(runId);
  }

  @Sse(':runId/events')
  async events(@Param('runId', ParseRunIdPipe) runId: RunId): Promise<Observable<MessageEvent>> {
    const snapshot = await this.getRun.execute(runId);
    return this.sse.subscribe(runId).pipe(
      startWith({
        type: 'run.status',
        data: { runId, status: snapshot.status },
      } as MessageEvent),
    );
  }

  @Post(':runId/hitl')
  @HttpCode(202)
  hitl(@Param('runId', ParseRunIdPipe) runId: RunId, @Body() body: HitlDto) {
    return this.resumeHitl.execute(runId, body.selectedIdeaIds);
  }

  @Get(':runId')
  get(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getRun.execute(runId);
  }
}
```

Kolejność ścieżek: `logs` i `events` **przed** gołym `:runId`. Listing `GET /runs` — KROK 5, metoda **bez** parametru, zadeklarowana **nad** `:runId`.

**Nowy plik:** `apps/api/src/runs/application/get-run.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';

@Injectable()
export class GetRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(runId: RunId) {
    const run = await this.runs.getById(runId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedBy,
      result: null,
      hitl: null,
    };
  }
}
```

**Nowy plik:** `apps/api/src/runs/application/get-run-logs.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import type { RunId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.repository.port';

@Injectable()
export class GetRunLogsUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(runId: RunId) {
    const run = await this.runs.getById(runId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    const items = await this.runs.listLogs(runId);
    return {
      items: items.map((entry) => ({
        at: entry.at.toISOString(),
        level: entry.level,
        message: entry.message,
        step: entry.step,
        requestId: entry.requestId,
        conversationId: entry.conversationId,
      })),
    };
  }
}
```

**Refaktor:** `runs.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { InProcessRunWorker } from './application/in-process-run.worker';
import { RecoverInterruptedRunsUseCase } from './application/recover-interrupted-runs.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { RunLifecycleService } from './application/run-lifecycle.service';
import { StartRunUseCase } from './application/start-run.use-case';
import { RUN_EXECUTOR } from './domain/run-executor.port';
import { RUN_REPOSITORY } from './domain/run.repository.port';
import { RUN_SSE_HUB } from './domain/run-sse.port';
import { PrismaRunAdapter } from './infrastructure/prisma-run.adapter';
import { InMemoryRunSseHub } from './infrastructure/run-sse.hub';
import { StubRunExecutor } from './infrastructure/stub-run.executor';
import { RunsController } from './runs.controller';

@Module({
  imports: [CompanyContextModule],
  controllers: [RunsController],
  providers: [
    { provide: RUN_REPOSITORY, useClass: PrismaRunAdapter },
    { provide: RUN_SSE_HUB, useClass: InMemoryRunSseHub },
    { provide: RUN_EXECUTOR, useClass: StubRunExecutor },
    RunLifecycleService,
    RecoverInterruptedRunsUseCase,
    InProcessRunWorker,
    StartRunUseCase,
    ResumeHitlUseCase,
    GetRunUseCase,
    GetRunLogsUseCase,
  ],
  exports: [RUN_REPOSITORY, RUN_SSE_HUB, RunLifecycleService],
})
export class RunsModule {}
```

Faza 4: `{ provide: RUN_EXECUTOR, useClass: SocialRunExecutor }` w module Social albo override — **nie** w tym pliku.

**E2E** `apps/api/test/runs-lifecycle.e2e-spec.ts`:

1. POST `/runs` bez kompletnego kontekstu → **409** `CONTEXT_INCOMPLETE`, `details` z `section`; brak wiersza run (albo count 0).
2. PUT kompletnego kontekstu → POST `/runs` body `{ taskType: "post_ideas", platform: "linkedin", language: "pl", brief: { topic: "Q3" } }` → **202** z `runId`, `conversationId`, `status` `queued|running`.
3. Poll GET snapshot **nie** jest kanałem live w produkcie; w teście wolno poczekać aż `status === completed` (stub szybki) **albo** czytać SSE.
4. GET logs zawiera wpis `StubRunExecutor`; brak `GATEWAY_KEY`.
5. SSE: `request.get('/api/v1/runs/:id/events').set('Accept', 'text/event-stream')` — przynajmniej zdarzenie `run.status` (supertest + bufor; jeśli flakowe, asercja na hub unit + e2e tylko snapshot).
6. POST HITL na `completed` → **409** `HITL_REQUIRED`.
7. HTTP POST wraca zanim minie „długi” czas — stub jest krótki; dodatkowo unit: `StartRunUseCase` nie `await executor.execute`.

Kolejka (D-9): e2e z `overrideProvider(RUN_EXECUTOR)` na fake, który wstrzymuje Promise. `MAX_CONCURRENT_RUNS=1`. Dwa POST: pierwszy `running`, drugi zostaje `queued` aż fake resolve. Opisz fake w teście (nie w produkcji).

**DoD kroku:**

- POST 202 bez czekania na LLM; bramka 409 bez runu.
- GET snapshot + logs; SSE `@Sse()`; HITL 409 poza `awaiting_hitl`.
- Brak tokenu w query; brak Bearer (nie dodawać).
- `ResumeHitlUseCase` deleguje wykonanie przez `InProcessRunWorker.notifyHitlResumed` — brak bezpośredniego wywołania `executor.execute` poza workerem.

---

### KROK 5 — Lista runów instancji (`GET /api/v1/runs`)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Listing pod dashboard. Major 3.3, R-3a, K-2a.

**Artefakty:**

- nowy: `apps/api/src/runs/http/dto/list-runs-query.dto.ts`
- nowy: `apps/api/src/runs/application/list-runs.use-case.ts`
- refaktor: `apps/api/src/runs/runs.controller.ts` (dodaj `@Get()` list **nad** `:runId`)
- refaktor: `apps/api/src/runs/infrastructure/prisma-run.adapter.ts` (`list`)
- nowy: `apps/api/test/runs-list.e2e-spec.ts`

**Nowy plik:** `apps/api/src/runs/http/dto/list-runs-query.dto.ts`

```typescript
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  RUN_STATUSES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
} from '@content-chain/shared';

export class ListRunsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsIn([...RUN_STATUSES])
  status?: (typeof RUN_STATUSES)[number];

  @IsOptional()
  @IsIn([...RUN_TASK_TYPES])
  taskType?: (typeof RUN_TASK_TYPES)[number];

  @IsOptional()
  @IsIn([...SOCIAL_PLATFORMS])
  platform?: (typeof SOCIAL_PLATFORMS)[number];

  @IsOptional()
  @IsString()
  userId?: string;
}
```

**Nie** dodawaj `pageSize` / `limit` do DTO (`forbidNonWhitelisted` → 400 gdy klient spróbuje nadpisać).

**Nowy plik:** `apps/api/src/runs/application/list-runs.use-case.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { PAGE_SIZE, RUN_REPOSITORY, type ListRunsQuery, type RunRepository } from '../domain/run.repository.port';

@Injectable()
export class ListRunsUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async execute(query: ListRunsQuery) {
    const result = await this.runs.list(query);
    return {
      items: result.items.map((item) => ({
        runId: item.id,
        taskType: item.taskType,
        platform: item.platform,
        language: item.language,
        status: item.status,
        createdAt: item.createdAt.toISOString(),
        startedBy: item.startedBy,
      })),
      page: result.page,
      pageSize: PAGE_SIZE,
      total: result.total,
    };
  }
}
```

**Refaktor:** `runs.module.ts` — dodaj `ListRunsUseCase` do `providers` (import z `./application/list-runs.use-case`). **Refaktor:** `runs.controller.ts` — importy: `Query`, `BadRequestException` z `@nestjs/common`; `createUserId`, `isUserId` z `@content-chain/shared`; `type ListRunsQuery` z `./domain/run.repository.port`; dopisz `private readonly listRuns: ListRunsUseCase` w konstruktorze; metoda list **nad** `:runId`:

```typescript
  @Get()
  list(@Query() query: ListRunsQueryDto): Promise<unknown> {
    if (query.userId && !isUserId(query.userId)) {
      throw new BadRequestException('Invalid userId format');
    }
    const command: ListRunsQuery = {
      page: query.page ?? 1,
      status: query.status,
      taskType: query.taskType,
      platform: query.platform,
      userId: query.userId ? createUserId(query.userId) : undefined,
    };
    return this.listRuns.execute(command);
  }
```

Mapowanie `ListRunsQueryDto → ListRunsQuery` w kontrolerze zachowuje czystość granic: `ListRunsUseCase` pracuje wyłącznie na typach domenowych; walidacja formatu `userId` (brandowany string) leży na granicy HTTP.

**E2E:** utwórz >10 runów (kompletny kontekst + stub); `page=1` → 10 itemów, `total >= 11`, `pageSize === 10`; najnowszy pierwszy; filtr `status=completed`; `startedBy === null`.

**DoD kroku:**

- Cała instancja, sort `createdAt` desc, strona 10, filtry status/taskType/platform/userId, `startedBy` nullable.
- Snapshot `GET :runId` spójny meta z wierszem listy (`createdAt`, `startedBy`).
- `ListRunsUseCase.execute` przyjmuje `ListRunsQuery` (typy domenowe); mapowanie `ListRunsQueryDto → ListRunsQuery` oraz walidacja formatu `userId` w kontrolerze.

---

## Weryfikacja wycinka (ten plik)

- [ ] `isComplete` unit + HTTP kontekstu PUT/PATCH/GET/completeness.
- [ ] `POST /runs` przy niekompletności → 409 `CONTEXT_INCOMPLETE` bez przebiegu LLM / bez (lub bez trwałego) runu.
- [ ] Cykl stub: 202 → logi append-only → `completed`; SSE `run.status` / `run.log` / `run.completed`.
- [ ] HITL poza `awaiting_hitl` → 409; recovery `running` cap 3; kolejka globalna default 3.
- [ ] `GET /runs` paginacja 10 + filtry.
- [ ] Brak Social graph, brak authz, brak sekretów w logach.
- [ ] `assertTransition` wywoływane przed `queued→running` w `claimNextQueued` (R-1).
- [ ] Wznowienie HITL wlicza się do `MAX_CONCURRENT_RUNS` — `notifyHitlResumed` zarządza `inflight` (R-6).
- [ ] `ListRunsUseCase` nie zależy od HTTP DTO; mapowanie w kontrolerze (SPEC-KOMUNIKACJA architektura warstw).
- [ ] Nagłówki wyłącznie `FAZA 2` / `KROK 1`…`KROK 5`.
- [ ] Statusy `NIE_ROZPOCZĘTY`; major nietknięty.

Przypadki SPEC-TESTY w **tym** wycinku: D-1, D-9, D-10 (fake executor). D-2/D-3 → Faza 5. D-4…D-8 → Faza 4.

---

## Ślad do major (informacyjnie, po późniejszej implementacji)

Ten skill **nie** zmienia major. Po implementacji **tego** pliku:

| Element major | Oczekiwany status |
|---------------|-------------------|
| Faza 3 | `WYKONANY` |
| Kroki 3.1, 3.2, 3.3 | `WYKONANY` |
| MILESTONE 3 | `OSIĄGNIĘTY` (po akceptacji DoD milestone) |

MILESTONE 2 należy do pliku `_1` (po implementacji Fazy 2). Faza 4+ poza zestawem.
