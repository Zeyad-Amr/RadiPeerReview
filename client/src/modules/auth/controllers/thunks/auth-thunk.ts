import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { AuthInterface } from "../../interfaces/auth-interface";
import authModel from "../../models/auth-model";
import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import userModel from "../../models/user-model";

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
      SessionStorage.saveData(SessionStorageKeys.userData, response.data.auth);
      SessionStorage.saveData(SessionStorageKeys.token, response.data.token);
      return userModel.fromJson(response.data.auth);
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get all users
export const getAllUsers = createAsyncThunk(
  "auth/get-users",
  async (_, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
          const response = await ApiClient.get(Endpoints.auth.list);
          return response.data.map((item: any) => userModel.fromJson(item));
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

//* Logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      SessionStorage.clearAll();
      return null;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const userData = SessionStorage.getDataByKey(SessionStorageKeys.userData);
    if (userData) return userModel.fromJson(userData);

    return null;
  } catch (error: any) {
    const errorResponse: ErrorResponse =
      error instanceof Error ? ErrorMessage.get(error.message) : error;
    return rejectWithValue(errorResponse);
  }
});
