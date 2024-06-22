import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DisplayedRequest from "../components/DisplayedRequest";
import DisplayedReview from "../components/DisplayedReview";
import { Grid } from "@mui/material";
import ReportDetailsSection from "../components/ReportDetailsSection";
import CreateReviewForm from "@/modules/radiologist/view/components/CreateReviewForm";
import { useAppSelector, RootState, useAppDispatch } from "@/core/state/store";
import { RequestState } from "../../controllers/types";
import { GetReportInterface, GetRequestInterface } from "../../interfaces/request-interface";
import { useParams } from "next/navigation";
import { getCreatorRequestsList, getAssignedRequestsList } from "../../controllers/thunks/request-thunk";

interface Review {
  id: number;
  content: string;
  time: string;
}

interface Report {
  id: number;
  name: string;
  time: string;
  reviews: Review[];
}

const reports: Report[] = [
  {
    id: 1,
    name: "Report 1",
    time: "10:00 AM",
    reviews: [{ id: 2, content: "Review 1.2", time: "10:10 AM" }],
  },
  {
    id: 2,
    name: "Report 2",
    time: "11:00 AM",
    reviews: [{ id: 1, content: "Review 2.1", time: "11:05 AM" }],
  },
];

const RequestPage = () => {
  const [reportData, setReportData] = useState<any>();
  const [targetRequest, setTargetRequest] = useState<GetRequestInterface>();

  const params = new URLSearchParams(window.location.search);
  const roleParam = params.get('role');
  const { requestId } = useParams();
  console.log(requestId,'requestId');
  console.log(roleParam,'role');

  const dispatch = useAppDispatch()

  const requestState: RequestState = useAppSelector(
    (state: RootState) => state.request
  );

  useEffect(() => {
    dispatch(getCreatorRequestsList());
    dispatch(getAssignedRequestsList());
  }, [dispatch])

  useEffect(() => {
  const targetRequest = requestState?.requests?.find((request : GetRequestInterface) => request.id == requestId )
  console.log(targetRequest,'targetRequest');
  setTargetRequest(targetRequest)
  }, [requestState?.requests, requestState?.assignedRequests, requestId])
  
  
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
              <DisplayedRequest setReportData={setReportData} reportEl={reportEl} />
              {/* {report.reviews.map((review) => (
                <DisplayedReview
                  key={review.id}
                  content={review.content}
                  time={review.time}
                />
              ))} */}
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
          overflow : "scroll"
        }}
      >
        <ReportDetailsSection reportData={reportData} />
        {/* <CreateReviewForm/> */}
      </Grid>
    </Grid>
  );
};

export default RequestPage;
