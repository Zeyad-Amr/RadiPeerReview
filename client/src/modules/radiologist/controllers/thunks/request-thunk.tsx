import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
} from "@/core/api";
import { CreateRequestInterface, GetRequestInterface } from "../../interfaces/request-interface";
import reportModel from "../../models/report-model";

//*  Create Request
export const createRequest = createAsyncThunk(
  "request/create",
  async (data: FormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.post(Endpoints.reviewRequest.create, data);
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
      await ApiClient.patch(Endpoints.reviewRequest.update, reportModel.toJson(data), {
        pathVariables: { id: data.id },
      });
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get All Requests
export const getRequestsList = createAsyncThunk(
  "request/list",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.reviewRequest.list);
      console.log(response, "response");
      return response?.data?.map((item: any) =>
        reportModel.fromJson(item)
      );
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
  async (id: string | number, thunkApi) => {
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
