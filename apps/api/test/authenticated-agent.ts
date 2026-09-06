import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../src/shared/persistence/prisma.service';

/** Cookie-jar agent — SPEC-TESTY T-3 (cc_access / cc_refresh, bez Bearer). */
export type E2eAgent = ReturnType<typeof request.agent>;

export const E2E_ADMIN_CREDENTIALS = {
  email: 'e2e-admin@content-chain.test',
  password: 'E2eAdminPass12!',
} as const;

function isBootstrapAvailable(body: unknown): boolean {
  if (typeof body !== 'object' || body === null) {
    return false;
  }
  if (!('available' in body)) {
    return false;
  }
  return body.available === true;
}

async function resetAuthTables(prisma: PrismaService): Promise<void> {
  await prisma.run.updateMany({ data: { startedByUserId: null } });
  await prisma.refreshSession.deleteMany();
  await prisma.user.deleteMany();
}

export async function createAuthenticatedAgent(
  app: INestApplication,
): Promise<E2eAgent> {
  const prisma = app.get(PrismaService);
  const agent = request.agent(app.getHttpServer());

  const statusResponse = await request(app.getHttpServer())
    .get('/api/v1/auth/bootstrap-status')
    .expect(200);

  if (isBootstrapAvailable(statusResponse.body)) {
    await agent
      .post('/api/v1/auth/bootstrap-admin')
      .send(E2E_ADMIN_CREDENTIALS)
      .expect(201);
    return agent;
  }

  const login = await agent
    .post('/api/v1/auth/login')
    .send(E2E_ADMIN_CREDENTIALS);

  if (login.status === 200) {
    return agent;
  }

  await resetAuthTables(prisma);
  await agent
    .post('/api/v1/auth/bootstrap-admin')
    .send(E2E_ADMIN_CREDENTIALS)
    .expect(201);
  return agent;
}
