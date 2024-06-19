/*
  Warnings:

  - You are about to drop the column `radiologistId` on the `Report` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_radiologistId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "radiologistId";
