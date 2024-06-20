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
  "radiologist/add",
  async (data: RadiologistInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.post(
        Endpoints.radiologist.add,
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
  "radiologist/update",
  async (data: RadiologistInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.patch(
        Endpoints.radiologist.update,
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
  "radiologist/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.radiologist.list, {
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
  "radiologist/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.radiologist.details, {
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
  "details/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await ApiClient.delete(Endpoints.radiologist.delete, {
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
