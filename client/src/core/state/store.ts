import authSlice from "@/modules/auth/controllers/slices/auth-slice";
import radiologistsSlice from "@/modules/radiologists/controllers/slices/radiologist-slice";
import request from "@/modules/review-requests/controllers/slices/request-slice";
import review from "@/modules/review-requests/controllers/slices/review-slice";
import report from "@/modules/review-requests/controllers/slices/report-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import notificationsSlice from "@/modules/notifications/controllers/slices/notifications-slice";
import settingsSlice from "@/modules/settings/controllers/slices/settings-slice";
import analytics from "@/modules/analytics/controllers/slices/analytics-slice";
import changePassword from "@/modules/auth/controllers/slices/change-password-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    radiologists: radiologistsSlice,
    request,
    review,
    report,
    notifications: notificationsSlice,
    settings: settingsSlice,
    analytics,
    changePassword,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
