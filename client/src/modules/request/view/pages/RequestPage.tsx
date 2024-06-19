import { Box } from "@mui/system";
import React, { useState } from "react";
import DisplayedRequest from "../components/DisplayedRequest";
import DisplayedReview from "../components/DisplayedReview";
import { Grid } from "@mui/material";
import ReportDetailsSection from "../components/ReportDetailsSection";

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
  return (
    <Grid container>
      <Grid item lg={5} md={5} sm={12} xs={12}>
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
          {reports.map((report, index) => (
            <Box
              key={report.id}
              sx={{ position: "relative", marginLeft: "2rem" }}
            >
              <DisplayedRequest setReportData={setReportData} report={report} />
              {report.reviews.map((review) => (
                <DisplayedReview
                  key={review.id}
                  content={review.content}
                  time={review.time}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid
        item
        lg={7}
        md={7}
        sm={12}
        xs={12}
        sx={{
          height: "100vh",
          backgroundColor: "#fff",
          padding: "1rem",
          borderLeftWidth: "3px",
          borderLeftColor: "primary.lighter",
          borderLeftStyle: "solid",
        }}
      >
        <ReportDetailsSection reportData={reportData} />
      </Grid>
    </Grid>
  );
};

export default RequestPage;
