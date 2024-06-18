//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { ReportInterface } from "../interfaces/report-interface";

export interface ReportState {
  reports: ReportInterface[];
  currentReport: ReportInterface;
  isFetched: boolean;
  loading: boolean;
  error: string;
}

