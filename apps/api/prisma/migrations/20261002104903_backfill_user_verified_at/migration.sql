-- Backfill: istniejące konta (bootstrap / accept-invite) traktuj jako zweryfikowane.
-- SPEC-PERSISTENCE P-5; feature plan FAZA 1 / KROK 1 (F-01).
UPDATE "User" SET "verifiedAt" = "createdAt" WHERE "verifiedAt" IS NULL;
