import { Box } from "@mui/system";
import React from "react";
import ReviewTag from "./ReviewTag";

import ReviewResultHeader from "./ReviewResultHeader";
import ReviewResultRow from "./ReviewResultRow";
import ErrorsRow from "./ErrorsRow";
import Br from "./Br";
import ReviewResultFooter from "./ReviewResultFooter";
import { ReviewDataInterface } from "@/modules/review-requests/interfaces/review-interface";
import { GetReportInterface } from "@/modules/review-requests/interfaces/request-interface";


interface ReviewResultPropsInterface {
  reviewDetails: ReviewDataInterface;
  reportDetails: GetReportInterface;
}

const ReviewResult = ({
  reviewDetails,
  reportDetails,
}: ReviewResultPropsInterface) => {
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "210 / 297",
        backgroundColor: "white",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <ReviewResultHeader
        overallAssessment={reviewDetails.overallAssessment}
        reportCreatedAt={reportDetails.createdAt}
      />
      {reviewDetails.accuracyOfFindings && (
        <ReviewResultRow
          title="Accuracy Of Findings"
          comment={reviewDetails.accuracyOfFindings.commentsOnAccuracy}
          tag={
            <ReviewTag
              text={
                reviewDetails.accuracyOfFindings.correctnessOfFindings
                  ? "Succeeded"
                  : "Failed"
              }
              type="result"
              variant={
                reviewDetails.accuracyOfFindings.correctnessOfFindings
                  ? "success"
                  : "fail"
              }
            />
          }
        />
      )}
      {reviewDetails.accuracyOfFindings.missedFindings.length > 0 && (
        <ErrorsRow
          missedFindings={reviewDetails.accuracyOfFindings.missedFindings}
          title="Missed Findings"
        />
      )}
      <Br />
      {reviewDetails.clarityAndCompleteness && (
        <>
          <ReviewResultRow
            title="Clarity Of Language"
            tag={
              <ReviewTag
                text={reviewDetails.clarityAndCompleteness.clarityOfLanguage}
                type="score"
              />
            }
            comment={reviewDetails.clarityAndCompleteness.commentsOnLanguage}
          />

          <ReviewResultRow
            sx={{ mt: 2 }}
            title="Completeness Of Report"
            tag={
              <ReviewTag
                text={reviewDetails.clarityAndCompleteness.completenessOfReport}
                type="score"
              />
            }
            comment={
              reviewDetails.clarityAndCompleteness.commentsOnCompleteness
            }
          />
        </>
      )}
      <Br />
      {reviewDetails.impressionAndRecommendations && (
        <>
          <ReviewResultRow
            title="Accuracy Of Impression"
            tag={
              <ReviewTag
                text={
                  reviewDetails.impressionAndRecommendations
                    .accuracyOfImpression
                    ? "Succeeded"
                    : "Failed"
                }
                type="result"
                variant={
                  reviewDetails.impressionAndRecommendations
                    .accuracyOfImpression
                    ? "success"
                    : "fail"
                }
              />
            }
            comment={
              reviewDetails.impressionAndRecommendations.commentsOnImpression
            }
          />

          <ReviewResultRow
            sx={{ mt: 2 }}
            title="Completeness Of Report"
            tag={
              <ReviewTag
                text={
                  reviewDetails.impressionAndRecommendations
                    .appropriatenessOfRecommendations
                }
                type="score"
              />
            }
            comment={
              reviewDetails.impressionAndRecommendations
                .suggestionsForRecommendations
            }
            suggestion
          />
        </>
      )}
      <Br />
      {reviewDetails.technicalQuality && (
        <>
          <ReviewResultRow
            title="Imaging Technique"
            tag={
              <ReviewTag
                text={reviewDetails.technicalQuality.imagingTechnique}
                type="score"
              />
            }
            comment={reviewDetails.technicalQuality.commentsOnTechnique}
          />
          <ReviewResultRow
            sx={{ mt: 2 }}
            title="Completeness Of Report"
            tag={
              <ReviewTag
                text={reviewDetails.technicalQuality.imageQuality}
                type="score"
              />
            }
            comment={reviewDetails.technicalQuality.commentsOnImageQuality}
          />
        </>
      )}
      <Br />
      {reviewDetails.complianceAndStandardization && (
        <>
          <ReviewResultRow
            title="Compliance And Standardization"
            tag={
              <ReviewTag
                text={
                  reviewDetails.complianceAndStandardization
                    .adherenceToGuidelines
                    ? "Succeeded"
                    : "Failed"
                }
                type="result"
                variant={
                  reviewDetails.complianceAndStandardization
                    .adherenceToGuidelines
                    ? "success"
                    : "fail"
                }
              />
            }
            comment={
              reviewDetails.complianceAndStandardization.commentsOnCompliance
            }
          />
        </>
      )}
      <Br />
      <ReviewResultFooter
        comment={reviewDetails.additionalReviewerComments}
        feedback={reviewDetails.feedbackToRadiologist}
      />
    </Box>
  );
};

export default ReviewResult;
