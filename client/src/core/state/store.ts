import authSlice from "@/modules/auth/controllers/slices/auth-slice";
import radiologistsSlice from "@/modules/admin/controllers/slices/radiologist-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import notificationsSlice from "@/modules/notifications/controllers/slices/notifications-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    radiologists: radiologistsSlice,
    notifications: notificationsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
