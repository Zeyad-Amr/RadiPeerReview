import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import { login } from "../thunks/auth-thunk";
import { AuthState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";


//* Initial State
const initialState: AuthState = {

    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {


        //* Login
        builder.addCase(login.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(login.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert("Login Successfully", "success");
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });

    },
});

export const {
    setLoading,
    setError,
} = authSlice.actions;
export default authSlice.reducer;