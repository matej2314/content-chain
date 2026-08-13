import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {  HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness of main backend application' })
  @ApiOkResponse({ description: 'Process is alive' })
  liveness(): ReturnType<HealthService['liveness']> {
    return this.healthService.liveness();
  }
}
