import type { RequestId } from '@content-chain/shared';

export type ErrorEnvelope = {
  code: string;
  message: string;
  requestId: RequestId;
  details: unknown[];
};
