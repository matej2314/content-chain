import { Module } from '@nestjs/common';
import { GatewayLivenessProbe } from './gateway-liveness.probe';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, GatewayLivenessProbe],
})
export class HealthModule {}
