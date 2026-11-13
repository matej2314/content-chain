import { execFileSync } from 'child_process';
import { join } from 'path';
import { randomUUID } from 'node:crypto';
import { hash as bcryptHash } from 'bcrypt';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { GatewayLivenessProbe } from '../src/health/gateway-liveness.probe';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMail,
  type TransactionalMailer,
} from '../src/auth/domain/transactional-mailer.port';
import {
  createAuthenticatedAgent,
  E2E_ADMIN_CREDENTIALS,
  type E2eAgent,
} from './authenticated-agent';
import { FakeLlmGateway } from './fake-llm-gateway';

const USER_PASSWORD = 'E2eSelfSvcUser12!';
const NEW_PASSWORD = 'E2eSelfSvcNew12!!';
const USER_EMAIL = `e2e-selfsvc-user-${randomUUID()}@content-chain.test`;
const PENDING_EMAIL = `e2e-selfsvc-pending-${randomUUID()}@content-chain.test`;
const GUEST_EMAIL = `e2e-selfsvc-guest-${randomUUID()}@content-chain.test`;
const GUEST_PASSWORD = 'E2eSelfSvcGuest12!';

function deployTestDb(): void {
  execFileSync(
    process.execPath,
    [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
    {
      cwd: join(__dirname, '..'),
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL!,
        CHECKPOINT_DISABLE: '1',
        PRISMA_HIDE_UPDATE_MESSAGE: '1',
      },
      stdio: 'pipe',
    },
  );
}

function restoreEnv(
  snapshot: Readonly<
    Record<'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT', string | undefined>
  >,
): void {
  (['DEMO_MODE', 'REDIS_HOST', 'REDIS_PORT'] as const).forEach((key) => {
    const previous = snapshot[key];
    if (previous === undefined) {
      delete process.env[key];
      return;
    }
    process.env[key] = previous;
  });
}

async function createUserRow(
  prisma: PrismaService,
  input: {
    email: string;
    password: string;
    role: 'user' | 'guest';
  },
): Promise<string> {
  const id = `usr_${randomUUID()}`;
  await prisma.user.create({
    data: {
      id,
      email: input.email,
      passwordHash: await bcryptHash(input.password, 4),
      role: input.role,
      isActive: true,
      verifiedAt: new Date(),
    },
  });
  return id;
}

async function wipeEmailChange(prisma: PrismaService): Promise<void> {
  await prisma.emailChangeRequest.deleteMany();
}

function setCookieHeaders(res: request.Response): string {
  const raw = res.headers['set-cookie'];
  if (Array.isArray(raw)) {
    return raw.join('\n');
  }
  return typeof raw === 'string' ? raw : '';
}

