/*
  Warnings:

  - You are about to drop the column `reportId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reportId_fkey";

-- DropIndex
DROP INDEX "Review_reportId_key";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "reviewId" TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "reportId";

-- CreateIndex
CREATE UNIQUE INDEX "Report_reviewId_key" ON "Report"("reviewId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
