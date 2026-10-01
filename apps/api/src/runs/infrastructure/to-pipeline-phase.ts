import type { RunRecord } from '../domain/run.types';

export function toPipelinePhase(
  value: string | null,
): RunRecord['pipelinePhase'] {
  if (
    value === 'ideas' ||
    value === 'content' ||
    value === 'outline' ||
    value === 'copy'
  ) {
    return value;
  }
  return null;
}
