import { Box } from "@mui/system";
import React, { useState } from "react";
import { GetRequestInterface } from "../../interfaces/request-interface";
import { Status } from "@/core/shared/constants/enums";
import { Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useAppDispatch } from "@/core/state/store";
import {
  approveRequest,
  getRequestDetails,
} from "../../controllers/thunks/request-thunk";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import CreateRequestForm from "./CreateRequestForm";
interface RequestStatusPropsInterface {
  requestData: GetRequestInterface;
  role: string | null;
}

const RequestStatus = ({ requestData, role }: RequestStatusPropsInterface) => {
  // dispatch
  const dispatch = useAppDispatch();
  // useState
  const [showResubmitFormDialog, setShowResubmitFormDialog] =
    useState<boolean>(false);
  // Get the last report
  const lastReport = requestData.report[requestData.report.length - 1];
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "primary.lighter",
        borderRadius: "0.5rem",
        padding: "0.5rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <ArrowBackRoundedIcon
        sx={{
          color: "secondary.main",
          fontSize: "1.3rem",
          marginRight: "0.5rem",
          cursor: "pointer",
        }}
        onClick={() => window.history.back()}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontSize: "0.8rem" }}>{requestData.status}</Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* Create resubmit report form dialog */}
        {role === "creator" &&
          lastReport?.review &&
          requestData?.status !== Status.Completed && (
            <>
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
              <ReplayRoundedIcon
                sx={{
                  color: "secondary.main",
                  fontSize: "1.3rem",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowResubmitFormDialog(true);
                }}
              />
            </>
          )}
        {role == "reviewer" && lastReport?.review && requestData.status !== Status.Completed && (
          <CheckRoundedIcon
            sx={{
              color: "secondary.main",
              fontSize: "1.3rem",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(approveRequest(requestData.id as string)).then((res) => {
                if (res.meta.requestStatus == "fulfilled") {
                  dispatch(getRequestDetails(requestData.id as string));
                }
              });
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default RequestStatus;
