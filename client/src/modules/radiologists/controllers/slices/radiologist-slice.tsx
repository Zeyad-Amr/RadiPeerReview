import { createSlice } from "@reduxjs/toolkit";
import { RadiologistState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import {
  getRadiologistList,
  createRadiologist,
  deleteRadiologist,
  getRadiologistDetails,
  updateRadiologist,
} from "../thunks/radiologist-thunk";
import { UserInterface } from "@/modules/auth/interfaces/user-interface";
import userModel from "@/modules/auth/models/user-model";

//* Initial State
const initialState: RadiologistState = {
  radiologists: [],
  currentRadiologist: userModel.defaultValues,
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
      action: { payload: UserInterface; type: string }
    ) {
      state.currentRadiologist = action.payload;
    },
    setRadiologistList(
      state,
      action: { payload: UserInterface[]; type: string }
    ) {
      state.radiologists = action.payload;
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

    //* create radiologist
    builder.addCase(createRadiologist.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createRadiologist.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRadiologist = initialState.currentRadiologist;
      state.error = "";
      AlertService.showAlert("Radiologist added Successfully", "success");
    });
    builder.addCase(createRadiologist.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update radiologist
    builder.addCase(updateRadiologist.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateRadiologist.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRadiologist = initialState.currentRadiologist;
      state.error = "";
      AlertService.showAlert("Data Updated Successfully", "success");
    });
    builder.addCase(updateRadiologist.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete radiologist
    builder.addCase(deleteRadiologist.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteRadiologist.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Radiologist deleted Successfully", "success");
    });
    builder.addCase(deleteRadiologist.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single radiologist details
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
