import {
  GetReportInterface,
  GetRequestInterface,
} from "@/modules/radiologist/interfaces/request-interface";
import { Box } from "@mui/system";
import React from "react";
import { useRouter } from "next/navigation";

interface TableRowProps {
  data: GetRequestInterface[];
  light: boolean;
  isCreatorTable: boolean;
}

const TableRow = ({ isCreatorTable, data, light }: TableRowProps) => {
  const router = useRouter();
  return (
    <>
      {data?.map((requestEl: GetRequestInterface, index: number) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
            cursor: "pointer",
          }}
          key={index}
          onClick={() => {
            isCreatorTable
              ? router.push(`/radiologist/request/?role=creator`)
              : router.push(`/radiologist/request/?role=reviewer`);
          }}
        >
          <Box
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: light ? "primary.dark" : "primary.lighter",
              color: light ? "white" : "primary.main",
              padding: "0.75rem 2rem",
              boxSizing: "border-box",
              flexBasis: "66%",
              textAlign: "center",
            }}
          >
            {" "}
            {requestEl.createdAt ?? "--"}
          </Box>
          <Box
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: light ? "primary.dark" : "primary.lighter",
              color: light ? "white" : "primary.main",
              padding: "0.75rem 2rem",
              boxSizing: "border-box",
              flexBasis: "34%",
              textAlign: "center",
            }}
          >
            {" "}
            {isCreatorTable
              ? requestEl.status ?? "--"
              : requestEl.approved ?? "--"}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TableRow;
