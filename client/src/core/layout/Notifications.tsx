import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NotificationCard from "./NotificationCard";
const Notifications = ({ scaleProp }: { scaleProp: boolean }) => {
  interface notification {
    type: string;
    body: string;
    time: string;
  }
  const notifications = [
    {
      type: "Add Report",
      body: "Dr. Body Yasser added a new report",
      time: "3:54 am",
    },
    {
      type: "Accept Report",
      body: "Dr. Body Yasser accepted Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
    {
      type: "Reviewed Report",
      body: "Dr. Body Yasser reviewed Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
    {
      type: "Add Report",
      body: "Dr. Body Yasser added a new report",
      time: "3:54 am",
    },
    {
      type: "Accept Report",
      body: "Dr. Body Yasser accepted Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
    {
      type: "Reviewed Report",
      body: "Dr. Body Yasser reviewed Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
    {
      type: "Accept Report",
      body: "Dr. Body Yasser accepted Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
    {
      type: "Reviewed Report",
      body: "Dr. Body Yasser reviewed Dr. Zeyad Amr's report",
      time: "3:54 am",
    },
  ];
  const [scale, setScale] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (!firstRender) {
      setScale(1);
    } else {
      setFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scaleProp]);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#00000000",
          zIndex: 1,
          display: scale === 0 ? "none" : "block",
        }}
        onClick={() => setScale(0)}
      />
      <Box
        sx={{
          width: "20rem",
          height: "30rem",
          backgroundColor: "white",
          position: "absolute",
          right: "2rem",
          top: "4rem",
          boxShadow: "0 0 20px #00000020",
          borderRadius: "1rem",
          padding: "1rem",
          boxSizing: "border-box",
          overflowY: "auto",
          transition: "0.2s",
          scale: scale,
          transformOrigin: "top right",
          zIndex: 2,
        }}
      >
        <Typography sx={{ color: "primary.light" }}>Notifications</Typography>
        <Box
          sx={{
            padding: "1rem 0",
            boxSizing: "border-box",
          }}
        >
          {notifications.map((notification: notification, i: number) => (
            <>
              <NotificationCard key={i} notification={notification} />
              {i !== notifications.length - 1 ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: "primary.lighter",
                    margin: "0.75rem 0",
                  }}
                />
              ) : null}
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Notifications;
