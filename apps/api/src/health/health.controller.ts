import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { HealthService } from './health.service';

@Public()
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
