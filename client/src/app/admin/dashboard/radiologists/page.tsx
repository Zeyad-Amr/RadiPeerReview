"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import AddRadiologistPage from "@/modules/radiologists/view/pages/radiologist/AddRadiologistPage";
import { Role } from "@/core/shared/constants/enums";
export default function AddRadiologist() {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <AddRadiologistPage />
      </Layout>
    </ProtectedLayout>
  );
}
