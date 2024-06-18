import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const radiologistHeaderTable: HeaderItem[] = [
  {
    filterKey: "fname",
    id: "fname",
    label: "First Name",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "fname",
    id: "fname",
    label: "Last Name",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "specialization",
    id: "specialization",
    label: "Specialization",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
];