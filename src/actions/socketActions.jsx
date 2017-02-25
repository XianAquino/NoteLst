import io from 'socket.io-client';

export const initializeSocket = () => {
  const socket = io();
  return {
    type: 'INITIALIZE_SOCKET',
    payload: socket
  };
};

export const removeSocket = () => {
  return {
    type: 'REMOVE_SOCKET'
  };
};

export const setSocketConnection = () => {
  return {
    type: 'SET_TRUE'
  };
};
