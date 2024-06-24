import { createSlice } from "@reduxjs/toolkit";
import { RequestState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import { GetRequestInterface } from "../../interfaces/request-interface";
import {
  createRequest,
  deleteRequest,
  getRequestDetails,
  getCreatorRequestsList,
  getAssignedRequestsList,
  updateRequest,
  approveRequest,
} from "../thunks/request-thunk";

//* Initial State
const initialState: RequestState = {
  requests: [],
  assignedRequests: [],
  currentRequest: {
    creator: null,
    creatorId: "",
    createdAt: null,
    report: [],
    reviewerId: "",
    status: "",
    name : "",
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
    clearAssignedRequestList(state) {
      state.assignedRequests = initialState.assignedRequests;
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
    setAssignedRequestList(
      state,
      action: { payload: GetRequestInterface[]; type: string }
    ) {
      state.assignedRequests = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all requests from api
    builder.addCase(getCreatorRequestsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCreatorRequestsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.requests = action.payload;
      state.error = "";
      console.log("getCreatorRequestsList", action.payload);
    });
    builder.addCase(getCreatorRequestsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.requests = initialState.requests;
    });

    //* get all assigned requests from api
    builder.addCase(getAssignedRequestsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAssignedRequestsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.assignedRequests = action.payload;
      state.error = "";
      console.log("getAssignedRequestsList", action.payload);
    });
    builder.addCase(getAssignedRequestsList?.rejected, (state, action) => {
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

    //* approve request
    builder.addCase(approveRequest.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(approveRequest.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      AlertService.showAlert("Request approved successfully", "success");
    });
    builder.addCase(approveRequest.rejected, (state, action) => {
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
