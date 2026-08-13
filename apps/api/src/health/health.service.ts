import { Injectable } from '@nestjs/common';

export type HealthLiveness = {
  status: 'healthy';
  timestamp: string;
};

@Injectable()
export class HealthService {
  liveness(): HealthLiveness {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
