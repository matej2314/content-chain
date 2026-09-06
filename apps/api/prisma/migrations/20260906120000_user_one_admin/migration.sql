-- Enforce at most one User with role = 'admin' (SPEC-AUTH A-1).
-- Partial unique is not expressible in Prisma 6 schema (preview `partialIndexes` is Prisma 7.4+).
CREATE UNIQUE INDEX "User_one_admin" ON "User"("role") WHERE "role" = 'admin';
