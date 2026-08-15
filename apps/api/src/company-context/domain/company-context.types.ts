import type { GateSection } from './company-context.constants';

export type OfferItem = {
  name: string;
  benefit: string[];
  description: string;
};

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
