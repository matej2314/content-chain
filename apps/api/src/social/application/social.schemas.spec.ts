import { ideasOutputSchema, verifierOutputSchema } from './social.schemas';
import { parseLlmJson } from './parse-llm-json';

describe('parseLlmJson', () => {
  it('parses fenced JSON ideas', () => {
    const raw = '```json\n{"ideas":[{"title":"A","angle":"B","hook":"C"}]}\n```';
    const out = parseLlmJson(ideasOutputSchema, raw);
    expect(out.ideas).toHaveLength(1);
  });

  it('rejects broken shape', () => {
    expect(() => parseLlmJson(verifierOutputSchema, '{"ok":"nope"}')).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('defaults missing issue arrays and rejects null', () => {
    expect(
      parseLlmJson(verifierOutputSchema, '{"ok":true}').contextIssues,
    ).toEqual([]);
    expect(() =>
      parseLlmJson(verifierOutputSchema, '{"ok":true,"contextIssues":null}'),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });
});
