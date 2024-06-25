import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { GetRequestInterface } from "@/modules/review-requests/interfaces/request-interface";

interface RadiologistTable {
  tableHeader: string[];
  requestsArray: GetRequestInterface[];
  light: boolean;
  isCreatorTable: boolean;
}

const RadiologistTable = ({
  isCreatorTable,
  tableHeader,
  requestsArray,
  light,
}: RadiologistTable) => {
  return (
    <>
      {tableHeader && <TableHeader header={tableHeader} light={light} />}
      {requestsArray && (
        <TableRow
          isCreatorTable={isCreatorTable}
          data={requestsArray}
          light={light}
        />
      )}
    </>
  );
};

export default RadiologistTable;
