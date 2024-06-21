import NotificationService from "@/core/shared/utils/notification-service";
import useSocketConnection from "@/core/shared/utils/socket";
import { RootState, useAppDispatch, useAppSelector } from "@/core/state/store";
import { useEffect } from "react";
import { getUserNotifications } from "../../controllers/thunks/notifications-thunk";

const NotificationListener = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const socket = useSocketConnection(authState.user?.id ?? "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      authState.user?.id !== undefined &&
      authState.user?.id !== "" &&
      authState.user?.id !== null
    ) {
      dispatch(getUserNotifications(authState.user?.id));
    }
  }, [authState.user?.id, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (message: string) => {
      NotificationService.showNotification(message);
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  return null;
};

export default NotificationListener;
