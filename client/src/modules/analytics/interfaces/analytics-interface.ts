import { RadiologistInterface } from "@/modules/radiologists/interfaces/radiologist-interface";

interface Count {
  approved: number;
}

export interface RadiologistData {
  _count: Count;
  creatorId: string;
  creator: RadiologistInterface;
}

export interface dashboardInterface {
  response: any | RadiologistData[];
}

export interface DashboardData {
  totalReports: number;
  acceptedReports: number;
  rejectedReports: number;
  pendingReports: number;
  averageSuccessScore: number;
  averageFailureScore: number;
  leaderboard: RadiologistData[];
}

export interface leaderboardTransformedDataItem {
  name: string;
  AcceptedReports: string;
}
