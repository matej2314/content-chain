-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conversationId" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "brief" JSONB NOT NULL,
    "selectedIdeaIds" JSONB,
    "startedByUserId" TEXT,
    "pipelinePhase" TEXT,
    "ideasRefineCount" INTEGER NOT NULL DEFAULT 0,
    "contentRefineCount" INTEGER NOT NULL DEFAULT 0,
    "recoveryAttempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Run_startedByUserId_fkey" FOREIGN KEY ("startedByUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Run" ("brief", "conversationId", "createdAt", "id", "language", "platform", "recoveryAttempts", "selectedIdeaIds", "startedByUserId", "status", "taskType", "updatedAt") SELECT "brief", "conversationId", "createdAt", "id", "language", "platform", "recoveryAttempts", "selectedIdeaIds", "startedByUserId", "status", "taskType", "updatedAt" FROM "Run";
DROP TABLE "Run";
ALTER TABLE "new_Run" RENAME TO "Run";
CREATE INDEX "Run_createdAt_idx" ON "Run"("createdAt");
CREATE INDEX "Run_status_idx" ON "Run"("status");
CREATE INDEX "Run_taskType_idx" ON "Run"("taskType");
CREATE INDEX "Run_platform_idx" ON "Run"("platform");
CREATE INDEX "Run_startedByUserId_idx" ON "Run"("startedByUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
