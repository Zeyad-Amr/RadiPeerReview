import React from "react";
import { Box, Typography } from "@mui/material";
import { ReviewDataInterface } from "../../interfaces/review-interface";

interface DisplayedReviewProps {
  reviewData: ReviewDataInterface | null;
}

const DisplayedReview = ({ reviewData }: DisplayedReviewProps) => {
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
          cursor: "pointer",
        }}
      >
        {reviewData ? (
          <>
            <Typography sx={{fontSize : "13px" }} color="textSecondary">
            Completeness of report : {reviewData?.clarityAndCompleteness?.completenessOfReport ?? "No Data Available"}
            </Typography>
            <Typography sx={{fontSize : "13px" }} color="textSecondary">
            Accuracy of impression : {reviewData?.impressionAndRecommendations?.accuracyOfImpression ? "Yes" : "No"}
            </Typography>
          </>
        ) : (
          <Typography sx={{ textAlign : "center" , fontSize : "15px" }} color="textSecondary">Not Reviewed Yet</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DisplayedReview;
