import { ReviewDataInterface } from "./review-interface";

export interface CreateRequestInterface {
  id?: string | number;
  name : string
  reviewRequestId? : string;
  report: File | null;
  result: File | null;
  additionalComments: string;
}

export interface GetRequestInterface {
  id?: string;
  reviewerId?: string | number;
  creatorId?: string | number;
  creator?: creatorInterface | null;
  createdAt: string | null;
  status: string;
  name: string;
  report: GetReportInterface[];
}

export interface GetReportInterface {
  id?: string | number;
  createdAt: string | null;
  updatedAt: string | null;
  additionalComments: string;
  reportUrl: string;
  resultUrl: string;
  review: ReviewDataInterface | null;
  reviewId: string | number;
  reviewRequestId: string | number;
}

export interface creatorInterface {
  username: string;
  updatedAt: string;
  createdAt: string;
  role: string;
  radiologistId: string | number;
  id: string | number;
}
