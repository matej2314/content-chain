import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { ENV, type Env } from '../shared/config/env';

export type PublicConfigResponse = {
  readonly demoMode: boolean;
};

@Public()
@ApiTags('config')
@Controller('config')
export class PublicConfigController {
  constructor(@Inject(ENV) private readonly env: Env) {}

  @Get()
  @ApiOperation({ summary: 'Public product flags ' })
  @ApiOkResponse({ description: 'Demo mode flag status' })
  get(): PublicConfigResponse {
    return { demoMode: this.env.DEMO_MODE };
  }
}
