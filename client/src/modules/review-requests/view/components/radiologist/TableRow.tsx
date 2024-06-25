import {
  GetReportInterface,
  GetRequestInterface,
} from "@/modules/review-requests/interfaces/request-interface";
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
              ? router.push(`/radiologist/dashboard/request/${requestEl?.id}`)
              : router.push(`/radiologist/dashboard/request/${requestEl?.id}`);
          }}
        >
          <Box
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: light ? "primary.dark" : "primary.lighter",
              color: light ? "white" : "primary.main",
              padding: "0.75rem 2rem",
              boxSizing: "border-box",
              flexBasis: "36%",
              textAlign: "center",
              fontSize : "0.9rem"
            }}
          >
            {" "}
            {requestEl.name ?? "--"}
          </Box>
          <Box
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: light ? "primary.dark" : "primary.lighter",
              color: light ? "white" : "primary.main",
              padding: "0.75rem 2rem",
              boxSizing: "border-box",
              flexBasis: "36%",
              textAlign: "center",
              fontSize : "0.9rem"
            }}
          >
            {" "}
            {requestEl.createdAt ??"--"}
          </Box>
          <Box
            sx={{
              borderRadius: "0.5rem",
              backgroundColor: light ? "primary.dark" : "primary.lighter",
              color: light ? "white" : "primary.main",
              padding: "0.75rem 2rem",
              boxSizing: "border-box",
              flexBasis: "28%",
              textAlign: "center",
              fontSize : "0.9rem"
            }}
          >
            {" "}
            {requestEl.status ?? "--"}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TableRow;
