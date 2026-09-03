import { renderPrompt } from './load-prompt';

describe('renderPrompt', () => {
  it('replaces {{language}} with the provided value', () => {
    expect(renderPrompt('Język: {{language}}.', { language: 'pl' })).toBe(
      'Język: pl.',
    );
  });

  it('replaces missing keys with an empty string', () => {
    expect(renderPrompt('X={{brak}}Y', {})).toBe('X=Y');
  });
});
