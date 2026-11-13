/*
  Warnings:

  - A unique constraint covering the columns `[pendingEmail]` on the table `EmailChangeRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailChangeRequest_pendingEmail_key" ON "EmailChangeRequest"("pendingEmail");
