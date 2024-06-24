import { createSlice } from "@reduxjs/toolkit";
import {
    AssignReviewRequest,
    getAdminReports,
    getRadiologists,
} from "../thunks/review-request-thunk";
import { ErrorResponse } from "@/core/api";
import { ReviewRequestState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: ReviewRequestState = {
    reports: [],
    radiologists: [],
    loading: false,
    error: "",
};

const reviewRequestSlice = createSlice({
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
            state.radiologists = initialState.radiologists;
        });
      
        //* get all radiologists
        builder.addCase(getRadiologists.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRadiologists.fulfilled, (state, action) => {
            state.loading = false;
            state.radiologists = action.payload;
            state.error = "";
        });
        builder.addCase(getRadiologists.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.radiologists = initialState.radiologists;
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

export const { setLoading, clearError } = reviewRequestSlice.actions;
export default reviewRequestSlice.reducer;
