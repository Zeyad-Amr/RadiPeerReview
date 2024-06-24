import authSlice from "@/modules/auth/controllers/slices/auth-slice";
import radiologistsSlice from "@/modules/admin/controllers/slices/radiologist-slice";
import request from "@/modules/radiologist/controllers/slices/request-slice";
import review from "@/modules/radiologist/controllers/slices/review-slice";
import report from "@/modules/radiologist/controllers/slices/report-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import notificationsSlice from "@/modules/notifications/controllers/slices/notifications-slice";
import settingsSlice from "@/modules/settings/controllers/slices/settings-slice";
import reviewRequestSlice from "@/modules/review-request/controllers/slices/review-request-slice";
import dashboardSlice from "@/modules/dashboard/controllers/slices/dashboard-slice";
import allUsersSlice from "@/modules/auth/controllers/slices/get-users-slice";
import changePasswordSlice from "@/modules/auth/controllers/slices/change-password-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    radiologists: radiologistsSlice,
    request,
    review,
    report,
    notifications: notificationsSlice,
    settings: settingsSlice,
    reviewRequestSlice,
    dashboardSlice,
    allUsersSlice,
    changePasswordSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
