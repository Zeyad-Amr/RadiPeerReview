import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import notificationModel from "../../model/notification-model";

//*  Get All User Notification
export const getUserNotifications = createAsyncThunk(
  "notifications/get",
  async (userId: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log("userId", userId);
      const response = await ApiClient.get(Endpoints.notification.list, {
        pathVariables: {
          id: userId,
        },
      });
      console.log("response", response);

      return response.data.map((item: any) => notificationModel.fromJson(item));
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