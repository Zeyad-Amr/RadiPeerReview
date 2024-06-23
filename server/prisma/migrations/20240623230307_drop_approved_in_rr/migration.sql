/*
  Warnings:

  - You are about to drop the column `approved` on the `ReviewRequest` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'Completed';

-- AlterTable
ALTER TABLE "ReviewRequest" DROP COLUMN "approved";
