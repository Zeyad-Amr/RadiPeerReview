export interface CreateRequestInterface {
  id?: string | number;
  report: File | null;
  result: File | null;
  additionalComments: string;
}

export interface GetRequestInterface {
  id?: string | number;
  reviewerId: string | number;
  creatorId: string | number;
  creator : creatorInterface | null;
  approved: boolean | null;
  createdAt: Date | null;
  status: string;
  report: GetReportInterface[];
}

export interface GetReportInterface {
  id?: string | number;
  createdAt: Date | null;
  updatedAt: Date | null;
  additionalComments: string;
  reportUrl: string;
  resultUrl: string;
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
