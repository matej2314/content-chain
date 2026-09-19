import type {
  ContentKind,
  ContentLanguage,
  RunPlatform,
  RunStatus,
  RunTaskType,
} from '@content-chain/shared';
import type { PageOutlineSectionRole } from '@/modules/runs/api/runs-result.types';

export const RUN_TASK_TYPE_LABELS = {
  post_ideas: 'Pomysły na posty',
  post_content: 'Treść posta',
  post_ideas_then_content: 'Pomysły, potem treści',
  reel_ideas: 'Pomysły na rolki',
  reel_script: 'Scenariusz rolki',
  reel_ideas_then_scripts: 'Pomysły, potem scenariusze',
  page_copy: 'Copy strony',
  page_outline_then_copy: 'Outline, potem copy',
} as const satisfies Record<RunTaskType, string>;

export const RUN_PLATFORM_LABELS = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  web: 'Web',
} as const satisfies Record<RunPlatform, string>;

export const CONTENT_KIND_LABELS = {
  blog: 'Blog',
  service_page: 'Strona oferty',
  landing: 'Landing',
} as const satisfies Record<ContentKind, string>;

export const LANGUAGE_LABELS = {
  pl: 'Polski',
  en: 'English',
} as const satisfies Record<ContentLanguage, string>;

export const RUN_STATUS_LABELS = {
  queued: 'W kolejce',
  running: 'Trwa run',
  awaiting_hitl: 'Czeka na wybór',
  interrupted: 'Przerwany. Wznowienie przy wolnym slocie',
  completed: 'Zakończony',
  failed: 'Nieudany',
} as const satisfies Record<RunStatus, string>;

export const RUN_STATUS_SHORT_LABELS = {
  queued: 'W kolejce',
  running: 'Trwa run…',
  awaiting_hitl: 'Trwa run…',
  interrupted: 'Przerwany. Wznowienie przy wolnym slocie',
  completed: 'Zakończony',
  failed: 'Nieudany',
} as const satisfies Record<RunStatus, string>;

export const PAGE_OUTLINE_ROLE_LABELS = {
  audience_world: 'Świat odbiorcy',
  pain: 'Ból',
  challenger: 'Challenger',
  insight: 'Insight',
  proof: 'Dowód',
  objection: 'Zastrzeżenie',
  cta: 'CTA',
  other: 'Inne',
} as const satisfies Record<PageOutlineSectionRole, string>;
