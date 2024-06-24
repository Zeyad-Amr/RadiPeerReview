import { Box } from "@mui/system";
import React from "react";
import ReviewTag from "./ReviewTag";
import PageTitle from "@/core/shared/components/PageTitle";
import { Typography } from "@mui/material";
import ReviewResultHeader from "./ReviewResultHeader";
import ReviewResultRow from "./ReviewResultRow";
import ErrorsRow from "./ErrorsRow";
import Br from "./Br";
import ReviewResultFooter from "./ReviewResultFooter";
import { ReviewDataInterface } from "@/modules/radiologist/interfaces/review-interface";
import { GetReportInterface } from "@/modules/radiologist/interfaces/request-interface";

// const data = {
//   id: 1,
//   accuracyOfFindings: {
//     correctnessOfFindings: false,
//     commentsOnAccuracy: "The findings were not accurately described.",
//     missedFindings: [
//       {
//         id: 1,
//         description: "Small lesion in the lower left lobe was missed."
//       },
//       {
//         id: 2,
//         description: "Presence of fluid collection in the abdomen was not mentioned."
//       }
//     ]
//   },
//   clarityAndCompleteness: {
//     clarityOfLanguage: 4,
//     commentsOnLanguage: "The language used was clear and easy to understand.",
//     completenessOfReport: 3,
//     commentsOnCompleteness: "Some additional details could have been included for better clarity."
//   },
//   impressionAndRecommendations: {
//     accuracyOfImpression: true,
//     commentsOnImpression: "The diagnostic impression was accurate.",
//     appropriatenessOfRecommendations: 4,
//     suggestionsForRecommendations: "Consider providing more detailed recommendations for follow-up."
//   },
//   technicalQuality: {
//     imagingTechnique: 5,
//     commentsOnTechnique: "The imaging technique used was appropriate for the diagnosis.",
//     imageQuality: 4,
//     commentsOnImageQuality: "The image quality was generally good, but some areas could be clearer."
//   },
//   overallAssessment: {
//     overallQuality: 4,
//     generalComments: "Overall, the report was well-written and informative."
//   },
//   complianceAndStandardization: {
//     adherenceToGuidelines: true,
//     commentsOnCompliance: "The report adhered to standard reporting guidelines."
//   },
//   feedbackToRadiologist: "Excellent job on describing the findings accurately. Consider providing more comprehensive recommendations in future reports.",
//   additionalReviewerComments: "The radiologist should pay closer attention to small lesions and mention all relevant findings in the report."
// }

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
