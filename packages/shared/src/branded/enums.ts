// ---------------------------------------------------------------------------
// Enumy kontraktu MVP — wartości z docs/brand_types.md
// Schemy Zod dla tych enumów żyją w apps/api (application), NIE tutaj.
// ---------------------------------------------------------------------------

export type UserRole = 'admin' | 'user';
export type RunStatus =
  'queued' | 'running' | 'interrupted' | 'awaiting_hitl' | 'completed' | 'failed';
export type SocialTaskType =
  | 'post_ideas'
  | 'post_content'
  | 'post_ideas_then_content'
  | 'reel_ideas'
  | 'reel_script'
  | 'reel_ideas_then_scripts';

export type ContentTaskType = 'page_copy' | 'page_outline_then_copy';

export type RunTaskType = SocialTaskType | ContentTaskType;

export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram';
export type RunPlatform = SocialPlatform | 'web';
export type ContentKind = 'blog' | 'service_page' | 'landing';
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

export const SOCIAL_TASK_TYPES = [
  'post_ideas',
  'post_content',
  'post_ideas_then_content',
  'reel_ideas',
  'reel_script',
  'reel_ideas_then_scripts',
] as const satisfies readonly SocialTaskType[];

export const CONTENT_TASK_TYPES = [
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly ContentTaskType[];

export const RUN_TASK_TYPES = [
  ...SOCIAL_TASK_TYPES,
  ...CONTENT_TASK_TYPES,
] as const satisfies readonly RunTaskType[];

export const SOCIAL_PLATFORMS = [
  'linkedin',
  'facebook',
  'instagram',
] as const satisfies readonly SocialPlatform[];

export const RUN_PLATFORMS = [...SOCIAL_PLATFORMS, 'web'] as const satisfies readonly RunPlatform[];

export const CONTENT_KINDS = [
  'blog',
  'service_page',
  'landing',
] as const satisfies readonly ContentKind[];

export const CONTENT_LANGUAGES = ['pl', 'en'] as const satisfies readonly ContentLanguage[];

export const isUserRole = (value: string): value is UserRole =>
  (USER_ROLES as readonly string[]).includes(value);

export const isRunStatus = (value: string): value is RunStatus =>
  (RUN_STATUSES as readonly string[]).includes(value);

export const isSocialTaskType = (value: string): value is SocialTaskType =>
  (SOCIAL_TASK_TYPES as readonly string[]).includes(value);

export const isContentTaskType = (value: string): value is ContentTaskType =>
  (CONTENT_TASK_TYPES as readonly string[]).includes(value);

export const isRunTaskType = (value: string): value is RunTaskType =>
  (RUN_TASK_TYPES as readonly string[]).includes(value);

export const isSocialPlatform = (value: string): value is SocialPlatform =>
  (SOCIAL_PLATFORMS as readonly string[]).includes(value);

export const isRunPlatform = (value: string): value is RunPlatform =>
  (RUN_PLATFORMS as readonly string[]).includes(value);

export const isContentKind = (value: string): value is ContentKind =>
  (CONTENT_KINDS as readonly string[]).includes(value);

export const isContentLanguage = (value: string): value is ContentLanguage =>
  (CONTENT_LANGUAGES as readonly string[]).includes(value);
