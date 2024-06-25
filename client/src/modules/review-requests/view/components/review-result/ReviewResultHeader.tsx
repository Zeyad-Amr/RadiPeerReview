import { Box, Typography, alpha } from "@mui/material";
import React from "react";
import ReviewTag from "./ReviewTag";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AssistantRoundedIcon from "@mui/icons-material/AssistantRounded";
import Br from "./Br";
import { OverallAssessment } from "@/modules/review-requests/interfaces/review-interface";
interface ReviewResultHeaderProps {
  reportCreatedAt: string | null;
  overallAssessment: OverallAssessment;
}
const ReviewResultHeader = ({
  reportCreatedAt,
  overallAssessment,
}: ReviewResultHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "secondary.main",
          }}
        >
          {overallAssessment.overallQuality >= 3 ? (
            <CheckRoundedIcon />
          ) : (
            <BlockRoundedIcon />
          )}
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ color: "primary.light", fontSize: "0.8rem" }}>
              Review Result
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", color: "primary.main" }}>
              {reportCreatedAt ?? ""}
            </Typography>
          </Box>
        </Box>
        <ReviewTag text={overallAssessment.overallQuality} type="score" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          boxSizing: "border-box",
          backgroundColor: "primary.lighter",
          borderRadius: "0.5rem",
          color: "auto",
          mt: 1,
        }}
      >
        <Typography sx={{ fontSize: "0.7rem" }}>
          {overallAssessment.generalComments}
        </Typography>
      </Box>
      <Br />
    </>
  );
};

export default ReviewResultHeader;
