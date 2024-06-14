import { TablePagination } from "@mui/material";
import { useTableContext } from "./context";

interface CustomTablePaginationProps {
  dataLength: number;
}
export const initialPage = 0;
export const initialRowsPerPage = 10;
const CustomTablePagination = ({ dataLength }: CustomTablePaginationProps) => {
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTableContext();

  const rowsPerPageOptions = [1, 5, 10, 25, 100];
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(initialPage);
  };
  console.log("CustomTablePagination", dataLength, page, rowsPerPage);
  return (
    <TablePagination
      component="div"
      count={dataLength}
      page={page}
      showFirstButton
      showLastButton
      labelRowsPerPage={"صفوف في كل صفحة"}
      labelDisplayedRows={({ from, to, count }) => {
        return `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`;
      }}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default CustomTablePagination;
