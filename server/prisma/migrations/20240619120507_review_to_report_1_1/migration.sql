/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Report_reviewId_key" ON "Report"("reviewId");
