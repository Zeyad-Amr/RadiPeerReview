import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
} from "@/core/api";
import { ReportInterface } from "../../interfaces/report-interface";
import reportModel from "../../models/report-model";

//*  Create Report
export const createReport = createAsyncThunk(
  "report/create",
  async (data: ReportInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.post(Endpoints.report.create, reportModel.toJson(data));
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update Report
export const updateReport = createAsyncThunk(
  "report/update",
  async (data: ReportInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await ApiClient.patch(Endpoints.report.update, reportModel.toJson(data), {
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

//*  Get All Reports
export const getReportsList = createAsyncThunk(
  "report/list",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.report.list);
      console.log(response, "response");
      return response?.data?.items?.map((item: ReportInterface) =>
        reportModel.fromJson(item)
      );
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Report Details
export const getReportDetails = createAsyncThunk(
  "report/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.report.details, {
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

//*  Delete Report
export const deleteReport = createAsyncThunk(
  "report/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.delete(Endpoints.report.delete, {
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
