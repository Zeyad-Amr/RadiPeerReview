import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useTableContext } from "./context";
import { Box } from "@mui/material";

interface Props {
  columnId: string;
}
const CustomColumnSort = ({ columnId }: Props) => {
  const { sortedColumn, setSortedColumn } = useTableContext();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "relative",
        cursor: "pointer",
        marginX: "0.5rem",
        opacity: `${sortedColumn?.columnId === columnId ? "1" : "0.2"}`,
        transition: "0.2s",
        transform: `rotate(${
          sortedColumn?.isAscending && sortedColumn.columnId === columnId
            ? 0
            : -180
        }deg)`,
        transformOrigin: "50% 50%",
        "&:hover": {
          opacity: `${sortedColumn?.columnId === columnId ? "1" : "0.7"}`,
        },
      }}
      onClick={() => {
        setSortedColumn({
          columnId: columnId,
          isAscending:
            sortedColumn?.columnId === columnId
              ? !sortedColumn.isAscending
              : true,
        });
      }}
    >
      <ArrowUpwardRoundedIcon />
    </Box>
  );
};

export default CustomColumnSort;
