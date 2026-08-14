import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import type { Response } from 'express';

@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get('metrics')
  async metricsEndpoint(@Res() res: Response): Promise<void> {
    const snapshot = await this.metrics.render();
    res.setHeader('Content-Type', snapshot.contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(snapshot.body);
  }
}
