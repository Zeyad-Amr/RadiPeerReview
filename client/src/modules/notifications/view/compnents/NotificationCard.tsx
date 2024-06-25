import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { NotificationInterface } from "../../interfaces/notification-interface";
import { NotificationType } from "@/core/shared/constants/enums";
import { fFullDateTime } from "@/core/shared/utils/format-time";
import { useAppDispatch } from "@/core/state/store";
import { markNotificationAsRead } from "../../controllers/thunks/notifications-thunk";
import {
  AssignmentInd,
  AssignmentLate,
  RateReview,
  AssignmentReturn,
  Feedback,
  CheckCircle,
  Notifications,
  Cancel,
  Replay,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
interface NotificationCardProps {
  notification: NotificationInterface;
}

const NotificationCard = (props: NotificationCardProps) => {
  const disptach = useAppDispatch();
  const router = useRouter();
  const { notification } = props;
  const iconMapping = {
    [NotificationType.REQUEST_ASSIGNED]: AssignmentInd,
    [NotificationType.UNASSIGNED_REVIEW_REQUEST]: AssignmentLate,
    [NotificationType.REQUEST_REVIEWED]: RateReview,
    [NotificationType.REQUEST_REPORT_RESUBMITTED]: AssignmentReturn,
    [NotificationType.REVIEW_FEEDBACK_RECEIVED]: Feedback,
    [NotificationType.REQUEST_APPROVED]: CheckCircle,
    [NotificationType.GENERAL]: Notifications,
    [NotificationType.REQUEST_REJECTED]: Cancel,
    [NotificationType.REQUEST_REREVIEWED]: Replay,
  };
  const notificationTitles = {
    [NotificationType.REQUEST_ASSIGNED]: "Assigned Review",
    [NotificationType.UNASSIGNED_REVIEW_REQUEST]: "New Review Request",
    [NotificationType.REQUEST_REVIEWED]: "Review Completed",
    [NotificationType.REQUEST_REPORT_RESUBMITTED]: "Report Resubmitted",
    [NotificationType.REVIEW_FEEDBACK_RECEIVED]: "Review Feedback",
    [NotificationType.REQUEST_APPROVED]: "Request Approved",
    [NotificationType.GENERAL]: "General Notification",
    [NotificationType.REQUEST_REJECTED]: "Request Rejected",
    [NotificationType.REQUEST_REREVIEWED]: "Re-reviewed Request",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={() => {
        console.log("Notification Clicked", notification);
        disptach(markNotificationAsRead(notification.id));
        if (notification.type === NotificationType.UNASSIGNED_REVIEW_REQUEST) {
          router.push("/admin/dashboard/requests");
        } else if (
          notification.type === NotificationType.REQUEST_REVIEWED ||
          notification.type === NotificationType.REQUEST_APPROVED ||
          notification.type === NotificationType.REQUEST_REJECTED ||
          notification.type === NotificationType.REQUEST_REREVIEWED
        ) {
          if (notification.entityId) {
            router.push(
              `/radiologist/dashboard/request/${notification.entityId}?role=creator`
            );
          }
        } else if (
          notification.type === NotificationType.REQUEST_ASSIGNED ||
          notification.type === NotificationType.REQUEST_REPORT_RESUBMITTED ||
          notification.type === NotificationType.REVIEW_FEEDBACK_RECEIVED
        ) {
          if (notification.entityId) {
            router.push(
              `/radiologist/dashboard/request/${notification.entityId}?role=reviewer`
            );
          }
        }
      }}
    >
      <Box sx={{ color: "secondary.main", mr: 2 }}>
        {iconMapping[notification.type] ? (
          React.createElement(iconMapping[notification.type])
        ) : (
          <AddRoundedIcon />
        )}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "0.8rem", color: "primary.light" }}>
            {notificationTitles[notification.type]}
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
