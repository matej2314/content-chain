import { execFileSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { hash as bcryptHash } from 'bcrypt';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../src/runs/domain/guest-quota.port';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  createAuthenticatedAgent,
  type E2eAgent,
} from './authenticated-agent';

const USER_CREDS = {
  email: `e2e-users-list-user-${randomUUID()}@content-chain.test`,
  password: 'E2eUsersListUser12!',
} as const;

const GUEST_CREDS = {
  email: `e2e-users-list-guest-${randomUUID()}@content-chain.test`,
  password: 'E2eUsersListGuest12!',
} as const;

type UserListItem = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  verifiedAt: string | null;
  createdAt: string;
};

type UsersListBody = {
  page: number;
  pageSize: number;
  total: number;
  items: UserListItem[];
};

function deployTestDb(): void {
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readUserListItem(value: unknown): UserListItem {
  if (!isRecord(value)) {
    throw new Error('users list item is not an object');
  }
  if (typeof value.id !== 'string') {
    throw new Error('users item.id is not a string');
  }
  if (typeof value.email !== 'string') {
    throw new Error('users item.email is not a string');
  }
  if (typeof value.role !== 'string') {
    throw new Error('users item.role is not a string');
  }
  if (typeof value.isActive !== 'boolean') {
    throw new Error('users item.isActive is not a boolean');
  }
  if (value.verifiedAt !== null && typeof value.verifiedAt !== 'string') {
    throw new Error('users item.verifiedAt is not string | null');
  }
  if (typeof value.createdAt !== 'string') {
    throw new Error('users item.createdAt is not a string');
  }
  if ('passwordHash' in value) {
    throw new Error('users item leaked passwordHash');
  }
  return {
    id: value.id,
    email: value.email,
    role: value.role,
    isActive: value.isActive,
    verifiedAt: value.verifiedAt,
    createdAt: value.createdAt,
  };
}

function readUsersListBody(body: unknown): UsersListBody {
  if (!isRecord(body)) {
    throw new Error('users list body is not an object');
  }
  if (typeof body.page !== 'number') {
    throw new Error('users list body.page is not a number');
  }
  if (typeof body.pageSize !== 'number') {
    throw new Error('users list body.pageSize is not a number');
  }
  if (typeof body.total !== 'number') {
    throw new Error('users list body.total is not a number');
  }
  if (!Array.isArray(body.items)) {
    throw new Error('users list body.items is not an array');
  }
  return {
    page: body.page,
    pageSize: body.pageSize,
    total: body.total,
    items: body.items.map(readUserListItem),
  };
}

async function createUserRow(
  prisma: PrismaService,
  input: {
    email: string;
    password: string;
    role: 'user' | 'guest';
    createdAt: Date;
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
      createdAt: input.createdAt,
    },
  });
  return id;
}

describe('Users list pagination (e2e)', () => {
  let app: INestApplication;
  let admin: E2eAgent;
  let prisma: PrismaService;
  let userId: string;
  let guestId: string;
  let seededEmails: string[];
  let envSnapshot: Record<
    'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT',
    string | undefined
  >;
  const quota: GuestQuotaPort = {
    tryAdmitDailyRun: async () => ({ kind: 'ok' }),
    releaseDailyRun: async () => undefined,
    tryAdmitDailyRating: async () => ({ kind: 'ok' }),
    deleteDailyRatings: async () => true,
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

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GUEST_QUOTA)
      .useValue(quota)
      .compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    admin = await createAuthenticatedAgent(app);

    seededEmails = [
      USER_CREDS.email,
      GUEST_CREDS.email,
      `e2e-users-list-extra-a-${randomUUID()}@content-chain.test`,
      `e2e-users-list-extra-b-${randomUUID()}@content-chain.test`,
    ];

    userId = await createUserRow(prisma, {
      email: USER_CREDS.email,
      password: USER_CREDS.password,
      role: 'user',
      createdAt: new Date('2026-01-02T10:00:00.000Z'),
    });
    guestId = await createUserRow(prisma, {
      email: GUEST_CREDS.email,
      password: GUEST_CREDS.password,
      role: 'guest',
      createdAt: new Date('2026-01-03T10:00:00.000Z'),
    });
    await createUserRow(prisma, {
      email: seededEmails[2]!,
      password: 'E2eUsersListExtraA12!',
      role: 'user',
      createdAt: new Date('2026-01-01T10:00:00.000Z'),
    });
    await createUserRow(prisma, {
      email: seededEmails[3]!,
      password: 'E2eUsersListExtraB12!',
      role: 'user',
      createdAt: new Date('2026-01-04T10:00:00.000Z'),
    });
  }, 30_000);

  afterAll(async () => {
    try {
      if (prisma) {
        for (const email of seededEmails) {
          const row = await prisma.user.findUnique({ where: { email } });
          if (row) {
            await prisma.refreshSession.deleteMany({
              where: { userId: row.id },
            });
            await prisma.user.delete({ where: { id: row.id } });
          }
        }
      }
      await app?.close();
    } finally {
      restoreEnv(envSnapshot);
    }
  }, 15_000);

  it('D-85: rejects unauthenticated and non-admin sessions', async () => {
    const anonymous = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(401);
    expect(anonymous.body.code).toBe('UNAUTHORIZED');

    const userAgent = request.agent(app.getHttpServer());
    await userAgent.post('/api/v1/auth/login').send(USER_CREDS).expect(200);
    const asUser = await userAgent.get('/api/v1/users').expect(403);
    expect(asUser.body.code).toBe('FORBIDDEN');

    const guestAgent = request.agent(app.getHttpServer());
    await guestAgent.post('/api/v1/auth/login').send(GUEST_CREDS).expect(200);
    const asGuest = await guestAgent.get('/api/v1/users').expect(403);
    expect(asGuest.body.code).toBe('FORBIDDEN');
  });

  it('D-85: admin all vs page modes, allowlist and createdAt desc', async () => {
    const all = readUsersListBody(
      (await admin.get('/api/v1/users').expect(200)).body,
    );
    expect(all.page).toBe(1);
    expect(all.pageSize).toBe(all.total);
    expect(all.items).toHaveLength(all.total);
    expect(all.total).toBeGreaterThanOrEqual(5);

    const createdAtValues = all.items.map((item) => item.createdAt);
    expect(createdAtValues).toEqual(
      [...createdAtValues].sort((left, right) => right.localeCompare(left)),
    );

    const seededIds = new Set(
      all.items
        .filter((item) => seededEmails.includes(item.email))
        .map((item) => item.id),
    );
    expect(seededIds.has(userId)).toBe(true);
    expect(seededIds.has(guestId)).toBe(true);

    const paged = readUsersListBody(
      (
        await admin
          .get('/api/v1/users')
          .query({ page: 1, pageSize: 10 })
          .expect(200)
      ).body,
    );
    expect(paged.page).toBe(1);
    expect(paged.pageSize).toBe(10);
    expect(paged.items.length).toBeLessThanOrEqual(10);
    expect(paged.total).toBe(all.total);

    for (const pageSize of [15, 25, 50] as const) {
      const allowed = readUsersListBody(
        (
          await admin
            .get('/api/v1/users')
            .query({ page: 1, pageSize })
            .expect(200)
        ).body,
      );
      expect(allowed.pageSize).toBe(pageSize);
      expect(allowed.items.length).toBeLessThanOrEqual(pageSize);
      expect(allowed.total).toBe(all.total);
    }

    const forbiddenSize = await admin
      .get('/api/v1/users')
      .query({ pageSize: 11 })
      .expect(400);
    expect(forbiddenSize.body.code).toBe('VALIDATION_FAILED');
  });
});
