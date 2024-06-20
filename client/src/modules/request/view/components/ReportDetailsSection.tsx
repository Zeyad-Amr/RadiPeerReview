import { Box, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ReportDetailsPropsInterface {
  reportData: any;
}

const ReportDetailsSection = ({
  reportData,
}: ReportDetailsPropsInterface) => {
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
        {reportData?.name}
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
            File Name
          </Typography>
          <Box>
            <VisibilityIcon sx={{ color: "primary.light" }} />
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
            File Name
          </Typography>
          <Box>
            <VisibilityIcon sx={{ color: "primary.light" }} />
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore qui
          fuga voluptatum optio unde, impedit deserunt temporibus sunt quidem
          porro, aspernatur nesciunt beatae cumque accusamus maiores tempore?
          Alias, facere consequuntur?
        </Box>
      </Box>
    </Box>
  );
};

export default ReportDetailsSection;
