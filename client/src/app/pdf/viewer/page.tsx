"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import PdfViewer from "@/modules/viewers/PdfViewer";
import React from "react";
import { Role } from "@/core/shared/constants/enums";
const RadiologistRequestEl = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN, Role.RADIOLOGIST]}>
      <PdfViewer />
    </ProtectedLayout>
  );
};

export default RadiologistRequestEl;
