import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { ConfigKey } from "../../interfaces/config-interface";
import configModel from "../../model/config-model";
import { RootState } from "@/core/state/store";

//*  Get Assignment Mode
export const getAssignmentMode = createAsyncThunk(
  "settings/getAssignmentMode",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await ApiClient.get(Endpoints.config.get, {
        pathVariables: {
          key: ConfigKey.assignmentMode,
        },
      });
      console.log("response", response);

      return configModel.fromJson(response.data).value === "auto";
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

//* toggle Assignment Mode
export const toggleAssignmentMode = createAsyncThunk(
  "settings/toggleAssignmentMode",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    try {
      const newAssignmentMode = (getState() as RootState).settings
        .isAutoAssignMode
        ? "manual"
        : "auto";
      const response = await ApiClient.post(
        Endpoints.config.update,
        configModel.toJson({
          key: ConfigKey.assignmentMode,
          value: newAssignmentMode,
        })
      );
      console.log("response", response);
      return newAssignmentMode === "auto";
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
