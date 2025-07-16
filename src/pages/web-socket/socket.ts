import { io } from 'socket.io-client';

const token = localStorage.getItem('authToken');
const API_URL: string = import.meta.env.VITE_API_URL;

export const socket = io(API_URL, {
  auth: {
    token,
  },
  transports: ['websocket'], // optional, but helps avoid polling
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
