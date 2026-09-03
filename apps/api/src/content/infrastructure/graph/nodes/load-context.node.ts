import type { CompanyContextRepository } from '../../../../company-context/domain/company-context.port';
import type { ContentGraphState } from '../state';

export function createLoadContextNode(context: CompanyContextRepository) {
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const company = await context.get();
    return { company };
  };
}
