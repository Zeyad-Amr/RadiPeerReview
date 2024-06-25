import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ReviewDataInterface } from "../../interfaces/review-interface";
import SendIcon from "@mui/icons-material/Send";
import { GetRequestInterface } from "../../interfaces/request-interface";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import CreateRequestForm from "./CreateRequestForm";
import { Status } from "@/core/shared/constants/enums";

interface DisplayedReviewProps {
  reviewEl: ReviewDataInterface | null;
  setReviewData: (reviewData: any) => void;
  setRightSectionFlag: Dispatch<
    SetStateAction<"report-details" | "review-details" | "create-review">
  >;
  role: string | null;
  requestData: GetRequestInterface;
  reportIndex: number;
}

const DisplayedReview = ({
  setRightSectionFlag,
  setReviewData,
  reviewEl,
  requestData,
  reportIndex,
  role,
}: DisplayedReviewProps) => {

  // useState
  const [showResubmitFormDialog, setShowResubmitFormDialog] =
    useState<boolean>(false);

  return (
    <>
      {/* Create resubmit report form dialog */}
      <CustomizedDialog
        open={showResubmitFormDialog}
        setOpen={setShowResubmitFormDialog}
        title="Resubmit Report"
        maxWidth="md"
      >
        <CreateRequestForm
          reviewRequestId={requestData?.id}
          setShowFormDialog={setShowResubmitFormDialog}
        />
      </CustomizedDialog>
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
              // no review data
              <Typography
                sx={{ textAlign: "center", fontSize: "13px" }}
                color="textSecondary"
              >
                Not Reviewed Yet
              </Typography>
            )}
          </Box>
        </Box>
        {role === "creator" &&
          reviewEl &&
          reportIndex === requestData?.report.length - 1 &&
          requestData?.status !== Status.Completed && (
            <Box
              sx={{
                color: "secondary.main",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowResubmitFormDialog(true)
              }}
            >
              <Typography sx={{ fontSize: "13px" }}>Resubmit</Typography>
              <SendIcon sx={{ fontSize: "14px", marginLeft: "0.5rem" }} />
            </Box>
          )}
      </Box>
    </>
  );
};

export default DisplayedReview;
