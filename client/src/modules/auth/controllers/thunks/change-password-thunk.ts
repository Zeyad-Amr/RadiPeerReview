import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { ChangePasswordInterface } from "../../interfaces/change-password-interface";
import changePasswordModel from "../../models/change-password-model";

//* change passowrd thunk
  export const changePassoword = createAsyncThunk(
    "auth/changepassoword",
    async (data: ChangePasswordInterface, thunkApi) => {
      const { rejectWithValue } = thunkApi;
      try {
        await ApiClient.patch(
            Endpoints.auth.changePassoword,
            changePasswordModel.toJson(data),
        )
        return true;
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