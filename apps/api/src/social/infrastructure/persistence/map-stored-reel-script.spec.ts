import { mapStoredReelScript } from './map-stored-reel-script';

describe('mapStoredReelScript', () => {
  it('maps a complete payload with sourceIdeaId', () => {
    expect(
      mapStoredReelScript({
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz',
        notes: 'cisza',
        sourceIdeaId: 'idea_1',
      }),
    ).toEqual({
      segments: [
        {
          startSeconds: 0,
          endSeconds: 15,
          onScreen: 'Hook',
          voiceover: 'Powiedz problem.',
        },
      ],
      cta: 'Napisz',
      notes: 'cisza',
      sourceIdeaId: 'idea_1',
    });
  });

  it('omits sourceIdeaId when missing', () => {
    expect(
      mapStoredReelScript({
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'Hook',
            voiceover: 'Powiedz problem.',
          },
        ],
        cta: 'Napisz',
      }),
    ).toEqual({
      segments: [
        {
          startSeconds: 0,
          endSeconds: 15,
          onScreen: 'Hook',
          voiceover: 'Powiedz problem.',
        },
      ],
      cta: 'Napisz',
    });
  });

  it('rejects non-object payloads', () => {
    expect(() => mapStoredReelScript(null)).toThrow(
      'Invalid ReelScript payload',
    );
    expect(() => mapStoredReelScript('x')).toThrow(
      'Invalid ReelScript payload',
    );
  });
});
