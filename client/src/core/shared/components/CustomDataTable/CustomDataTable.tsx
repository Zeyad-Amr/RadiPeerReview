import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import CustomTableToolbar from "./CustomTableToolbar";
import CustomColumnSort from "./CustomColumnSort";
import utilsFunctions from "../../utils/functions";
import CustomTablePagination from "./CustomTablePagination";
import { TableProvider } from "./context";
import { CustomDataTableProps } from "./types";

const CustomDataTable = <T,>({
  fetchData,
  data,
  totalItems,
  headerItems,
  width = "100%",
  height = "80vh",
  boxShadow = 5,
  stickyHeader = true,
  sx = { mb: 5 },
  onRowClick,
  onRowDoubleClick,
  hover = true,
  variantBackground = true,
  rowHeight = "1rem",
  rowPaddingY = "0.1rem",
  rowProps,
  initSortedColumn = {
    disableSort: true,
    columnId: "",
    isAscending: true,
  },
  resetComponent = false,
  showPagination = true,
  showToolbar = true,
  noDataMessage = "No Data Available",
}: CustomDataTableProps<T>) => {
  return (
    <TableProvider
      data={data}
      fetchData={fetchData}
      columnHeader={headerItems}
      initSortedColumn={initSortedColumn}
      resetComponent={resetComponent}
      showPagination={showPagination}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: width,
          height: height,
          ...sx,
        }}
      >
        {showToolbar && (
          <Box sx={{ width: width }}>
            <CustomTableToolbar />
          </Box>
        )}

        <TableContainer
          component={Paper}
          sx={{
            width: width,
            height: "100%",
            boxShadow: boxShadow,
          }}
        >
          <Table stickyHeader={stickyHeader} aria-label="sticky table">
            <TableHead >
              <TableRow>
                {headerItems
                  .filter(
                    (item) =>
                      item.display === undefined || item.display === true
                  )
                  .map((item) => (
                    <TableCell
                      key={item.id}
                      {...item.tableCellProps}
                      sx={{ minWidth: item.minWidth, zIndex: 1, backgroundColor: 'primary.main', backgroundImage: 'none', color: 'primary.lighter' }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "center", }}>
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.component ? item.component : item.label}
                        </Typography>
                        {item.sortable ? (
                          <CustomColumnSort columnId={item.id} />
                        ) : null}
                      </Box>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data.map((item: any, index: number) => (
                  <TableRow
                    key={item.id}
                    onClick={() => onRowClick && onRowClick(item)}
                    onDoubleClick={() =>
                      onRowDoubleClick && onRowDoubleClick(item)
                    }
                    hover={hover}
                    sx={{
                      backgroundColor:
                        variantBackground && index % 2 === 0
                          ? "white"
                          : "#f5f5f5",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    {...rowProps}
                  >
                    {headerItems
                      .filter(
                        (item) =>
                          item.display === undefined || item.display === true
                      )
                      .map((headerItem) =>
                        headerItem.isIcon ? (
                          <TableCell
                            key={headerItem.id}
                            {...headerItem.tableCellProps}
                            sx={{
                              paddingY: rowPaddingY,
                              minWidth: headerItem.minWidth,
                              maxWidth: headerItem.maxWidth,
                              height: rowHeight,
                            }}
                          >
                            <Box
                              sx={{
                                height: rowHeight,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.icon}
                            </Box>
                          </TableCell>
                        ) : headerItem.isComponent ? (
                          <TableCell
                            key={headerItem.id}
                            {...headerItem.tableCellProps}
                            sx={{
                              paddingY: rowPaddingY,
                              minWidth: headerItem.minWidth,
                              maxWidth: headerItem.maxWidth,
                              height: rowHeight,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}

                          >
                            <Typography
                              sx={{
                                fontSize: "0.8rem",
                                textAlign: "center",
                                lineHeight: rowHeight,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                              }}
                            >
                              {item[headerItem.id]}
                            </Typography>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={headerItem.id}
                            {...headerItem.tableCellProps}
                            sx={{
                              minWidth: headerItem.minWidth,
                              maxWidth: headerItem.maxWidth,
                              height: rowHeight,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            onClick={headerItem.onClick}

                          >
                            <Tooltip
                              enterDelay={1000}
                              title={
                                typeof item[headerItem.id] === "object"
                                  ? item[headerItem.id].value
                                  : item[headerItem.id]
                              }
                            >
                              <Typography
                                sx={{
                                  fontSize: "0.8rem",
                                  textAlign: "center",
                                  lineHeight: rowHeight,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  direction: !utilsFunctions.startsWithArabic(
                                    typeof item[headerItem.id] === "object"
                                      ? item[headerItem.id].value
                                      : item[headerItem.id]
                                  )
                                    ? "rtl"
                                    : "ltr",
                                  maxWidth: "100%",
                                }}
                              >
                                {typeof item[headerItem.id] === "object"
                                  ? item[headerItem.id].value
                                  : item[headerItem.id]}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                        )
                      )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headerItems.length}>
                    <Typography sx={{ textAlign: "center" }}>
                      {noDataMessage}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showPagination && (
          <Box sx={{ width: width }}>
            <CustomTablePagination dataLength={totalItems} />
          </Box>
        )}
      </Box>
    </TableProvider>
  );
};

export default CustomDataTable;
