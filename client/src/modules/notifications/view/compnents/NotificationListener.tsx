import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import useSocketConnection from "@/core/shared/utils/socket";
import { RootState, useAppSelector } from "@/core/state/store";
import { useEffect } from "react";

const NotificationListener = () => {
  const authState = useAppSelector((state: RootState) => state.auth);

  const socket = useSocketConnection(authState.user?.id ?? "");

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (message: string) => {
      alert(`New notification: ${message}`);
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  return null;
};

export default NotificationListener;
