import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import { AnalyticsState } from "../types";
import {
  getAcceptedReports,
  getAverageFailureScore,
  getAverageSuccessScore,
  getLeaderboard,
  getPendingReports,
  getRejectedReports,
  getTotalReports,
} from "../thunks/analytics-thunk";

//* Initial State
const initialState: AnalyticsState = {
  loading: false,
  error: "",
  dashboardData: {
    totalReports: 0,
    acceptedReports: 0,
    rejectedReports: 0,
    pendingReports: 0,
    averageSuccessScore: 0,
    averageFailureScore: 0,
    leaderboard: [],
  },
};

const analytics = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get total reports
    builder.addCase(getTotalReports.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTotalReports.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.totalReports = action.payload;
      state.error = "";
    });
    builder.addCase(getTotalReports.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get accepted reports
    builder.addCase(getAcceptedReports.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAcceptedReports.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.acceptedReports = action.payload;
      state.error = "";
    });
    builder.addCase(getAcceptedReports.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get rejected reports
    builder.addCase(getRejectedReports.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRejectedReports.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.rejectedReports = action.payload;
      state.error = "";
    });
    builder.addCase(getRejectedReports.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get pending reports
    builder.addCase(getPendingReports.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPendingReports.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.pendingReports = action.payload;
      state.error = "";
    });
    builder.addCase(getPendingReports.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get average success score
    builder.addCase(getAverageSuccessScore.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAverageSuccessScore.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.averageSuccessScore = action.payload;
      state.error = "";
    });
    builder.addCase(getAverageSuccessScore.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get average failure score
    builder.addCase(getAverageFailureScore.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAverageFailureScore.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.averageFailureScore = action.payload;
      state.error = "";
    });
    builder.addCase(getAverageFailureScore.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get leaderboard
    builder.addCase(getLeaderboard.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData.leaderboard = action.payload;
      state.error = "";
    });
    builder.addCase(getLeaderboard.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const { setLoading, clearError } = analytics.actions;
export default analytics.reducer;
