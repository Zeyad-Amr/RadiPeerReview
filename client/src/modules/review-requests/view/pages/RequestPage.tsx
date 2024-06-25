import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DisplayedRequest from "../components/DisplayedRequest";
import DisplayedReview from "../components/DisplayedReview";
import { Grid } from "@mui/material";
import ReportDetailsSection from "../components/ReportDetailsSection";
import CreateReviewForm from "@/modules/review-requests/view/components/CreateReviewForm";
import { useAppSelector, RootState, useAppDispatch } from "@/core/state/store";
import { RequestState } from "../../controllers/types";
import {
  GetReportInterface,
  GetRequestInterface,
} from "../../interfaces/request-interface";
import { useParams } from "next/navigation";
import { getRequestDetails } from "../../controllers/thunks/request-thunk";
import ReviewResult from "../components/review-result/ReviewResult";
import { ReviewDataInterface } from "../../interfaces/review-interface";
import RequestStatus from "../components/RequestStatus";
const RequestPage = () => {
  const [reportDetails, setReportDetails] = useState<GetReportInterface>();
  const [reviewDetails, setReviewDetails] = useState<ReviewDataInterface>();
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
    if (requestId) {
      dispatch(getRequestDetails(requestId));
    }
  }, [dispatch, requestId]);

  // apply target request from requests list
  useEffect(() => {
    // set target request
    const targetRequest = requestState?.currentRequest;

    console.log(targetRequest, "targetRequest");
    setTargetRequest(targetRequest);
    setReportDetails(targetRequest?.report?.[0]);
  }, [requestState?.currentRequest, requestId, roleParam]);

  // Function to get the ID of the last report
  const getLastReportId = () => {
    if (targetRequest && targetRequest?.report?.length > 0) {
      return targetRequest.report[targetRequest.report.length - 1].id as string;
    }
    return "";
  };

  return (
    <Grid container >
      <Grid
        item
        lg={4}
        md={4}
        sm={12}
        xs={12}
        sx={{
          height: "85vh",
          backgroundColor: "#fff",
          overflow: "scroll",
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          padding: '1.5rem 1rem'

        }}
      >
        {targetRequest && (
          <RequestStatus requestData={targetRequest} role={roleParam} />
        )}
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
          {targetRequest?.report?.map((reportEl, index: number) => (
            <Box
              key={reportEl.id}
              sx={{ position: "relative", marginLeft: "2rem" }}
            >
              <DisplayedRequest
                role={roleParam}
                setRightSectionFlag={setRightSectionFlag}
                setReportData={setReportDetails}
                requestData={targetRequest}
                reportEl={reportEl}
              />
              <DisplayedReview
                reviewEl={reportEl?.review}
                setReviewData={setReviewDetails}
                setRightSectionFlag={setRightSectionFlag}
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
          height: "85vh",
          backgroundColor: "#fff",
          padding: "1.5rem 1rem",
          borderLeftWidth: "3px",
          borderLeftColor: "primary.lighter",
          borderLeftStyle: "solid",
          overflow: "scroll",
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',

        }}
      >
        {rightSectionFlag === "report-details" ? (
          reportDetails &&
          targetRequest && (
            <ReportDetailsSection
              requestData={targetRequest}
              reportDetails={reportDetails}
            />
          )
        ) : rightSectionFlag === "create-review" ? (
          <CreateReviewForm
            setRightSectionFlag={setRightSectionFlag}
            reportId={getLastReportId()}
          />
        ) : rightSectionFlag === "review-details" ? (
          reportDetails &&
          reviewDetails && (
            <ReviewResult
              reviewDetails={reviewDetails}
              reportDetails={reportDetails}
            />
          )
        ) : null}
      </Grid>
    </Grid>
  );
};

export default RequestPage;
