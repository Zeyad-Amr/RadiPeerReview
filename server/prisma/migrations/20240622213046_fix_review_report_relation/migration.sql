/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Report` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reportId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reviewId_fkey";

-- DropIndex
DROP INDEX "Report_reviewId_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "reportId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Review_reportId_key" ON "Review"("reportId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
