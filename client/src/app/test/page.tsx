"use client";

import Layout from "@/core/layout/Layout";
import NotificationService from "@/core/shared/utils/notification-service";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PdfViewer from "@/modules/viewers/PdfViewer";
import RequestPage from "@/modules/request/view/pages/RequestPage";

export default function Test() {
  return <RequestPage />;
}
