import authSlice from "@/modules/auth/controllers/slices/auth-slice";
import radiologistsSlice from "@/modules/admin/controllers/slices/radiologist-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authSlice,
    radiologists: radiologistsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
