"use client";

import RadiologistLayout from "@/core/layout/radiologist/RadiologistLayout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import RadiologistHomePage from "@/modules/review-requests/view/pages/home/RadiologistHomePage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";

const RadiologistHome = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.RADIOLOGIST]}>
      <RadiologistLayout>
        <RadiologistHomePage />
      </RadiologistLayout>
    </ProtectedLayout>
  );
};

export default RadiologistHome;
