import { ReviewRequestInterface } from "../interfaces/review-request-interface";

export interface ReviewRequestState {
  loading: boolean;
  error: string;
  reports: ReviewRequestInterface[];
}
