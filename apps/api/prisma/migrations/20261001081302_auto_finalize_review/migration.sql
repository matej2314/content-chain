-- AlterTable
ALTER TABLE "Run" ADD COLUMN "pipelineFinishedAt" DATETIME;

-- CreateIndex
CREATE INDEX "Run_reviewFinalizedAt_pipelineFinishedAt_idx" ON "Run"("reviewFinalizedAt", "pipelineFinishedAt");
