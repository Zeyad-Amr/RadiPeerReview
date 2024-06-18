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
ALTER TABLE "Review" DROP CONSTRAINT "Review_technicalQualityId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "accuracyOfFindingsId" DROP NOT NULL,
ALTER COLUMN "clarityAndCompletenessId" DROP NOT NULL,
ALTER COLUMN "impressionAndRecommendationsId" DROP NOT NULL,
ALTER COLUMN "technicalQualityId" DROP NOT NULL,
ALTER COLUMN "overallAssessmentId" DROP NOT NULL,
ALTER COLUMN "complianceAndStandardizationId" DROP NOT NULL;

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
