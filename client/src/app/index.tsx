"use client";
import NotificationService from "@/core/shared/utils/notification-service";
import initCornerstone from "../initCornerstone";
import { useEffect } from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initCornerstone();
    NotificationService.init();
  }, []);

  return children;
};
