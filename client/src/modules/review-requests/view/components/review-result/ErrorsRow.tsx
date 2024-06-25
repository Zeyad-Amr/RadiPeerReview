import { Typography } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { MissedFinding } from "@/modules/review-requests/interfaces/review-interface";
interface ErrorsRowPropsInterface {
  missedFindings: MissedFinding[];
  title: string;
}
const ErrorsRow = ({ missedFindings, title }: ErrorsRowPropsInterface) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ fontSize: ".8rem" }}>{title}</Typography>
      {missedFindings.map((el: MissedFinding, i: number) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            boxSizing: "border-box",
            backgroundColor: alpha("#ff8282", 0.2),
            borderRadius: "0.5rem",
            mt: 1,
          }}
        >
          <ErrorOutlineIcon
            sx={{ mr: 2, fontSize: "1rem", color: "error.dark" }}
          />
          <Typography sx={{ fontSize: "0.7rem" }}>{el.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ErrorsRow;
