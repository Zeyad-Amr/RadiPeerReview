import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

interface DisplayedRequestProps {
  report: {
    name: string;
    time: string;
  };
  setReportData: (reportData: any) => void;
}

const DisplayedRequest: React.FC<DisplayedRequestProps> = ({ setReportData, report }) => {
  useEffect(() => {
    setReportData(report)
  }, [report, setReportData])
  
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
        onClick={() => setReportData(report)}
      >
        <Typography variant="body1" color="#fff">
          {report.name}
        </Typography>
        <Typography
          sx={{ display: "flex", justifyContent: "flex-end" }}
          variant="caption"
          color="#fff"
        >
          {report.time}
        </Typography>
      </Box>
    </Box>
  );
};

export default DisplayedRequest;
