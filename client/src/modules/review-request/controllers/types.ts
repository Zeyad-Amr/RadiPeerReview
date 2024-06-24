import { UserInterface } from "@/modules/auth/interfaces/user-interface";
import { ReviewRequestInterface } from "../interfaces/review-request-interface";

export interface ReviewRequestState {
  loading: boolean;
  error: string;
  reports: ReviewRequestInterface[];
}

