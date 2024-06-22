import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import { Typography } from "@mui/material";
import RadiologistTable from "./RadiologistTable";
import IconBtn from "@/core/shared/components/btns/IconBtn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomizedDialog from "@/core/shared/components/CustomizeDialog";
import CreateRequestForm from "../CreateRequestForm";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import {
  getAssignedRequestsList,
  getCreatorRequestsList,
} from "@/modules/radiologist/controllers/thunks/request-thunk";
import { RequestState } from "@/modules/radiologist/controllers/types";

const Halfs = () => {
  // useState
  const [showFormDialog, setShowFormDialog] = useState<boolean>(false);

  // dispatch
  const dispatch = useAppDispatch();

  // get requests data
  useEffect(() => {
    dispatch(getCreatorRequestsList(false));
    dispatch(getAssignedRequestsList(false));
  }, [dispatch]);

  const requestState: RequestState = useAppSelector(
    (state: RootState) => state.request
  );

  const requestsTableHeader = ["CreatedAt", "Status"];
  const assignedRequestsTableHeader = ["CreatedAt", "Approved"];

  return (
    <>
      {/* Create request form dialog */}
      <CustomizedDialog
        open={showFormDialog}
        setOpen={setShowFormDialog}
        title="Create Request"
        maxWidth="md"
      >
        <CreateRequestForm setShowFormDialog={setShowFormDialog} />
      </CustomizedDialog>

      {/* Start two tables */}
      <Box sx={{ display: "flex", gap: 1, width: "100%", height: "80vh" }}>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArticleRoundedIcon
                sx={{ color: "primary.light", fontSize: "2rem" }}
              />
              <Typography
                sx={{ color: "primary.main", ml: 2, fontSize: "1rem", mt: 0.5 }}
              >
                My Requests
              </Typography>
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                backgroundColor: "secondary.main",
                borderRadius: "10px",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                height: "2.7rem",
                margin: "0rem 1rem 0rem 0rem",
              }}
              onClick={() => {
                setShowFormDialog(true);
              }}
            >
              <AddCircleOutlineIcon sx={{ margin: "0rem 0.3rem 0rem 0rem" }} />
              <Typography>Create Request</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <RadiologistTable
              isCreatorTable={true}
              tableHeader={requestsTableHeader}
              requestsArray={requestState?.requests}
              light={false}
            />
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              padding: "2rem",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RateReviewRoundedIcon
              sx={{ color: "primary.light", fontSize: "2rem" }}
            />
            <Typography sx={{ color: "primary.main", ml: 2, fontSize: "1rem" }}>
              My Assigned Requests
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <RadiologistTable
              isCreatorTable={false}
              tableHeader={assignedRequestsTableHeader}
              requestsArray={requestState?.assignedRequests}
              light={false}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Halfs;
