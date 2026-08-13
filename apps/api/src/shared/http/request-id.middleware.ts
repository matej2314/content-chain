import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { newRequestId } from './new-ids';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = newRequestId();
    req.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    next();
  }
}
