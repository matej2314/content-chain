import { withEffectiveAudience } from '../../../../company-context/domain/with-effective-audience';
import { newConversationId, newRunId } from '../../../../shared/http/new-ids';
import type { CompanyContext } from '../../../../company-context/domain/company-context.types';
import type { CompanyContextRepository } from '../../../../company-context/domain/company-context.port';
import type { SocialGraphState } from '../state';
import { createLoadContextNode } from './load-context.node';

const catalog: CompanyContext = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność'],
        description: 'Przegląd.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz' }] },
  audience: {
    profiles: [
      { name: 'Founder SaaS', description: 'Founder 8–40' },
      { name: 'Ops Lead', description: 'Ops / CS' },
    ],
  },
  extras: null,
};

function makeState(
  overrides: Partial<SocialGraphState> = {},
): SocialGraphState {
  return {
    runId: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    brief: { topic: 'Q3 launch' },
    selectedIdeaIds: null,
    phase: 'ideas',
    company: null,
    ideas: [],
    content: null,
    reelIdeas: [],
    reelScript: null,
    verdict: null,
    ideasRefineCount: 0,
    contentRefineCount: 0,
    failedCode: null,
    failedMessage: null,
    ...overrides,
  };
}

describe('createLoadContextNode (social)', () => {
  it('D-75 omit brief.audience → empty effective profiles', async () => {
    const get = jest.fn(async () => catalog);
    const node = createLoadContextNode({
      get,
    } as CompanyContextRepository);
    const partial = await node(makeState());

    expect(get).toHaveBeenCalledTimes(1);
    expect(partial.company).toEqual(withEffectiveAudience(catalog, undefined));
    expect(partial.company?.audience.profiles).toEqual([]);
  });

  it('D-76 catalog name match (trim, case-insensitive) → one profile', async () => {
    const get = jest.fn(async () => catalog);
    const node = createLoadContextNode({
      get,
    } as CompanyContextRepository);
    const partial = await node(
      makeState({ brief: { topic: 'Q3', audience: '  founder saas ' } }),
    );

    expect(partial.company).toEqual(
      withEffectiveAudience(catalog, '  founder saas '),
    );
    expect(partial.company?.audience.profiles).toEqual([
      { name: 'Founder SaaS', description: 'Founder 8–40' },
    ]);
  });

  it('D-77 custom string → empty profiles despite catalog', async () => {
    const custom = 'Właściciele lokalnych kawiarni w Warszawie';
    const get = jest.fn(async () => catalog);
    const node = createLoadContextNode({
      get,
    } as CompanyContextRepository);
    const partial = await node(
      makeState({ brief: { topic: 'Q3', audience: custom } }),
    );

    expect(partial.company).toEqual(withEffectiveAudience(catalog, custom));
    expect(partial.company?.audience.profiles).toEqual([]);
  });
});
