"use client";

import Layout from "@/core/layout/Layout";
import NotificationService from "@/core/shared/utils/notification-service";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PdfViewer from "@/modules/viewers/PdfViewer";

export default function Test() {
  const fileUrl =
    "https://www.nasa.gov/sites/default/files/atoms/files/nasa_2020_strategic_plan.pdf";
  return (
    <Box>
      <PdfViewer pdfUrl={fileUrl} />
    </Box>
  );
}
