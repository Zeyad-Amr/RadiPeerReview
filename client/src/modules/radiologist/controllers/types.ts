//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { CreateRequestInterface, GetRequestInterface } from "../interfaces/request-interface";
import { ReviewDataInterface } from "../interfaces/review-interface";

export interface RequestState {
  requests: GetRequestInterface[];
  assignedRequests: GetRequestInterface[];
  currentRequest: GetRequestInterface;
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
export interface ReportState {
  loading: boolean;
  error: string;
}

