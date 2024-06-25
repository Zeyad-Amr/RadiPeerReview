"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import ReportsPage from "@/modules/review-requests/view/pages/admin/ReportsPage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";

const page = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <ReportsPage />
      </Layout>
    </ProtectedLayout>
  );
};

export default page;
