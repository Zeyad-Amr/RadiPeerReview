/*
  Warnings:

  - You are about to drop the column `name` on the `ReviewRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "isdeactivated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ReviewRequest" DROP COLUMN "name";
