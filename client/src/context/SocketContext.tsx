import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  roomName: string;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    roomName: ""
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomName, setRoomName] = useState<string>("");


  useEffect(() => {
   
    const newSocket = io('http://localhost:5000');

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setSocket(null)
    });

    newSocket.on('game-started', (data) => {
      setRoomName(data.roomName);
    });

    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    roomName
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default SocketContext;