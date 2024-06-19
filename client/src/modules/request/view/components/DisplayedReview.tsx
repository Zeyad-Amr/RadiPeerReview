import React from "react";
import { Box, Typography } from "@mui/material";

interface DisplayedReviewProps {
  content: string;
  time: string;
}

const DisplayedReview: React.FC<DisplayedReviewProps> = ({ content, time }) => {
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
          padding: "0.5rem",
          borderRadius: "10px",
          width: "72.2%",
          backgroundColor: "primary.lighter",
          cursor: "pointer",
        }}
      >
        <Typography variant="body1">
          Review
        </Typography>
        <Typography variant="body2" color="textSecondary">{content}</Typography>
      </Box>
    </Box>
  );
};

export default DisplayedReview;
