import { Box } from "@mui/system";
import React from "react";
import { GetRequestInterface } from "../../interfaces/request-interface";
import { Status } from "@/core/shared/constants/enums";
import { Typography } from "@mui/material";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useAppDispatch } from "@/core/state/store";
import {
  approveRequest,
  getRequestDetails,
} from "../../controllers/thunks/request-thunk";

interface RequestStatusPropsInterface {
  requestData: GetRequestInterface;
  role: string | null;
}

const RequestStatus = ({ requestData, role }: RequestStatusPropsInterface) => {
  // dispatch
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem 1rem 2rem 1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            pointerEvents: "none",
            borderRadius: "50%",
            width: "0.9rem",
            height: "0.9rem",
            backgroundColor:
              requestData.status === Status.Created ||
              requestData.status === Status.Assigned
                ? "error.main"
                : requestData.status === Status.Completed
                  ? "success.main"
                  : requestData.status === Status.Reviewed
                    ? "warning.main"
                    : "primary.lighter",
            marginRight: "0.5rem",
          }}
        ></Box>
        <Box sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {requestData.status}
        </Box>
      </Box>
      {role == "reviewer" && requestData.status !== Status.Completed && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor : "secondary.main",
            padding: "0.5rem",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(approveRequest(requestData.id as string)).then((res) => {
              if (res.meta.requestStatus == "fulfilled") {
                dispatch(getRequestDetails(requestData.id as string));
              }
            });
          }}
        >
          <CheckRoundedIcon
            sx={{
              color: "#fff",
              fontSize: "1.3rem",
              marginRight: "0.5rem",
            }}
          />
          <Typography sx={{ color: "#fff" }}>Approve</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RequestStatus;
