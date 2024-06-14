import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SxProps,
  TableRowProps,
} from "@mui/material";
import { HeaderItem } from "./CustomDataTable";

// export interface HeaderItem {
//   id: string;
//   label: string;
//   minWidth?: number;
//   maxWidth?: number;
//   tableCellProps?: TableCellProps;
//   format?: (value: number) => string;
//   onClick?: () => void;
//   isIcon?: boolean;
//   icon?: React.ReactNode;
//   component?: React.ReactNode;
//   sortable?: boolean;
//   filterable?: boolean;
//   searchable?: boolean;
//   cellSx?: SxProps;
//   showBorder?: boolean;
// }

interface Props<T> {
  data: T[];
  headerItem: HeaderItem[];
  width?: string;
  height?: string;
  boxShadow?: number;
  stickyHeader?: boolean;
  sx?: SxProps;
  onRowClick?: (row: T) => void;
  hover?: boolean;
  rowProps?: TableRowProps;
}

const CustomBasicTable = <T,>({
  data,
  headerItem,
  width,
  height,
  boxShadow,
  stickyHeader = false,
  sx,
  onRowClick,
  rowProps,
  hover = true,
}: Props<T>) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: width,
        height: height,
        boxShadow: boxShadow,
        ...sx,
      }}
    >
      <Table stickyHeader={stickyHeader} aria-label="sticky table">
        <TableHead>
          <TableRow>
            {headerItem.map((item) => (
              <TableCell
                key={item.id}
                {...item.tableCellProps}
                sx={{ minWidth: item.minWidth }}
              >
                {item.component ? item.component : item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              sx={{ cursor: "pointer" }}
              key={(item as any).id}
              onClick={() => onRowClick && onRowClick(item)}
              data-row={JSON.stringify(item)}
              hover={hover}
              {...rowProps}
            >
              {headerItem.map((headerItem) => {

                return headerItem.isIcon ? (
                  <TableCell
                    key={headerItem.id}
                    {...headerItem.tableCellProps}
                    sx={{ minWidth: headerItem.minWidth }}
                  >
                    {(item as any)["icon"]}
                  </TableCell>
                ) : (
                  <TableCell
                    key={headerItem.id}
                    {...headerItem.tableCellProps}
                    sx={{
                      minWidth: headerItem.minWidth,
                      borderLeft: headerItem.showBorder
                        ? `0.25rem solid ${
                            (item as any).gender == "ذكر" ? "aqua" : "pink"
                          }  !important`
                        : "transparent",
                      ...headerItem.cellSx,
                    }}
                  >
                    {(item as any)[headerItem.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomBasicTable;
