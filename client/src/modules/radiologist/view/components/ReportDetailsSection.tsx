import { Box, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetReportInterface } from "../../interfaces/request-interface";
import { useRouter } from "next/navigation";

interface ReportDetailsPropsInterface {
  reportDetails: GetReportInterface;
}

const ReportDetailsSection = ({
  reportDetails,
}: ReportDetailsPropsInterface) => {
  const router = useRouter()
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "700",
          marginBottom: "20px",
          lineHeight: "1.5",
          fontSize: "1.5rem",
        }}
      >
        {reportDetails?.createdAt}
      </Typography>
      {/* Start Dicom file name & view */}
      <Box sx={{ marginBottom: "1.5rem" }}>
        <Typography>Dicom File</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between ",
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "primary.light" }}>
            {reportDetails?.resultUrl}
          </Typography>
          <Box>
            <VisibilityIcon sx={{ color: "primary.light" , cursor : "pointer" }} onClick={() => {
              router.push(`/dicom-viewer?file=${reportDetails?.resultUrl}`)
            }} />
          </Box>
        </Box>
      </Box>
      {/* Start Pdf file name & view */}
      <Box sx={{ marginBottom: "1.5rem" }}>
        <Typography>Pdf File</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between ",
            marginTop: "0.5rem",
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "primary.light" }}>
          {reportDetails?.reportUrl}
          </Typography>
          <Box>
            <VisibilityIcon sx={{ color: "primary.light" , cursor : "pointer" }} 
            onClick={() => {
              router.push(`/pdf-viewer?file=${reportDetails?.reportUrl}`)
            }}
            />
          </Box>
        </Box>
      </Box>

      {/* Start view comments */}
      <Box>
        <Typography>Comments</Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "8rem",
            borderRadius: "10px",
            borderColor: "primary.light",
            borderStyle: "solid",
            borderWidth: "1px",
            padding: "0.7rem",
            color: "primary.light",
          }}
        >
         {reportDetails?.additionalComments}
        </Box>
      </Box>
    </Box>
  );
};

export default ReportDetailsSection;
