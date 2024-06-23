import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewRequestModel from "../../models/review-request-model";
import { ReviewRequestInterface } from "../../interfaces/review-request-interface";


//*  Get All Reports
export const getAdminReports = createAsyncThunk(
    "review-request/get",
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await ApiClient.get(Endpoints.reviewRequest.list);
            return response.data.map((item: any) => reviewRequestModel.fromJson(item));
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

//*  Assign Review Request
export const AssignReviewRequest = createAsyncThunk(
    "review-request/assign",
    async (data: any, thunkApi) => {
      const { rejectWithValue, dispatch } = thunkApi;
      try {  
        await ApiClient.patch(
          Endpoints.reviewRequest.assign,
          reviewRequestModel.toJson(data),
          {
            pathVariables: { id: data.id },
          }
        ).then((response) => {
          dispatch(getAdminReports());
        });
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