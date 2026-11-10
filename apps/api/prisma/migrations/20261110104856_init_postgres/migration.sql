-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountActivation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountActivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyContext" (
    "id" TEXT NOT NULL,
    "identityName" TEXT NOT NULL DEFAULT '',
    "identityDescription" TEXT NOT NULL DEFAULT '',
    "offerItems" JSONB NOT NULL DEFAULT '[]',
    "voiceWeDo" TEXT NOT NULL DEFAULT '',
    "voiceWeDont" TEXT NOT NULL DEFAULT '',
    "ctaItems" JSONB NOT NULL DEFAULT '[]',
    "audienceProfiles" JSONB NOT NULL DEFAULT '[]',
    "extras" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyContext_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "brief" JSONB NOT NULL,
    "selectedIdeaIds" JSONB,
    "startedByUserId" TEXT,
    "pipelinePhase" TEXT,
    "contentKind" TEXT,
    "outlineRefineCount" INTEGER NOT NULL DEFAULT 0,
    "copyRefineCount" INTEGER NOT NULL DEFAULT 0,
    "ideasRefineCount" INTEGER NOT NULL DEFAULT 0,
    "contentRefineCount" INTEGER NOT NULL DEFAULT 0,
    "recoveryAttempts" INTEGER NOT NULL DEFAULT 0,
    "userRating" INTEGER,
    "outputEdited" BOOLEAN NOT NULL DEFAULT false,
    "reviewFinalizedAt" TIMESTAMP(3),
    "pipelineFinishedAt" TIMESTAMP(3),
    "cancelRequested" BOOLEAN NOT NULL DEFAULT false,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunLog" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "conversationId" TEXT,
    "at" TIMESTAMP(3) NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "step" TEXT,
    "requestId" TEXT,

    CONSTRAINT "RunLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialIdea" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialIdea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialContent" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verification" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialReelIdea" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialReelIdea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialReelScript" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verification" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialReelScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentOutline" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentOutline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentDocument" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "verification" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "agentKey" TEXT,
    "runId" TEXT,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_userId_key" ON "AccountActivation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_tokenHash_key" ON "AccountActivation"("tokenHash");

-- CreateIndex
CREATE INDEX "AccountActivation_expiresAt_idx" ON "AccountActivation"("expiresAt");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_idx" ON "RefreshSession"("userId");

-- CreateIndex
CREATE INDEX "Run_createdAt_idx" ON "Run"("createdAt");

-- CreateIndex
CREATE INDEX "Run_status_idx" ON "Run"("status");

-- CreateIndex
CREATE INDEX "Run_taskType_idx" ON "Run"("taskType");

-- CreateIndex
CREATE INDEX "Run_platform_idx" ON "Run"("platform");

-- CreateIndex
CREATE INDEX "Run_startedByUserId_idx" ON "Run"("startedByUserId");

-- CreateIndex
CREATE INDEX "Run_reviewFinalizedAt_pipelineFinishedAt_idx" ON "Run"("reviewFinalizedAt", "pipelineFinishedAt");

-- CreateIndex
CREATE INDEX "RunLog_runId_at_idx" ON "RunLog"("runId", "at");

-- CreateIndex
CREATE INDEX "SocialIdea_runId_idx" ON "SocialIdea"("runId");

-- CreateIndex
CREATE INDEX "SocialContent_runId_idx" ON "SocialContent"("runId");

-- CreateIndex
CREATE INDEX "SocialReelIdea_runId_idx" ON "SocialReelIdea"("runId");

-- CreateIndex
CREATE INDEX "SocialReelScript_runId_idx" ON "SocialReelScript"("runId");

-- CreateIndex
CREATE INDEX "ContentOutline_runId_idx" ON "ContentOutline"("runId");

-- CreateIndex
CREATE INDEX "ContentDocument_runId_idx" ON "ContentDocument"("runId");

-- CreateIndex
CREATE INDEX "Feedback_authorId_idx" ON "Feedback"("authorId");

-- CreateIndex
CREATE INDEX "Feedback_runId_idx" ON "Feedback"("runId");

-- AddForeignKey
ALTER TABLE "AccountActivation" ADD CONSTRAINT "AccountActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_startedByUserId_fkey" FOREIGN KEY ("startedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunLog" ADD CONSTRAINT "RunLog_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialIdea" ADD CONSTRAINT "SocialIdea_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialContent" ADD CONSTRAINT "SocialContent_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialReelIdea" ADD CONSTRAINT "SocialReelIdea_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialReelScript" ADD CONSTRAINT "SocialReelScript_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentOutline" ADD CONSTRAINT "ContentOutline_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentDocument" ADD CONSTRAINT "ContentDocument_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Partial uniques — Prisma 6 schema cannot declare them (SPEC-AUTH / SPEC-PERSISTENCE P-7).
-- Ported from migrations_sqlite_archive (User_one_admin, Invitation_one_pending_email).
CREATE UNIQUE INDEX "User_one_admin" ON "User"("role") WHERE "role" = 'admin';
CREATE UNIQUE INDEX "Invitation_one_pending_email" ON "Invitation"("email") WHERE "status" = 'pending';
