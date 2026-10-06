import type { RunTaskType } from '@content-chain/shared';

export const GUEST_ALLOWED_TASK_TYPES = [
  'post_ideas',
  'page_copy',
  'page_outline_then_copy',
] as const satisfies readonly RunTaskType[];

export type GuestAllowedTaskType = (typeof GUEST_ALLOWED_TASK_TYPES)[number];

export function isGuestAllowedTaskType(value: RunTaskType): value is GuestAllowedTaskType {
  return (GUEST_ALLOWED_TASK_TYPES as readonly string[]).includes(value);
}

export const GUEST_QUOTA_CODES = [
  'GUEST_TYPE_NOT_ALLOWED',
  'GUEST_TYPE_QUOTA_EXCEEDED',
  'GUEST_GLOBAL_QUOTA_EXCEEDED',
] as const;

export type GuestQuotaCode = (typeof GUEST_QUOTA_CODES)[number];

export function isGuestQuotaCode(code: string): code is GuestQuotaCode {
  return (GUEST_QUOTA_CODES as readonly string[]).includes(code);
}

export type GuestContact = {
  readonly iconName: string;
  readonly contactData: string;
  readonly label: string;
};

export const GUEST_CONTACTS: readonly GuestContact[] = [
  {
    iconName: 'lucide:mail',
    contactData: 'mailto:mateo2314@msliwowski.net',
    label: 'E-mail',
  },
  {
    iconName: 'lucide:linkedin',
    contactData: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
    label: 'LinkedIn',
  },
  {
    iconName: 'lucide:github',
    contactData: 'https://github.com/matej2314',
    label: 'GitHub',
  },
] as const;
