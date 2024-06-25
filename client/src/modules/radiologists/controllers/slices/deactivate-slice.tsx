import { createSlice } from "@reduxjs/toolkit";
import { DeactivateState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import {
    updateRadiologist,
} from "../thunks/radiologist-thunk";

const initialState: DeactivateState = {
    isdeactivated: false,
    loading: false,
    error: "",
};

const deactivateSlice = createSlice({
    name: "deactivate",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(updateRadiologist.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateRadiologist.fulfilled, (state, _action) => {
            state.loading = false;
            state.isdeactivated = initialState.isdeactivated;
            state.error = "";
            AlertService.showAlert("Data Updated Successfully", "success");
        });
        builder.addCase(updateRadiologist.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });
    },
});

export const {
    setLoading,
} = deactivateSlice.actions;
export default deactivateSlice.reducer;