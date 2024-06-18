-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Created', 'Assigned', 'Reviewed');

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DOCTOR';

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reportUrl" TEXT NOT NULL,
    "resultUrl" TEXT NOT NULL,
    "additionalComments" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewRequest" (
    "id" SERIAL NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "ReviewRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "reviewRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "feedbackToRadiologist" TEXT,
    "additionalReviewerComments" TEXT,
    "accuracyOfFindingsId" INTEGER NOT NULL,
    "clarityAndCompletenessId" INTEGER NOT NULL,
    "impressionAndRecommendationsId" INTEGER NOT NULL,
    "technicalQualityId" INTEGER NOT NULL,
    "overallAssessmentId" INTEGER NOT NULL,
    "complianceAndStandardizationId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccuracyOfFindings" (
    "id" SERIAL NOT NULL,
    "correctnessOfFindings" BOOLEAN NOT NULL,
    "commentsOnAccuracy" TEXT,

    CONSTRAINT "AccuracyOfFindings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissedFinding" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "accuracyOfFindingsId" INTEGER NOT NULL,

    CONSTRAINT "MissedFinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClarityAndCompleteness" (
    "id" SERIAL NOT NULL,
    "clarityOfLanguage" INTEGER NOT NULL,
    "commentsOnLanguage" TEXT,
    "completenessOfReport" INTEGER NOT NULL,
    "commentsOnCompleteness" TEXT,

    CONSTRAINT "ClarityAndCompleteness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImpressionAndRecommendations" (
    "id" SERIAL NOT NULL,
    "accuracyOfImpression" BOOLEAN NOT NULL,
    "commentsOnImpression" TEXT,
    "appropriatenessOfRecommendations" INTEGER NOT NULL,
    "suggestionsForRecommendations" TEXT,

    CONSTRAINT "ImpressionAndRecommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalQuality" (
    "id" SERIAL NOT NULL,
    "imagingTechnique" INTEGER NOT NULL,
    "commentsOnTechnique" TEXT,
    "imageQuality" INTEGER NOT NULL,
    "commentsOnImageQuality" TEXT,

    CONSTRAINT "TechnicalQuality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverallAssessment" (
    "id" SERIAL NOT NULL,
    "overallQuality" INTEGER NOT NULL,
    "generalComments" TEXT,

    CONSTRAINT "OverallAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceAndStandardization" (
    "id" SERIAL NOT NULL,
    "adherenceToGuidelines" BOOLEAN NOT NULL,
    "commentsOnCompliance" TEXT,

    CONSTRAINT "ComplianceAndStandardization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReviewRequest" ADD CONSTRAINT "ReviewRequest_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewRequestId_fkey" FOREIGN KEY ("reviewRequestId") REFERENCES "ReviewRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_accuracyOfFindingsId_fkey" FOREIGN KEY ("accuracyOfFindingsId") REFERENCES "AccuracyOfFindings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clarityAndCompletenessId_fkey" FOREIGN KEY ("clarityAndCompletenessId") REFERENCES "ClarityAndCompleteness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_impressionAndRecommendationsId_fkey" FOREIGN KEY ("impressionAndRecommendationsId") REFERENCES "ImpressionAndRecommendations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_technicalQualityId_fkey" FOREIGN KEY ("technicalQualityId") REFERENCES "TechnicalQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_overallAssessmentId_fkey" FOREIGN KEY ("overallAssessmentId") REFERENCES "OverallAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_complianceAndStandardizationId_fkey" FOREIGN KEY ("complianceAndStandardizationId") REFERENCES "ComplianceAndStandardization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "feedback_review_id_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissedFinding" ADD CONSTRAINT "MissedFinding_accuracyOfFindingsId_fkey" FOREIGN KEY ("accuracyOfFindingsId") REFERENCES "AccuracyOfFindings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
