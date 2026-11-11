import type { CompanyContext } from './company-context.types';

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
