// ---------------------------------------------------------------------------
// Enumy kontraktu MVP — wartości z docs/brand_types.md
// Schemy Zod dla tych enumów żyją w apps/api (application), NIE tutaj.
// ---------------------------------------------------------------------------

export type UserRole = 'admin' | 'user';
export type RunStatus =
  'queued' | 'running' | 'interrupted' | 'awaiting_hitl' | 'completed' | 'failed';
export type RunTaskType =
  | 'post_ideas'
  | 'post_content'
  | 'post_ideas_then_content'
  | 'reel_ideas'
  | 'reel_script'
  | 'reel_ideas_then_scripts';
export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram';
export type ContentLanguage = 'pl' | 'en';

export const USER_ROLES = ['admin', 'user'] as const satisfies readonly UserRole[];
export const RUN_STATUSES = [
  'queued',
  'running',
  'interrupted',
  'awaiting_hitl',
  'completed',
  'failed',
] as const satisfies readonly RunStatus[];
export const RUN_TASK_TYPES = [
  'post_ideas',
  'post_content',
  'post_ideas_then_content',
  'reel_ideas',
  'reel_script',
  'reel_ideas_then_scripts',
] as const satisfies readonly RunTaskType[];
export const SOCIAL_PLATFORMS = [
  'linkedin',
  'facebook',
  'instagram',
] as const satisfies readonly SocialPlatform[];
export const CONTENT_LANGUAGES = ['pl', 'en'] as const satisfies readonly ContentLanguage[];

export const isUserRole = (value: string): value is UserRole =>
  (USER_ROLES as readonly string[]).includes(value);
export const isRunStatus = (value: string): value is RunStatus =>
  (RUN_STATUSES as readonly string[]).includes(value);
export const isRunTaskType = (value: string): value is RunTaskType =>
  (RUN_TASK_TYPES as readonly string[]).includes(value);
export const isSocialPlatform = (value: string): value is SocialPlatform =>
  (SOCIAL_PLATFORMS as readonly string[]).includes(value);
export const isContentLanguage = (value: string): value is ContentLanguage =>
  (CONTENT_LANGUAGES as readonly string[]).includes(value);
