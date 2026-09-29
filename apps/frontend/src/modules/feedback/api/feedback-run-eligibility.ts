import type { UserRunItem } from '@/modules/runs/api/runs.types';
import { isReviewableRunStatus } from '@/modules/runs/api/runs.types';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import { runResultHasArtifacts } from '@/modules/runs/api/runs-result.types';

export async function filterFeedbackRunOptions(
  items: readonly UserRunItem[],
): Promise<readonly UserRunItem[]> {
  const reviewable = items.filter((item) => isReviewableRunStatus(item.status));
  const cancelled = items.filter((item) => item.status === 'cancelled');
  const withResult: UserRunItem[] = [];
  await Promise.all(
    cancelled.map(async (item) => {
      try {
        const snapshot = await fetchRunSnapshot(item.runId);
        if (runResultHasArtifacts(snapshot.result)) {
          withResult.push(item);
        }
      } catch {
        /* pomiń — API i tak odrzuci przy submit */
      }
    }),
  );
  return [...reviewable, ...withResult];
}
