import { createSlice } from "@reduxjs/toolkit";
import { RequestState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import { GetRequestInterface } from "../../interfaces/request-interface";
import {
  createRequest,
  deleteRequest,
  getRequestDetails,
  getRequestsList,
  updateRequest,
} from "../thunks/request-thunk";

//* Initial State
const initialState: RequestState = {
  requests: [],
  currentRequest: {
    creator : null,
    creatorId : "",
    approved: null,
    createdAt: null,
    report: [],
    reviewerId: "",
    status: "",
    id: "",
  },
  isFetched: false,
  loading: false,
  error: "",
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentRequest(state) {
      state.currentRequest = initialState.currentRequest;
    },
    clearRequestList(state) {
      state.requests = initialState.requests;
    },
    setCurrentRequest(
      state,
      action: { payload: GetRequestInterface; type: string }
    ) {
      state.currentRequest = action.payload;
    },
    setRequestList(
      state,
      action: { payload: GetRequestInterface[]; type: string }
    ) {
      state.requests = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all requests from api
    builder.addCase(getRequestsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRequestsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.requests = action.payload;
      state.error = "";
      console.log("getRequestsListtttttttttttttttttttttttttttttttttttt", action.payload);
    });
    builder.addCase(getRequestsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.requests = initialState.requests;
    });

    //* create request
    builder.addCase(createRequest.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createRequest.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRequest = initialState.currentRequest;
      state.error = "";
      AlertService.showAlert("Request added successfully", "success");
    });
    builder.addCase(createRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update request
    builder.addCase(updateRequest.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateRequest.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRequest = initialState.currentRequest;
      state.error = "";
      AlertService.showAlert("Request updated successfully", "success");
    });
    builder.addCase(updateRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete request
    builder.addCase(deleteRequest.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteRequest.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Request deleted successfully", "success");
    });
    builder.addCase(deleteRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single request details
    builder.addCase(getRequestDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRequestDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentRequest = action.payload;
      state.error = "";
    });
    builder.addCase(getRequestDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentRequest = initialState.currentRequest;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setRequestList,
  setCurrentRequest,
  clearRequestList,
  clearCurrentRequest,
  clearError,
} = requestSlice.actions;
export default requestSlice.reducer;
