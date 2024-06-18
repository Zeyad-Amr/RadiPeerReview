"use client";
import NotificationService from "@/core/shared/utils/notification-service";
import { useEffect } from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    NotificationService.init();
  }, []);

  return children;
};
