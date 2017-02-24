const socketReducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE_SOCKET':
      return action.payload;
    case 'REMOVE_SOCKET':
      return null;
    default:
      return state;
  }
};

export default socketReducer;
