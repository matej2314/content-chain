import { z } from 'zod';
import { parseLlmJson } from './parse-llm-json';

const hopSchema = z.object({
  ok: z.boolean(),
  nested: z.object({ title: z.string() }).optional(),
});

describe('parseLlmJson', () => {
  it('returns parsed output on success', () => {
    expect(parseLlmJson(hopSchema, '{"ok":true}')).toEqual({ ok: true });
  });

  it('throws STRUCTURED_OUTPUT_INVALID 500 for invalid JSON', () => {
    expect(() => parseLlmJson(hopSchema, 'not-json')).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
        httpStatus: 500,
        message: 'LLM output is not valid JSON',
      }),
    );
  });

  it('throws STRUCTURED_OUTPUT_INVALID 500 for a broken shape, with dotted details.path', () => {
    expect(() => parseLlmJson(hopSchema, '{"ok":true,"nested":{}}')).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'STRUCTURED_OUTPUT_INVALID',
        httpStatus: 500,
        message: 'LLM output failed schema validation',
        details: expect.arrayContaining([
          expect.objectContaining({ path: 'nested.title' }),
        ]),
      }),
    );
  });
});
