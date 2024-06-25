"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import DicomViewer from "@/modules/viewers/DicomViewer";
import React from "react";
import { Role } from "@/core/shared/constants/enums";
const RadiologistRequestEl = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN, Role.RADIOLOGIST]}>
      <DicomViewer />;
    </ProtectedLayout>
  );
};

export default RadiologistRequestEl;
