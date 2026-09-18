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

export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
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
