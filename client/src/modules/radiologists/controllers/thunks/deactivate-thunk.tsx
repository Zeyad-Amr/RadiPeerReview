import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRadiologistList } from "./radiologist-thunk";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";

export const deactivateRadiologist = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
    "radiologist/deactivate",
    async (id, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        try {
            const response = await ApiClient.patch(
                Endpoints.radiologist.deactivate.replace(':id', id),
                {}
            );

            if (response.status === 200) {
                dispatch(getRadiologistList());
                AlertService.showAlert("Radiologist deactivated Successfully", "success");
                return true;
            } else {
                AlertService.showAlert("Failed to deactivate radiologist", "error");
                throw new Error('Failed to deactivate radiologist');
            }
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

export const activateRadiologist = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
    "radiologist/activate",
    async (id, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        try {
            const response = await ApiClient.patch(
                Endpoints.radiologist.activate.replace(':id', id),
                {}
            );

            if (response.status === 200) {
                dispatch(getRadiologistList());
                AlertService.showAlert("Radiologist activated Successfully", "success");

                return true;
            } else {
                AlertService.showAlert("Failed to activate radiologist", "error");
                throw new Error('Failed to activate radiologist');
            }
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
