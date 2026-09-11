import { z } from 'zod';
import { parseWithZod } from './parse-with-zod';

const nestedSchema = z.object({
  brief: z.object({
    topic: z.string(),
  }),
  items: z.array(z.object({ name: z.string() })).optional(),
});

describe('parseWithZod', () => {
  it('returns parsed output on success', () => {
    expect(parseWithZod(nestedSchema, { brief: { topic: 'Q3' } })).toEqual({
      brief: { topic: 'Q3' },
    });
  });

  it('throws VALIDATION_FAILED 400 with dotted nested details.path', () => {
    expect(() => parseWithZod(nestedSchema, { brief: {} })).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
        details: expect.arrayContaining([
          expect.objectContaining({ path: 'brief.topic' }),
        ]),
      }),
    );
  });

  it('joins array-index segments with a dot in details.path', () => {
    expect(() =>
      parseWithZod(nestedSchema, { brief: { topic: 'Q3' }, items: [{}] }),
    ).toThrow(
      expect.objectContaining({
        name: 'DomainException',
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
        details: expect.arrayContaining([
          expect.objectContaining({ path: 'items.0.name' }),
        ]),
      }),
    );
  });
});
