import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FilterColumn, HeaderItem, SearchQuery, SortedColumn } from ".";
import { isEqual } from "lodash";
import { Filter, FilterQuery } from "@/core/api";
import { initialPage, initialRowsPerPage } from "./CustomTablePagination";

//* Define the type for TableContext
interface TableContextType<T> {
  filterColumns: FilterColumn[];
  setFilterColumns: React.Dispatch<React.SetStateAction<FilterColumn[]>>;
  columnHeader: HeaderItem[];
  data: T[];
  searchQuery?: SearchQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>;
  sortedColumn?: SortedColumn;
  setSortedColumn: React.Dispatch<React.SetStateAction<SortedColumn>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

//* Create the TableContext
const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

//* Custom hook to use the TableContext
export const useTableContext = <T,>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context as TableContextType<T>;
};

//* TableProvider component to wrap your application and provide the context
export const TableProvider = (props: {
  fetchData: (filters: FilterQuery[]) => void;
  initSortedColumn: SortedColumn;
  columnHeader: HeaderItem[];
  data: any[];
  children: React.ReactNode;
  resetComponent?: boolean;
  showPagination?: boolean;
}) => {
  const {
    fetchData,
    initSortedColumn,
    columnHeader,
    data,
    resetComponent,
    showPagination,
  } = props;

  //***************** Define the state values
  const [filterColumns, setFilterColumns] = useState<FilterColumn[]>([]);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    value: "",
  } as SearchQuery);
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(initSortedColumn);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [reset, setReset] = useState(false);

  const prevPage = useRef(page);
  const prevRowsPerPage = useRef(rowsPerPage);
  const prevSortedColumn = useRef(sortedColumn);
  const prevSearchQuery = useRef(searchQuery);
  const prevFilterColumns = useRef(filterColumns);

  const initialRender = useRef(true);

  const _getFilterKey = (columnId: string): string => {
    const column = columnHeader.find((header) => header.id === columnId);
    if (column) {
      return column.filterKey;
    }
    return "";
  };

  //***************** useEffect to apply filters initially on the first render
  useEffect(() => {
    if (reset !== true) {
      console.log("resetComponent useEffect:", resetComponent);
      applyFiltersHandler();
    } else {
      setReset(false);
    }
  }, [page, rowsPerPage, sortedColumn, searchQuery, filterColumns]);

  //***************** reset all filters
  const resetFilters = () => {
    initialRender.current = true;
    setFilterColumns([]);
    setSearchQuery({ value: "" });
    setSortedColumn(initSortedColumn);
    setPage(initialPage);
    setRowsPerPage(initialRowsPerPage);
    setReset(true);

    // Update the previous values
    prevPage.current = page;
    prevRowsPerPage.current = rowsPerPage;
    prevSortedColumn.current = sortedColumn;
    prevSearchQuery.current = searchQuery;
    prevFilterColumns.current = filterColumns;
  };

  //***************** on resetFilters change, reset all filters
  useEffect(() => {
    console.log("resetComponent:", resetComponent);
    if (resetComponent === true) {
      resetFilters();
      fetchDataHandler(true);
    }
  }, [resetComponent]);

  //***************** Function to handle fetching data
  const fetchDataHandler = (resetPage: boolean) => {
    // Logic for handling Pagination
    console.log(page);
    console.log(rowsPerPage);

    // Logic for handling Sorting
    console.log(sortedColumn);

    // Logic for handling Searching
    console.log(searchQuery);

    // Logic for handling Filtering
    console.log(filterColumns);

    // Apply filters
    //* Create an array of filters
    let filters: FilterQuery[] = [];

    //* Search
    if (searchQuery.value && searchQuery.columnId) {
      filters.push(
        Filter.like(_getFilterKey(searchQuery.columnId), searchQuery.value)
      );
    }

    //* Sorting
    if (sortedColumn && sortedColumn.disableSort !== true) {
      if (sortedColumn.isAscending) {
        filters.push(
          Filter.sortAscending(_getFilterKey(sortedColumn.columnId))
        );
      } else {
        filters.push(
          Filter.sortDescending(_getFilterKey(sortedColumn.columnId))
        );
      }
    }

    //* reset page and size if any of the filters changed
    if (showPagination) {
      if (resetPage) {
        filters.push(
          Filter.custom(`page=${initialPage + 1}&size=${initialRowsPerPage}`)
        );
        setPage(initialPage);
        setRowsPerPage(initialRowsPerPage);
      } else if (rowsPerPage) {
        filters.push(Filter.custom(`page=${page + 1}&size=${rowsPerPage}`));
      }
    }

    //* Option filters
    // check if all options selected
    const allOptionsSelected = filterColumns.every((column) => {
      return column.selectedValuesIds.length === column.values.length;
    });

    if (filterColumns.length > 0 && !allOptionsSelected) {
      filterColumns.forEach((column) => {
        if (column.selectedValuesIds.length > 0) {
          filters.push(
            Filter.anyOf(
              _getFilterKey(column.columnId),
              column.selectedValuesIds
            )
          );
        }
      });
    }

    //* Fetch data with the filters
    fetchData(filters);

    // Set initialRender to false after the first render
    if (initialRender.current) {
      initialRender.current = false;
    }
  };

  //***************** Function to apply filters
  const applyFiltersHandler = () => {
    // Check if any of the values have changed
    const pageChanged = prevPage.current !== page;
    const rowsPerPageChanged = prevRowsPerPage.current !== rowsPerPage;
    const sortedColumnChanged = prevSortedColumn.current !== sortedColumn;
    const searchQueryChanged = !isEqual(prevSearchQuery.current, searchQuery);
    const filterColumnsChanged = !isEqual(
      prevFilterColumns.current,
      filterColumns
    );

    console.log("pageChanged", pageChanged);
    console.log("rowsPerPageChanged", rowsPerPageChanged);
    console.log("sortedColumnChanged", sortedColumnChanged);
    console.log("searchQueryChanged", searchQueryChanged);
    console.log("filterColumnsChanged", filterColumnsChanged);
    console.log("initialRender", initialRender.current);

    // Update the previous values
    prevPage.current = page;
    prevRowsPerPage.current = rowsPerPage;
    prevSortedColumn.current = sortedColumn;
    prevSearchQuery.current = searchQuery;
    prevFilterColumns.current = filterColumns;

    // If any value has changed, apply filters
    if (
      pageChanged ||
      rowsPerPageChanged ||
      sortedColumnChanged ||
      searchQueryChanged ||
      filterColumnsChanged ||
      initialRender.current
    ) {
      fetchDataHandler(
        sortedColumnChanged || searchQueryChanged || filterColumnsChanged
      );
    }
  };

  return (
    <TableContext.Provider
      value={{
        filterColumns,
        setFilterColumns,
        searchQuery,
        setSearchQuery,
        sortedColumn,
        setSortedColumn,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        columnHeader,
        data,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};