describe('Auth self-service confirm / password / delete-own (e2e)', () => {
  let app: INestApplication;
  let admin: E2eAgent;
  let prisma: PrismaService;
  let envSnapshot: Record<
    'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT',
    string | undefined
  >;
  const fakeLlm = new FakeLlmGateway();
  const sentMail: TransactionalMail[] = [];
  const capturingMailer: TransactionalMailer = {
    send: async (message) => {
      sentMail.push(message);
    },
  };

  beforeAll(async () => {
    envSnapshot = {
      DEMO_MODE: process.env.DEMO_MODE,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: process.env.REDIS_PORT,
    };
    process.env.DEMO_MODE = 'true';
    process.env.REDIS_HOST = '127.0.0.1';
    process.env.REDIS_PORT = '6379';
    deployTestDb();

    const standalone = new PrismaClient();
    try {
      await standalone.$connect();
      await standalone.emailChangeRequest.deleteMany();
    } finally {
      await standalone.$disconnect();
    }

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TRANSACTIONAL_MAILER)
      .useValue(capturingMailer)
      .overrideProvider(LLM_GATEWAY_PORT)
      .useValue(fakeLlm)
      .overrideProvider(GatewayLivenessProbe)
      .useValue({
        probe: jest.fn().mockResolvedValue({ ok: true }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    admin = await createAuthenticatedAgent(app);
  }, 45_000);

  beforeEach(async () => {
    sentMail.length = 0;
    await wipeEmailChange(prisma);
  });

  afterAll(async () => {
    try {
      if (prisma) {
        await wipeEmailChange(prisma);
        for (const email of [USER_EMAIL, PENDING_EMAIL, GUEST_EMAIL]) {
          const row = await prisma.user.findUnique({ where: { email } });
          if (!row) {
            continue;
          }
          await prisma.refreshSession.deleteMany({ where: { userId: row.id } });
          await prisma.accountActivation.deleteMany({
            where: { userId: row.id },
          });
          await prisma.emailChangeRequest.deleteMany({
            where: { userId: row.id },
          });
          await prisma.user.delete({ where: { id: row.id } });
        }
      }
      await app?.close();
    } finally {
      restoreEnv(envSnapshot);
    }
  }, 20_000);

  it('D-27 V1 + D-90 + D-91: pending, confirm, resend, bad token', async () => {
    const userId = await createUserRow(prisma, {
      email: USER_EMAIL,
      password: USER_PASSWORD,
      role: 'user',
    });
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/v1/auth/login')
      .send({ email: USER_EMAIL, password: USER_PASSWORD })
      .expect(200);

    const wrong = await agent
      .patch('/api/v1/auth/me/email')
      .send({ email: PENDING_EMAIL, currentPassword: 'WrongPassword1!' })
      .expect(401);
    expect(wrong.body.code).toBe('INVALID_PASSWORD');

    const occupied = await agent
      .patch('/api/v1/auth/me/email')
      .send({
        email: E2E_ADMIN_CREDENTIALS.email,
        currentPassword: USER_PASSWORD,
      })
      .expect(409);
    expect(occupied.body.code).toBe('CONFLICT');

    const pending = await agent
      .patch('/api/v1/auth/me/email')
      .send({ email: PENDING_EMAIL, currentPassword: USER_PASSWORD })
      .expect(200);
    expect(pending.body).toMatchObject({
      id: userId,
      email: USER_EMAIL,
      role: 'user',
      pendingEmail: PENDING_EMAIL,
    });

    const mePending = await agent.get('/api/v1/auth/me').expect(200);
    expect(mePending.body).toMatchObject({
      email: USER_EMAIL,
      pendingEmail: PENDING_EMAIL,
    });

    const confirmMail = sentMail.find((m) => m.kind === 'email_change_confirm');
    expect(confirmMail?.kind).toBe('email_change_confirm');
    if (!confirmMail || confirmMail.kind !== 'email_change_confirm') {
      throw new Error('expected email_change_confirm mail');
    }
    expect(confirmMail.confirmUrl).toContain('/?emailChangeToken=');
    const firstToken = confirmMail.rawToken;

    await agent.post('/api/v1/auth/me/email/resend-confirm').expect(200);
    const rotated = sentMail.filter((m) => m.kind === 'email_change_confirm');
    expect(rotated.length).toBeGreaterThanOrEqual(2);
    const latest = rotated[rotated.length - 1];
    if (!latest || latest.kind !== 'email_change_confirm') {
      throw new Error('expected rotated email_change_confirm mail');
    }
    expect(latest.rawToken).not.toBe(firstToken);

    const bad = await request(app.getHttpServer())
      .post('/api/v1/auth/confirm-email-change')
      .send({ token: firstToken })
      .expect(401);
    expect(bad.body.code).toBe('UNAUTHORIZED');

    const confirmed = await request(app.getHttpServer())
      .post('/api/v1/auth/confirm-email-change')
      .send({ token: latest.rawToken })
      .expect(200);
    expect(confirmed.body).toMatchObject({
      id: userId,
      email: PENDING_EMAIL,
      role: 'user',
    });
    expect(setCookieHeaders(confirmed)).not.toMatch(/cc_access=[^;]+/);

    const meAfter = await agent.get('/api/v1/auth/me').expect(200);
    expect(meAfter.body).toMatchObject({
      email: PENDING_EMAIL,
      pendingEmail: null,
    });

    const reuse = await request(app.getHttpServer())
      .post('/api/v1/auth/confirm-email-change')
      .send({ token: latest.rawToken })
      .expect(401);
    expect(reuse.body.code).toBe('UNAUTHORIZED');

    const noPending = await agent
      .post('/api/v1/auth/me/email/resend-confirm')
      .expect(409);
    expect(noPending.body.code).toBe('CONFLICT');

    const row = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    expect(row.email).toBe(PENDING_EMAIL);
  });

  it('D-92: password change rotates cookies; wrong current keeps session', async () => {
    const email = `e2e-selfsvc-pw-${randomUUID()}@content-chain.test`;
    const userId = await createUserRow(prisma, {
      email,
      password: USER_PASSWORD,
      role: 'user',
    });
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/v1/auth/login')
      .send({ email, password: USER_PASSWORD })
      .expect(200);

    // druga sesja (inne urządzenie) — po rotacji jej refresh ma paść
    const other = request.agent(app.getHttpServer());
    await other
      .post('/api/v1/auth/login')
      .send({ email, password: USER_PASSWORD })
      .expect(200);

    const wrong = await agent
      .patch('/api/v1/auth/me/password')
      .send({
        currentPassword: 'WrongPassword1!',
        newPassword: NEW_PASSWORD,
      })
      .expect(401);
    expect(wrong.body.code).toBe('INVALID_PASSWORD');
    await agent.get('/api/v1/auth/me').expect(200);

    const changed = await agent
      .patch('/api/v1/auth/me/password')
      .send({
        currentPassword: USER_PASSWORD,
        newPassword: NEW_PASSWORD,
      })
      .expect(200);
    expect(changed.body).toEqual({
      id: userId,
      email,
      role: 'user',
    });
    const rotated = setCookieHeaders(changed);
    expect(rotated).toMatch(/cc_access=/);
    expect(rotated).toMatch(/cc_refresh=/);

    // keep-session na tym agencie (nowe cookie)
    await agent.get('/api/v1/auth/me').expect(200);

    // poprzednia sesja: refresh → 401 (revoke-all)
    await other.post('/api/v1/auth/refresh').expect(401);

    await prisma.refreshSession.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
  });

  it('D-93 + D-94: admin 403; user soft; guest live 409; guest email 403; Users DELETE', async () => {
    const adminForbidden = await admin
      .delete('/api/v1/auth/me')
      .send({ currentPassword: E2E_ADMIN_CREDENTIALS.password })
      .expect(403);
    expect(adminForbidden.body.code).toBe('FORBIDDEN');

    const email = `e2e-selfsvc-del-${randomUUID()}@content-chain.test`;
    const userId = await createUserRow(prisma, {
      email,
      password: USER_PASSWORD,
      role: 'user',
    });
    const userAgent = request.agent(app.getHttpServer());
    await userAgent
      .post('/api/v1/auth/login')
      .send({ email, password: USER_PASSWORD })
      .expect(200);

    const deleted = await userAgent
      .delete('/api/v1/auth/me')
      .send({ currentPassword: USER_PASSWORD })
      .expect(200);
    expect(deleted.body).toEqual({ ok: true });
    expect(setCookieHeaders(deleted)).toMatch(/cc_access=/);

    const row = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    expect(row.isActive).toBe(false);
    await userAgent.get('/api/v1/auth/me').expect(401);
    await prisma.refreshSession.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });

    const guestId = await createUserRow(prisma, {
      email: GUEST_EMAIL,
      password: GUEST_PASSWORD,
      role: 'guest',
    });
    const guestAgent = request.agent(app.getHttpServer());
    await guestAgent
      .post('/api/v1/auth/login')
      .send({ email: GUEST_EMAIL, password: GUEST_PASSWORD })
      .expect(200);

    const liveRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: liveRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'running',
        brief: { topic: 'auth-self-service-e2e' },
        startedByUserId: guestId,
      },
    });

    const guestLive = await guestAgent
      .delete('/api/v1/auth/me')
      .send({ currentPassword: GUEST_PASSWORD })
      .expect(409);
    expect(guestLive.body.code).toBe('GUEST_HAS_ACTIVE_RUN');
    expect(
      await prisma.user.findUnique({ where: { id: guestId } }),
    ).not.toBeNull();

    const guestEmail = await guestAgent
      .patch('/api/v1/auth/me/email')
      .send({
        email: `guest-new-${randomUUID()}@content-chain.test`,
        currentPassword: GUEST_PASSWORD,
      })
      .expect(403);
    expect(guestEmail.body.code).toBe('FORBIDDEN');

    await admin
      .delete(`/api/v1/users/${guestId}`)
      .query({ purge: 'true' })
      .expect(200);
    const gone = await prisma.user.findUnique({ where: { id: guestId } });
    expect(gone).toBeNull();
  });
});
