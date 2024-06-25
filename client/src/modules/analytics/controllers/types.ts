import {
  DashboardData,
} from "../interfaces/analytics-interface";

export interface AnalyticsState {
  loading: boolean;
  error: string;
  dashboardData: DashboardData;
}
