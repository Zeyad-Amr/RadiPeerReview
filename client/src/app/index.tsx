"use client";
import NotificationService from "@/core/shared/utils/notification-service";
import initCornerstone from "../initCornerstone";
import { useEffect } from "react";
import NotificationListener from "@/modules/notifications/view/compnents/NotificationListener";
import { useAppDispatch } from "@/core/state/store";
import { getMe } from "@/modules/auth/controllers/thunks/auth-thunk";
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initCornerstone();
    NotificationService.init();
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NotificationListener />
      {children}
    </>
  );
};
