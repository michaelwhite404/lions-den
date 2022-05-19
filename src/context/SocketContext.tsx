import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(`https://c17c-98-233-69-160.ngrok.io`);
    setSocket(newSocket);
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
