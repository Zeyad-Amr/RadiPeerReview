import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { RadiologistInterface } from "../../interfaces/radiologist-interface";
import Radiologist from "../../models/radiologist-model";

//*  Create Radiologist
export const createRadiologist = createAsyncThunk(
  "Radiologist/add",
  async (data: RadiologistInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.addRadiologist.add,
        Radiologist.toJson(data)
      );
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

//*  Update Radiologist
export const updateRadiologist = createAsyncThunk(
  "Radiologist/update",
  async (data: RadiologistInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.addRadiologist.update,
        Radiologist.toJson(data),
        {
          pathVariables: { id: data.id },
        }
      );
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

//*  Get All AddRadiologist
export const getRadiologistList = createAsyncThunk(
  "Radiologist/getAll",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.addRadiologist.getAll, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<RadiologistInterface>(
        response.data,
        response.data.items.map((item: any) => Radiologist.fromJson(item)),
        filters
      );
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

//*  Get Radiologist Details
export const getRadiologistDetails = createAsyncThunk(
  "Radiologist/get",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.addRadiologist.get, {
        pathVariables: { id: id },
      });
      return Radiologist.fromJson(response.data);
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

//*  Delete Radiologist
export const deleteRadiologist = createAsyncThunk(
  "Radiologist/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.addRadiologist.delete, {
        pathVariables: { id: id },
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
