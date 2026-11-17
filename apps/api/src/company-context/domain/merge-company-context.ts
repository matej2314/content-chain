import type { PartialCompanyContext } from '@content-chain/run-pipelines';
import type { CompanyContext } from '@content-chain/run-pipelines';

export function mergeCompanyContext(
  current: CompanyContext,
  partial: PartialCompanyContext,
): CompanyContext {
  return {
    identity: {
      name: partial.identity?.name ?? current.identity.name,
      description:
        partial.identity?.description ?? current.identity.description,
    },
    offer: { items: partial.offer?.items ?? current.offer.items },
    voice: {
      weDo: partial.voice?.weDo ?? current.voice.weDo,
      weDont: partial.voice?.weDont ?? current.voice.weDont,
    },
    cta: { items: partial.cta?.items ?? current.cta.items },
    audience: {
      profiles: partial.audience?.profiles ?? current.audience.profiles,
    },
    extras: partial.extras === undefined ? current.extras : partial.extras,
  };
}
