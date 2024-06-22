import { Badge, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { RootState, useAppSelector } from "../../../../core/state/store";
import NotificationsListComponent from "./NotificationsListComponent";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsIconComponent = () => {
  const notificationsState = useAppSelector(
    (state: RootState) => state.notifications
  );

  const [scale, setScale] = React.useState(false);
  return (
    <>
      <IconButton
        size="large"
        aria-label="show_badge"
        color="inherit"
        onClick={() => setScale(!scale)}
      >
        {notificationsState.notifications.length > 0 ? (
          <Badge
            badgeContent={notificationsState.notifications.length}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "secondary.main",
                color: "white",
              },
            }}
          >
            <NotificationsIcon sx={{ color: "primary.main" }} />
          </Badge>
        ) : (
          <NotificationsIcon sx={{ color: "primary.main" }} />
        )}
      </IconButton>
      <NotificationsListComponent scaleProp={scale} />
    </>
  );
};

export default NotificationsIconComponent;
