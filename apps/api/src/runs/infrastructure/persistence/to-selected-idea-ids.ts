export function toSelectedIdeaIds(value: unknown): string[] | null {
  if (value == null) return null;
  if (
    !Array.isArray(value) ||
    !value.every((item): item is string => typeof item === 'string')
  ) {
    throw new Error('Run.selectedIdeaIds is not a string array');
  }
  return value;
}
