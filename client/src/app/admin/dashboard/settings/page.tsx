"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import { Role } from "@/core/shared/constants/enums";
import SettingsPage from "@/modules/settings/view/pages/SettingsPage";

export default function Settings() {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <SettingsPage />
      </Layout>
    </ProtectedLayout>
  );
}
