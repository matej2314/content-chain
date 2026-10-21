export const AUDIENCE_GROUP_NONE_VALUE = '__none__' as const;
export const AUDIENCE_GROUP_CUSTOM_VALUE = '__custom__' as const;

export type AudienceGroupMode =
  | { readonly kind: 'none' }
  | { readonly kind: 'catalog'; readonly name: string }
  | { readonly kind: 'custom'; readonly description: string };

export function emptyAudienceGroup(): AudienceGroupMode {
  return { kind: 'none' };
}

export function audienceGroupToBriefAudience(mode: AudienceGroupMode): string | undefined {
  switch (mode.kind) {
    case 'none':
      return undefined;
    case 'catalog': {
      const name = mode.name.trim();
      return name.length > 0 ? name : undefined;
    }
    case 'custom': {
      const description = mode.description.trim();
      return description.length > 0 ? description : undefined;
    }
  }
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Prefill / resolve: match katalogu tylko gdy string (trim, CI) = `name` profilu.
 * Inaczej custom - bez „udawanego” matcha przy typowaniu użytkownika w trybie Wpisz…
 */
export function resolveAudienceGroupMode(
  briefAudience: string | undefined,
  profileNames: readonly string[],
): AudienceGroupMode {
  if (briefAudience === undefined || briefAudience.trim().length === 0) {
    return { kind: 'none' };
  }
  const trimmed = briefAudience.trim();
  const key = normalizeName(trimmed);
  const catalogName = profileNames.find((name) => normalizeName(name) === key);
  if (catalogName !== undefined) {
    return { kind: 'catalog', name: catalogName };
  }
  return { kind: 'custom', description: trimmed };
}

export function audienceGroupSelectValue(mode: AudienceGroupMode): string {
  switch (mode.kind) {
    case 'none':
      return AUDIENCE_GROUP_NONE_VALUE;
    case 'catalog':
      return mode.name;
    case 'custom':
      return AUDIENCE_GROUP_CUSTOM_VALUE;
  }
}

export function audienceGroupFromSelectValue(
  value: string,
  previous: AudienceGroupMode,
  profileNames: readonly string[],
): AudienceGroupMode {
  if (value === AUDIENCE_GROUP_NONE_VALUE) {
    return { kind: 'none' };
  }
  if (value === AUDIENCE_GROUP_CUSTOM_VALUE) {
    const description =
      previous.kind === 'custom'
        ? previous.description
        : previous.kind === 'catalog'
          ? previous.name
          : '';
    return { kind: 'custom', description };
  }
  if (profileNames.some((name) => name === value)) {
    return { kind: 'catalog', name: value };
  }
  return { kind: 'none' };
}
