/*
  Warnings:

  - Added the required column `name` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewRequest" ADD COLUMN     "name" TEXT NOT NULL;
