import {
  pageDocumentOutputSchema,
  pageOutlineOutputSchema,
  verifierOutputSchema,
} from './content.schemas';
import { parseLlmJson } from '../../shared/llm/parse-llm-json';

describe('parseLlmJson (content schemas)', () => {
  it('parses fenced JSON outline', () => {
    const raw =
      '```json\n{"title":"Audyt w 10 dni","sections":[{"heading":"Problem","summary":"Chaos ops po seedzie."}]}\n```';
    const out = parseLlmJson(pageOutlineOutputSchema, raw);
    expect(out.title).toBe('Audyt w 10 dni');
    expect(out.sections).toHaveLength(1);
    expect(out.sections[0]).toEqual({
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
    });
    expect(out.sections[0]?.role).toBeUndefined();
  });

  it('parses an outline section with a known role', () => {
    const out = parseLlmJson(
      pageOutlineOutputSchema,
      '{"title":"Audyt w 10 dni","sections":[{"heading":"Problem","summary":"Chaos ops po seedzie.","role":"pain"}]}',
    );
    expect(out.sections[0]).toEqual({
      heading: 'Problem',
      summary: 'Chaos ops po seedzie.',
      role: 'pain',
    });
  });

  it('rejects an unknown section role', () => {
    expect(() =>
      parseLlmJson(
        pageOutlineOutputSchema,
        '{"title":"T","sections":[{"heading":"H","summary":"S","role":"intro"}]}',
      ),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('parses a page document without optional meta', () => {
    const out = parseLlmJson(
      pageDocumentOutputSchema,
      '{"title":"Audyt procesów","lead":"Founderzy odzyskują czas.","body":"Pełny tekst strony."}',
    );
    expect(out).toEqual({
      title: 'Audyt procesów',
      lead: 'Founderzy odzyskują czas.',
      body: 'Pełny tekst strony.',
    });
  });

  it('parses optional metaTitle and metaDescription', () => {
    const out = parseLlmJson(
      pageDocumentOutputSchema,
      '{"title":"Audyt procesów","lead":"Lead.","body":"Body.","metaTitle":"Audyt procesów Acme","metaDescription":"Przegląd ops w 10 dni."}',
    );
    expect(out.metaTitle).toBe('Audyt procesów Acme');
    expect(out.metaDescription).toBe('Przegląd ops w 10 dni.');
  });

  it('rejects an outline with an empty sections array', () => {
    expect(() =>
      parseLlmJson(pageOutlineOutputSchema, '{"title":"T","sections":[]}'),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('rejects a broken document shape', () => {
    expect(() =>
      parseLlmJson(pageDocumentOutputSchema, '{"title":"T","lead":"L"}'),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
      }),
    );
  });

  it('rejects broken verifier shape', () => {
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
      '      "itemId": "osec_4a91844a-0a36-43f0-b82c-4c0daef2afae",',
      '      "issue": "Summary obiecuje wynik poza kontekstem."',
      '    },',
      '    {',
      '      "item": "outl_fcb6eb9c-e84e-4025-9618-6557955d4ec5",',
      '      "issue": "Title obiecuje, co klienci robią z czasem.",',
      '      "quote": "6 godzin tygodniowo"',
      '    }',
      '  ],',
      '  "languageIssues": [',
      '    {',
      '      "itemId": "osec_4a91844a-0a36-43f0-b82c-4c0daef2afae",',
      '      "issue": "Brak przecinka po okoliczniku."',
      '    }',
      '  ]',
      '}',
      '```',
    ].join('\n');
    const out = parseLlmJson(verifierOutputSchema, raw);
    expect(out.ok).toBe(false);
    expect(out.contextIssues).toEqual([
      'osec_4a91844a-0a36-43f0-b82c-4c0daef2afae — Summary obiecuje wynik poza kontekstem.',
      'outl_fcb6eb9c-e84e-4025-9618-6557955d4ec5 — 6 godzin tygodniowo — Title obiecuje, co klienci robią z czasem.',
    ]);
    expect(out.languageIssues).toEqual([
      'osec_4a91844a-0a36-43f0-b82c-4c0daef2afae — Brak przecinka po okoliczniku.',
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
});
