export type ReelTaskType =
  'reel_ideas' | 'reel_script' | 'reel_ideas_then_scripts';

export function isReelTaskType(taskType: string): taskType is ReelTaskType {
  return (
    taskType === 'reel_ideas' ||
    taskType === 'reel_script' ||
    taskType === 'reel_ideas_then_scripts'
  );
}
