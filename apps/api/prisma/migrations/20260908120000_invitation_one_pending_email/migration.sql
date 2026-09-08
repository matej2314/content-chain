-- Unique index `Invitation_one_pending_email` (status = 'pending') — SPEC-AUTH A-7d / SPEC-PERSISTENCE D17.
-- Partial unique is not expressible in Prisma 6 schema (preview `partialIndexes` is Prisma 7.4+).
-- Index without `purpose`. Expired rows stay status = 'pending' and still block a second POST.
CREATE UNIQUE INDEX "Invitation_one_pending_email" ON "Invitation"("email") WHERE "status" = 'pending';
