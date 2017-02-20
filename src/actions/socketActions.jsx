export const initializeSocket = (socket) => {
  return {
    type: 'UPDATE_LOGIN_STATE',
    payload: socket
  };
};
