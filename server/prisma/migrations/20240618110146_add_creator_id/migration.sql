/*
  Warnings:

  - Added the required column `creatorId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviwerId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "reviwerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviwerId_fkey" FOREIGN KEY ("reviwerId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
