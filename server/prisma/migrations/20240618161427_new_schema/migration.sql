/*
  Warnings:

  - The values [DOCTOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `AccuracyOfFindings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `doctorId` on the `Auth` table. All the data in the column will be lost.
  - The primary key for the `ClarityAndCompleteness` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ComplianceAndStandardization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ImpressionAndRecommendations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OverallAssessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creatorId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `reviewRequestId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviwerId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `ReviewRequest` table. All the data in the column will be lost.
  - The primary key for the `TechnicalQuality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[radiologistId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accuracyOfFindingsId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clarityAndCompletenessId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[impressionAndRecommendationsId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technicalQualityId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[overallAssessmentId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[complianceAndStandardizationId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewRequestId` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `ReviewRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('NEURORADIOLOGY', 'MUSCULOSKELETAL_RADIOLOGY', 'ABDOMINAL_RADIOLOGY', 'CARDIOVASCULAR_RADIOLOGY', 'BREAST_IMAGING', 'PEDIATRIC_RADIOLOGY', 'THORACIC_RADIOLOGY', 'GENITOURINARY_RADIOLOGY', 'INTERVENTIONAL_RADIOLOGY', 'NUCLEAR_MEDICINE', 'EMERGENCY_RADIOLOGY', 'ONCOLOGIC_IMAGING', 'GASTROINTESTINAL_RADIOLOGY', 'HEAD_AND_NECK_RADIOLOGY', 'ORTHOPEDIC_RADIOLOGY', 'VASCULAR_AND_INTERVENTIONAL_RADIOLOGY', 'ENDOVASCULAR_SURGICAL_NEURORADIOLOGY', 'BODY_IMAGING');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'RADIOLOGIST');
ALTER TABLE "Auth" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Auth" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Auth" ALTER COLUMN "role" SET DEFAULT 'RADIOLOGIST';
COMMIT;

-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "MissedFinding" DROP CONSTRAINT "MissedFinding_accuracyOfFindingsId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_accuracyOfFindingsId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_clarityAndCompletenessId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_complianceAndStandardizationId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_impressionAndRecommendationsId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_overallAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviwerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_technicalQualityId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewRequest" DROP CONSTRAINT "ReviewRequest_reportId_fkey";

-- DropIndex
DROP INDEX "Auth_doctorId_key";

-- AlterTable
ALTER TABLE "AccuracyOfFindings" DROP CONSTRAINT "AccuracyOfFindings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AccuracyOfFindings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AccuracyOfFindings_id_seq";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "doctorId",
ADD COLUMN     "radiologistId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'RADIOLOGIST';

-- AlterTable
ALTER TABLE "ClarityAndCompleteness" DROP CONSTRAINT "ClarityAndCompleteness_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ClarityAndCompleteness_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ClarityAndCompleteness_id_seq";

-- AlterTable
ALTER TABLE "ComplianceAndStandardization" DROP CONSTRAINT "ComplianceAndStandardization_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ComplianceAndStandardization_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ComplianceAndStandardization_id_seq";

-- AlterTable
ALTER TABLE "ImpressionAndRecommendations" DROP CONSTRAINT "ImpressionAndRecommendations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ImpressionAndRecommendations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ImpressionAndRecommendations_id_seq";

-- AlterTable
ALTER TABLE "MissedFinding" ALTER COLUMN "accuracyOfFindingsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "OverallAssessment" DROP CONSTRAINT "OverallAssessment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OverallAssessment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OverallAssessment_id_seq";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "creatorId",
ADD COLUMN     "reviewId" TEXT NOT NULL,
ADD COLUMN     "reviewRequestId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "reviewRequestId",
DROP COLUMN "reviwerId",
ALTER COLUMN "accuracyOfFindingsId" SET DATA TYPE TEXT,
ALTER COLUMN "clarityAndCompletenessId" SET DATA TYPE TEXT,
ALTER COLUMN "impressionAndRecommendationsId" SET DATA TYPE TEXT,
ALTER COLUMN "technicalQualityId" SET DATA TYPE TEXT,
ALTER COLUMN "overallAssessmentId" SET DATA TYPE TEXT,
ALTER COLUMN "complianceAndStandardizationId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ReviewRequest" DROP COLUMN "reportId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "reviewerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechnicalQuality" DROP CONSTRAINT "TechnicalQuality_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TechnicalQuality_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TechnicalQuality_id_seq";

-- DropTable
DROP TABLE "Doctor";

-- CreateTable
CREATE TABLE "Radiologist" (
    "id" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specializations" "Specialization"[],
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Radiologist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Radiologist_email_key" ON "Radiologist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Radiologist_phone_key" ON "Radiologist"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_radiologistId_key" ON "Auth"("radiologistId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_accuracyOfFindingsId_key" ON "Review"("accuracyOfFindingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_clarityAndCompletenessId_key" ON "Review"("clarityAndCompletenessId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_impressionAndRecommendationsId_key" ON "Review"("impressionAndRecommendationsId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_technicalQualityId_key" ON "Review"("technicalQualityId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_overallAssessmentId_key" ON "Review"("overallAssessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_complianceAndStandardizationId_key" ON "Review"("complianceAndStandardizationId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_radiologistId_fkey" FOREIGN KEY ("radiologistId") REFERENCES "Radiologist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reviewRequestId_fkey" FOREIGN KEY ("reviewRequestId") REFERENCES "ReviewRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Radiologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Radiologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_accuracyOfFindingsId_fkey" FOREIGN KEY ("accuracyOfFindingsId") REFERENCES "AccuracyOfFindings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clarityAndCompletenessId_fkey" FOREIGN KEY ("clarityAndCompletenessId") REFERENCES "ClarityAndCompleteness"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_impressionAndRecommendationsId_fkey" FOREIGN KEY ("impressionAndRecommendationsId") REFERENCES "ImpressionAndRecommendations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_technicalQualityId_fkey" FOREIGN KEY ("technicalQualityId") REFERENCES "TechnicalQuality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_overallAssessmentId_fkey" FOREIGN KEY ("overallAssessmentId") REFERENCES "OverallAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_complianceAndStandardizationId_fkey" FOREIGN KEY ("complianceAndStandardizationId") REFERENCES "ComplianceAndStandardization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissedFinding" ADD CONSTRAINT "MissedFinding_accuracyOfFindingsId_fkey" FOREIGN KEY ("accuracyOfFindingsId") REFERENCES "AccuracyOfFindings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
