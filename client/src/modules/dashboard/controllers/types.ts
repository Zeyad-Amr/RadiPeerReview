import { dashboardInterface } from "../interfaces/dashboard-interface";

export interface dashboardState extends dashboardInterface {
  loading: boolean;
  error: string;
}
