import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('is a PrismaClient subclass', () => {
    const service = new PrismaService();
    expect(service).toBeInstanceOf(PrismaService);
  });
});
