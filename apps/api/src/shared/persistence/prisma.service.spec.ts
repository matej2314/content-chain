import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('is a PrismaClient subclass', () => {
    expect(Object.getPrototypeOf(PrismaService)).toBe(PrismaClient);
    expect(typeof PrismaService.prototype.onModuleInit).toBe('function');
    expect(typeof PrismaService.prototype.onModuleDestroy).toBe('function');
  });
});
