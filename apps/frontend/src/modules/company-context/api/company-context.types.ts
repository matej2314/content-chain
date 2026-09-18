import { isRecord, type ApiErrorEnvelope } from '@/shared/api/envelope';

export const GATE_SECTIONS = ['identity', 'offer', 'voice', 'cta', 'audience'] as const;

export type GateSection = (typeof GATE_SECTIONS)[number];

export const GATE_SECTION_LABELS = {
  identity: 'Tożsamość',
  offer: 'Oferta',
  voice: 'Głos SM',
  cta: 'CTA / kanały',
  audience: 'Odbiorca',
} as const satisfies Record<GateSection, string>;

export function isGateSection(value: string): value is GateSection {
  return (GATE_SECTIONS as readonly string[]).includes(value);
}

export const CONTEXT_TABS = [...GATE_SECTIONS, 'extras'] as const;

export type ContextTab = (typeof CONTEXT_TABS)[number];

export const DEFAULT_CONTEXT_TAB: ContextTab = 'identity';

export const CONTEXT_TAB_LABELS = {
  ...GATE_SECTION_LABELS,
  extras: 'Dodatki',
} as const satisfies Record<ContextTab, string>;

export function isContextTab(value: string): value is ContextTab {
  return (CONTEXT_TABS as readonly string[]).includes(value);
}

/** `null` = zakładka poza bramką (Dodatki). `true` = klucz jest w `missing`. */
export function gateTabIsMissing(tab: ContextTab, missing: readonly GateSection[]): boolean | null {
  if (tab === 'extras') return null;
  return missing.includes(tab);
}

export type OfferItem = {
  readonly name: string;
  readonly benefit: readonly string[];
  readonly description: string;
};

export type CtaItem = {
  readonly label: string;
  readonly target?: string;
};

export type AudienceProfile = {
  readonly description: string;
};

export type CompanyContextCaseStudy = {
  readonly title: string;
  readonly summary: string;
  readonly metrics?: readonly string[];
};

export type CompanyContextObjection = {
  readonly label: string;
  readonly response: string;
};

export type CompanyContextExtras = {
  readonly caseStudies?: readonly CompanyContextCaseStudy[];
  readonly objections?: readonly CompanyContextObjection[];
  readonly hashtags?: readonly string[];
  readonly catalogNotes?: string;
  readonly performanceNotes?: string;
};

export type CompanyContext = {
  readonly identity: { readonly name: string; readonly description: string };
  readonly offer: { readonly items: readonly OfferItem[] };
  readonly voice: { readonly weDo: string; readonly weDont: string };
  readonly cta: { readonly items: readonly CtaItem[] };
  readonly audience: { readonly profiles: readonly AudienceProfile[] };
  readonly extras: CompanyContextExtras | null;
};

export type Completeness = {
  readonly complete: boolean;
  readonly missing: readonly GateSection[];
};

export type CompanyContextPayload = CompanyContext & {
  readonly completeness: Completeness;
};

export type CompletenessState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly envelope: ApiErrorEnvelope }
  | { readonly status: 'ready'; readonly completeness: Completeness };

function parseStringArray(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`Invalid ${label}`);
  }
  return value;
}

function parseOfferItem(value: unknown): OfferItem {
  if (!isRecord(value) || typeof value.name !== 'string' || typeof value.description !== 'string') {
    throw new Error('Invalid offer item');
  }
  return {
    name: value.name,
    description: value.description,
    benefit: parseStringArray(value.benefit, 'offer.benefit'),
  };
}

function parseCtaItem(value: unknown): CtaItem {
  if (!isRecord(value) || typeof value.label !== 'string') {
    throw new Error('Invalid CTA item');
  }
  if (value.target !== undefined && typeof value.target !== 'string') {
    throw new Error('Invalid CTA target');
  }
  return value.target === undefined
    ? { label: value.label }
    : { label: value.label, target: value.target };
}

