import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";

//*  Create Report
export const createReport = createAsyncThunk(
  "report/create",
  async (data: FormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.post(Endpoints.report.create, data);
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);


