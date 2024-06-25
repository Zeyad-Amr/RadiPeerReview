import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
} from "@/core/api";
import { ReviewDataInterface } from "../../interfaces/review-interface";
import reviewDataModel from "../../models/review-model";

//*  Create Review
export const createReview = createAsyncThunk(
  "review/create",
  async (data: ReviewDataInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.post(Endpoints.review.create, reviewDataModel.toJson(data));
      return true;
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);


//*  Get All Reviews
export const getReviewsList = createAsyncThunk(
  "review/list",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.review.list);
      console.log(response, "response");
      return response?.data?.items?.map((item: ReviewDataInterface) =>
        reviewDataModel.fromJson(item)
      );
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Review Details
export const getReviewDetails = createAsyncThunk(
  "review/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.review.details, {
        pathVariables: { id: id },
      });
      return reviewDataModel.fromJson(response.data);
    } catch (error: any) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete Review
export const deleteReview = createAsyncThunk(
  "review/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.delete(Endpoints.review.delete, {
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
