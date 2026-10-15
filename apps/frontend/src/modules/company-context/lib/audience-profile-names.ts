import type { AudienceProfile } from '../api/company-context.types';

export function normalizeAudienceProfileName(value: string): string {
  return value.trim().toLowerCase();
}

export function areAudienceProfileNamesUnique(profiles: readonly AudienceProfile[]): boolean {
  const seen = new Set<string>();
  for (const profile of profiles) {
    const key = normalizeAudienceProfileName(profile.name);
    if (key.length === 0) continue;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}

export function isDuplicateAudienceProfileName(
  profiles: readonly AudienceProfile[],
  index: number,
): boolean {
  const current = profiles[index];
  if (current === undefined) return false;
  const key = normalizeAudienceProfileName(current.name);
  if (key.length === 0) return false;
  return profiles.some(
    (profile, profileIndex) =>
      profileIndex !== index && normalizeAudienceProfileName(profile.name) === key,
  );
}
