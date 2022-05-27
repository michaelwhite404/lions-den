import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import getEnvVars from "../environment";
const env = getEnvVars();

export const SocketContext = createContext<Socket | undefined>(undefined);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(env.apiUrl);
    setSocket(newSocket);
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
