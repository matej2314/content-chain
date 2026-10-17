import type { RunTaskType } from '../branded/enums';

export type RunsSummaryResponse = {
  windowFrom: string;
  windowTo: string;
  totalLast30d: number;
  successRateLast30d: number;
  activeNow: number;
  topTaskTypeLast30d: RunTaskType | null;
};
