import { createSlice } from "@reduxjs/toolkit";
import { getUserNotifications } from "../thunks/notifications-thunk";
import AlertService from "@/core/shared/utils/alert-service";
import { ErrorResponse } from "@/core/api";
import { NotificationState } from "../types";

//* Initial State
const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: "",
};

const notificationSlice = createSlice({
  name: "notifications",
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
    //* get all user notifications
    builder.addCase(getUserNotifications?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserNotifications?.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
      state.error = "";
      console.log("Notifications", state.notifications);
    });
    builder.addCase(getUserNotifications?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.notifications = initialState.notifications;
    });
  },
});

export const { setLoading, clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
