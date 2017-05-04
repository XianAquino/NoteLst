import { INITIALIZE_SOCKET } from './types';
import io from 'socket.io-client';

export const initializeSocket = (dipatch) => {
  const socket = io();
  dipatch({
    type: INITIALIZE_SOCKET,
    payload: socket
  });
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
