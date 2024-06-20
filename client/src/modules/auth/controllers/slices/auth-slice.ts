import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import { login, logout } from "../thunks/auth-thunk";
import { AuthState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: AuthState = {
  loading: false,
  error: "",
  user: null,
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
      AlertService.showAlert("Login Successfully", "success");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* Logout
    builder.addCase(logout.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const { setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
