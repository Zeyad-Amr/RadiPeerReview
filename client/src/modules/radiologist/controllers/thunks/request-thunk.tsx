import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import {
  CreateRequestInterface,
  GetRequestInterface,
} from "../../interfaces/request-interface";
import reportModel from "../../models/request-model";

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

//*  Update Request
export const updateRequest = createAsyncThunk(
  "request/update",
  async (data: CreateRequestInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.patch(
        Endpoints.reviewRequest.assign,
        reportModel.toJson(data),
        {
          pathVariables: { id: data.id },
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

//*  Delete Request
export const deleteRequest = createAsyncThunk(
  "request/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.delete(Endpoints.reviewRequest.delete, {
        pathVariables: { id: id },
      });
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);
