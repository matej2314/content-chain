import type { RequestId } from '@content-chain/shared';
import type { AuthUserContext } from '../types/auth-user-context';

declare global {
  namespace Express {
    interface Request {
      requestId?: RequestId;
      user?: AuthUserContext;
    }
  }
}
