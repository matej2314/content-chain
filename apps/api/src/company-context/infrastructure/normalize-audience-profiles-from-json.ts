import type { AudienceProfile } from '../domain/company-context.types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readStringField(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Coerce persisted JSON (possibly legacy `{ description }` only) into domain
 * `AudienceProfile[]`. Missing / non-string fields become `''`; non-objects skipped.
 */
export function normalizeAudienceProfilesFromJson(
  value: unknown,
): AudienceProfile[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const profiles: AudienceProfile[] = [];
  for (const item of value) {
    if (!isPlainObject(item)) {
      continue;
    }
    profiles.push({
      name: readStringField(item.name),
      description: readStringField(item.description),
    });
  }
  return profiles;
}
