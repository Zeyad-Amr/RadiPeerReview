import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import utilsFunctions from "@/core/shared/utils/functions";

export const getTotalReports = createAsyncThunk(
  "dashboard/get-total-reports",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.dashboard.totalReports);
      return response.data as number;
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

export const getAcceptedReports = createAsyncThunk(
  "dashboard/get-accepted-reports",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.dashboard.acceptedReports);
      return response.data as number;
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

export const getRejectedReports = createAsyncThunk(
  "dashboard/get-rejected-reports",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.dashboard.rejectedReports);
      return response.data as number;
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

export const getPendingReports = createAsyncThunk(
  "dashboard/get-pending-reports",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.dashboard.pendingReports);
      return response.data as number;
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

export const getAverageSuccessScore = createAsyncThunk(
  "dashboard/get-average-success-score",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(
        Endpoints.dashboard.averageSuccessScore
      );
      return utilsFunctions.roundNumber(response.data, 2);
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

export const getAverageFailureScore = createAsyncThunk(
  "dashboard/get-average-failure-score",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(
        Endpoints.dashboard.averageFailureScore
      );
      return utilsFunctions.roundNumber(response.data, 2);
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

export const getLeaderboard = createAsyncThunk(
  "dashboard/get-leaderboard",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.dashboard.leaderboard);
      return response.data as any[];
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
