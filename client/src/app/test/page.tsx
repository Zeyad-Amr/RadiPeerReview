"use client";

import Layout from "@/core/layout/Layout";
import NotificationService from "@/core/shared/utils/notification-service";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function Test() {
  return (
    <Box>
      <Button
        onClick={() => {
          NotificationService.showNotification("testtttt", "success");
        }}
      >
        Notify
      </Button>
    </Box>
  );
}
