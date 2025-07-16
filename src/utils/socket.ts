import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

const API_URL = import.meta.env.VITE_API_URL;

export const connectSocket = (token: string) => {
  if (socket) socket.disconnect();

  socket = io(API_URL, {
    auth: { token },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
