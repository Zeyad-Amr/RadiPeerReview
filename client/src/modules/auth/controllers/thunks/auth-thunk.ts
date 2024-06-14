import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiClient,
    Endpoints,
    ErrorMessage,
    ErrorResponse
} from "@/core/api";
import { AuthInterface } from "../../interfaces/auth-interface";
import authModel from "../../models/auth-model";


//*  Create Allergy
export const login = createAsyncThunk(
    "auth/login",
    async (data: AuthInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;

        try {
            await ApiClient.post(
                Endpoints.auth.login,
                authModel.toJson(data)
            );
            return true;
        } catch (error: any) {
            const errorResponse: ErrorResponse =
                error instanceof Error ? ErrorMessage.get(error.message) : error;
            return rejectWithValue(errorResponse);
        }
    }
);
