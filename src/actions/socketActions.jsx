import io from 'socket.io-client';

export const initializeSocket = () => {
  const socket = io();
  return {
    type: 'INITIALIZE_SOCKET',
    payload: socket
  };
};
