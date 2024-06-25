/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { alpha } from "@mui/system";

interface ReviewTagProps {
  type: "score" | "result";
  text: string | 5 | 4 | 3 | 2 | 1 | number;
  variant?: "success" | "fail" | "warning" | "natural";
}

const ReviewTag = ({ type, text, variant }: ReviewTagProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [color, setColor] = useState<string>();

  const getColors = ({ type, text, variant }: ReviewTagProps) => {
    if (type === "score") {
      console.log(text);
      if (Number(text) > 3) {
        setBackgroundColor(alpha("#77ED8B", 0.4));
        setColor("success.dark");
      } else if (Number(text) === 3) {
        setBackgroundColor(alpha("#FFD666", 0.4));
        setColor("warning.dark");
      } else {
        setBackgroundColor(alpha("#ff8282", 0.4));
        setColor("error.dark");
      }
    } else {
      if (variant === "success") {
        setBackgroundColor(alpha("#77ED8B", 0.4));
        setColor("success.dark");
      } else if (variant === "warning") {
        setBackgroundColor(alpha("#FFD666", 0.4));
        setColor("warning.dark");
      } else if (variant === "fail") {
        setBackgroundColor(alpha("#ff8282", 0.4));
        setColor("error.dark");
      } else {
        setBackgroundColor(alpha("#b3bfff", 0.4));
        setColor("info.dark");
      }
    }
  };

  useEffect(() => {
    getColors({ type, text, variant });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        padding: "0.5rem",
        boxSizing: "border-box",
        width: "7rem",
        textAlign: "center",
        borderRadius: "0.2rem",
        height: "min-content",
      }}
    >
      <Typography sx={{ color: color, fontSize: "0.7rem" }}>{text}</Typography>
    </Box>
  );
};

export default ReviewTag;
