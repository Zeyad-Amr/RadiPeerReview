import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DisplayedRequest from "../components/DisplayedRequest";
import DisplayedReview from "../components/DisplayedReview";
import { Grid } from "@mui/material";
import ReportDetailsSection from "../components/ReportDetailsSection";
import CreateReviewForm from "@/modules/radiologist/view/components/CreateReviewForm";
import { useAppSelector, RootState, useAppDispatch } from "@/core/state/store";
import { RequestState } from "../../controllers/types";
import {
  GetReportInterface,
  GetRequestInterface,
} from "../../interfaces/request-interface";
import { useParams } from "next/navigation";
import {
  getCreatorRequestsList,
  getAssignedRequestsList,
} from "../../controllers/thunks/request-thunk";
import ReviewResult from "../components/review-result/ReviewResult";

const RequestPage = () => {
  const [reportDetails, setReportDetails] = useState<any>();
  const [targetRequest, setTargetRequest] = useState<GetRequestInterface>();
  const [rightSectionFlag, setRightSectionFlag] = useState<
    "report-details" | "review-details" | "create-review"
  >("report-details");

  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get("role");
  const { requestId } = useParams();
  console.log(requestId, "requestId");
  console.log(roleParam, "role");

  const dispatch = useAppDispatch();

  const requestState: RequestState = useAppSelector(
    (state: RootState) => state.request
  );

  // dispatch all requests to get their list in store
  useEffect(() => {
    dispatch(getCreatorRequestsList());
    dispatch(getAssignedRequestsList());
  }, [dispatch]);

  // apply target request from requests list
  useEffect(() => {
    let targetRequest;
    if (roleParam === "creator") {
      targetRequest = requestState?.requests?.find(
        (request) => request.id === requestId
      );
    } else if (roleParam === "reviewer") {
      targetRequest = requestState?.assignedRequests?.find(
        (request) => request.id === requestId
      );
    }
    console.log(targetRequest, "targetRequest");
    setTargetRequest(targetRequest);
    setReportDetails(targetRequest?.report?.[0]);
  }, [
    requestState?.requests,
    requestState?.assignedRequests,
    requestId,
    roleParam,
  ]);

  return (
    <Grid container>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Box sx={{ margin: "1rem", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: "10px",
              top: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "gray",
            }}
          />
          {targetRequest?.report?.map((reportEl, index) => (
            <Box
              key={reportEl.id}
              sx={{ position: "relative", marginLeft: "2rem" }}
            >
              <DisplayedRequest
                role={roleParam}
                setRightSectionFlag={setRightSectionFlag}
                setReportData={setReportDetails}
                reportEl={reportEl}
              />
              <DisplayedReview
                reviewData={reportEl?.review}
              />
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        lg={8}
        md={8}
        sm={12}
        xs={12}
        sx={{
          height: "100vh",
          backgroundColor: "#fff",
          padding: "1rem",
          borderLeftWidth: "3px",
          borderLeftColor: "primary.lighter",
          borderLeftStyle: "solid",
          overflow: "scroll",
        }}
      >
        {rightSectionFlag === "report-details" ? (
          <ReportDetailsSection reportData={reportDetails} />
        ) : rightSectionFlag === "create-review" ? (
          <CreateReviewForm />
        ) : rightSectionFlag === "review-details" ? (
          <ReviewResult />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default RequestPage;
