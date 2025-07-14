import { io } from 'socket.io-client';

const token = localStorage.getItem('authToken');

export const socket = io('http://localhost:3000/', {
  auth: {
    token,
  },
  transports: ['websocket'], // optional, but helps avoid polling
});
