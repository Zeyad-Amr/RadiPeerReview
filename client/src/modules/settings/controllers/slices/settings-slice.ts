import { createSlice } from "@reduxjs/toolkit";
import { ErrorResponse } from "@/core/api";
import { SettingsState } from "../types";
import {
  getAssignmentMode,
  toggleAssignmentMode,
} from "../thunks/settings-thunk";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: SettingsState = {
  isAutoAssignMode: false,
  loading: false,
  error: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* Get Assignment Mode
    builder.addCase(getAssignmentMode.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAssignmentMode.fulfilled, (state, action) => {
      state.loading = false;
      state.isAutoAssignMode = action.payload;
      state.error = "";
    });

    builder.addCase(getAssignmentMode.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* Toggle Assignment Mode
    builder.addCase(toggleAssignmentMode.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(toggleAssignmentMode.fulfilled, (state, action) => {
      state.loading = false;
      state.isAutoAssignMode = action.payload;
      state.error = "";
      AlertService.showAlert("Assignment mode updated successfully", "success");
    });
    builder.addCase(toggleAssignmentMode.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const { setLoading, clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
