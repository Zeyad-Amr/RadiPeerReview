import { createSlice } from "@reduxjs/toolkit";
import { ReportState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import reportModel from "../../models/report-model";
import { ReportInterface } from "../../interfaces/report-interface";
import {
  createReport,
  deleteReport,
  getReportDetails,
  getReportsList,
  updateReport,
} from "../thunks/report-thunk";

//* Initial State
const initialState: ReportState = {
  reports: [],
  currentReport: reportModel.defaultValues,
  isFetched: false,
  loading: false,
  error: "",
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentReport(state) {
      state.currentReport = initialState.currentReport;
    },
    clearReportList(state) {
      state.reports = initialState.reports;
    },
    setCurrentReport(
      state,
      action: { payload: ReportInterface; type: string }
    ) {
      state.currentReport = action.payload;
    },
    setReportList(state, action: { payload: ReportInterface[]; type: string }) {
      state.reports = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all reports from api
    builder.addCase(getReportsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReportsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
      state.error = "";
      console.log("getReportsList", action.payload);
    });
    builder.addCase(getReportsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.reports = initialState.reports;
    });

    //* create report
    builder.addCase(createReport.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createReport.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentReport = initialState.currentReport;
      state.error = "";
      AlertService.showAlert("Report added successfully", "success");
    });
    builder.addCase(createReport.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update report
    builder.addCase(updateReport.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateReport.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentReport = initialState.currentReport;
      state.error = "";
      AlertService.showAlert("Report updated successfully", "success");
    });
    builder.addCase(updateReport.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete report
    builder.addCase(deleteReport.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteReport.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Report deleted successfully", "success");
    });
    builder.addCase(deleteReport.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single report details
    builder.addCase(getReportDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReportDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentReport = action.payload;
      state.error = "";
    });
    builder.addCase(getReportDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentReport = initialState.currentReport;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setReportList,
  setCurrentReport,
  clearReportList,
  clearCurrentReport,
  clearError,
} = reportSlice.actions;
export default reportSlice.reducer;
