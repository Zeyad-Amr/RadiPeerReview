"use client";

import { AppServicesLocator } from "@/core/service-locator";

export const ServiceLocatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  AppServicesLocator.init();

  return <>{children}</>;
};
