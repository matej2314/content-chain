import {
  ideasOutputSchema,
  reelIdeasOutputSchema,
  reelScriptOutputSchema,
  verifierOutputSchema,
} from './social.schemas';
import { parseLlmJson } from '../../shared/llm/parse-llm-json';

describe('parseLlmJson', () => {
  it('parses fenced JSON ideas', () => {
    const raw =
      '```json\n{"ideas":[{"title":"A","angle":"B","hook":"C"}]}\n```';
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

  it('keeps string issues unchanged', () => {
    const out = parseLlmJson(
      verifierOutputSchema,
      '{"ok":false,"contextIssues":["off-brand CTA"],"languageIssues":[]}',
    );
    expect(out).toEqual({
      ok: false,
      contextIssues: ['off-brand CTA'],
      languageIssues: [],
    });
  });

  it('coerces object-shaped issues from a live verifier payload into strings', () => {
    const raw = [
      '```json',
      '{',
      '  "ok": false,',
      '  "contextIssues": [',
      '    {',
      '      "itemId": "idea_4a91844a-0a36-43f0-b82c-4c0daef2afae",',
      '      "issue": "Hook: «seed zamknięty» — audience opisuje seed, nie narrację Q2."',
      '    },',
      '    {',
      '      "item": "idea_fcb6eb9c-e84e-4025-9618-6557955d4ec5",',
      '      "issue": "Title obiecuje, co klienci robią z czasem.",',
      '      "quote": "6 godzin tygodniowo"',
      '    }',
      '  ],',
      '  "languageIssues": [',
      '    {',
      '      "itemId": "idea_4a91844a-0a36-43f0-b82c-4c0daef2afae",',
      '      "issue": "Brak przecinka po okoliczniku."',
      '    }',
      '  ]',
      '}',
      '```',
    ].join('\n');
    const out = parseLlmJson(verifierOutputSchema, raw);
    expect(out.ok).toBe(false);
    expect(out.contextIssues).toEqual([
      'idea_4a91844a-0a36-43f0-b82c-4c0daef2afae — Hook: «seed zamknięty» — audience opisuje seed, nie narrację Q2.',
      'idea_fcb6eb9c-e84e-4025-9618-6557955d4ec5 — 6 godzin tygodniowo — Title obiecuje, co klienci robią z czasem.',
    ]);
    expect(out.languageIssues).toEqual([
      'idea_4a91844a-0a36-43f0-b82c-4c0daef2afae — Brak przecinka po okoliczniku.',
    ]);
  });

  it('rejects issue entries that are neither strings nor issue objects', () => {
    expect(() =>
      parseLlmJson(
        verifierOutputSchema,
        '{"ok":false,"contextIssues":[42],"languageIssues":[]}',
      ),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
    expect(() =>
      parseLlmJson(
        verifierOutputSchema,
        '{"ok":false,"contextIssues":[{}],"languageIssues":[]}',
      ),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('parses reel ideas with numeric durationSeconds', () => {
    const out = parseLlmJson(
      reelIdeasOutputSchema,
      '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":15}]}',
    );
    expect(out.ideas[0]?.durationSeconds).toBe(15);
  });

  it('coerces durationSeconds from string 30', () => {
    const out = parseLlmJson(
      reelIdeasOutputSchema,
      '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":"30"}]}',
    );
    expect(out.ideas[0]?.durationSeconds).toBe(30);
  });

  it('rejects durationSeconds 45', () => {
    expect(() =>
      parseLlmJson(
        reelIdeasOutputSchema,
        '{"ideas":[{"title":"R1","description":"D1","hook":"H1","durationSeconds":45}]}',
      ),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('parses reel script segments', () => {
    const out = parseLlmJson(
      reelScriptOutputSchema,
      '{"segments":[{"startSeconds":0,"endSeconds":15,"onScreen":"Tekst","voiceover":"Powiedz"}],"cta":"Napisz do nas"}',
    );
    expect(out.segments).toHaveLength(1);
    expect(out.cta).toBe('Napisz do nas');
  });
});
