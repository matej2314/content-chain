import type { CompanyContext, Completeness } from './company-context.types';
import { GATE_SECTIONS, type GateSection } from './company-context.constants';

const nonEmpty = (value: string): boolean => value.trim().length > 0;

const sectionFilled: Record<GateSection, (context: CompanyContext) => boolean> =
  {
    identity: ({ identity }) =>
      nonEmpty(identity.name) && nonEmpty(identity.description),
    offer: ({ offer }) =>
      offer.items.some(
        (item) => nonEmpty(item.name) && item.benefit.some(nonEmpty),
      ),
    voice: ({ voice }) => nonEmpty(voice.weDo) && nonEmpty(voice.weDont),
    cta: ({ cta }) => cta.items.some((item) => nonEmpty(item.label)),
    audience: ({ audience }) =>
      audience.profiles.some((profile) => nonEmpty(profile.description)),
  };

export function isComplete(context: CompanyContext): Completeness {
  const missing = GATE_SECTIONS.filter(
    (section) => !sectionFilled[section](context),
  );
  return { complete: missing.length === 0, missing };
}
