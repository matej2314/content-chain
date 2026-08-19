export const MAX_REFINE = 2;

export function canRefine(attempts: number): boolean {
  return attempts < MAX_REFINE;
}

export function nextRefineCount(attempts: number): number {
  if (!canRefine(attempts)) {
    throw new Error('REFINE_EXHAUSTED');
  }
  return attempts + 1;
}
