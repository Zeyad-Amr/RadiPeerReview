import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import { ReviewDataInterface } from "../../interfaces/review-interface";

interface DisplayedReviewProps {
  reviewEl: ReviewDataInterface | null;
  setReviewData: (reviewData: any) => void;
  setRightSectionFlag: Dispatch<
    SetStateAction<"report-details" | "review-details" | "create-review">
  >;
}

const DisplayedReview = ({
  setRightSectionFlag,
  setReviewData,
  reviewEl,
}: DisplayedReviewProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 6,
        paddingLeft: 2,
      }}
    >
      <Box
        sx={{
          marginLeft: 2,
          padding: "0.7rem",
          borderRadius: "10px",
          width: "72.2%",
          backgroundColor: "primary.lighter",
          cursor: reviewEl ? "pointer" : "default",
        }}
        onClick={() => {
          if (reviewEl) {
            setReviewData(reviewEl);
            setRightSectionFlag("review-details");
          }
        }}
      >
        {reviewEl ? (
          <>
            <Typography sx={{ fontSize: "13px" }} color="textSecondary">
              Completeness of report :{" "}
              {reviewEl?.clarityAndCompleteness?.completenessOfReport ??
                "No Data Available"}
            </Typography>
            <Typography sx={{ fontSize: "13px" }} color="textSecondary">
              Accuracy of impression :{" "}
              {reviewEl?.impressionAndRecommendations?.accuracyOfImpression
                ? "Yes"
                : "No"}
            </Typography>
          </>
        ) : (
          <Typography
            sx={{ textAlign: "center", fontSize: "13px" }}
            color="textSecondary"
          >
            Not Reviewed Yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DisplayedReview;
