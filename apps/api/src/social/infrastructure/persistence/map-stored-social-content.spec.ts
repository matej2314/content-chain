import { mapStoredSocialContent } from './map-stored-social-content';

describe('mapStoredSocialContent', () => {
  it('maps a complete payload', () => {
    expect(
      mapStoredSocialContent({
        body: 'Hello',
        hashtags: ['#a'],
        cta: 'Napisz',
        characterCount: 5,
      }),
    ).toEqual({
      body: 'Hello',
      hashtags: ['#a'],
      cta: 'Napisz',
      characterCount: 5,
    });
  });

  it('fills characterCount from body.length when key is missing', () => {
    expect(
      mapStoredSocialContent({
        body: 'Hello',
        hashtags: [],
      }),
    ).toEqual({
      body: 'Hello',
      hashtags: [],
      characterCount: 5,
    });
  });

  it('rejects non-object payloads', () => {
    expect(() => mapStoredSocialContent(null)).toThrow(
      'Invalid SocialContent payload',
    );
    expect(() => mapStoredSocialContent('x')).toThrow(
      'Invalid SocialContent payload',
    );
  });
});
