export const loadMessages = (messages) => {
  return {
    type: 'LOAD_MESSAGES',
    payload: messages
  };
};

export const addMessage = (message) => {
  return {
    type: 'ADD_MESSAGE',
    payload: message
  };
};
