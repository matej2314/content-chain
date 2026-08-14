import {
  Controller,
  Get,
  INestApplication,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

@Controller('metrics-probe')
class MetricsProbeController {
  @Get('missing')
  missing(): never {
    throw new NotFoundException();
  }
}

@Module({ controllers: [MetricsProbeController] })
class MetricsProbeModule {}

function httpTotalLines(body: string): string[] {
  return body
    .split('\n')
    .filter((line) => line.startsWith('content_chain_http_requests_total{'))
    .sort();
}

function durationCount(body: string, route: string): number {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = body.match(
    new RegExp(
      `content_chain_http_request_duration_seconds_count\\{method="GET",route="${escaped}"\\} (\\d+(?:\\.\\d+)?)`,
    ),
  );
  return match ? Number(match[1]) : 0;
}

describe('Metrics (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, MetricsProbeModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /metrics exposes process HTTP and run gauges without secrets', async () => {
    await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    const response = await request(app.getHttpServer())
      .get('/metrics')
      .expect(200);
    expect(response.text).toContain('content_chain_http_requests_total');
    expect(response.text).toContain(
      'content_chain_http_request_duration_seconds',
    );
    expect(response.text).toContain('content_chain_runs_by_status');
    expect(response.text).toContain('content_chain_gateway_errors_total');
    expect(response.text).not.toMatch(
      /change-me-gateway-key|JWT_SECRET|password=/i,
    );
  });

  it('records health with a route template and status 200', async () => {
    await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    const response = await request(app.getHttpServer())
      .get('/metrics')
      .expect(200);
    expect(response.text).toMatch(
      /content_chain_http_requests_total\{method="GET",route="\/(api\/v1\/)?health",status="200"\}/,
    );
  });

  it('maps unknown paths to unmapped and never labels the raw URL', async () => {
    await request(app.getHttpServer()).get('/no-such-route-xyz').expect(404);
    const response = await request(app.getHttpServer())
      .get('/metrics')
      .expect(200);
    expect(response.text).not.toContain('no-such-route-xyz');
  });

  it('records error statuses and closes the duration histogram', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/metrics-probe/missing')
      .expect(404);

    const after = await request(app.getHttpServer()).get('/metrics').expect(200);
    const totalMatch = after.text.match(
      /content_chain_http_requests_total\{method="GET",route="(\/(?:api\/v1\/)?metrics-probe\/missing)",status="404"\}/,
    );
    expect(totalMatch).not.toBeNull();
    const route = totalMatch?.[1] ?? '';
    expect(durationCount(after.text, route)).toBeGreaterThan(0);
  });

  it('does not increment HTTP counters for GET /metrics itself', async () => {
    await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    const first = await request(app.getHttpServer()).get('/metrics').expect(200);
    const second = await request(app.getHttpServer())
      .get('/metrics')
      .expect(200);

    expect(httpTotalLines(second.text)).toEqual(httpTotalLines(first.text));
    expect(second.text).not.toMatch(
      /content_chain_http_requests_total\{[^}]*route="\/metrics"/,
    );
  });

  it('exposes a single process_start_time family from default metrics', async () => {
    const response = await request(app.getHttpServer())
      .get('/metrics')
      .expect(200);
    const typeLines = response.text
      .split('\n')
      .filter((line) =>
        line.startsWith('# TYPE content_chain_process_start_time_seconds'),
      );
    const helpLines = response.text
      .split('\n')
      .filter((line) =>
        line.startsWith('# HELP content_chain_process_start_time_seconds'),
      );
    expect(typeLines).toHaveLength(1);
    expect(helpLines).toHaveLength(1);
    expect(response.text).toContain('content_chain_process_start_time_seconds');
  });
});
