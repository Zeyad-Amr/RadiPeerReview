"use client";

import RadiologistLayout from "@/core/layout/radiologist/RadiologistLayout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import RadiologistRequestsPage from "@/modules/review-requests/view/pages/radiologist/RadiologistRequestsPage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";

const RadiologistHome = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.RADIOLOGIST]}>
      <RadiologistLayout>
        <RadiologistRequestsPage />
      </RadiologistLayout>
    </ProtectedLayout>
  );
};

export default RadiologistHome;
