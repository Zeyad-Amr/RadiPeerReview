"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import RadiologistPage from "@/modules/radiologists/view/pages/RadiologistPage";
import { Role } from "@/core/shared/constants/enums";
export default function AddRadiologist() {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <RadiologistPage />
      </Layout>
    </ProtectedLayout>
  );
}
