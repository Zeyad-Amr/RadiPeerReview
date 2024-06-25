import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import {
  UserFormInterface,
  UserInterface,
} from "@/modules/auth/interfaces/user-interface";
import userModel from "@/modules/auth/models/user-model";

//*  Create Radiologist
export const createRadiologist = createAsyncThunk(
  "radiologist/add",
  async (data: UserFormInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      await ApiClient.post(
        Endpoints.radiologist.add,
        userModel.toJsonCreate(data)
      ).then((response) => {
        dispatch(getRadiologistList());
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

//*  Update Radiologist
export const updateRadiologist = createAsyncThunk(
  "radiologist/update",
  async (data: UserFormInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      await ApiClient.patch(
        Endpoints.radiologist.update,
        userModel.toJsonUpdate(data),
        {
          pathVariables: { id: data.id },
        }
      ).then((response) => {
        dispatch(getRadiologistList());
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

//*  Get All AddRadiologist
export const getRadiologistList = createAsyncThunk(
  "radiologist/list",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.radiologist.list);
      console.log(response, "response");
      return response.data.map((item: any) =>
        userModel.fromRadiologistJson(item)
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
      return userModel.fromJson(response.data);
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
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      await ApiClient.delete(Endpoints.radiologist.delete, {
        pathVariables: { id: id },
      }).then((response) => {
        dispatch(getRadiologistList());
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
