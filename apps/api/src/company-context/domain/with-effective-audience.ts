import { normalizeAudienceName } from './normalize-audience-name';
import type { CompanyContext } from './company-context.types';

export function withEffectiveAudience(
  context: CompanyContext,
  briefAudience: string | undefined,
): CompanyContext {
  if (briefAudience === undefined) {
    return { ...context, audience: { profiles: [] } };
  }

  const needle = normalizeAudienceName(briefAudience);
  if (needle.length === 0) {
    return { ...context, audience: { profiles: [] } };
  }
  const match = context.audience.profiles.find(
    (profile) => normalizeAudienceName(profile.name) === needle,
  );

  if (match !== undefined) {
    return { ...context, audience: { profiles: [match] } };
  }
  return { ...context, audience: { profiles: [] } };
}
