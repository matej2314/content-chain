import { DomainException } from '@content-chain/runs-kernel';
import { normalizeAudienceName } from '@content-chain/run-pipelines';
import type { CompanyContext } from '@content-chain/run-pipelines';

export function assertAudienceProfileNamesUnique(
  context: CompanyContext,
): void {
  const seen = new Set<string>();
  for (const profile of context.audience.profiles) {
    const key = normalizeAudienceName(profile.name);
    if (key.length === 0) {
      continue;
    }
    if (seen.has(key)) {
      throw new DomainException(
        'VALIDATION_FAILED',
        'Audience profile names must be unique',
        400,
        [{ path: 'audience.profiles' }],
      );
    }
    seen.add(key);
  }
}
