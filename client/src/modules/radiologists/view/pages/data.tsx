import { HeaderItem } from "@/core/shared/components/CustomDataTable";

export const radiologistHeaderTable: HeaderItem[] = [
  {
    filterKey: "fullname",
    id: "fullname",
    label: "Full Name",
    minWidth: 100,
    maxWidth: 150,
    tableCellProps: { align: "center" },
    sortable: false,
    searchable: false,
    filterable: false,
  },
  {
    filterKey: "username",
    id: "username",
    label: "Username",
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
