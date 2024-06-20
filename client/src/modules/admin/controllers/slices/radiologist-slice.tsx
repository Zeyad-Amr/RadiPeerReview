import { createSlice } from "@reduxjs/toolkit";
import { RadiologistState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import Radiologist from "../../models/radiologist-model";
import { RadiologistInterface } from "../../interfaces/radiologist-interface";
import {
    getRadiologistList,
    createRadiologist,
    deleteRadiologist,
    getRadiologistDetails,
    updateRadiologist,
} from "../thunks/radiologist-thunk";

//* Initial State
const initialState: RadiologistState = {
    radiologists: PaginatedListModel.default(),
    currentRadiologist: Radiologist.defaultValues(),
    isFetched: false,
    loading: false,
    error: "",
};

const radiologistSlice = createSlice({
    name: "radiologists",
    initialState,
    reducers: {
        clearError(state) {
            state.error = "";
        },
        clearCurrentRadiologist(state) {
            state.currentRadiologist = initialState.currentRadiologist;
        },
        clearRadiologistList(state) {
            state.radiologists = initialState.radiologists;
        },
        setCurrentRadiologist(
            state,
            action: { payload: RadiologistInterface; type: string }
        ) {
            state.currentRadiologist = action.payload;
        },
        setRadiologistList(
            state,
            action: { payload: RadiologistInterface[]; type: string }
        ) {
            state.radiologists.items = action.payload;
        },
        setLoading(state, action: { payload: boolean; type: string }) {
            state.loading = action.payload;
        },
    },
    extraReducers(builder) {
        //* get all radiologists from api
        builder.addCase(getRadiologistList?.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRadiologistList?.fulfilled, (state, action) => {
            state.loading = false;
            state.radiologists = action.payload;
            state.error = "";
            console.log("getRadiologistList", action.payload);
        });
        builder.addCase(getRadiologistList?.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
            state.radiologists = initialState.radiologists;
        });

        //* create allergy
        builder.addCase(createRadiologist.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createRadiologist.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRadiologist = initialState.currentRadiologist;
            state.radiologists = PaginatedListModel.resetPaginatedList(state.radiologists);
            state.error = "";
            AlertService.showAlert("Radiologist added Successfully", "success");
        });
        builder.addCase(createRadiologist.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });

        //* update allergy
        builder.addCase(updateRadiologist.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateRadiologist.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRadiologist = initialState.currentRadiologist;
            state.radiologists = PaginatedListModel.resetPaginatedList(state.radiologists);
            state.error = "";
            AlertService.showAlert("Data Updated Successfully", "success");
        });
        builder.addCase(updateRadiologist.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });

        //* delete allergy
        builder.addCase(deleteRadiologist.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteRadiologist.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.radiologists = PaginatedListModel.resetPaginatedList(state.radiologists);
            AlertService.showAlert("Radiologist deleted Successfully", "success");
        });
        builder.addCase(deleteRadiologist.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });

        //* get single allergy details
        builder.addCase(getRadiologistDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRadiologistDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRadiologist = action.payload;
            state.error = "";
        });
        builder.addCase(getRadiologistDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentRadiologist = initialState.currentRadiologist;
            AlertService.showAlert(`${state.error}`, "error");
        });
    },
});

export const {
    setLoading,
    setRadiologistList,
    setCurrentRadiologist,
    clearRadiologistList,
    clearCurrentRadiologist,
    clearError,
} = radiologistSlice.actions;
export default radiologistSlice.reducer;
