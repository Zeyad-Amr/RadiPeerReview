import { createSlice } from "@reduxjs/toolkit";
import {
    getAdminReports,
} from "../thunks/review-request-thunk";
import { ErrorResponse } from "@/core/api";
import { ReviewRequestState } from "../types";

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
        //* get all admin reports
        builder.addCase(getAdminReports.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAdminReports.fulfilled, (state, action) => {
            state.loading = false;
            state.reports = action.payload;
            state.error = "";
            console.log("Notifications", state.reports);
        });
        builder.addCase(getAdminReports.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.reports = initialState.reports;
        });
    },
});

export const { setLoading, clearError } = adminReportsSlice.actions;
export default adminReportsSlice.reducer;
