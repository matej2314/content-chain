-- AlterTable
ALTER TABLE "User" ADD COLUMN "verifiedAt" DATETIME;

-- CreateTable
CREATE TABLE "AccountActivation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccountActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_userId_key" ON "AccountActivation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountActivation_tokenHash_key" ON "AccountActivation"("tokenHash");

-- CreateIndex
CREATE INDEX "AccountActivation_expiresAt_idx" ON "AccountActivation"("expiresAt");
