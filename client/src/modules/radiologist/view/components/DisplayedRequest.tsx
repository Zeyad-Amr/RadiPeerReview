import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { GetReportInterface } from "../../interfaces/request-interface";
import RateReviewIcon from "@mui/icons-material/RateReview";

interface DisplayedRequestProps {
  reportEl: GetReportInterface;
  setReportData: (reportData: any) => void;
  setRightSectionFlag: Dispatch<
    SetStateAction<"report-details" | "review-details" | "create-review">
  >;
  role: string | null;
}

const DisplayedRequest = ({
  setRightSectionFlag,
  setReportData,
  reportEl,
  role,
}: DisplayedRequestProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "20px",
          height: "2px",
          backgroundColor: "gray",
          transform: "translateY(-50%)",
        }}
      />
      <Box
        sx={{
          marginLeft: 4,
          padding: "1rem",
          borderRadius: "10px",
          width: "70%",
          backgroundColor: "primary.main",
          cursor: "pointer",
        }}
        onClick={() => {
          setReportData(reportEl);
          setRightSectionFlag("report-details");
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ marginBottom: "1rem" }}
            variant="body1"
            color="#fff"
          >
            {reportEl.additionalComments ?? "No Comments"}
          </Typography>
          { !reportEl.review  && role === "reviewer" ? (
            <RateReviewIcon
              sx={{
                color: "primary.light",
                cursor: "pointer",
                marginLeft: "0.5rem",
              }}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                setRightSectionFlag("create-review");
              }}
            />
          ) : null}
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "8.5px",
          }}
          variant="caption"
          color="#fff"
        >
          {reportEl.createdAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default DisplayedRequest;