function parseAudienceProfile(value: unknown): AudienceProfile {
  if (!isRecord(value) || typeof value.description !== 'string') {
    throw new Error('Invalid audience profile');
  }
  return { description: value.description };
}

function parseCaseStudy(value: unknown): CompanyContextCaseStudy {
  if (!isRecord(value) || typeof value.title !== 'string' || typeof value.summary !== 'string') {
    throw new Error('Invalid case study');
  }
  if (value.metrics === undefined) {
    return { title: value.title, summary: value.summary };
  }
  return {
    title: value.title,
    summary: value.summary,
    metrics: parseStringArray(value.metrics, 'caseStudy.metrics'),
  };
}

function parseObjection(value: unknown): CompanyContextObjection {
  if (!isRecord(value) || typeof value.label !== 'string' || typeof value.response !== 'string') {
    throw new Error('Invalid objection');
  }
  return { label: value.label, response: value.response };
}

const EXTRAS_KEYS = [
  'caseStudies',
  'objections',
  'hashtags',
  'catalogNotes',
  'performanceNotes',
] as const;

function parseExtras(value: unknown): CompanyContextExtras | null {
  if (value === null) return null;
  if (!isRecord(value)) {
    throw new Error('Invalid extras');
  }
  for (const key of Object.keys(value)) {
    if (!(EXTRAS_KEYS as readonly string[]).includes(key)) {
      throw new Error('Invalid extras');
    }
  }
  const extras: {
    caseStudies?: readonly CompanyContextCaseStudy[];
    objections?: readonly CompanyContextObjection[];
    hashtags?: readonly string[];
    catalogNotes?: string;
    performanceNotes?: string;
  } = {};
  if (value.caseStudies !== undefined) {
    if (!Array.isArray(value.caseStudies)) throw new Error('Invalid extras.caseStudies');
    extras.caseStudies = value.caseStudies.map(parseCaseStudy);
  }
  if (value.objections !== undefined) {
    if (!Array.isArray(value.objections)) throw new Error('Invalid extras.objections');
    extras.objections = value.objections.map(parseObjection);
  }
  if (value.hashtags !== undefined) {
    extras.hashtags = parseStringArray(value.hashtags, 'extras.hashtags');
  }
  if (value.catalogNotes !== undefined) {
    if (typeof value.catalogNotes !== 'string') throw new Error('Invalid extras.catalogNotes');
    extras.catalogNotes = value.catalogNotes;
  }
  if (value.performanceNotes !== undefined) {
    if (typeof value.performanceNotes !== 'string') {
      throw new Error('Invalid extras.performanceNotes');
    }
    extras.performanceNotes = value.performanceNotes;
  }
  return extras;
}

export function parseCompleteness(value: unknown): Completeness {
  if (!isRecord(value) || typeof value.complete !== 'boolean' || !Array.isArray(value.missing)) {
    throw new Error('Invalid completeness payload');
  }
  const missing: GateSection[] = [];
  for (const item of value.missing) {
    if (typeof item !== 'string' || !isGateSection(item)) {
      throw new Error('Invalid completeness.missing');
    }
    missing.push(item);
  }
  return { complete: value.complete, missing };
}

export function parseCompanyContext(value: unknown): CompanyContext {
  if (
    !isRecord(value) ||
    !isRecord(value.identity) ||
    typeof value.identity.name !== 'string' ||
    typeof value.identity.description !== 'string' ||
    !isRecord(value.offer) ||
    !Array.isArray(value.offer.items) ||
    !isRecord(value.voice) ||
    typeof value.voice.weDo !== 'string' ||
    typeof value.voice.weDont !== 'string' ||
    !isRecord(value.cta) ||
    !Array.isArray(value.cta.items) ||
    !isRecord(value.audience) ||
    !Array.isArray(value.audience.profiles)
  ) {
    throw new Error('Invalid company context payload');
  }
  return {
    identity: { name: value.identity.name, description: value.identity.description },
    offer: { items: value.offer.items.map(parseOfferItem) },
    voice: { weDo: value.voice.weDo, weDont: value.voice.weDont },
    cta: { items: value.cta.items.map(parseCtaItem) },
    audience: { profiles: value.audience.profiles.map(parseAudienceProfile) },
    extras: parseExtras(value.extras),
  };
}

