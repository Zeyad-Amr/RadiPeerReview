import { FilterQuery } from "@/core/api";
import { SxProps, TableCellProps, TableRowProps } from "@mui/material";

interface CustomDataTableProps<T> {
  fetchData: (filters: FilterQuery[]) => void;
  data: T[];
  totalItems: number;
  headerItems: HeaderItem[];
  width?: string;
  height?: string;
  boxShadow?: number;
  stickyHeader?: boolean;
  sx?: SxProps;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  hover?: boolean;
  variantBackground?: boolean;
  rowHeight?: string;
  rowPaddingY?: string;
  initSortedColumn?: SortedColumn;
  resetComponent?: boolean;
  showPagination?: boolean;
  showToolbar?: boolean;
  noDataMessage?: string;
  rowProps?: TableRowProps;
}

/**
 * The interface for the header item.
 * @param {string} filterKey - The key of the filter item.
 * @param {string} id - The id of the header item.
 * @param {string} label - The label of the header item.
 * @param {number} [minWidth] - The minimum width of the header item (optional).
 * @param {number} [maxWidth] - The maximum width of the header item (optional).
 * @param {TableCellProps} [tableCellProps] - The custom table cell props for the header item (optional).
 * @param {(value: number) => string} [format] - The custom format function for the header item (optional).
 * @param {() => void} [onClick] - The callback function triggered when the header item is clicked (optional).
 * @param {boolean} [isIcon] - Whether the header item is an icon (optional).
 * @param {boolean} [isComponent] - Whether the header item is a custom component (optional).
 * @param {React.ReactNode} [component] - The custom component for the header item (optional).
 * @param {boolean} [sortable] - Whether the header item is sortable (optional).
 * @param {boolean} [filterable] - Whether the header item is filterable (optional).
 * @param {boolean} [searchable] - Whether the header item is searchable (optional).
 */
interface HeaderItem {
  filterKey: string;
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  tableCellProps?: TableCellProps;
  format?: (value: number) => string;
  onClick?: () => void;
  isIcon?: boolean;
  isComponent?: boolean;
  component?: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  filterOptions?: FilterOption[];
  display?: boolean;
  icon?: React.ReactNode;
  cellSx?: SxProps;
  showBorder?: boolean;
}

/**
 * The interface for the sortable column.
 * @param {string} [columnId] - The id of the column to sort.
 * @param {boolean} [isAscending] - Whether the column is sorted in ascending order.
 */
interface SortedColumn {
  columnId: string;
  isAscending: boolean;
  disableSort?: boolean;
}

/**
 * The interface for the search query.
 * @param {string} [columnId] - The id of the column to search (optional).
 * @param {string} [value] - The value to search.
 */
interface SearchQuery {
  columnId?: string;
  value: string;
}

/**
 * The interface for the search column.
 * @param {string} columnId - The id of the column to search.
 * @param {string} label - The label of the column to search.
 */
interface SearchColumn {
  columnId: string;
  label: string;
}

/**
 * The interface for the filter column.
 * @param {string} columnId - The id of the column to filter.
 * @param {string} label - The label of the column to filter.
 * @param {{ id: string; value: string }[]} values - The array of values for the column to filter.
 * @param {string[]} selectedValuesIds - The array of selected values ids for the column to filter.
 */
interface FilterColumn {
  columnId: string;
  label: string;
  values: FilterOption[];
  selectedValuesIds: string[];
}

interface FilterOption {
  id: string;
  value: string;
}

export type {
  CustomDataTableProps,
  HeaderItem,
  SortedColumn,
  SearchQuery,
  SearchColumn,
  FilterColumn,
  FilterOption,
};
