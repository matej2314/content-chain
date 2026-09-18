import {
  GATE_SECTIONS,
  type AudienceProfile,
  type CompanyContext,
  type Completeness,
  type CtaItem,
  type OfferItem,
} from '@/modules/company-context/api/company-context.types';

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

export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.description);
}

/** W pełni pusty wiersz UI — nie jest usługą; strip przed PUT. */
export function isEmptyOfferPlaceholder(item: OfferItem): boolean {
  return !nonEmpty(item.name) && !nonEmpty(item.description) && !item.benefit.some(nonEmpty);
}

/** Częściowo wypełniona pozycja — zostaje w drafcie i w body; submit ma paść. */
export function isCrippledOfferItem(item: OfferItem): boolean {
  return !isEmptyOfferPlaceholder(item) && !isCompleteOfferItem(item);
}

const sectionFilled: Record<(typeof GATE_SECTIONS)[number], (context: CompanyContext) => boolean> =
  {
    identity: ({ identity }) => nonEmpty(identity.name) && nonEmpty(identity.description),
    offer: ({ offer }) => offer.items.length >= 1 && offer.items.every(isCompleteOfferItem),
    voice: ({ voice }) => nonEmpty(voice.weDo) && nonEmpty(voice.weDont),
    cta: ({ cta }) => cta.items.length >= 1 && cta.items.every(isCompleteCtaItem),
    audience: ({ audience }) =>
      audience.profiles.length >= 1 && audience.profiles.every(isCompleteAudienceProfile),
  };

/**
 * Kopia C-1. Wyłącznie disable CTA zapisu, strażnik submitu i błędy pól oferty.
 * Nie wołać do kropek zakładek ani chipa (źródło = `completeness` z GET/PUT).
 */
export function isComplete(context: CompanyContext): Completeness {
  const missing = GATE_SECTIONS.filter((section) => !sectionFilled[section](context));
  return { complete: missing.length === 0, missing };
}

export function canRemoveOfferItem(items: readonly OfferItem[], index: number): boolean {
  const item = items[index];
  if (item === undefined) return false;
  const completeCount = items.filter(isCompleteOfferItem).length;
  return !(completeCount === 1 && isCompleteOfferItem(item));
}

export type OfferItemFieldErrors = {
  readonly name: string | null;
  readonly description: string | null;
  readonly benefit: string | null;
};

export function offerItemFieldErrors(item: OfferItem): OfferItemFieldErrors {
  if (!isCrippledOfferItem(item)) {
    return { name: null, description: null, benefit: null };
  }
  return {
    name: nonEmpty(item.name) ? null : 'Podaj nazwę usługi.',
    description: nonEmpty(item.description) ? null : 'Podaj opis usługi.',
    benefit:
      item.benefit.length >= 1 && item.benefit.every(nonEmpty)
        ? null
        : 'Podaj co najmniej jedną korzyść.',
  };
}
