"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import RequestPage from "@/modules/review-requests/view/pages/RequestPage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";
const RadiologistRequestEl = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.RADIOLOGIST]}>
      <RequestPage />
    </ProtectedLayout>
  );
};

export default RadiologistRequestEl;