export function parseCompanyContextPayload(value: unknown): CompanyContextPayload {
  const context = parseCompanyContext(value);
  if (!isRecord(value)) {
    throw new Error('Invalid company context payload');
  }
  return { ...context, completeness: parseCompleteness(value.completeness) };
}

export function emptyCompanyContext(): CompanyContext {
  return {
    identity: { name: '', description: '' },
    offer: { items: [] },
    voice: { weDo: '', weDont: '' },
    cta: { items: [] },
    audience: { profiles: [] },
    extras: null,
  };
}

function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Payload PUT: puste extras → `null` (SPEC C-8). Nie jest bramką startu. */
export function extrasForPut(extras: CompanyContextExtras | null): CompanyContextExtras | null {
  if (extras === null) return null;
  const caseStudies = extras.caseStudies
    ?.map((item) => ({
      title: item.title.trim(),
      summary: item.summary.trim(),
      metrics: item.metrics?.map((metric) => metric.trim()).filter(nonEmpty),
    }))
    .filter((item) => nonEmpty(item.title) && nonEmpty(item.summary))
    .map((item) =>
      item.metrics && item.metrics.length > 0 ? item : { title: item.title, summary: item.summary },
    );
  const objections = extras.objections
    ?.map((item) => ({ label: item.label.trim(), response: item.response.trim() }))
    .filter((item) => nonEmpty(item.label) && nonEmpty(item.response));
  const hashtags = extras.hashtags?.map((tag) => tag.trim()).filter(nonEmpty);
  const catalogNotes = extras.catalogNotes?.trim();
  const performanceNotes = extras.performanceNotes?.trim();
  const next: {
    caseStudies?: CompanyContextCaseStudy[];
    objections?: CompanyContextObjection[];
    hashtags?: string[];
    catalogNotes?: string;
    performanceNotes?: string;
  } = {};
  if (caseStudies && caseStudies.length > 0) next.caseStudies = caseStudies;
  if (objections && objections.length > 0) next.objections = objections;
  if (hashtags && hashtags.length > 0) next.hashtags = hashtags;
  if (catalogNotes) next.catalogNotes = catalogNotes;
  if (performanceNotes) next.performanceNotes = performanceNotes;
  return Object.keys(next).length === 0 ? null : next;
}

export function companyContextForPut(context: CompanyContext): CompanyContext {
  return {
    identity: {
      name: context.identity.name,
      description: context.identity.description,
    },
    offer: {
      items: context.offer.items
        .filter(
          (item) =>
            nonEmpty(item.name) || nonEmpty(item.description) || item.benefit.some(nonEmpty),
        )
        .map((item) => ({
          name: item.name,
          description: item.description,
          benefit: [...item.benefit],
        })),
    },
    voice: { weDo: context.voice.weDo, weDont: context.voice.weDont },
    cta: {
      items: context.cta.items.map((item) => {
        const target = item.target?.trim();
        return target ? { label: item.label, target } : { label: item.label };
      }),
    },
    audience: {
      profiles: context.audience.profiles.map((profile) => ({
        description: profile.description,
      })),
    },
    extras: extrasForPut(context.extras),
  };
}

export function withDraftRows(context: CompanyContext): CompanyContext {
  return {
    ...context,
    offer: {
      items:
        context.offer.items.length > 0
          ? context.offer.items
          : [{ name: '', benefit: [], description: '' }],
    },
    cta: {
      items: context.cta.items.length > 0 ? context.cta.items : [{ label: '' }],
    },
    audience: {
      profiles:
        context.audience.profiles.length > 0 ? context.audience.profiles : [{ description: '' }],
    },
  };
}
