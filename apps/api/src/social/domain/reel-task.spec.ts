import { isReelTaskType } from './reel-task';

describe('isReelTaskType', () => {
  it('returns true for the three reel_* task types', () => {
    expect(isReelTaskType('reel_ideas')).toBe(true);
    expect(isReelTaskType('reel_script')).toBe(true);
    expect(isReelTaskType('reel_ideas_then_scripts')).toBe(true);
  });

  it('returns false for the three post_* task types', () => {
    expect(isReelTaskType('post_ideas')).toBe(false);
    expect(isReelTaskType('post_content')).toBe(false);
    expect(isReelTaskType('post_ideas_then_content')).toBe(false);
  });
});
