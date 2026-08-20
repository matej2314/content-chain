import type { CompanyContextRepository } from '../../../../company-context/domain/company-context.port';
import type { SocialGraphState } from '../state';

export function createLoadContextNode(context: CompanyContextRepository) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const company = await context.get();
    return { company };
  };
}
