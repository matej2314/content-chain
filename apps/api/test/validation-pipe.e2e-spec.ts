import {
  Body,
  Controller,
  INestApplication,
  Module,
  Post,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

class ValidationProbeDto {
  @IsString()
  name!: string;
}

@Controller('validation-probe')
class ValidationProbeController {
  @Post()
  probe(@Body() body: ValidationProbeDto): ValidationProbeDto {
    return body;
  }
}

@Module({
  imports: [AppModule],
  controllers: [ValidationProbeController],
})
class ValidationProbeModule {}

describe('ValidationPipe (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ValidationProbeModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('rejects unknown fields with VALIDATION_FAILED envelope', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/validation-probe')
      .send({ name: 'ok', unexpected: true })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        code: 'VALIDATION_FAILED',
        requestId: expect.stringMatching(/^req_/),
        details: expect.any(Array),
      }),
    );
    expect(response.body.details.length).toBeGreaterThan(0);
    expect(response.headers['x-request-id']).toMatch(/^req_/);
  });
});
