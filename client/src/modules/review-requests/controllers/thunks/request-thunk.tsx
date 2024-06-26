import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import reportModel from "../../models/request-model";
import reviewRequestModel from "@/modules/review-requests/models/review-request-model";
import { ReviewRequestInterface } from "../../interfaces/review-request-interface";
import { GetRequestInterface } from "../../interfaces/request-interface";

//*  Create Request
export const createRequest = createAsyncThunk(
  "request/create",
  async (data: FormData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      await ApiClient.post(Endpoints.reviewRequest.create, data).then((res) => {
        if (res.status == 201) {
          dispatch(getCreatorRequestsList(false));
          dispatch(getAssignedRequestsList(false));
        }
      });
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Approve Request
export const approveRequest = createAsyncThunk(
  "request/approve",
  async (requestId: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.patch(
        Endpoints.reviewRequest.approve,
        {
          status: 1,
        },
        {
          pathVariables: { id: requestId },
        }
      );
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get All Creator Requests
export const getCreatorRequestsList = createAsyncThunk(
  "request/creator/list",
  async (hideLoading: boolean, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.reviewRequest.list, {
        queryParams: { user_is: "creator" },
        config: { headers: { hideLoading: hideLoading } },
      });
      console.log(response, "response");
      return response?.data?.map((item: any) => reportModel.fromJson(item));
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

export const getAssignedRequestsList = createAsyncThunk(
  "request/reviewer/list",
  async (hideLoading: boolean, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.reviewRequest.list, {
        queryParams: { user_is: "reviewer" },
        config: { headers: { hideLoading: hideLoading } },
      });
      console.log(response, "response");
      return response?.data?.map((item: any) => reportModel.fromJson(item));
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Request Details
export const getRequestDetails = createAsyncThunk(
  "request/details",
  async (id: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.reviewRequest.details, {
        pathVariables: { id: id },
      });
      return reportModel.fromJson(response.data);
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get All Requests
export const getAllRequests = createAsyncThunk(
  "requests/get/all",
  async (hideLoading: boolean, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.reviewRequest.list, {
        config: { headers: { hideLoading: hideLoading } },
      });
      return response.data
        .sort((a: any, b: any) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        })
        .map((item: any) => reviewRequestModel.fromJson(item));
    } catch (error) {
      let errorResponse: ErrorResponse;
      if (error instanceof Error) {
        errorResponse = ErrorMessage.get(error.message) as ErrorResponse;
      } else {
        errorResponse = error as ErrorResponse;
      }
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Assign Review Request
export const AssignReviewRequest = createAsyncThunk(
  "requests/assign",
  async (data: any, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      await ApiClient.patch(
        Endpoints.reviewRequest.assign,
        reviewRequestModel.toJson(data),
        {
          pathVariables: { id: data.id },
        }
      ).then((response) => {
        dispatch(getAllRequests(false));
      });
      return true;
    } catch (error) {
      let errorResponse: ErrorResponse;
      if (error instanceof Error) {
        errorResponse = ErrorMessage.get(error.message) as ErrorResponse;
      } else {
        errorResponse = error as ErrorResponse;
      }
      return rejectWithValue(errorResponse);
    }
  }
);
