// components/NotificationListener.tsx
import socket from "@/core/shared/utils/socket";
import { useEffect } from "react";

const NotificationListener = () => {
  useEffect(() => {
    socket.on("notification", (message: string) => {
      alert(`New notification: ${message}`);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return null;
};

export default NotificationListener;
