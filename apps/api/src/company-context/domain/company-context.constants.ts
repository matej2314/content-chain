export const COMPANY_CONTEXT_SINGLETON_ID = 'default';

export const GATE_SECTIONS = [
  'identity',
  'offer',
  'voice',
  'cta',
  'audience',
] as const;

export type GateSection = (typeof GATE_SECTIONS)[number];
