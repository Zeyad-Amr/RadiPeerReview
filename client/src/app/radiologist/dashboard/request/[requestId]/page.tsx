"use client";

import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import RequestPage from "@/modules/review-requests/view/pages/RequestPage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";
import RadiologistLayout from "@/core/layout/radiologist/RadiologistLayout";
const RadiologistRequestEl = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.RADIOLOGIST]}>
      <RadiologistLayout>
        <RequestPage />
      </RadiologistLayout>
    </ProtectedLayout>
  );
};

export default RadiologistRequestEl;
