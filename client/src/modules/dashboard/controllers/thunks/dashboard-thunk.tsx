import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import dashboardModel from "../../models/dashboard-model";


export const getTotalReports = createAsyncThunk(
    "dashboard/get-total-reports",
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await ApiClient.get(Endpoints.dashboard.totalReports);
            return dashboardModel.fromJson(response);
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
            return dashboardModel.fromJson(response);
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
            return dashboardModel.fromJson(response);
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
            return dashboardModel.fromJson(response);
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
            const response = await ApiClient.get(Endpoints.dashboard.averageSuccessScore);
            return dashboardModel.fromJson(response);
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
            const response = await ApiClient.get(Endpoints.dashboard.averageFailureScore);
            return dashboardModel.fromJson(response);
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
            return response.data.map((item: number) => dashboardModel.fromJson(item));
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


