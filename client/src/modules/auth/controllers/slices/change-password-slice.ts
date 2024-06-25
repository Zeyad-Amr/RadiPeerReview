import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import { getMe, login, logout } from "../thunks/auth-thunk";
import { AuthState, ChangePasswordState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";
import { changePassoword } from "../thunks/change-password-thunk";

//* Initial State
const initialState: ChangePasswordState = {
  loading: false,
  error: "",
};

const changePassword = createSlice({
  name: "changepassoword",
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
    //* change password
    builder.addCase(changePassoword.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(changePassoword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";

      AlertService.showAlert("Password Updated Successfully", "success");
    });
    builder.addCase(changePassoword.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const { setLoading, setError } = changePassword.actions;
export default changePassword.reducer;
