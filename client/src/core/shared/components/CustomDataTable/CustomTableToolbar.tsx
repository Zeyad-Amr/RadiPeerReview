import { Box } from "@mui/system";
import React from "react";
import { CustomTableFilter, CustomTableSearch } from ".";

const CustomTablesToolbar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        padding: "0.3rem 1rem",
        marginBottom: "0.5rem",
        boxShadow: "0 0 6px #00000025",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CustomTableSearch />
      <CustomTableFilter />
    </Box>
  );
};

export default CustomTablesToolbar;
