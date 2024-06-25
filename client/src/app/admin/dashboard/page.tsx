"use client";

import Layout from "@/core/layout/Layout";
import ProtectedLayout from "@/core/shared/components/ProtectedLayout";
import DashboardPage from "@/modules/analytics/view/pages/AnalyticsPage";
import { Role } from "@/core/shared/constants/enums";

export default function Dashboard() {
  return (
    <ProtectedLayout allowedRoles={[Role.ADMIN]}>
      <Layout>
        <DashboardPage />
      </Layout>
    </ProtectedLayout>
  );
}
