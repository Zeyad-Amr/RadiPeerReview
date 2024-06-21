import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import { NotificationInterface } from "../../interfaces/notification-interface";
import { NotificationType } from "@/core/shared/constants/enums";
import { fFullDateTime } from "@/core/shared/utils/format-time";
interface NotificationCardProps {
  notification: NotificationInterface;
}

const NotificationCard = (props: NotificationCardProps) => {
  const { notification } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ color: "secondary.main", mr: 2 }}>
        {notification.type === NotificationType.REQUEST_ASSIGNED ? (
          <AddRoundedIcon />
        ) : notification.type === NotificationType.REQUEST_APPROVED ? (
          <CheckRoundedIcon />
        ) : (
          <CampaignRoundedIcon />
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "primary.light" }}>
            {notification.type}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "primary.light" }}>
            {/* format Date and Time */}
            {fFullDateTime(notification.createdAt)}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "0.8rem", color: "primary.main" }}>
          {notification.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationCard;
