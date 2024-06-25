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
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
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
        backgroundColor: "primary.lighter",
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        boxSizing: 'border-box'
      }}
    >
      <ArrowBackRoundedIcon sx={{
        color: "secondary.main",
        fontSize: "1.3rem",
        marginRight: "0.5rem",
        cursor: "pointer"
      }}
        onClick={() => window.history.back()}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >

        <Box sx={{ fontSize: "0.8rem" }}>
          {requestData.status}
        </Box>
      </Box>
      {role == "reviewer" && requestData.status !== Status.Completed && (
        <Box sx={{ display: 'flex' }}>
          <ReplayRoundedIcon sx={{
            color: "secondary.main",
            fontSize: "1.3rem",
            marginRight: "0.5rem",
            cursor: "pointer"
          }} />
          <CheckRoundedIcon
            sx={{
              color: "secondary.main",
              fontSize: "1.3rem",
              marginRight: "0.5rem",
              cursor: "pointer"
            }}
            onClick={() => {
              dispatch(approveRequest(requestData.id as string)).then((res) => {
                if (res.meta.requestStatus == "fulfilled") {
                  dispatch(getRequestDetails(requestData.id as string));
                }
              });
            }}
          />

        </Box>
      )}
    </Box>
  );
};

export default RequestStatus;