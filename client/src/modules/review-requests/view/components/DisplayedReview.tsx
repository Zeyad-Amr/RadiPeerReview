import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ReviewDataInterface } from "../../interfaces/review-interface";
import RateReviewIcon from "@mui/icons-material/RateReview";
interface DisplayedReviewProps {
  reviewEl: ReviewDataInterface | null;
  setReviewData: (reviewData: any) => void;
  setRightSectionFlag: Dispatch<
    SetStateAction<"report-details" | "review-details" | "create-review">
  >;
  role: string | null;
}

const DisplayedReview = ({
  setRightSectionFlag,
  setReviewData,
  reviewEl,
  role,
}: DisplayedReviewProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 6,
          paddingLeft: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 3,
            // paddingLeft: 2,
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
            {/* review data */}
            {reviewEl ? (
              <>
                <Typography sx={{ fontSize: "13px" }} color="textSecondary">
                  Overall Score :{" "}
                  {reviewEl?.overallAssessment?.overallQuality ??
                    "No Data Available"}
                </Typography>
                {/* <Typography sx={{ fontSize: "13px" }} color="textSecondary">
                  Accuracy of impression :{" "}
                  {reviewEl?.impressionAndRecommendations?.accuracyOfImpression
                    ? "Yes"
                    : "No"}
                </Typography> */}
              </>
            ) : (
              // no review data
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={(e: any) => {
                  if (role === "reviewer") {
                    e.stopPropagation();
                    e.preventDefault();
                    setRightSectionFlag("create-review");
                  }
                }}
              >
                <Typography
                  sx={{ textAlign: "center", fontSize: "13px" }}
                  color="textSecondary"
                >
                  Not Reviewed Yet
                </Typography>
                {role === "reviewer" ? (
                  <RateReviewIcon
                    sx={{
                      color: "primary.light",
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                    }}
                  />
                ) : null}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DisplayedReview;
