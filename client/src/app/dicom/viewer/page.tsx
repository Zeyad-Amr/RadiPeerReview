"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";

import dynamic from "next/dynamic";

import React from "react";
import { Role } from "@/core/shared/constants/enums";

// Dynamically import the DicomViewer component
const DicomViewer = dynamic(() => import("@/modules/viewers/DicomViewer"), {
  ssr: false,
});
const RadiologistRequestEl = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN, Role.RADIOLOGIST]}>
      <DicomViewer />;
    </ProtectedLayout>
  );
};

export default RadiologistRequestEl;
