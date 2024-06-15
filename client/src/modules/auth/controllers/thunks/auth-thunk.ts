import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiClient,
    Endpoints,
    ErrorMessage,
    ErrorResponse
} from "@/core/api";
import { AuthInterface } from "../../interfaces/auth-interface";
import authModel from "../../models/auth-model";


//* Login thunk
export const login = createAsyncThunk(
    "auth/login",
    async (data: AuthInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            const response = await ApiClient.post(
                Endpoints.auth.login,
                authModel.toJson(data)
            );
            return response.data;
        } catch (error: any) {
            const errorResponse: ErrorResponse =
                error instanceof Error ? ErrorMessage.get(error.message) : error;
            return rejectWithValue(errorResponse);
        }
    }
);
