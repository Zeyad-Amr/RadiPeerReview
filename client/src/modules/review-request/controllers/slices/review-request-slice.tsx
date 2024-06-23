import { createSlice } from "@reduxjs/toolkit";
import {
    AssignReviewRequest,
    getAdminReports,
} from "../thunks/review-request-thunk";
import { ErrorResponse } from "@/core/api";
import { ReviewRequestState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: ReviewRequestState = {
    reports: [],
    loading: false,
    error: "",
};

const adminReportsSlice = createSlice({
    name: "admin-reports",
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
        //* get all admin requests
        builder.addCase(getAdminReports.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAdminReports.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = action.payload;
            state.error = "";
        });
        builder.addCase(getAdminReports.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.reports = initialState.reports;
        });

        //* get all assign request review

        builder.addCase(AssignReviewRequest.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(AssignReviewRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert("Request assigned Successfully", "success");
        });
        builder.addCase(AssignReviewRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });
    },
});

export const { setLoading, clearError } = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
