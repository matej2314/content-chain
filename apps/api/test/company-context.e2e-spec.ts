import { execFileSync } from 'child_process';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  COMPANY_CONTEXT_SINGLETON_ID,
  GATE_SECTIONS,
} from '../src/company-context/domain/company-context.constants';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';

const completeBody = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

function expectNoFileFallback(body: unknown): void {
  const serialized = JSON.stringify(body);
  expect(serialized).not.toMatch(/\.md/i);
  expect(serialized).not.toMatch(/fallback/i);
}

describe('Company context (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    execFileSync(
      process.execPath,
      [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
      {
        cwd: join(__dirname, '..'),
        env: {
          ...process.env,
          DATABASE_URL: 'file:./test.db',
          CHECKPOINT_DISABLE: '1',
          PRISMA_HIDE_UPDATE_MESSAGE: '1',
        },
        stdio: 'pipe',
      },
    );

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
  }, 30_000);

  afterAll(async () => {
    await app?.close();
  }, 15_000);

  it('GET /api/v1/company-context/completeness reports all gate sections missing on an empty database', async () => {
    await prisma.companyContext.deleteMany();

    const response = await request(app.getHttpServer())
      .get('/api/v1/company-context/completeness')
      .expect(200);

    expect(response.body).toEqual({
      complete: false,
      missing: [...GATE_SECTIONS],
    });
    expectNoFileFallback(response.body);
  });

  it('PUT complete body then GET completeness.complete === true', async () => {
    const put = await request(app.getHttpServer())
      .put('/api/v1/company-context')
      .send(completeBody)
      .expect(200);

    expect(put.body.completeness).toEqual({ complete: true, missing: [] });
    expect(put.body.identity).toEqual(completeBody.identity);
    expectNoFileFallback(put.body);

    const rows = await prisma.companyContext.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(COMPANY_CONTEXT_SINGLETON_ID);

    const completeness = await request(app.getHttpServer())
      .get('/api/v1/company-context/completeness')
      .expect(200);

    expect(completeness.body.complete).toBe(true);
    expect(completeness.body.missing).toEqual([]);
    expectNoFileFallback(completeness.body);

    const context = await request(app.getHttpServer())
      .get('/api/v1/company-context')
      .expect(200);

    expect(context.body.completeness).toEqual({ complete: true, missing: [] });
    expect(context.body.identity).toEqual(completeBody.identity);
    expect(context.body.offer).toEqual(completeBody.offer);
    expectNoFileFallback(context.body);
  });

  it('PATCH identity name merges and does not wipe offer', async () => {
    await request(app.getHttpServer())
      .put('/api/v1/company-context')
      .send(completeBody)
      .expect(200);

    const patched = await request(app.getHttpServer())
      .patch('/api/v1/company-context')
      .send({ identity: { name: 'Nowa' } })
      .expect(200);

    expect(patched.body.identity).toEqual({
      name: 'Nowa',
      description: completeBody.identity.description,
    });
    expect(patched.body.offer).toEqual(completeBody.offer);
    expectNoFileFallback(patched.body);

    const rows = await prisma.companyContext.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(COMPANY_CONTEXT_SINGLETON_ID);

    const context = await request(app.getHttpServer())
      .get('/api/v1/company-context')
      .expect(200);

    expect(context.body.identity.name).toBe('Nowa');
    expect(context.body.offer.items).toEqual(completeBody.offer.items);
    expectNoFileFallback(context.body);
  });
});
