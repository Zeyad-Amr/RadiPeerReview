import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Endpoints } from "@/core/api";

const useSocketConnection = (userId: string): Socket => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(Endpoints.hostDev, {
      query: {
        userId: userId,
      },
      transports: ["websocket", "polling"],
    });

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketInstance as Socket;
};

export default useSocketConnection;
