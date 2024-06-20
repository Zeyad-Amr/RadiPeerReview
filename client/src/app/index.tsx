"use client";
import NotificationService from "@/core/shared/utils/notification-service";
import initCornerstone from "../initCornerstone";
import { useEffect } from "react";
import NotificationListener from "@/modules/notifications/view/compnents/NotificationListener";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initCornerstone();
    NotificationService.init();
  }, []);

  return (
    <>
      <NotificationListener />
      {children}
    </>
  );
};
