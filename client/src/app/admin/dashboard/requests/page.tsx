"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import AdminRequestsPage from "@/modules/review-requests/view/pages/admin/AdminRequestsPage";
import React from "react";
import { Role } from "@/core/shared/constants/enums";

const page = () => {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <AdminRequestsPage />
      </Layout>
    </ProtectedLayout>
  );
};

export default page;
