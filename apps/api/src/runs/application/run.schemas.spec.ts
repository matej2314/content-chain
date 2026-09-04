import { parseWithZod } from '../../shared/parse-with-zod';
import { startRunCommandSchema } from './run.schemas';

const pageCommand = {
  taskType: 'page_copy',
  contentKind: 'blog',
  language: 'pl',
  brief: { topic: 'Audyt procesów' },
} as const;

const socialCommand = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  language: 'pl',
  brief: { topic: 'Q3' },
} as const;

function expectValidationFailed(input: unknown): void {
  expect(() => parseWithZod(startRunCommandSchema, input)).toThrow(
    expect.objectContaining({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    }),
  );
}

describe('startRunCommandSchema', () => {
  it('accepts page_copy without platform', () => {
    expect(parseWithZod(startRunCommandSchema, pageCommand)).toEqual({
      taskType: 'page_copy',
      contentKind: 'blog',
      language: 'pl',
      brief: { topic: 'Audyt procesów' },
    });
  });

  it('accepts post_ideas with platform and without contentKind', () => {
    expect(parseWithZod(startRunCommandSchema, socialCommand)).toEqual({
      taskType: 'post_ideas',
      platform: 'linkedin',
      language: 'pl',
      brief: { topic: 'Q3' },
    });
  });

  it('rejects page_copy with platform linkedin', () => {
    expectValidationFailed({ ...pageCommand, platform: 'linkedin' });
  });

  it('rejects page_copy with selectedIdeaIds', () => {
    expectValidationFailed({ ...pageCommand, selectedIdeaIds: ['outl_1'] });
  });

  it('rejects page_copy with brief.ideaCount (D-19a)', () => {
    expectValidationFailed({
      ...pageCommand,
      brief: { topic: 'Audyt procesów', ideaCount: 5 },
    });
  });

  it('rejects post_ideas without platform', () => {
    expectValidationFailed({
      taskType: 'post_ideas',
      language: 'pl',
      brief: { topic: 'Q3' },
    });
  });

  it('rejects post_ideas with contentKind', () => {
    expectValidationFailed({ ...socialCommand, contentKind: 'blog' });
  });

  it('rejects post_ideas with brief.angle (D-19a)', () => {
    expectValidationFailed({
      ...socialCommand,
      brief: { topic: 'Q3', angle: 'ops' },
    });
  });

  it('rejects post_ideas with brief.targetLength (D-19a)', () => {
    expectValidationFailed({
      ...socialCommand,
      brief: { topic: 'Q3', targetLength: 800 },
    });
  });

  it('rejects unknown taskType (D-19)', () => {
    expectValidationFailed({
      taskType: 'nope',
      platform: 'linkedin',
      language: 'pl',
      brief: { topic: 'Q3' },
    });
  });
});
