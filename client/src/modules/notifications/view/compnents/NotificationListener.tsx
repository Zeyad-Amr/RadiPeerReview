import { useEffect, useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import NotificationService from "@/core/shared/utils/notification-service";
import useSocketConnection from "@/core/shared/utils/socket";
import { getUserNotifications } from "../../controllers/thunks/notifications-thunk";

const NotificationListener = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const socket = useSocketConnection(user?.id ?? "");

  const fetchUserNotifications = useCallback(
    (userId?: string) => {
      if (userId) {
        dispatch(getUserNotifications(userId));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchUserNotifications(user?.id);
  }, [user?.id, fetchUserNotifications]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (message: string) => {
      NotificationService.showNotification(message);
      fetchUserNotifications(user?.id);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, user?.id, fetchUserNotifications]);

  return null;
};

export default NotificationListener;
