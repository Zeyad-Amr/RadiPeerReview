"use client";

import Layout from "@/core/layout/Layout";
import DashboardPage from "@/modules/admin/view/pages/dashboard/DashboardPage";
import SettingsPage from "@/modules/settings/view/pages/SettingsPage";
import { Typography } from "@mui/material";

export default function Settings() {
  return (
    <Layout>
      <SettingsPage />
    </Layout>
  );
}
