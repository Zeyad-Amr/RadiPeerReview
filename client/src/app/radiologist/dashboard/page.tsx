"use client";

import RadiologistLayout from "@/core/layout/radiologist/RadiologistLayout";
import RadiologistHomePage from "@/modules/review-requests/view/pages/home/RadiologistHomePage";
import React from "react";

const RadiologistHome = () => {
  return (
    <RadiologistLayout>
      <RadiologistHomePage />
    </RadiologistLayout>
  );
};

export default RadiologistHome;
