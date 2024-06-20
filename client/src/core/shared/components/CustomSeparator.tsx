import { Box, Typography } from "@mui/material";
import React from "react";

interface CustomSeparatorPropsI {
  separatorColor?: string;
  separatorWidth?: string;
  sx?: any;
}

const CustomSeparator = ({
  separatorColor = "primary.main",
  separatorWidth = "3rem",
  sx,
}: CustomSeparatorPropsI) => {
  return (
    <Box>
      <Box
        sx={{
          height: "2px",
          width: `${separatorWidth}`,
          backgroundColor: `${separatorColor}`,
          ...sx,
        }}
      ></Box>
    </Box>
  );
};

export default CustomSeparator;
