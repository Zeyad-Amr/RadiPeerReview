//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { ReportInterface } from "../interfaces/report-interface";
import { ReviewDataInterface } from "../interfaces/review-interface";

export interface ReportState {
  reports: ReportInterface[];
  currentReport: ReportInterface;
  isFetched: boolean;
  loading: boolean;
  error: string;
}
export interface ReviewState {
  reviews: ReviewDataInterface[];
  currentReview: ReviewDataInterface;
  isFetched: boolean;
  loading: boolean;
  error: string;
}

