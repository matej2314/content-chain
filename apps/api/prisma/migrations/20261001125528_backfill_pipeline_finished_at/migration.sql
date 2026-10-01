-- Backfill B (SPEC-PERSISTENCE P-5 / SPEC-RUNY R-10).
-- Sets pipelineFinishedAt once for legacy completed|failed rows.
-- Does NOT set reviewFinalizedAt (sweeper owns durable lock).
UPDATE "Run"
SET "pipelineFinishedAt" = COALESCE("updatedAt", "createdAt")
WHERE "status" IN ('completed', 'failed')
  AND "pipelineFinishedAt" IS NULL;
