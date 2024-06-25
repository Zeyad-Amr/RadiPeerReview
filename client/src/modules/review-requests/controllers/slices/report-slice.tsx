import { createSlice } from "@reduxjs/toolkit";
import { ReportState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import { createReport } from "../thunks/report-thunk";

//* Initial State
const initialState: ReportState = {
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
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* create report
    builder.addCase(createReport.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createReport.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Report resubmitted successfully", "success");
    });
    builder.addCase(createReport.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    
  },
});

export const {
  setLoading,
  clearError,
} = reportSlice.actions;
export default reportSlice.reducer;
