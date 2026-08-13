import type { RequestId } from '@content-chain/shared';

declare global {
  namespace Express {
    interface Request {
      requestId?: RequestId;
    }
  }
}
