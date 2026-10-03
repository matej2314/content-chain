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

  @Get('ready')
  @ApiOperation({
    summary: 'Product readiness (API process + gateway liveness)',
    description:
      'Always HTTP 200 while the API process is up. Verdict is body.status (ready | not_ready). checks.gateway comes from upstream gateway GET /api/v1/health (liveness), not /health/ready. No auth; no secrets in body.',
  })
  @ApiOkResponse({
    description:
      'Readiness aggregate; HTTP 200 with status ready | not_ready in body',
  })
  readiness(): ReturnType<HealthService['readiness']> {
    return this.healthService.readiness();
  }
}
